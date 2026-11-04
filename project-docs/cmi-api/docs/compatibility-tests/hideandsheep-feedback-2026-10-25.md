# Hide and Sheep player-feedback update, 25 October 2026

## Scope

Suite **813** implements the live gameplay feedback for Woolbur: more decoys, three reusable round profiles, count-based decoy rewards, bounded search hints, two more costume sizes, and a readable story book. Work and verification took place on the maintained local Paper server. The live server and its customized CMI kits were not accessed or changed. This build has not been staged for live handoff.

## Resulting behavior

- Decoy counts support **1–16**. Each round freezes its reward rate from its initial count: 1–2 decoys pay 5 points each; 3–4 pay 4; 5–8 pay 3; 9–12 pay 2; 13–16 pay 1. Clearing sheep never changes the rate for those remaining. Every distinct decoy still pays once globally.
- Saved setups includes `normal_regular` (120-second gathering, radius 128, twelve decoys, 360-second search, 100 first-place points, scale 0.75), `speedrun` (45, 60, two, 120, 200, 2.0), and `difficulty_high` (120, 256, sixteen, 240, 500, 0.5). Built-ins use the current arrival point. Reset restores normal-regular rules without changing arrival, enablement, reward-world mappings, offers, progression, or named setups. Existing configurations retain their preparation until staff deliberately load a preset or reset.
- Search reminders use applicable 120/60/30/10-second thresholds. An eligible unfound player within 32 blocks can receive a quiet private baa after the first ten search seconds, with a 45-second cooldown and a maximum of three cues per round. The cue plays at the listener so it remains audible throughout the allowed radius.
- The real Woolbur glows while finder places remain for the final **5%** of search time, rounded up and clamped to **5–30 seconds**. Speedrun/High Difficulty/Normal Regular therefore use 6/12/18 seconds. Decoys do not glow.
- The eight costumes include **Micro Mischief, scale 0.5**, and **Mighty Woolbur, scale 2.0**. Existing costume IDs remain available.
- The book now uses **twenty pages**, with explicit word wrapping bounded to 110 default-font pixels and twelve rendered rows per page, including headings and blank lines. The layout regression checks cover every page; content is not silently truncated.

## Build and automated verification

`scripts/build-all.sh` completed the canonical suite build in **4 minutes 36 seconds**. It selected the newly available **Paper 26.3 STABLE build 223**, aligned `paperApiVersion=26.3.build.223-stable`, and synchronized all **67** managed JARs to the maintained test server. All 67 hashes match the built artifacts; all are active, with zero deliberately disabled artifacts in this local set. Packaged classes retain Java 25-compatible bytecode.

