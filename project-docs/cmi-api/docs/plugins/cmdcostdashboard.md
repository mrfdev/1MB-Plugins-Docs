# CmdCostDashboard

## Purpose

CmdCostDashboard is a read-only server-management plugin for reviewing CMI command costs, observed command usage, and money removed by command fees. It helps staff spot commands that may be too cheap, too expensive, or confusing players because configured costs do not appear to line up with observed fee events.

Version 1 does not edit CMI command costs, execute player commands, change balances, or bypass confirmations. It observes player command preprocess events, correlates nearby negative CMI balance changes, reads CMI command cost settings, and writes support reports to cache.

## Features

- Read CMI command cost manager availability and configured cost count.
- Read configured CMI command cost entries from the runtime manager for dashboard display.
- Observe player command usage through Paper command preprocess events.
- Correlate negative `CMIUserBalanceChangeEvent` deltas near recent player commands.
- Track observed uses, correlated fee count, and money removed by command.
- Flag low-cost/high-use commands as potentially too cheap.
- Flag high configured costs as potentially too expensive.
- Flag configured-cost commands with repeated uses but no correlated fees as possible confusion or bypass cases.
- Simulate CMI command cost usability for an online player without executing the command.
- Write timestamped support reports to the shared cache folder.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/cmdcosts
/cmdcosts status
/cmdcosts top [page]
/cmdcosts inspect <command>
/cmdcosts simulate <player> <command>
/cmdcosts report
/cmdcosts reload
```

Aliases:

```text
/commandcosts
/ccosts
```

Useful examples:

```text
/cmdcosts status
/cmdcosts top
/cmdcosts inspect home
/cmdcosts inspect cmi home
/cmdcosts simulate Steve cmi home
/cmdcosts report
```

Global library examples:

```text
/1mbcmi debug plugin cmdcostdashboard
/1mbcmi debug plugin cmdcostdashboard all
/1mbcmi debug clean cache plugin cmdcostdashboard --dry-run
/1mbcmi config cmdcostdashboard
/1mbcmi config set cmdcostdashboard analysis.too-cheap-threshold 2
/1mbcmi config set cmdcostdashboard analysis.too-expensive-threshold 5000
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.cmdcostdashboard.use
onembcmi.cmdcostdashboard.view
onembcmi.cmdcostdashboard.simulate
onembcmi.cmdcostdashboard.report
onembcmi.cmdcostdashboard.admin
onembcmi.cmdcostdashboard.admin.reload
```

## Placeholders

```text
%onembcmi_cmdcostdashboard.enabled%
%onembcmi_cmdcostdashboard.configured.count%
%onembcmi_cmdcostdashboard.observed.count%
%onembcmi_cmdcostdashboard.commands.count%
%onembcmi_cmdcostdashboard.fees.count%
%onembcmi_cmdcostdashboard.fees.total%
%onembcmi_cmdcostdashboard.last.result%
%onembcmi_cmdcostdashboard.last.issues.count%
%onembcmi_cmdcostdashboard.last.too_cheap.count%
%onembcmi_cmdcostdashboard.last.too_expensive.count%
%onembcmi_cmdcostdashboard.last.confusion.count%
%onembcmi_cmdcostdashboard.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIUserBalanceChangeEvent` is used to observe negative balance changes and correlate them to recent command use.

CMI:

- `CMI#getCommandCostManager()` provides the runtime command cost manager.
- `CMICommandCostManager#getCommandCostCount()` reports configured command cost count.
- `CMICommandCostManager#getCost(String)` resolves a specific command cost.
- `CMICommandCostManager#canUseCmd(CommandSender, String)` powers `/cmdcosts simulate` for online players.
- `CMICommandCost` exposes configured cost, command key, subcommand, confirmation, and inform-on-charge state.
- CMI remains the source of truth. CmdCostDashboard only reads and reports.

CMILib:

- CMILib is required through the shared CMI stack, but version 1 does not need direct CMILib data structures.

Paper:

- `PlayerCommandPreprocessEvent` is used to observe player command use.
- Paper command, event, filesystem, and Adventure MiniMessage APIs are used.

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
correlation.window-ms
analysis.too-cheap-threshold
analysis.too-expensive-threshold
analysis.high-usage-threshold
analysis.confusion-no-fee-uses
report.file-prefix
```

## Data

CmdCostDashboard writes support reports to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/cmdcostdashboard/
```

It does not write playerdata or persistent economy history in version 1. Runtime counters reset on restart; reports can be kept as cache artifacts.

## Safety

CmdCostDashboard is read-only. It does not edit CMI command cost config, execute command strings, alter balances, or change command confirmations. Command input is validated and normalized before CMI lookup or simulation. `/cmdcosts simulate` requires an online player and calls CMI's cost check only.

## Shared Library Usage

CmdCostDashboard uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
