# Treat Bag claim control: Paper 26.3, November 1, 2026

Canonical suite build **828** targets Paper **26.3 STABLE build 235**
(`26.3-235-bb10cf0`). All **68** managed JARs were built, synchronized to the
maintained local server, tested and staged for manual live replacement.

## Defect and correction

The Treat Bag placed its claim action at inventory slot 22, then rendered daily
history into slots 19, 20, 21 and 22. A fourth receipt date replaced the action
with a non-clickable history label, producing no chat response on click.

Daily history now uses only slots 28–34 and 37–43. Summary slot 13, claim/status
slot 22 and the footer remain independent. History shows the newest 14 dates;
totals and oldest-first claim selection still include every saved receipt.
This correction changes no reward persistence, CMI payout, expiry or claim
eligibility behavior.

## Verification

- A probe against copied live build 820 JARs reproduced the four-date failure.
  The new regression tests failed before the source correction and passed after
  it: 27 tests in `DoorClaimExpiryGuiTest`, including 22 new cases, zero skips.
- `scripts/build-all.sh` completed the clean canonical suite build: 7,897 tests
  recorded, 7,856 passed, 41 skipped, zero failures/errors. Skips concern
  optional owned Pyro/mcMMO fixtures and unavailable local ShopGUI+ fixture data.
- An independent probe loaded the packaged EventHunts and Core JARs, rather
  than production class directories. All 1,654 assertions passed. Cases include
  four dates with 140 receipts (45 waiting, 95 processed, three audit notes),
  0/1/3/4/5/14/15/30 history dates, expired and empty bags, all footer controls,
  rejected alternate clicks and exactly one delayed claim-handler invocation.
- Native Paper 235 started on Oracle Java 27, enabled Doors, loaded all 60
  registrations, reloaded successfully and passed all 47 reward preflight
  entries with CMI available. It then disabled Doors and stopped cleanly with
  exit code zero. No ERROR/SEVERE/exception log entries were found.
- The local smoke retained pre-existing debug/inactive-event configuration
  warnings. No physical door blocks were loaded for inspection and no human
  client payout was attempted. GUI action coverage used synthetic receipts;
  the native smoke verified lifecycle and provider readiness.
- `stageTestedJarsForLive` verified the complete suite. All 68 staged artifacts
  matched the tested server JARs byte for byte. Every `com/onemb` class targets
  Java 25, class major 69.

Oracle installations were resolved dynamically with the repository wrappers:

| Role | Version | Installed home |
| --- | --- | --- |
| Gradle/compiler | Oracle 25.0.5.0.3 | `/Library/Java/JavaVirtualMachines/jdk-25.0.5.0.3.jdk/Contents/Home` |
| Automated tests/Paper | Oracle 27.0.1.0.3 | `/Library/Java/JavaVirtualMachines/jdk-27.0.1.0.3.jdk/Contents/Home` |

The paths above record this run; build scripts do not hardcode patch versions.
The Paper bootstrap SHA-256 was
`4ebaf5c9da98c654bb8f17245799943dfb05a285830be4307bfdf7bc9ca024bf`.
Official Paper documentation and exact build-235 API metadata were checked;
the correction introduces no new Paper API calls.

The local server was left stopped and the backed-up Event Hunts/Doors
configuration checksums were preserved. Live server modifications and its
restart were left to the owner. The owner subsequently supplied successful
live reward preflight and health output on Paper 235, with only the previously
known golden-pressure-plate warning. A post-update player claim confirmation
had not yet been supplied when this record was written.

Detailed local evidence is retained under ignored
`.scratch/doors-claim-fix-2026-11-01/` and
`.scratch/doors-claim-diagnosis-2026-11-01/`.
