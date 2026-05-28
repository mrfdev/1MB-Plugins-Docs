# Menu

Menu adds a configurable `/menu` GUI for player discovery. It is meant to be the main in-game starting point for worlds, warps, homes, economy commands, progression features, and server information.

The default layout uses a light-blue glass border, a bottom-right barrier close button, a bottom-left player head with live stats, a book-and-quill server info button, and a compass smart-home button. Feature buttons are auto-spaced in a staggered 4/3/4/3 layout and paginate when there are more buttons than fit on one page. Arrow buttons change pages when another page is available.

## Commands

```text
/menu
/menu <page>
/menu open <player> [page]
/menu status
/menu info
/menu help
/menu reload
/menu debug
/menu debug status
/menu debug health
/menu debug hooks
/menu debug commands [page]
/menu debug permissions [page]
/menu debug placeholders [page]
/menu debug config [page]
/menu debug set config <path> <value>
/menu debug all
```

## Example Commands

```text
/menu
/menu 2
/menu open mrfloris
/menu open mrfloris 2
/menu status
/menu info
/menu debug config
/menu debug set config gui.title 1MB Menu
/menu debug set config buttons.market.enabled false
```

## Player Flow

Players run `/menu` to open the first page. Each button shows its title, a short description, the direct command in gray, and a gold left-click hint. That lets players discover features visually while also learning the normal command they can type later.

The default button list includes:

```text
/worlds
/gametype
/cmi warp
/homes
/kits
/mcmmo menu
/jobs
/trade
/votetokens
/warp shops
/buy
/sell
/market
/points (runs /welcomes shop by default)
/fish menu
/farm menu
/mine menu
```

The compass button tries `/home home`, then `/home bed`, and finally `/homes`. The preferred home names and fallback command are configurable.

The book-and-quill button defaults to a console command:

```text
cmi ctext menu {player}
```

This lets the server use an existing CMI ctext page as the long-form menu guide.

The player-head stats button defaults to the player command:

```text
/account
```

Console and trusted admin command sources can open the menu for an online player:

```text
menu open <player> [page]
```

This is meant for safe back buttons in other GUIs. For example, a console-run GUI button can dispatch `menu open [playerName] 1` to return the player to the main menu without requiring `/menu` to be executable by console directly.

## Permissions

```text
onembcmi.menu.use
onembcmi.menu.status
onembcmi.menu.admin
onembcmi.menu.admin.open
onembcmi.menu.admin.reload
onembcmi.menu.admin.debug
```

Use `/menu debug permissions` for the live permission list from the jar.

## Placeholders

```text
%onembcmi_menu.enabled%
%onembcmi_menu.buttons.count%
%onembcmi_menu.pages%
%onembcmi_menu.opens%
%onembcmi_menu.actions%
%onembcmi_menu.blocked%
%onembcmi_menu.last.player%
%onembcmi_menu.last.action%
%onembcmi_menu.last.command%
%onembcmi_menu.cache.size%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/Menu/config.yml
```

Important defaults:

```yaml
gui:
  title: 1MB Server Menu
  rows: 6
  border:
    enabled: true
    material: LIGHT_BLUE_STAINED_GLASS_PANE
  menu-slots:
  - '10'
  - '12'
  - '14'
  - '16'
  - '20'
  - '22'
  - '24'
  - '28'
  - '30'
  - '32'
  - '34'
  - '38'
  - '40'
  - '42'
home:
  priority:
  - home
  - bed
  fallback-command: homes
info-button:
  command-source: console
  command: cmi ctext menu {player}
player-stats:
  command: account
```

Each button has these settings:

```yaml
buttons:
  worlds:
    enabled: true
    material: GRASS_BLOCK
    title: <color:#bde0fe>Worlds</color>
    lore:
    - <color:#d8e2dc>Explore the server worlds.</color>
    command: worlds
    display-command: worlds
    permission: ''
    page: 0
    slot: -1
```

`display-command` controls the gray command text players see in the item lore. `command` controls what actually runs. For example, the Points button can show `/points` while running `welcomes shop`, so the menu does not depend on a live-server alias.

Use `page: 0` and `slot: -1` for automatic pagination. Set both `page` and `slot` when you want a button pinned to one specific page and slot. Every default key is commented when the plugin writes the file. Existing values are preserved on reload; missing defaults are added safely.

## Hooks

Menu depends on CMI, CMILib, and 1MB-CMIAPI-Lib.

Optional hooks:

- PlaceholderAPI: used for stat-head placeholders such as `{papi:%mcmmo_power_level%}`.
- Vault: fallback economy provider if CMI balance formatting is unavailable.
- mcMMO and Jobs: shown through PlaceholderAPI when those expansions are installed. Menu also falls back to mcMMO's own power-level API if the mcMMO PlaceholderAPI value is blank.

## CMI / CMILib / Paper Usage

Menu uses CMI user data for formatted balance and home detection. The smart-home button checks the CMI home list before choosing which command to run.

Menu uses the shared 1MB-CMIAPI GUI service, which uses a custom Paper inventory holder, cancels unsafe clicks and drags, briefly debounces repeated same-slot clicks, and delays close-button handling by a few ticks. Menu actions also ignore repeated same-player/same-command dispatches within a short guard window. Player command dispatch goes through Bukkit command dispatch after the menu closes, is sanitized, and does not allow MiniMessage, CMI tellraw tags, command chains, pipes, or semicolon command injection.

## Testing

```text
/menu
/menu 2
/menu status
/menu debug all
/menu debug config
```

Confirm the light-blue border renders, the player head shows stats, the info button runs the configured CMI ctext command, the compass picks the correct home command, buttons close safely, and disabled or permission-gated buttons are hidden.

[Plugin index](README.md) | [Main docs](../README.md)
