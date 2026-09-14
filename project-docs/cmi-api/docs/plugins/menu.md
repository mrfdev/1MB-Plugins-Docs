# Menu

Menu adds a configurable `/menu` GUI for player discovery. It is meant to be the main in-game starting point for worlds, warps, homes, economy commands, progression features, and server information.

The default layout uses a light-blue glass border, a bottom-right barrier close button, a bottom-left player head with live stats, a book-and-quill server info button, and a compass smart-home button. Feature buttons are auto-spaced in a staggered 4/3/4/3 layout and paginate when there are more buttons than fit on one page. Arrow buttons change pages when another page is available.

## Player FAQ

### Where do I start if I do not know the commands?

Run `/menu`. Hover a button to see what it does and the direct command, then left-click to open the feature. Use the page arrows for more buttons.

### Why is a feature missing from my menu?

Buttons depend on the server configuration, installed and enabled features, and your access. A missing button does not necessarily mean your progress was lost.

### Where does the home compass take me?

By default it tries your home named `home`, then `bed`, then opens `/homes`. The server can customize this order.

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
/exchange
/votetokens
/birthday
/discordchat
/emotes
/nick
/spawners
/forage
/afkshrine gui
/warp shops
/buy
/sell
/autosell
/market
/points (runs /welcomes shop by default)
/fish menu
/farm menu
/mine menu
/chunks
/appreciate
/kitstreak guide
/journeymap path
/collect
```

The **Chunks** spyglass opens the [view-distance menu](chunks.md). With the default order and all default buttons visible, it appears on page 2 (`/menu 2`). It uses automatic placement, so a customized order, layout, or hidden buttons can move it to another page. Players need `onembcmi.chunks.use` in addition to access to `/menu`. Chunks changes server-sent view distance only; it does not change simulation distance.

The default order continues with [Appreciation](appreciation.md), [Kit Streaks](kitstreaks.md), [Your Journey](journeymap.md), and [Collect](collect.md). Appreciation opens its player index, Kit Streaks opens the streak guide, Your Journey opens the JourneyMap path, and Collect opens its event menu. All 31 default buttons fill three pages with the stock 14-button layout when every button is visible. Hidden buttons and custom settings can change the page count and placement. Each destination has a nether-star return button beside its close button; the default return is `/menu`.

Existing configs that were created before Spawners existed can auto-append the Spawners button when `buttons.spawners.enabled` and `buttons.spawners.auto-append-to-order` are true. Set either value to false if `/spawners` should stay out of `/menu`.

Existing configs that were created before BirthdayLanterns, DiscordChat, EmoteMenu, or Nick were added to the menu can auto-append their buttons when the matching `buttons.<id>.enabled` and `buttons.<id>.auto-append-to-order` settings are true. Menu checks that the matching feature plugin is installed, plugin-enabled, and that the feature `config.yml` still has `enabled: true`, so disabled feature GUIs do not show as dead buttons.

Existing configs that were created before Forage existed can auto-append the Forage button when `buttons.forage.enabled` and `buttons.forage.auto-append-to-order` are true. Menu also checks that `1MB-CMIAPI-Forage` is installed, plugin-enabled, and that the Forage `config.yml` still has `enabled: true`, so the button disappears automatically during an emergency Forage shutdown.

Existing configs that were created before AFKShrine existed in the menu can auto-append the AFKShrine button when `buttons.afkshrine.enabled` and `buttons.afkshrine.auto-append-to-order` are true. Menu also checks that `1MB-CMIAPI-AFKShrine` is installed, plugin-enabled, and that the AFKShrine `config.yml` still has `enabled: true`, so the button disappears automatically during an emergency AFKShrine shutdown.

Existing configs that were created before AutoSell existed in the menu can auto-append the AutoSell button when `buttons.autosell.enabled` and `buttons.autosell.auto-append-to-order` are true. Menu also checks that `1MB-CMIAPI-AutoSell` is installed, plugin-enabled, and that the AutoSell `config.yml` still has `enabled: true`, so the button disappears automatically during an emergency AutoSell shutdown.

Existing installations automatically receive missing Chunks button defaults and include a missing `chunks` button after the saved order when `buttons.chunks.enabled` and `buttons.chunks.auto-append-to-order` are true, which is the default. This does not rewrite the saved `buttons.order` list. Run `/menu reload` after updating if needed. Existing explicit button settings, order entries, and placements are preserved. To hide the button, set `buttons.chunks.enabled: false`; to keep it out of the order, remove `chunks` from `buttons.order` and set `buttons.chunks.auto-append-to-order: false`. Menu checks Chunks' current feature state and player access when displaying and dispatching the button, so an absent, dormant, or invalid Chunks feature is unavailable.

The same existing-config behavior applies to button ids `appreciation`, `kitstreaks`, `journeymap`, and `collect`: missing defaults are added, and enabled buttons auto-append to the effective order without replacing saved overrides or rewriting `buttons.order`. Run `/menu reload` after updating if needed. For any of these ids, set `buttons.<id>.enabled: false` to hide it, or remove its order entry and set `buttons.<id>.auto-append-to-order: false` to prevent automatic inclusion. These links require the destination feature to be installed, active rather than dormant, valid, and accessible to the player. Those checks run when displaying and dispatching the button, including after a menu was already opened. Adding a link does not activate its feature.

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

The Chunks button defaults to `material: SPYGLASS`, `display-command: chunks`, `command: 1mb-cmiapi-chunks:chunks`, and `permission: onembcmi.chunks.use`. The namespaced command opens the feature even if a legacy CMI alias still owns the plain `/chunks` command; retire that alias separately so direct player commands also reach Chunks. Its default `page: 0` and `slot: -1` use automatic placement.

The following links also use automatic placement and namespaced commands. Players see the friendly command in the item lore; the dispatch target reaches the intended feature even when a plain command has an alias elsewhere.

| Button id | Command shown to players | Default command dispatched |
| --- | --- | --- |
| `appreciation` | `/appreciate` | `1mb-cmiapi-appreciation:appreciate` |
| `kitstreaks` | `/kitstreak guide` | `1mb-cmiapi-kitstreaks:kitstreak guide` |
| `journeymap` | `/journeymap path` | `1mb-cmiapi-journeymap:journeymap path` |
| `collect` | `/collect` | `1mb-cmiapi-collect:collect` |

Use `page: 0` and `slot: -1` for automatic pagination. Set both `page` and `slot` when you want a button pinned to one specific page and slot. Every default key is commented when the plugin writes the file. Existing values are preserved on reload; missing defaults are added safely.

## Hooks

Menu depends on CMI, CMILib, and 1MB-CMIAPI-Lib.

Optional hooks:

- PlaceholderAPI: used for stat-head placeholders such as `{papi:%mcmmo_power_level%}`.
- Vault: fallback economy provider if CMI balance formatting is unavailable.
- mcMMO and Jobs: shown through PlaceholderAPI when those expansions are installed. Menu also falls back to mcMMO's own power-level API if the mcMMO PlaceholderAPI value is blank.
- AutoSell: optional runtime check for showing the `/autosell` button only while the AutoSell plugin is installed and enabled.
- Chunks: optional live feature-state check for the `/chunks` button, with player access checked again before dispatch.
- Appreciation, KitStreaks, JourneyMap, and Collect: optional live feature-state and player-access checks for their menu links; dormant or invalid features remain unavailable.

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

With Chunks active and accessible, confirm its spyglass opens the Chunks GUI from page 2 in the default layout and its nether star returns to `/menu`. Check an existing Menu config receives the button without losing custom settings, both opt-out methods work, and a feature shutdown or revoked permission prevents a previously opened button from dispatching.

Repeat the existing-config, opt-out, access, and stale-menu checks for Appreciation, KitStreaks, JourneyMap, and Collect. Confirm each opens its documented destination and the return star opens the configured server menu. Verify that opening or reloading Menu leaves dormant features dormant, and that pagination reaches the third page when all 31 default buttons are visible.

[Plugin index](README.md) | [Main docs](../README.md)

## Dynamic next steps

See [Dynamic next steps and the global hub](../next-steps.md) for `/next`, the integrated feature next commands, selection rules, current coverage, and safe navigation.
