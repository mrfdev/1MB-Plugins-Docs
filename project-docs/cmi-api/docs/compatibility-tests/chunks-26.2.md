# Chunks compatibility evidence for Paper 26.2

Checked on 2026-09-12. Chunks changes the server-side view distance used to load and send chunk data around an individual player. It does not change simulation distance. The client still controls its own render distance; cached terrain from Bobby or Distant Horizons is outside this server setting.

## Scope and status

The dependency versions, installed command/API behavior, and live configuration below were verified before implementation. These observations establish the integration contract; they do not claim that player gameplay acceptance has already passed. Record the completed build, automated checks, and local server smoke results below as those gates finish.

The live server was inspected only through read-only SSH. No live configuration, permissions, JARs, world data, or running process was modified.

## Exact dependency baseline

| Component | Local test version after dependency preparation | Evidence |
| --- | --- | --- |
| Paper | 26.2 STABLE build 123 | Fresh [Paper build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.2/builds); latest build published 2026-09-09; maintained JAR and PaperScript state agree. |
| Paper API | `26.2.build.123-stable` | Repository coordinate and [26.2 API Javadocs](https://jd.papermc.io/paper/26.2/org/bukkit/entity/Player.html), whose page identifies build 123. |
| CMI | 9.8.9.10 | Installed `plugin.yml` and fresh [Spigot official CMI version endpoint](https://api.spigotmc.org/legacy/update.php?resource=3742). |
| CMILib | 1.5.9.9 | Installed JAR and fresh [Spigot official CMILib version endpoint](https://api.spigotmc.org/legacy/update.php?resource=87610). |
| LuckPerms | 5.5.82 | Fresh [official metadata](https://metadata.luckperms.net/data/all) and downloaded JAR descriptor. This release increases the cleanup delay for users mid-login. |
| Java target | 25 | Repository `javaTarget`. |

| Local artifact | SHA-256 |
| --- | --- |
| `servers/Paper-26.2/Paper-26.2.jar` | `7b7b3b43c009103e1971a0576c26f655a7dd9b56a0a2a4438e352c03a7fecd08` |
| `servers/Paper-26.2/plugins/CMI-9.8.9.10.jar` | `23ec81d2f29e9a7743cc0060b007c95d568b344d843dc39797ddb0c757ecb03a` |
| `servers/Paper-26.2/plugins/CMILib1.5.9.9.jar` | `6d3d3d73d04a1e70987bd899198971af6bbb5b34550e621f2df8a9cb7bee9862` |
| `servers/Paper-26.2/plugins/LuckPerms-Bukkit-5.5.82.jar` | `46cd6874ad28a1a8383982f1c1395734e79cfee4c814e0d04af84dbd72375e68` |

LuckPerms 5.5.82 was downloaded from the URL returned by its [official metadata](https://metadata.luckperms.net/data/all): [Bukkit release 1669](https://download.luckperms.net/1669/bukkit/loader/LuckPerms-Bukkit-5.5.82.jar). ZIP integrity and its `LuckPerms` name, `5.5.82` version, and Bukkit loader entry point were checked before replacing the local JAR while the maintained server was stopped. The recorded LuckPerms digest is locally computed; the metadata response does not supply a publisher checksum.

The former 5.5.81 JAR is retained at `servers/Paper-26.2/plugins-disabled/dependency-backups/2026-09-12-chunks/LuckPerms-Bukkit-5.5.81.jar`, SHA-256 `27e0030113bad0efc09ef75818e73573f6bcec2b1cc72f64000bc42160113918`. Paper, CMI, and CMILib already matched the latest release for this target and were not replaced during dependency preparation.

## CMI command contract

The relevant installed CMI 9.8.9.10 classes were inspected using `javap` to verify the command path against the actual local dependency, because the public CMI permissions page still includes older `viewrange` terminology.

- Chunks must dispatch a fixed console command: `cmi viewdistance <configured value or -1> <actual online player name> view`. Values exposed by Chunks are restricted to the configured whitelist within 4 through 16.
- The explicit final `view` argument selects `CMIViewDistance.setView(Player, int)`, which invokes only `Player.setViewDistance(int)`. The `simulation` branch invokes a separate API and must never be selected.
- Recipient names are validated before any permission change. Exact case-insensitive CMI control tokens (`reset`, `update`, `view`, `simulation`, and `-s`) are rejected even if they are real usernames: CMI scans those tokens before resolving the recipient. The plugin also verifies that CMI owns `/cmi`. These checks are essential to the view-only, single-player guarantee.
- On Paper 26.2, `-1` passes through to the per-player view-distance API, restoring inherited world defaults. CMI's older-server workaround for versions through 1.21.5 does not apply here. CMI's `reset` token also translates to `-1`, but the numeric fixed form avoids extra parsing paths.
- Reset checks that the current world default is within 4–16 before dispatch. An out-of-range world configuration is reported to staff; the plugin does not silently clamp the default or provide an administrator bypass.
- Never omit the recipient: this command can otherwise operate on the server-wide default. The command also checks `CMIWorld.getWorld(recipient)` before it checks players, so a username matching a loaded world or CMI world alias must fail preflight. Use the public `net.Zrips.CMILib.Container.CMIWorld.getWorld(String)` lookup to mirror that decision.
- CMI's string player lookup checks the exact online player name first. It does not parse a UUID in this command path. CMI receives the validated authoritative `Player.getName()`; LuckPerms receives `Player.getUniqueId()` through its API. Never substitute a nickname, remove a Floodgate prefix, or fall back to a name for LuckPerms.
- The CMI command returns success even when it does not find a matching recipient. A successful command dispatch is therefore not proof of application. Read back `Player.getViewDistance()` and ensure the simulation distance did not change before reporting success.
- The CMI player view setter clamps its own input to -1 through 32 and converts 0 or 1 to 2. Those loose CMI limits are not the Chunks policy; reject an unavailable or out-of-range request before dispatch instead of relying on CMI clamping.

The installed Paper 26.2 build 123 implementation separates load/view, send, and tick/simulation state. The player view setter updates the load-view holder and preserves the `-1` sentinel. Its simulation setter updates a different tick-view field. [Paper's player API](https://jd.papermc.io/paper/26.2/org/bukkit/entity/Player.html#setViewDistance(int)) documents the separate getters/setters; the deprecated no-tick setter is not needed.

## Permission persistence and cache behavior

CMI enumerates positive `cmi.viewdistance.<number>` entries in its provider's effective permission map and chooses their maximum numeric suffix, not the most recently assigned permission. The installed LuckPerms provider supplies its literal contextual permission map. CMI does not expand wildcard-aware access checks across every possible numeric node, so `*`, `cmi.*`, and `cmi.viewdistance.*` do not themselves select 64 chunks. The implementation parses numeric suffixes as doubles before converting its maximum to an integer. Extra inherited, contextual, malformed, or legacy numeric nodes need explicit validation; changing one positive permission without removing or rejecting real numeric conflicts can reapply a different distance later.

A follow-up probe against the actual installed **CMI 9.8.9.10 JAR** passed **nine parser cases**: each of `*`, `cmi.*`, and `cmi.viewdistance.*` with a concrete 4 selected **4**, and each wildcard alone selected **-1**; a positive concrete 16 beat 4; a false 16 did not override 4; and CMI parsed a `12.5` suffix as 12. The probe made zero permission-check calls, permission mutations, or simulation calls. Chunks still rejects unsupported non-integer node forms instead of adopting CMI's permissive fractional parsing. This is actual-CMI integration evidence, not a real-client gameplay test. Evidence is retained in `.scratch/chunks-cmi-wildcard-probe/report.txt`.

CMI 9.8.9.10 reapplies this permission-derived value on player join and schedules a refresh 10 ticks after a world change. If no positive range above 1 remains, it applies `-1`.

The numeric permission cache normally waits 1000 ms before recalculation. Repeated cached reads also refresh its last-read timestamp, so waiting an arbitrary second is not a reliable completion test. The supported public API provides `CMI.getInstance().getPermissionsManager().removeFromCache(uuid)` and forced recalculation through `getPermissionInfo(player, "cmi.viewdistance", true)`. `CMIPerm.viewdistance_$1.getPermissionInfo(player).getMaxValue(0)` reads the same maximum used by CMI's automatic refresh.

LuckPerms persistence must finish before success is reported. Keep a UUID-scoped change pending until the saved nodes, concrete numeric entries in the contextual permission map, CMI's refreshed view-distance permission, and the actual player view distance agree. Wildcard-aware access-check maxima are diagnostic only and are labelled separately from the numeric preference. Require a cooldown plus one pending change per player; a timer alone does not establish that permission propagation or storage succeeded. World changes, reconnects, disable/restart, stale menu clicks, and failed saves require recovery checks.

## Live server configuration, read only

The authorized live Minecraft server was inspected over SSH. Paths below are relative to its server root; machine-specific locations are omitted from published documentation.

| File / scope | Observed distance setting |
| --- | --- |
| `server.properties` | `view-distance=8`, `simulation-distance=4`. |
| `spigot.yml` | `world-settings.default.view-distance: default`, `world-settings.default.simulation-distance: default`; no additional distance overrides matched in this file. |
| `bukkit.yml` | No view/simulation/send-distance override found. |
| `config/paper-global.yml` | `chunk-loading.autoconfig-send-distance: true`; retained `chunk-loading-advanced.auto-config-send-distance: true` also exists. This records both spellings without treating a retained legacy setting as an independently active override. |
| `config/paper-world-defaults.yml` | No view/simulation/send-distance override found. |
| `spawn/dimensions/minecraft/*/paper-world.yml` | No view/simulation/send-distance override found, including overworld, wild, builders, gametype, and event world files. |
| `plugins/Multiverse-Core/worlds.yml` | No matching view/simulation-distance property found. |
| Active dependency filenames | CMI 9.8.9.10, CMILib 1.5.9.9, LuckPerms 5.5.81. Live LuckPerms was not updated. |

Paper 26.2 stores active dimension configuration at `world/dimensions/<namespace>/<key>/paper-world.yml`, as described by the [official world configuration reference](https://docs.papermc.io/paper/reference/world-configuration/). A direct `spawn/paper-world.yml` does not exist on this live server. Old direct world folders also exist and must not be mistaken for the active dimension layout.

The files imply a normal reset target of view distance 8, with simulation distance 4. This is a configuration observation, not a runtime guarantee: another plugin can change live world settings. Chunks should resolve the current player's world default at action time instead of hardcoding 8. [Paper's Spigot reference](https://docs.papermc.io/paper/reference/spigot-configuration/#world-settings_default_view-distance) explains inheritance from `server.properties`; its [server.properties reference](https://docs.papermc.io/paper/reference/server-properties/#view-distance) describes the server-to-client chunk-data setting.

## Verification and manual acceptance

Local verification on 2026-09-12 completed with canonical **build 652**, **65 synchronized JARs**, and **1,619 automated tests** (zero failures/errors, one existing skip), including **46 Chunks tests**. The final Paper inventory probe passed **176 assertions** covering the five choices, actual footer items and effective glow, input cancellation, stale/forged sessions, permission loss and close/quit/world invalidation. Synthetic players intentionally could not enter the real online-player registry, save LuckPerms users, or dispatch CMI. Real Java/Bedrock client acceptance remains required.

Console checks verified out-of-range rejection, adding More 14, changing its shortcut default, removing it, restoring the original presets, reload, and disable/re-enable during a preset write. The saved catalog and active choices agreed after reactivation and after a clean restart. Final health reported all required dependencies enabled, preset validation OK, and no pending operations or reported problems. The local feature is enabled; ordinary players still need `onembcmi.chunks.use`.

Both local runtime starts used Paper 26.2 build 123 and the maintained launcher's required Java **26.0.2.1**. Gradle compiled and tested the artifacts with Java 25. The first probe incorrectly read an optional ItemMeta patch instead of the Nether Star's effective default glint; its corrected data-component assertion passed without production changes. An early console test queued during startup was retried after server readiness. The final server shutdown completed at **15:50 CEST**; the temporary probe was removed and all 65 managed JAR hashes were unchanged. Local evidence is retained under `.scratch/chunks-runtime/` and `.scratch/chunks-build-all.log`.

The footer placement correction on 2026-09-12 moved the glowing **Back to /menu** Nether Star to slot **52**, immediately left of the close barrier at **53**. The player head remains at **45** and the help book at **49**. After a clean shutdown at **15:57 CEST** with all worlds saved, canonical **build 653** passed the complete `scripts/build-all.sh` suite gate and synchronized all **65 JARs** for Paper 26.2 stable build 123. No new runtime probe was run for build 653; the **176 runtime assertions above remain evidence for build 652**. Real-client acceptance of the corrected footer remains required.

Canonical **build 654** adds detailed conflict logging and `/chunks admin inspect <player|uuid> [page]`. The full suite passed **1,630 automated tests** (zero failures/errors, one existing skip), including **57 Chunks tests**, and synchronized **65 JARs** whose descriptors report `1.0.3-654`. Diagnostics regressions verify evidence captured before rollback, inherited wildcard origin and maximum, contextual/temporary denial details, read-only inspection, retention after logout and later success, ambiguous-name rejection without external lookup, bounded/sanitized snapshots, and repeated-log suppression with complete latest evidence. These automated checks do not replace real Java/Bedrock client acceptance or retroactively create a failure snapshot for an older build.

Build 654's guard incorrectly treated a wildcard-expanded access-check maximum of 64 as a selected numeric distance, causing false conflicts for staff with broad permissions. Its wildcard diagnostics results above document that historical behavior. The verified CMI distinction described in this page corrects that interpretation within Chunks; it does not require changes to staff global LuckPerms grants or introduce a preset-limit bypass.

The build 654 local Paper smoke reached readiness at **16:09:23 CEST**. Console inspection accepted a canonical UUID with an optional page and correctly reported an empty retained history and offline current state; missing arguments and an unknown exact name were rejected. Health was ready with zero pending operations and zero reported problems, and debug command metadata listed inspection with its admin permission. Console uses the shared all-rows renderer, so this check does not establish in-game pagination or an online player's conflict behavior; wildcard conflicts and retention were covered by the automated tests above. Shutdown completed cleanly at **16:09:45 CEST**, all worlds were saved, and the process exited with code 0. Evidence is retained in `.scratch/chunks-diagnostics-runtime.log`.

Canonical **build 655** corrects the false staff-wildcard conflict inside Chunks without editing global LuckPerms grants or adding an administrator bypass. The full suite passed **1,633 automated tests** (zero failures/errors, one existing skip), including **60 Chunks tests**, and all **65 synchronized JARs** were verified as `1.0.3-655`. The corrected guard uses the concrete numeric permission-map maximum; wildcard-aware access checks remain separately labelled diagnostics. Verification combines those tests with the **nine actual-CMI parser cases** described above. Paper remained 26.2 stable build 123 and the maintained server was left stopped at the end of that verification. The automated verification did not add a server startup or controlled real-client test for build 655; prior runtime evidence remains attributed to its original build.

After build 655's wildcard correction, the owner reported that the feature seemed to work in gameplay. This is recorded as positive initial user feedback, not completion of the full Java/Bedrock acceptance matrix: client editions, every preset/reset/reconnect path, and the adversarial cases below were not individually reported as verified.

The [live Paper documentation index](https://docs.papermc.io/llms.txt) was used to discover the current references. The [custom InventoryHolder guide](https://docs.papermc.io/paper/dev/custom-inventory-holder/) supports authoritative inventory identity, and [Paper's scheduler guide](https://docs.papermc.io/paper/dev/scheduler/) requires world/player operations on the server thread while expensive storage work runs asynchronously.

Before live handoff, record the canonical suite build and local startup/shutdown results, then test with Java and Floodgate/Bedrock accounts:

1. Every configured button and legacy command, reset, exact persistence after relog, and new-world defaults after reset.
2. Rejection of unconfigured values, values below 4 or above 16, malformed numbers, wrong direction, extra arguments, and forged menu inputs.
3. Rapid clicks/commands, close/reopen, shift-click, hotbar/offhand swap, drag, double-click, drop, creative interactions, full inventory, disconnect, world change, and stale menu sessions.
4. Failed/slow LuckPerms persistence, a concurrent second change, inherited/conflicting view-distance nodes, and recovery after disable/restart between save and apply.
5. Exact same simulation distance before and after every success, rejected input, and recovery path. Verify that other players and world defaults remain unchanged.
6. Client render distance lower than the server preference, cached chunks from Bobby/Distant Horizons, and removal of an option by an admin while a menu or saved preference still refers to it.

Run `scripts/build-all.sh` with the maintained Paper server stopped for the complete suite test build. After gameplay acceptance, `gradle stageTestedJarsForLive` stages the exact tested set; do not manually replace live dependencies or publish partial Feature Plugin builds as a tested suite.
