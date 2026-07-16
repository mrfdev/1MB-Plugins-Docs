# DiscordChat

DiscordChat is a player-fun feature plugin for turning the DiscordSRV `#server-chat` bridge into a gentle engagement loop. Linked players earn DiscordChat EXP from meaningful chat, emotes, and daily participation. Every complete `25` EXP converts into one spendable point by default, while streak milestones award separate bonus points. Points can be traded in game through `/discordchat rewards`.

The plugin is report-first and reward-safe: it only records DiscordSRV events, stores local player progress, and runs configured reward commands after a player confirms a point trade in game. It does not post to Discord, moderate Discord, or change DiscordSRV configuration.

When Menu is installed and enabled, `/menu` includes a DiscordChat button and the DiscordChat GUI pages show a Main Menu shortcut beside their close controls.

## Commands

| Command | Explanation | Example |
| --- | --- | --- |
| `/discordchat` | Opens the DiscordChat overview GUI with points, streak, tracked words/emotes, reminders, rewards, and milestones. | `/discordchat` |
| `/discordchat status` | Shows your linked state, points, EXP progress toward the next point, tracked point sources, current streak, longest streak, and chat totals. | `/discordchat status` |
| `/discordchat top [points\|streak\|messages\|words\|emotes]` | Shows the top 10 DiscordChat profiles for a public metric. | `/discordchat top streak` |
| `/discordchat pulse` | Opens the community pulse GUI with today's activity, seven-day totals, and active XP boosts. Console receives the same data as chat output. | `/discordchat pulse` |
| `/discordchat rewards` | Opens the point trade GUI. | `/discordchat rewards` |
| `/discordchat tools` | Opens the point-funded item tools GUI for Unbreaking IV, Fortune IV, and Looting IV. | `/discordchat tools` |
| `/discordchat milestones` | Shows the configured streak milestones and your next target. | `/discordchat milestones` |
| `/discordchat history` | Opens the milestone history GUI with hit dates and bonus point details where available. | `/discordchat history` |
| `/discordchat link` | Explains `/discord` and `/discord link` so players can join and link DiscordSRV. | `/discordchat link` |
| `/discordchat optout` | Toggles friendly Discord invite reminders for that player. | `/discordchat optout` |
| `/discordchat celebrations` | Toggles whether your own major DiscordChat milestone broadcasts can be announced publicly. | `/discordchat celebrations` |
| `/discordchat prefix <preset\|off>` | Selects an unlocked DiscordChat prefix placeholder preset. | `/discordchat prefix discord` |
| `/discordchat suffix <preset\|off>` | Selects an unlocked DiscordChat suffix placeholder preset. | `/discordchat suffix chatty` |
| `/discordchat admin check` | Runs the read-only reward readiness report for catalog ids, dependencies, CMI kits, command templates and roots, LuckPerms targets, costs, and unused definitions. | `/discordchat admin check` |
| `/discordchat admin inspect <player\|uuid>` | Staff view for another player's DiscordChat progress. | `/discordchat admin inspect mrfloris` |
| `/discordchat admin export <player\|uuid>` | Writes a Markdown staff report under `plugins/1MB-CMIAPI/DiscordChat/exports/`. | `/discordchat admin export mrfloris` |
| `/discordchat admin community [days]` | Writes a Markdown community activity report for the last N days. | `/discordchat admin community 30` |
| `/discordchat admin archive <days> preview` | Previews old daily rows that can be archived while lifetime totals remain intact. | `/discordchat admin archive 180 preview` |
| `/discordchat admin archive <days> confirm` | Removes old daily rows after writing an archive report. Lifetime totals, points, streaks, and milestones are preserved. | `/discordchat admin archive 180 confirm` |
| `/discordchat admin event status` | Shows the current DiscordChat XP event multiplier. | `/discordchat admin event status` |
| `/discordchat admin event start <duration> <multiplier> [reason]` | Starts a temporary DiscordChat XP multiplier that Boosters `/rate` can display while active. | `/discordchat admin event start 2h 2 community-night` |
| `/discordchat admin event stop` | Stops the temporary DiscordChat XP multiplier. | `/discordchat admin event stop` |
| `/discordchat admin award <player\|uuid> helpful [reason]` | Adds the configured staff-recognition XP/points for a standout helpful reply. | `/discordchat admin award mrfloris helpful answered redstone question` |
| `/discordchat admin award <player\|uuid> xp <amount> [reason]` | Adds audited XP, immediately converts complete point units, and reports the converted amount. The XP is clamped by `manual-awards.max-exp`. | `/discordchat admin award mrfloris xp 50 community help` |
| `/discordchat admin award <player\|uuid> points <amount> [reason]` | Adds audited spendable points, clamped by `manual-awards.max-points`. | `/discordchat admin award mrfloris points 25 event helper` |
| `/discordchat admin collectible [player] [amount]` | Creates stamped DiscordChat keepsake items for building the collectible reward kit. | `/discordchat admin collectible mrfloris 8` |
| `/discordchat admin grantpoints <player\|uuid> <amount> [reason]` | Adds spendable points with audit logging. | `/discordchat admin grantpoints mrfloris 100 event-prize` |
| `/discordchat admin takepoints <player\|uuid> <amount> [reason]` | Removes spendable points with audit logging. | `/discordchat admin takepoints mrfloris 50 correction` |
| `/discordchat admin transaction status <player\|uuid> [transaction-id]` | Shows the active or most recent persisted reward transaction, command progress, attempts, retry safety, and failure reason. | `/discordchat admin transaction status mrfloris` |
| `/discordchat admin transaction retry <player\|uuid> [confirm]` | Retries the active failed transaction from its persisted command progress without charging again. Use `confirm` only when delivery progress is marked uncertain. The player must be online. | `/discordchat admin transaction retry mrfloris` |
| `/discordchat admin transaction refund <player\|uuid> confirm` | Returns the reserved points and one-time eligibility for the active pending, delivered, or failed transaction. A second refund is refused. | `/discordchat admin transaction refund mrfloris confirm` |
| `/discordchat admin reset <player\|uuid> confirm` | Deletes one player's live DiscordChat profile and last-known-good backup. | `/discordchat admin reset mrfloris confirm` |
| `/discordchat admin smoke` | Shows DiscordSRV hook state, target channel, linked account count, and tracking counters. | `/discordchat admin smoke` |
| `/discordchat reload` | Reloads config, milestone values, and reward definitions. | `/discordchat reload` |
| `/discordchat debug` | Shared debug page with runtime, build, Paper, Java, category, and docs metadata. | `/discordchat debug` |
| `/discordchat debug economy` | Estimates earning pace and reward cost bands from current config. | `/discordchat debug economy` |
| `/discordchat debug noxp [page]` | Shows staff totals for no-XP reasons so quality filters can be tuned. | `/discordchat debug noxp` |
| `/discordchat debug first` | Shows first Discord message state for day, week, month, and year. | `/discordchat debug first` |
| `/discordchat debug fireworks [player]` | Gives staff sample fireworks for creating the `discordchat_fireworks` kit. | `/discordchat debug fireworks mrfloris` |
| `/discordchat debug permissions` | Lists declared permission nodes. In game this is paginated; console output is not paginated. | `/discordchat debug permissions` |

