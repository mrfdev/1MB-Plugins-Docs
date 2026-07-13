# PlayerShopGUIPlus Staff Reference

Public-safe technical notes for staff who configure or support PlayerShopGUIPlus on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/playershop reload` | `playershopguiplus.reload` | Reloads configuration. |
| `/playershop player <name>` | `playershopguiplus.playershop.player` | Reviews a player's shop. |
| `/playershop cancelothers` | `playershopguiplus.cancelothers` | Cancels another player's listing through supported syntax. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `playershopguiplus.playershop.sell` | Creates listings. | Players |
| `playershopguiplus.playershop.player` | Browses player listings. | Players |
| `playershopguiplus.reload` | Reload access. | Server administrators |
| `playershopguiplus.cancelothers` | Cancels others' listings. | Senior staff only |
| `playershopguiplus.tax.exempt` | Bypasses listing tax. | Only where policy explicitly allows |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Vault/CMI economy handles payment.
- Item metadata, container items, soul binding, and custom items require compatibility review.
- Taxes and refunds must align with economy policy and audit expectations.

## Examples

```text
/playershop reload
/playershop player <name>
/playershop cancelothers
```

## Troubleshooting

- Capture listing ID/owner, exact item metadata, price, tax, and transaction time.
- Check expired/cancelled/claim storage before replacing an item or payment.
- Verify economy withdrawal and deposit separately to avoid duplicate compensation.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/playershopguiplus.37707/)
