# Halloween post-event menus, 4 November 2026

Paths beginning with `<server-root>` are relative to the owner-managed server directory; exact machine paths remain in the local evidence.

This report describes the earlier build-831 state. The later [Ghost Points shop implementation](ghosthunt-point-shop-26.3-2026-11-04.md) adds the approved offers and extends Ghost claims through November 10; Doors and Halloween Virus keep November 7. The follow-up proposal at the end is historical.

## Scope

Ghost Hunt, Trick-or-Treat Doors and Halloween Virus retain their live player-head information. After gameplay ends, their footer heads instead show the ended event, the configured inclusive reward deadline and concise saved progress/reward information. The 2026 deadline includes all of **7 November Europe/Amsterdam**, ending at **00:00 on 8 November** (`2026-11-07T23:00:00Z`). Once the deadline passes, the menus say the collection period has ended.

The menus link directly to the other Halloween activities. Closed Halloween travel buttons are informational, say to try again next year, and do not dispatch a command. A live menu clicked after the cutoff is also rejected using current state after the existing delayed GUI handoff. Doors administrator access does not bypass this ended-event travel check. The external `/halloween` alias and world-access configuration remain owner-managed.

## Read-only live inspection

Inspected `m4pro-mini`, server `<server-root>/live-1mb-3.14.5-mc-26.3`, using file and log reads only. Live suite was build 829. No live console commands, restart, stop, JAR replacement, configuration writes, player transactions or reward claims were performed.

- Host module switches for Ghost, Doors and HV are enabled; Ghost debug is off.
- Ghost's active `halloween_2026` event ends on 1 November and has inclusive `claim-deadline: 2026-11-07`.
- Its `halloween_weekend_2026` reward profile contains four wave kits and the completion bonus, but **no point-shop offers**. The old menu nevertheless advertised spending points. Empty shops now explain this and link to earned rewards; no exchange economy or new reward offer was invented.
- Doors' scheduled end is 2 November at 00:00; season `halloween-2026` has `claims-expire-at: 2026-11-07T23:00:00Z`.
- HV uses the same hunting cutoff and an inclusive 7 November claim deadline. Its top-level legacy `enabled: false` setting is not the authoritative host-module switch. Manual mode still honors the hunt end and separate claim calendar.

The owner supplied the player screenshot and clarification: the player meant the **Ghost Points Shop** button, not the completion bonus. Its tooltip promised spending Ghost Points even though the active profile has no offers. This confirms the misleading empty-shop route. Tests establish that configured purchases and earned kit claims remain allowed during the claim period; there is no reproduced November 7 cutoff bug. Adding an actual point exchange requires a separate reward/price decision and is outside this change.

## Verification

Focused tests exercise the real purchase/kit services and GUI construction/action callbacks, including November 4, November 7 at 23:59:59 Amsterdam, the exact November 8 cutoff, stale travel, removed shop offers, disabled travel input, permissions/offline checks and real default-profile loading. Live player-head wording remains covered. Existing GUI session/holder and inventory input protections are retained.

Detailed local evidence is under `.scratch/halloween-post-event-2026-11-04/`.

Final canonical **build 831** passed `scripts/build-all.sh` on **Paper 26.3 STABLE build 241**. All **68** managed JARs match their canonical candidates by SHA-256, across the active and disabled locations (68 active, none disabled). The full suite reports **8,026 tests, zero failures/errors, 41 skipped**, across 629 test classes. All 2,578 project classes in the suite use bytecode major 69, Java 25. Build 830 also passed; 831 includes the screenshot-driven removal of misleading MobHat availability from empty shops.

Compiler/Gradle: Oracle `25.0.5.0.3`, resolved to `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`. Automated tests and native Paper: Oracle `27.0.1.0.3`, resolved to `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. These are observed paths only; the launchers continue resolving installed Oracle 25/27 dynamically and disable automatic downloads.

Final native startup and shutdown passed with exit code 0 and no ERROR/SEVERE/Exception records. Ghost reported `claiming` for 4 November; Doors passed preflight for all 47 reward entries; HV reported `CLAIMS ONLY` and rewards through 7 November. The existing local recording-mode override was temporarily disabled for that check, and the original local event configuration/state files were restored byte-for-byte after shutdown. Two earlier harness attempts stopped cleanly after mismatched expected output (the retained debug edition and `/hv info` versus admin status wording); the corrected final check passed. Pre-existing local HV template/setup warnings remain; no live data was imported to mask them.

The maintained local server is stopped. No live staging or deployment was performed. Connected-client menu appearance, Bedrock behavior and gameplay acceptance remain owner checks; the menu callbacks and claim/deadline boundaries are covered by automated tests.

## API and documentation review

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), followed by [custom inventory holders](https://docs.papermc.io/paper/dev/custom-inventory-holder/), [scheduling](https://docs.papermc.io/paper/dev/scheduler/), [InventoryClickEvent for Paper 26.3](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html) and the [roadmap/deprecation policy](https://docs.papermc.io/paper/dev/roadmap/). New actions retain the shared GUI's delayed session-aware navigation; no NMS or reflection was introduced.

The public documentation mirror check still reports broad existing drift and a missing generated Forage source dependency. The three local player guides are updated. The separate public docs checkout was not modified or published by this task.


## Follow-up shop discussion (not implemented)

The owner is considering multiple point offers and a shop-only extension through **10 November**, closing 11 November at 00:00 Amsterdam. Ordinary earned rewards currently still close on 8 November; no deadline configuration was changed in this task.

Read-only live MobHat configuration permits Rabbit, Armadillo, Frog and Turtle in the global and head-position allowlists. A locally queried, read-only copy of the live LuckPerms H2 database confirms individual unlocks for all four; ordinary default/player groups do not receive free wear/remove permission or every hat. The database was not imported into the local test server.

The current proposal is one selectable **Bat, Fox or Cat** unlock, with 24 points suggested for a one-time choice. The owner clarified that a purchase should grant one chosen hat, not all three. New cosmetic types need local interaction/appearance testing, non-interactive fox/cat handling and a later owner-managed allowlist change. No MobHat configuration or unlocks were changed.

New paid offers also require observed, durable delivery: the current generic shop command path only observes dispatch acceptance. An item bundle should reuse observed CMI kit delivery and a MobHat unlock should await and verify UUID-targeted LuckPerms persistence, with no second debit on recovery. These are requirements for the proposed follow-up, not claims about an implemented new shop.
