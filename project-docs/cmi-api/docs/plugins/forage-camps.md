# Forage: player guide

**Reviewed 9 October 2026 for the 26.3 beta.** This guide describes the implemented camp and gathering flow. Availability, prices, caps, and enabled sources depend on the server; live activation remains separate from beta testing.

Forage is hands-on gathering with your own tools and camps. You keep one set of Forage XP, points, quests, limits, and reward history wherever you play. Your camps determine where you can submit finds and claim those benefits.

## How Players Use It

Available features include:

- Eight curated tool types with matching gathering sources and their own tool progression.
- One Initial Camp and up to two Secondary Camps, each with a Local Introduction.
- Shared player XP, Forage Points, daily limits, and skill branch progress.
- Daily, weekly, and monthly quests with deliberate camp reward claims.
- Camp Turn-Ins, tool upgrades, Repair & Merge, and Forage Dust crafting.
- Occasional treasures, leaderboards, progress guidance, and request review.

For the beta session, work through the [in-game test checklist](forage/checklist.md) and record what happened alongside the expected result. Staff setup and recovery are covered in the [technical guide](forage-camp-technical.md).

## Start in Wild

Use `/forage next` when you are unsure what to do. Before you have an Initial Camp, it points you to **Dappled Forest in `/wild`**, then `/forage camp` to check the workstation and required blocks. On a test server where Wild is mapped to another world, the hint recognizes when you are already in the mapped Wild world. If the server later approves more Initial Camp worlds, the hint follows that configuration.

`/next` includes Forage among the server's available activities. `/next guide forage` opens the short camp, tool, and gathering checklist. `/guidance` controls optional hints, their frequency, and hidden or postponed hints; you can still request `/forage next` with optional hints switched off.

Your first camp must be in **Dappled Forest in Wild**. Find a vanilla Abandoned Camp and complete it, or build your own using the same checklist. Discovering a structure or clicking a composter does not claim it automatically. Inspect the camp with `/forage camp`, add what is missing, and deliberately register it.

Use `/forage camp register` to open the registration page, then click its **Register Initial** or **Register Secondary** button to confirm. `/forage camp list` shows your registrations, `/forage camp revalidate` opens the page to confirm a repaired camp, and `/forage camp unclaim [registration-UUID]` opens a deliberate release confirmation.

**Register and revalidate in Survival mode.** You can inspect the checklist while in Creative, but cannot claim the camp there. Hover over the composter button to see the blocker, such as **“Not ready yet: Survival mode required.”** Clicking it also explains the reason in chat: **“You are in Creative mode. Survival mode is required to register or revalidate a camp.”** Other blockers, such as missing blocks, overlap, distance, or access, have their own explanation.

The biome requirement applies to every replacement Initial Camp as well. A tent made from poplar and wool outside Dappled Forest does not qualify. Other biomes' abandoned structures are useful decoration, but they cannot become your Initial Camp.

Keep the composter near the center of the camp, with the shelter and campfire nearby. The default scan reaches ten blocks horizontally and six blocks above and below it. Features outside that box do not count.

## Build the checklist

| Feature | Default minimum | What counts |
| --- | ---: | --- |
| Camp Anchor | 1 | Composter at the registered location |
| Shelter | 24 blocks | Full wool, wool stairs, and wool slabs in any color |
| Supports | 6 blocks | Fence blocks, including nether brick fences; not gates or walls |
| Fire | 1 | Campfire or soul campfire |
| Storage | 1 | Chest, trapped chest, or barrel |
| Crafting station | 1 | Crafting table |

Existing suitable blocks count, so you do not need to rebuild a vanilla tent beside itself. The camp page shows counted requirements and shortages: for example, “Shelter 21/24: add 3 wool blocks, stairs, or slabs” and “Supports 5/6: add 1 fence.” A missing composter or crafting table is shown as a missing workstation.

Wool carpets do not count as shelter. A double wool slab counts as one occupied block position. The whole camp scan must fit inside the world's build height.

