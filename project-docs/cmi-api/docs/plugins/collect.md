# Collect

Collect adds a seasonal `/collect` event GUI where players submit normal gameplay items, build event score, occasionally discover virtual lucky finds, climb daily and weekly leaderboards, build event streaks, claim earned keepsake rewards, and trade duplicate reward keepsakes back into event score. The first configured event is `summer_2026`, but the same plugin can also host Valentines, Halloween, and Christmas events by changing `events.yml`.

The submission flow is intentionally safe: players do not drag items into the GUI. Instead, the Submit button scans their normal inventory storage for the current week's configured materials, removes only untouched vanilla item stacks, and adds the amount to their event totals. Armor slots and offhand are not touched. Renamed, lored, damaged, enchanted, custom-model, PDC, or otherwise modified items are ignored and stay in the player's inventory.

## Player Flow

Players run:

```text
/collect
```

The GUI uses the shared light-blue glass border and includes:

- an index page with event state, current week, stats, leaderboards, and reward access
- a collect items page with this week's visible item list and a safe submit button
- a personal stats page with today, week, month, all-event, and streak totals
- personal best highlights and visible event-score totals
- virtual Lucky Find totals from rare capped bonus rolls during valid submissions
- global leaderboards for daily, weekly, monthly, and all-event standings
- highlighted top 3 player heads on leaderboard pages, with richer score, streak, participation, and top-item lore
- a Hall of Fame archive page for reviewing configured event winners after the event
- a reward claim page for participation, streak, personal milestones, daily top 10, weekly top 10, monthly top 10, and all-event top 10 rewards
- a Trash to Treasure exchange page for trading duplicate Collect reward items into event score
- a community goal tile when enabled, showing server-wide score progress and the configured point booster
- a scavenger hunt tile when the daily bonus item is active or waiting for enough online players
- the player head in the bottom-left with personal event totals
- an event guide book next to the player head, opening the configured CMI `collectevent` ctext page for that player
- a bottom-right close button and a nearby `/menu` return button

Future weeks stay hidden by default and show as mystery content until their week starts. The current-week GUI tile shows when the next hidden week unlocks, using the real event date or the active admin debug date override.

## Commands

```text
/collect
/collect info
/collect help
/collect items
/collect submit
/collect stats
/collect leaderboard [daily|weekly|monthly|event]
/collect hall [event-id]
/collect rewards
/collect exchange
/collect admin reload
/collect admin debug <true|false>
/collect admin week <1|2|3|4|off>
/collect admin day <1-28|off>
/collect admin date <yyyy-mm-dd|off>
/collect admin event <event-id>
/collect admin inspect <player>
/collect admin reset <player> <event-id>
/collect admin report <event-id>
/collect admin feed
/collect admin scavenger <start|clear>
/collect debug setday <1-28|off>
/collect debug all
```

Examples:

```text
/collect
/collect items
/collect submit
/collect leaderboard daily
/collect hall summer_2026
/collect rewards
/collect exchange
/collect admin debug true
/collect admin week 2
/collect admin day 14
/collect admin date 2026-07-14
/collect admin event summer_2026
/collect admin inspect mrfloris
/collect admin report summer_2026
/collect admin feed
/collect admin scavenger start
```

Console can use the non-GUI admin commands. Players use `/collect` in game.

## Default Summer Event

The default Summer event runs:

```text
2026-07-01 through 2026-07-28
```

Reward claiming stays open until:

```text
2026-08-04
```

Default weeks:

| Week | Theme | Items |
| --- | --- | --- |
| 1 | Stone Hunt | cobblestone, stone, deepslate variants, andesite, diorite, granite, tuff, calcite, blackstone, basalt, stone bricks |
| 2 | Chainmail Relics | chainmail helmet, chestplate, leggings, boots |
| 3 | Summer Flora | common flowers, tall flowers, and meadow-style plants |
| 4 | Picnic Pantry | wheat, crops, melon, pumpkin, apples, bread, cookies, berries |

These are all configurable in `events.yml`.

## Rewards

Rewards are configured in `rewards.yml` and are intentionally not too overpowered by default. The plugin creates PDC-marked keepsake items and can also run narrow, configured console reward commands such as CMI money, CMI exp, CMI kits, CMI mail, `give`, or LuckPerms commands.

Default claim groups:

- participation reward after submitting at least one configured item
- streak reward after the configured streak target
- personal milestone rewards at configurable event-score thresholds
- daily top 10 rewards for completed days
- weekly top 10 rewards for completed weeks
- monthly top 10 rewards after the event month is complete
- all-event top 10 rewards after the 28-day event ends

