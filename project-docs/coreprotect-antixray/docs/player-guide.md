# 1MB-AntiXRay Player Guide

`1MB-AntiXRay` is a staff-facing lookup tool for reviewing suspicious mining activity with data from CoreProtect. Most regular players will never need it, but moderators and admins can use it to inspect ore-breaking patterns, compare two players, and reopen cached reports without rerunning the same query.

Technical overview: [README.md](../README.md)  
Canonical docs page: <https://docs.1moreblock.com/custom-server-plugins/coreprotect-antixray/>

## Introduction

This plugin helps staff answer questions like:

- How much tracked ore did a player break in a time window?
- Does one player's ore mix look very different from another player's?
- Is a report mostly normal, worth review, or unusual enough to inspect more closely?

It is an add-on for CoreProtect. It does not log block changes by itself and it does not replace CoreProtect.

## How Players Use It

The easiest place to start is:

- `/xlu info` for the short introduction and docs link
- `/xlu help` for the command list
- `/xlu <player-or-uuid> [days]` for a normal lookup
- `/xlu compare <player1> <player2> [days]` for a side-by-side compare
- `/xlu last [page]` to reopen your most recent cached lookup

If the plugin is configured for paginated in-game output, you can also open cached pages directly by adding `[page]`.

## Available Features

- Single-player lookups using CoreProtect history
- Player-vs-player compare mode
- UUID-aware lookups, including auto-detect when a valid UUID is pasted as the first argument
- Optional one-off sort overrides with `-sort`
- Optional world filtering with `-world`
- Optional one-off high-value, all-rows, and zero-row views with `-highvalue`, `-all`, and `-zeros`
- In-game cached pages and `/xlu last`
- Staff Verdict heuristic lines
- Optional Server Baseline comparison lines when a cached baseline exists

## Quick Start

1. Run `/xlu info`.
2. Run `/xlu help`.
3. Try `/xlu <player-or-uuid> 30` for a 30-day lookup.
4. If you want a comparison, run `/xlu compare <player1> <player2> 30`.
5. If you close or scroll away from a paginated report, use `/xlu last`.

Examples:

- `/xlu info`
- `/xlu mrfloris`
- `/xlu yakirarage 350`
- `/xlu 631e3896-da2a-4077-974b-d047859d76bc 900`
- `/xlu compare mrfloris yakirarage 30 -sort percent`
- `/xlu mrfloris 30 -world world_nether`

## Commands

| Command | What it does | Notes |
| --- | --- | --- |
| `/xlu info` | Shows the player-facing intro, useful starting commands, the canonical docs URL, and the installed version/build. | Safe onboarding command. |
| `/xlu help` | Shows the main command help. | Includes admin-only commands when you have access. |
| `/xlu <player-or-uuid> [days] [page]` | Runs a lookup for one player. | `[days]` defaults from config if omitted. `[page]` only matters when paginated in-game output is enabled. |
| `/xlu compare <player1> <player2> [days] [page]` | Compares two players in the same time window. | Supports the same one-off flags as normal lookups. |
| `/xlu uuid <player-uuid> [days] [page]` | Resolves a UUID to the server's known player name, then runs a lookup. | Useful after name changes. |
| `/xlu last [page]` | Reopens your most recent cached lookup. | Helpful when chat moved too fast or a long lookup already finished. |

## Permissions or Rank Requirements

- `/xlu info` and `/xlu help` are suitable onboarding pages.
- Normal lookups, compares, UUID lookups, and `/xlu last` require `cpantixray.use`.
- Admin/debug/reload/config actions require `cpantixray.admin`.
- Most servers should grant these permissions to moderator or admin roles, not general players.

## Rewards, Costs, Limits, and Cooldowns

- This plugin has no economy cost system.
- This plugin has no reward system.
- This plugin has no built-in player cooldowns.
- Normal lookups can queue instead of failing immediately when another lookup is already running, depending on server config.
- Baseline rebuilds are separate admin actions and are not part of a normal player lookup.

## Placeholders

This plugin does not register its own PlaceholderAPI placeholders.

## Important Notes

- `Staff Verdict` is a heuristic quick-read, not proof of cheating.
- `Server Baseline` only appears when baseline support is enabled and a cached `baseline.yml` exists.
- A report with `Tracked breaks: 0` means no matching tracked materials were found for that player and window in the CoreProtect history being queried.
- World filters only work with valid loaded world names.
- UUID input is supported directly, but `/xlu uuid <player-uuid>` is still the clearest form when sharing commands with other staff.

## Related Features

- Required dependency: CoreProtect
- Friendly technical reference: [commands.md](commands.md), [permissions.md](permissions.md), [configuration.md](configuration.md), [installation.md](installation.md), [integrations.md](integrations.md), [troubleshooting.md](troubleshooting.md)
- Technical overview: [README.md](../README.md)
