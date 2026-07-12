# Standalone Plugin Documentation Onboarding Prompt

Use this prompt when preparing a standalone 1MoreBlock project such as Lootbox, EventFloaties, or mcMMO-More for the central documentation system.

## Prerequisite

Do not publish a standalone project's documentation until `1MB-Plugins-Docs` has a namespace-safe multi-project importer. The current CMI-API-only sync removes and recreates the complete mirror, so it must be replaced before multiple projects contribute.

## Reusable Prompt

```text
We are adding this project to the central 1MoreBlock documentation system.

First inspect the complete repository, including its build files, plugin metadata,
commands, permissions, configuration, placeholders, integrations, tests, and
existing documentation. Do not assume behavior or invent features.

This is a standalone custom 1MoreBlock plugin, also called an "exception plugin."
It is not a 1MB-CMIAPI feature plugin and does not need to use 1MB-CMIAPI-LIB.

OBJECTIVES

1. Create or update complete public-safe technical documentation in this project.
2. Create a friendly player guide suitable for docs.1moreblock.com.
3. Add or update `<main command> info` so players receive:
   - The plugin's player-facing name
   - A short introduction
   - Useful starting commands
   - A clickable canonical docs.1moreblock.com URL
   - The installed version/build when appropriate
4. Prepare this project for the central 1MB-Plugins-Docs importer without
   overwriting documentation belonging to another project.

SOURCE DOCUMENTATION

Use this project-local structure unless an equivalent established structure exists:

README.md
docs/
  player-guide.md
  commands.md
  permissions.md
  placeholders.md
  configuration.md
  installation.md
  integrations.md
  troubleshooting.md
  plugin-docs.yml

Only create pages that apply. Do not create meaningless empty pages. The README
should serve as the technical overview and link to the detailed documents.

Document, when applicable:

- Friendly introduction and purpose
- Player-visible features
- Main command and every available subcommand
- Player and administrative permissions, including defaults
- Placeholders and exact output meanings
- Configuration sections and reload/restart behavior
- Dependencies, optional integrations, and compatibility
- Required Java version
- Target Paper/Minecraft version
- Build commands and jar naming
- Installation and update procedure
- Player workflow and examples
- Administrative setup and readiness checks
- Rewards, whether they are one-time or repeatable, and commands/kits staff must review
- Persistent data and migration behavior
- Known limitations, safety behavior, and troubleshooting
- Public links and support information

Read Java and Paper targets from the actual build configuration. Read commands and
permissions from both plugin metadata and implementation. Reconcile disagreements
rather than documenting only one source.

PLAYER GUIDE

Write player-facing language. Explain what players can do, how to begin, important
commands, requirements, costs, limits, cooldowns, and consequences. Do not expose
private implementation details, internal paths, secrets, exploit-sensitive logic,
or staff-only operational procedures.

Include these sections where applicable:

- Introduction
- How Players Use It
- Available Features
- Quick Start
- Commands
- Permissions or Rank Requirements
- Rewards, Costs, Limits, and Cooldowns
- Placeholders
- Important Notes
- Related Features
- Technical Documentation link

PROJECT MANIFEST

Create `docs/plugin-docs.yml` with verified values in this general form:

id: <unique-lowercase-project-id>
name: <player-facing plugin name>
category: custom-server-plugin
main_command: /<command>
docs_url: https://docs.1moreblock.com/custom-server-plugins/<project-id>/
player_guide: player-guide.md
technical_readme: ../README.md
java_target: <verified version>
paper_target: <verified version>
official_project: true

Use a stable project ID and URL. Do not include a build number in the URL.

NAMESPACE SAFETY

This project owns only its unique namespace:

project-docs/<project-id>/
src/content/docs/player-guides/custom-server-plugins/<project-id>/
src/content/docs/staff-reference/custom-server-plugins/<project-id>/

Never delete or replace the complete `project-docs/`, `src/content/docs/`, player
guides, staff reference, or another project's namespace.

Do not reuse the old CMI-API-only sync behavior that deletes the complete public
documentation mirror.

PUBLIC REPOSITORY SAFETY

The central `1MB-Plugins-Docs` repository is the only Starlight builder and GitHub
Pages publisher. This source project owns its documentation but must not independently
regenerate or force-push the complete public site.

If the central multi-project importer is not implemented yet, prepare and validate
the project-local documentation only. Clearly report that publication is pending.
Do not improvise a destructive sync.

If the importer already exists:

1. Pull the latest public docs `main`.
2. Import only this project's namespace.
3. Generate the complete site.
4. Run namespace, duplicate-ID, duplicate-URL, link, and drift checks.
5. Build Starlight successfully.
6. Review the resulting diff.
7. Commit and push the source project and public docs separately.
8. Verify the GitHub Pages deployment and live canonical page.

IMPLEMENTATION RULES

- Preserve existing project conventions.
- Do not change unrelated behavior.
- Do not copy private source code or jars into the public docs.
- Do not publish credentials, server addresses intended to remain private, internal
  checklists, databases, paid resources, or exploit-sensitive configuration.
- Do not copy third-party wiki text; link to official sources and document only
  1MoreBlock-specific behavior.
- Do not claim a command, permission, placeholder, feature, or compatibility target
  unless verified from the repository.
- Add focused tests for the new info command when the project's test setup permits it.
- Run the project's normal build and tests.
- Report exactly what was documented, implemented, verified, and still needs review.

Before editing, summarize what you found, propose the project ID and canonical URL,
and identify any missing information. Then complete the safe work that can be
verified locally.
```
