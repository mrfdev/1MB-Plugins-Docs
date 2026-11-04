# Door Hunt / Trick-or-Treat Doors

Door Hunt is the third independently switchable module in the shared Event Hunts feature. The single `1MB-CMIAPI-EventHunts` JAR provides `/hunt`, `/coconut`, `/ghost`, and `/doors`; Door Hunt defaults dormant until its copied standalone data validates, is explicitly imported, and staff turn `modules.doors.enabled` on. Ghost and Doors may run together in the `halloween` world.

Player data is isolated under the shared `doorshunt` section, while Door files live in `plugins/1MB-CMIAPI/CoconutHunt/Doors/`. The complete staff and testing references are [Door Hunt administration](doors-administration.md) and [Door Hunt testing](doors-testing.md).

Implemented and proposed shared-host improvements are tracked in the [Event Hunts quality-of-life roadmap](event-hunts-roadmap.md); every remaining proposal still requires a separate greenlight.

`/hunt` opens the shared fixed 54-slot/six-row Event Hunts index. The Doors card automatically moves between public live, authorized staff test, upcoming, claim, attention, ended, and dormant sections, then opens the full Doors overview while active or a read-only themed preview while dormant. Its private current-player section shows today's completed doors, season discoveries, waiting Treat Bag claims, and current streak from the already-loaded Door profile; an asynchronous join load still in progress produces a friendly retry message instead of a disk read. Module tooltips are capped at 12 lines for smaller displays. Status-authorized staff see compact readiness totals and the module-status command; complete location, reward-provider, claim, and actionable diagnostics remain in status and preflight. Ordinary players see only friendly scheduling and event details. The preview may link to the Halloween world. Knocking and hints require an open gameplay event. Saved reward claims remain available after knocking ends while the module stays enabled and the season claim period is open; fully disabling the module also stops claims. Every Doors page uses the shared navigation footer: the viewer's skinned head in bottom-left slot 45 shows season, daily progress, time until the next Europe/Amsterdam midnight reset, unique doors, visits, treat/trick totals, Treat Bag count, and streak; Back, the Door overview, All Event Hunts, server menu, and Close use the standard slots. After gameplay ends, the player head shows the ended event, the inclusive reward deadline, and pending Treat Bag and milestone claims instead of daily/reset/streak instructions. For 2026, rewards remain available through **7 November**, closing at **00:00 on 8 November Europe/Amsterdam**. Halloween Virus and Ghost shortcuts occupy slots 46 and 47; slot 51 provides Halloween travel, which closes automatically after the event and asks players to try again next year.

# Trick-or-Treat Doors Player Guide

## Introduction

Trick-or-Treat Doors turns the 1MoreBlock Halloween world into a daily door
hunt. Find marked houses, knock correctly, and discover whether the resident
has a treat or a family-friendly trick waiting for you. Your discoveries also
count toward seasonal statistics, quests, milestones, and configured reward
claims.

Use `/doors` or `/doors info` in game to open the Halloween menu. Its overview
shows the current event window, a quick start, today's progress, hint
availability, travel, statistics, journal, quests, reward claims, retained
seasons, and links to Ghost Hunt and Halloween Virus. The canonical player page is
<https://docs.1moreblock.com/player-guides/plugins/doors/>.

## Quick Start

With the bundled 2026 route settings (the values shown by `/doors info` are
authoritative if staff customize them):

1. Type `/halloween` to travel to the Halloween world.
2. Look for a **closed door** with a **golden pressure plate** in front of it.
3. Stand by that marked front side and make sure your main hand is empty.
4. Left-click the door **3 times within 5 seconds**.
5. A trick happens immediately; a treat is safely added to your Treat Bag.
   Every successful result also gives you a small candy gift at the door,
   or saves it in your bag if it cannot be delivered safely.
