# Visit

## Purpose

Visit adds player-owned visit locations using hidden CMI warps. It behaves like a lightweight player-warp feature without exposing the generated warps in normal `/warps` lists.

When a player runs `/visit set`, the plugin creates or updates a hidden CMI warp in the configured `visits` group. Other players can then use `/visit <player>` to teleport there through CMI's teleport handler.

## Features

- Create one hidden CMI-backed visit warp per player.
- Store visit records in the Visit feature folder and keep CMI warp names stable.
- Put visit warps in a configurable CMI warp group, default `visits`.
- Keep visit warps hidden by default so they do not clutter normal warp lists.
- Allow an optional welcome message of up to 128 characters by default.
- Let visit owners update just the visit message with `/visit set msg <short message>`.
- Show a readable `/visit set status` list for Visit message, arrival, money, offline, cooldown, and perk state, with hover command hints and quick toggles that refresh the status view after changes.
- Let perked visit owners set arrival titles, subtitles, particle presets, and sound presets.
- Include 9 default particle presets and 9 default sound presets, all configurable in `config.yml`.
- Let visit owners turn their arrival feedback on/off with `/visit set effects`.
- Unlock arrival perks permanently when a visit reaches `/visit top`, when enabled by config.
- Use strict player-name validation for `/visit <player>` lookups.
- Use strict safe-text cleanup for player-written visit messages, titles, and subtitles.
- Let players update their visit location with `/visit set`; bare `/visit` shows their Visit status by default.
- Let players opt their visit into a configured whole-number money charge with `/visit set money`.
- Show a short payment line when a charged visit succeeds, with hover details for total cost, owner share, and server share.
- Let players choose a visit cooldown profile with `/visit cooldown short|normal|long|off`.
- Enforce a global visitor cooldown so one player cannot rapidly cycle through many visit targets.
- Show a paginated `/visit top` leaderboard for the most visited player places, capped by config.
- Notify the visit owner when another player successfully visits them, with a clickable message to run `/visit <owner>` and meet them there.
- Hide generated `visit_` CMI warp names from `/warp` and `/warps` tab completions.
- Let staff list, inspect, delete, reload, and resync visit records.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/visit
/visit set [welcome message]
/visit set status
/visit set msg <short message>
/visit set title <very short title>
/visit set subtitle <short subtitle>
/visit set particles <preset|off|status>
/visit set sound <preset|off|status>
/visit set effects [on|off|status]
/visit set money [on|off|status]
/visit cooldown [short|normal|long|off|status]
/visit <player>
/visit info [player]
/visit unset
/visit list [page]
/visit top [page]
/visit admin list [page]
/visit admin warps [page]
/visit admin inspect <player>
/visit admin delete <player>
/visit admin sync
/visit admin reload
```

Alias:

```text
/pvisit
```

Global library examples:

```text
/1mbcmi debug plugin visit
/1mbcmi debug plugin visit all
/1mbcmi config visit
/1mbcmi config set visit cmi.warp-group visits
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.visit.use
onembcmi.visit.set
onembcmi.visit.list
onembcmi.visit.arrival
onembcmi.visit.arrival.title
onembcmi.visit.arrival.particles
onembcmi.visit.arrival.sound
onembcmi.visit.admin
onembcmi.visit.admin.inspect
onembcmi.visit.admin.delete
onembcmi.visit.admin.sync
onembcmi.visit.admin.reload
```

## Placeholders

```text
%onembcmi_visit.enabled%
%onembcmi_visit.total%
%onembcmi_visit.has_visit%
%onembcmi_visit.warp%
%onembcmi_visit.welcome%
%onembcmi_visit.title%
%onembcmi_visit.subtitle%
%onembcmi_visit.particle_preset%
%onembcmi_visit.sound_preset%
%onembcmi_visit.arrival_enabled%
%onembcmi_visit.arrival_unlocked%
%onembcmi_visit.offline_allowed%
%onembcmi_visit.money_charging%
%onembcmi_visit.visits%
%onembcmi_visit.last_visited_by%
%onembcmi_visit.runtime.teleports%
%onembcmi_visit.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMI.getInstance().getWarpManager()` creates, updates, removes, and looks up hidden visit warps.
- `CmiWarp#setGroup()` puts generated warps in the configured `visits` group.
- `CmiWarp#setHidden(true)` keeps generated visit warps out of normal player-facing warp lists.
- `CmiWarp#setCreator()` records the owning player UUID on the CMI warp.
- `CMI.getInstance().getTeleportHandler().teleportPlayer()` performs `/visit <player>` teleports through CMI's teleport handling.
- Owner visit notifications use Adventure hover and click events to explain who used `/visit <owner>` and let the owner run the same command.
- Vault economy is used when `economy.enabled` is true and a visit owner has opted into charging money.

CMILib:

- `CMILocation` stores CMI warp locations from Paper `Location` values.
- CMILib is a runtime dependency through CMI and the shared library stack.

CMI:

- CMI remains the authority for the actual warp object. Visit stores companion metadata such as owner name, welcome message, visit count, and last visitor.

Paper:

- Paper command, event, YAML, scheduler, and Adventure MiniMessage output APIs are used.
- Paper particles and Adventure sounds/titles are used for Visit arrival feedback after CMI teleport success.
- Player input is validated before lookup, and message placeholders are escaped before display.

## Config

Important config paths:

```text
enabled
cmi.warp-group
cmi.warp-prefix
cmi.hidden
cmi.require-permission
actions.bare-command-updates-location
owner-notify.enabled
economy.enabled
economy.owner-opt-in
economy.total-cost
economy.server-percent
cooldowns.enabled
cooldowns.global-seconds
cooldowns.default-profile
cooldowns.profiles.short
cooldowns.profiles.normal
cooldowns.profiles.long
cooldowns.profiles.off
arrival.enabled
arrival.cooldown-seconds
arrival.top-unlock.enabled
arrival.title.fade-in-ms
arrival.title.stay-ms
arrival.title.fade-out-ms
arrival.particles.enabled
arrival.particles.presets.<preset>.particle
arrival.particles.presets.<preset>.count
arrival.particles.presets.<preset>.offset-x
arrival.particles.presets.<preset>.offset-y
arrival.particles.presets.<preset>.offset-z
arrival.particles.presets.<preset>.extra
arrival.sounds.enabled
arrival.sounds.presets.<preset>.sound
arrival.sounds.presets.<preset>.volume
arrival.sounds.presets.<preset>.pitch
messages.max-welcome-length
messages.max-title-length
messages.max-subtitle-length
list.entries-per-page
list.top-max
safety.require-same-world-loaded
```

Live-style defaults used by the 1MB servers:

```yaml
cooldowns:
  profiles:
    'off': 0
    normal: 60
    short: 15
    long: 300
  enabled: true
  global-seconds: 10
  default-profile: normal
list:
  entries-per-page: 8
  top-max: 10
economy:
  enabled: true
  total-cost: 40
  owner-opt-in: true
  server-percent: 50
cmi:
  require-permission: false
  warp-prefix: visit_
  hidden: true
  warp-group: visits
enabled: true
safety:
  require-same-world-loaded: true
messages:
  max-welcome-length: 128
  max-title-length: 24
  max-subtitle-length: 48
arrival:
  enabled: true
  cooldown-seconds: 60
  top-unlock:
    enabled: true
  title:
    fade-in-ms: 400
    stay-ms: 2200
    fade-out-ms: 600
  particles:
    enabled: true
    presets:
      sparkle:
        particle: HAPPY_VILLAGER
        count: 24
      magic:
        particle: WITCH
        count: 32
      starlight:
        particle: END_ROD
        count: 18
      portal:
        particle: PORTAL
        count: 36
      cloud:
        particle: CLOUD
        count: 18
      firework:
        particle: FIREWORK
        count: 16
      totem:
        particle: TOTEM_OF_UNDYING
        count: 24
      glow:
        particle: GLOW
        count: 20
      soul:
        particle: SOUL_FIRE_FLAME
        count: 20
  sounds:
    enabled: true
    presets:
      chime:
        sound: minecraft:block.amethyst_block.chime
      bell:
        sound: minecraft:block.note_block.bell
      harp:
        sound: minecraft:block.note_block.harp
      allay:
        sound: minecraft:entity.allay.ambient_with_item
      level:
        sound: minecraft:entity.player.levelup
      beacon:
        sound: minecraft:block.beacon.activate
      twinkle:
        sound: minecraft:entity.firework_rocket.twinkle
      enchant:
        sound: minecraft:block.enchantment_table.use
      orb:
        sound: minecraft:entity.experience_orb.pickup
debug: false
actions:
  bare-command-updates-location: false
owner-notify:
  enabled: true
```

## Data

Visit index:

```text
plugins/1MB-CMIAPI/Visit/visits.yml
```

Example:

```yaml
visits:
  player-uuid:
    name: "PlayerName"
    warp: "visit_abcdef123456"
    welcome: "Welcome to my base."
    arrival:
      enabled: true
      message-enabled: true
      title: "Crystal Cove"
      subtitle: "Take a look around"
      particle-preset: "sparkle"
      particles-enabled: true
      sound-preset: "chime"
      sound-enabled: true
      unlocked: false
    visits: 4
    last-visited-by: "VisitorName"
    last-visited-at: "2026-04-25T00:00:00Z"
    charge-money: false
    cooldown-profile: "normal"
    updated-at: "2026-04-25T00:00:00Z"
    location:
      world: "world"
      x: 10.5
      y: 65.0
      z: -22.5
      yaw: 180.0
      pitch: 0.0
```

## Security Notes

- `/visit <player>` accepts only strict Minecraft-style names: letters, numbers, and underscore, length 3-16.
- Welcome messages, titles, and subtitles are stripped of legacy color codes, MiniMessage-like tags, hex color forms, unsafe symbols, and line breaks, then limited by config.
- The safe text allowlist is letters, numbers, spaces, dashes, and the exact `<3` heart shorthand.
- Arrival particle, sound, and title effects only run after a successful CMI teleport and are protected by a separate cosmetic cooldown.
- Visit warps are hidden and placed in a dedicated CMI group by default.
- Generated visit warp names are filtered from `/warp` and `/warps` tab completions as an extra guard around CMI hidden warp behavior.
- Visit economy costs are whole-number amounts. `economy.server-percent` is removed from the visitor payment; the remainder is deposited into the visit owner's balance.
- A paid visit uses one durable idempotency receipt from visitor withdrawal through teleport and owner-share deposit. A failed teleport refunds the visitor, and an uncertain owner deposit remains unresolved in `/visit debug transactions` instead of charging or paying twice.
- Player-facing `/visit info` and `/visit list` do not expose the generated hidden CMI warp name. Staff can inspect hidden warp details with `/visit admin warps` or `/visit admin inspect <player>`.
- Visit cooldowns have two layers. `cooldowns.global-seconds` is a visitor-wide runtime cooldown for `/visit <player>` so one player cannot rapidly run through the visit list. Owner profiles are stored per visit and enforced per visitor/owner pair after a successful teleport. Owners can choose `short`, `normal`, `long`, or `off`; the actual seconds are controlled by config.
- Admin delete removes only the Visit record and its generated hidden CMI warp.
- The plugin does not run raw console commands from player input.

## Shared Library Usage

Visit uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, paginated list output, cache size reporting, and debug metadata.

[Plugin index](README.md)
