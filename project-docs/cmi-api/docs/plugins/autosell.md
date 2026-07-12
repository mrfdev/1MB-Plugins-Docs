# AutoSell

AutoSell adds an opt-in `/autosell` inventory cleanup feature for players. It reads CMI `Worth.yml` values, sells only selected pure vanilla items from normal inventory storage slots, and pays through the CMI-backed Vault economy provider.

The feature is intentionally conservative. It is off by default for every player, never scans the hotbar, offhand, armor, or open containers, and refuses custom items with names, lore, enchantments, PDC, custom model data, damage, storage contents, or other meaningful custom metadata.

## Player Flow

Players open:

```text
/autosell
```

The GUI uses the shared hardened GUI service with safe holders, cancelled clicks and drags, duplicate click protection, delayed close handling, and the global light-blue filler material. The main page includes:

- a global on/off toggle
- category toggles for CMI worth items
- per-category material pages where players can toggle individual items, plus a top-row bulk control that turns every available item in that category on with left-click or off with right-click across all pages
- value filters and notification settings
- an inventory-full trigger for players who only want AutoSell to run when storage slots are nearly full
- optional world toggles
- a preview button that explains what would sell right now
- a recent-results button for batched sale history
- a quests button with claimable rewards, daily, weekly, monthly, and all-quest pages
- a milestones button for the visible one-time milestone tree
- a stats button for personal category/material totals, ranks, and server share
- a Main Menu button beside the close button when `/menu` is installed and enabled
- the player head with today's AutoSell total, cap, broker level, broker points, next broker-level progress, top category, top item, best single batch, milestone progress, quest progress, sell chain, streak, trigger mode, and active boost

AutoSell only runs after a short delayed batch, usually after a pickup or chunk move. The final sale runs on the main thread, snapshots exact stacks, rechecks that the inventory still matches, removes the items, pays the player, and refunds removed stacks if the economy payment fails.

The bulk category-item control changes only the current category's non-blacklisted CMI worth items. It deliberately replaces the individual choices inside that category so `all off` really means all available items are off. Staff-blocked items remain blocked, other categories keep their existing choices, and players can immediately turn a small number of individual items back on or off after using the bulk action. Turning the category itself off or on from the Categories page does not erase its individual item choices.

When chat notifications are selected, the batched sale message is hoverable and clickable. Hover shows the batch total, trigger, top sold materials, daily cap progress, broker status, milestone progress, quest progress, sell-chain status, streak status, and any active AutoSell boost. Click opens `/autosell recent` for the detailed sale history. Actionbar, title, and bossbar notification modes remain visual-only because Minecraft clients do not support hover/click actions there.

## Safety Model

AutoSell is built around anti-dupe and anti-farm guards:

- off by default per player
- background selling requires both `onembcmi.autosell.use` and `onembcmi.autosell.toggle` when a batch is scheduled and again before inventory mutation
- losing either runtime permission turns the saved player profile off, including when the player rejoins with previously enabled AutoSell
- global `enabled` emergency toggle in config
- direct CMI `Worth.yml` read with live cache refresh, including quoted numeric CMI values
- only normal inventory slots `9..35` are scanned
- hotbar, offhand, armor, and open containers are never sold
- meaningful custom item meta is rejected by default while normal Paper item metadata is allowed
- shulker boxes, bundles, and container-style storage are rejected by default
- hard material blacklist blocks sensitive materials even if CMI has a price
- hard world blacklist blocks event/build/test worlds
- optional world toggles let players opt into worlds such as Nether and End
- debug worlds such as `spawn` only appear while debug is enabled
- chunk-change guard requires movement between successful sale cycles
- overheat guard warns and pauses repeated sales from the same small area
- daily money caps are permission-based and can be increased by broker progress
- optional inventory-full mode can wait until normal inventory storage slots are nearly full
- sell chains and streaks reward active moving gameplay, not static hopper/AFK selling
- one-time milestone rewards are claimed automatically when configured targets are reached
- repeatable quest rewards only progress after a verified sale batch and use the same safe command allowlist model
- temporary AutoSell boosts can appear in `/rate` while active
- suspicious volume warnings are stored and can be exported
- verified sale revenue is tracked by chunk for passive staff heatmap review
- passive tuning sessions collect observations and suggestions only; they never edit config values automatically