6. Use `/doors treatbag` to collect saved rewards in an allowed world,
   such as `oneblock` or `cave`. `/doors rewards` also shows milestone prizes.
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
- A persistent Treat Bag that holds repeated daily treats until players choose
  to collect them in an allowed claim world.
- A small candy gift at every successful door result, alongside its trick or saved treat.
- Personal milestone prizes claimed through Doors after staff enable those rewards.
- A once-per-season candy exchange with a preview and confirmation before payment.
- A clear event window and progress count without coordinate spoilers.

## Player FAQ

### Why is a marked door not answering?

During the active event, stand at the marked front of a closed door with an empty main hand. The bundled rules require three left-clicks within five seconds. Check `/doors info` if staff have changed the knocking rules.

### Can I visit the same door again tomorrow?

By default each eligible door can reward you once per Europe/Amsterdam calendar day while the event is live. The menu shows the midnight reset countdown; season discoveries and statistics are kept separately.

### Where did my treat go?

Treats are saved in your Treat Bag. Open `/doors treatbag` to claim them individually in an allowed world. Each earned treat stays separate, even if the same kit is selected several times. CMI gives you the kit and drops overflow nearby when your inventory is full, so claim somewhere suitable for collecting it. The small candy gift at each door is separate and still arrives automatically in the Halloween world. `/doors rewards` opens the reward hub with your saved treats and milestone prizes.

### Why is a milestone ready when I have no kit in my inventory?

You earned a personal prize that is waiting for you to claim through `/doors rewards`. It uses the same claim process as a saved treat and can be claimed once. Doors does not grant access to `/kits` for these prizes.

### Where can I claim rewards?

The default manual-claim worlds are `end`, `nether`, `general`, `wild`, `cave`, `acid`, `oneblock`, `chunkblock`, `skyblock`, and `skygrid`. This applies to saved treats, saved candy and milestone prizes. Automatic candy at a door is exempt. Staff can customize the list; a blocked claim leaves your reward saved.

### Can I claim after the doors stop answering?

Yes, while the season's claim period remains open and the Doors module stays
enabled. `/doors rewards` and `/doors treatbag` show the same claim deadline.
The Halloween 2026 default allows claims throughout November 7, closing exactly
at **November 8, 2026, 00:00 Europe/Amsterdam**. The knocking schedule and claim
deadline are separate. Staff can extend the deadline without replaying rewards
you already claimed. Expiry retains unclaimed records; it does not give items
or consume those rewards. Check the displayed deadline for the current setting.

### What can I do with spare Halloween candy?

Open `/doors trade`, or choose the candy exchange in `/doors`. The Halloween
2026 offer costs **256 candy items in any mixture** of the special candies
given at the doors. Bring them in your normal inventory or hotbar; candy inside
chests, bundles or shulker boxes does not count. Ordinary food and renamed
copies do not count. The menu shows your accepted total and previews the gift
before you confirm. Only the required amount is taken.

You can exchange once per player for Halloween 2026. The gift contains a
**Sweet Victory Star** (nether star), **Heart of Halloween** (heavy core),
**Lantern of the Deep** (conduit), **Hotel Afterparty Record** (Otherside music
disc), **Midnight Masquerade Pattern** (Vex armour-trim template), and the
six-page **One More Treat** book from **1MoreBlock.com Staff**. These keep their
normal Minecraft uses and make keepsakes too.

Trade in one of the allowed claim worlds listed above, in Survival or Adventure
mode, with AutoSell switched off. CMI drops any gift items that do not fit near
you, so choose a suitable place to collect them. The exchange uses the same
season claim deadline: the Halloween 2026 default closes exactly at
**November 8, 2026, 00:00 Europe/Amsterdam**. You can trade after knocking ends
while claims and the Doors module remain available.

### What if a processed claim seems to be missing items?

Check your inventory and nearby drops first. If items are still missing, contact staff with the reference shown by the claim. A possibly delivered reward is recorded as processed and is not automatically sent again; your other claims remain available.

### Why does the menu open while knocking or claiming is unavailable?

