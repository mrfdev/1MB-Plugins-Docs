# Forage 26.3 plant compatibility, 6 October 2026

Forage's new-plant support is locally verified in **suite build 724**, against **Paper 26.3 BETA 157** on **Java 27+35-2325**. Compilation and tests use **JDK 25.0.4.1**, retaining Java 25 bytecode. This verification does not deploy or activate Forage on live and does not replace owner acceptance with a connected game client.

## Supported gathering and growth

| Material | Gathering tool and family | Forage Dust behavior |
| --- | --- | --- |
| Poplar log, stripped poplar log | Axe, logs | Not a growth target |
| Red, orange, yellow poplar leaves | Shears, leaves | Not a growth target |
| Red shrub | Sickle, flora | Vanilla spreading into suitable adjacent space |
| Shelf mushroom | Sickle, mushrooms | Small mushroom grows larger; a mature mushroom does not accept more growth |
| Poplar sapling | Planting stock, no gathering reward | Vanilla tree growth, including its usual space and random-growth rules |

The seven gathering materials were already appended by the previous startup migration. This change also includes them in fresh-install defaults and adds the three growable plants to the shared dust target list. Standard, greater, legendary, and previously issued dust all use that list while retaining their stored radius and target limit. Organic camp turn-ins accept plain new leaves, shrubs, and mushrooms under the existing family rules; custom metadata still prevents consumption.

Startup preserves configured values and appends the new targets. A before/after comparison of the maintained server's configuration found exactly three added growth materials and no other value changes. A regression fixture also verifies preservation of custom entries, disabled switches, cooldowns, and idempotence across reload and a second migration.

## Growth and protection

Production growth uses Paper's supported `Block.applyBoneMeal` API on the server thread. Eligible targets are selected before growth begins, so new shrubs created by one application are not pulsed again during that same use. Applications remain bounded by the dust radius, target limit, loaded chunks, world policy, and cooldown. Those limits count bone-meal applications; a resulting tree can extend beyond the pulse radius.

Forage retains the initiating player during the synchronous growth call because the API's growth events can have a null player. It checks the complete `StructureGrowEvent` and `BlockFertilizeEvent` change lists at LOWEST priority, then checks the final fertilization list again at HIGHEST. Any proposed change crossing the configured WorldGuard boundary cancels the whole growth.

The native probe caught a partial-tree problem in the intermediate implementation: WorldGuard can filter the structure list before a late fertilization check sees it. The early checks in build 724 prevent that. The final probe cancelled a 201-block poplar growth while retaining the original sapling, and prevented red-shrub spreading into a protected adjacent block. Cancelled growth was not counted as a successful pulse.

## Verification

| Check | Result |
| --- | --- |
| Canonical `scripts/build-all.sh` | Passed; all 65 managed JARs synchronized as build 724 |
| Complete suite | 3,406 cases: 3,401 passed, no failures/errors, five existing optional-fixture skips |
| Forage tests | 129 passed, including 18 plant compatibility cases |
| Native Paper plant/tool/dust probe | 88 assertions passed |
| UpdateSmoke with the probe | 565 checks passed |
| Clean restart without the probe | 565 checks passed |
| Startup and shutdown | Both final boots completed and shut down cleanly |
| Artifact verification | All 65 deployed JARs match build outputs; project classes retain Java 25 bytecode |

The native probe uses temporary blocks, real Paper item stacks, and a detached synthetic player. It exercises the actual Forage gathering handler for all seven new sources and an oak-log baseline, checking profile rewards, tool XP/use counts, wrong-tool rejection, ordinary-tool rejection, and preservation of foreign PDC. It also checks organic turn-in recognition and rejection of custom harvest items.

Growth checks cover actual poplar trees, red-shrub spreading, and shelf-mushroom maturity. Every dust tier is exercised through the dust-use handler for growth, single-item consumption, cooldown, offhand rejection, disabled-world rejection, no-target retention, and no XP/point awards. Temporary WorldGuard regions test whole-tree and shrub-boundary cancellation. The fixture explicitly expires WorldGuard's query cache after changing its test regions within a tick.

Temporary blocks, regions, in-memory profiles/settings/counters, and chunk tickets were restored. The diagnostic JAR was removed, UpdateSmoke's temporary dispatch limit was restored, and the maintained server was left stopped. Earlier test-fixture corrections and the intermediate partial-tree failure remain in the task evidence; build 724 supersedes build 723 for this change.

The public-documentation drift check still reports the existing unsynchronized documentation mirror, now also including this Forage follow-up and generated build metadata. It is not a passing publication check. No public-docs synchronization or publication was performed.

## API review and evidence

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), followed by the 26.3 API references for [Block.applyBoneMeal](https://jd.papermc.io/paper/26.3/org/bukkit/block/Block.html#applyBoneMeal(org.bukkit.block.BlockFace)), [StructureGrowEvent](https://jd.papermc.io/paper/26.3/org/bukkit/event/world/StructureGrowEvent.html), and [BlockFertilizeEvent](https://jd.papermc.io/paper/26.3/org/bukkit/event/block/BlockFertilizeEvent.html). New plant behavior was checked against the [official Java Edition 26.3 release notes](https://feedback.minecraft.net/hc/en-us/articles/48913133328013-Minecraft-Java-Edition-26-3) and the installed build 157 API/runtime. The current Paper build/API baseline is documented in [the build 157 review](paper-26.3-beta-157-2026-10-06.md).

Local evidence is under `.scratch/forage-plants-26.3-2026-10-06/`: the build log, test-result summary, artifact hashes, native probe source, final startup/restart logs, UpdateSmoke reports, configuration snapshots, and public-docs drift output. The `before/` directory preserves the pre-task Forage source/docs/configuration and the complete build 722 JAR set. The temporary probe uses version-gated test scaffolding; no NMS integration was added to production Forage.
