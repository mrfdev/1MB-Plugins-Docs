# RecordingMode

## Purpose

RecordingMode gives players a clean `/recording` toggle for video recording, streaming, screenshots, or other moments where chat interruptions should be reduced.

When recording mode is enabled, the plugin applies the player's configured quiet profile to CMI options such as private messages, TPA requests, and money requests. It also filters CMI staff messages from that player when their profile disables staff messages, can hide `/n` NotableMsg chat when that feature jar is installed, can hide ScheduledTips when that feature jar is installed, and can hide the player from the live `/map` when `1MB-MapHide` is installed.

For private messages, RecordingMode does not rely only on CMI's `acceptingPM` option. Operators or staff may inherit CMI bypass permissions, so the plugin also watches common private-message commands such as `/msg`, `/tell`, `/w`, `/pm`, `/m`, `/r`, and `/cmi msg`. When `msg` is off, it cancels outgoing private messages from the recording player and cancels incoming private-message commands targeting an active recording player.

## Features

- `/recording` toggles recording mode on or off.
- Per-player preferences persist in shared playerdata.
- Defaults can disable PMs, TPA requests, money requests, staff messages, NotableMsg `/n` messages, and ScheduledTips while recording.
- `/recording set <channel> <on|off>` controls what stays enabled while recording.
- `/recording set staffmsgs <on|off>` controls whether `/s` staff messages stay visible while recording.
- `/recording set notablemsgs <on|off>` is offered in tab completion when `1MB-CMIAPI-NotableMsg` is installed and enabled.
- `/recording set tips <on|off>` is offered in tab completion when `1MB-CMIAPI-ScheduledTips` is installed and enabled.
- `/recording set map <on|off>` is offered in tab completion when `1MB-MapHide` is installed and enabled.
- Previous CMI PM/TPA/money option states are captured and restored when recording mode turns off.
- Live `/map` visibility is set through `1MB-MapHide` from console using `/bmpc hide <player>` while recording and `/bmpc show <player>` when recording mode is disabled.
- Common private-message commands are guarded so CMI operator/staff bypasses do not leak messages through recording mode.
- Active recording state reapplies on join when configured.
- CMI staff messages are filtered with `CMIStaffMessageEvent` receiver removal while recording.
- `/recording status` shows the recording state across multiple colored lines. Preference entries have hover text explaining what on/off means, and players with `onembcmi.recordingmode.set` can click an entry to toggle it.
- Successful `/recording set` changes refresh the status panel again after a short delay, so click-to-toggle users immediately see the new state and can toggle it back.
- Player-facing chat output uses the shorter `Recording` prefix while debug metadata and docs keep the technical `RecordingMode` feature name.
- Player-facing info/help text describes quiet personal messages, TPA requests, money requests, and staff messages without exposing CMI implementation details.
- Register command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/recording
/recording status
/recording help
/recording set msg <on|off>
/recording set tpa <on|off>
/recording set money <on|off>
/recording set staffmsgs <on|off>
/recording set notablemsgs <on|off>
/recording set tips <on|off>
/recording set map <on|off>
/recording reset
/recording admin inspect <online-player>
/recording admin reset <online-player>
/recording admin reload
```

Global library examples:

```text
/1mbcmi debug plugin recordingmode
/1mbcmi debug plugin recordingmode all
/1mbcmi config recordingmode
/1mbcmi config set recordingmode defaults.tpa true
/1mbcmi config set recordingmode defaults.bluemap false
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.recordingmode.use
onembcmi.recordingmode.set
onembcmi.recordingmode.admin
onembcmi.recordingmode.admin.inspect
onembcmi.recordingmode.admin.reset
onembcmi.recordingmode.admin.reload
```

`onembcmi.recordingmode.use` and `onembcmi.recordingmode.set` default to false, so the server must grant them intentionally.

## Placeholders

```text
%onembcmi_recordingmode.enabled%
%onembcmi_recordingmode.active%
%onembcmi_recordingmode.preference.msg%
%onembcmi_recordingmode.preference.tpa%
%onembcmi_recordingmode.preference.money%
%onembcmi_recordingmode.preference.staffmsg%
%onembcmi_recordingmode.preference.notablemsg%
%onembcmi_recordingmode.preference.tips%
%onembcmi_recordingmode.preference.bluemap%
%onembcmi_recordingmode.active.count%
%onembcmi_recordingmode.cache.size%
```

## CMI / CMILib Usage

CMI-API:

- `CMIUser#getOptionState` captures existing CMI player option states.
- `CMIUser#setOptionState` applies recording mode to `acceptingPM`, `acceptingTPA`, and `acceptingMoney`.
- `CMIStaffMessageEvent` removes active recording players from CMI staff-message receivers when `staffmsg` is off.
- NotableMsg reads the shared `recordingmode.preferences.notablemsg` playerdata key and skips active recording recipients when it is off.
- ScheduledTips is controlled through the shared `ScheduledTipsControl` library service when that jar is installed.
- Live `/map` visibility is handled through the optional `1MB-MapHide` plugin by dispatching its `/bmpc hide <player>` and `/bmpc show <player>` commands from console. RecordingMode does not compile against BlueMap or the MapHide project directly.

