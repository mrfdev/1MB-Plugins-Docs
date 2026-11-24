# 1MB Library BentoBox Staff Reference

1MB Library BentoBox hosts the GameTypes menus and optional island markets, travelling merchants, turnip farming, time capsules, events, and protection expansions. On a fresh installation the menus are active and the optional island modules are dormant. Enable those features after the relevant stations, goods, permissions, and reward definitions are ready. [Player guide](/player-guides/plugins/bentobox/) · [GameTypes menu reference](gametypes.md)

## Installation and support

Install the complete tested suite with `1MB-Lib-BentoBox` alongside the third-party BentoBox plugin and its addons, CMI, and CMILib. Move the standalone GameTypes JAR out of the plugin load path. [Upgrade steps](../installation.md#upgrade-to-the-combined-bentobox)

The Paper plugin identity is `1MB-CMIAPI-BentoBox`. The JAR targets Java 25 bytecode. The reviewed BentoBox dependency is 3.23.8-SNAPSHOT-b395. Add Vault for CMI cash and see the inventory verification requirements below if using Multiverse-Inventories. [Maintained Paper target](../release.md)

| File | Purpose |
| --- | --- |
| `plugins/1MB-CMIAPI/BentoBox/host.yml` | Host activation and separate switches for GameTypes and the optional island modules. |
| `plugins/1MB-CMIAPI/BentoBox/config.yml` | Island gametype switches, station placements, pricing, schedules, rewards, and thresholds. |
| `plugins/1MB-CMIAPI/GameTypes/config.yml` | World detection, command roots and aliases, menu layout, and addon options. |
| `plugins/1MB-CMIAPI/CMIAPILIB/translations/gametypes.yml` | Existing GameTypes messages. |
| `plugins/1MB-CMIAPI/BentoBox/islands.sqlite` | Island Coins, receipts, offer limits, the turnip meter, merchant visits, tickets, airdrop claims, and time capsule archives and egg claims. |

The supported gametype keys are `cave`, `acid`, `oneblock`, `skyblock`, `skygrid`, and `chunkblock`. The clock uses `time-zone`, which defaults to `Europe/Amsterdam`. Use a valid IANA time zone. The host imports the legacy `BentoBox/config.yml` and `GameTypes/config.yml` activation values into `modules.bentobox.enabled` and `modules.gametypes.enabled` respectively on first startup. These switches live in `BentoBox/host.yml`, which `/1mblib config bentobox` inspects. An optional island module requires the island activation switch as well as its own global and gametype switches in `BentoBox/config.yml`. An existing dormant island setup stays dormant when the menus are active.

## Commands and access

| Command | Use |
| --- | --- |
| `/1mbbento status` | Check the GameTypes state, island activation, currency, and module and gametype switches. |
| `/gametype` or `/1mbbento menu [type]` | Open the detected or selected island menu, or the index when no gametype is detected. |
| `/oneblock menu`, `/cave menu`, and other configured shortcuts | Open that island gametype’s menu directly. |
| `/1mbbento gametypes <action>` | Run any GameTypes action with its existing permissions. |
| `/1mbbento balance` | Read the player's Island Coin balance from an enabled gametype. |
| `/1mbbento expand` | Open the eligible owner's expansion menu from their own island. |
| `/1mbbento capsule [status]` | Check the island's time capsule and find its coordinates. |
| `/1mbbento debug enable <true\|false>` | Activate or pause the optional island modules. |
| `/1mbbento module gametypes <true\|false>` | Activate or pause the menus independently. |
| `/1mbbento module <module> <true\|false>` | Set a module's global switch. |
| `/1mbbento module <module> <gametype> <true\|false>` | Set a module switch for one gametype. |
| `/1mbbento station <station> [clear]` | Place a villager station at the invoking staff member's position or clear that gametype's placement. |
| `/1mbbento station turnip-composter [clear]` | Register or clear the targeted block within five blocks at the current BentoBox spawn. |
| `/1mbbento debug config` | Inspect the optional island module settings. |
| `/1mbbento debug reload` | Reload island settings and refresh active stations. Open island module menus close on reload. |
| `/1mbbento debug hooks` | Inspect known dependencies and optional hooks. |
| `/1mbbento review <trade\|ticket\|airdrop\|turnip\|capsule> <reference> <status\|confirm\|release>` | Inspect or resolve a receipt with the appropriate evidence. |
| `/1mbbento review turnip-crop <reference> status` | Inspect the harvest claim for a Turnip Pod reference. |

All menu routes use the existing `onembcmi.gametypes.*` grants. Use `/gametype reload` to reload menu settings and translations. See the [GameTypes command reference](gametypes.md#commands).

`onembcmi.bentobox.use` covers player commands and station interaction. Expansion also requires `onembcmi.bentobox.expand`. Both default to true. Grant `onembcmi.bentobox.admin` to trusted in-game operators for configuration and transaction review. It defaults to operators and includes the declared `onembcmi.bentobox.admin.debug` and `onembcmi.bentobox.admin.reload` permissions. The server console supports activation and shared debug commands. Station placement requires an in-game administrator inside the target gametype's spawn island.

## Open a gametype

1. Start with `/1mbbento debug enable true`. Check `/1mbbento status` for the intended BentoBox gametype.
2. Go to that gametype's registered BentoBox spawn island. Stand on a solid floor with two clear blocks and run `/1mbbento station <station>` for each desired villager. The plugin creates villagers in loaded chunks as their features become available. Confirm visitor access under BentoBox's Trading flag and any applicable WorldGuard interaction and entity-spawn restrictions.
3. Enable each intended module. For an IslandMarket in OneBlock, run `/1mbbento module market oneblock true` and `/1mbbento module market true`. A gametype-local `false` pauses that module there. A global `false` pauses it across all gametypes.
4. Edit lists and mappings in `config.yml`, then reload. Spot-check access and one representative transaction as a normal Survival or Adventure player before opening the feature.

| Station | Module | Availability |
| --- | --- | --- |
| `market-sell` | `market` | Player hands in listed items for payment. |
| `market-buy` | `market` | Player buys listed items. |
| `market-advanced` | `market` | Shows progress at level 1 and offers orders from level 2. Requires a valid enabled advanced catalog. |
| `merchant` | `merchants` | Appears in the gametype selected for the active weekly visit. |
| `ticket` | `events` | Exchanges earned Golden Tickets for supply drops while Golden Tickets are enabled. |
| `turnip-composter` | `turnips` | Accepts Turnips at each registered spawn composter and displays the server-wide meter. |

`expand` uses its command on the player's island, and airdrops use their own spawn-relative locations under `events.airdrop`.

## IslandMarket and the Advanced Trader

Prices are whole units of the selected currency for the full bundle. Check the active purchase and sale prices together, including item conversions through crafting and smelting, before changing rates.

| Setting | Staff use |
| --- | --- |
| `currency` | `COINS` uses an Island Coin balance shared across enabled gametypes. `VAULT` uses a recognized CMI economy provider through Vault. |
| `market.rotation` | `DAILY` uses the configured local date. `SEASONAL` uses calendar seasons. |
| `market.sells` and `market.buys` | Regular hand-in orders and supplies, respectively. Set `market.sell-limit` and `market.buy-limit` to control the number of visible offers. Their defaults are 5 and 7. |
| `market.advanced.sells` and `market.advanced.buys` | Advanced hand-in orders and supplies. The bundled catalog has 20 orders. Set `market.advanced.sell-limit` and `market.advanced.buy-limit` to control the display. They default to 8 and 12 and may total up to 45. |
| `market.advanced.enabled` | Set to `false` to hide the Advanced Trader while regular market stations continue serving players. |
| Offer `item`, `amount`, and `price` | Item material, bundle size, and price for the bundle. The offer ID should be stable and lowercase. |
| Offer `limit` | Per player, offer, gametype, and rotation. Zero allows repeat trades throughout that rotation. |
| Offer `seasons` and `enabled` | Restrict the offer to `WINTER`, `SPRING`, `SUMMER`, or `FALL`, or set `enabled: false` to remove it from the rotation. |
| Advanced offer `minimum-level` | A level from 2 to 4. The default is 2. |

Market levels count completed IslandMarket purchases and sales for each player in each gametype. Existing completed receipts contribute. A sale earns credit after its payout settles.

| Level | Completed trades in that gametype | Default access |
| --- | ---: | --- |
| 1 | 0 | Regular market and a progress view at the Advanced Trader. |
| 2 | 25 | Advanced Trader and level 2 orders. |
| 3 | 75 | Level 3 orders. |
| 4 | 150 | Level 4 orders. |

Set `market.progression.level-2-trades`, `level-3-trades`, and `level-4-trades` to strictly increasing positive integers. The menu shows the player's current level and next target. A changed threshold applies to the player's existing trade total on the next visit.

A seller must have the requested unmodified items in inventory. A buyer needs room for the entire bundle and enough funds. With Multiverse-Inventories, sales need the shared inventory-save verifier provided by active Forage. Selling pauses if the verifier is unavailable. On supported Paper without Multiverse-Inventories, sales use Paper's saved inventory as proof. A receipt can remain pending between item submission and verified payout.

### Convert Island Coins to CMI cash

Treat conversion as a separate economy change. Rehearse it with a representative dataset and take a coordinated backup of the island ledger and CMI economy first. Set `currency: VAULT` and `conversion.enabled: true`, then choose a whole `conversion.cash-per-coin` rate from 1 to 1000. Run `/1mbbento debug convertcoins preview` to see the number of coin accounts and the configured rate. Once approved, run `/1mbbento debug convertcoins confirm`. The batch processes accounts individually, including supported existing offline accounts. Reconcile skipped or pending accounts using their receipt details, then switch conversion off.

## Travelling Merchant

The plugin records one visit per scheduled week in one eligible gametype with a configured `merchant` station. The default window is Saturday from 16:00 to 20:00 in the configured time zone. The merchant announces the destination using the gametype's spawn command.

`merchants.schedule` accepts `WEEKEND` for Saturday or Sunday and `WEEKLY` for any weekday. Set `merchants.weekday`, `merchants.starts-at`, and `merchants.duration-hours` together. Visits end by local midnight. Set `merchants.offer-count` to choose how many offers to show. It defaults to five. Each row in `merchants.offers` uses a unique material, a bundle size, a price, and a shared `stock` count in bundles. Each player may buy one bundle per offer in that visit. The selected gametype, window, catalog, and purchase records survive restarts.

## IslandTurnips

1. Enable `turnips` globally with `/1mbbento module turnips true` and in each intended gametype, for example `/1mbbento module turnips oneblock true`. Enable IslandMarket and place a `market-buy` supplier wherever players should be able to buy pods.
2. Place a composter inside a registered BentoBox spawn island. Look at the block from up to five blocks away and run `/1mbbento station turnip-composter`. Repeat for each composter that should contribute to the shared meter. Use the same command with `clear` while targeting a registered block position to remove that registration.
3. Permit ordinary players to use composters through BentoBox's **Composter** flag for that spawn and any applicable WorldGuard rules. Test an ordinary player's donation and verify the caption updates at the other spawn. Enable IslandMerchants with a valid schedule and at least one eligible `merchant` station for the boost to take effect.

| Setting | Default and behavior |
| --- | --- |
| `turnips.pod-price` | `2` whole units in the active market currency. The supplier always offers a pod at level 1. Each purchase yields one pod and has no rotation quota. Pods take one slot each and their purchases are separate from market trade-level progress. |
| `turnips.goal` | `100` verified donations fill the shared meter. A changed goal applies when the meter next starts at zero. |
| `turnips.max-lead-minutes` | `60` minutes early for the next eligible weekly visit. Set to `0` to pause early arrivals while keeping queued progress. The maximum is `1440`. |
| `turnips.composters.<gametype>` | Staff commands store each registration as a world UUID and three block coordinates. |

Players grow pods on protected island farmland. A mature harvest yields one Turnip and one replacement pod with sufficient storage space. An early player harvest returns a pod. Players donate one Turnip from the main hand per interaction. The meter credits the donation after the server verifies the inventory save, using the shared verifier for compatible inventory profiles. Filled meters stop taking items while the boost is queued.

Keep AutoSell's `selling.reject-custom-item-meta` enabled to protect pods and Turnips from material-based sales. Turnip harvesting uses its own payout, and Forage skips the cancelled vanilla harvest event.

A partial meter carries over regular arrivals. A full meter brings forward the next eligible visit once the lead window opens, and resets when that early visit is recorded. If a merchant is already present or the weekly slot is used, the meter remains queued for the next eligible visit. A Monday visit can start on Sunday. Destination selection, configured duration, stock, and Golden Ticket rules still apply.

## Events and CMI supply kits

### Golden Tickets

Enable `merchants` and `events` in the intended gametypes and place the `merchant` and `ticket` stations. A completed travelling merchant purchase can earn a player-bound ticket when `events.golden-ticket.enabled` is true and the schedule is open. `WEEKENDS` means Saturday and Sunday, `FIRST_WEEK` means days 1–7 of each month, and `DISABLED` pauses new awards. `events.golden-ticket.chance` defaults to `0.10`. Players can earn up to five tickets across all gametypes. The ticket station can also issue an earned ticket that is waiting for inventory space.

Set `events.golden-ticket.kits` to five distinct CMI kit config names in redemption order. The defaults are `islandsupplydrop1` through `islandsupplydrop5`. Define each name once in CMI. Set `Enabled: false` and `DropOnGround: false`, set the money and experience costs to zero, and use a valid item set with empty command and condition lists. Keep Golden Tickets out of the rewards. The plugin reads the CMI item definitions, preserves metadata, and requires room for the full reward before it redeems a ticket. Rehearse a ticket issue and redemption with the actual configured kits before enabling the event for players.

### Airdrops

With `events.airdrop.enabled: true`, the plugin checks eligible gametypes about once per minute. The defaults require five active players across those gametypes, roll with `check-chance: 0.04` per eligible check, and allow a drop to remain available for 30 minutes. `interval-hours` applies server-wide and has a minimum of 24 hours. `reward-count` defaults to 3. Each entry in `rewards` sets a material and an inclusive `min` and `max` within its stack limit.

By default the plugin checks a set of positions near the registered BentoBox spawn. Use `events.airdrop.sites.<gametype>` for a custom list of quoted `x,y,z` block offsets from that spawn. A valid site is on the spawn island, within the world border, and has a solid safe floor and two air blocks. Confirm locations in the target world. Players claim the entire drop in one transaction, and the ledger reserves it for one claimant at a time.

## IslandExpand

Island owners open `/1mbbento expand` while standing inside their own island's protected area. The island must be in that gametype's Level top ten. The current lookup supports BentoBox 3.23.8-SNAPSHOT-b395 and Level 2.30.0-SNAPSHOT-b771. If the cache is cold, use the gametype's island visit command before reopening the menu.

The supported base-radius upgrades are 50 to 75 and 75 to 100 blocks, without active radius bonuses. A target must fit the island allocation and world border. ChunkBlock uses its chunk claim system. The default expansion is free. `expand.coins.enabled` can enable the Island Coin prices under `expand.coins.cost-75` and `expand.coins.cost-100`.

## IslandTimeCapsule

The `capsule` module starts disabled globally and in every gametype. Enable it with `/1mbbento module capsule true` and a gametype switch such as `/1mbbento module capsule oneblock true`. Set `capsule.burial-seconds` to a whole number from `60` to `31536000`. It defaults to `5184000`, or 60 real days. Each new capsule stores the duration it was created with.

| Command | Use |
| --- | --- |
| `/1mbbento capsule create <name>` | As a Survival island owner, look at an empty barrel within five blocks, inside the island's protected area. The barrel and its cover must fit inside the protection. One active capsule is allowed per island. |
| `/1mbbento capsule note <message>` | Save or update a note before the first burial. The capsule reveals it in the history book after opening. It keeps up to 24 notes, one per teammate, with up to 180 characters per note. |
| `/1mbbento capsule cancel confirm` | As the Survival island owner, cancel a draft before its first burial and remove its notes. |
| `/1mbbento capsule open` | As a current team member in Survival, open a ready capsule within five blocks when all current teammates are online. |
| `/1mbbento capsule book [reference]` | Read the latest opened capsule or a specific one. Use `/1mbbento capsule history` for the ten most recent openings and their references. |
| `/1mbbento capsule claim` | As the Survival island owner standing on that island, collect its shared dragon egg after the first successful opening. |

Seal the barrel using six dry, opaque, full blocks, one touching each face. Early exposure preserves the notes, and the full timer restarts once the barrel is fully covered again. The book keeps the team and protection radius from the first burial and opening, and reveals the notes at opening. The egg is a placeable item the team can display in its own glass case.

Egg delivery requires proof of a Paper inventory save. With Multiverse-Inventories, it uses the shared verifier provided by active Forage. Ask the claimant for the receipt reference and use `/1mbbento review capsule <reference> status` to inspect it. The `confirm` decision requires verified delivery, and `release` requires proof that the shared verifier cancelled the original delivery. Preserve the original claim while the outcome is uncertain.

Avoid direct world edits around capsule sites. Bukkit listeners and loaded-chunk checks track cover changes. An exposure followed by immediate re-covering through a tool that bypasses those events can escape observation.

## Receipt review and rollback

If a player reports missing items, coins, a donation, or a reward, collect the reference from their message. Run `/1mbbento review <trade|ticket|airdrop|turnip|capsule> <reference> status` and compare the receipt with the original account, saved inventory, currency provider, or island result. A save-pending status means verification is still in progress.

| Action | When it applies |
| --- | --- |
| `release` for `trade` | An idle `RESERVED` trade that has yet to apply. This releases its quota and returns any reserved Island Coin debit. |
| `release` for `ticket` or `airdrop` | A `PENDING` attempt at least five minutes old, outside an active delivery. |
| `confirm` for `trade` | A supported `APPLYING`, `PAYING`, or `REVIEW` receipt after staff independently verify the effect. Positive Island Coin sales settle through their saved-inventory proof. |
| `confirm` for `ticket` or `airdrop` | A `REVIEW` attempt or an idle `APPLYING` attempt at least five minutes old, after verifying the original delivery. |
| `release` for `turnip` | A reserved donation whose inventory removal has yet to start. |
| `confirm` for `turnip` | A staged donation after staff independently verify that the original attempt consumed one Turnip. |

Keep ambiguous attempts held for investigation. `confirm` records the outcome of the original effect. Purchases and event rewards that use immediate inventory verification may require reconciliation if the server stops before saving inventory or currency provider data. Event rewards use the shared inventory verifier when it is available.

For an incident, turn off the affected module or gametype to pause new actions. Use `/1mbbento debug enable false` to pause the island modules together. This leaves GameTypes menus available when their switch is active. Preserve the original ledger, matching saved inventory and currency provider data, BentoBox island data, and the crop world data when investigating or rolling back. Coordinate any restore at a common point in time with the server stopped. A ledger-only restore can make stock, balances, unlock levels, donations, crops, and claims disagree with the actual items or island state already delivered.
