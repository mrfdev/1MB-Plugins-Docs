# 1MB mcMMO More

Companion Paper plugin for experimenting with 1MB-owned grindable skills alongside mcMMO, without modifying the upstream mcMMO jar.

## Current MVP

- command: `/mcmmore`
- custom skill data stored under this plugin's own `playerdata/`
- anti-exploit rules stored under `anti-exploit.yml`
- milestone cosmetic effects stored under `effects.yml`
- optional More-levels to native mcMMO-levels conversion rules stored under `conversion.yml`
- player-facing text stored under `Translations/Locale_EN.yml`
- missing YAML defaults/comments are restored safely on startup and runtime reload
- perk tiers at levels 250, 500, and 1000
- enabled by default: Exploration, Aquatics
- disabled examples: Airborne, Defense, Arcane, Husbandry, Action
- softdepend on `mcMMO`, `CMI`, `CMILib`, `1MB-CMIAPI-Lib`, and `PlaceholderAPI`
- optional `1MB-CMIAPI-Lib` bridge registration when the shared lib is installed
- PlaceholderAPI identifier: `onembmcmmore`

## Documentation

Canonical docs URL: https://docs.1moreblock.com/custom-server-plugins/mcmmo-more/

Project-local docs:

- [docs/player-guide.md](docs/player-guide.md) for player-facing instructions.
- [docs/commands.md](docs/commands.md) for command surfaces.
- [docs/permissions.md](docs/permissions.md) for permission nodes and defaults.
- [docs/placeholders.md](docs/placeholders.md) for PlaceholderAPI keys.
- [docs/configuration.md](docs/configuration.md) for config files and reload behavior.
- [docs/installation.md](docs/installation.md) for installation and update steps.
- [docs/integrations.md](docs/integrations.md) for mcMMO, CMI, CMIAPI, PlaceholderAPI, and permissions context.
- [docs/troubleshooting.md](docs/troubleshooting.md) for common checks.
- [docs/plugin-docs.yml](docs/plugin-docs.yml) for the central docs importer manifest.

## Local Truth

Read these before changing the project:

- [docs/plugins/README.md](docs/plugins/README.md) for module/plugin rules.
- [docs/plugins/mcmmomore.md](docs/plugins/mcmmomore.md) for the current plugin behavior.
- [docs/release.md](docs/release.md) for build, sync, and release rules.
- [docs/todo.md](docs/todo.md) for deferred work.
- [docs/mcmmo-addon-research.md](docs/mcmmo-addon-research.md) for mcMMO API findings and patching tradeoffs.
- [docs/mcmmo-conversion-design.md](docs/mcmmo-conversion-design.md) for the default-disabled More-levels to native mcMMO-levels converter.

## Build Target

- Java target: 25
- Paper runtime target: 26.1.2+
- Test server: `servers/Paper-26.1.2/`
- Built jars are copied to `libs/` and synced to `servers/Paper-26.1.2/plugins/`.

## Relationship To mcMMO

`1MB-mcMMO-More` appends new 1MB-owned skills next to mcMMO. It does not patch mcMMO, does not register new native mcMMO skills, and does not write into mcMMO player data. This keeps mcMMO upgrades simple: replace `mcMMO.jar`, restart, and this add-on keeps its own data separately.

The tradeoff is that native mcMMO commands and calculations do not automatically include mcMMO More skills.

| Question | Answer |
| --- | --- |
| Does `/mcstats` show Exploration, Aquatics, Airborne, Defense, Arcane, Husbandry, or Action from this add-on? | No. Use `/mcmmore stats` for your own mcMMO More stats, or `/mcmmore stats <player>` as an admin for known online/offline players. |
| Does `/mctop` show mcMMO More skills? | No. Use `/mcmmore top` for all mcMMO More skills, or `/mcmmore top <skill>` for one skill. |
| Does mcMMO's power level include mcMMO More skills? | No. mcMMO's power level remains only mcMMO's native skills. |
| What is the mcMMO More equivalent of power level? | `/mcmmore stats` shows mcMMO More power, which is the sum of configured custom skill levels. Placeholder: `%onembmcmmore_power_level%`. |
| Is there a combined mcMMO plus mcMMO More power total? | Yes, for display only. `%onembmcmmore_combined_power_level%` adds native mcMMO power from mcMMO's API to mcMMO More custom power. It does not change `/mcstats`, `/mctop`, or mcMMO player data. |

