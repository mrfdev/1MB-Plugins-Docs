# Forage Roadmap

Reviewed **11 October 2026** against the current source and the **suite build 739 / Paper 26.3 BETA 174** beta baseline. This page distinguishes deployed functionality, content and acceptance still required, and proposals. It does not authorize a server restart, publication, or live activation.

Use the [main reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md), [player guide](https://docs.1moreblock.com/player-guides/plugins/forage/), [technical guide](https://docs.1moreblock.com/staff-reference/plugins/forage/), and [beta checklist](https://docs.1moreblock.com/staff-reference/plugins/forage-checklist/) for operating details. The [camp implementation tracker](../forage-26.3-revamp-todo.md) and [issue #35](https://github.com/mrfdev/1MB-Library/issues/35) track the accepted camp revamp and its release gates.

## Current status

| State | Scope |
| --- | --- |
| Deployed on beta build 739 | Registered camps and Local Introduction; curated tools, upgrades and Repair & Merge; source guide and Recent Activity; daily/weekly/monthly quests and filters; item-only CMI quest rewards; branch bonuses; Camp Turn-Ins; Forage Dust; caps, exhaustion, protection and recovery records. |
| Newly deployed in build 739 | Accepted Turn-Ins browser and cocoa-bean mapping; persistent placed-resource protection; Sources Back navigation correction; authenticated read-only CMI `/itemnbt` exception; lifetime Participation Reward. Participation qualification is active, but reward delivery stays disabled until the real map is ready. |
| Content still needed | Author real items and descriptions for the 23 beta quest-kit placeholders, which still contain named dirt. The finished participation map must also replace its unfinished kit placeholder before participation claiming is enabled. |
| Engineering still needed for the documented live gate | A verified inventory-provider durability/recovery adapter, described below. Forage's own durable receipts do not prove that inventory or external economy state reached disk. |
| Release work remains | Final reward-content activation, remaining engineering and acceptance gates, and an explicit live activation decision. Player/staff guides and the beta checklist are already published; later status changes need corresponding public updates. |
| Optional later development | Creature provenance, Community Efforts, managed Camp Storage, streaks and broader collections, richer skills/magic, seasons and tournaments, and additional audited reward integrations. None is silently added to the accepted camp revamp. |

## Release Gate: 26.3 Camp Integration

Live gameplay remains dormant. Keep `enabled: false` on live until the owner deliberately approves activation. Shipping the suite JARs or updating documentation does not enable the feature. Dormant Forage stays excluded from `/next`, focus choices, first-success guides and ScheduledTips promotion while saved progress and hint preferences are preserved.

The maintained target uses Java 25-compatible plugin bytecode and Java 27 for Paper. The 26.2 instance remains a rollback instance. Builds 704/705 on Paper 26.3 ALPHA 49 were the initial September camp verification; they are historical evidence, not the current baseline. See the [initial camp results](../compatibility-tests/forage-26.3-camps-2026-09-27.md).

## Remaining work beyond testing

The IDs below match the [implementation and release tracker](../forage-26.3-revamp-todo.md#remaining-engineering-content-and-release-work).

1. **CONTENT-01: Author real quest rewards.** Replace the 23 beta quest-kit placeholders (10 daily, eight weekly, five monthly), currently named dirt, and update their `reward-description` values. Preserve user edits and each server's separate configuration.
2. **CONTENT-02: Finish the participation map.** Supply the intended collectible map, author its exact item metadata in `forage_participation`, and review its player-facing description. Keep `participation.enabled: false` until the real reward is ready. The CMI template may remain `Enabled: false`; that alone does not prevent Forage from reading it.
3. **ENG-01: Resolve the external-state durability boundary.** Implement and verify the inventory/economy-provider durability and reconciliation integration required by the current live-release contract. This is remaining engineering work, not merely another test checkbox; evidence retention alone does not satisfy it.
4. **REL-01: Completed on 11 October 2026.** Canonical build 739 synchronized all 66 managed JARs to both maintained servers; the beta restarted successfully on Paper 26.3 BETA 174. The native probe passed 213 checks and beta configuration reported zero errors. This completes deployment, not gameplay/crash acceptance or live activation.
5. **REL-02: Activate final reward content.** Load the authored CMI kits and matching Forage descriptions/mappings through supported reloads. Deliberately enable participation delivery only after its code is deployed and the map is ready, while keeping ordinary CMI `/kit` access disabled.
6. **REL-03: Prepare the live handoff.** Settle live balance, permissions, world mappings and reward contents; retain live data and a rollback, then stage the exact accepted suite after ENG-01 and acceptance. Obtain the distinct live activation decision and update the already published documentation to match. Beta worlds, profiles and fixture settings are not live deployment inputs. Optional ideas below are not automatically release prerequisites.

### Changes deployed in build 739

- **Accepted Turn-Ins:** a paginated, read-only item browser uses the same effective resolver as submission. It includes the `COCOA_BEANS` drop alias, providing 71 default accepted types. Named, PDC-bearing and other custom items remain protected from ordinary-material consumption.
- **Placed-resource protection:** current placement marks are stored compactly in chunk PDC, with entity PDC while a marked block falls. Placement in either hand and by any player is tracked for configured resources; normal/sticky pistons and falling blocks preserve marks across movement. Recorded placements earn no gathering progression or treasure. Legitimate mature crop growth and verified type-changing growth have explicit exceptions. Marks do not expire with time. This uses in-memory checks and normal Paper persistence, not a CoreProtect query per break. Historical placements, creature origins and out-of-band edits are not backfilled. See the [tracking contract](https://docs.1moreblock.com/staff-reference/plugins/forage/#placed-resource-tracking).
- **Sources Back navigation:** the source guide's Back route has been corrected while retaining the existing permission and camp access rules.
- **CMI item inspection:** a narrowly authenticated read-only `/itemnbt` route can inspect Forage items. Mutation commands, unknown ownership and unsafe alias combinations remain guarded.
- **Participation Reward:** after successfully claiming any daily quest and any weekly quest, in either order and across periods, the player qualifies for one manual lifetime reward at an eligible owned workstation. Qualifications persist by UUID even while claiming is disabled; retained historical `claimed: true` records can backfill them. Completion without a successful claim and monthly claims do not substitute. Qualification tracking is deployed, but the finished map and enabled delivery are separate requirements. See the [participation setup](https://docs.1moreblock.com/staff-reference/plugins/forage/#participation-reward).

### Inventory durability and recovery

Forage writes intent and exact recovery evidence before a valuable effect, saves its own immutable snapshots, then finalizes the receipt. It does **not** have a verified atomic commit or durable-save acknowledgement with Paper player inventories, an external inventory-group provider, or external economy storage. Those stores can roll back independently after a crash.

Completed item/economy evidence is retained. `/forage admin recoveryack <transaction-UUID> confirm` releases finalized evidence only after staff verifies saved external state; it does not deliver, refund, restore inventory, or resolve an uncertain receipt. Uncertain effects block further claims for that player and are not automatically replayed. This mitigation is implemented, but it is not the missing durability/recovery adapter. The [technical durability contract](https://docs.1moreblock.com/staff-reference/plugins/forage/#transactions-saving-and-crash-recovery) remains authoritative.

Backups must preserve lifetime claim flags together with transaction records and recovery evidence. Restoring an old profile alone can discard a permanent entitlement's claim history; bounded journal tombstones are not a permanent substitute for those flags.

## Implemented foundation

The current loop supports a manual gathering trip, a return to an owned camp, and modest progression without requiring automation. It complements other progression plugins while protecting Forage's own tools and rewards.

- Curated PDC-marked tools gate gathering; normal tools do not earn Forage progress.
- Valid actions award player XP, Forage Points, tool XP, branch and quest progress, and occasional treasure. There is no general streak system yet.
- Global and family daily caps, chunk/source exhaustion, cooldowns and allowed-world/WorldGuard checks bound rewards.
- Player-selected branches provide focused source-family bonuses; they are not full skill trees.
- Daily, weekly and monthly quests support manual claims, filters and pagination. CMI item-only kit templates are supported, including disabled templates. Their items are copied through Forage's recorded delivery path; CMI commands, costs, cooldowns and usage limits are not executed.
- Camp Turn-Ins deliberately consume approved plain items from the current inventory. Ordinary storage does not submit resources or earn progress.
- Forage Dust has camp-gated crafting and bounded growth pulses with resource costs, cooldowns, world/protection checks and no Forage XP award for the pulse itself.
- Sources and Recent Activity provide read-only guidance. Camp menus expose tool care, quest progress, deliveries and other implemented activities. Plugin-managed Camp Storage and Community Efforts remain separate proposals.
- Shared GUI holders, live workstation sessions, action-time checks, ordered asynchronous saves, transaction receipts and explicit recovery paths protect valuable operations.
- Existing placeholders expose progression, tools, branches, family limits, quests and leaderboards. Additional placeholders should follow an actual new feature rather than duplicate this baseline.

Tool protection includes ordinary workstations, repair/enchant/item-edit command paths and the reviewed CMI, mcMMO, Pyro and ItemSoulBind routes. **mcMMO Super Breaker, Tree Feller and Giga Drill Breaker protection has been deployed since build 738 and remains active in build 739.** Activation with a marked tool is refused, gathering pauses while a blocked ability is active, and simulated block checks cannot award Forage progress. The earlier build-736 pending note is obsolete. See the [main reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md) and [protected-tool integrations](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/tool-item-protection.md) for exact provider boundaries.

Arbitrary quest reward commands remain blocked because accepted command dispatch is not delivery proof. Item-only CMI rewards are implemented; temporary health, external points, LuckPerms reward delivery and tournament rewards would need their own audited delivery/recovery adapters. LuckPerms operations must use authoritative server UUIDs resolved locally, never name fallback or online identity lookups.

## Current camp contract

1. Find actual Dappled Forest in an approved Initial Camp world, normally Wild, and complete an Abandoned Camp or build an equivalent.
2. Inspect and deliberately register the exclusive footprint through `/forage camp`.
3. Sneak-right-click the composter to establish a workstation session. Starter tools and Local Introduction remain available before global benefits unlock.
4. Complete the registration's default 30 fresh personal gathering actions in its world, then deliberately deliver eight eligible plain items.
5. Optionally register two Secondary Camps in other approved worlds, each with its own Local Introduction.
6. Maintain both the camp being used and the Initial Camp. Claim rewards and use paid services through the current owned workstation session.

The limit is one Initial Camp plus two optional Secondary Camps, one registration per actual world. The Initial Camp slot remains reserved, including after relocation. There is no sharing or overlapping footprints. Inspection never registers a camp. Damage pauses access without deleting registration, introduction progress, global progression or claim history; a replacement registration starts a fresh introduction.

Default allowed worlds are `end`, `nether`, `general`, `wild`, `cave`, `acid`, `oneblock`, `skyblock`, `chunkblock` and `skygrid`. `builders`, `spawn` and `legacy` are blacklisted; unlisted worlds fail closed. Explicit logical-to-physical mappings support isolated local worlds. Secondary Camps do not need Dappled Forest but still depend on a valid Initial Camp.

### Current default requirements

All required features must be inside the camp footprint. Counts remain configurable; the current defaults are:

| Requirement | Count and qualification |
| --- | --- |
| Camp Anchor | One configured composter workstation |
| Shelter | 24 wool-family blocks, including supported wool stairs/slabs |
| Fence posts | Six fences |
| Campfire | One lit campfire or soul campfire; cooking is not required |
| Candle | One lit regular or colored candle block; 1–4 candles at one position count once; candle cakes do not count |
| Straw bed | One intact placed straw bed, with both halves inside the footprint |
| Firefly bush | One placed firefly bush |
| Cushions | Two valid placed cushion entities, any mixture of colors |
| Water cauldron | One cauldron containing water at any level 1–3 |
| Flower pot | One filled flower pot, any supported contents |
| Firewood | Two placed stripped logs or stripped wood blocks; no extra distance-to-fire rule |
| Banner | One standing or wall banner, any color or design |
| Storage | One chest, trapped chest or barrel |
| Crafting | One crafting table |

Inventory contents and dropped items do not count. Cushions are entities, but they and the straw bed are **required** under the current defaults. The old optional-cushion/bed plan and tree-grove requirement no longer describe current behavior. The [template measurements](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/compatibility-tests/forage-26.3-camp-templates-2026-09-27.md) explain the original footprint choices; they do not override later approved requirements.

Camp use revalidates both the selected camp and the Initial Camp. Unloaded chunks are prepared asynchronously without terrain generation; unavailable verification cannot authorize benefits. A recorded physical invalidation requires deliberate revalidation after repairs. Camp ownership and global progression remain intact.

## Current tools and optional expansion

The four later shop tool types are implemented. Calling them the old “Tier 2A/2B” expansion must not be confused with a held tool's separately purchased tier upgrade.

| Tool | Current default base item | Current default families | Purchase unlock beyond ordinary workstation/payment checks |
| --- | --- | --- | --- |
| Sickle | `COPPER_HOE` | flora, crops, mushrooms | Starter |
| Axe | `COPPER_AXE` | logs, fruits | Starter |
| Trowel | `COPPER_SHOVEL` | moss | Starter |
| Shears | `SHEARS` | leaves | Starter |
| Pickaxe | `COPPER_PICKAXE` | stone, cave | Carry any genuine Forage tool at tool level 2 |
| Brush | `BRUSH` | relics, sands | Carry any genuine Forage tool at tool level 2 |
| Sword | `COPPER_SWORD` | creature_drops | Carry any genuine Forage tool at tool level 2 |
| Mace | `MACE` | danger_drops | Carry any genuine Forage tool at tool level 2 |

The later types also require completed Local Introduction. Tool level, tool tier and player Forage level are distinct. Current defaults do not require owning all four starter types, levelling all four, reaching player level 10, paying a separate one-time expansion unlock, finding 100 treasures, or completing a separate Tier 2 quest chain. Those were earlier proposals, not current gates. Future changes to this progression ladder need a separate product decision.

Block-source tools reward configured block breaks. In particular, the current Brush route does not reward completion of vanilla archaeology brushing. Sword/mace routes require a recent matching-tool melee hit and the same player still holding that tool type at death. They do not yet prove natural spawn, exclude every spawner/breeder/farm, or validate each vanilla drop's origin.

Tier upgrades, supported diamond material refinement, controlled vanilla Unbreaking/Efficiency and Repair & Merge already exist. Tool soul text and progress lore exist too. Extra soul-line pools, thematic shop pages, event variants, additional tool types such as a Scythe, and new tier costs/rewards are optional content or feature changes.

### Creature provenance proposal

If the owner adopts a stronger creature-source policy, define and implement which natural, bred, spawned, named or farmed creatures qualify, how that identity persists, and how kills are attributed. Separate source-family caps and cooldowns already provide limits, but do not establish provenance. Specific entity sources can be disabled or capped more tightly while a proposed policy is developed. This is distinct from the completed placed-block guard.

### Optional source and quest expansion

These names and rewards are design candidates, not extra routes enabled by listing them here. Consult the [current source catalogue](https://docs.1moreblock.com/player-guides/plugins/forage/#complete-source-catalogue) for actual materials and entities.

- Crystal, volcanic, fossil and End-growth finds, potentially with narrower coverage and different treasure tables.
- Shoreline/desert relics and a genuine archaeology interaction route, if deliberately added.
- Bark caches, saplings, sticks, seasonal plants, wildflowers, fallen leaves, new trees and sniffer-related objectives beyond currently configured sources.
- Biome-weighted mushroom finds, rare herbs/roots and small cave caches.
- Creature salvage and trophy families only with an explicit decision about provenance and farm policy.

The previous proposal for roughly 25% higher expansion rewards is not a current universal reward rule. Current multipliers, caps and prices come from effective configuration and the active balance preset.

Possible additional quest definitions, preserved for future design:

| Quest id | Proposed route | Example target |
| --- | --- | --- |
| `crystal_sweep` | Crystal/geode or volcanic finds | 14–28 |
| `basalt_breaker` | Volcanic finds in the Nether | 10–22 |
| `endgrowth_study` | End-growth gathering | 8–18 |
| `shoreline_relics` | Shoreline relic recovery | 8–16 |
| `dust_and_shards` | Archaeology curios/pottery | 6–14 |
| `dune_memory` | Desert relic sweep | 10–20 |
| `web_whisperer` | Cobweb/vinecutting finds | 20–45 |
| `shore_knife` | Shoreline salvage | 12–24 |
| `natural_hide_run` | Validated natural-hide finds | 8–18 |
| `ruinbreaker` | Brittle relic salvage | 10–22 |
| `blaze_salvage` | Blaze-family finds | 4–10 |
| `end_keeper` | End trophy finds | 3–8 |

Some candidates require new source semantics, tool-family assignments or quest types before configuration alone can enable them. Their suggested names and counts are not promises of current support.

## Optional product development

These ideas remain outside the required first live rollout unless explicitly adopted.

### Progression and communal activities

- General streaks, milestones and personal collections beyond current quests, tool levels and the new participation reward.
- Herbarium collections and museum-style plant books.
- Richer branch skill trees, themed camp objectives and additional turn-in recipes.
- Community Efforts with contribution limits, UUID attribution and durable reward claims.
- Plugin-managed Camp Storage, with explicit ownership, inventory-group behavior, overflow and recovery rules. Plain chest/barrel storage already exists and remains separate from Camp Delivery.

### Seasons and events

Christmas, Summer Festival, Halloween, Valentine's Day, Thanksgiving and custom event profiles could adjust source weights, rare drops, treasure tables, particles, sounds, tips and menu themes. No seasonal profile engine is currently promised by the ordinary configurable source tables.

Short Foraging Derbies and manually started tournaments are proposals. Scheduled tournaments, tournament rankings and seasonal reports are later extensions. Discord announcements and other cross-plugin rewards require a scoped integration rather than unrestricted command execution.

### Magic and growth

Current Forage Dust and controlled vanilla enchant improvements are implemented. Further magic remains proposed: Foraging Fortune, Booster, Spread, Focus, Echo, Bloom, Tender, Rootsense, Bountiful Harvest, Wild Sweep, Scythe Cleaving, Sickle Loot, and richer Growth recipes or dust variants.

Any adopted ability should have small bounded radii, explicit resource costs where appropriate, cooldowns and caps, protection checks, and conservative terrain effects. Prefer namespaced item identity and effects over fragile custom enchant registration. Do not introduce global random-tick manipulation or broad terrain rewrites.

### Rare and distant ideas

- XP Orchids: rare flower-like finds giving small vanilla XP rewards under strict caps.
- Ethereal Seeds: darkness-dependent plants with explicit light/growth guards.
- Lunar Lilies: moon-phase-dependent appearance or harvest rules.
- Visual tree fruit through heads, particles or display entities; tree taps for sap/syrup.
- Rare mini-boss/guardian encounters with per-player limits, short lifetimes and protection/area checks.
- Botanical auctions, pet variant magic and custom world/tree generation.

These remain ideas, not blocked implementations or commitments for the current release.

## Performance, limits and storage

Current progression uses global/family daily caps, chunk-plus-family action exhaustion and cooldowns, treasure cooldowns, and bounded dust growth. The older fresh/worked/tired/exhausted ladder, hourly bonuses, weekly shop limits, stock quotas and community contribution caps were proposals; they are not all present systems. Add a new limit only with a concrete mechanic and useful player/debug feedback.

Runtime Forage progress and camps use YAML snapshots with an ordered bounded asynchronous writer. Valuable operations additionally retain transaction records and exact recovery payloads. The completed placement guard uses compact current-position chunk/entity PDC with no timed expiry; it does not require a new SQLite database or an aggressively pruned placement history.

SQLite remains a conditional storage-hardening proposal if measured scale justifies it. The historical `forage-progress.db` / `forage-tracking.db` split is an option for future progression, collections, tournament snapshots or action history, not an outstanding prerequisite for the implemented camp system. A database migration would not by itself provide atomic inventory/economy delivery.

Any adopted storage change must preserve UUIDs, claim history and transaction identities, use migrations and prepared statements, keep blocking I/O off the server thread, and avoid database scans in gathering handlers. Prune expendable history by purpose; never expire a current placement mark or lifetime entitlement merely to fit an old pruning proposal.

## Commands, placeholders and configuration proposals

The [main reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md) lists supported commands, placeholders and settings. Existing commands include camp management, quests, branches/skills, tools, source browsing, Recent Activity, limits, leaderboards, deliveries, dust and administration. Do not infer a working command from a historical wishlist.

Potential new commands such as `/forage streaks`, `/forage perks`, `/forage journal`, `/forage tournaments`, or event/tournament administration depend on adopting their underlying feature. The existing Recent Activity view is not a general collection journal. Camp administration already uses the documented `/forage admin camps ...` commands; the older hypothetical reset/validate command examples are not supported aliases.

Existing placeholders use the documented dotted form, such as `%onembcmi_forage.player.level%`, and already cover many player, camp, tool, branch, family, quest and leaderboard values. Proposed streak, lifetime-points or tournament-rank placeholders need actual stored state and defined semantics before adding a name.

Current configuration remains in the implemented files, chiefly `config.yml`, `quests.yml` and shared translations. Proposed `seasons.yml`, `magic.yml`, `encounters.yml`, `herbarium.yml`, `auctions.yml` and `tournaments.yml` belong to future modules, not missing files that staff must create now.

## Integration principles

CMI/CMILib and the shared 1MB library provide the existing plugin services, economy access, item templates, GUI infrastructure, feature registry, placeholders and diagnostics. WorldGuard remains an optional conservative protection hook. Current mcMMO/Pyro/ItemSoulBind integrations primarily protect curated item behavior; they do not authorize duplicated rewards from those plugins.

Supporting Forage gathering during mcMMO ability-expanded breaks is an optional future change. The current deliberate behavior is ability blocking. Any replacement would need reliable completed-break attribution, duplicate prevention, family/cap rules and tool-durability handling before granting rewards.

Future temporary health, external points, LuckPerms unlock rewards, mail-based rewards, tournament rewards, Discord announcements or auction integrations each require a defined delivery and recovery contract. Preserve authoritative UUIDs, PDC identity, foreign metadata, permission and session checks, exact inputs and idempotent claims. A console command being accepted is never sufficient delivery evidence.

[Documentation index](../README.md)
