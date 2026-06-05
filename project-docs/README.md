# 1MB CMIAPI

[![Java 25+](https://img.shields.io/badge/Java-25%2B-orange.svg)](https://jdk.java.net/)
[![Paper 26.1.2+](https://img.shields.io/badge/Paper-26.1.2%2B-brightgreen.svg)](https://papermc.io/)
[![CMI API](https://img.shields.io/badge/CMI--API-Zrips-blue.svg)](https://github.com/Zrips/CMI-API)
[![Repository](https://img.shields.io/badge/GitHub-mrfdev%2F1MB--CMIAPI-black.svg)](https://github.com/mrfdev/1MB-CMIAPI)

This repository is a planning and prototyping space for Minecraft Paper plugins that use CMI, CMI-API, and CMILib.

CMI itself is closed source, but its public API and CMILib give enough surface area to build useful companion plugins around player features, staff tools, moderation workflows, server management, and reusable plugin utilities.

The project direction is:

- one shared library plugin jar: `1MB-CMIAPI-LIB-v<version>-<build>-j25-26.1.2.jar`
- many isolated feature plugin jars: `1MB-CMIAPI-<Feature>-v<version>-<build>-j25-26.1.2.jar`
- Java 25+ and Paper 26.1.2+
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
- [Release Process](docs/release.md)
- [Credits](docs/credits.md)
- [Development Rules](docs/development-rules.md)
- [Plugin Docs](docs/plugins/README.md)

Documentation is part of the definition of done for this repo. Every library, API surface, and feature plugin should be understandable from the repo docs and from in-game or console help/status/debug output. When a command, permission, placeholder, config path, hook, data path, jar name, version, or build number changes, the matching docs and registered debug/help metadata should be updated in the same change.

The goal is practical server operations: a new admin should be able to search the repo, open the relevant plugin page, compare it with what they see in game or console, and confidently test or operate that feature.

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

## Runtime Installation

Each feature should build as its own independent Paper plugin jar. The shared library should also build as its own jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory. Runtime jars should therefore be installed next to CMI and CMILib, for example:

- `plugins/CMI-<version>.jar`
- `plugins/CMILib<version>.jar`
- `plugins/1MB-CMIAPI-LIB-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-AFKShrine-v1.0.0-395-j25-26.1.2.jar` provides CMI AFK shrine effects, player-selectable particle presets, AFKShrine points, claim/trade rewards, milestones, quests, and leaderboards
- `plugins/1MB-CMIAPI-RecordingMode-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-SellStreaks-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-ScheduledTips-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Visit-v1.0.0-395-j25-26.1.2.jar` provides player-owned hidden CMI visit warps with safe welcome messages, arrival titles, particles, sounds, and top-visit perk unlocks
- `plugins/1MB-CMIAPI-PassportDiscovery-v1.0.0-395-j25-26.1.2.jar` includes `/passport warp`, replacing legacy WarpPassport for new installs
- `plugins/1MB-CMIAPI-SocialGatherings-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-JourneyMap-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-KitStreaks-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-MessageFont-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Nick-v1.0.0-395-j25-26.1.2.jar` provides safer `/nick` presets, GUI previews, cooldowns, related-name checks, history, favorites, ratings, and CMI nickname delegation
- `plugins/1MB-CMIAPI-EmoteMenu-v1.0.0-395-j25-26.1.2.jar` provides `/emotes` with a hardened light-blue GUI, Paper dialog search, target picking, and CMI CustomAlias-backed emote review
- `plugins/1MB-CMIAPI-PvPToggle-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Boosters-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-NameMC-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Trades-v1.0.0-395-j25-26.1.2.jar` provides `/trade`, migrated from the old standalone 1MBTrades plugin
- `plugins/1MB-CMIAPI-VoteTokens-v1.0.0-395-j25-26.1.2.jar` provides `/votetokens` secure vote-token GUI trades, CMI kit rewards, hidden reward identity markers, reward setup item creation, extra-token item tools with shield presets, and staff migration tools for old manual trades
- `plugins/1MB-CMIAPI-DiscordChat-v1.0.0-395-j25-26.1.2.jar` provides `/discordchat` DiscordSRV server-chat engagement tracking, quality-gated EXP, conversation clusters, first-Discord broadcasts, community pulse, recurring bonus windows, linked-account streaks, point rewards, safe item tools, dependency-aware reward checks, opt-out reminders, milestone celebration privacy, and staff smoke/community/economy/archive/award reports
- `plugins/1MB-CMIAPI-GameTypes-v1.0.0-395-j25-26.1.2.jar` provides `/gametype` safe BentoBox game type menus for OneBlock, SkyBlock, AcidIsland, CaveBlock, and SkyGrid
- `plugins/1MB-CMIAPI-BirthdayLanterns-v1.0.0-395-j25-26.1.2.jar` provides `/birthday` collectible birthday, player anniversary, and server milestone lantern rewards with GUI claims, PDC item identity, finite wish charges, guestbook notes, presets, mail variants, and configurable CMI reward commands
- `plugins/1MB-CMIAPI-LavaBoots-v1.0.0-395-j25-26.1.2.jar` provides `/lavaboots` finite PDC-marked lava-assist boots with dyed leather event themes, charge, durability drain, offhand magma/fire-charge fuel, movement assist, short fire-resistance windows, lava vision event tiers, and repair/anvil/enchant guards
- `plugins/1MB-CMIAPI-Spawners-v1.0.0-395-j25-26.1.2.jar` provides `/spawners` CMI spawner shop GUI with Paper entity discovery, CMI placespawner permission checks, CMI-backed Vault economy purchases, annual event limits, setup command exports, and safe sell-section scaffolding
- `plugins/1MB-CMIAPI-MobHat-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-PlayerTodo-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Refer-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-TPAuto-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Menu-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-StaffCenter-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Profile-v1.0.0-395-j25-26.1.2.jar` provides `/profile` for staff-only Java/Bedrock identity review, cached CMI/log signals, Mojang account status, remote profile context, public ban-list review signals, manual notes, and Markdown exports
- `plugins/1MB-CMIAPI-FilterLab-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-FilterGuard-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-WarningLens-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-NotableMsg-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-1MBStaffMsg-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-CmdCostDashboard-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-CMIConfig-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-ConsoleNoiseRouter-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-EconomyGuardian-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-StartupDoctor-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-UpdateSmoke-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-PluginVersions-v1.0.0-395-j25-26.1.2.jar` provides plugin inventory, tested Java/Paper/dependency gate checks, URL curation, and Markdown/Discord exports
- `plugins/1MB-CMIAPI-Potions-v1.0.0-395-j25-26.1.2.jar` provides `/_potions` for locked admin custom event potion forging plus player-safe `/potions` held-item inspection, split config/potions/particles files, PDC identity, GUI definition editing, collection bundle generation, 14-style generation, snapshotted item costs, particle/collection metadata, and runtime disable controls
- `plugins/1MB-CMIAPI-SchedulerCheck-v1.0.0-395-j25-26.1.2.jar` provides direct-console `/_scheduler` checks for CMI scheduler YAML syntax, timing values, command lists, enabled toggles, and Markdown exports
- `plugins/1MB-CMIAPI-Upgrade-v1.0.0-395-j25-26.1.2.jar` provides `/_upgrade` admin-only LuckPerms group upgrade suggestions and read-only rankup simulation from join date and playtime signals, with a review queue GUI, clickable inspect/apply actions, guarded re-checks, side-group preservation, optional cosmetic permission rewards, promotion feedback effects, Discord link reminders, and split `config.yml`/`groups.yml`
- `plugins/1MB-CMIAPI-EndCrystals-v1.0.0-395-j25-26.1.2.jar` provides `/_endcrystals`, migrated from the old standalone 1MB-EndCrystals plugin
- `plugins/1MB-CMIAPI-WorldSnapshot-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-SparkReviewer-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-Hoppers-v1.0.0-395-j25-26.1.2.jar` provides `/_hoppers` for read-only hopper clog, watch/trigger/baseline, report comparison, storage-chain/container/material/redstone/ticket deep dives, world/chunk/player, region, Spark, notes, drift, history, and recommendation triage
- `plugins/1MB-CMIAPI-EventRecorder-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-CMIProbe-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-CMIDatabase-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-PlaceholderProbe-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-CMIPlaceholderCheck-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-1MBPlaceholders-v1.0.0-395-j25-26.1.2.jar` provides the migrated `%onemb_<key>%` PlaceholderAPI expansion and keeps `/_placeholders`
- `plugins/1MB-CMIAPI-WarpAudit-v1.0.0-395-j25-26.1.2.jar` provides read-only CMI warp and portal hygiene checks
- `plugins/1MB-CMIAPI-WorthDrift-v1.0.0-395-j25-26.1.2.jar`
- `plugins/1MB-CMIAPI-WorthHelper-v1.0.0-395-j25-26.1.2.jar` provides `/worthhelper` for read-only CMI Worth.yml and Paper recipe review exports

The common `1MB-CMIAPI-` prefix keeps the jars grouped together when sorted by name. Repository folders and build output may be organized by category, but installed runtime jars should stay in `/plugins/` for normal Paper loading and feature isolation.

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

- `servers/Paper-26.1.2/plugins/`

The `syncBuiltJarsToProjectServer` Gradle task copies all feature jars to the Paper test server, removes old active `1MB-CMIAPI-*.jar` files from that folder, and refuses to leave stale active project jars behind. GameTypes/BentoBox validation now happens outside this repository-local sync target, because the BentoBox environment is a live server rather than a local `servers/` instance. The centralized `/servers/` area can still be used for temporary automated test instances, but the project-local Paper server is the owner's hands-on live-test instance.

Build metadata is generated from `gradle.properties`. `BuildConstants.java` is not maintained by hand, and `gradle build` fails if the generated debug metadata or documented jar/build examples drift from the current version, build number, Java target, or Paper target. After bumping `buildNumber`, run `gradle refreshBuildDocs` before building.

After jars have been tested in the Paper test server, `gradle stageTestedJarsForLive` copies those active tested jars into `build/tested-jars/live/`. That folder is a deliberate handoff point for live deployment, not an automatic live-server or RCON update path.

## Commands

The shared library should own the global command surface:

- `/1mbcmi status`
- `/1mbcmi version`
- `/1mbcmi doctor`
- `/1mbcmi features`
- `/1mbcmi storage`
- `/1mbcmi permissions <player> [plugin|all] [page]`
- `/1mbcmi permissions node <player> <permission>`
- `/1mbcmi permissions plugin <plugin> <player> [page]`
- `/1mbcmi debug plugins`
- `/1mbcmi debug plugins <category>`
- `/1mbcmi debug cmi`
- `/1mbcmi debug bundle`
- `/1mbcmi debug clean cache [global|all|plugin <plugin>] [--dry-run]`
- `/1mbcmi debug clean playerdata plugin <plugin> [--dry-run|--confirm]`
- `/1mbcmi config <plugin>`
- `/1mbcmi config set <plugin> <path> <value>`
- `/1mbcmi gui test`
- `/1mbcmi gui examples`
- `/1mbcmi translations status`
- `/1mbcmi translations missing [plugin|all]`
- `/1mbcmi translations reload`
- `/1mbcmi help`

Feature plugins should expose their own concise commands and also register with the library so `/1mbcmi features` and `/1mbcmi debug plugins` stay accurate.

The shared library also owns central chat-prefix symbols through `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.*`. This lets feature messages use consistent visible prefixes such as `[✎ PassportDiscovery]`, `[ⓘ ScheduledTips]`, `[⚔ PvP]`, `[♨ LavaBoots]`, `[▣ Spawners]`, `[⚗ Potions]`, `[◷ SchedulerCheck]`, `[⇧ Upgrade]`, and `[✦ Vote]` without hard-coding symbols into every feature translation file.

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
- `%onembcmi_messagefont.current.font%`
- `%onembcmi_messagefont.plain.enabled%`
- `%onembcmi_messagefont.current.remaining_seconds%`
- `%onembcmi_nick.current.plain%`
- `%onembcmi_nick.current.style%`
- `%onembcmi_nick.rating.average%`
- `%onembcmi_nick.legacy.available%`
- `%onembcmi_emotemenu.emotes.count%`
- `%onembcmi_emotemenu.aliases.imported.count%`
- `%onembcmi_emotemenu.aliases.enabled.count%`
- `%onembcmi_emotemenu.last.emote%`
- `%onembcmi_emotemenu.actions.count%`
- `%onembcmi_trades.ready_trades%`
- `%onembtrades_trade.summer_event.status%`
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
- `%onembcmi_updatesmoke.placeholders.ok%`
- `%onembcmi_worldsnapshot.worlds.count%`
- `%onembcmi_worldsnapshot.gamerules.count%`
- `%onembcmi_worldsnapshot.last.diffs.count%`
- `%onembcmi_eventrecorder.total.count%`
- `%onembcmi_eventrecorder.recent.warp.count%`
- `%onembcmi_cmidb.global.event.enabled%`
- `%onembcmi_cmidb.player.quest.bridge.started%`
- `%onembcmidb_quest_bridge_started%`
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

- Target Java 25+ and Paper 26.1.2+.
- Prefer modern Paper APIs and avoid deprecated Bukkit/Spigot-era calls.
- Keep every feature as a separate jar unless there is a strong reason not to.
- Put shared infrastructure in `1MB-CMIAPI-LIB`, not in every feature plugin.
- Treat docs and in-game help/debug pages as a required part of each feature, not an afterthought.
- Treat player input as untrusted: parse strict types, restrict config changes to known paths, sanitize command arguments, and require explicit permissions for sensitive actions.
- Use the shared library helpers for page parsing, paginated list rendering, integer parsing, clamped values, safe cache filenames, timestamped dump filenames, joined command arguments, safe regex patterns, and sanitized log/debug text.
- Use permission nodes like `onembcmi.<plugin>.<type>.<specifics>`, with `global` for shared commands.
- Use PlaceholderAPI paths like `%onembcmi_<plugin>.<type>.<specifics>%`, with `global` for shared placeholders.

## Compile Instructions

The Gradle build uses Java 25 and Paper 26.1.2 API metadata. The normal build flow is:

```bash
./gradlew clean build
```

Feature jars should be produced as separate artifacts using the project filename convention:

```text
1MB-CMIAPI-<Feature>-v<version>-<build>-j25-26.1.2.jar
```

After a successful build, release helper scripts should copy matching project jars into:

```text
servers/Paper-26.1.2/plugins/
```

## Credits

- CMI, CMILib, and CMI-API are by Zrips.
- This project is by mrfloris with OpenAI as development collaborator.
- Paper is by the PaperMC project.
- PlaceholderAPI, LuckPerms, and Vault may be used as optional integrations where CMI or CMILib do not already provide the needed API surface.

## Repository Hygiene

The `.gitignore` excludes common OS/editor files, Java build output, Paper runtime files, CMI/CMILib/Paper jars, `security.key`, and other secrets. The todo logs are explicitly kept trackable.
