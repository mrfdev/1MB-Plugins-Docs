# PassportDiscovery

PassportDiscovery is the umbrella discovery-passport plugin for player-facing collection progress. It adds `/passport` and tracks stamps for worlds, warps, visits, biomes, blocks, items, consumables, tools, weapons, armor, kills, mounts, and sustained exploration in shared UUID playerdata.

WarpPassport is retired from the active build for new installs. Its source remains in the repository for reference, but `/passport warp` is the supported path for CMI warp stamps.

## Purpose

- Give players one friendly command family for discovery progress.
- Track real gameplay discoveries from Paper events.
- Keep rewards optional and one-time, while letting completed passports earn generic stamp credits.
- Store long-lived progress under shared `playerdata/<uuid>.yml`.
- Allow each discovery type to be enabled or disabled separately.

## Commands

```text
/passport info
/passport status [type]
/passport stats <type>
/passport types
/passport view <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> [page]
/passport missing <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore|hand> [page]
/passport known <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> [page]
/passport info <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> <entry>
/passport recent [page]
/passport batch [fast|normal|slow|off|reset]
/passport progress [status|on|off|toggle]
/passport stamps
/passport stamps trade <box>
/passport scan
/passport top [all|world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore]
/passport admin inspect <player|uuid> [type]
/passport admin contents <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> [page]
/passport admin eligibility <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> <entry>
/passport admin costs
/passport admin costs set <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore> <cost>
/passport admin costs clear <world|warp|visit|biome|block|item|consume|tool|weapon|armor|kill|mount|explore>
/passport admin overlaps [page]
/passport admin reset <online-player> <type|all> [entry]
/passport admin dump
/passport admin reload
```

Shared debug/config commands:

```text
/1mbcmi debug plugin passportdiscovery
/1mbcmi debug plugin passportdiscovery all
/1mbcmi config passportdiscovery
/1mbcmi config set passportdiscovery tracking.biome.enabled false
/1mbcmi translations reload
```

## Examples

```text
/passport
/passport info
/passport status warp
/passport stats warp
/passport view warp
/passport known warp
/passport info warp tree
/passport missing visit
/passport missing hand
/passport status biome
/passport view item
/passport view consume
/passport missing consume
/passport top weapon
/passport missing armor
/passport view kill
/passport view mount
/passport view explore
/passport info explore swimming
/passport recent
/passport recent 2
/passport batch
/passport batch slow
/passport batch off
/passport batch reset
/passport progress
/passport progress off
/passport stamps
/passport stamps trade biome
/passport stamps trade consume
/passport stamps trade visit
/passport top all
/passport top block
/passport scan
/passport admin inspect mrfloris tool
/passport admin contents weapon
/passport admin contents mount 2
/passport admin eligibility item barrier
/passport admin costs
/passport admin costs set block 2000
/passport admin costs clear block
/passport admin overlaps
/passport admin reset mrfloris biome minecraft:plains
```

## WarpPassport Replacement Map

```text
/warppassport status              -> /passport status warp
/warppassport book [page]         -> /passport view warp [page]
/warppassport missing [page]      -> /passport missing warp [page]
/warppassport stats               -> /passport stats warp
/warppassport top                 -> /passport top warp
/warppassport admin warps [page]  -> /passport known warp [page]
/warppassport admin warp <warp>   -> /passport info warp <warp>
/warppassport admin inspect <p>   -> /passport admin inspect <p> warp
/warppassport admin reset <p> [w] -> /passport admin reset <p> warp [w]
/warppassport admin dump          -> /passport admin dump
/warppassport admin reload        -> /passport admin reload
```

## Permissions

```text
onembcmi.passportdiscovery.use
onembcmi.passportdiscovery.top
onembcmi.passportdiscovery.admin
onembcmi.passportdiscovery.admin.inspect
onembcmi.passportdiscovery.admin.reset
onembcmi.passportdiscovery.admin.reload
```

## Placeholders

