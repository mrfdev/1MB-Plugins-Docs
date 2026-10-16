# Forage

Forage is a player-facing nature progression plugin for `/forage`. It targets the reviewed Paper 26.3 line with Java 25-compatible bytecode and depends on CMI, CMILib, and `1MB-CMIAPI-Lib`.

**Latest documented verification, 13 October 2026: suite build 757 on Paper 26.3 STABLE 180.** Connected-client acceptance remains separate from automated checks and startup verification. Live gameplay remains dormant until owner acceptance and activation. Development uses the maintained `servers/Paper-26.3/` instance on Java 27, with suite builds on JDK 25.0.4.1. The preserved 26.2 server is a rollback instance. Shipping the Forage JAR in a complete suite build does not activate it on live.

**Deployed in build 739:** Accepted Turn-Ins now opens the complete paginated inventory-item list, including cocoa beans. Build 741 adds Leaf Litter to flora gathering and ordinary Camp Turn-Ins. Build 742 adds the Herbarium botanical routes, bringing the defaults to 97 accepted item types; see the [complete accepted-item list](forage-camps.md#complete-accepted-turn-in-item-list).

**Placed-resource protection is active from build 739:** newly recorded placements and supported movement follow the rules below. Earlier placements are not backfilled.

**Participation qualification tracking is active:** successfully claimed daily and weekly quests count toward one lifetime reward. Claiming stays disabled until the real participation map is supplied; the disabled `forage_participation` kit is an unfinished item placeholder.

The tool-protection verification recorded suite build 726 with the then-current 65 managed JARs, 156 passing Forage tests, and a Paper 26.3 BETA 159 probe with 390 assertions. These are dated verification results, not the identity of a later beta-server build. See the [tool-protection verification](../compatibility-tests/forage-tool-protection-2026-10-07.md). The earlier build 724 plant probe passed 88 assertions on Paper 26.3 BETA 157 covering custom-tool rewards, native growth, dust consumption, and protection boundaries. See the [plant compatibility verification](../compatibility-tests/forage-26.3-plants-2026-10-06.md). The earlier build 705 camp-guidance follow-up passed 19 native assertions on Paper 26.3 ALPHA 49. Real-client acceptance remains separate from these synthetic-player checks.

Dormant Forage is excluded from `/next` recommendations, focus choices, first-success guides, and ScheduledTips promotion even though its JAR is loaded. ScheduledTips recognizes existing Forage tip IDs, text, and embedded commands automatically; see [tip feature requirements](scheduledtips.md#feature-availability-and-dormant-forage). Debug mode does not override dormancy. Saved progress and communication preferences remain available for a future activation.

The camp model reserves **one Initial Camp in Dappled Forest in Wild and two optional Secondary Camps in other approved worlds**, three total and one per actual world. Camps are exclusively owned and cannot overlap. The Initial Camp must remain valid for the other camps to function; damage or relocation never erases global XP, points, quests, limits, or reward history. Every new registration needs its own short Local Introduction before global benefits unlock there.

Start with the [player camp guide](forage-camps.md), use the [beta test checklist](forage/checklist.md) for hands-on testing, and read the [technical camp guide](forage-camp-technical.md) for staff setup, mappings, recovery, validation, security, and persistence. These supersede the older first-use anchor claims and tree-grove camp checklist. Seasonal [Community Efforts](forage-community.md) are included in build 741; beta activation is verified. Managed Camp Storage and new external reward engines remain roadmap features.

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
- Recent Activity personal history
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

`config.yml` also includes a top-level `enabled` toggle. When it is set to `false`, Forage becomes a player-facing emergency shutdown: normal gameplay progress stops, camp turn-ins and dust do nothing, activity GUIs stop opening, and `/menu` hides the Forage button when Menu notices the toggle on the next open. Help, info, debug, and safe admin inspection/reload commands still work so staff can investigate and recover. `/forage recent` also remains available as a read-only personal history while gameplay is paused.

Forage now separates player progression XP from tool soul XP. Player XP and Forage Points are tuned for account progression, while tool XP is tuned for tool upgrades and soul growth. This lets staff slow down live upgrades without making repairs or basic participation feel punishing.

Forage awards ordinary gathering progression when:

- the plugin is enabled
- the player is in an allowed world and is not in Creative or Spectator mode
- persistence is healthy and no earlier Forage transaction is still pending
- the player breaks a configured source block or kills a configured source entity
- the player is holding the matching PDC-marked Forage tool
- the daily cap has not been reached
- the matching source-family daily cap has not been reached
- the chunk/source family is not exhausted
- the WorldGuard global-only check passes when WorldGuard is installed and enabled

The global daily cap limits one player’s rewarded gathering across families for the day. Source-family daily caps are separate: after one family caps, another uncapped family can still earn rewards until the global cap is reached. The family belongs to the source, not the tool: Cave/Pickaxe and Cave/Shears share Cave usage. Switching tools alone never creates a fresh family allowance.

Following the 11 October 2026 configuration reload, the beta server’s daily allowances under the `normal` preset are **3,125 player XP or 1,500 actions globally**, and **875 XP or 344 actions for every source family**, whichever applicable limit is reached first. This raises the previous 2,500/1,200 global and 700/275 family thresholds by 25%, rounding the family action limit up to a whole action. The shipped defaults use these values; existing server configurations retain their saved thresholds unless staff change them. Raising the caps preserves today's recorded usage, XP, points and quest progress rather than resetting them. Check `/forage limits` for the effective personal limits.

Local exhaustion remains 75 actions in a chunk/source family followed by 30 minutes of rest. Presets and staff configuration can change limits. Changing area helps local exhaustion, changing family helps a family cap, and neither bypasses a global cap.

When a chunk/source family becomes exhausted, Forage sends a short immediate warning so players do not keep wasting actions in the same area. Recent Activity history also retains that warning with its reason and next steps, separately from chat batching.

When daily caps or chunk exhaustion pause ordinary reward progress, the curated tool still keeps its own use count and durability state updated. The build-757 [daily-quest exception](forage-camps.md#daily-quests-after-caps) allows only specified unfinished daily objectives after global/family caps; it does not bypass chunk exhaustion or restore ordinary rewards.

## Recent Activity

The hub's **Recent Activity** button and `/forage recent [page]` open the same read-only personal history. The command works anywhere, including while Forage gameplay is paused, with `onembcmi.forage.use`. Only the requesting player's own UUID history is shown; no target-player argument exists. Opening it never creates a workstation visit, completes a camp requirement or claims a reward.

Each successful gathering action records its earned XP and points immediately, without increasing chat frequency. History also includes delivered treasure notices, level-ups, quest progress notices and reward-ready updates, plus branch, turn-in and dust notices. Forage warnings include their title, reason and next steps; repeating the same warning within 30 seconds does not add another history entry. This is a recent feedback list, not a record of every quest-counter increment or every underlying server event.

Entries appear newest first with a category, time and wrapped details. Previous/Next navigate older entries, Refresh returns to the latest entries, Back returns to the hub, and Close exits. An empty history explains that nothing has been recorded yet. Entries appear even before a pending chat summary is sent, remain across subsequent chat batches and still record when batching is disabled.

The default is the most recent **25 entries**, displayed **8 per page**. `messages.batch.recent-retain-limit` is clamped to 1–100 and `messages.batch.recent-entries-per-page` to 3–20. History is kept in memory through `/forage admin reload`, but clears when the player disconnects or the plugin stops/restarts. It is not a persistent transaction audit or a reward-claim screen; use `/forage review` for saved request references and staff recovery.

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

Read the [Tool Shop guide](forage-camps.md#tool-shop-guide) for all eight tool types, exact-source examples, the carried level-2 unlock, player level versus tool tier, and supported care. **From build 756:** the shop's top-left book closes the inventory and posts this public link in chat; the player chooses whether to open it. Browsing grants no purchase or workstation authority.

Default tools are:

| Tool | Material | Family fallback | Default Unlock |
| --- | --- | --- | --- |
| Forage Sickle | `COPPER_HOE` | flora, crops, mushrooms | starter |
| Forage Axe | `COPPER_AXE` | logs, fruits | starter |
| Forage Trowel | `COPPER_SHOVEL` | moss, sands | starter |
| Forage Shears | `SHEARS` | leaves; exact-source overrides add selected Cave, Flora and Moss plants | starter |
| Forage Pickaxe | `COPPER_PICKAXE` | stone, cave | any Forage tool level 2 |
| Forage Brush | `BRUSH` | relics, sands, fossils, animal_care | any Forage tool level 2 |
| Forage Sword | `COPPER_SWORD` | creature_drops | any Forage tool level 2 |
| Forage Mace | `MACE` | danger_drops | any Forage tool level 2 |

Bring the level-2 tool in your carried inventory when buying an unlocked tool; the shop does not inspect tools left in chests. Tool **level**, tool **tier**, and player **Forage level** are separate values. Check the shop card and `/forage stats` before spending. The four later tool types are shop unlocks, not automatically tier-II items.

Player Forage levels and Points are shared across that player's tools. A player who already meets the configured player-level gates can purchase a new tool and upgrade its tiers immediately by paying each cost. Tier upgrades do not raise its tool level or require it to earn fresh XP first. The held-tool description distinguishes **Forage tier: III** from **Tool level: 1**; both can legitimately appear on the same tool.

Examples of default gathering sources:

| Tool | Useful first sources |
| --- | --- |
| Sickle | short grass, dandelions, wheat crops, red/brown mushrooms, red shrubs, shelf mushrooms |
| Axe | oak/poplar logs, pumpkins, melons, sugar cane, bamboo |
| Trowel | moss blocks, moss carpet, azaleas, big dripleaf; normal sand, red sand, gravel and clay |
| Shears | oak/poplar leaves, glow lichen, hanging roots, seagrass, small dripleaf, pale hanging moss |
| Pickaxe | calcite, tuff, basalt, end stone, rooted dirt, pointed dripstone |
| Brush | sifted sand/red sand/gravel/clay; excavated suspicious blocks; cleaned pots; surveyed bone blocks; adult armadillos |
| Sword | cows, sheep, chickens, rabbits, squid |
| Mace | zombies, skeletons, creepers, blazes, breezes, shulkers |

Ordinary block routes award progress when you **break** a configured block with the matching genuine Forage tool in your main hand. The expanded Brush routes, available from build 767, use archaeology completion, timed sifting, non-destructive relic cleaning/fossil surveys and successful adult-armadillo grooming instead. See [Brush activities](#brush-activities). The list above is a starting point; the [generated complete source catalogue](forage-camps.md#complete-source-catalogue) contains every effective block and creature source from the shipped defaults, with exact configuration IDs. Every tier of a tool uses the same sources.

<a id="brush-activities"></a>

### Brush activities (available from build 767)

All five routes use the existing Forage Brush. Complete vanilla archaeology on `SUSPICIOUS_SAND`/`SUSPICIOUS_GRAVEL`; hold use for the configured duration (normally three seconds) to sift `SAND`/`RED_SAND`/`GRAVEL`/`CLAY`, clean a natural `DECORATED_POT`, or survey a natural `BONE_BLOCK`; brush an adult `ARMADILLO` and obtain its normal scute for Animal Care. Sifting consumes the source; cleaning/surveying leaves it intact. Ordinary breaking of brush-only sources and creature kills do not substitute for these actions. `CHISELED_BOOKSHELF` is removed from the default sources.

Normal sand, red sand, gravel and clay also support **left-click breaking with the Forage Trowel** (`shovel`) by default. The Trowel's families are `moss,sands`; the Brush still uses held right-click sifting on those four materials. Both earn the same Sands-family progress under the same allowance and provenance rules. An ordinary shovel earns no Forage credit, and suspicious sand/gravel remain archaeology-only sources.

A normally rewarded sift has a default **25% chance** to award a glowing stick named **Silted Keepsake**. Its three right-click uses each grant a random integer **3–15 personal Forage XP**, then the item disappears after its final use. Tool XP, Minecraft XP and genuine treasure-payment currency are separate. Capped daily-quest-only actions cannot drop keepsakes. Per-item identity and per-charge delivery tracking prevent the same charge paying twice, including after the item changes hands; failed or uncertain claims follow the transaction review path.

A delivered keepsake counts once toward treasure-discovery objectives when found, replacing that sift's ordinary treasure roll. The ordinary roll still applies when no keepsake is selected, and normal block drops remain. Charge redemption grants no new gathering/discovery credit and consumes no daily gathering allowance. Keep room for the uniquely identified find.

The keepsake roll is **Brush-sifting-only**. Breaking the same materials with a Forage Trowel retains ordinary gathering/treasure behavior but cannot award Silted Keepsakes.

`BONE_BLOCK` belongs to the new `fossils` family, not `stone`; `ARMADILLO` belongs to `animal_care`. Brush family fallback includes `relics`, `sands`, `fossils` and `animal_care`. Match quest objectives to these actual families rather than treating any underground find as Cave credit. Source details and generated lists distinguish Brush sifting from Trowel breaking for the four shared ground sources.

Only the first successful cleaning/survey of a physical source can reward any player, retained across chunk reloads and clean restarts. Player-placed blocks remain ineligible, and moving or breaking/replacing a source does not reset its history. Grooming has an additional default shared 24-hour animal cooldown and eight-credit personal daily cap. Genuine Brush state, world/area permissions, provenance, ordinary reward caps and the existing bounded daily-quest exception remain authoritative. See the [player instructions](forage-camps.md#brush-activities), [technical contract](forage-camp-technical.md#brush-activities) and [acceptance checklist](forage/checklist.md#brush-activities).

Vanilla armadillo grooming costs **16 durability from a Brush's full 64** before Unbreaking: a quarter of a new Brush, or about a third of a partly repaired one. Repeated grooming can still yield ordinary scutes and spend durability while its Forage reward is on cooldown. Forage's approved Unbreaking can reduce wear and approved Mending can repair it with Minecraft XP; a tier upgrade alone does neither.

**Available from build 752:** family browsing, contextual What Counts? pages and the additional source routes below are deployed on the maintained test servers. Connected-client acceptance remains open.

`/forage sources [tool] [page]` opens the full read-only catalogue from anywhere. With no tool argument it selects the held Forage tool, or shows the tool picker. Trowel uses the command/configuration ID `shovel`. Tools & Families entries open the corresponding paginated catalogue, whose documentation button sends a clickable public guide link. The hub's Tools & All Sources button and onboarding's What can I gather? entry also provide access before camp readiness. The list uses the running server's enabled tool/family definitions and effective source bindings; it grants no camp visit, purchase, XP or quest progress.

**Source Families** in the source picker, or `/forage sources families [page]`, lists gathering families such as Wild Flora (`flora`) and Stone (`stone`). A family page shows its matching tools and complete paginated sources. `/forage sources flora [page]` is the short form; `/forage sources family <id> [page]` removes ambiguity when a family ID matches a tool ID. Existing tool IDs win that collision. `/forage source` is a singular alias, and page numbers start at 1.

**Inspect and lookup (available from build 753):** `/forage inspect` prints a quick chat summary for the looked-at block within six blocks, with a clickable **Source details** link. Water is ignored while underwater plant outlines remain targetable; walls occlude the view and only loaded chunks are examined. Inspection is read-only and does not break blocks, consume allowances or create workstation access.

`/forage source <name>` searches effective sources by normalized name or ID, preferring exact matches before partial matches. Spaces, underscores, hyphens and `minecraft:` prefixes are supported. Multiple matches open a paginated chooser. Existing tool, family and control names retain precedence; `/forage source block <name>`, `/forage source creature <name>` and `/forage source search <name>` explicitly disambiguate source searches. `/forage source seagrass` is a direct example. Details show the current family, supported tools and rules, not a guarantee that an action will earn rewards.

Wrong-tool feedback names the source's actual supported tool or tools and links to **Source details**. The existing play-feedback throttle and protection/provenance checks remain; an explanatory link does not permit an otherwise blocked gather or grant progress.

Contextual **What Counts?** pages keep eligibility separate: a quest explains its actual objective; `/forage sources turnins [page]` lists ordinary accepted inventory items; `/forage sources community [page]` and `/forage sources donations [page]` list the current season's gathering sources and resource-donation items. A family or tool source list is not an item hand-in list. Reading any guide does not alter reward progress or grant submission/claim authority.

**Quest/tool cross-links (from build 755):** source cards and Source Details preview up to three matching family/material quests, with a count of additional specific matches. **Matching Quests** opens the full read-only objective list, including the conditions for any-action, biome and treasure objectives. A tool catalogue offers **Quests for This Tool**, restricted to quest sources supported by that tool. A quest's What Counts? page offers **Filter by Tool**, starting with **All tools**. These are navigation filters, not quest acceptance, progress or reward actions; existing gathering and claim requirements remain unchanged.

A listed source can still give no reward because of a daily player/family cap, chunk exhaustion, world/area restrictions, disabled gathering or an unusable held tool. Source membership and current reward eligibility are separate; use `/forage limits` and the current feedback to diagnose a pause.

Source families define quest membership and shared family progression/caps; they are not an assurance that every block in a family uses the same tool. Tool family lists provide the fallback. **Exact-source correction (from build 755):** eleven plants in the Cave, Flora and Moss families use Forage Shears instead, keeping their existing family. Within Moss and Roots, Shears supports Small Dripleaf and Pale Hanging Moss; Moss Block and Moss Carpet require the Trowel. Shop cards and held-tool lore distinguish `all N listed sources` from `(some)` followed by exact examples and a `+N more` count. `/forage sources <tool>` shows the complete effective list. See the [player guide mapping](forage-camps.md#find-what-counts). Switching tools within one family does not bypass that family's allowance.

Paper 26.3 gathering includes poplar logs and stripped poplar logs with the Forage Axe, red/orange/yellow poplar leaves with Forage Shears, and red shrubs and shelf mushrooms with the Forage Sickle. These use the existing family rewards, tool progression, quests, and caps. Saplings are planting stock, and crafted poplar building blocks are not gathering sources. The organic turn-in rules also recognize the new leaves, shrubs, and mushrooms when they are plain vanilla items.

<a id="placed-resources-and-grown-harvests-upcoming"></a>

### Placed resources and grown harvests

From build 739, placing a configured resource records that position for Forage, regardless of who placed it, which hand/tool they used, their permissions or game mode, or the world. Breaking that marked block with a Forage tool will award no gathering XP, points, tool XP, branch progress, quest progress, Local Introduction action or treasure. This check runs before reward caps and chunk-exhaustion counters change. Ordinary breaking, drops and tool wear remain subject to their usual Minecraft, protection and tool-condition rules.

Normal and sticky pistons carry existing placement marks with moved blocks, including across chunk boundaries. Falling resource blocks carry their marks while falling and restore them at the landing position. Cancelled placements or moves do not change tracking. Marks have no timed expiry; waiting beyond the existing 12-second chat throttle only allows another notice, not another reward. Tracking continues for configured resources while gameplay or their family is paused. It uses chunk/entity persistence rather than a CoreProtect lookup on each break; it does not synchronously force each placement to disk.

Legitimate growth can produce eligible harvests, including offspring of bought, traded or reward-issued starters. Directly placing and breaking the original starter earns no gathering credit. The player must manually harvest the growth with its matching Forage tool; automated harvesting and later item pickup earn no gathering credit. World, protection, source, tool, maturity, provenance and cap rules still apply. `MOSS_BLOCK` is Moss/Trowel, while `POINTED_DRIPSTONE` is Cave/Pickaxe and `GLOW_LICHEN` is Cave/Shears. A family quest accepts its matching sources without requiring every material in the family; material-specific quests still require their named source.

A placed ageable crop loses its placement mark only when genuine growth reaches maturity. Structure/fertilizer growth that replaces a marked block with a different type clears the old mark; applying bonemeal without changing the type, such as to the original placed moss block, does not. Newly grown upper sugar-cane and bamboo blocks are unmarked, while the placed base remains marked. Bamboo seedlings are tracked when bamboo is configured, so manually stacking another bamboo above a seedling cannot turn its base into an unmarked resource. Structure changes can need a bounded next-tick verification before clearing a mark; cancelled growth or a new placement in the meantime must not erase the placement record. This is not a new blanket maturity rule for every pre-existing crop, nor natural-spawn verification for creatures.

**Active from build 764:** natural spread into a position formerly occupied by a physics-removed placed plant receives the same final-state verification as other growth replacements. The `BlockSpreadEvent` follow-up checks the resulting state on the next tick and preserves a newer placement record; see the [staff tracking contract](forage-camp-technical.md#placed-resource-tracking) and checklist F15c.

If tracking cannot verify a block, its gathering reward is withheld. A tracking-update failure can pause block rewards globally and prevent further placements or piston movements until staff investigates; a configuration reload does not clear that failure state. Check `/forage debug runtime` and the server log before planning recovery.

Tracking on this beta begins with build 739. Earlier placements have unknown history and are not backfilled. Staff WorldEdit and other out-of-band edits are not integrated. Normal chunk saves are not a guarantee that the latest in-memory marks survive a sudden crash before saving. See the [staff tracking contract](forage-camp-technical.md#placed-resource-tracking) for the storage boundary. Camp Turn-Ins deliberately continue to accept eligible plain bought, traded or stored items without gathering provenance.

Sword and mace Forage progress is entity-based. The sword listens to configured gentle creature entities such as cows, sheep, chickens, squids, rabbits, and turtles. The mace listens to configured danger entities such as shulkers, blazes, breezes, wither skeletons, ghasts, and phantoms. The plugin records a short-lived matching-tool melee hit and only awards progress if that same player is still holding the same curated tool type when the entity dies, within ten seconds of the recorded hit. The plugin does not register fragile custom enchants or rewrite vanilla loot tables for those routes; it awards Forage XP/points/treasure rolls when the matching curated tool is used for a configured entity source.

Tools are PDC-marked with schema, tool id, tier, tool XP, tool level, and use count. Lore explicitly labels the purchased **Forage tier** and XP-earned **Tool level**, alongside the tool soul progress bar, short tool personality line, exact-source hints, and a warning that the tool is curated.

Forage tool upgrades, refinement and enchantment application belong to their own camp menus. Repair & Merge is the existing repair route; the optional [Mending Upgrade](#mending-upgrade) below is included from build 745. The supported pages are **Upgrade Tool** and **Repair & Merge**: **sneak-right-click your own composter → Forage Camp → choose the service**. The player guide has complete [Repair & Merge instructions](forage-camps.md#repair-and-merge) and [upgrade/enchantment instructions](forage-camps.md#upgrade-a-tool), including both confirmation steps, which hand holds each tool and what gets consumed. Players can buy replacement tools and discard unwanted ones; ordinary storage, inventory rearrangement, dropping, and disposal remain available. Tools still work as ordinary Minecraft tools on other sources without earning Forage rewards.

Protection covers anvils (including virtual anvils), enchanting tables, grindstones, smithing, crafting repairs, automated crafters, smelting/fuel conversion, hopper insertion into transforming workstations, dispenser use, and unauthorized Mending. The approved Mending exception described below requires build 745 or newer. Entity interactions such as armadillo brushing also respect tool integrity and the safety lock. These guards remain active when Forage gameplay is dormant. The legacy `tools.block-*` switches are retained for configuration compatibility but cannot disable item protection.

Repair, rename, enchantment and item-edit commands recognize namespaces, registered aliases and configured alias chains. Core blocked prefixes are mandatory; `tools.blocked-repair-command-prefixes` can add restrictions. Checks cover the backpack, offhand, cursor and targeted online players, including console commands. A repair shortcut may be refused while carrying any Forage tool because providers differ in which inventory slots they modify.

CMI protection checks the public command-executor boundary, including direct commands dispatched by other plugins, plus its virtual-anvil repair and rename events. mcMMO's public checks reject repair, Super Repair, salvage and arcane salvage before their mutations. PyroMining Vessels, PyroFishing Augments and PyroWelcomes `/points` repair purchases are guarded at their actual provider callbacks. The points-shop guard reads the authenticated menu's configured commands and rejects a protected purchase **before points are deducted**. Unrelated points purchases remain available.

**External item-service protection:** the 11 October comparison with Halloween Virus found additional routes in ItemSoulBind, remotely targeted CMI commands and direct CMI aliases, plus PyroMining's admin `addvessel` command. The follow-up extends the shared provider guards and Forage recipient checks. These protections use the issued item's PDC identity, with no OP or permission bypass; ordinary items remain available. See the [follow-up verification](../compatibility-tests/forage-protection-parity-2026-10-11.md) and checklist S04c–S04e for in-game acceptance testing.

mcMMO Super Breaker, Tree Feller and Giga Drill Breaker activation is refused while a marked Forage tool is in the main hand, using mcMMO's public activation event. mcMMO may still show its right-click ready notice, but actual activation is cancelled before its buff or cooldown starts. If any of these three abilities is already active, block gathering with any marked Forage tool pauses until it expires or the player switches to an ordinary tool. Tree Feller's simulated block-break checks are silently refused for marked tools. Other simulated checks are only refused while one of these three abilities is active or its state cannot be checked. Forage ignores all mcMMO simulated breaks when awarding progress or showing family warnings, preventing false rewards and misleading wrong-tool messages for collateral leaves. Ordinary tools and unrelated mcMMO abilities retain their existing behavior. This change does not add rewards for ability-expanded breaks or make axes gather the shears' leaf family.

The reviewed Pyro adapters support PyroMining **4.6.1**, PyroFishingPro **4.9.35**, PyroWelcomesPro **0.5.1**, and PyroLib **1.4.9/1.6.0**. Those providers expose no equivalent cancellable application/purchase event, so isolated, read-only reflection authenticates their inventory sessions; display titles and lore are not trusted. The shared callback wrapper lets Halloween Virus and Forage protect their own items together and preserves either guard when the other closes. `/forage debug runtime` reports integration readiness. Missing protection for an installed provider pauses affected tool use, purchases and improvements until staff review it. See [protected tool integrations](../tool-item-protection.md) for the shared adapter lifecycle and verification boundaries.

Each issued tool records its approved material, tier, name and enchantments in the existing Forage PDC namespace. Tool mechanics must retain their vanilla defaults; upgrades change only the aspects supported by Forage. Before use or a paid improvement, changed or malformed tools pause with an explanation. The separate durability record restores outside repairs. Already-applied Pyro Augment or Vessel data also pauses the tool; it is preserved for staff review instead of being erased. Unrelated foreign PDC and components remain intact. The durability record remains a backstop for arbitrary external item setters. DiscordChat's enchant menu rejects Forage tools before charging points.

Unchanged older base tools migrate automatically. Older refined or enchanted tools pause for staff to check their history, keeping XP, uses, items and unrelated metadata. Staff can inspect with `/forage admin inspectitem <player>` and review `/forage admin toolapprove <player>` before explicitly adding `confirm`. This approves only supported older items with valid original identity and durability records. It cannot reapprove an already-recorded tool that was changed outside Forage.

Forage tools can also freeze themselves at a low configured durability floor instead of breaking. By default they safety-lock at 5 durability remaining, stop working for block/tool actions, and can be restored through the owned composter workstation’s Repair & Merge page. The Mending Upgrade adds ordinary XP repair for an approved tool, including at this five-durability lock.

**Container access while worn.** An otherwise valid Forage tool at the durability floor can remain in your hand while you open a chest, trapped chest, barrel, ender chest, any shulker box, furnace, blast furnace, smoker, hopper, dispenser, dropper or brewing stand. Opening one of these inventories does not use or repair the tool. Gathering, tool damage and external repairs remain blocked; a malformed or externally modified tool still fails its integrity checks before ordinary container access. This is a specific inventory-opening allowance, not permission to use every interactive block.

Forage also keeps the sneak-right-click composter recovery gesture reachable when the held tool fails a durability or integrity check. Camp ownership, permissions and current camp state still govern workstation access, and paid actions revalidate the tool and their other requirements before charging or changing anything. Vanilla sneaking behavior and other plugins’ protection decisions remain unchanged; Forage does not reverse their cancellation to force a container or workstation open.

To reduce sneaky external repair routes, each curated tool also stores its last legitimate durability state in PDC. Periodic inventory audits and live tool checks restore that tracked durability if an outside command, GUI, unauthorized Mending tick, or console-dispatched repair action tries to heal the tool outside an approved Forage repair path.

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

<a id="mending-upgrade"></a>

### Optional Mending I

**Introduced in canonical build 745 and verified on build 746 / Paper 26.3 STABLE 178 on 13 October 2026.** Tool Upgrades offers a one-time **Mending I** purchase for an eligible tool at **Tier III or higher**. The defaults cover all eight tools: Sickle, Axe, Trowel, Shears, Pickaxe, Brush, Sword and Mace. Hold the tool in your main hand at your owned active camp, complete its Local Introduction and review the confirmation. The required held-tool level defaults to 1; there is no additional player Forage-level requirement for Mending once camp access and the tool's tier are satisfied.

A **Tier III, Tool Level 1 Brush** is therefore eligible when the other requirements are met. The tier gate does not mean Tool Level 3. Unbreaking and Efficiency retain their separate configured tool-level gates.

The base price is **$10,000 and 250 Forage Points**, scaled by the existing improvement-cost multiplier. The shipped `normal` preset's 0.9 multiplier makes this **$9,000 and 225 Points**. The current menu quote is authoritative. Buying it does not restore durability immediately, and the same tool cannot buy Mending again.

**Active balance from build 749:** each new Mending purchase consumes **3 genuine Forage treasures per tool**, in any mix. This treasure amount is not scaled by the improvement multiplier. The player must first have **50 lifetime successful rewarded Forage gathering actions**; earlier qualifying actions with any matching Forage tool, including creature actions, count. This is a personal unlock, not a balance to spend or a requirement to gather 50 more times for each tool. Quest rewards and Turn-Ins do not count. The money and point prices above stay unchanged, and purchasing Mending does not deduct XP. These requirements were added after the historical build-746 verification.

For this purchase, put the treasures in your main backpack, **slots 9–35 above the hotbar**. Hotbar, offhand, armor and container contents do not count. Each treasure must carry Forage's genuine treasure marker and a valid delivery UUID; renamed ordinary items do not qualify. Treasures may come from another player: there is no finder-ownership requirement. Already-purchased Mending keeps working without meeting the new purchase requirements.

An approved Mending tool repairs through **ordinary Minecraft XP**, including while held in the offhand or stopped at the five-durability safety lock. It can reach **100% durability**, independently of Repair & Merge's player-level caps; normal Minecraft XP consumption and equipment selection still apply. XP repair grants no Forage XP, tool XP, points, quests, branch or treasure progress, and does not reset any gathering cap or chunk exhaustion. The improvement belongs to the tradable tool, not the purchaser's account.

Disabling new Mending purchases or removing a tool ID from the eligible purchase list does not revoke an already-approved Mending I tool at Tier III or higher. Outside enchantment application, repair commands, anvils and other item-modification routes remain blocked. Repair & Merge's donor, treasure, cost, durability-cap and donor-XP rules remain unchanged.

Repair & Merge remains available through the owned composter workstation, with its existing donor rules unchanged:

- the player must keep the workstation session valid at an active camp whose Local Introduction is complete
- the main hand must hold the Forage tool to keep
- the offhand must hold a matching Forage tool type to consume, such as shears with shears; donor tier and material do not need to match
- one PDC-marked Forage treasure item is consumed from ordinary inventory storage, including the hotbar; container contents are not searched. This differs from Mending's backpack-only treasure selection. Silted Keepsakes are not payment treasures
- the player pays configured Forage Points and CMI/Vault money
- the repair restores a configured durability percentage, capped by the player's Forage level
- a configured percentage of the offhand donor tool XP is transferred into the main-hand tool; donor durability, tier, material and enchantments are not transferred
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

Open Quests & Rewards at your active workstation and inspect the daily, weekly, monthly, and ready-to-claim pages. Quests count eligible Forage actions automatically; no separate quest-accept command is required. The shipped definitions contain ten daily, eight weekly, and five monthly quests. Targets and rewards vary by player and period, so use your own quest card rather than another tester’s numbers.

**Active from build 757:** `quests.daily-cap-progress.enabled` defaults to `true`. After a global or source-family daily XP/action cap, otherwise-valid actions may advance only unfinished, unclaimed current daily `actions`, `family`, `material` and `biomes` objectives, stopping at their targets. They grant no regular XP/tool XP/Points, treasures, branch/community/Herbarium/introduction progress or lifetime rewarded-action credit. Treasure, weekly and monthly objectives are excluded. All other gathering checks and chunk limits apply; spend chunk allowance only for an action that actually adds daily quest credit. Daily reset remains server-local midnight, and full once-per-period rewards still require the normal active-camp claim. Turn-Ins and the global gathering XP cap are unchanged. See the [player explanation](forage-camps.md#daily-quests-after-caps).

**Quest status filters.** Each Daily, Weekly and Monthly category has four buttons across the top:

| Filter | Quests shown |
| --- | --- |
| Show All | Every quest in that category; selected whenever the category is opened |
| Incomplete | Unfinished and unclaimed quests |
| Completed | Finished but unclaimed quests, whose rewards are ready to claim subject to the normal claim checks |
| Claimed | Quests whose rewards have already been received for this period |

The selected filter is highlighted and the buttons show counts. Changing filters returns to page 1 while retaining the category's existing quest order. Up to 28 quests appear per page, with Previous/Next when needed. An empty filter explains that there are no matching quests and directs the player to Show All. The separate **Ready to Claim** view still collects completed, unclaimed quests across periods.

Filtering changes only the display; it grants no progress, rewards or workstation authority. Clicking any quest opens its details with separate **What Counts?** and **Claim Reward** buttons. Back retains the originating category, filter and page; opening a category again starts at Show All. What Counts? uses the actual objective type below. Claim Reward retains the eligible owned camp, completed Local Introduction and once-per-period checks, and a confirmed claim closes the menu.

| Objective | What counts |
| --- | --- |
| Actions | Any eligible Forage gathering action |
| Family | Eligible actions in that exact family, such as leaves for Canopy Sampler |
| Material | Eligible breaks of that exact block, such as oak leaves for Oak Leaf Run |
| Biomes | An eligible gathering action in each distinct biome; travelling through it alone does not count |
| Treasure | A successfully delivered random Forage treasure find |

Eligibility normally requires rewarded gathering. The build-757 cap exception above additionally permits daily-only credit for its four supported objective types; it does not extend to weekly, monthly or treasure objectives.

Some quest descriptions use broad nature themes. Their configured family is decisive: Woodland Work counts **logs**, Forest Patrol counts **leaves**, Herbal Calendar counts **flora**, and Cave Cycle counts **cave**. Camp turn-ins, dust use, and admin XP/level changes do not substitute for gathering objectives.

**Cave Cycle** accepts the same seven Cave Forage sources: Glow Lichen, Cave Vines, Cave Vines Plant, Spore Blossom, Hanging Roots, Rooted Dirt and Pointed Dripstone. **Exact-source correction (from build 755):** Glow Lichen and Hanging Roots use **Forage Shears**; the other five keep the **Forage Pickaxe**. Their `cave` family and Cave Cycle membership do not change. Calcite, Amethyst Cluster, Magma Block and Dripstone Block remain **Stone** and do not advance that Cave-family quest. A source icon or dropped item is not its gathering identity: Glow Berries can illustrate Cave Vines, while Amethyst Shard is not the Amethyst Cluster block. `/forage source seagrass` and `/forage inspect` already resolve actual runtime support. Forage credit and vanilla drops are separate; block state and ordinary loot rules still determine what drops.

**Claim All (available from build 766):** the Quests hub and Ready to Claim list offer one button for the current ready daily/weekly/monthly quests. Click once, keep the menu open and stay at your active workstation while rewards are claimed individually. The run stops at a full inventory, failed claim or changed eligibility/session, retaining successful rewards and leaving untouched quests available until their normal reset. Uncertain claims keep their review references. Participation, Community Effort and Herbarium rewards remain separate. See the [player instructions](forage-camps.md#claim-all) and [acceptance checks](forage/checklist.md#claim-all).

Completion makes a reward ready; it does not automatically claim it. Return to an eligible owned workstation, open the completed quest and choose **Claim Reward** from its details. Built-in rewards can add Forage Points, Forage XP, and CMI/Vault money once for that quest and period. Quest-claim XP is separate from the daily gathering allowance; reaching that allowance does not itself prevent claiming a completed quest. If payments or a configured extra reward are unavailable, keep the completion and ask staff to inspect it. Repeated clicks must not pay twice. Use `/forage review` for a waiting request and share its reference with staff.

Quests may also include the item reward described on their card. Leave one empty inventory slot per reward stack: the whole reward must fit before anything is paid or claimed. Items go into your inventory, never onto the ground or into occupied equipment slots. If you are short of space, store some items and claim again; you do not need to repeat the quest. After successful delivery, the confirmation lists the received item reward, followed by `Next: Missing items? [View claim] [Put reference in chat]`. Hover View claim for the private reference and help; click it to view your claim. If items are still missing after reconnecting, choose Put reference in chat. It places the reference in an unsent chat draft; use Ctrl+A (Cmd+A on Mac), then Ctrl+C (Cmd+C on Mac), to copy it for staff. Nothing is sent automatically. Forage review and recovery reference buttons use the same behavior.

**Claim before the period ends.** The plugin uses the server’s configured timezone: daily quests reset by date, weekly quests use ISO weeks beginning Monday, and monthly quests use calendar months. A new period starts new progress and rolls; the current menu does not offer earlier periods’ unclaimed rewards. Confirm the test server’s timezone with staff.

<a id="participation-reward-upcoming"></a>

### Participation reward

Successfully claiming at least one daily quest and one weekly quest qualifies the player for one lifetime participation reward. Either order counts, and the two claims can come from different quest periods. Completing a quest without successfully claiming its reward does not qualify; monthly claims cannot replace either requirement. Qualifying claim history belongs to the player’s UUID and is retained across period changes, rather than resetting with daily or weekly quests.

The manual claim button is **Forage → Quests & Rewards → Participation Reward**. Claiming requires the owner’s current complete camp workstation and completed Local Introduction; qualifying never automatically awards the item. On profile load, retained historical quest records with `claimed: true` can establish the daily/weekly qualifications. Records no longer retained cannot be reconstructed.

Tracking qualifying claims and enabling the extra reward are separate. Successful daily/weekly claims are recorded even while participation claiming is disabled. The real map has not been supplied, so claiming remains off. Staff have prepared a disabled CMI kit named `forage_participation` with an unfinished item placeholder; it is not the promised map and must not be delivered as the reward. See the [staff setup](forage-camp-technical.md#participation-reward) and [beta checklist](forage/checklist.md) before enabling participation delivery.

Treasure finds are occasional bonuses from rewarded gathering, not guaranteed drops. The base chance is 1.8% per eligible action before tool and branch modifiers, with a default 90-second cooldown after a successful roll is prepared. Keep inventory space available: if the inventory cannot fit the selected treasure, the find is skipped before delivery. Nothing drops on the ground, no treasure is queued for later, and treasure totals and treasure-quest progress do not increase. The otherwise-valid gathering action still earns its normal progress. Ordinary treasures are marked items used by Repair & Merge and Greater Forage Dust; a vanilla item with the same material or a renamed copy is not equivalent. Legendary Pulse Dust has a 3% replacement chance within a treasure roll, not a 3% chance per gathering action, and should not be required to pass a short natural-drop test.

**Treasure appearance (from build 754):** newly created ordinary marked treasure drops shine by default through `treasures.mark-drops.glint: true`. This uses the native item glint override and adds no enchantment. Changing the setting affects future drops only; existing treasures and saved delivery payloads keep their appearance. Glint does not change treasure eligibility, PDC identity or delivery receipts.

<a id="herbarium-upcoming"></a>

## Herbarium

The [Herbarium](forage-herbarium.md), deployed in build 742, adds a permanent personal botanical discovery journal and twelve fixed collections with one-time item-only CMI kit rewards. Discoveries record the first successful Forage harvest's time, world and namespaced biome; alternate block forms share one canonical specimen. Ordinary item pickup, purchases, Turn-Ins and rejected gathering do not count.

The hub and `/forage herbarium` open the same journal anywhere while Forage and the journal are enabled. Show All/Missing/Discovered filters, pagination, source aliases, matching tools and habitat hints explain how to finish a collection. Browsing grants no camp authority. Claims require an owned active camp, Local Introduction and preview/confirmation, with no cost or expiry; ambiguous deliveries remain held for staff review. The shipped `herbarium.rewards.enabled` default remains false. The isolated beta deliberately enables its twelve named-dirt placeholder kits for delivery testing; authored/live reward acceptance is separate.

Approved botanical additions include firefly bushes, wildflowers/petals, eyeblossoms, pale moss, Nether growth, aquatic plants and roots. Mature pitcher crops become an eligible route; immature crops remain excluded. The build-742 source-default Turn-In list contains 97 item types. See the generated gathering/Turn-In lists and the separate [Herbarium collection and source reference](forage-herbarium.md#complete-collection-requirements).

<a id="seasonal-community-efforts-upcoming"></a>

## Seasonal Community Efforts

**Included in canonical build 741; beta activation is verified.** `/forage community` and the hub's **Community Cleanup** button show quarterly progress, separate gathering/resource/treasure lists, donations, rewards and history. Browsing is read-only. Contributions require the player to be in that season's included world pool; deliberate donations and reward claims retain active-camp checks.

All three community targets and all three personal minimums must be met. Defaults are 8,000 gathering actions and 8,000 donated resource items, each with a personal minimum of 300 and a daily player cap of 75; treasures have a community target of 35, personal minimum 2 and daily cap 1. These are independent totals. Seasonal donations consume eligible plain items or genuine marked treasures from backpack slots 9–35, preserving the hotbar/offhand. They do not award normal Turn-In XP/points. Ordinary gathering eligibility and rewards continue separately.

Seasons begin March 1, June 1, September 1 and December 1 at 00:00 Europe/Amsterdam. Rewards unlock only after the edition ends. Season Completion determines lifetime totals and streaks independently of claiming. After six months an unclaimed entitlement becomes dormant; paying five genuine treasures and claiming that reward occur together in one deliberate transaction. Staff purges require a preview and confirmation and preserve completion history.

See the [seasonal guide](forage-community.md) for the four world rotations, source/item distinction, frozen edition settings, CMI template requirements, isolated debug runs and backup/recovery boundaries. `community.enabled` defaults false; debug controls and actual debug kit delivery have separate false defaults.

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

Camp Turn-Ins consume eligible stacks from the normal storage inventory, including the hotbar. Keep items you want to retain in a chest before confirming and read the **Accepted Turn-Ins** and preview cards. Click Accepted Turn-Ins, or use `/forage sources turnins [page]`, for the full item catalogue; its entries reflect this server’s current eligibility rules. The separate What Counts? page explains submission rules and Source Families opens the gathering overview. This is an explicit Camp Delivery, not automatic credit for placing items in camp storage.

Use the [complete accepted Turn-In item list](forage-camps.md#complete-accepted-turn-in-item-list) for exact inventory materials and the [staff acceptance reference](forage-camp-technical.md#turn-in-acceptance-and-configuration) for configuration rules. This list is separate from the gathering catalogue: `GLOW_BERRIES` can be accepted as a crop item while its `CAVE_VINES` source is in the cave gathering family. Ordinary logs, calcite, saplings, sticks and poisonous potatoes are not accepted by default. `COCOA` is a crop block that Forage can gather; its plain `COCOA_BEANS` drop is accepted for Turn-Ins from build 739.

Accepted Turn-Ins is clickable and paginated, using the same effective material/family resolver as submission, including the `COCOA_BEANS` crop drop alias. The current shipped defaults contain 97 accepted item types; build 739 introduced the earlier 71-type list. Browsing the list does not submit items or grant rewards. A listed material must still be a plain vanilla stack, and the actual submission rechecks the inventory and camp conditions.

Items do not need Forage gathering provenance. Bought or traded plain resources can qualify, without completing a gathering quest, leveling a tool or choosing a branch first. Local Introduction and active workstation access remain required. Turn-Ins award their reduced player XP/points rather than gathering actions, tool XP or gathering-quest progress.

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

Forage retains that existing visit while browsing `/menu` and returning through `/forage`, provided the player stays within six blocks and the original five-minute visit has not expired. Commands never create or extend a visit, and every camp action still checks the current menu, ownership and camp requirements. A hub opened without a valid visit directs the player to sneak-right-click their composter. See the [navigation regression record](../compatibility-tests/forage-station-navigation-2026-10-11.md).

Camp-check feedback distinguishes a chunk-loading failure (wait briefly and retry), leaving the composter (return within six blocks), and an unavailable or remapped world (ask staff to inspect the registration). A config reload cancels pending checks with a retry message; disconnects remain silent and death asks the player to respawn and return. These checks do not change saved progress. The defaults are under `camp-visit.*` in `plugins/1MB-CMIAPI/CMIAPILIB/translations/forage.yml`; wording edits take effect with `/forage admin reload`.

Forage also reserves the composter gesture for Forage when reviewed PyroFarming 1.3.2, PyroFishingPro 4.9.35 or PyroMining 4.6.1 is installed. It withholds the competing tool-menu callback before it runs, covers both hands, and preserves normal Pyro shortcuts elsewhere and other plugins' interaction vetoes. An unverified integration blocks camp access with `camp-visit.menu-conflict` guidance to prevent a potential menu conflict. See the [interaction compatibility notes](../compatibility-tests/forage-pyro-camp-interaction-2026-10-11.md) for the verified boundary and pending in-game checks.

Default construction needs a composter anchor, 24 wool-family block positions (full blocks, stairs, or slabs), six fences, one lit campfire or lit soul campfire, one chest/trapped chest/barrel, and one crafting table within ten blocks horizontally and six vertically. Existing suitable vanilla camp features count, but an Abandoned Camp is not automatically a complete Forage Camp. Trees and lanterns are optional. The original thresholds were checked against [measured 26.3 source templates](../compatibility-tests/forage-26.3-camp-templates-2026-09-27.md).

The full checklist also requires **one lit candle position, one intact straw bed, one firefly bush, two cushions, one water-filled cauldron, one filled flowerpot, two stripped log/wood blocks and one banner**. The fire may be cooking food or empty. Undyed and colored candles count; candle cakes do not, and one to four candles on one block count as one position. A straw bed needs both matching halves inside the scan and counts once; ordinary beds do not substitute. Cushions can share a color or use mixed colors. A water-filled cauldron qualifies at level 1, 2 or 3; an empty, lava or powder-snow cauldron does not. Using some water is allowed, but emptying the last qualifying cauldron creates a shortage that requires deliberate revalidation once observed. Any vanilla-valid potted contents satisfy the flowerpot requirement; an empty pot does not. Firewood accepts any mix of stripped logs and stripped wood; stripped stems, hyphae and bamboo do not count, and no special distance from the campfire is required. Any plain or custom-patterned standing/wall banner qualifies. All these features must be placed within the scan; inventory items, dropped items and chest contents do not count.

Loss of a required feature or lit state makes the camp incomplete. Once Forage observes a shortage, restoring blocks alone does not clear its revalidation requirement. Restore or relight it, then deliberately confirm `/forage camp revalidate`. Registration, Local Introduction progress and global progress remain saved; an invalid Initial Camp also blocks its owner's Secondary Camps. See the [player construction checklist](forage-camps.md#build-the-checklist) for all current requirements.

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
| `/forage recent [page]` | player | Opens the same personal read-only Recent Activity GUI as the hub button, anywhere and while gameplay is paused. |
| `/forage community` | player/console | Open seasonal Community Cleanup anywhere; console prints status. Donations and claims still require an active camp. |
| `/forage tips` | anyone | Console prints hints; players are directed to the workstation tips page. |
| `/forage tools` | player | Directs you to the workstation tool and source-family guide. |
| `/forage sources [tool] [page]` | player | Opens the full read-only source catalogue anywhere; defaults to the held Forage tool or a picker. Trowel ID: `shovel`; `/forage source` is an alias. |
| `/forage inspect` | player | Quick chat summary of the looked-at block within six blocks and clickable Source details. |
| `/forage source <name>` | player | Exact-first name/ID lookup, then partial matches with a paginated chooser. |
| `/forage source block <name>` | player | Explicit block-source lookup. |
| `/forage source creature <name>` | player | Explicit creature-source lookup. |
| `/forage source search <name>` | player | Explicit source lookup without tool/family/control-name precedence. |
| `/forage sources families [page]` | player | Browse source families and matching tools. |
| `/forage sources family <id> [page]` | player | Open one gathering family. Bare IDs also work unless they match a tool ID. |
| `/forage sources turnins [page]` | player | Exact ordinary Camp Turn-In inventory-item list. |
| `/forage sources community [page]` | player | Exact current-season gathering list. |
| `/forage sources donations [page]` | player | Exact current-season resource-donation list. |
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
| `/forage debug season <spring\|summer\|fall\|winter\|real\|status\|nextday\|finish\|dormant\|ready player>` | admin/console | Isolated seasonal fixture controls; see the [seasonal debug contract](forage-community.md#isolated-seasonal-debug-runs). |
| `/forage debug rewards purge expired [token]` | admin/console | Preview dormant real-season entitlements, then confirm that preview within 60 seconds. History remains; this is irreversible reward cleanup. |
| `/forage debug all` | admin/console | Uses the shared debug output for build, server, hooks, commands, permissions, placeholders, and config. |

Commands for purchases, claims and other workstation activities redirect to the physical workstation, even when a camp is nearby. Use its GUI to perform those activities; a command does not grant reward-claim authority. The read-only source catalogue and Recent Activity commands can be used away from camp without granting a workstation visit.

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

The seasonal implementation also stores `data/community.yml` and `data/community.initialized`. Preserve the ledger and marker with transaction journals and receipts; it contains editions, contributions, daily usage, completion history and claim state. A profile-only backup does not cover seasonal entitlements.

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
- `messages.batch.*`: delayed batched chat summaries; Recent Activity history records immediately even with batching disabled. `recent-retain-limit` defaults to 25 (clamped 1–100), and `recent-entries-per-page` defaults to 8 (clamped 3–20).
- `quests.enabled`, `quests.claims.*`, `quests.progress-message-every`, `quests.allowed-command-prefixes`: quest runtime controls in `config.yml`
- From build 757: `quests.daily-cap-progress.enabled` defaults to `true`; permits only qualifying unfinished daily quest credit after global/family daily caps. Disabling it restores the ordinary cap stop without changing saved progress.
- `quests.yml`: daily, weekly, and monthly task definitions, min/max randomized targets, min/max point/XP/money rewards, optional `reward-kit` item templates, and legacy reward commands (arbitrary commands remain blocked)
- `branches.*`: branch ids, display names, icons, focused source families, level gates, switch cooldown/costs, and small branch bonuses
- `tools.*`: tool ids, materials, prices, unlock gates, family coverage, tool soul settings, modification guards, tier upgrades, diamond refinement, controlled Unbreaking/Efficiency improvements, and Repair & Merge costs/caps
- `sources.ids`, `sources.<family>.enabled`, `sources.<family>.materials` and `sources.<family>.entities`: enabled source-family IDs and exact block-material/entity definitions. Item-only materials cannot be block-break sources.
- `tools.ids`, `tools.<tool>.enabled` and `tools.<tool>.families`: enabled tool IDs and family-based tool fallbacks; the Trowel ID is `shovel`. All tiers share the same effective source mapping.
- From build 755: `source-tool-overrides.blocks.<MATERIAL>` replaces the family fallback for that exact block, for example `[shears]`. An empty list disables tool eligibility for that source. Existing custom settings are preserved; these overrides do not change the source family, quest classification or family caps.
- The generated [complete source catalogue](forage-camps.md#complete-source-catalogue) documents shipped defaults; the in-game catalogue follows effective runtime bindings after local configuration loads.
- `tools.enchants.mending.*` (build 745+): one-time Mending I purchases; defaults `enabled: true`, `max-level: 1`, `required-tier: 3`, all eight `tools` IDs, `required-tool-level-per-level: 1`, base money/points `10000`/`250` and both per-level costs `0`. Existing improvement multipliers apply; disabled/removed purchase eligibility does not revoke an already-approved Tier III+ tool.
- Build 749 balance: `tools.enchants.mending.treasure-cost: 3` is an unscaled per-tool payment; `required-gathering-actions: 50` is a personal lifetime rewarded-gathering unlock, not spent. Set either to `0` to remove that individual requirement. Previously approved Mending is unaffected.
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
- `community.*`: seasonal activation, logical world rotations, separate gathering/donation lists, axis goals and caps, literal CMI kit IDs, and explicitly gated debug controls
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
- Curated tool durability is tracked in PDC. If an outside command, GUI, unauthorized Mending tick, or targeted console repair command repairs a Forage tool outside an approved repair path, the plugin restores the last legitimate durability state on the next live check or audit pass.
- Camp turn-ins do not open an escrow inventory. They scan plain vanilla inventory stacks, confirm the plan, revalidate each slot, and only then consume items.
- Forage Dust does not open an escrow inventory. It checks camp state, money, Forage Points, plain vanilla bonemeal, required treasure items for greater dust, and inventory space at confirmation time before creating PDC-marked dust.
- Forage Dust growth pulses are bounded by configured allowed materials, the radius and max block count stored on the dust item, shared cooldown, allowed worlds, and WorldGuard checks. Dust does not award Forage XP or points.
- Field treasure finds and use of already obtained Forage Dust intentionally happen outside camps. Claiming an earned reward or purchasing dust still requires the eligible owned workstation; an inventory-delivered gathering find is not a remote reward-menu claim.
- Camp validation scans a bounded footprint, rechecks the Initial Camp, and obtains missing chunks asynchronously without generation; validation never edits blocks.
- WorldGuard is optional and checked by reflection so the jar can load without a compile-time WorldGuard dependency.
- Chunk exhaustion is intentionally conservative and cheap: it tracks chunk, source family, action count, and cooldown.
- The Local Introduction proves fresh personal qualifying actions in that world, not the origin of each ordinary stackable item. Build 739 rejects rewards for placements recorded since its activation and follows supported piston/falling-block movement, with explicit growth exceptions; historical placements, out-of-band edits and creature origins remain outside that guarantee.

## Future Direction

The 26.3 camp contract is described above. Later additions remain separate from this revamp:

- additional camp decoration and themed objectives beyond the current required features
- richer turn-in recipes and camp progression
- richer skill trees built on the v1 branch identity system
- higher-tier tool upgrades and unlock variants
- richer Forage Growth recipes and dust variants
- biome-specific rare herbs
- broader event profiles beyond the quarterly Community Efforts
- derbies and additional community milestones
- museum displays and journal extensions beyond the personal Herbarium
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
