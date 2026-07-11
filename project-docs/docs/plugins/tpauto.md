# TPAuto

TPAuto adds a per-player toggle for automatically accepting incoming CMI teleport requests. It is meant for trusted roles such as streamers, event hosts, staff, or build-team leads who receive many `/tpa` or `/tpahere` requests and do not want to type `/tpaccept` for every request.

TPAuto does not teleport players itself. It listens for CMI's `CMIPlayerTeleportRequestEvent`, checks the target player's saved toggle and permissions, then runs a strict `cmi tpaccept {requester}` command as the target player after a short delay. CMI remains responsible for its own request storage, cooldowns, warmups, safety checks, and teleport behavior.

## Commands

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

The config is written to:

```text
plugins/1MB-CMIAPI/TPAuto/config.yml
```

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

Install the shared library, CMI, CMILib, and this feature jar together in `/plugins/`:

```text
1MB-CMIAPI-LIB-v1.0.0-522-j25-26.2.jar
1MB-CMIAPI-TPAuto-v1.0.0-522-j25-26.2.jar
CMI.jar
CMILib.jar
```

Restart the server, grant `onembcmi.tpauto.use` to the ranks that should have it, then test with two players:

```text
/tpauto on
/tpa <playerWithTPAuto>
```
