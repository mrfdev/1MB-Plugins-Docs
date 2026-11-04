# Halloween launch review and build 819, 28 October 2026

Paths beginning with `<server-root>` are relative to the owner-managed server directory; exact machine paths remain in the local evidence.

Historical build-819 review. The owner's later catch-up, disabled-kit and overflow requirements are covered by the [final build-820 handoff](ghosthunt-launch-final-2026-10-28.md), which supersedes the setup instructions below.

## Scope and outcome

Read-only inspection of `m4pro-mini`, live server `<server-root>/live-1mb-3.14.4-mc-26.3`, followed by authorized local implementation and testing. No live files, modules, aliases, kits, worlds, or server processes were changed. No live restart was used.

Canonical local suite **819** contains the Ghost launch, Bedrock recipient, protected-click, and HV claim-deadline fixes. All 67 managed JARs are synchronized to the maintained local `servers/Paper-26.3/` instance. That server passed startup/shutdown verification and is stopped. Connected-player acceptance and `stageTestedJarsForLive` remain outstanding; this is a tested local build, not a deployed live event.

## Approved calendar

All dates use **Europe/Amsterdam**. End instants below are exclusive.

| Activity | Calendar | End instant |
| --- | --- | --- |
| Ghost collection and Doors gameplay | October 29, 30, 31 and November 1 | November 2, 00:00 CET (`2026-11-01T23:00:00Z`) |
| Ghost and Doors earned claims | Available during the event and through November 7 | November 8, 00:00 CET (`2026-11-07T23:00:00Z`) |
| HV hunting and spawning | Existing live schedule retained | November 2, 00:00 CET |
| HV main and three community reward claims | Existing October 25 opening retained; extended through November 7 | November 8, 00:00 CET |
| HV community contributions | Existing October 2–24 window retained | October 25, 00:00 Amsterdam |

Closing the Halloween world remains an operational world-access action. The plugin schedules stop collection independently; extending claims does not reopen the world or extend hunting/spawning/contributions. Leave HV and Doors modules enabled during the claim period. Their scheduled end stops gameplay; switching the modules off also blocks their claims. Do not use HV `stop`/dormant as the seasonal hunting cutoff.

## Live findings

- Live Paper is 26.3 build 227; inspected EventHunts suite is 817. Relevant Ghost classes match the pre-change local 818 implementation.
- The EventHunts host is enabled. Ghost is dormant (`modules.ghost.enabled: false`) with debug disabled. Doors and HV are enabled.
- Ghost maps to world `halloween`; its optional internal cuboid is disabled. It does not require a WorldGuard region named `halloween`. The real WorldGuard region and global region allow `use` and `interact`.
- No production Halloween heads or immutable production snapshot existed. The old contract expected 80 heads, 20 per date, October 30–November 2, with claims through November 9. Merely editing the count would fail the old hard-coded production validator.
- `/halloween` currently runs a CMI alias that sets Survival and delegates to `/event`, which displays event text. It is not a direct warp. The `halloween` warp exists in the correct world near `1458.79, 64, 466.9`.
- A CMI `/ghost` emote alias forwards only the root command to `ghosthunt`, discarding arguments. Use **`/ghosthunt`** for setup and player subcommands until that alias is corrected.
- Live Doors runtime overrides already open October 29 and close November 2 at midnight Amsterdam. Season `halloween-2026` already has claim expiry `2026-11-07T23:00:00Z`, which includes all of November 7. No Doors schedule or claim-expiry edit is needed.

### Kits

| Live kit family | Finding |
| --- | --- |
| `ghosthunt_day_1_2026` through `ghosthunt_day_4_2026`, `ghosthunt_bonus_box_2026` | All five exist in `plugins/CMI/Kits/ghosthunt.yml`, but are disabled placeholders containing one spruce log each. Final contents and enabling are outstanding. |
| `tot01` through `tot36` | All 36 exist and contain 16–27 real item stacks. |
| `tot_2026_*` | All 11 milestone kits exist and contain 4–6 real item stacks. |
| `hdc01` through `hdc10` | All 10 exist and contain four candy stacks. |
| `hvreward`, `hvbonus1`, `hvbonus2`, `hvbonus3` | All four exist in `plugins/CMI/Kits/halloweenvirus.yml`, each with 36 real item stacks and no kit commands. Main reward has nine correctly marked special templates; each bonus has seven plus two ordinary filled shulkers. All are intentionally disabled templates; live protection mode is `selected`. |

No missing or duplicate IDs were found in those inspected families. Ghost requires enabled, nonempty, item-only kits with no internal commands. Doors intentionally uses disabled CMI templates; **do not enable the Doors templates as part of fixing Ghost**.

