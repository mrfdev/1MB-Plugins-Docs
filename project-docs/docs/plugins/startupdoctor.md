# StartupDoctor

## Purpose

StartupDoctor is a server-management plugin that creates a support-friendly startup and runtime diagnostics report for the 1MB CMI-API stack. It is meant to answer “what versions, hooks, feature jars, folders, and runtime assumptions are actually active?” before we chase a bug in the wrong place.

The first version is read-only except for writing a local report dump to cache. It does not change CMI, CMILib, Paper, playerdata, permissions, economy, or feature plugin state.

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
output.page-size
dump.file
folder-doctor.cache-warning-bytes
folder-doctor.stale-cache-days
```

`folder-doctor.cache-warning-bytes` controls when a feature cache folder is reported as large. `folder-doctor.stale-cache-days` controls when a non-empty feature cache folder is reported as stale because it has not been modified recently.

## Data

StartupDoctor writes support dumps to the shared cache area:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/startupdoctor/startupdoctor-report.txt
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/startupdoctor/startupdoctor-folders-<timestamp>.txt
```

It does not write playerdata or persistent server state.

## Shared Library Usage

StartupDoctor uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, shared cache paths, feature registry inspection, and debug metadata.

[Plugin index](README.md)
