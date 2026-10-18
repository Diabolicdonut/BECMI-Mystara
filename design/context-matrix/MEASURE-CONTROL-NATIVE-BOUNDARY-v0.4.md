# Known World — Far-Only Native Integration Boundary Test v0.4

**Result: PASS in controlled browser and mathematical tests. Recommendation: retain Far-only Size + existing initiative as the preferred experimental rule, but DO NOT enable it in production yet.**

This is a test of integration *boundaries* against exact accepted Known World production \`index.html\` v0.4.337. It is **not** a merged rule, full native performance/playtest, or an engine acceptance checkpoint. GitHub main remains authoritative; accepted pipeline next action v0.4.338 live Context Matrix weapon-damage integration remains a separate project task. All files in this branch are design/test-only.

## Source and invariants

Actual production game combat functions were read from accepted index.html:

- \`atMeleeContact\`, \`combatSeparation\`, \`combatPcVector\` / \`combatMonsterVector\`, \`setEngagement\`, \`meleeGroups\`, \`refreshMeleeRecords\`.
- \`meleeSideIntent\`, \`meleeParticipatingSideIds\`, \`initiativeRollForSide\`, \`resolveMeleeDistanceContests\`.
- \`movementPhase\`, \`resolvePhasedRoundAfterMovementChoice\`, \`beginRawSideTurn\`, \`continueCombatAfterWeaponChanges\`.
- \`rollCombatInitiativeSides\`: existing side d6 totals can be modified by established monster effects. The previous \`validD6(1..6)\` restriction was wrong for *final* initiative totals; v0.4 accepts any safe integer without adding an extra roll.

The optional rule's pure \`lib/measure-control-size-initiative.mjs\` reads **only Size, already-resolved initiative totals, established Hold/Press/Open intents, movement eligibility, active reach-line evidence, and physical positions**. It intentionally ignores Power, Handling, shields, armor and unrelated damage context. \`lib/measure-control-shared-adapter-v0.4.mjs\` is a conservative nonlive adapter, declining to resolve multi-combatant or natural-attack reach based only on the weapon roster.

## Actual browser test — accepted unmodified game

\`validation/measure-control-native-boundary-v0.4.mjs\` boots an exact served \`index.html\`, checks that its temporary fixture is absent, and then loads an in-memory instrumented **separate route** using \`validation/measure-control-native-fixture-v0.4.txt\`. The fixture calls the live combat code; it does not modify, save or commit a changed production HTML. Browser checks reject page errors, console errors and external network.

**38 assertions passed** in [GitHub Actions run 39089141904](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39089141904). Supported observations:

| Contract | Direct observed result | Meaning for proposal |
|---|---|---|
| First contact | Begins at Far; measure contest deferred to next round | A Size reach bonus must not force another contest on newly formed melee |
| Two-side existing contest, initiative 4 vs 5 | Production changes Far → Normal; proposed Far-only active spear Hold would keep Far | Confirms the proposal is **not implemented** in current game and would change an actual result |
| Normal contest, 4 vs 5 | Production changes Normal → Close; Far-only comparator agrees | Far-only is intentionally neutral at Normal |
| Duplicate same-round resolution | Does not shift measure twice | Preserve round-resolution marker and one-band limit |
| Exact 3D position and separation | Contact at intersecting influence spheres, absent at 11 ft center | Geometry determines eligibility before Size/initiative |
| Blocking 3D barrier | Contact absent through barrier, restored when removed | Cannot grant reach denial or attack through geometry-impossible path |
| Independent contacts | Two separate melee groups retain Far and Close respectively | Avoid imposing one global measure across disconnected fights |
| Connected contact | Two PCs and one foe create one shared melee | Pairwise reach bonus **cannot** automatically select the measure for multiple fighters |
| Mixed side orders | One allied PC Hold + another Press becomes **Press** for that side | The existing active-intent aggregation means individual Hold is not automatically the collective side stance; key interaction uncovered by native test |
| Actual BECMI retreat | Flag set, actor physically moved away, contact ended | Open is not a substitute for existing fighting withdrawal or retreat procedures |
| Initiative totals | Live lookup returned valid side values 7 and 0 in a controlled fixture | A measure resolver must accept modified initiative totals, not force raw 1..6 |
| Full PHASED round | Native movement → shared measure → weapon-choice/attack handoff → round 3 | Existing phased ordering preserved; prototype remains out of game |
| Full RAW side round | Native side movement → measure resolution → other side turns → round 3 | RAW can reach its measure resolver **before all other sides move**, so a naive \`allSidesMoved\` gate is incompatible without a deliberate RAW-phase integration design |
| Natural or 3+ member reach | Nonproduction adapter returns \`unresolved\` | Do not fabricate a full group reach score or treat a natural attack as a weapon |

**Scope limits:** the controlled complete-round tests used nonattacking Hold actions to examine phase ordering, movement-to-attack handoff and round completion without conflating reach-control findings with damage randomness. They did **not** compare expected HP loss, to-hit distributions, charge/spear mastery damage, shield AC, grapple success, airborne positioning under the candidate rule, or save/reload after a *live* Far-only rule integration. The broad standard game acceptance workflow remains a separate requirement.

## Revised integration recommendation

1. **Keep Far-only bonus** for a verified longer weapon Held against an attempted Press. Far bonus +1 for Size difference 1–2, +2 for difference 3+, capped +2. At Normal and Close use existing side initiative disparity and established battlefield context. A bonus never creates attack contact or permits an illegal move.
2. **No Handling in measure control**; its approved provisional workbook rating applies only to restricted-space *weapon damage* in the appropriate optional damage mode. Power likewise remains a target-interaction/damage property.
3. **Preserve established group model.** Size-based denial cannot be applied until its threat can be tied to a legitimate controlling *initiative side* for the whole shared melee. Connected melee with multiple weapon sizes, intentions, natural attacks or flanking arcs requires an explicit rule. Proposed safest first implementation: two opposed single combatants with source-verified melee weapon Size and line/threat; fail closed to existing measure contest for others rather than projecting one fighter's bonus across the group.
4. **Preserve new-contact deferral**, one shared measure per connected melee, multiple separate melee groups, one initiative roll per side, physical SoI contact, path/elevation restrictions, and existing RAW withdrawal/retreat consequences.
5. **Resolve RAW-side phase ordering before enabling.** The current \`beginRawSideTurn\` calls distance contest after one side moves. The test-only shared adapter deliberately requires both side movements to have occurred and so returns \`movement-phase-incomplete\` during that phase. A live rule must either use *declared* movement eligibility correctly before both turns, or explicitly select a phase-compatible transition procedure. Do not surreptitiously rewrite Mentzer BECM's ordering.
6. **Verify authoritative active-threat evidence.** Current Size alone is insufficient to prove that the point lies between attackers in a flank, that an attack path is clear, or that the weapon remains presented. Missing/unknown should remain distinct from verified false.
7. **Do not merge** a first-draft pure reach contest as if it were BECMI RAW. A future separately authorized game checkpoint must test both RAW/PHASED action economy, weapon attack legality, mastery, shield, formation, multiple sides/surround, encounter saves, replay, toggles, and all existing mandatory acceptance gates.

## Reproduce

\`\`\`sh
npm ci --ignore-scripts
npx playwright install --with-deps chromium
node validation/measure-control-prototype.mjs
node validation/measure-control-calibration-v0.2.mjs
node validation/measure-control-far-only-v0.3.mjs
node validation/measure-control-native-boundary-v0.4.mjs
\`\`\`

The \`.github/workflows/measure-control-design.yml\` independent design workflow runs these suites. The ordinary Known World game acceptance workflow separately protects unchanged production. Neither successful CI is permission to merge a new gameplay rule automatically.
