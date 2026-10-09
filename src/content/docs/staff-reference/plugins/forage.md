---
title: "Forage Administration"
description: "Setup, permissions, recovery, and operation of Forage."
---

**Documentation reviewed against the current implementation on 9 October 2026.** The camp revamp and its guidance, plant, and tool-protection follow-ups are implemented and locally verified; connected-client beta acceptance and live activation remain separate steps. The repository currently targets Paper 26.3 **BETA** with API build **167**, Java 25 bytecode, JDK 25.0.4.1 for Gradle, and Java **27+35-2325** for the local server. These are the configured baseline, not a claim that every historical probe below ran on build 167. The external inventory crash boundary remains a release gate.

Related references: [player guide](/player-guides/plugins/forage/), [beta test checklist](/staff-reference/plugins/forage-checklist/), [main feature reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md), and [template measurements](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/compatibility-tests/forage-26.3-camp-templates-2026-09-27.md).

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

| Requirement | Configuration | Default |
| --- | --- | ---: |
| Horizontal scan radius | `camp.scan-radius` | 10 |
| Vertical half-height | `camp.scan-height` | 6 |
| Wool family block positions | `camp.requirements.shelter` | 24 |
| Fence blocks | `camp.requirements.fences` | 6 |
| Campfire or soul campfire | `camp.requirements.campfires` | 1 |
| Chest, trapped chest, or barrel blocks | `camp.requirements.storage` | 1 |
| Crafting tables | `camp.requirements.crafting-tables` | 1 |

Shelter counts accept full wool, wool stairs, and wool slabs of every color, one occupied position each. A double slab does not get an extra placement count; wool carpets do not qualify. Supports count fences, including nether brick fences, but not fence gates or walls. The composter remains required as the default registered anchor; servers can deliberately change `camp.interact-block`. Default readiness has no mandatory tree, logs, lantern, or cushion. Vanilla cushions are entities; counting a nonexistent cushion block would make every camp fail. See the exact-template evidence for the reasons behind these thresholds.

Every workstation open and state-changing confirmation must validate the camp being used, the owner's Initial Camp, world eligibility, ownership, and the player's current station context. Validate Initial Camp blocks again even when it is in another world. Missing worlds, missing chunks, timeouts, persistence problems, or unknown status do not authorize use.

Unloaded areas must be obtained with Paper's asynchronous no-generation chunk access. Keep concurrent requests, retained chunks, and work per tick bounded. Temporarily keep the relevant chunks loaded during the scan, release tickets on every completion/failure/disable path, and return Bukkit access to the server thread. Never call synchronous chunk generation because someone opens a remote workstation. A pending scan should present a clear waiting state without consuming costs.

A cached “valid” result must not authorize a later inventory mutation after blocks or world identity change. Recheck at action time, and recheck again after any asynchronous persistence boundary before applying the action. Rate limiting may defer repeated attempts; it must not reuse old readiness as authority.

## Local Introduction and global progression

Each fresh registration starts a Local Introduction. Defaults are 30 qualifying personal Forage actions in that physical world after registration, followed by a deliberate submission of eight eligible plain source items at that camp. A player's stored historical total cannot satisfy the fresh-action requirement, another player's events cannot increment it, and changing aliases cannot move progress to another world. Revalidation keeps this progress; replacement starts it again.

The fresh local actions provide provenance for participation, rather than individually signing every mundane dropped item. Stockpiled plain materials may supply a subsequent delivery, but cannot replace the fresh gathering requirement. Reject curated, named, lore-bearing, PDC-bearing, component-modified, or container-bearing items from ordinary-material consumption unless a recipe explicitly supports and preserves that metadata.

Starter tools, missing-requirement instructions, and introduction delivery must remain available before the introduction is complete. This prevents a reward lock from blocking the tools needed to unlock it. Island, Nether, and End routes need attainable objectives; the introduction must not demand multiple generated biomes or traversal of many scarce island chunks.

Camp Turn-Ins includes the current world's `introductionSubmitted` state in its preview plan, independently of the legacy optional complete-structure setting. An incomplete introduction suppresses ready glints, lists the remaining gathering/submission step, and links directly to Local Introduction. The confirmation click rebuilds the plan, and execution checks camp benefits before beginning a durable transaction; the existing final preflight still checks the fresh camp, introduction and exact inventory after asynchronous preparation. A known introduction lock therefore cannot produce a misleading ready preview followed by a generic cancelled-transaction message. The separate Local Introduction preview and submission share one readiness plan with the gathering target and plain-item count; reaching the target without submitting never implies activation.

