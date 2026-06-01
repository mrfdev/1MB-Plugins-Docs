import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(repoRoot, 'project-docs', 'docs');
const contentRoot = path.join(repoRoot, 'src', 'content', 'docs');
const pluginGuideRoot = path.join(contentRoot, 'player-guides', 'plugins');
const pluginReadme = path.join(docsRoot, 'plugins', 'README.md');
const publicRepoBlob = 'https://github.com/mrfdev/1MB-Plugins-Docs/blob/main';

const PLAYER_GUIDE_OVERRIDES = {
  boosters: {
    summary: 'Check which server-wide boosters are active for skills, jobs, points, and special events.',
    intro: 'Boosters lets players check the current server booster status from one simple place. Use it when you want to know whether skill, job, points, or event multipliers are active before you start grinding.',
    bullets: [
      'Open /rate to see which boosters are currently active.',
      'Check /rate status for a quick text summary.',
      'Use /rate info or /rate help when you want a short explanation in-game.',
    ],
  },
  gametypes: {
    summary: 'Open the right island-game menu for OneBlock, SkyBlock, AcidIsland, CaveBlock, or SkyGrid.',
    intro: 'GameTypes helps players find the correct menu for island-style game modes. Use it when you are in a BentoBox world or when you want the server to show the available game type menus.',
  },
  kitstreaks: {
    summary: 'Track kit claim streaks, milestone calendars, and reward progress.',
    intro: 'KitStreaks helps players follow kit claim streaks and milestone rewards. It is meant for players who like daily or recurring kit progress and want to see what they have already claimed.',
  },
  messagefont: {
    summary: 'Choose temporary private-message font styles, with a plain-mode option for readability.',
    intro: 'MessageFont lets players choose a temporary style for private messages. It is meant as a cosmetic chat perk while still giving recipients a plain-mode option when they prefer easier-to-read messages.',
    bullets: [
      'Use /msgfont to open the font menu.',
      'Use /msgfont list to browse available font styles.',
      'Use /msgfont set when you want to pick a style directly.',
      'Use /msgfont plain when you want incoming styled private messages to stay readable.',
    ],
  },
  journeymap: {
    summary: 'Follow playtime eras, badges, milestones, and long-term journey rewards.',
    intro: 'JourneyMap turns long-term playtime into visible eras, badges, milestones, and rewards. Use it to see where you are in your 1MoreBlock journey and what milestones are still ahead.',
  },
  namemc: {
    summary: 'Like the server on NameMC, verify it in-game, and receive the configured one-time reward.',
    intro: 'NameMC lets players support the server on NameMC and verify that support in-game. Open the NameMC page, click the heart, then return to the server and run the verify command when you are ready.',
    bullets: [
      'Open /namemc to get the server NameMC page.',
      'Click the heart on NameMC while logged into the right Minecraft account.',
      'Run /namemc verify after liking the server.',
      'Use /namemc status to check whether your like has been verified.',
    ],
  },
  nick: {
    summary: 'Pick readable nickname colors, gradients, tools, favorites, and unlockable styles from the safe nickname picker.',
    intro: 'Nick is the safer /nick system on 1MoreBlock. It gives players a curated nickname picker with readable colors, gradients, cleanup tools, favorites, history, and unlockable styles without letting raw color codes or unsafe text into chat.',
    guide: '`/nick` opens the nickname menu with a live preview. Depending on your permissions and unlocks, you can browse public colors, gradients, seasonal styles, group styles, economy unlocks, milestone styles, moods, tools, history, favorites, top nicknames, and bio settings.\n\nThe menu also includes Quick Undo, Style Lab, milestone progress, and Nick Museum when enabled. Style Lab lets you nudge a safe color lighter, darker, warmer, cooler, redder, greener, bluer, pastel, softer, bolder, or random without typing raw hex codes. Nick Museum tracks styles you have used as a personal collection, and Museum Top shows the largest collections for fun.',
    bullets: [
      'Open the nickname picker with /nick.',
      'Check your current nickname, cooldowns, history, legacy entry, and collection with /nick status.',
      'Pick a safe plain nickname with /nick set YourName.',
      'Restore a recent choice with /nick undo or /nick history.',
      'Save long-term favorites with /nick favorite save 1.',
      'Try small color tweaks with /nick lab lighter, /nick lab pastel, or /nick lab random.',
      'Check configured milestone progress with /nick milestones.',
      'View your collected styles with /nick museum or /nick museum top.',
      'View public nickname rankings with /nick top.',
    ],
    quickStart: [
      'Start with `/nick` to open the nickname picker.',
      'Use `/nick status` to check your current nickname, cooldowns, history, and collection.',
      'Pick a style in the menu, or use `/nick set YourName` when you are ready to choose your plain nickname text.',
    ],
    examples: [
      '/nick',
      '/nick set YourName',
      '/nick lab pastel',
      '/nick milestones',
      '/nick favorite save 1',
      '/nick undo',
    ],
    commandDescriptions: {
      '/nick': 'Opens the safe nickname picker.',
      '/nick <name>': 'Sets your plain nickname text when it passes the server rules.',
      '/nick set <name>': 'Sets your plain nickname text when it passes the server rules.',
      '/nick style <style-id>': 'Applies a trusted color, gradient, mood, group, or event style.',
      '/nick clear': 'Turns your current nickname off while keeping your Nick history and favorites.',
      '/nick undo': 'Restores your previous Nick choice during the quick undo window.',
      '/nick status': 'Shows your current nickname, cooldowns, legacy entry, and collection state.',
      '/nick status <player>': 'Shows public nickname status for another player when available.',
      '/nick bio <short bio>': 'Sets your short public nickname bio.',
      '/nick rate <player> <1-5>': "Rates another player's nickname when rating is available.",
      '/nick top': 'Shows the public nickname leaderboard.',
      '/nick top claim': 'Claims a configured monthly top nickname reward when you qualify.',
      '/nick share chat': 'Shares your current public style in chat when sharing is enabled.',
      '/nick share discord': 'Shares your current public style to Discord when sharing is enabled.',
      '/nick copycat <player>': "Copies another player's public style when you can use it too.",
      '/nick favorite save <slot>': 'Saves your current nickname style into a favorite slot.',
      '/nick favorite use <slot>': 'Restores a saved favorite nickname style.',
      '/nick history': 'Shows recent nickname choices you can restore.',
      '/nick legacy status': 'Shows your captured old nickname when one exists.',
      '/nick legacy restore': 'Uses one remaining legacy restore to bring back the old nickname.',
      '/nick tools': 'Opens cleanup and randomizer tools for your nickname.',
      '/nick lab <lighter|darker|warmer|cooler|redder|greener|bluer|pastel|softer|bolder|random>': 'Tweaks your current style with a safe Style Lab action.',
      '/nick milestones': 'Shows configured milestone progress and unlock hints.',
      '/nick museum': 'Opens your collection of Nick styles you have used before.',
      '/nick museum top': 'Shows the largest Nick style collections.',
      '/nick museum <player>': "Shows another player's Nick collection when you have access.",
      '/nick realname <player>': "Shows a player's real Minecraft name when the command is available.",
    },
  },
  pvptoggle: {
    summary: 'Turn your own PvP state on or off and check your current PvP protection state.',
    intro: 'PvPToggle gives players a clear /pvp switch. Use it to see whether PvP is enabled for you and to turn your own PvP state on or off when the server allows it.',
    bullets: [
      'Run /pvp to see or change your current PvP state.',
      'Use /pvp status when you only want to check your current setting.',
      'Use /pvp on or /pvp off when you want a direct choice.',
      'Use /pvp help if you are unsure which PvP commands are available to you.',
    ],
  },
  recordingmode: {
    summary: 'Quiet selected personal messages and requests while recording or streaming.',
    intro: 'Recording mode helps players stream or record without private messages, requests, tips, or map visibility getting in the way. Turn it on before going live, then turn it off when you are done.',
  },
  schedulercheck: {
    summary: 'Owner-only CMI scheduler validator for YAML syntax, timing ranges, enabled toggles, and Markdown reports.',
    intro: 'SchedulerCheck is a direct-console server-owner tool for checking CMI scheduler entries before a restart or after editing the scheduler file.',
    guide: 'There is no player-side command for SchedulerCheck. Server owners use it from direct console to check CMI scheduler YAML, review enabled and disabled entries, export a report, or safely toggle one schedule entry on or off.',
    pageIntro: 'This page documents SchedulerCheck as a public staff/reference guide. It has no player-facing command and intentionally rejects in-game use and RCON.',
    audienceHeading: 'How Staff Use It',
    bullets: [
      'Run a YAML and value check before trusting a changed scheduler file.',
      'Catch invalid time values such as Hour: 31 or Minute: Five.',
      'List all, enabled, or disabled CMI scheduler entries.',
      'Inspect one scheduler entry by id when you need the full details.',
      'Export the latest check as Markdown for Discord or support review.',
      'Toggle one entry with Enabled: true or Enabled: false without rewriting the whole CMI file.',
    ],
    quickStart: [
      'Open direct server console, not RCON and not in-game chat.',
      'Run `/_scheduler check` to scan the configured CMI scheduler file.',
      'Use `/_scheduler list enabled` or `/_scheduler list id Announcer` to review specific entries.',
      'Run `/_scheduler export` when you want a Markdown report to share with staff.',
    ],
    commands: [
      '/_scheduler',
      '/_scheduler info',
      '/_scheduler help',
      '/_scheduler check',
      '/_scheduler scan',
      '/_scheduler export',
      '/_scheduler list [all|enabled|disabled]',
      '/_scheduler list id <key>',
      '/_scheduler set <key> <true|false>',
      '/_scheduler reload',
    ],
    examples: [
      '/_scheduler check',
      '/_scheduler export',
      '/_scheduler list enabled',
      '/_scheduler list id Announcer',
      '/_scheduler set Announcer false',
    ],
    commandDescriptions: {
      '/_scheduler': 'Shows the SchedulerCheck intro from direct console.',
      '/_scheduler info': 'Shows the SchedulerCheck intro and CMI scheduler documentation link.',
      '/_scheduler help': 'Shows command examples.',
      '/_scheduler check': 'Parses and validates the configured CMI scheduler file.',
      '/_scheduler scan': 'Alias for the scheduler check action.',
      '/_scheduler export': 'Writes the latest check as Markdown, running a fresh check first when needed.',
      '/_scheduler list [all|enabled|disabled]': 'Lists scheduler entries by state.',
      '/_scheduler list id <key>': 'Shows full details for one scheduler entry.',
      '/_scheduler set <key> <true|false>': 'Sets one entry Enabled: true or false with a line-preserving edit.',
      '/_scheduler reload': 'Reloads SchedulerCheck config and messages.',
    },
    notes: [
      'A full /stop and server start is still the cleanest way to apply CMI scheduler file changes.',
      'You can try /cmi reload or /cmi schedule <key> for CMI-side testing, but do not treat that as a full restart.',
      'Exports may include scheduler command lines, so review reports before posting them publicly.',
    ],
    includeInCommandIndex: false,
  },
  socialgatherings: {
    summary: 'Join small social activities around campfires, dinners, fishing, farms, markets, and other town spots.',
    intro: 'SocialGatherings rewards players for meeting up and doing small themed activities together. Some gatherings may happen around town builds such as campfires, dinner tables, beaches, markets, farms, or fishing spots.',
    bullets: [
      'Use /gathering to see the main gathering information.',
      'Use /gathering types to browse gathering themes when they are enabled.',
      'Use /gathering nearby to see whether your current location matches an active gathering area.',
      'Use /gathering toggle if you want to opt in or out of gathering participation.',
    ],
  },
  tpauto: {
    summary: 'Automatically accept teleport requests from trusted players when you want easier visits.',
    intro: 'TPAuto lets players automatically accept incoming teleport requests when the feature is available to them. It is useful when you are hosting, building with friends, or helping visitors and do not want to accept every request manually.',
  },
  votetokens: {
    summary: 'Trade vote tokens through safe menus, track tiers, and use eligible vote reward tools.',
    intro: 'VoteTokens gives players a safer menu for vote-token rewards. Open the menu to review trades, check progress, and use token tools when your account has access.',
  },
};

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
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;')
    .trim();
}

