---
title: "SelectionVisualizer Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for SelectionVisualizer."
---

Public-safe technical notes for staff who configure or support SelectionVisualizer on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/sv` | `selectionvisualizer.use` | Common command label for visualizer controls; confirm installed help. |
| `/sv toggle` | `selectionvisualizer.use` | Common toggle flow; exact syntax is build dependent. |
| `/sv reload` | `selectionvisualizer.admin` | Common reload flow; confirm installed node. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `selectionvisualizer.use` | Common selection display access. | Authorized builders |
| `selectionvisualizer.admin` | Common administrative access. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Requires a supported WorldEdit/FAWE selection provider.
- Particle visibility depends on client settings, distance, world, and selected shape.
- Do not grant WorldEdit modification permissions merely to make visualization work.

## Examples

```text
/sv
/sv toggle
/sv reload
```

## Troubleshooting

- Confirm WorldEdit reports both positions and the expected selection type.
- Check client particles and visualization toggle/range.
- Test a small cuboid before diagnosing complex polygon or large selection rendering.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/selection-visualizer.22631/)

## Reference Links

- [Player guide](/player-guides/other-server-features/selection-visualizer/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/selection-visualizer/)
- [Official plugin documentation](https://www.spigotmc.org/resources/selection-visualizer.22631/)
