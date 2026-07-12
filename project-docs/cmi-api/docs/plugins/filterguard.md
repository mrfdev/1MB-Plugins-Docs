# FilterGuard

## Purpose

FilterGuard extends CMI chat-filter style checks to other player-written text surfaces: signs, wall signs, hanging signs, wall hanging signs, books, anvils, item names, and CMI nicknames.

It uses CMI `Settings/ChatFilter.yml` deny rules when available. Version 1 can log, alert, cancel, or cancel-and-alert per surface through config.

## Features

- Reads CMI `Settings/ChatFilter.yml` deny rules.
- Checks sign text, wall sign text, hanging sign text, wall hanging sign text, book edits, anvil rename text, item-name rename text, and CMI nickname changes.
- Supports per-surface `enabled` toggles.
- Supports per-surface actions: `log`, `alert`, `cancel`, and `cancel-and-alert`.
- Sends live alerts to staff with `onembcmi.filterguard.alert`.
- Keeps bounded recent detections for the current runtime.
- Provides a safe `/filterguard test <surface> <text>` command before enabling cancellation.
- Registers command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/filterguard
/filterguard status
/filterguard test <surface> <text>
/filterguard recent [page]
/filterguard rules [page]
/filterguard reload
```

Aliases:

```text
/chatfilterguard
/cfguard
```

Valid test surfaces:

```text
sign
wall-sign
hanging-sign
wall-hanging-sign
book
anvil
item-name
nickname
```

Useful examples:

```text
/filterguard
/filterguard status
/filterguard test sign hello there
/filterguard test book suspicious text here
/filterguard test nickname badnickname
/filterguard recent
/filterguard recent 2
/filterguard rules
/filterguard reload
```

Global library examples:

```text
/1mbcmi debug plugin filterguard
/1mbcmi debug plugin filterguard all
/1mbcmi debug plugin filterguard commands
/1mbcmi debug plugin filterguard permissions
/1mbcmi debug plugin filterguard placeholders
/1mbcmi config filterguard
/1mbcmi config set filterguard surfaces.signs.action cancel-and-alert
/1mbcmi config set filterguard surfaces.nicknames.enabled true
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.filterguard.use
onembcmi.filterguard.test
onembcmi.filterguard.recent
onembcmi.filterguard.rules
onembcmi.filterguard.alert
onembcmi.filterguard.admin
onembcmi.filterguard.admin.reload
```

## Placeholders

```text
%onembcmi_filterguard.enabled%
%onembcmi_filterguard.rules.count%
%onembcmi_filterguard.rules.enabled_count%
%onembcmi_filterguard.checks.count%
%onembcmi_filterguard.matches.count%
%onembcmi_filterguard.cancelled.count%
%onembcmi_filterguard.alerted.count%
%onembcmi_filterguard.last.surface%
%onembcmi_filterguard.last.rule%
%onembcmi_filterguard.last.player%
%onembcmi_filterguard.cache.size%
```

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
rules.max-regex-length
text.max-length
surfaces.signs.enabled
surfaces.signs.action
surfaces.wall-signs.enabled
surfaces.wall-signs.action
surfaces.hanging-signs.enabled
surfaces.hanging-signs.action
surfaces.wall-hanging-signs.enabled
surfaces.wall-hanging-signs.action
surfaces.books.enabled
surfaces.books.action
surfaces.anvils.enabled
surfaces.anvils.action
surfaces.item-names.enabled
surfaces.item-names.action
surfaces.nicknames.enabled
surfaces.nicknames.action
```

Actions:

```text
log
alert
cancel
cancel-and-alert
```

## CMI / CMILib Usage

CMI-API:

- Observes `CMIPlayerNickNameChangeEvent` for nickname filtering.

CMI:

- Reads `plugins/CMI/Settings/ChatFilter.yml`.
- Uses CMI ChatFilter deny rules as the rule source.
- Does not edit CMI config.

CMILib:

- CMILib remains a required runtime dependency through the CMI stack and shared library.

Paper:

- Uses `SignChangeEvent` for signs, wall signs, hanging signs, and wall hanging signs.
- Uses `PlayerEditBookEvent` for books.
- Uses `PrepareAnvilEvent` for anvil and item-name rename checks.
- Uses Paper command, filesystem, YAML, and Adventure MiniMessage APIs.

## Data

FilterGuard keeps recent detections in memory for the current runtime. It does not write playerdata in version 1.

## Safety

Start with `alert` actions while testing. Move to `cancel` or `cancel-and-alert` only after staff have verified that the CMI ChatFilter rules behave correctly on the target text surfaces.

FilterGuard limits text length and regex length before evaluating loaded rules.

## Shared Library Usage

FilterGuard uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
