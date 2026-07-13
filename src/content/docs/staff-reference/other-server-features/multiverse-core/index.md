---
title: "Multiverse-Core Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for Multiverse-Core."
---

Public-safe technical notes for staff who configure or support Multiverse-Core on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mv list` | `multiverse.core.list.worlds` | Lists loaded worlds. |
| `/mv info <world>` | `multiverse.core.info` | Shows world properties. |
| `/mvtp <world>` | `multiverse.teleport.self.*` | Teleports to a world. |
| `/mv import <world> <environment>` | `multiverse.core.import` | Imports an existing world; review backups first. |
| `/mv unload <world>` | `multiverse.core.unload` | Unloads a world; coordinate player evacuation and dependent plugins. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `multiverse.core.list.worlds` | Lists worlds. | Support staff |
| `multiverse.core.info` | Reads world settings. | Support staff |
| `multiverse.teleport.*` | World teleport access. | Staff by scope |
| `multiverse.core.*` | World lifecycle administration. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Multiverse-Inventories assigns inventory-sharing groups.
- WorldGuard, BlueMap, CMI, BentoBox, PlotSquared, and other plugins attach data to worlds.
- World create/import/unload/delete operations require backup and dependency review.

## Examples

```text
/mv list
/mv info <world>
/mvtp <world>
```

## Troubleshooting

- Confirm the Bukkit world name, alias, load state, environment, and folder.
- Check dependent plugin world lists before unload or rename.
- Separate teleport permission, destination safety, and world load errors.

## Official references

- [Official documentation](https://mvplugins.org/core/)
- [GitHub](https://github.com/Multiverse/Multiverse-Core)

## Reference Links

- [Player guide](/player-guides/other-server-features/multiverse-core/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/multiverse-core/)
- [Official plugin documentation](https://mvplugins.org/core/)
