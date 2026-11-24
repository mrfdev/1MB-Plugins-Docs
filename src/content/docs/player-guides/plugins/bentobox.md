---
title: "1MB Library BentoBox Guide"
description: "Use GameTypes island menus and learn about optional island activities when they are enabled."
---

Open `/gametype` or `/1mbbento menu` to see options for the current island world or browse the gametype index. Enter `/oneblock menu`, `/cave menu`, `/acid menu`, `/skyblock menu`, `/skygrid menu`, or `/chunkblock menu` to open that menu directly. The menus offer shortcuts for visiting spawn, managing your island, and using available addons. [GameTypes menu guide](https://github.com/mrfdev/1MB-Plugins-Docs/blob/main/project-docs/cmi-api/docs/plugins/gametypes.md)

Markets, farming, events, time capsules, and expansion are optional. The sections below apply in gametypes where staff have enabled each activity. Use `/1mbbento status` to check availability and the market currency.

## Trade at the island market

Use your gametype's spawn command, such as `/oneblock spawn` or `/skyblock spawn`. Read the name above each villager to find the trade you want.

- **Island Market · Sell** buys supplies from your inventory. Bring at least the listed quantity of ordinary, unmodified items, then click the offer you want to sell.
- **Island Market · Buy** sells supplies. Check the price and leave enough inventory room for the whole bundle before you click.
- **Island Market · Advanced** buys resources and sells additional supplies once you reach the required market trade level.

Check the current offers before gathering supplies. Offers can change with the market rotation, and some have a personal limit for that rotation. Island Coins are the default currency. Use `/1mbbento balance` in an enabled gametype to see your coins. If your market uses cash, the offer shows the cash price.

After a sale, payment arrives when the server confirms your inventory save. If the sale is pending, wait before trying another trade. If you need help with a pending sale or claim, send staff the reference from chat.

## Unlock the Advanced Trader

Start at market trade level 1. Each completed regular or advanced market rotation offer counts as one trade in the gametype where you made it. Earlier completed market trades count too. A sale adds to your total when the payment clears.

| Level | Completed trades by default | Unlock |
| --- | ---: | --- |
| 2 | 25 | Trade with the Advanced Trader |
| 3 | 75 | More supplies and resource orders |
| 4 | 150 | The highest-level orders |

Open a market menu and check the **Market trade level** card for your completed trades and the number you still need for the next level. Click the card to refresh your progress. The Advanced Trader displays the required level on locked orders.

## Grow and donate turnips

1. Buy a **Turnip Pod** from **Island Market · Buy** at spawn. It is available at level 1 every rotation. Each pod needs its own inventory slot.
2. Plant the pod on farmland on your island, with room for the crop to grow two blocks tall. It looks like a pitcher plant. When mature, one harvest gives a Turnip and a replacement pod. Leave room for both. An early harvest returns the pod.
3. Hold a harvested Turnip in your main hand and right-click a marked composter at spawn. One Turnip is donated at a time. Chat confirms your donation, and each marked composter shows the same community progress after the inventory save is verified.

Turnips from any enabled gametype fill one shared meter, even where each gametype keeps its own inventory. A full meter queues an early visit for the Travelling Island Merchant. While the boost is queued, the composter leaves any extra Turnips in your hand. A partial meter carries over regular visits. Watch chat for the merchant's destination when the early visit begins.

## Catch the Travelling Island Merchant

Watch for a chat announcement with the spawn command. When enabled, the merchant can visit one eligible island spawn per scheduled week. The menu shows the size and price of each bundle and how many are left for everyone. You can buy one bundle per offer during that visit while stock lasts.

## Redeem Golden Tickets

Eligible Travelling Island Merchant purchases during a Golden Ticket event can earn a ticket for your account. If a ticket is waiting for you, make room and select **Collect your Golden Ticket** at the **Golden Ticket Exchange** villager.

Bring your ticket to that villager and choose **Redeem for Island Supply Drop**. Leave room for the full reward. Each ticket redeems one supply drop, from number 1 through number 5 in order. You can earn and redeem up to five tickets in total.

## Claim an island airdrop

When an airdrop is announced, use the spawn command in chat and look for the marked crate. Interact with it from nearby with room for all the supplies. The first completed claim receives the whole drop. Unclaimed crates expire.

By default, airdrops can appear when at least five players are online across eligible gametypes, and unclaimed crates expire after 30 minutes. At least 24 hours pass between drops.

## Bury and open a time capsule

1. As the island owner in Survival, place an empty barrel within your island's protected area. Look at it and use `/1mbbento capsule create <name>`.
2. Before covering the barrel, each teammate can save one memory for the opening with `/1mbbento capsule note <message>`. Try a prediction, a thank-you, or an inside joke.
3. Cover all six faces with dry, opaque, full blocks, such as stone. Use `/1mbbento capsule` to see the location and ready date. Capsules take 60 real days by default. If the capsule is uncovered early, its notes stay safe and the full timer starts again once it is fully buried.
4. When the time is up, get everyone on the current team online. One teammate stands within five blocks of the barrel in Survival and uses `/1mbbento capsule open`.

Use `/1mbbento capsule book` to see the team and island protection radius from the day of burial and from the day of opening, plus the saved notes. Use `/1mbbento capsule history` to find earlier books.

The first opening earns one shared dragon egg for the island. The Survival island owner can collect it on the island with `/1mbbento capsule claim`. Leave an inventory slot free, then pick a spot to display it together.

## Expand your island

Stand inside the protection area of an island you own and use `/1mbbento expand`. Your island must be in the gametype's Level top ten. The first expansion takes the protection radius from 50 to 75 blocks. The next takes it to the 100-block maximum. Your island's allocated space and world borders must allow the upgrade. Check the radius and any Island Coin cost shown before clicking.

If the menu asks you to visit your island, return using your gametype's usual island command and try again. In ChunkBlock, expand your territory through chunk claims.
