# Possible Recipe Loop Priority Review - 2026-05-11

Source report:

- `docs/economy-review/reports/worthhelper-report-2026-05-11T08-04-18.011002Z.md`

Scope:

- 174 `possible-recipe-loop-review` entries.
- These are items where current sell worth is above the recipe-derived value.
- No `Worth.yml` changes are approved or applied by this report.

## How To Read This

`profit per item` means current sell worth minus recipe-derived worth for one
output item. `profit per craft` accounts for recipes that output more than one
item, such as slabs, panes, concrete powder, and end rods.

This is not a direct "lower everything" list. Some items may intentionally have
a premium, but every premium should be checked for craft-and-sell abuse.

## Biggest Potential Craft-Sell Gaps

Sorted by possible profit per craft.

| Item | Current | Recipe value | Profit per craft | Why it matters |
| --- | ---: | ---: | ---: | --- |
| `NETHERITE_CHESTPLATE` | 1897.2 | 1040.4 | 856.8 | Largest single-item gap; also check durability sell behavior. |
| `NETHERITE_LEGGINGS` | 1693.2 | 974.1 | 719.1 | Same netherite/smithing family risk. |
| `NETHERITE_HELMET` | 1285.2 | 841.5 | 443.7 | Same netherite/smithing family risk. |
| `NETHERITE_BOOTS` | 1081.2 | 775.2 | 306.0 | Same netherite/smithing family risk. |
| `LODESTONE` | 281.52 | 18.75 | 262.77 | Very large gap; verify netherite ingot/template assumptions. |
| `GOLDEN_APPLE` | 251.1 | 23.36 | 227.74 | Gold can be farmed; apple supply is easy. |
| `NETHERITE_AXE` | 877.2 | 709.1 | 168.1 | Same netherite/smithing family risk. |
| `NETHERITE_PICKAXE` | 877.2 | 709.1 | 168.1 | Same netherite/smithing family risk. |
| `CAKE` | 150.0 | 32.4 | 117.6 | Inputs are farmable; strong auto-farm concern. |
| `CRAFTER` | 130.44 | 16.64 | 113.8 | Common redstone/crafting ingredients; large gap. |
| `SPYGLASS` | 83.61 | 10.4 | 73.21 | Copper and amethyst are obtainable in bulk. |
| `END_CRYSTAL` | 200.0 | 170.36 | 29.64 | Smaller percent, but high-value item and farmable components may matter. |
| `WAXED_CUT_COPPER` | 16.22 | 11.25 | 19.88 | Recipe outputs 4; copper/wax family should be reviewed together. |
| `SPONGE` | 50.0 | 35.0 | 15.0 | Smelting wet sponge to sponge creates a gap. |
| `NETHER_BRICK_FENCE` | 2.95 | 0.9 | 12.3 | Recipe outputs 6; bulk craftable. |
| `END_ROD` | 3.0 | 0.13 | 11.48 | Recipe outputs 4; huge percentage gap. |
| `WAXED_CUT_COPPER_STAIRS` | 13.19 | 11.25 | 7.76 | Recipe outputs 4 from waxed copper block. |
| `WAXED_CUT_COPPER_SLAB` | 6.59 | 5.625 | 7.72 | Recipe outputs 8 from waxed copper block. |
| `BRICK_SLAB` | 2.44 | 1.2 | 7.44 | Recipe outputs 6; clay/brick supply check needed. |
| `MOSSY_STONE_BRICK_SLAB` | 2.04 | 1.0 | 6.24 | Recipe outputs 6; moss can be farmed. |

## Highest Priority Manual Review

They have high absolute value, high percent gap, easy/farmable inputs, or batch-output conversion risk.

### Priority A - Direct High-Value Spikes

- `NETHERITE_CHESTPLATE`
- `NETHERITE_LEGGINGS`
- `NETHERITE_HELMET`
- `NETHERITE_BOOTS`
- `NETHERITE_AXE`
- `NETHERITE_PICKAXE`
- `LODESTONE`
- `GOLDEN_APPLE`
- `CAKE`
- `CRAFTER`
- `SPYGLASS`
- `END_CRYSTAL`

Review notes:

- For netherite gear/tools, verify whether the smithing template is counted
  correctly and whether CMI sells damaged gear at full value. If damaged gear
  can sell at full value, this family becomes more urgent.
- For `LODESTONE`, check whether the recipe-derived value is missing an
  intended rarity premium or whether current worth is simply too high.
- For `GOLDEN_APPLE`, assume gold farms and easy apple supply until proven
  otherwise.
- For `CAKE`, treat this as farmable unless milk, egg, sugar, and wheat flow is
  intentionally constrained.

### Priority B - Bulk Conversion Loops