HV likewise issues items directly using UUID-keyed transactions, without LuckPerms commands or username-based delivery. Its existing main/community retry paths preserve the original recipient UUID. No additional Ghost-style Bedrock parser fix is needed there. The local smoke server's missing HV bonus kits/template warnings do not describe the live server; actual live claim acceptance remains untested.

Ghost reward cards deliver items immediately when claimed in an allowed reward world. They do not grant LuckPerms permissions or unlock `/kits`. Live allowed worlds are `general`, `wild`, `cave`, `acid`, `skyblock`, `skygrid`, and `oneblock`; AutoSell must be off and inventory capacity sufficient.

| Requirement | Reward ID | Kit |
| --- | --- | --- |
| Six new finds on October 29 | `daily_1` | `ghosthunt_day_1_2026` |
| Six new finds on October 30 | `daily_2` | `ghosthunt_day_2_2026` |
| Six new finds on October 31 | `daily_3` | `ghosthunt_day_3_2026` |
| Six new finds on November 1 | `daily_4` | `ghosthunt_day_4_2026` |
| All 24, including later catch-up | `perfect` | `ghosthunt_bonus_box_2026` |

Each calendar-day reward is independent. Catching up does not retroactively award a missed day's kit, but all 24 still awards the bonus.

## JAR changes requiring the planned restart

1. Production validation and recognized unsnapshotted defaults now use 24 total, six per date, October 29–November 1, claims through November 7. Backups precede migrations. Custom contracts and existing snapshots are preserved for manual review; an old 80-head production snapshot would not satisfy the new approved production contract. The inspected live installation has no such snapshot.
2. Ghost completion bonus depends on finding all 24, independently of calendar-day rewards.
3. Direct Ghost kit validation accepts exact Java/Floodgate names and UUID recipients and binds delivery/retry to the authoritative server UUID. A renamed account retains its original receipt identity. There is no external identity lookup or name-targeted LuckPerms grant in this path.
4. Valid registered Ghost clicks deny vanilla block/item use at LOWEST, before WorldGuard NORMAL handling. Main-hand discovery still runs once at HIGHEST with registry/PDC revalidation. This avoids WorldGuard held-item denial feedback without allowing ordinary block use or weakening region protection. Offhand clicks cannot double-award. Invalid markers and ordinary blocks retain normal protection behavior.
5. The legacy Ghost enable command delegates to the canonical module switch.
6. HV extends only the recognized old October 25–November 4 claim window to November 7, for both the 23-sherd reward and all three community rewards. Hunting/spawning and contribution dates are unchanged. Custom claim calendars are preserved.

Ghost configuration, registry and rewards are separate from Doors files and ledgers. A shared-host reload preserves those records but restarts enabled module runtime and clears dormant prepared Doors administration sessions. Avoid simultaneous Doors editing during a Ghost host reload; use module-specific switching where possible.

## Operator sequence after the new suite is installed

First inspect the startup migration and production mode:

```text
/ghosthunt admin status
/hunt admin event status halloween_2026
```

Debug must be false. Only if necessary, `/ghosthunt admin debug false` changes it and reloads the shared host. Do not enable debug for production placement.

The production contract lives under `events.halloween_2026` in `plugins/1MB-CMIAPI/CoconutHunt/events.yml`:

```yaml
timezone: Europe/Amsterdam
start-date: '2026-10-29'
end-date: '2026-11-01'
claim-deadline: '2026-11-07'
days: 4
expected-coconuts: 24
participation:
  minimum-new-finds-per-day: 6
worlds:
  production: [halloween]
```

This is a partial reference, not a replacement file. Preserve reward worlds and all other fields. There is no production count/date setter command; `admin expected`, `admin day` and `admin date` are debug overrides. The startup migration handles the reviewed live defaults. If a deliberate YAML correction is needed later, `/ghosthunt admin reload` applies it without a Minecraft restart.

After the five kits are completed, and with a restorable Halloween world backup, run in-game as authorized staff:

```text
/ghosthunt admin ghost give 24 0
```

Place all 24 supplied heads on the intended end rods, then assign balanced waves and validate:

```text
/ghosthunt admin ghost waves auto 4 2026
/ghosthunt admin ghost validate
/ghosthunt admin event validate
/hunt admin event status halloween_2026
/hunt admin event activate halloween_2026 --dry-run
```

Require exactly 24 valid enabled heads, six per day, and no production configuration/registry issues. Then:

```text
/hunt admin event activate halloween_2026 --confirm
/hunt admin module ghost on
/ghosthunt admin status
```

