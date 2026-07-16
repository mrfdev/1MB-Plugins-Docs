# AFKShrine

## Purpose

AFKShrine is a player-fun plugin that turns CMI AFK state into a small visible experience. When a player becomes AFK, the plugin can show a subtle shrine effect around them with soft dust particles, optional sparkles, a private boss bar, and optional text that explains they are away.

The goal is cosmetic and social, not economy-heavy. It should be safe to test because it listens to AFK state and displays effects rather than moving items, money, or teleports.

The reward side is intentionally claim/trade based. AFK sessions can create pending AFKShrine tokens, milestones, quest completions, and leaderboard progress, but the plugin does not automatically pay kits, money, or commands just because someone went AFK. Players must return and use `/afkshrine claim` or `/afkshrine trade`. Bed sleeping can also create a tiny AFKShrine-adjacent pending-token reward, but it uses a separate low-cap path with a same-area cooldown and does not run normal AFK milestone rewards.

## Player-Facing Feature Guide

These are the AFKShrine features players should be able to learn about from the public docs:

- AFK shrine visuals: when CMI marks a player as AFK, AFKShrine can show a subtle personal shrine with soft particles, optional sparkles, and a private bossbar.
- AFK postcards: when the player returns, AFKShrine can show a private return postcard with AFK time, approximate place, biome, weather or scene, damage taken, why the visit counted or did not count, newly completed milestones or quests, daily cap room, and clickable next actions such as `/afkshrine claim`.
- Dynamic bossbar progress: while the player is AFK, the bossbar can rotate through session duration, minimum-session progress, estimated session cap, pending tokens, daily cap, streak, seasonal quest progress, and community milestone progress.
- Tokens, claim, and rewards: qualifying AFK sessions create pending AFKShrine tokens. Players use `/afkshrine claim` to move pending tokens into their spendable balance, then `/afkshrine rewards` and `/afkshrine trade` to review and claim configured rewards.
- Milestones and quests: players can discover time, biome, safety, risk, adventure, weather, seasonal, dimension, collection, and streak goals through `/afkshrine milestones`, `/afkshrine quests`, `/afkshrine album`, and `/afkshrine resets`.
- Presets and personalization: players can list and choose unlocked particle presets with `/afkshrine presets` and `/afkshrine preset`, with hover details explaining each preset without exposing permission nodes.
- Bed rest: sleeping in a bed can optionally count as a tiny AFKShrine-adjacent activity with low pending-token rewards and same-area cooldown protection.
- Community milestones: server-wide claimed-token totals can unlock temporary celebration windows or visual shrine themes when configured.
- Tools and upgrades: when enabled, `/afkshrine tools` can let players spend captured AFKShrine special items on staff-configured upgrades. `/afkshrine books` independently exposes only lore-book exchanges through `onembcmi.afkshrine.books`, so staff can release the books while spear, shield, and other tools stay locked.
- AFKShrine GUI: `/afkshrine gui` and `/afkshrine menu` open a player hub for stats, claiming, rewards, tools, milestones, albums, presets, leaderboards, bed rest, and help.

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
- Show a postcard-style welcome-back summary with AFK time, approximate place, biome, scene, damage taken, pending points earned, cap progress, new milestones/quests, and friendly no-point reasons.
- Count qualifying time spent sleeping in a bed as a tiny AFKShrine-adjacent activity, with low pending-token rewards and same-area cooldown protection.
- Cycle the active AFK bossbar through low-frequency progress views such as session time, minimum reward eligibility, session cap progress, pending tokens, daily cap, streak, seasonal quests, and community milestones.
- Preserve active AFK progress across clean restarts and odd disconnect windows with a one-shot recovery marker.
- Let staff inspect a player's current AFK shrine state.
- Let staff run `/afkshrine admin check` for a read-only live-readiness review before rollout.
- Let staff export `/afkshrine admin report` Markdown snapshots for passive review after testing or live windows.
- Let staff export monthly `/afkshrine admin journal` files for deeper balancing and support review.
- Support cache cleanup for temporary effect state.
- Track pending AFKShrine points for qualifying AFK sessions.
- Require players to claim pending points before spending them.
- Let players trade claimed AFKShrine points for configured command rewards.
- Show reward preview output that explains readiness, missing points, one-time claim state, disabled reward rows, and configured command count before a trade is confirmed.
- Let staff capture exact AFKShrine special items such as the AFK Shrine Token, then use those captured templates as safe tool/action currency.
- Provide `/afkshrine gui`, `/afkshrine menu`, `/afkshrine tools`, and `/afkshrine books` as AFKShrine menu surfaces, with every captured-item exchange previewing its exact cost before players confirm it.
- Track time milestones, biome milestones, safety milestones, risk milestones, and AFK adventure achievements.
- Track weather/time AFK quests for rain, thunder, night, and clear-sky sessions with stable-world and stable-location guards.
- Show a player-facing AFK Shrine collection album with collected/open entries, repeat limits, reset windows, and total repeat counts.
- Show a player-facing reset summary that explains which repeatable milestones are ready now, already used this daily/weekly/monthly window, inactive, or one-time complete.
- Track configurable seasonal AFK quest sets such as ocean week, Nether week, winter shrine, and rainy week.
- Track server-wide claimed AFKShrine point totals and unlock temporary community shrine celebrations at configured milestones.
- Track repeatability rules and award counts so milestones can be once-only, limited per reset window, or unlimited.
- Grant a bounded rested state after players claim a real AFK point bundle, with session-length, claim-size, cooldown, and daily-use gates.
- Track coarse no-repeat AFK zones in report-only mode by default, so staff can encourage variety without silently punishing AFK rooms.
- Calculate passive danger-score multiplier candidates from session snapshots, weather, water, world, height, and damage, with active payout mode behind config.
- Let staff review suspicious repeated AFK zones in-game and in Markdown reports without same-IP checks.
- Track AFK day streaks with milestone points.
- Enforce anti-grind controls: minimum session length, counted-session cooldown, same-location cooldown, and daily point cap.
- Add small playtime-based point bonuses for established/active players without requiring automatic payouts.
- Show daily, weekly, monthly, and lifetime AFKShrine leaderboards.
- Count normal AFKShrine progress only in configured allowed worlds, while keeping spawn/creative/legacy worlds blocked by default.
- Support seasonal event worlds that only grant explicit `event:<id>` milestones during configured months.
- Support seasonal quest windows by month, ISO week, date range, or always-on rules.
- Let community milestones temporarily override active shrine visuals with a configured preset without granting that preset permanently.
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
- Seasonal AFK quest sets for themed live windows.
- Weather-specific AFK quests for rain, thunder, night, and clear-sky sessions.
- Community milestones based on claimed server-wide AFKShrine points.
- Rested state after claiming enough pending points from a qualifying AFK session.
- Report-only no-repeat zone history, with an optional active dampening mode for later tuning.
- Danger-score multiplier candidates, with report-only defaults and active mode available when staff wants to pay extra for varied/riskier locations.
- Staff suspicious repeated-zone audit output.
- Passive bed-rest token checks with conservative defaults, same-area cooldown history, and staff audit rows.
- Dynamic active bossbar progress views that rotate on a configurable schedule without recalculating every particle tick.
- AFK postcards / richer return summaries that explain where the player was AFK, what the shrine observed, and why the visit did or did not create tokens.
- Monthly AFKShrine journal exports for staff balancing and support review from passive audit logs.
- Milestone reset summaries for daily, weekly, and monthly repeatable goals.

