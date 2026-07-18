# Refer

Refer adds a two-step player referral flow:

1. The referring player runs `/refer <onlinePlayer>`.
2. The referred player confirms with `/refer verify`.
3. If both players pass the playtime and duplicate-claim checks, reward marker permissions are granted by configurable console commands.

The default reward marker permissions are:

```text
cmi.kit.refer
cmi.kit.referred
```

The intended CMI setup is that `cmi.kit.refer` unlocks the referrer's reward kit, while `cmi.kit.referred` unlocks or marks the referred player's separate reward. A referred player can still refer someone else later; receiving `cmi.kit.referred` does not block them from earning `cmi.kit.refer`.

## Commands

```text
/refer
/refer <player>
/refer verify
/refer accept
/refer confirm
/refer deny
/refer reject
/refer cancel
/refer status
/refer info
/refer help
/refer admin inspect <player>
/refer admin pending [page]
/refer admin reset <player>
/refer admin reload
/refer reload
/refer debug
/refer debug status
/refer debug commands [page]
/refer debug permissions [page]
/refer debug placeholders [page]
/refer debug config [page]
/refer debug set config <path> <value>
/refer debug all
```

## Example Flow

```text
/refer Bob
```

Bob sees a message telling him that the referrer says they referred him.

```text
/refer verify
```

If both players meet the configured requirements, the plugin runs the configured reward commands and writes both players' referral state into shared playerdata.

## Admin Examples

```text
/refer status
/refer admin inspect mrfloris
/refer admin pending
/refer admin reset mrfloris
/refer debug config
/refer debug set config requirements.referrer-min-playtime-seconds 0
/refer debug set config requirements.referred-min-playtime-seconds 0
/refer debug set config rewards.referrer-permission cmi.kit.refer
```

List values such as `rewards.referrer-commands`, `rewards.referred-commands`, and `source.placeholder-candidates` are not editable through the scalar debug set command yet. Edit them in `config.yml`, then run `/refer reload`.

## Permissions

```text
onembcmi.refer.use
onembcmi.refer.start
onembcmi.refer.verify
onembcmi.refer.status
onembcmi.refer.cancel
onembcmi.refer.deny
onembcmi.refer.admin
onembcmi.refer.admin.inspect
onembcmi.refer.admin.reset
onembcmi.refer.admin.reload
```

`onembcmi.refer.admin` gates the shared debug command. The narrower admin nodes gate inspect, pending-list, reset, and reload behavior.

## Placeholders

```text
%onembcmi_refer.enabled%
%onembcmi_refer.claimed_referrer%
%onembcmi_refer.claimed_referred%
%onembcmi_refer.playtime.seconds%
%onembcmi_refer.eligible.referrer%
%onembcmi_refer.eligible.referred%
%onembcmi_refer.referrals.completed%
%onembcmi_refer.pending.count%
%onembcmi_refer.last.referrer%
%onembcmi_refer.last.referred%
%onembcmi_refer.last.result%
%onembcmi_refer.runtime.requests%
%onembcmi_refer.runtime.verified%
%onembcmi_refer.runtime.denied%
%onembcmi_refer.runtime.expired%
%onembcmi_refer.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_refer.claimed_referrer%
papi parse mrfloris %onembcmi_refer.claimed_referred%
papi parse mrfloris %onembcmi_refer.pending.count%
```

## Config

The config is created at:

```text
plugins/1MB-CMIAPI/Refer/config.yml
```

All settings are commented and comments are re-applied on reload while preserving existing values.

