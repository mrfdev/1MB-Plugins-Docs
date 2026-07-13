# Other Server Features

This directory contains 1MoreBlock-specific guides for third-party plugins and server systems.

Give every feature its own directory containing `plugin-docs.yml`, `player-guide.md`, and, when technical notes are available, `staff-guide.md`. The generator discovers those directories automatically and renders player and staff pages separately. Link to official sources, describe only the way the feature is available on 1MoreBlock, and do not copy upstream documentation wholesale.

Start from `templates/other-server-feature/` and run:

```bash
npm run docs:generate
npm run docs:validate
npm run build
```
