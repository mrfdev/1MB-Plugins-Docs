# Appreciation

Appreciation lets players send a limited, reviewed thank-you to another online player. A note may be free or include vanilla experience, money, or one exact offhand stack, and the recipient claims it later from a durable inbox.

Player-facing chat uses the shared `[☻ Appreciation]` prefix. Its symbol is configured centrally through `locale.prefix-unicodes.appreciation` in `plugins/1MB-CMIAPI/CMIAPILIB/config.yml`.

Recipients control which new gifts and notifications they accept, while already-funded gifts remain claimable regardless of later preference or staff changes.

The optional `/thanks` command opens the same feature. It is registered through Paper's lifecycle command API and can be disabled in `config.yml` if another plugin needs that command; changing alias ownership requires a clean server restart.

The feature installs dormant with `enabled: false`. Paper keeps the plugin loaded and green in `/plugins`, while gameplay listeners, menus, notifications, placeholders, and storage work remain inactive until staff run `/appreciate debug enable true` or enable it in configuration.

## How Players Use It

Available features include:

### Player Experience

- a hardened light-blue Player Appreciation GUI listing eligible online players
- seven free reasons, including Birthday Appreciation, each with a small randomized wording variation
- optional free, vanilla experience, money, or exact offhand-item gifts that cannot cross game-world groups
- a limit of 3 appreciations per day and 9 per week, with the same player limited to once per day
- an explicit confirmation page showing the recipient, reason, gift, fee, and remaining allowance
- a paid anonymous option that shows the sender as Anonymous to the recipient
- a durable received inbox with individual claims, Claim All, and safe returns after 60 unclaimed days
- one free visual-and-sound thank-you reaction after a completed or expired appreciation; it creates no new appreciation or item and uses no money, gifts, points, or sending quota
- server-side GUI action rate limits and a one-second refresh throttle that survive page reconstruction
- recent sent and received notes, plus recipient-controlled notable favorites
- personal statistics and public selected-badge review through `/appreciate stats [player]`
- an earned and purchased badge collection with one selected public badge
- Appreciation-only titles shown inside this feature
- selectable particle-and-sound celebration styles
- accessibility preferences for chat, toast, mail, join reminders, sounds, particles, and nearby shared celebrations
- a point shop for permanent reason pairs, styles, titles, and badges
- one Appreciation point for every qualifying seven-day sending streak block
- clickable CMI messages, a gentle CMI toast, and CMI mail that identifies the public sender plus receipt reference, with join reminders for waiting claims
- PlaceholderAPI values for inbox, quota, streak, points, selections, and statistics

Start with:

```text
/appreciate
```

The index shows only online recipients who currently have `onembcmi.appreciation.use` (or the Appreciation admin parent). It does not permit self-appreciation. Recipient access is checked again on every page and immediately before escrow funding, so removing the permission during an open GUI safely cancels the new send before anything is taken. Click a player, choose a reason, choose a gift, decide whether the note is named or anonymous, review the final summary, and confirm.

`onembcmi.appreciation.use` defaults false. This makes a live beta opt-in: grant it only to the staff, tester, or patron groups participating in the rollout. The claim permission remains independent so an already-funded gift is not trapped if either participant later leaves the beta group.

`/thanks` is a configurable short alias for the same menu.

## Sending Limits

The production defaults use the `Europe/Amsterdam` timezone:

- no more than 3 funded appreciations per day
- no more than 9 funded appreciations per Monday-through-Sunday week
- the same recipient no more than once per day
- the same recipient no more than twice per week
- at least 2 hours between funded sends

Only successfully funded appreciations consume these limits. A cancelled, rejected, unfunded, or fully refunded transaction does not consume a slot. Debug quota bypass is available only while `debug.enabled` and `debug.bypass-quotas` are both true; it never bypasses identity, storage, payment, item, world-scope, inventory, AutoSell, or transaction checks.

## Reasons And Gifts

The free base reasons are:

- Thanks for Helping
- Great Teamwork
- Amazing Build
- Thanks for Being Kind
- You Made Me Laugh
- Welcome to the Community
- Birthday Appreciation

Each reason is separate from the gift. Players can therefore send the same kind of compliment as a free note, with XP, with money, or with an item. Birthday Appreciation is a normal base reason, not a date-rotation promotion, so staff can leave it available throughout the year or disable it through configuration.

Default selectable gifts are:

