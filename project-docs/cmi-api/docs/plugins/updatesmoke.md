# UpdateSmoke

UpdateSmoke ships inside ServerCheck. Use `/servercheck smoke` for its commands. [ServerCheck](servercheck.md)

## Purpose

UpdateSmoke is a post-update smoke tester for the CMI and 1MB Library stack. It is meant to be run after updating Paper, CMI, CMILib, PlaceholderAPI, or any 1MB feature jar.

Its checklist covers the configured Paper and Java combinations, dependency versions and hooks, feature and command registration, placeholder parsing, and selected CMI and CMILib API calls. An explicit run can also exercise configured read-only command paths.

## Commands

```text
/servercheck smoke
/servercheck smoke help
/servercheck smoke info
/servercheck smoke status
/servercheck smoke run [page]
/servercheck smoke checks [page]
/servercheck smoke report [page]
/servercheck smoke reload
```

The compatible `/updatesmoke` and `/usmoke` roots accept the same subcommands. For example, `/usmoke status` shows the same result as `/servercheck smoke status`.

```text
/servercheck smoke run
/servercheck smoke checks 2
/servercheck smoke report
/servercheck smoke report 3
/servercheck debug smoke all
```

## Command Behavior

`/servercheck smoke status` shows the latest cached result, counts, and cache size. Before any result exists, it reports that smoke has not run.

`/servercheck smoke run [page]` captures a fresh checklist and prints a paginated view of the check rows. This is the only action that dispatches configured read-only command paths when `commands.smoke.enabled` is true. Exceptions thrown by a command are recorded as failures.

`/servercheck smoke checks [page]` lists the most recent check rows. If there is no cached result, it captures a passive checklist without dispatching commands. This action produces chat or console output only.

`/servercheck smoke report [page]` prints the latest checklist, or captures the same passive checks if no result exists. It writes a timestamped cache report when `report.write-file` is enabled. The report records the capture reason and command-smoke count so staff can tell whether the results include command dispatches.

`/servercheck smoke reload` reloads the module config and translations.

## Permissions

```text
onembcmi.updatesmoke.use
onembcmi.updatesmoke.run
onembcmi.updatesmoke.report
onembcmi.updatesmoke.admin
onembcmi.updatesmoke.admin.reload
```

Status, runs, reports, and reload require `onembcmi.updatesmoke.use`. A run also requires `onembcmi.updatesmoke.run`, viewing and exporting reports require `onembcmi.updatesmoke.report`, and reload requires `onembcmi.updatesmoke.admin.reload`. Debug routes require `onembcmi.updatesmoke.admin`.

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

UpdateSmoke keeps its settings at `plugins/1MB-CMIAPI/UpdateSmoke/config.yml` and its translations at `plugins/1MB-CMIAPI/CMIAPILIB/translations/updatesmoke.yml`. ServerCheck imports the old `enabled` value on migration. Afterward, use `/servercheck admin module smoke <true|false>` to change the module state.

The settings below are the defaults for the module.

```text
debug: false
output.page-size: 10
checks.expected-java: "25"
checks.expected-paper: "26.3"
checks.compatibility-matrix:
  - "26.3@25"
  - "26.3@27"
checks.require-placeholderapi: true
checks.require-current-build: true
checks.min-feature-count: 1
commands.required:
  - cmi
  - 1mblib
  - 1mbcmi
  - servercheck
  - updatesmoke
  - startupdoctor
  - cmiprobe
  - _placeholders
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

An explicit run can discover loaded 1MB Library command roots from Bukkit's command map and dispatch the configured read-only argument shapes. ServerCheck and its legacy roots are excluded from that dispatch loop. Required third-party commands are checked for registration. A passing dispatch means the call completed without throwing. Verify gameplay separately where a command depends on a live player or changes state. Set `commands.smoke.return-false-is-warning` to treat a Bukkit `false` return as a warning.

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
- Read-only command dispatches for discovered 1MB roots and per-feature debug dumps during an explicit run with command smoke enabled.
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
