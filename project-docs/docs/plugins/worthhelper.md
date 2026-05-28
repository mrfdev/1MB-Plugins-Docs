# WorthHelper

## Purpose

WorthHelper is a read-only server-management plugin for reviewing CMI `Worth.yml` values against the recipes and materials exposed by the running Paper server. It is meant to help staff find missing worth entries, recipe-derived price pressure, and possible craft/sell loops before making manual economy changes.

WorthHelper never edits `Worth.yml`, changes balances, runs `cmi setworth`, or applies suggested values. It writes reports and shows suggested commands as text only.

## Features

- Read direct item worth values from `plugins/CMI/Saves/Worth.yml`.
- Enumerate Paper item materials for the running server version.
- Inspect shaped, shapeless, cooking, stonecutting, smithing, and transmute recipes where Paper exposes enough information.
- Compare current CMI worth against ingredient cost divided by output count.
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
/worthhelper export
```

Global library examples:

```text
/1mbcmi debug plugin worthhelper
/1mbcmi debug plugin worthhelper all
/1mbcmi debug plugin worthhelper config
/1mbcmi config worthhelper
/1mbcmi config set worthhelper analysis.minimum-percent-difference 15
/1mbcmi config set worthhelper analysis.buy-multiplier 100
/1mbcmi translations reload
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
%onembcmi_worthhelper.last.worth_entries%
%onembcmi_worthhelper.cache.size%
```

## CMI / CMILib Usage

CMI:

- `plugins/CMI/Saves/Worth.yml` is read as the source of direct item worth values.
- Suggested `cmi setworth <material> -s:<value>` commands are printed as text only for staff review.
- CMI remains the source of truth; WorthHelper does not write or reload CMI files.

CMILib:

- CMILib is kept as a declared runtime dependency through the shared 1MB CMI-API plugin set, but the MVP reads Worth.yml directly so it can compare the persisted values staff would review in Git.

CMI-API:

- WorthHelper registers through `1MB-CMIAPI-LIB` for feature metadata, help, debug, permissions, placeholders, configs, translations, and shared cache paths.

Paper:

- Paper/Bukkit `Material` and `Recipe` APIs provide the item list and recipe graph.
- Supported recipe surfaces include shaped, shapeless, furnace/cooking family, stonecutting, smithing transform/trim, smithing fallback, and transmute recipes where feasible.

## Config

Important config paths:

```text
enabled
debug
output.page-size
output.max-suggestions
cmi.worth-file
analysis.minimum-absolute-difference
analysis.minimum-percent-difference
analysis.max-recipes-per-material
analysis.buy-multiplier
analysis.money-scale
report.file-prefix
review.blacklist-spawn-eggs
review.blacklist-materials
review.special-materials
review.hierarchy-notes
```

`cmi.worth-file` defaults to `plugins/CMI/Saves/Worth.yml` relative to the running server root. Relative paths make the same jar work on the CMI-API test server and the isolated 1MBEconomy test server.

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

The plugin intentionally does not include an apply command. If an apply workflow is ever added, it should require a separate reviewed command and should still produce a report before changing anything.

## Testing

Suggested server test flow:

```text
/worthhelper status
/worthhelper scan
/worthhelper missing
/worthhelper recipes diamond_block
/worthhelper recipes iron_ingot
/worthhelper export
/worthhelper debug all
```

Then open the exported Markdown from the shared cache folder and compare suggested commands against the 1MBEconomy workbook/source-of-truth before changing CMI worth values manually.

[Plugin index](README.md)
