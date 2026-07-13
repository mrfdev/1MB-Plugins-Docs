# Adding Documentation Sources

`1MB-Plugins-Docs` assembles several independently maintained documentation sources into one site. It is the sole Starlight builder and GitHub Pages publisher.

## Ownership Model

Each source project owns exactly one ID and one imported directory:

```text
project-docs/<project-id>/
```

Generated player pages use the matching ID:

```text
src/content/docs/player-guides/custom-server-plugins/<project-id>/
```

No project may write to the complete `project-docs/` or `src/content/docs/` trees. Pull the latest public `main` before importing and review the resulting namespace-scoped diff before committing.

## Standalone Custom Projects

A source project must contain:

```text
README.md
docs/
  plugin-docs.yml
  player-guide.md
```

It may also provide commands, permissions, placeholders, configuration, installation, integrations, and troubleshooting pages.

Minimum manifest:

```yaml
id: lootbox
name: Lootboxes
category: custom-server-plugin
summary: Collect and open server lootboxes containing configured rewards.
main_command: /lootbox
docs_url: https://docs.1moreblock.com/custom-server-plugins/lootbox/
player_guide: player-guide.md
technical_readme: ../README.md
java_target: "25"
paper_target: "26.2"
official_project: true
repository: mrfdev/1MB-Lootbox
```

IDs use lowercase letters, numbers, and single hyphens. The canonical URL must exactly match the category and ID. Build numbers never belong in documentation URLs.

Import or refresh the source:

```bash
npm run docs:import -- --source ../1MB-Lootbox
npm run docs:generate
npm run docs:validate
npm run build
```

After the first import, `docs-sources.json` records the project. Refresh it with:

```bash
node scripts/sync-docs.mjs --project lootbox
npm run docs:generate
```

## Other Server Features

Third-party features are curated directly in this repository rather than copied from vendor wikis:

```text
catalog/other-server-features/<feature-id>/
  plugin-docs.yml
  player-guide.md
  staff-guide.md
```

Use `category: other-server-feature`, the canonical `/other-server-features/<id>/` URL, and an `official_wiki` link. Explain the feature as configured on 1MoreBlock, including enabled commands, restrictions, ranks, worlds, and server-specific differences. Set `staff_guide: staff-guide.md` when a rendered public-safe technical reference is available. Do not reproduce copyrighted wiki pages.

## Public-Safety Rules

- Verify commands, permissions, placeholders, versions, and behavior from the source project.
- Publish player guidance and public-safe staff administration details only.
- Never publish credentials, private endpoints, paid files, databases, exploit-sensitive values, source code, or internal incident procedures.
- Keep source documentation in its source project; do not hand-edit its mirrored copy.
- Do not hand-edit generated Starlight pages. Change the source guide and regenerate.
- Never force-push the public documentation repository as part of an individual project sync.

## Publishing Checklist

1. Commit and push the source project's code and documentation.
2. Pull the latest `1MB-Plugins-Docs/main`.
3. Import only the changed project namespace.
4. Run `npm test`.
5. Run `npm run docs:generate`, `npm run docs:check`, and `npm run docs:validate`.
6. Run `npm run build` and review the complete diff.
7. Commit and push the public repository separately.
8. Confirm the GitHub Pages workflow and live canonical page.
