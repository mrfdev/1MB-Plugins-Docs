# Door Hunt / Trick-or-Treat Doors

Door Hunt is the third independently switchable module in the shared Event Hunts feature. The single `1MB-CMIAPI-EventHunts` JAR provides `/hunt`, `/coconut`, `/ghost`, and `/doors`; Door Hunt defaults dormant until its copied standalone data validates, is explicitly imported, and staff turn `modules.doors.enabled` on. Ghost and Doors may run together in the `halloween` world.

Player data is isolated under the shared `doorshunt` section, while Door files live in `plugins/1MB-CMIAPI/CoconutHunt/Doors/`. The complete staff and testing references are [Door Hunt administration](doors-administration.md) and [Door Hunt testing](doors-testing.md).

Implemented and proposed shared-host improvements are tracked in the [Event Hunts quality-of-life roadmap](event-hunts-roadmap.md); every remaining proposal still requires a separate greenlight.

`/hunt` opens the shared fixed 54-slot/six-row Event Hunts index. The Doors card automatically moves between public live, authorized staff test, upcoming, claim, attention, ended, and dormant sections, then opens the full Doors overview while active or a read-only themed preview while dormant. Its private current-player section shows today's completed doors, season discoveries, waiting Treat Bag claims, and current streak from the already-loaded Door profile; an asynchronous join load still in progress produces a friendly retry message instead of a disk read. Module tooltips are capped at 12 lines for smaller displays. Status-authorized staff see compact readiness totals and the module-status command; complete location, reward-provider, claim, and actionable diagnostics remain in status and preflight. Ordinary players see only friendly scheduling and event details. The preview may link to the Halloween world, but hints, progress, knocking, quests, and reward actions stay unavailable until the module and event are actually live. Every Doors page uses the shared navigation footer: the viewer's skinned head in bottom-left slot 45 shows season, daily progress, time until the next Europe/Amsterdam midnight reset, unique doors, visits, treat/trick totals, Treat Bag count, and streak; Back, the Door overview, All Event Hunts, server menu, and Close use the standard slots. Coconut and Ghost shortcuts remain in slots 46 and 47.

# Trick-or-Treat Doors Player Guide

## Introduction

Trick-or-Treat Doors turns the 1MoreBlock Halloween world into a daily door
hunt. Find marked houses, knock correctly, and discover whether the resident
has a treat or a family-friendly trick waiting for you. Your discoveries also
count toward seasonal statistics, quests, milestones, and configured reward
unlocks.

Use `/doors` or `/doors info` in game to open the Halloween menu. Its overview
shows the current event window, a quick start, today's progress, hint
availability, travel, statistics, journal, quests, reward unlocks, retained
seasons, and links to the Coconut and Ghost hunts. The canonical player page is
<https://docs.1moreblock.com/player-guides/plugins/doors/>.

## Quick Start

With the bundled 2026 route settings (the values shown by `/doors info` are
authoritative if staff customize them):

1. Type `/halloween` to travel to the Halloween world.
2. Look for a **closed door** with a **golden pressure plate** in front of it.
3. Stand by that marked front side and make sure your main hand is empty.
4. Left-click the door **3 times within 5 seconds**.
5. A trick happens immediately; a treat is safely added to your Treat Bag.
6. Return to an approved gameplay world and use `/doors rewards` to claim saved treats.
7. Visit other marked doors, then return on another event day to play again.

The golden pressure plate is the visual route marker. The door must still be
closed when you knock. If a door does not answer, check that you are on its
marked side, empty-handed, and clicking quickly enough.

## How Players Use It

With the bundled default, each eligible marked door can surprise you once per
day while the event and current season are live. The normal category odds favor
treats, but a trick is always possible. A single or double door registered as
one stop counts as one daily discovery.

Your progress is stored by player UUID and season. Door locations that you have
not found remain secret. The journal lists only doors you already discovered,
and the hint command gives distance and direction language rather than exact
coordinates.

If you click a registered door while holding an item, a muffled voice reminds
you to come empty-handed. Held-item clicks do not count as knocks. The reminder
is rate-limited so it does not fill chat.

## Available Features

- Daily marked-door discoveries with a weighted trick-or-treat result.
- Direction-only hints toward an unfinished door in your current world.
- Personal seasonal totals, treat/trick counts, active days, and streaks.
- A discovered-door journal that does not reveal unfinished locations.
- Quest streams and milestones based on event participation.
- A persistent Treat Bag that can hold repeated daily treats until players
  return to OneBlock, wild, or another configured gameplay world.
