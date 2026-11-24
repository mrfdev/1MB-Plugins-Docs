# Installation

## Runtime Jar Placement

Each feature is built as a separate Paper plugin jar. The shared library is also a separate Paper plugin jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory, so runtime jars should be placed next to CMI and CMILib:

```text
plugins/
  CMI-<version>.jar
  CMILib<version>.jar
  1MB-Lib-Core-v1.0.4-864-j25-26.3.jar
  1MB-Lib-AntiFire-v1.0.4-864-j25-26.3.jar
  1MB-Lib-AFKShrine-v1.0.4-864-j25-26.3.jar
  1MB-Lib-RecordingMode-v1.0.4-864-j25-26.3.jar
  1MB-Lib-SellStreaks-v1.0.4-864-j25-26.3.jar
  1MB-Lib-ScheduledTips-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Visit-v1.0.4-864-j25-26.3.jar
  1MB-Lib-PassportDiscovery-v1.0.4-864-j25-26.3.jar
  1MB-Lib-SocialGatherings-v1.0.4-864-j25-26.3.jar
  1MB-Lib-JourneyMap-v1.0.4-864-j25-26.3.jar
  1MB-Lib-KitStreaks-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Nick-v1.0.4-864-j25-26.3.jar
  1MB-Lib-EmoteMenu-v1.0.4-864-j25-26.3.jar
  1MB-Lib-PvPToggle-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Boosters-v1.0.4-864-j25-26.3.jar
  1MB-Lib-NameMC-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Exchange-v1.0.4-864-j25-26.3.jar
  1MB-Lib-VoteTokens-v1.0.4-864-j25-26.3.jar
  1MB-Lib-DiscordChat-v1.0.4-864-j25-26.3.jar
  1MB-Lib-BentoBox-v1.0.4-864-j25-26.3.jar
  1MB-Lib-BirthdayLanterns-v1.0.4-864-j25-26.3.jar
  1MB-Lib-LavaBoots-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Spawners-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Collect-v1.0.4-864-j25-26.3.jar
  1MB-Lib-EventHunts-v1.0.4-864-j25-26.3.jar
  1MB-Lib-DropParty-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Advent-v1.0.4-864-j25-26.3.jar
  1MB-Lib-HideAndSheep-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Appreciation-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Forage-v1.0.4-864-j25-26.3.jar
  1MB-Lib-AutoSell-v1.0.4-864-j25-26.3.jar
  1MB-Lib-MobHat-v1.0.4-864-j25-26.3.jar
  1MB-Lib-PlayerTodo-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Refer-v1.0.4-864-j25-26.3.jar
  1MB-Lib-TPAuto-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Menu-v1.0.4-864-j25-26.3.jar
  1MB-Lib-StaffCenter-v1.0.4-864-j25-26.3.jar
  1MB-Lib-ContentGuard-v1.0.4-864-j25-26.3.jar
  1MB-Lib-TeamMsg-v1.0.4-864-j25-26.3.jar
  1MB-Lib-CmdCostDashboard-v1.0.4-864-j25-26.3.jar
  1MB-Lib-CMIConfig-v1.0.4-864-j25-26.3.jar
  1MB-Lib-ConsoleNoiseRouter-v1.0.4-864-j25-26.3.jar
  1MB-Lib-EconomyGuardian-v1.0.4-864-j25-26.3.jar
  1MB-Lib-ServerCheck-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Placeholders-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Potions-v1.0.4-864-j25-26.3.jar
  1MB-Lib-Upgrade-v1.0.4-864-j25-26.3.jar
  1MB-Lib-EndCrystals-v1.0.4-864-j25-26.3.jar
  1MB-Lib-WorldSnapshot-v1.0.4-864-j25-26.3.jar
  1MB-Lib-EventRecorder-v1.0.4-864-j25-26.3.jar
  1MB-Lib-BedrockChatBridge-v1.0.4-864-j25-26.3.jar
  1MB-Lib-CMIProbe-v1.0.4-864-j25-26.3.jar
  1MB-Lib-CMIDatabase-v1.0.4-864-j25-26.3.jar
  1MB-Lib-PermissionProbe-v1.0.4-864-j25-26.3.jar
  1MB-Lib-WarpAudit-v1.0.4-864-j25-26.3.jar
  1MB-Lib-WorthAudit-v1.0.4-864-j25-26.3.jar
```

The common `1MB-Lib-` prefix keeps the project JARs together when sorted by filename.

