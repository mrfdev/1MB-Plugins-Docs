# Emotes

## Purpose

Emotes gives players a GUI for server emotes that are already implemented as CMI alias-editor commands, such as `/cheer`, `/shrug`, `/freeze`, `/cozy`, and similar custom aliases.

The goal is discoverability. Players can still learn and type the real commands directly, but `/emotes` gives them a searchable menu, clear command tooltips, and an online-player picker for emotes that can optionally or always target another player.

## Features

- Opens a GUI with `/emotes`.
- Shows configured emotes as clickable items.
- Lists emotes in compact paginated chat rows with `/emotes list [page]`.
- Item titles show the exact command shape, such as `/cheer [player]` or `/shrug`.
- Item lore explains what the emote does and whether a target is optional or required.
- Includes a writable-book help item that runs the configured CMI ctext/help command.
- Includes a bottom-left search button that opens a Paper text-input dialog, with a safe chat prompt fallback.
- Includes bottom-middle pagination controls.
- Includes a bottom-right barrier close button.
- Includes a Main Menu shortcut beside the close button when Menu is installed and enabled; `/menu` also gets an Emotes button.
- Uses the shared light-blue GUI filler/border material so blocked slots stay visible across resource packs.
- Optional-target emotes open an online-player picker with a clear "no username" option.
- Required-target emotes open an online-player picker without the no-username option.
- CMI aliases with non-player arguments, such as `/nomnom <value>`, can show as suggest-command entries instead of using the player picker.
- Can auto-import CMI alias-editor commands from `plugins/CMI/CustomAlias/1MB-emotes.yml`.
- Simple single-line CMI `ctellraw` aliases are hidden by default; richer aliases with sounds, particles, effects, conditionals, or arguments can be enabled by default.
- Shows imported alias source, inferred target mode, and import issues through local admin/debug commands.
- Gives admins a disabled-emotes GUI page from `/emotes disabled` or the grey dye button, where hidden emotes can be enabled and reloaded.
- Supports `/emotes run <id> [player]` for direct testing.
- Supports local status, config, config set, aliases, and debug pages without needing to leave the feature command.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/emotes
/emotes help
/emotes <page>
/emotes search <keyword>
/emotes list [page]
/emotes run <emote> [player]
/emotes status
/emotes info
/emotes aliases [page]
/emotes disabled [page]
/emotes enable <emote>
/emotes disable <emote>
/emotes config [page]
/emotes set <path> <value>
/emotes debug [overview|commands|permissions|placeholders|config|aliases|all] [page]
/emotes reload
/emotes admin status
/emotes admin aliases [page]
/emotes admin disabled [page]
/emotes admin enable <emote>
/emotes admin disable <emote>
/emotes admin config [page]
/emotes admin set <path> <value>
/emotes admin debug [overview|commands|permissions|placeholders|config|aliases|all] [page]
/emotes admin reload
```

Aliases:

```text
No command aliases are registered intentionally. Use `/emotes`.
```

Global library examples:

```text
/1mbcmi debug plugin emotemenu
/1mbcmi debug plugin emotemenu commands
/1mbcmi debug plugin emotemenu permissions
/1mbcmi debug plugin emotemenu placeholders
/1mbcmi debug plugin emotemenu config
/1mbcmi debug plugin emotemenu all
/1mbcmi config emotemenu
/1mbcmi config set emotemenu output.page-size 14
/1mbcmi config set emotemenu output.list-page-size 8
/1mbcmi translations reload
```

## Example Commands

```text
/emotes
/emotes 2
/emotes search cheer
/emotes search cozy
/emotes list
/emotes list 2
/emotes run cheer
/emotes run cheer NikkiPixel
/emotes run nomnom snacks
/emotes run highfive Theo
/emotes status
/emotes info
/emotes aliases
/emotes disabled
/emotes enable cheer
/emotes disable cheer
/emotes config
/emotes set output.page-size 21
/emotes set output.list-page-size 8
/emotes set search.min-length 2
/emotes debug all
/emotes debug commands
/emotes debug permissions
/emotes debug placeholders
/emotes debug config
/emotes debug aliases
/emotes reload
/emotes admin aliases 2
/emotes admin disabled 2
/emotes admin config 2
/emotes admin set aliases.default-icon NAME_TAG
/emotes admin reload
```

## Permissions

```text
onembcmi.emotemenu.use
onembcmi.emotemenu.search
onembcmi.emotemenu.run
onembcmi.emotemenu.admin
onembcmi.emotemenu.admin.aliases
onembcmi.emotemenu.admin.toggle
onembcmi.emotemenu.admin.config
onembcmi.emotemenu.admin.set
onembcmi.emotemenu.admin.debug
onembcmi.emotemenu.admin.reload
```

Default access:

- `use`, `search`, and `run` default to true.
- `admin`, `admin.aliases`, `admin.toggle`, `admin.config`, `admin.set`, `admin.debug`, and `admin.reload` default to op.

## Placeholders

```text
%onembcmi_emotemenu.enabled%
%onembcmi_emotemenu.emotes.count%
%onembcmi_emotemenu.emotes.known.count%
%onembcmi_emotemenu.emotes.disabled.count%
%onembcmi_emotemenu.emotes.config.count%
%onembcmi_emotemenu.aliases.imported.count%
%onembcmi_emotemenu.aliases.enabled.count%
%onembcmi_emotemenu.aliases.files.count%
%onembcmi_emotemenu.aliases.missing.count%
%onembcmi_emotemenu.aliases.skipped.count%
%onembcmi_emotemenu.aliases.last_load%
%onembcmi_emotemenu.opens.count%
%onembcmi_emotemenu.actions.count%
%onembcmi_emotemenu.searches.count%
%onembcmi_emotemenu.last.emote%
%onembcmi_emotemenu.last.player%
%onembcmi_emotemenu.last.target%
%onembcmi_emotemenu.last.run_at%
%onembcmi_emotemenu.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_emotemenu.emotes.count%
papi parse mrfloris %onembcmi_emotemenu.aliases.imported.count%
papi parse mrfloris %onembcmi_emotemenu.aliases.enabled.count%
papi parse mrfloris %onembcmi_emotemenu.last.emote%
papi parse mrfloris %onembcmi_emotemenu.actions.count%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/EmoteMenu/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
output:
  page-size: 28
