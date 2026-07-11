# SparkReviewer

## Purpose

SparkReviewer is a server-management feature plugin for performance triage.

It does not replace Spark. Spark is still the source of truth for CPU profiling during an active lag event. SparkReviewer adds the workflow around Spark: named test markers, runtime snapshots, latest.log review, Paper/Bukkit/Spigot config review, MobFarmManager hopper-control clues, CMI status, entity/chunk summaries, and before/after comparison for stress tests.

The normal workflow is:

```text
/sparkreviewer review
/sparkreviewer stress mfm-on 180
# change only the MFM hopper-control state and reload/restart as needed
/sparkreviewer stress mfm-off 180
/sparkreviewer compare mfm-on mfm-off
/sparkreviewer logs
/sparkreviewer dump
```

## Features

- Captures live TPS, average MSPT when Paper exposes it, memory usage, player count, world count, and CMI/CMILib/Spark/MobFarmManager status.
- Counts loaded entities per world, including living entities, monsters, animals, item drops, projectiles, vehicles, hopper minecarts, tile entities, and hopper blocks in scanned loaded chunks.
- Lists chunk hotspots by entity/item/hopper/tile count.
- Reviews Paper, Bukkit, Spigot, per-world Paper, MobFarmManager, and selected CMI config values whose paths look performance-relevant.
- Reviews Paper bundled Spark enablement from `config/paper-global.yml` when present.
- Reviews `logs/latest.log` for startup `Done (...)`, shutdown/save lines, Spark report URLs, SparkReviewer markers, `Can't keep up!`, watchdog/stall lines, warnings, errors, and exceptions.
- Dispatches Spark health and profiler commands from a single command surface.
- Writes named snapshots for before/after comparisons such as `mfm-on` versus `mfm-off`.
- Writes support-friendly dumps to the shared cache folder.
- Ships an offline Python companion script for copied server folders.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/sparkreviewer status
/sparkreviewer review
/sparkreviewer findings [page]
/sparkreviewer entities [page]
/sparkreviewer chunks [page]
/sparkreviewer configs [page]
/sparkreviewer logs [page]
/sparkreviewer mfm [page]
/sparkreviewer capture <label>
/sparkreviewer compare <before> <after> [page]
/sparkreviewer spark status
/sparkreviewer spark health
/sparkreviewer spark start [seconds] [label]
/sparkreviewer spark stop [label]
/sparkreviewer spark cancel
/sparkreviewer stress <label> [seconds]
/sparkreviewer dump
/sparkreviewer reload
```

Aliases:

```text
/sreview
/spreview
```

Useful examples:

```text
/sparkreviewer review
/sparkreviewer findings
/sparkreviewer entities
/sparkreviewer chunks
/sparkreviewer configs
/sparkreviewer logs
/sparkreviewer mfm
/sparkreviewer spark health
/sparkreviewer spark start 180 farm-test
/sparkreviewer stress mfm-on 180
/sparkreviewer stress mfm-off 180
/sparkreviewer compare mfm-on mfm-off
/sparkreviewer dump
```

Global library examples:

```text
/1mbcmi debug plugin sparkreviewer
/1mbcmi debug plugin sparkreviewer commands
/1mbcmi debug plugin sparkreviewer permissions
/1mbcmi debug plugin sparkreviewer placeholders
/1mbcmi debug plugin sparkreviewer config
/1mbcmi debug plugin sparkreviewer all
/1mbcmi config sparkreviewer
/1mbcmi config set sparkreviewer spark.default-seconds 300
```

## Permissions

```text
onembcmi.sparkreviewer.use
onembcmi.sparkreviewer.review
onembcmi.sparkreviewer.capture
onembcmi.sparkreviewer.compare
onembcmi.sparkreviewer.spark
onembcmi.sparkreviewer.dump
onembcmi.sparkreviewer.admin
onembcmi.sparkreviewer.admin.reload
```

`use` controls status/help. `review` controls live review pages. `capture` writes named snapshots. `compare` reads named snapshots. `spark` can dispatch Spark profiler and health commands from console, so grant it only to trusted operators. `dump` writes cache reports. `admin` is used by the shared debug fallback. `admin.reload` reloads config and translations.

## Placeholders

```text
%onembcmi_sparkreviewer.enabled%
%onembcmi_sparkreviewer.last.reason%
%onembcmi_sparkreviewer.last.concerns.count%
%onembcmi_sparkreviewer.last.tps.1m%
%onembcmi_sparkreviewer.last.mspt.avg%
%onembcmi_sparkreviewer.last.entities.total%
%onembcmi_sparkreviewer.last.hoppers.loaded%
%onembcmi_sparkreviewer.last.spark.urls.count%
%onembcmi_sparkreviewer.snapshots.count%
%onembcmi_sparkreviewer.cache.size%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/SparkReviewer/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
review.capture-on-enable: false
runtime.max-loaded-chunks-to-scan: 5000
thresholds.tps-warning-tenths: 195
thresholds.tps-critical-tenths: 185
thresholds.mspt-warning: 40
thresholds.mspt-critical: 50
thresholds.world-entities-warning: 1200
thresholds.monsters-warning: 500
thresholds.items-warning: 250
thresholds.loaded-hoppers-warning: 800
thresholds.tile-entities-warning: 3000
thresholds.chunk-entities-warning: 80
thresholds.idle-loaded-chunks-warning: 250
thresholds.loaded-chunks-per-player-warning: 320
config.view-distance-warning: 10
config.simulation-distance-warning: 6
config.include-cmi: true
config.include-mobfarmmanager: true
config.max-signals: 180
log.max-lines: 5000
spark.default-seconds: 120
spark.profiler-extra-args: []
output.page-size: 8
dump.file: sparkreviewer-report.txt
```

`thresholds.tps-warning-tenths` and `thresholds.tps-critical-tenths` are TPS multiplied by 10. `195` means 19.5 TPS.

`runtime.max-loaded-chunks-to-scan` limits hopper/tile-entity scanning work. Entity totals still use Paper's loaded world entity lists.

`spark.profiler-extra-args` can append simple safe Spark arguments such as:

```yaml
spark.profiler-extra-args:
- --only-ticks-over
- "50"
```

Arguments containing spaces are ignored for command-safety reasons.

## Spark Workflow

SparkReviewer dispatches these practical Spark commands:

```text
spark health
spark profiler start --timeout <seconds>
spark profiler stop
spark profiler cancel
```

`/sparkreviewer stress <label> <seconds>` does three things:

1. Saves `<label>-start`.
2. Dispatches Spark profiler start with the configured timeout.
3. Saves `<label>` shortly after the timeout finishes.

Spark output still appears in console and `logs/latest.log`. SparkReviewer scans the log for `https://spark.lucko.me/...` URLs so the profile link and the runtime snapshot can be reviewed together.

