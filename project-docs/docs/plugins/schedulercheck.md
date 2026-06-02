# SchedulerCheck

## Purpose

SchedulerCheck is a direct-console server-owner helper for CMI's scheduler file. It validates `plugins/CMI/Settings/Schedules.yml` or `Scheduler.yml`, reports YAML syntax errors, checks common CMI scheduler field types, explains why a value is risky, and exports a Discord-friendly Markdown report.

The plugin is intentionally not a player tool and does not support RCON. It is for direct server console use when reviewing CMI scheduler entries before a restart or after editing the file.

## Features

- Parse CMI scheduler YAML with Bukkit's YAML loader and report syntax errors such as broken quotes.
- Support the common CMI path `plugins/CMI/Settings/Schedules.yml` and fallback paths including `Scheduler.yml`.
- Validate documented CMI scheduler booleans such as `Enabled`, `Repeat`, `Randomize`, `DuplicateRandomize`, `SingleLinear`, `FeedBack`/`Feedback`, and `DontTranslatePlaceholders`, requiring literal `true` or `false`.
- Validate numeric fields such as `Delay`, `MinPlayers`, and `MaxPlayers`, requiring plain whole numbers. `Delay` is treated as seconds, so values such as `5m` or `5 minutes` are reported.
- Validate `PerformOn` time fields:
  - `Hour`: `0` to `23`
  - `Minute`: `0` to `59`
  - `Second`: `0` to `59`
  - `Month`: `1` to `12`
  - `Day`: `1` to `31` or weekday names such as `Monday`
  - `FirstMonthDay` and `LastMonthDay`: weekday names
- Warn when enabled entries have no clear trigger.
- Optionally warn when entries combine interval `Delay` and fixed-time `PerformOn`. This warning is off by default because CMI's own sample entry can combine both for demonstration.
- Report enabled schedules that are missing `Commands:` or have an empty command list.
- Warn when command lists contain non-text or blank entries.
- Validate known CMI specialized command prefixes such as `delay!`, `asConsole!`, `asFakeOp!`, `allPlayers!`, `moneycost:...!`, `if:...!`, `ph!`, and `ch!`, and warn on unknown `something!` prefixes.
- Warn on risky scheduler commands such as `asFakeOp!`, `kickall!`, `allPlayers!`, `stop`, `restart`, `reload`, `lp`, `op`, and similar high-impact roots.
- Warn when schedule ids look like drafts/examples/tests but are enabled.
- Suggest fixes for common schedule-id typos.
- Warn when two enabled schedules have the same trigger summary and command list.
- Detect impossible player-count ranges such as `MaxPlayers` below `MinPlayers`.
- List all, enabled, or disabled scheduler entries.
- Print full details for one scheduler entry.
- Explain one scheduler entry in plain English.
- Estimate upcoming fixed-time `PerformOn` runs over the next 24 hours or 7 days.
- Export the latest check result to full Markdown or a shorter Discord-friendly summary.
- Show complete direct-console help without filtering commands by permission nodes.
- Set one scheduler entry's `Enabled: true|false` with a line-preserving edit that does not rewrite the whole CMI file, with an optional audit reason.
- Create simple interval or daily scheduler entries from console without direct file-system access.
- Write audit log entries for scans, exports, enabled-state changes, and created schedules.

## Commands

```text
/_scheduler
/_scheduler info
/_scheduler help
/_scheduler check
/_scheduler scan
/_scheduler explain <key>
/_scheduler upcoming 24h
/_scheduler upcoming 7d
/_scheduler export
/_scheduler export discord
/_scheduler list
/_scheduler list all
/_scheduler list enabled
/_scheduler list disabled
/_scheduler list error
/_scheduler list id <key>
/_scheduler set <key> true
/_scheduler set <key> false
/_scheduler set <key> true --reason <text>
/_scheduler set <key> enabled false --reason <text>
/_scheduler fix <key> <path> <value>
/_scheduler fix <key> <path> <value> --apply --reason <text>
/_scheduler create <key> delay <seconds> <true|false> --command <command> [--command <command>] [--reason <text>]
/_scheduler create <key> daily <hour> <minute> <true|false> --command <command> [--command <command>] [--reason <text>]
/_scheduler reload
/_scheduler debug all
```

There are no aliases.

## Example Commands

