# Summer Floaties Troubleshooting

## `/floatie` says the event is not live

`event.live` is probably `false`.

This is intentional during setup. Staff can test while the event is not live, but normal players cannot claim rewards.

Set `event.live: true` only when the event is ready.

## Player needs a token

By default, players need the matching secure floatie token in their inventory.

Check:

- The player has the correct token.
- The token was created by `/floatie admin give`.
- The token id matches the blueprint id.
- The player does not accidentally have a renamed ordinary item instead of a secure token.

## Build is close but not complete

The player should stand on the inspection tile and run `/floatie`.

If auto-detect seems to choose the wrong floatie, use:

```text
/floatie check <id>
```

Staff can use:

```text
/floatie admin debug <id>
```

Admins see the first missing/wrong spots hint when a match is incomplete.

## Water or beach floatie fails

Check the inspection tile and environment:

- `LIGHT_BLUE_STAINED_GLASS` requires nearby water.
- `CUT_SANDSTONE` requires nearby sand.

Nearby means horizontally around the inspection tile at the tile's Y level or one block below.

## Player cannot claim in a world

Normal checks are blocked in worlds listed under:

```yaml
scanner:
  disabled-worlds:
```

This protects spawn, event guide, and demo worlds.

Admin debug still works in disabled worlds.

## Reward did not arrive

Check:

- `event.live` is `true`.
- The player reached a 100% match.
- Reward commands are configured.
- The expected CMI kit exists.
- The CMI kit is deliverable by console command.
- The player's inventory may have been full; CMI may drop items nearby depending on the reward command behavior.

Use:

```text
/floatie admin progress <player>
```

to see completed floaties and reward markers.

## A build was already claimed

A completed build origin can only be claimed once by one player for the same floatie id.

Players should build their own floatie at their own base and stand on their own inspection tile.

## Commands do not tab-complete as expected

Check permissions:

- Player commands need `eventfloaties.use`.
- Admin commands need `eventfloaties.admin`.

## Placeholder returns `0`

For `%summer_floaties_has_token_<id>%`, the player must be online because the placeholder checks the live inventory.

Also confirm PlaceholderAPI is installed and EventFloaties registered its expansion on startup.

## Blueprint changes did not apply

After copying or editing blueprint files, run:

```text
/floatie reload
```

or restart the server.

## Before live testing

Run:

```text
/floatie admin status
```

and review the pre-live checklist in `docs/pre-live-checklist.md`.
