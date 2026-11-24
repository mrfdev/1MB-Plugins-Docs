import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generatedPlugins = path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'plugins');

test('consolidated CMI guides keep accurate commands and legacy routes', async () => {
  const contentGuard = await readFile(path.join(generatedPlugins, 'contentguard.mdx'), 'utf8');
  const teamMsg = await readFile(path.join(generatedPlugins, 'teammsg.mdx'), 'utf8');
  const placeholders = await readFile(path.join(generatedPlugins, 'placeholders.mdx'), 'utf8');
  const bedrockChatBridge = await readFile(path.join(generatedPlugins, 'bedrockchatbridge.mdx'), 'utf8');
  const coconut = await readFile(path.join(generatedPlugins, 'coconut.mdx'), 'utf8');
  const ghostHunt = await readFile(path.join(generatedPlugins, 'ghosthunt.mdx'), 'utf8');
  const doors = await readFile(path.join(generatedPlugins, 'doors.mdx'), 'utf8');
  const commandIndex = await readFile(
    path.join(repoRoot, 'src', 'content', 'docs', 'player-guides', 'commands.mdx'),
    'utf8',
  );
  const pluginIndex = await readFile(path.join(generatedPlugins, 'index.mdx'), 'utf8');
  const bentoBox = await readFile(path.join(generatedPlugins, 'bentobox.md'), 'utf8');
  const staffIndex = await readFile(
    path.join(repoRoot, 'src', 'content', 'docs', 'staff-reference', 'plugins.mdx'),
    'utf8',
  );

  assert.match(contentGuard, /\/contentguard module lab true/);
  assert.match(teamMsg, /\/teammsg module staffmsg true/);
  assert.match(teamMsg, /\/s recent/);
  assert.match(teamMsg, /private notable channel/);
  assert.doesNotMatch(contentGuard, /module example/);
  assert.doesNotMatch(teamMsg, /module example/);
  assert.doesNotMatch(commandIndex, /module example/);
  assert.match(placeholders, /\/_placeholders module provider true/);
  assert.match(placeholders, /\/_placeholders probe parse %onemb_server_name%/);
  assert.doesNotMatch(placeholders, /No currently available features/);
  assert.doesNotMatch(`${bedrockChatBridge}\n${contentGuard}\n${teamMsg}`, /server server/i);

  assert.match(coconut, /\/hunt/);
  assert.match(ghostHunt, /\/hunt/);
  assert.match(ghostHunt, /\/ghosthunt/);
  assert.match(doors, /\/hunt/);
  assert.match(doors, /\/halloween/);
  assert.doesNotMatch(ghostHunt, /recent choices you can restore/i);
  assert.equal((coconut.match(/<td><code>\/coconut claim &lt;reward-id/g) ?? []).length, 1);
  assert.doesNotMatch(
    commandIndex,
    /<a href="\.\.\/plugins\/(?:contentguard|teammsg|bedrockchatbridge|placeholders)\//,
  );

  assert.match(pluginIndex, /OneBlock, ChunkBlock, SkyBlock/);
  assert.match(bentoBox, /\/oneblock menu/);
  assert.match(bentoBox, /\/cave menu/);
  assert.doesNotMatch(staffIndex, /\]\(\.\/other-server-features\//);

  await access(path.join(generatedPlugins, 'contentguard.mdx'));
  await access(path.join(generatedPlugins, 'teammsg.mdx'));
  await access(path.join(generatedPlugins, 'placeholders.mdx'));
  await assert.rejects(access(path.join(generatedPlugins, 'filterlab.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'filterguard.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'notablemsg.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'staffmsg.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'messagefont.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'cmiplaceholders.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'onembplaceholders.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'placeholderhealth.mdx')));
  await assert.rejects(access(path.join(generatedPlugins, 'placeholderprobe.mdx')));

  const config = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  assert.match(config, /'\/player-guides\/plugins\/filterlab': '\/player-guides\/plugins\/contentguard\/'/);
  assert.match(config, /'\/player-guides\/plugins\/filterguard': '\/player-guides\/plugins\/contentguard\/'/);
  assert.match(config, /'\/player-guides\/plugins\/notablemsg': '\/player-guides\/plugins\/teammsg\/'/);
  assert.match(config, /'\/player-guides\/plugins\/staffmsg': '\/player-guides\/plugins\/teammsg\/'/);
  assert.match(config, /'\/player-guides\/plugins\/messagefont': '\/player-guides\/plugins\/'/);
  assert.match(config, /'\/player-guides\/plugins\/cmiplaceholders': '\/player-guides\/plugins\/placeholders\/'/);
  assert.match(config, /'\/player-guides\/plugins\/onembplaceholders': '\/player-guides\/plugins\/placeholders\/'/);
  assert.match(config, /'\/player-guides\/plugins\/placeholderhealth': '\/player-guides\/plugins\/placeholders\/'/);
  assert.match(config, /'\/player-guides\/plugins\/placeholderprobe': '\/player-guides\/plugins\/placeholders\/'/);
  assert.match(config, /'\/custom-server-plugins\/trick-or-treat-doors': '\/player-guides\/plugins\/doors\/'/);
  assert.match(config, /'\/player-guides\/custom-server-plugins\/trick-or-treat-doors': '\/player-guides\/plugins\/doors\/'/);
});

test('Consolidated staff tools have canonical references and redirect retired guides', async () => {
  const redirects = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  const index = await readFile(path.join(generatedPlugins, 'index.mdx'), 'utf8');
  const playerCommands = await readFile(path.join(generatedPlugins, '..', 'commands.mdx'), 'utf8');
  const staffRoot = path.join(generatedPlugins, '..', '..', 'staff-reference', 'plugins');

  for (const [host, modules, command] of [
    ['servercheck', ['pluginversions', 'startupdoctor', 'updatesmoke', 'hoppers', 'sparkreviewer'], '/servercheck smoke run'],
    ['worthaudit', ['worthhelper', 'worthdrift'], '/worthaudit shop'],
    ['staffcenter', ['profile', 'warninglens'], '/staffcenter modules'],
  ]) {
    assert.ok(index.includes(`href="./${host}/"`));
    assert.ok((await readFile(path.join(staffRoot, `${host}.md`), 'utf8')).includes(command));
    assert.ok(!playerCommands.includes(`<code>/${host}`));
    for (const module of modules) {
      assert.ok(redirects.includes(`'/player-guides/plugins/${module}': '/player-guides/plugins/${host}/'`));
      assert.ok(!index.includes(`href="./${module}/"`));
      await assert.rejects(access(path.join(generatedPlugins, `${module}.mdx`)));
    }
  }
});

test('ServerCheck exposes the performance modules through its staff guide', async () => {
  const redirects = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  const playerCommands = await readFile(path.join(generatedPlugins, '..', 'commands.mdx'), 'utf8');
  const staffGuide = await readFile(path.join(generatedPlugins, '..', '..', 'staff-reference', 'plugins', 'servercheck.md'), 'utf8');

  for (const module of ['hoppers', 'sparkreviewer']) {
    assert.ok(redirects.includes(`'/staff-reference/plugins/${module}': '/staff-reference/plugins/servercheck/'`));
    assert.match(staffGuide, new RegExp(`/docs/plugins/${module}\.md`));
  }
  assert.match(staffGuide, /\/servercheck hoppers <scan/);
  assert.match(staffGuide, /\/servercheck spark start/);
  assert.ok(!playerCommands.includes('<code>/_hoppers'));
  assert.ok(!playerCommands.includes('<code>/sparkreviewer'));
});

test('StaffCenter keeps operator routes out of the player index and links both module references', async () => {
  const redirects = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  const playerCommands = await readFile(path.join(generatedPlugins, '..', 'commands.mdx'), 'utf8');
  const staffGuide = await readFile(path.join(generatedPlugins, '..', '..', 'staff-reference', 'plugins', 'staffcenter.md'), 'utf8');

  for (const module of ['profile', 'warninglens']) {
    assert.ok(redirects.includes(`'/staff-reference/plugins/${module}': '/staff-reference/plugins/staffcenter/'`));
    assert.ok(!playerCommands.includes(`<code>/${module}`));
    assert.ok(staffGuide.includes(`/docs/plugins/${module}.md`));
  }
  assert.ok(!playerCommands.includes('<code>/wlens'));
  assert.ok(staffGuide.includes('/staffcenter warnings inspect'));
  assert.ok(staffGuide.includes('/staffcenter profile <target>'));
  assert.ok(staffGuide.includes('/staffcenter admin module'));
});

test('BentoBox publishes GameTypes menus with legacy redirects and distinct platform guides', async () => {
  const redirects = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  const playerCommands = await readFile(path.join(generatedPlugins, '..', 'commands.mdx'), 'utf8');
  const staffGuide = await readFile(path.join(generatedPlugins, '..', '..', 'staff-reference', 'plugins', 'bentobox.md'), 'utf8');

  for (const section of ['player-guides', 'staff-reference']) {
    assert.ok(redirects.includes(`'/${section}/plugins/gametypes': '/${section}/plugins/bentobox/'`));
  }
  await assert.rejects(access(path.join(generatedPlugins, 'gametypes.mdx')));
  for (const command of ['/gametype', '/oneblock menu', '/cave menu', '/1mbbento menu']) {
    assert.ok(playerCommands.includes(`<code>${command}`));
  }
  assert.ok(!playerCommands.includes('<code>/1mbbento debug'));
  assert.ok(!playerCommands.includes('<code>/1mbbento module'));
  assert.ok(staffGuide.includes('GameTypes/config.yml'));
  assert.ok(staffGuide.includes('islands.sqlite'));
  assert.ok(staffGuide.includes('/docs/plugins/gametypes.md'));
  await access(path.join(generatedPlugins, '..', 'other-server-features', 'bentobox', 'index.md'));
});

test('RecordingMode publishes TPAuto as an optional module under its existing player guide', async () => {
  const redirects = await readFile(path.join(repoRoot, 'astro.config.mjs'), 'utf8');
  const index = await readFile(path.join(generatedPlugins, 'index.mdx'), 'utf8');
  const playerGuide = await readFile(path.join(generatedPlugins, 'recordingmode.mdx'), 'utf8');
  const commandIndex = await readFile(path.join(generatedPlugins, '..', 'commands.mdx'), 'utf8');
  const staffGuide = await readFile(path.join(generatedPlugins, '..', '..', 'staff-reference', 'plugins', 'recordingmode.md'), 'utf8');

  for (const section of ['player-guides', 'staff-reference']) {
    assert.ok(redirects.includes(`'/${section}/plugins/tpauto': '/${section}/plugins/recordingmode/'`));
  }
  await assert.rejects(access(path.join(generatedPlugins, 'tpauto.mdx')));
  assert.ok(index.includes('href="./recordingmode/"'));
  assert.ok(!index.includes('href="./tpauto/"'));
  assert.ok(playerGuide.includes('`/tpauto` commands still work'));
  assert.ok(playerGuide.includes('Muting TPA during recording pauses automatic acceptance'));
  assert.ok(commandIndex.includes('<code>/recording tpauto status</code>'));
  assert.ok(!commandIndex.includes('href="../plugins/tpauto/"'));
  assert.ok(!commandIndex.includes('<code>/recording admin module'));
  assert.ok(staffGuide.includes('/recording admin module tpauto'));
  assert.ok(staffGuide.includes('modules.tpauto.enabled'));
  assert.ok(staffGuide.includes('/docs/plugins/tpauto.md'));
});
