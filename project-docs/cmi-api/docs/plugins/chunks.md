# Chunks

## Purpose

Chunks changes the **server-side chunk data sent to your client** around your player. Your Minecraft video settings still control the render distance your client requests and displays. Selecting more chunks here does not raise a lower client render-distance setting. View distance is measured outward from the player in chunks; it is a radius, not a total number of chunks. See [Paper's view-distance reference](https://docs.papermc.io/paper/reference/server-properties/#view-distance).

**Client-cached scenery can remain visible after you lower `/chunks`.** [Bobby](https://github.com/Johni0702/bobby) keeps previously received chunks on your computer; [Distant Horizons](https://modrinth.com/mod/distanthorizons) can retain distant terrain as lower-detail scenery. Changing the server's view distance does not erase those caches. Cached scenery can be old and does not keep distant entities, farms, or redstone active.

Start with **4 or 6** on Bedrock devices, older Java computers, or a limited connection. Builders with a capable computer and a fast, stable connection can try **16** for wide screenshots, with client render distance set high enough. Results depend on the client, world, and connection; a higher number is not always smoother.

For Java players who want a longer view while keeping a low server-side distance, we recommend [Fabric Loader](https://fabricmc.net/use/installer/) with a compatible [Bobby release](https://modrinth.com/mod/bobby). Try a client render distance of **32 chunks**, or a lower value that your computer handles comfortably. Bobby displays terrain the server has already sent as you explore; it does not make `/chunks` request 32 live chunks. Match the loader, mod, and required dependencies to your Minecraft client version.

The feature supplies a small `/chunks` GUI and keeps the familiar `/chunks less`, `/chunks more`, and `/chunks reset` commands. Every change uses CMI's explicit `view` mode. **It never changes simulation distance.** The intended server simulation distance remains 4; that is managed by the server's own configuration.

Player guide: [Chunks on docs.1moreblock.com](https://docs.1moreblock.com/player-guides/plugins/chunks/).

## How Players Use It

Open `/chunks`, choose one of the displayed distances, and wait for the change to finish. The default choices are Less **4**, Less **6**, **Reset**, More **12**, and More **16**. Reset removes your personal preference and follows the current world's server default, which may differ between worlds.

Available features include:

- A compact menu with the shared light blue glass border, your player head at the bottom left, a help book at the bottom center, and a glowing **Back to /menu** nether star immediately left of the close barrier at the bottom right.
- Two lower-distance choices, a reset button, and two higher-distance choices by default.
- Book hover text explaining whether to reset, decrease, or increase the server-sent distance.
- Legacy text shortcuts for players who prefer commands.
- A personal preference remembered across reconnects.
- A short change cooldown and a busy state while the previous change is being confirmed.
- Status, help, and an information page explaining client settings and cached chunks.

Only the choices currently enabled by staff can be selected. The plugin rejects an unlisted number, a number outside **4–16**, and a bare command such as `/chunks 32`. The words `less` and `more` name the preset groups; repeatedly using `/chunks more` does not keep increasing the distance.

Reset also requires the current world's default to be within 4–16. If a world is configured outside that range, staff must resolve that configuration before this feature can reset a player there.

## Player Commands

| Command | Behavior with the default configuration |
| --- | --- |
| `/chunks` | Open the menu. |
| `/chunks less` | Select 4. |
| `/chunks less 4` | Select the enabled Less 4 preset. |
| `/chunks less 6` | Select the enabled Less 6 preset. |
| `/chunks more` | Select 12. |
| `/chunks more 12` | Select the enabled More 12 preset. |
| `/chunks more 16` | Select the enabled More 16 preset. |
| `/chunks reset` | Follow the current world's server default. |
| `/chunks status [page]` | Inspect your current preference and view-distance state. |
| `/chunks info [page]` | Read the feature introduction and player guide link. |
| `/chunks help [page]` | Show available commands with pagination. |

Examples:

```text
/chunks
/chunks less
/chunks less 6
/chunks more 16
/chunks status
/chunks reset
/chunks help 2
```

The configured preset list is authoritative. Staff may remove an option when it causes problems or add another approved value within 4–16. A value in range is still rejected if it is not an enabled preset in the requested group.

## Player FAQ

### How do I start, and which option should I choose?

Run `/chunks`. Try **4** or **6** for Bedrock devices, slower computers, or a limited connection. Try **12** or **16** for a wider view on a capable computer and connection. Use **Reset** whenever you want the server's normal choice for your current world.

### Why can I still see far away after choosing fewer chunks?

Bobby can show chunks saved on your computer, and Distant Horizons can show saved distant terrain. `/chunks` changes new chunk data sent by the server; it does not clear those client caches. Lower your client render distance or the mod's own distance setting as well if you want less scenery rendered.

### Why did choosing 16 not make me see farther?

Your Minecraft client must also have a high enough render-distance setting. The server, your client, and your connection all affect what you can see. Check your video settings, wait for terrain to arrive, and use `/chunks status` to check the server-side setting.

### Does this change simulation distance or keep distant farms running?

No. This menu changes view distance only. Simulation distance is controlled separately by the server, and cached terrain does not keep distant gameplay active.

### Will my choice survive leaving the server?

Yes, a successfully confirmed personal preference is remembered across reconnects. **Reset** returns to server defaults. Staff can change which presets are offered, so a retired preset may no longer be available when you return.

### Why does the menu ask me to wait before changing again?

The server must save and confirm one preference before accepting the next. Wait for that operation and its short cooldown, then choose another option. Repeated clicks do not make the change faster. If it remains unavailable, give staff the message shown and use `/chunks status`.

### Can I use 7, 32, or another custom number?

Only the current menu choices are allowed. `/chunks 32` is not supported, and this feature never offers a value outside 4–16. Run `/chunks` to see the available choices.

### Can I keep `/chunks less` but see 32 chunks with Bobby?

On Java, yes: a compatible Fabric and Bobby setup can show previously visited chunks beyond the server's live view distance. Try a client setting of 32 if your computer can handle it, and lower it if performance suffers. You still need to explore to receive and cache terrain. This does not increase the server-side `/chunks` limit.

## Compile and Install

Chunks is part of the 1MB Library suite and requires the matching Shared Library, CMI, CMILib, LuckPerms, Java 25, and Paper 26.2. PlaceholderAPI is optional for external placeholder use. See the [exact dependency and CMI behavior baseline](../compatibility-tests/chunks-26.2.md) for the version checks and read-only server observations. Verify dependency builds against the current release documentation before deployment; obtain paid CMI downloads through the licensed owner's normal source.

Focused development verification is allowed:

```bash
gradle :plugins:player-fun:chunks:test
```

A distributable build is always the complete suite. **Stop the maintained Paper test server first**, then run:

```bash
scripts/build-all.sh
```

The canonical workflow reserves one shared build number, aligns the latest stable Paper build within the configured **26.2** target, runs the full build and tests, and synchronizes the complete managed JAR set to `servers/Paper-26.2/plugins/`. A module-only JAR or an unnumbered `gradle build` result is development feedback, not a deployable handoff. See [compiling](../compiling.md) and [installation](../installation.md).

Install Chunks with the same-build Shared Library and the required dependencies during a stopped-server deployment. Do not use a hot plugin loader. Start the test server, check feature health, grant player access intentionally, and complete the acceptance checks below. After gameplay acceptance, stage the exact tested set for manual live deployment:

```bash
gradle stageTestedJarsForLive
```

## Replacing the CMI Alias

Before activating `/chunks` on the live server, back up the CMI alias configuration and retire the legacy `chunks` alias and its `more`, `less`, and `reset` routes. Check other command-alias plugins and `commands.yml` for the same root. Preserve unrelated aliases. The maintained test server does not need the old alias.

Grant only the feature's player access node. Ordinary players should not receive CMI's unrestricted `cmi.command.viewdistance` or `cmi.command.viewdistance.others` permissions as part of this setup. A staff member with separately granted CMI access can still use CMI manually; this feature deliberately provides no over-16 override.

Verify that `/chunks` opens this feature's GUI and `/chunks less` selects its configured default. On an explicit choice, Chunks replaces only direct, positive, permanent, context-free `cmi.viewdistance.1` through `cmi.viewdistance.64` user nodes, including legacy alias preferences. Other permissions remain untouched. After reset and reconnect, check that the server/world default is used and that legacy personal view-distance permissions are not silently reapplying an old choice.

Inherited, temporary, contextual, or explicitly false view-distance nodes remain under staff control. If the concrete numeric preference visible to CMI conflicts with the requested choice, Chunks blocks that operation and asks staff to inspect LuckPerms. Use `/chunks admin inspect <player|uuid>` to see the attempted value and the relevant permission sources captured at rejection. A staff wildcard such as `*`, `cmi.*`, or `cmi.viewdistance.*` does not itself select 64 chunks and does not need to be removed to use this feature. Do not solve a real numeric conflict by granting players unrestricted CMI command access.

CMI must own its command, and the recipient must be the current player's exact server username. A name matching a CMI world/alias or a reserved command word (`reset`, `update`, `view`, `simulation`, or `-s`) is blocked before permissions change, because CMI would interpret it as something other than the intended recipient. LuckPerms always uses the authoritative server UUID, including for Bedrock and renamed accounts.

## Staff Commands

| Command | Purpose |
| --- | --- |
| `/chunks admin` | Show the staff overview. |
| `/chunks admin status [page]` | Review feature state and pending changes. |
| `/chunks admin health [page]` | Check dependencies and readiness. |
| `/chunks admin choices [page]` | List the active preset groups and their shortcut defaults. |
| `/chunks admin add <less\|more> <4..16>` | Add a preset within the hard safety range. |
| `/chunks admin remove <less\|more> <preset>` | Retire an existing preset. |
| `/chunks admin default <less\|more> <preset>` | Change the preset used when the number is omitted. |
| `/chunks admin reload` | Reload feature configuration and preset data. |
| `/chunks admin inspect <player\|uuid> [page]` | Inspect the latest retained failed attempt, its permission sources, and the player's current state when online. |
| `/chunks admin retry <online-player>` | Retry recovery for a player whose change needs attention. |
| `/chunks debug [section] [page]` | Read shared overview, health, hooks, commands, permissions, placeholders, config, or all metadata. |
| `/chunks debug enable true` | Activate a dormant installation through the shared feature lifecycle. |

New installations follow the shared dormant-by-default feature lifecycle. Enable Chunks intentionally after dependency and access checks. In-game text pages support pagination; use the navigation or requested page number. There is one compact GUI page with the default five choices.

Examples:

```text
/chunks debug enable true
/chunks admin health
/chunks admin inspect <server-uuid>
/chunks admin inspect <exact-player-name> 2
/chunks admin choices
/chunks admin remove more 16
/chunks admin add less 5
/chunks admin default less 5
/chunks admin reload
/chunks debug commands 1
/chunks debug permissions 1
/chunks debug placeholders 1
/1mblib debug plugin chunks all
```

Retiring **16** removes that choice from player input and menu actions, closes existing Chunks views, and reconciles online players. A saved preference that is no longer offered is reset; offline players reconcile on their next join. Removing a group's shortcut default selects the smallest remaining value automatically, or leaves that group empty. The lower and upper bounds are code-level policy: changing configuration or using a staff `/chunks admin` route cannot introduce 3 or 32. To provide an exceptional value outside this feature, a separately authorized staff member must use CMI directly and manage that exception outside Chunks.

## Inspecting a Failed Change

Run `/chunks admin inspect <player|uuid> [page]` after a player reports a failed choice. This read-only command requires `onembcmi.chunks.admin`. It accepts a canonical server UUID, an exact online username, or an exact username retained with a failure. Name comparisons allow different capitalization and preserve the Floodgate prefix. Ambiguous names are rejected; inspect the authoritative server UUID instead. Inspection does not load offline player records or query an external identity service.

The report separates **the failed attempt** from **current state**, which may have changed since that failure. It includes:

- The failure's UTC timestamp, unique reference UUID, player name and server UUID, attempted preset or reset, operation stage, and reason.
- Runtime state at failure when available: world, player view distance, world default, simulation distance, and operator status.
- LuckPerms evidence for the rejected choice, including the requested value, numeric permission-map maximum, separately labelled wildcard-aware access-check maximum, active contexts, relevant exact nodes, user or group origin, parent-group wildcard grants, values, and expiry. Conflict evidence is captured before rollback so restoring the old preference does not erase the cause.
- A separate current runtime and LuckPerms snapshot if the player is online. An offline player still has the retained failure, with current state explicitly unavailable.

Each failure report is written to the server log with a shared `[Chunks diagnostic <reference-uuid>]` prefix. Search that reference to collect its related log lines. An identical failure for the same UUID within **30 seconds** writes a one-line summary linking the previous full report; `/chunks admin inspect` still retains the complete latest snapshot. A changed request, stage, reason, or captured state writes the full report immediately. Logs are retained according to the server's normal log rotation; the in-game report is a bounded memory cache, not an on-disk history viewer.

Chunks retains the latest failure for each UUID, up to **128 players** since plugin load. Logout, a later successful choice, and disabling/re-enabling the feature do not erase that failure. A newer failure replaces the previous one for that UUID; the oldest retained player's entry is evicted when the limit is reached. The failure cache and the repeated-log cache are both bounded to 128 players. A full server restart discards the memory cache, while existing server log files remain available. Saved diagnostic details are limited to **96 rows**, with individual text values sanitized and shortened to **400 characters**; truncation is indicated rather than silently presented as a complete permission inventory.

The two maxima answer different questions. The **numeric permission-map maximum** is the highest positive concrete `cmi.viewdistance.<number>` entry visible to CMI in the current permission context. The **wildcard-aware access-check maximum** asks whether individual permission checks succeed and is diagnostic only. A staff player with `* = true` and a selected numeric preference of **4** can therefore show a numeric maximum of **4** and an access-check maximum of **64**. That is not a distance conflict. With only a staff wildcard and no numeric preference, reset uses **-1** and follows the world default. Operator status does not need to be changed, and the plugin leaves staff wildcard grants intact.

A concrete inherited `cmi.viewdistance.16 = true` still takes precedence over a requested **4**, so that is a real conflict. A false numeric node does not become a positive preference. Unsupported non-integer view-distance node forms remain rejected, even if CMI would parse some of them permissively; `cmi.viewdistance.*` is recognized as an access wildcard. Review actual numeric source, value, contexts, and expiry before choosing a targeted correction through the normal staff workflow. Inspection never edits permissions, retries an operation, changes a preset, or changes view or simulation distance. This distinction does not provide an administrator bypass: staff using `/chunks` still choose only the offered values within 4–16 and use the normal UUID-based save/reset and runtime confirmation.

After staff resolve the cause, inspect again to compare current state with the saved failure, then use `/chunks admin retry <online-player>` where recovery is appropriate or ask the player to choose again. A successful later attempt leaves the earlier failure available as historical evidence; its presence alone does not mean the player is still failing. Failures from builds before this reporting feature, or from before the last restart, cannot be reconstructed from a generic status message. Reproduce the issue once after installing the updated build, then inspect it and retain its log reference.

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `onembcmi.chunks.use` | false | Open the player menu and use the personal preference commands. |
| `onembcmi.chunks.admin` | op | Staff administration, read-only failure inspection, and detailed debug pages. |
| `cmi.viewdistance.<number>` | Managed per player | CMI's persistent view preference; only approved choices are set by Chunks. |

Grant a player's feature access using the actual server UUID, including Floodgate identities:

```text
/lp user <server-uuid> permission set onembcmi.chunks.use true
```

An intended LuckPerms group may be granted `onembcmi.chunks.use` through its real group id instead. Do not substitute a display name, guessed Java UUID, or a name without its Bedrock prefix when resolving a player. The plugin obtains online UUIDs directly from Paper and uses UUID-targeted LuckPerms API operations.

The CMI nodes `cmi.command.viewdistance` and `cmi.command.viewdistance.others` belong to CMI and are not required for ordinary Chunks users. Review broad inherited permissions or wildcard grants separately if unrestricted CMI commands are already accessible.

## Placeholders

The Shared Library registers these with PlaceholderAPI when it is installed:

| Placeholder | Value |
| --- | --- |
| `%onembcmi_chunks.preference%` | Saved preference: a number, `default`, or `unmanaged`. |
| `%onembcmi_chunks.view_distance%` | Current server-side player view distance. |
| `%onembcmi_chunks.client_view_distance%` | Client-reported view distance. |
| `%onembcmi_chunks.world_default%` | Current world's default view distance. |
| `%onembcmi_chunks.pending%` | Whether a preference operation is pending. |
| `%onembcmi_chunks.enabled%` | Whether the feature is enabled and ready for changes. |
| `%onembcmi_chunks.choices.less%` | Current Less presets. |
| `%onembcmi_chunks.choices.more%` | Current More presets. |

These values describe the server's state, not proof that every terrain packet is already rendered on the client's screen. `client_view_distance` does not measure Bobby's cache or Distant Horizons' separate distance setting. Distance fields return `offline` without an online player; unavailable preset lists return `unavailable`. A preference that cannot be read from the loaded LuckPerms user is shown as `unmanaged`; use staff health diagnostics when that result is unexpected.

## Configuration and Data

Feature configuration is stored under `plugins/1MB-CMIAPI/Chunks/config.yml`:

```yaml
enabled: false
cooldown-seconds: 3
confirmation-timeout-seconds: 10
```

Approved choices are stored separately in `plugins/1MB-CMIAPI/Chunks/presets.yml` and saved atomically off the server thread:

```yaml
less: [4, 6]
more: [12, 16]
default-less: 4
default-more: 12
```

Prefer the staff add/remove/default commands to hand editing. Values must be unique across both groups, and the chosen shortcut default must remain an approved preset. An empty group uses the internal default `-1` and offers no distance choice. Cooldown configuration accepts 1–60 seconds; confirmation timeout accepts 2–60 seconds. Preset reloads and edits invalidate stale choices; clicking an old menu does not restore a retired option.

LuckPerms stores the personal preference under the `1mb-chunks-preference` metadata key together with the managed CMI numeric view-distance permission. Changes are serialized per authoritative player UUID. Chunks waits for persistence and runtime confirmation before completing the request; the cooldown prevents rapid switching after a completed change. Reset removes the numeric permission, saves the metadata sentinel `-1`, and applies CMI's `-1` value for the server/world default. The marker distinguishes a player who deliberately reset from a player whose view distance Chunks has never managed.

## CMI, LuckPerms, and Paper Integration

CMI performs the view-distance change from console using the constrained form:

```text
cmi viewdistance <approved-distance|-1> <online-player-name> view
```

The last argument is always the literal `view`. No arbitrary command template, player-supplied recipient, world target, or `simulation` option is accepted. A current authoritative online name is used only where CMI requires that recipient argument; LuckPerms identity remains the player's server UUID. Names must fit the supported server-name format, preserving a Floodgate dot prefix. If a name collides with a CMI world name or alias, the feature refuses the command because CMI may resolve that name as a world. Staff must resolve the collision first.

Dispatch acceptance alone does not count as delivery. The feature confirms the numeric entries in LuckPerms' contextual permission map, invalidates and rereads CMI's permission cache, and waits at least 15 ticks before checking Paper's resulting player view distance. Wildcard-expanded access checks appear only in diagnostics; they are not treated as a selected distance. The feature checks that simulation distance did not change during confirmation. Reset is checked against the current world's default; a world change triggers another reconciliation.

LuckPerms supplies durable personal permissions and metadata through its API. CMI/CMILib remain runtime dependencies; the feature does not require client mods. Paper provides player/world view-distance inspection, inventory ownership, events, and main-thread scheduling for player and GUI operations. Persistence work runs asynchronously. The Shared Library supplies feature lifecycle, configuration, translations, safe GUI conventions, pagination, command/permission/debug metadata, and optional PlaceholderAPI routing.

## Safety and Recovery

GUI actions use a server-owned inventory/session and current preset state. Item names, lore, or client-supplied slot contents are not authority. Every change rechecks permission, player/session identity, current allowed presets, in-flight state, and cooldown. Inventory interaction is cancelled before any permitted menu action is considered.

Only one change runs per player while its persistence and runtime effect are being checked. A failure or timeout remains visible as a failed or pending operation instead of being presented as a successful preference. Staff use `/chunks admin status` and `/chunks admin health` for the overview, then `/chunks admin inspect <player|uuid>` for the latest failed attempt and its logged reference. After a runtime application problem is resolved, `/chunks admin retry <online-player>` reconciles that player's saved preference. Reconnects and retries preserve the original UUID.

A slow LuckPerms save remains locked until its future completes; reaching the confirmation timeout does not unlock an unresolved write. If saving fails, the feature attempts to restore its prior managed nodes and persist that restoration. If staff changed those nodes during the failure, it avoids overwriting their intervening changes. Failed or ambiguous compensation enters `recovery-required` and remains locked. The retry command deliberately does not bypass that lock: inspect and repair the affected LuckPerms data, then use a clean server restart to reinitialize and reconcile it.

The intended preference is durable in LuckPerms before CMI application. A crash after that save can be recovered by applying the same preference on the next join. Pending gates, cooldowns, and retained failure snapshots are held in memory; they are not a separate on-disk transaction journal. Failure reports also write the player's UUID and diagnostic reference to the server log. Successful preference application does not consume or award items, money, or rewards.

Reset follows the world default rather than hard-coding 6 or 8. World-specific server configuration remains authoritative. Chunks does not edit `server.properties`, Spigot/Paper world configuration, or any simulation-distance setting.

## Manual Acceptance

Use an ordinary permitted player and an unauthorized player, a Java account, and a Floodgate/Bedrock account. Repeat identity tests after a Java account rename; LuckPerms operations must still target the authoritative server UUID and must never query an external identity service.

- Select each enabled preset through both GUI and commands; inspect CMI/Paper view state, the saved preference, and the effective LuckPerms node. Verify simulation distance stays unchanged through every selection, reset, reconnect, and world change.
- Reject bare numbers, unsupported argument counts, malformed numbers, values 3/7/17/32/111 when not explicitly allowed, and a valid number in the wrong preset group.
- Remove a preset while an old GUI is open. Its old button must not apply it. Restore or add an allowed preset in game and verify new GUI/help/tab output uses the current list.
- Spam alternating options by GUI and commands. Exactly one operation should proceed per player while busy, followed by the configured cooldown. Test two different players concurrently without cross-applying preferences.
- Try shift-click, drag, double-click, number-key swaps, offhand swaps, dropping, creative inventory actions, and clicking the player's own inventory. No menu item may be taken, deposited, duplicated, or interpreted by its display name as authority.
- Close the menu, quit, reconnect, die, change worlds, revoke access, or reload during an operation. Confirm stale GUI actions are rejected and durable preference state is reconciled without repeated or cross-player delivery.
- Test persistence failures, a CMI command failure, a delayed LuckPerms update, plugin disable, clean restart, and an interrupted change. A command dispatch return value alone must not be reported as success.
- Inspect a failed request with conflicting inherited numeric, contextual, temporary, and explicit-denial permissions. Match the requested value, numeric maximum, contexts, source, value, expiry, and reference against the console log, including with `op=false`. Compare evidence captured before rollback with current state after staff repair.
- With staff `*`, `cmi.*`, and `cmi.viewdistance.*` grants, verify that an allowed numeric choice and reset work without changing global permissions. Inspect the separately labelled access-check maximum, which may be 64 while the numeric maximum is 4 or -1. A real higher numeric grant must still block a conflicting choice; non-integer numeric forms remain rejected and no staff `/chunks` route may bypass the preset range.
- Inspect the retained failure after logout, a later successful choice, and feature disable/re-enable. Test canonical UUID lookup, exact Java and `.bedrock` names, ambiguous retained names, pagination, the bounded cache, and restart behavior. No inspection may edit permissions, load offline identity data, or perform an external lookup.
- With a full inventory and items containing container/data components or third-party metadata, open and use the menu. Player items must remain byte-for-byte functionally unchanged.
- Check the blue border, bottom-left head, bottom-center help-book lore, and glowing return star immediately left of the bottom-right close barrier. Check Java/Bedrock presentation, pagination on help/admin/debug pages, and the external player-doc and staff-reference links.

[Plugin index](README.md)
