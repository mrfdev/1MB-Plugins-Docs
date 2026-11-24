---
title: "StaffCenter Administration"
description: "Setup, permissions, recovery, and operation of StaffCenter."
---

StaffCenter is the single `1MB-Lib-StaffCenter` JAR for the staff dashboard, WarningLens moderation review, and Profile identity review. It uses the `1MB-CMIAPI-StaffCenter` Paper identity and shares the CMI and CMILib integrations across the three tools.

| Tool | Start here | Scope |
| --- | --- | --- |
| StaffCenter | `/staffcenter inspect <player>` | CMI-backed dashboard with permission-gated moderation, balance, locations, and homes. |
| [WarningLens](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/warninglens.md) | `/staffcenter warnings inspect <player>` | Warning counts, punishment context, and recent observed moderation events. |
| [Profile](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/profile.md) | `/staffcenter profile <target>` | Java and Bedrock identity context, known names, staff notes, and Markdown reports. |

The dashboard and WarningLens inspect CMI state without issuing punishments. Authorized Profile users can record staff notes and other review context in shared playerdata.

## Dashboard Features

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
/staffcenter modules
/staffcenter info
/staffcenter help
/staffcenter dashboard <action>
/staffcenter warnings <action>
/staffcenter profile <action>
/staffcenter admin module <dashboard|warnings|profile> <true|false>
/staffcenter admin reload [dashboard|warnings|profile]
```

The `<player>` shortcut prints the text dashboard. Use `/staffcenter inspect <player>` for a player whose name matches a subcommand. `/staffcenter reload` reloads the dashboard, and `/staffcenter admin reload` reloads the host and all modules. The compatible command roots `/warninglens`, `/wlens`, and `/profile` still work with their original module permissions.

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
/staffcenter modules
/staffcenter warnings recent warn
/staffcenter profile history Notch
```

Global library examples:

```text
/1mblib debug plugin staffcenter
/1mblib config staffcenter
/staffcenter dashboard debug config
/1mblib translations reload
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

`onembcmi.staffcenter.use` grants access to `/staffcenter modules`. `onembcmi.staffcenter.admin` grants the host module switches and admin reload. Routed commands keep the permissions documented by [WarningLens](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/warninglens.md#permissions) and [Profile](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/profile.md#permissions), including separate grants for warning reasons, IP signals, public ban-list signals, and profile edits.

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

WarningLens and Profile keep the `%onembcmi_warninglens.*%` and `%onembcmi_profile.*%` placeholder namespaces.

## Config

Host controls in `plugins/1MB-CMIAPI/StaffCenter/host.yml`:

```text
enabled
modules.staffcenter.enabled
modules.warninglens.enabled
modules.profile.enabled
```

Dashboard settings stay in `plugins/1MB-CMIAPI/StaffCenter/config.yml`:

```text
summary.show-balance
summary.show-warnings
summary.show-playtime
locations.enabled
homes.max
recent.max
output.recent-per-page
dump.max-records
```

On migration, each missing module switch takes its value from the corresponding legacy `enabled` setting when present. On a fresh installation the host and Profile start active, and the dashboard and WarningLens start dormant. Use `/staffcenter modules` to check the configured and runtime states, then `/staffcenter admin module <dashboard|warnings|profile> <true|false>` to change one switch. Use `/staffcenter admin reload <dashboard|warnings|profile>` after editing that module's retained configuration. `/staffcenter debug reload` reloads the host and its modules, and `/staffcenter dashboard debug reload` reloads just the dashboard. `/1mblib config staffcenter` shows host controls. `/staffcenter dashboard debug config` shows the dashboard settings.

## Upgrade and Data

Stop Paper, back up the existing suite and `plugins/1MB-CMIAPI/`, and install the complete tested suite containing `1MB-Lib-StaffCenter`. Move any standalone Profile and WarningLens JARs out of the plugin load path before restarting.

| Data | Location relative to `plugins/1MB-CMIAPI/` |
| --- | --- |
| Host and module switches | `StaffCenter/host.yml` |
| Dashboard settings | `StaffCenter/config.yml` |
| Module settings | `WarningLens/config.yml`, `Profile/config.yml` |
| Translations | `CMIAPILIB/translations/staffcenter.yml`, `CMIAPILIB/translations/warninglens.yml`, `CMIAPILIB/translations/profile.yml` |
| Dumps and exports | `CMIAPILIB/cache/plugins/staffcenter/`, `CMIAPILIB/cache/plugins/warninglens/`, `CMIAPILIB/cache/plugins/profile/` |
| Profile notes and identity history | `CMIAPILIB/playerdata/<uuid>.yml` under `profile.*` |

Keep these directories in place. Dashboard lookup history and recent observed WarningLens events are kept in memory during the server session. Existing exports remain on disk. See the [installation guide](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/installation.md#upgrade-to-the-combined-staffcenter) for the rollout and rollback steps.

## CMI / CMILib Usage

CMI-API:

- `CMIUser`
- player manager lookups
- warning, jail, vanish, AFK, economy, rank, playtime, and home data where exposed safely

CMILib:

- Required alongside CMI for the shared integration stack.

CMI:

- CMI remains the source of truth for player status, moderation state, homes, warnings, and economy.

Paper:

- command sender support for player and console
- modern text output

## Safety

Review and report access should stay limited to staff with the specific permissions required for those actions. Keep exported profiles and moderation history in restricted staff storage.

## Shared Library Usage

StaffCenter uses `1MB-CMIAPI-LIB` for feature registration, config-backed display toggles, translation defaults, permission checks, tab filtering, and global debug/config commands.

[Plugin index](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/README.md)
