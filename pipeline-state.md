# Known World / BECMI Text RPG — Pipeline State

Current accepted build: **v0.4.338**. Newly accepted checkpoints in this Chat continuation: **4**.
Current candidate: **v0.4.339 measure resolution NOT ACCEPTED** — user reprioritized measure control before the previously queued local-scene foundation. v0.4.338 source-pinned Context Matrix live weapon candidate qualified and accepted; main merge/CI verification remains required.
Exact next checkpoint: **v0.4.339 — user-authorized measure resolution**, candidate only. Previously queued local-scene foundation deferred to **v0.4.340** pending future authorization.

## Authoritative ledger

Repository: `Diabolicdonut/BECMI-Mystara`. GitHub main, its exact index.html,
this pipeline and the newest/topmost accepted audit entry govern recovery.
Known World Library files are recovery/reference material only. Never overwrite
newer accepted work with an older prompt or source snapshot. Main contains only
accepted checkpoints; an acceptance metadata commit must pass required CI before
promotion. Inspect main, active work branches, commits and Actions after a freeze.

## Accepted game and validation

**v0.4.338 ACCEPTED (pending main verification):** qualified candidate 134c7ddf3521cb5423edda21dc4cc5a81277566b, green [required Actions 39082900442](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39082900442) with all ten jobs. Production SHA-256 b47b9828c657e01cfbef25df3711b9da46931220e5a68a2467262bb86160af33. Core 2316/2316, focused 1232/1232, Chromium 579/579 x4, Native Acceptance v2 508/508 both immutable reference and candidate. Verified live PC ±3, armed monster, missile hit, RAW/AAE isolation, unchanged natural damage and source-specific attacks, unknown fail-neutral, serialized context, true browser reload. No new minimum-one floor. No graphics. Acceptance metadata and main both separately need green CI.


**v0.4.337 ACCEPTED:** 19 source-verified canonical profiles; 41 actual individual natural attacks enriched with a Close preference, 1151 other attacks left unresolved; 628 total runtime profiles. All damage remains published RAW; no live Context Matrix calculation. Candidate 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f qualified by all ten required successful jobs, https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39056696281. Core 2316/2316, focused 1232/1232, Chromium 579/579 x 4, native v2 508/508 on both reference and candidate. Exact production SHA-256 eba6c44757003104f32f2e2fa0a6a2c30cdd37a456a3695a36d480eddb80b48b. Acceptance metadata and main each must also pass their own exact SHA CI.


**v0.4.336 acceptance:** candidate eb483c7399b9e3836e943512e2834925ed760c0e, qualifying green https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39000565428. Ten required jobs passed, core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 508/508 both baseline and candidate. Exact production SHA-256 c74c2f529566b957a0550178c4d5f51d5164ba67e4658e07d3e7dedb02daaf7d. Acceptance metadata and authoritative main each require new green CI. Only APP_VERSION changes in production HTML. Pure calculator is unconnected to live combat and validates all 36 workbook references, 46 weapon profiles across all 36 contexts, six range families, rounding, clamps, Nil/unknown safety and natural exclusions.

**Binding monster-attack rule:** preferred Measure belongs to each attack for positioning/availability/AI, NEVER published natural attack damage. Natural/breath/projectile/special attacks are ineligible for Context Matrix; armed monster weapon attacks are eligible. No inferred Protection from AC/immunity, target Size from provisional rows or restricted Space from adjacency. See design/context-matrix/MONSTER-ATTACK-MEASURE-CONTRACT.md.

**Next:** v0.4.339 authoritative persistent local-scene coordinates/state, no SVG or Smoking Pillar conversion yet. Natural attacks retain RAW damage.


**v0.4.335 accepted**: candidate `d4cfd684f0ad7a7c8be23b31803ae5cd1b076020`, qualifying [Actions run 38961050097](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/38961050097), ten required jobs green. Production SHA-256 `76b726460d98cf2cf49947ba2aba419a12f5d2c481e02d19c508a512778ba7a5`. **2316/2316 core; 1232/1232 focused; Chromium 579/579 ×4; ordered once-only coverage, campaign isolation, syntax, exact-production boot, native command/save-reload and supplemental Context Matrix selection/persistence checks; zero page/runtime/console errors.** Native Acceptance v2: 33 scenarios, **508/508** accepted v0.4.333 and **508/508** v0.4.335. Historical 523-runner not recovered/rerun; that historical result is not the current test count. Exact acceptance metadata commit and merged main must each be green; do not infer success from candidate CI.

