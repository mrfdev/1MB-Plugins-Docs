# Configuration

Configuration files are created in the plugin data folder on first run. Bundled defaults are also used to add missing keys and missing comments safely on startup and reload.

Existing server values are preserved when defaults are repaired.

## Files

| File | Purpose | Reload |
| --- | --- | --- |
| `config.yml` | Master switch, commands, integrations, tracking, XP formula, perks, and skill definitions. | `/mcmmore reload` or `/mcmmore debug reload config` |
| `anti-exploit.yml` | Movement and event filters for XP sources. | `/mcmmore reload` or `/mcmmore debug reload config` |
| `effects.yml` | Cosmetic milestone particle/sound templates. | `/mcmmore reload` or `/mcmmore debug reload config` |
| `conversion.yml` | More-levels to native mcMMO-levels conversion rules. | `/mcmmore reload` or `/mcmmore debug reload conversion` |
| `Translations/Locale_EN.yml` | Player-facing messages and prefix hover/click text. | `/mcmmore reload` or `/mcmmore debug reload locale` |

## Main Config Sections

- `enabled`: master switch for the add-on.
- `commands.hide-mcmmo-reload-locale-suggestions`: hides mcMMO's `/mcmmoreloadlocale` and `/mcreloadlocale` suggestions from non-admin players.
- `integrations.cmiapi-lib.enabled`: optional registration with `1MB-CMIAPI-Lib`.
- `tracking`: sampling, autosave, game-mode, god-mode, CMI vanish/god checks, and movement bounds.
- `formula`: default max level and XP growth settings.
- `perks`: global perk toggle and default cooldown.
- `messages`: runtime message toggles such as actionbar XP feedback.
- `skills`: configured parent skills, sources, icons, display names, XP rules, and perk tiers.

## Skill Model

Configured parent skills are stable public IDs, such as `exploration`, `aquatics`, `airborne`, `defense`, `arcane`, and `husbandry`.

Sources feed their parent skill. For example:

- Exploration can include walking, running, sneaking, jumping, and mounted travel.
- Aquatics can include swimming and diving.
- Arcane can include enchanting, anvil work, grindstone work when enabled, and Dragon Breath bottle collection.

Skill XP still requires both the skill to be enabled and the player to have `onembmcmmore.skills.<skill>`.

## Conversion

`conversion.yml` is disabled by default. When enabled, it lets players convert eligible mcMMO More levels into native mcMMO levels through mcMMO's public API.

Default behavior:

- one-way online self-conversion
- visible More level remains intact in ledger mode
- spent levels are recorded to prevent double spending
- quotes expire and require exact confirmation
- conversion path permissions are required unless the player is admin

## Runtime Editing

`/mcmmore debug set <config> <key> <value>` supports guarded scalar and list edits for known keys only. It is intended for safe live testing, not as a full YAML editor.

List operations use:

```text
list:add
list:remove
list:clear
```

## Live Readiness Notes

`tracking.allow-god-mode` is true for test-server safety. Set it to false before live release if god-mode players should be blocked from earning XP or activating perks.