function formatCommand(value) {
  return escapeHtml(value)
    .replaceAll('|', '|<wbr />');
}

function uniqueValues(values) {
  const seen = new Set();
  const unique = [];
  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(value);
  }
  return unique;
}

function sentenceCase(value) {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function clampText(value, maxLength = 220) {
  if (value.length <= maxLength) {
    return value;
  }
  const trimmed = value.slice(0, maxLength - 3);
  const lastSpace = trimmed.lastIndexOf(' ');
  return `${trimmed.slice(0, lastSpace > 80 ? lastSpace : trimmed.length)}...`;
}

function friendlyText(value) {
  const cleaned = cleanMarkdownCell(value)
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/through CMI from console/gi, 'through the server safely')
    .replace(/through CMI/gi, 'through the server')
    .replace(/CMI's teleport handler/gi, 'the server teleport system')
    .replace(/checks NameMC's public API asynchronously/gi, 'checks the NameMC like in the background')
    .replace(/one-time reward commands/gi, 'one-time rewards')
    .replace(/disabled-emote admin review,?\s*/gi, '')
    .replace(/,\s*and admin control[^.]+/gi, '')
    .replace(/admin control[^.]+/gi, '')
    .replace(/1MB-CMIAPI replacement for the standalone [^.]+/gi, 'safer server version of an older feature')
    .replace(/stores state in shared [^.]+/gi, 'remembers each player safely')
    .replace(/uses the same [^.]+ patterns as the rest of the [^.]+/gi, 'uses the normal server style')
    .replace(/\bCMI-backed\b/gi, 'server-backed')
    .replace(/\bCMI warps\b/gi, 'server warps')
    .replace(/\bCMI warp\b/gi, 'server warp')
    .replace(/\bCMI sell\b/gi, 'server sell')
    .replace(/\bCMI private-message\b/gi, 'private-message')
    .replace(/\bCMI nickname\b/gi, 'server nickname')
    .replace(/\bCMI nicknames\b/gi, 'server nicknames')
    .replace(/\bCMI mail\b/gi, 'server mail')
    .replace(/\bCMI\b/g, 'server')
    .replace(/\bPlaceholderAPI\b/g, 'server')
    .replace(/\bLuckPerms\b/g, 'server group')
    .replace(/\bPaper PersistentDataContainer data\b/gi, 'server item data')
    .replace(/\bPersistentDataContainer\b/gi, 'server item data')
    .replace(/\bPDC\b/g, 'server item data')
    .replace(/\bCMILib\b/g, 'server library')
    .replace(/\bPaper\b/g, 'server')
    .replace(/\bserver\/server\b/g, 'server')
    .replace(/\s+/g, ' ')
    .trim();
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => ![' staff ', 'staff ', ' admin ', 'admin ', ' console ', 'console '].some((blocked) => ` ${sentence.toLowerCase()}`.includes(blocked)))
    .join(' ')
    .trim();
  return sentenceCase(sentences || cleaned);
}

function markdownList(items) {
  if (!items.length) {
    return '- More player-facing details will be added here as the feature guide grows.';
  }
  return items.map((item) => `- ${escapeHtml(clampText(friendlyText(item)))}`).join('\n');
}

function numberedList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
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

function slugFromFile(file) {
  return path.basename(file, '.md').toLowerCase();
}

function normalizeHeading(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function extractSection(markdown, headingNames) {
  const wanted = new Set(headingNames.map(normalizeHeading));
  const lines = markdown.split('\n');
  let start = -1;
  let level = 0;
  for (let index = 0; index < lines.length; index++) {
    const match = lines[index].match(/^(#{2,6})\s+(.+?)\s*$/);
    if (!match) {
      continue;
    }
    if (wanted.has(normalizeHeading(match[2]))) {
      start = index + 1;
      level = match[1].length;
      break;
    }
  }
  if (start < 0) {
    return '';
  }
  let end = lines.length;
  for (let index = start; index < lines.length; index++) {
    const match = lines[index].match(/^(#{2,6})\s+/);
    if (match && match[1].length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n').trim();
}

function firstParagraph(section) {
  return section
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith('```') && !part.startsWith('- ') && !part.startsWith('|'))
    ?.replace(/\s+/g, ' ')
    .trim() ?? '';
}

function paragraphs(section) {
  return section
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter((part) => part
      && !part.startsWith('```')
      && !part.startsWith('- ')
      && !part.startsWith('|')
      && !part.startsWith('#'))
    .map((part) => part.replace(/\s+/g, ' ').trim());
}

function extractListItems(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .map((line) => line.match(/^[-*]\s+(.+)$/)?.[1] ?? line.match(/^\d+\.\s+(.+)$/)?.[1] ?? '')
    .filter(Boolean);
}

function isPlayerFacingText(value) {
  const text = friendlyText(value);
  const lower = text.toLowerCase();
  if (text.length < 16 || text.length > 320) {
    return false;
  }
  return ![
    '/1mbcmi',
    '/_',
    ' admin ',
    'admin-only',
    ' staff ',
    'staff-only',
    ' debug',
    ' permission',
    ' placeholder',
    ' config',
    ' yml',
    '.yml',
    'plugin.yml',
    ' data folder',
    ' feature folder',
    ' database',
    ' sqlite',
    ' log file',
    ' logs/',
    'plugins/',
    ' listener',
    'listen to',
    'cmiplayer',
    'itemsellevent',
    ' long-lived',
    'stores ',
    'reset player',
    ' load ',
    ' save ',
    ' read server',
    ' worth values',
    ' records in',
    'statistic.',
    'papi',
    'eligibility.',
    'require-not',
    'display name',
    'item amount',
    'server-side issue id',
    'finite charges',
    'material, color',
    ' source',
    ' console',
    ' installed',
    ' operator',
    ' reload',
    ' inspect',
    ' testing',
    ' smoke test',
    ' dependency',
    ' api',
    ' hook',
    ' migration',
    ' setup',
    ' register command',
    ' shared library',
    ' direct server',
    ' rcon',
    ' luckperms',
    ' vault',
  ].some((blocked) => lower.includes(blocked));
}

function introParagraph(markdown, plugin) {
  const purpose = firstParagraph(extractSection(markdown, ['Purpose']));
  const titleless = markdown.replace(/^#\s+.+?\n+/, '');
  const first = firstParagraph(titleless);
  const candidates = [purpose, first, plugin.purpose].map(friendlyText).filter(Boolean).map((value) => clampText(value, 300));
  return candidates.find(isPlayerFacingText) ?? candidates.at(-1) ?? plugin.purpose;
}

function guideParagraphs(markdown, plugin, commandData) {
  const sections = [
    extractSection(markdown, ['Player Experience']),
    extractSection(markdown, ['Player Flow']),
    extractSection(markdown, ['Player Guide']),
  ].filter(Boolean);
  const selected = sections
    .flatMap(paragraphs)
    .map(friendlyText)
    .filter(isPlayerFacingText)
    .slice(0, 2);
  if (selected.length) {
    return selected.map((paragraph) => escapeHtml(paragraph)).join('\n\n');
  }
  const root = commandData.playerCommands.find((command) => commandParts(command).length === 1) ?? commandData.playerCommands[0];
  if (root) {
    return escapeHtml(`Start in-game with ${commandExample(root)}. The sections below explain what ${plugin.name} is for, which commands players can try, and what to expect when your account has access.`);
  }
  return escapeHtml(`Use this page as a friendly guide to ${plugin.name}. It explains what the feature is for, what players can try in-game, and which commands are available when your account has access.`);
}

function fallbackPlayerBullets(plugin, commandData) {
  const commands = commandData.playerCommands;
  const root = commands.find((command) => commandParts(command).length === 1);
  const status = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'status');
  const top = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'top');
  const set = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'set');
  const list = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'list');
  return uniqueValues([
    root ? `Open or view ${plugin.name} with ${commandExample(root)}.` : '',
    status ? `Check your own ${plugin.name} progress or settings with ${commandExample(status)}.` : '',
    set ? `Update your own ${plugin.name} settings with commands such as ${commandExample(set)}.` : '',
    list ? `Browse available ${plugin.name} entries with ${commandExample(list)}.` : '',
    top ? `View public ${plugin.name} rankings with ${commandExample(top)}.` : '',
  ].filter(Boolean));
}

function playerBulletItems(plugin, markdown, commandData) {
  const sectionNames = [
    'Player Experience',
    'Player Flow',
    'Player Guide',
    'Features',
    'How Streaks Work',
    'Behavior',
    'Tier Rules',
    'Tools Page',
    'Plain Mode',
    'Legacy Nickname Migration',
    'Default Gathering Types',
    'Fair Alternatives For Players Who Cannot Vote',
  ];
  const items = sectionNames
    .map((name) => extractSection(markdown, [name]))
    .filter(Boolean)
    .flatMap(extractListItems)
    .map(friendlyText)
    .filter(isPlayerFacingText);
  if (items.length >= 3) {
    return uniqueValues(items).slice(0, 8);
  }
  return fallbackPlayerBullets(plugin, commandData);
}

function quickStartSteps(plugin, commandData) {
  const commands = commandData.playerCommands;
  if (!commands.length) {
    return [
      `Open the feature from the server menu when it is available.`,
      `Check the feature page again later as more player-facing details are added.`,
    ];
  }
  const root = commands.find((command) => commandParts(command).length === 1) ?? commands[0];
  const status = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'status');
  const help = commands.find((command) => commandParts(command)[1]?.toLowerCase() === 'help' || commandParts(command)[1]?.toLowerCase() === 'info');
  const action = commands.find((command) => ![root, status, help].includes(command));
  return uniqueValues([
    `Start with \`${commandExample(root)}\` to open or view ${plugin.name}.`,
    status ? `Use \`${commandExample(status)}\` to check your current progress, settings, or state.` : '',
    help ? `Use \`${commandExample(help)}\` when you want the in-game help or a short explanation.` : '',
    action ? `Try \`${commandExample(action)}\` when you are ready to use one of the feature actions.` : '',
  ].filter(Boolean));
}

function goodToKnow(plugin, commandData) {
  const notes = [
    'Some commands may be hidden until your group, event progress, or unlocks allow them.',
    'If a command opens a menu, follow the buttons in-game; the website is only the learning guide.',
  ];
  if (commandData.playerAliases.length) {
    notes.push(`You may also see ${commandData.playerAliases.map((alias) => `\`${alias}\``).join(' or ')} as a shortcut.`);
  }
  if (commandData.playerCommands.some((command) => command.includes('top'))) {
    notes.push('Top lists and leaderboards are public-facing progress views when the feature enables them.');
  }
  if (commandData.playerCommands.some((command) => command.includes('set'))) {
    notes.push('Settings commands only change your own player preferences unless the page says otherwise.');
  }
  if (plugin.name.toLowerCase().includes('nick')) {
    notes.push('Nicknames are intentionally more limited than raw color-code nicknames, so names stay readable and recognizable.');
  }
  return notes;
}

function codeBlocks(section) {
  const blocks = [];
  const regex = /```[a-zA-Z0-9_-]*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(section)) !== null) {
    const before = section.slice(0, match.index).split('\n').map((line) => line.trim()).filter(Boolean);
    const label = before.at(-1)?.replace(/:$/, '') ?? '';
    const lines = match[1]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('/'));
    blocks.push({ label, lines });
  }
  return blocks;
}

