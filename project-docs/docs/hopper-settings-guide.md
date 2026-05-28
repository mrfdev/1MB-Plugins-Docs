# Hopper Settings Guide

This page explains hopper-related settings in practical terms for 1MB staff. Use it with [Hopper Testing Plan](hopper-testing-plan.md), Hoppers, SparkReviewer, and Spark profiles.

## Core Hopper Behavior

A normal hopper has five storage slots. A hopper can:

- pull items from the inventory or item entity above it
- push items into the inventory it faces
- hold items when its output cannot accept them

The two most important timings are:

- `hopper-transfer`: how often a hopper moves items
- `hopper-check`: how often a hopper checks for items above it

Minecraft runs at 20 ticks per second when healthy. So:

```text
20 ticks = 1 second
1200 ticks = 1 minute
```

## Transfer Rate Math

With:

```yaml
hopper-transfer: 8
hopper-amount: 1
```

One hopper can move at most one item every 8 ticks.

Approximate maximum throughput:

```text
20 / 8 = 2.5 items per second
2.5 * 60 = 150 items per minute
150 * 60 = 9000 items per hour
```

If `hopper-transfer` is changed:

```text
hopper-transfer: 8  -> 150 items/minute
hopper-transfer: 10 -> 120 items/minute
hopper-transfer: 20 -> 60 items/minute
hopper-transfer: 40 -> 30 items/minute
```

This is why raising `hopper-transfer` can protect TPS but can also break item sorters or make storage feel stuck.

## Hopper Check Math

With:

```yaml
hopper-check: 1
```

A hopper checks every tick for items or inventories above it.

Approximate check frequency per hopper:

```text
hopper-check: 1 -> 20 checks/second
hopper-check: 2 -> 10 checks/second
hopper-check: 4 -> 5 checks/second
hopper-check: 8 -> 2.5 checks/second
```

`hopper-check` affects pickup/pull responsiveness. Raising it can reduce repeated checks, but water-stream sorters and fast collectors may behave differently.

## Spigot Hopper Settings

```yaml
ticks-per:
  hopper-transfer: 8
  hopper-check: 1
hopper-amount: 1
hopper-can-load-chunks: false
```

`hopper-transfer`

- controls delay between item movements
- default/vanilla-like value is `8`
- keep at `8` when sorters matter

`hopper-check`

- controls delay between pull checks
- Paper default is `1`
- test `2` or `4` only if Spark proves hopper checking is hot

`hopper-amount`

- controls how many items can move per transfer
- keep at `1` for sorter compatibility

`hopper-can-load-chunks`

- controls whether hoppers can keep/load chunks
- keep `false`

## Paper World Hopper Settings

Modern Paper stores hopper behavior under world configuration:

```yaml
hopper:
  cooldown-when-full: true
  disable-move-event: false
  ignore-occluding-blocks: false
```

These live in:

```text
config/paper-world-defaults.yml
<world>/paper-world.yml
config/paper-worlds/<world>/paper-world.yml
```

`cooldown-when-full`

- when `true`, full hoppers briefly cool down instead of constantly trying to pull more items
- useful for clogged storage systems
- should normally stay `true`

`disable-move-event`

- when `false`, hoppers fire `InventoryMoveItemEvent`
- when `true`, Paper skips that event for hoppers
- can dramatically reduce hopper event overhead
- can break protection, logging, storage, or farm-control plugins

`ignore-occluding-blocks`

- when `true`, hoppers ignore containers inside full/occluding blocks
- can improve insert-check performance
- can break contraptions using hopper minecarts or containers inside blocks such as sand/gravel

## InventoryMoveItemEvent

`InventoryMoveItemEvent` is fired when a block or entity, such as a hopper, tries to move an item directly from one inventory to another.

Plugins can use it to:

- cancel a hopper transfer
- log hopper movement
- block hopper theft
- enforce storage rules
- modify the item being moved
- manage farms

This is why `disable-move-event: true` is powerful but risky.

Hoppers reports registered listeners in:

```text
/_hoppers configs
```

Look for:

```text
runtime:InventoryMoveItemEvent
```

If listeners exist, treat `disable-move-event: true` as risky until each plugin is checked.

## MobFarmManager HopperControl

The observed MFM config:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 40
  AdjustEvery: 30
