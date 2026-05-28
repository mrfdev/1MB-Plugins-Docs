# PlaceholderProbe

## Purpose

PlaceholderProbe is a generic developer and staff utility for safely testing PlaceholderAPI output from console or in game. It is aimed at CMI placeholders, the shared `onembcmi` expansion, and any other PlaceholderAPI expansion that is currently registered.

The first version is intentionally strict: it parses one placeholder token at a time, only accepts input that matches the configured allow pattern, and stores only a small recent history in memory unless a staff member explicitly dumps it to cache.

## Features

- Show PlaceholderAPI loaded state and registered expansion identifiers.
- Search registered PlaceholderAPI expansion identifiers by safe text.
- Parse one allowed placeholder for console, the sender, or a named online player.
- Run a configured sample set for quick CMI and `onembcmi` checks.
- Keep a bounded recent in-memory history of probe inputs and outputs.
- Classify recent output as changed, unchanged, unresolved, empty, or error.
- Show recent stats including slow probes and average parse time.
- Dump recent probe history to the shared cache folder.
- Reject free-form text, spaces, double placeholder markers, and unsafe path fragments by default.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/placeholderprobe status
/placeholderprobe parse <placeholder> [online-player]
/placeholderprobe samples [page] [online-player]
/placeholderprobe identifiers [page]
/placeholderprobe search <text> [page]
/placeholderprobe recent [page]
/placeholderprobe stats
/placeholderprobe clear
/placeholderprobe dump
/placeholderprobe reload
```

Alias:

```text
/pprobe
```

Useful examples:

```text
/placeholderprobe parse %onembcmi_global.status.loaded%
/placeholderprobe parse %onembcmi_startupdoctor.last.result%
/placeholderprobe parse %cmi_user_name% Steve
/placeholderprobe identifiers
/placeholderprobe search cmi
/placeholderprobe samples
/placeholderprobe recent
/placeholderprobe stats
/placeholderprobe dump
```

Global library examples:

```text
/1mbcmi debug plugin placeholderprobe
/1mbcmi debug plugin placeholderprobe all
/1mbcmi debug clean cache plugin placeholderprobe
/1mbcmi config placeholderprobe
/1mbcmi config set placeholderprobe recent.max 150
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.placeholderprobe.use
onembcmi.placeholderprobe.parse
onembcmi.placeholderprobe.view
onembcmi.placeholderprobe.dump
onembcmi.placeholderprobe.admin
onembcmi.placeholderprobe.admin.reload
```

## Placeholders

```text
%onembcmi_placeholderprobe.enabled%
%onembcmi_placeholderprobe.placeholderapi.loaded%
%onembcmi_placeholderprobe.identifiers.count%
%onembcmi_placeholderprobe.recent.count%
%onembcmi_placeholderprobe.last.input%
%onembcmi_placeholderprobe.last.output%
%onembcmi_placeholderprobe.last.state%
%onembcmi_placeholderprobe.last.target%
%onembcmi_placeholderprobe.last.elapsed_micros%
%onembcmi_placeholderprobe.last.error%
%onembcmi_placeholderprobe.last.changed%
%onembcmi_placeholderprobe.recent.changed.count%
%onembcmi_placeholderprobe.recent.unchanged.count%
%onembcmi_placeholderprobe.recent.unresolved.count%
%onembcmi_placeholderprobe.recent.empty.count%
%onembcmi_placeholderprobe.recent.error.count%
%onembcmi_placeholderprobe.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- PlaceholderProbe does not call CMI-API events directly.
- It is useful for testing CMI PlaceholderAPI output alongside CMI-API powered feature placeholders.

CMILib:

- CMILib remains a required runtime dependency through the CMI stack.
- Future versions may use shared GUI helpers if PlaceholderProbe gets an inventory picker for sample placeholders.

CMI:

- CMI remains the source of truth for CMI placeholders such as `%cmi_user_name%`.
- PlaceholderProbe only asks PlaceholderAPI to resolve the placeholder and displays the result.

PlaceholderAPI:

- `PlaceholderAPI.setPlaceholders(...)` resolves tested placeholders.
- `PlaceholderAPI.getRegisteredIdentifiers()` lists available expansion identifiers.

Paper:

- Paper command, plugin metadata, filesystem, and Adventure MiniMessage APIs are used.
- Player target input is limited to normal online Minecraft names.

## Config

Important config paths:

```text
enabled
debug
recent.max
input.max-length
input.allowed-pattern
output.max-length
identifiers.per-page
samples.per-page
stats.slow-threshold-micros
dump.file
samples.placeholders
```

Default sample placeholders include a small mix of `onembcmi` and CMI placeholders:

```text
%onembcmi_global.status.loaded%
%onembcmi_global.plugins.count%
%onembcmi_global.placeholderapi.registered%
%onembcmi_startupdoctor.last.result%
%onembcmi_startupdoctor.warnings.count%
%cmi_user_name%
%cmi_user_display_name%
%cmi_user_afk%
```

## Data

PlaceholderProbe writes support dumps to the shared cache area:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/placeholderprobe/placeholderprobe-recent.log
```

It does not write playerdata or persistent server state.

## Safety

Version 1 parses one placeholder token at a time. It does not accept full chat lines, command strings, MiniMessage markup, whitespace, or unknown path shapes by default. Identifier search accepts only safe identifier characters. Output and errors are shortened before they are stored in recent history or shown in command output.

## Shared Library Usage

PlaceholderProbe uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing for its own probe placeholders, tab filtering, shared cache paths, and debug metadata.

[Plugin index](README.md)