## Commands

- `/mcmmore` or `/mcmmore stats`: show your custom skill stats.
- `/mcmmore stats <player>`: show another known player's custom skill stats, online or offline. Requires admin permission.
- `/mcmmore skills`: list configured custom skills.
- `/mcmmore skills convert`: list More skills that can be converted into native mcMMO levels when conversion is enabled.
- `/mcmmore skills convert <skill>`: show native mcMMO target skills for one More skill.
- `/mcmmore skills convert <skill> <mcmmo-skill>`: quote a conversion and show a short-lived clickable confirmation.
- `/mcmmore skills convert <skill> <mcmmo-skill> confirm <token>`: confirm an exact quoted conversion.
- `/mcmmore convert <skill> [mcmmo-skill]`: shorter alias for the conversion flow.
- `/mcmmore help [skill]`: show permission-aware help, or explain one skill and its perk tiers.
- `/mcmmore activate <skill>`: activate the best unlocked perk tier for a skill.
- `/mcmmore top`: show compact top lists for every configured skill.
- `/mcmmore top <skill>`: show the detailed top list for one skill.
- `/mcmmore info`: show plugin info, version/build, starter commands, integration mode, and the docs URL.
- `/mcmmore reload`: save profiles, reload config, and restart tracking tasks.
- `/mcmmore reset <player> [skill]`: reset all custom skill data or one skill for an online player.
- `/mcmmore debug [page]`: show admin diagnostics for status, build/runtime versions, commands, permissions, placeholders, config, health, players, and skills.
- `/mcmmore debug skills <add|set|remove> <online-player> <skill> <levels>`: mutate a player's custom skill level for live testing.
- `/mcmmore debug reload <all|config|conversion|locale>`: reload runtime state without using standalone reload-style commands.
- `/mcmmore debug set <config> <key> <value>`: set a guarded scalar or list value in `config.yml`, `conversion.yml`, `anti-exploit.yml`, `effects.yml`, or `Translations/Locale_EN.yml`, then reload runtime config.

The help output uses the prefix once as a header. Safe complete commands such as `/mcmmore stats`, `/mcmmore skills`, `/mcmmore help`, `/mcmmore info`, `/mcmmore top`, and `/mcmmore debug` are clickable in chat.

mcMMO itself registers `/mcmmoreloadlocale` and `/mcreloadlocale`. To avoid confusing those with `/mcmmore`, this plugin hides those mcMMO locale reload commands from non-admin tab suggestions by default with `commands.hide-mcmmo-reload-locale-suggestions: true`.

## Command Examples

- `/mcmmore stats`
- `/mcmmore stats Steve`
- `/mcmmore skills`
- `/mcmmore skills convert`
- `/mcmmore skills convert exploration`
- `/mcmmore skills convert exploration mining`
- `/mcmmore help exploration`
- `/mcmmore activate exploration`
- `/mcmmore top`
- `/mcmmore top exploration`
- `/mcmmore top arcane`
- `/mcmmore top husbandry`
- `/mcmmore top aquatics`
- `/mcmmore info`
- `/mcmmore reload`
- `/mcmmore reset Steve exploration`
- `/mcmmore debug status`
- `/mcmmore debug reload all`
- `/mcmmore debug reload conversion`
- `/mcmmore debug reload locale`
- `/mcmmore debug inspect Steve`
- `/mcmmore debug skill exploration`
- `/mcmmore debug skills add Steve exploration 250`
- `/mcmmore debug skills set Steve arcane 500`
- `/mcmmore debug skills remove Steve exploration 25`
- `/mcmmore debug set anti-exploit skills.aquatics.sources.swimming.minimum-water-blocks-nearby 3`
- `/mcmmore debug set conversion enabled true`
- `/mcmmore debug set conversion skills.exploration.targets.mining.more-levels-per-mcmmo-level 10`
- `/mcmmore debug set effects milestones.every-levels 25`
- `/mcmmore debug set locale prefix.hover-lines list:add &7Fresh translated hover line`
- `/mcmmore debug set effects milestones.skills.exploration.templates list:remove sparkle`

