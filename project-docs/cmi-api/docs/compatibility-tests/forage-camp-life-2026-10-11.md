# Forage camp light, warmth and bedding, 11 October 2026

## Deployment status

Source and development-test changes only. The running Forage beta remains on build 736 with its previous camp requirements. No server restart, installed JAR replacement, player edit or runtime configuration change is part of this update. Activation needs the next authorized synchronized suite build for both maintained servers; configuration reload alone cannot install these checks.

## Requirements

The existing composter, 24 wool-family shelter positions, six fences, one storage block and one crafting table remain required. One campfire or soul campfire must now be **lit**. New defaults require one **lit candle block**, one **intact straw bed** and one **firefly bush** inside the registered footprint.

Undyed and colored candles qualify; candle cakes do not. Multiple candles at one position count once. Extinguished or waterlogged candles/campfires do not count. A straw bed counts once from its foot only when its matching head and orientation are also inside the footprint. Ordinary beds, orphan halves and mismatched parts do not qualify. The firefly bush has no night-time or particle condition. These are gameplay requirements, not a claim that every vanilla Abandoned Camp already contains them.

The guide, counted checklist, onboarding lore, defaults and setting comments explain the additions. Lore is wrapped instead of extending the previous single-line material list. No new fire-spreading, sleep, item-consumption or decoration-reward mechanic is introduced.

## Revalidation and access

On-use validation continues to check the current physical camp before granting workstation actions. A new observer also checks affected registered camps after ordinary block changes, light/water interactions and bed departure. Checks run on the server thread on the next tick, coalesce repeated events, and process at most two footprints per tick. The full footprint must already be loaded; no scan loads or generates chunks.

An observed shortfall marks the existing registration for deliberate revalidation, ends its workstation visit, and requests the existing asynchronous persistence path. If the Initial Camp becomes invalid, its owner's Secondary Camp access also pauses. Relighting or replacing the missing feature restores physical readiness, but the owner must confirm revalidation before using the camp again. Registration identity, Local Introduction and Global Forage Progress are retained.

The observer checks resulting world state rather than assuming that every interaction changed a block. Canceled actions and a straw bed that survives leaving it must not invalidate a complete camp. It is not a complete block-history service: damage repaired before the queued check, changes while the footprint is unloaded, or arbitrary plugin edits without events may only be assessed by later on-use validation. Successful previews never cache authorization for a later reward or purchase.

## API evidence and acceptance

Primary discovery used the [Paper documentation index](https://docs.papermc.io/llms.txt). Block-state sampling uses public [Lightable](https://jd.papermc.io/paper/26.3/org/bukkit/block/data/Lightable.html), Waterlogged and [Bed](https://jd.papermc.io/paper/26.3/org/bukkit/block/data/type/Bed.html) APIs. The exact cached Paper 26.3 BETA 174 API identifies `STRAW_BED` with `Bed` data. Runtime inspection confirmed the vanilla straw-bed removal follows bed departure; production code uses the public event and resulting block state rather than server internals.

The final development run passed **474 Forage tests**, with zero failures, errors or skips. This includes 35 maintenance observer cases, 28 validator cases, 10 scanner cases and 40 workstation-navigation/access cases. The shared-library test task was also checked and remained up to date with its previous 432 passing cases. The initial requirement regression reproduced the missing behavior before implementation. Two intermediate runs exposed missing registry/bootstrap support in the new biome test fixture; those physical block-state cases now use a Secondary Camp and do not need a biome registry, while the pure scan suite still verifies Initial Camp biome rules.

Verification used JDK 25.0.4.1 and the installed provider fixtures:

```sh
FORAGE_PYRO_FIXTURE_DIR="$PWD/.scratch/forage-protection-parity/fixtures" \
FORAGE_MCMMO_FIXTURE_JAR="$PWD/servers/Forage-26.3/plugins/mcMMO.jar" \
gradle :plugins:player-fun:forage:test :libs:1mb-cmiapi-lib:test --console=plain
```

Logs and XML totals are retained in `.scratch/forage-camp-life-2026-10-11/`. A comparison of 177 installed JAR/configuration files across both servers found no changes; the existing beta process remained listening on port 22442. These are development tests, not a distributable build or a connected-client test. Connected-client acceptance remains pending the next authorized deployment: run beta checklist P03a/C05a, including extinguishing, waterlogging, surviving/consumed beds, repair followed by explicit revalidation, and saved introduction progress.
