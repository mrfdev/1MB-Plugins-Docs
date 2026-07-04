# AFKShrine

## Purpose

AFKShrine is a player-fun plugin that turns CMI AFK state into a small visible experience. When a player becomes AFK, the plugin can show a subtle shrine effect around them with soft dust particles, optional sparkles, a private boss bar, and optional text that explains they are away.

The goal is cosmetic and social, not economy-heavy. It should be safe to test because it listens to AFK state and displays effects rather than moving items, money, or teleports.

The reward side is intentionally claim/trade based. AFK sessions can create pending AFKShrine points, milestones, quest completions, and leaderboard progress, but the plugin does not automatically pay kits, money, or commands just because someone went AFK. Players must return and use `/afkshrine claim` or `/afkshrine trade`.

## Feature Ideas

- Detect when CMI marks a player as AFK.
- Show a configurable dust-particle ring around the AFK player.
- Show optional sparkle particles above the AFK player.
- Show an optional private boss bar to the AFK player.
- Track runtime AFK enter, leave, kick, active, preview, and disabled counts for support checks.
- Let staff list current active, preview, and disabled shrine state with pagination.
- Let staff stop this plugin's shrine visuals for a player without changing CMI's AFK state.
- Let staff dump current runtime state into cache for debugging.
- Let players choose from persistent, permission-gated shrine styles.
- Let players use `/afkshrine preset <preset>` as the friendly player-facing command for their particle preset.
- Let permissioned staff/testers preview a selected style for a short controlled duration or stop their preview.
- Hide preview commands, tab suggestions, and preset preview links from players without `onembcmi.afkshrine.preview`.
- Show friendly preset tiers and locked hints without exposing permission nodes to normal players.
- Log preset selections and actual active/preview starts so staff can review which particle combinations are popular over long periods.
- Show a welcome-back summary with AFK time, pending points earned, cap progress, new milestones/quests, and no-point reasons.
- Let staff inspect a player's current AFK shrine state.
- Let staff run `/afkshrine admin check` for a read-only live-readiness review before rollout.
- Let staff export `/afkshrine admin report` Markdown snapshots for passive review after testing or live windows.
- Support cache cleanup for temporary effect state.
- Track pending AFKShrine points for qualifying AFK sessions.
- Require players to claim pending points before spending them.
- Let players trade claimed AFKShrine points for configured command rewards.
- Track time milestones, biome milestones, safety milestones, risk milestones, and AFK adventure achievements.
- Track repeatability rules and award counts so milestones can be once-only, limited per reset window, or unlimited.
- Track AFK day streaks with milestone points.
- Enforce anti-grind controls: minimum session length, counted-session cooldown, same-location cooldown, and daily point cap.
- Add small playtime-based point bonuses for established/active players without requiring automatic payouts.
- Show daily, weekly, monthly, and lifetime AFKShrine leaderboards.
- Count normal AFKShrine progress only in configured allowed worlds, while keeping spawn/creative/legacy worlds blocked by default.
- Support seasonal event worlds that only grant explicit `event:<id>` milestones during configured months.
- Keep reward commands config-driven, with default CMI kit naming such as `afkshrine_milestone_time_30`.

## Accepted Roadmap

These ideas were accepted for the longer AFKShrine direction and should be implemented gradually:

- No automatic payout: rewards are claimed or traded by players after returning from AFK.
- Milestone types: `time:<minutes>`, `biome:<id>`, `safety:<type>`, `risk:<type>`, and quest/adventure ids.
- Milestone repeatability: each milestone or quest can be once-only, limited to `N` awards, unlimited, or reset on a daily/weekly/monthly window.
- Configurable global/per-milestone command rewards.
- Public milestone feedback such as fireworks, sounds, titles, toasts, or server messages.
- AFKShrine points that are earned from AFK time and quests, then spent through claim/trade flows.
- Top lists for daily, weekly, monthly, and lifetime progress.
- Organic anti-grind checks, so short repeat AFK toggles do not farm points.
- Daily caps to keep the reward economy bounded.
- Optional playtime context bonuses, so real players can get a small boost without clone-idle farming.
- Configurable quest requirements, so staff can make quests tougher or easier.
- AFK quests, including safe-space and risk/survival variants.
- Quest points on top of AFK time points.
- AFK streaks and streak milestones.
- Debug/admin review of recent point reasons and leaderboard data.
- AFK adventure achievements such as open sky, underground, underwater, high altitude, Nether, and End.

