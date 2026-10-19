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
ordinary source-only/generic poison cures (wounded/full and persisted independent
Symbol sleep), sparse onset, unprepared refusal and the existing expended-spell
Immunity boundary; recent/expired/unknown/missing onset,
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
**v0.4.335 — Context Matrix data/mode only**, after the v0.4.334 acceptance commit is confirmed and merged. The following
multi-condition fallback is a separate future dependency; Context Matrix work remains separate from that Cureall dependency.

After interruption inspect accepted GitHub main, pipeline, the active candidate
branch and its Actions results. Project Library copies are recovery/reference
material. `AGENTS.md` supersedes historical start-version instructions in the
preserved direction and continuous-work documents.

Playwright installation procedure: https://playwright.dev/docs/ci

Native v2 fixture review also confirmed inherited normalization limits: manually
attached knockedOutRounds, artifactSleepEffectId and blinded flags are not member
save fields. Their existing live helper regressions remain in core/focused; v2
does not misreport fabricated saved flags as persisted native conditions. The
persisted independent Symbol sleep and separate wounds choice are used for
native isolation. These unrelated persistence closures remain future work.
Immunity's binary half-effect boundary retains poison but spends the prepared
spell and minute, exactly as the accepted implementation specifies.

Reload comparison uses structural equality (object insertion order is irrelevant)
and excludes only the generated empty homunculusAbilityDrainEffects runtime
cache, which the accepted normalizer does not serialize as a member field. A
nonempty value is never ignored. Poison/source/history fields retain literal
missing/null/false/zero distinctions throughout all comparisons.

## Native v2 fixture repairs — 2026-10-16

Actions run 38841703587 reached the first restoration check after 17 passing
assertions. The original campaign had been saved before its first real reload;
accepted migrateSave initializes daily weather, vessel capacity/condition and
RNG at that boundary. The suite now performs the native save/reload/save sequence
before capturing the original campaign and storage. All exact restoration and
RNG checks remain in force; no production initialization is bypassed or ignored.

Run 38929428071 then passed 23 scenarios and 358 assertions before the explicit
artifact wounds expectation failed. Accepted artifactApplyCureall uses
Math.max(priorHp, maxHp - remainingDie), also asserted by the v0.4.333 sole-wounds
core control. The fixture had incorrectly expected maxHp - remainingDie even
when that would reduce existing HP. Its exact expected HP now includes the
accepted non-harming floor. The wound die still precedes the penalty draw;
printed 100 PP, source/sleep isolation and exact resulting seed stay asserted.
Neither repair changes a production byte or removes an assertion. These are new
prospective tests of the accepted baseline, not reruns of the missing 523 suite.

Native Acceptance v2 was established prospectively by Actions run 38929949995:
33 scenarios and 508/508 assertions on each exact v0.4.333 and v0.4.334 game.
The acceptance metadata commit reruns every required procedure before promotion.

## v0.4.335 — Context Matrix data/mode acceptance

Candidate `d4cfd684f0ad7a7c8be23b31803ae5cd1b076020` passed all 10 required jobs on [Actions run 38961050097](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/38961050097). 2316 core, 1232 focused, 4 × 579 fresh Chromium, syntax, exact-production boot, native save/reload and Native Acceptance v2 (33 scenarios, 508/508 on accepted v0.4.333 and v0.4.335) were green. The legacy 523 checks remain historical and were not rerun. `validation/context-matrix-mode.mjs` independently verifies 46 workbook profiles and calibration, isolated mode selection, real browser save/reload, malformed-mode validation and unchanged RAW/AAE dispatch. A single inherited default regression expectation was updated from MATRIX to RAW without renaming or deleting any inherited test. The closed settings panel requires invoking its actual DOM button handler rather than Playwright visibility clicks; no production UI changes were needed. The exact acceptance commit and main must also pass CI; see the newest audit/pipeline/Actions for their final promotion status.

## v0.4.336 pure calculator