info:
  command: cmi ctext emotes
search:
  min-length: 1
  max-length: 32
  use-dialog: true
gui:
  use-global-filler-material: true
  filler-material: LIGHT_BLUE_STAINED_GLASS_PANE
run:
  close-gui-before-command: true
security:
  run-cooldown-millis: 750
  require-enabled-before-run: true
aliases:
  auto-load-cmi-custom-aliases: true
  files:
  - CMI/CustomAlias/1MB-emotes.yml
  default-target-mode: auto
  default-icon: NAME_TAG
  override-config-duplicates: true
  enabled-by-default: false
  simple-ctellraw-disabled-by-default: true
  complex-enabled-by-default: true
  enabled: []
  disabled: []
  exclude: []
  target-mode-overrides:
  - cheer=required
  - nomnom=suggest
emotes:
- "cheer|Cheer|cheer|optional|SUNFLOWER|Cheer for yourself or another online player.|false"
- "shrug|Shrug|shrug|none|PAPER|Shrug in chat.|false"
- "freeze|Freeze|freeze|optional|POWDER_SNOW_BUCKET|React with a chilly freeze emote.|false"
- "cozy|Cozy|cozy|optional|CAMPFIRE|Share a cozy emote with chat or a player.|false"
- "wave|Wave|wave|optional|OAK_SIGN|Wave hello.|false"
- "highfive|High Five|highfive|required|LIME_DYE|Send a high-five emote to an online player.|false"
```

Emote format:

```text
id|display name|command|target mode|icon material|description|enabled
```

Target modes:

- `none` means the command has no player argument.
- `optional` means players can run the command with no target or pick an online player.
- `required` means players must pick an online player.
- `suggest` means the GUI prepares the command in chat because the alias expects a non-player value.

Command values should be a single command label without a leading slash. Subcommands and arbitrary command strings are intentionally rejected. For example:

```text
cheer
shrug
cozy
```

The GUI will display those as:

```text
/cheer [player]
/shrug
/cozy [player]
```

## CMI Alias Import

By default, Emotes tries to load:

```text
plugins/CMI/CustomAlias/1MB-emotes.yml
```

The configured path in `config.yml` is relative to the server's `plugins/` folder, so the default value is:

```yaml
aliases:
  files:
  - CMI/CustomAlias/1MB-emotes.yml