Completing an introduction enables global benefits at that camp, subject to the Initial Camp remaining valid. XP, points, quest/collection state, personal daily caps, purchases, and claimed-reward history stay global. World or camp changes never create fresh allowances. Physical submissions and deliveries use the active inventory group only.

An invalid Initial Camp blocks Secondary Camp activities regardless of their introduction status. Inspection, repair/revalidation, recovery review, and replacement controls remain accessible. Neither a broken camp nor a reset world deletes global profile progress.

## Workstation authority and GUI hardening

Registration presentation distinguishes physical readiness from action eligibility. The Requirements book's glint reflects the material/biome/anchor scan. The registration or revalidation composter's glint and hover text use the full current preflight: feature/storage health, access, alive and nearby player, Survival mode, physical requirements, protection, ownership, overlap, valid Initial Camp dependency, and available registration slots. A complete physical build in Creative therefore keeps its glowing Requirements book but gets **Not ready yet: Survival mode required.** on the action. A normal click explains the current game mode or other blocking reason in chat. These checks run again when the action starts and after asynchronous transaction preparation; the displayed readiness never authorizes a later mutation.

Field treasure drops and use of previously obtained Forage Dust intentionally occur during gathering outside camps. Workstation authority applies to reward-menu claims, purchases, and camp activities; it does not require a camp visit for each field find or growth pulse.

Forage is primarily a workstation feature. Reward claims require a current session established by sneak-right-clicking the owner's registered workstation. The session expires after **five minutes** and requires the player to remain within **six blocks** of the anchor's center with the managed menu open. Command shortcuts may inspect or guide but must not create remote claim authority. A player who teleports, changes world, moves out of range, closes/reopens the view, dies, quits, or loses ownership cannot reuse the old context. Reopen from the workstation after expiry, configuration reload, or a stale-menu rejection.

Use a server-side inventory holder and a per-player session identity. Menu names, item names, lore, and client slots are display data, never authority. At mutation time verify the owner UUID, open holder/session, permitted action, camp registration/revision, station position, distance, current world, permission, Local Introduction, current costs, inventory inputs, output capacity, and global eligibility. Deferred click handlers and asynchronous continuations must perform the same checks again.

Cancel GUI transport paths consistently: ordinary clicks, shift-clicks from either inventory, drags, double-click collection, number-key/hotbar swaps, offhand swaps, drops, creative packets, and clicks outside the view. Treat these as denial checks, not alternative purchase paths. A per-player in-flight operation guard and idempotent transaction identity prevent simultaneous confirms or replayed packets from consuming or delivering twice.

Exact Paper event behavior matters: `InventoryDragEvent` is separate from `InventoryClickEvent`, and changing views during the click callback requires deferral. The shared GUI service's protections do not replace feature-level camp, price, inventory, or entitlement checks.

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

## Tool transformation boundary

Tool identity remains `1mb-cmiapi-forage:tool`, with schema and progress keys unchanged. A new `tool_approved_state` string records the approved material, tier, name and enchantments. It is written on issuance, successful Forage tier/material/enchant changes, and explicit legacy approval. XP/lore refreshes and audits never refresh an existing approval record. Repair keeps that record and updates only its own durability/progress fields. Exact transaction snapshots are taken after safe legacy enrollment and durability normalization.

Raw marker presence, including an unknown id or wrong data type, routes items into protective guards. Server-side prepare, result, click, drag, hotbar, offhand and crafting checks stop transformations even when a vanilla result loses its PDC. Taking an existing input back and ordinary storage remain allowed. Marked tools cannot be dispensed, preventing automated sheep shearing or honeycomb harvesting from bypassing player durability checks. Command guards resolve public command-map aliases, namespaces and bounded `commands.yml` alias chains, and consider carried items and targeted players. RCON has a separate event handler. Private plugin aliases and direct `Bukkit.dispatchCommand`/item API calls do not necessarily fire those events; the approved-state and durability gates are the additional boundary. DiscordChat also rejects marked inputs in its shared preview/confirmation transformation before any point spend.

The current CMI adapter additionally guards the provider's public command executor, covering repair commands dispatched directly by other plugins, and its virtual-anvil repair/rename events. Reviewed mcMMO checks reject repair and salvage before consumption. PyroMining Vessels, PyroFishing Augments, and PyroWelcomes `/points` repair purchases are guarded at authenticated provider callbacks, including rejection before points are charged. Runtime diagnostics report integration readiness; an installed provider without a working required adapter pauses affected tool use, purchases, and improvements. These guards remain mandatory while Forage gameplay is disabled. See the [feature reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md) for reviewed dependency versions and transformation coverage.

