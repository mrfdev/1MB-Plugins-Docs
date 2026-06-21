# PermissionProbe

## Purpose

PermissionProbe is an owner-only read-only diagnosis tool for checking why a player does or does not have a permission. It is meant for live testing and staff troubleshooting without changing LuckPerms, Bukkit permissions, CMI, or player data.

The main command is `/_permissions`. The command is locked behind `onembcmi.permissionprobe.use`, so only trusted admins who have that node should be able to see or run any probe output.

PermissionProbe replaces the older `/1mbcmi permissions ...` analyzer. The library command now only prints a compatibility note pointing admins to `/_permissions`.

## Commands

```text
/_permissions status
/_permissions denials [page]
/_permissions report [all|player <player>|feature <feature>|node <permission>|command <command>] [page]
/_permissions export <report|denials|feature|trace|player|compare|comparegroups|context|watch|wildcards|orphans|expected> ... [-github|-discord] [-limit <n|all>]
/_permissions watch <all|player <player>|feature <feature>> [minutes]
/_permissions watch list
/_permissions watch stop <id|all>
/_permissions trace <player> <permission>
/_permissions feature <feature> <player> [page]
/_permissions player <player> [page]
/_permissions compare <playerA> <playerB> [feature] [page]
/_permissions comparegroups <groupA> <groupB> [feature] [page]
/_permissions context <player> <permission> [world:<world>] [server:<server>] [context:<key=value>] [page]
/_permissions expected <profile> <player|group:<group>> [feature] [page]
/_permissions scan wildcards <player> [page]
/_permissions scan orphans [page]
/_permissions <player> [page]
/_permissions all <player> [page]
/_permissions check <player> <permission>
/_permissions plugin <plugin|feature> <player> [page]
/_permissions command <player> <command...>
/_permissions groups <player>
/_permissions reload
/_permissions debug [overview|health|hooks|commands|permissions|placeholders|config|all] [page]
```

Useful examples:

```text
/_permissions mrfloris
/_permissions denials
/_permissions report
/_permissions report feature autosell
/_permissions export report feature autosell -discord -limit 25
/_permissions export denials -github -limit all
/_permissions trace mrfloris onembcmi.autosell.use
/_permissions export trace mrfloris onembcmi.autosell.use -discord
/_permissions feature autosell mrfloris
/_permissions export feature autosell mrfloris -github
/_permissions player mrfloris
/_permissions export player mrfloris -discord
/_permissions compare mrfloris helperName autosell
/_permissions export compare mrfloris helperName -github -limit all
/_permissions comparegroups helper trusted autosell
/_permissions export comparegroups helper trusted -discord
/_permissions context mrfloris onembcmi.autosell.use world:world
/_permissions export context mrfloris onembcmi.autosell.use world:world -github
/_permissions expected helper group:helper autosell
/_permissions export expected helper group:helper -discord -limit all
/_permissions watch feature autosell 15
/_permissions watch list
/_permissions export watch 1 -discord
/_permissions scan wildcards mrfloris
/_permissions export wildcards mrfloris -discord
/_permissions scan orphans
/_permissions export orphans -github -limit all
/_permissions check mrfloris onembcmi.autosell.use
/_permissions plugin autosell mrfloris
/_permissions plugin 1MB-CMIAPI-AutoSell mrfloris
/_permissions command mrfloris autosell gui
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

The `player` probe summarizes one cached player across every loaded 1MB feature. It highlights whether normal use or GUI access appears available, whether any admin-style node is available, and how many feature nodes are available, denied, or default/unknown. Use it before live tests to quickly spot a player who can reach more or less than expected.

The `compare` probe compares two cached players across all loaded 1MB features, or one specific feature when provided. It prints only rows where their observed permission state differs, so staff can quickly explain why one account can open or use something another cannot.

The `comparegroups` probe compares two cached LuckPerms groups across loaded 1MB feature access nodes, or one feature when provided. It uses direct and inherited cached group nodes, then lists only state differences so rank gaps are easier to review before live testing.

The `context` probe explains one player's cached source nodes for a permission with optional `world:`, `server:`, or `context:key=value` filters. It shows Bukkit and LuckPerms cached state, then lists global or context-tagged source matches. This is a read-only context inspection and should be paired with LuckPerms' own verbose/check tools for authoritative precedence.

The `command` probe explains the command owner, aliases, known Bukkit labels, usage, command metadata permission, matching 1MB runtime command-help entries, likely internal feature permission checks, effective state, and compact LuckPerms source hints. If Bukkit command metadata does not declare a permission, PermissionProbe still tries to infer likely checks from the owning 1MB feature runtime and plugin permission metadata.

The `expected` probe compares a configured expected profile against one cached player or `group:<group>`. Expected profiles live in config under `expected.profiles.<name>.nodes`, so admins can define the server's intended role policy without the plugin guessing. The command reports present and missing expected nodes and never grants them.

The `watch` probe starts an in-memory live-test window for all denied checks, one player, or one feature. Matching denied 1MB feature permission checks are highlighted to the watcher, summarized when the watch is stopped or expires, and optionally auto-exported to Markdown.

The `scan wildcards` probe reviews cached direct and inherited LuckPerms source nodes for one player and flags broad grants or denies such as `*`, `onembcmi.*`, and `onembcmi.<feature>.*`. This is useful when access appears to come from a wildcard instead of an exact permission.

The `scan orphans` probe reviews cached LuckPerms users and groups for `onembcmi.` nodes that are not declared by currently loaded 1MB feature metadata. It is a migration and cleanup aid only; it does not remove anything.

The `report` probe summarizes passive denied-check records. Reports can be scoped to all records, one player, one feature, one permission node, or one command root. Rows are grouped by feature, permission, command, and world, then sorted by count and recency so the most repeated live-test problems rise to the top.

The `export` command writes Markdown files to the PermissionProbe cache for reports, denials, feature access, traces, player overviews, player comparisons, group comparisons, context checks, expected-node checks, watch summaries, wildcard scans, and orphan scans. `-github` creates table-based Markdown for GitHub issues, PRs, and docs. `-discord` creates no-table bullet Markdown that is easier to paste into Discord. `-limit <n>` caps row count, and `-limit all` writes every matching row.

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
report:
  default-limit: 10
export:
  default-format: github
  default-limit: 25
  file-prefix: permissionprobe
watch:
  default-minutes: 10
  max-minutes: 120
  auto-export-on-finish: true
expected:
  profiles:
    owner:
      nodes: []
    admin:
      nodes: []
    helper:
      nodes: []
denials:
  max-records: 200
  record-players: true
  record-console: true
```

