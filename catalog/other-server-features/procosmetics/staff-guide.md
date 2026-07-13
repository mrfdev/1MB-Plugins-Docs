# ProCosmetics Staff Reference

Public-safe technical notes for staff who configure or support ProCosmetics on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/procosmetics reload` | `procosmetics.command` | Reloads ProCosmetics configuration. |
| `/procosmetics info <player>` | `procosmetics.command` | Shows cosmetic account information. |
| `/procosmetics add <player> <type> <amount>` | `procosmetics.command` | Adds configured currency/ammo/rewards. |
| `/procosmetics equip <player> <category> <cosmetic>` | `procosmetics.command` | Equips a cosmetic for support/testing. |
| `/procosmetics unequipallplayers` | `procosmetics.command` | Clears cosmetics globally; use only for an incident. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `procosmetics.command.cosmetics` | Opens the player menu. | Players |
| `procosmetics.command.equip` | Direct equip command. | Players where enabled |
| `procosmetics.command.unequipall` | Clears own cosmetics. | Players |
| `procosmetics.command` | Base administrative command. | Senior staff only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%procosmetics_coins%` | Common player coin-value placeholder; verify current wiki syntax. |
| `%procosmetics_treasurechests%` | Common treasure-chest value pattern; verify installed version. |

## Configuration and integrations

- Permissions unlock categories/items; PlaceholderAPI can display balances and state.
- World and game-state restrictions prevent cosmetics where they interfere with gameplay.
- Resource-pack, protocol, disguise, or packet behavior may affect how a cosmetic appears to different clients.

## Examples

```text
/procosmetics reload
/procosmetics info <player>
/procosmetics add <player> <type> <amount>
```

## Troubleshooting

- Check ownership/unlock permission, category state, world restriction, and cooldown.
- Test self-view separately from whether other players can see the cosmetic.
- Record cosmetic category/name and client edition/version for rendering issues.

## Official references

- [Official GitHub wiki](https://github.com/File14/ProCosmetics/wiki)
- [Commands](https://github.com/File14/ProCosmetics/wiki/Commands)
- [Official Spigot discussion](https://www.spigotmc.org/threads/procosmetics-350-cosmetics-treasurechests-eula-compliant-1-16-1-21-black-friday-30.284429/)
