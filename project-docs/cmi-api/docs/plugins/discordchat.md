# DiscordChat

DiscordChat is a player-fun feature plugin for turning the DiscordSRV `#server-chat` bridge into a gentle engagement loop. Linked players earn DiscordChat EXP from meaningful chat, emotes, and daily participation. Every complete `25` EXP converts into one spendable point by default, while streak milestones award separate bonus points. Points can be traded in game through `/discordchat rewards`.

The plugin records DiscordSRV events, stores local player progress, and runs configured reward commands after a player confirms a point trade in game. The Beta 2 preview also includes an optional private Discord `/discordchat` information reply. It does not moderate Discord or change DiscordSRV's chat routing or channel access.

DiscordChat's overview, rewards, confirmation, pulse, tools, milestone, Top and cosmetics GUIs use the standard 1MB light-blue frame. Every page keeps a player-stats head in the bottom-left, navigation/help controls in the bottom center, a **Back to Server Menu** shortcut immediately left of the bottom-right close barrier, and owner-bound session protections. The bottom-left player head opens that player's full status in chat.

## Player FAQ

### Can I check my points from Discord?

The Public Beta 2 local preview adds Discord `/discordchat`. Once staff enable it, use it in **#server-chat** for a reply visible only to you. It shows your linked Minecraft account, available points, XP toward your next point, current streak and next milestone, earning guidance, in-game menu commands, and the [DiscordChat guide](https://docs.1moreblock.com/player-guides/plugins/discordchat/).

You can check your saved progress while logged out of Minecraft, provided the Minecraft server and its DiscordSRV bot are running. If you are not linked, start with `/discord link` **in Minecraft**. A linked account without saved activity receives getting-started help. A temporary lookup failure does not display a made-up balance.

The command only shows your own information. It cannot spend points, claim rewards or upgrade items. Checking it earns no XP or points and does not extend the recent-Discord chat window. It is limited to #server-chat, including when extra channels earn chat XP. Minecraft menu permissions and claim rules still apply when spending points in game.

This command is implemented for local Beta 2 testing and is disabled by default. It has not been activated on the live Public Beta 1 bot.

### What chat counts toward DiscordChat progress?

Link your Minecraft and Discord accounts using `/discord link`. Meaningful messages through the configured server-chat bridge can count in either direction. Unlinked accounts do not earn these rewards. Public Beta 1 uses only `#server-chat`, at the same message XP rate in both directions.

Public Beta 2's additional channels and conditional in-game XP are being tested locally. They are configuration options for the next rollout, not a change to the live Beta 1 rules.

### What is being tested for Public Beta 2?

The local preview keeps Discord-to-Minecraft message XP at 100%. Linked in-game chat earns 80% while a meaningful linked Discord message in `#server-chat` is less than six minutes old, and 0% after that window expires. Chat still goes through when it earns no XP. One qualifying Discord participant opens the window for everyone linked in game; in-game messages cannot extend it.

Staff can also configure different XP percentages for extra Discord-only channels. Their messages stay on Discord and do not open the in-game earning window. Quality checks and daily message caps remain shared across channels. These rules are still in local testing; the live public beta continues using its existing single-channel rules.

### Why did a message give no XP?

Quality checks exclude spam, repeated messages, bot commands, low-effort lines, and link-only posts. Daily caps also apply. `/discordchat status` shows your progress; adding useful context matters more than sending many messages. In the Beta 2 preview it also explains when in-game XP is waiting for recent Discord chat.

### Do I need a milestone before XP becomes points?

No. Complete XP units convert automatically into spendable points, with the remainder carried forward. The default is 25 XP per point. Streak milestone points are a separate bonus.

### How does the one-day streak milestone work?

The Public Beta 2 local preview adds **1 Day Streak** before the seven-day milestone. Your first qualifying linked message completes it automatically and awards a one-time **25-point starter bonus**. You do not need to click or buy anything, and this bonus is separate from normal chat XP.

Existing players who have not completed day one earn it on their next qualifying message. Reloading the plugin, opening the menu, sending repeated or blocked chat, or restarting a streak does not award it again. Your completion and bonus remain in `/discordchat milestones` and `/discordchat history`. The next target skips milestones you have already completed, even after your streak resets.

The later milestones remain at **7, 30, 90, 100, 180, and 365 days**. Staff can configure the starter bonus. This feature is being tested locally for Beta 2; the live Public Beta 1 milestones still start at seven days.

### Where can I see the leaderboards?

In the Public Beta 2 local preview, open `/discordchat` and click **Top**. Choose **Points**, **Streak**, **Messages**, **Words**, or **Emotes** to see the top ten players. Points ranks current spendable balances; Streak ranks current activity streaks. Messages, Words, and Emotes use the same tracked totals as the existing chat command.

Use **Refresh** for updated results, **Back** to choose another leaderboard, or the **DiscordChat** compass to return to the main page. Browsing costs no points and can be done from any world or game mode with DiscordChat access. Empty rankings say **No rankings yet**.

`/discordchat top points` and the other metric commands remain available in chat. The menu uses the same ordering and player display names. The Top submenu is being tested locally for Beta 2; it has not been added to the live Public Beta 1 server yet.

### What is Community Pulse, and does it give rewards?

Community Pulse is an activity dashboard. Open `/discordchat pulse` to see the community's recorded activity. Clicking its cards or reaching a community message total does not award a kit, points, or a booster.

- **Today** and **Last 7 Days** show how many players have recorded activity, plus message, word, and emote totals.
- **7-Day Activity** lists the most active participants.
- **Current Boosts** shows DiscordChat XP multipliers already running through staff events or scheduled bonus periods. These increase future DiscordChat XP earnings; opening the screen does not activate them.

Your personal progress comes from qualifying linked chat, which earns XP and converts into spendable points at the configured rate (25 XP per point by default). Personal streak milestones award additional points automatically. To buy a kit, an unlock, or an available Jobs or mcMMO booster, spend points through `/discordchat rewards` and confirm the purchase. The Jobs and mcMMO rewards are separate from the DiscordChat XP boosts shown in Pulse.

### How do I spend points, and why might a reward be blocked?

Open `/discordchat rewards` and review the confirmation. Rewards can have point costs, one-time ownership, player or server-wide cooldowns, or an unavailable dependency. If a previous delivery needs review, give staff its reference.

### How do I preview or switch my chat prefix and suffix?

In the local Public Beta 2 preview, use `/discordchat prefix` or `/discordchat suffix`, or choose **Chat Cosmetics** from `/discordchat`. Both commands open a menu with prefixes on the left and suffixes on the right. Hover over your head at the top centre to see your current prefix, Minecraft name and suffix together. Each choice also previews how it would look, including choices you have not unlocked.

Click an unlocked choice to select it; click the selected choice again to turn it off. **Prefix Off** and **Suffix Off** independently clear each side. Switching is free and does not spend points or grant permissions. Locked choices explain the matching reward or why that position is unavailable. For example, buying Chatty as a suffix does not unlock Chatty as a prefix. Hidden, disabled unlock rewards still provide these explanations without appearing in the shop or becoming purchasable. The **Unlock Rewards** button opens the reward list, where purchases still require their usual confirmation.

Existing direct commands such as `/discordchat prefix discord`, `/discordchat suffix chatty` and `/discordchat suffix off` still work, and now show the selection in the menu. Tab suggestions include only presets you can currently select in that position, plus `off`; the menu lists the other possibilities. Larger lists use **Previous Choices** and **More Choices**.

The preview shows DiscordChat cosmetics around your Minecraft username. Other chat plugins may apply additional ranks, nicknames or colours. Staff can edit preset `.text` values, optional `.name` values, and `gui.cosmetics.*` translations. Reload closes old cosmetic menus; reopen to see the new text. Existing preset IDs, unlock permissions and saved selections are preserved. This GUI is being tested locally; the live Public Beta 1 commands still use chat output.

### Can I start a fishing or farming tournament with points?

The Public Beta 2 local preview adds two rewards in `/discordchat rewards`: **15m fishing tournament** for **150 points**, and **15m farming tournament** for **200 points**. Each starts a random tournament for everyone and has its own **one-hour server-wide cooldown**, matching the existing mcMMO and Jobs boosters. Review the purchase and confirm it to start the event.

Both tournaments last **15 minutes**. Fishing and farming keep their usual Pyro scoring and prizes. These rewards start an event; they do not give the buyer a kit or guarantee a prize. Staff can adjust the prices, cooldowns, and eligible tournament types.

Purchases pause while either tournament is running or a scheduled fishing or farming tournament is about to start within the next 15 minutes. An unavailable integration or unreadable tournament status also blocks the purchase. A blocked purchase spends no points. If a start cannot be verified after the command runs, staff review the saved transaction before another tournament purchase can proceed.

These rewards are being tested locally for Beta 2 and have not been enabled on the live Public Beta 1 server.

### Can I request a day of extra Discord EXP?

