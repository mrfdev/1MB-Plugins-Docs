# ScheduledTips

## Purpose

ScheduledTips replaces simple CMI `Settings/Schedules.yml` Announcer broadcasts with a dedicated 1MB Library feature plugin. It rotates through configured tips, offers them through the shared guidance policy as clickable chat or short action-bar hints, and gives players a `/tips` menu for their preferences.

The Paper 26.3 reliability fixes and menus described here passed the complete suite build in version **1.0.4-790**. Runtime evidence is recorded in the [20 October verification report](../compatibility-tests/scheduledtips-26.3-2026-10-20.md). Real-client acceptance and live handoff remain tracked in the [ScheduledTips TODO](../../todo.scheduledtips.md).

The approved 62-tip catalogue and audience targeting passed suite **835** on Paper **26.3 STABLE 241**; see the [4 November verification record](../compatibility-tests/scheduledtips-targeting-26.3-2026-11-04.md).

## Features

- Select tips separately for each player on one shared timer, using world/environment restrictions, effective permissions and configurable experience weights.
- Skip tips that require dormant, disabled, missing, or inaccessible Feature Plugins, with automatic compatibility for existing Forage tips.
- Send clickable chat messages with subtle MiniMessage styling.
- Open personal preferences and the tip catalog through `/tips`, with a separate staff management page.
- Hide an individual configured tip after at least 12 actual chat deliveries; postpone it through the free shared guidance controls.
- Share one per-player hint frequency limit with other connected features, including AutoSell quest reminders.
- Optionally buy an allowance to skip eligible scheduled tips, with a confirmation screen, configurable count and price, and a persistent remaining count.
- Replace matching mcMMO, Jobs, `/points`, and DiscordChat tips with a live booster reminder when the matching `/rate` booster is active.
- Respect RecordingMode's shared temporary hint pause without overwriting saved visibility choices.
- Track overall deliveries, qualifying chat views, local dismissals and legacy visibility with asynchronous, atomic UUID storage. Failed preference saves pause delivery and retain the requested choice for retry.
- Let players view status, list tips, inspect seen counts, dismiss tips, and reset their own data.
- Let staff add, edit, preview, enable, disable and remove tips using serialized conditional atomic config saves. Staff lifecycle controls remain usable while the feature is dormant.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Player FAQ

### What is in the tips menu?

`/tips` and `/tips settings` open the home page. It explains tips, shows delivery and storage status, links to `/guidance` and `/next`, and shows the remaining purchased allowance. **All tips** opens the paginated catalog. The menus use a glass-pane border, your player head at the bottom left, page arrows, a back button, **Back to /menu**, and a barrier to close.

Each tip has a colored title, readable text and a yellow action line. Glint means you have allowed that individual tip; no glint means you have hidden it. A glowing tip may still be paused by staff, an unavailable activity, shared quiet preferences or a purchased allowance. Its lore explains that state and shows qualifying chat views. Restoring a hidden tip does not immediately send it.

### How do I stop seeing tips?

Open `/tips` to review the optional purchase: by default, **skip the next 250 eligible scheduled tips for $2,500**. The confirmation shows the current price, number of skips and remaining allowance. Nothing is charged merely by opening a menu. `/tips off` and `/tips suppress` open this menu; they no longer create a new permanent all-tips off preference.

`/guidance` still offers **Normal**, **Fewer**, **Off**, a temporary pause and chat/action-bar choices for free. `/next` remains a free activity hub. RecordingMode's temporary quiet control also remains free. These controls apply to connected optional hints, while the purchased allowance applies to ordinary ScheduledTips entries only.

An old saved `/tips off` choice stays in effect. The home page offers **Resume tips**, and `/tips on` resumes it explicitly. `/tips toggle` resumes an existing off choice or opens the suppression menu. Resuming still follows shared guidance choices.

### Can I hide one repeated tip instead of all tips?

Yes, after that tip has appeared in your normal chat at least **12 times**. The server may configure a higher threshold. The same rule applies in the tips menu, `/tips dismiss <tip-id>`, the chat **[Hide]** control and `/guidance` hide routes. Before that, the menu shows your progress and how many chat views remain.

