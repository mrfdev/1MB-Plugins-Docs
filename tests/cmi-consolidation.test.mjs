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
  const gameTypes = await readFile(path.join(generatedPlugins, 'gametypes.mdx'), 'utf8');
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
  assert.match(gameTypes, /OneBlock, ChunkBlock, SkyBlock/);
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
