# MobHat

MobHat lets players wear a small whitelisted mob as a temporary cosmetic. It does not replace CMI's normal `/hat` item feature. Instead, it owns `/mobhat` and can optionally bridge only the specific `/hat mob ...` pattern into MobHat.

That keeps CMI's `/hat` behavior intact while still allowing a friendly shortcut for players.

## Features

- Spawns a safe cosmetic copy of a whitelisted mob.
- Mounts the stable `head` cosmetic mob on the player with Paper/Bukkit passengers.
- Adds an experimental offset-position test bed for `back`, `shoulder-left`, and `shoulder-right`.
- Keeps the real targeted mob in place when using `/mobhat target`.
- Supports baby mobs for `Ageable` entities.
- Supports modern entity scale through the `SCALE` attribute where available.
- Uses a whitelist and optional per-mob permissions for gradual rollout.
- Supports world allow/block rules, blocked environments, and optional per-world permissions.
- Can require one empty inventory slot before equipping, so it stays safe beside CMI `/hat` item workflows.
- Removes cosmetic mob hats on quit, death, world change, dismount, disable, and stale/orphan cleanup.
- Cancels damage and targeting for MobHat entities.
- Keeps CMI's normal `/hat` command untouched except for the optional `/hat mob` bridge.

## Commands

```text
/mobhat
/mobhat help
/mobhat info
/mobhat status
/mobhat list [page]
/mobhat preview <type>
/mobhat mob <type>
/mobhat target
/mobhat position
/mobhat position <head|back|shoulder-left|shoulder-right|reset>
/mobhat remove
/mobhat reload
/mobhat admin inspect <player>
/mobhat admin remove <player>
/mobhat admin reload
/mobhat debug
/mobhat debug status
/mobhat debug commands [page]
/mobhat debug permissions [page]
/mobhat debug placeholders [page]
/mobhat debug config [page]
/mobhat debug set config <path> <value>
/mobhat debug all
```

Optional bridge:

```text
/hat mob <type>
/hat mob
```

When `alias.hat-mob.no-type-uses-target` is true, `/hat mob` with no type behaves like `/mobhat target`.

## Example Commands

```text
/mobhat info
/mobhat help
/mobhat list
/mobhat preview frog
/mobhat preview parrot
/mobhat mob goat
/mobhat mob chicken
/mobhat position
/mobhat position back
/mobhat position shoulder-left
/mobhat position reset
/mobhat target
/mobhat remove
/hat mob goat
/hat mob
/mobhat debug config
/mobhat debug set config mobs.baby-mobs-only false
/mobhat admin inspect mrfloris
/mobhat admin remove mrfloris
/mobhat reload
```

## Permissions

```text
onembcmi.mobhat.use
onembcmi.mobhat.wear
onembcmi.mobhat.target
onembcmi.mobhat.remove
onembcmi.mobhat.position
onembcmi.mobhat.position.experimental
onembcmi.mobhat.alias.hatmob
onembcmi.mobhat.mob.*
onembcmi.mobhat.mob.<entity_type>
onembcmi.mobhat.world.*
onembcmi.mobhat.world.<world>
onembcmi.mobhat.admin
```

Examples:

```text
onembcmi.mobhat.mob.goat
onembcmi.mobhat.mob.chicken
onembcmi.mobhat.mob.rabbit
```

`mobs.require-per-mob-permission` defaults to true, so players need either the exact mob permission or `onembcmi.mobhat.mob.*` before they can wear a whitelisted mob.

## Placeholders

```text
%onembcmi_mobhat.enabled%
%onembcmi_mobhat.active%
%onembcmi_mobhat.active.type%
%onembcmi_mobhat.allowed.count%
%onembcmi_mobhat.runtime.active_count%
%onembcmi_mobhat.runtime.spawned%
%onembcmi_mobhat.runtime.removed%
%onembcmi_mobhat.runtime.alias_uses%
%onembcmi_mobhat.runtime.target_uses%
%onembcmi_mobhat.runtime.denied%
%onembcmi_mobhat.world.allowed%
%onembcmi_mobhat.position%
%onembcmi_mobhat.position.default%
%onembcmi_mobhat.position.preference%
%onembcmi_mobhat.position.testbed%
%onembcmi_mobhat.last.player%
%onembcmi_mobhat.last.type%
%onembcmi_mobhat.last.position%
```

