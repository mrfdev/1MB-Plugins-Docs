# FilterLab

## Purpose

FilterLab is a staff-only test bench for safely simulating CMI `Settings/ChatFilter.yml` rules before relying on them live.

It loads CMI chat filter deny and caps settings, lets staff test sample messages, and shows which rule would match without sending a real chat message or punishing anyone.

## Features

- Reads CMI `Settings/ChatFilter.yml`.
- Shows CMI ChatFilter enabled state, deny rule count, enabled rule count, and caps filter settings.
- Simulates staff-provided text against loaded deny rules.
- Tracks Paper chat, CMI chat filter, and CMI caps filter event counts.
- Lists loaded deny rules with enabled state, group, block type, and regex count.
- Keeps bounded recent local simulations for the current runtime.
- Registers command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/filterlab
/filterlab status
/filterlab test <message>
/filterlab rules [page]
/filterlab recent [page]
/filterlab reload
```

Aliases:

```text
/chatfilterlab
/cfilterlab
```

Useful examples:

```text
/filterlab
/filterlab status
/filterlab test this is a test message
/filterlab rules
/filterlab rules 2
/filterlab recent
/filterlab reload
```

Global library examples:

```text
/1mbcmi debug plugin filterlab
/1mbcmi debug plugin filterlab all
/1mbcmi debug plugin filterlab commands
/1mbcmi debug plugin filterlab permissions
/1mbcmi debug plugin filterlab placeholders
/1mbcmi config filterlab
/1mbcmi config set filterlab test.max-message-length 300
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.filterlab.use
onembcmi.filterlab.test
onembcmi.filterlab.rules
onembcmi.filterlab.admin
onembcmi.filterlab.admin.reload
```

## Placeholders

```text
%onembcmi_filterlab.enabled%
%onembcmi_filterlab.rules.count%
%onembcmi_filterlab.rules.enabled_count%
%onembcmi_filterlab.tests.count%
%onembcmi_filterlab.matches.count%
%onembcmi_filterlab.paper_chat.count%
%onembcmi_filterlab.cmi_filter.count%
%onembcmi_filterlab.cmi_caps.count%
%onembcmi_filterlab.last_tester%
%onembcmi_filterlab.last_result%
%onembcmi_filterlab.cache.size%
```

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
test.max-message-length
rules.max-regex-length
```

## CMI / CMILib Usage

CMI-API:

- Observes `CMIPlayerChatFilterEvent`.
- Observes `CMIPlayerChatFilterCapsEvent`.

CMI:

- Reads `plugins/CMI/Settings/ChatFilter.yml`.
- Uses CMI ChatFilter config as the source of truth for deny and caps settings.
- Does not write CMI config or run CMI commands.

CMILib:

- CMILib remains a required runtime dependency through the CMI stack and shared library.

Paper:

- Observes Paper chat events for runtime counters.
- Uses Paper command, filesystem, YAML, and Adventure MiniMessage APIs.

## Data

FilterLab keeps recent simulations in memory for the current runtime. It does not persist playerdata or change chat-filter config.

## Safety

FilterLab is a simulation tool. It does not send the tested text to public chat, does not cancel chat, does not punish players, and limits test input length before regex checks.

## Shared Library Usage

FilterLab uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
