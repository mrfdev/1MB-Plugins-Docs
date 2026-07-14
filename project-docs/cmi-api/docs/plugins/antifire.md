# AntiFire

AntiFire is the 1MB-CMIAPI migration of the standalone `1MB-AntiFire` plugin. It prevents unwanted fire spread and block burn damage, lets temporary fire remain visible briefly before removing it, and preserves controlled permanent fireplaces.

The feature targets Java 25 and Paper API 26.2. The same jar is expected to remain usable on compatible later Paper 26.x releases such as 26.2.1 or 26.3, but each Paper update should still receive a startup and behavior smoke test before live deployment.

- Player guide: https://docs.1moreblock.com/player-guides/plugins/antifire/
- Public staff and technical reference: https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/antifire.md

The former standalone player-guide URL redirects to the canonical 1MB-CMIAPI feature page. The old `project-docs/antifire/` namespace is retired; current public technical documentation is published only inside `project-docs/cmi-api/` so the two copies cannot drift.

## Migration Notes

- Install `1MB-CMIAPI-AntiFire-v1.0.0-531-j25-26.2.jar`. It shares the CMI-API build number and release pipeline, but it does not require CMI, CMILib, or `1MB-CMIAPI-Lib` at runtime.
- Remove or disable the old standalone `1MB-AntiFire-*.jar`; both versions own `/_antifire` and must not run together.
- The only registered command remains `/_antifire`. No `/antifire` alias is added.
- Runtime configuration now lives at `plugins/1MB-CMIAPI/AntiFire/config.yml`.
- When the new config does not exist, AntiFire copies values from `plugins/1MB-AntiFire/config.yml` automatically before adding missing defaults and comments. It does not overwrite an existing shared config or delete the legacy file.
- The legacy `onembantifire.*` permission nodes remain accepted so existing LuckPerms grants continue working.
- AntiFire uses Paper's `STARTUP` load phase and declares `loadbefore` for CMI, CMILib, and `1MB-CMIAPI-Lib`. Its listeners, scheduler, config, and `/_antifire` command are owned locally, so a failure in any later dependency cannot prevent fire protection from enabling.
- When `1MB-CMIAPI-Lib` loads later, it discovers AntiFire through a typed Paper service and exposes a read-only summary in `/1mbcmi status`, `/1mbcmi doctor`, support bundles, and the shared PlaceholderAPI expansion. The library cannot reload, toggle, or write AntiFire config.

## Commands

```text
/_antifire
/_antifire info
/_antifire help
/_antifire debug [overview|status|runtime|health|hooks|commands|permissions|placeholders|config|all]
/_antifire debug set config <path> <value>
/_antifire reload
/_antifire toggle <key> <value>
```

Examples:

```text
/_antifire info
/_antifire debug
/_antifire debug health
/_antifire debug placeholders
/_antifire debug set config allow-permanent-soul-fire true
/_antifire reload
/_antifire toggle allow-permanent-soul-fire true
/_antifire toggle prevent-fire-spread true
/_antifire toggle extinguish-delay-ticks 60
```

`/_antifire info` is public. Bare `/_antifire` shows the trusted help page to an authorized admin and otherwise shows the public information page. Console may use all management commands.

## Permissions

Primary nodes:

```text
onembcmi.antifire.use
onembcmi.antifire.admin
onembcmi.antifire.debug
onembcmi.antifire.reload
onembcmi.antifire.toggle
```

Legacy nodes:

```text
onembantifire.admin
onembantifire.debug
onembantifire.reload
onembantifire.toggle
```

`onembcmi.antifire.use` defaults to everyone. All management nodes default to false, so operators do not receive AntiFire administration automatically. Grant the admin node only to the owner and explicitly trusted staff through LuckPerms.

## Placeholders

```text
%onembcmi_antifire.enabled%
%onembcmi_antifire.protection.fire_spread%
%onembcmi_antifire.protection.block_burn%
%onembcmi_antifire.extinguish.enabled%
%onembcmi_antifire.permanent.soul_fire%
%onembcmi_antifire.runtime.tracked_fire%
%onembcmi_antifire.runtime.prevented_spread%
%onembcmi_antifire.runtime.prevented_burn%
%onembcmi_antifire.runtime.extinguished%
```

Examples:

```text
/papi parse me %onembcmi_antifire.enabled%
/papi parse me %onembcmi_antifire.runtime.tracked_fire%
/papi parse me %onembcmi_antifire.permanent.soul_fire%
```

## Configuration

AntiFire's local `YamlConfiguration` loader preserves existing values and comments, adds missing defaults safely, and applies comments to previously undocumented keys on first creation, reload, restart, and command-driven edits. File I/O happens only during lightweight startup, explicit reload, and explicit toggle operations on the server thread; it is not part of the fire-event path or repeating cleanup scan.

```text
enabled
debug.enabled
prevent-fire-spread
prevent-block-burn
extinguish-enabled
extinguish-delay-ticks
check-interval-ticks
track-player-placed-fire
track-lightning-fire
track-lava-fire
track-other-ignite-fire
allow-permanent-soul-fire
startup-log
```

Boolean settings accept friendly command values such as `true`, `false`, `on`, `off`, `yes`, `no`, `1`, and `0`. Tick settings accept whole numbers and clamp values below 1 to 1. Changes made through `/_antifire toggle` are saved and applied immediately. Disk edits take effect after `/_antifire reload`; no full server restart is required.

## Protection Behavior

- Natural fire spread is cancelled when `prevent-fire-spread` is enabled.
- Block destruction from fire is cancelled when `prevent-block-burn` is enabled.
- Tracked player, lightning, lava, and other ignition sources are removed after the configured delay.
- Fire on netherrack remains permanent.
- Soul fire on soul sand or soul soil remains permanent only when `allow-permanent-soul-fire` is enabled.
- AntiFire does not currently prevent fire damage to players or mobs.
- Protection listeners use `EventPriority.HIGHEST`; MONITOR is reserved for read-only observation.

## Build And Data

```text
Jar: 1MB-CMIAPI-AntiFire-v1.0.0-531-j25-26.2.jar
Java target: 25
Paper API target: 26.2
Config: plugins/1MB-CMIAPI/AntiFire/config.yml
Load phase: STARTUP
Runtime dependencies: none
Optional read-only observer: 1MB-CMIAPI-Lib
```

Credits for the original standalone plugin and this migration are listed in [Credits](../credits.md).

[Plugin documentation index](README.md)