Additional ideas to consider next:

- Repeatable themed collection milestones, such as flowers or shrine tokens, where each configured progress id can be earned `N` times or once per reset period.
- Per-world shrine themes where a risk or safety milestone can use different display text and reward rows by world.
- Staff-defined protected shrine areas where safe-space milestones are easier, and wild areas where risk milestones are worth more.
- Return ceremony presets that play a small local particle/sound sequence when a player claims a bigger pending bundle.
- Linked PassportDiscovery goals where AFK in newly discovered biomes can count toward both systems later.
- Configurable cooldown categories, so time milestones, biome milestones, and risk milestones can each have different anti-repeat behavior.
- Monthly staff report of most-earned and least-earned AFK milestones for balancing.
- Captured spear/shield identity checks before upgrade commands run, if staff wants upgrades to require both the token cost and the original shrine item.

## Commands

```text
/afkshrine
/afkshrine toggle
/afkshrine status
/afkshrine stats [personal|server]
/afkshrine stats 1
/afkshrine stats 2
/afkshrine balance
/afkshrine claim
/afkshrine rewards [page]
/afkshrine trade
/afkshrine trade <reward> [confirm]
/afkshrine gui
/afkshrine menu
/afkshrine tools
/afkshrine tools list
/afkshrine tools claim <action> [confirm]
/afkshrine books
/afkshrine books list
/afkshrine books claim <action> [confirm]
/afkshrine milestones [all|time|biomes|safety|risk|quests|weather|seasonal|dimensions|collections|streaks|claim-streak] [page]
/afkshrine quests
/afkshrine resets [category|daily|weekly|monthly|ready|used|complete|inactive] [page]
/afkshrine album [all|time|biomes|safety|risk|events|quests|weather|seasonal|streaks|collections] [page]
/afkshrine community
/afkshrine top [daily|weekly|monthly|lifetime]
/afkshrine styles
/afkshrine style [style]
/afkshrine presets
/afkshrine preset [preset]
/afkshrine preview [style] [seconds]
/afkshrine preview stop
/afkshrine debug grant <player> <claimed-points|token-items> <amount>
/afkshrine admin
/afkshrine admin check
/afkshrine admin report
/afkshrine admin journal [latest|YYYY-MM] [markdown|discord]
/afkshrine admin capture <item>
/afkshrine admin suspicious [page]
/afkshrine admin audit <player>
/afkshrine admin recent [sessions|sleep|trades|tools] [page]
/afkshrine admin inspect <player>
/afkshrine admin list [active|preview|disabled|all] [page]
/afkshrine admin stop <player>
/afkshrine admin dump
/afkshrine admin reload
```

The `[AFKShrine]` chat prefix is clickable and runs `/afkshrine menu`, giving players a quick way back to the AFKShrine GUI from feature messages. The AFK-enter message highlights `active` in green. Return summaries are AFK postcards by default: a private player-facing summary of away time, approximate location, biome, weather/scene, damage taken, why the visit counted or did not create tokens, new milestone/quest discoveries, daily cap room, and useful next actions. Important return and claim values use mint text so earned tokens, pending totals, claimed amounts, balances, and the Rested Return threshold remain distinguishable from the surrounding sentence. When the player has claimable AFKShrine tokens, only the short `Click this text to claim them now.` call to action is underlined and clickable; its hover text explains that clicking runs `/afkshrine claim`.

While a player is actively AFK, the bossbar can rotate through progress views instead of showing one static title. The default dynamic cycle refreshes each player's bossbar snapshot every 30 seconds and changes view every 120 seconds. Supported views are session duration, minimum-session eligibility, estimated session cap progress, pending tokens, daily cap usage, streak progress, active seasonal quest progress, and community milestone or celebration progress. Preview bossbars stay static so staff can quickly inspect particle styles without mixing in live progress text.

