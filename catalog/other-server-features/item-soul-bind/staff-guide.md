# ItemSoulBind Staff Reference

Public-safe technical notes for staff who configure or support ItemSoulBind on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/remoteBindItem <player>` | `itemsoulbind.remotebind` | Binds an item for another player. |
| `/bindInvItems <player>` | `itemsoulbind.bindinvitems` | Binds eligible inventory items. |
| `/returnItems <player>` | `itemsoulbind.returnitems` | Returns tracked bound items where supported. |
| `/isb-reload` | `itemsoulbind.admin` | Reloads ItemSoulBind configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `itemsoulbind.bind` | Binds the held item. | Controlled player features |
| `itemsoulbind.unbind` | Unbinds items. | Staff or tightly controlled players |
| `itemsoulbind.keepondeath` | Keeps eligible bound items on death. | Rank/feature dependent |
| `itemsoulbind.admin` | Administrative access. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- 1MB-CMIAPI VoteTokens optionally integrates with ItemSoulBind for reward-item handling.
- Inventory, death, trade, shop, anvil, and item-transform plugins must be tested with binding metadata.
- Never strip metadata from a valuable item while investigating.

## Examples

```text
/remoteBindItem <player>
/bindInvItems <player>
/returnItems <player>
```

## Troubleshooting

- Capture the item name, material, full lore/metadata, owner UUID, and action that failed.
- Test whether another plugin transformed or serialized the item.
- Use return/admin tools only after verifying ownership and avoiding duplicate recovery.

## Official references

- [Official GitHub repository](https://github.com/mk7a/ItemSoulBind)
