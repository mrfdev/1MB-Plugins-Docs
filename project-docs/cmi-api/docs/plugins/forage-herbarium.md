# Forage Herbarium

**Deployed in build 742, reviewed 12 October 2026, on Paper 26.3 STABLE 175.** The maintained beta includes the Herbarium and its expanded botanical gathering routes. Connected-client gameplay and authored reward acceptance remain open; automated and native checks do not sign off those tests or authorize live activation.

The Herbarium is your permanent personal plant-discovery journal. Gather an eligible botanical source once with its matching genuine Forage tool to discover that specimen. The first discovery records its date, world name and world UUID, and namespaced biome. Repeat harvests do not replace that first-find information. Camps, season changes and claiming a collection reward do not reset discoveries.

## Browse and discover

Open **Herbarium** from the Forage hub or use `/forage herbarium`. Browsing works away from a camp while Forage and the Herbarium are enabled, for an online, living player with `onembcmi.forage.use`. It shows your own journal only. The collection overview links to **All Specimens**; collection and specimen pages offer **Show All**, **Missing** and **Discovered**, pagination and Back. Entries explain matching tools, source aliases and habitat, with first-find details after discovery. Browsing never creates a camp visit or grants rewards.

Discovery requires a successful normal Forage gathering action. Cancelled or synthetic events, ordinary tools, a wrong tool, invalid or unusable tools, restricted worlds/areas, player-placed sources, unavailable placement tracking, exhausted chunks and reached reward caps do not grant a discovery. Buying, picking up, storing or turning in an item does not count. The existing growth rules still allow legitimate grown harvests. A pitcher crop must be fully mature; breaking an immature upper half does not qualify.

One specimen can have several block forms. Vine tips/bodies, kelp tips/bodies, open/closed eyeblossoms, short/tall seagrass, stripped/unstripped wood, matching small/huge mushroom caps and muddy/ordinary mangrove roots share their canonical entries. Tall-flower halves already share the same source material. Mature `PITCHER_CROP` identifies `PITCHER_PLANT`; manually replacing the decorative plant does not make it a natural harvest. A named inventory item or similar-looking plant cannot impersonate a source.

The catalogue is botanical. Stone, minerals, relics and creatures do not become plant specimens. Saplings, immature crop-only precursors and generic mushroom stems are not extra journal requirements. Collection themes such as **Pale Garden** and **Lush Caves** describe their plant lists; they do not impose an additional biome or world checklist. The first-find world and biome are information, not another reward requirement.

## Complete a collection and claim once

Each collection has an explicit fixed list. Discover every required specimen to complete it. A shared specimen can contribute to several themed collections, and some journal specimens have no collection reward. Requirements do not grow automatically when staff add a new source.

Collection rewards are one-time item-only CMI kits. There is no claim cost or expiry. To claim, open your own complete camp workstation, finish its Local Introduction, and remain eligible in Survival or Adventure mode. Preview the collection reward, then confirm. Full inventories and unavailable or invalid kits refuse before delivery; repeated and stale confirmations cannot create a second claim. Uncertain deliveries remain blocked for staff review. A kit name or successful command dispatch is not proof that a reward was delivered.

The shipped `herbarium.rewards.enabled` default is **false** until staff author and review the kits. Discovery and completion can still be recorded while claiming is off. CMI `Enabled: false` protects ordinary `/kit` access but does not prevent Forage from reading an item template through its audited delivery adapter. The owner has approved named-dirt placeholders for isolated beta delivery tests, with beta claiming deliberately enabled; the primary default remains false. Those tests do not approve placeholder content for live rewards.

## Staff configuration and restoration

