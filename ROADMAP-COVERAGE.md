# Known World / BECMI — Whole-Product Weighted Evidence Scorecard

> **2026-10-28 latest recovery:** gameplay **v0.4.348** and the presentation-only The Known World amendment have passed exact-main ten-job acceptance and Pages. Current next dependency **v0.4.349 source-audited contextual-combat closure** is a *candidate*, with no authorized new rule, no change to the accepted game revision and no additional awarded whole-product points. Source inventory and read-only CI: [SOURCE-PARITY-AUDIT-v0.4.349.md](design/context-matrix/SOURCE-PARITY-AUDIT-v0.4.349.md). All older date-stamped v0.4.347/v0.4.348 “next” lines below are historical snapshots, not current work instructions. **20/100 remains accepted.**

**Roadmap revision:** R3 (in-game and playable status-view delivery, 2026-10-27). **Authoritative detailed development plan:** [DEVELOPMENT-ROADMAP.md](DEVELOPMENT-ROADMAP.md). **Single weighted scope/evidence ledger:** the 10 gates below, mirrored in `site-progress.json`. This scorecard measures the entire approved product and supports—not replaces—the detailed phase-by-phase roadmap.

**Reference review 2026-10-27, accepted gameplay v0.4.348; latest approved governance main `b7234fd40663f6b866c9f7a57071cb8411aef633` (R2).** The latest *accepted game rules checkpoint* remains **v0.4.348**, verified in `pipeline-state.md`, with source-defined Ferocity and v0.4.348 natural physical proximity accepted; remaining contextual source closure is next. This review **does not upgrade the game build or alter any BECMI rule**. Large historical audit/design prose (including older builds 0.4.223 and below) is development history; latest `main` and top pipeline record supersede its old "current" headings.

**Finite approved roadmap scope:** Preserve the Mentzer BECMI RAW reference game, the real hex/wilderness/dungeon worlds, natural-language interface, full module-compatible rules, source authority and deterministic native validation, and eventually separate RULES / SETTING / ADVENTURE / AGENCY / REFEREE / UI state layers. The approved wider Design 21 also includes a generic OSR kernel, autonomous parties, AI referee, adventure compiler, procedural grammar and world generation, and hosted multiplayer service. **All are represented; none of the latter is presumed already built.**

**Measure:** 100 weighted approved delivery points. Only fully accepted source-backed gates earn weight. Partial foundations get zero until source acceptance. Roadmap weights are explicit planning judgments, not % code written. Changing scope requires a review; do not treat a new combat checkpoint as completing the future OSR service.

| Delivery gate | Weight | Status | Authority |
|---|---:|---|---|
| Mentzer BECMI RAW core with accepted source-derived adjudication | 12 | accepted | `pipeline-state.md (v0.4.348); validation/` |
| Deterministic saves, migration and extensive native/Chromium acceptance | 8 | accepted | `pipeline-state.md; validation/; .github/workflows/known-world-acceptance.yml` |
| Wilderness, dungeon mapping, true hex and travel continuity | 8 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Context Matrix attack/size/measure and full source-damage parity | 10 | partial | `pipeline-state.md; v0.4.348 natural physical proximity accepted; remaining parity partial` |
| Fully separated rules, setting, adventure and persistence layers | 10 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Independent AI characters with Party/Focus/Spectator control modes | 9 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Referee authority, secure interpretation and source-grounded exceptions | 10 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Validated old-school source adventure compiler and modules | 10 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Procedural old-school adventure grammar and world forge | 10 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Integrated UX, persistence, multiplayer service and release QA | 13 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |

**Overall currently accepted:** 20/100 = **20%**. **Latest completed bounded checkpoint:** v0.4.347 Ferocity, accepted 1/1. **Current next checkpoint:** v0.4.348 conventional natural physical damage, 0/1 accepted. The milestone progress is distinct from the overall 20%.

**Required next sequence:** Complete the exact v0.4.348 natural-attack damage milestone under existing source/validation boundaries; retain the current huge self-contained HTML game and canonical source untouched during this accounting pass. Then continue source-first narrow combat completion, map architecture, rules extraction and adventure/compiler work as the latest project controller authorizes. Do not replace Mentzer RAW with another edition, fabricate mechanics, convert procedural goals into a fake 100%-complete checkbox, or weaken all ten existing CI acceptance jobs.

