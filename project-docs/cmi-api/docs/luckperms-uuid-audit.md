# LuckPerms UUID audit, 9 September 2026

Scope: all 64 modules in `settings.gradle.kts`, comprising the Shared Library and 63 Feature Plugins, plus the two retained plugin directories excluded from the build (WarpPassport and MessageFont). DiscordChat is excluded from edits and behavioral review because another task owns it. Reviewed Java command dispatch, configurable templates, resources, optional/disabled reward definitions, and maintained local configuration. No additional direct LuckPerms API writes were found; reflective integrations in Upgrade, Spawners, and PermissionProbe read existing data.

## Permission changes and purpose

| Feature | Permission or group change | Why |
| --- | --- | --- |
| NameMC | `onembnamemc.verified` | One-time NameMC verification/reward marker. |
| Refer | `cmi.kit.refer`, `cmi.kit.referred` | Unlock the referrer's and referred player's respective kits. |
| PassportDiscovery | `cmi.kit.stamps<type>` for world, warp, visit, biome, block, item, consume, tool, weapon, armor, kill, mount, explore | Unlock the purchased Stamp Box kit. |
| EventHunts/CoconutHunt | `onembcmi.mobhat.mob.rabbit`, `.armadillo`, `.frog`, `.turtle`; legacy profiles also `.bat`, `.phantom` | Unlock point-shop cosmetic hats. |
| Upgrade | Parent add/remove across default → 1mb_player → 1mb_member → 1mb_boosted → 1mb_builder → 1mb_rogue; optional configured cosmetic node | Apply an eligible rank promotion and optional cosmetic reward. |
| Exchange | `onembcmi.exchange.kit.%id%` (example id `example_vote_tokens`) | Disabled example trade's kit unlock. |
| VoteTokens | `jobs.max.6`, `jobs.max.12` (already UUID) | Purchased Jobs slot upgrades. |
| Doors (EventHunts) | Eleven configured `cmi.kit.tot_2026_<reward>` milestones (already `<uuid>`) | Milestone kit unlocks. |

## Compatibility and recovery

New templates use UUIDs. Older configured LuckPerms user commands remain compatible: only the user operand is rewritten after resolving the trusted recipient; permission nodes, group IDs, contexts and other command arguments retain their values. All registered aliases in installed LuckPerms 5.5.81 are recognized (`luckperms`, `lp`, `perm`, `perms`, `permission`, `permissions`), including the `luckperms:` namespace, console/player action envelopes, and clone's second user operand.

`DurableOperationService.begin` normalizes the complete command batch before callers reserve claims, deduct currency or consume items. It uses the primary player's real UUID and captured secondary name/UUID pairs; a new multi-player hook may resolve additional exact real names through the local cache, then persists UUIDs. On retry, only undelivered commands are migrated, using the identities saved with that transaction. The migrated commands are saved before dispatch. An unknown or conflicting recipient blocks the remaining batch; delivered prefixes are never replayed. Existing uncertainty/force-confirm recovery rules remain in place. Command acceptance remains acceptance, not independent proof of permission delivery.

Immediate configurable hooks use `UuidCommandDispatcher`. Local lookup uses exact real names from online Paper players, Paper's offline cache and CMI's cached users. It preserves the Bedrock dot prefix and rejects conflicting matches and nicknames. It does not query Mojang or create offline UUIDs. Normal reward paths already have a Player or receipt UUID and need no name lookup.

CMI database inspection verified the local read-only schema: `servers/Paper-26.2/plugins/CMI/cmi.sqlite.db`, table `users`, columns `player_uuid` and `username`. Direct database fallback was unnecessary because these paths have a known UUID or CMI's local cache; no synchronous SQL or remote identity lookup was introduced. Known-recipient `%cmi_user_uuid%` and `%cmi_user_uuid_<name>%` LuckPerms targets can be resolved by the shared helper without invoking PlaceholderAPI for identity. Missing identities fail closed.

Doors has its own persisted reward store. New regular/special command templates normalize before storage. Its old default milestones already stored UUIDs. A custom old Doors receipt containing an unprovable name is blocked for staff review rather than resolving that name to a possibly different current account.

## Module-by-module result

