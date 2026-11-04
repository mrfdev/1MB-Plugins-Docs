# Player guidance

Use **`/guidance`** to choose how helpful hints appear. You can also open it from the **`/tips`** preferences menu or **Helpful hints** in AutoSell's Filters menu. Guidance and `/next` remain free, including shared Off/pause and RecordingMode quiet controls; the separate optional [ScheduledTips allowance](plugins/scheduledtips.md#when-does-a-purchased-skip-get-used) does not charge for using them.

## Your choices

| Control | What it does |
| --- | --- |
| **Normal** | Occasional hints when a connected feature has something useful to offer. |
| **Fewer** | Longer gaps between optional hints across connected features. |
| **Off** | Hide optional hints. You can still use commands and menus. |
| **Chat / Action bar** | Chat includes clickable controls. The action bar shows a short hint and a command. |
| **Take a break** | Pause hints for one hour by default. **Resume hints** ends the pause. |
| **Recent hints** | Review hint topics you received. Left-click to hide an eligible topic; right-click to postpone it. ScheduledTips explains any remaining chat-view requirement. |
| **Hidden and postponed hints** | Restore one hint, or restore all while keeping your other choices. |
| **Preview a hint** | Try the selected display style, including while hints are off or paused. |
| **Focused welcome: On/Off** | Allow one useful return message across participating activities while keeping your pinned goal. |

Chat hints have **[Later] [Hide] [Settings]** controls where available. **Later** postpones that hint for one hour by default; **Hide** keeps an eligible topic hidden until you restore it. Configured ScheduledTips entries require at least 12 actual normal-tip chat deliveries before permanent hiding, including through these shared controls. The provider's reason explains a locked Hide action. A postponed hint can return only when the feature offers it again and the action is still useful. Restoring a hint allows it again; it does not immediately replay it.

Example: **“Your mining quest reward is ready. [Review rewards] [Later] [Hide] [Settings]”** The reward button opens the current AutoSell quest menu. Claiming still follows the normal reward checks.

Your frequency, display style, pause, hidden hints, and recent hint topics survive reconnects and server restarts. A temporary pause counts down while you are offline. Resuming does not change **Off**, RecordingMode, or a feature's own settings. If saving fails, hints stay paused and the menu offers **Try loading my settings again**.

## Which features participate?

- **ScheduledTips:** scheduled tips and live booster reminders share the hint budget. The tips menu shows the catalog, personal hide choices, qualifying chat views and an optional paid skip allowance. Permanent hiding of a configured tip requires at least 12 actual chat deliveries, or the server's higher configured threshold; action bars, previews, booster replacements and suppressed opportunities do not count. Old hidden and `/tips off` choices are preserved. `/tips off` now opens the purchase review menu, while `/tips on` explicitly resumes an old off choice. `/tips list` remains available for reading tips yourself. The shared menu links back to `/tips` when the feature is available.
- **AutoSell:** optional reminders for ready, manually claimed quest rewards, with a **Review rewards** button. AutoSell checks outstanding rewards every minute, rechecks readiness before delivery, and suppresses this hint while payment records need review. Its own Quiet notification mode and `quests.rewards.notify-ready` setting also apply. Milestone messages and sale notifications keep their existing behavior.
- **RecordingMode:** `/recording set tips off` temporarily pauses all connected optional hints while recording is active. Turning recording off releases that pause and keeps your saved hint choices. `tips on` allows hints according to those choices.
- **Focused welcome:** one delayed return message across participating activities, prioritizing your saved focus and optionally one ready reward. It shares the budget and saved repeat history. See [Focused welcome](focused-welcome.md).

An AutoSell reminder takes priority over a discovery tip waiting at the same time. A server with more connected features still shares one optional-hint budget per player. Necessary action results, reward confirmations, recovery notices, and replies to commands are outside this optional-hint route.

`/tips reset` resets ScheduledTips' own delivery/chat-view history, local dismissals and legacy visibility. It does not reset a purchased allowance or its receipts. Hints hidden through **[Hide]** belong to `/guidance`; restore those in **Hidden and postponed hints** or through the tips catalog. The menu's **Connected features** item shows the currently registered hint providers.

Activities that are disabled, dormant, or inaccessible do not become recommendations merely because their JARs are loaded. `/next`, focus choices and first-success guides follow their providers' current availability. ScheduledTips also checks the features its tips require, including automatic recognition of existing Forage tips. Saved recent/hidden entries use an unavailable title when their hint is ineligible; restoring one does not activate the feature. Progress and preferences are retained. Staff can inspect the [dependency rules and diagnostics](plugins/scheduledtips.md#feature-availability-and-dormant-forage). Debug mode does not override dormancy or use permissions.

