# Forage

Forage is a player-facing nature progression plugin for `/forage`. It targets the reviewed Paper 26.3 line with Java 25-compatible bytecode and depends on CMI, CMILib, and `1MB-CMIAPI-Lib`.

**Documentation review (2026-10-09): this guide covers the implemented beta features; live activation remains pending owner acceptance.** Live gameplay remains dormant until owner acceptance and activation. Development uses the maintained `servers/Paper-26.3/` instance on Java 27, with suite builds on JDK 25.0.4.1. The preserved 26.2 server is a rollback instance. Shipping the Forage JAR in a complete suite build does not activate it on live.

The tool-protection verification recorded suite build 726 with the then-current 65 managed JARs, 156 passing Forage tests, and a Paper 26.3 BETA 159 probe with 390 assertions. These are dated verification results, not the identity of a later beta-server build. See the [tool-protection verification](../compatibility-tests/forage-tool-protection-2026-10-07.md). The earlier build 724 plant probe passed 88 assertions on Paper 26.3 BETA 157 covering custom-tool rewards, native growth, dust consumption, and protection boundaries. See the [plant compatibility verification](../compatibility-tests/forage-26.3-plants-2026-10-06.md). The earlier build 705 camp-guidance follow-up passed 19 native assertions on Paper 26.3 ALPHA 49. Real-client acceptance remains separate from these synthetic-player checks.

