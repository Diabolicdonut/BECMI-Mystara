# Known World — Authoritative Development Roadmap

**Status:** Active project-wide instruction and delivery roadmap (R3, 2026-10-27). **Last scope reconciliation:** 2026-10-27. **Accepted gameplay build:** v0.4.348 (verify current GitHub main before every change). **Whole-vision accepted coverage:** 20 of 100 weighted delivery points, as evidenced in [ROADMAP-COVERAGE.md](ROADMAP-COVERAGE.md) and [site-progress.json](site-progress.json).

## 1. Mandate and precedence for every AI worker

This file is the **single authoritative prospective roadmap for Known World**. It governs the *long-term destination, dependencies, milestone selection and progress accounting*. It does not retroactively rewrite accepted mechanics or replace the implementation ledger.

**Read in order before changing anything:**
1. Current GitHub main commit, newest/topmost accepted [audit.md](audit.md), current [pipeline-state.md](pipeline-state.md), production [index.html](index.html), the currently active work branch and latest GitHub Actions / Pages results.
2. This roadmap, [AGENTS.md](AGENTS.md), and [validation/README.md](validation/README.md).
3. [BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md](BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md), which is the **detailed design inventory** including cartographic, importer, spatial and interaction requirements.
4. Applicable contemporary domain contracts such as [the 2026-10-19 contextual-combat authorization](design/context-matrix/CONTEXTUAL-COMBAT-COMPLETION-2026-10-19.md), canonical source data, accepted implementations, and authorized Known World reference books.

**Conflict resolution:** Newer accepted main/audit/pipeline evidence wins on *what actually works*. This roadmap wins on *approved future direction and workstream dependencies*; a specifically user-authorized newer design decision must be incorporated here promptly. Domain contracts control their corresponding accepted details. Historical version numbers and work prompts in Design 21 and other files are **not** current status. Never infer completion from a description of planned functionality.

**Project isolation:** Use the Known World GitHub repository and its authorized Known World source material only. Do not import other projects' files, gameplay implementations or project ledgers, even if a historical document references conceptual ideas from them.

## 2. Product vision and non-negotiable invariants

**Reference product:** a faithful, persistent, natural-language **Mentzer Basic/Expert/Companion/Master** Known World text RPG, with deterministic rule resolution, extensible published-adventure support, tactical optional rules and durable campaigns.

**Ultimate product:** a **general-purpose old-school role-playing engine and service**, initially validated through BECMI/Mystara but able to run B/X, Old-School Essentials, Labyrinth Lord and other explicitly supported compatible profiles; imported or compiled adventures; coherent original procedural worlds and adventures; autonomous and human characters; mixed-control parties; a provider-independent AI referee; and eventually a persistent, hosted, multiplayer, drop-in/drop-out experience. The commercial/distributable edition must not depend on unlicensed Mystara or other proprietary source content.

**Always preserve:**
- Mentzer BECM RAW as primary authority; compatible Rules Cyclopedia secondary; source-specific modules govern their own content; **Immortals excluded** unless user separately authorizes them.
- Deterministic game state, dice, source adjudication and saves over AI narration. AI can interpret/advise/narrate, but never mutate permanent state without validated engine actions.
- Strict distinction between missing, explicit null, zero, false, empty, unknown and supplied values; preserve originals and source provenance through migration.
- Pure BECMI RAW as a separate default-compatible combat procedure; contextual Measure/Size/Ferocity and alternative damage modes only under their approved toggles. No accidental rules leakage.
- Published special attacks, spells, source-specific monster data and nonnumeric Special; no invented arithmetic or unverified content.
- War Machine/Siege, ships and hireling contracts (including **planning-only** ship observations), source-specific modules, native save/reload, exact game bytes and existing regression identities.
- Narrative first, mechanics behind the screen; the player should understand tactical affordances and relative capability without needing hidden formulas.
- Small independently validated checkpoints, no rewrites for their own sake and no silent weakening of tests.

## 3. Milestone status vocabulary

**Accepted:** implemented on main, validated against governing rules and all mandatory acceptance gates; required deployment verification complete.