## How Tracking Works

DiscordChat subscribes to DiscordSRV's API when DiscordSRV is loaded:

- Discord-to-game messages are counted from the configured Discord TextChannel id, currently `721697397658353725`.
- Game-to-Discord messages are counted from the configured DiscordSRV game channel name, usually `global`.
- Discord messages only count when DiscordSRV can resolve the Discord account to a linked Minecraft UUID.
- In-game bridged messages only count when the player is linked through DiscordSRV.
- DiscordSRV Discord-to-game display-name rewriting is available as an optional diagnostic toggle, but is disabled by default. StaffMsg owns the linked display-name formatting for staff chat.
- Bot messages, unlinked Discord accounts, non-target DiscordSRV channels, and command-like messages are ignored for rewards and reported by `/discordchat admin smoke`.
- Unlinked in-game players can receive a cooldown-protected reminder after normal in-game chat, but the plugin no longer prompts on join by default.

The plugin stores the latest known Minecraft name, Discord id, linked state, lifetime totals, daily totals, current streak, longest streak, milestone completions, the sub-threshold EXP remainder, spendable points, claimed one-time rewards, and the bounded reward transaction ledger.

## EXP, Points, And Milestones

Default behavior:

- Short normal message: `2` EXP.
- Emote-only message: `1` EXP.
- Messages with at least `5` words receive a `35%` long-message bonus.
- Messages with emotes, emoji, or stickers receive a `20%` emote bonus.
- Messages must pass quality checks before they can earn XP or increment streaks.
- Messages starting with configured bot prefixes such as `?`, exact low-effort lines such as `hi`, `hey`, `lol`, `k`, and `playerlist`, configured blocked fragments, repeated recent messages, link-only messages, and 85%+ caps-heavy shouting are tracked but receive no XP.
- Active conversationalists get a small extra bonus every configured number of meaningful messages, with a daily cap.
- A conversation-cluster bonus can add small party-style XP when several distinct linked players chat meaningfully in the public server-chat window.
- The first meaningful Discord-origin message of the day, week, month, and year can add small transparent bonus XP.
- The first meaningful Discord-origin message of the day, week, month, or year can also broadcast one friendly in-game celebration, if enabled.
- `/discordchat admin event start <duration> <multiplier> [reason]` multiplies message, conversation, streak, and first-Discord bonus XP while active. Boosters `/rate` only shows DiscordChat while this event is active.
- Configurable bonus windows can add recurring XP boosts, such as weekend chat boosts. They stack with the temporary event multiplier and only affect future earned XP.
- One message is capped at `8` EXP.
- Daily message EXP is capped at `60`.
- The first tracked chat activity on a new Amsterdam calendar day increments the streak and adds `10` streak EXP.
- Milestones are `7`, `30`, `90`, `100`, `180`, and `365` days by default.
- Every XP award immediately converts complete units using floor conversion. At the default ratio, `24.9` EXP remains pending, `25` EXP becomes `1` point with `0` pending, and `62.7` EXP becomes `2` points with `12.7` pending.
- On a new milestone, the player receives a separate bonus worth at least `25` points or `20%` of current points, whichever is higher. Milestone completion does not control ordinary XP conversion.
- Major milestones can broadcast a friendly in-game celebration. Players can use `/discordchat celebrations` to keep their own milestone announcements private.

