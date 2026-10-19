<!-- Authoritative user continuation/design authorization. Supersedes older intent-dependent control and unconditional natural-damage preservation only as expressly described below. Pending mechanics require separate acceptance. -->

# KNOWN WORLD — GITHUB CONTINUATION + CONTEXTUAL COMBAT COMPLETION

Continue development of the existing **Known World / BECMI Text RPG** directly through the connected GitHub repository:

`Diabolicdonut/BECMI-Mystara`

## 1. STRICT PROJECT ISOLATION

This task is exclusively for Known World.

Use only the connected GitHub repository, `/Known World/` project files when genuinely required, and governing source materials already authorized for Known World.

Do not inspect, retrieve, modify, or use Whiskey Project, Compulsive Research, Universal RPG, Lovecraft RPG, OSR System, or any other project's material.

Mentzer BECM RAW is primary authority. Compatible Rules Cyclopedia material is secondary. Source-specific modules govern their own content. Immortals remains excluded.

Preserve deterministic state, missing/null/zero/false distinctions, save/migration integrity, rule toggles, nonnumeric Special, and planning-only ship contracts.

## 2. RECOVERY FIRST — GITHUB IS AUTHORITATIVE

Before making changes, inspect:

- Current `main`, recent commits, and production `index.html`.
- Topmost accepted `audit.md` entry.
- `pipeline-state.md`.
- `AGENTS.md` and `validation/README.md`.
- Active `work/...` branches and relevant pull requests.
- Latest GitHub Actions acceptance and deployment results.
- Canonical weapon profiles and relevant Context Matrix design contracts.

**Last independently verified accepted state: v0.4.342.**

Latest main commit:

`eae9950d918843e14e15b196054970ecb356b5a2`

Accepted production SHA-256:

`b18220d38fc93d51a86d51abf1d5d559e3132cb0a3a8c538a53d77abd3f42ace`

The following acceptance milestones are complete:

- Pure BECMI RAW combat procedures independently selectable.
- Contextual combat independently selectable.
- RAW/contextual positioning and rules isolated.
- Accepted pairwise Measure.
- Existing unmodified initiative d6 captured.
- Accepted Size bonus progression 0/+1/+2/+3.
- Six-opponent pairwise combat preserved.
- Old-save migration and native save/reload validated.
- Required exact-main acceptance and Pages deployment green.

Latest exact-main required acceptance:

`39254403692` — SUCCESS.

**Next prescribed checkpoint: v0.4.343 — Surprise and contextual Measure verification.**

If newer fully accepted work exists, resume from that state instead.

Never roll back, redo, or overwrite accepted work.

## 3. OVERARCHING DESIGN PHILOSOPHY

The purpose of contextual combat is not to force players to learn a detailed tactical ruleset.

**Players should choose familiar weapons and employ them according to ordinary intuition. The deterministic engine should quietly reward or penalize the effectiveness of those choices according to the circumstances.**

A spear is advantageous when keeping dangerous creatures away.

A dagger is valuable when fighting at extremely close quarters.

A two-handed sword benefits from sufficient space and broad surrounding influence.

Polearms perform well in appropriate defensive positions and narrow approaches.

Pikes excel at long-distance battlefield control but impose significant transportation and deployment difficulties.

Players should discover these relationships through experience.

Do not expose unnecessary formulas, optimize equipment on the player's behalf, or turn combat into numerical micromanagement.

The AI referee interprets intention and narrates outcomes. The deterministic engine establishes mechanical authority.

## 4. IMMEDIATE CHECKPOINT — v0.4.343 SURPRISE

Resume the pipeline's prescribed surprise dependency first.

In contextual combat, **a surprised combatant cannot contest Measure during the applicable BECMI surprise period**.

An unsurprised combatant may establish its desired Measure through an otherwise physically legal engagement without opposition from the surprised combatant.

After surprise ends, ordinary contested Measure resumes.

Surprise must not confer invented attacks, movement, reach, or damage.

Preserve authentic RAW surprise independently.

Inspect whether the behavior already exists before writing code. Add focused native-browser regression tests and make only necessary corrections.

Accept the checkpoint through the full existing GitHub procedure.

