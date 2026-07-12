# GameTypes

GameTypes is a player-fun feature plugin that opens one safe BentoBox menu for several island game types. It detects the player's current BentoBox world when possible, or staff/CMI aliases can open a specific menu with `/gametype menu <type>`.

The first version is intentionally config-driven. It knows the common 1MoreBlock BentoBox game types, reads simple BentoBox addon-disable lists when they exist, and only runs reviewed player commands from config. It does not create islands directly through an internal API yet; it closes the GUI and dispatches normal BentoBox player commands such as `/oneblock go`, `/skyblock team`, or `/cave challenges`.

## Commands

| Command | Explanation | Example |
| --- | --- | --- |
| `/gametype` | Opens the detected game type menu for the player's current world. If no BentoBox game type is detected, it opens the GameTypes index. Console receives status output. | `/gametype` |
| `/gametype menu` | Opens the detected menu from the current world, or the GameTypes index from worlds such as wild, spawn, survival, or skylands. | `/gametype menu` |
| `/gametype menu <type>` | Opens a specific configured menu when world detection is not possible, such as from `/wild`. | `/gametype menu oneblock` |
| `/gametype status` | Shows loaded hooks, enabled game types, the current world, and detection state. | `/gametype status` |
| `/gametype reload` | Reloads GameTypes config and translations. | `/gametype reload` |
| `/gametype info` | Shows the player-friendly intro, starter command, help command, and docs link. | `/gametype info` |
| `/gametype help` | Shows only commands available to the sender. Permission nodes are hidden from normal help. | `/gametype help` |
| `/gametype debug` | Shared debug page with runtime, build, Paper, Java, category, docs, hooks, commands, permissions, placeholders, config, and health. | `/gametype debug all` |
| `/gametype debug menu [global\|type]` | Shows the current emergency menu toggles for all menus or one game type. | `/gametype debug menu oneblock` |
| `/gametype debug scan <type>` | Explains why each menu button is visible or hidden, including slot paths and BentoBox addon config scan details. | `/gametype debug scan skyblock` |
| `/gametype debug set <global\|type> <option> <true\|false>` | Enables or disables a menu option live, preserving the commented config file. | `/gametype debug set skyblock biomes false` |
| `/gametype debug permissions` | Lists declared permission nodes. In game this is paginated; console output is not paginated. | `/gametype debug permissions` |

## Game Types

Default configured types:

| Type id | Display | BentoBox/internal name | Command root |
| --- | --- | --- | --- |
| `oneblock` | OneBlock | `AOneBlock` | `/oneblock` |
| `skyblock` | SkyBlock | `BSkyBlock` | `/skyblock` |
| `acid` | AcidIsland | `AcidIsland` | `/acid` |
| `cave` | CaveBlock | `CaveBlock` | `/cave` |
| `skygrid` | SkyGrid | `SkyGrid` | `/skygrid` |

CMI aliases can point game commands at the shared menu, for example:

```text
/oneblock menu -> /gametype menu oneblock
/skyblock menu -> /gametype menu skyblock
/cave menu -> /gametype menu cave
```

When a player is already inside a configured game world, `/gametype menu` can detect the type from exact configured world names first and optional world-name fragments second.

When a player is not inside a recognized BentoBox game type world, `/gametype` and `/gametype menu` open an index GUI instead of sending an error. The index shows the five configured game types and opens the selected menu directly, so players can still create, visit, or manage islands from hub-style worlds.

Game type menus use the bottom-right button as **Back to Index**, so players can quickly switch from OneBlock to SkyBlock, AcidIsland, CaveBlock, or SkyGrid. The index menu keeps the bottom-right button as **Close**.

## Menu Buttons

Core buttons:

```text
island
go
create
spawn
team
info
reset
help
top
scoreboard
kits
dailyshop
```

Addon buttons are shown only when the addon is globally enabled, enabled for that game type, and not disabled by the BentoBox addon config:

