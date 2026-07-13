# Plugin Modules

Every large feature should be treated as a separate jar/plugin module unless there is a clear reason to keep it inside the existing jar.

The current project module is:

- `1MB-mcMMO-More`: standalone companion plugin for custom grindable skills next to `mcMMO.jar`, with an optional bridge into `1MB-CMIAPI-Lib`.

Module rules:

- Prefer a single jar for this add-on while the scope remains custom mcMMO-adjacent skills.
- Keep the CMIAPI bridge optional and reflective so this jar still runs without the shared 1MB CMIAPI lib.
- Keep mcMMO integration visible in `/mcmmore info`, debug output, and docs.
- Keep optional CMI, CMILib, CMI-API, PlaceholderAPI, LuckPerms, Vault, and DiscordSRV integrations documented when added.
- Do not patch or vendor upstream mcMMO source into this repository.
- Test server data under `servers/` and upstream reference source under `clone/` must stay ignored.
