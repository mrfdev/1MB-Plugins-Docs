# BentoBox Level Staff Reference

BentoBox Level is administered as a BentoBox add-on. Its command labels and permission prefix may be generated per hooked game mode.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bentobox version` | `bentobox.admin.version` | Confirms the installed add-on build and hooked game modes. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads reviewed BentoBox configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bentobox.level.*` | Generated level and top command nodes. | Players in enabled modes |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%level_bskyblock_island_level%` | Typical BSkyBlock island-level token; verify exact installed expansion. |
| `%level_aoneblock_island_level%` | Typical AOneBlock island-level token; verify exact installed expansion. |

## Configuration and integrations

- Block values and scan behavior are configured per game mode.
- Large scans may be cached or queued; do not promise immediate ranking refresh.
- Use the BentoBox permissions command/documentation to inspect generated nodes for each game-mode hook.
- Keep add-on versions compatible with the installed BentoBox snapshot and game-mode builds.

## Examples

```text
/bentobox version
/bentobox reload
```

## Troubleshooting

- Confirm the add-on is shown by `/bentobox version` and is enabled for the affected game mode.
- Check the game-mode-specific add-on config before changing a global default.
- Reproduce with the full root command and preserve the console error or user-facing denial message.

## Official references

- [BentoBox add-on documentation](https://docs.bentobox.world/en/latest/)
- [BentoBox Level source](https://github.com/BentoBoxWorld/Level)
