# Halloween Ghost Hunt

GhostHunt is the Halloween presentation of the shared CoconutHunt event engine. Players use `/ghost` to find private, collectible Ghost heads in the configured `halloween` world. The 2026 edition runs from Friday, October 30 through Monday, November 2, with 20 new Ghosts on each of four cumulative daily waves: 80 Ghosts total. Each edition keeps its own registry, immutable snapshot, progress, points, claims, lifecycle receipts, reports, and debug data.

The implementation deliberately remains inside the shared `1MB-CMIAPI-EventHunts` host. Its internal CoconutHunt files, PDC owner, playerdata, permissions, placeholders, and reward safety remain unchanged while the public plugin identity now matches the multi-event role. The jar provides `CoconutHunt`, `GhostHunt`, and the isolated `DoorHunt` compatibility identities; `/coconut` continues to serve Summer and `/doors` serves Trick-or-Treat Doors without data reconstruction. The canonical host defaults are `modules.coconut.enabled: false`, `modules.ghost.enabled: true`, and `modules.doors.enabled: false`. Ghost and Doors may run simultaneously in `halloween`. `/ghosthunt` remains a compatibility alias for `/ghost`; see [Door Hunt](doors.md) for the separate door interaction and persistence model.

Implemented and proposed shared-host improvements are tracked in the [Event Hunts quality-of-life roadmap](event-hunts-roadmap.md); every remaining proposal still requires a separate greenlight.

`/hunt` opens the shared fixed 54-slot/six-row seasonal-event index. Ghost's card automatically moves between public live, authorized staff test, upcoming, claim, attention, ended, and dormant sections; clicking it opens the Ghost GUI. Its private current-player section follows the production edition shown on the card and reports today's finds, total finds, and claimable rewards without reading or mutating playerdata. Module tooltips are capped at 12 lines for smaller displays. Status-authorized staff see compact readiness totals and the module-status command; complete location, reward-provider, claim, and actionable diagnostics remain in status and preflight. Ordinary players see only friendly scheduling and event details. `/hunt ghost ...` routes only to `/ghost ...`. `/hunt admin module ghost <on|off>` changes the Ghost module without disabling Doors, Coconut, or the host jar.

## Available Features

- a six-row `/ghost` overview with progress, waves, streaks, rewards, history, help, and shared Hunt/server-menu returns
- configurable annual editions such as `halloween_2026`, each linked to the reusable `ghost` theme
- event-bound setup heads with a unique id, event id, theme, texture variant, world, coordinates, region, wave, and placement timestamp
- one private collection opportunity per Ghost per player; a discovery never removes the head for anyone else
- four cumulative 20-Ghost waves, independent calendar-day rewards, and perfect all-80 completion
- four independently claimable daily CMI kit rewards plus one perfect-weekend bonus box
- nine bundled Ghost head textures, randomized when a setup head is placed and then persisted for that location
- private themed holograms for available, caught, and later-day Ghosts, with particles only on currently available and uncaught locations
- `/ghost hint` direction-and-distance guidance to the nearest eligible Ghost, without exposing an id or coordinates
- a private capture effect that raises a temporary outfitted Ghost, plays its sound and particles, then removes it
- `/ghost effects <full|reduced|off>` plus a GUI toggle; every mode retains full participation and reward eligibility
- a configurable Haunting Chain bonus that awards points but does not count as a find or alter perfect-completion fairness
- configured-edition history and claims through each edition's snapshot, phase, claim-deadline, and reward-world rules; disabled-theme fallback is limited to immutable `ACTIVE`/`CLAIMING` editions
- guarded `/hunt admin event` selection with preflight, immutable snapshot verification, force protection for a live switch, and an audit record
- an isolated `debug_halloween_2026` namespace with any-world testing and live reward commands suppressed by default
- migration backups for older registry, state, event, reward, theme, and CoconutHunt playerdata schemas
- chunk-indexed proximity searches with hard candidate, hologram, particle, sound, and effect caps

## Player Experience