`/afkshrine gui` and `/afkshrine menu` open the player-facing AFKShrine hub. It uses the shared 1MB light-blue frame style, a player head in the bottom-left stats slot, pagination in the middle of the bottom row, a `Back to /menu` button beside the close button, and a barrier close button in the bottom-right. The first page is an index with deeper pages for player stats, claiming pending tokens, reward trades, permitted tools and upgrades, lore-book exchanges, milestone/album progress, streaks, seasonal quests, community milestones, presets with GUI preview cooldown, leaderboards, bed rest info, and chat command help. Players with only `onembcmi.afkshrine.books` see the lore-book button and its five book kits but do not see the tools, spear, or shield buttons. GUI lore uses the same soft pastel tooltip style as other 1MB menus, with readable `key: value` lines and highlighted click actions. Captured item template previews are staff-only and require `onembcmi.afkshrine.admin` or `onembcmi.afkshrine.admin.capture`.

`/afkshrine rewards [page]` shows a player-first trade overview. At the top it separates `Claimed tokens available to trade with` from `Pending tokens earned`, then each configured reward is marked `AVAILABLE`, `NEED <amount>`, `CLAIMED`, `DISABLED`, or `PREVIEW` from console. Each entry shows cost, one-time or repeatable claim type, already-claimed state when relevant, configured command count, missing tokens, and a safe clickable `/afkshrine trade <reward>` preview command when the player can afford it.

`/afkshrine stats` is player-first. For players it opens personal page 1, showing `Pending tokens earned`, `Claimed tokens available to trade with`, lifetime tokens, current/last AFK session, daily cap left, streaks, milestones, quests, preset, and rested state. `/afkshrine stats personal` and `/afkshrine stats 1` show the same personal page. `/afkshrine stats server`, `/afkshrine stats global`, and `/afkshrine stats 2` show page 2 with server-wide runtime counters such as AFK enters/leaves/kicks, total observed AFK time, server pending/claimed/traded token totals, quest totals, and cache size. Console defaults to the server page.

Bed rest rewards are passive. When `sleep.enabled` is true, a player who stays in bed for at least `sleep.min-session-seconds` can earn the tiny `sleep.points-per-session` pending-token reward, capped by `sleep.max-points-per-day` and the normal AFKShrine daily cap. The default is intentionally low: 1 pending token per qualifying bed rest, at most 2 per day. Reusing the same coarse bed area before `sleep.same-zone-cooldown-minutes` expires is recorded but does not award tokens. If CMI marks the player AFK while they are sleeping, AFKShrine skips the normal full AFK reward path so bed rest cannot double-dip into regular AFK milestones.

`/afkshrine trade` without a reward id opens the same rewards overview so players can pick from valid rewards instead of guessing ids. `/afkshrine trade <reward>` is a read-only preview unless `confirm` is provided. The preview explains whether the reward has configured commands, whether it is a one-time trade already claimed, whether the player is missing claimed tokens, how many pending tokens are waiting to be claimed, and what command to run to complete the trade. When the trade is ready, the visible confirm command is clickable in chat and still remains typeable as a normal command. `/afkshrine trade <reward> confirm` is the only step that spends claimed tokens and dispatches the configured reward commands.

`/afkshrine admin capture token` stores the exact item in the staff member's main hand as `token` in `plugins/1MB-CMIAPI/AFKShrine/tools.yml`. Matching uses Bukkit item similarity with stack amount ignored, so custom names, lore, custom model data, and other item metadata are preserved. `/afkshrine tools` opens all permitted tool categories; `/afkshrine books` opens only lore books. The equivalent `list` command prints the same action state in chat. `/afkshrine tools claim <action>` and `/afkshrine books claim <action>` preview the cost and blockers; `confirm` is required before captured items are consumed and configured commands run. Ready previews make the visible confirm command clickable. GUI clicks only preview and close to chat, where the player can inspect the exact exchange before confirming. Permission is checked again on category open, item click, preview, and final confirmation. Normal players see generic token status; exact captured item templates and setup hints are only visible to staff with `onembcmi.afkshrine.admin` or `onembcmi.afkshrine.admin.capture`.

`/afkshrine quests` includes completed seasonal quest counts and currently active seasonal sets. `/afkshrine album` is the richer collection view: it shows configured and saved-history milestone entries as `done` or `open`, with counts such as `1/1 once`, `0/1 weekly (3 total)`, `3/10 weekly (14 total)`, or `12 total, unlimited`. Category filters are `time`, `biomes`, `safety`, `risk`, `events`, `quests`, `seasonal`, and `streaks`. `/afkshrine community` shows the server-wide claimed-point total, completed community milestones, the next threshold, and the active temporary celebration if one is running.

