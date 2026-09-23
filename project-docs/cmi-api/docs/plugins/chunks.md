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

You can also select the **Chunks** spyglass in [the main menu](menu.md), on `/menu 2` with the default layout and all buttons visible. Custom layouts or hidden buttons can change its page, and the shortcut appears only while Chunks is available to you. The glowing nether star in Chunks returns to `/menu`.

Available features include:

- A compact menu with the shared light blue glass border, your player head at the bottom left, a help book at the bottom center, and a glowing **Back to /menu** nether star immediately left of the close barrier at the bottom right.
- Two lower-distance choices, a reset button, and two higher-distance choices by default.
- Book hover text explaining whether to reset, decrease, or increase the server-sent distance.
- A **Help me choose** book opening three short explanations, plus practical guidance on each preset's hover text.
- Legacy text shortcuts for players who prefer commands.
- A personal preference remembered across reconnects, with optional session choices that leave it unchanged.
- **Preference options** for **Always**, **This session**, **Save this choice**, and **Use my saved preference**, with explicit current-choice and after-relog labels.
- **Temporary screenshot mode** for five minutes at the highest enabled wider preset (12–16), followed by a return to your previous choice.
- A short change cooldown and a busy state while the previous change is being confirmed.
- A live selected-preset glow and label, plus a status item below the choices. The status item and player-head hover text refresh in place with saving, confirmation, and cooldown progress.
- Client-limit advice on preset hover text and live status, with a fuller explanation in `/chunks status`. It uses the reported request and leaves every offered choice available.
- Status, help, and an information page explaining client settings and cached chunks.
- A support reference on failed changes that staff can use to find the exact incident, including after a restart while that history is retained.

Only the choices currently enabled by staff can be selected. The plugin rejects an unlisted number, a number outside **4–16**, and a bare command such as `/chunks 32`. The words `less` and `more` name the preset groups; repeatedly using `/chunks more` does not keep increasing the distance.

The selected preset glows only after the preference and runtime change have been confirmed. **Saving...** and **Confirming...** describe unfinished work; neither means the new setting is active and verified. After success, **Confirmed** and **Currently selected** identify the choice, while **Next change in: 3s**, then 2s and 1s, count down the configured cooldown. Once ready, the choices offer their normal click action again. Reset has its own selected state even when the current world's default equals a numbered preset.

The menu updates its existing inventory instead of reopening it. The status item is in slot 31; the head, help book, return star, and close barrier retain their usual positions. Navigation and Close continue working during a save or countdown, and completion never reopens a menu you closed. An unreadable preference is shown as unavailable. A failed attempt is not highlighted as successful; if recovery confirms the previous choice, that choice can glow while the status explains that the attempted change failed. The display confirms server state, not that terrain has finished rendering on the client.

Reset also requires the current world's default to be within 4–16. If a world is configured outside that range, staff must resolve that configuration before this feature can reset a player there.

## Player Commands

| Command | Behavior with the default configuration |
| --- | --- |
| `/chunks options` | Open preference/session controls and see what happens after relogging. |
| `/chunks mode always` | Save future preset choices across reconnects (the default mode). Changing mode alone changes no distance. |
| `/chunks mode session` | Make future preset choices temporary. Requires an available saved preset or Reset first. |
| `/chunks save` | Save your confirmed current choice for future logins, after the normal cooldown. |
| `/chunks restore` | End a temporary choice and apply your saved preference, after the normal cooldown. |
| `/chunks screenshot` | Temporarily use the highest enabled wider preset, then return to the previous choice. Default: five minutes. |
| `/chunks screenshot stop` | End screenshot mode early and return to the previous choice, after confirmation and cooldown. |
| `/chunks` | Open the menu. |
| `/chunks choose` | Open Help me choose. Read the cards and return to the preset buttons; browsing saves nothing. |
| `/chunks less` | Select 4. |
| `/chunks less 4` | Select the enabled Less 4 preset. |
| `/chunks less 6` | Select the enabled Less 6 preset. |
| `/chunks more` | Select 12. |
| `/chunks more 12` | Select the enabled More 12 preset. |
| `/chunks more 16` | Select the enabled More 16 preset. |
| `/chunks reset` | Follow the current world's server default. |
| `/chunks status [page]` | Inspect your preference, client-limit advice, current state, and last retained support reference. |
| `/chunks explain` | Open the optional distance illustration if staff has enabled the trial. Browsing changes no preference. |
| `/chunks advice [page]` | Read optional connection guidance when staff enables it. Your choice stays yours. |
| `/chunks info [page]` | Read the feature introduction and player guide link. |
| `/chunks help [page]` | Show available commands with pagination. |

Examples:

```text
/chunks
/chunks choose
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

For help, click **Help me choose** (the writable book above the bottom information book), or run `/chunks choose`. Hover over **Lower distances**, **Server defaults**, or **Wider views and screenshots**. The cards list only currently enabled values. Clicking a card returns to the normal preset menu with a short reminder; it does **not** save a preference. Click the actual preset button there and wait for confirmation. You can also keep using `/chunks less`, `/chunks more`, and `/chunks reset` directly.

Lower values send less terrain data and may ease loading on Bedrock or slower clients. Higher values can be useful for building and screenshots when your client and connection can handle more. Neither is a promise of smoother play, higher FPS, or lower ping. Your client render setting and cached scenery still matter. Saved choices keep their normal relog behavior, and simulation distance is unchanged.

### Why is a Help me choose card unavailable?

Staff controls the offered presets. If no enabled numbers fit a card, it is grey and cannot be selected. Reset is also grey if this world's default falls outside the allowed 4–16 range; ask staff to check that world. The guide never adds a missing preset or substitutes a different default. Use **Back to /chunks** to see all available choices. `/chunks info [page]` gives text guidance using the current preset list if you prefer commands.

### Why can I still see far away after choosing fewer chunks?

Bobby can show chunks saved on your computer, and Distant Horizons can show saved distant terrain. `/chunks` changes new chunk data sent by the server; it does not clear those client caches. Lower your client render distance or the mod's own distance setting as well if you want less scenery rendered.

### Why did choosing 16 not make me see farther?

Check **Video Settings > Render Distance** in your Minecraft client. For example, a confirmed server choice of **16** with a reported client request of **6** now shows **Client request is below your 16-chunk choice** in the status item and your player-head hover text. The preset itself also notes the mismatch before you select it. Use `/chunks status [page]` for the explanation in chat.

This is advice, not an error or a reason to block the preset. Keep a lower client setting if it suits your device; raising it is optional. Changing `/chunks` cannot raise your client setting for you, and matching numbers does not prove that terrain has arrived or rendered.

### Why does the reported client distance differ from my slider?

Bedrock bridges, proxies and mods may report a different request than the setting you see. The plugin reads what Paper reports; it does not inspect your screen or detect your device. Paper can also return **2** before receiving the client setting. Chunks marks that value as a possible initial default and asks you to check your settings instead of asserting a mismatch. Unavailable values are labelled unavailable.

Your **saved server preference**, **reported client request**, and **cached scenery** are separate. Bobby and Distant Horizons can display previously saved scenery beyond the live distance. Chunks cannot measure or clear those caches.

### Does this change simulation distance or keep distant farms running?

No. This menu changes view distance only. Simulation distance is controlled separately by the server, and cached terrain does not keep distant gameplay active.

### Will my choice survive leaving the server?

In **Always** mode, a successfully saved preference is remembered across reconnects. This is the default, including after every login. **This session** lets you try another offered value while keeping your saved preference for your next login. A temporary choice also ends on restart, Chunks reload, preset update, or feature disable. Changing worlds keeps it for the same session; a temporary Reset follows that world's default.

### How do I try another distance without losing my usual preference?

Open **Preference options** (the repeater in `/chunks`), or run `/chunks options`. First save a preset or Reset in **Always** mode if you have never used Chunks. Then select **This session**, return to `/chunks`, pick an offered preset and wait for confirmation. The regular `less`, `more`, and `reset` commands also follow the mode you selected. The mode button glows; the status and options page show the session choice and what applies after relogging.

For example, save your usual **6**, select **This session**, then choose **16** for screenshots if staff offers it. Your next login returns to **6**. Use **Use my saved preference** or `/chunks restore` to return sooner. To keep **16** for future logins, wait for confirmation and cooldown, then use **Save this choice** or `/chunks save`. This explicitly replaces the saved **6**. It does not change the mode for subsequent choices.

Changing **Always / This session** only controls the next choices. It does not save or restore the current choice by itself. The saved-preference shortcut returns to your saved baseline, not an unlimited history of previous clicks. Staff can retire a preset; a retired value is never offered or restored. Choose an available preset or Reset if the saved one is no longer offered.

All these controls use the existing `onembcmi.chunks.use` permission on Java and Bedrock. No extra permission is needed. Closing the menu leaves an accepted choice in progress and does not end session mode.

### Can I briefly use more chunks for a screenshot?

Yes. Open `/chunks options` and click **Temporary screenshot mode**, or run `/chunks screenshot`. It uses the highest currently enabled preset between **12 and 16** that is higher than your confirmed current distance. First choose a normal preset or Reset and wait for confirmation and cooldown. If you already use 16, or staff offers no higher screenshot preset, there is nothing to increase and the button is unavailable.

The five-minute countdown starts **after the wider view is confirmed**. You can close the menu and take screenshots normally. The option changes only the server's view distance; it does not take or save an image for you. Keep your client Render Distance high enough for the wider live view. Bedrock/proxy reports, your device and connection, and Bobby/Distant Horizons caches still affect what you see; this mode cannot promise that all terrain has arrived or rendered.

The menu and `/chunks status [page]` show the countdown and return choice. Click **End screenshot mode** or use `/chunks screenshot stop` to return early. Your saved preference is unchanged. For example, saved 6 → screenshot 16 → return 6. If you were temporarily using 4 with saved 6, the timer returns to that temporary 4 during the same login; relogging still uses saved 6. **Always / This session** continues to control your next ordinary preset choice and is not changed by screenshot mode.

Repeated starts do not extend the timer. Choosing another valid preset, **Save this choice**, or **Use my saved preference** ends it. Save explicitly makes the confirmed screenshot choice your saved preference; Restore goes directly to your saved baseline. Invalid input and cooldown rejections do not cancel the timer. Manual stopping respects cooldown; automatic expiry does not wait for it.

Logout, restart, Chunks reload, preset updates, feature disable, or disabling screenshot mode ends temporary choices and returns to the saved preference. A normal world change keeps the countdown; a previous Reset returns to the default of the world you are now in. If permissions changed, a return value was retired, or that world's default is unsafe, Chunks removes its temporary override, attempts a safe recovery, and gives you a support reference if it cannot confirm the return. It never restores an unlisted or out-of-range value. Staff can disable the option or change its duration. The existing `onembcmi.chunks.use` permission is sufficient on Java and Bedrock.

### Why does the menu ask me to wait before changing again?

The server must save and confirm one preference before accepting the next. Wait for that operation and its short cooldown, then choose another option. Repeated clicks do not make the change faster. If it remains unavailable, give staff the message shown and use `/chunks status`.

The live status item and your player head show the current stage. A slow save keeps showing **Saving...** even if the usual cooldown duration has elapsed. The cooldown starts after the operation finishes; it never unlocks an unfinished save. Closing the menu does not cancel an accepted preference change.

### What should I give staff when a change fails?

Share the **Support reference** printed with the failure message, along with what you tried. The reference identifies that exact attempt; it is different from your player UUID. You can also find your last retained reference with `/chunks status [page]`. Plain text remains usable on Java and Bedrock without a clickable chat feature; copying the full reference or sharing a screenshot is enough.

Staff can look up the original failure even if your old preference was restored or a later choice worked. An old reference in Status is labelled as a previous failed attempt, so it does not mean your current setting is broken. Normal cooldowns, invalid preset input, and an unfinished slow save do not create a new failure reference.

### Can I use 7, 32, or another custom number?

Only the current menu choices are allowed. `/chunks 32` is not supported, and this feature never offers a value outside 4–16. Run `/chunks` to see the available choices.

### Can I keep `/chunks less` but see 32 chunks with Bobby?

On Java, yes: a compatible Fabric and Bobby setup can show previously visited chunks beyond the server's live view distance. Try a client setting of 32 if your computer can handle it, and lower it if performance suffers. You still need to explore to receive and cache terrain. This does not increase the server-side `/chunks` limit.

### What does the distance illustration do?

If staff has enabled the trial, click **Distance explained** (the spyglass beside the status item) in `/chunks`, or run `/chunks explain`. Your head sits at the centre of a small terrain sketch. Use the smaller/larger arrows to compare enabled presets, and the compass to illustrate **Reset** using this world's default. The arrows change only the picture. Return with **Back to /chunks** to actually choose and save a preference.

Grass represents the growing terrain area; grey tiles mark the rest of the sketch. This is a compressed illustration, **not a map, a count of loaded chunks, or an exact outline of what the server sends**. One tile is not one chunk, and nearby values can look the same. Your client settings and cached scenery still affect what you see. It makes no FPS, bandwidth, or rendering guarantees. A Reset default outside 4–16 is labelled unavailable and shows no terrain instead of pretending to apply a safe value. Simulation distance is unchanged.

### What is Connection advice, and should I follow it?

When staff enables it, `/chunks advice [page]` and the **Connection advice** item in `/chunks` explain recent server ping estimates. Allow about a minute after joining, changing worlds, or a reload before checking. If estimates stay elevated and chunk loading feels slow, it may suggest trying a lower **currently offered** preset, usually 6 or 4. You choose whether to run the displayed command or use a preset button. Opening advice never changes your preference.

Sending less terrain data may help chunk loading, but it does **not promise lower ping, higher FPS, or smoother play**. High ping can occur on a usable connection; a low or unavailable estimate does not rule out problems. The plugin cannot measure your available bandwidth, measure your FPS, or diagnose the cause of lag. Bedrock and proxy connections can make the server's estimate less representative. Keep your current choice if it works well for you. Simulation distance is unchanged.

There are no automatic advice messages in chat. If staff has disabled this optional feature, use `/chunks info` for general guidance. Players need only the existing `onembcmi.chunks.use` permission; there is no extra advice permission or client mod requirement.

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
| `/chunks admin preview <less\|more> <preset> [page]` | Read-only preview of removing a preset: affected online players, reset targets, blocked world defaults, uncertain data, and shortcut changes. |
| `/chunks admin default <less\|more> <preset>` | Change the preset used when the number is omitted. |
| `/chunks admin reload` | Reload feature configuration and preset data. |
| `/chunks admin inspect <player\|uuid> [page]` | Inspect the latest retained failed attempt, its permission sources, and the player's current state when online. |
| `/chunks admin history <player\|uuid> [page]` | List a player's recent retained failures, newest first, with commands to open each reference. |
| `/chunks admin incident <reference> [page]` | Open the exact support reference from a player's failure message, plus separate current state. |
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
/chunks admin preview more 16
/chunks admin preview more 16 2
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

## Previewing Preset Removal

Before retiring a choice, run `/chunks admin preview more 16` (or the applicable group and preset). It requires the existing `onembcmi.chunks.admin` permission and accepts only a currently enabled preset in that group. Add a page number to read more in game; console uses the shared full-report output. The report shows:

- The current and proposed preset lists, plus the resulting bare `/chunks less` or `/chunks more` shortcut. Removing the shortcut default selects the smallest remaining choice. An empty group makes that shortcut unavailable; it does not turn the shortcut into Reset.
- Counts of online players with a stable, readable saved preference for the retiring value, unaffected players, and uncertain players. Matching current view distance alone does not mean a player owns that preference: unmanaged CMI settings and Reset users are not counted as affected merely because they currently see that number.
- Each affected player's exact server name, UUID, world, current view distance, and proposed Reset target from that world's default. Defaults outside 4–16 are labelled **BLOCKED**, because actual reset would be refused before changing the saved preference. Staff must correct the world configuration before reconciliation can succeed.
- Pending saves, confirmation/recovery operations, and unreadable preferences are labelled **UNCERTAIN**. Their in-memory values may not represent the final saved choice; they are excluded from affected/unaffected totals and reset-target counts. Wait for the operation or resolve the unavailable data and preview again.

The preview reads loaded online LuckPerms users by their server UUID and takes a fresh snapshot on every invocation, including page requests. It does not load offline records, use an external identity service, clear CMI permission caches, save permissions or presets, invoke CMI, start reconciliation, change cooldowns, or close player menus. **Offline impact is unknown**, rather than reported as zero. Offline retired preferences reconcile on the next join under the existing rules.

A default within 4–16 passes the world-range check; delivery still depends on the normal LuckPerms and CMI/Paper confirmation checks. Reset can keep the same visible number when that number is also the world default: it removes the personal override and follows the world instead. Simulation distance is unchanged. If a player changes worlds or preferences after the snapshot, the eventual outcome may differ.

Actual removal remains the separate `/chunks admin remove more 16` command. It uses the same removal policy as the preview, revalidates the current preset, saves asynchronously, and reconciles current online state. Running a preview neither reserves nor authorizes a later removal, and it adds no mandatory confirmation step to the existing removal command.

## Inspecting a Failed Change

For a reference supplied by a player, run `/chunks admin incident <reference> [page]`. For a short list of recent incidents, use `/chunks admin history <player|uuid> [page]`, then open the exact reference listed there. Both routes require `onembcmi.chunks.admin`. The incident reference is a separate UUID from the player's identity: `incident` accepts the support reference, while `history` and `inspect` accept the actual player UUID or a locally known exact username. No permission or persistence write occurs when viewing these reports.

Run `/chunks admin inspect <player|uuid> [page]` after a player reports a failed choice. This read-only command requires `onembcmi.chunks.admin`. It accepts a canonical server UUID, an exact online username, or an exact username retained with a failure. Name comparisons allow different capitalization and preserve the Floodgate prefix. Ambiguous names are rejected; inspect the authoritative server UUID instead. Inspection does not load offline player records or query an external identity service.

The report separates **the failed attempt** from **current state**, which may have changed since that failure. It includes:

- The failure's UTC timestamp, unique reference UUID, player name and server UUID, attempted preset or reset, operation stage, and reason.
- Runtime state at failure when available: world, player view distance, world default, simulation distance, and operator status.
- LuckPerms evidence for the rejected choice, including the requested value, numeric permission-map maximum, separately labelled wildcard-aware access-check maximum, active contexts, relevant exact nodes, user or group origin, parent-group wildcard grants, values, and expiry. Conflict evidence is captured before rollback so restoring the old preference does not erase the cause.
- A separate current runtime and LuckPerms snapshot if the player is online. An offline player still has the retained failure, with current state explicitly unavailable.

Each failed player change includes **Support reference: <reference-uuid>. Share this with staff.** The reference stays attached to that attempt through failed-save recovery, including when the old view distance is successfully restored. It is also available to its owner through `/chunks status`. Status labels it as a previous failure, even after a later success. An invalid choice, cooldown rejection, or merely slow unfinished save does not create a failure incident.

Each failure report is written to the server log with the same `[Chunks diagnostic <reference-uuid>]` prefix. Search the player's full reference to collect its related log lines. An identical failure for the same UUID within **30 seconds** writes a one-line summary linking the previous full report; the new reference is still printed and its complete snapshot is retained. A changed request, stage, reason, or captured state writes the full report immediately. Logs follow the server's normal rotation and remain the fallback for unavailable or evicted history.

Chunks retains up to **five failures per player UUID**, **128 players**, and **256 incidents total**. Oldest entries are evicted when any limit is reached. History is listed newest first; name resolution uses the latest retained name for each UUID, while each individual incident keeps its original name and authoritative UUID. Logout, a later successful choice, and disabling/re-enabling do not erase history. A clean restart reloads saved incidents. Diagnostic details remain limited to **96 rows**, with each text value sanitized and shortened to **400 characters**; truncation is indicated. The repeated-console-log cache remains bounded to 128 players and starts fresh after a restart.

History is stored in `plugins/1MB-CMIAPI/Chunks/support-history.dat`, a versioned binary snapshot with a SHA-256 integrity check and a **32 MiB** hard input limit. It contains only bounded diagnostic values, not serialized Java objects, live player references, or a second source of preference truth. Staff should use the commands to read it. Loading, encoding, writing, and file synchronization run on a separate worker; bursts share one pending write and the writer takes another fresh snapshot if a failure arrives during a save. Atomic replacement preserves the previous file on a failed write. Feature disable and reload never wait for disk on the server thread. Completed snapshots survive a restart; server exit or a forced process kill before an asynchronous write finishes can lose the newest queued history, whose reference/evidence was also sent to the console logger. The health report distinguishes a completed save from a pending one.

`/chunks admin health` and diagnostic reports show whether history is loading, ready, awaiting a save, or unavailable. An unreadable, damaged, or unsupported file is preserved and is never silently replaced with empty history. New incidents remain available in bounded memory and console logs. After repairing/restoring the file or filesystem, `/chunks admin reload` retries loading or saving and merges new in-memory incidents with the recovered history. Do not hand-edit the binary file. A storage problem does not block or alter player preference transactions, and a loading or unavailable report must not be interpreted as proof of no earlier failures.

The two maxima answer different questions. The **numeric permission-map maximum** is the highest positive concrete `cmi.viewdistance.<number>` entry visible to CMI in the current permission context. The **wildcard-aware access-check maximum** asks whether individual permission checks succeed and is diagnostic only. A staff player with `* = true` and a selected numeric preference of **4** can therefore show a numeric maximum of **4** and an access-check maximum of **64**. That is not a distance conflict. With only a staff wildcard and no numeric preference, reset uses **-1** and follows the world default. Operator status does not need to be changed, and the plugin leaves staff wildcard grants intact.

A concrete inherited `cmi.viewdistance.16 = true` still takes precedence over a requested **4**, so that is a real conflict. A false numeric node does not become a positive preference. Unsupported non-integer view-distance node forms remain rejected, even if CMI would parse some of them permissively; `cmi.viewdistance.*` is recognized as an access wildcard. Review actual numeric source, value, contexts, and expiry before choosing a targeted correction through the normal staff workflow. Inspection never edits permissions, retries an operation, changes a preset, or changes view or simulation distance. This distinction does not provide an administrator bypass: staff using `/chunks` still choose only the offered values within 4–16 and use the normal UUID-based save/reset and runtime confirmation.

After staff resolve the cause, inspect again to compare current state with the saved failure, then use `/chunks admin retry <online-player>` where recovery is appropriate or ask the player to choose again. A successful later attempt leaves earlier failures available as historical evidence; their presence alone does not mean the player is still failing. Incidents from before persistent history was installed, records evicted by the retention limits, and data lost before a queued write completed cannot be reconstructed from a generic status message. Search the server logs for the full reference or reproduce the issue once if necessary.

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `onembcmi.chunks.use` | false | Open the player menu and use the personal preference commands. |
| `onembcmi.chunks.admin` | op | Staff administration, read-only removal previews, incident/history inspection, and detailed debug pages. |
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
| `%onembcmi_chunks.screenshot%` | Screenshot phase: `off`, `starting`, `active`, or `returning`. `active` means the countdown is running, not proof of client rendering. |
| `%onembcmi_chunks.screenshot_seconds%` | Remaining whole seconds, rounded up; `0` when off, starting or returning. |
| `%onembcmi_chunks.mode%` | Mode for the next preset choices: `always` or `session`; defaults to `always` after relog. |
| `%onembcmi_chunks.session_preference%` | Temporary choice: a number, `default`, or `none`. This does not assert runtime confirmation. |
| `%onembcmi_chunks.view_distance%` | Current server-side player view distance. |
| `%onembcmi_chunks.client_view_distance%` | Client-reported view distance. |
| `%onembcmi_chunks.world_default%` | Current world's default view distance. |
| `%onembcmi_chunks.pending%` | Whether a preference operation is pending. |
| `%onembcmi_chunks.enabled%` | Whether the feature is enabled and ready for changes. |
| `%onembcmi_chunks.choices.less%` | Current Less presets. |
| `%onembcmi_chunks.choices.more%` | Current More presets. |

These values describe the server's state, not proof that every terrain packet is already rendered on the client's screen. `client_view_distance` preserves Paper's raw reported number, including its initial fallback of `2`; player advice explains that ambiguity. It does not measure rendered chunks, Bobby's cache or Distant Horizons' separate distance setting, and Bedrock/proxies/mods can affect what is reported. Distance fields return `offline` without an online player; unavailable preset lists return `unavailable`. A preference that cannot be read from the loaded LuckPerms user is shown as `unmanaged`; use staff health diagnostics when that result is unexpected.

## Configuration and Data

Feature configuration is stored under `plugins/1MB-CMIAPI/Chunks/config.yml`:

```yaml
enabled: false
cooldown-seconds: 3
confirmation-timeout-seconds: 10
prototype:
  distance-explanation-enabled: false
