# Features

The project ideas are currently tracked in the root todo logs:

- `todo.player-fun.log`
- `todo.staff-moderation.log`
- `todo.server-management.log`
- `todo.generic.log`

## Starter Feature Set

These are the first feature candidates now using the shared library scaffold:

| Category | Plugin | Status | Docs |
| --- | --- | --- | --- |
| Shared Library | 1MB-CMIAPI-Lib | Shared diagnostics, feature registry, config/debug helpers, translations, GUI examples, safe action rules, and global placeholders | [1MB-CMIAPI-Lib](plugins/1mb-cmiapi-lib.md) |
| Player Fun | Wiki Assistant | Deterministic local Minecraft references, reviewed concise answers, validated article links, explicit ambiguity choices, safe Wiki search fallback, and an owner-resolvable passive topic wishlist | [Wiki Assistant](plugins/wiki.md) |
| Player Fun | AFKShrine | Visual AFK effects, permission-gated presets, highlighted return data, points, quests, separately permissioned lore-book exchanges, readiness checks, and staff reports | [AFKShrine](plugins/afkshrine.md) |
| Player Fun | RecordingMode | Per-player recording quiet mode | [RecordingMode](plugins/recordingmode.md) |
| Player Fun | SellStreaks | CMI sell streaks and daily market goals | [SellStreaks](plugins/sellstreaks.md) |
| Player Fun | ScheduledTips | Clickable rotating tips with per-player dismiss, visibility controls, and live booster reminders | [ScheduledTips](plugins/scheduledtips.md) |
| Player Fun | Visit | Player-owned hidden CMI visit warps with safe arrival messages, titles, particles, and sounds | [Visit](plugins/visit.md) |
| Player Fun | PassportDiscovery | Umbrella discovery passport for worlds, warps, visits, biomes, blocks, items, consumables, tools, weapons, armor, kills, mounts, and exploration | [PassportDiscovery](plugins/passportdiscovery.md) |
| Player Fun | SocialGatherings | Configurable town party system around CMI sit, portals, beds, food, chat, hats, jukeboxes, elytra, fishing, mining, farming, vehicles, archery, libraries, markets, and cookouts | [SocialGatherings](plugins/socialgatherings.md) |
| Player Fun | JourneyMap | Playtime eras, badges, milestones, and optional rewards without replacing CMI playtime tracking | [JourneyMap](plugins/journeymap.md) |
| Player Fun | KitStreaks | CMI kit claim streaks with configurable tracks, 7/14/21/28/365 day milestones, and optional rewards | [KitStreaks](plugins/kitstreaks.md) |
| Player Fun | Nick | Safer `/nick` GUI and CMI nickname wrapper with curated colors, gradients, cooldowns, related-name checks, history, favorites, ratings, logs, and unlockable styles | [Nick](plugins/nick.md) |
| Player Fun | EmoteMenu | GUI browser, search, target picker, and CMI CustomAlias import for server emotes | [EmoteMenu](plugins/emotemenu.md) |
| Player Fun | PvPToggle | Per-player `/pvp` state with CMI combat awareness, shared playerdata, and migration compatibility for legacy PvPToggle placeholders and permissions | [PvPToggle](plugins/pvptoggle.md) |
| Player Fun | Boosters | `/rate` booster status and admin control for mcMMO, Jobs, and PyroWelcomesPro Points detection | [Boosters](plugins/boosters.md) |
| Player Fun | NameMC | `/namemc` NameMC like verification and one-time CMI/LuckPerms rewards, migrated from the standalone NameMCVoteLink project | [NameMC](plugins/namemc.md) |
| Player Fun | Exchange | `/exchange` GUI exchanges for item, money, and EXP hand-ins, migrated from the standalone 1MBTrades project | [Exchange](plugins/exchange.md) |
| Player Fun | VoteTokens | `/votetokens` secure vote-token GUI exchanges with tier/layer progress, CMI kit rewards, hidden reward identity markers, extra-token item tools, and staff migration tools | [VoteTokens](plugins/votetokens.md) |
| Player Fun | DiscordChat | `/discordchat` DiscordSRV server-chat engagement tracker with quality-gated EXP, continuous floor conversion, separate streak bonuses, conversation clusters, first-Discord broadcasts, linked-account streaks, top lists, two-step point rewards with player/global cooldowns, safe item tools, dependency-aware reward checks, opt-out reminders, and staff smoke/community/economy reports | [DiscordChat](plugins/discordchat.md) |
| Player Fun | GameTypes | `/gametype` safe BentoBox menu adapter for OneBlock, ChunkBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid with world detection and config-driven addon buttons | [GameTypes](plugins/gametypes.md) |
| Player Fun | BirthdayLanterns | `/birthday` collectible birthday, player anniversary, and server milestone lanterns with strict input, GUI claims, finite wish charges, guestbook notes, presets, mail variants, and configurable CMI reward commands | [BirthdayLanterns](plugins/birthdaylanterns.md) |
| Player Fun | LavaBoots | `/lavaboots` finite PDC-marked lava-assist boots with dyed leather event themes, charge, durability drain, offhand fuel, movement assist, short fire-resistance windows, lava vision event tiers, and repair/anvil/enchant guards | [LavaBoots](plugins/lavaboots.md) |
| Player Fun | Spawners | `/spawners` CMI spawner shop GUI with Paper entity discovery, spawn egg shop icons, tier-split friendly pages, glint availability markers, blocked utility-entity filters, restricted admin-only spawner browsing, CMI placespawner permission checks, confirmation purchases, CMI-backed Vault economy payments, yearly event limits, stock caps, event progress, admin toggles, shift-click spawner editing, per-id disables, price overrides, category moves, future tier/group tools, DiscordSRV staff logs, setup exports, and safe buyback scaffolding | [Spawners](plugins/spawners.md) |
| Player Fun | Collect | `/collect` seasonal event GUI for safe inventory-scanned item submissions, event-score bonuses, community progress, personal milestones, hidden future weeks, daily/weekly/monthly/all-event leaderboards, streaks, PDC keepsake rewards, reward command hooks, and admin debug week/day/date controls | [Collect](plugins/collect.md) |
| Player Fun | Event Hunts | Public `1MB-CMIAPI-EventHunts` host and `/hunt` GUI index for independently switched Coconut, Ghost, Doors, and future event modules; legacy CoconutHunt data/PDC/permission/placeholder identities remain compatible | [Coconut Hunt](plugins/coconut.md) |
| Player Fun | CoconutHunt | `/coconut` seven-day/70-head Summer Beach module in the themed-hunt engine, preserved provisionally for 2027 and disabled by default without removing history, setup data, rewards, snapshots, or private Paper visuals | [Coconut Hunt](plugins/coconut.md) |
| Player Fun | GhostHunt | `/ghost` (`/ghosthunt` alias) four-day Halloween 2026 module in the same Event Hunts jar, with 20 Ghosts per day/80 total, four daily kits plus an all-80 bonus box, nine randomized heads, private themed holograms and rising capture effects, coordinate-free hints, and isolated debug data | [Halloween Ghost Hunt](plugins/ghosthunt.md) |
| Player Fun | DoorHunt | Dormant-by-default `/doors` Trick-or-Treat GUI in the shared Event Hunts jar with Halloween travel, daily progress, hints, statistics, a coordinate-private journal, a persistent claim-later Treat Bag, separate milestone kits, seasons, the clean-room 60-door route, exact legacy compatibility, and explicit standalone-data import | [Door Hunt](plugins/doors.md) |
| Player Fun | DropParty | `/dropparty` scheduled and staff-triggered sulfur-geyser events with a player schedule GUI, CMI travel, approved item eruptions, anti-idle movement checks, durable cross-world collection vaults, claims, leaderboards, staff setup, and throwable mini-party flares | [DropParty](plugins/dropparty.md) |
| Player Fun | Appreciation | `/appreciate` and optional `/thanks` for limited reviewed notes, recipient preferences, free/XP/money/scope-safe item escrow, durable claims and expiry returns, thank-you reactions, shared celebrations, birthdays, anonymous sending, favorites, stats, badges, streak points, permanent unlocks, and staff review/recovery | [Appreciation](plugins/appreciation.md) |
| Player Fun | Forage | `/forage` v1 tool-gated nature progression with curated PDC tools, CMI-backed Vault tool shop, XP/points, daily and weekly quests, read-only top boards, camp-ready feedback, camp-only tool upgrades, camp composter turn-ins, Forage Dust growth pulses, tool soul lore, daily caps, chunk exhaustion, WorldGuard global-only checks, camp validation, camp-only Repair & Merge, tips, placeholders, and safe GUI handling | [Forage](plugins/forage.md) |
| Player Fun | AutoSell | `/autosell` opt-in CMI Worth.yml inventory cleanup with GUI category/material/filter/world toggles, per-category material pages, pure-vanilla item checks, CMI/Vault payments, daily caps, broker progress, chunk-change and overheat anti-farm guards, quick warning blacklists, heatmaps, passive tuning reports, scheduled Happy Hour support, and exports | [AutoSell](plugins/autosell.md) |
| Player Fun | MobHat | Cosmetic whitelisted mob hats with optional `/hat mob` alias support, world safety, scale handling, and experimental offset positions | [MobHat](plugins/mobhat.md) |
| Player Fun | PlayerTodo | Per-player `/todo` notes with paging, search, completion state, and lightweight milestones | [PlayerTodo](plugins/todo.md) |
| Player Fun | Refer | Two-step `/refer <player>` and `/refer verify` referral rewards with CMI/PlaceholderAPI playtime checks | [Refer](plugins/refer.md) |
| Player Fun | TPAuto | Trusted-player `/tpauto` toggle for auto-accepting incoming CMI `/tpa` and `/tpahere` requests | [TPAuto](plugins/tpauto.md) |
| Player Fun | Menu | Configurable `/menu` GUI for server discovery, travel, economy, progression, and CMI ctext info | [Menu](plugins/menu.md) |
| Staff / Moderation | StaffCenter | Read-only CMI staff lookup center | [StaffCenter](plugins/staffcenter.md) |
| Staff / Moderation | Profile | Staff-only Java/Bedrock identity profiler with CMI/log signals, Mojang account status, optional remote context, public ban-list review signals, manual notes, and Markdown exports | [Profile](plugins/profile.md) |
| Staff / Moderation | ContentGuard | Independently switchable FilterLab simulation and FilterGuard enforcement modules in one jar | [ContentGuard](plugins/contentguard.md) |
| Staff / Moderation | WarningLens | Read-only CMI warning lens | [WarningLens](plugins/warninglens.md) |
| Staff / Moderation | TeamMsg | Independently switchable 1MBStaffMsg and NotableMsg communication modules in one jar | [TeamMsg](plugins/teammsg.md) |
| Server Management | CmdCostDashboard | CMI command cost dashboard | [CmdCostDashboard](plugins/cmdcostdashboard.md) |
| Server Management | CMIConfig | Owner GUI for selected CMI/CMILib config toggles | [CMIConfig](plugins/cmiconfig.md) |
| Server Management | ConsoleNoiseRouter | CMI console message classifier and cache dump helper | [ConsoleNoiseRouter](plugins/consolenoiserouter.md) |
| Server Management | EconomyGuardian | Read-only CMI economy balance anomaly watcher | [EconomyGuardian](plugins/economyguardian.md) |
| Server Management | StartupDoctor | Startup/runtime diagnostics and read-only Paper safety checks | [StartupDoctor](plugins/startupdoctor.md) |
| Server Management | UpdateSmoke | Post-update smoke checks for runtime compatibility, hooks, command registration and dispatch, placeholders, feature metadata, and key CMI/CMILib APIs | [UpdateSmoke](plugins/updatesmoke.md) |
| Server Management | PluginVersions | Plugin version inventory, tested Java/Paper/dependency gate, URL curation, and Markdown/Discord export reports migrated from the standalone PluginVersions project | [PluginVersions](plugins/pluginversions.md) |
| Server Management | Potions | Locked admin forge plus player-safe `/potions` held-item inspection for PDC-marked custom event potions with split config files, GUI definition editing, collection bundle generation, 14 style choices, snapshotted costs, particle presets, collections, and runtime disable controls | [Potions](plugins/potions.md) |
| Server Management | Upgrade | Admin-only LuckPerms group upgrade suggestions from join-date and playtime signals with read-only rankup simulation, a review queue GUI, guarded click-to-apply actions, optional cosmetic rewards, promotion effects, and Discord link reminders | [Upgrade](plugins/upgrade.md) |
| Server Management | EndCrystals | End crystal block, entity, and player-break protection migrated from the standalone EndCrystals project | [EndCrystals](plugins/endcrystals.md) |
| Server Management | AntiFire | Runtime-independent STARTUP fire-spread and block-burn protection with delayed temporary-fire cleanup, controlled permanent fire, and later read-only library status | [AntiFire](plugins/antifire.md) |
| Server Management | WorldSnapshot | Read-only world settings, gamerules, and CMI world-toggle snapshots | [WorldSnapshot](plugins/worldsnapshot.md) |
| Server Management | SparkReviewer | Spark workflow, latest.log, config, MFM, entity, hopper, and stress-test reviewer for TPS drops | [SparkReviewer](plugins/sparkreviewer.md) |
| Server Management | Hoppers | Read-only hopper clog, world/chunk/player scopes, Spark helpers, notes, config drift, hotspot history, Markdown export, and MobFarmManager triage for TPS drops | [Hoppers](plugins/hoppers.md) |
| Server Management | Diagnostics | Removable owner diagnostics for disconnects, AFK context, player state, packet/protocol bridge clues, compact item metadata clues, plugin versions, and support-ready timestamped logs | [Diagnostics](plugins/diagnostics.md) |
| Server Management | WarpAudit | Read-only CMI warp and portal audit | [WarpAudit](plugins/warpaudit.md) |
| Server Management | WorthDrift | CMI sell-event drift analyzer plus ShopGUI+ `buyPrice` vs `Worth.yml` Markdown reports | [WorthDrift](plugins/worthdrift.md) |
| Server Management | WorthHelper | Read-only CMI Worth.yml and Paper recipe analyzer | [WorthHelper](plugins/worthhelper.md) |
| Generic / Dev | EventRecorder | CMI event recorder for development and testing | [EventRecorder](plugins/eventrecorder.md) |
| Generic / Dev | BedrockChatBridge | Temporary fail-closed CMI Paper-chat bridge for Floodgate senders after verified formatter ordering | [BedrockChatBridge](plugins/bedrockchatbridge.md) |
| Generic / Dev | CMIProbe | CMI, CMILib, event, and command smoke probe | [CMIProbe](plugins/cmiprobe.md) |
| Generic / Dev | CMIDatabase | Internal key/value database for CMI automation and placeholders | [CMIDatabase](plugins/cmidatabase.md) |
| Generic / Dev | Placeholders | Production `%onemb_*%` provider plus independently switchable Catalog, Probe, and Health modules behind `/_placeholders` | [Placeholders](plugins/placeholders.md) |
| Generic / Dev | PermissionProbe | Owner-only read-only permission diagnosis, passive denial recording, watch summaries, scoped reports, Markdown exports, command explainers, feature/player access summaries, player/group comparisons, context-aware LuckPerms source traces, expected-profile checks, wildcard/orphan scans, and Bukkit metadata | [PermissionProbe](plugins/permissionprobe.md) |

Each scaffolded plugin now gets a feature config file under `plugins/1MB-CMIAPI/<Feature>/config.yml` and translations under `plugins/1MB-CMIAPI/CMIAPILIB/translations/<feature>.yml`.

## Documentation Rule

Every completed feature should update:

- this feature index
- its plugin page under `docs/plugins/`
- global commands, permissions, and placeholders when needed
- the root README if installation or project conventions change
- the checklist when new manual tests or safety checks are needed

[Documentation index](README.md)
