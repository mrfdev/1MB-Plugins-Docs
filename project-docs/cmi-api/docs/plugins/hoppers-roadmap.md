# Hoppers Roadmap

This page keeps Hoppers feature ideas out of chat history and gives future work a stable review list.

Hoppers is primarily a debug and analysis tool. New features should help staff find the real cause of hopper-related TPS drops faster, preserve evidence, and avoid blind config changes.

## Accepted Ideas

These ideas were approved for implementation. Entries marked `implemented` are already present in the current plugin; the remaining entries stay here as durable future work.

### HOP-A01: Spark Workflow Wrapper

Status: implemented as `/_hoppers spark`.

Add `/_hoppers spark` helpers for hopper-focused Spark profiling.

Possible commands:

```text
/_hoppers spark health
/_hoppers spark profile [seconds] [label]
/_hoppers spark spikes [mspt] [seconds] [label]
/_hoppers spark stop [label]
/_hoppers spark cancel
```

Purpose:

- make the right Spark command easier during a TPS drop
- label profiles with hopper context
- include Spark URLs in Hoppers dumps when found in `latest.log`

### HOP-A02: Toggleable Watch Mode

Status: implemented as `/_hoppers watch`.

Add a live watch mode for admins during an active drop, with easy toggle controls.

Possible commands:

```text
/_hoppers watch on
/_hoppers watch off
/_hoppers watch toggle
/_hoppers watch status
```

Possible settings:

```yaml
watch:
  enabled-by-default: false
  interval-seconds: 10
  only-when-tps-below-tenths: 195
```

Purpose:

- show short updates while staff are moving between hotspots
- keep it quiet unless intentionally enabled

### HOP-A03: Report Comparison

Status: implemented as `/_hoppers compare`.

Compare two saved Hoppers reports.

Possible command:

```text
/_hoppers compare <before> <after>
```

Purpose:

- compare before/after MFM, Paper, Spigot, or storage changes
- show deltas for TPS, MSPT, loaded hoppers, full hoppers, clogged hoppers, item drops, and top chunks

### HOP-A04: Player Impact Ranking With Scope

Status: implemented as `/_hoppers players`.

Rank player-adjacent hopper pressure with multiple scopes.

Possible commands:

```text
/_hoppers players global
/_hoppers players world <world>
/_hoppers players nearby <radius>
/_hoppers players chunk <world> <x> <z>
```

Purpose:

- identify which online players are near heavy hopper chunks
- support global, per-world, nearby, and exact-chunk views
- keep the output collaborative, not accusatory

### HOP-A05: Region Aggregation

Status: implemented.

Group findings by region file.

Possible command:

```text
/_hoppers regions [page]
```

Purpose:

- see whether multiple bad chunks are part of the same region/storage area
- help staff move through one region efficiently

### HOP-A06: World Filter

Status: implemented as `/_hoppers world <world>`.

Filter report pages by world.

Possible commands:

```text
/_hoppers world <world>
/_hoppers world <world> chunks
/_hoppers world <world> hoppers
/_hoppers world <world> recommend
```

Purpose:

- reduce noise when the drop is known to be in one world
- keep tabs permission-aware and world-name-safe

### HOP-A07: Exact Chunk Inspector

Status: implemented as `/_hoppers chunk <world> <x> <z>`.

Inspect one loaded chunk in detail.

Possible command:

```text
/_hoppers chunk <world> <x> <z>
```

Purpose:

- show hopper count, full/clogged outputs, item drops, tile entities, players, and CMI teleport command for one chunk
- avoid rerunning broad scans when staff already know the suspect chunk

### HOP-A08: Config Risk Score

Status: implemented as `/_hoppers risk`.

Add a single hopper config risk score with explanations.

Purpose:

- summarize Paper/Spigot/MFM risk into a simple score
- keep the reasons visible so it does not become mysterious

Example categories:

- `safe baseline`
- `watch`
- `copy-test`
- `risky`
- `urgent`

### HOP-A09: Sorter Safety Classification

Status: implemented for recommendation rows and dumps.

Classify every recommendation by sorter risk.

Possible labels:

- `safe`
- `copy-test`
- `risky`
- `do-not-live-test`

Purpose:

- keep auto sorter compatibility visible
- prevent accidental broad timing changes during panic debugging

### HOP-A10: Optional PyroFishingPro Awareness

Status: implemented in dependency health and item-despawn recommendations.

Detect PyroFishingPro when present, but start normally without it.

Purpose:

- warn harder against fish-material despawn rules when custom fishing rewards may use normal fish materials with metadata
- include plugin status in debug/dumps without requiring the plugin

### HOP-A11: MFM Preset Suggestions

