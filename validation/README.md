# Known World acceptance procedures

GitHub `main` is the accepted ledger; `work/vX.Y.Z` branches contain candidates.
No workflow promotes game code or changes an acceptance record automatically.

## Recovered procedures and provenance

`recovered/local-run.cjs` is the unmodified runner from the Known World
`_working/Known-World-v0.4.334-local-validation.zip`. It executes the embedded
`coreHarnessTestDefinitions` through the existing `runHarnessTests` isolation
wrapper. Node VM results with inert DOM stubs are deterministic evidence only.
They are never described as browser acceptance.

Version manifests preserve every exact ordered core name and the established
v0.4.200+ focused subset. The v0.4.333 manifest is the preserved candidate report
with exactly its eight v0.4.334 additions removed; a byte diff verified that no
earlier regression or implementation body changed. Accepted main's game SHA-256
is `0ebadf15242055ae394bf921fda68ca9203a2536b4cd75f33385cc1652ede2d7`.

The complete candidate archive and original status are preserved on
`work/v0.4.334`, with candidate game SHA-256
`25e5e5ecbb2dc3b859c541e3f4865dbdbe14f460ec0790787a86c0809f5f6ff6`.
Historical accepted evidence remains 2308 core, 1224 focused, four 577 Chromium
slices and 523 native checks. Fresh CI results are separate evidence.

## Commands

Use Node 24 and `npm ci --ignore-scripts`. Run:

```sh
npm run validate:syntax
npm run validate:core
npm run validate:focused
npx playwright install --with-deps chromium
node validation/browser-run.mjs slice 1
node validation/browser-run.mjs slice 2
node validation/browser-run.mjs slice 3
node validation/browser-run.mjs slice 4
npm run validate:native-smoke
npm run validate:native-v2
npm run validate:coverage
```

Each slice is a separate fresh Chromium process. The browser adapter exposes only
the existing embedded definitions and runner in an ephemeral served copy. It
does not modify test bodies or write the bridge into production. Both the slice
adapter and the supplemental command checks first boot the exact production
HTML. Four slice reports must concatenate to the entire ordered core manifest
exactly once. Every report must match the tested game hash and CI commit.
Failures, missing reports, missing isolation, extra/omitted/reordered names,
page/runtime errors, console errors and external network attempts fail checks.
`node --check` validates every extracted production script.

Supplemental native checks use the already established Baldandar fixture to
seed a save, then use the unmodified page's command form, actual boot migration,
native spell expense, native save and real page reload. They check active/cured
source records, explicit sleeping, HP/history, exact slot/minute costs, RNG,
rule toggles and planning-only contracts. v0.4.333 uses its accepted Neutralize
Poison path; v0.4.334 uses its candidate sole-condition Cureall path. These
checks are new CI transport verification, not a reconstruction of 523 checks.

## Native Acceptance v2 — prospective GitHub-era baseline

The user authorized a bounded recovery attempt and, if unsuccessful, a documented
prospective baseline. On 2026-10-16 the attempt inspected all repository history
paths, migration records, the candidate ZIP and extracted archive, the accepted
audit and the entire scoped `/Known World/` inventory including `_working/`.
No historical 523-check runner was recovered. The only relevant ZIP contains
local VM definitions/reports, not an independent native runner. The earlier
catalogue handoff ZIPs predate this suite. The inherited **523/523** result remains
historical evidence; **it was not rerun**, imitated, or silently relabeled.
`established-native.mjs` is retained as the old blocked recovery adapter.

`native-v2.mjs` is an explicitly new suite reconstructed from the accepted audit
entries v0.4.294–333, their recoverable fixture procedures, and the current exact
production/browser command and save procedures. It runs 33 named scenarios:
ordinary source-only poison cures (wounded/full and three independent sleep
causes), unprepared and Immunity refusals; recent/expired/unknown/missing onset,
wound death and zero/null former HP; missing/null/false/zero/empty/truthy source
originals; artifact Neutralize Poison/Heal sole/explicit/independent choice,
multi-condition/range/dead/PP/unknown/unsupported/absent-condition refusals;
actual Wood Spider and Medusa source cures. Each scenario checks native public
commands, literal active and cured/refused save/reload, exact spell slots or PP,
RNG/time, wound/death/former-HP integrity, rule toggles, planning-only ship records,
read-only inspection and full original storage/campaign restoration between
cases. No test bridge is shipped or used to invoke measured native commands.
Failures, missing scenarios, duplicate names, console/page errors and external
network attempts fail the new gate. Actual totals are recorded in CI reports and
acceptance records; there is no claim of historical-suite equivalence.

Actions runs this same new suite against byte-exact accepted v0.4.333
(`9f1b4832def3e3cabf923b702d8117b445201ce8`) and the current candidate. Once both
pass and v0.4.334 is accepted, Native Acceptance v2 becomes the prospective
GitHub-era native acceptance baseline. Historical evidence stays separate.

## Acceptance and recovery

After all required validation is green, update the audit, pipeline and current
manifest's accepted version in a clear acceptance commit, rerun checks on that
recorded commit, then merge only the bounded checkpoint. The migration is complete; the current continuation is authorized to accept
and merge the resolved candidate. Next checkpoint remains
**v0.4.334 — Ordinary Cureall Baldandar poison discovery only**. The following
multi-condition fallback is a separate future dependency; no v0.4.335 work is
included here.

After interruption inspect accepted GitHub main, pipeline, the active candidate
branch and its Actions results. Project Library copies are recovery/reference
material. `AGENTS.md` supersedes historical start-version instructions in the
preserved direction and continuous-work documents.

Playwright installation procedure: https://playwright.dev/docs/ci