**Status UI:** `site-progress.json` is the published read-only scoped manifest, `site-progress.js` is shared with the five other sites. The `play.html` route embeds the unchanged production `index.html` in a same-origin frame below the live revision, whole-product progress and next-milestone summary. The full-screen `index.html` remains the unchanged authoritative game: this addition is a separate optional presentation, not a gameplay milestone. This documentation does not prove manual modern-browser interaction; production Pages/CI are independently required before claiming deployment.

## Approved long-term development sequence (Design 21 crosswalk)

The source-of-vision is [Design 21](BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md), especially its **Ultimate Project Goal** and **Phases 1–11**. Phase headings and these completion targets are not a claim of current implementation. The roadmap gates above cover the entire vision, including the generalized non-Mystara OSR service.

| Ordered phase | Required outcome / acceptance target | Covered gates |
|---|---|---|
| 1. Complete BECM reference implementation | Source-faithful character-to-domain campaign loops, monsters, combat, spell procedures, modules, state continuity, accepted native and browser playthroughs | validated-becmi-baseline; state-and-validation; travel-cartography; contextual-combat |
| 2. Explicit architecture layers | Distinct RULES / SETTING / ADVENTURE / AGENCY / REFEREE / UI-PERSISTENCE concepts and nonleaking ownership of authoritative state | generic-rules-kernel |
| 3. General-purpose OSR rules kernel | Reusable rules profiles for BECMI, B/X, OSE, Labyrinth Lord or other appropriately licensed/compatible profiles; source-differentiated regression | generic-rules-kernel |
| 4. Autonomous adventurers and variable player control | Party, individual Focus and Spectator modes, human/AI ownership handoff, coherent behavior and deterministic state | autonomous-party |
| 5. Formal AI referee interface | Source-grounded referee/intent contracts with state-safe tool boundaries, traceable adjudication and secure private orchestration | private-ai-referee |
| 6. Adventure compiler | Standardized validated adventure schema/parser and repeatable module-to-engine workflows that respect copyright and source scope | module-compiler |
| 7. Old-school adventure grammar | Reusable encounter, exploration, challenge, risk/reward and campaign-structure grammar, not just a single hand-authored scenario | generation-forge |
| 8. Procedural adventure generation | Distinct replayable adventures using that grammar, with consistency and end-to-end acceptance | generation-forge |
| 9. Procedural world forge | Original persistent settlements, regions, dungeons, factions, travel connections and campaign continuity | generation-forge; travel-cartography |
| 10. Hosted authoritative campaigns | Server-owned persistent campaign state, authenticated client access, trustworthy saves, migration, privacy and reliability | hosted-osr-service; state-and-validation |
| 11. Persistent multiplayer and release independence | Drop-in/out multiplayer, ownership transitions, comprehensive hosted UX/QA and separation from unlicensed Mystara/proprietary publication content | hosted-osr-service; autonomous-party |

**Scope integrity:** The current browser Known World is an important *reference implementation*, not the end product. A creature-coverage or Context Matrix increment may finish a narrow gameplay milestone without completing a large delivery gate. Requirements for generalized profiles, adventure generation, autonomous party agency, formal private referee, and hosted multiplayer cannot be omitted from the denominator.

## Release and acceptance model