connection-advice:
  enabled: false
  ping-threshold-ms: 250
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

## Preference and Session Controls

The default **Always** contract remains unchanged. Session mode requires a valid saved baseline and uses LuckPerms' [transient node map](https://javadoc.io/static/net.luckperms/api/5.5/net/luckperms/api/model/PermissionHolder.html#transientData()). Temporary nodes are not written to storage. Chunks temporarily denies its own saved numeric grant when needed and grants the chosen enabled numeric value; temporary Reset adds no numeric grant. The saved metadata and normal permission nodes remain untouched. No new data file, config switch, permission, external identity lookup, or timer is introduced.

The overlay belongs to the actual server UUID and is tagged with a unique in-memory owner token. Cleanup removes only matching owned nodes; it does not remove a replacement installed by another plugin or staff. Chunks rejects conflicting baseline data, foreign transient collisions, explicit user denials, and separate grants that would otherwise be hidden by masking the saved value. Staff wildcards retain the existing numeric-map behavior. Active permission evaluation must agree with both LuckPerms and installed CMI before view-only application, followed by Paper view/simulation confirmation. Temporary failures clear the overlay and attempt to confirm the allowed saved runtime state, keeping the support reference.

Temporary choices survive world changes within the login session. Logout, restart, Chunks reload, preset edits, or feature disable ends them and returns the mode to Always. On disable Chunks removes its transient nodes and attempts to apply the valid saved choice; it logs a restoration problem without claiming delayed confirmation. Reload/preset updates run the ordinary reconciliation after loading. If a saved preset is retired, normal retirement handling uses Reset only when the current world's default is within 4–16. A blocked world or conflicting permissions require staff attention. A removal preview includes temporary choices that will return to an otherwise unaffected saved preference because any preset update ends sessions; preview itself remains read-only.

