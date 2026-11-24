# WarningLens

WarningLens is the read-only moderation review module in [StaffCenter](staffcenter.md). It reports CMI warnings, punishment state, and events observed during the current server session.

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
/staffcenter warnings status
/staffcenter warnings hooks
/staffcenter warnings inspect <player> [summary|punishments|warnings|all]
/staffcenter warnings <player>
/staffcenter warnings recent [type|all] [page]
/staffcenter warnings stats [type|all]
/staffcenter warnings find <text> [page]
/staffcenter warnings dump [type|all]
/staffcenter warnings reload
```

The compatible `/warninglens` and `/wlens` roots accept the same arguments and permission checks.

Use the module's diagnostics to inspect or edit its own settings.

```text
/staffcenter warnings debug all
/staffcenter warnings debug config
/staffcenter warnings debug set config inspect.warning-limit 15
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

CMI:

- CMI remains the source of truth. WarningLens only reads state and observes events.

Paper:

- Paper command, event, and Adventure MiniMessage APIs are used for modern server output.

## Config

WarningLens keeps `plugins/1MB-CMIAPI/WarningLens/config.yml` and `plugins/1MB-CMIAPI/CMIAPILIB/translations/warninglens.yml`. StaffCenter imports the old `enabled` value when it creates the WarningLens switch. Use `/staffcenter admin module warnings <true|false>` for subsequent activation changes. Dumps stay under `plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/warninglens/`.

Important config paths:

```text
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

WarningLens reads CMI moderation state and records observations. Warning and punishment reasons require the reason-view permission, including in recent searches and dumps.

## Shared Library Usage

WarningLens uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, and debug metadata.

[StaffCenter](staffcenter.md) · [Plugin index](README.md)
