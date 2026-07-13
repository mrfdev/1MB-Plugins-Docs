# PyroMining Staff Reference

Public-safe technical notes for staff who configure or support PyroMining on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mine reload` | `pyromining.admin` | Reloads PyroMining in common builds; verify installed permission. |
| `/mine give <player> ...` | `pyromining.admin` | Gives a custom mining item through installed syntax. |
| `/mine addxp <player> <amount>` | `pyromining.admin` | Adds mining XP. |
| `/mine addzeta <player> <amount>` | `pyromining.admin` | Adds Zeta where supported. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `pyromining.admin` | Administrative commands in common builds. | Server administrators only |
| `pyromining.command.*` | Common command namespace; verify exact installed nodes. | Grant narrowly |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%pyromining_level%` | Mining level. |
| `%pyromining_zeta%` | Zeta balance. |
| `%pyromining_currentxp%` | Current mining XP. |
| `%pyromining_stats_artifactsfound%` | Artifacts found. |
| `%pyromining_stats_gemsfound%` | Gemstones found. |

## Configuration and integrations

- PyroLib is a hard dependency in current versions.
- Vault/CMI economy and PlaceholderAPI are optional integrations.
- Natural-ore checks, CoreProtect history, world generation, and custom-item metadata all matter for support.
- 1MB-CMIAPI Nick optionally integrates with PyroMining.

## Examples

```text
/mine reload
/mine give <player> ...
/mine addxp <player> <amount>
```

## Troubleshooting

- Confirm ore type, natural/placed origin, world, Y level, mining level, and cooldown.
- Capture full metadata for artifacts, vessels, requiems, gemstones, and reward items.
- Separate random chance from configuration denial and avoid spawning replacement progression items without audit.

## Official references

- [Official documentation](https://pyrotempus.gitbook.io/pyro-plugins/pyromining)
- [Placeholders](https://pyrotempus.gitbook.io/pyro-plugins/pyromining/setup-manual/placeholders)
