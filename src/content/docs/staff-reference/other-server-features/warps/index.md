---
title: "BentoBox Warps Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for BentoBox Warps."
---

BentoBox Warps is administered as a BentoBox add-on. Its command labels and permission prefix may be generated per hooked game mode.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bentobox version` | `bentobox.admin.version` | Confirms the installed add-on build and hooked game modes. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads reviewed BentoBox configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bentobox.warps.*` | Generated warp browse and management nodes. | Players in enabled modes |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%warps_<gamemode>_has_warp%` | Typical warp-state pattern; verify exact expansion. |

## Configuration and integrations

- Visitor safety still depends on BentoBox protection and island settings.
- Warp signs, categories, and required blocks can be customized per mode.
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
- [BentoBox Warps source](https://github.com/BentoBoxWorld/Warps)

## Reference Links

- [Player guide](/player-guides/other-server-features/warps/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/warps/)
- [Official plugin documentation](https://github.com/BentoBoxWorld/Warps)
