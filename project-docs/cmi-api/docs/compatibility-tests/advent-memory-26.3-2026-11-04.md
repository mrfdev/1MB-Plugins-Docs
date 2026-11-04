# Advent / Santa memory investigation, November 4, 2026

Paths beginning with `<server-root>` are relative to the owner-managed server directory; exact machine paths remain in the local evidence.

## Finding and limits

The November 2 and November 3 incidents show severe retained-heap pressure and repeated full garbage collections. They do **not** establish Advent as the source of the retained objects. Advent build 828/829 was logged as **installed in dormant mode**, and no subsequent activation was found in the captured incident-session logs. The shared feature lifecycle returns before Advent opens stores, registers gameplay listeners, or starts its timers in that mode. No Advent frame appeared in the captured watchdog stacks.

The live JVM had a 10,240 MiB heap. The retained level reached roughly 9.4–9.6 GiB after full collection. The available rotating GC files contain 264 full collections across the later failing session; 216 consecutive collections in one file still left at least 90% occupied. Maximum recorded individual full-collection pauses in the two affected files were 840.750 ms and 1,024.403 ms. Repeated explicit collections and FAWE memory warnings are consistent with the earlier investigation's GC amplification finding; neither a sampled watchdog frame nor a high allocation rate alone identifies the object retaining the heap.

The owner subsequently confirmed that **PvPToggle was also removed**. The restart therefore changed at least three relevant variables: Advent, PvPToggle, and Santa being unloaded. Its healthier memory use cannot independently exonerate or implicate any one component. The original incident remains unresolved pending retained-object evidence or a longer representative reproduction. These fixes must not be advertised as a proven cure for that incident.

## PvPToggle follow-up

The November 2 investigation in the separate crash-log project identifies multiple captured server-thread stacks in `PvPTogglePlugin.onQuit -> savePlayerState -> PlayerDataStore.load/save`, including YAML processing and forced file/directory writes. The same path appears in the November 3 incident excerpts. A read-only review of current source confirms that the synchronous persistence path remains present:

- `PvPTogglePlugin.onQuit` calls `savePlayerState` before cancelling particle tasks and clearing player maps.
- `savePlayerState` loads the shared player YAML, changes two PvPToggle fields, then calls synchronous `PlayerDataStore.save`. That shared operation merges the full profile, serializes/validates it, writes a backup, and durably replaces the primary file. Toggles, some eligibility changes, and feature shutdown use this path too; it is not restricted to quits.
- The source has normal quit/disable cleanup and replaces particle tasks when refreshing them. No clearly unbounded queue or normal-path accumulation of disconnected `Player` objects was established in this pass. A failed `load` can throw before quit cleanup, however; cleanup should be protected independently of saving.
- The particle system also deserves bounded-work review: it schedules a repeating task per enabled player, repeatedly obtains locations/options inside its particle loop, and has a minimum but no maximum configured intensity. This is an allocation/tick-work concern, not proof of retained gigabytes or evidence that live used extreme settings.

This makes PvPToggle a **confirmed main-thread I/O problem and plausible contributor to the freeze**, especially during a burst of disconnects. It does not establish it as the source of the original retained-heap growth. A targeted next change should capture immutable UUID/state values on the server thread, use ordered/coalesced background updates through the existing shared `updateAsync` API, preserve other plugins' profile fields and durable ordering across reconnect/reload/shutdown, and guarantee cleanup even when saving fails. Validate slow-disk quit bursts and failure paths before a controlled runtime comparison. This follow-up changed documentation only; no PvPToggle/Core source, JAR, server session, or live state was modified.

## Read-only source and local protection

- Source: `m4pro-mini:<server-root>/live-1mb-3.14.5-mc-26.3/spawn/dimensions/minecraft/santa/` and `plugins/Citizens/saves.yml`.
- The owner separately authorized local inspection of live crash/GC logs after the automatic approval reviewer rejected a broader sensitive-data copy. Logs remain in ignored local scratch storage; no player chat, usernames, addresses, or raw profiler data are included here.
- No live command, file edit, stop, reload, world load/unload, instrumentation, or deployment was performed.
- Local `plugins/`, `spawn/`, and `server.properties` were backed up before starting. The replaced Santa copy was retained separately. The fresh reference has a 457-file SHA-256 manifest covering Santa and Citizens; all copied files matched the recorded source hashes after refreshing three changing metadata files.
- Only the **213 Santa NPCs** from the live file's 707 records were installed locally. IDs, UUIDs, traits, and cached appearance data were preserved. Other worlds' NPCs, including Halloween, were not imported.
- The maintained test server was stopped at the start. Diagnostic runs used loopback networking and were stopped cleanly. The temporary console-only `SantaProbe-local.jar` was removed afterward.
- Advent's existing local configuration/progress files match their pre-test bytes. No Advent player reward, progress correction, or real delivery was performed. Concurrent Halloween source/configuration work was not reverted or overwritten.

