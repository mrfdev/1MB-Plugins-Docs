# AnimatedScoreboard Staff Reference

Public-safe technical notes for staff who configure or support AnimatedScoreboard on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/asb reload` | `animatedscoreboard.admin` | Reloads scoreboard files in builds using the common `asb` command label. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `animatedscoreboard.admin` | Administrative command access in common builds. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- PlaceholderAPI provides most dynamic values; test each placeholder independently before blaming animation rules.
- Board assignment, update rate, line length, and animation files are version specific.
- The installed command label and permission must be confirmed with `/help AnimatedScoreboard` because older builds differ.

## Examples

```text
/asb reload
```

## Troubleshooting

- Check for scoreboard conflicts with minigames, CMI, or another sidebar owner.
- Test unresolved placeholders with PlaceholderAPI before reloading the board.
- Preserve the console parse error and the affected board file name when reporting formatting problems.

## Official references

- [Official Spigot documentation](https://www.spigotmc.org/resources/animatedscoreboard.20848/field?field=documentation)