## 5. CORRECT THE SIZE-ADVANTAGE RULE

Our latest design decisions establish that **Weapon Size advantages depend on the current Measure, NOT the direction a combatant wishes to change Measure**.

This supersedes the older intent-dependent Hold/Press/Open Size-bonus implementation.

The rules are:

| Current Measure | Size advantage |
|---|---|
| Far | Longer weapon |
| Normal | Neither |
| Close | Shorter weapon |

The magnitude is the absolute difference between Weapon Size ratings, capped at +3.

The bonus applies whenever an eligible opposed Measure contest occurs, regardless of whether the advantaged combatant intends to Press, Hold, or Open.

**Contesting Measure is a struggle for positional control, not a separate type of roll for each intended direction.**

Each contender uses:

`Existing unmodified initiative d6 + applicable Size advantage + eligible creature trait modifier`

The winner controls Measure and may establish the legally permitted outcome according to its declared intention.

Ties retain current Measure.

No additional initiative roll is made.

Normal BECMI initiative order remains independent.

Preserve one-band-per-round Measure transitions and physically legal movement.

Maintain independent Measure for every opposing combatant pair.

An attacker initiating legal contact from outside the defender's applicable Zone of Influence can establish its preferred Measure without opposition, except where a governing rule expressly requires otherwise.

There are no artificial engagement capacities.

Implement the correction as its own independently validated checkpoint.

## 6. NEW TRAIT — FEROCITY

Introduce a simple optional contextual-combat trait:

**FEROCIOUS: +1 Measure control.**

The trait reflects innate physical intensity, unpredictability, explosive movement, aggression, determination, and the difficulty of controlling the creature during violent contact.

### Normal eligibility

Wild beasts and appropriate bestial monsters generally qualify.

Examples include wolves, bears, wild boars, and other naturally formidable wild creatures.

Ordinary humanoids do not generally qualify.

Exceptionally relentless, berserk, or otherwise specifically characterized humanoid combatants may qualify in rare cases, including appropriately sourced berserkers.

Do not infer the trait from a humanoid's ancestry, culture, or appearance alone.

Do not automatically grant it to all monster-catalogue entries, constructs, undead, or creatures lacking the relevant characteristics.

Inspect governing creature descriptions and existing data before assigning traits.

### Mechanical effect

Ferocious grants +1 to the creature's existing unmodified initiative die **for eligible Measure contests only**.

It applies at Far, Normal, and Close Measure.

It applies regardless of whether the creature is attempting to Press, Hold, or Open.

The trait belongs to the creature, not to individual weapons or attacks.

An exceptional humanoid carrying a manufactured weapon may therefore benefit from Ferocious.

Ferocity does not modify ordinary initiative, attack rolls, damage, saving throws, morale, movement, or attack frequency.

The existing Size advantage remains capped at +3. Ferocity is a separate +1 modifier and may produce a combined Measure advantage greater than +3.

Do not add multiple Ferocity bonuses.

### Temperament is independent

The trait does not compel aggressive behavior.

A cautious wolf may avoid a defended spearpoint. A territorial boar may charge. A wounded animal may withdraw. An intelligent monster may make more sophisticated decisions.

Monster decisions must reflect instincts, temperament, morale, circumstances, intelligence, and objectives—not optimization of damage bonuses.

**Do not introduce a Docile −1 trait.**

Creatures without Ferocity receive no modifier.

Do not introduce additional personality-based numeric modifiers unless separately authorized.

Implement Ferocity in its own bounded checkpoint.

## 7. NEW RULE — NATURAL-ATTACK PROXIMITY DAMAGE

Introduce the newly approved contextual damage rule for conventional physical natural melee attacks.

| Pairwise Measure | Eligible physical natural-attack damage |
|---|---|
| Far | −1 |
| Normal | Published RAW |
| Close | +1 |

This is a deliberately simple old-school abstraction.

It represents dangerous creatures becoming more threatening as they spend more of the combat exchange inside a character's defenses.

### Measure represents prevailing control, not fixed separation

Far, Normal, and Close are tactical Measures prevailing over an approximately ten-second combat round.

They are not exact physical distances at which combatants remain motionless throughout the round.

