# 1MB-AntiXRay

`1MB-AntiXRay` is a small CoreProtect add-on used by 1MoreBlock to review ore-breaking patterns and investigate suspicious mining activity.

Canonical player docs: <https://docs.1moreblock.com/custom-server-plugins/coreprotect-antixray/>

This branch is updated for:

- Paper `26.1.2`
- plugin.yml `api-version` floor `1.21.11`
- Java `25`
- CoreProtect on a modern Paper test server
- Build line `v2.0.9-0xx-j25-26.1.2`

## Compatibility

- Compiles against Paper API `26.1.2`
- Declares plugin.yml `api-version: 1.21.11`
- Intended load targets: Paper `1.21.11` and Paper `26.1.2`
- Java runtime for building and running: Java `25`
- Dependency: CoreProtect must already be installed and loaded
- Accepts CoreProtect API `7` through `12`
- Runtime-tested with CoreProtect `23.4` (API `11`) and `24.0-dev1` (API `12`)
- Does not register its own PlaceholderAPI placeholders
- Current output artifact pattern: `build/libs/1MB-AntiXRay-v2.0.9-0xx-j25-26.1.2.jar`

## Documentation

This README is the technical overview. Detailed project-local docs live in [`docs/`](docs/):

- [`docs/player-guide.md`](docs/player-guide.md) for the friendly player and moderator guide
- [`docs/commands.md`](docs/commands.md) for verified command behavior and examples
- [`docs/permissions.md`](docs/permissions.md) for permission nodes and defaults
- [`docs/configuration.md`](docs/configuration.md) for config keys, defaults, valid values, and reload behavior
- [`docs/installation.md`](docs/installation.md) for build, install, update, and readiness-check steps
- [`docs/integrations.md`](docs/integrations.md) for compatibility and dependency notes
- [`docs/troubleshooting.md`](docs/troubleshooting.md) for common problems and safe fixes
- [`docs/plugin-docs.yml`](docs/plugin-docs.yml) for the central importer manifest

## Commands

| Command | Description | Example |
| --- | --- | --- |
| `/xlu info` | Shows the player-facing introduction, useful starting commands, canonical docs URL, and installed version/build. | `/xlu info` |
| `/xlu <player-or-uuid> [days] [page]` | Runs a CoreProtect lookup for tracked block breaks. If `[days]` is omitted, the plugin uses `defaults.lookup-days`. When paginated in-game output is enabled, the optional page argument opens a cached page without re-running the lookup. Valid UUID input is auto-resolved through the server's known player cache first. | `/xlu mrfloris 30 2` |
| `/xlu compare <player1> <player2> [days] [page]` | Compares two players across the same lookup window. In compare mode, `percent` and `total` sorting prioritize the biggest differences between the two players. | `/xlu compare mrfloris yakirarage 30` |
| `/xlu uuid <player-uuid> [days] [page]` | Resolves a UUID to the server's known player name, then runs the same lookup flow. Useful when a player changed names. | `/xlu uuid 00000000-0000-0000-0000-000000000000 30` |
| `/xlu last [page]` | Reopens the most recent cached lookup for that sender. In paginated in-game mode, an optional page opens a cached page directly. | `/xlu last 2` |
| `/xlu <player-or-uuid> [days] -sort <mode>` | Runs a lookup with a one-off sort override. Valid modes are `importance`, `percent`, `total`, and `name`. The same override also works with `/xlu compare` and `/xlu uuid`. | `/xlu mrfloris 30 -sort percent` |
| `/xlu <player-or-uuid> [days] -world <world>` | Limits a lookup to one loaded world. This same flag also works with `/xlu compare` and `/xlu uuid`. | `/xlu mrfloris 30 -world world_nether` |
| `/xlu <player-or-uuid> [days] -highvalue` | Forces the curated high-value ore view for a single lookup. The same override also works with `/xlu compare` and `/xlu uuid`. | `/xlu mrfloris -highvalue` |
| `/xlu <player-or-uuid> [days] -all` | Forces the full tracked-ore view for a single lookup. The same override also works with `/xlu compare` and `/xlu uuid`. | `/xlu mrfloris 30 -all` |
| `/xlu <player-or-uuid> [days] -zeros` | Includes zero-result rows for a single lookup. The same override also works with `/xlu compare` and `/xlu uuid`. | `/xlu mrfloris 30 -zeros` |
| `/xlu help` | Shows command help in chat or console. | `/xlu help` |
| `/xlu debug` | Shows plugin, Java, server, and CoreProtect diagnostic info. | `/xlu debug` |
| `/xlu debug help` | Lists the available debug subcommands. | `/xlu debug help` |
| `/xlu debug permissions` | Lists permission nodes, defaults, and what they do. | `/xlu debug permissions` |
| `/xlu debug commands` | Lists supported commands and usage notes. | `/xlu debug commands` |
| `/xlu debug config` | Shows the active logical config values. | `/xlu debug config` |
| `/xlu debug health` | Shows a shorter operational status view. | `/xlu debug health` |
| `/xlu debug baseline` | Shows the cached baseline status, source database, stored periods, and baseline file details. | `/xlu debug baseline` |
| `/xlu debug baseline rebuild` | Rebuilds `plugins/1MB-AntiXRay/baseline.yml` from the CoreProtect SQLite database in the background. | `/xlu debug baseline rebuild` |
| `/xlu debug baseline clear` | Deletes `plugins/1MB-AntiXRay/baseline.yml` and clears the loaded baseline cache. | `/xlu debug baseline clear` |
| `/xlu debug clean <cache|reports|baseline|all>` | Cleans cached lookup data, exported reports, baseline data, or all of them. | `/xlu debug clean reports` |
| `/xlu debug set <key> <value>` | Writes a supported config value and reloads `config.yml`. | `/xlu debug set console-report.sort-mode percent` |
| `/xlu reload` | Reloads `plugins/1MB-AntiXRay/config.yml` without restarting the server. | `/xlu reload` |