**Partial:** real accepted foundations exist but stated *whole workstream* exit criteria are not yet satisfied. A partial workstream earns **zero of its whole-gate points** under the current conservative accounting policy; this does **not** imply nothing exists.

**Planned:** product requirement or approved future work with no complete workstream acceptance yet.

**Blocked:** cannot responsibly advance until the documented dependency, source evidence or test machinery is available; list the exact blocker.

**Candidate:** code exists on a work branch only and has **not** been accepted/deployed. Never relabel candidate as accepted just because local tests passed.

## 4. Whole-product implementation sequence

The 10 weight-bearing delivery gates, their points and verified statuses live in [ROADMAP-COVERAGE.md](ROADMAP-COVERAGE.md) and the publishable [site-progress.json](site-progress.json). They total 100 points and must always agree. The detailed phase sequence below expands those gates and is the authority for **which subtasks remain**. A dependency can be prepared or researched early without prematurely shipping it.

| Stage | Workstream and intended delivery | Current status | Dependency / exit condition |
| --- | --- | --- | --- |
| A | **Mentzer BECMI reference engine** — complete source procedures and integrated long campaign loop | Accepted baseline; completeness closure ongoing | Full source accounting, actual end-to-end campaigns and source exceptions validated |
| B | **State integrity and acceptance** — source provenance, deterministic resolution, migration, browser/native play | Accepted foundation; maintain continuously | Every new change preserves exact CI gates, persistence and recoverability |
| C | **Contextual combat** — canonical weapon matrix, alternative modes, pairwise Measure, coverage, clearance, Ferocity and natural-hit proximity | Partial | Finish source-bounded remaining combat cases independently; pure RAW isolation |
| D | **Simulation/cartography and usability** — hidden physical world, perceived maps and coherent local scenes | Partial | Complete authoritative physical scene state before renderer; knowledge separation and UI acceptance |
| E | **Explicit architecture and generic OSR kernel** — separate rules/setting/adventure/agency/referee/UI-state responsibilities | Partial preparatory structure | BECMI reference stable; migrate incrementally with exact equivalence tests |
| F | **Autonomous character agency** — one/selected/all/director/spectator control, live human↔AI handoff | Partial legacy automation, future agency system incomplete | Separate durable actor intent and knowledge; handoffs never reset state |
| G | **AI referee boundary** — provider-agnostic structured interpretation, dialogue, rulings, safety and continuity | Planned full interface | Deterministic engine authority and validated request/response contracts |
| H | **Adventure compiler and user imports** — one source-neutral package schema for modules, imports and generated content | Partial module-specific implementation; universal compiler pending | Source provenance and legality, import review and persistent schema |
| I | **Procedural adventure/world forge** — generated, mechanically validated and persistent unique content | Planned | Compiler + AI referee + world truth/knowledge model |
| J | **Hosted multiplayer and release** — durable service, privacy, scaling, accessibility, release QA and licensing | Planned | Agency, referee, compiler, migration and client/runtime separation |

Do not change this order by treating a large architectural proposal as already implemented. Substage milestones should be concrete, source-backed, independently testable and coupled to the fewest possible active concerns.

### Stage A — BECMI and Mystara reference campaign

Complete and reconcile all Mentzer Basic, Expert, Companion and Master gameplay procedures outside Immortals: creation, classes, advancement, spells, items, monster abilities, reactions/morale, dungeon and wilderness exploration, travel, treasure, encumbrance, equipment, hirelings, ships, strongholds, dominions, War Machine and Siege Machine. Track the authoritative 600 canonical + source-specific supplemental and module creature rosters accurately rather than using an inflated “monster count.” Preserve source-authorized B2, X1, Smoking Pillar and other module content, and separate their rules from later reusable platform logic.

**Exit evidence:** A stable real-play campaign can run character creation → preparation → retainer choice → exploration/encounter → combat/evasion → rest/return → treasure/XP/leveling → later travel/stronghold → save/reload, with no state drift; verified representative source cases and complete coverage ledger. Existing thousands of tests are an essential foundation, **not proof** that the whole long-campaign goal is complete.

