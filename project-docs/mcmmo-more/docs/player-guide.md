# 1MB mcMMO More Player Guide

## Introduction

1MB mcMMO More adds extra 1MoreBlock skills next to mcMMO. These skills are tracked by this add-on, so they do not appear inside normal mcMMO commands such as `/mcstats` or `/mctop`.

Use `/mcmmore info` in game to see the installed version, starting commands, and the official documentation link.

## How Players Use It

You earn mcMMO More XP by doing enabled activities while your rank has permission for that skill. For example, Exploration can reward natural travel, and Aquatics can reward water movement.

Staff can enable more skill groups over time. If you already have the permission for a skill that is currently disabled, you start earning that skill once staff turn it on.

## Available Features

- Exploration: land movement such as walking, running, sneaking, jumping, and mounted travel when enabled.
- Aquatics: swimming and diving when enabled.
- Airborne: flight-like movement such as elytra, riptide, levitation, wind-charge, and falling routes when enabled.
- Defense: surviving shield blocks, hostile hits, and projectiles when enabled.
- Arcane: enchanting, anvil work, and Dragon Breath bottle collection when enabled.
- Husbandry: successful animal breeding when enabled.
- Action: reserved for a future activity theme.

## Quick Start

1. Run `/mcmmore info` to confirm the add-on is loaded and to open the docs link.
2. Run `/mcmmore stats` to see your mcMMO More levels.
3. Run `/mcmmore skills` to see configured skills and whether they are enabled.
4. Run `/mcmmore help <skill>` to learn what that skill does and what perks it unlocks.
5. Run `/mcmmore top` to see top lists for all mcMMO More skills.

## Commands

- `/mcmmore info`: show plugin info, version/build, starter commands, and docs.
- `/mcmmore stats`: show your mcMMO More levels and XP.
- `/mcmmore skills`: list configured skill groups.
- `/mcmmore help`: show commands available to you.
- `/mcmmore help <skill>`: explain a skill and its perk tiers.
- `/mcmmore activate <skill>`: activate your best unlocked perk for that skill.
- `/mcmmore top`: show compact top lists for every configured skill.
- `/mcmmore top <skill>`: show the top list for one skill.
- `/mcmmore skills convert`: show conversion options when conversion is enabled.
- `/mcmmore skills convert <skill> <mcmmo-skill>`: quote a conversion when available.
- `/mcmmore skills convert <skill> <mcmmo-skill> confirm <token>`: confirm the exact quoted conversion.
- `/mcmmore convert <skill> [mcmmo-skill]`: shorter conversion command.

## Permissions Or Rank Requirements

Your rank must have the matching skill permission before you can earn XP:

```text
onembmcmmore.skills.<skill>
```

Example:

```text
onembmcmmore.skills.exploration
```

Having a permission does not force a skill to be active. If the skill is disabled by staff, it will not grant XP until staff enable it.

## Rewards, Costs, Limits, And Cooldowns

Skills can unlock simple perks at levels 250, 500, and 1000. Perks are activated with `/mcmmore activate <skill>` and then go on cooldown.

The default perk themes are:

- Exploration: short speed and movement bursts.
- Aquatics: short water movement and breathing effects.
- Airborne: short fall-control and mobility effects.
- Defense: short defensive effects.
- Arcane: short focus-style utility effects.
- Husbandry: short calm/regeneration-style effects.

Conversion, when enabled by staff, can let eligible mcMMO More levels be converted into native mcMMO levels. The default flow shows a quote first, then requires a confirmation token or clickable confirmation.

## Placeholders

Scoreboards may use PlaceholderAPI values from this add-on. The most common ones are:

- `%onembmcmmore_power_level%`: your total mcMMO More power.
- `%onembmcmmore_combined_power_level%`: native mcMMO power plus mcMMO More power for display.
- `%onembmcmmore_level_<skill>%`: your level for a skill.
- `%onembmcmmore_xp_remaining_<skill>%`: XP left until the next level.
- `%onembmcmmore_top_name_<skill>_<rank>%`: top player name for a skill rank.

## Important Notes

- Normal mcMMO commands do not show mcMMO More skills.
- Use `/mcmmore stats` instead of `/mcstats` for these custom skills.
- Use `/mcmmore top` instead of `/mctop` for these custom leaderboards.
- Creative, spectator, vanished, or otherwise blocked states may stop XP or perk activation.
- Staff can tune skills, perks, conversion, and feedback over time.

## Related Features

mcMMO More is designed to live next to mcMMO. Native mcMMO levels remain owned by mcMMO, while this add-on owns its own custom skills and playerdata.

## Technical Documentation

Technical docs: https://docs.1moreblock.com/custom-server-plugins/mcmmo-more/
