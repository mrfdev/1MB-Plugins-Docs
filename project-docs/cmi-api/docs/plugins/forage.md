# Forage

Forage is a player-facing nature progression plugin for `/forage`. It is built for Paper 26.2+ and Java 25 and depends on CMI, CMILib, and `1MB-CMIAPI-Lib`.

Version 1 focuses on a testable core rather than the full long-term design. Players use curated PDC-marked Forage tools to earn Forage XP, Forage Points, skill branch progress, tool soul progress, daily, weekly, and monthly quest progress, leaderboard ranks, camp-only tool upgrades, camp turn-ins, and small treasure rolls from configured source families. Most v1 families are natural block routes, while Tier 2 sword and mace routes can also listen for configured entity kills. Normal tools still work as Minecraft tools, but they do not feed the Forage skill.

The long-term ideas, v2/v3 options, and shelved feature notes live in [forage-roadmap.md](forage-roadmap.md).

## Player Flow

Players open:

```text
/forage
```

The GUI uses the shared hardened GUI service with safe holders, cancelled clicks and drags, duplicate click protection, delayed close actions, and the global light-blue filler material. The v1 hub includes:

- tool shop
- player stats
- quest index with ready-to-claim, daily, weekly, and monthly pages
- skill branch picker
- read-only top boards for level, XP, points, actions, treasures, daily XP, and weekly XP
- tool/family explanation
- camp-only tool upgrades for held Forage tools, including tiers, supported diamond refinement, and controlled vanilla enchants
- camp-only Repair & Merge for worn Forage tools
- camp turn-ins for plain vanilla forage items
- multi-tier Forage Dust crafting and bounded growth pulses
- tree-grove camp validation with optional lantern requirements
- titled gameplay tips for camps, quests, branches, Repair & Merge, chunk exhaustion, turn-in rules, dust, and tool soul
- camp check with checklist, unlocks, and throttled ready feedback
- Getting Started first-run guide for camp setup, first tool, daily limits, quests, and tips
- personal `/forage limits` overview for daily caps, family route caps, economy costs, and quest reward ranges
- CMI ctext guide button through the configured `gui.info-command`
- `/menu` return button

Outside the hub, v1 now treats the camp as the main activity anchor. `/forage guide`, `/forage status`, `/forage limits`, `/forage stats`, and `/forage camp` remain available away from a camp, but `/forage shop`, quests, branches, tips, leaderboards, tools, turn-in actions, upgrades, Repair & Merge, and Forage Dust require a complete nearby Forage camp.

If a player runs one of those camp-only command shortcuts while they are away from camp, Forage now stops the command immediately and tells them to travel back to their camp or sneak-right-click their camp anchor first. If an anchor is nearby but the build is incomplete, the plugin prints the missing checklist and opens the camp page. If the camp is ready, sneak-right-clicking the anchor opens the main Forage hub.

Camp anchors are now player-locked. The first player to really use an unclaimed configured camp anchor claims that anchor, and other players cannot use that camp's anchor or camp-only shortcuts from it. They are told that the camp belongs to someone else and must travel to or build their own camp.

Admins can manage those camp claims without editing `camps.yml` directly. `/forage admin camps list` shows claimed anchors, `/forage admin camps inspect <player|key>` reviews owners and locations, `/forage admin camps release <key|near>` clears a claim, `/forage admin camps reassign <key|near> <player>` changes ownership, and `/forage admin camps move <key|near>` lets an in-game admin move a claim to the nearest configured anchor. These commands only change claim data; they do not place or break blocks.

`config.yml` also includes a top-level `enabled` toggle. When it is set to `false`, Forage becomes a player-facing emergency shutdown: normal gameplay progress stops, camp turn-ins and dust do nothing, player GUIs stop opening, and `/menu` hides the Forage button when Menu notices the toggle on the next open. Help, info, debug, and safe admin inspection/reload commands still work so staff can investigate and recover.

Forage now separates player progression XP from tool soul XP. Player XP and Forage Points are tuned for account progression, while tool XP is tuned for tool upgrades and soul growth. This lets staff slow down live upgrades without making repairs or basic participation feel punishing.

Forage only awards progress when:

