# EconomyGuardian

## Purpose

EconomyGuardian is a read-only server-management plugin that watches CMI economy balance changes and reports unusual money movement during the current runtime.

Version 1 does not change balances, cancel economy events, edit CMI config, or run commands. It keeps bounded in-memory records and exposes status, player summaries, anomaly lists, and PlaceholderAPI values for staff review.

## Features

- Listens to `CMIUserBalanceChangeEvent` at monitor priority.
- Tracks total observed positive and negative balance movement.
- Tracks per-player balance movement and anomaly counts.
- Looks up exact recorded Java or Bedrock names, including the Floodgate prefix, or the actual server UUID. Ambiguous names require a UUID.
- Flags large positive spikes, large negative movement, sharp percent changes, and repeated high-value action/source paths.
- Keeps bounded recent anomaly records.
- Shows Vault loaded state for support context.
- Registers command, permission, placeholder, and config metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/economyguardian
/economyguardian status
/economyguardian player <player|uuid>
/economyguardian anomalies [page]
/economyguardian reload
```

Aliases:

```text
/eg
/ecoguardian
```

Useful examples:

```text
/economyguardian
/economyguardian status
/economyguardian player mrfloris
/economyguardian player .BedrockPlayer
/economyguardian player 00000000-0000-0000-0009-01abcdef1234
/economyguardian anomalies
/economyguardian anomalies 2
/economyguardian reload
```

Global library examples:

```text
/1mblib debug plugin economyguardian
/1mblib debug plugin economyguardian all
/1mblib debug plugin economyguardian commands
/1mblib debug plugin economyguardian permissions
/1mblib debug plugin economyguardian placeholders
/1mblib config economyguardian
/1mblib config set economyguardian thresholds.spike-absolute 25000
/1mblib translations reload
```

## Permissions

```text
onembcmi.economyguardian.use
onembcmi.economyguardian.view
onembcmi.economyguardian.admin
onembcmi.economyguardian.admin.reload
```

## Placeholders

```text
%onembcmi_economyguardian.enabled%
%onembcmi_economyguardian.events.count%
%onembcmi_economyguardian.anomalies.count%
%onembcmi_economyguardian.players.count%
%onembcmi_economyguardian.positive.total%
%onembcmi_economyguardian.negative.total%
%onembcmi_economyguardian.last.player%
%onembcmi_economyguardian.last.delta%
%onembcmi_economyguardian.last.signal%
%onembcmi_economyguardian.cache.size%
```

## Config

Important config paths:

```text
enabled
debug
output.page-size
recent.max
anomalies.max
thresholds.spike-absolute
thresholds.negative-absolute
thresholds.spike-percent
thresholds.path-events
thresholds.path-total
```

Path-volume warnings include the payment that reaches both the event-count and absolute-total thresholds. With the defaults, ten deposits of 5,000 flag the tenth deposit. Both totals accumulate for each action/source pair during the current runtime; they are not a time-window or per-item detector. Concurrent CMI events update and classify each path together.

## CMI / CMILib Usage

CMI-API:

- `CMIUserBalanceChangeEvent` provides target user, source user, action type, previous balance, and new balance.

CMI:

- CMI remains the source of truth for balances and economy actions.
- EconomyGuardian only observes and reports the event data CMI exposes.
- Paper 26.3 items such as poplar need no item whitelist here. The plugin does not parse `Worth.yml` or inspect sold materials.
- AutoSell payouts through the installed CMI Vault provider generate balance-change events. These are generic `Deposit/system` observations, without the sold material or an AutoSell-specific source label.

CMILib:

- CMILib remains a required runtime dependency through the CMI stack and shared library.

Vault:

- Vault loaded state is displayed for support context, but version 1 does not mutate balances through Vault.

Paper:

- Paper command, plugin metadata, event, filesystem, YAML, and Adventure MiniMessage APIs are used.

## Data

EconomyGuardian keeps runtime records in memory. It exposes cache size through the shared cache path but does not write long-term economy history in version 1.

Player lookup uses only those runtime records. Names match exactly, ignoring case while retaining Bedrock prefixes; partial names and nicknames are not resolved. The latest observed name replaces the lookup name after a rename, and the UUID retains the accumulated history. UUID input must use its full canonical form. Unknown or ambiguous identities do not select an account, and events without an authoritative target UUID are ignored. Lookup does not query Mojang or another profile service. Player summaries display the recorded UUID; name completion requires both `use` and `view` permissions.

## Safety

EconomyGuardian is read-only. It does not cancel CMI events, modify balances, issue payments, edit CMI worth values, or execute configured commands.

## Shared Library Usage

EconomyGuardian uses `1MB-CMIAPI-LIB` for feature registration, strict permission checks, config defaults, translation defaults, MiniMessage output styling, PlaceholderAPI routing, tab filtering, paginated list rendering, shared cache paths, and debug metadata.

[Plugin index](README.md)
