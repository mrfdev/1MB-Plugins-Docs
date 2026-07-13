# mcMMO Discord Alerts

Public-safe documentation for the 1MoreBlock DiscordSRV alert configuration that announces mcMMO power-level milestones in Discord.

This repository is imported into the central docs site as a custom server plugin namespace because the standalone importer only accepts source-owned project docs in that category. The repository itself is a DiscordSRV configuration package: it does not contain Java source, plugin metadata, Gradle/Maven build files, plugin-owned commands, plugin permissions, or an implementable `/info` command. The maintained artifact is DiscordSRV `alerts.yml` configuration, with a local Paper test-server copy for validation.

## What This Provides

- A Discord embed when a player reaches an mcMMO power level divisible by 25.
- A compact `Top Skills` row showing the player's three highest mcMMO skills.
- A compact `Full Profile` section grouped as Gathering, Utility, and Combat.
- A footer-style progress hint for `/mcstats`, `/mcrank`, `/mctop`, and `/mcstats discord`.
- A custom mcMMO webhook avatar hosted at `https://omgboards.com/media/1MB-mcMMO-logo.png`.

The public documentation focuses on the player-visible mcMMO alert. The larger `alerts.yml` may also contain private staff, moderation, shop, or server-operations alerts; those are intentionally not described in the player guide.

## Repository Layout

```text
alerts.yml
docs/
  player-guide.md
  commands.md
  configuration.md
  installation.md
  integrations.md
  placeholders.md
  troubleshooting.md
  plugin-docs.yml
servers/
  Server-Two-Paper-26.1.2/plugins/DiscordSRV/alerts.yml
```

`alerts.yml` is the project-level reference copy. The `servers/.../DiscordSRV/alerts.yml` file is the local test-server copy and may include experimental alerts that have not been promoted back into the reference copy.

## Verified Runtime Context

- Server engine: Paper 26.1.2 in the bundled test server.
- Discord bridge: DiscordSRV 1.30.5 in the bundled test server.
- mcMMO: present in the bundled test server.
- PlaceholderAPI: present in the bundled test server.
- Java target: not applicable; this repository does not build a Java plugin.
- Paper validation target: Paper 26.1.2 in the bundled test server.

## mcMMO Alert Behavior

The mcMMO alert listens to:

```text
com.gmail.nossr50.events.experience.McMMOPlayerLevelUpEvent
```

It announces only when the PlaceholderAPI value `%mcmmo_power_level%` is divisible by 25:

```text
power level % 25 == 0
```

This produces announcements at power levels such as 25, 50, 75, 100, 125, and so on.

## Documentation

- [Player Guide](docs/player-guide.md)
- [Commands](docs/commands.md)
- [Configuration](docs/configuration.md)
- [Installation](docs/installation.md)
- [Integrations](docs/integrations.md)
- [Placeholders](docs/placeholders.md)
- [Troubleshooting](docs/troubleshooting.md)

## Validation

Validate the YAML files locally with:

```sh
ruby -e 'require "yaml"; ["alerts.yml", "servers/Server-Two-Paper-26.1.2/plugins/DiscordSRV/alerts.yml"].each { |f| YAML.load_file(f); puts "#{f}: YAML OK" }'
```

After deploying to a server, run:

```text
/discord reload
```

Then trigger or wait for an mcMMO level-up milestone to confirm that Discord receives the embed.
