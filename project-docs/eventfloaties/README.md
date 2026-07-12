# 1MB EventFloaties

Standalone Paper plugin for the summer floatie event.

Players earn a floatie token, build the matching floatie at their base/island/wilderness area, stand on the inspection tile marker, and run `/floatie`. The plugin scans only the small area around that player, tries registered blueprints in 0/90/180/270 degree rotations, gives progress feedback, and rewards only a 100% match.

This is intentionally command-triggered. It does not passively scan chunks or run world-wide checks.

Tokens are proof that the player earned that floatie. They are not consumed on completion, so players can keep or trade them later.

When the event is live, a completed build origin can only be claimed once by one player for that floatie id. This prevents another player from standing on the same inspection tile and claiming the same completed build.

## Documentation

- [Player guide](docs/player-guide.md)
- [Commands](docs/commands.md)
- [Permissions](docs/permissions.md)
- [Placeholders](docs/placeholders.md)
- [Configuration](docs/configuration.md)
- [Installation](docs/installation.md)
- [Integrations](docs/integrations.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Pre-live checklist](docs/pre-live-checklist.md)
- [Floatie book text](docs/floatie-book-text.md)

Canonical public docs URL:

```text
https://docs.1moreblock.com/custom-server-plugins/eventfloaties/
```

## Build

Requirements:

- Java 25
- Gradle
- PaperMC runtime target `26.1.2`

Compile:

```bash
gradle build
```

The build also runs small Java self-tests:

- `matchingRulesSelfTest` guards SMART matching for waterlogged block data and connection-sensitive blocks such as glass panes, fences, walls, and iron bars.
- `captureIgnoreRulesSelfTest` guards blueprint capture ignore behavior for admin helper blocks such as `BARRIER`, `SMOOTH_QUARTZ`, and `DIAMOND_BLOCK`.
- `blueprintBoundsSelfTest` reports tracked blueprint dimensions and fails if a current repo blueprint exceeds the expected 16x16x16 event footprint.
- `infoCommandDocsSelfTest` guards the `/floatie info` command and canonical docs metadata.

Compiled jar:

```text
build/libs/EventFloaties-v0.1.0-j25-paper-26.1.2.jar
```

## Installation

1. Build the jar with `gradle build`.
2. Put the jar in the server `plugins/` folder.
3. Start or restart the server.
4. Edit `plugins/EventFloaties/config.yml`.
5. Run `/floatie reload` or restart after config changes.

The default config starts with `event.live: false`. This is intentional for quiet setup/testing. Set it to `true` only when players should be able to claim rewards.

For this workspace's local test server, the jar can be copied to:

```text
servers/Paper-26.1.2/plugins/EventFloaties.jar
```

The `servers/` folder is intentionally ignored by git.

Use [`docs/pre-live-checklist.md`](docs/pre-live-checklist.md) for the final event setup checks before players are allowed to claim rewards.

## Player Instructions

Use these instructions in the floatie box book, quest text, or `/floatie help` style event notes. Keep the inspection tile wording visible; it is the part that makes player checks predictable.

Short version:

```text
1. Earn a Summer Floatie Token from the event.
2. The token tells you which floatie to build.
3. Build that floatie exactly at your base or island.
4. Include the inspection tile marker from the guide.
5. Stand on the inspection tile and run /floatie.
6. If it says 100%, you get the floatie reward.
7. Build every floatie to earn the final summer reward box.
```

Suggested book text:

```text
You earned a Summer Floatie Token!

This token tells you which floatie to build. Build it exactly at your base or island before the summer event ends.

Every floatie has an inspection tile marker. It is part of the build. Place it where the guide shows it, stand on it, and run /floatie.

If the summer spirit says your build is not done yet, keep adjusting it and try again later. If auto-detect picks the wrong floatie, run /floatie check <id>.

At 100%, you get a small reward. Complete every floatie to earn the final summer reward box.

Your token is not consumed. Keep it safe.
```

The longer page-by-page book template lives in [`docs/floatie-book-text.md`](docs/floatie-book-text.md). Use that file as the source for the actual floatie box books so event instructions stay consistent.

Inspection tile defaults:

- `LIGHT_BLUE_STAINED_GLASS` means a water floatie. The tile needs nearby water.
- `CUT_SANDSTONE` means a beach floatie. The tile needs nearby sand.

