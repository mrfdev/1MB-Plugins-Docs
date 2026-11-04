# Oracle Java toolchain cleanup, 25 October 2026

## Scope and configuration

Local M4 Max verification: compile the 1MB Library suite with the installed Oracle JDK 25, retain Java 25 bytecode, and run automated tests and the maintained Paper server with installed Oracle JDK 27. The live server is a separate acceptance/deployment step.

Homebrew Temurin 17 and 21 were removed and their absence was verified with both Homebrew and macOS `java_home`. Oracle 25/27 and Homebrew's OpenJDK dependency for Gradle/Maven remain available.

The user's `.zshenv` now dynamically selects Java 27 when `JAVA_HOME` is absent or points to a removed JDK, preserving an explicitly supplied valid project override. Fresh login and interactive shells selected Oracle 27; an explicit Oracle 25 override and recovery from a nonexistent JDK path were verified. Obsolete OpenJDK 22 PATH/CPPFLAGS entries were removed from `.zprofile`. Original shell files are backed up under the First Test Project's `.scratch/java-cleanup-2026-10-25/shell-before/`.

For this repository:

- `scripts/gradle-oracle.sh` resolves and validates the installed Oracle 25 and 27 JDKs on every invocation. Gradle runs on 25, compilers use Oracle 25 with `--release 25`, and Test/JavaExec tasks use Oracle 27. Build-logic compilation and tests follow the same split.
- The launcher disables automatic JDK discovery/downloads and supplies only the selected Oracle installations. Missing, wrong-major and wrong-vendor selections fail before Gradle starts. Conflicting Java property arguments are rejected; explicit installed-path overrides use `ONE_MB_BUILD_JAVA_HOME` and `ONE_MB_TEST_JAVA_HOME`.
- `scripts/build-all.sh` invokes this launcher. The ignored `.gradle-codex/gradle.properties` no longer pins obsolete patch folders; automatic downloads remain disabled there as well.
- The maintained `servers/Paper-26.3/1MB-minecraft.sh` dynamically resolves and validates Oracle 27 at each start. Its previous launcher and local Gradle settings are backed up in the evidence directory.
- `AGENTS.md`, compiling instructions, README and release guidance describe the persistent setup.

## Automated build evidence

Canonical suite build **812** completed in **4 minutes 8 seconds** against unchanged Paper **26.3 STABLE build 222**, API `26.3.build.222-stable`.

- Oracle compiler/Gradle: **25.0.5.0.3+1-LTS-2**.
- Oracle automated-test/server runtime: **27.0.1.0.3+1-2**.
- **7,103 cases** across **559 suites**: **7,062 passed**, **41 existing optional-fixture skips**, **zero failures/errors**.
- The verbose build log records **105 compiler invocations**, all using Oracle 25, and **37 test processes**, all using Oracle 27.
- All **67** managed JARs match the local server copies by SHA-256. Every packaged class remains Java 25-compatible; all 67 artifacts are active.
- The helper regression checks, existing transactional build-workflow checks and ShellCheck passed. The final helper conflict-argument checks and build-metadata verification were rerun after the final helper/documentation edits and passed.

No plugin source changes were required for this Java split. The issues addressed were configuration issues: tests previously ran on 25, local paths pinned specific patch folders, and caller flags could override the new launcher's JDK/download settings.

## Native Oracle 27 runtime evidence

The maintained test server started successfully with all **67** suite plugins on Oracle 27. CMI **9.8.11.0** and CMILib **1.6.1.0** remained available.

- UpdateSmoke: **565 pass / 0 warning / 0 failure / 1 skip row**, all five placeholder samples resolved.
- The skip records the existing 400-command cap. The remaining **14** read-only feature diagnostics were executed separately without runtime exceptions.
- StartupDoctor's **15** Paper configuration checks passed.
- CMIProbe reached **14/14** managers, discovered **54** event classes with listeners, and submitted the CMILib scheduler task.
- CMIProbe still reports its existing **4/5** command-registration warning because its diagnostic configuration requests the obsolete `placeholderprobe` command; the actual `_placeholders` command and placeholder checks work. Existing event/configuration readiness warnings remain.
- Startup warnings match the prior run after normalizing timestamps and integer-map display order. There were **zero ERROR/SEVERE records**.
- The local server was stopped cleanly after verification; its process exited and port **22332** was released.

These are build, automated-test, and native startup/diagnostic/shutdown checks. Connected Java/Bedrock gameplay and live-server acceptance remain separate.

## Evidence

Detailed local evidence is in `.scratch/oracle-toolchains-2026-10-25/`: `build-all.log`, `toolchains.log`, `final-build-checks.log`, `verification-812.json`, `runtime-verification.json`, `runtime-start-stop.log`, `startup-warning-comparison.json`, copied UpdateSmoke/CMIProbe reports, and the `before/` backups. The previous build-811 report remains a historical record.
