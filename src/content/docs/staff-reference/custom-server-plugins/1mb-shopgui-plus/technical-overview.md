---
title: "1MB Shop technical overview"
description: "Public-safe 1mb shop technical overview for 1MB Shop."
---

1MB Shop is 1MoreBlock's maintained, buy-only server shop. It targets modern Paper servers, exposes one `/buy` command, reads the server's approved vanilla shop catalogue, and leaves selling to CMI.

This public document describes installation and operation without publishing private builds, live configuration, player data, logs, credentials, or internal development records.

## Supported platform

- Java 25 bytecode and toolchain.
- Paper 26.2 or newer; every Paper update still requires focused validation.
- Vault-compatible economy, with CMI providing the server economy in the 1MoreBlock deployment.
- PlaceholderAPI is optional and is never bundled.
- MiniMessage and Adventure are supplied by Paper.

The plugin is intentionally Paper-only. It does not include FoliaLib, NMS, an update checker, bStats, or NBT-API.

## Product scope

- `/buy` is the only declared root command and has no configured aliases.
- Players can buy approved plain vanilla survival items.
- The plugin does not buy items back from players.
- Custom-model, renamed, enchanted, stateful, or otherwise policy-breaking listings are rejected by the catalogue audit.
- Component- and PDC-aware checks protect transaction and inventory behavior.
- Daily purchase caps and local purchase statistics can be configured independently.
- Staff can preview, apply, audit, and roll back controlled price changes.

## Build from source

Requirements:

- JDK 25.
- The repository's Gradle wrapper.
- Network access for Gradle dependencies on the first build.

Run non-numbered verification before creating a release artifact:

```sh
./gradlew test compileJava --no-daemon
```

Create a numbered distributable only from the designated release worktree:

```sh
./gradlew clean build --no-daemon
```

The build audits the finished JAR and rejects forbidden legacy, telemetry, updater, NBT-API, FoliaLib, and offline-catalogue classes. Do not run numbered release builds concurrently in one worktree.

## Install or upgrade

1. Stop the Paper server cleanly.
2. Back up the current plugin JAR and the complete `plugins/ShopGUIPlus/` data directory together.
3. Ensure `plugins/` contains exactly one loadable ShopGUIPlus JAR.
4. Install the reviewed artifact without replacing the data directory.
5. Start the server and confirm the plugin version, Paper/Java gate, economy hook, shop count, and clean catalogue publication.
6. Run `/buy status`, `/buy debug health`, `/buy debug illegal`, and the focused player purchase checks appropriate for the release.
7. Stop cleanly and confirm persisted YAML/SQLite data was not unexpectedly rewritten.

Rollback while stopped by restoring the matching JAR and complete data-folder backup from the same snapshot. Never mix a JAR from one release with an unrelated database or YAML snapshot.

## Configuration and storage

| Path | Purpose |
| --- | --- |
| `config.yml` | Economy, default shop, GUI behavior, item comparison, PlaceholderAPI, and presentation settings. |
| `lang.yml` | Locale-driven command, error, and transaction messages. |
| `shops/*.yml` | Canonical buy catalogue, pages, controls, links, and prices. |
| `pricemodifiers.yml` | Permission-based buy-price modifiers. |
| `purchase-caps.yml` | Daily money/item limits and reset policy. |
| `purchase-statistics.yml` | Local recording, retention, timezone, and presentation policy. |
| `database.db` | Player command-price modifiers. |
| `purchase-cap-usage.db` | Current daily cap usage. |
| `purchase-statistics.db` | Retained local purchase outcomes and aggregates. |
| `price-edits/` | Local price-edit backups, manifests, and audit history. |

Back up runtime data while stopped. Never publish or manually edit database files. Existing YAML is not replaced merely because bundled defaults change.

## Presentation

`config.yml` and `lang.yml` independently support `LEGACY` or `MINIMESSAGE` text. Operator-authored templates may use formatting, while player, runtime, and PlaceholderAPI values are inserted as literal data so they cannot inject click or hover actions.

The first-party PlaceholderAPI expansion uses the identifier `onembshopgui`. Other installed PlaceholderAPI expansions, including CMI placeholders such as `%cmi_user_world%`, can be used in supported presentation fields.

## Operational boundaries

- Shop YAML, cap policy, statistics policy, price-edit history, and databases remain local server data.
- Catalogue generation is an explicit offline task; it never uploads during startup or reload.
- Statistics exports are aggregate-only, but staff must still review them before sharing.
- Price edits require a preview plan, validation, backup, atomic write, audit manifest, and controlled reload.
- A successful startup is not final release acceptance; GUI, permissions, economy accounting, failure, restart, rollback, and private-beta checks remain release-specific.

## Reference

- [Player guide](https://docs.1moreblock.com/player-guides/custom-server-plugins/1mb-shopgui-plus/)
- [Staff operations](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/)
- [Commands](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/commands/)
- [Permissions](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/permissions/)
- [Placeholders](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/placeholders/)
- [Public price catalogue](https://docs.1moreblock.com/player-guides/custom-server-plugins/1mb-shopgui-plus/price-catalogue/)

## Reference Links

- [Staff overview](/staff-reference/custom-server-plugins/1mb-shopgui-plus/)
- [Player guide](/player-guides/custom-server-plugins/1mb-shopgui-plus/)