- **Present accepted gameplay:** v0.4.347 (the v0.4.347 Ferocity gate is completed); the next *independent, unaccepted* gameplay checkpoint is **v0.4.348** conventional physical natural-melee proximity damage by established Measure. The top of `pipeline-state.md` and accepted GitHub main override this date-stamped statement if a later checkpoint is promoted.
- **Gating order:** use top `pipeline-state.md` and top accepted `audit.md` for the precise next bounded dependency. Complete the source-reviewed contextual combat work before resuming persistent authoritative local-scene physical state (without assuming a graphical map). Continue long-form native campaign/regression proof before OSR architectural extraction, adventure/compiler work, and eventual hosting.
- **Rules/source boundaries:** Mentzer Basic/Expert/Companion/Master primary, compatible Rules Cyclopedia secondary, module-specific source authority for module content; Immortals excluded. RAW must remain default, contextual rules opt-in, and deterministic records must retain missing/null/zero/false semantics. Keep canonical data, saved state, migration, nonnumeric Special and planning-only ship contracts intact. Public repo must not redistribute copyrighted scans/books/adventures.
- **A gate is ACCEPTED only after its full exit criteria are evidenced:** exact production version, source review, regression coverage, full applicable CI, native play/restore where required, audit record and accepted GitHub main. Partial construction or green subtests alone do not earn the gate's weight.
- **Accounting definition:** fixed **100** weighted points. Overall completion = sum of weights for `accepted` gates / 100; `partial` or `planned` yield zero pending gate closure. The current **20%** is a conservative *completed-deliverables measure*, not a subjective estimate of functional coverage or a forecast of remaining effort. Separately show the status of the bounded current milestone; do not blend the two percentages.
- **Single-source publication:** `DEVELOPMENT-ROADMAP.md` is the authoritative prospective plan; `ROADMAP-COVERAGE.md` is the unique human-reviewed 100-point gate/evidence scorecard, `site-progress.json` its machine-readable mirror, `status.html` the full read-only status view, `play.html` the optional same-origin playable status view, `site-progress.js` the browser renderer, and `tools/sync-progress-status.mjs` the deterministic offline game-header status generator. `AGENTS.md` tells every worker to follow this contract. Don't add a conflicting second ledger or an alternative denominator.

## Required roadmap change and AI-worker handoff protocol

1. **Recover:** inspect latest GitHub main/commit, `AGENTS.md`, this document, `site-progress.json`, `pipeline-state.md`, newest/topmost accepted `audit.md`, production game build, relevant Design 21/primary source, active `work/` branch and exact Actions/Pages runs. Never reconstruct state from an older local/project-library copy when main has advanced.
2. **Plan one bounded accepted dependency:** respect pipeline priority, explicit user scope and any session ceiling. Maintain separate candidate and accepted states. No gameplay bytes changed as part of a roadmap-only documentation milestone.
3. **Qualify the candidate:** run `node tools/sync-progress-status.mjs --check`, `node validation/roadmap-governance.mjs` and the entire ten-job acceptance suite as specified in `validation/README.md`; repair failures instead of adjusting thresholds. Add direct regression/native proof for new behavior. A successful CI run does not itself accept or merge gameplay.
4. **Publish together:** after actual acceptance, update the top audit and pipeline entries, the detailed roadmap, this scorecard (including gate evidence, next sequence and revision history as applicable) and `site-progress.json` (revision, next milestone, reviewed date, gate statuses/evidence). The integrity check `node validation/roadmap-governance.mjs` must pass on the same candidate. Verify exact-main CI and Pages before claiming deployed status.
5. **Control changes to scope:** if goals or weights change, update both ledgers in the same reviewed change, explain what changed and why in the change log, preserve transparent old-versus-new percentage comparisons, and do not retroactively invent acceptance. If no full gate closes, **the overall 20% stays constant** even if many gameplay versions are accepted.
6. **Recoverable handoff:** leave an unambiguous next checkpoint, risks/blockers and evidence in the latest pipeline/audit and refer to this roadmap; future AI workers resume from accepted GitHub state, not conversation recollection.

## Roadmap revisions

- **R1 — 2026-10-27:** approved full 10-gate, 100-point scope ledger, initial acceptance evidence totaling 20 points, companion page and read-only site manifest.
- **R2 — 2026-10-27:** clarified complete Design 21 eleven-phase crosswalk, authority among human/machine ledgers, provenance of the 20% denominator, AI-worker handoff, future change discipline and gate-level progress invariants. **No scope weights, statuses or accepted game version changed.**

- **R3 — 2026-10-27 (candidate pending exact CI/promotion):** incorporated the complete prospective `DEVELOPMENT-ROADMAP.md` phase instructions and reused the previously push/PR-validated five-line self-contained game-header badge from PR #16, with its exact matching production SHA-256 manifest and deterministic synchronizer. Added optional `play.html` view with above-game revision, full-roadmap progress and next milestone, plus native browser/layout checks. Only presentation HTML bytes change; game rule JavaScript, deterministic state, version **v0.4.347**, 100-point weights, statuses and 20% remain unchanged. Verify all required CI and Pages before accepting this candidate.
