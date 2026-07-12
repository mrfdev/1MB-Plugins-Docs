# NotableMsg

NotableMsg is a private helper chat channel for notable/community-assistant groups. It intentionally uses only `/n` so the server's existing `/notable` command space remains available for other workflows.

## Features

- `/n <message>` sends a private notable-channel message to online players with `onembcmiapi.notablemsg` and to console.
- `/n`, `/n toggle`, `/n on`, and `/n off` control persistent notable chat for the sender.
- When persistent notable chat is enabled, normal public chat from that player is cancelled and sent to notable chat.
- The default format uses the same `⚜` style marker as CMI staffmsg, adds a visible `[notable]` channel label, and uses a softer pastel green/cyan palette.
- The whole notable chat line has a hover tooltip showing `Command: /n`, sender name, world, and local server time.
- Clicking a notable chat line suggests `/n ` in the chat input for a quick reply.
- `/n help [page]` is paginated: notable-use commands appear first, and admin/debug commands appear on page 2 only when the viewer has the matching permissions.
- `/n recent [page]` shows recent notable messages from this runtime for quick staff follow-up. Each row is compact, shows oldest-to-newest within the page so the latest visible message lands at the bottom, and puts world, coordinates, time, and recipient details in the sender hover tooltip.
- The `/n recent` row order is configurable with `recent.order`; use `oldest-first` for newest at the bottom or `newest-first` for newest at the top.
- DiscordSRV support can mirror notable chat to a configured Discord channel with a safe console-side `discordsrv broadcast` command.
- DiscordSRV intake can listen to the configured Discord channel and show Discord replies in-game as notable chat, using the same `/n` recipient permission.
- If RecordingMode is installed, active recording players with `/recording set notablemsg off` are skipped as `/n` recipients.
- Message format, hover text, recent list size, DiscordSRV broadcast format, console logging format, max message length, and permission strings are configurable.
- Optional pass-through can forward selected `/n <subcommand>` entries to an existing command such as `/notable`.

## Commands

```text
/n <message>
/n
/n toggle
/n on
/n off
/n status
/n recent [page]
/n help [page]
/n info
/n reload
/n debug
/n debug commands [page]
/n debug permissions [page]
/n debug placeholders [page]
/n debug config [page]
/n debug set config <path> <value>
```

## Example Commands

```text
/n test
/n Could someone check the spawn queue?
/n on
/n off
/n status
/n recent
/n recent 2
/n help
/n help 2
```

## Permissions

```text
onembcmiapi.notablemsg
onembcmiapi.notablemsg.admin
onembcmi.notablemsg.admin
```

`onembcmiapi.notablemsg` is both the send and receive permission. This mirrors the simple CMI staffmsg style: if a player can use `/n`, they can also see the channel.

`onembcmiapi.notablemsg.admin` controls `/n reload`. The shared 1MB debug/config pages use `onembcmi.notablemsg.admin`.

## Placeholders

```text
%onembcmi_notablemsg.enabled%
%onembcmi_notablemsg.toggled%
%onembcmi_notablemsg.runtime.sent%
%onembcmi_notablemsg.runtime.discord_sent%
%onembcmi_notablemsg.last.sender%
%onembcmi_notablemsg.last.message%
%onembcmi_notablemsg.last.sent_at%
%onembcmi_notablemsg.discordsrv.enabled%
%onembcmi_notablemsg.discordsrv.command_available%
%onembcmi_notablemsg.discord_to_minecraft.enabled%
%onembcmi_notablemsg.discord_to_minecraft.available%
%onembcmi_notablemsg.cache.size%
```

## Config

The feature config is written to:

```text
plugins/1MB-CMIAPI/NotableMsg/config.yml
```

Important defaults:

```yaml
enabled: true
permissions:
  use: onembcmiapi.notablemsg
  admin: onembcmiapi.notablemsg.admin
message:
  max-length: 240
  format: '<color:#8fdcc2>(<color:#4ddbd0>⚜</color> [notable])</color> <color:#bde0fe>{sender}</color> <color:#8fdcc2>→</color> <color:#d8f3dc>{message}</color>'
  hover: '<color:#bde0fe>Command:</color> <color:#f2f5f7>/n</color><newline><color:#d8e2dc>Notable Chat sent by:</color><newline><color:#f2f5f7>{senderName}</color> <color:#d8e2dc>in</color> <color:#f2f5f7>{world}</color> <color:#d8e2dc>@</color> <color:#f2f5f7>{time}</color>'
  console-format: '[Notable] {sender}: {message}'
logging:
  console-format: '[Notable] {sender}: {message}'
recent:
  enabled: true
  max-records: 50
  entries-per-page: 8
  order: oldest-first
discordsrv-support:
  enabled: true
  discord-msg-format: '**`{sender}`** said @ `{world} {xyz}`: ```{message}```'
  discord-channel-id: '#1501108738537422988'
  discord-cmd: discordsrv broadcast
discord-to-minecraft:
  enabled: true
  channel-id: '1501108738537422988'
  channel-name: '#notables-log'
  ignore-bots: true
  ignore-webhooks: true
  console-echo: true
  max-length: 300
  format: '<color:#8fdcc2>(<color:#4ddbd0>⚜</color> [notable])</color> <color:#bde0fe>{sender}</color> <color:#d8e2dc>(discord)</color> <color:#8fdcc2>→</color> <color:#d8f3dc>{message}</color>'
filters:
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
chat-toggle:
  capture-public-chat: true
  capture-legacy-chat: true
recordingmode:
  respect-notablemsg-preference: true
passthrough:
  enabled: true
  target-command: notable
  first-args:
  - welcome
```

