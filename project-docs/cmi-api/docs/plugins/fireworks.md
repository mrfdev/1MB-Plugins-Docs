# Fireworks

Fireworks is an independently authored, staff-managed catalogue and creator for cosmetic celebration items. Players activate the items they receive without a command or permission. Administration uses `/_fireworks`; normal players have no command surface, shop, editor, or permission requirement for use.

The feature installs dormant. Existing UltimateFireworks items are **not automatically migrated**. No default legacy mappings are supplied, and compatibility with the owner's actual UltimateFireworks 3.2.8 items still requires item samples and acceptance testing.

Player instructions are in [Fireworks player guide](fireworks-player-guide.md). Legacy takeover and live activation require the owner's separate migration review.

## Runtime and files

- Paper target: **26.3**, within the repository's explicitly approved **STABLE** channel, with build **175** as the baseline. Build with JDK **25.0.4.1**, keeping Java 25 bytecode; the maintained Paper server uses Java **27**.
- Dependencies: CMI, CMILib, and the suite Shared Library. Optional integrations: UltimateFireworks coexistence detection and WorldGuard protection.
- Feature JAR: `1MB-Lib-Fireworks-v<version>-<build>-j25-26.3.jar`. Paper runtime identity: `1MB-CMIAPI-Fireworks`; compatibility aliases include `OneMBCMIAPIFireworks` and `1MB-Lib-Fireworks`.
- Settings: `plugins/1MB-CMIAPI/Fireworks/config.yml`.
- Catalogue: `plugins/1MB-CMIAPI/Fireworks/catalogue.yml`, with immutable published revisions and per-ID activation status.
- Messages use the Shared Library translations and MiniMessage conventions. Delivery receipts use its durable operation journal.
- No metrics, ParticleAPI, old Minecraft compatibility, text fireworks, shop, economy charge, executable effect scripts, or arbitrary console-command effects.

Catalogue file I/O and receipt persistence run asynchronously. Bukkit player, inventory, world, entity, and GUI actions run on the server thread. A failed catalogue read or write blocks new item use until a successful reload. Saves publish the new in-memory catalogue only after an atomic file replacement succeeds.

## Commands and permissions

All commands and suggestions require `onembcmi.fireworks.admin` in game. It defaults to false, including for operators, and grants the narrower child permissions below unless explicitly denied. Direct console can manage the feature; RCON is not a supported administrative source. GUI creation, editing, and preview require an in-game administrator.

| Command | Child permission | Purpose |
| --- | --- | --- |
| `/_fireworks gui` | `gui` | Browse the catalogue or resume a retained preview draft. |
| `/_fireworks list [page]` | `admin` | List IDs, revisions, and activation status, including retired records. |
| `/_fireworks give <player> <id> <amount> [receipt-uuid]` | `give` | Deliver 1–64 items, subject to the configured delivery maximum. |
| `/_fireworks inspect [player]` | `inspect` | Inspect the recipient's main-hand item and its stored identity keys. |
| `/_fireworks create` | `edit` | Start a new guided design. |
| `/_fireworks edit <id>` | `edit` | Draft the next revision of an existing design. |
| `/_fireworks enable <id>` | `toggle` | Allow all retained revisions of an ID to activate. |
| `/_fireworks disable <id>` | `toggle` | Make existing items inert without deleting them. |
| `/_fireworks retire <id>` | `toggle` | Permanently retire an ID; it cannot be enabled or reused. |
| `/_fireworks preview <id>` | `preview` | Preview a saved design without consuming an item. |
| `/_fireworks stop` | `stop` | Clean up active shows and pause activation. |
| `/_fireworks resume` | `stop` | Resume activation, still subject to all protection and limits. |
| `/_fireworks reload` | `reload` | Reload settings and catalogue with activation blocked during validation. |
| `/_fireworks info\|help\|admin\|status` | `admin` | Standard staff information and administration. |
| `/_fireworks debug [status\|config\|permissions\|commands\|all]` | `debug` | Diagnostics and the Shared Library debug surface. |
| `/_fireworks debug enable <true\|false>` | `debug` and shared lifecycle permission | Activate or make the feature dormant while its Paper plugin remains loaded. |

