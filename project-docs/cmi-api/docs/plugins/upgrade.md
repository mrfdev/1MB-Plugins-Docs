# Upgrade

Upgrade is an admin-only helper for reviewing, simulating, and applying configured LuckPerms group upgrades. It watches player joins, checks the player's current managed group, first-join age, and playtime, then sends permitted admins a clickable suggestion when the player appears ready for the next configured group.

The first enabled default transition is `default` (New) to `1mb_player` (Player). Later ladder steps are included in `groups.yml` but disabled until the owner decides the rules are ready.

## Commands

```text
/_upgrade status
/_upgrade gui
/_upgrade inspect <player>
/_upgrade simulate <player>
/_upgrade path <player>
/_upgrade explain <player> [transition]
/_upgrade <player>
/_upgrade apply <player> [transition]
/_upgrade notify <player>
/_upgrade reload
/_upgrade info
/_upgrade help
/_upgrade debug permissions
/_upgrade debug config
/_upgrade debug all
/_upgrade debug set config <path> <value>
```

There are no command aliases. Normal players should not receive any Upgrade permission, and tab suggestions are hidden from senders without an Upgrade permission. Direct console can run the non-GUI commands.

Examples:

```text
/_upgrade status
/_upgrade gui
/_upgrade inspect DrPeanut11
/_upgrade simulate DrPeanut11
/_upgrade path DrPeanut11
/_upgrade explain DrPeanut11 new_to_player
/_upgrade DrPeanut11
/_upgrade apply DrPeanut11 new_to_player
/_upgrade notify DrPeanut11
/_upgrade reload
/_upgrade debug set config debug.enabled true
/_upgrade debug set config debug.notify-all-joins true
/_upgrade debug set config debug.notify-all-joins false
```

`/_upgrade <player>` applies the first currently eligible transition. `/_upgrade apply <player> <transition>` applies the named transition only after a fresh safety check, so a join-time "New to Player" suggestion cannot accidentally become "Player to Member" after another admin clicks first.

`/_upgrade simulate <player>`, `/_upgrade path <player>`, and `/_upgrade explain <player> [transition]` are read-only. They reuse the same online player snapshot and transition evaluation as apply, but never dispatch LuckPerms, mail, reward, sound, particle, or Discord commands.

`/_upgrade notify <player>` sends the command sender a preview of the join-time clickable suggestion. It is meant for beta testing the chat output and hover data.

`/_upgrade gui` opens the review queue GUI for admins with `onembcmi.upgrade.gui`. It lists online players who currently match an enabled transition. The GUI refreshes current LuckPerms/playtime data when it opens, uses the shared hardened GUI holder/click/drag/debounce handling, and requires `onembcmi.upgrade.apply` before an admin can confirm an upgrade from the menu.

## Join Suggestions

When an online player joins, Upgrade waits `join-check.delay-ticks`, gathers a fresh snapshot, and evaluates the configured transitions in order. If the player matches a transition, admins with `onembcmi.upgrade.notify` receive a message with:

- a clickable `[Upgrade]` button that runs `/_upgrade apply <player> <transition>`
- the real account name from Paper, not a nickname
- the target group display name
- a clickable `[inspect]` button
- hover details with UUID, join date, playtime, primary group, direct parent groups, current managed group, and the matched rule

The console can also receive join suggestions when `join-check.notify-console` is true.

## Review Queue GUI

The queue is intentionally online-player only in this build. It refreshes eligible online candidates and shows them as player heads:

```text
/_upgrade gui
```

Clicking a candidate opens a confirmation screen if the admin has `onembcmi.upgrade.apply`. Confirming still runs the same fresh apply re-check as chat clicks and console commands. If the player was already upgraded by someone else, the action is rejected as already handled.

## Default Ladder

Managed groups are configured in `groups.yml`:

```text
default -> 1mb_player -> 1mb_member -> 1mb_boosted -> 1mb_builder -> 1mb_rogue
```

Default display names:

```text
default = New
1mb_player = Player
1mb_member = Member
1mb_boosted = Boosted Member
1mb_builder = Builder
1mb_rogue = Rogue
```

The default enabled New to Player rule is:

```text
joined within 24 hours: 6+ hours playtime
joined within 168 hours: 12+ hours playtime
any join age: 24+ hours playtime
```

The later Player to Member, Member to Boosted Member, Boosted Member to Builder, and Builder to Rogue transitions are present but disabled by default.

## Permissions

```text
onembcmi.upgrade.admin
onembcmi.upgrade.notify
onembcmi.upgrade.gui
onembcmi.upgrade.inspect
onembcmi.upgrade.simulate
onembcmi.upgrade.apply
onembcmi.upgrade.reload
onembcmi.upgrade.debug
onembcmi.upgrade.test
```

All permissions default to `false` in `plugin.yml`, including for operators. Grant them explicitly through LuckPerms.