This is the shared foundation of **COMM-12** in the [communication roadmap](../todo.communication.md). The implemented [dynamic `/next` hub](next-steps.md), [focus goals](focus-goals.md), [first-success guides](first-success-checklists.md), and [focused welcome](focused-welcome.md) build on it. Additional features join incrementally.

## Commands and access

Players receive `onembcmi.global.guidance` by default. It permits changing only their own preferences and receiving optional hints. It grants no administrative access or additional access to feature actions. The destination feature checks its own permissions when a player follows a hint.

```text
/guidance
/guidance normal|fewer|off
/guidance chat|actionbar
/guidance pause|resume
/guidance welcomes on|off
/guidance recent [page]
/guidance hidden [page]
/guidance restore all
/guidance preview
/guidance help
/guidance retry
```

`settings` and `status` open the same menu; `info` shows help. Buttons use `/guidance hide|later|restore <hint-key>`. Players can use the menus without memorizing identifiers. Action-bar users can manage topics through **Recent hints**; a ScheduledTips entry still needs qualifying chat views before it can first be hidden.

## Server configuration

Settings live in `plugins/1MB-CMIAPI/CMIAPILIB/config.yml`. Shared player copy uses the normal global translation inventory under `guidance.*`; feature hint bodies use that feature's translation keys and prefix.

| Setting | Default | Effective bounds / behavior |
| --- | --- | --- |
| `guidance.enabled` | `true` | Stops optional delivery when false; preferences remain accessible. |
| `guidance.normal-gap-seconds` | `120` | 15–86,400 seconds across providers. |
| `guidance.fewer-gap-seconds` | `600` | 15–86,400 seconds, never shorter than Normal. |
| `guidance.minimum-repeat-seconds` | `1800` | 60–86,400 seconds; providers can request longer. AutoSell requests two hours. |
| `guidance.queue-expiry-seconds` | `90` | 10–300 seconds; stale queued messages are dropped. |
| `guidance.join-grace-seconds` | `30` | 0–300 seconds; suppresses immediate join hints. |
| `guidance.pause-minutes` | `60` | 1–1,440 minutes for both Pause and Later. |
| `guidance.maximum-queued-hints` | `8` | 1–16 pending topics per player. |

For example, `/1mblib config set global guidance.normal-gap-seconds 180` increases the normal gap. `/1mblib status` reports provider, player, queue, delivery, and stale-hint counts. Both automatic ScheduledTips and staff broadcasts use these limits; an admin broadcast's count means **offered**, not delivered. Explicit admin previews remain immediate.

The policy remembers the 128 most recently delivered topic timestamps and up to 256 hidden/postponed topics. Expired postponements are pruned when hiding another hint. At capacity, the player can restore an old hidden hint before adding another. Guidance is a best-effort reminder channel: a crash before a delivery-history write completes may allow a later repeat, but no reward is granted by this service.

## Persistence and upgrades

Shared `PlayerDataStore` provides atomic UUID writes and validated backups, with serialized disk work off the server thread. Player/menu/provider access returns to the server thread. Guidance-owned profiles are in `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/guidance/<uuid>.yml`. ScheduledTips uses `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/scheduledtips/<uuid>.yml`, plus `scheduledtips-suppression/` for paid allowances and their transaction journal. Each data area keeps its own recovery records.

These separate files prevent a legacy feature saving an older whole-player profile from overwriting a newly saved hint preference. On first load, ScheduledTips copies its existing section from the shared root UUID profile without modifying that legacy file. Previously captured RecordingMode tip visibility is restored once and remembered in the dedicated profile; later player choices are preserved. Invalid saved settings are not silently replaced with opt-in defaults.

ScheduledTips adds `chat-seen` without converting historical mixed-channel `seen` counts into qualifying chat views. Missing chat counts begin at zero; existing local/shared hidden choices remain hidden. The new threshold governs a later hide action after restoration. A failed ScheduledTips save retains the latest requested choice and pauses tips; `/tips retry` retries that choice instead of reading an older opt-in profile.

