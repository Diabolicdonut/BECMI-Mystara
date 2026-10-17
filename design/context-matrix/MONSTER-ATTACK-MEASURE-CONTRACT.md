# Context Matrix calculator and monster attack boundary (v0.4.336)

The workbook remains the primary design authority: BECMI_Weapon_Context_Matrix.xlsx, preserved in the Known World Project; this repository has its four-tab extraction. Atlas v0.4 supports the workbook; v0.1 is exploratory only.

## Bounded pure calculator

Implementation: lib/context-matrix-calculator.mjs. Call calculateContextMatrix({weapon, targetSize, protection, measure, space, attackContext?}, calibration). Output includes eligible, modifier, reason and trace steps. This has no caller inside live combat, no state, no RNG, and no damage application. The weapon has sizeRating, powerRating, handlingRating, rangeProfile, optional rcDamage. Accepted targetSize: Small / Medium / Large; protection: Soft / Hard (never AC); measure: Close / Normal / Far; space: Open / Restricted.

Size response uses −rating, 0, +rating for Small, Medium, Large. Power response uses −power for Soft, +power for Hard. Range Profile uses workbook Size-Based / Flat / Long-Slight / Short-Favored / Short-Slight / Long-Favored. Subtract reference protection Power (Soft by default). Divide net source steps by 2, round HALF AWAY from zero as Excel ROUND(value,0), then add whole damage-point Handling only for explicitly Restricted space, then clamp −3…+3. Medium / Soft / Normal / Open is zero for every canonical profile. No double-count from adjacency or a closer measure.

Every missing, unknown, malformed or nonnumeric eligibility input returns ineligible neutral modifier 0, not guessed context. Nil damage is ineligible. Original published damage dice, attack, AC, magic, mastery, charging and special effects remain untouched.

## Natural attacks: binding design rule; schema enrichment separate

Per individual attack (not per monster), a future schema may hold:

    attackContext:
      delivery: natural | weapon | breath | projectile | special
      preferredMeasure: Close | Normal | Far
      legalMeasures: [...]
      contextualWeaponDamageEligible: true | false

For all natural attacks contextualWeaponDamageEligible MUST be false. A natural attack's preferredMeasure controls potential attack availability, positioning and later AI choice, NEVER its published damage. Bites normally prefer Close, claws typically Close, gore Close/Normal when explicitly sourced, tails may prefer Normal, breath may prefer Far and ranged natural projectiles their sourced measure; none of these is an invented universal catalog value. Claws, bites, horns, tails, constriction, poison, engulf, gaze, breath and other source-specific attacks keep published procedures. An armed monster's WEAPON attack uses ordinary weapon rules when explicitly eligible.

Delivery=natural/breath/projectile/special must bypass the calculator with the explicit notEligible neutral result. A supplied attackContext only allows weapon calculations if delivery=weapon AND contextualWeaponDamageEligible=true. Callers must never infer weapon eligibility from damage notation. Dynamic targets use their actual current Size. Size and physical Protection must come only from resolved deterministic target profiles or explicit encounter overrides; placeholder catalogue entries and AC cannot supply them. Supernatural immunity does not imply Hard physical protection.

No catalogue mass rewrite and no live integration in v0.4.336. Preferred-measure enrichment will receive its own bounded checkpoint, not a hidden part of weapon arithmetic.
