# Boosters

Boosters is the 1MB-CMIAPI replacement for the standalone `1MB-Boosters` project. It provides `/rate` for booster status, admin start/stop control, debug pages, config editing, and PlaceholderAPI output while using the shared 1MB-CMIAPI runtime, config comments, translations, and support metadata.

The existing integration commands remain available alongside the managed mcMMO GUI, presets, queue and scheduler described below:

- Tracks and restores mcMMO `/xprate` boosters.
- Tracks and restores Jobs `/jobs boost` boosters.
- Detects PyroWelcomesPro Points multipliers from its config file.
- Detects an active DiscordChat event multiplier from `plugins/1MB-CMIAPI/DiscordChat/config.yml` and shows it in `/rate` only while the event is active.
- Keeps Points read-only/manual by default until live reload behavior is proven safe.
- Sends subtle per-player active-booster reminders after join, with `/rate reminders` opt-out enabled by default.
- Registers legacy `%onembboosters_*%` placeholders when PlaceholderAPI is installed.
- Accepts legacy permissions `onemb.boosters.rate`, `onemb.boosters.admin`, and `onemb.boosters.debug` for migration.

## Admin mcMMO GUI, presets, queue and schedules

Open `/rate admin mcmmo` with `onembcmi.boosters.admin` (or the existing legacy admin permission). The overview shows active, queued, scheduled and held entries. Choose **New booster** or a preset, select one supported mcMMO skill or **All**, choose duration/rate/start/repetition, review the resolved dates and conflicts, then press **Go live**. Opening or editing a draft has no gameplay effect. A future start is saved as a schedule; it does not start immediately.

The editor supports immediate starts, FIFO queue placement, next clock hour, relative delays, tomorrow at midday, a Friday start, daily times and weekly repetition. Exact custom values use the clickable command suggestions in the GUI. For example:

```text
/rate admin mcmmo draft mining 2h 4 at 5pm
/rate admin mcmmo draft mining 2h 4 in 2 hours
/rate admin mcmmo draft all 2h 2 friday 17:00
/rate admin mcmmo draft all 1h 2 daily 12:00,20:00
/rate admin mcmmo draft mining 2h 4 weekly friday 17:00
/rate admin mcmmo draft all 30m 3 queue
/rate admin mcmmo preset next-hour
/rate admin mcmmo list 1
/rate admin mcmmo cancel <plan-uuid>
/rate admin mcmmo stop <plan-uuid>
```

For a player, `draft` opens the editor, retaining the selected entry when editing. For console, `draft`/`preset` prints the preview and a single-use `/rate admin mcmmo confirm <token>` command valid for 45 seconds. If another administrator changes the queue, review again. `list` shows twelve entries per page, including terminal history and plan UUIDs. GUI cancellation has its own confirmation. **Stop** ends the active execution and cancels that plan's future repetitions; **Cancel** removes a pending schedule/queue entry or acknowledges a held entry.

Times default to `Europe/Amsterdam`. Each saved schedule retains its timezone. `5pm` means the next occurrence of 17:00, while `friday 17:00` means the next Friday at 17:00; use `weekly friday 17:00` for repetition. `next hour` means the next clock-hour boundary. Daily schedules accept up to eight comma-separated times. A one-off nonexistent daylight-saving time is rejected; recurring schedules skip nonexistent times and run a repeated clock time only once, at its earlier offset.

### Queue, overlap and recovery rules

There is one managed mcMMO execution at a time, including different skills. An All-skills boost and a single-skill boost therefore cannot overlap. Fixed schedules are checked against the queue, other scheduled occurrences and their cooldowns over a 370-day planning horizon. Conflicting schedules are rejected rather than silently moved. A queued boost is placed in the earliest available FIFO slot and may wait longer if a native/Advent booster is still running. Its displayed time is an estimate; fixed appointments take priority over a delayed queue entry. The default gap between managed executions is five minutes, configurable through `manager.cooldown-seconds`.

Fixed occurrences have a 60-second start grace window but retain their advertised end time. An occurrence whose entire window has elapsed is missed. Missed occurrences are not replayed; recurring schedules advance to their next future occurrence. Queued boosts wait for availability and receive their full duration when they start. Stopping early starts the configured gap at the actual stop time; existing fixed appointments keep their scheduled times.

