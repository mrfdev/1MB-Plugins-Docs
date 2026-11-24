# PluginVersions

PluginVersions ships inside ServerCheck. It inventories loaded plugins, reports declared dependencies, and checks the Java, Paper, and plugin version baseline. It also keeps the inventory database, curated URLs, Markdown and Discord exports, and `%pluginversions_*%` PlaceholderAPI expansion from the standalone feature. [ServerCheck](servercheck.md)

Use it when staff need a quick loaded-plugin version list, a searchable plugin inventory, a declared dependency report before considering plugin removal, a tested Java/Paper/dependency version gate, or a support/export snapshot after Paper, CMI, CMILib, or feature-jar updates.

## Migration Notes

- Install ServerCheck during the stopped-server suite update and remove the retired PluginVersions JAR.
- Use `/servercheck versions`. The compatible `/pv` root accepts the same subcommands, for example `/pv depend CMILib`.
- Keep `plugins/1MB-CMIAPI/PluginVersions/config.yml`, its inventory database, and its exports in place. The default database is `plugins/1MB-CMIAPI/PluginVersions/plugins-database.yml` and the default export directory is `plugins/1MB-CMIAPI/PluginVersions/exports/`. Custom paths still come from the same config.
- If moving from the original pre-1MB-Library standalone project, copy the inventory to the configured database path before startup to bring forward its history.

## Commands

```text
/servercheck versions
/servercheck versions info
/servercheck versions help [page|topic]
/servercheck versions list [page]
/servercheck versions depend <plugin> [page]
/servercheck versions gate [page]
/servercheck versions reload
/servercheck versions debug [page|topic]
/servercheck versions debug commands [page]
/servercheck versions debug permissions [page]
/servercheck versions debug placeholders [page]
/servercheck versions debug config [page]
/servercheck versions debug gate [page]
/servercheck versions debug url add <plugin> <url>
/servercheck versions debug url add <plugin> <type> <url>
/servercheck versions debug url del <plugin> [type] <url>
/servercheck versions debug url list <plugin>
/servercheck versions debug url audit [page]
/servercheck versions config [page]
/servercheck versions set <path> <value>
/servercheck versions export [markdown|discord]
```

Help topics:

`/servercheck versions help commands` lists only commands allowed by the sender's permissions, with descriptions and no inline permission nodes. `/servercheck versions help permissions` directs authorized staff to `/servercheck versions debug permissions` for permission details.

```text
/servercheck versions help overview
/servercheck versions help commands
/servercheck versions help permissions
/servercheck versions help placeholders
/servercheck versions help config
/servercheck versions help gate
/servercheck versions help set
```

Debug topics:

```text
/servercheck versions debug status
/servercheck versions debug plugin
/servercheck versions debug server
/servercheck versions debug plugins
/servercheck versions debug gate
/servercheck versions debug commands
/servercheck versions debug permissions
/servercheck versions debug placeholders
/servercheck versions debug config
/servercheck versions debug set
/servercheck versions debug url
/servercheck versions debug all
```

## Example Commands

```text
/servercheck versions info
/servercheck versions list
/servercheck versions list 2
/servercheck versions depend CMILib
/servercheck versions depend Vault
/servercheck versions depend ProtocolLib
/servercheck versions depend ViaVersion
/servercheck versions depend CMILib 2
/servercheck versions gate
/servercheck versions debug status
/servercheck versions debug gate
/servercheck versions debug url audit
/servercheck versions debug url add LuckPerms source https://github.com/LuckPerms/LuckPerms
/servercheck versions debug url list LuckPerms
/servercheck versions export markdown
/servercheck versions export discord
/servercheck versions config
/servercheck versions set database.update-on-list false
```

## Permissions

These preserve the standalone permission nodes so LuckPerms migration is simple:

```text
pluginversions.*
pluginversions.help
pluginversions.list
pluginversions.depend
pluginversions.gate
pluginversions.reload
pluginversions.debug
pluginversions.config
pluginversions.set
pluginversions.export
pluginversions.url.*
pluginversions.url.list
pluginversions.url.add
pluginversions.url.del
```

`pluginversions.help` defaults to everyone. All other nodes default to op.

`pluginversions.depend` controls dependency reports and their plugin-name and page completion. It is included in `pluginversions.*`. Use `/servercheck versions depend <plugin> [page]` directly.

## Placeholders

Primary 1MB-CMIAPI placeholders:

```text
%onembcmi_pluginversions.enabled%
%onembcmi_pluginversions.total%
%onembcmi_pluginversions.enabled.count%
%onembcmi_pluginversions.disabled.count%
%onembcmi_pluginversions.database.tracked%
%onembcmi_pluginversions.database.file%
%onembcmi_pluginversions.exports.directory%
%onembcmi_pluginversions.gate.status%
%onembcmi_pluginversions.gate.issues.count%
%onembcmi_pluginversions.gate.warnings.count%
%onembcmi_pluginversions.placeholderapi.registered%
```

Legacy PlaceholderAPI compatibility placeholders:

```text
%pluginversions_total%
%pluginversions_plugin_count%
%pluginversions_enabled%
%pluginversions_enabled_count%
%pluginversions_disabled%
%pluginversions_disabled_count%
%pluginversions_database_tracked%
%pluginversions_tracked%
%pluginversions_gate_status%
%pluginversions_gate_issues_count%
%pluginversions_gate_warnings_count%
%pluginversions_version_<plugin>%
%pluginversions_url_<plugin>_<type>%
```

Examples:

```text
/papi parse me %pluginversions_total%
/papi parse me %pluginversions_version_CMI%
/papi parse me %pluginversions_gate_status%
/papi parse me %pluginversions_url_LuckPerms_source%
/papi parse me %onembcmi_pluginversions.database.tracked%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/PluginVersions/config.yml
```

Every config path is commented. Comments are re-applied on reload while existing values are preserved through the shared 1MB-CMIAPI `FeatureSettings` helper. Translations stay at `plugins/1MB-CMIAPI/CMIAPILIB/translations/pluginversions.yml`.

ServerCheck manages the module's active state through `modules.pluginversions.enabled` in its host config after importing the legacy setting. Use `/servercheck admin module versions <true|false>` to change it.

Key settings:

```text
check-for-updates
settings.enable-metrics
settings.locale
settings.lines-per-page
database.file
database.update-on-enable
database.update-on-list
database.max-history-per-plugin
exports.directory
version-gate.enabled
version-gate.expected-java-major
version-gate.expected-paper-target
version-gate.required-plugins
version-gate.optional-plugins
version-gate.expected-plugin-version-prefixes
```

`database.file` and `exports.directory` are filesystem paths. They can only be changed from the console or by editing `config.yml`.

## Behavior

`/servercheck versions list` sorts loaded plugins alphabetically and prints the plugin name plus current plugin metadata version. Running `/servercheck versions list` with no page lists all plugins; `/servercheck versions list <page>` uses `settings.lines-per-page`.

### Declared dependency reports

`/servercheck versions depend <plugin> [page]` reads a fresh snapshot of Paper's loaded-plugin metadata on every invocation. It shows the target's name, installed version when available, Paper enabled/disabled state, provided aliases, and relationship counts. Players receive pages using `settings.lines-per-page`, starting at page 1; console receives the full report. Page numbers outside the available range are rejected.

| Report category | Meaning |
| --- | --- |
| Required by | Plugins declaring the target, or an unambiguous provided alias, as required to load. |
| Optional integration for | Plugins declaring a soft dependency. Removal may disable features even if the consumer still loads. This does not confirm the integration is active. |
| Indirectly required by | Plugins connected through two or more required dependencies. One shortest required chain is shown per plugin; optional and load-order relationships do not extend these chains. |
| Depends on (required/optional) | The target's own declarations, resolved to loaded providers and versions where possible. Missing references are marked `not loaded`. |
| Load-order list on target / Other load-order references | The target's declared load-before list and other plugins whose load-before lists reference the target. These rows are ordering information, not evidence of API use. |

Names and provided aliases match case-insensitively, preserving punctuation. Primary names take precedence over provided aliases. Ambiguous aliases are rejected as query targets; ambiguous dependency references are displayed separately and excluded from confirmed counts and required chains. Duplicate references through several aliases do not duplicate a consumer. Cycles terminate without listing the target as its own dependent.

Tab completion includes loaded primary names, provided aliases, and declared references. A referenced plugin that is not loaded can still be queried; its version is unavailable, but its known dependents remain visible. An unknown name produces a clear error instead of an empty dependency report.

**Scope and removal decisions:** the report uses the common `PluginMeta` runtime metadata for Bukkit and Paper plugins, including plugins that Paper loaded but has disabled. Paper's common dependency lists exclude bootstrap-only declarations and Paper dependencies with `join-classpath: false`; these can still be required by the loader. The report also does not inspect JARs that failed to load, historical inventory entries, embedded/downloaded Java libraries, proxy plugins, configuration-driven hooks, or undeclared integrations. Paper's enabled state does not prove a feature or integration is active. An empty result says `No unambiguous declared dependents found in this snapshot`; it never certifies that a plugin is unused or safe to remove. ViaVersion, for example, can provide client-version compatibility independently of plugin dependents. Review the relevant integrations and test removal on the test server with a full restart and gameplay checks.

