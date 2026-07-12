#!/usr/bin/env node

import { cp, mkdtemp, readFile, readdir, rm, stat, symlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function isDirectory(file) {
  try {
    return (await stat(file)).isDirectory();
  } catch {
    return false;
  }
}

async function listFiles(root, prefix = '') {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(absolute, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }
  return files.sort((left, right) => left.localeCompare(right));
}

async function main() {
  const nodeModules = path.join(repoRoot, 'node_modules');
  if (!await isDirectory(nodeModules)) {
    throw new Error('node_modules/ is missing. Run npm install before checking generated documentation.');
  }

  const tempParent = await mkdtemp(path.join(os.tmpdir(), '1mb-generated-docs-'));
  const tempRoot = path.join(tempParent, 'repo');
  try {
    await cp(repoRoot, tempRoot, {
      recursive: true,
      filter: (source) => {
        const relative = path.relative(repoRoot, source).replaceAll(path.sep, '/');
        return !['.git', 'node_modules', 'dist', '.astro'].some(
          (blocked) => relative === blocked || relative.startsWith(`${blocked}/`),
        );
      },
    });
    await symlink(nodeModules, path.join(tempRoot, 'node_modules'), 'dir');
    const generated = spawnSync(process.execPath, [path.join(tempRoot, 'scripts', 'generate-site-content.mjs')], {
      cwd: tempRoot,
      encoding: 'utf8',
    });
    if (generated.status !== 0) {
      throw new Error(`Temporary documentation generation failed:\n${generated.stderr || generated.stdout}`);
    }

    const expectedRoot = path.join(tempRoot, 'src', 'content', 'docs');
    const actualRoot = path.join(repoRoot, 'src', 'content', 'docs');
    const expectedFiles = await listFiles(expectedRoot);
    const actualFiles = await listFiles(actualRoot);
    const expectedSet = new Set(expectedFiles);
    const actualSet = new Set(actualFiles);
    const missing = expectedFiles.filter((file) => !actualSet.has(file));
    const extra = actualFiles.filter((file) => !expectedSet.has(file));
    const changed = [];
    for (const file of expectedFiles.filter((candidate) => actualSet.has(candidate))) {
      if (await readFile(path.join(expectedRoot, file), 'utf8') !== await readFile(path.join(actualRoot, file), 'utf8')) {
        changed.push(file);
      }
    }
    if (missing.length || extra.length || changed.length) {
      throw new Error([
        'Generated Starlight content is stale. Run npm run docs:generate.',
        missing.length ? `Missing: ${missing.join(', ')}` : '',
        extra.length ? `Extra: ${extra.join(', ')}` : '',
        changed.length ? `Changed: ${changed.join(', ')}` : '',
      ].filter(Boolean).join('\n'));
    }
    console.log(`Generated documentation matches ${actualFiles.length} committed content file(s).`);
  } finally {
    await rm(tempParent, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