function isLikelyPlayerCommand(command) {
  const value = command.toLowerCase();
  const parts = commandParts(command).map((part) => part.toLowerCase());
  const root = parts[0] ?? '';
  const sub = parts[1] ?? '';
  if (!value.startsWith('/')) {
    return false;
  }
  if (value.startsWith('/1mbcmi') || value.startsWith('/_')) {
    return false;
  }
  if ([
    'admin',
    'debug',
    'reload',
    'config',
    'inspect',
    'permissions',
    'placeholders',
    'hooks',
    'setgoal',
    'create',
    'clone',
    'delete',
    'capture',
    'enable',
    'disable',
    'start',
    'stop',
    'command',
    'test',
    'migrate',
    'import',
    'export',
    'award',
    'grant',
    'give',
    'revoke',
  ].includes(sub)) {
    return false;
  }
  if (root === '/trade' && sub && !['info', 'help', 'open'].includes(sub)) {
    return false;
  }
  if (root === '/emotes' && ['aliases', 'disabled', 'set'].includes(sub)) {
    return false;
  }
  if (root === '/menu' && sub === 'open') {
    return false;
  }
  return ![
    ' admin',
    ' debug',
    ' reload',
    ' config',
    ' inspect',
    ' permissions',
    ' placeholders',
    ' hooks',
    ' setgoal',
    ' migrate',
    ' import',
    ' export',
    ' <command>',
    ' <path>',
    ' <value>',
    '--',
  ].some((blocked) => value.includes(blocked));
}

