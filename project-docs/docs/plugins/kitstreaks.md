# KitStreaks

## Purpose

KitStreaks listens for CMI kit claim events and turns them into configurable streaks, milestone calendars, and optional rewards.

The twist is that it is not limited to one daily streak. A player can have:

- a broad track such as `daily`, matching any tracked kit
- per-kit streaks, such as `kit:starter`
- custom tracks that match multiple kit names, such as `events` or `builder`
- milestone sets such as 7, 14, 21, 28, and 365 days

It does not replace CMI's kit manager, cooldowns, permissions, GUI, or kit usage data. It listens to `CMIUserKitAcquireEvent` and stores only 1MB CMI-API streak metadata in shared playerdata.

## Features

- Tracks successful CMI kit claims through `CMIUserKitAcquireEvent`.
- Supports a whitelist of tracked kits, exact ignored kits, and ignored kit prefixes for plugin-delivered reward kits.
- Records both per-kit streaks and configurable track streaks.
- Default tracks are prepared for `daily`, `starter`, and `events`.
- Default milestones include 7, 14, 21, 28, and 365 day style goals.
- Shows streak health as safe today, due today, grace, or missed.
- Supports optional milestone reward commands.
- Supports claim-based rewards or automatic reward execution on earn.
- Provides player status, tracks, kits, calendar, rewards, top, claim, and admin inspect/reset commands.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/kitstreak info
/kitstreak status [track|kit:<kit>]
/kitstreak tracks [page]
/kitstreak kits [page]
/kitstreak calendar [track|kit:<kit>] [page]
/kitstreak rewards [page]
/kitstreak claim [track|all] [milestone|all]
/kitstreak top [track] [page]
/kitstreak admin inspect <player>
/kitstreak admin reset <player> [all|track|kit] [id]
/kitstreak admin reload
```

Aliases:

```text
/kitstreaks
/kstreak
```

Global library examples:

```text
/1mbcmi debug plugin kitstreaks
/1mbcmi debug plugin kitstreaks commands
/1mbcmi debug plugin kitstreaks permissions
/1mbcmi debug plugin kitstreaks placeholders
/1mbcmi debug plugin kitstreaks config
/1mbcmi debug plugin kitstreaks all
/1mbcmi config kitstreaks
/1mbcmi config set kitstreaks rewards.enabled true
/1mbcmi translations reload
```

## Example Commands

```text
/kitstreak info
/kitstreak status
/kitstreak status daily
/kitstreak status kit:starter
/kitstreak tracks
/kitstreak kits
/kitstreak calendar
/kitstreak calendar daily
/kitstreak calendar kit:starter
/kitstreak rewards
/kitstreak claim all
/kitstreak claim daily 7
/kitstreak top daily
/kitstreak admin inspect mrfloris
/kitstreak admin reset mrfloris track daily
/kitstreak admin reset mrfloris kit starter
/kitstreak admin reset mrfloris all
/kitstreak admin reload
```

## Permissions

```text
onembcmi.kitstreaks.use
onembcmi.kitstreaks.calendar
onembcmi.kitstreaks.rewards
onembcmi.kitstreaks.claim
onembcmi.kitstreaks.top
onembcmi.kitstreaks.admin
onembcmi.kitstreaks.admin.reset
onembcmi.kitstreaks.admin.reload
```

Default access:

- `use`, `calendar`, `rewards`, `claim`, and `top` default to true.
- `admin`, `admin.reset`, and `admin.reload` default to op.

## Placeholders

```text
%onembcmi_kitstreaks.enabled%
%onembcmi_kitstreaks.default.track%
%onembcmi_kitstreaks.current.streak%
%onembcmi_kitstreaks.current.best%
%onembcmi_kitstreaks.current.health%
%onembcmi_kitstreaks.claims.total%
%onembcmi_kitstreaks.tracks.count%
%onembcmi_kitstreaks.kits.count%
%onembcmi_kitstreaks.claimable.count%
%onembcmi_kitstreaks.claimed.count%
%onembcmi_kitstreaks.last.player%
%onembcmi_kitstreaks.last.kit%
%onembcmi_kitstreaks.last.track%
%onembcmi_kitstreaks.last.claimed_at%
%onembcmi_kitstreaks.track.<track>.streak%
%onembcmi_kitstreaks.track.<track>.best%
%onembcmi_kitstreaks.track.<track>.health%
%onembcmi_kitstreaks.kit.<kit>.streak%
%onembcmi_kitstreaks.kit.<kit>.best%
%onembcmi_kitstreaks.runtime.claims%
%onembcmi_kitstreaks.runtime.milestones%
%onembcmi_kitstreaks.runtime.rewards%
%onembcmi_kitstreaks.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_kitstreaks.current.streak%
papi parse mrfloris %onembcmi_kitstreaks.current.health%
papi parse mrfloris %onembcmi_kitstreaks.track.daily.streak%
papi parse mrfloris %onembcmi_kitstreaks.kit.starter.best%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/KitStreaks/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
time:
  zone: Europe/Amsterdam
output:
  page-size: 8
tracking:
  tracked-kits: []
  ignored-kits:
  - vote_tokens
  ignored-kit-prefixes:
  - vote_tier_
  count-events-without-items: true
  one-streak-step-per-day: true
streak:
  max-gap-days: 1
  default-track: daily
