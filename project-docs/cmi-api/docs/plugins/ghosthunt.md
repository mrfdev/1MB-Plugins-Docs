# Halloween Ghost Hunt

GhostHunt is the Halloween presentation of the shared CoconutHunt event engine. Players use `/ghosthunt` to find private, collectible Ghost heads in the configured `halloween` world. The 2026 edition runs from Thursday, October 29 through Sunday, November 1, with six new Ghosts on each of four cumulative daily waves: 24 Ghosts total. Each edition keeps its own registry, immutable snapshot, progress, points, claims, lifecycle receipts, reports, and debug data.

The implementation deliberately remains inside the shared `1MB-CMIAPI-EventHunts` host. Its internal CoconutHunt files, PDC owner, playerdata, permissions, placeholders, and reward safety remain unchanged while the public plugin identity now matches the multi-event role. The jar provides `CoconutHunt`, `GhostHunt`, and the isolated `DoorHunt` compatibility identities; `/coconut` continues to serve Summer and `/doors` serves Trick-or-Treat Doors without data reconstruction. The canonical host defaults are `modules.coconut.enabled: false`, `modules.ghost.enabled: true`, and `modules.doors.enabled: false`. Ghost and Doors may run simultaneously in `halloween`. `/ghosthunt` is the public plugin command; `/ghost` remains registered for compatibility but may be owned by a separate CMI alias; see [Door Hunt](doors.md) for the separate door interaction and persistence model.

CMI owns `/ghost` as a separate emote alias and does not forward arguments. Keep that alias intact and use `/ghosthunt` for every plugin command below. `/ghosthunt admin ...` is the same plugin command with its arguments intact.

Implemented and proposed shared-host improvements are tracked in the [Event Hunts quality-of-life roadmap](event-hunts-roadmap.md); every remaining proposal still requires a separate greenlight.

`/hunt` opens the shared fixed 54-slot/six-row seasonal-event index. Ghost's card automatically moves between public live, authorized staff test, upcoming, claim, attention, ended, and dormant sections; clicking it opens the Ghost GUI. Its private current-player section follows the production edition shown on the card and reports today's finds, total finds, and claimable rewards without reading or mutating playerdata. Module tooltips are capped at 12 lines for smaller displays. Status-authorized staff see compact readiness totals and the module-status command; complete location, reward-provider, claim, and actionable diagnostics remain in status and preflight. Ordinary players see only friendly scheduling and event details. `/hunt ghost ...` routes only to `/ghosthunt ...`. `/hunt admin module ghost <on|off>` changes the Ghost module without disabling Doors, Coconut, or the host jar.

## Available Features

- a six-row `/ghosthunt` overview with progress, waves, streaks, rewards, history, help, and shared Hunt/server-menu returns
- configurable annual editions such as `halloween_2026`, each linked to the reusable `ghost` theme
- event-bound setup heads with a unique id, event id, theme, texture variant, world, coordinates, region, wave, and placement timestamp
- one private collection opportunity per Ghost per player; a discovery never removes the head for anyone else
- four cumulative six-Ghost waves, independent day-wave rewards, and perfect all-24 completion
- four independently claimable daily CMI kit rewards plus one perfect-weekend bonus box
- nine bundled Ghost head textures, randomized when a setup head is placed and then persisted for that location
- private themed holograms for available, caught, and later-day Ghosts, with particles only on currently available and uncaught locations
- `/ghosthunt hint` direction-and-distance guidance to the nearest eligible Ghost, without exposing an id or coordinates
- a private capture effect that raises a temporary outfitted Ghost, plays its sound and particles, then removes it
- `/ghosthunt effects <full|reduced|off>` plus a GUI toggle; every mode retains full participation and reward eligibility
- a configurable Haunting Chain bonus that awards points but does not count as a find or alter perfect-completion fairness
- configured-edition history and claims through each edition's snapshot, phase, claim-deadline, and reward-world rules; disabled-theme fallback is limited to immutable `ACTIVE`/`CLAIMING` editions
- guarded `/hunt admin event` selection with preflight, immutable snapshot verification, force protection for a live switch, and an audit record
- an isolated `debug_halloween_2026` namespace with any-world testing and live reward commands suppressed by default
- migration backups for older registry, state, event, reward, theme, and CoconutHunt playerdata schemas
- chunk-indexed proximity searches with hard candidate, hologram, particle, sound, and effect caps

## Player Experience

While the hunt is live, run `/ghosthunt`, then use `Visit the Halloween world` to travel to the event. Right-click an unlocked Ghost head with the main hand. Left-clicking is not a discovery action. Every Ghost stays in the world for other players and counts only once per player for that edition.

