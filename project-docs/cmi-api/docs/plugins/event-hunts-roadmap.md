# Event Hunts Quality-of-Life Roadmap

This page preserves possible quality-of-life and architecture work for the shared `1MB-CMIAPI-EventHunts` feature plugin. It is primarily a planning backlog, not a statement that every listed behavior exists today. The read-only preflight, presentation-first event module registry, shared status/debug model, status-aware `/hunt` GUI, private player summaries, first shared GUI footer foundation, shared reward presentation, and restrained daily-reset guidance were greenlit and implemented on 2026-08-07; all remaining items still require explicit owner review and greenlight.

The current player and staff references remain [Coconut Hunt](coconut.md), [Halloween Ghost Hunt](ghosthunt.md), [Door Hunt](doors.md), [Door Hunt administration](doors-administration.md), and [Door Hunt testing](doors-testing.md).

## Direction And Boundaries

Event Hunts should present `/hunt` as the public umbrella for independently switchable seasonal modules such as `/coconut`, `/ghost`, and `/doors`. Shared presentation, navigation, diagnostics, configuration conventions, and safety utilities are good consolidation targets. The actual gameplay models should stay appropriately separate:

- Coconut and Ghost are collectible-location hunts and can share most of their collection engine.
- Doors uses door interactions, daily resets, random outcomes, and delayed Treat Bag claims; it should remain its own gameplay module.
- Coconut and Ghost milestone rewards should not be forced into the Doors Treat Bag model.
- Modules can share claim-safety and transaction utilities without being forced into one reward behavior.
- The internal `CoconutHunt` data namespace, PDC identities, permissions, placeholders, and existing player records should remain in place unless a future migration provides a concrete benefit worth the risk.

The main goal is to make future event modules easier to add and existing events easier to operate without destabilizing working gameplay.

## Proposed Backlog

### 1. Event Module Registry — Implemented Presentation Foundation

One authoritative registry now describes every installed event module. Each descriptor contributes:

- stable module id such as `coconut`, `ghost`, or `doors`
- display name and short description
- primary command
- GUI icon or custom head
- theme colors
- configured enabled state
- runtime active/dormant state
- current public start and end dates through its read-only status provider
- required worlds, including configured collectible worlds and registered Door worlds
- player GUI opener
- read-only current-player card summary provider
- existing player-command handler route
- read-only status contribution used by the index and aggregate host status

The `/hunt` index, text help, tab completion, host status, and `/hunt <module>` routing now read this registry instead of manually switching over the three known module IDs. A future event such as an Easter Egg Hunt must implement its own guarded gameplay and register a valid descriptor before it can participate in these shared surfaces.

Registry construction fails closed if descriptors are missing, duplicated, malformed, use duplicate commands, or do not exactly match the managed runtime modules. A runtime status-provider failure leaves the card visible as unavailable but prevents the registry route from opening. Direct module handlers remain authoritative for permissions, runtime state, gameplay, and rewards.

### 2. Status-Aware Fixed-Size `/hunt` GUI — Implemented

The Event Hunts index is generated from the registry and shared status snapshot. Like every Event Hunts menu it always uses the maximum 54-slot, six-row inventory; “adaptive” means its cards, ordering, labels, counts, calendar, and staff detail follow current module state, never that the inventory changes size.

Cards are ordered by usefulness:

1. events live now
2. staff-visible active debug/test events
3. events opening soon
4. reward claim periods
5. configured modules needing staff attention
6. ended and seasonally dormant events

Each module card shows:

- `LIVE`, `TEST`, `UPCOMING`, `CLAIMS`, `ATTENTION`, `ENDED`, or `DORMANT` state
- published start/end timing and event details
- required event world
- the module's primary command
- a compact private current-player summary supplied by that module
- click behavior that opens the existing live GUI or its existing read-only preview

Collectible cards show the viewing player's current-edition daily finds, total finds, and claimable-reward count, adapting honestly for upcoming, active, claim, and closed phases. Doors shows today's completed doors, season discoveries, waiting Treat Bag claims, and the current streak. Each provider receives only the player viewing the inventory. It uses the Coconut/Ghost join cache or the already-loaded Door profile and never scans profiles, reads a player file, creates progress, refreshes earned rewards, saves data, or dispatches a reward while `/hunt` opens. A profile that is still loading receives a friendly retry message; provider failure degrades only that personal section and cannot block the event index.

