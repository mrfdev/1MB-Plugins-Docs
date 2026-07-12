# EventRecorder

## Purpose

EventRecorder is a generic developer/testing plugin for learning CMI runtime behavior. It records selected CMI events with readable fields so future feature plugins can be designed from observed behavior instead of guesses.

This plugin is intended for test servers, not normal production gameplay.

The main harness command is `/cmirecorder`. The older `/cmievents` command remains as a compatibility alias.

## Feature Ideas

- Record selected CMI custom events.
- Optionally record every discovered CMI event class through the generic `all-cmi` bucket.
- Record selected CMILib and Paper/Bukkit logger lines when explicitly enabled.
- Support per-event enable/disable.
- Show a recent event buffer in chat or console.
- Dump event records to a debug file.
- List known event groups and show whether each group is currently recorded.
- Filter recent output by event id and paginate longer buffers.
- Search recent records by strict safe text.
- Inspect a single recent record by sequence number.
- Show total and recent counts by event id.
- Include event name, timestamp, player/user, cancellation state, and safe public fields.
- Add redaction rules for sensitive data.
- Support cache cleanup for recorded event buffers.

## Commands

```text
/cmirecorder
/cmirecorder status
/cmirecorder events [page]
/cmirecorder on <event>
/cmirecorder on all
/cmirecorder off <event>
/cmirecorder off all
/cmirecorder recent [event|all] [page]
/cmirecorder stats [event|all]
/cmirecorder inspect <sequence>
/cmirecorder find <text> [page]
/cmirecorder clear [event|all]
/cmirecorder dump [event|all]
/cmirecorder reload

# Compatibility alias:
/cmievents
/cmievents status
/cmievents events [page]
/cmievents on <event>
/cmievents on all
/cmievents off <event>
/cmievents off all
/cmievents recent [event|all] [page]
/cmievents stats [event|all]
/cmievents inspect <sequence>
/cmievents find <text> [page]
/cmievents clear [event|all]
/cmievents dump [event|all]
/cmievents reload
```

Useful examples:

```text
/cmirecorder events
/cmirecorder recent all 2
/cmirecorder recent afk
/cmirecorder stats warp
/cmirecorder inspect 1
/cmirecorder find warp
/cmirecorder on teleport
/cmirecorder on all-cmi
/cmirecorder on cmilib-log
/cmirecorder on paper-log
/cmirecorder off console
/cmirecorder dump all
```

Global library examples:

```text
/1mbcmi debug plugin eventrecorder
/1mbcmi debug plugin eventrecorder all
/1mbcmi debug clean cache plugin eventrecorder
/1mbcmi config eventrecorder
/1mbcmi config set eventrecorder recent.max 500
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.eventrecorder.use
onembcmi.eventrecorder.view
onembcmi.eventrecorder.record
onembcmi.eventrecorder.dump
onembcmi.eventrecorder.admin
onembcmi.eventrecorder.admin.reload
```

## Placeholders

```text
%onembcmi_eventrecorder.enabled%
%onembcmi_eventrecorder.recording%
%onembcmi_eventrecorder.recent.count%
%onembcmi_eventrecorder.total.count%
%onembcmi_eventrecorder.active.count%
%onembcmi_eventrecorder.last.event%
%onembcmi_eventrecorder.last.sequence%
%onembcmi_eventrecorder.last.class%
%onembcmi_eventrecorder.last.cancelled%
%onembcmi_eventrecorder.last.async%
%onembcmi_eventrecorder.last.detail%
%onembcmi_eventrecorder.recent.warp.count%
%onembcmi_eventrecorder.total.warp.count%
%onembcmi_eventrecorder.cache.size%
```

## Event Groups

EventRecorder currently groups supported CMI events into these ids:

```text
afk
all-cmi
armor
chat-filter
cheque
cmilib-log
config
console
economy
event-command
home
jail
kit
moderation
nickname
paper-log
portal
staff-message
teleport
teleport-request
vanish
warp
warning
```

Use `/cmirecorder events` in game or console to see short descriptions and on/off state. Use `all-cmi` during focused test windows when you want a broad runtime discovery pass across every CMI event class the harness can discover from the installed CMI jar.

## Config

Important config paths:

```text
enabled
debug
recent.max
detail.max-length
output.recent-per-page
output.events-per-page
log-to-cache.enabled
log-to-cache.file
log-capture.enabled
record.events
```

## CMI / CMILib Usage

CMI-API:

- dynamic discovery of CMI event classes in `com.Zrips.CMI.events`
- AFK events
- armor change events
- balance and sell events
- ban, unban, kick, IP ban, and IP unban events
- chat filter events
- cheque events
- CMI async console message events with redacted previews
- config reload events
- event action command events
- home and kit events
- nickname events
- portal events
- vanish events
- staff message events
- teleport, warp, portal, warning, jail, balance, kit, armor, and combat events as recording targets

CMILib:

- shared debug output
- optional java logger capture through the `cmilib-log` event bucket
- optional GUI later for event selection

CMI:

- CMI is the runtime source of these events. EventRecorder should never fake or fire CMI events.

Paper:

- safe event listeners
- careful async handling
- optional Paper/Bukkit java logger capture through the `paper-log` event bucket
- file output only through controlled debug paths

## Safety

Do not record raw private chat, private messages, IP addresses, or sensitive player data by default. Add redaction before broadening event fields.

## Shared Library Usage

EventRecorder uses `1MB-CMIAPI-LIB` for feature registration, config-backed recording targets, translation defaults, permission checks, tab filtering, and global debug/cache/config commands.

[Plugin index](README.md)
