---
title: "Halloween Virus Guide"
description: "Learn what Halloween Virus does, how to use it, and which public commands are available."
---

A strange infection is spreading across the worlds. Fight marked infected mobs, recover 23 different pottery fragments, and record them in `/hv` to defeat the virus and earn the completion reward.

Halloween Virus is a fall adventure within the bigger `/halloween` celebration. The scheduled 2026 hunt runs from **1 October through 1 November**, with rewards available **25 October through 4 November**. Staff may open the hunt early in September. All dates use **Europe/Amsterdam** time. Staff must enable participation; `/hunt` includes the event alongside the existing seasonal adventures.

Read ahead and plan your first expedition. This guide describes the adventure; check `/hv info` for the current event state and claim dates when you have access. Finding this page does not mean the hunt has opened yet.

Player guide: <https://docs.1moreblock.com/player-guides/plugins/halloweenvirus/>. Staff setup, permissions, recovery, and configuration are documented in [Halloween Virus administration](/staff-reference/plugins/halloweenvirus/).

While the hunt is live, you may receive a spooky invitation about **90 seconds after joining**. Click **[/hv]** to open the event menu, or **[Don't remind me again]** to hide this season's join invitations and reward-claim reminder. Your choice survives reconnects, server restarts and collection resets. You can also type `/hv reminders off`, check your choice with `/hv reminders`, or restore reminders with `/hv reminders on`. Staff announcements are separate. Hunt invitations stop when the hunt ends and are skipped once all 23 sherds are recorded.

If you finish your collection early, you can receive **one private reminder when your reward becomes available**. If you are offline then, it waits until an eligible login, about 90 seconds after joining. The reminder also works during **2–4 November**, when hunting has ended but claims remain open. It shows the claim dates and a clickable **[/hv]** button; you still choose to claim the reward yourself. Already claimed or pending rewards are not reminded, and the saved reminder does not repeat on normal relogs or restarts.

## Start your collection

1. Open `/hv`. Your head in the bottom left shows the current event phase, your collected total, reward availability, and the local hunt end date.
2. Choose **World & Mob Guide**. Hover over a world to see your recorded progress, the exact fragment IDs you still need, and which infected mobs to look for. Use **Only Missing** to hide completed regions.
3. Look for mobs with infected or regional boss names, unusual sizes, and eerie particles. Boss variants also have a colored outline for their region. Some wear distinctive dyed and trimmed armor, sometimes with an enchantment shimmer. They have more health and hit harder than ordinary mobs. Bring suitable equipment and leave yourself a way out.
4. Defeat eligible infected mobs and collect their event fragments. The default chance is 75% per eligible kill; the fragment comes from that world's pool. A kill does not guarantee a drop.
5. Keep your fragments in your inventory, open `/hv`, and press **Collect Sherds**. This deliberately consumes one of each missing type and records it in your collection. Spare copies of types you have already collected stay in your inventory.
6. Once all 23 types are recorded, leave room in your inventory and press **Claim Your Reward** during the displayed claim period. You can receive one completion reward per event edition. Completing the collection early saves your progress until claims open.

The confirmed 2026 timetable is:

| When, in Europe/Amsterdam time | What you can do |
| --- | --- |
| Before 1 October | The automatic hunt is scheduled. Staff may open the hunt early or run a limited test. |
| 1–24 October | Find infected mobs and record your sherds. Completed collections stay saved until claims open. |
| 25 October–1 November | Continue hunting and collecting, and claim your completed reward. |
| 2–4 November | **Claims only:** no new infected encounters. Trade and submit existing unused sherds, finish your collection, and claim. |
| From 5 November | The event is dormant. Collection submissions and claims close; recorded progress remains saved. |

The automatic hunt opens at **00:00 on 1 October** and ends at **00:00 on 2 November**, so all of 1 November is included. An early opening keeps that end date and does not open rewards early. Claims open at **00:00 on 25 October** and close at **00:00 on 5 November**, including all of 4 November. Staff can adjust the dates or pause access; `/hv info`, the field guide, and the menu show the current state and dates.

The icons in `/hv` display your collection; they are not items you can take out. Once all 23 types are recorded, **Collect Sherds** confirms that your collection is complete and tells you whether your reward is ready, already claimed, awaiting staff setup, or needs staff review. Extra sherds stay yours to trade. The guide book at the top explains the story and rules. Use the barrier at the bottom right to close the menu.

## Your field journal

Open **Your Field Journal** in either `/hv` menu, or use `/hv journal`, to uncover a short mystery about the infection and its cure. Seven chapters unlock at **0, 1, 5, 10, 15, 20 and 23 recorded sherd types**. The opening chapter is available immediately; locked pages show how many types you need next. Submit your fragments with **Collect Sherds** to advance. Traded fragments count too.

Newly unlocked chapters are announced after your collection is saved. Your existing progress already counts, and you can reread unlocked chapters while the event is dormant. The journal is a reading screen; you do not need an empty inventory slot or carry a book.

Recording your final missing type completes the collection journal and leaves the event menu closed for a small, private celebration. With `/hv effects full`, you see green and white sparkles and hear a quiet chime. `reduced` shows just a few green particles without sound, and `off` keeps only the normal chat messages. Server effect settings and your client particle settings still apply. Reopening the menu, submitting duplicates or reconnecting does not replay it.

Story completion does not skip the reward claim dates. Reopen `/hv` to check when you can claim your reward.

## Encounter field notes

Use `/hv notes` or **Encounter Field Notes** in the menu to read short observations from your fights. Eligible combat with an infected mob in Survival records that region's note once damage actually takes effect. You do not need to land the killing blow or find a boss variant. Merely visiting a world, watching a fight or fighting in god mode does not record a note.

There are ten regional observations, including General World. They are optional memories, separate from your sherd collection: trading can still complete all 23 types and earn your reward without discovering every note. Saved notes survive reconnects, restarts and collection resets for this edition. Reading them creates no book item.

## Rebuild the Seal

The journal chapters unlocked at **5, 10 and 20 recorded types** hide clues to a three-symbol sequence. After recording all 23 types, open **Rebuild the Seal** or `/hv seal`, choose three symbols, then press the rebuild button to discover an optional extra ending.

A wrong answer gives you another try. The puzzle consumes no items, grants no extra reward and is never required to claim your completion reward. Your solved ending stays available to reread in the journal and Seal screen, even while the event is dormant. A collection reset clears the solved ending so you can try again after rebuilding your collection.

## Regional outbreaks

During the hunt, staff may announce a temporary surge in one region. Infected mobs become more likely there until the displayed end time; `/hv outbreak` shows the current focus and any weekly schedule. Other regions keep their usual encounters and fragment pools. A surge does not guarantee a spawn or drop, and there are no exclusive fragments that require attending one.

The optional weekly rotation starts disabled. If staff enable its starting configuration, the daily focus begins at **18:00 Europe/Amsterdam** and lasts two hours. Event dates, spawning pauses and normal encounter limits still apply. A surge never extends the hunting season into the reward-only days.

## World and fragment guide

Each region has its own fragment pool. The in-game world guide reflects the server's current mob settings. Infected Endermen belong only to the End in the starting configuration. General World has infected Bogged, and the Nether uses suitable Nether mobs. Staff may tune the eligible mobs without changing your recorded collection.

Each world card shows your progress for that region, such as **1/3**, with **✓** beside recorded fragments and **○** beside missing ones. Completed regions turn green and glow. These counts use your saved collection; carrying a sherd does not count until you press **Collect Sherds**. The **All Worlds / Only Missing** filter and page navigation refresh your personal progress each time you use them.

Use `/hv hints` for a chat overview, or `/hv hints wild` for the Wilderness's missing IDs, mobs, regional boss title, and exploration clues. Tab completion lists the available region keys. These commands use the same current drop pools as the GUI, including staff changes. A missing fragment may require several encounters or a trade; hints never guarantee a particular drop.

Check each world's status before travelling. Disabled or unloaded worlds, dormant hunts, and paused spawning are labelled. Local protection rules still apply even where encounters are configured. If every configured region is complete but your total is below 23, ask staff about unassigned fragments or trade for existing copies.

### Infected mobs per world

Look for the **infected versions** of the mobs below, including their regional boss variants. The [sherd table](#sherds-and-their-infected-mobs) also lists the mobs beside every collectible. These are the starting world settings; `/hv worlds` and `/hv hints` show any staff changes.

| Region | Infected mobs in the starting configuration | Regional boss name | Boss outline |
| --- | --- | --- | --- |
| The End | Endermen | Void Herald | Black |
| General World | Bogged | Marshbound Harrier | Dark green |
| The Nether | Wither skeletons and piglins | Ashen Overlord | Red |
| The Wilderness | Zombies, husks, and drowned | Thornbound Stalker | Dark red |
| Cave World | Skeletons and spiders | Echo Warden | Gold |
| Acid World | Drowned and zombies | Caustic Reaver | Green |
| Skyblock | Skeletons and zombies | Skyborne Harbinger | Blue |
| Oneblock | Spiders and zombies | Fractured Sentinel | Light purple |
| Chunkblock | Zombies and spiders | Rift Marshal | Yellow |
| Skygrid | Skeletons and spiders | Gridbound Revenant | Cyan |

Boss names include the mob type and may be customized by staff. Staff can configure varied armor colors, trims and weapons, so two bosses may look different. Equipped bosses keep their outfits: armor and weapons are encounter equipment, not extra loot. Endermen, spiders, shulkers, and optional animal bosses use their regional name, particles and boss outline without humanoid outfits.

Regional bosses can also use a short signature move. Wilderness and Acid bosses prepare a rush, Nether bosses charge a small damaging knockback pulse, and the other regions briefly reduce incoming damage with a guard. Watch the warning above your hotbar: the default gives you two seconds to react. These warnings remain visible with optional effects turned off. Staff can adjust or disable the moves; ordinary infected and animal packs do not use them.

The outline identifies boss variants; ordinary infected do not gain it. It uses Minecraft's glowing outline, which can show through walls while the mob is within your client's entity tracking range. It stays visible with `/hv effects off`, since that preference controls optional particles and sounds. Staff can change or disable regional outlines. Black can be subtle against the End's dark background.

The world guide also displays regions that are not enabled yet; check the encounter status on each card. Encounters become available only when staff enables and validates that region. Natural encounters favor mobs that can spawn again; structure-only mobs do not magically repopulate cleared structures. Look for the infected versions, not every ordinary mob of these types.

### Sherds and their infected mobs

**Any eligible infected mob listed for a region can drop any sherd in that region's pool.** For example, infected zombies, husks and drowned in the Wilderness can each drop `hv06`, `hv07` or `hv08`. No one mob type is required for a particular sherd within that pool. Ordinary, uninfected mobs do not drop event sherds, and an eligible kill still has to win the drop roll.

| Region | Infected mobs to hunt | Pottery sherd (ID) | Collectible title |
| --- | --- | --- | --- |
| The End | Endermen | Explorer (`hv01`) | Fragment of the Lost Expedition |
| The End | Endermen | Prize (`hv02`) | Reclaimed Jewel of the Void |
| General World | Bogged | Archer (`hv21`) | Oath of the Twilight Hunter |
| The Nether | Wither skeletons and piglins | Burn (`hv03`) | Ember of the Fading Flame |
| The Nether | Wither skeletons and piglins | Skull (`hv04`) | Remnant of the Withered King |
| The Nether | Wither skeletons and piglins | Blade (`hv05`) | Shard of the Fallen Champion |
| The Wilderness | Zombies, husks and drowned | Howl (`hv06`) | Echo of the Final Howl |
| The Wilderness | Zombies, husks and drowned | Snort (`hv07`) | Relic of the Restless Beast |
| The Wilderness | Zombies, husks and drowned | Angler (`hv08`) | Token of the Cleansed Waters |
| Cave World | Skeletons and spiders | Miner (`hv09`) | Legacy of the Haunted Mine |
| Cave World | Skeletons and spiders | Mourner (`hv10`) | Echo of the Silenced Deep |
| Acid World | Drowned and zombies | Brewer (`hv11`) | Vial of the First Cure |
| Acid World | Drowned and zombies | Danger (`hv12`) | Mark of the Broken Curse |
| Acid World | Drowned and zombies | Heartbreak (`hv23`) | Heart of the Fading Blight |
| Skyblock | Skeletons and zombies | Guster (`hv13`) | Whisper of the Hollow Sky |
| Skyblock | Skeletons and zombies | Sheaf (`hv14`) | The Reclaimed Harvest |
| Oneblock | Spiders and zombies | Heart (`hv15`) | Heart of the Mended World |
| Oneblock | Spiders and zombies | Plenty (`hv16`) | Promise of Renewal |
| Oneblock | Spiders and zombies | Friend (`hv22`) | Companion of the Last Stand |
| Chunkblock | Zombies and spiders | Shelter (`hv17`) | Refuge from the Long Night |
| Chunkblock | Zombies and spiders | Scrape (`hv18`) | The Untainted Fragment |
| Skygrid | Skeletons and spiders | Flow (`hv19`) | Thread Beyond the Shadows |
| Skygrid | Skeletons and spiders | Arms Up (`hv20`) | Reach Beyond the Blight |

The starting pools give the End two types (`hv01` and `hv02`), General World one (`hv21`, Archer), and the Wilderness its existing three (`hv06`, `hv07` and `hv08`). Your in-game guide shows any staff customizations. If you already recorded `hv21`, it still counts. Unused authentic copies found in the End before this move also remain valid and tradable. The 23 IDs and completion requirement have not changed.

In General World, search swamp and mangrove swamp habitats for Bogged. These are their natural spawning biomes. [Minecraft’s official release notes](https://www.minecraft.net/en-us/article/minecraft-java-edition-1-21) also describe trial-spawner Bogged, but those do not become infected in this event: automatic infection requires a natural spawn.

Use the region where the fragment drops to find it. Collection submission uses the fragment's authentic event identity and your current event edition. Simply renaming an ordinary pottery sherd does not make an event fragment.

## Infected animal packs

Staff can optionally let wild cows, sheep, pigs, chickens, rabbits, and mooshrooms become infected in selected worlds. This is off by default. The world guide shows the animals enabled for each region. Only newly appearing wild animals can be selected; the event does not search existing herds or infect animals that already have custom names, pets, or animals created by breeding.

These infected animals can chase the same player as a small pack. The default is up to three animals for 90 seconds; staff can choose a chase lasting one to two minutes. Late arrivals share the original deadline, so joining a pack does not restart the chase. They make short-range attacks when they can see and reach their target. Keep moving, fight back, or escape to safety.

Defeating an eligible infected animal uses the region's usual sherd pool and drop chance. Surviving animals disappear when their chase expires; they do not award sherds for timing out. Infected animals cannot be fed, bred, sheared, milked, renamed, or used as farm animals. Ordinary animals remain unchanged.

## Duplicates and trading

You need 23 different types, not 23 copies of one type. Spare authentic fragments can be given to friends or traded. The server balances selections within each world's pool to reduce long runs of the same fragment; drops still depend on winning the drop roll. Trading remains useful, especially when friends explore different worlds.

The visible kit id, such as `hv20`, identifies a fragment type for trading. The original finder's name and world in its lore do not restrict who can submit it. The server preserves the configured CMI kit title and lore; the titles in the table above are the event design references and may differ from customized kit titles.

Move fragments around your inventory, store them in chests, sell them through `/ah`, exchange them through `/trade`, or discard unwanted ones through `/trash` as usual. Discarded fragments do not count toward your collection.

Keep a fragment unmodified until you submit or trade it. Infected items cannot be repaired, renamed, enchanted, combined, upgraded, or used as crafting ingredients. Their normal use and durability loss may continue. These restrictions remain after the event ends.

## Commands

| Command | Purpose |
| --- | --- |
| `/hv` | Open your 23-fragment collection and reward menu. |
| `/hv info` | Show the introduction, current event state, and player guide link. |
| `/hv help` | Show the commands you can use. |
| `/hv book` | Read the event story and field guide. |
| `/hv journal` | Read story chapters unlocked by your recorded collection. |
| `/hv notes` | Read regional observations recorded through eligible infected combat. |
| `/hv seal` | Try the optional three-symbol story puzzle after recording all 23 types. |
| `/hv outbreak` | See the current regional surge and weekly schedule. |
| `/hv worlds` | Open the world and infected-mob hints. |
| `/hv hints [world-key]` | Show personal collection hints in chat, for example `/hv hints wild`. |
| `/hv collect` | Run the same deliberate submission as the Collect Sherds button. |
| `/hv claim` | Run the same eligibility-checked completion claim as the reward button. |
| `/hv effects full` | Show the stronger infected aura and the full private completion celebration. |
| `/hv effects reduced` | Reduce event particles and sounds. |
| `/hv effects off` | Turn off optional event effects for yourself. |
| `/hv reminders [on\|off]` | Check, restore or hide this season's join invitations and reward-claim reminder. |
| `/hunt` | Browse the shared Event Hunts index. |

Access is granted by staff for the testing period and then to the intended player groups. Once staff arm the schedule, its phases change automatically. Installing the jar does not grant everyone access.

## If something is unclear

**Can I complete my collection with sherds that have another player's name?** Yes! Trade your duplicates or give them to friends, then submit the received sherds through `/hv` → **Collect Sherds**. The finder's name and world in the lore are informational; they do not lock the sherd to that player. Authentic, unused sherds from the current event count toward **your** collection, even if someone else found them all. Submitting consumes one of each missing type and leaves extra copies in your inventory. No renaming or re-stamping is needed. Sharing and teamwork are welcome!

**Why is my fragment still in my inventory?** You may already have that type recorded, the event may be dormant, or the item may not have authentic identity for this edition. `/hv` shows which types are still missing. Staff can inspect older kit samples when necessary.

**Why did a mob not drop a fragment?** Only eligible infected kills can roll a fragment. The drop chance is below 100%; ordinary mobs and cleanup do not award event fragments.

Fight in Survival and finish the encounter with your own attack or projectile, such as a sword strike, arrow or thrown trident. The credited killer must have recently damaged the infected mob and still be nearby. Under the default drop rules, hitting it once and letting lava, a fall, cramming or another trap finish it does not qualify. Burning after a Fire Aspect or Flame hit, pets and passive Thorns damage do not count as your finishing blow either. Friends can help and trade the resulting fragment, but the encounter does not create a separate reward for every party member.

**Why can I not see particles?** Use `/hv effects full` and stay within 24 blocks of an infected mob. Particles appear about once per second and become denser within 16 blocks and again within eight blocks; bosses have a stronger aura. They are purple by default, but staff can change their type and strength during the event. `reduced` shows a single particle every four seconds and `off` suppresses the optional effects, even when staff increase the intensity. Your Minecraft particle settings can reduce what you see. Staff can also disable particles for the event. God mode does not hide these visual effects, but it still prevents combat participation and fragment rewards.

**Can I lose my progress by closing the menu?** Recorded progress belongs to your player account and event edition. Reopen `/hv` after a submission finishes. If a save or delivery needs staff review, avoid repeated attempts and report the displayed status.

**What happens if staff reset my collection?** Your recorded total returns to 0/23 and the optional Seal ending resets. Your encounter field notes remain saved. Existing unused event sherds still work, and you do not need to re-stamp them. Submitted sherds are not returned. Staff can separately choose whether to clear a previous reward claim; an ordinary collection reset keeps that claim recorded.

**My collection is complete. Why can I not claim?** Check the claim dates in `/hv info`, leave inventory space, and make sure the reward has not already been received. Claims only open during the configured window, even if the reward is ready and your collection is complete. Staff can also pause claims. If the reward is awaiting staff setup, your collection stays saved until staff finish preparing it. A pending or review-required transaction must be resolved before another attempt.

**Does this replace the other Halloween activities?** No. Halloween Virus is another adventure in the Event Hunts jar; Ghost Hunt, Doors, and Coconut Hunt keep their own rules and progress.
