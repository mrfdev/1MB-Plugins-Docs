# Troubleshooting

## DiscordSRV Reload Fails

Run a YAML parser against the file first:

```sh
ruby -e 'require "yaml"; YAML.load_file("alerts.yml"); puts "YAML OK"'
```

Common causes:

- Wrong indentation under a list item.
- A block scalar such as `Description: |` swallowing the next alert because the next alert is indented too far.
- Unescaped quotes inside a SpEL expression.

## DiscordSRV Warns About Simple Class Names

Use fully-qualified event class names, for example:

```text
com.gmail.nossr50.events.experience.McMMOPlayerLevelUpEvent
org.bukkit.event.player.PlayerCommandPreprocessEvent
```

Avoid old simple names such as `PlayerCommandPreprocessEvent`.

## The Alert Does Not Fire

Check:

- The player reached a power level divisible by 25.
- mcMMO is installed and firing level-up events.
- PlaceholderAPI returns a numeric value for `%mcmmo_power_level%`.
- The DiscordSRV channel name in `Channel` exists in DiscordSRV config.
- `/discord reload` completed without errors.

## Emotes Show As Raw Text

Discord custom emotes must exist on the Discord server. If an emote such as `:mcmmospears:` is missing, Discord will show the raw text.

## Webhook Avatar Is Missing

Confirm the avatar URL is reachable:

```text
https://omgboards.com/media/1MB-mcMMO-logo.png
```

If the URL returns an error or redirects unexpectedly, Discord may omit the avatar.

## SpEL Errors When The Event Fires

SpEL expressions are evaluated when DiscordSRV processes the alert. A file can pass YAML validation but still fail later if an expression references a missing class, missing plugin, bad placeholder, or invalid method.

For plugin map access in DiscordSRV SpEL, use map syntax:

```text
#plugins['PluginName']
```

## Test Server Warnings For Missing Shop Events

If the test server does not have shop plugins installed, DiscordSRV may warn that shop event triggers cannot be found. That warning is expected for a test environment that does not include those plugins.