### Stage B — Validation and state contracts (permanent)

Keep the recovered accepted manifest, core/focused isolation, four fresh Chromium slices, independent exact-production native commands/save/reload, source-specific gates, and required ten-job GitHub Actions acceptance. The historical 523 native result is historical only; Native Acceptance v2 is a separately established prospective suite. Require proof on work candidate and accepted main; do not remove regressions just to make a build green. Upgrade migration, auditability, local/offline operation and test portability without obscuring uncertain data.

### Stage C — Contextual combat and equipment

Retain 46 verified canonical weapon profiles and their authority, optional Context Matrix damage model, weapon Size against current Far/Normal/Close Measure, opposed original initiative d6, positional pair independence, natural Size-0 fallbacks only where sourced, physical approach coverage, oversized rigid-weapon clearance and source-reviewed Ferocity. Ordinary RAW and alternative modes remain isolated. Spatial and directional facts need genuine evidence; unknowns must not become favorable defaults. Weapon switches consume existing handling opportunities.

**Latest accepted rule checkpoint:** **v0.4.348 — conventional physical natural melee damage by established pairwise Measure (Far −1 / Normal 0 / Close +1) per source-eligible successful hit**; pure RAW and specials remain excluded. **Next bounded dependency:** v0.4.349 — source-audited contextual-combat closure only, with actual rule scope to be fixed from source evidence before implementation, not a general combat rewrite.

### Stage D — World truth, mapping, local scene and presentation

**World truth** is authoritative precise hidden hex and continuous local coordinates. **Character knowledge** records observed, inferred and believed information separately. **Player maps** synthesize that knowledge, not omniscient world facts. Preserve existing wilderness/dungeon/settlement assets; do not regenerate established facts differently, leak unexplored map topology, or present invented location certainty.

Use **party scale** for travel/exploration and **individual scale** only when positional detail matters; not every combat triggers a map switch. Maintain formation, marching order, tasks and automatic regrouping; intent-driven motion should avoid tabletop token micromanagement. Reuse current combat x/y/z as inputs to persistent local scene coordinates, with hazards, lights, line of sight, actor-specific visibility, multi-level sites and split-party knowledge. Combat is an overlay on the same continuing scene, not a temporary alternate universe.

Gradually build contextual HTML/SVG maps with pan/zoom, remembered viewports, accessible keyboard/touch, semantic detail, old-school muted cartography and monochrome pen-and-ink local scenes. Data produces maps; AI can describe but should not substitute an unstructured invented drawing for the spatial model. The existing status sidebar, terminal, command input and campaign controls must remain usable on desktop and mobile.

**Order:** authoritative scene/state → knowledge/perception and migration → existing map compatibility → physical encounters/position transitions → renderer/controls → full accessibility/visual acceptance.

### Stage E — Rules, setting and adventure separation

Extract conceptual **RULES / SETTING / ADVENTURE / AGENCY / REFEREE / UI + PERSISTENCE** layers while keeping the accepted app running. BECMI becomes the first rules profile; later BX/OSE/Labyrinth Lord use explicitly verified overrides rather than duplicated engines. Use source-qualified entity identities (canonical, rule profile, adventure variant); retain stable IDs and migrated saved characters. The Known World and validated adventures become packages rather than hard-coded platform dependencies.

### Stage F — Autonomous adventurers and player roles

Support **one character**, **selected characters**, **entire party**, **director**, and **spectator**. Characters retain identity, HP, inventories, memories, relationships, fears, loyalties, goals and legitimate knowledge when handing control between HUMAN, AUTONOMOUS and DIRECTED. Characters follow source-faithful mechanical rules even while autonomous. Use deterministic tactical heuristics for routine choices and AI only when judgment adds value. Do not mistake historical party order assistance or existing auto-PC commands for the finished autonomous agency layer.

### Stage G — AI referee interface

