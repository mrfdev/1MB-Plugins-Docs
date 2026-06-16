# Forage

Forage is a player-facing nature progression plugin for `/forage`. It is built for Paper 26.1.2+ and Java 25 and depends on CMI, CMILib, and `1MB-CMIAPI-Lib`.

Version 1 focuses on a testable core rather than the full long-term design. Players use curated PDC-marked Forage tools to earn Forage XP, Forage Points, tool soul progress, daily/weekly quest progress, leaderboard ranks, camp-only tool upgrades, camp composter turn-ins, and small treasure rolls from configured natural block families. Normal tools still work as Minecraft tools, but they do not feed the Forage skill.

The long-term ideas, v2/v3 options, and shelved feature notes live in [forage-roadmap.md](forage-roadmap.md).

## Player Flow

Players open:

```text
/forage
```

The GUI uses the shared hardened GUI service with safe holders, cancelled clicks and drags, duplicate click protection, delayed close actions, and the global light-blue filler material. The v1 hub includes:

- tool shop
- player stats
- daily and weekly quests
- read-only top boards for level, XP, points, actions, treasures, daily XP, and weekly XP
- tool/family explanation
- camp-only tier upgrades for held Forage tools
- camp-only Repair & Merge for worn Forage tools
- camp composter turn-ins for plain vanilla forage items
- Forage Dust crafting and small bounded growth pulses
- tree-grove camp validation with optional lantern requirements
- tips
- camp check with checklist, unlocks, and throttled ready feedback
- CMI ctext guide button through the configured `gui.info-command`
- `/menu` return button

Forage only awards progress when:

- the plugin is enabled
- the player is in an allowed world
- the player breaks a configured source block
- the player is holding the matching PDC-marked Forage tool
- the daily cap has not been reached
- the chunk/source family is not exhausted
- the WorldGuard global-only check passes when WorldGuard is installed and enabled

## V1 Tools

Default tools are:

| Tool | Material | Source Families |
| --- | --- | --- |
| Forage Sickle | `COPPER_HOE` | flora, crops, mushrooms |
| Forage Axe | `COPPER_AXE` | logs, leaves, fruits |
| Forage Trowel | `COPPER_SHOVEL` | cave, moss, sands |
| Forage Shears | `SHEARS` | leaves, flora, moss |

Tools are PDC-marked with schema, tool id, tier, tool XP, tool level, and use count. Lore includes a fake Foraging level, tool soul progress bar, short tool personality line, supported families, and a warning that the tool is curated.

Forage tools are blocked from anvil, enchanting table, grindstone, smithing table, and configured repair/enchant command prefixes such as `/cmi anvil`, `/repair`, `/fix`, and `/cmi enchant`.

Forage tools can be upgraded through `/forage tools` -> Upgrade Tool:

- the player must stand near a complete Forage camp when `tools.upgrade.requires-complete-camp` is enabled
- the main hand must hold the Forage tool to upgrade
- the next tier must be within `tools.max-tier`
- the player must meet the configured Forage level milestone
- the player pays configured Forage Points and CMI/Vault money
- the upgrade keeps existing tool XP, tool level, uses, and durability
- higher tiers increase valid Forage XP rewards by 25% per tier above tier I

Forage tools can be repaired only through `/forage tools` -> Repair & Merge:

- the player must stand near a complete Forage camp
- the main hand must hold the Forage tool to keep
- the offhand must hold a matching Forage tool type to consume, such as shears with shears
- one PDC-marked Forage treasure item is consumed
- the player pays configured Forage Points and CMI/Vault money
- the repair restores a configured durability percentage, capped by the player's Forage level
- a configured percentage of the offhand donor tool XP is transferred into the main-hand tool

## Camp Composter

Players can use `/forage compost` or the Camp Composter button from a complete Forage camp. The turn-in does not open an escrow inventory. It safely scans the player's inventory, builds a plan, asks for confirmation, then re-scans and consumes only the planned slots if they still match.

By default, composter turn-ins:

- require a complete nearby Forage camp
- accept only plain vanilla item stacks with no custom name, lore, enchantments, PDC, custom model data, or other item meta
- reject Forage tools and PDC-marked Forage treasures
- accept configured organic source families such as flora, crops, mushrooms, leaves, fruits, and moss
- reward reduced Forage XP and Forage Points compared to breaking blocks with a curated tool
- respect the daily Forage XP cap
- use a short cooldown to avoid duplicate clicks

## Forage Dust

Players can use `/forage dust` or the Forage Dust button from the hub/camp GUI to make a small batch of PDC-marked Forage Dust.

By default, Forage Dust:

- requires a complete nearby Forage camp
- costs CMI/Vault money, Forage Points, and plain vanilla `BONE_MEAL`
- rejects custom bonemeal with names, lore, PDC, or other item meta
- creates PDC-marked dust with a short lore warning that it does not award Forage XP
- uses one dust per right-click growth pulse
- only works in allowed worlds and WorldGuard global-only areas
- pulses only configured growable materials inside a small clamped radius
- respects a per-player cooldown
- does not award Forage XP or points, so it cannot become a bonemeal-to-Forage loop