Child permissions are prefixed with `onembcmi.fireworks.`. Grant the feature admin permission to an intended staff group using the server's existing permissions workflow. Any player-targeted LuckPerms operation must use that player's authoritative server UUID.

Give recipients must be online and resolve through trusted local player identity records. Real names, including Floodgate prefixes, and authoritative UUIDs are accepted by the shared resolver. The GUI gives items to the administrator; the command also targets other online players. Grants require enough room for the entire amount and never drop overflow. Each grant has a durable receipt. Reuse the same receipt when checking a retry; uncertain inventory mutations require manual receipt and inventory review, with no automatic replay.

`commands.root` selects an additional root on restart, without changing item identity. The permission-locked `/_fireworks` root remains a recovery route. A conflicting or invalid root is rejected. Example values omit the slash.

## Guided creator

The catalogue is paginated. Selecting an entry opens inspection, edit, preview, enable/disable, and give controls. Publishing, previewing, and giving are separate actions.

1. Choose a trigger: firework rocket, brewing stand, blaze rod, amethyst shard, paper, or firework star.
2. Add up to twelve effect stages. Each stage has its own start time, interval, repetition count, pattern, particle, palette, height, spread, and sound.
3. Choose a total show duration of 15–30 seconds. Every stage must finish inside it.
4. Enter a display name through the scoped chat prompt. MiniMessage colours are supported. Input expires after 60 seconds; `cancel` returns to the draft.
5. Choose a stable lowercase ID for a new design, then review and save.

Patterns include fountain, burst, rocket, ring, and spiral. Particle choices include firework sparks, end rods, happy-villager particles, electric sparks, soul flames, and coloured dust. Rocket stages support the game's firework shapes, primary and fade palettes, trail, and flicker. Nine palette choices include single colours and coordinated multicolour combinations. Sounds are chosen from a bounded list rather than arbitrary keys.

Numeric choices are deliberately bounded. A rejected edit leaves the entire draft unchanged. For example, increasing an interval may require reducing the repetition count first. The review page shows the cumulative explicit particle upper bound per viewer, including rocket ascent. Native stages show that calculated budget instead of offering particle/density controls that do not change native effects. Rocket stages must leave enough time for their final flight and detonation before the show ends. Previews obey normal location checks, capacity, rendering limits, and cooldowns.

The designer uses the Shared Library GUI's owner/session inventory holder and input guard. Shift-click, drag, double-click, hotbar/offhand swap, drop, creative slot manipulation, and stale queued actions do not take or activate its display items. Every action rechecks permissions and the current draft; saving checks the catalogue revision again.

Ordinary close, quit, world change, or feature shutdown discards unsaved drafts. A preview intentionally retains its draft for reopening through the GUI command. Drafts expire after ten minutes of inactivity. Chat input and draft state are cleared during shutdown.

## Items, revisions, and activation

Native items carry a versioned, namespaced identity pointing to a catalogue ID and immutable revision. Display names and lore do not grant authority. Editing creates a new revision for newly issued items; old items retain their published effect. Disabled and retired IDs block every retained revision. The initial catalogue has `golden_fountain`, `starlight_rockets`, and `garden_celebration`, all independently authored examples.

The catalogue retains at most 256 IDs and 32 revisions per ID. Retirement preserves the record and prevents reuse. It does not erase player items or offer an automatic exchange.

To activate, hold an eligible item in either hand and right-click the top of a solid, noninteractive block in an approved location. The deferred action rechecks the player, exact hand stack, definition status, protection, cooldown, and capacity before consuming **one item**, including in creative mode. Adventure and spectator activation is rejected. A brewing stand fountain uses a temporary display entity, without placing a usable brewing inventory or producing block drops.

Marked items are guarded against accidental vanilla placement and use through dispensers, crossbows, elytra boosting, crafting, anvils, grindstones, smithing, and relevant inventory processing paths. Native items and validated adopted legacy mappings keep these guards while the feature is dormant, without a rendering task or catalogue read. Ordinary unmarked items retain ordinary gameplay. Item copies remaining after consumption keep their complete original metadata.

