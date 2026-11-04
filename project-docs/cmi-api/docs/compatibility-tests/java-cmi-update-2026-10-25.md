# Java and CMI update verification, 25 October 2026

## Scope

Local compatibility verification in the sole maintained `servers/Paper-26.3/` instance before the owner upgrades the live M4 Pro server. Existing worlds, player records, feature settings and transaction histories are retained. No live deployment or live handoff staging is part of this check.

Selected versions:

- Build and automated tests: Oracle JDK **25.0.5.0.3+1-LTS-2**, installed at `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`.
- Paper runtime: Oracle JDK **27.0.1.0.3+1-2**, installed at `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.
- Java bytecode target remains **25**.
- Paper **26.3 STABLE build 222**, API `26.3.build.222-stable`.
- CMI **9.8.11.0**, CMILib **1.6.1.0**.

The exact local JDK executables report these versions. The project-local Gradle user home `.gradle-codex` pins the patched build JDK and disables alternative toolchain discovery/downloads. The maintained server launcher explicitly selects the patched Java 27 installation.

## Upstream and provider review

The live [Paper documentation index](https://docs.papermc.io/llms.txt) was the discovery source for the [roadmap](https://docs.papermc.io/paper/dev/roadmap/), [scheduler](https://docs.papermc.io/paper/dev/scheduler/), [global configuration](https://docs.papermc.io/paper/reference/global-configuration/), and [26.3 API documentation](https://jd.papermc.io/paper/26.3/). The official [build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds) still selects build 222 as the latest 26.3 STABLE release; there is no Paper/API change from the prior tested build. Hosted Javadocs identify build 219, so exact build 222 configuration was corroborated against [its immutable source](https://github.com/PaperMC/Paper/blob/e3ba7b1dc801e0c385051c34781ab30b226abee3/paper-server/src/main/java/io/papermc/paper/configuration/GlobalConfiguration.java). Local duplication, unsafe end-portal, headless-piston, permanent-block and skipped-tripwire protections remain at safe settings; oversized-component sanitizer exclusions remain empty.

[CMI release notes](https://voxel.shop/product/228/cmi/updates) cover playtime saving, offline kill behavior, hologram refresh after reload and floating `ICON` behavior. [CMILib release notes](https://www.spigotmc.org/resources/cmilib.87610/updates) describe backward-compatible RawMessage deprecation, replacement performance, AM/PM parsing and item-entity packet teleports. Connected-client visual checks remain appropriate for holograms, books, inventories and formatted chat.

The CMI update requires reviewing three deliberately restricted integrations: alias interception, virtual-anvil/read-only item command classification, and Forage's durable economy checkpoint adapter. Relevant command, alias, anvil, SQLite and metadata classes were compared with the previously tested 9.8.10.5 provider. The reviewed paths retain their contracts; 9.8.11.0 is added explicitly while older reviewed versions remain supported and unknown versions remain refused. This does not broaden acceptance to arbitrary future provider versions.

## Recovery and evidence

Before replacement, the empty test server stopped cleanly. The previous complete suite, Paper JAR, CMI/CMILib JARs and data directories, shared feature data directory, launcher and PaperScript state/config were backed up with a SHA-256 manifest under `.scratch/java-security-update-2026-10-25/before/`.

Two local CMI downloads have the same declared version. The newer download was selected after comparing their differing classes; CMILib duplicates are identical. Selected provider SHA-256 values:

- CMI: `db350f24ec1b9d4f1626a999743936550f065595b0006da8eecb3f9dbd3d2cd3`.
- CMILib: `4f625972e1cf81ae40eca5dedf6bd39180c7a193b4888226fe99ccf8fd9794b7`.
- Paper: `f649771a2190214306fb0cfba22c7b2cbac5df6308b1158309593603ed07d488`.

Provider bytecode comparison and Gradle toolchain evidence are retained in the same scratch directory. Commercial provider binaries and decompiled material remain local.

## Verification results

Canonical suite **811** completed in **4 minutes 7 seconds**. All **67** managed JARs match their build artifacts by SHA-256, with 67 active and none deliberately disabled. Every packaged class remains Java 25-compatible. Documentation metadata and exact local Paper/API alignment checks passed.

Automated verification totals **7,103 cases**, **7,062 passed**, **41 existing optional-fixture skips**, and **zero failures/errors**, across 559 suites. These counts include active manifest projects and build-tool tests; stale results from dormant projects are excluded. The build-tool tests were additionally cleaned and rerun on the patched JDK instead of relying on their cached result. Focused CMI integration coverage passed 120 cases, including seven added version cases. Forage passed 2,789 cases with 28 optional skips; all 236 Hide and Sheep cases passed.

Native checks on the requested patched Java 27 runtime:

- First startup completed at **07:13:36 CET**. CMI **9.8.11.0** and CMILib **1.6.1.0** loaded, along with all 67 suite plugins. CMI loaded **196 kits**.
- A disposable read-only fixture passed **100 checks** against the actual loaded Hide and Sheep reward helper: all six templates, 29 item stacks with exact quantities, 13 authored item names/lore, empty PDC and unchanged repeated preview snapshots. Pocket Snacks contained exactly two cookies and one apple. It also confirmed native CMI command, alias and virtual-anvil guard readiness. No rewards, player inventories, entities or world state were changed.
- UpdateSmoke reported **565 pass / 0 warning / 0 failure / 1 skip row**, with all five placeholders resolving. Its normal 400-command cap left 14 feature-debug commands unrun; those exact 14 were executed separately after restart, all producing their expected debug output without exceptions. The test's normal cap was preserved.
- The dependency version gate passed all 14 rows. CMIProbe reached **14/14 managers**, discovered 54 event classes with listeners, and submitted its CMILib scheduler task. Its existing configuration still requests the obsolete `placeholderprobe` command, producing a 4/5 command-registration warning; the real `_placeholders` parser and all five UpdateSmoke placeholder samples passed. This unrelated diagnostic configuration was left unchanged.
- Forage reported healthy storage, no pending actors, all configured reward templates valid with zero errors/review warnings, active CMI item protections, and the **CMI 9.8.11.0 SQLite two-generation committed-row adapter** ready. Its existing normal-balance and overlapping sands-family configuration warnings remain.
- StartupDoctor's 15 Paper configuration checks passed.
- Clean shutdown completed at **07:14:28 CET**. The temporary probe and its exact remapped cache were removed while stopped. The final 90-plugin server startup completed at **07:15:28 CET**, with no runtime ERROR/SEVERE records or thrown command exceptions in either run.
- The previous build-810 startup warnings were compared with the final run. They are unchanged apart from map display order: existing local event-readiness warnings, ViaVersion notices, ItemSoulBind config notices, WorldGuardExtraFlags' deprecated listener notice, and macOS version-name detection. Existing source/test deprecation and JVM native-access warnings remain in compilation output; this update introduces no new deprecated calls.
- Hide and Sheep's configuration and complete ledger remain semantically unchanged. Woolbur is enabled locally, **READY**, with **no round running**, the existing 120-second gathering period and 180-second search period intact.

The updated test server remains available on port **22332**. The live M4 Pro server has not been changed. Connected Java/Bedrock gameplay, client rendering of menus/books/chat/holograms, actual paid reward delivery and production crash recovery were not exercised by this compatibility run. These results support a local gameplay spot check before the live upgrade; they are not a claim that every external plugin path or security fix has been independently audited.

Detailed evidence is under `.scratch/java-security-update-2026-10-25/`: `build-all.log`, `build-logic.log`, `verification-811.json`, `runtime-first-start-stop.log`, `runtime-final.log`, `runtime-verification.json`, the UpdateSmoke/CMIProbe reports, `sheep-state-verification.json`, and `final-alignment.log`.
