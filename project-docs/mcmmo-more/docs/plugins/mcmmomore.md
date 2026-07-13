# 1MB mcMMO More

`1MB-mcMMO-More` is a companion Paper plugin that adds 1MB-owned custom skills without modifying mcMMO.

It remains a standalone jar. When `1MB-CMIAPI-Lib` is installed, mcMMO More can optionally register itself with that shared library so other 1MB diagnostics can see this feature.

Canonical public docs URL:

`https://docs.1moreblock.com/custom-server-plugins/mcmmo-more/`

## mcMMO Relationship

The plugin appends custom skills alongside mcMMO, but it does not register them as native mcMMO skills.

- `/mcstats` does not show mcMMO More skills. Use `/mcmmore stats`.
- `/mctop` does not show mcMMO More skills. Use `/mcmmore top` or `/mcmmore top <skill>`.
- Native mcMMO power level does not include mcMMO More levels.
- The mcMMO More equivalent is the custom power shown by `/mcmmore stats` and `%onembmcmmore_power_level%`.
- `%onembmcmmore_combined_power_level%` is available for display-only scoreboard totals. It reads native mcMMO power through mcMMO's API and adds mcMMO More custom power without writing to mcMMO data.

## Commands

- `/mcmmore stats [player]`: show custom skill stats. Inspecting another player requires admin permission and supports online players, saved plugin playerdata, and cached offline players.
- `/mcmmore skills`: list configured custom skills.
- `/mcmmore skills convert [skill] [target]`: self-convert eligible More skill levels into native mcMMO levels when conversion is enabled.
- `/mcmmore convert <skill> [target]`: shorter alias for the conversion flow.
- `/mcmmore help [skill]`: show command help or explain one configured skill, including description, activation, and perk tiers.
- `/mcmmore activate <skill>`: activate the best unlocked perk tier for one skill.
- `/mcmmore top`: show compact top lists for every configured custom skill.
- `/mcmmore top <skill>`: show a detailed leaderboard for one custom skill.
- `/mcmmore info`: show plugin info, version/build, starter commands, integration mode, and the canonical docs URL.
- `/mcmmore reload`: admin reload of config and skill definitions.
- `/mcmmore reset <player> [skill]`: admin test reset for an online player.
- `/mcmmore debug [page]`: admin diagnostics for status, build/runtime versions, commands, permissions, placeholders, config, health, player inspect, and skill inspect.
- `/mcmmore debug skills <add|set|remove> <online-player> <skill> <levels>`: admin test command for mutating custom skill levels.
- `/mcmmore debug reload <all|config|conversion|locale>`: admin runtime reload surface.
- `/mcmmore debug set <config> <key> <value>`: admin guarded scalar/list edit for `config.yml`, `conversion.yml`, `anti-exploit.yml`, `effects.yml`, or `Translations/Locale_EN.yml`.

Help and tab suggestions should remain permission-aware.

Help output uses one prefixed header, then unprefixed command rows. Safe complete commands are clickable and run directly; placeholder commands remain hover-only until the sender replaces the arguments.

mcMMO registers `/mcmmoreloadlocale` with alias `/mcreloadlocale`. This plugin hides those labels from non-admin command suggestions when `commands.hide-mcmmo-reload-locale-suggestions: true`, while leaving the real mcMMO command available to senders with `mcmmo.commands.reloadlocale` or `onembmcmmore.admin`.

This plugin registers only `/mcmmore` and `/mmomore`. It does not register standalone commands such as `/mcmmoreloadlocale`.

Debug pages:

- `status`
- `commands`
- `permissions`
- `placeholders`
- `inspect <player>`
- `skill <skill>`
- `skills <add|set|remove> <online-player> <skill> <levels>`
- `config`
- `health`
- `reload <all|config|conversion|locale>`
- `set <config> <key> <value>`

`/mcmmore debug status` includes plugin version/build, Java build target, runtime Java version, Paper target, server engine/version, compile-time API dependency versions, detected dependency plugin versions, and the optional 1MB CMIAPI bridge state.

Guarded list editing uses explicit operations:

```text
/mcmmore debug set locale prefix.hover-lines list:add &7Extra hover line
/mcmmore debug set effects milestones.skills.exploration.templates list:remove sparkle
/mcmmore debug set config skills.exploration.description list:clear
/mcmmore debug set conversion enabled true
```

Only known scalar/list keys are editable through this command.