Paper's crossbow-load event does not identify the selected ammunition, so loading a crossbow is refused while any managed firework rocket is in the player's inventory. Move special rockets into storage before loading a crossbow with ordinary ammunition.

A denied activation leaves the item intact. A show that has already begun is a consumed cosmetic action: disconnect, death, a world change, unload, shutdown, or crash can end it without replay or an automatic item refund. Cooldowns survive reconnects in the same runtime; they do not persist through a server restart.

## Configuration and protection

Defaults deliberately require an operator review before gameplay activation:

```yaml
enabled: false
commands:
  root: _fireworks
coexistence:
  allow-native-testing: false
legacy:
  takeover-enabled: false
  mappings: []
delivery:
  max-amount: 64
protection:
  excluded-worlds: []
  verified-unprotected-worlds: []
```

WorldGuard, when installed, must be enabled and supply a working public build/placement query. The engine checks the anchor and eighteen bounded extent samples without an automatic operator bypass. A failed or virtual protection result blocks activation. These samples do not prove that every cosmetic particle stays inside an arbitrarily shaped region.

Without WorldGuard, a world must be explicitly listed in `protection.verified-unprotected-worlds` after the owner has reviewed its claims and event protections. Known unsupported claim providers also require that explicit world review. This setting is an operator acknowledgement, **not an integration with those claim systems**. Even a reviewed world still respects installed WorldGuard checks and vanilla spawn protection. Excluded worlds always win. World names or namespaced world keys can be used.

Do not populate the review list blindly. On a server with protected plots or claims, test the actual installed protection plugins, adjacent region boundaries, denied build access, and claimed/unclaimed areas before allowing player use.

## Performance limits

| Setting | Default | Enforced range |
| --- | --- | --- |
| `limits.cooldown-seconds` | 15 | 1–3600 |
| `limits.max-shows` | 8 | 1–16 |
| `limits.max-shows-per-player` | 1 | 1–2 |
| `limits.max-shows-per-area` | 2 | 1–4 |
| `limits.area-radius` | 24 blocks | 8–64 |
| `limits.viewer-radius` | 32 blocks | 8–64 |
| `limits.max-viewers` | 32 per show | 1–64 |
| `limits.particles-per-tick` | 1024 | 32–4096 |
| `limits.particles-per-viewer-tick` | 96 | 8–256 |
| `limits.sounds-per-tick` | 16 | 1–32 |
| `limits.sounds-per-viewer-second` | 2 | 1–4 |
| `limits.max-entities` | 24 | 1–48 |

The particle budgets account for explicit particle delivery to each recipient, including overlap between shows. Rocket ascent is rendered through counted explicit particles; native rocket entities remain hidden until an admitted explosion. Native Minecraft firework bursts generate extra client-side particles whose exact number is not controlled by the explicit particle counter. They have separate limits of one native burst per viewer per second and two native spawns per tick, plus the entity ceilings. Native firework visuals and sounds therefore still need representative Java and Bedrock client testing.

One bounded scheduler manages shows; there are no per-particle scheduler tasks or forced chunk loads. A wall-clock deadline also caps show lifetime when server tick rate drops. A definition is limited to a conservative 5,000 explicit particles per viewer over its schedule, including the complete bounded rocket-ascent lifetime. Native burst particles are outside that count and use the separate native limits described above. Definitions have one to twelve stages and last 15–30 seconds. Per stage: 1–60 repetitions, 4–200 ticks between emissions, 1–32 particles per emission for particle patterns, up to four primary and four fade colours, height 0–32 blocks, spread 0.05–6 blocks, sound volume 0–1, and pitch 0.5–2. Hard configuration ceilings constrain larger administrator-entered values.

Effect entities are nonpersistent and owned by this feature. Its damage and explosion protections apply to those owned entities, preserving unrelated vanilla gameplay. Shows stop and clean up on expiry, relevant unloads, owner lifecycle changes, disabled definitions, and runtime shutdown. The `stop` command is the emergency pause. Capacity limits reduce resource use; they are not a guarantee that every client or every combination of other plugins remains lag-free.

## Legacy compatibility and coexistence