Players should build their own copy. A floatie that was already claimed by another player at the same inspection tile cannot be claimed again.

## Player Commands

- `/floatie info` - show plugin info, useful starting commands, version, and docs link.
- `/floatie` - check the floatie near you.
- `/floatie check [id]` - check a specific floatie, or all floaties you have tokens for.
- `/floatie progress` - show how many floaties you have completed.
- `/floatie help` - show command help.

`/floatie <id>` is intentionally not supported. Use `/floatie` for auto-detect and `/floatie check <id>` only as the manual backup.

If a player has already completed every registered floatie, `/floatie` skips scanning and behaves like `/floatie progress`.

Examples:

```text
/floatie info
/floatie
/floatie check duck
/floatie progress
```

## Admin Commands

- `/floatie reload` - reload config, blueprints, and player progress data.
- `/floatie admin pos1` - set first blueprint selection corner from the block you are looking at.
- `/floatie admin pos2` - set second blueprint selection corner.
- `/floatie admin origin` - set the blueprint anchor/origin.
- `/floatie admin save <id> [display name]` - save selected non-ignored blocks as a blueprint.
- `/floatie admin list [page]` - list registered blueprints, six per page.
- `/floatie admin give <player> <id> [amount]` - give a secure floatie token.
- `/floatie admin progress <player>` - show a player's completed and missing floaties.
- `/floatie admin debug [id]` - scan nearby floaties without token, cooldown, claim, or reward.
- `/floatie admin status` - show live readiness settings, loaded blueprint count, scanner settings, disabled worlds, reward command counts, and expected kit names.
- `/floatie admin reset <player> <id|all>` - reset test progress.
- `/floatie admin delete <id>` - delete a blueprint.

Examples:

```text
/floatie admin pos1
/floatie admin pos2
/floatie admin origin
/floatie admin save swan Swan
/floatie admin give mrfloris swan
/floatie admin progress mrfloris
/floatie admin debug swan
/floatie admin status
```

## Permissions

- `eventfloaties.use` - use player commands.
- `eventfloaties.admin` - setup, debug, list, reload, give, reset, delete, and bypass cooldowns/tokens.
- `eventfloaties.bypass-token` - check floaties without owning the matching token.

## PlaceholderAPI

If PlaceholderAPI is installed, this plugin registers placeholders under `summer_floaties`.

- `%summer_floaties_completed%`
- `%summer_floaties_total%`
- `%summer_floaties_remaining%`
- `%summer_floaties_percent%`
- `%summer_floaties_completed_<id>%`
- `%summer_floaties_has_token_<id>%`

Examples:

```text
%summer_floaties_completed%
%summer_floaties_completed_swan%
%summer_floaties_has_token_duck%
```

`has_token_<id>` only works for online players because the token is checked in the live inventory.

## Admin Setup Workflow

Build the floatie once in a private admin/test area.

1. Add an inspection tile next to or under the floatie.
2. Look at one corner and run `/floatie admin pos1`.
3. Look at the opposite corner and run `/floatie admin pos2`.
4. Look at the inspection tile and run `/floatie admin origin`.
5. Save it with `/floatie admin save duck Duck`.
6. Give yourself a token with `/floatie admin give <player> duck`.
7. Build or copy the duck somewhere else.
8. Stand on the inspection tile and run `/floatie admin debug duck`.
9. When debug says 100%, test the real flow with `/floatie`.

The inspection tile is the block players should stand on when they run `/floatie`. It should be included inside the `pos1`/`pos2` selection so the player has to build it too. Good defaults:

- `LIGHT_BLUE_STAINED_GLASS` for water floaties.
- `CUT_SANDSTONE` for beach floaties.

Do not add inspection tile materials to `scanner.capture-ignore-materials`, because ignored materials are not saved as required blueprint blocks.

The origin is the point the scanner searches around. For event floaties, set the origin to the inspection tile. That makes player instructions simple and keeps detection predictable.

Do not forget to tell players about the inspection tile in the floatie book and quest text.

Suggested book text:

```text
Earn a Summer Floatie Token.
Build the token's floatie exactly at your base or island.
Place the inspection tile marker where the guide shows it.
Stand on the inspection tile and run /floatie.
At 100%, you get the floatie reward.
Build all floaties to earn the final summer reward box.
Your token is not consumed. Keep it safe.
```

