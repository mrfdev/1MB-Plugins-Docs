# Bolt Staff Reference

Public-safe technical notes for staff who configure or support Bolt on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bolt info` | `bolt.command.info` | Inspects a protection. |
| `/bolt modify` | `bolt.command.modify` | Changes a selected protection when authorized. |
| `/bolt reload` | `bolt.command.reload` | Reloads Bolt configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bolt.command.*` | Bolt command family. | Grant narrowly |
| `bolt.admin` | Administrative bypass/management in common builds. | Senior staff only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- WorldGuard, PlotSquared, and BentoBox still own their region-level access decisions.
- Protection types, automatic locks, and command aliases are configured.
- Audit ownership before overriding or deleting a protection.

## Examples

```text
/bolt info
/bolt modify
/bolt reload
```

## Troubleshooting

- Identify the exact block coordinates, world, owner UUID, and protection type.
- Check region/island/plot permissions before treating Bolt as the source of denial.
- Use the inspect/info flow before any administrative modification.

## Official references

- [Official wiki](https://github.com/pop4959/Bolt/wiki)
- [GitHub](https://github.com/pop4959/Bolt)
