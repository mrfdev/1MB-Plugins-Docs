---
title: Forage Beta Test Checklist
description: In-game player walkthroughs, staff checks and recovery tests for the Forage beta.
---

Prepared **9 October 2026** for the beta session on **10 October 2026**. This is a blank test sheet, not a record of passed gameplay tests. It covers the current Paper 26.3 Forage implementation. The session host records the actual suite build, server build and settings below; previous automated checks do not sign off this session.

## Read and record first

- [Player guide](https://docs.1moreblock.com/player-guides/plugins/forage/): getting started, camps, tools and rewards.
- [Staff guide](https://docs.1moreblock.com/staff-reference/plugins/forage/): permissions, world mappings, diagnostics and recovery.
- [Full feature reference](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/forage.md): command table, tool families, configuration and placeholders.
- [Shareable checklist](https://docs.1moreblock.com/staff-reference/plugins/forage-checklist/) and [downloadable Markdown source](https://raw.githubusercontent.com/mrfdev/1MB-Plugins-Docs/main/project-docs/cmi-api/docs/plugins/forage/checklist.md).

Make a copy per tester. Tick a box only after its expected result is observed. Record **FAIL**, **BLOCKED** or **N/A with reason** against the test ID in your notes; an unticked box is not a pass. For prices, caps and unlocks, use the actual menu and `/forage limits`. Numeric examples here are configurable defaults. A host-assisted shortcut must be recorded so it is not mistaken for natural progression.

| Session field | Record before testing |
| --- | --- |
| Tester and date/time, including timezone | |
| Client | Java or Bedrock, exact version, relevant client mods |
| Suite version/build | Host: `/1mblib version` |
| Paper build and Java runtime | Host: server startup/version output |
| Forage enabled / balance preset | Host: `/forage admin balance` |
| Initial world and travel instructions | Host: logical Wild and actual test-world name |
| Secondary worlds and travel instructions | Host: two different approved worlds |
| Economy, AutoSell, protection and inventory groups | Host: enabled integrations and test settings |
| Report destination | Host's private beta thread/channel; never paste raw server backups publicly |

Start with **P01–P12** for the first playable loop. Continue through the feature tests, then pair up for camps and session checks. Staff should prepare the fixtures before testers arrive. Save disconnect/restart and failure testing until everyone has recorded their balances and inventories.

## Host setup before inviting testers

- [ ] **H01 — Confirm the running build.** Use a complete suite from the canonical build workflow on the maintained Paper 26.3 BETA test server. Record what is actually installed. Enable Forage on the test server and verify CMI, CMILib and the shared library load; verify the economy provider for paid services. Documentation publication does not activate live gameplay.
- [ ] **H02 — Check configuration and storage.** Run `/forage admin check`, `/forage admin balance`, `/forage admin livecheck`, `/forage admin camps worlds` and `/forage debug runtime`. Resolve errors, record warnings, and confirm storage and installed item-protection adapters are ready. A testing-preset warning is expected only when deliberately selected for this session.
- [ ] **H03 — Prepare usable worlds.** Supply travel instructions, an actual Dappled Forest site in the approved Initial Camp world, two different mapped Secondary Camp worlds, and a denied-world fixture. Check mappings rather than assuming the server has `/wild`. Keep the blacklist effective except for deliberate test-only aliases; never copy fixture mappings to live.
- [ ] **H04 — Separate player and staff access.** Use ordinary non-OP tester accounts for the player pass, with `onembcmi.forage.use`, `.shop`, `.stats` and `.camp` under the `onembcmi.forage` prefix. Staff permissions default false, including for OP; grant only the selected staff account or use console. If granting LuckPerms user permissions, target the actual server UUID, including Bedrock accounts.
- [ ] **H05 — Supply fixtures.** Provide camp materials, starter money, accessible gathering patches, plain bonemeal, a matching donor tool and marked Forage treasure for repairs. Prepare advanced tool/level/point fixtures separately from the new-player account. Keep ordinary, renamed and other-plugin items available for comparison. Disable AutoSell initially so it cannot remove intended delivery items.
- [ ] **H06 — Prepare recovery evidence.** Run `/forage admin export backup` and wait for completion. Keep the result private. Record a baseline of player stats, money, tool lore/durability and camp registrations. Arrange a second account, Java and Bedrock coverage where supported, and a clean restart window.

## Player walkthrough: first camp and first reward

- [ ] **P01 — Find the instructions.** Away from camp, try `/forage info`, `/forage help`, `/forage guide`, `/forage next` and `/next guide forage`. The docs link opens, text is readable, and the next step explains an Initial Camp in Dappled Forest. Reading instructions does not claim a camp or spend anything.
- [ ] **P02 — Inspect a camp without claiming it.** In Survival, find a vanilla Abandoned Camp or build an equivalent in the host's Initial Camp world. Place a composter and use `/forage camp`. Missing counts should be understandable; the menu must not claim ownership automatically. Ordinary right-click still permits vanilla composting.
- [ ] **P03 — Complete the physical checklist.** With defaults, provide 1 composter, 24 wool-family blocks (full wool, wool stairs or slabs), 6 fences, 1 campfire/soul campfire, 1 chest/barrel and 1 crafting table within 10 blocks horizontally and 6 vertically of the anchor. The Initial Camp anchor itself must be in Dappled Forest. Add missing blocks one requirement at a time and confirm counts update; trees, cushions and lanterns are optional.
- [ ] **P04 — Register deliberately.** Use `/forage camp register`, review the confirmation and cancel once; no slot should be consumed. Repeat and confirm in Survival. `/forage camp list` should show one owned Initial Camp and an unfinished Local Introduction. Incidental interactions with other composters must not add registrations.
- [ ] **P05 — Learn workstation access.** Sneak-right-click your owned composter. Tool Shop and Local Introduction should be accessible while global reward services explain their lock. Away from the station, `/forage shop`, `/forage quests` and `/forage dust` should direct you back; merely standing nearby or typing a command does not create a workstation session.
- [ ] **P06 — Buy one starter tool.** Read its supported sources and price, then buy at the workstation. The correct named tool arrives and money is charged once. With insufficient funds or a full inventory, purchase must not take payment without delivery. Keep before/after screenshots for any unexpected result.
- [ ] **P07 — Compare real and ordinary tools.** Break a supported source with the matching Forage tool. `/forage stats` and the tool lore should gain the appropriate progress. Repeat with a normal tool, empty hand and the wrong Forage tool: normal Minecraft behavior may occur, but no Forage gathering credit should be added for those attempts.
- [ ] **P08 — Earn the local introduction.** Gather the displayed target after registration in that camp's world, normally 30 qualifying actions. Another player gathering and your earlier historical actions must not complete it. Keep at least 8 eligible plain organic items for delivery; a tool reward alone does not guarantee the block drops an eligible item.
- [ ] **P09 — Deliver the introduction.** At 30/30, verify reward services remain locked until delivery. Use Local Introduction at your composter to submit the displayed item amount, normally 8. Only eligible current-inventory items are consumed once. Named, enchanted, lore-bearing or PDC-marked items must remain untouched. If blocked, record which item and which requirement the menu identifies.
- [ ] **P10 — Confirm the unlocked camp.** Reopen the workstation. Global reward services should now be available when their own costs and unlocks are met. `/forage next`, status and camp list should agree. Putting items into the physical chest/barrel must not submit them automatically or award progress.
- [ ] **P11 — Complete and claim a quest.** Read a daily objective in Quests & Rewards, perform its actual gathering objective, and return to the workstation to claim. Compare XP, points and money before/after; each enabled reward is credited once and the quest becomes claimed. A second click or reopening must not grant it again. Weekly/monthly pages should show their own targets and periods.
- [ ] **P12 — Reconnect and learn the help loop.** Log out safely and return. Camp ownership, completed introduction, progression and claimed quest remain. Test `/forage status`, `/forage limits`, `/forage stats` and `/forage review`; review is read-only. With optional hints off through `/guidance`, explicit `/forage next` still works.

## More player features

- [ ] **F01 — Cover every tool route.** At the workstation, read the tool guide and test each available row below. Record one credited action and one rejected mismatch per row. The last four tools normally unlock when a carried Forage tool reaches tool level 2; bring that tool to the shop. Record staff-supplied fixtures separately.

| Tool (staff give ID) | Example current source | What to observe |
| --- | --- | --- |
| Sickle (`sickle`) | Wheat or configured flora/mushrooms, including red shrubs and shelf mushrooms | Block-break gathering credit |
| Axe (`axe`) | Logs, including poplar; configured fruit blocks | Matching source credit |
| Trowel (`shovel`) | Moss | Moss-family credit |
| Shears (`shears`) | Leaves, including red/orange/yellow poplar leaves | Leaves-family credit |
| Pickaxe (`pickaxe`) | Configured stone/cave blocks | Tool-level shop gate, then matching credit |
| Brush (`brush`) | Configured sand, gravel or clay | Break a matching block; archaeology brushing is not a separate credit route |
| Sword (`sword`) | Host-provided configured gentle creature, such as a cow | Matching melee hit and death while holding the matching Forage tool type |
| Mace (`mace`) | Host-provided configured danger creature, such as a blaze | Same entity rule; avoid unrelated projectile/environmental kills |

- [ ] **F02 — Check the 26.3 additions.** Try poplar logs and leaves, red shrubs and shelf mushrooms with their matching tools. Saplings and crafted poplar building blocks should not count as gathering sources. Report misleading names/icons or missing configured materials.
- [ ] **F03 — Choose a branch.** Use the workstation branch picker; read the family focus and level gate. The first choice is free. Supported gathering updates that branch's history. Try a locked branch, then a switch during its cooldown or without enough points: rejection should explain the requirement without charging. Read actual configured switch costs before confirming.
- [ ] **F04 — Browse your progress.** Open Recent, Tips, tool information and leaderboards through the workstation. Check pagination/back buttons, long lore and your stats against `/forage stats`. Daily XP, weekly XP and lifetime/current-balance boards should not be confused with one another.
- [ ] **F05 — Upgrade and refine a tool.** With host-prepared eligibility, hold the tool in your main hand and use Upgrade Tool. Cancel a confirmation first, then complete one tier upgrade. Costs apply once; XP, uses and legitimate durability remain. Try a supported diamond refinement and a compatible Forage enchant. Shears, Brush and Mace have no diamond variant; locked or incompatible choices explain why.
- [ ] **F06 — Observe the durability lock.** Use a worn fixture down to its configured floor, normally 5 durability. It should stop working with a repair explanation instead of breaking. Record the original tool and lore before repairing; do not use an external repair shortcut.
- [ ] **F07 — Repair and merge.** At the workstation, hold the tool to keep in your main hand, a matching Forage donor type in your offhand, and a marked Forage treasure in inventory. Review costs and repair preview. A successful confirmation consumes the donor and required treasure once, charges once, repairs to the allowed limit and transfers the configured donor XP. Wrong donor, missing treasure or insufficient funds must leave inputs and balances intact.
- [ ] **F08 — Turn in plain resources.** Open Camp Turn-Ins after completing the introduction. Review and cancel once, then confirm with a mixture of plain eligible organic stacks and named/custom items. Only the planned plain stacks are consumed; custom items, tools and marked treasures remain. Check reduced rewards, the displayed item limit and cooldown. Repeat once with AutoSell enabled and report competition for items without assuming Forage reserves future drops.
- [ ] **F09 — Craft dust.** Craft standard dust, normally 8 per batch, from the workstation using the displayed money, points and plain bonemeal costs. Test greater dust separately, normally 4 per batch plus marked treasures. Cancelled/blocked trades consume nothing. Renamed/custom bonemeal must not be consumed as plain bonemeal.
- [ ] **F10 — Use dust in the field.** Right-click eligible crops/saplings, including the 26.3 poplar/red shrub/shelf mushroom targets with suitable space/support. A successful pulse consumes one dust, respects cooldown and bounds target selection/bone-meal applications, and directly adds no Forage XP or points. A grown tree can extend beyond the target-selection radius. If no target accepts a pulse, dust is retained; test a protected-boundary fixture separately and expect protected growth to be cancelled. Vanilla random growth may need repeated valid attempts. Record dust and plant changes together; do not expect every plant to grow every time. Legendary dust is a rare treasure outcome, not a guaranteed shop option.
- [ ] **F11 — Check treasure delivery.** On a real treasure roll or a host-controlled fixture, test empty, partial and full inventory. A successful find must fit in inventory, appear once and increment treasure progress once. With no capacity, the find is skipped: no ground drop, queued reward or treasure-stat/quest increment. Staff tool grants have different overflow behavior, so do not use `/forage admin give` to simulate this test. Do not fail a normal short run merely because no rare drop occurs.
- [ ] **F12 — Check limits without guessing.** Use the host's reduced-cap fixture. Gather until a family cap or chunk exhaustion blocks rewards, then compare `/forage limits` and the explanation. For a capped family try another eligible family; for an exhausted chunk try a fresh chunk. A global gathering cap stops every gathering route. Tool wear/uses continue while reward XP, tool XP and quest credit pause. Changing camps/worlds must not reset global or family daily usage. Placed blocks, immature crops and farmed mobs are not comprehensively provenance-filtered in this version; record farm-loop rates as balance feedback, not as an assumed implemented rejection.

## Pair tests: ownership, multiple worlds and stale menus

- [ ] **C01 — Try another owner's camp.** A second ordinary player inspects and sneak-right-clicks your station, tries registration and attempts an overlapping camp. They must not obtain your workstation benefits, take ownership, reuse your footprint or consume your resources. Camp ownership itself is not land protection; normal world/build permissions still control block damage.
- [ ] **C02 — Register two Secondary Camps.** Use different approved worlds. No Dappled biome is needed there, but the Initial Camp must be valid. Each new registration starts its own fresh Local Introduction. Gathering in world A must not advance world B's introduction. Global stats, points, quest claims and caps remain shared.
- [ ] **C03 — Reject extra or invalid camps.** Try a fourth camp, a second camp in an already-used actual world, a wrong-biome Initial Camp and a denied/unlisted world. Registration must explain the blocker and consume no slot. Use a fresh disposable account for the wrong-biome Initial Camp test so an occupied world/slot cannot mask the biome check. With host assistance, try Creative/Adventure: a complete Requirements book may glow, but registration/revalidation must require Survival.
- [ ] **C04 — Break and repair a Secondary Camp.** Remove the sole crafting table (or enough material to fall below a displayed minimum), check access is blocked but registration still occupies its slot, then replace it and use `/forage camp revalidate` with confirmation. Its completed introduction and global progress should remain.
- [ ] **C05 — Break and repair the Initial Camp.** While a partner observes a Secondary Camp test, remove the sole Initial Camp crafting table (or another feature below its minimum). That owner's Secondary Camp services must stop too. Repair/revalidate the Initial Camp and retry. Check introductions, balances and claim history were preserved throughout.
- [ ] **C06 — Move a disposable camp.** Record its registration UUID and stats. Cancel `/forage camp unclaim <registration-UUID>` once, then confirm deliberately. Blocks remain; the slot is released. Register a valid replacement: its introduction starts fresh while global progress/claimed rewards stay saved. Replacing an Initial Camp still requires the approved world and Dappled Forest.
- [ ] **C07 — Change world with a menu open.** Open a paid or reward confirmation, then teleport/change world before confirming. The old view must not deliver or charge. Repeat after moving beyond the station's six-block use range, closing/reopening the view, and waiting beyond the five-minute session lifetime; re-interact with the composter for a new valid session.
- [ ] **C08 — Change eligibility before confirmation.** With a partner, open a confirmation and remove a required camp block, change the held tool/inputs or revoke the relevant permission before confirming. Current requirements must be checked again; no stale price, item, ownership or entitlement may be used.
- [ ] **C09 — Try GUI transport actions.** On shop, introduction, quest, upgrade, repair, turn-in and dust views, try rapid clicks, shift-click, drag, double-click, number keys, offhand swap, drop and click outside the menu. No menu item can be taken, input moved into an unintended slot, duplicate reward granted or duplicate payment taken. Record Java and supported Bedrock results separately.
- [ ] **C10 — Lose the session.** On disposable fixtures, repeat a pending confirmation across quit/rejoin, kick and death. After returning, record items/money/review status before retrying. The old menu must not retain authority, and an uncertain transaction must not replay silently.

## Staff learning and controlled integration checks

Use a dedicated staff account/console on the disposable test server for this section. These commands can change test data. Replace angle-bracket arguments; never paste them literally. Ordinary testers should be denied staff commands and should not see their staff-only tab completions.

| Purpose | Exact route and caution |
| --- | --- |
| Player/tool inspection | `/forage admin inspect <player>`, `/forage admin inspectitem <player> main`, `/forage debug tool <player>` |
| Give a test tool | `/forage admin give <player> <tool> [tier]`; use IDs from F01, recipient online with free inventory space; staff grants can drop overflow |
| Prepare upgrade fixtures | `/forage admin level <player> <level>`, `/forage admin points <player> <amount>`, `/forage admin toollevel <player> <level>`; level sets a floor, points adds/removes, toollevel changes the held tool |
| Reset test daily buckets | `/forage admin resetcap <player>`; clears current global/family daily counters, not chunk exhaustion |
| Inspect camps | `/forage admin camps list`, `/forage admin camps worlds`, `/forage admin camps inspect <registration-UUID>` |
| Release a disposable registration | `/forage admin camps release <registration-UUID>`; **immediate mutation, no confirmation**; never use another tester's UUID accidentally |
| Inspect legacy reservations | `/forage admin camps legacy`; legacy reassign/move helpers are not a shortcut around v2 registration |
| Snapshot and diagnostics | `/forage admin save`, `/forage admin export backup`, `/forage debug runtime`, `/forage debug transactions`, `/forage debug all` |
| Apply test configuration | `/forage admin reload`, then `/forage admin check` and `/forage admin balance` |

- [ ] **S01 — Verify least privilege.** Try inspection, giving, points, reload, camp release and debug as an ordinary account: they must be denied without changing state. Selected staff/console can run the documented routes. Check an actual Java and Bedrock identity where available; display names must not mix profiles.
- [ ] **S02 — Exercise balance fixtures.** Use the test-only preset/low caps and supplied upgrade inputs. Compare displayed prices/requirements with actual debits, including failure without enough money, points or materials. Tool tier bonuses depend on preset: default normal is 20% per extra tier, testing 25%, live/grindy 15%. Record the preset used.
- [ ] **S03 — Protect tools in vanilla stations.** Try anvil rename/repair, enchantment table, grindstone, smithing, crafting repair, crafter, furnace conversion/fuel, hopper insertion into transforming stations, dispenser use and Mending. Protected tools must not be improved/converted externally. Ordinary storage, inventory rearrangement, dropping/disposal and equivalent ordinary tools should still work.
- [ ] **S04 — Protect tools across installed plugins.** If installed, test CMI repair/rename/enchant including console targeting, mcMMO repair/salvage, Pyro Vessels/Augments, the `/points` repair purchase and DiscordChat enchant upgrades. Protected attempts must not mutate the tool or charge points; an unrelated purchase should still work. Mark missing providers N/A and capture `/forage debug runtime` readiness for the versions actually tested.
- [ ] **S05 — Check shared protection.** If Halloween Virus is installed, carry one of its protected rewards alongside a Forage tool. Refresh/close the provider GUI and use the approved provider reload fixture. Each item keeps its own protection without disabling the other; ordinary items remain usable.
- [ ] **S06 — Review an older tool.** On a copied legacy fixture, use `/forage admin inspectitem <player>` and `/forage admin toolapprove <player>` before any `confirm`. Unchanged base tools may auto-enroll; historical refined/enchanted tools require review. Approved history must retain progress and legitimate durability. Changed already-approved or malformed tools must stay blocked, not be cleaned by deleting identity markers.
- [ ] **S07 — Test protection boundaries.** In an ordinary allowed global area, gathering/dust should work. In a protected fixture or denied world it should not bypass protection or award rejected gathering. With default WorldGuard global-only policy, named regions can block Forage even when vanilla breaking is otherwise allowed. Record the active policy and compare ordinary tool behavior.
- [ ] **S08 — Test the emergency switch.** Set test `enabled: false`, reload and check no player progress, camp trade or growth pulse succeeds. Player entry points and shared recommendations should reflect dormancy; staff inspection/reload still work. Item protection remains active. Re-enable deliberately and verify saved progression returns.
- [ ] **S09 — Test unloaded Initial Camp validation.** With the host's fixture, unload the Initial Camp chunks, then use a Secondary Camp. Pending/unavailable validation must withhold benefits and explain a retry; it must not generate new terrain or cause a visible server stall. Retry after successful verification and record timing/runtime diagnostics.

## Host-only persistence and failure session

Run these after the ordinary walkthrough, using a recoverable copy. Tell testers before stopping or deliberately crashing the server. Record the exact interrupted operation and compare Forage state, Minecraft inventory and economy independently.

- [ ] **R01 — Clean restart.** Snapshot/record state, save, stop cleanly and restart. Check all three camps, local introductions, tool state, XP, points, caps, quests and claimed rewards. Completed operations must not replay; ordinary continued gameplay should remain possible.
- [ ] **R02 — Fail a transaction preflight.** On the host's controlled fixture, make persistence or the required economy provider unavailable before a valuable operation. It must fail without success feedback or an unexplained debit/delivery. Record the diagnostic and restore the dependency before continuing.
- [ ] **R03 — Interrupt a valuable operation.** Host-controlled forced-crash tests should cover before preparation, after an item/economy effect and before finalization. On restart, inspect `/forage review`, `/forage debug transactions`, staff runtime/recovery evidence and external balances before any retry. Uncertain outcomes must remain blocked for review; do not claim atomic recovery across Minecraft and external plugins.
- [ ] **R04 — Learn acknowledgment limits.** `/forage admin recoveryack <transaction-UUID> confirm` only acknowledges retained finalized evidence after staff independently verifies delivery. It is not a refund, retry, inventory restore or blanket queue-clear command. Keep unresolved cases blocked and send their reference plus private evidence to the owner.
- [ ] **R05 — Period rollover.** If the host provides a separate rollover session, check daily, ISO Monday weekly and calendar-month quest periods in the server timezone. Finish and claim within the period; changing worlds/reconnecting must not reset it. Do not change the active shared server clock to force this test. Mark it deferred if tomorrow's session cannot observe the boundary.

## Report and finish

Copy this for each finding. Keep detailed staff logs, exports, UUID lists and backups in the host's private report destination.

```text
Test ID and result: PASS / FAIL / BLOCKED / N/A (reason)
Suite/Paper build and balance preset:
Tester, client version and Java/Bedrock:
Date/time/timezone and test world:
Setup: permissions, camp role, introduction status, relevant integrations
Exact command/menu and steps to reproduce:
Expected result:
Actual result and message shown:
Before -> after: money, points, XP, items, tool durability, quest status
Repeatable? How many attempts? Another client/account affected?
Screenshot/video and transaction reference, if shown:
Staff-assisted shortcuts/config changes:
```

- [ ] **FIN01 — Submit useful results.** Include passed IDs, failed IDs, skipped IDs with reasons, and where instructions were confusing. Distinguish a missing configured prerequisite from a reproducible defect. Stop retrying any duplication, missing-payment/delivery or recovery case until staff records its state.
- [ ] **FIN02 — Owner review.** Reconcile reports and backups, restore temporary settings, and keep unresolved issues and untested cases visible. Player/Bedrock acceptance, farm balance, third-party versions and crash recovery remain explicit release decisions. This beta does not promise Community Efforts, managed Camp Storage, natural-spawn provenance, arbitrary command rewards or new kit/temporary-heart reward integrations.

| Final coverage | Result / evidence |
| --- | --- |
| First player loop P01–P12 | |
| Features F01–F12 | |
| Ownership and sessions C01–C10 | |
| Staff/integrations S01–S09 | |
| Persistence R01–R05 | |
| Java / Bedrock coverage | |
| Blockers and owner decision | |
