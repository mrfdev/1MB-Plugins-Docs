# Hoppers

## Purpose

Hoppers is a server-management feature plugin for live hopper triage during TPS drops.

It does not disable hoppers, move items, or change Paper/MobFarmManager settings. It gives staff a fast read-only view of loaded hopper pressure: dense hopper chunks, full hopper inventories, blocked outputs, item piles, nearby players, and exact `/cmi tppos` commands so the suspect storage or fishing setup can be inspected quickly.

## Features

- Scans currently loaded chunks for hopper block entities.
- Counts hoppers, full hoppers, blocked-output hoppers, tile entities, item entities, hopper minecarts, players, and chunk hotspots.
- Flags individual suspicious hoppers when the hopper is full or contains items while its output is blocked.
- Checks whether the hopper output block is loaded, is an inventory, and appears to have room for at least one item from the hopper.
- Shows nearby players around suspicious hoppers to help identify fishing/storage activity without guessing in vanish.
- Shows chunk coordinates, region file names, and ready-to-run `/cmi tppos <x> <y> <z> <world>` commands.
- Makes in-game teleport rows clickable and hoverable in hotspot pages such as chunks, regions, hoppers, chains, containers, minecarts, redstone, tickets, chunk inspection, and history.
- Reviews hopper-related paths in `spigot.yml`, legacy `paper.yml`, modern Paper global/world YAML files, and MobFarmManager YAML files.
- Reviews live `InventoryMoveItemEvent` listeners so staff can tell whether Paper's `disable-move-event` setting is a lower-risk copy-test or a plugin compatibility risk.
- Turns the researched guide takeaways into `/_hoppers recommend` rows with `looked for`, `found`, `recommend`, test-plan, and sorter-safety fields.
- Shows a compact `/_hoppers risk` summary so staff can see whether the evidence points at storage clogs, item piles, config risk, Spark profiling, or no hopper evidence.
- Groups hotspots by region file with `/_hoppers regions`.
- Filters report pages by world with `/_hoppers world <world>` and inspects one loaded chunk with `/_hoppers chunk <world> <x> <z>` without force-loading it.
- Ranks player-adjacent hopper pressure with `/_hoppers players`, using cooperative coordination wording rather than blame wording.
- Adds read-only deep-dive pages for retained hotspots: `/_hoppers chains`, `/_hoppers containers`, `/_hoppers materials`, `/_hoppers minecarts`, `/_hoppers redstone`, and `/_hoppers tickets`.
- Shows required and optional hook health with `/_hoppers deps`, including CMI, CMILib, 1MB-CMIAPI-LIB, Spark, MobFarmManager, PyroFishingPro, and PlaceholderAPI.
- Shows named MobFarmManager HopperControl copy-test presets with `/_hoppers mfm`, without applying changes.
- Provides hopper-focused Spark helper commands with log markers through `/_hoppers spark`.
- Provides `/_hoppers emergency` and `/_hoppers checklist <id>` so staff have a passive, repeatable TPS-drop workflow without changing server state.
- Provides `/_hoppers track` style repeated samples through `/_hoppers track [seconds]` so staff can watch the hotspot trend while TPS is dropping, including plain trend labels such as `getting worse`, `clearing`, `stable`, and `not hopper-correlated`.
- Provides `/_hoppers watch`, a toggleable staff-only live watch mode that only broadcasts short hopper snapshots when TPS/MSPT crosses the configured threshold.
- Provides `/_hoppers trigger`, an armed TPS/MSPT trigger that starts a passive tracking run automatically during an active drop.
- Provides `/_hoppers baseline`, a healthy-play calibration workflow that suggests Hoppers alert thresholds from median/p95 samples without writing config.
- Provides `/_hoppers compare`, a saved report delta view for before/after storage, MFM, Paper, or Spigot tests.
- Supports timestamped operator notes, external Spark URL attachments, config drift since the previous dump, sanitized `latest.log` slices, and repeat-hotspot history.
- Writes Discord-friendly Markdown reports with `yml` code blocks to the shared cache folder, including a latest report, timestamped archives, an append-only report index, notes, Spark links, config drift, log context, and hotspot history.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/_hoppers status
/_hoppers scan
/_hoppers findings [page]
/_hoppers recommend [page]
/_hoppers risk
/_hoppers chunks [page]
/_hoppers regions [page]
/_hoppers world <world> [summary|chunks|regions|hoppers|recommend|findings]
/_hoppers chunk <world> <x> <z>
/_hoppers players [global|world <world>|nearby <radius>|chunk <world> <x> <z>]
/_hoppers hoppers [page]
/_hoppers chains [page]
/_hoppers containers [page]
/_hoppers materials [page]
/_hoppers minecarts [page]
/_hoppers redstone [page]
/_hoppers tickets [page]
/_hoppers configs [page]
/_hoppers deps
/_hoppers mfm [presets|gentle|balanced|strong]
/_hoppers spark <status|health|profile|spikes|stop|cancel>
/_hoppers emergency
/_hoppers checklist <id>
/_hoppers track [seconds]
/_hoppers track status
/_hoppers track stop
/_hoppers watch <on|off|toggle|status>
/_hoppers trigger <arm|disarm|status>
/_hoppers baseline <start [minutes]|stop|status|recommend>
/_hoppers compare <before> <after> [page]
/_hoppers note <text>
/_hoppers notes [page|clear]
/_hoppers attach spark <url> [note]
/_hoppers drift [page]
/_hoppers history [page]
/_hoppers dump
/_hoppers reload
```

Useful examples:

```text
/_hoppers scan
/_hoppers findings
/_hoppers recommend
/_hoppers risk
/_hoppers chunks
/_hoppers regions
/_hoppers world general chunks
/_hoppers chunk general 12 -8
/_hoppers players global
/_hoppers hoppers
/_hoppers chains
/_hoppers containers
/_hoppers materials
/_hoppers minecarts
/_hoppers redstone
/_hoppers tickets
/_hoppers configs
/_hoppers deps
/_hoppers mfm presets
/_hoppers spark health
/_hoppers spark profile 300 hopper-drop
/_hoppers spark spikes 100 300 hopper-spikes
/_hoppers emergency
/_hoppers checklist mfm-gentle
/_hoppers track 60
/_hoppers watch on
/_hoppers trigger arm
/_hoppers baseline start 15
/_hoppers compare previous latest
/_hoppers note cleared west fishing storage and reran track
/_hoppers attach spark https://spark.lucko.me/example hopper-drop baseline
/_hoppers drift
/_hoppers history
/_hoppers dump
```

Global library examples:

```text
/1mbcmi debug plugin hoppers
/1mbcmi debug plugin hoppers commands
/1mbcmi debug plugin hoppers permissions
/1mbcmi debug plugin hoppers placeholders
/1mbcmi debug plugin hoppers config
/1mbcmi debug plugin hoppers all
/1mbcmi config hoppers
/1mbcmi config set hoppers scan.max-loaded-chunks-to-scan 12000
```

## Permissions

```text
onembcmi.hoppers.use
onembcmi.hoppers.scan
onembcmi.hoppers.track
onembcmi.hoppers.watch
onembcmi.hoppers.trigger
onembcmi.hoppers.baseline
onembcmi.hoppers.spark
onembcmi.hoppers.notes
onembcmi.hoppers.dump
onembcmi.hoppers.admin
onembcmi.hoppers.admin.reload
```

Normal players receive no Hoppers command access by default. `/_hoppers` itself is registered behind `onembcmi.hoppers.use`, and every subcommand is checked again in the plugin.

`use` controls status/help/info. `scan` controls live scans, report pages, world/chunk/player scopes, report comparison, risk/dependency views, MFM preset views, config drift, hotspot history, emergency guidance, and checklists. `track` controls repeated sampling. `watch` controls staff-only watch broadcasts. `trigger` controls the passive TPS/MSPT auto-sampler. `baseline` controls healthy-play calibration. `spark` dispatches Spark helper commands from console and writes Hoppers log markers. `notes` writes operator notes and Spark URL attachments into the Hoppers cache. `dump` writes cache reports. `admin` grants full Hoppers access and shared debug. `admin.reload` reloads config and translations.

Suggested grants:

```text
# Owner/full staff
onembcmi.hoppers.admin