Run `/ghost`, then use `Visit the Halloween world` to travel to the event. Right-click an unlocked Ghost head with the main hand. Left-clicking is not a discovery action. Every Ghost stays in the world for other players and counts only once per player for that edition.

Nearby snapshot heads use private TextDisplay labels: orange `Ghost Hunt: Uncaught` for a currently available Ghost, green `Ghost Hunt: Caught` after that player finds it, and purple `Ghost Hunt: Unlocks Day <day>` before its wave. Soul spotting particles appear only for the orange, unlocked-and-uncaught state. Another player's capture never changes what the viewer sees.

The overview shows the current event phase and day, cumulative availability, personal found total, today's progress toward 20, the four-date completion record, five rewards, discovered ids, event history, and effect preference. Every six-row page uses the shared footer: the viewer's skinned head in bottom-left slot 45 opens personal progress and shows the edition, finds, daily count, compact time until the next Europe/Amsterdam midnight reset, streak, Ghost Point balance, earned/spent points, and community contribution. Back, the Ghost Hunt overview, `All Event Hunts`, `Back to Server /menu`, and Close occupy the standard navigation slots. The help page posts a complete, explicitly clickable documentation URL in chat without putting the long URL in item lore.

Ghost reward cards use the shared Event Hunts status legend: gray `Locked`, yellow `In progress`, orange `Ready to claim`, green `Claimed`, and red `Delivery needs attention`. A recorded Halloween claim whose durable direct-kit receipt is not finalized is visibly red instead of being presented as safely completed. This is a read-only translation of the existing eligibility, claim marker, and transaction journal; claim and delivery rules are unchanged.

Each daily wave contains exactly 20 Ghosts. A player may catch older unlocked Ghosts later, but that calendar day's `daily_<day>` kit is earned only by making the configured 20 new finds on that event date. The four daily rewards are independent: missing one date does not prevent a later date's 20-find kit. Capturing all 80 snapshot Ghosts and qualifying on all four event dates unlocks the fifth reward, the perfect-weekend bonus box. Earned kits may be claimed in the configured reward worlds.

Reset guidance is intentionally quiet. The countdown is passive GUI lore. Ghost no longer uses its broad once-per-day login reminder. Instead, during the final `reminders.daily-reset.window-minutes` before local midnight (90 by default), the first successfully saved Ghost find may add one short chat line if the player is still below the daily target. Its local-date marker is stored with that find, so reconnecting or restarting cannot repeat it. Completing 20/20 suppresses it, and disabling `reminders.daily-reset.enabled` removes the chat reminder without hiding the GUI countdown. There is no repeating player scan or global announcement.

`/ghost hint` searches only the active snapshot for Ghosts that are unlocked, enabled, in the player's current valid hunt world, and not yet found by that player. It reports a broad distance band and relative direction such as nearby, behind, or more to the left. It never sends the Ghost id, block coordinates, or a teleport command, and a persisted cooldown prevents hint spam.

The visual modes are:

| Mode | Behavior |
| --- | --- |
| `full` | Private holograms, configured particles and sounds, close-encounter message, capture animation, and rate-limited brief Darkness. |
| `reduced` | Private holograms, one-third particle counts, quieter and less frequent sounds, and no close-encounter Darkness. |
| `off` | No private proximity/discovery holograms, particles, sounds, titles, or Darkness. Discovery and rewards still work normally. |

Darkness is short, non-stacking, and applied only when the player does not already have Darkness. It has its own cooldown and never removes or modifies another potion effect. The first close encounter with a particular Ghost is persisted so walking around one location cannot repeatedly startle the same player.

The Haunting Chain continues when several unique Ghosts are found inside the configured time window. Its bonus is added only to Ghost Points. It never inserts another found id, participation date, collection milestone, or perfect-completion condition.

On capture, a private temporary marker armor stand rises above the location in dyed leather chest, leg, and boot armor, with a Ghost head and a randomized supported armor trim. The effect poofs away after its short animation and is also cleaned up on quit, world change, reload, or plugin disable. A single humanoid cannot display a leather chestplate and an elytra at the same time because both occupy the chest equipment slot, so the stable effect uses the themed chestplate and no elytra.

