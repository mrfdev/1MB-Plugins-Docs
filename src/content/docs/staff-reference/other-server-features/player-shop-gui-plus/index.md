---
title: "PlayerShopGUIPlus Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for PlayerShopGUIPlus."
---

This is the public technical and operations guide for 1MoreBlock's maintained PlayerShopGUIPlus fork. For player instructions, use the [player guide](/player-guides/other-server-features/player-shop-gui-plus/). The plugin name and data directory remain `PlayerShopGUIPlus`.

**Release status, reviewed 1 October 2026:** `001` is the last confirmed live build. `028` adds the Search & Browse submenu and preserves navigation through shops, categories and search results. It retains 027’s HeadDatabase removal, native item support and local player/CMI skin caches. It awaits live deployment. The main reference below describes `028`; [older live commands](#older-live-build-001) are recorded separately. Confirm the installed version before using a command or planning an update. Build 018 makes recent history personal by UUID and adds a separate staff market-wide view. Build 017 adds menu-session and inventory-event hardening. Its isolated tests use synthetic players/inventories and a Vault boundary; connected-client and actual-provider acceptance remains required. This documentation does not announce a live plugin deployment.

<a id="commands-in-build-007"></a>

<a id="commands-in-build-008"></a>

<a id="commands-in-build-009"></a>

<a id="commands-in-build-013"></a>

<a id="commands-in-build-014"></a>

<a id="commands-in-build-015"></a>

<a id="commands-in-build-016"></a>

<a id="commands-in-build-017"></a>

<span id="commands-in-build-018"></span>

<span id="commands-in-build-019"></span>

<span id="commands-in-build-020"></span>

<a id="commands-in-build-021"></a>

<a id="commands-in-build-022"></a>

<a id="commands-in-build-023"></a>

<a id="commands-in-build-024"></a>

<a id="commands-in-build-025"></a>

<a id="commands-in-build-026"></a>

<a id="commands-in-build-027"></a>

## Commands in build 028

`/market` is the main command; `/ah` is its native alias, using the same handler, arguments, and permissions. Root aliases `/playershop`, `/pshop`, `/playershops`, and `/pshops` are no longer registered. Existing CMI/server aliases are separate configuration and can still override native commands.

| Command | Permission | Behavior |
| --- | --- | --- |
| `/market info` | None | Introduction, next action, help, and clickable player-guide link. |
| `/market help` | None | Available commands, descriptions, examples, and clickable suggestions. |
| `/market` | `playershopguiplus.playershop` | Open the marketplace. |
| `/market search <material or keyword>` | `playershopguiplus.playershop` | Exact vanilla item ID, otherwise substring keyword. Tab uses API materials only; in-game and active market required. |
| `/market recent [sales\|purchases] [page]` | `playershopguiplus.recent` | Your sales/purchases by server UUID; five entries per section/page, including empty roles. |
| `/market admin recent [page]` | `playershopguiplus.admin.recent` | Whole-market completed sales, with buyers, sellers and paid totals. |
| `/market sell <price>` | `playershopguiplus.playershop.sell` | Immediately list the exact main-hand stack for this total price. |
| `/market sell` | `playershopguiplus.playershop.sell` | Open the selling wizard when enabled; otherwise show usage. |
| `/market sell <quantity> <price>` | `playershopguiplus.playershop.sell` | Offer an explicit quantity from the main hand, using the configured direct/wizard behavior. |
| `/market <name>` | `playershopguiplus.playershop.player` | Open a locally known player's shop. Use the real username, retaining any Bedrock prefix. |
| `/market admin stats [topic] [page]` | `playershopguiplus.admin.stats` | Current counts/prices, sellers and recorded sales; see [statistics](#market-statistics-010). |
| `/market admin status` | `playershopguiplus.admin.status` | Show runtime mode, saved preference, readiness, build, storage/economy type and listing counts. |
| `/market admin reload` | `playershopguiplus.admin.reload` or `playershopguiplus.playershop.reload` | Reload supported settings, language, categories and sounds. |
| `/market admin disable` | `playershopguiplus.admin.disable` | Pause market access and trading, persisting through restarts. |
| `/market admin enable` | `playershopguiplus.admin.enable` | Save enabled mode and resume when shops/economy are ready. |
| `/market debug status [page]` | `playershopguiplus.debug.status` | Mode, saved preference, runtime versions, loaded counts and scheduled tasks. |
| `/market debug health [page]` | `playershopguiplus.debug.health` | Read-only readiness, database connection and transaction-review checks. |
| `/market debug hooks [page]` | `playershopguiplus.debug.hooks` | Selected providers/listeners plus installed optional plugin versions. |
| `/market debug commands [page]` | `playershopguiplus.debug.commands` | Native command registration, syntax, permissions and routing limits. |
| `/market debug permissions [page]` | `playershopguiplus.debug.permissions` | Declared nodes, configured limit tiers and your effective grants. |
| `/market debug placeholders [page]` | `playershopguiplus.debug.placeholders` | Plugin-local formatting tokens and their supported contexts. |
| `/market debug [help]` | Any debug topic grant | List permitted topics. |
| `/market admin [help]` | Any admin action permission | List only permitted staff actions. |
| `/market reload` or `/market r` | Either reload node above | Compatibility routes to admin reload. |

Examples: `/ah info`, `/ah help`, `/ah sell 500`, `/market sell 16 800`, `/market Steve`, `/market admin status`, `/ah admin disable`, `/ah admin enable`. `start` and `s` alias `sell`; `r` aliases `reload`. Root, admin and debug tab completion filter suggestions by permission.

Help/info are read-only and available to players and console, including before shop/player loading completes or in restricted worlds/game modes. They are case-insensitive; extra arguments show usage. Player help filters gameplay rows by the exact existing permissions; console help shows public guidance, permitted admin actions and an in-game reminder. Command rows suggest text in chat instead of executing sales or reloads. The header opens info and the docs link opens the player guide.

Admin actions and reload/r are case-insensitive and work from console or for permitted staff before gameplay gates, including while dormant. Extra arguments show usage. Sell retains lowercase matching. Trading, menus and player lookup require an active market, an in-game player, loaded shop/player data, and an allowed world/game mode unless bypassed. Unknown first arguments are player names except reserved help, info, admin, debug, recent and search, plus the existing sell/reload routes.

Buying, cancelling and claiming use menus. `buy`, `cancel`, `cancelothers`, `claim` and `player` are not subcommands. `/market search <material or keyword>` opens material-filtered results; the GUI chat prompt also supports custom item names. `/market recent [sales|purchases] [page]` and its `/ah` alias are the same personal read-only chat command; see [recent sales](#recent-sales-012).

### Search & Browse menus in build 028

The main menu now has four actions: **Browse all items**, **Search & Browse** (spyglass), **Your shop** and **Unclaimed items**, plus Close. The three-row submenu offers **Search items**, **Search player shops**, **Browse player shops** (green copper chest) and **Browse categories**. It has blue glass around its perimeter, pastel non-italic text, an arrow at bottom-right-minus-one and a barrier at bottom right. All four routes use `playershopguiplus.playershop`; no new permission, command, dependency or database migration is introduced.

Back retains the route and page through shop/category lists, individual shops/categories, search results and buy/cancel confirmations. Refresh and sorting retain that route. Chat item search still accepts custom names; cancelling the prompt returns to the submenu. Material command search remains available through `/market search` and `/ah search`, using only vanilla material suggestions. Closed inventories are not reused: returning creates a fresh checked GUI session. Existing cooldown, movement, permission and stale-session protections apply.

Configuration is in `menu.yml`: `menu.main.buttons.browse` is the spyglass; `menu.searchBrowse` defines the four choices (`searchItems`, `searchShops`, `shops`, `categories`) and `back`/`close`. The submenu’s `fill.item` fills only the perimeter. The main layout uses five rows with `items`, `browse`, `own`, `unclaimed` at zero-based slots 11, 15, 29, 33, and `close` at 44. The submenu uses slots 10, 12, 14, 16, with Back at 25 and Close at 26. `%number%` in its shops button counts shops with active listings; its categories button counts categories. Labels on list-page back buttons are rendered as **Back** to avoid an incorrect old “main menu” label.

For a saved menu without `menu.main.buttons.browse`, startup supplies the new main layout in memory, preserving the configured item definitions on the three surviving actions. It also supplies a missing `menu.searchBrowse` section. This does not write or erase the saved YAML. Review custom layouts before deployment. To save the new layout explicitly, back up `menu.yml`, merge the packaged `menu.main` and `menu.searchBrowse` sections while retaining intended customizations, and restart cleanly. The test clone receives only those two sections; all other saved menu sections remain unchanged. `/market admin reload` does not reload `menu.yml`.

Rollback to 027 requires restoring the matching previous menu sections as well as the prior jar: that version expects the four old buttons on the main menu. Keep current market, economy and player data when reverting a visual update; do not restore an old database over later trades. The live server remains last-confirmed 001. Isolated macOS Paper tests use synthetic players and economy boundaries; connected-client acceptance of this layout is still pending.

### GUI safety in build 017

Menus bind once to an exact player/data/view/request/world/market session. Admission and next-tick execution recheck that session and permissions. Fixed 200ms monotonic click/open cooldowns survive menu changes during a login; only one action/open can be pending. Extra inputs are silent. Open admission happens before scanning/rendering, and cancelled/replaced opens cannot activate. Rendering and player/inventory operations now run on the server thread. Database/name-cache I/O retains its existing background workers.

Ordinary left/right clicks operate buttons. `clickActions` still maps listing gestures, restricted to left/right/shift-left/shift-right/middle; other configured types cannot bypass the allowlist. Creative events never activate buttons. Click/drag handlers cancel movement throughout top and bottom inventories, including events already cancelled elsewhere; a previously cancelled click never triggers an action. Inventory move/pickup, player drop and offhand events are protected too. Close/open replacement, quit/kick/reconnect, death, world/game-mode change, reload, dormancy and shutdown invalidate sessions. Auto-refresh skips pending actions. Old close events cannot clear a newer menu.

Purchase confirmation rejects a changed item/quantity/price. Cancellation rechecks listing membership, expiry, owner and staff permission. Claims require an authoritative expired/cancelled item owned by the player and use actual component stack limits. Unexpected leftovers restore the inventory and retain the listing. Uncertain partial delivery blocks that listing in memory for reconciliation. Wizard confirmation now uses the guarded command-sale path and exact original hand slot/stack, including its restriction on positive fees combined with deferred refunds.

There are no new settings, permissions, placeholders or dependencies, and no schema/item migration. Build 028 implements the main Search & Browse cleanup; applying the full visual layout to every other menu remains separate. Reconcile uncertain inventory/payment outcomes before retry or restart: review guards remain in memory, and this release does not provide crash-atomic economy/inventory/SQLite recovery. The private `docs/GUI-HARDENING.md` and 017 change record document test scope and remaining two-client/provider/crash checks. Use the isolated `buy-smoke.py --case gui` suite after building the probes; never install probe jars on gameplay servers.

### Help and info text

The `GUIDE` section in `lang.yml` contains `INTRO`, `HELP`, `INFO`, `BROWSE`, `SELL`, `WIZARD`, `QUANTITY`, `PLAYER`, `RELOAD`, `ALIAS`, and `CONSOLE`. Build 007 also adds `GUIDE.ADMIN.STATUS`, `GUIDE.ADMIN.ENABLE`, `GUIDE.ADMIN.DISABLE`, `MSG.MARKET.PAUSED` and the `MSG.ADMIN.*` operation messages. Build 008 adds `GUIDE.DEBUG` and `MSG.DEBUG.CHECKING`; diagnostic row content is fixed English; build 009 makes its layout and pagination MiniMessage templates. Missing defaults are added during startup without replacing customized values. For example, merge this key into the existing section:

```yaml
GUIDE:
  INTRO: "Buy from other players or offer your own items for sale on 1MoreBlock.com."
```

The palette, header/field layout, command suggestions, and docs URL are defined by the plugin. The style follows the 1MB feature plugins using Paper Adventure directly; 1MB Library is not a runtime dependency. Keep the docs link at the published player-guide route, `/player-guides/other-server-features/player-shop-gui-plus/`.

### Selling behavior

`/market sell 500` and `/ah sell 500` list the entire current main-hand stack for **$500 total**, immediately. Matching items in other slots and the offhand are not included. This form bypasses the wizard while retaining permissions, item restrictions, quantity/price bounds, listing capacity, and fees.

| Configuration | `sell <price>` | `sell` without values | `sell <quantity> <price>` |
| --- | --- | --- | --- |
| `enableStartGui: true`, `enableSmartStartGui: true` | Direct whole-stack listing | Wizard | Direct listing |
| `enableStartGui: true`, `enableSmartStartGui: false` | Direct whole-stack listing | Wizard | Wizard |
| `enableStartGui: false` | Direct whole-stack listing | Usage, no listing | Direct listing |

A single number means price regardless of `commandSell.requireQuantity` or `commandSell.requirePrice`. `defaultSettings` may initialize the wizard; omitted values no longer silently list an item at a default price. The explicit form `/market sell 16 800` means 16 items for 800 total.

Enter positive finite decimal prices such as `12.50`, without currency symbols, grouping separators, or abbreviated suffixes. Invalid prices, extra arguments, and invalid quantities are rejected. A whole stack outside configured bounds is rejected rather than reduced. Menu/display formatting does not change command input syntax.

### Older live build 001

The older native root is `/playershop`, with `/pshop`, `/playershops`, and `/pshops` as aliases. Its commands are `/playershop`, `/playershop sell [quantity] [price]`, `/playershop <name>`, and `/playershop reload`, with the same permission nodes shown above. All are player-only. It has no native help/info or `/market`/`/ah` registration.

Its sell syntax is quantity-first. With smart selling GUI enabled, omitted arguments open the GUI; with the GUI disabled, the `commandSell.requireQuantity`, `commandSell.requirePrice`, and `defaultSettings` settings determine omitted arguments. A live CMI `/ah sell <price>` shortcut can supply the quantity itself and therefore behave differently from the native command. Do not carry that quantity-inserting alias over to native `/ah` without reviewing it.

## Permissions

| Permission | Purpose |
| --- | --- |
| `playershopguiplus.playershop` | Opens the main marketplace and inherits recent history. Declared with default op in 012, retaining prior effective default. |
| `playershopguiplus.recent` | View only your own sales/purchases including counterparties; default op, inherited by market access and wildcard. Explicit denial wins. |
| `playershopguiplus.playershop.sell` | Creates listings. |
| `playershopguiplus.playershop.player` | Opens another player's shop by name. |
| `playershopguiplus.playershop.reload` | Legacy grant for admin reload, reload and r. |
| `playershopguiplus.debug` | Grants all six read-only diagnostic topics; default op. |
| `playershopguiplus.debug.status` | Mode, saved preference, runtime versions, loaded counts and scheduled tasks. Default op. |
| `playershopguiplus.debug.health` | Read-only readiness, database connection and transaction-review checks. Default op. |
| `playershopguiplus.debug.hooks` | Selected providers/listeners plus installed optional plugin versions. Default op. |
| `playershopguiplus.debug.commands` | Native command registration, syntax, permissions and routing limits. Default op. |
| `playershopguiplus.debug.permissions` | Declared nodes, configured limit tiers and your effective grants. Default op. |
| `playershopguiplus.debug.placeholders` | Plugin-local formatting tokens and their supported contexts. Default op. |
| `playershopguiplus.admin` | Grants all six admin actions; default op. |
| `playershopguiplus.admin.stats` | Read paginated current-market and seller/sales statistics; default op. |
| `playershopguiplus.admin.recent` | View all market sales; default op, included in the admin umbrella. |
| `playershopguiplus.admin.status` | Read status; default op. |
| `playershopguiplus.admin.reload` | Reload supported settings; default op. |
| `playershopguiplus.admin.disable` | Persistently pause the market; default op. |
| `playershopguiplus.admin.enable` | Persistently enable the market; default op. |
| `playershopguiplus.bypassgamemode` | Bypasses configured game-mode restrictions. |
| `playershopguiplus.bypassworld` | Bypasses configured world restrictions. |
| `playershopguiplus.editshopname` | Enables the GUI shop-name editing flow. |
| `playershopguiplus.cancelothers` | Enables the configured GUI action to cancel another player's listing. |
| `playershopguiplus.tax.exempt` | Exempts the player from listing tax and associated refund eligibility. |
| `playershopguiplus.tax.refund` | Allows configured purchase, expiry, or cancellation tax refunds. The corresponding refund setting must also be enabled. |
| `playershopguiplus.limit.<name>` | Selects the retained-listing limit from `limits`, including active, cancelled, and expired entries. |
| `playershopguiplus.unclaimedlimit.<name>` | Selects a cancelled/expired-item limit from `unclaimedLimits`. |
| `playershopguiplus.*` | Grants recent history, the admin and debug umbrellas plus the descriptor's inherited reload, sell, player-shop browsing, bypass, edit-name, cancel-others, and tax-exemption children. |

There are no separate buying, claiming, search or ordinary self-cancellation permission nodes. Direct material search checks the base `playershopguiplus.playershop` grant. Help and info are public.

The wildcard's declared children do not include main-menu access, refund permission, or dynamic limits. Grant required nodes explicitly. Configured limit tiers are sorted by numeric value descending, and the first granted tier wins; the `default` value is the fallback. Limits count listing entries, not individual items within a stack. Restrict bypass and cancellation permissions to the intended staff roles.

The bundled tiers are `limits.default: 10`, `limits.donator: 50`, `unclaimedLimits.default: 20`, and `unclaimedLimits.donator: 40`. Their concrete nodes are `playershopguiplus.limit.default`, `playershopguiplus.limit.donator`, `playershopguiplus.unclaimedlimit.default`, and `playershopguiplus.unclaimedlimit.donator`. Keep the `default` entries when customizing tiers.

The base-menu node, recent node, seven admin nodes and seven debug nodes explicitly default to operators. Debug and admin are separate umbrellas; explicit child denials are respected. Debug grants do not add trading or administration access. Inherited nodes retain their previous unspecified defaults. Configure grants deliberately and check effective permissions with the installed permission manager. A normal player who should browse and sell needs the base menu node and sell node; player-name lookup is a separate grant. Do not grant the staff wildcard as a substitute. For a LuckPerms user-specific change, use the player's verified server UUID, including Bedrock identities; group grants target the intended group ID.

## Unclaimed-items tooltip (026)

The main-menu ender chest explains that unlisted items from cancelled or expired listings are ready to collect. Its count remains the viewer's cancelled/expired listing entries, not the sum of stack quantities. Players open it and select entries to return items to their inventory. This wording does not add bulk collection or change retention, limits, permissions or item storage. Menu text remains non-italic.

For an existing installation, back up `plugins/PlayerShopGUIPlus/menu.yml` and change only `menu.main.buttons.unclaimed.item.lore` to:

```yaml
- "&7Unlisted items from cancelled"
- "&7or expired listings."
- ""
- "&7Ready to collect: &f%number%"
- "&7Open, then select items to"
- "&7return to your inventory."
```

Keep the existing button name, icon, slot and other menu settings. A jar upgrade preserves saved menus; apply this change deliberately and restart cleanly, since `/market admin reload` does not read `menu.yml`. The local test menu has this wording. Restore the previous lore and restart to undo the cosmetic change.

## Category refresh (025)

There are 15 categories. Existing category IDs 1–13 and their labels/slots remain. ID 14, **Storage & Containers**, uses a waxed oxidized copper chest at zero-based slot 24 (the old gap); ID 15, **Collectibles**, uses a decorated pot at slot 31. Storage includes all coloured bundles and shulker boxes, normal/copper chests, barrels, shelves and bookshelves. Collectibles includes discs/fragments, pottery, armour trims, banner patterns, decorative heads, horns and selected rare finds. Chest boats/minecarts stay in Transportation; netherite upgrade templates stay in Materials. Enchanted books stay in Miscellaneous; a separate book category is deferred.

The refreshed defaults explicitly list 1,645 item materials verified against Paper 26.3 build 133. Other remains a catch-all for unmatched items, including 12 deliberately unlisted operator/technical materials. New Paper materials require another review; they are not assigned automatically. Broad categories match the underlying material, so renamed/custom items usually follow their vanilla material. Exact custom matching rules can still send a variant to Other; the inherited explicit APPLE metadata rule is retained.

The category-entry option `matchMaterialOnly: true` groups all variants of that material, ignoring the comparison flags for that entry only. Its default is false, retaining existing matching semantics. The refreshed player-head, potion, spawner and goat-horn entries enable it so textured heads, actual potion variants and configured spawners appear. A goat-horn entry still needs valid `musicInstrument` metadata when loaded, such as `minecraft:ponder_goat_horn`. Do not enable material-only matching for a category intended to distinguish specific provider items or metadata. Purchase comparison, item contents, ownership and payment validation are unchanged; no remote profile lookup is added.

A jar upgrade preserves existing `categories.yml`. Back it up and merge the packaged categories deliberately, retaining custom entries, provider IDs, comparisons, labels and slots. Do not delete the file or replace unrelated menu/configuration files to get new defaults. Adopt this option only with 025 or newer. Install the jar with a clean restart; later category-only edits can use `/market admin reload`, then reopen the menu. The 1MB test clone has the reviewed refreshed lists. Roll back the jar and its previous category file together; no market database migration is needed. New views filter existing listings without rewriting them.

## Local shop-owner skin cache (024)

Shop heads now remember locally observed skin textures across restarts. A complete connected-player profile refreshes its UUID's cached skin. When a shop head has no saved texture, the market can reuse a valid entry from CMI's already-loaded UUID skin map. A player who has never supplied a local skin can still appear as a generic head; the cache gradually fills as players return. Reopen a menu after learning a skin. Cached skins can remain old until a newer complete player profile is observed.

```yaml
playerSkins:
  cmiCache: true
```

This defaults to `true`, including when absent. Set it to `false` and use `/market admin reload` to stop new CMI imports; already saved skins remain usable. Ordinary local profile observations continue. This setting is separate from `playerNames.cmiFallback`. CMI and CMILib remain optional for these presentation features; no extra API jar, command, permission or placeholder is required.

The bridge reads only `getSkinManager().skinCacheByUUID.get(uuid)` after CMI is ready. It validates the entry UUID, any payload `profileId`, bounded texture data, Minecraft texture URL and skin model. It does not resolve identities from the skin's name, use CMI's broader `getSkin(...)` helper, read CMI files, or request an online profile. Missing/rejected entries have a five-minute cooldown with up to 4,096 remembered misses. Observed skins take precedence. CMI's own cache maintenance and normal client texture downloads remain independent.

The private `plugins/PlayerShopGUIPlus/player-skins.db` stores up to 10,000 UUID/name/URL/model/time records. It is a separate cosmetic SQLite cache, not market item or economy storage. Native head templates remain capped at 500; returned items are clones. Disk work stays on a dedicated background worker with a 512-write bound; startup publishes at most 100 records or two milliseconds per tick. Paper head construction and CMI map access stay on the server thread. No remote skin queue or bulk lookup is used.

`/market debug hooks [page]` reports skin load state, counts, persistence, CMI reuse and the disabled remote-lookup policy, without player records. Corrupt/unavailable/unsupported caches and failed writes retain the file, log a warning and leave in-memory rendering available. Repair the underlying problem while stopped and restart; newly learned skins may not persist after a warning or a crash before commit. Include the cache and any SQLite sidecars in stopped-server plugin backups. Build 023 ignores the added cache, so a cosmetic jar rollback can keep current market data; never restore old trades just to roll back heads.

Isolated Paper 26.3 checks use real CMI 9.8.10.1/CMILib 1.6.0.0 API maps with synthetic profiles. They cover malformed/conflicting entries, disabled reuse, missing-entry cooldowns and restart with CMI removed. Separate tests cover observed skin changes, clone isolation, persistence and a corrupt cache. These assert server metadata; connected-client visual acceptance and other CMI versions still need verification.

## Browse-shops copper chest (023)

The **Browse shops** button uses `WAXED_OXIDIZED_COPPER_CHEST`, the green copper chest, while keeping its label, lore, slot and action. Existing menu files are preserved: back up `plugins/PlayerShopGUIPlus/menu.yml`, set `menu.main.buttons.shops.item.material` to `WAXED_OXIDIZED_COPPER_CHEST`, then restart the server cleanly. New installations receive the packaged default. Restore the previous material and restart to undo it. There is no market-data migration.

Correction to earlier menu-update guidance: `/market admin reload` applies supported config/language/category changes but does not load `menu.yml`. Both the arrow and copper-chest changes require a clean restart when editing an existing menu.

## Back-navigation arrows (022)

Build 022 defaults all nine back-navigation buttons to `ARROW`, keeping their labels, positions and destinations. **Return to main menu**, **Return to shops** and **Return to categories** use the same navigation symbol. The earlier proposed nether-star back icon is superseded; the wider border/player-head/close-button layout remains planned.

A jar upgrade preserves existing `plugins/PlayerShopGUIPlus/menu.yml`. Back up that file, then set `menu.<section>.buttons.back.item.material` to `ARROW` for `shops`, `items`, `categories`, `own`, `shop`, `category`, `searchShops`, `searchItems` and `unclaimed`. Preserve other controls and custom labels/slots. Restart the server cleanly and reopen the menu. `/market admin reload` does not read `menu.yml`. Restore those nine values from the backup and restart to undo this cosmetic change. No market/player-data migration is needed.

## Item ordering and player preferences (021)

Item listing menus default to newest first. The top-left listing is the one with the latest creation timestamp; different expiry durations and no-expiry listings cannot change that meaning. **Change Item Order** toggles oldest/newest for that player, shared across all items, own/other shops, categories, search results and unclaimed items. This does not change the shop-list ordering or what `/ah` opens.

Paper stores the choice in the player's persistent data under `playershopguiplus:item_order_oldest_first`: byte `1` means oldest first, `0` newest first. Missing, wrong-type or other values default to newest. A valid click records either explicit choice; merely opening a menu does not write a default. Paper saves it through its normal player-data lifecycle, retaining it across reconnects and clean restarts. This is per authoritative player UUID and works independently of names and Java/Bedrock prefixes. It is not an immediate forced disk flush or a guarantee against losing the latest unsaved choice after a crash.

Back up/copy Paper's player data when moving the server; copying only the market plugin folder does not carry these preferences. On this Paper 26.3 clone the files live under the primary world's `players/data/`; inspect the actual layout on another server. No market database, saved item, ownership, quantity, price or economy migration occurs. The plugin updates only its namespaced preference key and preserves foreign player PDC and item metadata. No new permission, config or language key is added. Older jars ignore the preference; returning to 021 can restore it from retained player data.

## Direct material search (020)

`/market search <material or keyword>` and `/ah search` use the existing base market permission. No new permission node is needed. `/ah search blue` matches `blue` anywhere in canonical vanilla item IDs; `/ah search blue_wool` matches exactly that material. Full IDs take precedence over keyword matching, so `stone` does not include cobblestone or redstone. `minecraft:` is optional and input is case-insensitive. Spaces are not accepted; use underscores and Tab.

Suggestions come only from the running Paper API's non-legacy, non-air `minecraft` item materials, never listing names, lore, usernames or shop names. They are sorted and capped at 100; narrow the keyword for more specific choices. Completion returns an empty list for invalid/unauthorized input instead of falling back to player-name suggestions. Execution accepts one 1–64 character keyword of letters, digits or underscores, plus optional `minecraft:`. Other namespaces, tags/markup, separators, extra arguments and oversized values are rejected. These inputs are not evaluated as SQL, regex, placeholders or commands.

Valid material searches with no active listings open an empty refreshable menu; unknown keywords show guidance. Paging, sorting and refresh retain the material set and query current `IN_PROGRESS` listings. Normal expiry processing and action-time transaction checks still govern availability. The existing GUI chat search remains unchanged and can find `magic box` on a renamed stick; a stick does not become blue wool by changing its display name.

Command execution uses the existing active/loaded/world/game-mode checks. Menu admission and its 200ms cooldown run before listing scans, and publication repeats permission, connection and session checks. Accepted material search ends an existing market chat prompt and flushes queued chat once; rejected input leaves it alone. `search` is now reserved as a command root argument, so use GUI shop search for a player named `search`. Existing confirmation Back navigation is unchanged.

New language keys: `GUIDE.SEARCH`, `MSG.MATERIALSEARCH.UNKNOWN`, `MSG.MATERIALSEARCH.EMPTY`. They support the existing MiniMessage styling and add no replacement tokens. Existing custom language/menu files are retained. Help and paginated debug command/permission references include the new behavior. No storage, item payload, economy, dependency or permission migration. Reverting to 019 removes the direct command but retains GUI chat search and current data; use a clean jar swap with consistent current market/economy/inventory state.

## Non-italic menu tooltips (019)

All market GUI item titles and lore explicitly disable italics, including inherited client defaults and explicit italic segments in menu previews. This covers configured buttons, player/provider item names and lore, listing pages, and buy/cancel/sell confirmations after quantity or price updates. Colours, bold text and other metadata remain. No configuration rewrite or permission change is required. Italic codes in GUI text cannot override this presentation rule. Chat keeps its existing MiniMessage handling.

The renderer changes detached menu copies only: stored, held, purchased and reclaimed player items retain their complete original metadata, including intentional formatting from another plugin. Newly created internal spawner labels also use non-italic text. Existing spawners are not rewritten. Build 019 changes no market or history schema. Rolling back to 018 restores its tooltip formatting; keep current databases and inventories together rather than restoring only an older market database. Real-client visual acceptance remains separate from the automated Paper component/event checks.

## MiniMessage and pastel chat (009)

`lang.yml` supports MiniMessage for in-game messages, help/info, staff administration and diagnostics. Chat uses Paper's native Adventure components, preserving RGB colours, gradients, decorations, configured hover text and click actions. No extra plugin or bundled Adventure library is required. Native `/market` and `/ah` have identical styling and behavior.

### Palette

These names match the colours used by `1MB-Library`'s shared `MessageStyle`:

| Tag | Hex | Purpose |
| --- | --- | --- |
| `<body>` | `#e8d8a8` | Warm cream body text |
| `<muted>` | `#7d8790` | Quiet punctuation and separators |
| `<label>` | `#e3c7ff` | Lilac labels and market name |
| `<title>` | `#ffc8dd` | Soft pink headings |
| `<accent>` | `#bde0fe` | Pastel-blue commands and links |
| `<success>` | `#caffbf` | Soft green confirmation |
| `<warning>` | `#ffb454` | Amber warning emphasis |
| `<error>` | `#ff9e9e` | Soft red error emphasis |

Tags can close normally, for example `<accent>text</accent>`. Standard MiniMessage tags also work: `<#cba6f7>`, `<bold>`, `<italic>`, `<gradient:#ffc8dd:#bde0fe>`, `<newline>`, `<hover:show_text:'...'>` and `<click:open_url:'https://...'>`. The palette aliases are formatting tags, not new player-data placeholders or PlaceholderAPI expansions.

### Configuration examples

Merge these keys into the existing sections of `plugins/PlayerShopGUIPlus/lang.yml`; do not create duplicate YAML sections:

```yaml
PREFIX: '<muted>[<label>Market</label>]</muted> <body>'

GUIDE:
  INTRO: '<body>Buy from other players and offer your own items on <accent>1MoreBlock.com</accent>.'

MSG:
  NOACCESS: '<error>You do not have access to this command.</error>'
  ADMIN:
    ENABLED: '<success>Market enabled.</success> <body>Players can trade again when the market is ready.'
  PLAYERSHOP:
    SELL:
      CREATED: '<success>Listed</success> <accent>%quantity% x %item%</accent> <body>for <accent>%price%</accent> total.'

STYLE:
  HEADER: '<muted>[<label>Market</label>]</muted> <title>%title%</title>'
  DETAIL: '  <label>%label%:</label> <body>%value%</body>'
  COMMAND: '<accent>%command%</accent>'
  BULLET: '<muted>-</muted> %value%'
  PAGE: '<body>Page %page%/%pages%</body>'
  PREVIOUS: '<accent>  [Previous]</accent>'
  NEXT: '<accent>  [Next]</accent>'
```

Apply edits with `/market admin reload` (or `/ah admin reload`). The existing reload permission and failure behavior apply. It briefly closes market sessions and preserves the saved enabled/dormant preference. Commands, permissions and the server's existing trading checks are unchanged. The language defaults are saved at startup; reload prepares missing/default values in memory using the existing administration workflow.

`STYLE.HEADER`, `DETAIL`, `COMMAND` and `BULLET` style help/info/admin/debug layouts. The last three keys style diagnostic page numbers and navigation labels. Built-in command, docs, hover and Previous/Next actions remain attached. Diagnostic row labels/content remain fixed English; their surrounding layout is configurable. `GUIDE.*`, `MSG.*`, `TAX.*` and chat fallbacks from `NOTIFICATION.*` accept MiniMessage.

### Placeholders and safe data

Existing `%quantity%`, `%item%`, `%price%`, `%owner%` and other documented tokens retain their existing contexts. Layout tokens are `%title%` in HEADER, `%label%` and `%value%` in DETAIL, `%command%` in COMMAND, `%value%` in BULLET and `%page%`/`%pages%` in PAGE. No token is automatically valid in every message.

Runtime values become self-contained Adventure components while the trusted template is parsed. A player's item/shop name containing `<red>` or a click tag displays that text literally; it cannot introduce formatting, new click actions or a second round of placeholder expansion. Legacy section colours already present in item/currency presentation are preserved without parsing MiniMessage in those values. Gradients in the trusted template can include inserted values.

Tokens are expanded in the message body, not inside MiniMessage tag arguments such as URL, command or hover arguments. Keep those arguments static. For example, `%player%` inside `<click:run_command:'/something %player%'>` remains literal; this feature is not a configurable command dispatcher. Static hover text can use nested MiniMessage. Use MiniMessage syntax inside tag arguments rather than legacy section codes.

Ordinary player chat and chat deferred during a market search retain their existing handling. They are never passed through this MiniMessage renderer. Menu/item configuration outside `lang.yml` keeps its existing legacy formatter; this is not a migration of custom item data or `menu.yml`. Language text used by the legacy GUI title/lore APIs receives legacy RGB strings; click/hover interactions have no effect there.

### Existing configuration and fallback

Customized language values are retained, including `&a`, `§a`, bare `#RRGGBB`, `&#RRGGBB`, `§#RRGGBB` and repeated `&x`/`§x` RGB forms. Legacy colour codes reset legacy decorations; `&r` resets to the chat's default style. Legacy codes can be mixed with MiniMessage in normal template text. Existing `\n` and MiniMessage `<newline>` both create line breaks. Escape a literal MiniMessage tag with a backslash, such as `\<red>`.

Only exact matches for stock defaults are modernized automatically: the vendor prefix becomes the 1MB Market prefix, stock grey/white text uses `<body>`, stock green/red text uses `<success>`/`<error>`, and stock bold uses `<bold>`. Text and placeholder meanings stay the same. Missing STYLE keys are added. A custom prefix is not overwritten; use the example above to opt into the full 1MB appearance. Backups retain the previous language file for rollback to a pre-MiniMessage jar.

MiniMessage's lenient parser leaves invalid/unknown tags as text. If parsing raises a runtime exception, the renderer sends a literal component fallback with safe substitutions so a cosmetic error does not abort a transaction or recovery response. Static template caching is bounded to 512 entries; messages containing runtime values are not cached.

Official syntax: [MiniMessage format](https://docs.papermc.io/adventure/minimessage/format/). The pinned Paper 26.3 API/runtime supplies Adventure 5.2.0. No additional MiniMessage plugin or 1MB-library dependency is required.

## Placeholders

These are plugin-local message and menu replacements, not PlaceholderAPI expansion identifiers. This source registers no PlaceholderAPI expansion. Tokens are case-sensitive and work only in the relevant formatting context. Installing PlaceholderAPI does not expand arbitrary placeholders in these templates.

| Context | Supported tokens |
| --- | --- |
| Shop-card lore | `%id%`, `%name%`, `%owner%`, `%items%` (active listing count) |
| Category-card lore | `%name%`, `%items%` |
| Listing text, sale log, and expiry notification | `%owner%`, `%start%`, `%end%`, `%quantity%`, `%item%`, `%price%`, `%duration%`, `%timeleft%`, `%taxamount%` |
| Buying item lore | `%currentprice%` (price of the selected purchase quantity) |
| Main-menu buttons | `%number%` (the corresponding shop, active listing, category, own active listing, or unclaimed count) |
| Item-order button | `%order%` (localized sort order) |
| Bought transaction log | `%buyer%`, `%owner%`, `%quantity%`, `%item%`, `%price%` |
| Cancelled transaction log | `%player%` (acting player), `%owner%`, `%quantity%`, `%item%`, `%price%` |
| New shop name | `%player%` |
| Selling preview | `%quantity%`, `%price%` |
| Buy/cancel menu title | `%name%` (item name) |
| Shop/category menu title | `%name%` (shop/category name) |
| Individual language messages | `%usage%`, `%gamemode%`, `%world%`, `%limit%`, `%setting%`, `%value%`, `%amount%`, `%tax%`, `%cancel%`, `%name%`, `%player%`, plus item, quantity, owner, and price where that message supplies them |

`%price%` is the current listing total; `%currentprice%` is the selected purchase quantity's cost. Use the latter for the buy menu's selected-price display. `%taxamount%` is not a durable fee receipt; use the economy records for reconciliation.

Keep substitutions within the supplied message's context when editing `lang.yml`. For example, `%cancel%` belongs to chat-input prompts; `%buyer%` belongs to the bought log format. The inherited `log.messageFormats.expired` setting is not emitted by the current expiry method.

The inherited `TIME.LESSTHAN` message contains `%time%`, but no active renderer uses that message or replaces its token. It is not a supported general placeholder. Shop/category lore tokens likewise do not automatically work in item display names or arbitrary titles.

## Requirements and integrations

| Requirement | Operational meaning |
| --- | --- |
| Paper 26.3 | Current supported Minecraft/Paper target. Later releases require explicit verification; forward compatibility is a goal, not a guarantee. |
| Java 25 | Compile toolchain and target bytecode. The maintained local Paper test server runs Java 27. |
| Vault | Required server plugin, including when another economy type is configured. |
| Economy service | `economy.type: VAULT` requires a registered Vault economy provider. Purchases and nonzero direct-command fees in `012` require confirmed transaction support, implemented by the Vault adapter. |
| Vault permission service | Used for configured tax-refund eligibility checks. |

A CMI economy bridge can supply the Vault service. CMI, 1MB Library, ShopGUIPlus, and PlaceholderAPI are not direct requirements. There is no direct ShopGUIPlus `/buy` or sell-value lookup. Gson and NBT-API are included in the maintained jar; do not install separate copies just for this plugin.

| Optional integration | Purpose and limits |
| --- | --- |
| GemsEconomy (`GEMS_ECONOMY`), Gringotts (`GRINGOTTS`), PlayerPoints (`PLAYER_POINTS`), TokenEnchant (`TOKEN_ENCHANT`) | Retained alternate economies. In `012`, purchases and nonzero direct-command fees are unavailable through these adapters until confirmed-transaction support is implemented. |
| DeluxeChat | Search and rename chat-input hooks. |
| LangUtils | Item-name localization. |
| CrackShot, Oraxen, CustomItems, Brewery, Slimefun | Optional item providers. |
| ExecutableItems with SCore | Item provider enabled when both plugins are present. |
| Registered spawner providers | External spawner handling; selection is documented under hidden options. |

Install each provider's own required dependencies and verify its exact version with representative items. A retained hook is not a compatibility guarantee. `EXP` appears in an inherited configuration comment but has no implemented economy provider; do not select it. `CUSTOM` requires an externally registered implementation and is not a bundled economy.

## Configuration and routine operations

| File or setting | Purpose |
| --- | --- |
| `plugins/PlayerShopGUIPlus/config.yml` | Economy, storage, restrictions, limits, fees/refunds, expiry, click actions, logging, and formatting. |
| `plugins/PlayerShopGUIPlus/menu.yml` | Menu rows, slots, titles, buttons, and lore. |
| `plugins/PlayerShopGUIPlus/categories.yml` | Item categories and category buttons. |
| `plugins/PlayerShopGUIPlus/lang.yml` | Messages, chat prompts, number labels, and help/info text. Missing language defaults are generated on load. |
| `plugins/PlayerShopGUIPlus/database.db` | Existing authoritative SQLite data. Build 015 requires `database.type: sqlite`; MySQL is removed. |
| `plugins/PlayerShopGUIPlus/shops.log` | Optional text transaction log, enabled through `log.toFile`. Keep logs private. |

Bundled defaults are examples from the source, not a statement of the live configuration: SQLite storage, Vault economy, no listing fee (`tax.tax: false`), three-day expiry (`shopItemDuration: 4320` minutes), 10 retained and 20 unclaimed entries for the default tier, and automatic menu refresh disabled. Adventure, creative, and spectator modes are blocked by default; `disableInWorlds` starts empty. Preserve established server settings when upgrading.

Review `minSettings`/`maxSettings` bounds, `limits`/`unclaimedLimits`, `bannedItems`, `disableInWorlds`, `disableInGamemodes`, and `shopItemDuration` before opening the market. Retained-listing capacity includes active, cancelled, and expired entries. One entry may contain a full stack.

Default `clickActions` are left-click to buy, right-click to cancel your own listing, and shift-right or middle-click to cancel another listing with permission. Publish player controls that match the configured menus. The requested new 1MB menu layout is future work; this guide does not promise new blue borders or navigation buttons.

### Listing fees and refunds

`tax.tax` enables a listing fee; `tax.taxAmount` is the fraction of the total listing price, so `0.2` means 20%. Refund policy uses `tax.refund.purchase`, `tax.refund.cancelled`, and `tax.refund.expired`, with `tax.refundAmount` controlling the returned fraction and the relevant permissions controlling eligibility.

Build `012` does not support combining a nonzero direct-command listing fee with any enabled deferred-refund flag. Keep those flags disabled for nonrefundable fees; do not enable them later for existing listings without a maintainer-reviewed storage and reconciliation plan. Verify the wizard and provider behavior separately before changing fee policy. This release does not certify every historical refund path.

Treat any message requesting payment or delivery review as an operational stop for that trade. Ask a maintainer to reconcile the economy, item, and listing records privately before any retry, compensation, or restart. A restart is not a recovery procedure, and a success receipt alone does not certify every provider limit or crash scenario.

### Reload or restart?

`/market admin reload` (also `reload`/`r`; older live: `/playershop reload`) closes market sessions, pauses new activity, reads supported configuration/language/category files in the background and applies them on the server thread. It preserves the enabled/disabled preference. Invalid YAML or application errors leave trading paused; correct the cause and explicitly enable it. A successful reload does not clear an earlier error pause.

It does **not** rebuild `menu.yml`, reconnect storage, reinitialize providers, or reschedule startup tasks. Changed database, economy, logger, spawner and refresh-task settings are rejected because they require a clean restart. Console and permitted staff can reload while dormant. This is not a full validator for every historical setting.

Use a clean stop/start for jar replacements, menu layout changes, database/economy/provider changes, spawner selection, and lifecycle settings. Reopen menus after text/format updates. Do not use a server-wide reload or hot-loader as an installation or migration procedure.

## Optional CMI name cache (013)

When a GUI seller or recent-sale participant has no session, Paper-cache or plugin-table name, the market can check CMI’s already-loaded local record for that exact UUID. It retains the real username and Bedrock prefix, rejecting fake accounts, mismatched UUIDs, malformed names and names CMI marks as duplicates. Current-session names take priority. This is display-only: ownership and Vault payments still use the original server UUID. Staff statistics retain their separate plugin-table name snapshot.

Merge this optional setting into `plugins/PlayerShopGUIPlus/config.yml`:

```yaml
playerNames:
  cmiFallback: true
```

The default is `true`, including when absent from an older config. CMI and its required CMILib are optional; new lookups need both installed and CMI fully loaded. Tested with CMI 9.8.10.1 and CMILib 1.6.0.0. The CMI API used to compile the plugin is not a server jar to install. Economy continues through Vault. Set `false` and run `/market admin reload` to disable both this lookup and its saved fallback names; session/Paper/plugin-table names still work. Reopen menus after changes. No new command, permission or placeholder is needed. `%owner%` and recent-sale participant labels use the shared resolver.

The bridge reads the loaded UUID map and calls `getName(false)`, never CMI’s broader player lookup, its database or an online identity service. It does not fetch skins. Menus read memory only; CMI checks run on the server thread in batches of at most 20 UUIDs every 10 ticks, with a 2 ms budget. The queue holds 1,024 UUIDs. Misses become eligible again after five minutes when viewed; saved names become eligible for rechecking after 24 hours when requested. Startup queues unresolved shop owners up to that bound, then later menu/history views gradually fill remaining gaps. A first view may still show a UUID; reopen it after resolution. Unknown identities remain UUIDs.

The separate `plugins/PlayerShopGUIPlus/player-names.db` file keeps verified UUID/name/source/time records across restarts, up to 100,000 rows, separately from the SQLite shop store. All cache I/O is asynchronous, with a bounded write queue and a three-second SQLite busy timeout. Loaded rows reject malformed/noncanonical UUIDs, invalid names, unknown sources and invalid/future verification times. Previously learned names remain usable without CMI. Explicitly rejected refreshed CMI records remove their saved fallback. Names observed on join take precedence over late cached/CMI data.

Check `/market debug hooks` for readiness and cache health. An unreadable/corrupt/unsupported cache logs a warning and preserves its file; current in-memory resolution continues but new names may not survive restart. Correct the cause while stopped and restart to restore persistence. A crash before a queued cache write commits can lose that display update. Keep the cache private and back it up with the plugin data. Rollback to 012 ignores it; retain current trades and data rather than restoring an older market database for this cosmetic change.

## Paper 26.3+ maintenance (014)

Paper 26.3 is the minimum version. Build 014 removes all older Minecraft adapters, Maven modules and version-specific default resources. Java 25 remains the plugin compilation target; the local test server runs Java 27. The tested server is Paper 26.3 build 133 ALPHA. Newer Paper releases use the same public API implementation and must be validated before deployment; this is not a compatibility guarantee for every future release. Bukkit-only, Spigot and Folia are not supported targets.

The market schema, serialized item field, ownership UUIDs, quantities, prices and listing states are unchanged. Keep existing plugin data and configuration. Default templates now have plain `config.yml`, `menu.yml` and `categories.yml` paths inside the jar; existing server files are preserved. Commands, permissions and placeholders are unchanged. GUI titles, item names/lore and chat prompts use current Paper/Adventure APIs. Menu decoration preserves existing item components and foreign PDC. Already-cancelled chat is ignored; chat deferred during a market prompt retains per-viewer formatting and returns when input finishes. No remote player/profile lookup is introduced.

Supported configuration forms remain available:

- Use modern materials such as `RED_WOOL` and `ZOMBIE_SPAWN_EGG`; old numeric material variants and `monsterEggMob` are removed. `damage` now means damage on an item that supports durability. Simple material strings can use `minecraft:diamond_sword:37` where that format is accepted.
- Enchantments accept existing aliases such as `DAMAGE_ALL:5` and namespaced forms such as `minecraft:sharpness:5`. Banner patterns and horn instruments use registry names such as `minecraft:cross` and `minecraft:sing_goat_horn`. Existing sound names such as `ENTITY_EXPERIENCE_ORB_PICKUP` remain valid alongside `minecraft:entity.experience_orb.pickup`.
- `potion.type` accepts modern types, including `minecraft:long_swiftness`. Existing `SPEED`, `JUMP`, `INSTANT_HEAL` and `INSTANT_DAMAGE` aliases remain readable. `potion.extended: true` selects a long variant; `potion.level: 2` selects a strong variant. Choose an explicit variant or these flags, not both. Conflicting or impossible variants are rejected. Potion colour remains supported.
- `model: 123` sets the custom-model float value; other component lists are preserved. `skin` texture properties and locally cached `skullOwner` names remain supported. Missing local textures do not initiate a profile lookup. Existing typed `nbt` configuration still supports nested custom data; it is not silently replaced by PDC.

New built-in spawners have a `playershopguiplus:spawner_type` PDC marker and retain the previous `ShopGui/EntityId` tag. Old tagged spawners remain readable without being rewritten. Invalid/conflicting identity data fails closed; placement respects cancellation and build permission. External spawner plugins retain their own item formats. The marker identifies the format; it is not an anti-forgery signature.

The plugin no longer directly reflects into Authlib/CraftBukkit or selects an NMS implementation. The bundled NBT library still uses internals for configured custom-data interoperability and old spawner tags, and needs verification on future Paper versions. Optional public-plugin API checks and JDBC driver initialization remain. Build 015 removes the MySQL backend and confirmed-unused ItemsAdder/MMOItems/TownyChat hooks. Other optional integrations remain pending their own usage and compatibility reviews.

Gradle is the only maintained build, and runtime Java deprecation/removal warnings now fail compilation. Old source and rollback artifacts are retained privately. Before replacing a live jar, follow the backup/test/restart procedure below and check existing listing/unclaimed counts and representative metadata. A rollback must retain trades made since the backup. These changes do not complete the wider GUI security, performance or durable transaction-recovery work.

<a id="storage-and-dependency-cleanup-015"></a>

## Storage and dependency cleanup (027)

1MB's owner confirmed that the server does not use MySQL, uses CMI chat, and does not use ItemsAdder, MMOItems or TownyChat. On 1 October 2026, the owner requested removal of the market's HeadDatabase integration; this does not uninstall the separate HeadDatabase plugin from the server. The copied market configuration selects SQLite. Verify the actual live selector again before deployment; this record is not a new live-server inspection.

Build 015 removes the MySQL backend and the ItemsAdder/MMOItems/TownyChat adapters, listeners and compile stubs. It retains Vault/CMI payments, local CMI name resolution, the existing external registration/spawner APIs, and the other optional integrations listed above pending individual review. No command, permission, placeholder, price or ownership change is introduced. Serialized third-party items are not deleted or converted; the removed providers' custom creation/comparison hooks are no longer available.

**Storage preflight:** set and retain `database.type: sqlite` (case insensitive). Missing/unknown/MySQL values stop startup before the market database is opened; there is no empty SQLite fallback. Reload rejects unsupported selectors and preserves the running configuration. Keep `database.db`, existing `database.tableNames.players`/`shops`, statistics, local names, market state and configuration. Defaults remain `players` and `shops`. Old `database.mySQL*` keys in an existing SQLite configuration are ignored and can be removed manually; the plugin does not rewrite files to delete them. No schema migration is needed for the existing SQLite store. Do not turn a MySQL installation into SQLite just by changing this value: it needs a separately reviewed consistent export, ID/UUID/item preservation, count/state checks, copied-server tests and rollback plan.

**HeadDatabase removed (027):** the market no longer detects, calls or waits for HeadDatabase. Its soft dependency, API 1.3.2, readiness polling/listeners, custom catalogue-ID creation/comparison and synthetic provider probe are removed. It no longer appears in the market's hook diagnostics. The earlier requirement to test the real HeadDatabase binary before market staging is superseded.

Before upgrading, check `headDatabase:` item selectors in `config.yml` bans, `categories.yml` items/icons and `menu.yml` buttons/fillers/notifications. These now reject startup or reload with the exact unsupported configuration path, even when a fallback `material` is supplied. Startup refuses before opening the market stores. Admin reload retains the previous running configuration and pauses trading; correct the file, reload, then explicitly enable. Removed `itemsAdder` and `mmoItems` definitions follow the same policy. Existing saved menu files are preserved and require a clean restart after edits.

Replace wanted configuration heads deliberately with native `material: PLAYER_HEAD` and the existing base64 `skin` option, retaining the intended texture and matching restrictions. Do not broaden a specific head ban into a generic head ban or discard it blindly. Already-stored listings are native Paper items and need no conversion: their texture, name, lore, foreign PDC/components, quantity, owner and price remain. Special matching by a HeadDatabase catalogue ID is gone; normal texture/owner and configured metadata comparisons apply. The local clone has no obsolete selectors, so it needs no saved-config edit.

Player-head icons, persisted local skins and CMI's loaded UUID skin-cache reuse work independently and remain supported. No new remote lookup is introduced. Never install test probes on gameplay or live servers.

For rollback, use the preserved earlier jar with current market/economy data. Do not restore a stale database over subsequent trades. This cleanup leaves SQL failure propagation, durable payment recovery, broader GUI hardening and the remaining provider audit as separate work.

## Hidden configuration options

This self-contained reference covers the PlayerShopGUIPlus-specific options and the shared number-format options from brc's hidden-options documentation, checked against our maintained fork on 28 September 2026. The upstream links below are attribution; you do not need the brc website to configure these settings.

### Configuration keys and defaults

`capitalizeItemNames`, `cancelWord`, and `spawnerProvider` are optional keys absent from the bundled default configuration. The shared `numberFormat` section is already present in our bundled configuration, but is included here in full. Add or update these keys at the **top level** of `plugins/PlayerShopGUIPlus/config.yml`; keep the nesting under `numberFormat` shown below. Merge into existing sections instead of adding duplicate keys. These are this fork's defaults when values are absent, not a copy of a live server configuration:

```yaml
capitalizeItemNames: true
cancelWord: "cancel"
spawnerProvider: ""

numberFormat:
  decimalSeparator: "."
  groupingSeparator: ","
  minimumIntegerDigits: 1
  maximumIntegerDigits: 32
  minimumFractionDigits: 0
  maximumFractionDigits: 8
  hideFraction: true
  shortScale:
    enableShortScaleNumbering: false
    shortScaleLimit: 1000000
    shortHandDecimalLimit: 2
    shortHandNumberLimit: 32
```

Our defaults differ from the upstream general-page example in three places: `minimumFractionDigits` is `0`, `shortScaleLimit` is `1000000`, and `shortHandDecimalLimit` is `2`. The upstream example uses `1`, `1000`, and `6`, respectively. Existing server values continue to take precedence.

### Item names, chat cancellation, and spawners

| Key | Type and default | Behavior |
| --- | --- | --- |
| `capitalizeItemNames` | Boolean, `true` | Capitalizes the first letter of words in generated item names, including names returned by the configured language provider. Existing custom item display names are returned unchanged. With `false`, material names remain in their generated lowercase form, and localized names retain the provider's casing. This changes displayed text, not the stored item's name or metadata. |
| `cancelWord` | String, `"cancel"` | The word players type in chat to abandon a shop search, item search, or shop-name edit. Matching ignores case; it is chat input, not a slash command or listing-cancellation command. The core chat listener and the DeluxeChat hooks use this value. |
| `spawnerProvider` | String, `""` (empty) | Selects a registered external spawner provider by its registration name, ignoring case, **only when more than one provider is registered**. Use a name from the startup log, not an assumed plugin filename. One registered provider is selected automatically, regardless of this setting; no registered providers use built-in support. With multiple providers, an empty or unrecognized value leaves built-in support active and logs the available names. This setting does not install or register a provider. |

For example, `capitalizeItemNames: false` changes a generated `Diamond Sword` label to `diamond sword` without renaming a custom item. To use `stop` for chat cancellation, set `cancelWord: "stop"`. Keep `%cancel%` in the relevant `lang.yml` input prompts so the instructions match the configured word; update any prompts that hardcode the old word.

### Number and currency display

All paths below start under `numberFormat` in `config.yml`. These settings control displayed numbers and currency; they do not alter the transaction price, currency prefix/suffix, or command input syntax. Price arguments still use a decimal point, without thousands separators or abbreviated suffixes.

| Key under `numberFormat` | Type and default | Behavior |
| --- | --- | --- |
| `decimalSeparator` | String, `"."` | Character between the integer and fractional parts in ordinary formatting. Supply one nonempty character; the implementation uses only the first character. |
| `groupingSeparator` | String, `","` | Character between groups of digits in ordinary formatting. Supply one nonempty character. See the `hideFraction` caveat below before using `"."`. |
| `minimumIntegerDigits` | Integer, `1` | Minimum ordinary-format integer digits; smaller values are padded with leading zeroes. |
| `maximumIntegerDigits` | Integer, `32` | Maximum ordinary-format integer digits. A limit too small for the value can remove leading digits from the displayed amount. |
| `minimumFractionDigits` | Integer, `0` | Minimum ordinary-format decimal places, padding with trailing zeroes where needed. `hideFraction` can remove the fraction for some whole values. |
| `maximumFractionDigits` | Integer, `8` | Maximum ordinary-format decimal places; excess fractional digits are rounded for display. |
| `hideFraction` | Boolean, `true` | Attempts to remove the fractional part from whole values in ordinary formatting. Its current implementation has separator, zero, and large-value limitations described below. |
| `shortScale.enableShortScaleNumbering` | Boolean, `false` | Enables abbreviated display for values at or above `shortScaleLimit`. With it disabled, values use ordinary formatting. |
| `shortScale.shortScaleLimit` | Integer, `1000000` | Inclusive lower threshold for abbreviated display. Use at least `1000`; smaller thresholds can produce a literal `null` suffix for values below one thousand. |
| `shortScale.shortHandDecimalLimit` | Integer, `2` | Maximum decimal places in the abbreviated number; excess digits are rounded for display. |
| `shortScale.shortHandNumberLimit` | Integer, `32` | Maximum integer digits in the abbreviated number. A low limit can remove leading digits from the displayed amount. |

With the defaults, one million is shown as `1,000,000` before the economy provider adds its currency prefix/suffix. Enabling short scale changes that to `1 Million` with the default English suffixes and an English server number locale. Short-scale display uses the server JVM's number locale and its own two digit-limit settings; it does not honor the ordinary separator, minimum-digit, maximum-digit, or `hideFraction` settings. An abbreviated fractional value can therefore use a different decimal separator than an ordinary one.

The current `hideFraction` implementation splits text at a literal `.` rather than the configured decimal separator. For example, with `decimalSeparator: ","`, `groupingSeparator: "."`, and `minimumFractionDigits: 2`, it can show a whole value of 1234 as `1` instead of `1.234,00`. Use `hideFraction: false` with that separator combination. It also does not reliably remove padded fractional digits for zero or large whole values. Check representative prices on a test server before changing formatting; these display limitations do not change the underlying transaction amount.

### Short-scale labels in `lang.yml`

The abbreviated suffixes are separate language settings in `plugins/PlayerShopGUIPlus/lang.yml`. Merge this subtree into its existing `MSG` section, without replacing other messages or adding a second `MSG` key. The quoted leading spaces separate the number from the word:

```yaml
MSG:
  NUMBERFORMAT:
    SHORTSCALE:
      THOUSAND: " Thousand"
      MILLION: " Million"
      BILLION: " Billion"
      TRILLION: " Trillion"
      QUADRILLION: " Quadrillion"
      QUINTILLION: " Quintillion"
      SEXTILLION: " Sextillion"
      SEPTILLION: " Septillion"
      OCTILLION: " Octillion"
      NONILLION: " Nonillion"
      DECILLION: " Decillion"
```

These labels cover successive powers of 1000, from one thousand (10³) through one decillion (10³³). For a compact display, `THOUSAND: "k"` and `MILLION: "M"` produce suffixes without a space. A threshold of `1000000` still keeps values below one million in ordinary formatting even when a `THOUSAND` label is configured.

### Applying changes

A full, clean server restart reliably applies all settings above. The in-game reload command (`/playershop reload` on live `001`, `/market admin reload` in candidate `015`) refreshes item-name capitalization, the cancellation word, number-format settings, and language labels for subsequent formatting and input; reopen existing menus to see refreshed text. External spawner selection happens during startup and requires a restart. The 007 reload cancels outstanding market prompts; players should reopen the relevant menu afterward.

## Persistent maintenance mode (007)

Use `/market admin status` before changing mode. `/market admin disable` stops new market access, trading, cancellations, claims and automatic expiry processing, then saves the dormant state. Open market sessions close; queued input and stale menus are rejected. A transaction already executing completes its normal checks and delivery. Disabling does not undo completed trades or erase listings/unclaimed items.

The plugin remains loaded, with staff commands and data available. `/market admin enable` requires ready shop data and economy support, then saves enabled mode before allowing trading. World/gamemode bypass does not bypass dormancy. `/market info` and `/market help` remain public while paused.

The preference is stored in `plugins/PlayerShopGUIPlus/market-state.yml` as `enabled: true` or `enabled: false`. Include it in private backups. Existing installations without this file start enabled. Confirmed disable stays dormant through a clean server restart until staff explicitly enable it. Wait for the saved-state confirmation before restarting; a busy response means another operation is still running.

State-file or configuration failures leave trading paused. Check status and the server log, correct the problem and repeat the intended action. A failed state write leaves the previous saved restart preference unchanged; do not assume an unsuccessful disable will survive restart. Malformed saved state starts paused. Do not delete the file to bypass recovery.

Expiry deadlines are unchanged. While dormant no automatic expiry processing runs. When the market is enabled, overdue listings move to Unclaimed through the normal heartbeat; players can claim them after reopening. This feature adds no sales history and does not change the shop schema or item format.

Older jars, including 001 and 006, do not honor the dormant file. Stop the server and restore a reviewed jar/data pair for rollback; never rely on this preference to keep an older build paused. Maintenance mode also does not make payment-review guards durable across restart, so involve a maintainer before restarting unresolved trades.

## Staff diagnostics and pagination (008)

Use `/market debug` to list topics you can access. Every topic accepts an optional positive page number, starting at 1, and displays at most six entries. Click Previous/Next or type `/market debug permissions 2`; tab completion offers valid pages. Invalid/out-of-range pages show guidance. `/ah debug health` and `/market debug health` run the same handler. Console can use every topic with its permission, including while the market is dormant or shop/player data is loading.

Grant `playershopguiplus.debug` for all topics, or an individual `playershopguiplus.debug.<topic>` node from the table. These seven nodes default to op. Explicit child denials remain effective. A delayed health response rechecks the sender's permission and connection. Permission output concerns only the sender running the command; it does not inspect another player's grants or change permissions.

Examples:

```text
/market debug status
/ah debug health
/market debug hooks 2
/market debug commands 3
/ah debug permissions 2
/market debug placeholders 3
```

`status` shows mode, saved preference, plugin/server/Java versions, loaded shop/listing counts and scheduler state. `health` reports readiness, selected economy receipt support, item readiness and in-memory transaction-review counts. Its only database operation is `SELECT 1` on the existing storage worker and connection. Results are cached for five seconds and simultaneous requests share one probe. A four-second response deadline includes queue time; a busy or stalled query returns a warning. A timed-out pending probe is not duplicated, and a queued probe skips SQL if it has already timed out. Driver query timeout is requested at three seconds; the response deadline does not forcibly stop a driver. No reconnect, repair, schema scan, economy payment or recovery operation runs.

`hooks` separates actual selected adapters/listeners from installed plugin presence/version. CMI may supply economy through Vault; build 013 adds a separate optional CMI API hook for local display names. Its status row reports CMI readiness/absence, cached and pending counts, configuration disablement and persistence failure. No 1MB-library integration is added. An installed optional plugin is not proof that its hook is selected or compatible. `commands` checks native Bukkit registration for market/ah and their namespaced forms; external CMI aliases or chat interceptors must be inspected separately.

`permissions` includes declared nodes, current configured limit tiers and effective grants for the sender. It explains missing descriptor coverage and inherited wildcard limits. `placeholders` lists plugin-local formatting tokens and contexts, including the STYLE layout tokens added in 009; there is no PlaceholderAPI expansion, arbitrary template evaluator or new placeholder scope.

Diagnostics do not print player records, UUID lists, balances, item payloads, full configuration, credentials, SQL exception text or private file paths. They never clear review guards or enable the market. A successful database ping and ready providers do not establish safe financial transactions, healthy database contents or compatibility with all optional providers. Follow the normal recovery process for warnings; record the relevant topic/page when asking a maintainer for help.

## Build, install, and preserve existing listings

### Compile the maintained build

Use the authorized private source checkout and the intended release tag. Source and jars remain private. Build 016 uses Gradle 9.8.0. Set `JAVA_HOME` to JDK 25 or 27 to launch the wrapper; an installed JDK 25 remains required for compilation, with `JAVA25_HOME` available for explicit discovery. Install Python 3.11+ for tooling checks. Dependency versions are locked, and dependency jars/POM/module metadata plus the wrapper distribution use SHA-256 verification. The wrapper launcher checksum is checked before execution. On macOS:

```sh
export JAVA_HOME="$(/usr/libexec/java_home -v 25)"
python3 scripts/check-tooling.py
./gradlew --dependency-verification strict --warning-mode fail clean build smokeJars
python3 scripts/check-tooling.py --artifact
```

On other systems, set `JAVA_HOME` to the installed JDK 25 directory; on Windows use `gradlew.bat --dependency-verification strict --warning-mode fail clean build smokeJars` and `python` for the check scripts. The installable result is `build/libs/1MB-PlayerShopGuiPlus-v<version>.jar`; the tested update is `1MB-PlayerShopGuiPlus-v1.42.0-018-j25-26.3.jar`. Use the maintainer's recorded checksum to verify the supplied artifact. Test probes, compile stubs, old NMS handlers, and source archives are not server plugins to install.

For portable harness checks, run `python3 -m unittest discover -s scripts/tests -v`. After a successful strict build, `python3 scripts/test-dependency-guards.py` proves that tampered checksums, missing locks and incompatible upgrades fail, using offline disposable copies. Linux/macOS/Windows CI runs these tooling/build checks without private player data. Real Paper regression tests still require local Java 27, a prepared matching Paper bootstrap/cache, an already accepted EULA and approved provider jars; real-server coverage is currently macOS only. Tests select free loopback ports and unique directories, default to packaged configuration, accept explicit Java/server/config/provider/probe/output paths, reject stale results and stop timed-out test processes. They never use a gameplay server as their output directory. The three codec/sell/buy probes remain separate from the runtime jar. The obsolete HeadDatabase probe/task and `hdb-*` scenarios were removed in 027; `removed-headdatabase` verifies rejected legacy configuration without a provider jar.

Maintainers must follow the private repository's `docs/DEVELOPMENT-TOOLING.md` before changing Gradle/dependencies. Do not disable checksum checks or automatically accept new hashes to fix a build. The initial dependency checksum set is a recorded trust baseline, not a PGP signature check or security audit; all seven archived direct dependencies and all 22 project resolution graphs match 015. Wrapper/distribution checksums came from official Gradle metadata. Paper 26.3 build 133 and compile API 49 are unchanged. No market-data migration or gameplay restart is required for tooling work.

### Fresh installation

1. Install the reviewed Paper/Java combination, Vault, and the selected economy service. Add only the optional integrations actually needed.
2. Place one maintained PlayerShopGUIPlus jar in `plugins/` and start once to generate the `PlayerShopGUIPlus` data folder and configuration files.
3. Stop normally, configure economy, restrictions, limits, fees, permissions, categories, and menus, then restart.
4. Confirm the economy service and complete market loading before testing with normal player permissions.

### Upgrade an existing market

1. Verify the intended artifact and release behavior on a fresh test copy, including existing listings and unclaimed items.
2. Stop the target server normally. Back up the installed jar together with the complete `plugins/PlayerShopGUIPlus` directory, configured database, and the related economy state using the site's established backup procedure.
3. Replace the old jar with exactly one maintained jar. Preserve the `PlayerShopGUIPlus` folder, backend, table names, owner identities, configuration, and permission grants. Do not delete the database to make an empty market start.
4. For `015`, update scripts/menu links using former roots to `/market` or `/ah`. Review CMI and server command overrides and retire the quantity-inserting `/ah` shortcut when native `/ah` takes over. Verify both roots with real player permissions.
5. Start normally and check successful plugin enablement and complete market loading. Compare existing listings and unclaimed items with the pre-upgrade state before admitting trades.
6. Check representative selling, whole/partial buying, cancellation, expiry/claim, permissions, fees, balances, and metadata on the test copy. Include full inventories and a clean restart. Passing startup alone does not verify transactions.

The current Paper adaptation and `012` commands keep the storage schema and item field format; this update requires no shop-data migration. Back up the added `market-state.yml` preference, separate `statistics.db` analytics file and build-013 `player-names.db` cache with the rest of the plugin data. Build 015 supports SQLite only. Existing SQLite data needs no migration; a MySQL installation must retain its previous jar until a separate offline migration is designed and verified. Fully sold or claimed entries leave the shop store. Build 010 records new activity in a separate analytics file from its displayed start date; it cannot reconstruct earlier sales.

For rollback, preserve the then-current jar and data first and follow the maintainer's verified rollback record. An older jar is not automatically safer, and newer Paper item data may not load on an older server. Restoring an old database can erase trades made since that backup; do not restore one just to change command names. Future storage changes require a tested migration and recovery plan.

## Troubleshooting

| Symptom | Check and next step |
| --- | --- |
| The market reports a maintenance pause | Check `/market admin status`. Correct any reported fault and use `/market admin enable` when ready. |
| `/market` is unknown | Verify the installed build and command registration. `001` uses `/playershop`; `012` includes the maintained roots introduced in 003. |
| `/ah` behaves differently from `/market` | Inspect CMI/server aliases and plugin command ownership. The native alias uses the same handler; an external override can intercept it. |
| Help/info works but the menu does not | Check the base-menu permission, loaded shops/player data, and world/game-mode restrictions. Guidance is intentionally available before gameplay readiness. |
| No access or an unexpected listing limit | Inspect effective permission nodes and configured tier values. The wildcard does not explicitly include every node. Limits count retained entries, including unclaimed ones. |
| Shops are unavailable after startup | Investigate the recorded load error and configured storage/provider before changing data. Keep the database and saved items for diagnosis. |
| A seller is displayed as a UUID or `none` | Since `011`, names use local UUID records; a valid but unresolved seller displays their full UUID. `none` is reserved for a missing owner UUID, or older builds. Check the installed version and local record; never alter ownership to repair a label. See [seller names](#seller-names-011). |
| A listing cannot be bought from an old menu | Close and reopen the menu. It may have sold, expired, or changed. Check a reported payment failure privately before retrying. |
| An item is absent from active listings | Check cancelled/expired unclaimed entries and relevant transaction records before replacing anything. |
| A custom item looks wrong | Check provider startup and version compatibility, then compare representative metadata on a test copy. |
| Price text looks wrong | Review number formatting and the separator caveats in the hidden-options section. Enter command prices with a decimal point; display text is not a transaction receipt. |
| `/market recent` or `/ah recent` fails | Requires 012 and `playershopguiplus.recent` (inherited from base market access). Check external aliases, page syntax and storage errors. A storage error is not an empty history. Since 018, this is personal; staff use `/market admin recent` with its separate grant. |
| A charge, delivery, or refund needs review | Stop attempts on the affected trade and involve a maintainer. Privately collect time, authoritative player UUIDs, item/quantity, price, messages, and relevant records. |

Keep raw logs, databases, player records, credentials, and incident recovery instructions out of public reports. Staff should follow the private recovery record for actual reconciliation. Do not use a display name alone as proof of an account's identity.

## Upstream references

The hidden-options section above is self-contained. Upstream pages provide attribution and vendor context, not a dependency for configuring this fork:

- [Player guide](/player-guides/other-server-features/player-shop-gui-plus/)
- [brc commands and permissions](https://docs.brcdev.net/#/playershopgui/commands-permissions)
- [brc PlayerShopGUIPlus hidden options](https://docs.brcdev.net/#/playershopgui/hidden-options)
- [brc general hidden options](https://docs.brcdev.net/#/hidden-options)
- [Original brc plugin](https://www.spigotmc.org/resources/playershopguiplus.37707/)


## Seller names (011)

The GUI resolves the existing owner UUID against real usernames observed during the current plugin session, then Paper's existing UUID cache, then PlayerShopGUIPlus's configured player table. Build 013 adds the [optional persistent CMI name fallback](#optional-cmi-name-cache-013) after those sources. A valid UUID with no usable local name displays the full UUID. An absent owner UUID retains the configured missing-seller text and is invalid for purchasing. Labels are presentation only; payments and ownership still use the original UUID.

Player names preserve case and Bedrock prefixes. Database UUID text must be canonical. Names accept letters, digits, underscores and periods, from 1 to 40 characters; malformed rows and conflicting names for one UUID are excluded. Case-only duplicates are accepted. Current connected names and exact Paper UUID records take precedence over older database records. No nickname matching, name-derived UUID or Mojang lookup is used. CMI's API/database is not required for this feature.

Names load on the database worker, and Paper's existing cache is copied in small main-thread batches before shops become available. Menu rendering reads memory only. A returning player's current real username updates the existing player row asynchronously, retaining the UUID and registration date; new players use the existing registration table. A delayed startup snapshot cannot overwrite a newer join. If the name table cannot be read, a warning is logged and Paper/session names or UUID labels remain available. If saving a renamed username fails, its current-session label remains available but may revert after restart. Manual edits to offline player rows need a clean restart to reload the GUI name snapshot; normal config reload does not reread this table.

Seller heads use UUID-keyed templates with complete, usable local textures. Build 024 persists those skins and optionally reuses CMI’s loaded UUID skin map; see [local skin caching](#local-shop-owner-skin-cache-024). Missing textures still produce a generic head, and chest placeholders work. Name-based menu buttons use only the local cache and reject ambiguous matches. Displaying a name never triggers online profile completion.

There is no new command, permission, placeholder, plugin dependency, item-format change or shop-data migration. `%owner%` uses the resolved name or UUID. Back up the current jar and plugin/economy data before replacing the jar; verify representative offline, renamed and Bedrock sellers after restart. Rolling back to `010` restores its old name fallback but does not require restoring stale shop data. Preserve current trades and statistics. These focused checks do not complete the broader GUI/security or financial recovery work.

## Market statistics (010)

Use `/market admin stats` for the current-market overview, or `/market admin stats help` for the report list. `/ah admin stats` is the same native command. These staff commands work from console and while the market is dormant. Permission: `playershopguiplus.admin.stats`, default op and included in `playershopguiplus.admin`. A stats-only grant does not grant trading, reload or enable/disable access; an explicit child denial is respected.

### Commands and examples

All topics accept an optional positive page number. Reports have six rows per page, with clickable Previous/Next links and the existing configurable MiniMessage STYLE layouts. Completion suggests topics and the first page without querying storage. Use the displayed navigation/range for further pages.

| Command | Meaning |
| --- | --- |
| `/market admin stats [overview] [page]` | Current listings, individual item units, distinct sellers/materials, total asking value, unclaimed entries, excluded entries, expiry within 24 hours and oldest listing. Omit `overview` only when also omitting the page. |
| `/market admin stats prices [page]` | Minimum/maximum, arithmetic mean and median **listing totals**; min/max unit price and quantity-weighted mean unit price. |
| `/market admin stats sellers [page]` | Sellers ranked by current eligible listing count, with their item quantities and total asking value. |
| `/market admin stats items [page]` | Materials ranked by individual item quantity, with listing count and asking value. Metadata variants share a material row. |
| `/market admin stats history [page]` | Tracking start/coverage, new listings and purchases, sold units, gross revenue, mean and min/max purchase value. |
| `/market admin stats listings [page]` | Sellers ranked by newly created listings **since tracking began**. |
| `/market admin stats sales [page]` | Sellers ranked by completed purchase count since tracking began. |
| `/market admin stats revenue [page]` | Sellers ranked by gross proceeds since tracking began. |
| `/market admin stats help [page]` | Topic descriptions. |

Examples: `/ah admin stats`, `/market admin stats prices`, `/ah admin stats sellers 2`, `/market admin stats sales`, `/market admin stats revenue`, `/market admin stats history 2`. Console omits the leading slash. Invalid syntax/pages show usage or the available page range.

### Interpreting the figures

A listing containing 64 stone at 640 counts as **one listing**, **64 items**, a **listing price of 640**, and a **unit price of 10**. Weighted mean unit price is total asking value divided by total units. Median uses the middle listing price, averaging the middle two for an even number of listings. Amounts are displayed with two decimal places, using full numbers rather than abbreviated K/M suffixes. Asking prices across unrelated materials are a market summary, not a fair-value estimate.

Current reports capture loaded authoritative listing values. They exclude overdue entries when expiry is enabled, entries under purchase review/in flight, invalid prices/items, and ownership mismatches. Expired/cancelled entries are counted separately as unclaimed entries. An unloaded market is labelled unavailable, not empty. Dormancy is stated explicitly; otherwise eligible saved listings remain visible in the report. Prices are `n/a` when there are no eligible listings.

Each successful partial purchase counts as one purchase and its actual purchased quantity/value; a later purchase of the remainder is another purchase. Failed, cancelled, compensated and uncertain purchases do not count as successful sales. An uncertain purchase requiring staff review or a known save-submission failure marks coverage incomplete rather than adding a sales total. Gross revenue is the observed seller payment, **before listing fees**, and is not profit. New-listing counts do not subtract later cancellations/expiry. Existing listings are included in current reports but are not invented as new events.

Historical figures are grouped by the selected economy type and provider name. Events for other providers/currencies are excluded, with their count shown in `history`; there is no currency conversion. Renaming a provider creates a separate group. Changing the meaning of a currency while retaining its provider identity cannot be detected automatically. Review that history with a maintainer rather than combining incomparable values.

Sellers remain keyed by their stored server UUID. Presentation names come only from this plugin's local player table, cached for up to 60 seconds; a missing, invalid or conflicting name displays the UUID. Bedrock prefixes remain intact. Names are literal components and cannot inject MiniMessage or click actions. No Mojang lookup, UUID generation, permission edit or balance query is performed.

### Storage, performance and coverage

`plugins/PlayerShopGUIPlus/statistics.db` is a separate local SQLite analytics file, separate from the authoritative shop store. Paper already supplies its driver; no extra plugin or dependency is required. Existing SQLite shop tables, item serialization, ownership and financial state transitions are unchanged. This is a single-server statistics store; multiple servers are not aggregated.

The file stores compact event IDs, kind, UUIDs, timestamp, material, quantity, amount and provider identity, plus per-seller aggregates. It stores no item payloads or credentials. Events and aggregates commit in one SQLite transaction, and duplicate event IDs do not increment totals twice. Decimal arithmetic avoids accumulating binary rounding error in aggregate totals. These are analytics records, not a payment ledger or crash-recovery mechanism for trading.

All statistics I/O, sorting and aggregation use a dedicated worker. Only primitive listing snapshots are captured on the server thread; replies return to that thread and recheck permissions/connection. Reports share a five-second cache and a pending computation. Requests have a four-second reply deadline, one pending reply per player, and a global reply bound. Recording is queued with a 1,024-operation bound. A saturated/failed writer logs the problem and reports unavailable/incomplete history; it never reverses or interrupts trading. Correct the cause and cleanly restart to reopen the writer.

Tracking begins with this file's creation date. The old shop store removes sold entries, and optional customizable text logs cannot establish reliable UUID-based history, so earlier sales are **not imported or reported as zero lifetime sales**. No automatic pruning/reset is performed; include this growing file in backup and storage monitoring. Build 018 exposes the latest 100 sales and 100 purchases per requester UUID through `/market recent`; staff use `/market admin recent` for whole-market sales. Time windows and retention/export remain future work.

Clean shutdown queues a final flush and closes the worker without blocking the server thread. An unclean prior shutdown or detected recording error marks historical coverage incomplete, retaining that warning across restart. A crash/forced process exit may lose queued events, and cross-system payment/inventory/database atomicity is not claimed. Do not use these operational totals as financial reconciliation evidence.

### Upgrade and rollback

Back up the jar and complete plugin/economy data while stopped, including `statistics.db`, `market-state.yml` and `lang.yml`. Start 012 normally; current listings appear immediately, and history begins recording new activity. Reload does not reset history. There is no stats-delete/reset command.

Builds before 010 ignore `statistics.db`. Builds 010/011 can still read/write the original v1 event and totals tables, ignoring the additive details/indexes. Builds 012–017 expose whole-market history through the player recent permission; deny that node to normal players before rollback if personal-only visibility must be preserved. Preserve it during rollback, but record any interval spent on an older jar because that interval cannot be counted; the file cannot detect trades made by a build that does not record statistics. Returning to 010 or newer keeps existing totals. Do not restore stale shop/economy data just to restore analytics. Builds before 009 also require reviewing/restoring the prior language file because they do not support MiniMessage.

<a id="recent-sales-012"></a>

## Recent history (018)

`/market` and `/ah` are the same command. Personal history always uses the requesting player's actual server UUID, including for operators and staff. It never accepts another player's name or UUID.

| Command | Result |
| --- | --- |
| `/ah recent` | Your recent sales and purchases in separate sections, with an explicit empty message for either role. |
| `/ah recent sales [page]` | Items you listed that other players bought. |
| `/ah recent purchases [page]` | Items you bought from other players. |
| `/ah recent [page]` | Compatibility shorthand: that page of both personal sections. A shorter section says there are no more entries instead of showing an invalid page. |
| `/ah admin recent [page]` | Staff-only completed sales across the whole market. |

Each section shows five entries per page, newest first. Personal history retains a display window of **100 sales and 100 purchases per UUID**, selected in SQL before the limit; unrelated market activity cannot push your records out of that window. Staff history shows the latest 100 sales across the market. Previous/Next links retain the sales, purchases or admin scope. Times are UTC. New activity can take five seconds to appear and can shift page boundaries when the snapshot refreshes.

For example, a player who has only bought items sees no recorded sales and their own purchase list. A player with no recorded transactions sees two empty sections. Empty means no matching **recorded** activity, not proof of no lifetime trading.

Each entry shows the item, quantity actually purchased, **total paid for that quantity**, buyer and seller. A partial purchase is a separate entry from a later purchase of the remaining stack. New sales retain a plain-text custom name (or item-name component), capped at 80 code points, beside the material name. Older events use the material name. Formatting, clicks, lore, enchantments, container contents, PDC and full item payloads are not stored in this presentation history. Viewing history never restores, buys or claims an item.

Buyer and seller identities remain their stored server UUIDs. Names use the same trusted local resolver as seller labels: current-session usernames, existing Paper UUID cache, then validated plugin player records, followed in build `013` by the optional saved/CMI local-name fallback. Missing names are filled in small batches; reopen the view after resolution. Bedrock prefixes are retained; unknown names show the full UUID. Hovering a name shows the UUID. Names can change as local records are refreshed; they are not a claim about the username at the time of sale. No external identity lookup is performed.

### Access and visibility

The permission is **`playershopguiplus.recent`**, default op. Build 012 declares the existing base node `playershopguiplus.playershop` with its prior effective op default and makes recent a child, so existing explicit market grants inherit history. `playershopguiplus.*` also includes recent. An explicit recent denial overrides the parent. A recent-only grant does not grant market trading, selling or administration.

Build 018 changes the existing recent permission to **personal history only**. Each participant can see the counterparties and paid totals for their own transactions. A separate **`playershopguiplus.admin.recent`** node, default op and inherited from `playershopguiplus.admin`/`playershopguiplus.*`, allows whole-market history. A personal/base-market grant never adds staff history; explicit denials apply independently. Console must use `market admin recent [page]`; personal requests explain that route without querying storage. Even staff's `/market recent` stays personal. As a read-only command, recent works while the market is dormant or restricted by world/game mode. Denying recent hides it from help/completion and prevents storage access. This reserves `recent` as a command word, so `/market recent` no longer looks for a player with that name.

### Coverage and storage

Sales tracking began in build 010 with `plugins/PlayerShopGUIPlus/statistics.db`. Existing 010/011 events appear immediately; **sales before tracking cannot be reconstructed** from the shop store, which removes fully sold offers. Failed, cancelled, compensated and uncertain transactions are not recorded as successful sales. A known recording gap or unclean shutdown produces an incomplete-history warning. This optional analytics store is not an atomic financial ledger; queued events can be lost in a crash.

All recorded currencies/providers appear. Current-provider amounts use the configured currency prefix/suffix and full decimal amounts, without K/M abbreviations. Other provider amounts retain an explicit provider/currency label; no conversion is attempted. Changing a currency's meaning while retaining the same provider identity cannot be detected automatically.

Build 012 added `stats_sale_details(id, item_name)` and an index on `stats_events(kind, at DESC, id DESC)`. Build 018 adds `stats_events_seller_recent(kind, seller, at DESC, id DESC)` and `stats_events_buyer_recent(kind, buyer, at DESC, id DESC)` as indexes on the same events table. Startup creates missing indexes on the statistics worker; existing rows are retained. The original nine-column events table, totals, tracking start, and `user_version=1` remain unchanged. A new event, aggregate and optional item name commit together; a duplicate transaction ID changes none of them. No marketplace table or item-format migration occurs. No automatic deletion, reset or pruning occurs: the latest-100 limit is a **display window**, not a retention policy. Back up and monitor the growing analytics file.

Reads run on the existing statistics worker with bound UUID parameters, an indexed `LIMIT 100` for each role and immutable results. A personal request reads both roles in one queued operation. The five-second personal cache holds at most 128 UUIDs, shares pending work only for the same UUID, and expires completed entries before admitting more; a full cache fails explicitly. Staff history has a separate shared cache. Snapshot provenance is checked before rendering. The existing 1,024-operation worker bound still applies. Personal and staff commands together allow one pending reply per player UUID (128 globally), a four-second reply timeout, and reject invalid or excessive page numbers before querying. Completion never queries storage. Replies return to the main server thread and recheck permission and the original player's connection. A timeout does not cancel the underlying shared read; quit, permission loss and shutdown discard stale results. Storage failure is reported as unavailable, never as an empty history.

### Language and placeholders

Existing MiniMessage support and 1MB palette apply. Merge keys into existing YAML sections, then `/market admin reload`; missing keys receive defaults. Exact stock pre-018 help/loading/error/page text adopts the new wording at startup; customized values remain unchanged and should be reviewed for outdated whole-market wording. All dynamic values are literal components, so player/item text cannot supply markup or click actions.

| Language key | Tokens / meaning |
| --- | --- |
| `GUIDE.RECENT`, `GUIDE.ADMIN.RECENT` | Personal and staff help descriptions; no tokens |
| `MSG.RECENT.CHECKING`, `PENDING`, `FAILED` | Loading, duplicate request and unavailable messages; no tokens |
| `MSG.RECENT.PAGE` | `%pages%`: valid page maximum; `%command%`: canonical command for the selected view |
| `MSG.RECENT.CONSOLE` | Explains personal in-game use and the staff console route; no tokens |
| `RECENT.SCOPE`, `RECENT.PERSONALSCOPE` | `%limit%`: 100; `%since%`: tracking start in UTC |
| `RECENT.GAPS`, `EMPTY` | Incomplete coverage and empty staff history; no tokens |
| `RECENT.SALESTITLE`, `PURCHASESTITLE` | Personal section labels; no tokens |
| `RECENT.EMPTYSALES`, `EMPTYPURCHASES` | Empty personal roles; no tokens |
| `RECENT.END` | `%command%`: suggestion to reopen that shorter section from page one |
| `RECENT.SALE`, `RECENT.PURCHASE` | `%quantity%`: purchased units; `%item%`: name/material; `%price%`: actual total paid |
| `RECENT.PARTIES` | `%seller%`, `%buyer%`: locally resolved names/UUIDs; `%time%`: sale time in UTC |
| `STYLE.PAGE`, `PREVIOUS`, `NEXT` | Shared pagination; `%page%` and `%pages%` in `PAGE` |

```yaml
RECENT:
  SALE: '<muted>-</muted> <accent>%quantity% x %item%</accent> <body>sold for</body> <success>%price%</success>'
  PURCHASE: '<muted>-</muted> <accent>%quantity% x %item%</accent> <body>bought for</body> <success>%price%</success>'
  PARTIES: '  <label>Seller:</label> <body>%seller%</body> <label>Buyer:</label> <body>%buyer%</body> <muted>%time%</muted>'
```

These are plugin-local tokens, not PlaceholderAPI placeholders. The fixed personal/staff headings use `STYLE.HEADER`; section titles have the keys above.

## Reference Links

- [Player guide](/player-guides/other-server-features/player-shop-gui-plus/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/player-shop-gui-plus/)
- [Official plugin documentation](https://docs.brcdev.net/#/playershopgui/commands-permissions)
