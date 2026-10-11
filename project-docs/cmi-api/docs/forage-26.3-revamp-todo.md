# Forage 26.3 implementation and release tracker

Updated **11 October 2026**. This is the current work tracker for [GitHub issue #35](https://github.com/mrfdev/1MB-Library/issues/35). The [roadmap](plugins/forage-roadmap.md) separates current behavior from future ideas; the [beta checklist](https://docs.1moreblock.com/staff-reference/plugins/forage-checklist/) records gameplay acceptance. Historical milestone evidence is retained below and does not replace the current status.

## Current baseline

- Both maintained instances, `servers/Paper-26.3/` and `servers/Forage-26.3/`, have the same managed suite build **738**, targeting Paper **26.3 BETA 174**. Each server keeps independent worlds, configuration and player progress. The current suite has **66** managed JARs; the historical 65-JAR counts below remain evidence for their original builds.
- Build with JDK **25.0.4.1**, retaining Java 25 bytecode; maintained Paper runtimes use Java **27**. The canonical `scripts/build-all.sh` workflow requires both maintained servers stopped and synchronizes their complete suites and selected Paper runtime together.
- The beta runs the accepted camp system, quest kit delivery, expanded camp requirements, recent activity, quest filters, source catalogue, tool protections and mcMMO ability blocking. The source-complete changes listed below are **not deployed in build 738**.
- The public player/staff guides and beta checklist are published. Publication does not activate live gameplay. Live Forage remains dormant until its separate release gates and explicit owner authorization are complete.

## Completed implementation

- [x] Register one Initial Camp in Dappled Forest and up to two Secondary Camps, one per actual world, with explicit claims, exclusive footprints, world mappings, repair/revalidation, unclaim/replacement and migration/recovery tools.
- [x] Preserve global player progression and balances when camps break or move. Require a current owned workstation, a valid Initial Camp and that camp's completed Local Introduction for reward services.
- [x] Support player-built equivalents and reused Abandoned Camp features through counted requirements, without requiring structure provenance or one schematic.
- [x] Require the composter, crafting table, 24 wool-family shelter positions, six fences, storage, a lit campfire, a lit candle position, an intact straw bed, firefly bush, two placed cushions, water-filled cauldron, filled flowerpot, two stripped log/wood blocks and a placed banner. Stored items do not qualify; the [player guide](https://docs.1moreblock.com/player-guides/plugins/forage/) defines accepted variants and scan bounds.
- [x] Provide the tool shop, tool XP/tier upgrades, repair/merge, skill branches, daily/weekly/monthly quests, deliberate inventory Turn-Ins and bounded Forage Dust/growth.
- [x] Provide wrapped guidance, complete gathering-source browsing, Recent Activity and quest status filters. Further catalogue/navigation fixes awaiting deployment are listed separately below.
- [x] Protect curated tools from reviewed external modification routes, resolve the Pyro composter interaction conflict, permit workstation access at the durability safety limit, and block conflicting mcMMO Super Breaker, Tree Feller and Giga Drill Breaker behavior.
- [x] Deliver item-only CMI quest kits with preflight, exact inventory checks, durable claim identities and retained recovery evidence. Kit templates can remain disabled for ordinary CMI access; arbitrary reward commands are still unsupported.
- [x] Save Forage snapshots asynchronously and retain transaction evidence. This does **not** implement durable acknowledgement from external inventory/economy providers; see ENG-01.
- [x] Publish current player/staff instructions and a separate beta checklist, with upcoming features clearly identified.

## Source complete, awaiting deployment

These are completed implementation tasks, not new feature requests. Their activation is still open under REL-01.

- [x] **Queued: accepted Turn-Ins.** Add a clickable, paginated accepted-item browser using the submission resolver, and accept cocoa beans (71 default item types after deployment; 70 in build 738).
- [x] **Queued: placed-resource protection.** Persist current-position provenance in chunk PDC, follow ordinary/sticky piston movement across chunks and apply the documented growth/falling-block rules. No per-break CoreProtect queries, expiry-based eligibility or historical backfill. See the [tracking contract](https://docs.1moreblock.com/staff-reference/plugins/forage/#placed-resource-tracking-upcoming).
- [x] **Queued: source navigation and inspection.** Restore the Source Tools Back button and allow the verified read-only CMI `/itemnbt` route without weakening tool modification guards.
- [x] **Queued: participation reward.** Track successfully claimed daily and weekly rewards across periods under the player's UUID, including retained earlier claimed history. Provide one lifetime manual claim through Quests & Rewards. Track qualifications while participation delivery is disabled; preserve claim history when changing kits/camps. The real map and activation remain CONTENT-02 and REL-02.

## Remaining engineering, content and release work

- [ ] **ENG-01 — Inventory/economy durability and recovery.** Implement the verified provider durability/reconciliation boundary required by the current live-release contract. Forage's own snapshots and receipts do not prove Minecraft or external inventory/economy state is durably saved. Pending/uncertain operations remain blocked for staff review; `/forage admin recoveryack` is an evidence-removal acknowledgement, not the missing adapter. Do not mark this complete from ordinary save tests or silently relax the live gate. See [transactions and recovery](https://docs.1moreblock.com/staff-reference/plugins/forage/#transactions-saving-and-crash-recovery).
- [ ] **CONTENT-01 — Real quest rewards.** Replace the 23 beta kit placeholders (10 daily, eight weekly, five monthly) with authored rewards and update their `reward-description` values. At this review all 23 still contain named dirt. Preserve the user's edits and each server's separate configuration.
- [ ] **CONTENT-02 — Participation map.** Add the finished map to `forage_participation`, preserving its map/item components. The beta template exists and currently holds a firefly bush; it is not the final map. Keep `participation.enabled: false` until ready. CMI's `Enabled: false` alone does not prevent Forage from reading a kit template.
- [ ] **REL-01 — Deploy the completed queue.** At the next explicitly authorized maintenance window, stop both maintained servers, run the canonical full-suite build, and deploy matching complete JAR sets. The beta must not be restarted merely to update this tracker.
- [ ] **REL-02 — Activate final reward content.** Load the authored CMI kits and matching Forage descriptions/mappings through their supported reloads. Once the participation feature is deployed and its real map is ready, deliberately enable its Forage claim route while keeping ordinary CMI `/kit` access disabled.
- [ ] **REL-03 — Prepare the owner-run live handoff.** Settle live balance, permissions, world mappings and reward contents; preserve existing live data/configuration and a rollback. After ENG-01 and acceptance, stage the exact accepted suite and obtain explicit live activation. Beta worlds, profiles and fixture settings are not live deployment inputs.

## Testing and owner acceptance, tracked separately

These remain open. A completed source checkbox, the published docs or automated tests do not sign off real gameplay.

- [ ] **TEST-01 — Beta gameplay acceptance.** Complete the applicable player/staff checks in the [shareable beta checklist](https://docs.1moreblock.com/staff-reference/plugins/forage-checklist/), including current camp requirements, guidance, tool protection, progression, rewards and integration behavior, on supported real clients.
- [ ] **TEST-02 — Adversarial and recovery acceptance.** Complete concurrent/stale GUI and inventory scenarios, actual inventory-provider failure/crash/restart cases, AutoSell interactions and the required acceptance of ENG-01. Retain unresolved evidence; do not replay uncertain deliveries automatically.
- [ ] **TEST-03 — Queued changes after deployment.** Keep the new Turn-In, provenance and participation checks blocked on build 738. Participation delivery also waits for CONTENT-02 and REL-02; eligibility tracking can be exercised while claiming stays off.

Current local evidence: build 738's canonical suite recorded 4,191 tests (zero failures/errors, 11 skips), including 663 passing Forage tests. Subsequent source-only Forage verification reached **823 tests, zero failures/errors/skips**. Those development tests are not a new distributable suite or connected-client acceptance. Builds 704–706 and their native probes below are historical evidence only.

## Optional later development

These ideas are not required to complete the accepted camp revamp or the current release checklist. They need separate scope before implementation; see the [roadmap](plugins/forage-roadmap.md).

- Creature-origin checks for natural mobs versus spawners, breeders and farms. The new block-placement guard does not establish creature provenance.
- Community Efforts and plugin-managed Camp Storage; ordinary chest storage and deliberate inventory delivery already exist.
- Streaks, general milestones and herbarium collections beyond the implemented participation reward.
- Seasonal/event profiles, rare herbs, derbies/tournaments, richer skill trees, tool variants and bounded magic/dust extensions.
- Audited reward adapters for temporary hearts, other-plugin points, LuckPerms or other external effects. Any future LuckPerms delivery must use authoritative UUIDs and local-only identity resolution. Current item-only CMI kits do not require those future adapters.
- Revisit mcMMO ability-expanded Forage rewards. Ability blocking is the current deliberate behavior.
- SQLite or other storage changes only if measured scale justifies them; the implemented placed-block tracking does not require a new database.

## Historical implementation record

The following records preserve what was implemented and verified at their original milestones. Their older build numbers, dependency versions, suite counts, publication boundaries and pending items are historical, not today's open checklist. The sections above supersede old scope statements, including optional comforts, kits as a future integration, one maintained test server and deferred public documentation.

<details>
<summary>27 September camp implementation and early follow-ups (builds 704–706)</summary>

# Forage 26.3 camp revamp

Owner-approved specification and implementation checklist, 27 September 2026. This captures the final decisions from the design discussion; later corrections supersede earlier brainstorming. Work targets the local `servers/Paper-26.3/` instance only. Live activation and online documentation publication are separate follow-ups.

## Agreed product contract

- **Completed at that milestone:** Record the agreed scope before implementation.
- **Completed at that milestone:** Require exactly one Initial Camp slot plus two optional Secondary Camp slots, three total, one per actual world.
- **Completed at that milestone:** Require the Initial Camp in an approved initial world (default `wild`) and the actual Dappled Forest biome, including replacements.
- **Completed at that milestone:** Permit naturally generated Abandoned Camps or player-built equivalents; use a counted materials checklist rather than one schematic or mandatory structure provenance.
- **Completed at that milestone:** Require complete camp features plus distinct Forage equipment/workstations.
- **Completed at that milestone:** Permit Secondary Camps without a biome requirement in other whitelisted worlds.
- **Completed at that milestone:** Default whitelist: `end`, `nether`, `general`, `wild`, `cave`, `acid`, `oneblock`, `skyblock`, `chunkblock`, `skygrid`.
- **Completed at that milestone:** Default blacklist: `builders`, `spawn`, `legacy`; blacklist wins and unlisted worlds fail closed.
- **Completed at that milestone:** Support explicit logical-to-physical world mapping, following Halloween Virus's pattern; identity mapping on live, isolated aliases for local tests.
- **Completed at that milestone:** Reject ambiguous mapping, unauthorized worlds, duplicate actual-world registrations, and attempts to turn the Initial Camp slot into a third Secondary Camp.
- **Completed at that milestone:** Require deliberate registration; inspection and incidental interactions never claim a camp.
- **Completed at that milestone:** Reserve exclusive camp footprints, prohibit overlap and sharing, and use authoritative player UUIDs.
- **Completed at that milestone:** Keep an incomplete camp registered and occupying its slot until explicit unclaim; support repair/revalidation and relocation without progression loss.
- **Completed at that milestone:** Block all Secondary Camp workstation use when the Initial Camp is missing, invalid, unclaimed, or cannot be verified.
- **Completed at that milestone:** Revalidate the camp being used and Initial Camp at action time, including reward confirmation and stale menus.
- **Completed at that milestone:** Preserve all global XP, points, collections, quests, limits, and claimed-reward history when camps break, move, or worlds reset.
- **Completed at that milestone:** Keep inventories local to the active world/inventory group; submissions consume only the acting player's present inventory.
- **Completed at that milestone:** Earn progression globally; changing worlds/camps never resets a cap, duplicates an entitlement, or creates a separate points balance.
- **Completed at that milestone:** Claim rewards only through an owned camp workstation, in that camp's world; no remote command route or teleport-with-open-menu bypass.
- **Completed at that milestone:** Add a per-registration Local Introduction: fresh qualifying personal gathering in the camp's world, followed by deliberate workstation submission.
- **Completed at that milestone:** Keep starter-tool access, instructions, and introduction submission usable before global benefits unlock.
- **Completed at that milestone:** Make locked rewards, remaining local activity, and the next step prominent in menus and chat.
- **Completed at that milestone:** Preserve introduction progress during repair/revalidation; a replacement camp starts a fresh introduction.
- **Completed at that milestone:** Use achievable introduction objectives in island, Nether, and End worlds without multi-biome requirements.

## Research and implementation foundations

- **Completed at that milestone:** Inspect exact Paper 26.3 official documentation/API, vanilla camp template pools, block palettes, and cushion representation.
- **Completed at that milestone:** Measure actual Dappled camp structure pieces and explain minimum checklist choices; do not invent an average for random whole camps.
- **Completed at that milestone:** Add a repeatable local structure inspection or sampling workflow; retain measured evidence and commands for owner gameplay inspection.
- **Completed at that milestone:** Choose bounded camp footprint, vertical extent, search radius, and counted material alternatives (including wool stairs/slabs, chests/barrels, fences, campfires).
- **Completed at that milestone:** Record terminology and durable design decisions in the Player Fun domain documentation.
- **Completed at that milestone:** Inspect and preserve existing uncommitted work, feature identity, PDC namespaces, configuration, and progression data.
- **Completed at that milestone:** Back up/migrate legacy camp claims conservatively; never erase player progress or silently turn arbitrary old camps into Initial Camps.
- **Completed at that milestone:** Add admin inspection/recovery for legacy or conflicting claims and world mappings.

## Security and transactions

- **Completed at that milestone:** Keep authoritative GUI holders/session identity; validate player, current station, ownership, distance, world, camp revision, permission, costs, inventory, and eligibility at mutation time.
- **Completed at that milestone:** Prevent rapid/concurrent action execution, stale confirmations, replayed claims, and command bypasses.
- **Completed at that milestone:** Cover clicks, shift-clicks, drags, double-clicks, number keys/hotbar, offhand, drops, creative, close, quit, death, teleport, and world changes.
- **Completed at that milestone:** Persist valuable transaction intent and outcomes with idempotent identity and explicit recovery states; never equate command acceptance with delivery.
- **Completed at that milestone:** Fail closed on full inventory, missing dependencies, persistence failure, unknown identity, or uncertain delivery.
- **Completed at that milestone:** Preserve unrelated item metadata and distinguish curated items from ordinary materials.
- **Completed at that milestone:** If LuckPerms rewards are supported, expand/validate actual local UUID recipients consistently; no external identity lookup or name fallback.

## Performance and durability

- **Completed at that milestone:** Move runtime disk writes, YAML serialization, backups, and heavy exports off the main thread using immutable snapshots and ordered bounded queues.
- **Completed at that milestone:** Bound ordinary progress crash loss to seconds and document the actual guarantee; do not claim zero loss for unsaved Minecraft inventory state.
- **Completed at that milestone:** Avoid whole-dataset serialization on every gather, click, or read-only status request.
- **Completed at that milestone:** Obtain unloaded Initial Camp chunks asynchronously with bounded concurrency, no generation, bounded tickets/timeouts, and fail-closed pending state.
- **Completed at that milestone:** Bound scans and scheduled work; do not trust stale cached readiness after changes.
- **Completed at that milestone:** Keep Bukkit world/entity/inventory access on the server thread; callbacks must revalidate before mutation.
- **Completed at that milestone:** Provide health/queue/error diagnostics and graceful shutdown flushing.
- **Completed at that milestone:** Preserve recoverable ambiguous transactions for review rather than automatically replaying external effects.

## Verification and delivery

- **Completed at that milestone:** Focused tests for registration limits, dedicated Initial Camp slot, mapped worlds/blacklist precedence, owner UUIDs, overlaps, missing/repaired blocks, unloaded chunks, and relocated camps.
- **Completed at that milestone:** Tests for local introduction provenance, fresh registration, world isolation, global caps/progress, and gated rewards.
- **Still open at that milestone:** Adversarial GUI/session tests and inventory/transaction failure tests, including restart/crash recovery.
- **Completed at that milestone:** Verify template-derived materials and rotation-independent checklists.
- **Completed at that milestone:** Update in-depth technical/admin docs, player guide, roadmap, configuration guidance, and public documentation sources.
- **Completed at that milestone:** Refresh the local public documentation mirror; publication remains separate.
- **Completed at that milestone:** Stop the maintained Paper 26.3 server and run canonical `scripts/build-all.sh` on JDK 25.0.4.1; retain Java 25 bytecode and Java 27 runtime.
- **Completed at that milestone:** Synchronize and verify all 65 suite JARs with one reserved build number; do not hand off a module-only build.
- **Completed at that milestone:** Run local Paper 26.3 startup/shutdown, mapped-world camp and GUI smoke tests, persistence/restart checks, and focused performance observations.
- **Completed at that milestone:** Document exact automated evidence and remaining real-client gameplay acceptance honestly.
- **Completed at that milestone:** No changes to live servers, no live activation, and no online docs publication in this implementation task.

## Scope notes

Global reward types discussed (temporary health, other-plugin points, kits, fishing tournaments) are product examples. Implement the camp-gated global reward surface and safely supported existing integrations; an unavailable external reward must remain unclaimed with clear feedback. Broader Community Efforts, managed storage, and new external reward engines must not be misrepresented as already implemented. Any remaining work is explicitly tracked here and in the repository issue.

## Verification notes and remaining release gates

- The implementation checkboxes above describe code paths and design safeguards; they are not a claim that every adversarial scenario has been exercised with a real client.
- Canonical local build 704: Paper 26.3 ALPHA build 49, all 65 managed JARs, Java 25 bytecode and Java 27 runtime. Suite: 3,060 tests, zero failures/errors, one skip; Forage: 45 passing tests.
- Shared GUI tests cover all click types and stale sessions using mocked events. Real Java/Bedrock clients, hacked-client packets, AutoSell interactions, full live inventories, kick/death/teleport races, and player acceptance remain live-release gates.
- Final native probe passed all 50 checks, including asynchronous introduction delivery, duplicate confirmation, durable readback, stale-menu cancellation, unloaded-chunk preparation and ticket cleanup. A first-attempt fixture timing assumption was corrected. Two-camp validation measured 0.78 ms median / 1.16 ms p95 in 20 warmed local samples.
- Forage's durable intent and snapshots are not atomic with Minecraft playerdata or external inventory/economy storage. Unresolved effects are blocked for review; finalized valuable-operation evidence is retained. Verified external-save acknowledgement and forced-crash acceptance are required before live activation.
- Arbitrary quest reward commands remain blocked until a verified delivery adapter exists. Temporary hearts, other-plugin points, kits, tournaments, Community Efforts and managed Camp Storage are separate follow-ups, not claimed as implemented here.
- LuckPerms reward delivery is not implemented in this milestone. Any future adapter must follow the authoritative UUID/local-only resolution contract.

Detailed local verification: [Forage camp results](compatibility-tests/forage-26.3-camps-2026-09-27.md).

## First client feedback: guidance and registration explanations

- **Completed at that milestone:** Use current Camp Registrations for `/next` and `/forage next`; direct a missing Initial Camp to Dappled Forest and `/forage camp`, respecting configured logical world mappings.
- **Completed at that milestone:** Correct the shared first-success checklist and retain `/guidance` hint preferences and dormant-feature filtering.
- **Completed at that milestone:** Show Local Introduction gathering followed by item delivery; do not present global rewards as ready before submission.
- **Completed at that milestone:** Distinguish the physical Requirements book's glow from full registration/revalidation readiness.
- **Completed at that milestone:** Show Survival mode and other registration blockers in hover text and explain the current reason in chat on click.
- **Completed at that milestone:** Add focused regression coverage for mapped/no Initial Camp guidance, repair, retained Secondary Camps, and introduction delivery.
- **Completed at that milestone:** Update canonical player and technical documentation and public guide source.
- **Completed at that milestone:** Complete the follow-up canonical suite build and synchronize all 65 managed JARs as build 705, with matching hashes.
- **Completed at that milestone:** Pass the follow-up native Paper 26.3 ALPHA 49 probe: all 19 registration-feedback and read-only guidance assertions.
- **Completed at that milestone:** Refresh and validate the local public documentation mirror without publishing.
- **Still open at that milestone:** Obtain real-client confirmation of the new hover/chat feedback and requested guidance.

Build 705 follow-up evidence: 3,060 suite tests, no failures/errors, one skip; all 64 Forage tests passed, including 19 additions. Native checks cover physical versus action glints, Creative/Survival/Spectator/Adventure feedback, stale game-mode changes, actual new-player guidance, and unchanged profile/camp/chunk/transaction state while reading recommendations. These results supplement the initial build 704 evidence; they do not replace its separate 50-check camp probe or resolve the remaining real-client and external-inventory crash release gates.

## Player-test follow-up: delivery and tool protection

- **Completed at that milestone:** Reproduce Camp Delivery readiness before Local Introduction submission.
- **Completed at that milestone:** Show the separate gathering and eight-item introduction steps; route players directly to Local Introduction.
- **Completed at that milestone:** Keep all three poplar leaf colours eligible and protect metadata-bearing submissions.
- **Completed at that milestone:** Cover namespaces/aliases, targeted players, backpack/offhand/cursor, console and RCON repair/enchant commands.
- **Completed at that milestone:** Guard workstation prepare/result/click/drag/hotbar/offhand and crafting/crafter transformations using raw PDC identity.
- **Completed at that milestone:** Block altered or locked brushes before entity effects, and prevent dispenser automation from bypassing personal tool checks.
- **Completed at that milestone:** Record approved tool improvements and check identity/mechanics before use and paid transformation; retain tracked durability correction.
- **Completed at that milestone:** Preserve ambiguous legacy tools for explicit staff approval and keep unrelated item metadata.
- **Completed at that milestone:** Refuse Forage tools in DiscordChat's enchant preview/confirmation before point spend.
- **Completed at that milestone:** Complete native tool-state probes (124 checks), independent fix review, and canonical suite build 706 (65 JARs, 3,128 tests).
- **Still open at that milestone:** Owner acceptance of the new hover/chat flow and real-client external-tool denial paths.

</details>