Status: implemented as `/_hoppers mfm`.

Add named MobFarmManager HopperControl test presets.

Possible presets:

```yaml
gentle:
  Default: 8
  SlowestRate: 20
  AdjustEvery: 20
balanced:
  Default: 8
  SlowestRate: 30
  AdjustEvery: 20
strong:
  Default: 8
  SlowestRate: 40
  AdjustEvery: 30
```

Purpose:

- give staff consistent comparison profiles
- never apply changes automatically

### HOP-A12: Timestamped Report Notes

Status: implemented as `/_hoppers note`, `/_hoppers notes`, and `/_hoppers notes clear`.

Append manual notes to the latest report.

Possible commands:

```text
/_hoppers note <text>
/_hoppers notes
/_hoppers notes clear
```

Requirements:

- timestamp each note
- append to existing notes
- include notes in Markdown dumps
- sanitize text for logs, chat, and Markdown

### HOP-A13: Baseline Calibration

Status: implemented as `/_hoppers baseline`.

Suggest thresholds based on observed server baseline.

Possible commands:

```text
/_hoppers baseline start <minutes>
/_hoppers baseline stop
/_hoppers baseline status
/_hoppers baseline recommend
```

How it should work:

- collect repeated read-only scans during normal healthy play
- calculate median and high-percentile values for loaded hoppers, full hoppers, clogged hoppers, item drops, chunks, TPS, and MSPT
- suggest warning thresholds above the healthy baseline
- save `hoppers-baseline-latest.md` and timestamped baseline archives
- do not auto-write config unless a future explicit command is approved

Example explanation:

```text
Healthy baseline found 0 clogged hoppers most of the time and p95=2.
Suggested chunk-clogged-hoppers-warning: 3 because that is above normal noise.
```

### HOP-A14: Emergency Action Plan

Status: implemented as `/_hoppers emergency`.

Add a staff checklist page for active TPS drops.

Possible command:

```text
/_hoppers emergency
```

Purpose:

- show the commands to run in order
- show what to paste in Discord
- show when to Spark profile
- show when to teleport to a hopper, and when not to change config yet

### HOP-A15: TPS Triggered Auto-Sampler

Status: implemented as `/_hoppers trigger`.

Arm Hoppers to start a short tracking run automatically when TPS or MSPT crosses a configured threshold.

Possible command:

```text
/_hoppers trigger arm
/_hoppers trigger disarm
/_hoppers trigger status
```

The trigger performs cheap TPS/MSPT checks, respects a cooldown, and only starts the existing read-only tracking sampler.

### HOP-A16: Storage Chain Probe

Status: implemented as `/_hoppers chains`.

Inspect the immediate output chain from a suspicious hopper for a limited number of containers.

Goal:

- show whether the first chest/barrel chain is full
- stop at unloaded chunks, non-inventory blocks, or max depth
- remain read-only

### HOP-A17: Container Saturation Summary

Status: implemented as `/_hoppers containers`.

Count nearby containers around a hotspot and estimate how full the local storage area is.

Useful for fishing stations and farm storage rooms where the problem is not one hopper, but the storage area being full.

### HOP-A18: Item Material Histogram

Status: implemented as `/_hoppers materials`.

Show the most common item materials in suspicious hoppers and nearby item piles.

Purpose:

- separate fish/custom rewards, farm junk, cobble, cactus, bamboo, etc.
- make targeted despawn advice more evidence-based

Complexity note:

- reading inventories and nearby item stacks is more expensive than counting hoppers, so this should be limited to suspicious chunks, exact chunk inspections, or short tracking windows

### HOP-A19: Hopper Minecart Focus Page

Status: implemented as `/_hoppers minecarts`.

Add a page specifically for hopper minecarts near item piles and hopper chunks.

Purpose:

- catch minecart collectors that are part of farms or fishing systems
- distinguish block hoppers from hopper minecart collection systems

### HOP-A20: Redstone And Comparator Context

Status: implemented as `/_hoppers redstone`.

Scan a small radius around suspicious hoppers for comparator/repeater/observer/redstone patterns.

Purpose:

- warn staff when a hopper belongs to a sorter or clock
- raise sorter-risk labels for timing changes nearby

How it should work:

- only scan a small configurable radius around hoppers already marked suspicious
- count nearby comparators, repeaters, observers, redstone dust, redstone torches, droppers, dispensers, trapped chests, barrels, chests, and other hoppers
- detect common sorter hints such as comparator next to a container/hopper, redstone dust behind a comparator, repeaters leaving the comparator line, or dense repeated hopper/container patterns
- report context labels such as `likely sorter`, `possible clock`, `simple storage`, or `unknown`
- never tick, toggle, power, edit, or simulate redstone; this is read-only block inspection