# TPS-drop reviewers
onembcmi.hoppers.scan
onembcmi.hoppers.track
onembcmi.hoppers.watch
onembcmi.hoppers.trigger
onembcmi.hoppers.baseline
onembcmi.hoppers.notes

# Trusted profiler/export operators
onembcmi.hoppers.spark
onembcmi.hoppers.dump
```

The `scan`, `track`, `watch`, `trigger`, `baseline`, `spark`, `notes`, `dump`, `admin.reload`, and `admin` permissions include `use` as a child permission in `plugin.yml`, so staff do not need a separate `use` grant when the permissions plugin respects Bukkit permission children.

## Placeholders

```text
%onembcmi_hoppers.enabled%
%onembcmi_hoppers.last.reason%
%onembcmi_hoppers.last.tps.1m%
%onembcmi_hoppers.last.mspt.avg%
%onembcmi_hoppers.last.hoppers.total%
%onembcmi_hoppers.last.hoppers.full%
%onembcmi_hoppers.last.hoppers.clogged%
%onembcmi_hoppers.last.chunks.hotspots%
%onembcmi_hoppers.last.config.signals%
%onembcmi_hoppers.tracking.active%
%onembcmi_hoppers.watch.active%
%onembcmi_hoppers.trigger.armed%
%onembcmi_hoppers.baseline.active%
%onembcmi_hoppers.baseline.samples%
%onembcmi_hoppers.notes.count%
%onembcmi_hoppers.spark.attachments.count%
%onembcmi_hoppers.history.entries%
%onembcmi_hoppers.cache.size%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/Hoppers/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
scan.max-loaded-chunks-to-scan: 8000
scan.max-hotspots: 80
scan.max-suspicious-hoppers: 120
scan.storage-chain-max-depth: 8
scan.redstone-context-radius: 3
scan.material-histogram-limit: 40
scan.nearby-player-radius: 64
thresholds.tps-warning-tenths: 195
thresholds.tps-critical-tenths: 185
thresholds.mspt-warning: 40
thresholds.mspt-critical: 50
thresholds.chunk-hoppers-warning: 16
thresholds.chunk-full-hoppers-warning: 4
thresholds.chunk-clogged-hoppers-warning: 2
thresholds.chunk-item-drops-warning: 40
thresholds.world-hoppers-warning: 800
thresholds.world-clogged-hoppers-warning: 10
tracking.default-seconds: 60
tracking.max-seconds: 600
tracking.sample-interval-seconds: 10
spark.default-seconds: 300
spark.default-spike-mspt: 100
notes.max-entries: 200
config.include-mobfarmmanager: true
config.max-signals: 160
output.page-size: 8
dump.file: hoppers-report.md
dump.archive-enabled: true
dump.index-file: hoppers-report-index.md
dump.latest-log-lines: 80
history.enabled: true
history.max-entries: 500
history.top-chunks-per-report: 5
watch.enabled-by-default: false
watch.interval-seconds: 10
watch.only-when-tps-below-tenths: 195
trigger.check-interval-seconds: 10
trigger.track-seconds: 60
trigger.cooldown-seconds: 300
baseline.default-minutes: 10
baseline.max-minutes: 120
baseline.sample-interval-seconds: 30
```

`thresholds.tps-warning-tenths` and `thresholds.tps-critical-tenths` are TPS multiplied by 10. `195` means 19.5 TPS.

`scan.max-loaded-chunks-to-scan` protects production servers with many loaded chunks. Raise it during controlled lag hunts if the suspect chunk is not appearing.

`scan.nearby-player-radius` controls which player names are shown beside suspicious hopper rows.

`scan.storage-chain-max-depth` limits `/_hoppers chains`. The probe follows hopper outputs only while chunks are already loaded and stops at the first non-hopper inventory, blocked output, unloaded target, or max depth.

`scan.redstone-context-radius` controls the small redstone/comparator context scan around suspicious hoppers. It helps distinguish likely sorters from simple storage without trying to simulate the contraption.

`scan.material-histogram-limit` limits retained `/_hoppers materials` rows before paging.

`dump.file` is the stable latest Markdown filename. Existing older configs may still say `hoppers-report.txt`; the plugin now writes Markdown and adds `.md` when needed.

`dump.archive-enabled` writes a timestamped Markdown copy on every dump. `dump.index-file` is appended with the timestamped archive path so month-long testing can find old reports.

`dump.latest-log-lines` controls the sanitized `latest.log` tail included in dumps. Set it to `0` if a report should omit log context.

`history.enabled` records a bounded cache of top retained hopper chunks on each scan. This does not alter the world; it only helps staff see repeat hotspots across incidents.

`watch.only-when-tps-below-tenths` uses TPS multiplied by 10. `195` means watch mode only runs a full scan and sends staff messages when 1m TPS is below 19.5, or when average MSPT is above `thresholds.mspt-warning`. Set it to `0` if staff intentionally want every watch interval to capture.

`trigger.*` controls the armed auto-sampler. The trigger checks TPS/MSPT, respects `trigger.cooldown-seconds`, and only starts `/_hoppers track <trigger.track-seconds>`.

`baseline.*` controls healthy-play calibration. Baseline reports are written to the Hoppers cache as `hoppers-baseline-latest.md` and timestamped archives.

## Triage Workflow

When TPS starts dropping:

```text
/_hoppers scan
/_hoppers findings
/_hoppers recommend
/_hoppers risk
/_hoppers chunks
/_hoppers players global
/_hoppers hoppers
/_hoppers spark health
```

Start with the top `/_hoppers recommend` row. It says what Hoppers checked, what it found, and what to try next. If it points at a clogged hopper or chunk, click the shown `/cmi tppos ...` command in game, inspect the storage chain, and clear the full output inventory first.

Use `/_hoppers risk` for the short version during a panic. It summarizes the latest TPS/MSPT, whether Hoppers found hopper evidence, the top recommendation, and the safest sorter-aware next action.

For intermittent drops:

```text
/_hoppers track 60
/_hoppers chunks
/_hoppers hoppers
/_hoppers chains
/_hoppers containers
/_hoppers spark spikes 100 300 hopper-spikes
```

Tracking samples the same read-only scan repeatedly and reports whether TPS, full hoppers, clogged hoppers, and hotspot chunks got worse over the window. The final summary includes a trend label: `storage still blocked`, `getting worse`, `clearing`, `stable`, `not hopper-correlated`, or `mixed`.

For live staff monitoring during an active drop:

```text
/_hoppers watch on
/_hoppers watch status
/_hoppers trigger arm
/_hoppers trigger status
```

Watch mode performs a cheap TPS/MSPT check first. It only captures a full loaded-chunk scan and broadcasts to staff with `onembcmi.hoppers.watch` when the configured threshold is crossed. Trigger mode checks TPS/MSPT on an interval and starts a normal `/_hoppers track` run when the threshold is crossed and the cooldown has passed.

For monthly tuning and before/after evidence:

```text
/_hoppers baseline start 15
/_hoppers baseline recommend
/_hoppers dump
/_hoppers compare previous latest
```

Baseline calibration is for healthy-play periods. It collects repeated read-only scans, shows median/p95-derived candidate thresholds for Hoppers alerting, writes `hoppers-baseline-latest.md`, and includes separate per-world profiles. Compare reads the append-only dump index and compares summary deltas for TPS, MSPT, total hoppers, full hoppers, clogged hoppers, and item drops.

When a world or chunk is already suspected:

```text
/_hoppers world <world> chunks
/_hoppers chunk <world> <x> <z>
/_hoppers players chunk <world> <x> <z>
```

World filters use the latest report. The exact chunk inspector only reads the chunk if it is already loaded; Hoppers will not force-load it.

For hotspot deep dives:

```text
/_hoppers chains
/_hoppers containers
/_hoppers materials
/_hoppers minecarts
/_hoppers redstone
/_hoppers tickets
```

`chains` follows suspicious hopper outputs for a bounded number of already-loaded steps. `containers` summarizes inventory saturation in retained hotspot chunks. `materials` counts item types in retained suspicious hoppers and item piles in hotspot chunks. `minecarts` lists loaded hopper minecarts. `redstone` classifies nearby comparator/redstone context around suspicious hoppers. `tickets` shows whether hotspot chunks are force-loaded or have plugin chunk tickets.

For a support handoff or Discord paste:

```text
/_hoppers note Checked west fishing station before clearing storage
/_hoppers attach spark <spark-url> active hopper drop
/_hoppers dump
```

The dump is a Markdown report with `yml` code blocks for summary data, plugin dependency health, recommendations, top chunks, storage chain probes, container saturation, material histograms, hopper minecarts, redstone context, chunk tickets, region groups, player-adjacent pressure, suspicious hoppers, config signals, config drift since the previous dump, repeat hotspot history, attached Spark URLs, notes, sanitized `latest.log` context, MFM presets, and safe copy-test snippets.

## Recommendations

`/_hoppers recommend` turns the optimization research into operational checks.

Each row contains:

- `looked for`: the signal being tested
- `found`: the server-specific evidence from the latest scan
- `recommend`: the next safe action or copy-test
- `test plan`: the durable test-plan scenario or checklist ID to use
- `sorter safety`: whether the advice is safe, copy-test-only, risky, or not suitable for live testing
- optional `yml`: a config snippet included in the Markdown dump

The recommendation layer intentionally prefers this order:

1. physical storage clogs before config tuning
2. Spark profiling while the drop is active
3. Paper hopper safety flags
4. Spigot hopper timings
5. MobFarmManager throttle comparisons
6. item pile handling
7. simulation-distance copy-tests when many hopper chunks are active
8. a clear "no hopper evidence" outcome when TPS/MSPT is bad but loaded hoppers do not explain it

The plugin does not apply any of these changes. It gives staff valid data to compare against while testing one change at a time.

## Scope Commands

`/_hoppers world <world>` filters the latest report to one world.

```text
/_hoppers world general
/_hoppers world general chunks
/_hoppers world general regions
/_hoppers world general hoppers
/_hoppers world general recommend
```

`/_hoppers chunk <world> <x> <z>` performs a fresh read-only inspection of one loaded chunk. It reports hopper counts, full/clogged outputs, item drops, hopper minecarts, tile entities, players, suspicious hopper rows, and a CMI teleport command. If the chunk is not loaded, the command says so and stops.

`/_hoppers players` ranks player-adjacent pressure for coordination:

```text
/_hoppers players global
/_hoppers players world general
/_hoppers players nearby 64
/_hoppers players chunk general 12 -8
```

The output is meant to help staff ask cooperative players about their storage or fishing setup. It is not proof of fault by itself.

## MFM Presets

`/_hoppers mfm presets` shows named MobFarmManager HopperControl copy-test profiles:

```yaml
gentle:
  Enabled: true
  Default: 8
  SlowestRate: 20
  AdjustEvery: 20