Dormant Forage is excluded from `/next` recommendations, focus choices, first-success guides, and ScheduledTips promotion even though its JAR is loaded. ScheduledTips recognizes existing Forage tip IDs, text, and embedded commands automatically; see [tip feature requirements](scheduledtips.md#feature-availability-and-dormant-forage). Debug mode does not override dormancy. Saved progress and communication preferences remain available for a future activation.

The camp model reserves **one Initial Camp in Dappled Forest in Wild and two optional Secondary Camps in other approved worlds**, three total and one per actual world. Camps are exclusively owned and cannot overlap. The Initial Camp must remain valid for the other camps to function; damage or relocation never erases global XP, points, quests, limits, or reward history. Every new registration needs its own short Local Introduction before global benefits unlock there.

Start with the [player camp guide](forage-camps.md), use the [beta test checklist](forage/checklist.md) for hands-on testing, and read the [technical camp guide](forage-camp-technical.md) for staff setup, mappings, recovery, validation, security, and persistence. These supersede the older first-use anchor claims and tree-grove camp checklist. Planned Community Efforts, managed Camp Storage, and new external reward engines remain roadmap features.

Version 1 focuses on a testable core rather than the full long-term design. Players use curated PDC-marked Forage tools to earn Forage XP, Forage Points, skill branch progress, tool soul progress, daily, weekly, and monthly quest progress, leaderboard ranks, camp-only tool upgrades, camp turn-ins, and small treasure rolls from configured source families. Most v1 families are block-gathering routes; the later-unlocked sword and mace use configured entity kills. Normal tools still work as Minecraft tools, but they do not feed the Forage skill.

The long-term ideas, v2/v3 options, and shelved feature notes live in [forage-roadmap.md](forage-roadmap.md).

## Player Flow

Players open:

```text
/forage
```

The GUI uses the shared hardened GUI service with safe holders, cancelled clicks and drags, duplicate click protection, delayed close actions, and the global light-blue filler material. The v1 hub includes:

- tool shop
- player stats
- quest index with ready-to-claim, daily, weekly, and monthly pages
- skill branch picker
- read-only top boards for level, XP, points, actions, treasures, daily XP, and weekly XP
- tool/family explanation
- camp-only tool upgrades for held Forage tools, including tiers, supported diamond refinement, and controlled vanilla enchants
- camp-only Repair & Merge for worn Forage tools
- camp turn-ins for plain vanilla forage items
- multi-tier Forage Dust crafting and bounded growth pulses
- bounded camp material validation, explicit registration, and per-camp Local Introduction
- titled gameplay tips for camps, quests, branches, Repair & Merge, chunk exhaustion, turn-in rules, dust, and tool soul
- camp check with checklist, unlocks, and throttled ready feedback
- Getting Started first-run guide for camp setup, first tool, daily limits, quests, and tips
- personal `/forage limits` overview for daily caps, family route caps, economy costs, and quest reward ranges
- CMI ctext guide button through the configured `gui.info-command`
- `/menu` return button

`/forage guide`, `/forage status`, `/forage limits`, `/forage stats`, and camp inspection remain available away from a camp. Activity and reward authority comes from **sneak-right-clicking your own composter workstation**. A nearby camp, command shortcut, or old menu does not authorize a remote claim. The current camp and Initial Camp are checked again before actions consume or deliver anything.

Use `/forage camp register` to confirm a new registration, `/forage camp revalidate` after repair, `/forage camp list` to inspect your registrations, and `/forage camp unclaim [registration-UUID]` to release one deliberately. The initial role cannot become a third secondary role. Merely looking at an unclaimed anchor never registers it.

Registration and revalidation require Survival mode. The Requirements book can glow because the physical checklist is complete while the composter action still says **Not ready yet: Survival mode required.** The action button only glows when its full checks pass. Clicking a blocked action explains its current reason in chat, including the player's current game mode; it does not silently fail or trust an earlier readiness display.

Admin camp list/inspection and safe release remain recovery tools. Legacy claims are retained for owner review instead of being silently accepted as qualifying Initial Camps. Staff mutations must obey the new registration rules; consult the technical guide before changing claims or world mappings.

`config.yml` also includes a top-level `enabled` toggle. When it is set to `false`, Forage becomes a player-facing emergency shutdown: normal gameplay progress stops, camp turn-ins and dust do nothing, player GUIs stop opening, and `/menu` hides the Forage button when Menu notices the toggle on the next open. Help, info, debug, and safe admin inspection/reload commands still work so staff can investigate and recover.

Forage now separates player progression XP from tool soul XP. Player XP and Forage Points are tuned for account progression, while tool XP is tuned for tool upgrades and soul growth. This lets staff slow down live upgrades without making repairs or basic participation feel punishing.

Forage only awards progress when:

- the plugin is enabled
- the player is in an allowed world and is not in Creative or Spectator mode
- persistence is healthy and no earlier Forage transaction is still pending
- the player breaks a configured source block or kills a configured source entity
- the player is holding the matching PDC-marked Forage tool
- the daily cap has not been reached
- the matching source-family daily cap has not been reached
- the chunk/source family is not exhausted
- the WorldGuard global-only check passes when WorldGuard is installed and enabled

The global daily cap limits one player’s rewarded gathering across families for the day. The source-family daily caps are separate: if shears/leaves are capped, a player can switch to a shovel, axe, sickle, pickaxe, brush, sword, or mace route and keep playing until those families also cap. This encourages variety without making one exhausted route feel like the whole feature is over for the day.

Following the 11 October 2026 configuration reload, the beta server’s daily allowances under the `normal` preset are **3,125 player XP or 1,500 actions globally**, and **875 XP or 344 actions for every source family**, whichever applicable limit is reached first. This raises the previous 2,500/1,200 global and 700/275 family thresholds by 25%, rounding the family action limit up to a whole action. The next synchronized suite build uses these values as defaults; existing server configurations retain their saved thresholds unless staff change them. Raising the caps preserves today's recorded usage, XP, points and quest progress rather than resetting them. Check `/forage limits` for the effective personal limits.

Local exhaustion remains 75 actions in a chunk/source family followed by 30 minutes of rest. Presets and staff configuration can change limits. Changing area helps local exhaustion, changing family helps a family cap, and neither bypasses a global cap.

When a chunk/source family becomes exhausted, Forage both records the event in the batched recent summary and sends a short immediate warning so players do not keep wasting actions in the same area.

When daily caps or chunk exhaustion pause reward progress, the curated tool still keeps its own use count and durability state updated. XP, points, branch progress, and quests pause, but the tool does not pretend it was never used.

## Player FAQ

### Why does my normal tool give no Forage XP?

Progress needs the matching marked Forage tool and a supported block or creature source. Start with `/forage guide` and your camp’s tool shop; an ordinary Minecraft tool does not feed Forage progression.

### Why do menus tell me to return to camp?

Camp activities need a current session opened by sneak-right-clicking your own composter. Complete that camp’s Local Introduction to unlock rewards, branches, upgrades, repairs, turn-ins, and dust crafting. Starter-tool shopping is available before the introduction is complete. `/forage camp` explains missing requirements; merely standing near a camp is insufficient.

### Why did XP stop while my tool still wore down?

Daily caps, source-family caps, or local chunk exhaustion can pause reward progress while tool use and durability still count. Check `/forage limits`; switch to another uncapped family or area when the message allows it.

### How do I claim quests?

Return to your fully active camp, sneak-right-click its composter, and open Quests & Rewards. Choose an eligible quest and follow its requirements. Finish that camp’s Local Introduction first; a command alone cannot authorize a reward claim.

### How do I repair or upgrade a Forage tool?

Use your camp’s Upgrade Tool or Repair & Merge page. Review the money, point, level, and item costs; Repair & Merge consumes a matching offhand tool and treasure. Ordinary repair and enchanting routes are blocked.

## V1 Tools

Default tools are:

| Tool | Material | Source Families | Default Unlock |
| --- | --- | --- | --- |
| Forage Sickle | `COPPER_HOE` | flora, crops, mushrooms | starter |
| Forage Axe | `COPPER_AXE` | logs, fruits | starter |
| Forage Trowel | `COPPER_SHOVEL` | moss | starter |
| Forage Shears | `SHEARS` | leaves | starter |
| Forage Pickaxe | `COPPER_PICKAXE` | stone, cave | any Forage tool level 2 |
| Forage Brush | `BRUSH` | relics, sands | any Forage tool level 2 |
| Forage Sword | `COPPER_SWORD` | creature_drops | any Forage tool level 2 |
| Forage Mace | `MACE` | danger_drops | any Forage tool level 2 |

Bring the level-2 tool in your carried inventory when buying an unlocked tool; the shop does not inspect tools left in chests. Tool **level**, tool **tier**, and player **Forage level** are separate values. Check the shop card and `/forage stats` before spending. The four later tool types are shop unlocks, not automatically tier-II items.

Examples of default gathering sources:

| Tool | Useful first sources |
| --- | --- |
| Sickle | short grass, dandelions, wheat crops, red/brown mushrooms, red shrubs, shelf mushrooms |
| Axe | oak/poplar logs, pumpkins, melons, sugar cane, bamboo |
| Trowel | moss blocks, moss carpet, azaleas, dripleaf |
| Shears | oak leaves and red/orange/yellow poplar leaves |
| Pickaxe | calcite, tuff, basalt, end stone, glow lichen, rooted dirt |
| Brush | sand, red sand, gravel, clay, suspicious sand/gravel |
| Sword | cows, sheep, chickens, rabbits, squid |
| Mace | zombies, skeletons, creepers, blazes, breezes, shulkers |

Block routes award progress when you **break** a configured block with the matching tool. The Brush route is a block-breaking route, not a reward for completing vanilla archaeology brushing. The list above is a starting point. The workstation’s Tools & Families page shows up to five examples per family; server configuration defines the complete enabled list. There is no expandable in-game source catalog yet.

Default family ownership is intentionally non-overlapping: one source family belongs to one matching tool. For example, logs and pumpkins belong to the axe, leaves belong to shears, moss belongs to the trowel, cave/stone finds belong to the pickaxe, dry/relic finds belong to the brush, gentle creature drops belong to the sword, and danger drops belong to the mace. This keeps players from buying multiple tools to farm the same source family.

Paper 26.3 gathering includes poplar logs and stripped poplar logs with the Forage Axe, red/orange/yellow poplar leaves with Forage Shears, and red shrubs and shelf mushrooms with the Forage Sickle. These use the existing family rewards, tool progression, quests, and caps. Saplings are planting stock, and crafted poplar building blocks are not gathering sources. The organic turn-in rules also recognize the new leaves, shrubs, and mushrooms when they are plain vanilla items.

Sword and mace Forage progress is entity-based. The sword listens to configured gentle creature entities such as cows, sheep, chickens, squids, rabbits, and turtles. The mace listens to configured danger entities such as shulkers, blazes, breezes, wither skeletons, ghasts, and phantoms. The plugin records a short-lived matching-tool melee hit and only awards progress if that same player is still holding the same curated tool type when the entity dies, within ten seconds of the recorded hit. The plugin does not register fragile custom enchants or rewrite vanilla loot tables for those routes; it awards Forage XP/points/treasure rolls when the matching curated tool is used for a configured entity source.

Tools are PDC-marked with schema, tool id, tier, tool XP, tool level, and use count. Lore includes a fake Foraging level, tool soul progress bar, short tool personality line, supported families, and a warning that the tool is curated.

Forage tools can only be upgraded, refined, enchanted, or repaired through their own camp menus. The supported pages are **Upgrade Tool** and **Repair & Merge**. Players can buy replacement tools and discard unwanted ones; ordinary storage, inventory rearrangement, dropping, and disposal remain available. Tools still work as ordinary Minecraft tools on other sources without earning Forage rewards.

Protection covers anvils (including virtual anvils), enchanting tables, grindstones, smithing, crafting repairs, automated crafters, smelting/fuel conversion, hopper insertion into transforming workstations, dispenser use, and Mending. Entity interactions such as armadillo brushing also respect tool integrity and the safety lock. These guards remain active when Forage gameplay is dormant. The legacy `tools.block-*` switches are retained for configuration compatibility but cannot disable item protection.

Repair, rename, enchantment and item-edit commands recognize namespaces, registered aliases and configured alias chains. Core blocked prefixes are mandatory; `tools.blocked-repair-command-prefixes` can add restrictions. Checks cover the backpack, offhand, cursor and targeted online players, including console commands. A repair shortcut may be refused while carrying any Forage tool because providers differ in which inventory slots they modify.

CMI protection checks the public command-executor boundary, including direct commands dispatched by other plugins, plus its virtual-anvil repair and rename events. mcMMO's public checks reject repair, Super Repair, salvage and arcane salvage before their mutations. PyroMining Vessels, PyroFishing Augments and PyroWelcomes `/points` repair purchases are guarded at their actual provider callbacks. The points-shop guard reads the authenticated menu's configured commands and rejects a protected purchase **before points are deducted**. Unrelated points purchases remain available.

**Protection follow-up pending deployment:** the 11 October comparison with Halloween Virus found additional routes in ItemSoulBind, remotely targeted CMI commands and direct CMI aliases, plus PyroMining's admin `addvessel` command. The follow-up extends the shared provider guards and Forage recipient checks. These protections use the issued item's PDC identity, with no OP or permission bypass; ordinary items remain available. **Beta build 736 does not include these fixes, and a configuration reload cannot activate them.** See the [follow-up verification](../compatibility-tests/forage-protection-parity-2026-10-11.md) and checklist S04c–S04e before testing a newly deployed build.

**Pending the next synchronized suite build:** mcMMO Super Breaker, Tree Feller and Giga Drill Breaker activation is refused while a marked Forage tool is in the main hand, using mcMMO's public activation event. mcMMO may still show its right-click ready notice, but actual activation is cancelled before its buff or cooldown starts. If any of these three abilities is already active, block gathering with any marked Forage tool pauses until it expires or the player switches to an ordinary tool. Tree Feller's simulated block-break checks are silently refused for marked tools. Other simulated checks are only refused while one of these three abilities is active or its state cannot be checked. Forage ignores all mcMMO simulated breaks when awarding progress or showing family warnings, preventing false rewards and misleading wrong-tool messages for collateral leaves. Ordinary tools and unrelated mcMMO abilities retain their existing behavior. **This protection is not active in beta build 736; `/forage admin reload` cannot load it.** Until deployment, avoid using these abilities with Forage tools. This change does not add rewards for ability-expanded breaks or make axes gather the shears' leaf family.

The reviewed Pyro adapters support PyroMining **4.6.1**, PyroFishingPro **4.9.35**, PyroWelcomesPro **0.5.1**, and PyroLib **1.4.9/1.6.0**. Those providers expose no equivalent cancellable application/purchase event, so isolated, read-only reflection authenticates their inventory sessions; display titles and lore are not trusted. The shared callback wrapper lets Halloween Virus and Forage protect their own items together and preserves either guard when the other closes. `/forage debug runtime` reports integration readiness. Missing protection for an installed provider pauses affected tool use, purchases and improvements until staff review it. See [protected tool integrations](../tool-item-protection.md) for the shared adapter lifecycle and verification boundaries.

Each issued tool records its approved material, tier, name and enchantments in the existing Forage PDC namespace. Tool mechanics must retain their vanilla defaults; upgrades change only the aspects supported by Forage. Before use or a paid improvement, changed or malformed tools pause with an explanation. The separate durability record restores outside repairs. Already-applied Pyro Augment or Vessel data also pauses the tool; it is preserved for staff review instead of being erased. Unrelated foreign PDC and components remain intact. The durability record remains a backstop for arbitrary external item setters. DiscordChat's enchant menu rejects Forage tools before charging points.

Unchanged older base tools migrate automatically. Older refined or enchanted tools pause for staff to check their history, keeping XP, uses, items and unrelated metadata. Staff can inspect with `/forage admin inspectitem <player>` and review `/forage admin toolapprove <player>` before explicitly adding `confirm`. This approves only supported older items with valid original identity and durability records. It cannot reapprove an already-recorded tool that was changed outside Forage.

Forage tools can also freeze themselves at a low configured durability floor instead of breaking. By default they safety-lock at 5 durability remaining, stop working for block/tool actions, and must be restored through the owned composter workstation’s Repair & Merge page.

To reduce sneaky external repair routes, each curated tool also stores its last legitimate durability state in PDC. Periodic inventory audits and live tool checks restore that tracked durability if an outside command, GUI, Mending tick, or console-dispatched repair action tries to heal the tool without using Forage's own repair flow.

Forage tools can be upgraded through the owned composter workstation’s Upgrade Tool page, after that camp’s Local Introduction:

- the player must keep the owned workstation session valid and remain beside the active camp
- the main hand must hold the Forage tool to upgrade
- the next tier must be within `tools.max-tier`
- with the shipped `normal` preset, tier II needs player Forage level 12, `$25,000`, and `750` Forage Points; tier III needs level 24, `$60,000`, and `2,000` Forage Points. Other presets scale the money and point costs
- the player must meet the configured Forage level milestone
- the player pays configured Forage Points and CMI/Vault money
- the upgrade keeps existing tool XP, tool level, uses, and durability
- higher tiers increase valid Forage XP rewards according to the active preset: 20% per tier above tier I for `normal`, 25% for `testing`, and 15% for `live` or `grindy`

The same upgrade page also offers controlled improvements:

- supported copper or lower tools can refine to diamond material when the player meets the configured Forage level, held-tool level, money, and point costs
- sword, axe, pickaxe, shovel, and hoe-style tools can refine to the matching diamond variant where Minecraft provides one
- shears, brushes, and maces have no diamond variant, so they stay on their native materials
- compatible tools can receive plugin-owned Unbreaking I-III and Efficiency I-III, controlled by `tools.enchants.*`
- real vanilla enchants added by Forage are shown on the item, while outside enchant routes remain blocked
- improvement confirmations re-read the main-hand tool after durable preparation; changed inputs cancel before charging, while an uncertain effect is retained for manual review

Forage tools can be repaired only through the owned composter workstation’s Repair & Merge page:

- the player must keep the workstation session valid at an active camp whose Local Introduction is complete
- the main hand must hold the Forage tool to keep
- the offhand must hold a matching Forage tool type to consume, such as shears with shears
- one PDC-marked Forage treasure item is consumed
- the player pays configured Forage Points and CMI/Vault money
- the repair restores a configured durability percentage, capped by the player's Forage level
- a configured percentage of the offhand donor tool XP is transferred into the main-hand tool
- default repair tuning restores up to 40 percentage points per merge, capped at 70% durability below Forage level 10, 85% from level 10, and 100% from level 20; it transfers 50% of donor tool XP. Review the current money and point costs before confirming

## Skill Branches

Players choose an early Forage identity path through the active workstation’s Skill Branches page; `/forage branches` directs them there. Branches are intentionally small focused bonuses, not a full skill tree yet. A branch only applies when the player earns valid Forage progress from one of that branch's configured source families.

Default branches:

| Branch | Focus | Default gate |
| --- | --- | --- |
| Herbalist | flora and crops | level 1 |
| Woodsman | logs, leaves, and fruits | level 1 |
| Trailkeeper | dry finds, fruits, and flora | level 1 |
| Cave Botanist | cave growth, moss, and mushrooms | level 3 |
| Wild Alchemist | moss, crops, mushrooms, flora, and cave growth | level 5 |

Each branch can configure display name, description, icon, focused source families, XP multiplier, flat Forage point bonus, treasure chance multiplier, and required Forage level. The first branch choice is free. The shipped defaults allow later switches after a 72-hour cooldown for 250 Forage Points. Staff can change or disable switching. Profile data tracks the current branch, last branch change time, and per-branch XP, action, and treasure history.

## Quests and Treasures

Open Quests & Rewards at your active workstation and inspect the daily, weekly, monthly, and ready-to-claim pages. Quests count valid rewarded Forage actions automatically; no separate quest-accept command is required. The shipped definitions contain ten daily, eight weekly, and five monthly quests. Targets and rewards vary by player and period, so use your own quest card rather than another tester’s numbers.

| Objective | What counts |
| --- | --- |
| Actions | Any rewarded Forage gathering action |
| Family | Rewarded actions in that exact family, such as leaves for Canopy Sampler |
| Material | Rewarded breaks of that exact block, such as oak leaves for Oak Leaf Run |
| Biomes | A rewarded gathering action in each distinct biome; travelling through it alone does not count |
| Treasure | A successfully delivered random Forage treasure find |

Some quest descriptions use broad nature themes. Their configured family is decisive: Woodland Work counts **logs**, Forest Patrol counts **leaves**, Herbal Calendar counts **flora**, and Cave Cycle counts **cave**. Camp turn-ins, dust use, and admin XP/level changes do not substitute for gathering objectives.

Completion makes a reward ready; it does not automatically claim it. Return to an eligible owned workstation and click the completed quest. Built-in rewards can add Forage Points, Forage XP, and CMI/Vault money once for that quest and period. Quest-claim XP is separate from the daily gathering allowance; reaching that allowance does not itself prevent claiming a completed quest. If payments or a configured extra reward are unavailable, keep the completion and ask staff to inspect it. Repeated clicks must not pay twice. Use `/forage review` for a waiting request and share its reference with staff.

Quests may also include the item reward described on their card. Leave one empty inventory slot per reward stack: the whole reward must fit before anything is paid or claimed. Items go into your inventory, never onto the ground or into occupied equipment slots. If you are short of space, store some items and claim again; you do not need to repeat the quest. After delivery, the confirmation lists the received item reward and a private claim reference.

**Claim before the period ends.** The plugin uses the server’s configured timezone: daily quests reset by date, weekly quests use ISO weeks beginning Monday, and monthly quests use calendar months. A new period starts new progress and rolls; the current menu does not offer earlier periods’ unclaimed rewards. Confirm the test server’s timezone with staff.

Treasure finds are occasional bonuses from rewarded gathering, not guaranteed drops. The base chance is 1.8% per eligible action before tool and branch modifiers, with a default 90-second cooldown after a successful roll is prepared. Keep inventory space available: if the inventory cannot fit the selected treasure, the find is skipped before delivery. Nothing drops on the ground, no treasure is queued for later, and treasure totals and treasure-quest progress do not increase. The otherwise-valid gathering action still earns its normal progress. Ordinary treasures are marked items used by Repair & Merge and Greater Forage Dust; a vanilla item with the same material or a renamed copy is not equivalent. Legendary Pulse Dust has a 3% replacement chance within a treasure roll, not a 3% chance per gathering action, and should not be required to pass a short natural-drop test.

## Camp Turn-Ins

Players use the Camp Turn-Ins button at their fully active camp workstation. `/forage compost` directs them there. The turn-in does not open an escrow inventory. It safely scans the player's inventory, builds a plan, asks for confirmation, then re-scans and consumes only the planned slots if they still match.

By default, camp turn-ins:

- require a current owned workstation session at an active camp
- accept only plain vanilla item stacks with no custom name, lore, enchantments, PDC, custom model data, or other item meta
- reject Forage tools and PDC-marked Forage treasures
- accept configured organic source families such as flora, crops, mushrooms, leaves, fruits, and moss
- reward reduced Forage XP and Forage Points compared to breaking blocks with a curated tool
- respect the daily Forage XP cap
- take at most 192 items per submission and use a 30-second cooldown

Camp Turn-Ins consume eligible stacks from the normal storage inventory, including the hotbar. Keep items you want to retain in a chest before confirming and read the Turn-In Sources and preview cards. This is an explicit Camp Delivery, not automatic credit for placing items in camp storage.

## Forage Dust

Players use the Forage Dust button at their fully active camp workstation to make PDC-marked pulse dust. `/forage dust` directs them there. The default camp trade now makes a standard batch, a second camp trade makes a stronger greater batch that also consumes Forage treasure items, and a very rare legendary pulse dust can appear from treasure rolls instead of a normal treasure item.

By default, Forage Dust:

- crafting requires a current owned workstation session at an active camp; already-owned dust can be used away from camp
- costs CMI/Vault money, Forage Points, and plain vanilla `BONE_MEAL`
- offers a standard batch that makes 8 dust with a radius-3 pulse
- offers a greater batch that makes 4 dust with a radius-6 pulse and consumes 2 PDC-marked Forage treasure items
- can very rarely deliver legendary treasure-only pulse dust to the inventory with a radius-12 pulse
- rejects custom bonemeal with names, lore, PDC, or other item meta
- creates PDC-marked dust with a short lore warning that it does not award Forage XP
- stores pulse radius and max-grown-block settings directly on each dust item through PDC, so old and new dust variants can coexist safely
- uses one dust per right-click growth pulse
- only works in allowed worlds and WorldGuard global-only areas
- pulses only configured growable materials inside a small clamped radius
- respects a shared per-player cooldown, 45 seconds by default
- growth itself does not award Forage XP, points, or gathering quest progress

All three dust variants support poplar saplings, red shrubs, and shelf mushrooms alongside the existing crops and saplings. They use vanilla bone-meal behavior: poplar saplings attempt tree growth, red shrubs spread into suitable nearby space, and small shelf mushrooms grow larger. Normal space, support, maturity, and random growth rules still apply. Already-issued dust gains these targets automatically; its stored radius and target limit stay intact.

Startup adds the 26.3 gathering materials and the three new dust targets to existing configuration lists without replacing other entries, prices, rewards, or enable switches. New installations include them in the defaults. Dust selects its eligible targets before applying growth, so shrubs created during a pulse are not pulsed again by that same use. The radius and maximum count limit applications of bone meal; a resulting tree may extend beyond that radius. Every proposed growth block is checked against Forage's WorldGuard policy, and growth crossing into a protected region is cancelled as a whole. If no target accepts a pulse, the dust is retained.

## Camp Feedback

`/forage camp` inspects the nearby camp, reports missing counts, and explains ownership, registration, Initial Camp validity, and Local Introduction progress. Sneak-right-click the owned composter to establish a workstation session. A pending remote Initial Camp check must finish before the camp can be used.

The next build retains that existing visit while browsing `/menu` and returning through `/forage`, provided the player stays within six blocks and the original five-minute visit has not expired. Commands never create or extend a visit, and every camp action still checks the current menu, ownership and camp requirements. A hub opened without a valid visit directs the player to sneak-right-click their composter. In beta build 736, leaving the Forage menu or invoking `/forage` clears the visit; close the menu and sneak-right-click the composter again to restore access. See the [navigation regression record](../compatibility-tests/forage-station-navigation-2026-10-11.md).

Camp-check feedback distinguishes a chunk-loading failure (wait briefly and retry), leaving the composter (return within six blocks), and an unavailable or remapped world (ask staff to inspect the registration). A config reload cancels pending checks with a retry message; disconnects remain silent and death asks the player to respawn and return. These checks do not change saved progress. The defaults are under `camp-visit.*` in `plugins/1MB-CMIAPI/CMIAPILIB/translations/forage.yml`; after deploying the supporting build, wording edits take effect with `/forage admin reload`. Deployed beta build 736 still uses the older hardcoded message.

The next build also reserves the composter gesture for Forage when reviewed PyroFarming 1.3.2, PyroFishingPro 4.9.35 or PyroMining 4.6.1 is installed. It withholds the competing tool-menu callback before it runs, covers both hands, and preserves normal Pyro shortcuts elsewhere and other plugins' interaction vetoes. An unverified integration blocks camp access with `camp-visit.menu-conflict` guidance to prevent a potential menu conflict. See the [interaction compatibility notes](../compatibility-tests/forage-pyro-camp-interaction-2026-10-11.md) for the verified boundary and pending in-game checks. This integration is not active in beta build 736.

**Current beta build 736:** default construction needs a composter anchor, 24 wool-family block positions (full blocks, stairs, or slabs), six fences, one campfire or soul campfire, one chest/trapped chest/barrel, and one crafting table within ten blocks horizontally and six vertically. The campfire need not be lit in this build. Existing suitable vanilla camp features count, but an Abandoned Camp is not automatically a complete Forage Camp. Cushions, trees and lanterns are optional. The original thresholds were checked against [measured 26.3 source templates](../compatibility-tests/forage-26.3-camp-templates-2026-09-27.md).

**Pending next build:** retain those construction counts, require the campfire or soul campfire to be lit, and add **one lit candle position, one intact straw bed and one firefly bush**. Undyed and colored candles count; candle cakes do not, and several candles on one block still count as one position. A straw bed needs both matching halves inside the scan and counts once; ordinary beds do not substitute. These checks use the same camp scan and require a coordinated JAR deployment; `/forage admin reload` cannot add them to build 736.

After deployment, loss of the required lit state, bed or either bed half, or bush makes the camp incomplete. Once Forage observes a shortage, restoring blocks alone does not clear its revalidation requirement. Restore or relight it, then deliberately confirm `/forage camp revalidate`. Registration, Local Introduction progress and global progress remain saved; an invalid Initial Camp also blocks its owner's Secondary Camps. See the [player construction checklist](forage-camps.md#build-the-checklist) for the two build-specific requirement tables.

The Local Introduction requires 30 fresh personal qualifying actions in the camp’s world and a deliberate delivery of eight eligible plain source items. Before completion, players can obtain starter tools and follow the introduction while rewards remain clearly locked. Repair preserves that progress; replacement starts it again. A broken Initial Camp pauses other camps without deleting any global progress.

See the [complete camp guide](forage-camps.md) for requirements, world rules, repair, relocation, and reward claiming.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/forage` | player | Opens the Forage hub GUI. |
| `/forage info` | anyone | Shows a player-friendly intro and public docs link. |
| `/forage help` | anyone | Shows commands available to the sender. |
| `/forage guide` | player/console | Opens the first-run guide for camp setup, first tool, limits, quests, and tips. Console prints the same starter flow. |
| `/forage next` | player | Recommends the next Forage step from current registrations, Local Introduction, tools, quests, and blockers. |
| `/next` | player | Includes available Forage recommendations in the shared activity hub. |
| `/next guide forage` | player | Opens the short Initial Camp, first tool, and gathering checklist. |
| `/guidance` | player | Controls optional shared hints, frequency, and hidden/postponed hints. Explicit next-step commands remain available with hints off. |
| `/forage status` | player | Prints a compact progress summary with player XP, tool XP, caps, camp state, quest hint, upgrade hint, and next step. |
| `/forage limits` | player/console | Shows personal daily caps, family caps, money/point context, tool costs, repair cost, and quest reward ranges. Console prints the admin balance report. |
| `/forage shop` | player | Directs you to your composter workstation; choose Tool Shop there. |
| `/forage stats` | player | Shows level, XP, points, caps, totals, and held tool details. |
| `/forage quests` | player | Directs you to Quests & Rewards at your workstation; the page shows daily, weekly, monthly, and ready-to-claim objectives. |
| `/forage branches [branch]` | player | Directs you to the workstation branch picker; commands do not select a branch remotely. |
| `/forage top [level\|xp\|points\|actions\|treasures\|daily\|weekly]` | player/console | Console shows read-only leaderboards; players are directed to their workstation. |
| `/forage recent [page]` | player | Directs you to recent gathering details at your workstation. |
| `/forage tips` | anyone | Console prints hints; players are directed to the workstation tips page. |
| `/forage tools` | player | Directs you to the workstation tool and source-family guide. |
| `/forage camp [inspect\|list\|register\|revalidate\|unclaim [registration-UUID]]` | player | Inspects camps or opens explicit registration, repair validation, and release confirmations. |
| `/forage compost` | player | Directs you to Camp Turn-ins at the workstation. |
| `/forage dust` | player | Directs you to Forage Dust at the workstation. |
| `/forage admin give <player> <tool> [tier]` | admin/console | Gives a PDC-marked Forage tool. |
| `/forage admin inspect <player>` | admin/console | Shows saved profile data, caps, quests, nearby camp state, and held item identity. |
| `/forage admin inspectitem [player] [main\|offhand\|boots\|leggings\|chestplate\|helmet]` | admin/console | Shows PDC, tool XP/level, durability, repair guard, and enchant diagnostics for one carried item. |
| `/forage admin xp <player> <amount>` | admin/console | Adds or removes saved Forage profile XP for testing. |
| `/forage admin level <player> <level>` | admin/console | Sets a player's saved Forage profile level by moving profile XP to that level floor. |
| `/forage admin points <player> <amount>` | admin/console | Adds or removes saved Forage points for testing. |
| `/forage admin toolapprove <player> [confirm]` | admin/console | Reviews and explicitly approves a supported older tool after checking its upgrade history; preserves progress and tracked durability. |
| `/forage admin toollevel <player> <level>` | admin/console | Sets the held Forage tool level for testing upgrade flows. |
| `/forage admin resetcap <player>` | admin/console | Clears today's global and family XP/action cap buckets for an online tester; does not reset chunk exhaustion or quest progress. |
| `/forage admin balance` | admin/console | Shows the active balance preset, multipliers, caps, source-family caps, tool price range, sample upgrade/improvement costs, repair sample cost, and quest reward ranges. |
| `/forage admin livecheck` | admin/console | Shows the owner checklist for moving Forage from testing to live balance, including active preset, safety switches, caps, repair costs, and upgrade costs. |
| `/forage admin check` | admin/console | Runs a colored config sanity report for `config.yml` and `quests.yml`, including YAML type drift, invalid materials/entities, source/tool/branch references, quest roll ranges, reward command prefixes, economy hook state, and live-readiness warnings. |
| `/forage admin export [backup]` | admin/console | Saves current Forage data and writes a Discord-friendly Markdown export with profiles, caps, camps, chunk exhaustion, quest summaries, runtime counters, and top boards. Add `backup` to also copy raw Forage YAML files. |
| `/forage admin camps list [page]` | admin/console | Lists claimed Forage camp anchors. |
| `/forage admin camps worlds` | admin/console | Shows logical mappings, whitelist, blacklist, and each loaded world’s eligibility. |
| `/forage admin camps legacy [page]` | admin/console | Lists preserved legacy reservations awaiting deliberate registration or release. |
| `/forage admin camps near` | admin | Inspects the nearest configured camp anchor from the admin's location. |
| `/forage admin camps inspect <registration-UUID>` | admin/console | Shows a v2 registration, world identity, role, introduction, and current validation. Legacy player/key inspection remains available separately. |
| `/forage admin camps release <registration-UUID>` | admin/console | Safely releases a v2 registration; blocks and global progress remain. Legacy key/near release remains available for old claims. |
| `/forage admin camps reassign <key\|near> <player>` | admin/console | Legacy helper; unavailable where ownership transfer would bypass camp registration requirements. |
| `/forage admin camps move <key\|near>` | admin | Legacy helper; use release and deliberate new registration under the 26.3 rules. |
| `/forage admin chunks` | admin/console | Shows chunk exhaustion runtime counts. |
| `/forage admin reload` | admin/console | Reloads configuration and translations while preserving current in-memory player progress. |
| `/forage admin save` | admin/console | Saves profiles and chunk state. |
| `/forage admin recoveryack <transaction-UUID> confirm` | admin/console | Discards retained finalized item/economy recovery evidence only after staff verifies the external state. This is not a refund or replay command. |
| `/forage review [reference]` | player | Shows the player's own saved requests, including while gameplay is dormant; use `/forage review page <number>` for further requests. |
| `/forage debug tool [player]` | admin/console | Shows PDC data for the held Forage tool. |
| `/forage debug runtime` | admin/console | Shows runtime counters and external tool-protection integration readiness. |
| `/forage debug transactions` | admin/console | Inspects durable requests that may need review; it does not automatically refund or replay them. |
| `/forage debug all` | admin/console | Uses the shared debug output for build, server, hooks, commands, permissions, placeholders, and config. |

Player activity commands always redirect to the physical workstation, even when a camp is nearby. Use its GUI to perform activities; these commands do not grant or reuse reward-claim authority.

### Staff beta setup and recovery

Use the [beta test checklist](forage/checklist.md) to record the actual suite build, server build, preset, world mappings, client type, and outcomes. A test server must have Forage deliberately enabled; debug mode alone does not activate it. Keep gameplay tests in Survival and use an ordinary tester account to verify the default player permissions.

Begin with `/forage admin check`, `/forage admin livecheck`, `/forage admin balance`, `/forage admin camps worlds`, and `/forage debug runtime`. A deliberate `testing` preset warning is expected during accelerated tests; malformed settings, unavailable payment services, or missing item-protection adapters need attention before the affected test. The technical camp guide contains activation and mapping details.

For supervised advanced tests, `/forage admin give <player> <tool> [tier]`, `level`, `points`, and `toollevel` can prepare an online tester. Tool IDs are `sickle`, `axe`, `shovel`, `shears`, `pickaxe`, `brush`, `sword`, and `mace`; the Trowel uses the ID `shovel`. These helpers do not complete a camp’s Local Introduction or prove normal earning, shopping, or quest progress. Record any seeded state separately. There is no documented admin shortcut for granting marked treasure or dust; test their real delivery paths or let staff prepare an explicitly recorded test fixture.

If a request reports uncertainty, save the `/forage review` reference, relevant `/forage debug transactions` output, and before/after items and balances. Staff should inspect retained evidence before retrying anything. `/forage admin recoveryack <transaction-UUID> confirm` discards finalized recovery evidence after external-state verification; it neither compensates the player nor replays delivery. Follow the technical recovery guide and keep a backup before deliberate failure or restart tests.

## Permissions

Player defaults:

```text
onembcmi.forage.use
onembcmi.forage.shop
onembcmi.forage.stats
onembcmi.forage.camp
```

Admin defaults are false:

```text
onembcmi.forage.admin
onembcmi.forage.give
onembcmi.forage.inspect
onembcmi.forage.reload
onembcmi.forage.debug
```

`onembcmi.forage.admin` includes the admin child permissions and the new testing helpers, but operator status alone does not receive it from plugin.yml defaults.

## Storage

V1 stores runtime data under:

```text
plugins/1MB-CMIAPI/Forage/data/profiles.yml
plugins/1MB-CMIAPI/Forage/data/chunks.yml
```

V1 also creates a separate quest definition file:

```text
plugins/1MB-CMIAPI/Forage/quests.yml
```

`profiles.yml` stores player level, XP, points, actions, treasure count, purchases, current branch id, branch change time, per-branch XP/actions/treasures, global daily caps, per-source-family daily caps, quest progress, quest claim state, and last action. `/forage top` reads this saved profile data in memory; it does not write separate leaderboard snapshots. `chunks.yml` stores active chunk exhaustion cooldowns. Runtime turn-in and dust/growth counters are exposed for debug/placeholders, but individual turn-ins and dust uses are not stored as permanent history in v1. This keeps v1 self-contained while the roadmap keeps SQLite as a later storage-hardening discussion item if the feature grows large enough to need it.

`/forage admin export` saves current memory state and writes a timestamped Markdown report under `plugins/1MB-CMIAPI/Forage/data/exports/`. The report summarizes profile totals, top boards, camps, chunk exhaustion, quest definition and claim counts, active balance/cap settings, and live runtime counters such as tool purchases, compost turn-ins, dust crafts, and growth pulses. `/forage admin export backup` also copies the raw `profiles.yml`, `chunks.yml`, `camps.yml`, `config.yml`, and `quests.yml` files into a timestamped backup folder. The export command stays available while the global Forage switch is disabled so the owner can snapshot data before emergency config edits.

Camp ownership is stored separately in:

```text
plugins/1MB-CMIAPI/Forage/data/camps.yml
```

The 26.3 camp file uses `schema-version: 2` and `registry-v2` rows for registration identity, owner/world UUIDs, logical world, initial/secondary role, anchor, footprint, Local Introduction, and revalidation state. Older `claims` records remain preserved until the owner deliberately registers that anchor under the new rules or staff safely releases it. Invalid stored data fails closed rather than authorizing a camp. See the [technical recovery guide](forage-camp-technical.md#existing-data-and-recovery).

## Config Highlights

`config.yml` and `quests.yml` are comment-preserving and add missing defaults safely through the shared library.

Important sections:

- `enabled`: global emergency switch for all player-facing Forage actions
- `onboarding.*`: first-run `/forage guide` flow and hub button
- `worlds.allowed`, `worlds.blacklisted`, `worlds.initial`, `worlds.mappings`: logical whitelist, blacklist precedence, initial worlds, and explicit logical-to-actual aliases
- `economy.*`: CMI-backed Vault shop integration
- `balance.preset` and `balance.presets.*`: `testing`, `normal`, `live`, `grindy`, or custom balance multipliers for earned player XP, tool XP, points, quest rewards, caps, tier bonuses, upgrade costs, repair costs, and improvement costs
- `progression.*`: level formula, daily XP/action caps, and progress message frequency
- `progression.family-daily.*`: per-source-family daily XP/action caps, so one capped tool route does not stop all Forage play for the day
- `messages.batch.*`: delayed batched progress summaries and `/forage recent` limits
- `quests.enabled`, `quests.claims.*`, `quests.progress-message-every`, `quests.allowed-command-prefixes`: quest runtime controls in `config.yml`
- `quests.yml`: daily, weekly, and monthly task definitions, min/max randomized targets, min/max point/XP/money rewards, optional `reward-kit` item templates, and legacy reward commands (arbitrary commands remain blocked)
- `branches.*`: branch ids, display names, icons, focused source families, level gates, switch cooldown/costs, and small branch bonuses
- `tools.*`: tool ids, materials, prices, unlock gates, family coverage, tool soul settings, modification guards, tier upgrades, diamond refinement, controlled Unbreaking/Efficiency improvements, and Repair & Merge costs/caps
- `sources.*.materials` and `sources.*.entities`: block-material and entity-type source definitions used by the matching curated tools
- `tools.low-durability-lock.*`: safety-lock rules that stop curated tools before they break
- `tools.durability-audit-seconds`: how often online inventories are scanned for unexpected external repairs
- `sources.*`: source-family XP, point value, and material lists
- `chunk-exhaustion.*`: v1 anti-grind cooldowns by chunk and source family
- `protection.worldguard.*`: conservative global-only region check when WorldGuard is installed
- `camp.*`: composter anchor, bounded search/scan geometry, counted `camp.requirements.*`, Local Introduction, and ready feedback; the old tree/log/lantern checklist no longer controls the new camp model
- `camp.turnins.*`: complete-camp requirement, accepted source families, item cap, reward scaling, cooldown, and daily-cap behavior
- `growth.*`: bounded Forage Dust growth pulses, cooldown, legacy fallback radius/max blocks, and allowed target materials
- `growth.dust.*`: standard dust item material/name/glint, batch amount, stored radius/max blocks, complete-camp requirement, money cost, point cost, and bonemeal cost
- `growth.dust.greater.*`: second stronger camp dust trade with its own amount, radius, max blocks, costs, and treasure requirement
- `treasures.*`: simple v1 treasure chance, vanilla material list, optional PDC/lore treasure markers, and rare legendary pulse dust replacement rolls
- `effects.*`: sounds and particles
- `gui.tip-line-max-chars`: approximate maximum lore line length in the tips GUI
- `tips.entries.<id>.title` and `tips.entries.<id>.text`: titled tip cards shown in the tips GUI and chat output
- `tips.lines`: legacy extra tip lines that are still appended for backward compatibility when they are not duplicates; they now auto-title from their text, and can optionally use `Title :: text`

### Live balance preset

Forage ships with `testing`, `normal`, `live`, and `grindy` presets. `testing` is intentionally fast for short test-server passes. `normal` is the default tuning profile. `live` is the suggested pre-launch preset for the public server: it slows player XP, tool XP, points, and quest rewards, raises upgrade costs, keeps family caps practical, and keeps Repair & Merge more affordable so players are encouraged to use their tools instead of hoarding them.

To switch after testing:

```yaml
balance:
  preset: live
```

Then run `/forage admin reload`, `/forage admin check`, `/forage admin livecheck`, and `/forage admin balance`. The config sanity check and live checklist are read-only and still work while the global `enabled` switch is false, so the owner can review YAML types, config references, live readiness, and balance tuning during an emergency toggle or before reopening the feature.

### Config sanity check

`/forage admin check` is the owner-facing preflight report for Forage config files. It checks managed default type drift, known Paper material names, entity type names, active balance preset values, enabled source family definitions, tool-to-family references, branch-to-family references, quest target/reward ranges, quest reward command safety prefixes, economy hook state, growth dust values, camp anchor material, low-durability protection, external repair command guards, and WorldGuard launch settings.

The report uses soft green `ok:`, gold `warn:`, and pastel red `error:` labels. Errors mean a setting can break or silently change behavior, such as an invalid material or a tool pointing at a disabled source family. Warnings mean the setting is valid but should be reviewed before live, such as running on a testing preset or using broad command prefixes. Each finding includes what was wrong, what was expected, and a suggested fix.

## Placeholders

The shared placeholder bridge advertises these Forage placeholders:

```text
%onembcmi_forage.enabled%
%onembcmi_forage.player.level%
%onembcmi_forage.player.xp%
%onembcmi_forage.player.xp_formatted%
%onembcmi_forage.player.points%
%onembcmi_forage.player.actions%
%onembcmi_forage.player.treasures%
%onembcmi_forage.player.today.xp%
%onembcmi_forage.player.today.actions%
%onembcmi_forage.player.today.xp_remaining%
%onembcmi_forage.player.today.actions_remaining%
%onembcmi_forage.player.today.xp_percent%
%onembcmi_forage.player.today.actions_percent%
%onembcmi_forage.player.daily_xp_cap%
%onembcmi_forage.player.daily_action_cap%
%onembcmi_forage.balance.preset%
%onembcmi_forage.player.camp.ready%
%onembcmi_forage.player.camp.anchor%
%onembcmi_forage.player.camp.owner%
%onembcmi_forage.player.camp.missing_count%
%onembcmi_forage.player.tool.id%
%onembcmi_forage.player.tool.name%
%onembcmi_forage.player.tool.tier%
%onembcmi_forage.player.tool.level%
%onembcmi_forage.player.tool.xp%
%onembcmi_forage.player.tool.uses%
%onembcmi_forage.player.tool.durability%
%onembcmi_forage.player.tool.durability_percent%
%onembcmi_forage.player.tool.locked%
%onembcmi_forage.player.branch.id%
%onembcmi_forage.player.branch.name%
%onembcmi_forage.player.branch.xp%
%onembcmi_forage.player.branch.actions%
%onembcmi_forage.player.branch.treasures%
%onembcmi_forage.player.family.<id>.xp%
%onembcmi_forage.player.family.<id>.actions%
%onembcmi_forage.player.family.<id>.xp_remaining%
%onembcmi_forage.player.family.<id>.actions_remaining%
%onembcmi_forage.player.family.<id>.capped%
%onembcmi_forage.player.quests.daily.completed%
%onembcmi_forage.player.quests.daily.claimable%
%onembcmi_forage.player.quests.weekly.completed%
%onembcmi_forage.player.quests.weekly.claimable%
%onembcmi_forage.player.quests.monthly.completed%
%onembcmi_forage.player.quests.monthly.claimable%
%onembcmi_forage.player.quest.next.name%
%onembcmi_forage.player.quest.next.progress%
%onembcmi_forage.player.quest.next.target%
%onembcmi_forage.player.quest.next.remaining%
%onembcmi_forage.player.quest.next.claimable%
%onembcmi_forage.player.quest.daily.<id>.progress%
%onembcmi_forage.player.quest.daily.<id>.target%
%onembcmi_forage.player.quest.daily.<id>.claimable%
%onembcmi_forage.player.quest.weekly.<id>.progress%
%onembcmi_forage.player.quest.weekly.<id>.target%
%onembcmi_forage.player.quest.weekly.<id>.claimable%
%onembcmi_forage.player.quest.monthly.<id>.progress%
%onembcmi_forage.player.quest.monthly.<id>.target%
%onembcmi_forage.player.quest.monthly.<id>.claimable%
%onembcmi_forage.player.rank.level%
%onembcmi_forage.player.rank.points%
%onembcmi_forage.player.rank.daily%
%onembcmi_forage.player.rank.weekly%
%onembcmi_forage.top.<board>.<rank>.name%
%onembcmi_forage.top.<board>.<rank>.value%
%onembcmi_forage.runtime.earned_actions%
%onembcmi_forage.runtime.exhausted_actions%
%onembcmi_forage.runtime.treasures%
%onembcmi_forage.runtime.compost_turnins%
%onembcmi_forage.runtime.compost_items%
%onembcmi_forage.runtime.dust_crafts%
%onembcmi_forage.runtime.growth_pulses%
%onembcmi_forage.runtime.growth_blocks%
%onembcmi_forage.runtime.tracked_chunks%
%onembcmi_forage.runtime.exhausted_chunks%
```

These are enough for holograms and ajLeaderboards around the Forage camp/NPC area. Player tool and camp placeholders are online-player scoped because they inspect the player's current held item and nearby camp. Leaderboard board ids are `level`, `xp`, `points`, `actions`, `treasures`, `daily`, and `weekly`.

## Safety Notes

- No RCON support is used or expected.
- Player text input is not accepted in v1, so command injection risk is limited to admin-controlled config command hooks.
- The CMI ctext guide command only allows the safe `cmi ctext` prefix.
- Treasure delivery, quest claims, tool purchases, branch selection, tool improvements, Repair & Merge, compost turn-ins, and Forage Dust purchases use durable idempotent receipts. Exact item and profile recovery evidence is written before effects. Finalized item/economy payloads remain retained until staff verifies the external state and acknowledges them; unresolved operations are listed by `/forage debug transactions`.
- Tool upgrades and improvements do not open an escrow inventory. They re-read the held main-hand Forage tool after durable preparation, cancel changed inputs before charging, and mutate only the trusted PDC-marked item. An uncertain partial effect requires manual review rather than an automatic replay or refund.
- Branch selection uses only configured ids, revalidates level/cooldown/point costs after GUI confirmation, and stores only sanitized branch ids.
- Repair & Merge does not open an escrow inventory. It reads the main hand, offhand, and inventory treasure marker at confirmation time, then re-validates before changing items.
- Curated tool durability is tracked in PDC. If an outside command, GUI, Mending tick, or targeted console repair command repairs a Forage tool without going through Repair & Merge, the plugin restores the last legitimate durability state on the next live check or audit pass.
- Camp turn-ins do not open an escrow inventory. They scan plain vanilla inventory stacks, confirm the plan, revalidate each slot, and only then consume items.
- Forage Dust does not open an escrow inventory. It checks camp state, money, Forage Points, plain vanilla bonemeal, required treasure items for greater dust, and inventory space at confirmation time before creating PDC-marked dust.
- Forage Dust growth pulses are bounded by configured allowed materials, the radius and max block count stored on the dust item, shared cooldown, allowed worlds, and WorldGuard checks. Dust does not award Forage XP or points.
- Field treasure finds and use of already obtained Forage Dust intentionally happen outside camps. Claiming an earned reward or purchasing dust still requires the eligible owned workstation; an inventory-delivered gathering find is not a remote reward-menu claim.
- Camp validation scans a bounded footprint, rechecks the Initial Camp, and obtains missing chunks asynchronously without generation; validation never edits blocks.
- WorldGuard is optional and checked by reflection so the jar can load without a compile-time WorldGuard dependency.
- Chunk exhaustion is intentionally conservative and cheap: it tracks chunk, source family, action count, and cooldown.
- The Local Introduction proves fresh personal qualifying actions in that world, not the origin of each ordinary stackable item. Source placement and farming controls remain part of anti-farm acceptance testing.

## Future Direction

The 26.3 camp contract is described above. Later additions remain separate from this revamp:

- optional camp comforts and themed objectives
- richer turn-in recipes and camp progression
- richer skill trees built on the v1 branch identity system
- higher-tier tool upgrades and unlock variants
- richer Forage Growth recipes and dust variants
- biome-specific rare herbs
- seasonal/event profiles
- derbies and community milestones
- museum/herbarium systems
- storage-engine changes if measured scale warrants them
- audited reward adapters for temporary hearts, other-plugin points, or tournaments

## Blocker recovery

Camp requirements, tool protections, gathering allowances, local exhaustion, purchases and changed inputs provide a specific next step. Global allowances never suggest switching tools as a workaround; family alternatives are checked against current usable tools and limits. `/forage review [reference]` checks only your own saved requests, including while gameplay is dormant; `/forage review page <number>` shows further waiting requests. Copy the reference to share with staff before retrying an uncertain request. See [Blocker recovery messages](../blocker-recovery.md).

## Complete reward communication

[COMM-08 reward communication](../reward-communication.md) documents the shared result states, adopted flows, delivery evidence, next actions, and client acceptance. Claims retain their safety records and private review references. Arbitrary command-based quest rewards are blocked in the 26.3 revamp until an audited delivery adapter can verify their outcome; accepted dispatch alone is insufficient.

Staff can set `quests.<period>.<id>.reward-kit` in `quests.yml` to an existing item-only CMI kit and describe its contents with `reward-description`. Leave `reward-commands: []`. Disabled CMI kits are supported as templates, so reward definitions can remain unavailable through normal `/kit` access. Reload CMI after editing its kit file, then reload Forage after changing quest mappings. `/forage admin check` reports missing or invalid templates.

Forage copies the authored item stacks, including their components, and adds its transaction reference. It does not run CMI kit commands, expand player placeholders, apply kit costs/cooldowns, or enable the kit. Equipment templates are delivered into normal inventory storage. Templates containing commands, existing Forage receipt tags, empty contents, or invalid/oversized stacks are rejected. Exact reward items and the inventory preimage are retained before delivery; changed inventory, kit definitions, camp eligibility or player state cancels before effects. An uncertain payment/item/save outcome requires staff review and is never automatically replayed or refunded. Minecraft's playerdata persistence remains separate from Forage's claim receipt.

## Dynamic next steps

`/forage next` uses the current camp registry. If the player has no Initial Camp, including after explicitly unclaiming one, the first recommendation is to find Dappled Forest in `/wild`, find or build a camp, and use `/forage camp` for its workstation and block checklist. This recommendation also works from a world where Forage gathering is unavailable. Configured Initial Camp worlds and logical-to-physical mappings are respected; unavailable or ambiguous mappings produce a staff-help explanation instead of an unusable destination.

A registered Initial Camp is recognized while the player explores elsewhere. Known revalidation requirements direct them to restore that camp without resetting progress. In a registered camp's world, the Local Introduction recommendation shows fresh gathering progress and then the required item delivery. Global rewards and upgrades are not presented as ready there before the delivery is complete. Guidance never registers camps, performs deliveries, opens a remote reward session, or loads chunks to inspect distant camps.

`/guidance` governs optional checklist invitations and progress hints through the shared service. Its quiet, off, hidden, and postponed preferences remain respected. `/next` and `/forage next` are explicitly requested recommendations, so players can continue using them with optional hints disabled. Dormant Forage remains excluded from recommendations.

See [Dynamic next steps and the global hub](../next-steps.md) for `/next`, the integrated feature next commands, selection rules, current coverage, and safe navigation.

## One pinned focus goal

This feature contributes goals to the Shared Library's [focus system](../focus-goals.md). Use `/next focus choose` to select one objective across the server, with shared hide/show/change/clear controls and temporary progress tracking. The guide explains this feature's supported goals and entry points.

## Remembered first steps

`/next guide forage` opens a short, optional checklist: register the Initial Camp, get a curated tool through the workstation, and gather from a matching source. Finished learning steps stay remembered, and Later, dismissal, Resume and chat controls are shared across the suite. Remembered learning does not prove that a camp is still usable: current registration and validation rules continue to govern activity, and `/forage next` explains current blockers. See [First-success checklists](../first-success-checklists.md) for the controls.
