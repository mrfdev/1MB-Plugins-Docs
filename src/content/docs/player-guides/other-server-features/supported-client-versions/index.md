---
title: "Supported Client Versions (ViaVersion and ViaBackwards) Guide"
description: "Allow multiple supported Java client versions to connect while the server runs a newer Paper version."
---

ViaVersion and ViaBackwards translate supported Java Edition protocols between the client and the server. Together they let 1MoreBlock accept a wider range of Minecraft Java versions than the server's native Paper version alone.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- ViaVersion protocol translation for newer-client/older-server combinations and shared protocol infrastructure.
- ViaBackwards translation that lets supported older Java clients join newer servers.
- Per-version connection diagnostics and compatibility handling.
- A wider connection window without changing the server's actual gameplay version.

## Commands

This feature does not require a general player command. It appears automatically, through another menu, or through staff-created content.

## Getting started

1. Use a client version listed as supported by 1MoreBlock.
2. Connect to the normal Java server address.
3. For problems, report the exact client version, loader/modpack, and disconnect text.

## Player notes

- Protocol support does not backport every visual, UI, item, sound, or gameplay feature perfectly.
- The server still runs one native Minecraft/Paper version.
- Bedrock clients use Geyser/floodgate, documented separately.

## Official resources

- [ViaVersion website](https://viaversion.com/)
- [ViaVersion GitHub](https://github.com/ViaVersion/ViaVersion)
- [ViaBackwards](https://viaversion.com/backwards)
- [Supported versions](https://viaversion.atlassian.net/wiki/spaces/VIAVERSION/pages/299139073/Supported+Versions)

## Reference Links

- [Staff and technical reference](/staff-reference/other-server-features/supported-client-versions/)
- [1MoreBlock feature notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/supported-client-versions/)
- [Official plugin documentation](https://viaversion.com/)