The milestone display intentionally uses the next target style:

```text
Streak: 6 days / 7
Streak: 8 days / 30
Streak: 83 days / 90
```

Offline Discord chat can still count as long as DiscordSRV can resolve the Discord user to a linked Minecraft UUID. That keeps the feature focused on Discord engagement while still requiring players to return in game to view stats and spend rewards. AFK state is not rewarded extra by default; if added later, it should be a small in-game presence bonus rather than an AFK bonus, so the system does not accidentally reward not playing.

Links and screenshots are handled conservatively: a link-only message earns no XP, but a link with useful context can pass the normal quality checks. Question marks and exclamation marks are not secret bonus triggers; the current model stays transparent and rewards the same quality rules everyone can understand.

With default values, a highly active linked player can earn roughly `70` to `81` EXP per day before weekly/monthly/yearly first-Discord bonuses and event multipliers. At `25` EXP per point, complete units convert immediately into about `2` to `3` points per active day, with the remainder carrying forward. Milestone bonus points are additional. That makes `100-180` point rewards cheap, `220-350` point rewards medium, and `500-650` point rewards expensive under default tuning.

## Default Rewards

The default reward set is configurable and intentionally server-owned. Selecting a reward opens an owner-bound confirmation page showing its exact cost, repeatability, cooldown, current balance, and balance after purchase. Only the second click can create a persisted reservation, so a rejected command does not silently consume points or one-time eligibility.

- Discord group: adds LuckPerms parent `1mb_discordchat` once.
- DiscordChat kit: runs `cmi kit discordchat_bundle {player} -s`.
- Particle bundle: grants the configured ProCosmetics particle permission.
- Prefix preset: unlocks `/discordchat prefix discord`.
- Suffix preset: unlocks `/discordchat suffix chatty`.
- Emote unlock: grants the configured EmoteMenu chatting emote permission.
- Player head bundle: runs `cmi kit discordchat_heads {player} -s`.
- Fireworks bundle: runs `cmi kit discordchat_fireworks {player} -s`.
- Welcome points bundle: runs the configured external `/points` reward command.
- 15m mcMMO booster: runs `rate start mcmmo 15m 4` for a server-wide 4x mcMMO booster. Its default cooldown is one hour, server-wide.
- 15m Jobs booster: runs `rate start jobs 15m 6` for a server-wide 6x Jobs booster. Its default cooldown is one hour, server-wide.
- Allay MobHat unlock: grants MobHat use/wear plus `onembcmi.mobhat.mob.allay`.
- JourneyMap bundle: runs `cmi kit discordchat_journeymap {player} -s`.
- Passport bundle: runs `cmi kit discordchat_passport {player} -s`.
- Garden head bundle: runs `cmi kit discordchat_heads_garden {player} -s`.
- Food head bundle: runs `cmi kit discordchat_heads_food {player} -s`.
- Design head bundle: runs `cmi kit discordchat_heads_design {player} -s`.
- DiscordChat collectible: runs `cmi kit discordchat_collectible {player} -s`.
- Money bundle: runs the configured CMI money command.
- Vote tokens bundle: runs `cmi kit discordchat_votetokens {player} -s`.
- Milestone title permission: grants `onembcmi.discordchat.title`.
- Item tools: `/discordchat tools` lets players spend points on safe GUI upgrades for Unbreaking IV, Fortune IV, and Looting IV.

All commands run as console and support `{player}`, `%player%`, `{uuid}`, and `%uuid%`. Player names are sanitized before commands dispatch.

Reward redemption follows this transaction flow:

1. Bind each visible slot to the reward id rendered in that exact owner-bound menu session.
2. Open a second confirmation view. If the reward definition changes during a config reload, the old confirmation is rejected and the updated details must be reviewed again.
3. Render and validate every configured command before changing playerdata.
4. Recheck points, one-time ownership, active transactions, and player/global cooldown eligibility inside the synchronized reservation boundary.
5. Require every Bukkit command root to exist and every referenced `cmi kit <name>` kit to exist and be enabled.
6. Atomically create a `pending` transaction, reserve the point cost, and reserve one-time eligibility where applicable.
7. Dispatch each recorded command in order. After every accepted command, atomically persist the completed-command count.
8. Persist `delivered` only after every command is accepted, then persist `finalized` with the successful reward timestamp to close the reservation while retaining its history.
9. Persist a rejected or exceptional delivery as `failed`. The reservation remains held so staff can inspect the exact command progress and choose retry or refund. Failed and refunded delivery does not start a cooldown.
10. A staff retry returns the same record to `pending`, increments its attempt counter, resumes after the persisted command count, and never deducts the cost a second time.
11. A staff refund persists `refunded`, returns the original cost, and restores one-time eligibility exactly once.
12. On startup, fully recorded delivery is finalized automatically. Incomplete delivery becomes `failed`; uncertain retries require the explicit `confirm` argument. Legacy `rewards.pending` records from older builds are migrated and refunded using their previous behavior.

Every record keeps its resolved commands, original command templates, progress, attempts, timestamps, retry-safety flag, failure reason, and transition history. Terminal `finalized` and `refunded` records remain available for inspection; `rewards.transaction-history-limit` retains the newest records per player and never prunes an active transaction.

Transaction events are also written to `logs/reward.log` with the transaction id, reward id, state, and relevant cost or command count. Arbitrary console-command effects cannot be reversed automatically after another plugin applies them. If command two fails after command one ran, staff can retry from command two or deliberately refund after reviewing the partial delivery. Keep multi-command rewards idempotent and validate them before enabling live spending.

The booster rewards depend on the 1MB Boosters feature plugin and its `/rate start` command. mcMMO and Jobs still need to be present and configured on the server for those boosts to do anything useful. These rewards are intentionally mid-tier because they benefit everyone online, not only the player who spends the DiscordChat points. Their one-hour `global` cooldown prevents a different player from immediately stacking the same server-wide reward and survives plugin/server restarts.

MobHat, JourneyMap, and PassportDiscovery rewards are dependency-aware. If the required feature plugin is missing or the configured MobHat mob is not enabled, the reward shows as unavailable and the server refuses the trade instead of spending points.

Item tools use an identity-bound escrow file while the GUI is open. Escrow replacements are flushed and atomically moved into place, and each payload must decode to exactly one item for the UUID in its filename. The item is returned on close, quit, kick, plugin disable, join, or when `/discordchat tools` opens again. If a matching item is already present during restore, the plugin keeps the escrow file and asks for staff review instead of risking a duplicate. Invalid YAML, a mismatched UUID, a missing item, or an undecodable item is moved to `escrow/quarantine/` and reported instead of being treated as an empty record. If a restored item cannot be removed from escrow, the inventory change is rolled back so the live record is not duplicated silently.

The DiscordChat GUIs use owner-bound session ids. Reward slots carry an immutable slot-to-id snapshot, and the confirmation holder carries the exact reward definition the player reviewed. Old menus, wrong-owner menus, stale/changed confirmations, top-inventory drags, shift-clicks, number-key swaps, offhand swaps, and unsupported click types are cancelled before any reward or tool logic runs. Normal left/right clicks in the player's own inventory are allowed only while the tools menu is open so the player can pick up one item for the protected tool slot.

### Required Reward Kits

Create these CMI kits before enabling their matching rewards:

| Kit | Purpose |
| --- | --- |
| `discordchat_bundle` | Repeatable small DiscordChat cosmetic kit. |
| `discordchat_heads` | Decorative player-head bundle, such as garden, food, or design heads. |
| `discordchat_heads_garden` | Garden-themed decorative player heads. |
| `discordchat_heads_food` | Food-themed decorative player heads. |
| `discordchat_heads_design` | Design/building-themed decorative player heads. |
| `discordchat_fireworks` | Celebration/fireworks bundle. |
| `discordchat_votetokens` | Bundle containing all six vote tokens and all six extra vote tokens. |
| `discordchat_journeymap` | JourneyMap-themed reward bundle. |
| `discordchat_passport` | PassportDiscovery-themed reward bundle. |
| `discordchat_collectible` | DiscordChat-only keepsake item with no intended economy value. |

Use the `discordchat_<type>` prefix for any future reward kits so config and docs stay easy to scan.

