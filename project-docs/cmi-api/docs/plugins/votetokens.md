# VoteTokens

VoteTokens provides a secure GUI for repeatable vote-token trades with tier/layer progression. It is intended to replace the old CMI ctext `/vote tokens` page with a real menu while leaving VotingPlugin's `/vote` command untouched.

The plugin command is `/votetokens`. If the live server should keep the player habit of `/vote tokens`, remove the old CMI ctext alias and make that CMI alias run `/votetokens`; do not try to register `/vote` from this plugin because VotingPlugin owns that root command.

## Player Flow

- `/votetokens` opens the `Tokens Trade Index` GUI.
- The top book closes the VoteTokens GUI and runs `/vote`, so VotingPlugin can show its normal voting flow.
- The bottom-left player head shows the player's current tier/layer progress and opens a read-only progress tree.
- The progress tree uses dye colors: green complete, orange in progress, yellow unlocked, red locked, and gray disabled.
- The book next to the player head sends the vote-item information link: `https://omgboards.com/vote`.
- The tools button opens a single-input tools page for upgrading eligible vote reward items and repairing their vanilla enchant lore.
- Tier/layer pages preview configured rewards even when locked.
- Locked trades explain what is missing; unlocked trades open a confirmation page.
- Confirmation rechecks permission, exact token count, unlocked layer, configured reward, and one empty inventory slot after the tokens are removed.

Progress is completion-based, not one-time reward based. A player may trade the same unlocked item again later, but the first successful trade is what marks that item complete for unlocking the next layer.

## Tier Rules

Default reward tree:

- Tier 1 has layer 1.
- Tier 2 has layers 1 and 2.
- Tier 3 has layers 1, 2, and 3, but defaults to disabled as work in progress.
- Tier 3 can be opened gradually: enable `tiers.3.enabled`, keep `tiers.3.layers.1.enabled` true, enable only the specific ready items, and leave layer 2/layer 3 disabled until their rewards exist.
- Every enabled layer has six items, one for each default token type.
- Tier 1 layer 1 is always unlocked.
- Completing every enabled item in a layer unlocks the next enabled layer in that tier.
- Completing every enabled layer in a tier unlocks the next enabled tier.
- Progress totals count only enabled tiers and enabled layers; disabled work-in-progress layers are visible as disabled entries but do not inflate completed layer totals.
- When all enabled layers are complete and the next configured layer is disabled, the progress header points to that next layer as unlocked but disabled instead of falling back to Tier 1.

The tree is stored in `plugins/1MB-CMIAPI/VoteTokens/rewards.yml`, so future tiers or extra layers can be added without code changes.

## Commands

```text
/votetokens
/votetokens tools
/votetokens progress [player]
/votetokens tier <tier> [layer]
/votetokens admin inspect <player|uuid>
/votetokens admin grant <player|uuid> <tier> <layer> <item> [count] [note]
/votetokens admin revoke <player|uuid> <tier> <layer> <item> [note]
/votetokens admin setcount <player|uuid> <tier> <layer> <item> <count> [note]
/votetokens admin import oldvotes [preview|apply] [file]
/votetokens admin inspectheld
/votetokens admin create <tier> <layer> <item> <name> [unbreakable|breakable] [enable|draft] [type <token>]
/votetokens admin capture token <id>
/votetokens admin capture extra-token <id>
/votetokens admin capture reward <tier> <layer> <item>
/votetokens admin stamp reward <tier> <layer> <item> [confirm]
/votetokens admin certify [player|uuid] [tier] [layer] [item] [confirm]
/votetokens admin response [player]
/votetokens admin reload
/votetokens debug capture token <id>
/votetokens debug capture extra-token <id>
/votetokens debug create <tier> <layer> <item> <name> [unbreakable|breakable] [enable|draft]
/votetokens debug stamp reward <tier> <layer> <item> [confirm]
/votetokens debug certify [player|uuid] [tier] [layer] [item] [confirm]
/votetokens debug set token-<id>
/votetokens debug set extra-token-<id>
/votetokens debug all
```

VoteTokens registers no command aliases; `/votetokens` is the only direct plugin command.

Player-facing VoteTokens chat responses use the shared feature-prefix system with visible prefix name `Vote`, so normal success/error lines render as the Vote feature instead of the generic `1MB CMI-API` library prefix. The symbol comes from `plugins/1MB-CMIAPI/CMIAPILIB/config.yml` under `locale.prefix-unicodes.votetokens`.

## Setup

1. Create or import the six vote token items, then capture each exact token item from your main hand:

```text
/votetokens admin capture token diamond
/votetokens admin capture token emerald
/votetokens admin capture token iron
/votetokens admin capture token gold
/votetokens admin capture token quartz
/votetokens admin capture token netherite
```

Capture the six extra vote token items used by the tools page. These are separate from the normal trade tokens and use the ore names players actually receive:

```text
/votetokens admin capture extra-token lapis
/votetokens admin capture extra-token emerald
/votetokens admin capture extra-token iron
/votetokens admin capture extra-token gold
/votetokens admin capture extra-token redstone
/votetokens admin capture extra-token copper
```

By default, one tools upgrade costs 64 of every enabled extra token type, so the player needs six matching stacks when all six defaults are enabled.

The same capture tools are also available through a small debug bridge for staff muscle memory:

```text
/votetokens debug capture token diamond
/votetokens debug capture extra-token lapis
/votetokens debug set token-diamond
/votetokens debug set extra-token-lapis
```

2. Create CMI kits matching the default reward command pattern. The item number is fixed and maps to the token type in this order: item 1 diamond, item 2 emerald, item 3 iron, item 4 gold, item 5 quartz, item 6 netherite.

```text
/cmi kit vote_tier_1_layer_1_item_1
/cmi kit vote_tier_1_layer_1_item_2
/cmi kit vote_tier_1_layer_1_item_3
/cmi kit vote_tier_1_layer_1_item_4
/cmi kit vote_tier_1_layer_1_item_5
/cmi kit vote_tier_1_layer_1_item_6
```

Continue the pattern for every configured tier, layer, and item.

3. Optionally capture the reward item from your main hand for exact GUI preview or direct item rewards:

```text
/votetokens admin capture reward 1 1 1
```

Captured reward items are stamped with hidden Bukkit/Paper persistent data before they are saved. The marker uses the `onembcmi:votetokens_reward` key and stores the tier, layer, item, token type, and trade id. Normal players cannot add this marker through an anvil, lore edit, or rename.

Captured reward items are used as GUI previews. They are only given directly when `reward.give-captured-item` is true for that trade. Default rewards use CMI kit commands:

```yml
reward:
  give-captured-item: false
  commands:
    - "console:cmi kit vote_tier_1_layer_1_item_1 %player% -s"
```

Supported command prefixes:

```text
console:<command>
player:<command>
message:<plain text>
```

The only runtime placeholders in reward commands are `%player%`, `%uuid%`, `%trade%`, `%tier%`, `%layer%`, and `%item%`.

When a trade pays by CMI kit command, VoteTokens snapshots the player's inventory, runs the reward command, then stamps the changed inventory slot if the new item matches the captured reward preview. This means old unstamped CMI kits still produce certified VoteTokens rewards when they are paid through the GUI.

The setup helper can create a styled reward item from the item in your main hand:

```text
/votetokens admin create 3 1 1 Elite Shield unbreakable enable
```

The command accepts a plain item name, strips unsafe formatting, applies the VoteTokens reward title and lore style, hides vanilla enchant/attribute/unbreakable tooltips, stamps the hidden reward marker, saves the result as `reward.item`, and updates your held item so it can be saved back into the matching CMI kit. The title and divider lore use direct Adventure gradients based on CMILib's named colors (`Cerulean` to `Lochmara`, and `Midnight` to `Tarawera`) instead of storing raw CMI formatting codes. `enable` turns on only that tier, layer, and item, so Tier 3 Layer 1 Item 1 can be opened while Tier 3 Layer 2 and Layer 3 remain disabled. Future-tier placeholder entries with no captured reward item and only the default kit command are normalized back to disabled on load, which keeps uncaptured Tier 3 items from appearing tradable by accident. Use `draft` to create and capture the item without enabling it. `type <token>` can override the default item number mapping when needed.

For manual setup or staff payouts:

```text
/votetokens admin stamp reward 2 1 3
```

This stamps the held setup item with the hidden reward identity. Use it after taking a kit item into your hand and before saving that item back into a CMI kit. If the held item conflicts with an existing captured preview, the command asks for `confirm`.

## Tools Page

The tools page is opened from the index GUI. Players place one eligible vote reward item in the left input slot, then choose an upgrade on the right.

Tools:

- Enchant Upgrades opens a second tools view with Mending I, Unbreaking X, Efficiency VI, Protection VI, and Sharpness VI. Each enchant is applied through the CMILib item API with a Bukkit fallback, then verified on the GUI input item before extra tokens are consumed. Unbreaking X is step 1 of the Unbreakable path. Once the real enchant reaches level 10, its button becomes an unavailable gray `Already Unbreaking X` item and the main Tools page unlocks Make Unbreakable. When the input item's real Unbreakable flag is already true, the Unbreaking X button instead explains that the enchant would provide no durability benefit. Protection VI normally remains armor-only, with one narrow exception: a certified VoteTokens Elytra that already has Protection V can advance to Protection VI. The upgrade rewrites the matching custom `Protection V` lore line to `Protection VI` while preserving its style.
- Sync Enchant Lore is a free repair action that reads the item's real Bukkit/Paper enchant levels and corrects existing lore lines that exactly name those vanilla `minecraft:` enchants. It adds a missing level to a line such as `Mending`, corrects stale levels such as `Unbreaking III` when the real enchant is Unbreaking IV, preserves the line's visible style, and does not change the real enchantments. Unknown or custom lore such as `Sage II`, `Banana 5`, or other plugin augments is left unchanged. The action does not insert missing lore lines or remove lore for absent enchants.
- Netherite Upgrade converts only configured VoteTokens reward trade ids to their approved netherite material. It preserves the title, lore, enchants, persistent data from VoteTokens and other plugins, soulbind data, and other item metadata. The converted item is re-certified and its exact VoteTokens reward identity is verified before the upgrade is accepted, so later tools and Sync Enchant Lore continue to recognize it.
- Shield Presets opens a dedicated tools view with nine built-in banner designs. The third row uses rare-pattern combinations intended to be difficult or expensive to reproduce in normal survival play. A preset only applies to a certified VoteTokens reward shield, preserves the shield's name/lore/markers, hides the raw banner-pattern tooltip, adds a `Forged design` lore line, and consumes the normal extra-token tools cost.
- Make Unbreakable is step 2 and requires the item's real Unbreaking enchant to be level 10 or higher. Below level 10, its GUI button becomes an unavailable gray `Requires Unbreaking X` item and stale/direct attempts are rejected before token-cost checks. Once eligible, it uses CMILib's item API directly on the GUI input item and writes the visible `Forged to Unbreakable` lore line.
- Make Unbreakable also rejects items that do not use durability and items whose real Unbreakable flag is already true before any extra vote tokens are checked or consumed. Existing items upgraded directly under the earlier rule remain Unbreakable; no retroactive cost or downgrade is applied.
- Add Soulbind writes the ItemSoulBind owner tag directly as `itemsoulbind:soulbinduuid` with the player's UUID string; no ItemSoulBind command is dispatched.
- The Tool Cost chest uses colored lore for each extra token type and can be clicked to open a read-only preview of the captured extra vote tokens. If an item is already in the tools input slot, the plugin returns it to the player before opening that preview.

