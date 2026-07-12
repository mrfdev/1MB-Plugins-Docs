# WarpAudit

## Purpose

WarpAudit is a read-only server-management plugin for checking CMI warp and portal hygiene. It inspects the CMI runtime warp and portal managers and reports useful support details such as warp count, portal count, world validity, coordinates, portal bounds, groups, hidden state, permission-required state, creator metadata, duplicate names, duplicate block locations, unloaded chunks, portal actions, and unsafe landing checks.

Version 1 does not change, delete, rename, teleport to, or repair CMI warps. It is meant to help staff review warp configuration safely before making manual CMI changes.

## Features

- Read current CMI warps from `CMI.getInstance().getWarpManager().getWarps()`.
- Read current CMI portals from `CMI.getInstance().getPortalManager().getPortals()`.
- Show a compact status summary with last audit result and issue count.
- Run a fresh on-demand audit scan.
- List CMI warps with world, coordinates, group, hidden state, permission state, page, slot, creator, and secondary location count.
- List CMI portals with bounds, loaded chunk coverage, enabled state, permission state, action summary, activation range, and destination safety state.
- Group warps by CMI warp group.
- Detect missing or unloaded worlds.
- Detect exact duplicate block locations so staff can spot aliases or accidental clone warps.
- Detect duplicate portal names and duplicate portal bounds.
- Detect unloaded chunks without forcing chunk loads, so audits stay gentle on live servers.
- Check loaded-chunk landing safety for missing floors, blocked feet, blocked headroom, dangerous blocks, and world-height issues.
- Check local portal teleport destinations for missing worlds, unloaded chunks, world-height issues, and unsafe loaded landings.
- Detect portals that are disabled or have no local teleport, bungee target, or command action.
- Detect unsafe-looking warp names and duplicate normalized names.
- Optionally warn for hidden warps, ungrouped warps, or warps without per-warp permission requirements.
- Dump a support report to the shared cache folder.
- Mark audit data stale when CMI warp create/remove events happen.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/warpaudit status
/warpaudit scan
/warpaudit issues [page]
/warpaudit safety [page]
/warpaudit list [page]
/warpaudit portals [page]
/warpaudit portalissues [page]
/warpaudit groups
/warpaudit dump
/warpaudit reload
```

Alias:

```text
/waudit
```

Useful examples:

```text
/warpaudit scan
/warpaudit issues
/warpaudit safety
/warpaudit list 2
/warpaudit portals
/warpaudit portalissues
/warpaudit groups
/warpaudit dump
```

Global library examples:

```text
/1mbcmi debug plugin warpaudit
/1mbcmi debug plugin warpaudit all
/1mbcmi debug clean cache plugin warpaudit
/1mbcmi config warpaudit
/1mbcmi config set warpaudit scan.warn-no-permission-required true
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.warpaudit.use
onembcmi.warpaudit.scan
onembcmi.warpaudit.view
onembcmi.warpaudit.dump
onembcmi.warpaudit.admin
onembcmi.warpaudit.admin.reload
```

## Placeholders

```text
%onembcmi_warpaudit.enabled%
%onembcmi_warpaudit.last.result%
%onembcmi_warpaudit.warps.count%
%onembcmi_warpaudit.portals.count%
%onembcmi_warpaudit.issues.count%
%onembcmi_warpaudit.portal_issues.count%
%onembcmi_warpaudit.missing_worlds.count%
%onembcmi_warpaudit.unloaded_chunks.count%
%onembcmi_warpaudit.unsafe_landings.count%
%onembcmi_warpaudit.duplicate_locations.count%
%onembcmi_warpaudit.hidden.count%
%onembcmi_warpaudit.permission_required.count%
%onembcmi_warpaudit.portal_disabled.count%
%onembcmi_warpaudit.portal_empty_actions.count%
%onembcmi_warpaudit.portal_unsafe_destinations.count%
%onembcmi_warpaudit.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIWarpCreateEvent` and `CMIWarpRemoveEvent` mark the cached audit data stale so the next status/view command refreshes.
- `CMIPortalCreateEvent` marks the cached audit data stale after CMI portal creation.

CMI:

- `CMI#getWarpManager()` provides the runtime `WarpManager`.
- `WarpManager#getWarps()` provides the current CMI warp map.
- `CmiWarp` provides warp name, location, group, hidden state, permission-required state, page, slot, creator, and secondary locations.
- `CMI#getPortalManager()` provides the runtime `PortalManager`.
- `PortalManager#getPortals()` provides the current CMI portal map.
- `CMIPortal` provides portal name, bounds, world, enabled state, permission-required state, activation range, commands, bungee target, and teleport location.
- CMI remains the source of truth. WarpAudit only reads CMI runtime state.

CMILib:

- `CMILocation` is used through CMI warp locations to read world name and coordinates.

Paper:

- Paper command, event, world, filesystem, and Adventure MiniMessage APIs are used.
- World min/max height and landing checks use loaded Paper worlds where available.
- WarpAudit checks whether a chunk is loaded before reading blocks, and it does not intentionally load chunks during an audit.

## Config

Important config paths:

```text
enabled
debug
scan.warn-missing-world
scan.warn-duplicate-location
scan.warn-unloaded-chunk
scan.warn-unsafe-landing
scan.warn-unsafe-name
scan.warn-duplicate-normalized
scan.warn-y-outside-world
scan.warn-no-permission-required
scan.warn-hidden
scan.warn-empty-group
scan.portals.enabled
scan.warn-portal-disabled
scan.warn-portal-missing-world
scan.warn-portal-unloaded-chunk
scan.warn-portal-unsafe-name
scan.warn-portal-duplicate-normalized
scan.warn-portal-duplicate-area
scan.warn-portal-empty-action
scan.warn-portal-unsafe-destination
output.page-size
dump.file
```

## Data

WarpAudit writes support dumps to the shared cache area:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/warpaudit/warpaudit-report.txt
```

It does not write playerdata or persistent CMI warp state.

## Safety

Version 1 is read-only. It does not execute CMI commands, modify `Warps.yml`, modify portals, teleport players, remove warps, remove portals, rename warps, or change warp/portal permissions. Optional policy warnings are disabled by default when they could be noisy on established servers.

## Shared Library Usage

WarpAudit uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, shared cache paths, and debug metadata.

[Plugin index](README.md)
