# Permissions

## Command Permissions

| Permission | Default | Allows |
| --- | --- | --- |
| `onembmcmmore.command.use` | `true` | `/mcmmore`, own stats, skills, help, activate, and info. |
| `onembmcmmore.command.top` | `true` | `/mcmmore top` and `/mcmmore top <skill>`. |
| `onembmcmmore.command.convert` | `true` | Conversion commands when `conversion.yml` enables conversion. |
| `onembmcmmore.admin` | `op` | Reload, reset, debug, and other-player inspection. |

## Skill Permissions

Every configured parent skill uses this pattern:

```text
onembmcmmore.skills.<skill>
```

Current configured skill permissions:

| Permission | Default | Skill |
| --- | --- | --- |
| `onembmcmmore.skills.exploration` | `false` | Exploration |
| `onembmcmmore.skills.aquatics` | `false` | Aquatics |
| `onembmcmmore.skills.airborne` | `false` | Airborne |
| `onembmcmmore.skills.defense` | `false` | Defense |
| `onembmcmmore.skills.arcane` | `false` | Arcane |
| `onembmcmmore.skills.husbandry` | `false` | Husbandry |
| `onembmcmmore.skills.action` | `false` | Action |

A skill permission is always required to earn XP. If a skill is disabled in config, it grants no XP even when the player has permission.

LuckPerms example:

```text
lp group default permission set onembmcmmore.skills.exploration true
```

## Conversion Permissions

Conversion also requires path permissions unless the sender has `onembmcmmore.admin`.

| Permission Pattern | Allows |
| --- | --- |
| `onembmcmmore.convert.<more-skill>` | Opening conversion offers for one More skill. |
| `onembmcmmore.convert.<more-skill>.<mcmmo-skill>` | Converting one More skill into one native mcMMO target. |

Current conversion path permissions:

- `onembmcmmore.convert.exploration`
- `onembmcmmore.convert.exploration.excavation`
- `onembmcmmore.convert.exploration.mining`
- `onembmcmmore.convert.aquatics`
- `onembmcmmore.convert.aquatics.fishing`
- `onembmcmmore.convert.aquatics.tridents`
- `onembmcmmore.convert.airborne`
- `onembmcmmore.convert.airborne.acrobatics`
- `onembmcmmore.convert.airborne.tridents`
- `onembmcmmore.convert.defense`
- `onembmcmmore.convert.defense.acrobatics`
- `onembmcmmore.convert.defense.repair`
- `onembmcmmore.convert.arcane`
- `onembmcmmore.convert.arcane.alchemy`
- `onembmcmmore.convert.arcane.repair`
- `onembmcmmore.convert.arcane.salvage`
- `onembmcmmore.convert.husbandry`
- `onembmcmmore.convert.husbandry.taming`
- `onembmcmmore.convert.husbandry.herbalism`

Example:

```text
lp group default permission set onembmcmmore.command.convert true
lp group default permission set onembmcmmore.convert.exploration true
lp group default permission set onembmcmmore.convert.exploration.mining true
```
