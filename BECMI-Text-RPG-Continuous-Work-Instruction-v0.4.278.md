# Known World / BECMI Text RPG — Continuous Work Instruction

## Current baseline: v0.4.278
### Updated with hidden-hex / perceptual wilderness cartography direction

## Purpose

Continue development of the existing **Known World / BECMI Text RPG** autonomously from the newest accepted production baseline.

This instruction preserves the continuous small-checkpoint controller already in use and adds the approved long-term wilderness-map architecture:

> **The engine navigates on a precise hidden hex/world-coordinate substrate; the player navigates on a continuous knowledge map synthesized from belief, mapped knowledge, and immediate perception.**

Do **not** interrupt the active BECM source-completion sequence merely to begin the map rewrite. The wilderness-map direction below is a binding architectural requirement for the later cartography/presentation phase and should be preserved through future handoffs.

---

# 1. Immediate source of truth

Treat the following supplied files as authoritative for the current Work session:

- `index(20261003-054736).html`
- `audit(20261003-054737).md`
- `pipeline-state.md`
- `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md`
- all supplied governing rules/source files

Current accepted implementation:

**v0.4.278**

Current accepted validation:

- **1907 / 1907** core tests
- **744 / 744** focused tests
- fresh Chromium slices: **477 / 477, 477 / 477, 477 / 477, 476 / 476**
- syntax/production boot clean
- **0** accepted page/runtime errors
- **0** accepted console errors

Current runtime composition:

**628 = 600 canonical + 21 supplemental + 7 module profiles**

Current phase:

> **Phase 1 — Complete and validate the BECM reference implementation**

Overall source closure is **not** yet declared complete.

The newest/topmost accepted audit entry and the current pipeline file override older historical build numbers, test counts, completion estimates, and `Next bounded checkpoint` statements.

The audit remains append-only provenance.

---

# 2. Immediate next checkpoint

Begin with the checkpoint prescribed by the v0.4.278 audit:

> **v0.4.279 — explicit selected-person catapult task observations only.**

Record same-packet selected-person boolean catapult-assignment observations with closure and referee provenance.

Preserve missing/open/false values, original HP evidence, availability evidence, repair/fire duty observations, earlier selected/person/pool source candidates, stock/loading/load scopes, Special/non-numeric encounter boundaries, and planning-only ship construction status.

Known primary repair/fire exclusion must refuse contradictory positive catapult-task observations atomically.

Missing repair/fire evidence must **not** be defaulted clear.

These observations remain planning inputs. They must not create or release live actors, assign live duty, invent task delay or role rules, fill missing HP, load or fire the weapon, select a target, advance time, change RNG, or grant naval readiness.

After acceptance, immediately select or read the next smallest bounded checkpoint and continue automatically.

---

# 3. Continuous implementation controller

Do **not** stop after one successful checkpoint.

Operate continuously:

```text
read newest accepted baseline
        ↓
implement one bounded coherent checkpoint
        ↓
run focused validation
        ↓
run complete production acceptance suite
        ↓
repair failures within checkpoint scope
        ↓
append accepted audit entry
        ↓
update pipeline state
        ↓
determine next smallest valid checkpoint
        ↓
continue immediately
```

“Continuous” means **many consecutive small validated checkpoints**, not a large implementation pass.

Do not combine unrelated systems merely to reduce build count.

Do not ask the user to type `continue` after each accepted build.

---

# 4. Automatic next-checkpoint selection

When the newest audit already specifies the next checkpoint, follow it.

Otherwise choose the smallest coherent unfinished task in this order:

1. direct unfinished dependency of the just-completed checkpoint;
2. remaining Mentzer BECM source/rules closure;
3. remaining encounter/creature/procedure closure;
4. persistence/save-migration/source-compliance gap;
5. long-form campaign integration/reliability gap;
6. approved architecture/presentation work only after Phase 1 is sufficiently mature.

Prefer work that has explicit source authority, can be validated deterministically, preserves existing campaign state, does not require unrelated refactoring, and has a clear acceptance boundary.

Document the reason for the selected next checkpoint in the audit.

---

# 5. Rules authority

Primary authority:

> **Mentzer Basic / Expert / Companion / Master D&D**

Secondary authority:

> **Rules Cyclopedia**, where compatible and useful for consolidation or clarification.

