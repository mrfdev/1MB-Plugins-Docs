# Forage workstation access during menu navigation

Status: source fix verified on 11 October 2026, pending an approved coordinated build. Running Forage beta build 736 was not restarted, reloaded or replaced.

## Report and reproduction

After entering Forage through an owned composter, a tester visited `/menu` and returned through `/forage`. The hub still advertised Skill Branches and other camp activities as usable, but clicking them returned “Use your own camp workstation to open this activity.” The player remained beside their complete Initial Camp.

Two production paths discarded the physical workstation visit: every accepted player Forage command removed it, and inventory-close cleanup removed it one tick later whenever the player was outside the Forage GUI. That delayed cleanup could also discard a newer visit. The hub independently used physical camp completeness for its available-button text, so presentation disagreed with authorization. Read-only inspection confirmed both removal paths in the installed build 736 JAR.

The new fixture exercises actual `onCommand`, `onForageStationClose` and `requireStationCamp` code. It uses `/forage camp list` to isolate the common command-entry path, controlled physical camp validation, and a controlled GUI-ownership result; it does not render the complete hub or automate the user's CMI menu. The before-fix run had 26 cases: 14 passing controls and 12 assertion failures, with no fixture errors. A valid owned workstation control passed while the close, command and return-navigation cases failed. Evidence is retained in `.scratch/forage-station-navigation/navigation-red-baseline.xml`.

## Fix and boundaries

An existing physical workstation visit survives menu closing and a return through `/forage` while it remains valid. Commands and menu transitions neither create a visit nor extend its original five-minute expiry. Being near a camp without having interacted with its workstation grants no access.

Accepted movement outside the six-block radius invalidates the visit immediately, including movement within the same block. Returning on foot does not revive it. Teleport, world change, death, quit, Creative/Spectator mode, reload and expiry still end access. Movement and game-mode listeners observe accepted events at MONITOR and do not change the event. Close handling only prunes invalid state synchronously and never opens an inventory or schedules stale cleanup.

Each action still requires a current authenticated Forage GUI, the player's owned registered camp, physical camp validity, Initial Camp dependency, permissions and applicable Local Introduction requirements. Existing GUI inventory/nonce checks reject stale clicks. Transactions additionally retain their original inventory identity, so a fresh menu cannot revive an old queued purchase or claim.

The hub now combines a valid workstation visit with camp readiness when presenting camp buttons. Without a visit, its hint directs players to sneak-right-click the composter. The configurable `camp-visit.workstation-required` message explains closing the menu, interacting with the owned composter and staying within six blocks. That translation was prepared in the beta YAML, but build 736 ignores the new key.

## Verification

- Focused navigation regression: **34 passed**, no failures, errors or skips.
- Complete Forage suite, with the installed Pyro fixtures enabled: **336 passed** across 25 classes, no failures, errors or skips. JDK 25.0.4.1; BUILD SUCCESSFUL in seven seconds.
- Event tests dispatch through actual `RegisteredListener` and production annotations, covering accepted and cancelled movement and game-mode changes.
- Independent source review found no material issues with the authorization boundary or stale transaction checks.
- All 136 recorded managed JAR/configuration hashes across both maintained servers were unchanged. Removing only the added translation key reproduces the prior parsed YAML.

Paper discovery used the live [documentation index](https://docs.papermc.io/llms.txt), [event-listener contract](https://docs.papermc.io/paper/dev/event-listeners/), [custom inventory holder guide](https://docs.papermc.io/paper/dev/custom-inventory-holder/), and [InventoryCloseEvent contract](https://jd.papermc.io/paper/26.3/org/bukkit/event/inventory/InventoryCloseEvent.html). The web Javadocs returned cached build 157 content; exact event metadata was separately verified against the installed `26.3.build.174-beta` API JAR.

No numbered build or native in-game acceptance was performed. After the approved build is synchronized to both maintained servers, run checklist C07/C07a with a real client: composter → server menu → Forage → Skill Branches; then repeat after leaving the radius, expiry and a pending confirmation. Until then, close the menu and sneak-right-click the composter again to restore access on build 736.
