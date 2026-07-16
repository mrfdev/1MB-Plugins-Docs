# Plugin Documentation

Each feature plugin gets its own page here.

Every feature jar exposes `/<plugin-command> info` with a player-friendly introduction, a logical starter command, a help command, and a public docs link under `https://docs.1moreblock.com/player-guides/plugins/<slug>/`. Technical metadata such as category, build details, private repository URLs, and full debug/support strings belongs on `/<plugin-command> debug`.

Every feature jar that does not implement a local debug command inherits `/<plugin-command> debug` from the shared library. The fallback is permission locked to `onembcmi.<plugin>.admin` and includes overview, health, hooks, commands, permissions, placeholders, config, and all pages with pagination in game. Console senders receive full shared paginated lists in one command.

## Starter Plugins

| Category | Plugin | Purpose |
| --- | --- | --- |
| Shared Library | [1MB-CMIAPI-Lib](1mb-cmiapi-lib.md) | Shared diagnostics, feature registry, config/debug helpers, translations, GUI examples, safe action rules, and global placeholders. |
| Player Fun | [AFKShrine](afkshrine.md) | Visual AFK effects, permission-gated particle presets, postcards, reward/weather/seasonal quest tracking, readiness checks, and staff reports. |
| Player Fun | [RecordingMode](recordingmode.md) | Per-player recording quiet mode for personal messages, TPA requests, money requests, staff messages, tips, and optional live map hiding. |
| Player Fun | [SellStreaks](sellstreaks.md) | CMI sell streaks, daily market goals, and varied-material rewards. |
| Player Fun | [ScheduledTips](scheduledtips.md) | Clickable rotating tips with per-player dismiss, visibility controls, and live booster reminders. |
| Player Fun | [Visit](visit.md) | Player-owned hidden CMI visit warps with safe arrival messages, titles, particles, and sounds. |
| Player Fun | [PassportDiscovery](passportdiscovery.md) | Umbrella discovery passport for worlds, warps, visits, biomes, blocks, items, consumables, tools, weapons, armor, kills, mounts, and exploration. |
| Player Fun | [SocialGatherings](socialgatherings.md) | Configurable social parties around CMI sit, portals, sleepovers, dinner tables, campfires, beaches, hats, music, elytra, balloons, cookouts, fishing, mining, farming, vehicles, archery, gardens, libraries, forges, and markets. |
| Player Fun | [JourneyMap](journeymap.md) | Playtime eras, badges, milestones, and optional rewards powered by CMI/PlaceholderAPI playtime data. |
| Player Fun | [KitStreaks](kitstreaks.md) | CMI kit claim streaks with configurable tracks, milestone calendars, and optional rewards. |
| Player Fun | [MessageFont](messagefont.md) | Temporary CMI private-message font preferences with recipient plain-mode accessibility opt-out. |
| Player Fun | [Nick](nick.md) | Safer `/nick` GUI and CMI nickname wrapper with curated colors, gradients, cooldowns, related-name checks, history, favorites, ratings, logs, and unlockable styles. |
| Player Fun | [Emotes](emotemenu.md) | GUI browser, Paper dialog search, target picker, disabled-emote admin review, and CMI CustomAlias import for server emotes. |
| Player Fun | [PvPToggle](pvptoggle.md) | Per-player `/pvp` state, CMI combat awareness, shared playerdata, particles, and migration compatibility for the old standalone plugin. |
| Player Fun | [Boosters](boosters.md) | `/rate` booster status and admin control for mcMMO, Jobs, and PyroWelcomesPro Points detection, replacing the old standalone Boosters plugin. |
| Player Fun | [NameMC](namemc.md) | `/namemc` NameMC like verification, one-time CMI/LuckPerms rewards, legacy permissions, and `%onembnamemc_*%` placeholders. |
| Player Fun | [Exchange](exchange.md) | `/exchange` GUI exchanges for item, money, and EXP hand-ins, migrated from the old standalone 1MBTrades plugin. |
| Player Fun | [VoteTokens](votetokens.md) | `/votetokens` secure vote-token GUI exchanges with tier/layer progress, CMI kit rewards, hidden reward identity markers, extra-token item tools with shield presets, and staff migration tools for old manual exchanges. |
| Player Fun | [DiscordChat](discordchat.md) | `/discordchat` DiscordSRV server-chat engagement tracker with quality-gated EXP, continuous floor conversion, separate streak bonuses, conversation clusters, first-Discord broadcasts, community pulse, recurring bonus windows, linked-account streaks, top lists, two-step point rewards with player/global cooldowns, safe item tools, dependency-aware reward checks, opt-out reminders, milestone celebration privacy, and staff smoke/community/economy/archive/award reports. |
| Player Fun | [GameTypes](gametypes.md) | `/gametype` safe BentoBox menu adapter for OneBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid, with world detection and config-driven addon buttons. |
| Player Fun | [BirthdayLanterns](birthdaylanterns.md) | `/birthday` collectible birthday, player anniversary, and server milestone lantern rewards with PDC item identity, finite wish charges, strict birthday/guestbook input, GUI claims, presets, mail variants, and configurable CMI reward commands. |
| Player Fun | [LavaBoots](lavaboots.md) | `/lavaboots` finite PDC-marked lava-assist boots with dyed leather themes, charge, durability drain, offhand fuel, movement assist, short fire-resistance windows, lava vision event tiers, and repair/anvil/enchant guards. |
| Player Fun | [Spawners](spawners.md) | `/spawners` CMI spawner shop GUI with Paper entity discovery, spawn egg shop icons, tier-split friendly pages, glint availability markers, blocked utility-entity filters, restricted admin-only spawner browsing, CMI placespawner permission checks, confirmation purchases, CMI-backed Vault economy payments, annual event limits, stock caps, event progress, admin toggles, shift-click spawner editing, per-id disables, price overrides, category moves, future tier/group tools, DiscordSRV staff logs, setup command exports, and safe sell-section scaffolding. |
| Player Fun | [Collect](collect.md) | `/collect` seasonal event GUI for safe inventory-scanned item submissions, event-score bonuses, capped virtual Lucky Finds, community progress, personal milestones, hidden future weeks, top-3 highlighted leaderboards, streaks, PDC keepsake rewards, duplicate reward exchange, reward command hooks, and admin debug week/day/date controls. |
| Player Fun | [Coconut Hunt](coconut.md) | `/coconut` seven-day Summer Beach hunt with 200 registered heads, cumulative waves, immutable snapshots, personal collection and daily participation tracks, community goals, Coconut Points, safe claims, MobHat offers, an active 15-head isolated debug workflow with guarded resets, and transient CMI/Paper visuals. |
| Player Fun | [Halloween Ghost Hunt](ghosthunt.md) | `/ghosthunt` themed edition in the shared CoconutHunt jar with event-bound Ghost heads, private positional effects, accessibility modes, Haunting Chains, historical claims, guarded activation, immutable snapshots, and isolated debug data. |
| Player Fun | [Forage](forage.md) | `/forage` v1 tool-gated nature progression with curated PDC tools, CMI-backed Vault camp shop, Tier 2 pickaxe/brush/sword/mace unlocks, block and entity source families with non-overlapping default tool ownership, player XP/tool XP balance presets, global and per-family daily caps, XP/points, daily, weekly, and monthly quests, read-only top boards, camp-ready feedback, camp-only tier upgrades, diamond refinement, controlled Unbreaking/Efficiency improvements, camp-anchor turn-ins, multi-tier Forage Dust growth pulses with rare legendary treasure dust, tool soul lore, chunk exhaustion, WorldGuard global-only checks, camp validation, camp-only Repair & Merge, tips, placeholders, and safe GUI handling. |
| Player Fun | [AutoSell](autosell.md) | `/autosell` opt-in CMI Worth.yml inventory cleanup with hardened GUI category/material/filter/world toggles, per-category material pages, pure-vanilla item checks, hotbar/offhand/armor protection, exact-stack sell verification, Vault/CMI payments, daily caps, broker progress, quest hub with claimable rewards and period pages, visible milestone tree with bulk-batch milestones, sell chains, daily/weekly streak bonuses, `/rate`-visible AutoSell happy-hour boosts, chunk-change and overheat anti-farm guards, material/world blacklists, quick blacklist actions from numbered warnings, player category/material stats, admin analytics reports, and Markdown exports. |
| Player Fun | [Forage Roadmap](forage-roadmap.md) | Planning notes for long-term `/forage` expansion with camps, skill trees, seasonal profiles, magic growth systems, derbies, storage-hardening discussion, and staged v2/v3 rollout ideas. |
| Player Fun | [MobHat](mobhat.md) | Cosmetic whitelisted mob hats with optional `/hat mob` alias support, world safety, scale handling, and experimental offset positions. |
| Player Fun | [PlayerTodo](todo.md) | Small per-player todo lists stored in shared playerdata so players do not have to mail notes to themselves. |
| Player Fun | [Refer](refer.md) | Two-step player referral rewards with playtime checks and permission reward markers. |
| Player Fun | [TPAuto](tpauto.md) | Trusted-player `/tpauto` toggle for auto-accepting incoming CMI `/tpa` and `/tpahere` requests. |
| Player Fun | [Menu](menu.md) | Configurable `/menu` GUI for server discovery, travel, economy, progression, and CMI ctext info. |
| Staff / Moderation | [StaffCenter](staffcenter.md) | Read-only staff lookup surface for CMI player data. |
| Staff / Moderation | [Profile](profile.md) | Staff-only Java/Bedrock identity profiler with cached CMI/log signals, Mojang account status, optional remote profile context, public ban-list review signals, manual notes, and Markdown exports. |
| Staff / Moderation | [FilterLab](filterlab.md) | Safe CMI ChatFilter.yml rule simulation before live use. |
| Staff / Moderation | [FilterGuard](filterguard.md) | CMI chat-filter style checks for signs, books, anvils, item names, and nicknames. |
| Staff / Moderation | [WarningLens](warninglens.md) | Read-only warning, jail, ban, kick, and unban visibility. |
| Staff / Moderation | [NotableMsg](notablemsg.md) | Private `/n` helper channel for notable/community-assistant groups. |
| Staff / Moderation | [1MBStaffMsg](staffmsg.md) | Runtime recent history helper for CMI staffmsg and `/s recent`. |
| Server Management | [CmdCostDashboard](cmdcostdashboard.md) | CMI command cost usage, fee, and confusion dashboard. |
| Server Management | [CMIConfig](cmiconfig.md) | Owner GUI for selected CMI/CMILib config toggles with backups and reload prompts. |
| Server Management | [ConsoleNoiseRouter](consolenoiserouter.md) | CMI console message classification, redaction, and support dumps. |
| Server Management | [EconomyGuardian](economyguardian.md) | Read-only CMI economy balance anomaly watcher. |
| Server Management | [StartupDoctor](startupdoctor.md) | Startup/runtime diagnostics plus read-only folder doctor suggestions and export reports. |
| Server Management | [UpdateSmoke](updatesmoke.md) | Post-update smoke checks for runtime compatibility, hooks, command registration and dispatch, placeholders, feature metadata, and key CMI/CMILib APIs. |
| Server Management | [PluginVersions](pluginversions.md) | Plugin version inventory, tested Java/Paper/dependency gate, URL curation, and Markdown/Discord export reports migrated from the standalone PluginVersions project. |
| Server Management | [PlaceholderHealth](placeholderhealth.md) | Read-only PlaceholderAPI health monitor for configured CMI and 1MB placeholders with ok/warn/error checks and Markdown exports. |
| Server Management | [Potions](potions.md) | Locked `/_potions` admin forge plus player-safe `/potions` held-item inspection for PDC-marked custom event potions with split config files, GUI definition editing, collection bundle generation, 14 style choices, snapshotted costs, particle presets, collections, and runtime disable controls. |
| Server Management | [SchedulerCheck](schedulercheck.md) | Direct-console CMI scheduler YAML validator for syntax, timing ranges, command lists, enabled toggles, and Markdown exports. |
| Server Management | [Upgrade](upgrade.md) | Admin-only `/_upgrade` helper that simulates, suggests, and applies guarded LuckPerms group upgrades from join-date and playtime signals, with a review queue GUI, optional cosmetic rewards, promotion effects, and Discord link reminders. |
| Server Management | [EndCrystals](endcrystals.md) | End crystal block, entity, and player-break protection migrated from the standalone EndCrystals project. |
| Server Management | [AntiFire](antifire.md) | Runtime-independent STARTUP fire-spread and block-burn protection, delayed temporary-fire cleanup, controlled permanent fireplaces, and later read-only library status. |
| Server Management | [WorldSnapshot](worldsnapshot.md) | Read-only world settings, gamerules, and CMI world-toggle snapshots. |
| Server Management | [SparkReviewer](sparkreviewer.md) | Spark workflow, latest.log, config, MFM, entity, hopper, and stress-test reviewer for TPS drops. |
| Server Management | [Hoppers](hoppers.md) | Read-only hopper clog, watch/trigger/baseline tools, report comparison, storage-chain/container/material/redstone/ticket deep dives, world/chunk/player scopes, Spark helpers, notes, config drift, hotspot history, and MobFarmManager triage for TPS drops. |
| Server Management | [Diagnostics](diagnostics.md) | Removable owner diagnostics for disconnects, AFK context, player state, packet/protocol bridge clues, compact item metadata clues, plugin versions, and support-ready timestamped logs. |
| Server Management | [Hoppers Roadmap](hoppers-roadmap.md) | Accepted, implemented, rejected, and pending Hoppers analyzer ideas. |
| Server Management | [WarpAudit](warpaudit.md) | Read-only CMI warp and portal hygiene and safety audit. |
| Server Management | [WorthDrift](worthdrift.md) | CMI sell-event drift analyzer plus ShopGUI+ `buyPrice` vs CMI `Worth.yml` Markdown reports for missing, drifting, duplicate, not-in-worth, illegal-item, and exception-filtered review. |
| Server Management | [WorthHelper](worthhelper.md) | Read-only CMI Worth.yml and Paper recipe analyzer with review-first setworth suggestions. |
| Generic / Dev | [EventRecorder](eventrecorder.md) | CMI event recorder for development and test sessions. |
| Generic / Dev | [CMIProbe](cmiprobe.md) | CMI, CMILib, event, and command smoke probe for test templates. |
| Generic / Dev | [CMIDatabase](cmidatabase.md) | Internal key/value database for CMI aliases, event commands, and placeholders. |
| Generic / Dev | [PlaceholderProbe](placeholderprobe.md) | Strict PlaceholderAPI probe for CMI and `onembcmi` placeholders. |
| Generic / Dev | [PermissionProbe](permissionprobe.md) | Owner-only read-only permission diagnosis, passive denial recording, watch summaries, scoped reports, Markdown exports, command explainers, feature/player access summaries, player/group comparisons, context-aware LuckPerms source traces, expected-profile checks, wildcard/orphan scans, and Bukkit metadata. |
| Generic / Dev | [CMIPlaceholderCheck](cmiplaceholders.md) | CMI-style placeholder lookup catalog with live example parsing. |
| Generic / Dev | [1MBPlaceholders](onembplaceholders.md) | Migrated `%onemb_<key>%` PlaceholderAPI expansion with legacy `/_placeholders` management commands. |

