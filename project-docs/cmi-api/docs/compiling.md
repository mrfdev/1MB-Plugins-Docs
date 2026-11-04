# Compile Instructions

## Shared Hunt feature

Door Hunt is source inside the compatibility-named `:plugins:player-fun:coconuthunt` project, not another Gradle plugin and not another JavaPlugin. Run `gradle :plugins:player-fun:coconuthunt:test` for the Coconut/Ghost/Door focused suite, then use `scripts/build-all.sh` for the suite-wide local test build. The centralized Java 25 and `paperApiVersion=26.3.build.241-stable` settings apply to all three modules; do not import the standalone build-number mutation or its Paper coordinate. The output remains one `1MB-Lib-EventHunts-v<version>-<build>-j25-26.3.jar` plus the normal library dependency.

The Gradle scaffold is present. The current baseline is:

- Java 25 bytecode, compiled with the installed Oracle JDK 25
- Installed Oracle JDK 27 for automated tests and local Paper runtime smoke testing; the live server is upgraded separately
- Paper 26.3 stable build 241 or newer
- Paper API `26.3.build.241-stable`
- separate jars for every feature
- a separate shared library jar

The canonical command for a new deployable local test build is:

```bash
scripts/build-all.sh
```

This command reserves the next shared build number, updates to the latest Paper build for the exact configured `paperTarget` and `paperChannel`, aligns the Paper API coordinate, refreshes generated documentation, runs the complete build and test gate, and synchronizes every suite JAR (currently 68) into the sole maintained server, `servers/Paper-26.3/`. Paper must be stopped before the workflow starts. The selected Paper runtime identity and bytes are verified before compiling. The workflow persists the build number and Paper API coordinate only after deployment verifies successfully. If an attempt fails, correct the problem and rerun the same command; the pending transaction reuses the same proposed build number.

Focused Gradle tasks are still appropriate during development. They do not create a new deployable build:

```bash
gradle :plugins:player-fun:<feature>:test
gradle :plugins:player-fun:<feature>:jar
```

Direct `gradle build` is also a verification command, not a release-to-test handoff. `refreshBuildDocs` updates every documented 1MB jar name, semantic-version/build example, checklist metadata line, and Paper build requirement from `gradle.properties`. `build` runs `verifyBuildMetadata`, which fails if docs or generated debug metadata are stale.

Use the repository launcher for focused Gradle work, even when the shell defaults to Java 27:

```bash
scripts/gradle-oracle.sh -q printJavaToolchains
scripts/gradle-oracle.sh :plugins:player-fun:<feature>:test
```

`scripts/build-all.sh` uses that same launcher automatically. It resolves the installed Java 25 and 27 paths using macOS `java_home` on every invocation, verifies Oracle's vendor and the requested major versions, runs Gradle on Java 25, and restricts toolchain discovery to those two installations. It defaults `GRADLE_USER_HOME` to the project-local `.gradle-codex` directory and disables JDK downloads. Upgrading an Oracle patch release therefore requires no path edit. An existing Gradle daemon or open shell does not change which paths a new launcher invocation selects.

For another machine, or explicit installed-path selection, set `ONE_MB_BUILD_JAVA_HOME` to Oracle JDK 25 and `ONE_MB_TEST_JAVA_HOME` to Oracle JDK 27. Both paths are validated before Gradle starts. A missing or incorrect JDK fails with a clear error instead of falling back to Homebrew Java or downloading another distribution.

Compiler toolchains are Oracle 25 with `--release 25`; automated tests, including the build-logic tests, launch on Oracle 27. `printJavaToolchains` reports the compiler, release target, runtime and Gradle JVM actually selected. Keep `javaTarget=25`. The Paper startup smoke test separately checks the resulting suite on Oracle 27.

## Paper Channel Alignment

`gradle.properties` explicitly selects `paperTarget=26.3` and `paperChannel=STABLE`, with build 175 as the approved baseline. The default remains STABLE when the channel property is absent; experimental builds are never an automatic fallback. Any later channel transition requires changing the channel, matching API coordinate and maintained PaperScript channel setting together.

The canonical build command performs this check and update automatically without crossing the configured Paper version. For manual repair, request the latest stable build for the explicitly approved 26.3 target:

```bash
cd servers/Paper-26.3
./paperscript.sh --yes download --version 26.3 --channel STABLE
./paperscript.sh status
```

The expected runtime is the staged `Paper-{version}-{build}.jar`, matching the maintained launcher's highest numbered JAR for that version. `verifyLocalPaperAlignment` and `scripts/build-all.sh` share a read-only validator for PaperScript identity, exact target/build, checksum, configured channel, and launcher selection. Complete `staged_*` state takes precedence over old `current_*` records; partial or invalid staged state is rejected. Legacy `Paper-{version}.jar` state remains supported only when no staged fields exist, and any numbered launcher selection must agree. The selected Paper build must match `paperApiVersion`. The Gradle gate checks the default Paper synchronization target, including its state/config/JAR inputs. Thus direct `gradle syncBuiltJarsToProjectServer` also refuses a stale, corrupt or differently aligned runtime before deployment. An explicit `projectJarSyncTarget` override validates its selected server instead; it does not implicitly target live or a retired archive.