```

Meaning:

`Enabled`

- turns MFM dynamic hopper throttling on or off

`Default`

- the normal hopper transfer rate before throttling
- keep `8` for vanilla-like behavior

`SlowestRate`

- the slowest MFM may make an intensive hopper
- `20` means one item per second
- `40` means one item every two seconds

`AdjustEvery`

- how often MFM reevaluates a hopper based on actual transfers
- lower values react sooner but may shift behavior more often

Throughput examples:

```text
Default: 8      -> 150 items/minute while normal
SlowestRate: 20 -> 60 items/minute when throttled
SlowestRate: 30 -> 40 items/minute when throttled
SlowestRate: 40 -> 30 items/minute when throttled
```

The safest pattern is to keep `Default: 8` and test dynamic values, so normal sorters stay vanilla-like.

## Clogged Hoppers

A hopper is suspicious when:

- it is full
- it has items but cannot push to the output
- its output block is unloaded
- its output is not an inventory
- its output inventory has no room for any item in the hopper

If a hopper is full and blocked, config tuning cannot empty it. Staff need to inspect the storage chain and clear or expand the output path.

## Item Piles

Item entities can make hopper lag worse:

- full hoppers stop collecting
- fishing/farm outputs pile up
- item entities continue ticking
- nearby hoppers keep checking and failing

Config tools:

- `merge-radius.item` can reduce item entity count
- `alt-item-despawn-rate` can despawn selected junk materials faster

Do not use broad fish despawn rules while PyroFishingPro or custom reward plugins may use normal fish materials with custom metadata.

## Spark And MSPT

TPS is the result. MSPT is the cost.

```text
20 TPS requires each tick to stay below 50 MSPT
40 MSPT is warning territory
50+ MSPT means the server cannot sustain 20 TPS
```

Paper includes Spark. Useful commands:

```text
spark health
spark profiler start --timeout 300
spark profiler start --only-ticks-over 100 --timeout 300
spark profiler stop
```

SparkReviewer wraps this with:

```text
/sparkreviewer spark health
/sparkreviewer spark start 300 hopper-test
/sparkreviewer stress hopper-test 300
/sparkreviewer logs
/sparkreviewer dump
```

Hoppers also has hopper-focused shortcuts:

```text
/_hoppers spark health
/_hoppers spark profile 300 hopper-drop
/_hoppers spark spikes 100 300 hopper-spikes
/_hoppers attach spark <spark-url> active hopper drop
```

Use Spark to identify whether the bottleneck is hopper ticking, plugin events, item entities, chunk loading, redstone, entities, or something else.

## Reading Hoppers Output

`/_hoppers chunks`

- use this to find the hottest loaded chunks
- start with chunks that have clogged hoppers, many full hoppers, and item piles

`/_hoppers recommend`

- use this after a scan to get checked/found/recommend rows
- use it before tuning so physical clogs, Spark profiling, Paper settings, Spigot timing, MFM throttle, item piles, and simulation distance are considered in order
- read the test-plan and sorter-safety fields before changing anything

`/_hoppers risk`

- use this during an active drop when there is no time for a full page-by-page review
- check whether Hoppers found hopper evidence or is pointing staff toward Spark/SparkReviewer instead

`/_hoppers regions`

- use this when several hot chunks may belong to the same storage area or region file
- move through one region at a time instead of chasing isolated rows blindly

`/_hoppers world <world>`

- use this when staff already know the affected world
- filter chunks, regions, hoppers, findings, and recommendations without changing the saved scan

`/_hoppers chunk <world> <x> <z>`

- use this when Spark, Hoppers, or a player report points at an exact loaded chunk
- it reads that chunk only if it is already loaded; it does not force-load offline chunks

`/_hoppers players`

- use this to see which online players are near retained hopper pressure
- treat this as coordination data, not blame; ask players about active fishing/storage setups and work with them

`/_hoppers hoppers`

- use this to teleport directly to suspicious hopper blocks
- inspect the storage output before tuning config

`/_hoppers configs`

- use this to review Paper, Spigot, MFM, Spark-adjacent clues, and `InventoryMoveItemEvent` listeners

`/_hoppers deps`

- use this to confirm required and optional hook health
- missing MobFarmManager, PyroFishingPro, PlaceholderAPI, or Spark should not stop Hoppers from starting, but it changes how much context Hoppers can provide

`/_hoppers mfm`

- use this to view named MFM HopperControl copy-test presets
- Hoppers never applies the presets; staff still edit MFM manually after deciding on a measured test

`/_hoppers spark`

- use this when Hoppers says Spark evidence is needed during an active drop
- it dispatches Spark profiling commands and writes Hoppers markers to `latest.log`
- attach the resulting Spark URL with `/_hoppers attach spark <url> [note]`

`/_hoppers emergency`

- use this as the passive TPS-drop checklist
- it keeps staff focused on measuring, teleporting to evidence, Spark profiling, and exporting a report before config changes

`/_hoppers checklist <id>`

- use this for a short safe-testing checklist tied to a recommendation
- current IDs include `storage`, `spark`, `mfm-gentle`, `disable-move-event`, `ignore-occluding`, `hopper-check`, `items`, and `simulation`

`/_hoppers track 60`

- use this during an active TPS drop
- watch whether full/clogged hoppers and MSPT rise together
- read the trend label at the end: `storage still blocked`, `getting worse`, `clearing`, `stable`, `not hopper-correlated`, or `mixed`

`/_hoppers note`, `/_hoppers drift`, and `/_hoppers history`

- use notes to keep staff observations beside the report instead of in chat history
- use drift after a config test to see which hopper-related values changed since the previous dump
- use history to find repeat hopper chunks across multiple scans or incidents

`/_hoppers dump`

- writes a latest Markdown report and, when enabled, a timestamped archive plus report index to the Hoppers cache folder
- includes Discord-friendly `yml` code blocks for summary, recommendations, top chunks, region groups, player-adjacent pressure, suspicious hoppers, config signals, config drift, repeat hotspot history, attached Spark URLs, notes, sanitized latest.log context, and MFM presets

## Practical Defaults For 1MB

Keep unless measured evidence says otherwise:

```yaml
ticks-per:
  hopper-transfer: 8
  hopper-check: 1
hopper-amount: 1
hopper-can-load-chunks: false
```

Keep:

```yaml
hopper:
  cooldown-when-full: true
  disable-move-event: false
  ignore-occluding-blocks: false
```

Good first MFM copy-test:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 20
  AdjustEvery: 20
```

Riskier copy-tests:

```yaml
hopper:
  disable-move-event: true
  ignore-occluding-blocks: true
```

Only try those after reading `/_hoppers configs` and checking Spark.