## Enabled Vote Item Upgrade Matrix

This matrix was verified against the 19 enabled captured rewards and the same eligibility rules used by the tools GUI. `After Unbreaking X` means Make Unbreakable is locked until the real enchant reaches level 10; reaching Unbreaking X and then applying Unbreakable are two separately paid actions. `Unavailable: already Unbreakable` means neither durability tool can be selected for that reward. Only the additional upgrades shown in the last column are supported for that reward.

Every equipment reward below already has Mending I or Mending II, so none of the current rewards need the Mending I tool. Sync Enchant Lore is a free maintenance action for the 16 enchanted equipment rewards. It updates matching vanilla-enchant lore only and leaves custom augment lore unchanged.

### Tier 1, Layer 1

| Reward | Base item | Unbreaking X | Make Unbreakable | Soulbind | Additional paid upgrades |
| --- | --- | --- | --- | --- | --- |
| `t1_l1_i1` Hero Diamond Elytra | Elytra | Available, from V | After Unbreaking X | Available | Protection V -> VI |
| `t1_l1_i2` Hero Emerald Sword | Diamond sword | Available, from V | After Unbreaking X | Available | Sharpness V -> VI; Netherite sword |
| `t1_l1_i3` Hero Iron Pickaxe | Iron pickaxe | Available, from V | After Unbreaking X | Available | Efficiency V -> VI; Netherite pickaxe |
| `t1_l1_i4` Hero Gold Bow | Bow | Available, from V | After Unbreaking X | Available | None |
| `t1_l1_i5` Hero Quartz Chestplate | Chainmail chestplate | Available, from V | After Unbreaking X | Available | Protection V -> VI; Netherite chestplate |
| `t1_l1_i6` Hero Netherite Leggings | Netherite leggings | Available, from V | After Unbreaking X | Available | Protection VI |

### Tier 2, Layer 1

| Reward | Base item | Unbreaking X | Make Unbreakable | Soulbind | Additional paid upgrades |
| --- | --- | --- | --- | --- | --- |
| `t2_l1_i1` Elite Diamond Resources | Light blue shulker box | No durability | No durability benefit | Available | None |
| `t2_l1_i2` Elite Emerald Axe | Golden axe | Unavailable: already Unbreakable | Already Unbreakable | Available | Sharpness VI; Netherite axe |
| `t2_l1_i3` Elite Iron Shovel | Iron shovel | Unavailable: already Unbreakable | Already Unbreakable | Available | Netherite shovel; Efficiency VI already included |
| `t2_l1_i4` Elite Gold Rod | Fishing rod | Available, from V | After Unbreaking X | Available | None |
| `t2_l1_i5` Elite Quartz Boots | Chainmail boots | Available, from V | After Unbreaking X | Available | Protection VI; Netherite boots |
| `t2_l1_i6` Elite Netherite Exp | Dragon breath | Blocked | Blocked | Blocked | No VoteTokens tools |

### Tier 2, Layer 2

| Reward | Base item | Unbreaking X | Make Unbreakable | Soulbind | Additional paid upgrades |
| --- | --- | --- | --- | --- | --- |
| `t2_l2_i1` Elite Conduit Box | Light blue shulker box | No durability | No durability benefit | Available | None |
| `t2_l2_i2` Elite Emerald Spear | Trident | Available, from V | After Unbreaking X | Available | None |
| `t2_l2_i3` Elite Iron Pickaxe | Diamond pickaxe | Unavailable: already Unbreakable | Already Unbreakable | Available | Efficiency V -> VI; Netherite pickaxe |
| `t2_l2_i4` Elite Gold Shears | Shears | Available, from V | After Unbreaking X | Available | Efficiency VI |
| `t2_l2_i5` Elite Quartz Helmet | Turtle helmet | Available, from V | After Unbreaking X | Available | Protection IV -> VI |
| `t2_l2_i6` Elite Netherite Hoe | Netherite hoe | Available, from V | After Unbreaking X | Available | Efficiency VI already included |

### Tier 3, Layer 1