Rules Cyclopedia does not silently override Mentzer BECM when they materially differ.

Source-specific modules govern their own explicit content.

Immortals rules remain out of current scope unless separately authorized.

Do not fabricate missing RAW. When a governing source does not supply a required value or procedure, preserve the unresolved boundary, require referee input where appropriate, record provenance, and do not manufacture unsupported mechanics or world facts.

---

# 6. Deterministic authority and state integrity

The deterministic game engine owns authoritative mechanical and persistent campaign state.

AI may assist with natural-language interpretation, intent classification, NPC dialogue, autonomous-character planning, narration, ambiguous referee judgment, and candidate generated content.

AI must not silently or directly alter HP or XP, add/remove inventory, move actors authoritatively, alter dice, modify permanent world truth, create unvalidated persistent facts, or bypass deterministic procedures.

Any AI-produced state change must be expressed as a bounded proposal, validated, and committed by deterministic systems.

Preserve the distinction between omitted data, explicit empty/none, explicit supplied values, derived values, and unresolved referee judgment.

Never fill missing source information merely because a convenient default exists elsewhere.

---

# 7. Validation discipline

Every bounded checkpoint receives focused tests appropriate to the change.

After focused validation, run the complete production acceptance suite.

Preserve `isolationPreserved:true`, exact once-only sliced browser coverage where currently used, production JavaScript syntax validation, production boot validation, zero accepted page/runtime exceptions, zero accepted console errors, actual save/reload checks when persistence changes, forged/stale derived-state rejection, non-mutating read-only inspection, no temporary test instrumentation in production, and preserved unrelated campaign state.

Do not reduce validation standards for throughput.

Do not continue from a knowingly broken accepted baseline.

---

# 8. Failure recovery and stop conditions

Repair failures within the current bounded scope and rerun acceptance.

Do not record a failed build as accepted.

Stop continuous implementation only for a genuine controller stop condition:

- unresolved material conflict between governing sources not covered by project precedence;
- progress would require inventing unsupported RAW;
- unrecoverable regression requiring substantial unrelated redesign;
- required validation cannot be completed reliably;
- a major architectural phase boundary requiring explicit authorization;
- a material product/design choice with multiple substantially different valid implementations.

Do **not** stop for routine coding choices, helper structure, naming, test organization, conservative source interpretation, or ordinary bug repair.

At v0.4.278 there is no known blocker.

---

# 9. Phase discipline

Remain in:

> **Phase 1 — BECM source completion and validation**

until that phase is genuinely mature.

Do not interrupt active source closure for large UI restructuring, graphical wilderness-map implementation, procedural world generation, multiplayer, server-authoritative campaign migration, generalized OSR-profile refactoring, or formal AI model-router work unless the current phase reaches the corresponding authorized transition.

The cartography specification below is therefore a **future implementation contract**, not the next checkpoint.

---

# 10. Approved wilderness cartography architecture

## 10.1 Core principle

The player-facing wilderness map should **not normally display the engine's discrete 8-mile hex grid**.

The 8-mile hex lattice remains an authoritative simulation/referee indexing system.

The player sees a continuous geographic **knowledge map**.

Conceptually:

```text
AUTHORITATIVE WORLD
exact world coordinates
hidden 8-mile hex indexing
true terrain/features/sites
true party position
        ↓
CHARACTER / PARTY KNOWLEDGE
maps, memory, observations, rumors,
navigation belief, certainty, provenance
        ↓
CURRENT PERCEPTION
what the characters can actually perceive
from the true current position
        ↓
PLAYER MAP
continuous synthesis of expected geography
and immediate perceived surroundings
```

Mandatory principle:

> **Simulation coordinates are not presentation coordinates.**

---

# 11. Hidden 8-mile wilderness substrate

The engine may use 8-mile hexes for deterministic wilderness procedure, including movement, terrain movement cost, wilderness encounter checks, getting lost, weather regions, hunting/foraging, roads, rivers, coastlines, encounter ecology, source-site indexing, travel time, and regional transitions.

The player does **not** need to know that an 8-mile hex exists.

Referee/developer mode may expose exact hex/grid coordinates, true party position, true route, terrain IDs, region IDs, hidden sites, encounter regions, navigation displacement, and knowledge/perception diagnostics.

Normal player mode must not expose those hidden values.

