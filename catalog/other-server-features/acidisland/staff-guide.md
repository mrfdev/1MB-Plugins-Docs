# AcidIsland Staff Reference

AcidIsland is loaded as a BentoBox game-mode add-on. On 1MoreBlock, players use `/acid` and staff administer the mode through `/adminacid`.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/adminacid` | `acidisland.admin.*` | Shows the AcidIsland administration surface on 1MoreBlock. |
| `/bentobox version` | `bentobox.admin.version` | Reports BentoBox and add-on versions. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads BentoBox and add-ons after reviewed configuration changes. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `acidisland.island.*` | Typical namespace for player island actions. | Player ranks, selectively |
| `acidisland.admin.*` | Typical namespace for mode administration. | Senior staff only |
| `bentobox.admin.*` | BentoBox-wide administration. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%acidisland_island_name%` | Typical PlaceholderAPI island-name pattern; verify the exact expansion in the installed build. |
| `%acidisland_island_owner%` | Typical island-owner pattern; verify before publishing it in a menu. |

## Configuration and integrations

- BentoBox owns the island database and protection model; avoid editing game-mode data by hand while the server is running.
- Challenges, Level, Warps, Border, Limits, Biomes, and other add-ons attach to this mode according to their per-world configuration.
- The command roots are `/acid` for players and `/adminacid` for staff; permission nodes keep the `acidisland` namespace.

## Examples

```text
/adminacid
/bentobox version
/bentobox reload
```

## Troubleshooting

- Use `/bentobox version` to confirm that the game mode and required add-ons loaded.
- Check that the affected world is listed for both the game mode and the add-on involved in the report.
- For island ownership problems, collect the player UUID, game mode, island ID, and exact command before changing data.

## Official references

- [BentoBox documentation](https://docs.bentobox.world/en/latest/)
- [AcidIsland source](https://github.com/BentoBoxWorld/AcidIsland)