```yaml
enabled: true
debug: false
output:
  page-size: 8
source:
  placeholder-candidates:
  - '%cmi_user_playtime_seconds%'
  - '%cmi_user_playtime%'
  - '%cmi_user_playtime_days%'
  paper-statistic-fallback: true
requirements:
  referrer-min-playtime-seconds: 3600
  referred-min-playtime-seconds: 1800
  prevent-self-referral: true
  referrer-may-claim-once: true
  referred-may-only-be-referred-once: true
markers:
  check-permissions: true
rewards:
  referrer-permission: cmi.kit.refer
  referred-permission: cmi.kit.referred
  run-console-commands: true
  referrer-commands:
  - lp user {player} permission set {permission} true
  referred-commands:
  - lp user {player} permission set {permission} true
requests:
  expire-seconds: 300
  cooldown-seconds: 30
effects:
  enabled: true
  sound: minecraft:entity.player.levelup
  particle: HAPPY_VILLAGER
  particle-count: 24
```

For beta testing with fresh accounts, set playtime requirements to `0`:

```text
/refer debug set config requirements.referrer-min-playtime-seconds 0
/refer debug set config requirements.referred-min-playtime-seconds 0
```

## Reward Command Placeholders

Reward commands support:

```text
{player}
{uuid}
{permission}
{other}
{other_uuid}
```

For the referrer command, `{player}` is the referrer and `{other}` is the referred player. For the referred command, `{player}` is the referred player and `{other}` is the referrer.

Default commands:

```text
lp user {player} permission set {permission} true
```

That means the default successful referral grants:

```text
lp user <referrer> permission set cmi.kit.refer true
lp user <referred> permission set cmi.kit.referred true
```

## Data Writes

Refer writes to the shared playerdata file:

```text
plugins/1MB-CMIAPI/CMIAPILIB/playerdata/<uuid>.yml
```

Example shape for a referrer:

```yaml
refer:
  name: mrfloris
  referrer:
    claimed: true
    claimed-at: '2026-04-28T12:00:00Z'
    referred-player:
      name: Bob
      uuid: 00000000-0000-0000-0000-000000000000
    permission: cmi.kit.refer
  referred:
    claimed: false
  stats:
    referrals-completed: 1
    last-playtime-seconds: 7200
    last-playtime-source: placeholder:%cmi_user_playtime_seconds%
```

The shared cleanup command can remove the `refer` section later if this feature is uninstalled:

```text
/1mbcmi debug clean playerdata plugin refer --dry-run
/1mbcmi debug clean playerdata plugin refer --confirm
```

## CMI, CMILib, And Paper Usage

Refer uses CMI/PlaceholderAPI playtime placeholders when available, then falls back to Paper `Statistic.PLAY_ONE_MINUTE` if configured.

The default reward path grants permissions that CMI can use to unlock kits. The plugin does not directly edit CMI kits; it only runs the configured console commands after validation.

CMILib and CMI are required through the shared 1MB-CMIAPI plugin stack.

## Security Notes

- `/refer <player>` only accepts online player names.
- self-referrals are blocked by default.
- pending requests are in memory and expire.
- the referred player must explicitly type `/refer verify`.
- reward command templates are controlled by config, not by player input.
- player names and UUIDs are inserted only into configured command templates.
- commands longer than 220 characters are skipped.
- duplicate claims are checked through shared playerdata, the durable referral idempotency receipt, and, for online players, the configured permission markers.
- Both players' referral state is saved before either reward command list runs. A partial or interrupted delivery remains visible through `/refer debug transactions` instead of reopening the claim.
- admin reset only removes the `refer` section from shared playerdata; it does not automatically revoke LuckPerms permissions.

## Testing

Suggested beta checks:

```text
/refer status
/refer <onlineAlt>
/refer verify
/refer admin inspect <player>
/refer admin pending
/refer debug commands
/refer debug permissions
/refer debug placeholders
/refer debug config
/1mbcmi debug plugin refer all
```

Also test that:

- a player cannot refer themselves
- a player below minimum playtime is blocked
- a player with `cmi.kit.refer` cannot claim again when marker checks are enabled
- a referred player with `cmi.kit.referred` cannot be referred again when single-referred mode is enabled
- the referred player can still refer someone else later
