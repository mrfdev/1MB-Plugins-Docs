---
title: "Halloween Virus Administration"
description: "Setup, permissions, recovery, and operation of Halloween Virus."
---

Halloween Virus adds the `/hv` adventure to the existing Event Hunts feature plugin. It uses the same suite JAR as Coconut Hunt, Ghost Hunt, and Doors, while keeping its own activation, configuration, entity ownership, player progress, and reward transactions. A fresh installation keeps the HV master switch off until staff arm it.

The [player guide](/player-guides/plugins/halloweenvirus/) explains the story, GUI, fragment locations, and trading. Its public URL is <https://docs.1moreblock.com/player-guides/plugins/halloweenvirus/>; the staff reference is at <https://docs.1moreblock.com/staff-reference/plugins/halloweenvirus/>. Both guides are available for advance reading before event activation. `halloweenvirus-docs.yml` records their source metadata, and the documentation generator includes both authored guides.

For launch preparation, read [Safe rollout and acceptance](#safe-rollout-and-acceptance). Publishing these guides does not deploy a JAR, enable the event, grant player permissions or announce it. An early public opening uses `/hv admin start` after validation; the confirmed end and reward dates still apply. Use `/hv admin auto` when the hunt should wait for its scheduled opening.

## Activation and seasonal dates

The confirmed 2026 season uses **Europe/Amsterdam** time. The hunt opens **1 October at 00:00**, includes all of Halloween weekend and 1 November, and stops **2 November at 00:00**. Claims open **25 October at 00:00**, include all of 4 November, and close **5 November at 00:00**.

| Local phase | Runtime state and behavior |
| --- | --- |
| Before 1 October | `SCHEDULED` when automatic mode is armed; no encounters, deposits, or claims yet. |
| 1 October–1 November | `LIVE`; hunting and deposits are available. Reward claims additionally require the 25 October opening date. |
| 2–4 November | `CLAIMS ONLY` while claims are enabled: new encounters stop, but unused authentic sherds can be submitted and eligible rewards claimed. |
| From 5 November | `DORMANT`; encounters, deposits, and claims are closed. Progress and item protection remain. |

These transitions follow the saved dates and happen automatically while the server is running, or take effect immediately after a restart. They do not rewrite `event.mode`, reset players, change the event id, or repeat annually. A manual run also honors its configured end and claim deadline. Custom dates continue to govern custom schedules.

### One-time calendar upgrade and arming

The initial event id is `halloween_virus_2026`. On a fresh installation or an upgrade with that id and **both hunt dates blank**, the one-time calendar migration fills the confirmed start and end and selects `auto` from `dormant`. An existing `manual` mode is retained, so an early staff test is not stopped merely because 1 October has not arrived. Existing custom or partially filled hunt schedules, other edition ids, claim dates, time zone, and claim pause settings are preserved.

The migration records `event.calendar-version: 1`. Once recorded, a later `/hv admin stop` stays stopped across reloads and restarts; the upgrade does not rearm it. This metadata is managed by the plugin, separate from the configuration and ledger schema versions.

**`modules.hv.enabled: false` remains the master off switch.** The calendar migration never changes it. Fresh installations retain that default, and an existing deliberate host disable stays off even when `event.mode` is `auto` and the dates are in season. Existing Coconut, Ghost, and Doors switches and data are unaffected.

After reviewing the worlds, kits, reward, and participant permissions, arm the saved dates once:

```text
/hv admin validate
/hv admin auto
/hv admin status
```

`/hv admin auto` uses the already configured dates and enables the host's HV switch through its normal module control. It works in game and console with `onembcmi.HalloweenVirus.admin.event`; omit `/` in console. Arming a dormant, automatic, or host-disabled event before 1 October produces `SCHEDULED`. It does not replace custom dates or grant player access. If the host module is already enabled and its manual hunt is active, `auto` leaves that run unchanged.

If the host module is disabled with `event.mode: manual` still saved, `auto` saves automatic mode before re-enabling the module. It therefore waits for the configured start instead of resuming an early manual hunt. During 2–4 November it restores only the claims phase, subject to the saved claim settings. A disabled module does not need a separate `stop` command first. Collection progress, existing sherd identities, custom dates, and player permissions remain unchanged.

Use `auto` again to rearm after an explicit staff stop, including during the 2–4 November claims-only period. It accepts an elapsed hunt end and uses the current phase; after the entire season has closed it reports `DORMANT` without rewinding the dates. Loading another JAR, reaching 1 October, or restarting does not undo a staff stop. To replace the hunt dates deliberately and arm automatic scheduling, the exact confirmed 2026 ISO-instant command is:

```text
/hv admin schedule 2026-09-30T22:00:00Z 2026-11-01T23:00:00Z
```

Those UTC instants represent Amsterdam midnight on 1 October and 2 November respectively. The offset changes during the season; do not reuse a fixed UTC offset for every date.

The modes are:

| Mode | Behavior |
| --- | --- |
| `dormant` | No new encounters, collection submissions, or completion claims. Progress remains stored. |
| `manual` | Staff-started hunt, including before the configured start; its configured end stops new encounters. Collection and claims can continue during the separate claim window. |
| `auto` | Hunt runs from the configured start instant, inclusive, until the end instant, exclusive. Both dates are required. Collection and claims can continue afterward during the claim window. |

`/hv admin start` enables a deliberate manual test or public run immediately, even before the scheduled opening, while retaining the configured end. Access remains separately permission-gated, so grant the player permission to a small test group first. `/hv admin stop` returns the event to dormant. `/hv admin announce` is a separate deliberate announcement action; calendar activation does not itself send that announcement.

### Reward claim window

The confirmed window is **25 October through 4 November 2026**, inclusive, in `Europe/Amsterdam`. Claims open at local midnight on the first day (`2026-10-24T22:00:00Z`) and close at local midnight following the last day (`2026-11-04T23:00:00Z`). The named time zone handles daylight-saving changes; these are calendar dates, not fixed UTC offsets. Calendar migration preserves any existing custom claim window and pause setting.

```text
/hv admin claimwindow 2026-10-25 2026-11-04 Europe/Amsterdam
/hv admin claims status
/hv admin claims pause
/hv admin claims resume
```

These commands persist settings and work in game and from console with `onembcmi.HalloweenVirus.admin.event`. In console, omit `/`. The zone is optional for `claimwindow`; omitting it retains the current zone. Dates use `YYYY-MM-DD` and both endpoint days are included. Pausing claims does not stop the hunt; resuming only enables claims within their dates, with all collection, reward, permission, and inventory checks still required.

Completing 23/23 before opening saves progress without issuing the reward. After a manual or automatic hunt reaches its configured end, new encounters stop, but unused authentic sherds can still be submitted and rewards claimed during the claim window. This gives returning players time to finish through existing drops or trades. In automatic mode the hunt must have reached its configured start before claims can open. Keep the module enabled and the event in `manual` or `auto` during this grace period. **`/hv admin stop` explicitly selects `dormant` and blocks submissions and claims as well as encounters**, regardless of dates. Pausing claims after the hunt ends also closes grace-period submissions until claims resume.

The player head, field guide, `/hv info`, and status commands show the current runtime phase and local hunt dates, including the distinction between `SCHEDULED`, `LIVE`, `CLAIMS ONLY`, and `DORMANT`. The reward button, completion feedback, and placeholders also expose the separate claim window. Reward readiness does not override the date gate. Review and configure dates deliberately for each new edition; there is no automatic annual rollover.

## Command reference

Player commands are `/hv`, `/hv info`, `/hv help`, `/hv book`, `/hv journal`, `/hv notes`, `/hv seal`, `/hv outbreak`, `/hv worlds`, `/hv hints [world-key]`, `/hv collect`, `/hv claim`, `/hv effects <full|reduced|off>`, and `/hv reminders [on|off]`. The first opens the six-row collection GUI. The story book and second menu page explain the event and current world/mob hints. The field journal unlocks collection chapters; notes record eligible regional combat and the Seal provides an optional ending. `/hv outbreak` reports temporary regional focus and the weekly schedule. The two direct transaction commands apply the same checks as their GUI buttons. Player routes require an in-game player and the existing `onembcmi.HalloweenVirus.use` permission; console uses the corresponding staff status routes.

### Delayed join invitations

An enabled, active hunt sends one private invitation about 90 seconds after a player joins. Delivery rechecks that the player is still online, has HV access, has fewer than 23 recorded sherds, and has not dismissed reminders for this event edition. Dormant, scheduled, unavailable and reward-only phases stay silent for these hunt invitations. Leaving cancels the pending invitation; reconnecting starts the full delay again. Settings reloads do not requeue an already handled login. Players present during initial module startup receive the same delay from startup.

The default text introduces the scary fall season, spreading virus, 23 sherds and reward claim dates. **[/hv]** opens the menu; **[Don't remind me again]** saves the player's opt-out. `/hv reminders` reports the current preference: `off` hides both later join invitations and the reward-claim reminder; `on` restores future join invitations and an unsent reward reminder when eligible. These commands also work while the event is dormant, provided the module and storage are available. The click includes its original event ID, so an old-season button cannot mute another edition. Saving must succeed before an acknowledgement is shown; a failed save does not silently claim that reminders were disabled.

| Setting | Default | Accepted values |
| --- | --- | --- |
| `announcements.join.enabled` | `true` | Boolean; independent of periodic and manual broadcasts. |
| `announcements.join.delay-seconds` | `90` | Whole seconds from 60 through 120. |
| `announcements.join.message` | Fall-season virus invitation | 1–500 characters of plain text on one line; menu and dismissal buttons are appended automatically. |

Use the existing `/hv admin set <path> <value>` while dormant, or edit the config and `/hv admin reload`. Missing defaults migrate automatically without changing existing announcements. `/hv admin status` shows the global switch and delay; `/hv admin inspect <player|uuid>` shows that player's saved choice. `/hv help`, `/hv debug commands` and tab completion include the player command.

Dismissal is saved by authoritative UUID and `event.id` in `ledger.yml` as `players.<edition>.<uuid>.invitation-dismissed`. Missing values mean invitations are enabled, and existing ledgers require no eager rewrite. Both collection reset modes preserve it; a deliberately new edition starts with a fresh preference. This never consumes sherds, changes rewards or affects effects preferences. The main-thread heartbeat keeps only pending UUIDs and join times, with no per-player scheduled tasks; disk writes use the existing storage worker. Quit and runtime shutdown release pending entries. Choosing a preference also cancels that login's pending invitation before its save.

### Reward-claim reminder

One private reminder per **player UUID and event edition** points a player with all 23 recorded sherds to `/hv` when claims are available. It uses the actual claim calendar, including **25 October through 4 November in Europe/Amsterdam**, and continues through the **2–4 November claims-only period**. Players already online beyond the join delay are checked when claims open; offline players wait for their next eligible login. Completion, permission grants, opting back in, claim resumption or a corrected reward kit can make a waiting online player eligible later without another login.

Delivery requires an online, alive player in Survival with HV access, a complete saved collection, no pending collection or reward, no delivered reward, no busy HV action, reminder opt-in and no saved reminder receipt. The module, ledger and claim settings must be ready, claims open and reward preflight clear. It waits while claims are paused or the placeholder reward is blocked. It does not require inventory space to display the notice; the normal claim checks still apply when the player chooses to claim. The message includes the current claim dates and the same `/hv`/dismissal buttons, and never executes a claim or opens a GUI automatically.

| Setting | Default | Accepted values |
| --- | --- | --- |
| `announcements.reward-reminder.enabled` | `true` | Boolean; independent of hunt invitations and broadcasts. |
| `announcements.reward-reminder.delay-seconds` | `90` | Whole seconds from 60 through 120 after joining or plugin startup. |
| `announcements.reward-reminder.message` | Completed-collection reward notice | 1–500 characters of plain text on one line; claim dates and buttons are appended. |

Existing configs gain these missing defaults automatically. Use `/hv admin set <path> <value>` while dormant, or edit the config and `/hv admin reload`. Status/debug output shows the switches and delays; `/hv admin inspect <player|uuid>` reports the saved receipt. The existing `/hv reminders off` preference applies to both kinds of private reminder; staff broadcasts remain independent.

The existing heartbeat tracks only online UUIDs, join times and this session's notification edition, with no extra timer per player. It sends at most one notice per heartbeat and permits only one pending receipt write, using the existing storage worker. The optional schema-1 field `players.<edition>.<uuid>.reward-reminder-sent` defaults false without rewriting old ledgers. After sending, the worker saves it atomically; normal relogs, settings reloads, restarts, preference toggles and either progress reset preserve a committed receipt. A new edition has its own receipt. No sherd, reward transaction, drop balance or collection state is changed.

Chat has no client acknowledgement. If the server crashes between sending and saving, or storage fails, the notice can repeat on a later reconnect/restart; storage failure is logged and the current session is suppressed. Quit releases the session entry, shutdown clears the tracker and already queued writes drain with the normal storage worker. These notification receipts never serve as proof of reward delivery.

### Staff commands

| Staff command | Purpose |
| --- | --- |
| `/hv admin status` | Show activation, ledger, kit, world, and encounter readiness. |
| `/hv admin report [1-168] [all\|world-key]` | Staff balance totals, default 24 hourly buckets, with natural and admin test encounters separated; requires `admin.inspect`. |
| `/hv admin rewardtrophy [online-player\|uuid]` | Give the 2026 trophy and general story-book templates for reward-kit setup. Defaults to yourself; console must supply an online recipient. |
| `/hv admin validate` | Check the current configuration, mapped worlds, all 24 CMI templates, and safety gates. |
| `/hv admin reload` | Reload the Halloween Virus configuration and runtime. |
| `/hv admin start` | Deliberately start the event for authorized players. |
| `/hv admin auto` | Arm saved hunt dates and enable the HV module; preserve a manual hunt only when the module is already enabled and that hunt is active. |
| `/hv admin stop` | Stop new event actions and clean up owned infected mobs. |
| `/hv admin announce` | Announce the active event and its gameplay introduction. |
| `/hv admin schedule <start> <end>` | Replace hunt start/end ISO instants, select automatic mode, and enable the HV module. |
| `/hv admin world <key> <actual-world>` | Map an event region to an existing server world. |
| `/hv admin set <config-path> <value>` | Edit an existing scalar or list setting while the event is dormant, then validate it. |
| `/hv admin spawn <mob> [variant]` | Create a real infected encounter, optionally choosing an eligible variant such as `boss`; normal safety checks and drop rules still apply. |
| `/hv admin appearance [world-key]` | Read configured regional names, outfit profiles and boss outline colors for all regions or one logical region. Console supported. |
| `/hv admin cleanup [all\|loaded-world]` | Remove loaded event-owned mobs and projectiles in all worlds or one named loaded world, without rewards. |
| `/hv admin spawning status` | Show the persisted spawning pause, natural conversion percentage, and current infected count. |
| `/hv admin spawning pause` | Stop new natural infections and staff test spawns; leave existing encounters and the collection open. |
| `/hv admin spawning resume` | Resume spawning under the configured schedule, rules, caps, and cooldowns. |
| `/hv admin spawning rate <percent>` | Set the natural conversion chance from 0 to 100 percent, including decimals, without ending existing encounters. |
| `/hv admin signatures <status\|on\|off>` | Inspect or toggle telegraphed regional boss moves live. |
| `/hv admin signatures move <world-key> <none\|rush\|guard\|pulse>` | Set the move for one logical region; existing bosses use updated settings. |
| `/hv admin signatures cooldown <seconds>` | Set the delay between boss moves to a whole 10–120 seconds. |
| `/hv admin outbreak [status]` | Inspect the current regional focus, effective chance, expiry and weekly rotation. |
| `/hv admin outbreak start <world-key> <minutes> [multiplier]` | Start a manual focus in an enabled loaded region for 1–1440 whole minutes at 1–5 times the base chance; default multiplier 2. |
| `/hv admin outbreak cancel` | Clear a manual focus and suppress the currently selected scheduled window until its expiry. |
| `/hv admin outbreak rotation <on\|off>` | Enable or disable the weekly rotation; a manual focus is separate. |
| `/hv admin outbreak rotation day <weekday> <world-key\|none>` | Assign one weekday to a logical region or skip that day. |
| `/hv admin outbreak rotation <time\|duration\|multiplier> <value>` | Set the daily `HH:mm` start, 1–1440 whole minutes or 1–5 multiplier. |
| `/hv admin particles [status]` | Inspect the global particle switch, boss/infected aura types, intensity and distance counts. |
| `/hv admin particles <on\|off\|types\|reset>` | Toggle particles, list supported aura types, or reset both aura profiles while preserving the global switch. |
| `/hv admin particles type <boss\|infected> <particle>` | Change the selected aura's particle type live, including already spawned encounters. |
| `/hv admin particles intensity <boss\|infected> <0.25-4>` | Set a bounded density multiplier for full effects; reduced/off preferences still apply. |
| `/hv admin glow [status\|colors]` | Inspect regional boss outline settings or list supported colors. |
| `/hv admin glow <on\|off> <world-key\|all>` | Enable or disable boss outlines live for one logical region or all configured regions. |
| `/hv admin glow color <world-key> <color>` | Change one region's boss outline color live, preserving its enabled/disabled setting. |
| `/hv admin friendly <status\|on\|off>` | Inspect or toggle optional infected animal packs; turning off removes active infected animals on the next encounter pulse. |
| `/hv admin friendly duration <60-120>` | Set the chase duration in seconds for newly created packs. |
| `/hv admin friendly mobs <world-key> <types\|none>` | Choose comma-separated supported animal types for one logical region, or clear that region's animal list. |
| `/hv admin claimwindow <first-day> <last-day> [time-zone]` | Set inclusive reward claim dates in `YYYY-MM-DD` format and optionally their named time zone. |
| `/hv admin claims <status\|pause\|resume>` | Inspect or pause/resume completion claims without stopping a live hunt. |
| `/hv admin inspect <uuid-or-online-player>` | Inspect collection, pending operations, and reward state for that identity. |
| `/hv admin reset <player\|uuid> [collection] [--confirm <reason>]` | Preview or clear a player's collection for the current edition; retain any claimed-reward lock. |
| `/hv admin reset <player\|uuid> all [--confirm <reason>]` | Also clear the reward claim so the player can earn another after collecting all 23 again. |
| `/hv admin resolve <uuid-or-online-player> <collection\|reward> <delivered\|retry> --confirm` | Reconcile a specific unresolved operation after inspecting its evidence. |
| `/hv debug status` | Show runtime health and blockers. |
| `/hv debug commands` | List commands and descriptions. |
| `/hv debug permissions` | List the exact permission nodes. |
| `/hv debug placeholders` | List registered PlaceholderAPI values. |
| `/hv debug config` | Show configuration and storage details. |
| `/hv debug pdc` | Inspect event identity on inventory items. |
| `/hv debug pdc hand` | Inspect the exact held copy and state whether it has HV modification protection. |
| `/hv debug pdc stamp` | Explicitly authenticate matching legacy kit sherd samples in the staff player's inventory. |

Read the current command and permission catalog before delegating staff access. The staff test-spawn and PDC inventory commands require an in-game player. Scheduling and `auto`, spawning, signature moves, regional outbreaks, particle and boss outline controls, cleanup, claim-window controls, and player resets also work from console without the leading `/`. Administrative player identities use authoritative server UUIDs; no Mojang lookup or generated name UUID is a fallback.

## Preparing the trophy and story book

Run `/hv admin rewardtrophy` in game with **two empty storage inventory slots**. It gives one shimmering **Virus Survivor 2026** echo shard and one signed written book, **The Autumn We Endured**, with eight short pages about the fall-season adventure and its place within `/halloween`. The book author is **1MoreBlock**; neither item includes a player name, personal progress or CMI substitution tokens. The trophy uses the native glint override, without unsafe enchantments or combat bonuses. Each item has a maximum stack size of one.

Permission: `onembcmi.HalloweenVirus.admin.rewardtrophy`, also included in `onembcmi.HalloweenVirus.admin`. This authoring permission defaults to false and is separate from event controls and player participation. The command works while dormant and while the placeholder reward kit is still blocked. You may repeat it deliberately for spare templates; it does not complete a collection or record/deliver a player's event claim.

Console usage is `hv admin rewardtrophy <online-player|uuid>`. In game, the optional recipient works too. Names must exactly match a real online username, case-insensitively, preserving the Floodgate prefix such as `.Player`; UUID targeting uses the actual server UUID. No external identity lookup or offline delivery occurs. Dead/offline recipients and players with a busy HV inventory transaction are rejected. If there is insufficient room for both items, neither is given and nothing drops on the ground.

When finalizing `hvreward`, add these **authoring copies** through your normal CMI kit editor. The command does not edit, replace or enable any CMI kit. The small `hv_keepsake` PDC marker identifies their cosmetic design only; it is not collection authentication or a reward issuance id. These templates remain editable and reusable. **Do not stamp them or save copies already delivered by `/hv claim` back into a kit.** Normal HV claims clone the templates, preserve the book/components and add fresh issue, recipient and transaction identities for each awarded copy. That issued reward then receives the existing HV item-modification protection. Moving, storing, trading and reading follow the existing rules.

Run `/hv admin validate` after completing the whole kit. These two safe templates do not remove restrictions on other placeholder items, change the claim dates, grant public access or bypass collection requirements. This command intentionally creates the commemorative **2026** design; changing the event id does not rewrite its story/year. `/hv help`, `/hv debug commands`, `/hv debug permissions` and tab completion list the command; `/hv debug pdc` also shows the cosmetic keepsake marker.

## Staff balance report

Use `/hv admin report` for the latest 24 hourly buckets, `/hv admin report 1 wild` for the current hour in Wilderness, or `/hv admin report 168 all` for the retained week. Console and players with `onembcmi.HalloweenVirus.admin.inspect` can use it, including while the event is dormant. The existing `onembcmi.HalloweenVirus.admin` umbrella also grants access. Help, debug command descriptions and tab completion include the route.

Each row shows **spawns / eligible kills / sherds placed**, separately for natural infections and `/hv admin spawn` encounters. Spawns count successful conversions, including infected animal packs. Kills count confirmed, uncancelled deaths with an eligible recent player contribution and the normal protection checks. Cleanup, expiry, environmental deaths and cancelled deaths do not inflate eligible kills. Sherds count actual valid item entities placed after issuance, not random-roll successes, pickups or player submissions. A kill near an hour boundary can have its eventual drop in the following bucket. Do not interpret a small sample as a guaranteed 75% ratio or divide kills by spawns as a success rate for the same cohort.

**Completions** count successful normal deposits that reach 23/23, attributed to the world where the final submission began. They include another completion after a staff reset and exclude staff reconciliation. They are not unique participants, regional collection completion or proof of where items were earned: trading and submissions in spawn are valid. The all-world total includes unmapped submission worlds, summarized separately. Configured world keys resolve to their current actual world IDs; changing a mapping leaves old-world totals in the other/unmapped summary.

Statistics begin on installation of this feature, without inventing earlier history. Hourly buckets use UTC boundaries (the displayed timestamps use the event time zone); the current hour is partial. The report prints its window and tracking start. Retention is 168 buckets, with at most 64 distinct world rows plus an overflow row per hour. An edition change starts fresh diagnostic totals; player resets do not erase them.

`balance.yml` sits alongside `ledger.yml` in the HV data directory and is **diagnostic only**. Counters contain no player UUIDs, entity references or item metadata. The existing serialized storage worker loads, aggregates and atomically saves them approximately every 60 seconds and on clean runtime shutdown. A crash, full shutdown queue or failed save can lose unsaved counters; the report is not an audit or reward authority. Failed saves keep in-memory totals for retry and display a warning. A corrupt/missing-primary-with-backup report is preserved and disables statistics, without blocking the hunt or modifying the player ledger; after staff repair, `/hv admin reload` retries loading. Only one report and one periodic save may be pending at a time.

## Permissions

`onembcmi.HalloweenVirus.use` defaults to false. Grant it deliberately to event participants; installing the module never grants public participation automatically. `onembcmi.HalloweenVirus.admin` and its granular children also default to false. Use `/hv debug permissions` for the command-specific children and descriptions registered in the running build.

| Permission | Purpose |
| --- | --- |
| `onembcmi.HalloweenVirus.use` | Player GUI, information, journals/notes/Seal, outbreak status, collection, claim, and preferences. |
| `onembcmi.HalloweenVirus.admin` | Parent for Halloween Virus administration. |
| `onembcmi.HalloweenVirus.admin.event` | Start, stop, automatic arming, status, validation, reload, configuration, scheduling, spawning, regional outbreaks, boss signatures, particles, boss outlines and friendly-animal controls, appearance diagnostics, cleanup, and reward claim dates/pause. |
| `onembcmi.HalloweenVirus.admin.announce` | Announce the outbreak to permitted players. |
| `onembcmi.HalloweenVirus.admin.spawn` | Spawn bounded staff test encounters. |
| `onembcmi.HalloweenVirus.admin.inspect` | Inspect player progress, unresolved operations and the staff balance report. |
| `onembcmi.HalloweenVirus.admin.reconcile` | Confirm reconciliation of unresolved operations. |
| `onembcmi.HalloweenVirus.admin.reset` | Preview and confirm per-player collection resets. |
| `onembcmi.HalloweenVirus.admin.reset.reward` | Additionally permit the `all` reset mode; also requires `admin.reset`. |
| `onembcmi.HalloweenVirus.admin.debug` | Read command, permission, placeholder, configuration, and runtime diagnostics. |
| `onembcmi.HalloweenVirus.admin.pdc` | Inspect inventory identity and deliberately stamp legacy kit sherd samples. |
| `onembcmi.HalloweenVirus.admin.rewardtrophy` | Give reusable 2026 trophy and story-book templates to yourself or an online recipient. |

Group-targeted LuckPerms grants use the intended group id. Individual grants use the real server UUID, including Floodgate players. Keep staff mutation permissions separate from the general player access node.

## PlaceholderAPI

These values read cached event and UUID progress snapshots. They do not consume fragments, claim rewards, load chunks, or run commands.

| Placeholder | Value |
| --- | --- |
| `%onembcmi_HalloweenVirus.state%` | Human-readable runtime/schedule state, including blockers. |
| `%onembcmi_HalloweenVirus.live%` | Whether the module is currently active. |
| `%onembcmi_HalloweenVirus.event%` | Current event-edition id. |
| `%onembcmi_HalloweenVirus.end%` | Configured hunt end in the displayed local time zone, or dates-awaiting-review text. |
| `%onembcmi_HalloweenVirus.collected%` | Number of distinct recorded fragments. |
| `%onembcmi_HalloweenVirus.remaining%` | Number of missing fragment types. |
| `%onembcmi_HalloweenVirus.claimable%` | Whether the claim window, event, progress, and reward setup allow a claim; inventory capacity is checked at execution. |
| `%onembcmi_HalloweenVirus.claim_window%` | Inclusive first/last claim dates and named time zone. |
| `%onembcmi_HalloweenVirus.claims_open%` | Whether the current event state and date window permit claims. |
| `%onembcmi_HalloweenVirus.spawning_paused%` | Whether spawning is paused or blocked by a pending/failed settings save; other activation/protection/load gates still apply. |
| `%onembcmi_HalloweenVirus.spawn_rate%` | Configured base conversion percentage per eligible natural spawn, before a regional outbreak multiplier. |
| `%onembcmi_HalloweenVirus.reward%` | Durable reward state. |
| `%onembcmi_HalloweenVirus.effects%` | `full`, `reduced`, or `off` preference for the current edition. |
| `%onembcmi_HalloweenVirus.journal_unlocked%` | Story chapters available from the player's saved collection, including the opening chapter; 1 without a player context. |
| `%onembcmi_HalloweenVirus.journal_total%` | Total story chapters, currently 7. |
| `%onembcmi_HalloweenVirus.field_notes%` | Number of regional notes saved for this UUID and edition; 0 without a player context. |
| `%onembcmi_HalloweenVirus.seal_solved%` | Whether this UUID has saved the optional Seal ending for this edition; false without a player context. |
| `%onembcmi_HalloweenVirus.outbreak_world%` | Active regional focus's logical world key, or an empty string when there is no active focus. |
| `%onembcmi_HalloweenVirus.outbreak_ends%` | Active regional focus's exclusive end as an ISO instant, or an empty string. |

## Worlds, mobs, and fragment pools

World names are exact server identifiers. A display label such as **The End** is not enough to authorize a world. Map each logical region to an existing loaded test world before enabling its encounters. Unlisted worlds are denied. Creating worlds is an owner action; the plugin does not create them, load absent worlds, or force-load chunks.

Every region begins disabled pending mapping and protection review. The starting mappings and mob sets are `end` → `minecraft:the_end` (Enderman), `general` → `general` (Bogged), `nether` → `minecraft:the_nether` (Wither Skeleton, Piglin), `wild` → `wild` (Zombie, Husk, Drowned), `cave` → `cave` (Skeleton, Spider), `acid` → `acidisland` (Drowned, Zombie), `skyblock` → `bskyblock` (Skeleton, Zombie), `oneblock` → `oneblock` (Spider, Zombie), `chunkblock` → `chunkblock` (Zombie, Spider), and `skygrid` → `skygrid` (Skeleton, Spider). Verify these against the actual server instead of assuming an installed world exists.

| Region key | Display region | Kits |
| --- | --- | --- |
| `end` | The End | `hv01`, `hv02` |
| `general` | General World | `hv21` |
| `nether` | The Nether | `hv03`, `hv04`, `hv05` |
| `wild` | The Wilderness | `hv06`, `hv07`, `hv08` |
| `cave` | Cave World | `hv09`, `hv10` |
| `acid` | Acid World | `hv11`, `hv12`, `hv23` |
| `skyblock` | Skyblock | `hv13`, `hv14` |
| `oneblock` | Oneblock | `hv15`, `hv16`, `hv22` |
| `chunkblock` | Chunkblock | `hv17`, `hv18` |
| `skygrid` | Skygrid | `hv19`, `hv20` |

General World is a separate logical region, mapped to the actual world `general`, with `BOGGED` as its only starting hostile type. It starts disabled pending the same mapping and protection review as other regions. Confirm that the world contains usable swamp or mangrove swamp habitat: [Minecraft’s official Bogged description](https://www.minecraft.net/en-us/article/minecraft-java-edition-1-21) lists those natural spawning biomes. Bogged from trial spawners, eggs and commands do not enter the automatic infection path. Staff can use `/hv admin spawn BOGGED boss` in an enabled General World for an explicit test; that remains subject to the normal test-spawn gates.

The one-time regional upgrade moves `hv21` out of the End pool and into General World while retaining all other configured pool entries. Endermen outside the logical `end` region are replaced with spiders, except in General World where they become Bogged. Other configured mob types are retained and duplicate entries are removed. This leaves Oneblock with spiders and zombies in the starting configuration; the other game-type defaults already use Overworld mobs. Existing custom Nether/End mob choices other than Endermen are not silently removed: review those lists against your intended world theme.

Collected `hv21` remains collected. Authentic unused `hv21` copies found in the End still work, including after a trade. No kit is renamed, renumbered, recaptured or restamped, and no player progress is reset. The edition, issued-item identity and spent-item rules are unchanged. A newly added General region remains disabled until staff review and enable it; this can temporarily leave `hv21` available only through existing copies and trades.

Selections are balanced per recipient UUID and event edition: choose randomly among the least-issued types in the eligible world pool, then durably advance the selected type's count. The 75% default drop roll is separate from this choice. Trading does not rewrite issuance history. A delivery interrupted after reserving a selection can advance the balance without delivering an item; it does not cause an automatic duplicate payout.

The regular infected mob set uses existing vanilla combat behavior: zombies, husks, drowned, skeletons, strays, bogged, wither skeletons, endermen, shulkers, spiders, cave spiders, piglins, and piglin brutes. World rules must choose an appropriate subset. Optional animal packs use a separate supported chase goal and require explicit configuration, described below. Other passive mobs, such as bats, remain unsupported. A mob must support the configured natural-spawn path to appear without a staff test spawn.

### Finding and testing encounters

`/cmi spawnmob` does not trigger random infection: automatic conversion accepts only untouched natural spawns. The default chance is 1.5% per eligible natural spawn, with a 90-second participant cooldown and the configured encounter caps. For a direct test, enter an enabled world with a matching mob, such as `wild` for zombies, use Survival with god mode and vanish off, and move at least 120 blocks from that world's spawn. Look at solid ground within 24 blocks with two clear blocks above it, then run `/hv admin spawn ZOMBIE` while the event is active. Both your location and the mob location must pass protection checks and the default 96-block spawn safety radius.

The command reports the actual blocking condition, including unsafe ground, game mode, active vanish, invulnerability, missing access, spawn distance, world border, protection denial, server load, and encounter caps. Vanish eligibility uses CMI’s supported API and the player’s existing local UUID record. A fresh CMI vanish check also honors compatible vanish-provider flags. Missing CMI, missing cached identity, or an API failure blocks combat participation until the integration is available; the check performs no external identity lookup. Staff-spawned infected mobs use the same weighted variants and eligible-kill loot rules as natural encounters; the command bypasses the random conversion chance and player spawn cooldown, but not the spawning pause, world/protection rules, or caps. These explicit test spawns use Bukkit's `CUSTOM` spawn reason and remain subject to installed plugins' spawn-event rules; they are not `NATURAL` spawns.

Encounter caps, minimum/maximum player distance, cooldowns, lifetimes, health, damage, scale, variant weights, and effects are runtime-controlled. Use the in-game guide and config diagnostics for the installed settings. Normal infected and boss variants must remain recognizable and escapable. A permitted kill creates at most one fragment; parties can share the physical item, not claim a second personal copy for every contributor.

Particles are private visual effects for permitted, online, alive viewers within 24 blocks who can see the infected mob. With `encounters.particles: true`, `/hv effects full` emits the configured aura about once per second, spread around the mob's body. At intensity `1`, ordinary infected emit 16/10/5 particles within 8/16/24 blocks; bosses emit 48/32/16. Both profiles default to purple Witch particles. `reduced` keeps one particle every four seconds regardless of intensity, and `off` emits none. Nearby-player queries and per-pulse viewer budgets cap full effects at 96 particles per player and reduced effects at eight, shared across encounters even in a crowd. Client particle settings still apply. God mode, vanish, and non-Survival modes do not suppress these private visuals. They still block combat participation, new test spawns, and fragment rewards. Viewers alone do not keep an encounter alive: without an eligible combat participant, the normal disengagement timer still removes it. For a visual test, spawn an encounter in eligible Survival first, then enable god mode and compare `full`, `reduced`, and `off` before that timer expires.

Change aura settings during the event, without stopping HV or restarting the server. Wait for each saved-status response before the next change:

```text
/hv admin particles status
/hv admin particles types
/hv admin particles type boss END_ROD
/hv admin particles intensity boss 1.5
/hv admin particles type infected SOUL
/hv admin particles intensity infected 0.5
```

These changes apply to existing and newly spawned encounters on their next due effects pulse and persist across restarts. They do not clear mobs, pause spawning, invalidate collection/claim actions, close menus, or change player preferences. Invalid values are rejected before saving, and a failed save leaves the prior visuals active. Supported types are `WITCH`, `SOUL`, `SOUL_FIRE_FLAME`, `END_ROD`, `ENCHANT`, `PORTAL`, `REVERSE_PORTAL`, `CRIMSON_SPORE`, `WARPED_SPORE`, `SMOKE`, and `FLAME`. Type names are case-insensitive; `minecraft:end_rod` is also accepted. Types that need extra item/block/color data or emit additional bursts are excluded from this bounded aura setting.

Intensity accepts finite values from `0.25` to `4`. It multiplies the distance-based full count, rounded to an integer and capped by the shared viewer budget; raising it does not bypass reduced/off preferences. For example, boss intensity `1.5` requests 72/48/24 particles at the three distance bands. `/hv admin particles reset` restores both types to `WITCH` and both intensities to `1`, retaining the global enabled/disabled state. `/hv admin particles off` and `on` toggle the existing global particle switch, including completion particles; completion sounds remain separately controlled. Aura types and intensity affect encounters only, so the completion celebration retains its own colors and counts.

| Setting | Default | Purpose |
| --- | --- | --- |
| `encounters.particles` | `true` | Existing global switch for encounter and completion particles. |
| `encounters.aura.boss.particle` | `WITCH` | Boss aura type. |
| `encounters.aura.boss.intensity` | `1.0` | Boss density multiplier, 0.25–4. |
| `encounters.aura.infected.particle` | `WITCH` | Ordinary infected aura type. |
| `encounters.aura.infected.intensity` | `1.0` | Ordinary infected density multiplier, 0.25–4. |

Upgrades fill missing aura settings automatically, retain an existing `encounters.particles: false`, and preserve already configured aura values. No new permission or placeholder is needed; `/hv help`, `/hv debug commands`, `/hv debug config` and tab completion expose the controls.

The initial conversion chance is 1.5% of eligible natural spawns, with infected/boss weights 9:1. Spawners, eggs, breeding, other plugin spawns, named mobs, pets, and existing herds are excluded. Passive animals are eligible only through the separately enabled friendly-animal settings. The eligible Survival player must be both the tracked last direct attacker and Bukkit's credited killer, with a hit in the previous 30 seconds and no more than 64 blocks separation. This excludes automated or environmental reward harvesting.

Default limits are 48 owned mobs globally, 12 per world, and three near a player. New encounters use a 90-second player cooldown and pause when measured MSPT exceeds 45. Mobs expire after 600 seconds and disengage after 60 seconds. Event tasks inspect the bounded owned set instead of globally scanning every entity every tick.

### Adjusting a live outbreak

Use the dedicated spawning controls while the hunt is live; they save without despawning existing encounters or changing player progress:

```text
/hv admin spawning status
/hv admin spawning rate 0.5
/hv admin spawning pause
/hv admin cleanup all
/hv admin spawning rate 1.5
/hv admin spawning resume
```

`rate 0.5` means a 0.5% conversion chance for each eligible natural spawn. It is not a multiplier for vanilla mob spawning, and it does not change the fragment drop chance. `rate 0` stops natural conversions but still permits explicit staff test spawns; `pause` stops both. Pausing leaves existing infected active and eligible for normal combat drops. Caps, cooldowns, protections, and load limits always remain in force, including at 100%.

To stop further infections and remove existing ones, pause first, then clean up. `/hv admin cleanup wild` targets the actual loaded world named `wild`; omitted scope or `all` targets all loaded worlds. Only HV-owned entities and their projectiles are removed, using removal rather than combat death, so no loot or experience is awarded. Ordinary mobs remain. Cleanup cancels queued conversions globally, including with a single-world scope, but does not pause future spawning. It never loads worlds or chunks; stale tagged infected are removed when their entities load later. Spawning pause and rate persist across restarts. A failed spawning-settings save keeps new spawning blocked until a successful retry or reload.

### Temporary regional outbreaks

Regional outbreaks temporarily multiply the natural infection chance in one enabled region. They do not change the base rate, vanilla spawn frequency, fragment pools, the 75% default kill-drop roll or the balanced fragment selection. Other regions keep the base chance. The effective chance is capped at 100%; a zero base chance remains zero. Hunt dates, global spawning pause, protection checks, eligible players, load limits, caps and cooldowns remain authoritative.

These commands work live and from console under `onembcmi.HalloweenVirus.admin.event`. Use a logical region key, such as `wild`, and wait for each save confirmation:

```text
/hv admin outbreak status
/hv admin outbreak start wild 120 2
/hv admin outbreak cancel
/hv admin outbreak rotation day monday wild
/hv admin outbreak rotation time 18:00
/hv admin outbreak rotation duration 120
/hv admin outbreak rotation multiplier 2
/hv admin outbreak rotation on
```

Manual starts require an active hunt, unpaused spawning, a positive base chance and an enabled, loaded region. Duration is a whole **1–1440 minutes**; multiplier is **1–5**, including decimals, and defaults to 2 when omitted. A manual focus takes precedence over the rotation while it lasts. Starting an effective focus sends an announcement to permitted online players; `/hv outbreak` and staff status show its expiry and the weekly schedule. An unavailable hunt, spawning state or world is reported as waiting, without granting a boost.

The weekly rotation is **off by default**. Its starting configuration is:

| Setting | Default |
| --- | --- |
| `outbreaks.rotation.enabled` | `false` |
| `outbreaks.rotation.start-time` | `18:00`, strict 24-hour `HH:mm` |
| `outbreaks.rotation.duration-minutes` | `120` |
| `outbreaks.rotation.multiplier` | `2.0` |
| `outbreaks.rotation.days.monday` | `wild` |
| `outbreaks.rotation.days.tuesday` | `nether` |
| `outbreaks.rotation.days.wednesday` | `end` |
| `outbreaks.rotation.days.thursday` | `cave` |
| `outbreaks.rotation.days.friday` | `skyblock` |
| `outbreaks.rotation.days.saturday` | `skygrid` |
| `outbreaks.rotation.days.sunday` | `oneblock` |

The rotation uses `rewards.time-zone`, **Europe/Amsterdam** by default, so its clock matches the claim calendar. A duration measures elapsed minutes from the local start and may cross midnight. Use the full weekday name and `none` to skip a day, for example `/hv admin outbreak rotation day sunday none`. Disabled or unloaded regions receive no effective boost.

`cancel` clears a manual focus and suppresses the current scheduled window until that window ends; it does not disable later days. Turning rotation off leaves a manual focus intact. Pause prevents a boost while paused but does not extend its original expiry; resuming may reactivate its remaining time. `/hv admin stop` cancels the current focus and stops the event. Nothing reopens encounters during claims-only grace or after the hunt closes.

Manual expiry and cancellation are saved under `outbreaks.manual.*`, `outbreaks.suppressed-until` and `outbreaks.suppression-run`. Expired boosts are rejected by time on every use, including after restart; expiry needs no successful config write to restore the base chance. Live edits share the serialized settings-save gate. Invalid settings leave the current configuration unchanged, and failed spawning-related saves keep new spawning blocked until a successful retry or reload. These controls do not clear player progress or remove existing infected mobs.

### Regional boss signature moves

Signature moves start **enabled** with conservative settings. They apply only to managed boss variants, excluding animal packs. Ordinary infected retain their existing attacks. The Wilderness (`wild`) and Acid (`acid`) default to `rush`; the Nether to `pulse`; End, General, Cave and all four sky/island regions default to `guard`. Custom region keys default to `none` unless configured.

- `rush`: a short horizontal movement toward the target, only from the ground and into a loaded, permitted destination.
- `guard`: temporarily multiply incoming damage by 0.65 by default, a 35% reduction.
- `pulse`: use a normal cancellable damage event, then a modest native knockback only if damage takes effect and the target remains eligible. Existing variant damage rules apply.
- `none`: no signature move in that region.

The target receives a readable action-bar warning before the move, even with `/hv effects off`. The default warning lasts at least two seconds; cooldown is 20 seconds and requires a visible eligible target within six blocks. Losing the target, changing settings or failing protection checks cancels the pending move. Signatures create no terrain changes, extra entities, equipment drops or additional fragment rolls.

```text
/hv admin signatures status
/hv admin signatures cooldown 30
/hv admin signatures move nether guard
/hv admin signatures off
/hv admin signatures on
```

These commands work live and from console with `onembcmi.HalloweenVirus.admin.event`. Existing bosses read successfully saved settings on the encounter pulse. Turning signatures off leaves the mobs and their ordinary combat/drop rules intact. Additional tuning is available in configuration while dormant:

| Setting under `encounters.signatures` | Default | Accepted values |
| --- | --- | --- |
| `enabled` | `true` | Boolean |
| `cooldown-seconds` | `20` | Whole 10–120 seconds |
| `windup-seconds` | `2` | Whole 2–5 seconds |
| `range` | `6.0` | 2–8 blocks |
| `rush-strength` | `0.45` | 0.1–0.65 |
| `pulse-strength` | `0.25` | 0.05–0.35 |
| `guard-seconds` | `3` | Whole 1–5 seconds |
| `guarded-damage-multiplier` | `0.65` | 0.5–0.9 |

Set individual moves under `worlds.<key>.signature-move`. Review actual client readability and knockback balance before public launch, especially on narrow terrain. The starting sky/island moves use guard, which does not push players.

### Optional infected animal packs

This feature starts **off**, and every region's `friendly-mobs` list starts empty. It only considers new vanilla `NATURAL` spawns of `COW`, `SHEEP`, `PIG`, `CHICKEN`, `RABBIT`, and `MOOSHROOM`. Both the global friendly switch and the region list must allow the animal. Configure a logical world key such as `wild`, not its display label:

```text
/hv admin friendly status
/hv admin friendly mobs wild COW,SHEEP,CHICKEN
/hv admin friendly duration 90
/hv admin friendly on
```

All four commands work from console and require `onembcmi.HalloweenVirus.admin.event` in game. The existing world must be enabled and pass protection checks. To remove the feature, use `/hv admin friendly off`; already infected animals are removed on the next encounter pulse without loot. `friendly mobs wild none` clears the optional animal types for that logical region. Global `/hv admin spawning pause` instead prevents new infections while leaving existing packs to finish normally.

Every animal has its own normal infection roll. Nearby animals that are already being infected can join a non-full pack targeting the same eligible player; the plugin does not scan and infect an ordinary herd or spawn extra animals. A join must satisfy the same natural-spawn, minimum player distance, world/protection, load, and global/world/nearby cap checks. Joining an existing pack bypasses only that participant's spawn cooldown and never resets it. Staff can explicitly create a test encounter with `/hv admin spawn COW` after enabling that type for the world.

| Setting | Default | Allowed values |
| --- | --- | --- |
| `encounters.friendly.enabled` | `false` | Explicit opt-in switch. |
| `encounters.friendly.chase-seconds` | `90` | 60–120 seconds for new packs. |
| `encounters.friendly.max-pack-size` | `3` | 2–6 infected animals; all general encounter caps still apply. |
| `encounters.friendly.pack-radius` | `24` | 8–32 blocks for joining a pack. |
| `encounters.friendly.speed` | `1.15` | Pathfinding speed multiplier from 0.5 to 1.5. |
| `encounters.friendly.attack-damage` | `2` | Base contact damage from 0 to 6; `0` makes packs chase without attacking. |
| `worlds.<key>.friendly-mobs` | `[]` | Supported animal types for that logical region. |

Use the dedicated commands for live toggling, species selection, and duration. Other scalar tuning uses the usual dormant configuration workflow. Each pack shares one target UUID and a fixed deadline; joining animals inherit its remaining time. Joining or adjusting the configured duration does not extend an active pack. A shorter general encounter lifetime can end a pack sooner. Animals use a bounded Paper chase goal, retaining an existing vanilla float goal where present, and attempt contact attacks no more than once every 1.5 seconds with line of sight. Base damage is still scaled by the chosen infected variant: with shipped multipliers, `2` becomes `2.5` for ordinary infected or `3` for bosses, before normal damage handling.

Named or baby animals, owned/PDC-marked or scoreboard-tagged animals, leashed animals, vehicle/passenger animals, tamed animals, and breeding spawns are excluded. These checks are repeated before conversion. Existing ordinary animals are not converted. Once infected, animal interactions, breeding, shearing, and egg drops are blocked so the encounter cannot become a farm or pet. Vanilla attacks and other ordinary AI goals are replaced by the controlled chase behavior.

Quitting, dying, or changing worlds ends the target's pack without moving it to another player or resetting its deadline. Loss of eligibility, unsafe positions, chunk unload, shutdown, and the usual encounter checks also remove or disengage the encounter safely. At the hard deadline, remaining owned animals are **removed without loot**, not cured or returned to a herd. Eligible combat kills use the same world sherd pool and fragment chance as other infected; normal animal loot is suppressed.

### Regional boss outlines

Boss variants have a native glowing outline by default, including Endermen, spiders, shulkers and optional animal bosses that cannot wear humanoid outfits. Ordinary infected do not receive it. Each region controls the outline through two appearance settings:

| Setting | Default | Purpose |
| --- | --- | --- |
| `worlds.<key>.appearance.boss-glow` | `true` | Enable the identifying outline for boss variants in this region. |
| `worlds.<key>.appearance.boss-glow-color` | Regional color below | Choose a Minecraft named color; custom regions default to `dark_red`. |

| Region key | Default outline color |
| --- | --- |
| `wild` | `dark_red` |
| `general` | `dark_green` |
| `nether` | `red` |
| `end` | `black` |
| `cave` | `gold` |
| `acid` | `green` |
| `skyblock` | `blue` |
| `oneblock` | `light_purple` |
| `chunkblock` | `yellow` |
| `skygrid` | `aqua` (cyan) |

These are logical region keys, so the chosen colors follow a region when its actual world is remapped. Upgrades fill missing settings automatically and preserve saved choices. Colors use the 16 Minecraft named colors, not dye hex values or random palettes. `cyan` is accepted and saved as `aqua`; `/hv admin glow colors` lists the supported names. Black may blend into the End's dark background, so check it in game and choose a brighter color if needed.

Use the live controls with `onembcmi.HalloweenVirus.admin.event`, in game or console. Wait for each save confirmation before the next change:

```text
/hv admin glow status
/hv admin glow colors
/hv admin glow color wild dark_red
/hv admin glow color skygrid cyan
/hv admin glow off end
/hv admin glow color end dark_purple
/hv admin glow on end
```

Changing a color does not enable a region whose outline is off. Use `/hv admin glow off all` or `on all` to toggle every configured region together. Valid changes are saved asynchronously before taking effect, persist across restarts, and update existing bosses on the next encounter pulse, about one second later. No reload or event stop is needed. These commands leave encounters, spawning, open menus, collection and reward actions running. Invalid values or a failed save leave the previous outline settings active.

This identifying outline is independent of `/hv effects full|reduced|off`, `encounters.particles`, and particle intensity. Minecraft can render it through walls within the mob's normal entity tracking range. It is not limited to eligible event participants or to the 24-block private particle radius; it does not extend entity tracking or load chunks.

HV maintains its own marked teams on the main scoreboard and each distinct scoreboard currently used by online players. It does not replace player scoreboards, objectives, or existing teams. If another plugin owns a boss's scoreboard entry or takes control of its team or color, that external state takes precedence and the displayed color may differ. Entries and owned empty teams are released as encounters end, viewers switch scoreboards, or HV stops. The same bounded encounter pulse performs maintenance; there is no separate repeating glow task.

### Configurable appearance

Regional appearance now supports named bosses, dyed leather armor, armor trims, and suitable weapons through Paper's supported item/equipment API. Ordinary infected retain the default `Infected {mob}` name and their vanilla equipment unless given an outfit. Bosses use the following initial profiles:

| World key | Boss name | Outfit | Leather dye | Trim pattern / material |
| --- | --- | --- | --- | --- |
| `end` | `Void Herald {mob}` | `end-boss` | `#7E38C4` | `eye` / `amethyst` |
| `nether` | `Ashen Overlord {mob}` | `nether-boss` | `#C43822` | `snout` / `quartz` |
| `wild` | `Thornbound Stalker {mob}` | `wild-boss` | `#326B2A` | `sentry` / `emerald` |
| `general` | `Marshbound Harrier {mob}` | `general-boss` | `#556B2F` | `wild` / `copper` |
| `cave` | `Echo Warden {mob}` | `cave-boss` | `#273B50` | `ward` / `diamond` |
| `acid` | `Caustic Reaver {mob}` | `acid-boss` | `#8AAE1E` | `coast` / `redstone` |
| `skyblock` | `Skyborne Harbinger {mob}` | `skyblock-boss` | `#64BDE9` | `spire` / `gold` |
| `oneblock` | `Fractured Sentinel {mob}` | `oneblock-boss` | `#D08C3F` | `rib` / `copper` |
| `chunkblock` | `Rift Marshal {mob}` | `chunkblock-boss` | `#866A55` | `vex` / `iron` |
| `skygrid` | `Gridbound Revenant {mob}` | `skygrid-boss` | `#D13AA6` | `silence` / `amethyst` |

Each seeded outfit has a full leather armor set. Skeletons, strays, and bogged use bows; wither skeletons use stone swords; piglins use golden swords; piglin brutes use golden axes. Zombies, husks, and drowned use stone swords in the wild/general/cave/skyblock/oneblock/skygrid profiles and iron swords in the end/nether/acid/chunkblock profiles. Equipment is applied only to supported humanoids; Endermen, spiders, shulkers, and optional animals receive the regional name without an outfit. A region may therefore have an outfit ready even when its starting mob list has no humanoid. Armor and weapons affect normal combat, so test their balance together with the variant's health and damage multipliers.

Regional name and outfit settings are `worlds.<key>.appearance.infected-name`, `boss-name`, `infected-outfit`, and `boss-outfit`; `boss-glow` and `boss-glow-color` control the independent outline described above. Empty outfit values preserve vanilla equipment. Names are plain text, at most 128 characters, and support only `{mob}` and `{world}` placeholders. The world key is logical, such as `wild`; `{world}` uses the configured region display label.

Profiles live under `encounters.outfits.<id>` with at most 32 profiles. Their `equipment` section accepts `head`, `chest`, `legs`, `feet`, `main-hand`, and `off-hand`. Each configured slot has a `material` and optional `color`, `trim-pattern`, `trim-material`, and `unbreaking`. Per-mob overrides use `mobs.<ENTITY_TYPE>.<slot>` inside that same profile. For example, this changes the seeded Wilderness profile's helmet and zombie weapon:

```yaml
encounters:
  outfits:
    wild-boss:
      equipment:
        head:
          material: LEATHER_HELMET
          color: '#326B2A'
          trim-pattern: sentry
          trim-material: emerald
      mobs:
        ZOMBIE:
          main-hand:
            material: IRON_SWORD
```

Merge this example into the existing configuration. Missing shipped default leaves are restored during configuration migration, so deleting a seeded slot does not reliably disable it. Set an entire region outfit to `''` to retain vanilla equipment. To clear one seeded armor slot, explicitly set `material: AIR`, `color: ''`, `trim-pattern: ''`, and `trim-material: ''`, plus `unbreaking: 0`. When changing leather to another armor material, set `color: ''`; keep a valid trim pair or clear both trim fields. Omitted slots in a custom profile preserve the mob's existing equipment, while an explicit `AIR` slot removes it.

Armor materials must match their slot; supported armor tiers and turtle helmets are accepted. Hand slots accept swords, axes, spears, bows, crossbows, tridents, maces, and shields. Dye accepts quoted `#RRGGBB` for leather armor only, or `''` to disable it. Trims require both a valid pattern and material from the server registry, and apply only to armor.

**Random choices and enchanted armor:** `material`, `color`, `trim-pattern`, and `trim-material` also accept a YAML list of 1–32 distinct valid choices. Each choice has equal probability. Alternatively, use `random` alone for `color` (any RGB color), `trim-pattern` (any loaded registry pattern), or `trim-material` (any loaded registry material). Weapons must use an explicit material list so staff control their combat strength. Choices are rolled independently per configured slot when a new infected mob is equipped; existing mobs keep their equipment. Random does not guarantee a different result on successive spawns. All choices are validated before activation, including alternatives that would not have been selected on a particular spawn.

Set `unbreaking: 1` for actual Unbreaking I and its normal enchantment shimmer. Values 0–3 are accepted, with 0 meaning no enchantment. This is the item shimmer, not a glowing entity outline or a light source. Gear already remains unbreakable for the encounter, so this option primarily provides the desired appearance. No other enchantment or arbitrary item metadata is accepted. The upgrade adds `unbreaking: 0` to missing seeded armor settings, preserving existing colors, trims, weapons and custom values.

For example, merge these leaves into `encounters.outfits.wild-boss` to randomize the helmet and zombie weapon:

```yaml
equipment:
  head:
    material: LEATHER_HELMET
    color: random
    trim-pattern: random
    trim-material: random
    unbreaking: 1
mobs:
  ZOMBIE:
    main-hand:
      material: [STONE_SWORD, IRON_SWORD, IRON_AXE]
```

For a complete matching-tier leather set, repeat the color, trim and Unbreaking settings under `chest`, `legs`, and `feet`, keeping their existing leather materials. Colors and trims still roll independently for each piece. To keep a regional color theme, use a palette such as `color: ['#326B2A', '#618B32', '#254822']` instead of any RGB color. Trim pools work the same way, for example `trim-pattern: [sentry, wild, ward]` and `trim-material: [emerald, copper]`. Mixing AIR or non-leather materials into a dyed armor pool is rejected; clear incompatible metadata when changing materials.

Keep dye hex values quoted in YAML. Configure while dormant, then reload and validate. `/hv admin set` can edit registered default leaf paths, including choice lists; edit the configuration file to add a new profile or additional per-mob overrides. Commands work in console too; wait for each save confirmation before sending the next command. For the seeded Wilderness helmet and zombie weapon, no server restart or rebuild is needed:

```text
/hv admin stop
/hv admin set encounters.outfits.wild-boss.equipment.head.color random
/hv admin set encounters.outfits.wild-boss.equipment.head.trim-pattern random
/hv admin set encounters.outfits.wild-boss.equipment.head.trim-material random
/hv admin set encounters.outfits.wild-boss.equipment.head.unbreaking 1
/hv admin set encounters.outfits.wild-boss.mobs.ZOMBIE.main-hand.material [STONE_SWORD, IRON_SWORD, IRON_AXE]
/hv admin validate
/hv admin start
```

For other armor pieces, repeat the four `head` commands with `chest`, `legs`, and `feet`. `/hv admin stop` removes the current infected encounters; outfit edits require dormant mode because equipment can alter combat strength. The dedicated `glow` commands can change outlines live. Command changes save and apply automatically. After editing the file instead, run `/hv admin reload` while dormant, then validate and start. Use `/hv admin auto` instead of `start` when restoring the automatic seasonal schedule. `/hv admin appearance` reports whether each selected outfit contains random choices or Unbreaking, together with its boss outline setting.

```text
/hv admin appearance wild
/hv admin spawn ZOMBIE boss
```

The optional variant id selects a configured variant that permits the current world and mob. It does not bypass spawning pause, permissions, protections, caps, or eligibility checks. Without a variant id, the existing weighted selection applies. Name and outfit changes affect newly created encounters; live outline controls also update existing bosses.

Configured outfit gear is unbreakable for the encounter's lifetime, including helmets exposed to sunlight. It is not a second reward source: equipment drops, pickup, piglin bartering, equipment dispensing, and player interactions with owned infected are blocked. Combat deaths clear normal drops and experience before the usual sherd roll. Arrows and thrown tridents retain owned-projectile tracking and cannot be picked up; cleanup removes them without loot. Ordinary mobs keep their usual interactions. Review these protections with the actual client and mob types before launch.

### Protection readiness

Protection checks fail closed. WorldGuard 7 allows only locations without a named region, with `mob-spawning` and `mob-damage` permitted; virtual/error results deny. Without WorldGuard, a world requires the explicit reviewed-unprotected-world allowlist. Other installed unsupported claim providers still block encounters. Status output identifies these providers; do not disable a provider or remove its safety check to make testing pass.

HV has no BentoBox dependency and makes no BentoBox API calls. BentoBox's presence does not blanket-block island worlds. Automatic infection considers new vanilla `NATURAL` spawns permitted by the installed plugins, then applies the configured HV chance and encounter gates. Cancelled spawn and combat-damage events remain cancelled. HV-initiated targeting also dispatches the standard cancellable target event before assigning a player; cancellation and final target changes are rechecked, and friendly packs keep their original player UUID. Dedicated BentoBox/island-policy integration is deferred optional work, not a launch prerequisite.

Test the actual island setup as part of gameplay acceptance: confirm permitted natural spawns can become infected, denied spawns are not converted, cancelled damage stays blocked, and the configured world pools make all 23 sherds obtainable. Plain matching-name test worlds do not establish those outcomes for the live plugin setup. This event-based behavior does not certify every BentoBox flag or addon policy through a dedicated API adapter. Explicit `/hv admin spawn` encounters use Bukkit's `CUSTOM` reason and remain subject to installed spawn-event rules.

## Unlockable journal and completion celebration

`/hv journal` and **Your Field Journal** (slot 39 in both collection and world menus) open a virtual Adventure book with a progress cover and seven chapters. The chapter thresholds are 0, 1, 5, 10, 15, 20 and 23 distinct recorded catalogue IDs. This uses `onembcmi.HalloweenVirus.use`; there is no staff unlock command. Help, tab completion and `/hv debug commands` list the route. Locked pages contain only an anonymous chapter number and the required count; their hidden titles and story text are not sent to the client. Opening the book rechecks access and reads a fresh snapshot. The book creates no inventory item and performs no ledger write.

Unlocks are derived from the current edition's durable collection, with no separate unlock flags or migration. Existing players receive the matching chapters immediately. Carried items and pending deposits do not count; traded, properly authenticated submitted items do. A reset relocks chapters according to the remaining collection. A new edition starts at the opening chapter. A reward claim does not relock chapters, and reading remains available while dormant to permitted players. The seven story texts and thresholds ship with the plugin rather than being editable settings.

After a normal deposit successfully finalizes, newly crossed thresholds produce one private chat notification. Crossing 23 recorded types also produces one optional private celebration on the main thread. Full uses 12 Happy Villager and 8 End Rod particles, plus one quiet experience-orb chime; reduced uses 3 Happy Villager particles and no sound; off emits neither. The existing `encounters.particles` and `encounters.sounds` switches apply independently to this celebration too. Client particle and sound settings still apply. The burst is sent only to the completing player. No entities, fireworks, item drops, potion effects, scheduled animations or retained player references are created.

The final successful deposit leaves the HV menu closed so the burst is visible; another plugin's menu is not closed. Partial deposits retain the usual refreshed collection menu. Failed/cancelled deposits, repeated submissions, menu reopening, reconnects, initial migration and staff reconciliation do not replay the celebration. A stale event generation or ineligible/disconnected player suppresses pending presentation without undoing durable progress. A cosmetic exception is logged without changing the deposit outcome. There is no delayed replay: after a crash or disconnect at the final boundary, chapters still unlock from the saved progress. After a deliberate collection reset, completing a fresh collection can celebrate again; spent issuance IDs remain spent. Completion never bypasses reward readiness or the claim window.

## Encounter notes and the optional Seal ending

`/hv notes` opens a virtual field-notes book. The first confirmed eligible combat in each of the ten canonical regions records its short observation. This includes dealing or receiving positive, uncancelled damage with any managed infected mob, not just a boss or killing blow. The existing Survival, permission, proximity, protection and event gates apply. Merely exploring a region, spectator/god-mode viewing, cancelled damage and trading do not discover a note. Observations are bounded, drained on the existing encounter pulse and saved off the server thread; repeated combat in a recorded region creates no new ledger entry.

Notes are optional and independent of collection chapters. A player can complete the collection through authentic trades without any notes. Locked pages do not reveal their hidden story text. Notes remain readable while dormant and persist across reconnects, restart and both collection reset modes. A new event edition starts fresh. The catalog ships with the plugin; it does not require an additional exploration system or configurable quest conditions.

`/hv seal` opens the three-symbol **Rebuild the Seal** puzzle. Clues are in the collection journal chapters at 5, 10 and 20 recorded types. Players must have all 23 types recorded to save the optional ending. They can retry incorrect sequences or clear their current choices freely. Solving consumes no items, grants no reward, changes no claim state and never becomes a claim requirement. A completed ending can be reread from the journal or Seal screen, including while dormant; it does not bypass the reward date window.

Both routes use `onembcmi.HalloweenVirus.use`. Their collection/world-menu entries use virtual icons and create no inventory book or reward. Each puzzle sequence belongs to its current server-owned menu session. Close, quit, world change, reset, reload, permission changes and stale pages invalidate actions; completion rechecks the current edition, saved collection and busy state before saving. The ledger also checks the 23-type requirement and makes repeated solves idempotent. A player must wait for a pending claim or collection submission before solving.

The schema-1 ledger adds `players.<edition>.<uuid>.field-notes` (bounded canonical region keys) and `seal-solved` (boolean). Missing fields mean no discoveries and an unsolved Seal; old ledgers need no eager rewrite. Both reset modes clear the solved flag and retain its previous value in the reset audit, while preserving regional notes, invitation choice and effects preferences. Spent item IDs and reward/reset rules remain unchanged.

## Per-world collection hints

`/hv worlds` shows each player's saved regional progress, missing `hv01`–`hv23` IDs, marked fragment titles, configured infected mob types, boss title, availability and exploration clues. Completed regions are green with a glint. The **Only Missing** filter excludes completed or empty pools; pagination and filter changes rebuild a fresh player snapshot. No displayed sherd is an issued collectible.

`/hv hints` gives up to 12 regional summary rows in chat and directs players to the GUI for the full list. `/hv hints wild` gives the selected logical region's details; tab completion lists configured keys. Both use `onembcmi.HalloweenVirus.use` and require an in-game player. There is no new permission or PlaceholderAPI value. Viewing hints never writes progress, checks or consumes inventory items, issues rewards, teleports players, or loads chunks.

All collection hints and the collection page's **Find in** labels use the actual `worlds.<key>.sherds` pools. Remapping or overlapping pools is reflected immediately after configuration reload. Friendly types are hidden unless enabled, and mob types without an eligible world/type variant are excluded. Disabled and unloaded worlds remain visible for planning and trading. Availability reports the hunt/spawning state; it does not certify that a particular location passes protection, distance, cooldown, or load checks. Installed plugins' ordinary spawn, target and damage cancellations still apply, including in island worlds.

Customize optional region clues in the HV configuration:

```yaml
worlds:
  wild:
    collection-hints:
      - 'Explore beyond spawn and protected builds.'
      - 'Check natural spawns while travelling at night.'
```

Each list accepts at most four nonempty plain-text lines of at most 100 characters. Formatting/control characters and non-text values are rejected. Use `[]` to hide custom clues while retaining generated progress, mob and boss information. Existing configurations gain default regional clues automatically; saved custom values are preserved. Edit while dormant, then reload and validate. Registered default paths also accept `/hv admin set worlds.wild.collection-hints ['Your clue here.']`; custom region paths can be edited in the file.

Progress is counted from recorded IDs, so unsubmitted inventory items do not count. Empty pools are not labelled complete. If configured pools omit a fragment, the collection page says it has no assigned world and `/hv admin validate` lists the missing pool mapping. Existing authentic issued fragments keep working. Hints do not change drop chance or balanced random selection.

## CMI kit templates and item identity

The supplied `halloweenvirus.yml` remains a CMI-owned template file. This module reads CMI's loaded kit API and clones item contents; it does not rewrite kit definitions, enable kits, execute kit commands, charge kit costs, or depend on kit command acceptance as proof of delivery. Disabled templates are supported. Every kit must be item-only.

Each of `hv01` through `hv23` must contain exactly one item of the mapped pottery sherd material, with amount one. `hvreward` is the completion reward, never a 24th collectible. The exact author-provided order is:

| Kit | Material | Title |
| --- | --- | --- |
| `hv01` | Explorer | Fragment of the Lost Expedition |
| `hv02` | Prize | Reclaimed Jewel of the Void |
| `hv03` | Burn | Ember of the Fading Flame |
| `hv04` | Skull | Remnant of the Withered King |
| `hv05` | Blade | Shard of the Fallen Champion |
| `hv06` | Howl | Echo of the Final Howl |
| `hv07` | Snort | Relic of the Restless Beast |
| `hv08` | Angler | Token of the Cleansed Waters |
| `hv09` | Miner | Legacy of the Haunted Mine |
| `hv10` | Mourner | Echo of the Silenced Deep |
| `hv11` | Brewer | Vial of the First Cure |
| `hv12` | Danger | Mark of the Broken Curse |
| `hv13` | Guster | Whisper of the Hollow Sky |
| `hv14` | Sheaf | The Reclaimed Harvest |
| `hv15` | Heart | Heart of the Mended World |
| `hv16` | Plenty | Promise of Renewal |
| `hv17` | Shelter | Refuge from the Long Night |
| `hv18` | Scrape | The Untainted Fragment |
| `hv19` | Flow | Thread Beyond the Shadows |
| `hv20` | Arms Up | Reach Beyond the Blight |
| `hv21` | Archer | Oath of the Twilight Hunter |
| `hv22` | Friend | Companion of the Last Stand |
| `hv23` | Heartbreak | Heart of the Fading Blight |

The CMI kit's configured display title, formatting, and metadata are preserved, including `hv19` and `hv20`. The table above records the original event design titles; it does not override customized kit titles. Unresolved `{USERNAME}`, `{WORLDNAME}`, and `{KITNAME}` tokens are expanded for the issued recipient, actual world, and kit. Already parsed lore remains intact. Keep the visible kit id so players can identify duplicate types for trading. Names and lore provide display information; player collection authenticates namespaced PDC, the event edition, material, and individual issuance identity.

Fresh copies from `/cmi kit hv01` through `/cmi kit hv23` are **unstamped**, even if you previously stamped another copy from those kits. HV-issued infected drops are stamped automatically. For manual kit samples:

1. Run `/hv admin stop`.
2. Put any number of unchanged kit sherds in separate slots, with **one item per slot**. Three at a time is fine; all 23 are not required together.
3. Run `/hv debug pdc stamp`, then `/hv debug pdc` to verify those exact physical copies. The summary counts newly authenticated items; skipped copies remain unchanged. Slot numbers start at one and the held slot is labelled. Use `/hv debug pdc hand` before testing an anvil to check that exact copy.
4. Check `kind=sherd`, the expected `kit=hvNN`, a nonempty `run` and unique `issue`, and `infected=true` before testing collection or modification protection.
5. Run `/hv admin start` when ready to continue, subject to the configured hunt schedule.

Empty `kind`, `kit`, or `issue` fields with `infected=false` mean that copy is not authenticated. Running the stamp command alone does not prove every candidate was accepted. Split stacks first; a previously renamed item will not match the original template. Read the per-slot result and obtain a fresh unchanged copy if needed. Test anvils with the verified stamped slot; admin permission does not bypass its protection.

Stamping requires the PDC staff permission, no pending inventory action for that player, and a hunt that is not currently active. This also permits stamping during the post-hunt claim period; it is not limited to the `DORMANT` status label. The setup recipe above explicitly stops the event first. Stamping matches the CMI template's material, plain-text title, and first lore line. Variable recipient/world/kit lore lines are ignored for matching. Metadata is preserved while the current edition and a unique issuance id are added. Already marked items retain their identity; re-stamping never refreshes a spent or old-edition item. Reward gear is not stamped by this migration.

**Keep CMI kit templates unstamped.** Do not put stamped copies back into saved kits: template copies would repeat the same issuance id and the kit validator rejects marked templates. Stamping applies to physical inventory copies, not a permanent recognition registration for every future kit delivery.

The stable PDC namespace is `1mb-cmiapi-eventhunts`. Fields include `hv_kind`, `hv_kit`, `hv_run`, `hv_issue`, `hv_recipient`, `hv_transaction`, `hv_infected`, and `hv_original`. An authentic sherd can be traded: its issuance recipient is provenance, not a restriction to the original finder. Consumed issuance ids are reserved globally in the ledger to reject replay.

## Collection and completion transactions

Collection scans inventory when the player presses Collect Sherds in the GUI or runs `/hv collect`. Both routes use the same transaction checks. It selects one authentic item for each missing type, reserves those issuance ids in durable storage, then revalidates and removes the exact items on the server thread. The collection becomes finalized only after the result is persisted. GUI titles are not authority: the shared GUI service binds each inventory to its player, holder, and session nonce, blocks item movement, and rejects stale actions. The current event, access, pending state, and reward eligibility are checked again at execution.

The reward ledger uses `NONE`, `PREPARED`, `APPLYING`, and `DELIVERED`. The prepared payload is the exact stamped item set for the original UUID and transaction. Inventory preflight rejects overflow. An uncertain crash boundary remains unresolved rather than automatically issuing another kit. Ordinary player retries cannot clear a pending collection or reward.

To recover, stop the affected player's attempts, inspect their UUID record and inventory/provenance evidence, and determine whether the exact items were consumed or delivered. Only then use the matching `resolve` command. `delivered` acknowledges the observed side effect; `retry` is appropriate only when evidence proves it did not occur. Retain the original transaction identity and exact payload. Never delete a record, change UUID, or reset an edition merely to make the claim button work.

Ledger mutations use a serialized worker; Bukkit inventory, world, entity, and CMI item operations run on the Paper server thread. Atomic durable writes publish immutable cached snapshots for menus and placeholders. A missing or corrupt primary ledger is not silently replaced with an older backup because doing so can replay spent fragments or completion rewards. Such a failure blocks mutations pending staff reconciliation.

HV configuration reloads and saves use the same serialized worker. The initial configuration read does not rewrite the file; the worker prepares and persists settings only after all older HV storage workers have drained. Menu/debug readers use stable settings snapshots while a save runs. A host reload requested during an HV settings operation waits for that operation and is coalesced with other pending reload requests; gameplay remains unavailable until the queued reload publishes validated settings. Other Event Hunts modules retain their existing reload behavior.

### Resetting a player

Reset works in game and from console, while the event is live or dormant. Use the player's exact real username, including any Floodgate prefix, or their server UUID. Offline names resolve only through trusted local Paper/CMI caches; ambiguous names and nicknames are rejected without an external lookup. Only the current edition and named player's progress are affected.

Start with a preview:

```text
/hv admin reset mrfloris
```

The preview shows the resolved UUID, edition, current collection, and reward state. It makes no changes and prints the confirmation command using that UUID. The default `collection` mode removes collected progress but preserves any completed reward claim. This is suitable for removing progress during moderation without granting another reward:

```text
/hv admin reset mrfloris collection --confirm Remove incorrectly earned progress
```

For testing the entire collection and reward flow again, explicitly choose `all` and hold both reset permissions (or the parent `onembcmi.HalloweenVirus.admin`):

```text
/hv admin reset mrfloris all
/hv admin reset mrfloris all --confirm Repeat full event test
```

Console uses the same commands without the leading `/`. Full reset clears the recorded collection and reward claim; it does not remove previously delivered reward items. The player must collect all 23 types again before claiming another reward. The configured reward must still pass its usual validation.

Both modes preserve sherd recognition, the event id, existing items, drop balancing, effects and invitation preferences, and discovered regional field notes. Both clear the optional Seal ending so it can be solved after completing a fresh collection. Unused authenticated sherds already in inventories or chests still work without re-stamping. Spent individual issuance ids remain spent: copied versions of a previously submitted item cannot be used again. A reset neither returns consumed sherds nor issues replacement items.

Reset refuses to run while the player's inventory action is busy or a collection/reward transaction is unresolved. Reconcile that transaction first. Confirming closes only the target player's Halloween Virus menu, cancelling its queued clicks. Persistence runs off the server thread, and the target stays locked until completion. A failed write blocks further ledger mutations rather than reporting a successful reset.

Every reset has a unique operation id and a durable audit under `resets` in `ledger.yml`, recording the actor's UUID (or `console`), target UUID, edition, timestamp, reason, mode, previous Seal flag, and previous collection/reward evidence. Full reset retains the old reward transaction and exact item payload in that audit. `/hv admin inspect <uuid>` shows the last reset summary. Existing schema-1 ledgers gain these audit entries automatically on the first reset; no file edits or event-id changes are needed.

## Files, upgrades, and configuration

| Path | Purpose |
| --- | --- |
| `plugins/1MB-CMIAPI/CoconutHunt/HalloweenVirus/config.yml` | Hunt schedule, reward claim dates/time zone, world rules, spawning pause/rate, regional outbreak schedule/expiry, boss signatures, encounter limits and variants, announcements, and configuration schema. |
| `plugins/1MB-CMIAPI/CoconutHunt/HalloweenVirus/ledger.yml` | Edition/UUID collections, regional notes, Seal ending, global spent issuance ids, exact reward transactions, reset audits, drop balance, effects/reminder preferences, and reward-reminder receipts. |
| `plugins/1MB-CMIAPI/CoconutHunt/HalloweenVirus/ledger.yml.backup` | Previous validated ledger for staff investigation; not an automatic replay/recovery source. |
| `plugins/1MB-CMIAPI/CoconutHunt/HalloweenVirus/balance.yml` | Bounded hourly diagnostic counters for `/hv admin report`; independent of player progress and reward authority. |

The configuration and ledger start at schema 1. Missing Halloween Virus defaults are added through the shared feature configuration service, including signature settings and the initially disabled outbreak rotation. Saved custom settings remain intact. New note/Seal fields default to empty/false without resetting collections. The separate `event.calendar-version: 1` migration applies the confirmed 2026 hunt dates only to that edition's completely blank schedule, as described above. It does not reset the ledger or restamp items. Unknown newer schemas fail closed. Existing event-module data and CMI-owned kit files remain in their established locations. Preserve the complete event directory in backups, together with the corresponding player inventories and suite build; partial rollback can duplicate an already-issued reward or strand a spent fragment.

The separate one-time `event.regions-version: 1` migration first preserves the previous feature configuration as `config.yml.pre-regions-v1.bak`, then saves the regional changes atomically on the storage worker, together with any pending calendar changes. It retains world mappings, enabled flags and unrelated custom settings. The marker prevents later reloads or builds from reapplying the migration over staff edits. Do not remove or lower it to re-run setup. This does not create General World, enable it, approve its protections, alter CMI kits or write the player ledger. Keep the migration backup with the rest of the event data.

Common administration paths are `event.id`, `event.starts`, `event.ends`, `rewards.claims-enabled`, `rewards.first-claim-day`, `rewards.last-claim-day`, `rewards.time-zone`, `encounters.spawning-paused`, `encounters.spawn-chance`, `encounters.signatures.*`, `outbreaks.rotation.*`, `worlds.<key>.world-id`, `worlds.<key>.enabled`, `worlds.<key>.signature-move`, and the `encounters.variants` settings shown by `/hv debug config`. Use `start`, `stop`, `auto`, and `schedule` for lifecycle control; the calendar and region migration markers are not editable gameplay settings. Use the dedicated live controls listed above. Stop the event before changing other gameplay settings. World mapping does not enable a world: review its protection and mob configuration, then explicitly enable it. Change the edition id only for a genuinely new event; it changes which fragments and player collection records are current.

`announcements.automatic` defaults to false. The default interval is 900 seconds, with a five-minute minimum for automatic hints and a one-minute cooldown on manual announcements. `announcements.message` contains the introduction and `announcements.hints` provides the rotation. Delivery targets online players with event access. Edit the story in these settings without exposing raw staff commands or internal configuration details to players.

## Infected reward restrictions

Infected identity persists on sherds and completion items through storage, trading, death drops, and restarts. Issued reward items retain original serialized properties and transaction provenance. Supported modification guards stay active while the seasonal event is dormant. The rate-limited warning is: “This item is infected. It cannot be repaired, merged, enchanted, or otherwise modified.”

Normal inventory movement, chest storage, auction-house and trade interfaces, and trash/disposal are allowed. A virtual chest interface alone is not a reason to block an item. The guard targets transformation inputs and modification commands, such as repair, enchanting, renaming, and merging. Trading preserves provenance; a buyer can submit the item despite another player's name or world in its lore. Discarding an item is intentional disposal and grants no collection credit.

Above-maximum enchantment rewards are blocked until all applicable modification routes are verified. The supplied `hvreward` is a placeholder that the owner will replace later. Its current legacy overlevel gear blocks reward issuance; this implementation does not overwrite it or substitute another prize. Collection progress can be tested and retained while completion delivery awaits the reviewed replacement. `/hv admin validate` reports the reward blocker.

Do not interpret a Bukkit inventory guard as proof that every plugin's direct `ItemStack` mutation is covered. CMI direct/plugin-dispatched modification, mcMMO repair/salvage, Pyro upgrades/augments, and other bypass routes require independent verification before special high-level gear can be issued. Preserve the guard and its data after event shutdown. Before removing the Event Hunts jar, migrate or remove infected items and replace its ongoing protections deliberately.

## Safe rollout and acceptance

For a new installation, this example maps and enables only the End region. Replace the world id with the value shown by your server, and review protection and mob settings before repeating for other regions:

```text
/hv admin stop
/hv admin world end minecraft:the_end
/hv admin set worlds.end.enabled true
/hv admin validate
/hv admin auto
```

This recipe arms the saved calendar. For an immediate test before 1 October, use `/hv admin start` instead; afterward stop and rearm with `auto` when ready for the public schedule. World flags are deliberately disabled in shipped defaults. Grant `onembcmi.HalloweenVirus.use` to the intended test group separately; staff commands require their corresponding administration permissions. Arming or starting the event does not grant access or announce it. Keep it dormant for initial setup and resolve validation blockers before public launch. The dedicated spawning and claim commands support later live adjustments.

1. Use the maintained test server and its copied CMI kits. Keep live untouched. Install the complete suite-wide numbered test build with Paper stopped.
2. Leave public access denied. Review world mappings, encounter protection readiness, kit validation, reward blockers, and season identity. Use exact existing world names or owner-created matching test worlds.
3. Give a small test group `/hv` access. Test the collection display, guide book, world hints, player head, close control, dormant state, and full/reduced/off effects. Verify spawning pause, rate changes, scoped cleanup, signature controls, regional outbreak start/cancel/rotation and restart persistence. Restore the intended live settings after testing.
4. Generate controlled encounters and authenticate a sample set of all 23 sherds. Verify that a duplicate stays in inventory and that ordinary renamed sherds, another edition's items, and copied spent issuance ids are rejected.
5. Test left/shift/right clicks, drags, double-clicks, hotbar swaps, offhand swaps, drops, creative inventory actions, quick close/reopen, permission removal, world change, quit, and stale pages. Normal transfers in personal inventories, chests, `/ah`, and `/trade` must preserve item identity; `/trash` and `/cmi dispose` must permit deliberate disposal. Only the intended collection and claim actions should mutate event progress.
6. Test permitted and cancelled natural spawns and cancelled damage with the representative installed plugin setup, including island worlds. Check signature warnings and balance, eligible damage unlocking notes without a kill, the Seal's correct/incorrect sequences, both reset modes, outbreak expiry/cancellation, weekly clock boundaries and pauses. Story features must not consume items or affect claims. Also test explicit `CUSTOM` staff spawns, non-player kills, two-player combat, full inventories, missing kits, failed ledger writes, stop/disable, clean restart, forced interruption between transaction phases, and loaded/unloaded chunk cleanup. Cleanup must never award fragments.
7. Before accepting infected rewards, test anvil, enchanting, grindstone, smithing, crafting, automated crafter, Mending, CMI commands, and each installed third-party repair/upgrade route. Test AutoSell handling of event metadata as well.
8. Measure MSPT, slow ticks, entity counts, and memory with representative farms and 30 or more players. Caps and throttles limit work, but gameplay and load acceptance require real measurements.
9. Confirm the saved hunt dates match 1 October through 1 November and claims include 25 October through 4 November in Europe/Amsterdam, unless an intentional custom schedule is in use. Test every phase boundary, claim pause/resume, submissions after the hunt ends, and explicit stop/rearm. Verify a stopped or host-disabled event stays off across restart and that an early manual test stays manual across the calendar migration. Check `auto` preserves an enabled, active manual hunt but schedules a host-disabled saved manual hunt without briefly starting encounters. Grant the intended player groups access and run `/hv admin auto` once to arm the reviewed calendar; announce deliberately after the hunt becomes live. After local gameplay acceptance, stage the exact tested suite through the repository's normal live-handoff workflow.

Stop rollback begins with `/hv admin stop` and owned-entity cleanup. Retain configuration, the complete ledger, issuance reservations, and reward evidence. Restore the exact tested suite as a unit; do not roll back only the progress ledger or remove infected-item protection while those items remain in circulation.

## Remaining launch work and verification limits

Before public launch, review the reward blockers, verify the saved confirmed schedule, verify the approved world mappings with the representative installed plugin setup, and complete Minecraft client and load testing. The placeholder can remain while players collect; finalize and validate the reward before claims open on 25 October. Use `/hv admin auto` for the scheduled opening, or `/hv admin start` for an intentional early public opening. Custom schedule overrides remain staff choices. These are launch tasks; publishing the guides or installing a build does not complete them. Dedicated BentoBox integration is deferred optional work. In particular, finish the stamped-item `/cmi anvil` test using a PDC-verified copy.

Initial local checks covered startup, dormant defaults, command catalogs, validation, start/stop, module toggling, rejected invalid configuration, and reload. Existing event modules retained their configured states and all 23 sherd templates validated. The placeholder reward remains unchanged and blocked pending its replacement. Use the current build report for the exact suite version, test totals, Paper build, and Java runtime checks rather than treating these guides as a runtime certification.

The maintained local test server has the End and Nether mappings plus seven plain flat test worlds: `wild`, `cave`, `acidisland`, `bskyblock`, `oneblock`, `chunkblock`, and `skygrid`. All nine local region flags were enabled for testing at the initial handoff, while the HV module and event were left dormant. Later staff changes persist across builds. The new `general` mapping must be reviewed separately; adding its configuration does not create or load that world or enable encounters. These plain worlds exercise fragment pools; they do not simulate live island protections. Move beyond the configured 96-block spawn safety radius for encounters. Staff-spawned infected mobs can award fragments under the normal eligible-kill rules; authenticating kit samples is also available for collection testing. DiscordSRV was kept out of the active local plugin directory during the smoke test.

Automated tests cover hunt and claim schedule boundaries, GUI action gates, balanced selection, durable collection reservations, completion transaction transitions, corrupted storage rejection, per-player reset rules, spawning controls, cleanup scope, particle budgets, reward reminders, keepsake templates, diagnostic reports, and relevant encounter/item policies. They do not replace Minecraft client testing. Automated verification did not include an actual client-packet gameplay session or a 30-player performance benchmark. The acceptance steps above remain an owner/tester gate, including representative island gameplay and the later replacement of the placeholder reward; a dedicated BentoBox adapter is not required. The public guides describe the implemented feature set and are available ahead of the live launch.
