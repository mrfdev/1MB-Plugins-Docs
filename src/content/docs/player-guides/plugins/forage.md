---
title: "Forage Guide"
description: "Learn Forage camps, tools, quests, repairs and dust, with a beta checklist and staff reference."
---

**Reviewed 13 October 2026 against suite build 753 on Paper 26.3 STABLE 180.** The beta includes seasonal Community Efforts, Leaf Litter and the Herbarium botanical journal; startup activation is verified. Player acceptance testing remains open. This guide describes the camp and gathering flow. Availability, prices, caps, and enabled sources depend on the server; live activation remains separate from beta testing.

**New in build 739:** Accepted Turn-Ins opens the complete item guide, and plain cocoa beans are accepted. Build 741 added Leaf Litter; build 742 adds the Herbarium botanical expansion, bringing the default accepted inventory list to 97 types.

**Placed-resource protection is active from build 739:** newly recorded placements follow the movement and growth rules below. Placements from before this update are not backfilled.

**Participation progress is now tracked:** successfully claiming one daily and one weekly quest qualifies you for one lifetime participation reward. The actual map is still being prepared, so participation claiming remains disabled until it is ready.

**Available from build 752:** Source Families, the additional `/forage sources` routes and quest details with **What Counts?** below are deployed on the maintained test servers. Existing gathering, submission and claim requirements remain in force; the checklist still needs actual player results.

Forage is hands-on gathering with your own tools and camps. You keep one set of Forage XP, points, quests, limits, and reward history wherever you play. Your camps determine where you can submit finds and claim those benefits.

## How Players Use It

Available features include:

- Eight curated tool types with matching gathering sources and their own tool progression.
- One Initial Camp and up to two Secondary Camps, each with a Local Introduction.
- Shared player XP, Forage Points, daily limits, and skill branch progress.
- Daily, weekly, and monthly quests with deliberate camp reward claims.
- Camp Turn-Ins, tool upgrades, Repair & Merge, and Forage Dust crafting.
- Occasional treasures, leaderboards, progress guidance, and request review.

For the beta session, work through the [in-game test checklist](/staff-reference/plugins/forage-checklist/) and record what happened alongside the expected result. Staff setup and recovery are covered in the [technical guide](/staff-reference/plugins/forage/).

## Start in Wild

Use `/forage next` when you are unsure what to do. Before you have an Initial Camp, it points you to **Dappled Forest in `/wild`**, then `/forage camp` to check the workstation and required blocks. On a test server where Wild is mapped to another world, the hint recognizes when you are already in the mapped Wild world. If the server later approves more Initial Camp worlds, the hint follows that configuration.

`/next` includes Forage among the server's available activities. `/next guide forage` opens the short camp, tool, and gathering checklist. `/guidance` controls optional hints, their frequency, and hidden or postponed hints; you can still request `/forage next` with optional hints switched off.

Your first camp must be in **Dappled Forest in Wild**. Find a vanilla Abandoned Camp and complete it, or build your own using the same checklist. Discovering a structure or clicking a composter does not claim it automatically. Inspect the camp with `/forage camp`, add what is missing, and deliberately register it.

Use `/forage camp register` to open the registration page, then click its **Register Initial** or **Register Secondary** button to confirm. `/forage camp list` shows your registrations, `/forage camp revalidate` opens the page to confirm a repaired camp, and `/forage camp unclaim [registration-UUID]` opens a deliberate release confirmation.

**Register and revalidate in Survival mode.** You can inspect the checklist while in Creative, but cannot claim the camp there. Hover over the composter button to see the blocker, such as **“Not ready yet: Survival mode required.”** Clicking it also explains the reason in chat: **“You are in Creative mode. Survival mode is required to register or revalidate a camp.”** Other blockers, such as missing blocks, overlap, distance, or access, have their own explanation.

The biome requirement applies to every replacement Initial Camp as well. A tent made from poplar and wool outside Dappled Forest does not qualify. Other biomes' abandoned structures are useful decoration, but they cannot become your Initial Camp.

Keep the composter near the center of the camp, with the shelter and campfire nearby. The default scan reaches ten blocks horizontally and six blocks above and below it. Features outside that box do not count.

## Build the checklist

Use these core features together with the additional camp features below.

| Feature | Default minimum | What counts |
| --- | ---: | --- |
| Camp Anchor | 1 | Composter at the registered location |
| Shelter | 24 blocks | Full wool, wool stairs, and wool slabs in any color |
| Supports | 6 blocks | Fence blocks, including nether brick fences; not gates or walls |
| Fire | 1 | Lit campfire or lit soul campfire, whether or not food is cooking |
| Storage | 1 | Chest, trapped chest, or barrel |
| Crafting station | 1 | Crafting table |

Existing suitable blocks count, so you do not need to rebuild a vanilla tent beside itself. Abandoned Camp layouts vary; finding one does not guarantee that it meets every Forage requirement. The camp page shows counted requirements and shortages: for example, “Shelter 21/24: add 3 wool blocks, stairs, or slabs” and “Supports 5/6: add 1 fence.” A missing composter or crafting table is shown as a missing workstation.

Wool carpets do not count as shelter. A double wool slab counts as one occupied block position. The whole camp scan must fit inside the world's build height.

The **Requirements** book glows when the physical camp checklist is complete. The **Register Initial**, **Register Secondary**, or **Revalidate Camp** button glows only when the action's other requirements are also met. A complete build can therefore have a glowing book while registration remains blocked in Creative mode. The button and chat explain what still needs to change; the plugin checks again when you click.

You can choose your layout and redesign it later. The plugin checks the required features within your camp, rather than demanding one exact schematic. Lanterns and trees remain optional; the listed features are required.

Also place the following required features inside the same footprint:

| Feature | Default minimum | What counts |
| --- | ---: | --- |
| Lit candle | 1 position | A lit candle block, undyed or any color, containing one to four candles; candles on cakes do not count |
| Straw bed | 1 complete bed | Both matching halves must be inside the scan; a bed counts once, not once per half |
| Firefly bush | 1 | A placed firefly bush |
| Cushions | 2 | Two placed cushions; any colors, matching or mixed |
| Water-filled cauldron | 1 | A placed cauldron with water at level 1, 2 or 3; empty, lava and powder-snow cauldrons do not count |
| Filled flowerpot | 1 | A placed flowerpot with any vanilla-valid potted contents; an empty pot does not count |
| Stripped logs or wood | 2 blocks | Two placed stripped log or stripped wood blocks |
| Banner | 1 | A placed standing or wall banner, any color; plain or patterned |

One, two, three or four candles sharing one block position count as one position. Any color or mix of colors across separate positions is allowed. The campfire only needs to stay lit; placing or removing food does not affect this requirement. Waterlogged campfires and candles do not qualify. The firefly bush only needs to be present; visible fireflies or night-time are not required. Ordinary beds cannot replace the straw bed. These features must be placed inside the same camp scan; inspect `/forage camp` to see any shortages. Items carried in your inventory, dropped on the ground or stored in a chest/barrel do not satisfy the construction checklist. Two cushions of the same color work, and so do two different colors. The two firewood blocks can be different stripped log/wood types and can sit anywhere within the footprint; they need not touch the campfire. Stripped stems, hyphae and bamboo do not count. A banner may have a custom pattern or no pattern at all. The cauldron needs some water, not necessarily a full fill: any of its three water levels qualifies.

