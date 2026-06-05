# Spawners

Spawners adds a player-facing `/spawners` shop GUI for buying CMI-managed mob spawners. It discovers supported spawner entity types from the Paper API at runtime, filters the configured lists to what the current server can actually create, and gates every purchase behind the matching CMI permission such as `cmi.placespawner.rabbit`.

The plugin is designed as a safer replacement for loose command shops: players browse categories in a hardened inventory GUI, see which spawners their group has unlocked, pay through the Vault economy provider backed by CMI money, and receive one trusted Paper spawner item at a time.

## Player Flow

Players run:

```text
/spawners
```

The main GUI shows:

- a friendly spawner category selector for farm and companion mob tiers
- an angry spawner category that is browsable but disabled by default
- a restricted spawner category that only appears for staff with the configured restricted permission
- an event spawner category for Valentines, Summer, Halloween, and Christmas selections
- an event progress page showing which yearly event spawners the player has bought and which stock remains
- a sell-to-server section, disabled by default
- a special Silk Touch V pickaxe button, disabled until the exact item details are finalized
- a book that runs the configured CMI ctext guide command
- the player head in the bottom-left with LuckPerms group, CMI/Vault balance, and unlocked friendly count
- a bottom-right button that returns to `/menu`

Subpages use the same light-blue glass border and return to the previous Spawners page instead of immediately opening `/menu`.

Friendly spawners are split by configured tier. The default pages are Global, Member, Builder, and Rogue, and any future configured tier such as Patron gets its own paginated page automatically. The GUI title includes the tier name and page number so players can tell where they are.

Shop entries use matching spawn egg icons when Paper exposes a spawn egg material for that entity type. Entries that are currently buyable for the player receive a hidden-enchant glint; locked, disabled, sold-out, or yearly-limit-reached entries stay visible without the glint.

## Commands

```text
/spawners
/spawners info
/spawners help
/spawners progress
/spawners reload
/spawners admin give <player> <type> [amount]
/spawners admin gui
/spawners admin setupcommands
/spawners debug item
/spawners debug discovered
/spawners debug all
```

Examples:

```text
/spawners
/spawners progress
/spawners admin gui
/spawners admin setupcommands
/spawners admin give mrfloris rabbit 1
/spawners admin give mrfloris cow 4
/spawners debug item
/spawners debug discovered
```

Console can use non-GUI admin commands. Players use `/spawners` in game to open the shop, and `/spawners progress` to view yearly event collection progress.

## Pricing

Default pricing follows the requested progression:

| Category | Default price |
| --- | ---: |
| Global friendly spawners | $350,000 |
| Member friendly tier | 20% higher |
| Builder friendly tier | 44% higher |
| Rogue friendly tier | 73% higher |
| Angry spawners | $750,000 |
| Restricted spawners | $1,000,000 |
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
| Rogue | `1mb_rogue` | sniffer, armadillo, allay, villager, wandering trader, snow golem |

The GUI still checks the actual permission on the player. If a group inherits lower-tier permissions through LuckPerms, the shop naturally follows that inheritance. The exported setup commands are cumulative so a test server can be configured even if inheritance is not already present.

The tier selector is driven by `spawners.friendly.tier-order`. Adding another tier in config makes it appear as a separate friendly page without needing code changes.

Paper exposes some unusual spawnable entity ids that should not become player shop stock. Spawners hard-filters configured `spawners.blocked-entity-ids` everywhere, including player pages, event pages, and admin give tab suggestions. The default blocklist includes utility/projectile/display entities such as armor stands, mannequins, lightning-like or non-mob entries, minecarts, item frames, display entities, fireballs, arrows, and end crystals.

Hostile or risky mobs can be listed under the angry category, which is browsable but disabled by default. Boss or extreme-risk ids such as wither, ender dragon, warden, and giant live in `spawners.restricted.entities` instead. Restricted spawners only appear in game for senders with `onembcmi.spawners.restricted` or the configured restricted permission, and buying remains controlled separately by `spawners.restricted.enabled`.

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
plugins/1MB-CMIAPI/Spawners/stock.yml
```

`stock.yml` tracks per-year event totals and per-spawner totals when stock caps are enabled. Use `events.<event>.global-stock-per-year` for a whole seasonal pool and `events.<event>.per-spawner-stock-per-year` for each spawner type in that event. Set either value to `-1` for unlimited stock.

If the plugin is uninstalled, already-created spawner items remain normal Paper spawner items with their stored creature type. Annual purchase limits, stock caps, Discord logs, and shop disable switches require the plugin to be installed.

## Admin GUI

Admins with `onembcmi.spawners.gui` can run:

```text
/spawners admin gui
```

The admin GUI can toggle angry buying, event buying, stock tracking, sell section, pickaxe section, purchase confirmations, friendly tier enabled states, and seasonal event enabled states. Stock usage is reviewable in the GUI; stock caps are scalar config values and can be changed with shared debug config commands.

## Confirmations And Logs

Spawner and pickaxe purchases open a confirmation screen before money is withdrawn. The final purchase handler re-checks permissions, stock, balance, and inventory space after the confirmation click, so stale GUI clicks cannot bypass the current config state.

When enabled, DiscordSRV logs are sent through the configured console command:

```yaml
discord-log:
  enabled: true
  command: discordsrv broadcast
  channel-id: '#1393795584217059370'
  log-buys: true
  log-sells: true
  log-admin-give: true
