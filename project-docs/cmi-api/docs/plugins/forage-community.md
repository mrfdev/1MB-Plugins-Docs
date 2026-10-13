# Forage seasonal Community Efforts

**Included in canonical suite 741 on Paper 26.3 STABLE 175; beta activation is verified.** This page documents the seasonal implementation and its separate acceptance gates. Publishing the page does not authorize live activation. Ordinary Forage gameplay and the existing quest/participation systems remain separate. Plugin-managed Camp Storage remains a proposal. Participation-map delivery remains disabled until its real reward is ready.

A Community Effort is one shared seasonal challenge, with a personal contribution requirement for each participant. Open **Community Cleanup** in the Forage hub or use `/forage community`. Browsing does not create a workstation visit or grant progress. Gather in one of the season's included worlds, then deliberately donate accepted resources and genuine Forage treasures at your active camp in an included world.

The beta configuration enables Community Efforts and both seasonal debug flags. Its four CMI seasonal templates remain disabled for ordinary `/kit` access and contain uniquely named dirt placeholders, not authored final rewards. With debug kit delivery enabled, a confirmed debug claim delivers real placeholder items and a dormant claim consumes real treasures. The primary instance keeps seasonal activation disabled by default; the participation map remains unavailable.

## Three goals, three personal requirements

All three community targets and all three of your personal minimums must be met. Bought items can help the resource donation goal; they cannot replace your own gathering actions or treasure donations. Gathering, resource items and treasures each have their own per-player daily cap, shared across the season's world pool.

| Contribution | Default community target | Your minimum | Your daily cap |
| --- | ---: | ---: | ---: |
| Eligible gathering actions | 8,000 | 300 | 75 |
| Donated resource items | 8,000 | 300 | 75 |
| Donated genuine Forage treasures | 35 | 2 | 1 |

The targets are intended as a starting point for roughly seven regular players. An equal share is about 1,143 actions, 1,143 resource items and five treasures across the quarter. Random treasure drops are not guaranteed by reaching the 300-action minimum. Check the current menu because staff can configure different goals, limits and sources.

Gathering must already qualify under ordinary Forage rules: the matching genuine tool, eligible source, permitted location, tool condition, placement/growth policy and ordinary gathering caps still apply. Seasonal credit adds no second XP, points or treasure reward. Legitimate farms, mature crops, tree growth and generators can contribute when their blocks qualify under those rules. A listed material is not a blanket exemption for directly placed resources.

Resource and treasure donations use **backpack slots 9–35**, not the hotbar or offhand. Resource items must be plain; custom names, lore, enchantments and other item metadata disqualify them. Only marked genuine Forage treasure drops count as treasure donations; ordinary lookalikes and Forage Dust do not. Review the exact amount and confirm before anything is consumed. Donations grant seasonal contribution, not ordinary Camp Turn-In XP or points. Those two menus have separate lists and rules.

## Calendar and world rotations

Seasons begin at **00:00 Europe/Amsterdam** on March 1, June 1, September 1 and December 1. Each ends when the next begins. The local timezone includes its normal daylight-saving changes. Daily contribution caps reset at local midnight. Winter belongs to the year in which its December starts, so January and February 2027 are part of winter 2026.

| Season | Included logical worlds | Gathering theme |
| --- | --- | --- |
| Spring, March–May | General, Nether, OneBlock | Short flowers and Nether growth |
| Summer, June–August | Wild, End, SkyGrid | Summer crops and End resources |
| Fall, September–November | General, Cave, ChunkBlock | Leaf litter, autumn woodland, mushrooms and cave supplies |
| Winter, December–February | Wild, SkyBlock, Acid | Winter wood, moss, mushrooms and berries |

Each pool shares the same totals. You must physically be in an included world when gathering or donating; opening the menu there and moving elsewhere does not preserve eligibility. Existing camp world mappings determine the actual server world names. Worlds do not automatically share or isolate inventories because they participate in a Community Effort. Keep the ordinary Initial Camp and Local Introduction rules in mind when choosing a Secondary Camp for donations.

**Available from build 752:** **What Counts?** provides an overview with direct links to the season’s separate gathering and resource-donation lists. `/forage sources community [page]` opens the gathering list and `/forage sources donations [page]` opens the resource-item list. These routes use the selected season edition, including its frozen requirements, rather than ordinary Camp Turn-In acceptance. Reading the lists does not donate items or establish a camp visit.

The gathering and donation buttons show separate complete lists. Source block IDs and their item drops can differ: break `COCOA`, donate `COCOA_BEANS`; break `MELON`, donate `MELON_SLICE`; break `CAVE_VINES`, donate `GLOW_BERRIES`; break `SWEET_BERRY_BUSH`, donate `SWEET_BERRIES`. Seasonal resource lists may include logs or End Stone even though ordinary Camp Turn-Ins do not accept them by default.

## Rewards, completion history and dormant claims

Rewards unlock **only after the season ends**, even if the targets are met early. If the community succeeds and you met all three personal minimums, that Season Completion counts toward your lifetime total and seasonal streak. Claim timing does not determine completion, and a later claim, dormancy or deliberate reward purge does not erase that history. Missing a completed season breaks the consecutive-season streak. The count/streak display is informational; this implementation does not add extra streak rewards.

Use **Season Rewards & History** to inspect the year, season, qualification and claim state. An eligible player claims manually at their own active camp workstation. CMI rewards use the same audited item-template delivery path as quest rewards: a valid template, enough inventory capacity, no unresolved transaction and all current camp checks are required. A disabled CMI kit can still be a valid Forage item template. Disabled kits are not an independent reward-delivery lock.