CMILib:

- CMILib is a runtime dependency through CMI and the shared library stack.

Paper:

- Paper command, event, YAML, and Adventure MiniMessage output APIs are used.
- Player input is restricted to known channels and boolean values.

## Config

Important config paths:

```text
enabled
defaults.msg
defaults.tpa
defaults.money
defaults.staffmsg
defaults.notablemsg
defaults.tips
defaults.bluemap
bluemap.enabled
bluemap.plugin-name
bluemap.command-root
bluemap.allowed-command-roots
bluemap.show-on-disable
restore.previous-cmi-options
apply-active-state-on-join
enforce-private-messages.enabled
enforce-private-messages.block-sender-when-msg-off
enforce-private-messages.commands.direct
enforce-private-messages.commands.reply
enforce-private-messages.commands.cmi-root
```

Defaults describe whether a channel remains enabled while recording mode is active. For example, `defaults.tpa: true` means TPA requests stay enabled during recording.

Player-facing channel names are intentionally narrow: `msg`, `tpa`, `money`, `staffmsgs`, `notablemsgs`, `tips`, and `map`. The saved config/playerdata keys remain `staffmsg`, `notablemsg`, and `bluemap` for compatibility with existing RecordingMode data.

The player command for map visibility is `/recording set map <on|off>`. `defaults.bluemap: false` means the player is hidden from the live `/map` during recording mode. If `1MB-MapHide` is not installed or `bluemap.enabled` is false, the channel is shown as unavailable and is not tab-suggested.

`bluemap.command-root` is only the command root, usually `bmpc`; RecordingMode always appends the safe `hide|show <player>` action itself instead of accepting arbitrary console command templates. The root must also exist in `bluemap.allowed-command-roots`, which defaults to only `bmpc`.

`enforce-private-messages.*` provides the command-level guard for servers where CMI allows operators or staff to bypass `acceptingPM`. Keep this enabled for the strictest recording mode behavior.

## Data

Shared long-lived playerdata:

```yaml
uuid: "player-uuid"
name: "PlayerName"
recordingmode:
  active: true
  preferences:
    msg: false
    tpa: false
    money: false
    staffmsg: false
    notablemsg: false
    tips: false
    bluemap: false
  previous:
    msg: true
    tpa: true
    money: true
```

## Security Notes

- The command requires explicit permissions; player permissions default to false.
- The only console command integration is the optional, sanitized `1MB-MapHide` bridge: `<command-root> hide|show <player>`.
- Only known channels can be changed by players: `msg`, `tpa`, `money`, `staffmsgs`, `notablemsgs`, `tips`, and `map`.
- Private-message command enforcement only reads the command root and target player token; it does not store private message text.
- Staff-message filtering only removes that player from the receiver set; it does not alter the original message.

## Shared Library Usage

RecordingMode uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, and debug metadata.

[Plugin index](README.md)
