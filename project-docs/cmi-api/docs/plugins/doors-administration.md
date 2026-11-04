# Door Hunt administration (shared Hunt module)

This runbook preserves the complete clean-room v3 operations contract. Door Hunt now runs inside the single public `1MB-CMIAPI-EventHunts` feature JAR with `1MB-CMIAPI-Lib`; it is not installed as a second JavaPlugin. Its compatibility target data remains `plugins/1MB-CMIAPI/CoconutHunt/Doors/`. The path `plugins/OneMBTrickOrTreatDoors/` is the untouched standalone import/rollback source only; all ordinary configuration paths in this guide refer to the combined target. Never activate the standalone and combined implementations together.

Use `scripts/gradle-oracle.sh :plugins:player-fun:coconuthunt:test` for focused verification and `scripts/build-all.sh` for a complete numbered local test build while the maintained Paper server is stopped. The compatibility command and permission catalogue below remains intentionally complete.

# Staff technical guide

This is the authoritative build, installation, configuration, command, and
operations guide for the clean-room `OneMBTrickOrTreatDoors` v3 behavior now hosted by Door Hunt on 1MoreBlock. Keep this file
with the private repository because it contains operational details about the
Halloween world and door data.

## Platform and dependencies

- Target server/API: Paper 26.3 STABLE; `gradle.properties` records the exact selected build and API.
- Compile target: Java 25 bytecode (class-file major version 69).
- Compile with installed Oracle JDK 25 and run automated tests/Paper with
  installed Oracle JDK 27. The canonical wrappers discover and validate the
  installed patch versions on each invocation.
- CMI and CMILib: operationally required for the actual console kit commands
  used by saved treats, automatic candy and milestone claims, and for immediate
  trick commands. Reward kits contain items only.
- LuckPerms is not required for new Doors reward claims. Historical permission
  unlock records remain migration evidence; already granted permissions are
  not automatically revoked.
- PlaceholderAPI 2.12.3 or newer: optional; required only when another plugin
  or staff tool consumes `%totdoors_*%` placeholders.
- The plugin uses supported Paper/Bukkit APIs and has no NMS dependency.

Paper 26.3 is the current compile/API baseline. The runtime health check accepts
the exact target, reports a different build or newer release as a warning, and
fails when Paper is older than the configured target. Supported door materials and
effects are resolved through Paper registries and generic `Door` block data, so
new variants do not require a hard-coded material list. A newer minor still
needs the compatibility checklist in `docs/TESTING.md` before live staging.

The plugin can start without CMI, LuckPerms, or PlaceholderAPI. Keep all
special rewards disabled when their provider is absent. Do not run the random
reward catalogue live without CMI: treat earning fails closed unless its exact
item-only CMI kit is ready, while immediate tricks still require their command
provider.

## Build from source

Build from the CMI-API repository root with the maintained JDK available to Gradle:

```sh
scripts/gradle-oracle.sh :plugins:player-fun:coconuthunt:test
# Stop servers/Paper-26.3 cleanly before the complete build:
scripts/build-all.sh
```

The focused command runs the Coconut/Ghost/Door suite. The complete workflow
reserves one suite build number, checks the latest STABLE Paper 26.3 build,
aligns the API, runs `gradle clean refreshBuildDocs build` and the full repository
gate, then synchronizes every managed suite artifact to the stopped local server.
The centrally numbered host artifact has this form:

```text
build/libs/1MB-Lib-EventHunts-v1.0.4-NNN-j25-26.3.jar
```

Older migration notes refer to `1MB-Lib-EventHunts-v1.0.3-NNN-j25-26.2.jar`;
that is the retained historical artifact format, not the current build target.

Before installing a build, verify its embedded plugin and manifest information:

```sh
unzip -p build/libs/1MB-Lib-EventHunts-v1.0.4-NNN-j25-26.3.jar plugin.yml
unzip -p build/libs/1MB-Lib-EventHunts-v1.0.4-NNN-j25-26.3.jar META-INF/MANIFEST.MF
```

After starting Paper, `/totdoors debug build` displays the same semantic
version, build number, artifact, Java target/runtime, Paper version/build/
channel/API, and actual server version.

Do not copy the standalone build-number mutation into CMI-API. The root
`gradle.properties` build number and generated `BuildConstants` are authoritative. Java
compilation uses `-Xlint:all -Werror`, so a deprecated or otherwise warning-
producing API call fails the build instead of silently entering a release.

## Fresh installation

1. Stop Paper cleanly. Never install, remove, or replace this plugin with a
   hot-reload manager.
2. Back up the Halloween world, `plugins/OneMBTrickOrTreatDoors/`, the shared Hunt data, CMI kits,
   and the old TrickOrTreatV2 data before changing anything.
3. Remove or archive every active standalone Trick-or-Treat JAR. Exactly one combined
   JAR with Paper identity `1MB-CMIAPI-EventHunts` may remain active in `plugins/`.
4. Run `gradle planProjectJarSync`, then use the stopped-server `gradle syncBuiltJarsToProjectServer` workflow, which safely replaces the legacy `1MB-CMIAPI-*` and current `1MB-Lib-*` artifact families as one managed set.
5. Copy the complete authoritative standalone data to `plugins/OneMBTrickOrTreatDoors/`, then run `/doors admin migrate standalone --dry-run` and `/doors admin migrate standalone --confirm` while `modules.doors.enabled` remains false.
6. Copy `data/v3-migration/CMI/Kits/halloween.yml` to
   `plugins/CMI/Kits/halloween.yml`. Confirm the kits `tot01` through `tot36`
   exist before allowing rewards. Keep ordinary player kit access disabled.
7. Install CMI/CMILib and the reviewed candy/milestone kit files. Install
   PlaceholderAPI when placeholders are wanted.
8. Start the exact Paper target with the intended Java runtime.
9. Enable Door Hunt deliberately with `/hunt admin module doors on`, then confirm startup reports the expected build, 60 doors, 36 treats, 10 tricks, and no failed health checks.
10. Run the post-install checks below before opening the event.

The 60-door migration retains door IDs, lower-block coordinates, world name,
and registered side. It receives stable default keys such as `door-1` and
format-2 metadata when first saved. Old v2.5 player-name interactions are
deliberately not imported; v3 starts UUID-based player progress cleanly.

## Upgrade an existing v3 installation

1. Stop Paper cleanly.
2. Back up `plugins/1MB-CMIAPI/CoconutHunt/Doors/`, shared playerdata, the standalone rollback source, and the active combined JAR.
3. Move any standalone Doors JAR to `plugins-disabled/`; do not leave two implementations active.
4. Synchronize the combined Hunt JAR without deleting either data folder.
5. Start Paper and run `/totdoors debug health`, `/totdoors debug build`, and
   `/totdoors admin status`.
6. Review new keys/files in `config.yml`, `progression.yml`,
   `special-rewards.yml`, and `translations/locale_en.yml`, then run
   `/totdoors admin reload` after edits.

Missing bundled configuration and locale keys are added during an upgrade
without replacing existing customized values. A narrowly versioned migration
may replace an exact old bundled default. Build 004 updates the unchanged
MiniMessage prefix, and build 005 also updates the exact old CMI prefix embedded
in reward commands, from `1MB Halloween »` to the bracketed prefix. Build 006
updates the exact build-004/005 `[☠ Halloween]` default to the family-friendly
`[🎃 Halloween]` prefix. Custom prefixes and the rest of each reward command
remain untouched. The current release also upgrades exact, unchanged build-007
English help, onboarding, setup, and reward-status defaults to the player-first
`/doors` wording. Exact intermediate private-beta defaults through build 011
are covered too. These migrations compare against bundled versioned snapshots,
so any staff-customized phrase remains untouched; future releases can add
another snapshot without weakening that rule.
The Treat Bag upgrade also replaces the exact unchanged bundled treat message
and reduces the exact old announcement/kit/sound treat batch to its single
CMI-kit payload. Customized treat command lists are not rewritten and must
satisfy the new one-kit-only validation before Door Hunt can load.
The Treat Bag command update replaces exact old bundled treat and saved-candy
messages with clear saved-reward guidance and a clickable `/doors treatbag`
action. It also updates the unchanged player help to list the direct command
alongside the broader `/doors rewards` hub. Customized messages remain untouched.
Existing `treat-bag.allowed-worlds` values are ignored.

## Paper minor-version upgrade policy

A build may remain loadable on a compatible newer Paper minor, but a health
warning is intentionally not an approval for live use. For the next Paper minor:

1. Read the live Paper documentation index at
   <https://docs.papermc.io/llms.txt>, the relevant official pages, the roadmap
   and deprecations, and the exact-version API Javadocs at
   <https://jd.papermc.io/paper/>.
2. Run the existing artifact on a disposable copied-world server first.
   `/totdoors debug health` should identify the runtime as newer and require
   the documented smoke test; an older-than-target runtime is a hard failure.
3. Run every item in the future-minor checklist in `docs/TESTING.md`, including
   dynamic door-material discovery, all configured sounds/particles, event
   cancellation/protection, async persistence, commands, aliases, placeholders,
   CMI kit command delivery, and clean shutdown.
4. If the old artifact passes, it may be staged temporarily with the warning
   recorded. Do not rewrite its embedded target metadata or filename.
5. Before declaring a native new target, update the Paper version/build/channel
   variables in `gradle.properties`, compile against that exact API with
   `-Xlint:all -Werror`, review every warning/deprecation, run all tests, build a
   new artifact, and repeat the complete smoke test.

Do not raise `api-version` or rename a JAR merely to silence a target warning.
The metadata must describe the API actually compiled and tested.

## Rollback

Source rollback and live-data rollback are separate operations.

- Git/source rollback point: tag `private-beta-testing-working-26.2-2026` at
  commit `f3f5d10`.
- Feature development branch: `feature/season-stats-quests-setup`.
- Live rollback: stop Paper and restore the archived combined JAR, the matching
  `plugins/1MB-CMIAPI/CoconutHunt/Doors/` migration backup, and affected shared `doorshunt` sections. The untouched standalone folder remains the source-of-truth fallback.

Do not pair build 001-006 with player files upgraded to format version 3 or
with format-2 `doors.yml`. Restoring only the JAR is not a complete rollback
once a newer build has saved player, door, season, or runtime state. Restore a
matching copy of the complete plugin data folder.

## Post-install health check

Run these from console or as an operator:

```text
/totdoors debug build
/totdoors debug health
/totdoors admin status
/totdoors admin doors 1
/totdoors admin schedule show
/totdoors admin season status
/totdoors admin rewards status
```

With PlaceholderAPI installed, verify representative values:

```text
/papi parse --null %totdoors_state%
/papi parse --null %totdoors_door_total%
```

