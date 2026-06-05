# Installation

## Runtime Jar Placement

Each feature is built as a separate Paper plugin jar. The shared library is also a separate Paper plugin jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory, so runtime jars should be placed next to CMI and CMILib:

```text
plugins/
  CMI-<version>.jar
  CMILib<version>.jar
  1MB-CMIAPI-LIB-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-AFKShrine-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-RecordingMode-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-SellStreaks-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-ScheduledTips-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Visit-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-PassportDiscovery-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-SocialGatherings-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-JourneyMap-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-KitStreaks-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-MessageFont-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Nick-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-EmoteMenu-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-PvPToggle-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Boosters-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-NameMC-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Trades-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-VoteTokens-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-DiscordChat-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-GameTypes-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-BirthdayLanterns-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-LavaBoots-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Spawners-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-MobHat-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-PlayerTodo-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Refer-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-TPAuto-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Menu-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-StaffCenter-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Profile-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-FilterLab-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-FilterGuard-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-WarningLens-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-NotableMsg-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-CmdCostDashboard-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-CMIConfig-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-ConsoleNoiseRouter-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-EconomyGuardian-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-StartupDoctor-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-UpdateSmoke-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-PluginVersions-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Potions-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Upgrade-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-EndCrystals-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-WorldSnapshot-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-SparkReviewer-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-Hoppers-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-EventRecorder-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-CMIProbe-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-CMIDatabase-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-PlaceholderProbe-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-CMIPlaceholderCheck-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-WarpAudit-v1.0.0-399-j25-26.1.2.jar
  1MB-CMIAPI-WorthDrift-v1.0.0-399-j25-26.1.2.jar
```

The common `1MB-CMIAPI-` prefix keeps the project jars together when sorted by filename.

Use `gradle syncBuiltJarsToProjectServer` for the repository-local Paper test server. After testing that exact folder, `gradle stageTestedJarsForLive` creates a clean `build/tested-jars/live/` handoff set for manual live deployment. The project does not use RCON for deployment.

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
    MessageFont/
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
    Trades/
      config.yml
      Translations/
      Trades/
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
    FilterLab/
      config.yml
    FilterGuard/
      config.yml
    WarningLens/
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
    CMIProbe/
      config.yml
    CMIDatabase/
      config.yml
    PlaceholderProbe/
      config.yml
    CMIPlaceholderCheck/
      config.yml
    WarpAudit/
      config.yml
    WorthDrift/
      config.yml
```

Cache data can be cleaned broadly. Player data is long-lived and should only be cleaned with explicit plugin-scoped commands.

Use dry-run first when cleaning one feature's section from shared playerdata:

```text
/1mbcmi debug clean playerdata plugin afkshrine --dry-run
/1mbcmi debug clean playerdata plugin afkshrine --confirm
```

## Local Project Test Server

When a jar is built, copy it into:

```text
servers/Paper-26.1.2/plugins/
```

This is the project-local test server. It is ignored by Git and can contain Paper, CMI, CMILib, worlds, configs, logs, and private data.

[Documentation index](README.md)
