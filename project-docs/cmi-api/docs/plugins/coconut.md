# Coconut Hunt

CoconutHunt adds a reusable seven-day `/coconut` event for the Summer Beach. Staff place 200 special coconut heads, assign them across seven cumulative waves, and validate the setup before the event starts. Players return as new waves unlock, find each coconut once for themselves, build a daily participation streak, help community goals, claim milestone rewards, earn Coconut Points, and redeem those points for configured MobHat cosmetics.

CoconutHunt remains an isolated player-fun feature plugin, but its mature event logic is now a reusable themed-hunt engine. The same `1MB-CMIAPI-CoconutHunt` jar serves Summer through `/coconut` and Halloween through `/ghosthunt`; keeping one plugin preserves every legacy CoconutHunt file, PDC marker, permission, placeholder, registry entry, snapshot, and player record without a risky data move. See [Halloween Ghost Hunt](ghosthunt.md) for the Ghost edition. The plugin uses the shared 1MB library for commands, translations, GUI safety, build metadata, PlaceholderAPI, and playerdata, but it does not change Collect, BirthdayLanterns, KitStreaks, SocialGatherings, or MobHat behavior.

## Available Features

- a polished six-row `/coconut` overview that can open from any world
- one permanently collectible copy of every snapshot coconut per player
- seven cumulative daily waves, so late players can catch up on locations
- immutable event snapshots that keep the denominator and perfect reward stable
- personal collection milestones at 5, 10, 25, 50, 75, 100, 150, and 200 finds
- daily participation streak milestones from day 1 through day 7
- a personal perfect-completion checklist and configurable 2026 reward kit
- Coconut Points with earned, spent, balance, and source totals
- capped nearby-player bonus points without shared discovery credit
- unique community discovery totals, daily goals, contribution gates, and claims
- a configurable MobHat redemption shop with confirmation and support regrant
- a bundled coconut head texture with optional custom texture override and automatic loaded-head refresh
- private per-player Paper TextDisplay holograms, particles, spotting sounds, and discovery effects
- configurable discovery-title timing plus clear current-wave completion guidance
- concise hoverable reward/offer failures that identify the clicked entry and exact missing progress
- setup heads, registration, inspection, enable/disable, removal, validation, and deterministic wave assignment
- optional event cuboids without requiring WorldGuard
- isolated debug event data that is active on day 1 by default, uses a configurable 15-head test target, and keeps reward commands off by default
- guarded one-player resets and complete debug-event resets that preserve registered heads and configuration
- restart-safe event lifecycle hooks and offline participant-end processing
- safe allowlisted command hooks for lifecycle, discovery, claims, and purchases
- shared playerdata persistence, global community state, staff reports, and cached placeholders
- configured-edition history and exact old-event claims through each edition's claim deadline
- guarded `/hunt admin event` preflight and activation with immutable-snapshot verification and an audit record

## Player Experience

Run `/coconut` from any allowed information world, then use `Visit the Summer Beach` to reach the hunt. The shared footer opens your progress, goes back, returns to the CoconutHunt overview or `/menu`, and closes the GUI. The help page can post the clickable player-guide URL in chat.

Right-click an unlocked coconut with your main hand to discover it. Left-clicking is not a discovery action. Each private hologram is a compact `☀`: gold means you have not found that coconut, while green means you have. Green sparkles distinguish an unlocked gold coconut from one waiting for a future wave; future-wave and already-found coconuts do not sparkle. Each coconut counts once for you and remains available to every other player. Seven cumulative waves unlock during the event, so missed locations stay available later; missed participation days do not.

The overview and related pages show:

- the current event day, unlocked cumulative waves, next unlock, and time remaining
- personal `found / total` progress, remaining coconuts, and a wave-by-wave breakdown
- today's participation, current and best streaks, and the seven-day calendar
- collection, streak, community, and perfect rewards with clear claimable or claimed states
- Coconut Point balance, earned and spent totals, and a readable earning history
- community totals, the daily goal, next target, and personal contribution
- MobHat cosmetic offers with requirements, prices, ownership state, and purchase confirmation
- private proximity hints, spotting effects, discovery celebrations, and the `Visit the Summer Beach` action

The other pages cover wave progress, collection milestones, the seven-day calendar, community rewards, all claims, the perfect-completion checklist, Coconut Points, the MobHat shop, help, and a discovered-coconut list. Undiscovered coordinates are never shown to normal players.

