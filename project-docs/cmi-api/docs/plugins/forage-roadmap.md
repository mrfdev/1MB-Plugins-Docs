# Forage Roadmap

This page preserves the planning notes for the `/forage` feature plugin. It is intentionally a roadmap, not a claim that every feature listed here exists today. The implemented v1 reference lives in [forage.md](forage.md).

The goal is to build Forage gradually as a player-facing nature progression system for Paper 26.3+ and Java 25-compatible bytecode. It should complement mcMMO Woodcutting/Herbalism, JobsReborn jobs, and Pyro-style progression plugins without replacing them or creating economy loops.

## Release Gate: 26.3 Camp Integration

Tracking issue: [#35](https://github.com/mrfdev/1MB-Library/issues/35).

The owner authorized the camp revamp on 27 September 2026. Its initial local verification used suite build 704 on Paper 26.3 ALPHA 49; that is historical evidence, not the current server baseline. As reviewed on 9 October 2026, the maintained target is Paper 26.3 BETA, with later plant and tool-protection verification documented in the [main reference](forage.md). The accepted contract is recorded in the [player guide](forage-camps.md) and [technical guide](forage-camp-technical.md). Use the [10 October beta checklist](forage/checklist.md) for connected-client acceptance. Live activation remains pending, and the 26.2 instance remains preserved for rollback.

Live gameplay remains dormant until the new camp integration and owner acceptance are complete. Keep `enabled: false` on live; a new suite JAR or successful local test is not permission to activate it. Exclude dormant Forage from `/next`, focus choices, first-success guides, and ScheduledTips promotion. Preserve saved progress and hint preferences.

The 26.3 pivot uses counted current features in a bounded footprint, with explicit registration of one Initial Camp and two optional Secondary Camps. It does not require structure provenance: a player-built equivalent is valid. The first camp and all its replacements must be Dappled Forest in an approved initial world, initially Wild. All camp use depends on that Initial Camp remaining valid. This replaces the earlier idea of treating the wilderness introduction as a permanent access unlock.

Official [26.3 release notes](https://www.minecraft.net/en-us/article/minecraft-java-edition-26-3) and the actual local server templates were reviewed. [Measured template evidence](../compatibility-tests/forage-26.3-camp-templates-2026-09-27.md) establishes the material choices and explains why cushions are optional entities. The source inspection is reproducible without placing structures in any world.

## Product Direction

Forage should give players who enjoy hands-on survival gathering a reason to travel, notice the local biome, establish a few useful camps, and return with resources. A satisfying session should be possible through a small gathering trip, with modest rewards and useful progress. Large farms and automation should not be prerequisites for participating or the main way to advance.

The owner's expanded vision is a loop of exploration, camp setup, biome gathering, storage, delivery, and progression. Small boosters, rewards, streaks, quests, milestones, and Community Efforts give those activities continuity. Camp Stations should make the placed camp feel functional: players can inspect their progress, learn what to gather, and see where to store or deliver it by interacting with the camp itself.

Treat this as product direction for continued development. The three-camp registration and workstation-access contract below is accepted; first-release activation still needs implementation verification and gameplay acceptance. Boosters, Community Efforts, and managed storage have separate scope. The presence of an idea here does not mean it is implemented or that every long-term system must ship together.

Forage should make wilderness gathering feel like its own activity:

- players use curated PDC-marked forage tools, not normal tools
- valid actions grant Forage XP, Forage Points, tool XP, streak progress, and occasional treasure rolls
- source families include wood, plants, caves, mushrooms, shorelines, Nether roots, End plants, and seasonal/event plants
- a Forage Camp gives the system an in-world home; players should be able to complete a discovered Abandoned Camp with Forage equipment and less construction
- a player can register up to three Forage Camps and revisit them as gathering bases
- Camp Stations connect quests, streaks, milestones, gathering guidance, storage, and deliveries to the location
- small personal rewards and Community Efforts make manual gathering trips worthwhile
- caps, chunk exhaustion, source-family cooldowns, and WorldGuard rules keep the system from becoming a farm exploit

The public command should be:

```text
/forage
```

The feature can still be described as "Foraging" in titles and docs.

## Version Plan

### Version 1: Testable Core

V1 should be small enough to test seriously on the Paper test server.

The version stages below preserve feature-scope history. Completing a local stage does not override the live release gate above.

Included:

- `/forage`, `/forage help`, `/forage info`, `/forage stats`, `/forage shop`, `/forage top`, `/forage tips`, `/forage tools`, `/forage debug all`
- PDC-marked starter tools bought at the owned composter workstation; `/forage shop` directs players there
- tool-gated foraging only; normal tools do not count
- basic source families: wood, plants, cave, mushrooms, moss, dry finds, and field fruit
- Forage XP, levels, Forage Points, daily caps, and chunk exhaustion
- simple v1 treasure rolls from configured vanilla materials
- tool soul lore with short personality text and a progress bar
- Forage Dust v1: camp-gated PDC dust batches with bounded growth pulses, cooldowns, allowed-world checks, WorldGuard checks, and no Forage XP awards
- safe GUI with the shared light-blue pane theme
- YAML storage for v1 test data, with SQLite kept as a future storage-hardening discussion if live scale requires it
- WorldGuard conservative mode: count only in `__global__` by default when WorldGuard is present
- admin/debug output explaining why an action counted or did not count

V1 should not include mini-bosses, custom trees, auctions, pet magic, or broad terrain-changing magic.

### Version 2: Camps And Skill Flavor

Add the home-base loop and early identity:

- Forage Camps adapted from vanilla Abandoned Camps or player-built equivalents, using the accepted 26.3 material checklist and a composter workstation
- sneak-right-click camp composter opens Forage GUI or a camp page while normal right-click keeps vanilla composting behavior
- camp composter turn-ins for approved vanilla natural scraps
- camp ready notifications, implemented in v1 as throttled ready feedback when a player validates a complete camp
- early skill branches such as Herbalist, Woodsman, Trailkeeper, Cave Botanist, and Wild Alchemist, implemented in v1 as configurable identity paths with focused source-family bonuses
- camp-only tool tier upgrades using Forage Points and level milestones, implemented in v1 for held tools
- explicit `/forage camp` registration for one Initial Camp plus two optional Secondary Camps, implemented and locally verified on 26.3
- Camp Stations for gathering guidance and progress, with Camp Storage and deliberate Camp Deliveries, planned
- more placeholders for holograms and ajLeaderboard

### Version 3: Seasons, Magic, And Events

Add seasonal systems after the core is stable:

- Christmas, Summer Festival, Halloween, Valentine's Day, Thanksgiving, and custom event profiles
- seasonal source weights, rare drops, particles, sounds, tips, and treasure tables
- biome-specific rare herbs and roots
- magic transformations with explicit caps and configured recipes
- richer Forage Dust recipes, Forage Growth, Bountiful Harvest, Rootsense, Bloom, and Tender
- Herbarium collections and museum-style plant books
- short Foraging Derbies and manually started tournaments

### Later Modules

These are interesting but should stay out of the first live rollout:

- rare mini-boss or guardian encounters
- botanical auctions
- pet variant magic
- custom display fruit on trees
- tree taps for sap/syrup
- lunar lilies and ethereal darkness seeds
- automated scheduled tournaments
- broad custom world/tree generation

## Tool-Gated Foraging

Forage should only count when the player uses a curated plugin-issued tool with trusted PDC markers. This is the main anti-abuse line and keeps normal Minecraft play normal.

Possible tools:

| Tool | Source families |
| --- | --- |
| Forage Hoe | crops-adjacent wild plants, flowers, moss, berries |
| Forage Sickle | bush, dead bush, tall grass, ferns, delicate wild growth |
| Forage Axe | logs, stripped logs, pumpkins, melons, mushrooms, vines |
| Forage Shovel | rooted dirt, podzol, mud, clay, sand-adjacent finds |
| Forage Shears | leaves, glow lichen, vines, seagrass, ferns |
| Forage Scythe | later higher-tier small-radius delicate-plant harvesting |

Tool tiers:

- Basic Forage Tool: bought with CMI money
- Seasoned Forage Tool: upgraded with Forage Points
- Expert Forage Tool: unlocked by level milestone
- Event Forage Tool: limited seasonal variant

The plugin should control tool name, lore, fake enchants, PDC, durability/charge data, and upgrade path. Forage tools should be blocked from normal enchantment tables, anvil merges, grindstone abuse, `/cmi anvil`, mcMMO repair, custom enchant plugins when detectable, and repair paths that would make finite tools infinite.

Future integration todo: investigate reliable detection and suppression of mcMMO active abilities and perk-side durability effects while players are holding curated Forage tools, especially cases similar to Super Breaker or other accelerated-use paths.

## Concrete Tier 2 Tool Plan

Tier 2 should feel like a real expansion of the current copper starter set rather than a random pile of extra items. Current v1 now includes a practical first pass with pickaxe, brush, sword, and mace. Pickaxe/brush are block-source tools, while sword/mace are entity-source tools with the same world, WorldGuard, daily cap, chunk/source exhaustion, low-durability, and PDC identity checks as the rest of Forage.

The longer-term shape is still:

1. keep the current four starter tools as Tier 1
2. unlock Tier 2 only after players prove they used the whole starter set
3. keep block-focused Tier 2 tools and entity-focused Tier 2 tools configurable separately
4. add stricter provenance checks later if mob-farm or spawner exploitation becomes a real issue

### Tier 2 Unlock Rules

Recommended unlock gate:

- player Forage level at or above 10
- a complete nearby Forage Camp
- all four Tier 1 tools owned at least once
- all four Tier 1 tools brought to tool level II
- a one-time unlock cost in CMI money plus Forage Points

Recommended next-stage gates:

- Tier 2A unlocks `Pick` and `Brush`
- Tier 2B unlocks `Sword` and `Mace`
- Tier 2B should also ask for either:
  - 100 total Forage treasures found, or
  - completion of a small Tier 2 introduction quest chain

This gives players a clear ladder:

```text
Tier 1 copper tools -> complete camp -> tool level II on all four -> Tier 2A -> Tier 2B
```

### Tier 2A: Safer Block-Focused Tools

These are the low-risk Tier 2 tools because they can stay centered on natural blocks and curated loot tables.

| Tool | Base item | Suggested display name | Main source families | Example finds | Notes |
| --- | --- | --- | --- | --- | --- |
| Pick | `COPPER_PICKAXE` | `Forage Pick I` | crystal, volcanic, fossil, endgrowth | amethyst shard, calcite, bone meal, magma cream, glow ink sac, echo-shard-style fragments | Good first Tier 2 tool because it stays block-focused. |
| Brush | `BRUSH` | `Relic Brush I` | shoreline relics, desert relics, archaeology, spores | pottery sherds, clay balls, gold nuggets, nautilus shell, prismarine crystals, glow berries | Fits camps, beaches, deserts, and curated dig patches. |

Recommended Tier 2A source-family scope:

- `crystal`: budding amethyst area blocks, amethyst clusters, calcite, smooth basalt-adjacent curated finds
- `volcanic`: basalt, blackstone, magma, soul-soil-adjacent curated finds
- `fossil`: bone block, suspicious gravel-adjacent relic finds, dead coral or dry remains if enabled
- `endgrowth`: purpur, chorus plant, chorus flower, end stone-adjacent curated finds
- `shoreline relics`: suspicious sand, suspicious gravel, clay, sand, gravel, beach flora
- `desert relics`: suspicious sand, terracotta-adjacent relic tables, dead bush patches
- `archaeology`: explicit suspicious block support if we decide to count brush interactions instead of only break events

Tier 2A reward posture:

- about 25% higher XP than Tier 1 actions
- about 25% higher point rewards than Tier 1 actions
- smaller source coverage, but better treasure tables
- lower daily action caps than Tier 1 if needed

### Tier 2B: Salvage And Trophy Tools

These are fun, but they need more care. The first v1 implementation is enabled through configured entity source families and conservative caps; later provenance checks can still decide whether a mob was natural, farmed, bred, or spawned.

| Tool | Base item | Suggested display name | Main source families | Example finds | Risk note |
| --- | --- | --- | --- | --- | --- |
| Sword | `COPPER_SWORD` | `Forage Sword I` | creature_drops | leather, wool, feathers, ink sacs, rabbit hide, scutes | Current v1 source is configured entity kills with the matching curated tool. |
| Mace | `MACE` | `Forage Mace I` | danger_drops | blaze rod, breeze rod, shulker shell, ghast tear, phantom membrane, rare skull sources | Current v1 source is configured riskier entity kills with the matching curated tool. |

Recommended Tier 2B source-family scope:

- `cobweb`: cobwebs, cave cobweb clusters, mineshaft scraps
- `vinecutting`: vines, cave vines, kelp, twisted vines, weeping vines
- `shoreline salvage`: squid and glow squid salvage only if natural-spawn checks exist
- `natural-hide`: leather, wool, feathers, rabbit hide only from validated natural-source logic
- `brittle relics`: bone block, decorated pot fragments, fragile ruin finds
- `blaze salvage`: blaze rod table with strict caps
- `breeze salvage`: breeze rod table with strict caps
- `end trophies`: shulker shell or very rare End salvage if the player is using the Mace path

Recommended Tier 2B safeguards:

- no spawner counts
- no breeder or farm counts
- no custom-named mob counts
- only natural-spawn validated mobs if entity drops are involved
- separate daily caps from Tier 1 and Tier 2A
- stricter chunk or area exhaustion
- explicit per-family cooldowns
- loot-table toggles per family in config

If natural mob provenance becomes necessary, Tier 2B can stay enabled but have specific entity sources disabled or heavily capped while the stricter checks are built.

### Suggested Tier 2 Quest Set

Tier 2 quests should feel a little more special than the v1 daily branch and family tasks. The rewards can still use the same min/max randomizer model as `quests.yml`.

#### Tier 2A Quest Ideas

| Quest id | Tool | Quest idea | Example target shape |
| --- | --- | --- | --- |
| `crystal_sweep` | Pick | Gather crystal-family finds from geodes or volcanic pockets | 14-28 |
| `basalt_breaker` | Pick | Work volcanic-family nodes in the Nether | 10-22 |
| `endgrowth_study` | Pick | Harvest End growth finds using the curated pick | 8-18 |
| `shoreline_relics` | Brush | Brush or recover relic-family finds near beaches | 8-16 |
| `dust_and_shards` | Brush | Recover archaeology-family curios and a small pottery total | 6-14 |
| `dune_memory` | Brush | Complete a desert relic sweep | 10-20 |

#### Tier 2B Quest Ideas

| Quest id | Tool | Quest idea | Example target shape |
| --- | --- | --- | --- |
| `web_whisperer` | Sword | Cut through cobweb or vinecutting finds | 20-45 |
| `shore_knife` | Sword | Gather shoreline salvage with the blade | 12-24 |
| `natural_hide_run` | Sword | Recover validated natural-hide finds | 8-18 |
| `ruinbreaker` | Mace | Collect brittle relic salvage or ruin finds | 10-22 |
| `blaze_salvage` | Mace | Recover a small number of blaze-family drops | 4-10 |
| `end_keeper` | Mace | Recover End trophy finds under strict caps | 3-8 |

### Recommended Tool Identity And Shop Flow

Tier 2 tools should still feel like part of the same family:

- Tier 1 stays copper and approachable
- Tier 2 uses a "seasoned expedition" identity
- `Brush` and `Mace` can use copper-themed names, lore, particles, and GUI colors even though their vanilla item is not copper
- each Tier 2 tool should have its own soul-line pool and its own progress flavor

Suggested shop layout:

- `/forage shop` page 1: Tier 1 tools
- `/forage shop` page 2: Tier 2A tools
- `/forage shop` page 3: Tier 2B tools
- locked tools still visible with hover text showing exact unlock rules

### Tool Soul Ideas For Tier 2

Tier 2 soul lines can sound a little more experienced than Tier 1:

```text
:) I can hear crystal echoes
:) Ruins remember more than people think
:) Brush gently, treasure hates panic
:) This blade knows where the webs hide
:) One more strike, there is something rare here
```

### Technical Notes Before Enabling Tier 2

Things that already look realistic:

- Pick
- Brush
- more quest definitions
- higher reward tables
- extra GUI and shop pages
- extra placeholders and leaderboard categories

Things that should be treated as gated work:

- Sword rewards from animals or squids
- Mace rewards from hostile mobs
- anything that depends on natural-spawn validation
- anything that could be sourced from mob farms, grinders, or breeders

So the practical rollout order should be:

1. add Tier 2A first
2. test it on the Paper server
3. decide whether block-only Tier 2 feels rich enough
4. only then enable Tier 2B with provenance checks

## Tool Soul

Forage tools can have a small "soul" personality line in lore. This should make the tool feel personal without creating power creep.

Examples:

```text
:) I'm looking for treasure
:) Let's harvest some fun
:) I heard roots whispering nearby
:) Maybe the next leaf hides a secret
:) Adventure smells like moss today
```

Tool soul can also show progress:

```text
[###-------] 30%
```

Soul text should update only on meaningful moments such as tool level-up, treasure find, daily streak, milestone, or manual refresh. Avoid changing item metadata on every block break.

## Source Families

Forage should be broad and configurable.

Use the local biome and its ecology to give gathering trips variety. The owner highlighted fallen leaves, wildflowers, new tree types, and sniffer-related gameplay as inspiration for future content. Evaluate these as candidates for supported materials, objectives, or interactions during the relevant version review; they are not all implemented source routes. Tasks should give players useful reasons to explore and gather what the area offers.

Wood:

- logs
- stripped logs
- bark-style interactions
- leaves
- apples
- sticks
- saplings
- vines
- hidden bark caches
- rare tree treasure rolls

Plants:

- flowers
- grass
- tall grass
- ferns
- berries
- bamboo
- cactus
- mangrove propagules
- cave vines
- glow berries
- seasonal plants

Caves:

- glow lichen
- moss
- moss carpet
- azalea
- rooted dirt
- clay
- cave vines
- glow berries
- underground mushrooms
- small hidden caches

Mushrooms:

- its own source family
- can be disabled, biome-limited, or weighted toward Mushroom Fields so mushroom island biomes feel special

Seasonal or special areas:

- summer flowers
- Halloween mushrooms
- Christmas spruce finds
- Valentine roses
- Thanksgiving/autumn roots and herbs

## Anti-Grind Design

Forage should avoid rewarding obvious farm loops.

Accepted v1 posture:

- build and test on the Paper test server first
- do not go live until anti-farm tracking feels good enough
- use fast material/tool/PDC/world checks before doing heavier work
- use small radii for every active ability
- default to WorldGuard `__global__` only when WorldGuard is installed

Chunk exhaustion is the preferred first-pass anti-grind system:

- track chunk plus source family, not every block
- example keys: `world/chunk/wood`, `world/chunk/cave`, `world/chunk/mushroom`
- chunk state can be fresh, worked, tired, exhausted
- exhausted chunks give reduced XP/treasure or no rare rolls
- exhaustion decays over time or resets daily
- player message: `This chunk feels picked clean for now.`

Relevant block placement tracking can be added before live if testing shows chunk exhaustion is too blunt. If added, only track configured forage materials from `BlockPlaceEvent`, store compact coordinates and timestamps, and prune aggressively.

## Caps

Cap types:

- momentary: treasure rolls per minute, combo rewards per short window, growth pulses per activation
- hourly: high-value rewards while normal XP trickles
- daily/weekly: bonus XP, shop purchases, treasure claims, camp collections, tool abilities
- ability caps: max Fortune level, Growth tier, radius, charges, tool XP per day
- shop caps: per player, per item, per day/week/month, optional global stock
- community caps: max daily contribution per player toward server-wide goals

Debug output should explain cap/cooldown reasons clearly.

## Forage Camps

The accepted 26.3 loop is:

1. Find Dappled Forest in Wild and complete a vanilla Abandoned Camp or build an equivalent.
2. Inspect the materials and deliberately register an exclusive Initial Camp through `/forage camp`.
3. Use its composter workstation for starter tools and the Local Introduction: fresh personal gathering in that world, followed by deliberate delivery.
4. Complete the introduction to unlock eligible global benefits at that camp.
5. Optionally establish two Secondary Camps in other whitelisted worlds, each with its own Local Introduction.
6. Return to an owned valid workstation to submit resources or claim rewards; maintain the Initial Camp for all secondary access.

Exactly three registrations are allowed, one per actual world, with the initial slot permanently reserved. No camp sharing or overlapping footprints. Breaking a required block makes the camp unusable but preserves its registration until explicit unclaim. Repair/revalidation keeps its introduction progress; a replacement registration starts it again. Global XP, points, quests, caps, and claimed-reward history survive damage, unclaim, relocation, and world resets.

The current whitelist is `end`, `nether`, `general`, `wild`, `cave`, `acid`, `oneblock`, `skyblock`, `chunkblock`, and `skygrid`. `builders`, `spawn`, and `legacy` are blacklisted; unlisted worlds are unavailable. Explicit logical-to-physical world mappings let the local server test game modes without copying live worlds. Future approved initial worlds can be added deliberately; Dappled validity remains required there.

### Materials and locality

The composter anchor, crafting table, 24 wool-family blocks, six fences, one campfire, and one chest/barrel are the initial minimum. Full wool, stairs, and slabs count toward shelter. Existing structure features count. The ten Dappled tent source templates contain 29–57 wool stairs and seven or eight fences, while campfire pieces vary; these are source-piece measurements, not a generated-camp average. Cushions and beds are optional, and the old tree-grove requirement is retired for this flow.

Camp use revalidates both the camp being used and the owner's Initial Camp. Async no-generation loading and bounded scans must avoid synchronous cross-world stalls. Pending or unavailable verification cannot authorize submissions or reward delivery.

### Local play and global benefits

The default Local Introduction requires 30 personal qualifying actions after registration in the camp's world, then eight eligible plain gathering items deliberately submitted there. Starter tools and introduction instructions remain accessible while reward benefits are locked. The fresh action requirement cannot be met by another player's work or historical profile totals. Island and dimension routes need achievable sources without a multi-biome exploration requirement.

Balances and progression remain global. Current-inventory submissions contribute to the same profile regardless of world inventory groups. Rewards require a current owned workstation session, completed introduction, and valid Initial Camp. A command, old menu, or teleport cannot bypass the location rule. The design intentionally allows global points to be spent at any eligible owned camp; it does not turn every reward into a locally earned currency.

### Stations, storage, and later integrations

The composter is the Camp Anchor and workstation entry; normal right-click retains vanilla composting and sneak-right-click opens the Forage flow. Existing supported tool, quest, repair, upgrade, turn-in, and dust features remain foundations. Temporary hearts, external points, kits, and fishing tournaments are candidate audited reward integrations, not already available reward engines.

Keep Camp Storage and Camp Delivery distinct. A plain chest/barrel satisfies physical storage requirements, but storing items there does not automatically submit them or earn progress. Plugin-managed storage and Community Efforts remain later work with their own permission, overflow, transaction, and recovery design.

### Security, durability, and acceptance

All mutations need authoritative GUI/session checks, current camp and ownership checks, exact inventory/cost validation, duplicate protection, and durable transaction evidence. Arbitrary external command acceptance is not delivery proof. Ordinary progress saves must be frequent, bounded, ordered, and asynchronous; ambiguous effects after a crash require review rather than automatic replay.

The private implementation checklist tracks adversarial GUI testing, migration, unload/reload, mapped worlds, cross-world claims, main-thread performance, restart/crash recovery, the canonical full-suite build, and local gameplay acceptance. The public guides and beta checklist are being published for advance reading and testing; publication does not authorize a live server change or activation.

## Foraging Magic

Magic should be whimsical and bounded.

Candidate fake/PDC/lore enchants:

- Foraging Fortune
- Foraging Booster
- Foraging Spread
- Foraging Focus
- Foraging Echo
- Foraging Bloom
- Foraging Tender
- Forage Growth I/II
- Foraging Rootsense
- Bountiful Harvest
- Wild Sweep
- Scythe Cleaving
- Sickle Loot

Magic rules:

- no real server enchant registration
- cooldowns and daily caps
- consume real inventory resources when appropriate
- particles/sounds first, real block changes only if explicitly configured
- no global random-tick manipulation
- no large terrain rewrites

## Seasonal Ideas

Seasonal profiles can adjust:

- source weights
- treasure tables
- GUI color/filler themes
- tips
- particles and sounds
- CMI toast messages
- rare drop names

Event profiles:

- Christmas
- Summer Festival
- Halloween
- Valentine's Day
- Thanksgiving

## Rare Ideas For Later

These are possible but should not be first-pass scope.

XP Orchids:

- rare golden flower-style finds
- grant small vanilla XP
- strict daily caps

Ethereal Seeds:

- rare PDC seeds that only grow in complete darkness
- possible through plugin-managed light checks and growth guards

Lunar Lilies:

- bloom only during full moon or configured moon phase
- use active/inactive states, particles, display markers, or safe block swaps

Wild tree fruit:

- visual fruit on camp/event grove trees through player heads, particles, or display entities
- harvest into apples or PDC fruit keepsakes

Rare encounters:

- optional future mini-bosses spawned from rare foraging actions
- capped per player/day
- auto-despawn after about 60 seconds
- no spawn in protected/crowded/blocked areas

## Storage

V1 uses self-contained YAML files so the first test jar stays simple and easy to inspect:

```text
plugins/1MB-CMIAPI/Forage/data/profiles.yml
plugins/1MB-CMIAPI/Forage/data/chunks.yml
```

SQLite remains the likely long-term storage option if Forage grows into high-volume live tracking, block provenance, tournaments, herbariums, or per-chunk history.

Suggested future runtime folder:

```text
plugins/1MB-CMIAPI/Forage/database/
```

Suggested future split:

```text
forage-progress.db
forage-tracking.db
```

`forage-progress.db` stores durable state:

- player level
- XP and points
- tool identity and tool XP
- camps
- milestones
- herbarium progress

`forage-tracking.db` stores prunable high-volume data:

- chunk exhaustion
- relevant placed blocks if enabled
- action logs
- tournament snapshots
- seasonal reports

Storage rules:

- use schema migrations
- use prepared statements
- keep hot counters in memory and flush in batches
- avoid slow DB scans in block-break/interact handlers
- cache placeholder/leaderboard stats
- prune tracking data by age and purpose

## Commands To Consider

```text
/forage
/forage help
/forage info
/forage stats
/forage top [level|xp|points|actions|treasures|daily|weekly] - implemented as a read-only v1 profile leaderboard
/forage guide
/forage skills
/forage perks
/forage streaks
/forage quests
/forage journal
/forage shop
/forage tips
/forage tools - implemented with tool info, camp-only tier upgrades, and Repair & Merge
/forage tournaments
/forage admin reload
/forage admin inspect <player>
/forage admin camp inspect <player>
/forage admin camp reset <player>
/forage admin camp validate
/forage admin event <start|stop|status>
/forage admin tournament <start|stop|status>
/forage debug all
```

## Placeholder Ideas

```text
%onembcmi_forage_level%
%onembcmi_forage_points%
%onembcmi_forage_daily_points%
%onembcmi_forage_weekly_points%
%onembcmi_forage_lifetime_points%
%onembcmi_forage_streak%
%onembcmi_forage_rank_weekly%
%onembcmi_forage_rank_lifetime%
%onembcmi_forage_rare_finds%
%onembcmi_forage_tournament_rank%
```

## Config Shape

Likely files:

```text
config.yml
sources.yml
skills.yml
rewards.yml
seasons.yml
magic.yml
encounters.yml
herbarium.yml
auctions.yml
tournaments.yml
messages.yml
```

V1 can start with fewer files, but the structure should leave room for these ideas.

## Integration Notes

Expected:

- CMI for economy, EXP, mail, ctext, reward commands, and toast command hooks
- CMILib/1MB-CMIAPI-LIB for GUI, debug, config, translations, playerdata helpers, and feature registry
- PlaceholderAPI for holograms and dashboards
- LuckPerms for permissions and unlocks
- WorldGuard as an optional but expected protection hook, defaulting to `__global__` only

Optional later:

- DiscordSRV for rare find, tournament, and community milestone announcements
- JobsReborn/mcMMO/Pyro plugins as read-only context, not reward duplication
- auction/economy plugins only after economy review

## Security Notes

- Strict command input parsing.
- No raw player-defined commands.
- GUI safe holders, cancelled clicks/drags, debounced actions, no item duplication paths.
- Player text should be avoided or heavily sanitized.
- Tool PDC must be trusted and versioned.
- Rewards must be admin-configured and placeholder-sanitized.
- Debug must explain why an action counted or did not count.

[Documentation index](../README.md)
