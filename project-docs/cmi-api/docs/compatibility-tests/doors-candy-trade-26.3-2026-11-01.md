# Halloween candy exchange: Paper 26.3, November 1, 2026

**Build 829 passed the canonical suite build and local native verification.**
All 68 matching JARs are staged for manual deployment. The local server is
stopped, and no live server files or real player rewards were changed.
A human-client acceptance trade remains the owner's final deployment check.

## Approved behavior

- `/doors trade` and the Doors overview open a gift preview, accepted-candy
  count and explicit confirmation. The default cost is 256 individual items
  in any mixture of the already-issued `hdc01`–`hdc10` candy templates.
- Native item similarity checks complete metadata, components and PDC while
  ignoring stack quantity. Normal food, simple name copies, modified metadata,
  invalid overstacked quantities, offhand/armour and nested containers do not
  provide payment. Legacy candy has no unique provenance marker, so an exact
  copy of its full identity cannot be distinguished from the original.
- One gift is allowed per actual player UUID and configured season, including
  Floodgate UUIDs. Door/progression resets do not reset the trade ledger.
- The item-only, disabled CMI kit `halloweencandytrade` gives one nether star,
  heavy core, conduit, Otherside music disc, Vex armour-trim template and signed
  six-page staff thank-you book, with individual names/lore and keepsake PDC.
  Delivery uses the existing console CMI kit adapter. CMI handles overflow drops;
  there are no LuckPerms grants or commands embedded in the kit.
- The ordinary manual claim worlds, Survival/Adventure restriction, AutoSell
  safety and season claim expiry apply. The 2026 cutoff is intended to remain
  November 8, 00:00 Europe/Amsterdam, exclusive. The module remains enabled
  after the knocking event so claims and trading can continue until then.
- Durable reservation, effect boundary and terminal records prevent automatic
  replay. Verified no-payout plus exact refund permits retry. Uncertain
  delivery closes as collected with an audit/ticket reference under the owner's
  policy; it does not require staff review before unrelated event claims.

