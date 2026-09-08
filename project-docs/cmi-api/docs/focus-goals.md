# One pinned focus goal

**COMM-06, implementation order 7.** Track one objective across participating Feature Plugins. The Shared Library remembers the player's selection and owns its temporary progress bar. [Implementation and acceptance: issue #41](https://github.com/mrfdev/1MB-Library/issues/41).

## For players

Open **`/next`** and click **Pin as my focus** beneath a supported unfinished goal. The compass at the top shows your selected goal and opens its controls. You can also use **`/next focus choose`** to choose an activity, then a goal. Selecting another goal replaces your previous pin; your earned progress stays saved.

| Control | What it does |
| --- | --- |
| `/next focus` | Shows your saved goal, current progress, details, and controls. |
| `/next focus choose` | Lets you choose or replace your one goal. |
| `/next focus choose forage` | Opens one feature's goal picker. Other source names: `autosell`, `passportdiscovery`, `journeymap`, `todo`, `collect`. |
| `/next focus hide` | Hides the progress bar while keeping the goal pinned. |
| `/next focus show` | Enables the bar and briefly shows current progress. |
| `/next focus clear` | Removes the pin. Earned progress and the underlying task stay saved. |
| `/next focus chat` | Shows your current focus and clickable activity choices in chat. |
| `/next focus chat todo 2` | Shows a page of that feature's choices, five at a time. |
| `/next focus help` | Explains the controls. |

After pinning, the bar gives a brief preview. It then appears when the selected goal's actual progress advances and fades about ten seconds after the last change. Other activity does not keep it on screen. There is one shared focus bar and no repeated progress messages in chat. Your pin also takes priority in the optional [focused welcome](focused-welcome.md), governed by `/guidance` and its separate welcome switch.

Examples:

- **Forage:** `Pinned: Forage · Leaf quest · 80/100 · source family: Leaves` while qualifying gathering advances the quest.
- **Passport:** `Pinned: Passport Discovery · Biome collection · 18/40 stamps` after discovering a new eligible biome. Counts depend on the server's actual collection.
- **PlayerTodo:** `Pinned: PlayerTodo · Finish the lighthouse roof · Manual task`. Use `/todo done <id>` when you finish. The plugin does not guess how much of the roof you have built.
- **JourneyMap:** the bar explicitly says **Last check** and shows the saved remaining playtime. `/journeymap refresh` updates the underlying progress. Focus does not invent a continuously ticking playtime counter.

When a goal completes, the bar briefly says **Goal reached**. The completed goal remains pinned so you can review it and choose what comes next. Pinning and reaching a goal do not claim a reward, spend credits, enable AutoSell or complete a personal task. Open its details to use that feature's normal actions.

The pin and hidden setting survive reconnects and restarts. Rejoining establishes a fresh progress baseline without flashing the bar. A daily, weekly or monthly quest remains tied to the period you chose. If that period ends, rules change, or the goal is removed, the focus page explains that it is unavailable and offers another choice. It never silently pins the next period's quest.

Your focus is something you explicitly requested, so it works with optional `/guidance` hints set to Off or paused. **Recording quiet mode still hides the bar.** Leaving quiet mode does not replay missed progress. Hide/show controls belong to focus itself; choosing another goal preserves your hidden setting.

## Available goals and entry points

| Feature Plugin | Goals | Additional pin entry point |
| --- | --- | --- |
| AutoSell | Current quests and configured lifetime milestones, using verified sale progress | Quest and milestone detail menus; `/autosell next focus` |
| Passport Discovery | Enabled collections with known entries | A category's `/passport status <type>` page; `/passport next focus` |
| Forage | Current rolled quests, including the real target and eligible source description | **Choose a focus quest** in the quest index; `/forage next focus` |
| JourneyMap | Configured playtime badges, using last refreshed progress | `/journeymap milestones`; `/journeymap next focus` |
| PlayerTodo | Your own open personal tasks, completed manually | `/todo view <id>` |
| Collect | The active community event's shared score target, with your own contribution alongside it | `/collect community`; `/collect next focus` |