The required smoke job executes node validation/context-matrix-calculator.mjs for all 36 workbook Spear references, canonical profile cross-product, all Range Profiles, signed Excel rounding, clamps, Nil/unknown neutrality and natural attack exclusions. This calculator is not imported by live combat. Native Acceptance v2 provenance remains unchanged.

## v0.4.337 candidate — per-attack metadata

Required native smoke additionally runs validation/monster-attack-context.mjs to verify source-backed attack-level metadata and preserved damage, unknowns and serialization. This checkpoint does not call the pure calculator in live combat.

## v0.4.337 accepted metadata-only natural attack measures

Candidate 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f passed all ten required jobs on run 39056696281. Core 2316/2316, focused 1232/1232, four fresh Chromium slices 579/579 each, Native Acceptance v2 508/508 on reference and candidate, ordered coverage and native boot green. Sidecar plus runtime fixture independently prove 41 natural attacks enriched across 19 canonical profiles, 1151 unresolved attack measures across 628 profiles, unchanged damage and serialized/reloaded attack metadata. Full CI must pass on acceptance-ledger commit and merged main before promotion is final. The historic 523 test remains historical.

## v0.4.338 live Context Matrix candidate — NOT ACCEPTED

Verified v0.4.336 calculator called only by eligible weapon hits after existing damage effects. A canonical source-verified monster physical profile or explicit encounter override supplies Size/Protection; true engagement Measure and explicitly supplied Space are required. Missing facts fail neutral. RAW, AAE, natural/special attacks and RNG unchanged. No new 1-point minimum damage floor is assumed. Required native smoke additionally runs validation/context-matrix-live.mjs; promotion requires separate candidate and ledger/main green CI.

Candidate v0.4.338: required acceptance was requested after the source-pinned production builder commit. This annotation is not a promotion or acceptance record.

Candidate v0.4.338 additional bounded verification: actual ranged weapon band (not guessed from melee), live PC negative modifier hit, real browser save/reload of explicit combat Space; missing missile band/Space remains neutral.

Extended candidate v0.4.338: qualifying complete required CI explicitly requested after verified missile-range integration and the real reload test were committed.

## v0.4.338 accepted metadata — live eligible weapon damage

Qualified candidate 134c7ddf3521cb5423edda21dc4cc5a81277566b passed all ten required checks on https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39082900442. Core 2316/2316, focused 1232/1232, Chromium 579/579 x4, Native Acceptance v2 508/508 on reference and candidate, ordered coverage green. Exact production SHA-256 b47b9828c657e01cfbef25df3711b9da46931220e5a68a2467262bb86160af33. The unchanged accepted calculator is embedded verbatim. Mode isolation, natural exclusion, live PC positive and negative hits, armed monster, canonical missile, unknown neutrality, trace and true Space/mode save-reload were verified. Minimum-one floor unresolved, no introduced rule. Full acceptance-metadata commit and merged main CI still required; no visual/spatial content added.

Acceptance ledger commit ba7c24632adfb1130f36ecd7aae22da27c08eb02 records qualified v0.4.338; this follow-up invokes separate required acceptance-metadata CI before any main promotion.

## v0.4.343 — bounded surprise/Measure verification

Eight dedicated embedded regressions add 648 opposed-dice/side/band/intent cases,
legal first-contact preferences, impossible geometry, six independent opponents,
surprise expiry, absent raw dice, pure RAW isolation and save migration. They run
in the full deterministic and four fresh Chromium gates. The existing ordered
2316 core identities and bodies are preserved; totals are 2324 core and 1240
focused, four 581-test slices. No extra attacks or dice are introduced.

The required native smoke job additionally runs
`node validation/surprise-measure-native-v0.4.343.mjs`: two exact-production public
command scenarios, native pending/resolved saves and real reloads, 32 assertions,
zero external network or browser errors. Fixture adapters remain ephemeral. The
synchronous automatic foe surprise period carries a temporary active-side marker;
the existing saved PC pending period remains authoritative, and historical
encounter surprise flags never prolong either period. Old-save dice stay absent.

