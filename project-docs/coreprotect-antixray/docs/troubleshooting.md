# 1MB-AntiXRay Troubleshooting

## The Plugin Disables Itself on Startup

Check these first:

- CoreProtect is installed in `plugins/`
- CoreProtect enabled successfully before `1MB-AntiXRay`
- CoreProtect exposes a supported API version (`7` through `12`)
- The server is running a supported Java runtime (`25` target, newer compatible runtimes may still work depending on server policy)

If CoreProtect is missing or unsupported, the plugin logs an error and disables itself intentionally.

## `/xlu` Says You Do Not Have Permission

Check that the sender has the right permission:

- `cpantixray.use` for normal lookups, compares, UUID lookups, and `/xlu last`
- `cpantixray.admin` for reload, debug pages, baseline management, clean actions, and config writes

Start with `/xlu info` and `/xlu help` to confirm the command is present and to review the available subcommands.

## A Lookup Shows `Tracked breaks: 0`

That usually means one of these:

- the player did not break any tracked materials in the selected window
- the selected world filter removed all matching rows
- CoreProtect has no matching history for the requested player/window/material set

Try a longer time window or remove the world filter.

## `Server Baseline` Does Not Appear

Check these conditions:

- `baseline.enabled: true`
- `baseline.include-in-reports: true`
- `plugins/1MB-AntiXRay/baseline.yml` exists
- a baseline was rebuilt successfully with `/xlu debug baseline rebuild`

Use `/xlu debug baseline` to confirm whether a cached baseline is loaded.

## Baseline Rebuild Takes Time

This is normal on large CoreProtect databases. Baseline rebuilds are separate admin tasks and are not part of normal lookups. Use `/xlu debug baseline` before and after rebuilding to confirm the cached file state.

## `/xlu last` or Page Numbers Stop Working

Cached in-game pages expire after a limited time. If a cached page is gone, rerun the lookup or compare command that created it.

## Config Changes Do Not Seem to Apply

Use one of these:

- `/xlu reload`
- `/xlu debug set <key> <value>`
- server restart

Remember that `startup.self-check-enabled` only affects future plugin enables, not the already-finished current startup.

## Exported Reports Are Missing

Check:

- `reports.auto-export`
- that the plugin can write to `plugins/1MB-AntiXRay/reports/`
- whether someone cleaned reports with `/xlu debug clean reports` or `/xlu debug clean all`
