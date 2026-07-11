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
  afkshrine: {
    summary: 'Turn AFK time into shrine visuals, return postcards, tokens, milestones, quests, presets, and community progress.',
    intro: 'AFKShrine turns server AFK time into a small personal shrine experience. When you become AFK, the feature can show soft particles, a private bossbar, and progress views. When you return, AFKShrine can show a private postcard summary and let you claim pending tokens, review rewards, check milestones, and personalize your shrine preset.',
    guide: 'AFKShrine is meant to make being away feel clearer and a little more fun, without automatically dumping rewards into your inventory. Your AFK sessions can create pending AFKShrine tokens, milestone progress, quest progress, and collection album entries. You return, review what happened, then claim or trade rewards when you are ready.',
    features: [
      'AFK shrine visuals with soft particles, optional sparkles, and a private bossbar while you are AFK.',
      'Private welcome-back postcards with AFK time, approximate location, biome, weather or scene, damage taken, progress, cap room, and next actions.',
      'Dynamic bossbar views for session time, reward eligibility, pending tokens, daily caps, streaks, seasonal progress, and community progress.',
      'Pending-token claiming and preview-first reward trades through /afkshrine claim, /afkshrine rewards, and /afkshrine trade.',
      'Time, biome, safety, risk, adventure, weather, seasonal, dimension, collection, and streak milestones and quests.',
      'Permission-gated particle presets that players can inspect and select.',
      'A collection album and reset summary showing completed, repeatable, refreshed, and still-available goals.',
      'Optional low-reward bed-rest activity with cooldown protection.',
      'Server-wide community milestones with temporary celebration windows.',
      'Optional captured-item tools and upgrades configured by staff.',
    ],
    quickStart: [
      'Start with `/afkshrine menu` or `/afkshrine gui` to open the AFKShrine hub.',
      'After an AFK session, read the AFK postcard summary and use `/afkshrine claim` if you have pending tokens.',
      'Use `/afkshrine rewards` before trading so you can see costs, one-time rewards, repeatable rewards, and what you can afford.',
      'Use `/afkshrine milestones` and `/afkshrine album` when you want to explore longer-term goals.',
    ],
    examples: [
      '/afkshrine menu',
      '/afkshrine claim',
      '/afkshrine rewards',
      '/afkshrine trade',
      '/afkshrine milestones weather',
      '/afkshrine album',
      '/afkshrine resets ready',
      '/afkshrine presets',
      '/afkshrine preset mint',
    ],
    commandDescriptions: {
      '/afkshrine': 'Opens the AFKShrine entry point or shows basic AFKShrine information.',
      '/afkshrine toggle': 'Turns your personal AFKShrine participation on or off when the feature allows it.',
      '/afkshrine status': 'Shows your current AFKShrine state and basic settings.',
      '/afkshrine stats [personal|server]': 'Shows personal AFKShrine stats or server-wide AFKShrine stats.',
      '/afkshrine stats 1': 'Shows the personal AFKShrine stats page.',
      '/afkshrine stats 2': 'Shows the global/server AFKShrine stats page.',
      '/afkshrine balance': 'Shows pending tokens, claimed spendable tokens, streaks, and related progress.',
      '/afkshrine claim': 'Moves pending AFKShrine tokens into your claimed spendable balance.',
      '/afkshrine rewards [page]': 'Lists configured reward trades, costs, availability, one-time state, and whether you can afford them.',
      '/afkshrine trade': 'Opens the reward overview so you can choose a trade instead of guessing an id.',
      '/afkshrine trade <reward> [confirm]': 'Previews a reward trade, or confirms it when you include confirm.',
      '/afkshrine gui': 'Opens the AFKShrine GUI hub.',
      '/afkshrine menu': 'Opens the AFKShrine GUI hub.',
      '/afkshrine tools': 'Opens or lists AFKShrine tools and upgrades when enabled for players.',
      '/afkshrine tools list': 'Lists available AFKShrine tool actions in chat.',
      '/afkshrine tools claim <action> [confirm]': 'Previews or confirms a tool action that spends captured AFKShrine special items.',
      '/afkshrine milestones [all|time|biomes|safety|risk|quests|weather|seasonal|dimensions|collections|streaks|claim-streak] [page]': 'Explains AFKShrine milestone families and how they repeat or unlock.',
      '/afkshrine quests': 'Shows AFKShrine quest progress such as weather, seasonal, adventure, and dimension goals.',
      '/afkshrine resets [category|daily|weekly|monthly|ready|used|complete|inactive] [page]': 'Shows which repeatable milestones refreshed, are ready, were used, or are complete.',
      '/afkshrine album [all|time|biomes|safety|risk|events|quests|weather|seasonal|streaks|collections] [page]': 'Shows your AFKShrine collection album and completion counts.',
      '/afkshrine community': 'Shows server-wide AFKShrine community milestone progress.',
      '/afkshrine top [daily|weekly|monthly|lifetime]': 'Shows AFKShrine leaderboards.',
      '/afkshrine styles': 'Older alias for listing shrine styles.',
      '/afkshrine style [style]': 'Older alias for showing or setting your shrine preset.',
      '/afkshrine presets': 'Lists shrine particle presets with availability and hover details.',
      '/afkshrine preset [preset]': 'Shows your current preset, lists presets, or sets your chosen preset.',
      '/afkshrine preview [style] [seconds]': 'Previews a shrine preset when preview access is enabled.',
      '/afkshrine preview stop': 'Stops your active shrine preset preview.',
    },
    notes: [
      'AFK postcards are private welcome-back summaries, not public broadcasts.',
      'The pending-token explanation is plain text; only the short "Click this text to claim them now." call to action runs /afkshrine claim.',
      'Pending tokens are not spendable until you claim them with /afkshrine claim.',
      'Reward trades preview first; commands that spend tokens or items require confirmation.',
      'Some presets, tools, upgrades, and previews may be locked by rank, event progress, beta access, or server configuration.',
      'Bed rest and same-location checks are intentionally conservative so AFKShrine stays a fun passive feature instead of a farm.',
    ],
  },
  boosters: {
    summary: 'Check which server-wide boosters are active for skills, jobs, points, and special events.',
    intro: 'Boosters lets players check the current server booster status from one simple place. Use it when you want to know whether skill, job, points, or event multipliers are active before you start grinding.',
    features: [
      'A single /rate overview for active mcMMO, Jobs, Points, and DiscordChat event multipliers.',
      'Current booster rates, remaining time, and integration state in chat.',
      'Subtle join reminders when a booster is active.',
      'A personal reminder preference that players can turn on or off.',
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
    features: [
      'A menu and paginated list for browsing available private-message font styles.',
      'Temporary personal font selection without raw formatting codes.',
      'Direct style selection for players who already know the style they want.',
      'A recipient-side plain mode that keeps incoming private messages easy to read.',
    ],
  },
  journeymap: {
    summary: 'Follow playtime eras, badges, milestones, and long-term journey rewards.',
    intro: 'JourneyMap turns long-term playtime into visible eras, badges, milestones, and rewards. Use it to see where you are in your 1MoreBlock journey and what milestones are still ahead.',
  },
  namemc: {
    summary: 'Like the server on NameMC, verify it in-game, and receive the configured one-time reward.',
    intro: 'NameMC lets players support the server on NameMC and verify that support in-game. Open the NameMC page, click the heart, then return to the server and run the verify command when you are ready.',
    features: [
      'A direct link from /namemc to the 1MoreBlock NameMC page.',
      'In-game verification of a NameMC server like for the matching Minecraft account.',
      'A configured one-time reward after successful verification.',
      'Persistent status showing whether the account has already verified its like.',
    ],
  },
  nick: {
    summary: 'Pick readable nickname colors, gradients, tools, favorites, and unlockable styles from the safe nickname picker.',
    intro: 'Nick is the safer /nick system on 1MoreBlock. It gives players a curated nickname picker with readable colors, gradients, cleanup tools, favorites, history, and unlockable styles without letting raw color codes or unsafe text into chat.',
    guide: '`/nick` opens the nickname menu with a live preview. Depending on your permissions and unlocks, you can browse public colors, gradients, seasonal styles, group styles, economy unlocks, milestone styles, moods, tools, history, favorites, top nicknames, and bio settings.\n\nThe menu also includes Quick Undo, Style Lab, milestone progress, and Nick Museum when enabled. Style Lab lets you nudge a safe color lighter, darker, warmer, cooler, redder, greener, bluer, pastel, softer, bolder, or random without typing raw hex codes. Nick Museum tracks styles you have used as a personal collection, and Museum Top shows the largest collections for fun.',
    features: [
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
    features: [
      'A personal PvP on/off switch when the current world and server rules allow it.',
      'A clear status view for the current PvP setting and protection state.',
      'Direct /pvp on, /pvp off, and /pvp toggle choices.',
      'Configurable feedback and visual effects when the state changes.',
    ],
  },
  recordingmode: {
    summary: 'Quiet selected personal messages and requests while recording or streaming.',
    intro: 'Recording mode helps players stream or record without private messages, requests, tips, or map visibility getting in the way. Turn it on before going live, then turn it off when you are done.',
  },
  schedulercheck: {
    summary: 'Owner-only CMI scheduler validator for YAML syntax, timing ranges, command risks, upcoming runs, safe toggles, created tasks, and Markdown reports.',
    intro: 'SchedulerCheck is a direct-console server-owner tool for checking CMI scheduler entries before a restart, after editing the scheduler file, or before adding a simple new scheduled task.',
    guide: 'There is no player-side command for SchedulerCheck. Server owners use it from direct console to check CMI scheduler YAML, review enabled and disabled entries, explain one entry, estimate upcoming fixed-time runs, export reports, safely toggle one schedule entry, or create a basic delay/daily schedule without opening the file system.',
    pageIntro: 'This page documents SchedulerCheck as a public staff/reference guide. It has no player-facing command and intentionally rejects in-game use and RCON.',
    audienceHeading: 'How Staff Use It',
    features: [
      'Run a YAML and value check before trusting a changed scheduler file.',
      'Catch invalid time values such as Hour: 31 or Minute: Five.',
      'List all, enabled, or disabled CMI scheduler entries.',
      'Inspect one scheduler entry by id when you need the full details.',
      'Explain one entry in plain language, including trigger details and command count.',
      'Estimate fixed-time PerformOn runs for the next 24 hours or 7 days.',
      'Export the latest check as full Markdown or compact Discord Markdown.',
      'Toggle one entry with Enabled: true or Enabled: false while logging the reason.',
      'Create a simple disabled delay or daily task from direct console.',
    ],
    quickStart: [
      'Open direct server console, not RCON and not in-game chat.',
      'Run `/_scheduler check` to scan the configured CMI scheduler file.',
      'Use `/_scheduler list enabled` or `/_scheduler list id Announcer` to review specific entries.',
      'Use `/_scheduler explain Announcer` when you want a plain-language summary.',
      'Run `/_scheduler export discord` when you want a compact Markdown report to share with staff.',
    ],
    commands: [
      '/_scheduler',
      '/_scheduler info',
      '/_scheduler help',
      '/_scheduler check',
      '/_scheduler scan',
      '/_scheduler explain <key>',
      '/_scheduler upcoming 24h|7d',
      '/_scheduler export',
      '/_scheduler export discord',
      '/_scheduler list [all|enabled|disabled]',
      '/_scheduler list id <key>',
      '/_scheduler set <key> [enabled] <true|false> [--reason <text>]',
      '/_scheduler create <key> delay <seconds> <true|false> --command <command> [--reason <text>]',
      '/_scheduler create <key> daily <hour> <minute> <true|false> --command <command> [--reason <text>]',
      '/_scheduler reload',
    ],
    examples: [
      '/_scheduler check',
      '/_scheduler export discord',
      '/_scheduler explain Announcer',
      '/_scheduler upcoming 24h',
      '/_scheduler list enabled',
      '/_scheduler list id Announcer',
      '/_scheduler set Announcer enabled false --reason noisy during maintenance',
      '/_scheduler create morningAnnouncer daily 6 0 false --command broadcast! Good morning from 1MoreBlock --reason draft test',
      '/_scheduler create pinataClear delay 600 false --command asFakeOp! pinata killall',
    ],
    commandTableExamples: {
      '/_scheduler explain <key>': '/_scheduler explain Announcer',
      '/_scheduler upcoming 24h|7d': '/_scheduler upcoming 24h',
      '/_scheduler set <key> [enabled] <true|false> [--reason <text>]': '/_scheduler set Announcer enabled false --reason noisy during maintenance',
      '/_scheduler create <key> delay <seconds> <true|false> --command <command> [--reason <text>]': '/_scheduler create pinataClear delay 600 false --command asFakeOp! pinata killall',
      '/_scheduler create <key> daily <hour> <minute> <true|false> --command <command> [--reason <text>]': '/_scheduler create morningAnnouncer daily 6 0 false --command broadcast! Good morning from 1MoreBlock --reason draft test',
    },
    commandDescriptions: {
      '/_scheduler': 'Shows the SchedulerCheck intro from direct console.',
      '/_scheduler info': 'Shows the SchedulerCheck intro and CMI scheduler documentation link.',
      '/_scheduler help': 'Shows command examples.',
      '/_scheduler check': 'Parses and validates the configured CMI scheduler file.',
      '/_scheduler scan': 'Alias for the scheduler check action.',
      '/_scheduler explain <key>': 'Shows a plain-language summary for one scheduler entry.',
      '/_scheduler upcoming 24h|7d': 'Estimates upcoming fixed-time PerformOn runs over the next day or week.',
      '/_scheduler export': 'Writes the latest check as Markdown, running a fresh check first when needed.',
      '/_scheduler export discord': 'Writes a compact Discord-friendly Markdown report.',
      '/_scheduler list [all|enabled|disabled]': 'Lists scheduler entries by state.',
      '/_scheduler list id <key>': 'Shows full details for one scheduler entry.',
      '/_scheduler set <key> [enabled] <true|false> [--reason <text>]': 'Sets one entry Enabled: true or false with a line-preserving edit and audit log entry.',
      '/_scheduler create <key> delay <seconds> <true|false> --command <command> [--reason <text>]': 'Appends a simple delay-based schedule entry, then reloads the YAML to verify it.',
      '/_scheduler create <key> daily <hour> <minute> <true|false> --command <command> [--reason <text>]': 'Appends a simple daily PerformOn schedule entry, then reloads the YAML to verify it.',
      '/_scheduler reload': 'Reloads SchedulerCheck config and messages.',
    },
    notes: [
      'A full /stop and server start is still the cleanest way to apply CMI scheduler file changes.',
      'You can try /cmi reload or /cmi schedule <key> for CMI-side testing, but do not treat that as a full restart.',
      'The scan warns about invalid booleans, invalid numbers, missing Commands on enabled schedules, risky command roots, unknown CMI specialized command prefixes, duplicate enabled schedules, common schedule-id typos, and enabled draft/test-style ids.',
      'Exports may include scheduler command lines, so review reports before posting them publicly.',
    ],
    includeInCommandIndex: false,
  },
  socialgatherings: {
    summary: 'Join small social activities around campfires, dinners, fishing, farms, markets, and other town spots.',
    intro: 'SocialGatherings rewards players for meeting up and doing small themed activities together. Some gatherings may happen around town builds such as campfires, dinner tables, beaches, markets, farms, or fishing spots.',
    features: [
      'Small themed group activities around campfires, dinners, fishing spots, farms, markets, beaches, and town builds.',
      'A gathering-type browser showing the social activities that are currently enabled.',
      'Nearby-area detection that explains whether the current location can host a gathering.',
      'Personal opt-in and opt-out controls for gathering participation.',
    ],
  },
  tpauto: {
    summary: 'Automatically accept teleport requests from trusted players when you want easier visits.',
    intro: 'TPAuto lets players automatically accept incoming teleport requests when the feature is available to them. It is useful when you are hosting, building with friends, or helping visitors and do not want to accept every request manually.',
  },
  votetokens: {
    summary: 'Trade vote tokens through safe menus, track tiers, and use eligible vote reward tools.',
    intro: 'VoteTokens gives players a safer menu for vote-token rewards. Open the menu to review trades, check progress, and use token tools when your account has access.',
    afterFeatures: voteTokenUpgradeGuide(),
  },
};

const FEATURE_BULLET_OVERRIDES = {
  '1mb-cmiapi-lib': [
    'A shared registry for feature names, categories, commands, permissions, placeholders, config paths, and support metadata.',
    'Common configuration, translations, MiniMessage output, pagination, and clickable help components.',
    'Shared UUID playerdata storage, cache ownership, and plugin-scoped cleanup tools.',
    'Hardened GUI holders, click protection, consistent navigation, and the global GUI theme.',
    'Shared permission checks, action rules, denial recording, and permission diagnosis helpers.',
    'Audit redaction, report helpers, placeholder registration, and reusable runtime counters.',
    'The /1mbcmi feature, debug, config, translation, and cleanup command surfaces used by staff.',
  ],
  autosell: [
    'An opt-in AutoSell toggle with GUI controls for categories, individual materials, value filters, worlds, and notifications.',
    'Pure-vanilla item checks that protect the hotbar, offhand, armor, named items, custom items, and blocked materials.',
    'Delayed batch selling with a preview, exact-stack recheck, server economy payment, and item refund if payment fails.',
    'Daily sell caps, inventory-full triggering, recent sale results, and quick blacklist actions from warnings.',
    'Broker levels, milestones, sell chains, streak bonuses, and personal category and material statistics.',
    'Daily and weekly quests with visible progress and claimable rewards.',
    'AutoSell happy-hour boosts that can also appear in /rate.',
    'Chunk-change and overheat safeguards that reduce repetitive automated farming.',
  ],
  birthdaylanterns: [
    'Collectible lantern keepsakes for birthdays, player anniversaries, and 1MoreBlock server milestones.',
    'A /birthday GUI for claimable lanterns, status, presets, greetings, guestbook entries, and mail.',
    'Strict birthday setup with visibility controls and configurable celebration effects.',
    'Particle and sound presets for personal birthday celebrations.',
    'Finite wish charges on marked lantern items, with clear remaining-use details.',
    'Personalized celebration mail and guestbook messages with input limits and safety checks.',
    'Server-marked item identity, claim history, and optional configured reward commands.',
  ],
  collect: [
    'A seasonal event GUI with current-week items, safe inventory-scanned submissions, event status, and reward access.',
    'Personal daily, weekly, monthly, all-event, streak, and best-score progress.',
    'Capped Lucky Finds that can add rare virtual bonus progress during valid submissions.',
    'Community progress and personal milestone goals.',
    'Daily, weekly, monthly, and all-event leaderboards with highlighted top-three players.',
    'Hidden future weeks so upcoming event content stays a surprise.',
    'Server-marked keepsake rewards and a duplicate reward exchange.',
    'Claim pages for participation, streak, milestone, and leaderboard rewards.',
  ],
  discordchat: [
    'DiscordChat EXP for meaningful linked-account activity in the DiscordSRV server-chat bridge.',
    'Daily participation streaks and milestones that convert stored EXP into spendable points.',
    'A GUI with personal status, tracked activity, community pulse, milestones, history, and public top lists.',
    'Preview-first point reward trades and safe point-funded item tools.',
    'Temporary community XP bonus windows that can also appear in /rate.',
    'Unlockable chat prefix and suffix presets.',
    'Personal controls for Discord reminders and public milestone celebrations.',
    'Linked-account guidance, first-Discord participation feedback, and privacy-aware progress tracking.',
  ],
  emotemenu: [
    'A searchable /emotes GUI for the server emote commands already available to the player.',
    'Clickable emote entries with plain descriptions and the exact command shape.',
    'Paginated chat lists for players who prefer commands over a GUI.',
    'Online-player pickers for emotes with optional or required targets.',
    'Safe handling for emotes that need non-player arguments.',
    'A Main Menu shortcut when the Menu plugin is installed and enabled.',
  ],
  exchange: [
    'A menu of configured exchanges for seasonal events, vote-token hand-ins, kit unlocks, and resource turn-ins.',
    'Trades that can require exact items, money, EXP levels, or a combination of requirements.',
    'Command-based rewards that run only after the exchange requirements pass.',
    'One-time, repeatable, and limited-use exchanges with per-player usage tracking.',
    'Category pages, date windows, world restrictions, and permission-gated entries when configured.',
    'Optional hiding of completed exchanges so the normal menu stays focused on usable trades.',
  ],
  forage: [
    'Curated Forage tools with tool soul XP, tiers, durability, and family-specific gathering actions.',
    'Player XP, Forage Points, levels, skill branches, milestones, and read-only top boards.',
    'Daily, weekly, and monthly quests with ready-to-claim reward views.',
    'Camp-only tool upgrades, diamond refinement, controlled enchants, and Repair & Merge.',
    'Camp turn-ins for eligible plain vanilla forage items.',
    'Multi-tier Forage Dust crafting with bounded growth pulses and rare treasure outcomes.',
    'Chunk exhaustion, daily caps, source-family rules, and other anti-farm protections.',
    'Camp-ready feedback, tool explanations, personal stats, tips, and progress placeholders.',
  ],
  gametypes: [
    'One menu system for OneBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid.',
    'Automatic current-world detection with a game-type index when no island world is detected.',
    'Core island actions for travel, creation, teams, information, help, top lists, kits, and daily shops.',
    'Addon buttons for warps, challenges, levels, biomes, generators, borders, and other installed BentoBox features.',
    'Per-game-type button visibility based on installed and enabled BentoBox addons.',
    'A confirmation screen for destructive island reset actions when reset is enabled.',
    'Back-to-index navigation for switching between configured game types.',
  ],
  journeymap: [
    'Playtime eras and badges that show where a player is in the long-term server journey.',
    'A milestone list with earned goals, the next target, and remaining playtime.',
    'Optional one-time rewards for completed milestones.',
    'Manual claiming or automatic reward delivery, depending on server configuration.',
    'Personal status, milestone, reward, claim, and refresh commands.',
    'Persistent maximum playtime and milestone history in shared playerdata.',
  ],
  kitstreaks: [
    'Per-kit claim streaks for configured daily, starter, event, or other tracked kits.',
    'Milestone calendars with common 7, 14, 21, 28, and 365 day goals.',
    'Clear streak health states such as safe today, due today, grace, or missed.',
    'Claim history, current and longest streaks, and next-milestone progress.',
    'Optional milestone rewards with claim-based or automatic delivery.',
    'A whitelist for tracked kits so unrelated reward kits do not affect streaks.',
    'Player status, milestone, reward, and refresh views.',
  ],
  lavaboots: [
    'Finite server-marked boots that provide short lava movement assistance and fire-resistance windows.',
    'Five configured levels, including rare event tiers with lava vision.',
    'Stored charge that drains only while the boots are actively helping in lava.',
    'Offhand magma cream or fire charges as optional fuel while in lava.',
    'Real leather-boot durability loss alongside the separate charge supply.',
    'Dyed themes and profile information visible through /lavaboots.',
    'Repair, anvil, enchant, smithing, grindstone, and common repair-command guards that keep the item finite.',
  ],
  menu: [
    'A main /menu GUI for discovering worlds, travel, homes, kits, economy, progression, events, and server information.',
    'Feature buttons with a title, short description, direct command, and click hint.',
    'Automatic staggered layout and pagination when more buttons are enabled.',
    'Live player stats, server information, smart-home navigation, and a consistent close button.',
    'Automatic visibility checks so disabled or missing feature plugins do not leave dead buttons.',
    'Back-button support that lets other server GUIs return players to the main menu safely.',
  ],
  mobhat: [
    'Cosmetic hats made from a safe whitelist of supported mob appearances.',
    'Direct selection, target-based selection, and optional /hat mob alias support.',
    'Baby variants and modern entity scale handling where the mob supports them.',
    'World restrictions and optional empty-inventory-slot requirements.',
    'Experimental shoulder and back offsets for controlled testing when enabled.',
    'Automatic cleanup on quit, death, world change, dismount, plugin disable, or stale state.',
  ],
  passportdiscovery: [
    'One discovery passport for worlds, warps, visits, biomes, blocks, items, consumables, tools, weapons, armor, kills, mounts, and exploration.',
    'Automatic stamps from normal gameplay events with each discovery type independently configurable.',
    'Status, known, missing, recent, detailed entry, and per-type statistics views.',
    'Personal collection pacing controls and progress-message preferences.',
    'Public top lists for overall progress or one discovery type.',
    'One-time completion rewards plus generic stamp credits for continued completed-passport activity.',
    'Stamp-credit trades for configured reward boxes.',
    'Shared UUID playerdata so long-lived discovery progress survives restarts.',
  ],
  recordingmode: [
    'A personal recording mode that temporarily quiets selected private messages, requests, tips, and visibility surfaces.',
    'Per-channel settings so players can decide what remains enabled while recording or streaming.',
    'Automatic capture and restoration of the previous server message and request settings.',
    'Persistent personal preferences in shared playerdata.',
    'A clickable status panel showing the current recording state and each channel preference.',
    'Simple on, off, toggle, status, and per-channel commands.',
  ],
  refer: [
    'A two-step referral request and confirmation flow between two players.',
    'Playtime eligibility checks for both the referrer and the referred player.',
    'Duplicate-claim protection and expiring pending requests.',
    'Separate configured rewards or permission markers for each participant.',
    'Status, accept, deny, and cancel controls for an active referral request.',
  ],
  scheduledtips: [
    'Clickable scheduled tips with compact, readable formatting.',
    'Per-player seen counts and dismissal controls for tips that are no longer useful.',
    'A global personal /tips on or /tips off preference.',
    'Quick click actions for dismissing one tip or hiding scheduled tips entirely.',
    'Live booster substitutions for matching mcMMO, Jobs, Points, and DiscordChat tips.',
    'Persistent visibility and dismissal preferences in shared playerdata.',
  ],
  sellstreaks: [
    'Daily tracking for sell events, item totals, payments, unique materials, and material variety.',
    'Variety reward thresholds that encourage selling more than one repeated material.',
    'Daily market goals for specific materials with visible completion progress.',
    'Automatic daily resets and persistent lifetime progress.',
    'A configurable daily reward cap and one-item spam protection.',
    'Personal status, current goals, next reward threshold, and public top lists.',
  ],
  spawners: [
    'A tiered CMI spawner shop GUI with friendly, hostile, event, and companion-oriented categories.',
    'Paper entity discovery, spawn-egg icons, availability glints, and blocked utility-entity filtering.',
    'Price, balance, permission, event-window, personal-limit, and stock checks before purchase.',
    'A confirmation screen before money is withdrawn and a spawner is granted.',
    'Annual event purchase limits with personal event progress and remaining stock.',
    'Per-spawner disables, price overrides, category moves, and future group/tier presentation.',
    'A restricted administrative browser for entries hidden from normal players.',
    'Safe scaffolding for a future sell-to-server section, disabled by default.',
  ],
  todo: [
    'A private per-player list for building tasks, shopping notes, repayment reminders, and other short ideas.',
    'Add, list, page, view, edit, search, complete, reopen, and remove actions.',
    'Separate open and completed views with newest-first or oldest-first sorting.',
    'Confirmation before deleting one entry and a separate clear-completed action.',
    'Sharing one selected todo entry with another player.',
    'Configurable open-item limits with permission-based larger limits.',
    'Persistent lifetime completion counts for milestones and placeholders.',
  ],
  tpauto: [
    'A personal toggle for automatically accepting incoming CMI /tpa and /tpahere requests.',
    'Trusted-role access so the feature can be limited to hosts, streamers, staff, or build teams.',
    'Separate on, off, toggle, reset, and status controls.',
    'Optional notifications for the requester and target after an automatic acceptance.',
    'CMI remains responsible for request validity, cooldowns, warmups, safety checks, and the teleport itself.',
  ],
  visit: [
    'One hidden personal visit warp that other players can use through /visit <player>.',
    'A public visit browser with owner messages and strict player-name lookup.',
    'Personal controls for visit visibility, offline visits, cooldowns, and optional money settings.',
    'Perked arrival titles, subtitles, particles, and sounds.',
    'A readable settings status page with clickable quick toggles.',
    'Persistent visit statistics and public top lists.',
    'Safe server-warp integration that keeps visit destinations out of normal warp lists.',
  ],
  votetokens: [
    'A vote-token trade index with safe menus and confirmation before a trade.',
    'Tier and layer progression that unlocks later trades after first-time completions.',
    'A read-only progress tree with clear complete, in-progress, unlocked, locked, and disabled states.',
    'Direct access to /vote and the server vote-item information page.',
    'Locked-trade explanations showing exactly what is still missing.',
    'Extra-token tools for upgrading eligible vote reward items.',
    'Server-marked reward identity so only eligible vote items can use the tools.',
    'Personal progress, completed trade history, and available reward views.',
  ],
  cmiprobe: [
    'Read-only checks for CMI, CMILib, selected managers, and expected plugin dependencies.',
    'Discovery of selected CMI custom event classes and registered listeners.',
    'Command registration checks for required server and feature commands.',
    'Online-player state snapshots for invulnerability, flight, health, AFK, and related support clues.',
    'A temporary join-state watcher for delayed state changes caused by another plugin.',
    'Compact status and report output for centralized or local test templates.',
  ],
  consolenoiserouter: [
    'Classification of CMI console messages into ignored noise, information, debug, warnings, errors, alerts, and unknown entries.',
    'Strict configured patterns with sanitized recent-message storage.',
    'Per-level recent and lifetime counters.',
    'Paginated recent views with level filters, sequence inspection, and safe text search.',
    'Dry-run classification testing for a sample message.',
    'Bounded support dumps without changing gameplay or console behavior.',
  ],
  endcrystals: [
    'Protection for blocks against destructive end crystal explosion edits and drops.',
    'Protection for configured decorative entities, display entities, dropped items, boats, and minecarts near crystal explosions.',
    'Optional prevention of direct player and player-projectile crystal breaking.',
    'A separate End-world setting that can preserve normal dragon-fight crystal behavior.',
    'Explicit break-bypass permission and live staff toggles for the protection layers.',
    'Runtime counters and status views for protected explosions and break attempts.',
  ],
  eventrecorder: [
    'Opt-in recording for selected CMI custom event groups on test servers.',
    'Optional discovery recording for every available CMI event class.',
    'Explicitly enabled CMILib and Paper logger-line recording.',
    'A bounded recent event buffer with event filters, pagination, search, and sequence inspection.',
    'Per-event recent and total counters with cancellation, async, player, and safe field context.',
    'Sanitized debug-file dumps and cache cleanup for test-session evidence.',
  ],
  permissionprobe: [
    'Read-only effective permission checks for online and cached offline players.',
    'LuckPerms source traces for exact, wildcard, user, group, inherited, temporary, and context-tagged nodes.',
    'Feature, player, group, command, and context access summaries.',
    'Player-to-player and group-to-group permission comparisons.',
    'Expected-profile checks plus broad wildcard and orphan-node scans.',
    'Passive denied-check recording and temporary live watch windows.',
    'GitHub-table and Discord-friendly Markdown exports for each diagnostic view.',
    'Strict owner-only access without changing permissions or player data.',
  ],
  pluginversions: [
    'A searchable inventory of loaded plugins, versions, enabled state, and curated project links.',
    'A tested Java, Paper, CMI, CMILib, and dependency compatibility gate.',
    'Plugin and server summaries for post-update support checks.',
    'A persistent plugin inventory database with optional refresh behavior.',
    'Manual source, download, documentation, and support URL curation.',
    'URL audits that highlight missing or malformed project links.',
    'Full Markdown and compact Discord-friendly export reports.',
  ],
  potions: [
    'A locked staff forge for normal, splash, and lingering custom event potions.',
    'Configured potion effects, levels, durations, money or EXP costs, success messages, and sounds.',
    'Fourteen themed title and lore variants plus reusable particle presets.',
    'Collection bundles for event sets and museum-style collecting.',
    'Server-marked item identity with snapshotted effects and drink costs.',
    'Runtime enable and disable controls that can block already-created marked potions by id.',
    'A player-safe /potions inspection command for the marked item held in either hand.',
    'GUI and command editing for safe potion-definition fields without rewriting existing items.',
  ],
  profile: [
    'A staff-only Java, Bedrock, Floodgate, name, UUID, and account-status profile view.',
    'Cached CMI, server-log, shared-playerdata, Geyser, and Floodgate identity signals.',
    'Optional remote profile context with cooldowns, timeouts, and stale-cache refresh.',
    'Permission-separated IP and public ban-list review signals.',
    'Known-name history plus manually verified names, notes, flags, IP signals, and reference links.',
    'Markdown exports for careful staff review and Discord sharing.',
    'Context-only output with no automatic punishment decisions.',
  ],
  staffcenter: [
    'A read-only player dashboard with summary, moderation, economy, location, home, or combined sections.',
    'Online state, UUID, names, AFK, vanish, jail, mute, balance, warnings, playtime, and rank context where available.',
    'Permission-separated access to sensitive moderation, economy, location, and home details.',
    'Recent lookup history with section filters, search, and per-section counters.',
    'Support dumps for reviewed lookup records.',
    'CMI, CMILib, PlaceholderAPI, LuckPerms, and Vault hook status.',
    'Console-friendly text output without punishment actions.',
  ],
  updatesmoke: [
    'A post-update compatibility checklist for Paper, Java, CMI, CMILib, PlaceholderAPI, and the 1MB feature jars.',
    'Accepted Paper and Java matrix validation plus loaded version and dependency checks.',
    'Required command registration and read-only command dispatch smoke checks.',
    'Required placeholder parsing and unresolved-placeholder detection.',
    'Selected CMI and CMILib API reachability checks.',
    'Registered feature metadata and current build checks.',
    'Paginated results, placeholders, and timestamped support reports without repairs or data mutation.',
  ],
  upgrade: [
    'Join-time suggestions when a player appears eligible for the next configured LuckPerms group.',
    'Read-only inspect, simulate, path, and explanation tools that reuse the real transition rules.',
    'An online-player review queue GUI with fresh eligibility checks.',
    'Explicit confirmation and a second safety check immediately before applying an upgrade.',
    'A configurable managed-group ladder with disabled future transitions until staff enables them.',
    'Optional cosmetic rewards, promotion effects, mail, and Discord-link reminders.',
    'Audited, permission-separated notification, review, simulation, and apply access.',
  ],
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
    .replaceAll('--', '<span>-</span><span>-</span>')
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

function featureList(items) {
  if (!items.length) {
    return '- No currently available features are documented yet.';
  }
  return items.map((item) => `- ${escapeHtml(clampText(item, 360))}`).join('\n');
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

function audienceInfo(plugin) {
  if (plugin.category === 'Player Fun') {
    return {
      heading: 'How Players Use It',
      description: `Learn what ${plugin.name} does, how to use it, and which public commands are available.`,
      pageIntro: `This page introduces ${plugin.name} from a public server-docs point of view. It focuses on what the feature does in-game, how to get started when you have access, and which commands are useful.`,
      fallbackWithCommand: `The sections below explain what ${plugin.name} is for, which commands players can try, and what to expect when your account has access.`,
      fallbackWithoutCommand: `Use this page as a friendly guide to ${plugin.name}. It explains what the feature is for and what players can try in-game when their account has access.`,
      noCommands: 'No player-facing commands are listed for this plugin yet.',
    };
  }
  if (plugin.category === 'Generic / Dev') {
    return {
      heading: 'How Testers Use It',
      description: `Learn what ${plugin.name} checks, how testers use it, and which public test commands are available.`,
      pageIntro: `This page introduces ${plugin.name} as a public testing guide. It focuses on what the tool checks, how testers get started, and which commands are useful on an authorized test server.`,
      fallbackWithCommand: `The sections below explain what ${plugin.name} checks, which commands authorized testers can use, and what its output means.`,
      fallbackWithoutCommand: `Use this page as a public testing guide to ${plugin.name}. It explains what the tool checks and how it supports development or compatibility testing.`,
      noCommands: 'No public tester commands are listed for this plugin yet.',
    };
  }
  if (plugin.category === 'Shared Library') {
    return {
      heading: 'How The Server Uses It',
      description: `Learn which shared services ${plugin.name} provides to the 1MoreBlock feature plugins.`,
      pageIntro: `This page introduces ${plugin.name} as the shared runtime behind the 1MoreBlock feature plugins. It focuses on common services and the staff-facing tools that support those features.`,
      fallbackWithCommand: `The sections below explain which services ${plugin.name} provides and which shared staff commands are available.`,
      fallbackWithoutCommand: `Use this page as a public reference for the common services ${plugin.name} provides to the feature plugins.`,
      noCommands: 'No public shared-library commands are listed yet.',
    };
  }
  return {
    heading: 'How Staff Use It',
    description: `Learn what ${plugin.name} does, how staff use it, and which public staff commands are available.`,
    pageIntro: `This page introduces ${plugin.name} as a public staff guide. It focuses on what the tool does, how authorized staff get started, and which commands are useful.`,
    fallbackWithCommand: `The sections below explain what ${plugin.name} is for, which commands authorized staff can use, and what its output means.`,
    fallbackWithoutCommand: `Use this page as a public staff guide to ${plugin.name}. It explains what the tool does and how authorized staff use it.`,
    noCommands: 'No public staff commands are listed for this plugin yet.',
  };
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
  const audience = audienceInfo(plugin);
  const root = commandData.playerCommands.find((command) => commandParts(command).length === 1) ?? commandData.playerCommands[0];
  if (root) {
    return escapeHtml(`Start with ${commandExample(root)}. ${audience.fallbackWithCommand}`);
  }
  return escapeHtml(audience.fallbackWithoutCommand);
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

function publicFeatureText(value, plugin) {
  if (plugin.category === 'Player Fun') {
    return friendlyText(value);
  }
  return sentenceCase(cleanMarkdownCell(value)
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/\s+/g, ' ')
    .trim());
}

function isPublicFeatureText(value, plugin) {
  if (plugin.category === 'Player Fun') {
    return isPlayerFacingText(value);
  }
  const lower = value.toLowerCase();
  return value.length >= 16
    && value.length <= 420
    && !lower.includes('register command, permission, placeholder')
    && !lower.includes('1mb-cmiapi-lib');
}

function featureBulletItems(plugin, markdown, commandData) {
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
    .map((item) => publicFeatureText(item, plugin))
    .filter((item) => isPublicFeatureText(item, plugin));
  if (items.length >= 3) {
    return uniqueValues(items).slice(0, 8);
  }
  return fallbackPlayerBullets(plugin, commandData);
}

function quickStartSteps(plugin, commandData) {
  const commands = commandData.playerCommands;
  if (!commands.length) {
    if (plugin.category === 'Shared Library') {
      return [
        'Review the available shared services above to understand what the feature plugins receive from the library.',
        'Open the full reference before using shared staff, config, data, or cleanup tooling.',
      ];
    }
    if (plugin.category === 'Generic / Dev') {
      return [
        'Review the available checks above and confirm the tool belongs on the authorized test server.',
        'Open the full reference for exact tester commands, permissions, output, and safety notes.',
      ];
    }
    if (plugin.category !== 'Player Fun') {
      return [
        'Review the available staff features above and confirm the tool is appropriate for the current task.',
        'Open the full reference for exact commands, permissions, configuration, and safety notes.',
      ];
    }
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
  if (plugin.category === 'Shared Library') {
    return [
      'This is shared server infrastructure, not a normal player-facing feature.',
      'Feature plugins depend on these services, so staff should review the full reference before changing shared config or data.',
    ];
  }
  if (plugin.category === 'Generic / Dev') {
    return [
      'This is a permission-gated testing or development tool, not a normal player feature.',
      'Use it only on an authorized server and review the full reference before running diagnostics or exports.',
    ];
  }
  if (plugin.category !== 'Player Fun') {
    return [
      'This is a permission-gated staff or server-management feature, not a normal player feature.',
      'Review the full reference before changing settings or using any command that can write data.',
    ];
  }
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

function voteTokenUpgradeGuide() {
  const groups = [
    {
      heading: 'Tier 1, Layer 1',
      rows: [
        ['Hero Diamond Elytra', 'Elytra', 'V to X', 'After Unbreaking X', 'Available', 'Protection V to VI'],
        ['Hero Emerald Sword', 'Diamond sword', 'V to X', 'After Unbreaking X', 'Available', 'Sharpness V to VI; Netherite sword'],
        ['Hero Iron Pickaxe', 'Iron pickaxe', 'V to X', 'After Unbreaking X', 'Available', 'Efficiency V to VI; Netherite pickaxe'],
        ['Hero Gold Bow', 'Bow', 'V to X', 'After Unbreaking X', 'Available', 'None'],
        ['Hero Quartz Chestplate', 'Chainmail chestplate', 'V to X', 'After Unbreaking X', 'Available', 'Protection V to VI'],
        ['Hero Netherite Leggings', 'Netherite leggings', 'V to X', 'After Unbreaking X', 'Available', 'Protection VI'],
      ],
    },
    {
      heading: 'Tier 2, Layer 1',
      rows: [
        ['Elite Diamond Resources', 'Light blue shulker box', 'No durability', 'No durability benefit', 'Available', 'None'],
        ['Elite Emerald Axe', 'Golden axe', 'Unavailable: already Unbreakable', 'Already Unbreakable', 'Available', 'Sharpness VI; Netherite axe'],
        ['Elite Iron Shovel', 'Iron shovel', 'Unavailable: already Unbreakable', 'Already Unbreakable', 'Available', 'Netherite shovel; Efficiency VI already included'],
        ['Elite Gold Rod', 'Fishing rod', 'V to X', 'After Unbreaking X', 'Available', 'None'],
        ['Elite Quartz Boots', 'Chainmail boots', 'V to X', 'After Unbreaking X', 'Available', 'Protection VI'],
        ['Elite Netherite Exp', 'Dragon breath', 'Blocked', 'Blocked', 'Blocked', 'No VoteTokens tools'],
      ],
    },
    {
      heading: 'Tier 2, Layer 2',
      rows: [
        ['Elite Conduit Box', 'Light blue shulker box', 'No durability', 'No durability benefit', 'Available', 'None'],
        ['Elite Emerald Spear', 'Trident', 'V to X', 'After Unbreaking X', 'Available', 'None'],
        ['Elite Iron Pickaxe', 'Diamond pickaxe', 'Unavailable: already Unbreakable', 'Already Unbreakable', 'Available', 'Efficiency V to VI; Netherite pickaxe'],
        ['Elite Gold Shears', 'Shears', 'V to X', 'After Unbreaking X', 'Available', 'Efficiency VI'],
        ['Elite Quartz Helmet', 'Turtle helmet', 'V to X', 'After Unbreaking X', 'Available', 'Protection IV to VI'],
        ['Elite Netherite Hoe', 'Netherite hoe', 'V to X', 'After Unbreaking X', 'Available', 'Efficiency VI already included'],
      ],
    },
    {
      heading: 'Tier 3, Layer 1',
      rows: [
        ['Ancient Diamond Shield', 'Shield', 'IV to X', 'After Unbreaking X', 'Available', 'Nine shield presets'],
      ],
    },
  ];

  const tables = groups.map((group) => {
    const rows = group.rows.map(([item, baseItem, unbreaking, unbreakable, soulbind, other]) => `    <tr>
      <td data-label="Vote item"><strong>${escapeHtml(item)}</strong></td>
      <td data-label="Base item">${escapeHtml(baseItem)}</td>
      <td data-label="Unbreaking X">${escapeHtml(unbreaking)}</td>
      <td data-label="Make Unbreakable">${escapeHtml(unbreakable)}</td>
      <td data-label="Soulbind">${escapeHtml(soulbind)}</td>
      <td data-label="Other options">${escapeHtml(other)}</td>
    </tr>`).join('\n');

    return `### ${group.heading}

<table class="vote-upgrade-table">
  <thead>
    <tr>
      <th>Vote item</th>
      <th>Base item</th>
      <th>Unbreaking X</th>
      <th>Make Unbreakable</th>
      <th>Soulbind</th>
      <th>Other item-specific options</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
  }).join('\n\n');

  return `## Vote Item Upgrade Guide

Use this chart before spending extra vote tokens. **After Unbreaking X** means Make Unbreakable stays locked until the item's real enchant reaches level 10. Reaching Unbreaking X and applying Unbreakable are two separately paid actions. **Unavailable: already Unbreakable** means both durability choices are disabled for that item. An option not shown for an item is not supported.

Every equipment reward already has Mending I or Mending II, so none of the currently enabled rewards need the Mending I tool. **Sync Enchant Lore** is a free repair for the 16 enchanted equipment rewards: it makes matching vanilla-enchant lore agree with the real enchant levels and leaves custom augment lore alone.

${tables}

The nine shield designs are **Cerulean Crest**, **Vote Star**, **Emerald Grove**, **Nether Sigil**, **Ocean Tide**, **Royal Bloom**, **Dragon Relic**, **Trial Gale**, and **Ancient Omen**. The other Tier 3 reward slots are not enabled yet.

Shulker boxes can be soulbound, but they have no durability for Unbreaking or Unbreakable to protect. The Dragon Breath EXP reward is deliberately blocked from every VoteTokens tool.

For equipment below level 10, **Unbreaking X** is step 1 and **Make Unbreakable** is step 2. Each step charges the tool cost shown in the VoteTokens GUI. With the current default of 64 of each captured extra-token type per action, the full path costs 128 of each type. Existing items that already have the real Unbreakable flag keep it without a retroactive charge; both durability choices remain unavailable for those items.`;
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
      <td><code>${formatCommand(commandData.tableExamples?.get(command) || commandExample(command))}</code></td>
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

function examplesList(examples, hasCommands) {
  if (!examples.length) {
    return hasCommands
      ? '- No separate examples are listed yet. Use the command examples above as a starting point.'
      : '- Open the full reference below for exact permission-gated commands and examples.';
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
const guidePlugins = plugins.filter((plugin) => !plugin.file.endsWith('-roadmap.md'));
const playerPlugins = guidePlugins.filter((plugin) => plugin.category === 'Player Fun');
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
  if (override.commandTableExamples) {
    commandData.tableExamples = new Map(Object.entries(override.commandTableExamples));
  }
  if (override.commandDescriptions) {
    for (const [command, description] of Object.entries(override.commandDescriptions)) {
      commandData.descriptions.set(command, description);
    }
  }
  const guideBody = override.guide ? escapeHtml(override.guide).replaceAll('\n\n', '\n\n') : guideParagraphs(markdown, plugin, commandData);
  const quickStart = override.quickStart ?? quickStartSteps(plugin, commandData);
  const featureBullets = override.features ?? FEATURE_BULLET_OVERRIDES[slug] ?? featureBulletItems(plugin, markdown, commandData);
  const notes = override.notes ?? goodToKnow(plugin, commandData);
  const examples = override.examples ?? commandData.playerExamples;
  const audience = audienceInfo(plugin);
  const pageIntro = override.pageIntro ?? audience.pageIntro;
  const audienceHeading = override.audienceHeading ?? audience.heading;
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
description: ${audience.description}
---

${pageIntro}

## What It Does

${escapeHtml(purpose)}

## ${audienceHeading}

${guideBody}

Available features include:

${featureList(featureBullets)}

${override.afterFeatures ? `${override.afterFeatures}\n\n` : ''}## Quick Start

${numberedList(quickStart)}

## Commands

${commandData.playerCommands.length ? pluginCommandTable(plugin, commandData) : audience.noCommands}

${commandData.playerAliases.length ? `## Aliases\n\n${commandData.playerAliases.map((alias) => `- \`${alias}\``).join('\n')}\n\n` : ''}## Examples

${examplesList(examples, commandData.playerCommands.length > 0)}

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

console.log(`Generated Starlight content for ${guidePlugins.length} current plugin guides.`);