`1MB-Lib-EventHunts-*` is one host JAR for `/hunt`, `/coconut`, `/ghost`, and `/doors`; do not install a second Trick-or-Treat Doors JAR. Its Paper plugin identity remains `1MB-CMIAPI-EventHunts`. Its canonical fresh module switches are Coconut off, Ghost on, and Doors off, and the established `CoconutHunt` data/PDC/permission/placeholder namespaces are deliberately retained. A copied `plugins/OneMBTrickOrTreatDoors/` directory is migration input only: validate it with `/doors admin migrate standalone --dry-run`, confirm it with `--confirm`, keep Door Hunt dormant until the receipt and health checks pass, and retain the source as rollback material. The standalone and combined implementations must never be active together.

Build 561 consolidated four legacy staff JARs. Remove the old `1MB-CMIAPI-1MBStaffMsg`, `1MB-CMIAPI-NotableMsg`, `1MB-CMIAPI-FilterLab`, and `1MB-CMIAPI-FilterGuard` artifacts; their current replacements are `1MB-Lib-TeamMsg-*` and `1MB-Lib-ContentGuard-*`. Keep the existing module config and translation folders because the parent plugins import their previous enabled states. Never leave old and consolidated JARs installed together because they own the same commands and listeners. MessageFont is retired and no longer has a release JAR.

## First-Install Activation Policy

After the complete set has passed the dual-prefix deployment and runtime gates, it is safe to place the complete 1MB Library JAR set in the live server's top-level `plugins/` directory. First-install defaults are centrally controlled rather than left to each feature implementation.

These compatibility Paper plugin identities start enabled on a fresh installation; their v1.0.3 artifact filenames use the `1MB-Lib-*` family shown above:

- `1MB-CMIAPI-LIB`
- `1MB-CMIAPI-Placeholders`
- `1MB-CMIAPI-TeamMsg`
- `1MB-CMIAPI-AFKShrine`
- `1MB-CMIAPI-AntiFire`
- `1MB-CMIAPI-AutoSell`
- `1MB-CMIAPI-BedrockChatBridge`
- `1MB-CMIAPI-Boosters`
- `1MB-CMIAPI-EventHunts`
- `1MB-CMIAPI-EmoteMenu`
- `1MB-CMIAPI-EndCrystals`
- `1MB-CMIAPI-Exchange`
- `1MB-CMIAPI-BentoBox`
- `1MB-CMIAPI-Menu`
- `1MB-CMIAPI-MobHat`
- `1MB-CMIAPI-NameMC`
- `1MB-CMIAPI-PlayerTodo`
- `1MB-CMIAPI-ServerCheck`
- `1MB-CMIAPI-StaffCenter`
- `1MB-CMIAPI-PvPToggle`
- `1MB-CMIAPI-RecordingMode`
- `1MB-CMIAPI-Visit`
- `1MB-CMIAPI-VoteTokens`
- `1MB-CMIAPI-WorthAudit`

All other feature jars create `config.yml` with `enabled: false` on first install. Paper keeps those jars loaded and shows them in green under `/plugins`, while their gameplay commands, listeners, scheduled tasks, placeholders, services, and integrations remain dormant. The only remaining command surface is `info`, `help`, safe shared `debug`, and the admin lifecycle control.

Activate or dormant a feature live with:

```text
/<feature-command> debug enable true
/<feature-command> debug enable false
```

Console, the feature's `onembcmi.<feature-id>.admin` permission, or `onembcmi.global.config.set` may use this control. It atomically persists `enabled: true|false` in `plugins/1MB-CMIAPI/<FeatureName>/config.yml`; a server restart is not required. The equivalent central command remains `/1mblib config set <feature-id> enabled <true|false>`.

BentoBox keeps host activation in `BentoBox/host.yml`. A fresh installation starts GameTypes menus and leaves island markets, merchants, events, and other optional island modules dormant.

ServerCheck imports the Hoppers and SparkReviewer activation settings into `ServerCheck/config.yml`. A fresh installation starts PluginVersions and Hoppers. UpdateSmoke, StartupDoctor, and SparkReviewer start dormant.

StaffCenter keeps host activation in `StaffCenter/host.yml`. A fresh installation activates Profile and leaves the dashboard and WarningLens dormant.