---

# 12. Player map presentation

The normal wilderness map should resemble a continuous fantasy/world map rather than a board-game hex map.

Render geographic features continuously where appropriate: forest masses, mountain chains, hills, plains, swamps, deserts, coastlines, rivers, roads, settlements, landmarks, and known ruins/sites.

Broad terrain should appear as contiguous regions, not repeated individual hex symbols.

Vector/geographic features such as rivers, roads, borders, coastlines, ridges, and routes should remain continuous objects rather than duplicated per-hex records.

A visible hex-grid toggle may exist for referee/developer/debug use and perhaps optional player preference, but it is **not** the default player experience.

---

# 13. True position versus navigation belief

Maintain separate state for at least:

```text
truePosition
navigationBelief
playerMapKnowledge
currentPerception
trueTravelHistory
believedTravelHistory
```

The engine always resolves actual procedures from `truePosition`.

The normal player map is centered/interpreted through `navigationBelief` and `playerMapKnowledge`.

A party can therefore be physically in one world location while believing itself to be elsewhere.

Never move the authoritative world to make the player's belief true.

Never expose true position merely because the renderer needs to draw the player map.

---

# 14. Getting lost on the continuous player map

When navigation succeeds:

```text
true path ≈ believed path
perception ≈ expected geography
map appears seamless
```

When the party becomes lost under the governing rule:

1. the engine secretly changes the actual travel path/position as required by the rule;
2. the player-facing map continues to depict progress in the party's **intended/believed direction**;
3. the party is not shown suddenly veering into the hidden true direction;
4. all actual terrain, encounters, travel cost, weather, sites, rivers, roads, and events use the true position;
5. the immediate player-visible surroundings come from actual perception at the true position;
6. the broader map remains based on the party's expected/mapped geography.

The party therefore appears to the player to be moving where it intended while the world immediately around it can progressively fail to agree with the expected map.

This mismatch is the primary experiential signal of navigational doubt.

---

# 15. Perceptual map reconciliation / “warping”

The player map may **appear to warp or reconcile around perception**, but do not implement this as an omniscient literal distortion that reveals hidden coordinates.

Think of it as information blending:

```text
DISTANT / OUTER MAP
mapped knowledge, memory, expectation

        ↓ gradual transition ↓

IMMEDIATE PERIPHERY
actual perceived surroundings
```

Normally the two layers agree and the transition is invisible.

When lost, they may conflict.

Example:

```text
expected beyond the party:
forest ending in foothills

actual immediate perception:
flat dense forest continues
```

The displayed local environment should show the forest actually perceived.

Farther away, the known/expected map may still show the foothills.

The resulting discontinuity tells the player:

> “What we see is no longer matching where we think we are.”

It must **not** tell the player:

> “Your true location is exactly three hexes southwest.”

Do not draw a second hidden-position marker.

Do not display the true surrounding terrain pattern at its true map coordinate where the player could reverse-engineer the location.

---

# 16. Perception is egocentric when necessary

Current surroundings are observations, not automatically absolute cartography.

If the characters reliably know orientation, observations may be expressed as north/south/east/west.

If orientation is uncertain, render observations relatively where appropriate:

- ahead;
- behind;
- left;
- right;
- uphill;
- downhill;
- near;
- distant.

Do not accidentally provide a perfect compass or precise coordinate through the graphics when the characters do not possess that information.

---

# 17. Terrain-transition contradictions

A failed expected terrain transition is legitimate player information.

If the party expects hills but continues to perceive level forest, the game may communicate the contradiction visually and/or narratively.

This may reduce navigation confidence without revealing true position.

Ordinary terrain mismatch should not automatically reorient the party.

Generic terrain is weak evidence; more distinctive features provide stronger localization evidence.

Examples, subject to actual rules/source and represented knowledge:

```text
generic forest        → weak evidence
terrain transition    → weak/moderate evidence
major river           → moderate evidence
coastline              → strong constraint
distinctive mountain  → strong bearing/identity evidence
known road junction   → very strong evidence
known settlement      → potentially exact anchor
unique landmark       → potentially exact anchor
```

These are design semantics, not automatic RAW numbers. Do not invent mechanical bonuses from this list unless governing rules provide them or an explicit later project rule authorizes them.

---

# 18. Reorientation and anchors

