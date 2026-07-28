# WorthHelper Report

- Created: 2026-05-11T08:04:18.010668Z
- Result: review
- Safety: read-only; no Worth.yml writes and no `cmi setworth` execution.
- Worth source: Worth.yml
- Migrated worth baseline: `docs/economy-review/baseline/CMI/Worth.yml`
- Direct worth entries: 1413
- Variant worth entries skipped: 110
- Item materials: 1505
- Paper recipes: 1466/1515 supported
- Suggestions: 440
- Missing direct worth values: 5

## Review Rules

- Do not blindly inflate values just because a recipe says so.
- Consider farmability, automatic farms, ease of access, rarity, and player expectations.
- Keep human value hierarchy in mind, such as iron generally feeling more valuable than copper and diamond more valuable than copper or iron.
- Potions, splash potions, lingering potions, tipped arrows, ominous bottles, creative/test blocks, spawn eggs, and special blocks are review-only.

## Suggested Commands For Review

```yml
# NETHERITE_CHESTPLATE - possible-recipe-loop-review
# current=1897.2 suggested=1040.4 diff=-856.8 (45.1613%)
# /buy impact: current=189720, suggested=104040
# recipe: smithing-transform minecraft:netherite_chestplate_smithing => 1 for 1040.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_chestplate -s:1040.4

# NETHERITE_LEGGINGS - possible-recipe-loop-review
# current=1693.2 suggested=974.1 diff=-719.1 (42.4699%)
# /buy impact: current=169320, suggested=97410
# recipe: smithing-transform minecraft:netherite_leggings_smithing => 1 for 974.1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_leggings -s:974.1

# NETHERITE_HELMET - possible-recipe-loop-review
# current=1285.2 suggested=841.5 diff=-443.7 (34.5238%)
# /buy impact: current=128520, suggested=84150
# recipe: smithing-transform minecraft:netherite_helmet_smithing => 1 for 841.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_helmet -s:841.5

# NETHERITE_BOOTS - possible-recipe-loop-review
# current=1081.2 suggested=775.2 diff=-306 (28.3019%)
# /buy impact: current=108120, suggested=77520
# recipe: smithing-transform minecraft:netherite_boots_smithing => 1 for 775.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_boots -s:775.2

# LODESTONE - possible-recipe-loop-review
# current=281.52 suggested=18.75 diff=-262.77 (93.3397%)
# /buy impact: current=28152, suggested=1875
# recipe: shaped minecraft:lodestone => 1 for 18.75 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lodestone -s:18.75

# GOLDEN_APPLE - possible-recipe-loop-review
# current=251.1 suggested=23.36 diff=-227.74 (90.6969%)
# /buy impact: current=25110, suggested=2336
# recipe: shaped minecraft:golden_apple => 1 for 23.36 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth golden_apple -s:23.36

# NETHERITE_AXE - possible-recipe-loop-review
# current=877.2 suggested=709.1 diff=-168.1 (19.1632%)
# /buy impact: current=87720, suggested=70910
# recipe: smithing-transform minecraft:netherite_axe_smithing => 1 for 709.1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_axe -s:709.1

# NETHERITE_PICKAXE - possible-recipe-loop-review
# current=877.2 suggested=709.1 diff=-168.1 (19.1632%)
# /buy impact: current=87720, suggested=70910
# recipe: smithing-transform minecraft:netherite_pickaxe_smithing => 1 for 709.1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_pickaxe -s:709.1

# CAKE - possible-recipe-loop-review
# current=150 suggested=32.4 diff=-117.6 (78.4%)
# /buy impact: current=15000, suggested=3240
# recipe: shaped minecraft:cake => 1 for 32.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cake -s:32.4

# CRAFTER - possible-recipe-loop-review
# current=130.44 suggested=16.64 diff=-113.8 (87.2432%)
# /buy impact: current=13044, suggested=1664
# recipe: shaped minecraft:crafter => 1 for 16.64 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth crafter -s:16.64

# SPYGLASS - possible-recipe-loop-review
# current=83.61 suggested=10.4 diff=-73.21 (87.5613%)
# /buy impact: current=8361, suggested=1040
# recipe: shaped minecraft:spyglass => 1 for 10.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spyglass -s:10.4

# END_CRYSTAL - possible-recipe-loop-review
# current=200 suggested=170.36 diff=-29.64 (14.82%)
# /buy impact: current=20000, suggested=17036
# recipe: shaped minecraft:end_crystal => 1 for 170.36 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_crystal -s:170.36

# SPONGE - possible-recipe-loop-review
# current=50 suggested=35 diff=-15 (30%)
# /buy impact: current=5000, suggested=3500
# recipe: furnace minecraft:sponge => 1 for 35 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sponge -s:35

# MAP - possible-recipe-loop-review
# current=18.19 suggested=12.13 diff=-6.06 (33.315%)
# /buy impact: current=1819, suggested=1213
# recipe: shaped minecraft:map => 1 for 12.13 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth map -s:12.13

# WAXED_CUT_COPPER - possible-recipe-loop-review
# current=16.22 suggested=11.25 diff=-4.97 (30.6412%)
# /buy impact: current=1622, suggested=1125
# recipe: stonecutting minecraft:waxed_cut_copper_from_waxed_copper_block_stonecutting => 4 for 45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_cut_copper -s:11.25

# SUSPICIOUS_STEW - possible-recipe-loop-review
# current=6 suggested=1.5 diff=-4.5 (75%)
# /buy impact: current=600, suggested=150
# recipe: shapeless minecraft:suspicious_stew_from_closed_eyeblossom => 1 for 1.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth suspicious_stew -s:1.5

# GOLD_BLOCK - possible-recipe-loop-review
# current=28.31 suggested=24.3 diff=-4.01 (14.1646%)
# /buy impact: current=2831, suggested=2430
# recipe: shaped minecraft:gold_block => 1 for 24.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gold_block -s:24.3

# BRICK_STAIRS - possible-recipe-loop-review
# current=5.59 suggested=2.4 diff=-3.19 (57.0662%)
# /buy impact: current=559, suggested=240
# recipe: stonecutting minecraft:brick_stairs_from_bricks_stonecutting => 1 for 2.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brick_stairs -s:2.4

# END_ROD - possible-recipe-loop-review
# current=3 suggested=0.13 diff=-2.87 (95.6667%)
# /buy impact: current=300, suggested=13
# recipe: shaped minecraft:end_rod => 4 for 0.52 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_rod -s:0.13

# NETHER_BRICK_FENCE - possible-recipe-loop-review
# current=2.95 suggested=0.9 diff=-2.05 (69.4915%)
# /buy impact: current=295, suggested=90
# recipe: shaped minecraft:nether_brick_fence => 6 for 5.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth nether_brick_fence -s:0.9

# WAXED_CUT_COPPER_STAIRS - possible-recipe-loop-review
# current=13.19 suggested=11.25 diff=-1.94 (14.7081%)
# /buy impact: current=1319, suggested=1125
# recipe: stonecutting minecraft:waxed_cut_copper_stairs_from_waxed_copper_block_stonecutting => 4 for 45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_cut_copper_stairs -s:11.25

# GOLD_INGOT - possible-recipe-loop-review
# current=2.7 suggested=1 diff=-1.7 (62.963%)
# /buy impact: current=270, suggested=100
# recipe: blasting minecraft:gold_ingot_from_blasting_nether_gold_ore => 1 for 1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gold_ingot -s:1

# CHISELED_STONE_BRICKS - possible-recipe-loop-review
# current=2 suggested=0.3 diff=-1.7 (85%)
# /buy impact: current=200, suggested=30
# recipe: stonecutting minecraft:chiseled_stone_bricks_from_stone_stonecutting => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth chiseled_stone_bricks -s:0.3

# END_STONE_BRICK_SLAB - possible-recipe-loop-review
# current=1.83 suggested=0.225 diff=-1.605 (87.7049%)
# /buy impact: current=183, suggested=22.5
# recipe: stonecutting minecraft:end_stone_brick_slab_from_end_stone_stonecutting => 2 for 0.45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_stone_brick_slab -s:0.225

# REPEATER - possible-recipe-loop-review
# current=2.88 suggested=1.47 diff=-1.41 (48.9583%)
# /buy impact: current=288, suggested=147
# recipe: shaped minecraft:repeater => 1 for 1.47 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth repeater -s:1.47

# END_STONE_BRICK_STAIRS - possible-recipe-loop-review
# current=1.83 suggested=0.45 diff=-1.38 (75.4098%)
# /buy impact: current=183, suggested=45
# recipe: stonecutting minecraft:end_stone_brick_stairs_from_end_stone_stonecutting => 1 for 0.45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_stone_brick_stairs -s:0.45

# END_STONE_BRICKS - possible-recipe-loop-review
# current=1.8 suggested=0.45 diff=-1.35 (75%)
# /buy impact: current=180, suggested=45
# recipe: shaped minecraft:end_stone_bricks => 4 for 1.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_stone_bricks -s:0.45

# END_STONE_BRICK_WALL - possible-recipe-loop-review
# current=1.8 suggested=0.45 diff=-1.35 (75%)
# /buy impact: current=180, suggested=45
# recipe: stonecutting minecraft:end_stone_brick_wall_from_end_stone_stonecutting => 1 for 0.45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth end_stone_brick_wall -s:0.45

# BRICK_SLAB - possible-recipe-loop-review
# current=2.44 suggested=1.2 diff=-1.24 (50.8197%)
# /buy impact: current=244, suggested=120
# recipe: shaped minecraft:brick_slab => 6 for 7.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brick_slab -s:1.2

# CRACKED_STONE_BRICKS - possible-recipe-loop-review
# current=2 suggested=0.9 diff=-1.1 (55%)
# /buy impact: current=200, suggested=90
# recipe: furnace minecraft:cracked_stone_bricks => 1 for 0.9 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cracked_stone_bricks -s:0.9

# SOUL_TORCH - possible-recipe-loop-review
# current=1.4 suggested=0.3425 diff=-1.0575 (75.5357%)
# /buy impact: current=140, suggested=34.25
# recipe: shaped minecraft:soul_torch => 4 for 1.37 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth soul_torch -s:0.3425

# MOSSY_STONE_BRICK_SLAB - possible-recipe-loop-review
# current=2.04 suggested=1 diff=-1.04 (50.9804%)
# /buy impact: current=204, suggested=100
# recipe: shaped minecraft:mossy_stone_brick_slab => 6 for 6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mossy_stone_brick_slab -s:1

# WAXED_CUT_COPPER_SLAB - possible-recipe-loop-review
# current=6.59 suggested=5.625 diff=-0.965 (14.6434%)
# /buy impact: current=659, suggested=562.5
# recipe: stonecutting minecraft:waxed_cut_copper_slab_from_waxed_copper_block_stonecutting => 8 for 45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_cut_copper_slab -s:5.625

# STONE_BRICK_STAIRS - possible-recipe-loop-review
# current=1.24 suggested=0.3 diff=-0.94 (75.8065%)
# /buy impact: current=124, suggested=30
# recipe: stonecutting minecraft:stone_brick_stairs_from_stone_stonecutting => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_brick_stairs -s:0.3

# PURPUR_BLOCK - possible-recipe-loop-review
# current=1.22 suggested=0.3 diff=-0.92 (75.4098%)
# /buy impact: current=122, suggested=30
# recipe: shaped minecraft:purpur_block => 4 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purpur_block -s:0.3

# DARK_PRISMARINE_STAIRS - possible-recipe-loop-review
# current=2.6 suggested=1.7 diff=-0.9 (34.6154%)
# /buy impact: current=260, suggested=170
# recipe: stonecutting minecraft:dark_prismarine_stairs_from_dark_prismarine_stonecutting => 1 for 1.7 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_prismarine_stairs -s:1.7

# PRISMARINE_BRICK_STAIRS - possible-recipe-loop-review
# current=2.7 suggested=1.8 diff=-0.9 (33.3333%)
# /buy impact: current=270, suggested=180
# recipe: stonecutting minecraft:prismarine_brick_stairs_from_prismarine_bricks_stonecutting => 1 for 1.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth prismarine_brick_stairs -s:1.8

# STONE_PRESSURE_PLATE - possible-recipe-loop-review
# current=1.5 suggested=0.6 diff=-0.9 (60%)
# /buy impact: current=150, suggested=60
# recipe: shaped minecraft:stone_pressure_plate => 1 for 0.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_pressure_plate -s:0.6

# LIGHT_WEIGHTED_PRESSURE_PLATE - possible-recipe-loop-review
# current=6.29 suggested=5.4 diff=-0.89 (14.1494%)
# /buy impact: current=629, suggested=540
# recipe: shaped minecraft:light_weighted_pressure_plate => 1 for 5.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_weighted_pressure_plate -s:5.4

# PRISMARINE_BRICKS - possible-recipe-loop-review
# current=1.8 suggested=1 diff=-0.8 (44.4444%)
# /buy impact: current=180, suggested=100
# recipe: shapeless minecraft:prismarine_bricks => 1 for 1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth prismarine_bricks -s:1

# DARK_PRISMARINE - possible-recipe-loop-review
# current=1.7 suggested=0.92 diff=-0.78 (45.8824%)
# /buy impact: current=170, suggested=92
# recipe: shaped minecraft:dark_prismarine => 1 for 0.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_prismarine -s:0.92

# MOSSY_COBBLESTONE_SLAB - possible-recipe-loop-review
# current=1.24 suggested=0.61 diff=-0.63 (50.8065%)
# /buy impact: current=124, suggested=61
# recipe: shaped minecraft:mossy_cobblestone_slab => 6 for 3.66 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mossy_cobblestone_slab -s:0.61

# PURPUR_SLAB - possible-recipe-loop-review
# current=1.24 suggested=0.61 diff=-0.63 (50.8065%)
# /buy impact: current=124, suggested=61
# recipe: shaped minecraft:purpur_slab => 6 for 3.66 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purpur_slab -s:0.61

# NETHER_BRICK_SLAB - possible-recipe-loop-review
# current=1.22 suggested=0.6 diff=-0.62 (50.8197%)
# /buy impact: current=122, suggested=60
# recipe: shaped minecraft:nether_brick_slab => 6 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth nether_brick_slab -s:0.6

# STONE_BRICK_WALL - possible-recipe-loop-review
# current=0.91 suggested=0.3 diff=-0.61 (67.033%)
# /buy impact: current=91, suggested=30
# recipe: stonecutting minecraft:stone_brick_wall_from_stone_stonecutting => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_brick_wall -s:0.3

# ENDER_EYE - possible-recipe-loop-review
# current=2 suggested=1.4 diff=-0.6 (30%)
# /buy impact: current=200, suggested=140
# recipe: shapeless minecraft:ender_eye => 1 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth ender_eye -s:1.4

# STONE_BRICKS - possible-recipe-loop-review
# current=0.9 suggested=0.3 diff=-0.6 (66.6667%)
# /buy impact: current=90, suggested=30
# recipe: shaped minecraft:stone_bricks => 4 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_bricks -s:0.3

# GOLDEN_CARROT - possible-recipe-loop-review
# current=3.35 suggested=2.8 diff=-0.55 (16.4179%)
# /buy impact: current=335, suggested=280
# recipe: shaped minecraft:golden_carrot => 1 for 2.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth golden_carrot -s:2.8

# RED_NETHER_BRICK_SLAB - possible-recipe-loop-review
# current=1.06 suggested=0.52 diff=-0.54 (50.9434%)
# /buy impact: current=106, suggested=52
# recipe: shaped minecraft:red_nether_brick_slab => 6 for 3.12 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_nether_brick_slab -s:0.52

# PINK_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1038 diff=-0.4962 (82.7%)
# /buy impact: current=60, suggested=10.38
# recipe: shapeless minecraft:pink_concrete_powder => 8 for 0.83 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_concrete_powder -s:0.1038

# BLACK_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1113 diff=-0.4887 (81.45%)
# /buy impact: current=60, suggested=11.13
# recipe: shapeless minecraft:black_concrete_powder => 8 for 0.89 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_concrete_powder -s:0.1113

# BLUE_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1113 diff=-0.4887 (81.45%)
# /buy impact: current=60, suggested=11.13
# recipe: shapeless minecraft:blue_concrete_powder => 8 for 0.89 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_concrete_powder -s:0.1113

# MAGENTA_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1163 diff=-0.4837 (80.6167%)
# /buy impact: current=60, suggested=11.63
# recipe: shapeless minecraft:magenta_concrete_powder => 8 for 0.93 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_concrete_powder -s:0.1163

# BAKED_POTATO - possible-recipe-loop-review
# current=0.92 suggested=0.44 diff=-0.48 (52.1739%)
# /buy impact: current=92, suggested=44
# recipe: campfire minecraft:baked_potato_from_campfire_cooking => 1 for 0.44 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth baked_potato -s:0.44

# PURPLE_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1213 diff=-0.4787 (79.7833%)
# /buy impact: current=60, suggested=12.13
# recipe: shapeless minecraft:purple_concrete_powder => 8 for 0.97 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_concrete_powder -s:0.1213

# GRAY_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1238 diff=-0.4762 (79.3667%)
# /buy impact: current=60, suggested=12.38
# recipe: shapeless minecraft:gray_concrete_powder => 8 for 0.99 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_concrete_powder -s:0.1238

# LIGHT_BLUE_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1238 diff=-0.4762 (79.3667%)
# /buy impact: current=60, suggested=12.38
# recipe: shapeless minecraft:light_blue_concrete_powder => 8 for 0.99 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_concrete_powder -s:0.1238

# YELLOW_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1238 diff=-0.4762 (79.3667%)
# /buy impact: current=60, suggested=12.38
# recipe: shapeless minecraft:yellow_concrete_powder => 8 for 0.99 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_concrete_powder -s:0.1238

# LIGHT_GRAY_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1288 diff=-0.4712 (78.5333%)
# /buy impact: current=60, suggested=12.88
# recipe: shapeless minecraft:light_gray_concrete_powder => 8 for 1.03 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_concrete_powder -s:0.1288

# ORANGE_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1288 diff=-0.4712 (78.5333%)
# /buy impact: current=60, suggested=12.88
# recipe: shapeless minecraft:orange_concrete_powder => 8 for 1.03 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_concrete_powder -s:0.1288

# DISPENSER - possible-recipe-loop-review
# current=2.58 suggested=2.11 diff=-0.47 (18.2171%)
# /buy impact: current=258, suggested=211
# recipe: shaped minecraft:dispenser => 1 for 2.11 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dispenser -s:2.11

# BROWN_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1313 diff=-0.4687 (78.1167%)
# /buy impact: current=60, suggested=13.13
# recipe: shapeless minecraft:brown_concrete_powder => 8 for 1.05 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_concrete_powder -s:0.1313

# RED_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1313 diff=-0.4687 (78.1167%)
# /buy impact: current=60, suggested=13.13
# recipe: shapeless minecraft:red_concrete_powder => 8 for 1.05 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_concrete_powder -s:0.1313

# WHITE_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1362 diff=-0.4638 (77.3%)
# /buy impact: current=60, suggested=13.62
# recipe: shapeless minecraft:white_concrete_powder => 8 for 1.09 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_concrete_powder -s:0.1362

# LIME_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1412 diff=-0.4588 (76.4667%)
# /buy impact: current=60, suggested=14.12
# recipe: shapeless minecraft:lime_concrete_powder => 8 for 1.13 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_concrete_powder -s:0.1412

# GREEN_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1438 diff=-0.4562 (76.0333%)
# /buy impact: current=60, suggested=14.38
# recipe: shapeless minecraft:green_concrete_powder => 8 for 1.15 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_concrete_powder -s:0.1438

# GLASS - possible-recipe-loop-review
# current=0.48 suggested=0.03 diff=-0.45 (93.75%)
# /buy impact: current=48, suggested=3
# recipe: furnace minecraft:glass => 1 for 0.03 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth glass -s:0.03

# CYAN_CONCRETE_POWDER - possible-recipe-loop-review
# current=0.6 suggested=0.1588 diff=-0.4412 (73.5333%)
# /buy impact: current=60, suggested=15.88
# recipe: shapeless minecraft:cyan_concrete_powder => 8 for 1.27 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_concrete_powder -s:0.1588

# CLAY - possible-recipe-loop-review
# current=2.42 suggested=2 diff=-0.42 (17.3554%)
# /buy impact: current=242, suggested=200
# recipe: shaped minecraft:clay => 1 for 2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth clay -s:2

# PRISMARINE - possible-recipe-loop-review
# current=0.8 suggested=0.4 diff=-0.4 (50%)
# /buy impact: current=80, suggested=40
# recipe: shaped minecraft:prismarine => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth prismarine -s:0.4

# PRISMARINE_STAIRS - possible-recipe-loop-review
# current=1.2 suggested=0.8 diff=-0.4 (33.3333%)
# /buy impact: current=120, suggested=80
# recipe: stonecutting minecraft:prismarine_stairs_from_prismarine_stonecutting => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth prismarine_stairs -s:0.8

# QUARTZ_STAIRS - possible-recipe-loop-review
# current=1.2 suggested=0.8 diff=-0.4 (33.3333%)
# /buy impact: current=120, suggested=80
# recipe: stonecutting minecraft:quartz_stairs_from_quartz_block_stonecutting => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth quartz_stairs -s:0.8

# SMOOTH_QUARTZ_STAIRS - possible-recipe-loop-review
# current=1.2 suggested=0.8 diff=-0.4 (33.3333%)
# /buy impact: current=120, suggested=80
# recipe: stonecutting minecraft:smooth_quartz_stairs_from_smooth_quartz_stonecutting => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_quartz_stairs -s:0.8

# STONE_SLAB - possible-recipe-loop-review
# current=0.53 suggested=0.15 diff=-0.38 (71.6981%)
# /buy impact: current=53, suggested=15
# recipe: shaped minecraft:stone_slab => 6 for 0.9 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_slab -s:0.15

# CARTOGRAPHY_TABLE - possible-recipe-loop-review
# current=1.38 suggested=1 diff=-0.38 (27.5362%)
# /buy impact: current=138, suggested=100
# recipe: shaped minecraft:cartography_table => 1 for 1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cartography_table -s:1

# LIGHT_GRAY_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.6 suggested=0.2238 diff=-0.3762 (62.7%)
# /buy impact: current=60, suggested=22.38
# recipe: shaped minecraft:light_gray_stained_glass_pane_from_glass_pane => 8 for 1.79 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_stained_glass_pane -s:0.2238

# FIRE_CHARGE - possible-recipe-loop-review
# current=1.39 suggested=1.0267 diff=-0.3633 (26.1367%)
# /buy impact: current=139, suggested=102.67
# recipe: shapeless minecraft:fire_charge => 3 for 3.08 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth fire_charge -s:1.0267

# GRANITE_SLAB - possible-recipe-loop-review
# current=0.67 suggested=0.33 diff=-0.34 (50.7463%)
# /buy impact: current=67, suggested=33
# recipe: shaped minecraft:granite_slab => 6 for 1.98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth granite_slab -s:0.33

# POLISHED_GRANITE_SLAB - possible-recipe-loop-review
# current=0.67 suggested=0.33 diff=-0.34 (50.7463%)
# /buy impact: current=67, suggested=33
# recipe: shaped minecraft:polished_granite_slab => 6 for 1.98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth polished_granite_slab -s:0.33

# JACK_O_LANTERN - possible-recipe-loop-review
# current=1.98 suggested=1.65 diff=-0.33 (16.6667%)
# /buy impact: current=198, suggested=165
# recipe: shaped minecraft:jack_o_lantern => 1 for 1.65 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jack_o_lantern -s:1.65

# BOOK - possible-recipe-loop-review
# current=1.18 suggested=0.88 diff=-0.3 (25.4237%)
# /buy impact: current=118, suggested=88
# recipe: shapeless minecraft:book => 1 for 0.88 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth book -s:0.88

# STONE_BRICK_SLAB - possible-recipe-loop-review
# current=0.4 suggested=0.15 diff=-0.25 (62.5%)
# /buy impact: current=40, suggested=15
# recipe: stonecutting minecraft:stone_brick_slab_from_stone_stonecutting => 2 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_brick_slab -s:0.15

# DIORITE_SLAB - possible-recipe-loop-review
# current=0.44 suggested=0.22 diff=-0.22 (50%)
# /buy impact: current=44, suggested=22
# recipe: shaped minecraft:diorite_slab => 6 for 1.32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth diorite_slab -s:0.22

# POLISHED_DIORITE_SLAB - possible-recipe-loop-review
# current=0.44 suggested=0.22 diff=-0.22 (50%)
# /buy impact: current=44, suggested=22
# recipe: shaped minecraft:polished_diorite_slab => 6 for 1.32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth polished_diorite_slab -s:0.22

# CHARCOAL - possible-recipe-loop-review
# current=1.2 suggested=0.98 diff=-0.22 (18.3333%)
# /buy impact: current=120, suggested=98
# recipe: furnace minecraft:charcoal => 1 for 0.98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth charcoal -s:0.98

# MOSSY_COBBLESTONE - possible-recipe-loop-review
# current=1.22 suggested=1 diff=-0.22 (18.0328%)
# /buy impact: current=122, suggested=100
# recipe: shapeless minecraft:mossy_cobblestone_from_moss_block => 1 for 1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mossy_cobblestone -s:1

# COAL - possible-recipe-loop-review
# current=1.17 suggested=0.9689 diff=-0.2011 (17.188%)
# /buy impact: current=117, suggested=96.89
# recipe: shapeless minecraft:coal => 9 for 8.72 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth coal -s:0.9689

# COOKED_BEEF - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: campfire minecraft:cooked_beef_from_campfire_cooking => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cooked_beef -s:0.2

# COOKED_CHICKEN - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: campfire minecraft:cooked_chicken_from_campfire_cooking => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cooked_chicken -s:0.2

# COOKED_MUTTON - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: campfire minecraft:cooked_mutton_from_campfire_cooking => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cooked_mutton -s:0.2

# COOKED_PORKCHOP - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: campfire minecraft:cooked_porkchop_from_campfire_cooking => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cooked_porkchop -s:0.2

# COOKED_RABBIT - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: campfire minecraft:cooked_rabbit_from_campfire_cooking => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cooked_rabbit -s:0.2

# WHITE_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.2 diff=-0.2 (50%)
# /buy impact: current=40, suggested=20
# recipe: furnace minecraft:white_glazed_terracotta => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_glazed_terracotta -s:0.2

# ITEM_FRAME - possible-recipe-loop-review
# current=1.24 suggested=1.04 diff=-0.2 (16.129%)
# /buy impact: current=124, suggested=104
# recipe: shaped minecraft:item_frame => 1 for 1.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth item_frame -s:1.04

# CRAFTING_TABLE - possible-recipe-loop-review
# current=0.98 suggested=0.8 diff=-0.18 (18.3673%)
# /buy impact: current=98, suggested=80
# recipe: shaped minecraft:crafting_table => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth crafting_table -s:0.8

# ANDESITE_SLAB - possible-recipe-loop-review
# current=0.33 suggested=0.165 diff=-0.165 (50%)
# /buy impact: current=33, suggested=16.5
# recipe: shaped minecraft:andesite_slab => 6 for 0.99 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth andesite_slab -s:0.165

# POLISHED_ANDESITE_SLAB - possible-recipe-loop-review
# current=0.33 suggested=0.165 diff=-0.165 (50%)
# /buy impact: current=33, suggested=16.5
# recipe: shaped minecraft:polished_andesite_slab => 6 for 0.99 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth polished_andesite_slab -s:0.165

# COBBLESTONE_STAIRS - possible-recipe-loop-review
# current=0.36 suggested=0.2 diff=-0.16 (44.4444%)
# /buy impact: current=36, suggested=20
# recipe: stonecutting minecraft:cobblestone_stairs_from_cobblestone_stonecutting => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cobblestone_stairs -s:0.2

# STONE_BUTTON - possible-recipe-loop-review
# current=0.75 suggested=0.6 diff=-0.15 (20%)
# /buy impact: current=75, suggested=60
# recipe: shapeless minecraft:stone_button => 1 for 0.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone_button -s:0.6

# TNT - possible-recipe-loop-review
# current=1.36 suggested=1.22 diff=-0.14 (10.2941%)
# /buy impact: current=136, suggested=122
# recipe: shaped minecraft:tnt => 1 for 1.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth tnt -s:1.22

# OAK_TRAPDOOR - possible-recipe-loop-review
# current=0.74 suggested=0.6 diff=-0.14 (18.9189%)
# /buy impact: current=74, suggested=60
# recipe: shaped minecraft:oak_trapdoor => 2 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_trapdoor -s:0.6

# SNOW - possible-recipe-loop-review
# current=0.15 suggested=0.025 diff=-0.125 (83.3333%)
# /buy impact: current=15, suggested=2.5
# recipe: shaped minecraft:snow => 6 for 0.15 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth snow -s:0.025

# CYAN_DYE - possible-recipe-loop-review
# current=0.31 suggested=0.2 diff=-0.11 (35.4839%)
# /buy impact: current=31, suggested=20
# recipe: shapeless minecraft:cyan_dye_from_pitcher_plant => 2 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_dye -s:0.2

# PINK_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.4913 diff=-0.1087 (18.1167%)
# /buy impact: current=60, suggested=49.13
# recipe: shaped minecraft:pink_stained_glass => 8 for 3.93 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_stained_glass -s:0.4913

# BLACK_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.495 diff=-0.105 (17.5%)
# /buy impact: current=60, suggested=49.5
# recipe: shaped minecraft:black_stained_glass => 8 for 3.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_stained_glass -s:0.495

# BLUE_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.495 diff=-0.105 (17.5%)
# /buy impact: current=60, suggested=49.5
# recipe: shaped minecraft:blue_stained_glass => 8 for 3.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_stained_glass -s:0.495

# MAGENTA_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.4975 diff=-0.1025 (17.0833%)
# /buy impact: current=60, suggested=49.75
# recipe: shaped minecraft:magenta_stained_glass => 8 for 3.98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_stained_glass -s:0.4975

# BLACK_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:black_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_glazed_terracotta -s:0.3

# BLUE_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:blue_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_glazed_terracotta -s:0.3

# BROWN_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:brown_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_glazed_terracotta -s:0.3

# CYAN_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:cyan_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_glazed_terracotta -s:0.3

# DEEPSLATE - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:deepslate => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth deepslate -s:0.3

# GRAY_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:gray_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_glazed_terracotta -s:0.3

# GREEN_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:green_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_glazed_terracotta -s:0.3

# LIGHT_BLUE_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:light_blue_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_glazed_terracotta -s:0.3

# LIGHT_GRAY_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:light_gray_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_glazed_terracotta -s:0.3

# LIME_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:lime_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_glazed_terracotta -s:0.3

# MAGENTA_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:magenta_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_glazed_terracotta -s:0.3

# ORANGE_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:orange_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_glazed_terracotta -s:0.3

# PINK_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:pink_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_glazed_terracotta -s:0.3

# PURPLE_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:purple_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_glazed_terracotta -s:0.3

# RED_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:red_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_glazed_terracotta -s:0.3

# SMOOTH_STONE - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:smooth_stone => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_stone -s:0.3

# YELLOW_GLAZED_TERRACOTTA - possible-recipe-loop-review
# current=0.4 suggested=0.3 diff=-0.1 (25%)
# /buy impact: current=40, suggested=30
# recipe: furnace minecraft:yellow_glazed_terracotta => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_glazed_terracotta -s:0.3

# COARSE_DIRT - possible-recipe-loop-review
# current=0.2 suggested=0.1 diff=-0.1 (50%)
# /buy impact: current=20, suggested=10
# recipe: shaped minecraft:coarse_dirt => 4 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth coarse_dirt -s:0.1

# CUT_SANDSTONE_SLAB - possible-recipe-loop-review
# current=0.2 suggested=0.1 diff=-0.1 (50%)
# /buy impact: current=20, suggested=10
# recipe: stonecutting minecraft:cut_sandstone_slab_from_cut_sandstone_stonecutting => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cut_sandstone_slab -s:0.1

# RED_DYE - possible-recipe-loop-review
# current=0.2 suggested=0.1 diff=-0.1 (50%)
# /buy impact: current=20, suggested=10
# recipe: shapeless minecraft:red_dye_from_rose_bush => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_dye -s:0.1

# SMOOTH_RED_SANDSTONE_SLAB - possible-recipe-loop-review
# current=0.2 suggested=0.1 diff=-0.1 (50%)
# /buy impact: current=20, suggested=10
# recipe: stonecutting minecraft:smooth_red_sandstone_slab_from_smooth_red_sandstone_stonecutting => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_red_sandstone_slab -s:0.1

# BRICK - possible-recipe-loop-review
# current=0.6 suggested=0.5 diff=-0.1 (16.6667%)
# /buy impact: current=60, suggested=50
# recipe: furnace minecraft:brick => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brick -s:0.5

# POPPED_CHORUS_FRUIT - possible-recipe-loop-review
# current=0.3 suggested=0.2 diff=-0.1 (33.3333%)
# /buy impact: current=30, suggested=20
# recipe: furnace minecraft:popped_chorus_fruit => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth popped_chorus_fruit -s:0.2

# PURPLE_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5 diff=-0.1 (16.6667%)
# /buy impact: current=60, suggested=50
# recipe: shaped minecraft:purple_stained_glass => 8 for 4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_stained_glass -s:0.5

# SMOOTH_SANDSTONE - possible-recipe-loop-review
# current=0.3 suggested=0.2 diff=-0.1 (33.3333%)
# /buy impact: current=30, suggested=20
# recipe: furnace minecraft:smooth_sandstone => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_sandstone -s:0.2

# STONE - possible-recipe-loop-review
# current=0.3 suggested=0.2 diff=-0.1 (33.3333%)
# /buy impact: current=30, suggested=20
# recipe: furnace minecraft:stone => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stone -s:0.2

# GRAY_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5013 diff=-0.0987 (16.45%)
# /buy impact: current=60, suggested=50.13
# recipe: shaped minecraft:gray_stained_glass => 8 for 4.01 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_stained_glass -s:0.5013

# LIGHT_BLUE_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5013 diff=-0.0987 (16.45%)
# /buy impact: current=60, suggested=50.13
# recipe: shaped minecraft:light_blue_stained_glass => 8 for 4.01 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_stained_glass -s:0.5013

# YELLOW_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5013 diff=-0.0987 (16.45%)
# /buy impact: current=60, suggested=50.13
# recipe: shaped minecraft:yellow_stained_glass => 8 for 4.01 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_stained_glass -s:0.5013

# LIGHT_GRAY_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5038 diff=-0.0962 (16.0333%)
# /buy impact: current=60, suggested=50.38
# recipe: shaped minecraft:light_gray_stained_glass => 8 for 4.03 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_stained_glass -s:0.5038

# ORANGE_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5038 diff=-0.0962 (16.0333%)
# /buy impact: current=60, suggested=50.38
# recipe: shaped minecraft:orange_stained_glass => 8 for 4.03 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_stained_glass -s:0.5038

# BROWN_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.505 diff=-0.095 (15.8333%)
# /buy impact: current=60, suggested=50.5
# recipe: shaped minecraft:brown_stained_glass => 8 for 4.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_stained_glass -s:0.505

# RED_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.505 diff=-0.095 (15.8333%)
# /buy impact: current=60, suggested=50.5
# recipe: shaped minecraft:red_stained_glass => 8 for 4.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_stained_glass -s:0.505

# LIME_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.51 diff=-0.09 (15%)
# /buy impact: current=60, suggested=51
# recipe: shaped minecraft:lime_stained_glass => 8 for 4.08 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_stained_glass -s:0.51

# OAK_DOOR - possible-recipe-loop-review
# current=0.49 suggested=0.4 diff=-0.09 (18.3673%)
# /buy impact: current=49, suggested=40
# recipe: shaped minecraft:oak_door => 3 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_door -s:0.4

# GREEN_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5113 diff=-0.0887 (14.7833%)
# /buy impact: current=60, suggested=51.13
# recipe: shaped minecraft:green_stained_glass => 8 for 4.09 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_stained_glass -s:0.5113

# PINK_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2113 diff=-0.0887 (29.5667%)
# /buy impact: current=30, suggested=21.13
# recipe: shaped minecraft:pink_stained_glass_pane_from_glass_pane => 8 for 1.69 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_stained_glass_pane -s:0.2113

# BLACK_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.215 diff=-0.085 (28.3333%)
# /buy impact: current=30, suggested=21.5
# recipe: shaped minecraft:black_stained_glass_pane_from_glass_pane => 8 for 1.72 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_stained_glass_pane -s:0.215

# BLUE_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.215 diff=-0.085 (28.3333%)
# /buy impact: current=30, suggested=21.5
# recipe: shaped minecraft:blue_stained_glass_pane_from_glass_pane => 8 for 1.72 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_stained_glass_pane -s:0.215

# WHITE_STAINED_GLASS - possible-recipe-loop-review
# current=0.59 suggested=0.5075 diff=-0.0825 (13.9831%)
# /buy impact: current=59, suggested=50.75
# recipe: shaped minecraft:white_stained_glass => 8 for 4.06 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_stained_glass -s:0.5075

# MAGENTA_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2175 diff=-0.0825 (27.5%)
# /buy impact: current=30, suggested=21.75
# recipe: shaped minecraft:magenta_stained_glass_pane_from_glass_pane => 8 for 1.74 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_stained_glass_pane -s:0.2175

# CYAN_STAINED_GLASS - possible-recipe-loop-review
# current=0.6 suggested=0.5187 diff=-0.0813 (13.55%)
# /buy impact: current=60, suggested=51.87
# recipe: shaped minecraft:cyan_stained_glass => 8 for 4.15 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_stained_glass -s:0.5187

# SANDSTONE - possible-recipe-loop-review
# current=0.2 suggested=0.12 diff=-0.08 (40%)
# /buy impact: current=20, suggested=12
# recipe: shaped minecraft:sandstone => 1 for 0.12 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sandstone -s:0.12

# CUT_RED_SANDSTONE_SLAB - possible-recipe-loop-review
# current=0.16 suggested=0.08 diff=-0.08 (50%)
# /buy impact: current=16, suggested=8
# recipe: shaped minecraft:cut_red_sandstone_slab => 6 for 0.48 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cut_red_sandstone_slab -s:0.08

# RED_SANDSTONE_SLAB - possible-recipe-loop-review
# current=0.16 suggested=0.08 diff=-0.08 (50%)
# /buy impact: current=16, suggested=8
# recipe: shaped minecraft:red_sandstone_slab => 6 for 0.48 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_sandstone_slab -s:0.08

# NETHER_BRICK - possible-recipe-loop-review
# current=0.3 suggested=0.22 diff=-0.08 (26.6667%)
# /buy impact: current=30, suggested=22
# recipe: furnace minecraft:nether_brick => 1 for 0.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth nether_brick -s:0.22

# PURPLE_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.22 diff=-0.08 (26.6667%)
# /buy impact: current=30, suggested=22
# recipe: shaped minecraft:purple_stained_glass_pane_from_glass_pane => 8 for 1.76 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_stained_glass_pane -s:0.22

# WHITE_DYE - possible-recipe-loop-review
# current=0.22 suggested=0.14 diff=-0.08 (36.3636%)
# /buy impact: current=22, suggested=14
# recipe: shapeless minecraft:white_dye => 1 for 0.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_dye -s:0.14

# OAK_PRESSURE_PLATE - possible-recipe-loop-review
# current=0.48 suggested=0.4 diff=-0.08 (16.6667%)
# /buy impact: current=48, suggested=40
# recipe: shaped minecraft:oak_pressure_plate => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_pressure_plate -s:0.4

# GRAY_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2213 diff=-0.0787 (26.2333%)
# /buy impact: current=30, suggested=22.13
# recipe: shaped minecraft:gray_stained_glass_pane_from_glass_pane => 8 for 1.77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_stained_glass_pane -s:0.2213

# LIGHT_BLUE_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2213 diff=-0.0787 (26.2333%)
# /buy impact: current=30, suggested=22.13
# recipe: shaped minecraft:light_blue_stained_glass_pane_from_glass_pane => 8 for 1.77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_stained_glass_pane -s:0.2213

# YELLOW_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2213 diff=-0.0787 (26.2333%)
# /buy impact: current=30, suggested=22.13
# recipe: shaped minecraft:yellow_stained_glass_pane_from_glass_pane => 8 for 1.77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_stained_glass_pane -s:0.2213

# ORANGE_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.2238 diff=-0.0762 (25.4%)
# /buy impact: current=30, suggested=22.38
# recipe: shaped minecraft:orange_stained_glass_pane_from_glass_pane => 8 for 1.79 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_stained_glass_pane -s:0.2238

# BROWN_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.225 diff=-0.075 (25%)
# /buy impact: current=30, suggested=22.5
# recipe: shaped minecraft:brown_stained_glass_pane => 16 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_stained_glass_pane -s:0.225

# CYAN_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.225 diff=-0.075 (25%)
# /buy impact: current=30, suggested=22.5
# recipe: shaped minecraft:cyan_stained_glass_pane => 16 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_stained_glass_pane -s:0.225

# GREEN_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.225 diff=-0.075 (25%)
# /buy impact: current=30, suggested=22.5
# recipe: shaped minecraft:green_stained_glass_pane => 16 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_stained_glass_pane -s:0.225

# LIME_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.225 diff=-0.075 (25%)
# /buy impact: current=30, suggested=22.5
# recipe: shaped minecraft:lime_stained_glass_pane => 16 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_stained_glass_pane -s:0.225

# RED_STAINED_GLASS_PANE - possible-recipe-loop-review
# current=0.3 suggested=0.225 diff=-0.075 (25%)
# /buy impact: current=30, suggested=22.5
# recipe: shaped minecraft:red_stained_glass_pane => 16 for 3.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_stained_glass_pane -s:0.225

# YELLOW_DYE - possible-recipe-loop-review
# current=0.17 suggested=0.1 diff=-0.07 (41.1765%)
# /buy impact: current=17, suggested=10
# recipe: shapeless minecraft:yellow_dye_from_sunflower => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_dye -s:0.1

# OAK_FENCE - possible-recipe-loop-review
# current=0.39 suggested=0.3333 diff=-0.0567 (14.5385%)
# /buy impact: current=39, suggested=33.33
# recipe: shaped minecraft:oak_fence => 3 for 1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_fence -s:0.3333

# SMOOTH_SANDSTONE_SLAB - possible-recipe-loop-review
# current=0.2 suggested=0.15 diff=-0.05 (25%)
# /buy impact: current=20, suggested=15
# recipe: shaped minecraft:smooth_sandstone_slab => 6 for 0.9 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_sandstone_slab -s:0.15

# LEVER - possible-recipe-loop-review
# current=0.35 suggested=0.3 diff=-0.05 (14.2857%)
# /buy impact: current=35, suggested=30
# recipe: shaped minecraft:lever => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lever -s:0.3

# MAGENTA_DYE - possible-recipe-loop-review
# current=0.14 suggested=0.1 diff=-0.04 (28.5714%)
# /buy impact: current=14, suggested=10
# recipe: shapeless minecraft:magenta_dye_from_lilac => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_dye -s:0.1

# SMOOTH_RED_SANDSTONE - possible-recipe-loop-review
# current=0.2 suggested=0.16 diff=-0.04 (20%)
# /buy impact: current=20, suggested=16
# recipe: furnace minecraft:smooth_red_sandstone => 1 for 0.16 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth smooth_red_sandstone -s:0.16

# WHITE_CARPET - possible-recipe-loop-review
# current=0.3 suggested=0.2667 diff=-0.0333 (11.1%)
# /buy impact: current=30, suggested=26.67
# recipe: shaped minecraft:white_carpet => 3 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_carpet -s:0.2667

# GLASS_PANE - possible-recipe-loop-review
# current=0.2 suggested=0.18 diff=-0.02 (10%)
# /buy impact: current=20, suggested=18
# recipe: shaped minecraft:glass_pane => 16 for 2.88 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth glass_pane -s:0.18

# SNOW_BLOCK - possible-recipe-loop-review
# current=0.05 suggested=0.04 diff=-0.01 (20%)
# /buy impact: current=5, suggested=4
# recipe: shaped minecraft:snow_block => 1 for 0.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth snow_block -s:0.04

# DRIED_GHAST - under-recipe-review
# current=500 suggested=1320.1 diff=+820.1 (164.02%)
# /buy impact: current=50000, suggested=132010
# recipe: shaped minecraft:dried_ghast => 1 for 1320.1 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dried_ghast -s:1320.1

# SKULL_BANNER_PATTERN - under-recipe-review
# current=612.28 suggested=1200.2 diff=+587.92 (96.0214%)
# /buy impact: current=61228, suggested=120020
# recipe: shapeless minecraft:skull_banner_pattern => 1 for 1200.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth skull_banner_pattern -s:1200.2

# NETHERITE_HORSE_ARMOR - under-recipe-review
# current=100 suggested=585 diff=+485 (485%)
# /buy impact: current=10000, suggested=58500
# recipe: smithing-transform minecraft:netherite_horse_armor_smithing => 1 for 585 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_horse_armor -s:585

# NETHERITE_NAUTILUS_ARMOR - under-recipe-review
# current=500 suggested=860 diff=+360 (72%)
# /buy impact: current=50000, suggested=86000
# recipe: smithing-transform minecraft:netherite_nautilus_armor_smithing => 1 for 860 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_nautilus_armor -s:860

# NETHERITE_SPEAR - under-recipe-review
# current=333.03 suggested=576.5 diff=+243.47 (73.1075%)
# /buy impact: current=33303, suggested=57650
# recipe: smithing-transform minecraft:netherite_spear_smithing => 1 for 576.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_spear -s:576.5

# CREEPER_BANNER_PATTERN - under-recipe-review
# current=153.28 suggested=300.2 diff=+146.92 (95.8507%)
# /buy impact: current=15328, suggested=30020
# recipe: shapeless minecraft:creeper_banner_pattern => 1 for 300.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth creeper_banner_pattern -s:300.2

# BOLT_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=375 diff=+125 (50%)
# /buy impact: current=25000, suggested=37500
# recipe: shaped minecraft:bolt_armor_trim_smithing_template => 2 for 750 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bolt_armor_trim_smithing_template -s:375

# NETHERITE_SHOVEL - under-recipe-review
# current=469.2 suggested=576.5 diff=+107.3 (22.8687%)
# /buy impact: current=46920, suggested=57650
# recipe: smithing-transform minecraft:netherite_shovel_smithing => 1 for 576.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_shovel -s:576.5

# FLOW_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=355 diff=+105 (42%)
# /buy impact: current=25000, suggested=35500
# recipe: shaped minecraft:flow_armor_trim_smithing_template => 2 for 710 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth flow_armor_trim_smithing_template -s:355

# SPIRE_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=353.11 diff=+103.11 (41.244%)
# /buy impact: current=25000, suggested=35311
# recipe: shaped minecraft:spire_armor_trim_smithing_template => 2 for 706.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spire_armor_trim_smithing_template -s:353.11

# WILD_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=353.11 diff=+103.11 (41.244%)
# /buy impact: current=25000, suggested=35311
# recipe: shaped minecraft:wild_armor_trim_smithing_template => 2 for 706.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth wild_armor_trim_smithing_template -s:353.11

# TIDE_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.9 diff=+102.9 (41.16%)
# /buy impact: current=25000, suggested=35290
# recipe: shaped minecraft:tide_armor_trim_smithing_template => 2 for 705.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth tide_armor_trim_smithing_template -s:352.9

# EYE_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.725 diff=+102.725 (41.09%)
# /buy impact: current=25000, suggested=35272.5
# recipe: shaped minecraft:eye_armor_trim_smithing_template => 2 for 705.45 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth eye_armor_trim_smithing_template -s:352.725

# SNOUT_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.7 diff=+102.7 (41.08%)
# /buy impact: current=25000, suggested=35270
# recipe: shaped minecraft:snout_armor_trim_smithing_template => 2 for 705.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth snout_armor_trim_smithing_template -s:352.7

# HOST_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:host_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth host_armor_trim_smithing_template -s:352.65

# RAISER_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:raiser_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth raiser_armor_trim_smithing_template -s:352.65

# SHAPER_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:shaper_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth shaper_armor_trim_smithing_template -s:352.65

# SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:silence_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth silence_armor_trim_smithing_template -s:352.65

# WARD_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:ward_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth ward_armor_trim_smithing_template -s:352.65

# WAYFINDER_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.65 diff=+102.65 (41.06%)
# /buy impact: current=25000, suggested=35265
# recipe: shaped minecraft:wayfinder_armor_trim_smithing_template => 2 for 705.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth wayfinder_armor_trim_smithing_template -s:352.65

# NETHERITE_UPGRADE_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.61 diff=+102.61 (41.044%)
# /buy impact: current=25000, suggested=35261
# recipe: shaped minecraft:netherite_upgrade_smithing_template => 2 for 705.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_upgrade_smithing_template -s:352.61

# RIB_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.61 diff=+102.61 (41.044%)
# /buy impact: current=25000, suggested=35261
# recipe: shaped minecraft:rib_armor_trim_smithing_template => 2 for 705.22 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth rib_armor_trim_smithing_template -s:352.61

# COAST_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.6 diff=+102.6 (41.04%)
# /buy impact: current=25000, suggested=35260
# recipe: shaped minecraft:coast_armor_trim_smithing_template => 2 for 705.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth coast_armor_trim_smithing_template -s:352.6

# DUNE_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.6 diff=+102.6 (41.04%)
# /buy impact: current=25000, suggested=35260
# recipe: shaped minecraft:dune_armor_trim_smithing_template => 2 for 705.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dune_armor_trim_smithing_template -s:352.6

# SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.6 diff=+102.6 (41.04%)
# /buy impact: current=25000, suggested=35260
# recipe: shaped minecraft:sentry_armor_trim_smithing_template => 2 for 705.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sentry_armor_trim_smithing_template -s:352.6

# VEX_ARMOR_TRIM_SMITHING_TEMPLATE - under-recipe-review
# current=250 suggested=352.6 diff=+102.6 (41.04%)
# /buy impact: current=25000, suggested=35260
# recipe: shaped minecraft:vex_armor_trim_smithing_template => 2 for 705.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth vex_armor_trim_smithing_template -s:352.6

# NETHERITE_INGOT - under-recipe-review
# current=260 suggested=325 diff=+65 (25%)
# /buy impact: current=26000, suggested=32500
# recipe: shapeless minecraft:netherite_ingot => 1 for 325 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth netherite_ingot -s:325

# WAXED_COPPER_GOLEM_STATUE - under-recipe-review
# current=50 suggested=108 diff=+58 (116%)
# /buy impact: current=5000, suggested=10800
# recipe: shapeless minecraft:waxed_copper_golem_statue_from_honeycomb => 1 for 108 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_golem_statue -s:108

# WAXED_EXPOSED_COPPER_GOLEM_STATUE - under-recipe-review
# current=50 suggested=108 diff=+58 (116%)
# /buy impact: current=5000, suggested=10800
# recipe: shapeless minecraft:waxed_exposed_copper_golem_statue_from_honeycomb => 1 for 108 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_golem_statue -s:108

# WAXED_OXIDIZED_COPPER_GOLEM_STATUE - under-recipe-review
# current=50 suggested=108 diff=+58 (116%)
# /buy impact: current=5000, suggested=10800
# recipe: shapeless minecraft:waxed_oxidized_copper_golem_statue_from_honeycomb => 1 for 108 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_golem_statue -s:108

# WAXED_WEATHERED_COPPER_GOLEM_STATUE - under-recipe-review
# current=50 suggested=108 diff=+58 (116%)
# /buy impact: current=5000, suggested=10800
# recipe: shapeless minecraft:waxed_weathered_copper_golem_statue_from_honeycomb => 1 for 108 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_golem_statue -s:108

# WAXED_COPPER_BLOCK - under-recipe-review
# current=45 suggested=101.44 diff=+56.44 (125.4222%)
# /buy impact: current=4500, suggested=10144
# recipe: shapeless minecraft:waxed_copper_block_from_honeycomb => 1 for 101.44 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_block -s:101.44

# WAXED_EXPOSED_COPPER - under-recipe-review
# current=45 suggested=98 diff=+53 (117.7778%)
# /buy impact: current=4500, suggested=9800
# recipe: shapeless minecraft:waxed_exposed_copper_from_honeycomb => 1 for 98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper -s:98

# WAXED_OXIDIZED_COPPER - under-recipe-review
# current=45 suggested=98 diff=+53 (117.7778%)
# /buy impact: current=4500, suggested=9800
# recipe: shapeless minecraft:waxed_oxidized_copper_from_honeycomb => 1 for 98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper -s:98

# WAXED_WEATHERED_COPPER - under-recipe-review
# current=45 suggested=98 diff=+53 (117.7778%)
# /buy impact: current=4500, suggested=9800
# recipe: shapeless minecraft:waxed_weathered_copper_from_honeycomb => 1 for 98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper -s:98

# MOJANG_BANNER_PATTERN - under-recipe-review
# current=51.28 suggested=100.2 diff=+48.92 (95.3978%)
# /buy impact: current=5128, suggested=10020
# recipe: shapeless minecraft:mojang_banner_pattern => 1 for 100.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mojang_banner_pattern -s:100.2

# WAXED_COPPER_BULB - under-recipe-review
# current=34.5 suggested=79.64 diff=+45.14 (130.8406%)
# /buy impact: current=3450, suggested=7964
# recipe: shapeless minecraft:waxed_copper_bulb_from_honeycomb => 1 for 79.64 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_bulb -s:79.64

# WAXED_COPPER_CHEST - under-recipe-review
# current=35 suggested=78 diff=+43 (122.8571%)
# /buy impact: current=3500, suggested=7800
# recipe: shapeless minecraft:waxed_copper_chest_from_honeycomb => 1 for 78 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_chest -s:78

# WAXED_EXPOSED_COPPER_CHEST - under-recipe-review
# current=35 suggested=78 diff=+43 (122.8571%)
# /buy impact: current=3500, suggested=7800
# recipe: shapeless minecraft:waxed_exposed_copper_chest_from_honeycomb => 1 for 78 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_chest -s:78

# WAXED_OXIDIZED_COPPER_CHEST - under-recipe-review
# current=35 suggested=78 diff=+43 (122.8571%)
# /buy impact: current=3500, suggested=7800
# recipe: shapeless minecraft:waxed_oxidized_copper_chest_from_honeycomb => 1 for 78 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_chest -s:78

# WAXED_WEATHERED_COPPER_CHEST - under-recipe-review
# current=35 suggested=78 diff=+43 (122.8571%)
# /buy impact: current=3500, suggested=7800
# recipe: shapeless minecraft:waxed_weathered_copper_chest_from_honeycomb => 1 for 78 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_chest -s:78

# WAXED_EXPOSED_COPPER_BULB - under-recipe-review
# current=34.5 suggested=77 diff=+42.5 (123.1884%)
# /buy impact: current=3450, suggested=7700
# recipe: shapeless minecraft:waxed_exposed_copper_bulb_from_honeycomb => 1 for 77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_bulb -s:77

# WAXED_OXIDIZED_COPPER_BULB - under-recipe-review
# current=34.5 suggested=77 diff=+42.5 (123.1884%)
# /buy impact: current=3450, suggested=7700
# recipe: shapeless minecraft:waxed_oxidized_copper_bulb_from_honeycomb => 1 for 77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_bulb -s:77

# WAXED_WEATHERED_COPPER_BULB - under-recipe-review
# current=34.5 suggested=77 diff=+42.5 (123.1884%)
# /buy impact: current=3450, suggested=7700
# recipe: shapeless minecraft:waxed_weathered_copper_bulb_from_honeycomb => 1 for 77 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_bulb -s:77

# BLUE_ICE - under-recipe-review
# current=5 suggested=40 diff=+35 (700%)
# /buy impact: current=500, suggested=4000
# recipe: shapeless minecraft:blue_ice => 1 for 40 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_ice -s:40

# ENDER_CHEST - under-recipe-review
# current=20.99 suggested=50 diff=+29.01 (138.2087%)
# /buy impact: current=2099, suggested=5000
# recipe: shaped minecraft:ender_chest => 1 for 50 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth ender_chest -s:50

# HOPPER_MINECART - under-recipe-review
# current=29.64 suggested=57.54 diff=+27.9 (94.1296%)
# /buy impact: current=2964, suggested=5754
# recipe: shapeless minecraft:hopper_minecart => 1 for 57.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth hopper_minecart -s:57.54

# JUKEBOX - under-recipe-review
# current=40 suggested=66.6 diff=+26.6 (66.5%)
# /buy impact: current=4000, suggested=6660
# recipe: shaped minecraft:jukebox => 1 for 66.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jukebox -s:66.6

# WAXED_EXPOSED_COPPER_DOOR - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_exposed_copper_door_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_door -s:38

# WAXED_EXPOSED_LIGHTNING_ROD - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_exposed_lightning_rod_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_lightning_rod -s:38

# WAXED_LIGHTNING_ROD - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_lightning_rod_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_lightning_rod -s:38

# WAXED_OXIDIZED_COPPER_DOOR - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_oxidized_copper_door_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_door -s:38

# WAXED_OXIDIZED_LIGHTNING_ROD - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_oxidized_lightning_rod_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_lightning_rod -s:38

# WAXED_WEATHERED_COPPER_DOOR - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_weathered_copper_door_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_door -s:38

# WAXED_WEATHERED_LIGHTNING_ROD - under-recipe-review
# current=15 suggested=38 diff=+23 (153.3333%)
# /buy impact: current=1500, suggested=3800
# recipe: shapeless minecraft:waxed_weathered_lightning_rod_from_honeycomb => 1 for 38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_lightning_rod -s:38

# WAXED_OXIDIZED_COPPER_TRAPDOOR - under-recipe-review
# current=11 suggested=32 diff=+21 (190.9091%)
# /buy impact: current=1100, suggested=3200
# recipe: shapeless minecraft:waxed_oxidized_copper_trapdoor_from_honeycomb => 1 for 32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_trapdoor -s:32

# WAXED_EXPOSED_COPPER_TRAPDOOR - under-recipe-review
# current=12 suggested=32 diff=+20 (166.6667%)
# /buy impact: current=1200, suggested=3200
# recipe: shapeless minecraft:waxed_exposed_copper_trapdoor_from_honeycomb => 1 for 32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_trapdoor -s:32

# WAXED_WEATHERED_COPPER_TRAPDOOR - under-recipe-review
# current=12 suggested=32 diff=+20 (166.6667%)
# /buy impact: current=1200, suggested=3200
# recipe: shapeless minecraft:waxed_weathered_copper_trapdoor_from_honeycomb => 1 for 32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_trapdoor -s:32

# WAXED_COPPER_TRAPDOOR - under-recipe-review
# current=19.96 suggested=39.14 diff=+19.18 (96.0922%)
# /buy impact: current=1996, suggested=3914
# recipe: shapeless minecraft:waxed_copper_trapdoor_from_honeycomb => 1 for 39.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_trapdoor -s:39.14

# FILLED_MAP - under-recipe-review
# current=18.19 suggested=36.38 diff=+18.19 (100%)
# /buy impact: current=1819, suggested=3638
# recipe: transmute minecraft:map_cloning => 1 for 36.38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth filled_map -s:36.38

# FURNACE_MINECART - under-recipe-review
# current=16.27 suggested=31.92 diff=+15.65 (96.1893%)
# /buy impact: current=1627, suggested=3192
# recipe: shapeless minecraft:furnace_minecart => 1 for 31.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth furnace_minecart -s:31.92

# TNT_MINECART - under-recipe-review
# current=15.68 suggested=30.76 diff=+15.08 (96.1735%)
# /buy impact: current=1568, suggested=3076
# recipe: shapeless minecraft:tnt_minecart => 1 for 30.76 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth tnt_minecart -s:30.76

# CHEST_MINECART - under-recipe-review
# current=15.32 suggested=30.04 diff=+14.72 (96.0836%)
# /buy impact: current=1532, suggested=3004
# recipe: shapeless minecraft:chest_minecart => 1 for 30.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth chest_minecart -s:30.04

# WAXED_COPPER_DOOR - under-recipe-review
# current=14.66 suggested=28.76 diff=+14.1 (96.1801%)
# /buy impact: current=1466, suggested=2876
# recipe: shapeless minecraft:waxed_copper_door_from_honeycomb => 1 for 28.76 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_door -s:28.76

# WAXED_COPPER_LANTERN - under-recipe-review
# current=5 suggested=18 diff=+13 (260%)
# /buy impact: current=500, suggested=1800
# recipe: shapeless minecraft:waxed_copper_lantern_from_honeycomb => 1 for 18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_lantern -s:18

# WAXED_EXPOSED_COPPER_LANTERN - under-recipe-review
# current=5 suggested=18 diff=+13 (260%)
# /buy impact: current=500, suggested=1800
# recipe: shapeless minecraft:waxed_exposed_copper_lantern_from_honeycomb => 1 for 18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_lantern -s:18

# WAXED_OXIDIZED_COPPER_LANTERN - under-recipe-review
# current=5 suggested=18 diff=+13 (260%)
# /buy impact: current=500, suggested=1800
# recipe: shapeless minecraft:waxed_oxidized_copper_lantern_from_honeycomb => 1 for 18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_lantern -s:18

# WAXED_WEATHERED_COPPER_LANTERN - under-recipe-review
# current=5 suggested=18 diff=+13 (260%)
# /buy impact: current=500, suggested=1800
# recipe: shapeless minecraft:waxed_weathered_copper_lantern_from_honeycomb => 1 for 18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_lantern -s:18

# LEATHER - under-recipe-review
# current=0.24 suggested=13.2 diff=+12.96 (5400%)
# /buy impact: current=24, suggested=1320
# recipe: shaped minecraft:leather => 1 for 13.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth leather -s:13.2

# WAXED_COPPER_CHAIN - under-recipe-review
# current=3 suggested=14 diff=+11 (366.6667%)
# /buy impact: current=300, suggested=1400
# recipe: shapeless minecraft:waxed_copper_chain_from_honeycomb => 1 for 14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_chain -s:14

# WAXED_EXPOSED_COPPER_CHAIN - under-recipe-review
# current=3 suggested=14 diff=+11 (366.6667%)
# /buy impact: current=300, suggested=1400
# recipe: shapeless minecraft:waxed_exposed_copper_chain_from_honeycomb => 1 for 14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_chain -s:14

# WAXED_OXIDIZED_COPPER_CHAIN - under-recipe-review
# current=3 suggested=14 diff=+11 (366.6667%)
# /buy impact: current=300, suggested=1400
# recipe: shapeless minecraft:waxed_oxidized_copper_chain_from_honeycomb => 1 for 14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_chain -s:14

# WAXED_WEATHERED_COPPER_CHAIN - under-recipe-review
# current=3 suggested=14 diff=+11 (366.6667%)
# /buy impact: current=300, suggested=1400
# recipe: shapeless minecraft:waxed_weathered_copper_chain_from_honeycomb => 1 for 14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_chain -s:14

# PACKED_ICE - under-recipe-review
# current=4 suggested=14.3 diff=+10.3 (257.5%)
# /buy impact: current=400, suggested=1430
# recipe: shapeless minecraft:packed_ice => 1 for 14.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth packed_ice -s:14.3

# WAXED_COPPER_BARS - under-recipe-review
# current=1 suggested=10 diff=+9 (900%)
# /buy impact: current=100, suggested=1000
# recipe: shapeless minecraft:waxed_copper_bars_from_honeycomb => 1 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_copper_bars -s:10

# WAXED_EXPOSED_COPPER_BARS - under-recipe-review
# current=1 suggested=10 diff=+9 (900%)
# /buy impact: current=100, suggested=1000
# recipe: shapeless minecraft:waxed_exposed_copper_bars_from_honeycomb => 1 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_exposed_copper_bars -s:10

# WAXED_OXIDIZED_COPPER_BARS - under-recipe-review
# current=1 suggested=10 diff=+9 (900%)
# /buy impact: current=100, suggested=1000
# recipe: shapeless minecraft:waxed_oxidized_copper_bars_from_honeycomb => 1 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_oxidized_copper_bars -s:10

# WAXED_WEATHERED_COPPER_BARS - under-recipe-review
# current=1 suggested=10 diff=+9 (900%)
# /buy impact: current=100, suggested=1000
# recipe: shapeless minecraft:waxed_weathered_copper_bars_from_honeycomb => 1 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth waxed_weathered_copper_bars -s:10

# RECOVERY_COMPASS - under-recipe-review
# current=20 suggested=27.33 diff=+7.33 (36.65%)
# /buy impact: current=2000, suggested=2733
# recipe: shaped minecraft:recovery_compass => 1 for 27.33 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth recovery_compass -s:27.33

# COAL_BLOCK - under-recipe-review
# current=4.36 suggested=10.53 diff=+6.17 (141.5138%)
# /buy impact: current=436, suggested=1053
# recipe: shaped minecraft:coal_block => 1 for 10.53 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth coal_block -s:10.53

# COPPER_CHEST - under-recipe-review
# current=35 suggested=41 diff=+6 (17.1429%)
# /buy impact: current=3500, suggested=4100
# recipe: shaped minecraft:copper_chest => 1 for 41 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth copper_chest -s:41

# RAW_COPPER - under-recipe-review
# current=5 suggested=10.2 diff=+5.2 (104%)
# /buy impact: current=500, suggested=1020
# recipe: shapeless minecraft:raw_copper => 9 for 91.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth raw_copper -s:10.2

# CYAN_CANDLE - under-recipe-review
# current=4 suggested=8.62 diff=+4.62 (115.5%)
# /buy impact: current=400, suggested=862
# recipe: shapeless minecraft:cyan_candle => 1 for 8.62 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_candle -s:8.62

# GREEN_CANDLE - under-recipe-review
# current=4 suggested=8.5 diff=+4.5 (112.5%)
# /buy impact: current=400, suggested=850
# recipe: shapeless minecraft:green_candle => 1 for 8.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_candle -s:8.5

# LIME_CANDLE - under-recipe-review
# current=4 suggested=8.48 diff=+4.48 (112%)
# /buy impact: current=400, suggested=848
# recipe: shapeless minecraft:lime_candle => 1 for 8.48 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_candle -s:8.48

# WHITE_CANDLE - under-recipe-review
# current=4 suggested=8.44 diff=+4.44 (111%)
# /buy impact: current=400, suggested=844
# recipe: shapeless minecraft:white_candle => 1 for 8.44 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_candle -s:8.44

# COPPER_TRAPDOOR - under-recipe-review
# current=15.57 suggested=20 diff=+4.43 (28.4522%)
# /buy impact: current=1557, suggested=2000
# recipe: shaped minecraft:copper_trapdoor => 1 for 20 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth copper_trapdoor -s:20

# BROWN_CANDLE - under-recipe-review
# current=4 suggested=8.4 diff=+4.4 (110%)
# /buy impact: current=400, suggested=840
# recipe: shapeless minecraft:brown_candle => 1 for 8.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_candle -s:8.4

# RED_CANDLE - under-recipe-review
# current=4 suggested=8.4 diff=+4.4 (110%)
# /buy impact: current=400, suggested=840
# recipe: shapeless minecraft:red_candle => 1 for 8.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_candle -s:8.4

# LIGHT_GRAY_CANDLE - under-recipe-review
# current=4 suggested=8.38 diff=+4.38 (109.5%)
# /buy impact: current=400, suggested=838
# recipe: shapeless minecraft:light_gray_candle => 1 for 8.38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_candle -s:8.38

# ORANGE_CANDLE - under-recipe-review
# current=4 suggested=8.38 diff=+4.38 (109.5%)
# /buy impact: current=400, suggested=838
# recipe: shapeless minecraft:orange_candle => 1 for 8.38 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_candle -s:8.38

# GRAY_CANDLE - under-recipe-review
# current=4 suggested=8.34 diff=+4.34 (108.5%)
# /buy impact: current=400, suggested=834
# recipe: shapeless minecraft:gray_candle => 1 for 8.34 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_candle -s:8.34

# LIGHT_BLUE_CANDLE - under-recipe-review
# current=4 suggested=8.34 diff=+4.34 (108.5%)
# /buy impact: current=400, suggested=834
# recipe: shapeless minecraft:light_blue_candle => 1 for 8.34 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_candle -s:8.34

# YELLOW_CANDLE - under-recipe-review
# current=4 suggested=8.34 diff=+4.34 (108.5%)
# /buy impact: current=400, suggested=834
# recipe: shapeless minecraft:yellow_candle => 1 for 8.34 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_candle -s:8.34

# PURPLE_CANDLE - under-recipe-review
# current=4 suggested=8.32 diff=+4.32 (108%)
# /buy impact: current=400, suggested=832
# recipe: shapeless minecraft:purple_candle => 1 for 8.32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_candle -s:8.32

# MAGENTA_CANDLE - under-recipe-review
# current=4 suggested=8.28 diff=+4.28 (107%)
# /buy impact: current=400, suggested=828
# recipe: shapeless minecraft:magenta_candle => 1 for 8.28 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_candle -s:8.28

# BLACK_CANDLE - under-recipe-review
# current=4 suggested=8.24 diff=+4.24 (106%)
# /buy impact: current=400, suggested=824
# recipe: shapeless minecraft:black_candle => 1 for 8.24 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_candle -s:8.24

# BLUE_CANDLE - under-recipe-review
# current=4 suggested=8.24 diff=+4.24 (106%)
# /buy impact: current=400, suggested=824
# recipe: shapeless minecraft:blue_candle => 1 for 8.24 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_candle -s:8.24

# PINK_CANDLE - under-recipe-review
# current=4 suggested=8.18 diff=+4.18 (104.5%)
# /buy impact: current=400, suggested=818
# recipe: shapeless minecraft:pink_candle => 1 for 8.18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_candle -s:8.18

# COPPER_CHAIN - under-recipe-review
# current=3 suggested=6.14 diff=+3.14 (104.6667%)
# /buy impact: current=300, suggested=614
# recipe: shaped minecraft:copper_chain => 1 for 6.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth copper_chain -s:6.14

# FERMENTED_SPIDER_EYE - under-recipe-review
# current=4.18 suggested=7.28 diff=+3.1 (74.1627%)
# /buy impact: current=418, suggested=728
# recipe: shapeless minecraft:fermented_spider_eye => 1 for 7.28 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth fermented_spider_eye -s:7.28

# HONEYCOMB_BLOCK - under-recipe-review
# current=13 suggested=16 diff=+3 (23.0769%)
# /buy impact: current=1300, suggested=1600
# recipe: shaped minecraft:honeycomb_block => 1 for 16 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth honeycomb_block -s:16

# FLINT_AND_STEEL - under-recipe-review
# current=3.02 suggested=5.94 diff=+2.92 (96.6887%)
# /buy impact: current=302, suggested=594
# recipe: shapeless minecraft:flint_and_steel => 1 for 5.94 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth flint_and_steel -s:5.94

# RAW_IRON - under-recipe-review
# current=2.75 suggested=5.6089 diff=+2.8589 (103.96%)
# /buy impact: current=275, suggested=560.89
# recipe: shapeless minecraft:raw_iron => 9 for 50.48 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth raw_iron -s:5.6089

# HONEY_BOTTLE - under-recipe-review
# current=1.5 suggested=4.31 diff=+2.81 (187.3333%)
# /buy impact: current=150, suggested=431
# recipe: shapeless minecraft:honey_bottle => 4 for 17.24 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth honey_bottle -s:4.31

# RAW_GOLD - under-recipe-review
# current=2.6 suggested=5.3022 diff=+2.7022 (103.9308%)
# /buy impact: current=260, suggested=530.22
# recipe: shapeless minecraft:raw_gold => 9 for 47.72 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth raw_gold -s:5.3022

# RABBIT_STEW - under-recipe-review
# current=2 suggested=4.26 diff=+2.26 (113%)
# /buy impact: current=200, suggested=426
# recipe: shapeless minecraft:rabbit_stew_from_brown_mushroom => 1 for 4.26 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth rabbit_stew -s:4.26

# CHERRY_CHEST_BOAT - under-recipe-review
# current=2.31 suggested=4.54 diff=+2.23 (96.5368%)
# /buy impact: current=231, suggested=454
# recipe: shapeless minecraft:cherry_chest_boat => 1 for 4.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cherry_chest_boat -s:4.54

# MANGROVE_CHEST_BOAT - under-recipe-review
# current=2.31 suggested=4.54 diff=+2.23 (96.5368%)
# /buy impact: current=231, suggested=454
# recipe: shapeless minecraft:mangrove_chest_boat => 1 for 4.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mangrove_chest_boat -s:4.54

# PALE_OAK_CHEST_BOAT - under-recipe-review
# current=2.31 suggested=4.54 diff=+2.23 (96.5368%)
# /buy impact: current=231, suggested=454
# recipe: shapeless minecraft:pale_oak_chest_boat => 1 for 4.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pale_oak_chest_boat -s:4.54

# GLISTERING_MELON_SLICE - under-recipe-review
# current=0.4 suggested=2.6 diff=+2.2 (550%)
# /buy impact: current=40, suggested=260
# recipe: shaped minecraft:glistering_melon_slice => 1 for 2.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth glistering_melon_slice -s:2.6

# ACACIA_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:acacia_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth acacia_chest_boat -s:4.46

# BIRCH_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:birch_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth birch_chest_boat -s:4.46

# DARK_OAK_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:dark_oak_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_oak_chest_boat -s:4.46

# JUNGLE_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:jungle_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jungle_chest_boat -s:4.46

# OAK_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:oak_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_chest_boat -s:4.46

# SPRUCE_CHEST_BOAT - under-recipe-review
# current=2.27 suggested=4.46 diff=+2.19 (96.4758%)
# /buy impact: current=227, suggested=446
# recipe: shapeless minecraft:spruce_chest_boat => 1 for 4.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spruce_chest_boat -s:4.46

# FIELD_MASONED_BANNER_PATTERN - under-recipe-review
# current=2.85 suggested=5 diff=+2.15 (75.4386%)
# /buy impact: current=285, suggested=500
# recipe: shapeless minecraft:field_masoned_banner_pattern => 1 for 5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth field_masoned_banner_pattern -s:5

# TERRACOTTA - under-recipe-review
# current=0.3 suggested=2.42 diff=+2.12 (706.6667%)
# /buy impact: current=30, suggested=242
# recipe: furnace minecraft:terracotta => 1 for 2.42 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth terracotta -s:2.42

# TRAPPED_CHEST - under-recipe-review
# current=2 suggested=4.12 diff=+2.12 (106%)
# /buy impact: current=200, suggested=412
# recipe: shapeless minecraft:trapped_chest => 1 for 4.12 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth trapped_chest -s:4.12

# BAMBOO_CHEST_RAFT - under-recipe-review
# current=2.16 suggested=4.24 diff=+2.08 (96.2963%)
# /buy impact: current=216, suggested=424
# recipe: shapeless minecraft:bamboo_chest_raft => 1 for 4.24 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bamboo_chest_raft -s:4.24

# PUMPKIN_PIE - under-recipe-review
# current=3.33 suggested=5.2 diff=+1.87 (56.1562%)
# /buy impact: current=333, suggested=520
# recipe: shapeless minecraft:pumpkin_pie => 1 for 5.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pumpkin_pie -s:5.2

# MAGMA_CREAM - under-recipe-review
# current=0.9 suggested=2.5 diff=+1.6 (177.7778%)
# /buy impact: current=90, suggested=250
# recipe: shapeless minecraft:magma_cream => 1 for 2.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magma_cream -s:2.5

# SLIME_BALL - under-recipe-review
# current=1.1 suggested=2.42 diff=+1.32 (120%)
# /buy impact: current=110, suggested=242
# recipe: shapeless minecraft:slime_ball => 9 for 21.78 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth slime_ball -s:2.42

# WRITABLE_BOOK - under-recipe-review
# current=1.67 suggested=2.96 diff=+1.29 (77.2455%)
# /buy impact: current=167, suggested=296
# recipe: shapeless minecraft:writable_book => 1 for 2.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth writable_book -s:2.96

# WIND_CHARGE - under-recipe-review
# current=1.27 suggested=2.5 diff=+1.23 (96.8504%)
# /buy impact: current=127, suggested=250
# recipe: shapeless minecraft:wind_charge => 4 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth wind_charge -s:2.5

# GLOW_ITEM_FRAME - under-recipe-review
# current=1.46 suggested=2.68 diff=+1.22 (83.5616%)
# /buy impact: current=146, suggested=268
# recipe: shapeless minecraft:glow_item_frame => 1 for 2.68 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth glow_item_frame -s:2.68

# SOUL_LANTERN - under-recipe-review
# current=2.68 suggested=3.88 diff=+1.2 (44.7761%)
# /buy impact: current=268, suggested=388
# recipe: shaped minecraft:soul_lantern => 1 for 3.88 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth soul_lantern -s:3.88

# EMERALD - under-recipe-review
# current=1 suggested=2 diff=+1 (100%)
# /buy impact: current=100, suggested=200
# recipe: shapeless minecraft:emerald => 9 for 18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth emerald -s:2

# CYAN_BED - under-recipe-review
# current=2.04 suggested=3 diff=+0.96 (47.0588%)
# /buy impact: current=204, suggested=300
# recipe: shaped minecraft:cyan_bed => 1 for 3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_bed -s:3

# COPPER_BARS - under-recipe-review
# current=1 suggested=1.875 diff=+0.875 (87.5%)
# /buy impact: current=100, suggested=187.5
# recipe: shaped minecraft:copper_bars => 16 for 30 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth copper_bars -s:1.875

# ORANGE_BED - under-recipe-review
# current=1.91 suggested=2.7 diff=+0.79 (41.3613%)
# /buy impact: current=191, suggested=270
# recipe: shaped minecraft:orange_bed => 1 for 2.7 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_bed -s:2.7

# BORDURE_INDENTED_BANNER_PATTERN - under-recipe-review
# current=1.42 suggested=2.2 diff=+0.78 (54.9296%)
# /buy impact: current=142, suggested=220
# recipe: shapeless minecraft:bordure_indented_banner_pattern => 1 for 2.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bordure_indented_banner_pattern -s:2.2

# RED_BED - under-recipe-review
# current=1.92 suggested=2.7 diff=+0.78 (40.625%)
# /buy impact: current=192, suggested=270
# recipe: shaped minecraft:red_bed => 1 for 2.7 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_bed -s:2.7

# PISTON - under-recipe-review
# current=3.5 suggested=4.26 diff=+0.76 (21.7143%)
# /buy impact: current=350, suggested=426
# recipe: shaped minecraft:piston => 1 for 4.26 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth piston -s:4.26

# LIME_BED - under-recipe-review
# current=1.96 suggested=2.7 diff=+0.74 (37.7551%)
# /buy impact: current=196, suggested=270
# recipe: shaped minecraft:lime_bed => 1 for 2.7 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_bed -s:2.7

# MUDDY_MANGROVE_ROOTS - under-recipe-review
# current=0.71 suggested=1.4 diff=+0.69 (97.1831%)
# /buy impact: current=71, suggested=140
# recipe: shapeless minecraft:muddy_mangrove_roots => 1 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth muddy_mangrove_roots -s:1.4

# PACKED_MUD - under-recipe-review
# current=0.71 suggested=1.4 diff=+0.69 (97.1831%)
# /buy impact: current=71, suggested=140
# recipe: shapeless minecraft:packed_mud => 1 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth packed_mud -s:1.4

# GRANITE - under-recipe-review
# current=0.66 suggested=1.32 diff=+0.66 (100%)
# /buy impact: current=66, suggested=132
# recipe: shapeless minecraft:granite => 1 for 1.32 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth granite -s:1.32

# QUARTZ - under-recipe-review
# current=0.22 suggested=0.88 diff=+0.66 (300%)
# /buy impact: current=22, suggested=88
# recipe: blasting minecraft:quartz_from_blasting => 1 for 0.88 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth quartz -s:0.88

# GRAY_BED - under-recipe-review
# current=1.89 suggested=2.55 diff=+0.66 (34.9206%)
# /buy impact: current=189, suggested=255
# recipe: shaped minecraft:gray_bed => 1 for 2.55 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_bed -s:2.55

# MUSHROOM_STEW - under-recipe-review
# current=0.65 suggested=1.3 diff=+0.65 (100%)
# /buy impact: current=65, suggested=130
# recipe: shapeless minecraft:mushroom_stew => 1 for 1.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mushroom_stew -s:1.3

# CYAN_WOOL - under-recipe-review
# current=0.8 suggested=1.42 diff=+0.62 (77.5%)
# /buy impact: current=80, suggested=142
# recipe: shapeless minecraft:dye_cyan_wool => 1 for 1.42 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_wool -s:1.42

# GREEN_WOOL - under-recipe-review
# current=0.7 suggested=1.3 diff=+0.6 (85.7143%)
# /buy impact: current=70, suggested=130
# recipe: shapeless minecraft:dye_green_wool => 1 for 1.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_wool -s:1.3

# PINK_BED - under-recipe-review
# current=1.81 suggested=2.4 diff=+0.59 (32.5967%)
# /buy impact: current=181, suggested=240
# recipe: shaped minecraft:pink_bed => 1 for 2.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_bed -s:2.4

# LIME_WOOL - under-recipe-review
# current=0.7 suggested=1.28 diff=+0.58 (82.8571%)
# /buy impact: current=70, suggested=128
# recipe: shapeless minecraft:dye_lime_wool => 1 for 1.28 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_wool -s:1.28

# ACACIA_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.86 diff=+0.55 (177.4194%)
# /buy impact: current=31, suggested=86
# recipe: shaped minecraft:acacia_fence_gate => 1 for 0.86 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth acacia_fence_gate -s:0.86

# BIRCH_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.86 diff=+0.55 (177.4194%)
# /buy impact: current=31, suggested=86
# recipe: shaped minecraft:birch_fence_gate => 1 for 0.86 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth birch_fence_gate -s:0.86

# DARK_OAK_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.86 diff=+0.55 (177.4194%)
# /buy impact: current=31, suggested=86
# recipe: shaped minecraft:dark_oak_fence_gate => 1 for 0.86 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_oak_fence_gate -s:0.86

# JUNGLE_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.86 diff=+0.55 (177.4194%)
# /buy impact: current=31, suggested=86
# recipe: shaped minecraft:jungle_fence_gate => 1 for 0.86 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jungle_fence_gate -s:0.86

# PUMPKIN_SEEDS - under-recipe-review
# current=0.2 suggested=0.75 diff=+0.55 (275%)
# /buy impact: current=20, suggested=75
# recipe: shapeless minecraft:pumpkin_seeds => 4 for 3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pumpkin_seeds -s:0.75

# SPRUCE_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.86 diff=+0.55 (177.4194%)
# /buy impact: current=31, suggested=86
# recipe: shaped minecraft:spruce_fence_gate => 1 for 0.86 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spruce_fence_gate -s:0.86

# COPPER_NUGGET - under-recipe-review
# current=0.57 suggested=1.1111 diff=+0.5411 (94.9298%)
# /buy impact: current=57, suggested=111.11
# recipe: shapeless minecraft:copper_nugget => 9 for 10 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth copper_nugget -s:1.1111

# PURPLE_WOOL - under-recipe-review
# current=0.6 suggested=1.12 diff=+0.52 (86.6667%)
# /buy impact: current=60, suggested=112
# recipe: shapeless minecraft:dye_purple_wool => 1 for 1.12 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_wool -s:1.12

# PURPLE_BED - under-recipe-review
# current=1.88 suggested=2.4 diff=+0.52 (27.6596%)
# /buy impact: current=188, suggested=240
# recipe: shaped minecraft:purple_bed => 1 for 2.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_bed -s:2.4

# BROWN_WOOL - under-recipe-review
# current=0.7 suggested=1.2 diff=+0.5 (71.4286%)
# /buy impact: current=70, suggested=120
# recipe: shapeless minecraft:dye_brown_wool => 1 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_wool -s:1.2

# RED_WOOL - under-recipe-review
# current=0.7 suggested=1.2 diff=+0.5 (71.4286%)
# /buy impact: current=70, suggested=120
# recipe: shapeless minecraft:dye_red_wool => 1 for 1.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_wool -s:1.2

# OAK_FENCE_GATE - under-recipe-review
# current=0.31 suggested=0.8 diff=+0.49 (158.0645%)
# /buy impact: current=31, suggested=80
# recipe: shaped minecraft:oak_fence_gate => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_fence_gate -s:0.8

# GRAY_WOOL - under-recipe-review
# current=0.65 suggested=1.14 diff=+0.49 (75.3846%)
# /buy impact: current=65, suggested=114
# recipe: shapeless minecraft:dye_gray_wool => 1 for 1.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_wool -s:1.14

# LIGHT_BLUE_WOOL - under-recipe-review
# current=0.65 suggested=1.14 diff=+0.49 (75.3846%)
# /buy impact: current=65, suggested=114
# recipe: shapeless minecraft:dye_light_blue_wool => 1 for 1.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_wool -s:1.14

# YELLOW_WOOL - under-recipe-review
# current=0.65 suggested=1.14 diff=+0.49 (75.3846%)
# /buy impact: current=65, suggested=114
# recipe: shapeless minecraft:dye_yellow_wool => 1 for 1.14 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_wool -s:1.14

# MAGENTA_WOOL - under-recipe-review
# current=0.6 suggested=1.08 diff=+0.48 (80%)
# /buy impact: current=60, suggested=108
# recipe: shapeless minecraft:dye_magenta_wool => 1 for 1.08 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_wool -s:1.08

# LIGHT_GRAY_WOOL - under-recipe-review
# current=0.7 suggested=1.18 diff=+0.48 (68.5714%)
# /buy impact: current=70, suggested=118
# recipe: shapeless minecraft:dye_light_gray_wool => 1 for 1.18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_wool -s:1.18

# ORANGE_WOOL - under-recipe-review
# current=0.7 suggested=1.18 diff=+0.48 (68.5714%)
# /buy impact: current=70, suggested=118
# recipe: shapeless minecraft:dye_orange_wool => 1 for 1.18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_wool -s:1.18

# TRIPWIRE_HOOK - under-recipe-review
# current=1.06 suggested=1.525 diff=+0.465 (43.8679%)
# /buy impact: current=106, suggested=152.5
# recipe: shaped minecraft:tripwire_hook => 2 for 3.05 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth tripwire_hook -s:1.525

# BLACK_WOOL - under-recipe-review
# current=0.6 suggested=1.04 diff=+0.44 (73.3333%)
# /buy impact: current=60, suggested=104
# recipe: shapeless minecraft:dye_black_wool => 1 for 1.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_wool -s:1.04

# BLUE_WOOL - under-recipe-review
# current=0.6 suggested=1.04 diff=+0.44 (73.3333%)
# /buy impact: current=60, suggested=104
# recipe: shapeless minecraft:dye_blue_wool => 1 for 1.04 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_wool -s:1.04

# WHEAT - under-recipe-review
# current=0.4 suggested=0.8156 diff=+0.4156 (103.9%)
# /buy impact: current=40, suggested=81.56
# recipe: shapeless minecraft:wheat => 9 for 7.34 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth wheat -s:0.8156

# POLISHED_BLACKSTONE_BUTTON - under-recipe-review
# current=0.4 suggested=0.8 diff=+0.4 (100%)
# /buy impact: current=40, suggested=80
# recipe: shapeless minecraft:polished_blackstone_button => 1 for 0.8 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth polished_blackstone_button -s:0.8

# MOSSY_STONE_BRICKS - under-recipe-review
# current=2 suggested=2.4 diff=+0.4 (20%)
# /buy impact: current=200, suggested=240
# recipe: shapeless minecraft:mossy_stone_bricks_from_moss_block => 1 for 2.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mossy_stone_bricks -s:2.4

# PINK_WOOL - under-recipe-review
# current=0.6 suggested=0.98 diff=+0.38 (63.3333%)
# /buy impact: current=60, suggested=98
# recipe: shapeless minecraft:dye_pink_wool => 1 for 0.98 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_wool -s:0.98

# IRON_CHAIN - under-recipe-review
# current=3 suggested=3.37 diff=+0.37 (12.3333%)
# /buy impact: current=300, suggested=337
# recipe: shaped minecraft:iron_chain => 1 for 3.37 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth iron_chain -s:3.37

# BEETROOT_SOUP - under-recipe-review
# current=1.39 suggested=1.74 diff=+0.35 (25.1799%)
# /buy impact: current=139, suggested=174
# recipe: shapeless minecraft:beetroot_soup => 1 for 1.74 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth beetroot_soup -s:1.74

# STRIPPED_ACACIA_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_acacia_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_acacia_wood -s:1.3067

# STRIPPED_BIRCH_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_birch_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_birch_wood -s:1.3067

# STRIPPED_CHERRY_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_cherry_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_cherry_wood -s:1.3067

# STRIPPED_DARK_OAK_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_dark_oak_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_dark_oak_wood -s:1.3067

# STRIPPED_JUNGLE_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_jungle_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_jungle_wood -s:1.3067

# STRIPPED_OAK_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_oak_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_oak_wood -s:1.3067

# STRIPPED_SPRUCE_WOOD - under-recipe-review
# current=0.98 suggested=1.3067 diff=+0.3267 (33.3367%)
# /buy impact: current=98, suggested=130.67
# recipe: shaped minecraft:stripped_spruce_wood => 3 for 3.92 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth stripped_spruce_wood -s:1.3067

# ANDESITE - under-recipe-review
# current=0.33 suggested=0.64 diff=+0.31 (93.9394%)
# /buy impact: current=33, suggested=64
# recipe: shapeless minecraft:andesite => 2 for 1.28 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth andesite -s:0.64

# CYAN_BUNDLE - under-recipe-review
# current=0.34 suggested=0.65 diff=+0.31 (91.1765%)
# /buy impact: current=34, suggested=65
# recipe: transmute minecraft:cyan_bundle => 1 for 0.65 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_bundle -s:0.65

# IRON_NUGGET - under-recipe-review
# current=0.31 suggested=0.6111 diff=+0.3011 (97.129%)
# /buy impact: current=31, suggested=61.11
# recipe: shapeless minecraft:iron_nugget => 9 for 5.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth iron_nugget -s:0.6111

# CRIMSON_BUTTON - under-recipe-review
# current=0.3 suggested=0.6 diff=+0.3 (100%)
# /buy impact: current=30, suggested=60
# recipe: shapeless minecraft:crimson_button => 1 for 0.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth crimson_button -s:0.6

# GOLD_NUGGET - under-recipe-review
# current=0.3 suggested=0.6 diff=+0.3 (100%)
# /buy impact: current=30, suggested=60
# recipe: shapeless minecraft:gold_nugget => 9 for 5.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gold_nugget -s:0.6

# WARPED_BUTTON - under-recipe-review
# current=0.3 suggested=0.6 diff=+0.3 (100%)
# /buy impact: current=30, suggested=60
# recipe: shapeless minecraft:warped_button => 1 for 0.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth warped_button -s:0.6

# OAK_PLANKS - under-recipe-review
# current=0.2 suggested=0.49 diff=+0.29 (145%)
# /buy impact: current=20, suggested=49
# recipe: shapeless minecraft:oak_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_planks -s:0.49

# ACACIA_PLANKS - under-recipe-review
# current=0.23 suggested=0.49 diff=+0.26 (113.0435%)
# /buy impact: current=23, suggested=49
# recipe: shapeless minecraft:acacia_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth acacia_planks -s:0.49

# BIRCH_PLANKS - under-recipe-review
# current=0.23 suggested=0.49 diff=+0.26 (113.0435%)
# /buy impact: current=23, suggested=49
# recipe: shapeless minecraft:birch_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth birch_planks -s:0.49

# DARK_OAK_PLANKS - under-recipe-review
# current=0.23 suggested=0.49 diff=+0.26 (113.0435%)
# /buy impact: current=23, suggested=49
# recipe: shapeless minecraft:dark_oak_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_oak_planks -s:0.49

# JUNGLE_PLANKS - under-recipe-review
# current=0.23 suggested=0.49 diff=+0.26 (113.0435%)
# /buy impact: current=23, suggested=49
# recipe: shapeless minecraft:jungle_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jungle_planks -s:0.49

# SPRUCE_PLANKS - under-recipe-review
# current=0.23 suggested=0.49 diff=+0.26 (113.0435%)
# /buy impact: current=23, suggested=49
# recipe: shapeless minecraft:spruce_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spruce_planks -s:0.49

# RESIN_CLUMP - under-recipe-review
# current=0.25 suggested=0.5089 diff=+0.2589 (103.56%)
# /buy impact: current=25, suggested=50.89
# recipe: shapeless minecraft:resin_clump => 9 for 4.58 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth resin_clump -s:0.5089

# CRIMSON_PLANKS - under-recipe-review
# current=0.3 suggested=0.55 diff=+0.25 (83.3333%)
# /buy impact: current=30, suggested=55
# recipe: shapeless minecraft:crimson_planks => 4 for 2.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth crimson_planks -s:0.55

# WARPED_PLANKS - under-recipe-review
# current=0.3 suggested=0.55 diff=+0.25 (83.3333%)
# /buy impact: current=30, suggested=55
# recipe: shapeless minecraft:warped_planks => 4 for 2.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth warped_planks -s:0.55

# CHERRY_BUTTON - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: shapeless minecraft:cherry_button => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cherry_button -s:0.5

# GREEN_DYE - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: furnace minecraft:green_dye => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_dye -s:0.5

# MANGROVE_BUTTON - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: shapeless minecraft:mangrove_button => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mangrove_button -s:0.5

# MANGROVE_PLANKS - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: shapeless minecraft:mangrove_planks => 4 for 2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth mangrove_planks -s:0.5

# PALE_OAK_BUTTON - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: shapeless minecraft:pale_oak_button => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pale_oak_button -s:0.5

# PALE_OAK_PLANKS - under-recipe-review
# current=0.25 suggested=0.5 diff=+0.25 (100%)
# /buy impact: current=25, suggested=50
# recipe: shapeless minecraft:pale_oak_planks => 4 for 2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pale_oak_planks -s:0.5

# GREEN_BUNDLE - under-recipe-review
# current=0.34 suggested=0.59 diff=+0.25 (73.5294%)
# /buy impact: current=34, suggested=59
# recipe: transmute minecraft:green_bundle => 1 for 0.59 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_bundle -s:0.59

# CHERRY_PLANKS - under-recipe-review
# current=0.25 suggested=0.49 diff=+0.24 (96%)
# /buy impact: current=25, suggested=49
# recipe: shapeless minecraft:cherry_planks => 4 for 1.96 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cherry_planks -s:0.49

# LIME_BUNDLE - under-recipe-review
# current=0.34 suggested=0.58 diff=+0.24 (70.5882%)
# /buy impact: current=34, suggested=58
# recipe: transmute minecraft:lime_bundle => 1 for 0.58 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_bundle -s:0.58

# ACACIA_BUTTON - under-recipe-review
# current=0.23 suggested=0.46 diff=+0.23 (100%)
# /buy impact: current=23, suggested=46
# recipe: shapeless minecraft:acacia_button => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth acacia_button -s:0.46

# BAMBOO_PLANKS - under-recipe-review
# current=0.22 suggested=0.45 diff=+0.23 (104.5455%)
# /buy impact: current=22, suggested=45
# recipe: shapeless minecraft:bamboo_planks => 2 for 0.9 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bamboo_planks -s:0.45

# BIRCH_BUTTON - under-recipe-review
# current=0.23 suggested=0.46 diff=+0.23 (100%)
# /buy impact: current=23, suggested=46
# recipe: shapeless minecraft:birch_button => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth birch_button -s:0.46

# DARK_OAK_BUTTON - under-recipe-review
# current=0.23 suggested=0.46 diff=+0.23 (100%)
# /buy impact: current=23, suggested=46
# recipe: shapeless minecraft:dark_oak_button => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth dark_oak_button -s:0.46

# JUNGLE_BUTTON - under-recipe-review
# current=0.23 suggested=0.46 diff=+0.23 (100%)
# /buy impact: current=23, suggested=46
# recipe: shapeless minecraft:jungle_button => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth jungle_button -s:0.46

# SPRUCE_BUTTON - under-recipe-review
# current=0.23 suggested=0.46 diff=+0.23 (100%)
# /buy impact: current=23, suggested=46
# recipe: shapeless minecraft:spruce_button => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth spruce_button -s:0.46

# WHITE_BUNDLE - under-recipe-review
# current=0.34 suggested=0.56 diff=+0.22 (64.7059%)
# /buy impact: current=34, suggested=56
# recipe: transmute minecraft:white_bundle => 1 for 0.56 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_bundle -s:0.56

# BAMBOO_BUTTON - under-recipe-review
# current=0.22 suggested=0.44 diff=+0.22 (100%)
# /buy impact: current=22, suggested=44
# recipe: shapeless minecraft:bamboo_button => 1 for 0.44 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bamboo_button -s:0.44

# BROWN_BUNDLE - under-recipe-review
# current=0.34 suggested=0.54 diff=+0.2 (58.8235%)
# /buy impact: current=34, suggested=54
# recipe: transmute minecraft:brown_bundle => 1 for 0.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_bundle -s:0.54

# BROWN_DYE - under-recipe-review
# current=0.2 suggested=0.4 diff=+0.2 (100%)
# /buy impact: current=20, suggested=40
# recipe: shapeless minecraft:brown_dye => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_dye -s:0.4

# MELON_SEEDS - under-recipe-review
# current=0.2 suggested=0.4 diff=+0.2 (100%)
# /buy impact: current=20, suggested=40
# recipe: shapeless minecraft:melon_seeds => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth melon_seeds -s:0.4

# RED_BUNDLE - under-recipe-review
# current=0.34 suggested=0.54 diff=+0.2 (58.8235%)
# /buy impact: current=34, suggested=54
# recipe: transmute minecraft:red_bundle => 1 for 0.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_bundle -s:0.54

# MELON - under-recipe-review
# current=1.8 suggested=2 diff=+0.2 (11.1111%)
# /buy impact: current=180, suggested=200
# recipe: shapeless minecraft:melon => 1 for 2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth melon -s:2

# LIGHT_GRAY_BUNDLE - under-recipe-review
# current=0.34 suggested=0.53 diff=+0.19 (55.8824%)
# /buy impact: current=34, suggested=53
# recipe: transmute minecraft:light_gray_bundle => 1 for 0.53 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_bundle -s:0.53

# ORANGE_BUNDLE - under-recipe-review
# current=0.34 suggested=0.53 diff=+0.19 (55.8824%)
# /buy impact: current=34, suggested=53
# recipe: transmute minecraft:orange_bundle => 1 for 0.53 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_bundle -s:0.53

# ORANGE_DYE - under-recipe-review
# current=0.19 suggested=0.37 diff=+0.18 (94.7368%)
# /buy impact: current=19, suggested=37
# recipe: shapeless minecraft:orange_dye_from_red_yellow => 2 for 0.74 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_dye -s:0.37

# LIGHT_BLUE_DYE - under-recipe-review
# current=0.17 suggested=0.34 diff=+0.17 (100%)
# /buy impact: current=17, suggested=34
# recipe: shapeless minecraft:light_blue_dye_from_blue_white_dye => 2 for 0.68 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_dye -s:0.34

# OAK_BUTTON - under-recipe-review
# current=0.23 suggested=0.4 diff=+0.17 (73.913%)
# /buy impact: current=23, suggested=40
# recipe: shapeless minecraft:oak_button => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth oak_button -s:0.4

# GRAY_BUNDLE - under-recipe-review
# current=0.34 suggested=0.51 diff=+0.17 (50%)
# /buy impact: current=34, suggested=51
# recipe: transmute minecraft:gray_bundle => 1 for 0.51 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_bundle -s:0.51

# LIGHT_BLUE_BUNDLE - under-recipe-review
# current=0.34 suggested=0.51 diff=+0.17 (50%)
# /buy impact: current=34, suggested=51
# recipe: transmute minecraft:light_blue_bundle => 1 for 0.51 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_blue_bundle -s:0.51

# YELLOW_BUNDLE - under-recipe-review
# current=0.34 suggested=0.51 diff=+0.17 (50%)
# /buy impact: current=34, suggested=51
# recipe: transmute minecraft:yellow_bundle => 1 for 0.51 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth yellow_bundle -s:0.51

# TORCH - under-recipe-review
# current=0.15 suggested=0.3175 diff=+0.1675 (111.6667%)
# /buy impact: current=15, suggested=31.75
# recipe: shaped minecraft:torch => 4 for 1.27 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth torch -s:0.3175

# PURPLE_DYE - under-recipe-review
# current=0.16 suggested=0.32 diff=+0.16 (100%)
# /buy impact: current=16, suggested=32
# recipe: shapeless minecraft:purple_dye => 2 for 0.64 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_dye -s:0.32

# PURPLE_BUNDLE - under-recipe-review
# current=0.34 suggested=0.5 diff=+0.16 (47.0588%)
# /buy impact: current=34, suggested=50
# recipe: transmute minecraft:purple_bundle => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth purple_bundle -s:0.5

# SANDSTONE_STAIRS - under-recipe-review
# current=0.05 suggested=0.2 diff=+0.15 (300%)
# /buy impact: current=5, suggested=20
# recipe: stonecutting minecraft:sandstone_stairs_from_sandstone_stonecutting => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sandstone_stairs -s:0.2

# MAGENTA_BUNDLE - under-recipe-review
# current=0.34 suggested=0.48 diff=+0.14 (41.1765%)
# /buy impact: current=34, suggested=48
# recipe: transmute minecraft:magenta_bundle => 1 for 0.48 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth magenta_bundle -s:0.48

# CYAN_CARPET - under-recipe-review
# current=0.4 suggested=0.5333 diff=+0.1333 (33.325%)
# /buy impact: current=40, suggested=53.33
# recipe: shaped minecraft:cyan_carpet => 3 for 1.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_carpet -s:0.5333

# REDSTONE - under-recipe-review
# current=0.11 suggested=0.2422 diff=+0.1322 (120.1818%)
# /buy impact: current=11, suggested=24.22
# recipe: shapeless minecraft:redstone => 9 for 2.18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth redstone -s:0.2422

# WHITE_TERRACOTTA - under-recipe-review
# current=0.2 suggested=0.3275 diff=+0.1275 (63.75%)
# /buy impact: current=20, suggested=32.75
# recipe: shaped minecraft:white_terracotta => 8 for 2.62 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_terracotta -s:0.3275

# LAPIS_LAZULI - under-recipe-review
# current=0.12 suggested=0.2422 diff=+0.1222 (101.8333%)
# /buy impact: current=12, suggested=24.22
# recipe: shapeless minecraft:lapis_lazuli => 9 for 2.18 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lapis_lazuli -s:0.2422

# BLACK_BUNDLE - under-recipe-review
# current=0.34 suggested=0.46 diff=+0.12 (35.2941%)
# /buy impact: current=34, suggested=46
# recipe: transmute minecraft:black_bundle => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_bundle -s:0.46

# BLUE_BUNDLE - under-recipe-review
# current=0.34 suggested=0.46 diff=+0.12 (35.2941%)
# /buy impact: current=34, suggested=46
# recipe: transmute minecraft:blue_bundle => 1 for 0.46 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_bundle -s:0.46

# BLUE_DYE - under-recipe-review
# current=0.12 suggested=0.24 diff=+0.12 (100%)
# /buy impact: current=12, suggested=24
# recipe: shapeless minecraft:blue_dye => 1 for 0.24 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blue_dye -s:0.24

# FLOWER_BANNER_PATTERN - under-recipe-review
# current=0.48 suggested=0.6 diff=+0.12 (25%)
# /buy impact: current=48, suggested=60
# recipe: shapeless minecraft:flower_banner_pattern => 1 for 0.6 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth flower_banner_pattern -s:0.6

# FIREWORK_ROCKET - under-recipe-review
# current=0.1 suggested=0.2133 diff=+0.1133 (113.3%)
# /buy impact: current=10, suggested=21.33
# recipe: shapeless minecraft:firework_rocket_simple => 3 for 0.64 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth firework_rocket -s:0.2133

# LIGHT_GRAY_DYE - under-recipe-review
# current=0.19 suggested=0.3 diff=+0.11 (57.8947%)
# /buy impact: current=19, suggested=30
# recipe: shapeless minecraft:light_gray_dye_from_black_white_dye => 3 for 0.9 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_dye -s:0.3

# COBBLED_DEEPSLATE - under-recipe-review
# current=0.3 suggested=0.4 diff=+0.1 (33.3333%)
# /buy impact: current=30, suggested=40
# recipe: stonecutting minecraft:cobbled_deepslate_from_deepslate_stonecutting => 1 for 0.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cobbled_deepslate -s:0.4

# SUGAR - under-recipe-review
# current=0.1 suggested=0.2 diff=+0.1 (100%)
# /buy impact: current=10, suggested=20
# recipe: shapeless minecraft:sugar_from_sugar_cane => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sugar -s:0.2

# COBBLESTONE - under-recipe-review
# current=0.2 suggested=0.3 diff=+0.1 (50%)
# /buy impact: current=20, suggested=30
# recipe: stonecutting minecraft:cobblestone_from_stone_stonecutting => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cobblestone -s:0.3

# PINK_BUNDLE - under-recipe-review
# current=0.34 suggested=0.43 diff=+0.09 (26.4706%)
# /buy impact: current=34, suggested=43
# recipe: transmute minecraft:pink_bundle => 1 for 0.43 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_bundle -s:0.43

# BONE_MEAL - under-recipe-review
# current=0.07 suggested=0.1422 diff=+0.0722 (103.1429%)
# /buy impact: current=7, suggested=14.22
# recipe: shapeless minecraft:bone_meal_from_bone_block => 9 for 1.28 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bone_meal -s:0.1422

# BLAZE_POWDER - under-recipe-review
# current=0.15 suggested=0.22 diff=+0.07 (46.6667%)
# /buy impact: current=15, suggested=22
# recipe: shapeless minecraft:blaze_powder => 2 for 0.44 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth blaze_powder -s:0.22

# SANDSTONE_WALL - under-recipe-review
# current=0.13 suggested=0.2 diff=+0.07 (53.8462%)
# /buy impact: current=13, suggested=20
# recipe: stonecutting minecraft:sandstone_wall_from_sandstone_stonecutting => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth sandstone_wall -s:0.2

# BROWN_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:brown_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth brown_carpet -s:0.4667

# GREEN_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:green_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_carpet -s:0.4667

# LIGHT_GRAY_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:light_gray_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth light_gray_carpet -s:0.4667

# LIME_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:lime_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_carpet -s:0.4667

# ORANGE_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:orange_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth orange_carpet -s:0.4667

# RED_CARPET - under-recipe-review
# current=0.4 suggested=0.4667 diff=+0.0667 (16.675%)
# /buy impact: current=40, suggested=46.67
# recipe: shaped minecraft:red_carpet => 3 for 1.4 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth red_carpet -s:0.4667

# LIME_DYE - under-recipe-review
# current=0.24 suggested=0.3 diff=+0.06 (25%)
# /buy impact: current=24, suggested=30
# recipe: furnace minecraft:lime_dye_from_smelting => 1 for 0.3 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_dye -s:0.3

# BAMBOO_BLOCK - under-recipe-review
# current=0.45 suggested=0.5 diff=+0.05 (11.1111%)
# /buy impact: current=45, suggested=50
# recipe: shapeless minecraft:bamboo_block => 1 for 0.5 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth bamboo_block -s:0.5

# BLACK_DYE - under-recipe-review
# current=0.12 suggested=0.16 diff=+0.04 (33.3333%)
# /buy impact: current=12, suggested=16
# recipe: shapeless minecraft:black_dye => 1 for 0.16 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth black_dye -s:0.16

# CYAN_TERRACOTTA - under-recipe-review
# current=0.3 suggested=0.3388 diff=+0.0388 (12.9333%)
# /buy impact: current=30, suggested=33.88
# recipe: shaped minecraft:cyan_terracotta => 8 for 2.71 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth cyan_terracotta -s:0.3388

# ARROW - under-recipe-review
# current=0.1 suggested=0.135 diff=+0.035 (35%)
# /buy impact: current=10, suggested=13.5
# recipe: shaped minecraft:arrow => 4 for 0.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth arrow -s:0.135

# GREEN_TERRACOTTA - under-recipe-review
# current=0.3 suggested=0.3313 diff=+0.0313 (10.4333%)
# /buy impact: current=30, suggested=33.13
# recipe: shaped minecraft:green_terracotta => 8 for 2.65 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth green_terracotta -s:0.3313

# LIME_TERRACOTTA - under-recipe-review
# current=0.3 suggested=0.33 diff=+0.03 (10%)
# /buy impact: current=30, suggested=33
# recipe: shaped minecraft:lime_terracotta => 8 for 2.64 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth lime_terracotta -s:0.33

# GRAY_DYE - under-recipe-review
# current=0.17 suggested=0.2 diff=+0.03 (17.6471%)
# /buy impact: current=17, suggested=20
# recipe: shapeless minecraft:gray_dye_from_closed_eyeblossom => 1 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth gray_dye -s:0.2

# WHITE_STAINED_GLASS_PANE - under-recipe-review
# current=0.2 suggested=0.2213 diff=+0.0213 (10.65%)
# /buy impact: current=20, suggested=22.13
# recipe: shaped minecraft:white_stained_glass_pane => 16 for 3.54 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth white_stained_glass_pane -s:0.2213

# PINK_DYE - under-recipe-review
# current=0.09 suggested=0.1 diff=+0.01 (11.1111%)
# /buy impact: current=9, suggested=10
# recipe: shapeless minecraft:pink_dye_from_peony => 2 for 0.2 total
# review: Needs human review; WorthHelper does not apply changes.
/cmi setworth pink_dye -s:0.1

```