Paper 26.2+ bundles Spark. Check it with:

```text
/sparkreviewer spark status
/sparkreviewer spark health
```

If Spark is missing or not responding, review `config/paper-global.yml`:

```yaml
spark:
  enabled: true
```

SparkReviewer includes Paper's bundled Spark settings in `/sparkreviewer configs` and flags `spark.enabled: false` as a critical finding.

## MFM Hopper-Control Test

Use this when a farm-heavy world drops TPS and MobFarmManager hopper control might be part of the fix or part of the bottleneck.

```text
# State A: MFM hopper control enabled
/sparkreviewer stress mfm-on 180

# Change exactly one thing: disable MFM hopper control, then reload/restart as that plugin requires.
# Keep player count, farms, locations, and test duration as similar as possible.
/sparkreviewer stress mfm-off 180

/sparkreviewer compare mfm-on mfm-off
/sparkreviewer logs
/sparkreviewer dump
```

Read the result like this:

- If MSPT improves and hopper/entity totals are similar, the changed MFM state probably helped.
- If entities/items explode when hopper control is enabled, the limit may be preventing collection and creating item piles.
- If hoppers are high either way and Spark points at tile ticking, Paper hopper settings or farm design may matter more than MFM.
- If Spark points at a plugin event or database call, avoid tuning spawn/hopper settings until that repeating hotspot is fixed.

## Offline Python Companion

The repo includes:

```text
scripts/spark_reviewer.py
scripts/run-spark-reviewer-workflow.sh
```

Run it against a copied server folder:

```text
scripts/spark_reviewer.py /path/to/PaperServer --label latest
```

Compare copied test runs:

```text
scripts/spark_reviewer.py --compare mfm-on=/path/to/server-mfm-on --compare mfm-off=/path/to/server-mfm-off
```

The script uses only the Python standard library. It scans `latest.log`, config files, Spark URLs, and SparkReviewer snapshot YAML files. It cannot count live entities by itself; use the plugin for live snapshots.

To run a one-label server workflow from the command line:

```text
scripts/run-spark-reviewer-workflow.sh servers/Paper-26.2 Paper-26.2.jar mfm-on 180
```

That helper starts the server with `java -jar ... nogui`, waits for startup, sends `/sparkreviewer stress <label> <seconds>` through console input, waits for the profile window, sends `/sparkreviewer dump`, stops the server, and writes an offline Markdown report. For an MFM comparison, run it once with hopper control enabled and once with hopper control disabled, then compare the two copied server folders or the plugin snapshots.

## Data And Cache

SparkReviewer writes reports and snapshots under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/sparkreviewer/
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/sparkreviewer/snapshots/
```

It does not write playerdata and does not edit Paper, CMI, or MobFarmManager config files.

## CMI / CMILib Usage

CMI and CMILib are required runtime dependencies because this plugin is part of the 1MB CMI-API feature set.

SparkReviewer uses CMI status in reports and optionally reads selected CMI YAML files for operational clues. It does not call closed-source CMI internals and does not change CMI state.

## Paper API Usage

SparkReviewer uses Paper/Bukkit APIs for loaded worlds, entities, chunks, tile entities, command dispatch, plugin metadata, scheduler tasks, and server runtime values exposed by Paper.

## Optional Hooks

- `spark` is optional because modern Paper can expose `/spark` even without a standalone plugin jar.
- `MobFarmManager` is optional. When present, SparkReviewer scans its config for farm/hopper clues.
- `PlaceholderAPI` is optional through the shared library.

## Security Notes

`/sparkreviewer spark ...` dispatches console Spark commands. Grant `onembcmi.sparkreviewer.spark` only to trusted admins.

Log snippets are sanitized before reports are shown or dumped. IP-like values and simple `password=`, `token=`, `secret=`, and `key=` patterns are redacted by the shared text helper.

[Plugin index](README.md)
