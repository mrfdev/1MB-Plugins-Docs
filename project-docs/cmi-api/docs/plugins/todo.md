# PlayerTodo

PlayerTodo gives each player a small personal `/todo` list. It is meant for simple reminders like building tasks, shopping notes, repayment reminders, or "try this new block" ideas without abusing CMI `/mail` as a notebook.

The feature stores data in the shared 1MB-CMIAPI playerdata folder under the `todo` section of each UUID file. Running `/todo` with no arguments lists open entries with the newest entry first.

## Purpose

Players can add quick notes while playing:

```text
/todo build a house
/todo use new blocks
/todo pay Bob 45k
```

They can then list, search, complete, reopen, and remove entries. Completed entries can be cleared separately, while lifetime completion count remains for milestones.

## Commands

```text
/todo
/todo <text>
/todo add <text>
/todo list [open|all|completed] [page] [asc|desc]
/todo page <page> [asc|desc]
/todo view <id>
/todo edit <id> <new text>
/todo done <id>
/todo complete <id>
/todo undo <id>
/todo reopen <id>
/todo remove <id> [confirm]
/todo delete <id> [confirm]
/todo clear completed
/todo search <keyword> [page]
/todo share <player> <id>
/todo status
/todo info
/todo help
/todo admin inspect <player> [page]
/todo admin purge <player> confirm
/todo admin reset <player>
/todo admin reload
/todo reload
/todo debug
/todo debug status
/todo debug commands [page]
/todo debug permissions [page]
/todo debug placeholders [page]
/todo debug config [page]
/todo debug set config <path> <value>
/todo debug all
```

`/todo help` is intentionally player-friendly and does not print permission nodes inline. Staff can use `/todo debug permissions` and `/todo debug commands` for the permission-oriented support view.

## Example Commands

```text
/todo build a starter house near /warp town
/todo add test copper blocks in the roof
/todo list
/todo list 5
/todo list all 2
/todo list 2 asc
/todo list oldest
/todo list open 2 desc
/todo view 4
/todo edit 4 test copper blocks in the greenhouse roof
/todo search copper
/todo done 4
/todo undo 4
/todo remove 4
/todo remove 4 confirm
/todo clear completed
/todo share NikkiPixel 4
/todo status
/todo debug config
/todo debug set config limits.max-open-items 15
/todo debug set config cooldown.seconds 4
/todo admin inspect mrfloris
/todo admin purge badactor confirm
```

## Permissions

```text
onembcmi.todo.use
onembcmi.todo.add
onembcmi.todo.edit
onembcmi.todo.list
onembcmi.todo.complete
onembcmi.todo.remove
onembcmi.todo.clear
onembcmi.todo.search
onembcmi.todo.share
onembcmi.todo.cooldown.bypass
onembcmi.todo.limit.50
onembcmi.todo.limit.250
onembcmi.todo.admin
onembcmi.todo.admin.inspect
onembcmi.todo.admin.purge
onembcmi.todo.admin.reset
onembcmi.todo.admin.reload
```

`onembcmi.todo.admin` gates shared debug output and the generic admin usage page. The narrower admin nodes gate inspect, purge, reset, and reload, so a moderator can be granted review access without receiving the broad debug permission.

Open-entry limit overrides are config-driven. The default config includes:

```text
onembcmi.todo.limit.50
onembcmi.todo.limit.250
```

Grant one of those permissions through LuckPerms, or add more `permission=amount` entries to `limits.permission-overrides`.

## Placeholders

```text
%onembcmi_todo.enabled%
%onembcmi_todo.open%
%onembcmi_todo.completed%
%onembcmi_todo.total%
%onembcmi_todo.limit%
%onembcmi_todo.remaining%
%onembcmi_todo.cooldown_seconds%
%onembcmi_todo.lifetime_completed%
%onembcmi_todo.latest%
%onembcmi_todo.latest_completed%
%onembcmi_todo.last.player%
%onembcmi_todo.last.action%
%onembcmi_todo.last.text%
%onembcmi_todo.runtime.added%
%onembcmi_todo.runtime.completed%
%onembcmi_todo.runtime.removed%
%onembcmi_todo.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_todo.open%
papi parse mrfloris %onembcmi_todo.remaining%
papi parse mrfloris %onembcmi_todo.latest%
papi parse mrfloris %onembcmi_todo.lifetime_completed%
```

