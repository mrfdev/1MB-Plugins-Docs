# mcMMO More To mcMMO Conversion Design

This is implemented as a default-disabled test feature for build `1.0.0-040`. Staff should tune `conversion.yml`, permissions, and economy ratios on the test server before enabling it live.

## Goal

Let players exchange earned mcMMO More progress for real native mcMMO levels in existing mcMMO skills, without adding native skills to mcMMO and without patching the mcMMO jar.

Example player flow:

```text
/mcmmore skills convert exploration
```

The command can show:

```text
Exploration conversion
You have 312 eligible Exploration levels.
Spend 250 Exploration levels for 25 Excavation levels.
Spend 250 Exploration levels for 25 Mining levels.
```

Each offer should include a clickable confirmation that expires quickly and repeats the exact cost, target, and result.

## Technical Feasibility

mcMMO exposes public API methods for existing native mcMMO skills:

- `ExperienceAPI.addLevel(Player, String, int)` for direct online level grants.
- `ExperienceAPI.addLevelOffline(UUID, String, int)` for offline grants, if later needed.
- `ExperienceAPI.getLevel(...)` and `ExperienceAPI.getLevelCap(...)` for cap-aware quotes.
- `ExperienceAPI.addXP(...)`, `addRawXP(...)`, and `addModifiedXP(...)` if XP-based conversion is ever preferred.

For this feature, direct level grants are easier for players to understand than XP grants. If the UI says `250 More levels -> 25 Mining levels`, the implementation should grant exactly 25 native levels, capped by the target skill's remaining room.

To keep the current no-compile-dependency style, mcMMO API access remains reflective, similar to the existing combined power placeholder bridge.

## Core Rules

- Default disabled until tested.
- Online self-conversion first; offline/admin conversion can wait.
- One-way conversion with no refund.
- Use a ledger, not a visible level reduction, by default.
- Eligible More levels are `current more level - spent more levels for that More skill`.
- Spending is pooled per More skill, not per target, so the same Exploration levels cannot be spent once into Mining and again into Excavation.
- Respect target mcMMO skill caps before spending.
- Require mcMMO to be installed and enabled.
- Require normal command permission plus source and target conversion permissions.
- Use confirmation tokens with short expiry.
- Log every conversion with player UUID, More skill, spent levels, target mcMMO skill, granted levels, timestamp, and command source.

Recommended default math:

```text
10 More levels = 1 native mcMMO level
minimum spend = 250 More levels
maximum grant per transaction = 25 mcMMO levels
optional daily/weekly cap = 25 mcMMO levels per target skill
```

The example `250 More levels -> 25 Mining levels` fits this default.

## Data Model

Store conversion data inside this plugin's playerdata, not inside mcMMO data.

```yaml
conversions:
  exploration:
    spent-levels: 250
    history:
      - at: 2026-05-08T12:00:00Z
        target: mining
        spent-levels: 250
        granted-levels: 25
        mode: ledger
```

The player's mcMMO More level should remain visible for stats, top lists, and pride. The ledger prevents repeated cash-out.

## Commands

Preferred command surface:

```text
/mcmmore skills convert
/mcmmore skills convert <more-skill>
/mcmmore skills convert <more-skill> <mcmmo-skill>
/mcmmore skills convert <more-skill> <mcmmo-skill> confirm <token>
```

Optional shorter alias:

```text
/mcmmore convert <more-skill> [mcmmo-skill]
```

Tab completion should be permission-aware and only suggest configured, enabled conversion paths.

## Permissions

Suggested permission nodes:

```text
onembmcmmore.command.convert
onembmcmmore.convert.<more-skill>
onembmcmmore.convert.<more-skill>.<mcmmo-skill>
```

Example:

```text
lp group default permission set onembmcmmore.command.convert true
lp group default permission set onembmcmmore.convert.exploration true
lp group default permission set onembmcmmore.convert.exploration.mining true
```

## Suggested Default Mapping

The target list should be config-driven. These are proposed defaults.

| mcMMO More skill | Recommended native mcMMO targets | Notes |
| --- | --- | --- |
| Exploration | Excavation, Mining | Best match for world traversal, cave discovery, terrain discovery, and general exploring. Mounted-travel could later optionally map to Taming, but not as the default parent conversion. |
| Aquatics | Fishing, Tridents | Fishing fits water activity best. Tridents fits swimming/diving/riptide-adjacent gameplay if enabled. |
| Airborne | Acrobatics, Tridents | Acrobatics fits falling, movement control, and survival. Tridents fits riptide-source Airborne progress. |
| Defense | Acrobatics, Repair | Acrobatics is the closest native defensive/survival skill. Repair is reasonable for shield/armor wear, but offensive combat skills should not be default conversion targets. |
| Arcane | Alchemy, Repair, Salvage | mcMMO has Alchemy, not Brewing. Enchanting/anvil work can reasonably convert to Alchemy for magic flavor, Repair for anvil work, and optional Salvage for item reclaim loops. |
| Husbandry | Taming, Herbalism | Taming is the strongest match. Herbalism is a softer secondary target through animal food/crop support. |
| Action | None by default | Keep disabled until Action has approved sources. Possible future targets: Unarmed, Maces, Mining, Axes, or Swords depending on the final gameplay loop. |
| Presence | None by default | Presence should not convert by default because active-time XP is intentionally low-friction and more gameable. |

Native mcMMO skills currently available in the local mcMMO source are:

```text
ACROBATICS, ALCHEMY, ARCHERY, AXES, CROSSBOWS, EXCAVATION, FISHING,
HERBALISM, MACES, MINING, REPAIR, SALVAGE, SMELTING, SPEARS, SWORDS,
TAMING, TRIDENTS, UNARMED, WOODCUTTING
```

## Config Shape

Default `conversion.yml`:

```yaml
enabled: false
consume-mode: ledger
default-more-levels-per-mcmmo-level: 10
minimum-more-levels: 250
maximum-mcmmo-levels-per-transaction: 25
confirmation-expiry-seconds: 60
require-target-cap-room: true
require-source-skill-permission: true
history-limit: 25
skills:
  exploration:
    enabled: true
    targets:
      excavation:
        enabled: true
        more-levels-per-mcmmo-level: 10
      mining:
        enabled: true
        more-levels-per-mcmmo-level: 10
  aquatics:
    enabled: true
    targets:
      fishing:
        enabled: true
      tridents:
        enabled: true
  airborne:
    enabled: true
    targets:
      acrobatics:
        enabled: true
      tridents:
        enabled: true
  defense:
    enabled: true
    targets:
      acrobatics:
        enabled: true
      repair:
        enabled: true
  arcane:
    enabled: true
    targets:
      alchemy:
        enabled: true
      repair:
        enabled: true
      salvage:
        enabled: false
  husbandry:
    enabled: true
    targets:
      taming:
        enabled: true
      herbalism:
        enabled: true
  action:
    enabled: false
    targets: {}
  presence:
    enabled: false
    targets: {}
```

## Open Decisions

- Whether target-specific daily/weekly caps are needed before first release.
- Whether source-aware conversion should come later, for example Airborne `riptide` source credit favoring Tridents, or Exploration `mounted_travel` source credit favoring Taming.