`/afkshrine admin suspicious [page]` is passive and console-safe. It scans bounded saved no-repeat zone history and lists players with zones above the configured soft limit, sorted by high severity, repeat count, and points. It does not punish players, change points, or use same-IP checks.

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
onembcmi.afkshrine.tools
onembcmi.afkshrine.books
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
onembcmi.afkshrine.admin.debug
onembcmi.afkshrine.admin.check
onembcmi.afkshrine.admin.report
onembcmi.afkshrine.admin.journal
onembcmi.afkshrine.admin.capture
onembcmi.afkshrine.admin.suspicious
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
%onembcmi_afkshrine.rested.active%
%onembcmi_afkshrine.rested.seconds_left%
%onembcmi_afkshrine.rested.total_granted%
%onembcmi_afkshrine.sleep.active%
%onembcmi_afkshrine.sleep.last.seconds%
%onembcmi_afkshrine.sleep.last.points%
%onembcmi_afkshrine.sleep.last.reason%
%onembcmi_afkshrine.sleep.daily_left%
%onembcmi_afkshrine.sleep.total_sessions%
%onembcmi_afkshrine.sleep.total_seconds%
%onembcmi_afkshrine.repeat_zones.count%
%onembcmi_afkshrine.last.repeat_zone.count%
%onembcmi_afkshrine.last.danger.multiplier_percent%
%onembcmi_afkshrine.last.danger.candidate_points%
%onembcmi_afkshrine.last.danger.applied_points%
%onembcmi_afkshrine.seasonal.active.count%
%onembcmi_afkshrine.community.claimed_total%
%onembcmi_afkshrine.community.completed.count%
%onembcmi_afkshrine.community.celebration.active%
%onembcmi_afkshrine.community.celebration.id%
%onembcmi_afkshrine.community.celebration.seconds_left%
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
%onembcmi_afkshrine.runtime.seasonal_quest_completions%
%onembcmi_afkshrine.runtime.community_milestones%
%onembcmi_afkshrine.runtime.rested_bonuses%
%onembcmi_afkshrine.runtime.repeat_zone_warnings%
%onembcmi_afkshrine.runtime.repeat_zone_hard_warnings%
%onembcmi_afkshrine.runtime.danger_bonus_candidates%
%onembcmi_afkshrine.runtime.danger_bonus_applied%
%onembcmi_afkshrine.runtime.tool_actions%
%onembcmi_afkshrine.runtime.sleep_sessions%
%onembcmi_afkshrine.runtime.sleep_seconds%
%onembcmi_afkshrine.runtime.sleep_points%
%onembcmi_afkshrine.tools.captured_items%
%onembcmi_afkshrine.tools.actions%
%onembcmi_afkshrine.tools.enabled_actions%
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
postcards.enabled
postcards.show-when-no-points
postcards.location-mode
postcards.round-to-blocks
postcards.max-progress-entries
postcards.show-damage
postcards.action-links
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
bossbar.dynamic.enabled
bossbar.dynamic.update-interval-seconds
bossbar.dynamic.rotation-seconds
bossbar.dynamic.title-format
bossbar.dynamic.modes
bossbar.dynamic.session-target-minutes
bossbar.dynamic.pending-target-tokens
bossbar.dynamic.streak-target-days
preview.gui-cooldown-seconds
gui.filler-material
gui.menu-command
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
sleep.enabled
sleep.min-session-seconds
sleep.points-per-session
sleep.max-points-per-day
sleep.same-zone-size-blocks
sleep.same-zone-cooldown-minutes
sleep.zone-history-limit
sleep.message-no-points
recovery.enabled
recovery.persist-interval-seconds
recovery.max-offline-seconds
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
rested-bonus.enabled
rested-bonus.require-claimed-points
rested-bonus.require-last-session-seconds
rested-bonus.duration-minutes
rested-bonus.cooldown-hours
rested-bonus.max-uses-per-day
rested-bonus.refresh-mode
rested-bonus.message-enabled
rested-bonus.grant.commands
no-repeat-zones.enabled
no-repeat-zones.mode
no-repeat-zones.zone-size-blocks
no-repeat-zones.reset
no-repeat-zones.history-limit
no-repeat-zones.same-zone-soft-limit
no-repeat-zones.same-zone-hard-limit
no-repeat-zones.base-points-percent-after-soft
no-repeat-zones.base-points-percent-after-hard
no-repeat-zones.disable-bonus-progress-after-soft
no-repeat-zones.exempt-worlds
danger-score.enabled
danger-score.mode
danger-score.min-session-seconds
danger-score.max-multiplier-percent
danger-score.repeated-zone-policy
danger-score.factors.open-sky-percent
danger-score.factors.rain-percent
danger-score.factors.thunder-percent
danger-score.factors.underwater-percent
danger-score.factors.nether-percent
danger-score.factors.end-percent
danger-score.factors.high-altitude-percent
danger-score.factors.deep-underground-percent
danger-score.factors.damage-taken-percent
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
weather-quests.enabled
weather-quests.observe-interval-seconds
weather-quests.required-sample-percent
weather-quests.require-stable-world
weather-quests.max-move-blocks
weather-quests.sets
weather-quests.repeat.mode
weather-quests.repeat.max-count
weather-quests.repeat.reset
seasonal-quests.enabled
seasonal-quests.sets
seasonal-quests.repeat.mode
seasonal-quests.repeat.max-count
seasonal-quests.repeat.reset
community.enabled
community.celebration.enabled
community.celebration.override-active-style
community.milestones
streaks.enabled
streaks.milestones-days
streaks.milestone-points
streaks.repeat.mode
streaks.repeat.max-count
streaks.repeat.reset
tools.enabled
tools.gui.enabled
tools.actions
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
album.per-page
rewards.trades
audit.session-log.enabled
audit.sleep-log.enabled
audit.trade-log.enabled
audit.tools-log.enabled
audit.recent-per-page
journal.default-format
journal.max-rows-per-section
journal.sample-rows
admin.list-per-page
dump.max-records
```

Particle colors expect hex colors such as `#cdb4db`. Bossbar colors use Bukkit bossbar color names such as `PINK`, `BLUE`, `PURPLE`, `WHITE`, `GREEN`, `YELLOW`, or `RED`.

Dynamic bossbar mode ids support friendly aliases, but the canonical ids are:

```text
session-duration
minimum-session
session-cap
pending-tokens
daily-cap
streak
seasonal
community
```

`bossbar.dynamic.update-interval-seconds` controls how often each active AFK player's bossbar title/progress is recalculated. `bossbar.dynamic.rotation-seconds` controls how long one mode remains selected before the next configured mode is shown. Keep the update interval moderate on live servers; the defaults are designed to be visible without constantly touching player state.

`postcards.enabled` replaces the old terse welcome-back lines with a richer private return postcard. `postcards.location-mode` supports `rounded`, `exact`, and `hidden`; the default `rounded` uses `postcards.round-to-blocks` so players see where the AFK visit happened without turning the summary into a raw debug dump. `postcards.show-when-no-points` keeps no-token visits understandable instead of silently feeling broken, and `postcards.action-links` controls the clickable follow-up links for claim, album, rewards, and stats.

