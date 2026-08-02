# CMI 9.8.9.6 Chat Compatibility Pass

This records the first isolated compatibility pass for CMI 9.8.9.6. It follows the [live-tested 2026-08-02 rollback baseline](../compatibility-baselines/live-tested-2026-08-02.md).

## Result

**Status: startup-compatible; controlled player-chat testing remains required.**

No 1MB source or jar was changed for this pass. Only CMI was replaced:

| Component | Tested version | SHA-256 |
| --- | --- | --- |
| Paper | 26.2 stable build 87 | `3ab7536642d04c504a06fe43174b8a94f8c5f25d5847d4672212413f6e54b906` |
| CMI | 9.8.9.6 | `7cee77eba04457ab0c46efda56c13b7f65cb32e971f3cfc9d11f2c28d979b013` |
| CMILib | 1.5.9.9 | `6d3d3d73d04a1e70987bd899198971af6bbb5b34550e621f2df8a9cb7bee9862` |
| 1MB feature plugins | 1.0.1-559 | unchanged from the rollback baseline |
| Java runtime | 25.0.4 | Java 25 target |

PaperScript confirmed that build 87 was still the latest stable Paper 26.2 build before this test.

## Automated Evidence

- The server reached `Done` in 17.307 seconds.
- CMI 9.8.9.6 and CMILib 1.5.9.9 enabled normally.
- Every 1MB 1.0.1-559 plugin enabled without `NoSuchMethodError`, `NoClassDefFoundError`, linkage errors, or failed enables.
- StaffMsg, NotableMsg, FilterLab, FilterGuard, MessageFont, ConsoleNoiseRouter, and DiscordChat status commands completed.
- FilterLab still registered its Paper `AsyncChatEvent` monitor and both CMI filter-event hooks.
- StaffMsg, NotableMsg, and DiscordChat subscribed to DiscordSRV and unsubscribed during shutdown.
- CMI registered its new Paper DiscordSRV chat listener.
- The server stopped cleanly. The complete startup-to-shutdown log contained no error, exception, linkage-failure, or unhandled-command lines.

DiscordChat's admin check still reports its existing reward setup work: disabled CMI kits, the missing `points` command root, and unresolved reward permission nodes. Those are reward-configuration issues, not evidence of a CMI chat incompatibility.

## CMI Configuration Migration

CMI migrated its existing configuration without discarding the established chat formats. Relevant changes include:

- `Settings/Chat.yml` now contains `Chat.UsePaperType: true`.
- CMI moved chat listener priorities into the new `Settings/EventPriorities.yml`.
- CMI's default format priority is now `HIGHEST`; filter and caps handlers remain earlier priorities.
- Item chat gained the icon replacement and expanded `[item:...]` options.
- Chat head and sprite support were added by CMI.
- The former inline priorities were removed from `Chat.yml` and `ChatFilter.yml`.

StaffMsg and NotableMsg intercept Paper chat at `LOWEST`, before CMI's `HIGHEST` format stage. Their optional legacy Bukkit listeners remain enabled for duplicate/leak protection. This ordering is sound by inspection, but only a real player message proves the complete runtime path.

## Affected 1MB Features

The direct chat-event consumers are:

- 1MBStaffMsg: Paper and legacy chat cancellation, CMI staff delivery, recent history, and Discord relay.
- NotableMsg: Paper and legacy chat cancellation, persistent notable mode, recent history, and Discord relay.
- FilterLab: Paper chat and CMI filter/caps event observation.
- EventRecorder: CMI filter/caps event observation.
- SocialGatherings: Paper chat activity observation.

Related behavior also needs observation in MessageFont, FilterGuard, RecordingMode, DiscordChat, Nick, and ConsoleNoiseRouter because these features transform messages, apply CMI rules, control visibility, bridge Discord activity, affect display names, or classify chat log output.

## Controlled Player Test Order

Use two Minecraft accounts and one Discord observer. Complete one section before moving to the next so the first changed behavior is easy to identify.

1. **Plain public chat:** send one ordinary message. Require exactly one Minecraft message and exactly one Discord relay. Confirm the correct nickname/display name and no console exception.
2. **CMI rich chat:** separately test a URL, `[item]`, a player mention, and a configured gradient. Require one correctly formatted result for each.
3. **StaffMsg:** test `/s <message>`, `#<message>`, and persistent staff chat. Require one staff delivery, one intended Discord staff relay, recent-history capture, and no public-chat leak.
4. **NotableMsg:** test `/n <message>` and persistent notable mode. Require one intended delivery/relay and no public-chat leak.
5. **Filters and transforms:** test a configured CMI filter phrase, caps handling, MessageFont, and a muted player. FilterLab/EventRecorder should count each event once.
6. **Visibility and identity:** test RecordingMode and a nicknamed player. Confirm hidden recipients remain hidden and CMI display names are preserved.
7. **CMI moderation paths:** test chat delete and sign spy separately, then inspect the console for duplicate or malformed output.
8. **Reconnect check:** leave persistent StaffMsg/NotableMsg mode off, reconnect both accounts, and repeat one plain and one private message.

Stop at the first duplicate, public-channel leak, missing recipient, formatting loss, or exception. Preserve `logs/latest.log` and note the exact test message before changing listener priorities or source code.

## Test Server State

The test server is stopped with CMI 9.8.9.6 active for the next controlled test. CMI 9.8.8.5 is retained under `plugins-disabled/cmi-compatibility-test/`, and the exact proven binary/configuration pair remains in the ignored local rollback archive documented by the baseline.