This is a missing-value default, not an upgrade override. Existing `enabled: true` and `enabled: false` values are preserved. The project test server can therefore keep all of its existing beta features enabled while a fresh live installation fails closed. New feature ids also default to disabled until the live allowlist is deliberately updated and tested.

Use `gradle planProjectJarSync` first to validate the complete current candidate set and report how many legacy/current active files would be replaced without mutating the server. With Paper stopped, `gradle syncBuiltJarsToProjectServer` recoverably replaces both `1MB-CMIAPI-*` and `1MB-Lib-*` families as one set. After testing that exact server folder, `gradle stageTestedJarsForLive` creates a verified `build/tested-jars/live/` handoff set for manual live deployment. The staging task refuses legacy, stale, incomplete, unexpected, or duplicate identity sets and preserves the previous handoff on failure. The project does not use RCON for deployment.

## Hide and Sheep

The `1MB-Lib-HideAndSheep-*` artifact belongs to the complete suite. Its Paper identity is `1MB-CMIAPI-HideAndSheep`, with `1MB-Lib-HideAndSheep` provided as the bridge alias. Keep it dormant on first live install. Its `/sheep` status/book view and permission-gated preparation remain available while dormant; event gameplay and reward delivery stay closed.

The Shared Library, CMI and CMILib are required. LuckPerms is required for round participation: the plugin creates the reserved `hideandsheep_playing` restriction subgroup when a player joins. Keep that group dedicated to this feature; do not inherit it from permanent ranks. DiscordChat, AFKShrine, AutoSell, and Appreciation provide optional point exchanges. **All item kits require active Forage's reviewed inventory save-proof service**, as well as CMI kit templates. This storage integration does not require the player to own or visit a Forage Camp. Do not enable Forage automatically merely to install Hide and Sheep; preserve its independently reviewed activation state.

Copy the reviewed `config/cmi/kits/hideandseek.yml` into `plugins/CMI/Kits/` and load it through CMI's normal configuration workflow. These five item-only templates deliberately disable ordinary `/kit` access. Suite JAR synchronization does not install this configuration file or overwrite live CMI files.

Map `rewards.worlds.<role>` to actual server worlds for `end`, `nether`, `wild`, `general`, `cave`, `acid`, `oneblock`, `skyblock`, `skygrid`, and `chunkblock`. Test-world names can differ from production names. The event itself may run in any prepared loaded world.

```text
/sheep admin setspawn
/sheep admin radius 100
/sheep admin preset pocket_prism
/sheep admin enable
/sheep admin status
/sheep admin start
```

Set the spawn in game while standing at a safe arrival point. Start can then come from the admin GUI, in-game command, or direct console. Enabling does not start an event. Players must join each round before sheep touches count. Preserve `plugins/1MB-CMIAPI/HideAndSheep/state.yml`, `participation.yml` and the corresponding provider journals; they contain progression, participation recovery and reward evidence. `/sheep debug cleanup <uuid|player>` repairs stale participation and removes the event subgroup without erasing points or ordinary ranks. See the [staff reference](plugins/hideandsheep.md) for kit-save verification and reconciliation.

## Upgrade to ServerCheck and WorthAudit

WorthAudit replaced WorthHelper and WorthDrift in suite build 860. ServerCheck replaced PluginVersions, UpdateSmoke, and StartupDoctor in build 861.

1. Stop Paper. Keep a rollback copy of the previous complete suite and back up `plugins/1MB-CMIAPI/`.
2. Install one complete tested suite. Move the standalone `1MB-Lib-PluginVersions-*`, `1MB-Lib-UpdateSmoke-*`, `1MB-Lib-StartupDoctor-*`, `1MB-Lib-WorthHelper-*`, and `1MB-Lib-WorthDrift-*` JARs out of the plugin load path. Remove any equivalent older `1MB-CMIAPI-*` JARs from that path as well.
3. Keep the existing `PluginVersions/`, `UpdateSmoke/`, `StartupDoctor/`, `WorthHelper/`, and `WorthDrift/` data directories under `plugins/1MB-CMIAPI/`, along with shared translations and reports. Keep the PluginVersions database and exports at their configured locations.
4. After restart, check `/servercheck status` and `/worthaudit status` for the imported module states. Run `/servercheck smoke run` when ready to exercise the configured post-update checks.
5. Update saved `/worthhelper` and `/worthdrift` commands to `/worthaudit`. ServerCheck accepts the existing `/pv`, `/updatesmoke`, `/usmoke`, `/startupdoctor`, and `/sdoctor` roots.

