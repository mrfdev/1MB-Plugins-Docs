# Exchange

Exchange is the 1MB-CMIAPI migration of the standalone `1MBTrades` plugin. It keeps the menu-driven exchange idea, but the public command is now `/exchange` instead of `/_trade`, and runtime data lives under the shared 1MB-CMIAPI folder.

Disable or remove the old standalone `1MBTrades` jar before testing this feature jar. Both versions manage similar exchange files, PlaceholderAPI identifiers, and GUI flows, so only the new feature plugin should own this flow.

## Purpose

Exchange gives players a GUI where configured exchanges can trade required items, money, or EXP levels for command-based rewards. A trade can be a seasonal event exchange, a vote-token hand-in, a one-time kit unlock, or a repeatable resource turn-in.

Each trade is a separate YAML file, so staff can add, clone, disable, and test individual exchanges without rebuilding the jar. The plugin validates trade files on reload, tracks per-player usage, supports max-use limits, and can hide completed exchanges from normal players.

## Migration Notes

- The current jar is `1MB-CMIAPI-Exchange-v1.0.0-522-j25-26.2.jar`.
- The public command is `/exchange`.
- The old standalone command `/_trade` is not registered by this feature plugin.
- Runtime config lives at `plugins/1MB-CMIAPI/Exchange/config.yml`.
- Trade definitions live at `plugins/1MB-CMIAPI/Exchange/Exchanges/*.yml`.
- Player usage data lives at `plugins/1MB-CMIAPI/Exchange/playerData/<uuid>.yml`.
- Audit logs live at `plugins/1MB-CMIAPI/Exchange/logs/`.
- PlaceholderAPI uses the clean `onembexchange` identifier.

## Commands

```text
/exchange
/exchange info
/exchange help
/exchange open [trade] [player]
/exchange open category <category> [player]
/exchange reload
/exchange debug
/exchange debug status
/exchange debug commands [page]
/exchange debug permissions [page]
/exchange debug placeholders [page]
/exchange debug config [page]
/exchange debug set config <path> <value>
/exchange debug all
/exchange debug index
/exchange debug player <player>
/exchange debug <trade>
/exchange debug <trade> reset <player|all>
/exchange create <id>
/exchange clone <source> <newId>
/exchange delete <trade>
/exchange delete confirm <trade>
/exchange capture requirements <trade>
/exchange capture icon <trade>
/exchange capture reward <trade>
/exchange set display <trade> <value>
/exchange set description <trade> <value>
/exchange set permission <trade> <value>
/exchange set completion <trade> <value>
/exchange set max <trade> <value>
/exchange set ctext <trade> <value>
/exchange set sort <trade> <value>
/exchange set hide <trade> <true|false>
/exchange set worlds <trade> <global|world1,world2>
/exchange set money <trade> <amount>
/exchange set exp <trade> <levels>
/exchange set start <trade> <MM-DD-YYYY|none>
/exchange set end <trade> <MM-DD-YYYY|none>
/exchange set category <trade> <category>
/exchange toggle <trade> <true|false>
/exchange command add <trade> <open|info|success|fail> <command>
/exchange command clear <trade> <open|info|success|fail>
/exchange test <trade> [player]
```

## Example Commands

```text
/exchange
/exchange info
/exchange open summer_event
/exchange open category vote
/exchange reload
/exchange debug all
/exchange debug config
/exchange debug set config settings.trade-click-cooldown-ms 1000
/exchange debug index
/exchange debug summer_event
/exchange debug player mrfloris
/exchange debug summer_event reset mrfloris
/exchange create winter_event
/exchange clone summer_event autumn_event
/exchange capture requirements summer_event
/exchange capture icon summer_event
/exchange capture reward summer_event
/exchange set display summer_event <#F6D365><bold>Summer Event Trade</bold></#F6D365>
/exchange set description summer_event Bring your event tokens here.
/exchange set permission summer_event onembcmi.exchange.summer_event
/exchange set completion summer_event onembcmi.exchange.completed.summer_event
/exchange set max summer_event 1
/exchange set worlds summer_event survival,oneblock
/exchange set money summer_event 2500
/exchange set exp summer_event 5
/exchange set start summer_event 06-01-2026
/exchange set end summer_event 08-31-2026
/exchange toggle summer_event false
/exchange command add summer_event success console:cmi kit summer %player%
/exchange command clear summer_event fail
/exchange test summer_event mrfloris
```