The health report verifies startup readiness, safe runtime controls, random
rewards/pools, door and metadata state, current season/frozen-roster
consistency, progression streams, Java and Paper targets, command registration,
ownership of `/doors`, availability of `/halloween`, dynamically discovered
door materials (including at least all eight Paper 26.2 copper variants),
loaded registered blocks and golden route markers, PlaceholderAPI registration,
external providers inferred from enabled reward command roots, setup-tool PDC
identity, and cached player-persistence status including unresolved `PREPARED`
immediate transactions, `CLAIMING` Treat Bag receipts, and milestone awards.
Ordinary waiting Treat Bag receipts are not health warnings. The check never
force-loads all door chunks or synchronously scans every player file. A missing
Halloween world, player command/route alias, enabled reward pool, or required
provider must be resolved before reward testing.

## Event operation

The effective mode is persisted in `runtime-state.yml`:

- `scheduled`: gameplay follows the start-inclusive, end-exclusive event
  window. Debug can temporarily bypass the calendar for explicitly authorized
  staff testers.
- `active`: gameplay is manually enabled regardless of dates.
- `dormant`: knocking is blocked. Commands stay loaded so staff can inspect and
  reactivate the event, and saved rewards remain claimable within their separate
  deadline. Dormant always wins over debug.

Mode/schedule and season lifecycle are separate gates. Gameplay is allowed
only when the runtime event state is playable **and** the current season is
`open`. Debug bypasses only the scheduled date window; debug does not open a
`draft`, `closed`, or `archived` season. It also does not add doors to a frozen
season roster. Enabling debug does not open the event for ordinary players:
only a player with `totdoors.admin.debug.test` may knock for rewards or use
hints through the out-of-window debug bypass. That player also sees the private
`debug-active` state; everyone else continues to see the real public calendar
state and remains unable to participate.

The claim period is independent of event dates and season lifecycle. Keep the
Doors module enabled after knocking ends so players can use `/doors rewards`
and `/doors treatbag`. Scheduled mode after its end, or event mode `dormant`,
blocks new knocking while preserving eligible claims. Turning off
`modules.doors.enabled`, the shared Hunt feature, or the plugin stops its claim
runtime too; `admin prepare` does not enable player claims.

For Halloween 2026, stop knocking at November 2, 00:00, and allow claims through
all of November 7 with an exclusive November 8, 00:00 cutoff:

```text
/totdoors admin mode scheduled
/totdoors admin schedule end 2026-11-02 00:00
/doors admin rewards expiry show halloween-2026
```

The bundled `claims.initial-expiries.halloween-2026` value is
`2026-11-08T00:00:00+01:00`. It initializes only a season whose claim deadline
has never been stored. Existing deadlines and an explicitly cleared deadline
win on reload/restart. Inspect the displayed result after upgrading; changing
the bootstrap value does not overwrite a season setting. To deliberately set,
extend or remove the deadline:

```text
/doors admin rewards expiry set 2026-11-08 00:00 halloween-2026
/doors admin rewards expiry clear halloween-2026
```

Date/time arguments use `config.yml`'s configured timezone, normally
`Europe/Amsterdam`. The cutoff is exclusive: `00:00` on November 8 includes all
of November 7. Nonexistent or repeated local times during daylight-saving
changes are rejected; choose an unambiguous time. Omit the season to use the
current one. `clear` removes the deadline rather than closing claims. Extending
or clearing an expired cutoff makes retained, unclaimed receipts eligible again;
processed rewards remain closed and cannot be replayed. This deadline covers
saved treats, saved candy and milestone claims, including stale menu clicks and
claims awaiting asynchronous reservation. It does not remove world, permission,
inventory-safety or module-readiness checks. Expiry never deletes reward records.

Typical event preparation:

```text
/totdoors admin mode dormant
/totdoors admin schedule window 2026-10-01 00:00 2026-11-03 23:59
/totdoors admin schedule show
/totdoors debug health
/totdoors admin mode scheduled
```

Temporary out-of-season testing:

```text
/totdoors admin mode scheduled
/totdoors debug on
/totdoors admin status
```

The testing player needs `totdoors.admin.debug.test`; operators receive it
through `totdoors.admin`. The separate `totdoors.admin.debug.toggle` permission
controls the global switch, while `totdoors.admin.debug.view` controls reports.

Return to normal scheduling:

```text
/totdoors debug off
/totdoors admin mode scheduled
```

Emergency pause without unloading the plugin:

```text
/totdoors admin mode dormant
```

Remove runtime date overrides and return to `config.yml` dates:

```text
/totdoors admin schedule reset
```

## Prepare staff tools while Doors stays off

The Event Hunts host must be running, but Door Hunt may remain disabled with
`modules.doors.enabled=false`. Other modules, including Halloween Virus, keep
their own switches. Prepare the Door data explicitly before inspecting or
repairing a dormant route:

```text
/hunt admin modules
/totdoors admin prepare
```

Wait for the preparation result before running the next command. Preparation
loads the saved Door configuration and registry for location administration
and private inspection; it does not
enable Door Hunt, open a season, change its schedule or enable a debug bypass.
It requires `totdoors.admin.prepare`. If loading fails, correct the reported
configuration or migration problem before trying again.

While the module stays disabled, use door show/list, move/unregister, status,
schedule reports, debug health and the private inspection commands. Existing
season, reward and statistics administration still requires the module to be
active. You do not need to enable it for the physical route check below.

An unresolved standalone import must be completed first. When staff have
deliberately copied the authoritative v3 source to
`plugins/OneMBTrickOrTreatDoors/`, keep Door Hunt disabled and run:

```text
/doors admin migrate standalone --dry-run
/doors admin migrate standalone --confirm
/totdoors admin prepare
```

Review the dry-run result before confirming. These are existing migration
controls, not a reason to copy an unrelated test registry or player ledger to
live. Preparation does not silently import or enable the standalone plugin.
An empty prepared registry needs the correct import or registrations before
there is a door #31 to move.

## Relocate a missing or rebuilt door without losing its identity

A move updates an existing registration and preserves its numeric ID, stable
key and metadata. Existing season progress stays associated with that key;
the move does not create another door, replay rewards or reset daily visits.
The former physical door need not exist. The destination must contain a valid
door and must not overlap another registration. A single registration remains
single; a double registration needs a valid matching double pair.

The optional cardinal direction is the side players stand on to knock, not
the door block's facing. Omitting it preserves the existing registered side.
Coordinate destinations accept a loaded world name and whole block coordinates;
prefer the lower block. Staff can also look at the replacement within 12 blocks
and use the target form:

```text
/totdoors admin door <id|key|target> move target [north|east|south|west]
/totdoors admin door <id|key|target> move <world> <x> <y> <z> [north|east|south|west]
```

Both forms require `totdoors.admin.door.edit`; selecting a target requires a
player. Wait for the successful save message, then inspect the saved result.
The command changes registration data, not world blocks. No manual `doors.yml`
edit or plugin reload is needed after a successful move.

For the rebuilt single `WAXED_WEATHERED_COPPER_DOOR` at Halloween
`1519 71 717`, the retained registered knock side is east. After preparing
the data, inspect #31, move it and verify it:

```text
/totdoors admin door 31 show
/totdoors admin door 31 move halloween 1519 71 717 east
/totdoors admin door 31 show
/totdoors admin inspect on
/totdoors admin teleport 31
```

Then make three empty-main-hand left-clicks from the registered side. Use
`/totdoors admin inspect off` when finished. A location-only repair does not
require a season-roster refresh: the existing stable key keeps its membership
and earned progress, and the historical frozen snapshot is retained.

If the registration should instead be permanently removed, the explicit
unregister alias works even when its old block has already been broken:

```text
/totdoors admin unregister 31
```

It requires `totdoors.admin.delete` and is equivalent to
`/totdoors admin delete 31`. It removes the registration, leaving physical
blocks and historical player data alone. Prefer `move` for a replacement of
the same stop. Unregistering and registering again creates a new identity
that does not inherit the old door's season membership or discoveries.

## Privately inspect every registered door

Use the inspection session for a quiet route check, including while Door Hunt
is disabled, the event is dormant or its season is closed. After preparation,
run these in game as mrfloris or another authorized operator:

```text
/totdoors admin inspect on
/totdoors admin inspect list 1
/totdoors admin inspect status
/totdoors admin inspect next
/totdoors admin inspect off
```

All inspection controls are player-only and require `totdoors.admin.inspect`.
Sessions belong to the player's UUID and expire after 30 minutes, on logout,
reload or module/host shutdown. Running `on` starts a fresh checklist. There
is no username-based exemption: mrfloris uses the same permission checks as
other staff. Operators receive the required permissions by default; coordinate
links and `next` also require `totdoors.admin.teleport`.

The private list shows eight doors per page with their coordinates, checked
or pending state, enabled flag and current-season membership. Click a
coordinate entry to use the normal safe teleport beside that door, or use
`next` to travel to the first unchecked registration. Missing worlds, damaged
doors and unsafe landing space produce an explanation instead of a successful
teleport message. An unavailable teleport can require visiting and repairing
the build manually.

At each door, empty the main hand, close the door if the configured rules
require it, and stand on its registered knock side. Make three left-clicks
within the configured knock window, five seconds by default. The private
`Door #31 works` response marks that registration checked. The inspection
verifies the registered blocks, consistent upper/lower halves, double-door
structure where applicable, required closed state and the knock gesture.
Changed registrations are removed from the session's checked results so they
can be tested again.

Inspection sends messages only to the inspecting player. It does not announce
the session, animate or open doors, play reward effects or sounds, dispatch
trick commands, issue kits, create Treat Bag receipts, consume daily visits,
or change player progression. The player's normal reward-knocking path is
replaced for the duration of the session. Public module, schedule and season
settings remain unchanged.

A successful physical check does not establish event readiness or prove reward
delivery. While the module remains disabled, review `/totdoors admin status`,
`/totdoors admin schedule show` and `/totdoors debug health`. During deliberate
event activation, separately review `/totdoors admin season status`,
`/totdoors admin rewards preflight all` and `/hunt admin preflight doors`;
the existing season/reward commands require an active module. The existing
`/totdoors debug on` enables a calendar bypass for real staff gameplay and can
award rewards; use `admin inspect on` for this quiet route check.

## Season lifecycle and yearly rollover

`seasons.yml` retains yearly seasons independently of the runtime date window.
Exactly one season is current. Its lifecycle is:

`draft` → `open` → `closed` → `archived`

On a genuinely empty installation, the initial season is created as a draft so
staff can register and describe the route before opening it. When an existing
door registry is migrated without a `seasons.yml`, the compatibility season is
created open with those enabled doors frozen into its initial roster.