Additional ideas to consider next:

- Rested bonus: a short active-play bonus after claiming AFK points, so players come back and play.
- Seasonal AFK quest sets, such as ocean week, Nether week, rainy week, or winter shrine.
- Community milestones where the whole server unlocks a temporary celebration after enough AFK claims.
- No-repeat zones that can be configured more strictly for known AFK farms.
- Deeper AFK Shrine journal exports for monthly balancing beyond the current passive staff report.
- Danger score multipliers from light level, weather, open sky, water, world, and damage taken.
- Grace recovery for server restarts/timeouts so pending AFK progress is preserved but never duplicated.
- Reward preview output that explains why a player is or is not eligible for a trade.
- Staff-only audit command for suspicious repeated AFK sessions without using same-IP checks.
- Repeatable themed collection milestones, such as flowers or shrine tokens, where each configured progress id can be earned `N` times or once per reset period.
- Milestone reset summaries that tell a player which repeatable goals refreshed today, this week, or this month.
- Per-world shrine themes where a risk or safety milestone can use different display text and reward rows by world.
- Shrine weather quests for rain, thunder, clear sky, and night sessions.
- Staff-defined protected shrine areas where safe-space milestones are easier, and wild areas where risk milestones are worth more.
- Return ceremony presets that play a small local particle/sound sequence when a player claims a bigger pending bundle.
- Linked PassportDiscovery goals where AFK in newly discovered biomes can count toward both systems later.
- AFK Shrine collection album showing limited/repeatable milestone counts like `3/10` or `unlimited`.
- Configurable cooldown categories, so time milestones, biome milestones, and risk milestones can each have different anti-repeat behavior.
- Monthly staff report of most-earned and least-earned AFK milestones for balancing.

## Commands

```text
/afkshrine
/afkshrine toggle
/afkshrine status
/afkshrine stats
/afkshrine balance
/afkshrine claim
/afkshrine rewards [page]
/afkshrine trade <reward> [confirm]
/afkshrine quests
/afkshrine top [daily|weekly|monthly|lifetime]
/afkshrine styles
/afkshrine style [style]
/afkshrine presets
/afkshrine preset [preset]
/afkshrine preview [style] [seconds]
/afkshrine preview stop
/afkshrine admin
/afkshrine admin check
/afkshrine admin report
/afkshrine admin audit <player>
/afkshrine admin recent [sessions|trades] [page]
/afkshrine admin inspect <player>
/afkshrine admin list [active|preview|disabled|all] [page]
/afkshrine admin stop <player>
/afkshrine admin dump
/afkshrine admin reload
```

Global library examples:

```text
/1mbcmi debug plugin afkshrine
/1mbcmi config afkshrine
/1mbcmi config set afkshrine messages.enter.enabled false
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.afkshrine.use
onembcmi.afkshrine.claim
onembcmi.afkshrine.rewards
onembcmi.afkshrine.trade
onembcmi.afkshrine.top
onembcmi.afkshrine.style
onembcmi.afkshrine.style.mint
onembcmi.afkshrine.style.twilight
onembcmi.afkshrine.style.ember
onembcmi.afkshrine.style.aurora
onembcmi.afkshrine.style.ocean
onembcmi.afkshrine.style.amethyst
onembcmi.afkshrine.style.blossom
onembcmi.afkshrine.style.frost
onembcmi.afkshrine.style.honey
onembcmi.afkshrine.style.void
onembcmi.afkshrine.style.prism
onembcmi.afkshrine.style.meadow
onembcmi.afkshrine.style.sunrise
onembcmi.afkshrine.style.coral
onembcmi.afkshrine.style.lagoon
onembcmi.afkshrine.style.lavender
onembcmi.afkshrine.style.copper
onembcmi.afkshrine.style.emerald
onembcmi.afkshrine.style.sapphire
onembcmi.afkshrine.style.pearl
onembcmi.afkshrine.style.dusk
onembcmi.afkshrine.style.lantern
onembcmi.afkshrine.style.cherry
onembcmi.afkshrine.style.storm
onembcmi.afkshrine.style.echo
onembcmi.afkshrine.style.*
onembcmi.afkshrine.preview
onembcmi.afkshrine.admin
onembcmi.afkshrine.admin.check
onembcmi.afkshrine.admin.report
onembcmi.afkshrine.admin.audit
onembcmi.afkshrine.admin.recent
onembcmi.afkshrine.admin.inspect
onembcmi.afkshrine.admin.list
onembcmi.afkshrine.admin.stop
onembcmi.afkshrine.admin.dump
onembcmi.afkshrine.admin.reload
```

