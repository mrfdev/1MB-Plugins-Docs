# Pre-Live Checklist

Use this before the summer floatie event is opened to players.

## Books

- Copy the player-facing text from `docs/floatie-book-text.md` into the actual written books used in floatie boxes.
- Make sure the book, token, and build guide use the same floatie id.
- Make sure the guide shows the inspection tile marker clearly.

## Build-Time Checks

Run:

```bash
gradle build
```

This runs:

- `matchingRulesSelfTest` - verifies SMART matching ignores waterlogged differences and treats connection-sensitive blocks like glass panes by material.
- `captureIgnoreRulesSelfTest` - verifies `BARRIER`, `SMOOTH_QUARTZ`, and `DIAMOND_BLOCK` cannot become blueprint requirements.
- `blueprintBoundsSelfTest` - prints tracked blueprint dimensions and fails if a current repo blueprint exceeds the expected 16x16x16 event footprint.
- `infoCommandDocsSelfTest` - verifies `/floatie info` and canonical docs metadata stay documented.
- `verifyPluginJar` - verifies the plugin jar contains the expected plugin classes/resources.

Current tracked blueprint dimensions:

```text
crocodile.yml: 20 blocks, 4 x 3 x 9
duck.yml:      11 blocks, 4 x 3 x 3
flamingo.yml:  18 blocks, 4 x 4 x 5
swan.yml:      20 blocks, 4 x 4 x 5
```

These fit comfortably in the current event footprint. The scanner radius does not need to be the full blueprint size when players stand on the inspection tile; it only controls how far from the player the plugin searches for the saved origin.

## Manual In-Game Checks

After installing the latest jar on the test server:

1. Run `/floatie admin status`.
2. Confirm the loaded blueprint count, scanner settings, disabled worlds, reward command counts, and expected kit names look right.

Floatie matching check:

1. Place a known water floatie in water.
2. Stand on the `LIGHT_BLUE_STAINED_GLASS` inspection tile.
3. Run `/floatie admin debug <id>`.
4. Confirm it reaches 100%.
5. Move/copy the same floatie onto dry land if the blueprint allows it, or test a dry-land build with pane/slab variants.
6. Confirm glass panes and waterlogged slabs do not fail only because of waterlogged/connection details.

Admin capture helper-block check:

1. Build a tiny test selection with one real block, one `BARRIER`, one `SMOOTH_QUARTZ`, and one `DIAMOND_BLOCK`.
2. Select it with `/floatie admin pos1` and `/floatie admin pos2`.
3. Set origin with `/floatie admin origin`.
4. Save it with `/floatie admin save ignoretest Ignore Test`.
5. Inspect `plugins/EventFloaties/blueprints/ignoretest.yml`.
6. Confirm the file contains the real block but not `BARRIER`, `SMOOTH_QUARTZ`, or `DIAMOND_BLOCK`.
7. Delete it with `/floatie admin delete ignoretest`.

## Scanner Radius

Current defaults:

```yaml
scanner:
  search-radius-xz: 8
  search-radius-y: 5
```

Keep these defaults for the current tracked floaties. They let a player stand on or very near the inspection tile while avoiding a needlessly large scan.

Re-run this after adding larger final blueprints:

```bash
gradle blueprintBoundsSelfTest
```

If a future floatie is much taller or wider, first keep the player instruction strict: stand on the inspection tile. Raise `search-radius-xz` or `search-radius-y` only if real testing shows players are standing in a reasonable place but the plugin cannot find the origin.
