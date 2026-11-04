# Forage: ordinary anvil access while carrying protected tools

## Change

The inventory-wide external-command guard treated opening CMI's anvil as an item mutation. A player carrying a protected Forage tool therefore could not use `/anvil` for ordinary items. The original regression test reproduced cancellation before CMI's opening executor could run.

Forage now exempts the authenticated CMI 9.8.10.5 anvil-opening route while the shared CMI callbacks and Forage click, drag and anvil preparation listeners are registered. CMI only opens a real Paper anvil view; it does not insert or modify an item. Its permissions and target-player checks remain CMI's responsibility.

The reviewed root command, bare/namespaced aliases and target-player forms are covered. Unknown or replaced providers, implementations, executors, mixed aliases, retained unsafe alias definitions and missing protection callbacks retain conservative command protection. `anvilrepaircost`, repair and enchant mutation commands are not exempt. The separate read-only `itemnbt` exception and independent shared-guard owners retain their behavior.

Forage tools, including malformed tool markers, remain blocked from anvil inputs through clicking, shift-clicking, dragging, hotbar keys, offhand swaps and creative insertion. Preparation and result checks also reject transformed outputs that have lost their marker, including double-click collection. Existing protected inputs can be retrieved. Ordinary item preparation and transfers remain available when Forage tools are elsewhere in the inventory. This does not reclassify collectibles as protected tools or change their existing rules.

## Verification

Verified locally on **17 October 2026**, synchronized suite **1.0.4-783**, Paper **26.3 STABLE build 200**, CMI **9.8.10.5**, JDK **25.0.4.1** for compilation and Java **27** for the test servers.

- Focused regression reproduced the original command cancellation before the fix, then passed through the real Forage predicate, preprocess handler, attached executor and installed-style CMI alias fast path.
- Added command tests for carried-item locations, console/remote/targeted opening, missing hooks and provider changes, plus adversarial anvil transfer tests for both inputs, result actions and ordinary-item access.
- Canonical `scripts/build-all.sh` passed **6,285 cases: 6,244 passed, 41 existing skips**, with zero failures/errors. Forage accounted for **2,564 cases: 2,536 passed, 28 existing skips**.
- Both maintained local servers received matching sets of **66 managed JARs**. The build preserved **1,907** checked configuration/data files.
- Both local servers started successfully and reported **zero Forage configuration errors**, with their two pre-existing advisories. A native Paper probe passed **311 checks**, using the actual registered Forage callbacks, installed CMI integration, real anvil inventories and native item components. No commands were dispatched, no real-player inventories were changed and Forage profiles stayed unchanged.
- CMI's bare anvil alias is deliberately disabled on these local servers. The native probe confirmed the root opening routes and rejection of the disabled bare route; enabled bare/namespaced CMI aliases are covered by the integration tests. The original probe assumption that the bare alias was enabled was corrected without changing production code or server configuration.
- The temporary probe was removed after testing. Local Paper was stopped; Forage beta remains running on build 783. This update also includes the previously prepared protected-camp whitelist and shortened camp-release lore.

Evidence, the original failing test log, focused/full build logs, backup checks and the disposable native probe are retained under `.scratch/forage-anvil-access-2026-10-17/`. The probe uses detached native inventories and an unjoined player; it is not a connected-client packet test. Live was not accessed, modified, restarted or deployed to.

## API and provider review

Reviewed the current [Paper documentation index](https://docs.papermc.io/llms.txt), [event listeners](https://docs.papermc.io/paper/dev/event-listeners/), and exact [Paper 26.3 click](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html) and [drag](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryDragEvent.html) contracts. The installed CMI implementation and listener priorities were inspected using `javap`: its anvil opens a Paper ANVIL view, and relevant CMI preparation callbacks run before Forage's HIGHEST checks. No new runtime reflection or NMS integration was introduced.
