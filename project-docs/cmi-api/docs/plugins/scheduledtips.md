# ScheduledTips

## Purpose

ScheduledTips replaces simple CMI `scheduler.yml` tip broadcasts with a dedicated 1MB Library feature plugin. It rotates through configured tips, offers them through the shared guidance policy as clickable chat or short action-bar hints, and gives players control over what they keep seeing.

It covers the current CMI scheduled-tip workflow while adding player-friendly controls and optional dynamic awareness of live `/rate` boosters:

- players can hide all scheduled tips with `/tips off`, useful while recording videos
- players can immediately choose **[Hide]**, **[Later]**, or **[Settings]** on chat hints
- if Boosters is installed and a tip about mcMMO, Jobs, `/points`, or DiscordChat would display while that booster is live, the tip is replaced by a clickable `/rate` reminder

## Features

- Rotate through configured tips on a timer.
- Skip tips that require dormant, disabled, missing, or inaccessible Feature Plugins, with automatic compatibility for existing Forage tips.
- Send clickable chat messages with subtle MiniMessage styling.
- Hide or postpone a hint immediately, with persistent shared controls in `/guidance`.
- Share one per-player hint frequency limit with other connected features, including AutoSell quest reminders.
- Make `/tips on` and `/tips off` confirmation messages clickable so players can quickly switch back.
- Replace matching mcMMO, Jobs, `/points`, and DiscordChat tips with a live booster reminder when the matching `/rate` booster is active.
- Respect RecordingMode's shared temporary hint pause without overwriting saved visibility choices.
- Track per-player delivered counts, local dismissals, and visibility with asynchronous, atomic UUID storage.
- Let players view status, list tips, inspect seen counts, dismiss tips, and reset their own data.
- Let staff list, preview, broadcast, reset, and reload tips.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Player FAQ

### How do I stop seeing tips?

Use `/tips off` to hide scheduled tips. `/tips on` allows them again, following your shared guidance choices. Open `/tips settings` or `/guidance` to choose fewer hints across connected features, pause for a while, or use the action bar.

### Can I hide one repeated tip instead of all tips?

Yes. Click **[Hide]** on a chat hint or open **Recent hints** in `/guidance`. You can also use `/tips dismiss <tip-id>` immediately; no minimum view count is required. `/tips list` lets you read tips and find their IDs.

### How do I bring dismissed tips back?

For hints hidden through **[Hide]**, open **Hidden and postponed hints** in `/guidance` and restore one or all. `/tips reset` resets ScheduledTips' own seen counts, local dismissals from `/tips dismiss`, and visibility. It preserves your shared hidden hints, frequency, and display choice. `/tips status` links to the shared settings.

### Why did a tip become a booster reminder?

When the matching booster is active, an ordinary tip can be replaced by a clickable `/rate` reminder so you can see the current bonus.

### Why did a tip disappear?

An activity may be paused or unavailable to you. Its tips disappear from rotation, `/tips list`, and `/tips seen` until it is available again. Your hidden choices and view counts stay saved. Older entries in `/guidance` use an unavailable title while retaining their hide/restore controls. Restoring one does not enable the activity or immediately replay a tip.

## Commands

```text
/tips status
/tips settings
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
/1mblib debug plugin scheduledtips
/1mblib debug plugin scheduledtips all
/1mblib config scheduledtips
/1mblib config set scheduledtips schedule.interval-seconds 600
/tips admin add discord Join our <color:#bde0fe>Discord</color> with /discord.
/tips admin disable-tip profile
/1mblib config set global guidance.fewer-gap-seconds 600
/1mblib translations reload
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
- Player-facing ScheduledTips chat uses the shared feature-prefix system with visible prefix name `Tips`, so scheduled tip broadcasts and `/tips` responses do not use the generic `1MB Library` library prefix. The symbol comes from `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.scheduledtips`.
- When the Boosters feature is installed, ScheduledTips can ask the shared Boosters service for live `/rate` booster state and replace matching booster tips with a clickable reminder.
- Future versions can inspect or import existing CMI scheduler-style tip command text if we decide that is useful.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.

Paper:

- Paper scheduler APIs run the repeating tip task.
- Adventure components, MiniMessage, click events, and hover events render the clickable tip output.
- Shared `PlayerDataStore` persists preferences off the main thread; provider and player checks run on the main thread.

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
tip-feature-requirements
```

