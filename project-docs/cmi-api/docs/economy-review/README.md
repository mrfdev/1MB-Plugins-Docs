# Economy Review Baseline

This directory preserves the durable economy-review material migrated from the
retired `mrfdev/1MBEconomy` project on 2026-07-28. New development belongs in
the 1MB-CMIAPI feature modules:

- `plugins/player-fun/autosell/`
- `plugins/server-management/worthdrift/`
- `plugins/server-management/worthhelper/`
- `plugins/server-management/economyguardian/`

The old standalone checkout and its duplicate Paper server are no longer part
of the active workflow.

## Contents

- `baseline/CMI/Worth.yml` is the last tracked CMI worth snapshot from the
  retired project.
- `baseline/ShopGUIPlus/shops/` contains the last tracked ShopGUI+ shop
  snapshot from the retired project.
- `reports/` contains the first WorthHelper export and its manual triage.
- `TODO.md` preserves outstanding economy-review tasks.
- `legacy-project-notes.md` preserves the old command, safety, and review notes.

These files are review inputs, not an automatic deployment source. The running
server's `plugins/CMI/Saves/Worth.yml` remains CMI's runtime source of truth.
WorthHelper and WorthDrift must continue to report proposed changes before any
worth or shop value is changed.

## Migration Differences

The migrated worth snapshot and the CMI-API test server snapshot were identical
except for one unresolved value:

| Material | Migrated baseline | CMI-API test server |
| --- | ---: | ---: |
| `GOLDEN_DANDELION` | `2.59` | `1.0` |

Do not silently choose either value. Review the acquisition path, farmability,
recipe relationships, and economy impact first.

The migrated ShopGUI+ snapshot also intentionally preserves two differences
from CMI-API's ignored 26.1.2 archive:

- `ENCHANTED_GOLDEN_APPLE` buy price: migrated `5000`, archive `25000`.
- `GOLDEN_APPLE` buy price: migrated `25110`, archive `5000`.
- The archive has `survival_missing.yml`; the migrated baseline does not.

These are comparison findings, not approved price changes.

## Workflow

1. Refresh a review snapshot intentionally from the maintained Paper 26.2 test
   server. Never copy databases, secrets, player data, logs, or full server
   directories into Git.
2. Run WorthHelper for material completeness and recipe/conversion analysis.
3. Review farmability, availability, rarity, and human value expectations.
4. Approve worth changes manually before applying them.
5. Run WorthDrift against ShopGUI+ after the worth baseline is approved.
6. Keep `/buy = worth * 100` as the default rule and document exceptions.

## Commands

```text
cmi worthlist -missing
cmi generateworth
cmi setworth <item> -s:<sellPrice>
/worthhelper status
/worthhelper scan
/worthhelper missing
/worthhelper recipes <material>
/worthhelper export
/worthdrift shopgui
```