| Reward | Base item | Unbreaking X | Make Unbreakable | Soulbind | Additional paid upgrades |
| --- | --- | --- | --- | --- | --- |
| `t3_l1_i1` Ancient Diamond Shield | Shield | Available, from IV | After Unbreaking X | Available | Nine shield presets |

The enabled shield presets are Cerulean Crest, Vote Star, Emerald Grove, Nether Sigil, Ocean Tide, Royal Bloom, Dragon Relic, Trial Gale, and Ancient Omen. The other Tier 3 reward slots are disabled and are intentionally absent from this matrix.

Unbreaking X and Make Unbreakable form a required two-step path for breakable equipment below level 10. Unbreaking X slows durability loss but the item can still break; after that paid upgrade, Make Unbreakable becomes available and stops normal durability loss. With the default configuration, each step costs 64 of each of the six captured extra-token types, so completing both steps costs 128 of each type. Once an item's real Unbreakable flag is true, both actions are disabled before token-cost checks.

Some reward materials are intentionally blocked from the tools GUI even when they are valid VoteTokens rewards. The default block list includes `DRAGON_BREATH`, because the Dragon Breath EXP reward is not equipment and must not become unbreakable, soulbound, enchanted, shield-designed, or netherite-upgraded.

The enchant menu intentionally does not offer Fortune or Looting upgrades. The configured vote rewards already exceed vanilla levels for those enchants, and pushing them higher is not a safe economy default.

Eligibility is intentionally strict. Hidden VoteTokens reward markers are trusted first. Exact captured reward items are accepted. If `tools.allow-relaxed-vote-item-match` is true, the plugin can also recognize upgraded or enchanted legacy vote rewards when the display name and at least one captured lore line still match a captured reward item. This is meant to handle normal use such as adding enchants or upgrading diamond gear to netherite without accepting arbitrary renamed items.

Legacy items without the hidden marker can be auto-certified only when all of these are true:

- the relaxed identity check matches a captured reward item
- the player's VoteTokens progress says they received that exact reward at least once
- `tools.auto-certify-legacy-rewards` is true

Auto-certification writes the hidden marker, logs to `logs/legacy-certifications.log`, and then continues the selected tool upgrade. If the item cannot be recognized safely, the GUI tells the player to open a support ticket on `/discord`.

Staff can review old/customized items manually:

```text
/votetokens admin inspectheld
/votetokens admin certify
/votetokens admin certify mrfloris
/votetokens admin certify mrfloris 2 1 3
```

`inspectheld` explains whether the held item is a normal vote token, an extra token, a hidden-marker reward, an exact captured reward, or a relaxed legacy reward match. `certify` with no player checks the staff member's own held item and auto-detects the captured reward. `certify <player>` checks that online player's held item and auto-detects the captured reward, so staff do not have to remember the tier/layer/item order. The explicit tier/layer/item form remains available for reviewed support tickets. Without `confirm`, certification requires both player-history support and a captured reward match. `confirm` is reserved for reviewed support-ticket cases and is logged.

The tools cost is paid with the captured `extra-tokens` definitions in `tokens.yml`, not the normal tier trade tokens. With the default settings, all six extra token types must be captured and the player must have 64 of each in their inventory for each paid action. Sync Enchant Lore is a maintenance action and does not consume extra vote tokens. Prerequisite failures and redundant Unbreakable or Unbreaking X attempts are rejected before the player's token inventory is checked.

While a player has a reward item in the tools input slot, VoteTokens writes a durable safety copy to `plugins/1MB-CMIAPI/VoteTokens/escrow/<uuid>.yml`. Each update is serialized and validated first, flushed to a uniquely named temporary file, and atomically replaces the primary record only after the write succeeds. A failed update therefore leaves the previous safety record readable. Existing escrow files from older VoteTokens builds use the same envelope and load without migration.

The record is updated after successful tool changes and cleared only after the item is safely returned to the player's inventory. If clearing fails after an inventory return, VoteTokens immediately removes the returned item again; if that rollback also fails, it writes a severe log and audit entry identifying a possible duplicate for staff review. If the server restarts or the player disconnects while the item is in the GUI, the plugin tries to return it on join or when the player opens the tools menu. A full inventory or matching item leaves the primary escrow record untouched.

Malformed YAML, a mismatched UUID, a missing item, or item data that Paper cannot decode is never treated as an empty escrow. VoteTokens moves the unreadable file to `plugins/1MB-CMIAPI/VoteTokens/escrow/quarantine/<uuid>-<timestamp>.yml`, logs and audits the exact path and reason, and blocks that recovery attempt without deleting the evidence. Quarantined records require staff inspection.

Default netherite upgrade allow-list:

| Reward id | Reward slot | Current material | Converts to |
| --- | --- | --- | --- |
| `t1_l1_i2` | Tier 1, Layer 1, Item 2 / emerald slot | `DIAMOND_SWORD` | `NETHERITE_SWORD` |
| `t1_l1_i3` | Tier 1, Layer 1, Item 3 / iron slot | `IRON_PICKAXE` | `NETHERITE_PICKAXE` |
| `t1_l1_i5` | Tier 1, Layer 1, Item 5 / quartz slot | `CHAINMAIL_CHESTPLATE` | `NETHERITE_CHESTPLATE` |
| `t2_l1_i2` | Tier 2, Layer 1, Item 2 / emerald slot | `GOLDEN_AXE` | `NETHERITE_AXE` |
| `t2_l1_i3` | Tier 2, Layer 1, Item 3 / iron slot | `IRON_SHOVEL` | `NETHERITE_SHOVEL` |
| `t2_l1_i5` | Tier 2, Layer 1, Item 5 / quartz slot | `CHAINMAIL_BOOTS` | `NETHERITE_BOOTS` |
| `t2_l2_i3` | Tier 2, Layer 2, Item 3 / iron slot | `DIAMOND_PICKAXE` | `NETHERITE_PICKAXE` |

