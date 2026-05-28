# WorthDrift

## Purpose

WorthDrift is a read-only server-management plugin for watching CMI sell events and comparing the actual money paid against the configured CMI worth values. It is meant to help staff spot economy drift, suspicious high-value materials, recipe-loop hints, and cases where one player appears to be farming a single material path heavily.

Version 1 does not change CMI worth values, cancel sell events, edit economy balances, or execute CMI commands. It records lightweight session aggregates, keeps a bounded recent sample list, and writes support reports to cache on demand.

## Features

- Listen to `CMIPlayerItemsSellEvent` at monitor priority.
- Read per-material sold amounts and payments from CMI's sell event.
- Compare observed unit payment against CMI `WorthManager` / `WorthItem` configured sell price.
- Detect material-level drift when observed average differs from configured worth by configured percent and absolute thresholds.
- Flag high-value materials based on configured or observed unit value.
- Flag player concentration when one player accounts for a large share of a material's observed payment.
- Ask CMI `WorthItem` whether an exploit recipe is known for a material.
- Keep a bounded recent sample list for report context.
- Persist ignored material choices in the feature data folder.
- Write timestamped support reports to the shared cache folder.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/worthdrift
/worthdrift status
/worthdrift top [page]
/worthdrift material <material>
/worthdrift report
/worthdrift ignored
/worthdrift ignore <material>
/worthdrift reload
```

Alias:

```text
/wdrift
```

Useful examples:

```text
/worthdrift status
/worthdrift top
/worthdrift material DIAMOND
/worthdrift material minecraft:diamond
/worthdrift report
/worthdrift ignore CACTUS
/worthdrift ignored
```

Global library examples:

```text
/1mbcmi debug plugin worthdrift
/1mbcmi debug plugin worthdrift all
/1mbcmi debug clean cache plugin worthdrift --dry-run
/1mbcmi config worthdrift
/1mbcmi config set worthdrift analysis.drift.percent-threshold 15
/1mbcmi config set worthdrift analysis.high-unit-value 1000
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.worthdrift.use
onembcmi.worthdrift.view
onembcmi.worthdrift.report
onembcmi.worthdrift.ignore
onembcmi.worthdrift.admin
onembcmi.worthdrift.admin.reload
```

## Placeholders

```text
%onembcmi_worthdrift.enabled%
%onembcmi_worthdrift.events.count%
%onembcmi_worthdrift.items.count%
%onembcmi_worthdrift.payment.total%
%onembcmi_worthdrift.materials.count%
%onembcmi_worthdrift.ignored.count%
%onembcmi_worthdrift.last.result%
%onembcmi_worthdrift.last.issues.count%
%onembcmi_worthdrift.last.drift.count%
%onembcmi_worthdrift.last.high_value.count%
%onembcmi_worthdrift.last.concentration.count%
%onembcmi_worthdrift.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIPlayerItemsSellEvent` provides the player, sell type, total amount, total payment, material amount map, and material payment map.

CMI:

- `CMI#getWorthManager()` provides the runtime worth manager.
- `WorthManager#getWorth(ItemStack)` resolves the configured CMI `WorthItem` for a CMILib material item stack.
- `WorthItem#getSellPrice()` provides the configured sell value used for drift comparison.
- `WorthItem#getExploitRecipe()` is checked as a read-only recipe-loop signal.
- CMI remains the source of truth. WorthDrift only observes and reports.

CMILib:

- `CMIMaterial` is used to normalize CMI sell-event material keys and safely parse typed material names.
- CMILib/Paper material mapping is used through `CMIMaterial#newItemStack()` when resolving configured CMI worth.

Paper:

- Paper command, event, filesystem, YAML, and Adventure MiniMessage APIs are used.
- Command input is strictly validated before material parsing.

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
analysis.drift.percent-threshold
analysis.drift.absolute-threshold
analysis.high-unit-value
analysis.minimum-material-events
analysis.player-concentration-percent
analysis.report-days
report.file-prefix
ignored-materials
```

## Data

WorthDrift writes ignored material choices to:

```text
plugins/1MB-CMIAPI/WorthDrift/data.yml
```

WorthDrift writes support reports to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/worthdrift/
```

It does not write playerdata or persistent economy history in version 1. Session aggregates reset on restart, while reports can be kept as cache artifacts.

## Safety

WorthDrift is read-only. It does not cancel CMI sells, modify `Worth.yml`, change balances, run commands, or expose arbitrary player input. Material names are allowlisted and normalized before being passed to CMILib material parsing.

## Shared Library Usage

WorthDrift uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