Every standard six-row page uses the same footer: the player's head opens personal progress, `Back` returns to the prior CoconutHunt page, the nether star returns to the CoconutHunt overview, `Back to Server /menu` closes the event GUI and runs `/menu`, and the barrier closes the inventory. The help page's `Player Documentation` button keeps the long URL out of item lore; clicking it closes the GUI and posts the complete clickable `https://docs.1moreblock.com/player-guides/plugins/coconut/` link in chat. Coconut Points use a gold-nugget icon, and the MobHat shop uses an emerald trading icon rather than an unresolved player head.

The first discovery is saved before side effects, counts once for that player and once for the community, awards configured points, and gives a private celebration. The title uses configurable fade/stay timing and remains fully visible for 60 ticks (three seconds) by default. Completing the last coconut assigned to a wave produces a distinct completion title, chat guidance to check `/coconut rewards`, and the current Coconut Point balance. Repeated clicks only show a cooldown-protected `Already found` response. Future-wave coconuts remain locked until their configured day.

Clicking a locked reward or unavailable shop offer sends one short chat line. Hovering that line shows the exact reward/offer name and a specific reason such as remaining finds, required streak, community target, personal contribution, or incomplete perfect-reward checks.

Found coconuts are permanent for the edition and are never spent. Coconut Points are the spendable value.

## Event And World Rules

Runtime and debug defaults in `config.yml` are intentionally conservative:

```yaml
enabled: true
debug:
  enabled: false
  allow-any-world: true
  expected-coconuts: 15
  date-override: ''
  day-override: 0
  execute-reward-commands: false
worlds:
  allow-info-gui-outside-production: true
```

The live Summer rules belong to `events.yml` so each annual edition is isolated:

```yaml
events:
  summer_2026:
    theme: coconut
    reward-profile: legacy
    timezone: Europe/Amsterdam
    worlds:
      production: [summer]
      reward-claim: [general, wild, cave, acid, skyblock, skygrid, oneblock]
    points:
      teamwork:
        enabled: true
        radius: 12.0
        bonus: 1
        cooldown-seconds: 120
        daily-cap: 10
    visit:
      commands:
        - cmi warp summer {player}
```

Older flat `worlds`, `time`, `points`, `social`, `community`, `visit`, setup-texture, and visual values remain accepted as one-time Summer migration defaults. New runtime edits belong in `events.yml` for edition mechanics and worlds, or `themes.yml` for Coconut presentation, textures, messages, and visuals.

With debug disabled, placement, registration, discovery, proximity visuals, and event gameplay only work in `summer` and inside enabled event cuboids. With no cuboid enabled, the complete production world is valid. Information pages can open in other worlds, while claims and shop purchases are limited to the configured reward worlds.

With debug enabled and `allow-any-world: true`, staff can test gameplay in any loaded test-server world. Debug uses the effective event id `debug_<source-event>` and therefore has a separate coconut registry, snapshot, player progress, community totals, and lifecycle keys. Debug-placed heads cannot alter the production `summer_2026` setup. Configured reward commands remain suppressed unless `debug.execute-reward-commands` is deliberately enabled.

Debug is deliberately convenient: if both date and day overrides are off, it behaves as an active event on day 1 regardless of the real calendar. `debug.expected-coconuts` defaults to `15`, so a small setup can pass validation and create a real immutable debug snapshot. Collection rewards above the debug total are hidden as unreachable; with 15 heads, the 5- and 10-find collection milestones remain available. `/coconut admin expected <count|production>` changes that debug-only total in game. `production` stores zero and makes debug use the source event's full expected count again. None of these settings changes the production event definition.

## Sample Event Dates

The generated `events.yml` contains a valid example, not final live dates:

```yaml
events:
  summer_2026:
    start-date: '2026-07-20'
    end-date: '2026-07-26'
    claim-deadline: '2026-08-02'
```

These are **sample dates only**. Set the real production start, inclusive end, and inclusive claim deadline before creating the live snapshot. The event clock uses `Europe/Amsterdam` by default and never hardcodes 2026 dates in Java.

## Quick Admin Test: 15 Coconuts

Use this exact first-test sequence on the test server:

