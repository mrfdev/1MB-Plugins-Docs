---
title: "CMI Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for CMI."
---

Public-safe technical notes for staff who configure or support CMI on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/cmi checkcommand <command>` | `cmi.command.checkcommand` | Shows command ownership and related information. |
| `/cmi checkperm <player> <permission>` | `cmi.command.checkperm` | Checks a player permission. |
| `/cmi reload` | `cmi.command.reload` | Reloads CMI configuration. |
| `/cmi info <player>` | `cmi.command.info` | Shows public-safe player support information; protect sensitive fields. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `cmi.command.<command>` | Base CMI command convention. | Grant by role |
| `cmi.command.<command>.others` | Allows targeting other players for many commands. | Staff only where needed |
| `cmi.command.reload` | Reloads CMI. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%cmi_user_name%` | Player name. |
| `%cmi_user_balance_formatted%` | Formatted CMI economy balance. |
| `%cmi_user_afk%` | AFK state. |

## Configuration and integrations

- CMILib is a hard dependency.
- 1MB-CMIAPI feature plugins depend on CMI events, data, commands, and services.
- Vault, LuckPerms, PlaceholderAPI, DiscordSRV, Jobs, and other plugins can integrate with CMI.

## Examples

```text
/cmi checkcommand <command>
/cmi checkperm <player> <permission>
/cmi reload
```

## Troubleshooting

- Use `/cmi checkcommand` and `/cmi checkperm` before changing aliases or permissions.
- Check command cost, cooldown, disabled-world, and target-player rules.
- Use the exact current CMI command/permission/placeholders pages because this surface changes frequently.

## Official references

- [Official documentation](https://www.zrips.net/cmi/)
- [Commands](https://www.zrips.net/cmi/commands/)
- [Permissions](https://www.zrips.net/cmi/permissions/)
- [Placeholders](https://www.zrips.net/cmi/placeholders/)

## Reference Links

- [Player guide](/player-guides/other-server-features/cmi/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/cmi/)
- [Official plugin documentation](https://www.zrips.net/cmi/)