`rewards.ids` is the authoritative catalog membership and GUI-order list. A reward definition under `rewards.definitions.<id>` is never loaded merely because it exists: its id must also appear in `rewards.ids`. Removing an id from the list removes that reward from the loaded catalog without deleting its definition. Missing, duplicate, unsafe, or noncanonical list entries are reported by `/discordchat admin check`; an enabled definition omitted from the list is reported as an unused warning.

Setup helpers:

```text
/discordchat debug fireworks [player]
/discordchat admin collectible [player] [amount]
```

`debug fireworks` creates six sample firework stacks that can be placed into the `discordchat_fireworks` kit. `admin collectible` creates stamped DiscordChat keepsakes with hidden plugin data so the collectible kit can use a consistent, non-economy item.

## Permissions

```text
onembcmi.discordchat.use
onembcmi.discordchat.rewards
onembcmi.discordchat.tools
onembcmi.discordchat.optout
onembcmi.discordchat.admin
onembcmi.discordchat.admin.check
onembcmi.discordchat.admin.inspect
onembcmi.discordchat.admin.export
onembcmi.discordchat.admin.archive
onembcmi.discordchat.admin.event
onembcmi.discordchat.admin.award
onembcmi.discordchat.admin.points
onembcmi.discordchat.admin.transactions
onembcmi.discordchat.admin.reset
onembcmi.discordchat.admin.reload
onembcmi.discordchat.admin.smoke
onembcmi.discordchat.admin.debug
onembcmi.discordchat.cosmetic.prefix.<preset>
onembcmi.discordchat.cosmetic.suffix.<preset>
```

Default cosmetic unlock examples:

```text
onembcmi.discordchat.cosmetic.prefix.discord
onembcmi.discordchat.cosmetic.suffix.chatty
```

## Placeholders

```text
%onembcmi_discordchat_points%
%onembcmi_discordchat_pending_exp%
%onembcmi_discordchat_streak%
%onembcmi_discordchat_longest_streak%
%onembcmi_discordchat_next_milestone%
%onembcmi_discordchat_milestones_completed%
%onembcmi_discordchat_words%
%onembcmi_discordchat_emotes%
%onembcmi_discordchat_messages%
%onembcmi_discordchat_linked%
%onembcmi_discordchat_opted_out%
%onembcmi_discordchat_prefix%
%onembcmi_discordchat_suffix%
%onembcmi_discordchat_event_active%
%onembcmi_discordchat_event_multiplier%
%onembcmi_discordchat_event_timeleft%
```

Example checks:

```text
papi parse mrfloris %onembcmi_discordchat_points%
papi parse mrfloris %onembcmi_discordchat_streak%
papi parse mrfloris %onembcmi_discordchat_next_milestone%
```

## Config

The config is written to:

```text
plugins/1MB-CMIAPI/DiscordChat/config.yml
```

Important paths:

```text
discordsrv.channel-id
discordsrv.game-channel-name
discordsrv.count-discord-to-game
discordsrv.count-game-to-discord
calendar.zone-id
invite-prompts.enabled
invite-prompts.on-join-enabled
invite-prompts.after-game-chat-enabled
invite-prompts.cooldown-hours
xp.short-message-base
xp.emote-only-base
xp.long-message-word-threshold
xp.long-message-bonus-percent
xp.emote-bonus-percent
xp.max-per-message
xp.daily-message-cap
xp.daily-streak-bonus
quality.minimum-words-for-normal-exp
quality.blacklisted-prefixes
quality.blacklisted-exact
quality.blacklisted-contains
quality.ignore-links-only
quality.repeat-window-size
quality.ignore-repeated-recent-messages
quality.max-uppercase-ratio
quality.uppercase-min-letters
conversation-bonus.enabled
conversation-bonus.every-meaningful-messages
conversation-bonus.exp
conversation-bonus.daily-cap
conversation-cluster.enabled
conversation-cluster.window-seconds
conversation-cluster.min-linked-players
conversation-cluster.exp
conversation-cluster.daily-cap
first-discord-bonus.daily-exp
first-discord-bonus.weekly-exp
first-discord-bonus.monthly-exp
first-discord-bonus.yearly-exp
community-first-broadcast.enabled
community-first-broadcast.day
community-first-broadcast.week
community-first-broadcast.month
community-first-broadcast.year
event-multiplier.enabled
event-multiplier.rate
event-multiplier.ends-at-epoch-millis
bonus-windows.enabled
bonus-windows.ids
bonus-windows.definitions.<id>.enabled
bonus-windows.definitions.<id>.days
bonus-windows.definitions.<id>.start
bonus-windows.definitions.<id>.end
bonus-windows.definitions.<id>.multiplier
points.exp-per-point
milestones.days
milestones.bonus-percent-of-current-points
milestones.flat-bonus-points
milestone-broadcast.enabled
milestone-broadcast.min-days
milestone-broadcast.milestones
milestone-broadcast.respect-opt-out
manual-awards.helpful-exp
manual-awards.helpful-points
manual-awards.max-exp
manual-awards.max-points
cosmetics.prefix.presets
cosmetics.suffix.presets
rewards.enabled
rewards.ids
rewards.transaction-history-limit
rewards.definitions.<id>.*
rewards.definitions.<id>.cooldown-seconds
rewards.definitions.<id>.cooldown-scope
rewards.definitions.<id>.requires-plugin
rewards.definitions.<id>.requires-mobhat-mob
tools.enabled
tools.costs.unbreaking_4
tools.costs.fortune_4
tools.costs.looting_4
collectible.material
collectible.display-name
collectible.lore
```