Plans are stored in `plugins/1MB-CMIAPI/Boosters/mcmmo-plans.dat` using an exclusive lock, checksummed snapshots, atomic replacement and filesystem flushes on a dedicated I/O thread. Confirmation and execution reservations precede effects. Repeated request tokens do not create another boost. Permissions and online status are rechecked after saving. Corrupt/unreadable state fails closed and is preserved for inspection. Snapshot format 2 reads and migrates format 1. The newest 500 terminal entries plus the latest entry per administrator/automation actor are retained; live and held plans are not pruned. Permanent request-token tombstones prevent replay after history pruning. Limits are 200 live plans, 5,000 retained entries and 100,000 request identities; exhausting the identity ledger requires deliberate owner maintenance rather than silently discarding duplicate protection.

An interrupted confirmation or execution becomes **HELD**; no execution is automatically replayed on restart. Inspect its details and cancel it to acknowledge it, then deliberately create a new boost if appropriate. The conservative original end plus cooldown remains reserved after an interrupted execution. A temporary provider/configuration outage ends the current occurrence while retaining the next recurring occurrence; it does not resume the interrupted award. A clean disable stops the managed XP layer. Reload closes open menus, invalidates previews and refreshes settings without reopening saved plans or resetting cooldown history.

### Presets and announcements

The default catalogue includes a five-minute 4x spontaneous flash, fifteen-minute 4x Mining rush, queued thirty-minute 3x community break, two-hour 2x next-hour happy hour, two-hour 4x Mining evening, Friday gathering and twice-daily happy hour. These are selectable templates, not automatically activated schedules. Every preset uses the same review and conflict checks.

Edit `manager.presets` with rows in this format:

```text
id|Display name|skill|duration|rate|when
next-hour|Next-hour happy hour|all|2h|2|next hour
```

Scheduled confirmation announces the real countdown, rate, scope, duration and start time, for example: “In 32 minutes, a 2x mcMMO all-skills booster starts (lasts 2 hours).” Default reminders occur at five minutes and one minute. Queue announcements explicitly say the start is estimated. Rescheduling announces the new timing; cancelling announces cancellation and removes future reminders. Start/end notices follow actual execution. Notices use plain text templates in `manager.announcements.*`; disable them with `manager.announcements.enabled`. Countdown deduplication is session-local, so a restart directly on a reminder boundary may repeat a notice, never a booster execution.

### Active-player-count boosters

Automatic population boosters are implemented but disabled by default. Enable them deliberately with:

```text
/rate debug set config manager.active-players.enabled true
```

A player qualifies when online, locally known to CMI, not AFK, not vanished, not a spectator and not marked as an NPC. Both Java and Floodgate players count by their actual server presence; names and external identity lookups are not used. Unknown CMI state does not count. The highest qualifying tier must remain stable for sixty seconds. Defaults are five active players → 2x for fifteen minutes, ten → 3x, and twenty → 4x. Edit `manager.active-players.tiers` as `players:rate:duration` rows.

The default repeat limit is six hours between automatic reservations, remembered through durable history. The count and enabled setting are rechecked before activation. These boosts share the managed cooldown and conflict checks, wait for a free opportunity, and do not accumulate an automatic queue while the server is busy. A drop in population after activation does not truncate an already-announced boost. `/rate admin mcmmo status` shows the current count and whether automation is enabled.

### Provider integration and safeguards

Managed skill boosts use mcMMO's supported `McMMOPlayerXpGainEvent`, multiplying natural PvE/PvP and party-shared XP once for the selected skill. They preserve fractional XP and ignore cancelled, asynchronous, command, vampirism and unknown-source awards, child-skill events and non-finite/overflowing values. The managed layer never edits mcMMO's native global or per-skill rate state, player records, items or inventories. `/rate`, shared reminders and existing mcMMO booster placeholders report its current skill scope, multiplier and remaining time.

