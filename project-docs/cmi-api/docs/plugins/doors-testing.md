# Door Hunt testing (shared Hunt module)

This is the complete clean-room v3 test and release handoff, adapted for `:plugins:player-fun:coconuthunt`. Run focused tests with `gradle :plugins:player-fun:coconuthunt:test` and the full gate with `gradle clean refreshBuildDocs test assemble verifyBuildMetadata verifyFeatureInstallPolicyCoverage`. Before synchronizing v1.0.3, run `gradle planProjectJarSync`; the recoverable sync must pass its complete-set and mixed-prefix checks. The standalone source and its data remain rollback material; its JAR must never be active beside the combined Hunt JAR.

# Paper 26.2 and future-minor staging checklist

Use a copy of the Halloween world and never the only production copy.

## Automated checks

```sh
gradle :plugins:player-fun:coconuthunt:test
gradle clean refreshBuildDocs build
```

The unit suite covers knock timing, weighted selection/pools, reward
placeholder resolution, additive configuration upgrades, daily/seasonal
limits, persisted runtime controls, schedule and season boundaries, frozen
rosters, hint filtering, metadata/registration resolution, setup-item PDC and
action policy, format-4 player migration, legacy non-claimable delivery-mode migration,
Treat Bag reservation/release/finalization, unresolved transaction retention,
statistics/streak idempotency, progression/milestone evaluation, CMI kit-file
scanning, Markdown rendering/export privacy, release metadata, the 60-door YAML
migration, known-prefix migrations, bundled-locale coverage, and the staff and
player-guide contracts. It also verifies that exact build-007 and intermediate
build-011 English defaults receive the newer `/doors` onboarding text while
customized phrases remain unchanged. The documentation contracts fail if any exact
catalogued command, permission, placeholder, public URL, onboarding step, or
required operations runbook disappears. Compilation uses `-Xlint:all -Werror`,
so deprecated or otherwise warning-producing API usage fails the build.

Use the focused task for iteration and the full repository gate before synchronization.

## Full-stack test-server synchronization

The canonical live-test target for this project is `servers/Paper-26.2`.
After a numbered JAR passes automated and isolated smoke checks:

1. Confirm the full test server is stopped cleanly.
2. Move any standalone Trick-or-Treat Doors JAR to
   `plugins-disabled/feature-builds/`; never delete either data folder.
3. Run `gradle planProjectJarSync`, then—with Paper stopped—run `gradle syncBuiltJarsToProjectServer`; it recoverably refreshes every active 1MB Library artifact, not only Hunt.
4. Verify that exactly one combined JAR with Paper identity `1MB-CMIAPI-EventHunts` is active, no standalone Doors JAR is active, and the embedded version, Paper target, and compatibility aliases match the verified artifact.
5. Start the full stack, run `/totdoors debug health`, and complete the relevant
   connected-player checks before considering the build ready for production.

An isolated smoke-test instance does not replace this synchronization step.

## Server smoke test

1. Start Paper 26.2 build 112 with Java 25.0.4, the normal Shared Library, and the combined Hunt JAR. Confirm Java 25 bytecode and API `26.2`.
2. Confirm the log reports the expected plugin version, random reward/pool
   count, door count, current season, and progression count with no stack traces
   or main-thread file-I/O warnings.
3. Run `/totdoors debug health`, `/totdoors debug build`,
   `/totdoors debug commands`, `/totdoors debug permissions`,
   `/totdoors debug placeholders`,
   and `/totdoors admin doors`; verify the 60 migrated registrations, every
   command, every permission (including `totdoors.admin.debug.test`), and all
   placeholders are present.
4. Click a door-list coordinate and verify the admin arrives safely on the
   registered side. Check an unloaded/missing world and an obstructed door.
5. Exercise `scheduled`, `active`, and `dormant`; verify dormant wins over
   debug. Outside the schedule, enable debug and compare an authorized tester
   with `totdoors.admin.debug.test` against an ordinary player: only the tester
   may knock/use hints or see `debug-active`. Restart and confirm
   `runtime-state.yml` restores the selections.
