# LavaBoots

LavaBoots adds finite event boots that help players move through lava without becoming a permanent fire-immunity perk. The boots are dyed leather boots with a fake glint and fake lore enchants, but the actual behavior is controlled by PersistentDataContainer markers while this plugin is installed.

The feature is meant for event kits, reward boxes, seasonal prizes, museum collections, and special server-owner giveaways. There is no crafting recipe by default.

## Player Flow

A player can wear LavaBoots and enter lava in an allowed world. While the boots still have charge and durability, the plugin assists horizontal movement in lava, gives short fire-resistance windows, plays optional sounds/particles, and lets the player sprint for a small burst with a cooldown. Sneaking brakes movement so they can stop drifting.

The boots remain finite:

- They spend stored charge seconds while active.
- Magma cream or fire charge in the offhand can add charge while the player is in lava.
- They take real leather-boot durability damage over time.
- They cannot be repaired, enchanted, grindstoned, smithing-table modified, anvil-repaired, mcMMO repair-block repaired, or protected through common repair/anvil player commands.
- They are not soulbound or owner-bound, so they can be traded, sold, dropped, or lost.

Levels I, II, and III are normal Lava tiers. Levels IV and V are rare event tiers and also grant lava vision while active.

If the plugin is uninstalled, the item remains as a named dyed leather boot with lore and PDC data, but the movement assist stops. Any short potion windows already applied expire naturally, so the item does not create permanent effects. While the plugin is running, LavaBoots-owned potion effects are removed shortly after leaving lava so players need another way to stay safe outside lava. Future plugin upgrades can keep reading the stored PDC schema, item id, level, theme, profile, charge, and collection data.

## Commands

```text
/lavaboots
/lavaboots status
/lavaboots info
/lavaboots help
/lavaboots admin give <player> <level> [theme] [profile] [amount]
/lavaboots admin gui [player]
/lavaboots admin list [levels|themes|profiles|disabled]
/lavaboots admin inspect <player>
/lavaboots admin disableitem <item-id>
/lavaboots admin enableitem <item-id>
/lavaboots admin reload
/lavaboots admin debug item [player]
/lavaboots debug item [player]
/lavaboots debug all
```

Examples:

```text
/lavaboots
/lavaboots admin give mrfloris 1 blacksmith steady 1
/lavaboots admin give mrfloris 3 summer_crystal steady 1
/lavaboots admin give mrfloris 5 ancient_forge sparked 1
/lavaboots admin gui mrfloris
/lavaboots admin list themes
/lavaboots admin inspect mrfloris
/lavaboots admin disableitem summer_crystal_3_ab12cd34
/lavaboots debug item
```

Console can use the non-GUI admin commands. In-game admins can use `/lavaboots admin gui` to pick a target, level, theme, and behavior profile, then create the selected boots.

## Default Worlds

Behavior is enabled only in configured worlds. Defaults are:

```text
spawn
legacy
general
wild
nether
end
oneblock
skyblock
cave
acid
skygrid
```

World matching is exact and case-insensitive.
If a player wears LavaBoots in lava outside these worlds, the plugin warns them instead of silently doing nothing.

## Levels

Default levels:

| Level | Fire resistance window | Speed level | Lava vision | Starting charge | Max charge |
| --- | ---: | ---: | --- | ---: | ---: |
| Lava I | 10 seconds | I | no | 120s | 180s |
| Lava II | 20 seconds | II | no | 180s | 300s |
| Lava III | 30 seconds | III | no | 240s | 420s |
| Lava IV | 40 seconds | IV | yes | 300s | 540s |
| Lava V | 50 seconds | V | yes | 360s | 660s |

These values are configurable in `config.yml`. The speed effect is refreshed in short windows while the player is in lava; the main lava movement is also helped by a capped velocity assist so it stays anti-cheat friendly.

## Themes And Profiles

Default themes:

```text
blacksmith
netherwalker
summer_crystal
ancient_forge
emberglass
```

Each theme controls the display name gradient, leather dye color, collection label, and lore lines. The default Summer Crystal theme includes the 1MoreBlock 15-year crystal lore.

Default behavior profiles:

```text
steady
sparked
fragile
```

Profiles alter charge amount, durability drain interval, assist strength, and sprint burst strength. They let admins make one pair last longer, move hotter, or feel more fragile without changing the visible Lava level.

## Config

Main file:

```text
plugins/1MB-CMIAPI/LavaBoots/config.yml
```

Important paths:

```yaml
worlds:
  allowed:
    - spawn
    - legacy
    - general
    - wild
    - nether
    - end
    - oneblock
    - skyblock
    - cave
    - acid
    - skygrid
  warn-when-disabled: true
effects:
  leave-effect-clear-delay-ticks: 20
fuel:
  enabled: true
  consume-at-or-below-seconds: 5
  magma-cream-seconds: 30
  fire-charge-seconds: 60
overheat:
  enabled: true
  warning-seconds: 45
  cutoff-seconds: 75
  cooldown-seconds: 25
safety:
  disabled-item-ids: []
  block-anvil: true
  block-enchanting: true
  block-grindstone: true
  block-smithing: true
  block-mcmmo-repair-block: true
  block-player-repair-commands: true
```

Use `/lavaboots admin disableitem <item-id>` if a specific generated item is duped, retired, or misconfigured. The item id is visible through `/lavaboots debug item` or `/lavaboots admin inspect <player>`.

## Permissions

```text
onembcmi.lavaboots.use
onembcmi.lavaboots.admin
onembcmi.lavaboots.give
onembcmi.lavaboots.gui
onembcmi.lavaboots.inspect
onembcmi.lavaboots.toggle
onembcmi.lavaboots.reload
onembcmi.lavaboots.debug
```

`onembcmi.lavaboots.use` defaults to true so players can inspect their own boots. Admin permissions default to false, including the parent `onembcmi.lavaboots.admin`, so owner-level staff should be granted access explicitly through LuckPerms. Direct server console can run non-GUI admin commands.

## Safety Notes

LavaBoots does not use RCON and does not register real custom enchantments. Fake enchants are item lore only. The plugin uses PDC for trusted identity and applies behavior only while the marked boots are worn in allowed worlds.

Magma-cream and fire-charge refuels use a monotonic PDC refuel sequence as their idempotency key. The exact boots and fuel slot before/after state are escrowed before mutation, so a failed checkpoint can restore both without stripping third-party item data. Uncertain refuels remain visible through `/lavaboots debug transactions`.

The anti-cheat-friendly movement assist has hard caps per level. Sprint burst has a cooldown. Sneak braking gives players control in lava without adding flight-style behavior.

The repair guards are intentionally conservative. If a player has LavaBoots in inventory, common repair/anvil commands such as `/anvil`, `/cmi anvil`, `/repair`, `/cmi repair`, `/fix`, and `/cmi fix` are blocked until the boots are moved elsewhere.

## CMI, CMILib, And Paper API

CMI and CMILib are required because this project loads all feature plugins through the shared 1MB-CMIAPI library environment and keeps docs/debug metadata consistent. LavaBoots itself does not depend on CMI economy or CMI command dispatch for normal behavior.

Paper/Bukkit APIs used include `PlayerMoveEvent`, player inventory armor slots, Adventure item names/lore, PDC item metadata, potion effects, particles, sounds, and inventory/anvil/enchant/interact events for no-repair guards.

[Documentation index](../README.md)