`gui.filler-material` controls the AFKShrine inventory frame and defaults to `LIGHT_BLUE_STAINED_GLASS_PANE` to match the other 1MB menus. `gui.menu-command` controls the bottom-row `Back to /menu` button and defaults to `menu`. `preview.gui-cooldown-seconds` controls only GUI preset preview clicks; typed `/afkshrine preview` still uses the normal preview permission and duration checks.

`tools.gui.enabled` controls the inventory pages opened by `/afkshrine tools` and `/afkshrine books`. When it is false, both commands fall back to their permission-filtered chat/list output, while the broader `/afkshrine gui` and `/afkshrine menu` hub remains available.

Repeat modes support `once`, `limited`, and `unlimited`. Reset windows support `never`, `daily`, `weekly`, and `monthly`. Exact progress ids can be overridden with `progress.overrides` rows in this format:

```text
progress-id|mode|max-count|reset
risk:open-sky|limited|3|weekly
biome:minecraft:plains|unlimited|0|daily
```

Players can learn the configured progression families with `/afkshrine milestones [family]` or the `Milestone Guide` button in `/afkshrine gui` or `/afkshrine menu`. The guide explains time, biome, safety, risk, adventure, weather, seasonal, dimension pilgrim, collection, normal streak, and Rested Return streak goals, including whether each family is enabled, how it is earned, the reward source, the player's collected count when run in-game, and the current repeat rule. Useful detail commands include `/afkshrine milestones time`, `/afkshrine milestones biomes`, `/afkshrine milestones safety`, `/afkshrine milestones risk`, `/afkshrine milestones quests`, `/afkshrine milestones weather`, `/afkshrine milestones seasonal`, `/afkshrine milestones dimensions`, `/afkshrine milestones collections`, `/afkshrine milestones streaks`, and `/afkshrine milestones claim-streak`.

Players can inspect repeatable goals with `/afkshrine resets [category|daily|weekly|monthly|ready|used|complete|inactive] [page]` or the `Reset Summary` button in `/afkshrine gui` or `/afkshrine menu`. The summary uses the same rules as the award code and labels each entry as ready now, used this window, inactive right now, repeatable, or one-time complete. Daily, weekly, and monthly reset dates are shown in server time. Milestone and quest rewards are not claimed one-by-one; when a player completes a qualifying AFK session, the reward is added as pending AFKShrine tokens, and `/afkshrine claim` moves those pending tokens into the spendable trade balance.

Default configured styles include 26 presets: `default`, `mint`, `twilight`, `ember`, `aurora`, `ocean`, `amethyst`, `blossom`, `frost`, `honey`, `void`, `prism`, `meadow`, `sunrise`, `coral`, `lagoon`, `lavender`, `copper`, `emerald`, `sapphire`, `pearl`, `dusk`, `lantern`, `cherry`, `storm`, and `echo`. The default style is usable by everyone; the other starter/rank/seasonal/rare styles are permission-gated so they can be staff-only, donor-only, rank-based, or unlocked later through another system.

World tracking is default-deny. Normal AFKShrine points only count in `tracking.allowed-worlds`, which defaults to `general`, `wild`, `nether`, `end`, `oneblock`, `skyblock`, `skygrid`, `acid`, and `cave`. `tracking.disabled-worlds` is a hard block and defaults to `spawn`, `builders`, and `legacy`.

Grace recovery is enabled by default. While CMI says a player is AFK, AFKShrine writes a small `afkshrine.active-session` marker to playerdata with a session id, start time, last touch time, starting location snapshot, and damage taken. Clean shutdowns settle active sessions before the plugin disables. If the server or connection ends weirdly, the next join can settle that marker once, using `recovery.max-offline-seconds` as the maximum extra time counted after the last touch. Settled recovery ids are kept in `afkshrine.recovery.settled-session-ids` to prevent duplicate payouts if stale data reappears.

Rested bonus is enabled by default, but it is deliberately hard to farm. A player must claim at least `rested-bonus.require-claimed-points` from a most recent AFK session lasting at least `rested-bonus.require-last-session-seconds`. Grants are then blocked by `rested-bonus.cooldown-hours`, `rested-bonus.max-uses-per-day`, and `rested-bonus.refresh-mode`. The plugin stores rested state in playerdata and exposes placeholders such as `%onembcmi_afkshrine.rested.active%` and `%onembcmi_afkshrine.rested.seconds_left%`. Optional `rested-bonus.grant.commands` can run when rested state is granted, but defaults are empty so live testing does not automatically pay items or money.

No-repeat zones are enabled in `report-only` mode by default. At session settlement, AFKShrine maps the AFK location into a coarse horizontal grid using `no-repeat-zones.zone-size-blocks`, increments that player's bounded zone history for the current reset window, and records whether the zone is fresh, familiar, or overused. Report-only mode does not reduce points or block milestones; it only feeds audit logs, `/afkshrine admin audit <player>`, `/afkshrine admin suspicious`, and staff reports. If staff later sets `no-repeat-zones.mode` to `active`, familiar zones can dampen base AFK points with the configured percentages and optionally stop bonus progress after the soft limit. `no-repeat-zones.exempt-worlds` should include any dedicated AFK world where repeating zones should not count against players.

Danger score is also `report-only` by default. It calculates a capped candidate bonus from the saved AFK snapshot and accumulated session damage: open sky, rain/thunder, underwater, Nether, End, high altitude, deep underground, and damage taken. The calculation runs only when a session settles, not continuously while players are AFK. `danger-score.repeated-zone-policy: no-bonus` prevents candidate bonuses for familiar no-repeat zones, which keeps the system focused on varied locations. Setting `danger-score.mode` to `active` applies the capped candidate bonus to base AFK points before the daily cap clamps the final session total.

