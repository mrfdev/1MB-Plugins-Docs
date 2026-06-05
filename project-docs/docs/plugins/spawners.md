# Spawners

Spawners adds a player-facing `/spawners` shop GUI for buying CMI-managed mob spawners. It discovers supported spawner entity types from the Paper API at runtime, filters the configured lists to what the current server can actually create, and gates every purchase behind the matching CMI permission such as `cmi.placespawner.rabbit`.

The plugin is designed as a safer replacement for loose command shops: players browse categories in a hardened inventory GUI, see which spawners their group has unlocked, pay through the Vault economy provider backed by CMI money, and receive one trusted Paper spawner item at a time.

## Player Flow

Players run:

```text
/spawners
```

The main GUI shows:

- a friendly spawner category for farm and companion mobs
- an angry spawner category that is browsable but disabled by default
- an event spawner category for Valentines, Summer, Halloween, and Christmas selections
- a sell-to-server section, disabled by default
- a special Silk Touch V pickaxe button, disabled until the exact item details are finalized
- a book that runs the configured CMI ctext guide command
- the player head in the bottom-left with LuckPerms group, CMI/Vault balance, and unlocked friendly count
- a bottom-right button that returns to `/menu`

Subpages use the same light-blue glass border and return to the previous Spawners page instead of immediately opening `/menu`.

## Commands

```text
/spawners
/spawners info
/spawners help
/spawners reload
/spawners admin give <player> <type> [amount]
/spawners admin setupcommands
/spawners debug item
/spawners debug discovered
/spawners debug all
```

Examples:

```text
/spawners
/spawners admin setupcommands
/spawners admin give mrfloris rabbit 1
/spawners admin give mrfloris cow 4
/spawners debug item
/spawners debug discovered
```

Console can use non-GUI admin commands. Players use `/spawners` in game to open the shop.

## Pricing

Default pricing follows the requested progression:

| Category | Default price |
| --- | ---: |
| Global friendly spawners | $350,000 |
| Member friendly tier | 20% higher |
| Builder friendly tier | 44% higher |
| Rogue friendly tier | 73% higher |
| Angry spawners | $750,000 |
| Event spawners | $750,000 |
| Sell-to-server buyback | $150,000 |

The sell section is built but disabled by default. When enabled, it sells one spawner from the player's main hand at a time.

## Default Friendly Tiers

The default config starts with common friendly mobs and gradually unlocks rarer or more decorative mobs:

| Tier | Groups | Spawners |
| --- | --- | --- |
| Global | `default`, `1mb_player` | chicken, cow, pig, sheep |
| Member | `1mb_member`, `1mb_boosted` | rabbit, bee, turtle, cat, wolf, fox, horse, llama |
| Builder | `1mb_builder` | goat, frog, axolotl, camel, donkey, mule, ocelot, parrot, panda, mooshroom |
| Rogue | `1mb_rogue` | sniffer, armadillo, allay, villager, wandering trader, iron golem, snow golem, polar bear |

The GUI still checks the actual permission on the player. If a group inherits lower-tier permissions through LuckPerms, the shop naturally follows that inheritance. The exported setup commands are cumulative so a test server can be configured even if inheritance is not already present.

## CMI Spawner Permissions

Each spawner uses CMI's existing permission model:

```text
cmi.placespawner.<type>
cmi.dropspawner.<type>
```

The shop checks `cmi.placespawner.<type>` before a player can buy that spawner. The setup export includes both place and drop nodes so test groups can match the live server's expected behavior.

Run this after editing tiers:

```text
/spawners admin setupcommands
```

It writes:

```text
plugins/1MB-CMIAPI/Spawners/exports/luckperms-spawners-setup.txt
```

Review the file, then run the generated LuckPerms commands from console.

## Event Spawners

The event section is meant for seasonal spawner sales:

```text
valentines
summer
halloween
christmas
```

Each event can be enabled or disabled independently. Event spawners track purchases per player and calendar year, so a configured event spawner can be limited to one buy per year.

Data is stored under:

```text
plugins/1MB-CMIAPI/Spawners/players/<uuid>.yml
```

If the plugin is uninstalled, already-created spawner items remain normal Paper spawner items with their stored creature type. Annual purchase limits and shop disable switches require the plugin to be installed.

## Config

Main file:

```text
plugins/1MB-CMIAPI/Spawners/config.yml
```

Important paths:

```yaml
gui:
  title: Spawners
  filler-material: GLOBAL
  info-ctext-command: cmi ctext spawners {player}
  back-command: menu
shop:
  require-use-permission: true
  require-buy-permission: true
  require-cmi-place-permission: true
  cmi-place-permission-format: cmi.placespawner.{type}
  cmi-drop-permission-format: cmi.dropspawner.{type}
economy:
  enabled: true
  provider: Vault
  base-friendly-price: 350000.0
  tier-price-increase: 0.2
  angry-price: 750000.0
  event-price: 750000.0
spawners:
  angry:
    enabled: false
    browsable: true
sell:
  enabled: false
  price: 150000.0
pickaxe:
  enabled: false
```

All defaults are commented when written. Existing values are preserved on reload, and missing defaults are added safely.

## Permissions

```text
onembcmi.spawners.use
onembcmi.spawners.buy
onembcmi.spawners.pickaxe
onembcmi.spawners.sell
onembcmi.spawners.admin
onembcmi.spawners.reload
onembcmi.spawners.give
onembcmi.spawners.setup
onembcmi.spawners.debug
```

`onembcmi.spawners.use`, `onembcmi.spawners.buy`, `onembcmi.spawners.pickaxe`, and `onembcmi.spawners.sell` default to true. Admin permissions default to false, including the admin parent, so staff access should be granted explicitly through LuckPerms.

The actual spawner unlocks are not `onembcmi` permissions. They are CMI permissions:

```text
cmi.placespawner.rabbit
cmi.dropspawner.rabbit
```

## Safety Notes

Spawners uses the shared hardened GUI service: custom holders, cancelled unsafe clicks/drags, delayed close actions, and same-slot click debouncing. Purchases also have their own short action lock, check inventory space before taking money, refund on inventory failure, and never trust client-side item movement inside the GUI.

Command dispatch is limited to fixed configured commands with only the online Paper player name inserted. Command strings containing semicolons, pipes, angle brackets, or newlines are rejected.

The plugin does not use RCON. It writes an audit log for buy, sell, admin-give, and setup-export actions:

```text
plugins/1MB-CMIAPI/Spawners/logs/spawners.log
```

## CMI, CMILib, LuckPerms, Vault, And Paper API

CMI and CMILib are required because this project loads through the shared 1MB-CMIAPI library environment. CMI remains responsible for spawner place/drop permissions and is expected to be the economy manager behind Vault.

LuckPerms is optional at runtime but used for the player-head primary group display when available. Vault is used for balance checks, withdrawals, and deposits so CMI's economy provider can remain the money backend.

Paper APIs used include runtime `EntityType` discovery, `Material.SPAWNER`, `BlockStateMeta`, `CreatureSpawner#setSpawnedType`, Adventure item names/lore, PDC item metadata, and inventory GUI handling through the shared library.

[Documentation index](../README.md)