Reading a menu or `/tips list`, previews, action-bar output, suppressed opportunities and live-booster replacements do not earn chat views for the original tip. **[Later]** remains available to postpone hints. Existing hidden choices remain hidden across the upgrade, even when historical records cannot prove 12 chat views.

### How do I bring dismissed tips back?

Use the tip catalog's restore action. Shared hidden/postponed hints can also be restored in `/guidance`. `/tips reset` resets ScheduledTips' own delivery counts, qualifying chat counts, local dismissals and legacy visibility. It preserves shared hidden hints, frequency and display choices, and does not erase purchased allowance or transaction receipts. Restore shared hidden hints through `/guidance` when needed.

### When does a purchased skip get used?

One skip is consumed when an ordinary tip has passed the shared delivery checks and is admitted as an eligible opportunity. Hidden or postponed topics, shared Off/pause, RecordingMode, repeat and frequency limits, unavailable features, missing permissions and stale content are checked before admission. An unused allowance survives logout and restart; it is a count, not a timed subscription. Other providers' hints and live-booster reminders do not consume it.

There is a small race after admission: a logout, permission change or other state change may occur while the durable allowance update is completing. That already-admitted opportunity still consumes one skip, even if the later state would prevent chat delivery. It is recorded once and never replayed or automatically refunded. A blocked or failed storage operation pauses delivery until recovery rather than sending through an uncertain allowance.

### What if saving or a purchase fails?

The menu shows that tips are paused and offers recovery. Use `/tips retry` to retry saving your latest preference changes and recover safe local allowance receipts. A failed save does not silently restore an older opt-in choice. If a payment outcome is uncertain, do not buy again to retry it: staff must inspect the transaction and verify the economy outcome. Recovery never automatically repeats a withdrawal.

### Why did a tip become a booster reminder?

When the matching booster is active, an ordinary tip can be replaced by a clickable `/rate` reminder so you can see the current bonus.

### Why did a tip disappear?

An activity may be paused or unavailable to you. Its tips are excluded from rotation and the eligible text listings until it is available again; the GUI can explain an unavailable catalog entry without promising delivery. Your hidden choices and view counts stay saved. Older entries in `/guidance` use an unavailable title and apply the current hide/restore rules. Restoring one does not enable the activity or immediately replay a tip. The scheduler keeps checking when all dependent tips are temporarily unavailable.

### Why do other players see different tips?

Tips are selected for each player using their current world, available permissions and recorded playtime. Newer players see introductory topics more often, while experienced players see them less often. These choices change the mix of topics; they do not increase the scheduled message frequency or override your quiet settings.

## Commands

```text
/tips
/tips gui
/tips status
/tips settings
/tips on
/tips off
/tips toggle
/tips suppress
/tips list [page]
/tips seen [page]
/tips dismiss <tip-id>
/tips reset
/tips retry
/tips admin
/tips admin list [page]
/tips admin status
/tips admin last
/tips admin next
/tips admin add <tip-id> <MiniMessage text>
/tips admin edit <tip-id> <MiniMessage text>
/tips admin remove <tip-id>
/tips admin enable-tip <tip-id>
/tips admin disable-tip <tip-id>
/tips admin enable
/tips admin disable
/tips admin preview <tip-id>
/tips admin broadcast [tip-id]
/tips admin reset <online-player> [all|tip-id]
/tips admin config [page]
/tips admin set <path> <value>
/tips admin reload
/tips admin purchases <uuid>
/tips admin recover <uuid> <transaction>
/tips admin resolve <transaction> <revision> charged|not-charged|refunded confirm
```

Global library examples:

```text
/1mblib debug plugin scheduledtips
/1mblib debug plugin scheduledtips all
/1mblib config scheduledtips
/1mblib config set scheduledtips schedule.interval-seconds 600
/tips admin add discord Join our <color:#bde0fe>Discord</color> with /discord.
/tips admin disable-tip profile
/1mblib config set global guidance.fewer-gap-seconds 600
/1mblib translations reload
```

## Permissions

```text
onembcmi.scheduledtips.use
onembcmi.scheduledtips.toggle
onembcmi.scheduledtips.dismiss
onembcmi.scheduledtips.admin
onembcmi.scheduledtips.admin.broadcast
onembcmi.scheduledtips.admin.reset
onembcmi.scheduledtips.admin.reload
onembcmi.scheduledtips.admin.reconcile
```