Event worlds are not normal AFK farming worlds. `events.worlds` rows use `world|months|progress-id|points`, for example `santa|12|event:santa|25`. A player AFKing in `santa` during December can earn the configured `event:santa` milestone once by default, but outside December the world does not count. The default event rows are `santa`, `halloween`, `thanksgiving`, `valentine`, and `summer`; staff can change months, points, or repeat rules as events change.

Weather quests are normal AFK quest bonuses for sessions that spend enough time under a matching sky/time condition. `weather-quests.sets` rows use:

```text
id|Display Name|points|min-session-seconds|requirements
```

Default rows are `rain`, `thunder`, `night`, and `clear_sky`. Requirements are semicolon-separated and all must pass. Supported tokens include `weather:rain`, `weather:thunder`, `weather:clear`, `time:night`, `time:day`, `open-sky`, `underwater`, `solid-ground`, `stable-world`, `stable-location`, `world:general`, `environment:NORMAL`, `biome:minecraft:plains`, `biome-contains:ocean`, `y-min:60`, and `y-max:80`. Weather quests are stored as `weather:<id>` quest progress, show in `/afkshrine quests`, `/afkshrine album weather`, and the AFKShrine GUI weather page, and use `weather-quests.repeat.*`, which defaults to once per week.

Weather and time can differ per world, so AFKShrine samples active AFK sessions on `weather-quests.observe-interval-seconds` instead of checking every tick. `weather-quests.required-sample-percent` controls how many sampled observations must match weather/time/sky requirements; the default `50` means a rain quest needs rain during at least half of the sampled session, not just one lucky moment. By default `weather-quests.require-stable-world: true` requires the player to finish in the same world where the AFK session started, and `weather-quests.max-move-blocks` requires the player to stay near the starting area. This keeps a player from beginning a rain quest in one world, changing worlds, and finishing against another world's weather/time state. Set the move limit to `0` only if staff intentionally wants weather quest progress to ignore same-world movement distance.

Seasonal quest sets are normal-world AFK quests gated by a configurable active window and location/weather requirements. `seasonal-quests.sets` rows use:

```text
id|Display Name|window|points|min-session-seconds|requirements
```

Default rows include `ocean_week`, `nether_week`, `winter_shrine`, and `rainy_week`. Windows support `*`, `months:6,7,8`, `weeks:27,28`, and `dates:2026-12-20..2026-12-27`; multiple window tokens can be separated with semicolons. Requirements are semicolon-separated and all must pass. Supported tokens include `world:general`, `environment:NETHER`, `biome:minecraft:warm_ocean`, `biome-contains:ocean`, `weather:rain`, `weather:thunder`, `open-sky`, `underwater`, `solid-ground`, `y-min:60`, and `y-max:80`. Seasonal quests are stored as `seasonal:<id>` quest progress and use `seasonal-quests.repeat.*`, which defaults to once per week while active.

Always-available shrine quests live in `shrine-quests.sets` and use:

```text
id|Display Name|points|min-session-seconds|reset|requirements
```

Default rows include `safe_harbor_daily`, `wild_rest_weekly`, weekly dimension pilgrim goals, and monthly dimension pilgrim goals. They are stored as `shrine:<id>` quest progress, show in `/afkshrine quests`, `/afkshrine album quests`, `/afkshrine resets quests`, and the Milestone Guide. `reset` can be `daily`, `weekly`, `monthly`, or `never`. Requirements support `open-sky`, `underwater`, `solid-ground`, `no-damage`, `damage-taken`, `not-exempt-world`, `world:<world>`, `environment:<env>`, `biome:<id>`, `biome-contains:<text>`, `weather:<type>`, `y-min:<n>`, and `y-max:<n>`.

Biome set goals are passive and reset-aware. `biome-goals.weekly-circuit` records unique biomes in the current week and awards `circuit:weekly-biomes` after the configured target, default 3 biomes. `biome-goals.monthly-wanderer` records unique biomes in the current month and awards `wanderer:monthly-biomes` after the configured target, default 10 biomes. Both goals only update at AFK session settlement, store small per-player sets in playerdata, and show progress in `/afkshrine quests`.

Collection album rewards are one-time set-completion bonuses stored as `collection:<id>` milestones. Defaults award small AFKShrine token bonuses for completing all weather watcher quests, completing the dimension pilgrim set, recording 10 biomes, reaching a 14-day Loyal Keeper streak, and reaching a 28-day Quiet Month streak. They show in `/afkshrine album collections` and `/afkshrine resets collections`.

Rested Return streaks are claim-based rather than AFK-toggle based. `claim-streak.min-claimed-points` controls how many pending tokens must be claimed for a day to count, default 30. Consecutive qualifying claim days award `claim-streak:<days>` milestones at the configured day counts, default 3, 7, 14, and 28, with a small claimed-token bonus. This is shown in `/afkshrine balance`, `/afkshrine quests`, `/afkshrine milestones claim-streak`, and the stats GUI.

Suggested optional CMI kits for staff-created rewards:

- `afkshrine_weather_watcher` for completing all weather watcher quests.
- `afkshrine_weekly_circuit` for Weekly Shrine Circuit.
- `afkshrine_monthly_wanderer` for Monthly Wanderer.
- `afkshrine_safe_harbor` for a gentle daily safe-session reward.
- `afkshrine_wild_rest` for Wild Rest Weekly.
- `afkshrine_dimension_pilgrim` for completing dimension pilgrim goals.
- `afkshrine_rested_return` for Rested Return streak milestones.
- `afkshrine_loyal_keeper` for 14-day streak-style rewards.
- `afkshrine_quiet_month` for 28-day streak-style rewards.
- `afkshrine_preset_unlock` for rare preset unlock ceremonies.

