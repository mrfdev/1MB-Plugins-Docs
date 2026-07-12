# 1MB AntiFire Troubleshooting

## `/_antifire info` Does Not Work

- Confirm the plugin enabled successfully during server startup.
- Confirm the jar in `plugins/` is the expected AntiFire build.
- Check the startup log for command registration messages.

## Admin Commands Say You Do Not Have Access

- Confirm the player has `onembantifire.admin`.
- Do not rely on operator status alone; the permission defaults to `false`.
- Console is always allowed to use the admin flow.

## Soul Fire Does Not Stay Lit

- Confirm the base block is `SOUL_SAND` or `SOUL_SOIL`.
- Confirm `allow-permanent-soul-fire` is enabled.
- Apply the change with `/_antifire reload` or `/_antifire toggle allow-permanent-soul-fire true`.

## Fire Still Spreads Or Burns Blocks

- Check `prevent-fire-spread` and `prevent-block-burn` in `config.yml`.
- Run `/_antifire debug` as a trusted admin to inspect the live settings.
- Verify another plugin is not intentionally reintroducing different fire behavior later in the event chain.

## Config Changes Do Not Seem To Apply

- Use `/_antifire reload` after editing `config.yml` on disk.
- For in-game updates, prefer `/_antifire toggle <key> <value>` so the plugin saves and reapplies the setting immediately.

## Need More Detail

- Technical overview: [README.md](../README.md)
- Command reference: [commands.md](commands.md)
- Configuration reference: [configuration.md](configuration.md)
