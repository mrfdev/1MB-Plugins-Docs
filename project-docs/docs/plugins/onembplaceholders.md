# 1MBPlaceholders

## Purpose

1MBPlaceholders is the CMI-API version of the old standalone `1MB-Placeholders` plugin. It keeps the same public command and PlaceholderAPI expansion:

```text
/_placeholders
%onemb_<key>%
```

It lets the server owner define shared placeholders for CMI schedules, aliases, holograms, tips, menus, docs, and other PlaceholderAPI-aware plugins without having to edit several files for the same server text.

## Features

- Registers the PlaceholderAPI expansion identifier `onemb`.
- Keeps legacy placeholders such as `%onemb_1mb_version%`, `%onemb_mc_version%`, and `%onemb_day_name%`.
- Supports `static`, `builtin`, and `rotating` placeholder entries.
- Groups placeholders into configurable categories.
- Lets admins add, update, remove, search, preview, and list placeholders from in game or console.
- Preserves the legacy `onemb.placeholders.*` permission model while also adding `onembcmi.onembplaceholders.*`.
- Writes backups and audit logs for admin changes.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/_placeholders
/_placeholders info
/_placeholders help
/_placeholders status
/_placeholders list [category] [page]
/_placeholders get <key>
/_placeholders get <category> <key>
/_placeholders preview <key>
/_placeholders preview <category> <key>
/_placeholders search <text> [category] [page]
/_placeholders add [category:]<key> <value...>
/_placeholders add <category> <key> <value...>
/_placeholders category <category> <true|false>
/_placeholders set <key> <value...>
/_placeholders set <category> <key> <value...>
/_placeholders remove <key>
/_placeholders remove <category> <key>
/_placeholders reload
/_placeholders backup
/_placeholders debug
/_placeholders debug status
/_placeholders debug commands [page]
/_placeholders debug permissions [page]
/_placeholders debug placeholders [page]
/_placeholders debug config [page]
/_placeholders debug set config <path> <value>
/_placeholders debug clear <logs|backups>
/_placeholders debug all
```

Useful examples:

```text
/_placeholders
/_placeholders list system
/_placeholders get 1mb_version
/_placeholders get system mc_version
/_placeholders preview branding header
/_placeholders search server
/_placeholders add events event_note The spring event starts soon.
/_placeholders set server_status Maintenance tonight
/_placeholders category events true
/_placeholders backup
/_placeholders reload
/_placeholders debug all
```

Global library examples:

```text
/1mbcmi debug plugin onembplaceholders
/1mbcmi debug plugin onembplaceholders commands
/1mbcmi debug plugin onembplaceholders permissions
/1mbcmi debug plugin onembplaceholders placeholders
/1mbcmi debug plugin onembplaceholders config
/1mbcmi debug plugin onembplaceholders all
```

## Permissions

Legacy permissions kept from the standalone plugin:

```text
onemb.placeholders.*
onemb.placeholders.admin
onemb.placeholders.view
onemb.placeholders.edit
onemb.placeholders.reload
onemb.placeholders.search
onemb.placeholders.backup
onemb.placeholders.debug
```

New 1MB-CMIAPI permissions:

```text
onembcmi.onembplaceholders.use
onembcmi.onembplaceholders.admin
onembcmi.onembplaceholders.view
onembcmi.onembplaceholders.edit
onembcmi.onembplaceholders.reload
onembcmi.onembplaceholders.search
onembcmi.onembplaceholders.backup
onembcmi.onembplaceholders.debug
```

The command accepts either the legacy or the new permission nodes. Keeping the legacy nodes makes migration safer for existing LuckPerms groups.

Base command access requires `onemb.placeholders.admin`, `onemb.placeholders.*`, `onembcmi.onembplaceholders.use`, or `onembcmi.onembplaceholders.admin`. The view/edit/search/reload/backup/debug nodes then control which subcommands appear and run.

## Placeholders

The public PlaceholderAPI expansion is:

```text
%onemb_<key>%
```

Default examples:

```text
%onemb_1mb_version%
%onemb_1mb_staff%
%onemb_server_name%
%onemb_server_ip%
%onemb_server_altip%
%onemb_server_short%
%onemb_server_tag%
%onemb_server_status%
%onemb_brand_color%
%onemb_header%
%onemb_footer%
%onemb_plugin_version%
%onemb_plugin_build%
%onemb_mc_version%
%onemb_java_version%
%onemb_paper_version%
%onemb_server_engine%
%onemb_online_players%
%onemb_max_players%
%onemb_day_name%
%onemb_day_of_week%
%onemb_day_of_month%
%onemb_month_name%
%onemb_month_number%
%onemb_year%
%onemb_date_iso%
%onemb_time_24h%
%onemb_event_name%
%onemb_event_status%
%onemb_rotating_greeting%
```

The feature also exposes `onembcmi` support/debug placeholders:

```text
%onembcmi_onembplaceholders.enabled%
%onembcmi_onembplaceholders.placeholderapi.registered%
%onembcmi_onembplaceholders.configured.count%
%onembcmi_onembplaceholders.live.count%
%onembcmi_onembplaceholders.categories.count%
%onembcmi_onembplaceholders.categories.enabled%
%onembcmi_onembplaceholders.categories.disabled%
%onembcmi_onembplaceholders.validation.count%
%onembcmi_onembplaceholders.last.load%
%onembcmi_onembplaceholders.backups.count%
%onembcmi_onembplaceholders.cache.size%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/1MBPlaceholders/config.yml
```

Important config sections:

```yaml
Formatting:
  parse-mini-message: true
  convert-legacy-ampersand-codes: true
  strip-formatting: false

