# Paper And Java Release Update Prompt

Paste the following prompt into another Codex plugin project when its Paper 26.2 and Java release baseline needs updating.

```text
Housekeeping and compatibility release for this entire Paper plugin project.

Preserve all current source work and unrelated local changes. Inspect the repository before editing and follow its existing build, test-server, documentation, and release conventions.

1. PaperScript and Paper
- Locate the maintained Paper 26.2 test server and any shared/template server this project uses to create temporary smoke-test instances.
- Preserve each server's custom PaperScript configuration, including server labels, ports, tmux/session values, backup behavior, and other project-specific settings.
- Refresh PaperScript from the project's trusted/current source when it is stale.
- Configure PaperScript to use the STABLE channel for both its default and latest-channel checks.
- Keep same-version build upgrades enabled.
- Set the download filename pattern to `Paper-{version}.jar`, without a Paper build number in the filename.
- Run `./paperscript.sh update` and `./paperscript.sh status`.
- Require the latest stable Paper 26.2 build, verify PaperScript's saved SHA-256 against the installed jar, and report the exact version, build, channel, and jar path.
- Do not update archived servers or disposable old instances. Update only maintained active servers and templates.

2. Paper API and code
- Use the official Paper Maven metadata and exact-version Paper Javadocs to identify the matching stable `io.papermc.paper:paper-api` coordinate.
- Update Gradle/Maven compile and test dependencies from old alpha/beta coordinates to that exact stable API build.
- Keep the declared Paper target/API version at 26.2.
- Review compiler deprecations and removed or changed APIs since the previous target. Update project code where necessary using supported Paper/Bukkit APIs, without unrelated refactors.
- Do not use NMS, reflection, or internals unless the project already requires them and no supported API exists.

3. Java and build tooling
- Build and target Java 25 bytecode using `/Library/Java/JavaVirtualMachines/jdk-25.0.4.jdk/Contents/Home`.
- Verify runtime compatibility on `/Library/Java/JavaVirtualMachines/jdk-26.0.2.jdk/Contents/Home`.
- Do not raise the bytecode/toolchain target to Java 26.
- Inspect the Gradle wrapper or installed Gradle version and update only when needed for Java 25/26 and the project conventions.
- Replace stale hardcoded JDK 25.0.2 or JDK 26.0.1 paths in maintained scripts/configuration. Prefer an environment override such as `JAVA_BIN` or `JAVA_HOME` so both runtime smoke tests are repeatable.

4. Release metadata and automation
- Increment the semantic patch version by one, for example `1.0.0` to `1.0.1`.
- Increment the project's shared build number exactly once.
- Keep every produced plugin/library jar on the same version and build unless this repository intentionally documents a different scheme.
- Generate plugin metadata, jar names, debug/status output, exact compiled Paper API, Java target, and docs from one release source of truth where practical.
- Add or tighten drift checks so stale jar examples, semantic versions, build numbers, Java targets, Paper targets, Paper channels/builds, and generated metadata fail verification rather than silently diverging.
- Ensure normal `/<plugin> info`, `/<plugin> version`, `/<plugin> status`, `/<plugin> debug`, `/<plugin> admin status`, support bundles, and equivalent project-specific diagnostics report current generated metadata rather than hardcoded values.

5. Verification
- Run focused tests for changed compatibility/release code.
- Run the complete clean build and all unit/integration tests with JDK 25.0.4.
- Install only the newly built jars into the maintained Paper 26.2 test server, removing stale active copies of the same project jars without touching unrelated plugins or data.
- Start the latest stable Paper 26.2 server with JDK 25.0.4, wait for a clean ready state, inspect startup errors/warnings and plugin enable status, then stop it cleanly.
- Repeat the same server startup and clean shutdown with JDK 26.0.2.
- Confirm the jars remain Java 25-compatible and that both runtime logs show the intended Java and Paper versions.
- Run documentation generation, drift validation, and any public-docs/Starlight checks used by this project.

6. Safety and Git
- Do not reset, discard, overwrite, or stage unrelated work.
- Do not modify archived servers or copy generated worlds, databases, player data, logs, caches, or secrets into Git.
- Review the final diff and report every changed release target and automation improvement.
- Do not commit or push unless I explicitly request it.

Report:
- semantic version and build number
- Java compile target and the exact JDK used to build
- Java 25.0.4 and Java 26.0.2 smoke-test results
- Paper version, stable build, API coordinate, jar filename, and checksum verification
- compiler deprecations or compatibility changes found
- full test/build results
- documentation/drift results
- maintained template servers updated
- unrelated local changes preserved
- any remaining manual follow-up
```