When the party encounters or recognizes sufficient navigational evidence, update **belief**, not physical position.

The party does not teleport.

Instead:

```text
BEFORE
true position        = hidden A
navigation belief    = displayed B

REORIENTATION
recognized anchor supplies enough information

AFTER
true position        = still A
navigation belief    = corrected toward/to A
```

The player map may visually snap, slide, or reconcile to the corrected understanding.

Different anchors may provide different degrees of correction: exact location, constrained to a road/river/coast, known region, corrected bearing only, or reduced uncertainty without exact localization.

Do not force all landmarks into exact reorientation.

---

# 19. Preserve uncertain travel history

Do not rewrite history to imply the party always knew its true route.

Maintain separate true and believed travel histories.

Player-facing history may show confirmed route, estimated route, uncertain/dashed route, and corrected anchor point.

When reorientation occurs, the earlier uncertain route may remain visibly uncertain rather than being replaced with the hidden true path.

The true route remains referee/engine state and may remain permanently unknown to the player.

---

# 20. Navigation confidence and map certainty

The engine may track knowledge/navigation states such as:

```text
confirmed
estimated
questionable
unknown
```

The player UI should prefer subtle cartographic cues over intrusive game-state meters when possible:

- crisp versus faded geography;
- solid versus dashed travel traces;
- uncertain boundaries;
- partially faded roads;
- question-marked/unnamed landmarks;
- perceptual terrain blending;
- fog/blank areas;
- map annotations.

Do not require every uncertainty value to be shown numerically.

---

# 21. Knowledge provenance

Player-visible geography should eventually distinguish provenance where useful:

- directly observed;
- recently observed;
- remembered;
- accurately surveyed/published map;
- rough purchased map;
- party-drawn map;
- reported by NPC/rumor;
- inferred;
- uncertain;
- unknown.

A cartographic source may itself be wrong.

Do not assume every player-held map equals authoritative world truth.

This allows the engine to distinguish:

```text
world truth
≠ map source
≠ character belief
≠ current observation
```

---

# 22. Hierarchical map scales

Retain the established scale ladder, with player presentation filtered by knowledge:

```text
GLOBAL / WORLD
        ↓
broad strategic scale (for example 24-mile where useful)
        ↓
hidden 8-mile campaign/navigation substrate
        ↓
1/2-mile local wilderness scale where needed
        ↓
settlement/site/dungeon scale
        ↓
individual/combat coordinates
```

Do not instantiate fine detail everywhere merely because the engine can.

High-resolution local maps should exist only where source material, observation, or actual play requires them.

---

# 23. Millions of hexes are an indexing problem, not millions of rich objects

Do not model Mystara as millions of fully populated per-hex documents.

Prefer:

```text
base world geography
+
hex/world-coordinate index
+
regional layers
+
vector features
+
sparse source-content overlays
+
campaign-difference overlays
```

Most ordinary cells should inherit regional facts rather than duplicating them.

Use chunking/spatial indexing so only relevant areas need to be active.

Regional/inherited information can include climate, biome, political region, encounter region, culture, weather regime, and ecology.

Sparse per-location exceptions can include settlements, ruins, dungeons, lairs, unique landmarks, unusual terrain, and campaign-created facts.

Do not use AI to generate every 8-mile cell.

---

# 24. Current perception versus map expectation

The player map should answer two different questions at once:

> **What do we think the world around us is like?**

and

> **What are we actually perceiving right now?**

Near the party, actual perception has presentation priority.

Beyond immediate/reliable perception, mapped knowledge and expectation dominate.

When those disagree, preserve the disagreement instead of silently forcing one layer to match the other.

That contradiction is gameplay information.

---

# 25. Deterministic ownership of navigation

Getting lost, true position, movement, terrain, distance, time, encounter checks, and recognized represented anchors should be deterministic wherever governing rules and encoded world data allow it.

AI is not required to determine the true party location.

AI may narrate observations or help adjudicate genuinely semantic recognition questions, but it must not own authoritative navigation state.

---

# 26. Universal-engine implication

Preserve this architecture so it can generalize beyond Mystara.

The same separation should eventually work for fantasy wilderness, Traveller planetary/sector navigation, Jurassic Park island navigation, Lovecraftian town/investigation maps, modern/survival settings, science-fiction sensor maps, dungeons, and other hidden spatial information.

