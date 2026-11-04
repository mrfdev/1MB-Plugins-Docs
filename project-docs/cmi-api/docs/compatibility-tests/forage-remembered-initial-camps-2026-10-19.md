# Remembered Initial Camp validation

This change addresses the repeated Initial Camp revalidation message when travelling to a valid Secondary Camp after the Initial Camp's chunks unload. Work and verification are local. No live server configuration, data or process is changed.

## Behaviour and preservation

- Local workstation use still physically checks its complete registered footprint, including adjoining chunks and cushion entities.
- Secondary Camps can use remembered successful physical validation of their owner's Initial Camp. Current registration, world UUID and policy, WorldGuard access, introductions and transaction rules still apply.
- Evidence is a small optional fingerprint and timestamp stored with the existing camp registration. It survives normal saves and restarts, has no timed expiry, and is discarded on confirmed invalidation or unclaim. Changes to relevant camp requirements make previous evidence inapplicable.
- Old registrations without usable evidence retain their ownership, introduction actions and submission state. Workstation entry attempts a bounded asynchronous inspection of existing terrain. It does not generate terrain. Successful inspection establishes evidence; unavailable terrain or entities prompts a visit to the Initial Camp without treating it as damaged.
- Ordinary changes queue inspections without forcing chunk loads. An incomplete inspection leaves a pending-refresh marker separate from confirmed damage. Natural chunk/entity loading and local visits can finish the inspection.
- Confirmed missing pieces still pause camp services until repair and deliberate revalidation. A new successful inspection cannot silently clear a confirmed-invalid flag. Camp changes do not reset global progress, rewards or local introductions.
- Optional evidence uses the normal autosave/shutdown path. Losing unsaved evidence in a crash merely causes another inspection. Existing durable registration, progress, reward and transaction paths remain in place, including the build-784 Multiverse save coordination fix.

There is an intentional tradeoff: a distant edit that emits no observed event may be discovered on later natural loading or a local visit. This follows the agreed policy for a moderated survival server and avoids perpetual remote scans.

## Resource bounds

The registry holds at most one validation record and one pending marker per camp, plus at most nine chunk-index memberships per camp. It retains no Player, Chunk or inventory objects for remembered evidence. Unclaim and registry replacement remove associated state.

Remote preparation allows four concurrent preparations, four outstanding asynchronous chunk requests, eight joined callbacks per camp and at most 36 retained footprint chunks. It has a 100-tick deadline, a non-extending 40-tick completed lease and a 30-second failed-load cooldown capped at 256 entries. Reload, disable, timeout, callback failure and late completion release references and temporary tickets. Maintenance performs at most two physical scans per tick and does not repeatedly poll unavailable chunks.

## Verification

The previous behaviour was reproduced before the implementation: a valid Initial Camp with unloaded chunks blocked a Secondary Camp. Regression coverage includes remembered state, legacy records, two Secondary Camps, restart persistence, changed policy, WorldGuard membership, confirmed damage, delayed entities, unavailable chunks, callbacks after movement/death/quit/reload, permissions revoked during loading, concurrent requests and ticket cleanup.

The native probe uses only a new disposable world and detached camp records on the local Paper test server. It places a complete four-chunk camp with real cushion entities, exercises native loading/unloading and YAML persistence, and checks cleanup. It does not use real player inventories or modify the plugin's actual camp registry. Native API checks and mocked player-session tests complement each other; this is not a connected-client gameplay test or a crash simulation.

Execution evidence is kept under `.scratch/forage-nikkipixel-camp-2026-10-19/`.

### Build 785 acceptance results

- Canonical `scripts/build-all.sh` succeeded for suite **1.0.4-785**, Paper **26.3 STABLE 205**, Java 25 bytecode and Java 27 server runtime. Of 6,389 suite cases, 6,378 passed and 11 unrelated cases were skipped; zero failures/errors. All 2,644 Forage cases and 490 shared-library cases passed without skips, including the optional local integration fixtures.
- An additional tests-only stress case passed after the canonical build: the focused Registry/Maintenance run passed all 90 cases. It verifies 100 players with 300 camps, 300 validation records, 300 pending markers and 2,700 chunk-index memberships. Unclaiming every camp and three load/clear cycles each leave all associated collections empty.
- The copied legacy-data migration check preserved all original fields across 14 camps and 13 owners, including 11 completed introductions, 330 local actions and two confirmed-revalidation flags. All legacy entries correctly begin without trusted evidence. Optional evidence/pending metadata round-tripped through actual Bukkit YAML without changing original camp fields.
- The native Paper probe passed **99 checks**, including complete inspection across four chunks at negative coordinates, two actual cushion entities, YAML persistence, 10,000 stable evidence lookups, native unload, shared remote fallback, confirmed damage, repair/revalidation, close/late-completion cleanup and zero remaining probe chunk tickets. Its disposable world and probe JAR were then archived outside the server.
- Both maintained instances started and stopped cleanly with the canonical suite. `/forage admin check` reported zero configuration errors on each, retaining the two known local warnings for the normal balance preset and intentional shovel/brush sand-family overlap. No Forage exception was logged during either run.
- Preservation comparison covered all 1,836 captured Forage data/configuration/kit/server-properties files: 1,820 remained byte-identical, 14 YAML files changed ordering/format only, and two properties files changed comments only. No saved values, progress, kits or transaction records changed. The probe's auxiliary WorldGuard directory was archived; existing WorldGuard, CMI and Multiverse-Core configurations remained byte-identical.
- All 66 managed JARs match between both maintained servers and the staged manual handoff in `build/tested-jars/live/`. Both local servers are stopped. Live was not accessed or changed during implementation/testing.

The canonical workflow selected Paper 205 within the already approved 26.3 stable channel. Official build 201–205 changes and the current Paper index, roadmap and exact API were reviewed. The notable Moonrise chunk/entity/NBT changes are covered by the native save/unload/reload test; the new negative-inventory-stack-size rejection has no affected call in this feature. Source review evidence is in `native/paper-200-to-205-review.md` beneath the scratch directory.

## Manual handoff

Install the complete tested Library JAR set during a normal backed-up server restart. Preserve live Forage configuration, data, kits and other plugins. No data reset, camp recreation or migration command is needed. Run `/forage admin check` after startup. A legacy camp without evidence may receive its first remote inspection or a request to visit its Initial Camp; its saved progress is retained.

Design decision: [Remember distant Initial Camp validation](../../plugins/player-fun/docs/adr/0002-remember-distant-initial-camp-validation.md).
