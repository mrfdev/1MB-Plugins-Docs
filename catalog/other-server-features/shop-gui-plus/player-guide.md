# ShopGUIPlus

ShopGUIPlus is the server shop. It provides curated categories, item buy prices, item sell prices, quantity controls, and transaction rules defined by the 1MoreBlock economy team.

> Commands and features on 1MoreBlock depend on the current server configuration, world, and your permissions. A command listed here may be limited to certain ranks or contexts.

## What it adds

- GUI categories for configured server-shop items.
- Buy, sell, sell-hand, and sell-all workflows where enabled.
- Item metadata, quantity, stock, price modifier, world, and permission rules.
- Vault/CMI economy transactions and PlaceholderAPI display support.

## Commands

| Command | What it does |
| --- | --- |
| `/shop` | Opens the server shop. |
| `/shop <shop>` | Opens a named shop when exposed. |
| `/sell hand` | Sells the held eligible item. |
| `/sell handall` | Sells matching eligible items from your inventory where enabled. |
| `/sell all` | Sells all eligible inventory items where enabled. |
| `/shop worth` | Checks configured worth in builds exposing this player command. |

## Getting started

1. Run `/shop` and choose a category.
2. Inspect whether you are buying or selling and check unit quantity/price.
3. Use targeted sell commands before broad sell-all commands.

## Player notes

- ShopGUIPlus is the server shop; PlayerShopGUIPlus is the player marketplace.
- Renamed, enchanted, damaged, custom, container, or metadata-bearing items may not match a shop entry.
- Prices, price drift, limits, and available items are 1MoreBlock-specific.

## Official resources

- [Official Spigot resource](https://www.spigotmc.org/resources/shopgui-1-8-1-21.6515/)