## Page Checklist

Every plugin page should cover purpose, feature behavior, commands, example commands, permissions, placeholders, config, data/cache writes, CMI-API usage, CMILib/CMI runtime usage, Paper API usage, optional hooks, and security notes.

The page should be written for future server staff, not only developers. It should explain what the plugin is for, how it behaves in game, how to test it, how to operate it safely, and what a staff member should expect to see in chat, console, PlaceholderAPI, `/1mbcmi debug plugin <id> all`, and the plugin's own help/status pages.

Every real plugin's generated public guide should include an `Available features include:` bullet list inside its `How Players Use It`, `How Staff Use It`, `How Testers Use It`, or `How The Server Uses It` section. Keep the list focused on capabilities that are available now. Roadmap pages describe possible future work and must not be presented as current feature guides.

Keep docs and runtime metadata together. If a plugin change adds, removes, renames, or changes behavior for a command, permission, placeholder, config path, hook, data path, jar name, version, or build number, update the plugin page and any affected global docs in the same change.

Build-number docs should be refreshed with `gradle refreshBuildDocs`; `gradle build` runs `verifyBuildMetadata` and fails when generated build constants or documented jar examples drift from `gradle.properties`.

Useful pages to check during a feature pass:

- root `README.md`
- `docs/features.md`
- `docs/commands.md`
- `docs/permissions.md`
- `docs/placeholders.md`
- `docs/installation.md`
- `docs/release.md`
- `checklist.md`
- the feature's own `docs/plugins/<plugin>.md`

