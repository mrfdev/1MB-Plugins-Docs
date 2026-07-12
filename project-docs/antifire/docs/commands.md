# 1MB AntiFire Commands

## Main Command

The plugin registers one main command:

- `/_antifire`

It is registered with Paper's command lifecycle API, not legacy `plugin.yml` command wiring.

## Public Command

- `/_antifire info`
  Shows a player-safe introduction, useful starting notes, the installed version/build, and a clickable canonical
  docs URL.

## Admin Commands

- `/_antifire`
  Shows the admin help summary when the sender has `onembantifire.admin`. For senders without that permission, it falls
  back to the same public info view as `/_antifire info`.

- `/_antifire help`
  Shows the admin help summary and current trusted-staff usage notes.

- `/_antifire debug`
  Shows build metadata, protection states, temporary-fire timings, permanent-fire exceptions, ignite tracking, and the
  admin permission reminder.

- `/_antifire reload`
  Reloads `config.yml` from disk and applies the new values immediately.

- `/_antifire toggle <key> <value>`
  Updates one config key in game, saves it to disk immediately, and reports the old and new value.

## Command Examples

- `/_antifire info`
- `/_antifire debug`
- `/_antifire reload`
- `/_antifire toggle allow-permanent-soul-fire true`
- `/_antifire toggle prevent-fire-spread false`
- `/_antifire toggle extinguish-delay-ticks 60`

## Toggle Keys

- `prevent-fire-spread`
- `prevent-block-burn`
- `extinguish-enabled`
- `extinguish-delay-ticks`
- `check-interval-ticks`
- `track-player-placed-fire`
- `track-lightning-fire`
- `track-lava-fire`
- `track-other-ignite-fire`
- `allow-permanent-soul-fire`
- `startup-log`

## Accepted Values

- Boolean keys accept `true`, `false`, `on`, `off`, `yes`, `no`, `enabled`, `disabled`, `1`, and `0`.
- Tick keys accept whole numbers and are clamped to a minimum of `1`.

## Permission Notes

- `/_antifire info` is public.
- `/_antifire`, `help`, `debug`, `reload`, and `toggle` require `onembantifire.admin` for players.
- Console is always allowed to use the admin flow.