The adapter accepts explicit, reviewed metadata mappings consisting of the trigger material, a PDC key, a supported value type (`STRING`, `INTEGER`, or `BYTE`), the exact stored value, and an existing target ID/revision. Duplicate, conflicting, malformed, or unknown identity matches fail closed. Names or lore are never used as a compatibility selector.

There are no built-in mappings claiming support for UltimateFireworks 3.2.8. The original JAR and representative held items must establish whether its markers are exposed through supported Paper item APIs. Already placed persistent fountains or other world state are a separate migration concern. Compatibility that requires unsafe metadata guesses is not enabled.

While UltimateFireworks is loaded, it retains legacy ownership even if takeover is configured. Native Fireworks gameplay is blocked by default during coexistence. `coexistence.allow-native-testing: true` is an explicit opt-in for isolated native-item testing after confirming that the old plugin does not recognize those new items.

The final handover requires approved mappings, preserved backup data, gameplay acceptance, removal of the original plugin during a planned restart, and `legacy.takeover-enabled: true`. Never arrange for both plugins to consume or render the same legacy item.

## Verification and deployment

Automated tests cover definition validation, catalogue persistence/revisions, item identity, drafts, admission/render budgets, delivery, and relevant event guards. The Shared Library separately tests the GUI's adversarial input/session handling. These tests do not replace actual Paper, protection-plugin, CMI, or client acceptance.

Manual acceptance matrix:

| Area | Required checks |
| --- | --- |
| Installation | Dormant initial install; explicit activation; malformed configuration; missing dependencies; restart and command-root collision. |
| Administration | Console grants/inspection; permission revocation while GUI is open; hidden command suggestions; full inventory; exact Java and `.bedrock` names/UUIDs; renamed account; invalid/ambiguous identity. |
| GUI | Every page; stage limits; stale concurrent editor saves; invalid and expired name input; preview resume; close, quit, kick, world change; shift, drag, double-click, hotbar, offhand, drop, creative interactions. |
| Items | Both hands; renamed display; unknown/forged/malformed PDC; component-heavy and container metadata; max stacks; inventory changes before deferred consumption; disabled/retired revisions. |
| Alternate use | Dispenser, crossbow load/fire, elytra boost, crafting/crafter, anvil, smithing, grindstone, furnace/fuel, hoppers and manual processing inventory transfers; ordinary items unchanged. |
| Placement/protection | Solid/noninteractive surfaces; denied placements; WorldGuard disabled/unavailable/virtual state; other installed claims; region edges; world exclusions/border/height; unloaded chunks. |
| Runtime safety | Rapid concurrent activation; area/server/player ceilings; overlapping shows/viewers; nearby pets/mobs/players; unrelated vanilla fireworks damage; particles and audio on Java and Bedrock clients. |
| Lifecycle/recovery | Disconnect/reconnect, kick, death, world change, chunk/world unload, emergency stop/resume, config reload, feature disable, clean restart, forced failure between receipt stages, crash during a show. |
| Integrations | CMI restrictions and inventory state; AutoSell interactions; live third-party metadata; current permissions/protection plugins. |
| Legacy | Genuine items for every approved mapping; look-alike items; multiple conflicting markers; both plugins loaded; old plugin removed; stored chest copies; already placed fountains. |

For distributable test output, stop the maintained Paper server and run the repository's canonical `scripts/build-all.sh` with JDK 25.0.4.1. It reserves the suite build number and synchronizes the complete managed JAR set to `servers/Paper-26.3/`. Keep the Paper 26.2 rollback instance unchanged. Focused Gradle builds are development feedback only. After local gameplay acceptance, use `stageTestedJarsForLive` to prepare the exact tested set for manual live handoff.

Official references: [Paper documentation index](https://docs.papermc.io/llms.txt), [persistent item data](https://docs.papermc.io/paper/dev/pdc/), [particles](https://docs.papermc.io/paper/dev/particles/), [scheduler guidance](https://docs.papermc.io/paper/dev/scheduler/), and [Paper 26.3 API Javadocs](https://jd.papermc.io/paper/26.3/). Recheck the exact target's API metadata, deprecations, lifecycle, events, and configuration when upgrading.