The main `config.yml` uses `herbarium.enabled`, `herbarium.rewards.enabled`, `herbarium.collections.ids` and `herbarium.collections.<id>.{enabled,version,display-name,specimens,reward-kit}`. Requirements use canonical specimen IDs, not item-drop names or alias block forms. An enabled collection with no matching active gathering route is a configuration error. Restore its source or disable that collection; never silently reduce its requirements. Disabling or removing collection configuration prevents new registration of that configured definition; it does not delete a previously frozen definition or its discoveries, completion and claim history. Existing registered collections remain archived and can continue progression/claims under their frozen rules while the journal and reward service permit them.

Collection definitions are frozen after registration. Changing an existing ID's version, display name, requirements or kit is refused; create an explicit new collection ID for a new entitlement. Previously registered history and claims remain. Retain the item templates used by old outstanding entitlements.

Use `/forage admin herbarium <local-player|UUID>` for authorized read-only inspection; resolve player identities locally and keep the original UUID. Runtime state lives in `data/herbarium.yml` with the `data/herbarium.initialized` marker. Missing or corrupt state after initialization stops the journal rather than creating an empty replacement. Preserve both files, the original journal/transaction receipts and recovery item evidence together. Do not restore an older profile or delete the marker to reset a one-time claim. Review ambiguous external effects before retrying or acknowledging recovery. The existing [inventory/economy durability gate](forage-camp-technical.md#transactions-saving-and-crash-recovery) remains open; journal persistence alone does not prove that an external inventory provider committed an item to disk.

## Maintain this reference

The generated sections below use the same shipped source loader, botanical catalogue and settings as the feature. After changing source bindings, aliases or collection definitions, run `gradle :plugins:player-fun:forage:generateSourceDocumentation :plugins:player-fun:forage:generateTurnInDocumentation :plugins:player-fun:forage:generateHerbariumDocumentation` with the repository's JDK 25.0.4.1, then review the diffs and run the focused documentation tests. This is a development documentation step, not a distributable suite build.

**Source-tool correction (from build 755):** the generated specimen tool column below includes the exact-source Shears assignments. Older builds keep their previous tool requirements; use each entry on the running server for its actual settings. Collection requirements, specimen identities and recorded discoveries are unchanged.

<!-- BEGIN GENERATED FORAGE HERBARIUM -->

## Complete collection requirements

Generated from shipped definitions: **102 canonical specimens** and **12 fixed collections**. Staff can disable collections or sources; disabled sources are not alternative discovery routes. Collection names describe their theme, not a required biome. A specimen can contribute to more than one collection.

| Collection ID | Name | Version | Required specimens | CMI kit |
| --- | --- | --- | --- | --- |
| `flowers` | Flowers | 1 | 20 | `forage_herbarium_flowers` |
| `undergrowth` | Undergrowth | 1 | 12 | `forage_herbarium_undergrowth` |
| `mushrooms` | Mushrooms and Fungi | 1 | 5 | `forage_herbarium_mushrooms` |
| `canopy` | Canopy | 1 | 14 | `forage_herbarium_canopy` |
| `crops` | Farm Crops | 1 | 6 | `forage_herbarium_crops` |
| `field_fruit` | Field Fruit | 1 | 5 | `forage_herbarium_field_fruit` |
| `aquatic` | Aquatic Plants | 1 | 3 | `forage_herbarium_aquatic` |
| `lush_caves` | Lush Caves | 1 | 10 | `forage_herbarium_lush_caves` |
| `pale_garden` | Pale Garden | 1 | 6 | `forage_herbarium_pale_garden` |
| `nether_garden` | Nether Garden | 1 | 10 | `forage_herbarium_nether_garden` |
| `woodland` | Woodland Trees | 1 | 10 | `forage_herbarium_woodland` |
| `ancient_flowers` | Ancient Flowers | 1 | 2 | `forage_herbarium_ancient_flowers` |

### Flowers

- Dandelion (`DANDELION`).
- Poppy (`POPPY`).
- Blue Orchid (`BLUE_ORCHID`).
- Allium (`ALLIUM`).
- Azure Bluet (`AZURE_BLUET`).
- Red Tulip (`RED_TULIP`).
- Orange Tulip (`ORANGE_TULIP`).
- White Tulip (`WHITE_TULIP`).
- Pink Tulip (`PINK_TULIP`).
- Oxeye Daisy (`OXEYE_DAISY`).
- Cornflower (`CORNFLOWER`).
- Lily Of The Valley (`LILY_OF_THE_VALLEY`).
- Sunflower (`SUNFLOWER`).
- Lilac (`LILAC`).
- Rose Bush (`ROSE_BUSH`).
- Peony (`PEONY`).
- Wildflowers (`WILDFLOWERS`).
- Pink Petals (`PINK_PETALS`).
- Cactus Flower (`CACTUS_FLOWER`).
- Eyeblossom (`OPEN_EYEBLOSSOM`).

### Undergrowth

- Short Grass (`SHORT_GRASS`).
- Tall Grass (`TALL_GRASS`).
- Fern (`FERN`).
- Large Fern (`LARGE_FERN`).
- Dead Bush (`DEAD_BUSH`).
- Red Shrub (`RED_SHRUB`).
- Leaf Litter (`LEAF_LITTER`).
- Bush (`BUSH`).
- Firefly Bush (`FIREFLY_BUSH`).
- Short Dry Grass (`SHORT_DRY_GRASS`).
- Tall Dry Grass (`TALL_DRY_GRASS`).
- Vine (`VINE`).

### Mushrooms and Fungi

- Brown Mushroom (`BROWN_MUSHROOM`).
- Red Mushroom (`RED_MUSHROOM`).
- Shelf Mushroom (`SHELF_MUSHROOM`).
- Crimson Fungus (`CRIMSON_FUNGUS`).
- Warped Fungus (`WARPED_FUNGUS`).

### Canopy

- Oak Leaves (`OAK_LEAVES`).
- Spruce Leaves (`SPRUCE_LEAVES`).
- Birch Leaves (`BIRCH_LEAVES`).
- Jungle Leaves (`JUNGLE_LEAVES`).
- Acacia Leaves (`ACACIA_LEAVES`).
- Dark Oak Leaves (`DARK_OAK_LEAVES`).
- Mangrove Leaves (`MANGROVE_LEAVES`).
- Cherry Leaves (`CHERRY_LEAVES`).
- Pale Oak Leaves (`PALE_OAK_LEAVES`).
- Azalea Leaves (`AZALEA_LEAVES`).
- Flowering Azalea Leaves (`FLOWERING_AZALEA_LEAVES`).
- Red Poplar Leaves (`RED_POPLAR_LEAVES`).
- Orange Poplar Leaves (`ORANGE_POPLAR_LEAVES`).
- Yellow Poplar Leaves (`YELLOW_POPLAR_LEAVES`).

### Farm Crops

- Wheat (`WHEAT`).
- Carrots (`CARROTS`).
- Potatoes (`POTATOES`).
- Beetroots (`BEETROOTS`).
- Cocoa (`COCOA`).
- Sweet Berry Bush (`SWEET_BERRY_BUSH`).

### Field Fruit

- Pumpkin (`PUMPKIN`).
- Melon (`MELON`).
- Sugar Cane (`SUGAR_CANE`).
- Bamboo (`BAMBOO`).
- Cactus (`CACTUS`).

### Aquatic Plants

- Kelp (`KELP`).
- Lily Pad (`LILY_PAD`).
- Seagrass (`SEAGRASS`).

### Lush Caves

- Moss Block (`MOSS_BLOCK`).
- Moss Carpet (`MOSS_CARPET`).
- Azalea (`AZALEA`).
- Flowering Azalea (`FLOWERING_AZALEA`).
- Big Dripleaf (`BIG_DRIPLEAF`).
- Small Dripleaf (`SMALL_DRIPLEAF`).
- Glow Lichen (`GLOW_LICHEN`).
- Cave Vines (`CAVE_VINES`).
- Spore Blossom (`SPORE_BLOSSOM`).
- Hanging Roots (`HANGING_ROOTS`).

### Pale Garden

- Pale Moss Block (`PALE_MOSS_BLOCK`).
- Pale Moss Carpet (`PALE_MOSS_CARPET`).
- Pale Hanging Moss (`PALE_HANGING_MOSS`).
- Pale Oak Log (`PALE_OAK_LOG`).
- Pale Oak Leaves (`PALE_OAK_LEAVES`).
- Eyeblossom (`OPEN_EYEBLOSSOM`).

### Nether Garden

- Nether Wart (`NETHER_WART`).
- Crimson Fungus (`CRIMSON_FUNGUS`).
- Warped Fungus (`WARPED_FUNGUS`).
- Crimson Roots (`CRIMSON_ROOTS`).
- Warped Roots (`WARPED_ROOTS`).
- Nether Sprouts (`NETHER_SPROUTS`).
- Weeping Vines (`WEEPING_VINES`).
- Twisting Vines (`TWISTING_VINES`).
- Crimson Stem (`CRIMSON_STEM`).
- Warped Stem (`WARPED_STEM`).

### Woodland Trees

- Oak Log (`OAK_LOG`).
- Spruce Log (`SPRUCE_LOG`).
- Birch Log (`BIRCH_LOG`).
- Jungle Log (`JUNGLE_LOG`).
- Acacia Log (`ACACIA_LOG`).
- Dark Oak Log (`DARK_OAK_LOG`).
- Mangrove Log (`MANGROVE_LOG`).
- Cherry Log (`CHERRY_LOG`).
- Pale Oak Log (`PALE_OAK_LOG`).
- Poplar Log (`POPLAR_LOG`).

### Ancient Flowers

- Torchflower (`TORCHFLOWER`).
- Pitcher Plant (`PITCHER_PLANT`).

## Complete specimen sources

Each row is one permanent specimen. Any listed source alias can identify it after a successful Forage gathering action. Picking up the matching item does not count. These are the shipped tool routes, not a promise that a particular world's terrain contains every plant.

| Specimen | Canonical ID | Accepted source blocks | Matching tools | Habitat guidance |
| --- | --- | --- | --- | --- |
| Acacia Leaves | `ACACIA_LEAVES` | `ACACIA_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Acacia Log | `ACACIA_LOG` | `ACACIA_LOG`, `STRIPPED_ACACIA_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Allium | `ALLIUM` | `ALLIUM` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Azalea | `AZALEA` | `AZALEA` | Forage Trowel | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Azalea Leaves | `AZALEA_LEAVES` | `AZALEA_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Azure Bluet | `AZURE_BLUET` | `AZURE_BLUET` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Bamboo | `BAMBOO` | `BAMBOO` | Forage Axe | Harvest eligible field growth; newly grown cane and bamboo differ from a placed base. |
| Beetroots | `BEETROOTS` | `BEETROOTS` | Forage Sickle | Harvest mature beetroot plants; picking up beetroots does not count. |
| Big Dripleaf | `BIG_DRIPLEAF` | `BIG_DRIPLEAF` | Forage Trowel | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Birch Leaves | `BIRCH_LEAVES` | `BIRCH_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Birch Log | `BIRCH_LOG` | `BIRCH_LOG`, `STRIPPED_BIRCH_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Blue Orchid | `BLUE_ORCHID` | `BLUE_ORCHID` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Brown Mushroom | `BROWN_MUSHROOM` | `BROWN_MUSHROOM`, `BROWN_MUSHROOM_BLOCK` | Forage Sickle | Find mushrooms or a huge brown mushroom cap; both identify the same specimen. |
| Bush | `BUSH` | `BUSH` | Forage Shears | Search grassy routes, flower patches and woodland groundcover. |
| Cactus | `CACTUS` | `CACTUS` | Forage Axe | Harvest eligible field growth; newly grown cane and bamboo differ from a placed base. |
| Cactus Flower | `CACTUS_FLOWER` | `CACTUS_FLOWER` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Carrots | `CARROTS` | `CARROTS` | Forage Sickle | Harvest mature carrot plants; picking up carrots does not count. |
| Cave Vines | `CAVE_VINES` | `CAVE_VINES`, `CAVE_VINES_PLANT` | Forage Pickaxe | Break an eligible cave vine with a Forage Pickaxe; picking berries does not count. |
| Cherry Leaves | `CHERRY_LEAVES` | `CHERRY_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Cherry Log | `CHERRY_LOG` | `CHERRY_LOG`, `STRIPPED_CHERRY_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Chorus Flower | `CHORUS_FLOWER` | `CHORUS_FLOWER` | Forage Sickle | Search or grow eligible Nether or End plants with the matching Forage tool. |
| Chorus Plant | `CHORUS_PLANT` | `CHORUS_PLANT` | Forage Sickle | Search or grow eligible Nether or End plants with the matching Forage tool. |
| Cocoa | `COCOA` | `COCOA` | Forage Sickle | Harvest grown cocoa pods; picking up cocoa beans does not count. |
| Cornflower | `CORNFLOWER` | `CORNFLOWER` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Crimson Fungus | `CRIMSON_FUNGUS` | `CRIMSON_FUNGUS` | Forage Sickle | Search woodland fungi and Nether fungal forests. |
| Crimson Roots | `CRIMSON_ROOTS` | `CRIMSON_ROOTS` | Forage Sickle | Search Nether vegetation with a matching Forage tool. |
| Crimson Stem | `CRIMSON_STEM` | `CRIMSON_STEM`, `STRIPPED_CRIMSON_STEM` | Forage Axe | Harvest a huge Nether fungus; stripped and unstripped stems identify the same specimen. |
| Dandelion | `DANDELION` | `DANDELION` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Dark Oak Leaves | `DARK_OAK_LEAVES` | `DARK_OAK_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Dark Oak Log | `DARK_OAK_LOG` | `DARK_OAK_LOG`, `STRIPPED_DARK_OAK_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Dead Bush | `DEAD_BUSH` | `DEAD_BUSH` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Eyeblossom | `OPEN_EYEBLOSSOM` | `CLOSED_EYEBLOSSOM`, `OPEN_EYEBLOSSOM` | Forage Sickle | Search the Pale Garden; open and closed flowers are the same specimen. |
| Fern | `FERN` | `FERN` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Firefly Bush | `FIREFLY_BUSH` | `FIREFLY_BUSH` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Flowering Azalea | `FLOWERING_AZALEA` | `FLOWERING_AZALEA` | Forage Trowel | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Flowering Azalea Leaves | `FLOWERING_AZALEA_LEAVES` | `FLOWERING_AZALEA_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Glow Lichen | `GLOW_LICHEN` | `GLOW_LICHEN` | Forage Shears | Search lush caves; use the matching Forage tool shown on this entry. |
| Hanging Roots | `HANGING_ROOTS` | `HANGING_ROOTS` | Forage Shears | Search lush caves; use the matching Forage tool shown on this entry. |
| Jungle Leaves | `JUNGLE_LEAVES` | `JUNGLE_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Jungle Log | `JUNGLE_LOG` | `JUNGLE_LOG`, `STRIPPED_JUNGLE_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Kelp | `KELP` | `KELP`, `KELP_PLANT` | Forage Axe | Search underwater kelp; the tip and body identify the same specimen. |
| Large Fern | `LARGE_FERN` | `LARGE_FERN` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Leaf Litter | `LEAF_LITTER` | `LEAF_LITTER` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Lilac | `LILAC` | `LILAC` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Lily Of The Valley | `LILY_OF_THE_VALLEY` | `LILY_OF_THE_VALLEY` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Lily Pad | `LILY_PAD` | `LILY_PAD` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Mangrove Leaves | `MANGROVE_LEAVES` | `MANGROVE_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Mangrove Log | `MANGROVE_LOG` | `MANGROVE_LOG`, `STRIPPED_MANGROVE_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Mangrove Roots | `MANGROVE_ROOTS` | `MANGROVE_ROOTS`, `MUDDY_MANGROVE_ROOTS` | Forage Trowel | Search mangrove roots; muddy roots identify the same specimen. |
| Melon | `MELON` | `MELON` | Forage Axe | Harvest eligible field growth; newly grown cane and bamboo differ from a placed base. |
| Moss Block | `MOSS_BLOCK` | `MOSS_BLOCK` | Forage Trowel | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Moss Carpet | `MOSS_CARPET` | `MOSS_CARPET` | Forage Trowel | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Nether Sprouts | `NETHER_SPROUTS` | `NETHER_SPROUTS` | Forage Shears | Search Nether vegetation with a matching Forage tool. |
| Nether Wart | `NETHER_WART` | `NETHER_WART` | Forage Sickle | Search or grow eligible Nether or End plants with the matching Forage tool. |
| Oak Leaves | `OAK_LEAVES` | `OAK_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Oak Log | `OAK_LOG` | `OAK_LOG`, `STRIPPED_OAK_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Orange Poplar Leaves | `ORANGE_POPLAR_LEAVES` | `ORANGE_POPLAR_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Orange Tulip | `ORANGE_TULIP` | `ORANGE_TULIP` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Oxeye Daisy | `OXEYE_DAISY` | `OXEYE_DAISY` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Pale Hanging Moss | `PALE_HANGING_MOSS` | `PALE_HANGING_MOSS` | Forage Shears | Search the Pale Garden's ground and hanging moss. |
| Pale Moss Block | `PALE_MOSS_BLOCK` | `PALE_MOSS_BLOCK` | Forage Trowel | Search the Pale Garden's ground and hanging moss. |
| Pale Moss Carpet | `PALE_MOSS_CARPET` | `PALE_MOSS_CARPET` | Forage Trowel | Search the Pale Garden's ground and hanging moss. |
| Pale Oak Leaves | `PALE_OAK_LEAVES` | `PALE_OAK_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Pale Oak Log | `PALE_OAK_LOG` | `PALE_OAK_LOG`, `STRIPPED_PALE_OAK_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Peony | `PEONY` | `PEONY` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Pink Petals | `PINK_PETALS` | `PINK_PETALS` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Pink Tulip | `PINK_TULIP` | `PINK_TULIP` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Pitcher Plant | `PITCHER_PLANT` | `PITCHER_CROP`, `PITCHER_PLANT` | Forage Sickle | Grow a pitcher pod and harvest the fully grown pitcher crop with the matching Forage tool. |
| Poplar Log | `POPLAR_LOG` | `POPLAR_LOG`, `STRIPPED_POPLAR_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Poppy | `POPPY` | `POPPY` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Potatoes | `POTATOES` | `POTATOES` | Forage Sickle | Harvest mature potato plants; picking up potatoes does not count. |
| Pumpkin | `PUMPKIN` | `PUMPKIN` | Forage Axe | Harvest eligible field growth; newly grown cane and bamboo differ from a placed base. |
| Red Mushroom | `RED_MUSHROOM` | `RED_MUSHROOM`, `RED_MUSHROOM_BLOCK` | Forage Sickle | Find mushrooms or a huge red mushroom cap; both identify the same specimen. |
| Red Poplar Leaves | `RED_POPLAR_LEAVES` | `RED_POPLAR_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Red Shrub | `RED_SHRUB` | `RED_SHRUB` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Red Tulip | `RED_TULIP` | `RED_TULIP` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Rose Bush | `ROSE_BUSH` | `ROSE_BUSH` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Seagrass | `SEAGRASS` | `SEAGRASS`, `TALL_SEAGRASS` | Forage Shears | Search shallow water; short and tall seagrass are the same specimen. |
| Shelf Mushroom | `SHELF_MUSHROOM` | `SHELF_MUSHROOM` | Forage Sickle | Search woodland fungi and Nether fungal forests. |
| Short Dry Grass | `SHORT_DRY_GRASS` | `SHORT_DRY_GRASS` | Forage Shears | Search grassy routes, flower patches and woodland groundcover. |
| Short Grass | `SHORT_GRASS` | `SHORT_GRASS` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Small Dripleaf | `SMALL_DRIPLEAF` | `SMALL_DRIPLEAF` | Forage Shears | Search lush growth and mossy woodland; use the matching Forage tool shown on this entry. |
| Spore Blossom | `SPORE_BLOSSOM` | `SPORE_BLOSSOM` | Forage Pickaxe | Search lush caves; use the matching Forage tool shown on this entry. |
| Spruce Leaves | `SPRUCE_LEAVES` | `SPRUCE_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |
| Spruce Log | `SPRUCE_LOG` | `SPRUCE_LOG`, `STRIPPED_SPRUCE_LOG` | Forage Axe | Harvest this tree's wood; stripped and unstripped logs identify the same specimen. |
| Sugar Cane | `SUGAR_CANE` | `SUGAR_CANE` | Forage Axe | Harvest eligible field growth; newly grown cane and bamboo differ from a placed base. |
| Sunflower | `SUNFLOWER` | `SUNFLOWER` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Sweet Berry Bush | `SWEET_BERRY_BUSH` | `SWEET_BERRY_BUSH` | Forage Sickle | Break an eligible berry bush; right-clicking berries is not a Forage gathering action. |
| Tall Dry Grass | `TALL_DRY_GRASS` | `TALL_DRY_GRASS` | Forage Shears | Search grassy routes, flower patches and woodland groundcover. |
| Tall Grass | `TALL_GRASS` | `TALL_GRASS` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Torchflower | `TORCHFLOWER` | `TORCHFLOWER` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Twisting Vines | `TWISTING_VINES` | `TWISTING_VINES`, `TWISTING_VINES_PLANT` | Forage Sickle | Search the Warped Forest; the vine tip and body are the same specimen. |
| Vine | `VINE` | `VINE` | Forage Shears | Search grassy routes, flower patches and woodland groundcover. |
| Warped Fungus | `WARPED_FUNGUS` | `WARPED_FUNGUS` | Forage Sickle | Search woodland fungi and Nether fungal forests. |
| Warped Roots | `WARPED_ROOTS` | `WARPED_ROOTS` | Forage Sickle | Search Nether vegetation with a matching Forage tool. |
| Warped Stem | `WARPED_STEM` | `STRIPPED_WARPED_STEM`, `WARPED_STEM` | Forage Axe | Harvest a huge Nether fungus; stripped and unstripped stems identify the same specimen. |
| Weeping Vines | `WEEPING_VINES` | `WEEPING_VINES`, `WEEPING_VINES_PLANT` | Forage Sickle | Search the Crimson Forest; the vine tip and body are the same specimen. |
| Wheat | `WHEAT` | `WHEAT` | Forage Sickle | Harvest mature farm growth with the matching Forage tool. |
| White Tulip | `WHITE_TULIP` | `WHITE_TULIP` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Wildflowers | `WILDFLOWERS` | `WILDFLOWERS` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Wither Rose | `WITHER_ROSE` | `WITHER_ROSE` | Forage Sickle | Search grassy routes, flower patches and woodland groundcover. |
| Yellow Poplar Leaves | `YELLOW_POPLAR_LEAVES` | `YELLOW_POPLAR_LEAVES` | Forage Shears | Harvest matching tree foliage with Forage Shears. |

<!-- END GENERATED FORAGE HERBARIUM -->

See the [player guide](forage-camps.md), [staff guide](forage-camp-technical.md) and [beta checklist](forage/checklist.md) for the wider Forage rules and acceptance tests.