```text
%onembcmi_passportdiscovery.enabled%
%onembcmi_passportdiscovery.total.stamps%
%onembcmi_passportdiscovery.world.stamps%
%onembcmi_passportdiscovery.world.progress_percent%
%onembcmi_passportdiscovery.warp.stamps%
%onembcmi_passportdiscovery.warp.known%
%onembcmi_passportdiscovery.warp.missing%
%onembcmi_passportdiscovery.warp.last%
%onembcmi_passportdiscovery.warp.visits%
%onembcmi_passportdiscovery.warp.progress_percent%
%onembcmi_passportdiscovery.warp.runtime.stamps%
%onembcmi_passportdiscovery.warp.runtime.new_stamps%
%onembcmi_passportdiscovery.visit.stamps%
%onembcmi_passportdiscovery.visit.progress_percent%
%onembcmi_passportdiscovery.biome.stamps%
%onembcmi_passportdiscovery.biome.progress_percent%
%onembcmi_passportdiscovery.block.stamps%
%onembcmi_passportdiscovery.block.progress_percent%
%onembcmi_passportdiscovery.item.stamps%
%onembcmi_passportdiscovery.item.progress_percent%
%onembcmi_passportdiscovery.consume.stamps%
%onembcmi_passportdiscovery.consume.progress_percent%
%onembcmi_passportdiscovery.tool.stamps%
%onembcmi_passportdiscovery.tool.progress_percent%
%onembcmi_passportdiscovery.weapon.stamps%
%onembcmi_passportdiscovery.weapon.progress_percent%
%onembcmi_passportdiscovery.armor.stamps%
%onembcmi_passportdiscovery.armor.progress_percent%
%onembcmi_passportdiscovery.kill.stamps%
%onembcmi_passportdiscovery.kill.progress_percent%
%onembcmi_passportdiscovery.mount.stamps%
%onembcmi_passportdiscovery.mount.progress_percent%
%onembcmi_passportdiscovery.explore.stamps%
%onembcmi_passportdiscovery.explore.progress_percent%
%onembcmi_passportdiscovery.runtime.new_stamps%
%onembcmi_passportdiscovery.cache.size%
```

## Config

```yaml
enabled: true
debug: false
collection:
  gametypes:
  - survival
  vanish: false
  god: false
  fly: false
progress:
  simple-mode: true
  complex:
    block:
      min-count: 8
      max-count: 64
    item:
      min-count: 1
      max-count: 8
    consume:
      min-count: 1
      max-count: 4
    tool:
      min-count: 1
      max-count: 4
    weapon:
      min-count: 1
      max-count: 4
    armor:
      min-count: 1
      max-count: 2
    kill:
      min-count: 1
      max-count: 8
    mount:
      min-count: 1
      max-count: 4
    explore:
      min-seconds: 60
      max-seconds: 300
tracking:
  world:
    enabled: true
  warp:
    enabled: true
    include-hidden: false
    include-removed: false
    excluded-groups:
    - visits
  visit:
    enabled: true
    match-distance-blocks: 2
  biome:
    enabled: true
    movement-scan-seconds: 8
  block:
    enabled: true
  item:
    enabled: true
  consume:
    enabled: true
  tool:
    enabled: true
  weapon:
    enabled: true
  armor:
    enabled: true
  kill:
    enabled: true
    include-players: false
  mount:
    enabled: true
    include-explore-ride-entities: false
  explore:
    enabled: true
    min-seconds: 25
    max-seconds: 90
    require-saddle-on-saddle-mounts: true
eligibility:
  global:
    blacklist:
    - bedrock
    - barrier
    - command_block
    - chain_command_block
    - repeating_command_block
    - debug_stick
    - structure_block
    - structure_void
    - jigsaw
    - light
    - test_block
    - test_instance_block
  block:
    mode: curated
    whitelist: []
    blacklist: []
  item:
    mode: curated
    whitelist: []
    blacklist: []
    exclude-specialized-types: true
  consume:
    mode: curated
    whitelist: []
    blacklist: []
  material-overlap-mode: multiple
  material-type-priority:
  - armor
  - weapon
  - tool
  - consume
  - item
  biome:
    whitelist: []
    blacklist: []
  armor:
    whitelist: []
    blacklist: []
messages:
  new-stamp:
    enabled: true
    batch:
      enabled: true
      delay-seconds: 19
      player-speeds:
        fast-seconds: 8
        normal-seconds: 0
        slow-seconds: 45
      preview-limit: 4
  repeat-stamp:
    enabled: false
output:
  entries-per-page: 10
rewards:
  enabled: true
  default-cost: 100
  type-boxes:
    enabled: true
    cost-mode: eligible-stamps
    default-cost: 100
    cost-per-stamp: 1
    minimum-cost: 25
    permission-template: cmi.kit.stamps{type}
    command-template: lp user {player} permission set {permission} true
    costs:
      world: 0
      warp: 0
      visit: 0
      biome: 0
      block: 0
      item: 0
      consume: 0
      tool: 0
      weapon: 0
      armor: 0
      kill: 0
      mount: 0
      explore: 0
  legacy-sample-boxes:
    enabled: false
  boxes:
    world:
      display-name: World Stamp Box
      permission: cmi.kit.stampsworld
      commands:
      - lp user {player} permission set {permission} true
    warp:
      display-name: Warp Stamp Box
      permission: cmi.kit.stampswarp
      commands:
      - lp user {player} permission set {permission} true
    visit:
      display-name: Visit Stamp Box
      permission: cmi.kit.stampsvisit
      commands:
      - lp user {player} permission set {permission} true
    biome:
      display-name: Biome Stamp Box
      permission: cmi.kit.stampsbiome
      commands:
      - lp user {player} permission set {permission} true
    block:
      display-name: Block Stamp Box
      permission: cmi.kit.stampsblock
      commands:
      - lp user {player} permission set {permission} true
    item:
      display-name: Item Stamp Box
      permission: cmi.kit.stampsitem
      commands:
      - lp user {player} permission set {permission} true
    consume:
      display-name: Consume Stamp Box
      permission: cmi.kit.stampsconsume
      commands:
      - lp user {player} permission set {permission} true
    tool:
      display-name: Tool Stamp Box
      permission: cmi.kit.stampstool
      commands:
      - lp user {player} permission set {permission} true
    weapon:
      display-name: Weapon Stamp Box
      permission: cmi.kit.stampsweapon
      commands:
      - lp user {player} permission set {permission} true
    armor:
      display-name: Armor Stamp Box
      permission: cmi.kit.stampsarmor
      commands:
      - lp user {player} permission set {permission} true
    kill:
      display-name: Kill Stamp Box
      permission: cmi.kit.stampskill
      commands:
      - lp user {player} permission set {permission} true
    mount:
      display-name: Mount Stamp Box
      permission: cmi.kit.stampsmount
      commands:
      - lp user {player} permission set {permission} true
    explore:
      display-name: Explore Stamp Box
      permission: cmi.kit.stampsexplore
      commands:
      - lp user {player} permission set {permission} true
top:
  limit: 10
  default-type: all
dump:
  max-records: 500
```