- `WAXED_CUT_COPPER`
- `WAXED_CUT_COPPER_STAIRS`
- `WAXED_CUT_COPPER_SLAB`
- `NETHER_BRICK_FENCE`
- `END_ROD`
- `BRICK_SLAB`
- `MOSSY_STONE_BRICK_SLAB`
- `END_STONE_BRICKS`
- `END_STONE_BRICK_SLAB`
- `END_STONE_BRICK_STAIRS`
- `END_STONE_BRICK_WALL`
- `CHISELED_STONE_BRICKS`
- `SOUL_TORCH`

Review notes:

- These are less glamorous than netherite, but many are easy to mass-produce.
- Review as families. If one slab/stair/wall value is wrong, nearby variants
  probably share the same pricing problem.
- Stonecutting recipes matter because they often produce cleaner ratios than
  crafting-table recipes.

### Priority C - Smaller But Practical

- `SPONGE`
- `MAP`
- `SUSPICIOUS_STEW`
- `GOLD_BLOCK`
- `GOLD_INGOT`
- `REPEATER`

Review notes:

- `GOLD_INGOT` should be checked because the report uses the
  `gold_ingot_from_blasting_nether_gold_ore` path. If players can obtain or
  silk-touch nether gold ore cheaply, this may be real.
- `SUSPICIOUS_STEW` is farmable enough to deserve review despite a smaller
  absolute value.
- `MAP` and `REPEATER` are common utility crafts; smaller gaps can still matter
  when bulk crafted.

## Staff Assignment Suggestion

- Staff A: netherite gear/tools, durability selling behavior, smithing template
  assumptions.
- Staff B: `LODESTONE`, `GOLDEN_APPLE`, `GOLD_BLOCK`, `GOLD_INGOT`,
  `END_CRYSTAL`.
- Staff C: farmables and food: `CAKE`, `SUSPICIOUS_STEW`, cooked foods,
  `BAKED_POTATO`, `GOLDEN_CARROT`.
- Staff D: conversion families: copper, concrete powder, glass/panes, glazed
  terracotta, slabs, stairs, walls, stonecutting.

## What's Left After The Highest Priority Set

143 entries remain after the 31 priority items above. These should be reviewed
in batches, not one by one at first.

### Concrete Powder Colors - 16

`PINK_CONCRETE_POWDER`, `BLACK_CONCRETE_POWDER`, `BLUE_CONCRETE_POWDER`,
`MAGENTA_CONCRETE_POWDER`, `PURPLE_CONCRETE_POWDER`,
`GRAY_CONCRETE_POWDER`, `LIGHT_BLUE_CONCRETE_POWDER`,
`YELLOW_CONCRETE_POWDER`, `LIGHT_GRAY_CONCRETE_POWDER`,
`ORANGE_CONCRETE_POWDER`, `BROWN_CONCRETE_POWDER`, `RED_CONCRETE_POWDER`,
`WHITE_CONCRETE_POWDER`, `LIME_CONCRETE_POWDER`,
`GREEN_CONCRETE_POWDER`, `CYAN_CONCRETE_POWDER`

Batch note: recipe outputs 8, so the per-item gap looks small but the per-craft
gap is roughly 3.5 to 4.0 for most colors.

### Stained Glass And Panes - 31

`LIGHT_GRAY_STAINED_GLASS_PANE`, `BROWN_STAINED_GLASS_PANE`,
`CYAN_STAINED_GLASS_PANE`, `GREEN_STAINED_GLASS_PANE`,
`LIME_STAINED_GLASS_PANE`, `RED_STAINED_GLASS_PANE`,
`PINK_STAINED_GLASS`, `BLACK_STAINED_GLASS`, `BLUE_STAINED_GLASS`,
`MAGENTA_STAINED_GLASS`, `PURPLE_STAINED_GLASS`, `GRAY_STAINED_GLASS`,
`LIGHT_BLUE_STAINED_GLASS`, `YELLOW_STAINED_GLASS`,
`LIGHT_GRAY_STAINED_GLASS`, `ORANGE_STAINED_GLASS`,
`BROWN_STAINED_GLASS`, `RED_STAINED_GLASS`, `LIME_STAINED_GLASS`,
`GREEN_STAINED_GLASS`, `PINK_STAINED_GLASS_PANE`,
`BLACK_STAINED_GLASS_PANE`, `BLUE_STAINED_GLASS_PANE`,
`WHITE_STAINED_GLASS`, `MAGENTA_STAINED_GLASS_PANE`,
`CYAN_STAINED_GLASS`, `PURPLE_STAINED_GLASS_PANE`,
`GRAY_STAINED_GLASS_PANE`, `LIGHT_BLUE_STAINED_GLASS_PANE`,
`YELLOW_STAINED_GLASS_PANE`, `ORANGE_STAINED_GLASS_PANE`

Batch note: review the base `GLASS` value before tuning this family.

### Glazed Terracotta - 16

