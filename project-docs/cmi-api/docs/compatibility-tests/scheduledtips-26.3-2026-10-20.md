# ScheduledTips preferences and suppression, 20 October 2026

This change implements reliability items 1–4 and the preferences/staff menus tracked in [issue #80](https://github.com/mrfdev/1MB-Library/issues/80). The baseline was suite 788, Paper 26.3 STABLE build 206, with Java 25.0.4.1 for compilation and Java 27 for the maintained server.

## Behavior under test

- Failed local preference writes retain the requested choice and pause tips until explicit recovery, including reconnects and feature dormancy.
- Staff enable/status/reload controls remain available after disabling the feature.
- An initially empty eligible catalog retains its timer so returning dependencies can resume rotation.
- Staff configuration changes run through a serialized worker, compare the captured configuration, and persist atomically before runtime application.
- `/tips` opens preferences; the catalog shows personal enablement with glint, qualifying chat views, and current availability. Separate staff pages prepare add/edit commands and confirm removal.
- Hiding an individual ordinary tip requires at least 12 actual chat deliveries. Action bars, previews, suppressed opportunities and booster replacements do not count. Existing hidden choices survive migration.
- The optional purchase defaults to 250 eligible tips for $2,500. Confirmation binds the original UUID, connection, configuration generation, price, count and one-use token. Current permissions, provider and affordability are rechecked before withdrawing.
- Purchase receipts and allowance updates persist separately from ordinary preferences. An uncertain withdrawal is never automatically repeated. Staff reconciliation records a verified outcome with the staff UUID and current receipt revision; it does not transfer money.
- Shared guidance Off/pause, RecordingMode and `/next` remain free. Ordinary ScheduledTips entries alone consume paid allowance.

## Automated evidence

Focused tests cover the original four regression paths, strict configuration bounds, chat-only counters, all hide routes, current-session restoration, changed/duplicate purchase confirmations, charge-time permission/provider/session changes, durable grant/consumption recovery, missing or corrupt paid records, and receipt-capacity reservation.

Shared guidance tests also cover delivery eligibility before the asynchronous allowance decision, late completion after source/world/session changes, expiry, and continued delivery from unrelated free providers.

The shutdown fault test caught a cancellation/final-write race during verification. The purchase pipeline must remain drainable until a known unstarted payment has been durably cancelled; a queued callback must not withdraw after shutdown.

Final independent review also caught a delayed shared-restore callback overwriting a newer local hide. The callback now checks the original profile identity and revision and current permission. Deterministic regressions cover the newer completed hide, a replaced profile, unchanged successful restoration and revoked permission.

The final canonical `scripts/build-all.sh` completed suite **790** against Paper **26.3 STABLE 207** and verified all **66** synchronized managed JARs. Its reports contain **6,732 tests: 6,691 passed, 41 skipped, zero failures or errors** across 531 suites. All **122** ScheduledTips tests passed. Skips are existing fixture-dependent Pyro/mcMMO/commercial-JAR checks and an absent local ShopGUI+ shops-data check.

The server uses Java **27+35-2325**. Console checks repeated on the final suite **790** confirmed `disable → status → enable → reload → status`: dormant status remained accessible, its task stopped, and activation/reload restored the scheduler. The original enabled setting was restored. Final native-menu and fixture-free restart results follow below.

## Paper build delta

The canonical workflow selected 26.3 STABLE build 207. Its [official metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/207) and [comparison with 206](https://github.com/PaperMC/Paper/compare/e13b4b3d41bb1a9b7032ef80c9a197f0002d21ab...bc68acd74104584b13aac76261f64fbe65358876) show one additive critical-hit query API change. The exact API JAR comparison changed only `HumanEntity.class` and `apiVersioning.json`; scheduler, inventory and glint classes and API dependencies were unchanged. Java 25 remains the compile target.

Discovery used the [live Paper documentation index](https://docs.papermc.io/llms.txt), current scheduler/inventory documentation and roadmap. Because the online 26.3 Javadocs identified build 195 during review, the [exact 207 scheduler source](https://github.com/PaperMC/Paper/blob/bc68acd74104584b13aac76261f64fbe65358876/paper-api/src/main/java/org/bukkit/scheduler/BukkitScheduler.java), [inventory event source](https://github.com/PaperMC/Paper/blob/bc68acd74104584b13aac76261f64fbe65358876/paper-api/src/main/java/org/bukkit/event/inventory/InventoryClickEvent.java), and [ItemMeta source](https://github.com/PaperMC/Paper/blob/bc68acd74104584b13aac76261f64fbe65358876/paper-api/src/main/java/org/bukkit/inventory/meta/ItemMeta.java) supplied version-specific confirmation. Existing shared `GuiItems` construction remains a future `ItemStack.of` maintenance item.

## Native inventory fixture

The disposable fixture at `.scratch/tips-2026-10-20/probe/` compiles against the exact synchronized Core/ScheduledTips JARs and selected Paper bootstrap's hash-verified library inventory. It uses real Paper inventories and the shared GUI service with synthetic Java/Bedrock-style profiles and an in-memory access adapter.

Its first run passed 103 assertions before a fixture-only Adventure ABI error: recursively collecting retained server libraries had selected Adventure 4 before the runtime's Adventure 5.2. The corrected fixture uses only the selected Paper bootstrap's dependencies and Adventure 5's typed suggestion event.

A subsequent run passed all 134 assertions but exposed background skin lookups for incomplete synthetic profiles. The fixture now uses exact local profiles with inline synthetic texture data and verifies the resulting head metadata retains those textures. This removes Paper's empty-profile update path without accessing real identities or changing production head rendering.

Its scope includes item glint, title/action colors, inert lore, borders/footers, pagination, locked/restored choices, staff visibility, forged owners, click/shift/double/hotbar/offhand/drop/creative/drag input, stale inventories, permission/readiness changes, close/quit/kick/world changes, navigation and delayed one-use confirmations.

The final run passed **138 assertions** on suite **790**, Paper **26.3-207-main@bc68acd**, with no synthetic-profile lookup warnings. The server stopped cleanly at **16:20:47 Europe/Amsterdam** and the temporary fixture JAR was removed. The normal server completed its restart at **16:21:24**; all **66** managed JARs were reverified against the canonical candidates. At **16:21:54**, `/tips admin status` reported the scheduler enabled and running, the 12-chat-view threshold and the 250-tip/$2,500 offer. The maintained server was left running.

It does not dispatch player commands, touch real balances, or write real player profiles. It does not establish real Java/Bedrock client rendering or actual economy-provider acceptance.

Local evidence is retained under `.scratch/tips-2026-10-20/`: `canonical-build-790.log`, `test-counts-790.json`, `probe/result.txt` and `probe/runtime-final.log`. The fixture is excluded from the managed suite and must never be staged live.

## Storage and acceptance limits

An eligible opportunity consumes its skip at admission. Disconnecting or changing settings while that durable write finishes does not refund it. A failed or ambiguous storage decision drops delivery until recovery.

Full paid receipts remain retained to preserve replay protection. The current 100,000-receipt ceiling reserves capacity for existing paid credits; only new purchases stop at capacity. Compact archival with a durable identity index remains a separate TODO. Ledger deletion is not a maintenance procedure.

The source documentation is updated. The public mirror check failed with broader existing drift, including 10 missing and 35 changed mirrored documents, an outdated source marker, and a generated-site reference to excluded `plugins/forage-camp-technical.md`. The public repository already has unrelated local changes. Its synchronization and publication remain separate work.

Real-client gameplay acceptance, the live tip catalog, combined communication volume and manual live staging remain unchecked. Group/world weighting and generated presets remain in [the ScheduledTips TODO](../../todo.scheduledtips.md). No live deployment is included.

The related open issues retain their owner acceptance gates: [#36](https://github.com/mrfdev/1MB-Library/issues/36) covers client usability, shared provider timing and persistence; [#43](https://github.com/mrfdev/1MB-Library/issues/43) requires live confirmation that dormant Forage is not promoted; [#48](https://github.com/mrfdev/1MB-Library/issues/48) retains real-player acceptance, combined message-volume review, live configuration and release handoff. Their older build evidence is historical. This test run does not close those checks.
