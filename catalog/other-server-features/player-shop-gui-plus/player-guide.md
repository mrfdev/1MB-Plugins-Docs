# PlayerShopGUIPlus

The player market lets you buy items from other players and offer your own items for sale on 1MoreBlock. It is separate from the server's ShopGUIPlus shop. 1MoreBlock maintains a custom version of brc's PlayerShopGUIPlus for Paper 26.3.

**Which commands can I use?** The last confirmed live version is build `001`. Start with the live instructions below. The tested `012` update uses `/market` and `/ah` and adds help/info plus a staff-controlled maintenance pause; [its commands are explained below](#the-market-update-build-012). The update includes recent-sales chat, staff diagnostics, market statistics and soft 1MB chat colours. Seller names now use trusted local player records, including Bedrock prefixes. A seller whose name is still unknown is shown by their unique player ID. Detailed market statistics are staff-only and do not change listing prices or player permissions. Players do not need extra permissions or a new command to see the styling. Wait for staff to announce that update before relying on those native commands. The existing live `/ah` shortcut is configured separately by the server.

## Getting started

1. Type `/playershop` to open the live marketplace. Browse all items, categories, or individual player shops.
2. Hover over a listing and check its item, quantity, price, seller, and expiry time. Open the buying menu to choose a quantity and confirm the cost.
3. To sell, hold the item in your main hand and type `/playershop sell`. When enabled, the selling menu lets you choose the quantity and total price.
4. Open your own shop to manage listings. Use **Unclaimed items** to collect expired or cancelled items; leave enough inventory space first.

Inspect custom, enchanted, renamed, damaged, and container items before buying. Follow the buttons and confirmation text in the current menu: staff can change layouts and click controls.

## Commands

These are the native commands in live build `001`.

| Command | What it does | Example |
| --- | --- | --- |
| `/playershop` | Opens the marketplace. | `/playershop` |
| `/playershop sell` | Opens the selling menu when enabled. | `/playershop sell` |
| `/playershop sell 16 800` | Offers 16 of your held items for 800 total, subject to the selling-menu settings. | `/playershop sell 16 800` |
| `/playershop <name>` | Opens a player shop known to the server. | `/playershop Steve` |

The built-in aliases are `/pshop`, `/playershops`, and `/pshops`. These commands require an allowed world/game mode and the relevant permissions.

**In this older native syntax, quantity comes before price:** `/playershop sell <quantity> <price>`. `/playershop sell 16 800` offers 16 items for **800 total**, not 800 each. Do not copy the server's custom `/ah sell 500` shortcut into `/playershop sell 500`: the older native command interprets its single number as quantity. Missing arguments normally open the selling menu, but settings can change this. A fully specified command can create a listing immediately.

<a id="the-market-update-build-006"></a>

<a id="the-market-update-build-007"></a>

<a id="the-market-update-build-008"></a>

<a id="the-market-update-build-009"></a>

<a id="the-market-update-build-010"></a>

<a id="the-market-update-build-011"></a>

## The market update: build 012

This section describes the tested update awaiting live deployment. Its main command is `/market`, with `/ah` as a true alias: both run the same commands with the same permissions. The old `/playershop`, `/pshop`, `/playershops`, and `/pshops` roots are removed in this update.

### Seller names

Listing and shop labels use locally known real usernames. A player who changes their name refreshes that label when they next join. If staff do not have a local name for a seller, the menu shows their full player ID instead of `none`. That does not change who owns the listing. A generic player head simply means the server has no locally cached skin.

### Find your way around

- `/market info` introduces the market and shows what to type next, how to get help, and a clickable link to this guide.
- `/market help` shows the commands your permissions allow, with explanations and sell examples. Click a command suggestion to put it in chat, then review it before sending.
- `/ah info` and `/ah help` provide the same guidance. Neither help nor info needs an additional permission.

### See recently sold items

Type `/market recent` or `/ah recent` to see the latest recorded purchases. Each entry shows the item, quantity bought, total paid, seller, buyer and time (UTC). Use `/ah recent 2` or click Previous/Next to browse five purchases per page, up to the latest 100. New sales may take five seconds to appear. A partial purchase appears separately from a later purchase of the remainder.

New sales include custom item names; older records show the material. Names use locally known usernames or the full player ID when unknown. This list is visible to players with recent-history access, including who bought from whom and what they paid. Your usual market access includes it unless staff explicitly deny it. The history can still be read while trading is paused.

History starts when sales tracking began with build 010. Older sales cannot be recovered, and interrupted recording may leave gaps; the command warns when gaps are known. This is a history list and does not let you buy, recover or claim a sold item.

### Sell the stack you are holding

1. Put the exact stack you want to sell in your **main hand**.
2. Check the stack and the total price you want to ask.
3. Type `/market sell 500` or `/ah sell 500` to list the entire held stack for **$500 total**.

This creates the listing immediately, without a selling menu. Holding 32 diamonds and typing `/ah sell 500` offers those **32 diamonds for $500 altogether**. It does not include matching diamonds in other slots or your offhand. Item names, enchantments, and other metadata stay with the item.

Use a decimal point for decimal prices, for example `/market sell 12.50`. Do not enter a currency symbol, thousands separator, or suffix such as `k` or `Million`.

| Update command | What it does | Example |
| --- | --- | --- |
| `/market` | Opens the marketplace. | `/ah` |
| `/market recent [page]` | Recently sold items, quantities, total prices, buyers and sellers. | `/ah recent 2` |
| `/market info` | Introduction, next command, help, and docs. | `/ah info` |
| `/market help` | Lists commands available to you. | `/ah help` |
| `/market sell <price>` | Immediately lists your entire main-hand stack for this total price. | `/ah sell 500` |
| `/market sell` | Opens the selling menu when enabled; otherwise shows usage. | `/ah sell` |
| `/market sell <quantity> <price>` | Offers a chosen quantity from your held stack, subject to the selling-menu settings. | `/ah sell 16 800` |
| `/market <name>` | Opens a player shop known to the server. | `/ah Steve` |

For player names, use the real username, including a Bedrock prefix where applicable. `start` and `s` remain shortcuts for the `sell` subcommand. Empty hands, invalid prices, and quantities outside the configured bounds are rejected; the whole-stack command does not silently reduce your stack to fit a limit.

## Buy, cancel, claim, and search

| I want to… | What to do |
| --- | --- |
| Buy an item | Open its buying menu, choose the quantity, check the displayed cost, and confirm. A partial purchase costs the corresponding proportion of the listing total. |
| Cancel my listing | Use its cancellation action and confirmation menu. Right-click is the default for your own listing; follow the current menu if configured differently. |
| Collect a cancelled or expired item | Open **Unclaimed items** and claim it with enough free inventory space. Cancellation does not immediately put it back in your inventory. |
| Find an item or shop | Use the menu's search button and answer the chat prompt. |
| Leave a search or shop-name prompt | Type `cancel` in chat, without `/`, unless the prompt gives a different word. Matching ignores case. This does not cancel an item listing. |

There are no separate `buy`, `cancel`, `claim`, `search`, or `player` subcommands. Open Steve's shop with `/playershop Steve` on the older live build, or `/market Steve` after the update; `/market player Steve` is not valid syntax. Recent sales are available through `/market recent` or `/ah recent` after the 012 update.

## Limits, fees, and display settings

Listing limits, unclaimed-item limits, expiry times, taxes, refunds, blocked items, and allowed worlds/game modes depend on server settings and your permissions. Limits count listing entries, rather than each individual item in a stack. Collecting unclaimed items can free retained-listing capacity.

A listing fee, when enabled, is charged when you create the listing. It is separate from the price a buyer pays. Do not assume cancelling or letting an item expire refunds a fee; follow the configured rules and messages.

Staff can change generated item-name capitalization, the chat cancellation word, and number formatting. Custom item names are preserved. Display rounding and labels such as `Million` do not change the actual price. The [staff hidden-settings reference](/staff-reference/other-server-features/player-shop-gui-plus/#hidden-configuration-options) contains the complete keys, defaults, and examples.

## If something looks wrong

- **No access:** ask staff to check market or sell permissions and world/game-mode restrictions. In the update, `/market help` and `/market info` remain available without market access.
- **A listing expired or disappeared:** close and reopen the menu to refresh it. Another player may have bought it, or it may have expired. Check your own unclaimed items where relevant.
- **Seller shown as `none`:** the server may lack a cached name for the saved seller identity. The tested update retains that identity for payments; the label alone does not mean the item has no owner. Ask staff if you are unsure.
- **The market is temporarily paused (007 and later):** staff have paused market access, buying, selling and claims. Your listings and unclaimed items are kept. Try again after staff reopen it; help/info remain available. Listing deadlines are unchanged, so overdue listings move to Unclaimed after reopening.
- **A payment, delivery, or refund failed:** stop and contact staff before retrying or requesting replacement items. Give the time, item, quantity, displayed price, and message privately so staff can check the trade.

## More help

Read the [staff and technical reference](/staff-reference/other-server-features/player-shop-gui-plus/) for setup, permissions, integrations, configuration, and troubleshooting.

The [original brc plugin](https://www.spigotmc.org/resources/playershopguiplus.37707/) and [upstream command reference](https://docs.brcdev.net/#/playershopgui/commands-permissions) describe the vendor version. This guide explains the 1MoreBlock version and its release status.
