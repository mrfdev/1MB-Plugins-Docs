---
title: "PyroFarming Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for PyroFarming."
---

Public-safe technical notes for staff who configure or support PyroFarming on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/farm givegrowstation <player> ...` | `pyrofarming.command.givegrowstation` | Gives a configured grow station. |
| `/farm giveharvestable <player> ...` | `pyrofarming.command.giveharvestitem` | Gives a harvestable item. |
| `/farm givecustomitem <player> ...` | `pyrofarming.command.givecustomitem` | Gives a custom farming item. |
| `/farm addxp <player> <amount>` | `pyrofarming.command.addxp` | Adds farming XP. |
| `/farm addelysium <player> <amount>` | `pyrofarming.command.addelysium` | Adds Elysium. |
| `/farm reload` | `pyrofarming.command.reload` | Reloads configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `pyrofarming.command.farmmenu` | Farm menu. | Players |
| `pyrofarming.command.farmshop` | Farm shop. | Players where enabled |
| `pyrofarming.command.codex` | Farm codex. | Players |
| `pyrofarming.command.reload` | Reload access. | Server administrators |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%pyrofarming_level%` | Farming level; verify current placeholder list. |
| `%pyrofarming_elysium%` | Elysium balance; verify formatting variant. |
| `%pyrofarming_currentxp%` | Current farming XP. |

## Configuration and integrations

- PyroLib is a hard dependency.
- Vault plus the configured economy powers prices; PlaceholderAPI provides display values.
- Land protection and custom-item plugins must preserve farming item metadata.
- Farm friends grants feature access, not ownership in BentoBox, PlotSquared, Bolt, or WorldGuard.

## Examples

```text
/farm givegrowstation <player> ...
/farm giveharvestable <player> ...
/farm givecustomitem <player> ...
```

## Troubleshooting

- Capture custom item type, metadata/lore, world, protection owner, and action.
- Check crop/grow-station placement rules and allowed worlds.
- Verify economy/Elysium/XP changes independently before compensation.

## Official references

- [Official documentation](https://pyrotempus.gitbook.io/pyro-plugins/pyrofarming)
- [Commands and permissions](https://pyrotempus.gitbook.io/pyro-plugins/pyrofarming/setup-manual/commands)

## Reference Links

- [Player guide](/player-guides/other-server-features/pyrofarming/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/pyrofarming/)
- [Official plugin documentation](https://pyrotempus.gitbook.io/pyro-plugins/pyrofarming)
