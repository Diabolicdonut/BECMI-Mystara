# BECMI Text RPG Design 21 — Long-Term Project Direction

Continue development of the existing **Known World / BECMI Text RPG** from the current `index.html` and `audit.md`. Treat those files as the immediate source of truth.


## CURRENT SOURCE BASELINE — BUILD 0.4.223

The current implementation source of truth for the next Work conversation is:

- `index-v0.4.223(2).html`
- `audit-v0.4.223(1).md`

These supersede all earlier `index.html` / `audit.md` builds for implementation purposes.

The current audit identifies:

- application build **0.4.223**;
- Mentzer BECM as primary rules authority;
- Rules Cyclopedia only as compatible secondary consolidation/clarification;
- runtime creature composition **628 = 600 canonical + 21 supplemental source profiles + 7 Smoking Pillar module extensions**;
- complete deterministic suite **1180 / 1180** passing;
- four independent Chromium slices **295 / 295** each;
- zero accepted runtime/page exceptions and zero accepted console errors;
- production JavaScript syntax-clean;
- no test harness instrumentation shipped in the production HTML.

The explicitly recorded next bounded source-completion checkpoint is:

> **v0.4.224 — DMR2 Ghostly Horde staged fear/illusion adapter only.**

Do not combine that pass with Buccaneer/Pirate ship construction, cartography, UI restructuring, or another unrelated feature.

### Audit chronology rule

The audit is an append-only development history and contains older status tables, counts, roadmap estimates, and “next checkpoint” sections from prior versions.

Therefore:

> **The newest/topmost audit entry and the latest implemented source always override older historical audit statements when they conflict.**

Do not treat an old completion count, old “remaining work” table, or an old `Next bounded checkpoint` as current merely because it appears later in the very large audit file.

Historical sections remain valuable as provenance and rationale, but they are not the current implementation plan unless reaffirmed by the latest build.

---

The current goal remains to finish and validate the BECM implementation, but the **long-term architecture must now be developed with a broader destination in mind**.

The Known World/Mystara implementation is the **reference implementation and validation environment**, not the permanent limit of the project.

---

## Ultimate Project Goal

The eventual product should become a general-purpose **Old-School RPG Engine / OSR Game Service** capable of:

- Running BECMI material.
- Running Moldvay/Cook B/X material.
- Running Old-School Essentials material.
- Running Labyrinth Lord and other closely compatible old-school systems with rules-profile differences where necessary.
- Running published adventures converted into a standardized internal adventure format.
- Running entirely original procedurally generated campaign worlds.
- Generating original old-school-style adventures that fit naturally into those worlds.
- Supporting human-controlled, AI-controlled, and mixed-control adventuring parties.
- Allowing a player to control one character, several characters, the whole party, act as a director, or simply spectate.
- Allowing control of any character to pass seamlessly between human and autonomous control.
- Eventually supporting persistent hosted multiplayer campaigns in which friends can drop in or out without requiring everyone to maintain a regular schedule.

The final commercial implementation should contain **original and appropriately licensed material**, not depend on Mystara or proprietary published modules. Mystara and classic modules are being used during development to prove that the engine can reproduce the old-school experience correctly.

---

# Development Principle

Do **not** attempt to build the final cloud service immediately.

Reach it incrementally.

The project should evolve through the following sequence:

1. **Complete and validate the existing BECM engine.**
2. **Separate rules, setting, adventure, agency, referee, and UI/state concerns.**
3. **Generalize the rules engine into a reusable OSR kernel.**
4. **Implement autonomous adventurers and variable player control.**
5. **Formalize the AI Referee interface.**
6. **Create a standardized Adventure Compiler/schema.**
7. **Create procedural adventure generation.**
8. **Create procedural world generation.**
9. **Move authoritative campaigns to hosted server infrastructure.**
10. **Add persistent multiplayer/drop-in play.**
11. **Remove proprietary validation content for commercial release.**

Do not skip these stages.

---

# Phase 1 — Finish the BECM Reference Implementation

This remains the immediate priority.

Before major architectural expansion:

- Finish remaining source/rules closure work.
- Finish outstanding monster/profile gaps.
- Finish any incomplete treasure-generation procedures.
- Resolve stale audit/UI status information.
- Preserve both RAW procedures and existing house-rule alternatives.
- Continue adding tests for each implemented procedure.
- Maintain deterministic state authority.
- Perform long-form campaign testing in addition to isolated unit tests.

The engine should successfully support complete old-school campaign loops such as:

**character creation → equipment → hiring → travel → wilderness encounters → dungeon exploration → combat → retreat → resource depletion → treasure recovery → safe-haven return → XP settlement → advancement → save/reload → continued campaign**

Higher-level Companion/Master procedures should likewise remain functional.

Do not declare BECM complete solely because isolated tests pass. It must survive extended actual play without state drift or procedural breakdown.

---

# Phase 2 — Introduce Explicit Architectural Layers

Once current BECM closure is sufficiently mature, gradually establish these conceptual layers:

```text
RULES
SETTING
ADVENTURE
AGENCY
REFEREE
UI / PERSISTENCE
```

These must become separate concepts even if they initially remain contained within the same HTML build.

## RULES

Contains:

- character classes
- advancement
- combat
- saves
- spells
- equipment mechanics
- exploration procedures
- wilderness procedures
- treasure rules
- monsters
- dominion/war/stronghold systems
- other deterministic game mechanics

BECMI becomes the first rules profile rather than the permanent identity of the engine.

Eventually:

```text
rulesProfile = BECMI
rulesProfile = BX
rulesProfile = OSE
rulesProfile = LABYRINTH_LORD
```

Shared procedures should use the same implementation.

Only genuine rules differences should require profile-specific procedures or data.

## SETTING

Contains world-specific information:

- nations
- settlements
- geography
- cultures
- factions
- religions
- history
- roads
- wilderness regions
- regional encounter data
- named NPCs
- setting-specific monsters/items

Mystara/Known World should eventually become a setting package rather than engine logic.

## ADVENTURE

Contains material specific to an adventure:

- maps
- keyed areas
- NPCs
- adventure factions
- encounters
- rumors
- treasures
- clues
- secrets
- objectives
- triggers
- victory/failure states
- local encounter tables

The Smoking Pillar of Lan Yu should eventually become an adventure package loaded by the generic engine rather than permanent engine logic.

## AGENCY

Determines who controls a character.

Do **not** equate “PC” with “currently human controlled.”

A player character should remain a PC regardless of whether the human or autonomous system currently controls it.

Conceptually:

```text
controller = HUMAN
controller = AUTONOMOUS
controller = DIRECTED
```

This is essential for later drop-in/drop-out multiplayer and spectator play.

## REFEREE

Handles tasks requiring language or judgment rather than deterministic rules.

Examples:

```text
interpretAction()
speakAsNpc()
chooseCharacterIntent()
adjudicateAmbiguity()
narrateResult()
summarizeMemory()
```

The referee must never become authoritative game state.

## UI / PERSISTENCE

Contains:

- interface
- terminal
- maps
- character sheets
- campaign journal
- save/load
- exports
- debugging
- testing tools

---

# Phase 3 — Generalize Into an Old-School Rules Kernel

BECMI remains the best-developed baseline.

Do not duplicate entire engines for B/X, OSE, or Labyrinth Lord.

Create shared procedures and data with rules-profile overrides where actual differences occur.

Examples:

```text
initiativeProcedure
weaponDamageProcedure
encumbranceProcedure
spellLists
classProgression
savingThrowTables
monsterVariant
treasureProcedure
```

A B/X adventure should normally be able to use the existing BECMI monster implementation unless a material rules/stat difference requires an explicit source variant.

Allow identities such as:

```text
orc@canonical
orc@becmi
orc@bx
orc@ose
orc@adventure-specific
```

but do not duplicate monsters unnecessarily.

---

# Phase 4 — Autonomous Adventurers and Player-Control Modes

Port the conceptual work from the OSR System project.

Eventually support:

```text
ONE CHARACTER
SELECTED CHARACTERS
ENTIRE PARTY
DIRECTOR
SPECTATOR
```

These are participation modes, not different campaigns.

Control must be changeable at any time.

Example:

```text
Mariel = AUTONOMOUS
↓
Player takes control
↓
Mariel = HUMAN
↓
Player releases control
↓
Mariel = AUTONOMOUS
```

No character state is reset during handoff.

Autonomous characters should eventually possess persistent:

- personality traits
- goals
- fears
- loyalties
- opinions
- interpersonal relationships
- knowledge
- memories
- tactical preferences
- risk tolerance

The autonomous system must only know information legitimately available to that character.

Character knowledge should eventually be distinct from world truth.

```text
WORLD TRUTH
    ↓
CHARACTER KNOWLEDGE
    ↓
PLAYER-VISIBLE INFORMATION
```

Routine choices should use deterministic rules and heuristics whenever possible.

Use generative AI only when meaningful judgment, personality, dialogue, or planning is required.

---

# Phase 5 — Formal AI Referee Interface

The game must not permanently depend on a specific OpenAI model or API implementation.

Create a provider-agnostic referee interface.

Conceptually:

```text
Game
   ↓
Referee Interface
   ├── CloudReferee
   ├── LocalReferee
   ├── HybridReferee
   └── FutureProvider
```

The engine should send bounded structured requests.

Example:

```json
{
  "task": "npc_dialogue",
  "actor": "Kitra",
  "knownFacts": [],
  "unknownFacts": [],
  "relationship": {},
  "recentContext": [],
  "playerStatement": "Who else knows about the ruins?"
}
```

The response must be validated before entering campaign state.

The AI may:

- interpret
- choose intent
- speak
- describe
- recommend a ruling

The AI may **not** directly:

- change HP
- add/remove inventory
- move characters
- alter dice
- change XP
- modify world truth
- create unvalidated permanent facts

The deterministic engine remains authoritative.

---

# Phase 6 — Adventure Compiler

Before procedural world generation, define a generic internal **Adventure Package Format**.

It should be capable of representing many different old-school adventure types.

The schema should support:

```text
IDENTITY
title
level range
themes
region

HOOKS
rumors
patrons
accidental discovery

MAPS
nodes
areas
connections
levels
secret paths
alternate entrances

KEYED AREAS
descriptions
occupants
hazards
interactions
treasure
secrets

FACTIONS
members
territory
goals
relationships

NPCs
identity
knowledge
motivation
relationships

ENCOUNTERS
placed encounters
wandering tables
reaction information

INFORMATION
clues
rumors
secrets
false information

REWARDS
coins
treasure
magic
information
alliances

STATE CHANGES
success consequences
failure consequences
partial outcomes
world changes
```

Published modules used during validation should eventually compile into this same representation.

Generated adventures must use **the exact same representation**.

The engine should not care whether an adventure was:

- originally published,
- manually authored,
- imported,
- or procedurally generated.

---

# Phase 7 — Old-School Adventure Grammar

Use the large body of classic old-school adventure design as a research corpus to derive **general structural principles**, not copied prose or proprietary content.

Develop archetypes such as:

```text
small lair
multi-faction dungeon
lost temple
fortress
haunted site
frontier hexcrawl
island expedition
lost valley
village mystery
urban intrigue
hub + dungeon
wilderness + multiple sites
expedition + lost civilization
regional sandbox
```

For each archetype, determine appropriate statistical ranges for things such as:

- keyed area count
- map branching
- loops
- dead ends
- alternate entrances
- secret-area density
- combat density
- social encounters
- traps
- hazards
- empty/atmospheric rooms
- treasure concentration
- factions
- rumor density
- wilderness sites
- encounter pressure
- optional content
- mandatory encounters

These should be **probabilistic ranges**, never rigid templates.

The goal is not to copy specific modules.

The goal is to reproduce the structural qualities that make old-school modules enjoyable.

---

# Phase 8 — Adventure Generation Pipeline

Generated adventures should not begin with:

> “AI, make a dungeon.”

Use a pipeline:

```text
WORLD STATE
    ↓
Identify adventure opportunity
    ↓
Choose adventure archetype
    ↓
Generate Adventure DNA
    ↓
Generate map topology
    ↓
Allocate factions / hazards / secrets / treasure
    ↓
AI authors concrete content
    ↓
Mechanical validation
    ↓
Structural validation
    ↓
Autonomous simulated playtest
    ↓
AI revision if necessary
    ↓
Commit adventure to world
```

Deterministic code should handle as much structure as practical.

For example, dungeon topology can be generated algorithmically to guarantee:

- connectivity
- loops
- secret regions
- chokepoints
- alternate routes
- multiple levels

The AI then gives those spaces fictional meaning.

Generated adventures must be mechanically checked before the player can encounter them.

Detect problems such as:

- inaccessible rooms
- missing NPC references
- impossible clue chains
- nonexistent monsters
- unsupported spells/items
- broken exits
- impossible objectives
- inappropriate treasure
- contradictions with established world facts

