# Summer Floaties Configuration

Configuration file:

```text
plugins/EventFloaties/config.yml
```

After editing config, run:

```text
/floatie reload
```

or restart the server.

## `event`

| Setting | Default | Description |
| --- | --- | --- |
| `event.live` | `false` | Controls whether normal players can claim rewards. Keep false while setting up or testing. |

When `event.live: false`:

- Normal players cannot claim rewards.
- Admins can still use `/floatie` for real matching tests.
- Successful admin tests do not save progress.
- Reward commands, broadcasts, sounds, and particles do not run.

When `event.live: true`, successful checks save progress and run configured rewards.

## `scanner`

| Setting | Default | Description |
| --- | --- | --- |
| `scanner.search-radius-xz` | `8` | How far from the player's block the scanner tries possible origins in X/Z. |
| `scanner.search-radius-y` | `5` | How far above/below the player the scanner tries possible origins. |
| `scanner.environment-radius` | `1` | Radius around the origin for water/beach environment checks. |
| `scanner.disabled-worlds` | `spawn`, `end`, `nether`, `summer` | Worlds where normal `/floatie` checks are blocked. Admin debug still works. |
| `scanner.cooldowns.global-seconds` | `15` | Shared cooldown after a non-admin check. |
| `scanner.cooldowns.player-seconds` | `60` | Per-player cooldown after a non-admin check. |
| `scanner.default-match-mode` | `SMART` | Match mode for newly saved blueprints. |
| `scanner.allow-rotation` | `true` | Allows 0/90/180/270 degree rotations. |
| `scanner.require-token` | `true` | Requires a matching token unless the player has admin/bypass permission. |
| `scanner.report-missing-limit` | `6` | Maximum missing/wrong spots shown to admins. |
| `scanner.capture-ignore-materials` | air, water, lava, barrier, smooth quartz, diamond block | Materials skipped when saving blueprints. |

`SMART` matching requires the same material, ignores waterlogged differences, and treats connection-sensitive blocks such as glass panes by material.

## Inspection Tile Environment Rules

If the blueprint origin, or the block one below origin, is:

- `LIGHT_BLUE_STAINED_GLASS` - the floatie requires nearby water.
- `CUT_SANDSTONE` - the floatie requires nearby sand.

Waterlogged blocks count as water. Sand, red sand, and suspicious sand count as sand.

## `token`

| Setting | Default | Description |
| --- | --- | --- |
| `token.material` | `NAUTILUS_SHELL` | Material used for secure event tokens. |
| `token.custom-model-data` | `250711` | CustomModelData applied to tokens. Use `0` to disable. |
| `token.name` | gradient Summer Floatie Token | Token display name. |
| `token.lore` | player instructions | Token lore. Supports `<floatie>` and `<id>`. |

Tokens use a PersistentDataContainer value with the floatie id. Tokens are checked but not consumed on completion.

## `messages`

Messages use MiniMessage formatting and are sent with the configured `messages.prefix` where applicable.

Common placeholders include:

- `<floatie>`
- `<percent>`
- `<band>`
- `<completed>`
- `<total>`
- `<seconds>`
- `<owner>`

## `rewards`

| Setting | Default | Description |
| --- | --- | --- |
| `rewards.kit-name-format` | `summerevent_floatie_{floatie_id}` | Kit name for individual floatie completion. |
| `rewards.all-kit-name` | `summerevent_floatie_reward` | Kit name for completing every floatie. |
| `rewards.sounds` | level-up + firework twinkle | Sound sequence played to the player. |
| `rewards.particles` | `FIREWORK`, `HAPPY_VILLAGER`, `SPLASH`, `NAUTILUS` | Particles shown near the player. |
| `rewards.per-floatie-commands` | `cmi kit {kit} {player} -s` | Console commands for a completed floatie. |
| `rewards.all-floaties-commands` | kit + broadcast | Console commands for completing all floaties. |

Available command placeholders:

- `{player}`
- `{uuid}`
- `{floatie_id}`
- `{floatie}`
- `{kit}`
- `{completed}`
- `{total}`
- `{all_kit}`

The CMI reward kits should remain disabled in CMI's kit files so players cannot claim them manually. The console command can still deliver them silently.
