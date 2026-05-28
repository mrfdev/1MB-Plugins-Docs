# WarpPassport

WarpPassport is retired from the active build. Its source remains in the repository for reference, but new installs should use [PassportDiscovery](passportdiscovery.md) and its `warp` type through `/passport warp`.

## Purpose

WarpPassport is a player-fun plugin that turns CMI warp usage into a lightweight collection system. When a player uses a CMI warp, the plugin stamps that warp into their passport, tracks repeat visits, and shows progress against the warps the server has observed.

The first version is intentionally modest: it records stamps, keeps per-player data in shared `playerdata`, and exposes debug-friendly commands. It does not move players, grant economy rewards, or change CMI warp behavior.

## Features

- Listen to CMI warp use and stamp the player's passport.
- Track known warps from CMI warp create, remove, and use events.
- Keep long-lived player stamp data in `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml`.
- Show personal passport progress, recent stamps, repeat visit counts, and a small top list.
- Show missing active known warps so players can chase completion.
- Show runtime stamp stats for support/debug during test sessions.
- Let staff inspect or reset one online player's passport data.
- Let staff inspect one observed warp index entry and dump scanned passport summaries.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/warppassport status
/warppassport book [page]
/warppassport missing [page]
/warppassport stats
/warppassport top
/warppassport admin warps [page]
/warppassport admin warp <warp>
/warppassport admin inspect <online-player>
/warppassport admin reset <online-player> [warp]
/warppassport admin dump
/warppassport admin reload
```

Alias:

```text
/wpassport
```

Global library examples:

```text
/1mbcmi debug plugin warppassport
/1mbcmi debug plugin warppassport all
/1mbcmi config warppassport
/1mbcmi config set warppassport messages.repeat-stamp.enabled true
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.warppassport.use
onembcmi.warppassport.top
onembcmi.warppassport.admin
onembcmi.warppassport.admin.inspect
onembcmi.warppassport.admin.reset
onembcmi.warppassport.admin.reload
```

## Placeholders

```text
%onembcmi_warppassport.enabled%
%onembcmi_warppassport.stamps%
%onembcmi_warppassport.known_warps%
%onembcmi_warppassport.removed_warps%
%onembcmi_warppassport.progress_percent%
%onembcmi_warppassport.last_warp%
%onembcmi_warppassport.visits%
%onembcmi_warppassport.missing_count%
%onembcmi_warppassport.runtime.stamps%
%onembcmi_warppassport.runtime.new_stamps%
%onembcmi_warppassport.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIPlayerWarpEvent` records player warp visits.
- `CMIWarpCreateEvent` adds newly created CMI warps to the local observed warp index.
- `CMIWarpRemoveEvent` marks observed CMI warps as removed without deleting player history.
- `CmiWarp#getName()` provides the strict warp identifier used for stamps.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.
- Future versions may use CMILib GUI helpers if the passport becomes an inventory-style book.

CMI:

- CMI remains the authority for warps. WarpPassport only observes CMI events and stores companion progress data.

Paper:

- Paper command, event, YAML, and Adventure MiniMessage output APIs are used.
- Player input is normalized to strict lowercase warp ids before staff reset operations.

## Config

Important config paths:

```text
enabled
messages.new-stamp.enabled
messages.repeat-stamp.enabled
progress.include-removed-warps
book.entries-per-page
missing.entries-per-page
admin.warps-per-page
dump.max-records
top.limit
input.max-warp-length
```

## Data

Observed warp index:

```text
plugins/1MB-CMIAPI/WarpPassport/warps.yml
```

Shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
warppassport:
  stamps:
    spawn:
      name: "spawn"
      visits: 3
      first-seen: "2026-04-25T00:00:00Z"
      last-seen: "2026-04-25T00:05:00Z"
```

## Shared Library Usage

WarpPassport uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, and debug metadata.

[Plugin index](README.md)
