---
title: "Supported Client Versions (ViaVersion and ViaBackwards) Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for Supported Client Versions (ViaVersion and ViaBackwards)."
---

Public-safe technical notes for staff who configure or support Supported Client Versions (ViaVersion and ViaBackwards) on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/viaversion list` | `viaversion.admin` | Lists connected player protocol versions. |
| `/viaversion pps` | `viaversion.admin` | Shows packet-rate diagnostics. |
| `/viaversion dump` | `viaversion.admin` | Creates a diagnostic dump; review before sharing. |
| `/viaversion reload` | `viaversion.admin` | Reloads ViaVersion configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `viaversion.admin` | All ViaVersion administrative commands in the installed build. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- ViaBackwards depends on the ViaVersion protocol platform.
- Geyser uses separate Bedrock translation and may soft-integrate with ViaVersion.
- LuckPerms and 1MB-CMIAPI Diagnostics can observe protocol/version context.
- Diagnostic dumps can expose server/plugin details; review before posting publicly.

## Examples

```text
/viaversion list
/viaversion pps
/viaversion dump
```

## Troubleshooting

- Record exact client version, server native version, ViaVersion/ViaBackwards builds, and disconnect message.
- Reproduce without client protocol/network mods where possible.
- Check official support tables before changing blocked-version or protocol settings.

## Official references

- [ViaVersion website](https://viaversion.com/)
- [ViaVersion GitHub](https://github.com/ViaVersion/ViaVersion)
- [ViaBackwards](https://viaversion.com/backwards)
- [Supported versions](https://viaversion.atlassian.net/wiki/spaces/VIAVERSION/pages/299139073/Supported+Versions)

## Reference Links

- [Player guide](/player-guides/other-server-features/supported-client-versions/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/supported-client-versions/)
- [Official plugin documentation](https://viaversion.com/)
