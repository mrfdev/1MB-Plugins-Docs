# Bolt

Bolt provides block and entity locks for things that need protection outside a larger island or plot system. A lock can have an owner and a controlled list of people or groups allowed to use it.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- Private and public protection types.
- Ownership, trusted users, access lists, and protection flags.
- Support for containers, doors, signs, and configured entities.
- Automatic protection for configured blocks where enabled.

## Commands

| Command | What it does |
| --- | --- |
| `/lock` | Locks the block or entity you interact with. |
| `/unlock` | Removes a protection you own. |
| `/trust <player>` | Trusts a player according to the configured Bolt command flow. |
| `/untrust <player>` | Removes previously granted trust. |
| `/bolt` | Shows Bolt help and available subcommands. |

## Getting started

1. Place or look at a protectable block.
2. Use `/lock`, then interact with the target if prompted.
3. Test access and add only the people who need it.

## Player notes

- Island, plot, and WorldGuard protection may take precedence over Bolt.
- Do not lock shared infrastructure unless the area owner allows it.
- Transfer or remove locks before abandoning an area.

## Official resources

- [Official wiki](https://github.com/pop4959/Bolt/wiki)
- [GitHub](https://github.com/pop4959/Bolt)
