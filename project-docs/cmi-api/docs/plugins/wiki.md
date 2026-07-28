# Wiki Assistant

## Purpose

Wiki Assistant is a deterministic Minecraft reference helper. Players can ask
a short question with `/wiki` and receive either:

- a concise answer from the server's reviewed local knowledge pack;
- a small list of possible articles when the question is ambiguous; or
- an honest link-only result when no reviewed answer text is available; or
- a Minecraft Wiki search link when no validated local article is reliable
  enough to present.

It is not an AI chatbot and does not invent an answer to fill a gap. Every link
to a specific article is built from a validated local catalog title. Player
input is never converted into a guessed article URL.
Minecraft Wiki is community-maintained, is not an official Mojang Studios or
Microsoft service, and is not affiliated with or endorsed by 1MoreBlock.

## Player Commands

```text
/wiki
/wiki help
/wiki <question or topic>
/wiki choose <1|2|3>
/wiki recent
```

Examples:

```text
/wiki how do squids spawn
/wiki how do I breed frogs
/wiki ancient city
/wiki crafting recipes
/wiki stone bricks
/wiki beacon
/wiki nether portal
```

`/wiki` shows a short introduction and clickable examples. Exact reviewed
aliases are selected first. When more than one local article is plausible,
Wiki Assistant shows at most three choices and waits for
`/wiki choose <number>` instead of guessing.

If no validated result reaches the configured confidence threshold, Wiki
Assistant says it is unsure and offers a clickable Minecraft Wiki search page
for the normalized topic. The search link does not claim that any particular
article exists.

`/wiki recent` shows only that player's small, short-lived in-memory history.
It is cleared on disconnect, is bounded, expires automatically, and is never
written to the Wiki cache.

## Passive Review Wishlist

An unresolved player topic can be counted in the server's passive review
wishlist. This does not download content, generate an alias, create an article
URL, or modify the active catalog. It only helps staff see which missing topics
players actually request.

The same player and normalized topic count at most once per 24 hours by
default. Staff can review the most requested topics, manually verify the real
Minecraft Wiki page, preview the exact direct URL, and confirm an owner-only
resolution. The confirmed transaction creates a reviewed link-only mapping or
adds an exact alias, validates and reloads the catalog, proves the resolver
returns that exact page, and only then marks the wishlist item added. Any
failure before finalization restores the previous knowledge file. Topics can
also be marked ignored or invalid without affecting player commands.

```text
/wikiadmin wishlist resolve deepslate https://minecraft.wiki/w/Deepslate
/wikiadmin wishlist resolve deepslate https://minecraft.wiki/w/Deepslate --confirm
```

The first command is a preview and makes no change. It provides a clickable
direct page for the owner to inspect. Wiki Assistant does not contact the site
to prove existence in `local-only` mode; `--confirm` records the owner's manual
verification. Only exact `https://minecraft.wiki/w/Page_Title` links are
accepted. Search links, alternate hosts, credentials, ports, query strings,
fragments, nested paths, and malformed encodings are rejected.

If an `added` topic later stops resolving after a catalog change, the next
real player miss passively reopens it as unresolved. Ignored and invalid topics
remain suppressed until an owner explicitly reopens them.

The default hard limits are 5,000 topics, 100,000 opaque requester
fingerprints, and 64 MiB including SQLite sidecars. Reaching a limit never
changes the player response; it only declines the new wishlist signal.

## Answer Labels

Every result identifies the article and its edition scope as Java Edition,
Bedrock Edition, both editions, or not yet classified. Version and source
revision context are shown when the reviewed entry provides them.

Important labels include:

- `Link-only`: the article mapping is useful, but no reviewed concise answer
  may be shown yet.
- `Stale cache`: an approved cached answer is still inside its allowed stale
  window.
- `Review expired`: the answer text is hidden until staff reviews it again.
- `Choose A Wiki Article`: the local match is ambiguous and requires a player
  choice.
- `Search Minecraft Wiki`: no local title was reliable enough to present, so
  only the fixed Minecraft Wiki search endpoint is offered.

## Privacy And Network Use

The production default is `local-only`. It reads the curated local knowledge
pack and makes no network requests. `cache-only` may read already approved
cache entries but also makes no network requests.

