# Halloween Ghost Hunt

GhostHunt is the Halloween presentation of the shared CoconutHunt event engine. Players use `/ghosthunt` to find private, collectible Ghost heads in the configured `halloween` world as seven cumulative waves unlock. Each edition keeps its own registry, immutable snapshot, progress, points, community totals, claims, purchases, lifecycle receipts, reports, and debug data.

The implementation deliberately remains inside `1MB-CMIAPI-CoconutHunt`. That preserves the mature CoconutHunt files, PDC owner, playerdata, reward safety, and plugin identity while sharing one tested engine instead of maintaining two event plugins that could drift. The jar provides both `CoconutHunt` and `GhostHunt`; `/coconut` continues to serve Summer without data reconstruction.

## Available Features

- a six-row `/ghosthunt` overview with progress, waves, streaks, community, rewards, points, shop, history, help, and a server-menu return
- configurable annual editions such as `halloween_2026`, each linked to the reusable `ghost` theme
- event-bound setup heads with a unique id, event id, theme, texture variant, world, coordinates, region, wave, and placement timestamp
- one private collection opportunity per Ghost per player; a discovery never removes the head for anyone else
- seven cumulative waves, personal collection milestones, daily participation streaks, community goals, and perfect completion
- configurable Ghost Point values, teamwork bonuses, reward commands, hooks, shop offers, and perfect kit per reward profile
- private positional Soul particles, faint transient holograms, proximity sounds, close encounters, and capture/clearing effects
- `/ghosthunt effects <full|reduced|off>` plus a GUI toggle; every mode retains full participation and reward eligibility
- a configurable Haunting Chain bonus that awards points but does not count as a find or alter perfect-completion fairness
- old-edition history and reward claims through each edition's own inclusive claim deadline
- guarded `/hunt admin event` selection with preflight, immutable snapshot verification, force protection for a live switch, and an audit record
- an isolated `debug_halloween_2026` namespace with any-world testing and live reward commands suppressed by default
- migration backups for older registry, state, event, reward, theme, and CoconutHunt playerdata schemas
- chunk-indexed proximity searches with hard candidate, hologram, particle, sound, and effect caps

## Player Experience

Run `/ghosthunt`, then use `Visit the Halloween world` to travel to the event. Right-click an unlocked Ghost head with the main hand. Left-clicking is not a discovery action. Every Ghost stays in the world for other players and counts only once per player for that edition.

The overview shows the current event phase and day, cumulative availability, personal found total, today's participation, streaks, Ghost Points, community contribution, rewards, shop, discovered ids, event history, and effect preference. The footer always includes the player's head, Back, the Ghost Hunt overview, `Back to Server /menu`, and Close. The help page posts a complete, explicitly clickable documentation URL in chat without putting the long URL in item lore.

The visual modes are:

| Mode | Behavior |
| --- | --- |
| `full` | Private holograms, configured particles and sounds, close-encounter message, and rate-limited brief Darkness. |
| `reduced` | Private holograms, one-third particle counts, quieter and less frequent sounds, and no close-encounter Darkness. |
| `off` | No private proximity/discovery holograms, particles, sounds, titles, or Darkness. Discovery and rewards still work normally. |

Darkness is short, non-stacking, and applied only when the player does not already have Darkness. It has its own cooldown and never removes or modifies another potion effect. The first close encounter with a particular Ghost is persisted so walking around one location cannot repeatedly startle the same player.

The Haunting Chain continues when several unique Ghosts are found inside the configured time window. Its bonus is added only to Ghost Points. It never inserts another found id, participation date, collection milestone, or perfect-completion condition.

## Default Event Configuration

The generated `events.yml` includes an enabled example edition:

