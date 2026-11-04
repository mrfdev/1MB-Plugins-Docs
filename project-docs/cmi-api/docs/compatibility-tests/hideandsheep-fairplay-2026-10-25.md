# Hide and Sheep fair-play participation, 25 October 2026

## Scope

Local implementation and verification only. No live server access, upload, live staging, Git commit or push is part of this task. Existing build-813 feedback work and live-customized CMI kits are preserved.

Players must explicitly join each round through `/sheep` → Join or `/sheep join` before Woolbur or decoy touches can score. A saved admission requires a verified, expiring UUID-targeted LuckPerms membership and a completed safe arrival. The reserved group is `hideandsheep_playing`. It supplements normal ranks; no normal permission, group, metadata or primary-group snapshot is restored by the implementation.

`/sheep leave` and `/sheep debug cleanup <uuid|player>` stop scoring immediately. Cleanup force-removes reserved direct memberships even with a missing or already-cleaned record. Names resolve only through trusted local caches; explicit canonical UUIDs support orphan/offline recovery. Points, history and reward receipts are separate. Withdrawal, death and world changes prevent same-round rejoining. Disconnect alone preserves valid participation. Normal round ending and interrupted-startup recovery remove owned membership; expiry provides a fallback.

## Fairness enforcement

The subgroup contains explicit CMI and WorldEdit navigation denials. Command, compass, flight, game-mode, player-state and actual teleport guards also apply, because installed CMI accepts broad wildcard grants before some leaf permissions. Staff have no participation bypass. Pearls and elytra remain allowed. Creative-style flight and custom walk speed are turned off and are not automatically re-enabled after leaving.

Installed CMI 9.8.11.0 can automatically invoke `tpaccept` internally, bypassing player command preprocessing. The cancellable CMI request event now rejects requests involving a restricted participant. For requests already accepted before entry, command/plugin arrivals within two blocks of a restricted online participant are rejected on the main thread. This is an actual destination rule, not an inferred recipient UUID. It intentionally affects other command/plugin arrivals inside that small distance too; it does not close the wider event area. The exact one-use Join arrival remains allowed.

The independent participation journal contains only this feature's leases, tokens, expiry and cleanup/withdrawal state. It does not hold normal LuckPerms snapshots. Pending permission operations, expired entry tokens, late callbacks from old rounds, failed saves, repeated cleanup and shutdown are covered. Verified forced LP removal releases movement even if the journal cannot be written; scoring remains closed and the error explains repair/restart requirements.

## Automated verification

The focused module passed **537 tests**, with no failures or skips, before the canonical suite build. Coverage includes pending/failed joins, same-round withdrawal, old-round callbacks, Java/Bedrock/local-name identity resolution, LP save/removal failures, inherited-group conflicts, corrupt/failed storage, private book layout, and the CMI request manager's cancellation path.

The first canonical build completed its tests but refused synchronization because the manifest's declared soft-dependency count still said 194 after adding LuckPerms. Corrected the declaration and its contract expectation to 195. The workflow retains reserved build **814** for its retry; it did not replace the stopped server's prior suite on that failure.

The canonical retry completed successfully as **build 814**: **7,404 total tests, 7,363 passed, 41 skipped, zero failures/errors**, across 567 test suites. Hide and Sheep passed all **537** cases with no skips. All **67** managed JARs match their synchronized local-server copies, and every class is Java 25-compatible. Paper remains stable build 223. No JARs were staged into the live handoff folder.