Opening a draft takes an immutable snapshot of every currently enabled door:
stable door key, then-current numeric ID, display name, district, difficulty,
and block positions. That frozen roster makes historical reports meaningful
even if the live door registry is edited next year. An open season can be
explicitly refreshed, but doing so changes the event denominator and frozen
metadata; take a backup and use the required confirmation deliberately.

Inspect seasons with:

```text
/totdoors admin season status
/totdoors admin season list
```

The normal yearly rollover is:

```text
/totdoors admin mode dormant
/totdoors admin season close confirm
/totdoors admin stats export all
/totdoors admin season archive confirm
/totdoors admin season create halloween-2027 Halloween 2027
/totdoors admin season switch halloween-2027
```

While the new season is a draft, place/register/edit the new route and verify
all enabled doors, districts, hints, difficulties, and reward pools. Then:

```text
/totdoors admin season open
/totdoors admin season status
/totdoors debug health
/totdoors admin mode scheduled
```

Use `/totdoors admin season switch <id>` to inspect or report another retained
season. `/totdoors admin season roster refresh confirm` is only for an open
season after intentional route changes. A newly registered/enabled door is not
playable until it belongs to the current frozen roster; disabling a live door
removes it from current eligibility without rewriting the historical snapshot.

Closing stops gameplay and new season statistics. Archiving is allowed only
after close. Neither `/totdoors debug on` nor manual `active` mode bypasses a
closed season.

## Player behavior

A player's recommended entry point is `/doors` or `/doors info`. It opens a
server-owned Halloween menu with the event window, today's progress, hint and
travel actions, statistics, journal, quests, rewards, seasons, the public guide,
and links to the sibling Coconut and Ghost hunts. Its first action is to use
`/halloween`, find a closed door with a golden
pressure plate in front, then knock three times within five seconds with an
empty main hand. The golden plate is a world-builder's visual route marker;
the plugin does not persist it as separate route data or require it to award a
knock. Health does, however, validate loaded markers against the registered
side so staff can repair a confusing route before opening the event.

A player with `totdoors.play` stands on that registered side of the closed door
and left-clicks it three times with an empty main hand within five seconds. The
plugin prevents damage to the registered door and its support block, verifies
the daily per-door limit, and durably prepares the interaction. Tricks dispatch
their configured commands immediately. Treats save their exact CMI kit variant
as a claim-later Treat Bag receipt instead of filling the player's Halloween-world inventory.
Every successful result also selects one small item-only CMI candy kit from
`hdc01` through `hdc10` for immediate delivery. Its separate `TREAT_BAG` receipt
(`door-candy:hdcXX`) is saved atomically with the main result without incrementing
visits or statistics again. After the main result is durably recorded, only this candy
receipt is automatically claimed, exempt from the manual world list. CMI can
drop overflow beside a full inventory. A disconnect before dispatch leaves the
candy waiting for `/doors treatbag`; the main treat is never automatically
claimed as part of candy delivery. A possibly delivered candy claim closes with
audit evidence and does not replay or block other claims.
Install the bundled candy definitions by copying `config/cmi/kits/HalloweenDoorCandies.yml` to `plugins/CMI/Kits/HalloweenDoorCandies.yml` before starting the server.
Clicking a registered door while holding an item gives a customizable
`empty-hand-required` hint. That reminder is limited to once every five seconds
per player to prevent chat spam; held-item clicks never count as knocks.

By default, a player can complete each currently eligible open-season door once
per Amsterdam calendar day. The `/doors` overview shows successful eligible doors as
`completed / eligible total` without coordinates. `/doors hint` points
toward the nearest unfinished eligible door in the same world using
distance/direction language; it never reveals a door ID or coordinates. The
15-minute hint cooldown is saved in the player's UUID YAML and survives
reconnects/restarts.

When gameplay is unavailable, the overview shows the public event state while
still teaching the future workflow and showing the configured dates. A staff
debug test does not expose a false live state to ordinary players.

## Player statistics, journals, quests, and milestones

All player history is keyed by UUID and season ID. The public player commands
never disclose an undiscovered door's ID, key, coordinates, or staff notes:

```text
/doors stats [season]
/doors journal [season] [page]
/doors quests [stream] [season]
/doors treatbag [season]
/doors rewards [season]
```

`stats` shows successful interactions, unique doors, frozen-roster total,
treats/tricks selected, hints, active days, current/longest streak, completed
districts, earned milestones, and whether imported history is partial.
`journal` lists only doors that player discovered, with their frozen display
name, district, difficulty, and successful-visit count. It deliberately omits
coordinates. `quests` displays enabled progression streams and every milestone
target; one season ID by itself selects that retained season, and the canonical
two-argument form is strictly stream then season. `treatbag` opens the existing
**Your Halloween Treat Bag** page directly for the current or a retained season.
`rewards` remains the broader hub with links to that season's repeatable Treat
Bag and the separate durable milestone-award ledger. Both commands use the
existing `totdoors.command.rewards` permission; no new permission is required.
Every selected treat is one receipt even when the same variant is earned on
multiple days. Disabling or changing a current progression stream does not hide
or relabel an already-earned annual milestone kit.

`progression.yml` defines streams driven by these metrics: unique doors,
successful interactions, treats, tricks, hints, longest streak, completed
districts, and completed milestones in other enabled streams. A named district
is complete after the player discovers every frozen-roster door assigned to
it; `unassigned` is excluded. The bundled `Halloween Quests` stream counts
milestones earned in other enabled streams, rather than arbitrary external
quests. Milestone IDs and targets are stable season data; changing them after
players begin can change future evaluation, so finalize the catalogue before
opening the event. Historical quest calculations necessarily use the currently
loaded stream targets; the earned-reward ledger remains the historical source
of truth.

A milestone in a `unique-doors` stream may use `target: all`. It resolves to
that season's frozen nonempty roster size, so the annual Master of Doors goal
automatically follows 59, 60, 61, or any future route size. `all` is rejected
for other metrics and remains unresolved for an empty draft roster. Existing
untouched `all-sixty-doors.target: 60` defaults migrate to `all` without
renaming the stable milestone/reward IDs; customized numeric targets remain
unchanged.

## Register a single door

1. Place any supported full door block in the intended world. Wood, iron, and
   all Paper 26.2 copper/waxed copper variants are accepted.
2. Close the door.
3. Place a `LIGHT_WEIGHTED_PRESSURE_PLATE` (the golden pressure plate) exactly
   one block in front of the lower door block on the side players should use.
   Confirm it does not leave the door powered open. A double-door registration
   needs a marker in front of at least one of its two lower blocks.
4. Stand on that side. This direction is saved as the registered interaction
   side. The plate is not a gameplay gate, but health validates it when its
   chunk is loaded.
5. Look at either half of the door from no more than eight blocks away.
6. Run `/totdoors admin register`.
7. Note the returned door ID and coordinate.
8. Run `/totdoors admin doors 1`; click the entry to verify its safe teleport.
9. Start `/totdoors admin inspect on`, then perform three empty-hand left-clicks
   from the saved side to check the physical registration privately. End the
   session with `/totdoors admin inspect off`. Test real rewards separately
   after checking event, season and provider readiness.

Coordinate example (must be run by a player; coordinates use the player's
current world):

```text
/totdoors admin register 1661 72 673
```

## Register a double door

The two adjacent doors must be the same material, face the same direction, use
opposite hinges, and form one normal double-door pair.

1. Stand on the intended public side and target either door.
2. Run `/totdoors admin register double`.
3. The plugin must find exactly one matching adjacent partner. If it finds none
   or more than one, correct the blocks and retry.

Explicit coordinate example:

```text
/totdoors admin register double 1700 70 700 1701 70 700
```

Each single or double setup gets one registration ID. For double doors, both
lower blocks map to that ID and count as the same daily interaction.

## Door Setup Tool workflow

The preferred building workflow uses a PDC-identified golden axe. Its visible
name/lore/material are not trusted as identity, and every action still checks
the staff member's permission.

Give it to yourself in game, or name another online player:

```text
/totdoors admin setupitem give [player]
```

With the tool in the main hand:

1. Place a physical door normally.
2. Left-click an unregistered door. The tool detects a valid normal double
   pair automatically; otherwise it registers a single door.
3. Left-click a registered door to inspect its ID, stable key, name, district,
   difficulty, enabled state, and position.
4. Sneak-left-click a registered door to unregister it. The physical blocks
   deliberately remain in place while the YAML save completes.
5. After the success message, sneak-left-click the now-unregistered door again
   to break it normally.

This two-step unregister/break policy prevents a failed asynchronous save from
leaving a destroyed but still-registered door. A normal setup hit uses
`totdoors.admin.register`, inspect uses `totdoors.admin.list`, unregister uses
`totdoors.admin.delete`, and giving the item uses
`totdoors.admin.setupitem.give`.

## Door metadata and route design

Inspect by numeric ID, stable key, or the targeted door:

```text
/totdoors admin door <id|key|target> [show]
```

Edit validated fields with:

```text
/totdoors admin door <id|key|target> set <name|district|hint|difficulty|enabled|reward-pool|notes> <value...>
```

Examples:

```text
/totdoors admin door target set name Pumpkin Bakery
/totdoors admin door target set district village
/totdoors admin door target set hint Follow the smell of cinnamon.
/totdoors admin door target set difficulty easy
/totdoors admin door target set reward-pool family
/totdoors admin door target set notes Verify the upstairs landing before opening.
/totdoors admin door target set enabled false
/totdoors admin door target set hint clear
```

- `key` is generated once (`door-<id>`) and is the permanent identity used by
  seasons/statistics. It is intentionally not editable.
- `name` is shown only after discovery and may contain spaces.
- `district` is a lowercase safe key. A district is complete when all its
  frozen-roster doors have been found; `unassigned` never counts.
- `hint` is an optional coordinate-free clue sent after the normal directional
  hint. `clear` removes it.
- `difficulty` is `easy`, `normal`, `hard`, or `secret`; it is descriptive and
  appears in the discovered-door journal.
- `enabled=false` removes the registration from current gameplay without
  deleting the blocks or historical data.
- `reward-pool` selects a configured random-result pool. The edit is rejected
  if that pool does not exist.
- `notes` is staff-only text included in staff exports; `clear` removes it.

Metadata captured by an open season is frozen. After an intentional open-event
edit, use `/totdoors admin season roster refresh confirm` only when changing
the season denominator/history is acceptable.

## Inspect, teleport to, and remove doors

```text
/totdoors admin doors 1
/totdoors admin teleport 12
/totdoors debug target
/totdoors admin delete 12
```

Door pages contain ten registrations. In-game list entries are clickable and
run the permission-checked teleport command. Teleport asynchronously loads the
chunk and searches for safe feet/head/floor space on the registered side.

