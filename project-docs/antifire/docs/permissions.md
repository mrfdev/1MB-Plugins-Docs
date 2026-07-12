# 1MB AntiFire Permissions

## Verified Permission Nodes

- `onembantifire.admin`
  Allows trusted players to use the admin `/_antifire` flow, including `help`, `debug`, `reload`, and `toggle`.

## Defaults

- `onembantifire.admin` defaults to `false`.
- Operators do not receive this permission automatically.
- Console is always allowed to use the admin command flow.

## Public Access

- `/_antifire info` does not require a permission node.
- Non-admin players who run bare `/_antifire` receive the public info view instead of admin controls.

## Recommended Use

- Grant `onembantifire.admin` only to the server owner and specifically trusted admins.
- Manage the node through LuckPerms or another permission plugin instead of relying on operator status.
