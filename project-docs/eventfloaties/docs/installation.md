# Summer Floaties Installation

## Requirements

- Java 25
- Paper runtime target 26.1.2
- Gradle to build from source
- Optional: PlaceholderAPI for placeholders
- Optional: CMI/CMILib if using the default CMI kit reward commands

The plugin is built against the Paper API compatibility floor declared in `build.gradle` and packaged for the Paper 26.1.2 runtime target.

## Build

From the project root:

```bash
gradle build
```

The jar is created as:

```text
build/libs/EventFloaties-v0.1.0-j25-paper-26.1.2.jar
```

The build also verifies:

- plugin jar contents
- SMART matching behavior
- capture ignore behavior
- tracked blueprint bounds
- `/floatie info` and documentation metadata

## Install

1. Stop the server.
2. Copy the built jar into the server's `plugins/` folder.
3. Start the server once to generate `plugins/EventFloaties/config.yml`.
4. Edit `plugins/EventFloaties/config.yml`.
5. Keep `event.live: false` while setting up.
6. Add or copy blueprint files into `plugins/EventFloaties/blueprints/`.
7. Run `/floatie reload` after config or blueprint changes.
8. Run `/floatie admin status`.
9. Perform the manual checks in `docs/pre-live-checklist.md`.
10. Set `event.live: true` only when the event is ready for players.

## Update

1. Build the new jar.
2. Stop the server.
3. Replace the old EventFloaties jar in `plugins/`.
4. Start the server.
5. Review the console for EventFloaties load messages.
6. Run `/floatie admin status`.
7. Run a staff-only test before allowing players to claim rewards.

## Data Files

Runtime files:

```text
plugins/EventFloaties/config.yml
plugins/EventFloaties/blueprints/<id>.yml
plugins/EventFloaties/playerdata/<uuid>.yml
```

Blueprint files are intentionally one file per floatie so staff can copy known-good blueprints between test and live servers.

Playerdata files record completion and reward marker history. Do not copy playerdata between servers unless you intentionally want to copy progress.

Older `blueprints.yml` and `claims.yml` files are migrated into the folder layout on plugin load if the new per-file destination does not already exist.
