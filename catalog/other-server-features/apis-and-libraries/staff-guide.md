# APIs and Libraries Staff Reference

Public-safe technical notes for staff who configure or support APIs and Libraries on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/papi parse <player> <placeholder>` | `placeholderapi.admin` | Tests a PlaceholderAPI value. |
| `/papi list` | `placeholderapi.admin` | Lists registered expansions. |
| `/dm reload` | `deluxemenus.admin` | Reloads DeluxeMenus in common builds. |
| `/vault-info` | `vault.admin` | Shows Vault service registration in builds exposing the command. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `placeholderapi.admin` | PlaceholderAPI administration. | Server administrators |
| `deluxemenus.admin` | DeluxeMenus reload/administration. | Server administrators |
| `vault.admin` | Vault diagnostics where available. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- BlueBridgeCore/WB/WG consumers: BlueMap plus WorldBorder/WorldGuard overlays.
- CMILib consumers verified from installed metadata: CMI, Jobs, MobFarmManager, TradeMe, 1MB-CMIAPI-Lib, and all 1MB-CMIAPI feature modules through that stack.
- PlaceholderAPI consumers verified from installed metadata include CMILib, Jobs, mcMMO, PyroLib/PyroWelcomesPro, many 1MB-CMIAPI modules, and presentation plugins documented on this site.
- PyroLib consumers: PyroFarming, PyroFishingPro, PyroMining, and PyroWelcomesPro.
- Vault consumers include economy-aware shops, Jobs, TradeMe, Pyro systems, VotingPlugin, CMI integrations, and custom 1MB features when enabled.
- Votifier delivers vote events to VotingPlugin; secret tokens/keys belong only in protected server configuration.
- Avoid plugin-manager hot reloads for shared libraries. Restart or use the owner plugin's documented reload path after dependency changes.

## Examples

```text
/papi parse <player> <placeholder>
/papi list
/dm reload
```

## Troubleshooting

- Start with the broken player feature, then verify its dependency loaded and registered the expected service.
- For placeholders, test the raw token with PlaceholderAPI before changing menus or scoreboards.
- For economy, identify which provider Vault registered and test withdrawal/deposit through the owning feature.
- For votes, trace vote site to Votifier receipt to VotingPlugin processing to final reward.

## Official references

- [PlaceholderAPI wiki](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki)
- [CMILib](https://www.spigotmc.org/resources/cmilib.87610/)
- [DeluxeMenus wiki](https://wiki.helpch.at/clips-plugins/deluxemenus)
- [BlueBridge GitHub](https://github.com/Mark-225/BlueBridge)
- [Pyro Plugins documentation](https://pyrotempus.gitbook.io/pyro-plugins)
- [Vault GitHub](https://github.com/MilkBowl/Vault)
- [NuVotifier GitHub](https://github.com/NuVotifier/NuVotifier)
