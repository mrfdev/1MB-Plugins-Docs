# Boosters

Boosters is the 1MB-CMIAPI replacement for the standalone `1MB-Boosters` project. It provides `/rate` for booster status, admin start/stop control, debug pages, config editing, and PlaceholderAPI output while using the shared 1MB-CMIAPI runtime, config comments, translations, and support metadata.

The first merged version keeps parity with the old project where practical:

- Tracks and restores mcMMO `/xprate` boosters.
- Tracks and restores Jobs `/jobs boost` boosters.
- Detects PyroWelcomesPro Points multipliers from its config file.
- Detects an active DiscordChat event multiplier from `plugins/1MB-CMIAPI/DiscordChat/config.yml` and shows it in `/rate` only while the event is active.
- Keeps Points read-only/manual by default until live reload behavior is proven safe.
- Sends subtle per-player active-booster reminders after join, with `/rate reminders` opt-out enabled by default.
- Registers legacy `%onembboosters_*%` placeholders when PlaceholderAPI is installed.
- Accepts legacy permissions `onemb.boosters.rate`, `onemb.boosters.admin`, and `onemb.boosters.debug` for migration.

## Important Migration Notes

- Remove or disable the old standalone `1MB-Boosters` jar before enabling `1MB-CMIAPI-Boosters`.
- The new command is still `/rate`.
- The new config lives at `plugins/1MB-CMIAPI/Boosters/config.yml`.
- Runtime state lives at `plugins/1MB-CMIAPI/Boosters/booster-state.yml`.
- Per-player reminder preferences live at `plugins/1MB-CMIAPI/Boosters/player-reminders.yml`.
- The plugin does not import old state files automatically. Start with a clean state or start/stop boosters once through `/rate`.

## Commands

```text
/rate
/rate status
/rate reminders [on|off|status]
/rate info
/rate help
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

Key settings:

```text
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

## Behavior

`/rate start mcmmo <time> <rate>` dispatches `/xprate <rate> <announce>` from console, stores the tracked state, schedules expiry, runs configured start hooks, and sends configured broadcasts.

`/rate start jobs <time> <rate>` dispatches the configured Jobs start command, defaulting to `jobs boost all all {duration_compact} {rate}`, then stores and schedules state the same way.

`/rate stop mcmmo` dispatches `/xprate reset` and clears tracked state.

`/rate stop jobs` dispatches the configured Jobs reset command, defaulting to `jobs boost all reset`, and clears tracked state.

Explicit admin stop commands use stored tracked state rather than passive display state, so staff can still reset a stale booster if its tracked end time has already passed.

`/rate`, `/rate status`, debug state output, and PlaceholderAPI lookups are passive status reads. If they notice expired tracked state, they show the booster as inactive while the internal expiry timer/watchdog finalizes the normal end flow. They do not run stop broadcasts, stop hooks, or reset commands.

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

```text
/rate
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
