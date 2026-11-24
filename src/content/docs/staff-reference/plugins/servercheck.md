---
title: "ServerCheck Administration"
description: "Setup, permissions, recovery, and operation of ServerCheck."
---

ServerCheck packages PluginVersions, UpdateSmoke, StartupDoctor, Hoppers, SparkReviewer, and WorldSnapshot in the `1MB-Lib-ServerCheck` JAR. Use it to check dependencies, run post-update checks, investigate server performance, and compare world settings. Hoppers and SparkReviewer share one Spark profiling controller.

## How Staff Use It

| Command | Purpose |
| --- | --- |
| `/servercheck` or `/servercheck status` | Shows the runtime, module states, and latest smoke result. Staff with the corresponding grants also see the latest hopper result and shared Spark activity. |
| `/servercheck versions list [page]` | Lists installed plugin versions. |
| `/servercheck versions depend <plugin> [page]` | Reviews declared dependencies and dependents. |
| `/servercheck versions gate [page]` | Checks the minimum Java version, Paper target, and configured plugin versions. |
| `/servercheck versions export <markdown\|discord>` | Exports the version inventory. |
| `/servercheck smoke run [page]` | Runs the post-update checks against the configured Paper and Java combinations and dispatches read-only command tests when enabled. |
| `/servercheck smoke checks [page]` | Reviews the latest checks or captures passive checks if no run is available. |
| `/servercheck smoke report [page]` | Shows the results and writes a local report when configured. |
| `/servercheck doctor <summary\|folders\|paper>` | Reviews runtime, folder, and Paper safety findings. |
| `/servercheck doctor paper refresh` | Refreshes the Paper safety scan asynchronously. |
| `/servercheck hoppers <scan\|risk\|track\|history>` | Scans loaded hopper hotspots, tracks changes, and reviews saved evidence. |
| `/servercheck hoppers spark spikes <mspt> [seconds] [label]` | Requests a spike-focused Spark profile for a hopper incident. |
| `/servercheck spark <review\|findings\|logs\|configs>` | Reviews runtime snapshots and performance signals. |
| `/servercheck spark capture <label>` and `/servercheck spark compare <before> <after>` | Saves and compares named performance snapshots. |
| `/servercheck spark start [seconds] [label]` | Requests a timed Spark profile. |
| `/servercheck spark <health\|stop\|cancel>` | Requests a Spark health report or manages a ServerCheck-owned profile. |
| `/servercheck worlds [status]` | Shows the world baseline and latest comparison summary. |
| `/servercheck worlds capture` | Captures a read-only baseline of loaded worlds, gamerules, and selected CMI settings. |
| `/servercheck worlds list [page]` or `/servercheck worlds world <world> [page]` | Reviews current world settings. |
| `/servercheck worlds diff [world\|all] [page]` | Compares current settings with the baseline. |
| `/servercheck worlds dump` | Writes a support report to the existing WorldSnapshot cache directory. |
| `/servercheck admin reload [versions\|smoke\|doctor\|hoppers\|spark\|worlds]` | Reloads ServerCheck and its modules, or the selected module. |
| `/servercheck admin module <versions\|smoke\|doctor\|hoppers\|spark\|worlds> <true\|false>` | Enables or pauses one module. |
| `/servercheck debug [versions\|smoke\|doctor\|hoppers\|spark\|worlds]` | Inspects host or module diagnostics. |
| `/servercheck info` | Explains ServerCheck. |
| `/servercheck help [versions\|smoke\|doctor\|hoppers\|spark\|worlds]` | Shows the available commands. |

Use `/servercheck smoke run` to dispatch the configured command tests. `/servercheck status` displays the current runtime and reads the cached smoke result. `smoke checks` and `smoke report` reuse the latest smoke snapshot or collect passive diagnostics if none exists. StartupDoctor collects its own reports while active.

For world changes, run `/servercheck worlds capture` before the change and `/servercheck worlds diff` afterward. The baseline lives in memory. Saved support dumps remain available on disk. The host summary shows the module's activation state.

## Profiling and passive diagnostics

Both performance modules use the same Spark controller and enforce their existing Spark grants. ServerCheck permits one managed profile at a time. Stop and cancel require verified ownership of that sampler. Timed profile requests run asynchronously, and status distinguishes an accepted request, a running sampler, and an exported report. Spark supplies the profile output and report URL. When a managed session interrupts Spark’s automatic background profiler, ServerCheck restores background sampling with the existing Spark settings after the session finishes and Spark is available.

