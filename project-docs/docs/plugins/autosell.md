# AutoSell

AutoSell adds an opt-in `/autosell` inventory cleanup feature for players. It reads CMI `Worth.yml` values, sells only selected pure vanilla items from normal inventory storage slots, and pays through the CMI-backed Vault economy provider.

The feature is intentionally conservative. It is off by default for every player, never scans the hotbar, offhand, armor, or open containers, and refuses custom items with names, lore, enchantments, PDC, custom model data, damage, storage contents, or other meaningful custom metadata.

## Player Flow

Players open:

```text
/autosell
```

The GUI uses the shared hardened GUI service with safe holders, cancelled clicks and drags, duplicate click protection, delayed close handling, and the global light-blue filler material. The main page includes:

- a global on/off toggle
- category toggles for CMI worth items
- per-category material pages where players can toggle individual items
- value filters and notification settings
- optional world toggles
- a preview button that explains what would sell right now
- a recent-results button for batched sale history
- the player head with today's AutoSell total, cap, and broker level

AutoSell only runs after a short delayed batch, usually after a pickup or chunk move. The final sale runs on the main thread, snapshots exact stacks, rechecks that the inventory still matches, removes the items, pays the player, and refunds removed stacks if the economy payment fails.

When chat notifications are selected, the batched sale message is hoverable and clickable. Hover shows the batch total, trigger, top sold materials, daily cap progress, and broker status. Click opens `/autosell recent` for the detailed sale history. Actionbar, title, and bossbar notification modes remain visual-only because Minecraft clients do not support hover/click actions there.

## Safety Model

AutoSell is built around anti-dupe and anti-farm guards:

- off by default per player
- global `enabled` emergency toggle in config
- direct CMI `Worth.yml` read with live cache refresh, including quoted numeric CMI values
- only normal inventory slots `9..35` are scanned
- hotbar, offhand, armor, and open containers are never sold
- meaningful custom item meta is rejected by default while normal Paper item metadata is allowed
- shulker boxes, bundles, and container-style storage are rejected by default
- hard material blacklist blocks sensitive materials even if CMI has a price
- hard world blacklist blocks event/build/test worlds
- optional world toggles let players opt into worlds such as Nether and End
- debug worlds such as `spawn` only appear while debug is enabled
- chunk-change guard requires movement between successful sale cycles
- overheat guard warns and pauses repeated sales from the same small area
- daily money caps are permission-based and can be increased by broker progress
- suspicious volume warnings are stored and can be exported

