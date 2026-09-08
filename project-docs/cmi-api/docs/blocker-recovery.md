# Blocker recovery messages

COMM-05, third in the communication roadmap. Implementation is tracked in [issue #38](https://github.com/mrfdev/1MB-Library/issues/38).

When an action stops, the player should see **what stopped, why, and the next useful action**. Recovery uses the Feature Plugin's prefix, plain language, a visible **Next** line, and up to two relevant controls. Commands are printed beside navigation buttons for clients that cannot click them. A blocker does not produce a title, sound, welcome message, or automatic retry.

## Player examples

| Situation | Recovery |
| --- | --- |
| Incomplete Forage Camp | “Your Forage camp is not ready. Campfire nearby is missing. Next: finish this requirement at your camp anchor. [Camp guide] /forage guide” |
| Forage family allowance exhausted | Explain the exhausted allowance and the midnight reset. Suggest another carried tool only if its family has allowance, the tool is usable, and the current world, protected-area and local exhaustion checks permit that route. |
| Total Forage allowance exhausted | Explain that switching tools cannot restore the total allowance. Suggest storing finds or working on the camp until midnight in Europe/Amsterdam. |
| Local Forage exhaustion | Show remaining seconds and explain that another allowed 16 by 16 block area may be used; daily allowances still apply. |
| Protected or worn Forage tool | Explain why the normal repair/enchant route cannot work and point to Repair & Merge or Tool Upgrades at a complete camp. |
| Changed ingredients or full inventory | Ask the player to review their actual inventory and current costs, make room where necessary, and deliberately confirm again. |
| AutoSell waiting | Preview explains the first current blocker: access, saved request, payment service, off state, world/mode/menu, movement, cooldown, daily allowance, near-full mode, filters, or minimum batch value. |
| AutoSell excluded items | Readable reasons such as “Special items kept safe” replace internal maps. Advice preserves special items; it never asks players to strip names, lore or metadata. |
| Passport collection paused | Explain the allowed game modes or which control needs disabling. Flight guidance explains that landing can leave flight enabled. Existing stamps are kept. |
| Passport credits missing | Show exactly how many more credits the box needs and explain that a whole completed category contributes spendable credits. |
| Uncertain reward or payment | Explain that some steps may already have happened. Provide the player's saved reference and ask them to share it with staff before retrying or repeating a goal. |

The examples describe the pattern; actual names, quantities, limits and conditions come from the running feature. A recovery button opens a view. It does not execute a purchase, claim, toggle, staff command, or recovery retry.

## Request status

Forage and Passport use the shared, read-only commands:

- `/forage review` and `/passport review`: the player's waiting requests, three per page.
- `/forage review page <number>` and `/passport review page <number>`: further pages.
- `/forage review <reference>` and `/passport review <reference>`: an owned saved request, including closed requests.

AutoSell retains `/autosell review [reference]` and its detailed copyable support report. Forage and Passport provide **Copy reference**. Copying puts text on the player's clipboard; it sends nothing to staff automatically. The UUID remains visible when copying is unavailable.

These views do not expose another player's records, raw stored commands, internal errors or transaction history. They remain available while a loaded feature's gameplay is dormant and do not require its gameplay permission, so losing access does not prevent a player from checking their own prior request. Staff inspection and reconciliation remain behind the existing admin permissions.

Messages distinguish requests waiting for staff from records marked complete, refunded or rolled back. An unavailable journal overrides any cached success status. A command accepted by its provider is not treated as proof that a reward reached the player. Reading a reference never changes its state, spends credits, grants rewards or retries commands.

## Quiet behavior

Explicit command replies, GUI failures and uncertain reward outcomes bypass optional `/guidance` preferences. They remain visible with hints Off or RecordingMode quiet settings. Repeated gameplay blockers in these integrations share a separate budget of **one notice per player per 30 seconds across the suite**. They are not queued, so walking away does not produce delayed warnings. No new login summary is introduced.

Forage leaves recovery chat visible after blocked camp operations instead of immediately reopening a failing purchase page. Workstation event feedback only sends chat; it does not close an inventory inside an inventory click event. Existing shared GUI callbacks retain their deferred execution and action-time checks.

## Shared implementation and coverage

`RecoveryMessage` is an immutable presentation value with required title, reason and next step. `Action.view` accepts a single command; callers must choose a read-only route whose handler revalidates state and ownership. `Action.copy` copies support text. All supplied text is rendered as literal Adventure components, so item names and report values cannot inject MiniMessage click actions. Shared labels are `recovery.next`, `recovery.open` and `recovery.copy` in each feature's translations. The shared permission response uses `missing-permission-player`; `missing-permission` remains the console response.

`AbstractCmiApiFeaturePlugin` supplies direct recovery, repeated gameplay feedback and optional owned-request review. Its common reward-safety boundary now supplies recovery instructions to all consumers. Forage, AutoSell and Passport contain the detailed feature-specific integrations. Other bespoke errors and custom menus in the remaining Feature Plugins can adopt the pattern incrementally; they are not all migrated by this milestone.

The Forage plan adapter uses its existing ordered `missing:`/`ok:` rows. It presents the first missing requirement, keeps the full checklist in the relevant menu, and distinguishes staff problems, timers, maximum upgrades, levels and points. It does not infer reward eligibility from display names or lore.

AutoSell also corrects the zero-allowance boundary in its preview builder: a finite exhausted allowance admits zero items, including when building a sale for automatic execution. The same bound is used for positive remaining amounts; inventory, payment and durable transaction safeguards continue to apply.

## Verification

Canonical build **603** passed the full suite with **1,143 tests** (zero failures/errors, one skipped) and synchronized all **64 JARs**. Paper 26.2 build 121 passed **40 recovery checks** and **44 menu regression checks**. Both probes were removed after clean shutdown; the complete artifact set was byte-verified before and after runtime testing.

Focused tests cover literal chat text and command restrictions, shared repeat timing, receipt ownership and uncertain/terminal states, exhausted and partial AutoSell allowances, usable Forage alternatives, ordered requirements, and Passport recovery/credit rules.

The test-only `recoveryProbeJar` runs on Paper with synthetic players and in-memory receipts. It exercises actual command gateways, muted guidance, cross-feature repeat limits, AutoSell previews without selling, Passport pause/permission feedback, private and dormant request views, and Forage unavailable-data recovery. It never runs a successful payout path and is excluded from the managed release artifacts.

Use the [COMM-05 client checklist](../checklist.md#blocker-recovery-checks-comm-05) for real-client readability, navigation and gameplay acceptance. Forage's existing test-candidate release gate still applies.

API references checked for Paper 26.2 build 121: [live documentation index](https://docs.papermc.io/llms.txt), [Adventure chat components](https://docs.papermc.io/adventure/text/), [scheduler rules](https://docs.papermc.io/paper/dev/scheduler/), and [InventoryClickEvent](https://jd.papermc.io/paper/26.2/org/bukkit/event/inventory/InventoryClickEvent.html).
