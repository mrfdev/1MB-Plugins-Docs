# Hide and Sheep

Hide and Sheep is a staff-run, timed search for **Woolbur**, Charlie the Vote Llama's mischievous nephew. It is exclusive to the 1MB community. The feature installs dormant, lets staff prepare an event, and starts only after an explicit command or GUI action. Players explicitly join each round, search among decoys, find the sheep with a different scale, and earn points to spend in the reward shop.

[Player guide](hideandsheep-player-guide.md)

## How Players Use It

Run `/sheep` to see the event status, location, travel option, personal statistics, story book, and rewards. A light-blue stained-glass border frames the menu. Its bottom-left player head shows statistics and its middle book opens help. The shining nether star, directly left of the bottom-right barrier, returns to `/menu`; the barrier closes the GUI. The admin button is visible only to viewers with the plugin's admin permission.

The home card says **No event running** and **Woolbur is resting** between rounds. It shows **Starting soon** during preparation and **Round ending** while a round finishes; none offers a teleport. Once staff start an event, the gathering countdown and active search both offer travel. The gathering card explains when Woolbur will hide; scoring is still closed. The open home menu updates about once per second while the feature is enabled. Clicking a waiting card checks fresh status without sending a join error.

Available features include:

- Explicitly prepared and started community hunts, dormant on first install.
- Round-specific joining and temporary fair-play restrictions for every participant, including staff.
- An arrival point and configurable search radius, normally 128 blocks.
- Named staff setups that remember the arrival point, round rules, and Woolbur's costume for later outings.
- Built-in Normal Regular, Speedrun, and High Difficulty round presets under Saved setups.
- Eight sheep designs plus a custom design, with target scales from 0.5 to 2.0.
- Normal-size decoys and one smaller or larger real sheep.
- An optional gathering countdown, normally 120 seconds, for players to clear inventory, teleport, and load in.
- Six-minute searches after gathering, with a boss-bar countdown, timed reminders, occasional nearby sheep sounds, a closing glow hint, and results.
- First, second, and third finder rewards, normally 100, 50, and 25 points.
- One to five bonus points for every distinct decoy cleared, based on the round's starting decoy count; each decoy pays once globally.
- A rising sheep celebration with sounds and particles after a find or decoy clear.
- Persistent participation, finds, lifetime points, spendable balance, and event summaries.
- Community feature point exchanges and ordinary-item CMI kits.
- A twenty-page Woolbur story and rules book, wrapped to fit within each page.

## Event rules

After staff explicitly start a prepared event, the default **120-second gathering phase** announces that Hide and Sheep is live, invites players to teleport with `/sheep`, and says **Woolbur will hide in 120 seconds**. The GUI and boss bar count down the arrival time. Players can clear inventory, travel, and let chunks load; Woolbur and his decoys have not spawned and cannot award points yet. A completed round entry through the Join action or `/sheep join` counts participation once for the same round. Arriving independently or touching a sheep without joining does not enter the player.

When gathering ends, the plugin verifies the prepared hiding spots and begins the search, with a fresh announcement and the full configured search timer. The normal six minutes do not include the gathering time. Set gathering to `0` to skip this phase. Stopping, reloading, disabling, unloading the event world, or restarting during gathering cancels that outing; it cannot later launch itself.

Each round has one real Woolbur; the first three different players to find that same sheep earn rewards. The target and decoys wear the same selected costume: inversion, changing colours, or both. The target alone uses a different scale; decoys remain adult sheep at normal scale. Props stay at their safe hiding positions and colour-changing costumes animate.

Sheep names stay hidden while searching, including the vanilla `Dinnerbone` label used by upside-down costumes. After a player's find and points are saved, that player can see **Woolbur** above the real sheep while nearby with a clear view. Other searchers do not see this reveal, and decoys never receive it. Size is the main clue; the closing glow hint can reveal the target during the final part of a search.

After a player has successfully joined that round, a close right-click, direct player tap, or physical touch counts. Discovery is based on the active target entity's identity and actual server player UUID. Ordinary sheep never award points. Each player can claim only one of the three places per event. Both Java and Bedrock players use their authoritative server UUID; names are presentation only.

Touching an event decoy clears it for everyone once the clear is saved and awards its clearer bonus points. The rate depends on the round's **starting decoy count** and stays fixed for the entire round:

| Starting decoys | Points per cleared decoy |
| --- | ---: |
| 1–2 | 5 |
| 3–4 | 4 |
| 5–8 | 3 |
| 9–12 | 2 |
| 13–16 | 1 |

Every distinct decoy pays that rate, including several cleared by the same player; there is no per-player round cap. Each decoy can clear and pay only once globally. Clearing decoys does not increase the rate of those remaining. Chat announces the clearer, actual points awarded, and remaining count. The bonus is separate from finding Woolbur, so a player can receive both. Clearing all twelve normal-regular decoys gives 24 points; combined with first, second, or third place, that player's total would be 124, 74, or 49 points. Decoys do not fill podium places or end the round when all are cleared. Older saved events retain their original three-point policy and awarded totals.

