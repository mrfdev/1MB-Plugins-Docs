---
title: "AOneBlock Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for AOneBlock."
---

AOneBlock is loaded as a BentoBox game-mode add-on. Administration is namespaced under the configured player and admin commands for that mode.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/ob admin` | `aoneblock.admin.*` | Shows the mode administration surface; the exact admin alias is configurable. |
| `/bentobox version` | `bentobox.admin.version` | Reports BentoBox and add-on versions. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads BentoBox and add-ons after reviewed configuration changes. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `aoneblock.island.*` | Typical namespace for player island actions. | Player ranks, selectively |
| `aoneblock.admin.*` | Typical namespace for mode administration. | Senior staff only |
| `bentobox.admin.*` | BentoBox-wide administration. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%aoneblock_island_name%` | Typical PlaceholderAPI island-name pattern; verify the exact expansion in the installed build. |
| `%aoneblock_island_owner%` | Typical island-owner pattern; verify before publishing it in a menu. |

## Configuration and integrations

- BentoBox owns the island database and protection model; avoid editing game-mode data by hand while the server is running.
- Challenges, Level, Warps, Border, Limits, Biomes, and other add-ons attach to this mode according to their per-world configuration.
- Command labels and permission prefixes can be changed by game-mode configuration, so confirm them on the live build before granting wildcards.

## Examples

```text
/ob admin
/bentobox version
/bentobox reload
```

## Troubleshooting

- Use `/bentobox version` to confirm that the game mode and required add-ons loaded.
- Check that the affected world is listed for both the game mode and the add-on involved in the report.
- For island ownership problems, collect the player UUID, game mode, island ID, and exact command before changing data.

## Official references

- [BentoBox documentation](https://docs.bentobox.world/en/latest/)
- [AOneBlock source](https://github.com/BentoBoxWorld/AOneBlock)

## Reference Links

- [Player guide](/player-guides/other-server-features/aoneblock/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/aoneblock/)
- [Official plugin documentation](https://github.com/BentoBoxWorld/AOneBlock)
