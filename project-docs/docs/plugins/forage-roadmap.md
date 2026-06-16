# Forage Roadmap

This page preserves the planning notes for the `/forage` feature plugin. It is intentionally a roadmap, not a claim that every feature listed here exists today. The implemented v1 reference lives in [forage.md](forage.md).

The goal is to build Forage gradually as a player-facing nature progression system for Paper 26.1.2+ and Java 25. It should complement mcMMO Woodcutting/Herbalism, JobsReborn jobs, and Pyro-style progression plugins without replacing them or creating economy loops.

## Product Direction

Forage should make wilderness gathering feel like its own activity:

- players use curated PDC-marked forage tools, not normal tools
- valid actions grant Forage XP, Forage Points, tool XP, streak progress, and occasional treasure rolls
- source families include wood, plants, caves, mushrooms, shorelines, Nether roots, End plants, and seasonal/event plants
- a player-built Forage Camp gives the system an in-world home instead of making everything command-only
- caps, chunk exhaustion, source-family cooldowns, and WorldGuard rules keep the system from becoming a farm exploit

The public command should be:

```text
/forage
```

The feature can still be described as "Foraging" in titles and docs.

## Version Plan

### Version 1: Testable Core

V1 should be small enough to test seriously on the Paper test server.

Included:

- `/forage`, `/forage help`, `/forage info`, `/forage stats`, `/forage shop`, `/forage top`, `/forage tips`, `/forage tools`, `/forage debug all`
- PDC-marked starter tools bought from `/forage shop`
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

- player Forage Camps with logs, campfire, crafting table, barrel, composter, bed/tent blocks, optional lanterns, and a tree-grove requirement, partially implemented in v1 camp validation
- sneak-right-click camp composter opens Forage GUI or a camp page while normal right-click keeps vanilla composting behavior
- camp composter turn-ins for approved vanilla natural scraps
- camp ready notifications, implemented in v1 as throttled ready feedback when a player validates a complete camp
- early skill branches such as Herbalist, Woodsman, Trailkeeper, Cave Botanist, and Wild Alchemist
- camp-only tool tier upgrades using Forage Points and level milestones, implemented in v1 for held tools
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

Forage Camps make the feature feel like part of a player's base.

Possible required blocks:

- logs
- campfire
- crafting table
- barrel
- composter
- bed or tent-like blocks
- lantern
- tree
- PDC-marked Forage Workstation

Interactions:

- Forage Workstation opens `/forage`
- normal right-click on camp composter keeps vanilla composting
- sneak-right-click on camp composter opens camp GUI or camp compost/turn-in page
- approved scraps can produce tiny XP, compost progress, camp ambience, or community progress

Safety:

- no arbitrary block deletion
- no forced chunk loading
- no region bypass
- no rewards from invalid camps
- never consume custom/PDC/named/lore items by accident

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
