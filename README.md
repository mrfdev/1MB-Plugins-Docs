# 1MoreBlock Plugin Docs

Public documentation mirror and Starlight site for 1MoreBlock plugin features.

The private development repository is `mrfdev/1MB-CMIAPI`. This public repository intentionally publishes documentation only:

- `project-docs/README.md`
- `project-docs/docs/`
- `src/content/docs/` for the Starlight site

It does not publish plugin source code, built jars, private server folders, databases, paid plugin files, internal task logs, or operational checklists.

## Local Workflow

From this repository:

```bash
npm install
npm run docs:sync
npm run build
```

`npm run docs:sync` copies `README.md` and `docs/` from the sibling private repo at `../CMI-API` into `project-docs/`, then regenerates the Starlight content pages.

If the private repo lives somewhere else:

```bash
PRIVATE_DOCS_SOURCE=/path/to/CMI-API npm run docs:sync
```

## GitHub Pages

GitHub Actions deploys the Starlight build on pushes to `main`.

Default public URL:

```text
https://mrfdev.github.io/1MB-Plugins-Docs/
```

For a future custom domain such as `docs.1moreblock.com`, add `public/CNAME` and update `astro.config.mjs` according to the Astro GitHub Pages custom-domain instructions.

## Sources

- Starlight: https://starlight.astro.build/
- Astro GitHub Pages deployment: https://docs.astro.build/en/guides/deploy/github/
