# Hopper Testing Plan

This page captures hopper-performance experiments that should be tested slowly on the real server or a close copy. Do not rely on old chat history for this workflow; use this file as the durable testing notebook.

The goal is not to find one magic setting. The goal is to measure the same type of lag event, change one thing, and compare Spark, Hoppers, and player-visible behavior.

## Baseline Capture

Run this before changing anything:

```text
/_hoppers scan
/_hoppers findings
/_hoppers recommend
/_hoppers risk
/_hoppers chunks
/_hoppers regions
/_hoppers players global
/_hoppers hoppers
/_hoppers configs
/_hoppers deps
/_hoppers mfm presets
/_hoppers emergency
/_hoppers spark health
/_hoppers spark profile 180 hopper-baseline
/sparkreviewer spark health
/sparkreviewer stress hopper-baseline 180
/sparkreviewer logs
/_hoppers attach spark <spark-url> hopper-baseline
/_hoppers note Baseline captured before hopper config changes
/_hoppers dump
/_hoppers drift
/_hoppers history
/sparkreviewer dump
```

Save the Spark URL from console or `logs/latest.log`. Note:

- date and time
- online player count
- affected world
- TPS/MSPT before and during the drop
- top Hoppers chunk
- top Hoppers region
- top player-adjacent pressure row, if any
- top suspicious hopper
- whether item drops, full hoppers, or blocked outputs are increasing
- whether Spark shows tile ticking, hopper ticking, plugin event listeners, item entities, or something else
- top `/_hoppers recommend` row and whether it points to storage, Spark, Paper, Spigot, MFM, item piles, or simulation distance
- `/_hoppers risk` category and sorter-safety label
- dependency health from `/_hoppers deps`
- MFM current values and selected preset label from `/_hoppers mfm presets`, if MFM is part of the test
- tracking trend label from `/_hoppers track`
- attached Spark URL from `/_hoppers attach spark`
- any operator notes added with `/_hoppers note`
- config drift from `/_hoppers drift` after the next dump
- repeat hotspot status from `/_hoppers history`
- the timestamped `/_hoppers dump` archive filename

## Test Rules

- Change one thing at a time.
- Prefer a copied server folder first.
- Keep player count, test duration, loaded locations, and AFK/fishing setup as similar as possible.
- Do not test global hopper timing changes during peak hours.
- Do not use broad item-clear plugins as the first fix.
- Restart when Paper, Spigot, or plugin docs require it. Avoid `/reload`.
- Record the before and after Spark URLs.
- Roll back if sorters, protection, logging, fishing rewards, or storage behavior changes unexpectedly.

## Scenario A: Clear Physical Storage First

Use when `/_hoppers hoppers` shows full hoppers with blocked outputs.

Test:

```text
/_hoppers hoppers
/_hoppers checklist storage
# teleport to the first exact row
/cmi tppos <x> <y> <z> <world>
/_hoppers chunk <world> <chunkX> <chunkZ>
/_hoppers players chunk <world> <chunkX> <chunkZ>
```

Action:

- inspect the output chest/storage chain
- clear full inventories
- expand storage if the chain is too small
- rerun `/_hoppers track 60`

Expected result:

- clogged hopper count drops
- full hopper count drops
- item pile count stops climbing
- TPS/MSPT improves without config changes

If this works, config tuning is not the first fix. The storage system is physically saturated.

## Scenario B: MobFarmManager Gentle Dynamic Throttle

Use when Spark/Hoppers point at many active hoppers, but normal sorters should stay close to vanilla.

Keep:

```yaml
HopperControl:
  Enabled: true
  Default: 8
```

Test candidate:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 20
  AdjustEvery: 20
```

Compare against the current production state with:

```text
/sparkreviewer stress mfm-current 180
/_hoppers checklist mfm-gentle
/_hoppers mfm gentle
# change only MFM HopperControl values and reload/restart as required by MFM
/sparkreviewer stress mfm-20-20 180
/sparkreviewer compare mfm-current mfm-20-20
/_hoppers track 60
```

Expected result:

- normal hoppers remain vanilla at `Default: 8`
- intensive hoppers throttle sooner
- item piles do not explode
- sorters still behave

Next candidate if TPS still drops:

```yaml
HopperControl:
  Enabled: true
  Default: 8
  SlowestRate: 30
  AdjustEvery: 20
```

Treat `SlowestRate: 40` as a stronger safety net, not the first sorter-friendly target.

## Scenario C: Paper Full-Hopper Cooldown

Use when config review shows this disabled.

Recommended value:

```yaml
hopper:
  cooldown-when-full: true
```

Expected result:

- full hoppers briefly cool down instead of constantly trying to pull more items
- clogged storage systems become less expensive while still visibly clogged

This should stay enabled unless a future Paper regression proves otherwise.

## Scenario D: Hopper Move Event Disable

Use only after checking event listeners.

Run:

```text
/_hoppers configs
/_hoppers checklist disable-move-event
```

Look for:

```text
runtime:InventoryMoveItemEvent
```

If Hoppers reports no listeners, this is a lower-risk copy-test:

```yaml
hopper:
  disable-move-event: true
```

If Hoppers reports listeners, this is risky. The listed plugins may use hopper movement for protection, logging, storage rules, farm control, or custom mechanics.

Test workflow:

```text
/sparkreviewer stress move-event-false 180
# set disable-move-event: true on a copy, restart
/sparkreviewer stress move-event-true 180
/sparkreviewer compare move-event-false move-event-true
/_hoppers configs
```

Manual checks:

- hopper transfer still works
- protection plugins still block unwanted hopper access
- logging/audit plugins still record what you expect, or you accept that they no longer see hopper movement
- MobFarmManager behavior is still acceptable
- item sorters still behave

Only consider live use if the Spark improvement is clear and the plugin behavior is acceptable.

## Scenario E: Ignore Occluding Blocks

Use if the server does not support contraptions that depend on containers or hopper minecarts inside full blocks.

Candidate:

```yaml
hopper:
  ignore-occluding-blocks: true
