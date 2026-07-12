# 1MB AntiFire Configuration

## Config File Location

- `plugins/1MB-AntiFire/config.yml`

The plugin preserves existing values, fills in missing defaults, and keeps per-setting comments when it reloads or saves
through commands.

## Reload Behavior

- `/_antifire reload` reloads the file from disk and applies it immediately.
- `/_antifire toggle <key> <value>` updates the file and applies the change immediately.
- A full server restart is not required for normal configuration changes.
- `startup-log` affects the next plugin enable/startup log rather than changing past console output.

## Settings

### `prevent-fire-spread`

- Default: `true`
- Purpose: blocks natural fire spread from igniting nearby blocks.
- Safe values: `true` or `false`

### `prevent-block-burn`

- Default: `true`
- Purpose: prevents burning blocks from being destroyed by fire.
- Safe values: `true` or `false`

### `extinguish-enabled`

- Default: `true`
- Purpose: enables delayed cleanup for tracked temporary fire.
- Safe values: `true` or `false`
- Notes: disabling it clears tracked temporary-fire timers.

### `extinguish-delay-ticks`

- Default: `100`
- Purpose: controls how long tracked temporary fire stays visible before AntiFire removes it.
- Safe values: whole numbers `1` or higher
- Notes: lower values clear fire faster; higher values leave it visible longer.

### `check-interval-ticks`

- Default: `20`
- Purpose: controls how often AntiFire checks tracked temporary fire for expiry.
- Safe values: whole numbers `1` or higher
- Notes: lower values check more often; higher values reduce check frequency.

### `track-player-placed-fire`

- Default: `true`
- Purpose: tracks player-placed fire so it can be auto-extinguished later.
- Safe values: `true` or `false`

### `track-lightning-fire`

- Default: `true`
- Purpose: tracks fire caused by lightning for delayed cleanup.
- Safe values: `true` or `false`

### `track-lava-fire`

- Default: `true`
- Purpose: tracks fire caused by lava for delayed cleanup.
- Safe values: `true` or `false`

### `track-other-ignite-fire`

- Default: `true`
- Purpose: tracks other ignite causes such as flint and steel for delayed cleanup.
- Safe values: `true` or `false`

### `allow-permanent-soul-fire`

- Default: `false`
- Purpose: allows soul fire on soul sand and soul soil to stay lit instead of being treated as temporary fire.
- Safe values: `true` or `false`
- Live example: `/_antifire toggle allow-permanent-soul-fire true`

### `startup-log`

- Default: `true`
- Purpose: writes the AntiFire startup summary and build/config details to console during plugin enable.
- Safe values: `true` or `false`

## Practical Examples

- Let soul fire stay lit:
  `/_antifire toggle allow-permanent-soul-fire true`
- Disable natural spread blocking for a test:
  `/_antifire toggle prevent-fire-spread false`
- Make temporary fire disappear sooner:
  `/_antifire toggle extinguish-delay-ticks 40`