For rollback, stop Paper and restore the previous complete suite. See [ServerCheck](plugins/servercheck.md) and [WorthAudit](plugins/worthaudit.md) for configuration, permission, and command details.

## Upgrade Hoppers and SparkReviewer to ServerCheck

1. Stop Paper and keep a rollback copy of the previous complete suite.
2. Install the complete tested suite containing the updated `1MB-Lib-ServerCheck`. Move the standalone `1MB-Lib-Hoppers-*` and `1MB-Lib-SparkReviewer-*` JARs and any older equivalent `1MB-CMIAPI-*` artifacts out of the plugin load path.
3. Keep `Hoppers/config.yml`, `SparkReviewer/config.yml`, their translations, and the `CMIAPILIB/cache/plugins/hoppers/` and `CMIAPILIB/cache/plugins/sparkreviewer/` evidence directories under `plugins/1MB-CMIAPI/`. ServerCheck imports the old enabled values into `modules.hoppers.enabled` and `modules.sparkreviewer.enabled` in `ServerCheck/config.yml` when those keys are first created.
4. Restart Paper and check `/servercheck status`, `/servercheck hoppers status`, and `/servercheck spark status`. The old `/_hoppers`, `/sparkreviewer`, `/sreview`, and `/spreview` commands remain available.

For rollback, stop Paper and restore the previous complete suite. See [ServerCheck](plugins/servercheck.md) for module controls and profiling permissions.

## Upgrade to the combined StaffCenter

1. Stop Paper. Back up the previous complete suite and the existing `plugins/1MB-CMIAPI/` data.
2. Install the complete tested suite containing the updated `1MB-Lib-StaffCenter`. Move standalone `1MB-Lib-Profile-*` and `1MB-Lib-WarningLens-*` JARs, including any equivalent older `1MB-CMIAPI-*` artifacts, out of the plugin load path.
3. Keep `StaffCenter/config.yml`, `Profile/config.yml`, `WarningLens/config.yml`, the shared `CMIAPILIB/playerdata/` files, the existing translations, and the cache reports. The new `StaffCenter/host.yml` imports the module switches from the existing configuration on first startup.
4. After restart, check `/staffcenter modules` and exercise an authorized command in each module that should be active. Saved `/profile`, `/warninglens`, and `/wlens` shortcuts remain compatible. Use `/staffcenter profile` and `/staffcenter warnings` in new commands.

For rollback, stop Paper and restore the previous complete suite. The standalone plugins continue to read their original configuration files. If you changed module switches since the upgrade, review the standalone `enabled` settings before the rollback start. See [StaffCenter](plugins/staffcenter.md) for commands and data paths.

## Upgrade to the combined BentoBox

1. Stop Paper. Keep a rollback copy of the previous complete suite and back up the existing 1MB Library data and the third-party BentoBox data.
2. Install the complete tested suite containing the updated `1MB-Lib-BentoBox`. Move the standalone `1MB-Lib-GameTypes-*` JAR and any older equivalent `1MB-CMIAPI-GameTypes-*` JAR out of the plugin load path. Keep the third-party BentoBox JAR and its addons installed.
3. Keep `BentoBox/config.yml`, `BentoBox/islands.sqlite` and any SQLite companion files, `GameTypes/config.yml`, and the existing translations under `plugins/1MB-CMIAPI/`. Preserve the matching worlds, inventories, currency and reward records. The new `BentoBox/host.yml` imports the two legacy activation switches on first startup.
4. After restart, verify the imported states with `/1mbbento status`. From a player account, open `/oneblock menu`, `/cave menu`, and the other installed island menu shortcuts as well as `/gametype`. Optional island modules keep their existing settings and activation.

For rollback, stop Paper and restore the previous complete suite. The old JARs read their original config files. Review the legacy `enabled` values if you changed either module switch after the upgrade. See the [BentoBox staff guide](plugins/bentobox.md) for activation, permissions, and data paths.

## Runtime Data

Runtime data should be stored under one central folder:

```text
plugins/
  1MB-CMIAPI/
    CMIAPILIB/
      config.yml
      database/
      translations/
      cache/
      debug/
      playerdata/
    AntiFire/
      config.yml
    BentoBox/
      host.yml
      config.yml
      islands.sqlite
    GameTypes/
      config.yml
    AFKShrine/
      config.yml
    RecordingMode/
      config.yml
    SellStreaks/
      config.yml
    ScheduledTips/
      config.yml
    Visit/
      config.yml
    PassportDiscovery/
      config.yml
    SocialGatherings/
      config.yml
      parties/
        campfire.yml
        sleepover.yml
        dinner.yml
        beach.yml
        hatparty.yml
        sneakparty.yml
        danceparty.yml
        parachuteparty.yml
        balloonride.yml
        cookout.yml
    JourneyMap/
      config.yml
    KitStreaks/
      config.yml
    Nick/
      config.yml
      rules.yml
      presets/
      logs/
    LavaBoots/
      config.yml
    Spawners/
      config.yml
      stock.yml
    CoconutHunt/
      config.yml
      events.yml
      rewards.yml
      coconuts.yml
      state.yml
      reports/
      Doors/
        config.yml
        doors.yml
        runtime-state.yml
        seasons.yml
        progression.yml
        special-rewards.yml
        tricks-and-treats.yml
        translations/
        reports/
        migration/
    AutoSell/
      config.yml
      data.yml
      exports/
      players/
      exports/
      logs/
    EmoteMenu/
      config.yml
    PvPToggle/
      config.yml
    Boosters/
      config.yml
    NameMC/
      config.yml
      playerdata/
    Exchange/
      config.yml
      Translations/
      Exchanges/
      playerData/
      logs/
    MobHat/
      config.yml
    PlayerTodo/
      config.yml
    Refer/
      config.yml
    TPAuto/
      config.yml
    Menu/
      config.yml
    StaffCenter/
      host.yml
      config.yml
    Profile/
      config.yml
    ContentGuard/
      config.yml
    FilterLab/
      config.yml
    FilterGuard/
      config.yml
    WarningLens/
      config.yml
    TeamMsg/
      config.yml
    1MBStaffMsg/
      config.yml
    NotableMsg/
      config.yml
    CmdCostDashboard/
      config.yml
    CMIConfig/
      config.yml
    ConsoleNoiseRouter/
      config.yml
    EconomyGuardian/
      config.yml
    ServerCheck/
      config.yml
    StartupDoctor/
      config.yml
    UpdateSmoke/
      config.yml
    PluginVersions/
      config.yml
      plugins-database.yml
      exports/
    Placeholders/
      config.yml
    PlaceholderHealth/
      config.yml
      reports/
    Potions/
      config.yml
    EndCrystals/
      config.yml
    WorldSnapshot/
      config.yml
    SparkReviewer/
      config.yml
    Hoppers/
      config.yml
    EventRecorder/
      config.yml
    BedrockChatBridge/
      config.yml
    CMIProbe/
      config.yml
    CMIDatabase/
      config.yml
    PlaceholderProbe/
      config.yml
    PermissionProbe/
      config.yml
    CMIPlaceholderCheck/
      config.yml
    1MBPlaceholders/
      config.yml
    WarpAudit/
      config.yml
    WorthAudit/
      config.yml
    WorthHelper/
      config.yml
    WorthDrift/
      config.yml
      data.yml
```

Cache data can be cleaned broadly. Player data is long-lived and should only be cleaned with explicit plugin-scoped commands.

Use dry-run first when cleaning one feature's section from shared playerdata:

```text
/1mblib debug clean playerdata plugin afkshrine --dry-run
/1mblib debug clean playerdata plugin afkshrine --confirm
```

## Local Project Test Server

Use `servers/Paper-26.3/` as the sole maintained project-local test server. Stop it and run `scripts/build-all.sh` for a new suite-wide numbered build; the canonical workflow verifies the runtime and deploys the complete managed JAR set into:

```text
servers/Paper-26.3/plugins/
```

Focused module JARs are development feedback, not deployable handoffs. See [compiling](compiling.md) for complete-set preflight, recoverable repair/redeployment and manual live staging. The test server is ignored by Git and can contain Paper, CMI, CMILib, worlds, configs, logs and private data. Retired Forage 26.3 and Paper 26.2 instances belong intact under `archive/servers/2026-10-19/`; do not use those archives as current deployment targets.

[Documentation index](README.md)

## Fireworks

Install the complete suite build including `1MB-Lib-Fireworks`, with Core, CMI and CMILib. Fireworks starts dormant. Configure protected/approved worlds before activation, explicitly grant its admin permission, and review coexistence before enabling native testing alongside UltimateFireworks. No legacy formats are guessed. See the [installation and migration guide](plugins/fireworks.md).