```text
warp
challenges
level
biomes
generator
border
greenhouse
limits
farmersdance
topblock
```

The `warp` button is labeled **Warps** and runs `/<type> warps`, not `/<type> warp`, because BentoBox `warp` expects a player/warp target while `warps` opens the browseable warps GUI.

The `farmersdance` button keeps the config id used by the addon folder, but runs `/<type> farmdance`, which is the BentoBox player command for that addon.

OneBlock-only addon/special buttons:

```text
topblock
phases
count
```

`reset` is disabled by default because it is destructive. If staff enable it, clicking the reset button opens a confirmation GUI first. Players must explicitly click the red confirm button before GameTypes runs the BentoBox reset command.

`topblock`, `phases`, and `count` are enabled for OneBlock by default and disabled for the other game types. TopBlock also has a code-level OneBlock-only guard so older configs cannot accidentally show it in SkyBlock, AcidIsland, CaveBlock, or SkyGrid menus.

`scoreboard` runs `/sb` as the player and is shown in every game type menu. This is safe in test environments even without AnimatedScoreboard installed; the live server handles the actual toggle.

`kits` runs `/kits` as the player and sits in the bottom utility row between the scoreboard toggle and daily shop.

`dailyshop` runs a strict CMI console teleport for the player who clicked the button. It sits in the bottom utility row next to kits and uses a different location per game type:

```yaml
gametypes:
  oneblock:
    core:
      dailyshop:
        command: cmi tppos -p:[playerName] oneblock;10437.5;79;-8010.5;-90.0;1.04
  cave:
    core:
      dailyshop:
        command: cmi tppos -p:[playerName] cave;-151.5;66;261.5;90.00;1.50
  acid:
    core:
      dailyshop:
        command: cmi tppos -p:[playerName] acid;-436.5;60;350.5;90.00;1.50
  skyblock:
    core:
      dailyshop:
        command: cmi tppos -p:[playerName] skyblock;-146.5;137;-7.5;-90.00;1.50
  skygrid:
    core:
      dailyshop:
        command: cmi tppos -p:[playerName] skygrid;12.5;129;1.5;-90.00;1.50
```

For safety, console-dispatched menu commands are limited to the reviewed `cmi tppos -p:[playerName] world;x;y;z;yaw;pitch` shape.

## BentoBox Config Scanning

GameTypes can scan configured BentoBox addon config paths, such as:

```text
plugins/BentoBox/addons/Biomes/config.yml
plugins/BentoBox/addons/MagicCobblestoneGenerator/config.yml
plugins/BentoBox/addons/TopBlock/config.yml
```

The scanner is intentionally conservative. It hides an addon button when it finds one of these patterns:

- A blacklist list such as `disabled-gamemodes` or `disabled-game-modes` names the current type, command, or internal BentoBox name.
- A whitelist list such as `game-modes` or `gamemodes` exists but does not name the current type, command, or internal BentoBox name.

For example, this BentoBox Biomes config means only BSkyBlock should show the Biomes button:

```yaml
disabled-gamemodes:
  - AOneBlock
  - SkyGrid
  - AcidIsland
  - CaveBlock
```

Because GameTypes knows that `oneblock` maps to `AOneBlock`, `cave` maps to `CaveBlock`, and so on, it can hide Biomes for those menus while keeping it visible for `skyblock`.

Greenhouses and Limits use whitelist-style config in current BentoBox setups:

```yaml
# Greenhouses/config.yml
game-modes:
  - BSkyBlock
  - AcidIsland
  - SkyGrid
  - AOneBlock

# Limits/config.yml
gamemodes:
  - AcidIsland
  - BSkyBlock
  - CaveBlock
  - SkyGrid
  - AOneBlock
```

With this layout, Greenhouses will show for SkyBlock, AcidIsland, SkyGrid, and OneBlock, but not CaveBlock. Limits will show for all five configured GameTypes.

