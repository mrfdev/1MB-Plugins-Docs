# First-success checklists

**COMM-03, implementation order 8.** Short, optional introductions that remember what a player has already achieved. The Shared Library coordinates the controls and invitations across participating features. [Implementation and acceptance: issue #42](https://github.com/mrfdev/1MB-Library/issues/42).

## For players

Open **`/next` → First steps**, or type **`/next guide`**. Choose an activity to see three steps, labelled **Done**, **Next**, and **After that**. The large button beneath them explains your next action and opens the feature's normal instructions or controls.

You do the activity to finish a step. Browsing a checklist does not sell items, buy tools, collect rewards, pin a goal, or mark a personal task complete. Earlier successes count, so experienced players can skip the introduction. Finished learning steps stay remembered when you leave camp, put a tool away, reconnect, or restart the server.

| Activity | Three steps | Open it |
| --- | --- | --- |
| AutoSell | Check what stays with you → Preview a sale → Make your first successful sale | `/next guide autosell` |
| Passport | Open your passport → Find a missing stamp → Collect your first stamp | `/next guide passport` |
| Forage | Complete your own camp → Get a Forage tool → Gather from a matching source | `/next guide forage` |
| JourneyMap | See your saved journey → Browse badges → Choose a badge to follow | `/next guide journeymap` |
| PlayerTodo | Write one small goal → Learn its controls → Finish your task | `/next guide todo` |

For example, Forage can show:

> **Done:** Finish your own camp\
> **Done:** Get your first Forage tool\
> **Next:** Gather from a matching source\
> Hold your Forage tool and gather one of its matching sources in an allowed, fresh area. `/forage next` shows what counts and explains any pause.

The camp and tool steps remain Done when you head out exploring. Gathering only completes after a qualifying Forage action. A successful purchase is recognized after delivery is confirmed; a pending payment record alone does not prove that you received a tool.

JourneyMap uses saved playtime rather than an invented live countdown. Its introductory goal is choosing a direction, so you do not have to wait hours to finish the guide. If you already have a focus you prefer to keep, you can leave this optional guide for later. An existing earned JourneyMap badge also counts as prior experience.

| Control | What it does |
| --- | --- |
| **Show me how** / the highlighted Next button | Opens the normal information or control screen for the next unfinished step. |
| **Review this step** | Lets you revisit an earlier or later step without changing its completion state. |
| **Later** | Pauses optional guide updates for an hour. |
| **I know this already** | Dismisses this guide indefinitely. It does not pretend you completed its activities. |
| **Resume guide** | Clears that guide's pause or dismissal, retaining finished steps. |
| **Check progress** | Rechecks actual feature progress and refreshes the checklist. |
| **All first-step guides** | Returns to the shared activity list. |

The same controls work in chat: `/next guide forage chat`, `/next guide forage later`, `/next guide forage dismiss`, and `/next guide forage resume`. `/next guide chat` lists available activities in chat. AutoSell, Passport, JourneyMap, and Forage also accept `/<plugin> next guide [chat|later|dismiss|resume]`. PlayerTodo uses the global guide route so its existing quick-add commands keep their meaning.

Opening a dismissed guide lets you revisit it; it stays dismissed until you explicitly choose Resume. Completing a guide offers one onward activity. It does not automatically enroll you in another introduction or replace your pinned focus.

## Quiet, contextual invitations

Players may receive a brief invitation after explicitly using a participating feature. There is no invitation from joining the server and no per-plugin welcome flood. Invitations are remembered after delivery, and already completed introductions do not invite players to repeat them.

Invitations and optional progress hints share the existing `/guidance` budget. **Off**, **Fewer**, pauses, hidden hints, and Recording quiet mode apply. The service rechecks a queued hint before delivery; dismissing a guide, finishing the introduction, losing access, or disabling a provider can cancel it. Hints expire instead of becoming a backlog. Normal guide commands remain usable with optional hints Off.

While a player is following a guide, the service checks only that selected guide for up to 30 minutes. A checklist that is still open refreshes when its state changes. Closing it never causes it to reopen automatically. Actual feature evidence is also recorded at supported actions; after the active window ends, opening the guide checks current progress again. Reconnecting preserves learning progress and preferences without automatically reopening or activating a guide.

## Configuration and integration

The shared config has `next.enabled`, `next.first-steps.enabled` and `next.first-steps.invitations`. The last option controls optional checklist invitations and progress hints. All default to true. Explicit guide access uses `onembcmi.global.next` and the feature's normal enabled state and use permission. Each destination also rechecks the feature's ordinary action permissions. Optional delivery additionally requires the shared guidance permission. Shared labels are configurable under `first.*` in the core translation defaults.

The internal Passport feature ID, `passportdiscovery`, is also accepted; the shorter player command `passport` is displayed in guide links. Forage's existing detailed Getting Started menu contains a **Your first three steps** button. Other detailed feature guides remain available.

A Feature Plugin opts into `supportsFirstSteps()`, provides a `FirstChecklist` from cached, authoritative state, and emits `firstStepObserved` only after the named learning action actually happened. Checklist definitions contain one to five distinct steps; the initial five providers all use three. Each step supplies a stable ID, instruction, icon, safe view destination, and current completion evidence. No new gameplay database or reward system is required.

Keep these integration rules:

- Providers run on the server thread. They may read cached profiles and already loaded world state, but must not load chunks, perform blocking I/O, assign quests, grant rewards, register camps, or mutate progression while producing a checklist.
- View destinations belong to the provider's existing command root. Normal command ownership, permissions, costs, cooldowns and feature checks still apply when a player uses controls in the destination.
- Forage checklist navigation uses a read-only camp check. The shop opens only for an already owned, complete nearby camp; registration remains a deliberate player action.
- Learning evidence is a union of verified observations, current feature evidence, and remembered completed steps. A definition revision change drops obsolete learning proof while preserving the player's dismissal and pause preferences.
- Data lives separately in the core player-data `first-steps/<uuid>.yml` directory. A bounded serial worker performs atomic updates through `PlayerDataStore`. Observations received during an initial load are queued immediately, so quitting before the load callback does not lose them. Queued writes drain on shutdown.
- Malformed or unavailable checklist storage fails closed and explains recovery. It does not rewrite corrupt records as empty profiles, and it does not modify the player's underlying feature progress.
- Shared GUI session identity and deferred callbacks protect navigation. Chat shortcuts are private, single-use, bounded, expire after ten minutes, and are invalidated by quit, world changes, provider removal, or changed step definitions. The actual provider and access are checked again at action time.

## Local acceptance

Canonical build **612** passed **1,198 JUnit tests** (zero failures/errors, one skipped) and **88 isolated Paper checks**. All **64 JARs** were synchronized and checked against the installed artifacts; the server stopped cleanly and the test-only probe was removed. The automated results and remaining client checks are recorded in [the communication roadmap](../todo.communication.md) and [the test checklist](../checklist.md). A human Minecraft client pass is still required for reading comfort, real inventory interaction and the full five feature journeys. Public documentation publication and live staging are separate steps.
