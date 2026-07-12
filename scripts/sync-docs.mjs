#!/usr/bin/env node

import { cp, mkdir, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadRegistry,
  pathIsDirectory,
  pathIsFile,
  projectNamespaceRoot,
  readManifest,
} from './docs-lib.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryFile = path.join(repoRoot, 'docs-sources.json');

function parseArgs(argv) {
  const options = { project: null, source: null, all: false, importProject: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--all') {
      options.all = true;
    } else if (argument === '--import') {
      options.importProject = true;
    } else if (argument === '--project') {
      options.project = argv[++index];
    } else if (argument === '--source') {
      options.source = argv[++index];
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

function readGit(sourceRoot, args, fallback = '') {
  try {
    return execFileSync('git', ['-C', sourceRoot, ...args], { encoding: 'utf8' }).trim();
  } catch {
    return fallback;
  }
}

function repositoryFromRemote(sourceRoot) {
  const remote = readGit(sourceRoot, ['remote', 'get-url', 'origin']);
  const match = remote.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/i);
  return match?.[1] ?? null;
}

function portableSourcePath(sourceRoot) {
  const sibling = path.join(path.dirname(repoRoot), path.basename(sourceRoot));
  return path.relative(repoRoot, sibling).replaceAll(path.sep, '/');
}

async function validateSource(project, sourceRoot) {
  if (!await pathIsFile(path.join(sourceRoot, 'README.md')) || !await pathIsDirectory(path.join(sourceRoot, 'docs'))) {
    throw new Error(`Documentation source ${sourceRoot} must contain README.md and docs/.`);
  }
  if (project.adapter === 'manifest') {
    const manifest = await readManifest(path.join(sourceRoot, 'docs', 'plugin-docs.yml'));
    if (manifest.id !== project.id) {
      throw new Error(`Source manifest id ${manifest.id} does not match registry project ${project.id}.`);
    }
    if (manifest.category !== project.category) {
      throw new Error(`Source manifest category ${manifest.category} does not match registry category ${project.category}.`);
    }
  }
}

async function syncProject(project, explicitSource = null) {
  const envSource = project.id === 'cmi-api' ? process.env.PRIVATE_DOCS_SOURCE : null;
  const sourceRoot = path.resolve(explicitSource ?? envSource ?? path.join(repoRoot, project.defaultSource));
  await validateSource(project, sourceRoot);

  const projectDocsRoot = path.join(repoRoot, 'project-docs');
  const targetRoot = projectNamespaceRoot(repoRoot, project.id);
  const stagingRoot = path.join(projectDocsRoot, `.${project.id}.sync-${process.pid}`);
  await mkdir(projectDocsRoot, { recursive: true });
  await rm(stagingRoot, { recursive: true, force: true });
  await mkdir(stagingRoot, { recursive: true });

  try {
    await cp(path.join(sourceRoot, 'README.md'), path.join(stagingRoot, 'README.md'));
    await cp(path.join(sourceRoot, 'docs'), path.join(stagingRoot, 'docs'), {
      recursive: true,
      filter: (source) => !source.endsWith('.DS_Store'),
    });

    const sourceCommit = readGit(sourceRoot, ['rev-parse', '--short', 'HEAD'], 'unknown');
    const sourceState = readGit(sourceRoot, ['status', '--porcelain']) ? 'local changes present at sync time' : 'clean';
    await writeFile(
      path.join(stagingRoot, 'SYNCED_FROM.md'),
      `# Synced Source\n\nThis namespace is a public documentation-only copy from the source project registered as \`${project.id}\`.\n\n- Project: \`${project.name}\`\n- Project id: \`${project.id}\`\n- Source repository: \`${project.repository ?? 'not published'}\`\n- Source commit: \`${sourceCommit}\`\n- Source state: \`${sourceState}\`\n- Copied files: \`README.md\` and \`docs/\`\n- Excluded on purpose: source code, jars, servers, databases, task logs, and internal checklists\n\nOnly \`project-docs/${project.id}/\` is replaced when this source is synchronized. Other project namespaces remain untouched.\n`,
    );

    await rm(targetRoot, { recursive: true, force: true });
    await rename(stagingRoot, targetRoot);
  } catch (error) {
    await rm(stagingRoot, { recursive: true, force: true });
    throw error;
  }

  console.log(`Synced ${project.id} from ${sourceRoot} into project-docs/${project.id}/`);
}

async function importProject(registry, sourceOption) {
  if (!sourceOption) {
    throw new Error('--import requires --source /path/to/project.');
  }
  const sourceRoot = path.resolve(sourceOption);
  const canonicalSourceRoot = await realpath(sourceRoot);
  let registeredSource = null;
  for (const project of registry.projects.filter((entry) => entry.adapter !== 'manifest')) {
    try {
      if (await realpath(path.resolve(repoRoot, project.defaultSource)) === canonicalSourceRoot) {
        registeredSource = project;
        break;
      }
    } catch {
      // A registered source may not be checked out on this machine.
    }
  }
  if (registeredSource) {
    await syncProject(registeredSource, sourceRoot);
    console.log(`Updated registered ${registeredSource.id} source without changing its adapter or category.`);
    return;
  }
  const manifest = await readManifest(path.join(sourceRoot, 'docs', 'plugin-docs.yml'));
  if (manifest.category !== 'custom-server-plugin') {
    throw new Error('Imported source projects must use category: custom-server-plugin. Curated third-party features belong in catalog/other-server-features/.');
  }
  const existing = registry.projects.find((project) => project.id === manifest.id);
  const project = {
    id: manifest.id,
    name: manifest.name,
    category: manifest.category,
    adapter: 'manifest',
    repository: manifest.repository ?? repositoryFromRemote(sourceRoot) ?? 'not-published',
    defaultSource: portableSourcePath(sourceRoot),
  };
  if (existing && existing.adapter !== 'manifest') {
    throw new Error(`Project id ${manifest.id} is reserved by adapter ${existing.adapter}.`);
  }
  registry.projects = registry.projects.filter((entry) => entry.id !== manifest.id);
  registry.projects.push(project);
  registry.projects.sort((left, right) => left.id.localeCompare(right.id));
  await syncProject(project, sourceRoot);
  await writeFile(registryFile, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`${existing ? 'Updated' : 'Registered'} ${manifest.id} in docs-sources.json.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const registry = await loadRegistry(repoRoot);

  if (options.importProject) {
    if (options.all || options.project) {
      throw new Error('--import cannot be combined with --all or --project.');
    }
    await importProject(registry, options.source);
    return;
  }

  if (options.all) {
    if (options.project || options.source) {
      throw new Error('--all cannot be combined with --project or --source.');
    }
    for (const project of registry.projects) {
      await syncProject(project);
    }
    return;
  }

  const projectId = options.project ?? 'cmi-api';
  const project = registry.projects.find((entry) => entry.id === projectId);
  if (!project) {
    throw new Error(`Unknown project id ${projectId}. Import it first or add it to docs-sources.json.`);
  }
  await syncProject(project, options.source);
}

main().catch((error) => {
  console.error(`ERROR: ${error.stack || error.message}`);
  process.exit(1);
});
