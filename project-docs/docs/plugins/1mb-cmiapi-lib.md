# 1MB-CMIAPI-Lib

## Purpose

`1MB-CMIAPI-Lib` is the shared runtime library for the 1MB CMI-API feature jars. It owns common diagnostics, feature registration, config visibility, translation health, shared GUI examples, safe action rules, cache cleanup, debug bundles, and PlaceholderAPI routing for global and feature placeholders.

It must be installed in `/plugins/` next to CMI, CMILib, and any 1MB CMI-API feature jars.

Feature jars without a custom local debug command inherit `/<plugin-command> debug` from this library. That fallback is permission locked to `onembcmi.<plugin>.admin` and prints plugin/build metadata, target PaperMC version, Java target, runtime Java version, server API/engine strings, required dependency/optional hook load state, and paginated commands, permissions, placeholders, and config pages.

In-game list output stays paginated so chat remains readable. Console senders receive the full list in one command for debug pages that use the shared pagination renderer, which makes support logs easier to copy and review.

Feature configs are validated and repaired through the shared `FeatureSettings` loader. Missing default keys are added safely on startup or reload while existing values are preserved. Use `/<plugin-command> debug health` or `/1mbcmi debug plugin <id> health` to see expected config keys, repaired defaults from the last reload, missing keys, and validation issues.

## Commands

```text
/1mbcmi info
/1mbcmi help
/1mbcmi version
/1mbcmi status
/1mbcmi doctor
/1mbcmi features [category]
/1mbcmi storage
/1mbcmi debug plugins [category]
/1mbcmi debug cmi
/1mbcmi debug plugin <id>
/1mbcmi debug plugin <id> health
/1mbcmi debug plugin <id> commands [page]
/1mbcmi debug plugin <id> permissions
/1mbcmi debug plugin <id> placeholders
/1mbcmi debug plugin <id> config
/1mbcmi debug plugin <id> all
/1mbcmi debug bundle
/1mbcmi debug clean cache [global|all|plugin <id>] [--dry-run]
/1mbcmi debug clean playerdata plugin <id> [--dry-run|--confirm]
/1mbcmi docs commands [all|id] [discord|github]
/1mbcmi docs permissions [all|id] [discord|github]
/1mbcmi docs all [all|id] [discord|github]
/1mbcmi config <id>
/1mbcmi config set <id> <path> <value>
/1mbcmi gui test
/1mbcmi gui examples
/1mbcmi rules [page]
/1mbcmi rules validate
/1mbcmi rules test <rule>
/1mbcmi translations reload
/1mbcmi translations status
/1mbcmi translations missing [id|all]
```

Useful examples:

```text
/1mbcmi status
/1mbcmi info
/1mbcmi version
/1mbcmi doctor
/1mbcmi features player-fun
/1mbcmi storage
/1mbcmi debug plugins staff
/1mbcmi debug cmi
/1mbcmi debug plugin socialgatherings all
/1mbcmi debug plugin filterguard commands
/1mbcmi debug clean cache plugin socialgatherings --dry-run
/1mbcmi debug clean playerdata plugin afkshrine --dry-run
/1mbcmi debug bundle
/1mbcmi docs all all github
/1mbcmi docs commands autosell discord
/1mbcmi docs permissions permissionprobe github
/1mbcmi config socialgatherings
/1mbcmi config set socialgatherings feedback.default-cooldown-seconds 30
/1mbcmi gui test
/1mbcmi gui examples
/1mbcmi rules
/1mbcmi rules validate
/1mbcmi rules test welcome-test
/1mbcmi translations status
/1mbcmi translations missing all
/1mbcmi translations reload
```

## Permissions

```text
onembcmi.global.use
onembcmi.global.status
onembcmi.global.doctor
onembcmi.global.features
onembcmi.global.storage
onembcmi.global.debug
onembcmi.global.debug.bundle
onembcmi.global.clean.cache
onembcmi.global.clean.playerdata
onembcmi.global.config
onembcmi.global.config.set
onembcmi.global.docs
onembcmi.global.gui
onembcmi.global.rules
onembcmi.global.translations
```

## Generated Command And Permission Docs

The library can write review snapshots from loaded runtime metadata:

```text
/1mbcmi docs commands [all|id] [discord|github]
/1mbcmi docs permissions [all|id] [discord|github]
/1mbcmi docs all [all|id] [discord|github]
```

