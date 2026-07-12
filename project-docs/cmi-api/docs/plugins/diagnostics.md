# Diagnostics

## Purpose

Diagnostics is removable owner tooling for live server investigations.

It is not a player feature. It is meant for short periods where we need better evidence than `lost connection: Disconnected` or a vague client-side message. Drop the jar in, restart, reproduce the issue, then share the generated log with Codex or staff for review. When the investigation is over, the jar and `plugins/1MB-CMIAPI/Diagnostics/` folder can be removed again.

The first probe is `debug-disconnected`, built for generic disconnects, AFK disconnect reports, CMI AFK transitions, protocol bridge clues, chat/component serialization clues, item metadata clues, and shutdown/restart edge cases.

## Features

- Records player joins, quits, Bukkit kick events, CMI kick events, CMI AFK enter/leave/kick events, and enough context to tell whether a disconnect had a kick event or was just a generic quit.
- Tracks per-player recent command context, block movement, interactions, open inventory title, teleports, world changes, damage, AFK state, and join duration.
- Snapshots player state at quit: world, location, ping, address redacted by default, game mode, health, food, flight flags, sleep state, open inventory, CMI AFK state, and tracked AFK state.
- Adds packet-adjacent context when available: client brand, locale, client view distance, Paper protocol version, ViaVersion player/server protocol data, Floodgate Bedrock player data, Geyser connection data, and relevant bridge/plugin versions.
- Adds a compact inventory packet summary for serialization suspects: held item, offhand, armor, selected slot, non-empty slot count, metadata-heavy slot count, and a capped list of items with display names, lore, enchantments, custom model data, PDC keys, or non-basic meta.
- Snapshots nearby entity counts, sampled permission nodes, sampled plugin versions, online count, memory, Java, Paper/Bukkit version, TPS, and MSPT when the server exposes them.
- Keeps a small in-memory server-log ring buffer. Disconnect records include recent log lines before the quit and append a short after-context a few seconds later.
- Writes timestamped log files directly under `plugins/1MB-CMIAPI/Diagnostics/`, plus `disconnected-latest.log` for the newest run.
- Provides `/_diagnostics dump [player]` for a point-in-time support snapshot even when nobody disconnected.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.
- Uses one command only: `/_diagnostics`. There are no command aliases.

## Commands

```text
/_diagnostics status
/_diagnostics recent [page]
/_diagnostics files [page]
/_diagnostics dump [player]
/_diagnostics reload
/_diagnostics debug
/_diagnostics debug all
```

Useful examples:

```text
/_diagnostics status
/_diagnostics recent
/_diagnostics files
/_diagnostics dump
/_diagnostics dump mrfloris
/_diagnostics reload
/_diagnostics debug config
/_diagnostics debug set config debug-disconnected.enabled false
```

Global library examples:

```text
/1mbcmi debug plugin diagnostics
/1mbcmi debug plugin diagnostics commands
/1mbcmi debug plugin diagnostics permissions
/1mbcmi debug plugin diagnostics placeholders
/1mbcmi debug plugin diagnostics config
/1mbcmi debug plugin diagnostics all
/1mbcmi config diagnostics
/1mbcmi config set diagnostics debug-disconnected.enabled false
```

## Permissions

```text
onembcmi.diagnostics.use
onembcmi.diagnostics.view
onembcmi.diagnostics.dump
onembcmi.diagnostics.admin
onembcmi.diagnostics.admin.reload
```

`use` allows `/_diagnostics status`. `view` allows recent summaries and file listings. `dump` writes point-in-time snapshots. `admin` allows shared debug pages. `admin.reload` reloads config and translations.

Normal players should not receive Diagnostics permissions. Operator status alone does not unlock the command because all Diagnostics permission defaults are `false`.

Console can run `_diagnostics` commands without a permission lock. In-game players must have an explicit Diagnostics permission node; otherwise even help, info, and tab completion are denied.

## Placeholders

