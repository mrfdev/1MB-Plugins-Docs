import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(repoRoot, 'project-docs', 'docs');
const contentRoot = path.join(repoRoot, 'src', 'content', 'docs');
const pluginReadme = path.join(docsRoot, 'plugins', 'README.md');
const publicRepoBlob = 'https://github.com/mrfdev/1MB-Plugins-Docs/blob/main';

const PLAYER_COMMANDS = [
  ['/menu', 'Open the main server menu and find common server features.'],
  ['/visit', 'Manage your public visit spot and visit other players when available.'],
  ['/nick', 'Pick a safer nickname style from the curated nickname picker.'],
  ['/birthday', 'Manage birthday and server-anniversary lantern rewards.'],
  ['/recording', 'Quiet selected messages while recording or streaming.'],
  ['/emotes', 'Browse server emotes when the feature is available to you.'],
  ['/discordchat', 'See Discord chat engagement and linked-account rewards when enabled.'],
  ['/votetokens', 'Review vote-token reward trades and safe reward tools.'],
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .trim();
}

function parsePlugins(markdown) {
  return markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('| ') && line.includes('](') && !line.includes('---'))
    .map((line) => {
      const cells = line.slice(1, -1).split('|').map((cell) => cell.trim());
      const match = cells[1]?.match(/\[([^\]]+)]\(([^)]+)\)/);
      if (!match) {
        return null;
      }
      return {
        category: cells[0],
        name: match[1],
        file: match[2],
        purpose: cells[2] ?? '',
      };
    })
    .filter(Boolean);
}

function commandTable(commands) {
  const rows = commands
    .map(([command, purpose]) => `    <tr>
      <td><code>${escapeHtml(command)}</code></td>
      <td>${escapeHtml(purpose)}</td>
    </tr>`)
    .join('\n');

  return `<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>What it is for</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
}

function pluginTable(plugins) {
  const rows = plugins
    .map((plugin) => {
      const url = `${publicRepoBlob}/project-docs/docs/plugins/${plugin.file}`;
      return `    <tr>
      <td><a href="${url}">${escapeHtml(plugin.name)}</a></td>
      <td>${escapeHtml(plugin.category)}</td>
      <td>${escapeHtml(plugin.purpose)}</td>
    </tr>`;
    })
    .join('\n');

  return `<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Category</th>
      <th>Summary</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
}

function groupedLists(plugins) {
  const groups = Map.groupBy(plugins, (plugin) => plugin.category);
  return Array.from(groups.entries())
    .map(([category, values]) => {
      const rows = values
        .map((plugin) => {
          const url = `${publicRepoBlob}/project-docs/docs/plugins/${plugin.file}`;
          return `- [${plugin.name}](${url}) - ${plugin.purpose}`;
        })
        .join('\n');
      return `## ${category}\n\n${rows}`;
    })
    .join('\n\n');
}

const pluginMarkdown = await readFile(pluginReadme, 'utf8');
const plugins = parsePlugins(pluginMarkdown);
const playerPlugins = plugins.filter((plugin) => plugin.category === 'Player Fun');

await mkdir(contentRoot, { recursive: true });
await mkdir(path.join(contentRoot, 'player-guides'), { recursive: true });
await mkdir(path.join(contentRoot, 'staff-reference'), { recursive: true });

await writeFile(path.join(contentRoot, 'index.mdx'), `---
title: 1MoreBlock Plugin Docs
description: Friendly public documentation for 1MoreBlock server features.
---

Welcome to the public 1MoreBlock plugin documentation.

This site explains the player-facing features, commands, and server systems that are safe to share publicly. The plugin source code, private builds, server files, databases, and internal task notes stay private.

## Start here

- [Getting started](./player-guides/getting-started/) gives players a friendly overview.
- [Common player commands](./player-guides/commands/) lists useful commands and what they are for.
- [Feature overview](./player-guides/features/) summarizes the player-facing plugin features.
- [Staff reference](./staff-reference/) links to the raw synced documentation for deeper staff review.

## Public URL

The default GitHub Pages URL for this repo will be:

https://mrfdev.github.io/1MB-Plugins-Docs/

Later, this can move to a custom domain such as \`docs.1moreblock.com\`.
`);

await writeFile(path.join(contentRoot, 'player-guides', 'getting-started.mdx'), `---
title: Getting Started
description: What players need to know about the 1MoreBlock plugin docs.
---

These docs are here to explain what server features do in normal player language.

Not every command is available to every player. Some features are rewards, staff tools, event perks, or unlocks. If a command does not work for you, it may be disabled, hidden, or permission-locked for your current group.

## What you can learn here

- What a feature does.
- Which commands players may see.
- Which features are cosmetic, event-based, or progression-based.
- Where staff can find deeper technical reference.

## What is not published here

The public docs do not include plugin source code, private jars, databases, server folders, paid plugin files, internal task logs, or private operational notes.
`);

await writeFile(path.join(contentRoot, 'player-guides', 'commands.mdx'), `---
title: Common Player Commands
description: Player-friendly command overview for public server docs.
---

Commands can be permission-based. This list explains what common commands are meant to do when they are available to you.

${commandTable(PLAYER_COMMANDS)}

## Good to know

- Some commands open menus instead of printing lots of chat text.
- Some features are event rewards or group perks.
- Staff and admin-only commands are intentionally not listed as player commands here.
`);

await writeFile(path.join(contentRoot, 'player-guides', 'features.mdx'), `---
title: Player Feature Overview
description: Friendly summary of player-facing 1MoreBlock plugin features.
---

These are the current player-facing feature docs copied from the private project documentation. Staff can open the raw reference links for exact config, permission, and debug details.

${pluginTable(playerPlugins)}
`);

await writeFile(path.join(contentRoot, 'staff-reference', 'index.mdx'), `---
title: Staff Reference
description: Public staff reference copied from the private project docs.
---

This area links to the raw public documentation copy in \`project-docs/\`. It is useful for staff who need more detail than the player-facing guides.

## Raw synced docs

- [Project README](${publicRepoBlob}/project-docs/README.md)
- [Documentation index](${publicRepoBlob}/project-docs/docs/README.md)
- [Commands](${publicRepoBlob}/project-docs/docs/commands.md)
- [Permissions](${publicRepoBlob}/project-docs/docs/permissions.md)
- [Placeholders](${publicRepoBlob}/project-docs/docs/placeholders.md)
- [Features](${publicRepoBlob}/project-docs/docs/features.md)
- [Plugin docs folder](${publicRepoBlob}/project-docs/docs/plugins)
- [Sync metadata](${publicRepoBlob}/project-docs/SYNCED_FROM.md)

## Update flow

When the private docs change, run \`npm run docs:sync\` from this public repository. That refreshes \`project-docs/\` from the private repo and regenerates these Starlight pages.
`);

await writeFile(path.join(contentRoot, 'staff-reference', 'plugins.mdx'), `---
title: Plugin Reference
description: Staff index for public plugin reference docs.
---

The links below open the raw synced Markdown in GitHub. They are public documentation files only; no source code or builds are published here.

${groupedLists(plugins)}
`);

console.log(`Generated Starlight content for ${plugins.length} plugin docs.`);
