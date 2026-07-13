# Bedrock Access (Geyser and floodgate) Staff Reference

Public-safe technical notes for staff who configure or support Bedrock Access (Geyser and floodgate) on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/geyser help` | `geyser.command.help` | Shows Geyser command help. |
| `/geyser connectiontest <address> <port>` | `geyser.command.connectiontest` | Tests reachability for a Bedrock endpoint. |
| `/geyser reload` | `geyser.command.reload` | Reloads Geyser configuration. |
| `/floodgate` | `floodgate.command` | Shows installed floodgate commands where exposed. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `geyser.command.help` | Geyser help. | Support staff |
| `geyser.command.reload` | Reload access. | Server administrators |
| `floodgate.command.*` | floodgate administrative commands. | Server administrators |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- ViaVersion can participate in Java-side protocol compatibility, but it does not replace Geyser.
- 1MB-CMIAPI Profile can consume Geyser/floodgate identity signals for staff context.
- Protect key files, authentication configuration, linking data, and remote endpoints from public docs.

## Examples

```text
/geyser help
/geyser connectiontest <address> <port>
/geyser reload
```

## Troubleshooting

- Record Bedrock platform, exact client version, address, port, and disconnect message.
- Separate UDP reachability, Geyser translation, floodgate identity, and downstream Java-server acceptance.
- Check the official supported-version status before changing protocol settings.

## Official references

- [Official Geyser wiki](https://geysermc.org/wiki/)
- [Geyser setup](https://geysermc.org/wiki/geyser/setup/)
- [floodgate documentation](https://geysermc.org/wiki/floodgate/)
