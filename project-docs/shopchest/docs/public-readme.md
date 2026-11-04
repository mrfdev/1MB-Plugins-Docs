# ShopChest

ShopChest is 1MoreBlock's container-shop plugin. Players create shops with the
exact item they want to trade, stock supported storage containers, and let
customers buy or sell through the server economy. Floating items and text show
the product, prices, and availability. Searchable storefronts help players find
shops and browse their owners' profiles.

Read the [player guide](https://docs.1moreblock.com/player-guides/custom-server-plugins/shopchest/) for creating shops, buying and selling,
searching storefronts, and advertising. The [command reference](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/commands/)
lists available commands and permissions.

## 1MB AutoSell Support

From ShopChest build 798, purchases check that the buyer's 1MB Library AutoSell
is off before money or items move. If it is on, the player is told to run
`/autosell toggle` to turn it off, then retry the shop. ShopChest does not toggle
it automatically. Selling to shops remains available. See
[buying with AutoSell](https://docs.1moreblock.com/player-guides/custom-server-plugins/shopchest/#buying-with-1mb-autosell).

## Compatibility and Administration

This source targets Paper 26.3 STABLE build 241, with Java 25 plugin bytecode.
Vault and a compatible economy provider are required. The `1.15.4-SNAPSHOT`
documentation describes the prepared rollout; check the installed build before
relying on newly introduced behavior.

- [Installation and updates](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/installation/)
- [Configuration](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/configuration/)
- [Permissions](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/permissions/)
- [Integrations](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/integrations/)
- [Troubleshooting](https://docs.1moreblock.com/staff-reference/custom-server-plugins/shopchest/troubleshooting/)

Source repository: [mrfdev/ShopChest](https://github.com/mrfdev/ShopChest).
