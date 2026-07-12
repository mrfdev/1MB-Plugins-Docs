# Profile

## Purpose

Profile is a staff-only moderation helper. It builds a careful player profile from CMI/Paper data, shared playerdata, optional Floodgate/Geyser identity data, selected remote profile endpoints, and staff-entered notes.

The goal is context, not punishment automation. Profile helps senior staff answer questions such as:

- Is this target a Java player, Bedrock player, or Floodgate UUID?
- Does the official Mojang profile API return the Java account as active, or does it need manual review?
- Which UUID, current name, known names, and Bedrock/Floodgate signals do we know?
- Do CMI or server logs show IP signals that may matter during raids or bot waves?
- Do public ban-list pages show any review signals that should be checked manually?
- Which staff notes, flags, and reference links have already been collected?
- What can be exported to a Markdown report for staff review?

## Commands

In command syntax, `<target>` can be a Java name, a prefixed Bedrock name such as `.RenonXenon`, or a UUID.

| Command | What It Does | Example |
| --- | --- | --- |
| `/profile <target>` | Opens the cached profile, then refreshes stale or incomplete remote data in the background. | `/profile mrfloris` |
| `/profile lookup <target>` | Explicit lookup alias for a Java name, Bedrock name, or UUID. | `/profile lookup .RenonXenon` |
| `/profile refresh <target>` | Forces a fresh local and remote review when cooldowns allow it. | `/profile refresh 00000000-0000-0000-0009-01f06566cd3b` |
| `/profile history <target> [page]` | Shows known names collected from CMI, local/manual data, and supported remote review sources. | `/profile history mrfloris 2` |
| `/profile bans <target> [page]` | Shows public ban-list review signals when the sender has ban-review permission. | `/profile bans CrowdBound` |
| `/profile export <target>` | Writes a Markdown report for staff review and Discord sharing. | `/profile export .RenonXenon` |
| `/profile add name <target> <name> [source]` | Adds a manually verified known-name entry without overwriting existing history. | `/profile add name mrfloris mr_floris old-note` |
| `/profile add ip <target> <ip> [source]` | Adds a manually verified IP signal for senior staff review. | `/profile add ip SomeName 203.0.113.12 firewall-note` |
| `/profile add note <target> <text>` | Adds a free-form staff note to the profile. | `/profile add note SomeName Reviewed appeal on Discord.` |
| `/profile add flag <target> <text>` | Adds a moderation flag that should be reviewed before making decisions. | `/profile add flag SomeName Review older name history before staff trust.` |
| `/profile add link <target> <key> <url>` | Stores a safe reference link under an allowlisted key. | `/profile add link SomeName namemc https://namemc.com/profile/example` |
| `/profile status` | Shows runtime status, cache size, lookup counters, and provider state. | `/profile status` |
| `/profile reload` | Reloads Profile config/messages and safely adds missing defaults. | `/profile reload` |
| `/profile debug` | Opens the shared debug overview with build, server, category, docs, and support metadata. | `/profile debug` |
| `/profile debug hooks [page]` | Shows required dependencies and optional hook plugin load state. | `/profile debug hooks` |
| `/profile debug commands [page]` | Lists Profile command metadata with descriptions and permission nodes for staff. | `/profile debug commands 2` |
| `/profile debug permissions [page]` | Lists declared Profile permission nodes. Console output is not paginated. | `/profile debug permissions` |
| `/profile debug placeholders [page]` | Lists Profile placeholders for staff dashboards and debug menus. | `/profile debug placeholders` |
| `/profile debug config [page]` | Lists flattened config paths, values, and whether a scalar path is settable. | `/profile debug config 3` |
| `/profile debug set config <path> <value>` | Updates a supported scalar config path, preserves comments, and reloads the feature. | `/profile debug set config lookup.remote.enabled false` |

`/profile <target>` shows cached local data immediately when possible. If remote lookups are enabled and the cache is stale or incomplete, the lookup runs asynchronously and updates shared playerdata.

## Permissions

```text
onembcmi.profile.use
onembcmi.profile.lookup
onembcmi.profile.view.ip
onembcmi.profile.export
onembcmi.profile.bans
onembcmi.profile.add
onembcmi.profile.admin
onembcmi.profile.admin.reload
```

Profile is not for normal players. Grant `onembcmi.profile.admin` only to owners or senior moderators. Grant `onembcmi.profile.view.ip` separately because IP signals are sensitive operational data. Grant `onembcmi.profile.bans` separately for senior staff who may review public ban-list signals.

## Placeholders