Nearby snapshot heads use private TextDisplay labels: orange `Ghost Hunt: Uncaught` for a currently available Ghost, green `Ghost Hunt: Caught` after that player finds it, and purple `Ghost Hunt: Unlocks Day <day>` before its wave. Soul spotting particles appear only for the orange, unlocked-and-uncaught state. Another player's capture never changes what the viewer sees.

The overview shows the current event phase and day, cumulative availability, personal found total, progress through the current six-head wave, the four-wave completion record, five earned rewards, discovered ids, event history, and effect preference. Every six-row page uses the shared footer: the viewer's skinned head in bottom-left slot 45 opens personal progress and shows the edition, finds, daily count, compact time until the next Europe/Amsterdam midnight reset, streak, Ghost Point balance, earned/spent points, and community contribution. After the hunt ends, the player head replaces daily/reset/streak instructions with a clear ended message, the inclusive claim deadline, saved finds and reward information. For 2026, earned rewards and the point shop remain available through **10 November**, closing at **00:00 on 11 November Europe/Amsterdam**. Halloween travel closes automatically and asks players to try again next year. Direct footer shortcuts open `/doors` and `/hv`; those events retain their November 7 collection deadline. Back, the Ghost Hunt overview, `All Event Hunts`, `Back to Server /menu`, and Close occupy the standard navigation slots. The help page posts a complete, explicitly clickable documentation URL in chat without putting the long URL in item lore.

Ghost reward cards use the shared Event Hunts status legend: gray `Locked`, yellow `In progress`, orange `Ready to claim`, green `Claimed`, and red `Delivery needs attention`. A recorded Halloween claim whose durable CMI delivery receipt is not finalized is visibly red instead of being presented as safely completed. This is a read-only translation of the existing eligibility, claim marker, and transaction journal; claim and delivery rules are unchanged.

Each daily wave contains exactly six Ghosts. Finding all six immutable snapshot heads assigned to wave 1 earns `daily_1`, even when they are found on day 2 or later. Finding day 1's six heads and day 2's six heads on day 2 earns both kits. A mix of incomplete waves does not substitute for completing one wave. Every unlocked wave stays available until hunting ends. Capturing all 24 snapshot Ghosts unlocks the fifth reward, the completion bonus box. Earned kits may be claimed in the configured reward worlds through November 10.

The next-midnight countdown remains passive GUI lore. The Ghost wave calendar shows complete, available, and future waves. The old daily-target reminder is suppressed for wave rewards because earlier waves and their kits do not expire at midnight; collection ends only at the configured event end. Calendar-day find totals and streaks remain statistics and do not gate Ghost kits.

`/ghosthunt hint` searches only the active snapshot for Ghosts that are unlocked, enabled, in the player's current valid hunt world, and not yet found by that player. It reports a broad distance band and relative direction such as nearby, behind, or more to the left. It never sends the Ghost id, block coordinates, or a teleport command, and a persisted cooldown prevents hint spam.

The visual modes are:

| Mode | Behavior |
| --- | --- |
| `full` | Private holograms, configured particles and sounds, close-encounter message, capture animation, and rate-limited brief Darkness. |
| `reduced` | Private holograms, one-third particle counts, quieter and less frequent sounds, and no close-encounter Darkness. |
| `off` | No private proximity/discovery holograms, particles, sounds, titles, or Darkness. Discovery and rewards still work normally. |

Darkness is short, non-stacking, and applied only when the player does not already have Darkness. It has its own cooldown and never removes or modifies another potion effect. The first close encounter with a particular Ghost is persisted so walking around one location cannot repeatedly startle the same player.

The Haunting Chain continues when several unique Ghosts are found inside the configured time window. Its bonus is added only to Ghost Points. It never inserts another found id, participation date, collection milestone, or perfect-completion condition.

On capture, a private temporary marker armor stand rises above the location in dyed leather chest, leg, and boot armor, with a Ghost head and a randomized supported armor trim. The effect poofs away after its short animation and is also cleaned up on quit, world change, reload, or plugin disable. A single humanoid cannot display a leather chestplate and an elytra at the same time because both occupy the chest equipment slot, so the stable effect uses the themed chestplate and no elytra.

## Player FAQ

### How do I catch a Ghost or get a hint?

During the event, right-click an unlocked Ghost with your main hand. It counts once for you and remains available for others. `/ghosthunt hint` gives direction and distance guidance toward an eligible uncaught Ghost, with a cooldown.

### Can I catch up on a missed day and still earn every daily kit?

Yes. Complete the six heads assigned to each unlocked wave before the hunt ends. Completing both day 1 and day 2 on day 2 earns both kits. Completing all four waves on the final hunt day earns all four kits and the all-24 bonus.

### What is required for the perfect-weekend reward?

The 2026 bonus requires all 24 Ghosts, regardless of the dates on which they were found. Catching up all 24 on the final date qualifies for the bonus. Each wave’s six heads also earns that wave’s kit, including when completed later.

