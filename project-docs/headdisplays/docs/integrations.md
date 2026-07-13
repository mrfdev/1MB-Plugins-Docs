# Integrations

Integrations are verified from `plugin.yml` soft dependencies and class references in the jar.

## Soft Dependencies

| Plugin | Purpose |
| --- | --- |
| PlaceholderAPI | Resolves placeholders inside display text when installed. |
| Multiverse-Core | Listed as a soft dependency; specific behavior was not verified from local tests. |
| HeadDatabase | Optional listener integration is present when HeadDatabase is enabled. |
| packetevents | Listed as a soft dependency; specific behavior was not verified from local tests. |

## Plugin Channels And Metrics

The jar registers the outgoing plugin channel:

```text
arceon:version
```

The jar also includes bStats metrics classes and reports an `active_displays` chart.

## Notes

Only document 1MoreBlock-specific use after testing on the target server. This workspace does not contain upstream documentation or source code for the optional integrations.
