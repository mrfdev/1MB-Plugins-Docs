# Forage external item protections, 11 October 2026

## Original source-review status

This is a source and development-test follow-up to the Halloween Virus comparison. It is **not deployed in beta build 736**. No beta restart, live JAR replacement, account edit or gameplay configuration change is part of this work. A configuration reload cannot load these Java changes. The next approved maintenance window must use the synchronized suite build for both maintained servers, followed by checklist S04c–S04e and connected-client acceptance.

## Build 737 startup finding and corrective deployment

The later canonical build 737 synchronized the managed suite and started on Paper 26.3 BETA 174, but the CMI alias guard reported unavailable protection. Forage correctly paused tool use rather than allowing gathering without that guard; loaded menus alone were not proof that the plugin was ready.

A native probe on the exact Paper 174 runtime confirmed that its forwarding command map extends `HashMap` while delegating map access to another backing map. Its inherited `forEach` and `replaceAll` methods see the unused internal table. The guard used those methods, so it failed to replace and track the real CMI alias command registrations even though ordinary command lookup returned them. This was a runtime-map compatibility failure, not a missing CMI permission or a reason to disable tool protection.

Corrective suite build 738 replaces those bulk operations with a snapshot of the actual `entrySet`, followed by identity-checked `get`/`put` changes. Every command label keeps its wrapper, and closing one guard restores only registrations it still owns without removing another feature's protection. Four forwarding-map regressions failed twice before the correction; all 23 CMI alias tests then passed.

The canonical build completed with 4,191 tests, zero failures/errors and 11 skips; all 663 Forage tests passed with no skips. All 66 managed JARs were synchronized and verified in both maintained server instances. The native Paper 174 probe with CMI 9.8.10.4 passed at both 100 and 300 ticks, with no raw CMI alias registrations remaining outside the wrappers. The beta then started build 738 at 17:41:33 on 11 October 2026. At 17:41:48, its actual CMI 9.8.10.5 command, alias and virtual-anvil guards reported active; mcMMO, Pyro and ItemSoulBind guards were ready, storage was available with no failure, and configuration reported zero errors, one expected normal-preset warning and 35 passing checks. These are startup and native-probe results, not a claim that a connected player completed tool purchases or the beta checklist. The earlier development-test totals below remain historical evidence; they do not establish that the native Paper startup path passed.

## Reviewed boundaries

Forage and Halloween Virus already share the same Pyro inventory callback and points-shop guards. They identify items by PDC, including malformed/legacy markers; they do not grant an OP or permission exception. Reviewed GUI actions are withheld before Vessel/Augment mutation or points charges. Vanilla station guards, CMI virtual anvils and mcMMO repair/salvage protections were also compared. Forage's approved-state and tracked-durability checks remain additional backstops.

The beta's configured `/points` item services were also inspected: hand/armor/all repairs use direct `cmi repair %player% ...` commands; curse removal uses direct `cmi enchant %player% ... clear -inform` commands. These use the shared pre-charge predicate. No currently configured item service invokes an unknown custom CMI alias; new custom alias purchases need their own pre-charge review.

The comparison identified three additional entry points:

1. ItemSoulBind's actual binding commands and automatic registration listeners were guarded for Halloween Virus but not for Forage. Binding changes behavioral PDC that Forage deliberately does not erase as unknown metadata.
2. Forage's remote-recipient scan missed CMI nickname/partial-name and `itemname -p:` forms. CMI's dynamically registered shortcut commands can also invoke its command manager directly, bypassing the root PluginCommand executor when another plugin dispatches the shortcut.
3. PyroMining's administrative `addvessel` command modifies a held pickaxe without its inventory callback. Its separate Vessel removal callback can also charge Zeta before changing an already modified tool. Later quarantine of modified tools is insufficient as prevention.

The follow-up adds provider-bound command/callback interception and local online-recipient checks. CMI's alias guard reads the definition retained by the actual `ReflectCommand` through isolated, version-gated reflection because the public alias cache may return a different definition and there is no public identity getter. It follows the reviewed single-command fast path; ordinary specialized/multiple-command execution retains CMI's normal dispatch. Shared wrappers compose independent feature owners; detaching one must leave the other's protection intact, while the last owner restores only registrations it still owns. Unrelated items retain normal provider behavior. The `/cmi itemname` fix remains: naming ordinary dirt in the main hand is allowed when a Forage tool is elsewhere in inventory.

