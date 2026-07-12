# 1MB-AntiXRay Permissions

These permission nodes are verified from `src/main/resources/plugin.yml` and the runtime command checks in the plugin implementation.

| Permission | Default | What it allows |
| --- | --- | --- |
| `cpantixray.use` | `op` | Normal lookups, compare lookups, UUID lookups, and `/xlu last`, including cached paginated page opens. |
| `cpantixray.admin` | `op` | `/xlu reload`, all `/xlu debug` pages, `/xlu debug baseline`, `/xlu debug clean`, and `/xlu debug set`. Includes `cpantixray.use`. |

## Practical Use

- Give `cpantixray.use` to staff who should be able to investigate mining activity.
- Give `cpantixray.admin` only to staff who should also be able to reload config, clear caches, rebuild/clear baselines, and change config keys from commands.
- Console and operators typically have effective access already, but the declared plugin defaults are still `op`.
