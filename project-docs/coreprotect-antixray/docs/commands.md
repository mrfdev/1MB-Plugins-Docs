# 1MB-AntiXRay Commands

This page documents the command surface verified from both `plugin.yml` and the plugin implementation in `src/main/java/net/felixkraus/AntiXray/AntiXray.java`.

Main command: `/xlu`

## Public and Staff Lookup Commands

| Command | Permission | Description | Example |
| --- | --- | --- | --- |
| `/xlu info` | none | Shows the player-facing intro, quick-start commands, canonical docs URL, and installed version/build. | `/xlu info` |
| `/xlu help` | none | Shows the main help page. | `/xlu help` |
| `/xlu <player-or-uuid> [days] [page]` | `cpantixray.use` | Runs a lookup for one player. Valid UUID input is auto-routed through the UUID resolver. | `/xlu mrfloris 30` |
| `/xlu uuid <player-uuid> [days] [page]` | `cpantixray.use` | Resolves a UUID to the server's known player name, then runs the same lookup flow. | `/xlu uuid 631e3896-da2a-4077-974b-d047859d76bc 30` |
| `/xlu compare <player1> <player2> [days] [page]` | `cpantixray.use` | Compares two players in the same window. Compare mode sorts `percent` and `total` by the largest gaps between both players. | `/xlu compare mrfloris yakirarage 30` |
| `/xlu last [page]` | `cpantixray.use` | Reopens the most recent cached lookup for the sender. | `/xlu last 2` |

## One-Off Lookup Flags

These flags work with normal lookups, UUID lookups, and compare lookups where noted in the code and help output.

| Flag | Applies to | Description | Example |
| --- | --- | --- | --- |
| `-sort <importance|percent|total|name>` | lookup, uuid, compare | Overrides the configured console sort mode for this run only. | `/xlu mrfloris 30 -sort percent` |
| `-world <world>` | lookup, uuid, compare | Limits the lookup to one loaded world. | `/xlu mrfloris 30 -world world_nether` |
| `-highvalue` | lookup, uuid, compare | Forces the curated high-value-only ore view for this run. | `/xlu mrfloris 30 -highvalue` |
| `-all` | lookup, uuid, compare | Forces the full tracked-ore view for this run. | `/xlu mrfloris 30 -all` |
| `-zeros` | lookup, uuid, compare | Includes zero-result rows for this run. | `/xlu mrfloris 30 -zeros` |

## Admin Commands

| Command | Permission | Description | Example |
| --- | --- | --- | --- |
| `/xlu reload` | `cpantixray.admin` | Reloads `plugins/1MB-AntiXRay/config.yml`. | `/xlu reload` |
| `/xlu debug` | `cpantixray.admin` | Shows the main debug overview page. | `/xlu debug` |
| `/xlu debug help` | `cpantixray.admin` | Lists debug subcommands. | `/xlu debug help` |
| `/xlu debug permissions` | `cpantixray.admin` | Shows permission nodes and what they do. | `/xlu debug permissions` |
| `/xlu debug commands` | `cpantixray.admin` | Shows a command reference page. | `/xlu debug commands` |
| `/xlu debug config` | `cpantixray.admin` | Shows active logical config values. | `/xlu debug config` |
| `/xlu debug health` | `cpantixray.admin` | Shows short operational health and cache status. | `/xlu debug health` |
| `/xlu debug baseline` | `cpantixray.admin` | Shows cached baseline file status, source database details, and stored periods. | `/xlu debug baseline` |
| `/xlu debug baseline rebuild` | `cpantixray.admin` | Rebuilds `baseline.yml` from the CoreProtect SQLite database in a background thread. | `/xlu debug baseline rebuild` |
| `/xlu debug baseline clear` | `cpantixray.admin` | Deletes `baseline.yml` and clears the loaded baseline cache. | `/xlu debug baseline clear` |
| `/xlu debug clean <cache|reports|baseline|all>` | `cpantixray.admin` | Cleans cached lookup data, exported reports, baseline data, or all of them. | `/xlu debug clean reports` |
| `/xlu debug set <key> <value>` | `cpantixray.admin` | Saves a supported config value and reloads `config.yml`. | `/xlu debug set console-report.sort-mode percent` |

## Notes

- `[days]` defaults to `defaults.lookup-days` when omitted.
- `[page]` only matters when paginated in-game output is enabled and a cached report exists.
- `/xlu <uuid>` is supported directly, but `/xlu uuid <player-uuid>` is still the clearest documented form.
- Invalid debug pages return a friendly error instead of silently falling back to a normal lookup.
- Admin actions such as reloads, debug page access, clean actions, and config writes are appended to `plugins/1MB-AntiXRay/admin-actions.log`.
