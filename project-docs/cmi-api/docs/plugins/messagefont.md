# MessageFont

## Purpose

MessageFont lets players choose a temporary CMI font marker for private messages. For example, a player can set `alt`, `uniform`, or `illageralt`, then their `/msg`, `/tell`, `/w`, `/m`, `/pm`, or `/r` text is rewritten to start with CMI's font marker such as `{@alt}`.

It is intentionally small and reversible. The font resets after a configured time, players can clear it at any time, and recipients can turn on plain mode for accessibility so direct messages sent to them are not rewritten.

## Features

- Stores the player's selected font in shared `CMIAPILIB/playerdata/<uuid>.yml`.
- Stores an expiry timestamp so the font falls back to default after a timer.
- Stores a per-player plain-mode preference for accessibility.
- Rewrites only configured CMI private-message command paths.
- Skips messages that already start with a CMI font marker.
- Respects recipient plain mode for direct target commands when the target is online.
- Supports `/r` and `/reply` rewriting, with the limitation that command-preprocess does not expose the reply target.
- Registers command, permission, placeholder, config, and debug metadata with `1MB-CMIAPI-LIB`.

## Commands

```text
/msgfont
/msgfont help
/msgfont status
/msgfont list [page]
/msgfont set <font> [duration]
/msgfont clear
/msgfont plain <on|off>
/msgfont preview <font>
/msgfont admin inspect <player>
/msgfont admin reset <player>
/msgfont admin reload
```

Aliases:

```text
/pmfont
```

Global library examples:

```text
/1mbcmi debug plugin messagefont
/1mbcmi debug plugin messagefont commands
/1mbcmi debug plugin messagefont permissions
/1mbcmi debug plugin messagefont placeholders
/1mbcmi debug plugin messagefont config
/1mbcmi debug plugin messagefont all
/1mbcmi config messagefont
/1mbcmi config set messagefont duration.default-seconds 3600
/1mbcmi translations reload
```

## Example Commands

```text
/msgfont
/msgfont list
/msgfont set alt 30m
/msgfont set uniform 2h
/msgfont set illageralt 10m
/msgfont clear
/msgfont plain on
/msgfont plain off
/msgfont preview alt
/msgfont admin inspect mrfloris
/msgfont admin reset mrfloris
/msgfont admin reload
```

Duration examples:

```text
10m
30m
1h
2h
1d
```

## Permissions

```text
onembcmi.messagefont.use
onembcmi.messagefont.set
onembcmi.messagefont.preview
onembcmi.messagefont.plain
onembcmi.messagefont.font.default
onembcmi.messagefont.font.alt
onembcmi.messagefont.font.uniform
onembcmi.messagefont.font.illageralt
onembcmi.messagefont.admin
onembcmi.messagefont.admin.inspect
onembcmi.messagefont.admin.reset
onembcmi.messagefont.admin.reload
```

Default access:

- `use`, `set`, `preview`, `plain`, and the four default font permissions default to true.
- `admin`, `admin.inspect`, `admin.reset`, and `admin.reload` default to op.

## Placeholders

```text
%onembcmi_messagefont.enabled%
%onembcmi_messagefont.current.font%
%onembcmi_messagefont.current.expires_at%
%onembcmi_messagefont.current.remaining_seconds%
%onembcmi_messagefont.plain.enabled%
%onembcmi_messagefont.fonts.count%
%onembcmi_messagefont.runtime.rewrites%
%onembcmi_messagefont.runtime.skipped%
%onembcmi_messagefont.last.player%
%onembcmi_messagefont.last.command%
%onembcmi_messagefont.last.rewrite_at%
%onembcmi_messagefont.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_messagefont.current.font%
papi parse mrfloris %onembcmi_messagefont.plain.enabled%
papi parse mrfloris %onembcmi_messagefont.runtime.rewrites%
```

## Config

Generated at:

```text
plugins/1MB-CMIAPI/MessageFont/config.yml
```

Important config keys:

```yaml
enabled: true
debug: false
output:
  page-size: 8
fonts:
  default: default
  allowed:
  - "default|Default|Normal Minecraft chat font."
  - "alt|Alt|Readable alternate CMI font for private messages."
  - "uniform|Uniform|Uniform CMI font for private messages."
  - "illageralt|Illager Alt|Illager-style alternate CMI font for private messages."
duration:
  default-seconds: 1800
  max-seconds: 86400
  clear-on-expire: true
rewrite:
  direct:
    enabled: true
    commands:
    - msg
    - tell
    - w
    - m
    - pm
    - cmi msg
    - cmi tell
    - cmi w
    respect-target-plain-mode: true
  reply:
    enabled: true
    commands:
    - r
    - reply
    - cmi r
    - cmi reply
safety:
  skip-if-message-already-has-font-marker: true
```

Font format:

```text
id|display name|description
```

The `id` becomes the CMI font marker `{@id}`. Keep ids lowercase and simple, such as `alt` or `uniform`.

## How Rewriting Works

MessageFont listens to `PlayerCommandPreprocessEvent` at a late priority. If the command matches a configured direct or reply private-message command, the plugin checks:

- the feature is enabled
- the sender has `onembcmi.messagefont.use`
- the sender has a non-default active font
- the sender's font has not expired
- the message does not already start with a CMI font marker
- for direct commands, the online target has not enabled plain mode

Then the command is rewritten from:

```text
/msg SomePlayer hello there
```

to:

```text
/msg SomePlayer {@alt} hello there
```

CMI still owns the actual private-message command, delivery, permissions, reply tracking, ignore rules, social spy, and formatting. MessageFont only adds the font marker before CMI handles the message.

## Plain Mode

Players can run:

```text
/msgfont plain on
```

This stores `messagefont.plain-mode: true` in their shared playerdata. Direct messages sent to that online player will not be rewritten by MessageFont, even if the sender has a font active.

Reply commands such as `/r` do not expose the recipient at command-preprocess time, so plain-mode enforcement is only reliable for direct commands such as `/msg <player>`.

## Data Writes

Saved in shared playerdata:

```yaml
uuid: 631e3896-da2a-4077-974b-dd47959d76bc
name: mrfloris
messagefont:
  font: alt
  expires-at: 1770000000000
  plain-mode: false
  updated-at: "2026-04-26T07:30:00Z"
```

This data can be cleaned with:

```text
/1mbcmi debug clean playerdata plugin messagefont --dry-run
/1mbcmi debug clean playerdata plugin messagefont --confirm
```

## CMI-API, CMILib, And CMI Usage

- Uses CMI's existing private-message command behavior and CMI font marker syntax.
- Leaves CMI's `/msg`, `/tell`, `/w`, `/r`, reply target, ignore, and social spy behavior in place.
- Depends on CMI and CMILib at runtime like the other 1MB CMI-API feature jars.
- Uses the shared `1MB-CMIAPI-LIB` feature registry, config, translations, placeholders, and playerdata helper.
- Uses Paper `PlayerCommandPreprocessEvent` and `PlayerJoinEvent`.

## Security Notes

- Font ids are strict: lowercase letters, numbers, `_`, and `-`, up to 32 characters.
- Only configured font ids can be used.
- User input cannot define raw MiniMessage or console commands.
- The plugin only rewrites configured command paths.
- Messages already starting with `{@font}` are skipped to avoid double-prefixing.
- Recipient plain-mode is respected for direct online targets.

## Testing Notes

1. Grant a test player `onembcmi.messagefont.use` and `onembcmi.messagefont.set`.
2. Run `/msgfont set alt 30m`.
3. Send `/msg <otherPlayer> hello`.
4. Confirm the recipient sees the message with the CMI `alt` font.
5. Have the recipient run `/msgfont plain on`.
6. Send another direct message and confirm MessageFont does not rewrite it.
7. Run `/msgfont clear` and confirm future messages are normal.

[Plugin documentation index](README.md)
