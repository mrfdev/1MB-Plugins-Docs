import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {
  assertPathRelativeToDocs,
  assertProjectId,
  assertSafeRelativePath,
  projectNamespaceRoot,
  validateManifest,
} from '../scripts/docs-lib.mjs';

function manifest(overrides = {}) {
  return {
    id: 'lootbox',
    name: 'Lootboxes',
    category: 'custom-server-plugin',
    summary: 'Collect and open configured server lootboxes.',
    main_command: '/lootbox',
    docs_url: 'https://docs.1moreblock.com/custom-server-plugins/lootbox/',
    player_guide: 'player-guide.md',
    staff_guide: 'staff-guide.md',
    technical_readme: '../README.md',
    java_target: '25',
    paper_target: '26.2',
    official_project: true,
    ...overrides,
  };
}

test('project ids cannot escape or overlap another namespace', () => {
  assert.equal(assertProjectId('mcmmo-more'), 'mcmmo-more');
  assert.throws(() => assertProjectId('../lootbox'), /lowercase letters/);
  assert.throws(() => assertProjectId('LootBox'), /lowercase letters/);
  assert.equal(
    projectNamespaceRoot('/docs-repo', 'lootbox'),
    path.join('/docs-repo', 'project-docs', 'lootbox'),
  );
});

test('manifest paths stay inside their project namespace', () => {
  assert.equal(assertSafeRelativePath('player-guide.md', 'guide'), 'player-guide.md');
  assert.equal(assertPathRelativeToDocs('../README.md', 'readme'), 'README.md');
  assert.throws(() => assertSafeRelativePath('../../private.yml', 'guide'), /inside its project namespace/);
  assert.throws(() => assertPathRelativeToDocs('../../private.yml', 'readme'), /inside its project namespace/);
});

test('standalone manifest requires its canonical category URL', () => {
  assert.equal(validateManifest(manifest()).id, 'lootbox');
  assert.throws(
    () => validateManifest(manifest({ docs_url: 'https://docs.1moreblock.com/plugins/lootbox/' })),
    /docs_url must be/,
  );
  assert.throws(
    () => validateManifest(manifest({ category: 'one-more-block-feature' })),
    /reserved CMI feature category/,
  );
});

test('third-party feature manifests use their own canonical URL', () => {
  const value = validateManifest(manifest({
    id: 'mcmmo',
    name: 'mcMMO',
    category: 'other-server-feature',
    docs_url: 'https://docs.1moreblock.com/other-server-features/mcmmo/',
    main_command: '/mcmmo',
    official_project: false,
    official_wiki: 'https://wiki.mcmmo.org/',
    last_reviewed: '2026-07-12',
  }));
  assert.equal(value.category, 'other-server-feature');
  assert.equal(value.staff_guide, 'staff-guide.md');
});