```text
%onembcmi_profile.enabled%
%onembcmi_profile.last.target%
%onembcmi_profile.last.uuid%
%onembcmi_profile.last.result%
%onembcmi_profile.lookup.count%
%onembcmi_profile.remote.count%
%onembcmi_profile.public_banlists.enabled%
%onembcmi_profile.public_banlists.last.signals%
%onembcmi_profile.public_banlists.last.matches%
%onembcmi_profile.cache.size%
```

These placeholders are mainly for staff dashboards or debug menus. They intentionally expose only aggregate runtime state, not private profile data.

## Config

Important config paths:

```text
enabled
debug
output.page-size
identity.bedrock-prefix
lookup.remote.enabled
lookup.remote.refresh-on-view
lookup.remote.stale-after-hours
lookup.remote.global-cooldown-seconds
lookup.remote.timeout-ms
lookup.remote.raw-max-chars
lookup.remote.user-agent
lookup.remote.providers.mojang.enabled
lookup.remote.providers.geyser.enabled
lookup.remote.providers.geyser.bedrock-or-java-url
lookup.remote.providers.geyser.xbox-xuid-url
lookup.remote.providers.mcprofile.enabled
lookup.remote.providers.mcprofile.java-name-url
lookup.remote.providers.mcprofile.java-uuid-url
lookup.remote.providers.mcprofile.bedrock-gamertag-url
lookup.remote.providers.mcprofile.bedrock-floodgate-url
lookup.remote.providers.mcapi.enabled
lookup.remote.providers.mcapi.java-profile-url
lookup.remote.providers.mcapi.bedrock-profile-url
lookup.remote.providers.playerdb.enabled
lookup.remote.providers.playerdb.minecraft-url
lookup.remote.providers.playerdb.xbox-url
lookup.remote.providers.minecraftuuid.enabled
lookup.remote.providers.minecraftuuid.player-url
lookup.remote.providers.namemc-history.enabled
lookup.remote.providers.namemc-history.profile-url
lookup.remote.providers.crafty.enabled
lookup.remote.providers.crafty.url
lookup.remote.providers.crafty.bearer-token
lookup.public-banlists.enabled
lookup.public-banlists.max-stored-signals
lookup.public-banlists.positive-patterns
lookup.public-banlists.negative-patterns
lookup.public-banlists.providers.enabled-order
lookup.public-banlists.providers.mcfoxcraft.enabled
lookup.public-banlists.providers.mcfoxcraft.display-name
lookup.public-banlists.providers.mcfoxcraft.name-url
lookup.public-banlists.providers.mcfoxcraft.uuid-url
lookup.public-banlists.providers.mcfoxcraft.link-url
lookup.public-banlists.providers.mcfoxcraft.match-mode
lookup.public-banlists.providers.mcfoxcraft.snippet-chars
lookup.logs.enabled
lookup.logs.max-files
lookup.logs.max-lines-per-file
links.namemc
links.laby
links.mcprofile
links.mcapi
links.playerdb
links.minecraftuuid
links.cxkes-xuid
links.crafty
report.file-prefix
```

Remote lookup templates are configurable because public websites and APIs can change. Mojang, Geyser, MCProfile, MC-API, PlayerDB, MinecraftUUID, and NameMC history are enabled by default. MC-API and PlayerDB are useful for Java profile confirmation and Bedrock XUID/Floodgate gaps, and Bedrock lookups remove the configured dot prefix before calling them. Geyser's Xbox endpoint is used for automated Bedrock gamertag to XUID lookup when possible. MCProfile report links use `links.mcprofile: auto` by default, which writes an edition-aware documented API link instead of the dead `/profile/<name>` web route. MinecraftUUID and NameMC are treated as public HTML enrichment sources for Java profiles and only merge safe visible name-history hints. Crafty is present as an optional provider but disabled by default because access policy or auth may need review. Public ban-list checks are also configurable and start with an MCFoxCraft LiteBans-style page; they store snippets and links as review signals only.

## Data And Reports

Profile stores data under the shared playerdata folder:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Profile writes its own section under `profile.*` and keeps long-lived signals there:

- identity: UUID, current name, type, Bedrock flag, Floodgate UUID, Bedrock name, XUID where available
- names: known name entries with source and timestamps
- ips: known IP-like signals with source, hits, and timestamps
- cmi: CMI lookup state, user id, login/logoff data where available
- account_status: Mojang account status signal from the official Mojang profile API
- remote: provider fetch metadata and limited raw response snippets
- public_bans: public ban-list signal rows with provider, lookup type, status, confidence, link, snippet, and review markers
- links: configured staff reference URLs
- notes: staff notes
- flags: moderation review flags

Exports are written as Markdown to the Profile cache folder:

```text
plugins/1MB-CMIAPI/Profile/cache/
```

