# Permissions

Permissions are verified from `plugin.yml` in the patched jar.

All permissions default to `op`.

| Permission | Default | Notes |
| --- | --- | --- |
| `headdisplays.create` | `op` | Required by `/hd create <display text>`. |
| `headdisplays.edit` | `op` | Required by `/hd edit <display id>`. |
| `headdisplays.info` | `op` | Required by `/hd info`. |
| `headdisplays.list` | `op` | Required by `/hd list [page]`. |
| `headdisplays.delete` | `op` | Present in `plugin.yml`, but the delete command is not registered by the inspected 1.12.9 command dispatcher. |
| `headdisplays.refresh` | `op` | Present in `plugin.yml`, but the refresh command is not registered by the inspected 1.12.9 command dispatcher. |
| `headdisplays.listnear` | `op` | Present in `plugin.yml`; the corresponding class is a no-op in the inspected 1.12.9 jar. |
| `headdisplays.admin` | `op` | Parent permission for create, delete, edit, info, list, listnear, and refresh. Also controls the richer help output. |

Use the narrow command permissions for staff roles where possible.
