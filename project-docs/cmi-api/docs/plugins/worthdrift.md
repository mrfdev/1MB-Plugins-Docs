# WorthAudit sale and shop settings

## Purpose

The WorthDrift module in [WorthAudit](worthaudit.md) compares payment reported by CMI sell events with live CMI worth. It also compares configured `Worth.yml` prices with ShopGUI+ item listings to flag prices for staff review.

WorthDrift keeps aggregates for the current session and writes reports to the shared cache on request. ShopGUI+ corrections and generated rows are previews. Staff can persist ignored materials and shop exceptions explicitly.

## Features

- Listen to `CMIPlayerItemsSellEvent` at monitor priority.
- Read per-material sold amounts and payments from CMI's sell event.
- Compare observed unit payment against CMI `WorthManager` / `WorthItem` configured sell price.
- Detect material-level drift when observed average differs from configured worth by configured percent and absolute thresholds.
- Flag high-value materials based on configured or observed unit value.
- Flag player concentration when one player accounts for a large share of a material's observed payment.
- Ask CMI `WorthItem` whether an exploit recipe is known for a material.
- Keep a bounded recent sample list for report context.
- Read saved base values from CMI `plugins/CMI/Saves/Worth.yml` for ShopGUI+ analysis.
- Scan ShopGUI+ `shops/*.yml` item rows and compare configured `buyPrice` against `Worth.yml` value × 100 × quantity by default.
- Flag variant worth keys and metadata-sensitive shop listings for separate review.
- Report per-row ShopGUI+ drift with material, worth value, current shop value, expected shop value, difference, percent drift, file, shop id, entry id, slot, and page.
- Report Worth.yml materials missing from ShopGUI+, ShopGUI+ materials missing from Worth.yml, duplicate ShopGUI+ listings, and configured creative-only / illegal materials.
- Support Markdown exports for GitHub tables or Discord-friendly bullet lists.
- Support configured ShopGUI+ exception lists for known deliberate files, materials, or specific entries.
- Preview valid missing Worth.yml listings for a chosen ShopGUI+ shop file.
- Preview corrections for one material across active ShopGUI+ shops.
- Add ShopGUI+ file or item exceptions from command without hand-editing WorthDrift config.
- Persist ignored material choices in the feature data folder.
- Write timestamped support reports to the shared cache folder.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/worthaudit sales
/worthaudit status drift
/worthaudit sales status
/worthaudit sales top [page]
/worthaudit sales material <material>
/worthaudit sales report
/worthaudit shop [-all|-missing|-drifting|-illegal-items|-not-in-worth|-duplicates] [-valid-only] [-github|-discord] [-limit <rows>]
/worthaudit shop generate <file.yml>
/worthaudit shop fix <material>
/worthaudit shop skip <file:file.yml|item:material>
/worthaudit sales ignored
/worthaudit sales ignore <material>
/worthaudit reload drift
```

Useful examples:

```text
/worthaudit sales status
/worthaudit sales top
/worthaudit sales material DIAMOND
/worthaudit sales material minecraft:diamond
/worthaudit sales report
/worthaudit shop
/worthaudit shop -drifting
/worthaudit shop -missing
/worthaudit shop -missing -discord -valid-only -limit 0
/worthaudit shop -all -github -limit 0
/worthaudit shop -illegal-items -discord
/worthaudit shop -duplicates
/worthaudit shop generate survival_misc.yml
/worthaudit shop fix OAK_LOG
/worthaudit shop skip file:armor.yml
/worthaudit shop skip item:SPAWNER
/worthaudit sales ignore CACTUS
/worthaudit sales ignored
```

## ShopGUI+ Reports

The audit uses the saved base prices in CMI `Worth.yml` as the comparison input. Direct zero values are valid comparison inputs. The report flags invalid or ambiguous entries and tracks variants separately. Listings with item metadata, such as an enchanted book, are marked for manual review and excluded from base-price proposals.

By default the expected ShopGUI+ value is:

```text
expected buyPrice = CMI Worth.yml value * 100 * ShopGUI+ quantity
```

For a normal quantity-1 row, `OAK_LOG: 1.0` in `Worth.yml` should be `buyPrice: 100` in the ShopGUI+ shop file. If a row sells a stack or bundle quantity, WorthDrift compares the total ShopGUI+ row price against the total expected row price.

Report modes:

```text
/worthaudit shop
```

Writes the default review report. It includes the top likely wrong prices, drifting or missing-price rows, ShopGUI+ rows with no Worth.yml entry, and configured illegal/creative-only shop listings.

```text
/worthaudit shop -drifting
```

Writes only rows where the ShopGUI+ price does not match the expected value, sorted by largest absolute drift first.

```text
/worthaudit shop -missing
```

Lists saved base worth materials without an active ShopGUI+ `type: item` row, subject to the configured exceptions and row limit.

```text
/worthaudit shop -missing -discord -valid-only -limit 0
```

Lists all eligible missing base worth materials in Discord-friendly bullets. `-valid-only` excludes configured illegal or creative-only materials and `-limit 0` displays the entire result.

```text
/worthaudit shop -all
```

Writes every Worth.yml material with `in ShopGUI+ yes/no`, listing count, and status.

```text
/worthaudit shop -illegal-items
```

Writes configured illegal or creative-only materials found in ShopGUI+ and Worth.yml. ShopGUI+ buyable rows are the urgent part.

```text
/worthaudit shop -not-in-worth
```

Lists active ShopGUI+ rows without a matching saved base worth entry. Metadata-sensitive listings appear in the report warnings for manual review.

```text
/worthaudit shop -duplicates
```

Writes materials that appear in multiple ShopGUI+ item rows. This is useful because a material can be correctly priced in one shop file and wrong in another.

Markdown format flags:

```text
-github
-discord
-valid-only
```

`-github` writes Markdown tables. `-discord` writes no-table bullet lists. `-valid-only` skips configured illegal/creative-only Worth.yml rows in missing exports and removes the illegal flag column from the missing table. `-limit <rows>` limits the main section; `-limit 0` means no row limit.

## ShopGUI+ previews and exceptions

```text
/worthaudit shop generate survival_misc.yml
```

Creates a separate YAML proposal in the WorthDrift cache when there are eligible missing rows. Each proposed item uses `quantity: 1`, the configured generated `sellPrice`, available shop inventory slots, and a `buyPrice` calculated from its positive base worth and `shopguiplus.price-multiplier`. The generator skips illegal and creative-only materials, configured exceptions, and `shopguiplus.generate.excluded-materials`. Review the proposed rows in the ShopGUI+ project before applying them to `survival_misc.yml`.

```text
/worthaudit shop fix OAK_LOG
```

Shows how many active `OAK_LOG` rows drift from the saved base worth. When it finds drift, it writes a Markdown proposal in the WorthDrift cache. Review the exact shop rows and proposed prices in the ShopGUI+ project before applying changes.

```text
/worthaudit shop skip file:armor.yml
/worthaudit shop skip item:SPAWNER
```

Adds the file to `shopguiplus.exceptions.files` or the material to `shopguiplus.exceptions.materials` in the WorthDrift configuration. The next shop audit uses the saved exception. Item exceptions apply to parsed ShopGUI+ rows, missing reports, and proposed listings.

The shared library routes host diagnostics through WorthAudit. Edit sale and shop settings in `plugins/1MB-CMIAPI/WorthDrift/config.yml`, then reload the module with the following commands.

```text
/1mblib debug plugin worthaudit all
/1mblib config worthaudit
/worthaudit reload drift
```

## Permissions

```text
onembcmi.worthdrift.use
onembcmi.worthdrift.view
onembcmi.worthdrift.report
onembcmi.worthdrift.fix
onembcmi.worthdrift.ignore
onembcmi.worthdrift.admin
onembcmi.worthdrift.admin.reload
```

These grants default to operators. Status requires `use`. Material details, top results, and ignored-material inspection add `view`. Sale and shop reports add `report`, shop previews and exceptions add `fix`, and persisting ignored sale materials adds `ignore`. Reloading this module accepts `onembcmi.worthdrift.admin.reload` or the WorthAudit host admin grant.

## Placeholders

```text
%onembcmi_worthdrift.enabled%
%onembcmi_worthdrift.events.count%
%onembcmi_worthdrift.items.count%
%onembcmi_worthdrift.payment.total%
%onembcmi_worthdrift.materials.count%
%onembcmi_worthdrift.ignored.count%
%onembcmi_worthdrift.last.result%
%onembcmi_worthdrift.last.issues.count%
%onembcmi_worthdrift.last.drift.count%
%onembcmi_worthdrift.last.high_value.count%
%onembcmi_worthdrift.last.concentration.count%
%onembcmi_worthdrift.shopgui.last.result%
%onembcmi_worthdrift.shopgui.last.drift.count%
%onembcmi_worthdrift.shopgui.last.missing.count%
%onembcmi_worthdrift.shopgui.last.not_in_worth.count%
%onembcmi_worthdrift.shopgui.last.illegal.count%
%onembcmi_worthdrift.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIPlayerItemsSellEvent` provides the player, sell type, total amount, total payment, material amount map, and material payment map.

CMI:

- `CMI#getWorthManager()` provides the runtime worth manager.
- `WorthManager#getWorth(ItemStack)` resolves the configured CMI `WorthItem` for a CMILib material item stack.
- `WorthItem#getSellPrice()` provides the configured sell value used for drift comparison.
- `WorthItem#getExploitRecipe()` is checked as a read-only recipe-loop signal.
- CMI remains the source of truth for selling. Reported event prices are observed before CMI deposits the payment.
- ShopGUI+ analysis reads `Worth.yml` directly so it can compare live saved worth data against ShopGUI+ YAML without needing to mutate CMI runtime state.
- ShopGUI+ actions preview generated rows or price patches. Staff can update WorthDrift exception lists from the audit command.

