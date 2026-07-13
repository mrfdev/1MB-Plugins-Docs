---
title: "MobFarmManager Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for MobFarmManager."
---

Public-safe technical notes for staff who configure or support MobFarmManager on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/mfm list <chunk-radius>` | `mfm.command.clean` | Lists highly populated chunks in common builds; installed permission metadata groups diagnostics with clean access. |
| `/mfm chunks` | `mfm.command.clean` | Lists active hopper-heavy chunks in common builds. |
| `/mfm clean <chunk-radius>` | `mfm.command.clean` | Cleans configured entities around players; review scope first. |
| `/mfm reload` | `mfm.command.reload` | Reloads configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `mfm.command.clean` | Installed build permission for clean/diagnostic command access. | Senior staff only |
| `mfm.command.reload` | Reload access. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- CMILib is a hard dependency in the installed build.
- 1MB-CMIAPI Hoppers and SparkReviewer optionally consume MobFarmManager context.
- BentoBox Limits controls per-island caps separately; Paper settings and farm plugins may also affect spawning.

## Examples

```text
/mfm list <chunk-radius>
/mfm chunks
/mfm clean <chunk-radius>
```

## Troubleshooting

- Identify entity type, count, chunk, grouped radius, world, and whether mobs are named/tamed/equipped.
- Use list/chunks diagnostics before cleanup and preserve coordinates.
- Review limit messages and config precedence before raising a cap or granting bypass.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/mob-farm-manager-supports-1-7-10-up-to-1-21-hopper-support.15127/)
- [Official discussion](https://www.spigotmc.org/threads/mob-farm-manager-supports-1-7-10-up-to-26-2-hopper-support-paid.106779/)

## Reference Links

- [Player guide](/player-guides/other-server-features/mob-farm-manager/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/mob-farm-manager/)
- [Official plugin documentation](https://www.spigotmc.org/resources/mob-farm-manager-supports-1-7-10-up-to-1-21-hopper-support.15127/)