See [administration and deployment](../plugins/doors-administration.md#halloween-candy-exchange),
[player instructions](../plugins/doors.md#what-can-i-do-with-spare-halloween-candy),
and [kit authoring notes](../../config/cmi/kits/HalloweenCandyTrade.README.md).

## Platform review

The tested runtime is Paper **26.3 STABLE build 236**, commit **f119026**, with
Oracle Java **27.0.1.0.3+1-2**. Compilation used Oracle **25.0.5.0.3+1-LTS-2**,
targeting Java **25**, class major **69**. The dynamically discovered paths were:

- Compiler/Gradle: `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home`.
- Tests/Paper: `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home`.

These are recorded observations, not hardcoded build configuration. The normal
Oracle selector scripts continue to discover installed patch versions each run.
Runtime SHA-256: `d293ed640a691336de666e99df1d0f84c198937c56545860c35cdc4f953ff19f`.

Reviewed discovery and API references:

- [Paper documentation index](https://docs.papermc.io/llms.txt)
- [Paper PDC guide](https://docs.papermc.io/paper/dev/pdc/)
- [Paper 26.3 BookMeta](https://jd.papermc.io/paper/26.3/org/bukkit/inventory/meta/BookMeta.html)
- [Paper 26.3 ItemStack](https://jd.papermc.io/paper/26.3/org/bukkit/inventory/ItemStack.html)

Exact bundled build-236 API metadata and installed CMI **9.8.11.0** signatures
were checked independently. Public 26.3 Javadocs still label build230; the
verified bundled API SHA-256 is
`018711f361a950cd8f07a132b71e6a170632a919c2666421084745aaa8eed167`.
The official [236 change](https://github.com/PaperMC/Paper/commit/f11902627b7de4de03f2a056f14a6b547fb5a90e)
only fixes data counts for furnace/brewing/lectern custom menus, with no chest
GUI, API or configuration-default change. The current roadmap and configuration
defaults were reviewed; local exploit protections remained unchanged.
No NMS or reflection was introduced into production code.

## Completed authoring checks

- Source `config/cmi/kits/HalloweenCandyTrade.yml` is human-readable CMI/Paper
  item YAML. Its template is disabled, permits overflow, and has six amount-one
  gifts without commands, cost or a CMI maximum-usage restriction.
- The native probe compiles using dynamically selected Oracle 25 with
  `--release 25`; the standalone layout checker runs on Oracle 27. The generated
  probe class files have major version 69.
- Book pages have **9, 9, 11, 11, 10 and 13 explicit lines**. Per-page maximum
  widths are **96, 101, 98, 104, 101 and 105 pixels**, measured through the
  Paper Minecraft font; this fits the 114-pixel book line width.
- Source diff whitespace checks pass. These checks do not substitute for
  native CMI loading or payout verification.

## Verification results

| Gate | Result |
| --- | --- |
| Canonical full suite | `scripts/build-all.sh` completed build829 against Paper236; 7,995 tests, 7,954 passed, 41 optional fixture skips, 0 failures/errors. |
| Dedicated candy tests | 98 passed: service34, durable store8, inventory guard25, GUI11, module integration5, commands12, config3. |
| Native CMI kit | Six exact native items loaded; disabled, overflow enabled, no embedded commands/cost/usage cap; names/lore/PDC and serialization round-trips passed. |
| Book | Six pages, at most13 lines and105px width; full native page/title/author content matched. |
| Native engine | All40 actual CMI candy templates matched; extraPDC/name-only/changed lore rejected; exact256 mixed debit with full inventory and six gifts/two controlled overflow items passed. |
| Duplicate/restart |20 rapid confirmations produced one controlled payout; production ledger closed/reopened and blocked another debit for the same UUID/season. Unit tests cover competing claims, reconnect, stale sessions and boundary crashes. |
| Failure/refund | Native proven-no-effect refund restored exact candy; uncertain result closed with audit/no replay. Injected durable writes before/after commit and partial inventory mutations passed unit checks. |
| Admission | Permissions, actual online session, death, worlds, Survival/Adventure, expiry boundary, AutoSell and configuration revalidation passed. Full inventory is allowed. |
| Offer consistency | Changed gift items/amounts and candy templates at confirmation and both async save boundaries cancel without spending candy. |
| GUI | Custom holder/session flow and alternative click/drag actions tested; isolated preview/confirm slots and explicit private messages; old Treat Bag claim regression tests pass. |
| Native commands | Trade preflight passed; price512 persisted then restored to256; `/doors reload` retained256; existing47 reward preflight passed; candy-exchange health PASS. |
| Native lifecycle | Paper236 startup/shutdown exit0, no ERROR/SEVERE/Exception lines; disposable helper removed; pre-existing local event settings unchanged. |
| Complete handoff |68 JARs byte-for-byte match tested server;2,576 owned classes are Java25 bytecode; ZIP CRC and kit checksum verified. |
| Human client / real CMI command payout | Not performed for the new trade. Native engine uses a synthetic inventory and controlled provider; CMI kit loading is real. Existing console CMI payout adapter remains the same path already used by Door claims. Owner should perform one acceptance exchange. |

Source and installed gift-kit SHA-256:
`2bcce9287aeb0d8e77e83629ba4cab9252351816d8f5c164d0df828c772a4ec8`.

Evidence is in `.scratch/candy-trade-release-2026-11-01/` (`build-all.log`,
`test-summary.json`, `local-smoke-236.json`, `local-runtime-236.log`, `stage.log`,
`handoff-manifest.json`) and `.scratch/candy-trade-kit-2026-11-01/`
(`native-verification.txt`, `engine-native-verification.txt`, `book-layout.txt`).
The focused Paper review/signature evidence is under
`.scratch/candy-trade-review-2026-11-01/`.

Manual handoff: `build/handoffs/halloween-candy-trade-829/` (or its sibling ZIP),
containing68 matching JARs, the one new CMI YAML, README and checksum manifest.
The canonical flat JAR set is `build/tested-jars/live/`. All68 are also installed
in `servers/Paper-26.3/plugins/`; no test helper is included. The local latest
Paper JAR is `servers/Paper-26.3/Paper-26.3-236.jar`.

## Native probe procedure

Local scratch tooling is retained under
`.scratch/candy-trade-kit-2026-11-01/`. `prepare.py` compiles the helper and runs
the book-layout check without starting a server. The server coordinator places
the gift kit in the maintained local CMI Kits directory and installs the local
probe only for the test run.

On native Paper startup, the helper checks the source/installed YAML against
independently authored ItemStacks, the actual loaded CMI kit, its flags, exact
item names/lore/PDC and complete book content. It checks Paper byte and CMI YAML
round-trips and writes `native-verification.txt` plus a canonical serialized
kit. The explicit `candytradekitverify` console command can repeat the kit
check. This helper does not pay a real player or change world blocks. Separate
service probes and connected-player acceptance must be distinguished from
this item-format check in the completed report.

Remove the temporary helper JAR after the local server stops. Do not include
it in the live handoff. Copy only the reviewed gift YAML and the complete
tested managed suite when the owner performs the live restart.

## Known delivery policy and limits

The separate `candy-trades.dat` ledger is authoritative for the once-only
allowance and survives normal Doors profile resets. Preserve it with the
Doors data during backup/restore. There is no administrative reset/replay
command for uncertain trades in this release.

Minecraft player inventory and an external CMI command are not one atomic
transaction. A crash after the durable effect boundary may leave a closed
trade with no provable gift delivery. In accordance with the owner's explicit
choice, the plugin does not automatically replay the gift or refund after
that uncertainty. It retains audit evidence and a player ticket reference.
Command dispatch acceptance alone is not asserted to prove item delivery.

The live server remains untouched by development. The owner stops it,
replaces matching suite JARs and installs the new kit, then starts it and
checks trade preflight, settings and the existing reward expiry.

## Follow-up: already-issued candy recognition correction

**The configuration-only correction is deployed and checksum-verified; it is
awaiting the owner's `/cmi reload`. No restart or replacement JAR is required.**
The deployment coordinator replaced only
`plugins/CMI/Kits/HalloweenDoorCandies.yml`. The original file is backed up at
`plugins/CMI/1mb-candy-recognition-backups/20261101-152451/HalloweenDoorCandies.yml`.
No reload, server command, inventory edit or reward payout was performed during
deployment. After `/cmi reload`, close the old menu and reopen `/doors trade`.

The initial native engine test above filled its synthetic inventory with clones
of the loaded CMI templates. It verified native item handling and transaction
safety, but did not cover the difference between configured templates and
already-issued items. A real saved inventory exposed that missing case: CMI's
kit-delivery formatting changes the name/lore component representation, while
preserving the displayed text and color. Strict native similarity consequently
rejected the old flat template representation.

The diagnostic replay used only copied inventory items and copied live kit YAML,
with the unchanged build 829 recognition code on Paper 236 and CMI 9.8.11.0. The
NBT extraction round-tripped the original bytes exactly, retained tag types and
DataVersion 5023, and exported only inventory items. No player identity or other
player data is needed for the durable verification record.

| Focused check | Result |
| --- | --- |
| Original real inventory and original templates | Red: 327 legitimate candy units in 36 stacks were recognized as 0; service ready and 40 templates loaded. |
| Minimal original fixture | Red: a single 6-candy stack was recognized as 0. |
| Same original inventory, formatting-only candidate | Green: 327/327 units recognized across all 36 unchanged stacks, covering 35 distinct candy definitions. |
| Actual CMI formatting of all original definitions | 40/40 outputs from the installed `Kit.getItems(Player)` formatting path matched the candidate exactly, including amount. A null recipient was used after verifying every name/lore was static and contained no placeholders. |
| Future issuance stability | 40/40 candidate definitions stayed identical after both the first and second pass through that same installed CMI formatting path. |
| Negative controls through the unchanged recognition method | Ordinary food, copied name only, extra foreign PDC, changed lore, changed name color and oversized stacks each counted as 0. |
| Independent configuration review | 10 kits and 40 definitions checked; only 80 custom-name/lore YAML scalar representations changed. Materials, quantities, text, RGB colors, lore order, italics, other item/kit data and comments remained identical. No PDC was added or other metadata removed. |

The corrected templates use the same empty text root, child component and
explicit false decorations that CMI produces when giving these candies. Native
`ItemStack.isSimilar` remains unchanged: the correction does not introduce a
name-only fallback or ignore unrelated metadata. This is a kit YAML correction,
not a plugin-code change or new build.

The same component correction was applied to the repository's
`config/cmi/kits/HalloweenDoorCandies.yml` and the maintained test server's
corresponding CMI kit. Each retained its own existing non-component settings,
including local `DropOnGround` and `Delay` keys absent from the live file. All
40 parsed item components match the native-tested live correction. The source
and test files share SHA-256
`fa3fa4fb3490781f6818806774bf6687cf41a236bb454ad15997e612e8428182`;
their different checksum from the live file reflects preserved settings and
headers. No JAR or plugin source changed for this correction.

Verified corrected kit SHA-256:
`f95f6c391ce3c6c57baaa1f5d5b31cb44d1f316223a856ae6f1accbd6dc11099`.
Original kit SHA-256:
`7953ad2848b94a454d1f7560fd0d741ea35d05c7a19b350cf19c38e6e1af4aa6`.

The manual fallback package is
`build/handoffs/halloween-candy-recognition-829/`: the tested
`HalloweenDoorCandies.yml`, `SHA256SUMS.txt` and concise activation instructions.
It contains no JARs or player data. Scratch evidence is under
`.scratch/candy-recognition-2026-11-01/`, particularly
`manifest-result.json`, `slot0-result.json`,
`manifest-format-only-canonical-result.json` and `check-result.py`.
The independent 40-definition review and checksums are in
`.scratch/candy-trade-review-2026-11-01/format-only-candidate-review.json`.

The owner still needs to confirm the corrected count after reloading CMI and
perform the live acceptance exchange. The diagnostic did not award a real gift
or consume a real player's candy.