```

The importer expects the normal CMI shape:

```yaml
CustomAlias:
  cheer:
    Cmds:
    - ...
    CustomTabs:
    - '[playerName]'
```

Each imported alias becomes a GUI entry with command title `/alias`, `/alias [player]`, `/alias <player>`, or `/alias <value>`.

Imported aliases are known to the plugin and are classified before they are shown:

```yaml
aliases:
  enabled-by-default: false
  simple-ctellraw-disabled-by-default: true
  complex-enabled-by-default: true
  enabled: []
  disabled: []
```

When `enabled-by-default` is true, every imported alias is enabled unless it is listed under `aliases.disabled`.

When `enabled-by-default` is false, Emotes applies the more careful split:

- simple single-command CMI `ctellraw` aliases, such as `tongue`, `toocool`, and `welcome`, stay disabled unless listed under `aliases.enabled`
- more involved aliases, such as `ghost` and `nomnom`, can start enabled when `aliases.complex-enabled-by-default` is true
- anything listed under `aliases.disabled` stays disabled, even if it would otherwise be enabled

Staff can change these lists with commands:

```text
/emotes aliases
/emotes disabled
/emotes enable cheer
/emotes disable cheer
/emotes admin enable freeze
/emotes admin disable freeze
```

The enable/disable commands also update matching fallback entries in the `emotes:` list, so duplicate ids do not unexpectedly remain visible.

Target mode inference:

- aliases that do not use `$1` are treated as `none`
- aliases using `$1` with player tab hints are treated as `optional` unless their commands contain required-usage wording
- aliases using `$1` without player tab hints are treated as `suggest`
- `aliases.target-mode-overrides` can force specific aliases, such as `cheer=required` or `nomnom=suggest`

Useful admin checks:

```text
/emotes aliases
/emotes disabled
/emotes enable cheer
/emotes disable cheer
/emotes debug aliases
/emotes status
/1mbcmi debug plugin emotemenu config
```

The local Paper 26.2 test server currently has `1MB-emotes.yml` with many CMI alias entries. With the default config and the file present, `/emotes aliases` should show simple entries as disabled and richer entries as enabled unless they were explicitly overridden. `/emotes disabled` opens the admin GUI for hidden entries.

Config fallback emotes still exist, but they also default to disabled with `|false` at the end of each entry. If the CMI alias file is missing, `/emotes` will only show fallback entries that were changed to `|true` or enabled with `/emotes enable <id>`.

The disabled-emotes GUI is admin-only. The grey dye on the main page appears only to users with `onembcmi.emotemenu.admin.toggle`; clicking a disabled emote adds it to the enabled list, saves `config.yml`, reloads the feature, and refreshes the disabled page.

## Local Debug Pages

```text
/emotes status
/emotes debug overview
/emotes debug commands
/emotes debug permissions
/emotes debug placeholders
/emotes debug config
/emotes debug aliases
/emotes debug all
```

`/emotes config` lists flattened config paths with their current value, type, and whether they can be changed through `/emotes set`.

`/emotes set <path> <value>` only supports scalar config paths such as booleans, numbers, and text. List paths like `emotes`, `aliases.files`, and `aliases.exclude` should be edited in `config.yml`, followed by `/emotes reload`.

Useful security config:

```yaml
security:
  run-cooldown-millis: 750
  require-enabled-before-run: true