Reject or repair invalid adventures before making them canonical.

---

# Phase 9 — Procedural World Forge

Only after the Adventure Compiler works should procedural world generation become a major focus.

Generate worlds hierarchically.

```text
WORLD
↓
REGIONS
↓
LOCAL AREAS
↓
SETTLEMENTS / SITES
↓
ADVENTURES
```

Do not fully detail an entire planet at campaign inception.

Generate broad facts first and progressively expand areas as required.

Deterministic systems should handle much of the physical structure:

- elevation
- mountain chains
- watersheds
- rivers
- coasts
- climate
- biomes
- roads
- settlement suitability

AI should give those structures cultural and historical meaning.

Each world must receive a persistent **World Bible** containing permanent facts.

Examples:

```text
geography
cultures
kingdoms
religions
historical eras
wars
migrations
factions
settlements
trade routes
regional threats
monster ecology
ruined civilizations
legends
```

Once established, these become campaign truth.

The AI may not casually contradict them later.

---

# Generated Facts and Continuity

Every generated piece of content should distinguish between:

## Inherited Facts

Already established by the world and immutable for this generation request.

## Derived Facts

Logical extensions of existing facts.

## New Facts

Facts introduced by the generator.

New facts must be registered into permanent campaign state once accepted.

Once generated, a place or person **has always existed from the campaign's perspective**.

Do not regenerate established content differently on later visits.

---

# Regional Coherence

Avoid procedural “fantasy soup.”

Regions should possess coherent identities based on:

- geography
- cultures
- history
- ecology
- religion
- settlement patterns
- conflicts
- ruins

Generated adventures should inherit these characteristics.

If a region contains the ruins of an ancient dwarven kingdom, generated sites should generally relate to that history rather than arbitrarily introducing an unrelated lost civilization.

Generated content should feel as though it was deliberately written for its region.

---

# Monster Ecology

Do not treat wilderness encounter tables as unlimited random monster dispensers.

Eventually support persistent regional populations and ecological/historical placement.

Examples:

- goblin tribes control particular territory
- undead concentrate around historical battlefields
- giant spiders cluster near certain ruins
- a wyvern may have a specific known nesting area

If a unique or limited regional threat is eliminated, it should remain eliminated unless something in the world causes its return.

---

# Phase 10 — Autonomous Adventure Validation

Use the autonomous-party system as a procedural-content test harness.

Generated adventures can be simulated repeatedly before acceptance.

Look for:

- unreachable objectives
- required clues never discovered
- unavoidable structural death traps
- broken navigation
- impossible resource demands
- loops with no exits
- inaccessible treasure
- encounters that never resolve
- invalid state transitions

Do not use simulation to make every adventure “balanced.”

Old-school danger and unfair-looking situations may be intentional.

Use simulation to detect **broken design**, not to remove lethality.

---

# Phase 11 — Hosted OSR Game Service

Only after the preceding systems work should the project migrate into its final hosted architecture.

The browser becomes primarily a client.

The server becomes authoritative for:

```text
rules resolution
campaign state
world state
character state
multiplayer synchronization
campaign history
AI routing
world generation
adventure generation
background jobs
```

Conceptually:

```text
              CAMPAIGN SERVICE
                     │
       ┌─────────────┼─────────────┐
       │             │             │
  RULES ENGINE   WORLD STATE   AI SERVICES
       │             │             │
       └─────────────┼─────────────┘
                     │
                MULTIPLAYER
                     │
          ┌──────────┼──────────┐
          │          │          │
       Player      Player    Spectator
```

---

# Drop-In / Drop-Out Multiplayer

The eventual service should allow casual participation without requiring regular group scheduling.

A campaign owner should be able to say:

> “Want to jump into my game for a while?”

A friend should be able to:

- join with a new character,
- take over an existing autonomous character,
- control one character,
- spectate,
- leave at any time.

When the player disconnects, the character can return to autonomous control.

Persistent character memory, knowledge, relationships, equipment, XP, injuries, and history remain intact.

No campaign restart should be necessary.

---

# Campaign Permissions

Eventually support campaign-owner choices such as:

```text
Owner must be present
Friends may play without owner
Only downtime allowed without owner
Full expeditions allowed
Autonomous continuation allowed
Spectators allowed
```

These are future service features, not immediate BECM tasks.

---

# Commercial End State

The eventual commercial service should be based on:

- original setting generation
- original generated adventures
- appropriately licensed game mechanics/content
- original names
- original presentation
- original artwork/assets
- persistent campaign hosting
- AI referee services
- multiplayer
- world generation

Do not assume that simply renaming proprietary content is sufficient.

A proper IP/licensing review will be required before commercial release.

Mystara and published adventures are **development validation material**, not the intended commercial dependency.

---

# Final Product Vision

The desired eventual user experience is:

> Create a world.

> Create an adventurer.

> Enter a persistent old-school campaign.

> Control one character, selected characters, or the entire party.

> Or simply watch the adventurers act on their own.

> Invite a friend whenever convenient.

> They can take over an adventurer or bring in a new one.

> When they leave, the campaign continues.

> The world remembers what happened.

> New regions and adventures emerge naturally from the world's history and current state.

> The referee is always available.

> No regular group schedule is required.

The eventual product should feel less like an AI chatbot or conventional CRPG and more like an **always-available persistent old-school tabletop campaign**.

---

# Immediate Development Rule

Do **not** allow this long-term vision to derail current BECM completion.

For the immediate Known World development:

1. Continue the existing BECM implementation from the current files.
2. Preserve all existing working behavior.
3. Preserve RAW/house-rule toggles.
4. Complete unfinished deterministic procedures.
5. Continue fixing source gaps.
6. Continue regression testing.
7. Work in **small independently testable checkpoints**, preferably one or two closely related rules/systems per pass, to avoid timeouts.
8. After each implementation checkpoint, validate before proceeding.
9. Continue providing an updated **`index.html` and `audit.md`** so that development history remains recoverable.
10. Do not perform a massive rewrite solely to satisfy the future architecture.
11. When touching existing systems, gradually make them more modular and less dependent upon hard-coded Known World/Smoking Pillar assumptions.
12. Flag architectural opportunities in the audit, but implement them incrementally.

The first major post-BECM milestone should be:

> **Prove that Setting, Adventure, Rules, Agency, and Referee can be separated without breaking the existing Known World campaign.**

The first major procedural milestone after that should be:

> **Generate one entirely original small campaign region containing a settlement, coherent wilderness, factions, historical background, and approximately three original old-school adventures, then run it successfully using the generic engine.**

If that succeeds, the conceptual foundation of the future OSR Game Service will have been proven.

---

# Guiding Architectural Principle

At all stages:

> **Use deterministic systems for anything that can be known, calculated, validated, or persisted. Use AI for interpretation, judgment, creativity, characterization, and narration.**

The deterministic engine owns reality.

The AI referee interprets reality.

The world generator creates proposed reality.

Validation converts those proposals into permanent reality.

That distinction should remain foundational throughout the project.

---

# Expanded Direction Addendum — RAW Defaults, Cartography, Mystara Reconstruction, Module Integration, and Final Service Vision

**This addendum is part of the handoff and should be read together with the preceding sections. Where this addendum conflicts with an earlier design assumption, the newer direction below controls.**

## RAW Is Now the Default Operating Profile

The project should default new campaigns to the closest available **BECMI RAW** procedures. Existing optional systems remain implemented and selectable, but they should no longer be assumed by default.

For new campaigns, default to RAW weapon damage, RAW initiative, RAW combat sequence, RAW movement, RAW getting-lost behavior, RAW spell handling, RAW encounter procedure, RAW treasure/XP procedures, and RAW class/advancement rules. Weapon Mastery remains available but should start disabled because it is optional. Existing alternate systems such as Arms Across Eras, phase initiative, map-safe lost time, and enhanced positional/3D combat remain available as explicit options.

Do not silently rewrite the settings of an existing saved campaign. Existing saves retain their stored configuration.

The guiding rule is:

> **Classic old-school RAW by default; optional enhancements only when the player chooses them.**

This matters because the engine's first job is to reproduce the experience expected by published BECMI/B/X-compatible material as faithfully as possible.

## RAW Weapon Differentiation Through Bounded Referee Adjudication

Returning to RAW weapon statistics should not erase the practical differences between weapon types.

Some weapon distinctions are already explicit in the rules and therefore belong in deterministic code: weapon size, one- vs two-handed use, initiative consequences, range, reload requirements, polearm reach, spear use against charges, lance use, thrown/melee versatility, shield compatibility, and other printed traits.

For situations not explicitly resolved by RAW, add a bounded **weapon-affordance referee layer**.

A weapon may carry descriptive, non-bonus properties such as:

```text
SPEAR
- long
- rigid
- pointed
- thrusting
- throwable
- can be braced

DAGGER
- short
- pointed
- cutting
- concealable
- usable in confined spaces

BATTLE AXE
- chopping
- heavy edge
- suitable for cutting wood
- needs more swing room than a dagger

WAR HAMMER
- compact
- crushing head
- suitable for striking hard objects

PIKE
- extremely long
- rigid
- thrusting
- awkward in tight turns

TWO-HANDED SWORD
- long
- heavy
- cutting/thrusting
- two-handed
- requires substantial handling space
```

These are fictional affordances, not hidden combat bonuses.

When a weapon is used, apply this order:

1. If RAW explicitly answers the situation, deterministic RAW wins.
2. If RAW is silent but the physical nature of the weapon materially matters, the referee may make a bounded situational ruling.
3. If the weapon's physical form does not materially matter, resolve the action normally with no added effect.

Allowed referee outcomes should favor feasibility and scene state rather than invented numbers: possible/impossible, can reach/cannot reach, normal/hindered, must move first, appropriate/inappropriate for the task, use an existing RAW modifier, use an ordinary ability check, or create a temporary physical state such as braced, wedged, blocked, jammed, cut, loosened, or broken.

Do not allow the AI to casually invent new permanent attack modifiers, damage dice, AC modifiers, or permanent weapon traits.

This is intended to reproduce the old-school referee function of recognizing that a spear, dagger, axe, hammer, pike, sword, or polearm may matter differently in a specific fictional situation without replacing RAW with another invisible weapon matrix.

## Schematic Visual Mapping Is a Core Interface, Not a Cosmetic Feature

The project does not need conventional high-end graphics. It does need clear spatial information.

All mapping should remain **deterministic, schematic, and generated from authoritative game state**.

Use different visual resolutions according to context:

```text
WILDERNESS
    ↓
HEX RESOLUTION

DUNGEON / INTERIOR
    ↓
ROOM-AND-CORRIDOR RESOLUTION

COMBAT / ENCOUNTER
    ↓
INDIVIDUAL RELATIVE-POSITION RESOLUTION
```

The graphics never become authoritative game state. They are a view of game state.

## Wilderness Cartography

Wilderness travel should use pointy-top hex maps derived from the engine's existing hex coordinates and terrain data.

Primary intended scales are:

- **8-mile hexes** for broad campaign and regional travel.
- **1/2-mile hexes** for local adventure-region exploration where the source or generated content uses that scale.

The wilderness view should be able to show terrain, coastline, rivers, roads, trails, borders where known, settlements, castles, ruins, lairs, dungeons, special sites, party position, discovered landmarks, known vs rumored sites, explored vs unknown territory, and current map scale.

Use a simple original symbol key inspired by classic old-school hex maps. Do not merely reproduce copyrighted map artwork.

Kai Besil's existing 1/2-mile wilderness data should become the first graphical wilderness-renderer validation case.

Later, the same renderer should operate on 8-mile Known World campaign hexes.

## Dungeon Cartography

Dungeon maps should use classic line-drawing conventions: rooms, corridors, doors, stairs, walls, pits, statues, altars, columns, water, rubble, and other keyed features.

Normal dungeon geometry should operate in tens of feet, usually with **10-foot logical mapping units**.

Keyed rooms/sites should eventually be able to store geometry such as:

```javascript
map: {
  level: "L1",
  x: 12,
  y: 8,
  width: 4,
  height: 3,
  shape: "rect",
  exits: [
    { side: "north", offset: 2, type: "door" },
    { side: "east", offset: 1, type: "secretDoor" }
  ],
  features: [
    { type: "statue", x: 2, y: 1 },
    { type: "pit", x: 3, y: 2 }
  ]
}
```

Complex rooms can later use polygons or explicit wall segments.

Build an extensible symbol library for doors, double doors, secret/concealed doors, one-way doors, archways, open doorways, portcullises, stairs, spiral stairs, ladders, pits, traps, statues, altars, daises, wells, fountains, fireplaces, pillars, tables/chests, beds, curtains, windows, railings, rubble, rock walls, streams, pools, crevasses, depressions, sinkholes, natural passages, natural chimneys, and other required features.

Do not implement the entire historical symbol vocabulary at once. Add the subset required by current content, then extend it as more modules require additional symbols.

