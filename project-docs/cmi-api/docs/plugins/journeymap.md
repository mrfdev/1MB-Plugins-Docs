# JourneyMap

## Purpose

JourneyMap turns playtime into a light player-facing progress map with eras, badges, milestones, and optional rewards.

It does not replace CMI playtime tracking. It reads playtime from configured CMI PlaceholderAPI placeholders when PlaceholderAPI is available, falls back to Paper's playtime statistic when configured, then stores only this plugin's progress state in shared 1MB CMI-API playerdata.

The intended use is a friendly `/journeymap` page where players can see where they are in the server's long story:

- current playtime era
- current badge
- earned milestones
- next milestone and remaining time
- optional one-time milestone rewards

## Features

- Configurable milestone list with id, era, badge, required hours, description, and optional reward commands.
- Playtime source priority from configured PlaceholderAPI candidates such as `%cmi_user_playtime_seconds%`.
- Paper statistic fallback through `Statistic.PLAY_ONE_MINUTE` when CMI/PAPI output is not available.
- Shared playerdata storage for earned milestones, claimed rewards, max known playtime, source, and last refresh time.
- Player commands for status, milestones, rewards, claiming, and refreshing.
- Admin inspect command for cached/online player data.
- Optional automatic reward claiming when rewards are enabled and `rewards.require-claim` is false.
- Registered command, permission, placeholder, config, and debug metadata for `/1mbcmi debug plugin journeymap all`.

## Commands

```text
/journeymap
/journeymap help
/journeymap status
/journeymap milestones [page]
/journeymap rewards [page]
/journeymap claim [id|all]
/journeymap refresh
/journeymap admin inspect <player>
/journeymap admin reload
```

Aliases:

```text
/jmap
/playjourney
```

Global library examples:

```text
/1mbcmi debug plugin journeymap
/1mbcmi debug plugin journeymap commands
/1mbcmi debug plugin journeymap permissions
/1mbcmi debug plugin journeymap placeholders
/1mbcmi debug plugin journeymap config
/1mbcmi debug plugin journeymap all
/1mbcmi config journeymap
/1mbcmi config set journeymap rewards.enabled true
/1mbcmi translations reload
```

## Example Commands

```text
/journeymap
/journeymap status
/journeymap milestones
/journeymap milestones 2
/journeymap rewards
/journeymap claim all
/journeymap claim settler
/journeymap refresh
/journeymap admin inspect mrfloris
/journeymap admin reload
```

## Permissions

```text
onembcmi.journeymap.use
onembcmi.journeymap.milestones
onembcmi.journeymap.rewards
onembcmi.journeymap.claim
onembcmi.journeymap.admin
onembcmi.journeymap.admin.reload
```

Default access:

- `use`, `milestones`, `rewards`, and `claim` default to true.
- `admin` and `admin.reload` default to op.

## Placeholders

```text
%onembcmi_journeymap.enabled%
%onembcmi_journeymap.playtime.seconds%
%onembcmi_journeymap.playtime.hours%
%onembcmi_journeymap.current.era%
%onembcmi_journeymap.current.badge%
%onembcmi_journeymap.milestones.earned.count%
%onembcmi_journeymap.milestones.total%
%onembcmi_journeymap.rewards.claimable.count%
%onembcmi_journeymap.rewards.claimed.count%
%onembcmi_journeymap.next.id%
%onembcmi_journeymap.next.remaining_seconds%
%onembcmi_journeymap.last.source%
%onembcmi_journeymap.runtime.earned%
%onembcmi_journeymap.runtime.rewards_claimed%
%onembcmi_journeymap.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_journeymap.current.era%
papi parse mrfloris %onembcmi_journeymap.current.badge%
papi parse mrfloris %onembcmi_journeymap.next.remaining_seconds%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/JourneyMap/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
source:
  placeholder-candidates:
  - "%cmi_user_playtime_seconds%"
  - "%cmi_user_playtime%"
  - "%cmi_user_playtime_days%"
  paper-statistic-fallback: true
refresh:
  on-join: true
  join-delay-ticks: 60
notify:
  new-milestones-on-join: false
rewards:
  enabled: false
  require-claim: true
output:
  page-size: 8
milestones:
- "arrival|Arrival|First Steps|0.5|You found the trail and started your 1MB story.|"
- "first_day|Arrival|First Day|1|Your first real day of playtime is on the map.|"
- "settler|Settler|Campfire Regular|10|You are becoming a familiar face around the server.|"
```

