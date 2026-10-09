# Forage tool protection, 7 October 2026

This follow-up restricts changes to issued Forage tools to their owned camp **Upgrade Tool** and **Repair & Merge** flows. Replacement purchases, ordinary storage, dropping and disposal remain available. Normal Minecraft use outside a matching source family remains possible without Forage progression. No live activation is part of this change.

## Reproduced gaps and changes

The added workstation regressions reproduced ten failures for disabled-gameplay/legacy opt-out guards and missing mandatory command prefixes, plus four unguarded transforming inventory types. These now have mandatory protection regardless of gameplay availability or legacy guard switches. Furnace/fuel/crafter callbacks and hopper input are also checked, while personal-inventory shift movement and ordinary storage remain allowed.

The installed CMI 9.8.10.4 repair command changes item damage directly and emits no virtual-anvil repair event. Forage now wraps the provider-owned public command executor and also listens for virtual-anvil repair/rename events. mcMMO 2.3.002-SNAPSHOT exposes the reviewed public repair and salvage checks used to cancel before consumption.

PyroMining 4.6.1 and PyroLib's top-menu dispatcher can act on cancelled clicks. The shared Pyro adapter authenticates and withholds the actual mutation callbacks. It composes Halloween Virus, Forage and `/points` guards without recursively wrapping their shared dispatcher. Existing augment/vessel metadata is preserved and the tool pauses for review.

PyroWelcomesPro 0.5.1 deducts points before dispatching its configured repair command. The exact-owned-JAR regression first reproduces the unguarded callback despite cancellation, then verifies that the protected purchase does not reach the charge callback. The adapter reads authenticated shop/confirmation commands and does not depend on menu display names. Reviewed PyroLib versions are 1.4.9 and 1.6.0.

## Validation

Verified locally in **suite build 726**, with **Paper 26.3 BETA 159** on **Java 27+35-2325**. Compilation and tests used **JDK 25.0.4.1**, retaining Java 25-compatible bytecode.

| Check | Result |
| --- | --- |
| Canonical `scripts/build-all.sh` | Passed; all 65 managed suite JARs synchronized as build 726 |
| Complete suite | 3,459 cases: 3,458 passed, no failures/errors, one existing optional ShopGUI+ fixture skip |
| Forage tests | 156 passed, no skips |
| Owned Pyro callback fixtures | Both PyroLib 1.4.9 and 1.6.0 passed, including points precharge refusal and simultaneous Halloween/Forage guards |
| Native tool-protection probe | 390 assertions passed; state restoration confirmed |
| UpdateSmoke with probe | All 565 checks passed |
| Clean restart without probe | All 565 checks passed |
| Startup and shutdown | Both boots completed and shut down cleanly |
| Artifacts | All 65 deployed JARs match build outputs; project classes remain Java 25-compatible |

The first canonical attempt passed the suite but stopped before synchronization because the manifest's soft-dependency total still declared 175 instead of 180. That metadata and its contract fixture were corrected. The required retry reused reserved build 726 and completed successfully.

The native probe checks all tool types, unauthorized metadata/mechanics changes, outside repair rollback, legacy migration, allowed camp transformations, foreign PDC, workstation inputs/results, automation and actual CMI/mcMMO registration. It repeats protections with gameplay enabled and disabled. It uses real Paper items and events, but isolates mcMMO payload allocation and CMI command predicates from real player profiles and provider side effects. It does not claim a connected-client paid-menu test.

The temporary diagnostic JAR was removed and UpdateSmoke configuration restored. The maintained server is stopped. The live server and preserved Paper 26.2 rollback instance were not changed. The read-only public-documentation check still reports the existing unsynchronized mirror, now including these changes; no public publication or live staging was performed.

Local evidence is under `.scratch/forage-tool-protection-2026-10-07/`. The temporary native fixture is scoped to the maintained Paper server and detached synthetic player; it does not dispatch provider commands or create profiles, payments or world changes. It invokes real Paper handlers and final Forage transformation methods, while existing camp/transaction tests cover authorization. Connected-client acceptance remains separate.

## API and integration review

Discovery follows the live [Paper index](https://docs.papermc.io/llms.txt), [listener documentation](https://docs.papermc.io/paper/dev/event-listeners/), and exact 26.3 Javadocs for [inventory clicks](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html), [Mending](https://jd.papermc.io/paper/26.3/org/bukkit/event/player/PlayerItemMendEvent.html), and [smelting](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/FurnaceSmeltEvent.html). Installed provider JARs were inspected read-only for exact callback/event signatures and cancellation/charge ordering. Commercial JAR fixtures remain local and are not redistributed. See [shared item protection](../tool-item-protection.md) for lifecycle and provider-version boundaries.

## Paper 159 review

The canonical workflow advanced the approved 26.3 BETA target from 157 to 159. [Build 158](https://github.com/PaperMC/Paper/commit/bfb089d29d2b59f963bb0f244082c42f792688f5) prevents shearing villager display items and clears trade-display items before zombie conversion. [Build 159](https://github.com/PaperMC/Paper/commit/a4b87cf896e18419005ab172e8b1694ccc1abe7c) adds `PlayerPostEffects#update()`. Comparison of all 2,348 cached API classes found only that class changed; the item, PDC, command, listener and inventory-event APIs used here are unchanged. The maintained server JAR matches [official build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/159).

The live roadmap, deprecations and exploit-configuration defaults were reviewed. The maintained server keeps duplication protections and sanitizer exclusions at their safe defaults. Public 26.3 Javadocs still advertised build 157 during review, so exact artifact and upstream patch comparisons covered that documentation lag.
