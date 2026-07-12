---
title: "1MB AntiFire Guide"
description: "Protects the server from unwanted fire spread and block burn damage while allowing controlled permanent fire where configured."
---

## Introduction

1MB AntiFire is a passive protection plugin used on 1MoreBlock Paper servers to reduce unwanted fire grief and accidental
fire damage. Most players never need to configure it directly, but they can use `/_antifire info` to see what the
plugin does and open the official documentation link in game.

## How Players Use It

AntiFire mainly works in the background.

- Natural fire spread can be blocked by server configuration.
- Fire burn damage to blocks can be blocked by server configuration.
- Temporary fire can be allowed to appear briefly and then be auto-extinguished.
- Fire on netherrack stays lit.
- Soul fire on soul sand or soul soil can also stay lit when staff enable that server setting.

## Available Features

- Safer fireplaces and decorative fire setups.
- Reduced chance of accidental house fires from spread or lightning.
- A simple in-game info command for players.
- Staff-only live controls for trusted administrators.

## Quick Start

1. Run `/_antifire info` to open the player-safe overview.
2. Build normal fire features the same way you usually would on the server.
3. If you want a soul-fire-style build to stay lit, ask staff whether `allow-permanent-soul-fire` is enabled.

## Commands

- `/_antifire info` shows the public plugin summary, quick-start notes, installed version, and the canonical docs URL.
- `/_antifire` shows the same public summary for regular players and the admin help summary for trusted staff.

## Permissions Or Rank Requirements

- No permission is required for `/_antifire info`.
- The admin permission `onembantifire.admin` is only for trusted staff and is not granted to operators by default.

## Rewards, Costs, Limits, And Cooldowns

- This plugin does not grant rewards.
- This plugin does not charge costs.
- This plugin does not expose player cooldowns.
- The only timing players may notice is that temporary tracked fire can disappear after a short delay set by staff.

## Placeholders

This plugin does not currently provide PlaceholderAPI placeholders or custom placeholder tokens.

## Important Notes

- AntiFire is a protection plugin, not a gameplay progression system.
- It does not give players permission to bypass region protections or other server rules.
- Whether fire spreads or burns blocks depends on the server configuration chosen by staff.

## Related Features

- Trusted admins can use `/_antifire help`, `/_antifire debug`, `/_antifire reload`, and `/_antifire toggle <key> <value>`.
- Technical command and configuration details are documented in the project docs alongside this guide.

## Technical Documentation

- Canonical docs URL: `https://docs.1moreblock.com/custom-server-plugins/antifire/`
- Technical overview: [README.md](../README.md)
- Command reference: [commands.md](commands.md)

## Reference Links

- [Technical overview](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/antifire/README.md)
- [Technical documentation folder](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/project-docs/antifire/docs/)
