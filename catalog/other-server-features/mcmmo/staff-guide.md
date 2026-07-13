# mcMMO Staff Reference

Public-safe technical notes for staff who configure or support mcMMO on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mcinspect <player>` | `mcmmo.commands.inspect` | Inspects a player's mcMMO state in builds exposing this alias. |
| `/addlevels <player> <skill> <amount>` | `mcmmo.commands.addlevels` | Adds skill levels for approved recovery/admin cases. |
| `/addxp <player> <skill> <amount>` | `mcmmo.commands.addxp` | Adds skill XP. |
| `/mcrefresh <player>` | `mcmmo.commands.mcrefresh` | Refreshes ability cooldowns. |
| `/mcconvert` | `mcmmo.commands.mcconvert` | Migration tool; do not run casually. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `mcmmo.defaults` | Standard recommended player permission bundle. | Players |
| `mcmmo.skills.*` | Skill access. | Players by world/mode |
| `mcmmo.ability.*` | Active/passive abilities. | Players by balance policy |
| `mcmmo.commands.*` | Command family. | Grant narrowly |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%mcmmo_power_level%` | Total power level in common mcMMO PlaceholderAPI expansions. |
| `%mcmmo_level_<skill>%` | Skill level pattern in common expansions. |
| `%mcmmo_xp_<skill>%` | Current skill XP pattern; verify expansion syntax. |

## Configuration and integrations

- PlaceholderAPI exposes skill data for menus and leaderboards.
- Jobs can reward overlapping actions; balance both systems together.
- TradeMe can expose mcMMO-related trade support; 1MB-CMIAPI Menu, Nick, and Boosters optionally integrate with mcMMO.
- WorldGuard can affect skill/ability behavior by region.

## Examples

```text
/mcinspect <player>
/addlevels <player> <skill> <amount>
/addxp <player> <skill> <amount>
```

## Troubleshooting

- Check whether the skill, material/action, and world are enabled.
- Separate mcMMO XP, Jobs XP, vanilla XP, and plugin booster messages.
- Use player UUID and exact before/after values for recovery cases.

## Official references

- [Official wiki](https://wiki.mcmmo.org/)
- [Permissions](https://wiki.mcmmo.org/permissions)
- [GitHub](https://github.com/mcMMO-Dev/mcMMO)
