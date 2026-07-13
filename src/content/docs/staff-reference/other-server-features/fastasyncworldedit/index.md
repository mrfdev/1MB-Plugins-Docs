---
title: "FastAsyncWorldEdit Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for FastAsyncWorldEdit."
---

Public-safe technical notes for staff who configure or support FastAsyncWorldEdit on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `//wand` | `worldedit.wand` | Gives or activates the selection wand. |
| `//pos1` | `worldedit.selection.pos` | Sets the first selection position. |
| `//pos2` | `worldedit.selection.pos` | Sets the second selection position. |
| `//copy` | `worldedit.clipboard.copy` | Copies the selection. |
| `//paste` | `worldedit.clipboard.paste` | Pastes the clipboard. |
| `//undo` | `worldedit.history.undo` | Undoes the latest eligible edit. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `worldedit.selection.*` | Selection controls. | Authorized builders |
| `worldedit.region.*` | Region modification commands. | Authorized builders, narrowly |
| `worldedit.history.*` | Undo/redo/history. | Authorized builders |
| `fawe.admin` | FAWE administration/bypasses. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- PlotSquared uses FAWE for plot operations and generation.
- SelectionVisualizer can display WorldEdit selections.
- WorldGuard uses WorldEdit selections for region definition.
- Set edit limits, history size, allowed worlds, and bypass access conservatively.

## Examples

```text
//wand
//pos1
//pos2
```

## Troubleshooting

- Confirm selection volume, world, mask, pattern, and clipboard origin before retrying.
- Check edit limits and queue state before granting a bypass.
- Use history/undo promptly and preserve command syntax when reporting a failed edit.

## Official references

- [Official documentation](https://intellectualsites.gitbook.io/fastasyncworldedit/)
- [GitHub](https://github.com/IntellectualSites/FastAsyncWorldEdit)

## Reference Links

- [Player guide](/player-guides/other-server-features/fastasyncworldedit/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/fastasyncworldedit/)
- [Official plugin documentation](https://intellectualsites.gitbook.io/fastasyncworldedit/)