A successful find or decoy clear triggers a short rising sheep celebration with sounds and particles. The celebration is a temporary visual: the same real Woolbur stays at his hiding spot for the remaining finders. A cleared decoy stays removed. Touching celebration sheep cannot award points or clear another decoy.

Once a round starts ending, an already accepted discovery or decoy clear can still finish saving its points. Those awards remain in the final summary, but do not start new celebrations or search announcements. Normal completion lets an existing celebration finish within 30 ticks; an admin stop clears it immediately.

The player must have a valid admission for the current round, be online and alive in Survival or Adventure mode, and be physically close in the same world. A stale entry, pending join, withdrawn player or spectator cannot score. Projectiles do not count. Region cancellation does not block scoring: the plugin records an eligible interaction even when protection prevents ordinary interaction. It does not clear WorldGuard cancellation or allow damage, shearing, dyeing, breeding, or other changes to the event sheep.

The first finder earns the configured first prize. Second earns half and third earns one quarter. The first prize must be divisible by four so both discounts are exact. Defaults are 100, 50, and 25. The search ends after three unique finders or its deadline, normally six minutes after gathering. If nobody found Woolbur, the sheep wins. If only one or two players found him, they keep their awards and the event ends at the deadline.

The boss bar names the current phase, shows its remaining time, and includes `/sheep`. Public start and finish announcements use an aqua-blue headline and details matching the on-screen title, with a blank chat line above and below. The saved event summary includes participants, finders, awarded points, timing, and outcome. Participation is counted once per round after a completed join; reopening menus or finding a sheep without joining does not add participation or points. The `found` statistic counts only Woolbur discoveries. Lifetime earned points and spendable balance include the decoy bonus. Interrupted rounds do not restart automatically after a server restart.

Search reminders appear at **two minutes, one minute, thirty seconds, and ten seconds remaining**, only when that threshold is shorter than the configured search duration. They are emitted once per threshold during searching, never during gathering.

An admitted, eligible Survival/Adventure player who has not found Woolbur may hear a private baa when within **32 blocks** of him. These clues start after the first ten search seconds, have a **45-second per-player cooldown**, and are limited to **three per player per round**. Players who already found him do not receive them. Only that searcher hears the nearby-sheep cue; it does not broadcast a repeated sound to everyone in a small arena.

While finder places remain, Woolbur glows for the **last 5% of the search duration**, rounded up and clamped to **5–30 seconds**. This gives six seconds for Speedrun, twelve for High Difficulty, and eighteen for Normal Regular. It is a late help cue, not a thirty-second shortcut in every round. Decoys do not receive this glow.

Round completion removes event sheep, the private Woolbur label, the boss bar, and the event's chunk tickets. Leaving the server removes that player's boss-bar membership immediately; reconnecting after the round ends does not restore the old countdown.

## Player commands

| Command | Purpose |
| --- | --- |
| `/sheep` | Open the event menu. |
| `/sheep help` | Show command help. |
| `/sheep info` | Show introduction and documentation link. |
| `/sheep join` | Join this round under its fair-play rules and travel to the arrival point. |
| `/sheep leave` | Withdraw from this round and release its restrictions, preserving points and history. |
| `/sheep stats` | Show participation, finds, lifetime earned points, and balance. |
| `/sheep rewards` | Open the reward shop. |
| `/sheep book` | Read the paginated story and rules. |

`/hideandsheep` is an alias of `/sheep`.

## Joining and fair play

LuckPerms is required for joining. Entry first saves a temporary membership in the reserved **`hideandsheep_playing`** subgroup and a round-specific admission record. The safe arrival teleport must complete before the player can score. A failed permission save, invalid entry or failed teleport cannot grant scoring access. Browsing the menu, history and rewards does not require joining; reward delivery still has its own normal requirements.

This is an additional subgroup only. The plugin does not replace a player's rank, copy their permissions, restore an old permission snapshot, or write their metadata or primary group. It maintains the reserved group's expected negative permission nodes and its fixed weight of **-2147483648**, below ordinary rank weights. This prevents the temporary group from winning LuckPerms' calculated primary-group selection against an unweighted `default` group. Existing denial-only versions of the reserved group receive this weight automatically; other weights, parents, metadata or permission grants in that group block admission for staff review. Joining also fails if LuckPerms still selects the reserved group as primary. Normal rank weights are never changed.

LuckPerms may expose a calculated `weight` metadata value of `-2147483648` during participation if none of the player's normal groups has any weight. This is derived from the temporary group's weight and disappears when it is removed; it is not a stored player-metadata change. Existing higher normal weight metadata and rank prefixes/suffixes remain in effect. A player already inheriting the reserved group through another rank cannot start a new entry until that relationship is reviewed. Do not reuse it for another purpose or inherit it from a permanent rank.

