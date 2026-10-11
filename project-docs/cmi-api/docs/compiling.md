# Compile Instructions

## Shared Hunt feature

Door Hunt is source inside the compatibility-named `:plugins:player-fun:coconuthunt` project, not another Gradle plugin and not another JavaPlugin. Run `gradle :plugins:player-fun:coconuthunt:test` for the Coconut/Ghost/Door focused suite, then use `scripts/build-all.sh` for the suite-wide local test build. The centralized Java 25 and `paperApiVersion=26.3.build.166-beta` settings apply to all three modules; do not import the standalone build-number mutation or its Paper coordinate. The output remains one `1MB-Lib-EventHunts-v<version>-<build>-j25-26.3.jar` plus the normal library dependency.

The Gradle scaffold is present. The current baseline is:

- Java 25 bytecode, built and tested with JDK 25.0.4.1
- Java 27 on the live server; local runtime compatibility smoke testing uses JDK 27
- Paper 26.3 beta build 166 or newer
- Paper API `26.3.build.166-beta`
- separate jars for every feature
- a separate shared library jar

The canonical command for a new deployable local test build is:

```bash
scripts/build-all.sh
```

This command reserves the next shared build number, updates to the latest Paper build for the exact configured `paperTarget` and `paperChannel`, aligns the Paper API coordinate, refreshes generated documentation, runs the complete build and test gate, and synchronizes every suite JAR (currently 66) into both maintained servers, Paper and Forage. Both servers must be stopped before the workflow starts. It selects the primary Paper runtime first, pins the Forage runtime to that same exact version/channel/build, and verifies identical runtime bytes before compiling. It persists the build number and Paper API coordinate only after deployment verifies successfully. If an attempt fails, correct the problem and rerun the same command; the pending transaction reuses the same proposed build number.

Focused Gradle tasks are still appropriate during development. They do not create a new deployable build:

```bash
gradle :plugins:player-fun:<feature>:test
gradle :plugins:player-fun:<feature>:jar
```

Direct `gradle build` is also a verification command, not a release-to-test handoff. `refreshBuildDocs` updates every documented 1MB jar name, semantic-version/build example, checklist metadata line, and Paper build requirement from `gradle.properties`. `build` runs `verifyBuildMetadata`, which fails if docs or generated debug metadata are stale.

Build and test explicitly with JDK 25.0.4.1 even when the shell's default Java is newer. Older Java 25 installations have been removed. Run Gradle and the canonical build command with this environment:

```bash
(
  export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home
  export PATH="$JAVA_HOME/bin:$PATH"
  scripts/build-all.sh
)
```

The Gradle Java toolchain and Java 25 compiler target keep the jars runnable on Java 25. A separate Paper startup using JDK 27 verifies compatibility with the live server's Java 27 runtime. Keep `javaTarget=25`.

## Paper Channel Alignment

`gradle.properties` explicitly selects `paperTarget=26.3` and `paperChannel=BETA`. The default remains STABLE when the channel property is absent; experimental builds are never an automatic fallback. A later stable transition requires changing the channel, matching API coordinate, and both PaperScript channel settings together.

The canonical build command performs this check and update automatically without crossing the configured Paper version. For manual repair, request the latest beta build for the explicitly approved 26.3 target:

```bash
cd servers/Paper-26.3
./paperscript.sh --yes download --version 26.3 --channel BETA
./paperscript.sh status
```

The expected runtime is the staged `Paper-{version}-{build}.jar`, matching the maintained launcher's highest numbered JAR for that version. `verifyLocalPaperAlignment` and `scripts/build-all.sh` share a read-only validator for PaperScript identity, exact target/build, checksum, configured channel, and launcher selection. Complete `staged_*` state takes precedence over old `current_*` records; partial or invalid staged state is rejected. Legacy `Paper-{version}.jar` state remains supported only when no staged fields exist, and any numbered launcher selection must agree. The selected Paper build must match `paperApiVersion`. The Gradle gate checks both default synchronization targets, including their state/config/JAR inputs, and requires identical runtime bytes. Thus direct `gradle syncBuiltJarsToProjectServer` also refuses a stale, corrupt, or differently aligned clone before deployment. An explicit `projectJarSyncTarget` override validates only its selected server.

```bash
gradle verifyLocalPaperAlignment printProjectMetadata
```

`/1mblib version`, `/1mblib status`, inherited feature debug pages, PluginVersions debug output, and support bundles obtain the semantic version, build, Java target, Paper target, and exact compiled Paper API from generated `BuildConstants`.