Weekly top rewards use a series option by default. Repeat winners receive the next missing piece in a chainmail relic set, so one player can gradually complete the series instead of receiving the same item every time. The plugin stores exact awarded series pieces in shared playerdata, so future claims prefer missing configured materials before duplicates.

Once a player has completed the configured series, `series.complete-alternative` can swap future repeat wins to an alternate keepsake such as an echo shard, trophy item, or cosmetic reward. This keeps repeat winners rewarded without flooding them with duplicate armor pieces.

Claimed reward items include PDC metadata for the event id, category, period, rank, score, owner, claim id, series id/piece when relevant, and event edition year. Their lore also includes the event name, edition year, rank/score, period, and item id so old event rewards remain museum-friendly collectibles after the event is over.

## Trash To Treasure

`/collect exchange` opens a duplicate reward trade-in page. The GUI scans the player's normal inventory storage for PDC-marked Collect reward items from the active event. A trade button appears only when the player has more than one copy with the same reward claim id, so one museum keepsake remains protected.

By default, the exchange:

- only accepts Collect reward items from the active event
- only accepts items owned by the player who is trading them
- only works while event submissions are open
- removes exactly one duplicate copy after a confirmation screen
- adds configurable event score, not cosmetics or command rewards
- updates daily, weekly, monthly, and all-event score totals

The feature is intended for duplicate top-10 or series rewards that a player already collected. It should not become a way to grind new cosmetics; the trade values are small, capped, and configured in `config.yml`.

## Lucky Finds

Lucky Finds are virtual bonus discoveries that can happen during `/collect submit`. They do not create physical items, so there is no extra inventory item to lose, trade, rename, duplicate, or confuse with event rewards.

The roll only happens after Collect has already removed valid untouched vanilla items for the active week. Empty submits, modified items, custom items, and invalid worlds do not roll. If a lucky find succeeds, the player receives a chat note such as:

```text
Lucky find: Summer Glass Gem discovered while sorting your collection. +250 event score.
```

By default, Lucky Finds are capped per player per event day. They add event score directly and are stored as separate stats for reporting and balancing.

## Hall Of Fame

`/collect hall` opens the Hall of Fame archive GUI. It lists configured events and rebuilds the all-event top 10 from saved playerdata, so staff and players can review winners even after the event is over. Console can also run `/collect hall <event-id>` to print the archive ranking.

The archive is intentionally read-only. It does not hand out rewards by itself; rewards remain handled by the regular claim page and configured claim window.

## Scavenger Hunt

When `scavenger.enabled` is true, Collect can start one daily scavenger hunt during an active event after the configured minimum number of players are online. The hunt randomly picks one item from the current visible week and makes that item worth extra score for the configured duration.

Players see the current hunt on the index page and the matching item is called out on the items page. The score bonus only applies while the hunt is still active and only to the matching submitted item count, capped by `scavenger.max-items-per-submit`.

Admins can test the flow with:

```text
/collect admin scavenger start
/collect admin scavenger clear
```

`start` forces today's hunt to start when the current week has valid items. `clear` removes today's runtime hunt state so it can be tested again.

## Config Files

Main config:

```text
plugins/1MB-CMIAPI/Collect/config.yml
```

Event definitions:

```text
plugins/1MB-CMIAPI/Collect/events.yml
```

Reward definitions:

```text
plugins/1MB-CMIAPI/Collect/rewards.yml
```

Useful reward-series paths:

```yaml
rewards:
  weekly:
    tiers:
      '1':
        series:
          enabled: true
          id: summer_chain_relics
          prefer-missing: true
          materials:
            - CHAINMAIL_BOOTS
            - CHAINMAIL_LEGGINGS
            - CHAINMAIL_CHESTPLATE
            - CHAINMAIL_HELMET
          complete-alternative:
            enabled: true
            material: AMETHYST_SHARD
            display-name: Weekly Relic Echo
            amount: 1
            glint: true
```

Generated event reports:

```text
plugins/1MB-CMIAPI/Collect/reports/
```

Runtime state:

```text
plugins/1MB-CMIAPI/Collect/state.yml
```

`state.yml` stores passive runtime facts such as sent Discord feed keys and today's scavenger hunt item. It is not playerdata and can be regenerated by normal plugin operation.

Player data is stored in shared playerdata under the `collect` section:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Important config paths:

```yaml
active-event: summer_2026
gui:
  info-command: cmi ctext collectevent {player}
  ambience:
    enabled: true
    cooldown-ms: 750
    sound:
      enabled: true
      default: minecraft:block.amethyst_block.chime
      summer: minecraft:block.amethyst_block.chime
    particle:
      enabled: true
      default: HAPPY_VILLAGER
      summer: HAPPY_VILLAGER
submission:
  require-event-open: true
  commands:
    enabled: false
    allowed-prefixes:
      - cmi money give
      - cmi exp give
      - cmi mail send
worlds:
  allowed:
    - general
    - wild
    - nether
    - end
    - oneblock
    - cave
    - skyblock
    - acid
    - skygrid
  debug-extra-allowed:
    - spawn
scoring:
  catch-up:
    enabled: true
    min-missed-days: 2
    multiplier: 1.25
    max-items-per-submit: 1000
  streak-multiplier:
    enabled: true
    required-days: 7
    multiplier: 1.2
  rest-bonus:
    enabled: true
    required-hours: 24
    multiplier: 2.0
    max-items-per-submit: 500
  lucky-find:
    enabled: true
    chance-per-submit-percent: 5.0
    items-per-roll: 500
    chance-per-item-roll-percent: 1.0
    max-item-rolls-per-submit: 8
    max-finds-per-day: 3
    tiers:
      order:
        - sunlit_shard
        - summer_glass_gem
        - tide_pearl
      sunlit_shard:
        display-name: Sunlit Shard
        weight: 80
        points: 100
      summer_glass_gem:
        display-name: Summer Glass Gem
        weight: 18
        points: 250
      tide_pearl:
        display-name: Tide Pearl
        weight: 2
        points: 1000
community:
  enabled: true
  target-score: 100000
  point-booster: 1.1
  display-on-index: true
scavenger:
  enabled: true
  min-online-players: 2
  duration-minutes: 60
  multiplier: 2.0
  max-items-per-submit: 500
  display-on-index: true
  commands:
    enabled: false
    allowed-prefixes:
      - cmi broadcast
      - discordsrv broadcast
    on-start: []
discord-feed:
  enabled: false
  channel-id: ''
  command: discordsrv broadcast
  max-catchup-messages-per-check: 3
rewards:
  participation-minimum: 1
  streak-days: 3
  commands:
    enabled: true
    allowed-prefixes:
      - cmi money give
      - cmi exp give
      - cmi kit
      - cmi mail send
      - give
      - lp user
trash-to-treasure:
  enabled: true
  require-event-open: true
  require-owner: true
  max-points-per-item: 5000
  points:
    default: 100
    participation: 100
    streak: 150
    milestone: 200
    daily: 300
    weekly: 750
    monthly: 1500
    event: 2500
debug:
  force-open: false
  week-override: 0
  day-override: 0
  date-override: ''
  reveal-future-weeks: false
  allow-current-period-claims: false
```

Submitted stacks are stored as raw material totals, but leaderboards use event score. Event score can equal the item count, or it can be higher when configured catch-up, rest, streak, lucky-find, scavenger, exchange, or community bonuses are active. Submission command hooks can use `{score}`, `{items}`, and `{bonus}` placeholders.

Trash to Treasure exchange points are stored separately for stats/debug visibility, but also count toward the player's visible event score and current daily/weekly/monthly leaderboard periods.

The footer guide book closes the GUI and dispatches `gui.info-command` from direct server console. It is locked to the `cmi ctext` command prefix, so the default expects a CMI ctext page such as `collectevent` that can explain the current event to the player.

The Discord feed is optional and off by default. When enabled, it uses direct console with the configured `discordsrv broadcast` prefix and deduplicates event-start, week-start, scavenger-start, daily summary, weekly summary, and event-end messages through `state.yml`.

## Hologram Placeholders

Collect registers PlaceholderAPI values through the shared `onembcmi` expansion. These are intended for CMI holograms, ajLeaderboards, NPC displays, and `/summer` event signs.

Event state:

```text
%onembcmi_collect.event.name%
%onembcmi_collect.event.theme%
%onembcmi_collect.event.open%
%onembcmi_collect.current.day_display%
%onembcmi_collect.current.week_name%
%onembcmi_collect.current.week_items%
%onembcmi_collect.current.week_item.1%
```

Personal player progress:

```text
%onembcmi_collect.player.score.daily%
%onembcmi_collect.player.score.weekly%
%onembcmi_collect.player.score.monthly%
%onembcmi_collect.player.score.alltime%
%onembcmi_collect.player.rank.daily.display%
%onembcmi_collect.player.rank.weekly.display%
%onembcmi_collect.player.rank.monthly.display%
%onembcmi_collect.player.rank.alltime.display%
%onembcmi_collect.player.streak.current%
%onembcmi_collect.player.lucky_finds%
%onembcmi_collect.player.lucky_points_formatted%
```

Community and top-10 lines:

```text
%onembcmi_collect.community.score_formatted%
%onembcmi_collect.community.percent%
%onembcmi_collect.scavenger.active%
%onembcmi_collect.scavenger.item_name%
%onembcmi_collect.scavenger.multiplier%
%onembcmi_collect.scavenger.minutes_left%
%onembcmi_collect.participants.daily%
%onembcmi_collect.top.daily.1.line%
%onembcmi_collect.top.weekly.1.line%
%onembcmi_collect.top.monthly.1.line%
%onembcmi_collect.top.alltime.1.line%
```

Top placeholders support ranks `1` through `10` and fields `line`, `rank`, `name`, `score`, and `score_formatted`, for example `%onembcmi_collect.top.daily.3.name%` and `%onembcmi_collect.top.alltime.5.score_formatted%`. Board names accept `daily`, `weekly`, `monthly`, and `alltime` (`event` and `overall` are also accepted aliases).

## Debug Testing

For test server work:

```text
/collect admin debug true
/collect admin week 1
/collect admin day 1
/collect admin date 2026-07-01
```

`debug.force-open` lets admins test submissions outside the real event dates. `debug.week-override` forces the visible week. `debug.day-override` is set by `/collect admin day` or `/collect debug setday` and writes the matching `debug.date-override` value automatically. `debug.date-override` is useful for testing daily and weekly leaderboard periods. `debug.allow-current-period-claims` can be enabled in config when reward claims need to be tested before a real day or week has ended.

## Permissions

```text
onembcmi.collect.use
onembcmi.collect.submit
onembcmi.collect.stats
onembcmi.collect.leaderboard
onembcmi.collect.rewards
onembcmi.collect.admin
onembcmi.collect.reload
onembcmi.collect.debug
onembcmi.collect.inspect
onembcmi.collect.reset
onembcmi.collect.test
onembcmi.collect.report
onembcmi.collect.feed
```

Player-facing permissions default to true. `onembcmi.collect.rewards` covers both reward claiming and `/collect exchange`. Admin permissions default to false, including the parent `onembcmi.collect.admin`, so owner-level staff should be granted access explicitly through LuckPerms.

## Event Reports

After an event, staff can export a Discord-friendly markdown report:

```text
/collect admin report summer_2026
```

The report is generated from saved Collect playerdata and can be regenerated weeks later. It includes:

- event dates, participants, total event score, raw vanilla items submitted, active collection days, claimed rewards, best streak, lucky find count/bonus score, busiest score day, and most collected item
- top collected materials
- all-event top 10
- monthly top 10
- weekly top 10 for every configured week
- daily top 10 for every event day

The file is written to `plugins/1MB-CMIAPI/Collect/reports/` as a `.md` file so it can be edited or pasted into Discord/community announcements.

## Safety Notes

Collect does not use RCON and does not accept raw player input for commands. Reward and submission commands are console-dispatched only after placeholder replacement and a strict allowed-prefix check. Commands containing newlines, semicolons, pipes, or chained operators are blocked.

The GUI is managed by the shared hardened GUI service, which cancels unsafe clicks and drags, uses safe holders, and debounces repeated actions. Submissions, reward claims, and duplicate-reward exchanges use durable idempotent receipts. A submission snapshots exact before/after storage slots and event stats before applying either; reward items and consumed duplicates use exact payload escrow until profile state and delivery are finalized. Uncertain operations remain visible through `/collect debug transactions`.

Submissions remove matching untouched vanilla materials directly from normal inventory storage after the click, so players cannot duplicate items by placing them into a custom inventory. Custom or modified items are never removed or counted.

Trash to Treasure never accepts arbitrary items. It checks the Collect reward PDC marker, active event id, reward claim id, and owner UUID when `trash-to-treasure.require-owner` is true. It rescans the inventory during the confirmation click and refuses to remove anything unless another copy with the same claim id still remains.

Lucky Finds are virtual and are only rolled after valid vanilla items have already been accepted and removed by `/collect submit`. They are capped per player per event day and only add event score.

Submissions count only in configured worlds. By default this is `general`, `wild`, `nether`, `end`, `oneblock`, `cave`, `skyblock`, `acid`, and `skygrid`; `spawn` is accepted only while debug force-open is active.

## CMI, CMILib, And Paper API

CMI and CMILib are required because the feature runs inside the shared 1MB-CMIAPI plugin environment and uses shared docs/debug/config handling. Configured reward commands can use CMI money, CMI EXP, CMI mail, and CMI kits.

Paper/Bukkit APIs used include safe inventory reads/removal, Adventure item names/lore, PDC reward item identity, particles, sounds, titles, and the shared GUI holder/click protections.

[Documentation index](../README.md)
