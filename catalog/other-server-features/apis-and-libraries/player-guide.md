# APIs and Libraries

Several enabled plugins are infrastructure rather than standalone player features. They provide APIs, compatibility bridges, menu rendering, placeholder values, economy abstraction, or vote delivery for the plugins documented elsewhere.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- **BlueBridgeCore, BlueBridgeWB, and BlueBridgeWG:** bridge BlueMap with WorldBorder and WorldGuard data. Used by BlueMap, WorldBorder, and WorldGuard map presentation. [GitHub](https://github.com/Mark-225/BlueBridge)
- **CMILib:** shared Zrips library required by CMI, Jobs, MobFarmManager, and TradeMe, and required by the custom 1MB-CMIAPI library/features. [Official resource](https://www.spigotmc.org/resources/cmilib.87610/)
- **DeluxeMenus:** inventory-menu engine used by configured server menus or integrations where selected. It consumes commands, permissions, and PlaceholderAPI values. [Official wiki](https://wiki.helpch.at/clips-plugins/deluxemenus)
- **PlaceholderAPI:** common placeholder broker used by scoreboards, menus, leaderboards, chat, CMI, Jobs, Pyro plugins, custom 1MB-CMIAPI features, and many other displays. [Official wiki](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki)
- **PyroLib:** hard dependency for PyroFarming, PyroFishingPro, PyroMining, and PyroWelcomesPro. [Official documentation](https://pyrotempus.gitbook.io/pyro-plugins)
- **Vault:** economy/permission/chat service abstraction used by CMI economy consumers, shops, Jobs, TradeMe, Pyro plugins, VotingPlugin, and other integrations. [GitHub](https://github.com/MilkBowl/Vault)
- **Votifier:** receives signed callbacks from voting sites and passes them to VotingPlugin. It does not decide rewards itself. [NuVotifier GitHub](https://github.com/NuVotifier/NuVotifier)
- **1MB-CMIAPI-Lib:** the custom shared library used by all modular 1MB-CMIAPI feature plugins. It has its own project documentation in the 1MB plugin section.

## Commands

This feature does not require a general player command. It appears automatically, through another menu, or through staff-created content.

## Getting started

1. Use the player-facing feature that depends on the library.
2. If a placeholder or menu is broken, report the visible feature rather than trying dependency commands.
3. Staff can use the mapping below to trace which shared layer may be involved.

## Player notes

- Libraries can be essential even when they have no player command or menu.
- Removing or reloading a dependency can affect many unrelated-looking features.
- Official upstream documentation describes available APIs; 1MoreBlock configuration determines actual consumers.

## Official resources

- [PlaceholderAPI wiki](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki)
- [CMILib](https://www.spigotmc.org/resources/cmilib.87610/)
- [DeluxeMenus wiki](https://wiki.helpch.at/clips-plugins/deluxemenus)
- [BlueBridge GitHub](https://github.com/Mark-225/BlueBridge)
- [Pyro Plugins documentation](https://pyrotempus.gitbook.io/pyro-plugins)
- [Vault GitHub](https://github.com/MilkBowl/Vault)
- [NuVotifier GitHub](https://github.com/NuVotifier/NuVotifier)
