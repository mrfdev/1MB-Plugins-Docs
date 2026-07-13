# BentoBox Greenhouses Staff Reference

BentoBox Greenhouses is administered as a BentoBox add-on. Its command labels and permission prefix may be generated per hooked game mode.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bentobox version` | `bentobox.admin.version` | Confirms the installed add-on build and hooked game modes. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads reviewed BentoBox configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `greenhouses.*` | Add-on permission namespace; inspect the generated permissions list for exact nodes. | Grant narrowly |
| `bentobox.admin.*` | BentoBox-wide administration. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Structure materials, bounds, recipes, and effects are server configured.
- Confirm chunk loading and island ownership when diagnosing a greenhouse that is not detected.
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
- [BentoBox Greenhouses source](https://github.com/BentoBoxWorld/Greenhouses)
