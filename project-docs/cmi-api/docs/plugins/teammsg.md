# TeamMsg

TeamMsg combines the existing 1MBStaffMsg and NotableMsg features into one staff-facing jar. The two behaviors remain independent modules: StaffMsg still extends CMI staff chat and NotableMsg still owns the private `/n` channel.

## How Staff Use It

Available features include:

- the existing `/s`, `/staffmsg`, `/cmi staffmsg`, and `/1mbstaffmsg` recent-history workflow;
- the existing `/n` notable/community-assistant channel, persistent toggle, recent history, and DiscordSRV bridge;
- the same StaffMsg and NotableMsg prefixes, commands, permissions, placeholders, translations, and data paths used before consolidation;
- one TeamMsg lifecycle switch for making both modules active or dormant;
- independent StaffMsg and NotableMsg module switches for live isolation and hotfixes;
- a global debug logging switch without changing either channel's normal behavior.

Detailed module references remain available in [1MBStaffMsg](staffmsg.md) and [NotableMsg](notablemsg.md).

## Commands

```text
/teammsg status
/teammsg module <staffmsg|notablemsg> <true|false>
/teammsg reload
/teammsg debug true
/teammsg debug false
/teammsg debug enable true
/teammsg debug enable false
```

`debug true|false` changes TeamMsg diagnostic logging. `debug enable true|false` changes the whole feature lifecycle. A dormant TeamMsg jar stays loaded and green in `/plugins`, but neither hosted module handles chat until it is activated again.

The original module commands are unchanged:

```text
/1mbstaffmsg [recent|status|reload|info|help|debug]
/n [message|toggle|on|off|status|recent|reload]
```

## Permissions

```text
onembcmi.teammsg.admin
cmi.command.staffmsg
onembcmi.staffmsg.admin
onembcmiapi.notablemsg
onembcmiapi.notablemsg.admin
onembcmi.notablemsg.admin
```

`onembcmi.teammsg.admin` controls the parent lifecycle, module switches, reload, and global debug mode. Existing module permissions retain their previous meaning.

## Placeholders

```text
%onembcmi_teammsg.enabled%
%onembcmi_teammsg.debug%
%onembcmi_teammsg.modules.staffmsg.enabled%
%onembcmi_teammsg.modules.notablemsg.enabled%
```

All `%onembcmi_staffmsg_*%` and `%onembcmi_notablemsg_*%` placeholders remain registered as compatibility namespaces while their module is active.

## Config And Data

The parent lifecycle is stored in:

```text
plugins/1MB-CMIAPI/TeamMsg/config.yml
```

```yaml
enabled: true
debug: false
modules:
  staffmsg:
    enabled: true
  notablemsg:
    enabled: true
```

Module settings deliberately remain in their existing files so live values do not reset:

```text
plugins/1MB-CMIAPI/1MBStaffMsg/config.yml
plugins/1MB-CMIAPI/NotableMsg/config.yml
plugins/1MB-CMIAPI/translations/staffmsg.yml
plugins/1MB-CMIAPI/translations/notablemsg.yml
```

On the first TeamMsg start, an existing module config's old `enabled` value is imported into the matching parent module switch. After migration, `TeamMsg/config.yml` is the authoritative lifecycle control; the old module-level `enabled` key is retained only for compatibility.

## Upgrade From Separate Jars

1. Stop the server.
2. Remove `1MB-CMIAPI-1MBStaffMsg-*.jar` and `1MB-CMIAPI-NotableMsg-*.jar`.
3. Keep the existing `1MBStaffMsg/`, `NotableMsg/`, shared playerdata, and translation files.
4. Install the matching `1MB-CMIAPI-TeamMsg-*.jar` and LIB jar.
5. Start the server and run `/teammsg status` from console.

Do not load the old standalone jars beside TeamMsg; they register the same commands and listeners.

## Runtime

- Java target: 25
- Paper target: 26.2
- Required: CMI, CMILib, 1MB-CMIAPI-LIB
- Optional: PlaceholderAPI, LuckPerms, DiscordSRV

[Plugin index](README.md)
