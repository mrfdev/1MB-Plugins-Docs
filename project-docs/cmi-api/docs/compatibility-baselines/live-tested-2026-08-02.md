# Live-Tested Baseline: 2026-08-02

This is the rollback baseline immediately before testing CMI 9.8.9.6 and its rewritten chat handling.

## Source Snapshot

- Branch: `main`
- Git tag: `live-tested-2026-08-02-pre-cmi-9.8.9.6`
- 1MB release: `1.0.1-559`
- Build JDK: Java 25.0.4
- Compatibility JDK: Java 26.0.2

## Proven Server Combination

| Component | Proven version | SHA-256 |
| --- | --- | --- |
| Paper | 26.2 stable build 87, `Paper-26.2.jar` | `3ab7536642d04c504a06fe43174b8a94f8c5f25d5847d4672212413f6e54b906` |
| CMI | 9.8.8.5, `CMI-9.8.8.5.jar` | `7153e4b143e6d4ec551a3595a7595bc6209daf32182ed65c02cc421d8a1f2424` |
| CMILib | 1.5.9.9, `CMILib1.5.9.9.jar` | `6d3d3d73d04a1e70987bd899198971af6bbb5b34550e621f2df8a9cb7bee9862` |
| 1MB shared library | 1.0.1-559 | `e38b9d7c34fe1b5dc5eb10b31edefa77dd1747445b496a2c238ccefcb2932c87` |
| 1MB StaffMsg | 1.0.1-559 | `fb9c2a9fdcf7af29c71ce8dd4120fbab908736559d4261656c70480d2905d55e` |
| 1MB NotableMsg | 1.0.1-559 | `3284a44d8001d9b18c3cdd75ea30327bb337e1b3a5745ffb78419c63f2443f9c` |
| 1MB DiscordChat | 1.0.1-559 | `fc387587c2a5fce9518cedaa5e2eb4da3db83ccbfe57b51b9cdf3a2d068da3b4` |

The server launcher selects `/Library/Java/JavaVirtualMachines/jdk-25.0.4.jdk/Contents/Home/bin/java`. PaperScript 5.0.1 build 049 reported the Paper jar as current, checksum-valid, and the latest stable 26.2 release.

## Test Evidence

- The full Gradle `check` lifecycle passed for all modules at build 559.
- Paper reached `Done` with CMI 9.8.8.5 and CMILib 1.5.9.9.
- The 1MB library and feature plugins loaded at 1.0.1-559.
- Appreciation command, GUI, and the `[☻ Appreciation]` prefix were smoke-tested in game.
- The server completed a clean shutdown.

## Local Binary Archive

Exact rollback binaries and the matching CMI and CMILib configuration folders are preserved outside Git at:

```text
archive/live-tested-2026-08-02-pre-cmi-9.8.9.6/
```

The archive contains Paper, CMI, CMILib, and every active `1MB-CMIAPI-*.jar` from this baseline. The repository ignores `archive/` by design, so this copy is local and the Git tag remains the durable source snapshot.

## Rollback Procedure

1. Stop the test server completely.
2. Back up the current `plugins/CMI/` and `plugins/CMILib/` folders if they contain data worth retaining.
3. Replace Paper, CMI, CMILib, and the 1MB jars with the copies in the local archive. Do not leave two CMI or CMILib jar versions active.
4. When configuration migration is suspected, restore the archived CMI and CMILib folders as a matched pair with their jars.
5. Start the server with Java 25.0.4.
6. Confirm Paper 26.2 build 87, CMI 9.8.8.5, CMILib 1.5.9.9, and 1MB 1.0.1-559 before testing chat.
7. To restore source, check out the tag on a temporary recovery branch rather than moving or rewriting `main`.

The incoming, not-yet-proven `CMI-9.8.9.6.jar` has SHA-256 `7cee77eba04457ab0c46efda56c13b7f65cb32e971f3cfc9d11f2c28d979b013`.
