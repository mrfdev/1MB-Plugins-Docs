---
title: "HeadDatabase Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for HeadDatabase."
---

Public-safe technical notes for staff who configure or support HeadDatabase on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/hdb reload` | `headdb.admin` | Reloads HeadDatabase configuration in supported builds. |
| `/hdb give <player> <id>` | `headdb.give` | Gives a selected database head where supported. |
| `/hdb search <term>` | `headdb.search` | Tests database search. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `headdb.open` | Opens the database. | Players where enabled |
| `headdb.search` | Uses search. | Players where enabled |
| `headdb.give` | Gives database heads. | Staff or controlled menus |
| `headdb.admin` | Administrative access. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Economy and permission hooks can control who may take or buy heads.
- Internet/database download health affects catalog freshness.
- The installed plugin is HeadDatabase; do not confuse its commands with other projects named HeadDB.

## Examples

```text
/hdb reload
/hdb give <player> <id>
/hdb search <term>
```

## Troubleshooting

- Confirm database download/update completed and categories loaded.
- Test the exact head ID as well as search text.
- Check economy, inventory space, world restrictions, and permission before reloading.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/head-database.14280/)

## Reference Links

- [Player guide](/player-guides/other-server-features/head-database/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/head-database/)
- [Official plugin documentation](https://www.spigotmc.org/resources/head-database.14280/)
