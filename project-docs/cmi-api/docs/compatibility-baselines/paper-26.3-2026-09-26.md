# Paper 26.3 build 46, 26 September 2026

The canonical build-702 workflow advances the maintained local Paper instance from **26.3 ALPHA build 41** to **build 46** within the previously authorized target/channel. Suite **1.0.4-702** remains Java 25 bytecode, compiled/tested with JDK **25.0.4.1** and smoke-tested on **Java 27+35-2325**. The Paper 26.2 build-699 rollback remains unchanged.

- Exact API: `io.papermc.paper:paper-api:26.3.build.46-alpha`.
- Server: `Paper-26.3-46.jar`, SHA-256 `afb04e96729c92110799635f48005eb24ff64664422f8df42c6529062851f1e3`.
- Official [build metadata](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/46) and [five-commit diff](https://github.com/PaperMC/Paper/compare/a15fed9c16a5cc93e4ff38d6e2135623e2dc9daa...b23b725834b24526800f12bb22e47df85dfe811c) reviewed before update.

## Relevant changes

Build 42 counts skipped inbound packets toward rate limiting. Build 43 labels the existing Bukkit command API `ApiStatus.Obsolete` and recommends Brigadier/BasicCommand; this is not removal or a changed runtime contract. The suite's existing shared command router remains in use, including `/hv`; a router migration should be reviewed suite-wide separately. Build 44 restores the mob peaceful-despawn override. Build 45 avoids redundant styled-tooltip comparisons in item lore equality/hashing while retaining comparison of actual lore lines. Build 46 falls back to vanilla data fixers when a Paper converter is unavailable.

No death-source API changes occur in this delta. The HV finishing-blow implementation uses supported `EntityDeathEvent`, `DamageSource`, `Projectile` and UUID APIs. Exact cached API metadata confirms these contracts. No production NMS or reflection was introduced. The clean compilation emitted no deprecation warnings from this change.

The [current documentation index](https://docs.papermc.io/llms.txt), [roadmap](https://docs.papermc.io/paper/dev/roadmap/), [BasicCommand replacement](https://docs.papermc.io/paper/dev/command-api/misc/basic-command/), [global configuration](https://docs.papermc.io/paper/reference/global-configuration/) and exact upstream diff were reviewed. The delta changes no global/world configuration defaults. Existing safe exploit defaults remain in place; StartupDoctor reports Paper safety **safe**, with zero actionable findings. No command routing, item sanitization, world-protection or duplication bypass setting was changed.

## Checks and remaining boundary

Canonical full build: **2,950 tests**, zero failures/errors, one existing optional skip. All **65** suite JARs have matching artifact/server hashes, uniform versions and Java class major 69. The 65 rollback JARs plus five recorded launcher/configuration files match their preserved hashes.

Paper **26.3-46 / Java 27** enabled all 65 suite plugins, reached readiness, exercised 18 native HV death-source cases, disabled all 65 on stop and exited **0**, with zero ERROR log entries. UpdateSmoke passed **562 checks** (561 pass, one existing skip), 10/10 commands, 5/5 placeholders, 64 features and 400 successful bounded command-smoke dispatches. PluginVersions reports **ok**, zero issues/warnings. Existing optional integration/setup notices, including the local placeholder HV reward, are not new failures or gameplay acceptance.

Evidence is under `.scratch/hv-player-finisher-2026-09-26/`. The maintained instance is left stopped. Live and the separately managed external test server were not changed. Owner connected-player acceptance is still required before `stageTestedJarsForLive`; see the [HV staff guide](../plugins/halloweenvirus-administration.md#player-finishing-blows-and-automated-farms) for the drop rule and controls.
