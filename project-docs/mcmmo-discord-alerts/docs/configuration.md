# Configuration

The public mcMMO alert lives in `alerts.yml` as a DiscordSRV alert entry.

## Trigger

The alert listens for mcMMO player level-up events:

```text
com.gmail.nossr50.events.experience.McMMOPlayerLevelUpEvent
```

The fully-qualified class name is required for current DiscordSRV alert handling and avoids the legacy simple-class-name warning.

## Milestone Condition

The alert uses PlaceholderAPI to read `%mcmmo_power_level%` and only posts when the value is divisible by 25.

```text
power level % 25 == 0
```

Examples that post:

- 25
- 50
- 75
- 100

Examples that do not post:

- 24
- 26
- 49
- 51

## Embed Layout

The embed includes:

- Title with the player's display name and total power level.
- `Top Skills`, calculated from all configured skill placeholders and limited to the top three.
- `Full Profile`, grouped as Gathering, Utility, and Combat.
- A small progress hint using Discord subtext-style markdown.

Current full-profile order:

1. Gathering
2. Utility
3. Combat

This order keeps the longer Combat row at the end, where wrapping is less visually disruptive.

## Skill Coverage

The alert includes the 19 mcMMO skills verified from the server's mcMMO output:

- Gathering: Excavation, Fishing, Herbalism, Mining, Woodcutting
- Utility: Acrobatics, Alchemy, Repair, Salvage, Smelting
- Combat: Archery, Axes, Crossbows, Maces, Swords, Spears, Taming, Tridents, Unarmed

## Webhook Appearance

The mcMMO alert uses:

- Webhook name: `mcMMO`
- Avatar URL: `https://omgboards.com/media/1MB-mcMMO-logo.png`
- Embed color: `#869600`

The Discord channel is controlled by the alert's `Channel` value in `alerts.yml`.

## Custom Emotes

The embed uses 1MoreBlock Discord emote names for mcMMO skills. The emotes must exist on the Discord server where the alert is posted, otherwise Discord will show the raw `:emote_name:` text.

## Reload Behavior

DiscordSRV reads this file when it starts or when `/discord reload` is run. YAML syntax errors prevent the config from loading. SpEL expression errors may only appear when the matching event fires.
