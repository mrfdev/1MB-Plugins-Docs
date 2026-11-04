# Ghost Hunt point shop, 4 November 2026

This extends the [earlier post-event menu work](halloween-post-event-26.3-2026-11-04.md). That report's build 831 and empty-shop findings describe the earlier state. The live server has not been stopped or changed for either task.

## Reviewed behavior

Ghost Hunt's 2026 collection deadline is November 10 inclusive, closing at November 11 00:00 Europe/Amsterdam. Earned wave/completion kits use the same extension. Hunting and travel remain ended. Doors and Halloween Virus keep their November 7 deadline.

The shop contains two one-time 20-point bundles and a 24-point choice of one Bat, Fox or Cat MobHat. The three cosmetic offers share one choice limit for the edition. Actual CMI items appear on the confirmation page; an altered offer, price or kit invalidates the captured confirmation.

The additional [CMI templates](../../config/cmi/kits/ghosthuntpointskits.yml) are disabled, item-only templates with overflow drops and no separate kit entitlement. The three souvenir items preserve their own namespaced identity and edition. Supply stacks remain ordinary stackable Minecraft items.

MobHat delivery saves exactly `onembcmi.mobhat.use`, `onembcmi.mobhat.wear`, `onembcmi.mobhat.remove` and the selected `onembcmi.mobhat.mob.<type>` to the authoritative server UUID. It never uses a player name for LuckPerms or performs external identity resolution. Direct conflicting, transient, temporary or contextual user grants fail closed. The inherited default group's negative baseline is intentionally overridden by the purchased explicit user unlock. OP defaults alone do not count as ownership; real inherited positive grants do.

## Persistence and failure coverage

The point debit, offer purchase, shared choice and transaction marker occupy one atomic profile replacement before delivery. Immutable snapshots go to the existing bounded storage worker; the cached profile is reserved until the operation releases it. Normal profile mutation, reconnect, quit and reload cannot race a second debit.

Tests exercise duplicate actions, stale offers/items, existing ownership, insufficient points, shared-choice exclusion, failed or uncertain storage, safe and ambiguous CMI delivery, partially saved permissions, quit/reload/restart boundaries, wrong world, AutoSell, closed deadline, and suppressed debug reward commands. Prepared but unpaid receipts still observe the deadline. Verified item delivery interrupted before finalization resumes finalization only. Idempotent permission recovery preserves the selected UUID/type. Ambiguous item receipts are not automatically replayed.

The optional LuckPerms implementation has a dependency-free boundary. An isolated classloader test with the API absent verifies repeated construction and unavailable ownership/preflight/delivery without breaking the event host. The admin point command validates permission, amount, the exact locally resolved online UUID and storage acknowledgement without changing finds, claims or purchases.

Fresh MobHat defaults include BAT, FOX and CAT. Existing custom lists are preserved; the local test configuration explicitly adds them to the global and HEAD lists at scale 0.70. Cosmetic guards cover feeding/taming, breeding, pickup/drop, damage, targeting, mounting, death loot, identity tampering and lifecycle cleanup. The original PDC namespace/key pairs remain pinned by compatibility tests.

## Local acceptance setup

The maintained server is `servers/Paper-26.3`, bound to `127.0.0.1:22332`. Ghost, Doors and HV are enabled for inspection with the real calendar; Doors debug bypass is off and HV is in automatic claims-only mode. The Ghost claim-world list additionally allows local `spawn` so its shop can be tested immediately; the prior isolated recording-debug settings are backed up under `.scratch/ghosthunt-point-shop-2026-11-04/before-local-test/`. No live progress or transaction ledger was imported.

While `mrfloris` is online, `/ghosthunt admin points add mrfloris 500` adds 500 points to the selected Ghost edition. Console can use the same command without its leading slash. It does not reset existing purchases or remove the one-MobHat choice limit. The relevant staff permission is `onembcmi.GhostHunt.admin.points`.

Native delivery probes use synthetic recipients, real CMI templates and native inventories, the production observation/delivery services, an isolated durable journal, and actual LuckPerms persistence. Synthetic LuckPerms nodes are restored afterwards. The payout and online-session adapter are controlled; a real online player using the GUI remains the final acceptance step. Native MobHat checks cover actual entity initialization and registered guards; visual fit on a human player's head also requires in-game acceptance.

A live rollout remains separate: after local gameplay acceptance, stage the exact tested suite using the canonical staging task, then review the new CMI file, backed-up Ghost configuration migration, and explicit MobHat allowlist additions. No live JAR or configuration update is part of this test preparation.


## Verified build and runtime

Canonical `scripts/build-all.sh` completed as suite **833**, on Paper **26.3 STABLE build 241**. The full suite reports **8,087 tests, zero failures/errors, 41 skips**, across 636 suites. All 68 source/candidate/server JARs match by SHA-256; all 2,592 `com/onemb` classes use Java 25 bytecode (major 69, no preview bytecode).

- Gradle/compiler: Oracle JDK 25.0.5.0.3, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`; compiler release 25.
- Tests/local Paper: Oracle JDK 27.0.1.0.3, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.
- Launchers discover installed Oracle homes on each invocation; these paths record this run and are not hardcoded toolchain settings.
- Native CMI verification passed for all nine template stacks, exact amounts, souvenir names/lore/PDC and both signed book pages. The real production delivery observer finalized both synthetic item receipts.
- Actual LuckPerms API save/reload and same-UUID repeated grant passed; the synthetic user's original nodes were restored. Local `mrfloris` already has the admin-points capability through the owner group, so no permission change to that account was needed.

Evidence is under `.scratch/ghosthunt-point-shop-2026-11-04/`: `build-all.log`, `suite-verification-833.json`, `java-toolchains.txt`, `native-833.log`, and `paid-probe/native-paid-delivery-verification.txt`. The real online-player GUI purchase and visual hat fit are intentionally left for the owner's local gameplay acceptance.

The final build's source/resource hash snapshot was unchanged across compilation and tests (1,574 files), including the completed Advent work. Source and runtime windows were coordinated with that chat.

The native probe identified and corrected a loot initialization detail: [Paper's Lootable API](https://jd.papermc.io/paper/26.3/org/bukkit/loot/Lootable.html#setLootTable%28org.bukkit.loot.LootTable%29) defines `setLootTable(null)` as restoring default behavior. Exact build 241 has no registered `minecraft:empty` table, so the three cosmetic types explicitly use the verified empty vanilla `minecraft:entities/bat` table through the supported Bukkit API. The existing marked-entity death-drop/XP guard remains in place. Normal, unmarked mobs retain their own tables and behavior.

Native build 833 passed **144 MobHat assertions**, including actual BAT/FOX/CAT spawns, empty loot generation, zero death drops/XP, cosmetic flags, baby/variant settings, marked-entity interaction guards and unaffected unmarked controls. Both CMI templates and real LuckPerms delivery were reverified on 833. All probe-created entities were removed, and the three temporary probe JARs were removed before the final gameplay startup.

Final clean gameplay startup completed at 14:27 Europe/Amsterdam. The local server responded to a Minecraft status request at 14:28 on `127.0.0.1:22332`, with suite 833, in tmux session `onemblibrary263`. `final-server-status.json` and `final-kit-manifest.json` record the running handoff and identical source/installed CMI file. No live server files or permissions were changed.
