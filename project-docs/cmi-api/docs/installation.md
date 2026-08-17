# Installation

## Runtime Jar Placement

Each feature is built as a separate Paper plugin jar. The shared library is also a separate Paper plugin jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory, so runtime jars should be placed next to CMI and CMILib:

```text
plugins/
  CMI-<version>.jar
  CMILib<version>.jar
  1MB-Lib-Core-v1.0.3-578-j25-26.2.jar
  1MB-Lib-AntiFire-v1.0.3-578-j25-26.2.jar
  1MB-Lib-AFKShrine-v1.0.3-578-j25-26.2.jar
  1MB-Lib-RecordingMode-v1.0.3-578-j25-26.2.jar
  1MB-Lib-SellStreaks-v1.0.3-578-j25-26.2.jar
  1MB-Lib-ScheduledTips-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Visit-v1.0.3-578-j25-26.2.jar
  1MB-Lib-PassportDiscovery-v1.0.3-578-j25-26.2.jar
  1MB-Lib-SocialGatherings-v1.0.3-578-j25-26.2.jar
  1MB-Lib-JourneyMap-v1.0.3-578-j25-26.2.jar
  1MB-Lib-KitStreaks-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Nick-v1.0.3-578-j25-26.2.jar
  1MB-Lib-EmoteMenu-v1.0.3-578-j25-26.2.jar
  1MB-Lib-PvPToggle-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Boosters-v1.0.3-578-j25-26.2.jar
  1MB-Lib-NameMC-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Exchange-v1.0.3-578-j25-26.2.jar
  1MB-Lib-VoteTokens-v1.0.3-578-j25-26.2.jar
  1MB-Lib-DiscordChat-v1.0.3-578-j25-26.2.jar
  1MB-Lib-GameTypes-v1.0.3-578-j25-26.2.jar
  1MB-Lib-BirthdayLanterns-v1.0.3-578-j25-26.2.jar
  1MB-Lib-LavaBoots-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Spawners-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Collect-v1.0.3-578-j25-26.2.jar
  1MB-Lib-EventHunts-v1.0.3-578-j25-26.2.jar
  1MB-Lib-DropParty-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Appreciation-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Forage-v1.0.3-578-j25-26.2.jar
  1MB-Lib-AutoSell-v1.0.3-578-j25-26.2.jar
  1MB-Lib-MobHat-v1.0.3-578-j25-26.2.jar
  1MB-Lib-PlayerTodo-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Refer-v1.0.3-578-j25-26.2.jar
  1MB-Lib-TPAuto-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Menu-v1.0.3-578-j25-26.2.jar
  1MB-Lib-StaffCenter-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Profile-v1.0.3-578-j25-26.2.jar
  1MB-Lib-ContentGuard-v1.0.3-578-j25-26.2.jar
  1MB-Lib-WarningLens-v1.0.3-578-j25-26.2.jar
  1MB-Lib-TeamMsg-v1.0.3-578-j25-26.2.jar
  1MB-Lib-CmdCostDashboard-v1.0.3-578-j25-26.2.jar
  1MB-Lib-CMIConfig-v1.0.3-578-j25-26.2.jar
  1MB-Lib-ConsoleNoiseRouter-v1.0.3-578-j25-26.2.jar
  1MB-Lib-EconomyGuardian-v1.0.3-578-j25-26.2.jar
  1MB-Lib-StartupDoctor-v1.0.3-578-j25-26.2.jar
  1MB-Lib-UpdateSmoke-v1.0.3-578-j25-26.2.jar
  1MB-Lib-PluginVersions-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Placeholders-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Potions-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Upgrade-v1.0.3-578-j25-26.2.jar
  1MB-Lib-EndCrystals-v1.0.3-578-j25-26.2.jar
  1MB-Lib-WorldSnapshot-v1.0.3-578-j25-26.2.jar
  1MB-Lib-SparkReviewer-v1.0.3-578-j25-26.2.jar
  1MB-Lib-Hoppers-v1.0.3-578-j25-26.2.jar
  1MB-Lib-EventRecorder-v1.0.3-578-j25-26.2.jar
  1MB-Lib-BedrockChatBridge-v1.0.3-578-j25-26.2.jar
  1MB-Lib-CMIProbe-v1.0.3-578-j25-26.2.jar
  1MB-Lib-CMIDatabase-v1.0.3-578-j25-26.2.jar
  1MB-Lib-PermissionProbe-v1.0.3-578-j25-26.2.jar
  1MB-Lib-WarpAudit-v1.0.3-578-j25-26.2.jar
  1MB-Lib-WorthDrift-v1.0.3-578-j25-26.2.jar
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
- `1MB-CMIAPI-GameTypes`
- `1MB-CMIAPI-Hoppers`
- `1MB-CMIAPI-Menu`
- `1MB-CMIAPI-MobHat`
- `1MB-CMIAPI-NameMC`
- `1MB-CMIAPI-PlayerTodo`
- `1MB-CMIAPI-PluginVersions`
- `1MB-CMIAPI-Profile`
- `1MB-CMIAPI-PvPToggle`
- `1MB-CMIAPI-RecordingMode`
- `1MB-CMIAPI-Visit`
- `1MB-CMIAPI-VoteTokens`
- `1MB-CMIAPI-WorthDrift`
- `1MB-CMIAPI-WorthHelper`

All other feature jars create `config.yml` with `enabled: false` on first install. Paper keeps those jars loaded and shows them in green under `/plugins`, while their gameplay commands, listeners, scheduled tasks, placeholders, services, and integrations remain dormant. The only remaining command surface is `info`, `help`, safe shared `debug`, and the admin lifecycle control.

Activate or dormant a feature live with:

```text
/<feature-command> debug enable true
/<feature-command> debug enable false
```

Console, the feature's `onembcmi.<feature-id>.admin` permission, or `onembcmi.global.config.set` may use this control. It atomically persists `enabled: true|false` in `plugins/1MB-CMIAPI/<FeatureName>/config.yml`; a server restart is not required. The equivalent central command remains `/1mblib config set <feature-id> enabled <true|false>`.

This is a missing-value default, not an upgrade override. Existing `enabled: true` and `enabled: false` values are preserved. The project test server can therefore keep all of its existing beta features enabled while a fresh live installation fails closed. New feature ids also default to disabled until the live allowlist is deliberately updated and tested.

Use `gradle planProjectJarSync` first to validate the complete v1.0.3 candidate set and report how many legacy/current active files would be replaced without mutating the server. With Paper stopped, `gradle syncBuiltJarsToProjectServer` recoverably replaces both `1MB-CMIAPI-*` and `1MB-Lib-*` families as one set. After testing that exact server folder, `gradle stageTestedJarsForLive` creates a verified `build/tested-jars/live/` handoff set for manual live deployment. The staging task refuses legacy, stale, incomplete, unexpected, or duplicate identity sets and preserves the previous handoff on failure. The project does not use RCON for deployment.

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
    WorthDrift/
      config.yml
```

Cache data can be cleaned broadly. Player data is long-lived and should only be cleaned with explicit plugin-scoped commands.

Use dry-run first when cleaning one feature's section from shared playerdata:

```text
/1mblib debug clean playerdata plugin afkshrine --dry-run
/1mblib debug clean playerdata plugin afkshrine --confirm
```

## Local Project Test Server

When a jar is built, copy it into:

```text
servers/Paper-26.2/plugins/
```

This is the project-local test server. It is ignored by Git and can contain Paper, CMI, CMILib, worlds, configs, logs, and private data.

[Documentation index](README.md)
