# Contextual weapon coverage — v0.4.344

This is optional Known World contextual geometry, authorized by the user's
2026-10-19 completion contract. It is not a new BECMI RAW rule. The 46 canonical
weapon Size/damage/Power/Handling ratings are unchanged.

Weapon coverage determines whether a physically legal new approach is opposed.
Body contact and real paths/barriers remain separate. Size determines a later
eligible opposed Measure advantage; it does not determine a weapon's coverage.

Facing is the direction toward the actor's declared primary target, captured
once before the round's movement and saved in `combat.weaponCoverageFacings`.
No extra turn action, die or player-facing angle entry is introduced. Movement
of that target later in the round does not retroactively rotate the snapshot.

| Weapon form | Presented coverage at legal contact |
|---|---|
| Spear, javelin, trident, pike, lance | Forward side of the presented point; exactly lateral and rear approaches are uncovered |
| Cutting/hooked polearms | Presented front including its lateral boundary; rear is uncovered |
| Two-handed sword (including a bastard sword actually gripped in two hands), explicitly Open handling space | Surrounding approaches |
| Two-handed sword (including a bastard sword actually gripped in two hands), explicitly Restricted handling space | Presented front/lateral boundary only |
| Two-handed sword (including a bastard sword actually gripped in two hands), unknown clearance | Unknown; do not infer a restriction or surrounding clearance |
| Unresolved facing/profile or other weapon/natural attack | Retain existing body-contact procedure; no invented uncovered flank |

An actor occupied by spellcasting or unable to present an attack does not obtain
weapon coverage. A verified uncovered approach establishes the approaching
actor's declared preferred Measure at new contact, without opposing control.
Unknown is not false. Existing pairs retain their Measure; normal one-band
contests resume under the separately accepted rules. Switching weapons never
changes an existing band or grants an action.

Coverage grants no extra attacks, automatic defense, hit/damage modifier,
engagement slots or capacity. Every actual opposing pair remains independent. Formed party and monster group followers each receive their own new-contact ruling; no leader band is copied across a formation.
Natural attack damage, specials, RNG, initiative, RAW and AAE damage choices and
pure RAW procedures remain unchanged. Retreat and fighting withdrawal use their
existing procedures, with no compulsory Measure escape contest.

This checkpoint does not implement oversized transport/deployment clearance,
the newly authorized direction-independent Size correction, Ferocity or natural
proximity damage. Those remain separate dependencies. These tests establish
mechanical behavior and persistence, not proof of gameplay balance.