A pinned Collect community goal advances when any player's saved contribution changes that shared total. Your own contribution remains identified separately. Reaching the goal does not invent another target or claim a reward; more collecting is optional. See [Community contribution](community-contribution.md).

If a feature has not loaded your progression data yet, the chooser explains that and points to its command. Opening guidance does not assign random Passport requirements, create a task, register a Forage camp, roll stored progress, or load world chunks. A feature that is disabled or inaccessible contributes no selectable goals. The saved pin is retained for recovery, and its bar is removed. Forage's separate live-release acceptance gate remains in place.

## Shared implementation contract

- `FocusGoal` is an immutable read-only snapshot: stable id, exact cycle, title, authoritative current/target, readable progress and next action, icon, owned information destination, and Active/Paused/Complete state. A zero target is reserved for a manual task; its bar never displays an estimated percentage.
- A cycle includes the goal's period and relevant definition. Providers must change it when reusing an id for another objective. Personal task text and creation identity participate in its cycle. Completing a task does not change the cycle.
- `supportsFocusGoals`, `focusGoals` and `focusGoal` opt a Feature Plugin into the registry. The picker supplies bounded choices; the single-object lookup retains completed selections. Background reads query only the selected feature and objective, once per 20 server ticks, from cached state. Providers and view openers run on the main server thread and must not perform blocking I/O or advance gameplay.
- Feature access is rechecked before reading, pinning and opening. The global `onembcmi.global.next` permission is required for focus. There is no new permission or root command. Feature runtime identities and data schemas are unchanged.
- Pin buttons use the shared inventory/session protection. Their owner, goal cycle and current access are revalidated when the deferred action runs. Chat pin tokens are private, single-use, capped at 64 per player, and expire after ten minutes. World changes, unregistering a provider, successful changes and quit invalidate relevant shortcuts. Unrelated players cannot reuse them.
- The Shared Library stores only the selection and visibility under its `playerdata/focus/<uuid>.yml` directory. Bounded serial background I/O uses `PlayerDataStore` atomic replacement and backups. Confirmation follows a successful save. A pending save blocks another change; unreadable or unsupported data fails closed instead of replacing a player's choice with defaults.
- The shared bar is updated in place. It is removed on hide, lost access, missing provider, world change, quit, disable or shutdown. Quiet/dead players are suppressed. Background updates never dispatch commands or send progress chat. Existing non-focus bars belonging to other plugins are not commandeered.
- Configuration: `next.focus.enabled: true`; `next.focus.fade-seconds: 10`, clamped to 3–30 seconds. `next.enabled` also gates the focus display. Explicit hide and clear remain available during a server-side pause. UI strings live under `focus.*` in the shared global translations.

The implementation uses supported Adventure bossbar show/hide and mutable updates, plus a synchronous Paper scheduler for player state; persistence runs separately. See the official [bossbar guide](https://docs.papermc.io/adventure/bossbar/), [Paper scheduling guide](https://docs.papermc.io/paper/dev/scheduler/), and [Paper 26.2 Player API](https://jd.papermc.io/paper/26.2/org/bukkit/entity/Player.html). Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt).

## Verification

Unit tests cover display timing, suppression, completion, manual tasks, period identity, durable replacement/reload, corrupt data and failed writes. The isolated `focusProbeJar` replays the existing next-step checks and exercises the five real focus providers and shared controls using synthetic players, private stores and journals, and no real payouts. Human Java/Bedrock presentation and gameplay acceptance remain in `checklist.md`.

Local verification completed in canonical build **611** on 2026-09-06: **1,183 tests**, zero failures/errors, one skipped; **141 isolated Paper checks** passed. All 64 managed JAR hashes matched before and after. The server stopped cleanly and the temporary probe was removed. Evidence: `.scratch/communication/verification-611/`. Public documentation publication and human client acceptance remain pending.
