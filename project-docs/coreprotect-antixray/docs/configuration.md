# 1MB-AntiXRay Configuration

Runtime config file: `plugins/1MB-AntiXRay/config.yml`

The plugin uses Bukkit's comment-aware `YamlConfiguration` support. Missing defaults and missing comments are restored on startup, `/xlu reload`, and `/xlu debug set` without overwriting existing admin-edited values.

## Startup

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `startup.self-check-enabled` | `true` | `true`, `false` | Applies on the next plugin enable/server startup. Reload only affects future startups. | Prints the startup self-check summary in console. |

## Queue

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `queue.enabled` | `true` | `true`, `false` | Takes effect on `/xlu reload`, `/xlu debug set`, or server restart for new requests. | Queues new lookups instead of rejecting them while another lookup is running. |

## Baseline

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `baseline.enabled` | `true` | `true`, `false` | Takes effect on `/xlu reload`, `/xlu debug set`, or server restart. | Enables cached server-baseline comparisons when `baseline.yml` exists. |
| `baseline.include-in-reports` | `true` | `true`, `false` | Takes effect on `/xlu reload`, `/xlu debug set`, or server restart. | Shows the `Server Baseline` line in reports when baseline data is available. |
| `baseline.periods` | `30`, `90`, `365`, `alltime` | YAML list of positive whole numbers and/or `alltime` | Takes effect on reload, but only influences future baseline rebuilds and future matching. | Controls which windows `/xlu debug baseline rebuild` caches. |

## Staff Verdict

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `staff-verdict.minimum-tracked-breaks` | `500` | whole numbers `>= 0` | Applies on reload or restart. | Minimum tracked breaks required before the plugin stops saying there is too little data. |
| `staff-verdict.review.diamond-percent` | `1.00` | decimal `>= 0` | Applies on reload or restart. | Diamond threshold for `Worth review`. |
| `staff-verdict.review.redstone-percent` | `2.50` | decimal `>= 0` | Applies on reload or restart. | Redstone threshold for `Worth review`. |
| `staff-verdict.review.emerald-percent` | `0.25` | decimal `>= 0` | Applies on reload or restart. | Emerald threshold for `Worth review`. |
| `staff-verdict.review.high-value-percent` | `5.00` | decimal `>= 0` | Applies on reload or restart. | Combined high-value threshold for `Worth review`. |
| `staff-verdict.alert.diamond-percent` | `2.00` | decimal `>= 0` | Applies on reload or restart. | Diamond threshold for `Unusual pattern`. |
| `staff-verdict.alert.redstone-percent` | `4.00` | decimal `>= 0` | Applies on reload or restart. | Redstone threshold for `Unusual pattern`. |
| `staff-verdict.alert.emerald-percent` | `0.50` | decimal `>= 0` | Applies on reload or restart. | Emerald threshold for `Unusual pattern`. |
| `staff-verdict.alert.high-value-percent` | `8.00` | decimal `>= 0` | Applies on reload or restart. | Combined high-value threshold for `Unusual pattern`. |

All percentage settings are percentage points, not fractions. For example, `1.00` means `1.00%`.

## Reports and Display

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `reports.auto-export` | `true` | `true`, `false` | Applies on reload or restart for future exports. | Automatically writes lookup and compare reports to `plugins/1MB-AntiXRay/reports/`. |
| `display.friendly-material-names` | `false` | `true`, `false` | Applies on reload or restart. | Uses friendly names such as `Diamond Ore` instead of `diamond_ore`. |
| `defaults.lookup-days` | `30` | whole numbers `>= 1` | Applies on reload or restart. | Default lookup window for `/xlu <player-or-uuid>` when `[days]` is omitted. |

## Console Report

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `console-report.enabled` | `true` | `true`, `false` | Applies on reload or restart. | Enables the cleaner modern console report. |
| `console-report.sort-mode` | `importance` | `importance`, `percent`, `total`, `name` | Applies on reload or restart; can be overridden with `-sort`. | Default console ore-row sort mode. |
| `console-report.high-value-ores-only` | `false` | `true`, `false` | Applies on reload or restart; can be overridden with `-highvalue` or `-all`. | Limits console ore rows to the curated high-value list. |
| `console-report.include-ores` | `true` | `true`, `false` | Applies on reload or restart. | Shows ore and ore-like rows in console output. |
| `console-report.include-base-blocks` | `true` | `true`, `false` | Applies on reload or restart. | Shows base blocks such as stone, deepslate, and netherrack. |
| `console-report.include-zero-results` | `false` | `true`, `false` | Applies on reload or restart; can be overridden with `-zeros`. | Shows rows with a total count of `0`. |
| `console-report.include-summary` | `true` | `true`, `false` | Applies on reload or restart. | Shows summary lines such as tracked breaks and Staff Verdict. |
| `console-report.include-lookup-time` | `true` | `true`, `false` | Applies on reload or restart. | Shows the lookup completion timing line. |
| `console-report.include-hidden-row-count` | `true` | `true`, `false` | Applies on reload or restart. | Shows how many zero-result rows were hidden and which ones they were. |

## In-Game Report

| Setting | Default | Valid values | Reload behavior | What it controls |
| --- | --- | --- | --- | --- |
| `ingame-report.legacy-format` | `true` | `true`, `false` | Applies on reload or restart. | Uses the older legacy in-game output instead of paginated chat pages. |
| `ingame-report.detail-page-size` | `5` | whole numbers `>= 1` | Applies on reload or restart. | How many ore rows each paginated in-game detail page shows before it splits into more pages. |
| `ingame-report.include-summary` | `true` | `true`, `false` | Applies on reload or restart. | Shows summary lines such as tracked breaks and Staff Verdict in in-game output. |
| `ingame-report.include-lookup-time` | `true` | `true`, `false` | Applies on reload or restart. | Shows the lookup completion timing line in in-game output. |
| `ingame-report.include-hidden-row-count` | `true` | `true`, `false` | Applies on reload or restart. | Shows the hidden zero-row section in paginated in-game output. |

## Command-Driven Config Edits

Admin config updates can be applied with:

- `/xlu debug config`
- `/xlu debug set <key> <value>`
- `/xlu reload`

`/xlu debug set` reloads the plugin config after saving the new value. Successful admin-side config actions are appended to `plugins/1MB-AntiXRay/admin-actions.log`.