`dismiss.after-seen-count` and `broadcast.show-dismiss-before-threshold` are retained legacy settings. They no longer delay player dismissal. Shared guidance supplies the regular chat controls; the old off-button option remains relevant to explicit admin previews. Scheduled and staff broadcasts are offered to the shared budget, and their reported audience is a queued count. Seen counts increase only when a hint is delivered.

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

## Feature availability and dormant Forage

Forage is installed on live but dormant. Preserve its live `enabled: false`; do not copy the enabled development config onto live. ScheduledTips automatically requires active Forage for IDs `forage`, `forage_*`, and `forage-*`, and text containing the standalone word or command `Forage`/`/forage`. It examines the raw MiniMessage text, including click and hover tags, namespaced commands, and shared routes such as `/next guide forage`. Existing IDs, text, counts, and dismissals need no migration. This deliberately conservative compatibility rule can also suppress ordinary text mentioning foraging as “forage”.

Use explicit requirements for other Feature Plugins or custom tip wording whose dependency is not visible in its ID or text:

```yaml
tip-feature-requirements:
  - "camp_intro|forage"
  - "trade_and_travel|autosell,journeymap"
```

Each entry is `tip-id|feature-id[,feature-id]`, using registered library feature IDs. Every required feature must have an enabled owner JAR, a valid enabled configuration, active gameplay behavior, and the receiving player's feature-use permission. Debug mode neither hides active gameplay nor bypasses these checks. Requirements supplement the automatic Forage rule; repeated declarations combine. Other features are not inferred automatically from arbitrary prose, and third-party plugins outside the library's feature registry are not supported as requirement IDs.

Availability is checked when choosing a rotation entry, listing player tips, queuing a hint, and immediately before delivery. Manual broadcasts and booster substitutions follow the same checks. A queued tip that becomes unavailable is discarded without a seen-count increment. Unrelated available tips continue normally. Player hiding, postponement, visibility, and delivery history survive feature dormancy and reactivation.

An unknown feature ID keeps its dependent tip paused. Malformed declarations, a non-list setting, or non-text entries pause all ScheduledTips promotion until corrected and reloaded. `/tips admin list`, `/tips admin status`, and `/tips admin preview <id>` explain availability; staff previews still show the configured wording for inspection. After editing the list, use `/tips admin reload` and inspect these diagnostics.

Tracking and validation: [#43](https://github.com/mrfdev/1MB-Library/issues/43) and the [dormant-feature checks](../../checklist.md#dormant-feature-communication-43).

## Data

Dedicated long-lived profiles live at `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/scheduledtips/<uuid>.yml`. On first load, the existing root UUID section is copied without changing it. New saves use a bounded storage worker and atomic writes/backups. A failed load or save pauses tips for that player instead of silently resetting preferences. Read the [shared guidance upgrade notes](../player-guidance.md#persistence-and-upgrades) before a downgrade or manual cleanup.


```yaml
uuid: "player-uuid"
name: "PlayerName"
scheduledtips:
  schema: 1
  opted-out: false
  legacy-recording-restored: false
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
- Standard guidance buttons call only `/guidance` settings, hide, and postpone actions. Legacy local controls call `/tips dismiss <id>`, `/tips off`, and `/tips on`.
- Dynamic booster reminder click actions only run `/rate`.
- Player-specific data uses the dedicated `scheduledtips` UUID directory. Legacy cleanup does not remove it.
- Configured tip text is treated as trusted admin-authored MiniMessage content.

## Shared Library Usage

ScheduledTips uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, PlaceholderAPI routing, tab filtering, paginated list output, shared `PlayerDataStore` UUID load/save, shared optional-guidance delivery, debug metadata, and optional service discovery for Boosters live-state reminders.

[Plugin index](README.md)