**Save this choice** promotes only a confirmed, allowed current choice through the existing asynchronous durable save, rollback and UUID gate. **Use my saved preference** ends the temporary layer and confirms the saved choice without rewriting the durable nodes. Both enforce access, current player identity, allowlist, busy state and cooldown. Changing mode is blocked during an unfinished operation and does not apply a distance. Queued preset clicks retain their original expected mode so a later mode change cannot silently turn a temporary click into a permanent save. Outstanding durable saves keep their UUID gate across reconnects; late temporary callbacks cannot reapply to a replacement player.

The six-row options menu uses a light-blue border, mode buttons at slots 20/24, status at 22, save/restore at 30/32, own head at 45, Back to `/chunks` at 46, info at 49, and the glowing `/menu` star at 52 immediately beside the close barrier at 53. Main-menu entry is slot 38. Existing five-tick item refresh updates the open main/options page without reopening it or replacing its actions. Saved, session and confirmed state are distinct; a pending durable candidate is not promised as the after-relog choice. `%onembcmi_chunks.preference%` keeps its existing saved-value meaning, while the two new placeholders expose mode and session intent separately.

## Temporary Screenshot Mode

Screenshot mode is enabled by default while Chunks is active. Staff with `onembcmi.chunks.admin` can change the global switch and duration through the existing configuration commands:

```text
/chunks debug set config screenshot-mode.enabled false
/chunks debug set config screenshot-mode.enabled true
/chunks debug set config screenshot-mode.duration-seconds 300
```

Duration accepts **30–1800 seconds**; default **300** is five minutes. Invalid duration settings disable screenshot starts alone and are explained by `/chunks admin health`; ordinary presets still work. The global off switch hides the two screenshot controls in `/chunks options` and blocks starts. Configuration changes use the existing reload path, ending all temporary choices and reconciling the saved baseline. There are no extra permissions, storage files, client hooks or dependencies.

The options page has a screenshot start/countdown item at slot **40** and a separate **End screenshot mode** control at **42**. These actions keep their meaning throughout in-place refresh. The main preset layout and standard footer remain unchanged. At start, Chunks requires the exact current player, use permission, a confirmed allowed choice, an allowed saved baseline, an idle operation, and an elapsed cooldown. It chooses only the highest enabled numeric value from 12–16 above the actual confirmed distance (Reset uses the current-world default). GUI starts also recheck their offered target and catalog/world guard. Players cannot submit their own distance or duration.

The existing UUID-owned LuckPerms transient layer applies the screenshot choice; normal nodes and saved metadata are unchanged. The operation retains the previous confirmed choice, whether it was a session choice, and the saved baseline. CMI still targets the exact online username in explicit `view` mode, and the shared permission/runtime checks verify the result without touching simulation distance. Only successful confirmation starts the timer. The two new placeholders, live status/head and options page distinguish starting, active and returning stages, the countdown, saved relog baseline and return target.