Future tools TODO, not implemented yet:

- Review whether the certified VoteTokens `TURTLE_HELMET` reward should gain a netherite conversion. It remains unchanged for now because converting it would replace the turtle-shell material and its special behavior.

```yml
tools:
  netherite-upgrades:
    enabled: true
    entries:
      t1_l1_i2:
        from: DIAMOND_SWORD
        to: NETHERITE_SWORD
      t1_l1_i3:
        from: IRON_PICKAXE
        to: NETHERITE_PICKAXE
      t1_l1_i5:
        from: CHAINMAIL_CHESTPLATE
        to: NETHERITE_CHESTPLATE
      t2_l1_i2:
        from: GOLDEN_AXE
        to: NETHERITE_AXE
      t2_l1_i3:
        from: IRON_SHOVEL
        to: NETHERITE_SHOVEL
      t2_l1_i5:
        from: CHAINMAIL_BOOTS
        to: NETHERITE_BOOTS
      t2_l2_i3:
        from: DIAMOND_PICKAXE
        to: NETHERITE_PICKAXE
```

## Old Trade Migration

When a player says they already traded before the GUI existed, staff can use:

```text
/votetokens admin response <player>
/votetokens admin inspect <player|uuid>
/votetokens admin grant <player> 2 1 3 1 migrated-from-old-log
/votetokens admin setcount <player> 2 1 3 4 corrected-after-review
```

The canned response explains that staff can review the old history and sync the database because the missing progress is a server-side migration oversight. Migration changes append to `logs/admin-actions.log` and to the player's recent history file.

Staff progress and migration commands accept Java player names, dot-prefixed Bedrock player names such as `.RenonXenon`, or a UUID. Lookup prefers online players and CMI users, then existing VoteTokens player data files, so imported Bedrock progress remains inspectable on a test server even when the test CMI database no longer contains the live player list.

For the first live migration from the old manual notes, place the reviewed log at:

```text
plugins/1MB-CMIAPI/VoteTokens/import/old-votes.log
```

Then run a dry run from console first:

```text
/votetokens admin import oldvotes preview
```

If the generated report only contains expected unresolved/ambiguous entries, apply the clear entries:

```text
/votetokens admin import oldvotes apply
```

The importer resolves player UUIDs through CMI's live user database, writes normal VoteTokens progress files to `plugins/1MB-CMIAPI/VoteTokens/players/<uuid>.yml`, and writes Markdown reports to `plugins/1MB-CMIAPI/VoteTokens/logs/old-votes-import-*.md`. It does not guess ambiguous lines. Contradictions such as "Got 2 items" while listing three collected item names are reported and skipped.

Repeat trades can be migrated with a precise final count line, for example:

```text
Extra trade: Tier 2, Layer 2, diamond count 2.
```

That imports the matching reward as collected twice, so the GUI lore can show `Progress: completed 2x` while progression still treats the item as completed once for unlocks.

## Permissions

```text
onembcmi.votetokens.use
onembcmi.votetokens.trade
onembcmi.votetokens.progress
onembcmi.votetokens.tools
onembcmi.votetokens.admin
onembcmi.votetokens.admin.reload
onembcmi.votetokens.admin.inspect
onembcmi.votetokens.admin.migrate
onembcmi.votetokens.admin.import
onembcmi.votetokens.admin.create
onembcmi.votetokens.admin.capture
onembcmi.votetokens.admin.certify
onembcmi.votetokens.admin.response
```

Players get `use`, `trade`, `progress`, and `tools` by default. Staff tools are op-only by default and should be assigned to designated admins through the permission plugin.

## Placeholders

```text
%onembcmi_votetokens.current_tier%
%onembcmi_votetokens.current_layer%
%onembcmi_votetokens.completed_items%
%onembcmi_votetokens.total_items%
%onembcmi_votetokens.completed_layers%
%onembcmi_votetokens.total_layers%
%onembcmi_votetokens.progress_percent%
%onembcmi_votetokens.next_unlock%
%onembcmi_votetokens.tokens_required%
%onembcmi_votetokens.token.diamond.count%
%onembcmi_votetokens.extra_token.lapis.count%
```

Token count placeholders return empty for offline players because inventory contents are only available while the player is online.

## Config And Data

```text
plugins/1MB-CMIAPI/VoteTokens/config.yml
plugins/1MB-CMIAPI/VoteTokens/tokens.yml
plugins/1MB-CMIAPI/VoteTokens/rewards.yml
plugins/1MB-CMIAPI/VoteTokens/import/old-votes.log
plugins/1MB-CMIAPI/VoteTokens/players/<uuid>.yml
plugins/1MB-CMIAPI/VoteTokens/escrow/<uuid>.yml
plugins/1MB-CMIAPI/VoteTokens/escrow/quarantine/<uuid>-<timestamp>.yml
plugins/1MB-CMIAPI/VoteTokens/logs/player-trades.log
plugins/1MB-CMIAPI/VoteTokens/logs/admin-actions.log
plugins/1MB-CMIAPI/VoteTokens/logs/legacy-certifications.log
plugins/1MB-CMIAPI/VoteTokens/logs/old-votes-import-*.md
```