The managed multiplier applies to the natural XP award after mcMMO's ordinary skill formula and permission perks. A verified neutral native global rate of 1x, PlaceholderAPI readback, an available mcMMO event API and no tracked native/Advent execution are required. A known native skill-rate change blocks managed starts until staff reviews it and uses `/xprate reset`; authorized native changes stop the managed layer without undoing the native command. Legacy `/rate start mcmmo` is refused when it conflicts with managed plans/cooldowns. Advent's separate owned booster also waits while a managed execution is active or reserved.

mcMMO does not expose authoritative native per-skill-rate ownership through its supported API; `%mcmmo_xprate_<skill>%` reports permission perks, not that ownership. Native per-skill overrides are memory-only. A third-party direct API change, or a change made before Boosters began observing commands, cannot be fully identified. Keep native skill-rate automation on the tracked command surface and review/reset native rates before using the managed lane after a hot enable. The exact installed API evidence is recorded in [the provider verification](../compatibility-tests/boosters-mcmmo-provider-26.3-2026-10-31.md).

Admin inventories use the shared custom holder, owner UUID and session nonce. All item movement paths are cancelled; only intended clicks invoke actions. Permission loss, stale revisions, close/quit/world changes, replacement inventories and reload invalidate actions. Go live consumes its session immediately while the durable result is pending, preventing repeated clicks from creating duplicates.

### Manager configuration

All new settings are under `manager.*` in the existing Boosters config. Defaults: enabled manager, Amsterdam timezone, five-minute cooldown, maximum 10x rate and 24-hour duration; underlying hard safety bounds are 100x and seven days. Invalid configuration blocks new managed starts. Presets and activity tiers must fit configured limits. `manager.active-players.stable-seconds` and `repeat-seconds` control population stability/repeat timing. GUI labels are plain text under `gui.*` in the existing locale file.

Existing commands, Jobs boosters, Points detection, DiscordChat display and Advent consumer receipts retain their own behavior. The new planning GUI manages mcMMO.

## Player FAQ

### How do I see which bonuses are active?

Run `/rate`. It shows the supported active boosters, their rates, scope, and remaining time.

### Does one booster increase every reward on the server?

No. Boosters apply to the feature and scope shown in `/rate`, such as Jobs or mcMMO. A booster for one system does not automatically boost the others.

### Are these bonuses permanent?

Timed boosters last for their advertised window. Check `/rate` for what is active now and how much time remains.

### Can I turn off booster reminders?

Use `/rate reminders off`, `/rate reminders on`, or `/rate reminders status`. This changes your reminder preference; it does not end the server’s booster.

## Important Migration Notes

- Remove or disable the old standalone `1MB-Boosters` jar before enabling `1MB-CMIAPI-Boosters`.
- The new command is still `/rate`.
- The new config lives at `plugins/1MB-CMIAPI/Boosters/config.yml`.
- Editable player and admin text lives at `plugins/1MB-CMIAPI/Boosters/translations/locale_en.yml`.
- Runtime state lives at `plugins/1MB-CMIAPI/Boosters/booster-state.yml`.
- Per-player reminder preferences live at `plugins/1MB-CMIAPI/Boosters/player-reminders.yml`.
- The plugin does not import old state files automatically. Start with a clean state or start/stop boosters once through `/rate`.
- On first startup, an existing shared `plugins/1MB-CMIAPI/translations/boosters.yml` is copied into the new Boosters locale location and completed with any missing keys.

## Commands

```text
/rate
/rate status
/rate reminders [on|off|status]
/rate info
/rate help
/rate admin
/rate admin status
/rate admin start <mcmmo|jobs|all> <time> <rate>
/rate admin stop <mcmmo|jobs|all>
/rate admin reload
/rate start <mcmmo|jobs|all> <time> <rate>
/rate stop <mcmmo|jobs|all>
/rate reload
/rate debug
/rate debug status
/rate debug commands [page]
/rate debug permissions [page]
/rate debug placeholders [page]
/rate debug config [page]
/rate debug config <path>
/rate debug config <path> <value>
/rate debug set config <path> <value>
/rate debug toggle <path> [true|false]
/rate debug integrations
/rate debug state
/rate debug raw
/rate debug logs [page]
/rate debug clean logs
/rate debug cleanlogs
/rate debug all
```

