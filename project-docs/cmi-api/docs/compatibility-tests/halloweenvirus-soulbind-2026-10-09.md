# Halloween Virus soulbind protection, 9 October 2026

Issued protected Halloween Virus items cannot acquire or change soulbind through ItemSoulBind, VoteTokens or AFKShrine. Existing owner/group binding data is preserved. Staff template markers alone do not establish issued identity and remain editable.

## Diagnosis and change

The installed ItemSoulBind 1.8.3 exposes no cancellable binding event. Its actual commands are `binditem`, `bindall`, `unbinditem`, `groupbinditem`, `remotebinditem`, `bindinvitems`, `bindonuse`, `bindonequip` and `bindonpickup`. Blocking a generic `/soulbind` label does not cover these routes. Its seven automatic registration callbacks also process cancelled Bukkit events.

`HvSoulbindItemGuard` guards those provider-owned command executors, including Bukkit dispatch, and only the provider's identified registration callbacks. It checks the actual targeted item or inventory scope before metadata writes. Suppressing an automatic registration callback does not cancel pickup, inventory movement, equip, drop or use. Existing protection and death-recovery listeners remain installed. The guard uses public Paper command/listener registration APIs, with provider and callback identity checks and reversible detach; it does not read or rewrite private provider fields.

The points adapter checks binding commands before purchase deductions. VoteTokens and AFKShrine also reject HV identity before their direct soulbind writes and before payments, including items that retain valid identity from both systems. Existing bindings and unrelated PDC are not rewritten.

The protection is permanent while EventHunts is installed, including dormant events. `/hv admin validate` reports ItemSoulBind readiness. Missing required command/callback coverage blocks protected reward issuance without changing event progress or saved templates. A provider version string alone neither proves nor rejects compatibility; changed callback contracts require review.

## Verification

Baseline build 734 on Paper 26.3 build 166 reproduced **20 protection failures in 59 native checks** against the real ItemSoulBind 1.8.3 provider. Ordinary-item controls passed. The baseline showed command binding, automatic binding and removal of an existing binding on issued HV items.

Focused regressions cover remote inventory slots, configured command aliases before charging, hotbar substitution, ordinary and authoring-template controls, binding preservation, provider readiness and restoration of owned executors. VoteTokens and AFKShrine tests first reproduced their direct-writer gaps before adding the checks.

Canonical suite build **735** passed on JDK 25.0.4.1: **3,631 tests, zero failures/errors, one unrelated WorthDrift fixture skip**. The affected suites had no skips: EventHunts 1,634, AFKShrine 186 and VoteTokens 41. All **66** synchronized JARs matched their build outputs by SHA-256.

The build workflow updated the maintained server to **Paper 26.3 BETA build 167**, running Java 27. The official [build 167 change](https://github.com/PaperMC/Paper/commit/21a495c9) was reviewed against exact API metadata and Javadocs. The addition is three read-only entity gravity/drag getters; command, event, inventory and PDC APIs used by these guards are unchanged. Relevant configuration defaults and deprecations are unchanged. Official build metadata matched the staged server checksum. The full source captures and exact API comparison are retained under the scratch `paper167/` directory.

The final real-provider fixture passed **98 checks with zero failures** on Paper 167 and ItemSoulBind 1.8.3. It covered command executors and Bukkit dispatch, remote inventory slots, inventory-wide commands, all seven automatic-registration callbacks, hotbar substitution, existing binding preservation, and ordinary controls. ItemSoulBind, CMI and points guard readiness remained active together.

An actual PyroWelcomes soulbind purchase on protected boots retained all **1,000** test points and unchanged item data. The ordinary-item control charged exactly **37** points and applied the binding while another protected item remained in the inventory.

The server exited cleanly with code 0. The temporary fixture, transient player-list entries and Pyro profile/menu records were removed, and in-memory provider settings were restored. The maintained test server was left stopped.

Scratch evidence is retained under `.scratch/hv-soulbind-2026-10-09/`; VoteTokens regression logs use `.scratch/hv-soulbind-votetokens-*.log`. Owned provider binaries are not redistributed. No live server configuration, player data or kit templates were changed.

## Client acceptance

With the matching suite installed and the server restarted, run `/hv admin validate`. Test held and remote binding commands on an unbound issued HV item, automatic binding triggers on protected items, and an already-bound issued item. Confirm no new owner/group/lore is added or removed, while ordinary eligible equipment still binds. Bulk binding commands are refused if their scope includes protected items; use the held-item command for an ordinary item in a mixed inventory. Also confirm VoteTokens and AFKShrine soulbind attempts do not spend currency on protected items.

Native callback fixtures complement connected-client acceptance. Arbitrary trusted plugin code directly calling item setters or private provider methods remains outside the guarded entry points.
