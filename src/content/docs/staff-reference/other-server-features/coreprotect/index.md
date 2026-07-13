---
title: "CoreProtect Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for CoreProtect."
---

Public-safe technical notes for staff who configure or support CoreProtect on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/co inspect` | `coreprotect.inspect` | Toggles interactive inspection. |
| `/co lookup <parameters>` | `coreprotect.lookup` | Queries logged actions. |
| `/co rollback <parameters>` | `coreprotect.rollback` | Rolls back matching actions. |
| `/co restore <parameters>` | `coreprotect.restore` | Restores a prior rollback. |
| `/co status` | `coreprotect.status` | Shows CoreProtect status. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `coreprotect.inspect` | Interactive inspection. | Moderation staff |
| `coreprotect.lookup` | Log search. | Moderation staff |
| `coreprotect.rollback` | World-changing rollback. | Senior staff only |
| `coreprotect.restore` | World-changing restore. | Senior staff only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- 1MB-AntiXRay and 1MB-XRayHunter use CoreProtect records for mining review.
- Use preview mode and narrow user/time/radius/action filters before rollback.
- Database retention and excluded actions affect what can be recovered.

## Examples

```text
/co inspect
/co lookup <parameters>
/co rollback <parameters>
```

## Troubleshooting

- Verify the world, radius, time expression, action, and user filters.
- Run a lookup or preview before rollback and record the command used.
- If data appears absent, check logging coverage and retention rather than broadening a rollback blindly.

## Official references

- [Official documentation](https://docs.coreprotect.net/)
- [Commands](https://docs.coreprotect.net/commands/)
- [Permissions](https://docs.coreprotect.net/permissions/)

## Reference Links

- [Player guide](/player-guides/other-server-features/coreprotect/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/coreprotect/)
- [Official plugin documentation](https://docs.coreprotect.net/)