```bash
gradle verifyLocalPaperAlignment printProjectMetadata
```

`/1mblib version`, `/1mblib status`, inherited feature debug pages, PluginVersions debug output, and support bundles obtain the semantic version, build, Java target, Paper target, and exact compiled Paper API from generated `BuildConstants`.

Stop the Paper 26.3 test server before running `syncBuiltJarsToProjectServer`. The task checks its configured worlds’ `session.lock` files before replacing anything and holds existing locks throughout replacement; overwriting a live jar can leave Paper's lazy plugin classloader unable to load classes that were not used before the replacement. Run `gradle planProjectJarSync` first for the same complete-set and manifest preflight without server mutation.

To check whether the public Starlight docs mirror is current, run:

```bash
gradle checkPublicDocsSync
```

This is a read-only drift check against the public `1MB-Plugins-Docs` checkout. Use `PUBLIC_DOCS_REPO=/path/to/1MB-Plugins-Docs` when the public docs repo is not in the default sibling folder.

Expected jar naming:

```text
1MB-Lib-Core-v1.0.4-835-j25-26.3.jar
1MB-Lib-AntiFire-v1.0.4-835-j25-26.3.jar
1MB-Lib-AFKShrine-v1.0.4-835-j25-26.3.jar
1MB-Lib-StaffCenter-v1.0.4-835-j25-26.3.jar
1MB-Lib-Profile-v1.0.4-835-j25-26.3.jar
```

Every new deployable build synchronizes the complete managed suite into the maintained server:

```text
servers/Paper-26.3/plugins/
```

`scripts/build-all.sh` is the normal entry point because it increments the suite build and updates Paper first. The Gradle task and retained copy helper are repair/redeployment paths for the already-persisted build:

```bash
gradle syncBuiltJarsToProjectServer
scripts/copy-built-jars-to-local-server.sh
```

All paths recognize legacy `1MB-CMIAPI-*` and current `1MB-Lib-*` artifacts as one managed family. Synchronization depends on the complete project build gate. The target is checked and candidates are staged before any old JAR moves; backups remain until the new complete set verifies. Failure restores the prior suite. Configuration files, worlds, playerdata and unrelated plugins are never synchronized by these build tasks.

The server may have `1mb-library-disabled-artifacts.txt`, containing exact artifact stems, one per line (blank lines and `#` comments are allowed). For example, a deliberately reviewed test environment without Floodgate can list:

```text
1MB-Lib-BedrockChatBridge
```

That artifact's matching build is placed in `plugins-disabled/1mb-library/`. This is an example policy, not a request to disable an integration in the maintained server. The complete suite must match by filename and bytes across the server's active plus deliberately disabled directories. Unknown policy entries and disabling Core are refused. Obsolete managed JARs are removed from those destinations only within the recoverable transaction.

Transactions live under the server's `plugins-disabled/1mb-library-sync/transactions/` with their transaction ID, staged `candidates/`, and `rollback/active/` plus `rollback/disabled/`. An interrupted or unresolved transaction blocks later plan/sync attempts. Inspect its `targets.txt` record and every referenced target before recovery, including when recovering an older multi-server transaction; never delete rollback evidence blindly. A cleanup warning after successful verification means the suite is committed but retained evidence still needs inspection. Paper runtime download/alignment failures occur before plugin synchronization and leave the pending build number reusable; rerun the canonical workflow after fixing the cause.

The retained copy helper defaults to Paper 26.3. Its explicit path argument, or `-PprojectJarSyncTarget=/absolute/server/plugins`, deliberately selects another repair target; it does not establish a new shared local-test build or authorize a live deployment. Live handoff staging continues to use the complete tested Paper set. GameTypes/BentoBox deployment remains separate.

The retired Forage 26.3 private-beta instance and Paper 26.2 build-699 rollback are preserved intact with checksum manifests under the Git-ignored `archive/servers/2026-10-19/` directory. Gradle does not build against, sync to, stage from or test against archived instances during ordinary development. `servers/Paper-26.3/` is the sole maintained synchronization target. Restore an archive to a separate disposable location only for a deliberate investigation; keep its worlds, inventories, plugin progress and transaction evidence together.

The maintained project-local launcher selects installed Oracle JDK 27 dynamically. Use that same runtime for compatibility smoke testing:

```bash
(
  export JAVA_HOME=$(/usr/libexec/java_home -F -v 27)
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