Milestone format:

```text
id|era|badge|required-hours|description|optional console commands separated by ;
```

Reward command placeholders:

```text
{player}
{uuid}
{milestone}
```

Example reward milestone:

```yaml
milestones:
- "settler|Settler|Campfire Regular|10|You are becoming a familiar face around the server.|cmi money give {player} 250;cmi toast {player} -t:goal -icon:clock Settler milestone"
```

Rewards are disabled by default. With `rewards.enabled: true` and `rewards.require-claim: true`, players must run `/journeymap claim <id>` or `/journeymap claim all`. With `rewards.require-claim: false`, newly earned milestone reward commands run once during refresh/join and the milestone is marked claimed.

## Data

JourneyMap writes to shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
journeymap:
  playtime-seconds: 36000
  source: "placeholder:%cmi_user_playtime_seconds%"
  last-refresh: "2026-04-26T00:00:00Z"
  earned:
    arrival: "2026-04-26T00:00:00Z"
    first_day: "2026-04-26T00:00:00Z"
    settler: "2026-04-26T00:00:00Z"
  claimed-rewards:
  - "settler"
```

The plugin stores the highest seen playtime value for the player so a temporary placeholder problem or statistic mismatch should not erase progress.

## CMI / CMILib Usage

CMI:

- CMI is a required runtime dependency in the project stack.
- JourneyMap is designed to read CMI playtime through PlaceholderAPI placeholders instead of replacing or editing CMI user data.
- The default placeholder candidates are CMI-shaped placeholders and can be changed if the server's CMI/PAPI output differs.

CMILib:

- CMILib is a required runtime dependency through CMI and the shared 1MB CMI-API stack.
- This plugin does not currently need CMILib GUI APIs.

PlaceholderAPI:

- Optional hook.
- When loaded, JourneyMap checks configured placeholder candidates in order and uses the first resolved value that can be parsed as a duration.
- If PlaceholderAPI is missing or no placeholder resolves cleanly, Paper statistic fallback can be used.

Paper:

- Uses modern Paper/Bukkit command, listener, scheduler, statistic, and player APIs.
- Uses Adventure/MiniMessage output through the shared message helpers.

Shared Library:

- Feature registration and dependency health.
- Command help registration for `/1mbcmi debug plugin journeymap commands`.
- Permission checks.
- Config defaults and feature reload.
- Translation defaults.
- Placeholder routing.
- Paginated list rendering.
- Shared UUID playerdata load/save.
- Plugin-scoped playerdata cleanup support.

## Safety Notes

- Milestone ids are normalized and restricted to lowercase letters, numbers, `_`, and `-`.
- Reward commands are trusted admin config only and are limited in length when parsed.
- Player names for admin inspect are restricted to normal Minecraft username shape before resolving cached/offline players.
- Player commands do not accept arbitrary command text.
- Playtime can only move upward in stored data.
- Debug output should show source, counts, and config paths without exposing private player-sensitive data.

## Testing Checklist

```text
/journeymap
/journeymap milestones
/journeymap rewards
/journeymap refresh
/journeymap claim all
/journeymap admin inspect mrfloris
/journeymap admin reload
/1mbcmi debug plugin journeymap all
papi parse mrfloris %onembcmi_journeymap.current.era%
```

Manual things to verify:

- CMI/PAPI playtime placeholder resolves on the test server.
- Paper statistic fallback works if PlaceholderAPI is disabled or placeholder candidates fail.
- Earned milestones persist after reconnect or reload.
- Rewards stay off unless explicitly enabled.
- Claimable rewards can only be claimed once.
- `/1mbcmi debug plugin journeymap all` lists current command, permission, placeholder, and config metadata.

[Plugin index](README.md)
