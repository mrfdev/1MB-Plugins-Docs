# Complete reward communication (COMM-08)

Issue [#39](https://github.com/mrfdev/1MB-Library/issues/39) implements the fourth communication milestone. This is a shared presentation standard plus the first adoption across AutoSell, JourneyMap, Forage, and Passport Discovery. It does not claim that every reward message in all 64 Feature Plugins has been migrated.

## What players should understand

Every adopted reward flow explains its current state, the actual benefit or result, and one useful next step. The Feature Plugin keeps its own prefix and identity.

| State | Meaning | Example |
| --- | --- | --- |
| Milestone earned | Progress or a badge has been recorded; this does not promise an item | `First Day earned. Your badge is saved on your journey.` |
| Reward ready | The goal is complete and a claim is available | `Your quest reward is ready: 2 broker points. Review the reward before its period resets.` |
| Reward received | The feature verified and recorded its own payout | `+5 broker points saved; +1% selling bonus today. [View cap upgrades]` |
| Reward request recorded | A server reward request was accepted; the external provider's delivery is not verified | `Requested: Explorer Box. Delivery is not confirmed here. Check the reward, or share this reference with staff.` |
| Completion saved | The completion or earlier claim is recorded; there may be no separate payout | `You already collected this quest reward for this period. [View quests] [View request]` |
| Waiting for review | Some steps may have happened, or the record cannot be trusted | Existing COMM-05 recovery explains the uncertainty and how to share the private reference. |

An accepted console command is never proof that an item, money, permission, or key reached the player. Even a finalized command receipt cannot establish the external provider's delivery. The request message distinguishes confirmed internal changes from that requested reward. It does not silently resend anything.

## Shared implementation

`RewardMessage` is an immutable presentation value in the Shared Library. It uses literal Adventure text, localized state/next/action labels, two chat lines, and at most two deliberate navigation/copy actions. Every navigation button prints its command for clients without clickable chat. Reward names or descriptions cannot inject MiniMessage click actions.

`RewardMessage.settled` derives the state from the confirmed and requested portions. A nonempty requested portion always produces **Reward request recorded**, even when there are also confirmed internal benefits. With neither portion, the result only confirms completion.

Feature Plugins call `featureReward` after their existing persistence, delivery, and finalization gates succeed. The helper performs no payout, command dispatch, state transition, scheduling, or retry. Failed or uncertain operations continue through `featureBlocked` / `featureNeedsReview` from COMM-05.

Necessary claim results bypass optional `/guidance` limits and remain visible with guidance Off. Optional AutoSell ready hints and JourneyMap join milestone hints use the shared guidance budget and quiet preferences. Forage and Passport retain their existing batched activity summaries; this milestone improves their content without introducing another welcome stream. Broad activity-notification migration remains separate adoption work.

## Adopted flows

### AutoSell quests and one-time milestones

- A successful sale combines automatic quest and milestone outcomes. Claim All combines successful claims into one receipt and stops at the first failed reward. Manual single claims produce the same result.
- Confirmed broker points and the **actual bonus increase** are shown, with a notice when a cap limits the configured bonus. A lower quest or milestone bonus ceiling no longer reduces a bonus earned earlier.
- Broker-point rewards offer `/autosell caps` only while cap upgrades are enabled, configured, and accessible. Bonus rewards explain eligible sales, the selling cap, and the midnight Europe/Amsterdam reset. Other outcomes offer the goal menu.
- Configured external rewards use `quests.definitions.<id>.reward-description` or `milestones.definitions.<id>.reward-description`. With no description, the result says “additional server reward”; it never guesses by parsing commands. Disabled command rewards are omitted from action-card offers.
- Claim results do not also produce a generic “claimed” reply or reopen a GUI over the receipt. The message provides navigation. Completed detail pages also offer **View reward request**.
- Duplicate quest claims explicitly say that the period's claim is already recorded. Claim-period and durable transaction identities are unchanged.
- Bulk output counts only completed claims. A waiting request or stopped remainder directs the player to recovery before another claim. Each claim rechecks current access and enabled state.
- Existing `quests.notify` and `milestones.notify` settings control one short completion sound per batch. AutoSell quiet mode and RecordingMode suppress it. Necessary text remains visible; repeated full-screen reward titles are removed.
- Ready hints include the actual offer and the need to collect before the quest's period resets. `/autosell quests` retains the precise schedule and requirement details.

### JourneyMap milestones

- Milestones are saved before announcing an earned badge or starting a reward. A failed progress save does not announce that the new milestone is recorded.
- `/journeymap`, `status`, `milestones`, and `rewards` can refresh progress but **never claim rewards**. Automatic claiming runs from the join refresh. A blocked automatic reward remains available for a later join or explicit claim.
- `/journeymap claim <id|all>` is the deliberate collection action. Bulk requests have one combined outcome, and a failed request stops the batch. Each reward rechecks current configuration, earned state, and access.
- The reward list replaces command counts with player descriptions and distinguishes locked, badge-only, paused, ready, already requested, and waiting-for-review states.
- Optional `rewards.descriptions.<milestone-id>` values name the configured reward in plain language. Existing milestone list syntax remains compatible.
- `/journeymap review [reference]` provides the same private, read-only receipt access as Forage and Passport. Players retain access to their own receipt after losing gameplay access, and cannot use this command to retry a reward or inspect somebody else's reference.
- Optional join milestone notices share `/guidance` policy. Claims still report their outcome when optional join notices are disabled. This adds no general welcome message.

### Forage quests and treasure

- Ready quest updates name the actual rolled offer, explain the Complete Camp requirement when enabled, and tell players to claim before the daily, weekly, or monthly quest resets.
- Successful quest results distinguish saved Forage points/XP and confirmed economy deposits from requested command rewards. Forage points lead to the tool menu at a Complete Camp; external rewards lead to the receipt. The claim result remains visible rather than reopening the quest inventory.
- Optional `quests.<period>.<id>.reward-description` in `quests.yml` describes extra command rewards. No description invents delivery evidence.
- Treasure feedback reports its amount and whether it entered the inventory, dropped at the player's feet, or split between the two. Dropped treasure has an immediate pickup instruction; inventory-only treasure remains in the existing activity batch.
- Cancelled or otherwise invalid item spawns never produce a successful treasure receipt. The exact payload and partial transaction stay available for staff review.
- Existing transactions, provenance tags, reward amounts, camp ownership, and release gate remain authoritative. Forage's deferred live release is not changed by this work.

### Passport Discovery categories and stamp boxes

- A newly completed category explains how many stamps now contribute eligible credits and how many credits remain after earlier trades. Partial categories never become spendable credits merely because they contain stamps.
- The completion explanation uses the existing stamp batch, replacing its generic notification for that batch. Players can still use `/passport recent` for the individual discoveries. Existing new-stamp and batch Off preferences remain effective.
- Paused trading directs players to another category. Enabled trading directs them to box costs without executing a trade.
- Stamp-box results confirm the credits spent, remaining credits, and preserved collection. The box itself remains a **requested** external reward until separately verified.
- `/passport stamps` shows truthful trade states and saved references, including unresolved records ahead of a persisted claim marker. A failed discovery save does not announce a saved category reward.

## Adoption boundary across the suite

The Shared Library now supplies the standard to every Feature Plugin. These are the specifically migrated flows, rather than a claim that all reward-bearing plugins have identical transaction semantics:

| Area | Further adoption candidates |
| --- | --- |
| Other AutoSell progression | Broker-level activity summaries and cap-purchase follow-up; sales already have their own payout feedback |
| Streak and loyalty rewards | KitStreaks, SellStreaks, Visit, Refer, BirthdayLanterns, NameMC |
| Earn/spend shops and collections | VoteTokens, Collect, AFKShrine, Spawners, Exchange, Coconut/Doors progression |
| Other reward providers | DiscordChat-linked rewards and other optional provider-specific flows |
| Other Forage transformations | Shop purchases, composting, crafting, upgrades, Community Effort progression |

Adopt each flow only after identifying its real readiness state, authority for delivery, recovery route, reward location, and useful next action. Shared operation finalization must not broadcast a generic “received” message: some operations are trades, administrative repairs, or external command requests. No migration enables a disabled reward or changes its price, identity, claim period, or manual/automatic policy merely to fit the presentation.

## Verification

Canonical build **607** passed the complete suite: **1,155 tests**, zero failures/errors, one existing skip. All **64 managed JARs** match the tested artifacts. The maintained Paper 26.2 build 121 server passed **52 reward checks** and **44 action-card checks**, then stopped cleanly. Automated evidence is recorded in `.scratch/communication/verification-607/`. Unit tests cover literal text and accessible actions, delivery evidence, combined rewards, bonus ceilings, disabled follow-ups, treasure locations, credit accounting language, and JourneyMap state precedence.

The test-only RewardProbe uses synthetic players, separate temporary player stores and transaction journals, and a no-op external command. It exercises real AutoSell and Passport claims, failure and duplicate paths, JourneyMap manual/automatic behavior, the shared result rendering, and real Paper item-spawn acceptance/cancellation using temporary tagged dirt that is removed immediately. It is excluded from the 64 managed JARs and removed after verification. Real-client GUI readability, sound, physical item pickup, and provider-specific delivery remain explicit gameplay acceptance in `checklist.md`.

Paper API discovery used the live [Paper documentation index](https://docs.papermc.io/llms.txt), [Adventure text documentation](https://docs.papermc.io/adventure/text/), and Paper 26.2 build 121 Javadocs for [Bukkit command dispatch](https://jd.papermc.io/paper/26.2/org/bukkit/Bukkit.html) and [inventory click constraints](https://jd.papermc.io/paper/26.2/org/bukkit/event/inventory/InventoryClickEvent.html). Reward navigation keeps the existing deferred GUI action handling.
