# SellStreaks

## Purpose

SellStreaks is a player-fun plugin that rewards players for varied CMI selling, daily market goals, and healthier sell behavior. It tracks today's CMI sell profile for each player, shows the next variety reward threshold, and gives staff a small daily market-goal tool.

Version 1 uses command output instead of a CMILib inventory GUI. The core sell-event tracking and reward rules are intentionally testable first; a GUI can be added as a second-depth pass once the economy behavior feels right.

## Features

- Listen to `CMIPlayerItemsSellEvent`.
- Track daily sell events, item count, payment total, unique materials, material amounts, and one-item spam streaks.
- Reset player sell profiles automatically when the calendar date changes.
- Store long-lived SellStreak data inside shared UUID playerdata.
- Load and save daily market goals in the feature data folder.
- Let staff set a daily goal with `/sellstreak admin setgoal <material> <amount>`.
- Reward configurable variety thresholds such as `3:25`, `5:75`, and `10:200`.
- Reward completed daily material goals.
- Enforce a configurable daily reward cap per player.
- Ignore configured materials from SellStreak tracking and rewards.
- Pause reward progress when a player keeps repeating one single-material sell past the configured spam streak limit.
- Use Vault economy, usually backed by CMI economy, for money rewards when enabled.
- Read CMI worth values for daily goal display.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/sellstreak
/sellstreak info
/sellstreak status
/sellstreak goals [page]
/sellstreak top [page]
/sellstreak admin inspect <player>
/sellstreak admin setgoal <material> <amount>
/sellstreak admin reload
```

Aliases:

```text
/sellstreaks
/marketgoals
```

Useful examples:

```text
/sellstreak
/sellstreak info
/sellstreak goals
/sellstreak top
/sellstreak admin inspect mrfloris
/sellstreak admin setgoal DIAMOND 16
/sellstreak admin setgoal minecraft:emerald 32
```

Global library examples:

```text
/1mbcmi debug plugin sellstreaks
/1mbcmi debug plugin sellstreaks all
/1mbcmi debug clean playerdata plugin sellstreaks --dry-run
/1mbcmi config sellstreaks
/1mbcmi config set sellstreaks rewards.enabled false
/1mbcmi config set sellstreaks anti-spam.max-one-item-streak 8
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.sellstreaks.use
onembcmi.sellstreaks.goals
onembcmi.sellstreaks.top
onembcmi.sellstreaks.admin
onembcmi.sellstreaks.admin.setgoal
onembcmi.sellstreaks.admin.reload
```

## Placeholders

```text
%onembcmi_sellstreaks.enabled%
%onembcmi_sellstreaks.date%
%onembcmi_sellstreaks.sell_events%
%onembcmi_sellstreaks.items%
%onembcmi_sellstreaks.payment%
%onembcmi_sellstreaks.unique_materials%
%onembcmi_sellstreaks.goals.completed%
%onembcmi_sellstreaks.goals.total%
%onembcmi_sellstreaks.next.variety.threshold%
%onembcmi_sellstreaks.one_item_spam_streak%
%onembcmi_sellstreaks.runtime.rewards%
%onembcmi_sellstreaks.runtime.reward_total%
%onembcmi_sellstreaks.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIPlayerItemsSellEvent` provides the player, sell type, total amount, total payment, per-material amounts, and per-material payments.

CMI:

- CMI remains the source of truth for selling and worth values.
- `CMI#getWorthManager()` and `WorthItem#getSellPrice()` provide configured worth values for goal display.
- CMI economy is used through Vault when Vault's active economy provider is CMI.

CMILib:

- `CMIMaterial` normalizes CMI sell-event material keys and strictly parses admin goal material names.
- Future GUI work can use CMILib inventory helpers once the command-first behavior is tested.

Paper:

- Paper command, event, YAML, service-manager, and Adventure MiniMessage APIs are used.

## Config

Important config paths:

```text
enabled
debug
output.page-size
rewards.enabled
rewards.use-vault-economy
rewards.variety-thresholds
rewards.goal-money
rewards.daily-player-cap
anti-spam.max-one-item-streak
tracking.ignored-materials
goals.default-materials
top.limit
```

## Data

Daily market goals:

```text
plugins/1MB-CMIAPI/SellStreaks/goals.yml
```

Shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
sellstreaks:
  date: "2026-04-25"
  sell-events: 4
  total-items: 176
  total-payment: 512.0
  reward-payment: 125.0
  one-item-spam-streak: 0
  rewards:
    - "variety-3"
  completed-goals:
    - "DIAMOND"
  materials:
    DIAMOND:
      amount: 16
      payment: 704.0
```

## Safety

SellStreaks only rewards after real CMI sell events. It does not fake sell events, edit CMI worth values, remove items, execute arbitrary commands, or change CMI sell behavior. Admin material input is strictly normalized through CMILib material parsing. Economy rewards can be disabled with `rewards.enabled` or `rewards.use-vault-economy`. Use `tracking.ignored-materials` for materials that should not count toward streaks, goals, top lists, or rewards. Use `rewards.daily-player-cap` to limit daily SellStreak payouts per player.

## Future Social Rewards

The campfire `/sit` social reward idea is still intentionally left for a separate gameplay pass. It likely belongs as a small social bonus system with its own cooldowns, region/world filters, item reward list, and anti-farm rules, rather than being mixed into the CMI sell-event handler during pre-test polish.

## Shared Library Usage

SellStreaks uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, paginated list rendering, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, and debug metadata.

[Plugin index](README.md)