| Module | Result |
| --- | --- |
| [`libs:1mb-cmiapi-lib`](../libs/1mb-cmiapi-lib) | Shared UUID preparation, immediate dispatch guard, durable preflight and legacy retry pinning. No built-in user grant. |
| [`plugins:player-fun:afkshrine`](../plugins/player-fun/afkshrine) | No built-in LuckPerms user grant. Configurable command hooks guarded; shared journal pins reward recipients. |
| [`plugins:player-fun:recordingmode`](../plugins/player-fun/recordingmode) | Map visibility commands use validated map-plugin roots; no LuckPerms user operations. |
| [`plugins:player-fun:passportdiscovery`](../plugins/player-fun/passportdiscovery) | Changed `cmi.kit.stamps<type>` Stamp Box grants, including disabled boxes. |
| [`plugins:player-fun:sellstreaks`](../plugins/player-fun/sellstreaks) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:scheduledtips`](../plugins/player-fun/scheduledtips) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:visit`](../plugins/player-fun/visit) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:socialgatherings`](../plugins/player-fun/socialgatherings) | No built-in LuckPerms user grant. Configurable command hooks guarded; shared journal pins reward recipients. |
| [`plugins:player-fun:journeymap`](../plugins/player-fun/journeymap) | No built-in LuckPerms user grant. Configurable reward delivery protected by the shared journal. |
| [`plugins:player-fun:kitstreaks`](../plugins/player-fun/kitstreaks) | No built-in LuckPerms user grant. Configurable reward delivery protected by the shared journal. |
| [`plugins:player-fun:nick`](../plugins/player-fun/nick) | No built-in LuckPerms user grant. Configurable command hooks guarded; shared journal pins reward recipients. |
| [`plugins:player-fun:emotemenu`](../plugins/player-fun/emotemenu) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:pvptoggle`](../plugins/player-fun/pvptoggle) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:boosters`](../plugins/player-fun/boosters) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:namemc`](../plugins/player-fun/namemc) | Changed `onembnamemc.verified` verification marker to UUID. |
| [`plugins:player-fun:exchange`](../plugins/player-fun/exchange) | Changed disabled Vote Token example: `onembcmi.exchange.kit.%id%`. Guarded preparation and immediate hooks. |
| [`plugins:player-fun:votetokens`](../plugins/player-fun/votetokens) | Jobs upgrades already use UUID (`jobs.max.6`, `jobs.max.12`). Shared journal and configurable action dispatcher now guard user targets. |
| [`plugins:player-fun:discordchat`](../plugins/player-fun/discordchat) | Excluded: separately owned active task; no DiscordChat source or config edits in this change. |
| [`plugins:player-fun:gametypes`](../plugins/player-fun/gametypes) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:birthdaylanterns`](../plugins/player-fun/birthdaylanterns) | No built-in LuckPerms user grant. Configurable reward delivery protected by the shared journal. |
| [`plugins:player-fun:lavaboots`](../plugins/player-fun/lavaboots) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:spawners`](../plugins/player-fun/spawners) | LuckPerms reads use UUID. Exported `lp group` tier setup stays group-based; configurable GUI hooks guarded. |
| [`plugins:player-fun:collect`](../plugins/player-fun/collect) | `lp user` appears only in an allowlist, no bundled user grant. Shared journal and immediate configured hooks guarded. |
| [`plugins:player-fun:coconuthunt`](../plugins/player-fun/coconuthunt) | Changed rabbit/armadillo/frog/turtle mob-hat offers and legacy bat/phantom profiles. Doors milestone defaults already used UUID; custom templates now normalize before persistence. |
| [`plugins:player-fun:dropparty`](../plugins/player-fun/dropparty) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:appreciation`](../plugins/player-fun/appreciation) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:forage`](../plugins/player-fun/forage) | No built-in LuckPerms user grant. Configurable command hooks guarded; shared journal pins reward recipients. |
| [`plugins:player-fun:autosell`](../plugins/player-fun/autosell) | No built-in LuckPerms user grant. Configurable reward delivery protected by the shared journal. |
| [`plugins:player-fun:mobhat`](../plugins/player-fun/mobhat) | Checks hat permissions and routes internal MobHat commands; does not grant them. |
| [`plugins:player-fun:todo`](../plugins/player-fun/todo) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:refer`](../plugins/player-fun/refer) | Changed `cmi.kit.refer` / `cmi.kit.referred` grants; persist both recipients. |
| [`plugins:player-fun:tpauto`](../plugins/player-fun/tpauto) | Validated CMI teleport-accept command only; no LuckPerms user operations. |
| [`plugins:player-fun:menu`](../plugins/player-fun/menu) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:player-fun:wiki`](../plugins/player-fun/wiki) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:staff:staffcenter`](../plugins/staff/staffcenter) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:staff:contentguard`](../plugins/staff/contentguard) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:staff:warninglens`](../plugins/staff/warninglens) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:staff:teammsg`](../plugins/staff/teammsg) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:staff:profile`](../plugins/staff/profile) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:consolenoiserouter`](../plugins/server-management/consolenoiserouter) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:cmdcostdashboard`](../plugins/server-management/cmdcostdashboard) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:cmiconfig`](../plugins/server-management/cmiconfig) | No built-in LuckPerms user grant. Configurable command hooks guarded. |
| [`plugins:server-management:economyguardian`](../plugins/server-management/economyguardian) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:startupdoctor`](../plugins/server-management/startupdoctor) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:updatesmoke`](../plugins/server-management/updatesmoke) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:pluginversions`](../plugins/server-management/pluginversions) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:endcrystals`](../plugins/server-management/endcrystals) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:antifire`](../plugins/server-management/antifire) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:potions`](../plugins/server-management/potions) | No built-in LuckPerms user grant. Configurable reward delivery protected by the shared journal. |
| [`plugins:server-management:schedulercheck`](../plugins/server-management/schedulercheck) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:upgrade`](../plugins/server-management/upgrade) | Changed managed-rank parent add/remove and optional cosmetic permission commands. |
| [`plugins:server-management:warpaudit`](../plugins/server-management/warpaudit) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:worthdrift`](../plugins/server-management/worthdrift) | Only dispatches a fixed ShopGUI+ reload; no LuckPerms user operations. |
| [`plugins:server-management:worthhelper`](../plugins/server-management/worthhelper) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:worldsnapshot`](../plugins/server-management/worldsnapshot) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:server-management:sparkreviewer`](../plugins/server-management/sparkreviewer) | Only dispatches fixed Spark diagnostics; no LuckPerms user operations. |
| [`plugins:server-management:hoppers`](../plugins/server-management/hoppers) | Only dispatches fixed Spark diagnostics; no LuckPerms user operations. |
| [`plugins:server-management:diagnostics`](../plugins/server-management/diagnostics) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:generic:eventrecorder`](../plugins/generic/eventrecorder) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:generic:cmiprobe`](../plugins/generic/cmiprobe) | Read-only CMI API probes, no LuckPerms user operations. |
| [`plugins:generic:cmidatabase`](../plugins/generic/cmidatabase) | CMI database inspection, no LuckPerms user operations. |
| [`plugins:generic:permissionprobe`](../plugins/generic/permissionprobe) | Read-only LuckPerms inspection, cached user lookup by UUID. No grants or command dispatch. |
| [`plugins:generic:placeholders`](../plugins/generic/placeholders) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:generic:bedrockchatbridge`](../plugins/generic/bedrockchatbridge) | No LuckPerms user grant or configurable LuckPerms dispatch found; no code change needed. |
| [`plugins:player-fun:warppassport`](../plugins/player-fun/warppassport) | Excluded from the current build; retained source reviewed. No LuckPerms user grant or command dispatch. |
| [`plugins:player-fun:messagefont`](../plugins/player-fun/messagefont) | Retired and excluded from the current build; retained source reviewed. No LuckPerms user grant or command dispatch. |

## Maintained configuration

Seven local configuration files were migrated while Paper was confirmed stopped: NameMC, Refer, PassportDiscovery, Upgrade, both CoconutHunt reward profiles, and the disabled Exchange example. This changed 37 command entries plus their generated default comments. Enabled flags and reward costs/conditions were preserved. Backups and before/after checksums are in `.scratch/luckperms-uuid/config-backups/` and `.scratch/luckperms-uuid/config-migration.json`. DiscordChat configuration and third-party LuckPerms settings were not edited. Other installations are protected by runtime normalization of their existing templates; these local config files are not deployable artifacts.

## Validation

The initial EventHunts regression reproduced `.Bedrock_Test` being rendered as the LuckPerms target and then passed after the fix. Focused tests cover registered aliases, canonical/compact UUIDs, CMI placeholder targets, preserving non-LuckPerms arguments, two referral recipients, clone targets, missing/conflicting identities, pre-reservation rejection, persistence/restart, renamed-account retries and delivered-prefix preservation. Exchange exercises its actual action preparer and disabled bundled reward. Doors exercises legacy player placeholders.

`scripts/build-all.sh` completed the canonical clean build **641** against Java 25 / Paper 26.2 stable build 121 and synchronized all **64 JARs** while Paper was stopped. Across the included module test reports: **1,467 tests, 1,466 passed, zero failures/errors, one skipped**. The skip is the existing ShopGUI+ local-fixture test in WorthDrift because its external shop fixture is absent. Every installed JAR hash matches its module build output and every `plugin.yml` declares build 641; verification details are saved in `.scratch/luckperms-uuid/build641-verification.json`.

No real Bedrock client login or actual reward redemption was performed by this task. Automated tests exercise Java and `.bedrock` identities, command preparation and durable delivery boundaries. Subsequent coordinated testing of the installed build also passed clean Paper startup, reloads and clean shutdown on Paper 26.2-121. The other task removed its disposable fixture and left Paper stopped; its 34 item/metadata checks are recorded in `archive/discordchat/public-beta-2-tool-transfers-2026-09-09/verification.md` and do not constitute a real Bedrock reward test. The 19 build-workflow tests also passed, giving 1,486 cases across the module and build-workflow reports (1,485 passed, one skipped).

References: [Paper 26.2 API](https://jd.papermc.io/paper/26.2/org/bukkit/Bukkit.html#getOfflinePlayerIfCached(java.lang.String)), [Paper scheduling](https://docs.papermc.io/paper/dev/scheduler/), [CMI placeholders](https://www.zrips.net/cmi/placeholders/). Local target verified as Java 25 / Paper 26.2 stable build 121, CMI 9.8.9.10, LuckPerms 5.5.81.