```yaml
events:
  halloween_2026:
    enabled: true
    theme: ghost
    reward-profile: halloween_2026
    display-name: Halloween 2026 Ghost Hunt
    edition: 2026
    timezone: Europe/Amsterdam
    start-date: '2026-10-25'
    end-date: '2026-10-31'
    claim-deadline: '2026-11-07'
    days: 7
    expected-coconuts: 100
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

`expected-coconuts` retains its legacy key name for file compatibility; for this event it means expected Ghosts. The dates are examples. Confirm the real start, inclusive end, inclusive claim deadline, expected count, reward worlds, and warp before production activation.

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
        - player:MHF_Ghast
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

`player:MHF_Ghast` is a safe relevant default, not a final custom Halloween art decision. Replace `head.texture-values` with approved Mojang texture URLs or base64 texture values before launch if custom Ghost designs are desired. Invalid values are skipped. Every placement randomly chooses a valid variant and persists that number, so reloads do not reshuffle existing heads.

Particle names are checked against the Paper API. Sound values must be namespaced, such as `minecraft:entity.vex.death`. Counts, radii, cooldowns, volume, pitch, Darkness duration/amplifier, title timing, candidate limits, and hologram limits are clamped and preflighted during reload/event validation.

## Quick Admin Test: 15 Ghosts

The themed debug command selects the Halloween source event before enabling debug:

```text
/ghosthunt admin debug true
/ghosthunt admin expected 15
/ghosthunt admin status
/ghosthunt admin ghost give 15 0
```

Place all 15 setup heads. Debug permits any loaded world when `debug.allow-any-world: true`. Each placement creates a `ghost_<uuid>` id and writes the complete marker to block PDC and `coconuts.yml` under `debug_halloween_2026`. It cannot enter the production `halloween_2026` registry.

Assign and validate the waves:

```text
/ghosthunt admin ghost waves auto 7 2026
/ghosthunt admin ghost validate
/ghosthunt admin event validate
/ghosthunt admin event snapshot
```

With no debug date/day override, the debug edition is immediately active on day 1. The same admin account may right-click unlocked Ghosts and use every normal player GUI. An alt is needed only for independent-player, community-pair, and nearby-teamwork tests.

Advance the test clock:

```text
/ghosthunt admin day 2
/ghosthunt admin day 7
/ghosthunt admin day off
/ghosthunt admin date 2026-11-02
/ghosthunt admin date off
```

Test all effect modes:

```text
/ghosthunt effects full
/ghosthunt effects reduced
/ghosthunt effects off
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
```

## Production Setup

1. Confirm the approved dates, expected Ghost count, `halloween` world name, optional region, reward worlds, and visit command in `events.yml`.
2. Replace or approve the Ghost texture pool in `themes.yml`.
3. Review every `profiles.halloween_2026` reward, point bonus, command hook, shop offer, and allowed command prefix in `rewards.yml`.
4. Create and test the CMI kit named by the perfect reward, or replace that command with the approved reward.
5. Run `/ghosthunt admin debug false`.
6. Give setup heads with `/ghosthunt admin ghost give [amount] [unlock-day]`.
7. Place each head in the configured world/region, or look at an existing normal player head and run `/ghosthunt admin ghost register [unlock-day]`.
8. Leave heads at day `0` when they should be assigned automatically, then run `/ghosthunt admin ghost waves auto 7 <seed>`.
9. Run `/ghosthunt admin ghost validate` and resolve every id, location, PDC, world, region, day, texture, block, and exact-count issue.
10. Run `/ghosthunt admin event validate` to preflight themes, visuals, worlds, rewards, hooks, allowlists, visit commands, and the complete registry.
11. Inspect the target with `/hunt admin event status halloween_2026`.
12. Preview activation with `/hunt admin event activate halloween_2026 --dry-run`.
13. Activate with `/hunt admin event activate halloween_2026 --confirm`. Use `--force-confirm` only when the currently selected event is inside its live dates and staff deliberately approve the switch.

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
/ghosthunt effects <full|reduced|off>
```

`/ghosthunt history` opens all configured Ghost editions. `/ghosthunt claim all halloween_2026` explicitly claims from that older edition only if its own claim deadline and reward-world rules still permit delivery.

Themed staff commands:

```text
/ghosthunt admin reload
/ghosthunt admin status
/ghosthunt admin debug <true|false>
/ghosthunt admin expected <count|production>
/ghosthunt admin day <1-7|off>
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
/ghosthunt admin reset player <player> [event-id] <--dry-run|--confirm>
/ghosthunt admin reset event <--dry-run|--confirm>
/ghosthunt admin report [event-id]
/ghosthunt admin shop regrant <online-player> <offer-id>
```

Canonical production selection:

```text
/hunt admin event list
/hunt admin event status <event-id>
/hunt admin event activate <event-id> --dry-run
/hunt admin event activate <event-id> --confirm
/hunt admin event activate <event-id> --force-confirm
```