## Camp Feedback

`/forage camp` and sneak-right-clicking the configured camp anchor now give a clearer camp status. The camp GUI separates the checklist, unlocks, composter action, tool upgrades, and Repair & Merge action so players can understand what the camp is for and what is still missing.

Camp validation can require the configured composter anchor, a campfire, barrel, crafting table, logs, leaves or canopy blocks, wool for a tent/bedroll feel, and a nearby tree-grove shape. The tree-grove check is still cheap: it looks for a trunk-like block with leaves, Nether wart canopy, warped wart canopy, or mushroom cap blocks nearby. `camp.require-lantern` is available for stricter camps, but defaults off so existing test camps do not all need a lantern immediately.

When a player validates a complete camp, Forage can show a short ready message and play the configured camp sound/particle effect. This is throttled by player and camp chunk through `camp.ready-feedback.cooldown-seconds`, so repeated sneak-clicks do not spam chat. Ready camps unlock camp-only tool upgrades, Repair & Merge, camp composter turn-ins, Forage Dust, and tree-grove validation.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/forage` | player | Opens the Forage hub GUI. |
| `/forage info` | anyone | Shows a player-friendly intro and public docs link. |
| `/forage help` | anyone | Shows commands available to the sender. |
| `/forage shop` | player | Opens the curated tool shop. |
| `/forage stats` | player | Shows level, XP, points, caps, totals, and held tool details. |
| `/forage quests` | player | Opens daily and weekly Forage tasks and claims completed rewards. |
| `/forage top [level\|xp\|points\|actions\|treasures\|daily\|weekly]` | player/console | Shows read-only Forage leaderboards from saved profile data. |
| `/forage recent [page]` | player | Shows details from the latest batched Forage progress message. |
| `/forage tips` | anyone | Prints configured short tips. |
| `/forage tools` | player | Opens the Forage tools GUI with tool info, tier upgrades, and Repair & Merge. |
| `/forage camp` | player | Checks whether the nearby camp requirements are met. |
| `/forage compost` | player | Opens camp composter turn-ins near a complete Forage camp. |
| `/forage dust` | player | Makes PDC-marked Forage Dust near a complete camp and explains growth pulses. |
| `/forage admin give <player> <tool> [tier]` | admin/console | Gives a PDC-marked Forage tool. |
| `/forage admin inspect <player>` | admin/console | Shows saved profile data and held tool identity. |
| `/forage admin chunks` | admin/console | Shows chunk exhaustion runtime counts. |
| `/forage admin reload` | admin/console | Reloads config and saved data. |
| `/forage admin save` | admin/console | Saves profiles and chunk state. |
| `/forage debug tool [player]` | admin/console | Shows PDC data for the held Forage tool. |
| `/forage debug all` | admin/console | Uses the shared debug output for build, server, hooks, commands, permissions, placeholders, and config. |

## Permissions

Player defaults:

```text
onembcmi.forage.use
onembcmi.forage.shop
onembcmi.forage.stats
onembcmi.forage.camp
```

Admin defaults are false:

```text
onembcmi.forage.admin
onembcmi.forage.give
onembcmi.forage.inspect
onembcmi.forage.reload
onembcmi.forage.debug
```

`onembcmi.forage.admin` includes the admin child permissions, but operator status alone does not receive it from plugin.yml defaults.

## Storage

V1 stores data under:

```text
plugins/1MB-CMIAPI/Forage/data/profiles.yml
plugins/1MB-CMIAPI/Forage/data/chunks.yml
```

`profiles.yml` stores player level, XP, points, actions, treasure count, purchases, daily caps, quest progress, quest claim state, and last action. `/forage top` reads this saved profile data in memory; it does not write separate leaderboard snapshots. `chunks.yml` stores active chunk exhaustion cooldowns. Runtime composter and dust/growth counters are exposed for debug/placeholders, but individual turn-ins and dust uses are not stored as permanent history in v1. This keeps v1 self-contained while the roadmap keeps SQLite as a later storage-hardening discussion item if the feature grows large enough to need it.

## Config Highlights

`config.yml` is comment-preserving and adds missing defaults safely through the shared library.

Important sections:

- `worlds.allowed`: exact world allow-list
- `economy.*`: CMI-backed Vault shop integration
- `progression.*`: level formula, daily XP/action caps, and progress message frequency
- `messages.batch.*`: delayed batched progress summaries and `/forage recent` limits
- `quests.*`: daily/weekly task definitions, targets, rewards, claim state, and safe reward command prefixes
- `tools.*`: tool ids, materials, prices, family coverage, tool soul settings, modification guards, upgrade costs/gates, and Repair & Merge costs/caps
- `sources.*`: source-family XP, point value, and material lists
- `chunk-exhaustion.*`: v1 anti-grind cooldowns by chunk and source family
- `protection.worldguard.*`: conservative global-only region check when WorldGuard is installed
- `camp.*`: composter camp anchor, wool tent/bedroll count, nearby block requirements, and ready feedback
- `camp.require-tree`: requires a trunk/canopy tree-grove shape near the camp
- `camp.require-lantern` and `camp.required-lantern-count`: optional camp ambience requirement
- `camp.turnins.*`: complete-camp requirement, accepted source families, item cap, reward scaling, cooldown, and daily-cap behavior
- `growth.*`: bounded Forage Dust growth pulses, cooldown, radius, max blocks, and allowed target materials
- `growth.dust.*`: dust item material/name/glint, batch amount, complete-camp requirement, money cost, point cost, and bonemeal cost
- `treasures.*`: simple v1 treasure chance, vanilla material list, and optional PDC/lore treasure markers
- `effects.*`: sounds and particles
- `gui.tip-line-max-chars`: approximate maximum lore line length in the tips GUI
- `tips.lines`: player-facing tips shown by `/forage tips`

## Placeholders

The shared placeholder bridge advertises these Forage placeholders:

```text
%onembcmi_forage.enabled%
%onembcmi_forage.player.level%
%onembcmi_forage.player.xp%
%onembcmi_forage.player.xp_formatted%
%onembcmi_forage.player.points%
%onembcmi_forage.player.actions%
%onembcmi_forage.player.treasures%
%onembcmi_forage.player.today.xp%
%onembcmi_forage.player.today.actions%
%onembcmi_forage.player.daily_xp_cap%
%onembcmi_forage.player.daily_action_cap%
%onembcmi_forage.player.quests.daily.completed%
%onembcmi_forage.player.quests.daily.claimable%
%onembcmi_forage.player.quests.weekly.completed%
%onembcmi_forage.player.quests.weekly.claimable%
%onembcmi_forage.player.quest.daily.<id>.progress%
%onembcmi_forage.player.quest.daily.<id>.target%
%onembcmi_forage.player.quest.daily.<id>.claimable%
%onembcmi_forage.player.quest.weekly.<id>.progress%
%onembcmi_forage.player.quest.weekly.<id>.target%
%onembcmi_forage.player.quest.weekly.<id>.claimable%
%onembcmi_forage.player.rank.level%
%onembcmi_forage.player.rank.points%
%onembcmi_forage.player.rank.daily%
%onembcmi_forage.player.rank.weekly%
%onembcmi_forage.top.<board>.<rank>.name%
%onembcmi_forage.top.<board>.<rank>.value%
%onembcmi_forage.runtime.earned_actions%
%onembcmi_forage.runtime.exhausted_actions%
%onembcmi_forage.runtime.treasures%
%onembcmi_forage.runtime.compost_turnins%
%onembcmi_forage.runtime.compost_items%
%onembcmi_forage.runtime.dust_crafts%
%onembcmi_forage.runtime.growth_pulses%
%onembcmi_forage.runtime.growth_blocks%
%onembcmi_forage.runtime.tracked_chunks%
%onembcmi_forage.runtime.exhausted_chunks%
```

These are enough for a first hologram or scoreboard pass while richer skill trees, camps, derbies, and seasonal systems are still roadmap items. Leaderboard board ids are `level`, `xp`, `points`, `actions`, `treasures`, `daily`, and `weekly`.

## Safety Notes

- No RCON support is used or expected.
- Player text input is not accepted in v1, so command injection risk is limited to admin-controlled config command hooks.
- The CMI ctext guide command only allows the safe `cmi ctext` prefix.
- Tool upgrades do not open an escrow inventory. They re-read the held main-hand Forage tool at confirmation time, withdraw configured costs, mutate only the trusted PDC-marked item, and refund costs if the item changed.
- Repair & Merge does not open an escrow inventory. It reads the main hand, offhand, and inventory treasure marker at confirmation time, then re-validates before changing items.
- Camp composter turn-ins do not open an escrow inventory. They scan plain vanilla inventory stacks, confirm the plan, revalidate each slot, and only then consume items.
- Forage Dust does not open an escrow inventory. It checks camp state, money, Forage Points, plain vanilla bonemeal, and inventory space at confirmation time before creating PDC-marked dust.
- Forage Dust growth pulses are bounded by configured allowed materials, radius, max block count, cooldown, allowed worlds, and WorldGuard checks. Dust does not award Forage XP or points.
- Camp tree-grove validation only scans the existing small camp radius and does not edit blocks or track persistence.
- WorldGuard is optional and checked by reflection so the jar can load without a compile-time WorldGuard dependency.
- Chunk exhaustion is intentionally conservative and cheap: it tracks chunk, source family, action count, and cooldown.
- Player-placed block provenance tracking is not part of v1 and remains a live-readiness discussion item.

## Future Direction

Forage is expected to grow gradually after test feedback:

- richer Forage Camps
- stricter or themed camp validation profiles
- richer composter recipes and camp progression
- skill trees
- higher-tier tool upgrades and unlock variants
- richer Forage Growth recipes and dust variants
- biome-specific rare herbs
- seasonal/event profiles
- derbies and community milestones
- museum/herbarium systems
- optional storage hardening if YAML becomes too small for live scale
