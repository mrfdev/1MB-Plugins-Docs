# 1MB-AntiXRay Integrations

## Required Dependency

### CoreProtect

CoreProtect is required. The plugin reads CoreProtect lookup results and, when requested, rebuilds cached baseline data from CoreProtect's SQLite `database.db`.

Verified details from the source:

- `depend: [CoreProtect]` in `plugin.yml`
- Supported CoreProtect API versions in code: `7`, `8`, `9`, `10`, `11`, and `12`
- If CoreProtect is missing or exposes an unsupported API, the plugin logs an error and disables itself

## Paper and Java Compatibility

- Compile target: Paper API `26.1.2`
- Declared plugin metadata floor: `1.21.11`
- Java target: `25`

## Permissions Plugins

There is no dedicated hard dependency on a specific permissions plugin. Access checks use Bukkit/Paper permission checks such as `sender.hasPermission(...)`, so operators, console, or a permissions plugin such as LuckPerms can grant access.

## PlaceholderAPI

This plugin does **not** register its own PlaceholderAPI placeholders.

## CMI, Vault, and Other Server Plugins

The plugin has no dedicated runtime integration with CMI, Vault, PlaceholderAPI, or other optional server plugins. If those plugins are present on the server, they may still appear in the wider server environment, but `1MB-AntiXRay` only directly depends on CoreProtect.