The subgroup denies WorldEdit/FAWE navigation and the relevant CMI travel, TPA, flight, speed, game-mode and vanish commands. The plugin also guards direct commands, compass actions and actual teleports, because broader grants or a plugin's own wildcard handling can otherwise bypass a negative child permission. Staff have no gameplay bypass while entered. Vanilla ender pearls and elytra remain allowed. Other travel, including portals or another plugin's teleport, requires leaving first; the one-use arrival teleport is the only event travel exception.

CMI teleport requests are refused when either player is participating, including automatic acceptance. A command or plugin teleport by someone outside the event also cannot land within **two blocks of a restricted online participant** in the same world. This checks the actual destination, so a request already accepted and warming up cannot land beside that participant. It also intentionally blocks unrelated command/plugin arrivals inside that small distance; it does not close the wider event area or block pearls and elytra. The event's authorized Join teleport still works. Staff who need host teleports should use `/sheep leave` first, and ask any participating destination player to leave too.

Joining switches off creative-style flight and resets custom walking speed. Flight, custom walking speed, game mode and vanish are checked while playing. Normal flight and walking-speed settings are not automatically restored on exit; normal permissions remain intact, and players can enable their own perks again after leaving. The plugin does not restrict F3 hitboxes or client minimaps/entity radar.

`/sheep leave` withdraws the player immediately from scoring and removes the temporary subgroup. It remains available for self-cleanup while the feature is dormant. Leaving, death or a world change prevents rejoining the same round; awarded points and historical participation remain. Disconnecting alone retains the current round's admission and restrictions, and reconnecting reconciles them. Round completion, interruption and shutdown release all owned entries. The temporary membership expiry is an additional failsafe: remaining gathering time plus search time, with a 90-second allowance for preparation and asynchronous cleanup. Normal round ending or leaving removes it immediately through the cleanup flow; players do not have to wait for that expiry.

### Repairing a stuck entry

Use `/sheep debug cleanup <uuid|player>` with the feature admin permission or direct console access. It works while dormant and deliberately attempts removal even if the plugin has no admission record or believes cleanup already happened. It withdraws the player from any current round and force-removes direct memberships in the reserved subgroup, including stale temporary or permanent memberships. Repeat it safely if a previous attempt failed. It does not clear points, history, reward receipts, unrelated groups, permissions or metadata.

A supplied UUID must be the player's actual canonical server UUID. A name must exactly match a locally known real username, ignoring case and preserving any Floodgate prefix such as `.`. Nicknames, ambiguous matches and unknown names are rejected; no external identity lookup or name-based LuckPerms command is used. An actual UUID can repair an offline record even when the name is no longer in the local cache.

```text
/sheep debug cleanup mrfloris
/sheep debug cleanup .BedrockPlayer
/sheep debug cleanup <actual-server-uuid>
```

If the subgroup is inherited through another permanent group, cleanup reports that remaining inheritance rather than changing the player's normal rank. Correct that accidental group relationship separately. A permission-store or admission-store failure is reported; do not delete progression files as a cleanup workaround. Once force removal from LuckPerms is confirmed, normal movement is restored even if the participation record cannot be saved. That partial-success warning still leaves scoring and new entry closed: repair the storage problem and restart before playing again. If LuckPerms removal itself cannot be verified, the plugin keeps its movement guards active for another cleanup attempt.

## Preparing an event

1. Choose a safe arrival point in a loaded world. The event world is not restricted to reward claim worlds.
2. Enable the dormant feature, then open `/sheep admin`.
3. Set the arrival point, radius, costume, search duration, gathering countdown, decoy count, and first-place reward.
4. Review readiness and verify that the chosen area has safe hiding positions.
5. Use Start in the admin menu or `/sheep admin start` from a player or the direct server console.

Enabling does not automatically start a hunt. No schedule or login trigger starts one. Starting must pass the current configuration, storage, world, spawn, and active-round checks. Configuration edits do not mutate an already running event.

The admin/internal state `READY` means the feature is enabled with no live round. It remains available to staff and placeholders, while the player home card says **No event running**. Staff must still prepare and explicitly start the next round.

A normal preparation sequence is:

```text
/sheep debug enable true
/sheep admin setspawn
/sheep admin setup preset normal_regular
/sheep admin status
/sheep admin start
```

`setspawn` uses the in-game sender's current location. Console can start an already prepared event. Stop an event with `/sheep admin stop`; return the feature to dormancy with `/sheep debug enable false`.

The admin GUI offers the same readiness-gated start action and preparation controls. Its gathering control includes the 45-second Speedrun option; the command accepts every whole second from 0 through 600. Changes are saved before the next event can start. Hiding spots use existing chunks without terrain generation, within the horizontal radius and 24 blocks above or below the arrival height. If safe positions cannot be found within the bounded preparation window, the start fails without launching a round. Staff must still verify the physical arena: a syntactically valid location is not proof that the surrounding terrain makes a fun or accessible hunt.