Keep the default AFKShrine token rewards active first, then optionally add CMI kit, money, XP, or LuckPerms preset-unlock commands through `hooks.progress.specific`. For example, a rare preset unlock can grant `onembcmi.afkshrine.style.lantern`, `onembcmi.afkshrine.style.aurora`, `onembcmi.afkshrine.style.prism`, or `onembcmi.afkshrine.style.echo` from exact progress ids such as `collection:weather-watcher`, `collection:dimension-pilgrim`, `collection:loyal-keeper-14`, or `collection:quiet-month-28`.

Community milestones are server-wide claimed-point thresholds. They count points only when players run `/afkshrine claim`, not when points are merely pending. `community.milestones` rows use:

```text
id|claimed-total-threshold|Display Name|duration-minutes|style|optional console command;;second command
```

When a threshold is crossed, AFKShrine records it in `community.yml`, starts a temporary celebration window, notifies online players with `onembcmi.afkshrine.use`, optionally runs configured milestone commands while `hooks.enabled` is true, and can override active shrine visuals with the configured preset while the celebration lasts. The visual override does not grant the preset permanently and does not affect `/afkshrine preview`.

Optional hooks are disabled by being empty, even though `hooks.enabled` defaults to true. They are meant for feedback such as sounds, titles, toasts, fireworks, and public milestone messages. Keep real rewards in `/afkshrine claim` and `/afkshrine trade` unless staff intentionally chooses otherwise.

AFKShrine tools are a separate captured-item layer. Staff captures exact special items with:

```text
/afkshrine admin capture token
```

Captured templates are stored in:

```text
plugins/1MB-CMIAPI/AFKShrine/tools.yml
```

Tool action rows live in `tools.actions` and use:

```text
id|Display Name|icon material|enabled|captured-item costs|console command;;second command
netherite_spear|Netherite Shrine Spear|NETHERITE_SWORD|false|token:6|cmi kit afkshrine_spear_netherite {player} -s
books_starter|AFK Shrine Starter Stories|WRITTEN_BOOK|false|token:2|cmi kit afkshrine_books_starter {player} -s
books_weather|AFK Shrine Weather Stories|WRITTEN_BOOK|false|token:2|cmi kit afkshrine_books_weather {player} -s
books_travel|AFK Shrine Travel Stories|WRITTEN_BOOK|false|token:2|cmi kit afkshrine_books_travel {player} -s
books_keeper|AFK Shrine Keeper Stories|WRITTEN_BOOK|false|token:2|cmi kit afkshrine_books_keeper {player} -s
books_collectors|AFK Shrine Collector Stories|WRITTEN_BOOK|false|token:2|cmi kit afkshrine_books_collectors {player} -s
shield_upgrade|AFK Shrine Shield Upgrade|SHIELD|false|token:4|cmi kit afkshrine_shield_upgrade {player} -s
```

Each lore kit contains the two books listed under that kit in `docs/plugins/afkshrine-books.txt`. Its GUI item and click-through chat preview name both included titles before the player confirms. Every kit costs two exact captured AFKShrine token items, making the effective price one token per book. These are captured item tokens from the player's inventory, not pending points or claimed AFKShrine trade balance. Lore-kit exchanges are repeatable; every successful use consumes another two matching token items.

The default rows remain disabled so a missing or misspelled CMI kit cannot consume live player items. When upgrading an older config, the exact legacy `story_books`/`afkshrine_story_books` row is automatically replaced by these five rows while preserving its previous enabled state and cost; customized rows are left alone.

To release only lore books to the normal LuckPerms group while keeping the other tools locked:

```text
lp group default permission set onembcmi.afkshrine.tools false
lp group default permission set onembcmi.afkshrine.books true
```

Then complete the reward setup:

1. Hold one exact AFKShrine token item and run `/afkshrine admin capture token` if the live token has not already been captured.
2. Confirm the five CMI kits named above exist and each gives its intended pair of signed books.
3. Change only the five `books_*` rows from `false` to `true` under `tools.actions` in `plugins/1MB-CMIAPI/AFKShrine/config.yml`. Leave the spear and shield rows false.
4. Run `/afkshrine admin reload`, followed by `/afkshrine admin check`.
5. Test with an account that has `.books=true` and `.tools=false`: open `/afkshrine gui`, click `Lore Book Exchanges`, click a kit to preview its two-token price, then click the chat confirmation. `/afkshrine books` provides the same direct route.

For a live staff test, `onembcmi.afkshrine.admin.debug` allows two bounded and audited grants:

```text
/afkshrine debug grant <player> claimed-points <amount>
/afkshrine debug grant <online-player> token-items <amount>
```

`claimed-points` adds directly to the saved spendable balance used by `/afkshrine rewards` and `/afkshrine trade`; it deliberately does not alter pending points, lifetime-earned totals, daily caps, streaks, milestones, or community progress. `token-items` gives 1-64 copies of the exact captured `token` template and is the mode needed to test `/afkshrine tools` and `/afkshrine books`. The target must be online and have enough inventory space. Point grants are capped at 100,000 per command. Every successful grant is written to `plugins/1MB-CMIAPI/AFKShrine/logs/debug-grants.log` with actor, target, type, amount, and resulting balance or item id.

