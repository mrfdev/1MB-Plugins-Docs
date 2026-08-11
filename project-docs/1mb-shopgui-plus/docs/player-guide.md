# 1MB Shop player guide

Use `/buy` to browse and buy approved vanilla survival items on 1MoreBlock. The shop is buy-only: use the server's CMI selling features when you want to sell items back.

## Quick start

1. Run `/buy` to open the survival shop index.
2. Choose a category and browse its pages.
3. Click an item, choose an amount, and confirm the purchase.
4. Use the previous, next, and back controls to navigate.

The player head in the lower-left corner shows your skin, balance, and any enabled personal shop summary. Empty spaces inside normal category pages are intentional; the light-blue panes form the border.

## Player commands

| Command | What it does | Example |
| --- | --- | --- |
| `/buy` | Opens the survival shop index. | `/buy` |
| `/buy info` | Explains the shop and links back to this guide. | `/buy info` |
| `/buy help [page]` | Lists the shop commands available to your permissions. | `/buy help 2` |
| `/buy search <query> [page]` | Searches accessible vanilla listings by material or name. | `/buy search oak log` |
| `/buy worth [material] [page]` | Shows accessible buy listings for your held item or a named material. | `/buy worth diamond` |
| `/buy stats [today\|7d\|30d\|90d\|all]` | Shows your retained purchase summary when statistics are enabled. | `/buy stats 30d` |
| `/buy <shop> [page]` | Opens a known accessible shop and page directly. | `/buy survival_blocks 2` |

## Search and prices

`/buy search` shows the item, current price per item, shop, page, slot, and listing quantity. `/buy worth` lists every accessible place where the exact item can be bought. Your current buy-price modifiers are included.

The [searchable public price catalogue](./price-catalogue/) compares the static configured shop price with CMI Worth. It is a documentation snapshot, not a promise of your final in-game price: rank modifiers, future rates, and later configuration changes may differ.

## Purchase safeguards

A completed purchase should charge the displayed total once and deliver the complete amount once. If you lack money or inventory space, it should fail without partial delivery.

Generous daily limits can cap total effective money spent and total items delivered. A purchase that would exceed a limit is rejected completely. Failed, cancelled, unaffordable, or undeliverable purchases do not use allowance.

## Common messages

- **No permission:** the command, shop, or item is not available in your current context.
- **Shop not loaded:** the catalogue is still loading or failed to publish; try again later and tell staff if it persists.
- **No search result:** shorten the search or use the vanilla material name.
- **Not enough money/full inventory:** change the amount, make space, or add funds.
- **Daily limit:** use the remaining allowance shown or wait for its displayed reset time.
- **Statistics unavailable:** buying can still work while optional local statistics are loading or disabled.

Report a wrong price, duplicate charge, missing delivery, movable menu item, or other problem to staff with the shop, page, item, and approximate time.
