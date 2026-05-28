# 1MBStaffMsg

1MBStaffMsg is a small runtime helper for CMI's built-in staff message channel. CMI still owns the real `/cmi staffmsg` and `/staffmsg` delivery. This feature plugin watches staffmsg command usage, stores a short in-memory recent list, and intercepts recent-history commands such as `/s recent`.

It is designed for servers that already use a CMI AliasEditor alias like `/s -> asPlayer! cmi staffmsg $1-`. You can keep using that alias for normal staff chat. When the first argument is `recent`, 1MBStaffMsg cancels the command and shows the recent staff message history instead.

## Features

- Captures staff messages sent through `/s <message>`, `/staffmsg <message>`, and `/cmi staffmsg <message>`.
- Adds `/s recent [page]`, `/staffmsg recent [page]`, `/cmi staffmsg recent [page]`, and `/1mbstaffmsg recent [page]`.
- Adds `recent` as a tab suggestion for `/s`, `/staffmsg`, and `/cmi staffmsg` when the sender can use CMI staffmsg.
- Uses CMI's existing `cmi.command.staffmsg` permission by default, so the same staff members who can use staffmsg can view staffmsg recent history.
- Stores recent messages only in memory. Restarting or reloading clears the runtime list.
- Recent rows are compact. Hover over the sender for world, coordinates, time, source command, and online staff recipients.
- Clicking a recent sender suggests `/s ` for a quick staffmsg reply.
- Shift-clicking a recent sender inserts `/cmi tppos <x> <y> <z> <world>` for fast staff teleport follow-up.
- Alias-forwarded duplicates such as `/s <message>` becoming `/cmi staffmsg <message>` are collapsed within the configured duplicate window.
- The display order is configurable with `recent.order`.
- Optional console forwarding can turn console-side `s <message>` and `staffmsg <message>` into `cmi staffmsg <message>`.
- Optional chat shorthand lets staff type `# message` or `#message` in normal chat and send it to staffmsg instead of public chat.
- Optional persistent chat capture tracks `/s on`, `/staffmsg on`, and `/cmi staffmsg on`, then captures normal chat typed while persistent CMI staff chat is active so `/s recent` and Discord outbound can see those messages.
- Optional DiscordSRV intake can show messages from the configured Discord staffmsg channel in-game for staff.
- Optional DiscordSRV outbound fallback can mirror plugin-handled staffmsg messages such as chat shorthand to Discord when alerts.yml cannot see them.

## Commands

```text
/s recent [page]
/staffmsg recent [page]
/cmi staffmsg recent [page]
/1mbstaffmsg recent [page]
/1mbstaffmsg status
/1mbstaffmsg reload
/1mbstaffmsg info
/1mbstaffmsg help
/1mbstaffmsg debug
/1mbstaffmsg debug status
/1mbstaffmsg debug commands [page]
/1mbstaffmsg debug permissions [page]
/1mbstaffmsg debug placeholders [page]
/1mbstaffmsg debug config [page]
/1mbstaffmsg debug set config <path> <value>
# staff message
#staff message
```

## Example Commands

```text
/s this is a staff message through the existing CMI alias
/s recent
/s recent 2
/1mbstaffmsg status
/1mbstaffmsg debug config
/1mbstaffmsg debug set config recent.order oldest-first
/1mbstaffmsg debug set config chat-shorthand.enabled true
/1mbstaffmsg debug set config console-forward.enabled true
/1mbstaffmsg debug set config discord-to-minecraft.enabled true
/1mbstaffmsg reload
```

## Permissions

```text
cmi.command.staffmsg
onembcmi.staffmsg.admin
```

`cmi.command.staffmsg` is the default view/use permission because this plugin is intentionally extending the existing CMI staffmsg permission model.

`onembcmi.staffmsg.admin` gates reload, debug, and config inspection/set commands.

## Placeholders