## Top Suggestions

| Material | Status | Current | Suggested | Recipe | Review |
| --- | --- | ---: | ---: | --- | --- |
| NETHERITE_CHESTPLATE | possible-recipe-loop-review | 1897.2 | 1040.4 | smithing-transform minecraft:netherite_chestplate_smithing => 1 for 1040.4 total | Needs human review; WorthHelper does not apply changes. |
| NETHERITE_LEGGINGS | possible-recipe-loop-review | 1693.2 | 974.1 | smithing-transform minecraft:netherite_leggings_smithing => 1 for 974.1 total | Needs human review; WorthHelper does not apply changes. |
| NETHERITE_HELMET | possible-recipe-loop-review | 1285.2 | 841.5 | smithing-transform minecraft:netherite_helmet_smithing => 1 for 841.5 total | Needs human review; WorthHelper does not apply changes. |
| NETHERITE_BOOTS | possible-recipe-loop-review | 1081.2 | 775.2 | smithing-transform minecraft:netherite_boots_smithing => 1 for 775.2 total | Needs human review; WorthHelper does not apply changes. |
| LODESTONE | possible-recipe-loop-review | 281.52 | 18.75 | shaped minecraft:lodestone => 1 for 18.75 total | Needs human review; WorthHelper does not apply changes. |
| GOLDEN_APPLE | possible-recipe-loop-review | 251.1 | 23.36 | shaped minecraft:golden_apple => 1 for 23.36 total | Needs human review; WorthHelper does not apply changes. |
| NETHERITE_AXE | possible-recipe-loop-review | 877.2 | 709.1 | smithing-transform minecraft:netherite_axe_smithing => 1 for 709.1 total | Needs human review; WorthHelper does not apply changes. |
| NETHERITE_PICKAXE | possible-recipe-loop-review | 877.2 | 709.1 | smithing-transform minecraft:netherite_pickaxe_smithing => 1 for 709.1 total | Needs human review; WorthHelper does not apply changes. |
| CAKE | possible-recipe-loop-review | 150 | 32.4 | shaped minecraft:cake => 1 for 32.4 total | Needs human review; WorthHelper does not apply changes. |
| CRAFTER | possible-recipe-loop-review | 130.44 | 16.64 | shaped minecraft:crafter => 1 for 16.64 total | Needs human review; WorthHelper does not apply changes. |
| SPYGLASS | possible-recipe-loop-review | 83.61 | 10.4 | shaped minecraft:spyglass => 1 for 10.4 total | Needs human review; WorthHelper does not apply changes. |
| END_CRYSTAL | possible-recipe-loop-review | 200 | 170.36 | shaped minecraft:end_crystal => 1 for 170.36 total | Needs human review; WorthHelper does not apply changes. |
| SPONGE | possible-recipe-loop-review | 50 | 35 | furnace minecraft:sponge => 1 for 35 total | Needs human review; WorthHelper does not apply changes. |
| MAP | possible-recipe-loop-review | 18.19 | 12.13 | shaped minecraft:map => 1 for 12.13 total | Needs human review; WorthHelper does not apply changes. |
| WAXED_CUT_COPPER | possible-recipe-loop-review | 16.22 | 11.25 | stonecutting minecraft:waxed_cut_copper_from_waxed_copper_block_stonecutting => 4 for 45 total | Needs human review; WorthHelper does not apply changes. |
| SUSPICIOUS_STEW | possible-recipe-loop-review | 6 | 1.5 | shapeless minecraft:suspicious_stew_from_closed_eyeblossom => 1 for 1.5 total | Needs human review; WorthHelper does not apply changes. |
| GOLD_BLOCK | possible-recipe-loop-review | 28.31 | 24.3 | shaped minecraft:gold_block => 1 for 24.3 total | Needs human review; WorthHelper does not apply changes. |
| BRICK_STAIRS | possible-recipe-loop-review | 5.59 | 2.4 | stonecutting minecraft:brick_stairs_from_bricks_stonecutting => 1 for 2.4 total | Needs human review; WorthHelper does not apply changes. |
| END_ROD | possible-recipe-loop-review | 3 | 0.13 | shaped minecraft:end_rod => 4 for 0.52 total | Needs human review; WorthHelper does not apply changes. |
| NETHER_BRICK_FENCE | possible-recipe-loop-review | 2.95 | 0.9 | shaped minecraft:nether_brick_fence => 6 for 5.4 total | Needs human review; WorthHelper does not apply changes. |
| WAXED_CUT_COPPER_STAIRS | possible-recipe-loop-review | 13.19 | 11.25 | stonecutting minecraft:waxed_cut_copper_stairs_from_waxed_copper_block_stonecutting => 4 for 45 total | Needs human review; WorthHelper does not apply changes. |
| GOLD_INGOT | possible-recipe-loop-review | 2.7 | 1 | blasting minecraft:gold_ingot_from_blasting_nether_gold_ore => 1 for 1 total | Needs human review; WorthHelper does not apply changes. |
| CHISELED_STONE_BRICKS | possible-recipe-loop-review | 2 | 0.3 | stonecutting minecraft:chiseled_stone_bricks_from_stone_stonecutting => 1 for 0.3 total | Needs human review; WorthHelper does not apply changes. |
| END_STONE_BRICK_SLAB | possible-recipe-loop-review | 1.83 | 0.225 | stonecutting minecraft:end_stone_brick_slab_from_end_stone_stonecutting => 2 for 0.45 total | Needs human review; WorthHelper does not apply changes. |
| REPEATER | possible-recipe-loop-review | 2.88 | 1.47 | shaped minecraft:repeater => 1 for 1.47 total | Needs human review; WorthHelper does not apply changes. |
| END_STONE_BRICK_STAIRS | possible-recipe-loop-review | 1.83 | 0.45 | stonecutting minecraft:end_stone_brick_stairs_from_end_stone_stonecutting => 1 for 0.45 total | Needs human review; WorthHelper does not apply changes. |
| END_STONE_BRICKS | possible-recipe-loop-review | 1.8 | 0.45 | shaped minecraft:end_stone_bricks => 4 for 1.8 total | Needs human review; WorthHelper does not apply changes. |
| END_STONE_BRICK_WALL | possible-recipe-loop-review | 1.8 | 0.45 | stonecutting minecraft:end_stone_brick_wall_from_end_stone_stonecutting => 1 for 0.45 total | Needs human review; WorthHelper does not apply changes. |
| BRICK_SLAB | possible-recipe-loop-review | 2.44 | 1.2 | shaped minecraft:brick_slab => 6 for 7.2 total | Needs human review; WorthHelper does not apply changes. |
| CRACKED_STONE_BRICKS | possible-recipe-loop-review | 2 | 0.9 | furnace minecraft:cracked_stone_bricks => 1 for 0.9 total | Needs human review; WorthHelper does not apply changes. |
| SOUL_TORCH | possible-recipe-loop-review | 1.4 | 0.3425 | shaped minecraft:soul_torch => 4 for 1.37 total | Needs human review; WorthHelper does not apply changes. |
| MOSSY_STONE_BRICK_SLAB | possible-recipe-loop-review | 2.04 | 1 | shaped minecraft:mossy_stone_brick_slab => 6 for 6 total | Needs human review; WorthHelper does not apply changes. |
| WAXED_CUT_COPPER_SLAB | possible-recipe-loop-review | 6.59 | 5.625 | stonecutting minecraft:waxed_cut_copper_slab_from_waxed_copper_block_stonecutting => 8 for 45 total | Needs human review; WorthHelper does not apply changes. |
| STONE_BRICK_STAIRS | possible-recipe-loop-review | 1.24 | 0.3 | stonecutting minecraft:stone_brick_stairs_from_stone_stonecutting => 1 for 0.3 total | Needs human review; WorthHelper does not apply changes. |
| PURPUR_BLOCK | possible-recipe-loop-review | 1.22 | 0.3 | shaped minecraft:purpur_block => 4 for 1.2 total | Needs human review; WorthHelper does not apply changes. |
| DARK_PRISMARINE_STAIRS | possible-recipe-loop-review | 2.6 | 1.7 | stonecutting minecraft:dark_prismarine_stairs_from_dark_prismarine_stonecutting => 1 for 1.7 total | Needs human review; WorthHelper does not apply changes. |
| PRISMARINE_BRICK_STAIRS | possible-recipe-loop-review | 2.7 | 1.8 | stonecutting minecraft:prismarine_brick_stairs_from_prismarine_bricks_stonecutting => 1 for 1.8 total | Needs human review; WorthHelper does not apply changes. |
| STONE_PRESSURE_PLATE | possible-recipe-loop-review | 1.5 | 0.6 | shaped minecraft:stone_pressure_plate => 1 for 0.6 total | Needs human review; WorthHelper does not apply changes. |
| LIGHT_WEIGHTED_PRESSURE_PLATE | possible-recipe-loop-review | 6.29 | 5.4 | shaped minecraft:light_weighted_pressure_plate => 1 for 5.4 total | Needs human review; WorthHelper does not apply changes. |
| PRISMARINE_BRICKS | possible-recipe-loop-review | 1.8 | 1 | shapeless minecraft:prismarine_bricks => 1 for 1 total | Needs human review; WorthHelper does not apply changes. |
| DARK_PRISMARINE | possible-recipe-loop-review | 1.7 | 0.92 | shaped minecraft:dark_prismarine => 1 for 0.92 total | Needs human review; WorthHelper does not apply changes. |
| MOSSY_COBBLESTONE_SLAB | possible-recipe-loop-review | 1.24 | 0.61 | shaped minecraft:mossy_cobblestone_slab => 6 for 3.66 total | Needs human review; WorthHelper does not apply changes. |
| PURPUR_SLAB | possible-recipe-loop-review | 1.24 | 0.61 | shaped minecraft:purpur_slab => 6 for 3.66 total | Needs human review; WorthHelper does not apply changes. |
| NETHER_BRICK_SLAB | possible-recipe-loop-review | 1.22 | 0.6 | shaped minecraft:nether_brick_slab => 6 for 3.6 total | Needs human review; WorthHelper does not apply changes. |
| STONE_BRICK_WALL | possible-recipe-loop-review | 0.91 | 0.3 | stonecutting minecraft:stone_brick_wall_from_stone_stonecutting => 1 for 0.3 total | Needs human review; WorthHelper does not apply changes. |
| ENDER_EYE | possible-recipe-loop-review | 2 | 1.4 | shapeless minecraft:ender_eye => 1 for 1.4 total | Needs human review; WorthHelper does not apply changes. |
| STONE_BRICKS | possible-recipe-loop-review | 0.9 | 0.3 | shaped minecraft:stone_bricks => 4 for 1.2 total | Needs human review; WorthHelper does not apply changes. |
| GOLDEN_CARROT | possible-recipe-loop-review | 3.35 | 2.8 | shaped minecraft:golden_carrot => 1 for 2.8 total | Needs human review; WorthHelper does not apply changes. |
| RED_NETHER_BRICK_SLAB | possible-recipe-loop-review | 1.06 | 0.52 | shaped minecraft:red_nether_brick_slab => 6 for 3.12 total | Needs human review; WorthHelper does not apply changes. |
| PINK_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1038 | shapeless minecraft:pink_concrete_powder => 8 for 0.83 total | Needs human review; WorthHelper does not apply changes. |
| BLACK_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1113 | shapeless minecraft:black_concrete_powder => 8 for 0.89 total | Needs human review; WorthHelper does not apply changes. |
| BLUE_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1113 | shapeless minecraft:blue_concrete_powder => 8 for 0.89 total | Needs human review; WorthHelper does not apply changes. |
| MAGENTA_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1163 | shapeless minecraft:magenta_concrete_powder => 8 for 0.93 total | Needs human review; WorthHelper does not apply changes. |
| BAKED_POTATO | possible-recipe-loop-review | 0.92 | 0.44 | campfire minecraft:baked_potato_from_campfire_cooking => 1 for 0.44 total | Needs human review; WorthHelper does not apply changes. |
| PURPLE_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1213 | shapeless minecraft:purple_concrete_powder => 8 for 0.97 total | Needs human review; WorthHelper does not apply changes. |
| GRAY_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1238 | shapeless minecraft:gray_concrete_powder => 8 for 0.99 total | Needs human review; WorthHelper does not apply changes. |
| LIGHT_BLUE_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1238 | shapeless minecraft:light_blue_concrete_powder => 8 for 0.99 total | Needs human review; WorthHelper does not apply changes. |
| YELLOW_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1238 | shapeless minecraft:yellow_concrete_powder => 8 for 0.99 total | Needs human review; WorthHelper does not apply changes. |
| LIGHT_GRAY_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1288 | shapeless minecraft:light_gray_concrete_powder => 8 for 1.03 total | Needs human review; WorthHelper does not apply changes. |
| ORANGE_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1288 | shapeless minecraft:orange_concrete_powder => 8 for 1.03 total | Needs human review; WorthHelper does not apply changes. |
| DISPENSER | possible-recipe-loop-review | 2.58 | 2.11 | shaped minecraft:dispenser => 1 for 2.11 total | Needs human review; WorthHelper does not apply changes. |
| BROWN_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1313 | shapeless minecraft:brown_concrete_powder => 8 for 1.05 total | Needs human review; WorthHelper does not apply changes. |
| RED_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1313 | shapeless minecraft:red_concrete_powder => 8 for 1.05 total | Needs human review; WorthHelper does not apply changes. |
| WHITE_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1362 | shapeless minecraft:white_concrete_powder => 8 for 1.09 total | Needs human review; WorthHelper does not apply changes. |
| LIME_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1412 | shapeless minecraft:lime_concrete_powder => 8 for 1.13 total | Needs human review; WorthHelper does not apply changes. |
| GREEN_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1438 | shapeless minecraft:green_concrete_powder => 8 for 1.15 total | Needs human review; WorthHelper does not apply changes. |
| GLASS | possible-recipe-loop-review | 0.48 | 0.03 | furnace minecraft:glass => 1 for 0.03 total | Needs human review; WorthHelper does not apply changes. |
| CYAN_CONCRETE_POWDER | possible-recipe-loop-review | 0.6 | 0.1588 | shapeless minecraft:cyan_concrete_powder => 8 for 1.27 total | Needs human review; WorthHelper does not apply changes. |
| CLAY | possible-recipe-loop-review | 2.42 | 2 | shaped minecraft:clay => 1 for 2 total | Needs human review; WorthHelper does not apply changes. |
| PRISMARINE | possible-recipe-loop-review | 0.8 | 0.4 | shaped minecraft:prismarine => 1 for 0.4 total | Needs human review; WorthHelper does not apply changes. |
| PRISMARINE_STAIRS | possible-recipe-loop-review | 1.2 | 0.8 | stonecutting minecraft:prismarine_stairs_from_prismarine_stonecutting => 1 for 0.8 total | Needs human review; WorthHelper does not apply changes. |
| QUARTZ_STAIRS | possible-recipe-loop-review | 1.2 | 0.8 | stonecutting minecraft:quartz_stairs_from_quartz_block_stonecutting => 1 for 0.8 total | Needs human review; WorthHelper does not apply changes. |
| SMOOTH_QUARTZ_STAIRS | possible-recipe-loop-review | 1.2 | 0.8 | stonecutting minecraft:smooth_quartz_stairs_from_smooth_quartz_stonecutting => 1 for 0.8 total | Needs human review; WorthHelper does not apply changes. |
| STONE_SLAB | possible-recipe-loop-review | 0.53 | 0.15 | shaped minecraft:stone_slab => 6 for 0.9 total | Needs human review; WorthHelper does not apply changes. |
| CARTOGRAPHY_TABLE | possible-recipe-loop-review | 1.38 | 1 | shaped minecraft:cartography_table => 1 for 1 total | Needs human review; WorthHelper does not apply changes. |
| LIGHT_GRAY_STAINED_GLASS_PANE | possible-recipe-loop-review | 0.6 | 0.2238 | shaped minecraft:light_gray_stained_glass_pane_from_glass_pane => 8 for 1.79 total | Needs human review; WorthHelper does not apply changes. |
| FIRE_CHARGE | possible-recipe-loop-review | 1.39 | 1.0267 | shapeless minecraft:fire_charge => 3 for 3.08 total | Needs human review; WorthHelper does not apply changes. |
| GRANITE_SLAB | possible-recipe-loop-review | 0.67 | 0.33 | shaped minecraft:granite_slab => 6 for 1.98 total | Needs human review; WorthHelper does not apply changes. |
| POLISHED_GRANITE_SLAB | possible-recipe-loop-review | 0.67 | 0.33 | shaped minecraft:polished_granite_slab => 6 for 1.98 total | Needs human review; WorthHelper does not apply changes. |
| JACK_O_LANTERN | possible-recipe-loop-review | 1.98 | 1.65 | shaped minecraft:jack_o_lantern => 1 for 1.65 total | Needs human review; WorthHelper does not apply changes. |
| BOOK | possible-recipe-loop-review | 1.18 | 0.88 | shapeless minecraft:book => 1 for 0.88 total | Needs human review; WorthHelper does not apply changes. |
| STONE_BRICK_SLAB | possible-recipe-loop-review | 0.4 | 0.15 | stonecutting minecraft:stone_brick_slab_from_stone_stonecutting => 2 for 0.3 total | Needs human review; WorthHelper does not apply changes. |
| DIORITE_SLAB | possible-recipe-loop-review | 0.44 | 0.22 | shaped minecraft:diorite_slab => 6 for 1.32 total | Needs human review; WorthHelper does not apply changes. |
| POLISHED_DIORITE_SLAB | possible-recipe-loop-review | 0.44 | 0.22 | shaped minecraft:polished_diorite_slab => 6 for 1.32 total | Needs human review; WorthHelper does not apply changes. |
| CHARCOAL | possible-recipe-loop-review | 1.2 | 0.98 | furnace minecraft:charcoal => 1 for 0.98 total | Needs human review; WorthHelper does not apply changes. |
| MOSSY_COBBLESTONE | possible-recipe-loop-review | 1.22 | 1 | shapeless minecraft:mossy_cobblestone_from_moss_block => 1 for 1 total | Needs human review; WorthHelper does not apply changes. |
| COAL | possible-recipe-loop-review | 1.17 | 0.9689 | shapeless minecraft:coal => 9 for 8.72 total | Needs human review; WorthHelper does not apply changes. |
| COOKED_BEEF | possible-recipe-loop-review | 0.4 | 0.2 | campfire minecraft:cooked_beef_from_campfire_cooking => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| COOKED_CHICKEN | possible-recipe-loop-review | 0.4 | 0.2 | campfire minecraft:cooked_chicken_from_campfire_cooking => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| COOKED_MUTTON | possible-recipe-loop-review | 0.4 | 0.2 | campfire minecraft:cooked_mutton_from_campfire_cooking => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| COOKED_PORKCHOP | possible-recipe-loop-review | 0.4 | 0.2 | campfire minecraft:cooked_porkchop_from_campfire_cooking => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| COOKED_RABBIT | possible-recipe-loop-review | 0.4 | 0.2 | campfire minecraft:cooked_rabbit_from_campfire_cooking => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| WHITE_GLAZED_TERRACOTTA | possible-recipe-loop-review | 0.4 | 0.2 | furnace minecraft:white_glazed_terracotta => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| ITEM_FRAME | possible-recipe-loop-review | 1.24 | 1.04 | shaped minecraft:item_frame => 1 for 1.04 total | Needs human review; WorthHelper does not apply changes. |
| CRAFTING_TABLE | possible-recipe-loop-review | 0.98 | 0.8 | shaped minecraft:crafting_table => 1 for 0.8 total | Needs human review; WorthHelper does not apply changes. |
| ANDESITE_SLAB | possible-recipe-loop-review | 0.33 | 0.165 | shaped minecraft:andesite_slab => 6 for 0.99 total | Needs human review; WorthHelper does not apply changes. |
| POLISHED_ANDESITE_SLAB | possible-recipe-loop-review | 0.33 | 0.165 | shaped minecraft:polished_andesite_slab => 6 for 0.99 total | Needs human review; WorthHelper does not apply changes. |
| COBBLESTONE_STAIRS | possible-recipe-loop-review | 0.36 | 0.2 | stonecutting minecraft:cobblestone_stairs_from_cobblestone_stonecutting => 1 for 0.2 total | Needs human review; WorthHelper does not apply changes. |
| STONE_BUTTON | possible-recipe-loop-review | 0.75 | 0.6 | shapeless minecraft:stone_button => 1 for 0.6 total | Needs human review; WorthHelper does not apply changes. |
| TNT | possible-recipe-loop-review | 1.36 | 1.22 | shaped minecraft:tnt => 1 for 1.22 total | Needs human review; WorthHelper does not apply changes. |

