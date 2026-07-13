# Integrations

## DiscordSRV

DiscordSRV provides the alerts system, webhook formatting, Discord channel routing, and SpEL expression evaluation.

The alert uses fully-qualified Bukkit/plugin event class names. This is important on modern Paper and DiscordSRV versions because simple event class names can trigger migration warnings or registration issues.

Official alerts documentation:

https://docs.discordsrv.com/alerts/

## mcMMO

mcMMO provides the level-up event and the player skill data surfaced through PlaceholderAPI.

The alert listens to:

```text
com.gmail.nossr50.events.experience.McMMOPlayerLevelUpEvent
```

## PlaceholderAPI

PlaceholderAPI resolves mcMMO values inside DiscordSRV expressions. The alert currently depends on `%mcmmo_power_level%` and individual `%mcmmo_level_<skill>%` placeholders.

## Discord Custom Emotes

The profile display uses Discord custom emote names. Keep the emote names stable when replacing artwork, otherwise the alert may show raw text instead of icons.

## 1MoreBlock Website Assets

The webhook avatar is hosted at:

```text
https://omgboards.com/media/1MB-mcMMO-logo.png
```

If that URL changes or becomes unavailable, Discord may show no webhook avatar.
