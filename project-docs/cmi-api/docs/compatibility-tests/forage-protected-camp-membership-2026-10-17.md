# Protected-camp membership and dedicated staff permission

This extends the [initial protected-camp whitelist](forage-protected-camps-2026-10-17.md) with the owner-requested access restrictions. Development and verification are limited to the two maintained local test servers. No live-server access or permission grants are part of this change.

## Contract

With the default global-only rule enabled, every named WorldGuard region at the Camp Anchor must be approved for that actual world, and the acting player must be an owner or member of each region. The adapter checks the authoritative server UUID and WorldGuard group membership, including inherited parent membership. Deprecated name-only entries cannot authorize access. Operators, WorldGuard bypass and Forage admin permissions do not bypass membership. Unclaimed/global-only locations and absence of WorldGuard retain their existing behavior; disabled/failed/virtual region results fail closed.

Membership is rechecked during registration and camp service validation, including the Initial Camp dependency of Secondary Camps and stale workstation sessions. Revocation pauses access without deleting camps, introductions or progress. World/biome, exclusive ownership, physical camp, proximity, introduction and transaction requirements remain in force. Gathering, Brush and Dust retain their independent global-only guard. Cancelled WorldGuard interactions stay cancelled.

`onembcmi.forage.camps.regions` is the dedicated permission for `/forage admin camps regions list|add|remove` (and its debug alias). It defaults to false for all players, including operators, and is not inherited from the broad Forage admin node. Console remains authorized. A designated staff member with only the dedicated node can use the exact configuration route while active or dormant, without receiving other admin controls. WorldGuard/WorldEdit permissions remain separate. No permission is granted by this implementation.

## Verification

Verified on 17 October 2026 in synchronized suite **1.0.4-781**, Paper **26.3 STABLE build 200**, WorldGuard **7.0.19+2400-f395a16**, WorldEdit **7.4.6-beta-02**, JDK **25.0.4.1** for compilation and Java **27+35-2325** for the test servers.

- The canonical build passed **6,258 test cases: 6,217 passed, 41 existing optional skips, no failures or errors**. Forage accounted for **2,537 cases: 2,509 passed, 28 skips**. The initial focused pass covered 101 cases before the additional delegate-tab regression was added.
- Permission tests exercise the actual shared command gateway, dedicated-only access, denied broad-admin/OP access, command help and tab visibility, independent default-false metadata, dormant writes, and denial of unrelated admin controls. The rollback permission baseline remains unchanged; the new explicitly requested node is declared separately and its opt-in default and independence are enforced.
- Membership tests cover UUID owners/members, all overlaps, parent/group membership, revoked membership, renamed and Floodgate-style identities, rejected name-only/bypass authorization, missing/mismatched UUIDs, unavailable providers and malformed/cyclic region data. Actual registration and camp-service integration checks reject outsiders and stale sessions, enforce the Initial Camp dependency and preserve saved progress.
- The temporary native probe passed **64 checks** against actual WorldGuard and production camp/gathering methods. It also verified Bukkit's registered permission defaults and detached operator/non-operator permission holders: broad admin alone is denied, a dedicated-only attachment grants the new node without broad admin, and removal revokes it. No permissions were assigned to actual users.
- Both test servers started on matching sets of **66 managed JARs**. Each reported **zero Forage configuration errors**; the two existing advisories remain the intentional normal balance preset and shared Sands family. The Paper instance shut down cleanly and remains stopped. Forage beta is running on build 781.
- All **1,907** backed-up Forage/configuration/kit/WorldGuard files remain semantically unchanged. Kit contents and world protections are preserved; changed bytes were serialization/comments or server-properties timestamps. The temporary probe and region definitions were removed.

The probe had exact local-path, suite/Paper version and zero-online-player gates. It used synthetic player/permission fixtures, remote region geometry without accessing world blocks, and detached settings restored in `finally`. This is automated server-level verification, not a connected-client gameplay session. The live server was neither accessed nor changed.

## Included wording follow-up: build 782

Suite **1.0.4-782** retains the protected-camp implementation and adds the approved three-line Unclaim Camp confirmation:

```text
Release your Wild camp?
Your progress stays saved.
New camp: repeat the Local Introduction.
```

The first line uses the camp's formatted logical world name. Each sentence is a separate lore entry. An additive `GuiService.openConfirmation` overload accepts multiple lines; the existing String signature and other confirmation callers retain their previous behavior. Page identity, layout, permission and ownership checks, transaction identity, confirmation callback and saved-data handling are unchanged.

The canonical build again passed **6,258 cases** (6,217 passed, 41 existing skips), including shared API compatibility and the protected-camp regression tests. Both maintained local servers started on the matching 66-JAR suite and reported zero Forage configuration errors, with the same two existing advisories. Kits, Forage progress, and WorldGuard data were checked against stopped backups. Evidence is in `.scratch/forage-unclaim-lore-2026-10-17/`. No live-server access, deployment or restart was performed.

## API review and evidence

Reviewed the current [Paper documentation index](https://docs.papermc.io/llms.txt), [permission metadata](https://docs.papermc.io/paper/dev/plugin-yml/), exact [Paper 26.3 permission defaults](https://jd.papermc.io/paper/26.3/org/bukkit/permissions/PermissionDefault.html) and [entity identity](https://jd.papermc.io/paper/26.3/org/bukkit/entity/Entity.html#getUniqueId()), and [WorldGuard region domains](https://worldguard.enginehub.org/en/latest/developer/regions/protected-region/). Installed WorldGuard 7.0.19 public signatures were verified with `javap`. The optional adapter uses public APIs through reflection without a hard dependency or external player lookup.

Evidence is retained in `.scratch/forage-protected-camp-membership-2026-10-17/`, including stopped configuration/data backups, focused tests, the canonical build log, native fixture source/results and preservation checks.
