# Ghost Hunt final launch handoff, 28 October 2026

## Approved behavior and scope

This supersedes the earlier build-819 launch review. The owner requested catch-up rewards, disabled CMI templates, CMI command delivery with overflow drops, `chunkblock` claims, and `/ghosthunt` as the public plugin command. Live access in this task was read-only. The owner handles the live stop, JAR replacement, kit copy, aliases and world access.

Live registry inspection confirmed **24 enabled, unique Ghost locations**, all for `halloween_2026` in world `halloween`, with **six entries on each unlock day 1–4**. Ghost is enabled and debug is false. No production Halloween snapshot existed. The saved registry was inspected; this was not an in-game block/PDC validation.

The four waves unlock on October 29, October 30, October 31 and November 1, Europe/Amsterdam. A player earns each wave's kit by finding its six immutable snapshot heads. Earlier waves remain available: finding the first two groups on October 30 earns both kits; finding all 24 on November 1 earns all four kits and the bonus. Calendar-day participation counters cannot substitute for wave completion.

Ghost collection and Doors gameplay end **November 2 at 00:00 Amsterdam**. HV's existing hunting/spawning cutoff remains that same instant. All earned Ghost/Doors rewards and HV's main plus three community rewards remain claimable through **November 7**, closing **November 8 at 00:00 Amsterdam**. HV's earlier claim opening and existing community contribution period remain unchanged. Keep HV and Doors modules enabled during the claims period; their calendars stop gameplay. The Halloween world's access closure remains owner-managed.

Ghost claim worlds retain the existing list and add `chunkblock`: `general`, `wild`, `cave`, `acid`, `skyblock`, `skygrid`, `oneblock`, `chunkblock`. AutoSell must be off. Inventory capacity does not block these claims; CMI handles ground overflow.

## Local kit file

Copy `servers/Paper-26.3/plugins/CMI/Kits/ghosthunt.yml` to the live server's `plugins/CMI/Kits/ghosthunt.yml`. The matching versioned candidate is `config/cmi/kits/ghosthunt.yml`; full item and enchantment details are in `config/cmi/kits/ghosthunt.README.md`.

All five kits explicitly use `Enabled: false`, `DropOnGround: true`, `Delay: 10`, and no internal kit commands. Every stack has an event-themed custom title and four lore lines. Equipment retains normal durability. These are claimed item rewards, not LuckPerms or `/kits` unlocks.

| Kit | Stacks | Contents |
| --- | ---: | --- |
| `ghosthunt_day_1_2026` | 8 | Four enchanted diamond tools, exploration supplies and keepsake. |
| `ghosthunt_day_2_2026` | 8 | Full Protection IV diamond armor with copper Sentry trims, shield and extras. |
| `ghosthunt_day_3_2026` | 8 | Sword, bow, crossbow, trident, ammunition and spooky extras. |
| `ghosthunt_day_4_2026` | 10 | Elytra, fishing rod, storage, horn, Flight II rockets and building supplies. |
| `ghosthunt_bonus_box_2026` | 10 | Amethyst Silence-trimmed netherite suit with Protection V/Unbreaking IV, stronger sword/pickaxe, keepsake, four enchanted apples and a three-page storybook. |

Candidate SHA-256: `a6e7ea9bcb8a75707d83b9b989c55a341589816f9f2ff8c9426de2b6a5d01520`.

The original local placeholder file is backed up under `.scratch/ghost-kits-2026-10-28/before/`. No live kits were edited. Doors and HV kit contents are outside this change.

## Delivery and migration implementation

Ghost calls the existing reviewed CMI command adapter with `cmi kit <kit> <current exact player name> -s`. The adapter supports disabled item-only templates and observes actual inventory changes and/or overflow item entities. A console dispatch return value alone does not prove delivery.

Claims use the authoritative online server UUID. The receipt retains its original UUID and recorded name; a renamed account dispatches to the current exact name of that same online UUID. Java and `.bedrock` recipients are supported without external identity lookup. There are no LuckPerms user grants in this kit path.

A durable pre-dispatch boundary, UUID claim lock and observed delivery receipt prevent duplicate issuance. Claim-all runs sequentially and reports only verified payouts. Permission, session, death, claim calendar, world and AutoSell are checked again before dispatch. Reload invalidates queued continuations. Verified deliveries only finalize; uncertain failures cannot be forced into replay. Proven no-effect failures retain the staff retry path. Existing legacy receipt evidence remains distinguishable from new command-delivery evidence.

Backed-up migrations update the recognized unsnapshotted live contract from 80/20 to 24/6 and the approved dates. Events schema 5 adds `chunkblock`; rewards schema 6 updates old 20/80 and previous calendar-only six-head descriptions; themes schema 4 uses `/ghosthunt` in supplied commands/messages. Registry entries, wave assignments, snapshots and player progress are retained. The live configuration should migrate at startup; it does not need replacing with test-server data.

The protected-click fix consumes only authenticated registered Ghost block/item interactions before WorldGuard's normal handler and awards discoveries once from the main hand. Ordinary protection remains intact. A named WorldGuard region is not required by Ghost Hunt.