```text
/coconut admin debug true
/coconut admin expected 15
/coconut admin status
/coconut admin coconut give 15 0
```

The command gives 15 setup heads backed by CoconutHunt's five bundled coconut skins. You do **not** type an id, world, coordinates, or other details for each one. Place every head as a block. Each placement independently chooses a random skin and writes that persistent texture variant together with a unique UUID, the debug event id, world, coordinates, optional region, unlock day, and placement time into the block PDC and `coconuts.yml` registry. Using unlock day `0` leaves them ready for automatic wave assignment. Reloads and chunk refreshes reapply the saved variant rather than reshuffling existing coconuts; older registry entries receive a stable mixed assignment once during migration.

After placing all 15:

```text
/coconut admin coconut waves auto 7 2026
/coconut admin coconut validate
/coconut admin event validate
/coconut admin event snapshot
```

`waves auto` distributes only the unassigned heads across seven deterministic cumulative waves. Both validation commands must report no issues. The snapshot command locks the tested denominator and wave membership. Because debug is active on day 1 by default, the lifecycle may already create the same clean snapshot after validation succeeds; in that case the explicit command safely reports that it kept the existing immutable snapshot.

You can immediately right-click a day-1 coconut with the **same admin account** that placed it. An alt is not required for normal discovery, GUI, point, milestone, claim, reset, or persistence testing. Admin permissions do not make the account ineligible, and the normal player permissions default to true. Use a second account only to test independent per-player finds, two-player community counting, nearby-player social bonus points, or other genuinely multiplayer behavior.

Move through event days without waiting:

```text
/coconut admin day 2
/coconut admin day 7
/coconut admin day off
/coconut admin date 2026-07-28
/coconut admin date off
```

An explicit day tests that active wave. An explicit date can test upcoming, active, claiming, and closed phases. Turning both overrides off returns debug to its automatic active day-1 state.

### Reset Test Data

Preview and reset only one player's current debug record:

```text
/coconut admin reset player mrfloris --dry-run
/coconut admin reset player mrfloris --confirm
```

Add an event id before the flag to target a specific edition, for example `debug_summer_2026` or `summer_2026`. A player reset removes only that player's selected CoconutHunt edition. It preserves every other player, community and snapshot state, the coconut registry, all event/reward configuration, and unrelated shared playerdata.

Preview and restart the complete isolated debug event:

```text
/coconut admin reset event --dry-run
/coconut admin reset event --confirm
```

The event-wide form is intentionally available only while debug mode is enabled. It removes all players' current debug-edition progress plus that debug snapshot, community totals, and lifecycle receipts. It preserves `config.yml`, `events.yml`, `rewards.yml`, all registered debug heads in `coconuts.yml`, every production record, and every unrelated shared playerdata section. If the preserved 15-head registry still validates, CoconutHunt immediately recreates a clean active debug snapshot so testing can restart without placing the heads again. There is no production-wide reset command.

## Production Staff Setup

1. Set the approved live dates and edition mechanics under `events.summer_2026`, then run `/coconut admin debug false`.
2. Keep the five bundled skins under `themes.coconut.head.texture-values` in `themes.yml`, or replace that list with Mojang texture URLs/base64 values. Invalid entries are skipped, each placement chooses from the valid pool, and the selected variant is saved permanently. Existing flat setup-texture values are migrated as Summer defaults.
3. Configure and enable a beach cuboid if the whole `summer` world should not be valid.
4. Give stacked setup heads with `/coconut admin coconut give [amount] [unlock-day]`.
5. Place heads in valid locations. Every placed block receives a random saved coconut-skin variant, new stable UUID, PDC identity, registry entry, and timestamp.
6. Convert an existing player head by looking at it and using `/coconut admin coconut register [unlock-day]`.
7. Leave heads unassigned with day `0`, then run `/coconut admin coconut waves auto 7 2026`. Explicit day assignments are preserved.
8. Run `/coconut admin coconut validate` and resolve every issue.
9. Confirm validation reports exactly `200` enabled coconuts with valid ids, unique locations, loaded worlds, skull/PDC state, zones, and unlock days.
10. Run `/coconut admin event validate` to preflight the world lists, milestone/reward alignment, every hook/reward/shop/visit command template, and the complete coconut registry.
11. Inspect `/hunt admin event status summer_2026`, then run `/hunt admin event activate summer_2026 --dry-run`.
12. Activate with `/hunt admin event activate summer_2026 --confirm`. Activation creates or verifies the immutable snapshot, preserves the previously selected event, and writes an audit record. A genuinely live switch requires `--force-confirm`.

