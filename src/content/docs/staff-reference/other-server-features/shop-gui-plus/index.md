---
title: "ShopGUIPlus Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for ShopGUIPlus."
---

Public-safe technical notes for staff who configure or support ShopGUIPlus on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/shop reload` | `shopguiplus.reload` | Reloads shops and configuration. |
| `/shop check <item>` | `shopguiplus.check` | Checks item matching in supported syntax. |
| `/shop worth <item>` | `shopguiplus.worth` | Checks configured worth. |
| `/shop <shop> <player>` | `shopguiplus.others` | Opens a shop for another player where supported. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `shopguiplus.shop` | Base shop access. | Players |
| `shopguiplus.shops.*` | Named shop access wildcard. | Use narrower shop nodes when possible |
| `shopguiplus.sell.hand` | Sell held item. | Players where enabled |
| `shopguiplus.sell.all` | Broad inventory sale. | Players only if intentionally enabled |
| `shopguiplus.reload` | Reload access. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Vault/CMI handles economy.
- 1MB-CMIAPI WorthDrift compares ShopGUIPlus prices with CMI worth data; WorthHelper supports review workflows.
- Custom-item, soul-bind, container, and metadata matching must be tested carefully.
- Reload should follow configuration validation because a malformed shop can affect broad economy access.

## Examples

```text
/shop reload
/shop check <item>
/shop worth <item>
```

## Troubleshooting

- Capture exact item metadata, shop/category/item ID, direction, quantity, unit price, and total.
- Check buy price and sell price separately.
- Verify economy withdrawal/deposit and inventory delivery/removal before compensating.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/shopgui-1-8-1-21.6515/)

## Reference Links

- [Player guide](/player-guides/other-server-features/shop-gui-plus/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/shop-gui-plus/)
- [Official plugin documentation](https://www.spigotmc.org/resources/shopgui-1-8-1-21.6515/)
