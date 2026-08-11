---
title: "1MB Shop permissions"
description: "Public-safe 1mb shop permissions for 1MB Shop."
---

| Permission | Intended scope | Purpose |
| --- | --- | --- |
| `shopguiplus.shop` | players | Open the shop and accessible pages. |
| `shopguiplus.info` | players | View `/buy info`. |
| `shopguiplus.help` | players | View permission-filtered help. |
| `shopguiplus.search` | players | Search accessible listings. |
| `shopguiplus.worth` | players | Inspect accessible buy prices. |
| `shopguiplus.stats` | players | View personal retained statistics. |
| `shopguiplus.buymore` | players | Use selected-amount and bulk-buy controls. |
| `shopguiplus.status` | staff | View version and status. |
| `shopguiplus.admin` | staff | View staff reference pages. |
| `shopguiplus.admin.cap.view` | staff | View cap policy and usage. |
| `shopguiplus.admin.cap.edit` | trusted staff | Hot-edit cap policy. |
| `shopguiplus.admin.cap.reset` | trusted staff | Reset one online player's window. |
| `shopguiplus.admin.stats.view` | staff | View retained aggregates. |
| `shopguiplus.admin.stats.edit` | trusted staff | Change statistics policy and retention. |
| `shopguiplus.admin.stats.export` | trusted staff | Create aggregate-only CSV exports. |
| `shopguiplus.admin.worth` | staff | Run read-only Worth reports. |
| `shopguiplus.admin.price.view` | staff | Preview and inspect price plans/history. |
| `shopguiplus.admin.price.apply` | trusted staff | Apply a validated price plan. |
| `shopguiplus.admin.price.rollback` | trusted staff | Roll back an eligible audited change. |
| `shopguiplus.debug` | staff | View read-only diagnostics. |
| `shopguiplus.debug.illegal` | staff | Run the catalogue-policy audit. |
| `shopguiplus.reload` | trusted staff | Reload configuration and shop data. |
| `shopguiplus.others` | trusted staff | Open a shop for another online player. |
| `shopguiplus.bypassgamemode` | trusted staff | Bypass disabled-gamemode access. |
| `shopguiplus.bypassworld` | trusted staff | Bypass world restrictions. |
| `shopguiplus.bypasspurchasecaps` | trusted staff | Bypass daily money/item caps. |
| `shopguiplus.buyfullinventory` | trusted staff | Use the buy-full-inventory amount action. |
| `shopguiplus.shop.addmodifier` | trusted staff | Add player buy-price modifiers. |
| `shopguiplus.shop.checkmodifiers` | staff | View player modifiers. |
| `shopguiplus.shop.resetmodifier` | trusted staff | Reset player modifiers. |
| `shopguiplus.shops.*` | configurable | Access every configured shop. |
| `shopguiplus.shops.<shop>` | configurable | Access one shop ID. |
| `shopguiplus.item.<shop>.*` | configurable | Access permission-gated items in one shop. |
| `shopguiplus.item.<shop>.<item>` | configurable | Access one permission-gated item. |
| `shopguiplus.pricemodifiers.<id>` | configurable | Apply one permission price modifier. |

`shopguiplus.*` is the operator wildcard. Prefer narrowly assigned permissions for normal staff roles.

## Reference Links

- [Staff overview](/staff-reference/custom-server-plugins/1mb-shopgui-plus/)
- [Player guide](/player-guides/custom-server-plugins/1mb-shopgui-plus/)
