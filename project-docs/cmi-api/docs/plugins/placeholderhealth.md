# PlaceholderHealth

## Purpose

PlaceholderHealth is a read-only server-owner monitor for PlaceholderAPI output. It is meant for the known placeholders that matter to server operations, CMI holograms, ctext pages, ajLeaderboards, and 1MB feature dashboards.

It is different from PlaceholderProbe: PlaceholderProbe is for ad hoc single-placeholder testing, while PlaceholderHealth runs a configured sample set and reports whether each sample looks healthy.

## Features

- Parse configured PlaceholderAPI samples only.
- Support server-level samples and online-player-required samples.
- Flag unresolved placeholders, `%...%` output, errors, empty values, and slow parse times.
- Show ok/warn/error rows in console or in game for permitted admins.
- Export the latest or freshly-run check as a Discord-friendly Markdown report.
- Register build, hook, command, permission, placeholder, and config metadata through `1MB-CMIAPI-LIB`.
- Stay passive: it never edits PlaceholderAPI, CMI, holograms, configs, or playerdata.

## Commands

```text
/placeholderhealth
/placeholderhealth info
/placeholderhealth help
/placeholderhealth check [player]
/placeholderhealth list [page]
/placeholderhealth export [player]
/placeholderhealth reload
/placeholderhealth debug [overview|health|hooks|commands|permissions|placeholders|config|all] [page]
```

Examples:

```text
/placeholderhealth check mrfloris
/placeholderhealth list
/placeholderhealth export mrfloris
/placeholderhealth debug placeholders
/placeholderhealth debug all
```

## Permissions

```text
onembcmi.placeholderhealth.admin
onembcmi.placeholderhealth.check
onembcmi.placeholderhealth.list
onembcmi.placeholderhealth.export
onembcmi.placeholderhealth.reload
onembcmi.placeholderhealth.debug
```

All nodes default to false. Grant `onembcmi.placeholderhealth.admin` only to owner-level staff, or grant individual read/export nodes to trusted technical staff.

## Placeholders

```text
%onembcmi_placeholderhealth.enabled%
%onembcmi_placeholderhealth.placeholderapi.loaded%
%onembcmi_placeholderhealth.samples.count%
%onembcmi_placeholderhealth.last.status%
%onembcmi_placeholderhealth.last.ok%
%onembcmi_placeholderhealth.last.warn%
%onembcmi_placeholderhealth.last.error%
%onembcmi_placeholderhealth.last.target%
%onembcmi_placeholderhealth.checks.run%
%onembcmi_placeholderhealth.exports.written%
```

## Config

Important paths:

```text
enabled
debug
check.warn-slow-micros
check.max-output-length
check.empty-is-error
check.samples-per-page
export.file-prefix
samples.order
samples.<id>.placeholder
samples.<id>.player-required
samples.<id>.allow-empty
```

Default samples include global 1MB placeholders, Forage hologram-focused placeholders, StartupDoctor result state, and a CMI user placeholder.

## Data

Exports are written to:

```text
plugins/1MB-CMIAPI/PlaceholderHealth/reports/
```

The plugin keeps only the latest report in memory during runtime. It does not write playerdata or modify external plugin files.

## CMI / CMILib Usage

CMI:

- CMI remains the source for CMI placeholders such as `%cmi_user_name%`.
- PlaceholderHealth only asks PlaceholderAPI to parse configured CMI placeholders.

CMILib:

- CMILib is part of the required CMI runtime stack.

PlaceholderAPI:

- `PlaceholderAPI.setPlaceholders(...)` resolves configured samples.
- Missing or unresolved output is reported as warn/error depending on the sample settings.

Paper:

- Paper command, plugin metadata, and filesystem APIs are used.
- Player target input is limited to online Minecraft names.

## Safety

PlaceholderHealth is passive and report-only. It accepts no free-form placeholder strings from command input, never runs commands from placeholder output, and never writes to CMI, PlaceholderAPI, hologram, or leaderboard configuration.

[Plugin index](README.md)
