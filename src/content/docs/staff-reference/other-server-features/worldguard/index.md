---
title: "WorldGuard Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for WorldGuard."
---

Public-safe technical notes for staff who configure or support WorldGuard on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/rg info` | `worldguard.region.info.*` | Shows region information at the current location. |
| `/rg define <id>` | `worldguard.region.define` | Defines a region from the WorldEdit selection. |
| `/rg flag <id> <flag> <value>` | `worldguard.region.flag.regions.*` | Sets a region flag. |
| `/rg addmember <id> <player>` | `worldguard.region.addmember.*` | Adds a member. |
| `/wg reload` | `worldguard.reload` | Reloads WorldGuard configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `worldguard.region.info.*` | Reads region information. | Support/build staff |
| `worldguard.region.define` | Defines regions. | Authorized builders/staff |
| `worldguard.region.flag.regions.*` | Changes region flags. | Senior build/admin staff |
| `worldguard.region.bypass.*` | Bypasses protection in worlds. | Emergency/admin use only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- FAWE/WorldEdit supplies selections.
- BlueBridgeWG can expose regions to BlueMap.
- WorldGuardExtraFlags adds additional flag types.
- Jobs, 1MB-CMIAPI Forage, mcMMO, shops, events, and other plugins may consult region state.

## Examples

```text
/rg info
/rg define <id>
/rg flag <id> <flag> <value>
```

## Troubleshooting

- Use `/rg info` and identify all overlapping regions, priorities, parent relations, and global region.
- Check the exact flag type and inheritance before changing it.
- Test as a non-bypassing account because staff bypass can hide the real behavior.

## Official references

- [Official documentation](https://worldguard.enginehub.org/en/latest/)
- [Regions and flags](https://worldguard.enginehub.org/en/latest/regions/)
- [Permissions](https://worldguard.enginehub.org/en/latest/permissions/)

## Reference Links

- [Player guide](/player-guides/other-server-features/worldguard/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/worldguard/)
- [Official plugin documentation](https://worldguard.enginehub.org/en/latest/)
