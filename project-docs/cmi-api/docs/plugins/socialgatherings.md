# SocialGatherings

## Purpose

SocialGatherings adds small social moments around CMI sit/chair behavior, beds, food, chat, fishing, block interaction, looking direction, mining, harvesting, vehicles, projectiles, and `/hat` style play. It is meant for protected town builds such as a campfire beach, a dinner table, a sleepover room, a garden picnic, a library, a market, a minecart track, a boat canal, or a hat-party stage.

The feature is intentionally low-reward. A successful gathering can show titles, sounds, particles, and run optional configured console commands, but it is guarded by type cooldowns, per-player cooldowns, and same-type streak limits so players cannot turn it into an AFK reward machine.

## Features

- Configurable party files under `plugins/1MB-CMIAPI/SocialGatherings/parties/`, with all defaults disabled until the town spot is built.
- Default examples for campfire circle, sleepover, dinner party, beach party, hat party, sneak party, dance party, parachute party, balloon ride, cookout, stargazing, fishing circle, garden picnic, forge crew, reading club, market meetup, mining party, minecart tour, boat parade, archery range, bakery shift, snow day, farm harvest, beacon rally, and trail hike.
- Detect CMI sitting through `CMIPlayerSitEvent` and `CMI.getInstance().getAnimationManager().isSitting(player)`.
- Detect CMI portal use through `CMIPortalUseEvent` for maze/checkpoint style parties.
- Also detects Paper player poses for sitting and sleeping, bed events, chat activity, item consumption, fishing activity, recent block breaks, recent bow shots, recent projectile throws, current vehicles, recent block interactions, held items, looking upward, sneaking, jumping, gliding, flint-and-steel/fire-charge heating, jukebox discs, nighttime, and helmet/hat materials.
- Optional area matching by world, center, and radius, so a party can be tied to a specific town build.
- Optional nearby material checks such as campfires, tables/cakes/candles, sand/water, or any other server-defined block set.
- Minimum participants and duration before the gathering completes.
- Larger configured `great-players` values can be used by staff as a design target for bigger town builds.
- Optional console commands for every participant, one random participant, or a once-per-success console action.
- Per-player opt-out with `/gathering toggle`.
- Clickable invite messages with `/gathering invite <type> <player>`.
- Admin status, enable, disable, reload, and manual trigger commands for beta testing.

## Commands

```text
/gathering
/gathering help
/gathering info
/gathering types [page]
/gathering info <type>
/gathering <type>
/gathering nearby
/gathering toggle [on|off]
/gathering invite <type> <player>
/gathering admin status [page]
/gathering admin trigger <type>
/gathering admin setarea <type> here <radius>
/gathering admin setcenter <type> here
/gathering admin setradius <type> <radius>
/gathering admin show <type>
/gathering admin tp <type>
/gathering admin setportal <type> <start|checkpoint|end|add> <portalName>
/gathering admin validate <type>
/gathering admin enable <type>
/gathering admin disable <type>
/gathering admin reload
```

Setup and testing commands:

| Command | Purpose |
| --- | --- |
| `/gathering admin enable <type>` | Enables one party file after the town spot has been built and configured. |
| `/gathering admin disable <type>` | Disables one party file without deleting its YAML setup. |
| `/gathering admin status [page]` | Shows enabled state, participant counts, active duration, cooldowns, and latest runtime result. |
| `/gathering admin setarea <type> here <radius>` | Writes `area.enabled`, `area.world`, `area.center`, and `area.radius` from your current in-game location. |
| `/gathering admin setcenter <type> here` | Moves an existing party area to your current in-game location without changing its radius. |
| `/gathering admin setradius <type> <radius>` | Changes one party area's radius without moving its center. |
| `/gathering admin show <type>` | Prints the current party setup and shows a small particle marker at the center and cardinal radius points when possible. |
| `/gathering admin tp <type>` | Teleports the admin to the configured area center. |
| `/gathering admin setportal <type> <start\|checkpoint\|end\|add> <portalName>` | Updates the CMI portal checkpoint sequence used by maze/trail style parties. |
| `/gathering admin validate <type>` | Checks one party setup for common problems such as missing world, missing clear materials, or permissive requirement lists. |
| `/gathering nearby` | Shows which configured party areas match your current location and how many players are currently eligible. |
| `/gathering info <type>` | Shows where the party is, what players need to do, minimum players, duration, cooldowns, and rewards. |
| `/gathering admin trigger <type>` | Forces a beta-test completion for nearby eligible players. Use this to test effects and rewards, not normal gameplay. |
| `/gathering admin reload` | Reloads config, translations, and party YAML files after file edits. |

