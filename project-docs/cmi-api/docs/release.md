# Release Process

This project uses separate jars for the shared library and every feature plugin.

The Hunt exception is internal modularity, not an extra artifact: Coconut Hunt, Ghost Hunt, and Door Hunt all ship in `1MB-Lib-EventHunts-*`. Its Paper plugin identity remains `1MB-CMIAPI-EventHunts`; the Java project/package and established CoconutHunt data namespaces also remain compatibility details. Never package or activate the clean-room standalone Doors JavaPlugin beside it. Before a Hunt release, run the 60-door importer fixture tests, focused Hunt suite, full documentation/build gate, exact Paper 26.2 startup/shutdown, migration dry-run/confirm/idempotency check, module health checks, and connected-player reward/interaction matrix. Preserve the standalone data and old JAR as rollback material until that acceptance pass is complete.

## Activation Safety

Fresh feature configs use the central `FeatureInstallPolicy` allowlist. The required library, standalone AntiFire, and the documented live features start enabled; every other shared feature starts fail closed in dormant mode with `enabled: false`. A dormant feature remains loaded and green in Paper's `/plugins` output, but does not register gameplay listeners, tasks, placeholders, services, hooks, or an actionable player command surface. It retains only `info`, `help`, safe shared `debug`, and `/<feature-command> debug enable true|false` for authorized lifecycle management. Existing server config values are never replaced by this default.

Before changing the allowlist, update its focused test and the installation documentation together. A clean-install verification must confirm that a non-allowlisted jar creates a disabled config, stays green and loaded, reports `dormant`, exposes only the restricted dormant command surface, and registers no gameplay behavior. It must also confirm that live activation, live return to dormant mode, and an existing test-server config containing `enabled: true` work normally.

## Release Baseline

The current release baseline is Java 25 bytecode built with JDK 25.0.4, compatibility-smoked on JDK 26.0.2, and Paper 26.2 stable build 111 or newer. Gradle compiles against `paper-api:26.2.build.111-stable`.

The current source rollback point is recorded in [Live-Tested Working Baseline: 2026-08-15](compatibility-baselines/live-tested-working-2026-08-15.md). The exact pre-CMI-9.8.9.6 rollback combination is recorded in [Live-Tested Baseline: 2026-08-02](compatibility-baselines/live-tested-2026-08-02.md). The isolated replacement boot and remaining player test matrix are recorded in [CMI 9.8.9.6 Chat Compatibility Pass](compatibility-tests/cmi-9.8.9.6-chat.md).

Before changing source release metadata:

```bash
cd servers/Paper-26.2
./paperscript.sh update
./paperscript.sh status
```

Keep PaperScript on `STABLE`, retain `Paper-{version}.jar`, then align `paperApiVersion` with the installed stable build. `gradle verifyLocalPaperAlignment` fails when the local PaperScript state, stable-channel configuration, build-number-free jar name, checksum, or compile API build differs.

## Jar Naming

All jars should follow this shape:

```text
1MB-Lib-<Feature>-v<version>-<build>-j25-26.2.jar
```

Examples:

```text
1MB-Lib-Core-v1.0.3-571-j25-26.2.jar
1MB-Lib-AntiFire-v1.0.3-571-j25-26.2.jar
1MB-Lib-AFKShrine-v1.0.3-571-j25-26.2.jar
1MB-Lib-RecordingMode-v1.0.3-571-j25-26.2.jar
1MB-Lib-SellStreaks-v1.0.3-571-j25-26.2.jar
1MB-Lib-ScheduledTips-v1.0.3-571-j25-26.2.jar
1MB-Lib-Visit-v1.0.3-571-j25-26.2.jar
1MB-Lib-PassportDiscovery-v1.0.3-571-j25-26.2.jar
1MB-Lib-SocialGatherings-v1.0.3-571-j25-26.2.jar
1MB-Lib-JourneyMap-v1.0.3-571-j25-26.2.jar
1MB-Lib-KitStreaks-v1.0.3-571-j25-26.2.jar
1MB-Lib-Nick-v1.0.3-571-j25-26.2.jar
1MB-Lib-EmoteMenu-v1.0.3-571-j25-26.2.jar
1MB-Lib-PvPToggle-v1.0.3-571-j25-26.2.jar
1MB-Lib-Boosters-v1.0.3-571-j25-26.2.jar
1MB-Lib-NameMC-v1.0.3-571-j25-26.2.jar
1MB-Lib-Exchange-v1.0.3-571-j25-26.2.jar
1MB-Lib-VoteTokens-v1.0.3-571-j25-26.2.jar
1MB-Lib-DiscordChat-v1.0.3-571-j25-26.2.jar
1MB-Lib-GameTypes-v1.0.3-571-j25-26.2.jar
1MB-Lib-BirthdayLanterns-v1.0.3-571-j25-26.2.jar
1MB-Lib-LavaBoots-v1.0.3-571-j25-26.2.jar
1MB-Lib-Spawners-v1.0.3-571-j25-26.2.jar
1MB-Lib-Collect-v1.0.3-571-j25-26.2.jar
1MB-Lib-EventHunts-v1.0.3-571-j25-26.2.jar
1MB-Lib-DropParty-v1.0.3-571-j25-26.2.jar
1MB-Lib-Appreciation-v1.0.3-571-j25-26.2.jar
1MB-Lib-Forage-v1.0.3-571-j25-26.2.jar
1MB-Lib-MobHat-v1.0.3-571-j25-26.2.jar
1MB-Lib-PlayerTodo-v1.0.3-571-j25-26.2.jar
1MB-Lib-Refer-v1.0.3-571-j25-26.2.jar
1MB-Lib-TPAuto-v1.0.3-571-j25-26.2.jar
1MB-Lib-Menu-v1.0.3-571-j25-26.2.jar
1MB-Lib-StaffCenter-v1.0.3-571-j25-26.2.jar
1MB-Lib-Profile-v1.0.3-571-j25-26.2.jar
1MB-Lib-ContentGuard-v1.0.3-571-j25-26.2.jar
1MB-Lib-WarningLens-v1.0.3-571-j25-26.2.jar
1MB-Lib-TeamMsg-v1.0.3-571-j25-26.2.jar
1MB-Lib-CmdCostDashboard-v1.0.3-571-j25-26.2.jar
1MB-Lib-CMIConfig-v1.0.3-571-j25-26.2.jar
1MB-Lib-ConsoleNoiseRouter-v1.0.3-571-j25-26.2.jar
1MB-Lib-EconomyGuardian-v1.0.3-571-j25-26.2.jar
1MB-Lib-StartupDoctor-v1.0.3-571-j25-26.2.jar
1MB-Lib-UpdateSmoke-v1.0.3-571-j25-26.2.jar
1MB-Lib-PluginVersions-v1.0.3-571-j25-26.2.jar
1MB-Lib-Placeholders-v1.0.3-571-j25-26.2.jar
1MB-Lib-Potions-v1.0.3-571-j25-26.2.jar
1MB-Lib-Upgrade-v1.0.3-571-j25-26.2.jar
1MB-Lib-EndCrystals-v1.0.3-571-j25-26.2.jar
1MB-Lib-WorldSnapshot-v1.0.3-571-j25-26.2.jar
1MB-Lib-SparkReviewer-v1.0.3-571-j25-26.2.jar
1MB-Lib-Hoppers-v1.0.3-571-j25-26.2.jar
1MB-Lib-EventRecorder-v1.0.3-571-j25-26.2.jar
1MB-Lib-BedrockChatBridge-v1.0.3-571-j25-26.2.jar
1MB-Lib-CMIProbe-v1.0.3-571-j25-26.2.jar
1MB-Lib-CMIDatabase-v1.0.3-571-j25-26.2.jar
1MB-Lib-PermissionProbe-v1.0.3-571-j25-26.2.jar
1MB-Lib-WarpAudit-v1.0.3-571-j25-26.2.jar
1MB-Lib-WorthDrift-v1.0.3-571-j25-26.2.jar
1MB-Lib-WorthHelper-v1.0.3-571-j25-26.2.jar
```

## Local Build

```bash
gradle clean refreshBuildDocs build
```

When a Gradle wrapper exists:

```bash
./gradlew clean refreshBuildDocs build
```

`BuildConstants.java` is generated by Gradle from `gradle.properties`, so `/1mblib version`, `/1mblib status`, inherited feature debug output, PluginVersions debug output, support bundles, plugin.yml versions, jar filenames, and docs all use the same release source. The runtime views show both the exact compiled Paper API and the actual server API/engine. `gradle build` runs `verifyBuildMetadata` and fails when any documented 1MB jar example, semantic-version/build example, checklist metadata line, stable Paper requirement, or generated constant is stale. After changing release metadata, run `gradle refreshBuildDocs` before the build.

## Public Docs Sync Check

Before release handoff or public-docs updates, run:

```bash
gradle checkPublicDocsSync
```

This read-only check compares this private repo's `README.md` and `docs/` against its isolated public `1MB-Plugins-Docs/project-docs/cmi-api/` namespace, regenerates the complete multi-project Starlight site in a temporary copy without replacing other project sources, compares it with the committed public site content, and verifies the GitHub Pages domain metadata for `https://docs.1moreblock.com`.

If it reports drift, refresh the public docs repo from that repo:

```bash
PRIVATE_DOCS_SOURCE=/Users/floris/Projects/Codex/CMI-API npm run docs:sync
npm run build
```

Then review, commit, and push the public docs repository separately.

## Copy To Project Test Server

Every successful library or feature build should copy matching jars into:

```text
servers/Paper-26.2/plugins/
```

For v1.0.3, do not use either command until the deployment workflow safely manages both legacy `1MB-CMIAPI-*` and new `1MB-Lib-*` JAR families:

```bash
gradle syncBuiltJarsToProjectServer
```

or:

```bash
scripts/copy-built-jars-to-local-server.sh
```

After that dual-prefix gate is complete, the Gradle task will replace the project JAR family in `servers/Paper-26.2/plugins/` and verify that active project JARs match the current build metadata. GameTypes/BentoBox deployment is handled outside the repository-local sync flow because the BentoBox environment is no longer a local repository test instance.

Retired local servers live under the Git-ignored `archive/` directory and are excluded from build, sync, staging, and test workflows. Do not point release tasks at an archived server; `servers/Paper-26.2/` is the only active repository-local test target.

## Stage Tested Jars For Live

After the Paper test server has loaded and tested the jars, stage that tested set for a deliberate live deployment:

```bash
gradle stageTestedJarsForLive
```

This copies the active tested jars from `servers/Paper-26.2/plugins/` into:

```text
build/tested-jars/live/
```

This task does not touch live servers and does not use RCON. It is only a clean handoff folder for the jars that were actually tested locally.

## GitHub Repository

The private project repository is:

```text
https://github.com/mrfdev/1MB-CMIAPI
```

[Documentation index](README.md)
