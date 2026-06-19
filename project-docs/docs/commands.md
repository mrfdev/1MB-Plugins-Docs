# Commands

This page documents the global command shape. Individual plugins have their own command pages under [plugins](plugins/README.md).

## Current Global Library Commands

```text
/1mbcmi info
/1mbcmi status
/1mbcmi version
/1mbcmi doctor
/1mbcmi features
/1mbcmi storage
/1mbcmi permissions <player> [plugin|all] [page]
/1mbcmi permissions node <player> <permission>
/1mbcmi permissions plugin <plugin> <player> [page]
/1mbcmi help
/1mbcmi debug plugins
/1mbcmi debug plugins <category>
/1mbcmi debug cmi
/1mbcmi debug plugin <plugin>
/1mbcmi debug plugin <plugin> health
/1mbcmi debug plugin <plugin> commands [page]
/1mbcmi debug plugin <plugin> permissions
/1mbcmi debug plugin <plugin> placeholders
/1mbcmi debug plugin <plugin> config
/1mbcmi debug plugin <plugin> all
/1mbcmi debug bundle
/1mbcmi debug clean cache [global|all|plugin <plugin>] [--dry-run]
/1mbcmi debug clean playerdata plugin <plugin> [--dry-run|--confirm]
/1mbcmi config <plugin>
/1mbcmi config set <plugin> <path> <value>
/1mbcmi gui test
/1mbcmi gui examples
/1mbcmi rules [page]
/1mbcmi rules validate
/1mbcmi rules test <rule>
/1mbcmi translations status
/1mbcmi translations missing [plugin|all]
/1mbcmi translations reload
```

## Current Global Command Reference

| Command | Purpose |
| --- | --- |
| `/1mbcmi info` | Introduces the shared library and links to the detailed GitHub documentation. |
| `/1mbcmi help` | Shows the shared command reference. |
| `/1mbcmi version` | Shows concise version, build, Java, Paper, and repository metadata. |
| `/1mbcmi status` | Shows build, Java/Paper target, hook status, CMI status, and data root. |
| `/1mbcmi doctor` | Runs support checks for hooks, feature registration, config validation, and storage paths. |
| `/1mbcmi features [category]` | Lists registered 1MB CMI-API features with active/config/dependency/validation health, optionally filtered by category. |
| `/1mbcmi storage` | Shows shared data, cache, translation, debug, and playerdata storage sizes. |
| `/1mbcmi permissions <player> [plugin\|all] [page]` | Read-only permission probe for registered 1MB CMI-API permission nodes. |
| `/1mbcmi permissions node <player> <permission>` | Read-only effective-state probe for one exact permission node. |
| `/1mbcmi permissions plugin <plugin> <player> [page]` | Plugin-first form for checking one feature's registered permission nodes. |
| `/1mbcmi debug plugins [category]` | Lists registered features and health states in a compact debug-friendly view. |
| `/1mbcmi debug cmi` | Prints CMI, CMILib, CMI-API, server, and plugin metadata for support. |
| `/1mbcmi debug plugin <plugin>` | Shows a summary for one registered feature. |
| `/1mbcmi debug plugin <plugin> health` | Shows config default repair status, missing keys, validation issues, and metadata counts for a feature. |
| `/1mbcmi debug plugin <plugin> commands [page]` | Lists command usage, short purpose notes, and permission hints for a feature. |
| `/1mbcmi debug plugin <plugin> permissions` | Lists permissions declared by a feature plugin. |
| `/1mbcmi debug plugin <plugin> placeholders` | Lists declared placeholders for a feature plugin. |
| `/1mbcmi debug plugin <plugin> config` | Lists flattened config paths, values, types, and whether they are settable. |
| `/1mbcmi debug plugin <plugin> all` | Prints summary, commands, permissions, placeholders, and config for a feature. |
| `/1mbcmi debug bundle` | Writes a sanitized support bundle folder with environment, feature, config, translation, and recent cache-log summaries. |
| `/1mbcmi debug clean cache [global|all|plugin <plugin>] [--dry-run]` | Clears selected cache data without touching playerdata. |
| `/1mbcmi debug clean playerdata plugin <plugin> [--dry-run\|--confirm]` | Removes only that plugin's section from shared playerdata files. |
| `/1mbcmi config <plugin>` | Shows the config file and top-level config keys for a feature. |
| `/1mbcmi config set <plugin> <path> <value>` | Updates a supported config value and reloads that feature. |
| `/1mbcmi gui test` | Opens a shared GUI framework smoke-test page. |
| `/1mbcmi gui examples` | Opens shared GUI framework examples with pagination and confirmation demos. |
| `/1mbcmi rules [page]` | Lists configured safe shared action rules. |
| `/1mbcmi rules validate` | Validates shared action rule ids, triggers, conditions, and action safety. |
| `/1mbcmi rules test <rule>` | Previews a shared action rule without dispatching unsafe command actions. |
| `/1mbcmi translations status` | Shows missing and extra translation key counts for each registered feature. |
| `/1mbcmi translations missing [plugin\|all]` | Lists missing and extra translation keys for one feature or all features. |
| `/1mbcmi translations reload` | Reloads shared and feature translation files. |

## Output Style

Command output is rendered with Paper's Adventure MiniMessage support. The shared library uses a restrained pastel palette for headers, labels, values, list items, and notes so console and chat output is easier to scan without turning debug output into a rainbow.

Dynamic values such as player input, config values, event details, and log snippets are escaped before rendering so they cannot inject MiniMessage formatting.

## Feature Debug Fallback

Feature plugins that do not implement their own local debug command inherit a shared fallback from `1MB-CMIAPI-Lib`. The fallback is locked to that feature's admin permission, usually `onembcmi.<plugin>.admin`, and exposes:

```text
/<plugin> debug
/<plugin> debug status
/<plugin> debug health
/<plugin> debug commands [page]
/<plugin> debug permissions [page]
/<plugin> debug placeholders [page]
/<plugin> debug config [page]
/<plugin> debug set config <path> <value>
/<plugin> debug all
```

The overview page shows the plugin name, technical introduction, category, docs URL, full `/1mbcmi debug plugin <id> all` support command, version/build, target PaperMC version, Java target, runtime Java version, Bukkit/Paper API string, server engine string, and links to the paginated subpages. The health page shows config default repair status, missing keys, validation issues, and metadata counts. In game, shared debug lists stay paginated; console senders receive all shared paginated rows in one command. Plugins with a richer custom debug command keep their own behavior.

