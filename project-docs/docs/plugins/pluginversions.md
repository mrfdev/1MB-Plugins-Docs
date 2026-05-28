# PluginVersions

PluginVersions is the 1MB-CMIAPI merge of the standalone `PluginVersions` project. It keeps the familiar `/pv` command, plugin inventory database, manual URL curation, Markdown/Discord export flow, permissions, and `%pluginversions_*%` PlaceholderAPI expansion while adding a read-only tested Java/Paper/dependency version gate and moving runtime data into the shared 1MB-CMIAPI folder layout.

Use it when staff need a quick loaded-plugin version list, a searchable plugin inventory, a tested Java/Paper/dependency version gate, or a support/export snapshot after Paper, CMI, CMILib, or feature-jar updates.

## Migration Notes

- Remove or disable the old standalone `1MB-PluginVersions` jar before enabling `1MB-CMIAPI-PluginVersions`.
- The command remains `/pv`.
- The new config lives at `plugins/1MB-CMIAPI/PluginVersions/config.yml`.
- The new database lives at `plugins/1MB-CMIAPI/PluginVersions/plugins-database.yml` by default.
- The new export folder is `plugins/1MB-CMIAPI/PluginVersions/exports/` by default.
- Existing standalone database files are not moved automatically. Copy them manually only if you want to preserve the old inventory history.

## Commands

```text
/pv
/pv info
/pv help [page|topic]
/pv list [page]
/pv gate [page]
/pv reload
/pv debug [page|topic]
/pv debug commands [page]
/pv debug permissions [page]
/pv debug placeholders [page]
/pv debug config [page]
/pv debug gate [page]
/pv debug url add <plugin> <url>
/pv debug url add <plugin> <type> <url>
/pv debug url del <plugin> [type] <url>
/pv debug url list <plugin>
/pv debug url audit [page]
/pv config [page]
/pv set <path> <value>
/pv export [markdown|discord]
```

Help topics:

```text
/pv help overview
/pv help commands
/pv help permissions
/pv help placeholders
/pv help config
/pv help gate
/pv help set
```

Debug topics:

```text
/pv debug status
/pv debug plugin
/pv debug server
/pv debug plugins
/pv debug gate
/pv debug commands
/pv debug permissions
/pv debug placeholders
/pv debug config
/pv debug set
/pv debug url
/pv debug all
```

## Example Commands

```text
/pv info
/pv list
/pv list 2
/pv gate
/pv debug status
/pv debug gate
/pv debug url audit
/pv debug url add LuckPerms source https://github.com/LuckPerms/LuckPerms
/pv debug url list LuckPerms
/pv export markdown
/pv export discord
/pv config
/pv set database.update-on-list false
```

## Permissions

These preserve the standalone permission nodes so LuckPerms migration is simple:

```text
pluginversions.*
pluginversions.help
pluginversions.list
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

Every config path is commented. Comments are re-applied on reload while existing values are preserved through the shared 1MB-CMIAPI `FeatureSettings` helper.

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

`/pv list` sorts loaded plugins alphabetically and prints the plugin name plus current plugin metadata version. Running `/pv list` with no page lists all plugins; `/pv list <page>` uses `settings.lines-per-page`.

`/pv gate` is read-only. It checks the runtime Java major, Paper target string, required plugins, optional plugins, and configured version prefixes. Required plugins that are missing or disabled are issues. Optional plugins that are missing are informational. Version prefix drift is a warning so staff can decide whether a newer patch or dev build is acceptable.

PluginVersions updates a YAML inventory database during startup when `database.update-on-enable` is true, during `/pv reload`, during `/pv list` when `database.update-on-list` is true, during URL audit, and during exports.

The database records display name, internal name, version, enabled state, first/last seen timestamps, seen count, description, main class, api-version, website, authors, contributors, dependencies, provided plugins, detected URLs, manual URLs, and scan history.

Manual URLs are stored under each plugin in the database and merged with detected URLs during exports. Known inferred URL types include `github`, `modrinth`, `hangar`, `spigot`, `dev-bukkit`, `jenkins`, `ci`, and `website`, but admins can also provide custom types such as `source`, `docs`, or `download`.

`/pv export markdown` writes `plugins-YYYY-MM-DD-HHMMSS.md` and `plugins-latest.md`. The export includes a version-gate table before the plugin inventory.

`/pv export discord` writes `plugins-discord-YYYY-MM-DD-HHMMSS.md` and `plugins-discord-latest.md`. The Discord export includes the same gate summary in bullet form.

## CMI / CMILib / CMI-API Usage

PluginVersions is a normal 1MB-CMIAPI feature jar. It depends on CMI, CMILib, and `1MB-CMIAPI-Lib`, registers in the shared feature registry, uses the shared MiniMessage output style, uses shared config comments, and participates in `/1mbcmi features` plus `/1mbcmi debug plugin pluginversions all`.

It does not need private CMI internals. CMI and CMILib are part of the runtime context so the inventory sees their installed plugin metadata, checks them in `/pv gate`, and exports them alongside the other Paper plugins.

## Paper API Usage

PluginVersions uses modern Paper/Bukkit plugin metadata APIs through `Plugin#getPluginMeta()`, Bukkit command registration, PlaceholderAPI soft hooks, Paper/Bukkit YAML, runtime Java/Paper version strings, and Adventure output through the shared library.

## Security Notes

- `/pv list`, `/pv debug`, `/pv config`, `/pv set`, `/pv export`, and URL edits are permission-gated.
- Console can always use the commands.
- `database.file` and `exports.directory` are console-only through `/pv set`.
- URL input must be a valid `http` or `https` URI with a host.
- URL categories accept only letters, numbers, dashes, and underscores.
- Dynamic text is escaped before MiniMessage rendering.
- The plugin writes only its own feature folder by default.

## Testing

```text
/pv info
/pv list
/pv list 1
/pv gate
/pv debug all
/pv debug gate
/pv debug url audit
/pv debug url add CMI docs https://www.zrips.net/cmi/
/pv debug url list CMI
/pv export markdown
/pv export discord
/papi parse me %pluginversions_total%
/papi parse me %onembcmi_pluginversions.enabled%
```

[Plugin index](README.md) | [Documentation index](../README.md)