## Default Event Configuration

The generated `events.yml` includes the 2026 weekend edition:

```yaml
events:
  halloween_2026:
    enabled: true
    theme: ghost
    reward-profile: halloween_weekend_2026
    display-name: Halloween 2026 Ghost Hunt
    edition: 2026
    timezone: Europe/Amsterdam
    start-date: '2026-10-30'
    end-date: '2026-11-02'
    claim-deadline: '2026-11-09'
    days: 4
    expected-coconuts: 80
    participation:
      minimum-new-finds-per-day: 20
    collection-milestones: []
    streak-milestones: []
    worlds:
      production: [halloween]
      reward-claim: [general, wild, cave, acid, skyblock, skygrid, oneblock]
    points:
      base-per-find: 1
      teamwork:
        enabled: true
        radius: 12.0
        bonus: 1
        cooldown-seconds: 120
        daily-cap: 10
    community:
      daily-goal: 100
    visit:
      commands:
        - cmi warp halloween {player}
```

`expected-coconuts` retains its legacy key name for file compatibility; for this event it means expected Ghosts. The event dates are inclusive. Friday, Saturday, Sunday, and Monday are four separate event dates, and the claim deadline is also inclusive. Confirm the dates, reward worlds, and warp during final launch review before creating the production snapshot.

The plugin-level and per-hunt defaults in `config.yml` are independent:

```yaml
enabled: true
active-event: halloween_2026
hunts:
  coconut:
    enabled: false
  ghost:
    enabled: true
```

Use `/ghost admin enabled true|false` to persistently turn only Ghost Hunt on or off. This is the intended Friday-on/Monday-off control. Turning Ghost Hunt off stops participation, discovery, hints/effects, the Halloween visit action, and its shop. Read-only UI/history and already-earned claims remain available only while the edition is `ACTIVE` or `CLAIMING` and has an immutable snapshot; upcoming editions and editions without a snapshot are blocked. `/coconut admin enabled true|false` controls only Coconut Hunt and does not disable the shared jar or Ghost Hunt. Event dates still gate normal participation, so enabling a hunt outside its configured dates does not silently create production progress.

Before launch, check CMI CustomAlias ownership for `ghost`. The test-server configuration historically used `/ghost` as an emote alias; back up that alias file and rename the emote to a non-conflicting command such as `/ghostemote`, then reload or restart and verify `/ghost` resolves to this hunt. Do not rely on command-registration order. `/ghosthunt` remains available as the compatibility alias during migration.

Production setup, collection, and proximity effects are allowed only in `worlds.production`. Enable `regions.haunted-grounds` to further restrict them to a configured cuboid. When all event regions are disabled, the whole configured `halloween` world is valid. Claims and shop delivery use the separate reward-world list.

## Theme And Visual Configuration

`themes.yml` owns Ghost terminology, icons, head textures, documentation link, messages, visuals, and chain behavior. Important paths include:

```yaml
themes:
  ghost:
    command: ghost
    singular: ghost
    plural: ghosts
    currency-name: Ghost Points
    head:
      texture-values:
        - <bundled-base64-texture-1>
        - <eight-more-bundled-base64-textures>
    hint:
      enabled: true
      cooldown-seconds: 900
      very-close-distance: 10.0
      nearby-distance: 35.0
      far-distance: 120.0
    capture-animation:
      enabled: true
      duration-ticks: 24
      rise-blocks: 3.5
      armor-trims-enabled: true
      dye-colors: ['#FF6B00', '#6A0DAD', '#39FF14', '#171717', '#8B0000', '#FF1493', '#00CED1', '#FFD700', '#F5F5F5']
    visuals:
      scan-interval-ticks: 20
      spotting-radius: 16.0
      close-encounter-radius: 4.0
      max-candidates-per-player: 12
      max-holograms-per-player: 5
      darkness:
        enabled: true
        duration-ticks: 40
        amplifier: 0
        cooldown-seconds: 120
    haunting-chain:
      enabled: true
      window-seconds: 90
      required-finds: 3
      bonus-points: 2
      maximum-bonuses-per-day: 5
```