function commandParts(command) {
  return command
    .replace(/\[[^\]]+]/g, '')
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function commandDescription(command, plugin) {
  const parts = commandParts(command);
  const sub = parts[1]?.toLowerCase() ?? '';
  const pluginName = plugin.name;
  if (!sub) {
    return `Opens or shows the main ${pluginName} player view.`;
  }
  if (sub === 'info') {
    return `Shows a friendly explanation of what ${pluginName} does.`;
  }
  if (sub === 'help') {
    return `Shows the ${pluginName} commands available to you.`;
  }
  if (sub === 'status') {
    return `Shows your current ${pluginName} status.`;
  }
  if (sub === 'top') {
    return `Shows the ${pluginName} leaderboard or top list.`;
  }
  if (sub === 'goals') {
    return 'Shows current goals and progress.';
  }
  if (sub === 'cooldown') {
    return `Changes or reviews your ${pluginName} cooldown setting.`;
  }
  if (sub === 'set') {
    return `Sets one of your ${pluginName} preferences.`;
  }
  if (['on', 'off', 'toggle', 'clear'].includes(sub)) {
    return `Changes or clears your ${pluginName} setting.`;
  }
  if (sub === 'bio') {
    return 'Sets your short public nickname bio.';
  }
  if (sub === 'rate') {
    return "Rates another player's nickname when rating is available.";
  }
  if (sub === 'share') {
    return 'Shares your current public design when sharing is enabled.';
  }
  if (sub === 'copycat') {
    return "Copies another player's public style when it is allowed.";
  }
  if (sub === 'realname') {
    return "Shows a player's real Minecraft name when the command is available.";
  }
  if (sub === 'greetings') {
    return 'Changes or sends your celebration greetings.';
  }
  if (sub === 'history') {
    return 'Shows recent choices you can restore.';
  }
  if (sub === 'favorite' || sub === 'favourite') {
    return 'Saves or restores one of your favorite choices.';
  }
  if (sub === 'legacy') {
    return 'Shows or restores your captured legacy nickname when available.';
  }
  if (sub === 'tools') {
    return 'Opens helper tools for this feature.';
  }
  if (sub === 'gui') {
    return `Opens the ${pluginName} menu.`;
  }
  if (sub === 'list') {
    return `Lists available ${pluginName} entries.`;
  }
  if (sub === 'open') {
    return `Opens a specific ${pluginName} menu or entry.`;
  }
  if (sub === 'preview') {
    return `Previews a ${pluginName} choice before applying it.`;
  }
  if (sub === 'claim') {
    return `Claims an available ${pluginName} reward.`;
  }
  if (sub === 'unset') {
    return `Removes or turns off your ${pluginName} setup.`;
  }
  if (sub === 'mail') {
    return `Sends or reviews a ${pluginName} mail message when available.`;
  }
  if (sub === 'guestbook') {
    return 'Views or adds a friendly guestbook message.';
  }
  if (sub === 'presets') {
    return 'Changes your particle or sound preset.';
  }
  if (sub === 'visibility') {
    return 'Changes whether this information is private or public.';
  }
  if (sub === 'effects') {
    return 'Turns cosmetic effects on or off.';
  }
  if (sub === 'link') {
    return 'Shows how to link Discord when the feature uses Discord rewards.';
  }
  if (sub === 'optout') {
    return 'Toggles optional reminders for your account.';
  }
  if (sub === 'celebrations') {
    return 'Toggles whether your major milestones can be announced publicly.';
  }
  if (['rewards', 'milestones', 'history', 'pulse'].includes(sub)) {
    return `Shows your ${pluginName} ${sub} view.`;
  }
  if (['view', 'edit', 'done', 'complete', 'undo', 'reopen', 'remove', 'reset', 'search'].includes(sub)) {
    return `Manages one of your ${pluginName} entries.`;
  }
  if (sub.startsWith('<')) {
    return `Uses ${pluginName} with the value you provide.`;
  }
  return `Runs the ${pluginName} ${sub} action.`;
}

