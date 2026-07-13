# Installation

This feature is installed by deploying the maintained DiscordSRV `alerts.yml` configuration to a Paper server that has the required plugins.

## Requirements

- Paper server with DiscordSRV installed.
- mcMMO installed and enabled.
- PlaceholderAPI installed and enabled.
- The mcMMO PlaceholderAPI expansion or built-in placeholders available for the `%mcmmo_*%` values used by the alert.
- Custom Discord emotes matching the names used in the alert if the visual skill icons should render.

The bundled local test server currently targets Paper 26.1.2 and DiscordSRV 1.30.5.

## Deploy

1. Back up the live server's current DiscordSRV `alerts.yml`.
2. Copy the reviewed alert configuration into the live DiscordSRV alerts file.
3. Confirm plugin event triggers use fully-qualified class names.
4. Run `/discord reload`.
5. Watch the console for YAML, trigger, or SpEL errors.
6. Test with a controlled mcMMO level-up if possible.

## Updating

When changing the mcMMO alert:

1. Edit the project reference copy first.
2. Validate YAML locally.
3. Copy the change into a test server.
4. Run `/discord reload`.
5. Trigger the relevant event.
6. Promote the tested configuration to the live server.

## Rollback

If reload fails or DiscordSRV throws errors when the event fires, restore the previous `alerts.yml` backup and reload DiscordSRV.