## Permissions

```text
onembcmi.exchange.admin
onembcmi.exchange.<tradeId>
onembcmi.exchange.completed.<tradeId>
```

`onembcmi.exchange.admin` allows all Exchange admin commands.

`onembcmi.exchange.<tradeId>` is the default per-trade access permission when a trade file does not define its own `permission`. The default prefix is configured at `settings.trade-permission-prefix`.

Trade files can also define:

```text
permission: "onembcmi.exchange.summer_event"
completion-permission: "onembcmi.exchange.completed.summer_event"
```

The completion permission is a marker used by placeholders, CMI kits, LuckPerms commands, or your own reward logic. The plugin does not automatically grant it unless you add a success command that does so.

## Placeholders

Shared 1MB-CMIAPI placeholders:

```text
%onembcmi_exchange.enabled%
%onembcmi_exchange.exchanges_loaded%
%onembcmi_exchange.enabled_exchanges%
%onembcmi_exchange.tracked_players%
%onembcmi_exchange.visible_exchanges%
%onembcmi_exchange.ready_exchanges%
%onembcmi_exchange.completed_exchanges%
```

Exchange-specific PlaceholderAPI placeholders:

```text
%onembexchange_version%
%onembexchange_build%
%onembexchange_exchanges_loaded%
%onembexchange_enabled_exchanges%
%onembexchange_tracked_players%
%onembexchange_visible_exchanges%
%onembexchange_ready_exchanges%
%onembexchange_completed_exchanges%
%onembexchange_exchange.<tradeId>%
%onembexchange_exchange.<tradeId>.status%
%onembexchange_exchange.<tradeId>.missing_summary%
%onembexchange_exchange.<tradeId>.can_exchange%
```

Common trade fields:

```text
%onembexchange_exchange.summer_event.display_name%
%onembexchange_exchange.summer_event.description%
%onembexchange_exchange.summer_event.category%
%onembexchange_exchange.summer_event.enabled%
%onembexchange_exchange.summer_event.permission%
%onembexchange_exchange.summer_event.completion_permission%
%onembexchange_exchange.summer_event.money_cost%
%onembexchange_exchange.summer_event.exp_cost%
%onembexchange_exchange.summer_event.required_items_summary%
%onembexchange_exchange.summer_event.status%
%onembexchange_exchange.summer_event.status_key%
%onembexchange_exchange.summer_event.can_exchange%
%onembexchange_exchange.summer_event.completed%
%onembexchange_exchange.summer_event.remaining_exchanges%
%onembexchange_exchange.summer_event.missing_summary%
```

Example checks:

```text
papi parse mrfloris %onembcmi_exchange.ready_exchanges%
papi parse mrfloris %onembexchange_exchange.summer_event.status%
papi parse mrfloris %onembexchange_exchange.summer_event.missing_summary%
```

## Config

Config path:

```text
plugins/1MB-CMIAPI/Exchange/config.yml
```

The config is generated through the shared comment-aware 1MB-CMIAPI settings layer. Missing defaults are added, comments are re-applied on reload, and existing admin values are preserved.

Important keys:

```text
enabled
debug
settings.admin-permission
settings.trade-permission-prefix
settings.global-alias
settings.global-command
settings.locale-file
settings.player-exp-placeholder
settings.player-balance-placeholder
settings.close-on-success
settings.send-plugin-result-messages
settings.trade-click-cooldown-ms
settings.hide-completed-on-direct-open
settings.blacklisted-worlds
gui.use-global-filler-material
gui.filler.material
gui.info-book.material
gui.trade-button.material
gui.back-button.material
gui.close-button.material
gui.previous-page.material
gui.next-page.material
gui.page-indicator.material
gui.ready-status.material
gui.missing-status.material
gui.locked-status.material
gui.reward-preview.material
global-commands.open-index
global-commands.open-trade
global-commands.info
global-commands.success
global-commands.fail
```

Safe scalar values can be changed in game through:

```text
/exchange debug set config settings.trade-click-cooldown-ms 1000
/exchange debug set config settings.close-on-success false
```

List values such as command hooks and world lists should be edited in the file and applied with `/exchange reload`.

## Trade File Format

Trade files live in:

```text
plugins/1MB-CMIAPI/Exchange/Exchanges/
```

Example:

```yaml
id: summer_event
enabled: true
sort-order: 0
category: summer
display-name: "<#F6D365><bold>Summer Event Trade</bold></#F6D365>"
description:
  - "<gray>Bring event tokens here.</gray>"
permission: "onembcmi.exchange.summer_event"
completion-permission: "onembcmi.exchange.completed.summer_event"
max-trades: 1
hide-when-completed: true
allowed-worlds:
  - global
money-cost: 0
exp-cost: 0
start-date: ""
end-date: ""
ctext-file: "summer-event"
requirements: []
icon-item: null
reward-item: null
commands:
  open: []
  info: []
  success:
    - "console:lp user %player% permission set onembcmi.exchange.completed.summer_event true"
    - "console:cmi kit summer %player%"
  fail: []
```

Use `/exchange capture requirements <trade>` while the required items are in your main inventory. Use `/exchange capture icon <trade>` and `/exchange capture reward <trade>` while holding the preview item in your main hand.

## Command Hooks

Configured commands can use these prefixes:

```text
console:
player:
message:
actionbar:
```

Typical CMI examples:

```text
console:cmi msg %player% !<green>Exchange complete.</green>
console:cmi titlemsg %player% &6Exchange Complete \n &fReward unlocked
console:cmi sound ENTITY_PLAYER_LEVELUP -v:0.8 %player% -s
console:cmi kit summer %player%
```

Supported replacement examples:

```text
%player%
%player_name%
%player_uuid%
%exchange_id%
%exchange_name%
%category%
%required_items%
%money_cost%
%exp_cost%
%missing_summary%
%remaining_exchanges%
%current_world%
```

Any PlaceholderAPI placeholder can also be resolved where the plugin has a player context.

## Data

```text
plugins/1MB-CMIAPI/Exchange/playerData/<uuid>.yml
plugins/1MB-CMIAPI/Exchange/logs/trades-YYYY-MM-DD.log
```

Player data records usage counts by trade id. This is what enforces `max-trades`, supports `/exchange debug player <player>`, and lets admins reset one trade for one player.

Audit logs record admin changes and trade attempts with useful context such as trade id, player, status, costs, and missing requirements.

## CMI, CMILib, And CMI-API Usage

Exchange depends on CMI, CMILib, and `1MB-CMIAPI-Lib`. It uses the shared 1MB-CMIAPI feature registry, MiniMessage output, config comments, debug metadata, runtime paths, and PlaceholderAPI registration path.

CMI is used mainly through configured command hooks, so server owners can keep using CMI kits, ctext, titlemsg, sounds, messages, economy commands, and LuckPerms reward commands from trade definitions.

## Paper API Usage

Exchange uses Paper/Bukkit command APIs, custom inventory holders, inventory click and drag events, scheduler tasks, item serialization, player inventory APIs, YAML configuration, plugin metadata, and PlaceholderAPI hooks when available.

GUI inventories use a custom `InventoryHolder`, cancel top-inventory clicks and drags, reject non-button click types, track active GUI sessions by player UUID, and delay close-button actions by a few ticks for Paper custom-inventory safety.

## Security Notes

- `/exchange` is player-facing and only opens configured GUI menus.
- All admin mutation commands require `onembcmi.exchange.admin`.
- GUI clicks are cancelled and only the plugin's own top inventory is handled.
- The confirm button has a per-player click cooldown and an in-flight processing guard.
- Dynamic command alias input is sanitized before command dispatch.
- Inline admin values reject line breaks and NUL characters.
- Trade ids are restricted to lowercase letters, numbers, underscores, and hyphens.
- Config edits through debug are limited to known scalar config paths.
- Command hooks are trusted server-owner config. Keep them limited to safe CMI/LuckPerms/Vault/server automation.
- Remove the old standalone plugin before testing so two jars do not manage the same exchange files and GUI flow.

## Testing Checklist

```text
/exchange
/exchange info
/exchange help
/exchange open summer_event
/exchange open category summer
/exchange debug all
/exchange debug config
/exchange debug summer_event
/exchange test summer_event mrfloris
/exchange reload
papi parse mrfloris %onembexchange_exchange.summer_event.status%
```

[Plugin index](README.md) | [Documentation index](../README.md)