Staff management requires `onembcmi.scheduledtips.admin`. Receipt inspection and reconciliation additionally require `onembcmi.scheduledtips.admin.reconcile`, which defaults to operators. Purchase and preference controls do not grant staff access.

## Staff menus and purchase recovery

The staff page is hidden from ordinary players. It lists configured tips, including paused entries, and offers preview, server enable/disable and confirmed deletion. Add/edit buttons send a private command suggestion to complete and review before submission. They do not intercept public chat or execute authored tip actions. GUI lore is inert. Both the staff Preview button and `/tips admin preview <id>` render private chat components with their authored hover/click actions, including for disabled entries; these actions run only when clicked. Previews do not earn chat views. Menu sessions, permissions, configuration generation and selected content are checked again before a change; a stale selection must be reopened.

Config edits save off the server thread, preserve unrelated keys and reject concurrent or stale writes. Removing a tip also removes its disabled-ID and feature-requirement references. A success response follows both the write and runtime application. `/tips admin status`, `enable`, `disable` and `reload` remain available during dormancy to authorized staff.

Purchases use durable UUID-bound receipts and allowance records. A receipt is persisted before a withdrawal, and the allowance grant is tied to the same transaction so recovery cannot grant it twice. Vault and a usable economy provider are required for purchasing. If the economy result or receipt persistence is uncertain, further purchases are blocked for review.

Use the player's actual server UUID, including for Bedrock players:

1. `/tips admin purchases <uuid>` lists unresolved receipts and their current revisions.
2. `/tips admin recover <uuid> <transaction>` retries only safe local recovery. A confirmed charge can finish its allowance grant; an uncertain charge is left for review. It never withdraws again.
3. Independently verify the provider's economy records before using `/tips admin resolve <transaction> <revision> charged|not-charged|refunded confirm`.

**charged** records a verified withdrawal and completes the allowance grant once. **not-charged** closes a verified uncharged operation. **refunded** records a refund staff have already verified outside this command. The resolve command itself never withdraws or refunds money. A changed revision, terminal receipt or conflicting granted allowance is rejected for fresh inspection. Preserve receipts and backups when investigating; deleting them is not a recovery procedure.

Purchase and consumed-opportunity receipt identities are retained to prevent replay. A conservative limit of 100,000 full receipts reserves space for all existing purchased skips and in-flight purchases before admitting a new purchase. Reaching that purchase limit blocks new purchases while already-purchased skips can still be consumed. Ordinary delivery with no remaining allowance does not create a consumption receipt. Do not delete old ledger files to make room: durable identity compaction and archival are future maintenance work.

## Placeholders

```text
%onembcmi_scheduledtips.enabled%
%onembcmi_scheduledtips.tips.count%
%onembcmi_scheduledtips.opted_out%
%onembcmi_scheduledtips.seen.total%
%onembcmi_scheduledtips.dismissed.count%
%onembcmi_scheduledtips.last_tip%
%onembcmi_scheduledtips.runtime.sent%
%onembcmi_scheduledtips.runtime.dismissed%
%onembcmi_scheduledtips.runtime.booster_reminders%
%onembcmi_scheduledtips.cache.size%
```

## CMI / CMILib Usage

CMI:

- CMI remains a runtime dependency in the project stack.
- ScheduledTips is intended to replace CMI Settings/Schedules.yml Announcer broadcasts when you want per-player dismiss/toggle behavior.
- Player-facing ScheduledTips chat uses the shared feature-prefix system with visible prefix name `Tips`, so scheduled tip broadcasts and `/tips` responses do not use the generic `1MB Library` library prefix. The symbol comes from `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.scheduledtips`.
- When the Boosters feature is installed, ScheduledTips can ask the shared Boosters service for live `/rate` booster state and replace matching booster tips with a clickable reminder.
- The reviewed 4 November CMI Announcer catalog is converted to MiniMessage. This is authored configuration, not a general CMI parser or automatic import. Raw CMI custom-text tags, named color tokens and arbitrary placeholders are not expanded in tip bodies.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.

