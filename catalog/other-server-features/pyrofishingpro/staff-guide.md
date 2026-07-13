# PyroFishingPro Staff Reference

Public-safe technical notes for staff who configure or support PyroFishingPro on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/fish reload` | `fish.admin` | Reloads PyroFishingPro. |
| `/fish give <player> ...` | `fish.admin` | Gives custom fish/items through installed syntax. |
| `/fish addentropy <player> <amount>` | `fish.admin` | Adds Entropy. |
| `/fish addxp <player> <amount>` | `fish.admin` | Adds fishing XP. |
| `/ft start <type>` | `fish.tournaments` | Starts a fishing tournament. |
| `/ft stop <rewards>` | `fish.tournaments` | Stops a tournament with explicit reward behavior. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `pf.menu` | Fishing menu. | Players |
| `pf.shop` | Fish shop. | Players where enabled |
| `pf.bag` | Fish bag. | Players |
| `pf.skills` | Skills menu. | Players |
| `fish.admin` | Fishing administration. | Server administrators |
| `fish.tournaments` | Tournament controls. | Event staff only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%pyrofishingpro_level%` | Fishing level. |
| `%pyrofishingpro_entropy%` | Entropy balance. |
| `%pyrofishingpro_totalcustomcaught%` | Total custom fish caught. |
| `%pyrofishingpro_timetilltournament%` | Time until next tournament. |
| `%pyrofishingpro_tournament_first_name%` | Current tournament first-place player. |

## Configuration and integrations

- PyroLib is a hard dependency.
- Vault/CMI economy supports the shop; PlaceholderAPI exposes detailed statistics.
- Jobs and 1MB-CMIAPI modules can integrate with PyroFishingPro.
- Custom fish, rods, augments, bait, and deliveries require item-metadata compatibility.

## Examples

```text
/fish reload
/fish give <player> ...
/fish addentropy <player> <amount>
```

## Troubleshooting

- Identify whether the catch is vanilla or custom and capture full item metadata.
- Check biome, water, world, bait, tournament, and enabled-feature rules.
- For rewards, separate fish item, money, Entropy, XP, delivery, and tournament outcomes.

## Official references

- [Official documentation](https://pyrotempus.gitbook.io/pyro-plugins/pyrofishingpro)
- [Commands and permissions](https://pyrotempus.gitbook.io/pyro-plugins/pyrofishingpro/setup-manual/commands)
- [Placeholders](https://pyrotempus.gitbook.io/pyro-plugins/pyrofishingpro/setup-manual/placeholders)
