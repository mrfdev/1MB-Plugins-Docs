# Local test-server consolidation, 19 October 2026

Paper 26.3 is the sole maintained local test server. Forage 26.3 and Paper 26.2 were archived intact after the synchronized Paper instance passed its checks. The live server on m4pro-mini was used only as a read-only source; no live files, commands, lifecycle or player data were changed.

## Runtime and scope

- Retained the complete existing 66-JAR Library suite **1.0.4-785**, byte-for-byte verified against the canonical candidates. There were no production plugin source/resource changes and no new deployable build was produced.
- Retained Paper **26.3 stable build 205**, Java **27** runtime and JDK **25.0.4.1** for Gradle.
- Imported fresh live Forage `config.yml`, `quests.yml` and all **40** CMI Forage kit templates. All **23** daily/weekly/monthly quest kit links are populated.
- Imported exact live **Multiverse-Core 5.8.1** and **Multiverse-Inventories 5.3.6** JARs and configuration. No live player inventories or progression stores were imported.
- Copied beta `forage.schem` and `forage2.schem` into Paper's WorldEdit schematic directory. The beta Dappled Forest world remains in the complete beta archive, together with its registered camps and inventories.

## Intentional local differences

Forage retains local world authorization and a local protected-camp region list. Logical mappings are `wild=spawn`, `nether=spawn_nether`, `end=spawn_the_end`, `skyblock=bskyblock`, `acid=acidisland`, and unchanged matching names for general, cave, oneblock, chunkblock and skygrid. Spawn remains allowed so the existing local Initial Camp remains usable. Live's `wild/foragefriends` approval was not copied into an unrelated local WorldGuard registry.

Core's local `world.auto-purge-entities=false` and `world.enforce-access=false` were retained. Its local world registry and anchors were preserved. The imported inventory group was adapted to existing local worlds: spawn, spawn_nether, general, spawn_the_end, halloween, wild and summer share the default group. Acidisland, bskyblock, cave, chunkblock, oneblock and skygrid remain separate inventory contexts. Staff's first visit to one of those independent contexts starts fresh; existing login inventories are not replaced by imported live records.

The four participation maps retain IDs **12190, 12193, 12194 and 12195**. Their complete 16,384-byte image arrays match live's originals. Existing local maps were not replaced. The local map counter was advanced to reserve the imported IDs. Only these four imported maps were rebound to the local general-world UUID and locked to preserve the artwork against local terrain updates. Supported MapView setters were checked on Paper 26.3; because this implementation did not persist their dirty state by itself, the stopped-server map metadata was updated and verified after restart. Live maps were untouched.

## Data preservation

Existing Paper profiles, camp registrations, provenance chunks and Herbarium data are semantically unchanged. Existing transaction files are byte-identical. Enabling the imported community settings initialized an empty local 2026-fall Season Edition; no live participants or donations were copied.

The synthetic inventory regression identity never joined the server. After testing, its native player files, four provider profiles and disposable probe JAR were moved out of the server into the evidence directory. Checksums confirmed 39 unrelated provider/player files were unchanged by that cleanup.

## Verification

- Full Gradle `test` and `verifyBuildMetadata`: passed. Existing unaffected tasks were up-to-date.
- Shell build workflow suite: passed, including absent retired folders, retry/rollback, corrupt/incomplete deployments and disabled-artifact routing.
- Build-logic functional suite: **24 tests passed**; generic multi-target rollback coverage retained.
- Repointed Forage quest/source parity and WorthDrift real-configuration audits: passed against Paper 26.3.
- Runtime alignment, stopped-server, feature-install policy and metadata checks: passed. Alignment/stopped-server/metadata checks also passed after both old folders were physically archived.
- Forage configuration audit: **0 errors**, two existing live warnings (normal balance preset and intentional sand-family overlap).
- Forage kit audit: **53 reward references, 0 errors, 0 warnings**. No items awarded by the audit.
- Exact-runtime Multiverse save test: **266 checks passed**, 3,001 publications, 12 burst rounds, provider-owned saves, same-group and separate-group transfers, component/PDC and armor/offhand preservation, no real player mutations.
- Clean-restart recovery: **26 checks passed**, inventory and progress preserved, **zero additional native Multiverse inventory write requests**.
- Both startup/shutdown logs contained **zero ERROR entries** and no Multiverse exceptions. Existing unrelated local setup/update warnings remain.
- All four map images and reserved IDs verified after restart; all 66 Library JARs verified unchanged.

## Archives and evidence

Full directories, with per-file SHA-256 manifests verified after moving:

- `archive/servers/2026-10-19/Forage-26.3/`: **7,884 files**, 3,937,057,265 bytes.
- `archive/servers/2026-10-19/Paper-26.2/`: **8,842 files**, 3,247,745,207 bytes; retains build-699 rollback state.
- Original Paper backup: `archive/servers/2026-10-19/Paper-26.3-before-consolidation.tar`, with SHA-256 sidecar.

Detailed import manifests, local overrides, map pixel hashes, progress comparisons, logs, probe sources/results and cleanup receipts are in `.scratch/forage-server-consolidation-2026-10-19/`. These local server archives and evidence files are Git-ignored and are not public player documentation.

Ordinary development now uses only `servers/Paper-26.3/`. The canonical `scripts/build-all.sh` still reserves one suite build number, validates the selected Paper target, runs the complete gate and recoverably deploys the complete managed JAR set. Explicit repair targets and manually staged live handoffs remain supported. Archived instances are excluded from ordinary compilation, synchronization and test-server checks. Paper was left cleanly stopped after verification.
