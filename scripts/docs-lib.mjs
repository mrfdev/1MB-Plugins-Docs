import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

export const CATEGORY_DEFINITIONS = Object.freeze({
  'one-more-block-feature': {
    label: '1MoreBlock Features',
    playerDirectory: 'plugins',
  },
  'custom-server-plugin': {
    label: 'Custom Server Plugins',
    playerDirectory: 'custom-server-plugins',
  },
  'other-server-feature': {
    label: 'Other Server Features',
    playerDirectory: 'other-server-features',
  },
});

const PROJECT_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_MANIFEST_FIELDS = [
  'id',
  'name',
  'category',
  'docs_url',
  'player_guide',
];

export async function pathIsFile(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

export async function pathIsDirectory(directory) {
  try {
    return (await stat(directory)).isDirectory();
  } catch {
    return false;
  }
}

export function assertProjectId(value, label = 'Project id') {
  if (typeof value !== 'string' || !PROJECT_ID_PATTERN.test(value)) {
    throw new Error(`${label} must use lowercase letters, numbers, and single hyphens: ${value ?? '<missing>'}`);
  }
  return value;
}

export function projectNamespaceRoot(repoRoot, projectId) {
  return path.join(repoRoot, 'project-docs', assertProjectId(projectId));
}

export function assertSafeRelativePath(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty relative path.`);
  }
  const normalized = path.posix.normalize(value.replaceAll('\\', '/'));
  if (path.isAbsolute(value) || normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${label} must stay inside its project namespace: ${value}`);
  }
  return normalized;
}