```

The cooldown is a small plugin-side guard against double-click or rapid `/emotes run` bursts. CMI alias `gcooldown` rules can still provide the longer gameplay cooldowns.

## GUI Layout

Main page:

- top-center writable book: runs `info.command`, intended for a CMI ctext emote guide
- content slots: configured emote buttons
- bottom-left compass: opens the Paper search dialog when enabled, or suggests `/emotes search ` in chat as fallback
- admin-only grey dye: opens disabled emotes for review and enable/reload
- bottom-middle paper/book items: previous page, page info, next page
- bottom-right barrier: closes the GUI

Target picker:

- content slots: online players shown as profile-backed player heads
- self-targeting remains available for solo testing, but is hidden from the picker when other online players are available
- optional emotes add a clear no-username option
- bottom-left arrow: back to the emote list
- bottom-middle paper/book items: previous page, page info, next page
- bottom-right barrier: closes the GUI

The target heads use each online player's Paper player profile so skins render instead of generic heads when the client has the skin available.

## CMI-API, CMILib, And CMI Usage

- Runs the configured CMI alias-editor emote commands as the player.
- Uses `cmi ctext emotes` by default for the help book, but this is configurable.
- Uses Paper's dialog API for the search input on Paper 26.2+, with a chat prompt fallback if dialogs are disabled or unavailable.
- Uses the shared `1MB-CMIAPI-LIB` GUI service, config loader, translations, pagination, placeholders, and debug registration.
- Depends on CMI and CMILib at runtime like the other feature jars.
- Uses Paper online-player and command dispatch APIs.

## Security Notes

- Emote ids are strict lowercase safe ids.
- Emote command values are restricted to one short safe command label, such as `cheer`, `shrug`, or `cozy`.
- The info book command is separately restricted to a short safe command path, such as `cmi ctext emotes`.
- The plugin does not run console commands.
- Player targets are limited to exact online player names.
- Non-player arguments are limited to a few safe words containing only letters, numbers, underscores, dashes, and colons.
- Search input is limited to short plain text containing only letters, numbers, spaces, underscores, and dashes.
- Dialog search text is sanitized before filtering; unsafe MiniMessage, CMI tellraw, click, hover, or tag text is rejected instead of echoed back.
- Simple imported aliases and configured emotes are disabled by default until staff enables them.
- Complex imported aliases can be enabled by default, but explicit disabled entries always win.
- `/emotes run` only resolves enabled emotes.
- The shared GUI service cancels clicks and drags while its virtual inventory is open, including clicks in the player inventory area.
- GUI close buttons and GUI actions that close before running a command use a short delayed close instead of closing inside the click event.
- A short run cooldown helps avoid duplicate dispatches from double clicks or rapid command spam.
- Player input is not inserted into arbitrary command templates.
- Search input only filters configured emote metadata and is never inserted into a command template.

## Testing Notes

1. Run `/emotes`.
2. Confirm the help book opens the configured CMI ctext page.
3. Confirm `/shrug` style no-target emotes run immediately.
4. Confirm `/cheer [player]` style optional emotes open a target picker.
5. Confirm optional emotes can run with "no username".
6. Confirm required emotes require an online player target.
7. Run `/emotes search cheer`.
8. Run `/emotes aliases` and confirm the CMI aliases from `1MB-emotes.yml` are listed.
9. Confirm simple `ctellraw` aliases are disabled by default and complex aliases such as `ghost` or `nomnom` can be visible.
10. Run `/emotes disabled` as an admin and confirm the grey disabled-emotes page opens.
11. Enable a disabled emote from the GUI, verify it appears in `/emotes`, then disable it again with `/emotes disable <id>`.
12. Confirm the search button opens a dialog and rejects unsafe input such as `<click:test>`.
13. Run `/emotes debug all`.
14. Run `/1mbcmi debug plugin emotemenu all`.

[Plugin documentation index](README.md)
