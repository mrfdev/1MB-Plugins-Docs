# CMIDatabase

## Purpose

CMIDatabase is an internal key/value store for CMI custom aliases, event commands, interactive commands, quests, parkour, adventure logic, and other automation where CMI usermeta is not enough.

It gives console automation a safe `/cmidb` command that can store global values or player-scoped values in a shared YAML database. Those values can then be read back through PlaceholderAPI inside CMI checks.

## Features

- Store global flags such as event state, quest state, or server automation switches.
- Store player-scoped progress by player name without requiring the player to be online.
- Read, check, list, and delete stored keys from console or a tightly permission-gated sender.
- Expose values through the shared `onembcmi` PlaceholderAPI expansion.
- Register a convenience `onembcmidb` PlaceholderAPI expansion for short CMI check syntax.
- Keep keys strict and predictable: lowercase letters, numbers, dots, underscores, and dashes.
- Reject multiline/control-character values and enforce a configurable maximum value length.
- Store data centrally under `plugins/1MB-CMIAPI/CMIAPILIB/database/cmidb.yml`.

## Commands

```text
/cmidb status
/cmidb help
/cmidb global store <key> <value>
/cmidb global get <key>
/cmidb global has <key>
/cmidb global delete <key>
/cmidb <playerName> store <key> <value>
/cmidb <playerName> get <key>
/cmidb <playerName> has <key>
/cmidb <playerName> delete <key>
/cmidb player <playerName> store <key> <value>
/cmidb list global [page]
/cmidb list <playerName> [page]
/cmidb reload
```

`store`, `set`, and `update` are aliases. `delete` and `remove` are aliases.

Useful CMI-style examples:

```text
asConsole! cmidb global store event.springfestival.enabled true
asConsole! cmidb [playerName] store quest.bridge.started true
asConsole! cmidb [playerName] store parkour.spawn.best 42.8
asConsole! cmidb [playerName] delete quest.bridge.started
```

CMI check examples:

```text
check:%onembcmi_cmidb.global.event.springfestival.enabled%==true! cmi msg [playerName] The event is open.
check:%onembcmi_cmidb.player.quest.bridge.started%==true! cmi msg [playerName] Continue the bridge quest.
check:%onembcmidb_quest_bridge_started%==true! cmi msg [playerName] Continue the bridge quest.
```

## Permissions

```text
onembcmi.cmidb.manage
onembcmi.cmidb.view
onembcmi.cmidb.admin
onembcmi.cmidb.admin.reload
```

All CMIDatabase permissions default to `false`. Console can always run the command. The intended use is for CMI `asConsole!` automation and explicitly trusted administrators only.

## Placeholders

Shared `onembcmi` placeholders:

```text
%onembcmi_cmidb.enabled%
%onembcmi_cmidb.global.<key>%
%onembcmi_cmidb.global.has.<key>%
%onembcmi_cmidb.player.<key>%
%onembcmi_cmidb.player.has.<key>%
%onembcmi_cmidb.count.global%
%onembcmi_cmidb.count.players%
%onembcmi_cmidb.cache.size%
```

Example player-scoped keys:

```text
%onembcmi_cmidb.player.quest.bridge.started%
%onembcmi_cmidb.player.quest.bridge.done%
```

Convenience `onembcmidb` placeholders:

```text
%onembcmidb_<key>%
%onembcmidb_global_<key>%
%onembcmidb_has_<key>%
```

For the convenience expansion, underscores in the placeholder path are converted to dots. For example:

```text
%onembcmidb_quest_bridge_started%
```

reads the player-scoped key:

```text
quest.bridge.started
```

If a player-scoped convenience value is missing, the plugin can optionally fall back to the global value with the same key.

## CMI / CMILib Usage

CMI:

- CMIDatabase is built for CMI custom aliases, event commands, interactive commands, and PlaceholderAPI checks.
- It does not use CMI usermeta, so values are not tied to the player being online.

CMILib:

- CMILib remains a required runtime dependency through the CMI stack.
- Future versions can use CMILib GUI helpers if this grows an admin browser.

PlaceholderAPI:

- The shared `onembcmi` expansion exposes long-form placeholders.
- The plugin also registers `onembcmidb` for short automation placeholders when PlaceholderAPI is loaded.

Paper:

- Paper command, plugin metadata, YAML, and Adventure output APIs are used.
- The command is strict about key shape, player name shape, and value length.

## Config

Important config paths:

```text
enabled
debug
value.max-length
list.per-page
direct-placeholder.enabled
direct-placeholder.player-fallback-to-global
```

## Data

Persistent database file:

```text
plugins/1MB-CMIAPI/CMIAPILIB/database/cmidb.yml
```

Data is stored under `global` and `players.<playerName>`, with `value`, `updated`, and `actor` fields per key.

## Safety

CMIDatabase is intentionally not a player feature. Permissions default to `false`, console bypasses the permission checks for automation, and keys/values are strictly validated. It does not execute commands, parse MiniMessage from values, or allow arbitrary nested paths like `.value`, `.updated`, or `.actor`.

[Plugin index](README.md)
