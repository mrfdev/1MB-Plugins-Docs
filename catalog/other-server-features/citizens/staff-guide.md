# Citizens Staff Reference

Public-safe technical notes for staff who configure or support Citizens on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/npc create <name>` | `citizens.npc.create` | Creates an NPC. |
| `/npc select` | `citizens.npc.select` | Selects the targeted NPC. |
| `/npc info` | `citizens.npc.info` | Shows selected NPC information. |
| `/npc remove` | `citizens.npc.remove` | Removes the selected NPC. |
| `/citizens reload` | `citizens.admin` | Reloads Citizens configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `citizens.npc.*` | NPC editing commands. | Builders/staff, narrowly |
| `citizens.admin` | Citizens administration. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Menus, shops, commands, quests, and dialogue may come from a separate trait or plugin.
- Record NPC ID as well as name; names are not guaranteed unique.
- Back up Citizens data before bulk edits or migrations.

## Examples

```text
/npc create <name>
/npc select
/npc info
```

## Troubleshooting

- Use `/npc info` on the selected NPC and record its numeric ID.
- Confirm the expected trait/integration is attached and loaded.
- Check world, protection, interaction hand, and cooldown before recreating an NPC.

## Official references

- [Official wiki](https://wiki.citizensnpcs.co/)
- [Website](https://www.citizensnpcs.co/)