Activation creates the immutable production snapshot. Finish placement and day assignments first. Staff can issue/place production heads while Ghost is dormant; enabling Ghost does not enable or alter Doors.

For deliberate day-specific placement, use `give 6 1`, `give 6 2`, `give 6 3`, `give 6 4` instead of the unassigned batch, placing each group before issuing the next. To register an existing ordinary player head, look at it and use `/ghosthunt admin ghost register 1` (or day 2, 3, 4). Re-registering an existing registered head preserves its old day.

Players use `/ghosthunt rewards` or `/ghosthunt claim all halloween_2026` from an allowed reward world. Individual claims use `daily_1` through `daily_4` or `perfect`.

## Verification

The canonical `scripts/build-all.sh` completed build 819 in 4m 33s. It selected Paper 26.3 STABLE build 227 and matching API. All 67 active server JARs exactly match the build outputs; no disabled managed JARs exist in this local set. All 2,410 `com/onemb` classes use major version 69 (Java 25).

- Compiler/Gradle: Oracle Corporation JDK `25.0.5.0.3+1-LTS-2`, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`.
- Automated test JVM and local Paper runtime: Oracle Corporation JDK `27.0.1.0.3+1-2`, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.
- Paths were dynamically resolved and vendor/major validated by the canonical wrappers. Bytecode target remains `--release 25`; JDK downloads were disabled.
- Active-project tests: **7,502 total, 7,461 passed, 41 skipped, zero failures/errors**. EventHunts: **1,851 total, 1,841 passed, 10 skipped**. Another 24 previously passing build-logic tests were accepted as up to date. Dormant project reports are excluded.
- Focused regressions cover schedule boundaries, six-per-date rewards, catch-up bonus, Java/Floodgate/renamed recipients, UUID-bound retries, migration preservation/failure paths, canonical module switching, and main/offhand protected interactions.
- Local native startup completed at 10:50:07 CET and clean shutdown at 10:50:31 CET. No ERROR/SEVERE log records occurred. Modules retained their previous dormant test state.
- Native production preflight reports 24 expected/six per wave. Its remaining failures are the five disabled placeholder kits and zero placed production heads.
- `/hv info` reports the unchanged November 2 hunting cutoff and October 25–November 7 claim window.
- Every preexisting Doors file and HV ledger remained byte-identical. Ghost registry and module/host switches also remained byte-identical. `state.yml` was reordered on normal shutdown but is semantically identical, including every snapshot. Only the intended Ghost contract fields/descriptions and HV claim fields changed.
- Ghost migration backups byte-match their pre-start files. HV's backup retains the original November 4 deadline after normal settings initialization added marker `0` and refreshed default comments; the full untouched pre-start copy also remains in the test backup.

The [Paper documentation index](https://docs.papermc.io/llms.txt), [event listener documentation](https://docs.papermc.io/paper/dev/event-listeners/), [26.3 API](https://jd.papermc.io/paper/26.3/), roadmap and configuration reference informed the review. Exact 227 API metadata was corroborated from the selected artifact. Builds 225–227 add rebound middle-click protection, primitive PDC type querying, and a duplicate-dispense fix. The new abstract PDC API required only a test-fixture implementation and three focused tests. No unsafe Paper protection settings changed. [Official build 227 metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/227).

Detailed local evidence: `.scratch/halloween-launch-2026-10-28/`, including `build-all-retry.log`, `verification-819.json`, `native-smoke.log`, `native-file-comparison.json`, `native-summary.json`, `reviewed-paper-metadata.json`, and the pre-start `before-native-smoke/` backup.

## Remaining launch work

- Complete and enable the five Ghost kit contents; keep the separate Doors templates disabled.
- Place/register the 24 production heads, assign six per wave, validate, snapshot and enable Ghost.
- Resolve the `/ghost` alias argument collision if that short command is desired; decide whether `/halloween` should keep showing event text or navigate directly.
- Test a normal Java player and a `.bedrock` player on actual heads inside the protected sewage area, with empty hand and held items, and exercise real kit claims in `wild`/`oneblock` with inventory and AutoSell checks.
- Confirm the operational Halloween world closure at November 2 midnight while keeping reward commands reachable through November 7.
- After local gameplay acceptance, stage the exact complete tested suite for the planned live restart. Configuration, kit and head setup can then be finished through supported reloads/commands without another restart.

Native startup and automated tests do not substitute for connected-client WorldGuard, menu rendering, Bedrock or paid-reward acceptance. Existing local HV kit/setup warnings are not evidence of equivalent live problems.
