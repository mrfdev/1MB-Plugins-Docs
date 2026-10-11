# Forage 26.3 camp revamp verification

**Historical evidence for builds 704–705.** The versions, publication boundary and remaining work below describe the September milestone. See the [current implementation and release tracker](../forage-26.3-revamp-todo.md) for the October beta baseline, implemented kit rewards and remaining release gates. This report does not sign off current gameplay or activate live Forage.

Date: 27 September 2026. Scope: local `servers/Paper-26.3/` only. No live-server writes, online documentation publication, or live handoff staging.

## Tested build

- Canonical command: `scripts/build-all.sh`, using JDK 25.0.4.1.
- Suite version: **1.0.4 build 704**. All **65** managed JARs synchronized, descriptors verified, SHA-256 inventory recorded, class-file versions at most 69 (Java 25).
- Server: **Paper 26.3 ALPHA build 49**, runtime Java **27+35-2325**.
- Build script reviewed/selected the latest build within the explicitly approved 26.3 ALPHA channel. Paper 47-to-49 contains five server-internal commits. All 2,348 API classes are byte-identical; the API version metadata differs. Exact source/API review is retained in `.scratch/forage-26.3/paper-47-to-49-review.md`.
- Canonical build gate: **3,060 tests, zero failures/errors, one skip**. Forage: **45 passing tests**. Shared GUI coverage includes **64** policy/event/session cases; it is mocked-event coverage, not a hacked-client packet test.

## Material evidence

The read-only template inspector examined ten Dappled tent pieces and 49 shared camp pieces in the exact server resources. Tent wool stairs range from 29 to 57, median 40.5; fences range from seven to eight. Every tent has storage, two of ten contain a crafting table, and none contain a composter. Cushions are entities. These are piece statistics, not invented random whole-camp averages.

Build 49's structure, pool, template summaries and all 59 inspected pieces match the build-47 measurement. See [template evidence](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/compatibility-tests/forage-26.3-camp-templates-2026-09-27.md). The default checklist deliberately permits varied designs and requires the extra workstation/crafting station where missing.

## Unit and service coverage

- Registry: initial slot, two secondary slots, physical world identity, overlapping volumes, owner UUIDs, invalidation, repair, introduction retention, replacement and persistence snapshots.
- World policy: exact aliases, unknown-world denial, blacklist precedence, ambiguous aliases and initial-world eligibility.
- Material checks and bounded scans: mixed wool forms, shortfalls, biome, negative coordinates, height limits, no block access when any required chunk is unloaded, and fresh rechecks.
- Station context: world, range and expiration.
- Writer: detached immutable snapshots, ordered writes, backups, bounded queue/failure behavior and shutdown.
- Transaction persistence: intent recovery cannot replay effects automatically; finalization waits for the snapshot barrier; failed barriers cannot finalize; proven no-effect cancellation permits retry of the stable introduction/quest key; valuable evidence remains until explicit recovery acknowledgment.
- Shared GUI events: all click types, drag/creative, bottom/outside slots, foreign holders, session replacement, stale queued actions, quit/offline/world-change/shutdown, and rapid/pending requests.

## Native Paper results

**50 assertions passed** in the final camp probe. This executes production camp, GUI and introduction transaction methods against real Paper worlds/inventories. A detached server player plus a test-only online/position proxy supplies the GUI actor. It is not a networked Java/Bedrock client.

Covered groups:

1. Real wool-stair camp, exact material counts, missing/restored fence, biome changes, slab/full-wool alternatives and secondary camp without Dappled Forest.
2. Duplicate physical-world and foreign overlapping registration rejection; fresh local introduction counters; invalid initial camp blocking secondary activity; explicit repair revalidation restoring it.
3. Logical Wild/SkyBlock aliases resolved by the production policy; registered initial/secondary validation through the plugin.
4. Delayed gathering in a different world rejected before any profile/tool mutation.
5. Plain items accepted; foreign PDC, modified stack-size component and explicit removed default component rejected. An empty default tooltip component is normalized by Paper to the plain item (`hasItemMeta=false`, `isDataOverridden=false`, `isSimilar=true`), so it is correctly not treated as meaningful custom data.
6. No command-created station authority; actual shared holder/session recognition; starter access before introduction; global benefits locked before local play; moved-away/world-changed/closed menus denied.
7. Real asynchronous Local Introduction consumes eight of sixteen logs exactly once despite duplicate confirmation. Benefits then unlock. The worker reads the written camp snapshot and confirms completion on disk.
8. Closing the GUI during a second asynchronous introduction request cancels it without consuming the eight inputs or marking completion.
9. An existing unloaded camp chunk is obtained asynchronously, returns an inspectable footprint, and releases its temporary ticket. Missing distant terrain remains unloaded and is never generated. Pending/unavailable checks fail closed.

The first attempt passed 38 assertions and then failed a **probe assumption** that a just-released chunk must immediately report successful unloading. The corrected probe waits for ticket-level changes and observes actual loaded state. No production camp fix was necessary for that fixture failure. Subsequent runs passed all 50 assertions.

The native probe restores every block/biome it changes, releases tickets, removes its synthetic registrations/profile, and is removed after server shutdown. Test-only transaction evidence was archived under `.scratch/forage-26.3/runtime-data-captured/`; original test data and transaction files were restored byte-for-byte before the final clean restart. Existing two legacy camp claims were preserved by schema-v2 serialization.

## Performance observations

Twenty warmed samples each validate **both** camp footprints, 5,733 positions per camp, on this local Mac:

| Measurement | Two-camp validation |
| --- | ---: |
| Median | 0.777458 ms |
| 95th percentile | 1.164292 ms |
| Maximum | 1.184 ms |

