# PvPToggle persistence and runtime review, 4 November 2026

## Evidence and scope

Live watchdog samples previously collected for this incident include PvPToggle's quit handler doing shared playerdata YAML reads and durable file writes on the server thread. This is a confirmed stall risk. The incident also showed very high retained heap, but the available evidence does not identify its owner. Removing Advent and PvPToggle together does not isolate which component caused that retention.

This change is local only. After the user approved the stopped-server window, canonical suite 834 replaced the complete managed local JAR set, preserving the Halloween work and server data. No live plugins, configuration, worlds or player records are modified.

## Changes

- Player profile reads and field-level atomic updates run on a dedicated worker. The coordinator retains at most 512 UUID entries, coalesces each UUID's latest pending change, and keeps no Bukkit players or world objects. Full/closed admission is rejected before a command changes the runtime preference.
- Reconnect reads are ordered behind accepted saves. A pending or failed load cannot overwrite existing playerdata with a guessed default. Completion checks connection identity, lifecycle generation, request identity and state revision before publishing.
- Repeated reloads/reconnects share completion observers, including when a previous shutdown is still draining. Failed parser exceptions are reduced to bounded, cause-free diagnostics so retained failure state cannot keep SnakeYAML input buffers or profile excerpts alive.
- Quit and disable cleanup run even when persistence fails. Failed writes retain their latest intent and retry with a ten-second backoff. Offline placeholders use a bounded five-minute cache and return an empty value while an uncached read is pending; they no longer do filesystem or live-player work on the caller's thread.
- Disable drains accepted changes asynchronously. Re-enable waits for the preceding writer to close successfully. Workers terminate after each close attempt. One removable coordinator-only JVM shutdown hook allows a final drain of up to ten seconds during ordinary JVM exit. Forced process termination or storage stalled beyond that deadline cannot guarantee pending preferences are saved.
- Particle timers resolve players by UUID. Deferred player actions reject disconnected/replaced connections. CMI asynchronous events hand configuration and player access back to the server thread.
- CMI combat events use one scheduled drain with bounded weak connection observations and accumulated counters. Old lifecycle generations are discarded. This avoids a separate retained Player/task closure for every incoming event.
- Rings reuse one location snapshot and one dust description per ring. Existing templates avoid eager fallback parsing. Intensity is limited to 128 points; nonfinite numeric settings fall back to safe values. Default templates and normal PvP behavior remain unchanged.
- Particle template creation/loading runs off the server thread, coalesces reloads, and publishes only the current generation. Maintenance uses the existing watcher rather than adding per-player polling jobs.
- Repeated template-loader restarts wait for the previous worker to terminate without blocking Paper. There are at most 128 template files, including defaults, with a 1 MiB limit per file. Excess counts preserve the previous set; invalid individual files are skipped with a warning.

## Regression evidence

Before the fixes, these focused commands failed on the relevant defect:

```sh
scripts/gradle-oracle.sh :plugins:player-fun:pvptoggle:test --tests '*PvPToggleSchedulingTest.dustRingUsesOneLocationAndSharesOneDustOptions'
scripts/gradle-oracle.sh :plugins:player-fun:pvptoggle:test --tests '*PvPToggleQuitCleanupTest'
```

The first caught repeated dust allocation; the second reproduced a playerdata read exception escaping quit and skipping cleanup. These reproduce specific code defects, not the original multi-gigabyte retained-heap incident.

Focused tests cover blocked storage with 25 UUIDs and 100 rapid changes each, bounded queues/cache, read/write ordering, reconnects, failed writes and recovery, shutdown and JVM-exit draining, placeholder threading, stale callbacks, and preserved combat/permission/cooldown/world rules.

Final verification:

- All **90 PvPToggle tests** passed. Independent coordinator checks also exercised actual `System.exit` in two isolated JVMs, including an accepted slow write and recovery after failed close.
- `scripts/build-all.sh` completed canonical **1.0.4-834**, running **8,171 tests** across active projects and build logic, with **zero failures/errors and 41 skips**. The active-project verifier excludes retired project XML.
- All **68** source JARs, canonical candidates and installed local JARs match by SHA-256. All 2,615 project classes are non-preview major **69**, targeting Java 25. The 1,614-file source/resource snapshot remained unchanged during the build.
- Compiler/Gradle: Oracle **25.0.5.0.3**, selected dynamically at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`. Tests/Paper: Oracle **27.0.1.0.3**, selected at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. These paths record this run; the launchers continue resolving installed versions dynamically.
- Native Paper **26.3 STABLE build 241** startup, `/pvp reload`, feature disable/re-enable, and clean process shutdown passed. Thread inspection found **zero PvPToggle workers while dormant**, then exactly **one particle loader after reactivation**. No ERROR, SEVERE or exception log entries appeared in this smoke run. The process exited with status 0.
- The PvPToggle config was restored byte-for-byte after the lifecycle test. The final server was restarted in detached session `onemblibrary263`, listening locally on port 22332, for gameplay testing.

Local raw evidence is under `.scratch/pvptoggle-review-2026-11-04/`, including the failing-before logs, focused test logs and isolated JVM shutdown checks. Player-specific incident evidence remains local and is not included in this report.

## API and acceptance

Reviewed the current [Paper documentation index](https://docs.papermc.io/llms.txt), [scheduler threading guidance](https://docs.papermc.io/paper/dev/scheduler/) and [Paper 26.3 Player API](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Player.html). Compilation uses the repository's exact Paper 26.3 build 241 API; the hosted Javadocs currently label themselves build 230.

- [x] Integrated automated tests and independent review complete.
- [x] Canonical complete-suite build and 68-JAR verification in an agreed stopped-server window.
- [x] Paper startup/shutdown smoke test with the resulting complete suite.
- [ ] Representative gameplay soak, including about 25 active players, with heap/GC evidence before live acceptance.

The original retained-heap cause remains unproven. These fixes remove demonstrated blocking work and bound plugin-owned retention; they do not establish that the historical crash is resolved.