Universal principle:

> **Authoritative spatial state and player-visible spatial knowledge are separate objects.**

---

# 27. UI/cartography phase sequencing

When Phase 1 source closure is sufficiently mature and cartography becomes active, prefer this order:

1. formalize authoritative global/world coordinates and hidden 8-mile indexing;
2. formalize character/party map-knowledge state and provenance;
3. separate true position from navigation belief;
4. implement continuous player-facing terrain/feature rendering without visible default hexes;
5. implement perceptual near-field overlay/blending;
6. implement lost-state disagreement between expectation and perception;
7. implement partial/exact reorientation through anchors;
8. preserve true versus believed travel histories;
9. add referee/developer hex/grid/debug overlay;
10. extend the same knowledge-filtered architecture down to local/dungeon/combat scales.

Do not create a parallel map system disconnected from authoritative world state.

Rendering remains non-authoritative.

---

# 28. Existing alternate lost rule

Preserve the existing alternate/map-safe lost procedure as a separately labeled campaign option.

Under that option, if the established rule says the party remains in its hex while losing time/resources, do not manufacture hidden displacement merely to exercise the perceptual-map system.

RAW/primary-source navigation and project house-rule alternatives must remain distinguishable and switchable where already intended.

---

# 29. AI model routing — future requirement

When formal AI Referee architecture begins, route AI by semantic task rather than hard-coded model names.

Conceptual task classes may include intent classification, parser repair, NPC dialogue, autonomous-character planning, referee rulings, memory summaries, adventure authoring, and world authoring.

Server/Worker-side capability tiers should select the actual provider/model.

Deterministic rules require no model call.

Do not interrupt Phase 1 merely to implement future model routing.

---

# 30. Long-term architecture

Preserve the established broad progression:

```text
1. complete and validate BECM
2. separate rules / setting / adventure / agency / referee / UI-state
3. generalize reusable OSR kernel
4. autonomous adventurers / variable player control
5. formal AI Referee interface
6. Adventure Compiler / schema
7. procedural adventure generation
8. procedural world generation
9. hosted authoritative campaigns
10. persistent multiplayer / drop-in play
11. commercial-content / IP transition
```

Do not skip phases.

Mystara remains the proving ground and reference implementation, not the permanent product boundary.

---

# 31. Deliverables

Maintain:

- newest production `index.html`;
- append-only `audit.md`;
- updated `pipeline-state.md`;
- long-term direction file;
- this continuous work instruction/controller.

At a natural stop or real controller stop condition, return the latest accepted HTML, latest audit, latest pipeline state, current accepted build, checkpoints completed during the run, full acceptance results, and the explicit next checkpoint or stop reason.

The delivered HTML must correspond exactly to the newest accepted audit entry.

---

# 32. Guiding principles

- RAW first.
- Mentzer BECM primary.
- RC secondary where compatible.
- Do not invent missing source mechanics.
- Deterministic state is authoritative.
- Missing is not the same as empty or zero.
- AI interprets and creates; deterministic systems validate and commit.
- Use AI only where judgment/semantics add value.
- Keep checkpoints small.
- Continue through checkpoints automatically.
- Validate every accepted checkpoint completely.
- Never knowingly continue from a broken accepted baseline.
- Preserve save compatibility and provenance.
- Extend existing systems rather than create parallel replacements.
- The hidden hex grid is simulation infrastructure, not necessarily player presentation.
- The player map represents character knowledge, belief, and perception rather than omniscient world truth.
- Immediate perception may contradict distant/expected cartography without exposing true position.
- Reorientation changes the map belief, not the party's physical location.
- Millions of possible hex coordinates do not require millions of rich records.
- Cartography must not interrupt active BECM source closure prematurely.

---

# 33. Begin now

Start from accepted **v0.4.278**.

Implement:

> **v0.4.279 — explicit selected-person catapult task observations only.**

Run focused validation and the complete production acceptance suite.

If accepted:

1. append the v0.4.279 audit entry;
2. update `pipeline-state.md`;
3. identify or read the next smallest bounded checkpoint;
4. continue immediately.

Continue through successive accepted builds until a genuine controller stop condition occurs.

Do not stop simply because one checkpoint has completed.

Preserve the wilderness-cartography architecture in this instruction for the later authorized map/presentation phase.
