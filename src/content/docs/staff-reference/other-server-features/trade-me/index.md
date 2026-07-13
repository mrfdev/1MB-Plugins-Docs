---
title: "TradeMe Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for TradeMe."
---

Public-safe technical notes for staff who configure or support TradeMe on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/trade reload` | `trademe.command.reload` | Reloads TradeMe. |
| `/trade force <player> <player>` | `trademe.command.force` | Forces/opens a trade in supported syntax; rarely needed. |
| `/trade purge` | `trademe.command.purge` | Purges trade data/logs according to installed syntax; destructive. |
| `/trade log` | `trademe.command.log` | Accesses trade logging where supported. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `trademe.trade` | Base item trading. | Players |
| `trademe.moneytrade` | Money offers. | Players where enabled |
| `trademe.exptrade` | Experience offers. | Players where enabled |
| `trademe.mcmmotrade` | mcMMO trade type. | Only if intentionally enabled |
| `trademe.jobstrade` | Jobs trade type. | Only if intentionally enabled |
| `trademe.command.reload` | Reload access. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- CMILib is a hard dependency in the installed build.
- Vault, mcMMO, Jobs, PlaceholderAPI, and other plugins can add trade types or context.
- ItemSoulBind and custom-item metadata need compatibility testing to prevent invalid transfers.

## Examples

```text
/trade reload
/trade force <player> <player>
/trade purge
```

## Troubleshooting

- Capture both UUIDs, timestamp, exact offered items/values, and final outcome.
- Check TradeMe logs plus economy/inventory/plugin-specific state before compensation.
- Do not reproduce a suspected duplication issue on production with valuable items.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/trademe-with-api-to-create-custom-trades.7544/)

## Reference Links

- [Player guide](/player-guides/other-server-features/trade-me/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/trade-me/)
- [Official plugin documentation](https://www.spigotmc.org/resources/trademe-with-api-to-create-custom-trades.7544/)