Managed profiling uses a version-checked adapter for Paper’s bundled Spark 1.10.191. ServerCheck reports when sampler ownership cannot be verified. If that happens, use native `/spark` for profiling where Spark is available. ServerCheck still provides status, health, and performance reviews.

`/servercheck status` shows module state and recent results. Use `/servercheck hoppers scan` or `/servercheck spark review` for a fresh performance scan. Existing armed Hoppers triggers and watch settings can still collect passive measurements. Profiling starts only through an explicit request.

`/servercheck spark spark <action>` also accepts the old nested Spark commands. Use this form for Spark-specific status. `/servercheck spark status` shows the SparkReviewer module summary.

## Permissions and module state

The host summary requires `onembcmi.servercheck.use`. Host debug, reload, and module switches require `onembcmi.servercheck.admin`. Both permissions default to operators. Commands routed to modules use their existing grants, including when invoked through the compatible roots. Use `onembcmi.hoppers.spark` for the Hoppers profiling route or `onembcmi.sparkreviewer.spark` for SparkReviewer profiling.

| Module | Compatible command roots | Lifecycle setting |
| --- | --- | --- |
| PluginVersions | `/pv` | `modules.pluginversions.enabled` |
| UpdateSmoke | `/updatesmoke`, `/usmoke` | `modules.updatesmoke.enabled` |
| StartupDoctor | `/startupdoctor`, `/sdoctor` | `modules.startupdoctor.enabled` |
| Hoppers | `/_hoppers` | `modules.hoppers.enabled` |
| SparkReviewer | `/sparkreviewer`, `/sreview`, `/spreview` | `modules.sparkreviewer.enabled` |
| WorldSnapshot | `/worldsnapshot`, `/wsnapshot`, `/wrules` | `modules.worldsnapshot.enabled` |

ServerCheck imports a module's legacy `enabled` value when its lifecycle setting is first created and the old config exists. It then uses the switch in `plugins/1MB-CMIAPI/ServerCheck/config.yml`. On a fresh installation, PluginVersions and Hoppers start active. UpdateSmoke, StartupDoctor, SparkReviewer, and WorldSnapshot start dormant. Each bare WorldSnapshot compatibility command captures a fresh baseline when the module is active. Both command routes use the existing `onembcmi.worldsnapshot.*` grants.

## Data

Each module continues to use its existing settings under `plugins/1MB-CMIAPI/<ModuleName>/`. Their translations stay under `plugins/1MB-CMIAPI/CMIAPILIB/translations/`, and StartupDoctor and UpdateSmoke reports stay under `plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/` in their respective subdirectories. PluginVersions keeps the existing database, inventory history, manually curated URLs, and exports at their configured paths. Hoppers keeps its reports, notes, attachments, and hotspot history in `CMIAPILIB/cache/plugins/hoppers/`. SparkReviewer keeps its named snapshots and reports in `CMIAPILIB/cache/plugins/sparkreviewer/`. WorldSnapshot keeps its dumps in `CMIAPILIB/cache/plugins/worldsnapshot/`. Existing module placeholders retain their identifiers, including the dedicated `%pluginversions_*%` expansion.

## Upgrade

Stop Paper and install the complete tested suite containing `1MB-Lib-ServerCheck`. Move the standalone WorldSnapshot JAR out of the plugin load path. If you are upgrading from before the earlier merges, also move out the standalone Hoppers, SparkReviewer, PluginVersions, UpdateSmoke, and StartupDoctor JARs. Keep all existing data directories, translations, and cache reports. After restarting Paper, use `/servercheck status` to verify the imported module states. To roll back, stop Paper and restore the previous complete suite. Review the legacy enable settings before restarting.

[PluginVersions reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/pluginversions.md) · [UpdateSmoke reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/updatesmoke.md) · [StartupDoctor reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/startupdoctor.md)

[Hoppers reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/hoppers.md) · [SparkReviewer reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/sparkreviewer.md) · [WorldSnapshot reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/worldsnapshot.md)

[WorldSnapshot upgrade](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/installation.md#upgrade-worldsnapshot-to-servercheck) · [Hoppers and SparkReviewer upgrade](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/installation.md#upgrade-hoppers-and-sparkreviewer-to-servercheck)