6. Create a disposable draft season, switch/open/close/archive it, and test the
   required confirmations. Prove debug and manual active mode do not allow door
   gameplay in draft/closed/archived states.
7. Add/disable/edit a disposable door while a season is open. Verify frozen
   metadata/denominator remains stable until confirmed roster refresh, health
   reports drift, and refresh resolves it.
8. Check both schedule boundaries and invalid end-before-start rejection.
9. As an ordinary player, run `/hunt`, `/hunt info`, and `/hunt help`. Verify
   all three event cards show their public live/upcoming/dormant state and
   published dates without exposing debug-active state. Click Coconut, Ghost,
   and Doors and confirm each opens the respective themed GUI. Repeat with a
   module disabled: its read-only preview must open, while gameplay, hints,
   progress mutations, and reward actions remain blocked. Confirm the Doors
   All Event Hunts button returns to the index. Then run `/doors`,
   `/doors info`, and `/doors help`.
   Verify the Halloween GUI opens with an owner-bound inventory, says to use
   `/halloween`, find a closed door with a
   golden pressure plate in front, and knock three times within five seconds
   with an empty hand; it must explain the daily trick-or-treat chance, show
   progress without coordinates, keep staff controls out of player help, and
   open the complete canonical player-guide URL when clicked. Exercise the
   Coconut, Ghost, `/menu`, close, back, overview, travel, hint, and `/kits`
   buttons; confirm shift-click, drag, number-key, double-click, drop, creative,
   close, quit, world-change, stale-session, and rapid-click paths cannot move
   menu items or replay an action.
10. Verify `/totdoors info`, `/totdoor info`, and `/trickortreatdoors info` are
    equivalent aliases. Test `/doors info` with the complete plugin stack and
    resolve any command collision before release; `/totdoors` must remain the
    unambiguous fallback.
11. Run `/doors hint`; verify no coordinates leak, direction changes with
    player yaw, completed doors are skipped, and the persisted 15-minute
    cooldown/custom public clue survive reconnect/restart.
12. Run `/doors stats`, `/doors journal`, `/doors quests [stream] [season]`, and
    `/doors rewards`. Verify the reward hub separates the Treat Bag from
    milestone unlocks. Earn the same treat on multiple event days and confirm
    every occurrence remains an independent claim. Verify all GUI pages,
    current/historical season selection, journal
    pagination, no undiscovered coordinate/key leak, district completion,
    streaks, milestone thresholds, and truthful disabled/pending/dispatched/
    failed text.
13. With PlaceholderAPI installed, verify static and dynamic examples:
    `%totdoors_state%`, `%totdoors_active%`, `%totdoors_daily_completed%`,
    `%totdoors_season_unique_doors%`,
    `%totdoors_stream_door-discovery_progress%`,
    `%totdoors_milestone_first-knock_earned%`, and
    `%totdoors_reward_first-knock_state%`. Check console/null/offline profiles
    return neutral values without synchronous file reads. During an
    out-of-window debug test, `%totdoors_state%` and `%totdoors_active%` must
    continue to report the public calendar state for every parse context;
    `%totdoors_debug%` is the separate diagnostic flag.
14. Run `/totdoors admin rewards audit [season]` and confirm its totals include
    offline YAML profiles but exclude normal claimable Treat Bag `PREPARED`
    receipts. In a disposable profile, leave one legacy immediate transaction
    `PREPARED`, one Treat Bag receipt `CLAIMING`, and one milestone award
    `PREPARED`; after checking simulated provider/inventory state, verify both
    `rewards resolve ... confirm` forms record a terminal state without
    dispatching or replaying a provider command.
15. At a door whose registered side is marked by a golden pressure plate,
    confirm the plate does not hold the door open. With an empty hand, confirm
    the first two knocks report progress and the third opens the closed door.
16. Try the back side, an open door, a held item, an unregistered/disabled/
    outside-roster door, more than five seconds between knocks, and a second
    visit on the same day. Confirm a held item never advances the knock count
    and its reminder is rate-limited.