Important config paths:

```yml
website:
  url: "https://omgboards.com/vote"
trade:
  tokens-required: 64
  require-free-slot: true
  click-cooldown-ms: 750
tools:
  enabled: true
  extra-tokens-required-per-type: 64
  allow-relaxed-vote-item-match: true
  auto-certify-legacy-rewards: true
  support-ticket-command: "/discord"
  item-soul-bind-integration: true
  soulbind-lore: "Soul bound to %player%"
  blocked-materials:
    - DRAGON_BREATH
  shield-presets:
    enabled: true
  netherite-upgrades:
    enabled: true
    entries:
      t1_l1_i2:
        from: DIAMOND_SWORD
        to: NETHERITE_SWORD
      t1_l1_i3:
        from: IRON_PICKAXE
        to: NETHERITE_PICKAXE
      t1_l1_i5:
        from: CHAINMAIL_CHESTPLATE
        to: NETHERITE_CHESTPLATE
      t2_l1_i2:
        from: GOLDEN_AXE
        to: NETHERITE_AXE
      t2_l1_i3:
        from: IRON_SHOVEL
        to: NETHERITE_SHOVEL
      t2_l1_i5:
        from: CHAINMAIL_BOOTS
        to: NETHERITE_BOOTS
      t2_l2_i3:
        from: DIAMOND_PICKAXE
        to: NETHERITE_PICKAXE
gui:
  use-global-filler-material: true
  filler-material: LIGHT_BLUE_STAINED_GLASS_PANE
  show-disabled-tiers: true
  show-disabled-layers: true
  reopen-layer-after-trade: true
history:
  max-player-entries: 200
migration:
  import-file: "import/old-votes.log"
```

## Security Notes

- GUI clicks are cancelled and only top-inventory clicks from the owning player are processed.
- Each GUI open has an active session id. Stale holders, wrong-owner holders, and non-player interactions are cancelled before any action can run.
- Dragging into the GUI is blocked.
- Every trade uses a per-player processing lock and a fresh validation at confirmation time.
- Vote-token trades and tool transformations also use durable request-token receipts. Exact token storage before/after state, direct reward items, and tool input/output are stored in transaction payload escrow before mutation. Command progress is checkpointed, compensation clears escrow before rollback/refund, and unresolved work is inspectable through `/votetokens debug transactions`.
- Reward setup creation uses plain text only, applies fixed VoteTokens styling, writes the hidden PDC reward marker, and stores the exact preview item in `rewards.yml`.
- Tokens are compared with the captured item using Paper/Bukkit `ItemStack#isSimilar`, so custom names, lore, enchantments, model data, and serialized metadata must match.
- Tokens are removed from cloned storage contents first, then applied atomically to the player's storage contents.
- A free inventory slot is required by default after the token removal simulation, so an exact 64-token stack can free its own slot but a 70-token stack in a full inventory will not.
- The tools GUI has exactly one mutable top-inventory input slot. All other GUI slots stay cancelled, and the input item is returned on close. Moving between the tools hub and enchant view transfers that one input slot instead of returning or duplicating it. Opening the extra-token preview returns that input item first because the preview is informational only.
- The tools input slot uses an atomically replaced disk escrow file while occupied, blocks drag placement, stores the item safely instead of dropping it if the player's inventory is full during recovery, and refuses automatic recovery when a matching item is already present.
- Escrow files validate their UUID and item payload before use. Malformed, mismatched, missing-item, and undecodable records move to a timestamped quarantine file for staff recovery instead of being cleared as empty.
- Successful inventory recovery clears the primary escrow record before it is finalized. A clear failure removes the returned item again; a failed rollback is escalated as a possible duplicate in the server log and `logs/player-tools.log`.
- Tools only modify one item at a time and consume extra vote tokens from cloned player storage contents before applying the changed storage state.
- Tools reject materials listed in `tools.blocked-materials` before auto-certification, token-cost checks, or item mutation. By default this blocks `DRAGON_BREATH`, so EXP rewards can be traded and previewed but cannot be made unbreakable, soulbound, enchanted, shield-designed, or netherite-upgraded.
- Enchant tools use the CMILib item API directly on the GUI input item, verify the final enchantment level, rewrite matching custom lore such as `Efficiency V` or `Efficiency -> 5`, and insert a missing VoteTokens enchant lore line when a new enchant is added.
- Sync Enchant Lore considers only real enchants whose registry namespace is `minecraft`. It requires the complete normalized lore line to be the vanilla enchant name with an optional Roman or numeric level, updates only mismatched or missing levels, and preserves arrow/numeric formatting where present. It ignores custom enchant registrations and unrelated custom lore.
- The Protection VI enchant tool permits an otherwise incompatible Elytra only when it is a certified VoteTokens reward whose captured reward is also an Elytra and whose current Protection level is exactly V. It does not grant Protection to ordinary Elytras, advance lower levels directly, or allow Protection VII and above.
- Netherite upgrades require both the hidden VoteTokens reward marker and a matching configured source material for that trade id. This prevents generic diamond, gold, iron, or chainmail items from being upgraded through the vote menu. Conversion uses Paper's metadata-preserving item type replacement, then re-stamps and verifies the same reward id before charging. Foreign plugin PDC, custom augment lore, enchants, title, VoteTokens lore, and soulbind data are carried forward; arbitrary custom lore is not normalized or removed.
- Shield presets require a certified VoteTokens reward shield and edit Paper/Bukkit `ShieldMeta` directly. They preserve existing item metadata, hidden reward markers, and ItemSoulBind data while replacing only the shield base color and banner pattern layers. The resulting shield also receives Paper's `TOOLTIP_DISPLAY` data component to hide only the raw shield pattern lines, plus a single updated `Forged design` lore line for the selected preset.
- Unbreakable uses `CMIItemStack.setUnbreakable` from CMILib directly on the GUI input item, avoiding `/cmi unbreakable` command parsing and held-item assumptions. It requires a real Unbreaking level of at least 10 and verifies both that prerequisite and the final Unbreakable flag/lore before charging. The prerequisite is enforced by the dynamic GUI, preflight validation, and mutation code. If the real flag is already true, both Make Unbreakable and Unbreaking X are removed as actionable choices. Certification and successful tool actions lightly normalize known VoteTokens marker lore, such as the tier marker and unbreakable marker, without rewriting arbitrary custom lore.
- Tool item recognition first uses exact captured reward matching, then optionally allows captured display-name plus captured lore matching for vote rewards that were enchanted or upgraded while preserving identity.
- The soulbind tool writes `itemsoulbind:soulbinduuid` as a string in Bukkit persistent data when `tools.item-soul-bind-integration` is true. The value is the player's UUID. This matches the tag shown by `/cmi itemnbt <player>` under `PublicBukkitValues`. If the integration is disabled, VoteTokens falls back to its own marker only.
- Dynamic player values in commands are limited to safe Java names, dot-prefixed Bedrock names, or UUIDs.
- Player-facing chat output uses the VoteTokens feature prefix and escaped 1MB-CMIAPI message helpers; no player input is deserialized as MiniMessage.

