# DropParty

## Purpose

DropParty runs timed events in a dedicated world where sulfur geysers launch approved survival loot around the arena. Players keep moving between vents, collect what they can, and claim their finds after returning to their usual game mode.

The story is the Emberwell: deep pressure below the island carries forgotten supplies through sulfur vents. Players keep the unstable vents moving by running around the arena, then return to their normal game world to claim what the Emberwell recovered.

The jar installs in dormant mode with `enabled: false`. Paper still shows it green in `/plugins`, while `/dropparty debug enable true` activates the complete feature after staff have reviewed the world, party definitions, vents, loot pools, and permissions.

## How Players Use It

Available features include:

### Player Experience

- A light-blue `/dropparty` schedule GUI with active-party glint and detail pages for story, timing, loot, rules, and travel.
- CMI-backed travel to the active DropParty arena.
- Natural sulfur-geyser effects and special item eruptions.
- Movement-based participation that prevents idling directly over one vent.
- A personal event collection that lets every game mode participate; `/dropparty claim` moves the finds after leaving the party world, while items that do not fit remain stored.
- Personal totals, unique geysers, parties joined, fastest pickup, and top-collector boards.
- Short, staff-thrown mini DropParties during other events.

The main GUI uses the shared hardened GUI service. The bottom-left head shows the viewer's stored collection and stats, the center controls provide navigation/help, the compass returns to `/menu`, and the bottom-right barrier closes the inventory.

## Commands

```text
/dropparty
/dropparty menu [page]
/dropparty status
/dropparty claim
/dropparty stats
/dropparty top [page]
/dropparty info
/dropparty help
```

## Event Behavior

A full DropParty has three runtime phases:

1. `idle`: no party is running.
2. `countdown`: a scheduled or manual party is announced and shown through titles and a boss bar.
3. `active`: valid loaded geysers erupt until the configured duration ends.

Manual countdowns are intentionally limited to `0`, `15`, `30`, or `60` minutes. A definition may omit `scheduled-at` and remain a reusable staff-triggered party. Scheduled definitions can begin automatically when `schedule.auto-start` is true.

An active vent still has to match the configured structure. Saving coordinates alone is not sufficient. Unloaded chunks are skipped; DropParty never loads or generates terrain just to validate or erupt a vent.

Default recognized structure:

- vent block: `MAGMA_BLOCK`
- base directly below: `BEDROCK`
- nearby marker within the configured radius: `SULFUR`
- nearby fluid within the configured radius: `WATER`

These material names are config-driven for Paper 26.2. A practical build can place bedrock below a magma vent, then use the new sulfur and water blocks as visible parts of the geyser.

## Collection And Anti-Idle Safety

Every spawned item entity receives namespaced PDC identity for the party, geyser, and spawn time. Hoppers and mobs cannot collect tagged items. A player pickup is cancelled until all of these checks pass:

- the player has `onembcmi.dropparty.join`
- the player is in Survival or Adventure mode
- a full-party drop still belongs to the active party
- the player is inside the configured arena radius
- the movement window shows enough recent travel
- that entity is not already being processed
- the exact item payload can be atomically appended to the player's durable vault

Only after the vault save succeeds is the physical entity removed. If storage fails, the entity stays in the arena and the player is told to retry or contact staff.

Tagged entities cannot merge with ordinary items, are protected from environmental damage for their short configured lifetime, and are deliberately non-persistent. A restart never saves an event prop back into the world: collected value persists only in the durable vault, which closes the crash window between a successful vault write and entity removal.

Claims use a fail-closed reservation:

1. Vault items move into a durable pending claim.
2. The claim is marked `delivery-attempted`.
3. Items are added to the player's current inventory.
4. Anything that did not fit is returned to the vault.
5. The claim receipt is finalized.

A crash in the small delivery window leaves an unresolved receipt instead of silently reissuing items. Staff must inspect what the player received, then choose `refund` or `finalize`. `refund` must not be used when the inventory delivery already happened.

Manual claims also pass the shared reward-delivery guard. If AutoSell is active, the player is asked to turn it off before DropParty moves items into the normal inventory.

## Admin Setup

### 1. Build and load the world

Create or import a world named `dropparty`. Build the arrival point, arena, land/water/lava/jungle areas, and recognizable geyser structures. Keep intended gameplay inside `world.arena-radius`.

DropParty does not create the world or terrain. It only operates in a loaded world whose name matches `world.name`.

### 2. Activate the dormant feature for setup

```text
/dropparty debug enable true
/dropparty admin debug true
/dropparty admin status
```

The first command changes the feature lifecycle from dormant to active. The second turns on date-independent manual testing. Debug mode never bypasses permissions, valid vent structures, loot validation, movement requirements, arena bounds, vault persistence, or claim receipts.

