# PlayerShopGUIPlus

The player market lets you buy items from other players and offer your own items for sale on 1MoreBlock. It is separate from the server's ShopGUIPlus shop. 1MoreBlock maintains a custom version of brc's PlayerShopGUIPlus for Paper 26.3.

**Which commands can I use?** The last confirmed live version is build `001`. Start with the live instructions below. The tested `020` update uses `/market` and `/ah` and adds help/info plus a staff-controlled maintenance pause; [its commands are explained below](#the-market-update-build-020). Build 014 updates the internals for Paper 26.3 and newer while retaining existing listings and item metadata. Build 015 keeps the existing SQLite listings and fixes HeadDatabase startup handling. Build 016 improves development tooling and keeps the same game behavior. The commands and permissions below are unchanged by these cleanups. The update includes recent-sales chat, staff diagnostics, market statistics and soft 1MB chat colours. Seller names now use trusted local player records, including Bedrock prefixes. A seller whose name is still unknown is shown by their unique player ID. Detailed market statistics are staff-only and do not change listing prices or player permissions. Players do not need extra permissions or a new command to see the styling. Wait for staff to announce that update before relying on those native commands. The existing live `/ah` shortcut is configured separately by the server.

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

<a id="the-market-update-build-012"></a>

<a id="the-market-update-build-013"></a>

<a id="the-market-update-build-014"></a>

<a id="the-market-update-build-015"></a>

<a id="the-market-update-build-016"></a>

<a id="the-market-update-build-017"></a>

<span id="the-market-update-build-018"></span>

<span id="the-market-update-build-019"></span>

## The market update: build 020

Build 020 adds material search directly from chat:

- `/ah search blue` finds listings whose vanilla material name contains `blue`, including blue wool and blue stained glass.
- `/ah search blue_wool` finds only blue wool. A complete material name always selects that exact material.
- Type `/ah search blue` and press **Tab** to choose names such as `blue_wool` or `blue_stained_glass`. Suggestions use vanilla material names only, never player-created names.
- `/market search` works identically. It uses your normal market permission.

Use one word with underscores, as suggested by Tab. Searches ignore capitalization; `minecraft:blue_wool` also works. Paging, sorting and refresh keep your material selection and update the current listings. A valid material with no listings gives an empty results menu that you can refresh later. Starting a command search also ends any pending market chat prompt.

The GUI's **Search items** chat prompt still accepts custom names. For example, entering `box` there can find a renamed stick called `magic box`. Direct material search ignores custom names: that stick appears under `search stick`. Type a narrower material keyword if the suggestion list is long.

Build 019 removes italics from market menu item titles and tooltip lore, including buttons, listing previews and confirmation screens. Colours and bold emphasis remain. The styling applies to menu previews; the items you list, buy or reclaim retain their original metadata. No new command, permission or setting is needed.

This section describes the tested update awaiting live deployment. Its main command is `/market`, with `/ah` as a true alias: both run the same commands with the same permissions. The old `/playershop`, `/pshop`, `/playershops`, and `/pshops` roots are removed in this update.

### Menu controls and safety

Build 017 ignores extra clicks within 200 milliseconds and processes one action at a time. Use ordinary left/right clicks on navigation, quantity and confirmation buttons. Moving items around your own inventory, dragging, double-click collection, number keys, offhand swaps, dropping and creative item changes are blocked while a market menu is open. Configured listing gestures still work; staff shift-right/middle cancellation still requires staff permission.

A menu closes or becomes invalid after you close it, open another inventory, change world/game mode, die, disconnect, or staff reload/pause the market. Type `/market` or `/ah` to start again. If someone buys part of a listing or its price/contents change while you are confirming, reopen the listing to see the new details. The selling wizard checks that you still hold the original item in the same slot before listing it. Cancelled/expired items can only be claimed by their owner, with enough space for the item's actual stack limit.

### Seller names

Listing and shop labels use locally known real usernames. A player who changes their name refreshes that label when they next join. The update can also learn missing usernames from CMI’s existing local records and remember them for later visits. If a name is filled while you browse, reopen the menu to see it. No online player lookup is needed. If the server still has no trusted name for a seller, the menu shows their full player ID instead of `none`. That does not change who owns the listing. A generic player head simply means the server has no locally cached skin.

### Find your way around

- `/market info` introduces the market and shows what to type next, how to get help, and a clickable link to this guide.
- `/market help` shows the commands your permissions allow, with explanations and sell examples. Click a command suggestion to put it in chat, then review it before sending.
- `/ah info` and `/ah help` provide the same guidance. Neither help nor info needs an additional permission.

### See your recent sales and purchases

Type `/ah recent` or `/market recent` to see **your own** completed sales and purchases in separate sections. If you have only bought items, the sales section says there are no recorded sales and the purchases section shows what you bought. Staff using this player command also see only their own activity.

- `/ah recent sales`: items you listed that other players bought.
- `/ah recent purchases`: items you bought from other players.
- `/ah recent purchases 2`: the second page of your purchases.

Click Previous/Next to browse five entries per section/page, up to your latest 100 sales and 100 purchases. Other players' activity does not push your history out of that window. `/ah recent 2` still works as page two of both personal sections; a shorter section says when it has no more entries. New activity can take five seconds to appear.

Each entry shows the item, quantity, total paid, buyer, seller and UTC time. A partial purchase is recorded separately. New sales include custom item names; older records show the material. Names use locally known usernames or the full player ID when unknown. Your usual market access includes personal history unless staff explicitly deny it. It can still be read while trading is paused. Whole-market history is a separate staff command, `/ah admin recent`.

History starts when tracking began with build 010. Earlier sales cannot be recovered and interrupted recording may leave gaps; the command warns when gaps are known. An empty section means no matching recorded activity. This list does not let you buy, recover or claim a sold item.

### Sell the stack you are holding

1. Put the exact stack you want to sell in your **main hand**.
2. Check the stack and the total price you want to ask.
3. Type `/market sell 500` or `/ah sell 500` to list the entire held stack for **$500 total**.

This creates the listing immediately, without a selling menu. Holding 32 diamonds and typing `/ah sell 500` offers those **32 diamonds for $500 altogether**. It does not include matching diamonds in other slots or your offhand. Item names, enchantments, and other metadata stay with the item.

Use a decimal point for decimal prices, for example `/market sell 12.50`. Do not enter a currency symbol, thousands separator, or suffix such as `k` or `Million`.

| Update command | What it does | Example |
| --- | --- | --- |
| `/market` | Opens the marketplace. | `/ah` |
| `/market search <material or keyword>` | Find listings by vanilla material; use Tab for material names. | `/ah search blue` |
| `/market recent [sales\|purchases] [page]` | Your own sales/purchases, quantities, paid totals and counterparties. | `/ah recent purchases 2` |
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

There are no separate `buy`, `cancel`, `claim` or `player` subcommands. Build 020 adds direct material search with `/market search` and `/ah search`. Open Steve's shop with `/playershop Steve` on the older live build, or `/market Steve` after the update; `/market player Steve` is not valid syntax. Build 018 makes `/market recent` and `/ah recent` personal, with separate sales/purchases filters.

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