```text
%onembcmi_staffmsg.enabled%
%onembcmi_staffmsg.recent.count%
%onembcmi_staffmsg.runtime.recorded%
%onembcmi_staffmsg.last.sender%
%onembcmi_staffmsg.last.message%
%onembcmi_staffmsg.last.sent_at%
%onembcmi_staffmsg.chat_shorthand.enabled%
%onembcmi_staffmsg.console_forward.enabled%
%onembcmi_staffmsg.discord_to_minecraft.enabled%
%onembcmi_staffmsg.discord_to_minecraft.available%
%onembcmi_staffmsg.discordsrv_outbound.enabled%
%onembcmi_staffmsg.cache.size%
```

## Config

`plugins/1MB-CMIAPI/1MBStaffMsg/config.yml`

```yaml
enabled: true
debug: false
permissions:
  staffmsg: cmi.command.staffmsg
capture:
  s-command: true
  staffmsg-command: true
  cmi-staffmsg-command: true
  duplicate-window-millis: 750
  persistent-chat: true
  legacy-chat: true
dispatch:
  command: cmi staffmsg {message}
console-forward:
  enabled: false
  s-command: true
  staffmsg-command: true
chat-shorthand:
  enabled: false
  prefix: '#'
  allow-no-space: true
  max-length: 300
discord-to-minecraft:
  enabled: false
  channel-id: '1182983665412755507'
  ignore-bots: true
  ignore-webhooks: true
  console-echo: true
  max-length: 300
  format: '{#gossamer}({#brightturquoise}⚜{#gossamer}) [senderDisplayName] {#gossamer}(discord) → {#FF5555}[message]'
  use-linked-display-name: true
discordsrv-outbound:
  enabled: true
  plugin-handled: true
  observed-commands: false
  channel-id: '#1182983665412755507'
  discord-cmd: discordsrv broadcast
  discord-msg-format: '**`{sender}`** said staffmsg via `{source}`: ```{message}```'
filters:
  minecraft-to-discord:
    ignored-first-args:
    - on
    - off
    - toggle
    - recent
    - help
    - status
    - reload
    - debug
    - info
    - clear
  discord-to-minecraft:
    ignored-prefixes:
    - '?'
    ignored-first-words:
    - on
    - off
    - toggle
    - recent
    - help
    - status
    - reload
    - debug
    - info
    - clear
recent:
  enabled: true
  max-records: 50
  entries-per-page: 8
  order: newest-first
  duplicate-output-window-millis: 1000
display:
  reply-command: '/s '
```

Config comments are managed by the shared 1MB-CMIAPI config writer and are re-applied on reload while preserving existing values.

## DiscordSRV Integration

1MBStaffMsg now has two optional DiscordSRV paths:

- `discord-to-minecraft.enabled`: listens to the configured Discord channel and sends Discord staff messages to online players with `cmi.command.staffmsg`.
- `discordsrv-outbound.enabled`: uses `discordsrv broadcast` as a fallback for plugin-handled messages that DiscordSRV alerts.yml cannot see, such as `# message` chat shorthand. This is enabled by default, while `observed-commands` remains false to avoid duplicate `/s` alerts.
- `capture.persistent-chat`: tracks staff persistent mode commands and captures the later normal chat messages that CMI converts into staffmsg. DiscordSRV `alerts.yml` cannot see those later messages because they are chat events, not commands.

There are two possible ways to send StaffMsg messages from Minecraft to Discord:

1. DiscordSRV `alerts.yml`
   - DiscordSRV watches Bukkit command events.
   - Your alerts can catch `/s`, `/staffmsg`, and `/cmi staffmsg`.
   - This is the best option when you want rich Discord embeds.

2. 1MBStaffMsg `discordsrv-outbound`
   - 1MBStaffMsg runs a console command like `discordsrv broadcast #1182983665412755507 <message>`.
   - This is useful for plugin-handled messages that DiscordSRV command alerts cannot naturally see, such as cancelled `# message` chat shorthand.

Keep this setting if your DiscordSRV `alerts.yml` already mirrors `/s`, `/staffmsg`, and `/cmi staffmsg`:

```yaml
discordsrv-outbound:
  enabled: true
  plugin-handled: true
  observed-commands: false
```

