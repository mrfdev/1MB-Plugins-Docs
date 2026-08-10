# FilterGuard

> Since build 561, FilterGuard is the Guard module inside the `1MB-CMIAPI-ContentGuard` jar. Its commands, aliases, permissions, placeholders, prefix, config, translations, alerts, and enforcement behavior remain compatible. See [ContentGuard](contentguard.md) for parent lifecycle and migration controls.

## Purpose

FilterGuard extends CMI chat-filter style checks to other player-written text surfaces: signs, wall signs, hanging signs, wall hanging signs, books, anvils, item names, entity name tags, and CMI nicknames.

It uses CMI `Settings/ChatFilter.yml` deny rules when available. Version 1 can log, alert, cancel, or cancel-and-alert per surface through config.

## Features

- Reads CMI `Settings/ChatFilter.yml` deny rules.
- Checks sign text, wall sign text, hanging sign text, wall hanging sign text, book edits, anvil rename text, item-name rename text, entity name-tag use, and CMI nickname changes.
- Supports per-surface `enabled` toggles.
- Supports per-surface actions: `log`, `alert`, `cancel`, and `cancel-and-alert`.
- Blocks matching sign edits, book edits/signing, anvil renames, item-name renames, entity name tags, and nickname changes by default.
- Sends one prominent red live alert to staff with `onembcmi.filterguard.alert`.
- Collapses Paper's repeated callbacks for the same blocked anvil rename into one detection and staff alert while continuing to block every result calculation.
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
entity-name
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
/1mbcmi config set filterguard surfaces.books.action cancel-and-alert
/1mbcmi config set filterguard surfaces.entity-names.action cancel-and-alert
/1mbcmi config set filterguard surfaces.nicknames.enabled true
/1mbcmi translations reload
```

Beginning with build 562, FilterGuard performs this safety upgrade automatically when ContentGuard first loads an older config. Legacy `alert` defaults for all sign variants and books become `cancel-and-alert`; missing entity-name protection is added and enabled. A managed `config-version` marker makes the migration run only once. Explicit custom actions such as `log` or `cancel`, and an explicitly disabled entity-name surface, remain unchanged.

No in-game config commands or manual reload are required. If the migration cannot be saved atomically, the Guard module fails closed and remains dormant while the Lab module and ContentGuard parent remain available for diagnosis.

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
config-version
output.page-size
recent.max
rules.max-regex-length
text.max-length
alerts.anvil-duplicate-window-millis
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
surfaces.entity-names.enabled
surfaces.entity-names.action
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

All four sign variants, books, anvils, item names, entity name tags, and nicknames default to `cancel-and-alert`. Minecraft still closes the sign or book editor before the cancellable event is delivered, but the rejected text is not saved to the sign or book. A rejected name tag remains in the player's hand and the entity keeps its previous name.

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