This means it is safe as an early helper, but the config remains the source of truth:

```yaml
gametypes:
  skyblock:
    addons:
      biomes:
        enabled: true
```

If a BentoBox addon uses a different config layout, staff can disable the matching button explicitly in `plugins/1MB-CMIAPI/GameTypes/config.yml`.

## Emergency Menu Toggles

Staff can hide a button without stopping the server or manually editing YAML:

```text
/gametype debug menu global
/gametype debug menu oneblock
/gametype debug set global kits false
/gametype debug set global scoreboard false
/gametype debug set global dailyshop false
/gametype debug set oneblock warp false
/gametype debug set oneblock dailyshop false
/gametype debug set skyblock biomes false
/gametype debug set oneblock enabled false
```

Use `global` when a button should disappear from every GameTypes menu. Use a game type id, such as `oneblock`, `skyblock`, `acid`, `cave`, or `skygrid`, when only that menu should change.

Friendly option names are the same ids shown in the menu/button docs. Aliases are accepted for common names:

```text
warps -> warp
farmdance -> farmersdance
```

The friendly command writes to the same commented config file as the shared debug setter. The underlying paths are:

```yaml
enabled: true
buttons:
  core:
    kits:
      enabled: true
    scoreboard:
      enabled: true
    dailyshop:
      enabled: true
      dispatch: console
  addons:
    biomes:
      enabled: true
  special:
    phases:
      enabled: true
gametypes:
  oneblock:
    enabled: true
    core:
      kits:
        enabled: true
      dailyshop:
        enabled: true
        command: cmi tppos -p:[playerName] oneblock;10437.5;79;-8010.5;-90.0;1.04
    addons:
      warp:
        enabled: true
    special:
      phases:
        enabled: true
```

The lower-level setter remains available for exact config paths:

```text
/gametype debug set config buttons.core.kits.enabled false
/gametype debug set config gametypes.oneblock.addons.warp.enabled false
```

Disabled buttons are hidden from the GUI by default. `reset` is the exception: it stays visible as a disabled gray button unless `buttons.core.reset.show-when-disabled` is set to `false`.

## Menu Diagnostics

Use `/gametype debug scan <type>` when a button appears or disappears unexpectedly. The scan explains each button in one line:

- the configured GUI slot and per-game-type slot path;
- the global toggle value;
- the game-type toggle value;
- addon hook/config status where relevant;
- BentoBox config scan source, such as `plugins/BentoBox/addons/Biomes/config.yml:disabled-gamemodes`;
- final result: visible, visible disabled, or hidden with a reason.

Examples:

```text
/gametype debug scan oneblock
/gametype debug scan skyblock
/gametype debug set config debug.log-menu-dispatch true
```

When `debug.log-menu-dispatch` is `true`, every accepted menu click logs the player, game type, button id, dispatch type, stage, and command to console. This is useful when testing CMI aliases such as `/oneblock farmdance` or daily shop teleports. Keep it off on live unless you are actively diagnosing a menu button.

Permission-aware hiding is intentionally shelved for now. If a player clicks a BentoBox command they cannot use, BentoBox remains the authority and will return the normal permission denial.

## Layout Overrides

Every menu button has a global slot and a per-game-type slot. Global slots live under `buttons.<kind>.<id>.slot`; per-game-type overrides live under `gametypes.<type>.<kind>.<id>.slot`.

Examples:

```text
/gametype debug set config buttons.core.kits.slot 47
/gametype debug set config gametypes.oneblock.addons.farmersdance.slot 31
/gametype debug set config gametypes.skyblock.addons.biomes.slot 22
```

Reserved utility slots are protected from normal buttons:

```text
4 = game type selector
45 = player stats head
46 = help book
53 = close
```

If two visible buttons are configured for the same slot, the earlier button keeps the slot and `/gametype debug scan <type>` reports the later button as hidden because of a slot collision.

## Permissions

