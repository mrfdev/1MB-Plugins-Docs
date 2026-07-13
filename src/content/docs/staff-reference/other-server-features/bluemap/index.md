---
title: "BlueMap Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for BlueMap."
---

Public-safe technical notes for staff who configure or support BlueMap on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/bluemap` | `bluemap.command.status` | Shows installed BlueMap command help. |
| `/bluemap status` | `bluemap.command.status` | Reports render and web-app status. |
| `/bluemap reload` | `bluemap.command.reload` | Reloads BlueMap configuration. |
| `/bluemap render <map>` | `bluemap.command.render` | Queues a map render. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `bluemap.command.status` | Reads BlueMap state. | Support staff |
| `bluemap.command.reload` | Reloads configuration. | Senior staff |
| `bluemap.command.render` | Controls rendering. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- BlueBridge exports WorldBorder and WorldGuard context to BlueMap.
- 1MB-MapHide controls player visibility for privacy and recording mode.
- Rendering and web serving are separate concerns; diagnose each independently.

## Examples

```text
/bluemap
/bluemap status
/bluemap reload
```

## Troubleshooting

- Check `/bluemap status` for render queues and web-app state.
- Confirm the map is enabled and the affected coordinates are within its render bounds.
- For hidden players, check 1MB-MapHide/privacy state before BlueMap itself.

## Official references

- [Official wiki](https://bluemap.bluecolored.de/wiki/)
- [GitHub](https://github.com/BlueMap-Minecraft)

## Reference Links

- [Player guide](/player-guides/other-server-features/bluemap/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/bluemap/)
- [Official plugin documentation](https://bluemap.bluecolored.de/wiki/)