## Config

The config is created at:

```text
plugins/1MB-CMIAPI/PlayerTodo/config.yml
```

All settings are commented and comments are re-applied on reload while preserving existing values.

```yaml
enabled: true
debug: false
output:
  page-size: 8
quick-add:
  enabled: true
list:
  default-view: open
  newest-first: true
search:
  include-completed: true
limits:
  max-open-items: 15
  permission-overrides:
  - onembcmi.todo.limit.50=50
  - onembcmi.todo.limit.250=250
  min-text-length: 2
  max-text-length: 160
cooldown:
  seconds: 4
content:
  reject-minimessage-tags: true
  reject-tellraw-json: true
  blocked-patterns:
  - (?i)<\s*/?\s*(T|H|C|CC|SC|Next)\s*>
  - (?i)\b(tellraw|clickEvent|hoverEvent|run_command|suggest_command)\b
  - (?i)\{\s*\"text\"\s*:
share:
  enabled: true
  notify-with-cmi-mail: true
  mail-command: cmi mail send {target} {sender} shared a /todo item with you. Type /todo view {id}
milestones:
  enabled: true
  completed-counts:
  - '15'
  - '50'
  - '150'
effects:
  enabled: true
  sound: minecraft:entity.firework_rocket.blast
  particle: HAPPY_VILLAGER
  particle-count: 24
```

Useful runtime edits:

```text
/todo debug set config limits.max-open-items 75
/todo debug set config limits.max-text-length 220
/todo debug set config cooldown.seconds 4
/todo debug set config content.reject-minimessage-tags true
/todo debug set config share.enabled true
/todo debug set config milestones.enabled false
/todo debug set config effects.enabled false
/todo debug set config list.default-view all
```

List values such as `limits.permission-overrides`, `content.blocked-patterns`, and `milestones.completed-counts` are intentionally not editable through the scalar debug set command yet. Edit those in `config.yml`, then run `/todo reload`.

## Behavior

`/todo` lists the configured default view, usually open entries only.

`/todo list` is intentionally the simple player default: open entries only, page 1, newest to oldest. `/todo list 5` shows page 5 of that default view. `/todo list completed` shows completed entries only. `/todo list all` shows everything.

`/todo list [open|all|completed] [page] [asc|desc]` supports compact paginated output. `desc` shows newest first, `asc` shows oldest first. The aliases `newest`, `newest-first`, `oldest`, and `oldest-first` are also accepted. The shorter form `/todo list 2 asc` is accepted when you want page 2 of the default view sorted oldest to newest.

`/todo <text>` quick-adds an entry when quick-add is enabled. If the first word is a known subcommand such as `list`, `done`, or `search`, the subcommand wins.

`/todo add <text>` and `/todo <text>` both go through the same guard: text length, cooldown, max open entries, control-character cleanup, blocked content checks, and MiniMessage-safe output.

`/todo view <id>` shows a single entry with created/completed timestamps and share metadata.

Todo rows shown in `/todo`, `/todo list`, `/todo search`, and online share notifications are clickable and open `/todo view <id>`. List rows keep created/completed/share details in the hover tooltip so the list stays compact. The `[x]` control opens a delete confirmation, and the single-item view also shows `[e]` to prefill `/todo edit <id> <text>` in chat. In the single-item view, `[d]` marks an open todo done and `[o]` reopens a completed todo.

`/todo edit <id> <new text>` updates an entry in the sender's own list. Edited text goes through the same length limit, cooldown, control-character cleanup, blocked content checks, and MiniMessage-safe output as new entries.

Tab completion after `/todo edit <id>` suggests the current todo text, which makes small corrections faster.

`/todo done <id>` marks an entry complete. Each item only counts once toward lifetime milestones, even if it is reopened and completed again.