## Permissions

- `onembmcmmore.command.use`: allows `/mcmmore`, `/mcmmore stats`, `/mcmmore skills`, and `/mcmmore info`. Default: true.
- `onembmcmmore.command.top`: allows `/mcmmore top`. Default: true.
- `onembmcmmore.command.convert`: allows using conversion commands when `conversion.yml` has conversion enabled. Default: true.
- `onembmcmmore.admin`: allows reload, reset, and inspecting other players. Default: op.
- `onembmcmmore.skills.exploration`: allows earning Exploration XP when enabled. Default: false.
- `onembmcmmore.skills.aquatics`: allows earning Aquatics XP when enabled. Default: false.
- `onembmcmmore.skills.airborne`: allows earning Airborne XP when enabled. Default: false.
- `onembmcmmore.skills.defense`: allows earning Defense XP when enabled. Default: false.
- `onembmcmmore.skills.arcane`: allows earning Arcane XP when enabled. Default: false.
- `onembmcmmore.skills.husbandry`: allows earning Husbandry XP when enabled. Default: false.
- `onembmcmmore.skills.action`: allows earning Action XP when enabled. Default: false.

Conversion also requires path permissions unless the sender has `onembmcmmore.admin`:

- `onembmcmmore.convert.<more-skill>`: allows opening conversion offers for one More skill.
- `onembmcmmore.convert.<more-skill>.<mcmmo-skill>`: allows converting that More skill into one native mcMMO target.

Conversion permission examples:

```text
lp group default permission set onembmcmmore.command.convert true
lp group default permission set onembmcmmore.convert.exploration true
lp group default permission set onembmcmmore.convert.exploration.mining true
lp group default permission set onembmcmmore.convert.exploration.excavation true
```

Skill permissions are always required for XP. A disabled skill never grants XP, even if a player already has its permission. If the skill is enabled later, players who already have `onembmcmmore.skills.<skillname>` can start earning it immediately.

LuckPerms example:

```text
lp group default permission set onembmcmmore.skills.exploration true
```

Any future configured skill uses the same permission pattern:

```text
onembmcmmore.skills.<skillname>
```

## Visuals

`config.yml` includes a Unicode `icon` for every parent skill. Skill ids stay plain and stable internally, such as `exploration`, while player-facing chat can render `🧭 Exploration`.

Player-facing text, including the chat prefix and feedback messages, lives in `Translations/Locale_EN.yml`. The chat prefix is configurable there. By default it renders as `[✦ mcMMO More]`, shows a hover tooltip, and runs `/mcmmore info` when clicked.
Only the prefix text itself is hoverable/clickable; the message body is left plain unless a specific command row or future message adds its own interaction.

## Milestone Effects

`effects.yml` controls small player-local particle/sound effects when a skill level-up crosses a milestone. By default, milestones trigger every 25 levels and randomly choose one configured template, such as `confetti`, `sparkle`, `airburst`, `guard`, `arcane`, `pasture`, or `aquatic`.

The effects are cosmetic only. They do not change XP, levels, permissions, perks, or mcMMO data.

## Perks

Each configured parent skill can define milestone perks at levels `250`, `500`, and `1000`. Perks are intentionally simpler than mcMMO abilities: one activation command, one cooldown, short potion effects, and optional lunge movement.

Use:

```text
/mcmmore help exploration
/mcmmore activate exploration
```

Tab completion for `/mcmmore activate <skill>` suggests enabled skills that the sender has unlocked by permission and that have perks configured, even before the player reaches the first perk tier.