## Combat Mapping

Combat should use the same visual language as the dungeon/local map, but zoomed to the immediate room or encounter space and populated with entity indicators.

It should answer practical questions such as who is approximately where, who is engaged, who is near a doorway or stair, who is at the front/rear, what obstacle or choke point matters, and what approximate range relationship exists.

Use simple party and monster tokens, for example:

```text
AL = Aldric
MA = Mariel
EL = Elwyn

G1 = Goblin 1
G2 = Goblin 2
SK1 = Skeleton 1
```

The existing x/y/z combat state remains authoritative. The renderer reads that state rather than inventing positions.

Under RAW combat, this view is primarily explanatory. It should not quietly turn the game into a grid-based tactical rules system unless the player explicitly enables an optional positional-combat mode.

## Player Map vs True Map

Old-school exploration requires uncertainty.

The engine should distinguish:

```text
TRUE WORLD / TRUE DUNGEON
        ↓
CHARACTER / PARTY KNOWLEDGE
        ↓
PLAYER MAP
```

The player map must not reveal undiscovered secret doors, secret rooms, hidden passages, unseen traps, hidden creatures, unrevealed sites, or exact position information that RAW getting-lost procedures intentionally conceal.

Known, rumored, suspected, and directly observed information can eventually use distinct visual states.

This same knowledge architecture should later support multiplayer characters who know different things.

## Cartography Implementation Order

Upgrade the existing map window instead of creating an unrelated UI system.

The existing CURRENT / COMBAT / LOCAL / TOWN / WILDERNESS views should progressively become graphical SVG renderers while retaining ASCII as a debug/fallback option.

Recommended sequence:

```text
RAW defaults
↓
SVG map shell
↓
graphical Kai Besil 1/2-mile hex map
↓
dungeon geometry schema
↓
first dungeon level rendered graphically
↓
old-school symbol subset + key
↓
combat token overlay
↓
knowledge / fog-of-war validation
↓
8-mile Known World regional mapping
```

SVG is the preferred initial technology because it is browser-native, crisp at any zoom, easy to generate from data, easy to label, interactive, and self-contained.

## Mystara Is the Full Reference-World Ambition

The long-term proof-of-concept should aim to reproduce the **entire playable world of Mystara** as a persistent campaign environment.

The goal is not merely to display a large map. The goal is to make Mystara executable.

Settlements should function. Roads should connect regions. Wilderness travel should matter. Cultures and populations should exist. Factions should have persistent goals. Regional encounter ecology should make sense. Adventure-module sites should occupy real locations. Rumors should refer to real places. Module consequences should alter persistent world state. A character should be able to travel from one adventure region to another without leaving the same campaign.

Build this incrementally, region by region and source by source, with provenance.

The intended worldbuilding corpus includes, as applicable:

- BECMI / Rules Cyclopedia material.
- GAZ1–GAZ14.
- Atlas of Mystara cartography / reconciliation.
- the project's adventure-module library.
- Dawn of the Emperors.
- Hollow World material and HWR regional supplements.
- Champions of Mystara.
- Wrath of the Immortals as a later dated event layer.
- Creature Crucible / PC-series material where appropriate.
- Savage Coast material where appropriate.
- Blackmoor material where appropriate.
- Almanac / dated-event material where useful.
- Princess Ark / Dragon material where useful and tracked.
- Threshold Magazine as a major supplementary worldbuilding corpus.
- other approved Mystara reference material already present in the project.

## Canon and Provenance

Every imported fact should retain source provenance.

When sources disagree, do not silently blend them. A practical default priority should generally favor:

1. dedicated official regional source.
2. detailed official module/adventure material for the specific location.
3. broader official setting or map source.
4. officially published secondary material.
5. Atlas-style cartographic reconciliation.
6. Threshold / fan scholarship or reconstruction.
7. engine-created connective material.

Case-by-case exceptions are allowed but should be logged.

Threshold Magazine is extremely valuable for filling Mystara gaps, but Threshold-derived reconstruction should remain internally distinguishable from official canon.

Generated connective material should also retain provenance even though normal players do not need to see source labels during play.

## Campaign Chronology

Use a stable world baseline rather than allowing material from multiple publication eras to blur together.

A practical core Known World baseline is **AC 1000** unless the active campaign selects another starting date.

Later material such as Wrath of the Immortals and Almanac developments should become dated world-state/event layers rather than silently rewriting the starting world.

Published chronology is an initial condition and potential event source, not an immutable railroad. Player actions should be allowed to produce an alternate Mystaran history.

## Mystara Map Resolution Ladder

The long-term cartography model should support hierarchical scales:

```text
GLOBAL MYSTARA
    ↓
24-mile or other broad strategic scale where useful
    ↓
8-mile campaign hex map
    ↓
1/2-mile local adventure map where needed
    ↓
dungeon/interior tens-of-feet map
    ↓
combat individual-position view
```

Do not generate fine detail everywhere merely because the engine can.

A broad region can remain at 8-mile resolution until play or source material requires local detail.

## Kai Besil's Place in the World

Kai Besil should remain the initial proving ground and should exist as an island in the **Sea of Dread**, associated with the broader Thanegioth / eastern Sea of Dread region.

The working concept is that it is isolated enough to function as a self-contained introductory adventure environment while remaining reachable from wider Known World sea routes.

Talamau remains a meaningful local hub, and the Smoking Pillar / Lan Yu material remains intact as a localized campaign situation.

After the island adventure, the party should be able to enter the wider Known World rather than reaching an artificial campaign endpoint.

Kai Besil can therefore function as one valid campaign start:

```text
Shipwreck / arrival
↓
Kai Besil wilderness
↓
Talamau
↓
Smoking Pillar campaign
↓
Sea of Dread routes
↓
wider Mystara
```

Kai Besil should eventually exist simultaneously at the broader Sea of Dread campaign-map scale, its local 1/2-mile wilderness scale, settlement/site scale, dungeon scale, and encounter scale. This makes it an excellent validation case for the full cartographic resolution ladder.

## Alternative Campaign Start: Mentzer's Introductory Aleena/Bargle Dungeon

The game should also eventually support the classic **Mentzer introductory dungeon sequence involving Aleena and Bargle** as an alternate Known World starting point.

This should function as a tutorial-like old-school experience introducing movement, room exploration, doors, searching, combat, danger, NPC interaction, healing/loss, retreat, and campaign continuity.

Most importantly, it should **not be a disconnected tutorial**.

After completion, the surviving character should emerge into the persistent Known World and continue ordinary campaign play.

This creates at least two validated campaign starts:

```text
START A — KAI BESIL
Sea of Dread / shipwreck / island survival
↓
Talamau / Smoking Pillar
↓
wider Mystara

START B — MENTZER INTRODUCTORY DUNGEON
Aleena / Bargle
↓
Karameikos / Threshold-region campaign context
↓
wider Known World
```

Future starts can be added later.

## Adventure Module Library as Persistent World Content

The user's maintained module index is the authoritative content backlog.

The intended corpus includes major families such as:

```text
B-series
X-series
CM-series
M-series
BSOLO
XSOLO
MSOLO
DA / Blackmoor
DDA
Hollow World adventures (HWA / HWQ and related)
IM-series
principal Mystara-compatible solo material
selected later Mystara adventures
other specifically approved modules
```

The established working index has included major ranges such as B1–B12, X1–X13, CM1–CM9, M1–M5, DDA1–DDA4, DA1–DA4, IM1–IM3, HWA1–HWA3 / HWQ1, principal solo adventures, and selected later Mystara adventures.

If the user's maintained module index differs from this summary, **the maintained module index wins**.

Do not implement the module library as a menu of unrelated levels.

Each module should become persistent world content: geography, settlements, routes, wilderness, dungeon geometry, keyed areas, NPCs, factions, encounter tables, rumors, clues, treasure, monsters, special rules, adventure hooks, completion/failure states, and persistent consequences.

A cleared dungeon remains a place in the world. A dead villain remains dead. A rescued NPC may recur. A broken bridge remains broken until repaired. A weakened faction may alter later regional behavior.

## Adventure Modules Are Also Geographic Sources

Modules frequently contain some of the most detailed available data for villages, castles, rivers, roads, local history, wilderness routes, settlement details, regional politics, monster populations, ruins, and travel distances.

Module ingestion should therefore enrich the surrounding world database rather than create an isolated adventure bubble.

As more modules are incorporated, the Known World should become progressively denser and more coherent.

## Gazetteers as Connective Tissue

Gazetteers should provide much of the living connective tissue between modules.

They should supply regional boundaries, government, culture, settlement hierarchy, major NPCs, religions, economy, trade, military forces, roads, history, language, law, regional encounter logic, social expectations, rumors, and adventure seeds.

Modules provide high-detail adventure locations.

Gazetteers provide the **world between those locations**.

This combination is essential if travel from one published adventure to another is to feel like movement through one continuous campaign rather than switching products.

## Atlas of Mystara as Cartographic Scaffold

Atlas of Mystara material should be used primarily as a cartographic scaffold and reconciliation aid.

Its role is to help locate published sites relative to one another, reconcile regional map scales, construct the 8-mile campaign hex layer, align Gazetteer and module geography, identify gaps that require connective data, and support travel distances and transitions.

Where Atlas reconstruction conflicts with a more authoritative detailed official source, retain provenance and follow the project's canon hierarchy.

The final game should render maps from normalized geographic data rather than merely display the Atlas as static images.

## Threshold Magazine as Supplemental Worldbuilding

Threshold Magazine should be treated as a major supplementary Mystara corpus.

It can help fill villages, towns, wilderness details, regional histories, adventure sites, NPCs, cultural elaborations, unexplored regions, conversions, cartography, and connective material.

Use it selectively and retain provenance.

The objective is completeness, coherence, and playability without pretending that all fan-created reconstruction is official canon.

## Recommended Mystara Expansion Path

Do not attempt the whole world in one pass.

A practical direction is:

```text
Smoking Pillar / Kai Besil proving ground
↓
Karameikos
↓
Mentzer Aleena/Bargle intro integration
↓
B-series Karameikos / nearby Basic adventures
↓
GAZ1-level regional completeness
↓
Threshold / Darokin / Ylaruam / surrounding Known World
↓
X-series expansion and Sea of Dread
↓
broader Gazetteer nations
↓
Companion / Norwold
↓
Master-level world content
↓
Hollow World / Blackmoor / Savage Coast / other regions
↓
full Mystara reference implementation
```

This is directional rather than rigid. Prefer expansion that creates contiguous playable space.

## Mystara as the Control Case for Procedural Generation

Mystara is not merely content; it is the benchmark against which the future World Forge should be judged.

The procedural generator should eventually be evaluated by asking whether a generated country feels as coherent as a Gazetteer nation, whether generated adventures fit regional geography/history, whether settlements have reasons to exist, whether rumors point toward real persistent places, whether adventures leave lasting consequences, and whether travel between adventures feels like movement through one world.

The goal is to learn what makes a coherent published campaign setting work, then generate an original setting with the same structural integrity without copying Mystara's proprietary expression.

## Published and Generated Adventures Must Converge on One Internal Format

The engine should ultimately use the same Adventure Package / Adventure Compiler representation for:

- converted published modules.
- hand-authored project material.
- imported compatible OSR adventures.
- procedurally generated original adventures.

The engine should not care where an adventure originated once it has been compiled into validated structured content.

This is the bridge between the Mystara proof-out phase and the eventual original commercial service.

## Final Service Direction

The likely commercial destination is a hosted **OSR Game Service** rather than a purely local downloadable application.

The browser becomes primarily a client. The server owns authoritative campaign/world state, deterministic rules resolution, multiplayer synchronization, AI routing, procedural world/adventure generation, campaign history, and background generation jobs.

The customer should not need to care which specific model performs each task.

Internally, route work appropriately:

```text
deterministic rule → no AI
routine classification → cheap model
ordinary NPC dialogue → economical model
autonomous character planning → stronger model
difficult referee ruling → reasoning model
world/adventure authoring → strongest appropriate model
```

Generated places and adventures are created once, validated, committed to campaign state, and then persist. The system should not repeatedly spend inference recreating the same tavern, dungeon, or town every time a player returns.

## Drop-In / Drop-Out Multiplayer

The eventual social experience should support casual participation without a permanent weekly schedule.

The campaign owner should be able to say:

> **"Hey, you want to jump into my game and hang out?"**

A friend should be able to create a new adventurer, assume control of an existing autonomous character, control one character, spectate, and leave whenever necessary.

When they leave, the character may return to autonomous control with XP, equipment, injuries, memories, relationships, goals, and character knowledge intact.

The campaign continues to exist independently of any one person's availability.

## Campaign Permissions

Future hosted worlds should eventually support owner-configurable permissions such as:

```text
Owner must be present
Friends may play without owner
Only downtime allowed without owner
Full expeditions allowed
Autonomous continuation allowed
Spectators allowed
```

These are future service features and should not derail current BECM completion.

## Commercial IP Transition

Mystara, Gazetteers, Threshold material, and published modules are development/reference material for this project and require careful legal treatment before any commercial release.

The eventual commercial OSR service should use original worlds, original generated adventures, original presentation/assets, and appropriately licensed mechanics/content.

Do not assume that renaming proprietary names is sufficient.

Before commercial release, perform a proper IP/licensing review covering distributed text, maps, artwork, trademarks, adapted module expression, monster expression, setting lore, fan-produced material, and relevant reference/training usage.

The success condition is that the Mystara package can be removed and the generic engine still creates and runs coherent original old-school worlds.

## Updated Development Sequence

The long-term progression should now be understood as:

```text
1. Finish and validate the BECM deterministic engine.
2. Make RAW the default profile while preserving optional systems.
3. Add bounded RAW weapon-affordance referee adjudication.
4. Upgrade wilderness/dungeon/combat cartography using schematic SVG views.
5. Separate Rules / Setting / Adventure / Cartography / Agency / Referee concerns.
6. Expand Mystara region-by-region using Gazetteers, modules, Atlas, and Threshold.
7. Generalize BECMI into a reusable OSR rules kernel.
8. Implement autonomous adventurers and variable human/AI control.
9. Formalize a provider-agnostic Referee interface.
10. Define the Adventure Compiler / package schema.
11. Derive an old-school Adventure Grammar from the module corpus.
12. Generate and validate original adventures using the same package format.
13. Build the procedural World Forge.
14. Generate one fully original coherent campaign region and run it successfully.
15. Move authoritative campaign state to hosted infrastructure.
16. Add persistent drop-in/drop-out multiplayer.
17. Remove proprietary validation content from the commercial product.
```

Do not skip validation gates between these stages.

## Immediate Near-Term Implementation Priorities

After current BECM closure work, the recommended focused sequence is:

```text
A. RAW-default initialization and migration safety
B. RAW weapon-affordance referee bridge
C. SVG map container using the existing map window
D. Kai Besil graphical 1/2-mile hex renderer
E. Dungeon geometry schema
F. First graphical dungeon automap
G. Dungeon symbol key
H. Combat token overlay using existing x/y/z positions
I. Player-knowledge / fog validation
J. Separate adventure/setting geometry from the renderer
```

This work directly supports both the current Known World project and the later generic OSR service.

## Major Acceptance Milestones

### BECM Closure Milestone

The engine can sustain long-form RAW BECM campaign play without state drift: character creation, hiring, equipment, wilderness travel, getting lost, dungeon exploration, encounter procedures, combat, morale, retreat, resource depletion, treasure recovery, safe-haven XP, advancement, save/load, and higher-level Companion/Master play.

### Architecture Milestone

Rules, Setting, Adventure, Cartography, Agency, and Referee can be separated without breaking the existing Known World campaign.

### Mystara Milestone

A contiguous Karameikos-centered campaign environment exists with persistent Gazetteer/world data, regional travel, selected module integrations, the Aleena/Bargle introductory start, graphical wilderness/dungeon/combat mapping, and consequences that persist between adventures.

### Procedural Milestone

The engine generates one entirely original campaign region containing coherent geography, settlements, factions, history, persistent ecology, rumors, and approximately three original old-school adventures that feel deliberately written for that world.

### Service Milestone

The same campaign can be entered by one player, several players, or spectators; characters can move between human and autonomous control; world/campaign state remains authoritative and persistent; and no fixed weekly group schedule is required.

## Final Guiding Rules

When uncertain which direction to take, prefer the choice that preserves these principles:

- **RAW first.**
- **Deterministic state authority.**
- **AI for rulings, interpretation, dialogue, narration, and creativity — not silent state mutation.**
- **Use referee judgment to preserve old-school fictional flexibility rather than replacing every ruling with a new table.**
- **Published content becomes structured persistent world data.**
- **Generated content must use the same structures as authored content.**
- **Mystara is the reference implementation, not the commercial dependency.**
- **Maps communicate game state at the correct scale rather than becoming decorative graphics.**
- **Characters remain persistent identities independent of who controls them.**
- **The world remembers consequences.**
- **Build in small independently testable checkpoints.**
- **Do not sacrifice current playability for premature large-scale refactors.**

The ultimate target remains:

> **An always-available persistent old-school tabletop campaign service where a player can create or enter a world, control one character or an entire party, invite friends casually, hand characters between humans and autonomous agents, explore coherent module-like adventures, or simply sit back and watch the campaign unfold.**

---

# 56. UI / Workspace Refactor for Mapping and Continued Usability

The existing interface should be reorganized before the new graphical mapping system becomes large enough to crowd the play surface.

The current build already has a two-column desktop layout with the game transcript on the left and a 340-pixel sidebar on the right. The sidebar contains the Situation map, Journal access, Handbook access, quick commands, wilderness information, campaign controls, options/developer tools, combat status, location information, and party information. The Situation panel is sticky on desktop and becomes a fixed panel above the command footer on mobile. As the map becomes more useful and more graphical, this arrangement will increasingly obscure or compress other important information.

The UI should therefore be reorganized around a **primary play workspace** rather than continuing to add more material to the sidebar.

## 56.1 Core UI Principle

> **The map is part of the main play surface, not part of the utility sidebar.**

Do not allow the wilderness/dungeon/combat map to cover Party, Combat, Here, settings, or other live information.

The player should be able to see the map and the text/referee output together whenever screen size permits.

The map may be expanded intentionally into a modal/full-view mode, but the ordinary map should never float over other controls simply because it is open.

---

# 57. Recommended Desktop Layout

Use a two-region play workspace:

```text
┌──────────────────────────────────────────────────────────────┐
│ TITLE / STATUS / PRIMARY TOOLBAR                             │
├──────────────────────────────────────┬───────────────────────┤
│                                      │                       │
│  MAIN PLAY WORKSPACE                 │  LIVE SIDEBAR         │
│                                      │                       │
│  ┌────────────────────────────────┐  │  PARTY                │
│  │ CONTEXTUAL MAP / SCENE VIEW    │  │  HERE                 │
│  │ wilderness / dungeon / combat  │  │  COMBAT               │
│  └────────────────────────────────┘  │                       │
│                                      │  compact live info    │
│  ┌────────────────────────────────┐  │                       │
│  │ NARRATIVE / TERMINAL LOG       │  │                       │
│  │                                │  │                       │
│  └────────────────────────────────┘  │                       │
├──────────────────────────────────────┴───────────────────────┤
│ COMMAND INPUT                                                │
└──────────────────────────────────────────────────────────────┘
```

The main play workspace should contain:

1. **Contextual map / scene panel**
2. **Narrative / terminal log**

The right sidebar should contain only information that benefits from being continuously visible during play.

Recommended always-available sidebar sections:

- PARTY.
- HERE / CURRENT LOCATION.
- COMBAT, only when combat is active.
- compact resource/status summaries where useful.

The map should no longer live inside the sidebar.

---

# 58. Move Utility Material Out of the Live Sidebar

The following current sidebar functions do not need to occupy permanent vertical space during normal play:

- Campaign Journal.
- Player Handbook.
- Quick Commands.
- Rules Options.
- Developer Tools.
- AI connection/configuration.
- detailed rules transparency.
- regression-test controls.

Move these into a compact **top-level toolbar / menu / drawer**.

Recommended primary toolbar:

```text
MAP
PARTY
JOURNAL
RULES
SETTINGS
```

Possible developer-only item:

```text
DEV
```

These controls may open modal or drawer panels when deliberately requested.

Normal gameplay should not require scrolling past developer controls or configuration options to find the party or current location.

---

# 59. Contextual Map Panel Behavior

The new map panel should use the existing contextual mode logic.

In `AUTO` mode:

```text
wilderness travel
    → wilderness hex map

settlement / local exploration
    → local or settlement map

dungeon exploration
    → dungeon map

combat
    → combat/local tactical map
```

The map panel should provide compact controls such as:

```text
CURRENT | COMBAT | LOCAL | TOWN | WILDERNESS | EXPAND | HIDE
```

Do not duplicate a large map in both the main play area and sidebar.

The existing expanded map modal may remain as the deliberate **EXPAND** view.

The normal map panel should be **docked**, not overlaid.

---

# 60. Map Panel Size and Collapse Behavior

The map panel should be collapsible.

Recommended states:

```text
MAP: AUTO
MAP: HIDDEN
MAP: EXPANDED
```

Optional later state:

```text
MAP: LARGE
```

On desktop, the normal map should occupy approximately the upper 30–40% of the main play workspace when useful, with the terminal below it.

The exact dimensions should remain responsive rather than fixed.

When the player chooses `HIDE`, the terminal should reclaim the space immediately.

When combat begins or a new area is entered, the engine may update the map automatically, but it should not forcibly reopen a map the user deliberately hid unless a future accessibility/gameplay setting requests that behavior.

---

# 61. Mobile / Narrow-Screen Behavior

The current mobile Situation panel should **stop being a fixed overlay above the command footer**.

On narrow screens, use normal document flow:

```text
STATUS
↓
CONTEXTUAL MAP (collapsible)
↓
NARRATIVE / TERMINAL
↓
LIVE PARTY / HERE / COMBAT PANELS
↓
COMMAND INPUT
```

The map must not cover the sidebar/content underneath it.

The existing fixed command input can remain if desired, provided adequate safe padding continues to prevent transcript content from being hidden beneath it.

On mobile:

- map is collapsed/compact by default if vertical space is limited.
- tapping the map header expands it inline.
- `EXPAND` may open the existing modal for a dedicated large view.
- closing the expanded view returns the user to the same scroll/play position.
- Party / Here / Combat remain readable without dismissing an always-floating map.

---

# 62. Sidebar Simplification

The live sidebar should become a **play-status sidebar**, not a storage area for every system control.

Recommended order:

```text
PARTY
HERE
COMBAT (only while relevant)
RESOURCES / TRAVEL STATUS (if needed)
```

Each section may be collapsible.

Avoid large explanatory paragraphs in the live sidebar.

Long rules explanations belong in the Player Handbook / Rules Reference.

Developer explanations belong in Developer Tools.

This allows the sidebar to communicate current game state at a glance.

---

# 63. Header / Status Simplification

The header should continue to expose high-value state:

- location.
- time.
- light.
- travel state.
- referee connection state.

Remove accidental duplicate status items when discovered.

The header may also contain compact navigation buttons for:

```text
MAP
JOURNAL
RULES
SETTINGS
```

Keep these controls visually compact.

Do not allow the header itself to become another crowded sidebar.

---

# 64. Preserve Existing Functionality During UI Refactor

This is primarily a **presentation refactor**.

Do not change deterministic rules or campaign state merely to move interface components.

Preserve existing IDs or provide compatibility bridges where practical so that:

- current JavaScript handlers continue to work.
- save files remain compatible.
- current map-selection logic remains usable.
- Journal still opens.
- Handbook still opens.
- Rules options remain accessible.
- Developer tools remain accessible.
- combat/status/party rendering still updates correctly.
- mobile command input still works.
- keyboard Escape behavior for modal windows remains functional.

Perform the UI refactor in small checkpoints.

---

# 65. Recommended UI Refactor Checkpoints

Implement the UI change before or alongside graphical SVG mapping in the following order:

```text
UI-1
Move Situation/map panel from sidebar into main play workspace.
Keep existing ASCII rendering unchanged.

UI-2
Reduce sidebar to live play-state sections:
Party / Here / Combat.

UI-3
Move Journal / Handbook / Options / Developer controls
to compact toolbar buttons and existing modal/drawer views.

UI-4
Remove fixed mobile Situation overlay.
Use inline collapsible map panel on narrow screens.

UI-5
Validate desktop and mobile scrolling, command input,
Escape behavior, modal opening/closing, and live-state updates.

UI-6
Only then replace ASCII map rendering with the new SVG
wilderness/dungeon/combat visual system.
```

This ordering is deliberate.

First prove that the new workspace is functional using the current ASCII maps.

Then upgrade map graphics.

That separates layout bugs from cartography bugs.

---

# 66. UI Acceptance Criteria

Before the graphical mapping pass is considered complete, verify all of the following:

- The map never unintentionally obscures Party, Here, Combat, or command controls.
- On desktop, map and narrative can be viewed simultaneously.
- On mobile, the map is inline/collapsible rather than permanently floating over content.
- The map can be hidden without losing campaign state.
- The map can be expanded intentionally.
- Switching CURRENT / COMBAT / LOCAL / TOWN / WILDERNESS still works.
- Combat automatically changes the contextual view when AUTO is selected.
- Leaving combat restores the appropriate exploration view.
- Journal, Rules, Settings, and Developer Tools remain reachable.
- No existing deterministic rule behavior changes because of the UI refactor.
- No save-file migration is required solely because of layout.
- Keyboard and touch navigation remain functional.
- The command input remains available without covering unreadable content.
- The interface remains usable at narrow phone widths and normal desktop widths.