This plugin should not be used as a hopper, farm, or AFK seller. It is meant for players who move around and manually mine, dig, chop, or gather while keeping their inventory tidy.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/autosell` | player | Opens the AutoSell GUI. Console prints status. |
| `/autosell info` | anyone | Shows a player-friendly intro and public docs link. |
| `/autosell help` | anyone | Shows commands available to the sender. |
| `/autosell status` | player/console | Shows player status or console plugin status. |
| `/autosell stats` | player/console | Shows player top categories/materials, rank, server share, or the console economy report. |
| `/autosell preview` | player | Shows what would sell from the player's normal inventory right now. |
| `/autosell recent` | player | Shows recent batched sale results. |
| `/autosell quests` | player | Shows active daily, weekly, and monthly AutoSell quest progress in chat. |
| `/autosell quests gui` | player | Opens the AutoSell quest hub with claimable rewards and period pages. |
| `/autosell quests claim [all\|id]` | player | Claims ready AutoSell quest rewards when manual claiming is enabled. |
| `/autosell milestones` | player | Opens the visible one-time milestone tree, including bulk-cleanup milestones. |
| `/autosell caps` | player | Opens weekly and lifetime daily cap unlocks purchased with broker points. |
| `/autosell toggle` | player | Turns AutoSell on or off for the player. |
| `/autosell trigger <always\|full>` | player | Chooses whether AutoSell runs normally after pickup/break batches or only when inventory storage slots are nearly full. |
| `/autosell categories` | player | Opens the category toggle GUI. |
| `/autosell items <category>` | player | Opens per-material toggles for one category. |
| `/autosell filters` | player | Opens filter and notification settings. |
| `/autosell worlds` | player | Opens optional world toggles. |
| `/autosell category <id> on\|off` | player | Toggles one category from chat. |
| `/autosell item <material> on\|off` | player | Toggles one material from chat. |
| `/autosell debug item` | staff/player with debug | Explains why the held item is or is not eligible. |
| `/autosell admin reload` | admin/console | Reloads config, player data, and CMI Worth.yml cache. |
| `/autosell admin check` | admin/console | Prints colored readiness checks for economy, worth, worlds, caps, and hardening. |
| `/autosell admin warnings` | admin/console | Shows recent suspicious sale warnings. |
| `/autosell admin warnings blacklist <number>` | admin/console | Adds the material from a numbered material warning to the hard blacklist. |
| `/autosell admin report` | admin/console | Prints a compact economy report with top earners, categories, materials, cap usage, and export hint. |
| `/autosell admin export` | admin/console | Writes a Discord-friendly Markdown report. |
| `/autosell admin heatmap [page]` | admin/console | Shows chunk revenue hotspots from verified AutoSell batches. |
| `/autosell admin heatmap export` | admin/console | Writes a Markdown chunk revenue heatmap. |
| `/autosell admin tuning start` | admin/console | Starts passive observation for broker/cap/worth review. |
| `/autosell admin tuning status` | admin/console | Shows the current passive observation sample. |
| `/autosell admin tuning report` | admin/console | Shows suggestions based on observed sales, caps, warnings, materials, and chunks. |
| `/autosell admin tuning stop` | admin/console | Stops passive observation while keeping the collected report. |
| `/autosell admin tuning reset confirm` | admin/console | Clears passive observation data. |
| `/autosell admin tuning export` | admin/console | Writes a Markdown passive tuning report. |
| `/autosell admin boost status` | admin/console | Shows the active AutoSell happy-hour boost, if any. |
| `/autosell admin boost list` | admin/console | Lists configured Happy Hour boost presets. |
| `/autosell admin boost schedule` | admin/console | Shows disabled-by-default scheduled Happy Hour entries. |
| `/autosell admin boost start preset <id>` | admin/console | Starts a configured Happy Hour preset that appears in `/rate`. |
| `/autosell admin boost start <all\|category> <time> <multiplier>` | admin/console | Starts a manual temporary AutoSell boost that appears in `/rate`. |
| `/autosell admin boost stop` | admin/console | Stops the active AutoSell boost. |
| `/autosell admin blacklist list` | admin/console | Lists hard-blocked materials. |
| `/autosell admin blacklist add <material>` | admin/console | Adds a material to the hard blacklist. |
| `/autosell admin blacklist remove <material>` | admin/console | Removes a material from the hard blacklist. |
| `/autosell admin category move <material> <category>` | admin/console | Moves a material into another AutoSell category. |
| `/autosell admin inspect <player>` | admin/console | Shows one player's AutoSell profile and cap state. |
| `/autosell admin stats <player>` | admin/console | Alias for player profile totals. |

Direct console is treated as trusted for AutoSell status, debug, report, reload, and admin maintenance commands. Commands that need a player inventory or GUI still require an in-game player.

Examples:

```text
/autosell
/autosell toggle
/autosell stats
/autosell preview
/autosell quests
/autosell quests gui
/autosell quests claim
/autosell quests claim all
/autosell caps
/autosell trigger full
/autosell trigger always
/autosell items mining
/autosell category mining on
/autosell category fancy off
/autosell item cobblestone on
/autosell item diamond_block off
/autosell debug item
/autosell admin check
/autosell admin warnings
/autosell admin warnings blacklist 1
/autosell admin report
/autosell admin heatmap
/autosell admin heatmap export
/autosell admin tuning start
/autosell admin tuning report
/autosell admin tuning export
/autosell admin boost status
/autosell admin boost list
/autosell admin boost schedule
/autosell admin boost start preset royal_blacksmith
/autosell admin boost start mining 20m 1.25
/autosell admin boost stop
/autosell admin blacklist add diamond_block
/autosell admin category move raw_iron mining
/autosell admin inspect mrfloris
/autosell admin export
```

## Economy And Caps

AutoSell pays a configured convenience multiplier against CMI `Worth.yml`. The default multiplier is `0.90`, so manual selling can remain more profitable while AutoSell remains useful for inventory cleanup.

Daily caps are permission-aware:

| Permission | Default cap |
| --- | ---: |
| default player access | $10,000/day |
| `onembcmi.autosell.cap.20000` | $20,000/day |
| `onembcmi.autosell.cap.100000` | $100,000/day |
| `onembcmi.autosell.cap.250000` | $250,000/day |
| `onembcmi.autosell.cap.500000` | $500,000/day |
| `onembcmi.autosell.cap.unlimited` | unlimited |

## Progression Words

AutoSell has several progress systems that can appear together in the GUI, chat hover text, and `/autosell status`. They do different jobs:

| Word | What it means | Resets? | Reward type |
| --- | --- | --- | --- |
| Broker level | Long-term AutoSell experience from legitimate sold item volume. | No, permanent. | Unlock-style progress, broker points, and small configured bonus. |
| Broker points | Spendable points earned from broker levels, quests, and milestones. | No, unless spent on cap unlocks. | Used in `/autosell caps` for weekly or lifetime daily-cap unlocks. |
| Quests | Repeatable goals such as daily, weekly, or monthly AutoSell tasks. | Yes, by quest period. | Usually broker points, money, and a small daily bonus. Rewards can pay automatically or wait in the quest menu. |
| Milestones | One-time achievements such as total sold items, bulk cleanup batches, broker level, streak days, or sell chains. | No, one-time per player. | Usually broker points, money, EXP, mail, or a small bonus. |
| Streaks | Activity over consecutive qualifying days or enough qualifying days in a week. | Daily/weekly tracking changes over time. | Small temporary bonus for steady activity. |
| Sell chains | Short active-session progress from selling in repeated batches without waiting too long. | Yes, expires after the chain window. | Small temporary batch bonus and chain-based goals. |
| Daily bonus | A temporary payout bonus earned from broker progress, quests, milestones, streaks, or chains. | Yes, it is daily/temporary by design. | Higher AutoSell payout while the bonus is active. |
| Boosters | Server-wide Happy Hour boosts started by staff and shown in `/rate`. | Yes, temporary. | Multiplies AutoSell payouts while active. |
| Cap unlocks | Weekly or lifetime account upgrades bought with broker points. | Weekly unlocks expire; lifetime unlocks do not. | Higher AutoSell daily money cap. |

Quick examples:

- Instant: a verified AutoSell batch sells items and pays money right away.
- Progressive: broker level, quests, streaks, and milestones move forward over time.
- Temporary: sell-chain bonuses, daily bonuses, streak bonuses, and staff Happy Hour boosts eventually expire or reset.
- Permanent: broker level history, unspent broker points, milestone claims, stats, and lifetime cap unlocks stay with the account.
- Daily/weekly/monthly: quest and streak windows use server time, so progress can reset when the period changes.

If the GUI says `Broker level: 0` but `Broker points: 2`, that is valid. It usually means the player earned broker points from quests or milestones before selling enough total AutoSell items to reach broker level 1.

Broker progress counts legitimate AutoSell item volume. Players increase broker level by keeping AutoSell enabled and selling eligible pure vanilla items from normal inventory storage slots. By default, every 10,000 sold items adds one broker level, grants broker points, and can add a small temporary daily bonus capped by `broker.max-multiplier-bonus`. Broker points can also come from quests and milestones, so a player can have broker points while still being broker level 0.

Players can spend broker points in `/autosell caps` to unlock higher daily AutoSell caps for their account. The active cap is the highest value from the player's permission/group cap, an active weekly unlock, and any lifetime unlock. Weekly unlocks last 7 days by default and are cheaper for players who only need a temporary market push. Lifetime unlocks cost more, stay in AutoSell player data, and keep working even if the player's group changes. The old automatic broker-point cap behavior is available only when `caps.legacy-automatic-point-unlocks` is enabled.

Default weekly cap unlocks are:

| Unlock | Duration | Broker points |
| --- | ---: | ---: |
| $75,000 cap | 7 days | 4 |
| $100,000 cap | 7 days | 6 |
| $250,000 cap | 7 days | 15 |
| $500,000 cap | 7 days | 30 |
| $750,000 cap | 7 days | 45 |
| $1,000,000 cap | 7 days | 60 |
| unlimited cap | 7 days | 100 |

Default lifetime cap unlocks are:

| Unlock | Duration | Broker points |
| --- | ---: | ---: |
| $75,000 cap | lifetime | 15 |
| $100,000 cap | lifetime | 20 |
| $250,000 cap | lifetime | 60 |
| $500,000 cap | lifetime | 120 |
| $750,000 cap | lifetime | 180 |
| $1,000,000 cap | lifetime | 240 |
| unlimited cap | lifetime | 500 |

Staff can configure the unlocks under `caps.unlock-gui.options.*`. Normal cap unlocks use numeric `cap` values, while the unlimited unlock can use the readable value `cap: unlimited`. Use `type: weekly` with `duration-days` for temporary unlocks, or `type: lifetime` for permanent account unlocks.

Milestone rewards are configured under `milestones.definitions.*`. They are one-time per player and can watch totals such as `total-items`, `total-earned`, `broker-level`, `streak-days`, `chain-sales`, `bulk-items`, and `bulk-earned`. The `/autosell milestones` GUI shows the visible milestone tree with claimed, ready, and in-progress states so players can see what they are working toward. Bulk milestones are separate from the lifetime ladder: they count the player's best single verified AutoSell batch by item amount or money earned. When a player reaches a milestone, AutoSell can grant broker points, add a small capped daily bonus, play a celebration, write a recent-history entry, and run strictly allowlisted direct-console commands such as CMI money, EXP, mail, message, toast, sound, or title commands.

Default milestone examples include:

| Milestone | Default target | Reward style |
| --- | ---: | --- |
| First Cleanup | 1,000 sold items | broker point, tiny daily bonus, small money reward |
| Inventory Keeper | 10,000 sold items | broker points, daily bonus, money/mail reward |
| Market Regular | $25,000 AutoSell earnings | broker points and money reward |
| Bulk Stack | 256 items in one batch | broker point, tiny daily bonus, small money reward |
| Crate Clearout | 1,024 items in one batch | broker points, daily bonus, money reward |
| Market Sweep | $5,000 in one batch | broker points, daily bonus, money reward |
| Chain Runner | 10 active sell-chain batches | broker point and small bonus |
| Streak Keeper | 7-day AutoSell streak | broker points, daily bonus, money/mail reward |
| Broker Apprentice | broker level 3 | broker points and EXP reward |

Supported milestone types:

| Type | Counts |
| --- | --- |
| `total-items` | lifetime eligible items sold |
| `total-earned` | lifetime money earned through AutoSell |
| `bulk-items` | the largest single verified AutoSell batch by item count |
| `bulk-earned` | the largest single verified AutoSell batch by money earned |
| `chain-sales` | best active sell-chain batch count |
| `streak-days` | best qualifying daily streak |
| `broker-level` | current broker level |

Repeatable AutoSell quests are configured under `quests.definitions.*`. They reset by period and can be daily, weekly, or monthly. Quest progress only moves after a successful verified AutoSell batch, so it uses the same inventory safety, item purity, cap, and anti-farm checks as normal selling. Quests can reward broker points, a small daily bonus capped by `quests.max-daily-bonus-percent`, and direct-console commands from `quests.commands.allowed-prefixes`.

The `/autosell quests gui` page is a quest hub:

- **Claim Rewards** shows completed quest rewards waiting to be claimed.
- **Daily Quests** shows active daily quests that are not already claimed for the current day.
- **Weekly Quests** shows active weekly quests that are not already claimed for the current server week.
- **Monthly Quests** shows active monthly quests that are not already claimed for the current server month.
- **All Quests** shows the full configured quest board, including completed/claimed quests, so players can learn what exists.

By default, quest rewards use manual claiming. Completing a quest stores a pending reward, sends a small ready message, and lets the player claim it from the quest hub or with `/autosell quests claim <id>`. Staff can set `quests.rewards.claim-mode: auto` to restore automatic payout on completion. `quests.rewards.claim-all-enabled` controls whether the claimable rewards page and `/autosell quests claim all` can claim every ready reward at once.

Supported quest types:

| Type | Counts |
| --- | --- |
| `items` | all eligible items sold |
| `earned` | money earned from verified AutoSell batches |
| `category-items` | items sold from one AutoSell category, or from a configured `categories` list |
| `category-earned` | money earned from one AutoSell category, or from a configured `categories` list |
| `material-items` | items sold for one exact material |
| `material-earned` | money earned from one exact material |
| `chain-sales` | active sell-chain batch count |

Default quest examples include:

| Quest | Period | Default target | Reward style |
| --- | --- | ---: | --- |
| Daily Cleanup | daily | 500 items | broker point, tiny daily bonus, money reward |
| Daily Digger | daily | 750 digging items | broker point, tiny daily bonus, money reward |
| Daily Miner | daily | 450 mining/block items | broker point, tiny daily bonus, money reward |
| Daily Value Run | daily | $1,500 earned | broker point, tiny daily bonus, money reward |
| Weekly Bulk Seller | weekly | 5,000 items | broker points, daily bonus, money/mail reward |
| Weekly Market Run | weekly | $20,000 earned | broker points, daily bonus, money reward |
| Weekly Sell Chain | weekly | 8 chain batches | broker points, daily bonus, EXP reward |
| Monthly Hauler | monthly | 25,000 items | broker points, daily bonus, money/mail reward |
| Monthly Market Maker | monthly | $100,000 earned | broker points, daily bonus, money reward |

Category quests support either `category: mining` for one category or `categories: [mining, blocks]` for a broader activity. The default `Daily Miner` uses the list form so mined ores and normal clean block drops both count toward the same quest, while `Daily Digger` remains focused on sand, dirt, gravel, clay, mud, snow, and similar digging materials.

The status output and player-head GUI lore show:

- current broker level and broker points
- how many more sold items are needed for the next broker level
- top AutoSell category and top sold material for that player
- player rank by AutoSell money and by item volume
- the player's share of all AutoSell money recorded on the server
- claimed milestone count and the next configured milestone
- active quest progress and claimed quest count
- today's broker bonus
- current sell chain and streak state

Sell chains are short active-session bonuses. A player has to keep producing legitimate AutoSell batches within the configured chain window. If they stop selling for too long, the chain expires and the next batch starts a new chain.

Daily streaks are longer progression. A day qualifies when the player reaches the configured item or money threshold for that day. Consecutive qualifying days increase the streak and can add a small configured streak bonus. Weekly streak progress can unlock an additional weekly bonus after enough qualifying days in the same server week.

Staff can run temporary AutoSell happy-hour boosts. These multiply AutoSell payouts for all categories or one configured category and are exposed to `/rate` while AutoSell is installed, enabled, rate integration is enabled, and the boost is active.

Presets live under `happy-hour.presets` in `config.yml`, so staff can start a themed boost without remembering the exact category, duration, and multiplier:

```text
/autosell admin boost list
/autosell admin boost start preset royal_blacksmith
/autosell admin boost start preset dig_site
```

Manual boosts still work for one-off testing or special events:

```text
/autosell admin boost start all 20m 1.10
/autosell admin boost start mining 30m 1.25
/autosell admin boost stop
```

When enabled in config, Happy Hour starts and natural ends are announced to online players with a hoverable/clickable chat line that opens `/rate`. The active boost is also saved in AutoSell data, so reloads keep the correct `/rate` status and expired boosts are cleaned up on startup/reload.

Scheduled Happy Hour entries live under `happy-hour.schedule`, but schedule automation is disabled by default. Staff can review configured entries with:

```text
/autosell admin boost schedule
```

To enable automation, set `happy-hour.schedule.enabled: true` and enable one or more entries under `happy-hour.schedule.entries.*`. Each entry points at a configured preset, has a server-time `HH:mm` time in the Europe/Amsterdam server zone, and a day list such as `SATURDAY` and `SUNDAY`. By default, scheduled entries skip if another AutoSell boost is already active.

Admin report/export views include server totals, today's totals, top earners, top categories, top materials, the leading player for each top category/material, cap usage, broker growth, quest progress, warning summaries, chunk revenue heatmaps, passive tuning suggestions, and recent suspicious sale warnings. Use `/autosell admin report` for the compact console view and `/autosell admin export` for a Discord-friendly Markdown file.

## Heatmap And Passive Tuning

AutoSell records verified sale revenue by chunk when `heatmap.enabled` is true. The heatmap is read-only staff context for finding unusual economy hotspots:

```text
/autosell admin heatmap
/autosell admin heatmap export
```

Passive tuning sessions are started manually when staff want to watch live behavior for a while:

```text
/autosell admin tuning start
/autosell admin tuning status
/autosell admin tuning report
/autosell admin tuning export
/autosell admin tuning stop
```

While a session is running, AutoSell records verified sale totals, observed players, material/category/chunk shares, cap usage, and warnings. Reports can suggest things to review, such as one material dominating observed money, one chunk producing most revenue, players nearing caps, or cap unlocks seeing little use. The tuning commands do not edit `config.yml`, `Worth.yml`, broker costs, cap values, blacklist entries, or player data beyond their own observation counters. Staff still decide and apply any real changes separately after reviewing the evidence.

## Worlds

Default world behavior:

- soft whitelist: `wild`, `general`
- optional player toggles: `nether`, `end`
- debug-only world: `spawn`
- hard blacklist: `acid`, `cave`, `oneblock`, `skyblock`, `skygrid`, `builders`, `halloween`, `santa`, `valentine`, `thanksgiving`, `summer`

For test-server spawn testing, enable `debug: true` and either leave `spawn` in `worlds.debug-worlds` for new test profiles or add `spawn` to `worlds.soft-whitelist`.

## Config Files

Main config:

```text
plugins/1MB-CMIAPI/AutoSell/config.yml
```

Player data and reports:

```text
plugins/1MB-CMIAPI/AutoSell/data.yml
plugins/1MB-CMIAPI/AutoSell/exports/
```

The data file stores player preferences, totals, recent sale messages, broker/streak/milestone state, category/material totals, cap snapshots, and current quest progress. Players can inspect their own category/material breakdown with `/autosell stats`, while staff can inspect one profile with `/autosell admin inspect <player>` or review the full economy picture with `/autosell admin report` and `/autosell admin export`. If AutoSell is disabled or removed, player inventories are not changed; the plugin simply stops scanning and selling.

The same data file also stores heatmap rows, passive tuning observation counters, and the last run keys for scheduled Happy Hour entries. These are staff review artifacts, not player inventory data.

AutoSell reads CMI worth values from:

```text
plugins/CMI/Saves/Worth.yml
```

The Worth cache is refreshed automatically on a short interval and can be forced with `/autosell admin reload`.

Inventory-full mode is controlled by:

```yaml
selling:
  default-only-when-nearly-full: false
  nearly-full-empty-slots: 3
