# PvPToggle

PvPToggle is the 1MB-CMIAPI replacement for the standalone `1MB-PvPToggle` plugin. It gives players a personal `/pvp` switch, stores state in shared `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml`, and uses the same pastel MiniMessage output, help, debug, config, translation, and placeholder patterns as the rest of the 1MB-CMIAPI feature jars.

This plugin is intentionally built from scratch inside this repo. The first version preserves the useful behavior from the standalone plugin while making room for richer CMI combat integrations later.

The visible chat prefix is intentionally shortened to `PvP`, while the internal feature id and jar remain `pvptoggle` / `PvPToggle` for migration compatibility.

## Important Migration Notes

- Remove or disable the standalone `1MB-PvPToggle` jar before testing this feature.
- `/pvp` may conflict with CMI or another plugin if they already own that command. If `/pvp` does not call this plugin, check `/plugins`, `/version 1MB-CMIAPI-PvPToggle`, and CMI command aliases.
- This plugin does not import old `plugins/1MB-PvPToggle/Data/*.yml` files yet. It starts using shared 1MB-CMIAPI playerdata.
- Legacy permissions such as `pvptoggle.allow` are accepted by default through `permissions.accept-legacy-nodes: true`.
- Legacy PlaceholderAPI placeholders such as `%PvPToggle_pvp_enabled%` are registered by default when PlaceholderAPI is loaded and no other plugin already registered the `PvPToggle` expansion.

## Commands

```text
/pvp
/pvp help
/pvp info
/pvp status
/pvp toggle
/pvp on
/pvp off
/pvp <player>
/pvp status <player>
/pvp toggle <player>
/pvp on <player>
/pvp off <player>
/pvp reload
/pvp admin inspect <player>
/pvp admin reset <player>
/pvp admin reload
/pvp debug
/pvp debug status
/pvp debug commands [page]
/pvp debug permissions [page]
/pvp debug placeholders [page]
/pvp debug config [page]
/pvp debug set config <path> <value>
/pvp debug all
```

## Example Commands

```text
/pvp
/pvp info
/pvp help
/pvp status
/pvp toggle
/pvp on
/pvp off
/pvp mrfloris
/pvp status mrfloris
/pvp toggle mrfloris
/pvp admin inspect mrfloris
/pvp admin reset mrfloris
/pvp reload
/pvp debug status
/pvp debug set config particles.template-mode nearby
/pvp debug set config particles.nearby-distance 7.0
/pvp debug all
```

## Permissions

```text
onembcmi.pvptoggle.use
onembcmi.pvptoggle.others
onembcmi.pvptoggle.others.set
onembcmi.pvptoggle.bypass
onembcmi.pvptoggle.reload
onembcmi.pvptoggle.admin
```

Legacy compatibility permissions:

```text
pvptoggle.allow
pvptoggle.others
pvptoggle.others.set
pvptoggle.bypass
pvptoggle.reload
```

## Placeholders

Primary 1MB-CMIAPI placeholders:

```text
%onembcmi_pvptoggle.enabled%
%onembcmi_pvptoggle.pvp.enabled%
%onembcmi_pvptoggle.pvp.state%
%onembcmi_pvptoggle.pvp.state_text%
%onembcmi_pvptoggle.pvp.state_onoff%
%onembcmi_pvptoggle.pvp.state_color%
%onembcmi_pvptoggle.pvp.state_display%
%onembcmi_pvptoggle.cooldown.remaining%
%onembcmi_pvptoggle.runtime.enabled_count%
%onembcmi_pvptoggle.runtime.allowed%
%onembcmi_pvptoggle.runtime.blocked%
%onembcmi_pvptoggle.runtime.cmi_pvp_start%
%onembcmi_pvptoggle.runtime.cmi_pvp_end%
```

Legacy PlaceholderAPI compatibility placeholders:

```text
%PvPToggle_pvp_state%
%PvPToggle_pvp_symbol%
%PvPToggle_pvp_state_clean%
%PvPToggle_pvp_enabled%
%PvPToggle_pvp_state_text%
%PvPToggle_pvp_state_onoff%
%PvPToggle_pvp_state_color%
%PvPToggle_pvp_state_display%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/PvPToggle/config.yml
```

Every config path is commented and comments are re-applied on reload while existing values are preserved.

Key settings:

```text
state.default-enabled
state.persist
permissions.accept-legacy-nodes
cooldown.disable-after-combat-seconds
eligibility.allowed-gamemodes
eligibility.require-not-vanished
eligibility.require-not-god
eligibility.auto-disable-when-ineligible
eligibility.check-interval-ticks
worlds.force-enabled
worlds.respect-pvp-gamerule
combat.block-melee
combat.block-projectiles
combat.block-potions
combat.block-fishing-rod
combat.block-firework-damage
combat.block-trident-lightning
combat.notify-denied
hooks.cmi-combat-events
placeholders.legacy-pvptoggle-expansion
particles.enabled
particles.template-mode
particles.template
particles.nearby-template
particles.nearby-distance
particles.type
particles.intensity
particles.radius
particles.period-ticks
particles.dust-color
particles.dust-size
status.recent-pvp-combat-seconds
```