---

# 67. Updated Near-Term UI + Mapping Sequence

The near-term implementation order should now be:

```text
A. RAW-default initialization and migration safety
B. RAW weapon-affordance referee bridge
C. UI workspace refactor using existing ASCII maps
D. Move map out of sidebar
E. Simplify live sidebar
F. Fix narrow-screen/mobile map behavior
G. SVG map shell
H. Kai Besil graphical 1/2-mile hex renderer
I. Dungeon geometry schema
J. First graphical dungeon automap
K. Dungeon symbol key
L. Combat token overlay using existing x/y/z positions
M. Player-knowledge / fog validation
N. 8-mile Known World regional map
```

The UI refactor should be treated as a prerequisite to making the maps richer. Otherwise improved maps will make the current sidebar-overlap/crowding problem worse.

---

# 68. Map Zoom, Pan, Viewport Memory, and Semantic Detail

All graphical wilderness, dungeon, settlement, and combat maps should support **zoom and pan as standard presentation behavior**.

These controls are part of the cartography/UI layer only.

> **Moving the map viewport must never move the party, change game state, reveal hidden information, or alter deterministic positioning.**

The authoritative world/dungeon/combat coordinates remain unchanged. Zooming and panning only change what portion of the already-known map the player is currently looking at.

## 68.1 Required Desktop Map Controls

Support at minimum:

- mouse wheel / trackpad zoom.
- click-drag pan.
- `+` button for zoom in.
- `−` button for zoom out.
- **CENTER PARTY** to return the viewport to the current party / active encounter location.
- **FIT KNOWN MAP** to frame all currently player-known geometry.
- **RESET VIEW** to restore the appropriate default contextual viewport.

Where useful, also support:

- double-click / double-tap to zoom toward a point.
- keyboard zoom shortcuts while the map itself has focus.
- optional directional pan buttons as a non-drag accessibility fallback.

Do not let map keyboard shortcuts intercept normal typing in the command field.

## 68.2 Touch / Mobile Controls

On touch devices:

- one-finger drag pans inside the map.
- pinch gesture zooms the map where supported.
- explicit `+` / `−` controls must remain available.
- **CENTER PARTY** and **FIT KNOWN MAP** remain available without gestures.
- ordinary page scrolling outside the map must continue to work normally.

The map interaction area should not trap the entire mobile page.

## 68.3 Context-Specific Viewport Memory

Remember viewport state separately for different map contexts.

Examples:

```text
wilderness viewport
settlement viewport
dungeon L1 viewport
dungeon L2 viewport
specific major site viewport
combat viewport
```

If the player:

1. zooms out on the wilderness map,
2. enters a dungeon,
3. explores several rooms,
4. leaves the dungeon,

the wilderness map should return close to the zoom and pan position the player previously chose.

Viewport state is presentation state only and may be safely regenerated if missing.

It should not be required for campaign save compatibility, though it may optionally be persisted as user-interface preference data.

## 68.4 Automatic Contextual Framing

When entering a new map context for the first time, choose a useful initial view automatically.

Examples:

```text
wilderness
→ center on current party hex with several surrounding known hexes visible

new dungeon level
→ center on current known entrance / party location

combat begins
→ fit the current encounter area and all currently visible combatants

new settlement
→ fit currently known districts / locations
```

After the user manually pans or zooms, do not continually snap the viewport back to the party.

Only recenter automatically when:

- the player explicitly selects **CENTER PARTY**,
- the player switches to a previously unseen map context,
- an optional "follow party" mode is enabled,
- or the current party position moves completely outside the usable view and the selected behavior permits automatic following.

## 68.5 Optional Follow-Party Mode

A later convenience option may support:

```text
FOLLOW PARTY: ON / OFF
```

When ON, travel or movement may keep the current party marker roughly centered.

When OFF, the viewport stays where the player left it even as the party moves elsewhere.

This is a presentation preference and must not affect game mechanics.

## 68.6 Semantic Zoom

Use **semantic zoom** so map detail changes according to visible scale.

Do not merely make every label and symbol physically smaller while zooming out.

Instead, progressively simplify the display.

### Wilderness Example

```text
FAR ZOOM
- broad terrain
- coastlines
- major rivers
- major cities
- major roads
- national / regional boundaries where known

MEDIUM ZOOM
- towns and villages
- ruins
- castles
- secondary roads
- ordinary rivers
- important sites
- regional labels

NEAR ZOOM
- individual hex boundaries
- hex IDs if enabled
- local trails
- minor landmarks
- local sites
- detailed symbols
- party marker and nearby travel information
```

### Dungeon Example

```text
FAR ZOOM
- overall discovered room/corridor geometry
- current party position
- stairs / major transitions

MEDIUM ZOOM
- normal doors
- discovered secret doors
- room numbers / names where appropriate
- pits
- major furnishings / features

NEAR ZOOM
- detailed feature symbols
- individual combatants
- precise local labels
- discovered traps / interactable objects
```

### Combat Example

```text
FAR
- encounter boundary / room
- party and hostile groups

MEDIUM
- individual combatant markers
- doors / exits / cover / major obstacles

NEAR
- names or short labels
- elevation annotation where relevant
- engagement / range / status indicators
```

Semantic zoom must never reveal knowledge that the party has not acquired.

## 68.7 Zoom Limits

Every map context should define sensible minimum and maximum zoom levels.

Prevent:

- zooming so far out that the map becomes functionally unreadable.
- zooming so far in that rendering becomes meaningless or unstable.
- accidental infinite / zero scale values.
- panning so far away from known content that recovery becomes difficult.

Always keep **CENTER PARTY** and **FIT KNOWN MAP** available as recovery actions.

## 68.8 Rendering Architecture

Prefer a rendering model such as:

```text
AUTHORITATIVE COORDINATES
        ↓
PLAYER-KNOWLEDGE FILTER
        ↓
SVG MAP GEOMETRY
        ↓
VIEWPORT TRANSFORM
   pan / zoom / fit / center
        ↓
SEMANTIC DETAIL FILTER
        ↓
PLAYER DISPLAY
```

The viewport and semantic-detail layers must remain downstream from the knowledge filter.

This ensures that zooming cannot expose hidden rooms, undiscovered sites, secret doors, invisible creatures, or true wilderness position when RAW navigation uncertainty should conceal it.

## 68.9 SVG Implementation Guidance

For the initial graphical implementation, SVG remains the preferred map technology.

Possible approaches include:

- manipulating the root SVG `viewBox`.
- applying a transform to a top-level map `<g>` element.
- maintaining a small viewport-state object containing scale and translation.

Do not rebuild authoritative game geometry every time the user pans.

Map geometry should remain stable while the presentation transform changes.

## 68.10 Accessibility

Because drag/pinch gestures are not equally usable by all players, provide visible controls for all essential navigation operations.

At minimum:

```text
ZOOM IN
ZOOM OUT
CENTER PARTY
FIT KNOWN MAP
```

Buttons should have usable focus states and accessible labels.

## 68.11 Expanded Map View

The existing deliberate **EXPAND** map action should support the same viewport model.

Opening the expanded view should preferably preserve the current map center and zoom rather than resetting arbitrarily.

Closing the expanded view should return to the same contextual map without losing the player's normal viewport choice.

The normal docked map and expanded map are two views of the same map context, not separate copies of game state.

## 68.12 Acceptance Criteria

Verify:

- zoom works smoothly in wilderness maps.
- pan works without moving the party.
- dungeon geometry remains crisp while zoomed.
- combat markers remain aligned with authoritative coordinates.
- zooming cannot reveal hidden map content.
- semantic zoom hides and shows detail appropriately.
- CENTER PARTY works in wilderness, dungeon, and combat contexts.
- FIT KNOWN MAP frames only player-known content.
- viewport memory survives map-context switching.
- mobile touch interaction does not break normal page scrolling.
- no deterministic game-state changes occur because of map navigation.

---

# 69. User-Supplied Adventure Importer

The public/commercial game should eventually support **private user-supplied adventure and campaign material**.

Users may upload PDFs or other supported documents that they are entitled to use, and the service may analyze that material and convert it into the engine's structured campaign/adventure format for that user's private campaign.

This feature should be architected as an extension of the Adventure Compiler.

The system should not rely upon, unlock, compare against, or distribute the developer's private Mystara/module conversion library.

The public importer must operate only from:

- the user's own supplied source material.
- the public engine's generic rules/content libraries.
- the user's current campaign state.
- original or properly licensed/open reference content available to the commercial service.

The private Mystara corpus remains completely separate.

---

# 70. Hard Separation Between Private Mystara Content and Public User Imports

Maintain a strict content boundary:

```text
PRIVATE DEVELOPMENT / PERSONAL BUILD
- Mystara campaign database
- Gazetteers
- Atlas-derived campaign geography
- Threshold-derived additions
- private module conversions
- private canonical NPC/faction/location data

PUBLIC / COMMERCIAL SERVICE
- shared engine
- shared rules kernel
- cartography system
- adventure compiler
- procedural generation
- original commercial setting/content
- user-supplied private uploads
- user-specific adapted campaign content
```

The public service must **not**:

- unlock stored proprietary module conversions based on claimed ownership.
- expose private Mystara conversions to public users.
- search the developer's private content library to fill gaps in a user's upload.
- merge private Mystara text/maps/NPCs into public campaigns unless that exact material was supplied by that user and processed for that user's campaign.
- share one user's imported adventure with another user.
- expose uploaded copyrighted material through a public catalog.
- use a global "module library" of proprietary conversions as a commercial feature.

The engine code and schemas may be shared.

The copyrighted content payload must not be.

---

# 71. Default Import Behavior: Adapt to the User's Campaign

For the public service, the default import goal should be:

> **Integrate this user-supplied adventure into the user's current campaign while preserving its playable structure.**

The importer should not assume that every uploaded adventure must be run exactly as originally presented.

Instead, it should evaluate how the adventure fits the current campaign and propose adaptations where useful.

Possible adaptation categories include:

- geographic placement.
- settlement names.
- kingdom / nation references.
- factions.
- religions / gods.
- regional history.
- local cultures.
- travel distances.
- wilderness terrain.
- monster substitutions.
- rules-edition conversion.
- treasure / economy conversion.
- NPC hooks.
- campaign-specific rumors.
- links to existing NPCs/factions.
- local political context.
- adventure consequences.

The goal is to preserve the **adventure's functional structure** while making it feel as though it belongs in the user's campaign.

---

# 72. User Import Modes

The importer may eventually expose several conversion intentions.

Recommended modes:

```text
FAITHFUL CONVERSION
- preserve the source adventure as closely as practical
- convert only what is required for engine/rules compatibility

CAMPAIGN ADAPTATION
- preserve the adventure structure
- relocate/reskin names, factions, gods, geography, and hooks as needed
- integrate into the current campaign

RULESET CONVERSION
- preserve the adventure setting/content
- convert mechanics from the source edition/system into the active OSR rules profile

INSPIRED REBUILD
- use structural ideas from the user's source as inspiration
- generate a substantially new adventure suited to the current world
```

For the commercial product, **CAMPAIGN ADAPTATION** should be the recommended/default mode.

---

# 73. User-Supplied Import Pipeline

Preferred pipeline:

```text
USER UPLOAD
    ↓
Document extraction
    ↓
AI content analysis
    ↓
Identify adventure structure
    ↓
Build structured Adventure Package
    ↓
Detect unsupported mechanics/content
    ↓
Adapt to active rules profile
    ↓
Adapt to current campaign setting
    ↓
Mechanical validation
    ↓
Structural validation
    ↓
Map / geometry conversion
    ↓
User review of proposed changes
    ↓
Commit to user's private campaign
```

The original source document remains the basis for that user's conversion.

The system should clearly distinguish between:

- extracted source facts.
- conversion decisions.
- campaign adaptation choices.
- newly generated bridging content.

---

# 74. Importer Review Screen

Before committing a converted adventure, present a compact review summary.

Example:

```text
SOURCE
- 3 dungeon levels
- 74 keyed areas
- 5 factions
- 29 encounters
- 17 named NPCs
- 8 rumors
- 43 treasure entries

TARGET CAMPAIGN
- BECMI RAW
- Region: Greyfen Hills
- Existing faction: Ashen Hand
- Nearby settlement: Westbridge

PROPOSED ADAPTATION
- relocate adventure near Westbridge
- replace source kingdom references with Valmere
- connect cult activity to the Ashen Hand
- convert unsupported monsters to campaign equivalents
- preserve dungeon geometry
- preserve major encounter structure
```

The user should be able to:

- accept.
- edit.
- reject.
- request a lighter conversion.
- request a more aggressive adaptation.

---