Default perk direction:

- Exploration: Speed II at 250, Speed III plus lunge at 500, Speed V plus stronger lunge at 1000.
- Aquatics: Dolphin's Grace and Water Breathing, scaling into Conduit Power at 1000.
- Airborne: Slow Falling and mobility bursts for elytra, riptide, levitation, wind-charge, and falling traversal. Disabled by default while tuning.
- Defense: short Resistance/Absorption activations for shield blocks and hostile hits survived. Disabled by default while tuning.
- Arcane: short Luck/Night Vision/Glowing activations for enchanting-table, anvil-combine, and Dragon Breath collection work. Disabled by default while economy checks are tuned.
- Husbandry: short Regeneration/Luck activations for successful animal breeding. Disabled by default while farm-density checks are tuned.
- Action: reserved for future wrecking/impact-style sources. Disabled by default.

## Conversion

`conversion.yml` can enable a testable, one-way converter from eligible mcMMO More levels into real native mcMMO levels. It uses a ledger by default, so a player's visible More level stays intact while `playerdata/<uuid>.yml` records how many levels from that More skill have already been spent.

Default math is `10` More levels for `1` native mcMMO level, with a minimum spend of `250` More levels and a maximum grant of `25` native levels per transaction. Quotes are cap-aware, expire after `60` seconds, and must be confirmed with the exact generated token or clickable confirmation row.

Default target mappings:

- Exploration: Excavation, Mining
- Aquatics: Fishing, Tridents
- Airborne: Acrobatics, Tridents
- Defense: Acrobatics, Repair
- Arcane: Alchemy, Repair, Salvage disabled
- Husbandry: Taming, Herbalism
- Action and Presence: disabled with no default targets

`conversion.yml` is disabled by default for staff testing. Enable it with:

```text
/mcmmore debug set conversion enabled true
/mcmmore debug reload conversion
```

## Eligibility

Custom skill XP and perk activation are survival-only. Creative, spectator, adventure, flying, non-mount vehicle movement, and dead players are blocked. Exploration can optionally count real ridable mounts through its `mounted_travel` source; boats, minecarts, and non-mount vehicles are ignored by code.

`tracking.allow-god-mode` is `true` by default for test-server work, so survival plus god mode can be used safely while testing. Set it to `false` before going live.

Vanished players are blocked through CMI's player state when CMI is installed and `tracking.use-cmi-player-state: true`. The plugin no longer checks generic Bukkit vanish metadata because this server standardizes on `/cmi vanish`.

## 1MB CMIAPI Bridge

mcMMO More stays a standalone jar, but it can register itself with `1MB-CMIAPI-Lib` when that shared library is installed. This bridge gives the broader 1MB CMI-API tool family visibility into the feature, dependency status, plugin metadata, and shared CMI player-state helper access without moving mcMMO More's commands, configs, skills, or playerdata into the CMIAPI project.

The bridge is optional and controlled by:

```yaml
integrations:
  cmiapi-lib:
    enabled: true
```

If the library is missing, mcMMO More continues normally and reports the bridge as `library missing` in `/mcmmore info`, `/mcmmore debug status`, and `/mcmmore debug config`. CMI god/vanish checks then fall back to mcMMO More's local reflection path.

## Anti-Exploit

Source XP is filtered through `plugins/1MB-mcMMO-More/anti-exploit.yml`.