17. Give the setup item; verify a renamed ordinary golden axe is rejected.
    Hit-to-register/inspect a single and valid double, then sneak-hit once to
    unregister without breaking and again to break after persistence succeeds.
    Repeat with all eight Paper 26.2 copper/waxed variants and a full inventory.
    Verify normal breaking, explosions, pistons, burning, and falling-block
    changes cannot remove a registered door or its supporting block.
18. Edit every metadata field, including `clear`, invalid values, a missing
    reward pool, and target/ID/key lookup; restart and verify format-2 data.
19. Test rapid clicks, two players at one door, one player at two doors, logout
   during a reward, plugin disable, and a clean restart.
20. Migrate disposable format-1, format-2, and format-3 player files. Verify
    format-4 season attribution, partial-baseline label, and that old
    `PREPARED` treats become `IMMEDIATE` rather than claimable. Create more than
    100 terminal transactions plus waiting/ambiguous records and prove every
    nonterminal record survives save/restart.
21. Add CMI, LuckPerms, and split CMI kit files. Run
    `/totdoors admin rewards preflight all`; verify the report-worker scan
    covers all 36 configured daily
    kits (`tot01` through `tot36`) plus every annual `tot_2026_*` milestone kit,
    including missing/misspelled/indented/commented keys. Keep incomplete
    entries disabled.
22. Enable one disposable milestone reward. Verify permission grant dispatch,
    reconnect persistence, failure state, and permission-aware reconciliation.
    Confirm `dispatched` never claims the kit was redeemed.
23. Verify every enabled treat resolves to exactly one enabled item-only CMI
    kit and every trick command in a disposable world. At the Halloween door,
    prove a treat adds no items and increments the Treat Bag; prove a trick is
    immediate. Return to each configured claim world and claim one treat. Test
    a full inventory, AutoSell safety, creative/spectator mode, rapid clicks,
    reconnect before reservation, disconnect after reservation, restart with a
    `CLAIMING` receipt, missing/disabled/command-bearing kits, and alternate
    door reward pools. A retry-safe failure must leave the receipt claimable;
    an ambiguous claim must not auto-replay.
24. Generate `staff`, `public`, `discord`, and `all` reports. Confirm the staff
    file contains UUIDs/coordinates/notes; public/Discord exclude those fields;
    public still contains player display names; every Discord part is at most
    1,900 characters; concurrent exports use separate atomic directories.
25. Review creeper/mob griefing and keep disruptive tricks disabled unless the
   event rules explicitly allow them.

## Future Paper minor smoke test

Do not assume a 26.2 build is live-ready on 26.3 or later merely because Paper
loads it. For each new minor or meaningful Paper build:

1. Review <https://docs.papermc.io/llms.txt>, the relevant official Paper
   documentation, roadmap, deprecations, and exact-version Javadocs at
   <https://jd.papermc.io/paper/>.
2. Preserve the live JAR, complete plugin data folder, Halloween world, CMI
   kits, and server configuration as a rollback set.
3. Start the unchanged 26.2 artifact on a disposable copied-world instance.
   Health should warn that the runtime is newer and request this smoke test; it
   must never claim an exact-target pass.
4. Run `./gradlew clean test` against the existing target, then update the
   Paper target only when intentionally producing a native build. Compile the
   native target with `-Xlint:all -Werror` and resolve every API warning rather
   than suppressing it.
5. Confirm dynamic registry discovery sees all current `Door` materials and at
   least the eight known copper/waxed variants. Register, inspect, knock,
   animate, close, protect, unregister, and break representative wood, iron,
   copper, and newly introduced variants.
6. Verify configured sound and particle keys resolve through current Paper
   registries and run without warnings.
7. Repeat the complete command/alias, `/doors` onboarding, event/debug/season,
   PlaceholderAPI, CMI/LuckPerms, persistence, reports, adversarial interaction,
   startup, reload, and clean-shutdown checks above.
8. Inspect the full log for plugin exceptions, deprecated-API warnings,
   main-thread I/O, rejected tasks, registry failures, and shutdown leftovers.