Before block, melee, block/entity interaction (including armadillo brushing), shearing, durability use or a paid tool transformation, the plugin verifies the approved state, identity, amount and tracked durability. Invalid tools cannot silently become ordinary tools. Melee and other current actions are cancelled when a repair correction or invalid state is discovered. Effective maximum damage, stack size, unbreakable status and tool/weapon/attribute mechanics must match the material prototype. These checks cover removed prototype components as well as added overrides. Unknown PDC and unrelated cosmetic/container components are retained. No item serialization, compression or filesystem work is added to the action-time integrity check.

Only plain, unchanged legacy base tools with valid original PDC and durability tracking auto-enroll. Refined, enchanted and historical iron tools need explicit staff review with `/forage admin toolapprove <player> [confirm]`. Approval permits only supported material refinements and compatible configured Forage enchantments; it preserves or reduces remaining durability to the historical record, never trusts a newly repaired amount. Missing/malformed tracking and changed existing approval records fail closed. Restore such evidence from a verified backup rather than clearing the marker. Administrative legacy approval is logged with the player's UUID.

This boundary assumes installed server code is trusted. A plugin deliberately deleting or forging Forage identity/approval PDC can defeat item identity; guards are not a sandbox for hostile server plugins. Pausing detects unknown direct transformations, but cannot refund costs another unintegrated plugin already charged. Configure external services to reject Forage items before charging, as the DiscordChat integration does.

## Existing data and recovery

Review configured `tips.entries` and other player-facing text overrides during the upgrade. Comment-preserving configuration updates retain customized text, so an existing server can still carry old tree-grove requirements or command-based activity instructions until staff updates those overrides to the new workstation flow.

Preserve compatibility identities, namespaces, issued item PDC, player UUIDs, profile files, quest claims, and existing idempotent receipts. Do not erase older camp data or silently classify an arbitrary 26.2 anchor as a valid Initial Camp. Legacy ownership needs conservative migration or quarantine with readable owner/location evidence.

`data/camps.yml` now stores `schema-version: 2` and a `registry-v2` list. The legacy `claims` section is retained until the same owner deliberately registers that anchor or staff releases it. Foreign legacy locations reserve a conservative footprint to prevent another player taking the area during migration. Bad v2 records cause a closed storage state with the existing recovery backup, rather than a partly trusted registry.

Before changing the data format, keep a recoverable backup. Review duplicate owners/worlds, overlapping footprints, missing world identities, and more than three old registrations. Keep questionable records unavailable until resolved. Staff release/reassignment/move helpers must apply the same role, world, biome, ownership, and overlap constraints as normal registration, or be restricted to safe release/inspection until that is possible. Player commands are `/forage camp [inspect|list|register|revalidate|unclaim [registration-UUID]]`; registration, revalidation, and release use explicit confirmations. Unclaim by registration UUID can be initiated remotely because it removes authority rather than granting a remote reward claim.

A staff recovery action must never reset a player's reward history to make a camp usable. Restoring camp access and restoring an uncertain inventory transaction are separate operations.

## Reward scope and balance

The first camp revamp gates existing supported Forage activities. Temporary extra hearts, other-plugin points, Forage kits, and fishing tournaments were examples of future reward choices, not a promise that all those integrations already exist. Community Efforts and plugin-managed Camp Storage remain separately tracked features.

Any future LuckPerms reward must target the recipient's authoritative server UUID, resolved locally for offline records and retained on retries. Preserve Java and Floodgate identities, expand and validate placeholders before dispatch, reject ambiguous/missing local identities, and never query Mojang or fall back to a name-based LuckPerms command.

Global balances intentionally let effort earned in one world buy an eligible reward at another fully active camp. Review rewards for inventory/economy differences. The Local Introduction requires some local play; it is not a local-income accounting system. Claimed items can still travel wherever the server's normal inventory rules permit.

## Verification and local release gate

**Plant follow-up, build 724 / Paper 26.3 BETA 157:** the canonical suite and 129 Forage tests passed, with an 88-assertion native plant/tool/dust probe. The probe covered new poplar, shrub, and mushroom sources, all dust variants, plain turn-ins, metadata rejection, whole-growth protection boundaries, no-target retention, and restored fixture state. See the [plant compatibility record](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/compatibility-tests/forage-26.3-plants-2026-10-06.md).

**Tool-protection follow-up, build 726 / Paper 26.3 BETA 159:** the canonical suite and 156 Forage tests passed, with a 390-assertion native protection probe and clean restart. Coverage included mandatory guards with gameplay disabled, CMI/mcMMO integration, Pyro callback protections, paid-menu precharge refusal, ordinary storage, owned camp transformations, and foreign metadata preservation. This evidence uses synthetic native probes and provider fixtures; it is not a connected-client paid-menu acceptance result. See the [tool-protection record](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/compatibility-tests/forage-tool-protection-2026-10-07.md).