The Public Beta 2 local preview adds **Discord EXP day request** for **75 points**. Confirming it sends mrfloris an in-game CMI mail asking for a day of extra **MEE6 chat EXP on Discord**. Staff activate the day manually; buying this reward sends the request and does not immediately enable a boost. It does not award DiscordChat points or Minecraft XP.

There is a **24-hour server-wide cooldown**, so one player requests the day for the community. The price and cooldown are configurable. A missing or full staff mailbox blocks the purchase without spending points. If delivery is uncertain, staff review the request before another can be bought. This reward is being tested locally for Beta 2 and is not yet enabled on the live Public Beta 1 server.

### What does the Welcome points bundle give me?

The Beta 2 bundle exchanges **300 DiscordChat points for 100 Welcome points**, once per player. Welcome points are the separate balance used in the `/points` shop. DiscordChat checks the balance increase before confirming the reward. If the points service is unavailable, the purchase is blocked. An uncertain payout needs staff review before another purchase; report it with the transaction ID rather than buying again.

### Why does a reward say “Already unlocked”?

The Public Beta 2 local preview checks whether you already have all the permissions or group access offered by a one-time unlock, even if you received them before DiscordChat. If you do, the reward shows **Already unlocked** and cannot spend your points or start a cooldown.

For bundles with several unlocks, having only some of them does not block a purchase. For example, already having access to the MobHat menu does not prevent buying a new mob cosmetic. If your existing access expires or is removed, an unlock you have never claimed through DiscordChat can become available again. If your access cannot be checked, the purchase pauses without spending points.

This is a local Beta 2 preview; the live Public Beta 1 server has not changed.

### Where can I claim rewards or upgrade tools?

The Public Beta 2 local preview requires **Survival mode** in an allowed world for reward purchases and tool upgrades. The configured worlds are **wild, general, end, nether, acid, cave, chunkblock, skyblock, oneblock, and skygrid**. Builders, spawn, legacy, and every unlisted world are blocked. Creative, Adventure, and Spectator cannot claim, including staff and OPs.

You can browse the menus from any world. The **Where to Claim** compass lists the allowed worlds. A blocked purchase or upgrade spends no points. Moving worlds or changing game mode after opening a confirmation does not bypass the checks. You can still cancel, retrieve your deposited tool, or receive a staff refund from elsewhere. Chat XP and streak points are unaffected by these claim rules.

These restrictions are being tested locally for Beta 2; they have not been deployed to the live Public Beta 1 server yet.

### What does “Coming soon” mean on a reward?

The Public Beta 2 local preview lets staff show selected disabled rewards as **Coming soon**. These are possible future rewards, with no promised release date. You can read their description, but clicking cannot open a purchase or spend points. Other disabled rewards can remain hidden. An enabled reward with an unavailable dependency still has its separate **Unavailable** message.

### Will the menus be easier to read?

The Public Beta 2 local preview wraps long descriptions and help text into shorter lines. It also uses a darker inventory title colour, initially dark teal, with navy and charcoal available for comparison. These presentation changes are still being tested locally; the live Public Beta 1 menus have not changed.

### How do reward cooldowns work?

The reward menu shows each reward's cooldown and how long you have left to wait. A personal cooldown applies to your next purchase of that same reward; other players and other rewards have their own timers. A server-wide cooldown blocks that reward for everyone until it expires. The timer starts after a successful purchase, and clicking a reward that is still on cooldown spends no points.

### Do tool upgrades ask me to confirm?

Public Beta 1 on the live server applies an eligible upgrade and spends its displayed point cost on the first click. Read the upgrade and cost before clicking there.

The Public Beta 2 local test build adds a confirmation. In `/discordchat tools`, place exactly one tool or weapon in the yellow slot below the chest, then choose an upgrade on the right. You see the proposed item, enchantment level, and point cost before pressing **Confirm Upgrade**. **Cancel Upgrade** or **Back** returns to the choices without spending points. Closing returns your original item; if your inventory is full, it stays stored for recovery. The yellow pane is only a guide and cannot be collected.

Only confirming can apply the upgrade or spend points. Changed items, prices, settings, permissions, or an insufficient current balance invalidate the review. Leaving an allowed world or leaving Survival also blocks confirmation. A configuration reload requires a fresh review. This change is a local Beta 2 preview and has not been deployed to the public server yet.

If the item cannot receive the upgrade, the tool explains why and spends no points. An enchantment already at or above the offered level is kept: selecting Unbreaking IV for an Unbreaking V item will not lower it or charge you.

### How do I move an item into or out of the tool slot?

In the local Beta 2 preview, pick up exactly one item with a normal inventory click, then click the yellow marker below the chest. To return the deposited item to your inventory, click it with an empty cursor. Wait for that move to finish before clicking again. Shift-click, dragging across the menu, number keys, offhand swaps and creative copying are blocked.

Closing the menu returns the deposited item, including an upgrade you confirmed. If your inventory is full, the item stays stored: make space and reopen `/discordchat tools` or rejoin. If you die with an item deposited, it remains stored for recovery after respawning. A cancelled kick leaves the menu alone. If recovery finds a matching item in your inventory or on your cursor, staff must review the safety record before another copy can be returned. These transfer improvements are part of the local Beta 2 test build, not a change to the live Beta 1 server.

### Can I hide reminders or milestone announcements?

`/discordchat optout` toggles invite reminders. `/discordchat celebrations` separately controls public announcements of your own major milestones. Neither command is an account-unlink command.

### Can staff check DiscordChat from the console?

The Public Beta 2 local preview adds `discordchat debug status`. It shows the build, active or dormant state, integrations, DiscordSRV hook, chat-tracking settings, and reward/tool switches. It works even when DiscordChat gameplay is disabled. The same command works in game with a leading `/` for authorized staff.

Staff can add a player name or UUID, for example `discordchat debug status mrfloris`, to inspect an existing profile. This does not create profiles or change progress. An unknown player produces a clear message. Players can continue using `/discordchat status` for their own progress.

## Commands

The table below lists Minecraft commands. The optional **Discord-side** `/discordchat` is a separate private information command, available only in #server-chat when enabled.

| Command | Explanation | Example |
| --- | --- | --- |
| `/discordchat` | Opens the DiscordChat overview GUI with points, streak, tracked words/emotes, reminders, rewards, and milestones. | `/discordchat` |
| `/discordchat status [player\|uuid]` | Shows your detailed linked state, points, EXP progress, streak, and chat totals. Looking up another player shows a limited public status; self/staff-only diagnostics stay hidden. | `/discordchat status mrfloris` |
| `/discordchat top [points\|streak\|messages\|words\|emotes]` | Shows the top 10 DiscordChat profiles for a public metric. Rows use the CMI display name when available, show the Minecraft name and UUID on hover, and open that player's public status when clicked. | `/discordchat top streak` |
| `/discordchat pulse` | Opens the community pulse GUI with today's activity, seven-day totals, and active XP boosts. Console receives the same data as chat output. | `/discordchat pulse` |
| `/discordchat rewards` | Opens the point trade GUI. | `/discordchat rewards` |
| `/discordchat tools` | Opens the point-funded item tools GUI for Unbreaking IV, Fortune IV, and Looting IV. | `/discordchat tools` |
| `/discordchat milestones` | Shows the configured streak milestones and your next target. | `/discordchat milestones` |
| `/discordchat history` | Opens the milestone history GUI with hit dates and bonus point details where available. | `/discordchat history` |
| `/discordchat link` | Explains `/discord` and `/discord link` so players can join and link DiscordSRV. | `/discordchat link` |
| `/discordchat optout` | Toggles friendly Discord invite reminders for that player. | `/discordchat optout` |
| `/discordchat celebrations` | Toggles whether your own major DiscordChat milestone broadcasts can be announced publicly. | `/discordchat celebrations` |
| `/discordchat prefix [preset\|off]` | Opens cosmetic choices and previews; an optional argument selects an unlocked prefix or turns it off. | `/discordchat prefix` |
| `/discordchat suffix [preset\|off]` | Opens cosmetic choices and previews; an optional argument selects an unlocked suffix or turns it off. | `/discordchat suffix` |
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
| `/discordchat admin reload` | Reloads configuration, translations, reward definitions, and live runtime state. | `/discordchat admin reload` |
| `/discordchat admin grantpoints <player\|uuid> <amount> [reason]` | Adds spendable points with audit logging. | `/discordchat admin grantpoints mrfloris 100 event-prize` |
| `/discordchat admin takepoints <player\|uuid> <amount> [reason]` | Removes spendable points with audit logging. | `/discordchat admin takepoints mrfloris 50 correction` |
| `/discordchat admin transaction status <player\|uuid> [transaction-id]` | Shows the active or most recent persisted reward transaction, command progress, attempts, retry safety, and failure reason. | `/discordchat admin transaction status mrfloris` |
| `/discordchat admin transaction retry <player\|uuid> [confirm]` | Retries the active failed transaction from its persisted command progress without charging again. Use `confirm` only when delivery progress is marked uncertain. For any remaining delivery, the recipient must be online, alive, in Survival, and in an allowed world, including forced retries. | `/discordchat admin transaction retry mrfloris` |
| `/discordchat admin transaction refund <player\|uuid> confirm` | Returns the reserved points and one-time eligibility for the active pending, delivered, or failed transaction. A second refund is refused. | `/discordchat admin transaction refund mrfloris confirm` |
| `/discordchat admin transaction acknowledge <player\|uuid> <transaction-id> confirm` | Records a staff-verified Pyro tournament start or delivered EXP-day request and finalizes its purchase without replaying the command. Check the exact transaction's delivery first. | `/discordchat admin transaction acknowledge mrfloris <transaction-id> confirm` |
| `/discordchat admin reset <player\|uuid> confirm` | Deletes one player's live DiscordChat profile and last-known-good backup. | `/discordchat admin reset mrfloris confirm` |
| `/discordchat admin smoke` | Shows DiscordSRV hook state, target channel, linked account count, and tracking counters. | `/discordchat admin smoke` |
| `/discordchat reload` | Reloads config, milestone values, and reward definitions. | `/discordchat reload` |
| `/discordchat debug` | Shared debug page with runtime, build, Paper, Java, category, and docs metadata. | `/discordchat debug` |
| `/discordchat debug status [player\|uuid]` | Read-only staff overview while active or dormant; an optional target shows existing staff profile details. Console needs no leading slash. | `discordchat debug status mrfloris` |
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
- Optional Discord-only reward channels are observed separately. They must be explicitly configured and must not be mapped to a Minecraft channel in DiscordSRV. Observing them adds no chat forwarding and changes no Discord channel permissions.
- DiscordSRV Discord-to-game display-name rewriting is available as an optional diagnostic toggle, but is disabled by default. StaffMsg owns the linked display-name formatting for staff chat.
- Bot/webhook messages, unlinked Discord accounts, unconfigured channels, and command-like messages do not earn rewards. Staff can inspect tracking state using `/discordchat admin smoke`.
- Unlinked in-game players can receive a cooldown-protected reminder after normal in-game chat, but the plugin no longer prompts on join by default.

