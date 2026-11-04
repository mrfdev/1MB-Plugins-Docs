# Protected tool integrations

Forage and Halloween Virus identify their curated items by their own PDC markers. Their guards must remain registered while gameplay is dormant. Feature availability does not authorize another plugin to transform an issued item.

## Shared Pyro callback guard

`com.onemb.cmiapi.lib.item.PyroItemGuard` accepts the host plugin, an item-identity predicate, and feature-specific denial feedback. Register it as a listener, call `start()` on the server thread, and call `close()` during feature shutdown. It supports the reviewed PyroMining 4.6.1 Vessel route and PyroFishingPro 4.9.35 Augment route with PyroLib 1.4.9 or 1.6.0. `supportsProtectedType` and `diagnostics` expose readiness; callers must stop issuing or accepting affected tools when an installed provider is unsupported or a required callback is missing.

Those providers ignore cancellation on their mutation callbacks and expose no equivalent cancellable apply event. The adapter authenticates the provider class loader, actual inventory session, owner and callback. Read-only access to PyroLib's session map is isolated behind exact-version checks. Inventory titles, lore and guessed slot layouts are not authority. No item, currency, inventory or provider configuration is rewritten by the adapter.

`SharedInventoryClickGuard` composes independently owned checks around one provider registration. Joining an existing wrapper does not nest callbacks. It preserves listener order, priority and the original cancellation policy; detaching one owner keeps the remaining checks, and detaching the last restores the original registration. Use `CANCEL` for an authenticated prohibited operation; use `SUPPRESS_CALLBACK` when a provider callback must be withheld but ownership is uncertain, so ordinary storage movement is not cancelled. Attach, replace and detach only on the server thread. This helper does not discover providers or decide which items are protected.

Halloween Virus retains `HvPyroItemGuard` as its feature wrapper. Forage adds `ForagePyroItemGuard`; both share the same dispatcher guard with the shared points-shop adapter.

## Shared CMI and points services

`SharedCmiItemGuard`, used by Forage and Halloween Virus, uses public virtual-anvil events and a reversible wrapper around the actual provider-owned `PluginCommand` executor. This covers Bukkit command dispatch from menus as well as player commands, including CMI repair and trim. One executor holds independent feature checks; detaching either feature keeps the other active, and the final detach restores the original executor. `SharedItemCommandGuard` resolves registered commands and configured aliases before each feature applies its own item/slot rules. The public mcMMO repair and salvage events run before item mutation or material consumption. Capabilities check provider identity and actual registrations; they do not assume that a plugin name alone proves coverage.

Forage checks only the main-hand item for direct CMI-owned `/cmi itemname` and `/cmi:cmi itemname` commands without `-p:`. Reviewed CMI 9.8.10.5 and 9.8.11.0 treat the remaining arguments as name text, so carrying a Forage tool elsewhere must not prevent naming ordinary dirt or other items. The same predicate protects preprocessing, direct CMI dispatch, and points-service preflight. Explicit targets, unknown providers, and arbitrary alias expansions retain conservative inventory checks; the bounded alias resolver cannot prove a whole expansion has main-hand-only scope.

`SharedPointsItemGuard` protects both features in PyroWelcomesPro 0.5.1 `/points` and `/welcomes` services. It authenticates the current shop/confirmation callback and reads its configured commands. It denies protected repair or modification purchases before the callback deducts points. PyroLib session access and the captured shop item are isolated exact-version integrations because no equivalent public pre-purchase event exists. Ordinary purchases and inventories remain usable.

DiscordChat checks both features' issued PDC identities at preview and confirmation before applying its own tool enchantments or charging points. HV staff-template markers alone are not issued identity.

Forage's stored approved state and durability are backstops for other code that mutates an ItemStack directly. Existing Pyro modifier data pauses an issued tool without deleting that data. No guard can stop arbitrary trusted plugin code from calling an internal setter; new provider versions and new item-service routes need explicit compatibility review.

## Shared soulbind protection

`SharedSoulbindItemGuard` provides shared protection through the `HvSoulbindItemGuard` and `ForageSoulbindItemGuard` feature adapters. It guards ItemSoulBind's nine modifying command executors and the seven reviewed `ItemRegistrationListener` event registrations. Automatic registration callbacks are withheld for protected inputs without cancelling the Bukkit event, preserving normal pickup, movement and use. The separate item-protection and death-recovery listeners are not intercepted. Independent feature owners share each wrapper; detachment removes only that owner's check and restores the provider registration only after the final owner leaves.

The provider exposes no cancellable bind event. Integration uses public Paper command/event registration APIs, exact provider ownership and listener class identity, with no private provider field access or version allowlist. Missing or replaced callbacks/executors fail readiness and block protected reward issuance. Changes to the provider's registration contract require compatibility review. Points-shop purchases use the same command-scope predicate before charging. VoteTokens and AFKShrine check HV identity immediately before their direct soulbind writes and before payments.

## External command protection

Forage protects recipient checks for CMI nickname, partial-name and `itemname -p:` targets. CMI shortcut commands also have a direct command-manager path outside the root executor; provider-owned aliases use local, authoritative online identities for recipient checks. CMI 9.8.10.4, 9.8.10.5 and 9.8.11.0 expose no public getter for the definition retained by their `ReflectCommand`; isolated, read-only access to that exact typed field is version- and class-loader-gated. Looking up a similarly named alias in CMI's public cache is insufficient to prove which command will execute. It retains ordinary main-hand dirt naming while a Forage tool is elsewhere in inventory.

PyroMining's reviewed `mine addvessel` administrative command is also guarded at its owned command executor, including its registered aliases and direct plugin dispatch. The shared command preflight recognizes this route so a configured points purchase can be rejected before charging. It has no target-player argument and only modifies the sender's main hand; ordinary held pickaxes remain usable while a protected item is elsewhere. A separate reviewed Vessel-removal callback is withheld before Zeta charging or mutation of a protected held tool.

Forage tool changes use the synchronized suite release workflow. The [25 October update record](compatibility-tests/java-cmi-update-2026-10-25.md) tracks the CMI 9.8.11.0 adapter review and runtime checks; historical provider comparisons retain their original versions and findings.

## Verification

Run the Forage, EventHunts and Shared Library test suites. To exercise the owned commercial JAR fixtures, set `FORAGE_PYRO_FIXTURE_DIR` and `HV_PYRO_FIXTURE_DIR` to a local directory containing the named reviewed JARs. Never commit or redistribute those artifacts. The callback tests first exercise the unguarded provider path, then assert suppression before mutation or charge. They also cover both feature guards together, repeated menu refresh, independent shutdown, ordinary callbacks and uncertain-session storage behavior.

Use the canonical suite build and maintained Paper 26.3 server for native item/event checks. Native synthetic-player checks complement, but do not replace, connected-client acceptance of actual provider menus and camp payments. See the [Forage player tool guide](plugins/forage-camps.md#tool-shop-guide); detailed verification evidence is retained privately.