Deleting every registration is intentionally separate and requires both the
stronger permission and literal confirmation:

```text
/totdoors admin delete all confirm
```

Back up `doors.yml` before bulk deletion. Deletion removes registrations, not
world blocks.

## Configure category odds

`config.yml` first chooses between treat and trick categories using relative
weights:

```yaml
selection:
  treat-weight: 75
  trick-weight: 25
```

`75` and `25` produce a 75%/25% split. `90` and `10` produce 90%/10%. At least
one category must be positive. Within the chosen category,
`tricks-and-treats.yml` selects an enabled entry by that entry's `weight`.

Manual Treat Bag and milestone claims use `claims.allowed-worlds`:

```yaml
claims:
  allowed-worlds: [end, nether, general, wild, cave, acid, oneblock, chunkblock, skyblock, skygrid]
```

World names are trimmed, normalized to lowercase and matched exactly, without
wildcards or prefixes. An explicit `[]` blocks manual claims everywhere. Missing
settings receive these defaults. The former `treat-bag.allowed-worlds` remains
ignored and never overrides this list. Reload after editing, then test both an
allowed world and `halloween`, which is excluded by default.

This gate covers manual treats, saved candy and milestone prizes. Automatic
`hdc01`-`hdc10` candy at the door is exempt. Survival/Adventure and normal player
permissions are still checked when claiming. The claim menu remains viewable
outside an allowed world, but its action does not consume a waiting reward.

Doors dispatches the actual item-only CMI kit console command, with the claiming
player resolved from the recorded UUID. It does not grant `cmi.kit.*` or insert
kit contents itself. Keep reward templates disabled for ordinary `/kits` access;
console delivery can use them. Set `DropOnGround: true` so CMI can drop overflow
near the player, including near a hopper. No kit cost or internal command is
needed. Each random receipt is independent, so earning the same `totXX` variant
again remains claimable; milestone uniqueness is enforced by Doors per player
and season rather than by granting a reusable kit permission.

## Halloween candy exchange

The optional `/doors trade` exchange accepts **256 individual candy items in
any mixture** from the existing `hdc01` through `hdc10` templates and gives one
`halloweencandytrade` gift. It is independent of door discoveries, Treat Bag
receipts and milestones: it consumes physical candy, not saved treats or
progress. Players open a preview and confirm the displayed price before any
inventory change. The Doors overview also links to this menu.

The limit is **one gift per actual player UUID per configured season**, including
Floodgate UUIDs. Renaming a player, changing worlds, reloading, restarting or
resetting door/progression data does not grant another gift. A new season ID
deliberately creates a separate allowance; do not change the season merely to
reopen the same year's trade.

### Accepted candy and delivery

The exchange compares complete native item metadata against the loaded CMI
`hdc01`–`hdc10` item templates, ignoring only stack amount. This deliberate
legacy bridge accepts the already-issued 2026 candy without rewriting it or
requiring a new PDC field. Ordinary food, anvil-renamed substitutes, changed
lore, different components/PDC and invalid overstacked amounts are rejected.
An identical copy of a legacy item cannot be distinguished from the original;
the exchange does not claim a provenance guarantee that the old items lack.
Keep the ten candy templates unchanged while these existing candies are being
accepted. Editing their identity after distribution can make old candy stop
matching. Items are inspected only in the 36 normal storage/hotbar slots, not
in offhand, armour, ender chests, bundles or nested containers.

The same `claims.allowed-worlds` list applies: `end`, `nether`, `general`,
`wild`, `cave`, `acid`, `oneblock`, `chunkblock`, `skyblock`, and `skygrid` by
default. Players need `totdoors.command.rewards`, Survival or Adventure mode,
an enabled Doors module and open claim period. AutoSell must be off. These
conditions, the original online player session, configured offer, loaded candy
templates and exact inventory snapshot are checked again at confirmation and
before payment. If the inventory or settings change, reopen the menu.

The gift is delivered through the existing verified CMI kit command path.
`config/cmi/kits/HalloweenCandyTrade.yml` is the source of the item-only CMI kit
`halloweencandytrade`. Keep `Enabled: false` so ordinary `/kits` access does not
offer it, and `DropOnGround: true` so CMI drops overflow near the player. It
contains no commands, LuckPerms grants, cost or separate maximum-usage limit;
Doors owns the payment and once-per-season record. There is no free-space
requirement for the gift. Preserve the vanilla use of each item and the
`onembcmi:candy_trade_collectible` / `onembcmi:candy_trade_season` keepsake
identity fields; those fields are not claim receipts.

One successful trade gives one each of:

| Gift title | Item |
| --- | --- |
| Sweet Victory Star | Nether star |
| Heart of Halloween | Heavy core |
| Lantern of the Deep | Conduit |
| Hotel Afterparty Record | Otherside music disc |
| Midnight Masquerade Pattern | Vex armour-trim template |
| One More Treat | Six-page signed book by 1MoreBlock.com Staff |

The book thanks players for the costumes and songs remembered by the
shopkeepers and Halloween Hotel. It has short pages with explicit line breaks;
the source layout is checked against the Minecraft font. Full native kit and
release evidence is recorded in the [candy exchange compatibility report](../compatibility-tests/doors-candy-trade-26.3-2026-11-01.md).

### Configuration and commands

Settings live in `plugins/1MB-CMIAPI/CoconutHunt/Doors/candy-trade.yml`:

```yaml
enabled: true
season: halloween-2026
price: 256
kit: halloweencandytrade
```

The offer is enabled by default but fails closed if its gift kit, candy
templates, season or durable ledger are unavailable. The following commands
save changes and apply them without restarting or requiring another reload:

| Command | Permission | Effect |
| --- | --- | --- |
| `/doors admin trade status` | `totdoors.admin.rewards.view` | Show settings, deadline, claim worlds, preflight issues and trade-record totals. This is also the default for `/doors admin trade`. |
| `/doors admin trade preflight` | `totdoors.admin.rewards.preflight` | Check the ledger, configured season, CMI gift kit and candy templates. |
| `/doors admin trade enable <true\|false>` | `totdoors.admin.rewards.configure` | Open or close the exchange without resetting collected gifts. |
| `/doors admin trade price <amount>` | `totdoors.admin.rewards.configure` | Set an integer price from 1 to 100000. |
| `/doors admin trade kit <kit-id>` | `totdoors.admin.rewards.configure` | Select a safe item-only CMI kit ID; run preflight after changing it. |
| `/doors admin trade season <season-id>` | `totdoors.admin.rewards.configure` | Select an existing season and its separate once-only allowance. |

After a direct YAML edit, use `/doors reload`. Settings changes and reloads
invalidate open confirmations. Reopen the menu to accept the current offer.
After editing the CMI kit file, `/cmi reload` refreshes CMI's template; check
trade preflight and reopen the preview before testing.

There is no second trade-expiry setting. The configured season's reward claim
deadline also closes candy trading. For Halloween 2026, the intended exclusive
deadline is **2026-11-08 00:00 Europe/Amsterdam**: trading is available all day
November 7, and unavailable at the first instant of November 8. Inspect or
change it through the existing reward commands:

```text
/doors admin rewards expiry show halloween-2026
/doors admin rewards expiry set 2026-11-08 00:00 halloween-2026
```

Ending the knocking schedule does not close the exchange. Keep the Doors
module enabled while players use remaining claims/trades. Event debug mode
does not create another trade allowance or bypass the claim deadline.

### Durable records and uncertain delivery

`plugins/1MB-CMIAPI/CoconutHunt/Doors/candy-trades.dat` stores the independent,
atomic, checksummed trade ledger. Each receipt records transaction UUID,
authoritative player UUID, season, exact price/kit, timestamps, consumed slots,
amounts, item fingerprints and the result/audit note. Preserve this file with
its persistence sidecars when backing up or restoring Doors. Do not delete or
roll back only this ledger: doing so can reopen already-processed gifts.

The sequence reserves the trade, persists the debit/payout boundary, removes
the exact confirmed candy and invokes the provider. Verified delivery is
`COMPLETED`. When the provider proves no payout, the exact debited slots can be
restored once; only a verified refund makes that attempt `RETRYABLE`. Other
inventory contents are preserved. A refusal before the effect boundary does
not consume candy.

The owner's policy is **at most one payout attempt when the result is
uncertain**. An ambiguous payout or interrupted `ATTEMPTED`/`REFUNDING` record
becomes `CLOSED` with audit evidence and no automatic payout/refund replay.
The menu treats it as collected and chat supplies a ticket reference. A crash
at this boundary can leave the trade closed even if the player received no
gift; the plugin cannot atomically commit Minecraft inventory and an external
kit command. It does not queue a mandatory staff review or block unrelated
Treat Bag/milestone claims. Staff can investigate a player ticket using the
reference and server audit warning. An interrupted `RESERVED` record, before
any possible debit, becomes retryable. Store corruption fails closed and must
not be worked around by removing the ledger.

### Manual deployment

This feature needs the new compiled JARs once; a YAML reload alone cannot add
the command, GUI or transaction handling. Prepare and verify the full **68-JAR**
managed suite through `scripts/build-all.sh` while the maintained local server
is stopped, complete local Paper/CMI verification, then stage that exact tested
set with `stageTestedJarsForLive`. Do not mix suite build numbers or copy a
single module's development JAR as the release.

For the owner's planned live maintenance window:

1. Back up the live suite and Doors/CMI data, then stop the live server normally.
2. Replace all managed suite JARs with the tested matching build, preserving
   any deliberate active/disabled artifact routing. Do not leave older copies
   beside the new files.
3. Copy `config/cmi/kits/HalloweenCandyTrade.yml` to the live
   `plugins/CMI/Kits/HalloweenCandyTrade.yml`. Existing candy, treat and milestone
   kit files stay in place. The suite-JAR synchronization does not install CMI
   configuration for you.
4. Start the server. New `candy-trade.yml` defaults are created if absent. Check
   `/doors admin trade preflight`, `/doors admin trade status`,
   `/doors admin rewards expiry show halloween-2026`, and `/doors debug health`.
5. Confirm `/doors trade` shows the six gifts and intended cost/deadline, then
   test with accepted candy in an allowed home world. Remember that a
   successful staff trade uses that player's real once-per-season allowance.

The owner performs the live stop, file replacement and start. The development
workflow does not write to or control the live server.

## Configure door animation

The default success effect in `config.yml` is:

```yaml
door-animation:
  open-door: true
  close-after-seconds: 3
  sound: minecraft:block.wooden_door.open
  particle: SOUL_FIRE_FLAME
  particle-count: 18
```