One bounded record per participating UUID tracks a [monotonic elapsed-time](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#nanoTime()) countdown. The existing synchronous online-player task checks expiry; no separate per-player delayed task or bulk queue is added. [Paper scheduling](https://docs.papermc.io/paper/dev/scheduler/) follows server ticks, so an expired timer is handled when the server thread can next run. GUI updates share the existing five-tick item refresh. Expiry is also checked before a world reconciliation can reapply a timed choice. Restoration bypasses user cooldown but retains allowlist, identity, permission-data, view confirmation and recovery checks. Lost player-use access triggers an early trusted return. A stalled return uses the existing bounded confirmation deadline and support-reference path rather than holding a timer indefinitely.

Expiry or manual stop restores the previous allowed numeric/Reset choice and its session-versus-saved ownership, without a durable save. A previous Reset uses the current world. Changed LP baselines or owned transient data fail closed; cleanup does not overwrite staff edits. Retired values and unsafe defaults are never restored. Recovery uses only an allowed effective permission and can leave the current runtime view unconfirmed when external state prevents a safe return; staff receive the normal logged diagnostic reference. Reload, preset edits, quit and disable discard the timer and use the session lifecycle's saved-baseline behavior. A new accepted normal choice, Save, or Restore cancels the timer before it could undo that newer action; failed replacement operations clear the screenshot layer and follow ordinary recovery. Changing only Always / This session keeps the timer and changes only future preset semantics.

## Help Me Choose

Proposal 4 adds `/chunks choose` and a writable-book entry at slot 40 of the main menu. It is available whenever Chunks is active and the player has `onembcmi.chunks.use`; there is no additional permission, config switch, or dependency. The optional connection advice and diagram switches do not control it.

The six-row guide has three cards: lower distances at 20, current-world Reset at 22, and wider views/screenshots at 24. Lower guidance covers enabled values **4–11** and wider guidance covers **12–16**, so intermediate staff presets remain represented. These are explanatory ranges, independent of the existing Less/More command groups. The guide adds no presets and uses the current sorted allowlist. Empty ranges and an invalid Reset default are non-clickable grey labels. Reset retains its own identity even when a numbered preset equals the world default.

Clicking an available card revalidates the guide, opens the ordinary `/chunks` menu, and prints one short reminder of its current choices. It never calls the preference service to save or apply a choice. This keeps selection, confirmation, cooldown, recovery, and relog behavior in the existing preset controls. The guide asks no hardware questions, infers no platform from a name, reads no ping, and makes no FPS, bandwidth, or smoothness promise. The main preset lore now explains 4–6 as less terrain data that may help slower clients, 7–11 as more terrain than lower choices, and 12–16 as wider views for capable clients and screenshots. Numbers and confirmed/pending labels remain unchanged.

The guide keeps the shared light-blue border, own player head at 45, Back to `/chunks` at 46, information book at 49, glowing Back to `/menu` star at 52, and close barrier at 53. The main menu's bottom information book still runs `/chunks info`. Its text now uses current enabled values instead of always recommending a potentially retired 4/6/16 choice.

All GUI work runs on the main thread through the shared custom-holder, owner/session, next-tick action, and debounce protections. Guide actions recheck readiness, access, catalog generation, world UUID, and world default. Preset reload, world changes, lost access, close, quit/kick, and dormancy invalidate old actions. Reopen the guide after a change for current labels. The main menu's live state refresh does not overwrite this page. Browsing adds no data file, timer, network/identity lookup, CMI/LP write, or simulation change. [Client acceptance remains in the checklist](../../checklist.md#chunks-view-distance-acceptance).

## Client-Limit Advice

Always available with the existing `onembcmi.chunks.use` permission. No new command, permission, setting, dependency, or storage file is required. It operates independently of the optional connection advice and visual trial.

- Each offered preset compares its own target with the client request in its hover text. Reset uses the exact current-world default; unsafe defaults are not clamped into a valid comparison.
- The status item and own player head compare only a **confirmed** choice. Saving, confirming, recovery, unreadable preferences, and unconfirmed choices ask the player to confirm first. A confirmed restored choice is compared correctly, even during its cooldown.
- Client values below a target prompt the player to check **Video Settings > Render Distance**. Equal or higher values do not promise rendered terrain. Nonpositive values are unavailable; `2` remains ambiguous because it is also Paper's initial fallback. Client values are not clamped to the server's 4–16 preset range.
- Existing in-place menu refresh picks up reported client changes. It neither reopens inventories nor sends unsolicited chat. `/chunks status [page]` retains support references and adds the fuller client/Bedrock/mod/cache explanation; `/chunks info` points to it.

The implementation reads [`Player#getClientViewDistance()`](https://jd.papermc.io/paper/26.2/org/bukkit/entity/Player.html#getClientViewDistance()) through the existing main-thread snapshot. There are no new polling tasks, packet hooks, identity lookups, or preference writes. A client-controlled reported number is presentation input only: it cannot add a preset, bypass access/cooldown/confirmation, raise a server or client distance, or alter simulation distance. The unchanged `%onembcmi_chunks.client_view_distance%` placeholder remains a raw report for compatibility.

## Optional Connection Advice

Proposal 6 is **disabled by default**. Staff with `onembcmi.chunks.admin` can enable or disable it globally in game, independently of the visual explanation trial:

```text
/chunks debug set config connection-advice.enabled true
/chunks debug set config connection-advice.enabled false
```

Enabling adds the Connection advice item at slot 29, to the left of the main status item, plus the `advice` tab suggestion. The item uses paper while gathering information and a feather when it has an optional numeric suggestion. Clicking closes the menu safely and reads `/chunks advice`; it never applies the suggested preset. Players can also type `/chunks advice 2` to read further pages on either edition. The original choices and standard footer remain in place.

The default trigger is **250 ms**, configurable from **100 through 2000 ms**:

```text
/chunks debug set config connection-advice.ping-threshold-ms 300
/chunks admin health
```

The existing one-second main-thread snapshot task starts a 30-second warmup, then reads Paper's existing `Player#getPing()` estimate at most once per ten seconds. Three consecutive observations at or above the threshold are needed before suggesting a choice, so the earliest signal is about 50 seconds after tracking begins. These are observations of Paper's cached estimate, not three independently measured network round trips. Reopening the menu or repeating the command does not accelerate sampling. A lower reading breaks the elevated streak; zero, negative, or implausible values above 60,000 ms are treated as unavailable. Evidence older than 30 seconds expires, and a long sampling gap starts a fresh streak.

Paper documents this value as a coarse application-layer estimate influenced by more than network latency. It is suitable only as a qualitative indicator; it cannot establish bandwidth, FPS, packet loss, or a lag diagnosis. The advice explicitly acknowledges those limits and the additional uncertainty of Bedrock/proxy paths. See the [exact Paper 26.2 `getPing()` contract](https://jd.papermc.io/paper/26.2/org/bukkit/entity/Player.html#getPing()). The plugin sends no custom ping packets or network probes and performs no identity lookups for advice.

Suggestions use the player's current server view distance and the current preset allowlist. They prefer the highest offered lower value at or below 6; if none exists, they use the closest offered lower value. The displayed command uses that preset's actual Less/More group. Retired, equal, higher, arbitrary, and Reset values are never invented as suggestions. No lower option, an out-of-policy current distance, unreadable preference state, an unfinished save/recovery, a reported problem, or a remaining cooldown suppresses the numeric suggestion. Actual selection still uses every existing save, permission, cooldown, and confirmation safeguard.

Observations stay in memory with one small record per permitted online server UUID. They clear on logout/kick, world change, lost access, reload, dormancy, or disabling advice. The plugin keeps no ping history on disk and sends no unsolicited advice chat. An invalid numeric threshold leaves advice unavailable while ordinary preset controls remain active; `/chunks admin health` reports the exact configuration error. Correct it with the command above. Staff setting changes persist through the normal feature reload, which also performs its existing saved-preference reconciliation; reading or sampling advice itself performs no CMI/LP changes.

Use `/1mb-cmiapi-chunks:chunks` instead of `/chunks` if an old alias intercepts the root. The [acceptance checklist](../../checklist.md#chunks-view-distance-acceptance) covers real Java/Bedrock feedback and the optional switch.

## Trying the Optional Visual Explanation

Proposal 9 is a disposable prototype, **disabled by default**, pending an explicit owner gameplay decision to keep or remove it. Staff with `onembcmi.chunks.admin` can enable it through the shared configuration command:

```text
/chunks debug set config prototype.distance-explanation-enabled true
/chunks explain
```

Players still need only `onembcmi.chunks.use`. Enabling adds one spyglass button at slot 33 of the main menu and exposes the `explain` tab suggestion. It does not add selectable presets or change the original five default choices. The six-row explanation page uses the shared light-blue border, player head at 45, Back to Chunks at 46, explanatory book at 49, glowing Back to `/menu` star at 52, and close barrier at 53. The diagram's player marker is at 22, with comparison arrows at 37/43 and the Reset illustration compass at 40.

The diagram compresses terrain into coarse visual bands for 4, 6, 12, and 16. Other enabled values retain their exact numeric label while sharing a band. Arrows skip unlisted presets and stop at the ends; they never offer arbitrary numeric input. Reset illustrates the current world's valid default even when that number is not an explicit preset. Its identity stays distinct from an equal numbered example. With no numbered presets, only the Reset illustration remains.

Browsing performs no CMI dispatch, LuckPerms save, preference/cooldown change, terrain inspection, chunk loading, or simulation mutation. Pages are built on the server thread from the small preset list and current world default, using the shared owner/session/nonce checks and click debounce. Navigation rechecks feature readiness, the trial switch, access, catalog generation, and world identity/default. Reload, preset retirement, world change, close, quit/kick, or disable invalidates old sessions. The main menu's live preference refresh does not replace the diagram.

Chunks uses the online player's available skin data for all its menus, verifying that the profile belongs to their actual server UUID. If the skin is missing, it shows a generic player head with their name instead of asking Paper to fetch an incomplete profile. The diagram does not add a skin or identity lookup, including for Bedrock accounts.

Hide the prototype again without removing Chunks:

```text
/chunks debug set config prototype.distance-explanation-enabled false
```

Both switch changes are persisted and use the normal feature reload/reconciliation path. `/chunks admin health` reports the trial state. Existing views close during reload, and direct `/chunks explain` is rejected while the trial is off. If an alias intercepts the root, use `/1mb-cmiapi-chunks:chunks` in place of `/chunks`. Test on Java and Bedrock before deciding whether the visual belongs in the permanent menu; that decision remains open in [roadmap #77](https://github.com/mrfdev/1MB-Library/issues/77).

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

Live GUI refreshes run on the server thread every five ticks for tracked open Chunks menus. An unchanged presentation is skipped, and only changed inventory items are written. Refreshes preserve the existing session, button actions, pending-click admission, debounce, and closing state. They do not query external identities, write LuckPerms, apply CMI commands, or alter either distance. Quit, close, feature disable, preset reload, world change, and revoked access stop or invalidate the corresponding display. Confirmed selection is tracked separately from LuckPerms' potentially unsaved in-memory candidate and checked against the current world, view distance, and simulation distance before highlighting.

Only one change runs per player while its persistence and runtime effect are being checked. A failure or timeout remains visible as a failed or pending operation instead of being presented as a successful preference. Staff use `/chunks admin status` and `/chunks admin health` for the overview, then `/chunks admin inspect <player|uuid>` for the latest failed attempt and its logged reference. After a runtime application problem is resolved, `/chunks admin retry <online-player>` reconciles that player's active session choice if present, otherwise the saved preference. Reconnects and retries preserve the original UUID.

A slow LuckPerms save remains locked until its future completes; reaching the confirmation timeout does not unlock an unresolved write. If saving fails, the feature attempts to restore its prior managed nodes and persist that restoration. If staff changed those nodes during the failure, it avoids overwriting their intervening changes. Failed or ambiguous compensation enters `recovery-required` and remains locked. The retry command deliberately does not bypass that lock: inspect and repair the affected LuckPerms data, then use a clean server restart to reinitialize and reconcile it.

The intended preference in Always mode is durable in LuckPerms before CMI application. Session choices use transient nodes and leave the durable baseline unchanged. A crash after that save can be recovered by applying the same preference on the next join. Pending gates, cooldowns, and retained failure snapshots are held in memory; they are not a separate on-disk transaction journal. Failure reports also write the player's UUID and diagnostic reference to the server log. Successful preference application does not consume or award items, money, or rewards.

Reset follows the world default rather than hard-coding 6 or 8. World-specific server configuration remains authoritative. Chunks does not edit `server.properties`, Spigot/Paper world configuration, or any simulation-distance setting.

## Manual Acceptance

Use an ordinary permitted player and an unauthorized player, a Java account, and a Floodgate/Bedrock account. Repeat identity tests after a Java account rename; LuckPerms operations must still target the authoritative server UUID and must never query an external identity service.

- Select each enabled preset through both GUI and commands; inspect CMI/Paper view state, the saved preference, and the effective LuckPerms node. Verify simulation distance stays unchanged through every selection, reset, reconnect, and world change.
- Reject bare numbers, unsupported argument counts, malformed numbers, values 3/7/17/32/111 when not explicitly allowed, and a valid number in the wrong preset group.
- Remove a preset while an old GUI is open. Its old button must not apply it. Restore or add an allowed preset in game and verify new GUI/help/tab output uses the current list.
- Preview a removal with stable affected players, an unmanaged player at the same distance, a Reset user, a pending save, unreadable LP data, and worlds with defaults inside/outside 4–16. Check UUIDs, counts, page navigation, shortcut replacement, and the offline-unknown notice. Preview must preserve preset/config hashes, LP state, menu sessions, cooldowns, and both distances. After a later separate removal, rerunning the old preview must reject the retired choice.
- Spam alternating options by GUI and commands. Exactly one operation should proceed per player while busy, followed by the configured cooldown. Test two different players concurrently without cross-applying preferences.
- Try shift-click, drag, double-click, number-key swaps, offhand swaps, dropping, creative inventory actions, and clicking the player's own inventory. No menu item may be taken, deposited, duplicated, or interpreted by its display name as authority.
- Close the menu, quit, reconnect, die, change worlds, revoke access, or reload during an operation. Confirm stale GUI actions are rejected and durable preference state is reconciled without repeated or cross-player delivery.
- Test persistence failures, a CMI command failure, a delayed LuckPerms update, plugin disable, clean restart, and an interrupted change. A command dispatch return value alone must not be reported as success.
- Inspect a failed request with conflicting inherited numeric, contextual, temporary, and explicit-denial permissions. Match the requested value, numeric maximum, contexts, source, value, expiry, and reference against the console log, including with `op=false`. Compare evidence captured before rollback with current state after staff repair.
- With staff `*`, `cmi.*`, and `cmi.viewdistance.*` grants, verify that an allowed numeric choice and reset work without changing global permissions. Inspect the separately labelled access-check maximum, which may be 64 while the numeric maximum is 4 or -1. A real higher numeric grant must still block a conflicting choice; non-integer numeric forms remain rejected and no staff `/chunks` route may bypass the preset range.
- Share the reference from a failed change and open that exact incident after logout, a later success, feature disable/re-enable, and a clean restart. Check `/chunks status`, history order/eviction, immediate/delayed recovery, repeated-log summaries, canonical UUIDs, Java/`.bedrock` names, ambiguous names, and pagination. Ordinary players cannot inspect staff history. Corrupt or interrupt a copied history file/save, verify the original file and new in-memory evidence remain available, repair storage, and retry with admin reload. No inspection may edit permissions, load offline identity data, or perform an external lookup.
- With a full inventory and items containing container/data components or third-party metadata, open and use the menu. Player items must remain byte-for-byte functionally unchanged.
- Check the blue border, bottom-left head, bottom-center help-book lore, and glowing return star immediately left of the bottom-right close barrier. Check Java/Bedrock presentation, pagination on help/admin/debug pages, and the external player-doc and staff-reference links.
- With a lower client request and a confirmed higher preset, check the status/head comparison and the note on each higher preset. Change your client Render Distance and reopen the menu to see the current report; no preference is changed. Compare Java and Bedrock/proxy reports, Paper's ambiguous initial 2, unavailable reports, unconfirmed/restored choices, and Reset in different worlds. Check mobile lore readability, `/chunks status` pages, cached-terrain explanations, and unchanged access/confirmation/cooldown behavior.
- Keep the menu open through each choice: verify Saving/Confirming, selected glow after confirmation, live head/status refresh, and the configured cooldown countdown without inventory reopen/flicker. Reset must glow independently of an equal numbered preset. Close or return to `/menu` during a pending save/countdown; completion must not reopen Chunks. Confirm failure and successful rollback use distinct status text, and revoked access closes the live menu.

[Plugin index](README.md)