- **7,186 cases** across **562 suites**: **7,145 passed**, **41 existing optional-fixture skips**, **zero failures/errors**.
- Hide and Sheep: **319 tests passed**, zero skips/failures/errors.
- Gradle/compiler: Oracle **25.0.5.0.3+1-LTS-2**, `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`, release target **25**.
- Automated tests and native runtime: Oracle **27.0.1.0.3+1-2**, `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.

These are recorded installations, not hardcoded workflow requirements: `scripts/gradle-oracle.sh` resolves and validates installed Oracle 25/27 paths on each invocation and disables automatic JDK downloads.

The final `verifyBuildMetadata` check also passed.

## Paper 222 to 223 review

The official [222 to 223 comparison](https://github.com/PaperMC/Paper/compare/e3ba7b1dc801e0c385051c34781ab30b226abee3...e415f5e030435d3108d7b623b41b9e47901e9d12) contains one semantic change: do not refresh entity data after removal. All **2,358 API class entries** are byte-identical; only `apiVersioning.json` changes. Maven dependency declarations and configuration defaults are unchanged. Current official roadmap, scheduling, book, sound, and configuration guidance were reviewed, with exact build-223 source used because hosted 26.3 Javadocs still identified build 219.

The local server JAR matches the [official build-223 checksum](https://fill.papermc.io/v3/projects/paper/versions/26.3/builds/223): `f8e684a4fef2a8b46d03aac049b49d59275e9ce5367dba7c6075cb5780f38470`. No compatibility blocker was found in that review; native verification remains a separate gate.

## Native startup and diagnostics

The maintained test server started on Oracle 27 with Paper 223, all 67 suite artifacts, **CMI 9.8.11.0**, and **CMILib 1.6.1.0**. The first captured run also shut down cleanly.

- UpdateSmoke: **565 pass / 0 warning / 0 failure / 1 skip row**; all five placeholder samples resolved. The skip is its existing 400-command dispatch cap. The remaining fourteen read-only feature diagnostics were subsequently executed and returned their feature debug headers, captured in `runtime-second-start.log`.
- StartupDoctor: all **15 Paper safety checks passed**, zero safety warnings/failures. Four existing orphan-data warnings remain for McMMOMore, MessageFont, TablistGroupSorter, and WarpPassport.
- CMIProbe retains its existing command-list warning for the obsolete `placeholderprobe` entry. The actual `_placeholders` command and UpdateSmoke placeholder checks remain available.

## Data preservation

The local ledger migrated from schema **4 to 5**. Compared with the pre-build backup, all statistics and balances for its one player, all ten historical events, and its one reward claim are unchanged except the added frozen decoy fields. Every older event retains three-point decoy semantics and its original decoy identities. The player's lifetime earned total remains **303**, with **268** spendable points.

The local feature configuration is semantically unchanged. Its serialized bytes changed, so byte-for-byte equality is not claimed. The CMI `hideandseek.yml` kit file is byte-identical. No live kit customization was overwritten. Schema 5 requires a matching data snapshot for rollback; an older JAR alone cannot read the upgraded ledger safely.

## Native presentation probe and final acceptance

The final disposable probe completed **345 checks with zero limitations** on Paper 223 and Oracle 27. Native sheep attributes and bounding-box ratios matched scales **0.5** and **2.0**, while decoys remained **1.0**. It verified target-only glow, matching animation, hidden Dinnerbone names on a real detached scoreboard, private Woolbur text displays and cleanup, all twenty book pages, all three round profiles, and all sixteen decoy-count payout cases. The native entities reached age three in an `ENTITY_TICKING` chunk before geometry assertions ran.

Earlier fixture failures are preserved in `native-probe/`: the first assumed the vanilla spawn chunk was loaded; later versions inspected dimensions before actual entity ticking. The corrected fixture matches the production pre-spawn consumer, loads only an existing arena chunk, records entity age and chunk state, and waits a bounded time for native ticks. Original geometry assertions remained intact. No production workaround was introduced for those fixture errors.

The successful final run completed startup at **17:02:58 Europe/Amsterdam** without ERROR, SEVERE, or exception entries, and subsequently shut down cleanly. Its temporary sheep, displays, scoreboard teams, and chunk ticket were removed; the probe JAR and exact remapped cache were removed after shutdown. Port **22332 is closed** and the maintained server is **stopped**. No player connected, no real round started, no reward was delivered, and no blocks were changed by the probe. Final evidence is in `runtime-final-probe.log`, `runtime-final.json`, and `native-probe/runtime-result.txt`.

Actual connected Java/Bedrock acceptance remains separate: review every book page, the audible hint cadence, the late glow, larger/smaller sheep interaction geometry, built-in setup selection/reset, and customized live reward previews. Automated tests and console diagnostics do not establish those visual gameplay outcomes.

## Documentation publication

Local staff, player, command, and private developer documentation was updated. Published documentation synchronization remains outstanding: the read-only sync check found 63 pre-existing local changes in the separate `1MB-Plugins-Docs` repository, a stale mirror relative to private commit `00fad5c5`, and an unrelated missing `forage-camp-technical.md` generation input. That repository was not changed. See `public-docs-drift.log`; the publication check is not reported as passing.

## Evidence

Local evidence is under `.scratch/hideandsheep-feedback-2026-10-25/`: `build-all.log`, `verification-813.json`, `toolchains.log`, `paper223-review.md` and upstream snapshots, `data-preservation-813.json`, `runtime-first-start.log`, `runtime-second-start.log`, `runtime-final-probe.log`, `runtime-final.json`, `remaining-readonly-commands.txt`, `public-docs-drift.log`, the pre-change `before/` backup, and the native probe's source/results. Historical build-812 reports remain unchanged.
