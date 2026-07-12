# CMIConfig

## Purpose

CMIConfig is a server-owner GUI for carefully toggling selected CMI and CMILib boolean config values without digging through large YAML files during routine maintenance.

The first version focuses on safety: it scans known config files for boolean feature toggles, opens a paginated GUI, requires a confirmation click before writing, creates a timestamped backup, and clearly marks files that may require a full server restart.

## Features

- `/cmiconfig` opens an index GUI for CMI and CMILib config surfaces.
- First page links to CMI `config.yml`, CMI `modules.yml`, selected CMI `Settings/*.yml` files, and CMILib `config.yml` when present.
- Per-file pages show discovered boolean toggles with on/off dye indicators.
- Click a toggle to open a confirmation screen.
- Confirm only, or confirm and run the configured reload command such as `cmi reload`.
- Creates a timestamped backup next to the edited YAML file before writing.
- Uses a targeted line edit so CMI's comments and most formatting are preserved.
- Marks `modules.yml` as restart-recommended because many module changes may not fully apply with `/cmi reload`, even though the GUI can still offer confirm-and-reload.
- Registers command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/cmiconfig
/cmiconfig open
/cmiconfig status
/cmiconfig scan
/cmiconfig reload
```

Global library examples:

```text
/1mbcmi debug plugin cmiconfig
/1mbcmi debug plugin cmiconfig all
/1mbcmi config cmiconfig
/1mbcmi config set cmiconfig scan.include-cmi-settings false
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.cmiconfig.use
onembcmi.cmiconfig.view
onembcmi.cmiconfig.toggle
onembcmi.cmiconfig.reload
onembcmi.cmiconfig.admin
onembcmi.cmiconfig.admin.reload
```

## Placeholders

```text
%onembcmi_cmiconfig.enabled%
%onembcmi_cmiconfig.profiles.count%
%onembcmi_cmiconfig.toggles.count%
%onembcmi_cmiconfig.last.action%
%onembcmi_cmiconfig.cache.size%
```

## CMI / CMILib Usage

CMI:

- CMIConfig discovers CMI's data folder from the loaded CMI plugin.
- It scans `config.yml`, `modules.yml`, and optionally a limited number of files under `Settings/` or `settings/`.
- Confirm and reload runs the configured CMI reload command, defaulting to `cmi reload`, then lets CMI decide what actually reloads.

CMILib:

- CMIConfig discovers CMILib's data folder from the loaded CMILib plugin.
- It scans CMILib `config.yml` when enabled by config.
- Confirm and reload runs the configured CMILib reload command, defaulting to `cmilib reload`.

Paper:

- Paper/Bukkit inventory, command, event, plugin metadata, and YAML APIs are used.
- GUI actions are permission-gated and run on the main server thread.
- GUI click handling cancels all clicks while a CMIConfig inventory is open, including clicks in the player inventory area.
- GUI drag handling cancels inventory drags while a CMIConfig inventory is open.

## Config

Important config paths:

```text
enabled
debug
scan.include-cmi-config
scan.include-cmi-modules
scan.include-cmi-settings
scan.include-cmilib-config
scan.settings-max-files
reload.cmi-command
reload.cmilib-command
backup.enabled
```

## Data

CMIConfig writes no playerdata.

When a toggle is confirmed, it writes a backup beside the edited file:

```text
config.yml.1mb-backup-YYYYMMDD-HHMMSS
```

Then it updates only the targeted boolean line.

## Safety

This plugin is intentionally an owner/admin tool. It does not expose broad YAML editing, arbitrary paths, or free-form command execution. It only lists boolean paths that are present in the parsed YAML and can also be mapped back to a safe inline boolean line in the original file.

The GUI treats every open CMIConfig inventory as read-only except for its registered buttons. Shift-clicks, number-key swaps, offhand swaps, player-inventory clicks, and drag attempts are cancelled so items cannot be moved into or out of the virtual menu.

Close-style actions use a short delayed close instead of closing the inventory from inside the click event.

Use extra care with `modules.yml` and larger CMI systems. The GUI can flip the value, create the backup, and run `cmi reload`, but CMI may still need a full stop/start before some settings truly apply.

[Plugin index](README.md)