The plugin stores the latest known Minecraft name, Discord id, linked state, lifetime totals, daily totals, current streak, longest streak, milestone completions, the sub-threshold EXP remainder, spendable points, claimed one-time rewards, and the bounded reward transaction ledger.

### Public Beta 2 local preview

The first Beta 2 slice adds configurable message rates and a shared Discord activity window. The local test configuration uses:

| Source | Message XP rate | Opens or refreshes the in-game earning window? |
| --- | --- | --- |
| Meaningful linked Discord chat through `#server-chat` | 100% | Yes |
| Linked in-game chat, while that Discord activity is less than six minutes old | 80% | No |
| Linked in-game chat, after the window expires | 0% | No |
| Explicitly configured Discord-only channels | Per-channel percentage | No |

One qualifying Discord participant opens the window for all linked in-game participants. It does not require every in-game player to send a Discord message. In-game chat continues bridging when its XP rate is zero. Those messages remain visible in activity totals but cannot award XP through conversation bonuses, increment a streak, or trigger a milestone. Unlinked users, bots, webhooks, duplicate events, and messages rejected by the quality checks cannot open the window. A meaningful bridge message can still open it after that player's message XP cap is reached.

Channel/source percentages multiply ordinary message XP after the length/emote adjustments and before the existing event/bonus-window multipliers and message caps. XP rounds to one decimal. For example, a two-XP message gives `1.5` XP at 75%, `1.6` at 80%, and `3` at 150%, before any event boost. All channels and both directions share the same per-player daily message cap and point balance; a channel percentage does not raise the cap. The local configuration retains the 130 message-XP cap (5.2 points from message XP), plus separately capped or periodic bonuses.

For eligible messages, fixed conversation, first-Discord, streak, and milestone bonuses keep their configured values. Discord-only channels can contribute to a personal streak, conversation bonus, and first-Discord bonuses. They do not contribute to the public bridge's conversation-cluster bonus or its first-message broadcasts. Their text is omitted from the last-message preview; aggregate progress and configured milestone celebrations still apply.

Existing configs retain Beta 1 behavior: both source rates default to 100%, the recent-Discord requirement defaults off, and additional channels default off. Enabling these options requires the Beta 2 JAR; they are not available in the live Beta 1 build.

Example configuration for the Beta 2 build (merge these keys into the existing sections):

```yaml
xp:
  sources:
    discord-percent: 100
    game-percent: 80
    game-requires-recent-discord: true
    recent-discord-seconds: 360
discordsrv:
  reward-channels:
    enabled: true
    rates:
      # Replace this example ID with a Discord-only text channel the bot can read.
      '123456789012345678': 75
```

Quote channel IDs and use numeric percentages between 0 and 1000; `0` disables earning for that source. The window accepts 1–86400 seconds. Add/remove mapping entries or edit rates, then run `/discordchat reload` or `/discordchat admin reload`. Reload retains the original activity time and applies the new threshold without pretending that a new Discord message arrived. Restarting, disabling the feature, or changing its bridge channel starts with a closed window. Invalid XP rules stop message earning and show an error in `admin smoke` until corrected and reloaded.

Discord event IDs are saved alongside awards in a bounded 128-message history per player. Duplicate callbacks, including DiscordSRV attachment callbacks, are rejected before statistics, XP, or the activity window change. This recent history survives reload/restart; it is not a historical Discord backfill facility. Message storage runs on a bounded serial worker; player API access is captured on the server thread. No test or production message is posted to Discord by this feature.

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
- The first qualifying chat activity on a new Amsterdam calendar day increments the streak and adds `10` streak EXP.
- Milestones are `1`, `7`, `30`, `90`, `100`, `180`, and `365` days by default in Beta 2. All seven fit the first milestone row. Existing custom lists are preserved.
- Every XP award immediately converts complete units using floor conversion. At the default ratio, `24.9` EXP remains pending, `25` EXP becomes `1` point with `0` pending, and `62.7` EXP becomes `2` points with `12.7` pending.
- Day one gives a fixed one-time starter bonus of `25` points by default, independent of the player's balance. Each later milestone gives at least `25` points or `20%` of current points, whichever is higher. Milestone completion does not control ordinary XP conversion.
- Major milestones can broadcast a friendly in-game celebration. Players can use `/discordchat celebrations` to keep their own milestone announcements private.

The milestone display points to the first uncompleted configured target, retaining completed milestones after a streak reset:

```text
Streak: 0 days / 1
Streak: 1 day / 7
Streak: 6 days / 7
Streak: 8 days / 30
Streak: 83 days / 90
```

Offline Discord chat can still count as long as DiscordSRV can resolve the Discord user to a linked Minecraft UUID. That keeps the feature focused on Discord engagement while still requiring players to return in game to view stats and spend rewards. AFK state is not rewarded extra by default; if added later, it should be a small in-game presence bonus rather than an AFK bonus, so the system does not accidentally reward not playing.

Links and screenshots are handled conservatively: a link-only message earns no XP, but a link with useful context can pass the normal quality checks. Question marks and exclamation marks are not secret bonus triggers; the current model stays transparent and rewards the same quality rules everyone can understand.

With default values, a highly active linked player can earn roughly `70` to `81` EXP per day before weekly/monthly/yearly first-Discord bonuses and event multipliers. At `25` EXP per point, complete units convert immediately into about `2` to `3` points per active day, with the remainder carrying forward. Milestone bonus points are additional. That makes `100-180` point rewards cheap, `220-350` point rewards medium, and `500-650` point rewards expensive under default tuning.

## Default Rewards

The default reward set is configurable and intentionally server-owned. Selecting an enabled reward opens an owner-bound confirmation page showing its exact cost, repeatability, cooldown, current balance, and balance after purchase. Coming soon cards are informational only. Only the second purchase click can create a persisted reservation, so a rejected command does not silently consume points or one-time eligibility.