For water floaties, use a light blue stained glass inspection tile. For beach floaties, use a cut sandstone inspection tile.

If you want extra beach shape/detail blocks to be required too, include the surrounding sand or sandstone inside the blueprint selection. Water itself can stay in `scanner.capture-ignore-materials`; the water inspection tile rule below handles the environment check without saving water as normal blueprint blocks.

Inspection tiles add automatic environment checks when the tile is included in the blueprint at the origin, or one block below the origin when the admin stood on the tile while setting it:

- `LIGHT_BLUE_STAINED_GLASS` at origin requires nearby water within `scanner.environment-radius`.
- `CUT_SANDSTONE` at origin requires nearby sand within `scanner.environment-radius`.

Nearby means horizontally around the inspection tile, at the tile's Y level or one block below. Waterlogged blocks count as water. Sand, red sand, and suspicious sand count as sand.

When a build is incomplete, regular players only see the approximate completion message. Players with `eventfloaties.admin` also see the grey missing/wrong spots hint, so staff can help without exposing exact blueprint coordinates to everyone.

Older simple workflow, if you are not using inspection tiles:

1. Look at one corner and run `/floatie admin pos1`.
2. Look at the opposite corner and run `/floatie admin pos2`.
3. Look at the logical anchor block and run `/floatie admin origin`.
4. Save it with `/floatie admin save duck Duck`.
5. Give yourself a token with `/floatie admin give <player> duck`.
6. Build or copy the duck somewhere else.
7. Stand on or near the floatie and run `/floatie admin debug duck`.
8. When debug says 100%, test the real flow with `/floatie`.

Without an inspection tile, good anchors are the bottom center of the floatie, the middle body block, or another consistent block that a player can reasonably stand near.

Blueprint capture ignores environment blocks from `scanner.capture-ignore-materials`, including air, water, lava, barriers, smooth quartz, and diamond blocks by default. This lets the same floatie work in water, on sand, on grass, or in skyblock-like worlds.

`BARRIER` is always ignored during blueprint capture, even if an older generated config is missing it. You can safely use barrier blocks to visualize floating/air blocks while registering a floatie.

`SMOOTH_QUARTZ` is also always ignored during blueprint capture, so it can be used as a temporary build platform without becoming part of the floatie requirement.

`DIAMOND_BLOCK` is also always ignored during blueprint capture, so it can be used as a visible admin marker for `pos1`/`pos2` corners.

## Matching Rules

Default match mode is `SMART`.

- Required blueprint blocks must be present.
- Rotation is allowed by default.
- Directional/detail block data is rotated with the blueprint.
- Waterlogged differences are ignored.
- Glass panes, walls, fences, and similar connection-sensitive blocks are treated by material because their connection state changes depending on surroundings.
- Surrounding air/water/sand/grass is not required unless a future stricter mode adds it.
- If the origin inspection tile is `LIGHT_BLUE_STAINED_GLASS`, nearby water is required.
- If the origin inspection tile is `CUT_SANDSTONE`, nearby sand is required.
- Blueprint files may also include an explicit `environment: water`, `environment: beach`, or `environment: none` field. New saves write this field automatically.
- `/floatie admin list [page]` shows a paginated admin list with match mode and any inferred environment type, such as `SMART, water` or `SMART, beach`. Hover a floatie name for details, or click it to suggest `/floatie admin debug <id>`.

## Cooldowns

Normal player checks use two cooldowns:

- Global cooldown: 15 seconds.
- Per-player cooldown: 60 seconds.

Both are configurable in `config.yml`.

The global cooldown message can make the event feel shared: someone else is checking a floatie and the summer spirit needs a moment. The per-player cooldown message tells that player the summer spirit is swimming through `/summer` and will be back soon.

Admin/debug checks bypass cooldowns.

## Scanner Radius

Current defaults are `scanner.search-radius-xz: 8` and `scanner.search-radius-y: 5`. These are intentionally about the search area for the saved origin/inspection tile, not the full floatie width.

For the tracked repo blueprints, `gradle blueprintBoundsSelfTest` currently reports:

- `crocodile.yml` - `4 x 3 x 9`
- `duck.yml` - `4 x 3 x 3`
- `flamingo.yml` - `4 x 4 x 5`
- `swan.yml` - `4 x 4 x 5`

Those fit comfortably within a 16x16x16 event footprint. Keep telling players to stand on the inspection tile; only raise the scanner radius if a real test shows players are standing reasonably close but the plugin cannot find the origin.