### Saved event setups

The **Saved setups** screen includes three built-in round presets. They supply rules and a costume at your **current prepared arrival point**; they do not invent a world or teleport location.

| Preset ID | Gathering | Radius | Decoys | Search | First prize | Scale |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `normal_regular` | 120 sec | 128 blocks | 12 | 360 sec | 100 | 0.75 |
| `speedrun` | 45 sec | 60 blocks | 2 | 120 sec | 200 | 2.0 |
| `difficulty_high` | 120 sec | 256 blocks | 16 | 240 sec | 500 | 0.5 |

All three use upside-down, colour-changing sheep with light-blue base dye. The normal-sized decoys wear the same costume. Choose a built-in in the menu or run `/sheep admin setup preset speedrun`, then review the preparation before starting. You may further adjust any setting and save it under your own location name.

**Reset to default**, or `/sheep admin reset`, reapplies the `normal_regular` round rules. It preserves the current arrival point, feature enablement, reward offers, reward-world mappings, and your named setups. It never starts a round. The GUI reset offers confirmation. Existing installations keep their configured preparation when upgraded; use a preset or reset deliberately to adopt these new defaults. A fresh installation starts with the normal-regular rules but still needs an arrival point and explicit enable/start.

Staff can keep named setups such as **Spawn Meadow** and **Forest Mischief**. Each remembers the arrival world and exact position/direction, search radius, search duration, gathering countdown, first-place points, decoy count, and exact costume settings, including a custom costume. The saved setup does not contain player progress, reward-shop settings, or a running event.

Prepare an outing as usual, then save it with a name:

```text
/sheep admin setup save Spawn Meadow
/sheep admin setup list
/sheep admin setup load Spawn Meadow
/sheep admin status
/sheep admin start
```

Names may contain spaces; do not add quotation marks. Use 1–40 letters, numbers, spaces, apostrophes, underscores, or hyphens. Names match without case sensitivity, and repeated spaces are normalized. Up to 50 setups can be stored. Saving an existing name fails instead of replacing it. Use `/sheep admin setup replace Spawn Meadow` deliberately to replace that setup with the current preparation, or `/sheep admin setup delete Spawn Meadow` to remove it.

In `/sheep admin`, choose **Saved setups** to browse the paginated list and inspect each setup's location and rules. Its detail page offers loading, replacing with the current preparation, and deleting; replacement and deletion have confirmation screens. **Save current setup** closes the menu and offers a suggested save command so staff can type a name. Typing the same command directly works on clients that do not support clickable chat suggestions.

Saving, loading, replacing, and deleting require an idle event and the admin permission. These controls also work while the feature is dormant. Loading restores the preparation only: it does not teleport staff, enable the feature, announce an outing, or start a round. Review the loaded settings and use **Go live** or `/sheep admin start` when ready. An unavailable world or invalid saved location cannot be loaded; start still checks the actual arrival floor and safe hiding spots. Deleting a saved setup leaves the current preparation intact.

Saved setups survive reloads and restarts in `HideAndSheep/config.yml` under `saved-setups`. Saving a setup is a snapshot; later preparation edits do not change it unless staff explicitly replace it. Each new round still chooses fresh random hiding spots. Older saved setups without a gathering field adopt the 120-second default; replace a setup after changing the gathering time if that outing needs another value.

## Staff commands

Player access to these staff commands uses `onembcmi.hideandsheep.admin`. The shared `/sheep debug enable` lifecycle control also accepts `onembcmi.global.config.set`; direct console access is supported. Preparation also works while the feature is dormant.