balanced:
  Enabled: true
  Default: 8
  SlowestRate: 30
  AdjustEvery: 20
strong:
  Enabled: true
  Default: 8
  SlowestRate: 40
  AdjustEvery: 30
```

Hoppers does not edit MFM. Use these as consistent comparison labels while capturing Spark and Hoppers before/after evidence.

## Spark Workflow

`/_hoppers spark` wraps the Spark commands that are useful during hopper triage:

```text
/_hoppers spark health
/_hoppers spark profile 300 hopper-drop
/_hoppers spark spikes 100 300 hopper-spikes
/_hoppers spark stop hopper-drop
/_hoppers spark cancel
```

The command dispatches Spark from console and writes a Hoppers marker to `latest.log` so the profile URL can be matched to the hopper incident. It does not replace SparkReviewer. Use SparkReviewer when you want broader runtime snapshots, saved labels, and before/after comparison.

After Spark prints a URL, attach it to the latest Hoppers report:

```text
/_hoppers attach spark https://spark.lucko.me/example active hopper drop
```

Attached Spark URLs appear in `/_hoppers dump` and are retained as a bounded cache using `notes.max-entries`.

## Evidence Cache

Hoppers keeps a small passive evidence cache under the shared cache folder.

```text
/_hoppers note cleared west fishing storage before rerun
/_hoppers notes
/_hoppers notes clear
/_hoppers attach spark <url> [note]
/_hoppers drift
/_hoppers history
```

Notes are timestamped, sanitized, and appended to the report. `/_hoppers drift` compares the current hopper-related config signals against the config snapshot saved by the previous `/_hoppers dump`. `/_hoppers history` groups the bounded top-chunk history so repeat hotspot chunks stand out across multiple incidents.

## Config Review

`/_hoppers configs` scans:

- `server.properties`
- `spigot.yml`
- legacy `paper.yml`
- `config/paper-global.yml`
- `config/paper-world-defaults.yml`
- `config/paper-worlds/<world>/paper-world.yml`
- legacy `<world>/paper-world.yml`
- MobFarmManager YAML files under `plugins/MobFarmManager/`

Recommendations are intentionally conservative. Hoppers warns about very fast hopper timings, enabled hopper move events, and MobFarmManager hopper-control clues, but it does not apply changes. Test Paper or MFM changes on a copy first and avoid large timing jumps that break auto sorters.

Longer operational notes live in [Hopper Testing Plan](../hopper-testing-plan.md) and [Hopper Settings Guide](../hopper-settings-guide.md).

Accepted, implemented, and rejected feature ideas live in [Hoppers Roadmap](hoppers-roadmap.md).

### Runtime Event Listener Review

`/_hoppers configs` also checks the live Bukkit handler list for `InventoryMoveItemEvent`.

The runtime source appears as:

```text
runtime:InventoryMoveItemEvent
```

When no enabled plugin listeners are registered, `hopper.disable-move-event: true` becomes a lower-risk copy-test if Spark shows hopper event overhead. When listeners exist, Hoppers lists the plugin, listener class, event priority, and `ignoreCancelled` state. Treat that as a compatibility warning: those plugins may use hopper moves for protection, logging, MobFarmManager behavior, storage rules, or custom mechanics.

### Paper World Hopper Settings

Modern Paper stores hopper behavior in world configuration, usually `config/paper-world-defaults.yml` unless a world overrides it in `paper-world.yml`:

```yaml
hopper:
  cooldown-when-full: true
  disable-move-event: false
  ignore-occluding-blocks: false
