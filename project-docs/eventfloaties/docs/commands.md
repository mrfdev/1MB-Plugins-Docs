# Summer Floaties Commands

Main command:

```text
/floatie
```

`/floatie <id>` is intentionally not supported. Use `/floatie` for auto-detect and `/floatie check <id>` as the explicit backup.

## Player Commands

| Command | Description |
| --- | --- |
| `/floatie info` | Shows the plugin name, short introduction, useful starting commands, canonical docs URL, and installed version. |
| `/floatie help` | Shows in-game player help. Staff also see admin commands. |
| `/floatie` | Checks the floatie near the player and tries to auto-detect the matching blueprint. |
| `/floatie check [id]` | Checks a specific floatie id, or all floaties the player can check when no id is provided. |
| `/floatie progress` | Shows the player's completed floatie count. |

## Admin Commands

Requires `eventfloaties.admin`.

| Command | Description |
| --- | --- |
| `/floatie reload` | Reloads config, blueprints, and player progress data. |
| `/floatie admin pos1` | Sets the first blueprint selection corner from the block the admin is looking at. |
| `/floatie admin pos2` | Sets the second blueprint selection corner. |
| `/floatie admin origin` | Sets the blueprint origin. For event floaties, use the inspection tile. |
| `/floatie admin save <id> [display name]` | Saves the selected non-ignored blocks as a blueprint. |
| `/floatie admin list [page]` | Lists registered blueprints, six per page. |
| `/floatie admin give <player> <id> [amount]` | Gives a secure floatie token. |
| `/floatie admin progress <player>` | Shows a player's completed and missing floaties plus reward marker status. |
| `/floatie admin debug [id]` | Scans nearby floaties without token, cooldown, disabled-world, claim, or reward restrictions. |
| `/floatie admin status` | Shows readiness settings: live mode, token requirement, loaded blueprints, scanner settings, disabled worlds, reward command counts, and expected kit names. |
| `/floatie admin reset <player> <id\|all>` | Resets test progress for one floatie or all floaties. |
| `/floatie admin delete <id>` | Deletes a blueprint. |

## Examples

```text
/floatie info
/floatie
/floatie check duck
/floatie progress

/floatie admin pos1
/floatie admin pos2
/floatie admin origin
/floatie admin save swan Swan
/floatie admin give mrfloris swan
/floatie admin progress mrfloris
/floatie admin debug swan
/floatie admin status
```
