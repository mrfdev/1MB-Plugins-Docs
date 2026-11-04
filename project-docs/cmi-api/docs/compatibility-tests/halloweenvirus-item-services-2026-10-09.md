# Halloween Virus item services, 9 October 2026

This change closes the reported trim, points-shop repair and DiscordChat upgrade paths for issued Halloween Virus items. It does not change live configuration, kit templates, player progress, dates or rewards already recorded in the ledger.

## Boundaries

- `HvItemGuard` handles trim and repair recipients and slot selectors, including namespaced commands, configured aliases, UUIDs, cached CMI nicknames and abbreviated online names. Identity resolution stays local. Repair follows CMI's argument ordering; trim checks the actual target's main hand.
- `SharedCmiItemGuard` intercepts CMI's public command executor before the provider runs, including commands dispatched from other plugins. Independent HV and Forage owners share the executor without displacing each other. CMI virtual-anvil events remain guarded.
- `SharedPointsItemGuard` authenticates the actual PyroWelcomes shop or confirmation callback and its configured command list before it can deduct points. Unrelated purchases remain available. This adapter retains the reviewed PyroWelcomesPro 0.5.1 and PyroLib 1.4.9/1.6.0 gates because it requires isolated reads of private menu data.
- DiscordChat rejects issued HV identity at upgrade preview and confirmation, before applying an enchantment or spending points. Staff template markers alone do not establish issued identity. Unknown PDC and components remain intact.
- These protections remain registered outside the event. Missing required CMI or installed points-provider protection blocks protected reward issuance. CMI and mcMMO version labels are not allowlists.

## Evidence

The diagnosis reproduced the reported command and upgrade gaps before the fixes. Regression tests include ordinary items, explicit recipients, reordered repair selectors, incomplete issued markers, template-only controls, stale upgrade confirmations and independent feature shutdown.

The implementation uses the official [Paper documentation index](https://docs.papermc.io/llms.txt), [event listener documentation](https://docs.papermc.io/paper/dev/event-listeners/) and exact Paper 26.3 build 166 API metadata/Javadocs for command executors, event registration and PDC presence checks. Provider callback behavior was inspected in locally owned CMI 9.8.10.4, PyroWelcomesPro 0.5.1 and PyroLib 1.6.0 JARs; those binaries are not redistributed.

Suite build **734** completed with the canonical `scripts/build-all.sh` workflow on JDK 25.0.4.1. Paper remained **26.3 BETA build 166**, running on Java 27. All **66** synchronized JARs matched their build outputs by SHA-256.

The suite reported **3,612 tests: zero failures or errors, one unrelated WorthDrift fixture skip**. The affected suites had no skips: Shared Library 389, EventHunts 1,626, Forage 160 and DiscordChat 369. Owned Pyro fixtures exercised both reviewed PyroLib versions.

The temporary native fixture passed **96 checks** against the installed providers:

- Issued diamond and leather boots were denied by CMI trim and repair commands, including direct executor calls; damage, foreign PDC and other item data stayed unchanged.
- CMI's real trim implementation still changed ordinary armor. Opening its actual trim GUI with ordinary boots and then swapping protected boots into the main hand modified only the captured ordinary stack, leaving the protected boots untouched.
- Actual Pyro repair confirmation callbacks for hand, armor, offhand and all were blocked before deductions. An unrelated purchase while carrying a protected item still deducted exactly 37 points and delivered once.
- DiscordChat rejected all three tool upgrades on issued HV items while permitting ordinary upgrades and preserving unrelated metadata.
- HV and Forage guards reported active together; the shared unit tests also covered independent detachment in either order.

The local server shut down cleanly and the temporary fixture was removed. Source, red/green logs, native fixture and suite hashes are retained under `.scratch/hv-modification-guards-2026-10-09/`. No live server was accessed or modified, and no live handoff was staged.

## Operator acceptance

After installing the tested suite and restarting, run `/hv admin validate`. Verify CMI command protection and PyroWelcomes points protection are available. Existing issued rewards do not need remarking.

With an issued pair of diamond boots and the protected leather boots, test `/trim`, `/cmi trim`, `/cmi repair`, the repair services reached through `/points` and `/welcomes`, and DiscordChat tool upgrades. Check that denied purchases leave both the item and point balance unchanged. Repeat with ordinary equipment to confirm those services still work. Retest actual client menus after any provider update.

The remaining trust boundary is arbitrary plugin code directly modifying item data or invoking private provider methods. Server-side callback fixtures complement connected-client acceptance; they do not establish every third-party menu or future version as supported.
