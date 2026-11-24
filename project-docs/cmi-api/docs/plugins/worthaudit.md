# WorthAudit

WorthAudit brings CMI worth, Paper recipes and villager trades, observed CMI sales, and ShopGUI+ listings into one staff tool. Start with `/worthaudit status`, then use `/worthaudit item diamond` to bring together the findings your permissions allow.

Recipe and shop reports read the configured CMI `Worth.yml`. The item view labels the current CMI base quote separately from the saved worth. Sale drift compares event-reported payment with live CMI worth. CMI emits the event before it attempts the balance deposit, so the sale view shows what CMI reported at that point.

## Commands

| Command | What it shows or does |
| --- | --- |
| `/worthaudit status` | Shows the audit modules and their status. |
| `/worthaudit status <helper\|drift>` | Shows the selected module's detailed status using its existing use grant. |
| `/worthaudit item <material>` | Shows the loaded CMI base quote and the recipe, trade, sale, and shop findings available to the sender. |
| `/worthaudit scan [page]` | Scans Paper recipes and compares current worth with estimated ingredient costs and CMI's pricing policy. |
| `/worthaudit missing [page]` | Lists candidate materials missing a direct worth price. |
| `/worthaudit recipes <material> [page]` | Reviews recipes for a material. |
| `/worthaudit trades [material] [page]` | Reviews supported vanilla villager trades and theoretical discount floors. |
| `/worthaudit export` | Writes the recipe and trade review Markdown report with suggested CMI commands as text. |
| `/worthaudit sales <status\|material\|report\|top\|ignored\|ignore>` | Reviews CMI sale observations or manages ignored materials. Use `material <material>` or `ignore <material>` to target a material. |
| `/worthaudit shop [flags]` | Compares active ShopGUI+ item listings with configured CMI worth and exports a Markdown report. |
| `/worthaudit shop fix <material>` | Writes a Markdown preview of proposed price corrections for the material. |
| `/worthaudit shop generate <file.yml>` | Writes a YAML preview of proposed missing listings for the chosen shop file. |
| `/worthaudit shop skip <file:...\|item:...>` | Saves a shop audit exception in the WorthDrift configuration. |
| `/worthaudit reload` | Reloads WorthAudit settings, module settings, and translations. |
| `/worthaudit reload <helper\|drift>` | Reloads one module using its existing reload grant or the host admin grant. |

Shop reports support `-all`, `-missing`, `-drifting`, `-illegal-items`, `-not-in-worth`, `-duplicates`, `-valid-only`, `-github`, `-discord`, and `-limit <rows>`. The shop multiplier and quantity rule determine the expected `buyPrice`. Metadata-sensitive listings are flagged for manual review. Recipe classification uses CMI's `Worth.AutoGenerate.PriceIncrease`. The villager-trade catalog uses the bundled Minecraft definitions for the supported server version and reports its availability in status and exports.

## Permissions and data

Each module requires its own existing `use` grant, `onembcmi.worthhelper.use` or `onembcmi.worthdrift.use`. Recipe scans, detailed views, and exports add their corresponding module grants. Shop reports require `onembcmi.worthdrift.report`, price and listing previews plus shop exceptions require `onembcmi.worthdrift.fix`, and sale ignores require `onembcmi.worthdrift.ignore`. The item view checks each module separately. Its shop prices require the Drift `use`, `view`, and `report` grants. Use `onembcmi.worthaudit.admin` for host reload and lifecycle controls. The two existing PlaceholderAPI namespaces keep their module names.

The host reads `plugins/1MB-CMIAPI/WorthAudit/config.yml`. On first setup, it imports each existing module's `enabled` setting into `modules.worthhelper.enabled` or `modules.worthdrift.enabled`. Use `/1mblib config worthaudit` to inspect the host configuration, and edit each module's settings in its original directory.

| Data | Path under `plugins/1MB-CMIAPI/` |
| --- | --- |
| Recipe and trade settings | `WorthHelper/config.yml` |
| Sale and shop settings | `WorthDrift/config.yml` |
| Ignored sale materials | `WorthDrift/data.yml` |
| Module translations | `CMIAPILIB/translations/worthhelper.yml` and `CMIAPILIB/translations/worthdrift.yml` |
| Reports and previews | `CMIAPILIB/cache/plugins/worthhelper/` and `CMIAPILIB/cache/plugins/worthdrift/` |

Sale statistics cover the current server session. Shop previews write to the audit cache for review in the ShopGUI+ catalog workflow. `shop skip` updates the audit config, and `sales ignore` updates the ignored-material data.

## Upgrade from separate JARs

During the stopped-server suite update, remove the standalone WorthHelper and WorthDrift JARs and install WorthAudit with the rest of the tested suite. Keep the directories above and update saved commands and runbooks to use `/worthaudit`. The original guide pages below document the two modules inside WorthAudit.

[Recipe and trade settings](worthhelper.md) · [Sale and shop settings](worthdrift.md)