CMILib:

- `CMIMaterial` is used to normalize CMI sell-event material keys and safely parse typed material names.
- CMILib/Paper material mapping is used through `CMIMaterial#newItemStack()` when resolving configured CMI worth.

Paper:

- Paper command, event, filesystem, YAML, and Adventure MiniMessage APIs are used.
- Command input is strictly validated before material parsing.
- The modules share a saved CMI worth reader. ShopGUI+ reads use Bukkit's YAML API.

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
analysis.drift.percent-threshold
analysis.drift.absolute-threshold
analysis.high-unit-value
analysis.minimum-material-events
analysis.player-concentration-percent
report.file-prefix
shopguiplus.enabled
shopguiplus.worth-file
shopguiplus.shops-folder
shopguiplus.price-key
shopguiplus.price-multiplier
shopguiplus.price-tolerance
shopguiplus.multiply-expected-by-quantity
shopguiplus.report.file-prefix
shopguiplus.report.default-limit
shopguiplus.generate.sell-price
shopguiplus.generate.excluded-materials
shopguiplus.exceptions.files
shopguiplus.exceptions.materials
shopguiplus.exceptions.entries
shopguiplus.illegal-materials
shopguiplus.legal-overrides
ignored-materials
```

These are the default ShopGUI+ paths. They work with the custom ShopGUI+ JAR when its data remains under `plugins/ShopGUIPlus/`.

```text
shopguiplus.worth-file: plugins/CMI/Saves/Worth.yml
shopguiplus.shops-folder: plugins/ShopGUIPlus/shops
shopguiplus.price-key: buyPrice
shopguiplus.price-multiplier: 100
shopguiplus.multiply-expected-by-quantity: true
shopguiplus.generate.sell-price: 1
shopguiplus.generate.excluded-materials:
  - GOAT_HORN
  - CREEPER_HEAD
  - ZOMBIE_HEAD
