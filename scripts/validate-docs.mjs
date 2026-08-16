#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CATEGORY_DEFINITIONS,
  assertPathRelativeToDocs,
  findLocalUserProfilePaths,
  loadAdditionalEntries,
  loadRegistry,
  pathIsDirectory,
  pathIsFile,
} from './docs-lib.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const BENTOBOX_GAME_MODE_ROOTS = new Map([
  ['aoneblock', { player: '/oneblock', admin: '/adminoneblock' }],
  ['chunkblock', { player: '/chunkblock', admin: '/adminchunkblock' }],
  ['bskyblock', { player: '/skyblock', admin: '/adminskyblock' }],
  ['acidisland', { player: '/acid', admin: '/adminacid' }],
  ['caveblock', { player: '/cave', admin: '/admincave' }],
  ['skygrid', { player: '/skygrid', admin: '/adminskygrid' }],
]);
const DEPRECATED_BENTOBOX_PLAYER_ROOT = /(^|[\s|`(])\/(?:is(?:land)?|ob)(?=$|[\s|`,.;:)])/gim;
const POSTFIX_BENTOBOX_ADMIN_ROOT = /(^|[\s|`(])\/(?:is(?:land)?|ob|oneblock|skyblock|acid|cave|chunkblock|skygrid)\s*admin(?=$|[\s|`,.;:)])/gim;

function problem(message) {
  problems.push(message);
}

function lineNumberAt(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function reportPatternMatches(source, file, pattern, message) {
  for (const match of source.matchAll(new RegExp(pattern.source, pattern.flags))) {
    problem(`${message}: ${path.relative(repoRoot, file)}:${lineNumberAt(source, match.index)}`);
  }
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
    for (const requiredPrivateDoc of project.requiredPrivateDocs ?? []) {
      const guardedTarget = path.join(namespace, 'docs', requiredPrivateDoc);
      if (await pathIsFile(guardedTarget) || await pathIsDirectory(guardedTarget)) {
        problem(`Private documentation must not be published: project-docs/${project.id}/docs/${requiredPrivateDoc}`);
      }
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

async function listPublishedTextFiles(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listPublishedTextFiles(absolute));
    } else if (entry.isFile() && /\.(?:md|mdx|json|ya?ml|txt|csv)$/i.test(entry.name)) {
      files.push(absolute);
    }
  }
  return files;
}

async function validatePublishedPrivacy(registry) {
  for (const project of registry.projects.filter(
    (candidate) => (candidate.requiredPrivateDocs ?? []).length > 0,
  )) {
    const namespace = path.join(repoRoot, 'project-docs', project.id);
    if (!await pathIsDirectory(namespace)) {
      continue;
    }
    for (const file of await listPublishedTextFiles(namespace)) {
      const source = await readFile(file, 'utf8');
      for (const localPath of findLocalUserProfilePaths(source)) {
        problem(
          `Published documentation must not contain local user-profile path ${localPath}: ${path.relative(repoRoot, file)}`,
        );
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
    if (entry.staffGuideFile) {
      const staffDirectory = manifest.category === 'custom-server-plugin'
        ? 'custom-server-plugins'
        : 'other-server-features';
      const generatedStaffGuide = path.join(
        repoRoot,
        'src',
        'content',
        'docs',
        'staff-reference',
        staffDirectory,
        manifest.id,
        'index.md',
      );
      if (!await pathIsFile(generatedStaffGuide)) {
        problem(`Generated staff guide is missing for ${manifest.id}. Run npm run docs:generate.`);
      }
    }
    if (entry.catalogueJsonFile) {
      const generatedCatalogue = path.join(
        repoRoot,
        'src',
        'content',
        'docs',
        'player-guides',
        definition.playerDirectory,
        manifest.id,
        'price-catalogue',
        'index.mdx',
      );
      const publicJson = path.join(repoRoot, 'public', 'catalogues', manifest.id, 'price-catalogue.json');
      const publicCsv = path.join(repoRoot, 'public', 'catalogues', manifest.id, 'price-catalogue.csv');
      for (const file of [generatedCatalogue, publicJson, publicCsv]) {
        if (!await pathIsFile(file)) {
          problem(`Generated catalogue output is missing for ${manifest.id}: ${path.relative(repoRoot, file)}`);
        }
      }
    }
  }
}

async function validateBentoBoxCommandConventions(entries) {
  for (const entry of entries.filter((candidate) => candidate.kind === 'catalog')) {
    const guides = [];
    const playerGuide = await readFile(entry.playerGuideFile, 'utf8');
    guides.push({ file: entry.playerGuideFile, source: playerGuide });

    let staffGuide = '';
    if (entry.staffGuideFile) {
      staffGuide = await readFile(entry.staffGuideFile, 'utf8');
      guides.push({ file: entry.staffGuideFile, source: staffGuide });
    }

    const isBentoBoxGuide = BENTOBOX_GAME_MODE_ROOTS.has(entry.manifest.id)
      || guides.some(({ source }) => /\bBentoBox\b/i.test(source));
    if (!isBentoBoxGuide) {
      continue;
    }

    if (['/is', '/island', '/ob'].includes(entry.manifest.main_command?.toLowerCase())) {
      problem(`BentoBox manifest ${entry.manifest.id} uses deprecated player root ${entry.manifest.main_command}.`);
    }

    for (const { file, source } of guides) {
      reportPatternMatches(
        source,
        file,
        DEPRECATED_BENTOBOX_PLAYER_ROOT,
        'Curated BentoBox guides must use a full 1MoreBlock player root',
      );
      reportPatternMatches(
        source,
        file,
        POSTFIX_BENTOBOX_ADMIN_ROOT,
        'BentoBox staff roots must use /admin<gametype>',
      );
    }

    const expected = BENTOBOX_GAME_MODE_ROOTS.get(entry.manifest.id);
    if (!expected) {
      continue;
    }
    if (entry.manifest.main_command !== expected.player) {
      problem(`BentoBox game mode ${entry.manifest.id} must use main_command: ${expected.player}.`);
    }
    if (!playerGuide.includes(`\`${expected.player}\``)) {
      problem(`Player guide for ${entry.manifest.id} must document ${expected.player}.`);
    }
    if (entry.staffGuideFile && !staffGuide.includes(`\`${expected.admin}\``)) {
      problem(`Staff guide for ${entry.manifest.id} must document ${expected.admin}.`);
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
  await validatePublishedPrivacy(registry);

  let entries = [];
  try {
    entries = await loadAdditionalEntries(repoRoot, registry);
  } catch (error) {
    problem(error.message);
  }
  if (!problems.length) {
    await validateAdditionalEntries(entries);
    await validateBentoBoxCommandConventions(entries);
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
