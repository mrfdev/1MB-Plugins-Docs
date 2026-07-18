# GUI Adversarial Test Matrix

Use this matrix for every new or changed inventory GUI before live deployment. It applies to the shared `GuiService` consumers and bespoke holders such as AFKShrine, CMIConfig, Exchange, VoteTokens, and DiscordChat.

## Automated Contract

Run:

```text
gradle :libs:1mb-cmiapi-lib:test --tests '*GuiAdversarialMatrixTest' --tests '*InventoryCapacityTest'
```

The automated contract verifies the production input policy, owner/session registry, action gate, and inventory-capacity helper:

| Scenario | Automated expectation |
| --- | --- |
| Plain left click | Accepted only for an actionable top-inventory button. |
| Right click | Rejected by default; accepted only when the button explicitly opts in. |
| Shift-left / shift-right | Rejected by default; accepted only when explicitly listed. |
| Number key / hotbar swap | Rejected. |
| Offhand swap | Rejected. |
| Drop / control-drop | Rejected. |
| Double-click | Rejected. |
| Creative / middle click | Rejected. |
| Window-border / unknown click | Rejected. |
| Player-inventory click | Cancelled by a managed GUI and never treated as a top button. |
| Invalid or outside raw slot | Rejected. |
| Drag | Every drag while a managed GUI is open is cancelled. |
| Rapid repeated click | One action can be pending per session; the same slot is debounced for 250 ms after release. |
| Stale menu | Owner, unpredictable nonce, and exact inventory identity must all match. |
| Replacement page | Delayed callbacks from the replaced page fail the current-session check. |
| Close and reopen | Closing invalidates pending/debounce state; a fresh nonce can act. |
| Reconnect | The disconnected session is removed and its nonce cannot be reused. |
| Plugin disable | Shutdown clears state and rejects new action claims. |
| Two players | Owners and pending actions remain isolated. |
| Full inventory | Delivery capacity is zero when no empty or matching stack space exists; no economic action should start. |

`GuiInputPolicy` is used by the shared GUI service and the bespoke AFKShrine, CMIConfig, and Exchange holders. Shared-service buttons use `GuiClickPolicy`, where plain left-click is the default and every alternate click must be opted into explicitly. `InventoryCapacity` is available to reward/trade preflights that deliver exact items.

## Paper 26.2 Run

Run these rows on the test server for each applicable GUI. Start with an expendable test player and disposable test currency/items. Record the plugin, page, action, transaction id where applicable, and result.

| Test | Procedure | Pass condition |
| --- | --- | --- |
| Left click | Click every actionable control once. | Exactly one intended action runs. |
| Right click | Right-click controls with and without documented right-click behavior. | Opted-in controls run once; all others do nothing. |
| Shift click | Shift-click top buttons and player inventory stacks. | Only documented opt-in controls run; no item moves. |
| Number key | Hover a GUI slot and press `1` through `9`. | Hotbar and GUI contents remain unchanged; no action runs. |
| Offhand | Hover a GUI slot and press the swap-offhand key. | Offhand and GUI contents remain unchanged; no action runs. |
| Drop | Hover GUI slots and press normal and control-drop. | Nothing drops or moves; no action runs. |
| Double click | Double-click actionable and filler slots. | At most one authorized action runs; no collection movement occurs. |
| Creative | Repeat middle-click, clone, and creative inventory actions with a creative test account. | No GUI icon is cloned or moved; no unauthorized action runs. |
| Drag | Drag one stack across top-only and mixed top/player slots. | The entire drag is cancelled and cursor contents remain coherent. |
| Bottom inventory | Click and shift-click every player-inventory area while the GUI is open. | Click is cancelled; no top action runs. |
| Stale page | Open page A, navigate to page B, then rapidly click where page A's button was. | Only page B's current action can run. |
| Permission/config change | Open a page, remove its permission or disable its action, then click. | Action-time validation rejects it without cost or delivery. |
| Reconnect | Open a GUI, disconnect, reconnect, and reopen it. | Old session is gone; new session works once with no ghost item. |
| Quit/kick/world change/death | Interrupt an open GUI through each applicable lifecycle event. | Session and cursor state clear; no delayed action survives. |
| Full inventory | Fill storage with nonmatching full stacks, then attempt an item reward or purchase. | No cost is taken; item remains escrowed or the action refuses before commit. |
| Plugin disable | Open a GUI and disable/restart the feature before its delayed action executes. | GUI closes or becomes inert; restart recovery has one authoritative outcome. |
| Rapid repeat | Spam one action, including two mouse buttons where supported. | One transaction/request is accepted per intended idempotency key. |
| Two players | Have two players use the same page/action simultaneously. | Sessions, costs, items, and results remain owner-isolated. |
| AutoSell interaction | Leave AutoSell active and attempt an integrated item reward. | Manual delivery is blocked or AutoSell is safely disabled before automatic delivery. |

## Coverage Inventory

### Shared `GuiService`

Run the matrix against AutoSell, BirthdayLanterns, CoconutHunt/GhostHunt, Collect, EmoteMenu, Forage, LavaBoots, Menu, Nick, Potions, Spawners, and Upgrade. These features inherit the automated owner/session/input/action-gate contract, but their action-time permissions, costs, capacities, and recovery behavior still require feature-specific Paper testing.

### Bespoke holders

Run every row against:

- AFKShrine
- CMIConfig
- Exchange
- VoteTokens tool input and reward pages
- DiscordChat tool input and reward pages

VoteTokens and DiscordChat must additionally verify that a full inventory, disconnect, stale page, or plugin disable leaves the input item in one authoritative escrow location and never both in escrow and inventory.

## Recording Results

Use one line per feature and scenario:

```text
Build:
Feature/page:
Scenario:
Player(s):
Starting balance/items:
Expected:
Actual:
Transaction or escrow id:
Console error:
Screenshot:
Pass/fail:
```