The **Requirements** book glows when the physical camp checklist is complete. The **Register Initial**, **Register Secondary**, or **Revalidate Camp** button glows only when the action's other requirements are also met. A complete build can therefore have a glowing book while registration remains blocked in Creative mode. The button and chat explain what still needs to change; the plugin checks again when you click.

You can choose your layout and redesign it later. The plugin checks the required features within your camp, rather than demanding one exact schematic. Cushions, lanterns, trees, and straw beds make the camp more comfortable but are not part of the default minimum.

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

For block routes, **break** a configured source with the matching tool in your main hand. The Brush route rewards block breaking, not completion of vanilla archaeology brushing. For sword/mace routes, make a matching melee hit and keep holding that tool type until the mob dies within ten seconds. Inspect **Tools & Families** for the server's complete enabled source lists. Poplar saplings and crafted poplar building blocks are not gathering sources.

Player Forage level, a tool's level, and its tier are different. The four later tool types unlock when you carry a level-2 Forage tool; a tool left in a chest cannot satisfy the shop check. Each rewarded action can advance player XP, points, the held tool, the matching skill branch, and applicable quests.

Use `/forage limits` to check personal and source-family daily caps. A capped family or exhausted chunk can stop rewards while ordinary harvesting and tool wear continue. Move to another eligible chunk or try a different family, subject to your remaining personal cap. A different camp or world does not reset your daily allowances.

## Quests, branches, and treasures

At an active workstation, open **Quests & Rewards** to inspect daily, weekly, monthly, and ready-to-claim quests. Valid rewarded gathering advances applicable quests automatically. Follow the actual objective shown on your card: visiting a biome without gathering there is insufficient, and a material quest needs that exact material. Turn-ins, dust use, and staff-granted XP do not count as gathering actions.

Completing a quest makes its reward available. Return to your active workstation and deliberately claim it once, before its period ends. Daily quests follow the server's date, weekly quests use Monday-starting weeks, and monthly quests use calendar months. Your targets and rewards can differ from another tester's. If a claim is pending, keep its request reference and use `/forage review` instead of repeatedly trying to claim again.

**Skill Branches** gives focused bonuses for particular families: Herbalist, Woodsman, Trailkeeper, Cave Botanist, and Wild Alchemist are the defaults. Read each branch's level gate and affected families. Your first choice is free; later switches normally cost 250 Forage Points and require a 72-hour cooldown. The menu shows the current server rules.

Treasures are occasional extra finds, not guaranteed on a short trip. Keep inventory room: a find that cannot fit is skipped, not dropped on the ground or queued for later. Genuine Forage treasures are used in Repair & Merge and Greater Forage Dust; a vanilla item of the same material is not a substitute. Legendary Pulse Dust is a rare treasure outcome, so a brief session without one is normal.

## Turn in finds, care for tools, and make dust

After Local Introduction, **Camp Turn-Ins** offers reduced XP and points for eligible plain organic items. Its default limit is 192 items per submission with a 30-second cooldown. It scans your normal inventory, including the hotbar; read the preview and put any plain resources you want to keep into a chest first. Named, enchanted, custom, container-bearing, and Forage-marked items must remain untouched. Putting items into camp storage does not submit them.

Use **Upgrade Tool** with the tool to improve in your main hand. Tier upgrades, supported diamond refinements, and compatible Forage enchantments each show their own level, money, and point requirements. Shears, brushes, and maces have no diamond refinement. Improvements preserve the tool's progression; a tier upgrade does not repair it.

For **Repair & Merge**, hold the tool to keep in your main hand, put a matching Forage tool type in your offhand as the donor, and carry a genuine Forage treasure. Confirm only after reviewing the money/point costs: the donor and treasure are consumed. Repair restores a limited amount of durability and transfers some donor XP. By default, a tool locks at five durability remaining so it can be repaired before breaking.

Forage tools cannot use ordinary anvils, enchanting tables, grindstones, smithing, crafting repairs, Mending, or other plugins' repair/enchant services. Keep approved upgrades and repairs inside Forage. If a tool pauses for review, retain it and tell staff; renaming or stripping its identity is not a repair. Normal storage, dropping, and replacement purchases remain available.

