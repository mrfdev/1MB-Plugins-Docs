# Installation

## Runtime Jar Placement

Each feature is built as a separate Paper plugin jar. The shared library is also a separate Paper plugin jar.

Paper loads normal plugin jars from the top-level server `/plugins/` directory, so runtime jars should be placed next to CMI and CMILib:

```text
plugins/
  CMI-<version>.jar
  CMILib<version>.jar
  1MB-CMIAPI-LIB-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-AntiFire-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-AFKShrine-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-RecordingMode-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-SellStreaks-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-ScheduledTips-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Visit-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-PassportDiscovery-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-SocialGatherings-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-JourneyMap-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-KitStreaks-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Nick-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-EmoteMenu-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-PvPToggle-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Boosters-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-NameMC-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Exchange-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-VoteTokens-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-DiscordChat-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-GameTypes-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-BirthdayLanterns-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-LavaBoots-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Spawners-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Collect-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-EventHunts-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-DropParty-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Appreciation-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Forage-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-AutoSell-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-MobHat-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-PlayerTodo-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Refer-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-TPAuto-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Menu-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-StaffCenter-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Profile-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-ContentGuard-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-WarningLens-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-TeamMsg-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-CmdCostDashboard-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-CMIConfig-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-ConsoleNoiseRouter-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-EconomyGuardian-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-StartupDoctor-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-UpdateSmoke-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-PluginVersions-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Placeholders-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Potions-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Upgrade-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-EndCrystals-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-WorldSnapshot-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-SparkReviewer-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-Hoppers-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-EventRecorder-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-BedrockChatBridge-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-CMIProbe-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-CMIDatabase-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-PermissionProbe-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-WarpAudit-v1.0.2-569-j25-26.2.jar
  1MB-CMIAPI-WorthDrift-v1.0.2-569-j25-26.2.jar
```

The common `1MB-CMIAPI-` prefix keeps the project jars together when sorted by filename.

`1MB-CMIAPI-EventHunts` is one host JAR for `/hunt`, `/coconut`, `/ghost`, and `/doors`; do not install a second Trick-or-Treat Doors JAR. Its canonical fresh module switches are Coconut off, Ghost on, and Doors off. The old Bukkit plugin name remains a declared compatibility alias, and the established `CoconutHunt` data/PDC/permission/placeholder namespaces are deliberately retained. A copied `plugins/OneMBTrickOrTreatDoors/` directory is migration input only: validate it with `/doors admin migrate standalone --dry-run`, confirm it with `--confirm`, keep Door Hunt dormant until the receipt and health checks pass, and retain the source as rollback material. The standalone and combined implementations must never be active together.

Build 561 consolidates four staff jars. Replace `1MB-CMIAPI-1MBStaffMsg` plus `1MB-CMIAPI-NotableMsg` with `1MB-CMIAPI-TeamMsg`, and replace `1MB-CMIAPI-FilterLab` plus `1MB-CMIAPI-FilterGuard` with `1MB-CMIAPI-ContentGuard`. Keep the existing module config and translation folders; the new parent jars import their previous enabled states. Never leave old and consolidated jars installed together because they own the same commands and listeners. MessageFont is retired and no longer has a release jar.

## First-Install Activation Policy

It is safe to place the complete current 1MB-CMIAPI jar set in the live server's top-level `plugins/` directory. First-install defaults are centrally controlled rather than left to each feature implementation.

These jars start enabled on a fresh installation:

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

Console, the feature's `onembcmi.<feature-id>.admin` permission, or `onembcmi.global.config.set` may use this control. It atomically persists `enabled: true|false` in `plugins/1MB-CMIAPI/<FeatureName>/config.yml`; a server restart is not required. The equivalent central command remains `/1mbcmi config set <feature-id> enabled <true|false>`.

This is a missing-value default, not an upgrade override. Existing `enabled: true` and `enabled: false` values are preserved. The project test server can therefore keep all of its existing beta features enabled while a fresh live installation fails closed. New feature ids also default to disabled until the live allowlist is deliberately updated and tested.

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
/1mbcmi debug clean playerdata plugin afkshrine --dry-run
/1mbcmi debug clean playerdata plugin afkshrine --confirm
```

## Local Project Test Server

When a jar is built, copy it into:

```text
servers/Paper-26.2/plugins/
```

This is the project-local test server. It is ignored by Git and can contain Paper, CMI, CMILib, worlds, configs, logs, and private data.

[Documentation index](README.md)
