---
title: "PlayerShopGUIPlus Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for PlayerShopGUIPlus."
---

This is the public technical and operations guide for 1MoreBlock's maintained PlayerShopGUIPlus fork. For player instructions, use the [player guide](/player-guides/other-server-features/player-shop-gui-plus/). The plugin name and data directory remain `PlayerShopGUIPlus`.

**Release status, reviewed 28 September 2026:** `001` is the last confirmed live build. `008` is tested on the local server and awaits live deployment. The main reference below describes `008`; [older live commands](#older-live-build-001) are recorded separately. Confirm the installed version before using a command or planning an update. This documentation does not announce a live plugin deployment.

<a id="commands-in-build-007"></a>

## Commands in build 008

`/market` is the main command; `/ah` is its native alias, using the same handler, arguments, and permissions. Root aliases `/playershop`, `/pshop`, `/playershops`, and `/pshops` are no longer registered. Existing CMI/server aliases are separate configuration and can still override native commands.

| Command | Permission | Behavior |
| --- | --- | --- |
| `/market info` | None | Introduction, next action, help, and clickable player-guide link. |
| `/market help` | None | Available commands, descriptions, examples, and clickable suggestions. |
| `/market` | `playershopguiplus.playershop` | Open the marketplace. |
| `/market sell <price>` | `playershopguiplus.playershop.sell` | Immediately list the exact main-hand stack for this total price. |
| `/market sell` | `playershopguiplus.playershop.sell` | Open the selling wizard when enabled; otherwise show usage. |
| `/market sell <quantity> <price>` | `playershopguiplus.playershop.sell` | Offer an explicit quantity from the main hand, using the configured direct/wizard behavior. |
| `/market <name>` | `playershopguiplus.playershop.player` | Open a locally known player's shop. Use the real username, retaining any Bedrock prefix. |
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

Admin actions and reload/r are case-insensitive and work from console or for permitted staff before gameplay gates, including while dormant. Extra arguments show usage. Sell retains lowercase matching. Trading, menus and player lookup require an active market, an in-game player, loaded shop/player data, and an allowed world/game mode unless bypassed. Unknown first arguments are player names except reserved help, info, admin and debug.

Buying, cancelling, claiming, and searching use menus. `buy`, `cancel`, `cancelothers`, `claim`, `search`, and `player` are not subcommands. `/market recent` is not implemented; there is no permission node that enables sales history.

### Help and info text

The `GUIDE` section in `lang.yml` contains `INTRO`, `HELP`, `INFO`, `BROWSE`, `SELL`, `WIZARD`, `QUANTITY`, `PLAYER`, `RELOAD`, `ALIAS`, and `CONSOLE`. Build 007 also adds `GUIDE.ADMIN.STATUS`, `GUIDE.ADMIN.ENABLE`, `GUIDE.ADMIN.DISABLE`, `MSG.MARKET.PAUSED` and the `MSG.ADMIN.*` operation messages. Build 008 adds `GUIDE.DEBUG` and `MSG.DEBUG.CHECKING`; diagnostic row labels are fixed English. Missing defaults are added during startup without replacing customized values. For example, merge this key into the existing section:

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
| `playershopguiplus.playershop` | Opens the main marketplace. Checked by code but not declared in the descriptor. |
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
| `playershopguiplus.admin` | Grants all four admin actions; default op. |
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
| `playershopguiplus.*` | Grants the admin and debug umbrellas plus the descriptor's inherited reload, sell, player-shop browsing, bypass, edit-name, cancel-others, and tax-exemption children. |

No separate buying, claiming, searching, or ordinary self-cancellation permission is checked by this build. Help/info in `008` are public.

The wildcard's declared children do not include main-menu access, refund permission, or dynamic limits. Grant required nodes explicitly. Configured limit tiers are sorted by numeric value descending, and the first granted tier wins; the `default` value is the fallback. Limits count listing entries, not individual items within a stack. Restrict bypass and cancellation permissions to the intended staff roles.

The bundled tiers are `limits.default: 10`, `limits.donator: 50`, `unclaimedLimits.default: 20`, and `unclaimedLimits.donator: 40`. Their concrete nodes are `playershopguiplus.limit.default`, `playershopguiplus.limit.donator`, `playershopguiplus.unclaimedlimit.default`, and `playershopguiplus.unclaimedlimit.donator`. Keep the `default` entries when customizing tiers.

The five admin nodes and seven debug nodes explicitly default to operators. Debug and admin are separate umbrellas; explicit child denials are respected. Debug grants do not add trading or administration access. Inherited nodes retain their previous unspecified defaults. Configure grants deliberately and check effective permissions with the installed permission manager. A normal player who should browse and sell needs the base menu node and sell node; player-name lookup is a separate grant. Do not grant the staff wildcard as a substitute. For a LuckPerms user-specific change, use the player's verified server UUID, including Bedrock identities; group grants target the intended group ID.

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
| Economy service | `economy.type: VAULT` requires a registered Vault economy provider. Purchases and nonzero direct-command fees in `008` require confirmed transaction support, implemented by the Vault adapter. |
| Vault permission service | Used for configured tax-refund eligibility checks. |

A CMI economy bridge can supply the Vault service. CMI, 1MB Library, ShopGUIPlus, and PlaceholderAPI are not direct requirements. There is no direct ShopGUIPlus `/buy` or sell-value lookup. Gson and NBT-API are included in the maintained jar; do not install separate copies just for this plugin.

| Optional integration | Purpose and limits |
| --- | --- |
| GemsEconomy (`GEMS_ECONOMY`), Gringotts (`GRINGOTTS`), PlayerPoints (`PLAYER_POINTS`), TokenEnchant (`TOKEN_ENCHANT`) | Retained alternate economies. In `008`, purchases and nonzero direct-command fees are unavailable through these adapters until confirmed-transaction support is implemented. |
| DeluxeChat, TownyChat | Search and rename chat-input hooks. |
| LangUtils | Item-name localization. |
| HeadDatabase, MMOItems, CrackShot, Oraxen, CustomItems, Brewery, ItemsAdder, Slimefun | Optional item providers. |
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
| `plugins/PlayerShopGUIPlus/database.db` | Default SQLite data. MySQL is also retained when selected by `database.type`. |
| `plugins/PlayerShopGUIPlus/shops.log` | Optional text transaction log, enabled through `log.toFile`. Keep logs private. |

Bundled defaults are examples from the source, not a statement of the live configuration: SQLite storage, Vault economy, no listing fee (`tax.tax: false`), three-day expiry (`shopItemDuration: 4320` minutes), 10 retained and 20 unclaimed entries for the default tier, and automatic menu refresh disabled. Adventure, creative, and spectator modes are blocked by default; `disableInWorlds` starts empty. Preserve established server settings when upgrading.

Review `minSettings`/`maxSettings` bounds, `limits`/`unclaimedLimits`, `bannedItems`, `disableInWorlds`, `disableInGamemodes`, and `shopItemDuration` before opening the market. Retained-listing capacity includes active, cancelled, and expired entries. One entry may contain a full stack.

Default `clickActions` are left-click to buy, right-click to cancel your own listing, and shift-right or middle-click to cancel another listing with permission. Publish player controls that match the configured menus. The requested new 1MB menu layout is future work; this guide does not promise new blue borders or navigation buttons.

### Listing fees and refunds

`tax.tax` enables a listing fee; `tax.taxAmount` is the fraction of the total listing price, so `0.2` means 20%. Refund policy uses `tax.refund.purchase`, `tax.refund.cancelled`, and `tax.refund.expired`, with `tax.refundAmount` controlling the returned fraction and the relevant permissions controlling eligibility.

Build `008` does not support combining a nonzero direct-command listing fee with any enabled deferred-refund flag. Keep those flags disabled for nonrefundable fees; do not enable them later for existing listings without a maintainer-reviewed storage and reconciliation plan. Verify the wizard and provider behavior separately before changing fee policy. This release does not certify every historical refund path.

Treat any message requesting payment or delivery review as an operational stop for that trade. Ask a maintainer to reconcile the economy, item, and listing records privately before any retry, compensation, or restart. A restart is not a recovery procedure, and a success receipt alone does not certify every provider limit or crash scenario.

### Reload or restart?

`/market admin reload` (also `reload`/`r`; older live: `/playershop reload`) closes market sessions, pauses new activity, reads supported configuration/language/category files in the background and applies them on the server thread. It preserves the enabled/disabled preference. Invalid YAML or application errors leave trading paused; correct the cause and explicitly enable it. A successful reload does not clear an earlier error pause.

It does **not** rebuild `menu.yml`, reconnect storage, reinitialize providers, or reschedule startup tasks. Changed database, economy, logger, spawner and refresh-task settings are rejected because they require a clean restart. Console and permitted staff can reload while dormant. This is not a full validator for every historical setting.

Use a clean stop/start for jar replacements, menu layout changes, database/economy/provider changes, spawner selection, and lifecycle settings. Reopen menus after text/format updates. Do not use a server-wide reload or hot-loader as an installation or migration procedure.

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
| `cancelWord` | String, `"cancel"` | The word players type in chat to abandon a shop search, item search, or shop-name edit. Matching ignores case; it is chat input, not a slash command or listing-cancellation command. The core chat listener and the DeluxeChat/TownyChat hooks use this value. |
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

A full, clean server restart reliably applies all settings above. The in-game reload command (`/playershop reload` on live `001`, `/market admin reload` in candidate `008`) refreshes item-name capitalization, the cancellation word, number-format settings, and language labels for subsequent formatting and input; reopen existing menus to see refreshed text. External spawner selection happens during startup and requires a restart. The 007 reload cancels outstanding market prompts; players should reopen the relevant menu afterward.

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

`hooks` separates actual selected adapters/listeners from installed plugin presence/version. CMI may supply economy through Vault; no direct CMI-API or 1MB-library integration is added. An installed optional plugin is not proof that its hook is selected or compatible. `commands` checks native Bukkit registration for market/ah and their namespaced forms; external CMI aliases or chat interceptors must be inspected separately.

`permissions` includes declared nodes, current configured limit tiers and effective grants for the sender. It explains missing descriptor coverage and inherited wildcard limits. `placeholders` lists plugin-local formatting tokens and contexts; there is no PlaceholderAPI expansion, arbitrary template evaluator or new placeholder scope.

Diagnostics do not print player records, UUID lists, balances, item payloads, full configuration, credentials, SQL exception text or private file paths. They never clear review guards or enable the market. A successful database ping and ready providers do not establish safe financial transactions, healthy database contents or compatibility with all optional providers. Follow the normal recovery process for warnings; record the relevant topic/page when asking a maintainer for help.

## Build, install, and preserve existing listings

### Compile the maintained build

Use the authorized private source checkout and the intended release tag. Source and jars remain private. Set `JAVA_HOME` to JDK 25 before launching the Gradle wrapper; the current wrapper cannot run on Java 27. On macOS:

```sh
export JAVA_HOME="$(/usr/libexec/java_home -v 25)"
./gradlew clean build
```

On other systems, set `JAVA_HOME` to the installed JDK 25 directory; on Windows use `gradlew.bat clean build`. The installable result is `build/libs/1MB-PlayerShopGuiPlus-v<version>.jar`; the tested update is `1MB-PlayerShopGuiPlus-v1.42.0-008-j25-26.3.jar`. Use the maintainer's recorded checksum to verify the supplied artifact. Test probes, compile stubs, old NMS handlers, and source archives are not server plugins to install.

### Fresh installation

1. Install the reviewed Paper/Java combination, Vault, and the selected economy service. Add only the optional integrations actually needed.
2. Place one maintained PlayerShopGUIPlus jar in `plugins/` and start once to generate the `PlayerShopGUIPlus` data folder and configuration files.
3. Stop normally, configure economy, restrictions, limits, fees, permissions, categories, and menus, then restart.
4. Confirm the economy service and complete market loading before testing with normal player permissions.

### Upgrade an existing market

1. Verify the intended artifact and release behavior on a fresh test copy, including existing listings and unclaimed items.
2. Stop the target server normally. Back up the installed jar together with the complete `plugins/PlayerShopGUIPlus` directory, configured database, and the related economy state using the site's established backup procedure.
3. Replace the old jar with exactly one maintained jar. Preserve the `PlayerShopGUIPlus` folder, backend, table names, owner identities, configuration, and permission grants. Do not delete the database to make an empty market start.
4. For `008`, update scripts/menu links using former roots to `/market` or `/ah`. Review CMI and server command overrides and retire the quantity-inserting `/ah` shortcut when native `/ah` takes over. Verify both roots with real player permissions.
5. Start normally and check successful plugin enablement and complete market loading. Compare existing listings and unclaimed items with the pre-upgrade state before admitting trades.
6. Check representative selling, whole/partial buying, cancellation, expiry/claim, permissions, fees, balances, and metadata on the test copy. Include full inventories and a clean restart. Passing startup alone does not verify transactions.

The current Paper adaptation and `008` commands keep the storage schema and item field format; this update requires no shop-data migration. Back up the added market-state.yml preference with the rest of the plugin data. SQLite and MySQL remain available. Fully sold or claimed entries leave the shop store, so it is not a sales-history database.

For rollback, preserve the then-current jar and data first and follow the maintainer's verified rollback record. An older jar is not automatically safer, and newer Paper item data may not load on an older server. Restoring an old database can erase trades made since that backup; do not restore one just to change command names. Future storage changes require a tested migration and recovery plan.

## Troubleshooting

| Symptom | Check and next step |
| --- | --- |
| The market reports a maintenance pause | Check `/market admin status`. Correct any reported fault and use `/market admin enable` when ready. |
| `/market` is unknown | Verify the installed build and command registration. `001` uses `/playershop`; `008` includes the maintained roots introduced in 003. |
| `/ah` behaves differently from `/market` | Inspect CMI/server aliases and plugin command ownership. The native alias uses the same handler; an external override can intercept it. |
| Help/info works but the menu does not | Check the base-menu permission, loaded shops/player data, and world/game-mode restrictions. Guidance is intentionally available before gameplay readiness. |
| No access or an unexpected listing limit | Inspect effective permission nodes and configured tier values. The wildcard does not explicitly include every node. Limits count retained entries, including unclaimed ones. |
| Shops are unavailable after startup | Investigate the recorded load error and configured storage/provider before changing data. Keep the database and saved items for diagnosis. |
| A seller is displayed as `none` | The local name cache may not know the stored UUID. In `008`, that name is presentation only; do not change listing ownership or invent a player identity to repair the label. |
| A listing cannot be bought from an old menu | Close and reopen the menu. It may have sold, expired, or changed. Check a reported payment failure privately before retrying. |
| An item is absent from active listings | Check cancelled/expired unclaimed entries and relevant transaction records before replacing anything. |
| A custom item looks wrong | Check provider startup and version compatibility, then compare representative metadata on a test copy. |
| Price text looks wrong | Review number formatting and the separator caveats in the hidden-options section. Enter command prices with a decimal point; display text is not a transaction receipt. |
| `/market recent` or `/ah recent` fails | The command is not implemented. There is no permission grant that enables it. |
| A charge, delivery, or refund needs review | Stop attempts on the affected trade and involve a maintainer. Privately collect time, authoritative player UUIDs, item/quantity, price, messages, and relevant records. |

Keep raw logs, databases, player records, credentials, and incident recovery instructions out of public reports. Staff should follow the private recovery record for actual reconciliation. Do not use a display name alone as proof of an account's identity.

## Upstream references

The hidden-options section above is self-contained. Upstream pages provide attribution and vendor context, not a dependency for configuring this fork:

- [Player guide](/player-guides/other-server-features/player-shop-gui-plus/)
- [brc commands and permissions](https://docs.brcdev.net/#/playershopgui/commands-permissions)
- [brc PlayerShopGUIPlus hidden options](https://docs.brcdev.net/#/playershopgui/hidden-options)
- [brc general hidden options](https://docs.brcdev.net/#/hidden-options)
- [Original brc plugin](https://www.spigotmc.org/resources/playershopguiplus.37707/)

## Reference Links

- [Player guide](/player-guides/other-server-features/player-shop-gui-plus/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/player-shop-gui-plus/)
- [Official plugin documentation](https://docs.brcdev.net/#/playershopgui/commands-permissions)