| Command | Purpose |
| --- | --- |
| `/sheep admin` | Open preparation controls, or show status to console. |
| `/sheep admin enable` | Enable gameplay and reward facilities without starting an event. |
| `/sheep admin disable` | Return to dormancy; stop any current event with `/sheep admin stop` first. |
| `/sheep admin setspawn` | Save the in-game sender's safe current position. |
| `/sheep admin radius <blocks>` | Set horizontal radius, 10 through 256. |
| `/sheep admin duration <seconds>` | Set search duration, 30 through 3600 seconds, excluding gathering. |
| `/sheep admin gathering <seconds>` | Set arrival countdown, 0 through 600 seconds; default 120, and 0 skips it. |
| `/sheep admin points <amount>` | Set first-place points, 4 through 1,000,000 and divisible by four. |
| `/sheep admin decoys <count>` | Set 1 through 16 decoys; the starting count determines each decoy's points. |
| `/sheep admin preset <id>` | Select one of the eight sheep designs below. |
| `/sheep admin custom <scale> <upside-down> <rainbow> <color>` | Create and select a custom design; booleans use `true` or `false`. |
| `/sheep admin setup` | Open saved setups, or list them from console. |
| `/sheep admin setup list` | List built-in round presets and saved setups. |
| `/sheep admin setup preset <id>` | Apply a built-in round preset at the current arrival point. |
| `/sheep admin reset` | Restore `normal_regular` round rules without changing arrival, enablement, rewards, mappings, or saved setups. |
| `/sheep admin setup save <name...>` | Save the current preparation under a new name. |
| `/sheep admin setup load <name...>` | Restore a saved preparation without enabling or starting an event. |
| `/sheep admin setup replace <name...>` | Replace an existing setup with the current preparation. |
| `/sheep admin setup delete <name...>` | Remove a saved setup; leave current preparation and player points intact. |
| `/sheep admin world <role> <actual-world,...>` | Map a logical reward-world role to one or more exact world names. |
| `/sheep admin start` | Validate and open the prepared event, beginning gathering unless its duration is 0. |
| `/sheep admin stop` | Stop a round or cancel preparation. |
| `/sheep admin status` | Show current readiness and preparation status. |
| `/sheep admin reload` | Reload configuration/translations through the guarded shared route; safely interrupt a current round. |
| `/sheep admin history` | Show the ten most recent saved event summaries. |
| `/sheep admin claims [player-uuid]` | Inspect reward claims, optionally for an actual player UUID. |
| `/sheep admin receipt <claim-uuid>` | Inspect one saved receipt and its evidence. |
| `/sheep admin retry <claim-uuid>` | Verify an existing kit save proof without redelivery, or check a native point receipt under its original identity. |
| `/sheep admin resolve <claim-uuid> delivered|refund <evidence note...>` | Reconcile a review receipt after verifying what happened. |
| `/sheep debug` | Show shared technical diagnostics and available debug actions. |
| `/sheep debug enable true|false` | Change the shared dormant lifecycle; `false` also interrupts a running round immediately. |
| `/sheep debug cleanup <uuid|player>` | Force-withdraw a player and remove their reserved subgroup membership, even with no active/stale record; works while dormant. |

Example custom design and local reward mapping:

```text
/sheep admin custom 0.7 true true LIGHT_BLUE
/sheep admin world wild world
/sheep admin world nether world_nether
/sheep admin world end world_the_end
```

The wardrobe GUI lets staff cycle custom scale, inversion, rotating colours, and base dye. Turning both inversion and rotation off is rejected with an explanation; enable one before turning the other off. Commands allow the full validated numerical ranges, while GUI controls cycle common values.

## Sheep designs

| Preset ID | Display name | Target scale | Costume |
| --- | --- | --- | --- |
| `pocket_prism` | Pocket Prism | 0.65 | Rotating colours |
| `grand_prism` | Grand Prism | 1.45 | Rotating colours |
| `topsy_tiny` | Topsy Tiny | 0.75 | Upside down, light blue |
| `cloud_cousin` | Cloud Cousin | 1.35 | Upside down, white |
| `disco_tumble` | Disco Tumble | 0.55 | Upside down and rotating colours |
| `woolburs_entrance` | Woolbur's Grand Entrance | 1.65 | Upside down and rotating colours |
| `micro_mischief` | Micro Mischief | 0.5 | Upside down and rotating colours |
| `mighty_woolbur` | Mighty Woolbur | 2.0 | Upside down and rotating colours |

A custom target must have scale from 0.5 through 2.0, at least 0.15 away from normal scale 1.0. It must use inversion, rotating colours, or both. Its base dye colour applies before rotation. The same costume is applied to the normal-size decoys, so size remains the dependable clue.

## Reward shop

The menu separates **Point exchanges** into their own row, with **Item kits** below. Offers stay in their category when other offers are disabled. Each offer and its confirmation page show the reward type, cost in Hide and Sheep points, and a preview of what the player receives. Kit previews read the configured CMI template; unavailable templates are clearly labelled.

The generated offers are modest reviewable starting values; tune them to the live server's economy before enabling public claims.

| Offer | Cost in sheep points | Delivery |
| --- | ---: | --- |
| `discord-points` | 40 | 10 DiscordChat points |
| `afk-points` | 40 | 10 AFKShrine tokens |
| `forage-points` | 40 | 25 Forage points |
| `autosell-points` | 100 | 1 AutoSell Broker Point |
| `appreciation-points` | 200 | 1 Appreciation Point |
| `pocket-snacks` | 6 | `hideandseek_pocket_snacks`: 2 cookies and 1 apple |
| `picnic` | 20 | `hideandseek_picnic` kit |
| `wool-basket` | 25 | `hideandseek_wool_basket` kit |
| `trail-kit` | 35 | `hideandseek_trail_kit` kit |
| `garden` | 45 | `hideandseek_garden` kit |
| `shepherd` | 60 | `hideandseek_shepherd` kit |