function splitMarkdownTableRow(line) {
  const cells = [];
  let current = '';
  let escaped = false;
  for (const char of line.trim()) {
    if (char === '\\' && !escaped) {
      escaped = true;
      current += char;
      continue;
    }
    if (char === '|' && !escaped) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += char;
    escaped = false;
  }
  cells.push(current.trim());
  return cells.filter((cell, index) => !(index === 0 && cell === '')).filter((cell, index, values) => !(index === values.length - 1 && cell === ''));
}

function cleanMarkdownCell(value) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1')
    .replace(/\\\|/g, '|')
    .replace(/\s+/g, ' ')
    .trim();
}

function commandRowsFromMarkdownTables(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && line.includes('/'))
    .map(splitMarkdownTableRow)
    .filter((cells) => cells.length >= 2)
    .map((cells) => ({
      command: cleanMarkdownCell(cells[0]),
      explanation: cleanMarkdownCell(cells[1] ?? ''),
      example: cleanMarkdownCell(cells[2] ?? ''),
    }))
    .filter((row) => row.command.startsWith('/') && !row.command.toLowerCase().includes('command'));
}

function commandExample(command) {
  return command
    .replace(/\s+\[[^\]]+]/g, '')
    .replace(/<on\|off>/gi, 'on')
    .replace(/<true\|false>/gi, 'true')
    .replace(/<preset\|off\|status>/gi, 'normal')
    .replace(/<lighter\|darker\|warmer\|cooler\|redder\|greener\|bluer\|pastel\|softer\|bolder\|random>/gi, 'pastel')
    .replace(/<lighter\|darker\|warmer\|cooler>/gi, 'lighter')
    .replace(/<short\|normal\|long\|off\|status>/gi, 'normal')
    .replace(/<private\|public>/gi, 'public')
    .replace(/<on\|off\|send>/gi, 'on')
    .replace(/<particle\|sound>/gi, 'particle')
    .replace(/<preset\|default>/gi, 'sparkle')
    .replace(/<preset\|off>/gi, 'sparkle')
    .replace(/<head\|back\|shoulder-left\|shoulder-right\|reset>/gi, 'head')
    .replace(/<month day\|MM-DD\|YYYY-MM-DD>/gi, '03-07')
    .replace(/<world\|warp\|visit\|biome\|block\|item\|consume\|tool\|weapon\|armor\|kill\|mount\|explore>/gi, 'warp')
    .replace(/<category>/gi, 'vote')
    .replace(/<type>/gi, 'oneblock')
    .replace(/<tier>/gi, 'starter')
    .replace(/<keyword>/gi, 'cheer')
    .replace(/<emote>/gi, 'cheer')
    .replace(/<reward-id>/gi, 'birthday-1')
    .replace(/<reward>/gi, 'daily')
    .replace(/<box>/gi, 'basic')
    .replace(/<id>/gi, '1')
    .replace(/<message>/gi, 'Happy birthday!')
    .replace(/<new text>/gi, 'Build a starter house')
    .replace(/<text>/gi, 'Build a starter house')
    .replace(/<font>/gi, 'default')
    .replace(/<duration>/gi, '1h')
    .replace(/<tip-id>/gi, 'welcome')
    .replace(/<entry>/gi, 'spawn')
    .replace(/<playerName?>/gi, 'Steve')
    .replace(/<player>/gi, 'Steve')
    .replace(/<target>/gi, 'Steve')
    .replace(/<material>/gi, 'DIAMOND')
    .replace(/<amount>/gi, '10')
    .replace(/<page>/gi, '1')
    .replace(/<slot>/gi, '1')
    .replace(/<1-5>/gi, '5')
    .replace(/<style-id>/gi, 'soft_blue')
    .replace(/<short bio>/gi, 'I like building cozy farms')
    .replace(/<short msg>/gi, 'Welcome to my base')
    .replace(/<name>/gi, 'YourName')
    .replace(/<[^>]+>/g, 'example')
    .trim();
}