- the plugin is enabled
- the player is in an allowed world
- the player breaks a configured source block or kills a configured source entity
- the player is holding the matching PDC-marked Forage tool
- the daily cap has not been reached
- the matching source-family daily cap has not been reached
- the chunk/source family is not exhausted
- the WorldGuard global-only check passes when WorldGuard is installed and enabled

The global daily cap limits one player's total Forage progress for the day. The source-family daily caps are separate: if shears/leaves are capped, a player can switch to a shovel, axe, sickle, pickaxe, brush, sword, or mace route and keep playing until those families also cap. This encourages variety without making one exhausted route feel like the whole feature is over for the day.

When a chunk/source family becomes exhausted, Forage both records the event in the batched recent summary and sends a short immediate warning so players do not keep wasting actions in the same area.

When daily caps or chunk exhaustion pause reward progress, the curated tool still keeps its own use count and durability state updated. XP, points, branch progress, and quests pause, but the tool does not pretend it was never used.

## V1 Tools

Default tools are:

| Tool | Material | Source Families | Default Unlock |
| --- | --- | --- | --- |
| Forage Sickle | `COPPER_HOE` | flora, crops, mushrooms | starter |
| Forage Axe | `COPPER_AXE` | logs, fruits | starter |
| Forage Trowel | `COPPER_SHOVEL` | moss | starter |
| Forage Shears | `SHEARS` | leaves | starter |
| Forage Pickaxe | `COPPER_PICKAXE` | stone, cave | any Forage tool level 2 |
| Forage Brush | `BRUSH` | relics, sands | any Forage tool level 2 |
| Forage Sword | `COPPER_SWORD` | creature_drops | any Forage tool level 2 |
| Forage Mace | `MACE` | danger_drops | any Forage tool level 2 |

Default family ownership is intentionally non-overlapping: one source family belongs to one matching tool. For example, logs and pumpkins belong to the axe, leaves belong to shears, moss belongs to the trowel, cave/stone finds belong to the pickaxe, dry/relic finds belong to the brush, gentle creature drops belong to the sword, and danger drops belong to the mace. This keeps players from buying multiple tools to farm the same source family.

Sword and mace Forage progress is entity-based. The sword listens to configured gentle creature entities such as cows, sheep, chickens, squids, rabbits, and turtles. The mace listens to configured danger entities such as shulkers, blazes, breezes, wither skeletons, ghasts, and phantoms. The plugin records a short-lived matching-tool melee hit and only awards progress if that same player is still holding the same curated tool when the entity dies. The plugin does not register fragile custom enchants or rewrite vanilla loot tables for those routes; it awards Forage XP/points/treasure rolls when the matching curated tool is used for a configured entity source.

Tools are PDC-marked with schema, tool id, tier, tool XP, tool level, and use count. Lore includes a fake Foraging level, tool soul progress bar, short tool personality line, supported families, and a warning that the tool is curated.

Forage tools are blocked from outside anvil, enchanting table, grindstone, smithing table, Mending repairs, and configured repair/enchant command prefixes such as `/cmi anvil`, `/repair`, `/fix`, and `/cmi enchant`. The same configured prefixes can also be blocked when they are dispatched by console and target an online player carrying a Forage tool, which protects menu/shop buttons that run CMI repair-style commands. Plugin-owned upgrades may still apply controlled vanilla improvements from the Forage upgrade GUI.

Forage tools can also freeze themselves at a low configured durability floor instead of breaking. By default they safety-lock at 5 durability remaining, stop working for block/tool actions, and must be restored through `/forage camp` -> Repair & Merge.

To reduce sneaky external repair routes, each curated tool also stores its last legitimate durability state in PDC. Periodic inventory audits and live tool checks restore that tracked durability if an outside command, GUI, Mending tick, or console-dispatched repair action tries to heal the tool without using Forage's own repair flow.

Forage tools can be upgraded through `/forage camp` -> Upgrade Tool:

- the player must stand near a complete Forage camp when `tools.upgrade.requires-complete-camp` is enabled
- the main hand must hold the Forage tool to upgrade
- the next tier must be within `tools.max-tier`
- default tier progression is intentionally slow for live play: tier II needs level 12, `$25,000`, and `750` Forage Points, while tier III needs level 24, `$60,000`, and `2,000` Forage Points
- the player must meet the configured Forage level milestone
- the player pays configured Forage Points and CMI/Vault money
- the upgrade keeps existing tool XP, tool level, uses, and durability
- higher tiers increase valid Forage XP rewards by 25% per tier above tier I

The same upgrade page also offers controlled improvements:

- supported copper or lower tools can refine to diamond material when the player meets the configured Forage level, held-tool level, money, and point costs
- sword, axe, pickaxe, shovel, and hoe-style tools can refine to the matching diamond variant where Minecraft provides one
- shears, brushes, and maces have no diamond variant, so they stay on their native materials
- compatible tools can receive plugin-owned Unbreaking I-III and Efficiency I-III, controlled by `tools.enchants.*`
- real vanilla enchants added by Forage are shown on the item, while outside enchant routes remain blocked
- all improvement confirmations re-read the main-hand tool and refund costs if the item changed

Forage tools can be repaired only through `/forage camp` -> Repair & Merge:

- the player must stand near a complete Forage camp
- the main hand must hold the Forage tool to keep
- the offhand must hold a matching Forage tool type to consume, such as shears with shears
- one PDC-marked Forage treasure item is consumed
- the player pays configured Forage Points and CMI/Vault money
- the repair restores a configured durability percentage, capped by the player's Forage level
- a configured percentage of the offhand donor tool XP is transferred into the main-hand tool
- default repair tuning now restores up to 40% per merge, caps low-level repairs at 70%, and uses lower CMI/Vault money costs than the first test pass

## Skill Branches

Players can use `/forage branches` to choose an early Forage identity path. Branches are intentionally small focused bonuses, not a full skill tree yet. A branch only applies when the player earns valid Forage progress from one of that branch's configured source families.

Default branches:

| Branch | Focus | Default gate |
| --- | --- | --- |
| Herbalist | flora and crops | level 1 |
| Woodsman | logs, leaves, and fruits | level 1 |
| Trailkeeper | dry finds, fruits, and flora | level 1 |
| Cave Botanist | cave growth, moss, and mushrooms | level 3 |
| Wild Alchemist | moss, crops, mushrooms, flora, and cave growth | level 5 |

Each branch can configure display name, description, icon, focused source families, XP multiplier, flat Forage point bonus, treasure chance multiplier, and required Forage level. The first branch choice is free. Switching branches can be enabled or disabled, and can require a cooldown plus a Forage Points cost. Profile data tracks the current branch, last branch change time, and per-branch XP, action, and treasure history.

## Camp Turn-Ins

Players can use `/forage compost` or the Camp Turn-Ins button from a complete Forage camp. The turn-in does not open an escrow inventory. It safely scans the player's inventory, builds a plan, asks for confirmation, then re-scans and consumes only the planned slots if they still match.

By default, camp turn-ins:

- require a complete nearby Forage camp
- accept only plain vanilla item stacks with no custom name, lore, enchantments, PDC, custom model data, or other item meta
- reject Forage tools and PDC-marked Forage treasures
- accept configured organic source families such as flora, crops, mushrooms, leaves, fruits, and moss
- reward reduced Forage XP and Forage Points compared to breaking blocks with a curated tool
- respect the daily Forage XP cap
- use a short cooldown to avoid duplicate clicks

## Forage Dust

Players can use `/forage dust` or the Forage Dust button from the hub/camp GUI to make PDC-marked pulse dust. The default camp trade now makes a standard batch, a second camp trade makes a stronger greater batch that also consumes Forage treasure items, and a very rare legendary pulse dust can appear from treasure rolls instead of a normal treasure item.

By default, Forage Dust:

- requires a complete nearby Forage camp
- costs CMI/Vault money, Forage Points, and plain vanilla `BONE_MEAL`
- offers a standard batch that makes 8 dust with a radius-3 pulse
- offers a greater batch that makes 4 dust with a radius-6 pulse and consumes 2 PDC-marked Forage treasure items
- can very rarely drop a legendary treasure-only pulse dust with a radius-12 pulse
- rejects custom bonemeal with names, lore, PDC, or other item meta
- creates PDC-marked dust with a short lore warning that it does not award Forage XP
- stores pulse radius and max-grown-block settings directly on each dust item through PDC, so old and new dust variants can coexist safely
- uses one dust per right-click growth pulse
- only works in allowed worlds and WorldGuard global-only areas
- pulses only configured growable materials inside a small clamped radius
- respects a per-player cooldown
- does not award Forage XP or points, so it cannot become a bonemeal-to-Forage loop

