---
title: "ajLeaderboards Staff Reference"
description: "Public-safe commands, permissions, configuration, integrations, and troubleshooting notes for ajLeaderboards."
---

Public-safe technical notes for staff who configure or support ajLeaderboards on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/ajleaderboards` | `ajleaderboards.use` | Shows plugin help and installed subcommands. |
| `/ajleaderboards list` | `ajleaderboards.use` | Lists configured leaderboards. |
| `/ajleaderboards update` | `ajleaderboards.use` | Forces or schedules a leaderboard update. |
| `/ajleaderboards reload` | `ajleaderboards.use` | Reloads configuration. |
| `/ajleaderboards signs` | `ajleaderboards.use` | Manages leaderboard signs when enabled. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `ajleaderboards.use` | Access to the `/ajleaderboards` administration surface. | Staff only |

## Placeholders

| Placeholder | Purpose |
| --- | --- |
| `%ajlb_lb_<board>_<number>_<type>_name%` | Player name at a leaderboard position. |
| `%ajlb_lb_<board>_<number>_<type>_value%` | Formatted value at a leaderboard position. |
| `%ajlb_position_<board>_<type>%` | Viewing player position. |
| `%ajlb_value_<board>_<type>%` | Viewing player leaderboard value. |

## Configuration and integrations

- PlaceholderAPI supplies source values; its expansion must work before ajLeaderboards can rank it.
- Board names, refresh intervals, score types, and offline handling are configured per leaderboard.
- Use the official placeholder syntax for the installed ajLeaderboards major version.

## Examples

```text
/ajleaderboards
/ajleaderboards list
/ajleaderboards update
```

## Troubleshooting

- Test the source PlaceholderAPI token for both online and offline players.
- Confirm the board type and update interval before treating a stale display as data loss.
- Run the list/update commands and inspect console errors for invalid placeholder output.

## Official references

- [Official wiki](https://wiki.ajg0702.us/ajLeaderboards/)
- [Commands](https://wiki.ajg0702.us/ajLeaderboards/commands/)
- [Placeholders](https://wiki.ajg0702.us/ajLeaderboards/setup/placeholders/)

## Reference Links

- [Player guide](/player-guides/other-server-features/ajleaderboards/)
- [Curated source notes](https://github.com/mrfdev/1MB-Plugins-Docs/tree/main/catalog/other-server-features/ajleaderboards/)
- [Official plugin documentation](https://wiki.ajg0702.us/ajLeaderboards/)