Sounds and particles resolve through the Paper registries rather than deprecated
enum lookup. Prefer namespaced keys for future additions. The exact old bundled
`BLOCK_WOODEN_DOOR_OPEN` and `minecraft:block.wooden.door.open` sound defaults
migrate to `minecraft:block.wooden_door.open`; customized values remain
unchanged. Unknown keys are logged and skipped instead of breaking reward
persistence.

## Add a treat reward

Add a uniquely named entry below `treats:` in
`plugins/1MB-CMIAPI/CoconutHunt/Doors/tricks-and-treats.yml`:

```yaml
treats:
  candy-pouch:
    enabled: true
    display-name: 'A pastel candy pouch'
    weight: 2
    pools: [default, family]
    commands:
      - 'cmi kit halloween_candy <player>'
```

Rules:

- `enabled` defaults to `true` when omitted.
- `weight` must be at least `1`; it is relative to other enabled entries in the
  same category.
- `pools` is an optional nonempty list of lowercase safe keys. When omitted,
  the result belongs to `default`. A door's `reward-pool` metadata chooses
  among results assigned to that pool.
- `display-name` appears in the plugin's selected-reward message.
- A treat `commands` list must contain exactly one `cmi kit <kit> <player>` or
  silent `... -s` template. `<variant>` may supply the kit name.
- Treat kits must exist, contain at least one valid item, and contain no internal
  kit commands or costs. Disabled CMI templates are supported; keep ordinary
  player access disabled and allow CMI overflow with `DropOnGround: true`.
- Extra treat commands are rejected during configuration load. Keep broadcasts,
  teleports, effects, sounds, and other immediate behavior under `tricks:`.
- Test every CMI kit manually with a disposable player before relying on it.

After editing, run:

```text
/totdoors admin reload
/totdoors debug health
```

Reload validates a complete candidate first. If YAML, weights, variants, or
commands are invalid, the previous working configuration remains active.

## Add a variant-based treat pool

Use `variants` when multiple results share the same command template:

```yaml
treats:
  seasonal-kits:
    enabled: true
    display-name: 'A Halloween treat'
    weight: 1
    variants:
      - tot01
      - tot02
      - tot03
    commands:
      - 'cmi kit <variant> <player>'
```

Each nonblank variant expands into a separately selectable result carrying the
entry's weight. The bundled catalogue uses this form for `tot01` through
`tot36`. Keep internal kit IDs in command templates rather than the display
name so players receive a friendly result instead of seeing `tot01`.

Variants and reward pools are different: variants generate multiple concrete
results from one template; `pools` groups concrete results for selected doors.

## Add a trick reward

Add a uniquely named entry below `tricks:`:

```yaml
tricks:
  cobwebbed-boots:
    enabled: true
    display-name: 'Cobwebbed boots'
    weight: 1
    commands:
      - 'cmi effect <player> slow 15 5'
      - 'cmi msg <player> !{#6E738D}[{#F6A45B}🎃 {#C6A0F6}Halloween{#6E738D}] {#F5BDE6}Your boots feel terribly sticky.'
```

Keep destructive or disruptive tricks disabled unless specifically reviewed.
The bundled creeper and kick examples are disabled for this reason. Review mob
griefing, full inventories, reconnects, death/world changes, and command failure
before live use.

## CMI milestone claims

Random per-door results remain in `tricks-and-treats.yml`. Milestone requirements
remain in `progression.yml`; prize definitions are in `special-rewards.yml`.
The `cmi-kit-claim` provider uses the exact annual kit ID, such as
`tot_2026_first_knock`, and creates a personal claim through the same CMI command
path as a Treat Bag receipt. It does not grant a LuckPerms permission or require
the player to open `/kits`.

All bundled special reward definitions remain disabled until staff deliberately
enable them. Install the reviewed `config/cmi/kits/halloweenMilestones.yml` under
`plugins/CMI/Kits/`, keep ordinary player access to those kit templates disabled,
and inspect their actual items on the maintained test server. Then run:

```text
/totdoors admin rewards status
/totdoors admin rewards preflight [all|reward-id]
/totdoors admin rewards preflight all
```

Preflight scans split kit files on the bounded report worker and validates the
configured provider. `all` includes the regular `tot01`-`tot36` variants and the
annual milestone kits. It does not claim a kit or prove actual item delivery.
Test the actual CMI console path, disabled templates, overflow and repeat-claim
prevention before enabling a prize definition.

Enable one reviewed prize, or all reviewed prizes, without editing YAML:

```text
/totdoors admin rewards enable first-knock
/totdoors admin rewards enable all
/totdoors admin rewards disable first-knock
/totdoors admin rewards disable all
```

Use the reward ID from `special-rewards.yml`, not the CMI kit ID. These commands
persist that definition's `enabled` setting and refresh the loaded catalogue.
Enabling queues eligible, previously earned claims for online players; it does
not give items immediately. Offline players are checked when their profile next
loads. Disabling prevents new claim creation for that definition; existing
saved receipts keep their captured kit identity. The permission is
`totdoors.admin.rewards.configure`, also available through
`onembcmi.DoorHunt.admin.rewards.configure` or the aggregate administration node.

Each milestone is earned once per player and season. A safely earned enabled
award queues a receipt with `milestone:<id>` as its reward identity. The player
claims it through Doors in an allowed world. Catalogue edits must not replace
the kit captured by an existing receipt. Keep historical definitions until their
records have been accounted for; use new annual IDs for a later event.

Legacy `cmi-kit-unlock` definitions migrate to `cmi-kit-claim` while retaining the
kit identity and enabled setting. Unattempted earned awards may become claims.
Previously completed or possibly attempted unlock awards never issue again.
Migration does not revoke permissions previously granted by LuckPerms; keep the
CMI templates unavailable to ordinary direct kit use and inspect legacy access
before changing that boundary.

The definition placeholders retained for compatibility are:

| Token | Meaning |
| --- | --- |
| `<player>` | The current online name resolved from the recorded recipient UUID. |
| `<uuid>` | The recorded recipient's actual server UUID. |
| `<reward_id>` | Stable special-reward ID. |
| `<display_name>` | Special reward display name. |
| `<kit>` | Exact annual CMI kit ID. |
| `<permission>` | Historical `cmi.kit.<kit>` identity; new claims do not grant it. |

To queue eligible awards already earned by online players after staff setup:

```text
/totdoors admin rewards reconcile <online-player|all-online>
```

Reconcile is not an arbitrary grant and does not replay an already attempted
claim. Audit stored profiles, including offline profiles, with:

```text
/totdoors admin rewards audit [season]
```

New claims persist an attempt marker before command dispatch. A possibly paid
claim is closed as processed (`DISPATCHED`) with `deliveryAudit` evidence and
never automatically resent. It does not block other claims. If a player reports
missing items, inspect their reference, logs, CMI state and nearby delivery
records before deciding whether any separate staff compensation is appropriate.
A failure proven to occur before dispatch leaves the earned reward waiting.

The retained legacy resolution commands record an external outcome only:

```text
/totdoors admin rewards resolve award <online-player> <season> <milestone-id> <dispatched|failed> confirm
/totdoors admin rewards resolve transaction <online-player> <transaction-uuid> <dispatched|failed> confirm
```

The player must be online for the normal serialized profile path. Neither form
sends commands or reopens a closed claim. Do not use a recorded failure as proof
that a historic command had no effect.

## Statistics, leaderboards, and Markdown exports

Staff views are season-scoped:

```text
/totdoors admin stats summary [season]
/totdoors admin stats player <player|uuid> [season]
/totdoors admin stats leaderboard [season] [page]
/totdoors admin stats export <staff|public|discord|all> [season]
```

Summary and leaderboard order use unique doors first, then successful
interactions. Report collection and filesystem generation run asynchronously.
Each export reserves a unique UTC timestamp directory below:

```text
plugins/OneMBTrickOrTreatDoors/reports/<season-id>/<timestamp>/
```

Output scopes are intentionally different:

- `staff.md` includes player UUIDs, player names, door keys and coordinates,
  staff notes, random reward-selection IDs, and milestone-kit state totals. Keep
  it private.
- `public.md` includes aggregate totals, player display names, discovered door
  display names, and districts. It excludes UUIDs, coordinates, staff notes,
  and reward IDs. It is privacy-reduced, not anonymous; review names before
  publishing.
- `discord-01.md`, `discord-02.md`, and so on contain the public report split
  on line boundaries into at most 1,900 characters per file for easy copying.
- `all` writes all applicable scopes into the same reserved directory.

`totdoors.admin.stats.export` permits only the privacy-reduced `public` and
`discord` scopes. The separate `totdoors.admin.stats.export.staff` node permits
`staff`; `all` requires both nodes. This lets Discord helpers export a shareable
report without gaining access to UUIDs, coordinates, or staff notes.

The staff and public renderers escape Markdown-sensitive table content and
remove embedded newlines from stored names/notes. Export commands never post to
Discord automatically.

## Reward-command placeholders

These placeholders are resolved only inside a configured reward command:

| Token | Meaning |
| --- | --- |
| `<player>` | Current player name. |
| `<uuid>` | Current player UUID. |
| `<door_id>` | Registration ID. |
| `<world>` | Registered door world. |
| `<door_x>` | Primary lower-door X coordinate. |
| `<door_y>` | Primary lower-door Y coordinate. |
| `<door_z>` | Primary lower-door Z coordinate. |
| `<player_x>` | Player X when the reward is prepared. |
| `<player_y>` | Player Y when the reward is prepared. |
| `<player_z>` | Player Z when the reward is prepared. |
| `<variant>` | Current variant, or an empty string for a non-variant entry. |

Legacy reward forms `<<player_name>>`, `<<x>>`, `<<y>>`, and `<<z>>` remain
accepted for migration. Do not confuse reward-command placeholders with
PlaceholderAPI tokens.

CMI commands use CMI's `{#RRGGBB}` color syntax. Plugin messages in
`translations/locale_en.yml` use MiniMessage such as `<#f6a45b>`. Do not put
MiniMessage tags into a CMI command and expect CMI to parse them.

## Complete preferred command reference

Angle brackets mean a required value; square brackets mean an optional value.
Commands may be run from console unless the description says a player is
required.

