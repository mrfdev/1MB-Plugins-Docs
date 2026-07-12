# WarningLens

## Purpose

WarningLens is a read-only staff/moderation plugin for inspecting CMI warning and punishment context. It is meant to answer “what is going on with this player?” without giving staff another place to punish, teleport, jail, mute, or edit data.

The first version focuses on text output and runtime event observation so it is safe to test alongside StaffCenter.

## Features

- Inspect a CMI player's warning count and warning points.
- Split inspection into summary, punishment, warning, or full views.
- Show current CMI ban, jail, mute, shadow mute, cuff, and alert state.
- List the player's CMI warnings with category, points, actor, time, and reason when permitted.
- Observe recent CMI warn, jail, ban, kick, and unban events during this server runtime.
- Filter recent moderation events by type.
- Show total and recent moderation event counts by type.
- Search recent events with strict input and reason-aware privacy rules.
- Dump recent events to the WarningLens cache folder for support review.
- Hide reasons unless the sender has `onembcmi.warninglens.view.reasons`.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/warninglens status
/warninglens hooks
/warninglens inspect <player> [summary|punishments|warnings|all]
/warninglens <player>
/warninglens recent [type|all] [page]
/warninglens stats [type|all]
/warninglens find <text> [page]
/warninglens dump [type|all]
/warninglens reload
```

Alias:

```text
/wlens
```

Global library examples:

```text
/1mbcmi debug plugin warninglens
/1mbcmi debug plugin warninglens all
/1mbcmi config warninglens
/1mbcmi config set warninglens inspect.warning-limit 15
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.warninglens.use
onembcmi.warninglens.inspect
onembcmi.warninglens.recent
onembcmi.warninglens.view.reasons
onembcmi.warninglens.admin
onembcmi.warninglens.admin.reload
```

## Placeholders

```text
%onembcmi_warninglens.enabled%
%onembcmi_warninglens.recent.count%
%onembcmi_warninglens.total.count%
%onembcmi_warninglens.last.type%
%onembcmi_warninglens.last.player%
%onembcmi_warninglens.last.actor%
%onembcmi_warninglens.last.detail%
%onembcmi_warninglens.warning_count%
%onembcmi_warninglens.warning_points%
%onembcmi_warninglens.recent.warn.count%
%onembcmi_warninglens.total.warn.count%
%onembcmi_warninglens.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIUser` provides read-only moderation state.
- `CMIPlayerWarning` and `CMIWarningCategory` provide warning details.
- `CMIPlayerWarnEvent` records runtime warning activity.
- `CMIPlayerJailEvent` records runtime jail activity.
- `CMIPlayerBanEvent`, `CMIPlayerKickEvent`, and `CMIPlayerUnBanEvent` record runtime punishment activity.

CMILib:

- CMILib remains a required dependency through CMI and the shared stack.
- Future versions may use shared GUI helpers if WarningLens gets an inventory view.

CMI:

- CMI remains the source of truth. WarningLens only reads state and observes events.

Paper:

- Paper command, event, and Adventure MiniMessage APIs are used for modern server output.

## Config

Important config paths:

```text
enabled
recent.max
inspect.warning-limit
inspect.show-reasons
output.recent-per-page
dump.max-records
events.record.warn
events.record.jail
events.record.ban
events.record.kick
events.record.unban
```

## Safety

Version 1 is read-only. It does not execute punishment commands, alter CMI user data, remove warnings, change jail/mute/ban state, or expose reasons unless the sender has the explicit reason-view permission. Recent searches and dumps also respect that reason visibility boundary.

## Shared Library Usage

WarningLens uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, and debug metadata.

[Plugin index](README.md)