This plugin should not be used as a hopper, farm, or AFK seller. It is meant for players who move around and manually mine, dig, chop, or gather while keeping their inventory tidy.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/autosell` | player | Opens the AutoSell GUI. Console prints status. |
| `/autosell info` | anyone | Shows a player-friendly intro and public docs link. |
| `/autosell help` | anyone | Shows commands available to the sender. |
| `/autosell status` | player/console | Shows player status or console plugin status. |
| `/autosell preview` | player | Shows what would sell from the player's normal inventory right now. |
| `/autosell recent` | player | Shows recent batched sale results. |
| `/autosell toggle` | player | Turns AutoSell on or off for the player. |
| `/autosell categories` | player | Opens the category toggle GUI. |
| `/autosell items <category>` | player | Opens per-material toggles for one category. |
| `/autosell filters` | player | Opens filter and notification settings. |
| `/autosell worlds` | player | Opens optional world toggles. |
| `/autosell category <id> on\|off` | player | Toggles one category from chat. |
| `/autosell item <material> on\|off` | player | Toggles one material from chat. |
| `/autosell debug item` | staff/player with debug | Explains why the held item is or is not eligible. |
| `/autosell admin reload` | admin/console | Reloads config, player data, and CMI Worth.yml cache. |
| `/autosell admin check` | admin/console | Prints colored readiness checks for economy, worth, worlds, caps, and hardening. |
| `/autosell admin warnings` | admin/console | Shows recent suspicious sale warnings. |
| `/autosell admin warnings blacklist <number>` | admin/console | Adds the material from a numbered material warning to the hard blacklist. |
| `/autosell admin export` | admin/console | Writes a Discord-friendly Markdown report. |
| `/autosell admin blacklist list` | admin/console | Lists hard-blocked materials. |
| `/autosell admin blacklist add <material>` | admin/console | Adds a material to the hard blacklist. |
| `/autosell admin blacklist remove <material>` | admin/console | Removes a material from the hard blacklist. |
| `/autosell admin category move <material> <category>` | admin/console | Moves a material into another AutoSell category. |
| `/autosell admin inspect <player>` | admin/console | Shows one player's AutoSell profile and cap state. |
| `/autosell admin stats <player>` | admin/console | Alias for player profile totals. |

Direct console is treated as trusted for AutoSell status, debug, report, reload, and admin maintenance commands. Commands that need a player inventory or GUI still require an in-game player.

Examples:

```text
/autosell
/autosell toggle
/autosell preview
/autosell items mining
/autosell category mining on
/autosell category fancy off
/autosell item cobblestone on
/autosell item diamond_block off
/autosell debug item
/autosell admin check
/autosell admin warnings
/autosell admin warnings blacklist 1
/autosell admin blacklist add diamond_block
/autosell admin category move raw_iron mining
/autosell admin inspect mrfloris
/autosell admin export
```

## Economy And Caps

AutoSell pays a configured convenience multiplier against CMI `Worth.yml`. The default multiplier is `0.90`, so manual selling can remain more profitable while AutoSell remains useful for inventory cleanup.

Daily caps are permission-aware:

| Permission | Default cap |
| --- | ---: |
| default player access | $10,000/day |
| `onembcmi.autosell.cap.20000` | $20,000/day |
| `onembcmi.autosell.cap.100000` | $100,000/day |
| `onembcmi.autosell.cap.250000` | $250,000/day |
| `onembcmi.autosell.cap.500000` | $500,000/day |
| `onembcmi.autosell.cap.unlimited` | unlimited |

Broker progress counts legitimate sold item volume. By default, every 10,000 sold items can add broker points and a small temporary daily bonus, capped by `broker.max-multiplier-bonus`. Broker points can also unlock higher daily caps through config.

## Worlds

Default world behavior:

- soft whitelist: `wild`, `general`
- optional player toggles: `nether`, `end`
- debug-only world: `spawn`
- hard blacklist: `acid`, `cave`, `oneblock`, `skyblock`, `skygrid`, `builders`, `halloween`, `santa`, `valentine`, `thanksgiving`, `summer`

For test-server spawn testing, enable `debug: true` and either leave `spawn` in `worlds.debug-worlds` for new test profiles or add `spawn` to `worlds.soft-whitelist`.

## Config Files

Main config:

```text
plugins/1MB-CMIAPI/AutoSell/config.yml
```

Player data and reports:

```text
plugins/1MB-CMIAPI/AutoSell/data.yml
plugins/1MB-CMIAPI/AutoSell/exports/
```

AutoSell reads CMI worth values from:

```text
plugins/CMI/Saves/Worth.yml
```

The Worth cache is refreshed automatically on a short interval and can be forced with `/autosell admin reload`.

Plain vanilla items can still carry harmless Paper metadata internally. AutoSell does not reject those empty/default item components, but it still blocks named, lored, enchanted, damaged, PDC-marked, storage, and custom-model items.

The safety setting for this is `selling.reject-custom-item-meta`. Keep it enabled for production so AutoSell only handles plain, ordinary items.

## Permissions

Player permissions default to true where useful:

```text
onembcmi.autosell.use
onembcmi.autosell.toggle
onembcmi.autosell.preview
```

Admin permissions default to false:

```text
onembcmi.autosell.admin
onembcmi.autosell.reload
onembcmi.autosell.debug
onembcmi.autosell.warnings
onembcmi.autosell.export
```

Cap permissions default to false and should be assigned through LuckPerms groups:

```text
onembcmi.autosell.cap.20000
onembcmi.autosell.cap.100000
onembcmi.autosell.cap.250000
onembcmi.autosell.cap.500000
onembcmi.autosell.cap.unlimited
```

## Hooks

- CMI and CMILib are required by the project and provide the worth/economy context.
- `1MB-CMIAPI-Lib` provides shared feature metadata, config/comment handling, debug/help/info behavior, prefix styling, and the hardened GUI service.
- Vault is required at runtime for economy payments; on 1MoreBlock this is backed by CMI money.
- LuckPerms can grant cap and admin permissions.
- PlaceholderAPI is optional for future expansion.

## Notes

If AutoSell is removed or globally disabled, no items are changed. Existing player inventories stay normal Minecraft inventories, and the plugin simply stops scanning and selling until it is re-enabled.