- Discord group: adds LuckPerms parent `1mb_discordchat` once for 250 points. The owner enabled and tested the live reward on 2026-09-09. Its live group grants the ProCosmetics Looking to Chat status, Parrot miniature, Wink emote, Speech Bubble banner, CMI personal time, and green/dark_green/dark_purple/dark_blue/aqua glow colours. These benefits are configured in LuckPerms; a fresh installation does not create these group permissions automatically.
- DiscordChat kit: runs `cmi kit discordchat_bundle {player} -s`.
- Particle bundle: grants the configured ProCosmetics particle permission.
- Prefix preset: unlocks `/discordchat prefix discord`.
- Suffix preset: unlocks `/discordchat suffix chatty`.
- Emote unlock: grants the configured EmoteMenu chatting emote permission.
- Player head bundle: runs `cmi kit discordchat_heads {player} -s`.
- Fireworks bundle: runs `cmi kit discordchat_fireworks {player} -s`.
- Welcome points bundle (Beta 2): spends 300 DiscordChat points once to receive 100 PyroWelcomesPro points for the `/points` shop. Delivery requires the exact points increase to be verified.
- 15m mcMMO booster: runs `rate start mcmmo 15m 4` for a server-wide 4x mcMMO booster. Its default cooldown is one hour, server-wide.
- 15m Jobs booster: runs `rate start jobs 15m 6` for a server-wide 6x Jobs booster. Its default cooldown is one hour, server-wide.
- 15m fishing tournament (Beta 2): starts a random PyroFishingPro tournament for 150 points, with a one-hour server-wide cooldown.
- 15m farming tournament (Beta 2): starts a random PyroFarming tournament for 200 points, with a separate one-hour server-wide cooldown.
- Discord EXP day request (Beta 2): mails mrfloris a request for a day of extra MEE6 chat EXP, for 75 points with a 24-hour server-wide cooldown. Staff activation is manual.
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
2. Open a second confirmation view only for an enabled reward. If the reward definition changes during a config reload, the old confirmation is rejected and the updated details must be reviewed again.
3. Render and validate every configured command before changing playerdata.
4. Recheck points, one-time ownership, active transactions, and player/global cooldown eligibility inside the synchronized reservation boundary.
5. Require every Bukkit command root to exist and every referenced `cmi kit <name>` kit to exist and be enabled.
6. Atomically create a `pending` transaction, reserve the point cost, and reserve one-time eligibility where applicable.
7. Recheck that the reward is enabled and listed, and that the recipient is online, alive, in Survival, and in an allowed world before each delivery command, including after the shared delivery guard. Dispatch each recorded command in order. After every accepted command, atomically persist the completed-command count.
8. Persist `delivered` only after every command is accepted, then persist `finalized` with the successful reward timestamp to close the reservation while retaining its history.
9. Persist a rejected or exceptional delivery as `failed`. The reservation remains held so staff can inspect the exact command progress and choose retry or refund. Failed and refunded delivery does not start a cooldown.
10. A staff retry returns the same record to `pending`, increments its attempt counter, resumes after the persisted command count, and never deducts the cost a second time. Welcome points credits with uncertain progress cannot be replayed, even with `confirm`; staff must verify delivery and acknowledge it, or verify non-delivery and refund.
11. A staff refund persists `refunded`, returns the original cost, and restores one-time eligibility exactly once.
12. On startup, fully recorded delivery is finalized automatically. Incomplete delivery becomes `failed`; uncertain retries require the explicit `confirm` argument. Legacy `rewards.pending` records from older builds are migrated and refunded using their previous behavior.

Every record keeps its resolved commands, original command templates, progress, attempts, timestamps, retry-safety flag, failure reason, and transition history. Terminal `finalized` and `refunded` records remain available for inspection; `rewards.transaction-history-limit` retains the newest records per player and never prunes an active transaction.

Eligibility is checked before the initial reservation and again after the shared manual-claim guard. A world/mode change between delivery commands pauses the transaction as `failed` at the recorded command count. Its existing reservation stays held for retry or refund; no cooldown starts. Console retries, including forced retries, must obey the recipient's current eligibility and leave an ineligible transaction unchanged. Once eligible, a retry resumes only the remaining commands without another charge. Fully recorded delivery can still finalize its accounting after a world/mode change or on restart, because that performs no new delivery. Refunds and returning an already-deposited tool remain available outside the claim rules.

Transaction events are also written to `logs/reward.log` with the transaction id, reward id, state, and relevant cost or command count. Arbitrary console-command effects cannot be reversed automatically after another plugin applies them. If command two fails after command one ran, staff can retry from command two or deliberately refund after reviewing the partial delivery. Keep multi-command rewards idempotent and validate them before enabling live spending.

The booster rewards depend on the 1MB Boosters feature plugin and its `/rate start` command. mcMMO and Jobs still need to be present and configured on the server for those boosts to do anything useful. These rewards are intentionally mid-tier because they benefit everyone online, not only the player who spends the DiscordChat points. Their one-hour `global` cooldown prevents a different player from immediately stacking the same server-wide reward and survives plugin/server restarts.

MobHat, JourneyMap, and PassportDiscovery rewards are dependency-aware. If the required feature plugin is missing or the configured MobHat mob is not enabled, the reward shows as unavailable and the server refuses the trade instead of spending points.

Item tools use an identity-bound escrow file while the GUI is open. Escrow replacements are flushed and atomically moved into place, and each payload must decode to exactly one item for the UUID in its filename. The item is returned on close, quit, an uncancelled kick, plugin disable, join, or when `/discordchat tools` opens again. Death retains the saved item instead of inserting it into an inventory whose drops may already have been collected. If a matching item is already present in storage, armor, offhand or cursor during restore, the plugin keeps the escrow file and asks for staff review instead of risking a duplicate. Invalid YAML, a mismatched UUID, a missing item, or an undecodable item is moved to `escrow/quarantine/` and reported instead of being treated as an empty record. If a returned item's escrow cannot be cleared, only the exact destination slot is rolled back to its previous contents; unrelated identical items are never removed. A changed destination fails closed for staff review. Full storage never uses armor/offhand slots or drops the tool. Returning a tool also leaves enough storage capacity for Paper to put away anything on the cursor when closing the view; otherwise the tool stays in escrow.

In the Beta 2 tool menu, a yellow pane marks empty input slot 20 beneath the instruction chest. The owner-bound holder keeps the deposited item separately from decoration and preview copies. Eligible upgrades open an in-place review with the exact original and proposed items, definition, cost, and configuration generation. Confirmation is consumed once and revalidated before the existing upgrade/point-persistence path runs. Cancel/back retain the deposited item; closing returns only that item, never a preview or marker. An unresolved recovery record blocks another deposit, and delayed join/startup recovery does not return an item still owned by an open tool session.

The DiscordChat GUIs use owner-bound session ids. Reward slots carry an immutable slot-to-id snapshot, and the confirmation holder carries the exact reward definition the player reviewed. Old menus, wrong-owner menus, stale/changed confirmations, top-inventory drags, shift-clicks, number-key swaps, offhand swaps, creative packets, and unsupported click actions are cancelled before any reward or tool logic runs. Ordinary left/right pickup, placement and cursor swaps in the player's own inventory are allowed only while the tools menu is open and no transfer is pending; another plugin's cancellation is preserved.

Tool-slot clicks are cancelled immediately and applied on the next server tick. A single pending transfer binds the original owner/session, inventory view, input, cursor, displayed slot, confirmation and configuration generation. All are revalidated, together with online/alive status and current deposit eligibility, before moving anything. Intervening cursor changes, reloads, close/quit, another view, or a repeated callback cannot transfer a different item. Clicks, drags and upgrade actions wait while the transfer is queued. Plugin disable returns the owned item and closes DiscordChat views before their marker and preview copies lose listener protection.

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

`debug status` requires `onembcmi.discordchat.admin.debug`. Supplying a target additionally requires `onembcmi.discordchat.admin.inspect`, even for staff checking themselves. Both permissions are checked again before an asynchronous result is shown. Shared diagnostics such as `debug`, `debug health`, and `debug reload` retain the general admin permission. Target completion only suggests online players after both checks; saved offline names and UUIDs can be entered manually.

Default cosmetic unlock examples:

```text
onembcmi.discordchat.cosmetic.prefix.discord
onembcmi.discordchat.cosmetic.suffix.chatty
```

## Placeholders

```text
%onembcmi_discordchat.points%
%onembcmi_discordchat.pending_exp%
%onembcmi_discordchat.streak%
%onembcmi_discordchat.longest_streak%
%onembcmi_discordchat.next_milestone%
%onembcmi_discordchat.milestones_completed%
%onembcmi_discordchat.words%
%onembcmi_discordchat.emotes%
%onembcmi_discordchat.messages%
%onembcmi_discordchat.linked%
%onembcmi_discordchat.opted_out%
%onembcmi_discordchat.prefix%
%onembcmi_discordchat.suffix%
%onembcmi_discordchat.event_active%
%onembcmi_discordchat.event_multiplier%
%onembcmi_discordchat.event_timeleft%
```

Example checks:

```text
papi parse mrfloris %onembcmi_discordchat.points%
papi parse mrfloris %onembcmi_discordchat.streak%
papi parse mrfloris %onembcmi_discordchat.next_milestone%
```

## Config

The dot in `%onembcmi_discordchat.prefix%` and `%onembcmi_discordchat.suffix%` separates the feature from its placeholder path. Older documentation used an underscore there, which produced blank output in Public Beta 1. The local Beta 2 preview supports those sixteen older names as compatibility aliases; use the dot-separated examples above for new configuration.

The config is written to:

```text
plugins/1MB-CMIAPI/DiscordChat/config.yml
```

Important paths:

```text
claims.allowed-worlds
discordsrv.channel-id
discordsrv.game-channel-name
discordsrv.count-discord-to-game
discordsrv.count-game-to-discord
discordsrv.reward-channels.enabled
discordsrv.reward-channels.rates
gui.filler-material
gui.title-color
gui.lore-width
calendar.zone-id
invite-prompts.enabled
invite-prompts.on-join-enabled
invite-prompts.after-game-chat-enabled
invite-prompts.cooldown-hours
xp.short-message-base
xp.sources.discord-percent
xp.sources.game-percent
xp.sources.game-requires-recent-discord
xp.sources.recent-discord-seconds
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
milestones.first-day-bonus-points
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
rewards.definitions.<id>.show-when-disabled
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

### Beta 2 Discord information command

`discord-command.enabled` defaults to `false`. After configuring a **separate test bot/application** and completing its Discord setup, enable this setting in `plugins/1MB-CMIAPI/DiscordChat/config.yml`, then run `/discordchat reload` or `/discordchat admin reload`. Console omits the leading slash. No restart is needed to change the switch or reply text once this build is installed.

The command's guild is derived from the configured `discordsrv.channel-id` text channel, which is #server-chat. The handler requires that exact channel; DMs, other guilds, other channels and threads are rejected privately before any account/profile read. Discord's application authorization and **Use Application Commands** permissions still apply. Staff may also restrict the command picker through Discord's integration permissions. Reading one's own saved information does not require being online or holding a Minecraft menu permission; it grants no Minecraft access.

Edit the `discord-command.*` keys in `plugins/1MB-CMIAPI/CMIAPILIB/translations/discordchat.yml` to customize the reply. Reload snapshots the configured earning rates, ratio, daily cap, calendar and milestones along with the text. `/discordchat debug status` reports whether the integration is disabled, waiting, ready or unavailable. An unavailable DiscordSRV/link service or unreadable profile gives a temporary error, not a zero balance or an unlinked result.

The optional DiscordSRV adapter registers one guild command without parameters. It defers privately before doing background work, permits one request per Discord account every five seconds, and uses a 32-request queue and eight-second response deadline. Authoritative link lookup is repeated before a delayed response; reload/disable cancels pending replies. No profile is created, repaired or updated by this command. Its work is separate from chat accounting and cannot refresh the recent-Discord activity window.

Registration checks same-application global/guild name collisions and records its owned bot/guild/command IDs in `DiscordChat/discord-command-registration.txt`. Keep this file with this installation. An unowned `/discordchat` entry or a record from another bot blocks registration for staff review. Startup, DiscordReadyEvent, enable/disable and reload are handled; text-only reloads do not re-register. Removal deletes only the recorded command ID. A disconnected/stopped bot may leave a stale command until a later connected reload can remove it.

DiscordSRV 1.30.5 bulk-replaces guild commands in `updateSlashCommands()`. This adapter cancels all such writes during its own routing refresh and then upserts only its own command. Other guilds and same-application commands installed outside the provider mechanism are preserved. The exact 1.30.5/JDA empty-batch exception after every update is cancelled is narrowly handled and tested through the real API router. This compatibility path should be reviewed when changing DiscordSRV versions.

Real Discord acceptance remains part of the Beta 2 pre-live checklist: use the separate test bot/private guild, verify guild registration and coexistence, #server-chat-only access, private linked/unlinked/offline replies, reload/removal/reconnect, and byte-identical profiles/XP counters. Never activate copied live bot credentials on the test server. The maintained server currently has DiscordSRV compile support only, so local startup does not prove gateway delivery.

### Beta 2 Top submenu

The index **Top** button opens five choices; results show up to ten positive entries, descending by value, with case-insensitive Minecraft-name tie ordering and UUID as the final stable tie-breaker. Both menus and `/discordchat top` use the same ranking function and CMI/online display-name rendering. Points is the current balance, not lifetime earnings, and Streak is the stored current streak. The menu exposes only public ranking values and Minecraft names; it does not expose Discord IDs, linking details, or private diagnostics. No new permission is required beyond `onembcmi.discordchat.use`; claim-world and Survival restrictions do not apply to browsing.

Profile reads run on a dedicated single worker with a bounded 16-request queue, separate from chat XP accounting. Results return to the server thread for name resolution and inventory rendering. Browsing does not save, create, or repair profiles. A failed profile read produces an unavailable state rather than silently publishing a partial ranking. Closing, changing menus, quitting, kicking, losing permission, disabling the feature, or reloading while a request is pending prevents stale results from being applied. Menu transitions run on the next tick after cancelled inventory events, following the [Paper 26.2 inventory event contract](https://jd.papermc.io/paper/26.2/org/bukkit/event/inventory/InventoryClickEvent.html).

The shared language file now includes `gui.titles.top`, `gui.titles.top_results`, and `gui.top.*` for choices, descriptions, row values, loading, empty, error, refresh, and navigation wording. These use the existing title colour and lore width settings. Reload with either DiscordChat reload alias, then reopen the menu to review language changes. The Top button occupies index slot 40; the staff smoke shortcut moves to slot 42.

### Beta 2 one-day milestone

```yaml
milestones:
  days: ['1', '7', '30', '90', '100', '180', '365']
  first-day-bonus-points: 25
  flat-bonus-points: 25
  bonus-percent-of-current-points: 20
```

Day one uses only `first-day-bonus-points`; the flat/percentage formula applies to later milestones. Zero records day-one completion without granting points, and negative starter values are treated as zero. The normal broadcast defaults still start at 30 days, so day one does not add a milestone-wide public announcement. Existing first-Discord-day broadcasts are separate.

Fresh defaults and the empty/invalid-list fallback include day one. Explicit existing lists are preserved; add `'1'` to an older `milestones.days` list to opt in, then run `/discordchat reload` or `/discordchat admin reload`. The local Beta 2 test configuration already includes it. Day one is checked on qualifying linked activity, including a returning player's next qualifying message on a day already recorded as active. Later milestones retain their new-active-day trigger. Zero-rate in-game activity, unlinked messages and failed quality checks cannot earn the starter bonus; a daily message XP cap does not block otherwise qualifying streak participation.

No history is reset or fabricated during reload or upgrade. The award, lifetime counters, completion key `1`, and timestamp/bonus/points-after history are saved in the same atomic profile replacement. Notices and audit entries follow a successful save. Saved completion prevents repeat awards after subsequent messages, restart, streak reset, or removing/re-adding day one in the configuration. The existing reward-shop `milestone_title` item is unrelated.

### Beta 2 menu presentation

After installing the Beta 2 JAR, these settings and translations can be changed with `/discordchat reload` or `/discordchat admin reload`. Close and reopen a menu to see the refreshed text. A JAR upgrade itself still needs a clean server restart.

```yaml
gui:
  title-color: '#00616d'
  lore-width: 46
rewards:
  definitions:
    prefix_discord:
      enabled: false
      show-when-disabled: true
```

Merge those keys into the existing sections. `gui.title-color` is a quoted six-digit hex colour used consistently for all eight inventory titles. Dark teal `#00616d` is the initial preview; navy `#203b65` and charcoal `#303030` are alternatives. Invalid values fall back to dark teal. This setting does not recolour chat or menu item headings.

`gui.lore-width` accepts 20–80 code points, defaulting to 46 for invalid values. Generated menu lore wraps at word boundaries and preserves colours, styles, Unicode graphemes, blank lines, and explicit line breaks. Long unbroken words wrap between graphemes; a single oversized grapheme or nonliteral component stays intact. This is a text-width guide, not an exact pixel measurement. Deposited tools, upgrade item previews, and delivered kit items retain their original lore and metadata.

Reward descriptions remain scalar `rewards.definitions.<id>.description` values. A YAML literal block (`|`) can supply manual lines. Plain text, MiniMessage, and legacy colour codes are supported; use one formatting style per value. New installations receive player-friendly descriptions. Existing descriptions, reward costs, enabled flags, and cooldowns are preserved.

The shared language file is `plugins/1MB-CMIAPI/CMIAPILIB/translations/discordchat.yml`. `gui.titles.*` contains plain inventory title text; `gui.top.*` contains leaderboard wording; `gui.reward.*` contains reward menu labels, purchase controls, balance/cooldown text, blocked-purchase messages, and Coming soon wording. Keep each template's existing placeholders, such as `{cost}`, `{points}`, `{reason}`, and `{reward}`. For example:

```yaml
gui:
  reward:
    cost: 'Cost: {cost} points'
    coming-soon: 'Coming soon'
    coming-soon-help: 'A possible future reward. You cannot buy it yet.'
```

`show-when-disabled` defaults to `false` for each reward. An enabled reward appears normally; a disabled reward is hidden unless this flag is true. Coming soon cards show their name, description, and future-availability message without prices, cooldowns, ownership status, dependency errors, or purchase controls. The authoritative `rewards.ids` list still controls membership and order. MobHat rewards can remain hidden independently.

Disabled or removed rewards are checked again at purchase, confirmation, each remaining delivery command, and console retry, including forced retries. A partially delivered transaction keeps its recorded progress and reserved points for staff retry after re-enabling, or refund. Already fully recorded delivery can still finish its accounting; no completed command is replayed just because the reward was disabled.

### Claim restrictions

