# Known World / BECMI Text RPG — Pipeline State

Current accepted build: **v0.4.334**. Newly accepted checkpoints in this continuation session: **1 of at most 3**.
Current candidate: **none**. Context Matrix status: **not started**.
Exact next checkpoint: **v0.4.335 — Context Matrix data/mode only**.

## Authoritative ledger

Repository: `Diabolicdonut/BECMI-Mystara`. GitHub main, its exact index.html,
this pipeline and the newest/topmost accepted audit entry govern recovery.
Known World Library files are recovery/reference material only. Never overwrite
newer accepted work with an older prompt or source snapshot. Main contains only
accepted checkpoints; an acceptance metadata commit must pass required CI before
promotion. Inspect main, active work branches, commits and Actions after a freeze.

## Accepted game and validation

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

1. From accepted main, create `work/v0.4.335`: Context Matrix data/mode only.
   Primary design: BECMI_Weapon_Context_Matrix.xlsx. Atlas v0.4 is supporting
   rationale; contextual rules v0.1 is exploratory only. Preserve the sources in
   the repository. Runtime uses canonical machine-readable data, not XLSX parsing.
   Establish RAW / CONTEXT_MATRIX / AAE; RAW is the default. Preserve RAW and AAE
   outcomes and isolate them. Do not calculate or apply contextual damage yet.
2. After v0.4.335 acceptance, `work/v0.4.336`: pure deterministic calculator only,
   exact workbook conversion/rounding/calibration and −3…+3 clamp; unknown facts
   fail neutral. Validate workbook reference cases and the complete condition
   matrix. No live damage integration.
3. Stop after v0.4.336 if three checkpoints have been accepted in this session.
   v0.4.337 is live damage integration and must not begin after that cap.

The ordinary multi-condition Cureall wounds-default fallback and parser closure
remain separate BECM dependencies. Each checkpoint follows accepted main →
bounded work branch → candidate commit → required CI → audit/pipeline acceptance
commit → required CI confirmation → merge to main. No automatic acceptance or merge.