The generated theme contains all nine supplied base64 Ghost textures; the abbreviated YAML above avoids duplicating those long values in this guide. Invalid values are skipped. Every placement randomly chooses a valid variant and persists its variant number, so reloads do not reshuffle existing heads. The capture outfit uses the configurable nine-color dye palette and supported trim variations independently of the placed head texture.

Particle names are checked against the Paper API. Sound values must be namespaced, such as `minecraft:entity.vex.death`. Counts, radii, cooldowns, volume, pitch, Darkness duration/amplifier, title timing, candidate limits, and hologram limits are clamped and preflighted during reload/event validation.

## Quick Admin Test: 16 Ghosts

The themed debug command selects the Halloween source event before enabling debug:

```text
/ghost admin enabled true
/ghost admin debug true
/ghost admin expected 16
/ghost admin status
/ghost admin ghost give 16 0
```

Place all 16 setup heads. Debug permits any loaded world when `debug.allow-any-world: true`. Each placement creates a `ghost_<uuid>` id and writes the complete marker to block PDC and `coconuts.yml` under `debug_halloween_2026`. It cannot enter the production `halloween_2026` registry. Sixteen divides evenly into four waves, which makes the debug distribution easy to inspect. Debug projection scales the participation minimum from 20 to four, so finding that date's complete four-Ghost wave can exercise its independent daily reward without weakening the production definition. Use 80 when rehearsing the exact production threshold.

While heads are still being placed or have not received waves, the active debug lifecycle reports the incomplete snapshot preflight once at `INFO`; this is normal setup progress. The same condition remains a warning for a production event, where an incomplete registry must block snapshot creation.

Assign and validate the waves:

```text
/ghost admin ghost waves auto 4 2026
/ghost admin ghost validate
/ghost admin event validate
/ghost admin event snapshot
```

With no debug date/day override, the debug edition is immediately active on day 1. The same admin account may right-click unlocked Ghosts and use every normal player GUI. An alt is needed only for independent-player, community-pair, and nearby-teamwork tests.

The 16-head pass covers placement, texture, hologram, animation, hint, cleanup, GUI, balanced waves, scaled daily rewards, and the perfect-reward rules. For a production-exact progression rehearsal, start with an empty `debug_halloween_2026` registry, use `/ghost admin expected 80` and `/ghost admin ghost give 80 0`, place all 80, assign four waves, validate, and snapshot. Catch 20 on day 1, force day 2 and catch that wave's 20, then repeat through day 4. Confirm each calendar day's kit and the final bonus become eligible exactly once. Also run a missed-day pass and prove a later qualified date still earns its own kit while perfect remains blocked. Debug command delivery remains suppressed by default; only enable `debug.execute-reward-commands` on the disposable test server when intentionally proving the five real CMI kits.

Advance the test clock:

```text
/ghost admin day 2
/ghost admin day 4
/ghost admin day off
/ghost admin date 2026-11-02
/ghost admin date off
```

Test all effect modes:

```text
/ghost effects full
/ghost effects reduced
/ghost effects off
/ghost hint
```

Preview and reset one player's debug progress:

```text
/ghost admin reset player mrfloris --dry-run
/ghost admin reset player mrfloris --confirm
```

Preview and reset the complete isolated debug event while keeping all placed heads and configuration:

```text
/ghost admin reset event --dry-run
/ghost admin reset event --confirm
```

The event-wide form refuses production ids. It removes only the effective debug event's player progress, snapshot, community totals, and lifecycle keys. A valid preserved registry can immediately receive a clean replacement debug snapshot.

Turn debug off when finished:

```text
/ghost admin debug false
/ghost admin enabled false
```

## Production Setup