The export includes a Discord-ready `yml` code block, known names, IP signals when the sender has `onembcmi.profile.view.ip`, public ban-list signals when the sender has `onembcmi.profile.bans`, links, remote provider status, flags, notes, and a human-review marker.

## CMI / CMILib / CMI-API Usage

CMI-API:

- Uses `CMIUser` lookups where available.
- Attempts to read CMI user id, last login/logoff, and IP-like values through stable calls or reflection-safe fallback checks.

CMI:

- CMI remains the local source of truth for known users when the server has already seen them.
- Profile does not change CMI data and does not run punishment, LuckPerms, or firewall commands.

CMILib:

- Runtime uses the shared `1MB-CMIAPI-LIB` message, config, translation, debug, and playerdata helpers.

Paper:

- Uses async tasks for remote lookups and log scans.
- Uses Paper/Bukkit join events to refresh local profile identity and online IP signals.

Optional hooks:

- Floodgate/Geyser are detected by plugin presence and reflection. The jar starts without them.
- PlaceholderAPI can expose the small runtime placeholder set.

## Remote Sources

Profile can query:

- Mojang API for Java UUID/name resolution.
- Mojang profile response status as an account-review signal. `not-found` may mean a typo, changed name, deleted account, or possible Mojang suspension; it is not automatic proof.
- Geyser public API for Bedrock or Java UUID resolution with the configured Bedrock prefix.
- Geyser public Xbox API for Bedrock gamertag to XUID lookup.
- MCProfile endpoint templates for Java, Bedrock gamertag, and FUID/Floodgate UUID lookups.
- MC-API profile endpoints for Java and Bedrock profile lookup, including Bedrock XUID when the endpoint returns it.
- PlayerDB JSON API endpoints for Minecraft profile lookup and Xbox gamertag/XUID enrichment.
- MinecraftUUID public player pages for Java UUID context and visible name-history hints. This is parsed as review-only HTML, not a trusted account API.
- NameMC public Java profile pages for visible username history. Profile prefers UUID URLs, parses only the visible `Name History` section, and stores those names as third-party review data.
- Crafty only when explicitly enabled and configured.
- Configured public ban-list pages, currently MCFoxCraft's LiteBans-style web UI by default, to detect possible external ban signals.

NameMC, Laby, MCProfile, MC-API, PlayerDB, MinecraftUUID, CXKES XUID lookup, Crafty, and public ban-list links are also written into reports for manual staff review. Profile does not scrape protected pages or bypass rate limits. NameMC history is scraped only from public visible HTML and may be incomplete, hidden, blocked, or stale. MCProfile is linked through its documented JSON endpoints because the public website does not expose a stable direct profile URL. CXKES is kept as a manual staff link because its XUID page is browser/Cloudflare-interactive rather than a stable documented API. Remote lookups use a configurable User-Agent, timeout, stale cache window, and per-target cooldown.

References:

- [MCProfile endpoints](https://mcprofile.io/endpoints)
- [NameMC profile lookup](https://namemc.com/)
- [MC-API](https://www.mc-api.io/)
- [PlayerDB](https://playerdb.co/)
- [PlayerDB Minecraft API example](https://playerdb.co/api/player/minecraft/mrfloris)
- [MinecraftUUID player lookup](https://minecraftuuid.com/)
- [CXKES XUID lookup](https://www.cxkes.me/xbox/xuid)
- [Geyser API Bedrock or Java UUID utility](https://geysermc.org/wiki/api/api.geysermc.org/global-api-web-api-utils-controller-get-bedrock-or-java-uuid)
- [MCFoxCraft public bans page](https://www.mcfoxcraft.com/newbans/bans.php)
- [DedicatedMC ban checker](https://dedicatedminecraft.host/tools/ban-checker), useful context for why a missing Mojang profile needs manual review

## Safety

Profile is read-mostly and staff-only. It does not ban, mute, jail, kick, teleport, modify LuckPerms, or edit firewall rules.

All command input is strict and sanitized. Player targets are limited to safe name/UUID shapes, manual link keys are allowlisted, notes and remote response snippets are abbreviated, IP output requires `onembcmi.profile.view.ip`, and public ban-list signal output requires `onembcmi.profile.bans`.

Use remote, log, and public ban-list data as evidence prompts, not automatic truth. Public ban-list pages may be stale, appealed, partial, or unrelated to the same person. The export intentionally says `needs human review: true`.

## Shared Debug

Profile uses the shared debug fallback:

```text
/profile debug
/profile debug health
/profile debug hooks [page]
/profile debug commands [page]
/profile debug permissions [page]
/profile debug placeholders [page]
/profile debug config [page]
/profile debug all
/1mbcmi debug plugin profile all
```

[Plugin index](README.md)