Offers use `rewards.offers.<id>.enabled`, `cost`, and the applicable `amount` or `kit` settings. The receiving feature must be installed and available. Point transfers use its supported receipt-backed provider. The Broker and Appreciation rates are conservative starting values that staff can tune: one Broker Point costs the same as one default first-place award, while one Appreciation Point costs the same as two. These exchanges credit points only; they do not grant AutoSell sales, broker levels, streaks, Appreciation activity, or sending allowances.

**Woolbur's Pocket Snacks** is the first of six item kits. Its default 6-point cost is affordable after clearing three normal-regular decoys, without finding Woolbur. The supplied template contains two **Woolbur's Pocket Cookies** and one **Woolbur's Crunchy Apple**; staff may customize it, and the shop previews the actual loaded contents. Players may purchase it repeatedly whenever they have enough points and meet the normal claim requirements.

**Every kit claim also requires active Forage and its inventory save-proof service**, alongside CMI's loaded item definitions. This does not require the recipient to own or stand at a Forage Camp. Missing or unsupported save-proof integration blocks the purchase before spending. Command acceptance and an inventory readback alone are not treated as durable delivery.

`config/cmi/kits/hideandseek.yml` contains the six item-only templates for staff review. Install it in CMI's `Kits` directory and load it using the normal CMI configuration workflow. The templates disable ordinary CMI kit access so this shop owns payment and delivery. The shop snapshots exact item stacks and checks whether the entire kit fits before delivery; before/after inventory evidence is retained with its receipt. A provider checkpoint verifies that Paper and, where applicable, Multiverse-Inventories have durably saved the resulting inventory before the receipt is finalized. Checkpoint markers belong to player/provider state, not the reward items. Review them in game before changing their contents or making them live. They contain no newly added unique item identity markers.

Reward claims recheck permission, current world, current offer, balance, provider availability, inventory capacity, and the shared reward-delivery guard. Item claims require AutoSell to be off. Costs and reservations are persisted before delivery. Kit readback enters a reviewable inventory-save state while provider proof is pending; automatic checking finalizes it once the saved inventory is proven. Provider-confirmed cancellation before any effect refunds the cost. Ambiguous outcomes remain reviewable instead of issuing the reward twice.

The supplied templates give 13 selected stacks light-blue Woolbur names and one or two short lore lines, with italics disabled. Only `minecraft:custom_name` and `minecraft:lore` are added; these decorations do not change quantities or gameplay behavior. No unique identifiers or custom PDC are added. Staff can inspect complete loaded items without delivery or payment with `/forage admin kits preview hideandseek_pocket_snacks` (substitute any of the six kit IDs above). Close kit editors before replacing the file, then use CMI's normal configuration reload; `cmi reload kits` is not a dedicated kit-only reload in reviewed CMI 9.8.10.5 or 9.8.11.0. The [25 October integration update record](../compatibility-tests/java-cmi-update-2026-10-25.md) tracks the current provider review and runtime checks.

### Reward world mapping

Map each logical game mode to its actual world names with `rewards.worlds.<logical>`. Names must match the server's loaded worlds. Event world selection is separate.

```yaml
rewards:
  worlds:
    end: [end]
    nether: [nether]
    wild: [wild]
    general: [general]
    cave: [cave]
    acid: [acid]
    oneblock: [oneblock]
    skyblock: [skyblock]
    skygrid: [skygrid]
    chunkblock: [chunkblock]
```

For a local test setup, use actual names such as `wild: [world]`, `nether: [world_nether]`, and `end: [world_the_end]`. A production server may map `wild: [wild]`. Other unmapped worlds cannot claim rewards. Use exact mappings; a world's environment alone does not authorize claims.

## Permissions

| Permission | Default | Meaning |
| --- | --- | --- |
| `onembcmi.hideandsheep.use` | true | Open the menu, read help and story, view personal statistics. |
| `onembcmi.hideandsheep.join` | true | Enter a round and score while its admission remains valid. |
| `onembcmi.hideandsheep.claim` | true | Spend points in eligible worlds. |
| `onembcmi.hideandsheep.admin` | false | Prepare, manage saved setups, start, stop, enable, debug, force-clean participation, and reconcile rewards. |

The admin GUI button is permission-gated. Permission checks run again when a GUI action executes. The player permissions do not grant staff controls. Use actual server UUIDs if managing these permissions through LuckPerms. `/sheep leave` remains a self-cleanup escape even if normal access is revoked. Admin permission does not bypass participation rules or movement restrictions.

## Placeholders

These values are registered through the Shared Library's PlaceholderAPI expansion while the feature is active:

| Placeholder | Value |
| --- | --- |
| `%onembcmi_hideandsheep_state%` | Internal state, such as `DORMANT`, `READY`, `PREPARING`, `GATHERING`, or `LIVE`. `READY` means enabled with no live round, not open for travel. |
| `%onembcmi_hideandsheep_live%` | `true` during the announced gathering phase or active search. |
| `%onembcmi_hideandsheep_world%` | Current or most recently announced event world, or `Not prepared`. |
| `%onembcmi_hideandsheep_time_left%` | Remaining search seconds, rounded up; zero during gathering and outside a search. |
| `%onembcmi_hideandsheep_gathering_left%` | Remaining arrival-countdown seconds, rounded up; zero outside gathering. |
| `%onembcmi_hideandsheep_participated%` | The viewer's unique event participation count. |
| `%onembcmi_hideandsheep_found%` | The viewer's successful Woolbur finds; decoy clears are excluded. |
| `%onembcmi_hideandsheep_earned%` | Lifetime sheep points earned. |
| `%onembcmi_hideandsheep_points%` | Current spendable sheep points. |

Player values return zero when no player context or ready ledger is available. Placeholder reads use committed in-memory state and perform no filesystem or network lookup. Shared debug catalogs also list these values; `/1mblib debug plugin hideandsheep all` provides the feature's registered metadata.

## Configuration and files

```text
plugins/1MB-CMIAPI/HideAndSheep/config.yml
plugins/1MB-CMIAPI/HideAndSheep/state.yml
plugins/1MB-CMIAPI/HideAndSheep/state.yml.backup
plugins/1MB-CMIAPI/HideAndSheep/participation.yml
plugins/CMI/Kits/hideandseek.yml
```

| Settings | Purpose |
| --- | --- |
| `enabled` | Defaults to false; feature lifecycle switch. |
| `event.spawn.*` (`world`, `x`, `y`, `z`, `yaw`, `pitch`) | Prepared arrival position. Prefer `setspawn` for safe input. |
| `saved-setups` | Named snapshots of complete round preparation. Manage through `/sheep admin setup`; separate from the progression ledger. |
| `event.radius` | Horizontal radius, default 128. |
| `event.duration-seconds` | Search duration, default 360, excluding gathering. |
| `event.gathering-seconds` | Arrival countdown, default 120; 0 skips it, maximum 600. |
| `event.first-points` | First-place prize, default 100. |
| `event.decoys` | Normal-size decoy count, 1–16; default 12. |
| `event.preset` | Selected costume ID or `custom`; fresh defaults use the `normal_regular` custom costume. |
| `event.custom.scale`, `upside-down`, `rainbow`, `color` | Custom design fields. |
| `rewards.worlds.<role>` | Exact permitted reward-world names. |
| `rewards.offers.<id>.*` | Offer enablement, cost, amount, or kit ID. |
| `gui.filler-material` | Defaults to `LIGHT_BLUE_STAINED_GLASS_PANE`. |

`participation.yml` contains only the feature's admission leases, withdrawal records and cleanup state; it is separate from points and reward receipts. It does not contain snapshots of a player's other LuckPerms settings. The progression ledger is long-lived data, not disposable cache. Back up config, ledger, and provider journals coherently. Stop the server before manual ledger maintenance. Installing the kit file is a separate reviewed configuration step; suite JAR synchronization does not overwrite CMI configurations or player data. Preserve live kit customizations during this update; the round presets and reset do not replace CMI kit files.

## Persistence and recovery

Player statistics and balances live with event records and reward receipts in one durable ledger. A successful find atomically records the place, points, participation, and wallet change. A reward reservation atomically records its debit and receipt. Filesystem writes run on a bounded serialized worker; Bukkit world, player, entity, and inventory work remains on the server thread.

A decoy clear atomically records the globally cleared sheep, its frozen per-decoy award, participation, and wallet change. The decoy disappears and the celebration starts only after that save succeeds. Ledger schema 5 stores each event's `initial-decoys`, `decoy-points`, reward policy, and gathering/search boundary. The rate is frozen when the round is created, including before gathering, so clearing sheep or later configuration edits cannot change it. Older schema 1–4 records migrate without changing historical awards, balances, or claims: the previous per-decoy rule retains its three-point rate, and rounds under the former first-clear-per-player rule retain their original three-point and zero-point clears. Only newly created rounds use the new count-based rates. Earlier builds cannot read schema 5. A rollback requires a reviewed matching data snapshot, not simply replacing the JAR or overwriting a ledger containing newer rewards.

On restart:

- A gathering or searching event becomes interrupted; neither countdown nor search resumes automatically.
- Interrupted admission leases are cleaned up against LuckPerms. Pending or failed removal remains recoverable; new entry cannot silently bypass it.
- A reserved reward whose delivery was never attempted is refunded.
- An attempted delivery requires review.
- A confirmed durably delivered reward finalizes without being issued again.
- Finalized and refunded receipts remain settled.

A malformed authoritative ledger blocks play and purchases. It is not treated as empty progress and does not silently revert to an older balance. Backups remain for careful staff inspection. Restore only a coherent event/wallet/receipt state with the server stopped.

