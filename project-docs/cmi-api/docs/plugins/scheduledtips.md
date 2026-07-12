# ScheduledTips

## Purpose

ScheduledTips replaces simple CMI `scheduler.yml` tip broadcasts with a dedicated 1MB CMI-API feature plugin. It rotates through configured tips, sends them as clickable Adventure messages, and gives players control over what they keep seeing.

It covers the current CMI scheduled-tip workflow while adding player-friendly controls and optional dynamic awareness of live `/rate` boosters:

- players can hide all scheduled tips with `/tips off`, useful while recording videos
- players can click a red `[x]` before a repeated tip after they have seen it enough times
- if Boosters is installed and a tip about mcMMO, Jobs, `/points`, or DiscordChat would display while that booster is live, the tip is replaced by a clickable `/rate` reminder

## Features

- Rotate through configured tips on a timer.
- Send clickable chat messages with subtle MiniMessage styling.
- Add a red `[x]` click action before a tip after a player has seen it enough times.
- Add a `[tips off]` click action so players can globally hide scheduled tips.
- Make `/tips on` and `/tips off` confirmation messages clickable so players can quickly switch back.
- Replace matching mcMMO, Jobs, `/points`, and DiscordChat tips with a live booster reminder when the matching `/rate` booster is active.
- Expose a small library service so RecordingMode can hide ScheduledTips during recording mode when both jars are installed.
- Track per-player seen counts, dismissed tips, and global visibility in shared playerdata.
- Let players view status, list tips, inspect seen counts, dismiss tips, and reset their own data.
- Let staff list, preview, broadcast, reset, and reload tips.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/tips status
/tips on
/tips off
/tips toggle
/tips list [page]
/tips seen [page]
/tips dismiss <tip-id>
/tips reset
/tips admin list [page]
/tips admin status
/tips admin last
/tips admin next
/tips admin add <tip-id> <MiniMessage text>
/tips admin edit <tip-id> <MiniMessage text>
/tips admin remove <tip-id>
/tips admin enable-tip <tip-id>
/tips admin disable-tip <tip-id>
/tips admin enable
/tips admin disable
/tips admin preview <tip-id>
/tips admin broadcast [tip-id]
/tips admin reset <online-player> [all|tip-id]
/tips admin config [page]
/tips admin set <path> <value>
/tips admin reload
```

Global library examples:

```text
/1mbcmi debug plugin scheduledtips
/1mbcmi debug plugin scheduledtips all
/1mbcmi config scheduledtips
/1mbcmi config set scheduledtips schedule.interval-seconds 600
/tips admin add discord Join our <color:#bde0fe>Discord</color> with /discord.
/tips admin disable-tip profile
/tips admin set dismiss.after-seen-count 8
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.scheduledtips.use
onembcmi.scheduledtips.toggle
onembcmi.scheduledtips.dismiss
onembcmi.scheduledtips.admin
onembcmi.scheduledtips.admin.broadcast
onembcmi.scheduledtips.admin.reset
onembcmi.scheduledtips.admin.reload
```

## Placeholders

```text
%onembcmi_scheduledtips.enabled%
%onembcmi_scheduledtips.tips.count%
%onembcmi_scheduledtips.opted_out%
%onembcmi_scheduledtips.seen.total%
%onembcmi_scheduledtips.dismissed.count%
%onembcmi_scheduledtips.last_tip%
%onembcmi_scheduledtips.runtime.sent%
%onembcmi_scheduledtips.runtime.dismissed%
%onembcmi_scheduledtips.runtime.booster_reminders%
%onembcmi_scheduledtips.cache.size%
```

## CMI / CMILib Usage

CMI:

- CMI remains a runtime dependency in the project stack.
- ScheduledTips is intended to replace CMI scheduler.yml tip broadcasts when you want per-player dismiss/toggle behavior.
- Player-facing ScheduledTips chat uses the shared feature-prefix system with visible prefix name `Tips`, so scheduled tip broadcasts and `/tips` responses do not use the generic `1MB CMI-API` library prefix. The symbol comes from `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.scheduledtips`.
- When the Boosters feature is installed, ScheduledTips can ask the shared Boosters service for live `/rate` booster state and replace matching booster tips with a clickable reminder.
- Future versions can inspect or import existing CMI scheduler-style tip command text if we decide that is useful.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.

Paper:

- Paper scheduler APIs run the repeating tip task.
- Adventure components, MiniMessage, click events, and hover events render the clickable tip output.
- Shared playerdata persists per-player seen counts, dismissed tips, and global visibility.

## Config

Important config paths:

```text
enabled
schedule.initial-delay-seconds
schedule.interval-seconds
schedule.min-players
schedule.randomize
dismiss.after-seen-count
broadcast.require-permission
broadcast.show-dismiss-before-threshold
broadcast.show-off-button
list.entries-per-page
booster-reminders.enabled
booster-reminders.generic-keywords
booster-reminders.tip-id-matchers.mcmmo
booster-reminders.tip-id-matchers.jobs
booster-reminders.tip-id-matchers.points
booster-reminders.tip-id-matchers.discordchat
booster-reminders.text-keywords.mcmmo
booster-reminders.text-keywords.jobs
booster-reminders.text-keywords.points
booster-reminders.text-keywords.discordchat
tips
disabled-tip-ids
```

Tip entries use this format:

```text
id|MiniMessage text shown to players
```

Example:

```yaml
schedule:
  min-players: 2
  randomize: true
