# Documentation Index

This directory contains the long-form documentation for the 1MB CMIAPI project.

## Main Pages

- [Resources](resources.md)
- [Installation](installation.md)
- [Compile Instructions](compiling.md)
- [Commands](commands.md)
- [Permissions](permissions.md)
- [Placeholders](placeholders.md)
- [Features](features.md)
- [Hopper Testing Plan](hopper-testing-plan.md)
- [Hopper Settings Guide](hopper-settings-guide.md)
- [Plugin Metadata And Debug Output](plugin-metadata.md)
- [Release Process](release.md)
- [Credits](credits.md)
- [Development Rules](development-rules.md)

## Quick Paths

For server owners:

- start with [Installation](installation.md)
- check [Commands](commands.md), [Permissions](permissions.md), and [Placeholders](placeholders.md)
- use [Features](features.md) to jump to each plugin page

For developers:

- start with [Development Rules](development-rules.md)
- check [Plugin Metadata And Debug Output](plugin-metadata.md)
- keep [Release Process](release.md) current when the build number changes

For support/debugging:

- run `/1mbcmi doctor`
- run `/1mbcmi debug cmi`
- run `/1mbcmi debug plugin <id> all`

## Plugin Pages

- [Plugin Index](plugins/README.md)
- [1MB-CMIAPI-Lib](plugins/1mb-cmiapi-lib.md)
- [AFKShrine](plugins/afkshrine.md)
- [RecordingMode](plugins/recordingmode.md)
- [SellStreaks](plugins/sellstreaks.md)
- [ScheduledTips](plugins/scheduledtips.md)
- [Visit](plugins/visit.md)
- [PassportDiscovery](plugins/passportdiscovery.md)
- [SocialGatherings](plugins/socialgatherings.md)
- [JourneyMap](plugins/journeymap.md)
- [KitStreaks](plugins/kitstreaks.md)
- [MessageFont](plugins/messagefont.md)
- [Nick](plugins/nick.md)
- [EmoteMenu](plugins/emotemenu.md)
- [PvPToggle](plugins/pvptoggle.md)
- [Boosters](plugins/boosters.md)
- [NameMC](plugins/namemc.md)
- [Trades](plugins/trades.md)
- [VoteTokens](plugins/votetokens.md)
- [DiscordChat](plugins/discordchat.md)
- [GameTypes](plugins/gametypes.md)
- [BirthdayLanterns](plugins/birthdaylanterns.md)
- [MobHat](plugins/mobhat.md)
- [PlayerTodo](plugins/todo.md)
- [Refer](plugins/refer.md)
- [TPAuto](plugins/tpauto.md)
- [Menu](plugins/menu.md)
- [StaffCenter](plugins/staffcenter.md)
- [Profile](plugins/profile.md)
- [FilterLab](plugins/filterlab.md)
- [FilterGuard](plugins/filterguard.md)
- [WarningLens](plugins/warninglens.md)
- [NotableMsg](plugins/notablemsg.md)
- [1MBStaffMsg](plugins/staffmsg.md)
- [CmdCostDashboard](plugins/cmdcostdashboard.md)
- [CMIConfig](plugins/cmiconfig.md)
- [ConsoleNoiseRouter](plugins/consolenoiserouter.md)
- [EconomyGuardian](plugins/economyguardian.md)
- [StartupDoctor](plugins/startupdoctor.md)
- [UpdateSmoke](plugins/updatesmoke.md)
- [PluginVersions](plugins/pluginversions.md)
- [Potions](plugins/potions.md)
- [Upgrade](plugins/upgrade.md)
- [EndCrystals](plugins/endcrystals.md)
- [WorldSnapshot](plugins/worldsnapshot.md)
- [SparkReviewer](plugins/sparkreviewer.md)
- [Hoppers](plugins/hoppers.md)
- [Hoppers Roadmap](plugins/hoppers-roadmap.md)
- [WarpAudit](plugins/warpaudit.md)
- [WorthDrift](plugins/worthdrift.md)
- [WorthHelper](plugins/worthhelper.md)
- [EventRecorder](plugins/eventrecorder.md)
- [CMIProbe](plugins/cmiprobe.md)
- [CMIDatabase](plugins/cmidatabase.md)
- [PlaceholderProbe](plugins/placeholderprobe.md)
- [CMIPlaceholderCheck](plugins/cmiplaceholders.md)
- [1MBPlaceholders](plugins/onembplaceholders.md)

## Documentation Rule

Every feature plugin should get its own page under `docs/plugins/`.

Each plugin page should explain:

- what the plugin does
- what commands it adds
- what permissions it uses
- what placeholders it exposes
- how it uses CMI-API, CMILib, CMI, Paper, and optional hooks
- what data it stores
- what safety checks it applies

When code changes command behavior, permissions, placeholders, debug output, config keys, or jar names, update the docs in the same change.

The shared library should remain the source of truth for global debug output. If a plugin adds commands, permissions, placeholders, or config keys, register those with the library so `/1mbcmi debug plugin <id> all` stays accurate.

[Back to root README](../README.md)