1. Confirm the approved dates, expected Ghost count, `halloween` world name, optional region, reward worlds, and visit command in `events.yml`; create and test the currently missing CMI warp named `halloween`.
2. Approve the nine Ghost textures, hologram labels/colors, hint distances/cooldown, and animation palette in `themes.yml`.
3. Review every `profiles.halloween_weekend_2026` reward, command hook, and allowed command prefix in `rewards.yml`.
4. Create and test exactly five CMI kits: `ghosthunt_day_1_2026` through `ghosthunt_day_4_2026`, plus `ghosthunt_bonus_box_2026`. Every kit must be enabled, non-empty, item-only, and contain no internal kit commands.
5. Run `/ghost admin debug false` and `/ghost admin enabled true` when the Friday event should open.
6. Take a restorable backup of the imported `halloween` world before placing the final production set.
7. Give setup heads with `/ghost admin ghost give 80 0`.
8. Place each head in the configured world/region, or look at an existing normal player head and run `/ghost admin ghost register [unlock-day]`.
9. Leave heads at day `0` when they should be assigned automatically, then run `/ghost admin ghost waves auto 4 <seed>`.
10. Run `/ghost admin ghost validate` and require exactly 80 valid enabled entries distributed as 20 on each day.
11. Run `/ghost admin event validate` to preflight themes, visuals, worlds, rewards, hooks, allowlists, visit commands, and the complete registry.
12. Inspect the target with `/hunt admin event status halloween_2026`.
13. Preview activation with `/hunt admin event activate halloween_2026 --dry-run`.
14. Activate with `/hunt admin event activate halloween_2026 --confirm`. Use `--force-confirm` only when the currently selected event is inside its live dates and staff deliberately approve the switch.
15. On Monday after the final hunting window, run `/ghost admin enabled false`. Keep the shared jar enabled so Coconut history/configuration remain loaded. Participation, discovery, effects, visit, and shop actions stop immediately; read-only UI/history and already-earned claims remain available during the `ACTIVE` or `CLAIMING` phase only when the immutable snapshot exists.

Activation creates a missing immutable target snapshot or verifies the existing one before selection. It does not edit dates, delete or merge progress, invalidate old claims, dispatch an end hook for the previous event, or rewrite its snapshot. The selection and audit must both save successfully; an audit failure triggers a selection rollback.

## Commands

Player commands:

```text
/ghost
/ghost info
/ghost help
/ghost progress
/ghost milestones
/ghost streak
/ghost community
/ghost rewards
/ghost points
/ghost shop
/ghost claim <reward-id|all> [event-id]
/ghost history [event-id]
/ghost hint
/ghost effects <full|reduced|off>
```

`/ghost history` lists configured Ghost editions while the theme is enabled. If the theme is disabled, player access is limited to editions that are `ACTIVE` or `CLAIMING` and already have an immutable snapshot. `/ghost claim daily_1 halloween_2026` targets the first date's kit, while `/ghost claim all halloween_2026` claims every eligible reward from that edition in safe order. Both remain bound to its snapshot, phase, claim deadline, and reward-world rules. `/ghosthunt` is accepted as a compatibility alias, but staff messages, documentation, and aliases should use `/ghost`.

Themed staff commands:

```text
/ghost admin reload
/ghost admin status
/ghost admin enabled <true|false>
/ghost admin debug <true|false>
/ghost admin expected <count|production>
/ghost admin day <1-4|off>
/ghost admin date <yyyy-mm-dd|off>
/ghost admin event <validate|snapshot|start|end>
/ghost admin event force-mutation --confirm
/ghost admin event snapshot --force-confirm
/ghost admin ghost give [amount] [unlock-day]
/ghost admin ghost register [unlock-day]
/ghost admin ghost inspect
/ghost admin ghost <enable|disable|remove>
/ghost admin ghost list [page]
/ghost admin ghost validate
/ghost admin ghost waves auto [days] [seed]
/ghost admin inspect <player>
/ghost admin inspect <player> day <1-4> [page]
/ghost admin inspect <player> rewards [page]
/ghost admin rewards retry <online-player> <reward-id> [--force-confirm]
/ghost admin reset player <player> [event-id] <--dry-run|--confirm>
/ghost admin reset event <--dry-run|--confirm>
/ghost admin report [event-id]
/ghost admin shop regrant <online-player> <offer-id>
```