Example checks:

```text
papi parse mrfloris %onembcmi_mobhat.active%
papi parse mrfloris %onembcmi_mobhat.active.type%
papi parse mrfloris %onembcmi_mobhat.runtime.spawned%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/MobHat/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
output:
  page-size: 8
alias:
  hat-mob:
    enabled: false
    no-type-uses-target: true
inventory:
  require-empty-slot-before-equip: true
position:
  default: head
  allow-player-preference: true
  allowed:
  - head
  - back
  - shoulder-left
  - shoulder-right
  experimental-offset-enabled: true
  allowed-mobs:
    head:
    - CHICKEN
    - PIG
    - COW
    - SHEEP
    - GOAT
    - RABBIT
    - CAT
    - WOLF
    - FOX
    - FROG
    - ARMADILLO
    - TURTLE
    - NAUTILUS
    - PARROT
    - BEE
    back:
    - PARROT
    - BEE
    - RABBIT
    - CAT
    - FOX
    - WOLF
    - CHICKEN
    - ARMADILLO
    - TURTLE
    - FROG
    - NAUTILUS
    shoulder:
    - PARROT
    - BEE
    - RABBIT
    - ARMADILLO
    - NAUTILUS
    - CAT
    - FOX
    - WOLF
    - FROG
  offset:
    update-ticks: 2
    scale-multiplier: '0.65'
    allowed-mobs: []
    back: 0.0,1.45,-0.85
    shoulder-left: -0.65,1.75,0.05
    shoulder-right: 0.65,1.75,0.05
  style:
    enabled: true
    apply-fixed-pose: true
    back:
      yaw-offset: '180.0'
      pitch: '0.0'
      pitch-per-mob:
      - TURTLE=90.0
      - FROG=25.0
      mobs:
      - FOX=sleeping
      - CAT=lying
      - WOLF=sitting
      - ARMADILLO=rolled
      - TURTLE=swimming
      - RABBIT=sitting
      - PARROT=sitting
      - BEE=rolling
      - FROG=croaking
    shoulder:
      yaw-offset: '0.0'
      pitch: '0.0'
      pitch-per-mob: []
      mobs:
      - FOX=sitting
      - CAT=sitting
      - WOLF=sitting
      - ARMADILLO=rolled
      - RABBIT=sitting
      - PARROT=sitting
      - BEE=rolling
      - FROG=croaking
mobs:
  baby-mobs-only: true
  require-per-mob-permission: true
  allowed:
  - CHICKEN
  - PIG
  - COW
  - SHEEP
  - GOAT
  - RABBIT
  - CAT
  - WOLF
  - FOX
  - FROG
  - ARMADILLO
  - TURTLE
  - NAUTILUS
  - PARROT
  - BEE
  remove-existing-before-equip: true
  target-max-distance: '8.0'
cosmetic:
  silent: true
  no-ai: true
  invulnerable: true
  gravity: true
  glowing: false
  collidable: false
  can-pickup-items: false
  persistent: false
  custom-name-visible: false
scaling:
  enabled: true
  default: '0.70'
  per-mob:
  - CHICKEN=0.85
  - RABBIT=0.95
  - BEE=0.80
  - PARROT=0.90
  - CAT=0.85
  - FOX=0.85
  - WOLF=0.75
  - GOAT=0.55
  - COW=0.50
  - SHEEP=0.55
  - PIG=0.55
  - FROG=0.80
  - TURTLE=0.65
  - ARMADILLO=0.75
  - NAUTILUS=0.70
worlds:
  allowed: []
  blocked: []
  blocked-environments:
  - NETHER
  - THE_END
  require-per-world-permission: false
safety:
  remove-on-quit: true
  remove-on-death: true
  remove-on-world-change: true
  clean-marked-hats-on-enable: true
  orphan-cleanup:
    enabled: true
    period-ticks: 60
    scan-worlds: true
```