Current setup can be done in-game for common area work. The commands write to `parties/<type>.yml` and reload the feature. You can still edit advanced requirements, rewards, materials, durations, and portal windows directly in the party YAML files.

Aliases:

```text
/gatherings
/partyspot
/chillparty
```

Global library examples:

```text
/1mbcmi debug plugin socialgatherings
/1mbcmi debug plugin socialgatherings all
/1mbcmi debug plugin socialgatherings commands
/1mbcmi config socialgatherings
/1mbcmi translations reload
```

## Example Commands

```text
/gathering info
/gathering types
/gathering info campfire
/gathering campfire
/gathering info stargazing
/gathering info fishingcircle
/gathering info gardenpicnic
/gathering info forgecrew
/gathering info readingclub
/gathering info marketmeetup
/gathering info miningparty
/gathering info minecarttour
/gathering info boatparade
/gathering info archeryrange
/gathering info bakeryshift
/gathering info snowday
/gathering info farmharvest
/gathering info beaconrally
/gathering info trailhike
/gathering nearby
/gathering toggle off
/gathering toggle on
/gathering invite beach NikkiPixel
/gathering admin status
/gathering admin trigger dinner
/gathering admin setarea beach here 18
/gathering admin setcenter dinner here
/gathering admin setradius dinner 10
/gathering admin show beach
/gathering admin tp beach
/gathering admin setportal trailhike start trailhike_start
/gathering admin setportal trailhike checkpoint trailhike_view
/gathering admin setportal trailhike end trailhike_end
/gathering admin validate trailhike
/gathering admin enable beach
/gathering admin disable beach
/gathering admin reload
```

## Permissions

```text
onembcmi.socialgatherings.use
onembcmi.socialgatherings.toggle
onembcmi.socialgatherings.invite
onembcmi.socialgatherings.admin
onembcmi.socialgatherings.admin.trigger
onembcmi.socialgatherings.admin.reload
```

## Placeholders

```text
%onembcmi_socialgatherings.enabled%
%onembcmi_socialgatherings.opted_out%
%onembcmi_socialgatherings.types%
%onembcmi_socialgatherings.runtime.successes%
%onembcmi_socialgatherings.runtime.participants%
%onembcmi_socialgatherings.last.type%
%onembcmi_socialgatherings.last.players%
%onembcmi_socialgatherings.last.at%
%onembcmi_socialgatherings.cache.size%
```

## How Area Detection Works

SocialGatherings currently uses a simple area-and-requirements model. It does not register exact chair, bed, balloon, BBQ, or landing-pad block locations yet.

Each party file can define one area:

```yaml
area:
  enabled: true
  world: world
  center: "1250,68,-420"
  radius: 18
```

When a party is enabled, the plugin periodically scans online players. A player counts for that party when:

- the player is inside the configured area, if `area.enabled` is true
- the player has `onembcmi.socialgatherings.use`
- the player has not opted out with `/gathering toggle off`
- the player is not blocked by that party's player cooldown or same-type streak guard
- the player matches that party's configured requirements

This means staff build the physical spot in town, configure the area around it, and let the requirements decide who is participating. For example, a sleepover room can contain five beds, but the plugin is not told "these are the five exact beds"; it counts players sleeping inside the configured room area. A parachute arena is similar: the plugin does not know the route, but it counts players gliding inside the configured flight box.

Useful setup commands:

```text
/gathering admin setarea <type> here <radius>
/gathering admin setcenter <type> here
/gathering admin setradius <type> <radius>
/gathering admin show <type>
/gathering admin tp <type>
/gathering admin validate <type>
/gathering admin enable <type>
/gathering admin disable <type>
/gathering admin status
/gathering nearby
/gathering info <type>
```

All generated party types start with `enabled: false` so staff can build and configure each town spot before players can trigger it.

## Default Gathering Types

Campfire Circle:

- Build idea: a campfire circle, garden fire pit, beach fire, or town campsite with places to `/sit` or right-click-sit.
- How players count: they must be inside the configured area, sitting through CMI/Paper pose detection, near `CAMPFIRE` or `SOUL_CAMPFIRE`, and someone must have chatted recently.
- What it does not track: exact log seats or exact chair blocks. Keep the area tight if only the intended seats should count.
- Default minimum is 3 players for 45 seconds.

Sleepover:

- Build idea: an inn room, dorm, tent camp, sleepover house, or row of beds in a protected town building.
- How players count: they must be inside the configured area and sleeping or in a sleeping pose. Bed enter and leave events are also remembered during the scan.
- What it does not track: exact bed locations. Five beds in the room are enough visually, but the plugin counts sleeping players in the area.
- Default minimum is 2 players for 18 seconds.

Dinner Party:

- Build idea: a dining table, tavern table, picnic table, feast hall, or player restaurant.
- How players count: they must be inside the configured area, sitting, and have eaten recently. The default also looks for nearby table decor materials such as `CAKE`, `CANDLE`, or `FLOWER_POT`.
- What it does not track: exact chair count or table slots. If the dining room has ten seats, the configured area decides which seats belong to the party.
- Default minimum is 4 players for 30 seconds.

Beach Party:

- Build idea: beach loungers, pool chairs, umbrella spots, towels, docks, or a resort deck.
- How players count: they must be inside the configured area, sitting, and near configured beach materials such as `SAND`, `SANDSTONE`, or `WATER`.
- What it does not track: exact lounge chair locations. Build the chairs inside the radius and keep unrelated sand/water outside the radius if needed.
- Default minimum is 4 players for 45 seconds.

Hat Party:

- Build idea: town hall stage, fashion runway, costume corner, theater, or party room.
- How players count: they must be inside the configured area and wear an approved helmet or `/hat` material.
- What it does not track: how the hat was equipped. It only checks the helmet slot and the `approved-hats` material list.
- Default approved hats include player heads, pumpkins, turtle helmets, and normal helmet materials.

Sneak Party:

- Build idea: a town maze, stealth route, museum laser-room, hedge maze, or crouch tunnel.
- How players count: they must sneak recently and have touched each configured CMI portal name in `cmi-portals.sequence` within `cmi-portals.window-seconds`.
- What it does not track yet: strict portal order. It confirms that each named portal was touched within the time window, but it does not currently enforce start before checkpoint before end.
- Default sequence is `sneakparty_start`, `sneakparty_checkpoint`, and `sneakparty_end`.

Dance Party:

- Build idea: dance floor, town club, festival stage, music room, or nighttime square.
- How players count: they must be inside the configured area, sneak recently, jump recently, and be near a jukebox playing one of the configured music discs. By default it also requires nighttime.
- What it does not track: rhythm or exact dance steps. Sneak and jump are the simple "dancing" signals.
- If `music.require-all-discs` is true, the active party window must see all configured discs before it succeeds.

Parachute Party:

- Build idea: a plane, airship, tower jump, sky dock, or barrier-box elytra landing arena.
- How players count: they must be inside the configured area and `isGliding()` with elytra at scan time.
- What it does not track: exact flight path, takeoff point, or landing point. The configured area should cover the intended flight box or landing arena.
- Default minimum is 3 players for 20 seconds.

Hot Air Balloon Ride:

- Build idea: two nearby decorative hot air balloons with basket platforms and heat blocks.
- How players count: they must be inside the configured balloon area. Someone must have used flint and steel or a fire charge recently, and the default checks for nearby `CAMPFIRE`, `SOUL_CAMPFIRE`, or `NETHERRACK`.
- What it does not track: separate balloon baskets or actual movement. The balloons are static builds; the area and heat interaction make it a "ride".
- Default minimum is 6 players for 45 seconds.

Cookout:

- Build idea: BBQ, smoker station, picnic grill, camp kitchen, or hopper-fed redstone cooking setup.
- How players count: they must be inside the configured area, near BBQ materials such as `SMOKER`, `CAMPFIRE`, `SOUL_CAMPFIRE`, or `HOPPER`, and eat one of the configured cooked foods recently.
- What it does not track: whether the food truly came from that BBQ machine. The build can handle the roleplay/redstone, while the plugin checks that players ate valid cooked food in the area.
- Default minimum is 3 players for 60 seconds.

Stargazing:

- Build idea: rooftop observatory, hill, beach lookout, telescope build, or night garden.
- How players count: they must be inside the configured area, it must be night, and each player must look upward enough to pass `requirements.looking-up-max-pitch`.
- What it does not track: exact telescope blocks or the player's line of sight to stars. The area and upward pitch are the realistic signals.
- Default nearby materials include `COPPER_BLOCK`, `AMETHYST_BLOCK`, `TINTED_GLASS`, and `LIGHTNING_ROD`.
- Default minimum is 2 players for 35 seconds.