`/mcmmore debug skills` is intentionally online-player-only for live testing. `add` and upward `set` operations trigger the normal level-up/perk unlock feedback and milestone effects. The command resets current XP to `0` and normalizes total XP to the formula minimum for the resulting level.

## Permissions

- `onembmcmmore.command.use`: view own custom skill stats and plugin info.
- `onembmcmmore.command.top`: view custom skill leaderboards.
- `onembmcmmore.command.convert`: use conversion commands when conversion is enabled.
- `onembmcmmore.admin`: reload, reset, and inspect other players.
- `onembmcmmore.skills.<skill>`: earn a specific configured parent skill when that skill is enabled.
- `onembmcmmore.convert.<more-skill>`: open conversion offers for one More skill.
- `onembmcmmore.convert.<more-skill>.<mcmmo-skill>`: convert one More skill into one native mcMMO target.

Normal help output should not show permission node names.

Skill permissions are required for XP even when a command permission is present. Disabled skills never grant XP. If a player already has `onembmcmmore.skills.airborne` while `skills.airborne.enabled: false`, that player starts earning Airborne XP only after the skill is enabled.

LuckPerms example:

```text
lp group default permission set onembmcmmore.skills.exploration true
lp group default permission set onembmcmmore.convert.exploration true
lp group default permission set onembmcmmore.convert.exploration.mining true
```

## Current Skills

Enabled parent skills by default:

- Exploration: walking, running, sneaking, jumping, and mounted-travel sources. Mounted travel counts real ridable mounts only, not boats or minecarts.
- Aquatics: swimming and diving sources.

Configured but disabled by default:

- Airborne: elytra, riptide, levitation, wind-charge, and falling sources. Disabled while tuning.
- Defense: shield blocks, hostile damage survived, hostile projectiles survived, and optional PvP damage survived. Disabled while tuning.
- Arcane: enchanting table, anvil combine, Dragon Breath collection, and disabled grindstone reclaim sources. Disabled while economy and loop controls are tested.
- Husbandry: successful breeding and disabled care-feeding sources. Disabled while farm-density and cooldown controls are tested.
- Action: reserved for future wrecking/impact-style sources.

## Perks

Skill perks are configured under each parent skill in `config.yml` and are controlled by `perks.enabled`.

Default tiers:

- Exploration: `250` Speed II for 6 seconds; `500` Speed III plus lunge for 9 seconds; `1000` Speed V plus stronger lunge for 12 seconds.
- Aquatics: `250` Dolphin's Grace and Water Breathing; `500` stronger Dolphin's Grace; `1000` adds Conduit Power.
- Airborne: `250` Slow Falling; `500` Slow Falling and Speed II; `1000` adds Speed III and lunge.
- Defense: `250` Resistance I and Absorption I; `500` Resistance II and Absorption II; `1000` adds stronger Absorption and Regeneration.
- Arcane: `250` Luck I; `500` Luck II and Night Vision; `1000` adds stronger Luck and Glowing. Dragon Breath collection can feed this parent skill when Arcane is enabled.
- Husbandry: `250` Regeneration I; `500` Regeneration I and Luck I; `1000` stronger Regeneration and Luck.

Activation is intentionally simple for now:

```text
/mcmmore activate <skill>
```

Tab completion suggests enabled skills that the sender has unlocked by permission and that have perks configured, even before the first perk tier is reachable.

The command requires the normal command permission, the skill-specific `onembmcmmore.skills.<skill>` permission, the skill to be enabled, and the player's level to meet at least one configured perk tier.

## Conversion

Rules live in:

`plugins/1MB-mcMMO-More/conversion.yml`

Conversion is disabled by default. When enabled, players can trade eligible mcMMO More levels for real native mcMMO levels without patching mcMMO or registering new native skills.

Runtime rules:

- one-way online self-conversion only
- ledger spending keeps visible More levels intact but prevents double-spending
- default ratio is `10` More levels for `1` native mcMMO level
- default minimum spend is `250` More levels
- default maximum grant is `25` native mcMMO levels per transaction
- quotes respect native mcMMO target caps when `require-target-cap-room: true`
- confirmations use expiring tokens and exact quote matching
- conversion history is stored under `conversions.<skill>` in this plugin's playerdata

Default target mapping:

- Exploration: Excavation, Mining
- Aquatics: Fishing, Tridents
- Airborne: Acrobatics, Tridents
- Defense: Acrobatics, Repair
- Arcane: Alchemy, Repair, Salvage disabled
- Husbandry: Taming, Herbalism
- Action and Presence: disabled with no targets

## Eligibility

Custom skill XP and perk activation require:

- `tracking.required-game-mode: SURVIVAL`
- player is alive, online, not flying, and not inside a non-mount vehicle
- player is not vanished through CMI when `tracking.block-vanished: true`
- player is not in Bukkit/CMI god mode when `tracking.allow-god-mode: false`

`tracking.allow-god-mode` is currently true for test-server survival + god-mode testing. Turn it off before live release.

CMI god/vanish state prefers the shared `1MB-CMIAPI-Lib` player-state helper when that bridge is available. If the lib is missing or too old, mcMMO More falls back to local reflection against CMI when `tracking.use-cmi-player-state: true`, so this plugin still has no compile dependency on CMI. Generic Bukkit vanish metadata is not checked; vanish support is intentionally CMI-backed for this server.

## Visuals

Each parent skill has a configurable Unicode `icon` in `config.yml`. Internal ids remain plain keys such as `exploration`, but player-facing messages use the icon plus display name.

Player-facing text lives in:

```text
plugins/1MB-mcMMO-More/Translations/Locale_EN.yml
```

The prefix supports:

- `prefix.text`
- `prefix.hover-title`
- `prefix.hover-lines`
- `prefix.click-command`

The default prefix click command is `/mcmmore info`.

Prefix hover/click events apply only to the prefix text. The trailing separator and message body remain independent so future command rows, stats lines, or notices can define their own hover/click behavior.

## Milestone Effects

Cosmetic milestone effects are configured in:

`plugins/1MB-mcMMO-More/effects.yml`

The default setup plays one player-local particle/sound template when a level-up crosses every 25 levels. `milestones.randomize-templates: true` picks one template from the skill's configured list; setting it false plays every listed template.

Current default templates:

- `confetti`
- `sparkle`
- `airburst`
- `guard`
- `arcane`
- `pasture`
- `aquatic`
- `quiet`

These effects do not affect XP, perks, permissions, mcMMO data, or anti-exploit checks.

## Anti-Exploit

Rules live in:

`plugins/1MB-mcMMO-More/anti-exploit.yml`

`config.yml`, `conversion.yml`, `anti-exploit.yml`, `effects.yml`, and `Translations/Locale_EN.yml` are checked against bundled defaults on startup and runtime reload. Missing keys and missing default comments are added without overwriting existing server values.

Current checks:

- per-skill and per-source `enabled` switch for anti-exploit checks.
- `count-when-standing-still`, default false.
- `min-distance-per-sample` to block tiny jitter and stationary key presses.
- `max-distance-per-sample` to block teleport, lag, and knockback-sized jumps.
- `minimum-water-blocks-nearby` plus `water-scan-radius` for swimming.
- `require-y-change`, `min-y-change-per-sample`, and `max-same-y-samples` for quiet vertical-pattern checks.
- `cooldown-millis`, `max-same-region-samples`, `recent-path-window`, and `min-unique-path-cells` for movement loop tuning.
- Defense sources use event-specific checks such as `min-damage`, `xp-per-damage`, `max-xp-per-event`, `cooldown-millis`, `attacker-cooldown-millis`, `allow-pvp`, `require-hostile-attacker`, `require-survive`, `max-nearby-same-type`, and `max-source-distance`.
- Arcane sources use event-specific checks such as `min-cost`, `max-cost`, `min-enchantments`, `xp-per-cost-level`, `xp-per-enchantment`, `xp-per-enchantment-level`, `max-xp-per-event`, `cooldown-millis`, `signature-cooldown-millis`, `require-second-input`, `ignore-rename-only`, `require-enchanted-input`, `require-nearby-area-effect-cloud`, and `nearby-radius`.
- Husbandry sources use event-specific checks such as `species-cooldown-millis`, `chunk-cooldown-millis`, `max-nearby-same-type`, `max-animals-in-chunk`, `require-adult-parents`, and `require-player-breeder`.

Source states are classified into one parent skill per sample/event. Running, sneaking, jumping, and mounted travel feed Exploration with multipliers instead of becoming separate public skills. Swimming and diving feed Aquatics. Elytra, riptide, levitation, wind-charge airborne movement, and falling can feed Airborne when that parent skill is enabled. Shield blocks and hostile hits survived can feed Defense when that parent skill is enabled. Enchanting table, anvil, grindstone transactions, and Dragon Breath bottle captures can feed Arcane when that parent skill is enabled. Successful breeding and optional care-feeding can feed Husbandry when that parent skill is enabled.