Extinguishing the last qualifying campfire or candle makes the camp incomplete. So does losing its straw bed, either bed half or its last firefly bush, having fewer than two placed cushions or stripped wood blocks, emptying/removing the only filled flowerpot or water-filled cauldron, or losing its only banner. Using some cauldron water remains valid while at least one water level remains. Once Forage detects the shortage, restoring blocks alone does not clear the revalidation requirement. Restore or relight the missing features, then use `/forage camp revalidate` and confirm deliberately. Your registration, Local Introduction progress, XP, points and claimed rewards stay saved. An incomplete Initial Camp also pauses your Secondary Camps.

## Three camps total

| Camp slot | Where it belongs | Biome rule |
| --- | --- | --- |
| Initial Camp | Wild | Dappled Forest |
| Secondary Camp | Another allowed world | No biome requirement |
| Secondary Camp | A third allowed world | No biome requirement |

There are **three total, not one plus three**. Each camp belongs to one player, and you can register only one camp in each actual world. Camps cannot overlap or share the same required features. Someone else's camp and workstation cannot be used as your own.

The approved worlds are Wild, General, Cave, End, Nether, Acid, OneBlock, SkyBlock, ChunkBlock, and SkyGrid. Builders, Spawn, and Legacy are excluded. Other worlds remain unavailable until staff explicitly adds them.

For example, Wild + SkyBlock + ChunkBlock uses all your slots. To establish a OneBlock camp, choose a secondary camp to unclaim first. The Initial Camp slot always remains reserved for a qualifying Wild camp.

## Play locally to activate each camp

A newly registered camp is ready for its **Local Introduction**. Starter-tool access, instructions, and the introduction submission stay available; global rewards remain locked there.

The default introduction asks you to:

1. Perform **30 qualifying personal Forage actions in this camp's world**, after registering it. Use the matching Forage tool on supported sources.
2. Return to the camp and deliberately submit **8 eligible plain gathering items** from your current inventory through its introduction menu.

The menu shows your remaining work and the next step. A locked reward should tell you that local gathering is needed, not suggest that your global points are missing.

**Camp Turn-Ins is separate from Local Introduction.** Reaching 30/30 actions and carrying eligible leaves does not finish the introduction automatically. Open **Local Introduction** from the hub and click **Submit Local Introduction** to hand in the eight items. Its checklist shows both gathering progress and the eligible items in your backpack, such as **30/30** and **8/8**. The submit button glows only when both are ready.

Until that submission is complete, Camp Turn-Ins shows the introduction lock and offers a button straight to the introduction checklist. It does not show a ready turn-in button or open a reward confirmation. Plain red, orange, and yellow poplar leaves are eligible leaves; they can supply the introduction delivery and later normal turn-ins.

After registration, `/forage next` uses the camp in your current world to show its Local Introduction. It first explains the remaining fresh gathering, then directs you back to submit the introduction items. Reaching 30 actions alone does not unlock rewards; the delivery must also be completed. If your Initial Camp needs revalidation, its repair takes priority in the guidance.

> Global rewards are locked at this camp. Gather locally with your Forage tools, then return here to submit your finds. Local gathering: 12/30. Introduction delivery: pending.

Ordinary XP and points earned during these actions still belong to your global profile. They do not go into a separate world balance. Existing global action totals, another player's gathering, and stockpiled items on their own cannot complete the introduction. The fresh personal actions are the local participation proof; ordinary stackable items are not individually tracked to the exact block that dropped them.

Completing the introduction opens the full eligible camp activities, including rewards. Each new Camp Registration has its own introduction. Repairing the same registration keeps its introduction progress; unclaiming and registering a replacement starts that camp's introduction again.

## Use the workstation to submit and claim

Sneak-right-click your registered composter to open the camp workstation. Normal right-click keeps vanilla composting. Use **Local Introduction** for the first delivery and **Quests & Rewards** for currently supported reward claims.

Rewards are claimed **at your own camp**, in its world. A command, old menu, teleport, or another player's workstation cannot stand in for being there. Forage rechecks the camp and your Initial Camp when you act, including when you confirm a purchase or reward.

Stay within **six blocks** of the composter while using the menu. A workstation visit expires after **five minutes**; closing the menu, teleporting, dying, or leaving also ends that visit. If an action tells you to use the workstation again, close the old menu and sneak-right-click your composter to start a fresh visit.

Your current inventory supplies any submitted items and receives any item reward. Forage does not move inventory between game modes. If General and Wild already share an inventory, finds from General can be brought to Wild and submitted there. Finds in a separate SkyBlock inventory can be submitted at your SkyBlock camp toward the same global progress.

Your global points can be spent at any of your fully active camps. A camp's Local Introduction establishes some participation in that world; it does not require every future reward to be earned there. Server inventory rules can also allow you to carry an already claimed reward into another world. Camp rules control Forage's claim location, not all normal item travel.

## Pick a tool and gather

Open **Tool Shop** at your complete registered camp to buy your first tool. Starter shopping works before Local Introduction is finished. Check the displayed price and keep room in your inventory. These are special Forage items; ordinary Minecraft tools and renamed copies do not earn Forage progress.

| Tool | Matching sources and useful examples | Default access |
| --- | --- | --- |
| Sickle | Flora, crops, mushrooms: grass, wheat, red shrubs, shelf mushrooms | Starter |
| Axe | Logs and fruits: oak/poplar logs, pumpkins, melons, sugar cane | Starter |
| Trowel | Moss: moss blocks/carpet, azaleas, dripleaf | Starter |
| Shears | Leaves, including red, orange, and yellow poplar leaves | Starter |
| Pickaxe | Stone and cave finds: calcite, tuff, basalt, end stone, glow lichen | Carry any Forage tool at tool level 2 |
| Brush | Sands and relics: sand, red sand, gravel, clay, suspicious sand/gravel | Carry any Forage tool at tool level 2 |
| Sword | Configured creatures such as cows, sheep, chickens, rabbits, and squid | Carry any Forage tool at tool level 2 |
| Mace | Configured hostile mobs such as zombies, skeletons, blazes, breezes, and shulkers | Carry any Forage tool at tool level 2 |

For block routes, **break** a configured source with the matching tool in your main hand. The Brush route rewards block breaking, not completion of vanilla archaeology brushing. For sword/mace routes, make a matching melee hit, receive the kill credit within ten seconds, and hold the same Forage tool type when the mob dies. Projectile-only kills and picking up drops do not count. Every tier of a tool uses the same source list; an upgrade does not unlock extra blocks or creatures. Poplar saplings and crafted poplar building blocks are not gathering sources.