## Example Commands

```text
/rate
/rate reminders
/rate reminders off
/rate reminders on
/rate info
/rate admin
/rate admin start all 1h 2
/rate start mcmmo 1h 2
/rate start jobs 30m 2.5
/rate start all 1h 2
/rate stop mcmmo
/rate stop jobs
/rate stop all
/rate debug integrations
/rate debug state
/rate debug logs
/rate debug config features.points.visible
/rate debug config features.points.visible false
/rate debug set config logging.audit-to-console false
/rate debug toggle display.sections.points
```

`/rate admin` is the preferred administration namespace. The existing direct `/rate start`, `/rate stop`, and `/rate reload` forms remain supported for compatibility.

## Permissions

```text
onembcmi.boosters.use
onembcmi.boosters.admin
onembcmi.boosters.debug
```

`onembcmi.boosters.use` also covers toggling your own `/rate reminders` preference.

Legacy compatibility permissions:

```text
onemb.boosters.rate
onemb.boosters.admin
onemb.boosters.debug
```

## Placeholders

Primary 1MB-CMIAPI placeholders:

```text
%onembcmi_boosters.enabled%
%onembcmi_boosters.mcmmo.active%
%onembcmi_boosters.mcmmo.rate%
%onembcmi_boosters.mcmmo.time%
%onembcmi_boosters.mcmmo.timeleft%
%onembcmi_boosters.mcmmo.dependency%
%onembcmi_boosters.jobs.active%
%onembcmi_boosters.jobs.rate%
%onembcmi_boosters.jobs.time%
%onembcmi_boosters.jobs.timeleft%
%onembcmi_boosters.jobs.dependency%
%onembcmi_boosters.points.active%
%onembcmi_boosters.points.rate%
%onembcmi_boosters.points.time%
%onembcmi_boosters.points.timeleft%
%onembcmi_boosters.points.dependency%
%onembcmi_boosters.runtime.recent_actions%
%onembcmi_boosters.runtime.reminder_players%
```

Legacy PlaceholderAPI compatibility placeholders:

```text
%onembboosters_mcmmo_active%
%onembboosters_mcmmo_rate%
%onembboosters_mcmmo_time%
%onembboosters_mcmmo_timeleft%
%onembboosters_jobs_active%
%onembboosters_jobs_rate%
%onembboosters_jobs_time%
%onembboosters_jobs_timeleft%
%onembboosters_points_active%
%onembboosters_points_rate%
%onembboosters_points_time%
%onembboosters_points_timeleft%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/Boosters/config.yml
```

Every config path is commented. Comments are re-applied on reload while existing values are preserved through the shared 1MB-CMIAPI config helper.

The locale filename is selected by `locale.file`, which defaults to `locale_en.yml`.

Key settings:

```text
locale.file
restore.delay-ticks
features.mcmmo.enabled
features.jobs.enabled
features.points.enabled
features.points.visible
features.points.experimental
display.sections.mcmmo
display.sections.jobs
display.sections.points
display.sections.discordchat
display.labels.mcmmo
display.labels.jobs
display.labels.points
display.labels.discordchat
reminders.enabled
reminders.default-on
reminders.first-delay-seconds
reminders.second-delay-seconds
tab-completion.common-durations
tab-completion.common-rates
logging.audit-to-console
logging.recent-action-limit
command-hooks.start.global
command-hooks.start.mcmmo
command-hooks.start.jobs
command-hooks.stop.global
command-hooks.stop.mcmmo
command-hooks.stop.jobs
broadcasts.start.mcmmo
broadcasts.start.jobs
broadcasts.stop.mcmmo
broadcasts.stop.jobs
mcmmo.announce-on-rate-start
mcmmo.announce-on-restore
jobs.start-command
jobs.reset-command
points.plugin-name
points.config-file
points.ingame-path
points.discord-path
points.base-ingame-points
points.base-discord-points
points.manual-control-only
discordchat.config-file
placeholders.legacy-onembboosters-expansion
```

## Live-Editable Text

Most `/rate` output, reminder text, command help, and admin feedback is loaded from:

```text
plugins/1MB-CMIAPI/Boosters/translations/locale_en.yml
```

Edit that file, then run `/rate reload`. A restart and a rebuilt jar are not required. The reload also refreshes Boosters config, tracked state, reminder preferences, integrations, and its PlaceholderAPI expansion, matching the command's existing behavior.

The timed status row has separate placeholders for the configured booster duration and its current remaining time:

```yaml
status:
  active-timed: "... {rate}x for {duration}. Time left: {remaining}."
```

Other status and reminder templates expose the placeholders visible in the bundled locale file, including `{scope}`, `{ingame}`, `{discord}`, `{reason}`, `{name}`, `{detail}`, and `{count}`. Dynamic values are escaped before MiniMessage rendering.

Configured lifecycle broadcasts and console command hooks remain in `config.yml`; they were already live-editable through `/rate reload`.

## Behavior

`/rate start mcmmo <time> <rate>` dispatches `/xprate <rate> <announce>` from console, stores the tracked state, schedules expiry, runs configured start hooks, and sends configured broadcasts.

`/rate start jobs <time> <rate>` dispatches the configured Jobs start command, defaulting to `jobs boost all all {duration_compact} {rate}`, then stores and schedules state the same way.

`/rate stop mcmmo` dispatches `/xprate reset` and clears tracked state.

`/rate stop jobs` dispatches the configured Jobs reset command, defaulting to `jobs boost all reset`, and clears tracked state.

Explicit admin stop commands use stored tracked state rather than passive display state, so staff can still reset a stale booster if its tracked end time has already passed.

`/rate`, `/rate status`, debug state output, and PlaceholderAPI lookups are passive status reads. If they notice expired tracked state, they show the booster as inactive while the internal expiry timer/watchdog finalizes the normal end flow. They do not run stop broadcasts, stop hooks, or reset commands.

A timed row distinguishes the original duration from the countdown, for example: `6x for 30m. Time left: 6m.`

An internal once-per-second expiry watchdog also checks tracked mcMMO and Jobs state. This keeps automatic end broadcasts and reset commands reliable even if a single scheduled expiry task becomes stale or the server tick timing drifts.

External `/xprate` and `/jobs boost` commands are monitored so admin actions outside `/rate` can still update the status display and placeholders.

Points reads PyroWelcomesPro `config.yml` and compares current values with configured base values. If either value is above base, Points shows as active and exposes an inferred multiplier. It is read-only by default because automatic writes and reloads should only happen once the target plugin is verified to reload those values safely.

DiscordChat reads the DiscordChat feature config and shows a DiscordChat row only when `event-multiplier.enabled` is true, the multiplier is above `1.0`, and the configured end time has not passed. Inactive DiscordChat multipliers stay hidden from `/rate` by default.

Player reminders are passive. When enabled globally and enabled for the player, Boosters schedules two join reminders: one after `reminders.first-delay-seconds` and one `reminders.second-delay-seconds` later. Each scheduled reminder re-checks permissions, the player's opt-out, and current active booster state before sending anything. If no booster is active by then, nothing is sent.

`/rate reminders` toggles a player's reminder preference. `/rate reminders on`, `/rate reminders off`, and `/rate reminders status` are also accepted. Reminder chat uses a clickable `[Boosters]` prefix and clickable message body that runs `/rate`; the hover text lists the active booster details and mentions `/rate reminders`.

## CMI / CMILib / CMI-API Usage

Boosters is a normal 1MB-CMIAPI feature jar. It depends on CMI, CMILib, and `1MB-CMIAPI-Lib`, uses the shared feature registry, shared MiniMessage output, shared config comments, shared docs/debug shape, and shared PlaceholderAPI registration path.

It uses CMI mainly for server-facing command hooks and broadcast/title commands configured in `command-hooks.*`. The booster mechanics themselves are integration-specific: mcMMO is controlled through `/xprate`, Jobs through `/jobs boost`, and Points through PyroWelcomesPro config inspection.

## Paper API Usage

Boosters uses Paper/Bukkit command, plugin, scheduler, YAML, and event APIs. It listens to `PlayerCommandPreprocessEvent` and `ServerCommandEvent` at monitor priority to detect native booster commands after other plugins have accepted them.

