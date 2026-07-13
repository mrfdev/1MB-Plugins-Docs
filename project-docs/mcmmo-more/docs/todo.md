# TODO

Deferred work that should not be lost, sorted by priority.

## High Priority

- In-game follow-up smoke test with an online player: CMI vanish/god blocking, movement XP sampling, perk activation, and actionbar/chat feedback.
- Smoke test Defense with an online player: shield blocks, hostile melee hits survived, hostile projectile hits survived, disabled PvP source behavior, per-attacker cooldowns, mob-density blocking, perks, and actionbar/chat feedback.
- Smoke test Exploration mounted travel with an online player: horses, camels, pigs, striders, boats ignored, minecarts ignored, source multiplier, permission gating, and actionbar/chat feedback.
- Smoke test Arcane with an online player: enchanting-table XP, anvil combine XP, Dragon Breath bottle XP, nearby breath-cloud validation, rename-only blocking, repeated signature blocking, disabled grindstone source behavior, perks, and actionbar/chat feedback.
- Smoke test movement loop tuning with an online player: repeated-region limits, repeated-path limits, cooldown knobs, normal exploration routes, swimming routes, and Airborne routes.
- Smoke test Husbandry with an online player: successful breeding XP, disabled care-feeding source behavior, species cooldowns, chunk cooldowns, dense pen blocking, perks, and actionbar/chat feedback.
- Smoke test More-levels to native mcMMO-levels conversion with an online player: disabled default, permission gating, quote math, target caps, clickable confirmations, ledger spending, reload/debug-set tuning, and playerdata history.
- Review remaining `skills-research.md` approval-list gaps after Husbandry: rejected SwornRPG/MMOExperience-style online-time, generic Minecraft XP mirroring, commerce, challenge, or raid reward skills.

## Medium Priority

- Consider target-specific daily/weekly conversion caps if staff testing shows unlimited transactions are too generous.
- Consider source-aware conversion weights later, such as Airborne `riptide` source credit favoring Tridents or Exploration `mounted_travel` source credit favoring Taming.
- Consider optional non-command perk activation gestures that do not rely on double-sneak. Vanilla Paper cannot detect arbitrary keys such as `M` without a client mod, so evaluate server-visible options such as configured item right-click, offhand-swap double tap, drop-key double tap, or a menu click.
- Design Presence as a default-disabled, very-low-XP active/gametime skill with survival, vanish, god-mode, and anti-AFK checks. Owner accepts that this can be somewhat gameable if the reward rate stays low.
- Revisit the Action skill only after the gameplay loop is clearer; possible themes are wrecking, impact, or hand-breaking, but nothing is approved yet.

## Low Priority

- None right now.

## Shelved for now

- Future out-of-scope module idea: review https://modrinth.com/plugin/mcmmorewards and design a custom 1MB mcMMO rewards feature for Java 25 / Paper 26.1.2 that can grant rewards for mcMMO milestones while also letting existing players claim eligible rewards they never received.
