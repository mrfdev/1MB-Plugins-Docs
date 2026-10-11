# Forage 26.3 vanilla camp evidence

Inspected on 27 September 2026 from the local maintained server's `servers/Paper-26.3/versions/26.3/paper-26.3.jar`, SHA-256 `fdbf2e454a85c97f94d052df0f41d436e09ef5d8076837e64b9dc431a2c08ab0`. This was a read-only archive inspection. No camp was placed and no world changed for this research.

After the canonical build selected Paper 26.3 ALPHA build 49, the inspection was repeated against the newly unpacked JAR, SHA-256 `9a53648ba04b2b98939c552838c29473986aa97dcddd9c304cb12fa5e9edf1b8`. Structure definition, pool entries, every measured piece, and summary counts were unchanged from the earlier build 47 inspection.

Reproduce using Python's standard library:

```sh
python3 scripts/inspect-forage-camp-templates.py --jar servers/Paper-26.3/versions/26.3/paper-26.3.jar > /tmp/forage-camp-templates.json
```

The script reads the structure definition, follows the two Dappled template pools, parses the actual NBT block palettes and entity lists, and prints counts, dimensions, jigsaw connectors, pool weights, and the source JAR hash. It understands the 26.3 palette `id` keys as well as the older `Name` keys. Run it again after an exact Paper or vanilla target update; do not assume these measurements are permanent.

## Structure composition

The structure key is `minecraft:abandoned_camp_dappled_forest`. Its definition starts at `minecraft:abandoned_camp/tent/dappled_forest`, uses jigsaw size 2, a configured maximum distance from the center of 80, surface height projection, and `beard_thin` terrain adaptation. The 80-block value is a generation bound, not a recommended Forage scan radius.

The tent pool has ten equally weighted Dappled pieces. The campsite pool has 49 equally weighted pieces: fifteen chest pieces, fifteen barrel pieces, fifteen special pieces, and four Dappled-specific pieces. Tent jigsaws connect to the campsite pool and to poplar tree pools; campsite connectors terminate in the empty pool. Tree pieces are not included in the material tables because the Forage checklist does not require a tree.

These measurements describe **individual source templates**, not a sample of complete generated camps. Placement can be affected by terrain, jigsaw fitting, rotation, existing blocks, and player damage. The unweighted median below is not a random whole-camp median. No whole-camp average is asserted.

## Dappled tent pieces

Dimensions are stored template X × Y × Z, including terrain and air. A chest is counted as one block, and a barrel as one block. Wool stairs are counted as placed block positions, not recipe ingredient cost.

| Tent | Dimensions | Wool stairs | Fences | Chests | Barrels | Crafting tables |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 8 × 8 × 8 | 35 | 8 | 0 | 1 | 0 |
| 2 | 8 × 9 × 8 | 32 | 7 | 0 | 3 | 1 |
| 3 | 6 × 8 × 8 | 40 | 8 | 0 | 1 | 0 |
| 4 | 8 × 9 × 8 | 46 | 8 | 0 | 2 | 0 |
| 5 | 8 × 8 × 8 | 29 | 8 | 1 | 0 | 0 |
| 6 | 8 × 8 × 8 | 52 | 8 | 1 | 1 | 1 |
| 7 | 8 × 8 × 8 | 36 | 7 | 1 | 0 | 0 |
| 8 | 6 × 8 × 8 | 41 | 8 | 1 | 0 | 0 |
| 9 | 8 × 8 × 8 | 56 | 8 | 1 | 0 | 0 |
| 10 | 8 × 8 × 8 | 57 | 8 | 0 | 2 | 0 |

All ten contain zero full wool blocks, wool slabs, campfires, composters, or cushion entities. The shelter therefore must accept wool stairs; retaining the old full-wool-only check would incorrectly reject every untouched Dappled tent piece.

| Material | Tent minimum / median / maximum | Campsite-pool minimum / median / maximum |
| --- | --- | --- |
| Full wool blocks | 0 / 0 / 0 | 0 / 0 / 0 |
| Wool stairs | 29 / 40.5 / 57 | 0 / 0 / 0 |
| Wool slabs | 0 / 0 / 0 | 0 / 0 / 0 |
| Fences | 7 / 8 / 8 | 0 / 0 / 6 |
| Campfires | 0 / 0 / 0 | 1 / 1 / 1 |
| Chest blocks | 0 / 0.5 / 1 | 0 / 1 / 2 |
| Barrels | 0 / 1 / 3 | 0 / 1 / 1 |
| Crafting tables | 0 / 0 / 1 | 0 / 0 / 0 |
| Composters | 0 / 0 / 0 | 0 / 0 / 0 |
| Cushion entities | 0 / 0 / 0 | 1 / 2 / 3 |