**All three Measures are within an established melee engagement.**

A creature at Far Measure may still momentarily close and deliver an ordinary natural melee attack.

Far Measure therefore does NOT automatically deny attacks or impose a new physical reach prohibition.

Distinguish Far Measure within melee from an opponent who is genuinely outside melee engagement.

Keep actual encounter geometry and non-melee attack legality separate from the tactical Measure band.

### Eligibility

The proximity modifier applies only to successful conventional physical natural melee attack damage, such as appropriate bites, claws, horns, kicks, slams, and comparable ordinary bodily strikes.

Do not apply it to:

- Poison damage or poison effects.
- Breath weapons.
- Spells or magical damage.
- Gaze attacks and supernatural effects.
- Burning oil, holy water, or other delivered substances.
- Manufactured weapons.
- Special-effect damage governed by distinct published procedures.

For a bite that combines ordinary physical damage with poison, modify only the eligible physical damage component.

For ordinary physical multiattacks, apply the modifier independently to each successful eligible attack.

Do not impose an arbitrary once-per-round bonus cap.

Do not invent extra attacks or alter attack rolls.

Use the engine's existing applicable minimum-damage rules. Do not introduce a novel damage floor.

Preserve published monster special abilities and attack sequences.

### Critical architectural separation

This rule is NOT a new natural-attack Context Matrix.

Natural attacks remain excluded from the canonical weapon Context Matrix calculator.

Introduce this narrowly scoped proximity modifier through a separate contextual natural-damage policy.

Update the older contract that currently requires unchanged natural-attack damage, making clear that the new proximity modifier is an explicitly authorized exception **only in optional contextual combat**.

Normal Measure retains published damage.

**Pure BECMI RAW combat must retain all original published monster damage with no proximity adjustment.**

Implement this in a separate checkpoint after verifying the governing Measure mechanics.

## 8. MONSTER PREFERRED MEASURE AND BEHAVIOR

Retain independently recorded attack preferences where source-supported.

A monster's preferred Measure is not necessarily the Measure offering the greatest damage.

Temperament, situation, intelligence, and instinct determine where it actually attempts to fight.

Do not construct a bespoke damage-versus-distance curve for every monster attack.

The universal natural proximity rule is intentionally an abstraction that preserves a consistent old-school experience.

Players should broadly understand that allowing dangerous creatures to close with them increases the risk.

Do not engineer a general tactical incentive to approach a dragon or similarly dangerous creature merely to exploit a hypothetical anatomical penalty.

## 9. VERIFY WEAPON COVERAGE AND OVERSIZED WEAPONS

Preserve the established directional Zone of Influence design.

Weapon Size and Zone of Influence coverage are independent characteristics.

Two-handed swords may offer broad surrounding influence with sufficient clearance.

Spears and polearms offer more concentrated directional control, with appropriate distinctions between weapon types.

Coverage determines whether an approaching opponent may contest Measure.

Weapon Size determines the applicable advantage during a legal contest.

Coverage does not automatically confer extra attacks, automatic defense, or engagement-capacity limits.

Preserve the established oversized-weapon restriction:

Pikes, long lances, and similarly oversized rigid weapons generally cannot be transported, deployed, or used normally in ordinary dungeon environments.

A rigid 10-foot pole is the approximate practical dungeon transportability benchmark established by design.

Exceptional spaces such as large caverns may permit use where actual clearance and geometry support it.

An unusable weapon cannot attack or provide Measure advantages.

Do not replace physical impossibility with a small damage penalty.

Preserve independently authorized RAW restrictions without importing contextual restrictions into pure RAW combat.

Verify existing implementation first, then correct missing behavior in separately accepted checkpoints.

## 10. EQUIPMENT AND WEAPON DIFFERENTIATION

Preserve the 46 canonical weapon profiles unless separate sourced corrections are required.

Important existing ratings:

| Weapon | Size | Base damage |
|---|---:|---|
| Dagger | −2 | 1d4 |
| Short sword | −1 | 1d6 |
| Normal sword | 0 | 1d8 |
| Spear | +2 | 1d6 |
| Pike | +3 | 1d10 |