```

Players can toggle their own mode with `/autosell trigger full` or `/autosell trigger always`. In full mode, AutoSell waits until the player's main inventory storage slots have the configured number of empty slots or fewer. Hotbar, offhand, and armor are still ignored.

Heatmap, passive tuning, and scheduled Happy Hour defaults are controlled by:

```yaml
heatmap:
  enabled: true
  max-chunks: 250
  report-limit: 10
tuning:
  enabled: true
  min-observation-hours: 24
happy-hour:
  schedule:
    enabled: false
    check-interval-seconds: 60
    skip-while-boost-active: true
    entries:
      weekend_cleanup:
        enabled: false
        preset: server_cleanup
        days:
        - SATURDAY
        - SUNDAY
        time: "18:00"
```

The schedule is intentionally off by default, and the example entry is disabled too. Passive tuning is available by default because it only collects observations after an admin starts a session.

Quest defaults are controlled by:

```yaml
quests:
  enabled: true
  max-daily-bonus-percent: 0.03
  commands:
    enabled: true
    allowed-prefixes:
    - cmi money give
    - cmi exp give
    - cmi mail send
  definitions:
    daily_cleanup:
      enabled: true
      period: daily
      type: items
      target: 500
      title: Daily Cleanup
      description: AutoSell 500 eligible inventory items today.
      broker-points: 1
      daily-bonus-percent: 0.0025
      commands:
      - cmi money give {player} 250
