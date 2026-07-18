# StartupDoctor

## Purpose

StartupDoctor is a server-management plugin that creates a support-friendly startup and runtime diagnostics report for the 1MB CMI-API stack. It is meant to answer “what versions, hooks, feature jars, folders, Paper safety controls, and runtime assumptions are actually active?” before we chase a bug in the wrong place.

StartupDoctor is read-only except for writing local report dumps to cache. It does not change CMI, CMILib, Paper, playerdata, permissions, economy, or feature plugin state.

## Features

- Capture a startup report shortly after the plugin stack finishes enabling.
- Run on-demand diagnostics from command output.
- Show a compact summary for support triage.
- Show Paper, Java, CMI, CMILib, PlaceholderAPI, LuckPerms, and Vault state.
- Verify CMI-API classes are visible to the feature jar.
- List registered 1MB CMIAPI features, categories, versions, and enabled state.
- List feature dependencies, optional hooks, shared data folders, cache folders, cache sizes, and expected jar names.
- Run a read-only folder doctor for missing feature folders, orphaned 1MB cache/data folders, stale or large caches, older active project jars, disabled project jars, and sensitive-looking file names.
- Show suggested manual fixes for folder findings without deleting, moving, or editing files.
- Scan active `paper-global.yml`, `paper-world-defaults.yml`, and relevant explicit settings in loaded worlds' `paper-world.yml` files.
- Classify Paper settings as `PASS`, `NOTE`, `WARN`, or `FAIL`, with a separate overall `safe`, `review`, or `unsafe` result.
- Keep YAML reads and Paper safety report exports off the main server thread.
- Detect explicit exploit opt-ins, disabled identity or NBT protections, oversized-component sanitizer exclusions, duplicate UUID policy, overstacked loot handling, hopper event compatibility, and renewable-loot economy risks.
- Paginate current warnings for easier console and in-game review.
- Warn when optional hooks are required by config but missing.
- Write the latest diagnostics report or folder-doctor report to the StartupDoctor cache folder for support/debug use.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/startupdoctor status
/startupdoctor summary
/startupdoctor report
/startupdoctor warnings [page]
/startupdoctor hooks
/startupdoctor features
/startupdoctor storage
/startupdoctor paper [page]
/startupdoctor paper refresh
/startupdoctor paper export
/startupdoctor folders [page]
/startupdoctor folders export
/startupdoctor dump
/startupdoctor reload
```

Alias:

```text
/sdoctor
```

Global library examples:

```text
/1mbcmi debug plugin startupdoctor
/1mbcmi debug plugin startupdoctor all
/1mbcmi config startupdoctor
/1mbcmi config set startupdoctor checks.require-placeholderapi true
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.startupdoctor.use
onembcmi.startupdoctor.report
onembcmi.startupdoctor.dump
onembcmi.startupdoctor.admin
onembcmi.startupdoctor.admin.reload
```

## Placeholders

```text
%onembcmi_startupdoctor.enabled%
%onembcmi_startupdoctor.last.result%
%onembcmi_startupdoctor.last.reason%
%onembcmi_startupdoctor.warnings.count%
%onembcmi_startupdoctor.features.count%
%onembcmi_startupdoctor.cmi.version%
%onembcmi_startupdoctor.cmilib.version%
%onembcmi_startupdoctor.java.version%
%onembcmi_startupdoctor.paper.version%
%onembcmi_startupdoctor.paper.safety.result%
%onembcmi_startupdoctor.paper.safety.findings.count%
%onembcmi_startupdoctor.paper.safety.failures.count%
%onembcmi_startupdoctor.paper.safety.warnings.count%
%onembcmi_startupdoctor.paper.safety.notes.count%
%onembcmi_startupdoctor.paper.safety.passes.count%
%onembcmi_startupdoctor.cmiapi.usable%
%onembcmi_startupdoctor.cmilib.usable%
%onembcmi_startupdoctor.placeholderapi.loaded%
%onembcmi_startupdoctor.luckperms.loaded%
%onembcmi_startupdoctor.vault.loaded%
%onembcmi_startupdoctor.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- StartupDoctor checks that representative CMI-API classes are available to the runtime classloader.
- The shared `CmiEnvironmentDiagnostics` helper reports CMI and CMI-API availability in the same format used by global debug output.

CMILib:

