---
title: "LuckPerms Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for LuckPerms."
---

Public-safe technical notes for staff who configure or support LuckPerms on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/lp user <player> info` | `luckperms.user.info` | Shows a user permission summary. |
| `/lp user <player> permission check <node>` | `luckperms.user.permission.check` | Explains an effective permission check. |
| `/lp verbose on` | `luckperms.verbose` | Temporarily traces permission checks. |
| `/lp editor` | `luckperms.editor` | Creates a web editor session; treat the link as privileged. |
| `/lp sync` | `luckperms.sync` | Synchronizes data across messaging/storage where configured. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `luckperms.user.info` | Reads user permission state. | Support staff |
| `luckperms.user.permission.check` | Checks effective nodes. | Support staff |
| `luckperms.editor` | Edits permission data through web editor. | Server administrators |
| `luckperms.*` | All LuckPerms access. | Never grant as a convenience wildcard |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%luckperms_prefix%` | Highest-priority active prefix. |
| `%luckperms_suffix%` | Highest-priority active suffix. |
| `%luckperms_primary_group_name%` | Primary group name. |

## Configuration and integrations

- Nearly every plugin in this site consumes Bukkit permissions resolved by LuckPerms.
- Vault and chat/menu plugins can consume prefixes, suffixes, and primary-group data.
- 1MB-CMIAPI Upgrade depends on LuckPerms and several custom modules use it optionally.
- Web-editor URLs and verbose logs can expose sensitive permission structure; share only with authorized staff.

## Examples

```text
/lp user <player> info
/lp user <player> permission check <node>
/lp verbose on
```

## Troubleshooting

- Use permission check before adding any node.
- Include the world/server/context when a node works in one place but not another.
- Use verbose briefly to find the actual checked node, then turn it off.

## Official references

- [Official wiki](https://luckperms.net/wiki/Home)
- [Command usage](https://luckperms.net/wiki/Command-Usage)
- [GitHub](https://github.com/LuckPerms/LuckPerms)

## Reference Links

- [Player guide](/player-guides/other-server-features/luckperms/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/luckperms/)
- [Official plugin documentation](https://luckperms.net/wiki/Home)
