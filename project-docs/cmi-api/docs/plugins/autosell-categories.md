# AutoSell category policy

This policy records the owner's category decisions from 6 September 2026. Use it when reviewing either Mining or Blocks, so the same items are not moved back and forth between reviews. Category vocabulary is defined in the [Player Fun context](../../plugins/player-fun/CONTEXT.md).

## Mining, Blocks, and Fancy

Classify an item by its purpose and its approved assignment. The tool that breaks a placed item, its name containing a metal, and whether it happens to occur in a generated structure do not determine its category.

- **Mining** covers geological resources and their basic material forms: ores, raw metals, minerals, ingots, nuggets, and plain resource storage blocks. Existing specific assignments to Fancy or other categories still take precedence.
- **Blocks** covers finished construction and utility items: doors, trapdoors, bars, chains, grates, storage furniture, and lighting. A door obtained by breaking one in a generated structure is still a finished door.
- **Fancy** covers designated premium resources, special collectibles, and decorative showpieces. Copper Golem Statues belong here, including their waxed and oxidation variants.

Craftability is a useful clue, not a binary test. An ingot, nugget, or plain storage block can remain a basic Mining resource even if a recipe produces it. Conversely, finding or mining a finished fixture does not turn it into a raw resource. AutoSell uses the material's category; it does not track how a particular stack was obtained.

## Stable assignments and review order

1. Explicit staff `categories.overrides` remain authoritative for that server.
2. Approved item and family assignments take precedence over broad material-name rules.
3. For items without an approved assignment, use the established categories and this policy to propose a reviewed change.

Treat the approved assignments below as settled during future reviews. Do not propose moving these fixtures back to Mining because they contain copper/iron/redstone or can be broken with a pickaxe. Reversing an approved assignment requires a new, explicit owner decision and an accompanying update to this policy and its regression fixtures.

This policy is not permission to reclassify every existing item. Deferred and unreviewed items retain their current behavior until separately approved.

## Approved screenshot: 79 items

| Family | Count | Category |
| --- | ---: | --- |
| Copper Golem Statues | 8 | Fancy |
| Copper Chests | 8 | Blocks |
| Copper and Iron Doors/Trapdoors | 18 | Blocks |
| Copper and Iron Bars/Chains | 18 | Blocks |
| Copper Bulbs, Lanterns and Torch; Redstone Lamp and Torch | 19 | Blocks |
| Copper Grates | 8 | Blocks |

Counts include the applicable plain, exposed, weathered, oxidized, and waxed copper variants in Paper 26.2. The exact 79-material approval is recorded in [approved-fixtures.tsv](../../plugins/player-fun/autosell/src/test/resources/category-policy/approved-fixtures.tsv) and exercised through the actual category classifier by the regression tests. Eight entries belong to Fancy and 71 to Blocks.

## Deferred: 48 building variants

These retain Mining for now. They have not been approved for a move, even where the general purpose-based policy suggests a possible later cleanup.

| Family | Count |
| --- | ---: |
| Cut and Chiseled Copper, including stairs/slabs and variants | 32 |
| Quartz building pieces, including chiseled and smooth variants | 9 |
| Waxed and aged solid Copper Blocks | 7 |

The exact protected list is [deferred-building-variants.txt](../../plugins/player-fun/autosell/src/test/resources/category-policy/deferred-building-variants.txt). Regression tests keep these 48 assignments intact until that review occurs.

## Earlier approved corrections: 17 items

Golden Carrot, Golden Apple, and Enchanted Golden Apple belong to Food; Golden Dandelion and Spore Blossom to Farming; copper, iron, and gold spears, horse armor, and nautilus armor to Tools; Charcoal to Wood; Explorer Pottery Sherd to Other; and Heavy Core to Fancy. These assignments remain in effect.

## Player effects

Individual item switches, saved category preferences, prices, and recorded sale history are preserved. Future sales use the assigned category's toggle, quest matching, and category boosts. A category correction does not bypass item eligibility, container protection, or other sale checks.