Suggested grants:

- `onembcmi.upgrade.notify` for admins who should see join-time suggestions.
- `onembcmi.upgrade.gui` for admins who should use the review queue GUI.
- `onembcmi.upgrade.inspect` for admins who may review eligibility.
- `onembcmi.upgrade.simulate` for admins who may use read-only group path and rankup simulation tools.
- `onembcmi.upgrade.apply` only for admins trusted to change LuckPerms parents.
- `onembcmi.upgrade.test` for beta testers who should preview join messages.
- `onembcmi.upgrade.admin` for owner-level staff; it includes all Upgrade permissions.

## Config Files

Runtime files:

```text
plugins/1MB-CMIAPI/Upgrade/config.yml
plugins/1MB-CMIAPI/Upgrade/groups.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/upgrade.yml
```

`config.yml` controls runtime behavior:

```yaml
enabled: true
debug:
  enabled: false
  notify-all-joins: false
  allow-apply-bypass: false
gui:
  title: Upgrade Review
  filler-material: GLOBAL
  rescan-online-on-open: true
join-check:
  delay-ticks: 60
  notify-cooldown-seconds: 900
  notify-console: true
actions:
  apply-lock-seconds: 15
  allowed-command-prefixes:
    - lp user
    - cmi mail send
  add-parent-command: lp user {player} parent add {to_group}
  remove-parent-command: lp user {player} parent remove {from_group}
  remove-default-parent: false
  mail-command: cmi mail send {player} Thank you for playing on 1MoreBlock.com! Your activity is noticed, and we have upgraded your group from "{from_display}" to "{to_display}". More info: "/groups".
rewards:
  cosmetic:
    enabled: true
    permission-command: lp user {player} permission set {cosmetic_permission} true
    mail-command: cmi mail send {player} Your {to_display} upgrade also unlocked {cosmetic_name}. Try it from your cosmetics menu when you are ready.
celebration:
  enabled: true
  message:
    enabled: true
    text: Something good happened! Check /mail when you have a moment.
  sound:
    enabled: true
    name: minecraft:entity.player.levelup
    volume: 0.8
    pitch: 1.25
  particles:
    enabled: true
    name: HAPPY_VILLAGER
    count: 32
discord-link:
  enabled: true
  require-discordsrv-link-check: true
  message:
    enabled: true
    also-send-when-mail-enabled: false
    text: You can also link Discord with /discord link and join #Server-chat from Minecraft.
  mail-command: cmi mail send {player} Want to get more involved with the community? Link Discord with /discord link to chat in #Server-chat from Minecraft.
source:
  placeholder-candidates:
    - "%cmi_user_playtime_seconds%"
    - "%cmi_user_playtime%"
    - "%cmi_user_playtime_days%"
  paper-statistic-fallback: true
output:
  page-size: 8
```

`groups.yml` controls the managed ladder and eligibility ranges. A `max-registration-age-hours` value of `0` means no join-age limit:

```yaml
groups:
  default-group: default
  ids:
    - default
    - 1mb_player
  1mb_player:
    display-name: Player
    weight: 20
    cosmetic-name: Player Spark Trail
    cosmetic-permission: ""
transitions:
  ids:
    - new_to_player
  new_to_player:
    enabled: true
    from-group: default
    to-group: 1mb_player
    from-display: New
    to-display: Player
    require-no-higher-managed-group: true
    ranges:
      ids:
        - first_day
        - first_week
        - forever
      first_day:
        max-registration-age-hours: 24
        min-playtime-hours: 6
      first_week:
        max-registration-age-hours: 168
        min-playtime-hours: 12
      forever:
        max-registration-age-hours: 0
        min-playtime-hours: 24
```

Comments are preserved on reload, and missing defaults are added safely.

Cosmetic permissions are opt-in. Upgrade does not guess the ProCosmetics permission names. Put the exact permission for the cosmetic you want to grant into `groups.<group>.cosmetic-permission`; when that value is blank, no cosmetic command or second cosmetic mail is sent.

## Safety Notes

Upgrade does not automatically change groups on join. It only suggests an upgrade to admins with the notify permission, and an admin must click or run the apply command.

Every apply action re-checks the player's current LuckPerms state and eligibility. If another admin already upgraded the player, the second click is rejected as already handled. A short duplicate-action lock also prevents several clicks from dispatching the same transition at once.

Each promotion also opens a durable player/transition idempotency receipt before any LuckPerms or CMI command runs. Command progress is checkpointed individually, so an interrupted multi-command promotion is blocked for review through `/_upgrade debug transactions` rather than replayed from the beginning.

The default apply flow uses:

```text
lp user {player} parent add {to_group}
lp user {player} parent remove {from_group}
cmi mail send {player} ...
```