## Examples

- `/xlu mrfloris`
- `/xlu info`
- `/xlu yakirarage 350`
- `/xlu 631e3896-da2a-4077-974b-d047859d76bc 900`
- `/xlu uuid 631e3896-da2a-4077-974b-d047859d76bc 900 -world world`
- `/xlu compare mrfloris yakirarage 30 -sort percent`
- `/xlu compare mrfloris yakirarage 90 -world world_nether -zeros`
- `/xlu last 2`
- `/xlu debug health`
- `/xlu debug baseline`
- `/xlu debug baseline rebuild`
- `/xlu debug baseline clear`
- `/xlu debug clean cache`
- `/xlu debug clean baseline`
- `/xlu debug clean reports`
- `/xlu debug set ingame-report.legacy-format false`

## Permissions

| Permission | Default | Description |
| --- | --- | --- |
| `cpantixray.use` | `op` | Allows the player or console sender to run lookups, compares, UUID lookups, and `/xlu last`. |
| `cpantixray.admin` | `op` | Allows `/xlu reload`, `/xlu debug`, `/xlu debug baseline`, `/xlu debug clean`, `/xlu debug set`, and all admin-only debug pages. Also includes `cpantixray.use`. |

## Build

Make sure Java 25 is active, then build with the Gradle wrapper:

```bash
./gradlew build
```

The compiled jar will be written to:

```text
build/libs/1MB-AntiXRay-v2.0.9-0xx-j25-26.1.2.jar
```

The jar naming still reflects the compile target (`26.1.2`), while the embedded `plugin.yml` declares `api-version: 1.21.11` so the same jar can be tested on both Paper `1.21.11` and `26.1.2`.

When a local CoreProtect development jar is available, local Gradle builds can prefer it for compile/test compatibility with newer CoreProtect API releases. If no local jar is configured, the build falls back to the Maven dependency declared in `build.gradle`.

The development build number is tracked in:

```text
version.properties
```

Each successful jar build increments that counter, so the next local build will produce the next build number automatically.

## Installation

1. Start with a Paper `26.1.2` server running on Java `25`.
2. Put a compatible CoreProtect jar in the server `plugins/` folder.
3. Put the latest `1MB-AntiXRay-v2.0.9-0xx-j25-26.1.2.jar` in the same `plugins/` folder.
4. Start the server.

If the plugin ever writes its own files, its plugin data folder name will be:

```text
plugins/1MB-AntiXRay/
```

The plugin now ships with:

```text
plugins/1MB-AntiXRay/config.yml
```