The [complete source catalogue](#complete-source-catalogue) below lists every supported source from the shipped defaults. Use `/forage sources` from anywhere to inspect the held Forage tool, or choose a tool if none is held; `/forage sources <tool>` opens a specific tool. The Trowel uses the ID `shovel`. Click a tool in Tools & Families for its full paginated list, or use the catalogue's clickable public documentation link. This is read-only browsing: it does not create workstation access or grant gathering rewards. The in-game list follows the server's configuration, which may differ from the published defaults. Each source card separates support from current reward pauses. Clicking a source card opens its details; Back reopens the list with a fresh snapshot. Gathering still rechecks its rules when you act. The hub's **Tools & All Sources** button and onboarding's **What can I gather?** entry also open the catalogue before your camp is ready. Newly issued or normally updated tool lore includes a source hint; existing tools acquire it when Forage next refreshes their lore, not merely when you open the guide.

Player Forage level, a tool's level, and its tier are different. The four later tool types unlock when you carry a level-2 Forage tool; a tool left in a chest cannot satisfy the shop check. Each rewarded action can advance player XP, points, the held tool, the matching skill branch, and applicable quests.

Use `/forage limits` to check personal and source-family daily caps. A capped family or exhausted chunk can stop rewards while ordinary harvesting and tool wear continue. Move to another eligible chunk or try a different family, subject to your remaining personal cap. A different camp or world does not reset your daily allowances.

From 11 October 2026, the beta server’s `normal` preset allows **3,125 player XP or 1,500 actions per day globally**, and **875 XP or 344 actions per day for each source family**, whichever applicable limit is reached first. The 25% increase preserves today's already-earned progress and usage. Check `/forage limits` for your remaining allowance.

<a id="placed-blocks-and-grown-harvests-upcoming"></a>

## Placed blocks and grown harvests

From build 739, breaking a resource whose placement Forage recorded earns no Forage gathering rewards. This applies when someone else placed it, when either hand or an ordinary tool was used, and in any world, including Creative placements. Moving a marked block with a normal or sticky piston keeps its placement record. Falling sand, gravel and other marked falling resources keep that record when they land. The usual block break, drops and tool wear still happen when the other game and protection rules allow them.

A rejected placed block gives no player XP, points, tool XP, branch or quest progress, Local Introduction action or treasure, and uses none of your reward allowance or chunk-exhaustion budget. Waiting does not make it eligible: the existing 12-second limit only controls repeated chat notices. Placement records remain through normally saved chunk unloads and server restarts.

Growing a crop or tree is still useful. A crop you plant must genuinely grow to maturity before its recorded placement stops blocking rewards. Growth that replaces a block with a different type, such as a tree growing, clears the old placement mark. Applying bonemeal while leaving the same type in place does not clear it: the original placed moss block stays marked. Newly grown upper sugar-cane and bamboo blocks can qualify, while the placed base stays marked; manually stacking bamboo above its seedling does not bypass this. A growth check may finish on the following tick, and cancelled growth does not clear a mark. Other gathering rules and limits still apply.

Tracking stays active for configured resources while Forage gameplay or a source family is paused. If Forage reports that placement tracking is unavailable, ask staff to inspect it. A tracking failure may also stop new placements or piston movement to avoid creating resources whose origin cannot be verified.

Forage cannot reconstruct placements made before this update, and staff WorldEdit or other edits outside the supported events are not covered. This is not a promise to identify every farmed resource. Turn-Ins are a separate activity: eligible plain bought, traded or stored items remain acceptable there. On this beta, tracking begins with build 739. Test fresh placements separately from blocks whose earlier history is unknown.

**Build-742 botanical routes:** the source-default catalogue below includes the Herbarium expansion, including mature pitcher crops. `/forage sources` shows your running server's actual list.

<!-- BEGIN GENERATED FORAGE SOURCES -->

## Complete source catalogue

This complete list is generated from the shipped defaults through the same source catalogue used by Forage. Staff can customize or disable sources; `/forage sources [tool] [page]` shows that server's effective list. Browse families with `/forage sources families [page]`, then open one with `/forage sources family <id> [page]`, such as `flora` or `stone`. Each family shows its matching tools and complete gathering sources.

Look at a nearby block and use `/forage inspect` for a quick summary and a clickable **Source details** link, or search by name with `/forage source seagrass`. Exact matches take precedence over partial matches; multiple matches open a paginated chooser. Existing tool, family and control names keep their command meaning; use `/forage source block <name>`, `/forage source creature <name>` or `/forage source search <name>` to disambiguate.

Gathering sources, Camp Turn-In items and seasonal contributions are separate lists. Use `/forage sources turnins [page]` for ordinary accepted inventory items, `/forage sources community [page]` for the current season's gathering sources, and `/forage sources donations [page]` for its resource-donation items. A quest's **What Counts?** explains that quest's actual objective.

**Every tier of a tool uses the same sources.** Tool level, tier, refinements and enchantments do not unlock extra entries in its list. They affect progression or tool behavior separately. The Trowel's command/configuration ID is `shovel`.

For block sources, break the listed block with the matching genuine Forage tool in your main hand. This includes the Brush: vanilla archaeology brushing is not a Forage gathering action. For creatures, land a matching melee hit, receive the kill credit within ten seconds, and hold the same Forage tool type in your main hand when the creature dies. Projectile-only kills and merely picking up drops do not qualify.

**Listed source does not mean rewards are currently available.** Daily player/family caps, exhausted chunks, world and area restrictions, a paused feature or an unusable tool can still stop gathering rewards. Read the current feedback and `/forage limits`. Browsing the catalogue does not create a camp visit, complete an introduction, grant rewards or bypass these checks.

Names below are followed by the exact material or entity ID used in staff configuration. Item-only materials cannot be broken as source blocks and are omitted from this catalogue.

### Forage Axe sources

Tool ID: `axe`. 31 source types.

**Field Fruit** (`fruits`):

- Bamboo (`BAMBOO`): Break this block.
- Cactus (`CACTUS`): Break this block.
- Kelp (`KELP`): Break this block.
- Kelp Plant (`KELP_PLANT`): Break this block.
- Melon (`MELON`): Break this block.
- Pumpkin (`PUMPKIN`): Break this block.
- Sugar Cane (`SUGAR_CANE`): Break this block.

**Woodcraft** (`logs`):

- Acacia Log (`ACACIA_LOG`): Break this block.
- Birch Log (`BIRCH_LOG`): Break this block.
- Cherry Log (`CHERRY_LOG`): Break this block.
- Crimson Stem (`CRIMSON_STEM`): Break this block.
- Dark Oak Log (`DARK_OAK_LOG`): Break this block.
- Jungle Log (`JUNGLE_LOG`): Break this block.
- Mangrove Log (`MANGROVE_LOG`): Break this block.
- Oak Log (`OAK_LOG`): Break this block.
- Pale Oak Log (`PALE_OAK_LOG`): Break this block.
- Poplar Log (`POPLAR_LOG`): Break this block.
- Spruce Log (`SPRUCE_LOG`): Break this block.
- Stripped Acacia Log (`STRIPPED_ACACIA_LOG`): Break this block.
- Stripped Birch Log (`STRIPPED_BIRCH_LOG`): Break this block.
- Stripped Cherry Log (`STRIPPED_CHERRY_LOG`): Break this block.
- Stripped Crimson Stem (`STRIPPED_CRIMSON_STEM`): Break this block.
- Stripped Dark Oak Log (`STRIPPED_DARK_OAK_LOG`): Break this block.
- Stripped Jungle Log (`STRIPPED_JUNGLE_LOG`): Break this block.
- Stripped Mangrove Log (`STRIPPED_MANGROVE_LOG`): Break this block.
- Stripped Oak Log (`STRIPPED_OAK_LOG`): Break this block.
- Stripped Pale Oak Log (`STRIPPED_PALE_OAK_LOG`): Break this block.
- Stripped Poplar Log (`STRIPPED_POPLAR_LOG`): Break this block.
- Stripped Spruce Log (`STRIPPED_SPRUCE_LOG`): Break this block.
- Stripped Warped Stem (`STRIPPED_WARPED_STEM`): Break this block.
- Warped Stem (`WARPED_STEM`): Break this block.

### Forage Brush sources

Tool ID: `brush`. 8 source types.

**Brush Relics** (`relics`):

- Chiseled Bookshelf (`CHISELED_BOOKSHELF`): Break this block.
- Decorated Pot (`DECORATED_POT`): Break this block.
- Suspicious Gravel (`SUSPICIOUS_GRAVEL`): Break this block.
- Suspicious Sand (`SUSPICIOUS_SAND`): Break this block.

**Dry Finds** (`sands`):

- Clay (`CLAY`): Break this block.
- Gravel (`GRAVEL`): Break this block.
- Red Sand (`RED_SAND`): Break this block.
- Sand (`SAND`): Break this block.

### Forage Mace sources

Tool ID: `mace`. 9 source types.

**Danger Finds** (`danger_drops`):

- Blaze (`BLAZE`): Defeat this creature.
- Breeze (`BREEZE`): Defeat this creature.
- Creeper (`CREEPER`): Defeat this creature.
- Ghast (`GHAST`): Defeat this creature.
- Phantom (`PHANTOM`): Defeat this creature.
- Shulker (`SHULKER`): Defeat this creature.
- Skeleton (`SKELETON`): Defeat this creature.
- Wither Skeleton (`WITHER_SKELETON`): Defeat this creature.
- Zombie (`ZOMBIE`): Defeat this creature.

### Forage Pickaxe sources

Tool ID: `pickaxe`. 20 source types.

Ordinary stone, deepslate and ores are not Forage Pickaxe sources in these defaults. Breaking them can still be normal Minecraft mining, without Forage rewards.

**Cave Forage** (`cave`):

- Cave Vines (`CAVE_VINES`): Break this block.
- Cave Vines Plant (`CAVE_VINES_PLANT`): Break this block.
- Glow Lichen (`GLOW_LICHEN`): Break this block.
- Hanging Roots (`HANGING_ROOTS`): Break this block.
- Pointed Dripstone (`POINTED_DRIPSTONE`): Break this block.
- Rooted Dirt (`ROOTED_DIRT`): Break this block.
- Spore Blossom (`SPORE_BLOSSOM`): Break this block.

**Stone Relics** (`stone`):

- Amethyst Cluster (`AMETHYST_CLUSTER`): Break this block.
- Basalt (`BASALT`): Break this block.
- Blackstone (`BLACKSTONE`): Break this block.
- Bone Block (`BONE_BLOCK`): Break this block.
- Calcite (`CALCITE`): Break this block.
- Crying Obsidian (`CRYING_OBSIDIAN`): Break this block.
- Dripstone Block (`DRIPSTONE_BLOCK`): Break this block.
- End Stone (`END_STONE`): Break this block.
- Magma Block (`MAGMA_BLOCK`): Break this block.
- Obsidian (`OBSIDIAN`): Break this block.
- Purpur Block (`PURPUR_BLOCK`): Break this block.
- Smooth Basalt (`SMOOTH_BASALT`): Break this block.
- Tuff (`TUFF`): Break this block.

### Forage Shears sources

Tool ID: `shears`. 14 source types.

**Canopy Finds** (`leaves`):

- Acacia Leaves (`ACACIA_LEAVES`): Break this block.
- Azalea Leaves (`AZALEA_LEAVES`): Break this block.
- Birch Leaves (`BIRCH_LEAVES`): Break this block.
- Cherry Leaves (`CHERRY_LEAVES`): Break this block.
- Dark Oak Leaves (`DARK_OAK_LEAVES`): Break this block.
- Flowering Azalea Leaves (`FLOWERING_AZALEA_LEAVES`): Break this block.
- Jungle Leaves (`JUNGLE_LEAVES`): Break this block.
- Mangrove Leaves (`MANGROVE_LEAVES`): Break this block.
- Oak Leaves (`OAK_LEAVES`): Break this block.
- Orange Poplar Leaves (`ORANGE_POPLAR_LEAVES`): Break this block.
- Pale Oak Leaves (`PALE_OAK_LEAVES`): Break this block.
- Red Poplar Leaves (`RED_POPLAR_LEAVES`): Break this block.
- Spruce Leaves (`SPRUCE_LEAVES`): Break this block.
- Yellow Poplar Leaves (`YELLOW_POPLAR_LEAVES`): Break this block.

### Forage Sickle sources

Tool ID: `sickle`. 64 source types.

**Farm Herbs** (`crops`):

- Beetroots (`BEETROOTS`): Break this block.
- Carrots (`CARROTS`): Break this block.
- Chorus Flower (`CHORUS_FLOWER`): Break this block.
- Chorus Plant (`CHORUS_PLANT`): Break this block.
- Cocoa (`COCOA`): Break this block.
- Nether Wart (`NETHER_WART`): Break this block.
- Potatoes (`POTATOES`): Break this block.
- Sweet Berry Bush (`SWEET_BERRY_BUSH`): Break this block.
- Wheat (`WHEAT`): Break this block.

**Mushrooms** (`mushrooms`):

- Brown Mushroom (`BROWN_MUSHROOM`): Break this block.
- Brown Mushroom Block (`BROWN_MUSHROOM_BLOCK`): Break this block.
- Crimson Fungus (`CRIMSON_FUNGUS`): Break this block.
- Mushroom Stem (`MUSHROOM_STEM`): Break this block.
- Red Mushroom (`RED_MUSHROOM`): Break this block.
- Red Mushroom Block (`RED_MUSHROOM_BLOCK`): Break this block.
- Shelf Mushroom (`SHELF_MUSHROOM`): Break this block.
- Warped Fungus (`WARPED_FUNGUS`): Break this block.

**Wild Flora** (`flora`):

- Allium (`ALLIUM`): Break this block.
- Azure Bluet (`AZURE_BLUET`): Break this block.
- Blue Orchid (`BLUE_ORCHID`): Break this block.
- Bush (`BUSH`): Break this block.
- Cactus Flower (`CACTUS_FLOWER`): Break this block.
- Closed Eyeblossom (`CLOSED_EYEBLOSSOM`): Break this block.
- Cornflower (`CORNFLOWER`): Break this block.
- Crimson Roots (`CRIMSON_ROOTS`): Break this block.
- Dandelion (`DANDELION`): Break this block.
- Dead Bush (`DEAD_BUSH`): Break this block.
- Fern (`FERN`): Break this block.
- Firefly Bush (`FIREFLY_BUSH`): Break this block.
- Large Fern (`LARGE_FERN`): Break this block.
- Leaf Litter (`LEAF_LITTER`): Break this block.
- Lilac (`LILAC`): Break this block.
- Lily Of The Valley (`LILY_OF_THE_VALLEY`): Break this block.
- Lily Pad (`LILY_PAD`): Break this block.
- Nether Sprouts (`NETHER_SPROUTS`): Break this block.
- Open Eyeblossom (`OPEN_EYEBLOSSOM`): Break this block.
- Orange Tulip (`ORANGE_TULIP`): Break this block.
- Oxeye Daisy (`OXEYE_DAISY`): Break this block.
- Peony (`PEONY`): Break this block.
- Pink Petals (`PINK_PETALS`): Break this block.
- Pink Tulip (`PINK_TULIP`): Break this block.
- Pitcher Crop (`PITCHER_CROP`): Break this block.
- Pitcher Plant (`PITCHER_PLANT`): Break this block.
- Poppy (`POPPY`): Break this block.
- Red Shrub (`RED_SHRUB`): Break this block.
- Red Tulip (`RED_TULIP`): Break this block.
- Rose Bush (`ROSE_BUSH`): Break this block.
- Seagrass (`SEAGRASS`): Break this block.
- Short Dry Grass (`SHORT_DRY_GRASS`): Break this block.
- Short Grass (`SHORT_GRASS`): Break this block.
- Sunflower (`SUNFLOWER`): Break this block.
- Tall Dry Grass (`TALL_DRY_GRASS`): Break this block.
- Tall Grass (`TALL_GRASS`): Break this block.
- Tall Seagrass (`TALL_SEAGRASS`): Break this block.
- Torchflower (`TORCHFLOWER`): Break this block.
- Twisting Vines (`TWISTING_VINES`): Break this block.
- Twisting Vines Plant (`TWISTING_VINES_PLANT`): Break this block.
- Vine (`VINE`): Break this block.
- Warped Roots (`WARPED_ROOTS`): Break this block.
- Weeping Vines (`WEEPING_VINES`): Break this block.
- Weeping Vines Plant (`WEEPING_VINES_PLANT`): Break this block.
- White Tulip (`WHITE_TULIP`): Break this block.
- Wildflowers (`WILDFLOWERS`): Break this block.
- Wither Rose (`WITHER_ROSE`): Break this block.

### Forage Sword sources

Tool ID: `sword`. 13 source types.

**Creature Finds** (`creature_drops`):

- Chicken (`CHICKEN`): Defeat this creature.
- Cow (`COW`): Defeat this creature.
- Donkey (`DONKEY`): Defeat this creature.
- Glow Squid (`GLOW_SQUID`): Defeat this creature.
- Horse (`HORSE`): Defeat this creature.
- Llama (`LLAMA`): Defeat this creature.
- Mooshroom (`MOOSHROOM`): Defeat this creature.
- Mule (`MULE`): Defeat this creature.
- Rabbit (`RABBIT`): Defeat this creature.
- Sheep (`SHEEP`): Defeat this creature.
- Squid (`SQUID`): Defeat this creature.
- Trader Llama (`TRADER_LLAMA`): Defeat this creature.
- Turtle (`TURTLE`): Defeat this creature.

### Forage Trowel sources

Tool ID: `shovel`. 11 source types.

**Moss and Roots** (`moss`):

- Azalea (`AZALEA`): Break this block.
- Big Dripleaf (`BIG_DRIPLEAF`): Break this block.
- Flowering Azalea (`FLOWERING_AZALEA`): Break this block.
- Mangrove Roots (`MANGROVE_ROOTS`): Break this block.
- Moss Block (`MOSS_BLOCK`): Break this block.
- Moss Carpet (`MOSS_CARPET`): Break this block.
- Muddy Mangrove Roots (`MUDDY_MANGROVE_ROOTS`): Break this block.
- Pale Hanging Moss (`PALE_HANGING_MOSS`): Break this block.
- Pale Moss Block (`PALE_MOSS_BLOCK`): Break this block.
- Pale Moss Carpet (`PALE_MOSS_CARPET`): Break this block.
- Small Dripleaf (`SMALL_DRIPLEAF`): Break this block.

<!-- END GENERATED FORAGE SOURCES -->

## Find what counts

Use **Source Families** in the source picker, or `/forage sources families`, to browse families such as Wild Flora (`flora`) and Stone (`stone`). Select a family to see its matching tools and every supported block or creature, with Previous/Next for longer lists. A family describes gathering sources; it does not mean every item dropped by those sources can be submitted.

`/forage sources flora` opens the flora family directly. Use `/forage sources family <id> [page]` when a family name also matches a tool ID; tool IDs keep their existing meaning. `/forage source` is a singular alias for `/forage sources`. With no argument, the command still uses your held Forage tool or opens the tool picker. Page numbers start at 1.

**Inspect and lookup (available from build 753):** look at a block within six blocks and use `/forage inspect`. Chat shows a quick summary with a clickable **Source details** link. Water does not block the view, so you can inspect underwater plants; walls still block it. The check uses loaded chunks only. It does not break the block or earn progress.

If you know a source's name, use `/forage source seagrass`. Lookup checks exact matches before partial matches and opens a paginated chooser when several sources match. Names can use spaces, underscores or hyphens, and a `minecraft:` prefix is accepted. Existing tool, family and control names keep their meaning: use `/forage source block <name>`, `/forage source creature <name>` or `/forage source search <name>` when you need to disambiguate a source name.

Source details shows the current family, matching tools and gathering rules. A wrong-tool warning names the supported tool or tools and offers the same **Source details** link. Those details explain support; caps, world/protection rules, placed-block tracking and tool condition can still stop rewards. Neither inspection nor following a link grants a camp visit.

For a specific activity, follow its **What Counts?** link. Quests explain their own objective; Camp Turn-Ins explain plain accepted inventory items; Community Cleanup keeps seasonal gathering, resource donations and treasure donations separate. Browsing these guides spends nothing, awards nothing and grants no workstation visit. The running server's lists take precedence over the published shipped defaults.

## Quests, branches, and treasures

At an active workstation, open **Quests & Rewards** to inspect daily, weekly, monthly, and ready-to-claim quests. Valid rewarded gathering advances applicable quests automatically. Follow the actual objective shown on your card: visiting a biome without gathering there is insufficient, and a material quest needs that exact material. Turn-ins, dust use, and staff-granted XP do not count as gathering actions.

Daily, Weekly and Monthly each have four top-row filters: **Show All**, **Incomplete** (unfinished and unclaimed), **Completed** (finished but still unclaimed), and **Claimed** (reward already received). Each category opens on Show All. The selected button is highlighted, counts show how many quests match, and changing filters returns to page 1. Quest order stays the same, with up to 28 per page and Previous/Next for larger lists. If no quests match, the page explains how to return to Show All. The separate **Ready to Claim** view still brings together unclaimed completed quests from all periods.

Filters only change what you see. Clicking a quest opens its details, with separate **What Counts?** and **Claim Reward** buttons. What Counts? distinguishes exact-family actions, exact-material breaks, any rewarded actions, gathering in distinct biomes and successfully delivered treasure finds. These are not item hand-ins. Back returns to the same category, filter and page. Camp and Local Introduction requirements still apply to Claim Reward, and no reward can be claimed twice for the same period; a confirmed claim closes the menu.

Completing a quest makes its reward available. Return to your active workstation, open the quest details and deliberately choose **Claim Reward** once, before its period ends. Daily quests follow the server's date, weekly quests use Monday-starting weeks, and monthly quests use calendar months. Your targets and rewards can differ from another tester's. If a claim is pending, keep its request reference and use `/forage review` instead of repeatedly trying to claim again.

<a id="participation-reward-upcoming"></a>

### Participation reward

Claim a daily quest reward and a weekly quest reward successfully to qualify. They can be claimed in either order and in different periods; simply finishing their objectives is not enough. Monthly quests do not replace the daily or weekly requirement. This extra participation reward is available only once per player, not once per day, week, camp or world.

Find **Participation Reward** in **Forage → Quests & Rewards** and read its daily/weekly progress. When delivery is enabled, claim deliberately at your own complete camp workstation after its Local Introduction; the item is never awarded automatically. Retained records of older successfully claimed daily/weekly quests can also count when your profile is loaded.

Your qualifying daily/weekly claims are remembered even while the participation reward is switched off. The button explains “Claiming is not open yet” and that progress is saved. The real map is not ready yet, so there is currently nothing to claim from this feature. The unfinished kit item is a placeholder, not the promised map reward. Continue claiming your ordinary quest rewards as usual.

**Skill Branches** gives focused bonuses for particular families: Herbalist, Woodsman, Trailkeeper, Cave Botanist, and Wild Alchemist are the defaults. Read each branch's level gate and affected families. Your first choice is free; later switches normally cost 250 Forage Points and require a 72-hour cooldown. The menu shows the current server rules.

Treasures are occasional extra finds, not guaranteed on a short trip. Keep inventory room: a find that cannot fit is skipped, not dropped on the ground or queued for later. Genuine Forage treasures are used in Repair & Merge and Greater Forage Dust; a vanilla item of the same material is not a substitute. Legendary Pulse Dust is a rare treasure outcome, so a brief session without one is normal.

## Camp Turn-Ins

After Local Introduction, **Camp Turn-Ins** offers reduced XP and points for eligible plain organic items. Its default limit is 192 items per submission with a 30-second cooldown. It scans your normal inventory, including the hotbar; read the preview and put any plain resources you want to keep into a chest first. Named, enchanted, custom, container-bearing, and Forage-marked items must remain untouched. Putting items into camp storage does not submit them.

Click **Accepted Turn-Ins**, or use `/forage sources turnins [page]`, to browse the complete accepted inventory-item list for the running server. **What Counts?** explains submission rules, and **Source Families** opens the gathering overview. Gathering blocks and creatures are a different list from accepted inventory items; those links do not change which items can be submitted.

Acceptance checks the item you submit, not how you obtained it. Eligible plain items bought from a shop or received from another player can qualify; no Forage-tool gathering provenance is required. Turn-Ins do not replace gathering quests, tool XP or Local Introduction gathering actions. Camp access, introduction completion, caps and cooldowns still apply.

Accepted Turn-Ins uses the running server's eligibility rules, including cocoa beans with the defaults. It shows up to 28 item types per page, with Previous/Next, an **About Accepted Turn-Ins** button to refresh the list, Back to Turn-Ins and a Public Turn-In Guide button that sends a clickable documentation link. Browsing submits nothing. Other incidental drops are not automatically accepted: sticks, saplings and poisonous potatoes remain outside the default list. Logs and calcite also remain excluded even though matching Forage tools can gather their source families. Glow berries are accepted inventory items; their cave-vine gathering blocks belong to a separate gathering family.

<a id="herbarium-upcoming"></a>

## Herbarium

**Available since build 742.** The Herbarium is your permanent personal plant-discovery journal. Open it from the hub or `/forage herbarium` to browse your collections and All Specimens away from camp. Show All, Missing and Discovered filters help you choose a route; each entry lists matching tools, accepted block forms and habitat guidance. Discovered entries retain the first date, world and biome. Collection themes do not add a separate biome checklist.

Gather each specimen through a successful normal Forage action. Picking up, buying or turning in a plant does not discover it. Wrong tools, placed resources, protected areas, invalid tools, caps and exhausted chunks still stop discovery. Vine tips/bodies, open/closed eyeblossoms and other listed aliases count once. Harvest pitcher crops only when fully mature.

Complete a fixed collection to qualify for its one-time CMI item kit. Preview and confirm at your own active camp after the Local Introduction; there is no cost or expiry. Claiming defaults off; the isolated beta enables owner-approved named-dirt placeholders for delivery tests, while authored reward acceptance remains separate. Your discoveries remain when camps move or rewards are claimed. Read the [complete Herbarium guide](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage-herbarium.md) for all twelve collections and every source.

<a id="seasonal-community-efforts-upcoming"></a>

## Seasonal Community Efforts

**Included in build 741; beta activation is verified.** Open **Community Cleanup** from Forage or use `/forage community` to see the current season. Your gathering, donated resources and donated treasures each have their own totals and daily cap. Meet all three personal minimums, and help the community meet all three goals. Bought items can support donations but cannot replace your own gathering.

The default personal requirements are 300 gathering actions, 300 resource items and 2 genuine Forage treasures; daily caps are 75 actions, 75 resource items and 1 treasure. All included worlds share those limits. Spring uses General/Nether/OneBlock; summer Wild/End/SkyGrid; fall General/Cave/ChunkBlock; winter Wild/SkyBlock/Acid. Only contributions while physically in that season's pool count. Donations require an active camp there and use backpack slots 9–35, keeping your hotbar and offhand untouched. The seasonal item list is separate from ordinary Camp Turn-Ins. **What Counts?** opens the seasonal rules and links to its exact lists: `/forage sources community [page]` for gathering and `/forage sources donations [page]` for resource items.

Seasons start at 00:00 Amsterdam time on March 1, June 1, September 1 and December 1. You cannot claim early. After the season ends, qualified participants claim manually at an active camp. An unclaimed reward becomes dormant six months later; pay five genuine treasures to claim that reward immediately. Completion history and streaks are based on qualifying seasons, not how quickly you claim.

Read the [complete seasonal guide](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage-community.md) for targets, source/item examples, claim rules and staff test controls. Ordinary gathering rules, camp ownership and pending-request protections still apply. This does not add plugin-managed Camp Storage.

## Complete accepted Turn-In item list

**Build-742 botanical defaults:** the generated list below contains 97 accepted types after the Herbarium source expansion. Use the in-game catalogue for your server’s actual acceptance rules.

<!-- BEGIN GENERATED FORAGE TURN-INS -->

This list is generated from source defaults through the same acceptance resolver used by Camp Turn-Ins. Server configuration can change it. There are **97 accepted item types** in these defaults; this does not mean every type can be obtained through ordinary survival harvesting.

Open **Accepted Turn-Ins** or `/forage sources turnins [page]` for the running server's exact inventory-item list. **What Counts?** explains submission rules; **Source Families** explains gathering families and does not expand Turn-In acceptance. Seasonal resource donations have their own list at `/forage sources donations [page]`.

These are inventory items, not a list of blocks that award gathering progress. Only plain vanilla stacks in your inventory, including the hotbar, qualify. Custom items and items outside those slots remain untouched. Camp readiness, the Local Introduction, cooldown and daily XP allowance still apply.

### Farm Herbs turn-ins

Family ID: `crops`. 13 item types.

- Beetroot (`BEETROOT`).
- Beetroot Seeds (`BEETROOT_SEEDS`).
- Carrot (`CARROT`).
- Chorus Flower (`CHORUS_FLOWER`).
- Chorus Fruit (`CHORUS_FRUIT`).
- Chorus Plant (`CHORUS_PLANT`).
- Cocoa Beans (`COCOA_BEANS`).
- Glow Berries (`GLOW_BERRIES`).
- Nether Wart (`NETHER_WART`).
- Potato (`POTATO`).
- Sweet Berries (`SWEET_BERRIES`).
- Wheat (`WHEAT`).
- Wheat Seeds (`WHEAT_SEEDS`).

### Wild Flora turn-ins

Family ID: `flora`. 43 item types.

- Allium (`ALLIUM`).
- Azure Bluet (`AZURE_BLUET`).
- Blue Orchid (`BLUE_ORCHID`).
- Bush (`BUSH`).
- Cactus Flower (`CACTUS_FLOWER`).
- Closed Eyeblossom (`CLOSED_EYEBLOSSOM`).
- Cornflower (`CORNFLOWER`).
- Crimson Roots (`CRIMSON_ROOTS`).
- Dandelion (`DANDELION`).
- Dead Bush (`DEAD_BUSH`).
- Fern (`FERN`).
- Firefly Bush (`FIREFLY_BUSH`).
- Large Fern (`LARGE_FERN`).
- Leaf Litter (`LEAF_LITTER`).
- Lilac (`LILAC`).
- Lily Of The Valley (`LILY_OF_THE_VALLEY`).
- Lily Pad (`LILY_PAD`).
- Nether Sprouts (`NETHER_SPROUTS`).
- Open Eyeblossom (`OPEN_EYEBLOSSOM`).
- Orange Tulip (`ORANGE_TULIP`).
- Oxeye Daisy (`OXEYE_DAISY`).
- Peony (`PEONY`).
- Pink Petals (`PINK_PETALS`).
- Pink Tulip (`PINK_TULIP`).
- Pitcher Plant (`PITCHER_PLANT`).
- Poppy (`POPPY`).
- Red Shrub (`RED_SHRUB`).
- Red Tulip (`RED_TULIP`).
- Rose Bush (`ROSE_BUSH`).
- Seagrass (`SEAGRASS`).
- Short Dry Grass (`SHORT_DRY_GRASS`).
- Short Grass (`SHORT_GRASS`).
- Sunflower (`SUNFLOWER`).
- Tall Dry Grass (`TALL_DRY_GRASS`).
- Tall Grass (`TALL_GRASS`).
- Torchflower (`TORCHFLOWER`).
- Twisting Vines (`TWISTING_VINES`).
- Vine (`VINE`).
- Warped Roots (`WARPED_ROOTS`).
- Weeping Vines (`WEEPING_VINES`).
- White Tulip (`WHITE_TULIP`).
- Wildflowers (`WILDFLOWERS`).
- Wither Rose (`WITHER_ROSE`).

### Field Fruit turn-ins

Family ID: `fruits`. 8 item types.

- Apple (`APPLE`).
- Bamboo (`BAMBOO`).
- Cactus (`CACTUS`).
- Kelp (`KELP`).
- Melon (`MELON`).
- Melon Slice (`MELON_SLICE`).
- Pumpkin (`PUMPKIN`).
- Sugar Cane (`SUGAR_CANE`).

### Canopy Finds turn-ins

Family ID: `leaves`. 14 item types.

- Acacia Leaves (`ACACIA_LEAVES`).
- Azalea Leaves (`AZALEA_LEAVES`).
- Birch Leaves (`BIRCH_LEAVES`).
- Cherry Leaves (`CHERRY_LEAVES`).
- Dark Oak Leaves (`DARK_OAK_LEAVES`).
- Flowering Azalea Leaves (`FLOWERING_AZALEA_LEAVES`).
- Jungle Leaves (`JUNGLE_LEAVES`).
- Mangrove Leaves (`MANGROVE_LEAVES`).
- Oak Leaves (`OAK_LEAVES`).
- Orange Poplar Leaves (`ORANGE_POPLAR_LEAVES`).
- Pale Oak Leaves (`PALE_OAK_LEAVES`).
- Red Poplar Leaves (`RED_POPLAR_LEAVES`).
- Spruce Leaves (`SPRUCE_LEAVES`).
- Yellow Poplar Leaves (`YELLOW_POPLAR_LEAVES`).

### Moss and Roots turn-ins

Family ID: `moss`. 11 item types.

- Azalea (`AZALEA`).
- Big Dripleaf (`BIG_DRIPLEAF`).
- Flowering Azalea (`FLOWERING_AZALEA`).
- Mangrove Roots (`MANGROVE_ROOTS`).
- Moss Block (`MOSS_BLOCK`).
- Moss Carpet (`MOSS_CARPET`).
- Muddy Mangrove Roots (`MUDDY_MANGROVE_ROOTS`).
- Pale Hanging Moss (`PALE_HANGING_MOSS`).
- Pale Moss Block (`PALE_MOSS_BLOCK`).
- Pale Moss Carpet (`PALE_MOSS_CARPET`).
- Small Dripleaf (`SMALL_DRIPLEAF`).

### Mushrooms turn-ins

Family ID: `mushrooms`. 8 item types.

- Brown Mushroom (`BROWN_MUSHROOM`).
- Brown Mushroom Block (`BROWN_MUSHROOM_BLOCK`).
- Crimson Fungus (`CRIMSON_FUNGUS`).
- Mushroom Stem (`MUSHROOM_STEM`).
- Red Mushroom (`RED_MUSHROOM`).
- Red Mushroom Block (`RED_MUSHROOM_BLOCK`).
- Shelf Mushroom (`SHELF_MUSHROOM`).
- Warped Fungus (`WARPED_FUNGUS`).

<!-- END GENERATED FORAGE TURN-INS -->

## Care for tools and make dust

Use **Upgrade Tool** with the tool to improve in your main hand. Tier upgrades, supported diamond refinements, and compatible Forage enchantments each show their own level, money, and point requirements. Shears, brushes, and maces have no diamond refinement. Improvements preserve the tool's progression; a tier upgrade does not repair it.

For **Repair & Merge**, hold the tool to keep in your main hand, put a matching Forage tool type in your offhand as the donor, and carry a genuine Forage treasure. Confirm only after reviewing the money/point costs: the donor and treasure are consumed. Repair restores a limited amount of durability and transfers some donor XP. By default, a tool locks at five durability remaining so it can be repaired before breaking.

Forage tools cannot use ordinary anvils, enchanting tables, grindstones, smithing, crafting repairs, unauthorized Mending, or other plugins' repair/enchant services. The Mending Upgrade below, included from build 745, is the only added XP-repair exception; its enchantment must be purchased through Forage. If a tool pauses for review, retain it and tell staff; renaming or stripping its identity is not a repair. Normal storage, dropping, and replacement purchases remain available.

<a id="mending-upgrade"></a>

**Optional Mending I, introduced in build 745 and verified on build 746:** Player acceptance remains open; the native probe used synthetic repair events, not a real client collecting XP. Tool Upgrades lets you buy Mending once for a Tier III or higher Forage tool. All eight tool types are eligible by default. Use your owned active camp after its Local Introduction, with the tool in your main hand. The held-tool level requirement defaults to 1; there is no extra player-level gate for this purchase. Its base price is $10,000 and 250 Forage Points; the default `normal` balance multiplier makes it **$9,000 and 225 Points**. Check the displayed price before confirming.

**Active balance from build 749:** a new Mending purchase consumes **3 genuine Forage treasures per tool**, in any mix, as well as the unchanged money and Points price above. The treasure cost is unscaled. First reach **50 lifetime successful rewarded Forage gathering actions**, including creature actions; past qualifying actions count. That personal unlock is not spent. Quest rewards and Turn-Ins do not count, and purchasing Mending does not deduct XP. Put genuine Forage treasures in the inventory rows above your hotbar. Items in the hotbar, offhand or containers are kept. Genuine traded treasures also count; ordinary or renamed items do not. These additions follow the historical build-746 verification and do not affect already-purchased Mending.

The purchased improvement stays with the tool if you trade it. It lets ordinary Minecraft XP repair the tool up to **100%**, including in your offhand and at the five-durability safety lock. Buying the enchantment does not repair it immediately. XP repair grants no Forage progress or points and does not reset gathering limits. Repair & Merge keeps its existing donor, treasure and durability-cap rules. Disabling later purchases does not remove a tool's already-approved Mending.

**Forage Dust** crafting uses plain bone meal, money, and points at an active camp. The default standard batch makes eight radius-3 dust; the greater batch makes four radius-6 dust and also consumes two Forage treasures. Read the current recipe before confirming. Hold dust in your main hand and right-click a suitable growing block; already-owned dust can be used away from camp in an allowed area.

Successful growth uses one dust and shares a 45-second default cooldown. Dust does not award Forage XP or points. If no target accepts a pulse, the item stays with you. Crops and saplings follow normal growth rules; 26.3 adds poplar saplings, spreading red shrubs, and shelf mushrooms that can grow larger. Lack of space or a fully grown mushroom can prevent growth. A growth crossing a protected boundary should be cancelled rather than partly growing into it.

## Review Recent Activity

Choose **Recent Activity** in the hub or run `/forage recent [page]` to open the same personal history. The command works away from camp and while Forage gameplay is paused. It shows only your own entries and gives no camp access, reward claim or extra progress.

Successful gathering records earned XP and points immediately. The list also includes treasure and level-up notices, quest progress notices and reward-ready updates, branch/turn-in/dust notices, and Forage warnings with their reason and next steps. Repeating the same warning within 30 seconds adds no duplicate entry. Pending chat summaries are already visible here; history keeps recording with chat batching off.

Read the newest entries first, use Previous/Next for older entries, and Refresh for the latest. Entries show a category, time and readable wrapped details. Back returns to the hub; Close exits. By default the last 25 entries are kept, eight per page, and an empty history explains that nothing has been recorded yet. Disconnecting or restarting the plugin clears this temporary history; a Forage configuration reload keeps it. Use `/forage review` for saved transaction requests instead of relying on Recent Activity as a permanent receipt.

## Repair or move a camp

| What happened | What changes | What is preserved |
| --- | --- | --- |
| Secondary Camp is missing a required block | That camp's activities stop | Registration, introduction progress, global progress |
| Initial Camp is incomplete or missing | Activities at every camp stop | All registrations and global progress |
| Camp is repaired and revalidated | Activities resume when requirements are met | The same camp's introduction progress |
| Camp is explicitly unclaimed | Its registration and occupied location are released | Global progress and reward history |
| Replacement camp is registered | New camp needs its Local Introduction | Global points, XP, quests, and previously claimed rewards |

Breaking a block does not free a slot automatically. This keeps your registration while you rebuild, and stops broken camps from turning into extra slots. Explicitly unclaim before moving the registration elsewhere.

If your Initial Camp breaks, the other two are still yours, but their workstations will explain that you must restore or replace your Wild camp first. An Initial Camp destroyed by a world reset also needs a qualifying replacement. Your progress is not reset, and previously claimed rewards cannot be claimed again.

Forage camp ownership is not a general land claim. Follow the world's normal building and protection rules. A Forage registration does not give permission to build on someone else's island or protected land.

## Commands

| Command | What it helps with |
| --- | --- |
| `/forage` | Open the overview and guidance; activities require the workstation. |
| `/forage info` | Read the introduction and open the public guide. |
| `/forage help` | List commands available to you. |
| `/forage next` | The next personal step, including Initial Camp repair and Local Introduction. |
| `/forage guide` | Camp construction, first tool, and getting started. |
| `/forage status` | Current progression, camp/tool state, and a next-step summary. |
| `/forage stats` | Player progression and held-tool details. |
| `/forage limits` | Current daily limits, costs, and reward ranges. |
| `/forage recent [page]` | Your read-only Recent Activity history, anywhere and while gameplay is paused. |
| `/forage sources [tool] [page]` | Complete read-only gathering list; uses the held Forage tool or opens the picker. `/forage source` is an alias. |
| `/forage inspect` | Summarize the looked-at block within six blocks, with clickable Source details. |
| `/forage source <name>` | Find an exact or partial source name; choose from paginated matches when needed. |
| `/forage source block <name>` | Search block sources explicitly. |
| `/forage source creature <name>` | Search creature sources explicitly. |
| `/forage source search <name>` | Search sources even when the name matches a tool, family or control. |
| `/forage sources families [page]` | Browse gathering families and their matching tools. |
| `/forage sources family <id> [page]` | Open one family's gathering sources; a bare family ID also works unless it matches a tool ID. |
| `/forage sources turnins [page]` | Exact ordinary Camp Turn-In inventory-item list. |
| `/forage sources community [page]` | The current season's gathering sources. |
| `/forage sources donations [page]` | The current season's resource-donation items. |
| `/forage camp` | Inspect the nearby camp and its registration checklist. |
| `/forage camp list` | Find your registrations and their IDs. |
| `/forage camp register` | Open the deliberate registration action. |
| `/forage camp revalidate` | Recheck and confirm your repaired registration. |
| `/forage camp unclaim [registration-UUID]` | Review a release confirmation; global progress is kept. |
| `/forage review` | Inspect a pending request and obtain the reference to share with staff. |

`/forage shop`, `/forage quests`, `/forage branches`, `/forage tools`, `/forage compost`, `/forage dust`, `/forage top`, and `/forage tips` direct you to the corresponding workstation activity. They do not create a remote camp visit. Use the buttons after sneak-right-clicking your own registered composter.

## Player FAQ

**Why does a finished tent still refuse registration?** Check the real biome at the composter, Survival mode, allowed world, overlap, distance, and remaining slots. The Requirements book shows the physical checklist; hover the action button for its separate registration blocker.

**Why are rewards locked at 30/30?** Open Local Introduction and submit the eight eligible plain items explicitly. Camp Turn-Ins is a different activity and cannot finish that step for you.

**Why does an ordinary tool, wrong tool, or crafted block give no progress?** Forage needs a genuine curated tool and one of its configured sources. The tool may still perform its normal Minecraft action without a Forage reward. Check the complete source catalogue or `/forage sources` and `/forage limits`. `/forage inspect`, `/forage source <name>` and the wrong-tool warning’s Source details link identify the matching tools for that source.

**Why does my Secondary Camp stop working after I change Wild?** Every workstation depends on a valid Initial Camp. Repair and revalidate that registration, or replace it with another qualifying Initial Camp. Your global points and claimed-reward history remain saved.

**Do I have to earn every reward in the world where I claim it?** No. Each camp needs its own Local Introduction, after which global progress is available there. Items still obey the server's normal inventory-sharing rules.

**Can I move my camp without resetting my character?** Yes. Unclaim the old registration and deliberately register a replacement. Global progress stays, but the new registration starts its own Local Introduction. Breaking the composter alone does not release the old slot.

**Are shared storage and community objectives ready to test?** Seasonal Community Efforts are active on the maintained beta and ready for the checklist cases; the seasonal kits are still test placeholders. Plugin-managed Camp Storage remains unimplemented. A chest/barrel currently satisfies the physical checklist and otherwise behaves as ordinary storage. Extra-heart rewards, other-plugin point rewards, and fishing tournaments are future possibilities. Quest item rewards can use configured CMI kit templates through `reward-kit`; confirm the host has configured the kit mappings before testing them.

## Common blockers

- **“Initial Camp is invalid.”** Restore the missing requirements in Wild and revalidate it, or register a valid replacement.
- **“Rewards locked at this camp.”** Complete its local gathering target, return, and submit the introduction items.
- **“Camp belongs to another player” or “overlaps another camp.”** Choose a separate location with its own features.
- **“World unavailable.”** Staff may need to correct its mapping or whitelist; changing the name of a camp does not bypass the world rule.
- **“Checking your Initial Camp.”** Its area needs verification. Wait for that result and retry; no items or points should be spent by a pending validation.
- **“Request needs review.”** Keep the request reference and use `/forage review`. Do not repeat an uncertain purchase hoping it will deliver twice.

Read the [main Forage reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md) for full tool, source-family, cost, quest, and configuration details. Use the [beta test checklist](/staff-reference/plugins/forage-checklist/) to record your results; staff can use the [technical guide](/staff-reference/plugins/forage/) for world mappings, recovery, and verification requirements.
