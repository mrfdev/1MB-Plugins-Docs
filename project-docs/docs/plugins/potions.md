# Potions

Potions adds a locked admin-only `/_potions` forge for creating custom event potion items. It is meant for owner/staff preparation of kit rewards, event crates, and limited seasonal prizes, not for normal player use.

Generated items are real Paper/Bukkit potion items with custom `PotionEffect` data stored on the item. The plugin also stamps each item with PersistentDataContainer identity so staff can inspect it later and disable the matching configured potion id if a reward needs to be retired.

## Commands

```text
/potions
/potions inspect
/potions info
/potions help
/_potions
/_potions status
/_potions list [page]
/_potions give <player> <id> [potion|splash|lingering] [variant] [amount]
/_potions give <id> [potion|splash|lingering] [variant] [amount]
/_potions bundle <player> <collection-id> [potion|splash|lingering] [variant|random] [amount-per-potion]
/_potions bundle <collection-id> [potion|splash|lingering] [variant|random] [amount-per-potion]
/_potions set <id> <field> <value>
/_potions inspect
/_potions inspect <player>
/_potions enable <id>
/_potions disable <id>
/_potions reload
/_potions info
/_potions help
/_potions debug permissions
/_potions debug config
/_potions debug all
```

`/potions` is the player-facing command. It does not open the admin forge and does not require a permission node. When a player holds a Potions event item in either hand, `/potions` shows safe details: potion id, enabled/disabled state, form, effect, duration, stored drink cost, collection metadata, and whether the item is currently blocked. The clickable `[Potions]` prefix runs `/potions` so players can inspect the item behind a success/cost message.

Console usage should include a target player:

```text
_potions give mrfloris wizard_view_iii potion 1 1
_potions give mrfloris wizard_view_iii splash 2 4
_potions bundle mrfloris wizard potion 1 1
_potions bundle mrfloris wizard splash random 1
_potions set wizard_view_iii duration-minutes 15
_potions set wizard_view_iii money-cost 1500
_potions set wizard_view_iii exp-level-cost 1
_potions inspect mrfloris
_potions disable wizard_view_iii
_potions enable wizard_view_iii
_potions reload
```

The bare `/_potions` command opens the admin GUI for an authorized player. From direct console it prints status instead. All non-GUI management commands work from direct console without requiring a LuckPerms grant, while players still need the explicit Potions permission nodes for `/_potions`.

Potion style names also work as command aliases. For example, a generated display name such as `Azure Power III` is suggested as `azure_power_iii` and resolves back to the configured PDC id, so `/_potions disable azure_power_iii` disables the matching base potion definition for already-created items.

In game, an authorized admin can use the shorter self-target form:

```text
/_potions give wizard_view_iii lingering 3 1
```

Typing `/_potions` in game opens the forge GUI:

1. Pick normal, splash, or lingering.
2. Pick a category such as Vision, Movement, Mining, Combat, or Survival.
3. Pick a configured potion definition.
4. Pick one of up to 14 generated name/lore variants in a 4/3/4/3 layout.
5. Click Create Potion to add one item to your inventory.

The same GUI also has a Collection Bundles path. It lists configured collections, then lets an admin create one normal, splash, or lingering item for every enabled potion in that collection. This is meant for event sets such as five Wizard potions where each yearly event gives out one collectible item.

The Configure Potions path edits existing definitions in `potions.yml`. An admin can toggle a potion id, cycle particle presets, adjust level, duration, money cost, and EXP level cost with buttons, clear costs, and then create a fresh item from the updated definition. Shift-clicking the adjustment buttons uses larger steps.

Safe scalar edits can be made from console or in game:

```text
/_potions set miner_rush_iii level 4
/_potions set moonwell_gills_ii duration-minutes 15
/_potions set wizard_view_iii particle-preset moon_crystal
/_potions set wizard_view_iii success-message The {title} clears the night around you.
/_potions set wizard_view_iii collection-type Wizard
```

Supported fields are `level`, `duration-seconds`, `duration-minutes`, `money-cost`, `exp-level-cost`, `particle-preset`, `success-message`, `success-sound`, `collection-enabled`, `collection-id`, `collection-type`, `collection-index`, and `collection-size`.

`/_potions set` and the GUI configuration buttons update the definition in `potions.yml`; they do not rewrite already-created items. New items snapshot their display lore, effect level/duration, and drink cost into the item. Existing items keep their generated lore and stored cost, but disabling a potion id still blocks matching marked items while Potions is installed.

## Default Potions