Current config options cover the console report sort mode, whether ores/base blocks/zero rows are shown, separate console and in-game controls for summary / lookup timing / hidden zero-row sections, and whether in-game output should stay in the legacy format or use paginated chat pages.

`defaults.lookup-days` lets `/xlu <player-or-uuid>` use a server-defined default window such as `30` days.

Current config additions also cover:

- `startup.self-check-enabled` for the optional startup summary in console
- `queue.enabled` to decide whether lookups queue up or still use the old busy/reject behavior
- `baseline.enabled`, `baseline.include-in-reports`, and `baseline.periods` for the cached server-baseline system, including optional `alltime`
- `staff-verdict.*` thresholds for the heuristic quick-read line
- `reports.auto-export` for automatic lookup exports to `plugins/1MB-AntiXRay/reports/`
- `display.friendly-material-names` for prettier material labels
- `ingame-report.detail-page-size` for configurable paginated ore-detail page sizes

Admins can inspect or change the live config with:

```text
/xlu debug config
/xlu debug health
/xlu debug baseline
/xlu debug baseline rebuild
/xlu debug baseline clear
/xlu debug clean <cache|reports|baseline|all>
/xlu debug set <key> <value>
```

Successful admin-side config changes are appended to:

```text
plugins/1MB-AntiXRay/admin-actions.log
```

That audit log now also records `/xlu reload` and read-only admin debug page access, and now automatically rolls over when it grows too large or too old.

Fresh lookups can also auto-export a plain-text copy to:

```text
plugins/1MB-AntiXRay/reports/<uuid>.log
```

Manual server-baseline rebuilds are cached in:

```text
plugins/1MB-AntiXRay/baseline.yml
```

The baseline file is built on demand from CoreProtect's SQLite `database.db`, not during normal lookups, so live `/xlu` reports do not repeatedly scan the full database.

`baseline.periods` can now include `alltime`, for example:

```text
30,90,365,alltime
```

That lets very long lookups such as `500`, `900`, or `1000` days compare against a full-history cached baseline instead of falling back to `365d`.

## Reading The Output

Two summary lines often need a little interpretation:

```text
Staff Verdict: Unusual pattern (heuristic; high-value 8.12%)
Server Baseline: 365d all-world (diamond +0.44%, redstone +2.16%, emerald -0.63%, high-value -5.36%)
```

`Staff Verdict` is a heuristic quick-read. It uses the configured `staff-verdict.*` thresholds and does **not** mean the plugin has proven cheating.

- `high-value 8.12%` means `8.12%` of all tracked broken blocks in that lookup window were from the curated high-value material set.
- That high-value set is the combined ore side of the report, not base blocks like `stone`, `deepslate`, or `netherrack`.
- In the example above, that `8.12%` is the combined share of rows such as `diamond_ore`, `gold_ore`, `redstone_ore`, `lapis_ore`, and the rest of the tracked high-value list.

`Server Baseline` is different. It compares the current lookup against the cached `baseline.yml` snapshot for the closest configured window.

- A `+` value means the player's share for that ore is **above** the cached server baseline.
- A `-` value means the player's share for that ore is **below** the cached server baseline.
- Negative values are completely normal. They do **not** mean something is broken.
- These are best read as percentage-point differences, not as raw ore percentages.

Examples:

- `diamond +0.44%` means this lookup's diamond share is `0.44` percentage points higher than the cached baseline for that period/scope.
- `emerald -0.63%` means this lookup's emerald share is `0.63` percentage points lower than the cached baseline.
- `high-value -5.36%` means the player's combined high-value share is `5.36` percentage points lower than the cached high-value baseline, even if one or two individual ores are above baseline.

The baseline label also tells you which cached snapshot was used:

- `365d` means the lookup was compared against the `365`-day cached baseline period.
- `alltime` means the lookup was compared against the full cached CoreProtect history that was included in the most recent baseline rebuild.
- `all-world` means it used the all-world baseline rather than a world-specific one.

## Notes

