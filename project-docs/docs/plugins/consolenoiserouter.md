# ConsoleNoiseRouter

## Purpose

ConsoleNoiseRouter is a server-management plugin that listens to CMI console message events and classifies them into useful categories: ignored noise, warnings, errors, alerts, and unknown messages.

The goal is to make CMI-related console output easier to review without mutating gameplay state.

## Feature Ideas

- Listen to CMI async console message events.
- Classify messages with strict configured patterns.
- Store recent matching messages in cache.
- Track per-level counts for info, ignored, debug, warn, and error.
- Show total and recent classified counts by level.
- Provide a debug page showing recent messages by category.
- Paginate recent output and allow filtering by level.
- Inspect one recent record by sequence number.
- Search recent sanitized message text, level, or matching rule with strict input.
- Dump recent records to the feature cache directory for support/debug sessions.
- Allow staff to mark a pattern as ignored or watched in a future behavior pass.
- Produce a concise digest for server startup or reload.
- Support dry-run pattern testing before saving config changes.

## Commands

```text
/consolenoise
/consolenoise status
/consolenoise patterns
/consolenoise recent [level|all] [page]
/consolenoise stats [level|all]
/consolenoise inspect <sequence>
/consolenoise find <text> [page]
/consolenoise test <message>
/consolenoise clear [level|all]
/consolenoise dump [level|all]
/consolenoise reload
```

Useful examples:

```text
/consolenoise patterns
/consolenoise test CMI warning deprecated placeholder key=abc123
/consolenoise recent warn
/consolenoise recent all 2
/consolenoise stats warn
/consolenoise inspect 1
/consolenoise find deprecated
/consolenoise dump error
```

Global library examples:

```text
/1mbcmi debug plugin consolenoiserouter
/1mbcmi debug clean cache plugin consolenoiserouter
/1mbcmi config consolenoiserouter
/1mbcmi config set consolenoiserouter recent.max 250
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.consolenoiserouter.use
onembcmi.consolenoiserouter.view
onembcmi.consolenoiserouter.dump
onembcmi.consolenoiserouter.admin
onembcmi.consolenoiserouter.admin.reload
```

## Placeholders

```text
%onembcmi_consolenoiserouter.enabled%
%onembcmi_consolenoiserouter.last_level%
%onembcmi_consolenoiserouter.last_rule%
%onembcmi_consolenoiserouter.last_message%
%onembcmi_consolenoiserouter.last_test%
%onembcmi_consolenoiserouter.last_cmi_time%
%onembcmi_consolenoiserouter.recent.count%
%onembcmi_consolenoiserouter.total.count%
%onembcmi_consolenoiserouter.recent.error.count%
%onembcmi_consolenoiserouter.recent.warn.count%
%onembcmi_consolenoiserouter.count.error%
%onembcmi_consolenoiserouter.count.warn%
%onembcmi_consolenoiserouter.count.debug%
%onembcmi_consolenoiserouter.count.ignored%
%onembcmi_consolenoiserouter.count.info%
%onembcmi_consolenoiserouter.cache.size%
```

## Levels

```text
error
warn
debug
ignored
info
```

Patterns are configured through `patterns.<level>` config lists. Version 1 observes, classifies, redacts, and reports; it does not hide or suppress console output.

## Config

Important config paths:

```text
enabled
recent.max
message.max-length
output.recent-per-page
dump.max-records
test.records
ignored.record
log-to-cache.enabled
log-to-cache.file
patterns.error
patterns.warn
patterns.debug
patterns.ignored
```

## CMI / CMILib Usage

CMI-API:

- `CMIAsyncConsoleMessageEvent`

CMILib:

- shared message formatting and debug output
- optional log helpers if useful

CMI:

- CMI emits the console message event. This plugin should classify and display, not suppress aggressively in version 1.

Paper:

- command output for console and staff players
- async safety: do not touch unsafe Bukkit APIs from async event context without scheduling back to the main thread

## Safety

Patterns should be allowlisted and config changes should be strict. Console messages are sanitized before display and cache dumps redact IPv4-looking values and `password=`, `token=`, `secret=`, or `key=` style values.

## Shared Library Usage

ConsoleNoiseRouter uses `1MB-CMIAPI-LIB` for feature registration, config-backed recent buffer sizing, translation defaults, permission checks, tab filtering, and global debug/config commands.

[Plugin index](README.md)