Beta 2 adds `claims.allowed-worlds`, defaulting to an empty list that pauses reward purchases and tool upgrades until staff configure it. Survival mode is always required and there is no staff/OP bypass. The allowlist matches exact Paper world keys (`World.getKey()`), not display aliases, legacy Bukkit names, or world environments. For the reviewed 1MB world IDs, use:

```yaml
claims:
  allowed-worlds:
  - minecraft:wild
  - minecraft:general
  - minecraft:end
  - minecraft:nether
  - minecraft:acid
  - minecraft:cave
  - minecraft:chunkblock
  - minecraft:skyblock
  - minecraft:oneblock
  - minecraft:skygrid
```

An empty or malformed list blocks all claims; wildcards and bare aliases are invalid. Unloaded or unknown keys grant no access. In this setup `spawn` is an alias for `minecraft:overworld`, which is excluded. Default `minecraft:the_end` and `minecraft:the_nether` are not substitutes for the configured `minecraft:end` and `minecraft:nether`. Edit the list and run `/discordchat reload` or `/discordchat admin reload`; no restart is needed for configuration changes after installing the Beta 2 JAR. An upgrade from Beta 1 requires this allowlist to be configured even when rewards/tools were already enabled.

Every built-in reward has `cooldown-seconds` and `cooldown-scope`. A value of `0` disables its cooldown. Scope `player` tracks the last successful purchase for that player; scope `global` uses the newest successful timestamp across all profiles and blocks that reward for everyone until expiry. The built-in mcMMO and Jobs boosters default to `3600` seconds with `global` scope. Cooldowns begin only when delivery finalizes, not when the confirmation GUI opens or a transaction is reserved.

`points.exp-per-point` defaults to `25`. Every XP credit uses floor conversion immediately, and `xp.pending` therefore contains only the remainder below the configured ratio. Existing profiles are converted atomically during startup and reload, so previously stranded balances are preserved as points plus their exact one-decimal remainder. Converted points accumulate under `points.lifetime-from-exp`; streak bonuses accumulate separately under `points.lifetime-milestone-bonus`. The obsolete `milestones.convert-exp-on-hit` setting is removed automatically from upgraded configuration files.

## Already-Owned Unlocks (Public Beta 2 Local Preview)

One-time permission/group rewards check LuckPerms before charging, including grants that predate DiscordChat. A matching reward shows **Already unlocked** and cannot be purchased when all its permission/group benefits are already available. Ownership is checked while rendering the review, on purchase, and again immediately before reserving points. An ownership lookup failure blocks the purchase with a retry message. Blocked purchases do not spend points, dispatch delivery commands, record a claim, or start a cooldown.

The automatic check recognizes complete one-time bundles of permanent, unconditional `lp user <buyer-uuid> permission set <node> [true]` and `lp user <buyer-uuid> parent add <group>` commands. All Paper LuckPerms aliases (`lp`, `luckperms`, `perm`, `perms`, `permission`, `permissions`), their `luckperms:` namespaced roots, player-name/UUID placeholders, and the bundled `cmi msg <buyer> ...` success notification are supported. All ten built-in LuckPerms unlock definitions are covered, including the multi-permission MobHat rewards. Every grant in a bundle must already be available; having only the shared MobHat access permissions does not block buying a missing mob unlock. A partially owned bundle retains its configured full price.

Permission checks use loaded LuckPerms data in the player's current context, including effective inherited and wildcard grants. Group checks use actual direct/indirect inheritance, not an arbitrary `group.<name>` permission. OP/platform-default access alone is not proof of a LuckPerms grant. Active temporary or contextual access can make an unlock unavailable while it applies; expiration, revocation or a context change can make it purchasable again. No external ownership result is written into DiscordChat's permanent claim history. A reward already claimed through DiscordChat remains one-time even if its permission is later removed.

Repeatable rewards, mixed kit/money/other-command bundles, grants to someone other than the buyer, removals/negative grants, and temporary/contextual delivery commands do not have automatic ownership inference. Custom command effects require a separate benefit model; an owned permission must not hide other benefits in the same reward. Existing transaction retry/refund remains available after a partial grant without another charge. The check adds no user-loading, permission mutation, network or database work to the purchase path; unavailable loaded data fails closed. Its player messages are reloadable `gui.reward.owned`, `gui.reward.blocked-owned` and `gui.reward.blocked-ownership-unavailable` language entries.

This behavior is implemented for local Public Beta 2 testing. It has not been deployed to the live Public Beta 1 server.

### LuckPerms recipient identity

LuckPerms user rewards use the actual server UUID. Built-in templates use `{uuid}`; existing `lp user {player}` templates are normalized before points are reserved. Java and Floodgate/Bedrock buyers use `Player#getUniqueId()`. Permission changes, temporary grants, parents, promotions/demotions and metadata all follow the same rule; clone commands pin both user operands. Group IDs and other providers' player-name arguments remain unchanged.

Fixed real-name recipients use the shared resolver's exact, case-insensitive Paper/CMI cache lookup. A leading Bedrock `.` is preserved. Missing, conflicting or ambiguous matches stop preflight without charging. No Mojang lookup, generated name UUID, nickname substitution or name-based LuckPerms fallback is used. Recognized LuckPerms recipient tokens include `{uuid}`, `%uuid%`, `%player_uuid%`, `%cmi_user_uuid%` and `%cmi_user_uuid_<real-name>%`; DiscordChat resolves these locally rather than asking PlaceholderAPI or LuckPerms to expand them. Unknown or malformed recipient placeholders are rejected.

The reservation saves pinned LuckPerms commands and retry templates, plus the owning profile UUID. Retries retain those recipients after renames and skip already-delivered steps. Legacy buyer-name commands can be migrated using the original transaction name and profile UUID; a legacy third-party name with no recorded UUID needs staff review rather than a fresh name lookup. Conflicting saved UUIDs block retry. Transaction administration accepts an exact, unambiguous current account name or full server UUID; historical names cannot select a transaction. The final dispatch boundary rejects any LuckPerms user command whose recipient is still a name or unresolved token.

## Tournament Rewards (Public Beta 2 Local Preview)

The local preview adds `fishing_tournament_15m` and `farming_tournament_15m`. Both are repeatable 15-minute events, using the existing reward review and confirmation. Defaults match the booster pricing: fishing costs 150 points, farming costs 200 points, and each has its own `3600`-second `global` cooldown. There is no additional minimum-player requirement. Pyro controls tournament objectives, scoring and prizes.

These integrations use the installed provider's namespaced console commands and PlaceholderAPI status, without a direct dependency on Pyro internals. The command templates are:

```yaml
# Under rewards.definitions.fishing_tournament_15m:
commands:
  - pyrofishingpro:fisht start RANDOM 900
# Under rewards.definitions.farming_tournament_15m:
commands:
  - pyrofarming:farmt start RANDOM 900
```

Provider checks were verified with PyroFishingPro reporting version `4.9.31` (distributed here as `PyroFishingPro-4.9.32.jar`), PyroFarming `1.3.2`, PyroLib `1.4.9` and PlaceholderAPI `2.12.3` on Paper 26.2. Recheck advertised types, status/countdown placeholders and actual starts when updating either provider.

`RANDOM` is a DiscordChat template marker. Before reserving points, DiscordChat picks one concrete type from the installed command's advertised tournament types and saves that exact command in the transaction. A retry uses the saved choice. The marker is never sent directly to Pyro. To restrict the pool, set `rewards.tournaments.fishing-types` or `rewards.tournaments.farming-types` to a list of advertised type IDs. An empty list allows every advertised concrete type. No eligible types blocks the purchase. Tournament rewards must contain exactly one supported 900-second start command, be repeatable, and have a valid global cooldown of at least 900 seconds.

Before charging and immediately before starting, DiscordChat checks both installed providers. Neither may already have a tournament running, and the next scheduled tournament must be more than 15 minutes plus a five-second margin away. The checks use `%pyrofishingpro_istournament%`, `%pyrofishingpro_timetilltournament%` and the corresponding `pyrofarming` placeholders. Unavailable providers or placeholders and unrecognized countdown formats block purchases. The installed English `d`, `h`, `m`, `s` countdown formats are supported. The reward does not pause or edit Pyro's schedule.

Command acceptance alone is insufficient: the provider must change from inactive before dispatch to active afterwards. A known rejection before dispatch returns the reserved points automatically without starting a cooldown. An uncertain start holds the transaction for staff review and blocks new tournament purchases across both providers, including after reload/restart. After inspecting the exact transaction and Pyro evidence, staff can:

- Record a verified start with `/discordchat admin transaction acknowledge <player|uuid> <transaction-id> confirm`. This finalizes accounting without running a tournament command again.
- Retry with `/discordchat admin transaction retry <player|uuid> confirm` only after verifying that the previous attempt did not start. The saved type is reused and points are not charged again.
- Refund with `/discordchat admin transaction refund <player|uuid> confirm` after reviewing the outcome. This does not undo any tournament that already ran.

