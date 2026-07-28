# Economy Review Notes

> Migrated from the retired `1MBEconomy` project on 2026-07-28. Runtime paths
> now refer to the maintained CMI-API Paper 26.2 test server. Tracked snapshots
> live under `docs/economy-review/baseline/`.

## Tracked Data Mirror

The `docs/economy-review/baseline/` folder is the tracked copy of the economy
configuration that can be pushed to GitHub.

- `docs/economy-review/baseline/CMI/Worth.yml` is reviewed against `servers/Paper-26.2/plugins/CMI/Saves/Worth.yml`.
- `docs/economy-review/baseline/ShopGUIPlus/shops/*.yml` is reviewed against `servers/Paper-26.2/plugins/ShopGUIPlus/shops/*.yml`.

The `servers/` folder stays ignored because it contains local runtime files,
jars, logs, databases, and generated plugin data.

WorthHelper exports that should be kept for review belong in
`docs/economy-review/reports/`.
The first saved report is
`docs/economy-review/reports/worthhelper-report-2026-05-11T08-04-18.011002Z.md`.

## CMI Commands

Set an item sell worth:

```text
cmi setworth (itemname) -s:(sellPrice)
cmi setworth stick -s:0.55
```

Useful review commands:

- `cmi worth (all/blocks/hand/material)`
- `cmi worthlist -missing`
- `cmi generateworth`

`cmi worthlist -missing` helps find items that are not currently in the worth
list. `cmi generateworth` is console-only and estimates missing values from
known ingredient values.

CMI reads this setting from `config.yml` for generated values:

```yml
Worth:
  AutoGenerate:
    # Value in percentages in how much more we should add to end product while auto calculating items price based on its ingredient worth
    # For example one stick is worth 0.1 and diamond 44 then end result as diamond_hoe will be worth 88.2 and with extra 2% this will be changed to 89.96
    # Value can be negative
    PriceIncrease: 0
```

CMI creates `KEY` entries in `Worth.yml` automatically. Do not add custom keys
to the file as metadata; use project docs and reports for analysis notes.

## Approval Rule

Do not directly change economy values just because an automated process finds a
difference. Every proposed price change should be reported first and applied
only after approval.

Suggested report fields:

- Item name.
- Current CMI worth.
- Suggested CMI worth.
- Resulting ShopGUI+ buy price at `worth * 100`.
- Recipe or conversion path that produced the suggestion.
- Raw material cost and output count.
- Whether it can be automatically farmed, mass-produced, or obtained easily.
- Inflation or arbitrage risk.
- Human value expectation, especially for obvious hierarchies like copper,
  iron, diamond, netherite, and rare loot.
- Recommendation: keep, adjust, blacklist, or needs human review.

## WorthHelper

WorthHelper is implemented in the `1MB-CMIAPI-LIB` project as a separate
server-management feature plugin. The tracked CMI and ShopGUI+ review snapshots
now live under `docs/economy-review/baseline/`.

Current economy test server jars:

- `servers/Paper-26.2/plugins/1MB-CMIAPI-LIB-v1.0.1-554-j25-26.2.jar`
- `servers/Paper-26.2/plugins/1MB-CMIAPI-WorthDrift-v1.0.1-554-j25-26.2.jar`
- `servers/Paper-26.2/plugins/1MB-CMIAPI-WorthHelper-v1.0.1-554-j25-26.2.jar`

Available commands:

- `/worthhelper status`
- `/worthhelper scan [page]`
- `/worthhelper missing [page]`
- `/worthhelper recipes <material> [page]`
- `/worthhelper export`
- `/worthhelper reload`

WorthHelper responsibilities:

- Load CMI worth values from the live server's `plugins/CMI/Saves/Worth.yml`.
- Enumerate available materials using the Paper `Material` enum.
- Compare materials against the blacklist and `cmi worthlist -missing` output.
- Query registered recipes with Paper server recipe APIs.
- Inspect shaped, shapeless, cooking, blasting, smoking, campfire, stonecutting,
  smithing, transmute, and other registered recipe types.
- Calculate expected values from ingredient values and output counts.
- Flag multiple recipe paths where the cheapest path could create arbitrage.
- Add manual signals for non-recipe transformations such as waxing, scraping,
  oxidation, stripping, dyeing, and similar gameplay conversions.
- Include farmability, ease of access, and human-value notes in the report.
- Output suggested `cmi setworth item -s:value` commands, but do not run them by
  default.

Smoke test flow on the economy test server:

1. Start `servers/Paper-26.2`.
2. Run `/worthhelper status`.
3. Run `/worthhelper scan`.
4. Run `/worthhelper missing`.
5. Run `/worthhelper recipes diamond_block`.
6. Run `/worthhelper export`.
7. Review the exported Markdown report before making any economy edits.

Useful Paper resources:

- [Paper recipe docs](https://docs.papermc.io/paper/dev/recipes/)
- [Paper 26.2 Material enum](https://jd.papermc.io/paper/26.2/org/bukkit/Material.html)
- [Paper 26.2 Server recipe methods](https://jd.papermc.io/paper/26.2/org/bukkit/Server.html#getRecipesFor(org.bukkit.inventory.ItemStack))
- [Paper 26.2 inventory recipe classes](https://jd.papermc.io/paper/26.2/org/bukkit/inventory/package-summary.html)