Back up the whole `playerdata` directory, including guidance, tips and suppression data. The legacy `debug clean playerdata plugin ...` command cleans only root UUID sections and explicitly reports that dedicated hint preferences are preserved. Do not remove only a dedicated ScheduledTips profile as a reset: the next load would import the old legacy preferences again. Use `/tips reset` for a player reset. Do not delete or roll back paid allowance/receipt files to resolve a purchase; follow the [staff recovery procedure](plugins/scheduledtips.md#staff-menus-and-purchase-recovery). An intentional downgrade reads the retained legacy tip preferences; guidance choices made on this version do not synchronize back into the old format.

## Adding a provider

Register one owned source and stable namespaced hint identifiers with the shared `GuidanceService`. Offer only eligible optional guidance, with a priority, repeat interval, and supplier that checks current state immediately before delivery. Returning no content drops a stale hint. Permission loss, quiet choices, a disabled source, expiry, or a world change can discard pending hints. Providers can supply a permanent-hide denial reason, which is rechecked by chat, command and menu hide routes; restoration remains available for historical hidden choices. A delivery callback receives the actual channel and is suitable for a seen counter; it must never grant a reward or run a purchase.

ScheduledTips uses the optional asynchronous delivery gate only after shared eligibility and current content pass. An opportunity UUID prevents repeated allowance consumption. A consumed opportunity remains consumed if the player disconnects or state changes while its durable update completes. If no allowance is consumed, the service rechecks the current session, preferences and content before sending. The gate must fail closed on storage uncertainty; it does not grant rewards or issue economy withdrawals.

Use the Feature Plugin's prefix and actionable chat body, plus a short action-bar alternative with a valid command. Do not send an additional independent hint or sound around the shared route. Unregister the source on feature shutdown; refreshed catalogs retain players' saved dismissals. Explicit action results continue through their normal feature flow.

This follows the official [Paper scheduler guidance](https://docs.papermc.io/paper/dev/scheduler/) and the maintained target's [Paper 26.3 inventory click API](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryClickEvent.html). The shared GUI's owner/session checks, cancelled inventory input, and deferred actions apply to guidance menus too.

## Verification

The October 2026 ScheduledTips menu, chat-view requirement and allowance integration passed the complete suite build in version **1.0.4-790**. See the [current verification report](compatibility-tests/scheduledtips-26.3-2026-10-20.md) for runtime evidence and the [ScheduledTips TODO](../todo.scheduledtips.md) for remaining client acceptance. The earlier results below are historical verification.

On 2026-09-06, canonical build **594** passed the full suite build and tests and synchronized all **64 managed JARs**. The guidance probe passed **40 runtime checks** on Paper **26.2 stable build 121**, Java **25.0.4**, and the server stopped cleanly. The test-only probe JAR was removed afterward. This verifies the shared controls and delivery behavior using synthetic players; real-client presentation and gameplay acceptance remain separate.

`GuidancePolicyTest`, `GuidanceStoreTest`, and `TipProfileTest` exercise cross-provider priority, frequency gaps, repeat history, deduplication, expiry, hidden-hint limits, restart persistence, failed writes, invalid data, and legacy tip/RecordingMode migration. Existing shared GUI adversarial tests cover the common click and session guards.

Before starting the local test server, inspect every active JAR manifest and keep DiscordSRV in `compile-support`, outside `plugins`. Do not rely on a Git-filtered file inventory.

The test-only `:libs:1mb-cmiapi-lib:guidanceProbeJar` runs real Paper inventories and scheduler callbacks with synthetic players. It checks menu contents, invalid clicks and drag, permission loss before a deferred action, stale menus, quiet/off behavior, priority, stale provider state, hidden/recent persistence across sessions, and closing a menu during an asynchronous save. It also verifies that `/guidance` resolves to the shared command and DiscordChat loads with DiscordSRV absent. Its report is `plugins/1MB-GuidanceProbe/report.txt`. It is excluded from the managed release set and must be removed after stopping the test server. It does not simulate a Minecraft client's visual rendering or perform AutoSell payouts.

The read-only public documentation sync check reports drift, including this new guide. These repository documents still need the usual public documentation publication workflow before a live release.

Use the [communication acceptance checklist](../checklist.md#shared-player-guidance-checks-comm-12) for client and gameplay acceptance, then move to COMM-04.

## Kit streak due reminders

KitStreaks contributes `kitstreaks:due`, shown as **A kit streak day is due**. It selects one eligible due track and follows the shared spacing, channel, hide/later/off and RecordingMode controls. Saved history and the current runtime date suppress same-date repeats. The provider rechecks date, qualifying kit access and claim state before delivery. Requested `/kitstreak guide` views and secured-day feedback remain ordinary action replies. See [Streak guidance](streak-guidance.md).
