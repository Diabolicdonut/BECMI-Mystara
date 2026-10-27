# Known World — authoritative whole-product development roadmap
Roadmap revision: R1 (2026-10-27). Gameplay baseline: v0.4.347, accepted on main. This roadmap does not accept a new gameplay build.

## Product vision
A durable, replayable, text-first Known World / Mystara role-playing game faithful to Mentzer Basic, Expert, Companion and Master D&D. The deterministic engine adjudicates mechanics and persistent world state; natural-language narration and referee interpretation may assist but never silently override authoritative state. The experience should support character creation through high-level play, exploration, travel, dungeon and wilderness adventure, monsters, treasure, magic, social play, domain governance, warfare, and authored and emergent adventures. Players should be able to play a long campaign with trustworthy saves and intelligible consequences, without requiring graphical maps.

## Governing boundaries
- Mentzer BECM is primary; compatible Rules Cyclopedia secondary; source-specific adventures govern their content. Immortals excluded unless explicitly authorized.
- Pure BECMI RAW is the default. Optional Contextual Weapon Matrix, phase initiative and 3D positional rules must remain isolated and reversible.
- Preserve missing versus explicit null/zero/false; save/migration; deterministic RNG; nonnumeric Special; planning-only ship contracts.
- Preserve canonical weapon and creature data; no unreviewed changes to published mechanics.
- Do not put copyrighted source-book text or scans into the public repository.
- GitHub main, topmost accepted audit entry, pipeline-state.md and production index.html establish the actual accepted baseline. This roadmap defines destination and dependency ordering, not permission to override them.

## Whole-product weighted gates
Each gate has an integer weight. Status is ACCEPTED only when evidence exists in accepted audit/CI. PARTIAL and PLANNED count as zero toward conservative accepted completion; future progress may be refined with evidence-backed subgates. R1 is a provisional scope accounting, not an audited percentage of feature completeness.

| ID | Gate | Weight | R1 status | Exit evidence |
|---|---|---:|---|---|
| KW01 | BECM character creation, classes, advancement, equipment | 8 | PARTIAL | Complete class/level lifecycle, regression |
| KW02 | Core RAW combat, initiative, saving throws, conditions | 9 | PARTIAL | Source-reviewed full procedures and native play |
| KW03 | Spells, divine/arcane magic, items, exceptional effects | 9 | PARTIAL | Spell and effect coverage audit |
| KW04 | Creatures, encounter generation, morale, treasure | 8 | PARTIAL | Source provenance and encounter regression |
| KW05 | Dungeon exploration, turns, light, doors, hazards | 7 | PARTIAL | Full deterministic dungeon loops |
| KW06 | Wilderness, travel, weather, hex exploration | 7 | PARTIAL | Native multi-day campaign tests |
| KW07 | Towns, NPCs, reaction, hirelings, factions, economy | 7 | PARTIAL | Persistent social and economic consequences |
| KW08 | Ships, sea travel, logistics and encounters | 5 | PARTIAL | Executable nautical campaign tests |
| KW09 | Companion/Master domains, strongholds, War Machine, siege | 8 | PARTIAL | End-to-end domain and warfare tests |
| KW10 | Authored modules and scenario boundaries | 5 | PARTIAL | Source-specific replay and isolation |
| KW11 | Emergent adventure and campaign director | 8 | PLANNED | Repeatable varied long-form campaigns |
| KW12 | Persistent authoritative local scene physical state | 6 | PLANNED | Location/objects/occupancy persistence, migration |
| KW13 | Optional contextual combat completion | 5 | PARTIAL | Natural physical proximity, full integration and regression |
| KW14 | Natural-language referee and transparent adjudication | 5 | PARTIAL | Intent parsing, trace, no invented mechanics |
| KW15 | Saves, migrations, reproducibility, campaign continuity | 6 | PARTIAL | Multi-version native restore and deterministic replay |
| KW16 | Browser UX, accessibility, performance, documentation | 4 | PARTIAL | Browser usability and accessibility acceptance |
| KW17 | CI, coverage, release discipline and recovery | 3 | ACCEPTED | Ten-job CI, accepted main and Pages evidence |

Total weight: **110**. Strict accepted-only baseline: **3/110 = 2.7%**, which substantially understates implemented work because existing features have not been audited against whole-product gate exit criteria. Do not publish 2.7% as a meaningful product completion estimate. Before exposing a percentage, split large gates into measurable subgates and audit accepted functionality against them; unknown must remain unknown, not zero or an invented estimate.

## Immediate development queue
1. **v0.4.348**: contextual conventional physical natural melee damage by established pairwise Measure: Far -1, Normal unchanged, Close +1, applied per successful eligible hit. Exclude poison, breath, magic, substances, specials and manufactured weapons. Preserve RAW, published natural attack sequences and existing minimum-damage rules. Separate acceptance checkpoint.
2. Source-reviewed end-to-end contextual combat integration, trace and native play verification; do not reopen already accepted Ferocity, Size, ZOI or rigid clearance.
3. Persistent authoritative local-scene physical state, separately from perception, belief and knowledge; no graphical mapping.
4. Expand campaign-level continuity, encounters, and emergent adventure structure in bounded independently testable checkpoints.
5. Audit the whole-product gates and establish evidence-backed progress subgates before a numeric overall percentage is claimed.

## Mandatory AI-worker update protocol
Before each checkpoint: read this roadmap, AGENTS.md, main, pipeline-state.md, topmost audit, production index.html, active work branch, and latest Actions. Select only the pipeline-prescribed dependency. Use a work branch, not an unvalidated main mutation.
After each accepted checkpoint: update this roadmap's gate status/evidence and immediate queue, update site-progress.json from the same accepted evidence, append audit and pipeline records, run all mandatory tests, and verify the exact accepted SHA and Pages. Never label a candidate accepted or infer progress from version increments. A roadmap/scope change requires explicit revision history, weight conservation and updated acceptance criteria. Keep all other projects isolated.

## Roadmap change history
- R1 — 2026-10-27: established full-product scope, 17 weighted gates, conservative evidence policy and next dependency v0.4.348. Progress audit pending.
