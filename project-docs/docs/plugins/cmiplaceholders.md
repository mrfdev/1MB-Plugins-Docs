# CMIPlaceholderCheck

## Purpose

CMIPlaceholderCheck is a staff lookup helper for finding placeholders before they are used in CMI aliases, schedules, signs, holograms, tips, docs, or support replies.

It is inspired by CMI's `/cmi checkcommands` and `/cmi checkperms` style of quick lookups, but it keeps the command surface separate and safe:

```text
/cmiplaceholders check <keyword>
```

The plugin does not hijack CMI internals. If `/cmi checkplaceholders <keyword>` is desired, the clean approach is to make a CMI alias that forwards to `/cmiplaceholders check <keyword>` while keeping this plugin responsible for the actual lookup.

## Features

- Search a placeholder catalog by keyword.
- List the full placeholder catalog with pagination.
- Filter placeholders by source plugin or PlaceholderAPI expansion.
- Parse one concrete placeholder and show the example output.
- Seed known CMI, PlaceholderAPI, Vault, and LuckPerms placeholder examples from config.
- Add live `onembcmi` placeholders from the shared 1MB-CMIAPI placeholder registry.
- Add live PlaceholderAPI expansion identifiers as wildcard lookup entries.
- Show context notes, permission notes, and source notes where known.
- Register command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/cmiplaceholders
/cmiplaceholders help
/cmiplaceholders status
/cmiplaceholders check <keyword> [page]
/cmiplaceholders list [page]
/cmiplaceholders plugin <plugin> [page]
/cmiplaceholders example <placeholder> [player]
/cmiplaceholders reload
```

Aliases:

```text
/cmipholders
/checkplaceholders
```

Useful examples:

```text
/cmiplaceholders status
/cmiplaceholders check cmi
/cmiplaceholders check balance
/cmiplaceholders check onembcmi
/cmiplaceholders list
/cmiplaceholders list 2
/cmiplaceholders plugin CMI
/cmiplaceholders plugin PlaceholderAPI
/cmiplaceholders plugin onembcmi
/cmiplaceholders example %cmi_user_name% mrfloris
/cmiplaceholders example %onembcmi_global.status.loaded%
/cmiplaceholders reload
```

Global library examples:

```text
/1mbcmi debug plugin cmiplaceholders
/1mbcmi debug plugin cmiplaceholders commands
/1mbcmi debug plugin cmiplaceholders permissions
/1mbcmi debug plugin cmiplaceholders placeholders
/1mbcmi debug plugin cmiplaceholders config
/1mbcmi debug plugin cmiplaceholders all
/1mbcmi config cmiplaceholders
/1mbcmi config set cmiplaceholders output.entries-per-page 12
```

## Permissions

```text
onembcmi.cmiplaceholders.use
onembcmi.cmiplaceholders.check
onembcmi.cmiplaceholders.view
onembcmi.cmiplaceholders.example
onembcmi.cmiplaceholders.admin.reload
```

`use` controls status/help access. `check` controls keyword searches. `view` controls the full catalog and plugin filters. `example` controls live PlaceholderAPI parsing. `admin.reload` reloads config and translations.

## Placeholders

```text
%onembcmi_cmiplaceholders.enabled%
%onembcmi_cmiplaceholders.catalog.count%
%onembcmi_cmiplaceholders.placeholderapi.loaded%
%onembcmi_cmiplaceholders.identifiers.count%
%onembcmi_cmiplaceholders.last.keyword%
%onembcmi_cmiplaceholders.last.matches%
%onembcmi_cmiplaceholders.last.example.placeholder%
%onembcmi_cmiplaceholders.last.example.output%
%onembcmi_cmiplaceholders.last.example.state%
%onembcmi_cmiplaceholders.cache.size%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/CMIPlaceholderCheck/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
output.entries-per-page: 8
input.max-keyword-length: 48
input.allowed-keyword-pattern: "[A-Za-z0-9_.:%-]{1,48}"
input.allowed-placeholder-pattern: "%[A-Za-z0-9_.:-]{1,160}%"
example.max-output-length: 240
catalog.include-placeholderapi-identifiers: true
catalog.include-onembcmi-registry: true
catalog.entries:
- "%cmi_user_name%|CMI|Player real account name as exposed by CMI placeholders.|Player context recommended.|Known sample used by PlaceholderProbe."
```

The `catalog.entries` format is:

```text
placeholder|source|description|context|notes
```

Examples:

```yaml
catalog.entries:
- "%cmi_user_balance%|CMI|CMI economy balance when available.|Player context recommended.|Requires economy support."
- "%luckperms_prefix%|LuckPerms|LuckPerms prefix placeholder.|Player context recommended.|Requires LuckPerms and its PlaceholderAPI expansion."
```

## How Lookup Works

The catalog is built from three sources:

- configured entries in `catalog.entries`
- live 1MB-CMIAPI placeholders registered with `1MB-CMIAPI-LIB`
- live PlaceholderAPI expansion identifiers

PlaceholderAPI identifiers are shown as wildcard entries such as:

```text
%server_*%
%cmi_*%
%onembcmi_*%
```

Those wildcard entries are for discovery only. To parse output, staff must pass a concrete placeholder:

```text
/cmiplaceholders example %server_online%
```

## CMI Integration

CMIPlaceholderCheck uses CMI as the main target source for configured CMI placeholder examples. It does not depend on closed-source CMI internals and does not modify CMI commands.

If the server owner wants `/cmi checkplaceholders <keyword>`, create a CMI alias that forwards the typed keyword to:

```text
cmiplaceholders check <keyword>
```

This keeps CMIPlaceholderCheck removable and avoids brittle command injection into CMI itself.

## PlaceholderAPI Integration

The plugin requires PlaceholderAPI. It uses:

- registered expansion identifiers for catalog discovery
- `PlaceholderAPI.setPlaceholders(...)` for `/cmiplaceholders example`

If a placeholder returns unchanged or still contains `%`, the result is marked `unresolved`. Empty output is marked `empty`. Exceptions are caught and shown as `error`.

## 1MB-CMIAPI-LIB Usage

CMIPlaceholderCheck uses `1MB-CMIAPI-LIB` for feature registration, shared config loading, translations, command help metadata, permission checks, MiniMessage output styling, PlaceholderAPI routing for its own placeholders, cache paths, and debug metadata.

## Paper API Usage

The plugin uses Paper/Bukkit command registration through `plugin.yml`, online-player lookup for live examples, cached offline-player lookup for known player contexts, and standard plugin metadata checks for hook status.

## Data And Cache

The plugin writes its config and translations through the shared library. It does not store playerdata and does not write lookup history to disk.

The cache placeholder reports the shared cache folder size for this feature:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/cmiplaceholders/
```

## Security Notes

- Keywords are restricted by a short safe regex.
- Placeholder examples must be one complete placeholder token.
- Wildcard catalog identifiers cannot be parsed directly.
- Output is abbreviated before being stored in last-example placeholders.
- Dynamic values are escaped by shared MiniMessage output helpers.
- The plugin does not execute commands from placeholder output.

## Testing Checklist

```text
/cmiplaceholders status
/cmiplaceholders check cmi
/cmiplaceholders check onembcmi
/cmiplaceholders list
/cmiplaceholders plugin CMI
/cmiplaceholders plugin onembcmi
/cmiplaceholders example %cmi_user_name% <online-player>
/cmiplaceholders example %onembcmi_global.status.loaded%
/1mbcmi debug plugin cmiplaceholders all
```

[Back to plugin index](README.md)
