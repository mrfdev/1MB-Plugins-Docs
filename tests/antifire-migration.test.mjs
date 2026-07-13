import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('AntiFire is published only from the CMI-API feature namespace', async () => {
  const registry = JSON.parse(await readFile(path.join(repoRoot, 'docs-sources.json'), 'utf8'));
  assert.equal(registry.projects.some((project) => project.id === 'antifire'), false);

  await access(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs', 'plugins', 'antifire.md'));
  await assert.rejects(access(path.join(repoRoot, 'project-docs', 'antifire')));

  const guide = await readFile(
    path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'plugins', 'antifire.mdx'),
    'utf8',
  );
  assert.match(guide, /How Players Use It/);
  assert.match(guide, /\/_antifire info/);
  assert.doesNotMatch(guide, /No currently available features/);

  await assert.rejects(access(path.join(
    repoRoot,
    'src',
    'content',
    'docs',
    'player-guides',
    'custom-server-plugins',
    'antifire',
  )));

  const config = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  assert.match(
    config,
    /'\/custom-server-plugins\/antifire': '\/player-guides\/plugins\/antifire\/'/,
  );
  assert.match(
    config,
    /'\/player-guides\/custom-server-plugins\/antifire': '\/player-guides\/plugins\/antifire\/'/,
  );
});
