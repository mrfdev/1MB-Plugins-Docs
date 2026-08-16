import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, readdir, symlink, writeFile } from 'node:fs/promises';
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

  const cmiSource = path.join(root, '1MB-Library');
  const registry = JSON.parse(await readFile(path.join(repoRoot, 'docs-sources.json'), 'utf8'));
  const cmiProject = registry.projects.find((project) => project.id === 'cmi-api');
  await mkdir(cmiSource, { recursive: true });
  await cp(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs'), path.join(cmiSource, 'docs'), { recursive: true });
  await writeFile(path.join(cmiSource, 'README.md'), '# Refreshed CMI Technical Documentation\n');
  await mkdir(path.join(cmiSource, 'docs', 'economy-review', 'baseline'), { recursive: true });
  await writeFile(
    path.join(cmiSource, 'docs', 'economy-review', 'baseline', 'private-live-config.yml'),
    'private: true\n',
  );
  await mkdir(path.join(cmiSource, 'docs', 'agents'), { recursive: true });
  await writeFile(path.join(cmiSource, 'docs', 'agents', 'private-workflow.md'), '# Private workflow\n');
  await writeFile(path.join(cmiSource, 'docs', '1mb-library-migration-plan.md'), '# Private migration\n');
  await writeFile(
    path.join(cmiSource, '.public-docs-excludes'),
    `# Paths are relative to docs/.\n${cmiProject.requiredPrivateDocs.join('\n')}\n`,
  );

  runNode(repoRoot, 'scripts/sync-docs.mjs', ['--import', '--source', cmiSource]);
  assert.equal(
    await readFile(cmiReadme, 'utf8'),
    '# Refreshed CMI Technical Documentation\n',
  );
  await assert.rejects(
    readFile(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs', 'economy-review', 'baseline', 'private-live-config.yml')),
    { code: 'ENOENT' },
  );
  await assert.rejects(
    readFile(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs', 'agents', 'private-workflow.md')),
    { code: 'ENOENT' },
  );
  await assert.rejects(
    readFile(path.join(repoRoot, 'project-docs', 'cmi-api', 'docs', '1mb-library-migration-plan.md')),
    { code: 'ENOENT' },
  );

  await writeFile(path.join(cmiSource, '.public-docs-excludes'), 'economy-review\n');
  const rejectedSync = spawnSync(
    process.execPath,
    [path.join(repoRoot, 'scripts', 'sync-docs.mjs'), '--project', 'cmi-api', '--source', cmiSource],
    { cwd: repoRoot, encoding: 'utf8' },
  );
  assert.notEqual(rejectedSync.status, 0);
  assert.match(rejectedSync.stderr, /must declare these public-doc exclusions/);

  const standalone = path.join(root, '1MB-Lootbox');
  await mkdir(path.join(standalone, 'docs'), { recursive: true });
  await writeFile(path.join(standalone, 'README.md'), '# PRIVATE Lootbox Development Notes\n');
  await writeFile(path.join(standalone, 'docs', 'technical-overview.md'), '# Public Lootbox Technical Documentation\n');
  await writeFile(path.join(standalone, 'docs', 'plugin-docs.yml'), `id: lootbox
name: Lootboxes
category: custom-server-plugin
summary: Collect and open configured server lootboxes.
main_command: /lootbox
docs_url: https://docs.1moreblock.com/custom-server-plugins/lootbox/
player_guide: player-guide.md
staff_guide: staff-guide.md
staff_documents:
  commands: commands.md
technical_readme: technical-overview.md
public_readme: technical-overview.md
catalogue_json: catalogue/price-catalogue.json
catalogue_csv: catalogue/price-catalogue.csv
java_target: "25"
paper_target: "26.2"
official_project: true
`);
  await writeFile(path.join(standalone, 'docs', 'staff-guide.md'), `# Lootboxes Staff Reference

Use reviewed configuration and backups.
`);
  await writeFile(path.join(standalone, 'docs', 'commands.md'), `# Lootboxes Commands

Only reviewed commands belong here.
`);
  await mkdir(path.join(standalone, 'docs', 'catalogue'), { recursive: true });
  await writeFile(path.join(standalone, 'docs', 'catalogue', 'price-catalogue.json'), JSON.stringify({
    schemaVersion: 1,
    source: { generatedAt: '2026-08-11T00:00:00Z' },
    summary: { publishableLocations: 1, shops: 1, baseWorthMaterials: 1 },
    items: [{
      material: 'STONE',
      cmiWorthPerItem: 1,
      listings: [{
        publishable: true,
        shopUnitPrice: 100,
        differencePerItem: 99,
        multiplier: 100,
        shop: 'survival_blocks',
        file: 'survival_blocks.yml',
        itemId: '1',
        page: 1,
        slot: 10,
        command: '/buy survival_blocks 1',
      }],
    }],
  }));
  await writeFile(
    path.join(standalone, 'docs', 'catalogue', 'price-catalogue.csv'),
    'material,cmiWorthPerItem,shopUnitPrice\nSTONE,1,100\n',
  );
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
staff_guide: staff-guide.md
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
  await writeFile(path.join(external, 'staff-guide.md'), `# mcMMO Staff Reference

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| \`/mcmmo reload\` | \`mcmmo.admin\` | Reloads mcMMO configuration. |
`);

  const generated = runNode(repoRoot, 'scripts/generate-site-content.mjs');
  const expectedCustomProjects = registry.projects.filter(
    (project) => project.category === 'custom-server-plugin',
  ).length;
  const expectedOtherFeatures = (await readdir(
    path.join(repoRoot, 'catalog', 'other-server-features'),
    { withFileTypes: true },
  )).filter((entry) => entry.isDirectory()).length;
  assert.match(
    generated,
    new RegExp(`${expectedCustomProjects} custom server plugins, and ${expectedOtherFeatures} other server features`),
  );
  runNode(repoRoot, 'scripts/validate-docs.mjs');

  assert.equal(
    await readFile(path.join(repoRoot, 'project-docs', 'lootbox', 'README.md'), 'utf8'),
    '# Public Lootbox Technical Documentation\n',
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'custom-server-plugins', 'lootbox', 'index.md'), 'utf8'),
    /Lootboxes Guide/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'other-server-features', 'mcmmo', 'index.md'), 'utf8'),
    /Official plugin documentation/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'staff-reference', 'other-server-features', 'mcmmo', 'index.md'), 'utf8'),
    /mcMMO Staff Reference/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'staff-reference', 'custom-server-plugins', 'lootbox', 'index.md'), 'utf8'),
    /Lootboxes Staff Reference/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'staff-reference', 'custom-server-plugins', 'lootbox', 'commands.md'), 'utf8'),
    /Only reviewed commands belong here/,
  );
  assert.match(
    await readFile(path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'custom-server-plugins', 'lootbox', 'price-catalogue', 'index.mdx'), 'utf8'),
    /PriceCatalogue/,
  );
  assert.deepEqual(
    await readFile(path.join(repoRoot, 'public', 'catalogues', 'lootbox', 'price-catalogue.json'), 'utf8'),
    await readFile(path.join(standalone, 'docs', 'catalogue', 'price-catalogue.json'), 'utf8'),
  );
});
