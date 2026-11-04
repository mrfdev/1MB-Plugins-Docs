# Forage external inventory and economy durability

Status: implementation and focused regression checks completed on 17 October 2026. Canonical build **779** passed on Paper **26.3 STABLE 200**. Native CMI and Multiverse verification passed after a complete Forage disable/enable cycle. This report does not authorize or claim live activation.

## Scope and reviewed environment

ENG-01 adds independent saved-state verification around existing Forage transactions. The intended behavior is to retain exact recovery evidence and prevent unsafe retries when Forage, Paper inventories, inventory-group storage and an external wallet cannot share one atomic commit. Successful claims keep their existing gameplay path; they do not wait for the providers' entire autosave interval before the normal success response.

The reviewed adapters target Paper **26.3**, CMI **9.8.10.5** with its local SQLite storage and the reviewed CMI Vault providers, and optional Multiverse-Inventories **5.3.6**. Source/runtime research used Paper build **200**; record the canonical build's selected runtime separately below. Compilation and tests use JDK **25.0.4.1**, with Java 25 bytecode. Maintained server runtime acceptance uses Java **27**.

Unsupported versions, disabled saving, unsupported economy adapters and unsupported inventory-group configurations refuse affected valuable actions before spending or delivery. Internal-only operations do not require an external provider. The new metadata is additive; this change does not alter reward quantities, kit contents, tool prices, claim eligibility or camp authorization.

## Persistence and retry contract

- The durable journal receipt identifies the logical operation. A separate random attempt UUID identifies each external checkpoint. A safe retry can reuse a rolled-back journal receipt without overwriting an earlier refund or restoration attempt's evidence.
- Provider requirements retain the authoritative actor UUID, inventory context, provider identity, original paths and generation tokens. The entitlement owner and the staff member holding a voucher remain separate actors where appropriate.
- An atomic checkpoint reservation precedes every admitted external effect. Gameplay remains on the main server thread; checkpoint storage, provider file reads and SQLite verification run on background workers. Captured provider/context assumptions are revalidated immediately before mutation.
- The effect or confirmed restoration is followed by a durable Forage state barrier and checkpoint outcome before journal completion or rollback. A failure after an uncertain effect is not converted into an automatic retry or refund.
- Before-effect cancellation retains an explicit VERIFIED no-effect record. Missing evidence is never treated as proof that nothing happened. PREPARED plus ROLLED_BACK remains ambiguous and requires review.
- Each provider's first matching `proof.*` observation is retained durably. Later saves or stale callbacks cannot replace an already retained proof, overwrite staff acknowledgement, or release a manually imposed hold.
- Pinned journal receipts remain full records while external verification is pending, including during startup compaction. Releasing the pin checks the terminal status and exact journal revision on the journal worker; an older attempt cannot release a newer retry's pin.
- Recovery never replays a reward, replaces an entire inventory or changes a wallet. Staff acknowledgement records an explicit verification decision and retains the evidence. It does not itself deliver, refund or repair items.

Checkpoint states are deliberately separate from the journal's delivery states:

| State | Meaning |
| --- | --- |
| PREPARED | Durable requirements exist; an interrupted effect cannot be assumed absent. |
| COMPLETED | The gameplay effect and Forage snapshot completed; independent provider proof may still be pending. |
| CANCELLED_EFFECT | A charge/refund or item restoration was confirmed in memory and Forage state was saved; those external writes still require proof. |
| VERIFIED | Matching saved-provider evidence, explicit staff acknowledgement, or a proven before-effect cancellation has been retained. |
| MANUAL_REVIEW | The outcome or latest evidence is ambiguous; automatic verification must not override this state. |

Checkpoint files use atomic replacement and backups. Strict schema, actor and filename validation rejects malformed records. A valid backup can recover an unreadable or missing primary only into MANUAL_REVIEW, retaining the damaged bytes where available. The sibling initialized marker prevents missing checkpoint directories from silently becoming a fresh empty ledger. Pending journal pins also identify missing attempt evidence. These safeguards do not promise recovery after all related journals, markers and backups have been deleted together.

## Provider evidence

### Paper inventory

The adapter observes the authoritative primary-world `players/data/<uuid>.dat` path used by the reviewed Paper 26.3 runtime. It validates the UUID stored inside the NBT and the root Bukkit PDC marker rather than trusting the filename. Reads are bounded, reject symbolic links and incomplete input, force the observed file and parent, and re-read to detect concurrent replacement or changed bytes. A save request alone never counts as proof.

### Multiverse inventory groups

The adapter retains the original world/group profile paths, profile type and inventory/armor/offhand requirements. The custom share marker travels with the relevant source profiles. A later Paper visit alone cannot prove that the original source inventory was saved; the matching source-profile evidence is also required. Individual source proofs remain available if a later visit replaces that profile file.