- Permission-based annual CMI kit unlocks when staff have enabled and verified
  those rewards.
- A clear event window and progress count without coordinate spoilers.

## Commands

| Command | What it does |
| --- | --- |
| `/hunt` | Opens the shared seasonal-event index and routes its Doors card here. |
| `/doors` | Opens the Halloween Door Hunt overview menu. |
| `/doors info` | Opens the overview with quick start, dates, daily progress, hint availability, travel, and feature pages. |
| `/doors help` | Opens the graphical quick-start and help page. |
| `/doors hint` | Gives a coordinate-free direction hint toward the nearest unfinished eligible door in your current world. |
| `/doors stats [season]` | Opens seasonal discoveries, results, active days, streaks, districts, and milestones. |
| `/doors journal [season] [page]` | Opens a paginated menu containing only doors you have already discovered. |
| `/doors quests [stream] [season]` | Opens current or historical quest-stream and milestone progress. |
| `/doors rewards [season]` | Opens the Treat Bag and the separate milestone-reward page. Treats are claimed one at a time in configured gameplay worlds. |

`/totdoors` is the full command and works anywhere `/doors` does. The aliases
`/totdoor` and `/trickortreatdoors` are also available, but `/doors` is the
recommended player command. Staff administration remains under
`/totdoors admin ...` and diagnostics under `/totdoors debug ...`.

## Permissions and Rank Requirements

The normal player permissions are enabled for everyone by default:

| Permission | Allows |
| --- | --- |
| `totdoors.play` | Knock on eligible registered doors. |
| `totdoors.command.info` | Use `/doors` and `/doors info`. |
| `totdoors.command.hint` | Use `/doors hint`. |
| `totdoors.command.stats` | View your seasonal statistics. |
| `totdoors.command.journal` | View your discovered-door journal. |
| `totdoors.command.quests` | View your quest streams and milestones. |
| `totdoors.command.rewards` | View and claim saved Door treats, and view earned milestone reward states. |

The server can change permission availability for particular worlds, ranks, or
events. Staff-only administration, route coordinates, debug testing, and
private reports are not exposed by the player commands.

## Rewards, Limits, and Cooldowns

Door reward GUIs use the same status vocabulary as Coconut and Ghost: gray `Locked`, yellow `In progress`, orange `Ready to claim`, green `Claimed`, and red `Delivery needs attention`. Treat Bag receipts map directly from their existing ledger: waiting treats are ready, dispatched treats are claimed, and interrupted or failed claims need attention. Door milestone kit unlocks shown as successfully dispatched stay `Ready to claim`, because the permission/unlock command has completed but the player still opens the kit through `/kits`. Pending or failed milestone delivery is red; an unfinished milestone remains in progress; a disabled reward definition is locked. This changes only GUI labels, dyes, and lore.

- By default, each eligible door can reward you once per Europe/Amsterdam
  calendar day while the event is live.
- The GUI passively shows the next local-midnight reset. During the final
  `reminders.daily-reset.window-minutes` (90 by default), the first successfully
  recorded unfinished door result may show one short chat reminder. Its date is
  saved with the prepared reward, so reconnects and restarts cannot repeat it.
  Completing every eligible door suppresses it; no login or repeating timer
  message is used. Set `reminders.daily-reset.enabled: false` to keep the GUI
  countdown while disabling this chat line.
- The bundled selection favors treats at 75% versus tricks at 25%; staff can
  change the live catalogue and relative weights.
- Every treat result becomes one independently tracked Treat Bag receipt. Four
  identical results remain four claims; tricks never enter the bag.
- Treat claims use the selected item-only CMI kit directly and do not grant kit
  permissions. If the complete kit does not fit, nothing is consumed and the
  treat remains waiting.
- The default claim worlds are `general`, `wild`, `cave`, `acid`, `skyblock`,
  `skygrid`, and `oneblock`; staff can change the list in Doors `config.yml`.
- All 3 knocks must occur within 5 seconds and use an empty main hand.
- `/doors hint` has a saved 15-minute cooldown by default. It survives
  reconnects and restarts.
- A milestone reward shown as `dispatched` means its configured permission
  unlock was sent to the provider. It does not claim that a kit was opened.
- Annual milestone kits remain unavailable until staff explicitly enable and
  verify them.