The output is Markdown written under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/cache/global/docs/
```

`discord` output uses compact bullets for staff discussion. `github` output uses tables for docs review. The generator compares runtime command help and plugin.yml command metadata against plugin.yml permission declarations, then adds review notes when command metadata references undeclared permission nodes.

The command is read-only. It does not edit private docs or the public GitHub Pages checkout automatically.

## Shared Audit Redactor

Generated support artifacts use the shared audit redactor before writing to disk. `/1mbcmi debug bundle` now redacts common secrets, Discord webhook URLs, bearer tokens, JDBC connection strings, IP addresses, email-looking strings, and private-message-like fields by default. Money-like fields are configurable but off by default because economy reports often need those values.

Default config paths:

```yaml
audit-redactor:
  enabled: true
  redact-ips: true
  redact-emails: true
  redact-private-message-fields: true
  redact-money-fields: false
  custom-patterns: []
```

Feature plugins can reuse the shared redactor through the library for future exports and debug files. Generated files should still be reviewed before public sharing.

## Permission Diagnosis

The dedicated [PermissionProbe](permissionprobe.md) feature plugin owns permission diagnosis through `/_permissions`. The old `/1mbcmi permissions ...` command is kept only as a compatibility redirect and tells admins to use `/_permissions`.

## Shared Action Rules

Action rules are a small reusable rules engine for "when this happens, do that action" feature logic. The first version is intentionally conservative: rules live in the library config, validate against known action types, and `/1mbcmi rules test <rule>` previews what would happen without dispatching console commands.

Default config path:

```text
plugins/1MB-CMIAPI/CMIAPILIB/config.yml
```

Default rule format:

```text
id|trigger|conditions|actions|description
```

Examples:

```text
welcome-test|manual|player|message:Welcome to a safe 1MB CMI-API rule preview.|A tiny player-only test rule.
support-note|manual|permission:onembcmi.global.rules|note:Open /1mbcmi debug bundle when preparing support info.|A staff note rule for support workflows.
```

Supported conditions:

```text
none
player
console
permission:<permission.node>
world:<world_name>
```

Supported safe action types by default:

```text
message:<text>
note:<text>
title:<title text>
sound:<sound_key[:volume[:pitch]]>
permission-note:<permission.node>
```

`command:<command>` is validated but disabled by default through `rules.allow-console-commands: false`. Even when command actions are enabled for a future workflow, `/1mbcmi rules test <rule>` still previews them only.

## Prefix Unicode Locale

The shared library can add a small Unicode symbol to global and feature-plugin chat prefixes. These symbols are configured centrally in:

```text
plugins/1MB-CMIAPI/CMIAPILIB/config.yml
```

Important paths:

```yaml
locale:
  prefix-unicodes:
    enabled: true
    fallback: "✦"
    global: "✦"
    birthdaylanterns: "✦"
    passportdiscovery: "✎"
    scheduledtips: "ⓘ"
    pvptoggle: "⚔"
    nick: "✎"
    lavaboots: "♨"
    potions: "⚗"
    upgrade: "⇧"
    tpauto: "⇥"
    boosters: "✦"
    staffmsg: "⚜"
```

When enabled, `{prefix}` output is composed from the shared config instead of requiring every feature translation file to hard-code a symbol. Example:

```text
[✎ PassportDiscovery] New stamps collected.
[ⓘ ScheduledTips] Scheduled tips are now hidden for you.
[⚔ PvP] PvP is now enabled.
[✎ Nick] Saved your nickname as MyName with style Aurora.
[♨ LavaBoots] LavaBoots activated. Sneak to brake, sprint for a short burst.
[⚗ Potions] Created 1 Potion for mrfloris.
[⇧ Upgrade] DrPeanut11 might be eligible for Player from New.
[✦ Birthday] You have 2 lantern rewards ready.
[✦ Boosters] Current booster status:
[⚜ 1MBStaffMsg] Recent Staff Messages:
```

Use simple monochrome Unicode symbols for best Minecraft font compatibility. If a symbol renders badly for a client or resource pack, replace that config value with another symbol or leave it blank.

Feature plugins should send player-facing chat through `messages().send(...)`, `featureInfo/error/header(...)`, or `renderFeaturePage(...)` in `AbstractCmiApiFeaturePlugin`. The static global `MessageStyle.info/error/header/prefix` helpers are reserved for the shared `/1mbcmi` library command; using them in a feature plugin will show the generic `1MB CMI-API` prefix instead of the feature's friendly prefix.

## Global GUI Theme

The shared library owns the default pane material for feature-plugin GUIs. This lets live menus change from hard-coded gray or black panes to one consistent visible color on restart, while still allowing a feature to opt out when a future GUI needs a special theme.

Shared config path:

```yaml
gui:
  filler-material: LIGHT_BLUE_STAINED_GLASS_PANE
  border-material: LIGHT_BLUE_STAINED_GLASS_PANE