9. Only after the copied-world test passes, stage the artifact on the complete
   test-server plugin stack. Record the exact Paper version/build, Java runtime,
   artifact checksum, tests performed, and remaining manual gaps below.

Do not change only the filename, `api-version`, or embedded release metadata to
claim a new target. Those values must match the API and Paper build actually
compiled and tested.

## Public documentation check

Before release, verify `docs/plugins/doors.md`, `docs/plugins/doors-docs.yml`,
`/doors info`, the locale, runtime command/permission/placeholder catalogs, and
the staff guide agree. Source changes are not public until the separate
`1MB-Plugins-Docs` import, validation, build, commit, and push succeed. Open
<https://docs.1moreblock.com/player-guides/plugins/doors/> after
publication and test the in-game click target; until then, record the page as
prepared rather than published.

## Feature-branch acceptance status

The season/statistics/progression/setup feature branch is not considered live
verified until every applicable step above passes with a connected player in a
copy of the Halloween world, CMI, LuckPerms, PlaceholderAPI, and the actual kit
configuration. Automated tests and a clean Paper startup are necessary but do
not prove physical-door interaction, external permission delivery, kit content,
or report publishing policy.

## Verified build 001

On August 6, 2026, build `001` passed all nine unit tests and an isolated server
smoke test using Oracle Java 26.0.2 and official Paper
`26.2-100-main@7731202` (`26.2.build.100-stable`). The server loaded only v3,
reported all 60 migrated doors and 46 enabled reward results, rendered the
paginated list command, completed an asynchronous configuration reload, and
shut down cleanly. The Paper log's only warning entries were the isolated
server's intentional offline-mode notice; Java also printed JOML's upstream
`sun.misc.Unsafe` deprecation notice to stderr. The plugin itself produced no
errors or warnings.

Player-click behavior and live CMI kit delivery still require the interactive
Halloween-world staging steps above before replacing the production JAR.

## Verified feature build 003

On August 6, 2026, build `003` passed all 19 unit tests and two clean startup/
shutdown cycles on Oracle Java 26.0.2 with exact Paper
`26.2-100-main@7731202` (`26.2.build.100-stable`). The isolated server loaded
60 registrations and 46 reward results, registered the internal PlaceholderAPI
2.12.3 expansion, and passed the Java/Paper target, command-handler, reward,
registry, PlaceholderAPI, and all-eight-copper-door health checks.

Console smoke testing verified scheduled/active/dormant transitions, dormant
precedence over debug, debug calendar bypass, atomic window replacement,
invalid window rejection, schedule reset, reload, build/status/health/reference
reports, six-page door listing, `%totdoors_state%`, `%totdoors_mode%`, and
`%totdoors_door_total%`. Active mode survived a clean restart through
`runtime-state.yml`; the expansion re-registered cleanly. The two expected
health warnings were the isolated instance's intentionally absent Halloween
world and CMI plugin. No plugin error or warning was logged.

Interactive hint text/cooldown, clickable player teleport, real copper-block
registration, door knocks, and CMI reward delivery remain items for the copied
Halloween-world server because they require a connected player and the live
world/plugin stack.

## Verified presentation build 004

Build `004` passed the expanded 20-test suite and an exact Paper build-100 /
Java 26 startup. It migrated the unchanged build-003 default prefix to the
CMIAPI-style `[☠ Halloween]` prefix, rendered the bracket/icon/name colors in
live command output, reloaded cleanly, and shut down normally. A separately
customized prefix remains untouched by this migration.

## Verified staff-documentation build 005

Build `005` passed all 23 unit and contract tests and an isolated startup and
clean shutdown on Oracle Java 26.0.2 with exact Paper
`26.2-100-main@7731202` (`26.2.build.100-stable`). The server loaded 60 doors,
46 reward results, and the 16-placeholder PlaceholderAPI expansion. Live
console checks verified the expanded command catalogue, the distinct
`totdoors.admin.delete` and `totdoors.admin.delete-all` permissions, reload,
health, and build output.

