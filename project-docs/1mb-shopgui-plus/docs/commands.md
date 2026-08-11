# 1MB Shop command reference

Paper registers one root command, `/buy`, with no configured aliases. Help and tab completion are filtered by the sender's permissions.

## Players

| Command | Permission | Purpose |
| --- | --- | --- |
| `/buy` | `shopguiplus.shop` | Open the configured landing shop. |
| `/buy info` | `shopguiplus.info` | Show shop information and the player-guide link. |
| `/buy help [page]` | `shopguiplus.help` | Show accessible commands. |
| `/buy search <query> [page]` | `shopguiplus.search` | Search accessible purchasable listings. |
| `/buy worth [material] [page]` | `shopguiplus.worth` | List accessible locations and effective buy prices. |
| `/buy stats [today\|7d\|30d\|90d\|all]` | `shopguiplus.stats` | View personal retained purchase statistics. |
| `/buy <shop> [page]` | `shopguiplus.shop` plus shop/item access | Open an accessible shop page. |

## Staff status and diagnostics

| Command | Permission | Purpose |
| --- | --- | --- |
| `/buy version` | `shopguiplus.status` | Show version and runtime targets. |
| `/buy status` | `shopguiplus.status` | Show catalogue and integration state. |
| `/buy admin [section] [page]` | `shopguiplus.admin` | Open staff reference sections. |
| `/buy debug [section] [page]` | `shopguiplus.debug` | Show read-only support diagnostics. |
| `/buy debug illegal [filter] [page]` | `shopguiplus.debug.illegal` | Run the survival/Worth catalogue audit. |
| `/buy reload` | `shopguiplus.reload` | Invalidate managed sessions and reload configuration/catalogue. |
| `/buy check` | `shopguiplus.check` | Show the held item's material and damage. |
| `/buy <player> [shop] [page]` | `shopguiplus.others` | Open the landing page or requested shop for an online player. |

## Caps, statistics, Worth, and prices

| Command family | Permissions | Purpose |
| --- | --- | --- |
| `/buy admin cap status|set|enable|disable|reload|reset` | `shopguiplus.admin.cap.view|edit|reset` | Inspect or hot-edit the daily cap policy. |
| `/buy admin stats status|global|player|export|set|enable|disable|reload|purge` | `shopguiplus.admin.stats.view|edit|export` | Inspect or administer retained local statistics. |
| `/buy admin worthdrift ...` | `shopguiplus.admin.worth` | Compare all configured prices with CMI Worth. |
| `/buy admin worthhelper <material> [page]` | `shopguiplus.admin.worth` | Review every location and a median-based helper total. |
| `/buy admin price preview|plan|history` | `shopguiplus.admin.price.view` | Preview and inspect controlled price edits. |
| `/buy admin price apply <plan-id>` | `shopguiplus.admin.price.apply` | Apply a validated, backed-up price plan. |
| `/buy admin price rollback <change-id>` | `shopguiplus.admin.price.rollback` | Restore an eligible audited change. |

## Price modifiers

Authorized operators can view, add, and reset item-, shop-, or global player buy-price modifiers with `/buy viewmodifiers`, `/buy addmodifier`, and `/buy resetmodifier`. See the in-command help for the exact argument order allowed by your permissions.
