# Summer Floaties Permissions

Permissions are declared in `plugin.yml`.

| Permission | Default | Description |
| --- | --- | --- |
| `eventfloaties.use` | `true` | Allows a player to use player-facing floatie commands. |
| `eventfloaties.admin` | `op` | Allows staff to register blueprints, give tokens, reload, debug, list, reset, delete, view readiness status, and bypass player restrictions. |
| `eventfloaties.bypass-token` | `op` | Allows checking floaties without owning the matching token. |

## Notes

- Admins bypass token requirements and cooldowns.
- Admin debug checks can run in disabled worlds.
- Normal players only see approximate progress. Admins see the first missing/wrong spots hint when a build is incomplete.