| Gift | Defaults | Safety behavior |
| --- | --- | --- |
| Free | No cost | Sends the note without an economic gift. |
| Vanilla XP | 25, 100, or 250 XP | Uses raw vanilla experience points, not levels. The sender must have the exact amount at confirmation. |
| Vault money | $1,000, $5,000, or $10,000 | Requires a working Vault economy provider and sufficient combined funds. |
| Offhand item | The exact complete offhand stack | Preserves names, lore, enchantments, PDC, data components, container contents, and third-party metadata. |

Staff can add or remove XP and money presets in-game within configured maximums. Item gifts deliberately use the complete offhand stack so the sender sees exactly what will leave their inventory.

Anonymous sending is optional and costs an additional `$5,000` by default. If a money gift is also selected, the sender must afford the money gift and anonymous fee together. The recipient sees `Anonymous`; staff inspection retains the real sender UUID and name.

## Preferences And Gift Availability

```text
/appreciate settings
```

Each player can accept or decline new XP, money, item, and anonymous appreciations. A one-click Notes Only option declines all three economic gift types while keeping kind words available. Players can also independently control normal chat notices, CMI toasts, CMI mail, join reminders, particles, sounds, and nearby shared celebrations.

These choices affect new sends only. Staff have matching switches for pausing new XP, money, item, or anonymous sends server-wide. Neither type of switch invalidates an existing receipt: anything already funded remains visible and claimable under its original rules.

## Item World Safety

Item gifts cannot be used as a shortcut between separate game modes. Both players must be online, in Survival mode, and in the same configured inventory scope when the sender confirms. The recipient can claim the item only from that original scope.

Default scopes are:

| Scope | Worlds |
| --- | --- |
| Survival | `general`, `wild`, `nether`, `end`, `world`, `world_nether`, `world_the_end` |
| OneBlock | `oneblock` |
| SkyBlock | `skyblock` |
| Acid | `acid` |
| Cave | `cave` |
| SkyGrid | `skygrid` |
| ChunkBlock | `chunkblock` |

Unknown, lobby, temporary, event, Creative, and Spectator contexts fail closed for item gifts until staff deliberately map them. Unsafe technical materials such as command blocks, barriers, bedrock, structure blocks, and debug sticks are blocked by default.

## Receiving And Claiming

```text
/appreciate received
```

The received page shows claimable notes, their gift type, expiration time, and the exact world group required for an item claim. A recipient may claim one entry or use Claim All; Claim All still validates and finalizes each receipt independently.

Claims recheck the recipient, permission, durable state, exact item hash, original world scope, game mode, inventory capacity, economy hook, and AutoSell state at action time. If AutoSell is active for an item gift, the claim remains waiting and tells the player to turn AutoSell off first. A full inventory also leaves the item safely pending instead of dropping it or treating it as delivered.

Received notes may be marked notable from the recent page. Notable status is recipient-controlled and appears in `/appreciate favorites`.

After a claim, the recipient may send one free Warm Heart, Happy Sparkle, Kind Chime, or Tiny Firework reaction. The reaction adds no gift, fee, point, or quota use and can only be recorded once for that receipt. It remains available from the recent page if the player chooses Not Now.

If the sender and recipient are online, in the same world, nearby, and both allow shared celebrations, the selected effect is shown to both players. Either player can disable particles, sounds, or nearby effects without disabling Appreciation itself.

Unclaimed gifts expire after 60 days by default. The written appreciation remains in recent history and can still receive its one thank-you reaction, while the optional XP, money, or exact item is returned through a guarded transaction. Money can return while the sender is offline; XP waits for the sender to be online; exact items additionally wait for the original world scope, inventory room, intact escrow data, and AutoSell safety. The paid anonymous-service fee is not part of the optional gift and is not returned. Any uncertain external refund stops in an inspectable state for staff instead of retrying blindly.

## Statistics, Badges, And Points

```text
/appreciate stats
/appreciate stats <player>
/appreciate badges
/appreciate shop
```

The player's own head on the main GUI shows their private overview. Other players can see totals and only the selected public badge through the online-player tooltip and `/appreciate stats <player>`.

Milestone badges are earned from sending, receiving, and streak activity. Point badges are permanent shop unlocks. The badge page shows earned, purchased, locked, and selected entries, and lets the player choose the one public badge shown by Appreciation.

A qualifying streak consists of seven consecutive calendar days with a funded appreciation and at least three unique recipients across that block. Each non-overlapping qualifying seven-day block awards one Appreciation point exactly once. Points can currently buy:

- Creative, Adventure, and Community reason pairs, each adding two permanent reasons
- Summer Bloom, Golden Note, and Level Spark particle-and-sound styles
- Warm Welcome, Kind Neighbor, and Community Friend Appreciation-only titles
- Summer Spark, Golden Heart, and Quiet Hero selectable badges

The free Gentle Sparkle celebration remains available without a purchase. Titles do not grant global chat or LuckPerms titles; they are intentionally contained within Appreciation.

## Commands

```text
/appreciate
/thanks
/appreciate received [page]
/appreciate recent [page]
/appreciate favorites [page]
/appreciate stats [player]
/appreciate badges
/appreciate shop
/appreciate settings
/appreciate help
/appreciate info
```

## Staff Commands

```text
/appreciate admin
/appreciate admin menu
/appreciate admin status
/appreciate admin check
/appreciate admin reload
/appreciate admin inspect <receipt-uuid|player>
/appreciate admin recover <receipt-uuid> retry confirm
/appreciate admin recover <receipt-uuid> finalize confirm
/appreciate admin recover <receipt-uuid> refund confirm
/appreciate admin recover <receipt-uuid> rollback confirm
/appreciate admin quota reset <player>
/appreciate admin points get <player>
/appreciate admin points give <player> <amount>
/appreciate admin points take <player> <amount>
/appreciate admin points set <player> <amount>
/appreciate admin gift status
/appreciate admin gift <xp|money|item|anonymous> <enable|disable>
/appreciate admin gift <xp|money> <add|remove> <amount>
/appreciate admin audit [page]
/appreciate admin expiry <receipt-uuid> <retry|finalize> confirm
/appreciate debug status
/appreciate debug mode <true|false>
/appreciate debug notify <online-player>
/appreciate debug grantpoints <player> <amount>
/appreciate debug enable <true|false>
```

`retry` and `funded` are equivalent recovery names. They should be used only when staff have verified that the sender's debit happened but recipient delivery did not. `rollback` closes an unfunded prepared receipt. `finalize` records that delivery already happened without delivering again. `refund` begins a guarded sender refund after checking the exact destination, item scope, AutoSell state, inventory capacity, and original item payload.

Always run `inspect` before a recovery action. Recovery actions require the literal final `confirm` argument and are idempotent state transitions; an already finalized or refunded receipt cannot be paid again.

`admin audit` reports receipt-only anti-farming indicators such as concentrated pairs, reciprocal patterns, heavy anonymous use, and unusually high unresolved/refunded shares. It stores no IP data, applies no punishment, and always requires human review. `admin expiry retry` resumes a refund that has not crossed the external delivery boundary; `admin expiry finalize` is only for a trusted staff member who independently verified an externally completed refund.

## Permissions

The opt-in entry permission defaults false:

```text
onembcmi.appreciation.use
```

Supporting player permissions default true. They do not make someone appear in the recipient list or permit a new send without the entry permission:

```text
onembcmi.appreciation.gift.xp
onembcmi.appreciation.gift.money
onembcmi.appreciation.gift.item
onembcmi.appreciation.anonymous
onembcmi.appreciation.claim
onembcmi.appreciation.stats
```

Staff permissions default false:

```text
onembcmi.appreciation.admin
onembcmi.appreciation.admin.menu
onembcmi.appreciation.admin.inspect
onembcmi.appreciation.admin.recovery
onembcmi.appreciation.admin.quota
onembcmi.appreciation.admin.points
onembcmi.appreciation.admin.gifts
onembcmi.appreciation.admin.audit
onembcmi.appreciation.admin.reload
onembcmi.appreciation.admin.debug
```

The admin parent includes every child. Operator status alone does not grant Appreciation administration.

## Placeholders

```text
%onembcmi_appreciation_unclaimed%
%onembcmi_appreciation_received_total%
%onembcmi_appreciation_sent_total%
%onembcmi_appreciation_unique_senders%
%onembcmi_appreciation_unique_recipients%
%onembcmi_appreciation_daily_remaining%
%onembcmi_appreciation_weekly_remaining%
%onembcmi_appreciation_cooldown%
%onembcmi_appreciation_last_sender%
%onembcmi_appreciation_top_reason%
%onembcmi_appreciation_badge%
%onembcmi_appreciation_title%
%onembcmi_appreciation_style%
%onembcmi_appreciation_points%
%onembcmi_appreciation_points_lifetime%
%onembcmi_appreciation_streak%
```

These placeholders return `loading` while the durable repository is not ready. They never expose the real sender of an anonymous appreciation.

## Configuration And Data

Primary files:

```text
plugins/1MB-CMIAPI/Appreciation/config.yml
plugins/1MB-CMIAPI/Appreciation/state.yml
plugins/1MB-CMIAPI/Appreciation/state.yml.backup
```

`config.yml` controls lifecycle, debug quota behavior, `/thanks`, timezone, quotas, anonymous fee, gift presets and maximums, per-type new-gift switches, item world scopes, blocked materials, reasons, the Birthday reason switch, point costs, 60-day expiry and scan interval, shared-celebration radius, staff audit thresholds, GUI filler, CMI notifications, and `/menu` integration.

`state.yml` stores receipts and profiles. Receipt records contain transaction identity, sender audit identity, public anonymity, recipient, reason, exact gift data, item hash and scope, timestamps, expiration, one recipient reaction, revision, favorite state, and lifecycle state. Profiles contain points, one-time streak award ids, purchased unlocks, selections, gift/notification/accessibility preferences, and staff quota reset markers. Schema 1 data is migrated to schema 2 without dropping existing receipts.

The repository writes through temporary files and atomic replacement, keeps a known-good backup, serializes writes on a dedicated storage executor, and fails closed on malformed or failed persistence. Damaged state is quarantined by the shared durable YAML layer rather than silently loading as an empty economy.

## Dependencies And Hooks

Required:

- Paper 26.2
- Java 25
- CMI
- CMILib
- `1MB-CMIAPI-Lib`

Optional:

- Vault for money gifts and the anonymous fee
- PlaceholderAPI for `%onembcmi_appreciation_*%`
- AutoSell for item-reward claim protection

CMI is used for private messages, gentle toast notifications, offline mail, and the configured server `/menu` route. Paper APIs provide lifecycle command registration, Adventure messages, inventories, exact ItemStack serialization, particles, sounds, permissions, and main-thread inventory handling.

## Transaction Safety

Every send and claim has a UUID receipt and explicit durable states:

```text
prepared -> debiting -> funded -> claiming -> delivered -> finalized
                          |           |
                          |           +-> failed/refunding -> refunded
                          +-> expiring -> expiry_refunding -> expired
```

The external economy, XP, and inventory boundary cannot be made one database transaction with YAML. Appreciation therefore records the boundary before mutation, serializes same-sender and same-claim work, blocks blind retries, and exposes uncertain states to staff. It never treats a command-dispatch return as gift delivery because gifts are delivered through validated API operations.

Menus use the shared hardened `GuiService`: owner UUID, unpredictable session nonce, exact top-inventory identity, explicit click policies, deferred actions, terminal-action locking, stale-session rejection, and quit/kick/world-change/plugin-disable cleanup. Every consequential click revalidates authoritative permissions, limits, balances, scopes, inventory, AutoSell, receipt state, and ownership.

## Staff Preflight

Before a private or public beta:

1. Run `/appreciate debug enable true` on the test server.
2. Run `/appreciate admin check` and require zero launch-blocking issues.
3. Confirm Vault, CMI messaging, CMI toast, CMI mail, `/menu`, and PlaceholderAPI behavior.
4. Test every free, XP, money, item, and anonymous combination with exact and insufficient balances.
5. Test survival-group claims plus OneBlock, SkyBlock, Acid, Cave, SkyGrid, and ChunkBlock isolation.
6. Test unknown worlds, Creative mode, a full inventory, AutoSell enabled, permission removal, disconnects, restart, plugin disable, and rapid repeated clicks.
7. Inspect each deliberately interrupted receipt and verify retry, rollback, refund, and finalize without duplicate delivery.
8. Verify day/week boundaries in `Europe/Amsterdam`, the three-per-day and nine-per-week caps, same-recipient limits, and two-hour spacing.
9. Grant test points and review all reason, badge, title, and celebration selections.
10. Test each recipient preference, Notes Only, all four reactions, shared-nearby opt-in, and particles/sounds disabled.
11. Temporarily shorten expiry on the test server; verify free, XP, money, item, offline, wrong-scope, full-inventory, AutoSell, retry, and staff-finalize outcomes.
12. Run `/appreciate admin audit`, verify indicators are staff-only and informational, then test every new-gift staff switch while proving old escrow remains claimable.
13. Turn isolated debug mode off with `/appreciate debug mode false` before public use.

Build target: Paper 26.2 stable, Java 25, project version `1.0.1`.

Current test jar:

```text
1MB-Lib-Appreciation-v1.0.3-579-j25-26.2.jar
```

[Documentation index](README.md)