### 3. Register vents

Stand with the magma vent directly under your feet:

```text
/dropparty admin geyser add center_north
```

Or scan only currently loaded blocks around you:

```text
/dropparty admin geyser scan 32
/dropparty admin geyser list
/dropparty admin geyser validate
```

The scan is bounded to 64 blocks, checks a narrow vertical window, skips unloaded chunks, and saves all discoveries in one durable update.

### 4. Review loot

The generated `standard` pool contains ordinary survival supplies. Review it with:

```text
/dropparty admin loot list standard
```

To capture an exact custom item, hold it and run:

```text
/dropparty admin loot add <pool> <id> <weight> [minimum] [maximum]
```

Example:

```text
/dropparty admin loot add summer rare_shell 5 1 1
```

The item is not consumed. Its serialized ItemStack preserves PDC, data components, names, lore, enchantments, and third-party metadata.

Both the player detail GUI and `/dropparty admin loot list <pool>` show the approximate weighted chance for each visible entry. For example, a spawner entry with weight `1` in a pool whose total weight is `100` is displayed as approximately `1.00%`.

Normally unobtainable or technical materials are denied. Deliberate exceptions must be listed in `loot.validation.explicit-exceptions`. `SPAWNER` is the default reviewed exception so staff can build a separate, very-low-weight rare pool entry; spawners are never part of the generated standard pool.

### 5. Create and edit a party

```text
/dropparty admin create summer_fortune Summer Fortune
/dropparty admin set summer_fortune story The Emberwell has awakened for the summer festival.
/dropparty admin set summer_fortune location
/dropparty admin set summer_fortune duration 20
/dropparty admin set summer_fortune pool standard
/dropparty admin set summer_fortune schedule none
/dropparty admin set summer_fortune enabled true
```

`location` uses the in-game sender's current position. Scheduled times use ISO-8601 instants, for example:

```text
/dropparty admin set summer_fortune schedule 2026-08-01T18:00:00Z
```

The admin GUI supports party selection, start-now and 15/30/60-minute countdowns, stop, enable/disable, expire/reactivate, current-location updates, mini-flare creation, and confirmed deletion. Free-form display names, stories, and timestamps use commands so the GUI never pretends to be a text editor.

### 6. Run preflight and test

```text
/dropparty admin status
/dropparty admin geyser validate
/dropparty admin start summer_fortune 0
```

Start preflight requires:

- a non-expired definition
- the configured DropParty world loaded
- a non-empty selected loot pool
- at least one registered, structurally valid, loaded geyser
- an enabled party, unless isolated debug mode is active

Test movement rejection, successful pickup, `/dropparty claim` outside the event world, a full inventory, AutoSell protection, reconnects, and a server restart.

### 7. Prepare production

```text
/dropparty admin stop
/dropparty admin debug false
/dropparty admin set summer_fortune schedule <production ISO instant>
/dropparty admin set summer_fortune enabled true
/dropparty admin reload
/dropparty admin status
```

To keep the seasonal feature installed but unavailable between seasons:

```text
/dropparty debug enable false
```

The plugin remains loaded and green while gameplay listeners, tasks, GUIs, placeholders, and hooks are dormant.

## Party Administration

```text
/dropparty admin
/dropparty admin menu [page]
/dropparty admin status
/dropparty admin create <id> <display name>
/dropparty admin set <id> display <name>
/dropparty admin set <id> story <text>
/dropparty admin set <id> schedule <ISO instant|none>
/dropparty admin set <id> duration <minutes>
/dropparty admin set <id> pool <pool>
/dropparty admin set <id> location
/dropparty admin set <id> enabled <true|false>
/dropparty admin start <id> <0|15|30|60>
/dropparty admin stop
/dropparty admin expire <id>
/dropparty admin reactivate <id>
/dropparty admin delete <id> confirm
/dropparty admin reload
```

Expired definitions remain in `parties.yml` but leave the public schedule. Reactivating also enables the definition. Deletion is blocked while the definition is active and requires `confirm`.

## Mini DropParty

Give a staff member a throwable flare:

```text
/dropparty admin mini give
/dropparty admin mini give <player> [seconds] [pool]
```

Right-click launches a marked snowball. Its landing point becomes a temporary virtual vent:

- no blocks are placed, broken, replaced, or ignited
- the world does not have to be the dedicated DropParty world
- particles, sounds, and approved loot spawn inside the configured radius
- the same PDC identity, anti-idle checks, durable vault, claim safety, and item lifetime apply
- duration is bounded from 15 through 300 seconds

The default is a 60-second mini party using the `standard` pool.

