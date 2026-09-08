# Communication coverage audit

**CLOSE-01 completed on 2026-09-07.** Tracking: [communication completion, issue #48](https://github.com/mrfdev/1MB-Library/issues/48). This is a source-backed inventory of the current working tree associated with canonical **build 620**, not live-server acceptance. Current close-out status is in the [communication TODO](../todo.communication.md#completion-and-acceptance).

The suite has **64 active distributable artifacts**: one Shared Library, 33 Player Fun, 19 Server Management, five Staff and six Generic artifacts. All 64 are accounted for in the [full 12-pattern matrix (CSV)](communication-coverage.csv). EventHunts contains Coconut, Ghost and Door Hunt internally and is counted once. MessageFont and WarpPassport are two additional source-only entries outside the active build. Here, *active artifact* means part of the build, not enabled gameplay on live.

## How to read the matrix

Numbers are implementation order 1–12 from the communication TODO, not the original COMM identifiers.

- **A, Adopted:** implemented for the specific flow described below. This does not claim every screen, reward or objective in that plugin is migrated.
- **P, Partial:** selected surfaces or a narrower route are integrated; the scope column explains the boundary.
- **S, Shared support:** supplies coordination or reaches the pattern through a shared service. It is not a separate feature-state provider.
- **C, Candidate:** a useful follow-up for an existing capability, based on this audit's design judgement. Existing local UX may already be good. It is not a release blocker or an instruction to add the pattern everywhere.
- **–, Not applicable:** no useful adoption is proposed for this feature's current role. It does not need an artificial goal, streak or reward loop.

Inherited permission/reward guards and basic help are not counted as complete feature-specific recovery or reward adoption. Registration flags and shared helper usage locate integrations; actual provider bodies and flow documentation determine their scope. Candidate and not-applicable decisions are product judgements, not assertions proved by a missing Java symbol.

## Confirmed shared integration

| Capability | Feature-owned integrations found in production source |
| --- | --- |
| Dynamic next-step provider, 7 | AutoSell, PassportDiscovery, JourneyMap, Forage, KitStreaks, VoteTokens, Collect |
| Pinned-goal provider, 6 | AutoSell, PassportDiscovery, JourneyMap, Forage, PlayerTodo, Collect |
| Remembered first-success provider, 5 | AutoSell, PassportDiscovery, JourneyMap, Forage, PlayerTodo |
| Unpinned continuation opt-in, 4 | AutoSell, PassportDiscovery, JourneyMap, Collect |
| Optional feature hint sources, 4 | ScheduledTips, AutoSell, JourneyMap, KitStreaks; the Shared Library also owns firststeps and welcome, for six source registrations in total |
| Shared Now/Next/Later presentation, 3 | VoteTokens, JourneyMap, KitStreaks |
| New community contribution integration, 1 | Collect; other plugins retain their existing community systems |

The welcome also accepts an available pin from any of the six focus providers and an eligible READY recommendation. Consequently, Forage can participate through its pin or ready reward; PlayerTodo through its pin. KitStreaks' due-day CONTINUE card is not opted into welcome, and VoteTokens offers a TRY path link. A card merely being called CONTINUE does not make it a return welcome.

## Adopted activities

Split views below show the same rows and numbered columns as the complete CSV.

### Feedback, patterns 1–4

| Plugin | 1. Notification policy | 2. Action cards | 3. Blocker recovery | 4. Reward communication |
| --- | --- | --- | --- | --- |
| [AutoSell](plugins/autosell.md) | P | P | P | P |
| [PassportDiscovery](plugins/passportdiscovery.md) | P | P | P | P |
| [Forage](plugins/forage.md) | P | P | P | P |
| [JourneyMap](plugins/journeymap.md) | P | P | P | P |
| [PlayerTodo](plugins/todo.md) | S | S | S | - |
| [VoteTokens](plugins/votetokens.md) | - | P | P | C |
| [KitStreaks](plugins/kitstreaks.md) | A | P | P | P |
| [Collect](plugins/collect.md) | S | P | P | P |

### Navigation and learning, patterns 5–8

| Plugin | 5. Plugin next | 6. Global next hub | 7. Pinned focus | 8. First-success checklist |
| --- | --- | --- | --- | --- |
| [AutoSell](plugins/autosell.md) | A | A | A | A |
| [PassportDiscovery](plugins/passportdiscovery.md) | A | A | A | A |
| [Forage](plugins/forage.md) | A | A | A | A |
| [JourneyMap](plugins/journeymap.md) | A | A | A | A |
| [PlayerTodo](plugins/todo.md) | C | S | A | A |
| [VoteTokens](plugins/votetokens.md) | P | P | C | C |
| [KitStreaks](plugins/kitstreaks.md) | A | A | C | C |
| [Collect](plugins/collect.md) | A | A | A | C |

### Progress and engagement, patterns 9–12

| Plugin | 9. Progression preview | 10. Streak guidance | 11. Focused welcome | 12. Community contribution |
| --- | --- | --- | --- | --- |
| [AutoSell](plugins/autosell.md) | C | - | A | - |
| [PassportDiscovery](plugins/passportdiscovery.md) | C | - | A | - |
| [Forage](plugins/forage.md) | C | - | P | C |
| [JourneyMap](plugins/journeymap.md) | A | - | A | - |
| [PlayerTodo](plugins/todo.md) | - | - | P | - |
| [VoteTokens](plugins/votetokens.md) | A | - | C | - |
| [KitStreaks](plugins/kitstreaks.md) | A | A | C | - |
| [Collect](plugins/collect.md) | C | C | A | A |

### Exact adopted scope and remaining boundaries

| Plugin | Current scope | Further adoption / boundary |
| --- | --- | --- |
| [AutoSell](plugins/autosell.md) | Ready manual-quest hints; quest/milestone cards, recovery and reward outcomes; current quest/milestone recommendations and focus; first sale checklist; started progress or ready rewards in welcome. | Broker levels, cap purchases and other sale/activity feedback remain separate adoption candidates. AutoSell is not SellStreaks. |
| [PassportDiscovery](plugins/passportdiscovery.md) | Category and stamp cards; collection/box recovery; category credits and stamp-box outcomes; missing-stamp/credit decisions; category focus; first stamp checklist; started categories in welcome. | Shared checklist invitations and welcome respect the budget; existing activity summaries keep their own route. A longer unlock preview and broader notification adoption are optional follow-ups. |
| [Forage](plugins/forage.md) | Gathering/camp/tool/quest recovery, quest and treasure outcomes; prerequisite-aware next steps; quest focus; camp/tool/first gather checklist. Welcome can use a pin or a ready reward, but no unpinned CONTINUE card opts in. | Shared checklist invitations and eligible welcome use the budget. Live gameplay remains dormant by owner instruction. Community Effort, upgrade/shop feedback, progression previews and other activity summaries remain separate adoption work. |
| [JourneyMap](plugins/journeymap.md) | Optional milestone hints; saved badge/playtime and reward cards; request recovery and reward outcomes; badge focus; saved journey/badges/chosen focus checklist; Now/Next/Later preview; started saved playtime or ready rewards in welcome. | Progress is the last saved refresh, not a continuously ticking timer. Check the existing milestone hint alongside focused welcome in CLOSE-04. |
| [PlayerTodo](plugins/todo.md) | Manual personal tasks supply shared focus and a remembered first-task checklist. Shared services render the cards/recovery. A pinned task can supply welcome; no Todo NextStep provider or /todo next exists. | An unpinned personal-task recommendation could be added later if useful. Never infer numeric building progress or complete a task from guidance. |
| [VoteTokens](plugins/votetokens.md) | Reward-path cards and load-recovery copy; Now/Next/Later based on the configured tier/layer tree. /votetokens next contributes a TRY link to the path; the detailed view resolves actual player progress. | The hub card is a launcher, not a selected affordable trade or claim. Trade/tool outcome migration, cached personalised suggestions, focus and onboarding are follow-ups; no welcome opt-in currently exists. |
| [KitStreaks](plugins/kitstreaks.md) | Shared due reminder; qualifying-kit/day guide, calendar windows and recovery copy; milestone preview; one secured-day acknowledgement; cached due-day next step. No focus/checklist provider or welcome opt-in. | Secured-day and earned-milestone wording does not certify every external reward delivery. Keep due reminders separate from optional future focus/checklist/welcome adoption. |
| [Collect](plugins/collect.md) | Active community cards and failed-index recovery; actual saved submission/exchange contribution in existing receipts; community next step and shared focus; started contribution in welcome. | Personal reward claims, leaderboard goals, Collect streaks and first-success onboarding are not migrated by COMM-11. Newcomers or completed goals are not unpinned return continuations. |

## Coordination and discovery

| Component | Current role | Boundary |
| --- | --- | --- |
| [Core](plugins/1mb-cmiapi-lib.md) | Shared Library owns controls, provider registries, presentation types, persistence, focus, first-step invitations and the one welcome coordinator. Features supply truthful state and outcomes. | Availability of a shared API or inherited permission/reward guard does not migrate every custom message. |
| [ScheduledTips](plugins/scheduledtips.md) | Configured tips and booster hints use the shared optional budget, hide/later/settings and availability rules. The shared settings UI supplies its presentation and recovery. | Review configured tip wording and surrounding messages in CLOSE-04; this feature does not own a progression objective. |
| [RecordingMode](plugins/recordingmode.md) | Recording tips preference supplies a temporary quiet state to shared optional hints, the focus bar and focused welcome. | Its own settings/status presentation can be reviewed separately. Quiet integration is not a next/focus-goal provider. |
| [Menu](plugins/menu.md) | The existing /menu gains a permission-checked Your next step entry into the global hub, including configured ordering support. | Other directory entries retain their existing descriptions. A menu link is not a feature recommendation provider. |
| [Boosters](plugins/boosters.md) | Existing /rate status is used by ScheduledTips' booster guidance; Boosters does not register its own optional-hint or next-step provider. | Prioritise accurate applicable-activity/status copy if adopted. No invented progression or additional login stream. |

## Other player-facing features

These retain their existing communication. Candidate numbers reference the twelve patterns above; no implementation is requested by this table.

| Plugin | Existing scope | Candidate patterns | Adoption note |
| --- | --- | --- | --- |
| [AFKShrine](plugins/afkshrine.md) | Existing return postcards, rotating AFK bossbar, pending-token claims/trades, quests, milestones, streaks and shared community milestones; none of the new next/focus/checklist providers is registered. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | Strong integration candidate: saved pending claims and one chosen goal first. Preserve its AFK-exit semantics, expiry/recovery rules and existing community/tournament outcomes. |
| [AntiFire](plugins/antifire.md) | Protection/moderation feature with possible player-facing denied-action feedback; no progression providers. | 3 | Review only useful, appropriate recovery copy for blocked actions; retain required safety/moderation feedback. |
| [Appreciation](plugins/appreciation.md) | Existing durable gift inbox, claim controls, preferences, badges, permanent point unlocks and qualifying seven-day sending streaks. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 | Prioritise claim/recovery clarity; review optional reminders without pressuring players to spend gifts or send thanks to maintain a streak. |
| [BirthdayLanterns](plugins/birthdaylanterns.md) | Existing birthday, anniversary and server-milestone keepsake/wish-lantern eligibility and claim flows. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 11 | Use only real eligibility/claim state. An anniversary is not a daily streak, and a server anniversary is not a contribution target. |
| [EventHunts](plugins/coconut.md) | One EventHunts artifact contains Coconut, Ghost and Door Hunt modules. Existing event guides, find/unlock progress, rewards and module-specific streak/community mechanics remain feature-owned. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | Adopt per active module and actual objective, preserving seasonal gates. Do not count the three hunt modules as three additional JARs. |
| [ContentGuard](plugins/contentguard.md) | Protection/moderation feature with possible player-facing denied-action feedback; no progression providers. | 3 | Review only useful, appropriate recovery copy for blocked actions; retain required safety/moderation feedback. |
| [DiscordChat](plugins/discordchat.md) | Existing linked-account EXP, points, streaks and reward trades; no new guidance providers. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 | Any adoption must respect DiscordSRV/link availability and actual rewards. The maintained test server's DiscordSRV exclusion remains unchanged. |
| [DropParty](plugins/dropparty.md) | Existing timed event/arena flow and saved loot claims after returning to the usual game mode. | 1, 2, 3, 4, 5, 6, 8, 11 | Clear participation, exit and saved-loot recovery are useful; do not turn temporary event participation into an invented numeric focus goal. |
| [EmoteMenu](plugins/emotemenu.md) | Curated emote picker backed by existing CMI aliases. | 2, 3 | Selection availability and action descriptions; no required progression loop. |
| [EndCrystals](plugins/endcrystals.md) | Protection/moderation feature with possible player-facing denied-action feedback; no progression providers. | 3 | Review only useful, appropriate recovery copy for blocked actions; retain required safety/moderation feedback. |
| [Exchange](plugins/exchange.md) | Existing menu-driven item exchanges and trade results. | 2, 3, 4, 5, 6, 8 | Prioritise costs, item eligibility, blockers and confirmed outcomes. An affordable exchange is not an earned reward in the hub. |
| [GameTypes](plugins/gametypes.md) | Safe routing into the relevant BentoBox game-type menu. | 2, 3 | World/access/navigation recovery first; underlying island progress belongs to its provider. |
| [LavaBoots](plugins/lavaboots.md) | Finite custom event boots with their own item behaviour. | 2, 3 | Explain remaining protection and why it stopped; no new streak or invented reward path. |
| [MobHat](plugins/mobhat.md) | Temporary mob-cosmetic selection with its own eligibility rules. | 2, 3 | Readable selected state and blocked-selection recovery. |
| [NameMC](plugins/namemc.md) | Existing NameMC verification/link and reward flow. | 1, 2, 3, 4, 5, 6, 8, 11 | An external verification must remain authoritative. Do not present a link, submitted request or cooldown as a delivered reward. |
| [Nick](plugins/nick.md) | Curated nickname picker, history and favourites. | 2, 3 | Readable selected state, preview and permission/format recovery. |
| [PvPToggle](plugins/pvptoggle.md) | Personal PvP toggle and restrictions. | 2, 3 | Clear current state and why a requested change cannot apply. |
| [Refer](plugins/refer.md) | Existing referral request, friend verification, playtime/duplicate checks and reward-marker flow. | 1, 2, 3, 4, 5, 6, 8, 11 | Show the correct participant's next action and the remaining eligibility. Keep request acceptance distinct from external kit delivery. |
| [SellStreaks](plugins/sellstreaks.md) | Existing daily CMI-sale material goals, variety thresholds, automatic rewards and same-material anti-spam streak limits. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 11 | Good next/focus candidate. Its current streak is an anti-spam count, not KitStreaks' consecutive-day promise. Do not assume AutoSell sales feed it. |
| [SocialGatherings](plugins/socialgatherings.md) | Existing gathering requirements/invites/opt-out and separately gated Carnival booths, personal bests, virtual tickets and prize counter. | 1, 2, 3, 4, 5, 6, 7, 8, 9, 11 | Consider actual Carnival activity/claim state per module. Same-type streak limits are abuse controls; group attendance is not a persistent community-contribution target. |
| [Spawners](plugins/spawners.md) | Existing CMI spawner shop, price and per-type permission gates. | 2, 3, 4, 5, 6, 8 | Prioritise eligibility, cost, item delivery and recovery. Do not present a purchasable spawner as a free ready reward. |
| [TPAuto](plugins/tpauto.md) | Personal CMI teleport-request auto-accept preference. | 2, 3 | Clear current preference, eligible request types and permission recovery. |
| [Visit](plugins/visit.md) | Existing player-owned visit locations, listings, arrival preferences and notifications. | 1, 2, 3, 4, 5, 6, 8, 11 | First listing/setup and actionable visit outcomes are candidates. Verify an actual unfinished owner action before considering return guidance. |
| [Wiki](plugins/wiki.md) | Local reviewed reference answers, disambiguation and honest link/search fallbacks. | 2, 3 | Preserve existing next-action answers; no need to invent progression or milestones. |

## Staff and infrastructure accounting

These active artifacts are in the complete CSV but have no proposed player-progression adoption. Player-facing protection/moderation feedback for AntiFire, EndCrystals and ContentGuard is accounted for separately above.

| Area | Active artifacts excluded from player-progression adoption |
| --- | --- |
| generic | [BedrockChatBridge](plugins/bedrockchatbridge.md), [CMIDatabase](plugins/README.md), [CMIProbe](plugins/cmiprobe.md), [EventRecorder](plugins/eventrecorder.md), [PermissionProbe](plugins/permissionprobe.md), [Placeholders](plugins/placeholders.md) |
| server-management | [CMIConfig](plugins/cmiconfig.md), [CmdCostDashboard](plugins/cmdcostdashboard.md), [ConsoleNoiseRouter](plugins/consolenoiserouter.md), [Diagnostics](plugins/diagnostics.md), [EconomyGuardian](plugins/economyguardian.md), [Hoppers](plugins/hoppers.md), [PluginVersions](plugins/pluginversions.md), [Potions](plugins/potions.md), [SchedulerCheck](plugins/schedulercheck.md), [SparkReviewer](plugins/sparkreviewer.md), [StartupDoctor](plugins/startupdoctor.md), [UpdateSmoke](plugins/updatesmoke.md), [Upgrade](plugins/upgrade.md), [WarpAudit](plugins/warpaudit.md), [WorldSnapshot](plugins/worldsnapshot.md), [WorthDrift](plugins/worthdrift.md), [WorthHelper](plugins/worthhelper.md) |
| staff | [Profile](plugins/profile.md), [StaffCenter](plugins/staffcenter.md), [TeamMsg](plugins/teammsg.md), [WarningLens](plugins/warninglens.md) |

## Availability is a separate axis

The CSV's **fresh_install_default** is derived from the current [FeatureInstallPolicy](../libs/1mb-cmiapi-lib/src/main/java/com/onemb/cmiapi/lib/FeatureInstallPolicy.java), with core and standalone AntiFire identified separately. It does not report the actual live config. Existing config values win, and several locally tested integrations default dormant on a fresh install. **Forage is confirmed installed but gameplay-dormant on live by the owner.**

CLOSE-05 still needs to verify actual live feature settings, permissions, modules, event dates and debug overrides. Neither a packaged JAR, a green plugin entry, a default-enabled policy nor this coverage matrix authorises activation. Preserve event/module gates for Collect, EventHunts, SocialGatherings/Carnival and any optional external provider. MessageFont/WarpPassport's source-only status is distinct from Forage's packaged-but-gameplay-dormant status.

## Release gaps versus future expansion

The audit confirms the initial twelve patterns have concrete implementations or shared owners. It does not establish that all applicable flows have migrated, nor that a real client has accepted the result. The table below records the gaps identified at coverage-audit time; the communication TODO tracks their subsequent completion.

| Required close-out item | Why it is still required | Next owner step |
| --- | --- | --- |
| Combined current-candidate behaviour | Earlier Paper runtime checks span builds 594–620. The final full unit suite passed, but this audit did not replay cross-feature player journeys. | CLOSE-02: recommendation → first success → focus → progress → reward → return; include completion and unavailable states. |
| Ordinary Java/Bedrock gameplay | The implementation notes retain owner checks for layout, real CMI claims, navigation and actual player understanding. | CLOSE-03: ordinary accounts, not only admin/synthetic players. |
| Whole-session message volume | Four feature hint sources plus shared checklist invitations and the one shared welcome are coordinated; existing activity summaries, AFK postcards, event effects and external login messages have distinct behaviour. Their coexistence is not a source-audit result. | CLOSE-04: assess a real session and classify optional versus necessary feedback before changing it. |
| Actual live availability/configuration | Fresh-install policy and local test settings are not live evidence. | CLOSE-05, preserving Forage's release gate. |
| Accepted release records and publication | Communication issues remain open for acceptance; public docs and the exact manual handoff are pending. | CLOSE-06 after acceptance, preserving unrelated working-tree changes. |

No new runtime defect is claimed from this coverage audit. If later acceptance finds a false ready reward, impossible next action, stale goal, lost preference or misleading recovery in an adopted flow, fix that before release. Adding an unadopted plugin is expansion unless it is needed to make an already advertised player journey work.

### Proposed expansion order

These are suggestions for later approval, not new work started here. Confirm real live use in CLOSE-05 before scheduling them.

1. **Finish the most-used adopted flows:** VoteTokens trade/tool outcomes and personalised next-step selection; Collect personal reward/streak paths; AutoSell broker/cap follow-up. Preserve the distinction between a purchasable trade and an earned claim.
2. **Connect existing rich goals:** AFKShrine pending claims and one explicit goal; SellStreaks daily goals and variety thresholds. Reuse their saved facts and existing transaction rules.
3. **Improve transaction-heavy entry points:** Exchange, Spawners, Appreciation, Refer and NameMC. Start with costs, eligibility, confirmed outcomes and recovery; do not manufacture progression to fill the matrix.
4. **Adopt seasonal/module-specific guidance when opened:** EventHunts, Carnival, DropParty, BirthdayLanterns and Collect's additional event paths. A configured inactive event should stay absent.
5. **Continue development-gated features on their own release schedule:** Forage Community Effort and wider tool/shop progression; DiscordChat with its external-provider conditions. A communication change does not lift those gates.

SellStreaks' repeated-material count and SocialGatherings' same-type limit are not daily habit streaks. Anniversary eligibility is not a streak either. The “streak guidance” pattern needs actual qualifying-day semantics, not a matching feature name.

## Evidence and completion criteria

The source census covers all 64 active manifest entries and both source-only entries, with file/line matches for next, focus, first steps, welcome opt-ins, cards, previews, recovery/reward helpers and optional hint/quiet integration. It is supplemented by the actual provider implementations and plugin flow documents. The CSV includes representative source references for each active artifact; complete matches and a production-file hash snapshot are retained locally in `.scratch/communication/coverage-audit/`.

| Area | Production entry point / supporting documentation |
| --- | --- |
| Shared lifecycle and opt-in defaults | [AbstractCmiApiFeaturePlugin](../libs/1mb-cmiapi-lib/src/main/java/com/onemb/cmiapi/lib/AbstractCmiApiFeaturePlugin.java), [next steps](next-steps.md), [first-success checklists](first-success-checklists.md) |
| Welcome selection and pin handling | [WelcomeSelection](../libs/1mb-cmiapi-lib/src/main/java/com/onemb/cmiapi/lib/guidance/WelcomeSelection.java), [WelcomeService](../libs/1mb-cmiapi-lib/src/main/java/com/onemb/cmiapi/lib/guidance/WelcomeService.java), [focused welcome](focused-welcome.md) |
| Optional output and quiet controls | [player guidance](player-guidance.md), [ScheduledTips](plugins/scheduledtips.md), [RecordingMode](plugins/recordingmode.md) |
| Feedback adoption scope | [action cards](action-cards.md), [blocker recovery](blocker-recovery.md), [reward communication](reward-communication.md) |
| Progress, days and shared contribution | [progression previews](progression-previews.md), [streak guidance](streak-guidance.md), [community contribution](community-contribution.md) |

- [x] All 64 active artifacts accounted for exactly once in the full matrix; two source-only entries distinguished.
- [x] Twelve pattern columns, explicit scope, partial coverage, candidates and not-applicable decisions recorded.
- [x] Provider counts and opt-ins cross-checked against production registrations and source bodies.
- [x] Existing independent UX, fresh-install defaults and actual-live uncertainty distinguished.
- [x] Release acceptance gaps separated from optional wider adoption.

CLOSE-01 is a documentation/source audit only. It does not rerun tests, start Paper, change plugin code/configuration, consume another build number or complete CLOSE-02 through CLOSE-06.
