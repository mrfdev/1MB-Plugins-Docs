# Compile Instructions

The Gradle scaffold is present. The current baseline is:

- Java 25 bytecode, built with JDK 25.0.4
- Java 26.0.2 runtime compatibility smoke testing
- Paper 26.2 stable build 87 or newer
- Paper API `26.2.build.84-stable`
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

`/1mbcmi version`, `/1mbcmi status`, inherited feature debug pages, PluginVersions debug output, and support bundles obtain the semantic version, build, Java target, Paper target, and exact compiled Paper API from generated `BuildConstants`.

Stop the Paper 26.2 test server before running `syncBuiltJarsToProjectServer`. The task checks the configured world's `session.lock` and refuses to replace loaded plugin jars while Paper is running; overwriting a live jar can leave Paper's lazy plugin classloader unable to load classes that were not used before the replacement.

To check whether the public Starlight docs mirror is current, run:

```bash
gradle checkPublicDocsSync
```

This is a read-only drift check against the public `1MB-Plugins-Docs` checkout. Use `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs repo is not in the default sibling folder.

Expected jar naming:

```text
1MB-CMIAPI-LIB-v1.0.1-559-j25-26.2.jar
1MB-CMIAPI-AntiFire-v1.0.1-559-j25-26.2.jar
1MB-CMIAPI-AFKShrine-v1.0.1-559-j25-26.2.jar
1MB-CMIAPI-StaffCenter-v1.0.1-559-j25-26.2.jar
1MB-CMIAPI-Profile-v1.0.1-559-j25-26.2.jar
```

After a successful feature or library build, copy the output jar into:

```text
servers/Paper-26.2/plugins/
```

The helper task and script handle the Paper test server sync:

```bash
gradle syncBuiltJarsToProjectServer
scripts/copy-built-jars-to-local-server.sh
```

The Gradle task copies all built 1MB-CMIAPI jars to the Paper test server, removes stale active project jars from that folder, and verifies the remaining active project jars match the current build metadata. The shell script targets one server folder at a time. GameTypes/BentoBox deployment is handled separately from this repository-local sync flow.

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

The staged jars are written to `build/tested-jars/live/`. No live server or RCON path is used.

The centralized server tooling may still be used for temporary automated test instances.

Optional compile-only plugin API jars should not live in the active local test
server `plugins/` folder unless the test server intentionally needs to load
them. For example, NotableMsg and 1MBStaffMsg compile against DiscordSRV's API
from:

```text
servers/Paper-26.2/compile-support/DiscordSRV-1.30.5-SNAPSHOT-18f33ad.jar
```

Keep DiscordSRV disabled or absent from `servers/Paper-26.2/plugins/` during
normal local CMI-API testing so server start/stop events do not post to live
Discord channels.

[Documentation index](README.md)