Authorized status staff see a compact `PASS`/`WARN`/`FAIL` line with failure/warning totals and the exact `/hunt admin status <module>` route. Full configured/runtime/debug state, location counts, reward-provider details, unresolved claims, and actionable findings stay in the status and preflight views instead of making an inventory tooltip taller than a smaller display. Module-card lore is capped at 12 lines: description, one schedule line, world, two personal-progress lines, optional two-line staff summary, command, and click action. The top summary still shows public live/upcoming counts, staff test counts, modules needing review, the next published event, and durable reward-journal health. Players see friendly public scheduling instead of internal warnings. All installed modules stay discoverable, including dormant seasons.

The card click resolves the module from the authoritative registry again and the destination module revalidates its real permission, runtime, event, and gameplay gates. The index cannot make a dormant event playable. The shared GUI service supplies a per-player custom `InventoryHolder`, nonce-bound session, full managed-inventory click/drag cancellation, click policy, throttling, close/quit/kick/world-change invalidation, and stale-session rejection.

### Read-Only Event Calendar — Implemented

`/hunt calendar` and the clickable Coming Up card in `/hunt` open a registry-generated 54-slot schedule. It lists every registered current or future module and orders cards as public live events, upcoming events, open reward-claim periods, ended events, unpublished events, and other seasonally dormant events. Public lifecycle wins over staff debug state, so a private test does not make the public calendar claim that an event is live.

Dates and countdowns are normalized to `Europe/Amsterdam`. Each event card is capped at nine lore lines containing its concise public state, dates or claim window, countdown where applicable, required world, command, and guarded open action. Calendar rendering does not request a player-summary provider, read a player file, load a chunk, activate a module, mutate progress, or touch a reward. A click resolves the module from the authoritative registry again and then uses the same guarded module/preview opener as the main index. New validated registry modules therefore appear without adding calendar-specific routing code.

### Shared Reward Status Presentation — Implemented

Coconut, Ghost, and Doors reward pages now translate their existing authoritative state into one player-facing vocabulary: gray `Locked`, yellow `In progress`, orange `Ready to claim`, green `Claimed`, and red `Delivery needs attention`. Item titles repeat a short bracketed state for accessibility, lore repeats the full state in text, and each main rewards page includes the same six-line legend.

This layer is deliberately presentation-only. Coconut and Ghost continue to use their existing snapshot, phase, eligibility, claim marker, and durable operation record. An unclaimed eligible reward is ready; an active but unfinished reward is in progress; a recorded claim is claimed only when its retained transaction is finalized or no legacy record remains. A retained non-final record is shown as needing attention. Doors continues to use its Treat Bag and milestone ledgers: saved treats are ready, dispatched treats are claimed, interrupted/failed claims need attention, unfinished milestones are in progress, disabled definitions are locked, and successfully dispatched kit unlocks remain ready because the player still claims the kit through `/kits`. No eligibility, commands, permissions, persistence, delivery, retry, or claim actions changed.

### Restrained Daily-Reset Guidance — Implemented

Coconut, Ghost, and Doors now share one daylight-saving-safe local-midnight countdown formatter. The compact `Daily reset in 2h 14m · Europe/Amsterdam` line appears only in relevant module GUI progress/player cards; it does not create scoreboards, action bars, boss bars, timers, or repeating messages.

Ghost and Doors may also send one contextual chat reminder during the final configured 90-minute window. It is considered only after a successful Ghost find or completed Door interaction, only while that player's daily target remains unfinished, and never after the target is complete. The local-date marker is persisted atomically with the successful find or Door reward preparation, so reconnects and restarts cannot repeat it. Ghost's previous broad login reminder is skipped in favor of this contextual path; Coconut keeps its existing seasonal login reminder and receives no new near-midnight chat message. Both windows can be disabled or adjusted in configuration, with a guarded maximum of six hours for Doors. No scheduler scans online players.

### 3. Shared GUI Components — Footer Foundation Implemented