Context Matrix data/mode **complete**: RAW default; independent CONTEXT_MATRIX selected and persistent but live RAW-equivalent; existing AAE and legacy MATRIX damage unaffected. **46 canonical workbook weapon profiles** and source provenance/settings under `data/` and `design/context-matrix/`. Original workbook binary remains in Known World Project; GitHub holds full four-tab extraction, not original XLSX bytes. No contextual arithmetic or integration. The inherited default regression expectation was corrected only for the mandated RAW default; other ordered test identities preserved.

**Previous v0.4.334 evidence (historical accepted checkpoint)**


v0.4.334 is the original preserved ordinary Cureall Baldandar poison-discovery
candidate, unchanged by native fixture repairs.
Production SHA-256:
`25e5e5ecbb2dc3b859c541e3f4865dbdbe14f460ec0790787a86c0809f5f6ff6`.
The only game changes from v0.4.333 are its marker, one poison availability
clause and eight bounded regression definitions; prior bodies are preserved.

Qualifying candidate: `522752b7e3ac0c86be0fefc5ca022ae2e5e9e1da`.
[Actions run 38929949995](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/38929949995):
all required jobs passed. Fresh totals: **2316/2316 core**, **1232/1232 focused**,
**579/579 × 4** fresh Chromium slices, ordered once-only coverage, campaign
isolation, syntax/exact production boot and supplemental public-command/native
save-reload. Zero page/runtime or console errors and no external network attempts.
Consult Actions for the exact acceptance commit and subsequent main results;
the qualifying candidate's pass is not a claim that a pending later run passed.

**Native Acceptance v2: prospective baseline established**, **33 scenarios and
508/508 assertions on each of byte-exact v0.4.333 and v0.4.334**. It exercises
exact production commands, active/cured/refused saves and real reloads,
restoration/isolation, exact RNG/time and spell/PP, death/former-HP, rule toggles
and planning-only ship contracts. The historical independent 523-runner could
not be recovered and **was not rerun**. Its inherited 523/523 result stays
historical. See validation/README.md and native-v2-recovery.md for provenance
and the two documented fixture-assumption repairs.

## Governing boundaries

Mentzer Basic/Expert/Companion/Master primary; compatible Rules Cyclopedia
secondary; source-specific modules govern their own content; Immortals excluded.
Deterministic state is authoritative. Preserve missing/null/zero/false/supplied
distinctions, save/migration integrity, existing toggles, nonnumeric Special,
planning-only ships, poison/death/former-HP chronology and RNG/time/resources.

Phase 1 source closure remains incomplete. Runtime: **628 = 600 canonical +
21 supplemental + 7 module profiles**; **4 live + 1 planning-only nonnumeric routes**.
The hidden 8-mile/world-coordinate knowledge/belief/perception cartography
architecture remains deferred. No graphical work is authorized in this run.

## Exact next sequence

1. **v0.4.335 ACCEPTED:** 46 canonical Context Matrix weapon profiles and calibration, RAW/CONTEXT_MATRIX/AAE mode architecture and unchanged combat. This session stops after this one checkpoint; accepted main and green Actions remain authoritative.
2. **v0.4.336 ACCEPTED:** independently tested pure calculator with all workbook cases, no live damage, natural attacks excluded.
3. **v0.4.337 ACCEPTED:** 41 source-verified attacks across 19 canonical profiles; 1151 other attack measures unknown; damage/AI/legal movement unchanged.
4. **v0.4.338 ACCEPTED:** live contextual damage on eligible canonical melee/missile weapons only. Natural attacks, RAW and AAE preserved.
5. **v0.4.339 NEXT (not started):** persistent local-scene authoritative physical coordinates, separate from player map knowledge, belief, perception and presentation; no graphics in the preceding v0.4.338 checkpoint.

The ordinary multi-condition Cureall wounds-default fallback and parser closure
remain separate BECM dependencies. Each checkpoint follows accepted main →
bounded work branch → candidate commit → required CI → audit/pipeline acceptance
commit → required CI confirmation → merge to main. No automatic acceptance or merge.