Original command text, player names, UUIDs, IP addresses, chat context, and
per-player query history are not stored in SQLite or sent upstream. Wiki
content is never sent to an LLM. There are no public operational placeholders.

When the passive wishlist is enabled, only the normalized unresolved topic,
aggregate request count, distinct-player count, timestamps, review status, and
up to three low-confidence titles from the already validated local catalog are
stored in a separate bounded SQLite file. Distinct interest uses a
query-specific HMAC fingerprint. The database therefore contains no player
identity and cannot use one fingerprint to correlate a player across different
topics.

This release does not install a production Minecraft Wiki API provider.
Changing the mode to `approved-api` therefore fails closed to cache/local
behavior even when a policy file is edited.

## Cooldowns

Normal player questions use a 90-second cooldown by default and can never be
configured below 60 seconds in production. Choosing from an existing result
uses a separate short cooldown because it does not perform a new search.

The trusted-staff cooldown bypass affects only player command spam. It can
never bypass remote policy, request intervals, budgets, backoff, or circuit
state.

## Permissions

```text
onembcmi.wiki.use
onembcmi.wiki.bypass-player-cooldown
onembcmi.wiki.admin
onembcmi.wiki.owner
```

`onembcmi.wiki.use` defaults to true. Every other Wiki permission defaults to
false, including for operators. Console can use Wiki administration commands.
The owner node also permits read-only admin diagnostics.

## Staff Commands

Read-only staff commands:

```text
/wikiadmin status
/wikiadmin lookup <question>
/wikiadmin cache stats
/wikiadmin cache inspect <entry-id|page-title>
/wikiadmin cache prune --dry-run
/wikiadmin aliases list [page]
/wikiadmin wishlist top [limit]
/wikiadmin wishlist stats
/wikiadmin wishlist inspect <topic>
/wikiadmin wishlist prune --dry-run
/wikiadmin knowledge validate
/wikiadmin knowledge reload
/wikiadmin policy status
/wikiadmin reload
/wikiadmin debug <health|cache|resolver|remote|all>
```

Owner-only confirmed operations:

```text
/wikiadmin cache refresh <page-title> --confirm
/wikiadmin cache invalidate <page-title> --confirm
/wikiadmin cache prune --confirm
/wikiadmin aliases add <phrase> <canonical-title>
/wikiadmin aliases remove <phrase> --confirm
/wikiadmin wishlist resolve <topic> <article-url>
/wikiadmin wishlist resolve <topic> <article-url> --confirm
/wikiadmin wishlist mark <added|ignored|invalid|unresolved> <topic> --confirm
/wikiadmin wishlist prune --confirm
/wikiadmin remote test --dry-run
/wikiadmin remote test --confirm
```

Manual refresh cannot bypass any safety gate. In this release, a confirmed
remote test reports that no request was made because no reviewed production
provider is installed.

Marking a wishlist topic `added` is also fail-closed: the active resolver must
already find a validated catalog result. The owner must add and reload the
page or alias first.

## Local Knowledge

The bundled `knowledge.yml` contains 16 draft, link-only starter mappings and
no copied Minecraft Wiki prose. Its topics are Squid spawning, Frog breeding,
Ancient City, Crafting, Stone Bricks, Beacon, Elytra, Nether Portal,
Enchanting, Brewing, Trading, Diamond, Netherite, Stronghold, Ender Dragon,
and Redstone Dust.

Only enabled, unexpired `reviewed` entries can show answer text. Draft entries
still provide a safe article link; retired and disabled entries are excluded
from player resolution.

Staff can validate the complete knowledge and alias files atomically before
reloading them. An invalid reload keeps the last known-good runtime index.

## Cache Safety

The optional external cache is bounded SQLite storage supplied through Paper's
runtime SQLite driver. It keeps canonical page identity, freshness, source
revision, history, license, transform, review provenance, refresh jobs, and
remote safety budgets. It does not contain player identity or raw questions.

The passive wishlist uses a separate SQLite database and private HMAC key so
it can be disabled, inspected, backed up, or purged independently of article
cache data. Both databases are accessed only through the feature's bounded
background storage executor.

Expired or invalid unreviewed pages can be previewed and pruned. Reviewed data
is preserved conservatively, and cache corruption falls back to local links
while retaining the corrupt file for owner diagnosis.

[Documentation index](../README.md)