## Naming

Runtime jars use this shape:

```text
1MB-CMIAPI-<Feature>-v<version>-<build>-j25-26.2.jar
```

Examples:

```text
1MB-CMIAPI-LIB-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-AFKShrine-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-RecordingMode-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-SellStreaks-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-ScheduledTips-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Visit-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PassportDiscovery-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-SocialGatherings-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-JourneyMap-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-KitStreaks-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-MessageFont-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Nick-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-EmoteMenu-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PvPToggle-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Boosters-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-NameMC-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Exchange-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-VoteTokens-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-DiscordChat-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-GameTypes-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-BirthdayLanterns-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-LavaBoots-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Spawners-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Collect-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CoconutHunt-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Forage-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-AutoSell-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-MobHat-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PlayerTodo-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Refer-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-TPAuto-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Menu-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-StaffCenter-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Profile-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-FilterLab-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-FilterGuard-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-WarningLens-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-NotableMsg-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-1MBStaffMsg-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CmdCostDashboard-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CMIConfig-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-ConsoleNoiseRouter-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-EconomyGuardian-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-StartupDoctor-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-UpdateSmoke-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PluginVersions-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PlaceholderHealth-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Potions-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-SchedulerCheck-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Upgrade-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-EndCrystals-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-AntiFire-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-WorldSnapshot-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-SparkReviewer-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-Hoppers-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-EventRecorder-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PlaceholderProbe-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-PermissionProbe-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CMIPlaceholderCheck-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-1MBPlaceholders-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-WarpAudit-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-WorthDrift-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-WorthHelper-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CMIProbe-v1.0.0-536-j25-26.2.jar
1MB-CMIAPI-CMIDatabase-v1.0.0-536-j25-26.2.jar
```

[Documentation index](../README.md)