Connection lineage changes on reconnect and adapter initialization. Actual inventory replacements within one connection preserve the lineage and advance the visit sequence. A native, uncancelled world-share event with no inventory-bearing reads preserves the inventory context and marker while updating the current world. MV-I deliberately does not save a shared group's profile when moving between its worlds; retaining that marker allows the later native group exit or logout to prove the earlier effects. Missing, cancelled, ambiguous or unrelated share events conservatively start a new context. Reconnecting from an older Paper save therefore cannot establish saved-state proof for the preceding connection merely by travelling again. This matters with the reviewed MV-I default `performance.apply-playerdata-on-join: false`.

Following the live save-overlap investigation, Forage no longer invokes `WriteOnlyShareHandler` on publication or verification retry. MV-I owns its normal world/group, game-mode, logout and shutdown saves. Verification remains read-only and still requires the original Paper and all captured MV-I profile proofs. A completed gameplay action can therefore retain its full recovery receipt until a native save occurs, without replaying the action or delaying its normal success response. The existing 256-pending-per-actor admission bound remains; its message now suggests reconnecting to permit a normal inventory save, with staff review if the wait continues. Ordinary Forage configuration reload keeps the coordinator running. Globally disabling Forage stops verification; ambiguous state on a subsequent activation remains held for review, never automatically reissued.

MV-I source processing and listener ordering were reviewed against 5.3.6. This is source evidence; the automated fixture does not operate a real connected player's MV-I world transition.

### CMI SQLite wallet

CMI save calls enqueue work; their return does not acknowledge a committed balance. The adapter observes a separate read-only SQLite connection and committed read transaction for the exact actor UUID. The reviewed CMI serialization order writes balance before UserMeta. Generation A alone is insufficient: a matching committed A is observed, B is requested, and a matching committed B is then required. A later covering generation must remain in the same epoch and have the required B phase.

The observer does not write balances or query an external identity service. Missing or ambiguous actor records cannot provide proof. The current adapter does not claim support for other CMI database engines or unrelated economy plugins.

## Regression evidence and its limits

| Layer | What the fixtures actually exercise | What they do not establish |
| --- | --- | --- |
| Checkpoint store | Real atomic files/backups, reload into a new store instance, malformed data, missing directories, independent retry attempts, retained proofs, immutable concurrent read snapshots and injected write failures. Latest source contains 34 cases. | A real JVM power loss or a filesystem's behavior after power loss. |
| Provider files | Real temporary GZIP/NBT and JSON files, production readers, UUID/context/generation checks, truncation, missing files, symlinks and retained partial evidence. | Minecraft-generated inventory contents or an actual player's movement between live worlds. |
| SQLite | Real temporary SQLite database through JDBC, committed generations, a separate observer connection and an uncommitted B update that must remain invisible. | The live CMI database, CMI's complete asynchronous save lifecycle under load, or an actual payment to a player. |
| Connection lineage | The production visit tracker receives join, movement, quit, reconnect and subsequent movement; assertions reject use of the earlier connection's lineage. | Native client reconnect and MV-I event registration acceptance. |
| Coordinator | Real checkpoint files and FIFO writer with controlled provider futures, simulated Bukkit actors and a controlled journal. Latest source contains 25 cases. It covers callback/write races, missing evidence, offline verification, owner/staff holds, changed providers and internal-only plans. | End-to-end server/client gameplay or a native provider's full event lifecycle. |
| Journal pins | Real journal files, ordinary and startup compaction, stale active and newly terminal retries, metadata preservation and injected persistence failure. Seven added pin cases plus 11 existing journal cases were included in the recorded focused run. | An atomic commit shared with Paper, MV-I or CMI. |
| Existing gameplay | Existing transaction, quest/participation claim, Silted Keepsake and Mending fixtures exercise production transaction paths using simulated players and controlled save barriers. Restored-effect assertions now wait for the required durable barrier. | A substitute for native acceptance on the exact installed suite. |

The recorded focused run in `.scratch/forage-eng01-2026-10-17/coordinator-tests.log` passed **68 cases** with zero failures, errors or skips: coordinator 16, store 34, journal pins 7 and existing journal 11. Five additional coordinator cases and the final cancellation semantics were added afterwards, so that earlier count is not the final build acceptance total.

The subsequent complete Forage/shared-library development run in `.scratch/forage-eng01-2026-10-17/full-focused-suite.log` reports `BUILD SUCCESSFUL`. Its final per-module counts and the canonical result must be recorded below from the corresponding completed report artifacts, not inferred from the earlier focused run.

## Review findings addressed

Independent review identified and corrected the following boundaries before canonical verification:

1. A late automatic provider result could replace staff proof and poison the FIFO writer. Authoritative state is now rechecked both before queuing and inside the writer.
2. A successful provider result originally supplied an empty proof. Success now supplies a useful proof; malformed success goes to manual review rather than failing ordinary persistence.
3. Full journal receipts could compact while external evidence still needed them. Pending pins and revision-checked release preserve this recovery link.
4. Retried journal UUIDs collided with retained checkpoint records. Distinct attempt UUIDs preserve each attempt independently.
5. A rolled-back receipt or missing checkpoint could be mistaken for proof of before-effect cancellation. Explicit no-effect evidence is retained; ambiguous or missing records remain held.
6. Unknown providers or mismatched embedded actors could be accepted without validating the requirement identity. These checks now precede adapter verification.
7. A stale successful callback could remove a hold whose state had become MANUAL_REVIEW. Hold release now requires actual VERIFIED state and the appropriate closed receipt.
8. Reconnect followed by world travel could appear to extend an earlier inventory's lineage. Each connection now has a fresh lineage.
9. Provider assumptions could change while the intent was being saved. The effect-time gate now revalidates the captured plan.
10. Native MV-I registration rejected `stringSerializer` for `String.class`. The production builder now uses its native default serializer; the regression test reproduces the previous error and round-trips real registered markers.
11. A Forage disable/enable cycle would collide with MV-I's retained static registry. Registration now reuses only the exact known share, with a static handler retaining no adapter, plugin or player state; unexpected collisions still fail closed.

The detailed independent review and version research remain in `.scratch/forage-eng01-2026-10-17/review.md` and `.scratch/forage-provider-research-2026-10-17/`.

## Operational limits

Saved-state proof is a point-in-time observation, not an atomic cross-provider transaction and not protection against a later external rollback, corruption or restore. The adapter does not repair a provider's own later stale writes. MV-I's asynchronous queue ordering was reviewed; no deterministic false-proof case from that queue was established, and future provider changes require renewed compatibility review.

Evidence is retained indefinitely in the current implementation. Startup scans the retained checkpoint history, and snapshots retain that history in memory. A bounded archive must be coordinated with journal pins before it can safely replace this behavior. Monitor growth; do not delete pending evidence to reduce storage.

Automatic verification can remain pending when required provider files are unavailable or no matching saved generation exists. Ambiguous cases retain receipt references for staff review. Public guidance should promise preserved references and conservative recovery, not zero crash loss.

No existing live kits, live balances, real player inventories or live activation settings were changed by the automated fixtures described above.

## Final verification

- **Canonical build 779:** `scripts/build-all.sh` completed successfully in 3m 29s; log: `.scratch/forage-eng01-2026-10-17/canonical-build.log`. Build 778 passed unit tests but its native MV-I registration check found the serializer issue; it is superseded by 779.
- **Selected Paper runtime/API:** Paper 26.3 STABLE build 200 on both maintained servers, compile API `26.3.build.200-stable`; Java 27 runtime and Java 25 bytecode.
- **Canonical suite totals:** 6,170 cases, zero failures/errors, 41 existing optional skips (6,129 passed). Forage: 2,451 cases with 28 skips; shared library: 488 cases with two skips. Final source reports are limited to active `libs`/`plugins` module report directories; historical scratch reports are excluded.
- **Synchronized managed artifacts:** canonical verification confirmed 66 matching suite-779 JARs on each target: Paper 66 active; Forage 65 active plus one deliberately disabled artifact.
- **Configuration and data preservation:** both CMI kit files are byte-identical to their independent before-build backups. Beta Forage config/quests are byte-identical. Paper retained every existing value, refreshed comments and appended 37 non-comment lines of missing defaults from earlier releases; server.properties differs only in its generated timestamp. No real player was used by the fixture. All 40 original CMI UUID wallet rows (Balance and Economy fields) match the stopped backup exactly; the fixture UUID is absent. This is not a byte-for-byte comparison of all world/player files.
- **Native startup/probe:** Paper 26.3-200 / Java 27, CMI 9.8.10.5, Multiverse-Core 5.8.1 and Multiverse-Inventories 5.3.6 passed at 11:17:41 CEST. Forage was disabled at 11:17:11 and re-enabled at 11:17:25 before the test. Actual CMI queued saves were independently observed through committed A/B generations with the fixture balance of 35.0. Actual MV-I serialized inventory, armor, offhand and the production marker together; cache eviction and read-back preserved component/PDC-heavy items. Production listener methods verified reconnect lineage with a detached Player. The existing Paper NBT sample was read only. See `.scratch/forage-eng01-2026-10-17/native/result-779-Paper-26.3.txt` and `paper-779.log`.
- **Real-client acceptance:** not repeated for this engineering follow-up. The owner completed the private gameplay beta and requested public beta next. These checks use detached players and provider APIs, not a real client claim/world-hop or forced JVM power-loss experiment.
- **Clean shutdown/restart:** both targets stopped for each canonical build. The successful native Paper instance stopped cleanly at 11:18:00; temporary fixture/provider JARs and data were archived, and its original Multiverse-Core 5.7.2 JAR/data restored. Paper is left stopped. Forage beta restarted on 779. Native fixture inventory/database data was removed, and no outstanding synthetic transaction was created. Persisted pending/review recovery is covered by the real-file coordinator reload tests, not an in-server crash experiment.
- **Live staging/activation:** not performed. Live retains its current plugin build; monthly and participation delivery are approved for the later launch decision. Separately authorized live-kit cleanup and public documentation publication are complete.