Paper:

- Paper scheduler APIs run the repeating tip task.
- Adventure components, MiniMessage, click events, and hover events render the clickable tip output.
- Shared `PlayerDataStore` persists preferences off the main thread; provider and player checks run on the main thread.

Economy:

- Vault is an optional dependency. A working registered economy provider is needed for the paid suppression purchase; free menus, guidance and activity links remain separate.
- Allowance and transaction disk work runs on a storage worker. Economy access and player/session checks run on the server thread.

## Config

Important config paths:

```text
enabled
schedule.initial-delay-seconds
schedule.interval-seconds
schedule.min-players
schedule.randomize
dismiss.after-seen-count
suppression.enabled
suppression.count
suppression.price
broadcast.require-permission
broadcast.show-dismiss-before-threshold
broadcast.show-off-button
list.entries-per-page
booster-reminders.enabled
booster-reminders.generic-keywords
booster-reminders.tip-id-matchers.mcmmo
booster-reminders.tip-id-matchers.jobs
booster-reminders.tip-id-matchers.points
booster-reminders.tip-id-matchers.discordchat
booster-reminders.text-keywords.mcmmo
booster-reminders.text-keywords.jobs
booster-reminders.text-keywords.points
booster-reminders.text-keywords.discordchat
tips
disabled-tip-ids
tip-feature-requirements
tip-targeting
targeting.world-groups
targeting.newcomer-hours
targeting.experienced-hours
```

`dismiss.after-seen-count` defaults to `12` and is enforced with a minimum of `12`, using only qualifying normal-tip chat deliveries. A larger configured value raises the requirement. Shared guidance supplies regular chat controls and enforces the same per-topic rule. Legacy `broadcast.show-dismiss-before-threshold` and `broadcast.show-off-button` do not bypass that policy or purchase confirmation.

`suppression.enabled` controls whether a purchase is offered. `suppression.count` defaults to `250` and accepts `1`–`100000`; `suppression.price` defaults to `2500.0` and accepts finite values from `0` to `1000000000`. Price, count, permissions, player/session identity and economy state are rechecked at confirmation. Shared quiet controls remain free.

Scheduled and staff broadcasts are offered to the shared budget, and their reported audience is a queued count. Overall seen counts increase only on actual delivery. The separate `chat-seen` count excludes action bars and booster replacements.

Tip entries use this format:

```text
id|MiniMessage text shown to players
```

Example:

```yaml
schedule:
  min-players: 2
  randomize: true
dismiss:
  after-seen-count: 12
suppression:
  enabled: true
  count: 250
  price: 2500.0
tips:
  - "visit|Use <color:#bde0fe>/visit set</color> to create a public visit point for your builds."
  - "profile|Open <color:#bde0fe>/guidance</color> to choose fewer optional hints or pause them for free."
disabled-tip-ids:
  - "profile"
booster-reminders:
  enabled: true
  generic-keywords:
    - "booster"
    - "boosters"
    - "/rate"
  tip-id-matchers:
    mcmmo:
      - "mcmmo"
      - "mcmmo_*"
    jobs:
      - "jobs"
      - "jobs_*"
    points:
      - "points"
      - "points_*"
      - "pointy_*"
    discordchat:
      - "discordchat"
      - "discord_*"
  text-keywords:
    mcmmo:
      - "mcmmo"
      - "/mcstats"
    jobs:
      - "/jobs"
      - "jobs booster"
    points:
      - "/points"
      - "pointy fish"
    discordchat:
      - "discordchat"
      - "server-chat"
```

Specific matchers win first. For example, a tip id `mcmmo_booster` only turns into a reminder when the mcMMO booster is live. A generic booster tip with no specific match can turn into a reminder for any currently active booster.

The [approved 1MB catalog](../examples/scheduledtips-1mb.yml) has **62 enabled entries**: 59 of the original 60 CMI announcements are represented by consolidated tips, Celebration is removed at the owner's request, and all eight other review holds are resolved. The catalogue adds AutoSell, Forage, AFKShrine, DiscordChat, Emotes, PlayerTodo, Chunks and MobHat, plus discovery for all six GameTypes. `/craft`, `/ec` and `/anvil` have separate permission-gated entries. RecordingMode, NameMC, HideAndSheep, seasonal additions and operational topics remain outside this content expansion.

