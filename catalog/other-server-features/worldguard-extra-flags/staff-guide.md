# WorldGuardExtraFlags Staff Reference

Public-safe technical notes for staff who configure or support WorldGuardExtraFlags on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/rg flags` | `worldguard.region.info.*` | Lists available flags in supported WorldGuard syntax. |
| `/rg flag <region> <extra-flag> <value>` | `worldguard.region.flag.regions.*` | Sets an extra flag. |
| `/wg reload` | `worldguard.reload` | Reloads WorldGuard and registered flags. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `worldguard.region.flag.regions.*` | Changes region flags. | Senior build/admin staff |
| `worldguard.region.bypass.*` | Bypasses region controls. | Emergency/admin use only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- WorldGuard is the owning platform and must load compatibly.
- Flag names/value types are version specific; use installed flag listings and official repository documentation.
- A plugin targeted by a flag can still have its own permission/protection logic.

## Examples

```text
/rg flags
/rg flag <region> <extra-flag> <value>
/wg reload
```

## Troubleshooting

- Confirm the extra flag registered after startup and appears in the flag list.
- Inspect overlap, priority, parent, global region, and bypass state.
- Test the value syntax against the installed release before reloading production.

## Official references

- [Official GitHub repository](https://github.com/aromaa/WorldGuardExtraFlags)
- [Flag reference](https://github.com/aromaa/WorldGuardExtraFlags/wiki/Flags)
