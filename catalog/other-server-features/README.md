# Other Server Features

This directory contains 1MoreBlock-specific guides for third-party plugins and server systems.

Give every feature its own directory containing `plugin-docs.yml` and `player-guide.md`. The generator discovers those directories automatically. Link to the official wiki, describe only the way the feature is available on 1MoreBlock, and do not copy upstream documentation wholesale.

Start from `templates/other-server-feature/` and run:

```bash
npm run docs:generate
npm run docs:validate
npm run build
```
