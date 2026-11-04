# Forage protected-camp region whitelist verification

Verified locally on 17 October 2026 in synchronized suite **1.0.4-780**, Paper **26.3 STABLE build 200**, WorldGuard **7.0.19+2400-f395a16** and WorldEdit **7.4.6-beta-02**. Gradle and bytecode target use JDK **25.0.4.1**; the maintained test servers use Java **27+35-2325**. No live-server files, commands, restarts or deployments were involved.

The subsequent [membership and dedicated-permission change](forage-protected-camp-membership-2026-10-17.md) tightens access in build 781. This record describes the original build 780 verification.

## Contract

`/forage admin camps regions list|add|remove` manages `protection.worldguard.protected-camp-regions`, a list of exact physical-world and WorldGuard region pairs. The global-only rule remains enabled by default. Every named region at a camp anchor must be approved. These exceptions affect registration and camp services, including the Initial Camp dependency and Community donation validation, without changing ordinary gathering, Brush or Dust guards. The commands do not change WorldGuard flags or memberships.

The existing camp ownership, physical requirements, world/biome restrictions, Local Introduction, workstation proximity and action-time checks remain mandatory. Removing approval blocks stale camp-service requests while retaining registrations and progress. Failed/virtual WorldGuard query results do not grant an exception. WorldGuard-cancelled composter interactions stay cancelled.

## Verification

- The full canonical build completed **6,242 test cases: 6,201 passed, 41 existing optional skips, zero failures or errors**. Forage accounted for **2,521 cases: 2,493 passed, 28 skips**.
- Focused administration, policy, adapter, persistence and integration checks passed, including exact world scope, all overlaps, malformed entries, missing providers, command permissions, dormant setup, tab completion, stale-entry removal, concurrent configuration edits, failed writes, reload persistence and preservation of existing camp command routes.
- Structured world/region entries round-trip through the shared settings writer without being converted to strings. Mixed records and unsupported nested values are rejected; existing scalar-list normalization remains unchanged.
- A temporary local-only probe passed **35 checks** against actual WorldGuard region queries and the production camp/gathering methods. It verified default denial, camp approval, continued gathering denial, unapproved overlaps, approval of all overlaps, identical region IDs in different worlds and immediate denial after removal.
- Both maintained instances started with matching sets of **66 managed JARs**. Forage diagnostics reported **zero configuration errors** on each; the two existing advisories concern the intentional normal balance preset and shared Sands family.
- WorldGuard region files and CMI Forage kit files matched their backups byte for byte. Existing Forage progress files remained semantically unchanged. The only semantic configuration addition was an empty `protected-camp-regions` list. `server.properties` changes were timestamp comments only.

The native probe was restricted by absolute server path, exact suite/Paper versions, reviewed WorldGuard version and an empty online-player list. It used temporary region definitions and detached settings, restored them in `finally`, and changed no player inventories, camp registrations, world blocks or Forage data files. Its temporary regions and plugin were removed afterward. This verifies server behavior; no connected-client session was used for this change.

## Evidence and API review

Local evidence is retained in `.scratch/forage-protected-camps-2026-10-17/`: `canonical-build.log`, `suite-test-report.json`, `forage-test-report.json`, `jar-verification.json`, `semantic-preservation.json`, test-server logs, stopped backups and `probe/result.json`.

Reviewed the current [Paper documentation index](https://docs.papermc.io/llms.txt), [Paper scheduling guidance](https://docs.papermc.io/paper/dev/scheduler/), the [Paper 26.3 scheduler API](https://jd.papermc.io/paper/26.3/org/bukkit/scheduler/BukkitScheduler.html), [WorldGuard region managers](https://worldguard.enginehub.org/en/latest/developer/regions/managers/) and [spatial query behavior](https://worldguard.enginehub.org/en/latest/developer/regions/spatial-queries/). The optional adapter reflects public WorldGuard/WorldEdit APIs only; installed JAR signatures and the native probe corroborate those calls. Configuration writes stay off-thread and command completion returns to the server thread.
