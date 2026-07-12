# 1MB AntiFire Integrations

## Verified Integrations

- Paper API `26.1.2` compile target

## Load Order Hints

The plugin metadata declares:

- `load: STARTUP`
- `loadbefore: [ Multiverse-Core, WorldGuard ]`

This means AntiFire is intended to start early so fire-protection behavior is active as soon as possible during server
startup.

## Dependencies

- Hard dependencies: none declared
- Soft dependencies: none declared
- Optional integrations: none implemented in code

## Placeholder And Command Framework Notes

- No PlaceholderAPI expansion is implemented.
- The plugin uses Paper's command lifecycle registration for `/_antifire`.

## Compatibility Notes

- Main supported Paper target: `26.1.2`
- Compatibility smoke-test target: `26.2`
- Java target: `25`
