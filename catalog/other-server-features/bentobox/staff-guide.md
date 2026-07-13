# BentoBox Staff Reference

Public-safe technical notes for staff who configure or support BentoBox on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bentobox version` | `bentobox.admin.version` | Lists BentoBox, game modes, add-ons, and versions. |
| `/bentobox manage` | `bentobox.admin.manage` | Opens the management panel when enabled. |
| `/bentobox perms` | `bentobox.admin.perms` | Inspects generated permissions. |
| `/bentobox reload` | `bentobox.admin.reload` | Reloads BentoBox and add-on configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bentobox.admin.*` | All BentoBox platform administration. | Server administrators only |
| `bentobox.admin.version` | Version and add-on inventory. | Support staff |
| `bentobox.admin.reload` | Reload access. | Senior staff only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%bentobox_world_friendly_name%` | World/game-mode friendly name in supported expansions. |
| `%bentobox_island_unique_id%` | Island identity pattern; verify exact token in the installed expansion. |

## Configuration and integrations

- Game modes and add-ons must be compatible with the installed BentoBox snapshot.
- The database owns island membership, ranks, protection, and locations; never hand-edit live data casually.
- Permission nodes can be generated from configurable command labels and game-mode names.

## Examples

```text
/bentobox version
/bentobox manage
/bentobox perms
```

## Troubleshooting

- Start with `/bentobox version` and capture the full add-on list.
- Identify the exact game mode, world, island ID, player UUID, and command.
- Check add-on compatibility and world hooks before changing island data.

## Official references

- [Official documentation](https://docs.bentobox.world/en/latest/)
- [Commands](https://docs.bentobox.world/en/latest/BentoBox/Commands/)
- [Permissions](https://docs.bentobox.world/en/latest/BentoBox/Permissions/)
- [GitHub organization](https://github.com/BentoBoxWorld)