## Claim Protection

The plugin tracks two things when a player completes a floatie:

- player UUID + floatie id, so the same player cannot get repeat rewards for the same floatie
- floatie id + world + origin coordinates, so another player cannot claim the exact same completed build

The origin should be the inspection tile. This makes the protection easy to reason about: one claimed inspection tile equals one claimed build for that floatie id.

This is not a full land-claim/island ownership check. If the live event needs stricter ownership rules later, add integration with the server's claim/island/plot plugin in the future `1mb-cmiapi-lib` version.

## Live/Test Mode

`event.live` controls whether players can actually claim the event.

When `event.live: false`:

- normal players cannot claim rewards
- admins can still use `/floatie` for real matching tests
- successful admin tests do not save progress
- reward commands, broadcasts, sounds, and particles are not run

This lets staff test on a live server without revealing the event or giving rewards.

When `event.live: true`, successful `/floatie` checks save progress and run the configured rewards.

Before switching to live mode, run `/floatie admin status` in-game. It summarizes the settings that matter most for launch: live mode, token requirement, blueprint count, scanner radius, disabled worlds, reward command counts, and expected CMI kit names.

## Disabled Worlds

Normal `/floatie` checks are blocked in worlds listed under `scanner.disabled-worlds`. This protects demo spots and event guide worlds where completed floaties may be visible.

Default disabled worlds:

- `spawn`
- `end`
- `nether`
- `summer`

Admin `/floatie admin debug [id]` still works in disabled worlds for setup/testing.

## Rewards

Default kit naming:

```yaml
rewards:
  kit-name-format: "summerevent_floatie_{floatie_id}"
  all-kit-name: "summerevent_floatie_reward"
```

So completing `swan` runs commands with:

```text
{kit} = summerevent_floatie_swan
```

Completing all registered floaties runs commands with:

```text
{all_kit} = summerevent_floatie_reward
```

Default reward commands:

```yaml
per-floatie-commands:
  - "cmi kit {kit} {player} -s"
all-floaties-commands:
  - "cmi kit {all_kit} {player} -s"
  - "cmi broadcast !{#34d5ff>} {player} finished all summer floaties! {##ffd166<}{#gold}"
```

The CMI reward kits should remain `Enabled: false` in CMI's kit files. That prevents players from claiming them manually, while the console reward command can still deliver them silently through `cmi kit <kit> <player> -s`.

Available command placeholders:

- `{player}`
- `{uuid}`
- `{floatie}`
- `{floatie_id}`
- `{kit}`
- `{all_kit}`
- `{completed}`
- `{total}`

The plugin also plays configurable Bukkit sound sequences and particles on completion.

When progress is complete, `/floatie progress` also sends the `messages.all-complete` line.

## Data Files

- `plugins/EventFloaties/config.yml`
- `plugins/EventFloaties/blueprints/<id>.yml`
- `plugins/EventFloaties/playerdata/<uuid>.yml`

Blueprints and player progress are stored as one file per floatie/player so they are easy to copy from a test server to a live server. After copying blueprint files, run `/floatie reload`.

Each blueprint file contains `display-name`, `match-mode`, `environment`, and the required `blocks` list. `environment` is written as `water`, `beach`, or `none`.

This repository also keeps example/event-ready blueprints in `blueprints/`. If a test or live server folder is reset, copy the needed files from that repo folder into `plugins/EventFloaties/blueprints/` and run `/floatie reload`.

Playerdata files record completed floaties. New completions also write `rewarded-at` markers so `/floatie admin progress <player>` can show which completed floaties have a payout marker. Older claims may not have that marker.

Each completed claim also stores the world and origin coordinates. During live checks, another player cannot claim the same blueprint at that exact origin.

Older `blueprints.yml` and `claims.yml` files are migrated into the folder layout on plugin load if the new per-file destination does not already exist.

## Floatie Set

Initial set:

- Crocodile
- Swan
- Flamingo
- Unicorn
- Duck

Extra token/build ideas:

- Beach ball
- Sunglasses
- Popsicle
- Seashell

## Production Direction

This standalone plugin is ready for event testing. If it graduates into the `1mb-cmiapi-lib` ecosystem later, keep the same behavior while moving to shared translations, CMI/CMILib command conventions, richer setup mode, and final summer event integration.
