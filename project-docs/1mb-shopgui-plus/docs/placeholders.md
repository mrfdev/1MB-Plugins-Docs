# 1MB Shop placeholders

The PlaceholderAPI expansion identifier is `onembshopgui`. PlaceholderAPI is optional. Supported presentation templates can also use placeholders from other installed expansions, including CMI values such as `%cmi_user_world%`.

## Global and player

| Placeholder | Value |
| --- | --- |
| `%onembshopgui_global.status.loaded%` | Whether the current catalogue is published. |
| `%onembshopgui_global.version%` | Plugin version. |
| `%onembshopgui_global.default_shop%` | Valid configured default shop ID. |
| `%onembshopgui_global.placeholderapi.registered%` | Whether the expansion is registered. |
| `%onembshopgui_player.name%` | Viewing player name. |
| `%onembshopgui_player.uuid%` | Viewing player UUID. |
| `%onembshopgui_player.world%` | Viewing player world. |
| `%onembshopgui_player.balance%` | Formatted current/default shop balance. |
| `%onembshopgui_player.balance_raw%` | Unformatted finite balance. |

## Personal statistics

The following suffix groups are available when the local statistics service has data:

- `%onembshopgui_player.stats.today.purchases%`, `.items%`, `.spent%`, `.spent_raw%`, and `.failures%`.
- `%onembshopgui_player.stats.total.purchases%`, `.items%`, `.spent%`, `.spent_raw%`, and `.failures%`.
- `%onembshopgui_player.stats.last.material%`, `.amount%`, `.spent%`, and `.spent_raw%`.

## Current GUI context

| Placeholder | Value |
| --- | --- |
| `%onembshopgui_menu.type%` | Current menu type. |
| `%onembshopgui_shop.id%` | Current shop ID. |
| `%onembshopgui_shop.name%` | Current rendered shop name. |
| `%onembshopgui_page.current%` | Current page. |
| `%onembshopgui_page.total%` | Shop page count. |
| `%onembshopgui_item.id%` | Current item ID. |
| `%onembshopgui_item.name%` | Current item name. |
| `%onembshopgui_item.material%` | Current Bukkit material. |
| `%onembshopgui_item.amount%` | Displayed or selected amount. |
| `%onembshopgui_item.buy_price%` | Formatted effective price for the amount. |
| `%onembshopgui_item.buy_price_raw%` | Unformatted finite effective price. |

Context-only values are empty when there is no matching player, menu, shop, page, or item. Placeholder results are presentation data: they cannot change prices, permissions, actions, commands, or transaction authority.
