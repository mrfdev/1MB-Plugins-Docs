# Paper 26.3 stable build 182, 14 October 2026

Suite build **767** was compiled with JDK 25.0.4.1 against `26.3.build.182-stable` and synchronized to both maintained test servers. Their runtime remains Java 27+35-2325. Paper 26.2 remains the separate rollback instance.

## Official change review

Discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), the [event-listener guide](https://docs.papermc.io/paper/dev/event-listeners/) and [26.3 Player API](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Player.html). The [official build record](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/182) identifies STABLE build 182, released at 12:13 UTC on 14 October 2026.

The [sole recorded commit](https://github.com/PaperMC/Paper/commit/6e1bb67eb12d4a456a242b7a12d1d9737f67b616) fixes Adventure book conversion and compatibility rewriting. The changed server files are `CraftMetaBook`, `CraftMetaBookSigned` and `Commodore`. No configuration defaults, scheduler/event lifecycle, security settings or roadmap targets change in this build. Byte comparison of every class in the exact 181 and 182 Paper API artifacts found **zero class changes**, including deprecation metadata. No source adaptation to 182 was required.

Both downloaded launch JARs match SHA-256 `ec5127ad7ed3bce3d3e5a1df0514b13702ee98cb518851ea990da22911048160`. The canonical build selected the same stable runtime and compile API for both servers.

## Verification

- Canonical `scripts/build-all.sh`: successful, 66 matching managed JARs on each server. Forage retains its deliberate BedrockChatBridge disablement.
- Automated checks: 5,616 tests, zero failures/errors, 41 skipped; Forage accounts for 1,894 tests and 28 skips.
- Both servers started successfully on Java 27, Paper 182 and suite 767. Forage configuration checks reported zero errors. The normal-preset advisory is expected for beta, and the sands-family overlap advisory is intentional: Trowel breaking and Brush sifting are both supported.
- The primary test server completed a clean 182 shutdown, saving all worlds and closing region-file I/O. Forage beta remained available during that additional check.
- Live source output verified all four ordinary ground sources as Trowel break actions and Brush sift actions. The one-time source migration and 25%/three-use/3–15 XP keepsake settings were verified on both servers.
- Configurations, kit templates and player progress remain independent. Before startup, all 1,046 recorded Forage/config/kit files were unchanged by the JAR synchronization.

Evidence resides in `.scratch/forage-brush-2026-10-14/`: canonical log, exact official commit/build metadata, API comparison, independent artifact verification, runtime checks and startup/shutdown logs. The gameplay checklist deliberately leaves unobserved in-game Brush acceptance cases unchecked.
