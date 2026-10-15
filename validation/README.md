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
npm run validate:native-established
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

## Mandatory native procedure blocker

The independent **523 native check definitions and runner** cited in the latest
accepted audit are absent from the recovered Known World inventory and saved
validation archive. The archive contains only `local-run.cjs`, eight new test
definitions, reports, summary and README. GitHub's old v0.4.183 tree contains only
the HTML and audit. Therefore the original native sequence, fixtures and exact
assertions cannot be rerun from these files. No incompatibility between those
procedures and GitHub Actions has been established; their executable definitions
were not preserved.

`Required established native acceptance` deliberately reports **blocked** and
exits nonzero while `establishedNativeScript` is null. The final `Required
acceptance gate` must fail even when every available regression and supplemental
browser check passes. Missing procedure evidence is not a pass or a skipped
required test. Recover the actual runner from authorized Known World material,
preserve its checks, review its interface and wire it into this gate before
claiming full acceptance. The adapter expects a complete named report, at least
the established 523 checks, no failures, isolation, actual save/reload and zero
page/console errors. Review the recovered assertions as well as their counts.

The workflow uploads JSON evidence on success and failure. Inspect workflow
jobs and artifacts for the exact tested commit. Never accept from a partial run,
a historical report or a result for different game bytes.

## Acceptance and recovery

After all required validation is green, update the audit, pipeline and current
manifest's accepted version in a clear acceptance commit, rerun checks on that
recorded commit, then merge only the bounded checkpoint. Do not merge this
preserved candidate during the migration. Next checkpoint remains
**v0.4.334 — Ordinary Cureall Baldandar poison discovery only**. The following
multi-condition fallback is a separate future dependency; no v0.4.335 work is
included here.

After interruption inspect accepted GitHub main, pipeline, the active candidate
branch and its Actions results. Project Library copies are recovery/reference
material. `AGENTS.md` supersedes historical start-version instructions in the
preserved direction and continuous-work documents.

Playwright installation procedure: https://playwright.dev/docs/ci