- `count-when-standing-still: false` blocks standing-still key holds for movement skills.
- `min-distance-per-sample` ignores tiny jitter and stationary key presses.
- `max-distance-per-sample` ignores teleport, lag, and knockback-sized jumps.
- `minimum-water-blocks-nearby` can require aquatic XP to happen in more than a one-block water setup.
- `require-y-change`, `min-y-change-per-sample`, and `max-same-y-samples` quietly reduce perfectly flat swimming/diving/falling patterns.
- Movement sources can use `cooldown-millis`, `max-same-region-samples`, and rolling path uniqueness checks to reduce tight loops and repeated-path macros.
- Defense has event-specific checks for minimum damage, per-source cooldowns, per-attacker cooldowns, hostile-only defaults, PvP-off defaults, survival requirements, and nearby same-mob density.
- Arcane has event-specific checks for completed enchant/anvil/grindstone transactions, Dragon Breath bottle captures, minimum cost, maximum cost, minimum enchantments, per-source cooldowns, repeated item-signature cooldowns, and nearby breath-cloud validation.
- Husbandry has event-specific checks for successful breeding, adult parents, species cooldowns, chunk cooldowns, nearby same-species density, and chunk animal density.
- Parent skills can have source-specific rules under `skills.<skill>.sources.<source>`.
## Config Migration

On startup and `/mcmmore reload`, the plugin checks `config.yml`, `conversion.yml`, `anti-exploit.yml`, `effects.yml`, and `Translations/Locale_EN.yml` against the bundled defaults. Missing keys and missing default comments are added, but existing values are not overwritten. This keeps older server configs working while preserving local tuning.

## Placeholders

PlaceholderAPI placeholders use the unique identifier `onembmcmmore`.

- `%onembmcmmore_enabled%`: plugin master switch state.
- `%onembmcmmore_mcmmo_present%`: whether mcMMO is installed.
- `%onembmcmmore_mcmmo_enabled%`: whether mcMMO is enabled.
- `%onembmcmmore_cmiapi_bridge_available%`: whether `1MB-CMIAPI-Lib` is installed and enabled.
- `%onembmcmmore_cmiapi_bridge_registered%`: whether mcMMO More registered with the 1MB CMIAPI feature registry.
- `%onembmcmmore_cmiapi_bridge_status%`: short bridge status for debug scoreboards or admin views.
- `%onembmcmmore_skill_count%`: number of configured custom skills.
- `%onembmcmmore_mcmmo_power_level%`: native mcMMO power level read from mcMMO's API, or `0` when mcMMO is unavailable.
- `%onembmcmmore_power_level%`: sum of the player's configured custom skill levels.
- `%onembmcmmore_combined_power_level%`: native mcMMO power plus mcMMO More custom power for display-only scoreboards.
- `%onembmcmmore_level_<skill>%`: player's level for a skill.
- `%onembmcmmore_xp_<skill>%`: player's current XP toward the next level.
- `%onembmcmmore_xp_needed_<skill>%`: XP needed for the next level.
- `%onembmcmmore_xp_remaining_<skill>%`: remaining XP to the next level.
- `%onembmcmmore_total_xp_<skill>%`: player's total earned XP for a skill.
- `%onembmcmmore_source_xp_<skill>_<source>%`: player's total earned XP from one source under a parent skill.
- `%onembmcmmore_source_total_xp_<skill>_<source>%`: alias for source total XP.
- `%onembmcmmore_source_percent_<skill>_<source>%`: percent of the parent skill's total XP that came from one source.
- `%onembmcmmore_skill_enabled_<skill>%`: whether a skill is enabled in config.
- `%onembmcmmore_skill_icon_<skill>%`: configured Unicode icon for a skill.
- `%onembmcmmore_skill_display_<skill>%`: configured display name for a skill.
- `%onembmcmmore_skill_visual_<skill>%`: configured icon plus display name for a skill.
- `%onembmcmmore_skill_permission_<skill>%`: permission required to earn that skill.
- `%onembmcmmore_skill_unlocked_<skill>%`: whether the online player has that skill permission.
- `%onembmcmmore_perk_level_<skill>%`: highest unlocked perk milestone level, or `0`.
- `%onembmcmmore_perk_next_level_<skill>%`: next perk milestone level, or `0`.
- `%onembmcmmore_perk_cooldown_<skill>%`: remaining perk cooldown seconds for the player.
- `%onembmcmmore_top_name_<skill>_<rank>%`: leaderboard player name at rank 1-100.
- `%onembmcmmore_top_level_<skill>_<rank>%`: leaderboard level at rank 1-100.
- `%onembmcmmore_top_total_xp_<skill>_<rank>%`: leaderboard total XP at rank 1-100.