```

Hoppers treats these paths specially in `/_hoppers configs`.

- `cooldown-when-full: true` is the safe value for full storage systems. Keep it enabled so full hoppers briefly cool down instead of constantly trying to pull more items.
- `disable-move-event: false` is the safest compatibility value because protection, logging, or utility plugins may listen for hopper `InventoryMoveItemEvent` calls.
- `ignore-occluding-blocks: false` is the safest compatibility value for unusual setups with containers or hopper minecarts inside occluding blocks.

Sorter-friendly tuning should usually keep `cooldown-when-full: true`. If Spark shows hopper `InventoryMoveItemEvent` overhead during a real drop, test `disable-move-event: true` on a copy and verify protection, logging, MobFarmManager, and sorter behavior before using it live. If the server does not support occluding-block hopper tricks, test `ignore-occluding-blocks: true` for hopper insert-check performance.

### Spigot Hopper Settings

The relevant `spigot.yml` keys on the 1MB test server look like this:

```yaml
ticks-per:
  hopper-transfer: 8
  hopper-check: 1
hopper-amount: 1
hopper-can-load-chunks: false
```

Hoppers treats these paths specially in `/_hoppers configs`.

- `hopper-transfer: 8` is vanilla transfer timing. Keep this at `8` when auto sorters matter.
- `hopper-check: 1` checks every tick. This is sorter-responsive but can be expensive under heavy hopper load.
- `hopper-amount: 1` moves one item per transfer. Keep this at `1` for sorter compatibility.
- `hopper-can-load-chunks: false` is the safe value. Hoppers should not keep chunks loaded by themselves.

Sorter-friendly tuning should usually leave `hopper-transfer: 8` and `hopper-amount: 1` alone. If Spark and `/_hoppers track` both point at hopper ticking, test `hopper-check: 2` or `hopper-check: 4` on a copy before trying larger values. For production, prefer MFM dynamic throttling first because it can leave normal hoppers vanilla and slow only intensive hoppers.

### MobFarmManager HopperControl

For the observed 1MB setup:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 40
  AdjustEvery: 30
```

