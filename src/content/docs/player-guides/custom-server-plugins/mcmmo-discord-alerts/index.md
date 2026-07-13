---
title: "mcMMO Discord Alerts Guide"
description: "Announces 1MoreBlock mcMMO power-level milestones in Discord with compact skill summaries."
---

## Introduction

mcMMO Discord Alerts celebrate major mcMMO progress in the 1MoreBlock Discord. When a player reaches a power-level milestone, an mcMMO embed can appear in the server chat channel with their current power level, strongest skills, and full skill profile.

This is a Discord notification feature, not a separate in-game plugin command.

## How Players Use It

Play normally and level mcMMO skills. When your total mcMMO power level reaches a milestone, DiscordSRV posts a compact progress card for everyone watching the linked Discord channel.

The alert currently appears every 25 power levels, such as:

- 25
- 50
- 75
- 100
- 125

## Available Features

- Shows the player and their new mcMMO power level.
- Highlights the top three mcMMO skills at the time of the milestone.
- Shows the full profile grouped into Gathering, Utility, and Combat.
- Uses custom 1MoreBlock Discord emotes for mcMMO skills where available.
- Links players toward the server's mcMMO help thread.

## Quick Start

1. Join the Minecraft server.
2. Train mcMMO skills through normal gameplay.
3. Check your progress with `/mcstats`.
4. Reach a power-level milestone.
5. Look for the announcement in Discord.

## Commands

Useful mcMMO commands shown in the Discord alert:

- `/mcstats` shows your mcMMO stats.
- `/mcrank` shows your mcMMO rankings.
- `/mctop` shows top mcMMO players.
- `/mcstats discord` shows mcMMO progress with Discord-oriented formatting when available.

There is no `/mcstats info` command provided by this alert package because the feature is powered by DiscordSRV alert configuration rather than a separate in-game plugin. Use this documentation page for information about how the Discord announcement works.

## Permissions or Rank Requirements

The alert itself does not add a new player permission. If you can use mcMMO and the related mcMMO commands on the server, your progress can be included when the alert milestone condition is met.

Access to individual mcMMO commands may still depend on normal server permissions, ranks, or mcMMO configuration.

## Rewards, Costs, Limits, and Cooldowns

The Discord alert is informational only.

- It does not grant extra rewards.
- It does not charge players.
- It does not change mcMMO XP gain.
- It only posts at 25-power-level intervals to avoid clutter.

## Placeholders

The alert uses mcMMO PlaceholderAPI values behind the scenes, including the total power level and individual skill levels. Players do not need to type these placeholders.

## Important Notes

- The top skills are calculated at the moment the alert fires.
- Ties may be ordered by the alert's internal sorting expression.
- The full profile includes all 19 mcMMO skills currently used by the server.
- Discord layout can wrap on smaller screens; the profile is grouped to keep the embed readable.

## Related Features

- mcMMO skill progression
- DiscordSRV linked chat
- PlaceholderAPI-powered server displays

## Technical Documentation

Maintainers can review the project documentation in the source repository:

- [Configuration](configuration.md)
- [Installation](installation.md)
- [Integrations](integrations.md)
- [Troubleshooting](troubleshooting.md)

## Reference Links

- [Technical overview](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/mcmmo-discord-alerts/README.md)
- [Technical documentation folder](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/project-docs/mcmmo-discord-alerts/docs/)
