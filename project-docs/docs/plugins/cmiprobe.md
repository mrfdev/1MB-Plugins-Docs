# CMIProbe

## Purpose

CMIProbe is a lightweight test-server probe for Paper templates. It checks whether CMI and CMILib are present, whether selected CMI managers are reachable, whether CMI custom event classes can be discovered, and whether expected commands are registered after a build.

This plugin is intended for centralized and local test templates. It should stay read-only: it does not fake-fire CMI events or execute arbitrary commands.

It also includes a temporary join-state watcher for debugging confusing player state issues such as "new players appear to have god mode", delayed CMI state changes, Bukkit invulnerability, no-damage ticks, high max health, or flight being restored by another plugin.

## Commands

```text
/cmiprobe
/cmiprobe status
/cmiprobe managers [page]
/cmiprobe firecheck [page]
/cmiprobe command <name>
/cmiprobe report
/cmiprobe player <player> [page]
/cmiprobe joinwatch status
/cmiprobe joinwatch on [player|all] [seconds]
/cmiprobe joinwatch off
/cmiprobe joinwatch clear
/cmiprobe reload
```

Useful examples:

```text
/cmiprobe managers
/cmiprobe firecheck
/cmiprobe command cmi
/cmiprobe command 1mbcmi
/cmiprobe command cmirecorder
/cmiprobe report
/cmiprobe player mrfloris
/cmiprobe joinwatch on all 180
/cmiprobe joinwatch on SomePlayer 300
/cmiprobe joinwatch status
/cmiprobe joinwatch off
```

Global library examples:

```text
/1mbcmi debug plugin cmiprobe
/1mbcmi debug plugin cmiprobe all
/1mbcmi debug clean cache plugin cmiprobe --dry-run
/1mbcmi config cmiprobe
/1mbcmi config set cmiprobe output.page-size 15
```

## Permissions

```text
onembcmi.cmiprobe.use
onembcmi.cmiprobe.managers
onembcmi.cmiprobe.firecheck
onembcmi.cmiprobe.command
onembcmi.cmiprobe.report
onembcmi.cmiprobe.player
onembcmi.cmiprobe.joinwatch
onembcmi.cmiprobe.admin
onembcmi.cmiprobe.admin.reload
```

## Placeholders

```text
%onembcmi_cmiprobe.enabled%
%onembcmi_cmiprobe.last.result%
%onembcmi_cmiprobe.managers.ok%
%onembcmi_cmiprobe.managers.total%
%onembcmi_cmiprobe.events.discovered%
%onembcmi_cmiprobe.events.with_listeners%
%onembcmi_cmiprobe.commands.ok%
%onembcmi_cmiprobe.commands.total%
%onembcmi_cmiprobe.last.command%
%onembcmi_cmiprobe.last.command.state%
%onembcmi_cmiprobe.scheduler.runs%
%onembcmi_cmiprobe.joinwatch.active%
%onembcmi_cmiprobe.joinwatch.target%
%onembcmi_cmiprobe.joinwatch.snapshots%
%onembcmi_cmiprobe.cache.size%
```

## Config

Important config paths:

```text
enabled
debug
output.page-size
report.write-file
events.sample-limit
join-watch.enabled
join-watch.log-to-console
join-watch.damage-log
join-watch.default-seconds
join-watch.max-snapshots-per-player
join-watch.sample-ticks
commands.required
managers.required
```

Join-watch examples:

```text
/cmiprobe joinwatch on all 180
```

Records Bukkit and CMI state for every joining player for three minutes. The player should rejoin while the watcher is active.

```text
/cmiprobe joinwatch on mrfloris 300
```

Only records the named player for five minutes.

```text
/cmiprobe player mrfloris
```

Shows the current live state and recent join-watch snapshots. The output includes game mode, CMI god, CMI timed god, Bukkit invulnerability, no-damage ticks, health/max-health, CMI flight state, Bukkit flight state, vanish, and teleport invulnerability.

If `join-watch.damage-log` is true, damage events for watched players are logged at `MONITOR` priority with the final cancelled state. This does not identify the cancelling plugin by name, but it does show whether the player was already CMI god, Bukkit-invulnerable, protected by no-damage ticks, or using unusually high max health.

## CMI / CMILib Usage

CMI-API:

- `CMI.getInstance()` availability
- configured manager getter availability, such as player, command, warp, home, AFK, vanish, warning, jail, economy, teleport, portal, and scheduler managers
- CMI custom event class discovery from the installed CMI jar

CMILib:

- `CMILib.getInstance()` availability
- CMILib log manager availability
- CMILib scheduler implementation availability and a tiny submitted scheduler task

CMI:

- CMI is the runtime source being inspected.
- Probe reports include installed CMI version and manager method results.

Paper:

- Paper command map lookup for command registration checks.
- Bukkit event handler lists for listener-count checks.
- PlayerJoinEvent snapshots for join-state debugging.
- EntityDamageEvent monitor snapshots for damage-cancellation clues.
- Controlled cache file output under the shared CMIProbe cache folder.

## Safety

CMIProbe validates command names before lookup, avoids arbitrary command execution, does not fake-fire CMI events, and writes reports only through the shared feature cache path. The join watcher is read-only: it records player state and damage event status, but it does not change god mode, flight, health, permissions, or player data.

[Plugin index](README.md)
