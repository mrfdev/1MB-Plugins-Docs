# PinataParty Staff Reference

Public-safe technical notes for staff who configure or support PinataParty on 1MoreBlock.

> Verify destructive, economy-changing, permission-changing, and player-data commands against the installed build and an approved support case before running them.

## Commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/pinata` | `pinataparty.admin` | Shows PinataParty help in common builds. |
| `/pinata spawn` | `pinataparty.admin` | Starts/spawns an event in common builds; confirm location and syntax. |
| `/pinata reload` | `pinataparty.admin` | Reloads configuration. |

## Permissions

| Permission | Purpose | Suggested access |
| --- | --- | --- |
| `pinataparty.admin` | Administrative event controls in common builds. | Event staff/senior staff only |

## Placeholders

No plugin-owned placeholders were verified. PlaceholderAPI may still expose values through a separate expansion or an integrating plugin.

## Configuration and integrations

- VotingPlugin/Votifier can contribute to event triggers.
- Rewards can execute commands and affect economy/items; review them as privileged automation.
- WorldGuard and event-area configuration determine where interaction is allowed.

## Examples

```text
/pinata
/pinata spawn
/pinata reload
```

## Troubleshooting

- Check trigger progress, active-event state, spawn world/location, and entity validity.
- Confirm reward eligibility and participation rules before manual compensation.
- Record event start/end timestamps and console messages.

## Official references

- [Official Spigot resource](https://www.spigotmc.org/resources/pinataparty.59318/)
