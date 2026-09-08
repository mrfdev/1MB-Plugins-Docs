# Community contribution

Use **`/collect community`** to see how your contribution helps Collect's active event. The page answers three questions: **What have I contributed? How close are we together? What happens when we reach the goal?**

Every saved contribution counts, including a first small submission. You do not need a leaderboard position. Your personal score appears alongside the shared total, its remaining score and the actual configured benefit.

An illustrative successful receipt:

> Submitted 80 items for Stone Hunt. Event score +80. +80 to the shared event score. Goal reached together! Now active: the 1.1x community bonus on the base item score of later submissions. **[Community goal]**

The numbers and benefit come from the event's current rules and saved results. The community explanation is part of the existing action receipt. It creates no extra broadcast, login message, sound or automatic reminder. Existing submission effects and bonus notices keep their settings.

## Player controls

| Control | What it does |
| --- | --- |
| `/collect community` | Opens your contribution and the shared goal, with the benefit and next action. |
| `/collect community chat` | Shows the same information in chat, with a readable command fallback. |
| `/collect community retry` | Retries a failed background score read. It does not reset anyone's contribution. |
| **View accepted items** | Opens this week's existing item list so you can decide whether to submit. |
| **Pin this goal** | Selects this community goal as your one shared focus. |
| `/collect next` or `/next` | Offers the current community path when it is available. |
| `/next focus` | Reviews the pinned community goal or lets you choose something else. |

The Collect overview and item-list pages also link to the community page. **Refresh** checks the current cached state. During loading, wait briefly and refresh; the page does not guess a zero total. If loading fails, **Try loading scores again** offers recovery and explains when to ask staff for help.

These are views you request, so `/guidance off`, pause and Recording quiet mode do not prevent you reading them. Pinning follows the shared focus controls, including its hidden-bar and Recording quiet preferences. A started, unfinished contribution can be the continuation in the shared focused welcome, and an explicitly pinned community goal takes the usual priority. New players are not described as returning contributors.

## What your contribution means

Collect's community target uses **event score**, which can include submission bonuses and duplicate-keepsake exchanges. Raw item counts and event score are different measures. The receipt reports the actual increase saved to your event total and the actual increase in the shared total, including the existing score caps.

A successful submission or exchange acknowledges reaching the target only when that action crosses it. Later submissions show current progress without repeating the crossing celebration. There is no reward claim attached to the community page: Collect's configured booster applies through its existing scoring rules, and personal reward claims stay in `/collect rewards`.

The community multiplier affects a later submission's **base item score**. For example, the default `1.10` multiplier adds the rounded community bonus to those items; other configured bonuses are calculated separately. The contribution that first reaches the target does not retroactively receive that bonus. The page preserves the configured multiplier's precision and mentions rounding and score limits.

When the multiplier is `1` or lower, the page describes a shared milestone and explicitly says no extra score boost is configured. It never invents a key, payout, event extension or second milestone. Below the target, the percentage rounds down so an unfinished goal never displays 100%. At or above the target, remaining work is zero and further collecting is clearly optional.

Failed preflight checks, failed saves, replayed transaction identities and uncertain receipts get their existing recovery response, with no new success acknowledgement. If a score was saved but a later receipt stage needs staff review, that saved score still belongs in the shared total; the community page does not claim that an external reward was delivered.

## Availability and safe navigation

Only the active, enabled event and an enabled, valid community goal are offered. Closed or disabled events, dormant Collect, invalid target/multiplier configuration and unavailable score data contribute no recommendations or focus choices. Manual views explain the unavailable state.

Collect's existing event-date and force-open test settings remain authoritative and are visibly identified in the community view. Debug does not bypass the feature's enabled state or player permissions. Normal world restrictions and explicit debug-world allowances determine whether the player can contribute. A player who can view progress but cannot currently submit sees a paused goal and an explanation, without an unusable accepted-items action.

The community view requires Collect **use** and **stats** access. Item navigation additionally requires **submit** access. Global guidance and focus retain `onembcmi.global.next`; optional welcomes retain the shared guidance permissions and preferences. No new permission grants sales, claims or item consumption.

The goal identity includes the event id, dates, target, multiplier and effective force-open/date-test definition. A changed event or goal definition invalidates old actions and pins through the shared guidance checks. Week changes keep the same event goal while changing the current accepted items. Old pins remain available for review; they never silently become another event's goal.

The page uses the shared server-owned inventory/session handling, cancelled unsupported input and deferred actions. Buttons recheck current access and event state. Opening the page, following its information links, using `/next` or pinning a goal does not submit items, trade keepsakes, claim a reward or advance progress.

## Server and implementation notes

Existing Collect settings remain authoritative:

- `community.enabled`: allows the community goal.
- `community.target-score`: the shared target, default `100000`; guidance requires a positive value.
- `community.point-booster`: the configured base-item multiplier, default `1.10`; guidance requires a finite value.
- `community.display-on-index`: shows the community entry on the Collect overview. The command remains available when this tile is hidden.

No new score store, reward journal or player schema is introduced. A background index reads existing UUID profiles on activation/reload, then every successful Collect profile save replaces that player's indexed totals. Submissions, duplicate exchanges, explicit resets and score caps therefore use the same saved data. Saves that happen during a read take precedence over the earlier snapshot. Old reads cannot publish after a replacement load or shutdown.

Aggregate discovery includes profiles with backup or quarantine records, so a missing or corrupt established profile cannot silently disappear and reduce the community total on retry. An incomplete read makes the whole guidance snapshot unavailable until repaired. This may require staff to restore a shared profile before community guidance can resume.

All new views and next/focus/welcome providers read the index on the main thread without file scans, profile creation, new submissions or gameplay effects. Disk reads run separately and return to the main thread before touching players or menus. This communication change preserves Collect's existing transaction and scoring implementation; it does not migrate those older action/storage paths. Restore or externally edit profiles only through the normal stopped-server recovery workflow, then restart Collect to reload its data.

There is no new optional hint provider or notification budget. The one shared focused welcome handles return guidance. Contribution receipts are direct results of player actions, so optional-hint settings do not hide a successful submission or recovery response.

API checks used the live [Paper documentation index](https://docs.papermc.io/llms.txt), official [scheduling guidance](https://docs.papermc.io/paper/dev/scheduler/) and the exact [Paper 26.2 PlayerInventory API](https://jd.papermc.io/paper/26.2/org/bukkit/inventory/PlayerInventory.html).

## Verification

The focused tests cover real remaining work, floor percentages, crossing boundaries, multiplier precision, no-benefit goals, score caps, cache replacement and reset, saves during reads, stale load generations and corrupt/missing profiles with recovery data. The isolated `communityProbeJar` uses synthetic players, real Paper inventories and private Collect transactions to check views, safe navigation, focus/welcome integration, finalized submissions/exchanges, rejected actions and item metadata.

Canonical suite build **620** synchronized all **64 managed JARs** and passed **1,280 tests** with zero failures/errors and one existing skip. The maintained Paper **26.2 build 121** server passed **65 isolated community checks** and stopped cleanly on **2026-09-07**. The temporary probe was removed; the original plugin inventory and managed-JAR hashes were unchanged. These checks use private synthetic profiles; real-client presentation and gameplay acceptance remain pending.

Tracking: [COMM-11, issue #47](https://github.com/mrfdev/1MB-Library/issues/47). Real-client presentation and gameplay acceptance are tracked in the [community contribution checklist](../checklist.md#community-contribution-comm-11-order-12). The probe is test-only and must be removed after the test server stops.