| Syntax | Permission | Purpose/example |
| --- | --- | --- |
| `/doors` | `totdoors.command.info` | Player entry point; open the Halloween overview with `/halloween` travel, event window, progress, hints, feature pages, sibling hunts, and public guide. Bare `/totdoors` is equivalent for a player. |
| `/doors help` | none | Open the graphical player quick-start; console retains the compact text reference. |
| `/doors info` | `totdoors.command.info` | Open the same player overview menu as `/doors`; console retains the full text status. |
| `/doors hint` | `totdoors.command.hint` | Player-only direction hint toward an unfinished door. |
| `/doors stats [season]` | `totdoors.command.stats` | Player-only GUI for seasonal totals, streaks, districts, and baseline status; console retains text output. |
| `/doors journal [season] [page]` | `totdoors.command.journal` | Player-only paginated GUI of discovered doors; never leaks undiscovered locations. |
| `/doors quests [stream] [season]` | `totdoors.command.quests` | Open all enabled streams or one stream's metric/milestone progress for the current or a retained season. |
| `/doors treatbag [season]` | `totdoors.command.rewards` | Open Your Halloween Treat Bag directly for the current or a retained season; claim saved treats and waiting candy gifts. |
| `/doors trade` | `totdoors.command.rewards` | Preview and confirm the once-per-season candy exchange. |
| `/doors rewards [season]` | `totdoors.command.rewards` | Open the broader reward hub linking the Treat Bag, separate durable milestone reward states, and `/kits` shortcuts. |
| `/totdoors admin help` | `totdoors.admin.status` | Show preferred staff controls. |
| `/totdoors admin status` | `totdoors.admin.status` | Show health, runtime state, current season, eligible/registered doors, streams, rewards, and dates. |
| `/totdoors admin prepare` | `totdoors.admin.prepare` | Load saved Door data for location administration and private inspection while leaving public module, event and season settings unchanged; existing season/reward/statistics tools still require an active module. |
| `/totdoors admin inspect <on\|off\|status\|next>` | `totdoors.admin.inspect` | Player-only private physical-door checklist; no rewards or progression. `next` also requires teleport permission. |
| `/totdoors admin inspect list [page]` | `totdoors.admin.inspect` | Player-only checked/pending list with coordinates; clickable teleports also require `totdoors.admin.teleport`. |
| `/hunt admin preflight [all\|coconut\|ghost\|doors]` | `onembcmi.Hunt.admin.preflight` | Run the read-only Event Hunts readiness report; the Doors target reuses this module's complete live health report. |
| `/totdoors admin mode <scheduled\|active\|dormant>` | `totdoors.admin.mode` | Persist the operational mode. Example: `/totdoors admin mode dormant`. |
| `/totdoors admin schedule show` | `totdoors.admin.schedule` | Show effective dates and config/override source. |
| `/totdoors admin schedule <start\|end> <yyyy-MM-dd> <HH:mm>` | `totdoors.admin.schedule` | Replace one boundary. Example: `/totdoors admin schedule end 2026-11-03 23:59`. |
| `/totdoors admin schedule window <start-date> <start-time> <end-date> <end-time>` | `totdoors.admin.schedule` | Atomically replace both boundaries. |
| `/totdoors admin schedule reset` | `totdoors.admin.schedule` | Remove both runtime date overrides. |
| `/totdoors admin season status` | `totdoors.admin.season.view` | Show current lifecycle state, frozen roster, and currently usable door count. |
| `/totdoors admin season list` | `totdoors.admin.season.view` | List every retained yearly season. |
| `/totdoors admin season create <id> <display-name...>` | `totdoors.admin.season.manage` | Create a draft season; example: `/totdoors admin season create halloween-2027 Halloween 2027`. |
| `/totdoors admin season switch <id>` | `totdoors.admin.season.manage` | Select the season used by gameplay, progression, placeholders, and reports. |
| `/totdoors admin season open` | `totdoors.admin.season.manage` | Open the current draft and freeze enabled-door metadata/roster. |
| `/totdoors admin season close confirm` | `totdoors.admin.season.manage` | Stop gameplay/new statistics for the current open season. |
| `/totdoors admin season archive confirm` | `totdoors.admin.season.manage` | Archive the current closed season. |
| `/totdoors admin season roster refresh confirm` | `totdoors.admin.season.manage` | Re-freeze the current open season after intentional route changes. |
| `/totdoors admin setupitem give [player]` | `totdoors.admin.setupitem.give` | Give the PDC-protected Door Setup Tool to self or another online player. |
| `/totdoors admin door <id\|key\|target> [show]` | `totdoors.admin.list` | Inspect all metadata for a numeric ID, stable key, or targeted registration. |
| `/totdoors admin door <id\|key\|target> set <name\|district\|hint\|difficulty\|enabled\|reward-pool\|notes> <value...>` | `totdoors.admin.door.edit` | Validate and atomically save one metadata field. |
| `/totdoors admin door <id\|key\|target> move target [north\|east\|south\|west]` | `totdoors.admin.door.edit` | Player-only relocation to the targeted replacement; preserve ID, key and metadata, plus knock side when omitted. |
| `/totdoors admin door <id\|key\|target> move <world> <x> <y> <z> [north\|east\|south\|west]` | `totdoors.admin.door.edit` | Relocate to validated block coordinates without resetting progress; selecting the existing door by `target` requires a player. |
| `/totdoors admin register [double]` | `totdoors.admin.register` | Player-only targeted registration. Coordinate forms are also accepted. |
| `/totdoors admin doors [page]` | `totdoors.admin.list` | List ten registrations per page with clickable player teleports. |
| `/totdoors admin teleport <id>` | `totdoors.admin.teleport` | Player-only safe teleport beside a registration. |
| `/totdoors admin delete <id>` | `totdoors.admin.delete` | Delete one registration. |
| `/totdoors admin unregister <id>` | `totdoors.admin.delete` | Explicit alias for deleting one registration, including when the physical door is already missing. |
| `/totdoors admin delete all confirm` | `totdoors.admin.delete-all` | Delete all registrations after literal confirmation. |
| `/totdoors admin reload` | `totdoors.admin.reload` | Validate/reload config, both reward catalogues, progression, locale, doors, seasons, and runtime state asynchronously. |
| `/totdoors admin reset <player\|uuid\|all> confirm` | `totdoors.admin.reset` | Reset one online-name/UUID profile or archive/reset all format-4 profiles. |
| `/totdoors admin stats summary [season]` | `totdoors.admin.stats.view` | Show aggregate season totals. |
| `/totdoors admin stats player <player\|uuid> [season]` | `totdoors.admin.stats.view` | Show one player's private season statistics. |
| `/totdoors admin stats leaderboard [season] [page]` | `totdoors.admin.stats.view` | Show paginated ranking by unique doors, then interactions. |
| `/totdoors admin stats export <public\|discord> [season]` | `totdoors.admin.stats.export` | Asynchronously create a privacy-reduced shareable Markdown report. |
| `/totdoors admin stats export staff [season]` | `totdoors.admin.stats.export.staff` | Asynchronously create the private staff report. |
| `/totdoors admin stats export all [season]` | both export nodes | Asynchronously create every report scope. |
| `/totdoors admin rewards status` | `totdoors.admin.rewards.view` | Show stream/milestone counts, enabled reward count, and provider availability. |
| `/totdoors admin rewards audit [season]` | `totdoors.admin.rewards.audit` | Private all-profile scan for ambiguous immediate `PREPARED` or Treat Bag `CLAIMING` transactions and milestone awards; normal claimable treats are not warnings. |
| `/totdoors admin rewards preflight [all\|reward-id]` | `totdoors.admin.rewards.preflight` | Read-only provider/top-level-kit validation; `all` covers configured daily CMI variant kits and every milestone kit. |
| `/totdoors admin rewards <enable\|disable> <all\|reward-id>` | `totdoors.admin.rewards.configure` | Persist milestone prize availability; enabling queues eligible earned claims without paying them immediately. |
| `/doors admin rewards expiry show [season]` | `totdoors.admin.rewards.configure` | Show the selected season's exclusive claim deadline and whether its claim period is open. |
| `/doors admin rewards expiry set <yyyy-MM-dd> <HH:mm> [season]` | `totdoors.admin.rewards.configure` | Set or extend the deadline using the configured timezone; reject invalid or ambiguous local times. |
| `/doors admin rewards expiry clear [season]` | `totdoors.admin.rewards.configure` | Remove the deadline while preserving all claim history. |
| `/totdoors admin rewards reconcile <online-player\|all-online>` | `totdoors.admin.rewards.reconcile` | Queue eligible already-earned online-player milestone claims. |
| `/totdoors admin rewards resolve award <online-player> <season> <milestone-id> <dispatched\|failed> confirm` | `totdoors.admin.rewards.resolve` | After external verification, record an ambiguous milestone outcome without dispatching. |
| `/totdoors admin rewards resolve transaction <online-player> <transaction-uuid> <dispatched\|failed> confirm` | `totdoors.admin.rewards.resolve` | After external verification, record an ambiguous random-reward outcome without dispatching. |
| `/totdoors debug status` | `totdoors.admin.debug.view` | Show effective debug/runtime state. |
| `/totdoors debug <on\|off\|toggle>` | `totdoors.admin.debug.toggle` | Persist the outside-schedule debug bypass. |
| `/totdoors debug health` | `totdoors.admin.debug.view` | Run live startup-equivalent checks. |
| `/totdoors debug target` | `totdoors.admin.debug.view` | Player-only inspection of the block targeted within 12 blocks. |
| `/totdoors debug build` | `totdoors.admin.debug.view` | Show artifact, Java, Paper, API, and runtime details. |
| `/totdoors debug commands` | `totdoors.admin.debug.view` | Print the command catalog, behavior, and per-command permission. |
| `/totdoors debug permissions` | `totdoors.admin.debug.view` | Print every permission node. |
| `/totdoors debug placeholders` | `totdoors.admin.debug.view` | Print every PlaceholderAPI token. |
| `/totdoors debug report` | `totdoors.admin.debug.view` | Print status, health, build, commands, permissions, and placeholders. |

## Compatibility and legacy commands

The preferred structured commands above should be used in new staff notes and
scripts. These retained forms remain functional:

| Syntax | Permission | Equivalent behavior |
| --- | --- | --- |
| `/totdoors register [double]` | `totdoors.admin.register` | Private-beta alias for admin register. `/totdoors add` is also accepted. |
| `/totdoors list [page]` | `totdoors.admin.list` | Private-beta door list. `/totdoors doors` is also accepted. |
| `/totdoors delete <id>` | `totdoors.admin.delete` | Private-beta single delete. `/totdoors remove` is also accepted. |
| `/totdoors delete all confirm` | `totdoors.admin.delete-all` | Private-beta bulk delete. |
| `/totdoors reload` | `totdoors.admin.reload` | Private-beta reload. |
| `/totdoors reset <player\|uuid\|all> confirm` | `totdoors.admin.reset` | Private-beta reset. |
| `/regdoor [x y z]` | `totdoors.admin.register` | Legacy single-door command. |
| `/regdoubdoor [x1 y1 z1 x2 y2 z2]` | `totdoors.admin.register` | Legacy double-door command. |
| `/listdoors [page]` | `totdoors.admin.list` | Legacy list command. |
| `/deldoor <id>` | `totdoors.admin.delete` | Legacy single delete. |
| `/deldoorall confirm` | `totdoors.admin.delete-all` | Legacy bulk delete. |
| `/reloadtotconfig` | `totdoors.admin.reload` | Legacy reload. |
| `/resetinteractions <online-player\|uuid\|all> confirm` | `totdoors.admin.reset` | Legacy reset. |

