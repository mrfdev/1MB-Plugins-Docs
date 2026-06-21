# WorthDrift

## Purpose

WorthDrift is a server-management plugin for watching CMI sell events and comparing the actual money paid against the configured CMI worth values. It can also compare CMI `Worth.yml` against ShopGUI+ shop YAML files so staff can find price drift before players turn economy mistakes into loops.

WorthDrift is passive by default: it records lightweight session aggregates, reads CMI/ShopGUI+ YAML as source data, and writes support reports to cache on demand. The only write actions are explicit admin commands for generating missing ShopGUI+ item rows, fixing one drifted material at a time, or adding ShopGUI+ exceptions.

## Features

- Listen to `CMIPlayerItemsSellEvent` at monitor priority.
- Read per-material sold amounts and payments from CMI's sell event.
- Compare observed unit payment against CMI `WorthManager` / `WorthItem` configured sell price.
- Detect material-level drift when observed average differs from configured worth by configured percent and absolute thresholds.
- Flag high-value materials based on configured or observed unit value.
- Flag player concentration when one player accounts for a large share of a material's observed payment.
- Ask CMI `WorthItem` whether an exploit recipe is known for a material.
- Keep a bounded recent sample list for report context.
- Read CMI `plugins/CMI/Saves/Worth.yml` as the source of truth for ShopGUI+ analysis.
- Scan ShopGUI+ `shops/*.yml` item rows and compare configured `buyPrice` against `Worth.yml` value x 100 x quantity by default.
- Report per-row ShopGUI+ drift with material, worth value, current shop value, expected shop value, difference, percent drift, file, shop id, entry id, slot, and page.
- Report Worth.yml materials missing from ShopGUI+, ShopGUI+ materials missing from Worth.yml, duplicate ShopGUI+ listings, and configured creative-only / illegal materials.
- Support Markdown exports for GitHub tables or Discord-friendly bullet lists.
- Support configured ShopGUI+ exception lists for known deliberate files, materials, or specific entries.
- Generate valid, non-illegal missing Worth.yml items into a chosen ShopGUI+ shop file for staff review.
- Fix one drifted ShopGUI+ material at a time, updating only confirmed drifting rows and then dispatching `shopguiplus:shopgui reload`.
- Add ShopGUI+ file or item exceptions from command without hand-editing WorthDrift config.
- Persist ignored material choices in the feature data folder.
- Write timestamped support reports to the shared cache folder.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/worthdrift
/worthdrift status
/worthdrift top [page]
/worthdrift material <material>
/worthdrift report
/worthdrift shopgui [-all|-missing|-drifting|-illegal-items|-not-in-worth|-duplicates] [-valid-only] [-github|-discord] [-limit <rows>]
/worthdrift missing generate:<file.yml>
/worthdrift fix <material>
/worthdrift skip <file:file.yml|item:material>
/worthdrift ignored
/worthdrift ignore <material>
/worthdrift reload
```

Alias:

```text
/wdrift
```

Useful examples:

```text
/worthdrift status
/worthdrift top
/worthdrift material DIAMOND
/worthdrift material minecraft:diamond
/worthdrift report
/worthdrift shopgui
/worthdrift shopgui -drifting
/worthdrift shopgui -missing
/worthdrift shopgui -missing -discord -valid-only -limit 0
/worthdrift shopgui -all -github -limit 0
/worthdrift shopgui -illegal-items -discord
/worthdrift shopgui -duplicates
/worthdrift missing generate:survival_misc.yml
/worthdrift fix OAK_LOG
/worthdrift skip file:armor.yml
/worthdrift skip item:SPAWNER
/worthdrift ignore CACTUS
/worthdrift ignored
```

## ShopGUI+ Reports

CMI `Worth.yml` is treated as correct. ShopGUI+ prices are the values that should be reviewed when the report shows drift.

By default the expected ShopGUI+ value is:

```text
expected buyPrice = CMI Worth.yml value * 100 * ShopGUI+ quantity
```

For a normal quantity-1 row, `OAK_LOG: 1.0` in `Worth.yml` should be `buyPrice: 100` in the ShopGUI+ shop file. If a row sells a stack or bundle quantity, WorthDrift compares the total ShopGUI+ row price against the total expected row price.

Report modes:

```text
/worthdrift shopgui
```

Writes the default review report. It includes the top likely wrong prices, drifting or missing-price rows, ShopGUI+ rows with no Worth.yml entry, and configured illegal/creative-only shop listings.

```text
/worthdrift shopgui -drifting
```

Writes only rows where the ShopGUI+ price does not match the expected value, sorted by largest absolute drift first.

```text
/worthdrift shopgui -missing
```

Writes every Worth.yml material that was not found in any active ShopGUI+ `type: item` row.

```text
/worthdrift shopgui -missing -discord -valid-only -limit 0
```

Writes every missing Worth.yml material except configured illegal/creative-only materials, using Discord-friendly bullets and no row limit.

```text
/worthdrift shopgui -all
```

Writes every Worth.yml material with `in ShopGUI+ yes/no`, listing count, and status.

```text
/worthdrift shopgui -illegal-items
```

Writes configured illegal or creative-only materials found in ShopGUI+ and Worth.yml. ShopGUI+ buyable rows are the urgent part.

```text
/worthdrift shopgui -not-in-worth
```

Writes active ShopGUI+ item rows whose material does not exist in Worth.yml.

```text
/worthdrift shopgui -duplicates
```

Writes materials that appear in multiple ShopGUI+ item rows. This is useful because a material can be correctly priced in one shop file and wrong in another.

Markdown format flags:

```text
-github
-discord
-valid-only
```

`-github` writes Markdown tables. `-discord` writes no-table bullet lists. `-valid-only` skips configured illegal/creative-only Worth.yml rows in missing exports and removes the illegal flag column from the missing table. `-limit <rows>` limits the main section; `-limit 0` means no row limit.

## ShopGUI+ Admin Actions

```text
/worthdrift missing generate:survival_misc.yml
```

Appends every valid missing Worth.yml material to `plugins/ShopGUIPlus/shops/survival_misc.yml`. Illegal/creative-only materials, `shopguiplus.exceptions.materials`, and `shopguiplus.generate.excluded-materials` are skipped. Generated rows use `quantity: 1`, `buyPrice: Worth.yml value * shopguiplus.price-multiplier`, the configured generated `sellPrice`, and safe shop inventory slots across pages. WorthDrift validates the YAML before writing, but it does not reload ShopGUI+ automatically for generated files so staff can review the file first.

```text
/worthdrift fix OAK_LOG
```

Finds active ShopGUI+ `shops/*.yml` rows for `OAK_LOG`, confirms which rows drift from CMI `Worth.yml`, updates only those rows to the expected `buyPrice`, and dispatches:

```text
shopguiplus:shopgui reload
```

```text
/worthdrift skip file:armor.yml
/worthdrift skip item:SPAWNER
```

Adds the file to `shopguiplus.exceptions.files` or the material to `shopguiplus.exceptions.materials`, saves WorthDrift config, and reloads the feature files. Item exceptions are skipped from parsed ShopGUI+ rows, missing reports, and generated missing files.

Global library examples:

```text
/1mbcmi debug plugin worthdrift
/1mbcmi debug plugin worthdrift all
/1mbcmi debug clean cache plugin worthdrift --dry-run
/1mbcmi config worthdrift
/1mbcmi config set worthdrift analysis.drift.percent-threshold 15
/1mbcmi config set worthdrift analysis.high-unit-value 1000
/1mbcmi translations reload
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
- CMI remains the source of truth. WorthDrift only observes and reports.
- ShopGUI+ analysis reads `Worth.yml` directly so it can compare live saved worth data against ShopGUI+ YAML without needing to mutate CMI runtime state.
- Explicit ShopGUI+ admin actions can append generated item rows, patch drifted ShopGUI+ buy prices, or update WorthDrift exception lists.

CMILib:

- `CMIMaterial` is used to normalize CMI sell-event material keys and safely parse typed material names.
- CMILib/Paper material mapping is used through `CMIMaterial#newItemStack()` when resolving configured CMI worth.

Paper:

- Paper command, event, filesystem, YAML, and Adventure MiniMessage APIs are used.
- Command input is strictly validated before material parsing.
- Bukkit YAML APIs are used for CMI and ShopGUI+ file parsing.

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
analysis.report-days
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

Default ShopGUI+ paths:

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

WorthDrift writes ignored material choices to:

```text
plugins/1MB-CMIAPI/WorthDrift/data.yml
```

WorthDrift writes support reports to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/worthdrift/
```

It does not write playerdata or persistent economy history in version 1. Session aggregates reset on restart, while reports can be kept as cache artifacts.

ShopGUI+ reports are Markdown `.md` files in the same cache folder. Their filenames include the report mode, Markdown format, and optional valid-only filter, for example `worthdrift-shopgui-drifting-github-table-<timestamp>.md`, `worthdrift-shopgui-drifting-discord-bullets-<timestamp>.md`, or `worthdrift-shopgui-missing-discord-bullets-valid-only-<timestamp>.md`.

## Safety

WorthDrift never cancels CMI sells, modifies `Worth.yml`, changes balances, or exposes arbitrary player input. Material names and generated filenames are allowlisted and normalized before being used. Reports are read-only; only `/worthdrift missing generate:<file.yml>`, `/worthdrift fix <material>`, and `/worthdrift skip <...>` write ShopGUI+ YAML or WorthDrift config, and those commands require `onembcmi.worthdrift.fix`.

## Shared Library Usage

WorthDrift uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
