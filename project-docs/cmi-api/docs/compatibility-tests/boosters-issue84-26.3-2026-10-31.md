# Boosters issue #84 verification, 31 October 2026

Implemented the mcMMO admin GUI, per-skill/all-skill XP layer, presets and announcements, durable queue and cooldown, one-off/daily/weekly scheduling, conflict previews, and opt-in active-player-count boosters. Issue: https://github.com/mrfdev/1MB-Library/issues/84.

## Canonical build

- `scripts/build-all.sh` completed the clean full build and synchronized **68 matching JARs**, all build **827** (`1.0.4`), to the maintained local `servers/Paper-26.3/` instance. No partial module JAR is the handoff.
- Compiler and Gradle: Oracle **25.0.5.0.3**, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`.
- Automated tests and Paper: Oracle **27.0.1.0.3**, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.
- These are observed paths for this run, not configured paths. The wrappers resolve and validate installed Oracle 25/27 afresh; downloads remain disabled.
- All **2,553** non-multirelease class files in the 68 artifacts have class major **69**, Java 25 bytecode.
- Full suite: **7,851 tests, zero failures/errors, 41 skipped**. Boosters: **103 tests, all passed**, including 38 GUI tests and 28 scheduler/calendar tests. Build logic: **24 passing tests**.
- Source SHA-256 checks confirm the complete Booster source/resource set still matches the tested snapshot. Artifact SHA-256 and synchronized-set verification passed.

## Paper build review

The canonical workflow selected **Paper 26.3 STABLE build 235**, API `26.3.build.235-stable`, server SHA-256 `4ebaf5c9da98c654bb8f17245799943dfb05a285830be4307bfdf7bc9ca024bf`. Version and channel remain the reviewed target. The official build metadata for 231–235 lists checkstyle updates, MaterialTags capacity handling, a respawn-radius fix, multiline console parsing, and the new EntityLandEvent. This feature does not use the changed entity/respawn surfaces; console tests send single commands.

Discovery started from the [live Paper index](https://docs.papermc.io/llms.txt), then used the [scheduler guide](https://docs.papermc.io/paper/dev/scheduler/), [custom inventory holder guide](https://docs.papermc.io/paper/dev/custom-inventory-holder/), exact [26.3 scheduler API](https://jd.papermc.io/paper/26.3/org/bukkit/scheduler/BukkitScheduler.html), inventory/event metadata, [roadmap](https://docs.papermc.io/paper/dev/roadmap/), [26.3 deprecations](https://jd.papermc.io/paper/26.3/deprecated-list.html) and current configuration reference. No NMS or reflection is used in shipped booster management. The roadmap's ItemStack interface direction and player-wrapper reuse guidance do not require an additional feature change. No exploit-protection setting was relaxed; official piston/end-portal duplication defaults remain false and oversized-component sanitizer exclusions remain empty. The live documentation index was not vendored.

## Automated behavior coverage

Scheduler/calendar checks cover FIFO fairness, one shared mcMMO lane, overlap and exact cooldown boundaries, fixed-time priority over delayed queue entries, explicit DST gaps/overlaps, daily and weekly recurrence, expired windows, grace-period end preservation, cancel/edit revision guards, permission changes during persistence, duplicate tokens, write failures, interrupted reservations, active restart without replay, durable cooldown, snapshot format migration and terminal-history pruning without token replay. Runtime interruption retains future recurring occurrences, while explicit Stop cancels the series.

GUI tests exercise the actual shared inventory event controller with holder/owner/session identity, every ClickType, bottom/outside slots, shift/double/hotbar/offhand/drop/creative/drag paths, deferred next-tick permission checks, close/quit/offline/world/replacement/shutdown invalidation, stale entry/preset data, repeated Go live, and asynchronous completion that cannot replace an unrelated inventory.

Integration tests cover actual-server-identity activity filtering for Java and Bedrock players, CMI AFK/vanish/unknown/error handling, NPC and spectator exclusion, stable tiers and repeat limits, missing mcMMO, single-skill/all-skill selection, active XP scope and expiry, native mutation suppression and stale queue confirmations. The XP listener handles the installed mcMMO public event API; see [provider evidence](boosters-mcmmo-provider-26.3-2026-10-31.md).

## Local runtime acceptance

The temporary, console-only `BoosterProbe` harness uses exact runtime/version checks and refuses connected real players, pre-existing active plans, non-neutral native rates or enabled population automation. It uses real Paper inventory/items and the installed mcMMO event constructor, with a synthetic Player proxy. Test-only reflection and native configuration readback stay inside `.scratch/issue84/probe/` and are not shipped.

Two full Paper startup/probe/clean-shutdown passes verified the installed build, parsed state after restart, actual six-row inventory contents and component serialization, unsafe-input cancellation, valid next-tick edits, stale close rejection, console draft/confirm, scheduled cancellation, FIFO start/explicit stop and reload. The first pass performed **146 assertions** and the restart pass **150**, **296 assertions** in total. Mining XP 10 became 40 under a 4x Mining boost; Fishing and command XP remained 10; the same event was not doubled twice; expiry and stop removed the effect. Native global and per-skill mcMMO rates remained unchanged. No real player XP or inventory was modified.

Local plugin data and worlds were snapshotted before startup, restored afterward, and **5,354 files** were SHA-256 verified. Test probe and synthetic receipts were removed from the server, while the exact tested 68-JAR suite remains installed. The maintained server was left stopped. No live-server connection, command or deployment was performed.

## Remaining acceptance boundary

A real Java/Bedrock client visual and gameplay pass remains for the owner: menu readability, regular player-earned XP with other live integrations, natural party sharing, real population thresholds and announcement pacing. Synthetic/native tests verify mechanisms without claiming that human acceptance. Automatic population boosts remain disabled by default. Native per-skill changes made through an unobserved direct third-party API cannot be fully identified through mcMMO's public rate API; the supported tracked-command boundary and recovery procedure are documented in the plugin guide.

Local evidence: `.scratch/issue84/build-all.log`, `build-verification.json`, `focused-final.log`, `paper-first.log`, `paper-restart.log`, `probe/compiler.json`, `snapshot-manifest.json` and `restoration.json`.