Existing installations retain their authoritative `rewards.ids` list. Add the two new IDs to that list and reload when ready to expose them; new definitions do not silently expand an existing catalog. `/discordchat admin check` includes tournament readiness. These entries are prepared on the local 26.2 test server; this does not enable them on Public Beta 1 live servers.

## MEE6 EXP-day request (Public Beta 2 local preview)

Reward ID `discord_exp_day_request` uses the existing review/confirmation and transaction ledger. Defaults are `cost: 75`, `once: false`, `cooldown-seconds: 86400`, and `cooldown-scope: global`. It must have exactly one fixed-recipient `cmi mail send` command, be repeatable, and have a positive global cooldown. The default command template is:

```yaml
commands:
  - cmi mail send mrfloris Please turn on discord-chat-exp for a day (extra MEE6 chat EXP). Requested by {player}.
```

The template may name a known CMI recipient or specify their UUID. Before reserving points, DiscordChat resolves an exact, unambiguous CMI account and saves **its UUID** as the command recipient. The dispatched console command is `cmi mail send <staff-uuid> <message>`, including for `.Bedrock` accounts. The purchaser's name appears only in the message body. A unique `[DCEXP:<transaction-uuid>]` receipt is appended automatically; do not add it to the template. The prepared command must fit the 240-character limit. Offline recipients are supported when their CMI account is already loaded.

Before dispatch, DiscordChat checks the recipient mailbox and available capacity. After dispatch, it checks for the exact message and console sender in CMI's mailbox; a command returning success is not enough. CMI owns mail persistence, expiry and removal. Its save is queued independently of DiscordChat's atomic transaction save, so this is not a cross-plugin atomic database commit.

A known block before dispatch refunds the reservation without starting a cooldown. An uncertain delivery keeps the transaction for staff review and blocks further EXP-day requests server-wide, including after reload/restart. Staff should inspect the saved recipient UUID and full request ID before recovery:

- If the exact console mail remains in the mailbox, a confirmed transaction retry records delivery without sending it again. The saved UUID, message and request ID are reused.
- If staff already read/removed the mail but verified its delivery, use `/discordchat admin transaction acknowledge <buyer|uuid> <transaction-id> confirm` to finish accounting without another message.
- Only retry a missing receipt after checking that the mail was not delivered, read, expired or removed. A refund returns points but does not retract mail or turn off an EXP day.

CMI 9.8.9.10 console mail syntax and UUID recipient handling were checked for this integration. Use an existing staff account that has played on the server; CMI may skip saving mail for an offline account with zero playtime. Activation remains a separate staff action; DiscordChat does not enable MEE6 boosts or grant roles. Existing installations must add `discord_exp_day_request` to `rewards.ids` before reloading to show it. `/discordchat admin check` includes its mailbox readiness.

## Welcome points (Public Beta 2 local preview)

The default one-time exchange is **300 DiscordChat points → 100 PyroWelcomesPro points**. With the intended player online, check the current balance before and after the native console credit:

```text
papi parse <exact-player-name> %PyroWelcomesPro_points%
welcomes add <exact-player-name> 100
papi parse <exact-player-name> %PyroWelcomesPro_points%
```

PyroWelcomesPro 0.5.1's `welcomes balance <name>` reads the saved player file, even when that player is online. It can show an older balance until Pyro saves. The player's own `/welcomes balance` (without a target name) and `%PyroWelcomesPro_points%` read the current online balance. Use PAPI to verify an online credit; a stale targeted balance is not evidence of failed delivery and must not trigger another credit. The owner confirmed a live Java-player purchase on 2026-09-09: 33 → 133 in PAPI and the player's `/points balance`, while targeted console balance still showed 33.

`give` is not the native subcommand. This version does not register `set` or `remove`, and rejects UUID command arguments. Its `add` command accepts signed integers, but reward configuration permits only positive amounts and checks for integer overflow. Do not use a negative credit as an automatic rollback after uncertain delivery.

The reward dispatches the namespaced `pyrowelcomespro:welcomes add {player} 100` command. It resolves the online buyer by the authoritative server UUID and verifies the exact name still belongs to that player immediately before dispatch. This preserves the leading dot for Floodgate names. PyroLib 1.4.9 limits the name argument to 16 characters; unsupported longer names are blocked before charging. No offline name lookup, external identity service or generated UUID is used by the reward.

PyroWelcomesPro, PyroLib, PlaceholderAPI and `%PyroWelcomesPro_points%` must be available. The placeholder is read from the online player's loaded provider balance on the server thread, never from potentially stale player files. Missing, unresolved, malformed or overflowing balances block the purchase. After dispatch, only an exact increase by the configured amount confirms delivery. Console acceptance and translated success messages are insufficient. The verified before/after values and player UUID are retained in transaction history and the reward audit log.

Existing `welcome_points` templates using `points give {player} <amount>` or `%player%` are normalized in memory when loaded; costs, amounts, visibility and enabled flags are preserved. Other reward commands are unaffected. Existing finalized records are never automatically repaid. New claims still use the normal confirmation, Survival/world checks and one-time reservation.

An unavailable provider before dispatch refunds the reservation. An uncertain credit remains for staff review and cannot be replayed by `transaction retry`, including after a restart. Already-recorded progress can finalize without another command. After independently verifying a missing-progress payout, staff may use `/discordchat admin transaction acknowledge <uuid> <transaction-id> confirm`. Refund only after establishing that no payout occurred; a refund cannot remove Pyro points.

Pyro owns its points persistence. Online balance verification is not a cross-plugin atomic commit: a hard process crash can interrupt Pyro's own save cycle. A clean shutdown/restart and ordinary player acceptance must be checked before rollout. Keep the reward disabled while testing an unverified Pyro version or unresolved payout.

## Reward Readiness

Run these commands after editing rewards or changing server plugins, kits, permissions, or commands:

```text
/discordchat reload
/discordchat admin check
```

The report is read-only and uses the running server state. It checks claim-rule validity and which allowed world IDs are currently loaded, the authoritative `rewards.ids` list, enabled/unused definitions, available GUI capacity, required plugins and MobHat choices, every referenced CMI kit, reward command templates and Bukkit command roots, LuckPerms permission/group targets, positive point costs, GUI materials, valid cooldown values/scopes, persistent global cooldown history, and whether `/rate start` rewards use a global cooldown of at least 15 minutes. No loaded allowed world produces a warning because nobody can claim there; an empty/invalid list produces a failure.

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

`debug status <player|uuid>` reads existing profiles on a bounded background task and returns output on the server thread. It never initializes storage, creates profiles, repairs backups, quarantines files, or updates names/points. A corrupt or missing primary with a retained backup is reported as unavailable for staff review. Reloads, lifecycle changes, lost permissions, and disconnected callers invalidate pending results.

## Automated Core Tests

Run the focused DiscordChat suite with:

```text
gradle :plugins:player-fun:discordchat:test
```

The suite covers quality metrics and no-XP decisions, repeat-window ordering, streak progression, floor EXP conversion, reward transaction ledgers, profile backup/quarantine/atomic writes, command validation, cooldowns, GUI reward bindings, fresh-install spending defaults, and escrow recovery. Beta 2 adds exact window expiry, reloadable channel rates and snowflake precision, zero-rate bonus/streak rejection, real profile accounting across source rates and shared caps, event stacking and point conversion, duplicate concurrent callbacks, failed saves, unlinking, and stale lifecycle messages. Full Bukkit inventory sessions, real serialized `ItemStack` recovery, DiscordSRV gateway routing, and live reload concurrency still require test-server integration checks.

Claim-rule tests cover all four game modes, the ten reviewed world IDs, excluded/unknown/alias lookalikes, empty/invalid/reloaded allowlists, OPs, repeated rejected purchases, changed confirmations, and console retry/refund paths. Integration tests exercise the real ledger and atomic profile store, asserting unchanged files for rejected purchases/retries, preserved reservations after partial delivery, and no duplicate charge or command on recovery. Tool event tests verify mode/world/config changes block both preview and confirmation while item return stays available.

Tool-transfer tests drive the actual click handlers with a controlled next-tick scheduler: duplicate callbacks, rapid clicks, changed cursors/displays/views, reloads, lost permission, death, offline/disable, cancelled kicks, blocked pending moves, every click/action type, and close-versus-return races. Inventory-return tests verify exact-slot undo beside an identical owned item, stack-merge rollback, full storage, armor/offhand/cursor matching, different metadata, and refusing to overwrite a changed destination. Real-client packet ordering and component-heavy gameplay items still need local acceptance.

Leaderboard tests cover all five metrics, positive-value filtering, real-name tie ordering, top-ten limits, shared command/menu rendering, rich display names, read-only profile and backup bytes, unreadable/missing files, bounded background work, empty/error states, refresh/back/index navigation, and delayed results after close/quit/kick/reload/access changes. Inventory event tests cover shift-click, number keys, offhand, double-click, drop, creative and drag protection. These use detached Paper item storage and a controlled scheduler; real-client visuals still require gameplay acceptance.

