---
title: "Jobs Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for Jobs."
---

Public-safe technical notes for staff who configure or support Jobs on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/jobs info <job>` | `jobs.command.info` | Inspects configured actions and rewards. |
| `/jobs stats <player>` | `jobs.command.stats.others` | Views another player's job state. |
| `/jobs editjobs` | `jobs.admin.command.editjobs` | Opens job configuration tools where enabled. |
| `/jobs reload` | `jobs.admin.command.reload` | Reloads Jobs configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `jobs.use` | Base Jobs access. | Players |
| `jobs.command.join` | Join command. | Players |
| `jobs.command.quests` | Quest view. | Players |
| `jobs.admin.*` | Administrative Jobs access. | Server administrators only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%jobsr_user_totallevels%` | Total Jobs levels in common Jobs placeholders. |
| `%jobsr_user_points%` | Jobs points in common Jobs placeholders. |
| `%jobsr_user_isin_<job>%` | Whether the player is in a named job; verify exact case and syntax. |

## Configuration and integrations

- CMILib is a hard dependency in the installed build.
- Vault/CMI provide economy; PlaceholderAPI provides display values; WorldGuard can restrict regions.
- 1MB-CMIAPI Menu and Boosters integrate with Jobs; TradeMe can expose Jobs-related trade support.

## Examples

```text
/jobs info <job>
/jobs stats <player>
/jobs editjobs
```

## Troubleshooting

- Use `/jobs info <job>` to confirm the exact action/material and reward.
- Check world/region restrictions, daily limits, place-and-break protection, and ownership rules.
- Inspect job level, payment schedule, and economy delivery separately.

## Official references

- [Official documentation](https://www.zrips.net/jobs/)
- [Commands](https://www.zrips.net/jobs/jobs-commands/)
- [Permissions](https://www.zrips.net/jobs/permissions/)

## Reference Links

- [Player guide](/player-guides/other-server-features/jobs/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/jobs/)
- [Official plugin documentation](https://www.zrips.net/jobs/)
