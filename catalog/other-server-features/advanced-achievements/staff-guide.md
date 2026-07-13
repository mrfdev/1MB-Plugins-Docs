# AdvancedAchievements Staff Reference

Public-safe technical notes for staff who configure or support AdvancedAchievements on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/aach reload` | `advancedachievements.admin` | Reloads achievement configuration after validation. |
| `/aach give <player> <achievement>` | `advancedachievements.admin` | Grants a configured achievement when supported by the installed fork. |
| `/aach reset <player>` | `advancedachievements.admin` | Resets achievement data; use only with an approved recovery case. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `advancedachievements.*` | Full plugin access. | Server administrators only |
| `advancedachievements.admin` | Administrative command access in current forks. | Senior staff only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%aach_achievements%` | Example achievement-count placeholder; verify the installed expansion and exact token before use. |

## Configuration and integrations

- Achievement categories and command syntax are configuration and fork dependent.
- Reward commands can integrate with CMI, economy, items, and permissions; review commands as privileged automation.
- Back up achievement data before resets, migrations, or large category changes.

## Examples

```text
/aach reload
/aach give <player> <achievement>
/aach reset <player>
```

## Troubleshooting

- Confirm the achievement category is enabled and the event is counted in the player world.
- Check whether a prerequisite, excluded material, or disabled-world rule applies.
- Use the installed `/aach` help output as the authority for administrative syntax.

## Official references

- [1MoreBlock-maintained source](https://github.com/mrfdev/advanced-achievements)