The intended effect of Measure is to create meaningful equipment decisions.

A spear is a valuable primary defensive weapon.

A short sword or dagger can complement a spear when an opponent closes.

A dagger's short Size should provide an actual Close Measure control advantage even when its wielder wishes to Open rather than Press.

Do not deny that advantage because of the direction of the intended change.

Preserve ordinary weapon-handling rules for dropping, drawing, switching, carrying, throwing, and recovering equipment.

A weapon change does not automatically alter existing Measure or grant free actions.

Retain traditional weapon economics, equipment utility, shield compatibility, and encumbrance.

Do not weaken spears merely because they become more attractive choices.

## 11. REQUIRED NEW TESTS

Add dedicated deterministic and native-browser regression scenarios covering:

- All 36 opposed d6 combinations.
- Size advantage at Far, Normal, and Close.
- Direction-independent Size advantage while Pressing, Holding, and Opening.
- Spear, normal sword, short sword, and dagger against a Size-0 wolf.
- Ferocious and non-Ferocious versions of otherwise equivalent opponents.
- Ferocious humanoid wielding an actual weapon.
- Ferocity and Size bonus stacking.
- Ferocity does not alter ordinary initiative or attack damage.
- Surprise prevents Measure contests.
- Melee attacks remain permitted at every established melee Measure.
- Natural physical damage at −1 / 0 / +1.
- Multiattack monsters and per-hit modifiers.
- Mixed physical damage and poison.
- Exclusion of magic, breath weapons, burning oil, holy water, and special effects.
- Temperament-driven decisions independent of mathematical optimization.
- Switching from a spear to a shorter sidearm during Close Measure.
- Directional ZOI, flanking approaches, and multiple independent attackers.
- Extremely long weapons in ordinary dungeons and exceptionally spacious chambers.
- Safe retreat and fighting withdrawal without inventing a compulsory Measure escape contest.
- Pure BECMI RAW remaining unchanged.
- Save/reload, old-save migration, RNG conservation, and deterministic state.

Include encounter-level tests involving wolves, bears, boars, armed humanoids, and representative multiple-natural-attack monsters.

Do not treat mathematically passing tests as proof of successful gameplay balance.

Evaluate whether players can understand tactical consequences through ordinary narration without being shown internal formulas.

## 12. CHECKPOINT ORDER AND ACCEPTANCE

Begin with the authoritative v0.4.343 surprise dependency unless GitHub has advanced beyond it.

Then verify the already prescribed ZOI coverage and oversized-weapon restrictions.

Integrate the newly authorized Measure correction, Ferocity trait, and natural proximity damage in **separate, independently accepted checkpoints**.

Resolve actual dependencies before choosing the precise next version number.

Do not combine all the new mechanics into a single large patch.

For every checkpoint:

1. Branch from the newest fully accepted main.
2. Implement one bounded, independently testable change.
3. Run dedicated focused tests.
4. Run the complete required regression and native-browser suite.
5. Fix all failures without weakening validation.
6. Append the audit and update pipeline state.
7. Record exact production checksums and acceptance evidence.
8. Validate the exact acceptance-metadata SHA.
9. Merge the accepted work.
10. Validate the exact merged-main SHA and deployment.

Respect the repository's existing per-session checkpoint limits.

Do not replay completed work or promote candidates prematurely.

After these combat dependencies are complete, return to the prescribed persistent authoritative local-scene coordinate/state foundation. Keep physical world state distinct from player knowledge, belief, perception, and presentation.

No premature graphical map implementation.

## 13. CONTINUE IMMEDIATELY

Begin by recovering current GitHub state, then execute the next prescribed unfinished checkpoint.

Do not spend the opening turn redesigning accepted mechanics.

The newly agreed design is:

**Far favors long weapons; Close favors short weapons; Normal favors neither. Size advantages are independent of Press/Hold/Open direction. Ferocious creatures gain +1 Measure control. Conventional physical natural attacks deal −1/0/+1 damage by Measure. Temperament governs behavior, not numerical optimization. Pure BECMI RAW remains untouched.**

Preserve this design as authoritative for future contextual-combat checkpoints.

Continue implementation and validation directly through GitHub.