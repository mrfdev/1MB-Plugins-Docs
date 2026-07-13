# TryMe Staff Reference

Public-safe technical notes for staff who configure or support TryMe on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/tryme start <game>` | `tryme.admin` | Starts a configured game in common builds. |
| `/tryme stop` | `tryme.admin` | Stops the active game. |
| `/tryme reload` | `tryme.admin` | Reloads configuration. |
| `/tryme` | `tryme.default` | Shows installed command help. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `tryme.default` | Common player command access. | Players |
| `tryme.admin` | Game controls and reload. | Event staff/senior staff |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Reward commands can affect economy/items/permissions and should be reviewed as privileged automation.
- Chat filtering, Discord bridges, and channel plugins may affect visible answers.
- Schedule and event overlap should be coordinated with other server activities.

## Examples

```text
/tryme start <game>
/tryme stop
/tryme reload
```

## Troubleshooting

- Record challenge type, prompt, expected answer, channel, timestamps, and winner message.
- Check chat cancellation/filtering and exact answer normalization.
- Verify reward command execution separately from winner detection.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/tryme.3330/)