Local supplementary browser evidence may use an installed Chromium 140 headless
shell if the workspace cannot obtain the pinned browser. Such local evidence is
not the pinned GitHub acceptance run; promotion still requires every exact-SHA
CI job using the repository's unchanged Playwright dependency. Native Acceptance
v2 and the immutable v0.4.333 reference continue unchanged.

## v0.4.344 — directional weapon coverage

Eight dedicated embedded regressions test presented point fronts and actual rear
approaches, lateral polearm coverage, surrounding two-handed sword/bastard-2H
coverage only with explicitly Open clearance, unknown/null/zero/false facts,
spellcasting, six independent attackers, actual weapon changes and pure RAW.
Inherited test bodies are preserved. Required totals: 2332 core, 1248 focused;
fresh ordered Chromium slices contain 583 names each.

`node validation/weapon-coverage-native-v0.4.344.mjs` is an additional required
native-smoke step. It executes the eight dedicated definitions in Chromium and one
exact-production public save/reload scenario: 9 scenarios / 13 assertions, plus
the assertions inside the eight definitions, zero browser or network errors.
Declared facing snapshots and independent Measure survive native boot and reload;
RNG/time, rule choices and planning-only contracts remain unchanged. All earlier
required gates and immutable-reference Native Acceptance v2 stay in force.

See `design/context-matrix/WEAPON-COVERAGE-CONTRACT.md`. This is optional contextual
approach geometry, not RAW, not a new Size bonus, no weapon damage change and no
claim of gameplay balance. Oversized clearance remains a separate dependency.


## v0.4.345 — oversized rigid-weapon physical clearance

Eight new embedded regressions test dungeon pike PC/NPC attack and Measure/ZOI
refusal, exact and interval-length spacious exceptions, 10-foot benchmark and
explicit long lances/poleaxes independent from Size, separate transport/deploy/use
facts, ordinary entry refusal with no cost/equipment mutation, pure RAW and
usable contextual damage/RNG equality, natural exclusion and fighting withdrawal,
and literal missing/null/false/zero facts and old/repeat migration. Totals:
2340 core, 1256 focused, 585 names in each of four fresh Chromium slices.

`node validation/rigid-weapon-native-v0.4.345.mjs` additionally runs all eight
definitions plus three exact-production native command scenarios: ordinary entry
refusal, explicit referee physical-fact recording and save/reload followed by a
permitted entry, and an unusable pike attack refusal. 11 scenarios / 26 outer
assertions, plus embedded assertions; no browser/console/network errors. Earlier
gates and Native Acceptance v2 remain required unchanged. New physical facts are
separate from damage mode, player knowledge and the later scene-coordinate work.
See `design/context-matrix/OVERSIZED-WEAPON-CLEARANCE-CONTRACT.md`.


## v0.4.346 — direction-independent current-Measure Size

Eight new embedded definitions test 9,720 all-d6/Size/band/direction/intent
comparisons and 3,888 actual wolf/weapon comparisons, sidearm switching, six
independent opponents, surprise/unknown dice/contact/barrier boundaries, casting,
unusable weapons, pure RAW and old/repeat migration. Totals are 2348 core, 1264
focused and 587 names in each of four fresh Chromium processes.

`node validation/measure-size-native-v0.4.346.mjs` runs those eight definitions
and four exact-production command cases: Close dagger Open, Far spear Press,
neutral normal-sword control and pure RAW bypass. Native movement choice reuses
the original saved initiative dice; the actual equipment command switches a
carried sidearm in the ordinary window, and real save/reload preserves pair
Measure, initiative, actual equipment, RNG, independent rule choices and ships.
The inherited 1080-case mode gate and 20-case Measure gate remain required. Three
values in the latter change for the expressly superseded intent/natural-point
restrictions; no case or assertion is removed. Local Chromium 140 is supplemental
only; exact-SHA GitHub acceptance retains the unchanged pinned Playwright browser.
See `design/context-matrix/CURRENT-MEASURE-SIZE-CONTRACT.md`. Ferocity and natural
proximity damage remain later independently accepted checkpoints.