## Camp Feedback

`/forage camp` gives a clearer camp status, while sneak-right-clicking the configured camp anchor now opens the main Forage hub when the camp is ready. If the build is incomplete, the plugin still shows the checklist camp view so players can see what is missing. The camp GUI separates the checklist, unlocks, turn-in action, tool upgrades, and Repair & Merge action so players can understand what the camp is for and what is still missing.

Camp validation can require the configured camp anchor block, a campfire, barrel, crafting table, logs, leaves or canopy blocks, wool for a tent/bedroll feel, and a nearby tree-grove shape. `/forage camp` first looks for the configured camp anchor near the player and then scans the camp around that anchor, so standing on the edge of a camp is less likely to miss nearby workstations. The tree-grove check is still cheap: it looks for a trunk-like block with leaves, Nether wart canopy, warped wart canopy, or mushroom cap blocks nearby. `camp.require-lantern` is available for stricter camps, but defaults off so existing test camps do not all need a lantern immediately.

When a player validates a complete camp, Forage can show a short ready message and play the configured camp sound/particle effect. This is throttled by player and camp chunk through `camp.ready-feedback.cooldown-seconds`, so repeated sneak-clicks do not spam chat. Ready camps unlock camp-only tool upgrades, Repair & Merge, camp turn-ins, Forage Dust, and tree-grove validation.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/forage` | player | Opens the Forage hub GUI. |
| `/forage info` | anyone | Shows a player-friendly intro and public docs link. |
| `/forage help` | anyone | Shows commands available to the sender. |
| `/forage guide` | player/console | Opens the first-run guide for camp setup, first tool, limits, quests, and tips. Console prints the same starter flow. |
| `/forage status` | player | Prints a compact progress summary with player XP, tool XP, caps, camp state, quest hint, upgrade hint, and next step. |
| `/forage limits` | player/console | Shows personal daily caps, family caps, money/point context, tool costs, repair cost, and quest reward ranges. Console prints the admin balance report. |
| `/forage shop` | player | Opens the curated tool shop from a complete nearby camp. |
| `/forage stats` | player | Shows level, XP, points, caps, totals, and held tool details. |
| `/forage quests` | player | Opens a quest index with Ready To Claim, Daily, Weekly, and Monthly Forage pages from `quests.yml`, showing claimed, claimable, and in-progress tasks at a ready camp. |
| `/forage branches [branch]` | player | Opens the branch picker or selects a configured Forage skill branch at a ready camp. |
| `/forage top [level\|xp\|points\|actions\|treasures\|daily\|weekly]` | player/console | Shows read-only Forage leaderboards from saved profile data. Player use requires a ready camp. |
| `/forage recent [page]` | player | Shows details from the latest batched Forage progress message at a ready camp. |
| `/forage tips` | anyone | Prints current Forage gameplay hints. Player use requires a ready camp. |
| `/forage tools` | player | Opens the Forage tools GUI with tool family and source information at a ready camp. Clicking a tool prints a short source-family guide in chat. |
| `/forage camp` | player | Checks whether the nearby camp requirements are met. |
| `/forage compost` | player | Opens camp turn-ins near a complete Forage camp. |
| `/forage dust` | player | Makes PDC-marked Forage Dust near a complete camp and explains growth pulses. |
| `/forage admin give <player> <tool> [tier]` | admin/console | Gives a PDC-marked Forage tool. |
| `/forage admin inspect <player>` | admin/console | Shows saved profile data, caps, quests, nearby camp state, and held item identity. |
| `/forage admin inspectitem [player] [main\|offhand\|boots\|leggings\|chestplate\|helmet]` | admin/console | Shows PDC, tool XP/level, durability, repair guard, and enchant diagnostics for one carried item. |
| `/forage admin xp <player> <amount>` | admin/console | Adds or removes saved Forage profile XP for testing. |
| `/forage admin level <player> <level>` | admin/console | Sets a player's saved Forage profile level by moving profile XP to that level floor. |
| `/forage admin points <player> <amount>` | admin/console | Adds or removes saved Forage points for testing. |
| `/forage admin toollevel <player> <level>` | admin/console | Sets the held Forage tool level for testing upgrade flows. |
| `/forage admin resetcap <player>` | admin/console | Clears today's daily XP/action cap progress for testing. |
| `/forage admin balance` | admin/console | Shows the active balance preset, multipliers, caps, source-family caps, tool price range, sample upgrade/improvement costs, repair sample cost, and quest reward ranges. |
| `/forage admin livecheck` | admin/console | Shows the owner checklist for moving Forage from testing to live balance, including active preset, safety switches, caps, repair costs, and upgrade costs. |
| `/forage admin check` | admin/console | Runs a colored config sanity report for `config.yml` and `quests.yml`, including YAML type drift, invalid materials/entities, source/tool/branch references, quest roll ranges, reward command prefixes, economy hook state, and live-readiness warnings. |
| `/forage admin export [backup]` | admin/console | Saves current Forage data and writes a Discord-friendly Markdown export with profiles, caps, camps, chunk exhaustion, quest summaries, runtime counters, and top boards. Add `backup` to also copy raw Forage YAML files. |
| `/forage admin camps list [page]` | admin/console | Lists claimed Forage camp anchors. |
| `/forage admin camps near` | admin | Inspects the nearest configured camp anchor from the admin's location. |
| `/forage admin camps inspect <player\|key>` | admin/console | Shows camp claims by owner name/UUID or exact camp key. |
| `/forage admin camps release <key\|near>` | admin/console | Removes one camp anchor claim without editing world blocks. |
| `/forage admin camps reassign <key\|near> <player>` | admin/console | Changes one camp anchor owner. |
| `/forage admin camps move <key\|near>` | admin | Moves one existing claim to the nearest configured anchor at the admin's location. |
| `/forage admin chunks` | admin/console | Shows chunk exhaustion runtime counts. |
| `/forage admin reload` | admin/console | Reloads config and saved data. |
| `/forage admin save` | admin/console | Saves profiles and chunk state. |
| `/forage debug tool [player]` | admin/console | Shows PDC data for the held Forage tool. |
| `/forage debug all` | admin/console | Uses the shared debug output for build, server, hooks, commands, permissions, placeholders, and config. |

## Permissions

Player defaults:

```text
onembcmi.forage.use
onembcmi.forage.shop
onembcmi.forage.stats
onembcmi.forage.camp
```

Admin defaults are false:

```text
onembcmi.forage.admin
onembcmi.forage.give
onembcmi.forage.inspect
onembcmi.forage.reload
onembcmi.forage.debug
```

`onembcmi.forage.admin` includes the admin child permissions and the new testing helpers, but operator status alone does not receive it from plugin.yml defaults.

## Storage

V1 stores runtime data under:

```text
plugins/1MB-CMIAPI/Forage/data/profiles.yml
plugins/1MB-CMIAPI/Forage/data/chunks.yml
```

V1 also creates a separate quest definition file:

```text
plugins/1MB-CMIAPI/Forage/quests.yml
```

`profiles.yml` stores player level, XP, points, actions, treasure count, purchases, current branch id, branch change time, per-branch XP/actions/treasures, global daily caps, per-source-family daily caps, quest progress, quest claim state, and last action. `/forage top` reads this saved profile data in memory; it does not write separate leaderboard snapshots. `chunks.yml` stores active chunk exhaustion cooldowns. Runtime turn-in and dust/growth counters are exposed for debug/placeholders, but individual turn-ins and dust uses are not stored as permanent history in v1. This keeps v1 self-contained while the roadmap keeps SQLite as a later storage-hardening discussion item if the feature grows large enough to need it.

`/forage admin export` saves current memory state and writes a timestamped Markdown report under `plugins/1MB-CMIAPI/Forage/data/exports/`. The report summarizes profile totals, top boards, camps, chunk exhaustion, quest definition and claim counts, active balance/cap settings, and live runtime counters such as tool purchases, compost turn-ins, dust crafts, and growth pulses. `/forage admin export backup` also copies the raw `profiles.yml`, `chunks.yml`, `camps.yml`, `config.yml`, and `quests.yml` files into a timestamped backup folder. The export command stays available while the global Forage switch is disabled so the owner can snapshot data before emergency config edits.

Camp ownership is stored separately in:

```text
plugins/1MB-CMIAPI/Forage/data/camps.yml
```

Each claimed anchor stores the owner UUID, cached owner name, and claim time so camp-only access can stay tied to that specific anchor location.

## Config Highlights

`config.yml` and `quests.yml` are comment-preserving and add missing defaults safely through the shared library.

Important sections:

- `enabled`: global emergency switch for all player-facing Forage actions
- `onboarding.*`: first-run `/forage guide` flow and hub button
- `worlds.allowed`: exact world allow-list
- `economy.*`: CMI-backed Vault shop integration
- `balance.preset` and `balance.presets.*`: `testing`, `normal`, `live`, `grindy`, or custom balance multipliers for earned player XP, tool XP, points, quest rewards, caps, tier bonuses, upgrade costs, repair costs, and improvement costs
- `progression.*`: level formula, daily XP/action caps, and progress message frequency
- `progression.family-daily.*`: per-source-family daily XP/action caps, so one capped tool route does not stop all Forage play for the day
- `messages.batch.*`: delayed batched progress summaries and `/forage recent` limits
- `quests.enabled`, `quests.claims.*`, `quests.progress-message-every`, `quests.allowed-command-prefixes`: quest runtime controls in `config.yml`
- `quests.yml`: daily, weekly, and monthly task definitions, min/max randomized targets, min/max point/XP/money rewards, and reward commands
- `branches.*`: branch ids, display names, icons, focused source families, level gates, switch cooldown/costs, and small branch bonuses
- `tools.*`: tool ids, materials, prices, unlock gates, family coverage, tool soul settings, modification guards, tier upgrades, diamond refinement, controlled Unbreaking/Efficiency improvements, and Repair & Merge costs/caps
- `sources.*.materials` and `sources.*.entities`: block-material and entity-type source definitions used by the matching curated tools
- `tools.low-durability-lock.*`: safety-lock rules that stop curated tools before they break
- `tools.durability-audit-seconds`: how often online inventories are scanned for unexpected external repairs
- `sources.*`: source-family XP, point value, and material lists
- `chunk-exhaustion.*`: v1 anti-grind cooldowns by chunk and source family
- `protection.worldguard.*`: conservative global-only region check when WorldGuard is installed
- `camp.*`: configurable camp anchor, anchor search radius, camp scan radius, wool tent/bedroll count, nearby block requirements, and ready feedback
- `camp.require-tree`: requires a trunk/canopy tree-grove shape near the camp
- `camp.require-lantern` and `camp.required-lantern-count`: optional camp ambience requirement
- `camp.turnins.*`: complete-camp requirement, accepted source families, item cap, reward scaling, cooldown, and daily-cap behavior
- `growth.*`: bounded Forage Dust growth pulses, cooldown, legacy fallback radius/max blocks, and allowed target materials
- `growth.dust.*`: standard dust item material/name/glint, batch amount, stored radius/max blocks, complete-camp requirement, money cost, point cost, and bonemeal cost
- `growth.dust.greater.*`: second stronger camp dust trade with its own amount, radius, max blocks, costs, and treasure requirement
- `treasures.*`: simple v1 treasure chance, vanilla material list, optional PDC/lore treasure markers, and rare legendary pulse dust replacement rolls
- `effects.*`: sounds and particles
- `gui.tip-line-max-chars`: approximate maximum lore line length in the tips GUI
- `tips.entries.<id>.title` and `tips.entries.<id>.text`: titled tip cards shown in the tips GUI and chat output
- `tips.lines`: legacy extra tip lines that are still appended for backward compatibility when they are not duplicates; they now auto-title from their text, and can optionally use `Title :: text`

### Live balance preset

Forage ships with `testing`, `normal`, `live`, and `grindy` presets. `testing` is intentionally fast for short test-server passes. `normal` is the default tuning profile. `live` is the suggested pre-launch preset for the public server: it slows player XP, tool XP, points, and quest rewards, raises upgrade costs, keeps family caps practical, and keeps Repair & Merge more affordable so players are encouraged to use their tools instead of hoarding them.

To switch after testing:

```yaml
balance:
  preset: live