## Recovery

```text
/dropparty admin vault inspect <player>
/dropparty admin vault recover <player> refund
/dropparty admin vault recover <player> finalize
```

Use `inspect` first. If delivery never reached the inventory, `refund` returns the reserved exact items to the vault. If delivery did reach the inventory, `finalize` closes the receipt without issuing anything again.

Primary files use temporary writes, atomic replacement, validated backups, and quarantine behavior through the shared durable YAML store. A malformed profile is never treated as empty and is never overwritten by a later normal save.

## Permissions

Player nodes default true:

```text
onembcmi.dropparty.use
onembcmi.dropparty.join
onembcmi.dropparty.claim
onembcmi.dropparty.stats
```

Staff nodes default false:

```text
onembcmi.dropparty.admin
onembcmi.dropparty.admin.menu
onembcmi.dropparty.admin.edit
onembcmi.dropparty.admin.start
onembcmi.dropparty.admin.geyser
onembcmi.dropparty.admin.loot
onembcmi.dropparty.admin.mini
onembcmi.dropparty.admin.recovery
onembcmi.dropparty.admin.reload
onembcmi.dropparty.admin.debug
```

The parent grants all children. Direct console is trusted for non-GUI staff commands.

## Placeholders

```text
%onembcmi_dropparty_active%
%onembcmi_dropparty_name%
%onembcmi_dropparty_time_left%
%onembcmi_dropparty_collected%
%onembcmi_dropparty_vault_items%
```

Offline player-specific values return `0`; vault/stat caches are populated for online players.

## Configuration And Data

```text
plugins/1MB-CMIAPI/DropParty/config.yml
plugins/1MB-CMIAPI/DropParty/parties.yml
plugins/1MB-CMIAPI/DropParty/geysers.yml
plugins/1MB-CMIAPI/DropParty/loot.yml
plugins/1MB-CMIAPI/DropParty/state.yml
plugins/1MB-CMIAPI/DropParty/vaults/<uuid>.yml
plugins/1MB-CMIAPI/DropParty/vaults/<uuid>.yml.backup
plugins/1MB-CMIAPI/DropParty/vaults/quarantine/
```

Important config groups:

- `world.*`: dedicated world, arena radius, and claim-world behavior
- `schedule.*`: automatic schedule activation and announcement lead time
- `event.*`: eruption timing, special frequency, drop count, lifetime, titles, boss bar, and holograms
- `anti-idle.*`: movement window, required distance, and feedback cooldown
- `geyser.structure.*`: exact recognized structure materials and marker search radius
- `loot.validation.*`: deliberately reviewed technical-item exceptions
- `mini.*`: duration, radius, interval, and default pool
- `gui.*`: light-blue frame and `/menu` return command

## Integrations

CMI:

- exact console `cmi tppos -p:<player> world;x;y;z;yaw;pitch` travel
- normal server `/menu` return path

CMILib and 1MB-CMIAPI-Lib:

- feature registry, lifecycle, metadata, messages, config comments, permissions, placeholders, safe player output, shared AutoSell reward guard, hardened GUI sessions, durable operations, and debug pages

Paper 26.2:

- custom `InventoryHolder` GUI identity through `GuiService`
- entity and item PDC identity
- cancellable pickup/hopper events
- `TextDisplay` vent holograms
- particles, sounds, titles, Adventure boss bars, projectiles, world/chunk checks, and synchronous world access

No NMS or reflective server internals are used.

## Security Notes

- Full parties operate only in the configured world and arena radius.
- Mini parties are explicitly staff-created and non-destructive.
- Vent scans are bounded and never load chunks.
- Loot is an allowlist of exact captured entries, not a random `Material` sweep.
- Technical items require explicit config review.
- Third-party metadata is preserved rather than stripped.
- Tagged drops cannot enter hoppers or mob inventories.
- Tagged drops cannot merge with unrelated item entities and are never persisted across a server restart.
- Pickup removes the entity only after durable storage succeeds.
- Claims reserve before mutation and retain an inspectable unresolved receipt after failures.
- GUI actions re-read authoritative definitions and runtime state at click time.
- Shared GUI handling blocks shift, hotbar, drag, double-click, creative, stale-session, cross-player, and rapid-repeat paths.
- AutoSell must be safe before manual vault delivery.
- Blocking vault and leaderboard filesystem work runs on a dedicated single-thread executor and returns to the main thread before Bukkit inventory/entity access.

## Build And Target

```text
jar: 1MB-CMIAPI-DropParty-v1.0.2-569-j25-26.2.jar
Java target: 25
Paper target: 26.2 stable build 84 or newer
```

[Documentation index](README.md)