## CMI / CMILib / CMI-API Usage

NotableMsg uses `1MB-CMIAPI-LIB` for feature registration, config defaults, translation defaults, command metadata, debug metadata, MiniMessage-safe output helpers, and PlaceholderAPI routing.

It does not replace CMI staffmsg and does not hook into CMI staffmsg internals. It is designed as a separate lightweight channel for community assistants.

When `discordsrv-support.enabled` is true and the `discordsrv` command exists, NotableMsg mirrors each `/n` message to DiscordSRV with:

````text
discordsrv broadcast #1501108738537422988 **`{sender}`** said @ `{world} {xyz}`: ```{message}```
````

The Discord format supports `{sender}`, `{senderName}`, `{world}`, `{xyz}`, `{location}`, `{time}`, and `{message}`. Player-controlled values are stripped of legacy formatting, collapsed to one line, and backticks are replaced before dispatch so a player cannot break out of the configured Markdown code block.

When `discord-to-minecraft.enabled` is true and DiscordSRV is installed, NotableMsg subscribes to DiscordSRV's message event API and listens to `discord-to-minecraft.channel-id`. Messages typed in that Discord channel are shown in-game to online players with `onembcmiapi.notablemsg`, using `discord-to-minecraft.format`. Bot and webhook messages are ignored by default so the Minecraft-to-Discord mirror cannot loop back into Minecraft.

The Discord-to-Minecraft format supports `{sender}`, `{senderName}`, `{senderDisplayName}`, `{channel}`, and `{message}`. The `{channel}` placeholder and hover text prefer DiscordSRV/JDA's live channel name, such as `#notables-log`. If the live name is unavailable, `discord-to-minecraft.channel-name` is used as the readable fallback instead of showing only the numeric Discord channel id. Command-like messages are filtered before they bridge. By default, messages starting with `?`, such as `?clear 10`, are ignored, and first words such as `on`, `off`, `toggle`, `recent`, and `help` are treated as control words rather than notable messages.

CMI owns `/cmi staffmsg`, so this plugin cannot safely add `/cmi staffmsg recent` directly. For now, `/n recent` provides the same runtime-recent behavior for NotableMsg; if CMI later adds staffmsg history, this can stay separate.

When RecordingMode is present, NotableMsg uses the shared playerdata store to respect `recordingmode.active` and `recordingmode.preferences.notablemsg`. This keeps the jars separate while allowing `/recording` to quiet `/n` for players who are recording.

## Paper API Usage

The plugin uses Paper command handling and `AsyncChatEvent` to capture normal chat only when a player has toggled persistent notable chat on.

NotableMsg also keeps a guarded Bukkit chat bridge fallback behind `chat-toggle.capture-legacy-chat`. Keep this enabled when CMI or another chat plugin still exposes public chat through the Bukkit bridge after the modern Paper chat event was cancelled. A short duplicate guard prevents one typed message from being sent to `/n` twice when both chat paths fire.

## Security Notes

- Player messages are stripped of legacy color codes and escaped before MiniMessage rendering.
- DiscordSRV bridge values are one-line sanitized before the console broadcast command is dispatched.
- If the DiscordSRV command is missing, the Discord bridge quietly skips dispatch instead of producing unknown-command spam on test servers.
- Discord-to-Minecraft ignores Discord bot/webhook messages by default to prevent echo loops.
- Discord command prefixes such as `?` and `/n` control words such as `on`, `off`, `toggle`, `recent`, and `help` can be filtered before messages reach Minecraft.
- Only players with the configured use permission can send or receive notable messages.
- Public chat is only captured for players who explicitly toggled persistent notable chat on.
- Persistent chat captures modern Paper chat and the guarded Bukkit bridge, then cancels the public event before sending to `/n`.
- `/notable` is not registered by this plugin.

[Plugin index](README.md)