`WHITE_GLAZED_TERRACOTTA`, `BLACK_GLAZED_TERRACOTTA`,
`BLUE_GLAZED_TERRACOTTA`, `BROWN_GLAZED_TERRACOTTA`,
`CYAN_GLAZED_TERRACOTTA`, `GRAY_GLAZED_TERRACOTTA`,
`GREEN_GLAZED_TERRACOTTA`, `LIGHT_BLUE_GLAZED_TERRACOTTA`,
`LIGHT_GRAY_GLAZED_TERRACOTTA`, `LIME_GLAZED_TERRACOTTA`,
`MAGENTA_GLAZED_TERRACOTTA`, `ORANGE_GLAZED_TERRACOTTA`,
`PINK_GLAZED_TERRACOTTA`, `PURPLE_GLAZED_TERRACOTTA`,
`RED_GLAZED_TERRACOTTA`, `YELLOW_GLAZED_TERRACOTTA`

Batch note: mostly low-value furnace conversions. Review after terracotta and
dye values are settled.

### Slabs, Stairs, Walls, And Shape Conversions - 35

`MOSSY_COBBLESTONE_SLAB`, `PURPUR_SLAB`, `NETHER_BRICK_SLAB`,
`PURPUR_BLOCK`, `RED_NETHER_BRICK_SLAB`, `BRICK_STAIRS`,
`STONE_BRICKS`, `STONE_SLAB`, `GRANITE_SLAB`, `POLISHED_GRANITE_SLAB`,
`DIORITE_SLAB`, `POLISHED_DIORITE_SLAB`, `CRACKED_STONE_BRICKS`,
`ANDESITE_SLAB`, `POLISHED_ANDESITE_SLAB`, `STONE_BRICK_STAIRS`,
`DARK_PRISMARINE_STAIRS`, `PRISMARINE_BRICK_STAIRS`,
`PRISMARINE_BRICKS`, `DARK_PRISMARINE`, `STONE_BRICK_WALL`,
`STONE_BRICK_SLAB`, `CUT_RED_SANDSTONE_SLAB`, `RED_SANDSTONE_SLAB`,
`PRISMARINE`, `PRISMARINE_STAIRS`, `QUARTZ_STAIRS`,
`SMOOTH_QUARTZ_STAIRS`, `SMOOTH_SANDSTONE_SLAB`,
`CUT_SANDSTONE_SLAB`, `SMOOTH_RED_SANDSTONE_SLAB`,
`COBBLESTONE_STAIRS`, `SMOOTH_SANDSTONE`, `SANDSTONE`,
`SMOOTH_RED_SANDSTONE`

Batch note: this is a family-level pricing problem. Decide shape-conversion
policy once, then apply consistently.

### Food, Cooking, And Farmables - 7

`GOLDEN_CARROT`, `BAKED_POTATO`, `COOKED_BEEF`, `COOKED_CHICKEN`,
`COOKED_MUTTON`, `COOKED_PORKCHOP`, `COOKED_RABBIT`

Batch note: be very careful with farmable food. These are likely not worth
raising, but the cooked output being higher than raw/campfire input can still
create a simple craft/cook/sell bump.

### Redstone, Utility, And Small Crafted Items - 18

`FIRE_CHARGE`, `STONE_PRESSURE_PLATE`, `LIGHT_WEIGHTED_PRESSURE_PLATE`,
`ENDER_EYE`, `DISPENSER`, `CARTOGRAPHY_TABLE`, `JACK_O_LANTERN`,
`BOOK`, `OAK_TRAPDOOR`, `CYAN_DYE`, `RED_DYE`, `ITEM_FRAME`,
`CRAFTING_TABLE`, `STONE_BUTTON`, `TNT`, `WHITE_DYE`,
`OAK_PRESSURE_PLATE`, `LEVER`

Batch note: mostly smaller gaps, but easy craftability means staff should not
ignore them forever.

### Basic Smelting And Resources - 13

`COAL`, `SNOW`, `GLASS`, `CLAY`, `CHARCOAL`, `MOSSY_COBBLESTONE`,
`DEEPSLATE`, `SMOOTH_STONE`, `BRICK`, `POPPED_CHORUS_FRUIT`, `STONE`,
`NETHER_BRICK`, `SNOW_BLOCK`

Batch note: some are tiny value differences. `GLASS` has a very large
percentage gap but low absolute value; review it before glass-family items.

### Other Remaining - 7

`COARSE_DIRT`, `GLASS_PANE`, `OAK_DOOR`, `OAK_FENCE`, `YELLOW_DYE`,
`WHITE_CARPET`, `MAGENTA_DYE`

Batch note: low urgency unless players are already bulk crafting and selling
them.

## Suggested Next Decision

Start staff review with Priority A and Priority B. If staff confirms an item is
craftable in survival, ingredients are obtainable in bulk, and the high worth is
not intentional, propose a change. Do not apply commands directly from the
WorthHelper export.