Define bounded, provider-neutral task contracts: interpret action; choose actor intent; NPC speech; ambiguity ruling; narrate result; summarize memory. Support replaceable cloud, local and hybrid providers. Pass only character-legitimate knowledge to autonomous characters and users; validate schemas, permissions, outputs, dice and action legality before changing canonical state. Harden against prompt injection, invented facts, secret leakage, inconsistent NPC knowledge and non-replayable results. A graceful deterministic fallback is required for unavailable AI.

### Stage H — Adventure compiler, source modules and user uploads

Build a **single source-neutral Adventure Package Format** for maps/topology, keyed areas, NPCs, factions, clues/rumors, encounters, treasures, triggers, hazard mechanics, hooks, objectives and state transitions. Compile published, hand-authored, imported and generated content into the same representation. Keep original module content private/authorized and **user-imported content isolated**; never publish or copy imported proprietary materials into shared public packs.

Provide an uploader/parser, source/ruleset identification, adaptation choices (campaign-compatible by default, literal/standalone when selected), a review screen, provenance, explicit approval, meaningful update/re-import diffs and campaign persistence. Reject unresolved mechanical identities rather than guessing authoritative rules.

### Stage I — Adventures and coherent procedural worlds

Use probabilistic old-school adventure grammar (lairs, dungeons, faction sites, hexcrawls, islands, temples, settlements, mysteries and regional sandboxes) inferred from structural principles rather than copying copyrighted rooms/text. Generate encounter pressure, traps, secret loops, hazards, factions, treasure and alternate routes with mechanically justified ranges, then validate playable paths, clue dependencies, internal references, difficulty and source constraints.

Create worlds hierarchically from geography/biomes/regions through settlements and sites; preserve a permanent **World Bible**, stable generated facts, regional ecology, cultures, history, factions and limited populations. Generate lazily but never rewrite already established campaign truth. Run autonomous simulation/playtesting and repair invalid packages before a scenario enters world truth. Ensure enough variation for replay without inconsistent improvisation.

### Stage J — Hosted service and release

Introduce authoritative hosted campaigns only after local engine behavior and migration are reliable. Add authenticated accounts, invitations, ownership, shared turns/state, session logs, access control, rollback/backup, privacy, model-cost controls, rate limits, multiplayer conflict arbitration, spectating and drop-in/drop-out character handoff. Keep options for offline/self-hosted local play where practical.

Before distribution remove or separately license Mystara, classic module content and proprietary assets; ship independently original/appropriately licensed content. Verify source compliance, export/deletion, accessibility, cross-device performance and a complete end-to-end published release scenario.

## 5. Completion calculation and website display

**Overall denominator:** the **entire approved OSR product vision** above, not current iteration, code line count or number of recently accepted tests. The current weighted scoreboard is **100 fixed points across 10 delivery gates**. Only a gate explicitly accepted with source-backed exit evidence earns all of its listed weight; a partial or planned gate earns zero until its own criteria close. This deliberately understates work-in-progress. We may adopt finer separately verified subgates **only by an explicit, recorded scope and accounting revision** with reproducible migration of the old percentages.

**Baseline on 2026-10-27:** core source-reviewed BECMI baseline 12 points plus deterministic/native validation foundation 8 points = **20/100 (20%)**. All other gates remain partial/planned. This is a conservative project-management assessment, **not a statistical measurement of lines of code, feature effort or actual runtime completeness**.

**Distinct displays:** The public game header shows the **accepted gameplay revision** and **whole-roadmap percentage**. The separate status page gives all gates and the **current bounded checkpoint**. The optional same-origin [playable status page](play.html) keeps the accepted revision, full-roadmap percentage and current milestone visible above the unchanged game. Never show checkpoint completion as the total vision completion. Do not publish candidate version as deployed.

**Single status data source:** [site-progress.json](site-progress.json) is published read-only scoreboard data; [ROADMAP-COVERAGE.md](ROADMAP-COVERAGE.md) explains human-evaluated evidence. Keep both synchronized with this document and the newest accepted main. The game header is a **self-contained, generated status badge** (offline safe) derived from the same manifest by **tools/sync-progress-status.mjs**. Run that tool whenever the accepted version, roadmap weights or statuses change; its --check mode is mandatory validation. [status.html](status.html) provides drill-down; [play.html](play.html) provides an additional game-and-status layout.