The four Dappled-specific campsite templates are each 10 × 10 × 10. They have one campfire each, cushion counts 2, 2, 2, and 3, and either one chest or one barrel. None has a crafting table or composter.

## Checklist decision (27 September baseline)

**Superseded gameplay requirements, 11 October 2026:** the next synchronized suite build keeps the measured shelter/support/storage/crafting thresholds, requires a lit campfire or soul campfire, and adds one lit candle position, one intact straw bed and one firefly bush. These are deliberate gameplay additions, not a claim that every measured vanilla template contains them or that every generated Abandoned Camp is complete. Requiring a placed straw bed is compatible with vanilla use consuming it: when Forage observes its absence, the owner replaces it and deliberately revalidates the same registration, preserving Local Introduction and global progress. Forage does not add a new bed-consumption mechanic. The earlier decision to leave straw beds optional is retained below as historical context; it still describes running beta build 736, not the pending update. All template measurements above remain unchanged. See the [current and pending camp checklists](../plugins/forage-camps.md#build-the-checklist).

The initial defaults are 24 shelter blocks (any full wool, wool stair, or wool slab), six fences, one campfire, one chest/barrel, one crafting table, and the composter Camp Anchor. Existing qualifying blocks count. Crafting tables present in two tent variants are reused; players add a composter and whatever else is missing. These thresholds are gameplay choices below the smallest measured tent's 29 wool stairs and seven fences, not a claim that any naturally generated camp is guaranteed complete.

Cushions remain optional camp decoration. In these templates they are entities with id `minecraft:cushion`, not blocks to count in a material scan. Their supported Paper representation is [`org.bukkit.entity.Cushion`](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Cushion.html). Straw beds are also optional: vanilla destroys them after use and they cannot serve as a dependable cross-dimension requirement. [Minecraft 26.3 release notes](https://www.minecraft.net/en-us/article/minecraft-java-edition-26-3)

The default validation box extends ten blocks horizontally and six vertically from the anchor: at most 21 × 13 × 21 = 5,733 block positions per camp. Place the anchor near the tent/campfire junction. A scan need not include every decorative tree or terrain block; it needs enough required features within its footprint. The footprint is also the exclusive registration area, so neighboring anchors cannot share one tent's materials.

## Optional local visual sampling

The owner can still place twelve examples to assess visual variety, damaged layouts, and anchor placement. This is useful visual acceptance, not a substitute for counting all source templates.

1. Use a disposable, backed-up local 26.3 creative test area and leave enough spacing between samples.
2. Run `/place structure minecraft:abandoned_camp_dappled_forest` at each sample location, or supply spaced coordinates.
3. Record the position, orientation, observed materials, and intended composter position for each sample.
4. Add the composter and any missing checklist blocks, inspect deficits, and test registration.
5. Check a naturally generated example as well; flatworld placement does not reproduce every terrain interaction.

`/place structure` does not make the surrounding biome Dappled Forest. An Initial Camp still requires the actual biome at its anchor in the mapped initial world. A disposable staff fixture may set a small test biome patch; normal Forage gameplay does not paint biomes or generate camps.

## Official API review

Discovery began with the live [PaperMC documentation index](https://docs.papermc.io/llms.txt). The reviewed documentation includes [scheduling](https://docs.papermc.io/paper/dev/scheduler/), [custom inventory holders](https://docs.papermc.io/paper/dev/custom-inventory-holder/), and [vanilla data files](https://docs.papermc.io/paper/reference/vanilla-data-files/). No copy of `llms-full.txt` was vendored.

Paper's scheduling guidance puts file/database work off the main thread while world access remains on its appropriate server thread. Exact 26.3 [`World#getChunkAtAsync`](https://jd.papermc.io/paper/26.3/org/bukkit/World.html#getChunkAtAsync(int,int,boolean)) provides no-generation loading, and chunk tickets can protect loaded chunks during bounded validation. These operations require limits and cleanup; a pending load is not a valid camp result.

The exact [`InventoryClickEvent`](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html) contract separates drags and warns that changing inventory views during the click callback is unsafe; deferred actions must therefore recheck the session before mutation. [`Biome.DAPPLED_FOREST`](https://jd.papermc.io/paper/26.3/org/bukkit/block/Biome.html#DAPPLED_FOREST) is the target biome, not a name inferred from nearby decorative blocks.