`onembcmi.afkshrine.preview` defaults to false. Players without it do not see preview in help, first-level tab completion, preview argument tab completion, or `/afkshrine presets` preview links.

Only the default preset is open without an extra style permission. Non-default preset nodes such as `onembcmi.afkshrine.style.mint`, `onembcmi.afkshrine.style.aurora`, `onembcmi.afkshrine.style.prism`, `onembcmi.afkshrine.style.sunrise`, and `onembcmi.afkshrine.style.storm` default to false, so staff can use them as rank, milestone, seasonal, or manual unlocks. Grant `onembcmi.afkshrine.style.*` only when a player or group should access every configured preset.

## Placeholders

```text
%onembcmi_afkshrine.enabled%
%onembcmi_afkshrine.style%
%onembcmi_afkshrine.style.name%
%onembcmi_afkshrine.styles.count%
%onembcmi_afkshrine.opted_in%
%onembcmi_afkshrine.points.balance%
%onembcmi_afkshrine.points.pending%
%onembcmi_afkshrine.points.lifetime%
%onembcmi_afkshrine.streak.current%
%onembcmi_afkshrine.streak.best%
%onembcmi_afkshrine.milestones.count%
%onembcmi_afkshrine.quests.count%
%onembcmi_afkshrine.biomes.count%
%onembcmi_afkshrine.events.count%
%onembcmi_afkshrine.progress.awards.count%
%onembcmi_afkshrine.last.session.seconds%
%onembcmi_afkshrine.last.session.points%
%onembcmi_afkshrine.is_afk%
%onembcmi_afkshrine.afk_seconds%
%onembcmi_afkshrine.active.count%
%onembcmi_afkshrine.preview.count%
%onembcmi_afkshrine.disabled.count%
%onembcmi_afkshrine.runtime.enters%
%onembcmi_afkshrine.runtime.leaves%
%onembcmi_afkshrine.runtime.kicks%
%onembcmi_afkshrine.runtime.afk_seconds_total%
%onembcmi_afkshrine.runtime.pending_points%
%onembcmi_afkshrine.runtime.claimed_points%
%onembcmi_afkshrine.runtime.traded_points%
%onembcmi_afkshrine.runtime.quest_completions%
%onembcmi_afkshrine.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIAfkEnterEvent`
- `CMIAfkLeaveEvent`
- `CMIAfkKickEvent`
- `CMIUser` AFK state where useful

CMILib:

- particles/effects if the CMILib API surface is clean enough
- boss bars where useful
- shared GUI or message helpers from `1MB-CMIAPI-LIB`

CMI:

- CMI remains the authority for AFK state. AFKShrine should not replace CMI AFK logic.

Paper:

- Paper particle and bossbar APIs for cosmetic effects
- scheduler usage for repeated visual effects
- strict command argument parsing

## Config

Important config paths:

```text
enabled
messages.enter.enabled
messages.leave.enabled
preview.enabled
preview.duration-seconds
effects.interval-ticks
particles.enabled
particles.radius-centimeters
particles.points
particles.dust-size-percent
particles.color
particles.sparkles.enabled
bossbar.enabled
bossbar.title
bossbar.preview-title
bossbar.color
bossbar.progress-percent
styles.default-style
styles.auto-add-default-presets
styles.available
styles.usage-log.enabled
styles.usage-log.log-selection
styles.usage-log.log-active-start
styles.usage-log.log-preview-start
styles.<style>.display-name
styles.<style>.permission
styles.<style>.particle-color
styles.<style>.bossbar-color
styles.<style>.bossbar-title
styles.<style>.preview-title
styles.<style>.tier
styles.<style>.unlock-label
styles.<style>.radius-centimeters
styles.<style>.points
styles.<style>.dust-size-percent
styles.<style>.sparkles
points.enabled
points.time-zone
points.base-per-minute
points.max-per-session
points.max-per-day
points.require-manual-claim
tracking.min-session-seconds
tracking.min-seconds-between-counted-sessions
tracking.same-location-radius-blocks
tracking.same-location-cooldown-minutes
tracking.allowed-worlds
tracking.disabled-worlds
events.enabled
events.worlds
events.repeat.mode
events.repeat.max-count
events.repeat.reset
playtime-bonus.enabled
playtime-bonus.total-days-threshold
playtime-bonus.total-days-percent
playtime-bonus.observed-online-minutes-threshold
playtime-bonus.observed-online-percent
milestones.time.enabled
milestones.time.minutes
milestones.time.points
milestones.time.repeat.mode
milestones.time.repeat.max-count
milestones.time.repeat.reset
milestones.biome.enabled
milestones.biome.min-session-seconds
milestones.biome.points
milestones.biome.repeat.mode
milestones.biome.repeat.max-count
milestones.biome.repeat.reset
milestones.safety.enabled
milestones.safety.min-session-seconds
milestones.safety.points
milestones.safety.require-no-damage
milestones.safety.require-solid-ground
milestones.safety.repeat.mode
milestones.safety.repeat.max-count
milestones.safety.repeat.reset
milestones.risk.enabled
milestones.risk.min-session-seconds
milestones.risk.points
milestones.risk.require-damage-or-water-or-open-sky
milestones.risk.repeat.mode
milestones.risk.repeat.max-count
milestones.risk.repeat.reset
quests.enabled
quests.points
quests.requirements.require-min-session
quests.requirements.require-new-completion
quests.adventure-achievements.enabled
quests.adventure-achievements.min-session-seconds
quests.adventure-achievements.ids
quests.repeat.mode
quests.repeat.max-count
quests.repeat.reset
streaks.enabled
streaks.milestones-days
streaks.milestone-points
streaks.repeat.mode
streaks.repeat.max-count
streaks.repeat.reset
progress.overrides
hooks.enabled
hooks.session-earned.commands
hooks.claim.commands
hooks.trade.commands
hooks.progress.commands
hooks.progress.specific
leaderboards.enabled
leaderboards.limit
rewards.per-page
rewards.trades
audit.session-log.enabled
audit.trade-log.enabled
audit.recent-per-page
admin.list-per-page
dump.max-records
```

Particle colors expect hex colors such as `#cdb4db`. Bossbar colors use Bukkit bossbar color names such as `PINK`, `BLUE`, `PURPLE`, `WHITE`, `GREEN`, `YELLOW`, or `RED`.

Repeat modes support `once`, `limited`, and `unlimited`. Reset windows support `never`, `daily`, `weekly`, and `monthly`. Exact progress ids can be overridden with `progress.overrides` rows in this format:

```text
progress-id|mode|max-count|reset
risk:open-sky|limited|3|weekly
biome:minecraft:plains|unlimited|0|daily
```

Default configured styles include 26 presets: `default`, `mint`, `twilight`, `ember`, `aurora`, `ocean`, `amethyst`, `blossom`, `frost`, `honey`, `void`, `prism`, `meadow`, `sunrise`, `coral`, `lagoon`, `lavender`, `copper`, `emerald`, `sapphire`, `pearl`, `dusk`, `lantern`, `cherry`, `storm`, and `echo`. The default style is usable by everyone; the other starter/rank/seasonal/rare styles are permission-gated so they can be staff-only, donor-only, rank-based, or unlocked later through another system.

World tracking is default-deny. Normal AFKShrine points only count in `tracking.allowed-worlds`, which defaults to `general`, `wild`, `nether`, `end`, `oneblock`, `skyblock`, `skygrid`, `acid`, and `cave`. `tracking.disabled-worlds` is a hard block and defaults to `spawn`, `builders`, and `legacy`.

Event worlds are not normal AFK farming worlds. `events.worlds` rows use `world|months|progress-id|points`, for example `santa|12|event:santa|25`. A player AFKing in `santa` during December can earn the configured `event:santa` milestone once by default, but outside December the world does not count. The default event rows are `santa`, `halloween`, `thanksgiving`, `valentine`, and `summer`; staff can change months, points, or repeat rules as events change.