function extractCommandData(markdown) {
  const commandsSection = extractSection(markdown, ['Commands']);
  const exampleSection = extractSection(markdown, ['Example Commands', 'Examples', 'Example Flow', 'Useful Examples']);
  const commandBlocks = codeBlocks(commandsSection);
  const exampleBlocks = codeBlocks(exampleSection);
  const tableRows = commandRowsFromMarkdownTables(commandsSection);
  const commands = [];
  const examples = [];
  const aliases = [];
  const descriptions = new Map();

  for (const block of commandBlocks) {
    const label = normalizeHeading(block.label);
    if (label.includes('alias')) {
      aliases.push(...block.lines);
    } else if (label.includes('example')) {
      examples.push(...block.lines);
    } else if (label.includes('global')) {
      continue;
    } else {
      commands.push(...block.lines);
    }
  }
  for (const block of exampleBlocks) {
    examples.push(...block.lines);
  }
  for (const row of tableRows) {
    commands.push(row.command);
    if (row.explanation) {
      descriptions.set(row.command, row.explanation);
    }
    if (row.example.startsWith('/')) {
      examples.push(row.example);
    }
  }

  const playerCommands = [...new Set(commands.filter(isLikelyPlayerCommand))];
  const playerExamples = [...new Set(examples.filter(isLikelyPlayerCommand))];
  const playerAliases = [...new Set(aliases.filter(isLikelyPlayerCommand))];
  return { playerCommands, playerExamples, playerAliases, descriptions };
}

