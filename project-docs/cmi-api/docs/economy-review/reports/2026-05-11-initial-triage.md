# Initial WorthHelper Triage - 2026-05-11

Source report:

- `docs/economy-review/reports/worthhelper-report-2026-05-11T08-04-18.011002Z.md`

## Baseline

- Worth source: `servers/Paper-26.1.2/plugins/CMI/Saves/Worth.yml`
- Direct worth entries: 1413
- Variant keys skipped: 110
- Item materials: 1505
- Paper recipes supported: 1466/1515
- WorthHelper suggestions: 440
- Exported review commands: 437
- Missing direct worth values: 5

No `Worth.yml` changes were made.

## Missing Values

The 5 missing values are expected review items, not immediate fixes:

- `TEST_BLOCK` - creative/test block; keep blacklisted.
- `TEST_INSTANCE_BLOCK` - creative/test block; keep blacklisted.
- `SPAWNER` - special block; needs a human policy decision.
- `TRIAL_SPAWNER` - special block; needs a human policy decision.
- `VAULT` - special block; needs a human policy decision.

Current leaning: leave `SPAWNER`, `TRIAL_SPAWNER`, and `VAULT` unset unless
there is a clear gameplay reason to allow selling them. If players get them
from rare events such as drop parties, they may be better treated as trophy or
admin-distributed items rather than normal economy inputs.

## Suggestion Buckets

WorthHelper found two main suggestion types:

- `possible-recipe-loop-review`: 174 entries where current worth is higher than
  recipe-derived value. These can create sell-profit loops if players can craft
  the item cheaply and sell it for more.
- `under-recipe-review`: 263 entries where current worth is below recipe-derived
  value. These are not automatically wrong; many raw or farmable items should
  stay cheap to avoid inflation.

## First Interpretation

Do not apply the report directly. The first pass should be grouped by risk:

- High-impact crafted valuables: netherite gear, lodestone, golden apple, cake,
  crafter, spyglass, end crystal.
- Conversion families: stonecutting blocks, slabs, stairs, walls, copper
  variants, glass, concrete powder, glazed terracotta.
- Farmable or mass-produced outputs: crops, cooked food, sugar, wool, dyes,
  honey, candles, planks, buttons.
- Compacting/decompacting resources: diamond block, gold block, coal block,
  raw ores, nuggets, ingots.
- Special/manual policy items: spawner, trial spawner, vault.

## Recommended Next Step

Start with `possible-recipe-loop-review` entries where the current value is
substantially above recipe cost and the item can be crafted or converted by
players. These are the most likely abuse points.

Avoid raising `under-recipe-review` items until farmability, supply, and
inflation risk are reviewed. Cheap farmable items should often remain cheap even
when recipe math says they could be worth more.
