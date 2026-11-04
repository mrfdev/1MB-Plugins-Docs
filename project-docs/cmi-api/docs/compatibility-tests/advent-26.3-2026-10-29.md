# Advent expansion verification, October 29, 2026

This extends the [October 28 baseline](advent-26.3-2026-10-28.md) with the settings confirmed during the owner interview. The [delivery plan](../plans/advent-2026.md) retains the complete checklist and remaining owner decisions. The [plugin reference](../plugins/advent.md) describes the current command surface.

## Gameplay layout correction: build 826, October 29

The owner's in-game screenshots showed that Advent filled unused content slots with panes and placed the summary head on the top row. Build **826** uses light-blue panes only on the outer border, puts the player summary at bottom-left (45), and moves submenu back arrows to 51 beside the server-menu star and close barrier. Kindness pages follow the same frame and postcard-summary placement. The 24-present tree, its bottom-row trunk, pagination and the central overview help book retain their positions. Empty slots remain protected by the existing managed inventory holder/session and cancellation behavior.

- `scripts/build-all.sh` passed the clean full suite and synchronized **68 matching JARs**. **7,763 tests**, zero failures/errors, **41 skipped**; **213 Advent tests** passed, with 24 build-logic tests also passing. The existing right-click/visit-authority test fixture was updated for the shared player head. No new layout-only test suite was added.
- Compiler/Gradle: installed Oracle **25.0.5.0.3** at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`. Tests/Paper: installed Oracle **27.0.1.0.3** at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. Wrapper discovery remains dynamic; every own production class in the 68 artifacts is Java 25 bytecode (major 69).
- Canonical latest-stable selection advanced Paper **26.3 build 227 → 230**, with exact API `26.3.build.230-stable`. The [official comparison](https://github.com/PaperMC/Paper/compare/7f9c79794e16e8fb13582e66ae38c4cf074481cf...804dd0c3f08b666dc51a0250257915c002c59755) contains fire-contact damage-event attribution, cancelled splash-potion fire-extinguishing behavior, and tree-type mapping changes. There are no inventory API or configuration/default changes in that comparison. The live [documentation index](https://docs.papermc.io/llms.txt), [holder guidance](https://docs.papermc.io/paper/dev/custom-inventory-holder/), [inventory click API](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html), [profile API](https://jd.papermc.io/paper/26.3/org/bukkit/inventory/meta/SkullMeta.html) and [roadmap](https://docs.papermc.io/paper/dev/roadmap/) were reviewed. No API/deprecation migration was needed for the layout change.
- Native Paper 230 startup enabled Advent 826 successfully, followed by a graceful shutdown and stopped-server verification. The server was then restarted for the owner's continuing gameplay acceptance at `localhost:22332`. The live server was untouched. The normal restart retained local player/world/plugin data; the earlier build-825 snapshot restoration was not repeated over the owner's new test session.
- Client-side visual acceptance of the new layout remains with the owner. Earlier native actor/book/reward probes below describe build 825 and were not repeated for this presentation-only change. Existing broad-suite deprecation/reflection warnings remain; no new Advent production warning was reported.

Evidence: `.scratch/advent/gui-layout-2026-10-29/` contains the canonical build log, toolchain selections, all 68 artifact hashes/bytecode and test totals in `verification.json`, and the Paper 230 start/stop log.

## Completed local build 825, October 29

The agreed coding scope was implemented and locally verified in build **825**, with the extra-home integration still explicitly held for Zrips. The later build-826 presentation correction is recorded above; this section retains the broader build-825 native checks.

### Build and automated checks

- Canonical `scripts/build-all.sh` completed a clean build and synchronized all **68 managed JARs** to the stopped maintained local server. Latest stable Paper remains **26.3 build 227**, with compile API `26.3.build.227-stable`. Every installed JAR matches its produced SHA-256 and all own production classes target **major 69 / Java 25**.
- Active suite: **7,763 tests**, **0 failures**, **0 errors**, **41 skipped**. Advent: **213 passed**, none skipped. Boosters: **18 passed**. The build-logic gate retains **24 passing tests**.
- Build/compiler: Oracle **25.0.5.0.3**, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`. Automated tests and local Paper: Oracle **27.0.1.0.3**, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`. Both vendors were verified as **Oracle Corporation**, and the canonical wrappers discover installed paths dynamically on every invocation.
- New verification covers exact postcard revisions, POS1-to-POS2 migration, deferred moderator alerts across reload, offline author delivery across year rollover, archive freeze/retention, full inventories, repeated requests, uncertain delivery recovery, preview isolation, revoked permissions, disconnect/world changes and safe actor movement. Two final boundary tests cover teleport listeners starting a reload or disabling the plugin.
- No Advent production deprecation warnings were reported. Existing wider-suite deprecation, native-access and test-reflection warnings remain separate from this change.

### Newly completed behavior

Private postcard notifications now include saved submissions/resubmissions, one pending-count reminder per moderator login, and durable approval/rejection notices to authors. Rejection reasons remain plain text. A crash after sending a chat notice but before saving its acknowledgement can repeat that informational notice; it cannot repeat a reward.

The passport page and `/advent passport download` deliver a signed snapshot with actual unlocked days, cumulative earned stamps and the Mitten Finder badge only when earned. Staff use `/advent admin export book <year> <all|stories|community|day|kindness> [day/volume]` for retained seasonal books, including after closure. Story editions freeze at Amsterdam New Year, and later configuration changes cannot replace that season’s final edition. Kindness exports contain only currently approved notes. Passport/export receipts have separate `audit` and evidence-based `resolve` controls; unknown delivery outcomes remain pending rather than replaying inventory effects.

`/advent admin move <id>` relocates a loaded native mannequin to the administrator’s loaded Santa location without replacing its UUID. Quest progress and actor appearance remain intact. The command rejects unsuitable entities, worlds, destinations and stale authority, and safely handles cancellation, redirected teleports and plugin lifecycle changes.

### Native local Paper checks

The exact **build-825 / Paper 26.3-227 / Oracle 27** combination completed two clean local start/stop runs, bound only to `127.0.0.1:22332`:

- Signed passport books preserved the Floodgate-style name, six non-consecutive unlocked days, earned-only stamps and optional badge through native component/PDC serialization.
- All 25 archived story-book designs preserved native signed-book components through serialization.
- Existing present-tree layout, managed holder identity, decoration/firework bundles, 26 CMI test fixtures, virtual mitten ownership/cleanup, configuration reload and actual mcMMO 1x readback passed again.
- Native mannequin relocation preserved UUID, position, pose and equipment. A separately tagged temporary persistent mannequin was moved, saved by normal clean shutdown, and checked after restart. Its exact UUID, position, facing, pose, scale, profile, equipment and persistence flags survived. Only the uniquely tagged test entity was removed.

No real player reward, entitlement, postcard or booster was triggered. The temporary probe JAR and entities were removed. The test server is **stopped**. The original local calendar was restored with `season.live: false` and empty actor bindings.

### Preservation and evidence

After shutdown, **851 pre-existing feature/CMI/Multiverse files** and **1,475 world files** were restored from fresh local snapshots and SHA-256 verified. World session-lock bytes are excluded from world content comparison. This includes existing Halloween, Doors, GhostHunter, Coconut Hunt, Sheep and Advent state. **489 unrelated source/config fixture files** also retained their original hashes. The complete 68-JAR build-825 set was verified again after restoration.

No live-server connection, command, write, restart or deployment occurred in this completion pass. Local snapshots and runtime evidence are under `.scratch/advent/completion-2026-10-29/`; the temporary native probe source/compiler record and verified restart marker are under `.scratch/advent/completion-probe/`. Key files are `build-all.log`, `verification.json`, `toolchains.txt`, `paper-smoke-persist.log`, `paper-smoke-restart.log`, `runtime-preservation-report.json`, `source-preservation.json` and their fresh backup manifests. Build 824 was an intermediate clean pass; the final lifecycle fix and all final verification belong to build 825.

### API evidence and remaining acceptance

The live [Paper documentation index](https://docs.papermc.io/llms.txt), [scheduling guide](https://docs.papermc.io/paper/dev/scheduler/), [item component guide](https://docs.papermc.io/paper/dev/data-component-api/) and [teleportation guide](https://docs.papermc.io/paper/dev/entity-teleport/) were reviewed. The public `/26.3/` Javadoc alias served earlier-build labels and the explicit build-227 Javadoc URL was unavailable; compilation against the exact 227 API artifact and native 227 checks supplied the build-specific verification.

Human Java/Floodgate gameplay and rendering acceptance, real provider payout scenarios, final kit contents, the approved story roster/connected chapters, actor placement, tree lighting and the photo backdrop remain in the [todo list](../plans/advent-2026.md). The extra-home reward remains unavailable pending Zrips. Paper 26.4 remains a separate upgrade review and test gate when available.

## Historical overnight baseline: build 823

## Implementation scope

Independent frozen bonus entitlements and quest rewards, explicit additive kit policy, approved point choices, hidden-minimum coin presentation, physical signed chapters, native decorative-head and fireworks bundles, the persistent mcMMO contribution queue, postcard moderation and physical books, passport stamps, manual account eligibility, community milestone reservations and cosmetic overlays, and virtual Missing Mitten discovery are implemented. The permanent extra-home adapter remains deliberately unavailable pending Zrips.

New state belongs to Advent. Its queue delegates only bounded execution ownership to the Boosters feature; no Halloween, GhostHunter, Doors, Coconut Hunt or Sheep ledger is a migration source. Private rehearsals never dispatch real rewards, publish real postcards, add public community progress or contribute real boosters.

## API review

Discovery used the live [Paper LLM index](https://docs.papermc.io/llms.txt), followed by the official [scheduler](https://docs.papermc.io/paper/dev/scheduler/), [custom inventory holders](https://docs.papermc.io/paper/dev/custom-inventory-holder/), and Paper 26.3 Javadocs for [Display](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Display.html), [Interaction](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Interaction.html), [BlockDisplay](https://jd.papermc.io/paper/26.3/org/bukkit/entity/BlockDisplay.html) and [PlayerInteractAtEntityEvent](https://jd.papermc.io/paper/26.3/org/bukkit/event/player/PlayerInteractAtEntityEvent.html). The rendered Javadocs identified older 26.3 builds, so the relevant display and interaction methods were corroborated against the installed exact build-227 API JAR with `javap`. No documentation snapshot is vendored into the repository.

Community lamps are fully bright cosmetic display entities, not block-light changes. The once-only celebration uses bounded firework particles and sound. It causes no damage and replaces no world blocks. The hidden mitten is an exact-UUID interaction hitbox with three owned display parts; discovery gives no item.

The booster integration uses supported mcMMO commands and `%mcmmo_xprate%` readback through PlaceholderAPI. Its ownership and uncertain-start limits are documented in [Boosters](../plugins/boosters.md#advent-execution-ownership). Direct third-party API writes to the identical numeric rate cannot convey replacement ownership.

## Verification status

Focused Advent and Booster suites passed before the canonical build. A separate read-only review found and fixed three ownership defects: unauthorized or malformed rate commands abandoning ownership, persistence failures disabling known-active expiry, and a two-tick suppression window hiding an external replacement. Regression tests cover command authorization and activation-write failure; synchronous dispatch scoping removes the suppression window.

The first canonical attempt exposed repository-contract updates required for the added optional dependency, new shared-menu consumer and stable mitten PDC namespace. The dependency inventories and reviewed feature addition were aligned; the historical build-569 fixture was preserved. The namespace is explicitly `onemb_advent`, independent of the Paper primary plugin name.

### Canonical suite result

`scripts/build-all.sh` completed **build 823** against the latest managed **Paper 26.3 STABLE build 227**, API `26.3.build.227-stable`. All **68** managed JARs are active, share build 823 and match the produced SHA-256 bytes. Own production classes in every JAR use class-file major **69**, Java 25. No live handoff was staged.

- Active suite: **7,713 tests, zero failures/errors, 41 skipped**.
- Advent: **163 tests, all passed**.
- Boosters: **18 tests, all passed**.
- Build logic: **24 tests, all passed**.
- Gradle/compiler: Oracle **25.0.5.0.3**, observed at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`, compiler release 25.
- Test JVM and local Paper runtime: Oracle **27.0.1.0.3**, observed at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.