```text
onembcmi.gametypes.use
onembcmi.gametypes.menu
onembcmi.gametypes.admin
onembcmi.gametypes.admin.reload
onembcmi.gametypes.admin.debug
```

Suggested LuckPerms basics:

```text
lp group default permission set onembcmi.gametypes.use true
lp group default permission set onembcmi.gametypes.menu true
lp group admin permission set onembcmi.gametypes.admin true
```

## Placeholders

```text
%onembcmi_gametypes_detected%
%onembcmi_gametypes_world%
%onembcmi_gametypes_enabled_count%
%onembcmi_gametypes_last_opened%
```

Example checks:

```text
papi parse mrfloris %onembcmi_gametypes_detected%
papi parse mrfloris %onembcmi_gametypes_world%
```

## Config

Important settings:

```yaml
gui:
  title: GameType Menu
  index-title: GameType Menu - Index
  use-global-filler-material: true
  filler-material: LIGHT_BLUE_STAINED_GLASS_PANE
  click-cooldown-ms: 150
debug:
  log-menu-dispatch: false
detection:
  match-world-name-fragments: true
commands:
  close-before-dispatch: true
buttons:
  core:
    kits:
      slot: 47
    reset:
      enabled: false
      show-when-disabled: true
      slot: 16
gametypes:
  ids:
  - oneblock
  - skyblock
  - acid
  - cave
  - skygrid
bentobox:
  scan:
    enabled: true
    root: plugins/BentoBox/addons
    disabled-list-keys:
    - disabled-gamemodes
    - disabled-game-modes
    whitelist-list-keys:
    - game-modes
    - gamemodes
```

Each command template is rendered with the selected game type and then safety-checked before dispatch:

```yaml
buttons:
  addons:
    challenges:
      command: '{command} challenges'
```

Player-dispatched buttons pass through Bukkit's command preprocess event before final dispatch. This keeps CMI custom aliases, such as `/oneblock farmdance`, behaving like the player typed the command manually while still blocking unsafe rewritten command lines.

Supported placeholders in command templates:

```text
{command}
{gametype}
{type}
{internal}
{playerName}
{player}
[playerName]
```

## GUI Safety

The GUI uses owner-bound session holders and cancels unsupported top-inventory clicks, drags, stale menus, and wrong-owner interaction. It does not contain input slots, so there is no item escrow or player item transfer surface.

Only left/right clicks on current-session top-menu buttons are accepted. Commands are closed-before-run by default, delayed by one tick, and blocked if they contain unsafe characters or an unexpected command shape.

## Hooks

- **CMI / CMILib / 1MB-CMIAPI-LIB**: required runtime stack, shared prefix, debug, config, help, and docs behavior.
- **BentoBox**: optional but expected on live/test game type servers. GameTypes dispatches BentoBox player commands and reports hook status.
- **Vault**: optional. If loaded, the player head shows a money balance.
- **PlaceholderAPI**: optional. Registers GameTypes placeholders through the shared library.

## Manual Testing

On a BentoBox environment, test:

- `/gametype menu oneblock` from a normal world.
- `/gametype menu` from each configured game world.
- CMI aliases such as `/oneblock menu` pointing to `/gametype menu oneblock`.
- Disabled addon detection after copying real BentoBox addon configs, especially `disabled-gamemodes` lists like Biomes.
- `/gametype debug scan oneblock` and `/gametype debug scan skyblock`, checking scan paths and final visible/hidden reasons.
- `debug.log-menu-dispatch` with a harmless button such as Help or Kits, then turn it back off.
- Per-game-type slot override, then reload and confirm the button moved without colliding with reserved utility slots.
- Destructive buttons stay disabled unless explicitly enabled.
- If `reset` is enabled for testing, clicking it opens the confirmation GUI and cancel returns to the game type menu.
- Wrong-owner GUI clicks, number-key swaps, shift-clicks, and drags do not move items or run commands.

[Plugin index](README.md)