This is a small local block-scan measurement, not a many-player load test, cold-disk benchmark or TPS guarantee. Workstation and command admission is limited per player before expensive scans; shared GUI buttons have their own throttle. Positive scan results are not cached as mutation authority.

YAML serialization, forced writes, backups and exports use the ordered worker. Snapshot capture still occurs on the server thread because Bukkit state must remain there. Default autosave is five seconds; legacy values are clamped to 2–10 seconds. The local config has explicitly been set to five seconds. Healthy ordinary-progress crash loss is the interval plus writer latency. Queue failure or an oldest pending write beyond thirty seconds pauses mutations; shutdown allows a bounded ten-second flush.

## Suite runtime and configuration

- Startup and clean shutdown succeeded on build 49. Native probe reruns exercised restart loading; a final run without the probe verified restored data and the final local config. `profiles.yml`, `chunks.yml` and legacy camp claims are semantically identical to the pre-test backup after that restart; the only camp-file additions are schema-v2 metadata and an empty new registry.
- Forage config check: **zero errors**, one expected warning because the local balance preset is not `live`.
- UpdateSmoke: **561 pass, zero warn/fail, one skip** across 562 checks; 10/10 commands, 400/401 command-smoke entries and 5/5 placeholders.
- Dependency version gate: **zero issues, zero warnings**, Paper 26.3 and Java 27 aligned.
- Local aliases: `wild=spawn`, `skyblock=spawn_nether`, `end=spawn_the_end`. Other logical worlds retain identity aliases and remain unavailable if absent.
- Only the local blacklist omits physical `spawn`, which deliberately acts as Wild here. Shipping defaults still blacklist `spawn`, `builders`, and `legacy`. Do not copy the local alias config onto live.
- WorldGuard protections remain enabled. No unsafe Paper exploit setting was enabled.

## Remaining release gates

This is a tested local implementation, not authorization to activate live.

- Owner gameplay acceptance with real Java and supported Bedrock clients, varied naturally generated camps, actual island protections and inventory groups.
- Adversarial real-client packet paths, full inventories, AutoSell and other item metadata, kick/death/teleport timing, many-player load, and forced failures across external plugins.
- **External durability:** Forage's journal/profile files cannot atomically commit Paper playerdata, an inventory-group provider and Vault. In-flight uncertain effects block replay and require review. Finalized item/economy evidence remains until staff explicitly acknowledges verified external state. A verified external-save adapter and forced-crash acceptance are still required before live activation; finalized receipt status alone does not prove external inventory persistence.
- Arbitrary quest reward commands fail closed until their delivery can be verified. Temporary hearts, other-plugin points, kits, fishing tournaments, Community Efforts and managed Camp Storage remain separate reward/feature work.
- Public docs publication and final live staging remain separate owner-directed steps.

## Local evidence

All command logs and temporary probe sources are retained under `.scratch/forage-26.3/`: `build-all.log`, `artifacts.json`, `native-smoke-attempt1.log`, `native-smoke-attempt2.log`, `native-smoke.log`, `native-results.json`, `restart-smoke.log`, `restart-results.json`, `cleanup-verification.json`, `public-docs-build.log`, `docs-drift.log`, and `probe/`. These are local development artifacts, not deployable plugins.

## Build 705: first gameplay feedback

The first client session exposed a silent Creative-mode registration rejection. The action-time compound guard returned without chat, while the registration button always advertised confirmation. A minimized test executed that production gate: six cases failed specifically because chat was empty, while the existing feature-disabled explanation passed. Registration now shares a read-only blocker explanation between the hover and a fresh action-time check. Registration and revalidation require Survival mode. Physical material readiness remains separate from full action readiness.

The guidance provider also still consulted legacy camp claims. It now uses current registrations for missing Initial Camp and Local Introduction instructions, respects logical world mappings, and retains the shared `/guidance` preferences, `/next`, first-success checklist and `/forage next` routes.

- Canonical `scripts/build-all.sh` completed **suite build 705**, Paper **26.3 ALPHA 49**. All **65** synchronized JARs match their build-output SHA-256 hashes.
- Full suite: **3,060 tests, zero failures/errors, one skip**. Forage: **64 passing tests**, including eight new guidance cases and eleven registration-feedback cases.
- The temporary native follow-up probe passed **19 assertions** against the player's existing complete Initial Camp. The Requirements book glows in Creative; the registration/revalidation button shows `Not ready yet: Survival mode required.` without a ready glow; its actual button callback explains the player's mode in chat. Survival passes preflight and renders ready. A menu opened in Survival rejects a later Creative-mode click with fresh feedback. Spectator and Adventure are also explained.
- The actual next-step provider returns Dappled Forest, logical `/wild`, Survival and `/forage camp` instructions for an unregistered test identity without creating a profile.
- In-memory snapshots of every profile, camp, gathering chunk and durable-transaction summary remained unchanged. After clean shutdown, parsed `profiles.yml`, `camps.yml` and `chunks.yml` exactly match the backup taken after the player's gameplay session; only YAML map ordering changed in two files. No blocks, biome, inventory, successful registration or reward were mutated by this probe.
- The probe uses a detached, unjoined Paper player and production managed-GUI callbacks. It verifies rendered item lore/glint and action behavior, not networked client packet handling. Real-client confirmation of this follow-up remains with the owner.
- Probe startup/shutdown succeeded and the temporary JAR was removed. Existing gameplay changes were preserved; no pre-session data was restored.

Follow-up evidence is in `.scratch/forage-guidance-2026-09-27/`: red/green regression XML, `forage-tests.log`, `build-all.log`, `build-verification.json`, `post-probe-data-verification.json`, and `native-probe/native-registration-results.json` with its runtime log and local-only source.
