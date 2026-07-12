#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CATEGORY_DEFINITIONS,
  assertPathRelativeToDocs,
  loadAdditionalEntries,
  loadRegistry,
  pathIsDirectory,
  pathIsFile,
} from './docs-lib.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

function problem(message) {
  problems.push(message);
}

async function validateNamespaces(registry) {
  const root = path.join(repoRoot, 'project-docs');
  const entries = await readdir(root, { withFileTypes: true });
  const registered = new Set(registry.projects.map((project) => project.id));
  for (const entry of entries) {
    if (entry.name === '.DS_Store') {
      continue;
    }
    if (!entry.isDirectory()) {
      problem(`Loose file is not allowed in project-docs/: ${entry.name}`);
      continue;
    }
    if (entry.name.startsWith('.')) {
      problem(`Temporary namespace was left behind: project-docs/${entry.name}`);
    } else if (!registered.has(entry.name)) {
      problem(`Unregistered project namespace: project-docs/${entry.name}/`);
    }
  }

  for (const project of registry.projects) {
    const namespace = path.join(root, project.id);
    for (const required of ['README.md', 'SYNCED_FROM.md']) {
      if (!await pathIsFile(path.join(namespace, required))) {
        problem(`Missing project-docs/${project.id}/${required}`);
      }
    }
    if (!await pathIsDirectory(path.join(namespace, 'docs'))) {
      problem(`Missing project-docs/${project.id}/docs/`);
    }
    const markerFile = path.join(namespace, 'SYNCED_FROM.md');
    if (await pathIsFile(markerFile)) {
      const marker = await readFile(markerFile, 'utf8');
      if (!marker.includes(`Project id: \`${project.id}\``)) {
        problem(`Sync marker does not identify project ${project.id}.`);
      }
    }
  }
}

async function validateAdditionalEntries(entries) {
  const ids = new Set();
  const urls = new Set();
  for (const entry of entries) {
    const { manifest } = entry;
    if (ids.has(manifest.id)) {
      problem(`Duplicate manifest id: ${manifest.id}`);
    }
    if (urls.has(manifest.docs_url)) {
      problem(`Duplicate manifest docs_url: ${manifest.docs_url}`);
    }
    ids.add(manifest.id);
    urls.add(manifest.docs_url);

    if (entry.kind === 'catalog' && !manifest.official_wiki) {
      problem(`Other server feature ${manifest.id} must link to its official_wiki.`);
    }
    if (entry.kind === 'imported' && manifest.technical_readme) {
      const relative = assertPathRelativeToDocs(manifest.technical_readme, `${manifest.id} technical_readme`);
      if (!await pathIsFile(path.join(entry.root, relative))) {
        problem(`Technical README is missing for ${manifest.id}: ${manifest.technical_readme}`);
      }
      const playerGuide = await readFile(entry.playerGuideFile, 'utf8');
      if (!playerGuide.includes(`${manifest.main_command} info`)) {
        problem(`Player guide for ${manifest.id} must document ${manifest.main_command} info.`);
      }
    }

    const definition = CATEGORY_DEFINITIONS[manifest.category];
    const generated = path.join(
      repoRoot,
      'src',
      'content',
      'docs',
      'player-guides',
      definition.playerDirectory,
      manifest.id,
      'index.md',
    );
    if (!await pathIsFile(generated)) {
      problem(`Generated player guide is missing for ${manifest.id}. Run npm run docs:generate.`);
    }
  }
}

async function validateGeneratedCategoryOwnership(entries) {
  for (const category of ['custom-server-plugin', 'other-server-feature']) {
    const definition = CATEGORY_DEFINITIONS[category];
    const root = path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', definition.playerDirectory);
    if (!await pathIsFile(path.join(root, 'index.md'))) {
      problem(`Generated ${definition.label} index is missing.`);
      continue;
    }
    const expected = new Set(entries.filter((entry) => entry.manifest.category === category).map((entry) => entry.manifest.id));
    const children = await readdir(root, { withFileTypes: true });
    for (const child of children) {
      if (child.isDirectory() && !expected.has(child.name)) {
        problem(`Generated ${definition.label} directory has no owning manifest: ${child.name}`);
      }
    }
  }
}

async function main() {
  const registry = await loadRegistry(repoRoot);
  await validateNamespaces(registry);

  let entries = [];
  try {
    entries = await loadAdditionalEntries(repoRoot, registry);
  } catch (error) {
    problem(error.message);
  }
  if (!problems.length) {
    await validateAdditionalEntries(entries);
    await validateGeneratedCategoryOwnership(entries);
  }

  if (problems.length) {
    console.error(`Documentation validation failed with ${problems.length} problem(s):`);
    for (const item of problems) {
      console.error(`- ${item}`);
    }
    process.exit(1);
  }

  const imported = entries.filter((entry) => entry.kind === 'imported').length;
  const catalog = entries.filter((entry) => entry.kind === 'catalog').length;
  console.log(`Documentation validation passed for ${registry.projects.length} registered source project(s), ${imported} standalone project guide(s), and ${catalog} curated server feature(s).`);
}

main().catch((error) => {
  console.error(`ERROR: ${error.stack || error.message}`);
  process.exit(1);
});
