# MiniMOTD Staff Reference

Public-safe technical notes for staff who configure or support MiniMOTD on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/minimotd reload` | `minimotd.admin` | Reloads MiniMOTD configuration. |
| `/minimotd about` | `minimotd.admin` | Shows plugin information in supported builds. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `minimotd.admin` | MiniMOTD administrative commands. | Server administrators only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- Uses Adventure MiniMessage formatting rather than legacy color codes.
- Proxy and backend MOTD ownership must be clear to avoid one layer overriding another.
- Favicon files and MOTD entries should be validated before reload.

## Examples

```text
/minimotd reload
/minimotd about
```

## Troubleshooting

- Test from a fresh server-list refresh and distinguish client cache from server response.
- Confirm whether the proxy or Paper backend answered the status ping.
- Check MiniMessage parse errors and image dimensions for favicon failures.

## Official references

- [Official GitHub repository](https://github.com/jpenilla/MiniMOTD)
- [Configuration reference](https://github.com/jpenilla/MiniMOTD/wiki/Configuration)
