# Forage complete source guide verification, 11 October 2026

## Scope and deployment

This is development verification for the pending source-guide update against Paper 26.3 BETA API build 174 and Java 25 bytecode. The Forage beta remains on suite build 736. No server restart, reload, configuration edit or JAR deployment was performed for this change. A future coordinated suite build and deployment is required to activate the new command and menus.

The update adds `/forage sources [tool] [page]`, a complete source browser using the same effective material/entity bindings as gathering. With no tool argument it reads the genuine held tool's identity, or opens a tool picker. Players may browse before buying a tool or registering a camp, and while Forage is paused. Source support is independent of temporary reward availability and tool tier.

## Behavioral checks

- Every supported source remains reachable through pagination, with a readable name, icon, family and required block-breaking or creature-kill action.
- Non-block item materials, legacy or noncanonical material names, nonliving entity types and disabled families are excluded. Configuration overlaps follow the effective runtime winner rather than inventing a different guide-only mapping.
- Page changes and refreshes re-resolve current settings and permissions. The shared GUI service retains its inventory holder, player, nonce and stale-session checks.
- Browsing does not create or rename a profile, consume/reset a chunk allowance, change a camp visit, spend currency, claim rewards or modify the player's held item. Legacy tool integrity inspection operates on a detached copy.
- Pause feedback reads player/family caps, world and current-position region access, area rest, game mode, saving/request availability and tool condition. It is a snapshot; the actual target and action remain subject to authoritative gathering checks.
- Pickaxe notes explain unsupported ordinary stone, deepslate and ores when absent from the active list. Brush notes distinguish block breaking from archaeology brushing. Creature cards explain melee hit attribution and the ten-second kill window.
- New or normally refreshed tool lore provides a short source description and the tool-specific command. Reference browsing itself never rewrites existing tool lore.
- A menu action closes the guide and posts the public source-guide URL in chat, with a clickable link and visible text fallback.

## Documentation drift

The development-only `generateSourceDocumentation` task loads shipped defaults through production settings loaders and the same source catalogue adapter. It writes only the marked catalogue section of the player guide. A normal test rejects drift. Offline block/item membership comes from the exact Paper API's public `BlockType`/`ItemType` declarations; production uses the live Material APIs. The public catalogue describes shipped defaults; in-game pages describe that server's active configuration.

## API review

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), [custom inventory holder guidance](https://docs.papermc.io/paper/dev/custom-inventory-holder/) and [Adventure component guidance](https://docs.papermc.io/adventure/text/). The cached `paper-api-26.3.build.174-beta.jar` verifies `Material.isBlock`, `Material.isItem` and `EntityType.isAlive`; the [Material reference](https://jd.papermc.io/paper/26.3/org/bukkit/Material.html) documents valid display-item checks. No new server internals or asynchronous world/inventory access are introduced.

## Validation results

- Source-catalogue tests: 17 passed; actual command/page/status integration tests: 11 passed; documentation generation/drift tests: 2 passed.
- Complete Forage regression suite: **504 passed**, zero failures, errors or skips, using JDK 25.0.4.1 and the installed optional-plugin fixtures.
- The shared-library test task was up to date with **432 previously passing tests**, including the shared GUI event/session coverage. Those tests were not re-executed in this run.
- All 67 captured beta configuration/managed-JAR hashes are unchanged. The existing Java process continues listening on port 22442.

Development command:

```sh
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home \
PATH=/Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home/bin:$PATH \
FORAGE_PYRO_FIXTURE_DIR="$PWD/.scratch/forage-protection-parity/fixtures" \
FORAGE_MCMMO_FIXTURE_JAR="$PWD/servers/Forage-26.3/plugins/mcMMO.jar" \
gradle :plugins:player-fun:forage:test :libs:1mb-cmiapi-lib:test --console=plain
```

Connected-client acceptance remains pending the owner's deployment window; this report does not claim an in-game smoke test of the new code on build 736. Development checks do not produce or replace the required numbered suite handoff.