## Tracking

- World stamps are collected on join, world change, movement scan, and manual `/passport scan`.
- Warp stamps are collected from `CMIPlayerWarpEvent`, excluding hidden warps and the `visits` group by default.
- Known warp entries are tracked from current CMI warps plus CMI warp create/remove events, so `/passport known warp`, `/passport missing warp`, and `/passport info warp <warp>` replace the old WarpPassport admin warp index.
- Visit stamps are collected by reading `Visit/visits.yml` and matching successful plugin teleports near stored Visit locations.
- Biome stamps are collected with a rate-limited movement scan using Paper's modern biome registry keys.
- Block stamps are collected from block break and block place events.
- Item stamps are collected from pickup, craft, place, held item, and armor scans, but default to an "other items" model. Materials already counted as tools, weapons, armor, or consumables do not also count toward item progress unless `eligibility.item.exclude-specialized-types` is disabled.
- Consume stamps are collected from Paper item consume events for edible foods, potions, milk, honey bottles, ominous bottles, and placed cake bites. Raw and cooked foods are counted by material id, so `beef` and `cooked_beef` can be separate stamps when both are eligible.
- Tool stamps are collected from held tool scans, block interaction paths, and item damage events.
- Weapon stamps are collected from held weapon scans and item damage events. Combat-tab style items such as swords, spears, axes, mace, bow, crossbow, trident, shield, arrows, wind charges, and fire charges count as weapons. Axes intentionally overlap tool and weapon passports.
- Armor stamps are collected from armor contents after inventory changes and manual scan.
- Kill stamps are collected from Paper entity death events when the killer is a player. Player kills are excluded by default.
- Mount stamps are collected from Paper entity mount events when the rider is a player. By default, travel mounts used by the explore passport are excluded from mount stamps so `/cmi ride` and natural travel challenges stay separate.
- Explore stamps are collected when a player sustains a special activity for a randomized duration between `tracking.explore.min-seconds` and `tracking.explore.max-seconds`. Burst movement activities such as Riptide, wind charge flight, jumping, and landing are stamped from Paper movement/interaction events after the plugin confirms the player actually performed the action.
- Explore activities currently include happy ghast mount, elytra flying, Riptide flight, wind charge flight, swimming, crawling, sleeping, walking, sneaking, running, jumping, landing, boat riding, raft riding, minecart riding, horse riding, skeleton horse riding, zombie horse riding, donkey riding, mule riding, camel riding, camel husk riding, strider riding, pig riding, nautilus riding, and zombie nautilus riding.
- `/passport info <type> <entry>` shows whether the player has collected that specific stamp yet, plus seen count and timestamps when available.
- `/passport admin contents <type> [page]` shows the exact computed eligible entries for a type, including the normalized ids used by missing/progress checks.
- `/passport admin eligibility <type> <entry>` explains whether one entry is eligible and shows global blacklist, type blacklist, whitelist, curated/mode, item specialization, and overlap state.
- `/passport admin costs` lists generated stamp-box costs with eligible counts and whether the cost is automatic or overridden. `/passport admin costs set <type> <cost>` writes a per-type override, and `/passport admin costs clear <type>` returns it to automatic pricing.
- `/passport admin overlaps [page]` shows material entries currently counted by more than one material passport type, so admins can decide whether to keep overlap or force a type choice with blacklists.
- `/passport stats <type>` includes short collected and missing samples. Use `/passport view <type>` for the full collected list and `/passport missing <type>` for the full missing list.
- `/passport missing hand` checks the item in the player's main hand, or offhand when the main hand is empty, and reports every matching material passport category. It says whether that held stamp is already collected, still missing, not eligible, or partly complete in complex mode.
- Running and sneaking are rewarded, but they are timed explore activities. The player must keep sprinting or sneaking through the hidden randomized time window. Toggle events are watched in addition to movement so these stamps are more reliable during normal play.
- Saddle-style explore mounts require a saddle by default, which helps avoid counting arbitrary `/cmi ride` mounts as travel passport progress. This includes horses, pigs, striders, camels, camel husks, nautiluses, and zombie nautiluses where the Paper API exposes a saddle inventory.
- New stamp chat output is batched by default. After the default 19 second delay, the player receives one summary line with a short newest-first hover preview. The hover shows only a handful of recent unlocks and summarizes the rest as `and X more`; players can run `/passport recent` for the full paginated last batch, one stamp per line.
- Players can use `/passport batch <fast|normal|slow|off|reset>` to choose their own new-stamp batch behavior. Normal inherits `messages.new-stamp.batch.delay-seconds` unless `player-speeds.normal-seconds` is set above 0. Fast and slow default to 8 and 45 seconds. Off keeps stamp tracking active but hides that player's new-stamp batch summary chat. Reset/default returns the player to normal. The setting is saved in UUID playerdata and applies to pending or newly created batches.
- Players can use `/passport progress <on|off|toggle>` to opt in or out of complex-mode progress messages when `messages.progress.enabled` is enabled globally. The player preference defaults to on, but the global config remains the master switch.
- Paginated list commands show a clickable next-page command, including `/passport missing <type>`.
- `/passport missing <type>` keeps each row compact and puts per-entry conditions in hover text, such as random complex-mode counts, sustain-time requirements, or current in-progress counts.
- Passport progress defaults to `progress.simple-mode: true`, which keeps the original "first valid interaction stamps it" behavior. Set it to `false` for complex mode, where block/item/consume/tool/weapon/armor/kill/mount entries receive a per-player randomized count goal before the stamp completes, and explore activities use the complex min/max seconds range.
- Complex-mode in-progress entries are saved with `visits`, `goal`, and `completed`. They do not count toward missing/progress/top/stamp-credit totals until completed.
- Passport progress uses eligible entries. Blocks, items, and consumables default to a curated survival-realistic set that excludes admin-only or non-survival entries such as command blocks, test blocks, barriers, light blocks, debug sticks, structure blocks, structure voids, jigsaw blocks, spawners, portals, bedrock, budding amethyst, reinforced deepslate, petrified oak slabs, spawn eggs, and legacy materials.
- Any type can be restricted with `eligibility.<type>.whitelist`. If a whitelist is present, only those normalized ids count toward stamps, missing entries, and 100% progress.
- Any type can exclude specific entries with `eligibility.<type>.blacklist`. Blacklist entries win over automatic, curated, and whitelist eligibility, so they do not count toward stamps, missing entries, or 100% progress.
- `eligibility.global.blacklist` excludes entries from every passport type before per-type whitelists are checked. Use it for server-wide impossible or forbidden entries such as `bedrock`, `barrier`, command blocks, debug sticks, structure blocks, and test blocks.
- The item passport defaults to `exclude-specialized-types: true`, so tools, weapons, armor such as Elytra, and consumables such as bread do not also count as generic item progress. Add entries to `eligibility.<type>.blacklist` when you want extra manual exclusions, such as making Elytra count only as explore by blacklisting it from armor too.
- Material passport overlap defaults to `eligibility.material-overlap-mode: multiple`, so valid overlaps such as axe-as-tool and axe-as-weapon can both count. Set it to `unique` to force every material into the first eligible type from `eligibility.material-type-priority`. The default priority is `armor`, `weapon`, `tool`, `consume`, then `item`, so consumables win before the generic item passport.
- World ids are remembered in `worlds.yml`, so a world can still count toward progress after it is unloaded.
- `/passport stamps` converts completed passport categories into available stamp credits. A category contributes its eligible known-entry count only when it reaches 100%.
- `/passport stamps trade <box>` spends those generic credits on one-time reward boxes. The credits are not tied to the completed type: for example, completing Visit at `10/10` gives 10 credits that can help pay toward any box.
- By default, PassportDiscovery writes and loads one reward box per discovery type using `rewards.type-boxes.*` and `rewards.boxes.<type>`. Current ids are `world`, `warp`, `visit`, `biome`, `block`, `item`, `consume`, `tool`, `weapon`, `armor`, `kill`, `mount`, and `explore`. If the plugin later gains 50 discovery types, the default trade list grows with them.
- `rewards.type-boxes.cost-mode: eligible-stamps` makes generated box costs scale with each type's eligible stamp count. A large Block passport box is therefore much more expensive than a small Visit or World box.
- `rewards.type-boxes.default-cost` is used when a type has no known eligible entries yet, `cost-per-stamp` controls the scale, and `minimum-cost` prevents tiny categories from becoming free.
- Use `rewards.type-boxes.costs.<type>` for a per-type generated box exception, such as `rewards.type-boxes.costs.block: 2000`. Use `rewards.boxes.<id>` for extra custom boxes, or to override a generated type box with a custom display name, cost, permission, or commands.
- Older sample box ids `biomes`, `weapons`, `items`, and `explorer` are hidden by default with `rewards.legacy-sample-boxes.enabled: false`, so the tab list stays focused on one box per discovery type.
- Claimed boxes are stored in playerdata, so players cannot claim the same box again even if totals change later.
- `/passport admin inspect <player|uuid> [type]` can inspect online players or saved offline playerdata by last stored player name or UUID.
- `/passport top` uses `top.default-type`, which defaults to `all`. `/passport top all` scans saved playerdata, so offline players are included.