tracks:
- "daily|Daily Kit Path|*|7,14,21,28,365|Claim any tracked CMI kit on schedule for long-term milestones."
- "starter|Starter Kit Path|starter,newbie,tools|7,14,21,28|Prepared track for starter-style kits if those names exist."
- "events|Event Kit Path|event,seasonal,holiday|7,14,21,28|Prepared track for event and seasonal kits."
rewards:
  enabled: false
  require-claim: true
  commands:
  - "daily|7|cmi money give {player} 250"
  - "daily|28|cmi toast {player} -t:goal -icon:chest 28 day kit streak"
top:
  limit: 10
```

Track format:

```text
id|display name|kit selectors|milestones|description
```

`kit selectors` can be:

- `*` for all tracked kits
- a comma-separated list of normalized CMI kit names, such as `starter,newbie,tools`

Reward command format:

```text
track|milestone-days|console command;second console command
```

Reward command placeholders:

```text
{player}
{uuid}
{track}
{milestone}
```

Rewards are disabled by default. With `rewards.enabled: true` and `rewards.require-claim: true`, players use `/kitstreak claim`. With `rewards.require-claim: false`, configured reward commands run once when the milestone is earned.

## How Streaks Work

When CMI fires `CMIUserKitAcquireEvent`, KitStreaks checks:

- the feature is enabled
- the event is not cancelled
- the kit name is not ignored
- the kit name does not start with an ignored prefix such as `vote_tier_`
- if `tracking.tracked-kits` is empty, all non-ignored kits are tracked
- if `tracking.tracked-kits` is not empty, only listed kits are tracked
- the player has `onembcmi.kitstreaks.use`

Then it updates:

- the specific kit streak, such as `kit:starter`
- every configured track that matches the kit, such as `daily`

With `tracking.one-streak-step-per-day: true`, repeated claims of the same kit or track on the same calendar day update totals and timestamps but do not increase the streak more than once.

`streak.max-gap-days` controls how strict streak continuation is. The default `1` means a player must claim on consecutive calendar days. Higher values can create a softer rhythm for event kits or weekly-style tracks.

VoteTokens reward kits are ignored by default through `tracking.ignored-kit-prefixes: [vote_tier_]`. These kits are CMI-kit delivery commands for GUI trades, not player `/kit` claims, so they should not advance KitStreaks even when an operator or admin has access to the kit.

## Data

KitStreaks writes to shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
kitstreaks:
  total-claims: 12
  last-kit: "starter"
  last-track: "daily"
  last-claim-at: "2026-04-26T00:00:00Z"
  claimed-rewards:
  - "daily:7"
  tracks:
    daily:
      current: 7
      best: 7
      total-claims: 9
      last-date: "2026-04-26"
      last-at: "2026-04-26T00:00:00Z"
      last-kit: "starter"
      days:
      - "2026-04-20"
      - "2026-04-21"
      earned-milestones:
      - "7"
  kits:
    starter:
      current: 3
      best: 3
      total-claims: 3
```

## CMI / CMILib Usage

CMI:

- Uses `CMIUserKitAcquireEvent` to detect CMI kit claims.
- Uses `CMI.getInstance().getKitsManager().getKitMap()` for `/kitstreak kits` discovery and tab completion.
- Does not edit CMI kit config, kit cooldowns, or CMI kit usage data.

CMILib:

- CMILib is a required runtime dependency through the project stack.
- This first pass does not use CMILib GUI APIs.

Paper:

- Uses Paper/Bukkit listener, command, scheduler-free runtime, and player APIs.
- Uses Adventure/MiniMessage output through shared message helpers.

Shared Library:

- Feature registration and dependency health.
- Permission checks.
- Config defaults and reload.
- Translation defaults.
- Placeholder routing.
- Paginated list rendering.
- Shared UUID playerdata load/save.
- Plugin-scoped playerdata cleanup support.

## Safety Notes

- Kit, track, and reward ids are normalized to lowercase letters, numbers, `_`, and `-`.
- Player-facing commands never execute arbitrary typed command text.
- Reward commands are trusted admin config only and have length limits.
- Admin reset can remove all KitStreaks playerdata or just one track/kit section.
- The plugin stores only its own `kitstreaks` section in shared playerdata.
- CMI remains the source of truth for whether a kit can actually be claimed.

## Testing Checklist

```text
/kitstreak info
/kitstreak status
/kitstreak tracks
/kitstreak kits
/kitstreak calendar daily
/kitstreak rewards
/kitstreak claim all
/kitstreak top daily
/kitstreak admin inspect mrfloris
/kitstreak admin reload
/1mbcmi debug plugin kitstreaks all
papi parse mrfloris %onembcmi_kitstreaks.track.daily.streak%
```

Manual things to verify:

- Claim a real CMI kit and confirm `/kitstreak status` updates.
- Trigger a VoteTokens reward kit such as `vote_tier_2_layer_1_item_3` and confirm KitStreaks does not update.
- Claim the same kit twice on the same day and confirm the streak does not double-step when configured.
- Check `/kitstreak calendar daily` after several claims.
- Add a real kit name to a custom track and confirm that track updates.
- Enable rewards on a disposable test server and confirm a milestone reward can only be claimed once.
- Confirm `/1mbcmi debug plugin kitstreaks all` lists current commands, permissions, placeholders, and config.

[Plugin index](README.md)