`/totdoors` is the registered full command. Its root aliases are `/doors`,
`/totdoor`, and `/trickortreatdoors`; any of them technically accepts every
subcommand. Use `/doors` for player-facing instructions and `/totdoors` for
staff runbooks so the two audiences remain easy to distinguish. A bare root
command opens player info in game and help from console. Admin subcommand
aliases `add`, `list`, `tp`, and `remove` are also accepted. Aliases are
conveniences, not separate permission bypasses. If another live plugin claims
`/doors`, inspect the Paper command map and resolve the collision before the
event; `/totdoors` remains the unambiguous fallback.

## Complete permission reference

| Permission | Default | Grants |
| --- | --- | --- |
| `totdoors.play` | all players | Interact with registered doors. |
| `totdoors.command.info` | all players | Use `/doors` and `/doors info`. |
| `totdoors.command.hint` | all players | Use `/doors hint`. |
| `totdoors.command.stats` | all players | View personal seasonal statistics. |
| `totdoors.command.journal` | all players | View only personally discovered doors. |
| `totdoors.command.quests` | all players | View progression streams and milestones. |
| `totdoors.command.rewards` | all players | Use `/doors treatbag` and `/doors rewards` to view and claim personal Treat Bag receipts and claim earned milestone rewards. |
| `totdoors.admin` | operators | Aggregate of every `totdoors.admin.*` node below. |
| `totdoors.admin.status` | operators | View admin status/help. |
| `totdoors.admin.prepare` | operators | Load Door location administration and private inspection while keeping public gameplay settings unchanged. |
| `totdoors.admin.inspect` | operators | Start, stop and view a private physical-door inspection session and its checklist. |
| `totdoors.admin.mode` | operators | Change scheduled/active/dormant mode. |
| `totdoors.admin.schedule` | operators | Show and change event dates. |
| `totdoors.admin.season.view` | operators | View current/history season state and frozen rosters. |
| `totdoors.admin.season.manage` | operators | Create, switch, open, close, archive, and refresh seasons. |
| `totdoors.admin.register` | operators | Register single/double doors. |
| `totdoors.admin.list` | operators | List door IDs and coordinates. |
| `totdoors.admin.setupitem.give` | operators | Give the PDC-protected Door Setup Tool. |
| `totdoors.admin.door.edit` | operators | Edit validated door metadata or move an existing registration while preserving its identity. |
| `totdoors.admin.teleport` | operators | Teleport to registered doors. |
| `totdoors.admin.delete` | operators | Delete one registration. |
| `totdoors.admin.delete-all` | operators | Delete every registration after confirmation. |
| `totdoors.admin.reload` | operators | Reload plugin data/configuration. |
| `totdoors.admin.reset` | operators | Reset player interaction/hint data. |
| `totdoors.admin.stats.view` | operators | View private player, aggregate, and leaderboard statistics. |
| `totdoors.admin.stats.export` | operators | Write privacy-reduced public/Discord Markdown reports. |
| `totdoors.admin.stats.export.staff` | operators | Write private staff reports containing UUIDs, coordinates, and notes. |
| `totdoors.admin.rewards.view` | operators | View special reward/provider status. |
| `totdoors.admin.rewards.audit` | operators | Privately scan every stored UUID profile and expose ambiguous reward references for recovery. |
| `totdoors.admin.rewards.preflight` | operators | Scan and validate configured CMI-kit claims. |
| `totdoors.admin.rewards.configure` | operators | Enable or disable milestone prize definitions and configure seasonal claim deadlines. |
| `totdoors.admin.rewards.reconcile` | operators | Queue eligible durably earned milestone claims for online players. |
| `totdoors.admin.rewards.resolve` | operators | Record externally verified ambiguous immediate `PREPARED` or Treat Bag `CLAIMING` outcomes without replaying delivery. |
| `totdoors.admin.debug.view` | operators | View debug, health, build, command, permission, placeholder, and target reports. |
| `totdoors.admin.debug.toggle` | operators | Enable/disable/toggle debug calendar bypass. |
| `totdoors.admin.debug.test` | operators | Earn door results and use hints through an enabled out-of-window debug bypass; also see its private debug-active state. |

Grant staff `totdoors.admin` for the complete tool set, or grant only the
specific nodes their role requires. `totdoors.admin.delete-all` is deliberately
separate from `totdoors.admin.delete`.

## Complete PlaceholderAPI reference

PlaceholderAPI is optional. The internal expansion identifier is `totdoors`;
no separate eCloud expansion download is required.

| Placeholder | Player required | Value |
| --- | --- | --- |
| `%totdoors_version%` | no | Full runtime plugin version, formatted `3.0.0-NNN`. |
| `%totdoors_build%` | no | Three-digit build number. |
| `%totdoors_state%` | no | Public scheduled event state. Placeholder requests never expose the permission-gated staff debug bypass, including for online staff. |
| `%totdoors_ready%` | no | `true` after asynchronous startup completes. |
| `%totdoors_active%` | no | `true` only when ordinary-player calendar gameplay and the current season are open. It remains `false` for an out-of-window staff debug test. |
| `%totdoors_mode%` | no | `scheduled`, `active`, or `dormant`. |
| `%totdoors_debug%` | no | Whether the staff debug calendar switch is enabled; this alone never grants ordinary-player gameplay. |
| `%totdoors_event_start%` | no | Effective localized event start and timezone. |
| `%totdoors_event_end%` | no | Effective localized event end and timezone. |
| `%totdoors_event_timezone%` | no | Configured timezone ID. |
| `%totdoors_claims_open%` | no | Whether the current season is within its reward claim period; other claim safety checks still apply. |
| `%totdoors_claims_expire_at%` | no | The current season's exclusive localized claim deadline, or no expiry. |
| `%totdoors_door_total%` | no | Number of registered door setups. |
| `%totdoors_daily_completed%` | yes | Player's successful unique doors today; `0` when no loaded profile is available. |
| `%totdoors_daily_total%` | no | Current live eligible-door count, not every registration. |
| `%totdoors_daily_remaining%` | yes | Eligible total minus that player's eligible doors completed today. |
| `%totdoors_hint_ready%` | yes | Whether the player's persisted hint cooldown is ready. |
| `%totdoors_hint_cooldown_seconds%` | yes | Remaining hint cooldown in whole seconds. |
| `%totdoors_season_id%` | no | Current stable season ID, for example `halloween-2026`. |
| `%totdoors_season_name%` | no | Current season display name. |
| `%totdoors_season_state%` | no | `draft`, `open`, `closed`, or `archived`. |
| `%totdoors_season_roster_total%` | no | Frozen roster size, which may differ from live eligibility. |
| `%totdoors_season_interactions%` | yes | Player's successful interactions in the current season. |
| `%totdoors_season_unique_doors%` | yes | Player's unique stable door keys in the current season. |
| `%totdoors_season_treats%` | yes | Current-season treat selections. |
| `%totdoors_season_tricks%` | yes | Current-season trick selections. |
| `%totdoors_season_hints%` | yes | Current-season persisted hint requests. |
| `%totdoors_season_active_days%` | yes | Distinct current-season interaction dates. |
| `%totdoors_season_current_streak%` | yes | Consecutive interaction-day streak ending today. |
| `%totdoors_season_longest_streak%` | yes | Longest interaction-day streak in the current season. |
| `%totdoors_season_districts_found%` | yes | Non-`unassigned` districts where the player found at least one door. |
| `%totdoors_milestones_earned%` | yes | Number of current-season milestone awards. |
| `%totdoors_special_rewards_earned%` | yes | Number of current-season special rewards earned. |
| `%totdoors_special_reward_grants_dispatched%` | yes | Provider batches recorded as processed; includes retained historical unlocks. |
| `%totdoors_stream_<id>_progress%` | yes | Current value of the configured stream metric. |
| `%totdoors_stream_<id>_next_target%` | yes | Next numeric target, or `complete`. |
| `%totdoors_stream_<id>_next_milestone%` | yes | Next milestone ID, or `complete`. |
| `%totdoors_stream_<id>_complete%` | yes | Whether every milestone in that configured stream is earned. |
| `%totdoors_milestone_<id>_earned%` | yes | `true` when that configured milestone is durably earned. |
| `%totdoors_reward_<id>_state%` | yes | `not-earned`, `disabled`, `pending`, `claimable`, `dispatched`, or `failed`. |

The canonical shared-library forms for the deadline are
`%onembcmi_DoorHunt.claims.open%` and
`%onembcmi_DoorHunt.claims.expire.at%`. They resolve the same current-season
values as the `totdoors` aliases and do not load player files or expose private
reward history.

No PlaceholderAPI token reveals a registration ID or coordinate. Player
values are served from the in-memory UUID profile only; PlaceholderAPI never
blocks the server thread to load an offline YAML file. A missing/not-yet-loaded
profile returns neutral zero/false/not-earned values. Dynamic `<id>` is a real
configured lowercase stream, milestone, or reward ID, for example:

```text
%totdoors_stream_door-discovery_progress%
%totdoors_milestone_first-knock_earned%
%totdoors_reward_first-knock_state%
```

Examples:

```text
/papi parse --null %totdoors_version%
/papi parse --null %totdoors_state%
/papi parse me %totdoors_daily_completed%/%totdoors_daily_total%
```

## Public documentation publication

This source repository owns the player guide and import metadata:

```text
docs/plugins/doors.md
docs/plugins/doors-docs.yml
```

The stable canonical player URL is:

<https://docs.1moreblock.com/player-guides/plugins/doors/>

Editing or committing these two files does **not** publish that URL. The public
site is built only from the separate `mrfdev/1MB-Plugins-Docs` repository. Use
this source-first order so an uncommitted or stale project copy cannot replace
the public page:

1. Finish code, locale, `/doors info`, this staff guide, the player guide, and
   their contract tests in this repository.
2. Run `./gradlew clean test`; commit and push this source repository first.
3. Confirm its worktree is clean.
4. In the sibling `1MB-Plugins-Docs` repository, run
   `git pull --ff-only origin main` immediately before importing.
5. Import only this project, then validate and build the complete public site:

   ```sh
   npm run docs:import -- --source ../Trick-or-Treat-Doors
   npm run docs:generate
   npm test
   npm run docs:check
   npm run docs:validate
   npm run build
   ```

