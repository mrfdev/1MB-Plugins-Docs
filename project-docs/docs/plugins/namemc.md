# NameMC

NameMC is the 1MB-CMIAPI migration of the standalone `NameMCVoteLink` / `1MB-NameMC` plugin. It keeps the public `/namemc` command and the `%onembnamemc_*%` PlaceholderAPI expansion, but now uses the shared 1MB-CMIAPI feature registry, commented config writer, MiniMessage style, debug metadata, and central data folders.

Disable the old standalone `1MB-NameMC` jar before testing this feature jar. Both plugins use `/namemc` and the `onembnamemc` PlaceholderAPI identifier.

## Purpose

Players can run `/namemc` to open the configured NameMC server page, click the heart, then return and run `/namemc verify`. The plugin checks NameMC's public API asynchronously, stores the player's latest like state, and runs one-time reward commands when the player is newly verified.

The default reward flow grants `onembnamemc.verified` through LuckPerms, broadcasts through CMI, plays a CMI sound, gives the CMI kit `namemc`, and sends a CMI private message.

## Commands

```text
/namemc
/namemc info
/namemc help
/namemc status
/namemc verify
/namemc reload
/namemc debug
/namemc debug status
/namemc debug config [page]
/namemc debug set <key> <value>
/namemc debug set config <key> <value>
/namemc debug verify [player]
/namemc debug verify <player> -force
/namemc debug player <player>
/namemc debug reward <player>
/namemc debug reward <player> -confirm
/namemc debug commands [page]
/namemc debug permissions [page]
/namemc debug placeholders [page]
/namemc debug all
```

Examples:

```text
/namemc
/namemc verify
/namemc status
/namemc debug
/namemc debug config
/namemc debug set api.global-cooldown-seconds 30
/namemc debug verify mrfloris
/namemc debug verify mrfloris -force
/namemc debug reward mrfloris
/namemc debug reward mrfloris -confirm
/namemc debug placeholders 2
```

## Permissions

Modern 1MB-CMIAPI permissions:

```text
onembcmi.namemc.use
onembcmi.namemc.verify
onembcmi.namemc.status
onembcmi.namemc.admin
onembcmi.namemc.reload
onembcmi.namemc.reward
onembcmi.namemc.livecheck
```

Legacy standalone permissions are still honored:

```text
onembnamemc.use
onembnamemc.verify
onembnamemc.admin
onembnamemc.verified
```

`onembnamemc.verified` remains the default reward marker so existing LuckPerms data and CMI kit checks continue to make sense.

## Placeholders

Shared 1MB-CMIAPI placeholders:

```text
%onembcmi_namemc.enabled%
%onembcmi_namemc.server%
%onembcmi_namemc.vote_url%
%onembcmi_namemc.verify_url%
%onembcmi_namemc.liked%
%onembcmi_namemc.reward_claimed%
%onembcmi_namemc.verified%
%onembcmi_namemc.total_players%
%onembcmi_namemc.total_liked%
%onembcmi_namemc.total_rewarded%
%onembcmi_namemc.total_pending_rewards%
%onembcmi_namemc.last_rewarded_player%
%onembcmi_namemc.last_rewarded_at%
```

Legacy `%onembnamemc_*%` placeholders:

```text
%onembnamemc_server%
%onembnamemc_vote_url%
%onembnamemc_likes_url%
%onembnamemc_verify_url%
%onembnamemc_liked%
%onembnamemc_liked_raw%
%onembnamemc_liked_since%
%onembnamemc_last_checked%
%onembnamemc_reward_claimed%
%onembnamemc_reward_claimed_raw%
%onembnamemc_reward_claimed_at%
%onembnamemc_verified%
%onembnamemc_verified_raw%
%onembnamemc_version%
%onembnamemc_build%
%onembnamemc_cooldown_seconds%
%onembnamemc_total_players%
%onembnamemc_total_liked%
%onembnamemc_total_rewarded%
%onembnamemc_total_pending_rewards%
%onembnamemc_last_rewarded_player%
%onembnamemc_last_rewarded_at%
```

Example checks:

```text
papi parse mrfloris %onembnamemc_verified%
papi parse mrfloris %onembnamemc_reward_claimed_at%
papi parse mrfloris %onembcmi_namemc.total_rewarded%
```

## Config

Config path:

```text
plugins/1MB-CMIAPI/NameMC/config.yml
```

The config is written through the shared comment-aware 1MB-CMIAPI `FeatureSettings` layer. Missing defaults are added, comments are re-applied on reload, and admin values are preserved.

Important keys:

```text
server.address
server.vote-url
api.likes-url
api.verify-like-url
api.timeout-ms
api.global-cooldown-seconds
api.user-agent
rewards.enabled
rewards.verified-permission
rewards.commands
output.page-size
config-version
```

`/namemc debug set <key> <value>` can edit safe scalar keys only. `rewards.commands` is intentionally edited in the file and applied with `/namemc reload`.

Default reward commands support:

```text
{player}
%player%
{uuid}
%uuid%
{server}
%server%
```

## Data

NameMC writes per-player files to:

```text
plugins/1MB-CMIAPI/NameMC/playerdata/<uuid>.yml
```

Stored fields:

```text
uuid
username
liked
liked-since
last-checked-at
reward-claimed-at
```

The old standalone plugin used `plugins/1MB-NameMC/playerData/`. This migration does not automatically move old data yet, so copy or re-verify only if you want to preserve historic reward timestamps.

## CMI, CMILib, And Paper Usage

CMI is used by the default reward commands for broadcast, sound, kit delivery, and private message output. CMILib is part of the shared runtime dependency chain. The plugin itself uses Paper/Bukkit command, scheduler, YAML, and plugin metadata APIs, and Java's async `HttpClient` for NameMC API calls.

Optional hooks:

- PlaceholderAPI registers `%onembnamemc_*%` and the shared `%onembcmi_namemc.*%` placeholders.
- LuckPerms is expected by the default reward marker command.
- Vault is declared as an optional hook for consistency with reward/economy tooling, but this feature does not require it directly.

## Security Notes

- Player verification accepts no player names or reward command text.
- Admin live checks require exact online Minecraft names.
- Runtime config edits are limited to approved scalar keys and validate URL templates, number ranges, server address text, user-agent text, and permission node format.
- Reward commands are console-trusted admin config. The plugin substitutes trusted Bukkit player data and skips rendered commands containing control characters.
- A global cooldown protects NameMC from accidental API spam.

## Testing Checklist

```text
/namemc
/namemc verify
/namemc status
/namemc debug
/namemc debug config
/namemc debug commands
/namemc debug permissions
/namemc debug placeholders
papi parse <player> %onembnamemc_server%
papi parse <player> %onembnamemc_verified%
```

Also confirm the old standalone jar is disabled so command registration and PlaceholderAPI expansion registration are not fighting each other.
