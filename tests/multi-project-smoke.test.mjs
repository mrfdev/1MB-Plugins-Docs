import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const sourceRepo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function runNode(repoRoot, script, args = []) {
  const result = spawnSync(process.execPath, [path.join(repoRoot, script), ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${script} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

test('standalone imports and curated features preserve the CMI namespace', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), '1mb-docs-multi-project-'));
  const repoRoot = path.join(root, 'public-docs');
  await cp(sourceRepo, repoRoot, {
    recursive: true,
    filter: (source) => {
      const relative = path.relative(sourceRepo, source).replaceAll(path.sep, '/');
      return ![
        '.git',
        'node_modules',
        'dist',
        '.astro',
      ].some((blocked) => relative === blocked || relative.startsWith(`${blocked}/`));
    },
  });
  await symlink(path.join(sourceRepo, 'node_modules'), path.join(repoRoot, 'node_modules'), 'dir');

  const cmiReadme = path.join(repoRoot, 'project-docs', 'cmi-api', 'README.md');

  const cmiSource = path.join(root, 'CMI-API');
  await mkdir(cmiSource, { recursive: true });
  await cp(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs'), path.join(cmiSource, 'docs'), { recursive: true });
  await writeFile(path.join(cmiSource, 'README.md'), '# Refreshed CMI Technical Documentation\n');

  runNode(repoRoot, 'scripts/sync-docs.mjs', ['--import', '--source', cmiSource]);
  assert.equal(
    await readFile(cmiReadme, 'utf8'),
    '# Refreshed CMI Technical Documentation\n',
  );

  const standalone = path.join(root, '1MB-Lootbox');
  await mkdir(path.join(standalone, 'docs'), { recursive: true });
  await writeFile(path.join(standalone, 'README.md'), '# Lootbox Technical Documentation\n');
  await writeFile(path.join(standalone, 'docs', 'plugin-docs.yml'), `id: lootbox
name: Lootboxes
category: custom-server-plugin
summary: Collect and open configured server lootboxes.
main_command: /lootbox
docs_url: https://docs.1moreblock.com/custom-server-plugins/lootbox/
player_guide: player-guide.md
technical_readme: ../README.md
java_target: "25"
paper_target: "26.2"
official_project: true
`);
  await writeFile(path.join(standalone, 'docs', 'player-guide.md'), `# Lootboxes

Open and review configured server lootboxes.

## Commands

| Command | What it does | Example |
| --- | --- | --- |
| \`/lootbox\` | Opens Lootboxes. | \`/lootbox\` |
| \`/lootbox info\` | Explains Lootboxes. | \`/lootbox info\` |
`);

  runNode(repoRoot, 'scripts/sync-docs.mjs', ['--import', '--source', standalone]);
  assert.equal(
    await readFile(cmiReadme, 'utf8'),
    '# Refreshed CMI Technical Documentation\n',
  );

  const external = path.join(repoRoot, 'catalog', 'other-server-features', 'mcmmo');
  await mkdir(external, { recursive: true });
  await writeFile(path.join(external, 'plugin-docs.yml'), `id: mcmmo
name: mcMMO
category: other-server-feature
summary: Train skills using the mcMMO features enabled on 1MoreBlock.
main_command: /mcmmo
docs_url: https://docs.1moreblock.com/other-server-features/mcmmo/
player_guide: player-guide.md
official_project: false
official_wiki: https://wiki.mcmmo.org/
last_reviewed: "2026-07-12"
`);
  await writeFile(path.join(external, 'player-guide.md'), `# mcMMO

Train the mcMMO skills that are enabled on 1MoreBlock.

## Commands

| Command | What it does | Example |
| --- | --- | --- |
| \`/mcmmo\` | Opens mcMMO help. | \`/mcmmo\` |
`);

  const generated = runNode(repoRoot, 'scripts/generate-site-content.mjs');
  assert.match(generated, /3 custom server plugins, and 1 other server features/);
  runNode(repoRoot, 'scripts/validate-docs.mjs');

  assert.equal(
    await readFile(path.join(repoRoot, 'project-docs', 'lootbox', 'README.md'), 'utf8'),
    '# Lootbox Technical Documentation\n',
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'custom-server-plugins', 'lootbox', 'index.md'), 'utf8'),
    /Lootboxes Guide/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'other-server-features', 'mcmmo', 'index.md'), 'utf8'),
    /Official plugin wiki/,
  );
});
