# HeadDisplays 26.2 Compatibility Patch

This local project documents and stores a patched copy of the premium HeadDisplays Bukkit/Paper plugin for 1MoreBlock compatibility testing.

HeadDisplays is a third-party plugin by Arcaniax and Ktar5. This workspace does not contain the original source code or a build project. The active artifact is a patched jar derived from a licensed `HeadDisplays-1.12.9.jar` copy:

```text
HeadDisplays-1.12.9-26.2-display-fix.jar
```

The patch keeps the plugin version metadata at `1.12.9` and changes only the Paper/Minecraft 26.x NMS display-packet shim needed for Paper 26.2.

## What It Does

HeadDisplays lets permitted staff create floating head-display text/icon markers in the world. A display is placed through an item given by the `/hd create` command, then managed through the plugin GUI and list/edit commands.

The plugin stores display data in:

```text
plugins/HeadDisplays/savedata.json
```

It also ships five built-in font files:

```text
black.font
oak.font
quartz.font
stone.font
white.font
```

## Verified Metadata

| Field | Value |
| --- | --- |
| Plugin name | `HeadDisplays` |
| Plugin version | `1.12.9` |
| Main class | `net.arcaniax.headdisplays.HeadDisplays` |
| Bukkit API version | `1.13` |
| Main command | `/hd` |
| Aliases | `/hdi`, `/hdisplay`, `/headdisplay` |
| Authors | Arcaniax, Ktar5 |
| Java class target | Java 21, class file major version `65` |
| Primary supported test target | Paper/Minecraft 26.1.2 |
| Experimental compatibility target | Paper/Minecraft 26.2 |

## Patch Summary

Paper/Minecraft 26.2 no longer exposes the direct NMS field used by the original plugin:

```java
EntityType.ITEM_DISPLAY
```

The original `net.arcaniax.headdisplays.nms.v1_21_R6.PacketArmorstandImpl` fails with `NoSuchFieldError` when it attempts to construct the client-side `ItemDisplay` packet entity. That causes the hidden barrier/control block to exist while the visible display text/icon never appears.

The patched jar resolves `minecraft:item_display` through the entity type registry instead:

```java
private static final Identifier ITEM_DISPLAY_KEY =
        Identifier.withDefaultNamespace("item_display");

EntityType<?> itemDisplayType =
        BuiltInRegistries.ENTITY_TYPE.getValue(ITEM_DISPLAY_KEY);
ItemDisplay itemDisplay = new ItemDisplay(itemDisplayType, level);
```

No plugin source, commands, permissions, `plugin.yml`, generated data format, or public plugin version metadata were changed.

## Local Test Results

The patched jar was smoke-tested in both local server instances:

| Server | Result |
| --- | --- |
| Paper 26.1.2 | HeadDisplays loaded, fonts loaded, data loaded, packet shim constructed, server stopped cleanly. |
| Paper 26.2 | HeadDisplays loaded, fonts loaded, data loaded, no `EntityType.ITEM_DISPLAY` failure, server stopped cleanly. |

Latest relevant logs:

```text
servers/Paper-26.1.2/logs/latest.log
servers/Paper-26.2/logs/latest.log
```

The old Paper 26.2 failure signature was:

```text
java.lang.NoSuchFieldError: Class net.minecraft.world.entity.EntityType does not have member field ITEM_DISPLAY
```

That signature was absent after the patch during the local smoke test.

## Documentation

- [Player Guide](docs/player-guide.md)
- [Commands](docs/commands.md)
- [Permissions](docs/permissions.md)
- [Placeholders](docs/placeholders.md)
- [Configuration And Data](docs/configuration.md)
- [Installation](docs/installation.md)
- [Integrations](docs/integrations.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Compatibility Patch](docs/compatibility-patch.md)

## Important Limitations

This is not a source repository. There is no verified Gradle/Maven build, test suite, or Git remote in this workspace. Do not publish the paid jar, decompiled source, private local server files, or saved display coordinates to public documentation.

The plugin's current `/hd info` output is vendor-provided and cannot be safely enhanced here because the source project is not available.
