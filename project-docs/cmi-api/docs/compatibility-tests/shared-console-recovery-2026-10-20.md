# Shared transaction recovery from console

Tracked in [issue #82](https://github.com/mrfdev/1MB-Library/issues/82).

## Cause and change

The shared `debug transactions` and `debug transaction <uuid>` routes checked only `require(sender, "admin")`. A permission declared with `default: false` therefore rejected the direct server console, even though neighbouring shared admin routes explicitly allowed `ConsoleCommandSender`.

The transaction route now accepts the established `hasSharedAdminPermission` result, with the existing `require` check as its fallback. This preserves feature-specific authorization overrides, including Diagnostics' existing non-player access, and preserves denial feedback and events for unauthorized players. No permission identifier, default, grant, recovery state transition or delivery implementation changes.

The base helper's console exception applies to `ConsoleCommandSender`. It does not automatically authorize `RemoteConsoleCommandSender` or `ProxiedCommandSender`; those senders retain their existing permission and feature-specific checks.

## Regression

`FeatureTransactionDebugAccessTest` drives the real shared command gateway and shared transaction route with temporary durable journals and payload escrow. Before the production change, its 44 cases produced exactly 17 failures, all caused by denied console access. The other 27 cases passed.

The regression covers:

- Console with a false admin permission result and an explicitly authorized player listing and inspecting receipts without mutation.
- Delivery acknowledgement, finalization, refund acknowledgement and retry, including terminal-state idempotency and retrying only the remaining stored command.
- Unauthorized players receiving the existing denial feedback and event, without receipt disclosure, store access, mutation or dispatch.
- Unprivileged remote/proxy senders remaining denied and existing feature authorization overrides remaining effective.
- Required confirmation, allowed state transitions, feature preflight, explicit force for uncertain delivery, and evidence that command delivery actually began.

The focused reproduction command is:

```sh
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home \
PATH=/Library/Java/JavaVirtualMachines/jdk-25.0.4.1.jdk/Contents/Home/bin:$PATH \
gradle :libs:1mb-cmiapi-lib:test \
  --tests com.onemb.cmiapi.lib.FeatureTransactionDebugAccessTest
```

After the production change, all **55** focused cases passed: 44 transaction-access regressions and 11 existing gateway, admin and help/debug contract tests.

## Canonical local build

`scripts/build-all.sh` completed suite **1.0.4-792** using JDK **25.0.4.1**, Java 25 bytecode and Paper **26.3 STABLE 207**. It verified that the maintained local server was stopped, checked the current stable Paper build and synchronized all **66** managed JARs with matching checksums.

The complete suite ran **6,789 cases: 6,748 passed, 41 existing optional skips, zero failures/errors**. This includes 599 shared-library cases (597 passed, two skipped), 2,784 Forage cases (2,756 passed, 28 skipped), and all 24 build-logic cases.

## Native local console verification

The maintained `servers/Paper-26.3/` instance started on Java **27+35-2325** and completed startup at **17:26:53 Europe/Amsterdam**. The temporary probe used the actual Bukkit terminal console and actual `/forage` command gateway. It first verified that the console still returned `false` for `onembcmi.forage.admin`.

At 17:26:55, **109 assertions passed across 23 native commands** against six isolated receipts. Actual console output showed successful listing and inspection. Delivery acknowledgement and finalization saved `FINALIZED`; refund acknowledgement saved `REFUNDED`. Missing confirmation, invalid states, repeated acknowledgements and an empty-command retry retained the expected safeguards. Saved statuses, revisions and primary/backup payload retention or removal were independently checked on disk.

Fixtures had no payout commands and used a separate journal and escrow. The probe temporarily substituted those two services during one synchronous command block and restored both before returning to the scheduler. No player was online. Existing Forage journal records, escrow and profile files remained byte-identical across the run. Other Forage domain files were written by the ordinary server lifecycle; the complete before/after hash comparison is retained privately.

After restoration, `/forage admin check` reported **zero errors, 37 successful checks and two existing configuration warnings**: the normal test balance preset and shovel/brush sand-family overlap. `/forage debug runtime` reported available storage, queue zero, no storage failure, no pending actors, no recovery holds and ready external providers.

The server shut down cleanly at **17:27:18** and its tmux session exited. The probe JAR and isolated data folder were removed from the server; their source, results and synthetic receipts remain in the private test evidence. All 66 managed JARs remain the tested build 792. The local server is stopped.

This validates direct-console access and local recovery behavior. Actual reward delivery, external-save acknowledgement and connected-player gameplay are outside this isolated test. **No live server access, deployment, restart, permission change or receipt operation was performed for #82.**

## Paper API review

Reviewed the current [Paper documentation index](https://docs.papermc.io/llms.txt), the official [plugin.yml permission documentation](https://docs.papermc.io/paper/dev/plugin-yml/), and the [26.3 console Javadoc](https://jd.papermc.io/paper/26.3/org/bukkit/command/ConsoleCommandSender.html). The Javadoc version alias served older build metadata and an exact build-207 URL was unavailable; the actual `26.3.build.207-stable` API artifact independently confirmed the console, remote-console and proxy interface hierarchy with `javap`. This change introduces no new Paper API or lifecycle behavior.

Private test logs, native probe fixtures and local runtime evidence are retained under `.scratch/console-recovery-82-2026-10-20/`.
