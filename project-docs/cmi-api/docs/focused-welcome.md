# Focused welcome

When you return, the server can offer **one useful way to pick up where you left off**. It considers your pinned goal first, otherwise an activity you have already started or an earned reward. Other choices stay in `/next`.

For example, with a pinned collection and a separate ready reward:

> Welcome back! Your focus: Biome collection. 18/40 stamps **[Resume]**
> Also ready: Daily quest reward. **[Review reward]** **[Later] [Hide] [Settings]**

Names and counts come from your current activities; these values are illustrative. There is one primary activity and at most one extra reward line. The welcome opens no menu automatically and makes no sound. Clicking **Resume** or **Review reward** opens the relevant information so you can decide what to do.

## Your controls

| Control | What it does |
| --- | --- |
| `/next welcome` | Shows the current short summary in chat whenever you ask, including with optional hints turned off. |
| `/next focus` | Reviews your pinned goal, its current state and its controls. |
| `/guidance` | Opens shared hint settings, including **Focused welcome: On/Off**. |
| `/guidance welcomes off` | Stops optional return welcomes while keeping your pinned goal and other hint settings. |
| `/guidance welcomes on` | Allows welcomes on future logins, subject to your other hint settings. |
| **Later**, **Hide**, **Settings** | Postpones this topic, hides it until restored, or opens shared settings. |

Welcomes follow your Normal/Fewer/Off frequency, chat/action-bar choice, pause, hidden topics and Recording quiet mode. The action-bar version shows the main activity and `/next welcome` as its chat fallback. The chat view includes clickable navigation and full details on hover.

Your welcome choice is saved across reconnects and restarts. Hiding the focus progress bar is a separate choice: it keeps the goal eligible for the welcome. Turning welcomes off does not clear that goal. Asking for `/next welcome` cancels any automatic welcome still waiting for this login; it does not count as an automatic delivery or reset its repeat timer.

## Choosing one useful return path

The Shared Library makes one choice across participating Feature Plugins:

1. Your current pinned goal, including an honest **paused** or **complete** state. A manual PlayerTodo task has no guessed percentage, and JourneyMap identifies its saved progress as the last check.
2. If there is no available pin, one continuation explicitly verified by its feature. AutoSell opts in current quests and lifetime milestones with progress, Passport opts in started collections, and JourneyMap opts in its next badge after recorded playtime.
3. If there is no continuation, one ready reward. When the primary activity is a goal or continuation, one additional ready reward may appear alongside it.

The existing focus providers cover AutoSell, Passport, JourneyMap, Forage and PlayerTodo. Ready rewards use the existing `/next` provider checks. An activity being available, a new-player introduction, a trade you could afford or a kit day you could start is not evidence that you were working on it. Those options remain in the hub and their own guides.

Features must be loaded, enabled and accessible. Their current permissions, worlds, periods, configuration and other provider checks still apply. Dormant Forage contributes nothing; enabling debug does not override its active-state checks. If a pinned quest expires or its provider becomes unavailable, your pin is retained for review and another verified activity may be offered. An unreadable or still-loading saved focus is not treated as an empty selection.

The welcome rebuilds its content immediately before delivery. A reward link uses the hub's private, expiring, single-use shortcut and rechecks the current recommendation when clicked. Changed progress, rewards or access produce the existing explanatory refresh. A focus link opens your current focus controls. Neither route automatically pins, claims, buys, enables selling, completes a task or advances progress.

## Timing and quiet behavior

By default, returning players become eligible **45 seconds after joining**, with a **90-second delivery window** after that. Saved focus and hint preferences must be ready. Shared hint spacing and the join grace period still apply, so a welcome may arrive later within that window or be skipped.

There is at most one automatic opportunity per login and a default **six-hour gap between delivered welcomes**, remembered through the shared guidance history. First-time players get no return welcome. If there is nothing useful, the service stays quiet. A player who asks for the summary instead receives a friendly empty-state message and can browse `/next` for ideas.

