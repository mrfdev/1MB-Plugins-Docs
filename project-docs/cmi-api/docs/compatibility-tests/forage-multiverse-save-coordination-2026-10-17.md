# Forage / Multiverse save coordination

This follow-up addresses the live `Invalid JSON detected` errors investigated on 17 October 2026. Live was inspected read-only during diagnosis and is not changed by this local implementation or test workflow. Multiverse-Inventories 5.3.6 and Multiverse-Core 5.8.1 JARs remain unmodified.

## Change

Forage no longer requests full MV-I inventory writes when publishing a transaction marker or polling an incomplete checkpoint. MV-I owns its native inventory save lifecycle. Forage still includes its namespaced checkpoint marker in those native snapshots and independently checks the original Paper, MV-I world/group and CMI wallet requirements before releasing the full journal receipt.

The exact installed MV-I queue permits overlapping operations on the same file; a deterministic local reproduction produced `Invalid JSON detected` while a write was incomplete, with valid JSON before and afterward. Coalescing only Forage's requests cannot exclude MV-I's native world-change or logout writers, so this change removes the extra writer rather than relying on timing delays or changing the provider.

Native same-inventory world moves preserve the context and marker: MV-I deliberately skips writing a shared group's profile on travel within that group. A later group exit or logout can therefore cover earlier transactions. Continuity requires the actual uncancelled native share event inside the matching Bukkit world-change lifecycle, with no inventory/armor/offhand reads. Replacements and missing, cancelled, duplicate, stale or mismatched events rotate conservatively. Reconnect starts fresh connection lineage.

## Protection and compatibility

- No item, player-progress, claim-history or checkpoint format migration.
- Existing incomplete checkpoints retain their original source paths and proof requirements.
- No native share event is cancelled or replayed, no inventories are overwritten, and no reward is retried merely because its save is pending.
- Provider futures and share events are not accepted as durable delivery proof. Missing or malformed snapshots remain pending; interrupted or ambiguous effects remain held for reconciliation.
- Pending records can remain until native world/group, logout or shutdown saving occurs. Ordinary configuration reload keeps the coordinator. Global feature disable stops verification; subsequent activation can hold still-unverified effects for review.
- The existing 256-pending-per-actor admission safeguard remains. Its guidance now suggests reconnecting to allow a native inventory save, then staff review if the wait persists.
- This removes Forage's additional MV-I write pressure. It does not fix independent races inside MV-I triggered by other plugins or native save activity.

## Verification

Focused regression tests cover delayed/partial native snapshots, malformed JSON, original group plus world proof, restart/reconnect, callback/close races, retained pins, the admission bound and native shared-inventory continuity. Three continuity regressions were demonstrated against the previous implementation before the adapter fix.

The disposable native harness uses the maintained Paper test server and exact unmodified provider JARs, with an isolated detached native player. It exercises production marker publication and polling, heavy custom components and foreign PDC, native provider saves, same-group and separate-group movement, disk reload and clean restart. Real Forage progress snapshots and existing configurations/kits are compared for preservation.

Evidence and execution results are stored under `.scratch/forage-mvi-save-coordination-2026-10-17/`; the original queue reproduction is under `.scratch/multiverse-inventory-errors-2026-10-17/`. The native harness is disposable test tooling, not part of the live handoff.

The harness tests native persistence/API boundaries with a detached player, not a connected client's quest GUI or a power-loss experiment. The full transaction and gameplay regression suites cover the claim/progress logic separately.

### Build 784 acceptance results

- Canonical `scripts/build-all.sh` completed for 1.0.4-784, Paper 26.3 STABLE build 200. Full suite: 6,256 passed, 41 skipped, zero failures/errors. Forage: 2,548 passed, 28 skipped, zero failures/errors.
- Native Paper test at 15:21 CEST: 266 assertions passed, with 3,001 publications, 15,001 retries, 13 controlled native saves and three native world-share transitions. Forage caused zero extra MV-I writes. Every storage slot, armor and offhand count/component/PDC comparison passed, including after cache eviction and separate-group restoration.
- A fresh checkpoint before shared-group travel remained unproven while its shared-group snapshot was stale, then became provable after the native destination save. Missing evidence was never treated as success.
- Clean server restart at 15:22 CEST: all 26 recovery assertions passed. Paper and MV-I reloads preserved the complete fixture inventory and fixture progress; the pre-restart checkpoint was independently proven from persisted original-source evidence. Existing real Forage profiles remained unchanged.
- Compared 1,865 pre-existing Forage/config/kit files after restoring the local Forage server: no missing files or semantic changes. Eleven YAML files were rewritten with equivalent content during normal saves/startup; all remaining files were byte-identical.
- All 66 managed JARs are identical between the two maintained test servers. `stageTestedJarsForLive` successfully staged that exact complete set in `build/tested-jars/live/`. The temporary probe and providers were removed from Paper, with its previous Core files restored byte-for-byte. The tested MV-I JAR retained SHA-256 `6e58e89009283f4be8658abe2b7e46c482010ceccf3c8e0b0e8ca6a0a114ff92`.
- Local Forage beta resumed successfully with build 784 at 15:23 CEST. Local Paper remains stopped, as before the tests.

Detailed assertions: `.scratch/forage-mvi-save-coordination-2026-10-17/native/result-run.txt` and `result-resume.txt`. Build, staging, preservation and JAR manifests are retained alongside them. No live server operations were performed.

## Manual live handoff

After local acceptance, stage the complete tested Library suite with `stageTestedJarsForLive`. On live, keep Forage dormant, cleanly stop and back up, replace the complete managed Library JAR set, and start normally. Keep live configurations, player data, kits and provider JARs. No MV-I reload, data reset, inventory restoration or checkpoint acknowledgement is required by this update. Use `/forage debug enable true`, followed by `/forage admin check`; review startup and inventory logs. Any pre-existing ambiguous recovery hold must be inspected rather than automatically cleared.
