# Installation

This page covers the local patched artifact, not the upstream paid plugin distribution.

## Artifact

Use:

```text
HeadDisplays-1.12.9-26.2-display-fix.jar
```

Known local copies:

```text
HeadDisplays-1.12.9-26.2-display-fix.jar
servers/Paper-26.1.2/plugins/HeadDisplays-1.12.9-26.2-display-fix.jar
servers/Paper-26.2/plugins/HeadDisplays-1.12.9-26.2-display-fix.jar
```

## Update Procedure

1. Stop the server cleanly.
2. Back up the existing HeadDisplays jar.
3. Ensure only one HeadDisplays jar is present in the top-level `plugins/` folder.
4. Copy `HeadDisplays-1.12.9-26.2-display-fix.jar` into `plugins/`.
5. Start the server.
6. Confirm the startup log shows HeadDisplays enabling, loading 5 fonts, and loading data.
7. Join as a permitted player and run `/hd info`.
8. Test `/hd list` and `/hd create <test text>` in a safe test area.

## Duplicate Jar Warning

Paper identifies plugins by `plugin.yml`, not filename. Do not leave both the original `HeadDisplays-1.12.9.jar` and the patched jar in the same active `plugins/` folder.

## Java And Paper Targets

The jar classes target Java 21. The local smoke tests were run with Java 25, but Java 21 is the verified bytecode target.

Compatibility tested locally:

| Target | Status |
| --- | --- |
| Paper/Minecraft 26.1.2 | Smoke test passed. |
| Paper/Minecraft 26.2 | Smoke test passed with patched NMS display entity lookup. |