A skipped, expired, hidden, paused, quiet or unavailable welcome is not replayed later in the session. Death also suppresses delivery. Reloading the library while players are online does not create new login opportunities. This coordinator covers participating optional 1MB guidance; existing server login messages, external plugins and required action or reward receipts retain their own behavior.

## Server settings and integration

These Shared Library settings are added with defaults while preserving existing configuration:

| Setting | Default | Bounds / behavior |
| --- | --- | --- |
| `guidance.welcome.enabled` | `true` | Allows automatic focused welcomes. The requested summary remains available. |
| `guidance.welcome.delay-seconds` | `45` | 0–300 seconds after joining. Shared join grace still applies. |
| `guidance.welcome.window-seconds` | `90` | 10–300 seconds after the delay; includes waiting for saved data and delivery. |
| `guidance.welcome.repeat-minutes` | `360` | 1–10,080 minutes between delivered welcomes. Shared minimum repeat and frequency limits may be longer. |

The global `enabled`, `next.enabled` and `guidance.enabled` settings also gate automatic welcomes. Players need `onembcmi.global.next` and `onembcmi.global.guidance`, plus the participating feature's normal access. `/next welcome` uses next-step access, and the welcome toggle uses guidance access. No new permission node is required.

The source is `welcome`, with the stable hint key **`welcome:resume`**. The dedicated toggle reuses its saved hide/restore preference, so existing Hidden/Recent pages and controls agree. Guidance history and preferences remain in the existing asynchronous guidance store; the goal stays in the focus store. No new player profile schema is introduced. Invalid saved data fails closed. As with other optional hints, a crash before a delivery-history save finishes can allow a later repeat; this channel grants no rewards.

`WelcomeService` is the only join coordinator. Providers contribute cached snapshots through the existing focus and next-step registries; they must not send their own welcome. `NextStep.forWelcome(true)` is an explicit opt-in for a `CONTINUE` card with verified ongoing or paused progress. The seven-argument constructor remains available and defaults to no continuation opt-in. `READY` cards continue to mean earned, currently claimable rewards after the existing delivery-safety checks.

Selection, lifecycle checks, rendering and navigation run on Paper's main thread. Reading providers must stay bounded and nonblocking. They must not load profiles, query databases or services, load chunks, assign goals, persist progress or perform gameplay. The existing dedicated focus and guidance stores do their disk work asynchronously. The settings button uses the shared inventory holder, session identity, input guards, deferred click checks and save confirmation.

API verification used the live [Paper documentation index](https://docs.papermc.io/llms.txt), official [scheduling guidance](https://docs.papermc.io/paper/dev/scheduler/) and exact-target [Paper 26.2 PlayerJoinEvent API](https://jd.papermc.io/paper/26.2/org/bukkit/event/player/PlayerJoinEvent.html).

## Verification

`WelcomeSelectionTest` covers priority, empty input, explicit opt-in, completed/paused pins, one additional reward, refreshed snapshots and timing boundaries. The isolated `welcomeProbeJar` exercises real Paper command, inventory and scheduler paths with synthetic players and private data stores, including the real AutoSell, Passport, JourneyMap and PlayerTodo providers, dormant Forage, delayed delivery, repeat persistence, stale links, settings changes and unreadable focus data.

Tracking: [COMM-10, issue #46](https://github.com/mrfdev/1MB-Library/issues/46). Real-client presentation, the surrounding server login messages and gameplay acceptance remain on the [focused welcome checklist](../checklist.md#focused-welcome-comm-10-order-11). The probe is test-only and must be removed after the server stops.

Local verification completed on 2026-09-07 in canonical **build 618**: **1,257 JUnit tests**, zero failures/errors, one existing skip; **79 isolated Paper checks** passed. All **64 managed JARs** matched the canonical artifacts before and after. The server stopped cleanly and the temporary probe was removed. See the [verification evidence](../.scratch/communication/verification-618/README.md). Public-docs publication and owner client acceptance remain pending.

## Collect community contributions

Collect also contributes a started, unfinished community goal as a verified continuation. A pinned community goal has the usual priority, uses the shared total and identifies your own saved contribution. Completed goals do not become unfinished return work. See [Community contribution](community-contribution.md).