Placeholder examples:

```text
%onembmcmmore_combined_power_level%
%onembmcmmore_level_exploration%
%onembmcmmore_xp_remaining_aquatics%
%onembmcmmore_source_xp_exploration_running%
%onembmcmmore_source_percent_aquatics_diving%
%onembmcmmore_source_xp_arcane_dragon_breath%
%onembmcmmore_skill_unlocked_airborne%
%onembmcmmore_skill_unlocked_defense%
%onembmcmmore_skill_unlocked_arcane%
%onembmcmmore_skill_unlocked_husbandry%
%onembmcmmore_perk_level_exploration%
%onembmcmmore_perk_cooldown_exploration%
%onembmcmmore_top_name_exploration_1%
%onembmcmmore_top_level_exploration_1%
```

## Versions

- `1.0.0-048`: records the official mcMMO API guide as the primary integration research source to revisit as its maintainer expands it.
- `1.0.0-047`: prepares source-local central docs onboarding with a player guide, importer manifest, split technical docs, and a clickable canonical docs link in `/mcmmore info`.
- `1.0.0-046`: adds Arcane Dragon Breath source XP for successfully bottling dragon breath clouds, with anti-exploit cooldown and nearby cloud validation.
- `1.0.0-045`: rebuilds the 26.1.2-target jar for Paper 26.2 compatibility testing while keeping 26.2 as an ignored local test-server target only.
- `1.0.0-044`: adds wider rendered spacing after shield-style skill icons so Defense displays cleanly in chat, console, and placeholders.
- `1.0.0-043`: adds fallback bundled-resource loading so runtime default/comment repair can still read YAML defaults when Paper's normal resource lookup misses them.
- `1.0.0-042`: fixes `/mcmmore skills` tab completion so console/admin can see `convert` when conversion is enabled, while player target suggestions stay permission-aware.
- `1.0.0-041`: removes test-era legacy top-level skill/config/playerdata migration and the Aerobatics permission alias now that live installs will start fresh for this plugin.
- `1.0.0-040`: adds default-disabled More-levels to native mcMMO-levels conversion with `conversion.yml`, ledger spending, clickable confirmations, cap-aware quotes, conversion permissions, debug reload/set support, and docs.
- `1.0.0-039`: adds admin-only `/mcmmore debug skills <add|set|remove>` level mutation for online player testing, with permission-aware tab completion and docs.
- `1.0.0-038`: stores source-level XP totals, adds source XP/percent placeholders for parent-skill scoreboards, documents server-visible activation gesture limits, and tracks future Presence/Action decisions.
- `1.0.0-037`: adds repeated-region/path movement anti-exploit tuning and introduces default-disabled Husbandry with breeding, disabled care-feeding, farm-density rules, effects, permission, perks, and docs.
- `1.0.0-036`: adds Exploration mounted travel for real ridable mounts and introduces default-disabled Arcane with enchanting table, anvil combine, disabled grindstone reclaim, transaction anti-exploit rules, effects, permission, perks, and docs.
- `1.0.0-035`: adds the default-disabled Defense skill with shield block, hostile damage, hostile projectile, and disabled PvP sources plus Defense-specific anti-exploit rules, perks, effects, docs, permissions, and debug-set keys.
- `1.0.0-034`: renames the disabled Aerobatics parent skill to Airborne, adds wind-charge airborne tracking, keeps Aerobatics as a legacy alias, and ships Airborne defaults for config, anti-exploit, effects, permissions, docs, and placeholders.
- `1.0.0-033`: fixes `/mcmmore activate <skill>` tab completion so enabled, permitted perk skills appear before the first perk tier is unlocked.
- `1.0.0-032`: adds read-only native mcMMO and combined mcMMO plus mcMMO More power placeholders for scoreboards, and removes completed/rejected TODOs.
- `1.0.0-031`: adds `Translations/Locale_EN.yml`, guarded list editing for `/mcmmore debug set`, and shared CMI player-state helper bridging through `1MB-CMIAPI-Lib`.
- `1.0.0-030`: softens mixed legacy/parent skill notices to info and completes the local Paper 26.1.2 smoke test.
- `1.0.0-029`: fixes mixed legacy/parent skill configs so parent skills win after migration.
- `1.0.0-028`: adds safe missing-default YAML migration for `config.yml`, `anti-exploit.yml`, and `effects.yml`.
- `1.0.0-027`: removes generic Bukkit vanish metadata checks and relies on CMI player state for vanish blocking, clearing the deprecated metadata build warning.
- `1.0.0-026`: adds an optional `1MB-CMIAPI-Lib` bridge, debug/status placeholders for the bridge, and a config toggle while keeping mcMMO More standalone.
- `1.0.0-025`: records external skill/reward research candidates and produces the pushed parent-skill test snapshot.
- `1.0.0-024`: migrates loaded legacy walking/swimming-style progress into parent skill profiles during runtime reloads.
- `1.0.0-023`: pivots movement into parent skills with source modifiers, source-aware anti-exploit rules, and legacy progress aliases.
- `1.0.0-022`: introduces parent skill/source runtime model for Exploration, Aquatics, Aerobatics, and Action.
- `1.0.0-021`: keeps milestone sound parsing on Paper's registry API and avoids deprecated sound enum fallbacks.
- `1.0.0-020`: adds `effects.yml` milestone particle/sound templates that can randomize a small cosmetic pop every 25 levels.
- `1.0.0-019`: limits prefix hover/click events to the prefix text so message bodies can have their own interactions.
- `1.0.0-018`: hides mcMMO's locale reload commands from non-admin tab suggestions to avoid `/mcmmore` confusion.
- `1.0.0-017`: cleans up help output so the prefix appears once and safe complete command rows are clickable.
- `1.0.0-016`: expands `/mcmmore debug status` with plugin, build target, runtime Java, server engine, API target, and dependency plugin versions.
- `1.0.0-015`: clarifies how mcMMO More appends to mcMMO, including `/mcstats`, `/mctop`, and power-level equivalents.
- `1.0.0-014`: enforces survival-only skill use, blocks vanished players, adds CMI god/vanish state checks, and keeps `allow-god-mode: true` for testing.
- `1.0.0-013`: adds config-driven skill perks, `/mcmmore help <skill>`, `/mcmmore activate <skill>`, perk placeholders, and safe runtime perk defaults for older configs.
- `1.0.0-011`: adds configurable Unicode skill icons and a hoverable/clickable chat prefix.
- `1.0.0-010`: makes movement states exclusive so sprinting never counts as Walking XP.
- `1.0.0-009`: adds `/mcmmore debug reload <all|config|locale>` and fixes resource version stamping during builds.
- `1.0.0-008`: confirms no standalone `/mcmmoreloadlocale` command is registered by this plugin.
- `1.0.0-007`: adds admin-only `/mcmmore debug` diagnostics and safe scalar config editing.
- `1.0.0-006`: adds `anti-exploit.yml` movement filters and normalizes legacy `sprinting` to `running`.
- `1.0.0-005`: allows `/mcmmore stats <player>` to inspect known offline player profiles.
- `1.0.0-004`: changes bare `/mcmmore top` to show top lists for all configured skills.
- `1.0.0-003`: adds the `onembmcmmore.skills.<skillname>` unlock permission model and PlaceholderAPI scoreboard/top placeholders.
- `1.0.0-002`: Java 25/Paper 26.1.2 build metadata, release sync, and local docs/rules alignment.
- `0.1.0-001`: initial standalone mcMMO More scaffold.

## Credits

- mcMMO Dev team for mcMMO and its public API surface.
- PaperMC for the server API.
- PlaceholderAPI by extended_clip for scoreboard and placeholder integration.
- 1MoreBlock / mrfloris for project direction, testing, and server integration requirements.