That setup means:

- DiscordSRV `alerts.yml` handles normal `/s`, `/staffmsg`, and `/cmi staffmsg` command logging.
- 1MBStaffMsg handles plugin-only paths such as `# message` shorthand.
- 1MBStaffMsg also handles persistent staff chat messages after `/s on`, `/staffmsg on`, or `/cmi staffmsg on`.
- Regular staff messages do not get duplicated.

Only set this if you want 1MBStaffMsg to replace the StaffMsg parts of DiscordSRV `alerts.yml`:

```yaml
discordsrv-outbound:
  enabled: true
  plugin-handled: true
  observed-commands: true
```

If `observed-commands` is `true` while DiscordSRV `alerts.yml` also mirrors `/s`, `/staffmsg`, and `/cmi staffmsg`, both systems will send the same message to Discord and staffmsg entries can appear twice.

Discord to Minecraft uses a different path. When `discord-to-minecraft.enabled` is true, 1MBStaffMsg subscribes to DiscordSRV's API events and listens for messages in `discord-to-minecraft.channel-id`. It does not need a DiscordSRV `alerts.yml` entry for this direction. DiscordSRV owns the Discord connection; 1MBStaffMsg listens to the message event, checks the channel id, sanitizes/trims the message, then sends it in-game to online players who have `cmi.command.staffmsg`.

Command-like messages are filtered before they bridge. By default, Discord messages starting with `?`, such as `?clear 10`, are treated as bot commands and are not sent in-game. First words such as `on`, `off`, `toggle`, `recent`, and `help` are also treated as staffmsg control commands rather than staff messages. The same first-word list is used by 1MBStaffMsg to avoid recording or mirroring console-forwarded command-like staffmsg calls.

The Discord-to-Minecraft format can be adjusted per server. It accepts normal MiniMessage plus a small CMI-locale-style layer for familiar StaffMsg formatting:

```yaml
discord-to-minecraft:
  format: '{#gossamer}({#brightturquoise}⚜{#gossamer}) [senderDisplayName] {#gossamer}(discord) → {#FF5555}[message]'
```

Supported placeholders include `{sender}`, `{senderName}`, `{senderDisplayName}`, `{message}`, `{channel}`, `[senderDisplayName]`, `[senderName]`, `[message]`, and `[channel]`. `[senderDisplayName]` and `{senderDisplayName}` use DiscordSRV account linking to find the online Minecraft player, then prefer CMI's formatted `CMIUser` display name when `discord-to-minecraft.use-linked-display-name` is enabled. That keeps Discord-origin staff messages aligned with the same rank/nick colors used by `/s` in-game, with Paper and Discord names as fallbacks. Known CMI color tags such as `{#gossamer}`, `{#brightturquoise}`, `{#FF5555}`, `{#crimson}`, `{#cerulean}`, `{#lochmara}`, `{#feijoa}`, `{#orange}`, and `{#magenta}` are converted to MiniMessage colors.

Suggested DiscordSRV `alerts.yml` entries for normal command-based outbound logging:

```yaml
  - Trigger: PlayerCommandPreprocessEvent
    Channel: '1182983665412755507'
    Conditions:
      - '#player.hasPermission("cmi.command.staffmsg") == true'
      - '#command.toLowerCase().startsWith("cmi staffmsg ") or #command.toLowerCase().startsWith("staffmsg ") or #command.toLowerCase().startsWith("s ")'
      - '!(#command.toLowerCase().equals("s on") or #command.toLowerCase().startsWith("s on ") or #command.toLowerCase().equals("s off") or #command.toLowerCase().startsWith("s off ") or #command.toLowerCase().equals("s toggle") or #command.toLowerCase().startsWith("s toggle ") or #command.toLowerCase().equals("s recent") or #command.toLowerCase().startsWith("s recent ") or #command.toLowerCase().equals("s help") or #command.toLowerCase().startsWith("s help ") or #command.toLowerCase().equals("s status") or #command.toLowerCase().startsWith("s status ") or #command.toLowerCase().equals("s reload") or #command.toLowerCase().startsWith("s reload ") or #command.toLowerCase().equals("s debug") or #command.toLowerCase().startsWith("s debug ") or #command.toLowerCase().equals("s info") or #command.toLowerCase().startsWith("s info ") or #command.toLowerCase().equals("s clear") or #command.toLowerCase().startsWith("s clear ") or #command.toLowerCase().equals("staffmsg on") or #command.toLowerCase().startsWith("staffmsg on ") or #command.toLowerCase().equals("staffmsg off") or #command.toLowerCase().startsWith("staffmsg off ") or #command.toLowerCase().equals("staffmsg toggle") or #command.toLowerCase().startsWith("staffmsg toggle ") or #command.toLowerCase().equals("staffmsg recent") or #command.toLowerCase().startsWith("staffmsg recent ") or #command.toLowerCase().equals("staffmsg help") or #command.toLowerCase().startsWith("staffmsg help ") or #command.toLowerCase().equals("staffmsg status") or #command.toLowerCase().startsWith("staffmsg status ") or #command.toLowerCase().equals("staffmsg reload") or #command.toLowerCase().startsWith("staffmsg reload ") or #command.toLowerCase().equals("staffmsg debug") or #command.toLowerCase().startsWith("staffmsg debug ") or #command.toLowerCase().equals("staffmsg info") or #command.toLowerCase().startsWith("staffmsg info ") or #command.toLowerCase().equals("staffmsg clear") or #command.toLowerCase().startsWith("staffmsg clear ") or #command.toLowerCase().equals("cmi staffmsg on") or #command.toLowerCase().startsWith("cmi staffmsg on ") or #command.toLowerCase().equals("cmi staffmsg off") or #command.toLowerCase().startsWith("cmi staffmsg off ") or #command.toLowerCase().equals("cmi staffmsg toggle") or #command.toLowerCase().startsWith("cmi staffmsg toggle ") or #command.toLowerCase().equals("cmi staffmsg recent") or #command.toLowerCase().startsWith("cmi staffmsg recent ") or #command.toLowerCase().equals("cmi staffmsg help") or #command.toLowerCase().startsWith("cmi staffmsg help ") or #command.toLowerCase().equals("cmi staffmsg status") or #command.toLowerCase().startsWith("cmi staffmsg status ") or #command.toLowerCase().equals("cmi staffmsg reload") or #command.toLowerCase().startsWith("cmi staffmsg reload ") or #command.toLowerCase().equals("cmi staffmsg debug") or #command.toLowerCase().startsWith("cmi staffmsg debug ") or #command.toLowerCase().equals("cmi staffmsg info") or #command.toLowerCase().startsWith("cmi staffmsg info ") or #command.toLowerCase().equals("cmi staffmsg clear") or #command.toLowerCase().startsWith("cmi staffmsg clear "))'
    Embed:
      Color: "#00ff00"
      ThumbnailUrl: "https://mineskin.eu/avatar/{username}"
      Title:
        Text: "🔍 /cmi staffmsg"
      Description: |
        `{username}` said: ```${#allArgs.substring(#allArgs.indexOf(' ') + 1)}```
      Timestamp: true

  - Trigger: ServerCommandEvent
    Channel: '1182983665412755507'
    Conditions:
      - '#command.toLowerCase().startsWith("cmi staffmsg ")'
      - '!(#command.toLowerCase().equals("cmi staffmsg on") or #command.toLowerCase().startsWith("cmi staffmsg on ") or #command.toLowerCase().equals("cmi staffmsg off") or #command.toLowerCase().startsWith("cmi staffmsg off ") or #command.toLowerCase().equals("cmi staffmsg toggle") or #command.toLowerCase().startsWith("cmi staffmsg toggle ") or #command.toLowerCase().equals("cmi staffmsg recent") or #command.toLowerCase().startsWith("cmi staffmsg recent ") or #command.toLowerCase().equals("cmi staffmsg help") or #command.toLowerCase().startsWith("cmi staffmsg help ") or #command.toLowerCase().equals("cmi staffmsg status") or #command.toLowerCase().startsWith("cmi staffmsg status ") or #command.toLowerCase().equals("cmi staffmsg reload") or #command.toLowerCase().startsWith("cmi staffmsg reload ") or #command.toLowerCase().equals("cmi staffmsg debug") or #command.toLowerCase().startsWith("cmi staffmsg debug ") or #command.toLowerCase().equals("cmi staffmsg info") or #command.toLowerCase().startsWith("cmi staffmsg info ") or #command.toLowerCase().equals("cmi staffmsg clear") or #command.toLowerCase().startsWith("cmi staffmsg clear "))'
    Embed:
      Color: "#00ff00"
      ThumbnailUrl: "https://mineskin.eu/avatar/server"
      Title:
        Text: "🔍 staffmsg (console)"
      Description: |
        `Console` said: ```${#command.substring(13)}```
      Timestamp: true

  - Trigger: ServerCommandEvent
    Channel: '1182983665412755507'
    Conditions:
      - '#command.toLowerCase().startsWith("staffmsg ")'
      - '!(#command.toLowerCase().equals("staffmsg on") or #command.toLowerCase().startsWith("staffmsg on ") or #command.toLowerCase().equals("staffmsg off") or #command.toLowerCase().startsWith("staffmsg off ") or #command.toLowerCase().equals("staffmsg toggle") or #command.toLowerCase().startsWith("staffmsg toggle ") or #command.toLowerCase().equals("staffmsg recent") or #command.toLowerCase().startsWith("staffmsg recent ") or #command.toLowerCase().equals("staffmsg help") or #command.toLowerCase().startsWith("staffmsg help ") or #command.toLowerCase().equals("staffmsg status") or #command.toLowerCase().startsWith("staffmsg status ") or #command.toLowerCase().equals("staffmsg reload") or #command.toLowerCase().startsWith("staffmsg reload ") or #command.toLowerCase().equals("staffmsg debug") or #command.toLowerCase().startsWith("staffmsg debug ") or #command.toLowerCase().equals("staffmsg info") or #command.toLowerCase().startsWith("staffmsg info ") or #command.toLowerCase().equals("staffmsg clear") or #command.toLowerCase().startsWith("staffmsg clear "))'
    Embed:
      Color: "#00ff00"
      ThumbnailUrl: "https://mineskin.eu/avatar/server"
      Title:
        Text: "🔍 staffmsg (console)"
      Description: |
        `Console` said: ```${#command.substring(9)}```
      Timestamp: true

  - Trigger: ServerCommandEvent
    Channel: '1182983665412755507'
    Conditions:
      - '#command.toLowerCase().startsWith("s ")'
      - '!(#command.toLowerCase().equals("s on") or #command.toLowerCase().startsWith("s on ") or #command.toLowerCase().equals("s off") or #command.toLowerCase().startsWith("s off ") or #command.toLowerCase().equals("s toggle") or #command.toLowerCase().startsWith("s toggle ") or #command.toLowerCase().equals("s recent") or #command.toLowerCase().startsWith("s recent ") or #command.toLowerCase().equals("s help") or #command.toLowerCase().startsWith("s help ") or #command.toLowerCase().equals("s status") or #command.toLowerCase().startsWith("s status ") or #command.toLowerCase().equals("s reload") or #command.toLowerCase().startsWith("s reload ") or #command.toLowerCase().equals("s debug") or #command.toLowerCase().startsWith("s debug ") or #command.toLowerCase().equals("s info") or #command.toLowerCase().startsWith("s info ") or #command.toLowerCase().equals("s clear") or #command.toLowerCase().startsWith("s clear "))'
    Embed:
      Color: "#00ff00"
      ThumbnailUrl: "https://mineskin.eu/avatar/server"
      Title:
        Text: "🔍 staffmsg (console)"
      Description: |
        `Console` said: ```${#command.substring(2)}```
      Timestamp: true
```

## Notes

1MBStaffMsg does not replace CMI staffmsg delivery and does not modify CMI locales. It observes command usage before CMI handles the command, then lets CMI continue normally unless the command is a recent-history request.

If you use CMI AliasEditor for `/s`, leave that alias in place for `/s <message>`. 1MBStaffMsg only reserves `/s recent [page]`.

If you want `/s <message>` and `/staffmsg <message>` to work cleanly from both players and console, use CMI custom aliases that dispatch as the original sender type. This lets console aliases still become `cmi staffmsg <message>` instead of silently missing DiscordSRV console alerts:

```yaml
  s:
    Cmds:
    - check:[playerName]!=Server! asPlayer! cmi staffmsg $1-
    - check:[playerName]==Server! asConsole! cmi staffmsg $1-
    Perm: true
    AddTabs: true
  staffmsg:
    Cmds:
    - check:[playerName]!=Server! asPlayer! cmi staffmsg $1-
    - check:[playerName]==Server! asConsole! cmi staffmsg $1-
    Perm: true
    AddTabs: true
```

If `console-forward.enabled` is true, console `s <message>` and `staffmsg <message>` are cancelled and forwarded through `dispatch.command`, which defaults to `cmi staffmsg {message}`.

If `chat-shorthand.enabled` is true, staff chat messages beginning with the configured prefix are cancelled before public chat sees them. Players without `cmi.command.staffmsg` also get cancelled and receive a no-permission message so staff-looking text does not leak publicly.

If `capture.persistent-chat` is true, 1MBStaffMsg watches `/s on`, `/staffmsg on`, `/cmi staffmsg on`, and their `off`/`toggle` variants for players with `cmi.command.staffmsg`. While a player is marked as using persistent staff chat, normal chat they type is cancelled before public chat sees it, forwarded through `dispatch.command`, stored in `/s recent`, and optionally mirrored through `discordsrv-outbound` as a plugin-handled message. This is intentionally separate from DiscordSRV `alerts.yml`, because alerts can only see commands and cannot see the later normal chat produced by CMI's persistent mode.

Some CMI alias setups still dispatch the expanded `/cmi staffmsg recent` command path after `/s recent` was already handled. `recent.duplicate-output-window-millis` suppresses that second recent-page render without hiding normal staff messages.

## CMI / CMILib / CMI-API Usage

- CMI owns `/cmi staffmsg`, `/staffmsg`, and the staffmsg permission node.
- 1MB-CMIAPI-LIB provides feature registration, config comments, translations, debug/config pages, prefixes, placeholders, and shared docs metadata.
- Paper command preprocess events are used to detect `/s recent` before CMI aliases run.
- Paper tab-complete events are used to offer `recent` for `/s`, `/staffmsg`, and `/cmi staffmsg` without registering or taking over those commands.
- Paper `AsyncChatEvent` is used for the optional `#` staffmsg shorthand. Staff shorthand lines are cancelled before forwarding so they do not leak into public chat.
- StaffMsg also keeps a guarded Bukkit chat bridge fallback behind `capture.legacy-chat`. Keep this enabled when CMI or another chat plugin still exposes public chat through the Bukkit bridge after the modern Paper chat event was cancelled.
- Paper chat events and the guarded Bukkit bridge are also used for persistent staff chat capture after staff toggles CMI staffmsg persistent mode on. This keeps `/s recent` and Discord mirrors complete even when the actual staff message started as normal chat.
- DiscordSRV's API is used for optional Discord-to-Minecraft staff message intake when DiscordSRV is installed.

## Security Notes

- Player input is sanitized before being stored in memory or shown in hover text.
- Recent history is runtime-only and bounded by `recent.max-records`.
- The plugin does not run arbitrary commands from player input. The only configurable dispatch command must contain `{message}` and is restricted to a conservative command-character set.
- Discord outbound values are flattened to one line and backticks/everyone pings are neutralized before dispatching through DiscordSRV.
- Permission checks use `permissions.staffmsg`, defaulting to `cmi.command.staffmsg`.