```text
%onembcmi_diagnostics.enabled%
%onembcmi_diagnostics.debug_disconnected.enabled%
%onembcmi_diagnostics.disconnects.recent.count%
%onembcmi_diagnostics.disconnects.last.player%
%onembcmi_diagnostics.disconnects.last.reason%
%onembcmi_diagnostics.log.file%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/Diagnostics/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
output.page-size: 8
output.recent-memory: 200
privacy.redact-addresses: true
privacy.redact-sensitive-commands: true
logs.directory: "."
logs.latest-file: disconnected-latest.log
logs.max-files: 30
debug-disconnected.enabled: true
debug-disconnected.log-prefix: disconnected
debug-disconnected.write-join-events: true
debug-disconnected.write-afk-events: true
debug-disconnected.write-kick-events: true
debug-disconnected.write-quit-events: true
debug-disconnected.track-commands: true
debug-disconnected.track-movement: true
debug-disconnected.track-interactions: true
debug-disconnected.track-inventory: true
debug-disconnected.track-damage: true
debug-disconnected.include-connection-stack: true
debug-disconnected.include-inventory-summary: true
debug-disconnected.inventory-summary.max-suspicious-items: 12
debug-disconnected.include-nearby-entities: true
debug-disconnected.nearby-radius: 16
debug-disconnected.include-permissions: true
debug-disconnected.include-plugin-versions: true
debug-disconnected.server-log-context.enabled: true
debug-disconnected.server-log-context.max-lines: 200
debug-disconnected.server-log-context.lookback-seconds: 30
debug-disconnected.server-log-context.post-delay-ticks: 80
debug-disconnected.command.max-length: 140
```

`privacy.redact-addresses` should normally stay true. It hides IP-like values while still recording useful timing, ping, location, and state.

`debug-disconnected.enabled` is the main switch for this probe. Set it false when the jar should stay loaded but stop recording disconnect evidence.

`debug-disconnected.include-connection-stack` adds packet-adjacent clues without hard dependencies. It tries to read ViaVersion, Floodgate, and Geyser APIs by reflection, and falls back to `unavailable` when a plugin or API method is not present.

`debug-disconnected.include-inventory-summary` adds only compact item metadata summaries. It does not dump full inventory contents, but it can reveal patterns such as every affected player holding a custom book, renamed item, lore-heavy reward, skull, shield, map, or PDC-marked item.

`logs.directory: "."` means files are written directly under `plugins/1MB-CMIAPI/Diagnostics/`.

## Log Files

Diagnostics writes files such as:

```text
plugins/1MB-CMIAPI/Diagnostics/disconnected-20260708-103012.log
plugins/1MB-CMIAPI/Diagnostics/disconnected-latest.log
plugins/1MB-CMIAPI/Diagnostics/diagnostics-snapshot-2026-07-08T08-30-12.123Z.log
```

For a disconnect investigation, grab `disconnected-latest.log` first. It contains the same active run as the timestamped file and is easiest to find after a restart.

Each quit record includes:

- whether a Bukkit kick event happened
- whether a CMI kick event happened
- the player's AFK state and tracked AFK history
- client brand, locale, view distance, and protocol bridge context when available
- ViaVersion, ViaBackwards, Geyser, Floodgate, ProtocolLib, packet events, CMI, CMILib, and DiscordSRV plugin states
- compact held/offhand/armor/inventory metadata summaries for item serialization suspects
- last command, movement, inventory, interaction, teleport, world change, and damage context
- server state, plugin versions, sampled permissions, and nearby entity counts
- recent server log lines before the quit
- a delayed server-log after-context section

## Data Writes

Runtime config and logs live under:

```text
plugins/1MB-CMIAPI/Diagnostics/
```

Translations live under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/translations/diagnostics.yml
```

The plugin does not write playerdata. It keeps only short in-memory recent summaries and plain support logs.

## Safety Notes

- Diagnostics is owner/senior-admin tooling. Do not grant it to normal players.
- The plugin has no aliases; use `/_diagnostics` in-game or `_diagnostics` from console.
- Address redaction is enabled by default.
- Sensitive command roots such as `/login`, `/register`, and `/password` are redacted by default.
- Movement tracking only remembers last block movement; it does not write every movement to disk.
- Connection stack details use reflection, so missing or incompatible ViaVersion/Geyser/Floodgate APIs are logged as unavailable instead of breaking Diagnostics.
- Inventory summaries are capped and metadata-focused. They are meant to identify likely serialization suspects, not to archive player inventories.
- The server-log context is an in-memory ring buffer, not a full console mirror.
- The plugin can be removed between restarts once the investigation is done.

## CMI and Paper Usage

Diagnostics listens to CMI AFK and CMI kick events, reads CMI AFK state through `CMIUser`, and uses Paper/Bukkit player, world, inventory, kick, quit, teleport, and damage events. TPS/MSPT fields are reflected so the plugin can keep working when Paper exposes those details differently between server versions.

ViaVersion, Floodgate, and Geyser details are reflected at runtime. Diagnostics does not depend on those APIs at compile time and does not intercept packets. It only snapshots what those plugins expose about the online player at quit or dump time.
