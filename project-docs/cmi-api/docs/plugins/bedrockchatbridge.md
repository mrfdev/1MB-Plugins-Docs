# BedrockChatBridge

## Purpose

BedrockChatBridge is a temporary, fail-closed compatibility feature for servers using CMI Paper chat and Floodgate. It reroutes only chat from Floodgate player UUIDs after CMI has formatted it, then delivers the viewer-specific result as system chat. Java-player chat is left untouched. Remove the bridge once CMI provides the required Bedrock-compatible Paper chat behavior directly.

## Runtime Behavior

- Requires `CMI`, `CMILib`, `floodgate`, and `1MB-CMIAPI-Lib`.
- Requires `Chat.UsePaperType: true` in CMI `Settings/Chat.yml` unless the reviewed safety gate is explicitly disabled.
- Registers late, verifies CMI's Paper formatter exists, rejects an unsafe `MONITOR` formatter, and verifies the bridge listener is ordered after CMI before becoming active.
- Uses the final `ServerLoadEvent` registration as authoritative during cold startup and a next-tick fallback for live feature activation after startup.
- Checks the sender UUID through Floodgate. Eligible messages snapshot their viewers, are rendered separately for each viewer, and are delivered on the main server thread as system chat.
- Stops rerouting immediately on a dependency/API failure. Disable, reload, and shutdown cleanup unregister listeners, cancel queued activation, and clear pending delivery records.

## Shared Feature Lifecycle

BedrockChatBridge extends `AbstractCmiApiFeaturePlugin` and is an explicitly approved enabled-by-default feature. Existing config values still win. It therefore receives the same shared installation policy, dormant mode, dependency metadata, configuration validation, diagnostics, and cleanup used by the other feature jars.

The first shared-feature build copies an existing legacy file without overwriting either side:

```text
plugins/1MB-CMIAPI-BedrockChatBridge/config.yml
  -> plugins/1MB-CMIAPI/BedrockChatBridge/config.yml
```

The copy is staged through a temporary sibling and moved into place atomically where supported. The old file remains as rollback evidence. If the shared destination already exists, it always wins. If an existing legacy file cannot be copied safely, the plugin refuses to start instead of silently replacing customized enable/debug choices.

## Commands

```text
/bedrockchatbridge status
/bedrockchatbridge info
/bedrockchatbridge help
/bedrockchatbridge debug status
/bedrockchatbridge debug health
/bedrockchatbridge debug reload
/bedrockchatbridge debug hooks
/bedrockchatbridge debug config
/bedrockchatbridge debug set config <path> <value>
/bedrockchatbridge debug enable <true|false>
```

The command uses the shared feature gateway. Live enable schedules a late ordering check even when the one-time startup event has already passed. Cold startup still re-registers and validates at `ServerLoadEvent` so an earlier zero-delay task cannot become the final listener order.

## Permission

```text
onembcmi.bedrockchatbridge.admin
```

The permission defaults to `false` and controls diagnostics, configuration edits, and live lifecycle changes. Console and `onembcmi.global.config.set` retain the shared lifecycle control behavior.

## Configuration

```yaml
enabled: true
debug: false
require-cmi-paper-chat: true
```

Keep `require-cmi-paper-chat` enabled. Turning the feature dormant leaves Java and Bedrock chat untouched while keeping only the shared info/help/diagnostic command surface loaded.

## Verification

On a disposable Paper server with CMI Paper chat and Floodgate enabled:

1. Start cleanly and require the `Bridge active` listener-order log.
2. Grant `onembcmi.bedrockchatbridge.admin`, then run `/bedrockchatbridge debug status`, `/bedrockchatbridge debug reload`, and `/bedrockchatbridge debug hooks`.
3. Run `/bedrockchatbridge debug enable false`, confirm the bridge becomes dormant, then enable it and require another safe listener-order result.
4. Send one Java message and one Floodgate message. Java delivery must be untouched; the Floodgate message must appear once per viewer with CMI's viewer-aware rendering.
5. Stop cleanly and require no pending-delivery, scheduler, listener, or linkage errors.

The implementation targets Java 25 and Paper 26.2. `Geyser-Spigot`, DiscordSRV, and dynmap remain optional ordering/integration context rather than trusted delivery dependencies.