Private evidence is under `.scratch/advent/crash-analysis-2026-11-04/`. Preserve `runtime-before/`, `local-santa-replaced/`, and `live-reference/` for recovery. Never restore the complete old plugins directory over subsequent Halloween work; restore only deliberately selected files while the server is stopped.

## World inspection

The complete region/NBT scan counted **132,737 terrain chunks**, **7,704 entity chunks**, **21,359 saved entities**, and **12,960 block entities**, with **zero malformed records**. These are whole-world disk counts, not counts simultaneously loaded into memory.

The 213 Citizens NPCs occupy 16 distinct chunks. The densest saved entity chunk contains 1,352 entities, including 1,345 item displays; its decompressed NBT is approximately 2.1 MB. Other dense chunks contain 750, 400, and 250 item displays. These decorations warrant gameplay/client-packet profiling with players present. They were not deleted or altered as a speculative fix. A valid NBT scan does not prove every third-party behavior or item component is harmless.

## Controlled local runtime comparison

Paper **26.3 build 241**, Citizens **2.0.44 build 4255**, suite **831**, Oracle **27.0.1.0.3**, 4 GiB heap. Existing runtime JARs were used to separate diagnosis from the source fixes below. The test loaded the union of view-distance-four footprints around the 16 NPC chunks, using sequential, non-generating async chunk requests and temporary plugin tickets. It requested 402 distinct tickets; Paper loaded approximately 750 chunks including the surrounding dependency chunks. A memory safety cutoff stopped further requests above 85% of the heap.

Retained heap values below were sampled after explicit collection **on the local test JVM only**. Each loaded condition had four measurements over about one minute. The higher transient readings during chunk loading (1,083 and 1,447 MiB) were not retained-heap measurements.

| Condition | Retained heap | Santa entities | Spawned NPCs | Advent tasks / threads |
| --- | ---: | ---: | ---: | ---: |
| No Santa, Citizens records empty, Advent dormant | 498 MiB | 0 | 0 | 0 / 0 |
| Santa footprints, Citizens records empty, Advent dormant | 613–617 MiB | 2,882–2,956 | 0 | 0 / 0 |
| After releasing tickets and unloading Santa | 540 MiB | 0 | 0 | 0 / 0 |
| Santa footprints plus copied Citizens, Advent dormant | 669–675 MiB | 3,448–3,469 | 213 | 0 / 0 |
| Same world/NPCs, Advent enabled, public calendar off | 673–675 MiB | 3,472–3,476 | 213 | 4 / 5 |
| After releasing tickets and unloading Santa, Advent enabled | 621 MiB | 0 | 0 | 4 / 5 |

All 213 NPCs spawned and despawned on world unload. There was no watchdog stall or runaway retained heap in these short runs. Typical loaded measurements were approximately 5–10 ms per tick, with a temporary chunk-loading reading of about 19 ms. Task/thread counts remained constant while Advent was enabled.

This is **not** a 25-connected-player soak test. It does not reproduce player movement, packets, GUI activity, profile lookups, other live worlds, or live event ledgers. Live uses view-distance **6**, simulation-distance **4**, and FAWE **2.16.3-SNAPSHOT**; local uses distances **4/4** and WorldEdit. Live incident builds 236/237 also differ from local build 241. These differences and the short duration limit any causal conclusion.

The two processes used the same copied world in sequence, with normal entity ticking/saves allowed; their entity populations were not reset to identical bytes. Do not interpret the heap difference as an exact per-plugin allocation measurement. Santa was deliberately unloaded at the end, retaining its existing local `auto-load: false` setting. Its fresh world and Santa-only Citizens records remain installed for the next deliberate `/mv load santa` test.

## Reproduced and fixed Advent issues