`/ghosthunt admin reload` retains the shared-host reload behavior, including enabled sibling runtime. It preserves Doors configuration/progress but clears dormant prepared Doors administration sessions. The Ghost module switch remains independent. Public plugin help/menu links now use `/ghosthunt`; owner-managed `/ghost` and `/halloween` aliases were not edited.

## Build verification

Canonical **build 820** completed through `scripts/build-all.sh` in **4m 40s**, after the maintained local server was stopped. Paper remains **26.3 STABLE build 227**, matching `26.3.build.227-stable` API. Exactly **67** active managed JARs match the canonical candidates by SHA-256; no disabled managed artifacts exist in this local set. All **2,412** `com/onemb` project classes use Java 25 bytecode, major version 69.

The canonical wrappers dynamically selected and validated Oracle Corporation JDK **25.0.5.0.3+1-LTS-2** for Gradle/compilation at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`, and Oracle Corporation JDK **27.0.1.0.3+1-2** for tests/runtime at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. Toolchains are explicit, `--release 25` remains, and JDK downloads are disabled.

Active-project automated results: **7,534 tests, zero failures/errors, 41 skips**, across 588 XML suites. EventHunts alone: **1,883 tests, zero failures/errors, 10 skips**. Dormant project outputs are excluded. Existing build-logic results were accepted as up to date.

Coverage includes catch-up on day two/four, mixed/incomplete snapshots, migration from live schema 3 and prior build 819, backup/idempotence, retained registry/state/Doors data, Bedrock/renamed recipients, sequential claims, full-inventory CMI overflow, late callbacks, denied/no-effect delivery, receipt persistence, uncertain retry refusal, reload before/after dispatch, session changes, teleport locking, AutoSell checks and stale menu feedback.

Final native startup completed at **11:26:44 Amsterdam**, using Oracle 27, Paper 227, CMI 9.8.11.0 and CMILib 1.6.1.0. All 44 actual CMI kit stacks passed metadata/serialization checks; each kit was disabled, commandless and explicitly allowed ground overflow. The final file digest above matches the generated, versioned and installed copies. Ghost production preflight reported **zero configuration issues**; the two registry findings are expected because the 24 live heads were not imported into the local test world. `/hv info` confirmed the retained November 2 hunting end and November 7 inclusive claim deadline. `/ghosthunt admin reload` completed successfully. There were no ERROR/SEVERE log records, and the local server stopped cleanly.

The migrations produced event/reward/theme schema versions **5/6/4**, added `chunkblock`, and selected the public `ghosthunt` command. Every preexisting Doors file, HV ledger/configuration, registry file and CMI kit file stayed byte-identical through this final startup/reload/shutdown. `state.yml` was only reordered and remains semantically identical. The temporary kit-authoring plugin and its exact remapped copy were removed.

`stageTestedJarsForLive` completed after shutdown. The **67 JARs in `build/tested-jars/live/`** byte-match the exact final tested server set. The EventHunts artifact is `1MB-Lib-EventHunts-v1.0.4-820-j25-26.3.jar`. Staging created only a local handoff; the live server was not stopped, restarted or written to.

The official [Paper index](https://docs.papermc.io/llms.txt), [event listener documentation](https://docs.papermc.io/paper/dev/event-listeners/), [scheduler documentation](https://docs.papermc.io/paper/dev/scheduler/) and [26.3 API](https://jd.papermc.io/paper/26.3/) informed the API review. Hosted Javadocs lag the selected build; exact 227 signatures were corroborated with the installed API artifact. No Paper version/channel change or unsafe protection-setting change was made during this final update.

## Owner's restart sequence

1. Stop live when ready and retain its existing JARs and affected configurations as rollback copies.
2. Replace the old complete 1MB Library suite with all 67 staged build-820 JARs from `build/tested-jars/live/`.
3. Copy the final `ghosthunt.yml` into live `plugins/CMI/Kits/` (merge older reward contents first if desired).
4. Start live; the existing live event/reward/theme settings migrate with backups while preserving the 24 registered heads.
5. Validate and activate the production snapshot:

```text
/hunt admin event status halloween_2026
/ghosthunt admin ghost validate
/ghosthunt admin event validate
/hunt admin event activate halloween_2026 --dry-run
/hunt admin event activate halloween_2026 --confirm
```

Require 24 valid enabled locations, six per wave, and no production configuration/registry issues. Ghost was already enabled on live, so reissuing heads or reassigning waves is unnecessary. The status/activation sequence creates or verifies the immutable production snapshot. Run ordinary Java/Bedrock head and reward claims in the protected area and allowed survival worlds as final player acceptance.

Subsequent Ghost kit content edits use CMI's supported reload and do not require another JAR rebuild. Event-file edits use `/ghosthunt admin reload`; the shared reload scope above applies.

Detailed evidence is retained under `.scratch/ghost-launch-final-2026-10-28/` and `.scratch/ghost-kits-2026-10-28/`. Native item serialization/loading is verified separately from connected-player claim acceptance; no live payout or connected-player gameplay test was performed by this task.
