# 1MB-AntiXRay Installation

## Requirements

- Paper server with plugin metadata compatibility floor `1.21.11`
- Compile target: Paper API `26.1.2`
- Java `25` for building and running
- CoreProtect already installed and loaded
- Supported CoreProtect API range in code: `7` through `12`

## Build

Build with the Gradle wrapper:

```bash
./gradlew build
```

The generated jar name pattern is:

```text
build/libs/1MB-AntiXRay-v2.0.9-0xx-j25-26.1.2.jar
```

The jar name reflects the compile target (`26.1.2`). The embedded `plugin.yml` declares `api-version: 1.21.11`.

## Fresh Install

1. Start with a Paper server running Java `25`.
2. Install a compatible CoreProtect jar into `plugins/`.
3. Place the latest `1MB-AntiXRay-v2.0.9-0xx-j25-26.1.2.jar` into `plugins/`.
4. Start the server.
5. Confirm the plugin enabled successfully.
6. Run `/xlu info`, `/xlu help`, and `/xlu debug health` as a readiness check.

The plugin data folder is:

```text
plugins/1MB-AntiXRay/
```

## Updating

1. Stop the server cleanly.
2. Replace the old top-level `1MB-AntiXRay` jar with the new jar.
3. Keep the existing `plugins/1MB-AntiXRay/` data folder unless you intentionally want to reset config, reports, audit logs, or cached baselines.
4. Start the server again.
5. Run `/xlu info` and `/xlu debug health` to confirm the expected build is active.

## Files Created by the Plugin

- `plugins/1MB-AntiXRay/config.yml`
- `plugins/1MB-AntiXRay/admin-actions.log`
- `plugins/1MB-AntiXRay/reports/`
- `plugins/1MB-AntiXRay/baseline.yml` after a baseline rebuild

## Compatibility Notes

- This plugin is a CoreProtect add-on and does not replace CoreProtect.
- The codebase compiles against Paper API `26.1.2`.
- The declared plugin metadata floor is `1.21.11`.
- The plugin checks CoreProtect API compatibility at enable time and disables itself if CoreProtect is missing or exposes an unsupported API version.