Stop both the Paper 26.3 and Forage 26.3 test servers before running `syncBuiltJarsToProjectServer`. The task checks both configured worlds’ `session.lock` files before replacing anything and holds existing locks throughout coordinated replacement; overwriting a live jar can leave Paper's lazy plugin classloader unable to load classes that were not used before the replacement. Run `gradle planProjectJarSync` first for the same complete-set and manifest preflight without server mutation.

To check whether the public Starlight docs mirror is current, run:

```bash
gradle checkPublicDocsSync
```

This is a read-only drift check against the public `1MB-Plugins-Docs` checkout. Use `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs repo is not in the default sibling folder.

Expected jar naming:

```text
1MB-Lib-Core-v1.0.4-730-j25-26.3.jar
1MB-Lib-AntiFire-v1.0.4-730-j25-26.3.jar
1MB-Lib-AFKShrine-v1.0.4-730-j25-26.3.jar
1MB-Lib-StaffCenter-v1.0.4-730-j25-26.3.jar
1MB-Lib-Profile-v1.0.4-730-j25-26.3.jar
```

Every new deployable build synchronizes the same complete managed suite into both instance roots:

```text
servers/Paper-26.3/plugins/
servers/Forage-26.3/plugins/
```

`scripts/build-all.sh` is the normal entry point because it increments the suite build and updates Paper first. The Gradle task and retained copy helper are repair/redeployment paths for the already-persisted build:

```bash
gradle syncBuiltJarsToProjectServer
scripts/copy-built-jars-to-local-server.sh
```

All paths recognize legacy `1MB-CMIAPI-*` and current `1MB-Lib-*` artifacts as one managed family. Synchronization depends on the complete project build gate. Both targets are checked and staged before any old JAR moves; backups remain until both new sets verify. Failure in either target restores both prior sets. Configuration files, worlds, playerdata, and unrelated plugins are never synchronized.

Each server may have `1mb-library-disabled-artifacts.txt`, containing exact artifact stems, one per line (blank lines and `#` comments are allowed). The Forage beta uses:

```text
1MB-Lib-BedrockChatBridge
```

That artifact's matching build is placed in `plugins-disabled/1mb-library/`, because the beta has no Floodgate; the primary keeps it active. The complete suite remains identical by filename and bytes across each server's active plus deliberately disabled directories. Unknown policy entries and disabling Core are refused. Obsolete managed JARs are removed from both destinations only within the recoverable transaction.

Transactions live under each instance's `plugins-disabled/1mb-library-sync/transactions/` with the same transaction ID, staged `candidates/`, and `rollback/active/` plus `rollback/disabled/`. An interrupted or unresolved transaction blocks later plan/sync attempts across the pair. Inspect both instances and their `targets.txt` records before recovery; never delete rollback evidence blindly. A cleanup warning after successful verification means both suites are committed but retained evidence still needs inspection. Paper runtime download/alignment failures occur before plugin synchronization and leave the pending build number reusable; rerun the canonical workflow after fixing the cause.

The retained copy helper defaults to both servers. Its explicit path argument, or `-PprojectJarSyncTarget=/absolute/server/plugins`, deliberately overrides this with one repair target; it does not establish a new shared local-test build. Live handoff staging continues to use the complete primary Paper set. GameTypes/BentoBox deployment remains separate.

The previous `servers/Paper-26.2/` instance remains in place as the 1.0.3 build-699 rollback snapshot. Other retired server instances are stored under the Git-ignored `archive/` directory. Gradle does not build against, sync to, stage from, or test against archived instances; `servers/Paper-26.3/` and `servers/Forage-26.3/` are the maintained synchronization targets.

The project-local launch script requires Java 27 and discovers `java` through `PATH`. Run it with the installed JDK 27 for runtime compatibility smoke testing:

```bash
(
  export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-27.jdk/Contents/Home
  export PATH="$JAVA_HOME/bin:$PATH"
  ./servers/Paper-26.3/1MB-minecraft.sh
)
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
servers/Paper-26.3/compile-support/DiscordSRV-Build-1.30.5.jar
```

Keep DiscordSRV disabled or absent from `servers/Paper-26.3/plugins/` during
normal local CMI-API testing so server start/stop events do not post to live
Discord channels. Inspect actual JAR manifests, including Git-ignored files, before
starting Paper. DiscordChat isolates its DiscordSRV-specific types in its optional
bridge so the feature can load without connecting a Discord bot.

[Documentation index](README.md)