Hoppers treats these paths specially in `/_hoppers configs`.

- `Enabled: true` means MFM can dynamically slow intensive hoppers.
- `Default: 8` keeps normal hopper timing at vanilla speed. This is the safest value for auto sorters.
- `SlowestRate: 40` means a heavily used hopper can be slowed to one item every two seconds.
- `AdjustEvery: 30` means MFM reevaluates after every 30 item transfers.

Sorter-friendly tuning should usually keep `Default: 8` and test only the dynamic values:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 20
  AdjustEvery: 20
```

That keeps normal hoppers vanilla, lets MFM react sooner, and caps the slowdown at one item per second. If TPS still drops and Spark/Hoppers point at hopper ticking, test `SlowestRate: 30` next. Treat `SlowestRate: 40` as a stronger safety net, not the first sorter-friendly tuning point.

If `/_hoppers hoppers` shows full hoppers with blocked output, MFM tuning will not empty them. That means the storage/output chain is full or blocked, and staff should use the shown `/cmi tppos` command to clear or expand the physical storage first.

## Data And Cache

Hoppers writes reports under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/hoppers/
```

It does not write playerdata. It stores only operational evidence in cache: the latest in-memory report, the latest Markdown dump, optional timestamped Markdown archives, the append-only report index, notes, Spark URL attachments, config drift snapshots, sanitized log slices inside dumps, and bounded top-chunk hotspot history.