The earlier ALPHA 49 records below remain historical camp evidence. Use the [beta checklist](/staff-reference/plugins/forage-checklist/) for the current real-client run, record the exact suite/Paper build, and do not infer a pass merely from the existence of automated coverage.

**Delivery and tool-protection follow-up, build 706:** the canonical suite synchronized all 65 managed JARs with matching hashes. It reported 3,128 tests, zero failures/errors and one skip, including 111 Forage tests. An isolated native Paper 26.3 ALPHA 49 probe passed 124 assertions covering all eight issued tools, owned tier/material/enchant/repair improvements, external mutation rejection, tracked repair correction, conservative legacy migration and staff approval, metadata/component preservation through material changes and serialization, entity/brush and dispenser guards, and Camp Delivery/Local Introduction previews for all three poplar leaf colours. Player profiles, camp registrations and gathering data retained their values; YAML key ordering changed during ordinary saves. UpdateSmoke passed 561 checks with zero warnings/failures and one skip; the dependency gate passed. Configuration had zero errors and the expected local non-live-balance warning. Real-client gameplay and third-party services beyond the tested paths still need owner acceptance; no live server or online docs were changed.

**Guidance and registration-feedback follow-up, build 705:** the canonical suite produced and synchronized all 65 managed JARs, with matching hashes. The 3,060 suite tests reported no failures or errors and one skip; all 64 Forage tests passed, including 19 added for this follow-up. A native Paper 26.3 ALPHA 49 probe passed 19 assertions: a complete physical Requirements book glows in Creative while the blocked composter does not; hover and click feedback explain Survival mode; Survival enables the action; changing back to Creative rejects a stale confirmation; Spectator and Adventure receive specific explanations; and the actual new-player next-step provider points to Dappled Forest in `/wild` and `/forage camp`. Recommendation inspection left profile, camp, chunk, and transaction state unchanged. This uses a synthetic server player, so real-client hover/chat acceptance remains pending.

**Initial revamp, build 704:** the canonical build produced all 65 managed suite JARs. Its 3,060 tests reported no failures or errors and one skip, including all 45 Forage tests. A native Paper 26.3 ALPHA 49 probe passed 50 checks covering counted materials, biome rules, world mapping, overlap, Initial Camp invalidation/revalidation, real managed inventory holders, introduction locks, duplicate confirmation, durable introduction readback, stale-menu cancellation without consumption, component-bearing inputs, asynchronous existing-chunk reload, ticket cleanup, and missing-chunk no-generation behavior. Configuration checking reported zero errors and one normal-balance warning; update smoke and the plugin compatibility gate passed.

Twenty local warmed samples validating both default camp boxes measured a median of 0.777 ms, 95th percentile of 1.164 ms, and maximum of 1.184 ms. Each camp box contains at most 5,733 positions. These are local loaded-chunk measurements, not a production load guarantee or remote chunk-load latency. The plugin also limits command/workstation admission before scans. The probe used an unjoined synthetic server player for native GUI and transaction calls; it did not exercise a real client's packet stream. Durable snapshot readback alone is not proof of cross-plugin inventory crash atomicity.

Test registration, repair, replacement, overlapping footprints, missing initial camps, alias collisions, disabled/missing worlds, world UUID changes, all three slots, and fourth-camp rejection. Verify fresh local actions, global caps, component-heavy items, full inventory, stale menus, concurrent confirmations, remote Initial Camp loading, and graceful pending validation.

Adversarial coverage includes rapid clicks, shift/drag/double-click/hotbar/offhand/drop/creative interactions, close/reopen, movement, teleport, world change, death, quit/kick, plugin disable, slow storage, storage failure, restart, and failure between each transaction stage. Test AutoSell and other item-producing plugins where installed. Profile validation and save behavior rather than assuming asynchronous code is inexpensive.

Build/test using JDK 25.0.4.1. Stop the maintained Paper 26.3 server before `scripts/build-all.sh`; it reserves one suite build number and replaces the complete managed JAR set only after the full gate passes. Start the local server on Java 27 and verify startup, mapped-world camp flow, restart persistence, and shutdown. Record both automated evidence and remaining real-client gameplay acceptance. Do not present a module-only JAR as a deployable build.

Keep the preserved 26.2 rollback instance untouched. Live server changes, live feature activation, and final live staging remain separate owner-directed steps; publishing these guides does not enable gameplay or establish beta acceptance.