function commandTable(commands) {
  const rows = commands
    .map(([command, purpose]) => `    <tr>
      <td><code>${formatCommand(command)}</code></td>
      <td>${escapeHtml(purpose)}</td>
    </tr>`)
    .join('\n');

  return `<table class="command-table">
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

function commandIndexTable(rows, guidePathPrefix = '../plugins/') {
  const htmlRows = rows
    .map((row) => `    <tr>
      <td><a href="${guidePathPrefix}${row.slug}/">${escapeHtml(row.plugin)}</a></td>
      <td><code>${formatCommand(row.command)}</code></td>
      <td>${escapeHtml(friendlyText(row.description))}</td>
      <td><code>${formatCommand(row.example)}</code></td>
    </tr>`)
    .join('\n');

  return `<table class="command-table command-index-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Command</th>
      <th>What it does</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
${htmlRows}
  </tbody>
</table>`;
}

function commandPreview(details, guideHref) {
  const commands = details?.playerCommands ?? [];
  if (!commands.length) {
    return 'No player commands listed yet.';
  }
  const preview = commands.slice(0, 4).map((command) => `<code>${formatCommand(command)}</code>`).join(', ');
  const hidden = commands.length - 4;
  if (hidden <= 0) {
    return preview;
  }
  return `${preview}, <a href="${guideHref}">+${hidden} more</a>`;
}

function summaryText(plugin) {
  const override = PLAYER_GUIDE_OVERRIDES[slugFromFile(plugin.file)];
  if (override?.summary) {
    return override.summary;
  }
  const summary = friendlyText(plugin.purpose);
  if (isPlayerFacingText(summary)) {
    return summary;
  }
  return `Player guide for ${plugin.name}, with commands, examples, and basic usage notes.`;
}

function pluginTable(plugins, pluginDetails, guidePathPrefix = './plugins/') {
  const rows = plugins
    .map((plugin) => {
      const slug = slugFromFile(plugin.file);
      const details = pluginDetails.get(slug);
      const guideHref = `${guidePathPrefix}${slug}/`;
      return `    <tr>
      <td><a href="${guideHref}">${escapeHtml(plugin.name)}</a></td>
      <td>${escapeHtml(plugin.category)}</td>
      <td>${escapeHtml(summaryText(plugin))}</td>
      <td>${commandPreview(details, guideHref)}</td>
    </tr>`;
    })
    .join('\n');

  return `<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Category</th>
      <th>Summary</th>
      <th>Commands</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
}

function pluginCommandTable(plugin, commandData) {
  const rows = commandData.playerCommands
    .map((command) => `    <tr>
      <td><code>${formatCommand(command)}</code></td>
      <td>${escapeHtml(friendlyText(commandData.descriptions.get(command) || commandDescription(command, plugin)))}</td>
      <td><code>${formatCommand(commandExample(command))}</code></td>
    </tr>`)
    .join('\n');

  return `<table class="command-table plugin-command-table">
  <thead>
    <tr>
      <th>Command</th>
      <th>What it does</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
}

function examplesList(examples) {
  if (!examples.length) {
    return '- No separate examples are listed yet. Use the command examples above as a starting point.';
  }
  return examples.map((example) => `- \`${example}\``).join('\n');
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
const guidePlugins = plugins.filter((plugin) => plugin.file !== 'hoppers-roadmap.md');
const pluginDetails = new Map();
const commandIndexRows = [];

