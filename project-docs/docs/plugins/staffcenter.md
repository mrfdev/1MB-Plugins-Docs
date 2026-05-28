# StaffCenter

## Purpose

StaffCenter is a read-only staff and moderation dashboard. The first version should avoid punishment actions and focus on safely displaying useful CMI-backed player context in one place.

This makes it a good early plugin because it exercises CMIUser lookups, permissions, message formatting, and GUI/debug conventions without changing player state.

## Feature Ideas

- Open a read-only staff dashboard for a player.
- Split output into summary, moderation, economy, locations, homes, or all sections.
- Support `/staffcenter <player>` as a quick summary shortcut.
- Show online/offline status, UUID, current name, and last known name data.
- Show CMI AFK state, vanish state, jail state, mute/shadow mute state, balance, warning count, playtime, and rank where available.
- Show last known location and death location if permission allows.
- Show recent StaffCenter lookups during this server runtime.
- Filter recent lookup history by inspected section.
- Show total and recent lookup counts by section.
- Search recent lookup audit entries with strict input.
- Dump lookup audit records to the StaffCenter cache folder for support review.
- Show plugin hook status: CMI, CMILib, PlaceholderAPI, LuckPerms, Vault.
- Support a text output mode for console use.
- Add action buttons later, but keep version 1 read-only.

## Commands

```text
/staffcenter <player>
/staffcenter <player> [summary|moderation|economy|locations|homes|all]
/staffcenter status
/staffcenter hooks
/staffcenter inspect <player> [summary|moderation|economy|locations|homes|all]
/staffcenter recent [section|all] [page]
/staffcenter stats [section|all]
/staffcenter find <text> [page]
/staffcenter dump [section|all]
/staffcenter reload
```

Version 1 is read-only. The `<player>` command prints a text summary instead of opening a GUI.

Useful examples:

```text
/staffcenter Notch
/staffcenter inspect Notch all
/staffcenter inspect Notch moderation
/staffcenter inspect Notch locations
/staffcenter recent
/staffcenter stats
/staffcenter find Notch
/staffcenter dump all
```

Global library examples:

```text
/1mbcmi debug plugin staffcenter
/1mbcmi config staffcenter
/1mbcmi config set staffcenter summary.show-balance false
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.staffcenter.use
onembcmi.staffcenter.inspect
onembcmi.staffcenter.view.location
onembcmi.staffcenter.view.economy
onembcmi.staffcenter.view.moderation
onembcmi.staffcenter.view.homes
onembcmi.staffcenter.admin
onembcmi.staffcenter.admin.reload
```

## Placeholders

```text
%onembcmi_staffcenter.enabled%
%onembcmi_staffcenter.last_lookup%
%onembcmi_staffcenter.last_lookup_online%
%onembcmi_staffcenter.last_lookup_section%
%onembcmi_staffcenter.last_lookup_by%
%onembcmi_staffcenter.recent.count%
%onembcmi_staffcenter.total.count%
%onembcmi_staffcenter.recent.summary.count%
%onembcmi_staffcenter.total.summary.count%
%onembcmi_staffcenter.cache.size%
```

StaffCenter is mostly a command/GUI plugin, so feature placeholders should stay minimal unless a real display need appears.

## Config

Important config paths:

```text
enabled
summary.show-balance
summary.show-warnings
summary.show-playtime
locations.enabled
homes.max
recent.max
output.recent-per-page
dump.max-records
```

## CMI / CMILib Usage

CMI-API:

- `CMIUser`
- player manager lookups
- warning, jail, vanish, AFK, economy, rank, playtime, and home data where exposed safely

CMILib:

- GUI layer, if CMILib GUI is suitable
- otherwise use the shared GUI layer from `1MB-CMIAPI-LIB`
- color/message helpers where appropriate

CMI:

- CMI remains the source of truth for player status, moderation state, homes, warnings, and economy.

Paper:

- command sender support for player and console
- modern text output

## Safety

Version 1 should be read-only. No ban, jail, mute, teleport, economy, inventory, or cleanup actions should be included until the display layer is proven.

## Shared Library Usage

StaffCenter uses `1MB-CMIAPI-LIB` for feature registration, config-backed display toggles, translation defaults, permission checks, tab filtering, and global debug/config commands.

[Plugin index](README.md)