Fresh installations write both `rewards.enabled: false` and `tools.enabled: false`. Chat tracking, EXP, points, milestones, and read-only reward/tool previews can therefore be configured without exposing point spending. Existing installations keep their explicitly saved values when upgrading; this default change does not turn an already enabled live setup off. Enable rewards only after `/discordchat admin check` has no `FAIL` rows and live delivery testing passes, and enable tools only after reviewing their costs and item behavior.

Every built-in reward has `cooldown-seconds` and `cooldown-scope`. A value of `0` disables its cooldown. Scope `player` tracks the last successful purchase for that player; scope `global` uses the newest successful timestamp across all profiles and blocks that reward for everyone until expiry. The built-in mcMMO and Jobs boosters default to `3600` seconds with `global` scope. Cooldowns begin only when delivery finalizes, not when the confirmation GUI opens or a transaction is reserved.

`points.exp-per-point` defaults to `25`. Every XP credit uses floor conversion immediately, and `xp.pending` therefore contains only the remainder below the configured ratio. Existing profiles are converted atomically during startup and reload, so previously stranded balances are preserved as points plus their exact one-decimal remainder. Converted points accumulate under `points.lifetime-from-exp`; streak bonuses accumulate separately under `points.lifetime-milestone-bonus`. The obsolete `milestones.convert-exp-on-hit` setting is removed automatically from upgraded configuration files.

## Reward Readiness

Run these commands after editing rewards or changing server plugins, kits, permissions, or commands:

```text
/discordchat reload
/discordchat admin check
```

The report is read-only and uses the live server state. It checks the authoritative `rewards.ids` list, enabled/unused definitions, available GUI capacity, required plugins and MobHat choices, every referenced CMI kit, reward command templates and Bukkit command roots, LuckPerms permission/group targets, positive point costs, GUI materials, valid cooldown values/scopes, persistent global cooldown history, and whether `/rate start` rewards use a global cooldown of at least 15 minutes.

- `OK` means the category passed.
- `WARN` means staff must review an intentional or externally unverifiable choice, such as an enabled unused definition or a dynamically registered external permission.
- `FAIL` blocks launch readiness and identifies a missing or unsafe dependency or value.

A report with zero failures is a static/runtime preflight, not proof that another plugin's reward command produced the intended item or effect. Complete one live purchase plus the documented transaction retry/refund smoke test before granting player access.

## Data And Logs

```text
plugins/1MB-CMIAPI/DiscordChat/players/<uuid>.yml
plugins/1MB-CMIAPI/DiscordChat/players/backups/<uuid>.yml
plugins/1MB-CMIAPI/DiscordChat/players/quarantine/<uuid>-<timestamp>.yml
plugins/1MB-CMIAPI/DiscordChat/community.yml
plugins/1MB-CMIAPI/DiscordChat/logs/reward.log
plugins/1MB-CMIAPI/DiscordChat/logs/points.log
plugins/1MB-CMIAPI/DiscordChat/logs/milestone.log
plugins/1MB-CMIAPI/DiscordChat/logs/link.log
plugins/1MB-CMIAPI/DiscordChat/logs/event.log
plugins/1MB-CMIAPI/DiscordChat/logs/community-first.log
plugins/1MB-CMIAPI/DiscordChat/logs/milestone-broadcast.log
plugins/1MB-CMIAPI/DiscordChat/logs/manual-awards.log
plugins/1MB-CMIAPI/DiscordChat/logs/archive.log
plugins/1MB-CMIAPI/DiscordChat/logs/tools.log
plugins/1MB-CMIAPI/DiscordChat/logs/fireworks.log
plugins/1MB-CMIAPI/DiscordChat/logs/collectible.log
plugins/1MB-CMIAPI/DiscordChat/escrow/<uuid>.yml
plugins/1MB-CMIAPI/DiscordChat/escrow/quarantine/<uuid>-<timestamp>.yml
plugins/1MB-CMIAPI/DiscordChat/exports/discordchat-<player>-<timestamp>.md
plugins/1MB-CMIAPI/DiscordChat/exports/discordchat-community-<days>d-<timestamp>.md
plugins/1MB-CMIAPI/DiscordChat/exports/discordchat-daily-archive-<mode>-<days>d-<timestamp>.md
```

