# Commands

This page documents commands verified from `plugin.yml` and the command dispatcher in `HeadDisplays-1.12.9-26.2-display-fix.jar`.

## Main Command

| Command | Aliases |
| --- | --- |
| `/hd` | `/hdi`, `/hdisplay`, `/headdisplay` |

The command dispatcher is player-only. Console execution returns an error and does not run command logic.

## Registered Subcommands

The 1.12.9 command forwarder registers these subcommands:

| Subcommand | Aliases | Permission | Usage |
| --- | --- | --- | --- |
| `create` | `c`, `cr` | `headdisplays.create` | `/hd create <display text>` |
| `info` | `i`, `?` | `headdisplays.info` | `/hd info` |
| `edit` | `e`, `ed` | `headdisplays.edit` | `/hd edit <display id>` |
| `list` | `lists`, `displays`, `l` | `headdisplays.list` | `/hd list [page]` |

## Command Details

### `/hd`

Shows a short help message. The admin help message references:

```text
/hdisplay create
edit
list
info
```

Non-admin users are directed toward `/hdisplay info`.

### `/hd info`

Shows:

- Plugin version.
- Number of active displays.
- PlaceholderAPI status.
- Clickable author links from the original plugin.

This command is implemented by the vendor jar. This local patch does not change the info command text.

### `/hd create <display text>`

Creates a HeadDisplay placement item in the player's inventory. The player must have an empty inventory slot.

The plugin joins all arguments after `create` into the display text. It treats the literal sequence `/n` as a line separator for display text/lore.

### `/hd list [page]`

Lists displays sorted by ID. The list shows 8 displays per page and includes clickable helpers for display text, location, and editing.

### `/hd edit <display id>`

Opens the HeadDisplays GUI for an existing display ID.

## Classes Present But Not Registered

The jar contains `DeleteDisplay` and `RefreshDisplay` classes and `plugin.yml` lists permissions for delete, refresh, and listnear. However, the inspected 1.12.9 `CommandForwarder` constructor only registers `create`, `info`, `edit`, and `list`.

Do not document `/hd delete`, `/hd refresh`, or `/hd listnear` as available to players unless a future vendor jar registers them or local testing proves they are reachable.