## Missing Worth Values

| Material | Status | Current | Suggested | Recipe | Review |
| --- | --- | ---: | ---: | --- | --- |
| SPAWNER | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| TEST_BLOCK | missing-no-recipe | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| TEST_INSTANCE_BLOCK | missing-no-recipe | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| TRIAL_SPAWNER | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| VAULT | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |

## Special Review Items

| Material | Status | Current | Suggested | Recipe | Review |
| --- | --- | ---: | ---: | --- | --- |
| SPAWNER | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| TRIAL_SPAWNER | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |
| VAULT | special-missing-review | missing | n/a | no Paper recipe | Needs human review; WorthHelper does not apply changes. |

## Worth Source Notes

- none

## Blacklist Snapshot

- Configured blacklist: [BARRIER, BEDROCK, CHAIN_COMMAND_BLOCK, COMMAND_BLOCK, COMMAND_BLOCK_MINECART, DEBUG_STICK, END_PORTAL_FRAME, JIGSAW, KNOWLEDGE_BOOK, LIGHT, LINGERING_POTION, OMINOUS_BOTTLE, PLAYER_HEAD, PLAYER_WALL_HEAD, POTION, REPEATING_COMMAND_BLOCK, SPLASH_POTION, STRUCTURE_BLOCK, STRUCTURE_VOID, TIPPED_ARROW]
- Spawn eggs blacklisted: true
