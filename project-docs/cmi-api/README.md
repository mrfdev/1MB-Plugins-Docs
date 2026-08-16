# 1MB Library

[![Java 25+](https://img.shields.io/badge/Java-25%2B-orange.svg)](https://jdk.java.net/)
[![Paper 26.2+](https://img.shields.io/badge/Paper-26.2%2B-brightgreen.svg)](https://papermc.io/)
[![CMI API](https://img.shields.io/badge/CMI--API-Zrips-blue.svg)](https://github.com/Zrips/CMI-API)
[![Repository](https://img.shields.io/badge/GitHub-mrfdev%2F1MB--CMIAPI-black.svg)](https://github.com/mrfdev/1MB-CMIAPI)

1MB Library is an umbrella for a live-server Minecraft Paper plugin suite: one loaded-first Shared Library supports independently deployable Feature Plugins. Some features integrate with CMI, the CMI API, or CMILib, but those integrations no longer define the whole suite.

CMI itself is closed source, but its public API and CMILib give enough surface area to build useful companion plugins around player features, staff tools, moderation workflows, server management, and reusable plugin utilities.

The project direction is:

- one shared library plugin jar: `1MB-Lib-Core-v<version>-<build>-j25-26.2.jar`
- many isolated Feature Plugin JARs: `1MB-Lib-<Feature>-v<version>-<build>-j25-26.2.jar`
- Java 25+ and Paper 26.2+
- modern Paper API usage, with deprecated Bukkit/Spigot-era calls avoided where possible

## Documentation

The root README is the front door. Detailed documentation lives under [`docs/`](docs/README.md).

- [Resources](docs/resources.md)
- [Installation](docs/installation.md)
- [Compile Instructions](docs/compiling.md)
- [Commands](docs/commands.md)
- [Permissions](docs/permissions.md)
- [Placeholders](docs/placeholders.md)
- [Features](docs/features.md)
- [Hopper Testing Plan](docs/hopper-testing-plan.md)
- [Hopper Settings Guide](docs/hopper-settings-guide.md)
- [Plugin Metadata And Debug Output](docs/plugin-metadata.md)
- [Machine-Readable Feature Contracts](docs/feature-contracts.md)
- [Release Process](docs/release.md)
- [Credits](docs/credits.md)
- [Development Rules](docs/development-rules.md)
- [Plugin Docs](docs/plugins/README.md)
- [Shared Hunt: Coconut, Ghost, and Doors](docs/plugins/doors.md)

Documentation is part of the definition of done for this repo. Every library, API surface, and feature plugin should be understandable from the repo docs and from in-game or console help/status/debug output. When a command, permission, placeholder, config path, hook, data path, jar name, version, or build number changes, the matching docs and registered debug/help metadata should be updated in the same change.

The goal is practical server operations: a new admin should be able to search the repo, open the relevant plugin page, compare it with what they see in game or console, and confidently test or operate that feature.

Public player-facing docs are mirrored into the separate `1MB-Plugins-Docs` repository and published through Starlight/GitHub Pages at `https://docs.1moreblock.com`. Before release work, run `gradle checkPublicDocsSync` from this private repo to check that `README.md`, `docs/`, generated Starlight pages, and GitHub Pages metadata have not drifted. Set `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs checkout is not next to this repo.

## Idea Logs

The current project ideas are split by category:

- `todo.player-fun.log` - player-facing features and cosmetics
- `todo.staff-moderation.log` - staff tools, moderation, audit trails
- `todo.server-management.log` - operational and server management tools
- `todo.generic.log` - reusable foundations and helper systems

Each entry includes a rough feature vision, likely CMI/CMILib hooks, and possible command shapes.

## Resources

- CMI website and documentation: https://www.zrips.net/cmi/
- CMI commands: https://www.zrips.net/cmi/commands/
- CMI permissions: https://www.zrips.net/cmi/permissions/
- CMI placeholders: https://www.zrips.net/cmi/placeholders/
- CMI API page: https://www.zrips.net/cmi/api/
- CMI GitHub issue repository: https://github.com/Zrips/CMI
- CMI Spigot resource: https://www.spigotmc.org/resources/cmi-300-commands-insane-kits-portals-essentials-economy-mysql-sqlite-much-more.3742/
- CMILib GitHub source: https://github.com/Zrips/CMILib
- CMILib Spigot resource: https://www.spigotmc.org/resources/cmilib.87610/
- CMI-API GitHub source: https://github.com/Zrips/CMI-API
- Paper API Javadocs: https://jd.papermc.io/paper/
- Paper profiling docs: https://docs.papermc.io/paper/profiling/
- spark profiler: https://spark.lucko.me/
- Private project repository: https://github.com/mrfdev/1MB-CMIAPI

## Local Testing

The local `/servers/` directory is intentionally ignored by Git. It can contain Paper server engines, CMI jars, CMILib jars, worlds, logs, plugin configs, and test-only runtime data.

That means local testing servers can live inside the project without leaking paid jars, generated worlds, security keys, or private server configuration to GitHub.

### Themed Hunt Admin Quick Start

CoconutHunt debug mode is isolated from production, runs as an active day-1 event when no date/day override is set, and expects 15 test coconuts by default:

```text
/coconut admin enabled true
/coconut admin debug true
/coconut admin expected 15
/coconut admin coconut give 15 0
```

Place all 15 setup heads. Every placement independently chooses one of the five bundled coconut skins, then records that persistent texture variant together with the head's stable id, event, world, coordinates, region, day, and timestamp; no manual per-head details are required. Then run:

```text
/coconut admin coconut waves auto 7 2027
/coconut admin coconut validate
/coconut admin event validate
/coconut admin event snapshot
```

The same admin account can right-click the unlocked heads and test normal player progress. An alt is only needed for independent-player, community, and nearby social-bonus behavior. `/coconut admin day <1-7>` advances debug waves immediately.

Use `/coconut admin reset player <player> [event-id] --dry-run|--confirm` for one player. Use `/coconut admin reset event --dry-run|--confirm` to restart the complete isolated debug edition while preserving all registered heads, configuration, production data, and unrelated shared playerdata. Production still requires approved dates in `events.yml` with debug disabled and deliberately has no event-wide reset command.

The shared jar defaults to Coconut disabled and Halloween Ghost Hunt enabled. `/ghost` is canonical and `/ghosthunt` remains its compatibility alias. Disabling one theme stops its participation, discovery, effects, visit action, and shop without disabling the shared jar; a read-only overview/history and already-earned claims remain available only while that edition is `ACTIVE` or `CLAIMING` and has an immutable snapshot. Upcoming editions and editions without a snapshot stay blocked. For a balanced four-wave debug setup, run `/ghost admin enabled true`, `/ghost admin debug true`, `/ghost admin expected 16`, `/ghost admin ghost give 16 0`, and `/ghost admin ghost waves auto 4 2026`. The production `halloween_2026` contract is October 30 through November 2, 20 Ghosts per day and 80 total, with four daily kit claims plus the perfect all-80 bonus. `/ghost hint` returns direction/distance guidance without coordinates. Before launch, create the CMI `halloween` warp, prepare the exact five enabled, non-empty, item-only CMI kits, and take a restorable world backup before placing the final 80 heads. Select a production edition only through guarded `/hunt admin event status|activate` commands. See [Coconut Hunt](docs/plugins/coconut.md) and [Halloween Ghost Hunt](docs/plugins/ghosthunt.md) for complete setup, reset, reward, migration, and launch guides.

The public Event Hunts jar also hosts an isolated, dormant-by-default Door Hunt module. For players, `/hunt`, `/hunt info`, and `/hunt help` open a six-row Event Hunts index showing every installed module, its live/upcoming/dormant state, required worlds, primary command, and published dates. Clicking Coconut, Ghost, or Doors opens that module's GUI; dormant collectible hunts and Doors provide a read-only preview while every gameplay action remains guarded by its real runtime switch. A validated Event Hunts registry now drives the index, text listing, tab completion, and `/hunt <module>` routes; a future module must register unique metadata plus guarded status, command, and GUI contributors before it appears. `/hunt coconut`, `/hunt ghost`, and `/hunt doors` route only to their named module, while `/coconut`, `/ghost`, and `/doors` remain canonical shortcuts. `/doors` opens a Halloween GUI for travel, daily progress, hints, statistics, the coordinate-private journal, quests, reward-kit unlocks, retained seasons, and moving between the three hunts. Use `/hunt admin status` or `/hunt debug status` for the aggregate host view, and `/hunt admin modules` plus `/hunt admin module <module> <on|off>` for independent module switches. Door Hunt keeps the complete clean-room v3 behavior under the compatibility path `plugins/1MB-CMIAPI/CoconutHunt/Doors/` and shared player profiles under `doorshunt`. Validate and import a copied `plugins/OneMBTrickOrTreatDoors/` folder with `/doors admin migrate standalone --dry-run`, then `--confirm`; the source is never changed and the module is not enabled automatically. Never activate the standalone and combined Doors JARs together. See [Door Hunt](docs/plugins/doors.md), [administration](docs/plugins/doors-administration.md), and [testing](docs/plugins/doors-testing.md).

Player onboarding remains `/doors` → `/halloween` → find a closed door with a golden pressure plate → knock three times within five seconds with an empty main hand. Daily results use the clean-room weighted trick/treat catalogue, whose command rows remain `target: all` where configured. Publication sources are `docs/plugins/doors.md` and `docs/plugins/doors-docs.yml`; the public mirror remains in `mrfdev/1MB-Plugins-Docs` at `https://docs.1moreblock.com/player-guides/plugins/doors/`.

## Runtime Installation

Each feature should build as its own independent Paper plugin jar. The shared library should also build as its own jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory. Runtime jars should therefore be installed next to CMI and CMILib, for example:

- `plugins/CMI-<version>.jar`
- `plugins/CMILib<version>.jar`
- `plugins/1MB-Lib-Core-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-AFKShrine-v1.0.3-571-j25-26.2.jar` provides CMI AFK shrine effects, player-selectable permission-gated particle presets, highlighted welcome-back data, AFKShrine points, claim/exchange rewards, independently permissioned lore-book kits, milestones, quests, leaderboards, readiness checks, and passive staff Markdown reports
- `plugins/1MB-Lib-RecordingMode-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-SellStreaks-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-ScheduledTips-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Visit-v1.0.3-571-j25-26.2.jar` provides player-owned hidden CMI visit warps with safe welcome messages, arrival titles, particles, sounds, and top-visit perk unlocks
- `plugins/1MB-Lib-PassportDiscovery-v1.0.3-571-j25-26.2.jar` includes `/passport warp`, replacing legacy WarpPassport for new installs
- `plugins/1MB-Lib-SocialGatherings-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-JourneyMap-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-KitStreaks-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Nick-v1.0.3-571-j25-26.2.jar` provides safer `/nick` presets, GUI previews, cooldowns, related-name checks, history, favorites, ratings, and CMI nickname delegation
- `plugins/1MB-Lib-EmoteMenu-v1.0.3-571-j25-26.2.jar` provides `/emotes` with a hardened light-blue GUI, Paper dialog search, target picking, and CMI CustomAlias-backed emote review
- `plugins/1MB-Lib-PvPToggle-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Boosters-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-NameMC-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Exchange-v1.0.3-571-j25-26.2.jar` provides `/exchange`, migrated from the old standalone 1MBTrades plugin
- `plugins/1MB-Lib-VoteTokens-v1.0.3-571-j25-26.2.jar` provides `/votetokens` secure vote-token GUI exchanges, CMI kit rewards, hidden reward identity markers, reward setup item creation, extra-token item tools with shield presets, and staff migration tools for old manual exchanges
- `plugins/1MB-Lib-DiscordChat-v1.0.3-571-j25-26.2.jar` provides `/discordchat` DiscordSRV server-chat engagement tracking, continuous floor-based EXP conversion, separate streak milestone bonuses, conversation clusters, first-Discord broadcasts, community pulse, recurring bonus windows, linked-account streaks, two-step point rewards with player/global cooldowns, safe item tools, dependency-aware reward checks, opt-out reminders, milestone celebration privacy, and staff smoke/community/economy/archive/award reports
- `plugins/1MB-Lib-GameTypes-v1.0.3-571-j25-26.2.jar` provides `/gametype` safe BentoBox game type menus for OneBlock, ChunkBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid
- `plugins/1MB-Lib-BirthdayLanterns-v1.0.3-571-j25-26.2.jar` provides `/birthday` collectible birthday, player anniversary, and server milestone lantern rewards with GUI claims, PDC item identity, finite wish charges, guestbook notes, presets, mail variants, and configurable CMI reward commands
- `plugins/1MB-Lib-LavaBoots-v1.0.3-571-j25-26.2.jar` provides `/lavaboots` finite PDC-marked lava-assist boots with dyed leather event themes, charge, durability drain, offhand magma/fire-charge fuel, movement assist, short fire-resistance windows, lava vision event tiers, and repair/anvil/enchant guards
- `plugins/1MB-Lib-Spawners-v1.0.3-571-j25-26.2.jar` provides `/spawners` CMI spawner shop GUI with Paper entity discovery, spawn egg shop icons, tier-split friendly pages, glint availability markers, blocked utility-entity filters, restricted admin-only spawner browsing, CMI placespawner permission checks, confirmation purchases, CMI-backed Vault economy payments, annual event limits, yearly stock caps, event progress, admin toggles, shift-click spawner editing, per-id disables, price overrides, category moves, future tier/group tools, DiscordSRV staff logs, setup command exports, and safe sell-section scaffolding
- `plugins/1MB-Lib-Collect-v1.0.3-571-j25-26.2.jar` provides `/collect` seasonal event GUI with safe vanilla-only inventory-scanned item submissions, event-score bonuses, capped virtual Lucky Finds, community progress, scavenger hunts, personal milestones, hidden future weeks, daily/weekly/monthly/all-event leaderboards with highlighted top-3 player heads, Hall of Fame archives, streaks, PDC keepsake rewards, duplicate reward exchange for event score, CMI reward command hooks, DiscordSRV event feed hooks, admin debug week/day/date controls, and Discord-friendly markdown event reports
- `plugins/1MB-Lib-EventHunts-v1.0.3-571-j25-26.2.jar` provides the shared `/hunt` Event Hunts index and themed-hunt engine: a disabled-by-default preserved `/coconut` Summer 2027 edition, enabled `/ghost` (`/ghosthunt` alias) Halloween 2026 weekend with four 20-Ghost waves and five kit rewards, and the independently switched `/doors` event module. The legacy `CoconutHunt` data, permission, placeholder, and PDC namespaces remain unchanged.
- `plugins/1MB-Lib-DropParty-v1.0.3-571-j25-26.2.jar` provides dormant-by-default scheduled/manual sulfur-geyser DropParties, hardened player/staff GUIs, CMI arena travel, approved exact-item eruptions, movement-based anti-idle checks, durable cross-world collection vaults, recoverable claims, stats, leaderboards, and non-destructive mini-party flares
- `plugins/1MB-Lib-Appreciation-v1.0.3-571-j25-26.2.jar` provides dormant-by-default `/appreciate` and optional `/thanks` player appreciation menus, reviewed reasons including birthdays, limited sending quotas, recipient gift/notification/accessibility preferences, free/XP/money/scope-safe item escrow, one free thank-you reaction, nearby shared celebrations, 60-day gift returns with preserved notes, anonymous sending, recent favorites, badges, streak points, permanent unlocks, CMI notifications, placeholders, staff gift switches, anti-farming review, and guarded recovery
- `plugins/1MB-Lib-Forage-v1.0.3-571-j25-26.2.jar` provides `/forage` v1 tool-gated nature progression with curated PDC tools, first-run guide/onboarding, CMI-backed Vault camp shop, Tier 2 pickaxe/brush/sword/mace unlocks, block and entity source families with non-overlapping default tool ownership, player XP/tool XP live balance presets, `/forage admin check`, `/forage admin livecheck`, and `/forage admin export [backup]`, global and per-family daily caps plus player/admin limit overviews, XP/points, daily, weekly, and monthly quests, read-only top boards, camp-ready feedback, UUID-owned camp anchors with admin claim management, camp-only tier upgrades, diamond refinement, controlled Unbreaking/Efficiency improvements, configurable camp-anchor turn-ins, multi-tier Forage Dust growth pulses with rare legendary treasure dust, tool soul lore, chunk exhaustion, WorldGuard global-only checks, camp validation, camp-only Repair & Merge, tips, placeholders, and safe GUI handling
- `plugins/1MB-Lib-AutoSell-v1.0.3-571-j25-26.2.jar` provides `/autosell` opt-in CMI Worth.yml inventory cleanup with hardened GUI category/material/filter/world toggles, per-category material pages, pure-vanilla item checks, hotbar/offhand/armor protection, exact-stack sell verification, Vault/CMI payments, daily caps, broker progress, quest hub with claimable rewards and period pages, visible milestone tree with bulk-batch milestones, sell chains, daily/weekly streak bonuses, preset/manual and disabled-by-default scheduled `/rate`-visible AutoSell Happy Hour boosts, chunk-change and overheat anti-farm guards, material/world blacklists, quick blacklist actions from numbered warnings, player category/material stats, chunk heatmaps, passive tuning suggestions, admin analytics reports, and Markdown exports
- `plugins/1MB-Lib-MobHat-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-PlayerTodo-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Refer-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-TPAuto-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Menu-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-StaffCenter-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Profile-v1.0.3-571-j25-26.2.jar` provides `/profile` for staff-only Java/Bedrock identity review, cached CMI/log signals, Mojang account status, remote profile context, public ban-list review signals, manual notes, and Markdown exports
- `plugins/1MB-Lib-ContentGuard-v1.0.3-571-j25-26.2.jar` hosts independently switchable FilterLab simulation and FilterGuard enforcement modules while preserving their existing commands and configuration
- `plugins/1MB-Lib-WarningLens-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-TeamMsg-v1.0.3-571-j25-26.2.jar` hosts independently switchable 1MBStaffMsg and NotableMsg modules while preserving `/s`, `/1mbstaffmsg`, `/n`, permissions, placeholders, prefixes, and existing config files
- `plugins/1MB-Lib-CmdCostDashboard-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-CMIConfig-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-ConsoleNoiseRouter-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-EconomyGuardian-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-StartupDoctor-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-UpdateSmoke-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-PluginVersions-v1.0.3-571-j25-26.2.jar` provides plugin inventory, tested Java/Paper/dependency gate checks, URL curation, and Markdown/Discord exports
- `plugins/1MB-Lib-Placeholders-v1.0.3-571-j25-26.2.jar` hosts the production `%onemb_*%` provider plus independently switchable Catalog, Probe, and Health modules behind `/_placeholders`
- `plugins/1MB-Lib-Potions-v1.0.3-571-j25-26.2.jar` provides `/_potions` for locked admin custom event potion forging plus player-safe `/potions` held-item inspection, split config/potions/particles files, PDC identity, GUI definition editing, collection bundle generation, 14-style generation, snapshotted item costs, particle/collection metadata, and runtime disable controls
- `plugins/1MB-Lib-SchedulerCheck-v1.0.3-571-j25-26.2.jar` provides direct-console `/_scheduler` checks for CMI scheduler YAML syntax, timing values, command lists, enabled toggles, and Markdown exports
- `plugins/1MB-Lib-Upgrade-v1.0.3-571-j25-26.2.jar` provides `/_upgrade` admin-only LuckPerms group upgrade suggestions and read-only rankup simulation from join date and playtime signals, with a review queue GUI, clickable inspect/apply actions, guarded re-checks, side-group preservation, optional cosmetic permission rewards, promotion feedback effects, Discord link reminders, and split `config.yml`/`groups.yml`
- `plugins/1MB-Lib-EndCrystals-v1.0.3-571-j25-26.2.jar` provides `/_endcrystals`, migrated from the old standalone 1MB-EndCrystals plugin
- `plugins/1MB-Lib-AntiFire-v1.0.3-571-j25-26.2.jar` provides independent `STARTUP` fire-spread and block-burn protection, delayed temporary-fire cleanup, `/_antifire`, automatic standalone config import, and a later read-only status/placeholder bridge into `1MB-CMIAPI-LIB`
- `plugins/1MB-Lib-WorldSnapshot-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-SparkReviewer-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-Hoppers-v1.0.3-571-j25-26.2.jar` provides `/_hoppers` for read-only hopper clog, watch/trigger/baseline, report comparison, storage-chain/container/material/redstone/ticket deep dives, world/chunk/player, region, Spark, notes, drift, history, and recommendation triage
- `plugins/1MB-Lib-Diagnostics-v1.0.3-571-j25-26.2.jar` provides removable `/_diagnostics` probes for disconnect, AFK, player-state, packet/protocol bridge context, compact item metadata clues, server-state, plugin-version, and recent server-log context with timestamped support logs
- `plugins/1MB-Lib-EventRecorder-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-BedrockChatBridge-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-CMIProbe-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-CMIDatabase-v1.0.3-571-j25-26.2.jar`
- `plugins/1MB-Lib-PermissionProbe-v1.0.3-571-j25-26.2.jar` provides owner-only `/_permissions` diagnosis for players, commands, plugins, feature access summaries, player access overviews, player/group comparisons, passive denied-check recording, live watch summaries, scoped reports, Markdown exports, context-aware LuckPerms source traces, expected-profile gap checks, wildcard/orphan scans, and Bukkit permission metadata
- `plugins/1MB-Lib-WarpAudit-v1.0.3-571-j25-26.2.jar` provides read-only CMI warp and portal hygiene checks
- `plugins/1MB-Lib-WorthDrift-v1.0.3-571-j25-26.2.jar` provides read-only CMI sell-event drift tracking plus ShopGUI+ `buyPrice` vs CMI `Worth.yml` Markdown reports with missing, drifting, duplicate, not-in-worth, illegal-item, GitHub-table, Discord-bullet, and exception-filtered modes
- `plugins/1MB-Lib-WorthHelper-v1.0.3-571-j25-26.2.jar` provides `/worthhelper` for read-only CMI Worth.yml and Paper recipe review exports

The common `1MB-Lib-` prefix keeps the JARs grouped together when sorted by name. Repository folders and build output may be organized by category, but installed runtime JARs should stay in `/plugins/` for normal Paper loading and feature isolation.

### First-Install Feature Defaults

The complete built jar set may be copied to a live server without exposing unfinished features. On first install, the shared bootstrap writes `enabled: true` only for the current live allowlist:

- `Placeholders`, `AFKShrine`, `AutoSell`, `BedrockChatBridge`, `Boosters`, `CoconutHunt`, `TeamMsg`
- `EmoteMenu`, `EndCrystals`, `Exchange`, `GameTypes`, `Hoppers`, `Menu`
- `MobHat`, `NameMC`, `PlayerTodo`, `PluginVersions`, `Profile`
- `PvPToggle`, `RecordingMode`, `Visit`, `VoteTokens`, `WorthDrift`, `WorthHelper`
- the required `LIB` and standalone `AntiFire` jars

Every other shared feature defaults to `enabled: false`. A startup-disabled feature creates its config and stays loaded, so Paper shows the jar in green under `/plugins`, but its gameplay commands, listeners, tasks, placeholders, services, and hooks remain dormant. Only `info`, `help`, safe shared `debug` pages, and the admin lifecycle control remain available. Console or an admin with the feature admin permission or `onembcmi.global.config.set` can activate it live with `/<feature-command> debug enable true`; use the same command with `false` to return it to dormant mode. The setting is written atomically to the feature's `config.yml`, so no restart is required.

Existing config values always win, including the repository test server's existing `enabled: true` values. Updating a jar therefore does not turn a configured live feature on or off. Unknown future feature ids fail closed until they are deliberately added to the allowlist.

### VoteTokens Netherite Upgrade Exceptions

VoteTokens does not provide a generic netherite upgrade for every vote reward. Only these configured reward ids may convert, and the held item must be a certified VoteTokens reward whose current material matches the `from` material:

| Reward id | Reward slot | Current material | Converts to |
| --- | --- | --- | --- |
| `t1_l1_i2` | Tier 1, Layer 1, Item 2 / emerald slot | `DIAMOND_SWORD` | `NETHERITE_SWORD` |
| `t1_l1_i3` | Tier 1, Layer 1, Item 3 / iron slot | `IRON_PICKAXE` | `NETHERITE_PICKAXE` |
| `t2_l1_i2` | Tier 2, Layer 1, Item 2 / emerald slot | `GOLDEN_AXE` | `NETHERITE_AXE` |
| `t2_l1_i3` | Tier 2, Layer 1, Item 3 / iron slot | `IRON_SHOVEL` | `NETHERITE_SHOVEL` |
| `t2_l2_i3` | Tier 2, Layer 2, Item 3 / iron slot | `DIAMOND_PICKAXE` | `NETHERITE_PICKAXE` |

Future tools TODO, not implemented yet: review adding certified VoteTokens reward conversions for `CHAINMAIL_CHESTPLATE`, `CHAINMAIL_BOOTS`, and `TURTLE_HELMET` into the matching netherite armor pieces while preserving existing metadata.

Runtime data should live under one central folder:

- `plugins/1MB-CMIAPI/CMIAPILIB/`
- `plugins/1MB-CMIAPI/<FeatureName>/`

The shared library owns common storage such as `database/`, `translations/`, `cache/`, `debug/`, and long-lived `playerdata/`. Feature plugins should use the shared playerdata helper for UUID file loading/saving and plugin-scoped cleanup.

Whenever a feature jar or library jar is built, a copy should also be placed in the project-local Paper test server:

- `servers/Paper-26.2/plugins/`

The v1.0.3 JARs must not be synchronized until the deployment workflow manages both legacy `1MB-CMIAPI-*.jar` and new `1MB-Lib-*.jar` families as one replacement set. Until that dual-prefix gate is complete, build and inspect the new artifacts without running `syncBuiltJarsToProjectServer` or the standalone copy script. GameTypes/BentoBox validation remains outside this repository-local sync target because the BentoBox environment is a live server rather than a local `servers/` instance.

Retired local server instances belong under `archive/`. That directory is ignored by Git and is never read by the Gradle build, sync, staging, or test-server workflow. The only active repository-local target is `servers/Paper-26.2/`.

Build metadata is generated from `gradle.properties`. `BuildConstants.java` is not maintained by hand, and `gradle build` fails if generated runtime metadata or any documented 1MB jar/version/build/Paper-stable example drifts from the current release. The maintained local server must also match the configured Paper API build, stable PaperScript channel, checksum, and build-number-free `Paper-26.2.jar` name. After changing release metadata, run `gradle refreshBuildDocs` before building.

After jars have been tested in the Paper test server, `gradle stageTestedJarsForLive` copies those active tested jars into `build/tested-jars/live/`. That folder is a deliberate handoff point for live deployment, not an automatic live-server or RCON update path.

## Commands

The shared library should own the global command surface:

- `/1mblib status`
- `/1mblib version`
- `/1mblib doctor`
- `/1mblib features`
- `/1mblib storage`
- `/1mblib debug plugins`
- `/1mblib debug plugins <category>`
- `/1mblib debug cmi`
- `/1mblib debug bundle`
- `/1mblib debug clean cache [global|all|plugin <plugin>] [--dry-run]`
- `/1mblib debug clean playerdata plugin <plugin> [--dry-run|--confirm]`
- `/1mblib docs commands [all|plugin] [discord|github]`
- `/1mblib docs permissions [all|plugin] [discord|github]`
- `/1mblib docs all [all|plugin] [discord|github]`
- `/1mblib config <plugin>`
- `/1mblib config set <plugin> <path> <value>`
- `/1mblib gui test`
- `/1mblib gui examples`
- `/1mblib player resolve <name|uuid>`
- `/1mblib player cached <name|uuid>`
- `/1mblib validate <material|world|duration|uuid|money|id|page|feature> <value>`
- `/1mblib translations status`
- `/1mblib translations missing [plugin|all]`
- `/1mblib translations reload`
- `/1mblib help`

Feature plugins should expose their own concise commands and also register with the library so `/1mblib features` and `/1mblib debug plugins` stay accurate.

Permission diagnosis lives in the PermissionProbe Feature Plugin as `/_permissions ...`. The deprecated `permissions` subcommand—whether reached through `/1mblib permissions ...` or the `/1mbcmi` compatibility alias—only redirects admins to `/_permissions`.

Command and permission documentation snapshots can be generated with `/1mblib docs ...`. These are read-only Markdown exports for review and do not edit the private or public docs automatically. Support bundles and generated docs pass through the shared audit redactor before they are written to disk.

Feature plugins can reuse the shared command argument validator service for Paper materials, loaded worlds, durations, UUIDs, money amounts, safe ids, positive page numbers, and currently registered feature ids. `/1mblib validate ...` exposes the same normalization rules as a read-only owner tool, so inputs can be checked before they are placed in configs or commands.

Feature plugins can also reuse the safe player resolver for exact online names, known UUIDs, cached Paper/CMI real names, and unique CMI nicknames. It never performs partial-name or remote profile matching and never creates an offline-player record. `/1mblib player resolve ...` shows the selected UUID, real name, state, match type, and source; `cached` mode intentionally ignores nicknames.

The shared library also owns central chat-prefix symbols through `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.*`. Every active feature has a logical feature-specific symbol rather than the generic fallback, such as `[✎ PassportDiscovery]`, `[ⓘ ScheduledTips]`, `[☻ Appreciation]`, `[¤ AutoSell]`, `[⚔ PvP]`, `[♨ LavaBoots]`, `[▣ Spawners]`, `[✹ Collect]`, `[☀ Coconut]`, `[☘ Forage]`, `[⚗ Potions]`, `[◷ SchedulerCheck]`, `[⇧ Upgrade]`, and `[◆ Vote]`. Shared prefixes also provide explanatory hover text and a safe click target that opens the feature's logical non-mutating command or falls back to its `info` route.

The shared library also owns the global GUI pane theme through `gui.filler-material` and `gui.border-material`. GUI feature plugins use `LIGHT_BLUE_STAINED_GLASS_PANE` by default so filled or blocked slots stay visible across resource packs, while still allowing a per-plugin override when a future menu needs a custom look.

SocialGatherings has in-game setup commands for town party areas, so admins do not have to hand-edit center/radius values for normal setup:

- `/gathering admin setarea <type> here <radius>`
- `/gathering admin setcenter <type> here`
- `/gathering admin setradius <type> <radius>`
- `/gathering admin show <type>`
- `/gathering admin tp <type>`
- `/gathering admin setportal <type> <start|checkpoint|end|add> <portalName>`
- `/gathering admin validate <type>`

See [SocialGatherings](docs/plugins/socialgatherings.md) for the full setup workflow and party-specific requirements.

## Permissions

Permission nodes follow this project pattern:

- `onembcmi.<plugin>.use`
- `onembcmi.<plugin>.admin`
- `onembcmi.<plugin>.<type>.<specifics>`
- `onembcmi.global.<type>.<specifics>` for shared library permissions

At minimum, every plugin should have separate use and admin permissions. Sensitive operations should have narrower permission nodes.

## Placeholders

PlaceholderAPI placeholders should follow this shape:

- `%onembcmi_global.status.loaded%`
- `%onembcmi_global.plugins.count%`
- `%onembcmi_global.runtime.count%`
- `%onembcmi_global.features.enabled.count%`
- `%onembcmi_global.features.player-fun.count%`
- `%onembcmi_global.placeholderapi.registered%`
- `%onembcmi_global.cache.plugins.size%`
- `%onembcmi_afkshrine.enabled%`
- `%onembcmi_afkshrine.style.name%`
- `%onembcmi_afkshrine.opted_in%`
- `%onembcmi_afkshrine.points.balance%`
- `%onembcmi_afkshrine.points.pending%`
- `%onembcmi_afkshrine.streak.current%`
- `%onembcmi_afkshrine.quests.count%`
- `%onembcmi_afkshrine.events.count%`
- `%onembcmi_afkshrine.active.count%`
- `%onembcmi_afkshrine.runtime.enters%`
- `%onembcmi_afkshrine.cache.size%`
- `%onembcmi_recordingmode.active%`
- `%onembcmi_recordingmode.preference.tpa%`
- `%onembcmi_recordingmode.preference.bluemap%`
- `%onembcmi_recordingmode.active.count%`
- `%onembcmi_passportdiscovery.total.stamps%`
- `%onembcmi_passportdiscovery.warp.stamps%`
- `%onembcmi_passportdiscovery.warp.missing%`
- `%onembcmi_passportdiscovery.warp.last%`
- `%onembcmi_passportdiscovery.warp.progress_percent%`
- `%onembcmi_passportdiscovery.visit.progress_percent%`
- `%onembcmi_passportdiscovery.biome.progress_percent%`
- `%onembcmi_passportdiscovery.block.stamps%`
- `%onembcmi_passportdiscovery.consume.stamps%`
- `%onembcmi_passportdiscovery.consume.progress_percent%`
- `%onembcmi_passportdiscovery.weapon.stamps%`
- `%onembcmi_passportdiscovery.armor.progress_percent%`
- `%onembcmi_passportdiscovery.kill.stamps%`
- `%onembcmi_passportdiscovery.mount.stamps%`
- `%onembcmi_passportdiscovery.explore.stamps%`
- `/passport stamps` completed-category reward credits
- `/passport stamps trade <box>` one-time stamp box claims
- `%onembcmi_scheduledtips.opted_out%`
- `%onembcmi_scheduledtips.seen.total%`
- `%onembcmi_scheduledtips.runtime.sent%`
- `%onembcmi_socialgatherings.runtime.successes%`
- `%onembcmi_socialgatherings.last.type%`
- `%onembcmi_journeymap.current.era%`
- `%onembcmi_journeymap.current.badge%`
- `%onembcmi_journeymap.next.remaining_seconds%`
- `%onembcmi_kitstreaks.current.streak%`
- `%onembcmi_kitstreaks.current.health%`
- `%onembcmi_kitstreaks.track.daily.streak%`
- `%onembcmi_teammsg.modules.staffmsg.enabled%`
- `%onembcmi_teammsg.modules.notablemsg.enabled%`
- `%onembcmi_contentguard.modules.guard.enabled%`
- `%onembcmi_nick.current.plain%`
- `%onembcmi_nick.current.style%`
- `%onembcmi_nick.rating.average%`
- `%onembcmi_nick.legacy.available%`
- `%onembcmi_emotemenu.emotes.count%`
- `%onembcmi_emotemenu.aliases.imported.count%`
- `%onembcmi_emotemenu.aliases.enabled.count%`
- `%onembcmi_emotemenu.last.emote%`
- `%onembcmi_emotemenu.actions.count%`
- `%onembcmi_exchange.ready_exchanges%`
- `%onembexchange_exchange.summer_event.status%`
- `%onembcmi_votetokens.current_tier%`
- `%onembcmi_votetokens.token.diamond.count%`
- `%onembcmi_votetokens.extra_token.lapis.count%`
- `%onembcmi_mobhat.active%`
- `%onembcmi_mobhat.active.type%`
- `%onembcmi_mobhat.world.allowed%`
- `%onembcmi_mobhat.position%`
- `%onembcmi_mobhat.position.testbed%`
- `%onembcmi_pluginversions.total%`
- `%pluginversions_total%`
- `%onembcmi_todo.open%`
- `%onembcmi_todo.latest%`
- `%onembcmi_todo.lifetime_completed%`
- `%onembcmi_refer.claimed_referrer%`
- `%onembcmi_refer.claimed_referred%`
- `%onembcmi_refer.pending.count%`
- `%onembcmi_visit.has_visit%`
- `%onembcmi_visit.title%`
- `%onembcmi_visit.particle_preset%`
- `%onembcmi_visit.arrival_unlocked%`
- `%onembcmi_visit.visits%`
- `%onembcmi_visit.runtime.teleports%`
- `%onembcmi_birthdaylanterns.available.count%`
- `%onembcmi_birthdaylanterns.claimed.count%`
- `%onembcmi_birthdaylanterns.birthday_date%`
- `%onembcmi_collect.event.name%`
- `%onembcmi_collect.current.day_display%`
- `%onembcmi_collect.current.week_name%`
- `%onembcmi_collect.player.score.daily%`
- `%onembcmi_collect.player.rank.alltime.display%`
- `%onembcmi_collect.community.score_formatted%`
- `%onembcmi_collect.scavenger.item_name%`
- `%onembcmi_collect.top.daily.1.line%`
- `%onembcmi_collect.top.alltime.1.line%`
- `%onembcmi_staffcenter.total.count%`
- `%onembcmi_staffcenter.last_lookup_section%`
- `%onembcmi_warninglens.recent.count%`
- `%onembcmi_warninglens.total.warn.count%`
- `%onembcmi_warninglens.last.type%`
- `%onembcmi_warninglens.warning_points%`
- `%onembcmi_cmiconfig.toggles.count%`
- `%onembcmi_cmiconfig.last.action%`
- `%onembcmi_consolenoiserouter.total.count%`
- `%onembcmi_consolenoiserouter.last_rule%`
- `%onembcmi_consolenoiserouter.recent.warn.count%`
- `%onembcmi_startupdoctor.last.result%`
- `%onembcmi_startupdoctor.warnings.count%`
- `%onembcmi_startupdoctor.cmiapi.usable%`
- `%onembcmi_startupdoctor.placeholderapi.loaded%`
- `%onembcmi_updatesmoke.last.result%`
- `%onembcmi_updatesmoke.last.failures%`
- `%onembcmi_updatesmoke.commands.ok%`
- `%onembcmi_updatesmoke.command_smoke.ok%`
- `%onembcmi_updatesmoke.placeholders.ok%`
- `%onembcmi_worldsnapshot.worlds.count%`
- `%onembcmi_worldsnapshot.gamerules.count%`
- `%onembcmi_worldsnapshot.last.diffs.count%`
- `%onembcmi_eventrecorder.total.count%`
- `%onembcmi_eventrecorder.recent.warp.count%`
- `%onembcmi_cmidb.global.event.enabled%`
- `%onembcmi_cmidb.player.quest.bridge.started%`
- `%onembcmidb_quest_bridge_started%`
- `%onembcmi_placeholders.modules.provider.enabled%`
- `%onembcmi_placeholders.modules.catalog.enabled%`
- `%onembcmi_placeholders.modules.probe.enabled%`
- `%onembcmi_placeholders.modules.health.enabled%`
- `%onembcmi_placeholderprobe.identifiers.count%`
- `%onembcmi_placeholderprobe.last.output%`
- `%onembcmi_placeholderprobe.last.state%`
- `%onembcmi_placeholderprobe.recent.error.count%`
- `%onembcmi_cmiplaceholders.catalog.count%`
- `%onembcmi_cmiplaceholders.last.keyword%`
- `%onembcmi_cmiplaceholders.last.example.output%`
- `%onembcmi_warpaudit.warps.count%`
- `%onembcmi_warpaudit.portals.count%`
- `%onembcmi_warpaudit.issues.count%`
- `%onembcmi_warpaudit.portal_issues.count%`
- `%onembcmi_warpaudit.unsafe_landings.count%`

The PlaceholderAPI expansion identifier is `onembcmi`; the rest is parsed by the library as a strict allowlisted path.

## Project Conventions

- Target Java 25+ and Paper 26.2+.
- Prefer modern Paper APIs and avoid deprecated Bukkit/Spigot-era calls.
- Keep every feature as a separate jar unless there is a strong reason not to.
- Put shared infrastructure in the 1MB Library Shared Library, whose compatibility Paper identity remains `1MB-CMIAPI-Lib`, not in every Feature Plugin.
- Keep safety-critical AntiFire protection runtime-independent: it shares this repository's build/release metadata but must not depend on CMI, CMILib, or the shared library to enable.
- Treat docs and in-game help/debug pages as a required part of each feature, not an afterthought.
- Treat player input as untrusted: parse strict types, restrict config changes to known paths, sanitize command arguments, and require explicit permissions for sensitive actions.
- Put player rewards, claims, purchases, trades, economy changes, and item transformations behind the shared durable transaction journal. Persist an idempotency key before side effects, escrow exact mutable item state when compensation may be needed, and leave uncertain operations unresolved for explicit staff recovery.
- Use the shared library helpers for page parsing, paginated list rendering, integer parsing, clamped values, safe cache filenames, timestamped dump filenames, joined command arguments, safe regex patterns, and sanitized log/debug text.
- Use permission nodes like `onembcmi.<plugin>.<type>.<specifics>`, with `global` for shared commands.
- Use PlaceholderAPI paths like `%onembcmi_<plugin>.<type>.<specifics>%`, with `global` for shared placeholders.

## Compile Instructions

The Gradle build uses Java 25 and Paper 26.2 API metadata. The normal build flow is:

```bash
./gradlew clean build
```

Feature jars should be produced as separate artifacts using the project filename convention:

```text
1MB-Lib-<Feature>-v<version>-<build>-j25-26.2.jar
```

After a successful build, release helper scripts should copy matching project jars into:

```text
servers/Paper-26.2/plugins/
```

## Credits

- CMI, CMILib, and CMI-API are by Zrips.
- This project is by mrfloris with OpenAI as development collaborator.
- Paper is by the PaperMC project.
- PlaceholderAPI, LuckPerms, and Vault may be used as optional integrations where CMI or CMILib do not already provide the needed API surface.
- AntiFire originated as a standalone 1MoreBlock plugin with work by DefianceCoding, The456gamer, Greymagic27, and mrfloris; OpenAI helped modernize and migrate it into this project.

## Repository Hygiene

The `.gitignore` excludes common OS/editor files, Java build output, Paper runtime files, CMI/CMILib/Paper jars, `security.key`, and other secrets. The todo logs are explicitly kept trackable.
