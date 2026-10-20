# Ferocious creature trait — v0.4.347

Authority: [2026-10-19 contextual combat completion](CONTEXTUAL-COMBAT-COMPLETION-2026-10-19.md), section 6. This is an optional contextual positional-control modifier, not an assertion that Mentzer BECM printed a +1 trait.

## Source-reviewed starter assignments

| Runtime profile | Canonical record | Governing source | Source observation |
| --- | --- | --- | --- |
| wolf | MON-0104 | Mentzer Basic printed p.39 | Wild, pack-hunting carnivore |
| black_bear | MON-0007 | Mentzer Basic printed p.26 | Formidable wild bear; avoids combat unless threatened, defends young |
| grizzly_bear | MON-0008 | Mentzer Basic printed p.26 | Large wild bear, substantially more willing to attack |
| boar | MON-0016 | Mentzer Basic printed p.27 | Wild boar, bad-tempered when disturbed |
| berserker | MON-0015 | Mentzer Basic printed p.27 | Explicit mad battle fury, fights to death, no surrender |

Descriptions support eligibility under the user-authorized interpretation; they do **not** override printed morale, hit rolls, or behavioral reaction rules. The approved berserker is an exceptional humanoid, **not** a general human ancestry modifier. No wholesale monster-catalogue inference is authorized. Other beasts can be added only after their own source review in later checkpoints. Creatures not reviewed—including ordinary goblins, kobolds, orcs, constructs and undead—get no derived Ferocity. Identity and canonical source/page must match; a naked `ferocious: true` in an unsupported monster save cannot bypass provenance.

## Contract

An eligible, living, combat-capable creature contributes precisely **+1** to its **existing unmodified initiative d6 only for an actual opposed Measure contest**, at Far, Normal or Close, independently of Press/Hold/Open. It stacks *outside* the separately capped Size bonus. The original d6, modified normal initiative and phased action order remain unchanged. Matching intentions do not create a new contest; surprise or newly legal/uncovered contact does not create a new opposed roll. Physically unusable weapons, casting, invalid pair relations and disabled combatants retain prior restrictions. Equal scores retain Measure.

The trait lives on the creature, independent of equipped or natural attacks. New instances from verified sources have `measureTraits:{ferocious:true}`; existing saved instances **without** the field resolve their source fact without mutating sparse save data. Explicit null, false, zero, malformed or `ferocious:false` remain literal and not silently upgraded. An explicit value of true is effective only for listed provenance-verified identities. Temperament, intelligence, morale and instinct remain independent: a wary black bear may avoid combat even though eligible when caught fighting.

No new Docile penalty, personality score, second roll, special attack, extra movement, automatic damage, or forced retreat. Do not change natural physical damage (a later separate checkpoint). Pure Mentzer BECMI RAW bypasses the new rule completely; no damage selection changes.

## Evidence

Eight new embedded regression definitions (source identity, three bands/nine intentions, 36 opposed d6 outcomes on each band, sparse overrides/migration, weapon independence, physical eligibility and surprise, RAW mode, repeated reload) plus the mandatory actual-command native gate. The complete inherited deterministic, four Chromium slices, existing native acceptance, ordered coverage/isolation and Pages gates must remain mandatory. Passing mechanic tests does not establish gameplay balance.
