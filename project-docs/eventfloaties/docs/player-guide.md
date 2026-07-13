# Summer Floaties Player Guide

Summer Floaties is a seasonal build-and-reward event.

During the event, you can earn special floatie tokens. Each token tells you which floatie to build at your base, island, or wilderness build area. When the build is correct, the plugin confirms it and gives the event reward.

## How Players Use It

1. Earn a Summer Floatie Token from the event.
2. Check which floatie the token is for.
3. Build that floatie exactly at your base or island.
4. Include the inspection tile marker shown in the guide.
5. Stand on the inspection tile.
6. Run `/floatie`.
7. Keep adjusting the build until it reaches 100%.

The inspection tile is important. It tells the plugin where to check the build from.

## Quick Start

```text
/floatie info
/floatie help
/floatie
/floatie check duck
/floatie progress
```

Use `/floatie` first. It tries to detect the correct floatie automatically.

Use `/floatie check <id>` only when auto-detect gets confused, for example:

```text
/floatie check swan
```

## Commands

- `/floatie info` - show what Summer Floaties is, useful starting commands, the docs link, and the installed plugin version.
- `/floatie help` - show in-game help.
- `/floatie` - check the floatie near your inspection tile.
- `/floatie check [id]` - check a specific floatie, or all floaties you have tokens for when no id is given.
- `/floatie progress` - show how many floaties you have completed.

## Rewards, Limits, and Cooldowns

- You get a smaller reward for each completed floatie.
- You get a bigger event reward box when you complete every registered floatie.
- A floatie only counts at 100%.
- A completed floatie can only be claimed once per player.
- The same completed build location cannot be claimed again by another player for the same floatie.
- Tokens are not consumed when you complete a floatie.
- Normal checks have a short shared cooldown and a personal cooldown to keep the event smooth.

Some worlds may block `/floatie` rewards, especially spawn or event guide worlds. Build at your own base or island.

## Inspection Tile Types

The event guide may use these marker blocks:

- `LIGHT_BLUE_STAINED_GLASS` for water floaties.
- `CUT_SANDSTONE` for beach floaties.

Place the inspection tile exactly where the guide shows it, then stand on it before running `/floatie`.

## Permissions or Rank Requirements

Most players can use the player commands by default through `eventfloaties.use`.

Staff may have additional setup and testing commands.

## Placeholders

Some scoreboards, menus, or event displays may use Summer Floaties placeholders, such as completed count, remaining count, or percent complete. These are handled by PlaceholderAPI when it is installed.

## Important Notes

- Build the floatie from the event guide, not just something similar.
- The plugin can rotate registered floaties, so your build does not always need to face the exact same direction.
- Glass panes and waterlogged blocks are handled in a forgiving way where the event needs it.
- If you are close but not complete, keep checking the shape and marker tile.
- If you think your build is correct but it does not complete, ask staff to inspect it.

## Related Features

Summer Floaties may be used together with seasonal quests, event kits, Discord build sharing, and other summer event activities.

## Technical Documentation

Technical documentation is available at:

https://docs.1moreblock.com/custom-server-plugins/eventfloaties/