The `parent add` step preserves extra parent groups such as donor, tester, developer, streamer, notable, or other side groups. The previous managed parent is removed only when it is explicitly present, and the `default` group is not removed unless `actions.remove-default-parent` is true.

If `groups.<to_group>.cosmetic-permission` is configured and `rewards.cosmetic.enabled` is true, Upgrade also dispatches the configured cosmetic permission command and then sends the configured second CMI mail about the unlock. This is intended for ProCosmetics-style trail, crown, aura, or particle rewards, but stays permission-command based so the exact cosmetic plugin permission can be changed without code.

When `celebration.enabled` is true, the promoted player receives a small positive in-game nudge: a plain escaped chat line, an optional sound, and an optional particle burst. This is meant to make the promotion noticeable so the player checks their CMI mail.

When `discord-link.enabled` is true, Upgrade can remind promoted players to run `/discord link`. With `discord-link.require-discordsrv-link-check` true, the reminder is sent only when DiscordSRV is loaded and reports that the player's UUID is not linked. By default the Discord reminder is sent by CMI mail only when `discord-link.mail-command` is configured; set `discord-link.message.also-send-when-mail-enabled` true only if you also want a chat reminder.

Configured console commands are sanitized before dispatch. Player names, group ids, transition ids, and command strings are restricted, and commands must match `actions.allowed-command-prefixes`. Command chains, pipes, semicolons, and newline injection are blocked. RCON is not used or supported.

## Data Sources And Hooks

- **LuckPerms**: required. Upgrade reads loaded online user data and dispatches configured LuckPerms parent commands from console.
- **CMI**: required for the post-upgrade mail command and for CMI playtime placeholders when PlaceholderAPI is available.
- **CMILib / CMI-API**: required through the shared 1MB-CMIAPI library for config comments, translations, feature registry, help/info/debug pages, MiniMessage output, placeholders, and build metadata.
- **PlaceholderAPI**: optional. If loaded, Upgrade tries the configured CMI playtime placeholders in order.
- **DiscordSRV**: optional. Used only for a reflective linked-account check before sending the `/discord link` reminder.
- **Paper**: used for join events, online player snapshots, real account names, UUIDs, first-played timestamps, and the `PLAY_ONE_MINUTE` statistic fallback.

Only online players can be inspected, simulated, or upgraded in this MVP because the safest first pass relies on currently loaded LuckPerms and Paper player data.

## Placeholders

```text
%onembcmi_upgrade.enabled%
%onembcmi_upgrade.groups.count%
%onembcmi_upgrade.transitions.count%
%onembcmi_upgrade.runtime.suggestions%
%onembcmi_upgrade.runtime.applied%
%onembcmi_upgrade.last.suggestion%
%onembcmi_upgrade.last.applied%
%onembcmi_upgrade.cache.size%
```

## Prefix

Upgrade uses the shared feature-prefix system with visible prefix name `Upgrade`. The default symbol is `⇧` from:

```text
plugins/1MB-CMIAPI/CMIAPILIB/config.yml
locale.prefix-unicodes.upgrade
```

Admin-facing Upgrade messages may use hover/click actions for `/_upgrade` review tools. Player-facing promotion feedback and Discord reminders use the same visible prefix and icon without click actions, so players are not offered an admin-only command.

## Beta Testing

To see join suggestions for every join while testing:

```text
/_upgrade debug set config debug.enabled true
/_upgrade debug set config debug.notify-all-joins true
```

This does not make apply unsafe by itself. Apply still re-checks eligibility unless `debug.allow-apply-bypass` is also enabled. Keep `debug.allow-apply-bypass` false on live.

## Future Suggestions

- Add an audit log for suggested, clicked, blocked, and applied transitions.
- Add per-transition custom action commands and mail text.
- Add a snooze/ignore command for "do not suggest this player again for N days".
- Add DiscordSRV or staff-channel summaries for applied upgrades.
- Add optional checks for warnings, bans, mutes, votes, referrals, or AFK ratio before suggestions.
- Add a confirmation button for very high-impact transitions.
- Add a rollback helper that only reverses the managed transition and preserves side groups.
- Add a scheduled daily scan report in addition to join-time checks.
- Add offline inspect/simulate using LuckPerms async user loading and CMIUser data.

## Test Checklist

```text
/_upgrade status
/_upgrade gui
/_upgrade inspect <online-default-player>
/_upgrade simulate <online-default-player>
/_upgrade path <online-default-player>
/_upgrade explain <online-default-player> new_to_player
/_upgrade notify <online-default-player>
/_upgrade apply <online-default-player> new_to_player
/_upgrade debug permissions
/_upgrade debug config
/_upgrade debug all
```

After applying, confirm in LuckPerms that the target group was added, the previous managed group was removed only when configured, side groups were preserved, and the CMI mail was sent.

[Plugin index](README.md)
