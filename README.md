# 1MoreBlock Plugin Docs

Central public documentation aggregator and Starlight site for 1MoreBlock server features.

This repository is the only builder and GitHub Pages publisher for `https://docs.1moreblock.com`. Source projects own their documentation, while this repository imports each project into an isolated namespace, generates the combined player site, validates ownership, and deploys the complete result.

## Documentation Families

- **1MoreBlock Features** are independently deployable Feature Plugins built around the shared 1MB Library. Their existing `/player-guides/plugins/<slug>/` URLs remain stable.
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
src/content/docs/staff-reference/custom-server-plugins/<project-id>/index.md
public/catalogues/<project-id>/
```

Staff guides, child staff documents, and searchable catalogue assets are opt-in. They use the same project ID and cannot replace another project's namespace. A project with a private root README can declare a reviewed `public_readme` under its own `docs/` directory; projects without that field keep the original import behavior.

## Existing 1MB Library Workflow

From this repository:

```bash
npm install
npm run docs:sync
npm run build
```

`npm run docs:sync` remains the compatibility-named workflow for the 1MB Library source. It imports the sibling `../1MB-Library` checkout into `project-docs/cmi-api/` and regenerates the complete site without changing other namespaces.

When the private 1MB Library source lives elsewhere:

```bash
PRIVATE_DOCS_SOURCE=/path/to/1MB-Library npm run docs:sync
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

Validation rejects malformed manifests, unsafe IDs and paths, machine-local user-profile paths, duplicate IDs and canonical URLs, unregistered namespaces, stale generated pages, and generated directories without an owning manifest. The production build runs the tests and read-only generated-content drift check before Astro, so GitHub Pages cannot deploy from stale committed Starlight output.

This repository intentionally excludes plugin source code, built jars, private server folders, databases, paid plugin files, internal task logs, credentials, and exploit-sensitive operational notes.

High-risk sources use two matching controls: the private source declares `.public-docs-excludes`, and this public repository records mandatory `requiredPrivateDocs` entries in `docs-sources.json`. Synchronization refuses a weakened source policy, validation rejects guarded paths that appear in the public namespace, and `.gitignore` provides an additional staging safeguard. See [Adding Documentation Sources](docs/adding-projects.md#public-safety-rules).

## GitHub Pages

Pushes to `main` run the Starlight build and deploy GitHub Pages.

- Public URL: `https://docs.1moreblock.com/`
- GitHub Pages origin: `https://mrfdev.github.io/1MB-Plugins-Docs/`

The custom domain is configured through `public/CNAME` and `astro.config.mjs`.

## Sources

- [Starlight](https://starlight.astro.build/)
- [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
