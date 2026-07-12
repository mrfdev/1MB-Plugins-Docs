# 1MoreBlock Plugin Docs

Central public documentation aggregator and Starlight site for 1MoreBlock server features.

This repository is the only builder and GitHub Pages publisher for `https://docs.1moreblock.com`. Source projects own their documentation, while this repository imports each project into an isolated namespace, generates the combined player site, validates ownership, and deploys the complete result.

## Documentation Families

- **1MoreBlock Features** are feature plugins built together in `1MB-CMIAPI` and the 1MB Library. Their existing `/player-guides/plugins/<slug>/` URLs remain stable.
- **Custom Server Plugins** are standalone 1MoreBlock projects such as Lootbox, EventFloaties, or mcMMO-More.
- **Other Server Features** are curated guides for third-party plugins used on the server, with links to official documentation.

## Namespaced Sources

Imported projects never share a source directory:

```text
project-docs/
  cmi-api/
    README.md
    docs/
    SYNCED_FROM.md
  lootbox/
    README.md
    docs/
    SYNCED_FROM.md
```

The importer replaces only `project-docs/<project-id>/`. It never removes the complete `project-docs/` tree or another project's namespace.

Generated standalone pages are isolated too:

```text
src/content/docs/player-guides/custom-server-plugins/<project-id>/index.md
src/content/docs/player-guides/other-server-features/<feature-id>/index.md
```

## Existing CMI Workflow

From this repository:

```bash
npm install
npm run docs:sync
npm run build
```

`npm run docs:sync` remains the CMI-only workflow. It imports the sibling `../CMI-API` checkout into `project-docs/cmi-api/` and regenerates the complete site without changing other namespaces.

When CMI-API lives elsewhere:

```bash
PRIVATE_DOCS_SOURCE=/path/to/CMI-API npm run docs:sync
```

## Adding Projects

Standalone projects provide `README.md`, a `docs/` directory, and `docs/plugin-docs.yml`. Import one with:

```bash
npm run docs:import -- --source ../1MB-Lootbox
npm run docs:generate
npm run docs:validate
npm run build
```

The first command registers or refreshes only that project. Later updates can use:

```bash
node scripts/sync-docs.mjs --project lootbox
npm run docs:generate
```

To refresh every registered local source checkout:

```bash
npm run docs:sync:all
```

See [Adding Documentation Sources](docs/adding-projects.md) for the manifest contract, curated third-party workflow, validation rules, and publishing checklist.

## Safety and Validation

```bash
npm test
npm run docs:check
npm run docs:validate
npm run build
```

Validation rejects malformed manifests, unsafe IDs and paths, duplicate IDs and canonical URLs, unregistered namespaces, stale generated pages, and generated directories without an owning manifest. The production build runs the tests and read-only generated-content drift check before Astro, so GitHub Pages cannot deploy from stale committed Starlight output.

This repository intentionally excludes plugin source code, built jars, private server folders, databases, paid plugin files, internal task logs, credentials, and exploit-sensitive operational notes.

## GitHub Pages

Pushes to `main` run the Starlight build and deploy GitHub Pages.

- Public URL: `https://docs.1moreblock.com/`
- GitHub Pages origin: `https://mrfdev.github.io/1MB-Plugins-Docs/`

The custom domain is configured through `public/CNAME` and `astro.config.mjs`.

## Sources

- [Starlight](https://starlight.astro.build/)
- [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