export function assertPathRelativeToDocs(value, label) {
  if (typeof value !== 'string' || !value.trim() || path.isAbsolute(value)) {
    throw new Error(`${label} must be a non-empty relative path.`);
  }
  const normalized = path.posix.normalize(`docs/${value.replaceAll('\\', '/')}`);
  if (normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${label} must stay inside its project namespace: ${value}`);
  }
  return normalized;
}

export function validateManifest(manifest, sourceLabel = 'manifest') {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error(`${sourceLabel} must contain a YAML object.`);
  }
  for (const field of REQUIRED_MANIFEST_FIELDS) {
    if (manifest[field] === undefined || manifest[field] === null || manifest[field] === '') {
      throw new Error(`${sourceLabel} is missing required field: ${field}`);
    }
  }
  assertProjectId(manifest.id, `${sourceLabel} id`);
  if (!CATEGORY_DEFINITIONS[manifest.category]) {
    throw new Error(`${sourceLabel} has unsupported category: ${manifest.category}`);
  }
  if (manifest.category === 'one-more-block-feature') {
    throw new Error(`${sourceLabel} cannot claim the reserved CMI feature category.`);
  }
  if (typeof manifest.summary !== 'string' || !manifest.summary.trim()) {
    throw new Error(`${sourceLabel} is missing required field: summary`);
  }
  const expectedPrefix = `https://docs.1moreblock.com/${CATEGORY_DEFINITIONS[manifest.category].playerDirectory}/${manifest.id}/`;
  if (manifest.docs_url !== expectedPrefix) {
    throw new Error(`${sourceLabel} docs_url must be ${expectedPrefix}`);
  }
  assertSafeRelativePath(manifest.player_guide, `${sourceLabel} player_guide`);
  if (manifest.technical_readme) {
    assertPathRelativeToDocs(manifest.technical_readme, `${sourceLabel} technical_readme`);
  }
  if (manifest.main_command && !String(manifest.main_command).startsWith('/')) {
    throw new Error(`${sourceLabel} main_command must start with /.`);
  }
  if (manifest.category === 'custom-server-plugin') {
    for (const field of ['main_command', 'technical_readme', 'java_target', 'paper_target']) {
      if (manifest[field] === undefined || manifest[field] === null || manifest[field] === '') {
        throw new Error(`${sourceLabel} is missing required field: ${field}`);
      }
    }
    if (manifest.official_project !== true) {
      throw new Error(`${sourceLabel} must set official_project: true for a custom server plugin.`);
    }
  }
  if (manifest.category === 'other-server-feature') {
    if (manifest.official_project !== false) {
      throw new Error(`${sourceLabel} must set official_project: false for a third-party server feature.`);
    }
    if (typeof manifest.official_wiki !== 'string' || !/^https:\/\//.test(manifest.official_wiki)) {
      throw new Error(`${sourceLabel} must provide an HTTPS official_wiki URL.`);
    }
    if (typeof manifest.last_reviewed !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(manifest.last_reviewed)) {
      throw new Error(`${sourceLabel} must provide last_reviewed in YYYY-MM-DD format.`);
    }
  }
  return manifest;
}

export async function readManifest(file) {
  let parsed;
  try {
    parsed = yaml.load(await readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read ${file}: ${error.message}`);
  }
  return validateManifest(parsed, file);
}

export async function loadRegistry(repoRoot) {
  const file = path.join(repoRoot, 'docs-sources.json');
  const registry = JSON.parse(await readFile(file, 'utf8'));
  if (registry.schemaVersion !== 1 || !Array.isArray(registry.projects)) {
    throw new Error('docs-sources.json must use schemaVersion 1 and contain a projects array.');
  }
  const ids = new Set();
  for (const project of registry.projects) {
    assertProjectId(project.id, 'Registry project id');
    if (ids.has(project.id)) {
      throw new Error(`Duplicate project id in docs-sources.json: ${project.id}`);
    }
    ids.add(project.id);
    if (!CATEGORY_DEFINITIONS[project.category]) {
      throw new Error(`Registry project ${project.id} has unsupported category: ${project.category}`);
    }
    if (!['cmi-api', 'manifest'].includes(project.adapter)) {
      throw new Error(`Registry project ${project.id} has unsupported adapter: ${project.adapter}`);
    }
    if (project.adapter === 'cmi-api' && project.id !== 'cmi-api') {
      throw new Error('The cmi-api adapter is reserved for the cmi-api project.');
    }
    if (project.adapter === 'cmi-api' && project.category !== 'one-more-block-feature') {
      throw new Error('The cmi-api project must use category one-more-block-feature.');
    }
    if (project.adapter === 'manifest' && project.category !== 'custom-server-plugin') {
      throw new Error(`Manifest project ${project.id} must use category custom-server-plugin.`);
    }
    if (typeof project.defaultSource !== 'string' || !project.defaultSource.trim()) {
      throw new Error(`Registry project ${project.id} needs a defaultSource.`);
    }
    if (path.isAbsolute(project.defaultSource)) {
      throw new Error(`Registry project ${project.id} defaultSource must be a portable relative path.`);
    }
  }
  return registry;
}

export async function discoverDirectories(root) {
  if (!await pathIsDirectory(root)) {
    return [];
  }
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

export async function loadAdditionalEntries(repoRoot, registry = null) {
  const activeRegistry = registry ?? await loadRegistry(repoRoot);
  const entries = [];

  for (const project of activeRegistry.projects.filter((entry) => entry.adapter === 'manifest')) {
    const namespaceRoot = path.join(repoRoot, 'project-docs', project.id);
    const manifestFile = path.join(namespaceRoot, 'docs', 'plugin-docs.yml');
    const manifest = await readManifest(manifestFile);
    if (manifest.id !== project.id) {
      throw new Error(`Imported manifest id ${manifest.id} does not match registry id ${project.id}.`);
    }
    if (manifest.category !== project.category) {
      throw new Error(`Imported manifest category for ${project.id} does not match docs-sources.json.`);
    }
    entries.push({
      manifest,
      kind: 'imported',
      root: namespaceRoot,
      playerGuideFile: path.join(namespaceRoot, 'docs', assertSafeRelativePath(manifest.player_guide, `${project.id} player_guide`)),
    });
  }

  const catalogRoot = path.join(repoRoot, 'catalog', 'other-server-features');
  for (const id of await discoverDirectories(catalogRoot)) {
    const entryRoot = path.join(catalogRoot, id);
    const manifest = await readManifest(path.join(entryRoot, 'plugin-docs.yml'));
    if (manifest.id !== id) {
      throw new Error(`Catalog directory ${id} contains manifest id ${manifest.id}.`);
    }
    if (manifest.category !== 'other-server-feature') {
      throw new Error(`Catalog entry ${id} must use category other-server-feature.`);
    }
    entries.push({
      manifest,
      kind: 'catalog',
      root: entryRoot,
      playerGuideFile: path.join(entryRoot, assertSafeRelativePath(manifest.player_guide, `${id} player_guide`)),
    });
  }

  const ids = new Set();
  const urls = new Set();
  for (const entry of entries) {
    if (ids.has(entry.manifest.id)) {
      throw new Error(`Duplicate documentation id: ${entry.manifest.id}`);
    }
    if (urls.has(entry.manifest.docs_url)) {
      throw new Error(`Duplicate documentation URL: ${entry.manifest.docs_url}`);
    }
    if (!await pathIsFile(entry.playerGuideFile)) {
      throw new Error(`Player guide is missing for ${entry.manifest.id}: ${entry.playerGuideFile}`);
    }
    ids.add(entry.manifest.id);
    urls.add(entry.manifest.docs_url);
  }
  return entries;
}

export function githubBlobUrl(repository, relativePath = '') {
  const cleanPath = relativePath.replace(/^\/+/, '');
  return `https://github.com/${repository}/blob/main${cleanPath ? `/${cleanPath}` : ''}`;
}
