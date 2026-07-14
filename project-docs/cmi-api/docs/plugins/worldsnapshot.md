# WorldSnapshot

## Purpose

WorldSnapshot is a read-only operational tool for recording what the server thinks each loaded world looks like right now.

It is meant for before-and-after checks when changing gamerules, CMI world-related settings, sleep/night behavior, teleport/respawn behavior, random teleport settings, world limits, or other operational toggles that can be hard to remember later.

The normal workflow is:

```text
/worldsnapshot
# make a test change
/worldsnapshot diff
```

`/worldsnapshot` stores the current state as the baseline. `/worldsnapshot diff` compares the current server state against that baseline without changing the baseline.

## Features

- Captures Paper world settings for each loaded included world.
- Captures all gamerules through Paper's current game-rule registry.
- Captures selected volatile runtime fields such as time, storm, players, and loaded chunks for display.
- Excludes volatile runtime fields from diffs by default so time/weather/player movement does not create noisy diffs.
- Scans selected CMI YAML files for world-related and operational toggle paths.
- Shows a compact world list with environment, difficulty, the animal spawn limit, monster spawning, autosave, and distance settings.
- Shows detailed entries for one world with pagination.
- Compares the current state against the stored baseline.
- Dumps the stored baseline to the shared cache folder.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/worldsnapshot
/worldsnapshot help
/worldsnapshot status
/worldsnapshot capture
/worldsnapshot refresh
/worldsnapshot list [page]
/worldsnapshot world <world> [page]
/worldsnapshot diff [world|all] [page]
/worldsnapshot dump
/worldsnapshot reload
```

Aliases:

```text
/wsnapshot
/wrules
```

Useful examples:

```text
/worldsnapshot
/worldsnapshot status
/worldsnapshot list
/worldsnapshot world spawn
/worldsnapshot diff
/worldsnapshot diff spawn
/worldsnapshot dump
/worldsnapshot reload
```

Global library examples:

```text
/1mbcmi debug plugin worldsnapshot
/1mbcmi debug plugin worldsnapshot commands
/1mbcmi debug plugin worldsnapshot permissions
/1mbcmi debug plugin worldsnapshot placeholders
/1mbcmi debug plugin worldsnapshot config
/1mbcmi debug plugin worldsnapshot all
/1mbcmi config worldsnapshot
/1mbcmi config set worldsnapshot diff.include-volatile-runtime true
/1mbcmi config set worldsnapshot snapshot.include-seed true
```

## Permissions

```text
onembcmi.worldsnapshot.use
onembcmi.worldsnapshot.capture
onembcmi.worldsnapshot.view
onembcmi.worldsnapshot.diff
onembcmi.worldsnapshot.dump
onembcmi.worldsnapshot.admin.reload
```

`use` controls status/help access. `capture` controls baseline capture. `view` controls world list and per-world detail pages. `diff` controls before-and-after comparisons. `dump` controls cache report writing. `admin.reload` reloads config and translations.

## Placeholders

```text
%onembcmi_worldsnapshot.enabled%
%onembcmi_worldsnapshot.worlds.count%
%onembcmi_worldsnapshot.entries.count%
%onembcmi_worldsnapshot.gamerules.count%
%onembcmi_worldsnapshot.cmi.entries.count%
%onembcmi_worldsnapshot.last.reason%
%onembcmi_worldsnapshot.last.time%
%onembcmi_worldsnapshot.last.diffs.count%
%onembcmi_worldsnapshot.cache.size%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/WorldSnapshot/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
capture.on-enable: true
worlds.include: []
worlds.exclude: []
snapshot.include-seed: false
snapshot.include-volatile-runtime: true
gamerules.include: []
gamerules.exclude: []
cmi.enabled: true
cmi.files:
- config.yml
- Settings/Modules.yml
- Settings/Afk.yml
- Settings/Combat.yml
- Settings/DeathMessages.yml
- Settings/EventCommands.yml
- Settings/Homes.yml
- Settings/RandomTeleportations.yml
- Settings/TabList.yml
cmi.path-keywords:
- world
- worlds
- disabledworlds
- mutedworlds
- invulnerabilityperworld
- respawn
- randomteleport
- worldlimits
- worldlimitselytra
- night
- sleep
- pvp
- portal
- nether
- end
- damage
- spawn
- fly
- elytra
diff.include-volatile-runtime: false
diff.max-entries: 120
output.page-size: 8
dump.file: worldsnapshot-report.txt
```

`worlds.include` is empty by default, meaning all loaded worlds are included unless excluded. Add exact world names in lowercase or normal case.

`snapshot.include-seed` is false by default because a world seed can be considered sensitive on some survival servers.

`snapshot.include-volatile-runtime` controls fields that naturally change during play, such as time, storm state, player count, and loaded chunks.

`diff.include-volatile-runtime` is false by default so `/worldsnapshot diff` focuses on actual configuration and rule changes.

## What It Captures

Paper world entries include:

- environment
- difficulty
- the supported monster-spawning flag
- autosave
- view distance
- simulation distance
- min and max height
- spawn location
- optional seed
- world border center, size, warnings, and damage settings
- spawn limits by `SpawnCategory`
- optional volatile runtime values

Gamerule entries are read from Paper's game-rule registry, not from hard-coded legacy names. This should pick up new gamerules as Paper exposes them. If Paper exposes a gamerule key that the running server cannot actually read yet, WorldSnapshot skips that single gamerule instead of failing the whole capture.

CMI entries are read from selected CMI YAML files when CMI is loaded and the file exists. The plugin keeps entries whose path or value looks world-related or operationally relevant based on `cmi.path-keywords`.

## CMI Integration

WorldSnapshot does not write to CMI files and does not call closed-source CMI internals.

It uses CMI as a runtime dependency and reads selected CMI YAML files from CMI's plugin data folder. This lets it surface useful world-related settings such as:

- module toggles like world limits and night speedup
- disabled/muted world lists
- random teleport world sections
- home world limits
- respawn priority sections
- teleport invulnerability per world
- event command sections around world changes

Because this is a read-only config scan, it is safe to remove the jar later without affecting CMI.

## Paper API Usage

WorldSnapshot uses modern Paper/Bukkit world APIs for loaded worlds, world borders, spawn categories, gamerules, and command handling. Animal spawning is represented by `SpawnCategory.ANIMAL` limits because Paper 26.2 no longer maintains the legacy per-world `allow-animals` boolean. It uses `Registry.GAME_RULE` for gamerule discovery rather than deprecated gamerule enumeration.

## Data And Cache

WorldSnapshot stores no playerdata.

Support dumps are written to:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/worldsnapshot/worldsnapshot-report.txt
```

The dump is plain text and contains world names, setting paths, values, and whether an entry is stable or volatile. It avoids CMI database files and security files.

## Safety Notes

- The plugin is read-only.
- It does not execute commands.
- It only reads configured `.yml` files under CMI's own data folder.
- CMI paths with `..`, absolute paths, or non-`.yml` files are rejected.
- World names typed into commands are strictly validated.
- Dynamic text is escaped through shared MiniMessage output helpers.
- The seed is excluded unless `snapshot.include-seed` is explicitly enabled.

## Testing Checklist

```text
/worldsnapshot status
/worldsnapshot
/worldsnapshot list
/worldsnapshot world <world>
/worldsnapshot diff
/worldsnapshot dump
/1mbcmi debug plugin worldsnapshot all
```

To test diff behavior:

```text
/worldsnapshot
/gamerule doDaylightCycle false
/worldsnapshot diff <world>
/gamerule doDaylightCycle true
```

[Back to plugin index](README.md)