Optional hooks are disabled by being empty, even though `hooks.enabled` defaults to true. They are meant for feedback such as sounds, titles, toasts, fireworks, and public milestone messages. Keep real rewards in `/afkshrine claim` and `/afkshrine trade` unless staff intentionally chooses otherwise.

Hook command placeholders:

```text
{player}
{uuid}
{points}
{seconds}
{minutes}
{world}
{biome}
{damage}
{milestones}
{quests}
{progress}
{progress_type}
{reason}
{id}
{reward}
{cost}
{balance}
```

Specific progress hooks use this row format:

```text
progress-id|console command;;second console command
streak:7|cmi broadcast {player} reached a 7 day AFK Shrine streak!
```

Session and trade audit rows are appended to:

```text
plugins/1MB-CMIAPI/AFKShrine/logs/sessions.log
plugins/1MB-CMIAPI/AFKShrine/logs/trades.log
```

Staff can review them in-game with:

```text
/afkshrine admin check
/afkshrine admin report
/afkshrine admin audit <player>
/afkshrine admin recent sessions
/afkshrine admin recent trades
```

`/afkshrine admin check` is read-only and console-safe. It reports dependency state, debug mode, point caps, minimum session time, allowed/disabled/event world overlap, default preset access, non-default preset permissions, invalid preset colors, reward row shape, configured console command counts, and whether session/trade audit logs are enabled.

`/afkshrine admin report` writes a Markdown report into the AFKShrine cache folder. The report includes runtime counters, point/economy counters, active/preview/disabled counts, the current config summary, readiness findings, and recent session/trade audit rows. It is meant for passive staff review after a live test window.

Reward trades and optional hooks are still owner-configured console commands. The readiness check/report call this out for manual review, but they do not block or rewrite commands.

## Data

Long-lived player choices can live in shared playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
afkshrine:
  enabled: true
  style: "default"
  points:
    balance: 0
    pending: 0
    lifetime-earned: 0
    claimed-trades: []
    periods:
      daily:
        "2026-05-19": 0
      weekly:
        "2026-W21": 0
      monthly:
        "2026-05": 0
  sessions:
    total: 0
    afk-seconds: 0
  streak:
    current: 0
    best: 0
    last-date: ""
  milestones:
    completed: []
  quests:
    completed: []
  biomes:
    completed: []
  progress:
    awards:
      - "time:30|1|lifetime|1|2026-05-19T12:00:00Z"
```

Player opt-out, selected style, pending points, claimed balance, trade claims, milestones, quests, biomes, repeat award counts, streaks, and leaderboard period totals are persistent. Temporary visual state should live in cache and be safe to clean.

Runtime dump files are written to the AFKShrine cache folder and include active, preview, disabled, and runtime counter state only. They are meant for debugging and support, not permanent player history.

## Shared Library Usage

AFKShrine uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, tab filtering, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, and debug metadata.

## Particle Presets

Players can list and select their AFKShrine particle preset with:

```text
/afkshrine presets
/afkshrine preset <preset>
/afkshrine preview <preset>
```

The older `/afkshrine styles` and `/afkshrine style <style>` forms still work, but `preset` is the friendlier wording for players. Preview requires `onembcmi.afkshrine.preview`, which defaults to false.

Built-in presets are:

```text
default, mint, twilight, ember, aurora, ocean, amethyst, blossom, frost, honey, void, prism, meadow, sunrise, coral, lagoon, lavender, copper, emerald, sapphire, pearl, dusk, lantern, cherry, storm, echo
```

Older configs that already have `styles.available` can still receive newly shipped built-in presets when `styles.auto-add-default-presets` is true. Staff can lock or unlock any preset by changing `styles.<preset>.permission` and the matching LuckPerms node.

Each preset has friendly display metadata:

```text
styles.<preset>.tier
styles.<preset>.unlock-label
```

`/afkshrine presets` shows the tier for every preset and, when locked, shows the unlock label instead of permission nodes. This keeps the player output useful while leaving node details in `/afkshrine debug permissions` and `/1mbcmi debug plugin afkshrine permissions`.

Long-term preset usage is appended to:

```text
plugins/1MB-CMIAPI/AFKShrine/logs/style-usage.log
```

Each row records timestamp, action (`select`, `active-start`, or `preview-start`), UUID, player name, preset id, and display name. This gives us a low-drama way to review most-used and least-used presets later.

[Plugin index](README.md)