`/todo remove <id>` shows a confirmation prompt. `/todo remove <id> confirm` performs the actual delete.

`/todo clear completed` removes completed entries from the visible list, but does not erase lifetime completion count or already reached milestones.

`/todo share <player> <id>` copies one of the sender's entries into another known player's todo list as a new open entry. The recipient sees `(shared by <sender>)` in their list and can click the online notification or use `/todo view <id>`. If CMI is installed and the share mail command remains enabled, the plugin also runs a console-side `cmi mail send` notification without inserting player-provided todo text into the command.

`/todo admin inspect <player> [page]` works for online players, cached offline players, and players found in PlayerTodo's shared playerdata name index. It shows all entries, not just open entries.

`/todo admin purge <player> confirm` removes all visible todo entries for that player while keeping their lifetime completion count and milestone markers.

`/todo admin reset <player>` removes the entire `todo` playerdata section for that player.

## Data Writes

PlayerTodo writes to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Example shape:

```yaml
todo:
  name: mrfloris
  next-id: 4
  lifetime-completed: 1
  milestones:
  - 15
  entries:
    '1':
      text: build a house
      created-at: '2026-04-28T12:00:00Z'
      completed: true
      completed-at: '2026-04-28T12:15:00Z'
      completion-counted: true
    '2':
      text: test copper blocks in the roof
      created-at: '2026-04-28T12:20:00Z'
      completed: false
      completed-at: ''
      completion-counted: false
      shared-by: NikkiPixel
      shared-from-uuid: 631e3896-da2a-4077-974b-d047859d76bc
      shared-source-id: 7
```

The shared cleanup command can remove the `todo` section later if the feature is uninstalled:

```text
/1mbcmi debug clean playerdata plugin todo --dry-run
/1mbcmi debug clean playerdata plugin todo --confirm
```

## CMI, CMILib, And Paper Usage

CMI and CMILib are runtime dependencies through the shared 1MB-CMIAPI stack. PlayerTodo does not need to modify CMI mail, warps, economy, or user meta.

Paper API usage is intentionally small:

- Paper command registration through `plugin.yml`
- Adventure/MiniMessage output through the shared message style
- Bukkit/Paper `Player`, `OfflinePlayer`, `Particle`, `Sound`, and scheduler-safe player interactions
- Shared `YamlConfiguration` playerdata persistence through 1MB-CMIAPI-Lib

## Security Notes

Player text is cleaned before storage:

- legacy color codes are stripped
- control characters are removed
- repeated whitespace is collapsed
- configurable length limits reject oversized input instead of silently cutting it
- a default 4 second mutating-command cooldown reduces spam and playerdata growth abuse
- open todo counts are capped by `limits.max-open-items`, with optional permission overrides for VIP/staff groups
- MiniMessage-style tags, CMI click/tellraw-style tags, and configured blocked regex patterns are rejected before storage
- output is MiniMessage-escaped by the shared message layer
- todo ids must be positive integers
- player-facing commands only affect the sender's own UUID data
- admin inspect, purge, reset, and reload are permission locked independently
- share notifications only insert sanitized player names and numeric ids into the configured console mail command; player-written todo text is not inserted into commands

The plugin does not run player-provided commands. CMI's `chatfilter.yml` is not currently exposed through a clean public CMI-API hook that we can safely call for arbitrary command text, so PlayerTodo uses its own local content guard for now. If CMI exposes that filter through the API later, this is a good candidate for an optional extra hook.

## Testing

Suggested beta checks:

```text
/todo build a house
/todo use new blocks
/todo pay Bob 45k
/todo
/todo view 1
/todo edit 1 build a bigger house
/todo done 1
/todo list completed
/todo undo 1
/todo remove 1 confirm
/todo search Bob
/todo share mrfloris 1
/todo clear completed
/todo status
/todo debug all
/todo admin inspect mrfloris
/todo admin purge mrfloris confirm
```

Confirm that `plugins/1MB-CMIAPI/PlayerTodo/config.yml` is commented after first load and that shared playerdata receives only the `todo` section for this feature.
