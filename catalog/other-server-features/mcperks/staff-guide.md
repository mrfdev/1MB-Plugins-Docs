# MCPerks Staff Reference

Public-safe technical notes for staff who configure or support MCPerks on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mcperks` | `mcperks.use` | Opens the perk GUI for testing. |
| `/mcperks <perk>` | `Per-perk configured permission` | Activates a named perk in builds/configurations exposing direct activation. |
| `/mcperksadmin reload` | `mcperks.admin` | Typical administrative reload label; confirm against installed help. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `mcperks.use` | Common base menu access; verify installed node. | Players where enabled |
| `mcperks.<perk>` | Common per-perk pattern; exact nodes are configured. | Ranks individually |
| `mcperks.admin` | Administrative access in common builds. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Perk definitions can execute commands or reward files and must be reviewed as privileged configuration.
- mcMMO is an optional integration for an mcMMO-related perk.
- LuckPerms grants per-rank access; economy or vote systems may award temporary access.

## Examples

```text
/mcperks
/mcperks <perk>
/mcperksadmin reload
```

## Troubleshooting

- Confirm the perk permission, cooldown, queue state, world, and conflict rules.
- Use the installed help/config as authority because perk names are server-defined.
- Record start/end messages and duration before manually re-granting a perk.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/mcperks.27898/)
- [Official discussion](https://www.spigotmc.org/threads/mcperks-advanced-perk-plugin-paid.174122/)