The data files are intentionally local to this feature because they are engagement stats, not global identity data. Player profiles use fail-closed storage: every replacement is written to a same-directory temporary file, flushed, and atomically moved into place. Before an existing live profile is replaced, its validated contents become the last-known-good backup. A new profile receives both a live copy and an initial backup.

Every stored profile must be valid YAML and its `identity.uuid` must match the UUID in its filename. If the live copy is missing or unreadable but the backup validates, DiscordChat restores the backup automatically. An unreadable live copy is preserved in `players/quarantine/` before restoration. If neither copy is trustworthy, DiscordChat refuses that profile read or mutation, leaves the evidence untouched, reports the storage problem to staff, and tells an affected in-game command/GUI user that nothing was changed. `/discordchat admin reset <player|uuid> confirm` removes both the live profile and its backup; quarantined evidence is intentionally retained for staff review.

Reward transactions are stored under `rewards.transactions.<transaction-id>` in the player's profile. `rewards.active-transaction` points to the unresolved record, while `rewards.last-transaction` keeps terminal records easy to inspect. Valid statuses are `pending`, `delivered`, `finalized`, `failed`, and `refunded`. Successful reward timestamps are stored under `rewards.cooldowns.<reward-id>.last-success-at-millis`; global cooldown state is rebuilt from those atomically stored profile values during startup/reload. Do not edit these paths while the server is running; use the transaction status, retry, and refund commands instead.

Tool escrow uses the same fail-closed principle but is intentionally separate from profile backups. A valid active file is cleared only after the protected item is confirmed back in the player's inventory. Malformed or undecodable records are preserved in `escrow/quarantine/` for manual staff recovery; the plugin never deletes them as if no item existed.

## Automated Core Tests

Run the focused DiscordChat suite with:

```text
gradle :plugins:player-fun:discordchat:test
```

The 71-test suite covers quality metrics and every no-XP decision, repeat-window ordering, idempotent/consecutive/reset streak progression, floor EXP accrual and remainder conversion, reward transaction transitions and persisted ledgers, profile backup/quarantine/atomic-write behavior, reward command rendering and unsafe-placeholder rejection, cooldowns, immutable GUI reward bindings, fresh-install spending defaults, escrow save/load/clear/quarantine behavior, and every inventory recovery decision including rollback and the possible-duplicate alarm. Full Bukkit inventory sessions, real serialized `ItemStack` recovery, config reload races, and DiscordSRV callback concurrency remain test-server integration checks because they require a running Paper/DiscordSRV environment.

## Smoke Test

After installing the jar and restarting the test server:

```text
/discordchat reload
/discordchat admin check
/discordchat admin smoke
/discordchat link
```

Then link a test account through DiscordSRV, type once in `#server-chat`, type once in game so DiscordSRV bridges it to Discord, and run:

```text
/discordchat status
/discordchat pulse
/discordchat admin inspect <player>
/discordchat admin smoke
```

Expected result: `admin check` has no `FAIL` rows, and `admin smoke` shows DiscordSRV loaded/subscribed, the configured channel id, linked-account count, and the tracked counters increasing.

For reward confirmation/cooldown testing, grant a test account enough points, open `/discordchat rewards`, and click a reward once. Verify that no points move and the confirmation page shows the exact cost and post-purchase balance. Cancel once, reopen it, then confirm. For either booster, verify the reward becomes unavailable for one hour to a second account as well, remains unavailable after a restart, and starts no cooldown when a deliberately failed transaction is refunded.

For XP conversion testing, use `/discordchat admin award <player> xp <amount> <reason>` and inspect `/discordchat status`. Starting from zero, award `24` XP and verify `0` points with `24/25` progress. Award `1` more and verify `1` point with `0/25`. Award `62` and verify another `2` points with `12/25` remaining. Reaching a streak milestone should add its configured bonus independently without changing that remainder.

For escrow recovery testing, place one disposable item in the tools input slot and confirm `escrow/<uuid>.yml` exists. Close the GUI with inventory space and confirm the item returns and the file clears. Repeat with a full inventory and confirm the item remains in escrow. On the test server only, corrupt a disposable escrow file before login and confirm it moves to `escrow/quarantine/`, the original bytes remain available for staff, and no replacement item is granted automatically.

## Feature Decisions And Ideas

Implemented first:

1. Weekly/top-style data can now be exported through `/discordchat admin community [days]`.
2. Discord-origin and in-game-origin chat are tracked separately in status and data.
3. Event multipliers are controlled by `/discordchat admin event` and are visible in Boosters `/rate` only while active.
4. Friendly reminders are not shown on join by default; they can happen after unlinked in-game chat and respect `/discordchat optout`.
5. Monthly community stats export writes a Markdown report.
6. Active conversationalists can earn small extra XP after several meaningful messages in one day.
7. Low-effort messages, bot commands, repeats, link-only messages, and caps-heavy shouting are tracked but do not earn XP.
8. Scoreboard placeholders now include prefix, suffix, and event status fields.
9. First meaningful Discord-origin message bonuses are tracked per player for day, week, month, and year.
10. `/discordchat top` lists the top 10 players by points, streak, messages, words, or emotes.
11. Milestone history is shown in the milestone GUI once new milestones are hit.
12. `/discordchat debug economy` estimates reward pacing from the current config.
13. `/discordchat debug noxp` summarizes no-XP reasons for staff tuning.
14. First meaningful Discord-origin messages of the day/week/month/year can trigger one friendly in-game broadcast.
15. Conversation-cluster XP gives a small party-style bonus when several linked players chat meaningfully in the same window.
16. `/discordchat pulse` shows today's community activity, seven-day totals, top recent activity, and active XP boosts.
17. Configurable recurring bonus windows can boost future XP without manually starting an event.
18. Staff can run `/discordchat admin award` for audited helpful-reply recognition.
19. Major milestone broadcasts are configurable and respect `/discordchat celebrations` player privacy.
20. `/discordchat admin archive` can preview or prune old daily rows while preserving lifetime totals.

Deferred or intentionally avoided:

- Monthly reset seasons should not reset lifetime points or streaks by default. If added later, make it a cosmetic leaderboard season with separate `season.points` so players do not lose earned currency.
- Discord-side stat commands are intentionally not implemented; players should return in game to check `/discordchat`.
- AFK state is ignored for now. Chatting while AFK is neither punished nor rewarded extra.
- DiscordSRV link repair/import is intentionally not implemented yet; DiscordSRV remains the source of truth for link ownership.
- Staff outreach lists for unlinked players are intentionally avoided because the server has too many historical accounts for that to stay useful.

Needs more design before implementation:

1. Low-impact personal sound/visual effect permission reward. This should wait until another feature plugin exposes a safe, non-spammy cosmetic command or permission.

## Reward Ideas

Implemented configurable examples:

1. LuckPerms parent `1mb_discordchat` with `parent add`.
2. Repeatable `cmi kit discordchat_bundle`.
3. ProCosmetics particle permission unlock.
4. Toggleable `/discordchat prefix <preset>` and `/discordchat suffix <preset>` placeholders.
5. EmoteMenu chatting emote permission unlock. Suggested future emote command/permission: `/chatting <player>` guarded by `onembcmi.emotemenu.emote.chatting`.
6. Decorative player-head bundle through `discordchat_heads`.
7. Firework bundle through `discordchat_fireworks`.
8. Welcome points bundle through a configurable `/points` command.
9. mcMMO and Jobs `/rate` booster rewards.
10. MobHat Allay, Parrot, Bee, and Cat unlocks through LuckPerms, only when MobHat is installed and the mob is enabled.
11. JourneyMap-themed reward kit.
12. PassportDiscovery-themed reward kit.
13. Separate garden, food, and design head bundles.
14. DiscordChat-only collectible kit.
15. CMI money conversion bundle.
16. Vote tokens bundle through `discordchat_votetokens`.
17. Milestone title permission.

TODO reward ideas:

1. A one-time “community helper” visual-only permission after a long streak.
2. A low-impact personal sound or visual effect permission if another feature plugin exposes one safely.

## Safety Notes

- Help output remains player-friendly and does not print permission nodes.
- Technical metadata and permission lists live under `/discordchat debug`.
- DiscordSRV is a soft dependency. The plugin still loads without DiscordSRV, and `/discordchat admin smoke` explains what is missing.
- Reward commands are config-owned, console-dispatched, use sanitized player placeholders, and are preflighted before an atomic point reservation is written.
- Missing or disabled CMI kits and unavailable command roots are rejected before reservation. Rejected, exceptional, or interrupted dispatches remain in a durable failed transaction for deliberate staff retry/refund; they cannot disappear, double-charge, or auto-repeat uncertain commands, and all transitions are audited.
- Player profiles are identity-validated, atomically replaced, and backed up before replacement. A malformed live file is never treated as a blank account or overwritten; recovery requires a validated backup and preserves the malformed copy in quarantine.
- GUI actions are owner/session checked, click-throttled, and handled at high event priority. Stale menus close without running actions.
- The item tools GUI has one mutable input slot. The item is atomically saved to identity-validated disk escrow while present, returned on close/quit/kick/plugin disable, and kept for staff review if automatic recovery would risk a duplicate. Malformed records are quarantined rather than deleted.
- The plugin does not require a player to have Discord; players can opt out of invite reminders.