## 6. Required update protocol after **every** material decision or accepted change

Every AI worker must, as part of the same bounded checkpoint:
1. **Recover** main/audit/pipeline, current roadmap/scoreboard, candidate work, CI and authoritative rules; identify the smallest unaccepted dependency.
2. **Reconcile scope:** if user adds/removes/reorders requirements or changes an approved design, amend **this roadmap** and the relevant domain contract *in that same change*. State why and which stages/gates change. No stealth roadmap shrinkage.
3. **Implement just one coherent checkpoint** on a separate work branch. Preserve rule modes, source cases, save migration, existing behavior, future reserved dependencies and tests.
4. **Validate** focused tests, every full exact-source mandated acceptance gate, ordered browser/native isolation and zero browser errors. Document actual numbers, source and game hashes; retain original acceptance history.
5. **Accept** only after full green evidence and correct audit/pipeline/manifest; merge reviewed accepted code; recheck exact main and GitHub Pages. Candidate-only work cannot claim accepted percentage.
6. **Update status** in this roadmap (last confirmed build, remaining dependencies and milestone notes), [ROADMAP-COVERAGE.md](ROADMAP-COVERAGE.md), [site-progress.json](site-progress.json) and the generated in-game badge whenever they materially change; append rationale and acceptance evidence to [audit.md](audit.md), and immediately refresh [pipeline-state.md](pipeline-state.md) with the next bounded checkpoint.
7. **Report** accepted revision, overall vision percent, workstream progress/blocked reasons, tests, exact commit and next dependency.

A status/dashboard-only change **does not** count as completion of unimplemented gameplay, does not trigger a new game-rule version and must still pass full CI before it is accepted. Keep published indicators accessible without external network services or secrets.

## 2026-10-28 contextual source-audit continuation (v0.4.349 candidate)

The latest accepted main is the **v0.4.348 gameplay build** plus presentation-only branding, with exact-main CI and Pages green. The next pipeline dependency is **source qualification rather than an additional approved combat rule**. The bounded [v0.4.349 source-parity audit](design/context-matrix/SOURCE-PARITY-AUDIT-v0.4.349.md) and its read-only CI guard inventory the currently 46 accepted weapon profiles, 41 individually verified natural slots across 19 source profiles, and the separate verified wolf case; they explicitly record unresolved coverage without inferring new eligibility. This is **candidate work pending full CI, acceptance and deployment**, does not bump the game revision, and does not award the partial contextual-combat 10-point gate. Whole-product accepted completion remains **20/100**. Each subsequent source exception needs its own authorization and source validation; absent such authorization, the next approved implementation dependency is persistent physical local-scene state, not graphics.

## 7. Active dependency queue (as of reviewed main)

1. **First:** v0.4.349 — bound and source-audit the next remaining contextual-combat parity item before any implementation; v0.4.348 natural physical proximity was independently accepted.
2. **Then:** remaining bounded contextual-combat source closure, long-campaign/persistent-scene state validation and canonical provenance as authorized by newest pipeline (not a sweeping combat redesign).
3. **Next architectural track:** physical scene coordinates and truth/knowledge/perception model; extend rather than replace verified wilderness/dungeon/campaign state.
4. **Thereafter:** UX/cartography, explicit rules/settings/adventure layers, reusable compiler, autonomous agency and secure referee, with stage dependencies above.
5. **Long-term:** robust imported and procedurally generated adventures/worlds, then hosted asynchronous multiplayer, distribution/license readiness and full-product QA.

**A new user instruction, or a later valid accepted audit/pipeline entry, may change this queue.** Do not automatically act on stale version-specific “start here” instructions lower in the historical documents.

## 8. Completion is more than compilation

Whole-product delivery requires reliable extended play, realistic travel/encounters, expected source parity, NPC agency, understandable player-facing information, safe resumable state, reachable/observable worlds, adventure variety, tested imports/generation, multiplayer and licensing. Retain unknowns and source gaps in the ledger. A successful syntax or CI run is **necessary but not sufficient** to declare the full vision finished.
