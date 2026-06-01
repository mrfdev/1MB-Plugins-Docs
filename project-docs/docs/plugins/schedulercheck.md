# SchedulerCheck

## Purpose

SchedulerCheck is a direct-console server-owner helper for CMI's scheduler file. It validates `plugins/CMI/Settings/Schedules.yml` or `Scheduler.yml`, reports YAML syntax errors, checks common CMI scheduler field types, explains why a value is risky, and exports a Discord-friendly Markdown report.

The plugin is intentionally not a player tool and does not support RCON. It is for direct server console use when reviewing CMI scheduler entries before a restart or after editing the file.

## Features

- Parse CMI scheduler YAML with Bukkit's YAML loader and report syntax errors such as broken quotes.
- Support the common CMI path `plugins/CMI/Settings/Schedules.yml` and fallback paths including `Scheduler.yml`.
- Validate documented CMI scheduler booleans such as `Enabled`, `Repeat`, `Randomize`, `DuplicateRandomize`, `SingleLinear`, `FeedBack`, and `DontTranslatePlaceholders`.
- Validate numeric fields such as `Delay`, `MinPlayers`, and `MaxPlayers`.
- Validate `PerformOn` time fields:
  - `Hour`: `0` to `23`
  - `Minute`: `0` to `59`
  - `Second`: `0` to `59`
  - `Month`: `1` to `12`
  - `Day`: `1` to `31` or weekday names such as `Monday`
  - `FirstMonthDay` and `LastMonthDay`: weekday names
- Warn when enabled entries have no clear trigger.
- Warn when entries combine interval `Delay` and fixed-time `PerformOn`.
- Warn when command lists are missing, empty, or contain non-text entries.
- Detect impossible player-count ranges such as `MaxPlayers` below `MinPlayers`.
- List all, enabled, or disabled scheduler entries.
- Print full details for one scheduler entry.
- Export the latest check result to Markdown in the feature cache folder.
- Set one scheduler entry's `Enabled: true|false` with a line-preserving edit that does not rewrite the whole CMI file.

## Commands

```text
/_scheduler
/_scheduler info
/_scheduler help
/_scheduler check
/_scheduler scan
/_scheduler export
/_scheduler list
/_scheduler list all
/_scheduler list enabled
/_scheduler list disabled
/_scheduler list id <key>
/_scheduler set <key> true
/_scheduler set <key> false
/_scheduler reload
/_scheduler debug all
```

There are no aliases.

## Example Commands

```text
/_scheduler check
/_scheduler export
/_scheduler list enabled
/_scheduler list id Announcer
/_scheduler set Announcer false
/_scheduler debug all
```

`/_scheduler set <key> true|false` edits the CMI scheduler file only. A full `/stop` and server start is recommended before trusting scheduler runtime behavior. You can try `/cmi reload` or `/cmi schedule <key>` for CMI-side testing, but a restart is the cleanest way to apply scheduler-file changes.

## Permissions

The command is direct-console only, but permissions are still declared for debug consistency:

```text
onembcmi.schedulercheck.admin
onembcmi.schedulercheck.check
onembcmi.schedulercheck.export
onembcmi.schedulercheck.list
onembcmi.schedulercheck.set
onembcmi.schedulercheck.debug
```

All permissions default to `false`. Operator status does not grant them automatically, and player/RCON command senders are rejected before the command runs.

## Config

Important config paths:

```text
enabled
debug
scheduler.file
scheduler.fallback-files
validation.warn-missing-enabled
validation.warn-both-delay-and-performon
validation.warn-enabled-without-trigger
validation.warn-empty-commands
output.max-findings
export.directory
```

`scheduler.file` defaults to `plugins/CMI/Settings/Schedules.yml`. Fallbacks include `plugins/CMI/Settings/Scheduler.yml`, `CMI/Settings/Schedules.yml`, and `CMI/Settings/Scheduler.yml` so the same jar can work across local and live folder naming.

## Data

SchedulerCheck writes exports to the shared feature cache:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-latest.md
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-<timestamp>.md
```

It does not write playerdata.

`/_scheduler set` can edit the CMI scheduler file by changing or inserting one `Enabled:` line under the requested schedule key. The edit is deliberately line-based so CMI comments and surrounding formatting survive.

## CMI / CMILib Usage

CMI:

- SchedulerCheck reads CMI's scheduler YAML from `plugins/CMI/Settings/`.
- The validator follows the rules documented in the scheduler file header and links to <https://www.zrips.net/schedule/>.
- It does not call CMI internals to start, stop, or reload schedules.

CMILib:

- CMILib remains a required dependency through the shared 1MB-CMIAPI stack.

CMI-API:

- No direct CMI-API scheduler mutation is used. The plugin is intentionally file/report oriented.

Paper:

- Uses Paper/Bukkit command, console sender, YAML, plugin metadata, and Adventure output APIs.

## Security Notes

- Direct console only.
- RCON is explicitly rejected.
- No command aliases.
- `set` only accepts safe schedule keys containing letters, numbers, underscore, dash, or dot.
- `set` only accepts literal `true` or `false`.
- Exported reports contain scheduler keys, paths, findings, and command lines; review them before posting publicly.

[Documentation index](README.md)