`waves auto` is deterministic for the same registry and seed and distributes only unassigned coconuts approximately evenly. Coconuts assigned to day 3 unlock on day 3 and remain available through day 7.

Registered coconuts are protected from unauthorized breaking, support-block changes, pistons, explosions, fluids, and physics. Once a snapshot exists, authorized setup changes are also blocked through the claim deadline so a pre-event snapshot cannot drift before opening day.

## Immutable Snapshot Corrections

The event denominator, wave membership, and perfect-completion requirement use the persisted snapshot, not the mutable setup registry. Normal edits cannot silently change a live event.

For a genuine emergency during an active event:

```text
/coconut admin event force-mutation --confirm
```

This opens the short correction window configured by `activation.force-confirm-window-seconds`. Correct the registry, run validation, and then use:

```text
/coconut admin event snapshot --force-confirm
```

Replacement is refused unless validation is clean. The force window must still be open and closes after the replacement. This procedure changes the live eligibility contract and should be reserved for staff-approved emergency repairs.

## Rewards And Perfect Completion

Collection and streak rewards are earned separately and remain claimable from event start through the claim deadline. Shop purchases use the same active/claim-window boundary. Community rewards require both the configured global threshold and the configured minimum personal contribution.

The perfect 2026 reward requires all of the following:

- every coconut id in the immutable snapshot was found
- valid participation occurred on every configured event date
- every required collection milestone was earned
- every required streak milestone was earned
- all required personal collection and streak rewards were claimed first
- the perfect reward was not already claimed

`Claim all` processes normal eligible rewards before the perfect reward. The default perfect command is:

```text
cmi kit coconut_reward_box_2026 {player} -s
```

Confirm that this CMI kit exists before launch. Community success is not part of personal perfect eligibility.

## Coconut Points And MobHat

The default point sources are first finds, collection claims, streak claims, qualifying community claims, perfect completion, and capped social-search bonuses. A nearby participant never receives shared coconut credit; each player must click and discover the coconut independently.

The default shop examples are Rabbit, Armadillo, Frog, and Turtle MobHat permissions. Every offer has a stable id, icon, lore, minimum lifetime finds, point price, one-time/repeatable rule, MobHat type, and a list of commands. Found count is only an eligibility gate. Purchases deduct Coconut Points, never found progress.

Before purchase, CoconutHunt rechecks the player's balance, found count, prior purchase id, existing permission, MobHat/LuckPerms availability, and the complete command allowlist. The purchase id and point charge are saved before commands run. If command dispatch then fails, the purchase remains recorded to prevent duplication; staff can correct delivery without charging again:

```text
/coconut admin shop regrant <online-player> <offer-id>
```

If MobHat or LuckPerms is unavailable, the hunt and all non-shop pages remain functional and the shop shows an unavailable state.

## Commands

Player commands:

```text
/coconut
/coconut info
/coconut progress
/coconut help
/coconut milestones
/coconut streak
/coconut community
/coconut rewards
/coconut points
/coconut shop
/coconut claim <reward-id|all> [event-id]
/coconut history [event-id]
```

### Player Command Reference

| Command | What It Does | Example |
| --- | --- | --- |
| `/coconut` | Opens the six-row Coconut Hunt overview. | `/coconut` |
| `/coconut info` | Shows the event introduction, current state, and documentation URL. | `/coconut info` |
| `/coconut progress` | Opens personal found totals and cumulative wave progress. | `/coconut progress` |
| `/coconut help` | Opens the player help GUI with the clickable documentation action. | `/coconut help` |
| `/coconut milestones` | Opens personal coconut collection milestones and reward states. | `/coconut milestones` |
| `/coconut streak` | Opens the seven-day participation calendar and streak totals. | `/coconut streak` |
| `/coconut community` | Opens community totals, goals, rewards, and personal contribution. | `/coconut community` |
| `/coconut rewards` | Opens all collection, streak, community, and perfect reward states. | `/coconut rewards` |
| `/coconut points` | Opens Coconut Point balance, earned/spent totals, and earning history. | `/coconut points` |
| `/coconut shop` | Opens the confirmation-gated MobHat cosmetic shop. | `/coconut shop` |
| `/coconut claim all` | Claims every currently eligible reward in the correct dependency order. | `/coconut claim all` |
| `/coconut history [event-id]` | Lists configured Coconut editions or opens one exact historical edition. | `/coconut history summer_2026` |

