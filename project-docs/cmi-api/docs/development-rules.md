# Development Rules

## Runtime Baseline

- Java 25+
- Paper 26.2+
- CMI installed
- CMILib installed
- CMI-API used at compile time

## API Style

- Prefer modern Paper APIs.
- Avoid deprecated Bukkit and Spigot-era calls.
- Avoid NMS unless there is a strong reason.
- Prefer CMI-API, CMILib, and Paper APIs before adding optional hooks.
- Use PlaceholderAPI, LuckPerms, and Vault only where they provide a useful missing surface.

## Security

- Treat player input as untrusted.
- Parse strict argument types.
- Allowlist config keys and placeholder paths.
- Use the shared `TextUtil` helpers for page parsing, integer checks, clamped values, joined command arguments, safe cache filenames, timestamped dump filenames, safe regex compilation, and log text sanitizing.
- Avoid arbitrary command execution.
- Do not add explicit RCON support. Owner/admin automation for this project should use direct console access or in-game owner commands only.
- Require gradual permissions for sensitive actions.
- Prefer read-only first for staff tools.
- Use dry-run and confirm flows for cleanup of long-lived data.

## Security Review Checklist

Before adding or expanding a feature plugin, confirm:

- Every command entry starts with `require(sender, "<suffix>")` before reading or exposing sensitive data.
- Player names, warp names, search strings, placeholders, style ids, and config paths are validated by allowlists or strict patterns.
- Page numbers, durations, counts, and limits are parsed through `TextUtil` and clamped where a large value could lag the server.
- Dump/log/cache filenames use `TextUtil.safeFileName(...)` or `TextUtil.timestampedFileName(...)`.
- Shared playerdata access goes through `PlayerDataStore` rather than feature-local UUID file helpers.
- Paginated command output should use `PagedListRenderer` instead of custom page math when the list is rendered directly to chat or console.
- Placeholder output and MiniMessage output escape dynamic values before rendering.
- Staff/moderation tools redact sensitive reasons unless the sender has the explicit narrower permission.
- Read-only tools do not execute CMI commands, alter CMI files, or mutate player state.
- Destructive cleanup keeps playerdata out of broad cache cleaning and requires dry-run/confirm flows.
- Every player-facing reward path calls `allowManualRewardClaim(...)` before spending or marking a claim; automatic, retry, and recovery delivery calls `prepareAutomaticRewardDelivery(...)` before commands or inventory mutation.

## Data

Cache may be cleaned globally or per plugin.

Player data should be long-lived and stored by UUID. If a plugin is removed, cleanup should remove only that plugin's section from the playerdata file.

The global cleanup command removes both the current top-level section shape and the future nested section shape:

```text
/1mbcmi debug clean playerdata plugin <plugin> --dry-run
/1mbcmi debug clean playerdata plugin <plugin> --confirm
```

Suggested player data shape:

```yaml
uuid: "00000000-0000-0000-0000-000000000000"
name-history:
  - "PlayerName"
plugins:
  afkshrine:
    enabled: true
    style: "default"
```

## Documentation

Documentation is part of the definition of done. Every buildable plugin, shared library feature, API helper, command surface, and PlaceholderAPI surface should have repo documentation and matching in-game or console metadata.

Every buildable plugin should have a docs page explaining how it uses:

- CMI-API
- CMILib
- CMI runtime behavior
- Paper APIs
- optional PlaceholderAPI, LuckPerms, or Vault hooks

Each feature should also register command help, permissions, placeholders, and config defaults with the shared library so `/1mbcmi debug plugin <id> all` stays useful as the plugin grows. A code change that adds, removes, renames, or changes behavior for any command, permission, placeholder, config path, hook, data path, jar name, version, or build number should update all matching documentation in the same change.

In-game and console output should match the docs:

- `/plugin help` should introduce the feature and show commands available to the sender's permission level, but it should not print permission nodes inline.
- `/plugin debug` and `/plugin debug permissions [page]` should exist for every feature plugin. Permission-oriented support output belongs under debug, not normal player help.
- `/plugin debug permissions [page]` should be paginated for players and in-game staff, while console senders should receive the full permission list in one command.
- `/plugin info` and `/plugin help` should be player-friendly: introduce what the feature does, suggest a logical first command, and point to help/docs without exposing technical debug strings.
- Admin/debug pages should explain current state in terms staff can act on, including category, technical introduction, docs URL, and full support debug commands where relevant.
- Feature plugins should use `messages().send(...)`, `featureInfo/error/header(...)`, and `renderFeaturePage(...)` for chat output. The global `MessageStyle.info/error/header/prefix` helpers are reserved for the shared `/1mbcmi` library command so feature output shows the feature's friendly name and configured Unicode symbol.
- `/1mbcmi debug plugin <id> commands` should match the plugin's command help.
- `/1mbcmi debug plugin <id> permissions` should match `plugin.yml` and repo docs.
- `/1mbcmi debug plugin <id> placeholders` should match PlaceholderAPI behavior and repo docs.
- `/1mbcmi debug plugin <id> config` should match defaults and any settable config paths.
- Version and build output should match the jar filename, plugin metadata, release docs, and test checklist.

## Feature Documentation Checklist

Each plugin page should include:

- Purpose and current safety boundary.
- Feature list.
- Commands and example commands.
- Permissions.
- Placeholders.
- Version, build, Java target, Paper target, and jar naming examples when relevant.
- Installation notes and dependencies.
- Compile/build notes when the plugin has special dependencies or test setup.
- Important config paths.
- Data written to shared storage or cache.
- How it uses CMI-API, CMILib, CMI runtime behavior, Paper APIs, and optional hooks.
- Notes on security/input handling.

Before considering a feature done, check:

- The plugin page under `docs/plugins/` is current.
- `docs/commands.md`, `docs/permissions.md`, and `docs/placeholders.md` are current when the global lists are affected.
- `docs/features.md`, `docs/plugins/README.md`, `docs/installation.md`, and `docs/release.md` list the feature or jar when appropriate.
- `README.md` reflects any new install/runtime jar or global convention.
- `checklist.md` contains enough test steps for staff to verify the feature.
- The in-game help/status/debug output is updated alongside the markdown docs.

[Documentation index](README.md)
