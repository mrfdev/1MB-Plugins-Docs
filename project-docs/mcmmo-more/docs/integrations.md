# Integrations

## mcMMO

mcMMO More is a companion plugin for mcMMO.

- It does not patch mcMMO.
- It does not register new native mcMMO skills.
- It does not write into mcMMO playerdata.
- Native mcMMO commands do not list mcMMO More skills.

Use these mcMMO More equivalents:

| Native mcMMO Need | mcMMO More Command Or Placeholder |
| --- | --- |
| View custom stats | `/mcmmore stats` |
| View custom top lists | `/mcmmore top` or `/mcmmore top <skill>` |
| View custom power | `/mcmmore stats` or `%onembmcmmore_power_level%` |
| Display native plus More power | `%onembmcmmore_combined_power_level%` |

Conversion, when enabled, uses mcMMO's public ExperienceAPI reflectively to validate native targets, read current levels and caps, and grant native levels after confirmation.

## PlaceholderAPI

PlaceholderAPI is optional. When installed, mcMMO More registers the `onembmcmmore` expansion.

See [placeholders.md](placeholders.md) for the full list.

## CMI, CMILib, And 1MB-CMIAPI-Lib

CMI and CMILib are optional soft dependencies.

When CMI is present and enabled, mcMMO More can block XP and perk activation for CMI vanished or god-mode players according to config. The plugin prefers shared player-state helper access through `1MB-CMIAPI-Lib` when that library is installed and compatible.

When `1MB-CMIAPI-Lib` is installed, mcMMO More can register itself as the `mcmmomore` feature for shared 1MB diagnostics. The add-on still remains standalone and continues to own its commands, configs, skills, and playerdata.

## LuckPerms

LuckPerms is not called directly by the code, but it is the expected way to grant command, skill, and conversion permissions.

Example:

```text
lp group default permission set onembmcmmore.skills.exploration true
```

## Vault And DiscordSRV

Vault and DiscordSRV are not called by the current implementation. If future features use them, document that behavior before or alongside the implementation.