Feature `/help` pages are intentionally player-facing: they list commands available to the sender, but do not print permission nodes. Use `/<plugin> debug permissions [page]` or `/1mbcmi debug plugin <id> permissions` when staff need the permission-oriented view.

## Example Commands

```text
/1mbcmi status
/1mbcmi version
/1mbcmi doctor
/1mbcmi features
/1mbcmi storage
/1mbcmi permissions mrfloris visit
/1mbcmi permissions node mrfloris onembcmi.visit.use
/1mbcmi permissions plugin startupdoctor mrfloris
/1mbcmi debug plugins player-fun
/1mbcmi debug cmi
/1mbcmi debug plugin afkshrine
/1mbcmi debug plugin recordingmode all
/1mbcmi debug plugin scheduledtips all
/1mbcmi debug plugin visit all
/1mbcmi debug plugin sellstreaks all
/1mbcmi debug plugin passportdiscovery all
/1mbcmi debug plugin socialgatherings all
/1mbcmi debug plugin journeymap all
/1mbcmi debug plugin kitstreaks all
/1mbcmi debug plugin messagefont all
/1mbcmi debug plugin nick all
/1mbcmi debug plugin emotemenu all
/1mbcmi debug plugin pvptoggle all
/1mbcmi debug plugin boosters all
/1mbcmi debug plugin namemc all
/1mbcmi debug plugin trades all
/1mbcmi debug plugin votetokens all
/1mbcmi debug plugin spawners all
/1mbcmi debug plugin mobhat all
/1mbcmi debug plugin todo all
/1mbcmi debug plugin staffcenter all
/1mbcmi debug plugin profile all
/1mbcmi debug plugin filterlab all
/1mbcmi debug plugin filterguard all
/1mbcmi debug plugin warninglens all
/1mbcmi debug plugin notablemsg all
/1mbcmi debug plugin cmdcostdashboard all
/1mbcmi debug plugin cmiconfig all
/1mbcmi debug plugin economyguardian all
/1mbcmi debug plugin startupdoctor all
/1mbcmi debug plugin updatesmoke all
/1mbcmi debug plugin pluginversions all
/_scheduler debug all
/1mbcmi debug plugin upgrade all
/1mbcmi debug plugin worldsnapshot all
/1mbcmi debug plugin sparkreviewer all
/1mbcmi debug plugin hoppers all
/1mbcmi debug plugin placeholderprobe all
/1mbcmi debug plugin cmiplaceholders all
/1mbcmi debug plugin onembplaceholders all
/1mbcmi debug plugin warpaudit all
/1mbcmi debug plugin worthdrift all
/1mbcmi debug plugin worthhelper all
/1mbcmi debug plugin cmiprobe all
/1mbcmi debug plugin cmidb all
/1mbcmi debug plugin afkshrine commands
/1mbcmi debug plugin global commands 2
/1mbcmi debug plugin afkshrine permissions
/1mbcmi debug plugin afkshrine placeholders
/1mbcmi debug plugin afkshrine config
/1mbcmi debug plugin afkshrine all
/1mbcmi debug plugin global all
/1mbcmi debug clean cache global --dry-run
/1mbcmi debug clean cache plugin afkshrine --dry-run
/1mbcmi debug clean cache all --dry-run
/1mbcmi debug clean playerdata plugin afkshrine --dry-run
/1mbcmi debug clean playerdata plugin afkshrine --confirm
/1mbcmi debug bundle
/1mbcmi config afkshrine
/1mbcmi config set afkshrine messages.enter.enabled false
/1mbcmi gui test
/1mbcmi gui examples
/1mbcmi rules
/1mbcmi rules validate
/1mbcmi rules test welcome-test
/1mbcmi translations status
/1mbcmi translations missing all
/1mbcmi translations reload
```

Feature examples for 1MBPlaceholders:

```text
/_placeholders
/_placeholders status
/_placeholders list system
/_placeholders get 1mb_version
/_placeholders preview branding header
/_placeholders search server
/_placeholders add events event_note The spring event starts soon.
/_placeholders set server_status Maintenance tonight
/_placeholders category events true
/_placeholders backup
/_placeholders reload
/_placeholders debug all
```

PluginVersions:

```text
/pv info
/pv list
/pv list 2
/pv gate
/pv debug all
/pv debug gate
/pv debug url audit
/pv debug url add CMI docs https://www.zrips.net/cmi/
/pv debug url list CMI
/pv export markdown
/pv export discord
```

PlaceholderHealth:

```text
/placeholderhealth
/placeholderhealth info
/placeholderhealth help
/placeholderhealth check
/placeholderhealth check mrfloris
/placeholderhealth list
/placeholderhealth export
/placeholderhealth export mrfloris
/placeholderhealth reload
/placeholderhealth debug placeholders
/placeholderhealth debug all
```

`/placeholderhealth` is a read-only server-owner monitor for configured PlaceholderAPI samples. It parses each configured CMI or `onembcmi` placeholder, flags unresolved, empty, slow, or erroring output, and can export the last or freshly-run check as a Discord-friendly Markdown report. Unlike `/placeholderprobe`, it is not for ad hoc one-off placeholder input; it is for the known sample set you want to keep healthy.

Upgrade:

```text
/_upgrade status
/_upgrade gui
/_upgrade inspect DrPeanut11
/_upgrade simulate DrPeanut11
/_upgrade path DrPeanut11
/_upgrade explain DrPeanut11 new_to_player
/_upgrade DrPeanut11
/_upgrade apply DrPeanut11 new_to_player
/_upgrade notify DrPeanut11
/_upgrade reload
/_upgrade debug all
/_upgrade debug set config debug.enabled true
/_upgrade debug set config debug.notify-all-joins true
```

## Feature Command Examples

Every feature command supports a plain `info` subcommand that gives a player-friendly introduction, a logical starter command, a help command, and the matching public docs link. Technical metadata such as category, build context, private technical docs, and full debug commands belongs on the feature debug page.

Examples:

```text
/afkshrine info
/chillparty info
/recording info
/visit info
/passport info
```

AFKShrine:

```text
/afkshrine status
/afkshrine balance
/afkshrine claim
/afkshrine rewards
/afkshrine trade afkshrine_starter confirm
/afkshrine quests
/afkshrine top daily
/afkshrine top weekly
/afkshrine top monthly
/afkshrine top lifetime
/afkshrine presets
/afkshrine preset aurora
/afkshrine preview aurora
/afkshrine admin audit mrfloris
/afkshrine admin recent sessions
/afkshrine admin recent trades
```

RecordingMode:

```text
/recording
/recording status
/recording help
/recording set tpa on
/recording set msg off
/recording set staffmsgs off
/recording set notablemsgs off
/recording set tips off
/recording set map off
/recording admin inspect mrfloris
```

Visit:

```text
/visit
/visit set Welcome to my base.
/visit set status
/visit set msg Welcome to my base.
/visit set title Crystal Cove
/visit set subtitle Take a look around
/visit set particles sparkle
/visit set sound chime
/visit set effects off
/visit mrfloris
/visit info mrfloris
/visit unset
/visit list
/visit admin inspect mrfloris
/visit admin sync
```

PassportDiscovery:

```text
/passport info
/passport status
/passport types
/passport status warp
/passport stats warp
/passport view warp
/passport known warp
/passport info warp tree
/passport missing visit
/passport missing hand
/passport status biome
/passport view biome
/passport missing block 2
/passport view consume
/passport missing consume
/passport view kill
/passport view mount
/passport view explore
/passport recent
/passport batch
/passport batch fast
/passport stamps
/passport stamps trade biome
/passport stamps trade consume
/passport scan
/passport top all
/passport top weapon
/passport top armor
/passport admin inspect mrfloris biome
/passport admin reset mrfloris tool diamond_pickaxe
/passport admin dump
/passport admin reload
```

ScheduledTips:

```text
/tips status
/tips off
/tips on
/tips list
/tips seen
/tips dismiss visit
/tips admin preview visit
/tips admin broadcast visit
/tips admin add discord Join our <color:#bde0fe>Discord</color> with /discord.
/tips admin edit discord Join our Discord with /discord.
/tips admin disable-tip profile
/tips admin enable-tip profile
/tips admin status
/tips admin last
/tips admin next
/tips admin config
/tips admin set schedule.interval-seconds 600
/tips admin reload
```

SocialGatherings:

```text
/gathering info
/gathering types
/gathering info campfire
/gathering campfire
/gathering info stargazing
/gathering info fishingcircle
/gathering info gardenpicnic
/gathering info forgecrew
/gathering info readingclub
/gathering info marketmeetup
/gathering info miningparty
/gathering info minecarttour
/gathering info boatparade
/gathering info archeryrange
/gathering info bakeryshift
/gathering info snowday
/gathering info farmharvest
/gathering info beaconrally
/gathering info trailhike
/gathering nearby
/gathering toggle off
/gathering toggle on
/gathering invite beach NikkiPixel
/chillparty invite campfire Theo
/gathering admin status
/gathering admin trigger dinner
/gathering admin setarea beach here 18
/gathering admin setcenter dinner here
/gathering admin setradius dinner 10
/gathering admin show beach
/gathering admin tp beach
/gathering admin setportal trailhike start trailhike_start
/gathering admin setportal trailhike checkpoint trailhike_view
/gathering admin setportal trailhike end trailhike_end
/gathering admin validate trailhike
/gathering admin enable beach
/gathering admin disable beach
/gathering admin reload
```

JourneyMap:

```text
/journeymap
/journeymap status
/journeymap milestones
/journeymap milestones 2
/journeymap rewards
/journeymap claim all
/journeymap claim settler
/journeymap refresh
/journeymap admin inspect mrfloris
/journeymap admin reload
```

KitStreaks:

```text
/kitstreak info
/kitstreak status
/kitstreak status daily
/kitstreak status kit:starter
/kitstreak tracks
/kitstreak kits
/kitstreak calendar
/kitstreak calendar daily
/kitstreak rewards
/kitstreak claim all
/kitstreak claim daily 7
/kitstreak top daily
/kitstreak admin inspect mrfloris
/kitstreak admin reset mrfloris track daily
/kitstreak admin reset mrfloris kit starter
/kitstreak admin reload
```

MessageFont:

```text
/msgfont
/msgfont status
/msgfont list
/msgfont set alt 30m
/msgfont set uniform 2h
/msgfont clear
/msgfont plain on
/msgfont plain off
/msgfont preview illageralt
/msgfont admin inspect mrfloris
/msgfont admin reset mrfloris
/msgfont admin reload
/pmfont status
```

Nick:

```text
/nick
/nick MyName
/nick set MyName
/nick style aurora
/nick clear
/nick undo
/nick status
/nick status mrfloris
/nick bio Cozy builder <3
/nick rate mrfloris 5
/nick top
/nick top claim
/nick share chat
/nick share discord
/nick copycat mrfloris
/nick favorite save 1
/nick favorite use 1
/nick history
/nick legacy status
/nick legacy restore
/nick tools
/nick lab lighter
/nick lab darker
/nick lab pastel
/nick lab redder
/nick lab random
/nick lab warmer
/nick lab cooler
/nick milestones
/nick museum
/nick museum top
/nick realname mrfloris
/nick debug
/nick debug all
/nick debug presets
/nick debug presets validate
/nick admin inspect mrfloris
/nick admin review
/nick admin review logs
/nick admin review resolve <entry-id> checked
/nick admin review dismiss <entry-id> duplicate report
/nick admin validate
/nick admin similar mrfloris
/nick admin reset mrfloris Policy cleanup
/nick admin reset mrfloris --lock 1440 Policy cleanup
/nick admin lock mrfloris 1440 Admin review
/nick admin unlock mrfloris
/nick admin reload
/nick debug permissions
```

Emotes:

```text
/emotes
/emotes 2
/emotes search cheer
/emotes search cozy
/emotes list
/emotes list 2
/emotes run cheer
/emotes run cheer NikkiPixel
/emotes run nomnom snacks
/emotes run highfive Theo
/emotes status
/emotes info
/emotes aliases
/emotes disabled
/emotes enable cheer
/emotes disable cheer
/emotes config
/emotes set output.page-size 21
/emotes set output.list-page-size 8
/emotes debug all
/emotes debug commands
/emotes debug permissions
/emotes debug placeholders
/emotes debug config
/emotes debug aliases
/emotes reload
/emotes admin status
/emotes admin aliases 2
/emotes admin disabled 2
/emotes admin enable freeze
/emotes admin disable freeze
/emotes admin config 2
/emotes admin set search.min-length 2
/emotes admin debug all
/emotes admin reload
```

