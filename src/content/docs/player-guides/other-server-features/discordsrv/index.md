---
title: "DiscordSRV Guide"
description: "Connect supported Minecraft chat and account-linking features with the 1MoreBlock Discord community."
---

DiscordSRV bridges selected Minecraft and Discord features. On 1MoreBlock it can support account linking, synchronized chat or roles, staff notifications, and integrations used by custom plugins.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- Minecraft-to-Discord and Discord-to-Minecraft chat channels where enabled.
- Secure account linking and unlinking.
- Role, nickname, and presence synchronization when configured.
- API used by 1MB-CMIAPI notifications and staff tooling.

## Commands

| Command | What it does |
| --- | --- |
| `/discord` | Shows DiscordSRV player help or the community invite. |
| `/discord link` | Starts the account-linking flow. |
| `/discord linked` | Shows whether your account is linked. |
| `/discord unlink` | Removes your account link when allowed. |

## Getting started

1. Run `/discord link` in game.
2. Follow the one-time instructions in the official 1MoreBlock Discord.
3. Use `/discord linked` to confirm the connection.

## Player notes

- Never share a link code publicly or with another person.
- Chat and role synchronization depend on 1MoreBlock channel and role configuration.
- Unlinking may remove linked-only access or synchronized roles.

## Official resources

- [Official documentation](https://docs.discordsrv.com/)
- [GitHub](https://github.com/DiscordSRV/DiscordSRV)

## Reference Links

- [Staff and technical reference](/staff-reference/other-server-features/discordsrv/)
- [1MoreBlock feature notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/discordsrv/)
- [Official plugin documentation](https://docs.discordsrv.com/)