These are observed installations, not hardcoded launcher paths. The canonical wrappers resolve and validate them dynamically. The wider existing suite still reports unrelated deprecation and future Java reflective/native-access warnings; Advent production compilation reports no deprecation warnings.

The build's final synchronization validator also required its aggregate dependency/token metadata to reflect the new optional Boosters integration. Failed attempts kept the local server stopped, preserved the prior installed suite and reused reserved build 823. The successful run completed the full clean build/test/sync workflow.

### Native maintained-server smoke

The exact build-823 set started on local Paper 26.3 build 227 with Oracle 27. A temporary console-only probe verified:

- All 26 CMI cookie-kit fixtures, including `d25` and `d25tree`, exact native item serialization and no configured commands/drops.
- The 24 distinct tree slots and exact static profile properties through native item serialization.
- A native managed-holder six-row inventory with synthetic owner/nonce, never opened to a real player.
- All three decoration bundles: four unique head designs and exact native components.
- All three fireworks palettes: eight distinct native designs and 64 rockets total per bundle, with exact component round trips.
- Registration of the ownership-aware Boosters service and actual mcMMO readback at neutral 1x. No booster was activated.
- The native virtual mitten hitbox, its three correctly linked display parts and complete cleanup.
- A temporary native mannequin's 0.7 scale, supported sneaking pose, static profile, equipment and cleanup.
- Advent configuration reload, continued diagnostics and clean server shutdown.