PvPToggle:

```text
/pvp
/pvp info
/pvp help
/pvp status
/pvp toggle
/pvp on
/pvp off
/pvp mrfloris
/pvp status mrfloris
/pvp toggle mrfloris
/pvp on mrfloris
/pvp off mrfloris
/pvp reload
/pvp admin inspect mrfloris
/pvp admin reset mrfloris
/pvp admin reload
/pvp debug status
/pvp debug commands
/pvp debug permissions
/pvp debug placeholders
/pvp debug config
/pvp debug set config particles.template-mode nearby
/pvp debug set config particles.nearby-distance 7.0
/pvp debug all
```

Boosters:

```text
/rate
/rate status
/rate reminders
/rate reminders off
/rate reminders on
/rate info
/rate help
/rate start mcmmo 1h 2
/rate start jobs 30m 2.5
/rate start all 1h 2
/rate stop mcmmo
/rate stop jobs
/rate stop all
/rate reload
/rate debug status
/rate debug commands
/rate debug permissions
/rate debug placeholders
/rate debug config
/rate debug config features.points.visible
/rate debug config features.points.visible false
/rate debug set config logging.audit-to-console false
/rate debug toggle display.sections.points
/rate debug integrations
/rate debug state
/rate debug raw
/rate debug logs
/rate debug clean logs
/rate debug all
```

NameMC:

```text
/namemc
/namemc info
/namemc help
/namemc status
/namemc verify
/namemc reload
/namemc debug
/namemc debug status
/namemc debug config
/namemc debug set api.global-cooldown-seconds 30
/namemc debug set config rewards.enabled true
/namemc debug verify mrfloris
/namemc debug verify mrfloris -force
/namemc debug player mrfloris
/namemc debug reward mrfloris
/namemc debug reward mrfloris -confirm
/namemc debug commands
/namemc debug permissions
/namemc debug placeholders
/namemc debug all
```

Trades:

```text
/trade
/trade info
/trade help
/trade open summer_event
/trade open category vote
/trade reload
/trade debug
/trade debug status
/trade debug commands
/trade debug permissions
/trade debug placeholders
/trade debug config
/trade debug set config settings.trade-click-cooldown-ms 1000
/trade debug all
/trade debug index
/trade debug player mrfloris
/trade debug summer_event
/trade debug summer_event reset mrfloris
/trade create winter_event
/trade clone summer_event autumn_event
/trade delete winter_event
/trade delete confirm winter_event
/trade capture requirements summer_event
/trade capture icon summer_event
/trade capture reward summer_event
/trade set display summer_event <#F6D365><bold>Summer Event Trade</bold></#F6D365>
/trade set description summer_event Bring event tokens here.
/trade set permission summer_event onembtrade.summer_event
/trade set completion summer_event onembtrade.completed.summer_event
/trade set max summer_event 1
/trade set worlds summer_event survival,oneblock
/trade set money summer_event 2500
/trade set exp summer_event 5
/trade set start summer_event 06-01-2026
/trade set end summer_event 08-31-2026
/trade set category summer_event summer
/trade toggle summer_event true
/trade command add summer_event success console:cmi kit summer %player%
/trade command clear summer_event fail
/trade test summer_event mrfloris
```

VoteTokens:

```text
/votetokens
/votetokens info
/votetokens help
/votetokens progress
/votetokens progress mrfloris
/votetokens tier 1 1
/votetokens admin inspect mrfloris
/votetokens admin inspect .RenonXenon
/votetokens admin inspect 00000000-0000-0000-0009-01f06566cd3b
/votetokens admin grant mrfloris 1 1 1 1 migrated-from-old-log
/votetokens admin revoke mrfloris 1 1 1 corrected-review
/votetokens admin setcount mrfloris 1 1 1 3 corrected-count
/votetokens admin import oldvotes preview
/votetokens admin capture token diamond
/votetokens admin capture extra-token lapis
/votetokens debug capture token diamond
/votetokens debug capture extra-token lapis
/votetokens debug set token-diamond
/votetokens debug set extra-token-lapis
/votetokens admin capture reward 1 1 1
/votetokens admin stamp reward 1 1 1
/votetokens admin certify mrfloris 1 1 1
/votetokens admin response mrfloris
/votetokens admin reload
/votetokens debug all
```

DiscordChat:

```text
/discordchat
/discordchat info
/discordchat help
/discordchat status
/discordchat top points
/discordchat rewards
/discordchat tools
/discordchat milestones
/discordchat history
/discordchat link
/discordchat optout
/discordchat prefix discord
/discordchat suffix chatty
/discordchat admin inspect mrfloris
/discordchat admin export mrfloris
/discordchat admin community 30
/discordchat admin collectible mrfloris 8
/discordchat admin event status
/discordchat admin event start 2h 2 community-night
/discordchat admin event stop
/discordchat admin grantpoints mrfloris 100 event-prize
/discordchat admin takepoints mrfloris 50 correction
/discordchat admin reset mrfloris confirm
/discordchat admin smoke
/discordchat reload
/discordchat debug
/discordchat debug hooks
/discordchat debug commands
/discordchat debug permissions
/discordchat debug placeholders
/discordchat debug config
/discordchat debug economy
/discordchat debug noxp
/discordchat debug first
/discordchat debug fireworks mrfloris
/discordchat debug all
```

GameTypes:

```text
/gametype
/gametype info
/gametype help
/gametype menu
/gametype menu oneblock
/gametype menu skyblock
/gametype menu acid
/gametype menu cave
/gametype menu skygrid
/gametype status
/gametype reload
/gametype debug
/gametype debug hooks
/gametype debug commands
/gametype debug permissions
/gametype debug placeholders
/gametype debug config
/gametype debug all
```

BirthdayLanterns:

```text
/birthday
/birthday status
/birthday set May 28
/birthday set 05-28
/birthday visibility public
/birthday effects on
/birthday greetings send
/birthday presets particle lantern_wish
/birthday presets sound chime
/birthday claim
/birthday claim server_15
/birthday mail player_year_2
/birthday guestbook
/birthday guestbook add mrfloris happy birthday <3
/birthday admin inspect mrfloris
/birthday admin give mrfloris server_15 collectible 1
/birthday admin give mrfloris server_15 usable 5
/birthday admin reset mrfloris claims
/birthday admin reload
/birthday debug all
/birthday debug celebrations
```

`/birthday` opens the player GUI for birthday, player-anniversary, and server milestone lanterns. Normal players can claim eligible rewards, set their birthday with a strict one-correction default, choose particles/sounds, and add sanitized guestbook notes. Admin commands inspect saved state, create marked lantern items for online players, reset scoped playerdata, and reload `config.yml`, `celebrations.yml`, and translations.

LavaBoots:

```text
/lavaboots
/lavaboots status
/lavaboots info
/lavaboots help
/lavaboots admin give mrfloris 1 blacksmith steady 1
/lavaboots admin give mrfloris 3 summer_crystal steady 1
/lavaboots admin give mrfloris 5 ancient_forge sparked 1
/lavaboots admin gui
/lavaboots admin gui mrfloris
/lavaboots admin list levels
/lavaboots admin list themes
/lavaboots admin list profiles
/lavaboots admin inspect mrfloris
/lavaboots admin disableitem summer_crystal_3_ab12cd34
/lavaboots admin enableitem summer_crystal_3_ab12cd34
/lavaboots admin reload
/lavaboots admin debug item mrfloris
/lavaboots debug item
/lavaboots debug all
```

`/lavaboots` is player-safe and inspects a LavaBoots item the player is wearing, holding, or carrying. Admin give commands work from direct console and in game, create dyed leather boots with PDC identity, and do not create crafting recipes. Levels I-III are normal event levels; IV and V are rare event tiers with lava vision while active. The boots spend stored charge seconds, can absorb magma cream or fire charges from the offhand, drain real leather durability while used in lava, and are blocked from anvil, enchanting, grindstone, smithing, mcMMO repair block, and repair-style player commands.

Spawners:

```text
/spawners
/spawners info
/spawners help
/spawners progress
/spawners reload
/spawners admin give mrfloris rabbit 1
/spawners admin give mrfloris cow 4
/spawners admin gui
/spawners admin disable cow
/spawners admin enable cow
/spawners admin setprice rabbit 400000
/spawners admin resetprice rabbit
/spawners admin price angry 750000
/spawners admin move frog friendly builder
/spawners admin move bee event summer
/spawners admin tier create veteran 1mb_veteran Veteran 1.95
/spawners admin setupcommands
/spawners debug item
/spawners debug discovered
/spawners debug all
```

`/spawners` opens the hardened shop GUI. Purchases require the relevant CMI `cmi.placespawner.<type>` permission, available balance through the CMI-backed Vault economy provider, safe inventory space, and a confirmation click. `/spawners progress` shows annual event spawner collection progress and stock state. `/spawners admin gui` toggles shop sections and opens the per-spawner editor; admins can also shift-click a shop spawner entry to edit it. Admin edit commands can disable one id, set or reset a per-spawner price override, change category prices, move a spawner between friendly/angry/restricted/event categories, and create future LuckPerms friendly tiers. `/spawners admin setupcommands` exports LuckPerms commands for the configured CMI place/drop spawner permissions.

Collect:

```text
/collect
/collect info
/collect help
/collect items
/collect submit
/collect stats
/collect leaderboard daily
/collect leaderboard weekly
/collect leaderboard monthly
/collect leaderboard event
/collect hall summer_2026
/collect rewards
/collect exchange
/collect admin reload
/collect admin debug true
/collect admin week 2
/collect admin day 14
/collect admin date 2026-07-14
/collect admin event summer_2026
/collect admin inspect mrfloris
/collect admin reset mrfloris summer_2026
/collect admin report summer_2026
/collect admin feed
/collect admin scavenger start
/collect debug setday 14
/collect debug all
```

`/collect` opens the seasonal event GUI. Players submit configured weekly items through a safe inventory scan rather than by dragging items into a GUI. Only untouched vanilla item stacks count; renamed, lored, damaged, enchanted, custom-model, PDC, or otherwise modified items are ignored. Players can review personal stats, personal bests, community goal progress, scavenger hunt state, top-3 highlighted leaderboard heads, Hall of Fame archives, streaks, claim participation/milestone/top-10 rewards, occasionally discover capped virtual Lucky Finds during valid submissions, and use `/collect exchange` to trade duplicate Collect reward items for configured event score. Admin debug commands can force the event open, test a week, test an event day, test a date, switch the active event, inspect player data, reset one player's event state, force/clear a daily scavenger hunt, run passive feed checks, and export a Discord-friendly markdown report for an event. Leaderboards use event score, which can include configured catch-up, rest, streak, lucky-find, scavenger, community, and duplicate reward exchange bonuses, while reports also keep raw vanilla item totals. Reward, submission, scavenger, and Discord feed command hooks are console-dispatched only after strict allowed-prefix checks.

Forage:

```text
/forage
/forage info
/forage help
/forage guide
/forage status
/forage limits
/forage shop
/forage stats
/forage quests
/forage branches
/forage branch herbalist
/forage top
/forage top points
/forage top daily
/forage recent
/forage tips
/forage tools
/forage camp
/forage compost
/forage dust
/forage admin give mrfloris sickle 1
/forage admin give mrfloris axe 2
/forage admin give mrfloris sword 1
/forage admin give mrfloris mace 1
/forage admin inspect mrfloris
/forage admin inspectitem mrfloris main
/forage admin inspectitem mrfloris offhand
/forage admin xp mrfloris 500
/forage admin level mrfloris 25
/forage admin points mrfloris 1000
/forage admin toollevel mrfloris 12
/forage admin resetcap mrfloris
/forage admin balance
/forage admin livecheck
/forage admin check
/forage admin export
/forage admin export backup
/forage admin camps list
/forage admin camps near
/forage admin camps inspect mrfloris
/forage admin camps release near
/forage admin camps reassign near mrfloris
/forage admin chunks
/forage admin reload
/forage admin save
/forage debug tool
/forage debug tool mrfloris
/forage debug all
```