The reference stages with its master switch off and live world names. The local acceptance file is enabled and adapts world groups to the test server. See the [migration guide](../plans/scheduledtips-cmi-migration.md) for all review outcomes, source mapping, live/test differences and the manual handoff. Targeting needs the new complete suite; copying this file to old binaries does not enable targeting. Real Java/Bedrock gameplay acceptance precedes owner-managed live activation.

## Audience targeting and weighted rotation

The single scheduler chooses a separate eligible topic for each player. `schedule.randomize: false` uses smooth weighted rotation; `true` uses weighted random selection with no immediate duplicate when alternatives exist. There are no separate timers per audience. The approved catalogue retains the 25-minute opportunity and two-player minimum; shared guidance can reduce actual delivery.

```yaml
targeting:
  newcomer-hours: 12
  experienced-hours: 100
  world-groups:
    - "regular|general,wild,nether,end"
    - "oneblock|oneblock,oneblock_world"
tip-targeting:
  - "homes|regular|*|*|12|4|1"
  - "jump_perk|regular|cmi.command.jump|*|4|4|4"
  - "oneblock_team|oneblock|*|*|8|4|2"
```

Each targeting row is `tip-id|world-groups|permissions|environments|new|regular|experienced`. World groups are comma-separated OR alternatives and contain **exact Bukkit world names**. Every listed permission is required. Environments are `normal`, `nether`, `the_end`, `custom`; `*` means unrestricted for worlds, permissions or environments. Weight values are integers 0–100; zero excludes that experience band. Rules only reference configured tip IDs. Unlisted tips have weight 1 for all audiences.

Experience comes from the online player's recorded playtime: below `newcomer-hours`, between the two thresholds, or at/above `experienced-hours`. Thresholds must satisfy `1 <= newcomer-hours < experienced-hours <= 29000`. Negative overflowed statistics count as experienced. Playtime can include AFK time and follows the server's recorded/reset statistics; it is not a LuckPerms rank estimate. Perk access uses effective player permissions, including group inheritance and world context, without identity lookups or permission changes.

The approved introductory weights are **12 / 4 / 1** for new/regular/experienced players. Most activities use **4 / 4 / 4**, and rare community/history messages use **1 / 1 / 1**. These values change the topic mix within existing limits, not the number of messages. Hidden, recently delivered and ineligible topics are skipped before selection. Rotation scores are session-only, bounded by the catalogue and released on quit/reload/disable; saved preferences and delivery history are preserved.

World, environment, permission, feature and experience eligibility are rechecked when offering and when a queued hint is about to deliver. Manual broadcasts follow these restrictions too. Player lists show current eligibility; staff previews still display authored content without recording a delivery. Destination commands continue to check island ownership, individual item/mob unlocks and any costs.

Malformed targeting, unknown world groups/tip IDs, duplicate rules or invalid weights pause all promotion. `/tips admin status` reports the errors; correct the config and reload. Removing a tip through staff commands atomically removes its targeting rule. Shared quiet settings, AFK/RecordingMode pauses, the chat-view hide threshold and paid allowances are unchanged.

## Feature availability

Forage was verified active on live on 4 November 2026 and is included in the approved catalogue. Its tips still stop automatically if it becomes dormant or unavailable. ScheduledTips automatically requires active Forage for IDs `forage`, `forage_*`, and `forage-*`, and text containing the standalone word or command `Forage`/`/forage`. It examines the raw MiniMessage text, including click and hover tags, namespaced commands, and shared routes such as `/next guide forage`. Existing IDs, text, counts, and dismissals need no migration. This deliberately conservative compatibility rule can also suppress ordinary text mentioning foraging as “forage”.

Use explicit requirements for other Feature Plugins or custom tip wording whose dependency is not visible in its ID or text:

```yaml
tip-feature-requirements:
  - "camp_intro|forage"
  - "trade_and_travel|autosell,journeymap"
```