The selected compiler is Oracle **25.0.5.0.3+1-LTS-2**, at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`; the test JVM is Oracle **27.0.1.0.3+1-2**, at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. These are observed paths, not hardcoded build settings. The launcher resolves and validates them on each invocation. Existing unrelated test-only deprecation/final-field-mutation and JVM native-access warnings remain; this change adds no deprecated production API.

## Native verification

The first native run on build 814 found a real LuckPerms interaction after **63 checks**. The owner-ranked Java account retained its normal primary group, but adding an unweighted subgroup to the default-ranked Bedrock account changed its calculated primary group to `hideandsheep_playing`. Normal permission values were otherwise unchanged. The disposable probe restored both accounts' exact original subgroup memberships and normal primary groups, and verified all four real feature data files were unchanged.

The fix gives only the reserved subgroup a weight of `Integer.MIN_VALUE` and refuses admission if LuckPerms still calculates it as the primary group. The installed LP 5.5.85 bytecode and official source confirm that ordinary unweighted parents, including `default`, participate at weight 0, and that comparisons safely handle the minimum value. Normal group weights and stored user metadata are not changed. For a completely unweighted account, LP may expose the subgroup's derived `weight` metadata while joined; this caveat is documented. Initial failure evidence is retained under `native-probe/build814-primary-group-failure/`; build 814 is not accepted for live use.

**Final canonical build 815 passed:** 7,411 total tests, **7,370 passed**, 41 skipped, zero failures/errors, including all **544 Hide and Sheep tests**. All 67 managed JARs match their local server copies and target Java 25 bytecode. The updated gateway has 33 focused tests. The Paper and Oracle versions remain unchanged from build 814.

The repeated native run passed **all 97 checks** on build 815. Both actual locally cached Java and Bedrock UUIDs retained their normal direct/transient permissions, inherited ranks, effective metadata/prefix/suffix and calculated primary groups throughout grants and after cleanup. It exercised real LuckPerms persistence plus isolated participation/recovery journals, then restored exact original reserved memberships. No real round started, no reward was delivered, and no player joined. The actual feature-file hashes stayed unchanged during this probe. Final evidence is in `native-probe/build815-pass/`.

The real console command was then verified independently:

- UUID cleanup while active created a cleaned record.
- A two-minute reserved subgroup was deliberately added to that same local UUID after its record was already `CLEANED`; `/sheep debug cleanup mrfloris` still removed it. LuckPerms parent readback retained only its two original normal groups.
- While the feature was dormant, `/sheep debug cleanup .mrfloris1811` resolved the exact cached Bedrock UUID and succeeded twice. Parent readback retained `default` only.
- The original enabled setting was restored without starting a round. `/sheep debug health` reported valid configuration, no missing keys, and intact shared command routing.

The server shut down cleanly at **18:13:52 CET**. Port 22332 is closed, the temporary probe JAR was removed, and no probe artifact remains under the maintained server. The final successful startup/shutdown log contains no ERROR/SEVERE entries. Existing unrelated startup warnings remain.

The CMI kit file and original event configuration remain byte-for-byte identical to the stopped-server backup. The progression ledger is semantically identical: 10 historical rounds, 3 participations/finds, 303 lifetime points and 268 spendable points for the existing test player. Its YAML map order changed during ordinary shutdown serialization, without a data change. The separate real participation journal contains the two expected `CLEANED` repair records and no active lease. No live staging was performed; connected-client gameplay acceptance remains outstanding.

## Runtime target and API review

The canonical workflow checks the latest stable Paper build within the configured 26.3 target. It selected **Paper 26.3 build 223**. Compiler selection resolves the installed Oracle JDK 25 dynamically; automated tests and Paper use installed Oracle JDK 27. The selected patch versions are 25.0.5.0.3 and 27.0.1.0.3, with Java 25 bytecode (major 69).

The live Paper LLM index and exact build-223 event APIs were reviewed; references and lifecycle constraints are in the [private feature contract](../feature-contract-reviews/hideandsheep.md). Production uses supported Paper/Bukkit, CMI and LuckPerms APIs, with no NMS or reflection. Installed WorldEdit is 7.4.6-beta-02+2c90a77a1; this local server does not run FAWE.

## Acceptance limits

Native API/persistence checks do not replace a connected-client gameplay test. Before live deployment, test an ordinary member and a wildcard/staff account joining the same round, compass left/right clicks, aliases, pending TPA, normal/forced leave, pearls, elytra, and Java/Bedrock reconnects. Actual FAWE acceptance remains for a server with FAWE installed. No F3/minimap concealment is implemented by this change.

Public player/staff Markdown sources in this repository are updated; publication into the separate public documentation checkout remains a separate step.

Evidence: `.scratch/hideandsheep-fairplay-2026-10-25/`, including the stopped-server backups, toolchain report, canonical build logs, CMI inspection evidence, disposable native probe, and final verification manifests.
