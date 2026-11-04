# mcMMO scoped booster provider evidence

Reviewed for issue #84 on 2026-10-31 against Paper 26.3 and the maintained local server's mcMMO `2.3.002-SNAPSHOT`. The JAR SHA-256 is `b8bc9465bdc4f9ce8fc3c5484adab035245c5ea92bdbcbdd421fce442c22a2be`. Compile and unit-test compatibility also use the existing suite dependency `2.2.054`.

## Supported integration

`ScopedMcMmoListener` uses the public `McMMOPlayerXpGainEvent`, its `PrimarySkillType`, `XPGainReason`, and `getRawXpGained` / `setRawXpGained` methods. It modifies the current award at `HIGHEST` with `ignoreCancelled = true`; it also rejects cancelled and asynchronous events when called directly. It never awards new XP, dispatches a native rate command, writes mcMMO configuration, or uses reflection or mcMMO internals.

The installed runtime enumerates Acrobatics, Alchemy, Archery, Axes, Crossbows, Excavation, Fishing, Herbalism, Maces, Mining, Repair, Spears, Swords, Taming, Tridents, Unarmed and Woodcutting skills. Runtime enum names drive selection rather than a compile-version enum constant list. Salvage and Smelting are child skills and are excluded from independent booster selection.

`javap -p -c` inspection of the installed JAR establishes this normal XP path:

1. Child-skill XP is split into parent skills; party sharing is resolved before final recipient XP events.
2. `McMMOPlayer.modifyXpGain` applies the skill formula modifier, the larger of global/per-skill native rate, and player XP perks.
3. `EventUtils.handleXpGainEvent` emits the cancellable event, then passes the final raw float directly to profile XP addition and recent-gain registration. There is no additional division or native rate multiplication after this event.

The managed multiplier therefore applies once to an ordinary recipient's final award. PVE, PVP, SHARED_PVE and SHARED_PVP are accepted. COMMAND, VAMPIRISM and UNKNOWN awards are unchanged. Repeated delivery of the same event object is not multiplied twice. Null/child skills, invalid/zero/negative XP, nonfinite rates, rates outside the provider's 1..100 safety bound, and results above `Float.MAX_VALUE` are left unchanged. Expired/unmatched plans return 1 from the environment and receive no bonus. Closing the provider unregisters its listener without resetting any external rate.

## Native rate ownership boundary

The current [official XP-rate documentation](https://github.com/mcMMO-Dev/mcmmo-wiki-repo/blob/master/xprate.md) and installed command bytecode support `/xprate <skill|all> <rate> [announce]`. These native per-skill rates exist in memory only; command mutation updates runtime arrays/timestamps and does not save `experience.yml`. Native `/xprate reset` clears all per-skill overrides and restores the configured global baseline. Thus it is unsuitable as an automatic cleanup for a managed single-skill boost.

The global `%mcmmo_xprate%` placeholder reports the native global rate. Despite its name, the installed `%mcmmo_xprate_<skill>%` placeholder reports only that player's XP-perk multiplier and requires a loaded mcMMO player. It cannot verify native per-skill rate ownership. The supported ExperienceAPI has no authoritative native per-skill rate accessor.

The managed event layer leaves native state untouched and relies on its environment's native-rate/legacy/Advent gate. Authorized native commands must invalidate managed ownership immediately; a native per-skill mutation must hold managed execution until the operator deliberately resets that native state. The provider cannot discover an unobserved direct internal API mutation or a native per-skill rate created before its listener began observing the running server. This limitation must remain explicit in administration guidance, particularly for hot plugin enable/reload workflows. A normal full server restart clears native per-skill overrides.

## Source references

- Primary Paper discovery: [live LLM index](https://docs.papermc.io/llms.txt), fetched successfully with `curl`; no copy is vendored into the repository.
- [Paper event listeners](https://docs.papermc.io/paper/dev/event-listeners/), [26.3 EventHandler](https://jd.papermc.io/paper/26.3/org/bukkit/event/EventHandler.html), and [26.3 EventPriority](https://jd.papermc.io/paper/26.3/org/bukkit/event/EventPriority.html).
- [mcMMO public XP event](https://github.com/mcMMO-Dev/mcMMO/blob/master/src/main/java/com/gmail/nossr50/events/experience/McMMOPlayerXpGainEvent.java), [player XP pipeline](https://github.com/mcMMO-Dev/mcMMO/blob/master/src/main/java/com/gmail/nossr50/datatypes/player/McMMOPlayer.java), and [event dispatch/award](https://github.com/mcMMO-Dev/mcMMO/blob/master/src/main/java/com/gmail/nossr50/util/EventUtils.java), corroborated against the exact installed JAR with `javap`.

## Verification scope

`ScopedMcMmoListenerTest` covers scoped/all skill awards, fractional XP, all natural and excluded reasons, duplicate event delivery, native-rate and lifecycle gates, cancellation/asynchronous events, malformed values, child skills, runtime skill enumeration and event priority. `McMmoCommandPolicyTest` covers authorized global/scoped/all commands, reset/set permission separation, namespaced aliases, boolean aliases and invalid commands. Test execution and server smoke results belong in the final issue #84 build report; this evidence note does not claim gameplay acceptance.