- This plugin is an add-on and does not replace CoreProtect.
- Any local test-server artifacts in this repository are for maintainer testing only and are ignored by Git.
- `./gradlew build` preserves older jars already in `build/libs/`, which is useful when keeping multiple local snapshots side by side.
- The console report can now be sorted by `importance`, `percent`, `total`, or `name`.
- `/xlu info` is the player-facing onboarding entry point and links to the canonical docs page.
- `/xlu <player-or-uuid> [days] -sort <mode>` overrides the configured sort mode for that lookup only.
- `/xlu compare <player1> <player2> [days]` compares two players and shows the biggest ore/base-block gaps between them.
- `/xlu uuid <player-uuid> [days]` resolves a UUID through the server's known player cache, then runs the lookup using that name.
- `/xlu <uuid>` now auto-detects valid UUID input and routes it through the same UUID resolver instead of treating it as an invalid player name.
- `/xlu last` reopens the most recent cached lookup for that sender.
- `/xlu <player-or-uuid> [days] -world <world>` scopes a lookup to one loaded world, and the same flag also works with `/xlu compare` and `/xlu uuid`.
- `/xlu <player-or-uuid> [days] -highvalue`, `-all`, and `-zeros` give one-off view overrides without editing config.
- `/xlu help` includes the sort-mode note, and `/xlu debug commands` shows the command list in-game or in console.
- `/xlu debug` now includes build targets, CoreProtect jar/database details, config file path, admin audit log path, and in-game cache stats.
- `/xlu debug health` gives a shorter operational status page including queue state and baseline status, and `/xlu debug clean <cache|reports|baseline|all>` can now clean cache entries, exported reports, baseline data, or all of them.
- `/xlu debug baseline` shows whether a cached baseline is loaded, where `baseline.yml` lives, which periods are configured, and which CoreProtect database it was built from.
- `/xlu debug baseline rebuild` performs a one-off SQLite read of the CoreProtect database and caches the result in `plugins/1MB-AntiXRay/baseline.yml`.
- `/xlu debug baseline rebuild` now emits progress updates while it runs, including tracked-material loading, per-period progress, and the final baseline save step.
- `baseline.periods` supports `alltime`, so long-window lookups can compare against a full-history cached baseline instead of only the largest finite day window.
- `/xlu debug baseline clear` deletes `baseline.yml` and clears the loaded baseline cache.
- `/xlu debug clean baseline` is an alias for `/xlu debug baseline clear`, and `/xlu debug clean all` now includes the baseline file/cache too.
- `console-report.high-value-ores-only` is available in `config.yml` and can be overridden per lookup with `-highvalue` or `-all`.
- `console-report` and `ingame-report` can now control summary, lookup time, and hidden-row visibility separately.
- The report now includes a `Staff Verdict` quick-read line that is clearly labeled as a heuristic, not a server-average calculation, and it now lists every triggered reason instead of truncating with `+1 more`.
- When `baseline.yml` is present, lookups and compares also include a factual `Server Baseline` line that compares diamond, redstone, emerald, and combined high-value percentages against the closest configured baseline window.
- Paginated in-game reports now include clickable sort shortcuts.
- Paginated in-game compare reports include clickable sort shortcuts and sender-scoped cached pages.
- Fresh lookup exports can be written automatically to `plugins/1MB-AntiXRay/reports/`.
- Compare runs also auto-export to `plugins/1MB-AntiXRay/reports/`.
- World-filtered lookups are shown with a `World:` line in console output, paginated in-game pages, and exported reports.
- `display.friendly-material-names` can switch output labels between raw material ids and friendlier names.
- `ingame-report.detail-page-size` controls how many ore rows each detail page shows before another page is created.
- `startup.self-check-enabled` can mute the startup summary when you're doing compatibility or test loads.
- `queue.enabled` lets you choose between a serialized lookup queue and the older reject-while-busy behavior.
- `staff-verdict.review.*` and `staff-verdict.alert.*` now control the heuristic thresholds for `Worth review` and `Unusual pattern`.
- The configured importance order currently follows the 1MoreBlock high-value material list, including `GILDED_BLACKSTONE`, `RAW_IRON_BLOCK`, and `RAW_COPPER_BLOCK`.

## Credits

- Original authors: xilefkfelix and The456gamer
- Compatibility and Gradle/test-server improvements: [Greymagic27](https://github.com/Greymagic27)
- 1MoreBlock maintenance, packaging, testing, and repo stewardship: [mrfloris](https://github.com/mrfloris)
- Thanks as well to the contributors listed in this repository’s history and to OpenAI for development assistance