After CMI aliases change, refreshing the guard checks the current registrations without leaving tools permanently paused for a removed alias. Previously observed alias meanings remain guarded because Paper may retain their original command objects in cached Brigadier nodes. This can conservatively refuse an old modifying shortcut until a full server restart; restarting the guard alone does not prove those cached nodes are gone.

## Provider and API evidence

- Beta: Paper 26.3 BETA 174, CMI 9.8.10.5, ItemSoulBind 1.8.3, PyroMining 4.6.1, PyroFishingPro 4.9.35, PyroWelcomesPro 0.5.1 and PyroLib 1.6.0.
- Maintained Paper server: CMI 9.8.10.4; the relevant CMI shortcut and alias manager bytecode matches 9.8.10.5.
- Commercial JARs remain local, with no redistribution. Reviewed provider identities and both servers' initial JAR/configuration hashes are recorded under `.scratch/forage-protection-parity/`.
- Primary Paper discovery: [live documentation index](https://docs.papermc.io/llms.txt), [event listeners](https://docs.papermc.io/paper/dev/event-listeners/), [handler lists](https://docs.papermc.io/paper/dev/handler-lists/), [RegisteredListener](https://jd.papermc.io/paper/26.3/org/bukkit/plugin/RegisteredListener.html) and [PluginCommand](https://jd.papermc.io/paper/26.3/org/bukkit/command/PluginCommand.html). Hosted 26.3 Javadocs identify build 157; signatures were also checked against the locally resolved exact build 174 API. Existing providers use Bukkit commands, so the compatibility wrappers use that public API even though Paper now prefers Brigadier for newly authored commands.

## Verification

Initial Forage, selected Halloween Virus guard/owned-Pyro-fixture, and shared item-guard tests passed before changes. Regression tests demonstrated the missing Forage binding check, unsupported CMI recipient forms, CMI alias bypass and refresh failures, and PyroMining command/removal gaps before production fixes.

The original combined development run passed **2,496 tests**, with no failures, errors or skips:

| Suite | Tests |
| --- | ---: |
| Shared library | 432 |
| Forage | 425 |
| EventHunts, including Halloween Virus | 1,639 |

Run with JDK 25.0.4.1, the installed mcMMO fixture and the local Pyro fixture directory containing both reviewed PyroLib versions:

```sh
FORAGE_PYRO_FIXTURE_DIR="$PWD/.scratch/forage-protection-parity/fixtures" \
FORAGE_MCMMO_FIXTURE_JAR="$PWD/servers/Forage-26.3/plugins/mcMMO.jar" \
HV_PYRO_FIXTURE_DIR="$PWD/.scratch/forage-protection-parity/fixtures" \
gradle :libs:1mb-cmiapi-lib:test \
  :plugins:player-fun:forage:test \
  :plugins:player-fun:coconuthunt:test --console=plain
```

The log and XML totals are recorded in `.scratch/forage-protection-parity/combined-tests.log` and `combined-test-results.json`. This is development verification, not a distributable suite build.

Fixtures exercise provider ownership, command/callback interception, ordinary-item controls, malformed/legacy markers, OP behavior, recipient selection, points preflight, independent feature detach and provider-registration replacement. Actual CMI shortcut execution uses the maintained 9.8.10.4 binary; matching relevant 9.8.10.5 bytecode and version cases were checked, but its binary was not independently executed in that fixture. The Mining command fixture enters the real provider for the ordinary-dirt refusal and proves protected tools never reach it. Its removal fixture checks the actual vendor class, callback annotation and translation schema with a counting executor at the public registration boundary; the raw callback body needs Paper's legacy inventory remapping and was not executed end-to-end. ItemSoulBind fixtures verify withholding of the reviewed registration callbacks, not the full vendor body.

A post-change hash comparison checked 177 installed JAR/configuration files across both maintained servers with no changes. The beta Java process remained listening on port 22442.

No connected-client acceptance is claimed for these pending changes. Arbitrary trusted plugin code can still set item data directly; new providers, new mutation routes and provider-version changes require review. Existing Pyro data and the reviewed ItemSoulBind owner/group keys pause a Forage tool for staff inspection rather than being removed or automatically approved. Unrelated PDC is preserved. Binding-on-use/equip/pickup lore is handled at ItemSoulBind's registration callbacks, not by treating arbitrary lore as Forage identity.