Fishing Circle:

- Build idea: fishing dock, pond, pier, riverbank, seaside deck, or boat-house platform.
- How players count: they must be inside the configured area, hold a `FISHING_ROD`, cast or trigger a recent fishing event, and be near water.
- What it does not track: exact bobber location or whether a fish was caught. The plugin only needs recent real fishing activity so the group cannot just stand there AFK.
- Default minimum is 2 players for 45 seconds.

Garden Picnic:

- Build idea: flower garden, picnic blanket, orchard, park, hedge corner, or town green.
- How players count: they must be inside the configured area, sitting, near garden materials, and have eaten an allowed picnic food recently.
- What it does not track: exact blanket squares or baskets. Use a tight area and `near-materials` to anchor the picnic to the build.
- Default allowed foods include bread, cookies, apples, berries, melon slices, and pumpkin pie.
- Default minimum is 3 players for 35 seconds.

Forge Crew:

- Build idea: blacksmith shop, forge, workshop, repair station, or town industrial corner.
- How players count: they must be inside the configured area, hold a forge material such as coal or ingots, and recently right-click one of the configured forge blocks.
- What it does not track: actual smelting, repairing, or crafting output. It checks recent station interaction plus held materials, keeping it lightweight.
- Default interaction materials include `FURNACE`, `BLAST_FURNACE`, `ANVIL`, `SMITHING_TABLE`, and `GRINDSTONE`.
- Default minimum is 2 players for 40 seconds.

Reading Club:

- Build idea: library, classroom, archive, reading room, bookshop, or study hall.
- How players count: they must be inside the configured area, hold a book or paper item, and recently right-click a lectern or bookshelf-type block.
- What it does not track: book contents or page progress. It uses safe item/block signals only.
- Default minimum is 2 players for 45 seconds.

Market Meetup:

- Build idea: market square, stall row, shopping street, festival vendor area, or auction plaza.
- How players count: they must be inside the configured area, hold a configured market good, recently interact with a stall block, and chat recently.
- What it does not track: real economy trades. It is social ambience only and does not move money or items beyond optional configured tiny rewards.
- Default interaction materials include `BARREL`, `CHEST`, `TRAPPED_CHEST`, `LECTERN`, and `CRAFTING_TABLE`.
- Default minimum is 3 players for 40 seconds.

Mining Party:

- Build idea: small ore pocket, mine room, quarry event, cave challenge, or protected mining cell.
- How players count: they must be inside the configured area, hold a pickaxe, recently break one of the configured ore materials, and the configured ore materials must all be gone from the small scan area.
- What it does not track: who mined every exact ore. It checks recent mining participation and then confirms the configured `clear-materials` no longer exist in the configured area.
- Keep `area.radius` small. The scan is capped by `detection.area-clear-max-radius` to avoid turning a social feature into a large block scanner.
- Default minimum is 2 players and completion waits 8 seconds after the area is clear.

Minecart Tour:

- Build idea: scenic railway, town tram, mine tour, underground route, or roller-coaster station.
- How players count: they must be inside the configured area, currently riding one of the configured minecart entity types, and near rail materials.
- What it does not track: exact route distance or checkpoints. Use a tight area around the intended station or route section.
- Default minimum is 2 players for 35 seconds.

Boat Parade:

- Build idea: canal, harbor, lake, river path, dock route, or decorative parade lane.
- How players count: they must be inside the configured area, currently riding a configured boat or raft entity type, and near water.
- What it does not track: exact route, speed, or boat owner.
- Default minimum is 2 players for 35 seconds.

Archery Range:

- Build idea: target wall, castle training yard, festival booth, arena practice lane, or ranger camp.
- How players count: they must be inside the configured area, hold a bow or crossbow, shoot recently, and be near target-style blocks.
- What it does not track: whether the arrow hit the target block. The bow-shot event and range area are the lightweight signals.
- Default minimum is 2 players for 30 seconds.

Bakery Shift:

- Build idea: bakery, cafe counter, kitchen, bread shop, market oven, or village food stall.
- How players count: they must be inside the configured area, hold bakery ingredients, and recently right-click a configured bakery block such as a smoker, furnace, crafting table, barrel, or chest.
- What it does not track: actual crafting output or inventory movement.
- Default minimum is 2 players for 35 seconds.

Snow Day:

- Build idea: snow fort, frozen lake, winter plaza, mountain slope, holiday village, or ice rink.
- How players count: they must be inside the configured area, throw a configured projectile type such as `SNOWBALL`, and be near snow or ice materials.
- What it does not track: who was hit by a snowball. It only checks friendly snowball activity.
- Default minimum is 2 players for 30 seconds.

Farm Harvest:

- Build idea: community farm, greenhouse, crop field, orchard row, seasonal harvest plot, or farmer market garden.
- How players count: they must be inside the configured area, recently break one of the configured crop materials, and be near farm materials such as `FARMLAND`, `COMPOSTER`, `HAY_BLOCK`, or `WATER`.
- What it does not track: crop age. Staff should use a protected build and crop choices that make sense for the event.
- Default minimum is 2 players for 45 seconds.

Beacon Rally:

- Build idea: monument, plaza beacon, milestone tower, server celebration platform, or trophy room.
- How players count: they must be inside the configured area, hold one of the configured ingot/gem materials, and be near a `BEACON`.
- What it does not track: beacon payment inventory or active beacon effects. It is a simple group-rally moment.
- Default minimum is 3 players for 35 seconds.

Trail Hike:

- Build idea: forest trail, scenic mountain path, museum tour, garden walk, town route, or hidden-location trail.
- How players count: they must touch each configured CMI portal checkpoint within `cmi-portals.window-seconds`.
- What it does not track yet: strict portal order. It confirms that every named checkpoint was touched within the window.
- Default CMI portal sequence is `trailhike_start`, `trailhike_view`, and `trailhike_end`.

## Setup Notes For Staff

- Use smaller radiuses for precise builds and larger radiuses for open areas like beaches or flight arenas.
- Use `near-materials` to anchor a party to obvious blocks so nearby players do not accidentally count.
- Use `feedback.enabled: true` while testing so players get a small confirmation when they are counted.
- Use `/gathering admin status` to see eligible participant counts while staff are standing in the build.
- Use `/gathering admin setarea <type> here <radius>` to set the normal center/radius from in-game. This is the easiest setup path for most parties.
- Use `/gathering admin show <type>` after setting an area. It prints the saved values and shows a small particle marker if you are in the same world.
- Use `/gathering admin trigger <type>` only for beta testing effects and rewards; it bypasses the normal waiting period.
- Use `/gathering admin validate <type>` before enabling a party so obvious setup mistakes are caught early.
- Keep rewards light because these parties are for social ambience, not grinding.

CMI portal sequence setup examples:

```text
/gathering admin setportal sneakparty start sneakparty_start
/gathering admin setportal sneakparty checkpoint sneakparty_checkpoint
/gathering admin setportal sneakparty end sneakparty_end
/gathering admin setportal trailhike start trailhike_start
/gathering admin setportal trailhike checkpoint trailhike_view
/gathering admin setportal trailhike end trailhike_end
```

## Config

Important config paths:

```text
enabled
scan.interval-seconds
detection.sit-memory-seconds
detection.chat-memory-seconds
detection.eat-memory-seconds
detection.sneak-memory-seconds
detection.jump-memory-seconds
detection.heat-memory-seconds
detection.fishing-memory-seconds
detection.interaction-memory-seconds
detection.mining-memory-seconds
detection.shooting-memory-seconds
detection.projectile-memory-seconds
detection.area-clear-max-radius
anti-grind.max-same-type-streak
invite.click-command
parties.auto-create-defaults
parties.types
```

Existing configs keep their configured `parties.types` order, and the plugin appends any missing built-in default types at runtime so new disabled party examples become available after upgrades.

Each party type has its own file:

```text
plugins/1MB-CMIAPI/SocialGatherings/parties/campfire.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/sleepover.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/dinner.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/beach.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/hatparty.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/sneakparty.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/danceparty.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/parachuteparty.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/balloonride.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/cookout.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/stargazing.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/fishingcircle.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/gardenpicnic.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/forgecrew.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/readingclub.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/marketmeetup.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/miningparty.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/minecarttour.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/boatparade.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/archeryrange.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/bakeryshift.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/snowday.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/farmharvest.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/beaconrally.yml
plugins/1MB-CMIAPI/SocialGatherings/parties/trailhike.yml
```

Important party file paths:

```text
enabled
display-name
description
where
required-action
area.enabled
area.world
area.center
area.radius
min-players
great-players
duration-seconds
timeout-seconds
cooldown-seconds
player-cooldown-seconds
requirements.sitting
requirements.sleeping
requirements.chat
requirements.eating
requirements.hat
requirements.sneaking
requirements.jumping
requirements.gliding
requirements.night
requirements.heat
requirements.fishing
requirements.interaction
requirements.looking-up
requirements.looking-up-max-pitch
requirements.mining
requirements.harvesting
requirements.shooting
requirements.projectile
requirements.vehicle
requirements.area-cleared
near-material-radius
near-materials
approved-hats
allowed-eaten-materials
held-materials
interaction-materials
break-materials
clear-materials
projectile-types
vehicle-types
cmi-portals.sequence
cmi-portals.window-seconds
music.required-discs
music.require-all-discs
effects.title
effects.subtitle
effects.sound
effects.particle
effects.particle-count
feedback.enabled
feedback.cooldown-seconds
feedback.message
feedback.sound
feedback.particle
feedback.particle-count
commands.start.console
commands.success.all
commands.success.random-one
commands.success.console
commands.fail.all
commands.fail.console
commands.end.console
```

Area example for `parties/beach.yml`:

```yaml
enabled: true
area:
  enabled: true
  world: world
  center: "1250,68,-420"
  radius: 18
```

Reward command examples:

```yaml
commands:
  start:
    console:
      - "cmi titlemsg {players} &aParty started"
  success:
    all:
      - "minecraft:give {player} cookie 1"
    random-one:
      - "cmi kit sitsocialbook {player}"
    console:
      - "cmi broadcast {display} happened with {count} players!"
  fail:
    console:
      - "cmi msg {players} The party fizzled out. Try again!"
  end:
    console: []
```

Participation feedback:

When a player is already doing the right thing for an enabled party, SocialGatherings can send a soft confirmation before the party completes. This is useful while testing town builds because players can tell that sitting, sleeping, gliding, sneaking, eating, standing in the right area, or using the right CMI portal is being counted.

```yaml
feedback:
  enabled: true
  cooldown-seconds: 20
  message: "<color:#d8e2dc>You're counted for</color> <color:#ffc8dd>{display}</color><color:#d8e2dc>. Players: {count}/{needed}.</color>"
  sound: BLOCK_NOTE_BLOCK_PLING
  particle: HAPPY_VILLAGER
  particle-count: 6
```

Feedback placeholders:

```text
{type}
{display}
{count}
{needed}
{missing}
```

Placeholders available in commands:

```text
{player}
{playerName}
{random}
{type}
{display}
{count}
{players}
{phase}
```

## Data

Shared playerdata:

```yaml
name: "PlayerName"
socialgatherings:
  enabled: true
  last-type: "campfire"
  same-type-streak: 1
  last-success: "2026-04-26T00:00:00Z"
  cooldowns:
    campfire: 1770000000000
```

Runtime-only data:

- currently active participant windows
- type cooldowns
- recent sit/chat/eat/sleep/sneak/jump/heat/fishing/interaction/break/shoot/projectile state
- CMI portal progress for maze parties
- active party music discs seen during the current party window
- per-player participation feedback cooldowns

## CMI / CMILib Usage

CMI:

- Listens to `CMIPlayerSitEvent` to remember CMI sit/chair activity.
- Listens to `CMIPortalUseEvent` for start/checkpoint/end party progress.
- Uses `CMI.getInstance().getAnimationManager().isSitting(player)` during scans when available.
- Can run configured CMI commands such as `cmi kit sitsocialbook {player}` after a successful gathering.

CMILib:

- CMILib remains a runtime dependency through CMI and the shared 1MB CMI-API library stack.

Paper:

- Uses Paper chat events, bed enter/leave events, item consume events, block break events, bow-shoot events, projectile launch events, vehicle state, move/sneak/interact events, player pose checks, jukebox state, Adventure titles, sounds, particles, and clickable invite messages.

## Security Notes

- Type ids are normalized to strict lowercase `a-z`, `0-9`, `_`, and `-`.
- Player commands never accept arbitrary console command text.
- Configured reward commands are trusted admin-authored config and are stripped of a leading `/`.
- Player opt-out and cooldown data is stored under the `socialgatherings` shared playerdata section.
- Reward design should stay light: snacks, cosmetics, tiny blocks, sounds, particles, and optional story kits.
- Use type cooldowns, player cooldowns, and `anti-grind.max-same-type-streak` to prevent repeat farming.

## Shared Library Usage

SocialGatherings uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, PlaceholderAPI routing, tab filtering, paginated list rendering, shared `PlayerDataStore` UUID load/save, plugin-scoped playerdata cleanup, and debug metadata.

[Plugin index](README.md)