**Forage Dust** crafting uses plain bone meal, money, and points at an active camp. The default standard batch makes eight radius-3 dust; the greater batch makes four radius-6 dust and also consumes two Forage treasures. Read the current recipe before confirming. Hold dust in your main hand and right-click a suitable growing block; already-owned dust can be used away from camp in an allowed area.

Successful growth uses one dust and shares a 45-second default cooldown. Dust does not award Forage XP or points. If no target accepts a pulse, the item stays with you. Crops and saplings follow normal growth rules; 26.3 adds poplar saplings, spreading red shrubs, and shelf mushrooms that can grow larger. Lack of space or a fully grown mushroom can prevent growth. A growth crossing a protected boundary should be cancelled rather than partly growing into it.

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
| `/forage camp` | Inspect the nearby camp and its registration checklist. |
| `/forage camp list` | Find your registrations and their IDs. |
| `/forage camp register` | Open the deliberate registration action. |
| `/forage camp revalidate` | Recheck and confirm your repaired registration. |
| `/forage camp unclaim [registration-UUID]` | Review a release confirmation; global progress is kept. |
| `/forage review` | Inspect a pending request and obtain the reference to share with staff. |

`/forage shop`, `/forage quests`, `/forage branches`, `/forage tools`, `/forage compost`, `/forage dust`, `/forage top`, `/forage recent`, and `/forage tips` direct you to the corresponding workstation activity. They do not create a remote camp visit. Use the buttons after sneak-right-clicking your own registered composter.

## Player FAQ

**Why does a finished tent still refuse registration?** Check the real biome at the composter, Survival mode, allowed world, overlap, distance, and remaining slots. The Requirements book shows the physical checklist; hover the action button for its separate registration blocker.

**Why are rewards locked at 30/30?** Open Local Introduction and submit the eight eligible plain items explicitly. Camp Turn-Ins is a different activity and cannot finish that step for you.

**Why does an ordinary tool, wrong tool, or crafted block give no progress?** Forage needs a genuine curated tool and one of its configured sources. The tool may still perform its normal Minecraft action without a Forage reward. Check Tools & Families and `/forage limits`.

**Why does my Secondary Camp stop working after I change Wild?** Every workstation depends on a valid Initial Camp. Repair and revalidate that registration, or replace it with another qualifying Initial Camp. Your global points and claimed-reward history remain saved.

**Do I have to earn every reward in the world where I claim it?** No. Each camp needs its own Local Introduction, after which global progress is available there. Items still obey the server's normal inventory-sharing rules.

**Can I move my camp without resetting my character?** Yes. Unclaim the old registration and deliberately register a replacement. Global progress stays, but the new registration starts its own Local Introduction. Breaking the composter alone does not release the old slot.

**Are shared storage and community objectives ready to test?** Plugin-managed Camp Storage and Community Efforts are not implemented features of this release. A chest/barrel currently satisfies the physical checklist and otherwise behaves as ordinary storage. Extra-heart rewards, other-plugin point rewards, Forage kits, and fishing tournaments are also future possibilities, not promised beta activities.

## Common blockers

- **“Initial Camp is invalid.”** Restore the missing requirements in Wild and revalidate it, or register a valid replacement.
- **“Rewards locked at this camp.”** Complete its local gathering target, return, and submit the introduction items.
- **“Camp belongs to another player” or “overlaps another camp.”** Choose a separate location with its own features.
- **“World unavailable.”** Staff may need to correct its mapping or whitelist; changing the name of a camp does not bypass the world rule.
- **“Checking your Initial Camp.”** Its area needs verification. Wait for that result and retry; no items or points should be spent by a pending validation.
- **“Request needs review.”** Keep the request reference and use `/forage review`. Do not repeat an uncertain purchase hoping it will deliver twice.

Read the [main Forage reference](forage.md) for full tool, source-family, cost, quest, and configuration details. Use the [beta test checklist](forage/checklist.md) to record your results; staff can use the [technical guide](forage-camp-technical.md) for world mappings, recovery, and verification requirements.