### HOP-A21: Chunk Ticket Review

Status: implemented as `/_hoppers tickets`.

Report plugin chunk tickets and force-loaded chunks around hopper hotspots where Paper exposes the data.

Purpose:

- explain why hopper chunks are loaded without nearby players
- identify plugin-loaded storage or farm areas

### HOP-A22: Trend Classification

Status: implemented for `/_hoppers track` summaries.

Turn tracking deltas into plain labels.

Examples:

- `getting worse`
- `stable`
- `clearing`
- `storage still blocked`
- `items increasing while hoppers stay full`
- `not hopper-correlated`
- `mixed`

### HOP-A23: Latest Log Slice Attachment

Status: implemented in `/_hoppers dump` as a sanitized latest.log tail.

Include a sanitized `latest.log` time slice around a Hoppers scan or tracking run in the Markdown dump.

Purpose:

- keep Spark URLs, lag warnings, and plugin errors near the hopper report

### HOP-A24: Attach External Spark URL

Status: implemented as `/_hoppers attach spark <url> [note]`.

Allow staff to attach a Spark URL to the latest Hoppers report.

Possible command:

```text
/_hoppers attach spark <url> [note]
```

### HOP-A25: Config Drift Since Last Dump

Status: implemented as `/_hoppers drift` and in Markdown dumps.

Compare current hopper-related config values against the values captured in the previous dump.

Purpose:

- see whether Paper/Spigot/MFM changed between tests
- reduce confusion during month-long tuning

### HOP-A26: Hotspot History Cache

Status: implemented as `/_hoppers history` and repeat-hotspot dump output.

Keep a bounded history of top hopper chunks over time.

Purpose:

- show repeat offenders
- identify whether the same fishing/storage area appears across multiple incidents

### HOP-A27: Per-World Baseline Profiles

Status: implemented in `/_hoppers baseline recommend` and baseline Markdown reports.

Store separate healthy baselines per world.

Purpose:

- avoid comparing resource worlds, survival, Nether, and event worlds as if they should have the same hopper density

### HOP-A28: Safe Config Test Checklist Generator

Status: implemented as `/_hoppers checklist <id>`.

Generate a short checklist for a selected recommendation.

Example:

```text
/_hoppers checklist mfm-gentle
/_hoppers checklist disable-move-event
```

Purpose:

- list exact before/after commands
- list manual checks
- list rollback condition

### HOP-A29: Timestamped Report Archive

Status: implemented.

Keep timestamped Markdown report files alongside a latest report.

Requirements:

- every `/_hoppers dump` writes a uniquely timestamped report
- keep or update a stable latest report file for quick sharing
- append a short line to a report index so long-term testing can find older dumps
- use the archive for future compare and config-drift commands

### HOP-A30: Recommendation Test-Plan Links

Status: implemented.

Link recommendation rows to the durable testing plan and safe checklist IDs.

Purpose:

- when Hoppers says `try MFM gentle throttle`, point staff at the exact testing-plan scenario or generated checklist
- keep live advice aligned with the long-term documentation
- reduce "do this, test that" knowledge being trapped in chat history

### HOP-A31: Optional Dependency Health Matrix

Status: implemented as `/_hoppers deps` and dump/runtime metadata.

Show optional and required integration status in status, debug, and dumps.

Plugins to report:

- CMI
- CMILib
- 1MB-CMIAPI-LIB
- Spark
- MobFarmManager
- PyroFishingPro
- PlaceholderAPI

Purpose:

- make it clear when Hoppers can provide extra context
- keep the plugin startup safe when optional integrations are absent

### HOP-A32: No Hopper Evidence Outcome

Status: implemented.

Add an explicit "no hopper evidence found" path.

Purpose:

- if TPS/MSPT is bad but hoppers, storage clogs, and item piles do not explain it, say so plainly
- point staff to Spark and SparkReviewer instead of pretending Hoppers found the cause
- keep the goal focused on finding the real bottleneck, not blaming hoppers blindly

## Rejected Ideas

These were reviewed and rejected for now.

### HOP-R01: Report Redaction Setting

Rejected because staff need player names to coordinate with cooperative players during TPS investigations.

### HOP-R02: Staff Assignment Notes

Rejected because active hotspot investigations do not need assignment tracking inside the plugin right now.

### HOP-R03: Hopper Enforcement

Rejected because Hoppers should remain a passive analyzer and recommendation tool.

Do not use this plugin to cancel hopper transfers, disable hoppers per world, clear inventories, or apply Paper/Spigot/MobFarmManager config changes automatically. The goal is to help staff find and resolve the bottleneck without accidentally breaking the server.

[Hoppers documentation](hoppers.md)
