# Paper 26.3 transition, 25 September 2026

1MB Library **1.0.3 build 699** is the final Paper 26.2-focused snapshot. The annotated tag [`v1.0.3-paper-26.2`](https://github.com/mrfdev/1MB-Library/tree/v1.0.3-paper-26.2) points to commit `9d1265469ffbf2d805540b9988a7134b1b08aa14`. Its compile API is `26.2.build.129-stable` and its bytecode target is Java 25.

The owner reported that those JARs work on Paper 26.3. The existing local `test-1mb-3.14-mc-26.3` startup log independently records Paper 26.3 alpha build 40, Java 27 (`27+35-2325`), all 65 suite plugins loading as `1.0.3-699`, and server readiness without suite enable errors. All 65 JARs in that test instance have the same SHA-256 as the preserved build-699 set. This records startup compatibility; it is not a claim that every gameplay path was accepted on 26.3.

**1.0.4 build 700** begins the Paper 26.3 focus. All 65 managed JARs share that version/build, retain Java 25 bytecode, and declare Paper 26.3 in their generated plugin descriptors. Build and unit-test JDK: **25.0.4.1**. Live and maintained test runtime: **Java 27**, locally **27+35-2325**.

## Exact Paper baseline

- Target: `26.3`; explicitly selected channel: `ALPHA`.
- Paper build: **41**, published 25 September 2026 at 03:26:20 UTC.
- Compile/test coordinate: `io.papermc.paper:paper-api:26.3.build.41-alpha`.
- Server JAR: `Paper-26.3-41.jar`.
- SHA-256: `2b77166ee61886a9bc9ab33dc9e4847fa3538b36d9ba6e5f2fa7ed90973aa748`.

Reviewed the [Paper documentation index](https://docs.papermc.io/llms.txt), [updating guide](https://docs.papermc.io/paper/updating/), [roadmap and deprecation policy](https://docs.papermc.io/paper/dev/roadmap/), [project setup](https://docs.papermc.io/paper/dev/project-setup/), [26.3 Javadocs](https://jd.papermc.io/paper/26.3/), [official build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/41), and Maven publication metadata. The Javadocs identified themselves as build 41 alpha during review. The exact build's [global](https://github.com/PaperMC/Paper/blob/a15fed9c16a5cc93e4ff38d6e2135623e2dc9daa/paper-server/src/main/java/io/papermc/paper/configuration/GlobalConfiguration.java) and [world](https://github.com/PaperMC/Paper/blob/a15fed9c16a5cc93e4ff38d6e2135623e2dc9daa/paper-server/src/main/java/io/papermc/paper/configuration/WorldConfiguration.java) configuration sources retain safe exploit defaults. Piston duplication, unsafe end-portal teleportation, tripwire validation bypasses, and oversized-component sanitizer exclusions remain disabled in the cloned server.

The 26.3 change history includes Post Effect API additions and deprecations for PotionEffectTypeCategory, PlayerAnimationEvent, and the Bukkit/Server PotionBrewer accessor. This release does not adopt experimental gameplay APIs or change plugin identity/PDC/data namespaces.

## Local instances and dependencies

`servers/Paper-26.2/` is preserved in place with the complete build-699 JAR set. It is rollback material and is excluded from current build/sync/staging paths. Do not start it against worlds subsequently saved by 26.3; use its preserved world copy.

`servers/Paper-26.3/` is an independent copy of the stopped 26.2 instance. It uses loopback port **22333**, Bedrock loopback port **19233**, tmux session **onemblibrary263**, and `/Library/Java/JavaVirtualMachines/jdk-27.jdk/Contents/Home`. PaperScript selects ALPHA for both default downloads and latest-channel checks; the launcher selects the greatest numbered 26.3 JAR. Runtime directories remain Git-ignored.

The following owner-provided JARs were copied from the existing 26.3 test instance. Earlier LuckPerms, FAWE, and WorldGuard JARs in the clone were moved to `plugins-disabled/paper-26.3-upgrade/`; WorldEdit replaces FAWE for this test instance.

| Dependency | SHA-256 |
| --- | --- |
| LuckPerms-Bukkit-5.5.85.jar | `dc637ce18f48d3b75a7ffd1784b85be16a627359090dfe5adf15dab6d145dc7d` |
| worldedit-bukkit-7.4.6-beta-02.jar | `166365c44bad4cd916200b288cf391d3770e3197d1eca84ff74f3914d933e289` |
| worldguard-bukkit-7.0.19.jar | `396df065f1cf38bab9878a0f53a776d5a085ebbf3c41813938b73f95d4eaca03` |
| Geyser-Spigot.jar (2.12.0-SNAPSHOT) | `a657cdd2120a6e19c6d996fb384f40c9d429add619c304bde4cf13c649afe151` |

The initial startup exposed a CraftItemStack reflection failure in the cloned Geyser 2.11.3 build. It was backed up and replaced with the owner’s local 2.12.0 build while Paper was stopped; the repeated smoke test passed.

StartupDoctor, UpdateSmoke, and PluginVersions checks in the new instance are aligned to 26.3; custom checks in other servers are preserved and should be reviewed during their upgrade. Compile-only DiscordSRV remains outside the active plugins folder, preventing local start/stop notifications to Discord.

## Verification

- Canonical `scripts/build-all.sh` passed on JDK 25.0.4.1: **2,875 tests**, **zero failures/errors**, **one existing optional skip**. The failed first attempt exposed a stable-only release-metadata test assumption; the retry reused build 700. No extra build number was consumed.
- All **65** built/server JAR pairs have matching SHA-256, uniform `1.0.4-700` plugin versions, Paper API descriptors of `26.3`, and Java class major **69** (Java 25). The 65 original JARs plus launcher, PaperScript, and server configuration hashes in the preserved 26.2 instance are unchanged.
- Build-workflow regression fixtures passed for explicit ALPHA/BETA, legacy STABLE defaults, channel/API/checksum/launcher mismatches, invalid staged state, rollback, and reuse of a pending number.
- Paper **26.3-41** started on Java **27+35-2325**, enabled all **65** suite plugins, reached readiness, reported the intended compile/runtime metadata, disabled all 65 plugins on `stop`, saved every world, and exited **0**. The final run contains **zero ERROR log entries**.
- UpdateSmoke: **pass**, **562 checks**, 10/10 required commands, 5/5 placeholders, 64 shared features. Read-only command dispatch reached the configured cap: **400 executed successfully**, with one cap notice (`400/401` report entries). StartupDoctor Paper Safety: **safe**, **15 passes**, zero failures/warnings/notes. PluginVersions gate: **ok**, zero issues/warnings.
- Compilation emitted existing unchecked-operation notes and the Mockito/bootstrap class-sharing JVM warning; no Java deprecation warnings or Paper API source changes were required.

The final runtime retains non-fatal third-party notices: LuckPerms/Commodore final-field mutation on Java 27, ViaVersion’s lack of newer compatible client versions, an older ItemSoulBind configuration, and WorldGuardExtraFlags’ deprecated player-spawn event listener. Existing local hunt setup/debug warnings are not gameplay acceptance. These are recorded rather than suppressed by changing JVM or protection settings.

Detailed local evidence is retained under `.scratch/paper-26.3-upgrade/`, including `build.log`, `artifacts.json`, and `smoke-java27-updated-geyser.log`. Both repository-local server instances are left stopped. The public documentation mirror is refreshed locally; publishing it is separate from this source release.

## Acceptance boundary

Connected-player gameplay acceptance remains required before using `gradle stageTestedJarsForLive` for the manual live handoff. This task does not deploy to the live server. Forage remains behind its existing camp-integration and gameplay release gate; upgrading Paper alone does not activate it. WorthHelper's curated villager-trade dataset remains pinned to its audited 26.2 baseline and has not been certified as 26.3 trade data by this release.