Use `/sheep admin claims [player-uuid]` and `/sheep admin receipt <claim-uuid>` to inspect holds. Use `/sheep admin retry <claim-uuid>` to check the original receipt. A kit retry verifies save proof only and never issues the items again. Waiting kit saves are also checked automatically and finalize after provider proof, including after re-enabling the feature. A native point check requires the original recipient online and eligible. DiscordChat can retry under its original permanent receipt identity. AFKShrine, Forage, AutoSell, and Appreciation only settle a native receipt that proves the original credit completed; absent, compacted, or unresolved evidence requires staff reconciliation without another credit. For a held item delivery, establish whether the player actually received the kit before choosing a resolution. Finalization accepts a delivered reward without issuing it again. Refund is appropriate only when delivery did not happen. Never refund merely because a receipt is pending. Resolve only a `REVIEW` receipt with `/sheep admin resolve <claim-uuid> delivered|refund <evidence note...>` and record the evidence behind that decision.

## Player FAQ

### How do I join?

Run `/sheep` after the event announcement and select **Join the gathering**, or **Join the live event** once searching begins. You can also use `/sheep join`. Wait for that round's join to complete; walking into the area alone does not make touches count. The menu shows the location and search radius. During the default 120-second gathering countdown you can teleport and get ready; wait for the search announcement before looking for sheep. Between rounds it says **No event running**, with no teleport offered.

### How do I spot Woolbur?

Look for a different-sized sheep. Normal-size sheep are decoys even if they share his upside-down or colourful costume.

### Can a protected region prevent my discovery?

No. Close interaction with the actual event sheep can count even when region protection cancels ordinary interaction. You must still meet the game rules.

### Why did my second touch give no points?

Each player can earn one Woolbur finder reward per round. The three places belong to three different players. Decoys are separate: each distinct decoy you clear pays the round's fixed decoy rate, but the same decoy cannot pay anyone twice.

### What happens to spent points?

Spending reduces the available balance. Lifetime earned points, participation, and finds remain visible in `/sheep stats`.

### Why is my reward blocked?

Check the message for its required world, available points, integration status, inventory space, or AutoSell setting. A previous unresolved delivery blocks another purchase. Ordinary inventory-save waits finalize automatically when proof arrives; ambiguous receipts require staff reconciliation.

## Integrations and API use

The Shared Library supplies feature lifecycle, metadata, permissions, help/debug routes, placeholder registration, hardened GUI sessions, and reward safety. LuckPerms provides the temporary participation subgroup and is required for joining, with UUID-only API operations. CMI supplies reviewed kit item definitions. DiscordChat, AFKShrine, AutoSell, and Appreciation are optional point providers. Forage provides its point exchange and the inventory save-proof service required for all item-kit claims. If Forage is unavailable, event gameplay and other available point exchanges can continue, but kit claims fail closed. PlaceholderAPI is optional for placeholder use; WorldGuard is not required.

Paper's supported API provides sheep scale, dye colours, Adventure names, entity identity, bounding boxes, cancellation-aware listeners, safe chunk/travel operations, and the in-game book, boss bar, sounds, and chat. No NMS or reflective server internals are used. Event props are non-persistent, protected from alteration, and cleaned up on finish or shutdown. Ordinary reward item metadata is retained.

The GUI uses server-owned inventory/session identity and validates action state on every click. Shift-click, drag, number-key swaps, double-clicks, creative actions, offhand swaps, stale sessions, close, quit, and disabled-feature actions are handled by the shared GUI guard.

## Test and operating checklist

Test dormant startup, explicit enabling, rejected unprepared start, gathering travel with no scoring or sheep, the full search timer after gathering, zero-countdown starts, cancelled countdowns, every preset, one custom design, protected interaction, all three places, duplicate touches, empty and partially completed timeouts, interruption, reconnect, and cleanup. Confirm summaries and balances match the accepted finds. Test an unjoined bystander, pending entry, leave and attempted same-round rejoin, death, world change, reconnect, stale cleanup by actual UUID and exact Java/Bedrock name, and expiry/restart recovery. Check CMI wildcard staff, WorldEdit command and compass shortcuts, already-pending TPA, flight, speed, vanish, ender pearls and elytra. Verify that cleanup preserves unrelated LuckPerms data and all earned points.

Review each CMI kit in game. Test point transfers, unavailable integrations, full inventories, AutoSell, all world mappings, stale menu clicks, and interrupted receipt reconciliation. Automated tests and server startup do not replace visual gameplay acceptance with connected Java and Bedrock players.

Compile with the installed Oracle JDK 25 and Java 25 bytecode through `scripts/gradle-oracle.sh`; automated tests and the maintained Paper 26.3 server use the installed Oracle JDK 27. The scripts discover and validate the current installed patch versions on each invocation. Stop that server before `scripts/build-all.sh`; distribute only the complete numbered suite. Stage a manual live handoff with `gradle stageTestedJarsForLive` after gameplay acceptance.

[Documentation index](README.md)