Canonical production selection:

```text
/hunt admin event list
/hunt admin reload
/hunt admin event status <event-id>
/hunt admin event activate <event-id> --dry-run
/hunt admin event activate <event-id> --confirm
/hunt admin event activate <event-id> --force-confirm
```

Setup mutations are event-bound. A Coconut command cannot enable, disable, or remove a Ghost, and a setup head referencing an unknown/mismatched theme or event is refused.

The text-only player inspection works from chat and console. Its day pages compare found ids against the immutable Ghost snapshot and provide copyable teleport commands plus revalidated in-game CMI mail actions for missing locations. Reward pages distinguish claimed, ready, earned-but-blocked, and not-earned rewards, print the exact reason, and show retained durable claim transaction evidence. For the five Halloween entitlements, finalization records a successful synchronous processed-item inventory mutation rather than console-command acceptance.

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `onembcmi.GhostHunt.use` | true | Open Ghost Hunt, history, help, and effect controls; discover Ghosts. |
| `onembcmi.GhostHunt.progress` | true | View personal, wave, streak, community, and point progress. |
| `onembcmi.GhostHunt.rewards` | true | View configured rewards and perfect completion. |
| `onembcmi.GhostHunt.claim` | true | Claim eligible current or historical rewards in allowed worlds. |
| `onembcmi.GhostHunt.hint` | true | Request cooldown-protected direction/distance guidance without coordinates. |
| `onembcmi.GhostHunt.shop` | true | Use configured Ghost Point offers. |
| `onembcmi.GhostHunt.admin` | false | Parent for all Ghost Hunt staff permissions. |
| `onembcmi.GhostHunt.admin.reload` | false | Reload shared hunt files, caches, visuals, and lifecycle tasks. |
| `onembcmi.GhostHunt.admin.debug` | false | Select and control isolated Halloween debug state. |
| `onembcmi.GhostHunt.admin.event` | false | Toggle only Ghost Hunt and validate its snapshots/event lifecycle actions. |
| `onembcmi.GhostHunt.admin.ghost` | false | Give/place/register/inspect/change/remove/validate Ghosts and assign waves. |
| `onembcmi.GhostHunt.admin.inspect` | false | Inspect daily finds, missing locations, reward reasons/transactions, and recorded shop delivery. |
| `onembcmi.GhostHunt.admin.rewards` | false | Retry an eligible unresolved direct Halloween kit delivery; finalized deliveries cannot be replayed. |
| `onembcmi.GhostHunt.admin.reset` | false | Run guarded player or debug-event resets. |
| `onembcmi.GhostHunt.admin.report` | false | Export event reports. |
| `onembcmi.Hunt.admin.reload` | false | Reload the Event Hunts host configuration, registries, and all modules. |
| `onembcmi.Hunt.admin.preflight` | false | Run the read-only aggregate or per-module readiness report. |
| `onembcmi.Hunt.admin.event` | false | List, preflight, and activate production editions with `/hunt`. |

Admin permissions default false, including for operators. The canonical activation command also accepts either themed `.admin.event` node. Console is trusted for non-player administration; GUI, targeted-block, discovery, claim, and purchase actions still require a player where applicable.

## PlaceholderAPI

```text
%onembcmi_GhostHunt.enabled%
%onembcmi_GhostHunt.event.id%
%onembcmi_GhostHunt.event.state%
%onembcmi_GhostHunt.event.day%
%onembcmi_GhostHunt.event.days_total%
%onembcmi_GhostHunt.event.time_remaining%
%onembcmi_GhostHunt.ghosts.registered%
%onembcmi_GhostHunt.ghosts.expected%
%onembcmi_GhostHunt.ghosts.available%
%onembcmi_GhostHunt.player.found%
%onembcmi_GhostHunt.player.total%
%onembcmi_GhostHunt.player.percent%
%onembcmi_GhostHunt.player.remaining%
%onembcmi_GhostHunt.player.today%
%onembcmi_GhostHunt.player.streak.current%
%onembcmi_GhostHunt.player.streak.best%
%onembcmi_GhostHunt.player.points%
%onembcmi_GhostHunt.player.claimable%
%onembcmi_GhostHunt.player.perfect_eligible%
%onembcmi_GhostHunt.player.effects%
%onembcmi_GhostHunt.player.haunting_chain%
%onembcmi_GhostHunt.player.haunting_chain_best%
%onembcmi_GhostHunt.community.total%
%onembcmi_GhostHunt.community.today%
%onembcmi_GhostHunt.community.target%
%onembcmi_GhostHunt.community.percent%
%onembcmi_GhostHunt.community.player_contribution%
%onembcmi_GhostHunt.runtime.hologram_provider%
```

