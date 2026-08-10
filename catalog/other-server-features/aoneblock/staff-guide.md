# AOneBlock Staff Reference

AOneBlock is loaded as a BentoBox game-mode add-on. On 1MoreBlock, players use `/oneblock` and staff administer the mode through `/adminoneblock`.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/adminoneblock` | `aoneblock.admin.*` | Shows the OneBlock administration surface on 1MoreBlock. |
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
- The command roots are `/oneblock` for players and `/adminoneblock` for staff; permission nodes keep the `aoneblock` namespace.

## Examples

```text
/adminoneblock
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
