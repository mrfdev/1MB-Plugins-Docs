# Action cards and tooltips

Action cards answer four questions in the same order: **Where am I? What remains? What do I gain? What should I do next?** AutoSell and PassportDiscovery are the first connected features. They retain their own names, icons, commands, and rewards.

## AutoSell: choose a goal, then review its details

Open **`/autosell quests gui`** or **`/autosell milestones`**. Hover a goal to see **State**, **Remaining**, **Benefit**, and **Next**. A ready reward says **Ready to claim** and glints. **Reward collected**, **Staff help needed**, **Refunded**, and **Paused** are separate states.

For example, a mining quest might show:

```text
State: In progress
Remaining: Sell 20 more eligible items.
Benefit: 2 broker points; up to +0.5% daily bonus
Next: AutoSell eligible items in this daily period.

Click for details and actions.
```

Clicking a goal opens its details. **Goal and rules** explains what qualifies, **Your reward** explains the payoff, and **Progress and schedule** shows the full counts and quest reset rules. Milestones have a **Your progress** item instead of a quest schedule. **Back** returns to the board page you came from.

Use the separate **Claim reward** button when ready. A claim rechecks the current goal, quest period, access, and reward status. If the goal changed while you were reading, the menu refreshes for review. If a claim needs your attention, the menu closes so you can read its existing explanation and action buttons in chat. Confirmed claims show **Reward collected**. The board's explicit bulk-claim buttons remain available.

AutoSell being off pauses guidance for unfinished selling goals while earned rewards remain visible. **Open AutoSell** leads to your selling, category, and filter settings. **View request status** opens the appropriate reward reference or current blocking request. Selecting the player head shows full statistics in chat; its tooltip now gives a short selling summary.

Single-batch and chain goals describe the whole attempt required. A best batch of 80 items toward a 100-item target reads **“One batch of 100 items (best: 80)”**. Selling 20 items in a separate batch would not finish that goal. Streak goals similarly name the required streak length. Daily bonuses remain subject to the existing shared cap and reset each server day, even when earned from a weekly quest or a one-time milestone.

## Passport: make the next discovery clear

Use **`/passport status`** to choose a category, or **`/passport status biome`** to open its card directly. The card shows remaining stamps and a useful next step, with **Missing stamps**, **Collected stamps**, and **Statistics** buttons. An empty category is **Unavailable**, rather than incorrectly celebrated as complete.

Both collected and missing stamp lists have hover cards and visible **Details** buttons. **`/passport info <type> <entry>`** shows the same guidance plus the existing full entry details. A missing biome tells you to walk into that biome; a missing armor stamp tells you to equip that armor. Full entry IDs and historical timestamps stay in the requested detail view.

Existing partial stamps use their saved progress goal. An unstarted stamp in complex mode explains that the first action reveals its goal and shows the configured range; viewing the card does not assign a random goal. Sustained exploration activities do not expose an invented countdown. Disabled categories, removed warps, and collection paused by gameplay settings show their current limitation. Collected stamps remain acknowledged while collection is paused.

When stamp trades are enabled, the category card explains the credits contributed by completing the whole eligible category. Those credits are subject to the existing wallet and spending rules. Individual stamp cards describe collection progress without promising a separate item reward.

## Server configuration and extension

The shared `action-card.*` labels are included in the normal AutoSell and PassportDiscovery translations. Existing configured goal titles and descriptions remain in use. The standard field order and text wrapping come from the Shared Library's `ActionCard` presentation.

AutoSell supports an optional plain-text `reward-description` next to each quest or milestone definition. This describes additional rewards delivered by that goal's commands. For example:

```yaml
quests:
  definitions:
    daily_miner:
      reward-description: "$500 bonus"
```

Keep this description accurate when changing the underlying commands. A blank description displays **extra server reward**; the interface does not guess the meaning or result of arbitrary commands. Broker points and daily bonus amounts are still shown separately. This property changes presentation only.

Other features can construct an `ActionCard` from their current authoritative state, use its wrapped lore or chat tooltip, and supply their own details and actions. A card is a presentation snapshot, never permission to claim or purchase. Recheck the player's current access, enabled state, objective definition, period, and reward state when an action runs. Keep click and drag handling inside the shared GUI session guards. Long display titles are shortened; the complete title remains in details and chat tooltips.

## Verification and rollout

This implements the first integrations for [COMM-04](../todo.communication.md#comm-04-action-first-status-cards-and-tooltips), tracked in [issue #37](https://github.com/mrfdev/1MB-Library/issues/37). It affects requested menus and tooltips; the existing [optional guidance controls](player-guidance.md) continue to coordinate proactive hints.

On 2026-09-06, canonical build **597** passed the suite build and tests and synchronized all **64 managed JARs**. JUnit reports contained **950 tests**, zero failures/errors, and one skipped test. The maintained Paper **26.2 stable build 121** / Java **25.0.4** runtime passed **44 action-card checks** and stopped cleanly. The probe was removed afterward; DiscordSRV was absent throughout this test run. Real-client readability and actual reward-collection gameplay still require the acceptance checklist. The read-only public documentation check reports drift; repository documentation is updated, while public publication remains pending.

`ActionCardTest`, `AutoSellActionCardsTest`, and `PassportActionCardsTest` cover explicit labels, translated fields, wrapping without losing quantities, cumulative versus single-attempt work, reward states, unknown random goals, paused collection, and empty categories. The test-only `:libs:1mb-cmiapi-lib:actionCardProbeJar` exercises the actual feature menus and commands on Paper with synthetic players. It must be removed after the test server stops and is excluded from the 64 managed JARs.

The implementation uses the exact target's [Paper inventory click contract](https://jd.papermc.io/paper/26.2/org/bukkit/event/inventory/InventoryClickEvent.html) and [item metadata API](https://jd.papermc.io/paper/26.2/org/bukkit/inventory/meta/ItemMeta.html). Follow the [action-card acceptance checklist](../checklist.md#action-card-checks-comm-04) for real-client readability and gameplay. Actual payouts remain covered by the existing reward workflow and its separate acceptance checks.
