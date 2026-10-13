# Forage 26.3 camps: technical and administration guide

**Documentation reviewed against the verified build-746 implementation on 13 October 2026.** The camp revamp and its guidance, plant, and tool-protection follow-ups are implemented and locally verified; connected-client beta acceptance and live activation remain separate steps. That verification used Paper 26.3 **STABLE** with API build **178**, Java 25 bytecode, JDK 25.0.4.1 for Gradle, and Java **27+35-2325** for the local server. Historical probes below retain their original Paper builds. The external inventory crash boundary remains a release gate.

**Historical Forage deployment, 11 October 2026:** suite build **739** was deployed on both maintained instances, with matching sets of 66 managed JARs and Paper 26.3 BETA **174**. The beta completed startup at 20:29:05 Europe/Amsterdam. CMI command, alias and virtual-anvil guards, mcMMO, Pyro and ItemSoulBind protections report active or armed; placement tracking and storage are healthy. Configuration reports zero errors, one expected normal-preset warning and 35 successful checks. The canonical build passed all 823 Forage tests. A native primary-server probe passed 213 checks with CMI 9.8.10.5 and CMILib 1.6.0.1, using detached inventories, PDC and profiles without player/world mutations or reward delivery. These checks do not sign off connected-client gameplay, physical piston behavior, disk/crash persistence or live activation. Dated compatibility records retain their original findings, including the [build 737/738 CMI correction](../compatibility-tests/forage-protection-parity-2026-10-11.md).

Related references: [player guide](forage-camps.md), [beta test checklist](forage/checklist.md), [main feature reference](forage.md), and [template measurements](../compatibility-tests/forage-26.3-camp-templates-2026-09-27.md).

**Turn-In update deployed:** build 739 provides the runtime item catalogue and `COCOA_BEANS` acceptance, for 71 default types. The native probe rendered all 71 across three pages; actual player submission checks remain open.

**Placed-resource protection deployed:** tracking begins with build 739. Existing placements are not backfilled. The native probe verified detached PDC placement and cross-chunk movement callbacks; the physical-world and persistence acceptance cases remain open.

**Participation tracking deployed, delivery disabled:** the one-daily-plus-one-weekly qualification and lifetime claim state are available in build 739. The actual map has not been supplied. Keep Forage participation claiming disabled while preparing the `forage_participation` CMI template; a disabled CMI kit alone is not a delivery lock because Forage can read disabled item templates.

<a id="herbarium-upcoming"></a>

## Herbarium

The [Herbarium](forage-herbarium.md), deployed in canonical build 742 on Paper 26.3 STABLE 175, has a dedicated permanent personal discovery/collection ledger. Both maintained instances received matching complete sets of 66 managed JARs; the beta keeps BedrockChatBridge disabled. `/forage herbarium` and the hub provide own-player read-only browsing while Forage and the journal are enabled; `/forage admin herbarium <local-player|UUID>` provides authorized inspection. No inspection grants a workstation session or modifies progress.

The build-742 Forage suite ran **1,195 cases: 1,167 passed, 28 existing optional-fixture skips, zero failures/errors**. All **179 Herbarium cases passed**. The primary native probe passed **1,325 checks**, including read-only validation and preparation of all twelve real CMI templates, with no real player/world mutations, commands dispatched or kits delivered. Detached native GUI/PDC/ledger checks do not prove connected-client acceptance, actual reward delivery or disk/crash recovery. Adding the twelve disabled templates preserved the prior 28 kit definitions. ENG-01 and authored reward acceptance remain open.

The beta completed startup on 12 October 2026 at **07:10:28 Europe/Amsterdam**, on port 22442. Console inspection confirmed **102 supported specimens, 12 permanent collections and collection rewards enabled**. The primary probe stopped cleanly and was removed before beta activation. These are startup and inspection results, not a completed player acceptance sheet.

Recording joins the successful gathering path after tool, world, area, placement, maturity, cap and chunk checks. The catalogue intersects reviewed botanical identities with actual enabled source/tool routes, coalesces the documented block aliases, and excludes unrelated blocks, creatures, inventory-only drops and unsupported precursors. First-find metadata uses the authoritative UUID, world UUID/name and namespaced biome. No historical discovery backfill is inferred from bought items or old progress totals.

`herbarium.*` lives in the main config. Twelve explicitly versioned collection definitions have frozen IDs, requirements and item-only CMI kit names; adding a source does not change an old collection. Changing an already registered definition is rejected, including version or kit changes; use a new ID and retain prior history. `herbarium.rewards.enabled` defaults false; the owner-approved isolated beta enables named-dirt placeholder kit delivery for testing while the primary keeps that default. Disabling/removing collection configuration does not erase previously frozen definitions, progression or claims; archived definitions remain eligible under their original rules. One-time claims require an active owned workstation, Local Introduction and preview/confirmation, with inventory preflight and existing transaction recovery. They have no cost or expiry.

