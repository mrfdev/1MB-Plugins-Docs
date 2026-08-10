---
title: "CaveBlock Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for CaveBlock."
---

CaveBlock is loaded as a BentoBox game-mode add-on. On 1MoreBlock, players use `/cave` and staff administer the mode through `/admincave`.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/admincave` | `caveblock.admin.*` | Shows the CaveBlock administration surface on 1MoreBlock. |
| `/bentobox version` | `bentobox.admin.version` | Reports BentoBox and add-on versions. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads BentoBox and add-ons after reviewed configuration changes. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `caveblock.island.*` | Typical namespace for player island actions. | Player ranks, selectively |
| `caveblock.admin.*` | Typical namespace for mode administration. | Senior staff only |
| `bentobox.admin.*` | BentoBox-wide administration. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%caveblock_island_name%` | Typical PlaceholderAPI island-name pattern; verify the exact expansion in the installed build. |
| `%caveblock_island_owner%` | Typical island-owner pattern; verify before publishing it in a menu. |

## Configuration and integrations

- BentoBox owns the island database and protection model; avoid editing game-mode data by hand while the server is running.
- Challenges, Level, Warps, Border, Limits, Biomes, and other add-ons attach to this mode according to their per-world configuration.
- The command roots are `/cave` for players and `/admincave` for staff; permission nodes keep the `caveblock` namespace.

## Examples

```text
/admincave
/bentobox version
/bentobox reload
```

## Troubleshooting

- Use `/bentobox version` to confirm that the game mode and required add-ons loaded.
- Check that the affected world is listed for both the game mode and the add-on involved in the report.
- For island ownership problems, collect the player UUID, game mode, island ID, and exact command before changing data.

## Official references

- [BentoBox documentation](https://docs.bentobox.world/en/latest/)
- [CaveBlock source](https://github.com/BentoBoxWorld/CaveBlock)

## Reference Links

- [Player guide](/player-guides/other-server-features/caveblock/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/caveblock/)
- [Official plugin documentation](https://github.com/BentoBoxWorld/CaveBlock)
