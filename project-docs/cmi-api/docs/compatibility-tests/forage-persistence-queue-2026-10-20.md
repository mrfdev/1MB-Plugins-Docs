# Forage background proof writes and transaction completion

## Incident and reproduced cause

On 20 October 2026, the public server running suite 788 on Paper 26.3 STABLE 206 rejected a Forage persistence task during an individual quest claim. The single FIFO writer had one active task and all 32 queue slots occupied. Its rejection set the persistent failure flag, pausing valuable actions and camp access even after the queue drained. A subsequent `/forage quests` command did not cause the failure. Tracked in [issue #81](https://github.com/mrfdev/1MB-Library/issues/81).

The affected claim's profile snapshot reached disk, but its external-checkpoint completion did not. The receipt remained `DELIVERING`, with its exact recovery payload retained. Waiting or reloading configuration cannot clear this storage failure. The old camp feedback misleadingly suggested retrying after an access check; it did not identify the storage pause.

The deterministic reproduction uses the real persistence writer, checkpoint coordinator and checkpoint store. One admitted gameplay save is held while a poll completes 32 background provider checks. Each callback previously submitted a persistence task, including callbacks with no new evidence. The gameplay save's dependent checkpoint-completion task then attempts to enter the full queue from the writer thread itself. It is rejected before that thread can drain any queued task.

The 31-check case passed before the fix; 32 checks with either empty or partial evidence failed. The reproduction needs neither a slow disk nor rapid player clicks.

## Change

- Check at most four external checkpoints at a time, rotating through pending records.
- Skip persistence when provider evidence is empty or already retained.
- Admit background work through the existing FIFO with a four-task bound and four reserved queue slots at the production capacity of 32.
- Serialize admission checks with mandatory submission and shutdown. Busy background work defers without marking storage broken.
- Retain captured proof or review work until it can be admitted. Deferred work keeps its checking slot, limiting both retained work and new reads to four. Retry it before starting fresh checks.
- Recheck checkpoint state before writing so staff acknowledgement or review cannot be overwritten by stale automatic proof.
- Preserve the existing fail-closed policy for actual I/O failures and mandatory queue overflow. Preserve transaction identities, first-observed evidence, FIFO ordering and atomic writes.
- Report unavailable storage explicitly when it prevents a prepared camp visit from opening.

No reward replay, claim reset, live data migration or automatic clearing of a failed writer is included.

## Verification

Before the fix, the actual queue reproduction failed at 32 background checks and the new camp-feedback regression failed in both local and Initial Camp preparation paths. After the fix:

- All 107 focused tests passed: 8 saturation/deferral cases, 9 persistence cases, 25 coordinator cases, 34 checkpoint-store cases and 31 camp-feedback cases.
- The original three-case replay passed. Empty evidence left one active write; partial evidence left one active write and four maintenance writes. The mandatory completion succeeded in both cases.
- Coverage includes retained partial and complete proof, unchanged evidence, staff acknowledgement during deferral, FIFO ordering, background admission limits, genuine I/O failure and mandatory overflow remaining fail-closed.

Canonical `scripts/build-all.sh` completed suite **1.0.4-791** on Paper **26.3 STABLE 207**, using JDK **25.0.4.1**, Java 25 bytecode and a Java **27** server runtime. All **66** managed JARs were synchronized and verified. The full suite ran **6,745 cases: 6,704 passed, 41 existing optional skips, zero failures/errors**. Forage ran **2,784 cases: 2,756 passed, 28 existing optional skips**.

The maintained local server started at 16:50:23 Europe/Amsterdam. `/forage admin check` reported zero errors, two configuration warnings (the intentional normal test preset and existing shovel/brush sand-family overlap), and 37 successful checks. `/forage debug runtime` showed available storage, an empty writer queue, no persistence failure, no pending actors, and ready Paper/MV-I/CMI providers. ScheduledTips also reported its scheduler enabled and running.

Suite 791 shut down cleanly at 16:51:17 and restarted successfully at 16:52:21. The maintained local test server was left running at that stage. No public-server restart, deployment or receipt acknowledgement had been performed. These tests do not constitute connected-client reward acceptance.

### Owner-approved live handoff at 17:04

The owner stopped the public server, updated Paper independently, and authorized replacement of only the 1MB suite. The local test server was stopped for `stageTestedJarsForLive`; the task staged the exact 66 tested build-791 JARs. Both servers were left stopped.

All 66 live managed JARs were replaced and matched the staged SHA-256 checksums. The previous suite and complete Forage folder were backed up before replacement. A fresh JAR inventory and hash comparison verified that Paper 206/207 and all other 700 JAR files under the inspected server/plugin paths were unchanged. All 6,838 Forage files remained byte-identical. No configuration, world, player, receipt or checkpoint edits were made.

The server was not started. The owner can start it; loaded-plugin diagnostics and acknowledgement of the already-delivered interrupted reward remain pending. Exact deployment manifests, backup location and verification are retained in the private incident directory.

### Live recovery completed at 17:14

The owner started the public server on Paper 26.3 STABLE 207 and Java 27. Forage loaded suite 791, reported available storage and ready providers, and automatically verified the earlier completed checkpoints. Exactly one interrupted reward remained held. The config check reported zero errors, 38 successful checks and two existing warnings: the normal balance preset and shared shovel/brush sand family. Those settings were left unchanged.

The exact failed receipt and escrow were preserved again before acknowledgement. The shared transaction command rejected console because its permission guard lacks the console exception used by neighbouring admin routes. Read-only checks by the authoritative UUID confirmed the online owner's existing Forage admin permission and allowed CMI command execution. CMI then ran the exact `delivered confirm` command as that owner without granting or changing permissions. After independently verifying `FINALIZED` and escrow cleanup, console ran the supported `recoveryack` command.

Durable verification confirmed `FINALIZED`, checkpoint `VERIFIED`, released external-checkpoint pin and unchanged saved player profile. Runtime then reported zero pending actors, zero awaiting provider saves, zero recovery holds, zero missing checkpoints, empty storage queue and no storage failure. The recovery commands did not grant items, money, XP or points. Exact command evidence and before/after records are saved privately in `recovery-complete.json` and the related incident files.

Private reproduction logs and live evidence are retained under `.scratch/forage-access-2026-10-20/`. Live evidence is kept separate from all local test-server progress and transaction data.

## Incident evidence

Read-only review found the first individual quest receipt finalized and the second still delivering. The second claim's points, XP and claimed flag are persisted. CMI's money log records both deposits, and subsequent logged transactions reconcile to the later saved wallet balance at the log's display precision.

The owner confirmed moving the rewards into a chest and supplied a screenshot. A narrow read of the saved nearby region data found all eleven second-claim reward types in that chest, each carrying the exact affected transaction tag. One stack had eight oak planks remaining from sixteen issued; the other ten quantities matched the escrow. This corroborates delivery and subsequent movement without assuming unchanged inventory contents or granting replacements. Exact actor, transaction, coordinates and financial records remain in the private incident evidence.

## Recovery constraints

Preserve the complete Forage directory, exact escrow, receipt and external checkpoint before any live maintenance. Preserve relevant provider evidence independently. A claimed profile and a money log corroborate parts of an effect; they must not be mistaken for complete durable inventory and wallet verification.

The existing save/export commands use the failed writer and cannot export all unsaved in-memory progress after this latch. A config reload does not repair it. A graceful restart requires a reviewed maintenance window and an assessment of potentially unsaved progress. Do not hot-reload the plugin or edit transaction YAML to unlock the actor.

After restart, an interrupted `DELIVERING` receipt becomes a non-retryable failure, and its prepared external checkpoint requires manual review. Independently verify all effects before using the supported `debug transaction <id> delivered confirm` acknowledgement, then verify the closed receipt before using `admin recoveryack <id> confirm`. The delivery acknowledgement removes escrow, so retain its backup first. Neither acknowledgement grants items or money. If an effect is uncertain, retain the affected player's recovery hold; do not retry, refund, regrant or reset the claim merely to clear it.
