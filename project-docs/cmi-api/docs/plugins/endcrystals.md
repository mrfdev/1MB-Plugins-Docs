# EndCrystals

EndCrystals is the 1MB-CMIAPI merge of the standalone `1MB-EndCrystals` project. It protects blocks and selected entity types from end crystal explosions, optionally blocks players or player-fired projectiles from breaking decorative crystals, and keeps The End configurable for vanilla dragon-fight behavior.

Use it when you want end crystals to explode normally without chewing up builds, item frames, paintings, display entities, boats, minecarts, armor stands, dropped items, or other configured protected entities.

## Migration Notes

- Remove or disable the old standalone `1MB-EndCrystals` jar before enabling `1MB-CMIAPI-EndCrystals`.
- The main command remains `/_endcrystals`.
- EndCrystals does not register `/endcrystals` or `/ec` by default. Those names are intentionally left free so players can keep using `/ender`, `/cmi ender`, or server-side CMI aliases for ender chest access without the protection plugin catching the command.
- Existing configs that still contain only the old default aliases `endcrystals` and `ec` are migrated back to an empty alias list on reload.
- The new config lives at `plugins/1MB-CMIAPI/EndCrystals/config.yml`.
- The new translations live at `plugins/1MB-CMIAPI/CMIAPILIB/translations/endcrystals.yml`.
- Existing standalone config values are not moved automatically. Copy matching values manually if you want to preserve old settings.

## Commands

```text
/_endcrystals
/_endcrystals info
/_endcrystals help
/_endcrystals status
/_endcrystals reload
/_endcrystals toggle [setting] [true|false]
/_endcrystals config [page]
/_endcrystals set <path> <value>
/_endcrystals debug [status|commands|permissions|placeholders|config|protected|toggles|all] [page]
/_endcrystals debug set config <path> <value>
```

## Example Commands

```text
/_endcrystals info
/_endcrystals status
/_endcrystals toggle list
/_endcrystals toggle protection.prevent-block-damage false
/_endcrystals toggle protection.allow-player-break-in-the-end true
/_endcrystals debug all
/_endcrystals debug protected 2
/_endcrystals config
/_endcrystals set debug.log-crystal-breaks true
```

## Permissions

Primary 1MB-CMIAPI nodes:

```text
onembcmi.endcrystals.use
onembcmi.endcrystals.admin
onembcmi.endcrystals.debug
onembcmi.endcrystals.reload
onembcmi.endcrystals.toggle
onembcmi.endcrystals.config
onembcmi.endcrystals.set
onembcmi.endcrystals.break
```

Legacy standalone nodes are preserved:

```text
onembendcrystals.admin
onembendcrystals.debug
onembendcrystals.reload
onembendcrystals.toggle
onembendcrystals.break
```

`onembcmi.endcrystals.use` defaults to everyone. Management and break-bypass nodes default to false so access must be granted explicitly through LuckPerms or your permission plugin.

## Placeholders

```text
%onembcmi_endcrystals.enabled%
%onembcmi_endcrystals.protection.block_damage%
%onembcmi_endcrystals.protection.player_break%
%onembcmi_endcrystals.protection.projectile_break%
%onembcmi_endcrystals.protection.entity_damage%
%onembcmi_endcrystals.protection.allow_end_break%
%onembcmi_endcrystals.protection.clear_yield%
%onembcmi_endcrystals.runtime.block_events%
%onembcmi_endcrystals.runtime.break_blocks%
%onembcmi_endcrystals.runtime.entity_blocks%
%onembcmi_endcrystals.runtime.tracked_explosions%
%onembcmi_endcrystals.protected_types.count%
```

Examples:

```text
/papi parse me %onembcmi_endcrystals.enabled%
/papi parse me %onembcmi_endcrystals.runtime.block_events%
/papi parse me %onembcmi_endcrystals.protection.allow_end_break%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/EndCrystals/config.yml
```

Every config path is commented. Comments are re-applied on reload while existing values are preserved through the shared 1MB-CMIAPI `FeatureSettings` helper.

Important settings:

```text
enabled
debug.enabled
output.entries-per-page
commands.aliases
protection.prevent-block-damage
protection.prevent-player-break
protection.prevent-projectile-break
protection.prevent-protected-entity-damage
protection.protected-entity-types
protection.allow-player-break-in-the-end
protection.clear-explosion-yield
debug.log-block-protection
debug.log-crystal-breaks
live-toggles
```

`commands.aliases` is kept as an empty compatibility setting for older configs, but this feature jar only registers `/_endcrystals`. Do not add `/ec` or `/endcrystals` here on this server; keep CMI or its custom aliases responsible for ender chest shortcuts.

`/_endcrystals set` can edit scalar config values such as booleans and numbers. List values such as `protection.protected-entity-types` and `live-toggles` should be edited in `config.yml` and then reloaded.

## Behavior

When `protection.prevent-block-damage` is true, end crystal explosion block lists are cleared and the explosion yield can optionally be set to zero. The explosion still exists; the plugin is only removing destructive world edits and drops.

When `protection.prevent-protected-entity-damage` is true, configured entity types are protected from nearby end crystal explosions. The default list includes decorative entities, display entities, leash knots, dropped items, boats, rafts, and minecart variants.

When player or projectile break protection is enabled, a player without `onembcmi.endcrystals.break` or `onembendcrystals.break` cannot break protected end crystals. `protection.allow-player-break-in-the-end` can allow normal End dragon-fight behavior without granting a global bypass permission.

## CMI / CMILib / CMI-API Usage

EndCrystals is a normal 1MB-CMIAPI feature jar. It depends on CMI, CMILib, and `1MB-CMIAPI-Lib`, registers in the shared feature registry, uses the shared MiniMessage output style, uses shared config comments, participates in `/1mbcmi features`, and exposes `/1mbcmi debug plugin endcrystals all`.

It does not need private CMI internals. CMI and CMILib are runtime dependencies so the feature follows the same installation and support surface as the rest of the 1MB-CMIAPI plugin set.

## Paper API Usage

EndCrystals uses Paper/Bukkit event APIs including `ExplosionPrimeEvent`, `EntityExplodeEvent`, `EntityDamageEvent`, `EntityDamageByEntityEvent`, `HangingBreakEvent`, `VehicleDamageEvent`, and `VehicleDestroyEvent`. It uses modern damage source inspection where Paper exposes the direct and causing entities.

## Security Notes

- Management commands are permission-gated.
- Console can always use management commands.
- The break bypass is explicit and is not granted automatically to ops by this plugin.
- Unknown entity types in config are ignored safely.
- List-valued config paths are not editable through command input.
- Dynamic text is escaped before MiniMessage rendering.
- The plugin writes only its own feature config and translation files by default.

## Testing

```text
/_endcrystals info
/_endcrystals status
/_endcrystals toggle list
/_endcrystals debug all
/_endcrystals debug protected
/_endcrystals set debug.log-block-protection true
/papi parse me %onembcmi_endcrystals.enabled%
```

Manual survival test:

1. Place an end crystal near normal blocks and trigger it.
2. Confirm the explosion occurs but blocks remain.
3. Place an item frame, painting, boat, minecart, or display entity near a crystal.
4. Trigger the crystal and confirm the configured entity is protected.
5. Confirm a player without `onembcmi.endcrystals.break` cannot break a protected crystal.
6. Grant the bypass permission and confirm the same player can break it.

[Plugin index](README.md) | [Documentation index](../README.md)
