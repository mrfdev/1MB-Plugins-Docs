---
title: "UltimateFireworks Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for UltimateFireworks."
---

Public-safe technical notes for staff who configure or support UltimateFireworks on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/ultimatefireworks` | `ultimatefireworks.admin` | Common full command label; use installed help for exact syntax. |
| `/uf` | `ultimatefireworks.admin` | Common alias in some builds; verify before documenting operational use. |
| `/ultimatefireworks reload` | `ultimatefireworks.admin` | Common reload pattern; confirm installed help. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `ultimatefireworks.admin` | Common administrative node; verify installed build. | Server administrators |
| `ultimatefireworks.*` | Potential effect/command namespace. | Never grant without inspecting installed nodes |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Custom items and recipes require metadata compatibility.
- WorldGuard and event-area rules still control where effects are allowed.
- The paid upstream page is the best available authoritative reference; installed `/help` output is required for exact command/perms.

## Examples

```text
/ultimatefireworks
/uf
/ultimatefireworks reload
```

## Troubleshooting

- Capture item metadata, effect name, world, location, and trigger method.
- Check permission/world/effect configuration and whether another plugin consumed the item.
- For performance reports, record effect count and timing rather than repeatedly reproducing.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/ultimatefireworks-1-7-1-21.30201/)
- [Official discussion](https://www.spigotmc.org/threads/ultimatefireworks-1-7-1-21-paid.186430/)

## Reference Links

- [Player guide](/player-guides/other-server-features/ultimate-fireworks/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/ultimate-fireworks/)
- [Official plugin documentation](https://www.spigotmc.org/resources/ultimatefireworks-1-7-1-21.30201/)