No real player, entitlement, claim or public contribution was created. Temporary entities and the probe JAR were removed. The server is stopped. The local calendar remains schema 2, `season.live: false`, with no placed actor registrations. The collision-checked placeholders remain local preparation fixtures.

Before runtime smoke, existing feature/CMI/Multiverse state was backed up in fresh local storage. After shutdown, **846 files** were restored and SHA-256 verified, preserving prior Halloween, Doors, GhostHunter, Coconut Hunt and Sheep records. New Advent-owned files and its temporary kit fixture were retained. The final managed-JAR hashes were checked again after restoration. No live file was written, and no live command or lifecycle action was issued.

Scratch evidence is under `.scratch/advent/overnight-2026-10-29/`: `build-all.log`, `verification.json`, `toolchains.txt`, `paper-smoke-expanded.log`, `runtime-preservation-report.json` and the fresh backup manifest. The native probe source and compiler record are under `.scratch/advent/native-probe/`. The fixture at `config/cmi/kits/advent-test-placeholders.yml` was regenerated by the exact installed CMI item serializer and verified against the local installed copy.

## Acceptance limits

Actual Java and Floodgate player interactions, native dialog appearance, real provider rewards under full inventories/AutoSell/inventory groups, final outfits/poses/locations, the community light anchors, group-photo backdrop and final stories still require owner/staff gameplay acceptance. The current personal chapters are explicit drafts. Public progression remains off, and the shipped actor list is empty. The local Santa import retains the running-source consistency limitation recorded on October 28.

Paper 26.4 is not tested. Review its published exact APIs and repeat the build/runtime gates before upgrading. No live lifecycle action, server command, write or deployment is part of this work.
