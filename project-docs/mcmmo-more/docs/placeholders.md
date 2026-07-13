# Placeholders

PlaceholderAPI identifier:

```text
onembmcmmore
```

## Static Placeholders

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_enabled%` | Plugin master switch state. |
| `%onembmcmmore_mcmmo_present%` | Whether mcMMO is installed. |
| `%onembmcmmore_mcmmo_enabled%` | Whether mcMMO is enabled. |
| `%onembmcmmore_cmiapi_bridge_available%` | Whether `1MB-CMIAPI-Lib` is installed and enabled. |
| `%onembmcmmore_cmiapi_bridge_registered%` | Whether mcMMO More registered with the 1MB CMIAPI feature registry. |
| `%onembmcmmore_cmiapi_bridge_status%` | Short CMIAPI bridge status. |
| `%onembmcmmore_skill_count%` | Number of configured custom skills. |
| `%onembmcmmore_mcmmo_power_level%` | Native mcMMO power level read from mcMMO's API, or `0` when unavailable. |
| `%onembmcmmore_power_level%` | Sum of the player's configured mcMMO More skill levels. |
| `%onembmcmmore_combined_power_level%` | Native mcMMO power plus mcMMO More power for display only. |

## Skill Progress Placeholders

Replace `<skill>` with a configured skill id such as `exploration`, `aquatics`, `airborne`, `defense`, `arcane`, or `husbandry`.

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_level_<skill>%` | Player's level for a skill. |
| `%onembmcmmore_xp_<skill>%` | Player's current XP toward the next level. |
| `%onembmcmmore_xp_needed_<skill>%` | XP needed for the next level. |
| `%onembmcmmore_xp_remaining_<skill>%` | XP remaining until the next level. |
| `%onembmcmmore_total_xp_<skill>%` | Player's total earned XP for a skill. |

## Source Placeholders

Replace `<source>` with a source id under the parent skill, such as `running`, `diving`, `dragon_breath`, or `breeding`.

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_source_xp_<skill>_<source>%` | Player's total earned XP from one source. |
| `%onembmcmmore_source_total_xp_<skill>_<source>%` | Alias for source total XP. |
| `%onembmcmmore_source_percent_<skill>_<source>%` | Percent of the parent skill's total XP from one source. |

## Skill Metadata Placeholders

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_skill_enabled_<skill>%` | Whether a skill is enabled in config. |
| `%onembmcmmore_skill_icon_<skill>%` | Configured Unicode icon for a skill. |
| `%onembmcmmore_skill_display_<skill>%` | Configured display name for a skill. |
| `%onembmcmmore_skill_visual_<skill>%` | Configured icon plus display name for a skill. |
| `%onembmcmmore_skill_permission_<skill>%` | Permission required to earn that skill. |
| `%onembmcmmore_skill_unlocked_<skill>%` | Whether the online player has that skill permission. |

## Perk Placeholders

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_perk_level_<skill>%` | Highest unlocked perk milestone level, or `0`. |
| `%onembmcmmore_perk_next_level_<skill>%` | Next perk milestone level, or `0`. |
| `%onembmcmmore_perk_cooldown_<skill>%` | Remaining perk cooldown seconds for the player. |

## Top Placeholders

Ranks are `1` through `100`.

| Placeholder | Meaning |
| --- | --- |
| `%onembmcmmore_top_name_<skill>_<rank>%` | Leaderboard player name at the rank. |
| `%onembmcmmore_top_level_<skill>_<rank>%` | Leaderboard level at the rank. |
| `%onembmcmmore_top_total_xp_<skill>_<rank>%` | Leaderboard total XP at the rank. |

## Examples

```text
%onembmcmmore_combined_power_level%
%onembmcmmore_level_exploration%
%onembmcmmore_xp_remaining_aquatics%
%onembmcmmore_source_xp_exploration_running%
%onembmcmmore_source_percent_aquatics_diving%
%onembmcmmore_source_xp_arcane_dragon_breath%
%onembmcmmore_skill_unlocked_airborne%
%onembmcmmore_perk_level_exploration%
%onembmcmmore_top_name_exploration_1%
```