## CMI / CMILib Usage

CMI:

- Output includes exact `/cmi tppos <x> <y> <z> <world>` commands for the hottest chunks and suspicious hopper blocks; in-game rows can be clicked to run the teleport command.
- CMI and CMILib hook status is shown in `/_hoppers status` and debug metadata.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.

Paper:

- Uses modern Paper/Bukkit APIs for loaded worlds, chunks, block states, hopper inventories, entities, command registration, scheduler sampling, YAML parsing, and Adventure output.
- Runtime scans only inspect loaded chunks. Hoppers does not force-load offline chunks.

MobFarmManager:

- MobFarmManager is an optional hook. When its plugin folder exists, Hoppers scans YAML files for hopper-control paths and includes enabled/disabled clues in config findings.

PyroFishingPro:

- PyroFishingPro is an optional hook. Hoppers only reports whether it is present. When present, recommendations are more cautious about fish-material despawn ideas because custom fishing rewards may use normal fish materials with metadata.

PlaceholderAPI:

- PlaceholderAPI is optional. Hoppers exposes placeholders through the shared library when PlaceholderAPI is present, and reports the hook status in `/_hoppers deps` and dumps.

Spark:

- Spark remains the source of truth for CPU profiling. Use Spark, `/_hoppers spark`, or SparkReviewer alongside Hoppers if TPS is dropping but no loaded hopper clog pattern appears.

## Security Notes

- Hoppers is passive and does not change hopper behavior. It does not disable hoppers, cancel hopper transfers, clear inventories, edit server config files, or apply Paper/Spigot/MobFarmManager settings. Watch, trigger, baseline, compare, and track only read state and write staff-facing evidence. The only external command dispatch it performs is explicit staff-triggered Spark profiling through `/_hoppers spark`.
- Dump output is Markdown in the shared cache folder with Discord-friendly `yml` code blocks.
- Player names shown in nearby-player output come from currently online players near the suspicious hopper location.
- All config/log-like output is sanitized or abbreviated before display.

[Plugin index](README.md)
