# Summer Floatie Book Text

Use this text in the book that goes inside each summer floatie box.

The goal is that a player can open the box, read the book quickly, and know the next step without asking staff. Keep the inspection tile instruction visible; it is the most important part for reliable `/floatie` checks.

## Generic Book

### Page 1

```text
Summer Floaties

You earned a special floatie token!

The token tells you which floatie to build.
```

### Page 2

```text
Build your floatie exactly at your base or island.

Use the guide blocks from this box.
```

### Page 3

```text
Important:

Every floatie has an inspection tile marker.

Place it where the guide shows it.
```

### Page 4

```text
When your build is ready:

Stand on the inspection tile and run:

/floatie
```

### Page 5

```text
If the summer spirit says it is not finished yet, keep adjusting the build and try again.

If auto-detect picks the wrong floatie, use:

/floatie check <id>
```

### Page 6

```text
At 100%, you get a floatie reward.

Build every summer floatie to earn the final event reward box.

Your token is not consumed.
```

## Short Book

Use this shorter version if the box already includes a visual guide or separate instructions.

```text
Build the floatie shown by your token at your base or island.

Place the inspection tile marker where the guide shows it.

Stand on the inspection tile and run /floatie.

At 100%, you get your reward.
Build all floaties for the final reward box.

Your token is not consumed.
```

## Inspection Tile Reminder

Use this wording anywhere players see the build guide:

```text
Do not forget the inspection tile.
Stand on that tile when you run /floatie.
```

Recommended marker blocks:

- `LIGHT_BLUE_STAINED_GLASS` for water floaties.
- `CUT_SANDSTONE` for beach floaties.

## Admin Checklist

Before handing out a floatie box:

- Include the correct secure token for that floatie.
- Include the book text above.
- Include or show the inspection tile marker.
- Make sure the guide image/build example shows exactly where the inspection tile goes.
- Make sure the token id matches the blueprint id used by `/floatie check <id>`.
