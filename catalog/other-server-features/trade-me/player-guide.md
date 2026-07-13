# TradeMe

TradeMe provides a two-player trade window with explicit offers and confirmation. Depending on configuration, a trade can include items, money, experience, mcMMO values, Jobs values, or other supported trade types.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- Player-to-player trade requests and private trade GUI.
- Two-sided offer, review, lock, and confirmation flow.
- Items plus optional money, XP, mcMMO, Jobs, or custom trade types.
- Per-player blocking/toggle controls and transaction logging.

## Commands

| Command | What it does |
| --- | --- |
| `/trade <player>` | Sends a trade request. |
| `/trade accept` | Accepts a pending request. |
| `/trade deny` | Declines a pending request. |
| `/trade block <player>` | Blocks trade requests from a player when enabled. |
| `/trade toggle` | Toggles incoming trade requests. |

## Getting started

1. Stand in an allowed area and run `/trade <player>`.
2. Place only the intended items/currency into your side.
3. Review both sides after every change, then confirm.

## Player notes

- Never confirm a trade you have not rechecked after the other player changes their offer.
- Custom items, containers, bound items, renamed items, and damaged items deserve extra inspection.
- Trade logs help staff investigate, but players remain responsible for reading the final offer.

## Official resources

- [Official Spigot resource](https://www.spigotmc.org/resources/trademe-with-api-to-create-custom-trades.7544/)