## CMI And Paper Usage

VoteTokens depends on CMI, CMILib, and 1MB-CMIAPI-Lib like the rest of the feature jars. It uses CMI kit commands as the default reward transport. Enchant and Unbreakable tools use the CMILib item API directly, netherite conversion uses Paper's metadata-preserving `ItemStack#withType`, shield presets use Paper/Bukkit item metadata, and exact item capture and GUI logic use Paper/Bukkit ItemStack serialization and inventory APIs. Shield presets use Bukkit `ShieldMeta` for the design and Paper's `TOOLTIP_DISPLAY` data component to hide only `BANNER_PATTERNS` and `BASE_COLOR`, leaving the item name and VoteTokens lore visible without using deprecated tooltip flags or dispatching held-item commands from the GUI. ItemSoulBind is optional; the soulbind tool writes its standard persistent-data key directly instead of dispatching ItemSoulBind commands.

The plugin does not require VotingPlugin at runtime. VotingPlugin can continue to give the six token item types; VoteTokens only verifies and consumes those token items when players trade.

KitStreaks should ignore VoteTokens reward kits. Its default `tracking.ignored-kit-prefixes` includes `vote_tier_`, so CMI kit commands used as VoteTokens payout plumbing do not count as player `/kit` streak claims.

## Fair Alternatives For Players Who Cannot Vote

These are policy ideas, not automatic enforcement:

1. Let voters sell duplicate vote rewards in player shops.
2. Add occasional event rewards that grant one specific vote token type.
3. Add a slow weekly staff-run token exchange for players with regional voting blocks.
4. Let players trade large amounts of common event currency for one vote token.
5. Add community milestone giveaways when the server reaches a public vote goal.
6. Let players earn non-repeatable catch-up credits through staff-approved support tickets.
7. Add rare crate rewards that give a random vote token, not direct tier completion.
8. Add seasonal quests that grant a capped number of vote tokens.
9. Let players trade duplicate vote rewards back into tokens at a loss.
10. Allow trusted market stalls so collectors can buy rewards from voters.
11. Give one starter token set to brand-new players during a server anniversary.
12. Add Discord/community contests that reward token bundles.
13. Let players exchange old retired vote collectibles for matching migration progress after review.
14. Use server-wide raffle entries where vote tokens are one possible prize among many.
15. Keep direct staff grants limited to reviewed history so the GUI economy remains predictable.

## Testing

Recommended local tests:

- Capture all six token types from real token items: diamond, emerald, iron, gold, quartz, and netherite.
- Open `/votetokens` as a normal player and verify only player commands tab-complete.
- Try a locked tier/layer and confirm it does not open a trade.
- Try a trade with 63 matching tokens and confirm it fails with a readable need/have token count instead of a long repeated token sentence.
- Try a trade with 70 matching tokens in one stack and a full inventory and confirm it fails without consuming tokens.
- Try a trade with 70 matching tokens and one free slot and confirm exactly 64 are removed.
- Confirm the player data file increments the trade count and unlocks the next layer after all six items are complete.
- Capture all six extra token types, open the tools page, place an eligible vote reward item in the input slot, and confirm the item returns on close.
- Place an item in the tools input slot and confirm `escrow/<uuid>.yml` appears; remove/close the menu and confirm the escrow file clears.
- Fill the player's inventory, close the tools GUI with an item in the input slot, and confirm the item stays in escrow and is restored after making space.
- Simulate stale escrow while the matching item is already in the player's inventory and confirm recovery is blocked for staff review instead of returning a duplicate.
- On a disposable test copy, corrupt an escrow YAML file and confirm it moves to `escrow/quarantine/`, remains byte-for-byte available for staff inspection, and is not interpreted as an empty record.
- On a disposable test copy, deny deletion of a readable escrow record during recovery and confirm the returned inventory item is rolled back. Also verify the server and audit log clearly flag the possible-duplicate outcome if that rollback is deliberately forced to fail.
- Click the Tool Cost chest and confirm the read-only extra-token preview opens with the captured lapis, emerald, iron, gold, redstone, and copper items.
- Click the Tool Cost chest while a tool item is in the input slot and confirm that item is returned before the preview opens.
- Try a tools upgrade without one of the six required extra token stacks and confirm the input item and tokens are unchanged. The chat response should use a short summary plus one readable line per missing extra token type.
- Try each default tools upgrade with six matching extra-token stacks and confirm the item changes once, the extra tokens are removed, and `logs/player-tools.log` receives an entry.
- Place a certified reward with Unbreaking below X in the main Tools page and confirm Make Unbreakable is a gray `Requires Unbreaking X` item. Attempt the action directly and confirm it is rejected before token checks. Buy Unbreaking X and confirm one tools cost is consumed, the enchant view changes to `Already Unbreaking X`, and Make Unbreakable becomes available after returning to the main Tools page. Buy Make Unbreakable and confirm a second tools cost is consumed, the real flag and `Forged to Unbreakable` lore are present, and both durability actions become unavailable.
- Place an already-Unbreakable vote reward in the tools GUI and confirm Make Unbreakable becomes unavailable. Open Enchant Upgrades and confirm Unbreaking X is also unavailable. Directly attempt both actions and confirm they are rejected before token-cost checks without changing the item or consuming extra vote tokens.
- Give a certified reward real Unbreaking IV, Mending II, and Protection IV enchants while its hidden-enchant lore says `Unbreaking III`, plain `Mending`, and `Protection V`; run Sync Enchant Lore and confirm those lines become `Unbreaking IV`, `Mending II`, and `Protection IV` without consuming tokens or changing the real enchants.
- Add custom lore such as `Sage II`, `Banana 5`, and `Efficiency Boost V` to the same item and confirm Sync Enchant Lore leaves every custom line unchanged. Run it again and confirm it reports that the vanilla lore is already current without mutating the item.
- Place the Dragon Breath EXP reward in the tools slot and confirm it is rejected. If already present from an older open GUI, confirm every tool button rejects it without consuming extra tokens or changing the item.
- Move an item between the tools hub and enchant view, then close the GUI and confirm the item returns exactly once.
- Try Fortune and Looting items and confirm no Fortune/Looting upgrade option exists.
- Try the configured netherite upgrade items and confirm the material changes while title, lore, enchants, soulbind, and the `onembcmi:votetokens_reward` marker stay intact.
- Add foreign-plugin string and integer PDC plus custom `Sage II` and `Banana 5` lore to the certified chainmail chestplate and boots. Convert them to netherite, confirm all foreign data, lore, enchants, damage, and soulbind metadata survive, then confirm Protection VI and Sync Enchant Lore still recognize and modify the converted certified rewards.
- Try a certified vote reward with no configured netherite entry and confirm the netherite button rejects it without consuming extra tokens.
- Open Shield Presets with the captured Tier 3 Layer 1 shield, apply all nine presets once, and confirm the shield design changes while title, lore, PDC reward marker, soulbind data, and other metadata stay intact. Confirm the raw banner-pattern tooltip is hidden and the lore shows one updated `Forged design: <preset>` line.
- Try Shield Presets with a certified non-shield vote reward and confirm it rejects the item without consuming extra tokens.
- Try a renamed non-vote item with matching material and confirm the tools page rejects it.
- Hold one base reward item and run `/votetokens admin create 3 1 1 Test Shield unbreakable enable`; confirm the held item gets styled, hidden flags are present, `rewards.yml` stores `reward.item`, and only Tier 3 Layer 1 Item 1 is enabled.
- Run the same create command with `draft`; confirm it captures the preview item but keeps that item disabled.
- Use `/votetokens admin inspectheld` on a captured token, extra token, stamped reward, relaxed legacy reward, and unrelated item.
- Use `/votetokens admin certify` while holding a matching legacy reward and confirm it auto-detects the captured reward; repeat with `/votetokens admin certify <online-player>` while that player holds the item.
- Enable only Tier 3 Layer 1 Item 1 and confirm Tier 3 Layer 1 items 2-6 show disabled, Tier 3 Layer 2/3 remain disabled, and none of those disabled entries count toward enabled progress.
- Use `/votetokens admin grant` to migrate one old item and confirm progress changes.
- Use `/votetokens debug all` and `/1mbcmi debug plugin votetokens all` to verify command, permission, placeholder, config, and health output.
