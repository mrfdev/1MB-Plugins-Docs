# CMI Announcer to Tips: local acceptance and manual cutover

Paths beginning with `<server-root>` are relative to the owner-managed server directory; exact machine paths remain in the local evidence.

Prepared 4 November 2026 for [ScheduledTips #80](https://github.com/mrfdev/1MB-Library/issues/80). The owner approved the content review, eight additional features, game-type coverage, world targeting and experience weighting. Targeting is now implemented in ScheduledTips and requires the new complete-suite build described in the verification record. The live server remains read-only throughout this work.

## Result and source

The catalogue contains **62 enabled tips and no remaining disabled review entries**. Of the 60 original CMI announcements, 59 are represented by 46 curated tips and source 27, Celebration, was retired at the owner's request. Three starter IDs (`visit`, `warps`, `profile`) remain, with refreshed wording. Eight approved Library features and five additional game-type discovery entries complete the catalogue. Runtime feature availability, permissions and audience restrictions can reduce the eligible count for a player.

- Live handoff reference: [`docs/examples/scheduledtips-1mb.yml`](../examples/scheduledtips-1mb.yml), deliberately `enabled: false` and using the live world policy.
- Installed acceptance config: `servers/Paper-26.3/plugins/1MB-CMIAPI/ScheduledTips/config.yml`, enabled locally with the test server's own world aliases.
- Read-only source: `m4pro-mini:<server-root>/live-1mb-3.14.5-mc-26.3/plugins/CMI/Settings/Schedules.yml`, specifically `Announcer.Commands`.
- Source SHA-256: `eb720bc5050390ef03866527c0d8788bee81e6273f9442227af0caf811c76c9b`.
- Evidence/backups: `.scratch/tips-announcer-2026-11-04/` and `.scratch/tips-live-coverage-2026-11-04/`. These contain no deployment authorization.

The source has 45 ctellraw and 15 plaintext rows. Its saved settings were `Enabled: false`, `MinPlayers: 2`, `Delay: 1500`, `Randomize: true`. Live ScheduledTips was also disabled, and its startup log reported dormancy. No live commands, reloads, restarts or file writes were performed. Other CMI schedules are outside this migration.

## Owner's nine review decisions

| # | Tip | Approved result |
| --- | --- | --- |
| 1 | `oneblock_team` | Enabled in the OneBlock world family. The wording is explicitly for island owners; BentoBox enforces the role when the suggested command is sent. |
| 2 | `portals` | Enabled in regular worlds only. Travel commands are suggestions for the player to review. |
| 3 | `celebration` | Removed, including all catalogue references. The old 2021 destination is not advertised. |
| 4 | `pointy_fish` | Enabled with the confirmed special-fish welcome-points wording. No ordinary-fish or fixed-quantity claim. |
| 5 | `server_version` | Enabled with the confirmed static Third Era wording, at low weight. No unresolved version placeholders. |
| 6 | `jump_perk` | Says Builders and higher groups; limited to regular worlds and the effective `cmi.command.jump` permission. No compass claim. |
| 7 | `fish_tournament` | Enabled; `/fisht info` reports whether a tournament is active. No fixed timetable promised. |
| 8 | `farm_tournament` | Enabled; `/farmt info` reports whether a tournament is active. No fixed timetable promised. |
| 9 | `utility_commands` | Portable crafting retains this ID; Ender Chest and anvil have separate IDs. Each requires its own CMI command permission and a regular world. |

## Added active Library features

Live flags and startup activity were checked read-only on 4 November, including Forage's active state. Each addition declares the stable Library feature ID, so dormant/missing/disabled/inaccessible features are withheld automatically.

| Topic | Information/menu action | Audience |
| --- | --- | --- |
| AutoSell | `/autosell` | Exact configured regular worlds, including optional Nether/End; the menu handles personal opt-in. |
| Forage | `/forage next` | The ten live allowed worlds; the command explains personal progression and unlocks. |
| AFKShrine | `/afkshrine gui` | The ten live tracking worlds. No automatic claim, trade or reward promise. Shared AFK quiet rules apply. |
| DiscordChat | `/discordchat` | Players with feature access; explains linked accounts and meaningful chat without fixed rates. |
| Emotes | `/emotes` | Players with feature access; the menu handles targets and permissions. |
| PlayerTodo | `/todo` | Personal notes; incomplete input is suggested, never submitted automatically. |
| Chunks | `/chunks` | Players with effective Chunks access, in any world. Does not promise more simulation distance. |
| MobHat | `/mobhat list` | NORMAL environments only. The list handles individual mob unlocks. |
| Six GameTypes | `/gametype menu <id>` | OneBlock, SkyBlock, AcidIsland, CaveBlock, SkyGrid and ChunkBlock discovery outside their own world families. No immediate teleport. |

No new tips for RecordingMode, NameMC or HideAndSheep were added. Seasonal entries remain deferred until the owner chooses an activation/expiry policy. Operational and staff-only features stay out of the player catalogue.

## Timing and enforced audiences

One scheduling opportunity remains every **1,500 seconds (25 minutes)**, with **2 online players** required and a **90-second startup delay**. A single scheduler chooses a tip separately for each player. `schedule.randomize: false` uses smooth weighted rotation; `true` uses weighted random selection while avoiding consecutive choices when alternatives exist. Rotation state is bounded to the online session and clears on quit, reload and disable. Saved delivery history and preferences remain intact.

Experience uses the online player's recorded playtime: **under 12 hours** is newcomer, **12 to under 100 hours** regular, and **100 hours or more** experienced. These are configurable starting values, not inferred LuckPerms ranks. Introductory tips use weights **12 / 4 / 1**, most activities **4 / 4 / 4**, social/cosmetic tips **2 / 3 / 3**, and community/history tips **1 / 1 / 1**. Game-type discovery is **3 / 3 / 2**. Weights control the topic mix, not a guaranteed personal frequency or extra messages. Existing/reset playtime statistics can change someone's band; rank-based frequency overrides are a possible later refinement.

`targeting.world-groups` defines exact Bukkit world-name sets. `tip-targeting` rows have seven fields:

```text
tip-id|world-group[,group] or *|permission[,permission] or *|environment[,environment] or *|new|regular|experienced
```

World groups are OR alternatives; listed permissions are all required. Environments are `normal`, `nether`, `the_end`, `custom`. `*` means unrestricted in that field; weights are integers 0–100, with zero excluding that experience band. Unknown groups/tip IDs, duplicate rules, malformed lists or bad weights pause all promotion until fixed. Unlisted tips retain weight 1 for everyone. Staff preview remains available and does not count as delivery. Removing a tip through staff tools also removes its targeting rule atomically.

The live reference separates regular worlds, hubs, each game-type family, AutoSell's worlds, Forage's worlds and AFKShrine's worlds. It includes explicit conventional world aliases where appropriate; there is no substring matching or automatic removal of namespaces. The local acceptance file adapts these named sets to local mappings such as `spawn`, `spawn_nether`, `spawn_the_end`, `bskyblock` and `acidisland`. **Use the live reference's world groups when deploying, not the adapted test groups.** Detailed local differences are saved in `local-world-adaptations.json`.

Effective player permissions enforce group perks, including inherited/contextual grants and revocations. No LuckPerms user lookup, database read, network identity lookup or permission change is performed. Current world, environment, playtime band, feature state and permissions are rechecked before queued delivery. Island ownership and per-mob unlocks remain authoritative in their destination commands; the tip does not grant access.

Shared guidance still controls quiet/AFK/RecordingMode state, frequency, hidden/postponed topics and repeat timing. Actual normal chat delivery still unlocks Hide only after 12 views. Paid allowances and receipts are unchanged; suppressed messages do not increment chat views. Changing audiences never creates separate world timers or bypasses the shared hint budget.

## Text and interaction decisions

All **62** bodies use strict Adventure MiniMessage through the actual Core renderer. Plain broadcasts and CMI `<T>` become body text, `<H>` becomes hover text, and `<C>`/`<SC>` become player run/suggest actions. Travel, state changes and incomplete commands are suggested; information and menus are clickable. `/r ` retains the space for the player's message. `/pvp status` reads the current choice without toggling it.

CMI prefixes, named/hex colors and legacy formatting were replaced with one Tips prefix and explicit MiniMessage colors. No raw CMI tags or unresolved placeholders remain. `<CC>`, `<CCI>`, `<SI>` and `<URL>` were absent from the source. This conversion therefore needs no CMI compatibility parser. Any future console-click importer requires a separate reviewed action design; it must not silently run privileged commands.

The active general `homes` and `shops` tips intentionally send players to `/groups` and do not publish unverified numeric limits. Source claims retained for review:

| Source group label | Homes | Chest shops |
| --- | ---: | ---: |
| First | not specified | 1 |
| Player | 3 | 5 |
| Member | 6 | 10 |
| Boosted | 8 | 15 |
| Builder | 16 | 25 |
| Rogue | 18 | 30 |
| Patron | 22 | 35 |
| MVP | 23 | 40 |
| Epic | 28 | 50 |

Also removed: the changing “15+ years” wording, guaranteed rewards for every greeting, “all types” of sellable fish, unverified multi-job limits and fixed monthly mcMMO/Jobs booster schedules. The replacement entries point to current information instead. The stale `profile` instruction to use `/tips off` for recording now explains `/tips` and the free `/guidance` choices.

## Owner's manual handoff after local gameplay acceptance

1. On the local server, check `/tips admin status`, `/tips admin list` and `/tips admin preview <id>`. Private chat previews retain their authored hover/click actions, including suggestions; GUI lore is inert. Check ordinary Java/Bedrock accounts in regular and game-type worlds, a Builder's `/j`, each utility permission, new/experienced weighting, shared quiet controls and booster substitutions. A preview is not proof of timed delivery.
2. After accepting that local gameplay, run `scripts/gradle-oracle.sh stageTestedJarsForLive`. Deploy the **complete tested suite**, including its intended active/disabled routing, during an owner-controlled maintenance window. These targeting rules require the new binaries; copying only the config to old suite 834 does not enforce them. The maintained test server must be stopped when staging. See [release workflow](../release.md).
3. Back up the live Tips config and CMI `Settings/Schedules.yml`. Preserve live preferences, paid allowances and transaction receipts. Never copy test `playerdata`, guidance history or ledgers to live.
4. While live Tips remains disabled, merge `tips`, `disabled-tip-ids`, `tip-feature-requirements`, `tip-targeting`, `targeting`, the four `schedule` values and `booster-reminders.tip-id-matchers.discordchat` from the reviewed live reference. If accepted wording was edited on test, transfer those tip rows, but use the reference's live world groups. Reconcile any new live IDs and preserve live purchase settings, other booster settings and translations. Keep `enabled: false` until the separate activation step.
5. Confirm **only** CMI `Announcer.Enabled: false`, leaving all other schedules untouched. Apply through the owner-controlled restart for the new suite, or `/cmi reload` if subsequently required, and verify that the old announcer is inactive. `/cmi schedule Announcer` triggers it; it is not a status check. See [CMI scheduler semantics](https://www.zrips.net/schedule/).
6. Use `/tips admin reload` and `/tips admin status` while dormant. Confirm **62 tips, zero explicitly disabled**, no targeting errors, **1500 seconds**, **2 players**, and per-player weighted rotation. Available counts may be lower if a feature is dormant. Review representative actions before enabling.
7. The owner runs `/tips admin enable`, then checks status and one full multiplayer interval. Confirm no duplicate CMI announcement. Shared preferences and limits can legitimately skip a delivery.

Rollback starts with `/tips admin disable`. Restore the backed-up configuration and reload; if binary rollback is required, use the complete compatible suite during owner maintenance. Preserve histories and paid ledgers. The observed original state has both announcers disabled, so do not automatically enable CMI as rollback.

## Verification

See [4 November targeting verification](../compatibility-tests/scheduledtips-targeting-26.3-2026-11-04.md). The earlier content-only test used suite 834 with 48 tips and nine review holds; it is superseded by this approved 62-tip catalogue and targeting release. No timed real-client delivery or live activation is claimed by automated/console checks.

## Source mapping and added entries

| CMI source row | Tip ID | Intended audience |
| --- | --- | --- |
| 3 | `menu` | New players; occasional discovery for everyone. |
| 54 | `rules` | Everyone; give newcomers higher priority. |
| 2 | `oneblock` | Discovery outside OneBlock; less often while already playing it. |
| 11, 12, 13, 14, 15, 16, 17, 18 | `homes` | New/Player frequently; builders and experienced players rarely. |
| 5, 31 | `mcmmo` | Survival and compatible game types; beginners first. |
| 28 | `discord_ticket` | Everyone; support should stay visible during boosters. |
| 10 | `protection` | New players and survival builders; occasional reminders for everyone. |
| 8 | `fish` | Fishing players and survival worlds; occasional discovery elsewhere. |
| 24, 25 | `groups` | Newcomers first; occasional progression reminder for everyone. |
| Retained starter | `visit` | Builders and established players. |
| 51 | `vote` | Everyone; no fixed reward or daily limit promised. |
| 20 | `back` | New players in regular worlds; review game-type restrictions. |
| 8 | `mine` | Mining and survival worlds; occasional discovery elsewhere. |
| 26 | `community_2011` | Everyone; low-frequency community message. |
| 9, 55 | `jobs_browse` | New players and survival economy; do not assume a job-count limit. |
| 22 | `reply` | New players; rare reminder for regulars. |
| 8 | `farm` | Farming and survival worlds; occasional discovery elsewhere. |
| 35, 36, 37, 38, 39, 40, 41, 42, 43, 53 | `shops` | Survival trading and builders; no unverified numeric quotas. |
| Retained starter | `profile` | Everyone; preserve the starter ID and replace the outdated /tips off recording advice. |
| 6 | `achievements` | All eligible players; no automatic reward guarantee. |
| 21 | `dback` | New survival players; review game-type death and teleport rules. |
| 45 | `invite_friends` | Everyone; low-frequency community message. |
| 7 | `mcmmo_commands` | Established survival and compatible game-type players. |
| 49 | `market` | Survival economy and traders; occasional discovery elsewhere. |
| 1 | `sit` | Everyone; low-frequency cosmetic reminder. |
| 50 | `discord_announcement` | Everyone; must not be replaced by a DiscordChat points booster. |
| 9 | `pvp` | Regular worlds with PvPToggle; the status action does not toggle it. |
| 46 | `warp_signs` | Newcomers first; rare reference for regulars. |
| 29 | `hop` | Everyone; informational route only, no immediate mount. |
| 4 | `forums` | Everyone; low-frequency help reference. |
| 30 | `points_greet` | Everyone; do not promise a point for every greeting. |
| Retained starter | `warps` | New players and explorers; preserve the starter ID. |
| 9 | `party` | Friends and established survival players; compatible game types only. |
| 33 | `fish_shop` | Fishing players; removed the unsupported claim that all fish can be sold. |
| 52 | `helpers` | New players first; occasional reminder for everyone. |
| 58 | `mcmmo_booster` | mcMMO players; current status instead of a fixed monthly promise. |
| 47 | `here` | Explorers and builders in regular worlds. |
| 48 | `vote_tokens` | Returning voters and collectors. |
| 59 | `jobs_booster` | Jobs players; no fixed frequency or duration promised. |
| 19 | `oneblock_team` | OneBlock worlds; command enforces island ownership and access. |
| 23 | `portals` | Regular worlds only, not game-type dimensions. |
| 32 | `pointy_fish` | Fishing in regular survival and game-type worlds; special fish only. |
| 34 | `server_version` | Everyone, rarely; owner confirmed static Third Era wording. |
| 44 | `jump_perk` | Regular worlds; effective cmi.command.jump permission required. |
| 56 | `fish_tournament` | Regular survival and game-type worlds; no calendar promise. |
| 57 | `farm_tournament` | Regular survival and game-type worlds; no calendar promise. |
| 60 | `utility_commands` | Regular worlds; effective cmi.command.workbench permission required. Original ID retained. |
| 60 | `utility_enderchest` | Regular worlds; effective cmi.command.ender permission required. |
| 60 | `utility_anvil` | Regular worlds; effective cmi.command.anvil permission required. |
| Approved addition | `autosell` | Regular survival worlds supported by live AutoSell; no island game types. |
| Approved addition | `forage` | Live Forage supported worlds; command explains personal unlocks. |
| Approved addition | `afkshrine` | Live AFKShrine supported worlds; shared AFK quiet rules still apply. |
| Approved addition | `discordchat` | Everyone with DiscordChat access; rates and account linking remain in the menu. |
| Approved addition | `emotes` | Everyone with Emotes access; occasional social discovery. |
| Approved addition | `player_todo` | Everyone with PlayerTodo access; more useful after the first introductions. |
| Approved addition | `chunks` | Only players with Chunks access; applies in any world. |
| Approved addition | `mobhat` | Normal environments only; MobHat menu filters per-mob access. |
| Approved addition | `skyblock` | Discovery outside its own world family; no immediate teleport. |
| Approved addition | `acid` | Discovery outside its own world family; no immediate teleport. |
| Approved addition | `cave` | Discovery outside its own world family; no immediate teleport. |
| Approved addition | `skygrid` | Discovery outside its own world family; no immediate teleport. |
| Approved addition | `chunkblock` | Discovery outside its own world family; no immediate teleport. |
| 27 | `celebration` (removed) | Retired at the owner’s request. |
