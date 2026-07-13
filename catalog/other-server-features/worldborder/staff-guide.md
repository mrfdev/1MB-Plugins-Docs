# WorldBorder Staff Reference

Public-safe technical notes for staff who configure or support WorldBorder on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/wb list` | `worldborder.list` | Lists configured world borders. |
| `/wb getmsg` | `worldborder.getmsg` | Shows border message configuration in supported builds. |
| `/wb <world> set <radius>` | `worldborder.set` | Changes a world border; coordinate maps and backups. |
| `/wb <world> fill` | `worldborder.fill` | Generates chunks inside the border; resource intensive. |
| `/wb <world> trim` | `worldborder.trim` | Deletes chunks outside the border; destructive. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `worldborder.list` | Reads border state. | Support staff |
| `worldborder.set` | Changes boundaries. | Server administrators |
| `worldborder.fill` | Chunk generation. | Server administrators |
| `worldborder.trim` | Destructive chunk trimming. | Server owner/approved maintenance only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- BlueBridgeWB can expose border data to BlueMap.
- Multiverse owns world loading; maps, portals, homes, claims, and warps must be reviewed when a border moves.
- Fill/trim operations need disk, CPU, backup, and maintenance planning.

## Examples

```text
/wb list
/wb getmsg
/wb <world> set <radius>
```

## Troubleshooting

- Confirm world, center, radius, shape, and whether vanilla or plugin border triggered.
- Check homes/warps/portals and BlueMap bounds after border changes.
- Never run trim without a verified backup and dry planning.

## Official references

- [Official GitHub repository](https://github.com/Brettflan/WorldBorder)
- [Commands and permissions](https://github.com/Brettflan/WorldBorder/wiki/Commands-and-Permissions)
