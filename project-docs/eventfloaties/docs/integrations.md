# Summer Floaties Integrations

Summer Floaties is a standalone custom 1MoreBlock plugin. It is not a 1MB-CMIAPI feature plugin and does not require 1MB-CMIAPI-LIB.

## Paper

The plugin targets Paper 26.1.2 at runtime and uses the Paper/Bukkit API for commands, block scans, particles, sounds, and item metadata.

## PlaceholderAPI

PlaceholderAPI is optional.

When PlaceholderAPI is installed, Summer Floaties registers the `summer_floaties` expansion. See `docs/placeholders.md` for the available placeholders.

## CMI and CMILib

CMI/CMILib are optional from the plugin's point of view, but the default reward commands use CMI kits:

```yaml
rewards:
  per-floatie-commands:
    - "cmi kit {kit} {player} -s"
  all-floaties-commands:
    - "cmi kit {all_kit} {player} -s"
```

If CMI is not installed, change the reward commands to commands available on that server.

The event reward kits should remain disabled in CMI's kit files so players cannot claim them manually. Console reward commands can still deliver them.

## WorldEdit or FAWE

WorldEdit or FAWE can be useful for staff when copying floatie examples during setup, but Summer Floaties does not require either plugin at runtime.

## Seasonal Event Plugins

Summer Floaties expects another event flow to hand out tokens or floatie boxes. Staff can also give tokens manually with:

```text
/floatie admin give <player> <id> [amount]
```
