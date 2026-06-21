# PermissionProbe

## Purpose

PermissionProbe is an owner-only read-only diagnosis tool for checking why a player does or does not have a permission. It is meant for live testing and staff troubleshooting without changing LuckPerms, Bukkit permissions, CMI, or player data.

The main command is `/_permissions`. The command is locked behind `onembcmi.permissionprobe.use`, so only trusted admins who have that node should be able to see or run any probe output.

PermissionProbe replaces the older `/1mbcmi permissions ...` analyzer. The library command now only prints a compatibility note pointing admins to `/_permissions`.

## Commands

```text
/_permissions status
/_permissions denials [page]
/_permissions trace <player> <permission>
/_permissions feature <feature> <player> [page]
/_permissions <player> [page]
/_permissions all <player> [page]
/_permissions check <player> <permission>
/_permissions plugin <plugin|feature> <player> [page]
/_permissions command <player> <command>
/_permissions groups <player>
/_permissions reload
/_permissions debug [overview|health|hooks|commands|permissions|placeholders|config|all] [page]
```

Useful examples:

```text
/_permissions mrfloris
/_permissions denials
/_permissions trace mrfloris onembcmi.autosell.use
/_permissions feature autosell mrfloris
/_permissions check mrfloris onembcmi.autosell.use
/_permissions plugin autosell mrfloris
/_permissions plugin 1MB-CMIAPI-AutoSell mrfloris
/_permissions command mrfloris autosell
/_permissions command mrfloris shopguiplus:shopgui
/_permissions groups mrfloris
/_permissions debug all
```

## What It Shows

For each checked permission, PermissionProbe reports:

- Bukkit effective state for online players, or default fallback for offline cached players.
- LuckPerms cached permission result when the user is loaded.
- Bukkit registered permission metadata, including default and description when declared.
- Direct LuckPerms user exact/wildcard hints, such as `onembcmi.autosell.*`, when cached data is available.
- Cached LuckPerms source traces for exact, wildcard, user, group, inherited group, temporary, and context-tagged source nodes.
- The source list being probed, such as a plugin, a command, or registered `onembcmi.` permissions.

The `trace` probe focuses on one permission node and prints matching cached LuckPerms source nodes. It starts with direct user nodes, then walks direct and inherited parent groups up to the configured group depth. It shows whether each source is a grant or deny, whether it matched exactly or through a wildcard, the inheritance path, any node contexts LuckPerms exposes, and temporary expiry data when available.

The trace view is meant for fast owner/staff diagnosis during live testing. It reports matching cached sources and context labels; for authoritative raw LuckPerms precedence details, still use LuckPerms' own `/lp` commands.

The `feature` probe summarizes a player against one registered 1MB feature. It starts with common access surfaces such as `use`, `gui`, `debug`, `admin`, `reload`, and `admin.reload`, then adds permissions from the feature runtime command help, plugin.yml, and registered Bukkit permissions. Each row includes the effective state and, when enabled, a compact LuckPerms source hint.

The `command` probe reports the command owner, aliases, usage, and command metadata permission. If a command does not declare a permission in Bukkit metadata, the plugin notes that the command may still check permissions internally after it starts running.

The `groups` probe reports LuckPerms primary group and direct cached parent group nodes. For authoritative raw LuckPerms details, still use LuckPerms directly with `/lp user <player> info` or `/lp user <player> permission info <node>`.

The `denials` page is passive. It listens for denied 1MB feature permission checks, then aggregates sender, feature, missing node, world, command context, first seen, last seen, and count. It works for player and console senders when those record toggles are enabled.

All `/_permissions` commands can be run from console. Console output is still paginated for copy/paste readability.

## Permissions

```text
onembcmi.permissionprobe.use
onembcmi.permissionprobe.admin
onembcmi.permissionprobe.admin.reload
```

Production note: these nodes default to `false` in `plugin.yml`. Grant `onembcmi.permissionprobe.use` only to the owner/admins who should be able to inspect other players' permission state.

## Placeholders

```text
%onembcmi_permissionprobe.enabled%
%onembcmi_permissionprobe.last.player%
%onembcmi_permissionprobe.last.subject%
%onembcmi_permissionprobe.last.result%
%onembcmi_permissionprobe.permissions.count%
%onembcmi_permissionprobe.denials.distinct%
%onembcmi_permissionprobe.denials.total%
%onembcmi_permissionprobe.denials.last.sender%
%onembcmi_permissionprobe.denials.last.feature%
%onembcmi_permissionprobe.denials.last.permission%
%onembcmi_permissionprobe.denials.last.command%
%onembcmi_permissionprobe.cache.size%
```

## Config

Important config paths:

```yaml
enabled: true
debug: false
output:
  page-size: 8
probe:
  include-registered-onembcmi-permissions: true
luckperms:
  show-direct-user-hints: true
  show-source-trace-in-feature-rows: true
  trace-group-depth: 5
  trace-max-matches: 12
denials:
  max-records: 200
  record-players: true
  record-console: true
```

`probe.include-registered-onembcmi-permissions` makes `/_permissions all <player>` include registered Bukkit permission nodes beginning with `onembcmi.`. This catches shared or dynamically registered nodes beyond one plugin's `plugin.yml`.

`luckperms.show-direct-user-hints` adds a compact direct-user hint to ordinary permission rows.

`luckperms.show-source-trace-in-feature-rows` adds a compact source summary to `/_permissions feature` rows.

`luckperms.trace-group-depth` controls how far inherited parent groups are walked for `/_permissions trace`. `luckperms.trace-max-matches` limits how many matching source nodes are printed in one trace.

`denials.max-records` controls how many distinct denial aggregates are retained in memory. The denial recorder is intentionally in-memory for now; export/report files are part of the accepted roadmap but not feature 1.

## Data And Cache

PermissionProbe writes only its shared config and translation files:

```text
plugins/1MB-CMIAPI/PermissionProbe/config.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/permissionprobe.yml
```

The command keeps the last probe summary and recent denial aggregates in memory for placeholders and `/_permissions denials`. It does not write permission reports to disk, mutate playerdata, or dispatch LuckPerms commands.

## CMI-API Usage

PermissionProbe uses `1MB-CMIAPI-LIB` for feature registration, config defaults, translations, strict permission checks, shared debug pages, placeholders, tab filtering, and metadata exposed through `/1mbcmi debug plugin permissionprobe all`.

## Runtime Hooks

Required:

```text
CMI
CMILib
1MB-CMIAPI-Lib
```

Optional:

```text
LuckPerms
Vault
```

LuckPerms is optional so the command can still show Bukkit command and permission metadata on a test server without LuckPerms. When LuckPerms is loaded, PermissionProbe uses cached user data through the public API by reflection so the plugin can remain compile-light.

## Security Notes

- All probe commands are read-only.
- The root command is gated by `onembcmi.permissionprobe.use` before help, info, status, debug, or tab completion exposes useful data.
- Permission nodes, plugin names, and command roots are validated with strict safe-character patterns.
- Offline Bukkit checks cannot know a player's full effective permissions; they show registered defaults and cached LuckPerms data only.
- The plugin never grants, removes, applies, or reloads permission data.