```text
/_scheduler check
/_scheduler export
/_scheduler export discord
/_scheduler explain Announcer
/_scheduler upcoming 24h
/_scheduler list error
/_scheduler list enabled
/_scheduler list id Announcer
/_scheduler set Announcer false --reason quiet during maintenance
/_scheduler fix resetWeatherTime PerformOn.2.Hour 23
/_scheduler fix resetWeatherTime PerformOn.2.Hour 23 --apply --reason invalid hour hotfix
/_scheduler fix Announcer Feedback false --apply --reason strict boolean cleanup
/_scheduler create morningAnnouncer daily 6 0 false --command broadcast! Good morning from 1MoreBlock --reason draft test
/_scheduler create pinataClear delay 600 false --command asFakeOp! pinata killall --command actionbar! &ePinatas cleared
/_scheduler debug all
```

`/_scheduler set <key> true|false` edits the CMI scheduler file only. A full `/stop` and server start is recommended before trusting scheduler runtime behavior. You can try `/cmi reload` or `/cmi schedule <key>` for CMI-side testing, but a restart is the cleanest way to apply scheduler-file changes.

`/_scheduler fix <key> <path> <value>` is a dry-run by default. It validates the requested value, finds the exact YAML line that would be edited, and prints the current value plus the command to apply it. Add `--apply` only after reviewing the dry-run. Applied fixes create a timestamped backup first, reload the YAML to confirm the edit is syntactically valid, and write an audit log entry. If the post-edit YAML reload fails, SchedulerCheck restores the backup.

Safe hotfix paths are deliberately limited to scalar fields:

```text
Enabled, Repeat, Feedback, Randomize, DuplicateRandomize, SingleLinear, DontTranslatePlaceholders
Delay, MinPlayers, MaxPlayers
PerformOn.<frame>.Hour, PerformOn.<frame>.Minute, PerformOn.<frame>.Second
PerformOn.<frame>.Month, PerformOn.<frame>.Day, PerformOn.<frame>.FirstMonthDay, PerformOn.<frame>.LastMonthDay
```

The hotfix command does not edit `Commands:` lists or rewrite whole schedule blocks. Use file review for those changes.

`/_scheduler create` appends a new simple schedule entry to the CMI scheduler file, then reloads the YAML to make sure the edit is syntactically valid. Created entries can be interval-based with `delay <seconds>` or fixed-time daily entries with `daily <hour> <minute>`. Each `--command` chunk becomes one `Commands:` list item.

## Permissions

The command is direct-console only, but permissions are still declared for debug consistency:

```text
onembcmi.schedulercheck.admin
onembcmi.schedulercheck.check
onembcmi.schedulercheck.explain
onembcmi.schedulercheck.export
onembcmi.schedulercheck.list
onembcmi.schedulercheck.set
onembcmi.schedulercheck.fix
onembcmi.schedulercheck.create
onembcmi.schedulercheck.debug
```

All permissions default to `false`. Operator status does not grant them automatically. Player/RCON command senders are rejected before the command runs, while direct server console can run the owner commands and see the complete help list.

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
audit.directory
```

`scheduler.file` defaults to `plugins/CMI/Settings/Schedules.yml`. Fallbacks include `plugins/CMI/Settings/Scheduler.yml`, `CMI/Settings/Schedules.yml`, and `CMI/Settings/Scheduler.yml` so the same jar can work across local and live folder naming.

## Data

SchedulerCheck writes exports to the shared feature cache:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-latest.md
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-<timestamp>.md
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-discord-latest.md
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/reports/schedulercheck-discord-<timestamp>.md
```

SchedulerCheck writes audit logs to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/schedulercheck/logs/schedulercheck-audit.log
```

It does not write playerdata.

`/_scheduler set` can edit the CMI scheduler file by changing or inserting one `Enabled:` line under the requested schedule key. The edit is deliberately line-based so CMI comments and surrounding formatting survive.

`/_scheduler fix` can dry-run and apply narrow scalar hotfixes for fields that SchedulerCheck can validate safely. It keeps the edit line-based, creates a backup before writing, and refuses unsupported broad edits.

`/_scheduler create` can append a new simple schedule entry. It writes one small SchedulerCheck comment above the created entry, quotes command lines safely, and validates the resulting YAML before reporting success.

## CMI / CMILib Usage

CMI:

- SchedulerCheck reads CMI's scheduler YAML from `plugins/CMI/Settings/`.
- The validator follows the rules documented in the scheduler file header and links to <https://www.zrips.net/schedule/>.
- Specialized command prefix validation follows CMI's specialized command syntax documented at <https://www.zrips.net/cmi/commands/specialized/>.
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
- `create` only accepts safe schedule keys, simple delay/daily trigger shapes, literal `true|false`, and command chunks passed through `--command`.
- Exported reports contain scheduler keys, paths, findings, and command lines; review them before posting publicly.

[Documentation index](README.md)
