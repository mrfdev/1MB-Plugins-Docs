# Forage camp and Pyro tool-menu interaction

Status: source implementation and development verification; not deployed to the running beta server. Forage-26.3 remains on suite build 736. Its owner requested no restart during gameplay testing.

## Reproduction and cause

The installed PyroFarming 1.3.2 and PyroFishingPro 4.9.35 listeners both run at NORMAL priority without ignoring cancelled `PlayerInteractEvent`s. Their sneak-tool menu branches do not honor item/block DENY results before opening their menus. Forage's existing HIGHEST handler then handles the same composter click. Fishing also processes the offhand event.

The regression fixture invokes the actual owned commercial JAR listeners, actual Paper `RegisteredListener` dispatch, and the real Forage composter handler against controlled player/world state. It intercepts the vendor GUI-construction boundary to count menu-open attempts without starting a server or altering a real inventory. The baseline failed repeatedly: a farming composter click reached Forage preparation and still attempted a Pyro farm menu. The expanded baseline had three failures: Farming main hand and Fishing main/offhand. Ordinary air-click controls passed. Explicitly denying both item and block use did not stop the Farming shortcut. Baseline results are retained in `.scratch/forage-pyro-camp/baseline.json`.

PyroMining 4.6.1's inspected shortcut requires `RIGHT_CLICK_AIR`. Its real handler does not open on a composter `RIGHT_CLICK_BLOCK`, and its air shortcut remains available. The fix does not reinterpret air clicks as camp access.

Cancelling `InventoryOpenEvent` or replacing a Pyro menu afterward is insufficient: PyroLib 1.6.0 registers its menu session after the open call even if opening was refused, then runs a delayed consistency check. The integration therefore acts before the vendor interaction callback executes.

## Integration boundary

`ForageCampInteractionGuard` recognizes the installed provider object, version, listener classloader/class, annotation and registered priority/cancellation metadata for these callbacks:

| Provider | Reviewed version | Interaction callback |
| --- | --- | --- |
| PyroFarming | 1.3.2 | `me.PyroFarming.d.a#a(PlayerInteractEvent)` |
| PyroFishingPro | 4.9.35 | `me.arsmagica.g.e#a(PlayerInteractEvent)` |
| PyroMining | 4.6.1 | `me.PyroMining.h.c#a(PlayerInteractEvent)` |

Only the Forage workstation gesture is reserved: enabled Forage/camps, sneak-right-click on the configured anchor block, and the player's normal Forage use/camp permissions. Both hands are covered, while only the main hand can open Forage. Reviewed provider callbacks are withheld for that gesture; ordinary events delegate unchanged. The guard never uncancels another plugin's veto, and Forage keeps its existing ownership, distance, preparation and validation gates.

Unreviewed versions or listener metadata block the gesture with a throttled, configurable `camp-visit.menu-conflict` message. This fallback withholds currently registered interaction callbacks owned by the affected installed Pyro provider and denies both item and block use. It does not claim coverage of arbitrary future callbacks registered later or delegated to another plugin owner. Staff can inspect `/forage debug runtime` and refresh hooks with `/forage admin reload` after resolving the integration. Public Bukkit handler-list APIs preserve registration order by rebuilding only the affected priority suffix. No provider inventory/session/item data is changed, and teardown does not resurrect removed registrations.

PyroFarming is now an optional startup dependency. Hooks also follow provider enable/disable and Forage reload/disable. Pyro's global shortcut configuration is unchanged.

## Development checks and remaining acceptance

Verification on 11 October 2026 passed all **302 Forage tests**, with zero failures, errors or skips. This includes 23 installed-vendor interaction tests and 17 adapter lifecycle tests. The focused 40-test run also passed before the complete Forage run. The full run used JDK 25.0.4.1 and completed successfully in seven seconds; its log is retained in `.scratch/forage-pyro-interaction/development-tests.log`. Installed Pyro JAR and configuration checksums were unchanged after testing.

Use JDK 25.0.4.1 and set `FORAGE_PYRO_FIXTURE_DIR` to the server's owned plugin directory when running `:plugins:player-fun:forage:test`. Commercial JARs are read in place and are not bundled with the test or repository. Ordinary CI skips the optional owned-JAR fixture when that environment variable is absent.

The official [Paper event-listener contract](https://docs.papermc.io/paper/dev/event-listeners/) and exact locally installed 26.3.build.174-beta API metadata were reviewed. Future Pyro versions require review before being treated as supported.

No canonical numbered build, JAR synchronization, server restart or in-game visual acceptance was performed for this change. After an approved deployment to both maintained test servers, verify composter interaction with a hoe, fishing rod and pickaxe in each hand, normal Pyro air shortcuts, protected locations, and repeated clicks. Confirm that only the expected menu opens and no delayed Pyro close occurs.
