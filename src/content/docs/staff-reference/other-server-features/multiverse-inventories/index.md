---
title: "Multiverse-Inventories Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for Multiverse-Inventories."
---

Public-safe technical notes for staff who configure or support Multiverse-Inventories on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mvinv info` | `multiverse.inventories.info` | Shows inventory-group information. |
| `/mvinv list` | `multiverse.inventories.list` | Lists configured groups/shares. |
| `/mvinv reload` | `multiverse.inventories.reload` | Reloads inventory configuration. |
| `/mvinv addworld <group> <world>` | `multiverse.inventories.group` | Adds a world to a sharing group; requires migration planning. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `multiverse.inventories.info` | Reads inventory configuration. | Support staff |
| `multiverse.inventories.reload` | Reload access. | Server administrators |
| `multiverse.inventories.group` | Changes world groups. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Multiverse-Core owns world load/state; this plugin owns configured player-state grouping.
- CMI or other plugins can store separate inventory-like data outside Multiverse-Inventories.
- Changing group membership can strand or overwrite state; back up and test migrations.

## Examples

```text
/mvinv info
/mvinv list
/mvinv reload
```

## Troubleshooting

- Ask the player to revisit the source world group before restoring anything.
- Record player UUID, source/destination worlds, game modes, and transfer time.
- Check group membership and per-share settings before concluding data was lost.

## Official references

- [Official documentation](https://mvplugins.org/inventories/)
- [GitHub](https://github.com/Multiverse/Multiverse-Inventories)

## Reference Links

- [Player guide](/player-guides/other-server-features/multiverse-inventories/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/multiverse-inventories/)
- [Official plugin documentation](https://mvplugins.org/inventories/)
