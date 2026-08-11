# 1MB Shop staff operations

This is the public-safe staff reference for the maintained 1MoreBlock buy-only shop. It intentionally excludes live values, private builds, databases, player records, server paths, and internal incident procedures.

## First checks

| Command | Purpose |
| --- | --- |
| `/buy version` | Show plugin, Java, Paper target, and runtime metadata. |
| `/buy status` | Show catalogue generation/counts, default shop, database, economy, and PlaceholderAPI state. |
| `/buy admin` | Open permission-filtered staff reference pages. |
| `/buy debug health` | Review read-only service and hook health. |
| `/buy debug illegal` | Audit every listing against the plain-vanilla survival and CMI Worth policy. |

After configuration or shop changes, use `/buy reload`, wait for the catalogue to finish loading, and rerun status plus the illegal-listing audit. A reload is not a substitute for stopped-state backup or purchase regression checks.

## Catalogue policy

Real purchase listings must be obtainable vanilla survival items with an exact base entry in CMI `Worth.yml`. Do not list renamed, enchanted, custom-model, filled-container, spawner, potion, suspicious-state, or other custom/component-bearing variants.

`/buy debug illegal [blockers|policy|worth|safe|all] [page]` is read-only. Fix source YAML deliberately, back it up, reload, and rerun the audit. GUI-only controls such as player heads and navigation items are classified separately from purchasable listings.

## CMI Worth comparison

- `/buy admin worthdrift [drift|above|below|missing|all] [page]` compares configured unit prices with exact CMI base Worth values.
- `/buy admin worthhelper <material> [page]` lists every source location and a descriptive median-based helper total.

These commands are diagnostic. Their helper values are not automatic pricing authority and do not edit files.

## Controlled price editing

1. Create a read-only plan with `/buy admin price preview <material> <multiplier>`.
2. Review every location and value with `/buy admin price plan <plan-id> [page]`.
3. Apply only the intended, unexpired plan with `/buy admin price apply <plan-id>`.
4. Review `/buy admin price history [page]` and verify the catalogue plus representative purchases.
5. Use `/buy admin price rollback <change-id>` only when the affected YAML still matches the applied hashes.

Apply and rollback require separate permissions. The editor creates local backups and manifests, validates stable source snapshots, writes atomically, and performs a controlled catalogue reload. Never manually modify an active plan or its audit directory.

## Daily caps

`/buy admin cap status [online-player]` shows policy and optional usage. Authorized staff can change the money limit, item limit, timezone, reset hour, enabled state, or reload `purchase-caps.yml` without restarting. Resetting a player's current window is a separate privileged action and is rejected while that player has an active reservation.

## Purchase statistics

`/buy admin stats status`, `global`, and `player` provide retained operational summaries. Authorized staff can change retention/timezone/top/failure settings, enable or disable recording, reload policy, purge expired rows, and request aggregate-only CSV exports.

Statistics are local operational records. Do not publish player-level output or database files. Review even aggregate exports before sharing.

## Safe change procedure

1. Back up the JAR and complete data folder while stopped when the change affects runtime files.
2. Record exactly which YAML values are intentionally changed.
3. Apply the smallest change and reload only when the feature supports it.
4. Wait for catalogue publication and inspect `/buy status` plus `/buy debug illegal`.
5. Test permissions, browsing, price display, one normal purchase, insufficient funds, and full inventory as appropriate.
6. Confirm no unexpected persisted changes or ShopGUIPlus errors.
7. Retain the matching rollback snapshot until the change is accepted.

## More reference

- [Complete command reference](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/commands/)
- [Permission reference](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/permissions/)
- [Placeholder reference](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/placeholders/)
- [Technical overview](https://docs.1moreblock.com/staff-reference/custom-server-plugins/1mb-shopgui-plus/technical-overview/)
- [Searchable price catalogue](https://docs.1moreblock.com/player-guides/custom-server-plugins/1mb-shopgui-plus/price-catalogue/)
