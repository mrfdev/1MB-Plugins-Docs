# Protected tool integrations

Forage and Halloween Virus identify their curated items by their own PDC markers. Their guards must remain registered while gameplay is dormant. Feature availability does not authorize another plugin to transform an issued item.

## Shared Pyro callback guard

`com.onemb.cmiapi.lib.item.PyroItemGuard` accepts the host plugin, an item-identity predicate, and feature-specific denial feedback. Register it as a listener, call `start()` on the server thread, and call `close()` during feature shutdown. It supports the reviewed PyroMining 4.6.1 Vessel route and PyroFishingPro 4.9.35 Augment route with PyroLib 1.4.9 or 1.6.0. `supportsProtectedType` and `diagnostics` expose readiness; callers must stop issuing or accepting affected tools when an installed provider is unsupported or a required callback is missing.

Those providers ignore cancellation on their mutation callbacks and expose no equivalent cancellable apply event. The adapter authenticates the provider class loader, actual inventory session, owner and callback. Read-only access to PyroLib's session map is isolated behind exact-version checks. Inventory titles, lore and guessed slot layouts are not authority. No item, currency, inventory or provider configuration is rewritten by the adapter.

`SharedInventoryClickGuard` composes independently owned checks around one provider registration. Joining an existing wrapper does not nest callbacks. It preserves listener order, priority and the original cancellation policy; detaching one owner keeps the remaining checks, and detaching the last restores the original registration. Use `CANCEL` for an authenticated prohibited operation; use `SUPPRESS_CALLBACK` when a provider callback must be withheld but ownership is uncertain, so ordinary storage movement is not cancelled. Attach, replace and detach only on the server thread. This helper does not discover providers or decide which items are protected.

Halloween Virus retains `HvPyroItemGuard` as its feature wrapper. Forage adds `ForagePyroItemGuard`; both share the same dispatcher guard with the shared points-shop adapter.

## Shared CMI and points services

`SharedCmiItemGuard`, used by Forage and Halloween Virus, uses public virtual-anvil events and a reversible wrapper around the actual provider-owned `PluginCommand` executor. This covers Bukkit command dispatch from menus as well as player commands, including CMI repair and trim. One executor holds independent feature checks; detaching either feature keeps the other active, and the final detach restores the original executor. `SharedItemCommandGuard` resolves registered commands and configured aliases before each feature applies its own item/slot rules. The public mcMMO repair and salvage events run before item mutation or material consumption. Capabilities check provider identity and actual registrations; they do not assume that a plugin name alone proves coverage.

`SharedPointsItemGuard` protects both features in PyroWelcomesPro 0.5.1 `/points` and `/welcomes` services. It authenticates the current shop/confirmation callback and reads its configured commands. It denies protected repair or modification purchases before the callback deducts points. PyroLib session access and the captured shop item are isolated exact-version integrations because no equivalent public pre-purchase event exists. Ordinary purchases and inventories remain usable.

DiscordChat checks both features' issued PDC identities at preview and confirmation before applying its own tool enchantments or charging points. HV staff-template markers alone are not issued identity.

Forage's stored approved state and durability are backstops for other code that mutates an ItemStack directly. Existing Pyro modifier data pauses an issued tool without deleting that data. No guard can stop arbitrary trusted plugin code from calling an internal setter; new provider versions and new item-service routes need explicit compatibility review.

## Halloween Virus soulbind protection

`HvSoulbindItemGuard` permanently guards ItemSoulBind's nine modifying command executors and the seven reviewed `ItemRegistrationListener` event registrations. Automatic registration callbacks are withheld for protected inputs without cancelling the Bukkit event, preserving normal pickup, movement and use. The separate item-protection and death-recovery listeners are not intercepted. Detachment restores only registrations still owned by this guard.

The provider exposes no cancellable bind event. Integration uses public Paper command/event registration APIs, exact provider ownership and listener class identity, with no private provider field access or version allowlist. Missing or replaced callbacks/executors fail readiness and block protected reward issuance. Changes to the provider's registration contract require compatibility review. Points-shop purchases use the same command-scope predicate before charging. VoteTokens and AFKShrine check HV identity immediately before their direct soulbind writes and before payments.

## Verification

Run the Forage, EventHunts and Shared Library test suites. To exercise the owned commercial JAR fixtures, set `FORAGE_PYRO_FIXTURE_DIR` and `HV_PYRO_FIXTURE_DIR` to a local directory containing the named reviewed JARs. Never commit or redistribute those artifacts. The callback tests first exercise the unguarded provider path, then assert suppression before mutation or charge. They also cover both feature guards together, repeated menu refresh, independent shutdown, ordinary callbacks and uncertain-session storage behavior.

Use the canonical suite build and maintained Paper 26.3 server for native item/event checks. Native synthetic-player checks complement, but do not replace, connected-client acceptance of actual provider menus and camp payments. See [Forage](plugins/forage.md) and [the tool-protection verification](compatibility-tests/forage-tool-protection-2026-10-07.md).