tips:
  - "visit|Use <color:#bde0fe>/visit set</color> to create a public visit point for your builds."
  - "profile|Use <color:#bde0fe>/tips off</color> if you need a clean chat while recording."
disabled-tip-ids:
  - "profile"
booster-reminders:
  enabled: true
  generic-keywords:
    - "booster"
    - "boosters"
    - "/rate"
  tip-id-matchers:
    mcmmo:
      - "mcmmo"
      - "mcmmo_*"
    jobs:
      - "jobs"
      - "jobs_*"
    points:
      - "points"
      - "points_*"
      - "pointy_*"
    discordchat:
      - "discordchat"
      - "discord_*"
  text-keywords:
    mcmmo:
      - "mcmmo"
      - "/mcstats"
    jobs:
      - "/jobs"
      - "jobs booster"
    points:
      - "/points"
      - "pointy fish"
    discordchat:
      - "discordchat"
      - "server-chat"
```

Specific matchers win first. For example, a tip id `mcmmo_booster` only turns into a reminder when the mcMMO booster is live. A generic booster tip with no specific match can turn into a reminder for any currently active booster.

A larger converted 1MB example based on the previous CMI `schedules.yml` announcer lives at [scheduledtips-1mb.yml](../examples/scheduledtips-1mb.yml).

## Data

Shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
scheduledtips:
  opted-out: false
  seen:
    visit: 12
  dismissed:
    visit: "2026-04-25T00:00:00Z"
```

## Security Notes

- Tip ids are normalized to strict lowercase `a-z`, `0-9`, `_`, and `-`.
- `/tips admin add`, `edit`, and `remove` update only the `tips` list in this feature config.
- `/tips admin enable-tip` and `disable-tip` update only `disabled-tip-ids`.
- `/tips admin set` is limited to known scalar config paths registered by this feature.
- Player commands never run arbitrary configured commands.
- Click actions only call this plugin's own `/tips dismiss <id>`, `/tips off`, and `/tips on` commands.
- Dynamic booster reminder click actions only run `/rate`.
- Player-specific data is stored under the shared playerdata namespace `scheduledtips`.
- Configured tip text is treated as trusted admin-authored MiniMessage content.

## Shared Library Usage

ScheduledTips uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, PlaceholderAPI routing, tab filtering, paginated list output, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, debug metadata, and optional service discovery for Boosters live-state reminders.

[Plugin index](README.md)
