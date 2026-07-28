# TODO

## Setup

- [x] Migrate CMI `Worth.yml` to `docs/economy-review/baseline/CMI/` for analysis.
- [x] Migrate ShopGUI+ `/buy` configuration files to `docs/economy-review/baseline/ShopGUIPlus/shops/`.
- [x] Add notes for the local `servers/` test server focused on `26.2`.
- [ ] Keep `docs/economy-review/baseline/CMI/Worth.yml` intentionally synced with `servers/Paper-26.2/plugins/CMI/Saves/Worth.yml`.
- [ ] Keep `docs/economy-review/baseline/ShopGUIPlus/shops/` intentionally synced with `servers/Paper-26.2/plugins/ShopGUIPlus/shops/`.
- [ ] Resolve the `GOLDEN_DANDELION` baseline difference (`2.59` migrated versus `1.0` on the CMI-API test server) through normal review.

## Worth.yml First Pass

- [ ] Build or import a complete in-game item list for the target server version.
- [ ] Define and document the item blacklist.
- [ ] Confirm the unofficial blacklist: lingering potions, potions, splash potions, tipped arrows, ominous bottles, and creative-only blocks like test block and test instance block.
- [ ] Decide whether `TEST_BLOCK` and `TEST_INSTANCE_BLOCK` should be added to WorthHelper's configured blacklist to reduce expected-missing noise.
- [ ] Check that every allowed item exists in the core `worth.yml`.
- [ ] Normalize item names and formatting so diffs stay readable.
- [ ] Identify missing, duplicated, obsolete, or renamed items.
- [ ] Use `cmi worthlist -missing` to compare CMI's missing-item report with our tracked analysis.
- [ ] Review whether `cmi generateworth` suggestions match our own recipe-based analysis before accepting them.
- [ ] Review the 35 direct worth entries reported missing by WorthHelper on Paper 26.2 and separate intentional blacklist entries from real new materials.

## Economy Balance

- [ ] Analyze crafting recipes and ingredient-to-output value relationships.
- [ ] Analyze smelting, blasting, smoking, and campfire conversion paths.
- [ ] Analyze stonecutter recipes.
- [ ] Analyze waxing, unwaxing, oxidation, scraping, stripping, dyeing, and similar transformations.
- [ ] Flag arbitrage loops where players can profit by converting, buying, or selling items.
- [ ] Document intentional exceptions and special-case pricing decisions.
- [ ] Review whether trial spawner should be sellable/buyable, and determine a fair value if included.
- [ ] Review whether vault should be sellable/buyable, and determine a fair value if included.
- [ ] Review how spawners should be handled, including whether they need separate values by entity type.
- [ ] Make review reports include farmability, ease of access, inflation risk, and human value expectations.
- [ ] Require approval before applying suggested worth changes to tracked config files.

## ShopGUI+

- [ ] Compare ShopGUI+ buy prices against the final worth values.
- [ ] Apply the default `/buy = worth * 100` rule where appropriate.
- [ ] Find items present in `worth.yml` but missing from `/buy`.
- [ ] Find `/buy` items that are missing from `worth.yml`.
- [ ] Review category placement and shop usability after prices are corrected.
- [ ] Fix the invalid `bentobox` shop links at slots 2, 3, 6, 7, 8, and 9 reported during the Paper 26.2 smoke test.

## Tooling

- [ ] Add validation scripts for missing items and invalid price relationships.
- [ ] Add a report that lists buy/sell ratios and exceptions.
- [ ] Add a repeatable test process using the local server.
- [x] Prototype a Paper helper plugin that reads worth values and reports recipe-derived value suggestions.
- [x] Use Paper recipe APIs to inspect shaped, shapeless, cooking, stonecutting, smithing, and other registered recipes.
- [x] Use the Paper 26.2 `Material` enum as the canonical item/material list for completeness checks.
- [x] Ensure helper tooling outputs suggested `cmi setworth item -s:value` commands without applying them automatically.
- [x] Copy 1MB-CMIAPI-LIB, WorthDrift, and WorthHelper build `553` jars to the economy test server.
- [x] Smoke test `/worthhelper status` on the economy test server.
- [x] Smoke test `/worthhelper scan` on the economy test server.
- [x] Smoke test `/worthhelper missing` on the economy test server.
- [x] Smoke test `/worthhelper recipes diamond_block` on the economy test server.
- [x] Smoke test `/worthhelper export` on the economy test server.
- [x] Decide where exported WorthHelper reports should live in this repo.
- [x] Save the first exported WorthHelper report under `docs/economy-review/reports/`.
- [x] Triage first WorthHelper report into review batches.
- [ ] Review high-risk `possible-recipe-loop-review` entries before any other changes.
- [ ] Have staff manually review Priority A and Priority B from `docs/economy-review/reports/2026-05-11-possible-loop-priority-review.md`.
- [ ] Review `under-recipe-review` entries separately and avoid raising farmable items blindly.