1. **GUI statistics generated an unbounded disk-work backlog.** Every open/click queued a full ledger copy, serialization, fsync, and atomic replacement. A slow disk could retain arbitrarily many queued operations. Statistics now combine exact per-UUID open/click deltas into one queued batch plus an in-flight batch. The test's 500 events from 25 players now need at most three commits including initialization and the deliberately blocked first write, versus 502 before the fix. Closing drains accepted batches; counts survive reopening.
2. **General progress mutations could queue without a limit.** At most 256 progress writes may now be outstanding. Further requests fail before reservation with a busy response. Pending statistics batches hold at most 512 distinct UUIDs. The saturation test confirms only one duplicate claim reservation succeeds and no claim is authorized merely because it entered a queue. Existing uncertain-delivery recovery rules are unchanged.
3. **Closed admin preview ledgers remained in `ownedStores`.** All preview off/quit/reload/stale-open paths now release ownership when requesting asynchronous close. Accepted work still drains on the writer. Repeated preview sessions no longer accumulate old season snapshots in that set.
4. **Idle booster timers performed unnecessary provider/player polling.** Empty, seasonally inactive, and cooling queues return before querying the mcMMO service or CMI users. Owned active/reserved boosters still reconcile, including the January hard stop. Previously saved contribution IDs return from the durable cached snapshot instead of repeatedly entering the queue writer during receipt recovery.
5. **Ordinary ledger updates copied unchanged maps/lists.** Unmodified claim, player, and audit collections are now reused as immutable inputs; changed collections are still copied and published atomically.

No automatic world loading, forced chunk tickets, global entity sweep, or per-player repeating task was found in Advent production code. Community cosmetics check already-loaded chunks. Storage and archive I/O remains off the server thread. Native `Location` uses a world reference in the exact installed API, so a speculative strong-world-retention theory was not treated as a validated defect. Reward gateway records deliberately retain transaction identity and evidence during the feature lifetime; they must not be discarded as a generic cache eviction because that could allow replay.

The three storage/preview regressions failed before the changes and passed afterward. The booster idle-work test also failed before its change; a separate owned-active test confirms midnight shutdown remains reachable. All **218 Advent tests** passed, including persistence failure, restart, concurrent duplicate claims, GUI/session invalidation, preview isolation, books/postcards, and reward delivery checks. Compiler: installed Oracle JDK 25.0.5.0.3; tests: installed Oracle JDK 27.0.1.0.3; Java 25 classfile major 69. Both paths were selected dynamically by `scripts/gradle-oracle.sh`, not embedded in build configuration.

Observed installations were `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home` for compilation and `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home` for tests/Paper, both vendor **Oracle Corporation**. These are historical verification results, not paths to copy into launch scripts. Private `probe/compiler.json` and the tested-source hash manifest retain the machine-readable record.

## Release gate and remaining diagnosis

- The concurrent Halloween task completed `scripts/build-all.sh` as **build 832**, Paper **26.3 STABLE build 241**, after resolving its own initial test failures. This included the unchanged, already-tested Advent sources. The complete gate succeeded: 8,089 reported tests, zero failures/errors, 41 skipped. An independent read-only run of `scripts/verify-synchronized-jars.py` confirmed **68 matching suite JARs, 68 active and zero disabled**. No second competing build or server restart was started by this investigation.
- Installed Advent: `servers/Paper-26.3/plugins/1MB-Lib-Advent-v1.0.4-832-j25-26.3.jar`, SHA-256 `bedf7a0e6ace986dfb0eed5e2fe45e24a2374b920ad80fffc812720809cd13db`. Its four changed production classes match the compiled classes byte-for-byte and have classfile major 69. The source hash manifest also still matches. Private `verified-build.json` records verification. This is local staging, not approval for live deployment or an instruction to distribute Advent separately from the tested suite.
- The Halloween task subsequently started build 832 on Oracle 27 / Paper 241. Read-only startup inspection confirmed Advent 832 enabled successfully, its feature behavior active, and Paper ready at 14:04:23. This does not replace the longer Santa/active-season load test. That shared session was left under the Halloween task's control.
- Complete a longer loaded-player test before November 25, with representative movement through dense decorations, daily unlocks, claims, menu bursts, reconnects, previews, and world unload/reload. Compare dormant versus enabled Advent while keeping the world, providers, Paper build, distances, and player workload fixed.
- If retained heap rises, capture class counts and retained-object paths at that time. Existing owner-requested spark recordings from the separate crash investigation may provide allocation context; allocation samples alone do not establish retention ownership. No production recorder was changed by this task.
- Review the dense decorative chunks visually and under client load. Do not remove world builds or NPCs without identifying a relevant problem.
- Keep the extra-home reward on hold for Zrips. Crash diagnosis does not change event rules, reward amounts, calendar dates, or Halloween progress.

Official API references checked: [Paper scheduling/thread rules](https://docs.papermc.io/paper/dev/scheduler/), [Paper profiling](https://docs.papermc.io/paper/profiling/), and [Paper 26.3 World API](https://jd.papermc.io/paper/26.3/org/bukkit/World.html), discovered via the live [Paper documentation index](https://docs.papermc.io/llms.txt). The web-rendered Javadocs identified build 230, so runtime-sensitive signatures were additionally checked against the installed build-241 API; no claim of build-241 Javadoc parity is made.
