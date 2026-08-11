import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('price catalogue renders imported values as text and uses namespaced local assets', async () => {
  const source = await readFile(path.join(repoRoot, 'src', 'components', 'PriceCatalogue.astro'), 'utf8');
  assert.match(source, /textContent = value/);
  assert.doesNotMatch(source, /innerHTML|insertAdjacentHTML|document\.write/);
  assert.match(source, /fetch\(url, \{ credentials: 'same-origin' \}\)/);
  assert.match(source, /listing\.publishable !== false/);

  const generator = await readFile(path.join(repoRoot, 'scripts', 'generate-site-content.mjs'), 'utf8');
  assert.match(generator, /public', 'catalogues', entry\.manifest\.id/);
  assert.match(generator, /staff-reference', 'custom-server-plugins'/);
  assert.doesNotMatch(generator, /rm\(path\.join\(repoRoot, 'public', 'catalogues'\)/);
});
