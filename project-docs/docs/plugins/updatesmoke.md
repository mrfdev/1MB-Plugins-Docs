# UpdateSmoke

## Purpose

UpdateSmoke is a post-update smoke tester for the CMI and 1MB CMI-API stack. It is meant to be run after updating Paper, CMI, CMILib, PlaceholderAPI, or any 1MB feature jar.

It does not reload plugins, change configs, mutate player data, or repair anything automatically. It gives staff a compact checklist result so update testing starts with the obvious compatibility signals: accepted Paper/Java matrix, hooks, versions, registered features, command registration, read-only command dispatch paths, placeholder parsing, and selected CMI/CMILib API access.

## Commands

```text
/updatesmoke
/updatesmoke help
/updatesmoke status
/updatesmoke run [page]
/updatesmoke checks [page]
/updatesmoke report [page]
/updatesmoke reload
/usmoke status
```

Examples:

```text
/updatesmoke run
/updatesmoke checks 2
/updatesmoke report
/updatesmoke report 3
/updatesmoke reload
/1mbcmi debug plugin updatesmoke all
```

## Command Behavior

`/updatesmoke status` shows the latest run result, counts, and cache size.

`/updatesmoke run [page]` runs a fresh checklist and prints a paginated view of the check rows. When command smoke is enabled it dispatches configured read-only root/help/info/debug command paths and records any thrown exceptions as failures.

`/updatesmoke checks [page]` lists the most recent check rows without creating a new report file.

`/updatesmoke report [page]` prints the latest report and writes a timestamped cache report when `report.write-file` is enabled.

`/updatesmoke reload` reloads the plugin config and translations.

## Permissions

```text
onembcmi.updatesmoke.use
onembcmi.updatesmoke.run
onembcmi.updatesmoke.report
onembcmi.updatesmoke.admin
onembcmi.updatesmoke.admin.reload
```

## Placeholders

```text
%onembcmi_updatesmoke.enabled%
%onembcmi_updatesmoke.last.result%
%onembcmi_updatesmoke.last.reason%
%onembcmi_updatesmoke.last.checks%
%onembcmi_updatesmoke.last.passed%
%onembcmi_updatesmoke.last.warnings%
%onembcmi_updatesmoke.last.failures%
%onembcmi_updatesmoke.commands.ok%
%onembcmi_updatesmoke.commands.total%
%onembcmi_updatesmoke.command_smoke.ok%
%onembcmi_updatesmoke.command_smoke.total%
%onembcmi_updatesmoke.placeholders.ok%
%onembcmi_updatesmoke.placeholders.total%
%onembcmi_updatesmoke.features.count%
%onembcmi_updatesmoke.cache.size%
```

## Config

Default config path:

```text
plugins/1MB-CMIAPI/UpdateSmoke/config.yml
```

Important defaults:

```text
enabled: true
debug: false
output.page-size: 10
checks.expected-java: "25"
checks.expected-paper: "26.2"
checks.compatibility-matrix:
  - "26.2@25"
  - "26.2@26"
checks.require-placeholderapi: true
checks.require-current-build: true
checks.min-feature-count: 1
commands.required:
  - cmi
  - 1mbcmi
  - updatesmoke
  - startupdoctor
  - cmiprobe
  - placeholderprobe
  - cmiplaceholders
  - passport
  - visit
  - tips
  - n
commands.smoke.enabled: true
commands.smoke.discover-1mb-commands: true
commands.smoke.include-required: false
commands.smoke.include-feature-debug: true
commands.smoke.arguments:
  - ""
  - help
  - info
  - debug all
commands.smoke.excluded-roots: []
commands.smoke.max-dispatches: 400
commands.smoke.return-false-is-warning: false
placeholders.required:
  - "%onembcmi_global.status.loaded%"
  - "%onembcmi_global.cmi.version%"
  - "%onembcmi_global.cmilib.version%"
  - "%onembcmi_global.runtime.count%"
  - "%onembcmi_global.features.server-management.count%"
placeholders.unresolved-is-failure: true
api.cmi-methods.required:
  - getPlayerManager
  - getCommandManager
  - getConfigManager
  - getWarpManager
  - getHomeManager
  - getEconomyManager
report.write-file: true
report.file-prefix: updatesmoke-report
```

Server owners can add future Mojang/Paper targets to `checks.compatibility-matrix` in `paper@java` form, for example `26.3@26`. The legacy `checks.expected-paper` and `checks.expected-java` values are only used when the matrix is empty.

Server owners can add or remove command and placeholder samples to match the exact installed feature jars. If a feature is temporarily not installed, remove its command from `commands.required` before treating a failed smoke run as a real update blocker.

The command smoke layer discovers loaded `1MB-CMIAPI-*` command roots from Bukkit's command map, then dispatches each root with the configured read-only argument shapes. By default it also runs `/1mbcmi debug plugin <feature> all` for every registered feature. Dispatches are considered passing when they complete without throwing; Bukkit returning `false` can optionally be treated as a warning with `commands.smoke.return-false-is-warning`.

## Checks

UpdateSmoke currently checks:

- Paper API version prefix and Java runtime against the configured compatibility matrix.
- CMI, CMILib, PlaceholderAPI, and `1MB-CMIAPI-Lib` plugin state.
- CMI-API and CMILib class availability through the shared diagnostics helper.
- `CMI.getInstance()` and configured CMI manager methods by reflection.
- `CMILib.getInstance()`.
- 1MB feature registry count and each registered feature plugin's enabled state.
- Current 1MB feature build numbers when `checks.require-current-build` is true.
- Configured command registration through Paper/Bukkit command metadata.
- Read-only command smoke dispatches for discovered 1MB roots and per-feature debug dumps.
- Configured PlaceholderAPI samples, including unresolved placeholder detection.

## Data

Timestamped reports are written under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/updatesmoke/
```

The report is a plain text summary intended for local staff review or support notes. It uses the shared log sanitizer before writing dynamic check details.

## CMI / CMILib Usage

CMI:

- Reads CMI plugin metadata through Paper.
- Verifies selected CMI manager methods by reflection.
- Uses the shared `CmiEnvironmentDiagnostics` helper to confirm CMI-API class availability.

CMILib:

- Reads CMILib plugin metadata through Paper.
- Checks `CMILib.getInstance()`.
- Uses shared diagnostics to confirm CMILib classes are available.

PlaceholderAPI:

- Parses configured smoke placeholders and detects unresolved samples.
- The default samples focus on `onembcmi_global` placeholders because they do not require a player context.

Paper:

- Uses plugin metadata, command lookup, Java/Paper version data, command handling, and filesystem APIs.

## Safety

- Read-only checks only.
- Only configured read-only command smoke paths are dispatched.
- No plugin reloads are attempted.
- No player data is changed.
- Command names are validated before lookup.
- Command smoke argument shapes are validated before dispatch.
- Placeholder samples come from config and are parsed only when PlaceholderAPI is enabled.

[Plugin index](README.md)
