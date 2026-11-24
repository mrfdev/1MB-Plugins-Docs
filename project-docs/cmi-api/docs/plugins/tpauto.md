# TPAuto module for RecordingMode

TPAuto adds a per-player toggle for automatically accepting incoming CMI teleport requests. It is meant for trusted roles such as streamers, event hosts, staff, or build-team leads who receive many `/tpa` or `/tpahere` requests and do not want to type `/tpaccept` for every request.

TPAuto listens for CMI's `CMIPlayerTeleportRequestEvent` and checks the target player's saved toggle and permissions. After a short delay it verifies the same request is pending before running `cmi tpaccept {requester}` as the target player. CMI remains responsible for request storage, cooldowns, warmups, safety checks, and teleport delivery.

The module ships in [RecordingMode](recordingmode.md) and starts dormant on a fresh installation. While recording with TPA muted, automatic acceptance pauses and the saved TPAuto preference is retained.

## Player FAQ

### What does TPAuto accept?

When enabled and permitted, it automatically accepts supported incoming `/tpa` and `/tpahere` requests. It is not a friends-only allowlist, so only leave it on when you want incoming requests accepted.

### How do I switch it on or off?

Use `/recording tpauto on`, `/recording tpauto off`, and `/recording tpauto status`. The older `/tpauto` commands work too. Access is granted to selected roles; having ordinary teleport commands does not necessarily include TPAuto.

### Does it skip teleport delays or world restrictions?

No. It accepts the request through the normal teleport system. That system still controls warmups, cooldowns, safety checks, and whether the teleport can proceed.

## Commands

Each `/tpauto` action also works under `/recording tpauto`. The RecordingMode host switch is `/recording admin module tpauto [true|false]`.

```text
/tpauto
/tpauto on
/tpauto off
/tpauto toggle
/tpauto status
/tpauto reset
/tpauto info
/tpauto help
/tpauto admin inspect <player>
/tpauto admin set <player> <on|off>
/tpauto admin reset <player>
/tpauto admin reload
/tpauto debug status
/tpauto debug commands [page]
/tpauto debug permissions [page]
/tpauto debug placeholders [page]
/tpauto debug config [page]
/tpauto debug set config <path> <value>
/tpauto debug all
```

## Example Commands

```text
/tpauto on
/tpauto status
/tpauto off
/tpauto admin inspect mrfloris
/tpauto admin set mrfloris on
/tpauto debug set config accept.tpahere true
/tpauto debug set config accept.delay-ticks 2
/tpauto debug set config notifications.requester true
```

## Permissions

```text
onembcmi.tpauto.use
onembcmi.tpauto.status
onembcmi.tpauto.admin
onembcmi.tpauto.admin.inspect
onembcmi.tpauto.admin.set
onembcmi.tpauto.admin.reset
onembcmi.tpauto.admin.reload
```

`onembcmi.tpauto.use` is intentionally `default: false`, so you can roll it out to trusted ranks only. The status command accepts either `onembcmi.tpauto.use` or `onembcmi.tpauto.status`.

## Placeholders

```text
%onembcmi_tpauto.enabled%
%onembcmi_tpauto.active%
%onembcmi_tpauto.state%
%onembcmi_tpauto.cmi.accepting_tpa%
%onembcmi_tpauto.runtime.requests%
%onembcmi_tpauto.runtime.accepted%
%onembcmi_tpauto.runtime.skipped%
%onembcmi_tpauto.online.active.count%
%onembcmi_tpauto.last.requester%
%onembcmi_tpauto.last.target%
%onembcmi_tpauto.last.action%
%onembcmi_tpauto.last.result%
%onembcmi_tpauto.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_tpauto.active%
papi parse mrfloris %onembcmi_tpauto.state%
papi parse mrfloris %onembcmi_tpauto.cmi.accepting_tpa%
```

## Config

RecordingMode reads module activation from `modules.tpauto.enabled` in `plugins/1MB-CMIAPI/RecordingMode/config.yml`. The first upgrade copies the stored standalone `enabled` setting when that host switch is first created. Use the host switch for subsequent changes to module activation.

TPAuto settings such as allowed request types and notifications are still written to:

```text
plugins/1MB-CMIAPI/TPAuto/config.yml
```

`default-enabled` sets the starting preference for a player whose UUID has no saved TPAuto data. Player commands can change their own preference once the module is active.

Important settings:

```yaml
default-enabled: false
accept:
  tpa: true
  tpahere: true
  tpaall: false
  delay-ticks: 2
  command-template: cmi tpaccept {requester}
  require-toggle-permission-during-accept: true
notifications:
  target: true
  requester: false
cmi-options:
  enable-accepting-tpa-on-toggle: true
```

`accept.command-template` is intentionally strict. It may use `{requester}`, `{target}`, and `{action}`, but it rejects MiniMessage, quotes, newlines, and unsupported command characters. The safest value is the default.

## Data

TPAuto stores per-player state in the shared playerdata file:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Section:

```yaml
tpauto:
  name: mrfloris
  enabled: true
  updated-at: 2026-05-05T06:00:00Z
  last:
    requester: SomePlayer
    action: tpa
    accepted-at: 2026-05-05T06:05:00Z
```

## CMI / CMILib / CMI-API Usage

- Uses `CMIPlayerTeleportRequestEvent` from CMI-API to detect incoming teleport requests.
- Uses `TeleportManager.TpAction` to distinguish `tpa`, `tpahere`, and `tpaall`.
- Uses `CMIUser#getOptionState` and `CMIUser#setOptionState` for CMI's `acceptingTPA` option when available.
- Uses the shared `1MB-CMIAPI-LIB` feature registry, playerdata helper, config comments, MiniMessage output, debug pages, and PlaceholderAPI routing.

## Security Notes

- The feature is permission-gated and disabled for normal players unless you grant `onembcmi.tpauto.use`.
- Player names are validated with the normal Minecraft username pattern before being used in the accept command.
- The plugin does not run arbitrary player input as console.
- The accept command runs as the target player, so CMI still controls the actual accept behavior.
- `tpaall` auto-accepting is disabled by default because it can be surprising on busy servers.

## Installation

Follow the [stopped-server upgrade steps](../installation.md#upgrade-tpauto-to-recordingmode). Install the complete tested suite including `1MB-Lib-RecordingMode`, with CMI and CMILib available. Keep the existing TPAuto settings, translations, and shared playerdata. Remove the old standalone TPAuto JAR from the plugin load path.

Check the module with `/recording admin module tpauto`. Enable it with `/recording admin module tpauto true` where desired. Grant `onembcmi.tpauto.use` to the ranks that should have it, then test with two players:

```text
/recording tpauto on
/tpa <playerWithTPAuto>
```