Use `/pvp debug config` or `/1mbcmi config pvptoggle` to inspect current values.

Use `/pvp debug set config <path> <value>` or `/1mbcmi config set pvptoggle <path> <value>` to update supported scalar config values in-game. The shared config writer preserves existing values, re-applies comments, writes missing defaults, saves the file, and reloads the feature.

## Particle Templates

PvPToggle creates particle templates in:

```text
plugins/1MB-CMIAPI/PvPToggle/particles/
```

Default templates:

```text
soft-red.yml
calm-blue.yml
mint.yml
duel-gold.yml
```

`particles.template-mode` controls how the template is chosen:

- `selected` uses `particles.template`.
- `random` picks one configured template when the player's particle task starts.
- `nearby` normally uses `particles.template`, but switches to `particles.nearby-template` when another PvP-enabled player is within `particles.nearby-distance`.

Each template supports:

```text
enabled
type
intensity
radius
period-ticks
dust-color
dust-size
```

`type` uses Bukkit/Paper `Particle` enum names. The Paper 26.2 enum page is:

```text
https://jd.papermc.io/paper/26.2/org/bukkit/Particle.html
```

Particles that need extra data fall back to `DUST`, because this plugin only safely supplies data for `DUST`.

## Behavior

When either player has PvP disabled, PvPToggle blocks common PvP paths:

- direct melee
- player-fired projectiles
- splash potion effects
- lingering potion clouds
- fishing rod hooks
- firework damage to protected players
- trident-caused lightning damage to protected players

When both players have PvP enabled, the plugin allows the event and starts the configured PvP disable cooldown for both players.

Active PvP mode is stricter than the saved toggle. A player must have `/pvp` on and be eligible right now:

- game mode must be listed in `eligibility.allowed-gamemodes`, defaulting to `SURVIVAL` and `ADVENTURE`
- CMI vanish must be off when `eligibility.require-not-vanished: true`
- CMI god mode must be off when `eligibility.require-not-god: true`
- world PvP must be enabled when `worlds.respect-pvp-gamerule: true`

If `eligibility.auto-disable-when-ineligible: true`, the plugin turns PvP off when a player changes into creative/spectator, enables CMI vanish, enables CMI god mode, or otherwise becomes ineligible. CMI exposes vanish events, but not a public god-mode toggle event, so PvPToggle also runs a lightweight periodic eligibility check controlled by `eligibility.check-interval-ticks`.

World rules are respected:

- If a world has the Paper/Bukkit PVP gamerule disabled and `worlds.respect-pvp-gamerule: true`, the player's state is forced off.
- If a world is listed under `worlds.force-enabled`, players cannot turn PvP off there and the plugin does not block PvP damage in that world.

## CMI / CMILib / CMI-API Usage

- Uses CMI as a hard dependency because this feature lives in the CMI-API plugin set and listens to CMI PvP combat events.
- Listens to `CMIPvPStartEventAsync` and `CMIPvPEndEventAsync` for runtime counters and cooldown awareness.
- Reads CMI `PlayerCombatManager#isInCombatWithPlayer(UUID)`, `PlayerCombatManager#isInCombatWithMob(UUID)`, and matching `CMIUser` combat state for `/pvp status` and admin inspection.
- Reads CMI `CMIUser#isVanished()` and `CMIUser#isGod()` for active PvP eligibility.
- Tracks its own short recent PvP hit marker because CMI combat state and plugin-side damage cancellation are separate signals.
- Uses the 1MB-CMIAPI shared library for config comments, translations, debug pages, help/info output, placeholders, and shared playerdata.
- Uses Paper events for the actual damage cancellation layer.

## Data

Saved player state lives under the `pvptoggle` section in:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Example:

```yaml
pvptoggle:
  pvp-enabled: false
  updated-at: '2026-04-28T10:15:30Z'
```

## Security Notes

- Player command input is limited to known subcommands and online player names.
- Config editing through the shared library only accepts known config paths.
- Dynamic messages escape user-controlled values before MiniMessage rendering.
- The legacy PlaceholderAPI expansion is optional and can be disabled if it conflicts with another plugin.

## Testing

Recommended beta tests:

```text
/pvp info
/pvp help
/pvp status
/pvp toggle
/pvp off
/pvp on
/pvp status <online-player>
/pvp admin inspect <online-player>
/pvp debug all
papi parse <player> %onembcmi_pvptoggle.pvp.enabled%
papi parse <player> %PvPToggle_pvp_enabled%
```

[Plugin index](README.md) | [Documentation index](../README.md)