| Id | Effect | Level | Duration | Notes |
| --- | --- | --- | --- | --- |
| `wizard_view_iii` | Night Vision | III | 15 minutes | Includes the Summer Crystals lore line. |
| `summer_swiftness_iii` | Speed | III | 8 minutes | Event race or treasure hunt movement. |
| `miner_rush_iii` | Haste | IV | 6 minutes | Short mining-event burst above vanilla/mcMMO-style Haste III expectations. |
| `crystal_might_iii` | Strength | III | 4 minutes | Powerful and intentionally short. |
| `moonwell_gills_ii` | Water Breathing | II | 12 minutes | Underwater events and dives. |
| `emberguard_ii` | Fire Resistance | II | 12 minutes | Nether/lava event safety. |
| `softfall_charm_iii` | Slow Falling | III | 8 minutes | Tall builds and sky-event safety. |

Some vanilla effects do not gain extra mechanics from amplifier levels even when a level is stored on the item. For example, Night Vision III is mostly a custom presentation and identity choice, while Speed III or Haste IV have direct amplifier behavior.

## Style Variants, Particles, And Collections

The style menu shows up to 14 choices laid out as:

```text
x x x x
 x x x
x x x x
 x x x
```

Each potion can define its own title and lore variants. If fewer than `gui.minimum-style-variants` titles are configured, Potions safely expands the list with themed prefixes such as Azure, Moonlit, Witchmarked, Allay-Touched, Cauldron-Forged, Museum, and Festival.

Nine particle presets are included by default:

```text
moon_crystal
witch_spark
allay_glimmer
badlands_smoke
lava_forge
rose_quartz
tide_bubbles
ember_ward
feather_drift
```

Collections are lore and PDC metadata for event sets or museum collecting. A generated potion can show a line such as `Potion Collection 1 of 5, Type: Wizard`. Defaults include Wizard, Allay Collected, Blacksmith Forged, Witch Brewed, and Museum Charm themes.

Collections are also bundle targets. Any collection-marked potion definition with matching `collection.id` is included in `/_potions bundle <collection-id>`. The command sorts entries by `collection.index`, refuses to generate if any included potion id is disabled, and creates one item per collection entry. Use `random` as the variant to make each bundled item pick a random title/lore style.

To mark a yearly Wizard set, tune the normal potion definition fields and then set the collection metadata:

```text
/_potions set wizard_view_iii collection-enabled true
/_potions set wizard_view_iii collection-id wizard_2026
/_potions set wizard_view_iii collection-type Wizard
/_potions set wizard_view_iii collection-index 1
/_potions set wizard_view_iii collection-size 5
```

Repeat that for the other four potion ids with collection indexes 2 through 5. Then generate the full staff bundle with:

```text
/_potions bundle mrfloris wizard_2026 potion 1 1
```

## Permissions

```text
onembcmi.potions.admin
onembcmi.potions.give
onembcmi.potions.bundle
onembcmi.potions.set
onembcmi.potions.toggle
onembcmi.potions.inspect
onembcmi.potions.reload
onembcmi.potions.debug
```

`onembcmi.potions.admin` defaults to `false` in `plugin.yml`. Grant it explicitly through LuckPerms to trusted owner-level staff. Operator status alone does not receive this permission from this plugin's defaults. Direct console is allowed to run the non-GUI management commands.

Potions uses the shared feature-prefix system with visible prefix name `Potions`. The default symbol is `⚗` from `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.potions`.

## Config

Runtime config is split by ownership:

```text
plugins/1MB-CMIAPI/Potions/config.yml
plugins/1MB-CMIAPI/Potions/potions.yml
plugins/1MB-CMIAPI/Potions/particles.yml
```

`config.yml` holds global behavior:

```yaml
enabled: true
gui:
  title: Potion Forge
  filler-material: GLOBAL
  minimum-style-variants: 14
delivery:
  max-command-amount: 36
  drop-leftovers-at-player: false
safety:
  block-disabled-potions: true
  block-unknown-potion-ids: true
  hide-vanilla-effect-tooltip: true
success:
  commands:
    enabled: false
    allowed-prefixes: []
```

`particles.yml` holds reusable particle presets:

```yaml
particle-presets:
  ids:
    - moon_crystal
  moon_crystal:
    particle: END_ROD
    count: 48
    radius: 0.65
    y-offset: 1.05
    speed: 0.02
    color: '#bde0fe'
    size: 1.0
```

`potions.yml` holds categories, potion definitions, enabled/disabled state, costs, success actions, and collection metadata:

```yaml
categories:
  vision:
    display-name: Vision
    material: ENDER_EYE
    description: Sight, clarity, and night utility.
potions:
  ids:
    - wizard_view_iii
  wizard_view_iii:
    enabled: true
    category: vision
    effect: minecraft:night_vision
    level: 3
    duration-seconds: 900
    color: '#bde0fe'
    title-variants:
      - Wizard View III
    lore-variants:
      - Forged from 15 years of|1MoreBlock.com Summer Crystals.|When consumed, grants {duration} of clear vision during the nightly hours.
    cost:
      money: 0.0
      exp-levels: 0
    success:
      message: '{title} settles over your eyes like moonlit glass.'
      sound: minecraft:block.amethyst_block.chime
      particle-preset: moon_crystal
      commands: []
    collection:
      enabled: true
      id: wizard
      type: Wizard
      index: 1
      size: 5
```