Each entry is `tip-id|feature-id[,feature-id]`, using registered library feature IDs. Every required feature must have an enabled owner JAR, a valid enabled configuration, active gameplay behavior, and the receiving player's feature-use permission. Debug mode neither hides active gameplay nor bypasses these checks. Requirements supplement the automatic Forage rule; repeated declarations combine. Other features are not inferred automatically from arbitrary prose, and third-party plugins outside the library's feature registry are not supported as requirement IDs.

Availability is checked when choosing a rotation entry, listing player tips, queuing a hint, and immediately before delivery. Manual broadcasts and booster substitutions follow the same checks. A queued tip that becomes unavailable is discarded without a seen-count increment. Unrelated available tips continue normally. Player hiding, postponement, visibility, and delivery history survive feature dormancy and reactivation.

An unknown feature ID keeps its dependent tip paused. Malformed declarations, a non-list setting, or non-text entries pause all ScheduledTips promotion until corrected and reloaded. `/tips admin list`, `/tips admin status`, and `/tips admin preview <id>` explain availability; staff previews still show the configured wording for inspection. After editing the list, use `/tips admin reload` and inspect these diagnostics.

Tracking and validation: [#43](https://github.com/mrfdev/1MB-Library/issues/43) and the [dormant-feature checks](../../checklist.md#dormant-feature-communication-43).

## Data

Dedicated long-lived profiles live at `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/scheduledtips/<uuid>.yml`. On first load, the existing root UUID section is copied without changing it. New saves use a bounded storage worker and atomic writes/backups. A failed load or save pauses tips for that player instead of silently resetting preferences; `/tips retry` preserves and retries the latest requested choice.

The additive `chat-seen` map starts at zero for tips whose old profile has only `seen`. Historical `seen` mixed delivery channels and booster replacements, so it cannot safely prove normal chat views. Existing local and shared hidden choices and existing overall history are retained. Restoring an old hidden tip is allowed; hiding it again follows its current qualifying count.

```yaml
uuid: "player-uuid"
name: "PlayerName"
scheduledtips:
  schema: 1
  opted-out: false
  legacy-recording-restored: false
  seen:
    visit: 12
  chat-seen:
    visit: 12
  dismissed:
    visit: "2026-04-25T00:00:00Z"
```

Paid allowances and their transaction journal live separately under `plugins/1MB-CMIAPI/CMIAPILIB/playerdata/scheduledtips-suppression/`, in `allowances/` and `transactions/`. Back up this whole directory together with `scheduledtips/` and `guidance/`. Missing, empty, restored or quarantined paid balances and damaged journals fail closed when receipt/backup evidence shows previous state; an older balance is not silently accepted because it may contain already-spent skips. Preference resets do not remove paid records. Read the [shared guidance upgrade notes](../player-guidance.md#persistence-and-upgrades) before a downgrade or manual cleanup.

## Security Notes

- New tip IDs must use 1–40 lowercase `a-z`, `0-9`, `_`, and `-` characters after trimming/lowercasing; malformed IDs are rejected. `booster-status` is reserved. Tip text is limited to 4,096 characters.
- `/tips admin add` and `edit` update the `tips` list. Removal atomically clears that tip's associated disabled-ID, requirement and targeting entries.
- `/tips admin enable-tip` and `disable-tip` update only `disabled-tip-ids`.
- `/tips admin set` is limited to known scalar config paths registered by this feature.
- Player commands never run arbitrary configured commands.
- Standard guidance buttons call shared settings, hide and postpone actions; the configured tip's permanent-hide rule is rechecked on every route. Legacy `/tips off` links only open the review menu.
- Dynamic booster reminder click actions only run `/rate`.
- Player-specific data uses the dedicated `scheduledtips` UUID directory. Legacy cleanup does not remove it.
- Configured chat tip text is trusted admin-authored MiniMessage content. GUI lore renders inert readable text; private chat previews retain authored hover/click actions.
- Purchases use server UUIDs, single-use confirmation quotes, serialized per-player work and durable receipt identities. An uncertain economy result requires staff evidence and is never automatically charged again.

## Shared Library Usage

ScheduledTips uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, PlaceholderAPI routing, tab filtering, paginated list output, shared `PlayerDataStore` UUID load/save, shared optional-guidance delivery, debug metadata, and optional service discovery for Boosters live-state reminders.

[Plugin index](README.md)
