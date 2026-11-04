# Paper 26.3 BETA build 142, 2 October 2026

The owner explicitly authorized advancing the maintained Paper 26.3 instance from **ALPHA build 133** to **BETA build 142**. This review covers that exact change. Compilation remains on JDK **25.0.4.1**, with Java 25 bytecode; maintained-server smoke testing uses **Java 27+35-2325**. The Paper 26.2 build-699 rollback is outside this update.

## Exact artifacts and API comparison

- Official [build 142 metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/142): channel `BETA`, published `2026-10-01T20:45:34Z`, commit `1c92a6c3a42deda2fbefdec1a0d90d696313ff3b`.
- Server: `paper-26.3-142.jar`, SHA-256 `429f5748552d6ad7c1405015e9513b47679e9ff598fb17fe664875e705664758`.
- Published API: `io.papermc.paper:paper-api:26.3.build.142-beta`, SHA-256 `29b459f0bdac7700efbeba303dd08fe2f1a586a3ab836d6822e86ad51bd87325`. Its official Maven JAR and POM both resolve normally; build 133's temporary bundled-API fallback is unnecessary for 142.
- All **2,348 API class files** in the published 142 JAR are byte-for-byte identical to the checksum-verified API bundled in official server build 133. There are no added, removed or changed classes, and therefore no changed method signatures or deprecation annotations in this delta. API class-file major version is **69**, Java 25.
- Published 142 dependency entries match the previously verified 133 API POM, including Adventure **5.2.0** and SnakeYAML **2.2**.

## Runtime changes that matter

The [official build history](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds) and upstream patches between 133 and 142 were reviewed. Build 134 promotes the channel to BETA. Other changes include concurrent registry caching, an asynchronous command-list concurrency fix, Adventure-mode block-break event correction, disabled spam-threshold handling, block-attached entity death attribution and dragon respawn behavior.

Build 136 exposes two existing chunk-unload constants as configuration: `chunks.min-chunk-unload-count: 50` and `chunks.min-chunk-unload-fraction: 0.05`. These defaults match build 133's hard-coded values, so retaining defaults preserves the prior behavior. No tuning is required for Community Challenges. See the [exact chunk-unload patch](https://github.com/PaperMC/Paper/commit/8832a8dd7bfb8049ed7fcdfe19ca20862920a564).

Build 141's [MC-311924 backport](https://github.com/PaperMC/Paper/commit/54024d30670995c589d8e8213bd54905340b90fc) adjusts armor stands, block-attached decorations, cushions, item frames and sculk attribution. It does not change the qualifying natural hostile mobs or public death-source contract used by the HV patrol. The change is still a reason to repeat native finishing-blow checks on 142.

## Community Challenges API review

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), then official guides and Javadocs. Every captured Javadoc page identifies itself as **26.3.build.142-beta**.

- [Scheduling](https://docs.papermc.io/paper/dev/scheduler/) requires slow storage work away from the server thread and game-state access on the server thread. The community ledger uses the serial storage worker and immutable published views; inventory planning, consumption, PDC receipts and menu actions stay on the main thread.
- [InventoryClickEvent](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html) prohibits changing the open view directly in click processing. The existing GUI service cancels managed input and defers actions; separate drag handling and [custom holders](https://docs.papermc.io/paper/dev/custom-inventory-holder/) preserve server-side session identity.
- [EntityDeathEvent](https://jd.papermc.io/paper/26.3/org/bukkit/event/entity/EntityDeathEvent.html) remains cancellable and supplies the actual lethal damage source. [Entity#getEntitySpawnReason](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Entity.html#getEntitySpawnReason()) describes the original spawn reason and may return null. The natural-only gate rejects null and all non-natural reasons; cancellation is checked before credit is queued.
- [PDC](https://docs.papermc.io/paper/dev/pdc/) remains the supported identity mechanism. Bonus reward stamps preserve foreign metadata and their original items. Player inventory receipts and durable ledger transaction identities remain separate because inventory saving and ledger persistence are not one atomic operation.
- [Data components](https://docs.papermc.io/paper/dev/data-component-api/) remain version-sensitive. No component API binary changes occur here; native testing must still verify custom-item exclusion, serialization and cosmetic preservation against the new server implementation.
- The [roadmap](https://docs.papermc.io/paper/dev/roadmap/) still recommends `ItemStack.of` and avoiding NMS player retention. New community code uses supported API wrappers and item factories. Existing suite command routing is unchanged; this upgrade introduces no new command-API deprecations.

## Safe configuration

Exact build-142 [global configuration source](https://github.com/PaperMC/Paper/blob/1c92a6c3a42deda2fbefdec1a0d90d696313ff3b/paper-server/src/main/java/io/papermc/paper/configuration/GlobalConfiguration.java) retains safe defaults. The maintained local configuration inspected during review matches: piston duplication, unsafe end-portal teleportation, permanent-block exploits, headless pistons and skipped tripwire validation are all `false`; oversized-item-component sanitizer exclusions are empty. No exploit exception, sanitizer bypass or live configuration change is needed.

## Verification results

The canonical `scripts/build-all.sh` completed as **1.0.4 build 710**, compiling against `26.3.build.142-beta` and synchronizing all **65** managed JARs. The complete JUnit result was **4,796 tests, zero failures/errors, two skipped**; EventHunts contributed **1,489 tests, zero skipped/failing**. All 1,962 project-owned class files in the distributed set retain major version 69 (Java 25); every JAR has the same build metadata. The official server SHA-256 was checked again after synchronization.

The maintained Paper **26.3 BETA 142** instance started on **Java 27+35-2325**. The native Community Challenges probe passed **207 checks**, covering actual item/component handling, inventory consumption, CMI kit serialization, bonus item identities, protected GUI sessions and isolated durable-ledger recovery. UpdateSmoke returned `pass` across 562 checks, 64 registered features, ten command-registration checks and five placeholder checks. Its configured command-dispatch budget exercised 400 commands and reported the remaining batch as skipped. The dependency version gate reported zero issues or warnings.

The first build-133 smoke run exposed a GUI listener replacement during plugin shutdown. Build 710 fixes that lifecycle path, with three focused regression tests. The build-142 server then shut down with exit code zero and no Halloween Virus cleanup warning. The temporary diagnostic plugin was removed afterward.

These results establish compile and local runtime compatibility for the tested paths. They do not replace owner gameplay acceptance, full client exploit testing or production-load observation. Existing local setup warnings remain: the three bonus kits have not yet been authored, the `general` event region is disabled, and the old `hvreward` template still fails its existing above-maximum-enchantment safeguard. None was silently changed for this review.

Official-source captures and API comparisons are retained under `.scratch/hv-community-2026-10-02/upgrade142/`; build, native-smoke and artifact-hash evidence are in the parent review directory. The live server was not changed.
