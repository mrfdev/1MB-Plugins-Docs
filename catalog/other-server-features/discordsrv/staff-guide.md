# DiscordSRV Staff Reference

Public-safe technical notes for staff who configure or support DiscordSRV on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/discord help` | `discordsrv.player.help` | Shows available DiscordSRV commands. |
| `/discord reload` | `discordsrv.admin.reload` | Reloads DiscordSRV configuration. |
| `/discord resync` | `discordsrv.admin.resync` | Re-synchronizes linked-account state. |
| `/discord debug` | `discordsrv.admin.debug` | Creates diagnostic output; review it for sensitive data before sharing. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `discordsrv.player` | Player command bundle. | Players |
| `discordsrv.player.link` | Account linking. | Players |
| `discordsrv.admin.reload` | Reload access. | Server administrators |
| `discordsrv.admin.debug` | Diagnostic export. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Discord bot tokens, webhook URLs, channel IDs, and private debug output must never be published.
- 1MB-CMIAPI modules may use DiscordSRV for optional notifications and chat bridges.
- Role synchronization should be designed with LuckPerms and Discord role hierarchy together.

## Examples

```text
/discord help
/discord reload
/discord resync
```

## Troubleshooting

- Confirm the player used the newest link code and the correct Discord account.
- Check bot connectivity and channel permissions without exposing credentials.
- For chat issues, separate Minecraft event delivery, Discord channel mapping, and webhook/bot send permissions.

## Official references

- [Official documentation](https://docs.discordsrv.com/)
- [GitHub](https://github.com/DiscordSRV/DiscordSRV)
