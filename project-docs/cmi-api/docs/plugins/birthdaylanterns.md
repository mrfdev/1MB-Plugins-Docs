# BirthdayLanterns

BirthdayLanterns gives players collectible lanterns for birthdays, player anniversaries, and 1MoreBlock.com server milestones. The feature is meant to make long-term participation feel visible: players can claim keepsake lantern badges, keep one in an item frame or museum, and use finite wish lanterns for a small configurable celebration.

The server start date defaults to `2011-03-07`. A player who joined before a server milestone date can claim that milestone lantern after the milestone has happened. For example, a player who joined in 2013 can claim the 5, 10, and 15 year server lanterns in 2026; a player who joined in 2024 can claim the 15 year lantern but not the 5 or 10 year lanterns.

## Player Experience

Players use `/birthday` to open the GUI. From there they can review claimable lanterns, set their birthday, toggle visibility/effects/greetings, choose particle and sound presets, send their personalized celebration mail, and read guestbook notes.

When Menu is installed and enabled, `/menu` includes a Birthday Lanterns button and the BirthdayLanterns GUI shows a Main Menu shortcut beside the close button.

Lantern items are marked with Paper PersistentDataContainer data. A normal right-click opens the BirthdayLanterns GUI. Sneak-right-click activates the lantern:

- Collectible lanterns only glow and open the collection flow by default, so they are safe to keep forever.
- Wish lanterns have a server-side issue id and finite charges, so duplicated items cannot multiply command rewards while the plugin is installed.
- If the plugin is removed, lanterns remain normal named items with lore, but their right-click behavior stops.

Birthday input is intentionally strict. Players can use examples such as:

```text
/birthday set May 28
/birthday set 05-28
/birthday set 2000-05-28
```

The plugin stores only month/day. If a full year is supplied and the configured age check says the player is under 13, the date is not saved and the configured owner gets a quiet CMI mail for review. Players can correct their birthday once by default.

Guestbook text is rendered as plain Adventure text, not MiniMessage. Legacy color codes, hex colors, tags, command-chain symbols, pipes, semicolons, control characters, and unsafe formatting are stripped. The heart text `<3` is allowed.

## Commands

```text
/birthday
/birthday status
/birthday set <month day|MM-DD|YYYY-MM-DD>
/birthday visibility <private|public>
/birthday effects <on|off>
/birthday greetings <on|off|send>
/birthday presets <particle|sound> <preset|default>
/birthday claim [reward-id]
/birthday mail <reward-id>
/birthday guestbook [year|page]
/birthday guestbook add <player> <message>
/birthday admin inspect <player>
/birthday admin give <player> <reward-id> [collectible|usable] [amount]
/birthday admin reset <player> <birthday|claims|guestbook|all>
/birthday admin reload
/birthday info
/birthday help
/birthday debug all
/birthday debug celebrations
```

`/birthday status` is player-friendly and uses clickable hover rows for preferences. Clicking a toggle runs the matching safe command and then refreshes the status output so players can immediately see the new state.

Admin commands work from direct console where they do not require a player inventory, except `admin give`, which currently targets an online player because it creates real items in their inventory.

## Rewards

Rewards live in:

```text
plugins/1MB-CMIAPI/BirthdayLanterns/celebrations.yml
```

Each reward template can configure:

- display name, material, color, and lore
- collectible item amount
- finite usable item amount and charges
- particle preset and sound preset
- claim commands
- use commands
- randomized CMI mail variants
- money placeholder for milestone rewards

Default claim commands demonstrate CMI mail, CMI EXP, CMI money, and an `infinitycake` kit hook. Commands are dispatched only through direct server console and must match the configured allow-list. RCON is not used.

## Permissions

```text
onembcmi.birthdaylanterns.use
onembcmi.birthdaylanterns.set
onembcmi.birthdaylanterns.claim
onembcmi.birthdaylanterns.guestbook
onembcmi.birthdaylanterns.admin
onembcmi.birthdaylanterns.admin.inspect
onembcmi.birthdaylanterns.admin.give
onembcmi.birthdaylanterns.admin.reset
onembcmi.birthdaylanterns.admin.reload
```

The basic player permissions default to true. Admin permissions default to operator in `plugin.yml`, but production servers should grant them deliberately with LuckPerms.

## Placeholders

```text
%onembcmi_birthdaylanterns.enabled%
%onembcmi_birthdaylanterns.birthday_set%
%onembcmi_birthdaylanterns.birthday_date%
%onembcmi_birthdaylanterns.visibility%
%onembcmi_birthdaylanterns.available.count%
%onembcmi_birthdaylanterns.claimed.count%
%onembcmi_birthdaylanterns.player_anniversary.years%
%onembcmi_birthdaylanterns.server.years%
```

## Config

Runtime config is split by ownership:

```text
plugins/1MB-CMIAPI/BirthdayLanterns/config.yml
plugins/1MB-CMIAPI/BirthdayLanterns/celebrations.yml
plugins/1MB-CMIAPI/CMIAPILIB/translations/birthdaylanterns.yml
```

`config.yml` controls global behavior, safety, GUI title/filler, age checks, guestbook limits, and allowed command prefixes. `celebrations.yml` controls particle presets, sound presets, birthday reward templates, player-anniversary templates, and server milestone templates.

Important defaults:

```yaml
server:
  start-date: '2011-03-07'
birthday:
  min-age-years: 13
  allowed-corrections: 1
safety:
  owner-bound-items: true
  block-unknown-use-issues: true
  collectible-use-runs-commands: false
rewards:
  commands:
    enabled: true
    allowed-prefixes:
      - cmi mail send
      - cmi money give
      - cmi exp give
      - cmi kit
      - give
      - infinitycake
```

## Testing

Recommended test flow:

1. Run `/birthday info`, `/birthday help`, `/birthday status`, and `/birthday debug all`.
2. Set a birthday with `/birthday set May 28`, then confirm one correction is allowed and additional corrections are blocked.
3. Test an under-13 full-year date on a disposable account and confirm the owner mail fires while the date is not stored.
4. Open `/birthday`, claim an available reward, and verify both collectible and wish lantern items are created.
5. Sneak-right-click a wish lantern and confirm charges decrement server-side.
6. Try a duplicated wish lantern in a test inventory and confirm unknown/exhausted issue ids do not run rewards.
7. Add guestbook notes with normal text and `<3`, then try unsafe MiniMessage, hex colors, pipes, semicolons, and command-looking text to confirm cleanup.
8. Use `/birthday admin inspect <player>` to confirm claims, mail states, open issues, and guestbook counts.

## Integration Notes

BirthdayLanterns depends on CMI, CMILib, and `1MB-CMIAPI-Lib`. It uses shared config/comment preservation, translations, debug/help metadata, playerdata, and hardened GUI click/drag handling from the library.

CMI integration is command-based for configurable rewards and mail. Defaults use `cmi mail send`, `cmi exp give`, `cmi money give`, and `cmi kit`. InfinityCake is an optional hook by command/kit convention; if that kit is not present, remove or replace the default command in `celebrations.yml`.

Paper API usage includes Adventure text/components, titles, sounds, particles, PersistentDataContainer item identity, and safe inventory item creation.

[Back to plugin index](README.md)
