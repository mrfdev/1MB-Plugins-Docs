# Commands

Main command: `/mcmmore`

Alias: `/mmomore`

Help and tab completion are permission-aware. Normal help does not show permission node names to players.

## Player Commands

| Command | Description | Permission |
| --- | --- | --- |
| `/mcmmore` | Show your custom skill stats. | `onembmcmmore.command.use` |
| `/mcmmore stats` | Show your custom skill stats. | `onembmcmmore.command.use` |
| `/mcmmore skills` | List configured custom skills. | `onembmcmmore.command.use` |
| `/mcmmore help` | Show available commands. | `onembmcmmore.command.use` |
| `/mcmmore help <skill>` | Explain one skill, its sources, and perk tiers. | `onembmcmmore.command.use` |
| `/mcmmore activate <skill>` | Activate the best unlocked perk tier for a skill. | `onembmcmmore.command.use` plus `onembmcmmore.skills.<skill>` |
| `/mcmmore info` | Show plugin info, version/build, starter commands, and docs. | `onembmcmmore.command.use` |
| `/mcmmore top` | Show compact top lists for every configured skill. | `onembmcmmore.command.top` |
| `/mcmmore top <skill>` | Show a detailed top list for one skill. | `onembmcmmore.command.top` |
| `/mcmmore skills convert` | List More skills that can be converted when conversion is enabled. | `onembmcmmore.command.convert` plus conversion path permissions |
| `/mcmmore skills convert <skill>` | Show native mcMMO target skills for one More skill. | `onembmcmmore.command.convert` plus conversion path permissions |
| `/mcmmore skills convert <skill> <mcmmo-skill>` | Quote a conversion and show a short-lived confirmation. | `onembmcmmore.command.convert` plus conversion path permissions |
| `/mcmmore skills convert <skill> <mcmmo-skill> confirm <token>` | Confirm the exact quoted conversion. | `onembmcmmore.command.convert` plus conversion path permissions |
| `/mcmmore convert <skill> [mcmmo-skill]` | Shorter alias for the conversion flow. | `onembmcmmore.command.convert` plus conversion path permissions |

## Admin Commands

| Command | Description | Permission |
| --- | --- | --- |
| `/mcmmore stats <player>` | Show a known online or offline player's custom skill stats. | `onembmcmmore.admin` |
| `/mcmmore reload` | Save profiles, reload config, reload runtime rules, and restart tracking tasks. | `onembmcmmore.admin` |
| `/mcmmore reset <player> [skill]` | Reset all custom skill data or one skill for an online player. | `onembmcmmore.admin` |
| `/mcmmore debug` | Show debug status. | `onembmcmmore.admin` |
| `/mcmmore debug status` | Show plugin, build/runtime, server, dependency, bridge, and feature status. | `onembmcmmore.admin` |
| `/mcmmore debug commands` | List command surfaces. | `onembmcmmore.admin` |
| `/mcmmore debug permissions` | List permissions and current configured skill permissions. | `onembmcmmore.admin` |
| `/mcmmore debug placeholders` | List PlaceholderAPI keys. | `onembmcmmore.admin` |
| `/mcmmore debug inspect <player>` | Inspect online or known offline custom skill data. | `onembmcmmore.admin` |
| `/mcmmore debug skill <skill>` | Inspect one skill's active rules. | `onembmcmmore.admin` |
| `/mcmmore debug skills <add|set|remove> <online-player> <skill> <levels>` | Mutate custom skill levels for live testing. | `onembmcmmore.admin` |
| `/mcmmore debug config` | Show active config values. | `onembmcmmore.admin` |
| `/mcmmore debug health` | Show runtime health checks. | `onembmcmmore.admin` |
| `/mcmmore debug reload <all|config|conversion|locale>` | Reload selected runtime pieces. | `onembmcmmore.admin` |
| `/mcmmore debug set <config> <key> <value>` | Set guarded scalar/list config values. | `onembmcmmore.admin` |

## Debug Set Config Names

`/mcmmore debug set` accepts these config names:

- `config`
- `conversion`
- `anti-exploit`
- `effects`
- `locale`

List editing uses explicit values such as `list:add`, `list:remove`, and `list:clear` on keys the plugin allows.