```

`GOAT_HORN` is excluded from blind generation by default because ShopGUI+ requires valid music instrument metadata for goat horns and rejects a plain generated material row. Generated mob heads such as `CREEPER_HEAD` and `ZOMBIE_HEAD` are excluded because they can render as blank ShopGUI+ slots when generated as plain material rows. These items can still appear in missing reports for manual review.

Exception examples:

```text
shopguiplus.exceptions.files:
  - bentobox*.yml
  - archive/*
shopguiplus.exceptions.materials:
  - BARRIER
shopguiplus.exceptions.entries:
  - survival_logs.yml:OAK_LOG
  - survival_logs.yml#1
  - survival_logs.yml:survival_logs#1
shopguiplus.legal-overrides:
  - SPAWNER
```

Use exceptions for deliberate alternate pricing, old test files, temporary copies, or server-specific special shops. This keeps reports passive: they highlight review candidates without encouraging automatic changes.

## Data

WorthAudit loads the existing WorthDrift settings, ignore list, and translations in place.

```text
plugins/1MB-CMIAPI/WorthDrift/config.yml
plugins/1MB-CMIAPI/WorthDrift/data.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/worthdrift.yml
```

WorthDrift writes support reports to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/worthdrift/
```

Session aggregates reset on server restart. Exported reports and previews remain in the cache for later review.

ShopGUI+ reports are Markdown `.md` files in the same cache folder. Their filenames include the report mode, Markdown format, and optional valid-only filter, for example `worthdrift-shopgui-drifting-github-table-<timestamp>.md`, `worthdrift-shopgui-drifting-discord-bullets-<timestamp>.md`, or `worthdrift-shopgui-missing-discord-bullets-valid-only-<timestamp>.md`.

## Safety

Sale observation and shop reports leave CMI sells, balances, `Worth.yml`, and ShopGUI+ files untouched. Material names and generated filenames are allowlisted and normalized. Shop previews and exception edits require `onembcmi.worthdrift.fix`. The explicit `shop skip` and `sales ignore` actions write only WorthDrift configuration or data.

## Shared Library Usage

WorthDrift uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