## PlaceholderAPI Placeholders

Servers with PlaceholderAPI can display these values in scoreboards,
holograms, chat formats, or other supported features. Player-specific values
use the player whose placeholders are being parsed.

| Placeholder | Value |
| --- | --- |
| `%totdoors_version%` | Installed plugin version. |
| `%totdoors_build%` | Three-digit build number. |
| `%totdoors_state%` | Public scheduled event state; staff debug access is never exposed here. |
| `%totdoors_ready%` | Whether startup finished. |
| `%totdoors_active%` | Whether ordinary-player calendar gameplay and the current season are open. |
| `%totdoors_mode%` | Scheduled, active, or dormant operating mode. |
| `%totdoors_debug%` | Whether the staff debug calendar switch is enabled. |
| `%totdoors_event_start%` | Effective localized event start. |
| `%totdoors_event_end%` | Effective localized event end. |
| `%totdoors_event_timezone%` | Event timezone. |
| `%totdoors_door_total%` | Total registered door setups. |
| `%totdoors_daily_completed%` | Your successful unique doors today. |
| `%totdoors_daily_total%` | Eligible doors today. |
| `%totdoors_daily_remaining%` | Your unfinished eligible doors today. |
| `%totdoors_hint_ready%` | Whether your hint is ready. |
| `%totdoors_hint_cooldown_seconds%` | Seconds until your next hint. |
| `%totdoors_season_id%` | Current stable season ID. |
| `%totdoors_season_name%` | Current season name. |
| `%totdoors_season_state%` | Draft, open, closed, or archived. |
| `%totdoors_season_roster_total%` | Frozen door count for the season. |
| `%totdoors_season_interactions%` | Your successful season interactions. |
| `%totdoors_season_unique_doors%` | Your unique season doors. |
| `%totdoors_season_treats%` | Your season treat selections. |
| `%totdoors_season_tricks%` | Your season trick selections. |
| `%totdoors_season_hints%` | Your season hints used. |
| `%totdoors_season_active_days%` | Your distinct active event days. |
| `%totdoors_season_current_streak%` | Your current event-day streak. |
| `%totdoors_season_longest_streak%` | Your longest season streak. |
| `%totdoors_season_districts_found%` | Districts where you found a door. |
| `%totdoors_milestones_earned%` | Milestones you earned this season. |
| `%totdoors_special_rewards_earned%` | Special rewards you earned this season. |
| `%totdoors_special_reward_grants_dispatched%` | Permission-unlock batches recorded as dispatched. |
| `%totdoors_stream_<id>_progress%` | Your progress for a configured stream. |
| `%totdoors_stream_<id>_next_target%` | Its next target, or `complete`. |
| `%totdoors_stream_<id>_next_milestone%` | Its next milestone ID, or `complete`. |
| `%totdoors_stream_<id>_complete%` | Whether you completed every milestone in that stream. |
| `%totdoors_milestone_<id>_earned%` | Whether you earned a configured milestone. |
| `%totdoors_reward_<id>_state%` | `not-earned`, `disabled`, `pending`, `dispatched`, or `failed`. |

No placeholder reveals a registered door coordinate. A player profile that has
not loaded yet returns neutral player values rather than loading a file during
the placeholder request.

## Important Notes

- The event must be live and the current yearly season must be open before
  ordinary players can earn door results or use hints.
- Staff debug testing is private: enabling its calendar bypass does not make an
  out-of-season event playable for ordinary players.
- Door locations intentionally remain secret until you discover them.
- `/doors hint` considers only unfinished eligible doors in your current world.
- Do not hold a tool, food, block, or other item while knocking.
- If the door is already open, close it before starting the three knocks.
- Door treats use one item-only CMI kit payload. Contact staff if the plugin
  says its cauldron is empty or marks a claim for review.

## Related Features

- `/halloween` is the server travel command used to enter the Halloween world.
- `/doors rewards` opens your repeatable Treat Bag and separate milestone rewards.
- `/kits` shows CMI kits unlocked by the separate milestone system.
- LuckPerms-backed milestone unlocks may make annual `tot_...` kits available
  after you earn their configured milestones.

## Technical Documentation

The publication-ready source for this guide is maintained with the private
plugin project. Staff publish its public mirror through the separate 1MB
Plugins documentation workflow; the canonical player URL above should be
considered live only after that import and deployment has completed.