An event preview can remain visible while the module is dormant or its dates are closed. Check `/hunt` and `/doors info` for the current state, and read the specific action’s restriction.

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
| `/doors treatbag [season]` | Opens Your Halloween Treat Bag directly for the current or a retained season. Claim saved rewards one at a time in an allowed world. |
| `/doors rewards [season]` | Opens the reward hub with links to the Treat Bag and separate milestone rewards. |
| `/doors trade` | Previews the candy exchange, shows the accepted candy in your inventory, and asks you to confirm before spending it for your seasonal gift. |

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
| `totdoors.command.rewards` | Use `/doors treatbag` and `/doors rewards` to view and claim saved Door treats and earned milestone prizes, and `/doors trade` for the candy exchange. |

The server can change permission availability for particular worlds, ranks, or
events. Staff-only administration, route coordinates, debug testing, and
private reports are not exposed by the player commands.

## Rewards, Limits, and Cooldowns

Door rewards show whether they are locked, still in progress, ready to claim, or claimed. An earned enabled milestone adds one personal claim; it does not unlock a separate `/kits` redemption. A processed claim stays closed even if its delivery outcome needs an audit note. That claim cannot replay automatically, and it does not block other rewards.

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
  identical results remain four claims. Tricks happen immediately, but their
  separate candy gift may wait in the bag if it cannot be delivered safely.
- Treats and milestone prizes use the actual CMI kit console command. Doors
  records each claim and does not grant kit permissions.
- Manual claims follow the world list above and require Survival or Adventure
  mode and an open claim period. A full inventory is allowed: CMI handles nearby
  overflow drops.
- Each successful door result also selects one small candy kit from `hdc01`
  through `hdc10` for automatic delivery, including in the Halloween world.
  Its separate receipt is saved with the visit. If it cannot be attempted,
  it waits in the bag; a later manual claim follows the normal world list.
  Candy never consumes the main saved treat or adds another visit.
- All 3 knocks must occur within 5 seconds and use an empty main hand.
- `/doors hint` has a saved 15-minute cooldown by default. It survives
  reconnects and restarts.
- A milestone is awarded once per player and season. Repeated random treat
  selections remain separate earned claims.
- Annual milestone prizes remain unavailable until staff explicitly enable
  and verify their definitions.

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
| `%totdoors_claims_open%` | Whether the current season is within its reward claim period. |
| `%totdoors_claims_expire_at%` | Current season's exclusive claim deadline, or no expiry. |
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
| `%totdoors_special_reward_grants_dispatched%` | Milestone awards recorded as processed; retained historical unlocks are included. |
| `%totdoors_stream_<id>_progress%` | Your progress for a configured stream. |
| `%totdoors_stream_<id>_next_target%` | Its next target, or `complete`. |
| `%totdoors_stream_<id>_next_milestone%` | Its next milestone ID, or `complete`. |
| `%totdoors_stream_<id>_complete%` | Whether you completed every milestone in that stream. |
| `%totdoors_milestone_<id>_earned%` | Whether you earned a configured milestone. |
| `%totdoors_reward_<id>_state%` | `not-earned`, `disabled`, `pending`, `claimable`, `dispatched`, or `failed`. |

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
  says its cauldron is empty or gives a reference for missing items.

## Related Features

- `/halloween` is the server travel command used to enter the Halloween world.
- `/doors treatbag` opens Your Halloween Treat Bag directly for saved treats and waiting candy gifts.
- `/doors rewards` opens the broader hub for the Treat Bag and separate milestone rewards.
- `/doors trade` opens the optional seasonal candy exchange.
- `/kits` remains the server's separate general kit menu. New Doors milestone
  prizes are collected through `/doors rewards`.

## Technical Documentation

The publication-ready source for this guide is maintained with the private
plugin project. Staff publish its public mirror through the separate 1MB
Plugins documentation workflow; the canonical player URL above should be
considered live only after that import and deployment has completed.
