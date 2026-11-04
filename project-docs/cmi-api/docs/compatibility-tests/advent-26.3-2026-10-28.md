# Advent Paper 26.3 research and compatibility record

Paths beginning with `<server-root>` are relative to the owner-managed server directory; exact machine paths remain in the local evidence.

Date: October 28, 2026. Research baseline: Paper **26.3 build 227 stable**, as selected by `gradle.properties` when inspected. The compile API inspected was `26.3.build.227-stable`. This section records API and source-copy evidence; it does not claim runtime gameplay acceptance or a completed release build.

## Official documentation discovery

Discovery began with the live [PaperMC LLM index](https://docs.papermc.io/llms.txt). The web reader could not retrieve it, so HTTPS curl fetched the current index directly. Its documented paths led to the [scheduler](https://docs.papermc.io/paper/dev/scheduler/), [custom inventory holders](https://docs.papermc.io/paper/dev/custom-inventory-holder/), [PDC](https://docs.papermc.io/paper/dev/pdc/), [roadmap](https://docs.papermc.io/paper/dev/roadmap/) and [vanilla data files](https://docs.papermc.io/paper/reference/vanilla-data-files/) pages. Research copies are ignored scratch evidence, not vendored documentation. No `llms-full.txt` was copied.

## NPC findings

| Capability | Evidence and consequence |
| --- | --- |
| Player-like native actor | Paper 26.3 [`Mannequin`](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Mannequin.html) extends `LivingEntity`; the exact installed API JAR confirms the interface. |
| Dress and skin | `getEquipment()`, `setProfile(ResolvableProfile)` and `setSkinParts(SkinParts)` are supported. Clothing and a profile can therefore be represented without NMS. Skin resolution and resource appearance still need Java/Bedrock client checks. |
| Pose | `Mannequin.validPoses()` is the runtime authority. Inherited [`Entity#setPose`](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Entity.html) supports an entity pose, not arbitrary armor-stand-style joint articulation. |
| Size | [`Attribute.SCALE`](https://jd.papermc.io/paper/26.3/org/bukkit/attribute/Attribute.html) is the supported relative-scale attribute. Check `getAttribute(SCALE)` for availability; verify appearance, hitbox and restart persistence on the exact server. |
| Stationary actor | `setImmovable(boolean)` is exposed. Protection, gravity, damage and equipment interaction behavior still need explicit plugin policy and testing. |
| Native click | [`PlayerInteractAtEntityEvent`](https://jd.papermc.io/paper/26.3/org/bukkit/event/player/PlayerInteractAtEntityEvent.html) is not deprecated in the 26.3 API. It represents right-click with the position on the entity. It inherits the parent interaction handler list. Avoid overlapping parent/at handling and offhand duplicates. |
| Citizens click | [`NPCRightClickEvent`](https://jd.citizensnpcs.co/net/citizensnpcs/api/event/NPCRightClickEvent.html) supplies `getClicker()` and `getNPC()`, and supports ordinary cancellation. Its installed build 4255 constructor chain uses `Event()` with `isAsync=false`. Handle world/entity/player changes on the server thread. |
| Citizens identity | [`NPC#getUniqueId()`](https://jd.citizensnpcs.co/net/citizensnpcs/api/npc/NPC.html#getUniqueId()) is the NPC's persistent globally unique identity. `getId()` is not guaranteed globally unique across sessions; `getMinecraftUniqueId()` is the client UUID and may differ. |

Recommendation: use native mannequins for stationary seasonal actors and keep Citizens optional for existing managed NPCs or additional behavior. Register actors by stable identity and logical day, never by display name. Revalidate actor/world/session/date on every meaningful action. Keep a single idempotent unlock path for both integrations.

The exact live-installed Citizens JAR was copied read-only to `servers/Paper-26.3/compile-support/Citizens-2.0.44-b4255.jar`. Its `plugin.yml` declares **2.0.44-SNAPSHOT (build 4255)**. Local and live SHA-256 both equal `ab6cfed31112a225fab3982c0040ecc7af9843942111c4f803ddda95c474e8cf`. This copy alone does not enable Citizens on the local test server. The official [Citizens API guide](https://wiki.citizensnpcs.co/API) is supporting documentation; exact installed bytecode corroborates the event and identity APIs. The unusual installed `setDelayedCancellation(boolean)` implementation should not be used as the main access-control mechanism; ordinary `setCancelled(true)` and authoritative plugin validation are clearer.

## GUI, threading and persistence review

The custom holder is the inventory/session identity, not a title or icon. The exact [`InventoryClickEvent`](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html) contract warns about opening/closing inventory from inside its modification cycle. Cancel the action and schedule menu transitions appropriately. Test drag, hotbar, offhand, double-click, shift-click, creative, close, quit and stale sessions explicitly.

The scheduler guidance requires returning to the server thread before touching world, entity, player or inventory state. Database, file, compression and report work belong off that thread. Immutable snapshots can cross that boundary; mutable Bukkit objects cannot serve as asynchronous state authority. Reward persistence needs durable pending/delivered/finalized or failure/recovery states, and an uncertain external result must not trigger a blind retry.

## Read-only Santa source copy

- Source host: `m4pro-mini`.
- Source directory: `<server-root>/live-1mb-3.14.4-mc-26.3/spawn/dimensions/minecraft/santa/`.
- Isolated destination: `.scratch/advent/world-import-2026-10-28/santa/`.
- Files: **448** regular files, **1,032,317,390 bytes**. Region, entities, POI, world data and `paper-world.yml` were preserved. The transfer excluded any `session.lock`.
- Verification: all **448** local hashes match a separate live post-copy read; no missing files or hash mismatches.
- Metadata: DataVersion **4790**, Paper level override spawn **(-16, 154, 102)**, existing per-world Paper PDC is empty.
- World UUID: `3fd710bc-ac1b-424f-8fdb-7e4f8867b791`; no collision with any of the 13 existing local dimensions when compared.
- Live Multiverse entry: legacy key/name `santa`, normal environment, easy difficulty, PVP false, auto-load false, spawn **(-15.5, 154, 102.5)**, yaw **179.7893**, pitch **2.3999686**.

No live server command, save, reload, stop, restart, write or deployment was performed. No live player files, global plugin records or event transaction ledgers were copied. Read-only file access to a running source cannot guarantee a single atomic world snapshot even when every sequential hash matches. Santa's auto-load setting is configuration evidence, not proof of its loaded state.

The complete manifests and Santa-only Multiverse block are under `.scratch/advent/world-import-2026-10-28/`. The maintained local dimension root is `servers/Paper-26.3/spawn/dimensions/minecraft/`; no Santa directory or Santa Multiverse entry existed at the initial inspection. The later local installation below preserves the scratch source and uses that fresh destination. Do not copy the live global `level.dat`, world registry, inventory groups or progress ledgers over local state.

Map artwork can depend on global map data outside a dimension. No global map store was copied. If local visual inspection reveals missing artwork, identify the exact referenced map IDs and resolve collisions before any narrowly scoped import; do not replace the local map store wholesale.

## Local Santa installation

The maintained local server was confirmed stopped using process inspection, no open holder of `spawn/session.lock` from `lsof`, and the latest log's completed shutdown at 16:52:07. The verified source was copied into the previously absent `servers/Paper-26.3/spawn/dimensions/minecraft/santa/` at 17:15:43 UTC. All **448** installed files match the reference hashes.

Local `plugins/Multiverse-Core/worlds.yml` was backed up to `.scratch/advent/world-import-2026-10-28/local-import-backup/worlds.yml`. Only the source Santa block was appended, with its root key adapted to `minecraft:santa` and `auto-load: false` retained. The original configuration bytes are unchanged. Before/after SHA-256 verification confirms **1,870** pre-existing files under `spawn/`, `plugins/1MB-CMIAPI/`, `plugins/CMI/` and `plugins/Multiverse-Inventories/` stayed unchanged, with no unexpected additional files in those existing-data scopes. This includes the existing EventHunts and Hide & Sheep records. No inventory groups, other world registrations or player data were changed.

Evidence is `local-install-report.json` plus `local-import-backup/preserved-before.json` in the import directory. YAML parsing verified 13 prior registrations remained identical and only Santa was added, yielding 14 entries. The installation did not start or load the local world. It retains the running-source consistency limitation described above. Runtime smoke testing must separately record startup and load verification.

## Documentation matched to implementation

The player and administrator command tables in [Advent](../plugins/advent.md) were checked against `AdventPlugin`, `AdventMenus`, `AdventSettings`, the feature lifecycle gateway and `calendar.yml`. They document the separate feature/live gates, private previews, real administrative repairs, native/Citizens bindings, reward-provider support, unsupported extra homes, placeholder stories and provisional date defaults. Command/source review is distinct from in-game execution.

## Acceptance gates still requiring recorded execution

- Native mannequin scale, dress, valid pose, stationary behavior, protection and main/offhand interaction on the exact Paper runtime; Java and Floodgate clients.
- Citizens integration enabled/disabled/missing, stored NPC UUID, respawn, chunk unload and clean restart; no duplicate click delivery across adapters.
- Exact-date boundaries, missed-day rules, December 25 gift and all-24 bonus; separate entitlement and claim status.
- Staff preview while ordinary players remain on the actual date and retain unchanged production progress and rewards.
- Full GUI action matrix, shared-menu back behavior, cancellation, stale session and permission revocation.
- Verified CMI and typed rewards, random choice persistence, full inventory, component-rich items, AutoSell interactions, provider failure and crash/restart at transaction boundaries.
- Local world loading and runtime preservation checks; the stopped-server import and initial checksum preservation checks above have passed.
- Canonical clean suite build, full automated tests, actual Oracle compiler/test JVM identities, Java 25 bytecode and complete managed JAR synchronization while the local server is stopped.
- November 8–27 owner gameplay acceptance, November 28 binary freeze and later exact-tested-set staging.

Append concrete results and evidence here as these gates are completed; do not reinterpret research-only findings as executed tests.

## Completed implementation verification

Final canonical local suite: **build 822**, Paper **26.3 STABLE build 227**, API `26.3.build.227-stable`. `scripts/build-all.sh` completed its clean suite build and recoverable synchronization in **4m 39s**. All **68** managed artifacts are active and match the produced bytes; no disabled artifacts remain in this local set. The final reports contain **7,633 test cases**, **zero failures/errors**, **41 skipped**, including **95 Advent tests, all passing**. The existing suite emits unrelated deprecation warnings; the new Advent production code compiles without deprecation warnings.

Actual dynamically selected tools:

- Gradle/compiler: Oracle **25.0.5.0.3**, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`.
- Tests and Paper smoke: Oracle **27.0.1.0.3**, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.
- Compiler release **25**; all **2,448** `com/onemb` suite classes verified at class major **69**. These paths are evidence of this run, not hardcoded build configuration.
- Advent artifact SHA-256: `a320ddbeaf102cc38286dbafa3630ed35268f835578c3c19f3dd9fe1d1a4f852`.

The first build exposed suite inventory/contract assumptions for the 68th artifact; the manifest, pilot contract, prefix, command and documentation contracts were updated, preserving the existing compatibility baseline. Build 821 completed after those repairs. Its native smoke then exposed that the default-false staff permission also denied Advent's custom console commands. Explicit trusted-console admission and five regressions fixed that issue; build 822 is the final tested set.

### Automated behavior coverage

Coverage includes exact-day/elf/Santa prerequisites, missed days, midnight, explicit season year, claim cutoff, independent Christmas and perfect-24 gifts, concurrent duplicate claims, persisted random outcomes, retry identity, atomic-write failure and corruption, store locks, late store opens after disable, private rehearsal isolation, late-preview cancellation, stale/closed/replaced inventories, permission revocation, survival mode, world/distance/line-of-sight checks, configuration generation, Citizens shutdown and trusted console diagnostics/reload.

Reward checks cover UUID/recipient continuity, missing providers, exact CMI acquisition, cancellation, full inventory, metadata-rich item deltas, native inventory-save proof, held/reconciled receipts, Vault readback, typed native points and mcMMO skill/cap validation. Unknown side effects cannot be replayed automatically. Permanently cancelled native inventory UUIDs require deliberate staff replacement and explicit original-claim resolution.

### Native maintained-server smoke

Both runs used loopback-only `127.0.0.1:22332`, the maintained server, installed Oracle 27 and a disposable local probe. No real player was connected or mutated. The final run loaded Citizens **2.0.44-SNAPSHOT build 4255** successfully alongside Advent. It verified:

- Actual Advent build 822 activation and loaded configuration, then successful console diagnostics and asynchronous calendar reload.
- Santa loading from the imported local dimension, with its `auto-load: false` policy retained.
- All **26** CMI placeholder kits loaded with unique IDs, disabled kit-menu access, no overflow drops, no commands, and exact native cookie components.
- A real six-row inventory using the shared managed holder with synthetic owner/session identity and the **24 exact tree positions**.
- All **24** present items, static red/green profile textures, native serialization round-trip, and day 24's displayed stack count.
- One temporary nonpersistent mannequin at scale **0.7**, immovable, sneaking pose, cookie/helmet equipment and a static skin profile. It was removed in `finally`; registry removal was verified, and no existing actor was edited.
- Successful clean shutdown; the probe JAR was removed afterward.

The final server remains stopped. Advent is enabled locally for preparation, with **`season.live: false`**. The 26 one-cookie placeholder kits and Citizens JAR are local-only setup additions. No live file, command, save, restart or deployment occurred.

### Existing-data preservation

The separate world import previously verified **1,870** existing local data files unchanged. Before runtime smoke, **842** files across existing `1MB-CMIAPI`, CMI and Multiverse-Inventories data were backed up. After the final clean shutdown they were restored byte-for-byte and their SHA-256 values verified. New Advent-owned data and the new placeholder-kit file were retained. Santa is a fresh local import; the untouched source copy and original registration backups remain in ignored scratch storage. No live progress or transaction ledger was merged.

### Evidence and remaining gates

Evidence lives under `.scratch/advent/`: `build-all-final.log`, `build-verification-final.json`, `toolchains.txt`, `paper-smoke-first.log`, `paper-smoke-second.log`, `runtime-preservation-report.json`, `native-probe/` and `world-import-2026-10-28/`.

This proves automated rules, integration contracts, artifact consistency and the listed native operations. It does **not** replace a Java/Bedrock player playthrough, actual Citizens right-click gameplay, final reward delivery under live-style inventory groups/AutoSell, visual skin/lore approval, or final story/elf placement acceptance. Preview claims intentionally deliver no real reward. Paper 26.4 was not available for testing; review its exact APIs and run the same gates before an upgrade. No live handoff was staged before owner gameplay acceptance.
