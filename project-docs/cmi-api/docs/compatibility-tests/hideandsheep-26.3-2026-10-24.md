# Hide and Sheep, 24 October 2026

Hide and Sheep introduces Woolbur, Charlie the Vote Llama's mischievous nephew, as an exclusive 1MB event. Installation is dormant. Enabling the feature does not start a round; staff prepare its arrival point, radius and costume, then explicitly start it. The normal defaults are a 100-block radius, six minutes, four normal-scale decoys and three unique finders receiving 100/50/25 points.

The [staff guide](../plugins/hideandsheep.md), [player guide](../plugins/hideandsheep-player-guide.md), private [development contract](../feature-contract-reviews/hideandsheep.md) and [CMI kit templates](../../config/cmi/kits/hideandseek.yml) describe the implemented behavior and recovery procedures.

## Canonical build

The final `scripts/build-all.sh` completed suite **795**, compiling with **JDK 25.0.5** and Java 25 bytecode against **Paper 26.3 STABLE build 222**. The complete managed set was synchronized and independently reverified: **67 matching JARs, 67 active and zero disabled**. No live staging or deployment was performed.

The test reports contain **6,892 cases across 549 test classes**, with **zero failures or errors and 41 skipped**. All **55 Hide and Sheep tests passed**. Coverage includes ranking and unique participation, storage failures and restart recovery, GUI identity and stale actions, cancelled protected-region interactions, launch/disable races, native point receipts, inventory proof, duplicate claims and console administration without a player permission grant. Existing unrelated deprecation warnings remain elsewhere in the suite; the new Hide and Sheep sources produced none.

The tested feature artifact is `1MB-Lib-HideAndSheep-v1.0.4-795-j25-26.3.jar`, SHA-256:

```text
7ebf59a95ae70817b79467b73a4cede1f5782d7ea65bddf5ec08412b2cffac18
```

Local build evidence is retained in `.scratch/hideandsheep-build-all.log` and `.scratch/hideandsheep-runtime/verification.json`.

