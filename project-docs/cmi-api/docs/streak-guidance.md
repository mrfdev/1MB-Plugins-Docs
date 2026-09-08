# Reassuring streak guidance

KitStreaks now answers three questions: **what counts, when the next streak day is open, and what stays earned**. Open `/kitstreak guide`, choose a track through `/kitstreak tracks`, or use `/kitstreak next` and the global `/next` hub. `/kitstreak guide daily chat` and `/kitstreak status daily` give the same guidance in chat.

## Your next step

The guide uses the shared **Now / Next / Later** presentation. It shows the current streak, next unearned milestone, one later milestone and retained achievements. Controls lead to qualifying CMI kits, the calendar, reward review, other tracks and a chat view. Browsing never claims a kit, spends anything, claims a reward or resets a streak.

For example, after a qualifying claim: **“Day 6 secured in Daily Kit Path. Your next qualifying day reaches the 7-day milestone. [Calendar]”** A kit that advances several tracks produces one acknowledgement. Repeated claims on the same date do not keep repeating it.

**Check qualifying kits** opens CMI's kit selection. The guide discovers enabled kits from the live CMI catalog, applies KitStreaks' tracked/ignored filters and track selectors, and checks CMI kit access. CMI's kit module and kit-command access must also be available. Kit names are suggestions to review: CMI still decides cooldowns, costs, conditions, usage limits, inventory space and final claim eligibility. The preview does not claim that a kit is free or immediately claimable.

Tracks with no qualifying kit available explain that state and do not supply a due reminder. A missing or disabled kit does not grant extra grace or pause the calendar rules. `kit:<name>` views show per-kit history; the configured tracks hold milestone rewards.

## Streak days and grace

| State | What the guide means |
| --- | --- |
| Ready when you are | No claim date is recorded. Your first qualifying claim starts day 1; there is no deadline to begin. |
| Today is secured | A qualifying claim is already recorded for this calendar date. The next streak day opens at the next local midnight. |
| Your next streak day is due | The last qualifying date was yesterday. Review a qualifying kit and the displayed closing boundary. |
| Your grace window is open | An extra allowed date is in use. The guide shows the actual final boundary for continuing. |
| You can start again | The continuation window has ended. A new claim starts day 1 when you choose; bests and earned milestones remain. |
| Your claim date needs checking | A malformed or future saved date prevents a reliable countdown. Ask staff to check it; the guide does not invent a safe day. |

The configured `time.zone` determines the calendar. Times include a weekday, date and time-zone abbreviation. **Before** a displayed boundary is exclusive: at that midnight the new date's rules apply. A streak day can be 23 or 25 hours around daylight-saving changes. This window is separate from a CMI kit cooldown.

`streak.max-gap-days` is the maximum gap **between qualifying dates**. It is not the number of extra missed days:

- `1`: consecutive dates, with no extra missed day.
- `3`: two extra missed dates are allowed. After a Monday claim, a Thursday claim can continue the run; Friday's midnight is too late.

The existing streak calculation advances at most once per calendar date, including with the legacy `tracking.one-streak-step-per-day` flag off. The guidance describes that actual behavior. It does not change progression rules, CMI kit rules or reward transaction identities.

## Lasting achievements and rewards

A missed day never erases a personal best or an earned milestone. A guide can show **current: 0**, **best: 14**, and **next unearned milestone: 28** while keeping the saved previous-run value intact until the next real claim. Earned milestones remain visible in the guide and calendar, including recorded milestones removed from the current configuration.

Reward previews distinguish a saved milestone, no separate payout, disabled payouts, and configured rewards. Optional human descriptions use the `rewards.descriptions` list, with entries such as `daily|7|A bonus supply bundle`; keep them aligned with the corresponding reward commands. When no description exists, the guide does not guess an amount. Reward review labels an existing claim reservation as **already requested** and directs missing delivery to staff. The existing deliberate claim and durable delivery workflow remains responsible for rewards.

## One optional reminder

`guidance.reminders-enabled: true` allows KitStreaks to offer one due reminder across eligible tracks. It selects the earliest closing window, with the default track preferred when windows tie. New, secured, missed, unknown-date and unavailable paths do not trigger reminders. There is no missed-day nag or per-track login message.

The reminder uses the shared `/guidance` service: Normal/Fewer spacing, Off, Later, Hide, channel choice and RecordingMode quiet controls all apply. Shared saved delivery history and the current runtime's remembered date suppress repeat reminders for that calendar date; reconnecting or reloading does not intentionally reset that history. Queued reminders recheck the date, track, claim state, permissions, feature availability and configuration before delivery. A claim that secures the day invalidates an old queued reminder.

The due hint appears as **A kit streak day is due** in guidance controls. Its stable key is `kitstreaks:due`. Requested guide/status replies and acknowledgement of a recorded claim remain available with optional hints off.

## Availability and storage

Dormant, disabled or invalid KitStreaks cannot contribute actionable guidance. Debug does not bypass those gates. New guidance profile reads use a bounded background worker; rendering and CMI/player checks stay on the server thread. A newer cached claim or staff edit takes precedence over a background read. Closed/replaced views, quit/reconnect and lifecycle changes invalidate stale callbacks.

An unreadable profile gives a retry/help message instead of an invented zero streak. Failed claim persistence suppresses the secured acknowledgement and further guidance until a successful save. Existing gameplay and reward persistence keep their established behavior; no new reward or claim is performed by a preview or reminder.

This is the KitStreaks adoption of COMM-09. Other streak features can adopt the same calendar and shared reminder pattern after their own qualifying-action rules are reviewed.

Tracking: [issue #45](https://github.com/mrfdev/1MB-Library/issues/45). Local verification and real-client acceptance are recorded in [the checklist](../checklist.md#streak-guidance-comm-09-order-10).
