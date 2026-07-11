# Compile Instructions

The Gradle scaffold is present. The current baseline is:

- Java 25+
- Paper 26.2+
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

`refreshBuildDocs` updates documented jar names and build metadata examples after `buildNumber` changes. `build` also runs `verifyBuildMetadata`, which fails if docs or generated debug metadata are stale.

To check whether the public Starlight docs mirror is current, run:

```bash
gradle checkPublicDocsSync
```

This is a read-only drift check against the public `1MB-Plugins-Docs` checkout. Use `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs repo is not in the default sibling folder.

Expected jar naming:

```text
1MB-CMIAPI-LIB-v1.0.0-527-j25-26.2.jar
1MB-CMIAPI-AFKShrine-v1.0.0-527-j25-26.2.jar
1MB-CMIAPI-StaffCenter-v1.0.0-527-j25-26.2.jar
1MB-CMIAPI-Profile-v1.0.0-527-j25-26.2.jar
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