6. Review that only `project-docs/trick-or-treat-doors/`, its generated
   Starlight page, and expected site indexes changed. Never delete another
   project's namespace or force-push the public repository.
7. Commit and push `1MB-Plugins-Docs` separately, then open the canonical URL
   and test its links. Until this completes, describe the page as prepared, not
   published.

`StaffDocumentationContractTest` keeps every runtime-catalogued command,
permission, placeholder, and critical operations term in this guide.
`PlayerDocumentationContractTest` locks the public manifest, onboarding steps,
player command/permission set, placeholders, and publication URL to the
project-owned player guide.

## Data files

| Path under `plugins/1MB-CMIAPI/CoconutHunt/Doors/` | Purpose |
| --- | --- |
| `config.yml` | Timezone, schedule defaults, interaction requirements, hint cooldown/ranges, treat/trick category weights, animation, logging, and command recognition policy. Manual reward claims use claims.allowed-worlds; automatic door candy is exempt. The former treat-bag allowlist is ignored. |
| `runtime-state.yml` | Atomically persisted mode, debug flag, and optional start/end overrides managed by commands. |
| `tricks-and-treats.yml` | Enabled weighted treats/tricks, variants, display names, and console command lists. |
| `progression.yml` | Enabled metric streams, milestone IDs/targets, and special-reward references. |
| `special-rewards.yml` | Disabled-by-default annual CMI-kit claim definitions and retained migration identity. |
| `translations/locale_en.yml` | Customizable English MiniMessage phrases and `[🎃 Halloween]` prefix. |
| `doors.yml` | Format-2 IDs, stable keys, lower blocks, sides, registrars, metadata, and next ID. |
| `seasons.yml` | Current season plus retained lifecycle timestamps, frozen door rosters and each season's claim deadline. An explicitly cleared deadline stays cleared across restarts. |
| shared playerdata section `doorshunt` | Format-4 per-season visits, hints, aggregate statistics, milestone awards, immediate transactions, and Treat Bag receipts, isolated from Coconut/Ghost fields. |
| `playerdata-archive/` | Recoverable archive folders created by reset-all. |
| `reports/<season-id>/<timestamp>/` | Asynchronously generated staff/public/Discord Markdown exports. |

Critical door/runtime/player persistence runs on one serialized data worker.
Pure statistics snapshot/render/export work uses a separate bounded report
worker, so a large Markdown report cannot sit ahead of a reward save. Mutations
are applied in memory only after atomic file replacement succeeds. Report text
escapes Markdown control characters and neutralizes Discord `@` mentions before
staff copy public output into a channel.

## Format-4 player migration and retention

Player files from format 1 or 2 are upgraded exactly once into the fixed
compatibility season `halloween-2026`, then atomically saved as format 4 before
the load succeeds. Legacy visits and retained transactions become a
best-effort season aggregate marked `partial-baseline: true`, because old files
did not contain enough history to reconstruct every past interaction, hint,
district, or streak. Player names remain informational; UUID is authoritative.

Format 4 separates visits, hint cooldown, aggregate statistics, and milestone
awards by stable season ID. It also assigns every reward transaction a season
ID, stable door key, and explicit `IMMEDIATE` or `TREAT_BAG` delivery mode.
Format-3 transactions migrate as `IMMEDIATE`, so an old ambiguous `PREPARED`
treat can never silently become a new claim. Do not downgrade a migrated data
folder to a build that only understands an earlier format.

The in-memory/file history cap applies only to the newest 100 **terminal**
`DISPATCHED`/`FAILED` random-reward transactions. Every claimable `PREPARED`
Treat Bag receipt and in-flight `CLAIMING` or legacy immediate `PREPARED`
transaction is retained beyond that cap until recovery classifies it. `/totdoors debug health` reports only
ambiguous states, not ordinary waiting treats. `/totdoors admin rewards audit
[season]` performs the complete read-only scan across offline profiles.

## Reward delivery safety

For each completed knock sequence, Door Hunt writes a unique transaction and
increments the visit before presenting success. An immediate trick moves from
`PREPARED` to `DISPATCHED` or `FAILED` after its command batch. A treat remains
`PREPARED` in `TREAT_BAG` mode until the player claims it.

A manual claim rechecks its recipient, world, permission, kit and receipt before
reserving it. Reservation is saved before dispatch; a separate persisted marker
records when the CMI console attempt starts. CMI owns inventory and overflow
delivery. A proven pre-dispatch failure releases the reservation. After a
possibly paid attempt, the claim closes as `DISPATCHED` with its audit outcome,
including uncertainty, rather than creating an automatic retry or review block.

On restart a reserved receipt known not to have reached dispatch can return to
waiting. A marked or legacy ambiguous `CLAIMING` receipt closes with audit
information and cannot replay. Milestone receipts follow the same rules, while
the durable milestone award prevents a second personal issuance. Other waiting
claims remain usable. Keep audit information when investigating missing items;
command acceptance, a kit event or a usage counter alone does not prove payout.

## Staff troubleshooting

- `starting`: asynchronous config/door startup is not complete; wait, then run
  `/totdoors debug health`.
- `upcoming` or `ended`: check schedule/timezone, mode, and debug state.
- `dormant`: use `/totdoors admin mode scheduled` or `active` intentionally.
- `draft`, `closed`, or `archived`: open the correct season intentionally;
  debug cannot bypass this lifecycle gate.
- Door not answering: verify empty main hand, closed state, registered side,
  active event, open season, frozen-roster membership, metadata enabled state,
  valid reward pool, player permission, daily visit, and player-data readiness.
- Door not registering: target within eight blocks and verify it is real `Door`
  block data. For doubles, verify material/facing/opposite hinges.
- Setup tool ignored: verify its namespaced PDC identity and the specific
  register/list/delete permission. Renaming a golden axe does not create a tool.
- Enabled door awaiting roster: inspect season status, then use the confirmed
  roster refresh only if changing this open season's denominator is intended.
- Missing CMI reward: run the exact CMI command manually, confirm kit spelling,
  inspect the player transaction, and check `commands.require-all-commands-recognized`.
- Milestone prize unavailable: run reward status and preflight, verify the
  exact top-level `tot_2026_*` kit and enabled prize definition, then reconcile
  only unattempted earned awards. Processed claims are not replayed.
- Report export failure: check the console and permissions on `reports/`; a
  failed export cleans up its newly reserved incomplete directory.
- Missing placeholder: verify PlaceholderAPI is enabled and health says the
  internal expansion registered.
- Missing world warning: load the `halloween` world before validating stored
  blocks. Health never force-loads all door chunks.
- Duplicate plugin error: stop Paper and leave exactly one active JAR.
- Reload failure: inspect console; the previous validated configuration remains
  active.

## Release checklist

Before merging or live staging:

1. Run `gradle clean test`.
2. Review `git diff --check` and the staged scope.
3. Run `./gradlew build` once for the intended build number.
4. Inspect embedded `release.properties` and class major version.
5. Start exact Paper 26.2 build 105 with Java 26. If evaluating a newer minor,
   complete the separate minor-version policy and smoke checklist first.
6. Run build, health, status, command, permission, and placeholder reports.
7. Confirm the migrated door count and click-test door pages.
8. Exercise mode/debug/date precedence and restart persistence.
9. Exercise draft/open/close/archive and confirmed roster refresh on disposable
   season data; prove debug cannot open a closed season.
10. Test setup-item register/inspect/two-step unregister-break plus metadata on
    single, double, and every copper-door family in the copied world.
11. Test `/doors`, `/doors info`, help, hint, stats, journal, quests, treatbag, rewards,
    the clickable player-guide URL, `/halloween` quick start, golden-plate
    route markers, cooldown, streak, district completion, milestones, and the
    three-empty-hand-knock interaction. Verify ordinary players cannot inherit
    an out-of-window debug test. Confirm `/doors treatbag [season]` opens **Your
    Halloween Treat Bag** directly, `/doors rewards [season]` still opens the
    broader hub, and both enforce `totdoors.command.rewards` for current and
    retained seasons.
12. Preflight every configured `tot01`-`tot36` item-only Treat Bag kit, every
    `hdc01`-`hdc10` immediate candy kit, and every
    configured `tot_2026_*` milestone kit. Test earn-now/claim-later treats,
    immediate tricks plus candy for both results, the manual world list,
    milestone rewards, reconnect, full inventory, reservation
    failure, ambiguous finalization, and reconciliation cases.
13. Export staff/public/Discord reports and inspect every privacy boundary.
14. Restart with format-3 data, verify its upgrade to format 4, prove old
    `PREPARED` treats are not claimable, and verify waiting/ambiguous retention.
15. Stop cleanly and review logs for plugin warnings/errors.
16. Confirm `docs/plugins/doors.md`, `docs/plugins/doors-docs.yml`, this guide, runtime
    catalogs, and locale text agree; run the documentation contracts.
17. Commit and push the feature branch. Merge to `main` only after interactive
    staging succeeds.
18. Import and publish the public docs repository separately, then verify the
    canonical URL. Do not describe the page as published before this succeeds.

## Shared Hunt module switch and standalone import

Door Hunt is dormant by default. Review all three module states with `/hunt admin modules`; switch one module with `/hunt admin module <coconut|ghost|doors> <on|off>`. Coconut, Ghost, and Doors are independent, so Ghost and Doors may both be active in `halloween`.

Copy the authoritative standalone data folder to `plugins/OneMBTrickOrTreatDoors/` while leaving the original rollback source untouched. With Door Hunt off, run:

The standalone repository's original migration seed remains at `data/v3-migration/OneMBTrickOrTreatDoors/`; the combined repository's immutable test copy is `plugins/player-fun/coconuthunt/src/test/resources/doors-fixtures/standalone-build013/`. Neither fixture is a live target data folder.

```text
/doors admin migrate standalone --dry-run
/doors admin migrate standalone --confirm
```

The first command validates every required YAML file, all 60 registrations and the current player profiles against a temporary copy. The confirm command creates the deterministic fingerprint backup, atomically installs module files under `plugins/1MB-CMIAPI/CoconutHunt/Doors/`, writes player profiles only into the isolated shared `doorshunt` section, and writes `migration/standalone-v3.yml` last. Repeating the command for the same fingerprint is a no-op. It never enables the module or dispatches a reward. Existing authoritative target data, an existing `doorshunt` section, a conflicting receipt, overlap, a symlink, a missing file, or validation failure is refused.

`totdoors.admin.migrate` is the legacy-compatible permission. The default-false canonical node is `onembcmi.DoorHunt.admin.migrate`. Keep the standalone JAR disabled but retain its folder and the original project test server until connected-player verification and rollback review are complete.
