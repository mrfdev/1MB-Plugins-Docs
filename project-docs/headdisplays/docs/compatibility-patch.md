# Compatibility Patch

This page describes the local 26.2 compatibility patch applied to `HeadDisplays-1.12.9.jar`.

## Root Cause

HeadDisplays 1.12.9 uses a modern NMS shim:

```text
net.arcaniax.headdisplays.nms.v1_21_R6.PacketArmorstandImpl
```

That class constructs client-side item display packet entities for rendered HeadDisplays.

On Paper/Minecraft 26.2, the direct static NMS field below is no longer available:

```java
EntityType.ITEM_DISPLAY
```

When the original jar tries to create a display, Paper throws:

```text
java.lang.NoSuchFieldError: Class net.minecraft.world.entity.EntityType does not have member field ITEM_DISPLAY
```

The result is that the hidden barrier/control block exists, but the client never receives the visible item-display packet entity.

## Patch

The patched class resolves the item display entity type through the registry:

```java
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.Identifier;

private static final Identifier ITEM_DISPLAY_KEY =
        Identifier.withDefaultNamespace("item_display");

EntityType<?> itemDisplayType =
        BuiltInRegistries.ENTITY_TYPE.getValue(ITEM_DISPLAY_KEY);
ItemDisplay itemDisplay = new ItemDisplay(itemDisplayType, level);
```

This replaces the direct field access:

```java
new ItemDisplay(EntityType.ITEM_DISPLAY, level)
```

## Scope

Only this class was replaced:

```text
net/arcaniax/headdisplays/nms/v1_21_R6/PacketArmorstandImpl.class
```

The patch intentionally does not change:

- `plugin.yml`
- Plugin version metadata
- Public commands
- Permissions
- Saved data format
- Font files
- Display metadata behavior beyond entity type lookup

## Verification

Bytecode inspection confirmed the patched class references:

```text
BuiltInRegistries.ENTITY_TYPE
Identifier.withDefaultNamespace("item_display")
SynchedEntityData.getNonDefaultValues()
```

and no longer references:

```text
EntityType.ITEM_DISPLAY
```

Local smoke tests confirmed HeadDisplays loads on Paper 26.1.2 and Paper 26.2, and the previous 26.2 `NoSuchFieldError` signature is absent.

## Developer Handoff

Suggested upstream source change:

```diff
+import net.minecraft.core.registries.BuiltInRegistries;
+import net.minecraft.resources.Identifier;
 import net.minecraft.world.entity.EntityType;

+private static final Identifier ITEM_DISPLAY_KEY =
+        Identifier.withDefaultNamespace("item_display");

-ItemDisplay itemDisplay = new ItemDisplay(EntityType.ITEM_DISPLAY, level);
+EntityType<?> itemDisplayType =
+        BuiltInRegistries.ENTITY_TYPE.getValue(ITEM_DISPLAY_KEY);
+ItemDisplay itemDisplay = new ItemDisplay(itemDisplayType, level);
```
