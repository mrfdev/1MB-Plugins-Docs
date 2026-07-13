# Commands

This repository does not implement Minecraft commands. It configures DiscordSRV alerts around mcMMO and related server events.

## Player-Facing Commands Mentioned By The Alert

The mcMMO Discord embed points players toward these existing mcMMO commands:

| Command | Purpose |
| --- | --- |
| `/mcstats` | Shows the player's mcMMO stats. |
| `/mcrank` | Shows the player's mcMMO ranking information. |
| `/mctop` | Shows top mcMMO players. |
| `/mcstats discord` | Shows Discord-oriented mcMMO progress output when available on the server. |

These commands are owned by mcMMO or the server's mcMMO setup, not by this alert configuration.

## Maintainer Commands

After editing `alerts.yml`, maintainers reload DiscordSRV with:

```text
/discord reload
```

Use the server console if player permissions are not available in-game.

## Info Command Note

There is no `/mcstats info` command provided by this alert package. The central docs entry uses `/mcstats` as the main player-facing command because that is the mcMMO command shown in the Discord alert, but the alert package itself is configuration rather than a command-owning Paper plugin.
