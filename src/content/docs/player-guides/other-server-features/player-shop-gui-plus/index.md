---
title: "PlayerShopGUIPlus Guide"
description: "Let players list items in a shared marketplace and buy listings from other players."
---

Buy items from other players and offer your own items for sale on 1MoreBlock. The player market is separate from the server's `/buy` shop.

**Release status, checked 1 October 2026:** build `001` is the last confirmed live version. Build `037` is running on the development test server. Publishing this guide does not deploy the plugin to live; follow the version staff have announced.

| Where you are playing | Start here |
| --- | --- |
| Live server, last confirmed build `001` | [Current live commands](#current-live-commands-build-001). The server has a custom `/ah` shortcut. |
| Test server, or live after staff announce the update | [The market update](#the-market-update-build-037). `/market` and `/ah` are identical native commands. |

<a id="current-live-commands-build-001"></a>

## Commands

These are the native commands of last-confirmed live build `001`. Type `/playershop` to open the marketplace. Browse items, categories or player shops, inspect an item and its price, then confirm a purchase. Use your own shop to manage listings and **Unclaimed items** to retrieve cancelled or expired offers.

| Command | What it does | Example |
| --- | --- | --- |
| `/playershop` | Opens the marketplace. | `/playershop` |
| `/playershop sell` | Opens the selling menu when enabled. | `/playershop sell` |
| `/playershop sell 16 800` | Offers 16 of your held items for 800 total, subject to the selling-menu settings. | `/playershop sell 16 800` |
| `/playershop <name>` | Opens a player shop known to the server. | `/playershop Steve` |

The native aliases are `/pshop`, `/playershops` and `/pshops`. 1MB's existing custom `/ah sell 500` shortcut lists the held stack for **500 total**; it is server configuration, not the older plugin's native syntax.

The older native syntax puts **quantity before price**. Do not copy `/ah sell 500` into `/playershop sell 500`: the latter reads its single number as quantity. Missing arguments normally open the wizard, depending on settings. A complete command can list an item immediately.

<!-- Preserve previously published update links. -->
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
<a id="the-market-update-build-018"></a>
<a id="the-market-update-build-019"></a>
<a id="the-market-update-build-020"></a>
<a id="the-market-update-build-021"></a>
<a id="the-market-update-build-022"></a>
<a id="the-market-update-build-023"></a>
<a id="the-market-update-build-024"></a>
<a id="the-market-update-build-025"></a>
<a id="the-market-update-build-026"></a>
<a id="the-market-update-build-027"></a>
<a id="the-market-update-build-028"></a>
<a id="the-market-update-build-029"></a>
<a id="the-market-update-build-030"></a>
<a id="the-market-update-build-031"></a>
<a id="the-market-update-build-032"></a>
<a id="the-market-update-build-033"></a>
<a id="the-market-update-build-034"></a>
<a id="the-market-update-build-035"></a>
<a id="the-market-update-build-036"></a>

## The market update: build 037

The rest of this guide describes the tested update. `/market` is the main command and `/ah` is its native alias: every argument and permission works the same through either name. The old `/playershop`, `/pshop`, `/playershops` and `/pshops` roots are removed in this update.

## Getting started

1. Type `/ah info` for an introduction, or `/ah` to open the market.
2. Choose **Browse all items**, or the **Search & Browse** spyglass to find an item, category or player shop.
3. To sell, hold a stack in your main hand and type `/ah sell 500` to list that entire stack for **500 total**. This lists immediately, so check your hand and price first.
4. Use **Your shop** to manage offers, **Unclaimed items** to collect returns and `/ah recent` for your own sales and purchases.
5. Type `/ah help` for commands you can use, examples and this guide.

## Commands after the update

| Command | What it does | Example |
| --- | --- | --- |
| `/market` | Open the marketplace. | `/ah` |
| `/market info` | Introduction, next step, help and docs. | `/ah info` |
| `/market help` | List commands available to you. | `/ah help` |
| `/market sell <price>` | Immediately list the entire main-hand stack for this **total** price. | `/ah sell 500` |
| `/market sell` | Open the selling wizard when enabled; otherwise show usage. | `/ah sell` |
| `/market sell <quantity> <price>` | Offer an explicit quantity from your hand, using the configured direct/wizard behavior. | `/ah sell 16 800` |
| `/market search <material or keyword>` | Search vanilla materials; Tab suggests material names only. | `/ah search blue` |
| `/market <name>` | Open a locally known player's shop using their real full username. | `/ah Steve` |
| `/market recent [sales\|purchases] [page]` | Show your own completed sales and purchases. | `/ah recent purchases 2` |

`start` and `s` are shortcuts for `sell`. Use plain prices such as `12.50`, without currency signs, commas or suffixes. Holding 32 diamonds and typing `/ah sell 500` offers **32 diamonds for 500 total**, not 500 each. Only that main-hand stack is used. Invalid prices, empty hands and quantities outside server limits are rejected; the stack is never silently reduced to fit a limit.

Use real player names, keeping any Bedrock prefix. There are no separate `buy`, `cancel`, `claim` or `player` subcommands; buying, cancelling and collecting use menus.

## Find items and shops

Open **Search & Browse** to choose:

| Choice | Icon | What it does |
| --- | --- | --- |
| Search items | Paper | Type any keyword in chat, including custom names such as `magic box`. |
| Search player shops | Player head | Search a player or shop name in chat. |
| Browse player shops | Green copper chest | Browse player shops. |
| Browse categories | Chest | Browse categories, including **Storage & Containers** and **Collectibles**. |

Enchanted books remain in **Miscellaneous** for now. **Other** catches items that do not match a configured category.

For direct search, `/ah search blue` matches materials such as blue wool and blue stained glass. A complete name such as `/ah search blue_wool` selects exactly that material. Press **Tab** for vanilla material suggestions. Use underscores instead of spaces; searches ignore capitalization and accept `minecraft:blue_wool`. Paging, sorting and refresh keep your search. A valid material with no offers opens an empty menu you can refresh later.

Material search ignores custom names. To find a stick called `magic box`, enter `box` in the GUI's **Search items** chat prompt, or use `/ah search stick` for all sticks. Player-created names never become command suggestions.

Type the displayed cancellation word, normally `cancel`, to leave a chat prompt. It has no slash and does not cancel a listing. An unanswered prompt closes after **two minutes** and normal chat resumes. The market buffers a limited amount of chat and reports if older messages were omitted. An accepted material-search command also ends a pending prompt.

## Buy, cancel, claim, and search

**Buying:** inspect the item's quantity, seller and price, select a quantity and confirm the displayed cost. A partial purchase costs the corresponding proportion of the listing total. Check custom names, enchantments, damage and container contents, and leave enough inventory space.

If the server's **1MB-Library AutoSell** feature is on, turn it off with `/autosell` before buying, then retry. A blocked purchase gives you no item and does not change your AutoSell preference. Contact staff if the safety check is unavailable.

<a id="clicked-your-own-listing"></a>

**Cancelling:** use the listing's cancellation action and confirmation menu; right-click is the default on your own listing. Clicking your own listing as if buying also offers green **OK** to keep it listed and return, or orange **Cancel listing** to remove the offer. Cancellation moves it into **Unclaimed items**, not directly to your inventory. A full inventory does not prevent cancellation.

**Collecting:** open **Unclaimed items** and choose one listing, or use the **Collect all** hopper across every page. Each listing returns in full or stays available. Smaller listings may fit after a larger one is skipped. Nothing is dropped on the ground. Make room and collect again.

Expired and cancelled listings have **no automatic deletion timer**. They stay available until collected, unless an interrupted transaction needs staff review. Reaching the unclaimed limit blocks new offers, not existing returns: a 46th expiring listing is kept even when the limit is 45.

Wait for the success message before treating a listing, purchase, cancellation or collection as complete. If a transaction needs staff review, keep its reference ID and contact staff. Repeating clicks, reconnecting or restarting does not bypass a hold.

## Your menu and recent history

Menus have a light blue outer border and non-italic item titles and lore. Hover over **Your market**, bottom-left, for your active listings, returns and limits. It always describes you, even inside someone else's shop. **Close** is the barrier bottom-right, with **Back** immediately beside it. These buttons navigate only; they never confirm a trade. The main menu has no Back button.

Lists normally show up to **28 entries per page**. Use Previous and Next for the rest. **Change Item Order** starts with newest listings first and remembers your choice if you switch to oldest first, including across normal restarts. This applies to shops, categories, item search and unclaimed items.

`/ah recent` shows separate **Recent sales** and **Recent purchases** sections for your own player identity. If you have only bought items, sales says none. Use `/ah recent sales`, `/ah recent purchases`, or a page number such as `/ah recent purchases 2`. Each section shows five entries per page from your latest 100, with item, quantity, total paid, buyer, seller and UTC time. Updates can take five seconds. Staff have a separate whole-market view; ordinary `/ah recent` stays personal even for staff.

History begins when tracking was installed. Older trades cannot be recreated from current listings; known recording gaps are shown.

## Limits, fees, and display settings

Limits count **listing entries**, not individual items in a stack. Expired and cancelled entries occupy capacity until collected. Listing duration is time available for sale, not a deadline to collect a return.

When enabled, a listing fee is charged separately from the buyer's price. Build 037 does **not** support deferred fee refunds when an item sells, is cancelled or expires. Immediate compensation for a confirmed failed trade is a different process.

Staff configure limits, allowed items, worlds, game modes, the cancellation word and number display. Rounded or abbreviated prices do not change transaction amounts. The [staff hidden-settings reference](/staff-reference/other-server-features/player-shop-gui-plus/#hidden-configuration-options) preserves the inherited hidden keys, defaults and examples without requiring the vendor website.

## If something looks wrong

- **No access:** use `/ah help` and ask staff to check your market/sell grants and world or game-mode restrictions. Help and info require no market access.
- **Listing disappeared:** refresh the menu. It may have sold or expired; check your own Unclaimed items where relevant.
- **Unknown seller or generic head:** local name/skin records may be missing. The update displays the stored player ID if no trusted name is known and learns skins locally over time. Display text never changes payment or ownership identity. The older live build can still show `none`.
- **Market paused:** staff have paused menus and trading. Offers and returns remain stored. Help, info and personal recent history still work. Deadlines stay unchanged; overdue offers move to Unclaimed after reopening.
- **Payment, delivery or refund needs review:** contact staff with the time, item, quantity, price, message and reference ID. Do not try to bypass the hold or request duplicate replacements.

## More help

Use `/ah help` in the update. The [staff reference](/staff-reference/other-server-features/player-shop-gui-plus/) covers permissions, setup, configuration, placeholders and operations.

1MoreBlock maintains this custom version of [brc's PlayerShopGUIPlus](https://www.spigotmc.org/resources/playershopguiplus.37707/) for Paper 26.3. The vendor's [command reference](https://docs.brcdev.net/#/playershopgui/commands-permissions) describes its own version; use the release status above for 1MB.

## Reference Links

- [Staff and technical reference](/staff-reference/other-server-features/player-shop-gui-plus/)
- [1MoreBlock feature notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/player-shop-gui-plus/)
- [Official plugin documentation](https://docs.brcdev.net/#/playershopgui/commands-permissions)
