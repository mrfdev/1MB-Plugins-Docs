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

## Shared GUI Presentation

- A Feature Plugin GUI control that sits beside the close-menu barrier and returns to `/menu` must use `ServerMenuButtonPresentation` for its nether-star icon, glint and explicitly non-bold text, title, and both lore lines.
- If a preserved Feature Plugin setting redirects that control to a command other than `menu`, use `itemForCommand(...)` so the presentation names the configured command without changing its dispatch behavior.
- Internal Back, Index, Overview, and pagination controls retain their feature-specific presentation and must not be treated as server-menu controls.
- Reusing the shared presentation must not bypass the Feature Plugin's existing availability, permission, owner/session, stale-view, close, quit, disable, or command-dispatch checks.

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
/1mblib debug clean playerdata plugin <plugin> --dry-run
/1mblib debug clean playerdata plugin <plugin> --confirm
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

Each feature should also register command help, permissions, placeholders, and config defaults with the shared library so `/1mblib debug plugin <id> all` stays useful as the plugin grows. A code change that adds, removes, renames, or changes behavior for any command, permission, placeholder, config path, hook, data path, jar name, version, or build number should update all matching documentation in the same change.

In-game and console output should match the docs:

- `/plugin help` should introduce the feature and show only commands available to the sender's permission level. Each visible row contains the command and its explanation; normal help must never print permission nodes inline or reveal hidden-command requirements.
- `/plugin debug` and `/plugin debug permissions [page]` should exist for every feature plugin. Permission-oriented support output belongs under debug, not normal player help.
- `/plugin debug permissions [page]` should be paginated for players and in-game staff, while console senders should receive the full permission list in one command.
- `/plugin debug commands [page]` should list every documented command with its explanation and permission node. Commands with no required node must be labeled `none (public)` rather than omitting the permission field.
- `/plugin info` and `/plugin help` should be player-friendly without exposing technical debug strings. Every `/plugin info` response must include a plain-language feature introduction, at least one logical first command, the help command, and the feature-specific `https://docs.1moreblock.com/player-guides/plugins/<slug>/` URL.
- Every feature prefix must have a logical feature-specific Unicode symbol, hover text that explains the click action, and a safe `run_command` click target. Prefer the feature's non-mutating GUI, overview, status, or list command; otherwise fall back to `/<plugin> info` or `/<plugin> help`. Prefix clicks must not directly toggle state, start scans, run debug actions, or perform privileged mutations.
- Every active feature must have a permission-locked live reload route that rereads its configuration and translations and applies plugin-specific runtime reload hooks. Prefer `/<plugin> admin reload` when an admin namespace exists, use a direct `/<plugin> reload` for a dedicated administrative root, and retain `/<plugin> debug reload` as the shared fallback. Existing aliases remain supported, direct console remains trusted, and reload failures must fail closed rather than require an immediate server restart.
- `/<plugin> admin` is optional. Add it when one command root mixes a player-facing surface with several privileged mutating or management verbs; keep existing direct forms as compatibility aliases. Omit it for read-only diagnostics, dedicated staff/server-management roots (especially underscored roots), a feature with only one small maintenance verb, or a deliberately separate admin root such as `/wikiadmin`.
- Admin/debug pages should explain current state in terms staff can act on, including category, technical introduction, docs URL, and full support debug commands where relevant.
- Feature plugins should use `messages().send(...)`, `featureInfo/error/header(...)`, and `renderFeaturePage(...)` for chat output. The global `MessageStyle.info/error/header/prefix` helpers are reserved for the shared `/1mblib` library command so feature output shows the feature's friendly name and configured Unicode symbol.
- `/1mblib debug plugin <id> commands` should match the plugin's command help.
- `/1mblib debug plugin <id> permissions` should match `plugin.yml` and repo docs.
- `/1mblib debug plugin <id> placeholders` should match PlaceholderAPI behavior and repo docs.
- `/1mblib debug plugin <id> config` should match defaults and any settable config paths.
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