The first incremental component is implemented without changing gameplay. Every Coconut, Ghost, and Doors subpage now uses one fixed six-row footer contract: the viewer's skinned head in slot 45, Back in 48, the current module overview in 49, All Event Hunts in 50, the server menu in 52, and Close in 53. Doors retains its optional Coconut and Ghost shortcuts in slots 46 and 47. The player head stays module-owned: Coconut/Ghost shows edition, finds, daily progress, streak, event-point balance, earned/spent points, and community contribution; Doors shows season, daily and unique doors, visits, treat/trick totals, waiting Treat Bag claims, and streak. A loading Door profile gets noninteractive friendly lore rather than a broken or misleading action.

The `/hunt` index keeps its page controls in slots 48–50 and adds the same player-head convention at slot 45. Its combined summary reuses the already-computed registry player summaries, lists public live/upcoming counts plus one private snapshot per installed module, and reminds the player that points and rewards remain separate per event. It does not perform another provider call or playerdata read.

The shared component continues to use the existing per-player custom `InventoryHolder`, nonce-bound session, full managed-inventory cancellation, click policy, delayed command dispatch, and stale-session invalidation supplied by the common GUI service. Later incremental extraction candidates remain:

- reusable info, progress, rewards, hints, history, and statistics components
- shared live/upcoming/closed lore formatting
- standard interaction sounds and denial feedback
- authoritative click-time permission, state, cost, cooldown, and session revalidation
- safe handling for normal clicks, shift-click, drag, double-click, hotbar swaps, offhand actions, creative actions, close, quit, and stale sessions

Modules should still retain their visual identity. Ghost can remain spooky, Coconut summery, and Doors styled as a Treat Bag while sharing the safe inventory mechanics underneath.

### 4. Shared Module Status And Debug Model — Implemented

A common immutable read-only snapshot now reports:

- configured and runtime enabled state
- lifecycle phase and effective event id
- debug or staff-bypass state
- required-world availability
- registered, valid, disabled, and unavailable location counts
- reward-provider readiness
- pending, failed, uncertain, or unresolved claims
- warnings and failures with actionable explanations

The snapshot is built in registry order from already-loaded module records and the feature's in-memory transaction journal. It is linear in the small registered-location and loaded-player-cache collections; it does not load chunks, inspect terrain, scan player files, reload configuration, or mutate event state. Door claim figures explicitly identify their loaded-cache scope so zero is not mistaken for a complete all-profile audit.

`/hunt admin status`, `/hunt debug status`, `/hunt admin modules`, the `/hunt` index, host startup logging, and the asynchronous Doors-ready summary now consume this model. Intentionally disabled seasonal modules remain healthy rather than being mislabeled as failures. Configured-but-dormant runtimes, missing required worlds, invalid or incomplete location/wave counts, unavailable reward providers, debug/suppressed-reward policy, failed or uncertain claims, and an unavailable durable journal receive consistent `WARN` or `FAIL` severity plus an operator action. Module-specific status commands and `/hunt admin preflight` remain the deeper diagnostic layers. Activation gating and diagnostic exports remain possible separately reviewed consumers.

### 5. Event Activation Preflight — Implemented Read-Only Foundation

Add one consistent host-level readiness check before staff open an event. Candidate checks include:

- required worlds exist and are loaded
- location ids and coordinates are valid and unique
- the expected number of locations exists for every daily wave
- configured head textures, door blocks, and other assets are usable
- required CMI kits and reward providers are available
- reward and claim worlds are valid
- schedules use the expected timezone and have valid, non-conflicting boundaries
- no enabled reward pool is empty or malformed
- immutable snapshots and daily denominators match the selected edition
- unresolved transactions or retained recovery work are clearly reported
- debug bypasses and suppressed reward commands are visible

Suggested eventual commands:

```text
/hunt admin preflight
/hunt admin preflight coconut
/hunt admin preflight ghost
/hunt admin preflight doors
```

The first release is read-only and reuses existing module checks. It runs collectible chunk inspection sequentially and never generates missing terrain. Once its reports have been exercised and trusted, a separately reviewed follow-up could require a passing preflight before an activation command succeeds.

Example target output:

```text
Ghost Hunt preflight: PASS
80 registered Ghosts
20 valid Ghosts in each of 4 waves
5 rewards available
Halloween world loaded
Europe/Amsterdam schedule valid
```

### 6. Configurable Theme Packs

Move common seasonal presentation into reviewed theme definitions where it reduces Java duplication:

- GUI icon and title
- primary, secondary, live, caught, locked, and unavailable colors
- collectible head texture pools
- sounds and particles
- hologram text
- messages
- Ghost outfit colors and trim variants
- capture animation settings

This could allow the collectible engine to support Easter eggs, presents, flowers, treasure heads, or other future hunts without cloning Ghost Hunt. Theme configuration must not be allowed to redefine trusted PDC identity or bypass gameplay and reward validation.

## Player Quality-of-Life Candidates

These ideas are optional and should be selected individually:

- `/hunt calendar` showing live, upcoming, claims-open, ended, unpublished, and dormant events — implemented
- a combined indicator for unclaimed rewards across modules
- `Return to Event Hunts` on every module page
- countdown until the next daily reset, with the timezone stated explicitly — implemented in module GUIs with one guarded contextual Ghost/Doors reminder
- a throttled once-per-day join reminder while an event is live
- per-player event notification preferences
- a safe `Continue hunting` action where a valid route or teleport exists
- personal event history showing completed days and claimed rewards
- consistent distinctions between `completed`, `reward available`, and `reward claimed` — implemented through the shared reward status presentation
- a combined read-only summary such as Ghost daily progress, Doors Treat Bag count, and Coconut's next season

The combined summary should aggregate presentation only; it should not merge the modules' reward ledgers.

## Staff Quality-of-Life Candidates

A future staff-only `/hunt admin` GUI could provide:

- module toggles
- schedule review
- preflight execution
- setup tools and location validation
- reward-provider health
- player progress inspection
- unresolved claim review and recovery routes
- event snapshot creation
- end-of-event report generation

Per-player test mode is a particularly useful later candidate. It would let an authorized tester experience an upcoming event as active without globally exposing it or changing live player data. A possible command shape is:

```text
/hunt admin test ghost mrfloris on
```

Test state should be explicitly isolated, durable enough to survive a restart when intended, easy to clear, and unable to issue live rewards unless a separate guarded option is enabled.

## Recommended Implementation Order

Nothing in this list is approved merely because it appears here. If greenlit over time, the suggested order is:

1. read-only host-level activation preflight — implemented 2026-08-07
2. event module registry — implemented 2026-08-07
3. shared module status/debug result — implemented 2026-08-07
4. status-aware, fixed six-row `/hunt` GUI generated from the registry — implemented 2026-08-07
5. shared GUI components, extracted incrementally from proven menus — footer/player-card foundation implemented 2026-08-07
6. configurable theme packs
7. selected player and staff quality-of-life items

The registry and shared status model can eventually support the GUI, but the preflight is deliberately first because it can be added independently and safely.

## First Standalone Candidate: Read-Only Preflight

The greenlit first high-priority item is implemented as `/hunt admin preflight [all|coconut|ghost|doors]` in read-only form.

Why it is the safest first choice:

- it does not change player gameplay, rewards, persistence, schedules, or GUIs
- it does not depend on the future module registry or GUI toolkit
- Coconut/Ghost already have collectible event validation and snapshot checks that can be reused
- Doors already exposes detailed health, registry, reward, season, and persistence checks that can be reused
- it provides immediate operational value before Halloween testing and activation
- its stable result model can later feed shared status and the staff GUI without requiring that later work now

Implemented acceptance criteria:

- supports `all`, `coconut`, `ghost`, and `doors`
- is permission-guarded and available from console
- performs no writes and cannot activate, reload, repair, migrate, or claim anything
- reports `PASS`, `WARN`, or `FAIL` per check with actionable explanations
- clearly identifies debug overrides and test-only reward suppression
- verifies worlds, schedules, location/wave totals, snapshot state, reward readiness, and unresolved delivery state where applicable
- fails closed when a required dependency or authoritative file cannot be inspected
- has deterministic unit coverage for result aggregation and severity
- is exercised on the Paper 26.2 test server without changing existing module state

Only after staff trust the read-only output should a separate greenlight consider making activation commands require a passing result.
