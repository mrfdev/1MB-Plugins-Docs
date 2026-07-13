---
title: "HeadDisplays Guide"
description: "Staff tool for floating head-display labels, documented here as a patched third-party compatibility artifact for Paper 26.2 testing."
---

HeadDisplays is used by staff to place floating display labels and icon-style head displays in the world. On 1MoreBlock this is mainly a builder/admin tool, not a normal survival player feature.

## Quick Start

1. Run `/hd info` to confirm the plugin is loaded and to see the installed version.
2. Run `/hd create <display text>` to receive a HeadDisplay placement item.
3. Place the item where the display should appear.
4. Use `/hd list` to find existing displays.
5. Use `/hd edit <display id>` to open the edit menu for a display.

The command is player-only. Running it from the console returns a player-only message.

## Commands

| Command | Purpose |
| --- | --- |
| `/hd` | Shows the plugin help message. |
| `/hd info` | Shows plugin version, active display count, PlaceholderAPI status, and author links. |
| `/hd create <display text>` | Gives a HeadDisplay placement item. The display text is stored on the item lore. |
| `/hd list [page]` | Lists known displays, 8 per page, with clickable edit helpers. |
| `/hd edit <display id>` | Opens the display edit menu. |

The plugin also registers `/hdi`, `/hdisplay`, and `/headdisplay` as aliases for `/hd`.

## Rank Requirements

All verified permissions default to operator-only in `plugin.yml`. Staff should grant the specific permissions needed for a role rather than giving broad access casually.

| Permission | Gives Access To |
| --- | --- |
| `headdisplays.info` | `/hd info` |
| `headdisplays.create` | `/hd create <display text>` |
| `headdisplays.list` | `/hd list [page]` |
| `headdisplays.edit` | `/hd edit <display id>` |
| `headdisplays.admin` | Parent permission for the verified command permissions. |

## Display Text

The create command accepts the remaining command text as the display text. The plugin code splits lines on the literal sequence `/n`, so staff can use `/n` in the input when they want multiple lines.

If PlaceholderAPI is installed, HeadDisplays asks PlaceholderAPI to resolve placeholders in display text.

## Important Notes

- You need an empty inventory slot for `/hd create`.
- The display is placed by placing the generated HeadDisplay item.
- Existing displays are stored in `plugins/HeadDisplays/savedata.json`.
- The Paper 26.2-compatible jar is the local patched artifact named `HeadDisplays-1.12.9-26.2-display-fix.jar`.
- Technical reference links are listed at the bottom of the published guide.

## Reference Links

- [Technical overview](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/headdisplays/README.md)
- [Technical documentation folder](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/project-docs/headdisplays/docs/)