```

The Discord log message is sanitized before dispatch and supports `{action}`, `{actor}`, `{player}`, `{type}`, `{type_id}`, `{amount}`, `{price}`, `{category}`, and `{tier}`.

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
  use-spawn-egg-icons: true
  available-spawners-glint: true
shop:
  require-use-permission: true
  require-buy-permission: true
  require-cmi-place-permission: true
  cmi-place-permission-format: cmi.placespawner.{type}
  cmi-drop-permission-format: cmi.dropspawner.{type}
  confirmation:
    enabled: true
    spawners: true
    pickaxe: true
economy:
  enabled: true
  provider: Vault
  base-friendly-price: 350000.0
  tier-price-increase: 0.2
  angry-price: 750000.0
  restricted-price: 1000000.0
  event-price: 750000.0
spawners:
  blocked-entity-ids:
  - armor_stand
  - mannequin
  auto-discovery:
    include-uncategorized-friendly: true
    auto-tier-id: rogue
    exclude-from-friendly:
    - zombie
    - wither
    - ender_dragon
    - warden
  angry:
    enabled: false
    browsable: true
  restricted:
    enabled: false
    browsable: true
    permission: onembcmi.spawners.restricted
    entities:
    - wither
    - ender_dragon
    - warden
events:
  enabled: true
  purchase-limit-per-year: 1
  stock:
    enabled: true
    show-in-lore: true
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
onembcmi.spawners.progress
onembcmi.spawners.buy
onembcmi.spawners.pickaxe
onembcmi.spawners.sell
onembcmi.spawners.admin
onembcmi.spawners.reload
onembcmi.spawners.give
onembcmi.spawners.gui
onembcmi.spawners.setup
onembcmi.spawners.debug
onembcmi.spawners.restricted
```

`onembcmi.spawners.use`, `onembcmi.spawners.progress`, `onembcmi.spawners.buy`, `onembcmi.spawners.pickaxe`, and `onembcmi.spawners.sell` default to true. Admin permissions default to false, including the admin parent, so staff access should be granted explicitly through LuckPerms.

`onembcmi.spawners.restricted` also defaults to false and is intentionally separate from the admin parent. Grant it only to owner-level staff who should browse or admin-give restricted boss/extreme-risk spawner types.

The actual spawner unlocks are not `onembcmi` permissions. They are CMI permissions:

```text
cmi.placespawner.rabbit
cmi.dropspawner.rabbit
```

## Safety Notes

Spawners uses the shared hardened GUI service: custom holders, cancelled unsafe clicks/drags, delayed close actions, and same-slot click debouncing. Purchases also have their own short action lock, check inventory space before taking money, refund on inventory failure, and never trust client-side item movement inside the GUI.

Spawn egg icons and the hidden-enchant glint are visual shop indicators only. Purchased items are still generated as real Paper spawner items with PDC identity and a stored spawned entity type.

Command dispatch is limited to fixed configured commands with only the online Paper player name inserted. Command strings containing semicolons, pipes, angle brackets, or newlines are rejected.

The plugin does not use RCON. It writes an audit log for buy, sell, admin-give, and setup-export actions:

```text
plugins/1MB-CMIAPI/Spawners/logs/spawners.log
```

DiscordSRV staff logging is optional and command-based. It only dispatches when DiscordSRV is loaded and the configured command root exists.

## CMI, CMILib, LuckPerms, Vault, And Paper API

CMI and CMILib are required because this project loads through the shared 1MB-CMIAPI library environment. CMI remains responsible for spawner place/drop permissions and is expected to be the economy manager behind Vault.

LuckPerms is optional at runtime but used for the player-head primary group display when available. Vault is used for balance checks, withdrawals, and deposits so CMI's economy provider can remain the money backend. DiscordSRV is optional and only used for staff-channel buy/sell/admin-give logs.

Paper APIs used include runtime `EntityType` discovery, `Material.SPAWNER`, `BlockStateMeta`, `CreatureSpawner#setSpawnedType`, Adventure item names/lore, PDC item metadata, and inventory GUI handling through the shared library.

[Documentation index](../README.md)