`/forage` opens the v1 Forage hub GUI. Players can use `/forage guide` for the first-run camp/tool/limits path, buy curated PDC-marked tools from the CMI-backed Vault camp shop, unlock Tier 2 pickaxe, brush, sword, and mace tools after growing any Forage tool to the configured level, view their level/XP/points, use `/forage status` for a compact progress and next-step summary, use `/forage limits` for daily caps, family caps, economy costs, and quest reward ranges, choose a small focused skill branch with `/forage branches`, complete daily, weekly, and monthly `/forage quests` from `quests.yml` for point, XP, and money rewards, read tips, inspect supported source families, view `/forage top` leaderboards, compost plain vanilla forage items near a complete camp, make PDC-marked Forage Dust for bounded growth pulses, upgrade held tools from the camp page, refine supported tools to diamond, add controlled Unbreaking/Efficiency upgrades, repair and merge matching tools near a complete camp, and check whether a nearby camp build is ready. Guide, stats, status, limits, and camp setup stay available away from camp, but the shop and broader activity pages expect a complete nearby camp. Forage progress only counts when a configured natural block is broken or a configured entity is killed with the matching Forage tool in an allowed world. The default tool ownership is intentionally non-overlapping: axe owns logs/fruits, shears own leaves, trowel owns moss, pickaxe owns cave/stone, brush owns sands/relics, sword owns gentle creature sources, and mace owns danger sources. Matching branch actions can grant small configured XP, point, and treasure chance bonuses. Frequent progress, branch, compost, growth, quest, treasure, level, and chunk exhaustion messages are batched into a clickable summary, `/forage recent` shows the latest details, and chunk exhaustion now also gives an immediate short warning so players can move on faster. Global daily caps slow total progress, while per-source-family daily caps let players switch tools and continue with another route when one family is capped. Forage Dust does not award Forage XP or points. When WorldGuard is installed, the default conservative check only counts actions in locations without a specific protected region. Camp anchors are UUID-owned on first real use. Admin commands can give tools, inspect player profiles, inspect held/offhand/armor item PDC and repair-guard state, add or remove profile XP and points, set profile or held-tool levels for testing, reset today's global and per-family daily cap progress, view the active balance preset/cost/cap report, run the colored `/forage admin check` config sanity report for config/quest ranges and references, run the read-only `/forage admin livecheck` readiness checklist for the suggested live preset, export a Markdown data summary with `/forage admin export [backup]`, manage camp claims, view chunk exhaustion counts, reload config/data, and use the shared debug pages.

AutoSell:

```text
/autosell
/autosell info
/autosell help
/autosell status
/autosell preview
/autosell recent
/autosell toggle
/autosell categories
/autosell items mining
/autosell filters
/autosell worlds
/autosell category mining on
/autosell category fancy off
/autosell item cobblestone on
/autosell item diamond_block off
/autosell debug item
/autosell admin reload
/autosell admin check
/autosell admin warnings
/autosell admin warnings blacklist 1
/autosell admin export
/autosell admin boost status
/autosell admin boost start all 20m 1.10
/autosell admin boost start mining 30m 1.25
/autosell admin boost stop
/autosell admin blacklist list
/autosell admin blacklist add diamond_block
/autosell admin blacklist remove diamond_block
/autosell admin category move raw_iron mining
/autosell admin inspect mrfloris
/autosell debug all
```

`/autosell` opens an opt-in inventory cleanup GUI. Players can turn AutoSell on or off, choose categories, browse per-category material pages, toggle individual materials, set value filters, choose a notification style, opt into allowed worlds, preview what would sell, and review recent batched results. AutoSell reads CMI `Worth.yml`, pays through the CMI-backed Vault economy provider, and only scans normal inventory storage slots after a short delayed batch. It never sells hotbar, offhand, armor, open-container, custom-name, lore, enchant, damaged, PDC, custom-model, shulker, bundle, or other modified/storage items by default. The final sale rechecks exact stack identity before removing items and refunds removed stacks if the economy payment fails. Broker progress grows from legitimate sold item volume, sell chains reward active batches within a short window, daily/weekly streaks reward repeated qualifying use, and staff can start temporary AutoSell boosts that appear in `/rate`. Admin commands can reload config/data/worth, run colored readiness checks, manage a hard material blacklist, blacklist materials directly from numbered material warnings, move materials between categories, inspect player profiles, review suspicious volume warnings, start/stop AutoSell boosts, and export Markdown reports.

MobHat:

```text
/mobhat
/mobhat info
/mobhat help
/mobhat status
/mobhat list
/mobhat preview frog
/mobhat preview parrot
/mobhat mob goat
/mobhat position
/mobhat position back
/mobhat position shoulder-left
/mobhat position reset
/mobhat mob turtle
/mobhat target
/mobhat remove
/hat mob goat
/hat mob
/mobhat reload
/mobhat admin inspect mrfloris
/mobhat admin remove mrfloris
/mobhat admin reload
/mobhat debug status
/mobhat debug commands
/mobhat debug permissions
/mobhat debug placeholders
/mobhat debug config
/mobhat debug set config mobs.baby-mobs-only false
/mobhat debug set config worlds.require-per-world-permission true
/mobhat debug set config inventory.require-empty-slot-before-equip true
/mobhat debug set config position.experimental-offset-enabled false
/mobhat debug set config position.style.enabled false
/mobhat debug set config position.style.back.pitch 45.0
/mobhat debug set config position.offset.scale-multiplier 0.55
/mobhat debug all
```

PlayerTodo:

```text
/todo
/todo build a house
/todo add pay Bob 45k
/todo list
/todo list open
/todo list 5
/todo list all 2
/todo list 2 asc
/todo list oldest
/todo list open 2 desc
/todo view 3
/todo edit 3 pay Bob 45k after mining
/todo done 3
/todo undo 3
/todo remove 3
/todo remove 3 confirm
/todo clear completed
/todo search house
/todo share NikkiPixel 3
/todo status
/todo info
/todo help
/todo admin inspect mrfloris
/todo admin purge mrfloris confirm
/todo admin reset mrfloris
/todo admin reload
/todo debug status
/todo debug commands
/todo debug permissions
/todo debug placeholders
/todo debug config
/todo debug set config limits.max-open-items 75
/todo debug set config cooldown.seconds 4
/todo debug set config milestones.enabled true
/todo debug all
```

Refer:

```text
/refer
/refer mrfloris
/refer verify
/refer deny
/refer cancel
/refer status
/refer info
/refer help
/refer admin inspect mrfloris
/refer admin pending
/refer admin reset mrfloris
/refer admin reload
/refer debug status
/refer debug commands
/refer debug permissions
/refer debug placeholders
/refer debug config
/refer debug set config requirements.referrer-min-playtime-seconds 0
/refer debug set config requirements.referred-min-playtime-seconds 0
/refer debug set config rewards.referrer-permission cmi.kit.refer
/refer debug all
```

TPAuto:

```text
/tpauto
/tpauto on
/tpauto off
/tpauto toggle
/tpauto status
/tpauto reset
/tpauto info
/tpauto help
/tpauto admin inspect mrfloris
/tpauto admin set mrfloris on
/tpauto admin reset mrfloris
/tpauto admin reload
/tpauto debug status
/tpauto debug commands
/tpauto debug permissions
/tpauto debug placeholders
/tpauto debug config
/tpauto debug set config accept.tpa true
/tpauto debug set config accept.tpahere true
/tpauto debug set config accept.tpaall false
/tpauto debug set config notifications.requester true
/tpauto debug all
```

Menu:

```text
/menu
/menu 2
/menu open mrfloris
/menu open mrfloris 2
/menu status
/menu info
/menu help
/menu reload
/menu debug status
/menu debug commands
/menu debug permissions
/menu debug placeholders
/menu debug config
/menu debug set config gui.title 1MB Menu
/menu debug set config buttons.market.enabled false
/menu debug all
```

CMIDatabase:

```text
/cmidb status
/cmidb global store event.springfestival.enabled true
/cmidb global get event.springfestival.enabled
/cmidb global has event.springfestival.enabled
/cmidb global delete event.springfestival.enabled
/cmidb mrfloris store quest.bridge.started true
/cmidb mrfloris get quest.bridge.started
/cmidb list global
/cmidb reload
```

CMIConfig:

```text
/cmiconfig
/cmiconfig status
/cmiconfig reload
```

NotableMsg:

```text
/n test
/n
/n on
/n off
/n status
/n recent
/n recent 2
/n help
/n help 2
/n reload
```

1MBStaffMsg:

```text
/s recent
/s recent 2
/staffmsg recent
/cmi staffmsg recent
/1mbstaffmsg recent
/1mbstaffmsg status
/1mbstaffmsg reload
/1mbstaffmsg debug config
# staff message
#staff message
```

Profile:

```text
/profile mrfloris
/profile .RenonXenon
/profile lookup 00000000-0000-0000-0009-01f06566cd3b
/profile refresh .RenonXenon
/profile history mrfloris
/profile bans mrfloris
/profile export mrfloris
/profile add name 00000000-0000-0000-0009-01f06566cd3b .RenonXenon manual-check
/profile add ip mrfloris 203.0.113.10 proxy-log
/profile add note mrfloris Reviewed context with senior staff.
/profile add flag mrfloris Review old username history before trust changes.
/profile add link mrfloris namemc https://namemc.com/profile/example
/profile status
/profile reload
/profile debug all
```

EconomyGuardian:

```text
/economyguardian
/economyguardian status
/economyguardian player mrfloris
/economyguardian anomalies
/economyguardian anomalies 2
/economyguardian reload
```

FilterLab:

```text
/filterlab
/filterlab status
/filterlab test this is a test message
/filterlab rules
/filterlab rules 2
/filterlab recent
/filterlab reload
```

FilterGuard:

```text
/filterguard
/filterguard status
/filterguard test sign hello there
/filterguard test wall-sign hello from a wall sign
/filterguard test hanging-sign hanging sign text
/filterguard test wall-hanging-sign wall hanging sign text
/filterguard test book suspicious book text
/filterguard test anvil renamed item text
/filterguard test item-name renamed item text
/filterguard test nickname badnickname
/filterguard recent
/filterguard rules
/filterguard reload
```

CMIPlaceholderCheck:

```text
/cmiplaceholders status
/cmiplaceholders check cmi
/cmiplaceholders check balance
/cmiplaceholders list
/cmiplaceholders plugin CMI
/cmiplaceholders plugin onembcmi
/cmiplaceholders example %cmi_user_name% mrfloris
/cmiplaceholders example %onembcmi_global.status.loaded%
/cmiplaceholders reload
```

Potions:

```text
/potions
/potions inspect
/potions info
/potions help
/_potions
/_potions status
/_potions list
/_potions give mrfloris wizard_view_iii potion 1 1
/_potions give mrfloris wizard_view_iii splash 2 4
/_potions give wizard_view_iii lingering 3 1
/_potions bundle mrfloris wizard_2026 potion 1 1
/_potions bundle mrfloris wizard_2026 splash random 1
/_potions set wizard_view_iii duration-minutes 15
/_potions set wizard_view_iii money-cost 1500
/_potions set wizard_view_iii collection-id wizard_2026
/_potions set wizard_view_iii collection-index 1
/_potions set miner_rush_iii level 4
/_potions inspect
/_potions inspect mrfloris
/_potions disable wizard_view_iii
/_potions disable azure_power_iii
/_potions enable wizard_view_iii
/_potions reload
/_potions debug permissions
/_potions debug config
/_potions debug config potions
/_potions debug config particles
/_potions debug all
```

`/potions` is player-safe and permissionless. It shows the id, state, form, effect, duration, drink cost, and collection details for a Potions event item held in either hand. The clickable Potions prefix runs `/potions`, not the admin-only `/_potions` command.

In game, the bare `/_potions` GUI includes a Collection Bundles path for creating one item per enabled potion in a configured collection, plus a Configure Potions path for editing common `potions.yml` fields such as level, duration, money cost, EXP level cost, particle preset, and enabled state before creating fresh items.

SchedulerCheck:

```text
/_scheduler
/_scheduler info
/_scheduler help
/_scheduler check
/_scheduler scan
/_scheduler explain Announcer
/_scheduler upcoming 24h
/_scheduler upcoming 7d
/_scheduler export
/_scheduler export discord
/_scheduler list
/_scheduler list all
/_scheduler list enabled
/_scheduler list disabled
/_scheduler list error
/_scheduler list warning
/_scheduler list id Announcer
/_scheduler set Announcer false
/_scheduler set Announcer true
/_scheduler set Announcer false --reason quiet during maintenance
/_scheduler set Announcer enabled true --reason tested from console
/_scheduler fix resetWeatherTime PerformOn.2.Hour 23
/_scheduler fix resetWeatherTime PerformOn.2.Hour 23 --apply --reason invalid hour hotfix
/_scheduler fix Announcer Feedback false --apply --reason strict boolean cleanup
/_scheduler create morningAnnouncer daily 6 0 false --command broadcast! Good morning from 1MoreBlock --reason draft test
/_scheduler create pinataClear delay 600 false --command asFakeOp! pinata killall --command actionbar! &ePinatas cleared
/_scheduler reload
/_scheduler debug all
```

`/_scheduler` is direct-console only and has no aliases. It reads CMI `Settings/Schedules.yml` or `Scheduler.yml`, validates YAML syntax, type/range values such as `Hour: 0-23`, strict booleans, command list shape, specialized CMI command prefixes, risky command roots, duplicate enabled schedules, typo-prone ids, and schedule trigger logic. `/_scheduler export` writes a full Markdown report, while `/_scheduler export discord` writes a shorter findings summary. `/_scheduler set <key> true|false [--reason <text>]` only changes one `Enabled:` line and reminds the owner that a full `/stop` and start is the cleanest way to apply CMI scheduler changes. `/_scheduler fix <key> <path> <value>` is a dry-run-first scalar hotfix for validated fields such as `Feedback`, `Delay`, and `PerformOn.1.Hour`; add `--apply` to back up the file and write the line-preserving change. `/_scheduler create` can append simple interval or daily schedule entries from console.

EndCrystals:

```text
/_endcrystals
/_endcrystals info
/_endcrystals help
/_endcrystals status
/_endcrystals toggle list
/_endcrystals toggle protection.prevent-block-damage false
/_endcrystals toggle protection.allow-player-break-in-the-end true
/_endcrystals config
/_endcrystals set debug.log-crystal-breaks true
/_endcrystals debug all
/_endcrystals debug protected
```

WorldSnapshot:

```text
/worldsnapshot
/worldsnapshot status
/worldsnapshot capture
/worldsnapshot list
/worldsnapshot world spawn
/worldsnapshot diff
/worldsnapshot diff spawn
/worldsnapshot dump
/worldsnapshot reload
```

WarpAudit:

```text
/warpaudit status
/warpaudit scan
/warpaudit issues
/warpaudit safety
/warpaudit list
/warpaudit portals
/warpaudit portalissues
/warpaudit groups
/warpaudit dump
/warpaudit reload
```

WorthHelper:

```text
/worthhelper status
/worthhelper scan
/worthhelper missing
/worthhelper recipes diamond_block
/worthhelper export
/worthhelper reload
/worthhelper debug all
```

SparkReviewer:

```text
/sparkreviewer status
/sparkreviewer review
/sparkreviewer findings
/sparkreviewer entities
/sparkreviewer chunks
/sparkreviewer configs
/sparkreviewer logs
/sparkreviewer mfm
/sparkreviewer capture baseline
/sparkreviewer spark health
/sparkreviewer spark start 180 farm-test
/sparkreviewer stress mfm-on 180
/sparkreviewer stress mfm-off 180
/sparkreviewer compare mfm-on mfm-off
/sparkreviewer dump
/sparkreviewer reload
```

Hoppers:

```text
/_hoppers status
/_hoppers scan
/_hoppers findings
/_hoppers recommend
/_hoppers risk
/_hoppers chunks
/_hoppers regions
/_hoppers world general chunks
/_hoppers chunk general 12 -8
/_hoppers players global
/_hoppers hoppers
/_hoppers chains
/_hoppers containers
/_hoppers materials
/_hoppers minecarts
/_hoppers redstone
/_hoppers tickets
/_hoppers configs
/_hoppers deps
/_hoppers mfm presets
/_hoppers spark health
/_hoppers spark profile 300 hopper-drop
/_hoppers spark spikes 100 300 hopper-spikes
/_hoppers emergency
/_hoppers checklist mfm-gentle
/_hoppers track 60
/_hoppers track status
/_hoppers track stop
/_hoppers watch on
/_hoppers watch status
/_hoppers trigger arm
/_hoppers trigger status
/_hoppers baseline start 15
/_hoppers baseline recommend
/_hoppers compare previous latest
/_hoppers note checked west fishing storage before clearing it
/_hoppers notes
/_hoppers attach spark https://spark.lucko.me/example hopper-drop
/_hoppers drift
/_hoppers history
/_hoppers dump
/_hoppers reload
```

`/_hoppers` is staff-only and has no shorter alias. Normal players have no default command access; reviewers need Hoppers permissions such as `onembcmi.hoppers.scan`, `onembcmi.hoppers.track`, `onembcmi.hoppers.watch`, `onembcmi.hoppers.trigger`, and `onembcmi.hoppers.baseline`; only trusted admins should get `onembcmi.hoppers.spark` because it dispatches Spark profiler commands. Use `/_hoppers risk` for the short active-drop summary, `/_hoppers world/chunk/players` to narrow a known location, `/_hoppers chains/containers/materials/minecarts/redstone/tickets` for passive hotspot deep dives, `/_hoppers recommend` for checked/found/recommend rows with test-plan and sorter-safety labels, `/_hoppers watch/trigger/track` during live drops, `/_hoppers baseline/compare` for longer tuning work, `/_hoppers drift/history` for cached evidence, and `/_hoppers dump` for Discord-friendly Markdown reports with `yml` code blocks.

UpdateSmoke:

```text
/updatesmoke
/updatesmoke status
/updatesmoke run
/updatesmoke checks 2
/updatesmoke report
/updatesmoke report 2
/updatesmoke reload
/usmoke status
```

## Command Safety Rules

- Parse typed values instead of accepting raw strings.
- Restrict config changes to known default config paths.
- Require explicit permissions for admin, config, debug, clean, and data commands.
- Use `--dry-run` and `--confirm` for destructive playerdata cleanup.
- Never splice player input into server console commands without strict validation.
- Keep shared action rules on known action types; `/1mbcmi rules test` previews command actions and does not execute them.
- Use shared library parsing and filename helpers for feature command implementations.
- Keep broad cache cleanup separate from long-lived playerdata cleanup.

[Documentation index](README.md)
