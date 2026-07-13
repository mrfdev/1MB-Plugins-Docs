---
title: "PlotSquared Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for PlotSquared."
---

Public-safe technical notes for staff who configure or support PlotSquared on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/plot info` | `plots.info` | Inspects plot ownership and state. |
| `/plot setowner <player>` | `plots.admin.command.setowner` | Transfers plot ownership. |
| `/plot clear` | `plots.clear` | Clears a plot; requires confirmation and approved scope. |
| `/plot delete` | `plots.delete` | Deletes a plot claim; destructive. |
| `/plot debugpaste` | `plots.admin.command.debugpaste` | Creates diagnostic output; review before sharing. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `plots.use` | Base PlotSquared usage. | Players in plot worlds |
| `plots.plot.<amount>` | Plot claim limit pattern. | Ranks |
| `plots.admin.*` | Administrative bypass and management. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%plotsquared_currentplot_owner%` | Current plot owner in common PlaceholderAPI expansion. |
| `%plotsquared_currentplot_alias%` | Current plot alias. |
| `%plotsquared_has_plot%` | Whether the player owns a plot; verify exact expansion version. |

## Configuration and integrations

- FAWE powers plot generation and large operations.
- WorldGuard/WorldEdit tools can interact with plot worlds but PlotSquared ownership remains authoritative.
- BlueMap rendering and markers may include plot worlds according to map policy.

## Examples

```text
/plot info
/plot setowner <player>
/plot clear
```

## Troubleshooting

- Record plot ID, world, owner UUID, trusted/member lists, and exact command.
- Check plot permission and plot-area configuration before granting global bypass.
- Back up or create a schematic before destructive recovery actions where practical.

## Official references

- [Official documentation](https://intellectualsites.gitbook.io/plotsquared/)
- [GitHub](https://github.com/IntellectualSites/PlotSquared)

## Reference Links

- [Player guide](/player-guides/other-server-features/plotsquared/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/plotsquared/)
- [Official plugin documentation](https://intellectualsites.gitbook.io/plotsquared/)