### How do I collect earned kits?

Open `/ghosthunt rewards` and claim in a configured reward world before the edition’s claim deadline. Read any AutoSell or delivery message; a reward needing staff attention is not another collection goal. The bundled 2026 weekend profile awards four wave kits and one completion bonus. Earned kits remain claimable through November 10 inclusive.

### Where can I spend Ghost Points?

Open `/ghosthunt shop` for two item bundles costing 20 points each and one choice of Bat, Fox, or Cat MobHat costing 24 points. Each bundle can be purchased once per edition, and only one of the three hats can be selected. The shop closes with earned-kit claims after November 10. See the [November 2026 shop details](#november-2026-ghost-point-shop) for contents and delivery rules. An edition with no configured offers directs players to **Earned Rewards** instead.

### Can I reduce the effects without losing progress?

Yes. `/ghosthunt effects reduced` lowers effects and removes close-encounter Darkness. `/ghosthunt effects off` hides the private effects entirely. Both modes retain discovery and reward eligibility.

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
    start-date: '2026-10-29'
    end-date: '2026-11-01'
    claim-deadline: '2026-11-10'
    days: 4
    expected-coconuts: 24
    participation:
      minimum-new-finds-per-day: 6
    collection-milestones: []
    streak-milestones: []
    worlds:
      production: [halloween]
      reward-claim: [general, wild, cave, acid, skyblock, skygrid, oneblock, chunkblock]
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

`expected-coconuts` retains its legacy key name for file compatibility; for this event it means expected Ghosts. The event dates are inclusive. Thursday, Friday, Saturday, and Sunday are four separate event dates. Collection closes at November 2 00:00 Europe/Amsterdam. Earned rewards and point-shop purchases remain available through November 10, closing at November 11 00:00 Europe/Amsterdam. The claim deadline does not extend hunting or world access. Confirm the dates, reward worlds, and warp during final launch review before creating the production snapshot.

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

Use `/hunt admin module ghost on|off` or `/ghosthunt admin enabled true|false` to persistently turn only Ghost Hunt on or off. The command delegates to the same canonical module control as `/hunt admin module ghost on|off`. Turning Ghost Hunt off stops participation, discovery, hints/effects, the Halloween visit action, and its shop. Read-only UI/history and already-earned claims remain available only while the edition is `ACTIVE` or `CLAIMING` and has an immutable snapshot; upcoming editions and editions without a snapshot are blocked. `/coconut admin enabled true|false` controls only Coconut Hunt and does not disable the shared jar or Ghost Hunt. Event dates still gate normal participation, so enabling a hunt outside its configured dates does not silently create production progress.

Use `/ghosthunt` for plugin commands, GUI links, and help. Keep the CMI `/ghost` emote alias and `/halloween` travel alias unchanged. The theme migration updates the prior public command and supplied reward links to `/ghosthunt`, so their behavior does not depend on command-registration order.

Production setup, collection, and proximity effects are allowed only in `worlds.production`. Enable `regions.haunted-grounds` to further restrict them to a configured cuboid. When all event regions are disabled, the whole configured `halloween` world is valid. Claims and shop delivery use the separate reward-world list.

## Theme And Visual Configuration

`themes.yml` owns Ghost terminology, icons, head textures, documentation link, messages, visuals, and chain behavior. Important paths include:

```yaml
themes:
  ghost:
    command: ghosthunt
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
/ghosthunt admin enabled true
/ghosthunt admin debug true
/ghosthunt admin expected 16
/ghosthunt admin status
/ghosthunt admin ghost give 16 0
```

Place all 16 setup heads. Debug permits any loaded world when `debug.allow-any-world: true`. Each placement creates a `ghost_<uuid>` id and writes the complete marker to block PDC and `coconuts.yml` under `debug_halloween_2026`. It cannot enter the production `halloween_2026` registry. Sixteen divides evenly into four waves, which makes the debug distribution easy to inspect. Debug projection scales the participation minimum from six to four, so finding the complete four-Ghost wave can exercise its independent daily reward without weakening the production definition. Use 24 when rehearsing the exact production threshold.

While heads are still being placed or have not received waves, the active debug lifecycle reports the incomplete snapshot preflight once at `INFO`; this is normal setup progress. The same condition remains a warning for a production event, where an incomplete registry must block snapshot creation.

Assign and validate the waves:

```text
/ghosthunt admin ghost waves auto 4 2026
/ghosthunt admin ghost validate
/ghosthunt admin event validate
/ghosthunt admin event snapshot
```

With no debug date/day override, the debug edition is immediately active on day 1. The same admin account may right-click unlocked Ghosts and use every normal player GUI. An alt is needed only for independent-player, community-pair, and nearby-teamwork tests.

The 16-head pass covers placement, texture, hologram, animation, hint, cleanup, GUI, balanced waves, scaled daily rewards, and the perfect-reward rules. For a production-exact progression rehearsal, start with an empty `debug_halloween_2026` registry, use `/ghosthunt admin expected 24` and `/ghosthunt admin ghost give 24 0`, place all 24, assign four waves, validate, and snapshot. Catch six on day 1, force day 2 and catch that wave's six, then repeat through day 4. Confirm each wave's kit and the final bonus become eligible exactly once. Also skip day 1, then catch both day 1 and day 2 waves on day 2 and require both kits. A final-day all-24 pass must earn all four kits and the bonus. Debug command delivery remains suppressed by default. Typed paid offers refuse delivery without charging points while suppression is active. Only enable `debug.execute-reward-commands` on the disposable test server when intentionally proving real CMI kits or the paid item and MobHat offers.

Advance the test clock:

```text
/ghosthunt admin day 2
/ghosthunt admin day 4
/ghosthunt admin day off
/ghosthunt admin date 2026-11-01
/ghosthunt admin date off
```

Test all effect modes:

```text
/ghosthunt effects full
/ghosthunt effects reduced
/ghosthunt effects off
/ghosthunt hint
```

Preview and reset one player's debug progress:

```text
/ghosthunt admin reset player mrfloris --dry-run
/ghosthunt admin reset player mrfloris --confirm
```

Preview and reset the complete isolated debug event while keeping all placed heads and configuration:

```text
/ghosthunt admin reset event --dry-run
/ghosthunt admin reset event --confirm
```

The event-wide form refuses production ids. It removes only the effective debug event's player progress, snapshot, community totals, and lifecycle keys. A valid preserved registry can immediately receive a clean replacement debug snapshot.

Turn debug off when finished:

```text
/ghosthunt admin debug false
/ghosthunt admin enabled false
```

## Production Setup

1. Confirm the approved dates, expected Ghost count, `halloween` world name, optional region, reward worlds, and visit command in `events.yml`; verify that the CMI warp named `halloween` exists and lands safely in that world.
2. Approve the nine Ghost textures, hologram labels/colors, hint distances/cooldown, and animation palette in `themes.yml`.
3. Review every `profiles.halloween_weekend_2026` reward, command hook, and allowed command prefix in `rewards.yml`.
4. Create and test exactly five CMI kits: `ghosthunt_day_1_2026` through `ghosthunt_day_4_2026`, plus `ghosthunt_bonus_box_2026`. Keep every template kit disabled (`Enabled: false`), non-empty, item-only, with `DropOnGround: true`, and no internal kit commands.
5. Keep `/ghosthunt admin debug false` for production setup. Staff can issue and place heads while the Ghost module is dormant; debug heads belong to a separate registry. Enable only Ghost with `/hunt admin module ghost on` after preflight is ready.
6. Take a restorable backup of the imported `halloween` world before placing the final production set.
7. Give setup heads with `/ghosthunt admin ghost give 24 0`.
8. Place each head in the configured world/region, or look at an existing normal player head and run `/ghosthunt admin ghost register [unlock-day]`.
9. Leave heads at day `0` when they should be assigned automatically, then run `/ghosthunt admin ghost waves auto 4 <seed>`.
10. Run `/ghosthunt admin ghost validate` and require exactly 24 valid enabled entries distributed as six on each day.
11. Run `/ghosthunt admin event validate` to preflight themes, visuals, worlds, rewards, hooks, allowlists, visit commands, and the complete registry.
12. Inspect the target with `/hunt admin event status halloween_2026`.
13. Preview activation with `/hunt admin event activate halloween_2026 --dry-run`.
14. Activate with `/hunt admin event activate halloween_2026 --confirm`. Use `--force-confirm` only when the currently selected event is inside its live dates and staff deliberately approve the switch.
15. Keep the Ghost module enabled through November 10, 2026 so players can spend their Ghost Points. The calendar automatically ends hunting and travel after November 1. Both earned kits and point-shop rewards remain available through November 10 inclusive (Europe/Amsterdam); Doors and Halloween Virus keep November 7. After this collection period, `/hunt admin module ghost off` can make the module dormant without disabling the shared host.

The production total and daily target are set in `events.yml`; `/ghosthunt admin expected <count>` changes only the isolated debug expectation. Issue `/ghosthunt admin ghost give 24 0`, place the heads on the desired supports (including end rods), then assign four waves. For deliberate day-by-day placement, use `/ghosthunt admin ghost give 6 1` through `give 6 4` and omit automatic wave assignment. Finish every location before creating the immutable snapshot.

Activation creates a missing immutable target snapshot or verifies the existing one before selection. It does not edit dates, delete or merge progress, invalidate old claims, dispatch an end hook for the previous event, or rewrite its snapshot. The selection and audit must both save successfully; an audit failure triggers a selection rollback.

## Commands

Player commands:

```text
/ghosthunt
/ghosthunt info
/ghosthunt help
/ghosthunt progress
/ghosthunt milestones
/ghosthunt streak
/ghosthunt community
/ghosthunt rewards
/ghosthunt points
/ghosthunt shop
/ghosthunt claim <reward-id|all> [event-id]
/ghosthunt history [event-id]
/ghosthunt hint
/ghosthunt effects <full|reduced|off>
```

`/ghosthunt history` lists configured Ghost editions while the theme is enabled. If the theme is disabled, player access is limited to editions that are `ACTIVE` or `CLAIMING` and already have an immutable snapshot. `/ghosthunt claim daily_1 halloween_2026` targets the first wave's kit, while `/ghosthunt claim all halloween_2026` claims every eligible reward from that edition in safe order. Both remain bound to its snapshot, phase, claim deadline, and reward-world rules. `/ghosthunt` is the public plugin command. The separate CMI `/ghost` emote alias remains untouched and does not forward plugin arguments.

Themed staff commands:

```text
/ghosthunt admin reload
/ghosthunt admin status
/ghosthunt admin enabled <true|false>
/ghosthunt admin debug <true|false>
/ghosthunt admin expected <count|production>
/ghosthunt admin day <1-4|off>
/ghosthunt admin date <yyyy-mm-dd|off>
/ghosthunt admin event <validate|snapshot|start|end>
/ghosthunt admin event force-mutation --confirm
/ghosthunt admin event snapshot --force-confirm
/ghosthunt admin ghost give [amount] [unlock-day]
/ghosthunt admin ghost register [unlock-day]
/ghosthunt admin ghost inspect
/ghosthunt admin ghost <enable|disable|remove>
/ghosthunt admin ghost list [page]
/ghosthunt admin ghost validate
/ghosthunt admin ghost waves auto [days] [seed]
/ghosthunt admin inspect <player>
/ghosthunt admin inspect <player> day <1-4> [page]
/ghosthunt admin inspect <player> rewards [page]
/ghosthunt admin rewards retry <online-player> <reward-id> [--force-confirm]
/ghosthunt admin reset player <player> [event-id] <--dry-run|--confirm>
/ghosthunt admin reset event <--dry-run|--confirm>
/ghosthunt admin report [event-id]
/ghosthunt admin shop regrant <online-player> <legacy-offer-id>
/ghosthunt admin points add <online-player-or-uuid> <1-1000000>
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

`/ghosthunt admin reload` reloads the shared Event Hunts host, including enabled Doors runtime. It preserves Doors configuration and progression, but clears a dormant prepared Doors administration session; run `/doors admin prepare` again if needed. Avoid concurrent Doors editing during a host reload. Module-only switches do not reload sibling modules.

Setup mutations are event-bound. A Coconut command cannot enable, disable, or remove a Ghost, and a setup head referencing an unknown/mismatched theme or event is refused.

The text-only player inspection works from chat and console. Its day pages compare found ids against the immutable Ghost snapshot and provide copyable teleport commands plus revalidated in-game CMI mail actions for missing locations. Reward pages distinguish claimed, ready, earned-but-blocked, and not-earned rewards, print the exact reason, and show retained durable claim transaction evidence. For the five Halloween entitlements, finalization requires CMI acquisition and inventory/drop delivery evidence, not merely console-command acceptance.

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
| `onembcmi.GhostHunt.admin.reload` | false | Reload the shared host files, caches, visuals, lifecycle tasks, and enabled modules. |
| `onembcmi.GhostHunt.admin.debug` | false | Select and control isolated Halloween debug state. |
| `onembcmi.GhostHunt.admin.event` | false | Toggle only Ghost Hunt and validate its snapshots/event lifecycle actions. |
| `onembcmi.GhostHunt.admin.ghost` | false | Give/place/register/inspect/change/remove/validate Ghosts and assign waves. |
| `onembcmi.GhostHunt.admin.points` | op | Add points to an online player’s current Ghost edition without changing finds, claims or purchases. |
| `onembcmi.GhostHunt.admin.inspect` | false | Inspect daily finds, missing locations, reward reasons/transactions, and recorded shop delivery. |
| `onembcmi.GhostHunt.admin.rewards` | false | Retry an eligible unresolved Halloween CMI kit delivery; finalized deliveries cannot be replayed. |
| `onembcmi.GhostHunt.admin.reset` | false | Run guarded player or debug-event resets. |
| `onembcmi.GhostHunt.admin.report` | false | Export event reports. |
| `onembcmi.Hunt.admin.reload` | false | Reload the Event Hunts host configuration, registries, and all modules. |
| `onembcmi.Hunt.admin.preflight` | false | Run the read-only aggregate or per-module readiness report. |
| `onembcmi.Hunt.admin.event` | false | List, preflight, and activate production editions with `/hunt`. |

Admin permissions default false, including for operators, except `.admin.points`, which defaults to operators. The canonical activation command also accepts either themed `.admin.event` node. Console is trusted for non-player administration; GUI, targeted-block, discovery, claim, and purchase actions still require a player where applicable.

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

The registry is schema 3; state and player records are schema 2; events are schema 6, themes are schema 4, and rewards are schema 7. Before an older existing file is rewritten, a deterministic `*.pre-schema-<target>-from-<source>.bak` copy is required. Backups are idempotent and never overwritten. If a required backup cannot be created, that migration/write is refused rather than risking the live data.

The original launch migration recognizes only the reviewed unsnapshotted Halloween defaults: the October 30–November 2 schedule, 80/20 counts, and November 9 deadline (or already approved replacements). It sets that edition to October 29–November 1, 24/6, and the original November 7 deadline after the required backup; the later point-shop migration extends that exact deadline to November 10 as described below. The launch migration preserves existing production snapshots and customized event contracts for manual review. No registry, snapshot, player progress, claim receipt, or Doors file is deleted or rebuilt. The follow-up migration appends `chunkblock` to this Ghost edition’s claim-world list, preserving its existing worlds and every registry assignment. This also runs for already-migrated build 819 configurations. Matching old 20-find and six-calendar-find descriptions are replaced with six-per-wave catch-up wording; custom wording and reward commands are retained. The backed-up themes schema 4 migration changes the prior `ghost` public command to `ghosthunt` and updates the supplied reward-message links. Custom command names remain unchanged; the CMI `/ghost` and `/halloween` aliases are not edited.

Player preferences are stored by theme, while progress is stored by effective event id. Changing Ghost effects therefore persists across Halloween editions, but finds, points, claims, and chains do not cross editions.

The EventHunts host snapshots cached player profiles on its normal 600-tick flush interval and writes only changed profiles on one bounded background worker. Quit saves use that worker too; pending profiles remain cached until saved so immediate reconnects retain their latest progress. Snapshots are detached from live player state, repeated pending saves for one UUID are coalesced, and shared-file updates preserve other plugins' sections. Hint/close-encounter writes share the worker; reset generations and merge rules prevent stale queued work from restoring reset progress or overwriting newer encounter metadata.

Login profile reads use the same worker and wait there for other plugins' shared-file writes. Until the read succeeds, Ghost menus, discoveries and rewards show a loading response, and proximity effects wait silently. Old login callbacks cannot publish after quit, reconnect or disable. Failed reads or a full queue retry at most three times, one second apart; a persistent failure keeps progress unavailable and asks the player to reconnect or contact staff instead of creating empty progress. Existing finds, points and reward records require no migration or reset.

Failed writes and queue saturation retain unsaved profiles for a later flush and log the failure. Clean disable drains work and retries retained data, reporting any timeout or unsaved profiles. Existing discovery, claim, purchase and reset commits still require durable acknowledgement. This needs no schema change or migration; the file paths and backup guarantees above remain in effect.

## Reward Safety

The Halloween reward profile lives at `profiles.halloween_weekend_2026` in `rewards.yml`. Its four independent day-wave reward commands are:

```text
cmi kit ghosthunt_day_1_2026 {player} -s
cmi kit ghosthunt_day_2_2026 {player} -s
cmi kit ghosthunt_day_3_2026 {player} -s
cmi kit ghosthunt_day_4_2026 {player} -s
```

The perfect all-24 collection reward runs:

```text
cmi kit ghosthunt_bonus_box_2026 {player} -s
```

These are the exact five enabled production entitlements. Each reward must contain exactly its one matching `cmi kit <kit> {player} -s` command, and each referenced CMI kit must exist, contain at least one deliverable item, allow `DropOnGround`, and contain no internal CMI kit commands. These staff-delivered templates may remain disabled so players cannot obtain them through `/kits`. The reward profile uses four wave rewards and one completion bonus. `daily_1` through `daily_4` are bound to immutable snapshot unlock days 1 through 4 independently. They require all six heads of their own wave, regardless of the collection date; perfect requires all 24 Ghosts. Calendar participation markers cannot substitute for wave completion.

These rewards become claim buttons in `/ghosthunt rewards`; they do not grant LuckPerms permissions or unlock `/kits`. Claims deliver their items through CMI in an allowed reward world, including `oneblock`, `wild`, and `chunkblock` when configured, with AutoSell disabled. CMI handles inventory capacity and drops overflow at the player. They remain available until the inclusive November 10 deadline even after collection and Halloween world access close.

Rendered recipients are checked against the online player’s authoritative server UUID and exact name, including Floodgate prefixes. Retried receipts remain bound to their original UUID, and the command uses that same account’s current exact server name, so a renamed account can recover its own reward while another account cannot claim it. No external identity lookup or name-based LuckPerms operation is involved.

At claim time, the hunt dispatches the configured CMI kit command as console for the UUID-bound current player. CMI performs the normal item processing and delivery; the hunt does not directly insert the kit or refuse the claim because the inventory is full. Kits must allow `DropOnGround: true` so CMI can drop overflow at the player. The claim waits for acquisition and inventory/drop evidence, allowing up to two ticks for deferred overflow, before finalizing its durable receipt. A command accepted without verified delivery remains unresolved for staff review and cannot be treated as a successful payout. Claim-all processes rewards in order and waits for each delivery before starting the next.

Staff can inspect the receipt through `/ghosthunt admin inspect <player> rewards` and retry only an eligible unresolved delivery with `/ghosthunt admin rewards retry <online-player> <reward-id> [--force-confirm]`. The dedicated `onembcmi.GhostHunt.admin.rewards` permission defaults false. A finalized delivery cannot be replayed; Only a proven no-effect failure may be retried. An uncertain or partially delivered attempt is closed without replay, even with `--force-confirm`; a verified delivered receipt only needs finalization. Debug reward delivery remains suppressed unless explicitly enabled. Coconut rewards retain the engine's legacy allowlisted console-command delivery path and its command-acceptance evidence model.

## Performance And Cleanup

The registry maintains a world/chunk spatial index. Each visual scan asks only for nearby chunks, filters the active event/snapshot, and then applies configured candidate and hologram caps. It does not iterate every registered Ghost for every player.

Paper TextDisplays are private, transient, non-persistent, and invisible by default until shown to one player. They are removed on movement between worlds, long teleports, chunk unload, quit, reload, event inactivity, and plugin disable. The capture armor stand is also private and transient; it is removed at animation completion and on every lifecycle cleanup path. No hunt display or armor stand is intentionally persisted. Bukkit world/entity operations and scheduled effects remain on the server thread.

## Build And Launch Checklist

The shared jar is:

```text
1MB-Lib-EventHunts-v1.0.4-835-j25-26.3.jar
```

The current 1.0.4 suite targets Paper 26.3 STABLE, with build 175 as the baseline. It uses Java 25 bytecode and is tested on Java 27. Build 699 remains the separate Paper 26.2 rollback. CMI, CMILib, and `1MB-CMIAPI-Lib` are required. Deploy the complete matching suite; startup fails closed with one compatibility diagnostic if the shared library lacks the atomic playerdata API. PlaceholderAPI, LuckPerms, Vault, and MobHat are optional. The Halloween profile includes its five earned launch rewards and the separately priced point-shop rewards described below. CMI is required for the item bundles; LuckPerms and MobHat are required only for the cosmetic choices.

- [ ] Confirm October 29 through November 1, 2026 and the extended inclusive November 10 Ghost claim/shop deadline; Doors and HV remain November 7.
- [ ] Confirm the production world is named `halloween`, any cuboid is correct, and the CMI warp named `halloween` exists and lands safely there.
- [ ] Render and approve all nine bundled Ghost textures.
- [ ] Confirm the four daily six-Ghost waves, hint policy, hologram states, animation palette, hooks, and reward commands.
- [x] Create the initial `ghosthunt_day_1_2026` through `ghosthunt_day_4_2026` and `ghosthunt_bonus_box_2026` kits. Verified on live in `plugins/CMI/Kits/ghosthunt.yml` on 8 October 2026 and copied byte-for-byte to the maintained Paper 26.3 test server. At that initial inspection, each contained one spruce log and had `Enabled: false`. The final local replacement now contains 44 authored stacks across the five disabled kits, verified on 28 October; see [the kit manifest](../../config/cmi/kits/ghosthunt.README.md). Live deployment remains separate.
- [ ] Before the event opens on **29 October 2026 (Europe/Amsterdam)**, review and deploy the authored final kit file from the maintained test server to live. Its 44 stacks were verified locally on 28 October; no live kit file has been changed. Track: [Ghost Hunt kit contents, #78](https://github.com/mrfdev/1MB-Library/issues/78).
- [ ] Test all five kits; require every template kit to remain disabled, be non-empty and item-only, permit `DropOnGround`, and contain no internal kit commands.
- [ ] Test CMI command delivery with space, partial space, and a full inventory; verify inventory insertion or dropped overflow, deferred delivery completion, failure recovery, and a finalized receipt supported by delivery evidence.
- [ ] Test `/ghosthunt admin rewards retry` with its dedicated default-false permission, an unresolved receipt, `--force-confirm`, and a finalized receipt that must refuse replay.
- [ ] Install and verify `ghosthuntpointskits.yml`; test both 20-point bundles and the one-of-three 24-point MobHat choice, duplicate prevention and pending-receipt recovery.
- [ ] Complete a 16-head balanced `debug_halloween_2026` run in `full`, `reduced`, and `off` modes.
- [ ] Verify hint directions/cooldown/no-coordinate output, capture cleanup, discovery, chain cap, all four waves, GUI history, claims, reset, reload, and restart persistence.
- [ ] Require zero Ghost registry and event validation issues at exactly 24 entries and six entries per day.
- [ ] Run `/hunt admin event status halloween_2026` and the activation dry-run.
- [ ] Record staff approval before any `--force-confirm` live switch.
- [ ] Take and verify a restorable `halloween` world backup before placing the final 24 production heads.
- [ ] Confirm the production snapshot and activation audit after selection.
- [ ] Confirm `/ghosthunt admin enabled false` stops Ghost participation, discovery, effects, visit, and shop without disabling the shared jar or changing Coconut data; only snapshotted `ACTIVE`/`CLAIMING` read-only UI/history and already-earned claims remain, while upcoming/unsnapshotted access is blocked.
- [ ] Verify `/ghosthunt` and every Ghost GUI/help link reach the plugin while the CMI `/ghost` emote and `/halloween` travel aliases remain unchanged.


## November 2026 Ghost Point shop

The approved shop offers two item bundles and one choice of MobHat. Purchases close at **November 11, 2026 00:00 Europe/Amsterdam**, making November 10 the last complete day. This extends Ghost Hunt’s earned-kit claims too; it does not change Doors or Halloween Virus.

| Offer | Ghost Points | Contents / limit |
| --- | ---: | --- |
| Ghost Hunter’s Farewell | 20 | Last Light of Halloween soul lantern, The Last Haunting disc 13, Ghostwatch 2026 signed book, 16 pumpkin pies. Once per edition. |
| After-Hunt Supplies | 20 | 8 diamonds, 16 golden carrots, 64 dark oak logs, 64 deepslate bricks, 32 torches. Once per edition. |
| Bat, Fox, or Cat MobHat | 24 | Unlock exactly one selected type. The three offers share one choice limit per edition. Existing owned types are marked in the menu. |

The item templates are in [ghosthuntpointskits.yml](../../config/cmi/kits/ghosthuntpointskits.yml). Install this additional file in `plugins/CMI/Kits/`, keeping both templates disabled, item-only, without internal commands, and with overflow drops enabled. No `/kits` entitlement is granted. The confirmation screen previews the actual CMI items and refuses a stale price or changed kit.

A selected cosmetic saves four permanent LuckPerms permissions to the actual server UUID: `onembcmi.mobhat.use`, `onembcmi.mobhat.wear`, `onembcmi.mobhat.remove`, and exactly one of `onembcmi.mobhat.mob.bat`, `.mob.fox`, or `.mob.cat`. It saves through the LuckPerms API and verifies the result before finalizing the receipt. Existing ownership is checked from actual permission nodes, so OP defaults alone do not count as a purchased unlock. Add BAT, FOX and CAT to both `mobs.allowed` and `position.allowed-mobs.head` in MobHat’s existing configuration; fresh defaults include them, but customized server lists are preserved. Recommended scale overrides are BAT=0.70, FOX=0.70 and CAT=0.70.

The backed-up Halloween schema migration extends an exact November 7 Ghost deadline to November 10 even for an existing immutable snapshot. It fills an empty Halloween shop with these five offers. Customized dates and nonempty/customized shops are preserved for explicit review; no finds, snapshot, points or claims are reconstructed.

Paid receipts bind the server UUID, event edition, selected offer, price and exact kit preview. Point deduction, one-time limit, shared MobHat choice and transaction marker are stored together before delivery. Reopening a safely recoverable paid offer resumes the original reward without another charge. An ambiguous item delivery requires staff review instead of automatic replay; a permission grant can retry its identical UUID/type idempotently. Legacy `admin shop regrant` refuses these paid offers. AutoSell must be off, and normal reward-world restrictions apply.

For local acceptance, while `mrfloris` is online, use `/ghosthunt admin points add mrfloris 500`. Console may omit the leading slash; an in-game administrator needs `onembcmi.GhostHunt.admin.points` (default: operator). This adds points to the current Ghost edition, it does not set the balance or reset finds, claims or the one-time purchases/choice. The command accepts only exact locally resolved online names or their server UUIDs, including Floodgate-prefixed names; it performs no external identity lookup. Amounts must be whole numbers from 1 through 1,000,000, and a successful response follows the saved profile update.