`probe.include-registered-onembcmi-permissions` makes `/_permissions all <player>` include registered Bukkit permission nodes beginning with `onembcmi.`. This catches shared or dynamically registered nodes beyond one plugin's `plugin.yml`.

`luckperms.show-direct-user-hints` adds a compact direct-user hint to ordinary permission rows.

`luckperms.show-source-trace-in-feature-rows` adds a compact source summary to `/_permissions feature` rows.

`luckperms.trace-group-depth` controls how far inherited parent groups are walked for `/_permissions trace`. `luckperms.trace-max-matches` limits how many matching source nodes are printed in one trace.

`report.default-limit` controls how many grouped rows each in-game/console report page shows.

`export.default-format`, `export.default-limit`, and `export.file-prefix` control Markdown file defaults. Export commands can override format and limit per run.

`watch.default-minutes`, `watch.max-minutes`, and `watch.auto-export-on-finish` control in-memory watch sessions. Active and recently completed watch summaries reset on restart.

`expected.profiles.<name>.nodes` defines read-only expected permission profiles for `/_permissions expected`. Leave profiles empty until staff decide which exact nodes or wildcard nodes represent the intended role policy.

`denials.max-records` controls how many distinct denial aggregates are retained in memory. The denial recorder is intentionally in-memory; Markdown files are written only when an admin runs `/_permissions export ...`.

## Data And Cache

PermissionProbe writes its shared config, translation file, and admin-triggered Markdown exports:

```text
plugins/1MB-CMIAPI/PermissionProbe/config.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/permissionprobe.yml
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/permissionprobe/*.md
```

The command keeps the last probe summary and recent denial aggregates in memory for placeholders, `/_permissions denials`, and `/_permissions report`. Markdown exports are written only when an admin runs `/_permissions export ...`. PermissionProbe does not mutate playerdata, dispatch LuckPerms commands, or reload permission data.

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

LuckPerms is optional so the command can still show Bukkit command and permission metadata on a test server without LuckPerms. When LuckPerms is loaded, PermissionProbe uses cached user, loaded-user, and loaded-group data through the public API by reflection so the plugin can remain compile-light.

## Security Notes

- All probe commands are read-only.
- The root command is gated by `onembcmi.permissionprobe.use` before help, info, status, debug, or tab completion exposes useful data.
- Permission nodes, plugin names, and command roots are validated with strict safe-character patterns.
- Offline Bukkit checks cannot know a player's full effective permissions; they show registered defaults and cached LuckPerms data only.
- The plugin never grants, removes, applies, or reloads permission data.
