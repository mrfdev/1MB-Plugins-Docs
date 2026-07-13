# Build And Release

## Versioning

Current project version: `1.0.0`

Build numbers are explicit and increment for every build. The current build number is stored in `gradle.properties`.

Jar naming format:

`1MB-mcMMO-More-v<version>-<build>-j<javaTarget>-<paperRuntimeTarget>.jar`

Example:

`1MB-mcMMO-More-v1.0.0-047-j25-26.1.2.jar`

## Required Checks

Before finalizing a change:

- run `gradle build`
- run `git diff --check`
- mention build warnings, if any
- do not commit unless explicitly asked

## Server Sync

`gradle build` writes the jar to `libs/` and syncs it to:

`servers/Paper-26.1.2/plugins/`

Before copying the new jar, active older `1MB-mcMMO-More-*.jar` files in that plugins folder are renamed with `.disabled` so only the newest build loads.

## Commit Text

After a successful build, provide a concise commit message and changelog text in the response. Do not commit unless explicitly asked.