Console-status tests exercise the actual shared command gateway in active and cold dormant states, debug/inspect permission separation, completion, shared diagnostics/reload, invalid arguments, existing/unknown profiles, asynchronous output, cancellation, and stale results. Read-only storage tests compare every profile and backup byte after name/UUID lookups and corrupt-file failures. Public status retains its existing self/public/staff visibility.

Tournament tests cover both providers, concrete random selection including a single eligible type, missing dependencies, unreadable status, active and imminent scheduled events, cross-provider blocking, prices, global cooldowns, repeated actions, changes after reservation, exact refunds, uncertain command results, failed persistence after a start, restart/reload recovery and staff acknowledgement without replay.

Mail-request tests cover exact CMI account lookup, UUID console recipients for `.Bedrock` names, one 75-point charge, the shared cooldown, missing/full mailboxes, pre-dispatch refunds, uncertain delivery, interrupted saves, preserved request IDs after buyer renames, receipt-based recovery without duplicate mail, and staff acknowledgement. A disposable local `.DCMailTest` mailbox verified console delivery by UUID and one message retained through CMI save, clean restart and console readback. The ordinary-player purchase and staff mailbox experience still need local acceptance before live rollout.

## Smoke Test

For tournament acceptance on the local server, verify both new cards and purchase reviews with an eligible ordinary player. Buy each when both providers are idle and their schedules are clear; confirm the advertised random type starts for 15 minutes and Pyro awards its usual participation/placement prizes. Try both cards during either active event and near the next scheduled event: no points or commands should be consumed. Repeat after reload/restart and with a second player to verify the separate server-wide cooldowns. Use the transaction status/recovery commands for a deliberately interrupted disposable test purchase; never blindly replay an uncertain start. Automated tests cover the ledger/failure paths, while real-player scoring and prize delivery require gameplay acceptance.

On the local test server, run `discordchat debug status`, then add an existing name, UUID, and unknown name. Confirm build/state, hooks, tracking and reward/tool switches, detailed existing status, and a named not-found error. Repeat after `discordchat debug enable false` and after a cold dormant startup; restore the saved enabled setting afterward. Verify `discordchat debug`, `discordchat debug health`, and `discordchat debug reload` still work. Compare profile/backup bytes before and after. In game, repeat with debug-only staff, debug plus inspect, and ordinary player permissions; only the second group may inspect profiles through the new command.

For Top acceptance, open `/discordchat`, choose **Top**, and review each of the five rankings against `/discordchat top <metric>` while totals are stable. Verify the first ten ranks, CMI names, wrapped lore, title colour, refresh, Back, direct DiscordChat compass and close controls. Repeat with no positive totals and a pending load interrupted by close, another page, reload, quit, or permission removal. No points, profiles, rewards, or tool items should change merely from browsing.

For day-one acceptance, open `/discordchat milestones` with an uncompleted profile and verify all seven configured entries fit the first row, beginning with `1 Day Streak`. Send a qualifying linked message, then verify the fixed starter bonus, completion history and next target of seven days. Repeat activity, reload and restart: completion must remain and no second starter bonus may be granted. With an existing active profile, verify one catch-up award without rewriting later history; with a blocked/unlinked/zero-rate message, verify no award. Automated real-profile tests cover concurrent messages, resets, configuration changes, failed saves and all later thresholds. Real Discord gateway and in-game visual acceptance remain local test steps.

Presentation tests exercise the screenshot descriptions, styled and Unicode wrapping, manual blank lines, all eight title colours/texts, configuration and translation reloads, and opt-in catalog visibility. Real-ledger tests also cover disabled/hidden reward clicks, stale confirmations, disablement during delivery, blocked forced retries, and fully recorded delivery after removal.

For the Beta 2 presentation preview, compare dark teal, navy, and charcoal inventory titles at normal GUI scale. Inspect long Bee/Allay/Cat/Passport descriptions and dependency/blocked reasons in the catalog and confirmation. Change the scalar description, width, and `gui.reward.*` translations, reload with each alias, and reopen the menus. Confirm manual blank lines, Unicode, and formatting remain readable. Show one disabled reward with `show-when-disabled: true`, verify the Coming soon card has no purchase controls, then hide it again. Disable/remove a reward while its confirmation is open and verify rejection without spending points. Automated tests cover these render and transaction paths; real-client visual acceptance remains required.

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

For the Beta 2 preview, use a dedicated test Discord connection. Start with a closed window and verify that in-game chat still bridges but changes no XP, streak, milestone, or bonus balance. Send a meaningful linked Discord bridge message, verify 80% in-game message XP, then verify the exact expiry and that in-game messages cannot keep it open. Repeat using an extra Discord-only channel: apply its configured rate, verify no Minecraft forwarding, and verify it cannot open the window. Test an unlinked user, bot/webhook, link-only message, repeat, and duplicate callback. Edit/remove a channel, reload through both command aliases, and verify rates, the remaining activity time, existing points, claims, and cooldowns. Reconnect and restart checks must preserve recent event deduplication and begin with a closed activity window after restart.

For reward confirmation/cooldown testing, grant a test account enough points, open `/discordchat rewards`, and click a reward once. Verify that no points move and the confirmation page shows the exact cost and post-purchase balance. Cancel once, reopen it, then confirm. For either booster, verify the reward becomes unavailable for one hour to a second account as well, remains unavailable after a restart, and starts no cooldown when a deliberately failed transaction is refunded.

For XP conversion testing, use `/discordchat admin award <player> xp <amount> <reason>` and inspect `/discordchat status`. Starting from zero, award `24` XP and verify `0` points with `24/25` progress. Award `1` more and verify `1` point with `0/25`. Award `62` and verify another `2` points with `12/25` remaining. Reaching a streak milestone should add its configured bonus independently without changing that remainder.

For escrow recovery testing, place one disposable item in the tools input slot and confirm `escrow/<uuid>.yml` exists. Close the GUI with inventory space and confirm the item returns and the file clears. Repeat with a full inventory and confirm the item remains in escrow. On the test server only, corrupt a disposable escrow file before login and confirm it moves to `escrow/quarantine/`, the original bytes remain available for staff, and no replacement item is granted automatically.

For Beta 2 tool confirmation testing, use a disposable named/PDC-bearing item with Unbreaking III. Click Unbreaking IV and verify the original remains in the input slot, the proposed IV item appears on the right, and no points move. Cancel/back once, then review and confirm; check exactly one charge and unchanged unrelated item metadata. Verify IV/V items, incompatible items, and insufficient balances show a reason without confirmation. Reload or change the cost/balance/permissions while reviewing and verify confirmation rejects stale state. Check repeated clicks, shift/number-key/offhand/double-click/drop/creative actions, top-slot drags, close, quit/kick, and full-inventory recovery. Try to collect the yellow marker and the proposed item; neither should leave the interface. Local automated event tests cover these decision paths with detached items and persistence ports; real-client interaction and full Paper item-component acceptance remain manual test steps.

For Beta 2 claim acceptance, use a disposable test account and a genuinely allowed world key. In each of Creative, Adventure, and Spectator, attempt a reward and tool upgrade; verify no points, claims, cooldowns, or items change. Repeat in builders, spawn, legacy, and an unlisted world while in Survival, including as OP. Open a review while eligible, change mode/world, then confirm. Restore eligibility and verify one successful claim/upgrade. Reconfigure the allowlist to empty and reload to check the fail-closed message, then restore it. Check console retry and refund of a disposable interrupted transaction: an ineligible retry must do nothing, an eligible retry must resume without duplicating delivered commands, and a refund must remain possible. Returning an existing tool must work in a blocked world/mode. Server startup and automated tests do not replace these real-client gameplay checks.

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
10. `/discordchat top` lists the top 10 players by points, streak, messages, words, or emotes, using CMI display names with hover identity and clickable public status rows.
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
- The local Beta 2 preview implements an optional Discord `/discordchat` information command with private self-progress and getting-started help, restricted to #server-chat. It defaults off and awaits separate test-bot acceptance; live Beta 1 is unchanged.
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
8. Welcome points bundle through a verified native PyroWelcomesPro console payout.
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
- GUI actions are owner/session checked, click-throttled, and handled at high event priority. Stale menus close without running actions. All DiscordChat pages use the shared light-blue frame, player-head footer, centered back/help navigation, server-menu shortcut, and bottom-right close control.
- The item tools GUI has one mutable input slot. The item is atomically saved to identity-validated disk escrow while present, returned on close/quit/kick/plugin disable, and kept for staff review if automatic recovery would risk a duplicate. Malformed records are quarantined rather than deleted.
- The plugin does not require a player to have Discord; players can opt out of invite reminders.

## Optional DiscordSRV loading

DiscordSRV-specific events and its shaded Adventure serializer live inside the optional bridge. DiscordChat can load and expose its offline/status behavior when DiscordSRV is absent. The compile-only API JAR belongs in the test server's `compile-support` directory, outside active `plugins`, so local tests do not connect a Discord bot.