If a configured command reports failure after captured items are consumed, AFKShrine refunds the captured item cost and logs the failure for review.

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
{milestone}
{display}
{threshold}
{total}
{duration}
{style}
{id}
{reward}
{cost}
{balance}
{cost_item}
{cost_amount}
```

Specific progress hooks use this row format:

```text
progress-id|console command;;second console command
streak:7|cmi broadcast {player} reached a 7 day AFK Shrine streak!
```

Session and trade audit rows are appended to:

```text
plugins/1MB-CMIAPI/AFKShrine/logs/sessions.log
plugins/1MB-CMIAPI/AFKShrine/logs/sleep.log
plugins/1MB-CMIAPI/AFKShrine/logs/trades.log
plugins/1MB-CMIAPI/AFKShrine/logs/tools.log
plugins/1MB-CMIAPI/AFKShrine/logs/community.log
```

Staff can review them in-game with:

```text
/afkshrine admin check
/afkshrine admin report
/afkshrine admin journal latest markdown
/afkshrine admin journal 2026-07 discord
/afkshrine admin suspicious
/afkshrine admin audit <player>
/afkshrine admin recent sessions
/afkshrine admin recent sleep
/afkshrine admin recent trades
/afkshrine admin recent tools
```

Community claim audit rows are included in staff exports from `logs/community.log`. Session rows also include repeat-zone and danger-score columns so staff can review candidate changes before switching either system to active mode. Sleep rows include bed-rest seconds, awarded tokens, blocker reason, bed location, and coarse cooldown zone.

`/afkshrine admin check` is read-only and console-safe. It reports dependency state, debug mode, point caps, minimum session time, bed-rest reward caps/cooldown, dynamic bossbar mode/update settings, grace recovery settings, rested/no-repeat/danger-score modes, allowed/disabled/event world overlap, seasonal quest set counts, community milestone configuration, default preset access, non-default preset permissions, invalid preset colors, reward row shape, captured tool/action readiness, configured console command counts, and whether session/sleep/trade/tools audit logs are enabled.

`/afkshrine admin report` writes a Markdown report into the AFKShrine cache folder. The report includes runtime counters, point/economy counters, active/preview/disabled counts, rested/no-repeat/danger/tool/sleep runtime counters, dynamic bossbar settings, seasonal/community state, the current config summary, readiness findings, repeated-zone audit rows, and recent session/sleep/trade/tools/community audit rows. It is meant for passive staff review after a live test window.

`/afkshrine admin journal [latest|YYYY-MM] [markdown|discord]` writes monthly balancing/support journals into `plugins/1MB-CMIAPI/CMIAPILIB/cache/plugins/afkshrine/journals/`. The exporter reads existing audit logs on demand and does not change player balances, rewards, or config. `markdown` creates table-heavy GitHub-friendly review notes; `discord` creates a no-table bullet version for staff channels. Both formats include unique player counts, AFK and bed-rest token totals, no-token reasons, top token earners, AFK time leaders, worlds, biomes, repeat-zone states, danger-score factors, milestone/quest hits, reward trade usage, tool-action usage, recent support samples, and generated balancing notes. Each run writes a timestamped file plus a `*-latest.md` copy for the same period and format.

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
  recovery:
    settled-session-ids: []
  rested:
    until-millis: 0
    last-granted-at-millis: 0
    last-granted-at: ""
    period-key: ""
    period-uses: 0
    total-granted: 0
  sleep:
    total-sessions: 0
    total-seconds: 0
    period-key: "2026-07-06"
    period-points: 0
    last:
      seconds: 0
      points: 0
      at: ""
      no-point-reason: ""
      zone-key: ""
      awarded-at-millis: 0
    zones:
      history:
        - "general:12:-4|sleep|1|1|1783296000000|2026-07-06T12:00:00Z"
  active-session:
    id: "recovery-session-uuid"
    started-at-millis: 0
    last-seen-at-millis: 0
    damage: 0.0
    snapshot:
      world: "general"
      environment: "NORMAL"
      biome: "minecraft:plains"
      x: 0
      y: 64
      z: 0
      open-sky: false
      underwater: false
      solid-ground: true
      raining: false
      thundering: false
  sessions:
    total: 0
    afk-seconds: 0
    last:
      seconds: 0
      points: 0
      at: ""
      no-point-reason: ""
      counted-at-millis: 0
      location-key: ""
      repeat-zone:
        key: ""
        state: ""
        count: 0
      danger:
        multiplier-percent: 100
        candidate-points: 0
        applied-points: 0
        factors: ""
  zones:
    history:
      - "general:12:-4|2026-07-06|3|42|1783296000000|2026-07-06T12:00:00Z"
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

Player opt-out, selected style, pending points, claimed balance, trade claims, milestones, quests, biomes, repeat award counts, streaks, rested state, bounded no-repeat zone history, bed-rest history, recovery settlement ids, and leaderboard period totals are persistent. `zones.history` is capped by `no-repeat-zones.history-limit` and `sleep.zones.history` is capped by `sleep.zone-history-limit` so they cannot grow forever. `active-session` is temporary recovery state for a currently active AFK session; it is cleared after normal AFK leave, clean shutdown settlement, or successful join recovery. Active bed sessions are runtime-only and settle on bed leave, quit, or clean plugin shutdown. Temporary visual state should live in cache and be safe to clean.

Community milestone state is stored in the AFKShrine feature data folder:

```yaml
claimed-total: 0
completed-milestones: []
celebration:
  id: ""
  display-name: ""
  style: ""
  started-at-millis: 0
  until-millis: 0
```

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

`/afkshrine presets` lists every preset as a hoverable row. `/afkshrine preset` shows the player's current preset first, then the same hoverable rows. The tooltip explains the tier, unlock hint, dust-ring particle color, radius, dust size, sparkle behavior, and bossbar color without exposing permission nodes. Rows the player can use are clickable and run `/afkshrine preset <preset>` to change their persistent preference; locked rows explain the unlock hint but do not run a command. This keeps the player output useful while leaving node details in `/afkshrine debug permissions` and `/1mbcmi debug plugin afkshrine permissions`.

Long-term preset usage is appended to:

```text
plugins/1MB-CMIAPI/AFKShrine/logs/style-usage.log
```

Each row records timestamp, action (`select`, `active-start`, or `preview-start`), UUID, player name, preset id, and display name. This gives us a low-drama way to review most-used and least-used presets later.

[Plugin index](README.md)