# 75. Ruleset Conversion for Uploaded Adventures

The importer should support adventures written for different editions/systems.

Do not blindly translate numeric values.

Convert by role, danger, function, and encounter intent.

Examples:

```text
modern skill DC
→ old-school ability check / referee ruling / procedural resolution

modern encounter balance
→ old-school encounter difficulty / reaction / morale / retreat assumptions

unsupported monster
→ closest supported creature role or bounded new profile

modern treasure parcel
→ target rules-profile treasure/economy equivalent

modern travel procedure
→ active old-school wilderness procedure
```

A 5e adventure imported into a BECMI campaign should feel like a BECMI adventure after conversion, not like 5e mechanics wrapped in BECMI terminology.

---

# 76. Importer Content Isolation

Uploaded source material and converted campaign material should be private by default.

Recommended behavior:

- scoped to the user's campaign/account.
- inaccessible to unrelated users.
- not globally searchable.
- not reused as public adventure content.
- removable by the user.
- separated from public procedural-generation datasets/content stores.
- excluded from other users' generation context.

If technically practical and consistent with product requirements, allow the original uploaded document to be discarded after successful conversion while retaining only the structured private campaign representation.

The converted adventure should remain tied to that user's campaign rather than becoming a public reusable product asset.

---

# 77. Shared Capability vs Shared Content

The following may be shared globally across the service:

- Adventure Package schema.
- parser logic.
- document-layout extraction strategies.
- mechanical validators.
- rules-conversion algorithms.
- map conversion tools.
- monster-role mapping logic.
- campaign adaptation logic.
- generic importer heuristics.
- generic content-safety/consistency checks.

The following must not be treated as globally reusable public content merely because a user uploaded them:

- module text.
- maps.
- keyed descriptions.
- named NPCs.
- proprietary monsters/settings.
- proprietary artwork.
- converted proprietary adventure packages.
- user-specific adapted versions.

The product value should come from the **compiler/importer capability**, not from distributing stored copies of proprietary adventures.

---

# 78. Interaction With the Adventure Compiler

User-supplied imports, private Mystara modules, hand-authored adventures, and generated adventures should all compile into the same internal adventure representation.

Conceptually:

```text
PRIVATE MYSTARA MODULE
        │
USER-SUPPLIED MODULE
        │
HAND-AUTHORED ADVENTURE
        │
GENERATED ADVENTURE
        ↓
ADVENTURE COMPILER
        ↓
STANDARD ADVENTURE PACKAGE
        ↓
VALIDATION
        ↓
CAMPAIGN STATE
```

The engine should not care where the adventure came from once it has been validly compiled.

What must differ is **content provenance and access scope**.

---

# 79. Provenance for Imported User Content

Every imported adventure should retain internal provenance metadata.

Example:

```text
sourceType: user_upload
sourceDocument: private
conversionMode: campaign_adaptation
targetRulesProfile: BECMI
targetSetting: user_campaign
importedAt: timestamp
```

The system should also distinguish:

```text
SOURCE-DERIVED FACT
ADAPTED FACT
ENGINE-GENERATED BRIDGE
USER-EDITED FACT
```

This will make debugging, re-importing, auditing, and later campaign migration much easier.

---

# 80. Re-Import and Update Behavior

If a user uploads a revised edition or wants to reconvert an adventure, do not blindly overwrite a campaign already in progress.

Offer:

```text
REPLACE UNPLAYED CONTENT
MERGE SAFE CHANGES
CREATE NEW VERSION
KEEP CURRENT CAMPAIGN VERSION
```

Played rooms, dead NPCs, discovered secrets, and campaign consequences should not be silently reset.

Once an imported adventure has entered active campaign history, **campaign state becomes authoritative over the source document**.

---

# 81. Public Product Principle for User Content

The guiding rule for the commercial importer is:

> **The public service provides a private adaptation engine, not a proprietary adventure library.**

The user brings the source.

The service:

- analyzes it.
- structures it.
- converts mechanics.
- adapts it to the campaign.
- validates it.
- runs it.

The developer's private Mystara corpus is not involved.

---

# 82. Updated Long-Term Content Model

The project now has three distinct content origins operating through one engine:

```text
1. PRIVATE CANONICAL REFERENCE CONTENT
   - personal Mystara campaign
   - Gazetteers / modules / Threshold / Atlas
   - not part of commercial public content

2. ORIGINAL COMMERCIAL CONTENT
   - original worlds
   - procedural worlds
   - original adventures
   - open/licensed/original monsters and setting material

3. USER-SUPPLIED PRIVATE CONTENT
   - uploaded by user
   - adapted only for that user's campaign
   - never unlocked from the developer's private library
```

All three should use the same:

- rules engine.
- cartography.
- agency system.
- referee interface.
- adventure compiler.
- validation.
- persistence model.

But access and provenance remain separate.

---

# 83. Updated Immediate Architectural Requirement

When designing the Adventure Compiler and content loaders, include provenance/scope from the beginning.

Every content package should eventually know:

```text
contentScope:
- private_dev
- public_original
- user_private

contentOrigin:
- canonical_reference
- original_generated
- original_authored
- user_upload
```

Do not let the engine's long-term content model assume that all loaded adventures belong to one globally shareable library.

---

# 84. Spatial Presentation Model: Party Scale vs Individual Scale

The cartography system should no longer be conceptualized primarily as separate **wilderness**, **dungeon**, and **combat** map modes.

Those are environments and rules contexts, not the fundamental spatial scales.

The preferred spatial model is:

```text
PARTY SCALE
    ↕
INDIVIDUAL SCALE
```

This section supersedes any earlier instruction that implies combat should require a visually separate battle map or separate combat-rendering mode.

The central rule is:

> **Use Party Scale when the party is traversing space at a resolution where the exact positions of individual characters do not materially matter. Use Individual Scale whenever the relative positions of actors, objects, hazards, light sources, terrain, or points of interest become meaningful.**

Combat is not a separate visual mode.

Combat is an event that may occur naturally inside an Individual Scale scene.

---

# 85. Party Scale

Party Scale represents the adventuring group as a single marker when traversing large geographic distances.

Examples include:

- 24-mile strategic hexes where used.
- 8-mile campaign hexes.
- 1/2-mile local wilderness hexes.
- 1/4-mile or other local travel hexes where used.
- long road travel.
- overland travel.
- sea travel.
- broad settlement/region movement when individual positions do not matter.

The engine still tracks the individual characters, marching order, movement rates, mounts, encumbrance, light supplies, watches, and other party information.

The map does not need to display every character while those individual positions are irrelevant.

Typical representation:

```text
⬡ ⬡ ⬡ ⬡
 ⬡ ⬡ ▲ ⬡
⬡ ⬡ ⬡ ⬡

▲ = party
```

Party Scale is primarily a travel/navigation representation.

---

# 86. Individual Scale

Individual Scale is used whenever local spatial relationships matter.

Applicable environments include:

- dungeons.
- caves.
- buildings.
- camps.
- ruins.
- ship decks.
- village streets.
- forests and wilderness clearings.
- ambush locations.
- roadblocks.
- encounter sites.
- investigation scenes.
- interiors.
- combat scenes.

Individual Scale should display, subject to character knowledge and visibility:

- individual player characters.
- autonomous party members.
- visible NPCs.
- visible monsters.
- doors.
- walls.
- corridors.
- stairs.
- pits.
- statues.
- altars.
- chests.
- furniture.
- trees.
- brush.
- rocks.
- tents.
- fires.
- streams.
- terrain boundaries.
- other immediately relevant objects and features.

The scene remains the same whether the characters are exploring, talking, searching, fleeing, or fighting.

---

# 87. Combat Must Be Seamless With Exploration

Do not create a separate visual "battle mode" resembling a JRPG encounter transition or a modern tactical-VTT combat board.

Example:

```text
INDIVIDUAL SCALE
- party enters room
- thief examines chest
- cleric studies altar
- fighter watches doorway
- monster becomes perceptible
- surprise/reaction procedure occurs
- characters may parley, evade, retreat, or fight
- same map and same positions remain in use
```

No screen wipe.

No repositioning characters into an arbitrary combat formation.

No separate battle arena.

No replacement of exploration geometry.

If combat procedures begin, the renderer may add temporary overlays such as:

- engagement indicators.
- target markers.
- spell areas.
- ranges.
- movement paths.
- conditions.

When combat ends, remove those overlays.

The room, terrain, actors, and positions remain continuous.

---

# 88. Scale Changes Are Contextual, Not Combat-Triggered

A transition from Party Scale to Individual Scale occurs when local spatial resolution becomes useful.

Examples:

```text
traveling through 8-mile wilderness hexes
→ PARTY SCALE

encounter occurs and local distance/terrain matters
→ INDIVIDUAL SCALE

encounter resolves and journey resumes
→ PARTY SCALE

exploring dungeon
→ INDIVIDUAL SCALE

moving through a town between distant known locations
→ PARTY / ABSTRACT LOCAL SCALE where appropriate

entering tavern, alley, shrine, camp, or other local scene
→ INDIVIDUAL SCALE
```

A wilderness encounter therefore does not start a "battle map."

It instantiates a local scene representing the actual encounter environment.

Example pipeline:

```text
Party traveling
    ↓
Encounter check
    ↓
Determine encounter distance / terrain / circumstances
    ↓
Instantiate local Individual Scale scene
    ↓
Place party according to marching order and actual approach
    ↓
Place only currently perceivable encountered actors/features
    ↓
Resolve surprise / reaction / conversation / evasion / combat
    ↓
Resolve scene
    ↓
Return to Party Scale when local positioning no longer matters
```

The switch to Individual Scale must not itself reveal concealed enemies or information the party has not perceived.

---

# 89. Intent-Driven Movement Instead of Token Micromanagement

Individual Scale must **not** turn the game into a strategy RPG in which the user drags every character from square to square.

The player should normally issue instructions in tabletop language.

Examples:

```text
"We go through the doorway and continue north."

"Everyone move down the hall."

"Mira checks the statue while Aldric guards the door."

"The thief searches the eastern wall. Everyone else keeps watch."

"Stay together."

"Regroup and continue."
```

The engine translates these intentions into actor movement.

The displayed individual positions are usually the **result** of instructions rather than the primary input mechanism.

This is essential to keeping old-school play fast.

---

# 90. Default Marching Order and Formation

The party should maintain a persistent default marching order / formation.

Example:

```text
FRONT
Aldric    Dwarf

MIDDLE
Cleric    Magic-User

REAR
Thief     Elf
```

The exact structure may include:

- rank.
- sequence.
- preferred spacing.
- front guard.
- rear guard.
- scout.
- light bearer.
- protected character.
- missile position.
- other role metadata.

When the player gives a group movement command, the engine should automatically move the party while preserving that formation as closely as the environment permits.

Environmental geometry may alter it naturally:

```text
wide chamber
→ party may move two or more abreast

10-foot corridor
→ normal paired ranks where appropriate

5-foot passage
→ single file

narrow bridge
→ constrained file

doorway
→ ranks pass through in plausible order
```

The player should not need to move each token individually.

---

# 91. Formation Movement, Task Movement, and Explicit Positioning

Individual Scale should support three levels of movement abstraction.

## Formation Movement

Example:

> "We head down the corridor."

The engine:

- moves the whole group.
- follows the navigable path.
- preserves marching order.
- preserves sensible spacing.
- respects walls/doors/terrain.
- updates light positions.
- updates visibility.

## Task Movement

Example:

> "Elwyn checks the northern wall while Garret examines the chest."

The engine:

- identifies the relevant wall and chest.
- moves Elwyn to a sensible search position.
- moves Garret beside the chest.
- leaves or autonomously positions other characters according to their current roles/instructions.
- updates visibility and scene state.

## Explicit Relative Positioning

Used only when precise placement matters to the player.

Examples:

> "Aldric stands between the wizard and the doorway."

> "Stay ten feet behind the fighter."

> "Keep the cleric close enough that everyone remains in lantern light."

The engine resolves these as continuous spatial relationships.

The player does not need to select arbitrary destination squares.

---

# 92. Automatic Regrouping

When a localized task ends and the party resumes travel, characters should normally return to their stored marching order automatically.

Typical loop:

```text
MARCHING ORDER
    ↓
group movement
    ↓
local scene
    ↓
characters split for tasks
    ↓
scene resolves
    ↓
REGROUP
    ↓
restore marching order
    ↓
group movement
```

Support an explicit command such as:

```text
regroup
```

but allow regrouping to occur implicitly when the player clearly resumes group travel.

Do not silently regroup if the user has explicitly ordered someone to remain behind, scout ahead, guard a location, or otherwise stay separated.

---

# 93. Autonomous Character Spatial Behavior

Autonomous or partially autonomous party members should use the same movement system.

When the user does not specify every character's task, the engine may choose reasonable positions based on:

- class/role.
- personality.
- current goals.
- marching-order role.
- perceived danger.
- current light sources.
- nearby exits.
- task assignments.
- tactical preferences.
- social context.
- character knowledge.

Examples:

- fighter covers the most dangerous entrance.
- thief moves toward a suspicious mechanism.
- cleric approaches an altar.
- magic-user remains somewhat protected.
- rear guard watches the corridor behind.
- lantern bearer chooses a position that keeps companions illuminated.

These behaviors should remain interruptible.

The player may issue instructions such as:

> "Everyone stay together."

> "Aldric, go with the thief."

> "Don't open that yet."

This supports single-character control and spectator/director modes without requiring manual management of every companion.

---

# 94. Continuous Coordinates: The Grid Is a Ruler, Not the Rules

Individual Scale maps may display a square grid because it provides familiar old-school scale and an immediate distance reference.

However:

> **The grid has no authority over actor placement, actor movement, range, reach, interaction, line of sight, or scene geometry.**

Actors must not be constrained to:

- square centers.
- grid intersections.
- five-foot movement increments.
- ten-foot movement increments.
- discrete tile occupancy.

The deterministic engine should use continuous world coordinates.

Conceptually:

```text
Aldric:
x = 18.4 ft
y = 11.7 ft
z = 0 ft

Mariel:
x = 22.1 ft
y = 13.0 ft
z = 0 ft

Goblin:
x = 27.8 ft
y = 10.9 ft
z = 0 ft
```

The visible grid is a presentation/reference layer only.

This permits:

- curved caves.
- diagonal roads.
- circular towers.
- irregular walls.
- natural terrain.
- characters standing between grid lines.
- natural formation spacing.
- actual-foot missile ranges.
- actual-foot spell areas.
- continuous light radii.
- natural reach/engagement distances.

The engine determines spatial relationships.

The grid helps the human understand them.

---

# 95. Grid Presentation Rules

At Individual Scale:

- default to a subtle old-school square grid where useful.
- commonly use 10-foot reference squares for classic dungeon mapping where appropriate.
- allow 5-foot or other reference spacing where a source/adventure requires it.
- do not make grid lines visually dominant.
- allow the grid to fade or disappear at certain semantic zoom levels.
- do not snap actors or objects to the grid merely because it is displayed.
- do not convert RAW distances into "number of squares" internally.

The map should feel like a classic module map with a scale reference, not like a tile-based tactical board.

---

# 96. Light Sources, Position, and Visibility

Individual positions become mechanically significant because light belongs to **actors and objects**, not to the party as an abstract whole.

Track light sources spatially.

Examples:

```text
Fighter:
torch
radius / duration according to active rules

Cleric:
lantern
radius / duration according to active rules

Thief:
no light
```

If the party remains together, illumination overlaps.

If characters separate, visibility may separate with them.

Example:

```text
Fighter [torch]        Cleric [lantern]
      \                    /
       \ illuminated area /
        \                /

                 distant side passage

                      Thief
                   [no light]
```

The engine should account for:

- distance from light source.
- walls.
- closed doors.
- corners.
- major opaque objects.
- elevation where relevant.
- source radius.
- current source duration/state.
- character-specific vision rules where applicable.

This should affect what each character can perceive.

---

# 97. Character Knowledge and Split-Party Visibility

Visibility and knowledge should be character-specific where practical.

Conceptually:

```text
TRUE LOCAL SCENE
      ↓
per-character line of sight + illumination + perception
      ↓
CHARACTER KNOWLEDGE
      ↓
shared/player-visible presentation according to campaign/control mode
```

A character around a corner may not know what another character can see.

A scout moving beyond lantern light may have limited visibility.

A character remaining behind may not witness an encounter farther down the corridor.

Autonomous characters must not act on information they cannot perceive.

The renderer should never reveal hidden creatures/features merely because their coordinates exist in authoritative state.

---

# 98. Old-School Cartographic Art Direction

The map renderer should adopt a deliberately restrained visual identity inspired by classic hand-drawn tabletop maps.

The objective is not photorealism and not modern VTT spectacle.

The objective is:

> **clear spatial information that looks like a very good old-school referee/module map.**

Avoid:

- glossy digital battlemaps.
- highly saturated fantasy terrain.
- photoreal textures.
- elaborate miniature art.
- glowing game markers.
- excessive particle effects.
- animated tactical-board spectacle.
- visual treatments that replace imagination rather than support it.

Prefer:

- ink-like lines.
- graph-paper conventions.
- sparse hatching.
- stippling.
- simple symbols.
- readable map lettering.
- restrained fills.
- simple counters/tokens.
- clean negative space.

---

# 99. Party Scale Visual Style: Muted Cartographic Color

Party Scale wilderness/regional maps may use color because color improves terrain recognition.

Use a subdued printed-atlas palette.

Examples:

```text
forest      → muted green
grassland   → pale green
hills       → ochre / tan
mountains   → subdued brown
swamp       → green-gray
water       → restrained blue
roads       → dark neutral
borders     → muted contrast
```

Color should communicate terrain and geography rather than create spectacle.

Prefer the feel of a classic Gazetteer/atlas map rather than a modern videogame overworld.

Party Scale should support simple symbols for:

- towns.
- cities.
- castles.
- keeps.
- ruins.
- towers.
- dungeons.
- ports.
- roads.
- rivers.
- trails.
- borders.
- other known sites.

---

# 100. Individual Scale Visual Style: Monochrome Pen-and-Ink

Individual Scale should default to primarily black-and-white or grayscale.

The desired style is:

- old module map.
- graph-paper dungeon.
- referee sketch.
- hand-inked cave map.
- restrained Dyson-style line-map sensibility without copying any particular artist's protected expression.

Use:

- off-white / paper-like background where appropriate.
- black or near-black wall lines.
- faint gray grid.
- sparse hatching.
- stippling.
- simple contour lines.
- minimal grayscale fills.
- small monochrome object symbols.

This applies equally to:

- dungeons.
- caves.
- camps.
- ruins.
- outdoor encounter scenes.
- interiors.
- streets.
- ship decks.

There should be no separate "combat art style."

---

# 101. Procedural Pen-and-Ink Rendering

The engine should create the hand-drawn feeling procedurally from deterministic geometry.

Recommended techniques include:

## Deterministic Geometric Jitter

Break otherwise-perfect SVG lines into slightly irregular segments.

Use seeded jitter derived from stable feature IDs.

Example concept:

```text
ROOM12_NORTH_WALL
→ stable seed
→ subtle path variation
→ always renders identically
```

The visual irregularity must not alter collision geometry or authoritative coordinates.

Render geometry and simulation geometry remain separate.

## Hatching

Create reusable SVG patterns/symbols for:

- stone wall edges.
- cave walls.
- cliffs.
- rubble.
- water.
- swamp.
- vegetation.
- depressions.
- natural rock.
- other old-school map conventions.

## Stippling

Use sparingly for:

- ground texture.
- water/shore differentiation.
- rough terrain.
- rubble.
- environmental boundaries.

Avoid excessive procedural noise that harms readability.

---

# 102. Cartographic Symbol Library

Build a reusable deterministic SVG symbol library.

Examples:

```text
door
double door
secret door
stairs
spiral stairs
ladder
pit
trap
statue
altar
dais
well
fountain
pillar
chest
table
bed
fireplace
curtain
window
railing
rubble
stream
pool
tree
boulder
tent
campfire
bridge
natural chimney
cave opening
```

Symbols should be:

- monochrome at Individual Scale.
- visually simple.
- readable at multiple zoom levels.
- anchored to actual world coordinates.
- independent from game logic.

An altar should not be merely a decorative icon.

It is a spatial object the engine knows exists at a particular position.

---

# 103. Actor Token Style

Actor markers should remain substantially simpler than environmental scenery.

Avoid detailed miniature/token artwork as the default.

Preferred progression:

```text
simple circle / counter
    ↓
initials / short labels
    ↓
optional tiny monochrome silhouettes
```

Example:

```text
PC:
○
AL

Enemy:
●
G1
```

Use modest visual distinction between:

- player characters.
- allied NPCs.
- neutral actors.
- hostile actors.
- uncertain/partially perceived actors where appropriate.

Do not let faction coloring turn the monochrome map into a brightly colored tactical board.

---

# 104. The Map Is Data, Not an AI-Generated Picture

AI may author or interpret scene meaning.

AI should not generate the authoritative gameplay map as a raster illustration.

Preferred pipeline:

```text
AI / authored adventure:
"Ruined shrine in a forest clearing.
Collapsed northern wall.
Stone altar near center.
Two large trees through southern wall."

        ↓

STRUCTURED SCENE DATA

        ↓

VALIDATED GEOMETRY

        ↓

DETERMINISTIC SVG RENDERER
```

This is necessary for:

- persistence.
- collision.
- pathing.
- light.
- line of sight.
- hidden information.
- zoom.
- pan.
- actor positioning.
- encounter distances.
- reproducibility.
- saved campaigns.

Decorative AI art may exist separately in the future, but it must never become authoritative map state.

---

# 105. Local Scene Generation for Wilderness Encounters

When Party Scale travel requires Individual Scale, generate or load a bounded local scene from deterministic/contextual facts.

Input may include:

```text
terrain
road/trail presence
river/stream presence
weather
time of day
party approach direction
marching order
encounter distance
nearby known site
vegetation density
elevation/slope
```

Then instantiate scene geometry.

Example:

```text
forest terrain
road east-west
party traveling east
encounter distance 80 ft
dense trees north
rock outcrop south
```

The resulting scene becomes an Individual Scale environment.

Place the party according to its actual marching order and direction of travel.

Do not simply scatter characters into aesthetically convenient positions.

---

# 106. Individual Scale Scene Persistence

Not every local scene needs permanent world storage.

Distinguish between:

```text
PERSISTENT LOCAL SCENE
- dungeon
- building
- camp
- ruin
- important wilderness site
- settlement interior
- recurring location

EPHEMERAL LOCAL SCENE
- ordinary roadside encounter
- transient wilderness encounter
- temporary rest location
```

An ephemeral scene may be discarded when it no longer matters, unless an event gives it lasting importance.

Examples that may promote an ephemeral scene into persistent state:

- treasure buried there.
- NPC left behind.
- structure damaged.
- camp established.
- monster lair discovered.
- character killed and body remains.
- landmark created.
- player marks the location.

---

# 107. Updated Renderer Architecture

The preferred cartographic pipeline is now:

```text
AUTHORITATIVE WORLD / LOCAL GEOMETRY
            ↓
AUTHORITATIVE ACTOR POSITIONS
            ↓
PER-CHARACTER KNOWLEDGE / VISIBILITY
            ↓
SCALE SELECTION
   PARTY or INDIVIDUAL
            ↓
CARTOGRAPHIC SYMBOLIZATION
            ↓
OLD-SCHOOL STYLE LAYER
            ↓
VIEWPORT
 zoom / pan / fit / center
            ↓
SEMANTIC ZOOM
            ↓
PLAYER DISPLAY
```

Rules resolution never reads truth back from SVG.

SVG is a display of authoritative state.

---

# 108. Revised Cartography Implementation Sequence — Extend Existing Systems, Do Not Rebuild Them

The current build already contains several foundations that this design originally described as future work. The next architectural sequence should therefore **extend and generalize existing systems rather than creating parallel replacements**.

Do not interrupt a currently active bounded BECM source-completion checkpoint with a large UI/cartography rewrite. Finish and validate the bounded checkpoint first. Then proceed with the architecture work in similarly small checkpoints.

Recommended sequence:

```text
SOURCE-COMPLETION TRACK
1. Continue from the latest audit's explicit bounded next checkpoint.
2. Preserve the small-checkpoint + full-regression discipline.
3. Complete the remaining mortal BECM closure work and final source-compliance audit.

ARCHITECTURE / PRESENTATION TRACK
4. Correct new-campaign RAW defaults without altering existing saved choices.
5. Refactor the UI workspace while keeping current ASCII maps operational.
6. Move the normal map out of the crowded sidebar.
7. Formalize Party Scale vs Individual Scale as the renderer's primary scale model.
8. GENERALIZE the existing combat x/y/z coordinate layer into persistent local-scene coordinates.
9. EXTEND the existing persistent partyGroups/front/rear/group-movement system into marching-order and local formation behavior.
10. Add task movement, automatic regrouping, and local scene movement paths.
11. Migrate current party-global visibility toward actor-specific light/line-of-sight while preserving RAW visibility behavior.
12. Build Party Scale SVG on top of the existing authoritative hex data.
13. Add a real dungeon/local geometry schema; do not infer geometry from the current generic ASCII rectangle.
14. Build Individual Scale monochrome SVG from local geometry and continuous actor coordinates.
15. Add old-school symbol, hatching, stippling, and simple actor-counter libraries.
16. Add zoom / pan / viewport memory / semantic zoom.
17. Represent non-creature spatial hazards and local objects in the same scene model.
18. Generate the first wilderness encounter local scene from terrain + approach + encounter-distance state.
19. Make combat an overlay/rules state within that same Individual Scale scene rather than a separate visual map.
20. Add character-specific knowledge/fog and split-party visibility.
21. Generalize hard-coded Kai Besil/Smoking Pillar UI/referee assumptions into setting/adventure package data.
```

