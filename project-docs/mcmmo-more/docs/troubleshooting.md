# Troubleshooting

## Start Here

Run:

```text
/mcmmore info
/mcmmore debug status
```

`/mcmmore info` shows the player-facing plugin info, version/build, starter commands, and official docs URL.

`/mcmmore debug status` shows runtime Java, server version, Paper target, build metadata, dependency plugin versions, PlaceholderAPI expansion state, and CMIAPI bridge state.

## Players Do Not Earn XP

Check:

- Is the plugin enabled in `config.yml`?
- Is the skill enabled in `config.yml`?
- Does the player have `onembmcmmore.skills.<skill>`?
- Is the player in the required game mode?
- Is the player vanished or in god mode while config blocks that state?
- Is the activity an enabled source under the parent skill?
- Are anti-exploit checks filtering the activity?

## `/mcstats` Does Not Show These Skills

That is expected. mcMMO More skills are not native mcMMO skills.

Use:

```text
/mcmmore stats
```

For power displays, use:

```text
%onembmcmmore_power_level%
%onembmcmmore_combined_power_level%
```

## `/mctop` Does Not Show These Skills

That is expected. Use:

```text
/mcmmore top
/mcmmore top <skill>
```

## Conversion Is Disabled

Conversion is disabled by default in `conversion.yml`.

For testing:

```text
/mcmmore debug set conversion enabled true
/mcmmore debug reload conversion
```

Players also need `onembmcmmore.command.convert` and the relevant conversion path permissions.

## PlaceholderAPI Values Are Empty

Check:

- PlaceholderAPI is installed and enabled.
- `/mcmmore debug status` shows the expansion as registered.
- The placeholder uses the `onembmcmmore` identifier.
- Dynamic placeholders use a configured skill id.
- Player-specific placeholders are being resolved for a player.

## Missing Defaults Warning

The plugin repairs missing YAML defaults and comments from bundled resources. If a bundled resource cannot be found, rebuild the jar and confirm the YAML files are present under `src/main/resources/`.

## Paper 26.2 Compatibility Testing

The supported target remains Paper 26.1.2. Paper 26.2 is treated as compatibility testing only until the project target changes.

If a 26.2 test shows a real load or runtime error, keep the 26.1.2 target unless source changes are genuinely required for compatibility.