Players normally claim one selected reward from its GUI button. The direct form is `/coconut claim <reward-id|all> [event-id]`; the optional event id keeps old-edition claims bound to that edition's own snapshot, claim deadline, reward worlds, and claim records.

Staff commands:

```text
/coconut admin reload
/coconut admin status
/coconut admin debug <true|false>
/coconut admin expected <count|production>
/coconut admin day <1-7|off>
/coconut admin date <yyyy-mm-dd|off>
/coconut admin event validate
/coconut admin event snapshot [--force-confirm]
/coconut admin event start
/coconut admin event end
/coconut admin event force-mutation --confirm
/coconut admin coconut give [amount] [unlock-day]
/coconut admin coconut register [unlock-day]
/coconut admin coconut inspect
/coconut admin coconut enable
/coconut admin coconut disable
/coconut admin coconut remove
/coconut admin coconut list [page]
/coconut admin coconut validate
/coconut admin coconut waves auto [days] [seed]
/coconut admin inspect <player>
/coconut admin reset player <player> [event-id] --dry-run
/coconut admin reset player <player> [event-id] --confirm
/coconut admin reset event --dry-run
/coconut admin reset event --confirm
/coconut admin report [event-id]
/coconut admin shop regrant <online-player> <offer-id>
/hunt admin event list
/hunt admin event status <event-id>
/hunt admin event activate <event-id> --dry-run
/hunt admin event activate <event-id> <--confirm|--force-confirm>
```

Admin player resolution uses the shared safe cached/online resolver. Every reset requires an explicit dry-run or confirmation. The complete event reset is debug-only and preserves configuration and setup; production has only the guarded per-player form. Event start/end hooks and each daily wave hook use durable at-most-once keys, including catch-up after restart.

## Examples

```text
/coconut
/coconut progress
/coconut streak
/coconut community
/coconut rewards
/coconut claim all
/coconut points
/coconut shop
/coconut help
```

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `onembcmi.CoconutHunt.use` | true | Open the overview and information. |
| `onembcmi.CoconutHunt.progress` | true | View progress, milestones, streak, community, and points. |
| `onembcmi.CoconutHunt.rewards` | true | View the reward pages. |
| `onembcmi.CoconutHunt.claim` | true | Claim eligible rewards in allowed worlds. |
| `onembcmi.CoconutHunt.shop` | true | Use the Coconut Points shop. |
| `onembcmi.CoconutHunt.admin` | false | Parent for every CoconutHunt admin permission and status. |
| `onembcmi.CoconutHunt.admin.reload` | false | Reload all CoconutHunt files and runtime caches. |
| `onembcmi.CoconutHunt.admin.debug` | false | Toggle debug and set its expected count or date/day overrides. |
| `onembcmi.CoconutHunt.admin.event` | false | Validate and manage lifecycle/snapshots. |
| `onembcmi.CoconutHunt.admin.coconut` | false | Manage setup heads, registry entries, and waves. |
| `onembcmi.CoconutHunt.admin.inspect` | false | Inspect players and regrant recorded shop purchases. |
| `onembcmi.CoconutHunt.admin.reset` | false | Dry-run or confirm a player reset or isolated debug-event reset. |
| `onembcmi.CoconutHunt.admin.report` | false | Write event reports. |
| `onembcmi.Hunt.admin.event` | false | List, preflight, and activate production editions with `/hunt`. |

Admin permissions default false, including for operators. Individual child permissions work without requiring the parent node.
Direct server console is trusted for non-player admin commands; player-only GUI, setup-item, targeted-block, discovery, claim, and purchase actions still require an in-game player.

## PlaceholderAPI

