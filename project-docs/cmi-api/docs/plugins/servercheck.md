# ServerCheck

ServerCheck combines PluginVersions, UpdateSmoke, and StartupDoctor in the `1MB-Lib-ServerCheck` JAR. All three use the same collector to capture Java, Paper, CMI, CMILib, and loaded plugin metadata for their checks.

## How Staff Use It

| Command | Purpose |
| --- | --- |
| `/servercheck` or `/servercheck status` | Shows the runtime, module states, and latest smoke result. |
| `/servercheck versions list [page]` | Lists installed plugin versions. |
| `/servercheck versions depend <plugin> [page]` | Reviews declared dependencies and dependents. |
| `/servercheck versions gate [page]` | Checks the minimum Java version, Paper target, and configured plugin versions. |
| `/servercheck versions export <markdown\|discord>` | Exports the version inventory. |
| `/servercheck smoke run [page]` | Runs the post-update checks against the configured Paper and Java combinations and dispatches read-only command tests when enabled. |
| `/servercheck smoke checks [page]` | Reviews the latest checks or captures passive checks if no run is available. |
| `/servercheck smoke report [page]` | Shows the results and writes a local report when configured. |
| `/servercheck doctor <summary\|folders\|paper>` | Reviews runtime, folder, and Paper safety findings. |
| `/servercheck doctor paper refresh` | Refreshes the Paper safety scan asynchronously. |
| `/servercheck admin reload [versions\|smoke\|doctor]` | Reloads ServerCheck and its modules, or the selected module. |
| `/servercheck admin module <versions\|smoke\|doctor> <true\|false>` | Enables or pauses one module. |
| `/servercheck debug [versions\|smoke\|doctor]` | Inspects host or module diagnostics. |
| `/servercheck info` | Explains ServerCheck. |
| `/servercheck help [versions\|smoke\|doctor]` | Shows the available commands. |

Use `/servercheck smoke run` to dispatch the configured command tests. `/servercheck status` displays the current runtime and reads the cached smoke result. `smoke checks` and `smoke report` reuse the latest smoke snapshot or collect passive diagnostics if none exists. StartupDoctor collects its own reports while active.

## Permissions and module state

The host summary requires `onembcmi.servercheck.use`. Host debug, reload, and module switches require `onembcmi.servercheck.admin`. Both permissions default to operators. Commands routed to modules use their existing grants, including when invoked through the compatible roots.

| Module | Compatible command roots | Lifecycle setting |
| --- | --- | --- |
| PluginVersions | `/pv` | `modules.pluginversions.enabled` |
| UpdateSmoke | `/updatesmoke`, `/usmoke` | `modules.updatesmoke.enabled` |
| StartupDoctor | `/startupdoctor`, `/sdoctor` | `modules.startupdoctor.enabled` |

ServerCheck imports a module's legacy `enabled` value when its lifecycle setting is first created and the old config exists. It then uses the switch in `plugins/1MB-CMIAPI/ServerCheck/config.yml`. On a fresh installation, PluginVersions starts active. UpdateSmoke and StartupDoctor start dormant.

## Data

Each module continues to use its existing settings under `plugins/1MB-CMIAPI/<ModuleName>/`. Their translations stay under `plugins/1MB-CMIAPI/CMIAPILIB/translations/`, and StartupDoctor and UpdateSmoke reports stay under `plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/` in their respective subdirectories. PluginVersions keeps the existing database, inventory history, manually curated URLs, and exports at their configured paths. The existing `%onembcmi_<module>.*%` namespaces and the dedicated `%pluginversions_*%` expansion retain their identifiers.

## Upgrade

Stop Paper and install the complete tested suite containing `1MB-Lib-ServerCheck`. Remove the retired `1MB-Lib-PluginVersions`, `1MB-Lib-UpdateSmoke`, and `1MB-Lib-StartupDoctor` JARs from the plugin load path. Keep the existing data directories, translations, and cache reports. After restarting Paper, use `/servercheck status` to verify the imported module states. To roll back, stop Paper and restore the previous complete suite. The older JARs read the same data paths and their own configs for enablement.

[PluginVersions reference](pluginversions.md) · [UpdateSmoke reference](updatesmoke.md) · [StartupDoctor reference](startupdoctor.md)