```

Feature plugins that support the shared theme use:

```yaml
gui:
  use-global-filler-material: true
```

When `use-global-filler-material` is `true`, the feature ignores its local filler material and uses the shared library value. When it is `false`, the feature uses its own configured filler material. Invalid materials, non-item materials, or non-pane materials fall back safely to `LIGHT_BLUE_STAINED_GLASS_PANE`.

Current GUI features using the shared theme include VoteTokens, GameTypes, and Exchange.

Shared GUI buttons also normalize display names and lore for item tooltips. `GuiButton.item(...)` and `GuiButton.playerHead(...)` render names and lore without Minecraft's default italic styling, strip legacy color codes, and apply soft tooltip colors for readable `key: value` lines, clickable call-to-action lines, and `ok`/`missing` style status values. Feature plugins should use these shared helpers for ordinary GUI buttons so menus keep a consistent readable tooltip style.

## Placeholders

```text
%onembcmi_global.status.loaded%
%onembcmi_global.plugins.count%
%onembcmi_global.runtime.count%
%onembcmi_global.features.enabled.count%
%onembcmi_global.features.lib.count%
%onembcmi_global.features.player-fun.count%
%onembcmi_global.features.staff.count%
%onembcmi_global.features.server-management.count%
%onembcmi_global.features.generic.count%
%onembcmi_global.cmi.version%
%onembcmi_global.cmilib.version%
%onembcmi_global.hooks.cmi.loaded%
%onembcmi_global.hooks.cmilib.loaded%
%onembcmi_global.hooks.luckperms.loaded%
%onembcmi_global.hooks.vault.loaded%
%onembcmi_global.placeholderapi.loaded%
%onembcmi_global.placeholderapi.registered%
%onembcmi_global.cache.size%
%onembcmi_global.cache.global.size%
%onembcmi_global.cache.plugins.size%
%onembcmi_global.playerdata.size%
```

## Categories

Valid category filters:

```text
lib
player-fun
staff
server-management
generic
```

## Data

The shared library owns common storage under:

```text
plugins/1MB-CMIAPI/CMIAPILIB/
plugins/1MB-CMIAPI/CMIAPILIB/cache/
plugins/1MB-CMIAPI/CMIAPILIB/debug/
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/
plugins/1MB-CMIAPI/CMIAPILIB/translations/
```

Feature plugins own their feature folders under:

```text
plugins/1MB-CMIAPI/<FeatureName>/
```

## CMI / CMILib Usage

CMI:

- Reports CMI loaded state and plugin version.
- Gives feature plugins a common runtime dependency next to CMI and CMILib.
- Exposes `playerStateService()` so standalone or feature plugins can query CMI-backed player state through one helper. The service reports CMI god/timed-god, vanish, Bukkit invulnerability, availability, and a short status string without exposing CMI classes in its returned record.

CMILib:

- Reports CMILib loaded state and plugin version.
- Remains a required runtime dependency for the CMI stack.

PlaceholderAPI:

- Registers the `onembcmi` expansion when PlaceholderAPI is loaded.
- Routes global placeholders and feature placeholders.

Paper:

- Uses Paper command, inventory GUI, plugin metadata, filesystem, YAML, and Adventure MiniMessage APIs.

## Safety

- Debug bundles are sanitized support artifacts.
- Cache cleanup is separated from long-lived playerdata cleanup.
- Playerdata cleanup requires plugin-scoped paths and supports dry-run/confirm flows.
- Config writes are restricted to paths registered by feature defaults.
- Shared GUI inventories use custom inventory holders, inspect holders through Paper's direct holder API, cancel protected clicks/drags, and delay close-button closes by a few ticks so close handling does not run inside the same click event.

[Plugin index](README.md)