The Ghost namespace is a runtime alias served by the same feature plugin. Reads use cached event-specific data and never claim, spend, discover, or dispatch a command.

Configured command replacements include:

```text
{player} {uuid} {event} {edition} {date} {day}
{ghost_id} {collectible_id} {coconut_id} {theme} {currency}
{found} {total} {points_earned} {points_balance}
{milestone} {streak} {community_total} {community_milestone} {mob_type}
```

The legacy `{coconut_id}` replacement remains populated with the same collectible id so existing shared hook templates remain compatible.

## Storage And Migration

```text
plugins/1MB-CMIAPI/CoconutHunt/config.yml
plugins/1MB-CMIAPI/CoconutHunt/themes.yml
plugins/1MB-CMIAPI/CoconutHunt/events.yml
plugins/1MB-CMIAPI/CoconutHunt/rewards.yml
plugins/1MB-CMIAPI/CoconutHunt/coconuts.yml
plugins/1MB-CMIAPI/CoconutHunt/state.yml
plugins/1MB-CMIAPI/CoconutHunt/reports/
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

`coconuts.yml` keeps its established name and CoconutHunt PDC owner for backward compatibility, but now stores every themed collectible by event. Existing `summer_2026` and `debug_summer_2026` ids, locations, profiles, snapshots, claims, and placeholders remain unchanged.

The registry is schema 3; state and player records are schema 2; events and themes are schema 3; rewards are schema 4. Before an older existing file is rewritten, a deterministic `*.pre-schema-<target>-from-<source>.bak` copy is required. Backups are idempotent and never overwritten. If a required backup cannot be created, that migration/write is refused rather than risking the live data.

Player preferences are stored by theme, while progress is stored by effective event id. Changing Ghost effects therefore persists across Halloween editions, but finds, points, claims, and chains do not cross editions.

## Reward Safety

The Halloween reward profile lives at `profiles.halloween_weekend_2026` in `rewards.yml`. Its four independent calendar-day reward commands are:

```text
cmi kit ghosthunt_day_1_2026 {player} -s
cmi kit ghosthunt_day_2_2026 {player} -s
cmi kit ghosthunt_day_3_2026 {player} -s
cmi kit ghosthunt_day_4_2026 {player} -s
```

The perfect all-80/four-day reward runs:

```text
cmi kit ghosthunt_bonus_box_2026 {player} -s
```

These are the exact five enabled production entitlements. Each reward must contain exactly its one matching `cmi kit <kit> {player} -s` command, and each referenced CMI kit must exist, be enabled, contain at least one deliverable item, and contain no internal CMI kit commands. The reward profile intentionally uses four calendar-day rewards and one perfect reward rather than collection or streak milestones. `daily_1` through `daily_4` are bound to event days 1 through 4 independently; perfect requires every Ghost plus participation on every event date.

At claim time, CMI processes the kit contents for that player, including supported equipment/offhand entries, and the hunt simulates whether every resulting item fits in the 36 storage slots. Insufficient empty-slot or stacking capacity, including a genuinely full inventory, blocks the claim before delivery. Delivery inserts cloned processed items synchronously; overflow or a runtime failure restores the cloned pre-delivery inventory. Only the completed inventory mutation is accepted as delivery evidence and finalized in the durable idempotent receipt. No console dispatch return value is used as proof for these five kits.

Staff can inspect the receipt through `/ghost admin inspect <player> rewards` and retry only an eligible unresolved delivery with `/ghost admin rewards retry <online-player> <reward-id> [--force-confirm]`. The dedicated `onembcmi.GhostHunt.admin.rewards` permission defaults false. A finalized delivery cannot be replayed; `--force-confirm` is reserved for a reviewed failed receipt whose replay safety cannot otherwise be proven. Debug reward delivery remains suppressed unless explicitly enabled. Coconut rewards retain the engine's legacy allowlisted console-command delivery path and its command-acceptance evidence model.

## Performance And Cleanup

The registry maintains a world/chunk spatial index. Each visual scan asks only for nearby chunks, filters the active event/snapshot, and then applies configured candidate and hologram caps. It does not iterate every registered Ghost for every player.

Paper TextDisplays are private, transient, non-persistent, and invisible by default until shown to one player. They are removed on movement between worlds, long teleports, chunk unload, quit, reload, event inactivity, and plugin disable. The capture armor stand is also private and transient; it is removed at animation completion and on every lifecycle cleanup path. No hunt display or armor stand is intentionally persisted. Bukkit world/entity operations and scheduled effects remain on the server thread.

## Build And Launch Checklist

The shared jar is:

```text
1MB-CMIAPI-EventHunts-v1.0.2-570-j25-26.2.jar
```

It targets Java 25 and Paper 26.2 stable build 111 or newer. CMI, CMILib, and `1MB-CMIAPI-Lib` are required. Deploy the CoconutHunt and shared-library jars from the same build; startup fails closed with one compatibility diagnostic if the shared library lacks the atomic playerdata API. PlaceholderAPI, LuckPerms, Vault, and MobHat are optional. The Halloween profile defines only its five launch rewards by default and does not require a Ghost shop offer.

- [ ] Confirm October 30 through November 2, 2026 and the inclusive November 9 claim deadline.
- [ ] Confirm the production world is named `halloween`, any cuboid is correct, and the CMI warp named `halloween` exists and lands safely there.
- [ ] Render and approve all nine bundled Ghost textures.
- [ ] Confirm the four daily 20-Ghost waves, hint policy, hologram states, animation palette, hooks, and reward commands.
- [ ] Create and test exactly `ghosthunt_day_1_2026` through `ghosthunt_day_4_2026` and `ghosthunt_bonus_box_2026`; require every kit to be enabled, non-empty, item-only, and free of internal kit commands.
- [ ] Test processed-item delivery with enough space and a full inventory; require action-time capacity preflight, synchronous insertion, rollback on forced failure, and a finalized inventory receipt rather than command acceptance.
- [ ] Test `/ghost admin rewards retry` with its dedicated default-false permission, an unresolved receipt, `--force-confirm`, and a finalized receipt that must refuse replay.
- [ ] Keep the Ghost shop empty unless a separately reviewed optional offer is deliberately added.
- [ ] Complete a 16-head balanced `debug_halloween_2026` run in `full`, `reduced`, and `off` modes.
- [ ] Verify hint directions/cooldown/no-coordinate output, capture cleanup, discovery, chain cap, all four waves, GUI history, claims, reset, reload, and restart persistence.
- [ ] Require zero Ghost registry and event validation issues at exactly 80 entries and 20 entries per day.
- [ ] Run `/hunt admin event status halloween_2026` and the activation dry-run.
- [ ] Record staff approval before any `--force-confirm` live switch.
- [ ] Take and verify a restorable `halloween` world backup before placing the final 80 production heads.
- [ ] Confirm the production snapshot and activation audit after selection.
- [ ] Confirm `/ghost admin enabled false` stops Ghost participation, discovery, effects, visit, and shop without disabling the shared jar or changing Coconut data; only snapshotted `ACTIVE`/`CLAIMING` read-only UI/history and already-earned claims remain, while upcoming/unsnapshotted access is blocked.
- [ ] Rename any legacy CMI `/ghost` emote alias (for example to `/ghostemote`) and verify `/ghost` resolves to the hunt after a clean restart.
