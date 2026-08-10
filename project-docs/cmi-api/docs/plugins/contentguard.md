# ContentGuard

ContentGuard combines FilterLab and FilterGuard into one staff-facing jar. FilterLab remains a read-only CMI ChatFilter simulation module; FilterGuard remains the enforcement module for signs, books, anvils, item names, entity name tags, and CMI nicknames.

## How Staff Use It

Available features include:

- safe `/filterlab` rule simulation, rule inspection, counters, and recent test results;
- `/filterguard` monitoring and configurable blocking for supported player-written text surfaces;
- the same FilterLab and FilterGuard commands, aliases, permissions, placeholders, translations, alerts, and config files used before consolidation;
- one ContentGuard lifecycle switch for making both modules active or dormant;
- independent Lab and Guard module switches, allowing simulation to remain available while enforcement is paused;
- a global debug logging switch and parent status page.

Detailed module references remain available in [FilterLab](filterlab.md) and [FilterGuard](filterguard.md).

## Commands

```text
/contentguard status
/contentguard module <lab|guard> <true|false>
/contentguard reload
/contentguard debug true
/contentguard debug false
/contentguard debug enable true
/contentguard debug enable false
```

`debug true|false` changes ContentGuard diagnostic logging. `debug enable true|false` changes the whole feature lifecycle. ContentGuard defaults to dormant on a fresh installation.

The original module commands and aliases are unchanged:

```text
/filterlab [status|test|rules|recent|reload]
/filterguard [status|test|recent|rules|reload]
```

## Permissions

```text
onembcmi.contentguard.admin
onembcmi.filterlab.use
onembcmi.filterlab.test
onembcmi.filterlab.rules
onembcmi.filterlab.admin
onembcmi.filterlab.admin.reload
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
%onembcmi_contentguard.enabled%
%onembcmi_contentguard.debug%
%onembcmi_contentguard.modules.lab.enabled%
%onembcmi_contentguard.modules.guard.enabled%
```

All `%onembcmi_filterlab_*%` and `%onembcmi_filterguard_*%` placeholders remain registered as compatibility namespaces while their module is active.

## Config And Data

The parent lifecycle is stored in:

```text
plugins/1MB-CMIAPI/ContentGuard/config.yml
```

```yaml
enabled: false
debug: false
modules:
  lab:
    enabled: true
  guard:
    enabled: true
```

Module settings remain in their existing files:

```text
plugins/1MB-CMIAPI/FilterLab/config.yml
plugins/1MB-CMIAPI/FilterGuard/config.yml
plugins/1MB-CMIAPI/translations/filterlab.yml
plugins/1MB-CMIAPI/translations/filterguard.yml
```

On the first ContentGuard start, an existing module config's old `enabled` value is imported into the matching parent switch. After migration, `ContentGuard/config.yml` controls module lifecycle; the old module-level `enabled` key is retained only for compatibility.

FilterGuard also has a one-time, versioned safety migration. Existing alert-only defaults for signs and books are upgraded to `cancel-and-alert`, and missing entity-name protection is enabled. Explicit custom actions and explicit disables are preserved. The migration is persisted atomically in `FilterGuard/config.yml`; if it cannot be saved, only the Guard module remains fail-closed and dormant.

## Upgrade From Separate Jars

1. Stop the server.
2. Remove `1MB-CMIAPI-FilterLab-*.jar` and `1MB-CMIAPI-FilterGuard-*.jar`.
3. Keep the existing `FilterLab/`, `FilterGuard/`, and translation files.
4. Install the matching `1MB-CMIAPI-ContentGuard-*.jar` and LIB jar.
5. Start the server, activate it when appropriate with `/contentguard debug enable true`, and run `/contentguard status`.

Do not load the old standalone jars beside ContentGuard; they register the same commands and listeners.

## Safety

- FilterGuard's listener paths recheck the authoritative Guard module state before inspecting or cancelling an event.
- Making only the Guard module dormant leaves FilterLab simulation available.
- Explicit custom per-surface actions remain authoritative; only legacy alert-only defaults and missing entity-name protection are hardened once.
- CMI `Settings/ChatFilter.yml` remains the rule source and is never edited by ContentGuard.

## Runtime

- Java target: 25
- Paper target: 26.2
- Required: CMI, CMILib, 1MB-CMIAPI-LIB
- Optional: PlaceholderAPI, LuckPerms, Vault

[Plugin index](README.md)