```

Expected result:

- hoppers skip some expensive insert checks involving occluding blocks

Risk:

- setups using hopper minecarts inside sand/gravel/full blocks may stop working

Manual checks:

- fishing collectors
- common item sorters
- hopper minecart collectors
- any public farm designs that use containers inside blocks

## Scenario F: Spigot Hopper Check

Use only if Spark and Hoppers point specifically at hopper checking, not just clogged storage.

Current safe baseline:

```yaml
ticks-per:
  hopper-transfer: 8
  hopper-check: 1
hopper-amount: 1
hopper-can-load-chunks: false
```

Copy-test sequence:

```yaml
ticks-per:
  hopper-check: 2
```

Then, only if needed:

```yaml
ticks-per:
  hopper-check: 4
```

Avoid jumping straight to `8` on live. Higher values can affect water-stream sorters and collection timing.

Do not change these unless there is a measured reason:

```yaml
hopper-transfer: 8
hopper-amount: 1
hopper-can-load-chunks: false
```

## Scenario G: Merge Radius

Use when Hoppers shows item pile pressure near hopper chunks.

Review:

```text
/_hoppers chunks
/_hoppers configs
/_hoppers checklist items
```

Candidate tests should be conservative. Large merge radius values can make items appear to vanish, merge through walls, or break farms.

Test with Spark and player observation:

```text
/sparkreviewer stress merge-baseline 180
# adjust merge-radius.item conservatively on a copy
/sparkreviewer stress merge-test 180
/sparkreviewer compare merge-baseline merge-test
```

If `merge-radius.item` becomes large, also review Paper's `fix-items-merging-through-walls` setting. Enabling that fix has its own performance cost, so do not use huge merge radii casually.

## Scenario H: Targeted Alt Item Despawn

Use for junk item piles, not valuable fishing rewards.

Good candidates:

- cobblestone
- netherrack
- bamboo
- cactus
- leaves
- farm trash that players do not care about

Avoid unless fully confirmed safe:

- cod
- salmon
- tropical fish
- pufferfish
- enchanted books
- any material PyroFishingPro may use for custom fish or custom rewards

Reason: custom plugin items often use normal Minecraft materials with custom metadata. A material-only despawn rule may delete valuable custom rewards.

## Scenario I: Simulation Distance

Use when too many player-loaded farms are ticking at once.

Lower simulation distance reduces the active ticking radius around players. That can reduce the number of active hoppers, farms, entities, and redstone systems, but it can also break farm designs or make them feel smaller.

Measure:

```text
/sparkreviewer review
/_hoppers scan
/_hoppers checklist simulation
```

Only compare after matching mob spawn range, despawn ranges, and farm expectations.

## Scenario J: Spark Spike Profiles

Use when TPS is mostly fine but there are repeated lag spikes.

Run directly from console or through SparkReviewer extra args if configured:

```text
spark profiler start --only-ticks-over 100 --timeout 300
```

Or through Hoppers so the marker and report attachment stay with the hopper investigation:

```text
/_hoppers spark spikes 100 300 hopper-spikes
/_hoppers attach spark <spark-url> hopper-spikes
/_hoppers note Spike profile captured while top hopper chunk was loaded
/_hoppers dump
```

Use this when the problem is not constant hopper load but intermittent stalls.

## Decision Matrix

If Hoppers shows clogged full hoppers:

- clear/expand storage first
- do not start by changing hopper timing
- expect `/_hoppers recommend` to show the CMI teleport target and storage-first action

If Spark shows `InventoryMoveItemEvent` overhead:

- run `/_hoppers configs`
- run `/_hoppers recommend`
- check `runtime:InventoryMoveItemEvent`
- copy-test `disable-move-event: true` only after listener review

If Spark shows hopper tile ticking and Hoppers shows many dense hopper chunks:

- run `/_hoppers recommend` and export `/_hoppers dump`
- test MFM dynamic throttle first
- then test `hopper-check: 2`
- then test `hopper-check: 4`

If Hoppers shows item piles:

- inspect the item material/source
- fix collection/storage
- consider merge radius or targeted alt despawn only after confirming it will not delete valuable custom items

If Spark points at a plugin, database, command, or non-hopper event:

- do not tune hopper settings yet
- fix the plugin hotspot first

If `/_hoppers risk` says there is no hopper evidence:

- keep the Hoppers dump as proof of what was checked
- capture Spark/SparkReviewer evidence during the same drop
- investigate plugin, entity, chunk, database, or command hot spots before changing hopper settings

## Sources Reviewed

- PaperMC world configuration: https://docs.papermc.io/paper/reference/world-configuration/
- PaperMC spigot.yml reference: https://docs.papermc.io/paper/reference/spigot-configuration/
- PaperMC commands/profiling reference: https://docs.papermc.io/paper/reference/commands/
- PaperMC troubleshooting Spark notes: https://docs.papermc.io/paper/basic-troubleshooting/
- Paper Chan optimization guide: https://paper-chan.moe/paper-optimization/
- YouHaveTrouble optimization guide: https://github.com/YouHaveTrouble/minecraft-optimization
- DedicatedMC Paper config guide: https://docs.dedicatedmc.io/server-optimization/paper-config-optimization-guide/
- Shockbyte Paper config guide: https://shockbyte.com/help/knowledgebase/articles/how-to-optimize-your-paper-configuration-to-reduce-lag