## Paper build review

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), relevant official pages, [26.3 Javadocs](https://jd.papermc.io/paper/26.3/), the [roadmap](https://docs.papermc.io/paper/dev/roadmap/) and deprecation metadata. The canonical workflow selected build 222 from the configured 26.3 STABLE channel. [Official build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/222) identifies the selected server artifact.

The review covered the changes after the previous local build 218:

- [219](https://github.com/PaperMC/Paper/commit/e8a1f8fd686e79fa728528c8b92882f0cddb853b) adds a configurable plugin message channel limit while retaining the default limit of 128.
- [220](https://github.com/PaperMC/Paper/commit/02378ab5827b3500e3876fdbdd129dc9483fb4ab) updates Crafter preview event behavior and a local development tool setting.
- [221](https://github.com/PaperMC/Paper/commit/05c2798ec061ebfc61d27954923dce49d1b33d5a) fixes a Folia scheduler cancellation transition. Hide and Sheep uses the supported Bukkit scheduler on Paper.
- [222](https://github.com/PaperMC/Paper/commit/e3ba7b1dc801e0c385051c34781ab30b226abee3) restores missing world generation settings from server properties while retaining failure for corrupt existing settings. The maintained server's existing worlds loaded normally.

Thirteen relevant API classes were byte-for-byte unchanged between 218 and 222: Sheep, Entity, LivingEntity, Attribute, AttributeInstance, World, Chunk, EventHandler, PlayerInteractEntityEvent, EntityDamageEvent, PlayerShearEntityEvent, ItemStack and BukkitScheduler. The exact API artifact declares JVM 25. No implementation adjustment was required for this build delta.

The selected Paper server SHA-256 is `f649771a2190214306fb0cfba22c7b2cbac5df6308b1158309593603ed07d488`; the compile API SHA-256 is `5ce358580a9ea816fe0a0f7629804b657077575eb8d277d931744b7e882705c4`.

## Actual server smoke test

The maintained `servers/Paper-26.3/` instance ran suite 795 on **Java 27.0.1+9-62** and Paper 222. Startup completed in 17.576 seconds, all 13 configured worlds loaded, and Hide and Sheep reported dormant. No ERROR, Exception or SEVERE entries occurred in this run. All times below are Europe/Amsterdam on 24 October 2026.

Direct console checks verified that dormant status remained available, starting while dormant was rejected, enabling did not launch an event, and starting without a prepared arrival point was rejected. The smoke configuration then used the existing `spawn` world at 23, 67, -28, radius 50, a 30-second duration, two decoys and Pocket Prism. These reduced settings were only for verification.

| Round | Observed result |
| --- | --- |
| `a7098204-a044-4d50-bd2d-62329c644d35` | Started at 18:38:28. Native entity attribute queries confirmed one target at scale **0.65** and two decoys at **1.0**. Status reported six seconds remaining at 18:38:52. At 18:38:58, the event ended as `SHEEP_WINS`, persisted its zero-participant summary and removed its sheep. |
| `5a6c93da-ab86-4357-b254-8cec5c54ec84` | Started at 18:39:15. Debug disable during the live round produced `INTERRUPTED` and dormant status at 18:39:43, with no remaining round sheep. Re-enabling returned to READY without starting another event. |
| `673623ca-d17c-496c-8e4d-3efb918e4e3a` | Started at 18:40:38. Explicit admin stop at 18:40:40 produced `STOPPED` and persisted its summary. Admin disable restored dormancy. |

Reload between rounds preserved readiness without an automatic start. Cleanup was independently checked with native entity selectors using the exact round PDC identity. The server shut down cleanly after `stop` at 18:40:53 and was left stopped. The original six-minute configuration was restored after shutdown: `enabled: false`, no arrival world, radius 100, duration 360 seconds, first prize 100 and four decoys. The ledger retains the three completed smoke rounds; no player balances or fictitious participation were added.

Local evidence is retained in `.scratch/hideandsheep-runtime/server-console-795-clean.log` and the smaller `hideandsheep-smoke.log` in the same directory.

## Test reward setup

The new CMI kit templates were copied to the maintained test server's `plugins/CMI/Kits/hideandseek.yml`. They contain ordinary items and remain disabled as direct public CMI kits. Hide and Sheep's controlled shop reads those templates. Kit claims require active CMI and the healthy inventory save-proof service supplied by active Forage; Forage Camp access is not required. Native point offers use the receiving feature's durable receipt service. A command dispatch return value is never delivery proof.

Packaged logical world defaults remain unchanged. Only the new local test configuration maps the actual maintained worlds:

| Logical world | Local world names |
| --- | --- |
| end | spawn_the_end |
| nether | spawn_nether |
| wild | wild |
| general | general, spawn |
| cave | cave |
| acid | acidisland |
| oneblock | oneblock |
| skyblock | bskyblock |
| skygrid | skygrid |
| chunkblock | chunkblock |

## Acceptance still required

These results establish compilation, automated behavior and native server lifecycle/spawn/cleanup checks. No real players were connected during the smoke test. Real Java and Bedrock client rendering, all six costumes and custom designs, the GUI and lore book, boss bars and sounds, protected-region touches, simultaneous finders, three-place and partial-timeout rounds, and actual reward delivery still require gameplay acceptance.

Reward acceptance must exercise each point provider and kit, full inventories, AutoSell on/off, mapped world changes, disconnect/reconnect, metadata preservation and interruption between transaction stages. The detailed checklist remains in [the development contract](../feature-contract-reviews/hideandsheep.md#verification-responsibilities) and the repository checklist. A live handoff must use `stageTestedJarsForLive` only after that acceptance; this report does not claim it has occurred.

## Owner gameplay follow-up

The owner joined the maintained Java 27.0.1 test server after the console smoke test. Two rounds completed with one participant, one finder and 100 points each: `5ebe38a5-8cf3-4cfe-87d8-fdc4a9bfffb4` ended at 19:36:46 and `3a149dd3-aaf6-4ed9-8c52-55b3a522b098` at 19:43:15. The screenshots and feedback confirm upside-down rendering, a successful first-place find, title and chat feedback. A native scale query independently identified the nearby decoy as scale 1.0.

This acceptance exposed a presentation defect: aiming at an upside-down sheep showed `Dinnerbone`, despite `setCustomNameVisible(false)`. The owner selected a private reveal: show `Woolbur` only to the player who has successfully found him. The [development contract](../feature-contract-reviews/hideandsheep.md#paper-api-review) records the exact API and vanilla client evidence behind the supported fix. The initial smoke results above remain historical and do not establish acceptance of this later nameplate change.

## Private nameplate fix, suite 796

The corrected implementation retains the literal inversion name internally, suppresses raw sheep names through an owned team on each viewer's actual scoreboard, and creates a non-persistent, hidden-by-default text display. Only a player in the round's committed finder list sees `Woolbur`, within six blocks and with line of sight. Decoys never receive the reveal. Scoreboard replacement, reconnect, externally removed display/team objects and cleanup are handled without replacing player scoreboards or changing unrelated player team memberships.

The new controller regression failed against the original implementation with the missing private text display, then passed after the fix. It pauses the actual ledger writer to verify that pending points do not reveal the name. Nine additional stateful helper tests verify whole-flock name suppression, finder visibility, range/obstruction/world changes, new connections with the same UUID, shared and replaced scoreboards, restoration of previous entity memberships, ownership collisions, stale teams, spawn failure and cleanup.

The canonical suite **796** completed in 4m 10s with **6,902 cases across 550 test classes**, **zero failures/errors**, and **41 skipped**. All **65 Hide and Sheep tests passed**. It compiled with JDK **25.0.5** against unchanged Paper **26.3 STABLE 222** and verified all **67** synchronized JARs. The new production and test code compiled without new warnings. Evidence is retained in `.scratch/hideandsheep-nameplate-{red,focused,module,build-all}.log` and `.scratch/hideandsheep-runtime/verification-796.json`.

The corrected feature artifact is `1MB-Lib-HideAndSheep-v1.0.4-796-j25-26.3.jar`, SHA-256 `3153f0140310881d831f3e61f8032dae545d167d38cdc1f3359244c8f89e3940`. Before restart, the maintained server's event configuration and ledger matched their pre-update backups byte-for-byte. Real-client acceptance of the new private label, including CMI scoreboard transitions and Bedrock rendering, remains required; server-side tests and inspected Java client behavior do not substitute for that check.

The maintained server restarted on Java **27.0.1+9-62**, completing startup at **19:53:02** in 19.558 seconds, without ERROR, SEVERE or Exception entries. At **19:53:12**, direct console status reported **READY, no round running**, with the owner's preparation retained: `spawn` at -83, 67, -86, radius 25, Disco Tumble, 180 seconds. No event was started by the update. Configuration remained byte-for-byte unchanged; startup rewrote ledger key ordering, but parsed content was identical, including two participations, two finds, 200 lifetime points and 200 available points. Startup evidence is retained in `.scratch/hideandsheep-runtime/server-start-796.log`.

## Finder wording, suite 797

Owner feedback identified that “remaining places” could suggest additional sheep. The first-finder announcement now explicitly says two more players can find the same Woolbur for second and third place; the second-finder announcement says one more player can find the same Woolbur for third. The final message confirms that three different players found him. The lore and both public guides likewise describe one real sheep shared by three distinct finders.

The text update passed all **65 feature tests** and the canonical suite **797**: **6,902 cases, zero failures/errors, 41 skipped**, with all **67 JARs** synchronized against unchanged Paper **26.3 STABLE 222** using JDK **25.0.5**. Evidence is retained in `.scratch/hideandsheep-copy-build-all.log` and `.scratch/hideandsheep-runtime/verification-797.json`. The feature artifact SHA-256 is `05a66f18ada67e56f74651e201221fb37d964ee1285916c32851b20df5973957`.

The Java **27.0.1** server completed startup at **20:00:24** without ERROR, SEVERE or Exception entries. Console status at **20:00:39** confirmed READY with no round running and the same retained preparation. The server was left running for the owner to start the next event.

## Decoy clearing and celebrations, suite 798

Decoys now clear globally once after a durable save. Each player's first decoy clear in a round earns exactly **3 bonus points**; subsequent clears remove further decoys without adding points. The bonus is independent of the real sheep's podium rewards. Participation is unique per round, `found` still counts only Woolbur, and lifetime/current points include bonuses. Public chat reports the clearing player's name and the remaining count; event history records clear counts and total bonus points. The GUI shows remaining decoys and the bonus rule. The lore now has twelve pages.

Successful finds and clears launch a disposable sheep with nearby sounds and particles, following Ghost Hunt's short rising animation pattern. The prop rises up to five blocks over 30 ticks and disappears; eight can animate concurrently. It is upright and unnamed, retains the selected scale/colour treatment, has no scoring identity, and cannot produce rewards, drops or XP. The real Woolbur stays until the round ends, while the cleared decoy is removed. Third-place celebration can finish after round completion; stop, disable, reload and world unload clean up props.

All **88 feature tests passed**, including ten decoy-ledger tests, nine celebration tests and four new controller scenarios. Evidence covers competing touches, same-player bonus limits, bonus plus podium points, zero-find sheep wins, deadline rejection, failed writes, interrupted callbacks, old spent balances/claims, malformed histories, effect failures, physical/cancelled movement, round cleanup and the final celebration surviving normal completion.

The canonical **798** build completed in 4m 12s with **6,925 cases across 552 classes**, **zero failures/errors**, and **41 skipped**. All **67 JARs** were synchronized against Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. The feature artifact SHA-256 is `611a3ced6c34b07346c855034fdd39163392f46fe9520dc908132243eab7e4dc`. Logs are `.scratch/hideandsheep-decoys-{module,build-all}.log`; counts are in `.scratch/hideandsheep-runtime/verification-798.json`.

The Java **27.0.1+9-62** server restarted successfully at **20:17:02** without ERROR, SEVERE or Exception entries. The actual schema-1 ledger upgraded to schema 2 with only the version and empty historical decoy fields added. Parsed comparison against the stopped-server backup confirmed identical wallets, claims and five historical events: two participations, two real finds, 200 lifetime points and 200 available points. The preparation file remained byte-for-byte unchanged. At **20:17:43**, console status reported READY, no round running; history displayed the new decoy/bonus totals correctly. Startup evidence is `.scratch/hideandsheep-runtime/server-start-798.log`.

No event was started by the update. Native client acceptance of the rising sheep, sounds/particles, real-time decoy clearing and private nameplate remains on the gameplay checklist. No live staging or deployment is included.

## Statistics tooltip layout, suite 799

The player-head footer and history item now render participation, finds, lifetime earnings and available points as four separate lore lines. Both use the same committed statistics snapshot formatter. The chat statistics command retains its compact line format.

Existing GUI tests passed, followed by canonical suite **799**: **6,925 cases, zero failures/errors, 41 skipped**, including all **88 Hide and Sheep tests**. All **67 JARs** were synchronized for Paper **26.3 STABLE 222**, built with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-lore-layout-{test,build-all}.log` and `.scratch/hideandsheep-runtime/verification-799.json`. The feature artifact SHA-256 is `daf22f81c09ac2b235a27f35276cfe7befe1b10156be9148d17b6858b57df394`.

The Java **27.0.1+9-62** server completed startup at **20:25:21** without ERROR, SEVERE or Exception entries. Console status at **20:28:36** confirmed READY, no round running, with the same retained preparation. The server remains running for the owner to start the next event; the revised tooltips still require client visual acceptance.

## Menu star placement, suite 800

The shared Hide and Sheep footer now places the shining `/menu` nether star in slot 52, directly left of the close barrier in slot 53, on every page. Subpage back arrows remain in slot 51. Existing GUI assertions cover the new position, border replacement, click action and reward confirmation footer. Both public guides describe the placement.

Focused GUI checks and canonical suite **800** passed: **6,925 cases, zero failures/errors, 41 skipped**, including all **88 Hide and Sheep tests**. All **67 JARs** were synchronized for unchanged Paper **26.3 STABLE 222**, built with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-menu-position-{test,build-all}.log` and `.scratch/hideandsheep-runtime/verification-800.json`. The feature artifact SHA-256 is `1961ff17c5948a3c81fad3ca8feba5f3f874ac9b92b5f2a389eb345932aafa15`.

The Java **27.0.1+9-62** server completed startup at **20:35:17** without ERROR, SEVERE or Exception entries. The feature is enabled and console status confirmed READY with no round running and the same retained preparation. The server is left running for the owner's next test; no event was started by the update.

## Lore book transition, suite 801

The reported instant close reproduced through the actual footer and real `GuiService`, with a tick-ordered scheduler and client book state: the callback trace was `book, close`, and the book was closed after all callbacks ran. The minimized single regression failed deterministically twice before the fix. The earlier GUI test mocked the close service and could only prove that `openBook` was called, so it missed the later close.

The footer scheduled book opening for the next tick but inventory closing three ticks later. Paper's book screen does not replace the server-side container, so the delayed close still applied. Both the book and adjacent `/menu` action now use the existing `runAfterCloseDelay` helper: validate the captured session, close it, then perform the action. Book permission and online status are checked again at execution. No shared GUI behavior or Paper internals were changed.

All eight new transition scenarios and the existing GUI tests passed. The tests cover the book staying open, close-before-open order, duplicate clicks, closing/replacing the menu, disconnect availability, lost permission, service shutdown, ordered `/menu` navigation and stale navigation rejection. The existing shared GUI tests additionally cover quit and world-change invalidation. Red/green evidence is retained in `.scratch/hideandsheep-book-{red,red-minimal,green}.log`. Native client reading/page-turn acceptance remains an owner gameplay check.

Canonical suite **801** passed in 4m 3s: **6,933 cases, zero failures/errors, 41 skipped**, including all **96 Hide and Sheep tests**. All **67 JARs** were synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-book-build-all.log` and `.scratch/hideandsheep-runtime/verification-801.json`. The feature artifact SHA-256 is `c120df4bed3038828940d82772e2fe695082cb0b77752edd40bfe53683f5abbb`.

The Java **27.0.1+9-62** server completed startup at **20:44:22** without ERROR, SEVERE or Exception entries. Console status confirmed READY with no round running and the retained preparation. The feature is enabled and the server is running for the owner to test the book and start the next event manually.

## Player event status, suite 802

Administrative `READY` previously appeared on the player event card after a round, despite there being no event to join. The card now says **No event running / Woolbur is resting**, explains that staff will announce the next round, and offers a quiet status check. Preparation and completion have **Starting soon** and **Round ending** descriptions. Only a currently joinable round shows **Join the live event** and the teleport invitation. `/sheep join` outside a live round gives informational guidance instead of an error.

The home card refreshes in place once per second while the feature is enabled, including when no round is running, and immediately on completion/interruption. Its existing click action rechecks current state, so expired clicks cannot travel and an initially idle card can join a subsequently live round. Inventory identity, other pages and shared click guards are preserved. Administrative commands and the raw state placeholder retain their compatible state names. Both public guides now explain these states.

Nine additional GUI cases cover dormant/ready descriptions, quiet inactive clicks, preparation, ending, expiry, unavailable storage, stale live clicks, initially idle actions becoming usable and idle-period in-place refresh. These and the prior feature tests passed before the final lifecycle check. Evidence is in `.scratch/hideandsheep-status-{red,green}.log`.

Review identified a dormant-to-active edge case: initialization replaced the still-live GUI service, preventing refresh of menus already open before activation. Initialization now reuses that service; the dormant callback creates a fresh service after shared owner cleanup has stopped the previous one. Three real-service lifecycle cases cover an open dormant menu becoming live in place and service replacement after active/already-dormant cleanup. The activation regression failed before the fix and passed afterward, with all 28 focused GUI, book and lifecycle cases passing. The first build attempt was interrupted before synchronization to incorporate this fix; the canonical retry retains reserved build 802.

Canonical suite **802** passed in 4m 3s: **6,945 cases, zero failures/errors, 41 skipped**, including all **108 Hide and Sheep tests**. All **67 JARs** were synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-status-build-all.log` and `.scratch/hideandsheep-runtime/verification-802.json`. The feature artifact SHA-256 is `eed110ae2fb45859d2c233049b10e43c97eb9d4616e32b3674825104f4abbce6`.

The Java **27.0.1+9-62** server completed startup at **21:00:10** without ERROR, SEVERE or Exception entries. The feature is enabled and administrative status confirms READY with no round running and the retained preparation. The server remains running for owner gameplay acceptance of the new player-facing wording and updates; no event was started by the update.

## Round announcement styling, suite 803

Start and finish chat announcements now have a bold aqua headline and an aqua detail line, matching the existing title colour, with a literal white blank spacer above and below. The normal feature prefix remains attached to the headline through its shared component renderer. Nonblank lines use shared chat delivery; aqua is preserved by that palette. Only blank white spaces use direct component delivery, so the requested spacer colour is not normalized. Finder and decoy notices retain their compact presentation. The public guides and private presentation contract describe the change. Client appearance remains an owner gameplay check.

Canonical suite **803** passed in 4m 3s: **6,945 cases, zero failures/errors, 41 skipped**, including all **108 Hide and Sheep tests**. All **67 JARs** were synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-announcements-build-all.log` and `.scratch/hideandsheep-runtime/verification-803.json`. The feature artifact SHA-256 is `310cb72ad11789325fa7fb643dd4945e67cddc5be5da64d6e44c561d08db724f`.

The Java **27.0.1+9-62** server completed startup at **21:08:02** without ERROR, SEVERE or Exception entries. Hide and Sheep is enabled; administrative status confirmed READY, no round running, with the retained preparation. The server is running for the owner to start the next event and review the announcements in game.

## Reward categories and contents, suite 804

The reward shop now has separate labelled sections: three point exchanges in slots 20/22/24 and five item kits in 37/38/40/42/43. Grouping follows reward kind even when offers are disabled. Empty categories have non-actionable explanatory labels. Border and footer navigation retain their established positions.

Shop and confirmation lore identify reward type, cost in Hide and Sheep points, and what is received. Point offers display their configured amount and receiving feature balance. Item kits preview current validated in-memory CMI templates, including quantities and authored/material names, without accessing or mutating player inventories. All supplied kits fit the six-stack preview; larger customized kits display an omitted-stack count. Lines are bounded to 48 Unicode code points. Missing or invalid kits report unavailable contents rather than promising default items.

Confirmation retains the full immutable template snapshot shown to the player. A changed CMI instance, kit identity, quantity or item metadata, including stacks omitted from the short preview, rejects before inventory preparation or point reservation. An unavailable preview cannot become an unreviewed purchase when its provider later appears. Existing delivery-time revalidation and durable claim states remain in place.

All **126 Hide and Sheep tests passed** before the canonical build. Coverage includes grouped/disabled/empty categories, configured point amounts, preview and confirmation consistency, unavailable templates, read-only previews, custom names/Unicode bounds, full inventories, exact unchanged delivery and stale kit/provider/metadata rejection before spending. Evidence is in `.scratch/hideandsheep-reward-layout-module.log`. Public guides and private contracts describe the new behavior; native GUI appearance remains an owner acceptance check.

### Woolbur kit cosmetics, configuration only

The five CMI templates now decorate 11 of their 27 item stacks with light-blue Woolbur-themed names and one or two short lore lines. Only the standard custom-name and lore components were added. Validation preserved every material, amount, slot, kit setting and disabled ordinary-kit flag; no identity/PDC components were introduced. Source and installed configurations were backed up under `.scratch/hideandsheep-kit-cosmetics/before/` and match after installation.

CMI's supported configuration reload completed on the running Paper 26.3 test server at 21:50:05 Europe/Amsterdam, loading all 195 kits without parsing exceptions. CMI has no dedicated `reload kits` branch in installed 9.8.10.5; its normal reload refreshes the kit manager along with other CMI configuration. This configuration-only update leaves the tested suite at build 804. No reward claims or event starts were performed by the agent. Validation and reload evidence are in `.scratch/hideandsheep-kit-cosmetics/{validation,runtime}.json`. Actual tooltip appearance remains an in-game acceptance check; `/forage admin kits preview <kit-id>` provides a read-only preview without spending points.

Canonical suite **804** passed in 4m 6s: **6,963 cases, zero failures/errors, 41 skipped**, including all **126 Hide and Sheep tests**. All **67 JARs** were synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Evidence is in `.scratch/hideandsheep-reward-layout-build-all.log` and `.scratch/hideandsheep-runtime/verification-804.json`. The feature artifact SHA-256 is `458877a4d9840e97067163ac9c63ccada1bf920f3f2017a70f29277fded024b8`.

The Java **27.0.1+9-62** server completed startup at **21:24:19** without ERROR, SEVERE or Exception entries. Hide and Sheep is enabled, and administrative status confirms READY with no round running and the retained preparation. The server remains running for the owner to inspect `/sheep rewards`; no event or reward claim was triggered by the update.

## Additional point exchanges

The API review for AutoSell Broker Points and Appreciation Points used a fresh fetch of the live [PaperMC LLM index](https://docs.papermc.io/llms.txt), followed by the [service registry Javadocs](https://jd.papermc.io/paper/26.3/org/bukkit/plugin/ServicesManager.html) and [scheduling guide](https://docs.papermc.io/paper/dev/scheduler/). The retrieved Javadocs carried older build labels, so the relevant signatures were corroborated against official commit `e3ba7b1dc801e0c385051c34781ab30b226abee3` for Paper 26.3 STABLE 222.

The two new configurable offers default to 100 Hide and Sheep points for one AutoSell Broker Point, and 200 for one Appreciation Point. Five point offers occupy slots 19/20/22/24/25 above the unchanged kit row. Both shop and confirmation show the configured quantity, cost, receiving balance and spending purpose. Native providers use the actual player UUID and original transaction UUID, without commands or synthetic sale/streak progress. AutoSell stores permanent credit receipts beside its balance and native journal; Appreciation schema 3 saves the balance, lifetime total and credit receipt atomically. Provider failures and absent historical proof never authorize duplicate delivery.

Focused verification passed all 130 Hide and Sheep, 370 AutoSell and 38 Appreciation tests. Coverage includes service routing, configured GUI amounts, missing/inactive/rejecting providers, one debit per request, identity conflicts, reload/restart receipts, journal compaction, concurrent sales/quests/shops/streaks, overflow, malformed files, interrupted saves and shutdown. An independent review found no additional AutoSell durability issue. Appreciation reactivation is blocked while a retired storage executor is still settling, preventing overlapping writers across activations. The maintained server was cleanly stopped before the canonical build; coherent pre-upgrade configurations, states and native journals are backed up under `.scratch/hideandsheep-extra-exchanges/before-805/`.

Canonical suite **805** passed in 4m 9s: **6,993 test cases, zero failures/errors, 41 skipped**, including build-logic tests. All **67 JARs** synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. The first attempt caught an outdated expected optional-dependency list in the identity contract; it was aligned with the two new integrations and the canonical retry reused reserved build 805. Evidence: `.scratch/hideandsheep-extra-exchanges-build-all.log` and `.scratch/hideandsheep-runtime/verification-805.json`. Hide and Sheep SHA-256: `9ee62974937d2ef9b498a53cc71c08cb61955b3ac347172c7b3bef3e8d95acbc`.

The maintained server started successfully on **Java 27.0.1+9-62** at 22:11:31 Europe/Amsterdam, listening on port 22332, with no ERROR/SEVERE/exception entries. Both offers loaded at the configured default rates. Hide and Sheep remained enabled with no round running; prepared spawn, radius, costume and duration were unchanged, as was its complete ledger. Appreciation migrated to schema 3 with its prior gift receipts/profiles preserved and storage available; AutoSell profiles and themed CMI kits were preserved. No player balances were spent or credited by the agent. Actual GUI appearance and one legitimate claim of each new offer remain owner gameplay acceptance checks. No live deployment or staging was performed.

Exact [ServicesManager source](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-api/src/main/java/org/bukkit/plugin/ServicesManager.java) confirms that registration, enumeration and owner cleanup remain supported. Enumerate `FeaturePointCreditService` registrations and match `featureId`; `load(Class)` selects only the highest-priority provider. Avoid checking `isProvidedFor(Class)` before a separate `load(Class)` lookup.

Exact [BukkitScheduler source](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-api/src/main/java/org/bukkit/scheduler/BukkitScheduler.java#L210) confirms the nondeprecated `runTask(Plugin, Runnable)` continuation route. Provider admission and Bukkit/player state access remain on the main thread; immutable receipt and balance writes run asynchronously. Completion must return to the main thread before any further player or GUI work. These references record API review only; build and runtime outcomes are recorded separately.

## Per-decoy rewards

The owner changed the rule to **3 points for every distinct decoy cleared**, with no per-player round cap. Each decoy still clears and pays only once globally. One player can clear all four default decoys for 12 points and earn 112 if they also find Woolbur first. Total possible default-round issuance remains 187 (100+50+25+4×3), so the configured 100-point Broker and 200-point Appreciation exchange rates remain unchanged. Decoy clears still count as participation without increasing the Woolbur-found statistic. Public clear messages report the actual award and remaining count; the home card and twelve-page book describe the new rule.

Sheep ledger schema 3 adds `events.<uuid>.decoy-bonus-policy`: new rounds use `PER_DECOY`, while migrated schema 1/2 events use `ONCE_PER_PLAYER`. Their original three-point and zero-point clear records, balances, earned totals, and claims remain unchanged. Migration does not grant retroactive points. Invalid or inconsistent policy data fails closed, and previously live rounds still close as interrupted on startup. Earlier suite-798 observations above document the old rule and remain historical evidence.

The public guides, private contract, and current manual acceptance checklist now reflect per-decoy awards, duplicate-clear rejection, the 112-point example, and preservation of legacy awards.

All **134 Hide and Sheep tests** passed. Coverage includes four solo clears plus first place yielding 112 across reload, competing touches paying only one clearer, duplicate touches producing no additional award or message, one public three-point notice for each distinct clear, and preservation of a schema-2 wallet with 303 lifetime points, 268 spendable points and its finalized 35-point claim. The controller message regression test failed against the old duplicate/stale messaging before the chat change and passed afterward. Independent storage review found no actionable issue.

Canonical suite **806** passed in 4m 10s: **6,997 test cases, zero failures/errors, 41 skipped**, including build-logic tests. All **67 JARs** matched their built artifacts and synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Evidence: `.scratch/hideandsheep-per-decoy-build-all.log`, `.scratch/hideandsheep-per-decoy/verification-806.json` and `.scratch/hideandsheep-per-decoy/migration-806.json`. Hide and Sheep SHA-256: `6028afa4286bb1bd3e6335be858f08adca4d55e5ec589ad63f4a4fc78453b962`.

The maintained test server started on **Java 27.0.1+9-62** at 22:23:11 Europe/Amsterdam, with no ERROR/SEVERE/exception entries. Its six historical event records, complete player and claim ledgers, and prepared configuration were compared with the coherent backup under `.scratch/hideandsheep-per-decoy/before-806/`; only the schema version and explicit legacy event policy changed. Hide and Sheep remained enabled and idle, with the prepared spawn, radius, costume and duration intact. No round was started and no historical points were credited retroactively. In-game acceptance of the new per-decoy rule remains with the owner; no live staging or deployment was performed.

## Round-ending cleanup

The review refreshed the live [PaperMC LLM index](https://docs.papermc.io/llms.txt), then checked the [boss-bar guide](https://docs.papermc.io/adventure/bossbar/), [scheduling guidance](https://docs.papermc.io/paper/dev/scheduler/), and exact Paper 26.3 STABLE 222 source at commit `e3ba7b1dc801e0c385051c34781ab30b226abee3`. The [entity removal API](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Entity.html#remove()) and [chunk-ticket API](https://jd.papermc.io/paper/26.3/org/bukkit/Chunk.html#removePluginChunkTicket(org.bukkit.plugin.Plugin)) support the existing main-thread cleanup; a plugin ticket remains until explicitly removed. The scheduler Javadoc cache carried an older build label, so cancellation was checked against exact [BukkitTask source](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-api/src/main/java/org/bukkit/scheduler/BukkitTask.java).

Two defects were reproduced before their fixes. First, an already admitted find or decoy write could complete after stop began and restart a celebration or announce that other players should keep searching. Three pre-fix cases failed in `.scratch/hideandsheep-endings-red.log`. Completion callbacks now preserve committed awards and final summary totals while suppressing new effects, name reveals and finder/decoy notices when `ending` is true. A third-find commit that already finalized the round still completes once without duplicate cleanup. The expanded regression covers both admin stop and timeout while writes are pending.

Second, a player leaving mid-round remained in the boss bar's audience because final cleanup visited only online players. The quit regression failed before the handler existed, recorded in `.scratch/hideandsheep-endings-quit-red.log`. Exact [CraftPlayer source](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-server/src/main/java/org/bukkit/craftbukkit/entity/CraftPlayer.java#L2937) tracks shown bars, and [BossBarImplementationImpl](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-server/src/main/java/io/papermc/paper/adventure/BossBarImplementationImpl.java#L27) removes viewers only through the hide path; CraftPlayer disconnect does not perform this cleanup. A synchronous `MONITOR` handler now hides the current bar in the supported [PlayerQuitEvent API](https://jd.papermc.io/paper/26.3/org/bukkit/event/player/PlayerQuitEvent.html). Reconnecting after completion does not show the old bar. This fixes retained audience membership; it was not a reproduced client-side countdown reappearance.

All **153 Hide and Sheep module tests passed** after the fixes; evidence is in `.scratch/hideandsheep-endings-module.log`. Deterministic coverage includes zero-finder expiry, expiry after a decoy clear, one-finder expiry, admin stop, saved awards and summary outcomes, removal of remaining sheep/nameplates/bars/chunk tickets, clearing pending state, quit/rejoin, and late callbacks. Existing celebrations may finish within 30 ticks after normal completion; admin stop clears them immediately. Idle controller ticks continue solely for enabled-feature work such as GUI refresh and do not resurrect the round.

Canonical suite **807** passed in 4m 14s: **7,016 test cases, zero failures/errors, 41 skipped**, including build-logic tests. All **67 JARs** matched their built artifacts and synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Hide and Sheep SHA-256: `8635e9d2f8798dba3f19a63de03d23d4080160d5fee174d94708a808271f5e42`. Evidence: `.scratch/hideandsheep-endings-build-all.log` and `.scratch/hideandsheep-endings/verification-807.json`.

The maintained server started cleanly on **Java 27.0.1+9-62** at 22:58:09 Europe/Amsterdam. Before rehearsal, its full ledger and configuration matched the coherent backup under `.scratch/hideandsheep-endings/before-807/`. With zero players online, only the duration was temporarily changed from 180 to 30 seconds. Two native rounds exercised the existing prepared location and design:

- `2c66ad5a-416c-4ee6-a77d-aa994924b20d` ran from 22:58:28 to 22:58:58 and saved `SHEEP_WINS` with zero participants, finds, clears and points. Native selectors identified all five sheep by the exact round PDC and captured the nameplate entity UUID while live. After expiry, absence checks passed for both the owned sheep and that exact nameplate.
- `e0fca9cf-0b74-4f1f-b794-37745cc25a85` started at 22:59:19 and was explicitly stopped at 22:59:36. The same five-sheep and exact-nameplate checks passed before and after; the saved outcome was `STOPPED` with zero participation and points.

The original 180-second duration was restored. The complete prepared configuration, all six previous event records, player statistics and claims remain unchanged; the two empty rehearsal records were retained as audit history. The existing player still has 303 lifetime points and 268 spendable points. No round remains live and no automatic restart occurred. Native evidence is retained in `.scratch/hideandsheep-endings/native-807.log` and `.scratch/hideandsheep-endings/native-rounds-807.json`; startup and rehearsal produced no ERROR/SEVERE/exception entries.

Acceptance scope: timeout and explicit stop were exercised on the actual Paper server. One-finder expiry, retained awards across reload, simultaneous ending callbacks, boss-bar hide calls, quit/rejoin, chunk-ticket release and animation retirement were exercised by automated controller/store/celebration tests. No connected client was used in these two native rounds, so Java/Bedrock visual acceptance of countdown disappearance and animation rendering remains separate. No live staging or deployment was performed.

## Pocket Snacks reward

Added the repeatable `pocket-snacks` offer: **6 Hide and Sheep points** for `hideandseek_pocket_snacks`, shown as **Woolbur's Pocket Snacks** with a cookie icon. The disabled ordinary-CMI template supplies exactly two **Woolbur's Pocket Cookies** and one **Woolbur's Crunchy Apple**, each with short cosmetic lore. Only custom name and lore components are added; there are no reward-item identity markers or commands. The previous five kits are unchanged. Six kits now fit in slots 37/38/39/41/42/43 below the unchanged point-exchange row.

All **154 Hide and Sheep tests passed**. The new purchase regression starts with an empty wallet, earns six points from two distinct decoys, buys the snack kit through the existing inventory proof flow, then repeats with another six earned points and a separate finalized receipt. It verifies exact quantities, metadata preservation, six-point debits, zero remaining balance and zero Woolbur finds. GUI checks cover all six visible kit offers and the new kit's cost and contents in both shop and confirmation. Source YAML validation confirms that only this kit was added and its components are cosmetic.

Canonical suite **808** passed in 4m 18s: **7,017 test cases, zero failures/errors, 41 skipped**, including build-logic tests. All **67 JARs** matched their built artifacts and synchronized against unchanged Paper **26.3 STABLE 222**, compiled with JDK **25.0.5**. Hide and Sheep SHA-256: `10f559c7eadf6018c68d17d49e36da5b572a4fd8ca0431f54d547e237ce15fbb`. Evidence: `.scratch/hideandsheep-pocket-snacks-build-all.log` and `.scratch/hideandsheep-pocket-snacks/verification-808.json`.

With the maintained server stopped, the prior configuration, ledger and installed kit file were backed up under `.scratch/hideandsheep-pocket-snacks/before-808/`. The updated kit file was installed separately from suite JAR synchronization. Startup completed on **Java 27.0.1+9-62** at 23:09:21 Europe/Amsterdam, with no ERROR/SEVERE/exception entries. CMI loaded 196 kits, up from 195. The saved new offer is enabled at cost 6 and points to the new template; existing configuration, all eight event records, player balances, claims and the other five kit definitions remain unchanged. Hide and Sheep is enabled and idle with the original 180-second preparation. No player was credited, charged or granted items during deployment. Connected-client preview/purchase remains owner gameplay acceptance; no live staging or deployment was performed.

## Saved event setups

Added `/sheep admin setup` and the **Saved setups** admin menu, with named save/load/replace/delete commands. Up to 50 setups retain the exact arrival world, position and direction, radius, duration, first-place points, decoy count and costume. Saved costumes retain their values across future preset changes. Loading updates preparation only; it never enables, teleports, or starts an event. New names use the typed command or the menu's delayed chat suggestion; existing entries offer review and explicit replacement/deletion confirmations. Player statistics and reward configuration are outside these snapshots.

The live Paper documentation index, official custom-holder/scheduling guidance, and exact build-222 inventory-click source were reviewed; references are in the [private contract](../feature-contract-reviews/hideandsheep.md#paper-api-review). The implementation uses the existing session-guarded GUI and serialized configuration writer, with conditional atomic writes that reject stale preparation, changed saved lists and external disk edits. Malformed saved entries fail closed. No new experimental, deprecated or internal API was introduced.

All **198 Hide and Sheep tests passed**, including **44 new setup model/controller cases**. Coverage includes every preset and custom costume, persisted round trips, name normalization and duplicate rejection, bounds/malformed records, replacement/deletion, 50-entry limit, unavailable worlds/borders/heights, queued write failures and stale changes, console use, pagination/footer, permission revocation, cancelled confirmations, and no automatic enable/start/terrain loading. Evidence: `.scratch/hideandsheep-setups-focused.log` and `.scratch/hideandsheep-setups-module.log`.

Canonical suite **809** passed in **4m 16s**: **7,061 test cases, zero failures/errors, 41 skipped**, across 559 suites including build logic. All **67 JARs** matched the built artifacts and synchronized against unchanged **Paper 26.3 STABLE 222**, compiled with **JDK 25.0.5**. Evidence: `.scratch/hideandsheep-setups-build-all.log` and `.scratch/hideandsheep-setups/verification-809.json`, which retains artifact SHA-256 hashes.

The maintained test server restarted on **Java 27.0.1+9-62** at **23:22:40 Europe/Amsterdam**, without ERROR/SEVERE/exception entries. Native console verification saved **Codex Setup Check**, changed the current radius from 25 to 50, reloaded the feature, listed the retained setup, and loaded it. Loading restored the entire original preparation exactly, including the custom design and direction. The temporary setup was then deleted. Final status was **READY, no round running**, with the original spawn location, radius 25 and duration 180 seconds.

Semantic comparisons against the stopped-server backup in `.scratch/hideandsheep-setups/before-809/` confirm all original configuration is unchanged except the new empty `saved-setups` list, and the complete progression/event/claim ledger is unchanged. No event was started and no player was credited, charged or granted items. Native evidence is in `.scratch/hideandsheep-setups/native-809.log`. Connected Java/Bedrock GUI and chat-suggestion acceptance remains separate; no live staging or deployment was performed.

## Gathering countdown

Added an optional gathering phase with **120 seconds by default**, configurable through `/sheep admin gathering <0–600>` or the admin bell. Explicit staff start validates the arrival and hiding area, saves the gathering event, announces that Hide and Sheep is live and Woolbur will hide after the countdown, and opens event teleporting. The boss bar and GUI show arrival time. No scoring sheep spawn during gathering. Successful arrival records participation once in the same event; searching and point awards remain locked until the separately saved search phase.

At countdown expiry the controller checks the arrival again and selects fresh safe hiding spots. The search receives its full configured duration and a new announcement. Setting gathering to 0 retains immediate search after preparation. Stop, reload, disable, world unload and restart cancel the pending outing rather than resuming it later. Late persistence or teleport callbacks cannot resurrect it. Countdown cancellation is not a sheep win.

Saved setups now use schema 2 and retain their gathering duration. Schema-1 setups adopt 120 seconds without changing their previous fields. Event ledger schema 4 adds `search-started`, preserving the original gathering start and rejecting pre-search touches even if processed after transition. Older historical records migrate with search start equal to their original start; rewards, bonus policies and claims remain unchanged. The nine placeholders include separate `gathering_left` and search-only `time_left`; `live` includes gathering. The twelve-page lore book and public/private documentation describe both phases. The official scheduler/teleport guidance and exact Paper 222 source were reviewed as recorded in the private contract.

All **236 Hide and Sheep tests passed**, including 38 added cases across gathering persistence, controller/GUI behavior and setup migration. Coverage includes early-score rejection, same-event participation, the full search duration, zero countdown, cancellation before and during durable activation, failed writes, restart recovery, obstructed arrival, quit/rejoin boss-bar behavior, GUI navigation, placeholders and legacy data preservation. Evidence: `.scratch/hideandsheep-gathering-module.log`.

Canonical suite **810** passed in **4m 17s**: **7,099 test cases, zero failures/errors, 41 skipped**, across 560 suites including build logic. All **67 JARs** matched their built artifacts and synchronized against unchanged **Paper 26.3 STABLE 222**, compiled with **JDK 25.0.5**. Evidence: `.scratch/hideandsheep-gathering-build-all.log` and `.scratch/hideandsheep-gathering/verification-810.json`, including artifact SHA-256 hashes.

The maintained server restarted on **Java 27.0.1+9-62** at **23:35:55 Europe/Amsterdam**, with no ERROR/SEVERE/exception entries. Native no-player rehearsal covered two rounds:

- `a9fb5d07-acf4-4c8a-90ab-d92ebbce76cd` opened with the default 120-second gathering at 23:36:13. Status showed GATHERING, teleporting open and 1:48 remaining. A native selector confirmed no sheep carrying that round identity. Staff stop at 23:36:37 saved STOPPED with no search start, sheep identities, participants or awards.
- `d7b940c1-0a9b-4ee3-b0bf-e231ca3c6d87` used a temporary three-second gathering at 23:36:51 and transitioned to searching at 23:36:54 under the same identity. Its search deadline was exactly 180,000 milliseconds after search start, retaining the locally configured full 180 seconds. A native selector found all five event sheep; stop at 23:37:22 and a subsequent absence check confirmed cleanup. No points or player activity were recorded.

The countdown was restored to **120 seconds**. Semantic comparisons with `.scratch/hideandsheep-gathering/before-810/` confirm all original configuration remains unchanged except the new countdown setting; all eight historical events, player statistics and claims remain intact after schema migration. The two empty rehearsal records are retained as audit history. Final status is **READY, no round running**, with the original location, radius, costume and search duration. Native evidence is in `.scratch/hideandsheep-gathering/native-810.log`. Connected Java/Bedrock visual and teleport acceptance remains separate from the automated tests and console rehearsal. No live staging or deployment was performed.
