# Trades

Trades is the 1MB-CMIAPI migration of the standalone `1MBTrades` plugin. It keeps the trade-menu idea, but the public command is now `/trade` instead of `/_trade`, and runtime data lives under the shared 1MB-CMIAPI folder.

Disable or remove the old standalone `1MBTrades` jar before testing this feature jar. Both versions manage similar trade files, PlaceholderAPI identifiers, and GUI flows, and only one plugin should own the live `/trade` command.

## Purpose

Trades gives players a GUI where configured exchanges can trade required items, money, or EXP levels for command-based rewards. A trade can be a seasonal event exchange, a vote-token hand-in, a one-time kit unlock, or a repeatable resource turn-in.

Each trade is a separate YAML file, so staff can add, clone, disable, and test individual trades without rebuilding the jar. The plugin validates trade files on reload, tracks per-player usage, supports max-use limits, and can hide completed trades from normal players.

## Migration Notes

- The new jar is `1MB-CMIAPI-Trades-v1.0.0-258-j25-26.1.2.jar`.
- The public command is `/trade`.
- The old standalone command `/_trade` is not registered by this feature plugin.
- Runtime config lives at `plugins/1MB-CMIAPI/Trades/config.yml`.
- Trade definitions live at `plugins/1MB-CMIAPI/Trades/Trades/*.yml`.
- Player usage data lives at `plugins/1MB-CMIAPI/Trades/playerData/<uuid>.yml`.
- Audit logs live at `plugins/1MB-CMIAPI/Trades/logs/`.
- Legacy PlaceholderAPI placeholders keep the `onembtrades` identifier for compatibility.

## Commands

```text
/trade
/trade info
/trade help
/trade open [trade] [player]
/trade open category <category> [player]
/trade reload
/trade debug
/trade debug status
/trade debug commands [page]
/trade debug permissions [page]
/trade debug placeholders [page]
/trade debug config [page]
/trade debug set config <path> <value>
/trade debug all
/trade debug index
/trade debug player <player>
/trade debug <trade>
/trade debug <trade> reset <player|all>
/trade create <id>
/trade clone <source> <newId>
/trade delete <trade>
/trade delete confirm <trade>
/trade capture requirements <trade>
/trade capture icon <trade>
/trade capture reward <trade>
/trade set display <trade> <value>
/trade set description <trade> <value>
/trade set permission <trade> <value>
/trade set completion <trade> <value>
/trade set max <trade> <value>
/trade set ctext <trade> <value>
/trade set sort <trade> <value>
/trade set hide <trade> <true|false>
/trade set worlds <trade> <global|world1,world2>
/trade set money <trade> <amount>
/trade set exp <trade> <levels>
/trade set start <trade> <MM-DD-YYYY|none>
/trade set end <trade> <MM-DD-YYYY|none>
/trade set category <trade> <category>
/trade toggle <trade> <true|false>
/trade command add <trade> <open|info|success|fail> <command>
/trade command clear <trade> <open|info|success|fail>
/trade test <trade> [player]
```

## Example Commands

```text
/trade
/trade info
/trade open summer_event
/trade open category vote
/trade reload
/trade debug all
/trade debug config
/trade debug set config settings.trade-click-cooldown-ms 1000
/trade debug index
/trade debug summer_event
/trade debug player mrfloris
/trade debug summer_event reset mrfloris
/trade create winter_event
/trade clone summer_event autumn_event
/trade capture requirements summer_event
/trade capture icon summer_event
/trade capture reward summer_event
/trade set display summer_event <#F6D365><bold>Summer Event Trade</bold></#F6D365>
/trade set description summer_event Bring your event tokens here.
/trade set permission summer_event onembtrade.summer_event
/trade set completion summer_event onembtrade.completed.summer_event
/trade set max summer_event 1
/trade set worlds summer_event survival,oneblock
/trade set money summer_event 2500
/trade set exp summer_event 5
/trade set start summer_event 06-01-2026
/trade set end summer_event 08-31-2026
/trade toggle summer_event false
/trade command add summer_event success console:cmi kit summer %player%
/trade command clear summer_event fail
/trade test summer_event mrfloris
```

## Permissions

```text
onembtrade.admin
onembcmi.trades.admin
onembtrade.<tradeId>
```

`onembtrade.admin` allows all Trades admin commands and grants the shared `onembcmi.trades.admin` child permission through `plugin.yml`.

`onembtrade.<tradeId>` is the default per-trade access permission when a trade file does not define its own `permission`. The default prefix is configured at `settings.trade-permission-prefix`.

Trade files can also define:

```text
permission: "onembtrade.summer_event"
completion-permission: "onembtrade.completed.summer_event"
```

The completion permission is a marker used by placeholders, CMI kits, LuckPerms commands, or your own reward logic. The plugin does not automatically grant it unless you add a success command that does so.

## Placeholders

Shared 1MB-CMIAPI placeholders:

```text
%onembcmi_trades.enabled%
%onembcmi_trades.trades_loaded%
%onembcmi_trades.enabled_trades%
%onembcmi_trades.tracked_players%
%onembcmi_trades.visible_trades%
%onembcmi_trades.ready_trades%
%onembcmi_trades.completed_trades%
```

Legacy `onembtrades` PlaceholderAPI placeholders:

```text
%onembtrades_version%
%onembtrades_build%
%onembtrades_trades_loaded%
%onembtrades_enabled_trades%
%onembtrades_tracked_players%
%onembtrades_visible_trades%
%onembtrades_ready_trades%
%onembtrades_completed_trades%
%onembtrades_trade.<tradeId>%
%onembtrades_trade.<tradeId>.status%
%onembtrades_trade.<tradeId>.missing_summary%
%onembtrades_trade.<tradeId>.can_trade%
```

Common trade fields:

```text
%onembtrades_trade.summer_event.display_name%
%onembtrades_trade.summer_event.description%
%onembtrades_trade.summer_event.category%
%onembtrades_trade.summer_event.enabled%
%onembtrades_trade.summer_event.permission%
%onembtrades_trade.summer_event.completion_permission%
%onembtrades_trade.summer_event.money_cost%
%onembtrades_trade.summer_event.exp_cost%
%onembtrades_trade.summer_event.required_items_summary%
%onembtrades_trade.summer_event.status%
%onembtrades_trade.summer_event.status_key%
%onembtrades_trade.summer_event.can_trade%
%onembtrades_trade.summer_event.completed%
%onembtrades_trade.summer_event.remaining_trades%
%onembtrades_trade.summer_event.missing_summary%
```

Example checks:

```text
papi parse mrfloris %onembcmi_trades.ready_trades%
papi parse mrfloris %onembtrades_trade.summer_event.status%
papi parse mrfloris %onembtrades_trade.summer_event.missing_summary%
```

## Config

Config path:

```text
plugins/1MB-CMIAPI/Trades/config.yml
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
/trade debug set config settings.trade-click-cooldown-ms 1000
/trade debug set config settings.close-on-success false
```

List values such as command hooks and world lists should be edited in the file and applied with `/trade reload`.

## Trade File Format

Trade files live in:

```text
plugins/1MB-CMIAPI/Trades/Trades/
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
permission: "onembtrade.summer_event"
completion-permission: "onembtrade.completed.summer_event"
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
    - "console:lp user %player% permission set onembtrade.completed.summer_event true"
    - "console:cmi kit summer %player%"
  fail: []
```

Use `/trade capture requirements <trade>` while the required items are in your main inventory. Use `/trade capture icon <trade>` and `/trade capture reward <trade>` while holding the preview item in your main hand.

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
console:cmi msg %player% !<green>Trade complete.</green>
console:cmi titlemsg %player% &6Trade Complete \n &fReward unlocked
console:cmi sound ENTITY_PLAYER_LEVELUP -v:0.8 %player% -s
console:cmi kit summer %player%
```

Supported replacement examples:

```text
%player%
%player_name%
%player_uuid%
%trade_id%
%trade_name%
%category%
%required_items%
%money_cost%
%exp_cost%
%missing_summary%
%remaining_trades%
%current_world%
```

Any PlaceholderAPI placeholder can also be resolved where the plugin has a player context.

## Data

```text
plugins/1MB-CMIAPI/Trades/playerData/<uuid>.yml
plugins/1MB-CMIAPI/Trades/logs/trades-YYYY-MM-DD.log
```

Player data records usage counts by trade id. This is what enforces `max-trades`, supports `/trade debug player <player>`, and lets admins reset one trade for one player.

Audit logs record admin changes and trade attempts with useful context such as trade id, player, status, costs, and missing requirements.

## CMI, CMILib, And CMI-API Usage

Trades depends on CMI, CMILib, and `1MB-CMIAPI-Lib`. It uses the shared 1MB-CMIAPI feature registry, MiniMessage output, config comments, debug metadata, runtime paths, and PlaceholderAPI registration path.

CMI is used mainly through configured command hooks, so server owners can keep using CMI kits, ctext, titlemsg, sounds, messages, economy commands, and LuckPerms reward commands from trade definitions.

## Paper API Usage

Trades uses Paper/Bukkit command APIs, custom inventory holders, inventory click and drag events, scheduler tasks, item serialization, player inventory APIs, YAML configuration, plugin metadata, and PlaceholderAPI hooks when available.

GUI inventories use a custom `InventoryHolder`, cancel top-inventory clicks and drags, reject non-button click types, track active GUI sessions by player UUID, and delay close-button actions by a few ticks for Paper custom-inventory safety.

## Security Notes

- `/trade` is player-facing and only opens configured GUI menus.
- All admin mutation commands require `onembtrade.admin`.
- GUI clicks are cancelled and only the plugin's own top inventory is handled.
- The confirm button has a per-player click cooldown and an in-flight processing guard.
- Dynamic command alias input is sanitized before command dispatch.
- Inline admin values reject line breaks and NUL characters.
- Trade ids are restricted to lowercase letters, numbers, underscores, and hyphens.
- Config edits through debug are limited to known scalar config paths.
- Command hooks are trusted server-owner config. Keep them limited to safe CMI/LuckPerms/Vault/server automation.
- Remove the old standalone plugin before testing so two jars do not fight for `/trade`.

## Testing Checklist

```text
/trade
/trade info
/trade help
/trade open summer_event
/trade open category summer
/trade debug all
/trade debug config
/trade debug summer_event
/trade test summer_event mrfloris
/trade reload
papi parse mrfloris %onembtrades_trade.summer_event.status%
```

[Plugin index](README.md) | [Documentation index](../README.md)