All config comments are written by the shared config helper and re-applied on reload while existing values are preserved.

`mobs.allowed` is the global safety whitelist. It controls `/mobhat list`, tab suggestions, and whether `/mobhat mob <type>` can equip. The per-position lists under `position.allowed-mobs.*` only decide which already-globally-allowed mobs may be used on `head`, `back`, or `shoulder`; they do not allow a mob by themselves.

If `/mobhat preview nautilus` says `global allowed: no`, add `NAUTILUS` to `mobs.allowed` as well as the position list you want, then run `/mobhat reload`.

`scaling.default` and `scaling.per-mob` control visual size. `1.0` is normal mob scale before baby/adult state. Because `mobs.baby-mobs-only` defaults to true, many animals are already baby-sized and then scaled again, so values around `0.70` to `0.95` are usually more readable than very small values.

### Position Test Bed

The stable default is:

```yaml
position:
  default: head
```

`head` uses Paper/Bukkit passengers. The experimental positions use a marked, no-AI cosmetic mob that follows a relative offset around the player. This avoids deprecated shoulder APIs and old armor stand/slime tricks.

Players can set a preference when `position.allow-player-preference` is true:

```text
/mobhat position
/mobhat position head
/mobhat position back
/mobhat position shoulder-left
/mobhat position shoulder-right
/mobhat position reset
```

Players and admins can preview a mob before wearing it:

```text
/mobhat preview parrot
/mobhat preview frog
```

The preview shows whether the mob is globally allowed, which position lists allow it, the permission node, scale, baby handling, and offset safety settings.

`back`, `shoulder-left`, and `shoulder-right` also require:

```text
onembcmi.mobhat.position.experimental
```

Offset values are `right,y,forward` relative to the player. Negative forward means behind the player:

```yaml
position:
  allowed-mobs:
    head:
    - PARROT
    - FROG
    back:
    - PARROT
    - CAT
    shoulder:
    - PARROT
    - BEE
  offset:
    scale-multiplier: '0.65'
    back: 0.0,1.45,-0.85
    shoulder-left: -0.65,1.75,0.05
    shoulder-right: 0.65,1.75,0.05
```

The position allow-lists are intentionally separate. `head` is the stable passenger mode and can allow larger mobs. `back` and `shoulder` use real living entities following a cosmetic offset, so wide/tall mobs can still cause player nudging if their hitbox overlaps the player. Keep those lists smaller and use `/mobhat preview <mob>` before adding a mob to a public group.

### Style Test Bed

Back and shoulder positions can apply experimental mob styles:

```yaml
position:
  style:
    enabled: true
    apply-fixed-pose: true
    back:
      yaw-offset: '180.0'
      pitch: '0.0'
      pitch-per-mob:
      - TURTLE=90.0
      mobs:
      - FOX=sleeping
      - CAT=lying
      - WOLF=sitting
      - ARMADILLO=rolled
      - TURTLE=swimming
    shoulder:
      mobs:
      - PARROT=sitting
      - BEE=rolling
```

Supported style keywords are:

```text
sitting
sleeping
lying
rolled
rolling
swimming
croaking
sneaking
standing
fall-flying
interested
none
```

Some styles are mob-specific. For example, `sleeping` is useful for foxes, `lying` is useful for cats, `rolled` is useful for armadillos, and `rolling` is useful for bees. Generic poses such as `swimming`, `croaking`, or `fall-flying` are best treated as visual experiments. Minecraft may ignore pitch or render only part of the pose on some living mob models.

Yaw and pitch are read while the cosmetic follows the player, so those changes can show quickly. Style changes such as `FOX=sleeping` or `TURTLE=swimming` are applied when the mob is equipped, so remove and re-equip the MobHat after changing style mappings.

For turtle backpack testing, the default test-bed tries:

```yaml
position:
  style:
    back:
      pitch-per-mob:
      - TURTLE=90.0
      mobs:
      - TURTLE=swimming
```

If that still looks wrong in game, turtle is probably just not a good back cosmetic with normal living-entity rendering.

