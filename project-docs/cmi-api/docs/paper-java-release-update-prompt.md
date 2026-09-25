# Paper And Java Release Update Prompt

Paste this prompt into another Codex plugin project when deliberately moving its baseline to experimental Paper 26.3 and Java 27.

```text
Housekeeping and compatibility release for this entire Paper plugin project.

Preserve current source work and unrelated changes. Read AGENTS.md and follow the repository's build, test-server, documentation, and release conventions.

1. Review the upgrade
- Start with https://docs.papermc.io/llms.txt, then consult the official upgrade guide, roadmap, configuration references, exact-version Javadocs, and Maven metadata.
- Target Paper 26.3. Experimental ALPHA builds are explicitly authorized for this migration. Select the latest build within that exact target/channel and verify the server JAR checksum and matching API coordinate.
- Review removals, compiler deprecations, version-sensitive APIs, and exploit-protection defaults. Keep protections enabled. Avoid unrelated feature changes.

2. Preserve the previous baseline
- Keep the Paper 26.2 server intact as rollback material. Clone a stopped instance into a separate Paper-26.3 directory if appropriate.
- Give the new instance its own port and session. Preserve plugin data and configuration. Disable external messaging integrations during local smoke tests.
- Update maintained launchers and PaperScript configuration to the new target and ALPHA channel. Verify both default and latest-check channels. Keep same-version build upgrades enabled and verify the actual launcher-selected JAR against PaperScript state.
- Do not update archived instances or copy worlds, databases, logs, caches, secrets, or server JARs into Git.

3. Java and dependencies
- Compile and run unit tests with JDK 25.0.4.1 at /Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home, selected through JAVA_HOME and PATH.
- Keep Java 25 bytecode. The live and maintained test servers use Java 27, installed locally at /Library/Java/JavaVirtualMachines/jdk-27.jdk/Contents/Home.
- Resolve compile and test dependencies from the new maintained server and exact Paper API. Review optional integration compatibility before startup.
- Keep plugin API descriptors, generated runtime diagnostics, JAR names, and documentation aligned with the central target metadata.

4. Release and verification
- Increment the requested semantic version. Use the repository's canonical workflow to reserve exactly one shared build number, build/test the complete suite, and synchronize all managed JARs while Paper is stopped. Never manually consume extra build numbers on a failed retry.
- Verify configured-channel mismatch, checksum failure, and failed-build retry behavior if build tooling changes.
- Run a clean full suite build on JDK 25, verify Java 25 class-file versions and uniform JAR metadata, then start and cleanly stop the Paper 26.3 test server on Java 27.
- Inspect plugin loading, runtime metadata, relevant read-only health commands, and startup/shutdown errors. Record pre-existing or external-plugin limitations separately from suite failures.
- Run documentation generation and drift checks used by the repository. Preserve dated historical verification records.
- Smoke testing does not replace connected-player gameplay acceptance. Stage a live handoff only after that acceptance, using the exact tested server set.

5. Git and report
- Review the final diff. Commit/push/tag only when requested, preserving unrelated work.
- Report the semantic version/build, exact compile JDK and runtime, Paper target/channel/build/API and verified checksum, suite and smoke results, preserved rollback instance, new active instance, compiler warnings, docs checks, and outstanding gameplay checks.
```