```

Plain vanilla items can still carry harmless Paper metadata internally. AutoSell does not reject those empty/default item components, but it still blocks named, lored, enchanted, damaged, PDC-marked, storage, and custom-model items.

The safety setting for this is `selling.reject-custom-item-meta`. Keep it enabled for production so AutoSell only handles plain, ordinary items.

## Permissions

Player permissions default to true where useful:

```text
onembcmi.autosell.use
onembcmi.autosell.toggle
onembcmi.autosell.preview
```

AutoSell requires both `onembcmi.autosell.use` and `onembcmi.autosell.toggle` for background selling. These permissions are checked when a sale is scheduled and immediately before the verified inventory mutation. If either permission is removed, an enabled profile is turned off and saved; restoring the permission does not silently resume selling, so the player must opt in again. A pending delayed batch also exits when the player switches AutoSell off before it runs.

Admin permissions default to false:

```text
onembcmi.autosell.admin
onembcmi.autosell.reload
onembcmi.autosell.debug
onembcmi.autosell.warnings
onembcmi.autosell.export
```

Cap permissions default to false and should be assigned through LuckPerms groups:

```text
onembcmi.autosell.cap.20000
onembcmi.autosell.cap.100000
onembcmi.autosell.cap.250000
onembcmi.autosell.cap.500000
onembcmi.autosell.cap.unlimited
```

## Hooks

- CMI and CMILib are required by the project and provide the worth/economy context.
- `1MB-CMIAPI-Lib` provides shared feature metadata, config/comment handling, debug/help/info behavior, prefix styling, and the hardened GUI service.
- Vault is required at runtime for economy payments; on 1MoreBlock this is backed by CMI money.
- LuckPerms can grant cap and admin permissions.
- PlaceholderAPI is optional for future expansion.
- `1MB-CMIAPI-Menu` is optional; when present and enabled, AutoSell GUIs show a Main Menu shortcut beside the close button.

## Notes

If AutoSell is removed or globally disabled, no items are changed. Existing player inventories stay normal Minecraft inventories, and the plugin simply stops scanning and selling until it is re-enabled.
