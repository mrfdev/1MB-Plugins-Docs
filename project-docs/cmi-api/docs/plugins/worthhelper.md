# WorthAudit recipe and trade settings

## Purpose

The WorthHelper module in [WorthAudit](worthaudit.md) is a staff tool for reviewing CMI `Worth.yml` values against the recipes, materials, and enabled vanilla villager-trade catalog of the running Paper server. It is meant to help staff find missing worth entries, recipe-derived price pressure, and possible craft/sell or villager-conversion loops before making manual economy changes.

The module reads the saved CMI inputs and writes audit reports. Treat suggested `cmi setworth` commands as review text for a manual economy change.

## Features

- Read direct item worth values from `plugins/CMI/Saves/Worth.yml`.
- Read CMI `Worth.AutoGenerate.PriceIncrease` from `plugins/CMI/config.yml`.
- Enumerate Paper item materials for the running server version.
- Inspect shaped, shapeless, cooking, stonecutting, smithing, and transmute recipes where Paper exposes enough information.
- Read the matching Minecraft server's bundled `villager_trade` JSON definitions for all 13 villager professions and the wandering trader.
- Parse and cache the bundled trade catalog asynchronously.
- Resolve nested vanilla trade tags and use the bundled `trade_rebalance` overlay only when Paper reports that datapack enabled.
- Gate the catalog on a supported Minecraft version and recognize the legacy `26.2` default on `26.3`.
- Compare each fixed vanilla trade's complete base input worth against its output worth.
- Report theoretical first-ingredient discount-floor findings separately from base-price findings.
- Put item-component and output-modifier trades, including enchanted equipment and explorer maps, in the metadata-sensitive review queue.
- Compare current CMI worth against both the raw recipe cost and CMI's policy-adjusted target.
- Mirror CMI `generateworth` semantics by applying the configured percentage and truncating the result to two decimal places.
- Use cheapest priced ingredient choices when a recipe accepts alternatives.
- Skip variant CMI worth keys such as enchantment-specific entries for the base material scan.
- Flag missing direct worth values outside the configured review blacklist.
- Mark potions, tipped arrows, ominous bottles, creative/test blocks, spawn eggs, spawners, trial spawners, and vaults as manual-review surfaces.
- Include `/buy` impact context using the configured worth-to-buy multiplier.
- Export Discord-friendly Markdown reports with suggested `cmi setworth` commands in fenced `yml` code blocks.
- Register command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/worthaudit
/worthaudit status helper
/worthaudit item <material>
/worthaudit scan [page]
/worthaudit missing [page]
/worthaudit recipes <material> [page]
/worthaudit trades [material] [page]
/worthaudit export
/worthaudit reload helper
```

Useful examples:

```text
/worthaudit status helper
/worthaudit scan
/worthaudit missing
/worthaudit recipes diamond_block
/worthaudit recipes minecraft:iron_ingot
/worthaudit trades
/worthaudit trades chainmail_helmet
/worthaudit export
```

The shared library routes host diagnostics through WorthAudit. Edit recipe and trade settings in `plugins/1MB-CMIAPI/WorthHelper/config.yml`, then reload the module with the following commands.

```text
/1mblib debug plugin worthaudit all
/1mblib config worthaudit
/worthaudit reload helper
```

## Permissions

```text
onembcmi.worthhelper.use
onembcmi.worthhelper.scan
onembcmi.worthhelper.view
onembcmi.worthhelper.export
onembcmi.worthhelper.admin
onembcmi.worthhelper.admin.reload
```

These grants default to operators. Status requires `use`. Scan adds `scan`, missing materials, recipe details, and trade details add `view`, and report export adds `export`. Reloading this module accepts `onembcmi.worthhelper.admin.reload` or the WorthAudit host admin grant.

## Placeholders

```text
%onembcmi_worthhelper.enabled%
%onembcmi_worthhelper.last.result%
%onembcmi_worthhelper.last.materials%
%onembcmi_worthhelper.last.recipes%
%onembcmi_worthhelper.last.suggestions%
%onembcmi_worthhelper.last.missing%
%onembcmi_worthhelper.last.trade_catalog%
%onembcmi_worthhelper.last.trade_base_risks%
%onembcmi_worthhelper.last.trade_discount_risks%
%onembcmi_worthhelper.last.worth_entries%
%onembcmi_worthhelper.cache.size%
```

## CMI / CMILib Usage

CMI:

- `plugins/CMI/Saves/Worth.yml` is read as the source of direct item worth values.
- `plugins/CMI/config.yml` is read for `Worth.AutoGenerate.PriceIncrease`.
- Recipe output distinguishes raw ingredient worth from the CMI policy target. If the config or setting cannot be read, WorthHelper reports that fact and uses an explicit `0%` fallback.
- Suggested `cmi setworth <material> -s:<value>` commands are printed as text only for staff review.
- Compare suggestions against CMI's saved values before applying an approved change through CMI.

CMILib:

- CMILib remains a declared runtime dependency of WorthAudit. Recipe and trade review reads the saved `Worth.yml` values.

CMI-API:

- WorthHelper registers through `1MB-CMIAPI-LIB` for feature metadata, help, debug, permissions, placeholders, configs, translations, and shared cache paths.

Paper:

- Paper/Bukkit `Material` and `Recipe` APIs provide the item list and recipe graph.
- Supported recipe surfaces include shaped, shapeless, furnace/cooking family, stonecutting, smithing transform/trim, smithing fallback, and transmute recipes where feasible.
- Intentional empty cells in shaped crafting grids are ignored even when Paper exposes them as null placeholder choices.
- WorthHelper builds its catalog from the server's bundled `villager_trade` resources. The reader supports Minecraft `26.2` and `26.3`, and the maintained server runs Paper `26.3`. On Minecraft `26.3`, an existing `expected-minecraft-version: '26.2'` uses the verified `26.3` schema. Other unsupported or mismatched versions show an unavailable catalog. [Paper 26.3 merchant recipes](https://jd.papermc.io/paper/26.3/org/bukkit/inventory/MerchantRecipe.html)
- WorthHelper reads Paper's enabled-pack snapshot and selects the bundled `trade_rebalance` overlay only when it is enabled. [Paper datapack documentation](https://docs.papermc.io/paper/dev/lifecycle/datapacks/) · [Paper 26.3 Datapack API](https://jd.papermc.io/paper/26.3/io/papermc/paper/datapack/Datapack.html)
- The bundled catalog does not claim to model custom datapack overrides. Enabled pack names and this limitation are printed in status, commands, and exports.

## Config

Important config paths:

```text
enabled
debug
output.page-size
output.max-suggestions
output.max-trade-findings
cmi.config-file
cmi.worth-file
analysis.minimum-absolute-difference
analysis.minimum-percent-difference
analysis.max-recipes-per-material
analysis.buy-multiplier
analysis.money-scale
analysis.villager-trades.enabled
analysis.villager-trades.expected-minecraft-version
analysis.villager-trades.minimum-profit
analysis.villager-trades.include-discount-floor
report.file-prefix
review.blacklist-spawn-eggs
review.blacklist-materials
review.special-materials
review.hierarchy-notes
```

`cmi.config-file` and `cmi.worth-file` default to `plugins/CMI/config.yml` and `plugins/CMI/Saves/Worth.yml` relative to the running server root. The host controls module activation through `modules.worthhelper.enabled` after importing the legacy `enabled` value on first setup.

For a raw recipe cost of `585` and `PriceIncrease: 2`, WorthHelper reports a CMI policy target of `596.70`. This is the value used for drift classification and suggested command text; the raw `585` remains visible as recipe evidence.

Villager trades do not use CMI's recipe `PriceIncrease`. A fixed `1 emerald -> 1 chainmail helmet` trade with both direct worth values set to `1` is reported as `base-price-parity`. If the helmet were worth `1.3`, the same trade would be `base-price-profit-review`, with a base-price unit ceiling of `1`. This is report evidence only; WorthHelper does not emit an automatic `setworth` command from a villager trade.

## Data

WorthAudit loads the existing WorthHelper settings and translations in place. Recipe and trade reporting writes only to the module's report cache.

```text
plugins/1MB-CMIAPI/WorthHelper/config.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/worthhelper.yml
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/worthhelper/
```

## Safety Model

WorthHelper is report-first. Recipe math is a signal, not an apply plan.

Staff should review:

- farmability and automatic farms
- ease of access and supply volume
- rarity and event-only sources
- existing player expectations
- human value hierarchy, such as iron generally feeling more valuable than copper and diamond more valuable than copper or iron
- blacklist items such as potions, tipped arrows, ominous bottles, creative/test blocks, and spawn eggs
- special blocks such as spawners, trial spawners, and vaults
- base-price villager conversions before conditional discount-floor findings
- metadata-sensitive villager outputs separately from ordinary base materials
- custom datapacks separately; the version-gated reader audits the server-bundled vanilla catalog and the enabled bundled trade-rebalance overlay only

The plugin intentionally does not include an apply command. If an apply workflow is ever added, it should require a separate reviewed command and should still produce a report before changing anything.

## Testing

Suggested server test flow:

```text
/worthaudit status helper
/worthaudit scan
/worthaudit missing
/worthaudit recipes diamond_block
/worthaudit recipes iron_ingot
/worthaudit trades
/worthaudit trades chainmail_helmet
/worthaudit export
/worthaudit debug all
```

Then open the exported Markdown from the shared cache folder and compare suggested commands against the private economy review baseline before changing CMI worth values manually.

[Plugin index](README.md)