Do not attempt high-fidelity graphics before spatial state, visibility, formation movement, and knowledge filtering are validated.

---

# 109. Spatial and Visual Acceptance Criteria

The updated cartography/spatial system should eventually satisfy all of the following:

- Party Scale shows one party marker during broad travel.
- Individual Scale shows individual actors when their positions matter.
- combat does not trigger a separate battle-screen transition.
- characters retain their actual exploration positions when an encounter becomes hostile.
- group movement does not require moving individual tokens manually.
- stored marching order automatically controls ordinary group movement.
- corridor width and environmental geometry naturally alter formation.
- task instructions move relevant characters to sensible local positions.
- characters regroup automatically when appropriate.
- explicit separation orders are respected.
- actor positions use continuous coordinates.
- the visible grid does not constrain movement or placement.
- curved/irregular geometry works normally.
- ranges and light are measured from real coordinates rather than squares.
- light sources travel with their carriers.
- split characters may have different visibility.
- hidden actors/features remain hidden until perceived.
- wilderness maps use restrained terrain color.
- Individual Scale maps are primarily monochrome pen-and-ink.
- actor tokens remain simple and schematic.
- environmental objects are spatially meaningful rather than decorative.
- map pan/zoom never changes authoritative state.
- zoom never reveals unknown information.
- the whole system remains fast enough that individual positioning improves clarity without creating tactical micromanagement.

---

# 110. Build 0.4.223 Synchronization Addendum

This section records implementation facts discovered in the actual v0.4.223 source that materially affect the long-term plan.

Where this section is more specific than an earlier architectural statement, this section governs implementation.

---

# 111. RAW Default Migration Is Still Outstanding in the Actual Source

Although the UI already exposes a working `BECM RAW PROCEDURES` profile and the deterministic regression suite verifies profile switching, **new campaign state is not yet initialized to the desired RAW defaults**.

The current `initialState()` initializes:

```text
weaponDamageMode = MATRIX
weaponAudit = true
initiativeMode = PHASED
gettingLostMode = RAW
spellResolutionMode = RAW_STRICT
developerMode = true
weaponMastery = false
```

The current rule-normalization fallback also restores `MATRIX` and `PHASED` if those fields are missing/invalid.

This conflicts with the project's newer design decision:

> **New campaigns should default to BECMI RAW procedures; house/experimental systems remain opt-in.**

Implement this as a bounded migration checkpoint.

Target ordinary new-campaign defaults:

```text
weaponDamageMode = RAW
weaponAudit = false
initiativeMode = RAW
gettingLostMode = RAW
spellResolutionMode = RAW_STRICT
weaponMastery = false
developerMode = false
```

Keep the other BECM feature switches at their source-appropriate/default project settings unless separately reviewed.

### Save compatibility rule

Do **not** silently convert existing saved campaigns that already contain explicit rule choices.

The migration should distinguish:

```text
new campaign / genuinely absent old field
→ receive current default

existing save with explicit stored setting
→ preserve stored setting
```

Add regressions that prove:

- a new campaign starts under BECM RAW procedures;
- existing MATRIX/PHASED/LOST_TIME saves retain those choices;
- RAW/house profile buttons still work;
- Weapon Mastery remains independently selectable;
- developer test fixtures may explicitly enable developer mode or alternate procedures without changing production defaults.

Do not combine this migration with DMR2 Ghostly Horde or another source-rule checkpoint.

---

# 112. Existing Party Formation State Must Be Reused

The current engine already has persistent `state.partyGroups`.

Those records:

- survive rounds and saves;
- represent movement/formation groups rather than new game entities;
- keep `memberNames`;
- keep canonical `frontMemberNames` and `rearMemberNames`;
- migrate older SCREEN/PROTECTED save data into FRONT/REAR;
- ensure one PC belongs to one movement/formation group at a time;
- support group movement semantics through `movementMode:'together'`;
- already appear in combat maps and referee context.

Therefore:

> **Do not create a second unrelated marching-order subsystem.**

Instead, evolve `state.partyGroups` into the generalized formation/marching structure.

It may gain additional optional fields such as:

```text
marchingRanks
sequence
preferredSpacingFeet
frontGuard
rearGuard
lightBearer
scout
protectedMembers
formationTemplate
regroupPolicy
```

but existing membership/front/rear semantics and save compatibility should remain intact.

The current FRONT/REAR combat exposure rule is not automatically identical to corridor marching rank. Keep those concepts distinguishable even if stored on the same formation object.

---

# 113. Existing Combat x/y/z Must Become the Seed of Local Scene Coordinates

The current combat system already tracks continuous 3D vectors for PCs and monsters:

```text
{x, y, z}
```

through the existing combat spatial-state helpers.

This is a major implementation advantage.

Do **not** build an unrelated second combat-coordinate system for the graphical maps.

Instead, generalize the coordinate concept so that actors may have a persistent **local-scene position even when combat is not active**.

A possible conceptual migration is:

```text
localScene.positions3d
  pcs
  npcs
  monsters
  objects
  hazards
```

with the existing combat helpers eventually reading/writing the same authoritative local positions while an encounter/combat is active.

Combat-specific order state can remain under `state.combat`.

Spatial truth should increasingly live with the local scene.

Migration must preserve current combat saves and existing vector-based spell/range/Influence-Sphere logic.

---

# 114. Combat Renderer Must Become an Overlay, Not a Separate Scene

The current `currentAsciiMap()` / AUTO view explicitly switches to `renderCombatAsciiMap()` whenever combat is active.

That is correct for the existing ASCII implementation but conflicts with the newer seamless Individual Scale design.

Long-term behavior should become:

```text
INDIVIDUAL SCENE
walls / terrain / doors / objects / PCs / NPCs / visible creatures
        +
COMBAT STATE WHEN ACTIVE
initiative / engagement / targets / spell areas / conditions
```

rather than:

```text
dungeon map
→ combat begins
→ replace dungeon map with unrelated combat map
```

During migration, `COMBAT` may remain as a compatibility/debug tab.

Eventually it should mean:

> **show the current Individual Scale scene with combat overlays emphasized**

rather than instantiate a different battlefield.

Characters must retain the positions they occupied immediately before hostility began.

No automatic combat reset/reformation should occur unless the actual encounter rules or fictional circumstances require movement.

---

# 115. Current Map Data Is Uneven — Preserve What Is Real, Replace What Is Schematic

The existing map system has three different levels of maturity.

### Wilderness

`renderWildernessAsciiMap()` already consumes real axial hex state, current/neighbor hex data, roads, water directions, temporary trails, known sites, and the party's believed direction when lost.

This is valuable authoritative cartographic state.

The Party Scale SVG renderer should consume the same data rather than replacing it.

### Settlement

`renderSettlementAsciiMap()` is primarily a **known-place list plus settlement profile**, not true settlement geometry.

Do not mistake it for a mapped settlement layout.

Settlement cartography will require explicit coordinates/topology or pointcrawl geometry later.

### Dungeon / room

`renderRoomAsciiMap()` currently draws a generic fixed rectangle based on exits.

`roomFeatureFor()` currently returns no real feature geometry.

Therefore the current room graphic is an orientation sketch, not authoritative room dimensions.

Do not reverse-engineer precise dungeon geometry from that ASCII rectangle.

Add explicit geometry to adventure/site records and render from that.

### ASCII compatibility

Keep the current ASCII maps as:

- fallback.
- debug representation.
- regression aid.
- low-complexity accessibility option where useful.

The new SVG renderer should be an additional presentation layer over the same authoritative state.

---

# 116. Visibility Is Currently Party-Global and Must Be Migrated Carefully

The current `canSee()` logic evaluates visibility for the party as a whole.

It already correctly recognizes important BECM/project visibility inputs such as:

- darkness.
- Continual Darkness.
- ordinary/magical Darkness.
- artifact/magical Light.
- torch.
- lantern.
- incandescent incense.
- infravision.
- local fixed light.

The new Individual Scale design requires a more granular layer:

```text
visibilityFor(character, scene)
```

based on:

- that character's position.
- light sources at actual positions.
- walls/doors/opaque obstacles.
- spell and artifact effects.
- infravision/other senses.
- current character knowledge.

Do not remove the existing party-global path in one rewrite.

Use it as a compatibility layer until actor-specific visibility is validated.

Eventually derive the shared player presentation from individual knowledge according to control mode.

A character who moves around a corner with the lantern should not illuminate characters left behind merely because the party possesses a lantern somewhere.

---

# 117. Source-Defined Spatial Hazards Are First-Class Scene Objects

v0.4.223 now stores Grab Grass in `state.wildernessHazards`, separately from ordinary monsters.

This establishes an important architectural precedent:

> **Not every spatial threat is an actor or combatant.**

The future Individual Scale scene should be able to contain:

```text
actors
objects
terrain
area hazards
persistent spell areas
illusions/effects
doors/barriers
light sources
```

Grab Grass should eventually render as an area hazard occupying real local geometry.

Its source-defined **5-foot-square** durability is a property of the hazard procedure.

It does **not** mean actors must snap to a five-foot tactical grid.

Continuous actor coordinates remain authoritative.

Likewise, Strangle Vine's source-defined per-area body/durability and other unusual terrain-like threats should fit the same scene-object model rather than being forced into ordinary monster tokens.

The next planned Ghostly Horde procedure reinforces the need for per-character effects/illusions that also should not be represented as a fixed army of monster tokens.

---

# 118. Encounter-Table Provenance and Module Cadence Must Remain Separate

The DMR2 implementation now has broad wilderness table coverage and explicit construction bridges, but the current audit deliberately preserves this boundary:

```text
DMR2 reference/construction
≠
automatic Kai Besil encounter cadence
```

DMR2 construction does not automatically replace the Smoking Pillar/Kai Besil encounter procedure.

Preserve this principle when the world architecture becomes generic.

Each region/adventure should declare its active encounter policy.

Conceptually:

```text
regionEncounterPolicy
adventureEncounterOverride
terrainReferenceTables
specialEventTables
```

A content package may use:

- its own module table;
- a regional table;
- DMR2/reference tables;
- generated ecosystem tables;
- layered rules.

Do not globally activate one encounter source merely because it exists in the engine.

---

# 119. Remove Hard-Coded Setting Assumptions Incrementally

The current v0.4.223 UI/referee layer still contains hard-coded assumptions such as:

- Situation breadcrumb choosing between `KAI BESIL` and `KARAMEIKOS`;
- keyed-site context printing `Region: Kai Besil`;
- AI referee prompt assigning `regionName='Kai Besil'`;
- Smoking Pillar-specific wording in several UI/help surfaces.

These are acceptable in the current reference implementation but cannot remain in the generic engine.

When touching the related code, migrate toward data-driven accessors such as:

```text
currentSetting()
currentRegion()
currentAdventure()
currentLocation()
currentEncounterPolicy()
```

Do not perform a giant search-and-replace.

Move one bounded surface at a time and keep Kai Besil behavior identical through data.

Eventually:

```text
Mystara personal campaign
original commercial campaign
user-private imported campaign
```

must all pass their setting/region names and policies through the same interface.

---

# 120. Current `autoPcOrders()` Is Not the Future Autonomous-Character System

The current combat `autoPcOrders()` is a convenience filler.

It selects basic missile/spell/melee orders for PCs missing an order.

Preserve it as a useful combat convenience, but do not treat it as the implementation of the future Agency layer.

Future autonomous characters require persistent:

- personality.
- goals.
- knowledge.
- relationships.
- risk tolerance.
- exploration/task behavior.
- formation behavior.
- social decision making.
- memory.
- control handoff.

The future agency system may call the same deterministic order setters, but it should sit above them.

---

# 121. Updated Work Conversation Starting Rule

When the next Work conversation receives v0.4.223 plus this handoff, it should begin by doing the following:

```text
1. Verify APP_VERSION and audit build agree at 0.4.223.
2. Run/confirm the current production validation baseline before editing.
3. Read the TOPMOST audit checkpoint first.
4. Continue the explicit v0.4.224 Ghostly Horde bounded checkpoint unless the user has explicitly redirected priorities.
5. Return an updated index.html and audit.md after the bounded checkpoint.
6. Keep source-completion work separate from RAW-default/UI/cartography architecture checkpoints.
7. After the bounded BECM work selected for that session is complete, use the synchronized architecture sections above rather than rebuilding already-existing groups/x-y-z/map state from scratch.
```

The purpose of this rule is to keep the long-term redesign from accidentally discarding several years' worth of already-working deterministic systems.


