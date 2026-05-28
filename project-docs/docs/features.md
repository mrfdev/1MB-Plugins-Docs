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
| Player Fun | AFKShrine | Visual AFK effects, persistent opt-outs, and selectable styles | [AFKShrine](plugins/afkshrine.md) |
| Player Fun | RecordingMode | Per-player recording quiet mode | [RecordingMode](plugins/recordingmode.md) |
| Player Fun | SellStreaks | CMI sell streaks and daily market goals | [SellStreaks](plugins/sellstreaks.md) |
| Player Fun | ScheduledTips | Clickable rotating tips with per-player dismiss and visibility controls | [ScheduledTips](plugins/scheduledtips.md) |
| Player Fun | Visit | Player-owned hidden CMI visit warps with safe arrival messages, titles, particles, and sounds | [Visit](plugins/visit.md) |
| Player Fun | PassportDiscovery | Umbrella discovery passport for worlds, warps, visits, biomes, blocks, items, consumables, tools, weapons, armor, kills, mounts, and exploration | [PassportDiscovery](plugins/passportdiscovery.md) |
| Player Fun | SocialGatherings | Configurable town party system around CMI sit, portals, beds, food, chat, hats, jukeboxes, elytra, fishing, mining, farming, vehicles, archery, libraries, markets, and cookouts | [SocialGatherings](plugins/socialgatherings.md) |
| Player Fun | JourneyMap | Playtime eras, badges, milestones, and optional rewards without replacing CMI playtime tracking | [JourneyMap](plugins/journeymap.md) |
| Player Fun | KitStreaks | CMI kit claim streaks with configurable tracks, 7/14/21/28/365 day milestones, and optional rewards | [KitStreaks](plugins/kitstreaks.md) |
| Player Fun | MessageFont | Temporary CMI private-message font preferences with recipient plain-mode accessibility opt-out | [MessageFont](plugins/messagefont.md) |
| Player Fun | Nick | Safer `/nick` GUI and CMI nickname wrapper with curated colors, gradients, cooldowns, related-name checks, history, favorites, ratings, logs, and unlockable styles | [Nick](plugins/nick.md) |
| Player Fun | EmoteMenu | GUI browser, search, target picker, and CMI CustomAlias import for server emotes | [EmoteMenu](plugins/emotemenu.md) |
| Player Fun | PvPToggle | Per-player `/pvp` state with CMI combat awareness, shared playerdata, and migration compatibility for legacy PvPToggle placeholders and permissions | [PvPToggle](plugins/pvptoggle.md) |
| Player Fun | Boosters | `/rate` booster status and admin control for mcMMO, Jobs, and PyroWelcomesPro Points detection | [Boosters](plugins/boosters.md) |
| Player Fun | NameMC | `/namemc` NameMC like verification and one-time CMI/LuckPerms rewards, migrated from the standalone NameMCVoteLink project | [NameMC](plugins/namemc.md) |
| Player Fun | Trades | `/trade` GUI exchanges for item, money, and EXP hand-ins, migrated from the standalone 1MBTrades project | [Trades](plugins/trades.md) |
| Player Fun | VoteTokens | `/votetokens` secure vote-token GUI trades with tier/layer progress, CMI kit rewards, hidden reward identity markers, extra-token item tools, and staff migration tools | [VoteTokens](plugins/votetokens.md) |
| Player Fun | DiscordChat | `/discordchat` DiscordSRV server-chat engagement tracker with quality-gated EXP, conversation clusters, first-Discord broadcasts, linked-account streaks, top lists, point rewards, safe item tools, dependency-aware reward checks, opt-out reminders, and staff smoke/community/economy reports | [DiscordChat](plugins/discordchat.md) |
| Player Fun | GameTypes | `/gametype` safe BentoBox menu adapter for OneBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid with world detection and config-driven addon buttons | [GameTypes](plugins/gametypes.md) |
| Player Fun | BirthdayLanterns | `/birthday` collectible birthday, player anniversary, and server milestone lanterns with strict input, GUI claims, finite wish charges, guestbook notes, presets, mail variants, and configurable CMI reward commands | [BirthdayLanterns](plugins/birthdaylanterns.md) |
| Player Fun | MobHat | Cosmetic whitelisted mob hats with optional `/hat mob` alias support, world safety, scale handling, and experimental offset positions | [MobHat](plugins/mobhat.md) |
| Player Fun | PlayerTodo | Per-player `/todo` notes with paging, search, completion state, and lightweight milestones | [PlayerTodo](plugins/todo.md) |
| Player Fun | Refer | Two-step `/refer <player>` and `/refer verify` referral rewards with CMI/PlaceholderAPI playtime checks | [Refer](plugins/refer.md) |
| Player Fun | TPAuto | Trusted-player `/tpauto` toggle for auto-accepting incoming CMI `/tpa` and `/tpahere` requests | [TPAuto](plugins/tpauto.md) |
| Player Fun | Menu | Configurable `/menu` GUI for server discovery, travel, economy, progression, and CMI ctext info | [Menu](plugins/menu.md) |
| Staff / Moderation | StaffCenter | Read-only CMI staff lookup center | [StaffCenter](plugins/staffcenter.md) |
| Staff / Moderation | Profile | Staff-only Java/Bedrock identity profiler with CMI/log signals, Mojang account status, optional remote context, public ban-list review signals, manual notes, and Markdown exports | [Profile](plugins/profile.md) |
| Staff / Moderation | FilterLab | Safe CMI ChatFilter.yml rule simulation before live use | [FilterLab](plugins/filterlab.md) |
| Staff / Moderation | FilterGuard | CMI chat-filter style checks for signs, books, anvils, item names, and nicknames | [FilterGuard](plugins/filterguard.md) |
| Staff / Moderation | WarningLens | Read-only CMI warning lens | [WarningLens](plugins/warninglens.md) |
| Staff / Moderation | NotableMsg | Private `/n` helper channel for notable/community-assistant groups | [NotableMsg](plugins/notablemsg.md) |
| Staff / Moderation | 1MBStaffMsg | Runtime recent history helper for CMI staffmsg and `/s recent` | [1MBStaffMsg](plugins/staffmsg.md) |
| Server Management | CmdCostDashboard | CMI command cost dashboard | [CmdCostDashboard](plugins/cmdcostdashboard.md) |
| Server Management | CMIConfig | Owner GUI for selected CMI/CMILib config toggles | [CMIConfig](plugins/cmiconfig.md) |
| Server Management | ConsoleNoiseRouter | CMI console message classifier and cache dump helper | [ConsoleNoiseRouter](plugins/consolenoiserouter.md) |
| Server Management | EconomyGuardian | Read-only CMI economy balance anomaly watcher | [EconomyGuardian](plugins/economyguardian.md) |
| Server Management | StartupDoctor | Startup/runtime diagnostics | [StartupDoctor](plugins/startupdoctor.md) |
| Server Management | UpdateSmoke | Post-update smoke checks for hooks, commands, placeholders, feature metadata, and key CMI/CMILib APIs | [UpdateSmoke](plugins/updatesmoke.md) |
| Server Management | PluginVersions | Plugin version inventory, tested Java/Paper/dependency gate, URL curation, and Markdown/Discord export reports migrated from the standalone PluginVersions project | [PluginVersions](plugins/pluginversions.md) |
| Server Management | Potions | Locked admin forge plus player-safe `/potions` held-item inspection for PDC-marked custom event potions with split config files, GUI definition editing, collection bundle generation, 14 style choices, snapshotted costs, particle presets, collections, and runtime disable controls | [Potions](plugins/potions.md) |
| Server Management | Upgrade | Admin-only LuckPerms group upgrade suggestions from join-date and playtime signals with read-only rankup simulation, a review queue GUI, guarded click-to-apply actions, optional cosmetic rewards, promotion effects, and Discord link reminders | [Upgrade](plugins/upgrade.md) |
| Server Management | EndCrystals | End crystal block, entity, and player-break protection migrated from the standalone EndCrystals project | [EndCrystals](plugins/endcrystals.md) |
| Server Management | WorldSnapshot | Read-only world settings, gamerules, and CMI world-toggle snapshots | [WorldSnapshot](plugins/worldsnapshot.md) |
| Server Management | SparkReviewer | Spark workflow, latest.log, config, MFM, entity, hopper, and stress-test reviewer for TPS drops | [SparkReviewer](plugins/sparkreviewer.md) |
| Server Management | Hoppers | Read-only hopper clog, world/chunk/player scopes, Spark helpers, notes, config drift, hotspot history, Markdown export, and MobFarmManager triage for TPS drops | [Hoppers](plugins/hoppers.md) |
| Server Management | WarpAudit | Read-only CMI warp and portal audit | [WarpAudit](plugins/warpaudit.md) |
| Server Management | WorthDrift | CMI sell-event drift analyzer | [WorthDrift](plugins/worthdrift.md) |
| Server Management | WorthHelper | Read-only CMI Worth.yml and Paper recipe analyzer | [WorthHelper](plugins/worthhelper.md) |
| Generic / Dev | EventRecorder | CMI event recorder for development and testing | [EventRecorder](plugins/eventrecorder.md) |
| Generic / Dev | CMIProbe | CMI, CMILib, event, and command smoke probe | [CMIProbe](plugins/cmiprobe.md) |
| Generic / Dev | CMIDatabase | Internal key/value database for CMI automation and placeholders | [CMIDatabase](plugins/cmidatabase.md) |
| Generic / Dev | PlaceholderProbe | Safe PlaceholderAPI probe | [PlaceholderProbe](plugins/placeholderprobe.md) |
| Generic / Dev | CMIPlaceholderCheck | CMI-style placeholder lookup catalog and live examples | [CMIPlaceholderCheck](plugins/cmiplaceholders.md) |
| Generic / Dev | 1MBPlaceholders | Migrated `%onemb_<key>%` PlaceholderAPI expansion with legacy `/_placeholders` management commands | [1MBPlaceholders](plugins/onembplaceholders.md) |

Each scaffolded plugin now gets a feature config file under `plugins/1MB-CMIAPI/<Feature>/config.yml` and translations under `plugins/1MB-CMIAPI/CMIAPILIB/translations/<feature>.yml`.

## Documentation Rule

Every completed feature should update:

- this feature index
- its plugin page under `docs/plugins/`
- global commands, permissions, and placeholders when needed
- the root README if installation or project conventions change
- the checklist when new manual tests or safety checks are needed

[Documentation index](README.md)