An unclaimed reward becomes dormant **six calendar months after its season ended**. Claiming one dormant reward costs five genuine Forage treasures and delivers that reward in the same confirmed transaction. It does not create a new thirty-day claim window. An unavailable/invalid kit or insufficient capacity must fail before consuming the fee or recording a successful claim. If a request becomes uncertain after effects began, keep its receipt and ask staff to review it; do not repeat the claim or assume an automatic refund.

Staff can deliberately purge dormant, unclaimed rewards using the preview-and-confirm command below. Claimed rewards, active entitlements and uncertain transactions must not be swept into that purge. Completion and streak history remain.

## Staff settings and persistence

The main Forage `config.yml` contains the settings under `community.*`; there is no separate seasonal configuration file. Defaults are:

```yaml
community:
  enabled: false
  debug:
    enabled: false
    deliver-kits: false
```

Each `community.seasons.spring|summer|fall|winter` section has these fields:

| Field | Meaning |
| --- | --- |
| `display-name`, `description` | Single-line labels for the season template. |
| `worlds` | Logical Forage worlds, resolved through the existing `worlds.mappings`. |
| `gathering-sources` | Actual source material IDs in enabled Forage gathering families. |
| `donation-materials` | Actual inventory item IDs accepted for deliberate seasonal donations. This is separate from normal Camp Turn-In acceptance. |
| `gathering.target`, `.personal-minimum`, `.daily-cap` | Gathering goal and personal limits. |
| `items.target`, `.personal-minimum`, `.daily-cap` | Resource-item goal and personal limits. |
| `treasures.target`, `.personal-minimum`, `.daily-cap` | Genuine treasure goal and personal limits. |
| `reward-kit` | Literal lowercase CMI kit ID; no placeholders or command text. |

Invalid data fails closed: lists must be nonempty and free of duplicates; gathering materials must remain enabled sources; donation materials must be real items; world mappings must resolve uniquely to permitted worlds. Numeric goals and caps must be positive whole numbers up to one billion, and a personal minimum cannot exceed its community target. Do not silently remove an unavailable material from a frozen edition to make an error disappear.

The default kit IDs are `forage_community_spring`, `forage_community_summer`, `forage_community_fall` and `forage_community_winter`. Review the actual item definitions before enabling claims. An edition freezes its world/material sets, limits, dates and kit name when first registered. To supply a different reward in a later year, configure a new literal kit ID before that edition starts and retain previous templates for outstanding rewards. Editing the contents of an old CMI template changes what a later claim of that template will prepare; the edition is not a permanent item-content archive.

Season editions, contributions, daily usage, completion and reward states live in `data/community.yml`, alongside `data/community.initialized`. Preserve the ledger, initialization marker, backup, normal Forage transaction journals, receipts and recovery evidence when backing up or restoring. An established ledger that is missing, empty, malformed, oversized or otherwise unsafe to load pauses operations for staff review; the initialization marker prevents a deleted primary file from being silently treated as a new season history. Do not delete authority files to bypass that guard. A profile-only or community-only rollback is not a safe way to reset a reward. Pending/delivered ambiguity requires staff review rather than replay, and retained transaction tombstones are not a substitute for lifetime completion/claim state. Normal claims and donations use the shared durable transaction path; cross-plugin inventory crash acceptance remains an explicit test gate.

## Isolated seasonal debug runs

Use an ordinary tester account for contributions and a separate authorized staff account for controls. These commands require the existing Forage debug/admin permission; OP is not a substitute for explicit permission. Enable `community.debug.enabled` only on a test server. Debug seasons use independent run IDs, ledgers, caps, claims and completion records; synthetic qualification does not grant ordinary Forage XP, quest progress or Participation Reward qualification. Returning to real time and restarting do not promote debug history into real history.

| Command | Purpose |
| --- | --- |
| `/forage community` | Open Community Cleanup; console receives current status. |
| `/forage debug season status` | Inspect the active real/debug edition and totals. |
| `/forage debug season spring|summer|fall|winter` | Start a new isolated run for that season using its configured real world pool. |
| `/forage debug season ready <online-player>` | Prepare synthetic seven-player contributions sufficient for the named player's qualification, within bounded fixture limits. Use an exact online name, retaining Bedrock prefixes; the record uses the server UUID. |
| `/forage debug season nextday` | Advance the debug clock by one Amsterdam calendar day. |
| `/forage debug season finish` | Move the debug clock to that edition's end and settle it. |
| `/forage debug season dormant` | Move the debug clock to the dormant boundary. |
| `/forage debug season real` | Return to the real calendar and real ledger. |
| `/forage debug rewards purge expired` | Preview the real dormant, unclaimed rewards proposed for permanent removal. |
| `/forage debug rewards purge expired <token>` | Confirm that exact preview within sixty seconds. |

The debug clock does not change the server/OS clock or ordinary quest and gathering-cap resets. Existing configured test worlds can exercise the rotations; no new worlds or rewritten camp mappings are required when all pools are already available. Their names alone do not provide separate player inventories.

By default, debug kit claims are previews: `community.debug.deliver-kits: false`. Setting it true also requires debug mode to be enabled and makes reward delivery real. **Normal gathering and deliberate debug donations still affect real tools and inventory.** Debug mode is not an inventory sandbox; use disposable test accounts or a separate server for destructive fixtures. Wait for pending requests and administrative saves before changing the debug season. Preserve uncertain receipts; do not use a new debug run to conceal an unresolved item effect.

For practical test cases, use the [Community Efforts section of the beta checklist](forage/checklist.md#seasonal-community-efforts-upcoming). Return to the [player guide](forage-camps.md), [staff camp guide](forage-camp-technical.md) or [full Forage reference](forage.md).
