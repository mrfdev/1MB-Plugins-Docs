# Troubleshooting

## Displays Have A Barrier But No Visible Text/Icon On Paper 26.2

Use the patched jar:

```text
HeadDisplays-1.12.9-26.2-display-fix.jar
```

The original 1.12.9 jar can fail on Paper/Minecraft 26.2 with:

```text
java.lang.NoSuchFieldError: Class net.minecraft.world.entity.EntityType does not have member field ITEM_DISPLAY
```

That means the plugin created the control/barrier part of the display but failed while constructing the client-side `ItemDisplay` packet entity.

## Plugin Does Not Enable On Older 26.x Builds

Check for version parsing errors in `XMaterial`, especially with older HeadDisplays 1.12.8 builds:

```text
Failed to parse server version
```

The local patched artifact is based on HeadDisplays 1.12.9, not 1.12.8.

## Command Says It Can Only Be Used By A Player

The `/hd` command is player-only. Run it in-game, not from the server console.

## No Permission

All command permissions default to `op`. Grant the relevant permission:

```text
headdisplays.info
headdisplays.create
headdisplays.list
headdisplays.edit
```

## Create Command Fails

Make sure the player has an empty inventory slot. `/hd create <display text>` gives a placement item.

## Startup Checks

A healthy startup includes:

```text
[HeadDisplays] Enabling HeadDisplays v1.12.9
[HeadDisplays] Loading fonts!
[HeadDisplays] Loaded 5 fonts!
[HeadDisplays] Starting to load data for HeadDisplays
[HeadDisplays] Finished loading data for HeadDisplays
```

Scan logs for:

```text
NoSuchFieldError
NoSuchMethodError
NoClassDefFoundError
ClassNotFoundException
UnsupportedClassVersionError
CommandException
NullPointerException
```