## Player Guide

`/passport info` explains the system in-game for regular players. It describes passports as a collection log, lists how each type earns stamps, points players at useful commands, and notes that rewards are not automatic yet. That gives us a clean place later to describe completion rewards such as title unlocks, cosmetic styles, event entries, or trade-in hooks.

Stamp collection is limited by config before any stamp is written:

- `collection.gametypes` is the allowlist. Gamemodes not listed do not collect stamps.
- `collection.vanish: false` means CMI vanished players do not collect stamps.
- `collection.god: false` means CMI god-mode players do not collect stamps.
- `collection.fly: false` means CMI `/fly`, temp fly, or survival allow-flight players do not collect stamps. Elytra gliding still counts as normal survival play.
- Players can still view their passport while collection is paused.

## Data

Shared long-lived playerdata:

```yaml
passportdiscovery:
  preferences:
    batch-speed: normal # fast, normal, slow, or off
    progress-messages: true
  types:
    biome:
      entries:
        minecraft:plains:
          name: Plains
          visits: 2
          first-seen: "2026-04-25T18:00:00Z"
          last-seen: "2026-04-25T18:15:00Z"
          source: move
```

Cache dumps:

```text
plugins/1MB-CMIAPI/PassportDiscovery/cache/passport-discovery-summary-<timestamp>.log
```

Observed warp index:

```text
plugins/1MB-CMIAPI/PassportDiscovery/warps.yml
```

## CMI, CMILib, And Paper Usage

PassportDiscovery depends on CMI and CMILib because it is part of the 1MB CMI-API plugin family and uses the shared library runtime next to CMI. It listens to CMI warp events for the `warp` type and uses CMI's warp manager only for lightweight known-warp lists in `/passport missing warp`.

Paper API usage includes player movement, world change, block break/place, item pickup, crafting, held item, item consume, cake block interaction, item damage, inventory click, Material metadata, and Paper's modern registry access for biomes.

## Security Notes

- Player input is limited to known subcommands, online player names, strict type ids, and sanitized entry ids.
- Admin reset requires explicit admin/reset permission.
- `/passport admin dump` writes to the feature cache folder only.
- The plugin does not execute console commands, move money, teleport players, or modify CMI data.

[Plugin index](README.md)
