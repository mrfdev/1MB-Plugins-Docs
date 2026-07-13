# Configuration And Data

The patched jar includes an empty embedded `config.yml`. No configurable settings were verified from the artifact.

## Generated Data Folder

After startup, the plugin uses:

```text
plugins/HeadDisplays/
```

Known files:

| File | Purpose |
| --- | --- |
| `savedata.json` | Persistent display data. |
| `fonts/black.font` | Built-in font asset. |
| `fonts/oak.font` | Built-in font asset. |
| `fonts/quartz.font` | Built-in font asset. |
| `fonts/stone.font` | Built-in font asset. |
| `fonts/white.font` | Built-in font asset. |

## Persistence

The plugin logs these lifecycle messages while loading and saving:

```text
Starting to load data for HeadDisplays
Finished loading data for HeadDisplays
Starting save data for HeadDisplays
Finished saving data for HeadDisplays
```

Display data is saved on plugin/server shutdown. Stop the server cleanly before copying, replacing, or testing jars.

## Public Documentation Safety

Do not publish live `savedata.json` contents in public docs. It can include display IDs, world names, coordinates, text, and other operational details.