```text
%onembcmi_CoconutHunt.enabled%
%onembcmi_CoconutHunt.event.id%
%onembcmi_CoconutHunt.event.state%
%onembcmi_CoconutHunt.event.day%
%onembcmi_CoconutHunt.event.days_total%
%onembcmi_CoconutHunt.event.time_remaining%
%onembcmi_CoconutHunt.coconuts.registered%
%onembcmi_CoconutHunt.coconuts.expected%
%onembcmi_CoconutHunt.coconuts.available%
%onembcmi_CoconutHunt.player.found%
%onembcmi_CoconutHunt.player.total%
%onembcmi_CoconutHunt.player.percent%
%onembcmi_CoconutHunt.player.remaining%
%onembcmi_CoconutHunt.player.today%
%onembcmi_CoconutHunt.player.streak.current%
%onembcmi_CoconutHunt.player.streak.best%
%onembcmi_CoconutHunt.player.points%
%onembcmi_CoconutHunt.player.claimable%
%onembcmi_CoconutHunt.player.perfect_eligible%
%onembcmi_CoconutHunt.community.total%
%onembcmi_CoconutHunt.community.today%
%onembcmi_CoconutHunt.community.target%
%onembcmi_CoconutHunt.community.percent%
%onembcmi_CoconutHunt.community.player_contribution%
%onembcmi_CoconutHunt.runtime.hologram_provider%
```

Reads use loaded cached profile, snapshot, and community state and do not claim rewards, mutate progress, or dispatch commands.

## Files And Storage

```text
plugins/1MB-CMIAPI/CoconutHunt/config.yml
plugins/1MB-CMIAPI/CoconutHunt/themes.yml
plugins/1MB-CMIAPI/CoconutHunt/events.yml
plugins/1MB-CMIAPI/CoconutHunt/rewards.yml
plugins/1MB-CMIAPI/CoconutHunt/coconuts.yml
plugins/1MB-CMIAPI/CoconutHunt/state.yml
plugins/1MB-CMIAPI/CoconutHunt/reports/
```

- `config.yml` controls plugin/runtime switches, debug isolation, persistence, GUI behavior, and guarded activation timing; its old flat Summer values remain migration inputs.
- `themes.yml` contains Coconut and Ghost terminology, icons, head texture pools, messages, documentation links, visuals, effects, and optional chain rules.
- `events.yml` contains reusable edition dates, themes, reward profiles, worlds, point/teamwork rules, expected count, waves, milestones, optional cuboids, visit commands, and announcements.
- `rewards.yml` contains per-profile reward tracks, point bonuses, command hooks, security prefixes, perfect rewards, and shop offers.
- `coconuts.yml` keeps its legacy name and stores stable themed collectible ids, positions, event/theme, texture variant, zone, unlock day, enabled state, and timestamps.
- `state.yml` stores immutable snapshots, unique community discoveries, daily totals/goals, lifecycle hook keys, selected production event, and activation audit records.

Both registry and global-state files use atomic replacement writes. Registry schema 3 and state/event/reward/theme/player schema 2 migrations require deterministic, idempotent `*.pre-schema-<target>-from-<source>.bak` backups before older data is rewritten; migration is refused if a required backup cannot be created. A lifecycle hook is dispatched only after its at-most-once key has been durably written. Player discovery, claims, and purchases persist their player record before command side effects.

Player state is kept in the shared store:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

The plugin-scoped key is `coconuthunt`, with separate edition entries for production and debug events. Each first discovery stores its coconut id, event date/day, world, and timestamp; reward records keep both earned and claimed timestamps. Point-source totals, streak dates, purchase ids, completion times, and participation start/end times remain part of the same edition record. Shared cleanup remains compatible with:

```text
/1mbcmi debug clean playerdata plugin CoconutHunt --dry-run
```

## Command Hooks

Every hook is a list of zero or more commands:

```text
global-event-start
global-event-end
daily-wave-unlock
player-participation-start
first-discovery
collection-milestone-claim
streak-milestone-claim
community-milestone-claim
collection-completion
player-participation-end
perfect-completion-claim
mobhat-shop-purchase
```

`daily-wave-unlock` runs only while the event's `announcements.enabled` setting is true. Global start/end hooks remain lifecycle hooks and are unaffected by that announcement switch.

Available replacements include:

```text
{player} {uuid} {event} {edition} {date} {day}
{coconut_id} {found} {total} {points_earned} {points_balance}
{milestone} {streak} {community_total} {community_milestone} {mob_type}
```

