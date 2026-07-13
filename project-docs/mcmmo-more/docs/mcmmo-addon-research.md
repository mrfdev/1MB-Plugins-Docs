# 1MB mcMMO More Research

## Current conclusion

mcMMO has a useful public API for existing mcMMO skills, but it does not expose a supported API for registering brand-new primary skills. New mcMMO-native skills are hard-coded through enums, config paths, locale keys, permissions, database columns, leaderboards, scoreboards, and command registrations.

That means the low-upgrade-risk route is a companion plugin that:

- depends or softdepends on mcMMO for server ordering and compatibility checks;
- stores 1MB custom skills in its own data folder;
- uses `/mcmmore` rather than `/mcmmo` or `/1mbmmo`;
- keeps `/mcstats`, `/mctop`, and native mcMMO power level unchanged;
- avoids touching mcMMO's jar and can survive a normal mcMMO jar replacement.

## What the mcMMO API can do cleanly

- Add XP to an existing mcMMO skill through `ExperienceAPI.addXP`, `addRawXP`, or `addModifiedXP`.
- Read existing mcMMO skill levels, XP, XP remaining, caps, and power level.
- Listen for mcMMO XP and level events such as `McMMOPlayerXpGainEvent`, `McMMOPlayerPreXpGainEvent`, and `McMMOPlayerLevelUpEvent`.
- Query existing skill names through `SkillAPI`.

All of those APIs still validate against `PrimarySkillType`, so a string like `walking` or `swimming` is rejected unless mcMMO itself has that enum constant.

## Official API documentation watch

Official mcMMO API guide: https://wiki.mcmmo.org/en/api/mcmmo-api

This project already uses mcMMO's public `ExperienceAPI` reflectively for native power-level reads and the optional More-levels to native mcMMO-levels converter. The mcMMO maintainer indicated that the official API guide will be populated further, so treat that page as the primary documentation source to revisit before expanding mcMMO integration.

When the guide grows, compare its documented lifecycle, compatibility guarantees, events, and preferred access patterns against the reflected methods currently used here. Do not replace the standalone custom-skill model unless mcMMO eventually documents a supported extension point for registering new primary skills.

## Why patching mcMMO is brittle

Adding a real mcMMO skill would require touching at least:

- `PrimarySkillType` and probably `SubSkillType` / `SuperAbilityType`;
- `SkillTools` category lists and parent/child maps;
- `coreskills.yml`, `experience.yml`, `skillranks.yml`, `advanced.yml`, locale files, and `plugin.yml`;
- `PlayerProfile`, flat-file indices, SQL persisted skills, table creation, upgrades, leaderboards, and rank reads;
- commands and UI/scoreboard paths.

This is possible as a fork, but it is not the "drop in a new mcMMO jar and restart" upgrade path.

## April Fools skill notes

The current mcMMO tree still has `AprilFoolsEvent` config and a holiday locale line, but the April command/task are commented out and the old `HolidayManager` is deleted.

The old deleted implementation had fake skill names that are useful inspiration, not real persisted skills:

- Macho
- Jumping
- Throwing
- Wrecking
- Crafting
- Walking
- Swimming
- Falling
- Climbing
- Flying
- Diving
- Piggy

The old implementation used Bukkit statistics like walking/swimming/climbing distance to send joke level-up messages. It did not store real mcMMO XP for those fake skills.

## Collision notes

The `1MB-CMIAPI` PassportDiscovery feature already tracks movement/exploration concepts including walking, sneaking, running, swimming, jumping, mounts, and biomes. The add-on scaffold here avoids conflict by sampling player location once per second, never cancelling movement events, never writing metadata on players, and storing data under this plugin's own `playerdata/`.

The current direction is to keep this as a standalone jar and bridge into `1MB-CMIAPI-Lib` only for shared visibility and utilities that clearly reduce duplicate work.

## Scaffold status

This workspace now contains a standalone MVP:

- command: `/mcmmore`
- enabled parent skills by default: Exploration, Aquatics
- disabled-by-default examples: Airborne, Defense, Arcane, Husbandry, Action
- data: `plugins/1MB-mcMMO-More/playerdata/<uuid>.yml`
- anti-exploit rules: `plugins/1MB-mcMMO-More/anti-exploit.yml`
- movement sources feed parent skills, so running/sneaking/jumping/mounted travel feed Exploration and swimming/diving feed Aquatics
- event-backed sources can feed parent skills, so shield/hostile hits feed Defense, enchanting/anvil/grindstone transactions feed Arcane, and breeding/care-feeding events feed Husbandry when enabled
- movement anti-exploit rules include repeated-region, repeated-path, and cooldown tuning for source-specific loop control
- chat visuals use configurable Unicode skill icons while internal skill ids remain stable
- each parent skill can define simple 250/500/1000 milestone perks activated through `/mcmmore activate <skill>`
- XP and perk activation are survival-only, block vanished players, and can optionally block god mode outside testing
- no compile-time dependency on mcMMO internals
- optional reflective bridge into `1MB-CMIAPI-Lib` when that shared library is installed
- softdepend on `mcMMO`, `CMI`, `CMILib`, `1MB-CMIAPI-Lib`, and `PlaceholderAPI`
- target runtime: Paper 26.1.2+ with Java 25

Next test step: build the jar, put it next to mcMMO on the test server, move on land/water for a minute, and verify `/mcmmore stats`, `/mcmmore top`, `/mcmmore top exploration`, `/mcmmore help exploration`, `/mcmmore activate exploration`, `/mcmmore debug status`, `/mcmmore debug reload locale`, and reload/reset behavior.
