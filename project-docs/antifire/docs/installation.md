# 1MB AntiFire Installation

## Requirements

- Paper `26.1.2` is the main supported target.
- Paper `26.2` is treated as a compatibility smoke-test target.
- Java compilation target: `25`
- Expected runtime: Java `25+`

## Build From Source

Run:

`./gradlew build`

The jar is written to:

`libs/1MB-AntiFire-v2.0.5-036-j25-26.1.2.jar`

## Install On A Server

1. Stop the server cleanly.
2. Place the built jar in the server `plugins/` folder.
3. Start the server.
4. Confirm the plugin enables and writes its startup summary if `startup-log` is enabled.
5. Run `/_antifire info` to confirm the public info command is present.
6. Run `/_antifire debug` as a trusted admin to confirm the live settings and build metadata.

## Update Procedure

1. Stop the server cleanly.
2. Replace the older AntiFire jar in `plugins/`.
3. Start the server again.
4. Review `plugins/1MB-AntiFire/config.yml` and keep any intentional custom values.
5. Use `/_antifire reload` or `/_antifire debug` as needed for verification.

## Local Testing

The repository keeps the normal build independent from any local `servers/` folder.

Example runner commands:

- `/Users/floris/Projects/Codex/servers/run-test-server --paper 26.1.2 --plugin libs/1MB-AntiFire-v2.0.5-036-j25-26.1.2.jar --foreground`
- `/Users/floris/Projects/Codex/servers/run-test-server --paper 26.2 --plugin libs/1MB-AntiFire-v2.0.5-036-j25-26.1.2.jar --foreground`
