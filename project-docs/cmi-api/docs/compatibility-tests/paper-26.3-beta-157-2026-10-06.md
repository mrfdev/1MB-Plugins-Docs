# Local Paper 26.3 BETA build 157 verification, 6 October 2026

The maintained local server was updated from Paper **26.3 BETA 152** to **157** and passed the automated compatibility checks below. The canonical suite build is **1.0.4 build 722**, compiled and tested with **JDK 25.0.4.1**, retaining Java 25 bytecode. Runtime testing used **Java 27+35-2325** at `127.0.0.1:22333`.

All work was local. The live server and the Paper 26.2 build-699 rollback instance were not changed. The maintained server was initially stopped and was left stopped after two clean startup/shutdown cycles. Paper 152 remains available locally; the prior 65 managed build-721 JARs and relevant metadata/configuration were preserved in the task evidence directory.

## Official change review

Discovery started at the live [Paper documentation index](https://docs.papermc.io/llms.txt), then covered the update guide, roadmap, deprecation list, configuration defaults, exact build metadata and API artifacts.

- [Build 157 metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/157) identifies BETA, published 5 October 2026, commit `4728a906edb501c3749dfcc437a419094a95a2c7`. The downloaded server SHA-256 is `77cdcd758777734b0b64db74974f68e56cb08637f3c36b26734842cb8521cc2e` and matches the official checksum.
- The published API is `io.papermc.paper:paper-api:26.3.build.157-beta`, SHA-256 `62436bed3ff5379a33e364f99a33ab748c9f9938dc32ad4a561c34e17b76437f`. All **2,348 API class files** match build 152 byte-for-byte; the dependency declarations also match.
- The [five-commit upstream comparison](https://github.com/PaperMC/Paper/compare/1a7b626576d41a6ddb0e3610ec0a1e3e59352093...4728a906edb501c3749dfcc437a419094a95a2c7) includes block-state snapshot handling, bundle obfuscation corruption, duplicate player removal during configuration switching, failed bucket-placement results and test-block packet permissions. No Paper API or configuration source changed.
- The [block-state change](https://github.com/PaperMC/Paper/commit/2de3a930cca7807143a95254989dc5962ef544a5) affects a path used by EventHunts skull markers. The native probe therefore verifies `getState(false)` live PDC behavior, isolated snapshots and marker updates.
- The [bundle change](https://github.com/PaperMC/Paper/commit/4728a906edb501c3749dfcc437a419094a95a2c7) warrants native bundle/component roundtrip checks. Local item obfuscation remains disabled. The probe does not claim coverage of client packet rendering or shelf obfuscation.

## Build and artifact checks

`scripts/build-all.sh` ran with an exact-build PaperScript adapter selecting 157 within the existing 26.3 BETA target. It completed `clean refreshBuildDocs build syncBuiltJarsToProjectServer`, reserved build 722 once and synchronized all **65 managed JARs**. Every deployed JAR matches its corresponding build output by SHA-256. All **1,971 project-owned class files** retain Java 25 class-file major version 69.

The clean suite produced **3,388 JUnit test cases: 3,383 passed, zero failures/errors, five skipped**. Four skipped cases are opt-in commercial Pyro JAR fixtures; the remaining case requires optional local ShopGUI+ fixture data. The build-logic gate also remained passing, with 19 tests up-to-date. Build metadata and exact Paper/API/launcher alignment checks passed.

## Runtime checks

| Check | Result |
| --- | --- |
| Temporary native Paper 157 probe | **213/213 passed** |
| All managed plugins enabled, same suite version | **65/65** |
| UpdateSmoke, first boot | **565 passed; zero warnings, failures or skips** |
| UpdateSmoke, restart without diagnostic JAR | **565 passed; zero warnings, failures or skips** |
| Read-only command dispatches per smoke run | **404/404** |
| Required commands / placeholders / registered features | **10/10 / 5/5 / 64** |
| Dependency version gate | **Zero issues or warnings** |
| Paper safety configuration | **15 passed; zero warnings or failures** |
| Local Minecraft status handshake | **Passed on both boots** |
| Startup, world save and shutdown | **Both cycles completed; exit code zero** |
| Runtime error/exception scan | **No errors found** |

The native probe covers bundle cloning, binary and in-memory YAML serialization, nested item amounts, data components and foreign PDC. It also checks live skull PDC, snapshot isolation, alternating live/snapshot getters and the marker update sequence used by Coconut item placement. Its single temporary skull occupied a verified empty area in an existing chunk and was restored before the probe reported success. No real players were online.

UpdateSmoke's dispatch cap was temporarily raised from 400 to 1,000 to exercise all 404 configured read-only dispatches. The original configuration was restored byte-for-byte after shutdown. The diagnostic JAR was removed before the second boot and is absent from the active plugin directory. Paper global and world-default configuration files remain byte-identical to their pre-test versions.

## Existing warnings and coverage limits

The startup warnings match the established local setup: OSHI's macOS version label, ViaVersion's lack of a newer compatible client mapping, ItemSoulBind configuration age, WorldGuardExtraFlags' deprecated spawn event, and EventHunts' empty Coconut locations, Ghost debug policy and Halloween Virus setup/readiness notices. No new Paper-update regression was found in the tested paths.

The private build metadata check passed. The separate read-only public documentation mirror check reported stale build metadata in README and 12 documentation files, plus existing changes in the public checkout. The mirror was not synchronized or published as part of this local-server task.

These checks establish automated build and local runtime compatibility. Real-client gameplay, reconnect/configuration-switch behavior, failed bucket interactions, shelf packet rendering and production load were not exercised. No live handoff was staged.

## Evidence

Task evidence is under `.scratch/paper157-2026-10-06/`: `build-all.log`, `test-results.json`, `artifact-verification.json`, both `*-updatesmoke.log` reports, both `*-clean.log` server logs, status handshake captures, Paper safety reports, `public-docs-drift.log`, the temporary probe source, and `review/` official-source/API comparison captures. The `before/` directory contains the local rollback metadata and managed JAR set.