Lore variants use `|` to split one configured variant into multiple item lore lines. Supported placeholders are `{duration}`, `{effect}`, `{level}`, `{form}`, and `{id}`.

Existing early Potions installs are migrated automatically: legacy `potions.*`, `categories.*`, and `particle-presets.*` sections are copied from `config.yml` into the new split files, then removed from `config.yml` on reload.

`/_potions reload` reloads all three files. `/_potions set` writes safe scalar fields to `potions.yml`, including custom potion ids that you add there later. The in-game Configure Potions GUI writes the same safe scalar fields for common build-time values. `/_potions debug health` reports validation for all three files, and `/_potions debug config [global|potions|particles] [page]` can inspect either the combined config view or one file at a time.

Money costs use Vault economy, which is normally backed by CMI on this server. EXP costs remove Bukkit player levels directly. If a potion costs `$1500` and `1` EXP level, lore says it costs that to drink, and consumption is cancelled if the player cannot pay both costs.

Drink costs are snapshotted onto newly created items with PDC so future `potions.yml` cost changes do not silently make old items charge a different amount than their lore says. Use `/_potions inspect` to compare a held item's stored cost with the current definition cost.

Success actions are built in and run only after a marked drinkable potion passes disable checks and costs:

- plain player message
- sound
- particle preset
- optional sanitized console commands when `success.commands.enabled` is true and the command starts with an allowed prefix

Command actions are disabled by default. They reject command chains, pipes, semicolons, MiniMessage brackets, tellraw, execute, function, op/deop, stop, restart, and reload. There is no RCON support.

## PDC And Disable Behavior

Generated items store:

```text
1mb-cmiapi-potions:potion_id
1mb-cmiapi-potions:form
1mb-cmiapi-potions:effect
1mb-cmiapi-potions:level
1mb-cmiapi-potions:duration_seconds
1mb-cmiapi-potions:money_cost
1mb-cmiapi-potions:exp_level_cost
1mb-cmiapi-potions:variant
1mb-cmiapi-potions:collection_id
1mb-cmiapi-potions:collection_type
1mb-cmiapi-potions:collection_index
1mb-cmiapi-potions:collection_size
1mb-cmiapi-potions:created_at
```

When `safety.block-disabled-potions` is true, disabling a potion id blocks marked items with that id on drink, splash, and lingering splash while the Potions plugin is installed. When `safety.block-unknown-potion-ids` is true, old or unknown Potions-marked ids are also blocked.

If the plugin is removed, Minecraft/Paper will still understand the custom potion effect stored on the item, so generated potions can still work as normal custom potions. The tradeoff is that runtime disable checks, inspection, and unknown-id blocking require the Potions plugin to be installed and enabled.

## Hooks And APIs

- **CMI / CMILib / 1MB-CMIAPI-LIB**: required runtime stack, shared config/comment preservation, feature metadata, help, debug, and prefix handling.
- **LuckPerms**: optional but expected for granting `onembcmi.potions.admin`.
- **PlaceholderAPI**: optional hook listed for shared diagnostics; Potions does not add placeholders in this build.
- **Vault / CMI economy**: optional for per-potion money costs. If Vault economy is missing, paid potions cannot be consumed.
- **Paper/Bukkit API**: uses `PotionMeta`, `PotionEffect`, `PotionEffectType` registry lookups, `PersistentDataContainer`, `PlayerItemConsumeEvent`, `PotionSplashEvent`, and `LingeringPotionSplashEvent`.

Potions creates items directly with the Paper/Bukkit item API rather than dispatching CMI `/give` command strings. This avoids command-string injection risk and keeps generated item identity under plugin control. The resulting item can still be placed into CMI kits, reward boxes, crates, or other server workflows after creation.

## Safety Notes

Potion input is strict and config-driven. Admin commands accept only configured lowercase ids or generated style aliases, known online player names, the three known forms, numeric variant indexes, bounded amounts, and allowlisted scalar config fields.

The generated item stores a fixed duration in ticks through Paper/Bukkit potion metadata. It does not schedule repeating tasks and does not create infinite effects. Lingering potions use the normal Minecraft lingering cloud behavior for that fixed custom effect.

If Potions is uninstalled, Minecraft/Paper still sees the item as a normal custom potion, so the base effect remains usable. Runtime disable checks, drink costs, success messages, sounds, particles, optional commands, and inspection require Potions to be installed.

For future Paper updates, keeping the item as a normal custom potion is the safest persistence path. PDC keys and custom potion metadata are designed to survive ordinary server restarts and upgrades, but staff should still test a sample item after major Minecraft/Paper updates before distributing a large batch.

[Plugin index](README.md)
