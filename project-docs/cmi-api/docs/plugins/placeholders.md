# Placeholders

## Purpose

Placeholders combines the production 1MB PlaceholderAPI expansion and three owner-facing diagnostic tools in one independently switchable feature jar:

```text
1MB-CMIAPI-Placeholders-v<version>-<build>-j25-26.2.jar
```

The plugin registers only `/_placeholders`. It does not register `/placeholders`, which remains available for the live server's existing command owner.

## Modules

| Module | Former jar | Command route | Purpose |
| --- | --- | --- | --- |
| Provider | 1MBPlaceholders | `/_placeholders <provider command>` | Owns `%onemb_<key>%`, static/builtin/rotating values, backups, and audited edits. |
| Catalog | CMIPlaceholderCheck | `/_placeholders catalog <command>` | Searches known placeholders by keyword/source and parses concrete examples. |
| Probe | PlaceholderProbe | `/_placeholders probe <command>` | Safely parses ad hoc tokens, lists expansions, and keeps bounded runtime diagnostics. |
| Health | PlaceholderHealth | `/_placeholders health <command>` | Runs a configured operational sample set and exports Markdown health reports. |

The Provider module starts before diagnostics. Module enable, reload, and activation failures fail that module closed without stopping sibling modules or unregistering the production `onemb` expansion unless the Provider itself is disabled.

## Commands

Existing Provider commands remain unchanged:

```text
/_placeholders
/_placeholders info
/_placeholders help
/_placeholders status
/_placeholders list [category] [page]
/_placeholders get <key>
/_placeholders preview <key>
/_placeholders search <text> [category] [page]
/_placeholders add [category:]<key> <value...>
/_placeholders category <category> <true|false>
/_placeholders set <key> <value...>
/_placeholders remove <key>
/_placeholders reload
/_placeholders backup
/_placeholders debug [section] [page]
```

Catalog commands:

```text
/_placeholders catalog status
/_placeholders catalog check <keyword> [page]
/_placeholders catalog list [page]
/_placeholders catalog plugin <plugin> [page]
/_placeholders catalog example <placeholder> [player]
/_placeholders catalog reload
/_placeholders catalog debug [status|commands|placeholders|config|all] [page]
```

Probe commands:

```text
/_placeholders probe status
/_placeholders probe parse <placeholder> [online-player]
/_placeholders probe samples [page] [online-player]
/_placeholders probe identifiers [page]
/_placeholders probe search <text> [page]
/_placeholders probe recent [page]
/_placeholders probe stats
/_placeholders probe clear
/_placeholders probe dump
/_placeholders probe reload
/_placeholders probe debug [status|commands|placeholders|config|all] [page]
```

Health commands:

```text
/_placeholders health
/_placeholders health check [player]
/_placeholders health list [page]
/_placeholders health export [player]
/_placeholders health reload
/_placeholders health debug [status|commands|placeholders|config|all] [page]
```

Parent lifecycle commands:

```text
/_placeholders modules
/_placeholders module <provider|catalog|probe|health> <true|false>
```

`/_placeholders reload` reloads the Provider only. Each diagnostic route owns its module reload. `/1mbcmi config placeholders` and `/1mbcmi debug plugin placeholders all` inspect the parent lifecycle.

## Defaults

Fresh live installations use:

```yaml
enabled: true
debug: false
modules:
  provider:
    enabled: true
  catalog:
    enabled: false
  probe:
    enabled: false
  health:
    enabled: false
```

When legacy module config files already exist, the first parent startup imports each former `enabled` state into the matching module switch. Existing test-server choices therefore survive consolidation.

## Data Compatibility

The single jar deliberately keeps the existing module data paths:

```text
plugins/1MB-CMIAPI/Placeholders/config.yml
plugins/1MB-CMIAPI/1MBPlaceholders/config.yml
plugins/1MB-CMIAPI/CMIPlaceholderCheck/config.yml
plugins/1MB-CMIAPI/PlaceholderProbe/config.yml
plugins/1MB-CMIAPI/PlaceholderHealth/config.yml
```

The first path controls the parent and module switches. The four established paths retain module settings, translations, backups, logs, probe cache, and health reports. No manual copy or destructive migration is required.

## Permissions

Parent lifecycle:

```text
onembcmi.placeholders.admin
```

Provider compatibility permissions remain unchanged:

```text
onemb.placeholders.*
onemb.placeholders.admin
onemb.placeholders.view
onemb.placeholders.edit
onemb.placeholders.reload
onemb.placeholders.search
onemb.placeholders.backup
onemb.placeholders.debug
onembcmi.onembplaceholders.use
onembcmi.onembplaceholders.admin
onembcmi.onembplaceholders.view
onembcmi.onembplaceholders.edit
onembcmi.onembplaceholders.reload
onembcmi.onembplaceholders.search
onembcmi.onembplaceholders.backup
onembcmi.onembplaceholders.debug
```

Catalog, Probe, and Health retain their existing permission namespaces:

```text
onembcmi.cmiplaceholders.*
onembcmi.placeholderprobe.*
onembcmi.placeholderhealth.*
```

`onembcmi.placeholders.admin` grants the Provider, Catalog, Probe, and Health permissions through `plugin.yml`. It defaults to false. Existing individual permission defaults are preserved, including the owner-only Health permissions.

## Placeholders

The public expansion remains unchanged:

```text
%onemb_<key>%
```

Parent lifecycle placeholders:

```text
%onembcmi_placeholders.enabled%
%onembcmi_placeholders.debug%
%onembcmi_placeholders.modules.provider.enabled%
%onembcmi_placeholders.modules.catalog.enabled%
%onembcmi_placeholders.modules.probe.enabled%
%onembcmi_placeholders.modules.health.enabled%
```

All former operational namespaces remain registered as runtime module aliases while their module is active:

```text
%onembcmi_onembplaceholders.*%
%onembcmi_cmiplaceholders.*%
%onembcmi_placeholderprobe.*%
%onembcmi_placeholderhealth.*%
```

See [Placeholder reference](../placeholders.md) for the full keys.

## Migration

Stop the server and replace these four jars:

```text
1MB-CMIAPI-1MBPlaceholders-*.jar
1MB-CMIAPI-CMIPlaceholderCheck-*.jar
1MB-CMIAPI-PlaceholderProbe-*.jar
1MB-CMIAPI-PlaceholderHealth-*.jar
```

with:

```text
1MB-CMIAPI-Placeholders-*.jar
```

Do not leave an old provider jar installed beside the consolidated jar: both would attempt to register `/_placeholders` and the `onemb` PlaceholderAPI expansion.

The former `/cmiplaceholders`, `/placeholderprobe`, and `/placeholderhealth` commands are intentionally retired. Use the nested `/_placeholders catalog`, `/_placeholders probe`, and `/_placeholders health` routes.

## Safety

- Placeholder input remains restricted to one validated token where live parsing is allowed.
- Placeholder output is never executed as a command.
- Catalog, Probe, and Health are read-only except for their own bounded cache/report files.
- Provider edits retain backup and audit behavior.
- Diagnostic modules cannot unregister the production `onemb` expansion.
- Each module can be activated, reloaded, or failed closed independently.

[Plugin index](README.md)
