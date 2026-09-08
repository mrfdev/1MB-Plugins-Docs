# Progression previews

Open **`/votetokens path`** or **`/journeymap path`** to see where you are, what advancing makes available, and one later goal. Add **`chat`** for the same short path without a menu. These previews are requested by the player; they add no login message, reminder or notification stream.

## VoteTokens: make each first purchase count

A typical path reads:

- **Now: Tier 1 / Layer 1.** Five of six distinct rewards completed.
- **Next: Tier 2 / Layer 1.** Preview the actual configured rewards. Finish the one remaining distinct trade in Tier 1 to advance, with earlier enabled layers complete.
- **Later: Tier 2 / Layer 2.** See one further reward stage and what it requires.

The exact rewards and counts come from the enabled reward tree and saved successful purchases. **View remaining trades** filters to unfinished enabled entries in the current layer. **Preview next rewards** shows real reward items and token costs through the normal layer page. **All stages** opens the full progress tree, with pagination for larger configurations. The footer head leads back to the compact path.

A first successful purchase completes one distinct entry. A repeat purchase gives another reward, costs the same tokens, and adds no new unlock progress. This distinction appears in reward tooltips, purchase confirmation and the path. Neither a preview nor a click on a stage spends tokens; an actual purchase still needs the existing confirmation and delivery checks.

Disabled tiers/layers are excluded from active advancement. A future disabled stage is explicitly unavailable, with no suggestion that grinding can enable it. Empty or unfinished reward layers explain the blocker. Already completed stages and grants are preserved. The path ends honestly when no further active content exists. `/votetokens progress` supplies the short chat view; staff can still inspect another player's full saved progress.

## JourneyMap: understand the next badge

**Now** shows a recorded badge and era. **Next** explains the next unrecorded badge, remaining recorded playtime, and actual configured payoff. **Later** shows one further milestone. Badge-only milestones and disabled reward payouts are explicit; the preview makes no automatic-delivery claim.

Playtime is from the last check, not a live ticking estimate. **Check my playtime** deliberately runs the normal refresh action. An unchecked session asks for that check instead of pretending the player has no history. A threshold reached without a saved badge also asks for a check; browsing does not award it. Saved earned badges remain earned after a threshold change. The completed or unconfigured path does not invent another goal.

**All journey badges**, **Review rewards**, and **Choose a focus** use the existing feature actions. Opening the preview does not claim a reward or replace a pin. Choosing one of those controls is an explicit navigation action and keeps its usual checks and permissions.

## Availability, controls and safety

The shared `/next` system links to the previews. VoteTokens requires its use and progress permissions; JourneyMap requires use access and checks the permission for each destination. Dormant, disabled, invalid or unavailable features do not supply actionable previews. Debug never bypasses those checks. Forage's live dormancy and release gate are unchanged.

New VoteTokens preview reads use a bounded background worker. The result returns to the server thread for rendering and permission/lifecycle checks. Closing or replacing a loading menu, quitting, reloading, disabling, or losing access invalidates old navigation. The preview does not save over a player's progress. JourneyMap previews use cached recorded facts and do not read world chunks or poll external playtime providers.

Menus use server-owned inventory/session identity, descriptive labels, readable wrapped tooltips and the shared footer. Color supplements visible states. Preview stage items cannot be taken; navigation never performs a trade or reward claim. Requested previews remain available regardless of optional-hint frequency or recording quiet settings.

## Extending the pattern

`ProgressionPreview` is an immutable presentation snapshot with three stages, explicit states, remaining work, payoff and action text. Its label keys live under `progression.*` in each feature's regular translation file. A Feature Plugin supplies its own authoritative progress, availability and payoff descriptions; the shared presentation does not infer economy rewards or bypass unlock gates. Further plugins can adopt the same pattern without a new notification channel.

## Local validation

Canonical build **615** synchronized all **64 JARs** and passed **1,230 tests** (zero failures/errors, one existing skip). **77 isolated Paper 26.2 build 121 checks** passed with synthetic players and private test profiles, covering stage contents, unique purchases, unavailable rewards, large-tree navigation, input cancellation, stale actions, background loads, quit/reconnect, permission/lifecycle changes, and unchanged inventory/progress/reward state. The deliberate corrupt test profile produced a retry/help message and was quarantined rather than presented as a new player.

The server stopped cleanly, the temporary probe was removed, and all JAR hashes and the original plugin inventory matched. Synthetic players cannot enter Paper's vanilla command dispatcher; the harness invokes the registered JourneyMap chat command directly. Real-client button dispatch, readability and gameplay acceptance remain in the [client checklist](../checklist.md#progression-previews-comm-07-order-9). Public documentation publication and live installation are pending.

Tracking: [COMM-07 / issue #44](https://github.com/mrfdev/1MB-Library/issues/44).