Commands come only from configuration, have leading slashes stripped, reject line breaks and unsafe replacements, and must match `command-security.allowed-prefixes`. The complete command list is validated before a claim or purchase is persisted, so one disallowed command rejects the whole action. Once a valid claim or purchase is durably saved, later console-dispatch failure does not roll it back or retry automatically because that could duplicate earlier commands. The failure is logged for staff support; shop deliveries can use the recorded-purchase regrant command.

## Holograms And Effects

`visuals.holograms.provider: AUTO` uses private Paper TextDisplay entities. This is the reliable default on Paper 26.2 and avoids the CMI transient adapter silently accepting a hologram without visibly rendering it. Set the provider to `CMI` only when deliberately testing that adapter; a CMI exception still falls back to Paper.

Holograms are private to each player, show only for nearby snapshot coconuts, and use the compact prefix `☀` icon: gold is not found and green is found. They are capped by `visuals.max-holograms-per-player` (five by default) to avoid visual clutter. Green spotting particles show only on unlocked, not-yet-found coconuts. The selected provider appears in `/coconut admin status`, `%onembcmi_CoconutHunt.runtime.hologram_provider%`, and `/1mbcmi debug plugin CoconutHunt all`.

Nearby checks use the registry's chunk index rather than scanning all 200 coconuts for every player. Holograms and displays are cleaned on quit, teleport/world change, chunk unload, reload, event end, and plugin disable. Spotting, discovery, already-found, and locked sound keys and pitches are independently configurable and clamped at runtime. Discovery title settings are `visuals.titles.enabled`, `fade-in-ticks`, `stay-ticks`, and `fade-out-ticks`; 20 ticks equal one second.

## Runtime Metadata

```text
/1mbcmi debug plugin CoconutHunt all
```

The shared report includes commands, granular permissions, placeholders, config/data/cache paths, optional hooks, runtime health, and the active hologram provider. CoconutHunt targets Java 25 and Paper 26.2 beta build 60 or newer.

## Build And Integrations

Build 535 produces:

```text
1MB-CMIAPI-CoconutHunt-v1.0.0-535-j25-26.2.jar
```

CMI, CMILib, and `1MB-CMIAPI-Lib` are required runtime dependencies. CoconutHunt uses the shared library for feature registration, translated messages, hardened GUI sessions, safe player resolution, documentation metadata, PlaceholderAPI registration, and shared playerdata. It uses the installed CMI runtime for configured kit/warp/broadcast commands; private Paper TextDisplays provide the default proximity holograms. CMILib remains part of the common runtime baseline.

Modern Paper 26.2 APIs provide player-head profile data, PDC identity, skull tile updates, Adventure text, particles, sounds, displays, scheduler/listener behavior, and entity/material validation. PlaceholderAPI, LuckPerms, Vault, and MobHat are optional hooks; LuckPerms plus MobHat enable the default cosmetic shop, while the rest of the event stays available if optional integrations are absent. No paid/private dependency jar is bundled in the feature jar.

## Launch Preflight

- [ ] Replace every sample event date with the approved live schedule.
- [ ] Confirm Paper 26.2 beta build 60 or newer, Java 25, CMI, CMILib, and 1MB-CMIAPI-Lib are enabled.
- [ ] Confirm the production world is exactly `summer` and optional cuboids match the beach.
- [ ] Confirm reward worlds include every game mode where delivery is intended.
- [ ] Review every command allowlist, hook, reward command, visit command, and shop permission.
- [ ] Confirm `coconut_reward_box_2026` exists and is safe to grant once.
- [ ] Confirm MobHat and LuckPerms are available or deliberately leave the shop unavailable.
- [ ] Run coconut validation and require zero issues with exactly 200 enabled heads.
- [ ] Run `/coconut admin event validate` and require zero config, command-template, reward, world, or registry issues.
- [ ] Review `/hunt admin event status summer_2026`, run the activation dry-run, and confirm the selected event/audit after activation.
- [ ] Review deterministic wave counts and spot-check explicit assignments.
- [ ] Complete a 15-head isolated debug run and verify the player and full debug-event reset dry-runs before confirming either one.
- [ ] Create and record the immutable production snapshot before announcing the event.
- [ ] Keep debug reward commands off and reset disposable debug profiles after testing.
- [ ] Test all seven day/date overrides, claims, restart persistence, two-player discovery, visuals, and event end with real players.