The command performs no database refresh, file scan, network request, plugin disable/unload, or other mutation. Existing inventory exports are unchanged.

`/servercheck versions gate` is read-only. It checks that the runtime Java major meets `version-gate.expected-java-major` as a minimum, then checks the Paper target string, required plugins, optional plugins, and configured version prefixes. The JARs target Java 25 and accept newer runtimes such as Java 27. Required plugins that are missing or disabled are issues. Optional plugins that are missing are informational. Version prefix drift is a warning so staff can decide whether a newer patch or dev build is acceptable.

PluginVersions updates a YAML inventory database during startup when `database.update-on-enable` is true, during `/servercheck versions reload`, during `/servercheck versions list` when `database.update-on-list` is true, during URL audit, and during exports.

The database records display name, internal name, version, enabled state, first/last seen timestamps, seen count, description, main class, api-version, website, authors, contributors, dependencies, provided plugins, detected URLs, manual URLs, and scan history. Scans update the existing inventory and retain history within `database.max-history-per-plugin`.

Manual URLs are stored under each plugin in the database and merged with detected URLs during exports. Known inferred URL types include `github`, `modrinth`, `hangar`, `spigot`, `dev-bukkit`, `jenkins`, `ci`, and `website`, but admins can also provide custom types such as `source`, `docs`, or `download`.

`/servercheck versions export markdown` writes `plugins-YYYY-MM-DD-HHMMSS.md` and `plugins-latest.md`. The export includes a version-gate table before the plugin inventory.

`/servercheck versions export discord` writes `plugins-discord-YYYY-MM-DD-HHMMSS.md` and `plugins-discord-latest.md`. The Discord export includes the same gate summary in bullet form.

## CMI / CMILib / CMI-API Usage

The module runs under ServerCheck and shares its CMI, CMILib, and `1MB-CMIAPI-Lib` dependencies. ServerCheck appears in `/1mblib features`. Use `/servercheck versions debug all` for PluginVersions diagnostics.

The module reads installed CMI and CMILib metadata for the inventory, `/servercheck versions gate`, and exports.

## Paper API Usage

PluginVersions uses modern Paper/Bukkit plugin metadata APIs through `Plugin#getPluginMeta()`, Bukkit command registration, PlaceholderAPI soft hooks, Paper/Bukkit YAML, runtime Java/Paper version strings, and Adventure output through the shared library.

## Security Notes

- `/servercheck versions list`, `/servercheck versions depend`, `/servercheck versions debug`, `/servercheck versions config`, `/servercheck versions set`, `/servercheck versions export`, and URL edits are permission-gated.
- Console can always use the commands.
- `database.file` and `exports.directory` are console-only through `/servercheck versions set`.
- URL input must be a valid `http` or `https` URI with a host.
- URL categories accept only letters, numbers, dashes, and underscores.
- Dynamic text is escaped before MiniMessage rendering.
- Dependency query names accept only letters, numbers, underscores, hyphens, and periods. Unprivileged users cannot complete plugin names for `/servercheck versions depend`.
- The plugin writes only its own feature folder by default.

## Testing

```text
/servercheck versions info
/servercheck versions list
/servercheck versions list 1
/servercheck versions depend CMILib
/servercheck versions depend Vault
/servercheck versions depend ViaVersion
/servercheck versions depend 1MB-Lib-Core
/servercheck versions depend CMILib 2
/servercheck versions gate
/servercheck versions debug all
/servercheck versions debug gate
/servercheck versions debug url audit
/servercheck versions debug url add CMI docs https://www.zrips.net/cmi/
/servercheck versions debug url list CMI
/servercheck versions export markdown
/servercheck versions export discord
/papi parse me %pluginversions_total%
/papi parse me %onembcmi_pluginversions.enabled%
```

For dependency reports, check the `pluginversions.depend` permission, player pagination versus full console output, case-insensitive aliases, missing declared targets, invalid names/pages, enabled/disabled labels, and the declaration/removal limitation. Focused automated tests exercise direct versus optional/order-only relationships, shortest required chains, cycles, alias collisions and duplicates, both common metadata implementations, fresh snapshots, permission checks, and completion.

[Plugin index](README.md) | [Documentation index](../README.md)