Older beta configs may still have:

```yaml
position:
  offset:
    allowed-mobs:
    - TURTLE
```

That legacy list is now additive. Anything listed there is added to both the `back` and `shoulder` allow-lists at runtime, so temporary test configs keep working while the clearer per-position lists are adopted.

Important command shape:

```text
/mobhat position back
/mobhat mob turtle
```

`/mobhat position turtle` tries to set the position to `turtle`, so the plugin now replies with a clearer hint instead of only saying the position is not allowed.

If this test bed feels bad in live testing, set:

```yaml
position:
  experimental-offset-enabled: false
```

That forces offset preferences back to `head` without deleting stored player preferences.

### World Safety

MobHat defaults to blocking Nether and End environments:

```yaml
worlds:
  blocked-environments:
  - NETHER
  - THE_END
```

If you only want MobHat in one survival world, set:

```yaml
worlds:
  allowed:
  - wilderness
```

If you want LuckPerms to decide per world, enable:

```yaml
worlds:
  require-per-world-permission: true
```

Then grant nodes like:

```text
onembcmi.mobhat.world.wilderness
onembcmi.mobhat.world.*
```

## How `/hat mob` Works

Paper/Bukkit commands own the first command word, so this plugin cannot register an alias literally named `/hat mob`. CMI owns `/hat`.

The recommended live setup is to keep MobHat's built-in bridge disabled and create a CMI CustomAlias that forwards `/hat mob ...` to `/mobhat mob ...`.

If `alias.hat-mob.enabled` is set to true, MobHat listens to `PlayerCommandPreprocessEvent` and only intercepts this exact shape:

```text
/hat mob [type]
```

Then it cancels that command and dispatches the safe MobHat command:

```text
/mobhat mob <type>
```

If no type is supplied and `alias.hat-mob.no-type-uses-target` is true, it dispatches:

```text
/mobhat target
```

Normal CMI `/hat` usage is left alone.

## CMI / CMILib / CMI-API Usage

- Depends on CMI and CMILib because it is part of the 1MB-CMIAPI plugin family and is designed to coexist with CMI's `/hat`.
- Does not modify CMI internals or replace CMI's `/hat` command.
- Uses the shared 1MB-CMIAPI library for config comments, translations, help, info, debug, placeholders, and feature metadata.

## Paper API Usage

- Uses Paper/Bukkit passengers with `Player#addPassenger` for the stable `head` mode.
- Uses normal Paper/Bukkit entity teleporting for experimental offset-position testing.
- Forces offset-position mobs to no-AI, not-aware, no-gravity, non-collidable, and an extra scale multiplier to reduce hitbox overlap.
- Uses `World#rayTraceEntities` for `/mobhat target`.
- Uses `PersistentDataContainer` to mark spawned MobHat entities with owner/type metadata.
- Uses the modern `Attribute.SCALE` attribute where available to size cosmetic mobs.
- Uses Bukkit entity lifecycle events to remove hats safely.

## Safety Notes

- Only whitelisted `EntityType` values can be spawned.
- Mob command input is restricted to a small safe entity-name pattern.
- Cosmetic mobs are marked, non-persistent by default, no-AI by default, silent by default, invulnerable by default, non-collidable by default, and cannot pick up items by default.
- The plugin cancels damage and target events for marked MobHat entities.
- Dismounted `head` MobHat entities are always removed so they cannot become normal world mobs.
- A periodic orphan cleanup removes marked MobHat entities that are not still tracked.
- Offset-position mobs are no-AI, no-gravity, marked cosmetics that are removed on quit, death, world change, plugin disable, and stale startup cleanup.
- Stale MobHat entities are cleaned on enable by default.

## Testing

```text
/mobhat info
/mobhat help
/mobhat list
/mobhat preview frog
/mobhat mob goat
/mobhat position back
/mobhat mob parrot
/mobhat status
/mobhat remove
/hat mob chicken
/mobhat target
/mobhat debug all
papi parse mrfloris %onembcmi_mobhat.active%
```

[Plugin index](README.md) | [Documentation index](../README.md)