await mkdir(contentRoot, { recursive: true });
await mkdir(path.join(contentRoot, 'player-guides'), { recursive: true });
await mkdir(path.join(contentRoot, 'staff-reference'), { recursive: true });
await rm(pluginGuideRoot, { recursive: true, force: true });
await mkdir(pluginGuideRoot, { recursive: true });

for (const plugin of guidePlugins) {
  const slug = slugFromFile(plugin.file);
  const override = PLAYER_GUIDE_OVERRIDES[slug] ?? {};
  const markdown = await readFile(path.join(docsRoot, 'plugins', plugin.file), 'utf8');
  const purpose = override.intro ?? introParagraph(markdown, plugin);
  const commandData = extractCommandData(markdown);
  if (override.commands) {
    commandData.playerCommands = override.commands;
  }
  if (override.aliases) {
    commandData.playerAliases = override.aliases;
  }
  if (override.commandExamples) {
    commandData.playerExamples = override.commandExamples;
  }
  if (override.commandDescriptions) {
    for (const [command, description] of Object.entries(override.commandDescriptions)) {
      commandData.descriptions.set(command, description);
    }
  }
  const guideBody = override.guide ? escapeHtml(override.guide).replaceAll('\n\n', '\n\n') : guideParagraphs(markdown, plugin, commandData);
  const quickStart = override.quickStart ?? quickStartSteps(plugin, commandData);
  const playerBullets = override.bullets ?? playerBulletItems(plugin, markdown, commandData);
  const notes = override.notes ?? goodToKnow(plugin, commandData);
  const examples = override.examples ?? commandData.playerExamples;
  const pageIntro = override.pageIntro ?? `This page introduces ${escapeHtml(plugin.name)} from a public server-docs point of view. It focuses on what the feature does in-game, how to get started when you have access, and which commands are useful.`;
  const audienceHeading = override.audienceHeading ?? 'How Players Use It';
  pluginDetails.set(slug, commandData);

  for (const command of override.includeInCommandIndex === false ? [] : commandData.playerCommands) {
    commandIndexRows.push({
      slug,
      plugin: plugin.name,
      command,
      description: commandData.descriptions.get(command) || commandDescription(command, plugin),
      example: commandExample(command),
    });
  }

  await writeFile(path.join(pluginGuideRoot, `${slug}.mdx`), `---
title: ${plugin.name} Guide
description: Learn what ${plugin.name} does, how to use it, and which public commands are available.
---

${pageIntro}

## What It Does

${escapeHtml(purpose)}

## ${audienceHeading}

${guideBody}

## Things You Can Do

${markdownList(playerBullets)}

## Quick Start

${numberedList(quickStart)}

## Commands

${commandData.playerCommands.length ? pluginCommandTable(plugin, commandData) : 'No player-facing commands are listed for this plugin yet.'}

${commandData.playerAliases.length ? `## Aliases\n\n${commandData.playerAliases.map((alias) => `- \`${alias}\``).join('\n')}\n\n` : ''}## Examples

${examplesList(examples)}

## Good To Know

${markdownList(notes)}

## Full Reference

The [full synced ${plugin.name} reference](${publicRepoBlob}/project-docs/docs/plugins/${plugin.file}) is available for exact technical details.
`);
}

await writeFile(path.join(pluginGuideRoot, 'index.mdx'), `---
title: Plugin Guides
description: Friendly public guides for 1MoreBlock plugin features.
---

Each page introduces a feature in normal server language, then shows useful commands and examples you can try when you have access.

${pluginTable(guidePlugins, pluginDetails, './')}
`);

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
- [Plugin guides](./player-guides/plugins/) explain each feature, how to use it, commands, and examples.
- [Staff reference](./staff-reference/) links to the raw synced documentation for deeper staff review.

## Public URL

The public player-facing docs URL is:

https://docs.1moreblock.com/

The GitHub Pages origin location is still available for deployment/reference:

https://mrfdev.github.io/1MB-Plugins-Docs/
`);

await writeFile(path.join(contentRoot, 'player-guides', 'getting-started.mdx'), `---
title: Getting Started
description: What players need to know about the 1MoreBlock plugin docs.
---

These docs are here to explain what server features do in normal player language.

Not every command is available to every player. Some features are rewards, staff tools, event perks, or unlocks. If a command does not work for you, it may be disabled, hidden, or permission-locked for your current group.

## What you can learn here

- What a feature does.
- How a feature feels in-game.
- How to get started with a feature.
- Which commands players may see.
- Example commands you can try.
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

For the fuller introduction to each feature, open the [plugin guides](../plugins/). Those pages explain what each feature does before listing commands.

## All Listed Player Commands

This table is generated from the synced plugin documentation. It filters out obvious admin, debug, reload, and global library commands.

${commandIndexTable(commandIndexRows, '../plugins/')}

## Good to know

- Some commands open menus instead of printing lots of chat text.
- Some features are event rewards or group perks.
- Staff and admin-only commands are intentionally not listed as player commands here.
`);

await writeFile(path.join(contentRoot, 'player-guides', 'features.mdx'), `---
title: Player Feature Overview
description: Friendly summary of player-facing 1MoreBlock plugin features.
---

These are the current player-facing feature guides generated from the synced project documentation. Open a feature when you want the friendly explanation, command list, and examples in one place.

${pluginTable(playerPlugins, pluginDetails, '../plugins/')}
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
