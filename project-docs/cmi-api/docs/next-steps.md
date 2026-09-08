# Dynamic next steps and the global hub

Communication roadmap items **COMM-01 (#5)** and **COMM-02 (#6)** share one implementation. Each integrated Feature Plugin supplies its own current suggestions; the Shared Library selects and presents them. Implementation and acceptance are tracked in [issue #40](https://github.com/mrfdev/1MB-Library/issues/40).

## For players

Use **`/next`** when you want an idea for what to do next. The menu offers at most three activity choices:

| Choice | What it means |
| --- | --- |
| **Continue** | An unfinished activity, a prerequisite to resolve, or a useful next use of your progress. |
| **Ready to collect** | One earned reward that currently passes the feature's readiness checks. Opening it shows details; collection happens in that feature. |
| **Try something** | An available collection, introduction, or activity to explore. |

A card explains your current situation, the benefit, and the next action. Click it to open the relevant details. Use **Something else** to see alternatives, **Refresh** to check again, or the standard server-menu button to browse all activities. Empty choices explain that there is nothing waiting; they never invent work, a reward, or a deadline. Suggestions cover the connected activities, while `/menu` remains the wider server directory.

For a single feature, use **`/autosell next`**, **`/passport next`**, **`/journeymap next`**, or **`/forage next`**. Each gives one suggestion in chat, a reason to do it, a clickable destination, and a readable command fallback. Add **`other`** to see another valid suggestion. If only one exists, the message explains that you can keep playing your own way.

**`/next chat`** gives a text version of the three choices. **`/next other`** rotates the hub choices. **`/next help`** explains the controls. `/menu` includes **Your next step** by default, including existing menus that have not opted out of adding the button.

Illustrative player messages:

- **AutoSell:** “Your quest is complete. Review the reward and collect it when you choose.” Its button opens that quest's details, without requiring another sale.
- **AutoSell recovery:** “Selling is switched off. Open AutoSell and turn it on when you want to sell. Store any reward items first.” This never switches selling on from guidance.
- **Passport:** “Biomes passport: 4 of 12 stamps left. Complete this category for 12 stamp credits. Choose one stamp from the missing list.” Counts come from the current collection, not these example values.
- **Forage:** “Review a Tier II tool upgrade. Requirements met: 750 points and $25,000. Open the upgrade details at your camp and choose whether to confirm.” This appears only when the actual configured requirements and balances pass.
- **JourneyMap:** “Work toward your next badge. At your last progress check: 2 hours of playtime left. Keep playing activities you enjoy; open your journey to refresh.” The estimate is explicitly a saved reading.

This is guidance you request yourself. Normal/Fewer/Off, hidden optional hints, and RecordingMode do not prevent you opening your own next steps. The separate [focused welcome](focused-welcome.md) uses these providers for one optional return message, and KitStreaks contributes an optional due reminder through the shared guidance service. Neither opens a menu automatically.

## Initial integration coverage

| Feature | Current decisions | Destination behavior |
| --- | --- | --- |
| AutoSell | Earned quests and milestones; current quest periods; existing receipts; on/off, runtime permissions, game mode, world, movement, overheat, daily allowance, minimum batch, near-full preference, inventory eligibility and filters. | Specific quest/milestone details, Preview, selling preferences, or private request status. Finished/refunded goals are not offered for another claim. |
| Passport Discovery | Existing collection progress, active categories, collection pauses, credit balances and prior box claims. | A selected category's missing list, collection status, or Stamp Boxes. A credit trade includes its price and appears under Continue, never as a free reward to collect. |
| JourneyMap | Saved playtime, earned and claimed badges, reward configuration, claim access, and private pending requests. | Journey status refresh, milestone list, rewards, or own request status. Viewing guidance does not refresh, persist, or claim playtime rewards. |
| Forage | World/region access, owned and complete nearby camp, main-hand curated tool and amount, durability, global/family/local gathering limits, completed quests, and actual tier-upgrade prerequisites and costs. | Camp guide, sources, limits, quests, or upgrade/repair details. Reading suggestions never registers a camp, rewrites its owner, changes a tool, or claims a reward. Gathering can remain the next step away from an existing camp. |

A nearby incomplete owned Forage Camp takes priority over activities that need it. Away from camp, a completed quest directs the player back to camp without being placed under Ready to collect there. Camp scans only inspect an already loaded area; guidance never requests chunk loads. Forage's existing deferred live-release gate is unchanged.

Passport and JourneyMap use their existing player caches. If progress has not been loaded, the suggestion asks the player to open that feature first rather than loading every feature's files while building the hub. Passport guidance never assigns randomized discovery goals. JourneyMap does not extrapolate playtime or promise that another plugin's clock has advanced.

Other Feature Plugins can adopt the same provider contract later. This first delivery does not generate generic recommendations for all 64 modules. Player-selected persistent focus and temporary bossbars are available through [One pinned focus goal](focus-goals.md), **COMM-06 (#7)**.

## Selection and safe navigation

- A valid ready reward is preferred within a feature. Recovery steps come before unfinished work that cannot currently advance. An unrelated selling pause does not hide an already earned internal AutoSell reward.
- Recent explicit use of an integrated feature influences comparable Continue choices for the current session (up to 30 minutes). This is a lightweight preference, not a pinned goal or inferred behavioral profile.
- The hub reserves its reward choice, then prefers different features for Continue and Try something. If only one feature contributes, it can supply distinct cards. A large reward list retains room for other kinds of suggestion.
- Alternatives cycle deterministically. There are no random rerolls, artificial urgency, or rewards for opening guidance.
- A click resolves the provider again and compares the current recommendation with the one displayed. Changed progress, costs, limits, access, configuration, or provider ownership causes an explanatory refresh. A stale reward never becomes a different action silently.
- Chat shortcuts belong to the viewing player, expire after ten minutes, and are consumed once. At most 32 shortcuts are held per session. Quit and world changes discard them; unregistering a provider invalidates its shortcuts.
- Global command requests share a 500 ms per-player debounce with feature next commands. Shared GUI ownership, session identity, left-click admission, drag cancellation, and deferred action checks apply to the hub.
- Guidance opens information in the owning feature. It does not dispatch console reward commands, confirm purchases, toggle selling, register camps, or claim rewards. Actual actions retain their existing authoritative checks and durable transaction handling.
- Reward delivery guards have a separate **read-only preview**. AutoSell can explain that selling must be paused before an external reward, without pausing it. A guard without a preview fails closed for readiness; its potentially mutating delivery method is never called by guidance.
- A failed or disabled provider contributes no cards; healthy providers continue working. Provider errors go to the server log, not into player-facing messages.

## Configuration and extension

The Shared Library owns `/next` and the default-true permission **`onembcmi.global.next`**. Each provider additionally checks its normal `.use` permission and active feature state. Per-feature next commands use the feature permission; they do not require global hub access. The core setting **`next.enabled`** defaults to true and controls both surfaces. Core `next.*` translation keys provide the shared labels; feature descriptions retain their own language.

Menu settings **`buttons.next.enabled`** and **`buttons.next.auto-add-to-order`** default to true. The latter inserts the button first when an older `buttons.order` does not mention it. Existing explicit positions and ordering entries remain authoritative. Its default permission is `onembcmi.global.next`. Owners can reposition, customize, or disable it using the regular Menu configuration.

A Feature Plugin opts into `supportsNextSteps()` and implements `nextSteps(Player)`. The shared lifecycle registers and removes its provider, routes `/plugin next`, adds help and tab completion, and records recent explicit interest. A `NextStep` contains a stable id, choice kind, priority, Action Card, item icon, open label, and existing read-only destination. Use `NextSelection.shortlist` to retain variety in larger lists. Use `nextRewardStep` for rewards that need shared delivery safety checks. An optional `openNextStep` override can open a specific details page without adding a new mutation command.

For the focused welcome, `.forWelcome(true)` explicitly marks a `CONTINUE` card as verified ongoing or paused progress. Existing constructors default to no opt-in. Introductory options, purchasable trades and merely available actions do not belong in a return welcome. `/next welcome` shows the current compact summary in chat when requested, even with optional hints Off.

Providers execute synchronously on Paper's main thread. They must use cached data and bounded, nonblocking reads. They must not save, query databases, call remote services, load chunks, mutate progress, assign goals, or perform business actions. Reuse existing prerequisite and progress functions, adding a read-only variant when an existing reader changes state. Provider snapshots are presentation, never authority to pay or consume items.

Paper API verification used the live [PaperMC LLM index](https://docs.papermc.io/llms.txt), official [plugin.yml command documentation](https://docs.papermc.io/paper/dev/plugin-yml/) and [custom inventory-holder guidance](https://docs.papermc.io/paper/dev/custom-inventory-holder/), plus [PluginCommand](https://jd.papermc.io/paper/26.2/org/bukkit/command/PluginCommand.html) and [InventoryClickEvent](https://jd.papermc.io/paper/26.2/org/bukkit/event/inventory/InventoryClickEvent.html) for the exact Paper 26.2 build 121 API.

## Verification

Focused tests cover selection priority, diversity, alternatives, empty states, destination validation, and read-only reward safety. The test-only `nextProbeJar` exercises real Paper command ownership, menu routing, all four providers, private snapshots, and GUI/session failure paths using synthetic players, private persistence, and a simulated camp. It never belongs in the managed distributable set.

Final canonical build **610** passed **1,170 tests** (zero failures/errors, one skipped) and synchronized the complete **64-JAR** set. The exact Paper 26.2 build 121 runtime passed **80 checks**, including public per-feature commands with optional hints Off, global text and GUI routes, menu navigation, expired/private shortcuts, provider failure, and stale or invalid inventory actions. All 64 artifact hashes matched before and after the run. The server stopped cleanly and the temporary probe was removed. Local evidence is in `.scratch/communication/verification-610/`. Earlier build 608 passed 65 runtime checks; build 609 was an intermediate full build, before the final empty-label polish in the text view. The public documentation synchronization check still reports pre-existing mirror drift plus the new guide; that separate repository was not edited or published. Real-client layout, chat navigation, and gameplay acceptance remain on the [next-step checklist](../checklist.md#dynamic-next-steps-and-global-hub-comm-01comm-02).

## VoteTokens progression preview

VoteTokens also provides an on-demand path suggestion through `/next` and `/votetokens next`. It requires vote use and progress access and opens `/votetokens path`; profile reads happen only when the player requests the path. This provider does not add vote focus goals or a first-success checklist. JourneyMap’s browse suggestion opens its matching `/journeymap path`. See [Progression previews](progression-previews.md).

## KitStreaks

KitStreaks joins `/next` and `/kitstreak next` with one due track, or an on-demand guide suggestion when appropriate. It opens `/kitstreak guide` without claiming a kit or reward. It uses cached state and current qualifying-kit availability; new profile reads occur through the guide or silent background prefetch. See [Streak guidance](streak-guidance.md).

## Collect community goal

Collect offers `/collect next` and one active community path in `/next`. Started contributions can be a continuation or focused welcome; newcomers can browse the goal without being described as returning contributors. Reached goals are never offered as unfinished work or ready reward claims. Providers use the background-loaded saved-score index and current event/permission/world checks. See [Community contribution](community-contribution.md).
