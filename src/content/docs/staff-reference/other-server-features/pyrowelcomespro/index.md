---
title: "PyroWelcomesPro Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for PyroWelcomesPro."
---

Public-safe technical notes for staff who configure or support PyroWelcomesPro on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

No plugin-owned staff command was verified for this feature. Manage it through its configuration or the owning platform documented below.

## Permissions

No stable plugin-owned permission nodes were verified. Confirm the installed build before adding grants.

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- PyroLib is a hard dependency.
- PlaceholderAPI and DiscordSRV are optional integrations in the installed build.
- The installed plugin metadata does not declare a stable command or permission surface, so configuration and live help are authoritative.
- Review messages for private placeholders before sending them to public Discord channels.

## Examples

## Troubleshooting

- Identify event type, player state, world, vanish state, and destination channel.
- Test each placeholder independently and confirm PyroLib loaded.
- Separate Minecraft display failure from DiscordSRV delivery failure.

## Official references

- [Official Pyro Plugins documentation hub](https://pyrotempus.gitbook.io/pyro-plugins)

## Reference Links

- [Player guide](/player-guides/other-server-features/pyrowelcomespro/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/pyrowelcomespro/)
- [Official plugin documentation](https://pyrotempus.gitbook.io/pyro-plugins)
