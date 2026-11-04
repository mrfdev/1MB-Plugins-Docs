# ScheduledTips targeting and approved catalogue: 4 November 2026

## Result

Owner-approved CMI review outcomes and feature additions are implemented in suite **835**, Paper **26.3 STABLE build 241**. The maintained local server contains **62 enabled tips**, no review-disabled entries, and world/permission/experience targeting. Celebration is removed. The eight approved Library features and all six GameTypes are covered; RecordingMode, NameMC, HideAndSheep, seasonal additions and operational topics are held out.

Live remained read-only. Final read-only verification found CMI `Announcer.Enabled: false`, Tips `enabled: false`, and the original source SHA-256 unchanged: `eb720bc5050390ef03866527c0d8788bee81e6273f9442227af0caf811c76c9b`. No live commands, writes, reloads, stops or restarts were performed.

## Automated evidence

- `scripts/build-all.sh`: **BUILD SUCCESSFUL**, complete suite **835**; **68 active + 0 disabled** managed JARs synchronized and verified in `servers/Paper-26.3`. Existing unrelated working-tree changes were preserved and included by the canonical suite build.
- Full suite: **8,159 tests**, **8,118 passed**, **41 skipped**, zero failures/errors, across 645 result suites.
- ScheduledTips: **134 tests passed**. Added checks cover experience boundaries and overflow, exact worlds and environments, effective permissions, unknown/malformed targeting, weighted fairness, eligibility changes, separate player rotations, hidden/recently delivered topics, and queued world/permission/experience changes. Manual offers cannot bypass targeting. Related targeting references are removed with their tip.
- Catalogue: **62 unique entries**, **67 click targets**, valid YAML, strict MiniMessage, identical component output through the actual suite Core renderer, no CMI raw tags/placeholders/prefix duplication. Travel and incomplete commands suggest text; `/pvp status` does not toggle PvP; `/r ` preserves its space.
- Installed suite JAR: **80 audience assertions** against both the live-reference and local acceptance configurations. The matrix includes newcomer/regular/experienced homes, Builder jump and three utility permissions, all six game-type discovery exclusions, OneBlock team scope, AutoSell/Forage/AFKShrine world policies and MobHat environment exclusions.
- SHA-256 manifest recorded for all 68 installed JARs. All class files are Java 25-compatible; `ScheduledTipsPlugin`, `TipTargeting` and `TipRotation` are bytecode major **69**.
- Local CMI `Settings/Schedules.yml` remains byte-identical to its pre-migration backup.

Evidence is in `.scratch/tips-announcer-2026-11-04/`: `build-approved.log`, `suite-tests-approved.json`, `targeting-tests.log`, `validation-approved.log`, `audiences-approved.log`, `installed-approved-jars-sha256.json`, `live-final-approved.json`, `local-world-adaptations.json` and `runtime-approved.log`.

## Toolchains and API review

| Role | Actual installed JVM | Vendor | Path |
| --- | --- | --- | --- |
| Gradle/compiler | 25.0.5.0.3+1-LTS-2 | Oracle Corporation | `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home` |
| Automated tests/validators/Paper | 27.0.1.0.3+1-2 | Oracle Corporation | `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home` |

Compiler release is **25**. These paths record the actual installations; scripts discover and validate current installations on each invocation, support installed-home overrides for build/tests, and do not download JDKs. `scripts/gradle-oracle.sh -q printJavaToolchains` output is preserved in `toolchains-approved.log`.

The [Paper documentation index](https://docs.papermc.io/llms.txt) was the discovery source. World/statistic/permission checks remain on the synchronous timer and synchronous guidance callbacks, following the [Paper scheduler guidance](https://docs.papermc.io/paper/dev/scheduler/). The implementation compiles against exact API `26.3.build.241-stable`; relevant [Statistic](https://jd.papermc.io/paper/26.3/org/bukkit/Statistic.html), [Player](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Player.html) and [World](https://jd.papermc.io/paper/26.3/org/bukkit/World.html) APIs were reviewed. No filesystem/database/network work or external player-identity lookup was added to the scheduling path.

## Local Paper smoke test

Paper bound only to `127.0.0.1:22332`, started at **16:46:58 Europe/Amsterdam**, and completed startup at **16:47:16**. It reported ScheduledTips version **1.0.4-835**. Status at **16:47:47** showed **62 configured / 62 enabled / 0 disabled / 0 unavailable**, an active scheduler, **1500-second** interval, **2-player** minimum and per-player weighted selection.

Representative previews covered Builder jump, Forage, MobHat, portable crafting and both tournament status commands. The complete staff catalogue listed successfully. Disable at **16:47:59**, dormant status/reload at **16:48:46**, and enable at **16:49:03** succeeded. Final status at **16:49:33** retained all counts and the running scheduler. There were no ScheduledTips warnings or errors. Existing unrelated test-stack startup warnings remain outside this change.

The server stopped cleanly at **16:49:46–16:49:47**, with process exit 0, and remains stopped. Tips stays enabled for the next local acceptance start. After shutdown, the local regular-world set was expanded to retain the reference's `wild`/`nether`/`end` names alongside local `spawn` aliases; the installed-JAR matrix revalidated the final file, including `wild`. This config-only adjustment did not change catalogue counts or JARs.

## Acceptance limits and handoff

No real player was connected; runtime delivery count stayed zero. Console previews do not prove Java/Bedrock client rendering, click outcomes, real CMI/BentoBox permissions, or a timed multiplayer interval. Experience bands use recorded playtime, which can include AFK time and reset statistics; they are not asserted LuckPerms rank memberships. OneBlock role and per-mob unlock checks stay in their destination plugins.

All original review decisions are resolved. Remaining owner acceptance concerns actual gameplay and the manual rollout, not the nine old content holds. Seasonal policy remains undecided. The live handoff reference uses live world groups and stages disabled; local aliases must not be copied blindly. See the [manual handoff](../plans/scheduledtips-cmi-migration.md#owners-manual-handoff-after-local-gameplay-acceptance). Targeting requires the complete tested suite, followed by a deliberate owner-controlled activation. No live staging/deployment or Git commit/push was performed.
