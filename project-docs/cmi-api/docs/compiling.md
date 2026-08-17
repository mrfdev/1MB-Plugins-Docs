# Compile Instructions

## Shared Hunt feature

Door Hunt is source inside the compatibility-named `:plugins:player-fun:coconuthunt` project, not another Gradle plugin and not another JavaPlugin. Run `gradle :plugins:player-fun:coconuthunt:test` for the Coconut/Ghost/Door focused suite, then `gradle clean refreshBuildDocs build` for the repository gate. The centralized Java 25 and `paperApiVersion=26.2.build.112-stable` settings apply to all three modules; do not import the standalone build-number mutation or its Paper coordinate. The output remains one `1MB-Lib-EventHunts-v<version>-<build>-j25-26.2.jar` plus the normal library dependency.

The Gradle scaffold is present. The current baseline is:

- Java 25 bytecode, built with JDK 25.0.4
- Java 26.0.2 runtime compatibility smoke testing
- Paper 26.2 stable build 112 or newer
- Paper API `26.2.build.112-stable`
- separate jars for every feature
- a separate shared library jar

Expected build command:

```bash
./gradlew clean refreshBuildDocs build
```

If a Gradle wrapper has not been generated yet, use the installed Gradle command:

```bash
gradle clean refreshBuildDocs build
```

`refreshBuildDocs` updates every documented 1MB jar name, semantic-version/build example, checklist metadata line, and Paper stable-build requirement from `gradle.properties`. `build` also runs `verifyBuildMetadata`, which fails if docs or generated debug metadata are stale.

Build releases explicitly with JDK 25.0.4 even when the shell's default Java is newer:

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-25.0.4.jdk/Contents/Home \
PATH="$JAVA_HOME/bin:$PATH" \
gradle clean refreshBuildDocs build
```

The Gradle Java toolchain and `--release 25`-compatible compiler target keep the jars runnable on Java 25. A separate Paper startup using JDK 26.0.2 verifies forward runtime compatibility; it does not change the bytecode target.

## Paper Stable Alignment

The maintained test server uses PaperScript's stable channel and a build-number-free engine filename:

```bash
cd servers/Paper-26.2
./paperscript.sh update
./paperscript.sh status
```

The expected jar is `Paper-26.2.jar`. `verifyLocalPaperAlignment` reads PaperScript's saved state and configuration, checks the jar checksum, confirms `STABLE` channel selection and `Paper-{version}.jar` naming, and requires the installed Paper build to match `paperApiVersion`.

```bash
gradle verifyLocalPaperAlignment printProjectMetadata
```

`/1mblib version`, `/1mblib status`, inherited feature debug pages, PluginVersions debug output, and support bundles obtain the semantic version, build, Java target, Paper target, and exact compiled Paper API from generated `BuildConstants`.

Stop the Paper 26.2 test server before running `syncBuiltJarsToProjectServer`. The task checks the configured world's `session.lock` and refuses to replace loaded plugin jars while Paper is running; overwriting a live jar can leave Paper's lazy plugin classloader unable to load classes that were not used before the replacement. Run `gradle planProjectJarSync` first for the same complete-set and manifest preflight without server mutation.

To check whether the public Starlight docs mirror is current, run:

```bash
gradle checkPublicDocsSync
```

This is a read-only drift check against the public `1MB-Plugins-Docs` checkout. Use `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs repo is not in the default sibling folder.

Expected jar naming:

```text
1MB-Lib-Core-v1.0.3-579-j25-26.2.jar
1MB-Lib-AntiFire-v1.0.3-579-j25-26.2.jar
1MB-Lib-AFKShrine-v1.0.3-579-j25-26.2.jar
1MB-Lib-StaffCenter-v1.0.3-579-j25-26.2.jar
1MB-Lib-Profile-v1.0.3-579-j25-26.2.jar
```

After a successful feature or library build, copy the output jar into:

```text
servers/Paper-26.2/plugins/
```

The Gradle task is the authoritative deployment path; the retained shell helper delegates to it so both entry points have identical safeguards:

```bash
gradle syncBuiltJarsToProjectServer
scripts/copy-built-jars-to-local-server.sh
```

Both paths recognize legacy `1MB-CMIAPI-*` and current `1MB-Lib-*` artifacts as one managed family. Preflight requires the exact current count and suffix, Core, the expected source-project Paper identity set, and unique primary/provided identities. Candidates and prior active JARs are staged under `plugins-disabled/1mb-library-sync/transactions`; successful activation verifies names, manifests, identities, and bytes before removing the transaction. A normal activation or verification failure restores the exact prior active set. If the process is interrupted, later plan/sync attempts fail closed while the transaction remains: inspect its `rollback/`, `candidates/`, and active server set before recovery, and never delete that transaction blindly. GameTypes/BentoBox deployment remains separate from this repository-local sync flow.

Retired server instances are stored under the Git-ignored `archive/` directory. Gradle does not build against, sync to, stage from, or test against archived instances; `servers/Paper-26.2/` is the sole active repository-local target.

The project-local launch script defaults to JDK 25.0.4. Override it for the Java 26 compatibility smoke without editing the script:

```bash
JAVA_BIN=/Library/Java/JavaVirtualMachines/jdk-26.0.2.jdk/Contents/Home/bin/java \
./servers/Paper-26.2/1MB-minecraft.sh
```

After the Paper test server has been used for live testing, stage exactly those tested jars for a manual live deployment:

```bash
gradle stageTestedJarsForLive
```

The staged jars are written to `build/tested-jars/live/`. Staging atomically replaces an earlier handoff only after the active server proves it contains the complete exact current build; a failed preflight leaves the prior handoff untouched. No live server or RCON path is used.

The centralized server tooling may still be used for temporary automated test instances.

Optional compile-only plugin API jars should not live in the active local test
server `plugins/` folder unless the test server intentionally needs to load
them. For example, the TeamMsg modules compile against DiscordSRV's API
from:

```text
servers/Paper-26.2/compile-support/DiscordSRV-1.30.5-SNAPSHOT-18f33ad.jar
```

Keep DiscordSRV disabled or absent from `servers/Paper-26.2/plugins/` during
normal local CMI-API testing so server start/stop events do not post to live
Discord channels.

[Documentation index](README.md)