Preserve `data/herbarium.yml`, `data/herbarium.initialized`, the transaction journal/receipts and original recovery evidence together. A missing initialized ledger or corruption stops the feature rather than resetting lifetime rewards. Snapshot persistence does not resolve ENG-01 or prove external inventory durability. See the [full configuration and restoration contract](forage-herbarium.md#staff-configuration-and-restoration).

<a id="seasonal-community-efforts-upcoming"></a>

## Seasonal Community Efforts

The following dated deployment evidence records the build-741 introduction; build 742 retains these features. Canonical suite 741 synchronized matching complete sets of 66 managed JARs to both maintained instances on Paper 26.3 STABLE 175. It includes the seasonal controller, Leaf Litter gathering source and 72-type Turn-In defaults; beta activation is verified. Community settings use the main `config.yml` under `community.*` and default disabled. `data/community.yml` stores the independent edition/contribution/claim history. Preserve its `data/community.initialized` marker, backups, transaction journals and recovery evidence together.

The beta completed startup on 12 October 2026 at 06:12:18 Europe/Amsterdam. Configuration reported zero errors, one expected normal-preset warning and 36 successful checks; storage was available with no pending requests, queued writes or failure. The real 2026-fall edition started with all three totals at zero in General, Cave and ChunkBlock, ending on 1 December 2026 at 00:00 CET. Community Efforts and both debug flags are enabled on this isolated beta; the four seasonal CMI templates contain named dirt placeholders and remain disabled for ordinary CMI kit access. Debug reward delivery is therefore real placeholder delivery. The primary instance kept seasonal activation disabled and passed a clean restart/readback of its initialized empty ledger. Existing 24 CMI templates were preserved when the four seasonal fixtures were added. These checks do not authorize live activation.

The build-741 Forage suite ran 1,016 cases with zero failures/errors and 28 existing optional-fixture skips. The primary native seasonal probe passed 226 checks with no real player/world mutations, command dispatches or kit delivery. It exercised detached native items/inventories, ledger/YAML round-trips and controller pages; it does not prove connected-client gameplay, actual reward delivery, full GUI session routing or disk/crash recovery. ENG-01 remains open.

The [seasonal reference](forage-community.md) documents the exact rotations, three independent goals, separate gathering and inventory-item lists, Amsterdam calendar, six-month dormancy, five-treasure immediate claim and preview/confirmation purge. Existing `worlds.mappings` resolves logical world pools; no inventory-group or world-isolation feature is implied. A stored edition freezes its dates, physical world names, material sets, limits and kit name. Staff changes affect later editions rather than rewriting earned progress.

Use the isolated `/forage debug season ...` controls for boundary tests instead of changing the operating-system clock. `community.debug.enabled` and `community.debug.deliver-kits` both default false; real debug delivery requires both true. Debug records never become real season completions, but gathering and deliberate donations still affect real items. Existing mapped test worlds can cover all four pools without creating new worlds. Check [seasonal checklist cases](forage/checklist.md#seasonal-community-efforts-upcoming) and record fixture shortcuts separately from gameplay acceptance.

## Prepare a beta session

Use a normal Survival account for the player route and a separate staff account for diagnostics. The default player permissions are `onembcmi.forage.use`, `.shop`, `.stats`, and `.camp` with the same `onembcmi.forage` prefix. `onembcmi.forage.admin` and its give/inspect/reload/debug children default to **false**, including for operators; grant only the roles required for the session. Console can perform administrative inspection without giving every tester staff powers.

Before inviting players, verify the actual test-server build, loaded world names, Forage feature state, camp requirements, tool prices, economy availability, and enabled source families. Run `/forage admin camps worlds`, `/forage admin check`, `/forage admin livecheck`, and `/forage debug runtime`. Record any deliberate test balance changes with the checklist results. `enabled: true` and `camp.enabled: true` are needed for the normal camp route; `/forage debug enable true|false` changes the feature switch. This does not create worlds or change their protection/inventory rules.

Supply an attainable Dappled Forest location in the mapped Initial Camp world, room for separate camp footprints, and enough currency for a starter tool at the configured price. Keep the initial player route free of staff XP, tool-level, point, and cap changes so the Local Introduction and natural progression can be measured. Use a separate prepared tester for higher-tier or recovery cases.

## Staff command reference

| Command | Purpose and scope |
| --- | --- |
| `/forage admin camps worlds` | Show allowed/blacklisted logical worlds, mappings, and the decision for each loaded physical world. |
| `/forage admin camps list [page]` | List current registrations, their UUIDs, owners, positions, and Local Introduction state. |
| `/forage admin camps near` | Inspect the current registration whose footprint contains the staff player's position; outside a current registration, the legacy anchor lookup may apply. |
| `/forage admin camps inspect <registration-UUID>` | Inspect one current registration using the exact ID from the list. |
| `/forage admin camps legacy [page]` | Review preserved older claims awaiting deliberate registration or release. |
| `/forage admin inspect <player>` | Inspect a player's profile, limits, quests, camp, and held item. |
| `/forage debug runtime` | Inspect persistence health, pending actors, integration protection, and counters. |
| `/forage admin save` | Queue a durable data snapshot and wait for its success/failure message. |
| `/forage admin export [backup]` | Write a local report; `backup` additionally copies raw YAML data. Treat the export as staff data. |
| `/forage admin reload` | Reload configuration. Progress remains in memory; recovering profile files requires a controlled restart. |
| `/forage admin camps release <registration-UUID>` | Immediately release that registration without removing blocks or global progress. This staff command has **no second confirmation**. Replacement requires a new Local Introduction. |
| `/forage admin recoveryack <transaction-UUID> confirm` | Release evidence for a finalized receipt only after verifying saved inventory/external state. It does not deliver, refund, repair, or resolve an uncertain receipt. |

The generic camp help still includes legacy `<player|key>`, `move`, and `reassign` forms. Use the registration UUID forms above for current camps. Staff cannot bypass the current role/world/slot contract with move or reassign; release only after reviewing the owner and location, then let the owner register a complete replacement. For normal testing, prefer the player's confirmed `/forage camp unclaim <registration-UUID>` flow. Removing an Initial Camp pauses that player's Secondary Camps immediately.

## Ownership and registration contract

A player's authoritative server UUID owns their Camp Registrations. Names are display hints. There are at most three registrations: exactly one reserved Initial Camp role and up to two Secondary Camp roles. The roles cannot be exchanged to obtain three Secondary Camps. One player cannot register twice in the same physical world. Registration is deliberate; an inspection, initial GUI open, or incidental workstation click never claims an unowned location.

The Initial Camp requires the real `minecraft:dappled_forest` biome at its Camp Anchor in an approved initial world. The initial-world default is `wild`. Secondary Camps use other approved worlds without that biome requirement. If more initial worlds are later configured, camps registered in those designated wilderness worlds retain the Dappled rule; an alternate world name must not become a way to bypass the initial-world restriction.

All registered Camp Footprints are exclusive, including incomplete registrations. Overlap checks apply between different owners and between a player's own registrations. Required materials and workstations cannot be shared by nearby camps. Camp registration provides Forage exclusivity, not protection against ordinary block breaking or a substitute for island, claim, or WorldGuard permissions.

Damaging a camp makes it unusable without removing its registration. Unclaim is explicit. Repair and revalidation restore the same camp and preserve its Local Introduction. Unclaiming and registering elsewhere creates a replacement with a fresh Local Introduction. The Initial Camp slot cannot be used for a non-Dappled replacement.

## World policies and local mappings

World policy uses logical game-mode names. A mapping resolves each logical name to one actual Bukkit world name; the stored physical world identity prevents aliases or world recreation from granting duplicate registrations.

Defaults:

```yaml
worlds:
  allowed: [end, nether, general, wild, cave, acid, oneblock, skyblock, chunkblock, skygrid]
  blacklisted: [builders, spawn, legacy]
  initial: [wild]
  mappings:
    - wild=wild
    - general=general
    - cave=cave
    - end=end
    - nether=nether
    - acid=acid
    - oneblock=oneblock
    - skyblock=skyblock
    - chunkblock=chunkblock
    - skygrid=skygrid
```

The blacklist checks both logical and physical names and wins. Unlisted worlds are excluded. Unknown, malformed, or ambiguous mappings must fail closed with an actionable diagnostic. Two logical worlds must not both represent one actual world to obtain extra slots or different introductions. Changing the name of a mapped world must not silently transfer a registration to a different world's contents. A mapping does not override a physical-world blacklist. Keep any deliberate test-only whitelist or blacklist exception out of production configuration.

For a local server that only has the default three dimensions, a disposable configuration can map `wild=world`, `skyblock=world_nether`, and `end=world_the_end`, leaving unavailable modes unmapped. **Remove or change the competing `nether=world_nether` mapping in that setup**; do not give SkyBlock and Nether the same physical world. The actual environment can differ from the logical game mode for local route testing, but mapping does not change biomes, inventory grouping, terrain generation, or protection rules. The Wild fixture still needs actual Dappled Forest at the anchor.

Use real loaded world names discovered on the local server. Never assume `/wild` or `/skyblock` teleport commands expose those same Bukkit names. On live, use identity mappings only where the actual world names are indeed `wild`, `skyblock`, and so on. Inventory sharing continues to be configured by the server's inventory/game-mode plugins.

This follows Halloween Virus's logical/physical separation. Halloween Virus stores it as `worlds.<logical>.world-id` and changes mappings while dormant; Forage's flat `worlds.mappings` entries are its own configuration syntax. They are not interchangeable files. Forage mapping changes should also be reviewed while gameplay is disabled, then checked before reenabling.

## Bounded physical validation

The default box is centered on the composter Camp Anchor, extending ten blocks along X/Z and six along Y, or at most 5,733 block positions. Registration reserves that three-dimensional footprint; overlapping boxes cannot share a camp site or its required blocks. A naturally generated camp qualifies by its current materials, not by a structure-origin flag or a rigid schematic. Player-built equivalents intentionally work.

**Current scan geometry and core requirements:**

| Requirement | Configuration | Default |
| --- | --- | ---: |
| Horizontal scan radius | `camp.scan-radius` | 10 |
| Vertical half-height | `camp.scan-height` | 6 |
| Wool family block positions | `camp.requirements.shelter` | 24 |
| Fence blocks | `camp.requirements.fences` | 6 |
| Chest, trapped chest, or barrel blocks | `camp.requirements.storage` | 1 |
| Crafting tables | `camp.requirements.crafting-tables` | 1 |

Shelter counts accept full wool, wool stairs, and wool slabs of every color, one occupied position each. A double slab does not get an extra placement count; wool carpets do not qualify. Supports count fences, including nether brick fences, but not fence gates or walls. The composter remains required as the default registered anchor; servers can deliberately change `camp.interact-block`. Trees and lanterns are optional. Stripped firewood and placed cushions are required as listed below. Vanilla cushions are entities; counting a nonexistent cushion block would make every camp fail. See the exact-template evidence for the reasons behind these thresholds.

**Additional required camp features:**

| Requirement | Configuration | Default |
| --- | --- | ---: |
| Lit campfire or lit soul campfire | `camp.requirements.campfires` | 1 |
| Lit candle block positions | `camp.requirements.candles` | 1 |
| Intact straw beds | `camp.requirements.straw-beds` | 1 |
| Firefly bush blocks | `camp.requirements.firefly-bushes` | 1 |
| Placed cushions | `camp.requirements.cushions` | 2 |
| Water-filled cauldrons | `camp.requirements.water-cauldrons` | 1 |
| Filled flowerpot blocks | `camp.requirements.filled-flower-pots` | 1 |
| Stripped log/wood blocks | `camp.requirements.firewood` | 2 |
| Standing or wall banners | `camp.requirements.banners` | 1 |

Candles may be undyed or any color. Candle cakes are excluded. One to four candles at a position count as one candle block; colors may be mixed across positions, and an unlit candle counts as none. A lit campfire counts whether or not it contains cooking food. Waterlogged campfires and candles also count as none; the firefly bush has no night-time or particle check. Count a straw bed once only when both matching halves are present inside the scan box; an ordinary bed, orphan half or mismatched pair does not satisfy the requirement. The bush must be present within the same scan. Finding an Abandoned Camp does not guarantee any of these requirements; assess its actual remaining features and add what is missing.

Count two placed `Cushion` entities of any colors, matching or mixed, within the loaded footprint using the public entity API. Cushions are not block-scan materials: `*_CUSHION` materials are inventory items and do not count. Cauldrons, flowerpots, firewood and banners are counted by the block scan. The scanner checks that all footprint block chunks and their entity data are loaded before querying either blocks or cushions; missing entity data does not count as an absent cushion. A `WATER_CAULDRON` with water level 1, 2 or 3 qualifies; empty cauldrons, lava cauldrons and powder-snow cauldrons do not. Partial water use remains valid while the level is positive; draining the last qualifying cauldron creates an observed shortage. A flowerpot qualifies only when filled with any vanilla-valid potted contents; an empty pot does not count. Firewood means two placed materials named `STRIPPED_*_LOG` or `STRIPPED_*_WOOD`, and the two may be different types. Stripped stems, hyphae and bamboo do not count. Firewood can be anywhere inside the existing footprint; there is no additional distance-to-fire condition. A placed standing or wall banner qualifies in any color, plain or custom-patterned. None of these requirements examine inventory, dropped-item or container contents; placing their items in a camp chest cannot complete construction.

Once Forage observes a shortage, including an extinguished required campfire/candle, a disappeared/incomplete bed, too few cushions/firewood blocks, an emptied flowerpot/water cauldron or a removed banner, the registration requires deliberate revalidation. Restoring or relighting the feature does not by itself clear that state. The owner restores the full checklist and confirms `/forage camp revalidate` in Survival. Keep the registration, Local Introduction and global progress intact; an invalid Initial Camp withholds Secondary Camp benefits too. This introduces no extra burning, consumption or bed-disappearance mechanic beyond vanilla behavior. Validate the observed state without generating chunks or loading distant camps merely because a block elsewhere changed. See checklist P03a/P03b and C05a–C05c for deployment acceptance and the [camp feature validation record](../compatibility-tests/forage-camp-life-2026-10-11.md) for observer limits. Checks observe current loaded-world state after the event, not a complete block history; a feature restored before that check may not be recorded as missing. Flowerpot manipulation and cauldron-level changes have explicit final-state observers. Cushion removal also queues a check, while the `UNLOAD` removal cause is ignored because unloading is not camp damage.

Every workstation open and state-changing confirmation must validate the camp being used, the owner's Initial Camp, world eligibility, ownership, and the player's current station context. Validate Initial Camp blocks again even when it is in another world. Missing worlds, missing chunks, timeouts, persistence problems, or unknown status do not authorize use.

Unloaded areas must be obtained with Paper's asynchronous no-generation chunk access. Keep concurrent requests, retained chunks, and work per tick bounded. Temporarily keep the relevant chunks loaded during the scan, release tickets on every completion/failure/disable path, and return Bukkit access to the server thread. Never call synchronous chunk generation because someone opens a remote workstation. A pending scan should present a clear waiting state without consuming costs.

A cached “valid” result must not authorize a later inventory mutation after blocks or world identity change. Recheck at action time, and recheck again after any asynchronous persistence boundary before applying the action. Rate limiting may defer repeated attempts; it must not reuse old readiness as authority.

## Local Introduction and global progression

Each fresh registration starts a Local Introduction. Defaults are 30 qualifying personal Forage actions in that physical world after registration, followed by a deliberate submission of eight eligible plain source items at that camp. A player's stored historical total cannot satisfy the fresh-action requirement, another player's events cannot increment it, and changing aliases cannot move progress to another world. Revalidation keeps this progress; replacement starts it again.

The fresh local actions provide provenance for participation, rather than individually signing every mundane dropped item. Stockpiled plain materials may supply a subsequent delivery, but cannot replace the fresh gathering requirement. Reject curated, named, lore-bearing, PDC-bearing, component-modified, or container-bearing items from ordinary-material consumption unless a recipe explicitly supports and preserves that metadata.

Starter tools, missing-requirement instructions, and introduction delivery must remain available before the introduction is complete. This prevents a reward lock from blocking the tools needed to unlock it. Island, Nether, and End routes need attainable objectives; the introduction must not demand multiple generated biomes or traversal of many scarce island chunks.

Camp Turn-Ins includes the current world's `introductionSubmitted` state in its preview plan, independently of the legacy optional complete-structure setting. An incomplete introduction suppresses ready glints, lists the remaining gathering/submission step, and links directly to Local Introduction. The confirmation click rebuilds the plan, and execution checks camp benefits before beginning a durable transaction; the existing final preflight still checks the fresh camp, introduction and exact inventory after asynchronous preparation. A known introduction lock therefore cannot produce a misleading ready preview followed by a generic cancelled-transaction message. The separate Local Introduction preview and submission share one readiness plan with the gathering target and plain-item count; reaching the target without submitting never implies activation.

Completing an introduction enables global benefits at that camp, subject to the Initial Camp remaining valid. XP, points, quest/collection state, personal daily caps, purchases, and claimed-reward history stay global. World or camp changes never create fresh allowances. Physical submissions and deliveries use the active inventory group only.

The 11 October 2026 beta configuration reload raised normal-preset daily caps by 25%: global XP **2,500 → 3,125**, global actions **1,200 → 1,500**, and every source family's XP **700 → 875** and actions **275 → 344** (rounded up). These are the shipped defaults; existing configurations retain their stored values and need an explicit staff edit plus reload. Changing these thresholds does not reset daily usage, profile progress or quest state. Local chunk exhaustion is unchanged. Verify the effective values with `/forage admin balance` and `/forage limits`; do not use `/forage admin resetcap` to apply this increase.

An invalid Initial Camp blocks Secondary Camp activities regardless of their introduction status. Inspection, repair/revalidation, recovery review, and replacement controls remain accessible. Neither a broken camp nor a reset world deletes global profile progress.

## Workstation authority and GUI hardening

Registration presentation distinguishes physical readiness from action eligibility. The Requirements book's glint reflects the material/biome/anchor scan. The registration or revalidation composter's glint and hover text use the full current preflight: feature/storage health, access, alive and nearby player, Survival mode, physical requirements, protection, ownership, overlap, valid Initial Camp dependency, and available registration slots. A complete physical build in Creative therefore keeps its glowing Requirements book but gets **Not ready yet: Survival mode required.** on the action. A normal click explains the current game mode or other blocking reason in chat. These checks run again when the action starts and after asynchronous transaction preparation; the displayed readiness never authorizes a later mutation.

Field treasure drops and use of previously obtained Forage Dust intentionally occur during gathering outside camps. Workstation authority applies to reward-menu claims, purchases, and camp activities; it does not require a camp visit for each field find or growth pulse.

Forage is primarily a workstation feature. Reward claims require a current visit established by sneak-right-clicking the owner's registered workstation. The visit expires after **five minutes** and requires the player to remain within **six blocks** of the anchor's center. Each action also requires the current authenticated Forage menu. Command shortcuts may inspect or guide but must not create or extend workstation authority. Teleporting, changing world, moving out of range, death, quit, Creative/Spectator mode, expiry and configuration reload invalidate the visit; current ownership and camp requirements are checked before every action.

Workstation navigation preserves an existing nearby visit across closing menus, browsing `/menu` and returning through `/forage`. Closing still invalidates the old GUI session and any pending click from it; a fresh Forage view is required for the next action. No visit is created from proximity alone. The [navigation regression record](../compatibility-tests/forage-station-navigation-2026-10-11.md) documents the change and its verification.

Use a server-side inventory holder and a per-player session identity. Menu names, item names, lore, and client slots are display data, never authority. At mutation time verify the owner UUID, open holder/session, permitted action, camp registration/revision, station position, distance, current world, permission, Local Introduction, current costs, inventory inputs, output capacity, and global eligibility. Deferred click handlers and asynchronous continuations must perform the same checks again.

Cancel GUI transport paths consistently: ordinary clicks, shift-clicks from either inventory, drags, double-click collection, number-key/hotbar swaps, offhand swaps, drops, creative packets, and clicks outside the view. Treat these as denial checks, not alternative purchase paths. A per-player in-flight operation guard and idempotent transaction identity prevent simultaneous confirms or replayed packets from consuming or delivering twice.

Exact Paper event behavior matters: `InventoryDragEvent` is separate from `InventoryClickEvent`, and changing views during the click callback requires deferral. The shared GUI service's protections do not replace feature-level camp, price, inventory, or entitlement checks.

## Source catalogue and configuration

`/forage sources [tool]` is a read-only player catalogue available without a camp visit. No argument selects the held Forage tool when recognized, otherwise the tool picker. A tool argument selects its complete paginated list. Tools & Families links into those lists and the catalogue offers a clickable [public source guide](forage-camps.md#complete-source-catalogue). Reading sources never grants workstation authority or changes progress.

The catalogue uses the same effective material/entity-to-family maps as gathering after configuration loads. Enabled families come from `sources.ids` and `sources.<family>.enabled`; source IDs are in `sources.<family>.materials` and `sources.<family>.entities`. Enabled tools come from `tools.ids` and `tools.<tool>.enabled`, with family membership in `tools.<tool>.families`. The Trowel is `shovel`. The generated player catalogue includes every effective default ID. Invalid or item-only material entries are not block sources; disabled tools/families are absent from the effective catalogue. Keep any local modifications in configuration and compare the runtime list after reload.

All tool tiers share their tool's family/source membership. Source membership is independent of daily player/family caps, chunk exhaustion, world/area permissions, feature availability and the held tool's condition. The menu displays current pause reasons separately, as a refreshable snapshot at the player's location. Those remain action-time reward or tool-use guards; a read-only catalogue is not an assertion that a player can earn a reward at the current location. Block sources require a matching main-hand tool and a real break, including the Brush. Creature sources require a matching melee hit, kill credit within ten seconds and the same tool type held at death. Gathering source blocks/entities are separate from dropped items, turn-in eligibility and vanilla archaeology.

The marked **Complete source catalogue** section in `forage-camps.md` is generated from `ForagePlugin.defaultSettings()`, the production configuration loaders and the same catalogue adapter as the menu. Do not hand-edit that section or parse Java source text to maintain it. The offline generator obtains block/item classification from the exact compiled Paper API's public `BlockType` and `ItemType` declarations, so source membership does not depend on a live test server or mocked registry entries. With JDK 25.0.4.1 selected, run:

```sh
gradle :plugins:player-fun:forage:generateSourceDocumentation --console=plain
gradle :plugins:player-fun:forage:test --tests '*ForageSourceDocumentationTest' --console=plain
```

The normal Forage test suite also checks this generated section for drift, including when the guide changes. Generation modifies only its explicit markers and leaves surrounding prose intact. Review the generated diff, mirror the relevant Forage documents into the public documentation repository, then run that repository's `npm run docs:generate` and `npm run build`. These development checks do not build/deploy a new suite or restart a server. See the [source guide verification record](../compatibility-tests/forage-source-guide-2026-10-11.md) for the checked command, menu, source mapping and documentation behavior.

<a id="placed-resource-tracking-upcoming"></a>

## Placed-resource tracking

Track a placed configured resource independently of the placing player's Forage eligibility. Both hands, ordinary/Forage tools, players without Forage permission, Creative placements and all worlds must produce the same placement record. Configured material IDs are retained for tracking even when their family or gameplay is disabled; pausing rewards must not provide an untracked placement window. The identity is the physical world UUID and block coordinates, not the player's UUID or a shared world name. Cancelled placements and cancelled piston movements leave the records unchanged.

The record is a per-section bitset in the chunk's Persistent Data Container. Read and update it through supported Paper APIs on the server thread; do not scan worlds, maintain a worldwide index of placed positions, or query CoreProtect/history storage per break. Marks take effect in memory immediately and have no timed expiry. Paper's normal chunk saves batch the disk persistence, retaining saved records across chunk unload/load and clean restart. Falling-block entities carry their mark in entity PDC until landing restores the position record. This is not a per-placement fsync or an atomic chunk/entity save guarantee against a sudden crash. Keep world/chunk and entity data with server backups; copying only Forage profile files does not copy placement records.

Normal and sticky piston movement transfers existing placement marks to the destination positions, including across chunk boundaries. Snapshot every source position before modifying any destination so a chain cannot overwrite the next source's status. Blocks destroyed by the movement are not translated into a destination record. Gravity must also preserve the record through a falling entity and its destination, so dropping placed sand/gravel cannot make it eligible. The tracking check precedes all gathering reward and allowance mutations: a marked break grants no player XP, points, tool XP, branch/quest progress, Local Introduction action or treasure, and does not consume daily reward caps or chunk-exhaustion counts. Ordinary breaking, drops and wear remain controlled by the existing game/protection/tool guards. The existing 12-second feedback throttle remains a chat rule, never an expiry for the placement mark.

Preserve legitimate growth. Clear a placed ageable crop's mark only when genuine growth reaches maturity. Structure/fertilizer replacement may clear an old mark when the resulting block type differs; same-type bonemeal, including the original placed moss block, must not clear it. Newly grown upper sugar-cane/bamboo blocks remain unmarked while a placed base stays marked. Treat `BAMBOO_SAPLING` as a tracked precursor whenever `BAMBOO` is configured: adding bamboo above it changes the base to a stalk without genuine growth and must retain its mark. These exceptions do not introduce a blanket maturity restriction for untracked crops or a creature-spawn provenance system.

Structure proposals can precede a later cancellable fertilizer event, including dispenser bonemeal. Keep only bounded transient verification for already-marked candidate positions, at most 1,024, and verify the resulting world state on the next tick before clearing an old mark. A position token invalidated by a newer committed mutation prevents a later callback from clearing a new same-tick placement. The final accepted fertilizer event may perform approved cleanup immediately. Cancelled/filtered growth must leave old marks intact. This small pending-verification set is not a persistent worldwide position cache or a chunk-loading scan.

`HIGHEST` admission checks cancel placements and piston moves whose tracking cannot be read or verified; final observation updates records only for permitted events. A bad section encountered while checking a break denies that block's reward and logs the failure without automatically marking every section unhealthy. Failure during a final observed update or PDC commit instead latches the tracker globally unhealthy. Thereafter block rewards are denied and further placement/piston admission is cancelled, including ordinary building attempts, until staff investigates. The same instance survives `/forage reload`, so reload does not reset the latch. `/forage debug runtime` reports tracker availability, but an otherwise healthy result is not proof that every stored section can be decoded; consult the logged section/action failure as well. Do not clear chunk PDC or restart simply to discard uncertain evidence.

There is no historical backfill: placements from before activation are unknown. Staff WorldEdit and other out-of-band world mutations are not integrated, so keep such edits within a reviewed staff test scope rather than assuming they set or transfer marks. No TNT block-damage integration is claimed. The owner reports that TNT block damage is disabled on the live server; this is not a verified beta-server setting. Camp Turn-Ins continue to accept eligible plain bought/traded/stockpiled items intentionally, without a block-origin check. Keep that inventory-item contract separate from gathering rewards.

## Turn-In acceptance and configuration

Gathering sources and accepted inventory items are separate contracts. `/forage sources` lists breakable blocks and eligible creatures; it must not be used as an exhaustive Turn-In item list. Build 739 consistently names **Accepted Turn-Ins** and opens its read-only item catalogue from that card, with 28 entries per page, Previous/Next, refresh through **About Accepted Turn-Ins**, Back to Turn-Ins and a clickable Public Turn-In Guide link. Browsing must not consume inventory, mutate progress or create submission authority.

The default allowed families are `flora`, `crops`, `mushrooms`, `leaves`, `fruits` and `moss`, configured under `camp.turnins.allowed-families`. A family must also be loaded and enabled through `sources.ids` and `sources.<family>.enabled`. For each inventory material, resolve its effective configured material-family binding first; only if it has none, use the built-in drop alias. Then require that family to be allowed for Turn-Ins. The catalogue must use this same resolver and include only item materials, never block-only types such as `CARROTS` or `COCOA`.

The current drop aliases are `CARROT`, `POTATO`, `BEETROOT`, `WHEAT_SEEDS`, `BEETROOT_SEEDS`, `SWEET_BERRIES`, `CHORUS_FRUIT` and `COCOA_BEANS` to `crops`, plus `MELON_SLICE` and `APPLE` to `fruits`. A configured direct binding takes precedence over these aliases. Item-only `GLOW_BERRIES` is a valid Turn-In material under crops even though its cave-vine gathering blocks belong to cave; do not derive this list by filtering the block-only source catalogue. Saplings, sticks and poisonous potatoes are not implicit aliases. Logs and calcite are gathering materials outside the default Turn-In families.

The exact item list below describes default eligibility, not current permission to submit. Submission still requires plain vanilla stacks without item meta, an eligible owned workstation, completed Local Introduction, available persistence, applicable caps and cooldowns. It scans normal storage including hotbar slots, not armor/offhand slots or container contents. There is no gathering-provenance check: eligible plain shop/traded items can qualify. Reduced Turn-In XP/points do not advance gathering actions, tool XP or gathering quests.

The marked Turn-In lists in both guides are generated from `ForagePlugin.defaultSettings()`, the production configuration loaders and the runtime `turnInCatalog()` resolver. Item classification comes from the exact compiled Paper API. Keep this workflow separate from gathering-source generation; filtering the gathering catalogue loses accepted item-only materials and drop aliases. With JDK 25.0.4.1 selected, run:

```sh
gradle :plugins:player-fun:forage:generateTurnInDocumentation --console=plain
gradle :plugins:player-fun:forage:test --tests '*ForageTurnInDocumentationTest' --console=plain
```

The normal Forage suite checks both Turn-In lists for drift. The generator changes only `BEGIN/END GENERATED FORAGE TURN-INS` markers; keep deployment notices outside those markers. These development tasks do not build or deploy JARs, change server configuration, or restart a server. Mirror only the reviewed Forage documents and regenerate/check the public site after a list change.

## Complete accepted Turn-In item list

**Build-742 botanical defaults:** the generated source-default list below contains 97 types after the Herbarium source expansion, including `COCOA_BEANS` and `LEAF_LITTER`. The in-game catalogue always uses its current resolver/configuration.

<!-- BEGIN GENERATED FORAGE TURN-INS -->

This list is generated from source defaults through the same acceptance resolver used by Camp Turn-Ins. Server configuration can change it. There are **97 accepted item types** in these defaults; this does not mean every type can be obtained through ordinary survival harvesting.

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

## Read-only guidance and onboarding

Forage supplies current recommendations to the shared `/next` provider and `/forage next` gateway. The missing-Initial-Camp recommendation uses `registry-v2`, not legacy `claims` or historical gathering totals, and precedes current-world gathering blockers so a new player in Spawn still learns to find Dappled Forest in an approved Initial Camp world. The route defaults to `/wild`; `worlds.initial`, whitelist/blacklist rules, and unambiguous `worlds.mappings` determine eligible logical names. A player already in the mapped physical world is told to find the biome there. An empty or invalid eligible set yields a staff-help recommendation.

Known Initial Camp revalidation takes priority over other activities. Current-world Local Introduction guidance distinguishes remaining fresh actions from the final item submission; `introductionReady()` only means the action target is met, while `introductionSubmitted()` establishes completed delivery. Do not advertise global rewards or upgrades as ready before submission. Recommendations use immutable registration snapshots and loaded-area reads only, with no chunk requests, ownership changes, saved progress writes, or reward effects. Following a checklist link can open explicit registration inspection, but it never confirms registration. Workstation destinations explain where to interact instead of creating a remote session.

The shared first-success provider contributes the camp, tool, and first-gather checklist. Its remembered learning is separate from current camp authority. Optional invitations and progress hints use the existing `/guidance` preferences and delivery budget, including quiet/off, hidden/postponed hints, and disabled-feature filtering. `/guidance` remains the preference surface; `/next` and `/forage next` are the requested recommendation surfaces. No additional scheduled scanner or private guidance command is registered by Forage.

## Transactions, saving, and crash recovery

Ordinary progress and valuable transactions have different durability needs. Regular gathering updates can coalesce into immutable snapshots, with ordered writes and a documented short flush interval. Serialization, file writes, backups, and exports belong off the main thread. Avoid serializing the entire player base for a read-only menu or every broken block. Keep queues bounded, coalesce redundant progress snapshots, and expose failed or lagging persistence.

Submissions, purchases, upgrades, tool merges, and reward claims need a durable intent plus explicit delivered/finalized/failed/review state. Preserve the original player UUID and operation identity on recovery. Capture inventory contents on the server thread, do I/O asynchronously, then revalidate authority and exact inputs before any mutation. An older snapshot must never overwrite a newer committed result.

Do not promise zero crash loss for unsaved Minecraft inventories or independent external plugins. Forage and Minecraft's inventory save are not one atomic database transaction. A crash between stages must leave enough evidence to detect uncertainty and stop automatic replay. `/forage review` and staff transaction diagnostics should explain pending requests instead of encouraging retries.

Dispatching an external reward command successfully is not proof that it delivered. Unsupported or unverifiable effects need explicit recovery behavior; they must not be retried blindly. A full inventory, unavailable dependency, failed preflight, or unavailable persistence must leave the reward unclaimed and avoid spending points wherever the outcome is known to be unchanged. Ambiguous partial effects require review, not an unconditional refund that could duplicate value.

The new `ForagePersistence` writer uses one ordered daemon worker and a bounded queue of 32 requests. Snapshot trees are copied into detached scalar/list/map values on the server thread; YAML serialization, backups, forced file writes, and atomic replacement happen on the writer. Ordinary snapshots coalesce while one is pending. The default autosave interval is five seconds, with legacy configured values clamped to 2–10 seconds. Nominal crash loss is the snapshot interval plus writer latency under healthy storage, not a hard wall-clock guarantee under a stalled server or failed disk.

Writer failure, queue saturation, or a queued write older than thirty seconds pauses mutations. Diagnostics expose the queue, oldest write age, and failure. Shutdown allows up to ten seconds for the writer and logs failure. Valuable effects are preceded by durable intent and exact Paper item-byte escrow; a full data snapshot is saved before final receipt completion. Main-thread callbacks check the same open inventory identity, world, living player, and feature camp guard again. Focused tests and native local introduction transactions verified the implemented save barriers, duplicate denial, and stale-menu cancellation paths.

Transaction records remain under the feature's `Forage/transactions/records`, with exact recovery payloads in `Forage/transactions/payloads`. **There is no verified atomic commit with Paper's player inventory or an external inventory provider.** A crash can roll vanilla inventory back independently of a saved Forage claim. Consequently, this local build must not be described as fully crash-atomic or dupe-proof, and live crash acceptance remains gated on a verified inventory-provider durability/recovery adapter.

Finalized item/economy recovery evidence is retained until staff verifies the external state and explicitly uses `/forage admin recoveryack <transaction-uuid> confirm`. Internal-only camp receipts can clear automatically. Normal completed operations remain usable after restart; unresolved effects block the affected actor for manual review. Recovery acknowledgment discards evidence after review and must never be used as a blanket cleanup command.

Quest rewards containing arbitrary commands now fail closed before claiming. Audited internal/item rewards and Vault rewards with explicit responses remain the supported paths; configuration of a command prefix is not sufficient delivery verification. A future adapter must supply its own idempotent outcome/recovery contract before those command rewards can be enabled safely.

<a id="mending-upgrade"></a>

## Optional Mending I

Mending was introduced in canonical build 745 and verified on build 746 / Paper 26.3 STABLE 178 on 13 October 2026. The Forage suite ran 1,268 cases: 1,240 passed, 28 existing optional-fixture skips and zero failures/errors. All 73 Mending tests passed. Real-client acceptance remains open. This adds a deliberate Tool Upgrades purchase; other external repair routes remain blocked. Defaults allow all eight tool IDs (`sickle`, `axe`, `shovel`, `shears`, `pickaxe`, `brush`, `sword`, `mace`), require tool Tier III and held-tool level 1, and add no separate player Forage-level gate beyond the existing camp access/tier prerequisites. The Trowel's ID is `shovel`. Base money/point costs are 10,000/250 through the existing improvement-cost multiplier: the normal preset charges 9,000/225. Confirmation must retain the owned active-camp session and current tool, eligibility and costs. Duplicate purchase is refused; the item is not repaired by buying Mending.

The build-746 native probe passed **243 checks** across all eight base tools and five supported diamond refinements, using synthetic Mending events and emulating vanilla damage application. It changed no real player or world state. This does not verify an actual client collecting XP, normal XP allocation across carried equipment or live economy behavior. The canonical suite reported 4,831 cases, with 4,790 passed, 41 existing optional-fixture skips and zero failures/errors. On 13 October, the Forage instance completed startup at 09:53:05 Europe/Amsterdam; its configuration check reported zero errors, one expected normal-preset warning and 37 successful checks. The probe was removed and the primary restarted cleanly at 09:56:30. The 24 checked primary Forage configuration/data files remained semantically equal to the stopped backup. ENG-01 and the M01–M06 real-client checks remain open.

The settings are under `tools.enchants.mending`:

| Key | Default | Meaning |
| --- | --- | --- |
| `enabled` | `true` | Offer new purchases; disabling does not revoke an approved tool. |
| `max-level` | `1` | Mending I is the only supported level. |
| `required-tier` | `3` | Purchase requires at least Tier III; lower configured values are warned about and cannot unlock tiers I/II. |
| `tools` | `sickle, axe, shovel, shears, pickaxe, brush, sword, mace` | Eligible purchase IDs; removing an ID does not revoke an approved tool. |
| `required-tool-level-per-level` | `1` | Held-tool level required for the single Mending level. |
| `money-cost-base` / `money-cost-per-level` | `10000` / `0` | Money cost before the active improvement multiplier. |
| `points-cost-base` / `points-cost-per-level` | `250` / `0` | Forage Point cost before that multiplier. |

Already-approved Mending I follows the tradable tool. Removing an eligible purchase ID or disabling the purchase option does not revoke it; the item still needs its valid approved state, Mending I and Tier III or higher. Normal Minecraft XP may repair it up to full durability in either hand, including at the five-durability safety lock. This repair has no camp requirement and creates no Forage XP, tool XP, points, quest/branch/treasure progress, cap reset or chunk reset. It does not inherit Repair & Merge's player-level durability ceilings. Ordinary Minecraft XP allocation remains in effect.

Outside enchantment application and every other external repair/modification route remain protected. A renamed imitation, changed approved state or externally added Mending does not acquire this exception. Keep Repair & Merge's existing donor consumption, treasure, cost, durability ceilings and donor-XP transfer unchanged. Test the two repair routes independently, using [Mending checklist cases](forage/checklist.md#mending-upgrade).

## Tool transformation boundary

Tool identity remains `1mb-cmiapi-forage:tool`, with schema and progress keys unchanged. A new `tool_approved_state` string records the approved material, tier, name and enchantments. It is written on issuance, successful Forage tier/material/enchant changes, and explicit legacy approval. XP/lore refreshes and audits never refresh an existing approval record. Repair keeps that record and updates only its own durability/progress fields. Exact transaction snapshots are taken after safe legacy enrollment and durability normalization.

Raw marker presence, including an unknown id or wrong data type, routes items into protective guards. Server-side prepare, result, click, drag, hotbar, offhand and crafting checks stop transformations even when a vanilla result loses its PDC. Taking an existing input back and ordinary storage remain allowed. Marked tools cannot be dispensed, preventing automated sheep shearing or honeycomb harvesting from bypassing player durability checks. Command guards resolve public command-map aliases, namespaces and bounded `commands.yml` alias chains, and consider carried items and targeted players. RCON has a separate event handler. Private plugin aliases and direct `Bukkit.dispatchCommand`/item API calls do not necessarily fire those events; the approved-state and durability gates are the additional boundary. DiscordChat also rejects marked inputs in its shared preview/confirmation transformation before any point spend.

The current CMI adapter additionally guards the provider's public command executor, covering repair commands dispatched directly by other plugins, and its virtual-anvil repair/rename events. Reviewed mcMMO checks reject repair and salvage before consumption. PyroMining Vessels, PyroFishing Augments, and PyroWelcomes `/points` repair purchases are guarded at authenticated provider callbacks, including rejection before points are charged. Runtime diagnostics report integration readiness; an installed provider without a working required adapter pauses affected tool use, purchases, and improvements. These guards remain mandatory while Forage gameplay is disabled. See the [feature reference](forage.md) for reviewed dependency versions and transformation coverage.

Before block, melee, block/entity interaction (including armadillo brushing), shearing, durability use or a paid tool transformation, the plugin verifies the approved state, identity, amount and tracked durability. Invalid tools cannot silently become ordinary tools. Melee and other current actions are cancelled when a repair correction or invalid state is discovered. Effective maximum damage, stack size, unbreakable status and tool/weapon/attribute mechanics must match the material prototype. These checks cover removed prototype components as well as added overrides. Unknown PDC and unrelated cosmetic/container components are retained. No item serialization, compression or filesystem work is added to the action-time integrity check.

Only plain, unchanged legacy base tools with valid original PDC and durability tracking auto-enroll. Refined, enchanted and historical iron tools need explicit staff review with `/forage admin toolapprove <player> [confirm]`. Approval permits only supported material refinements and compatible configured Forage enchantments; it preserves or reduces remaining durability to the historical record, never trusts a newly repaired amount. Missing/malformed tracking and changed existing approval records fail closed. Restore such evidence from a verified backup rather than clearing the marker. Administrative legacy approval is logged with the player's UUID.

This boundary assumes installed server code is trusted. A plugin deliberately deleting or forging Forage identity/approval PDC can defeat item identity; guards are not a sandbox for hostile server plugins. Pausing detects unknown direct transformations, but cannot refund costs another unintegrated plugin already charged. Configure external services to reject Forage items before charging, as the DiscordChat integration does.

## Existing data and recovery

Review configured `tips.entries` and other player-facing text overrides during the upgrade. Comment-preserving configuration updates retain customized text, so an existing server can still carry old tree-grove requirements or command-based activity instructions until staff updates those overrides to the new workstation flow.

Preserve compatibility identities, namespaces, issued item PDC, player UUIDs, profile files, quest claims, and existing idempotent receipts. Do not erase older camp data or silently classify an arbitrary 26.2 anchor as a valid Initial Camp. Legacy ownership needs conservative migration or quarantine with readable owner/location evidence.

`data/camps.yml` now stores `schema-version: 2` and a `registry-v2` list. The legacy `claims` section is retained until the same owner deliberately registers that anchor or staff releases it. Foreign legacy locations reserve a conservative footprint to prevent another player taking the area during migration. Bad v2 records cause a closed storage state with the existing recovery backup, rather than a partly trusted registry.

Before changing the data format, keep a recoverable backup. Review duplicate owners/worlds, overlapping footprints, missing world identities, and more than three old registrations. Keep questionable records unavailable until resolved. Staff release/reassignment/move helpers must apply the same role, world, biome, ownership, and overlap constraints as normal registration, or be restricted to safe release/inspection until that is possible. Player commands are `/forage camp [inspect|list|register|revalidate|unclaim [registration-UUID]]`; registration, revalidation, and release use explicit confirmations. Unclaim by registration UUID can be initiated remotely because it removes authority rather than granting a remote reward claim.

A staff recovery action must never reset a player's reward history to make a camp usable. Restoring camp access and restoring an uncertain inventory transaction are separate operations.

<a id="participation-reward-upcoming"></a>

## Participation reward

Record two lifetime qualifications under the player’s authoritative UUID: at least one successfully claimed daily quest and at least one successfully claimed weekly quest. Either order and different periods qualify. A completed but unclaimed quest, a failed claim or a monthly claim must not substitute. Period rollover must not clear these qualifications or the lifetime participation-claimed state.

The persisted profile fields are `participation.daily-claimed`, `participation.weekly-claimed` and `participation.claimed`. On profile load, backfill qualifications only from retained historical quest records with `claimed: true`, never objective completion alone. Missing older records are not reconstructed. Existing pending or uncertain transactions continue to block claims through the transaction journal.

When restoring backups, preserve the profile's lifetime participation flags together with the transaction journal and receipts. Do not restore an older profile alone to reset `participation.claimed`: that can discard evidence that the lifetime reward was already received. Transaction tombstones have bounded retention, so the journal alone is not a permanent substitute for the saved lifetime flags. Review inventory delivery and claim evidence together before recovery.

The quest index exposes **Participation Reward** in slot 30. Its manual claim requires the player’s own current complete camp workstation and completed Local Introduction. Eligibility does not automatically award anything. While disabled, show “Claiming is not open yet” and preserve progress.

```yaml
participation:
  enabled: false
  reward-kit: forage_participation
  reward-description: Forage participation keepsake
```

Keep qualification tracking independent from the participation-claim enable switch: successful daily/weekly claims still count while delivery is disabled. The map reward is not ready, so do not enable claiming merely because a template exists. Both maintained servers have a `forage_participation` definition in `plugins/CMI/Kits/forage.yml` with `Enabled: false`. The authored placeholder items can differ between servers; preserve those edits and inspect the intended server’s actual kit instead of copying another server’s contents over it. Preparing this template does not activate Forage participation claiming.

Before enabling delivery, replace the placeholder with the approved real map item, preserving its required item data/components, and verify the exact kit contents. Keep the CMI kit disabled for ordinary `/kit` access. Forage’s separately disabled claim route is what prevents placeholder delivery; its item-only adapter can deliberately read disabled kits. Reward delivery remains subject to inventory capacity, transaction and recovery checks, and must not create a second lifetime reward after reconnects, new periods, camp changes or repeated clicks. Changing the configured kit name must not reset the lifetime claim.

## Reward scope and balance

The first camp revamp gates existing supported Forage activities. Temporary extra hearts, other-plugin points, Forage kits, and fishing tournaments were examples of future reward choices, not a promise that all those integrations already exist. Seasonal Community Efforts are the build-741 follow-up described above. Plugin-managed Camp Storage remains a proposal.

Any future LuckPerms reward must target the recipient's authoritative server UUID, resolved locally for offline records and retained on retries. Preserve Java and Floodgate identities, expand and validate placeholders before dispatch, reject ambiguous/missing local identities, and never query Mojang or fall back to a name-based LuckPerms command.

Global balances intentionally let effort earned in one world buy an eligible reward at another fully active camp. Review rewards for inventory/economy differences. The Local Introduction requires some local play; it is not a local-income accounting system. Claimed items can still travel wherever the server's normal inventory rules permit.

## Verification and local release gate

**Plant follow-up, build 724 / Paper 26.3 BETA 157:** the canonical suite and 129 Forage tests passed, with an 88-assertion native plant/tool/dust probe. The probe covered new poplar, shrub, and mushroom sources, all dust variants, plain turn-ins, metadata rejection, whole-growth protection boundaries, no-target retention, and restored fixture state. See the [plant compatibility record](../compatibility-tests/forage-26.3-plants-2026-10-06.md).

**Tool-protection follow-up, build 726 / Paper 26.3 BETA 159:** the canonical suite and 156 Forage tests passed, with a 390-assertion native protection probe and clean restart. Coverage included mandatory guards with gameplay disabled, CMI/mcMMO integration, Pyro callback protections, paid-menu precharge refusal, ordinary storage, owned camp transformations, and foreign metadata preservation. This evidence uses synthetic native probes and provider fixtures; it is not a connected-client paid-menu acceptance result. See the [tool-protection record](../compatibility-tests/forage-tool-protection-2026-10-07.md).

The earlier ALPHA 49 records below remain historical camp evidence. Use the [beta checklist](forage/checklist.md) for the current real-client run, record the exact suite/Paper build, and do not infer a pass merely from the existence of automated coverage.

**Delivery and tool-protection follow-up, build 706:** the canonical suite synchronized all 65 managed JARs with matching hashes. It reported 3,128 tests, zero failures/errors and one skip, including 111 Forage tests. An isolated native Paper 26.3 ALPHA 49 probe passed 124 assertions covering all eight issued tools, owned tier/material/enchant/repair improvements, external mutation rejection, tracked repair correction, conservative legacy migration and staff approval, metadata/component preservation through material changes and serialization, entity/brush and dispenser guards, and Camp Delivery/Local Introduction previews for all three poplar leaf colours. Player profiles, camp registrations and gathering data retained their values; YAML key ordering changed during ordinary saves. UpdateSmoke passed 561 checks with zero warnings/failures and one skip; the dependency gate passed. Configuration had zero errors and the expected local non-live-balance warning. Real-client gameplay and third-party services beyond the tested paths still need owner acceptance; no live server or online docs were changed.

**Guidance and registration-feedback follow-up, build 705:** the canonical suite produced and synchronized all 65 managed JARs, with matching hashes. The 3,060 suite tests reported no failures or errors and one skip; all 64 Forage tests passed, including 19 added for this follow-up. A native Paper 26.3 ALPHA 49 probe passed 19 assertions: a complete physical Requirements book glows in Creative while the blocked composter does not; hover and click feedback explain Survival mode; Survival enables the action; changing back to Creative rejects a stale confirmation; Spectator and Adventure receive specific explanations; and the actual new-player next-step provider points to Dappled Forest in `/wild` and `/forage camp`. Recommendation inspection left profile, camp, chunk, and transaction state unchanged. This uses a synthetic server player, so real-client hover/chat acceptance remains pending.

**Initial revamp, build 704:** the canonical build produced all 65 managed suite JARs. Its 3,060 tests reported no failures or errors and one skip, including all 45 Forage tests. A native Paper 26.3 ALPHA 49 probe passed 50 checks covering counted materials, biome rules, world mapping, overlap, Initial Camp invalidation/revalidation, real managed inventory holders, introduction locks, duplicate confirmation, durable introduction readback, stale-menu cancellation without consumption, component-bearing inputs, asynchronous existing-chunk reload, ticket cleanup, and missing-chunk no-generation behavior. Configuration checking reported zero errors and one normal-balance warning; update smoke and the plugin compatibility gate passed.

Twenty local warmed samples validating both default camp boxes measured a median of 0.777 ms, 95th percentile of 1.164 ms, and maximum of 1.184 ms. Each camp box contains at most 5,733 positions. These are local loaded-chunk measurements, not a production load guarantee or remote chunk-load latency. The plugin also limits command/workstation admission before scans. The probe used an unjoined synthetic server player for native GUI and transaction calls; it did not exercise a real client's packet stream. Durable snapshot readback alone is not proof of cross-plugin inventory crash atomicity.

Test registration, repair, replacement, overlapping footprints, missing initial camps, alias collisions, disabled/missing worlds, world UUID changes, all three slots, and fourth-camp rejection. Verify fresh local actions, global caps, component-heavy items, full inventory, stale menus, concurrent confirmations, remote Initial Camp loading, and graceful pending validation.

Adversarial coverage includes rapid clicks, shift/drag/double-click/hotbar/offhand/drop/creative interactions, close/reopen, movement, teleport, world change, death, quit/kick, plugin disable, slow storage, storage failure, restart, and failure between each transaction stage. Test AutoSell and other item-producing plugins where installed. Profile validation and save behavior rather than assuming asynchronous code is inexpensive.

Build/test using JDK 25.0.4.1. Stop both maintained Paper 26.3 and Forage 26.3 servers before `scripts/build-all.sh`; it reserves one suite build number, aligns both Paper runtimes and replaces both complete managed JAR sets only after the full gate passes. Start the intended local server on Java 27 and verify startup, mapped-world camp flow, restart persistence, and shutdown. Record both automated evidence and remaining real-client gameplay acceptance. Do not present a module-only JAR as a deployable build.

Keep the preserved 26.2 rollback instance untouched. Live server changes, live feature activation, and final live staging remain separate owner-directed steps; publishing these guides does not enable gameplay or establish beta acceptance.
