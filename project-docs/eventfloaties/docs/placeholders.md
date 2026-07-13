# Summer Floaties Placeholders

Summer Floaties registers PlaceholderAPI placeholders when PlaceholderAPI is installed.

Identifier:

```text
summer_floaties
```

## Placeholders

| Placeholder | Meaning |
| --- | --- |
| `%summer_floaties_completed%` | Number of floaties the player has completed. |
| `%summer_floaties_total%` | Number of registered floatie blueprints. |
| `%summer_floaties_remaining%` | Number of registered floaties the player has not completed yet. |
| `%summer_floaties_percent%` | Completion percentage across all registered floaties, rounded down. Returns `0` when no blueprints are registered. |
| `%summer_floaties_completed_<id>%` | `1` if the player completed that floatie id, otherwise `0`. |
| `%summer_floaties_has_token_<id>%` | `1` if the online player has the matching secure token in their inventory, otherwise `0`. |

## Examples

```text
%summer_floaties_completed%
%summer_floaties_total%
%summer_floaties_remaining%
%summer_floaties_percent%
%summer_floaties_completed_swan%
%summer_floaties_has_token_duck%
```

## Online Inventory Limitation

`has_token_<id>` checks the live inventory and only works for online players. It returns `0` for offline players.