Setup mutations are event-bound. A Coconut command cannot enable, disable, or remove a Ghost, and a setup head referencing an unknown/mismatched theme or event is refused.

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `onembcmi.GhostHunt.use` | true | Open Ghost Hunt, history, help, and effect controls; discover Ghosts. |
| `onembcmi.GhostHunt.progress` | true | View personal, wave, streak, community, and point progress. |
| `onembcmi.GhostHunt.rewards` | true | View configured rewards and perfect completion. |
| `onembcmi.GhostHunt.claim` | true | Claim eligible current or historical rewards in allowed worlds. |
| `onembcmi.GhostHunt.shop` | true | Use configured Ghost Point offers. |
| `onembcmi.GhostHunt.admin` | false | Parent for all Ghost Hunt staff permissions. |
| `onembcmi.GhostHunt.admin.reload` | false | Reload shared hunt files, caches, visuals, and lifecycle tasks. |
| `onembcmi.GhostHunt.admin.debug` | false | Select and control isolated Halloween debug state. |
| `onembcmi.GhostHunt.admin.event` | false | Validate snapshots and event lifecycle actions. |
| `onembcmi.GhostHunt.admin.ghost` | false | Give/place/register/inspect/change/remove/validate Ghosts and assign waves. |
| `onembcmi.GhostHunt.admin.inspect` | false | Inspect player event records and regrant recorded shop delivery. |
| `onembcmi.GhostHunt.admin.reset` | false | Run guarded player or debug-event resets. |
| `onembcmi.GhostHunt.admin.report` | false | Export event reports. |
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

The registry is schema 3; state, events, rewards, themes, and player records are schema 2. Before an older existing file is rewritten, a deterministic `*.pre-schema-<target>-from-<source>.bak` copy is required. Backups are idempotent and never overwritten. If a required backup cannot be created, that migration/write is refused rather than risking the live data.

Player preferences are stored by theme, while progress is stored by effective event id. Changing Ghost effects therefore persists across Halloween editions, but finds, points, claims, and chains do not cross editions.

## Reward Safety

The Halloween reward profile lives at `profiles.halloween_2026` in `rewards.yml`. The default perfect command is:

```text
cmi kit ghosthunt_reward_box_2026 {player} -s
```

That kit is a manual launch dependency. Create and review it, or replace the command before activation. The sample Bat and Phantom shop entries are disabled by default because no production cosmetic integration is assumed.

Claims and purchases retain CoconutHunt's durable claim-before-command rule. Every configured command is validated against `command-security.allowed-prefixes` before the claim/purchase record and point change are saved. Commands run only afterward. A dispatch failure cannot duplicate the claim or charge on retry; it is logged for staff review. Debug reward commands remain suppressed unless explicitly enabled.

## Performance And Cleanup

The registry maintains a world/chunk spatial index. Each visual scan asks only for nearby chunks, filters the active event/snapshot, and then applies configured candidate and hologram caps. It does not iterate every registered Ghost for every player.

Paper TextDisplays are private, transient, non-persistent, and invisible by default until shown to one player. They are removed on movement between worlds, long teleports, chunk unload, quit, reload, event inactivity, and plugin disable. No persistent armor stands or display entities are intentionally left behind. Bukkit world/entity operations and scheduled clearing effects remain on the server thread.

## Build And Launch Checklist

The shared jar is:

```text
1MB-CMIAPI-CoconutHunt-v1.0.0-535-j25-26.2.jar
```

It targets Java 25 and Paper 26.2 beta build 60 or newer. CMI, CMILib, and `1MB-CMIAPI-Lib` are required. PlaceholderAPI, LuckPerms, Vault, and MobHat are optional; disabled Ghost shop samples do not block the hunt.

- [ ] Approve the real event dates and claim deadline.
- [ ] Confirm the production world is named `halloween` and any cuboid is correct.
- [ ] Approve one or more Ghost textures.
- [ ] Confirm all point values, community thresholds, milestones, hooks, and reward commands.
- [ ] Create or replace `ghosthunt_reward_box_2026`.
- [ ] Enable and review any shop offer deliberately; leave unsupported samples disabled.
- [ ] Complete a 15-head `debug_halloween_2026` run in `full`, `reduced`, and `off` modes.
- [ ] Verify discovery, chain cap, all seven waves, GUI history, claims, reset, reload, and restart persistence.
- [ ] Require zero Ghost registry and event validation issues at the exact production count.
- [ ] Run `/hunt admin event status halloween_2026` and the activation dry-run.
- [ ] Record staff approval before any `--force-confirm` live switch.
- [ ] Confirm the production snapshot and activation audit after selection.