Listing:
  show-category: true
  only-show-enabled-placeholders: false
  show-category-description: true
  show-type: true
  show-category-count: true
  entries-per-page: 8

Placeholders:
  default:
    enabled: true
    description: Manual placeholders that stay available during normal server use.
    placeholders:
      1mb_version:
        type: static
        description: The current 1MoreBlock server version string.
        value: 3.11.7.5
```

Config comments are managed by the shared `FeatureSettings` loader. Existing values are preserved on reload, missing defaults are added, and comments are re-applied.

## Placeholder Types

`static` placeholders return the configured `value`.

`builtin` placeholders return live values generated by the plugin, such as Java version, Paper target, online player count, date, and time.

`rotating` placeholders select from a configured `values` list based on `interval-seconds`.

## CMI Integration

The plugin is meant for CMI-heavy server automation. Its placeholders can be used in CMI schedules, CMI aliases, CMI custom text, CMI holograms, CMI tab/list formats, and any other PlaceholderAPI-aware CMI output.

It does not modify CMI internals. It depends on CMI/CMILib because this repo’s feature jars are designed to run next to the same CMI stack and to report CMI environment details through the shared library.

## 1MB-CMIAPI-LIB Usage

1MBPlaceholders uses `1MB-CMIAPI-LIB` for feature registration, central data paths, commented config loading, translations, MiniMessage output styling, command metadata, permission/debug metadata, PlaceholderAPI support placeholders, and shared `/1mbcmi debug plugin onembplaceholders all` visibility.

## Paper API Usage

The plugin uses Paper/Bukkit command registration through `plugin.yml`, plugin metadata, server version APIs, and Adventure/MiniMessage formatting.

## Data And Cache

Data paths:

```text
plugins/1MB-CMIAPI/1MBPlaceholders/config.yml
plugins/1MB-CMIAPI/1MBPlaceholders/backups/
plugins/1MB-CMIAPI/1MBPlaceholders/logs/actions.log
plugins/1MB-CMIAPI/1MBPlaceholders/logs/purge-history.log
```

`/_placeholders backup` copies `config.yml` into the `backups/` folder. Admin edits and maintenance actions are written to `logs/actions.log`. `debug clear logs` keeps `purge-history.log` so cleanup actions remain auditable.

## Migration Notes

Install this jar instead of the old standalone `1MB-Placeholders` jar. Do not run both at the same time because both try to register the same PlaceholderAPI identifier: `onemb`.

After first boot, compare the generated config with the old plugin’s `plugins/1MB-Placeholders/config.yml`. The default placeholder keys and command surface are intentionally compatible, but any private custom placeholders from the old config should be copied into:

```text
plugins/1MB-CMIAPI/1MBPlaceholders/config.yml
```

Then run:

```text
/_placeholders reload
/_placeholders status
/_placeholders list
```

## Safety Notes

Command input is strict: category and key names are normalized to lowercase safe identifiers, search text is length-limited, and placeholder values are capped at 512 characters with control characters stripped.

Admin edits write to config only after validation. Placeholders are reloaded from disk after edits so the in-memory view matches the saved file.

[Documentation index](../README.md)
