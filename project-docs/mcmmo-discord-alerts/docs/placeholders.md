# Placeholders

The alert uses PlaceholderAPI mcMMO placeholders. These placeholders are resolved for the player who triggered the mcMMO level-up event.

## Power Level

| Placeholder | Meaning |
| --- | --- |
| `%mcmmo_power_level%` | Total mcMMO power level across skills. Used for the title and milestone condition. |

## Gathering Skills

| Placeholder | Skill |
| --- | --- |
| `%mcmmo_level_excavation%` | Excavation |
| `%mcmmo_level_fishing%` | Fishing |
| `%mcmmo_level_herbalism%` | Herbalism |
| `%mcmmo_level_mining%` | Mining |
| `%mcmmo_level_woodcutting%` | Woodcutting |

## Utility Skills

| Placeholder | Skill |
| --- | --- |
| `%mcmmo_level_acrobatics%` | Acrobatics |
| `%mcmmo_level_alchemy%` | Alchemy |
| `%mcmmo_level_repair%` | Repair |
| `%mcmmo_level_salvage%` | Salvage |
| `%mcmmo_level_smelting%` | Smelting |

## Combat Skills

| Placeholder | Skill |
| --- | --- |
| `%mcmmo_level_archery%` | Archery |
| `%mcmmo_level_axes%` | Axes |
| `%mcmmo_level_crossbows%` | Crossbows |
| `%mcmmo_level_maces%` | Maces |
| `%mcmmo_level_swords%` | Swords |
| `%mcmmo_level_spears%` | Spears |
| `%mcmmo_level_taming%` | Taming |
| `%mcmmo_level_tridents%` | Tridents |
| `%mcmmo_level_unarmed%` | Unarmed |

## DiscordSRV Placeholders

The embed also uses DiscordSRV placeholders such as `{displayname}` and `{embedavatarurl}` for player-facing display.

## Notes

If a placeholder returns a non-numeric value, the top-skill sorting expression can fail when the alert fires. Confirm PlaceholderAPI and mcMMO placeholders are registered before testing the alert.