## Integrations

mcMMO:

- `softdepend: [mcMMO]`
- startup info reports whether mcMMO is present and enabled.
- custom skills are stored separately from mcMMO because mcMMO does not expose a supported API for registering brand-new primary skills.
- conversion uses mcMMO's public ExperienceAPI reflectively to validate native targets, read current levels/caps, and grant native levels after confirmation.

CMI, CMILib, CMI-API, PlaceholderAPI, LuckPerms, Vault, DiscordSRV:

- `CMI`, `CMILib`, and `1MB-CMIAPI-Lib` are softdepends for startup ordering and optional shared 1MB diagnostics.
- CMI player state is read through the shared `1MB-CMIAPI-Lib` helper when available, otherwise local reflection checks CMI god/timed-god and vanish state; no CMI classes are linked at compile time.
- Vanish blocking follows CMI vanish only, matching `/cmi vanish`.
- `1MB-CMIAPI-Lib` is queried reflectively and, when installed, receives a feature registration for `mcmmomore` with display name `mcMMO More`.
- The 1MB CMIAPI bridge is controlled by `integrations.cmiapi-lib.enabled`. Disabling it leaves mcMMO More fully standalone.
- PlaceholderAPI is optional and registers the `onembmcmmore` expansion when installed.
- LuckPerms, Vault, DiscordSRV, and CMILib are not otherwise called by the current code.
- document any future integration here before or alongside implementation.

## Data

Player custom skill data is stored under:

`plugins/1MB-mcMMO-More/playerdata/<uuid>.yml`

Each parent skill stores its own level/current XP/total XP plus optional source total XP, such as Exploration running or Aquatics diving. Source totals are for display and scoreboard breakdowns; parent skill totals remain the leveling source of truth. Conversion ledger data is stored under `conversions.<skill>.spent-levels` with a capped history list.

The plugin does not write into mcMMO player data.

## Placeholders

PlaceholderAPI identifier: `onembmcmmore`

- `%onembmcmmore_enabled%`
- `%onembmcmmore_mcmmo_present%`
- `%onembmcmmore_mcmmo_enabled%`
- `%onembmcmmore_cmiapi_bridge_available%`
- `%onembmcmmore_cmiapi_bridge_registered%`
- `%onembmcmmore_cmiapi_bridge_status%`
- `%onembmcmmore_skill_count%`
- `%onembmcmmore_mcmmo_power_level%`
- `%onembmcmmore_power_level%`
- `%onembmcmmore_combined_power_level%`
- `%onembmcmmore_level_<skill>%`
- `%onembmcmmore_xp_<skill>%`
- `%onembmcmmore_xp_needed_<skill>%`
- `%onembmcmmore_xp_remaining_<skill>%`
- `%onembmcmmore_total_xp_<skill>%`
- `%onembmcmmore_source_xp_<skill>_<source>%`
- `%onembmcmmore_source_total_xp_<skill>_<source>%`
- `%onembmcmmore_source_percent_<skill>_<source>%`
- `%onembmcmmore_skill_enabled_<skill>%`
- `%onembmcmmore_skill_icon_<skill>%`
- `%onembmcmmore_skill_display_<skill>%`
- `%onembmcmmore_skill_visual_<skill>%`
- `%onembmcmmore_skill_permission_<skill>%`
- `%onembmcmmore_skill_unlocked_<skill>%`
- `%onembmcmmore_perk_level_<skill>%`
- `%onembmcmmore_perk_next_level_<skill>%`
- `%onembmcmmore_perk_cooldown_<skill>%`
- `%onembmcmmore_top_name_<skill>_<rank>%`
- `%onembmcmmore_top_level_<skill>_<rank>%`
- `%onembmcmmore_top_total_xp_<skill>_<rank>%`

Top placeholders accept ranks `1` through `100`.

Source placeholders use parent skill ids and configured source ids. Examples: `%onembmcmmore_source_xp_exploration_running%`, `%onembmcmmore_source_percent_exploration_mounted_travel%`, `%onembmcmmore_source_xp_aquatics_diving%`, and `%onembmcmmore_source_xp_arcane_dragon_breath%`.
