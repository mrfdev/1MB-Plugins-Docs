# CoreProtect 25.0 RC1 Compatibility Check

Checked on 2026-09-04 against the supplied `CoreProtect-25.0-rc1.jar`.

## Result

**CoreProtect coexistence, API linkage, logging, lookup, and restart persistence passed on Java 25 and Paper 26.2.** The broader command smoke has a separate Door Hunt failure that also reproduces without CoreProtect, detailed below.

Neither the Shared Library nor any Feature Plugin currently integrates with CoreProtect. A case-insensitive source, resource, dependency, and configuration search found no CoreProtect references. Scanning all 64 current suite JARs also found no CoreProtect references in their classes or packaged configuration. No integration migration or new suite build was needed.

## Tested Components

| Component | Tested value |
| --- | --- |
| Java runtime and Gradle launcher | Oracle JDK 25.0.4 |
| Suite Java bytecode target | 25 |
| Paper release / channel / build | 26.2 / STABLE / 121 |
| Compiled Paper API coordinate | `26.2.build.121-stable` |
| Suite version / build / artifacts | 1.0.3 / 588 / 64 |
| CoreProtect | 25.0-rc1 |
| CoreProtect database used | SQLite |
| API probe compile dependency | CoreProtect 24.0, API 12 |

PaperMC's [official build service](https://fill.papermc.io/v3/projects/paper/versions/26.2/builds) returned 121 as the latest STABLE build. The maintained server and compile coordinate already matched it, so no Paper update was available. `verifyLocalPaperAlignment` verified the local JAR checksum and PaperScript configuration.

Artifact checksums:

| Artifact | SHA-256 |
| --- | --- |
| CoreProtect RC1 | `89a11ccba48140e5c0bb519364792077f633aa10ce8bad8f9169ab9e74997e32` |
| CoreProtect 24.0 comparison JAR | `3a0f6548a0534ee32601c94a6f0fcf201ac37bf90161947139d82664c7e10e00` |
| Paper server JAR | `0de30efb024bc8b83c9c7d507d11802897ad8056b6110ec09fe1a91d126ccb54` |

## API Version

The CoreProtect API version **changed from 12 to 13**. This was verified from the supplied JAR's `CoreProtectAPI.APIVersion()` bytecode and again on the running server. The Bukkit `plugin.yml` field `api-version: 1.16` remains unchanged; it is a different version contract.

The [CoreProtect v13 documentation](https://docs.coreprotect.net/api/version/v13/) states that the v12 methods are retained. Comparing public JVM signatures across the main API, typed results, lookup options, action enum, and events found no removed public members across 17 public types. Additions include entity-spawn action constants and `ParseResult.getEntityType()`.

A temporary Java 25 probe was compiled against the older CoreProtect 24.0 JAR and loaded against RC1. It successfully called `getAPI()`, `isEnabled()`, `APIVersion()`, `testAPI()`, `logPlacement()`, `performLookup()`, and `parseResult()`.

## Verification

- The full Gradle `build` verification gate passed under JDK 25.0.4. Suite JUnit reports contain 811 tests, zero failures, zero errors, and one skipped test. Unchanged Gradle task results were reused.
- Every built suite JAR matched the corresponding maintained test-server JAR byte for byte.
- An isolated server bound to localhost loaded all 64 suite plugins with RC1. Their runtime build metadata matched build 588.
- The probe queued a synthetic stone-placement audit record, retrieved it asynchronously, and verified its actor, material, coordinates, and action.
- After a clean stop and restart, the probe retrieved the same record without creating another one.
- Both RC1 runs enabled the complete suite and shut down successfully. There were no CoreProtect linkage or API probe failures.
- UpdateSmoke checked registered features, current build metadata, Paper/Java compatibility, external API hooks, commands, and placeholders. The run with RC1 and the control run without CoreProtect each produced **543 passing checks and the same four failing checks**. Command dispatch results were 383/387; command registration was 11/11 and placeholders were 5/5.

The isolated server used fresh configuration and copies of CMI, CMILib, PlaceholderAPI, LuckPerms, Vault, floodgate, and DiscordSRV. DiscordSRV's bot token was empty and no channel connection was configured. Its expected missing-token error prevented a Discord connection while allowing DiscordChat to resolve DiscordSRV's bundled classes. An initial fixture without that JAR could not load DiscordChat, so the required classes were included before the completed checks.

## Separate Door Hunt Finding

With Door Hunt dormant in the fresh configuration, these command smoke paths throw a `NullPointerException`:

- `/reloadtotconfig`
- `/reloadtotconfig help`
- `/reloadtotconfig info`
- `/reloadtotconfig debug all`

The failure rows are identical with and without CoreProtect. Source inspection shows that `TrickOrTreatCommand.reload()` calls `DoorHuntModule.reloadAll()`, which dereferences `doors` before the dormant module has initialized that service. This issue was recorded without changing gameplay code as part of the CoreProtect compatibility check.

This pass covers suite startup, console smoke paths, and a CoreProtect API logging/persistence sample. Connected-player gameplay, rollback/restore behavior, and MySQL/DuckDB storage were not exercised.

## Local Evidence and State

The ignored `.scratch/coreprotect25-compatibility/` directory contains the API signature and bytecode comparisons, Paper build-service response, suite artifact checksums, Gradle log, temporary probe source, reproducible setup/run scripts, runtime logs, both UpdateSmoke reports, and their comparison.

The maintained server remains stopped with its original complete build 588 set. RC1 and the temporary probe are installed only in the stopped isolated fixture. Suite source, release metadata, and maintained runtime JARs were unchanged by this check.

[Documentation index](../README.md)
