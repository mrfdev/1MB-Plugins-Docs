# Installation

## Requirements

- Java 25
- Paper runtime target 26.1.2+
- mcMMO installed for the native mcMMO companion behavior

Optional integrations:

- PlaceholderAPI for placeholders
- CMI and CMILib for CMI vanish/god player-state checks
- 1MB-CMIAPI-Lib for shared 1MB feature registration and player-state helper access
- LuckPerms or another permission plugin for skill unlock permissions

## Install

1. Build or download the mcMMO More jar.
2. Put the jar in the server `plugins/` folder next to `mcMMO.jar`.
3. Restart the server.
4. Run `/mcmmore info` to confirm the plugin, version/build, and docs link.
5. Run `/mcmmore debug status` as an admin to confirm dependency and runtime state.
6. Grant skill permissions such as `onembmcmmore.skills.exploration`.

## Build

Use the project build command:

```text
gradle build
```

The jar name uses:

```text
1MB-mcMMO-More-v<version>-<build>-j<javaTarget>-<paperRuntimeTarget>.jar
```

Example:

```text
1MB-mcMMO-More-v1.0.0-047-j25-26.1.2.jar
```

## Update

1. Stop the server.
2. Replace the older mcMMO More jar with the new jar.
3. Start the server.
4. Run `/mcmmore info` and `/mcmmore debug status`.
5. Review config changes. Missing defaults and comments are added safely without overwriting existing values.

Normal mcMMO updates remain separate. mcMMO More does not patch mcMMO and does not write to mcMMO playerdata.
