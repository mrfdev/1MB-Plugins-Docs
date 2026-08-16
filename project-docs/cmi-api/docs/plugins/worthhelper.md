# WorthHelper

## Purpose

WorthHelper is a read-only server-management plugin for reviewing CMI `Worth.yml` values against the recipes, materials, and enabled vanilla villager-trade catalog of the running Paper server. It is meant to help staff find missing worth entries, recipe-derived price pressure, and possible craft/sell or villager-conversion loops before making manual economy changes.

WorthHelper never edits `Worth.yml`, changes balances, runs `cmi setworth`, or applies suggested values. It writes reports and shows suggested commands as text only.

## Features

- Read direct item worth values from `plugins/CMI/Saves/Worth.yml`.
- Read CMI `Worth.AutoGenerate.PriceIncrease` from `plugins/CMI/config.yml`.
- Enumerate Paper item materials for the running server version.
- Inspect shaped, shapeless, cooking, stonecutting, smithing, and transmute recipes where Paper exposes enough information.
- Read the matching Minecraft server's bundled `villager_trade` JSON definitions for all 13 villager professions and the wandering trader.
- Parse and cache the bundled trade catalog asynchronously so repeated economy scans do not reread 388 JSON resources on the server thread.
- Resolve nested vanilla trade tags and use the bundled `trade_rebalance` overlay only when Paper reports that datapack enabled.
- Fail closed when the running Minecraft version does not exactly match the configured supported trade schema version.
- Compare each fixed vanilla trade's complete base input worth against its output worth.
- Report theoretical first-ingredient discount-floor findings separately from base-price findings.
- Keep item-component and output-modifier trades, including enchanted equipment and explorer maps, in a metadata-sensitive review queue rather than treating their base material as an automatic exploit.
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
/worthhelper
/worthhelper status
/worthhelper scan [page]
/worthhelper missing [page]
/worthhelper recipes <material> [page]
/worthhelper trades [material] [page]
/worthhelper export
/worthhelper reload
```

Aliases:

```text
/whelper
/worthhelp
```

Useful examples:

```text
/worthhelper status
/worthhelper scan
/worthhelper missing
/worthhelper recipes diamond_block
/worthhelper recipes minecraft:iron_ingot
/worthhelper trades
/worthhelper trades chainmail_helmet
/worthhelper export
```

Global library examples:

```text
/1mblib debug plugin worthhelper
/1mblib debug plugin worthhelper all
/1mblib debug plugin worthhelper config
/1mblib config worthhelper
/1mblib config set worthhelper analysis.minimum-percent-difference 15
/1mblib config set worthhelper analysis.buy-multiplier 100
/1mblib translations reload
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

All permissions default to operator in `plugin.yml`. For a live server, use LuckPerms to grant only trusted economy reviewers access and negate these nodes for groups that should not inherit operator-style access.

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
- CMI remains the source of truth; WorthHelper does not write or reload CMI files.

CMILib:

- CMILib is kept as a declared runtime dependency through the shared 1MB Library plugin set, but the MVP reads Worth.yml directly so it can compare the persisted values staff would review in Git.

CMI-API:

- WorthHelper registers through `1MB-CMIAPI-LIB` for feature metadata, help, debug, permissions, placeholders, configs, translations, and shared cache paths.

Paper:

- Paper/Bukkit `Material` and `Recipe` APIs provide the item list and recipe graph.
- Supported recipe surfaces include shaped, shapeless, furnace/cooking family, stonecutting, smithing transform/trim, smithing fallback, and transmute recipes where feasible.
- Intentional empty cells in shaped crafting grids are ignored even when Paper exposes them as null placeholder choices.
- Paper exposes acquired [`MerchantRecipe`](https://jd.papermc.io/paper/26.2/org/bukkit/inventory/MerchantRecipe.html) instances and enabled [`Datapack`](https://jd.papermc.io/paper/26.2/io/papermc/paper/datapack/Datapack.html) state, but it does not expose a complete public registry of every possible vanilla villager trade.
- Paper's [datapack documentation](https://docs.papermc.io/paper/dev/lifecycle/datapacks/) distinguishes discovered packs from enabled packs; WorthHelper reads the runtime enabled-pack snapshot before selecting the bundled trade-rebalance overlay.
- For Minecraft `26.2`, WorthHelper therefore uses an isolated, exact-version reader for the `villager_trade` JSON resources bundled with that server. This does not use NMS or reflection and it never spawns or mutates villagers.
- The base catalog contains `388` definitions on the maintained Paper `26.2` test server. `trade_rebalance` is selected only when its enabled datapack name is reported by Paper.
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

`cmi.config-file` and `cmi.worth-file` default to `plugins/CMI/config.yml` and `plugins/CMI/Saves/Worth.yml` relative to the running server root. Relative paths make the same jar work on the maintained CMI-API test server and other dedicated staging servers.

For a raw recipe cost of `585` and `PriceIncrease: 2`, WorthHelper reports a CMI policy target of `596.70`. This is the value used for drift classification and suggested command text; the raw `585` remains visible as recipe evidence.

Villager trades do not use CMI's recipe `PriceIncrease`. A fixed `1 emerald -> 1 chainmail helmet` trade with both direct worth values set to `1` is reported as `base-price-parity`. If the helmet were worth `1.3`, the same trade would be `base-price-profit-review`, with a base-price unit ceiling of `1`. This is report evidence only; WorthHelper does not emit an automatic `setworth` command from a villager trade.

## Data

WorthHelper writes no playerdata and no economy state.

Reports are written to:

```text
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
/worthhelper status
/worthhelper scan
/worthhelper missing
/worthhelper recipes diamond_block
/worthhelper recipes iron_ingot
/worthhelper trades
/worthhelper trades chainmail_helmet
/worthhelper export
/worthhelper debug all
```

Then open the exported Markdown from the shared cache folder and compare suggested commands against the private economy review baseline before changing CMI worth values manually.

[Plugin index](README.md)