```

Then run `/forage admin reload`, `/forage admin check`, `/forage admin livecheck`, and `/forage admin balance`. The config sanity check and live checklist are read-only and still work while the global `enabled` switch is false, so the owner can review YAML types, config references, live readiness, and balance tuning during an emergency toggle or before reopening the feature.

### Config sanity check

`/forage admin check` is the owner-facing preflight report for Forage config files. It checks managed default type drift, known Paper material names, entity type names, active balance preset values, enabled source family definitions, tool-to-family references, branch-to-family references, quest target/reward ranges, quest reward command safety prefixes, economy hook state, growth dust values, camp anchor material, low-durability protection, external repair command guards, and WorldGuard launch settings.

The report uses soft green `ok:`, gold `warn:`, and pastel red `error:` labels. Errors mean a setting can break or silently change behavior, such as an invalid material or a tool pointing at a disabled source family. Warnings mean the setting is valid but should be reviewed before live, such as running on a testing preset or using broad command prefixes. Each finding includes what was wrong, what was expected, and a suggested fix.

## Placeholders

The shared placeholder bridge advertises these Forage placeholders:

```text
%onembcmi_forage.enabled%
%onembcmi_forage.player.level%
%onembcmi_forage.player.xp%
%onembcmi_forage.player.xp_formatted%
%onembcmi_forage.player.points%
%onembcmi_forage.player.actions%
%onembcmi_forage.player.treasures%
%onembcmi_forage.player.today.xp%
%onembcmi_forage.player.today.actions%
%onembcmi_forage.player.today.xp_remaining%
%onembcmi_forage.player.today.actions_remaining%
%onembcmi_forage.player.today.xp_percent%
%onembcmi_forage.player.today.actions_percent%
%onembcmi_forage.player.daily_xp_cap%
%onembcmi_forage.player.daily_action_cap%
%onembcmi_forage.balance.preset%
%onembcmi_forage.player.camp.ready%
%onembcmi_forage.player.camp.anchor%
%onembcmi_forage.player.camp.owner%
%onembcmi_forage.player.camp.missing_count%
%onembcmi_forage.player.tool.id%
%onembcmi_forage.player.tool.name%
%onembcmi_forage.player.tool.tier%
%onembcmi_forage.player.tool.level%
%onembcmi_forage.player.tool.xp%
%onembcmi_forage.player.tool.uses%
%onembcmi_forage.player.tool.durability%
%onembcmi_forage.player.tool.durability_percent%
%onembcmi_forage.player.tool.locked%
%onembcmi_forage.player.branch.id%
%onembcmi_forage.player.branch.name%
%onembcmi_forage.player.branch.xp%
%onembcmi_forage.player.branch.actions%
%onembcmi_forage.player.branch.treasures%
%onembcmi_forage.player.family.<id>.xp%
%onembcmi_forage.player.family.<id>.actions%
%onembcmi_forage.player.family.<id>.xp_remaining%
%onembcmi_forage.player.family.<id>.actions_remaining%
%onembcmi_forage.player.family.<id>.capped%
%onembcmi_forage.player.quests.daily.completed%
%onembcmi_forage.player.quests.daily.claimable%
%onembcmi_forage.player.quests.weekly.completed%
%onembcmi_forage.player.quests.weekly.claimable%
%onembcmi_forage.player.quests.monthly.completed%
%onembcmi_forage.player.quests.monthly.claimable%
%onembcmi_forage.player.quest.next.name%
%onembcmi_forage.player.quest.next.progress%
%onembcmi_forage.player.quest.next.target%
%onembcmi_forage.player.quest.next.remaining%
%onembcmi_forage.player.quest.next.claimable%
%onembcmi_forage.player.quest.daily.<id>.progress%
%onembcmi_forage.player.quest.daily.<id>.target%
%onembcmi_forage.player.quest.daily.<id>.claimable%
%onembcmi_forage.player.quest.weekly.<id>.progress%
%onembcmi_forage.player.quest.weekly.<id>.target%
%onembcmi_forage.player.quest.weekly.<id>.claimable%
%onembcmi_forage.player.quest.monthly.<id>.progress%
%onembcmi_forage.player.quest.monthly.<id>.target%
%onembcmi_forage.player.quest.monthly.<id>.claimable%
%onembcmi_forage.player.rank.level%
%onembcmi_forage.player.rank.points%
%onembcmi_forage.player.rank.daily%
%onembcmi_forage.player.rank.weekly%
%onembcmi_forage.top.<board>.<rank>.name%
%onembcmi_forage.top.<board>.<rank>.value%
%onembcmi_forage.runtime.earned_actions%
%onembcmi_forage.runtime.exhausted_actions%
%onembcmi_forage.runtime.treasures%
%onembcmi_forage.runtime.compost_turnins%
%onembcmi_forage.runtime.compost_items%
%onembcmi_forage.runtime.dust_crafts%
%onembcmi_forage.runtime.growth_pulses%
%onembcmi_forage.runtime.growth_blocks%
%onembcmi_forage.runtime.tracked_chunks%
%onembcmi_forage.runtime.exhausted_chunks%
```

These are enough for holograms and ajLeaderboards around the Forage camp/NPC area. Player tool and camp placeholders are online-player scoped because they inspect the player's current held item and nearby camp. Leaderboard board ids are `level`, `xp`, `points`, `actions`, `treasures`, `daily`, and `weekly`.

## Safety Notes

- No RCON support is used or expected.
- Player text input is not accepted in v1, so command injection risk is limited to admin-controlled config command hooks.
- The CMI ctext guide command only allows the safe `cmi ctext` prefix.
- Treasure delivery, quest claims, tool purchases, branch selection, tool improvements, Repair & Merge, compost turn-ins, and Forage Dust purchases use durable idempotent receipts. Exact changed items and inventory slots remain in payload escrow until money/points/profile state and delivery are finalized; unresolved operations are listed by `/forage debug transactions`.
- Tool upgrades and improvements do not open an escrow inventory. They re-read the held main-hand Forage tool at confirmation time, withdraw configured costs, mutate only the trusted PDC-marked item, and refund costs if the item changed.
- Branch selection uses only configured ids, revalidates level/cooldown/point costs after GUI confirmation, and stores only sanitized branch ids.
- Repair & Merge does not open an escrow inventory. It reads the main hand, offhand, and inventory treasure marker at confirmation time, then re-validates before changing items.
- Curated tool durability is tracked in PDC. If an outside command, GUI, Mending tick, or targeted console repair command repairs a Forage tool without going through Repair & Merge, the plugin restores the last legitimate durability state on the next live check or audit pass.
- Camp turn-ins do not open an escrow inventory. They scan plain vanilla inventory stacks, confirm the plan, revalidate each slot, and only then consume items.
- Forage Dust does not open an escrow inventory. It checks camp state, money, Forage Points, plain vanilla bonemeal, required treasure items for greater dust, and inventory space at confirmation time before creating PDC-marked dust.
- Forage Dust growth pulses are bounded by configured allowed materials, the radius and max block count stored on the dust item, shared cooldown, allowed worlds, and WorldGuard checks. Dust does not award Forage XP or points.
- Camp tree-grove validation only scans the existing small camp radius and does not edit blocks or track persistence.
- WorldGuard is optional and checked by reflection so the jar can load without a compile-time WorldGuard dependency.
- Chunk exhaustion is intentionally conservative and cheap: it tracks chunk, source family, action count, and cooldown.
- Player-placed block provenance tracking is not part of v1 and remains a live-readiness discussion item.

## Future Direction

Forage is expected to grow gradually after test feedback:

- richer Forage Camps
- stricter or themed camp validation profiles
- richer turn-in recipes and camp progression
- richer skill trees built on the v1 branch identity system
- higher-tier tool upgrades and unlock variants
- richer Forage Growth recipes and dust variants
- biome-specific rare herbs
- seasonal/event profiles
- derbies and community milestones
- museum/herbarium systems
- optional storage hardening if YAML becomes too small for live scale