## Security Notes

- Player-facing `/rate` status is read-only.
- Player-facing `/rate reminders` only writes that sender's own boolean preference.
- Status, debug, and placeholder reads never trigger booster stop broadcasts or stop command hooks.
- Start, stop, reload, debug, and config edits require admin/debug permissions.
- `/rate debug set config` only accepts known scalar config paths from this plugin's defaults.
- List config values are not editable through the in-game set command.
- Command hooks are server-owner configured only. They can run console commands, so keep them limited to trusted server automation.
- Dynamic values are escaped before MiniMessage rendering.

## Testing

Issue #84 is implemented in canonical build **827**. The full suite and two native Paper passes are recorded in [the verification report](../compatibility-tests/boosters-issue84-26.3-2026-10-31.md). Real Java/Bedrock gameplay acceptance remains separate.

```text
/rate
/rate reload
/rate start mcmmo 5m 2
/rate reminders off
/rate reminders on
/rate debug state
/rate stop mcmmo
/rate start jobs 5m 2
/rate debug integrations
/rate debug placeholders
/papi parse me %onembboosters_mcmmo_active%
/papi parse me %onembcmi_boosters.mcmmo.active%
```

[Plugin index](README.md) | [Documentation index](../README.md)

## Advent execution ownership

Advent keeps its own seasonal FIFO, cooldown, and claim-to-contribution receipts. Boosters supplies the shared `McMmoBoosterControl` service for one bounded execution lease; the managed `/rate` queue coordinates with this service and never starts while Advent owns or reserves an execution. The consumer reserves its claim before calling `start(token, hardStop, startGate)`. The provider persists a reservation, repeats the consumer's current start gate, dispatches the global mcMMO rate command, and verifies `%mcmmo_xprate%` before acknowledging activation. The service requires PlaceholderAPI and a resolvable mcMMO XP-rate placeholder. A verified neutral global rate of `1.0` and no tracked staff boost are required; a non-neutral base rate deliberately waits for review.

The execution lease is stored separately in `Boosters/owned-mcmmo.dat`, with an exclusive file lock, checksum, atomic replacement and filesystem flushes on a dedicated writer. It records the contribution UUID, reserved/active/finished/held state, and absolute end time. The end is the earlier of five minutes after activation or the caller's season cutoff. `/rate` displays the active owned execution, and `/rate stop mcmmo` can stop it. Known live ownership still expires if a subsequent disk write fails. Feature disable attempts to stop only a positively identified owned rate.

A valid, authorized staff `/rate start` or global `/xprate` replacement revokes the old ownership. Malformed, read-only and unauthorized player `/xprate` attempts cannot revoke it. Namespaced global commands and the `clear` reset alias are recognized. An externally changed actual global rate is preserved. Direct third-party API changes to the identical numeric rate cannot carry ownership metadata; integrations should use the tracked command/control surface for intentional replacements.

A crash during an unacknowledged reservation becomes `HELD`, with no automatic start replay. An acknowledged active lease can reconcile against the actual rate. A server restart that has already returned mcMMO to its neutral rate consumes the old execution rather than replaying its remaining time. Missing rate readback blocks new starts and prevents unsafe resets. Staff should inspect `/rate`, the actual mcMMO global rate and Advent's queue diagnostics before resolving an uncertain execution. If a stale uncertain 5x rate remains, an authorized `/xprate reset` clears it; a held claim is never automatically granted another booster. When the rate is already neutral and the uncertain window has ended, later queued contributions may proceed after their conservative cooldown.

The readback was verified against the locally installed mcMMO `2.3.002-SNAPSHOT` placeholder implementation. The global mutation permission nodes `mcmmo.commands.xprate.set` and `.reset` were checked in that JAR and the compile dependency `2.2.054`. The supported command/placeholder surface is used without mcMMO reflection or internal API calls. Paper service registration and main-thread scheduling follow the [ServicesManager API](https://jd.papermc.io/paper/26.3/org/bukkit/plugin/ServicesManager.html) and [scheduler documentation](https://docs.papermc.io/paper/dev/scheduler/).
