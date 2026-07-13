# VotingPlugin Staff Reference

Public-safe technical notes for staff who configure or support VotingPlugin on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/av help` | `VotingPlugin.admin` | Shows administrative VotingPlugin help in common setups. |
| `/av vote <player> <site>` | `VotingPlugin.admin` | Simulates/processes a vote for testing; use an approved test case. |
| `/av reload` | `VotingPlugin.admin` | Reloads VotingPlugin. |
| `/vote top` | `VotingPlugin.Commands.TopVoter` | Checks public ranking output. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `VotingPlugin.Commands.Vote` | Player `/vote` access in common configs. | Players |
| `VotingPlugin.Commands.VoteShop` | Vote shop. | Players where enabled |
| `VotingPlugin.Commands.TopVoter` | Top-voter view. | Players |
| `VotingPlugin.admin` | Administrative controls. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%VotingPlugin_Total_AllTime%` | All-time vote total in common expansion syntax. |
| `%VotingPlugin_Points%` | Vote points. |
| `%VotingPlugin_DailyTotal%` | Daily total; verify exact placeholder case/version. |

## Configuration and integrations

- Votifier/NuVotifier receives signed vote callbacks; VotingPlugin consumes and rewards them.
- PinataParty or other events can use vote milestones.
- PlaceholderAPI and ajLeaderboards can display totals/rankings.
- Vote-site tokens/keys and Votifier keys are secrets and must never be published.

## Examples

```text
/av help
/av vote <player> <site>
/av reload
```

## Troubleshooting

- Capture player name/UUID, vote site, timestamp/timezone, and site confirmation.
- Check inbound Votifier receipt before VotingPlugin reward processing.
- Review offline queue, duplicate/cooldown state, reward file, and economy/item delivery before manual grant.

## Official references

- [Official wiki](https://github.com/BenCodez/VotingPlugin/wiki)
- [GitHub](https://github.com/BenCodez/VotingPlugin)
- [Official Spigot resource](https://www.spigotmc.org/resources/votingplugin.15358/)