The exact old bundled CMI reward prefix migrated to the bracketed
`[☠ Halloween]` style without altering the remaining command text. No plugin
exception or severe log entry occurred. The two expected degraded-health
warnings were the isolated instance's absent Halloween world and absent CMI
plugin. Interactive world, door, hint, and CMI kit-delivery checks remain part
of copied-world staging before merging the feature branch to `main`.

## Verified family-friendly prefix build 006

Build `006` passed all 25 unit and documentation-contract tests and an isolated
startup/reload/clean-shutdown cycle on Oracle Java 26.0.2 with exact Paper
`26.2-100-main@7731202` (`26.2.build.100-stable`). Live console output rendered
the new `[🎃 Halloween]` prefix, and the existing build-005 skull-prefix locale
and CMI reward commands migrated to the pumpkin default. Custom prefixes remain
excluded from the migration. The server loaded 60 doors, 46 reward results, and
all 16 PlaceholderAPI placeholders without plugin errors.

## Verified feature-rich build 007

On August 6, 2026, build `007` passed all 85 automated unit, migration,
privacy, persistence, and documentation-contract tests. The artifact metadata
targets Java 25 and `26.2.build.100-stable`; `javap` confirmed class-file major
version 69. Its SHA-256 is:

```text
a0d36d97d35a17958d1fa0de8bbdc6d221400eff77a3fdc623b35f8af1029ac3
```

An isolated startup/command/export/shutdown smoke test passed on Oracle Java
26.0.2 with exact Paper `26.2-100-main@7731202`. The plugin loaded 60 frozen
doors, 46 random outcomes, 5 enabled progression streams, 11 milestones, and
all 38 PlaceholderAPI references. Live console checks covered build/health/
status/season/door metadata, split report permissions, special-reward status
and fail-closed preflight, representative static and player placeholders, the
serialized stats-scan busy gate, aggregate stats, and a complete `all` report
export.

The export produced distinct `staff.md`, `public.md`, and Discord output. Staff
output included frozen coordinates and operational fields; public/Discord
excluded those private fields, and the Discord part was 360 characters. The
only health warnings were expected in the isolated instance: its Halloween
world and CMI were intentionally absent. No plugin error, severe entry, or
exception appeared in the successful-run log, and both data/report workers
stopped cleanly.

Build `006` was archived and build `007` was staged into the full
`servers/Paper-26.2` test instance together with `seasons.yml`,
`progression.yml`, and disabled-by-default `special-rewards.yml`. Its existing
CMI `halloween.yml` still contains every random kit `tot01` through `tot36`, but
the eleven annual `tot_2026_*` milestone kits are not authored yet. Keep those
special rewards disabled until their real kit contents exist and full-stack
preflight passes.

Connected-player tests in the copied Halloween world remain required before
merging: setup-tool placement/removal, physical copper doors, three-knock
interaction, CMI/LuckPerms permission delivery, reconnect/failure paths, and
player-visible quest/journal/reward presentation.

## Verified forward-hardening build 013

On August 6, 2026, build `013` passed all 116 automated unit, migration,
persistence, concurrency, recovery, privacy, and documentation-contract tests
with `-Xlint:all -Werror`. Archive inspection confirmed plugin version
`3.0.0-013`, API `26.2`, exact target `26.2.build.100-stable`, Java target 25,
and class-file major version 69.

The final JAR then passed an isolated startup, command, locale-upgrade, health,
and clean-shutdown smoke test on Oracle Java 26.0.2 with exact Paper
`26.2-100-main@7731202`. Live output confirmed `/doors`, the player-first
`/doors info` route to `/halloween`, closed-door and golden-pressure-plate
instructions, three knocks in five seconds with an empty hand, daily play,
the public documentation link, and the player-only help catalogue. An
intermediate build-011 locale upgraded to the current dynamic wording without
manual deletion. Health reported the exact runtime target and discovered all
21 door materials, including eight copper variants.

The isolated stack intentionally had no registered route, `/halloween`
provider, PlaceholderAPI, or CMI. Those produced the expected health warnings
and one fail-closed reward-provider failure; they are not plugin startup errors.
The copied Halloween-world/full-plugin-stack tests above remain the release
gate before live deployment.
