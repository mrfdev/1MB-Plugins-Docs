---
title: "BentoBox Limits Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for BentoBox Limits."
---

BentoBox Limits is administered as a BentoBox add-on. Its command labels and permission prefix may be generated per hooked game mode.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bentobox version` | `bentobox.admin.version` | Confirms the installed add-on build and hooked game modes. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads reviewed BentoBox configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bentobox.limits.*` | Generated limit command and bypass nodes. | Players for view; staff only for bypass |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%limits_<gamemode>_<material>_count%` | Typical count pattern; verify exact token names before use. |

## Configuration and integrations

- Limits complements MobFarmManager but uses island ownership rather than chunk-performance policy.
- Review bypass permissions carefully because they can affect island balance and server performance.
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
- [BentoBox Limits source](https://github.com/BentoBoxWorld/Limits)

## Reference Links

- [Player guide](/player-guides/other-server-features/limits/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/limits/)
- [Official plugin documentation](https://github.com/BentoBoxWorld/Limits)