- CMILib is checked as a required runtime dependency because the 1MB CMI-API stack expects CMI and CMILib to be present together.
- The report includes the installed CMILib plugin version so outdated dependency issues can be spotted quickly.

CMI:

- CMI remains the source of truth for CMI-side behavior. StartupDoctor only inspects plugin availability and version metadata.
- The report includes installed CMI version data for issue reports and compatibility checks.

Paper:

- Paper command, scheduler, plugin metadata, filesystem, and Adventure MiniMessage APIs are used.
- StartupDoctor checks the configured expected Java and Paper baselines for this repo.
- Paper YAML is parsed structurally with Paper/Bukkit's configuration API. The scanner does not search or replace raw text.
- Paper config reads and safety report writes are scheduled asynchronously. Bukkit world paths are captured before asynchronous work begins.

## Paper Safety

`/startupdoctor paper` displays the latest cached scan. StartupDoctor scans once during enable, again after its configured startup delay, and after a feature reload. Use `/startupdoctor paper refresh` to request a fresh asynchronous scan, or `/startupdoctor paper export` to refresh and write a dedicated report.

Severity meanings:

- `PASS`: the setting matches the Paper 26.2 public-server safety baseline.
- `NOTE`: the value is not an active exploit by itself, but it represents an intentional gameplay or compatibility choice.
- `WARN`: the value can weaken compatibility, identity handling, packet/item safety, or economy controls and needs review.
- `FAIL`: an explicit exploit is enabled, a required guard is disabled, or the YAML cannot be evaluated safely.

Overall results:

- `safe`: no `FAIL` or `WARN` findings.
- `review`: at least one `WARN`, but no `FAIL`.
- `unsafe`: at least one `FAIL`.
- `pending` or `disabled`: no current scan is available.

The global scan checks:

```text
unsupported-settings.allow-headless-pistons
unsupported-settings.allow-permanent-block-break-exploits
unsupported-settings.allow-piston-duplication
unsupported-settings.allow-unsafe-end-portal-teleportation
unsupported-settings.oversized-item-component-sanitizer.dont-sanitize
unsupported-settings.perform-username-validation
unsupported-settings.skip-tripwire-hook-placement-validation
unsupported-settings.skip-vanilla-damage-tick-when-shield-blocked
unsupported-settings.update-equipment-on-player-actions
```

The world-default and explicit per-world scan checks:

```text
entities.spawning.duplicate-uuid.mode
entities.spawning.filter-bad-tile-entity-nbt-from-falling-blocks
entities.spawning.filtered-entity-tag-nbt-paths
fixes.split-overstacked-loot
hopper.disable-move-event
lootables.auto-replenish
lootables.restrict-player-reloot
lootables.max-refills
lootables.retain-unlooted-shulker-box-loot-table-on-non-player-break
```

The extra lootable settings are reported only when auto-replenishment is effectively enabled. Explicit per-world values are reported separately; absent keys inherit the already-inspected world defaults.

StartupDoctor never applies a proposed value. Staff must review the finding against the current [Paper global configuration](https://docs.papermc.io/paper/reference/global-configuration/) or [Paper world configuration](https://docs.papermc.io/paper/reference/world-configuration/), edit the active file deliberately, and restart Paper when required.

## Config

Important config paths:

```text
enabled
debug
startup.capture-delay-ticks
checks.require-placeholderapi
checks.require-luckperms
checks.require-vault
checks.expected-java
checks.expected-paper
paper-safety.enabled
paper-safety.scan-world-overrides
output.page-size
dump.file
folder-doctor.cache-warning-bytes
folder-doctor.stale-cache-days
```

`paper-safety.enabled` controls the read-only scanner. `paper-safety.scan-world-overrides` controls whether loaded worlds' explicit `paper-world.yml` values are inspected in addition to the global and world-default files.

`folder-doctor.cache-warning-bytes` controls when a feature cache folder is reported as large. `folder-doctor.stale-cache-days` controls when a non-empty feature cache folder is reported as stale because it has not been modified recently.

## Data

StartupDoctor writes support dumps to the shared cache area:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/startupdoctor/startupdoctor-report.txt
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/startupdoctor/startupdoctor-folders-<timestamp>.txt
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/startupdoctor/startupdoctor-paper-safety-<timestamp>.txt
```

It does not write playerdata or persistent server state.

## Shared Library Usage

StartupDoctor uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, shared cache paths, feature registry inspection, and debug metadata.

[Plugin index](README.md)
