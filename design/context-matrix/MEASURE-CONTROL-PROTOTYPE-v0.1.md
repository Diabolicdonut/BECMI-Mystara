# Known World — Contextual Melee Measure Control v0.1

**Status: DESIGN-ONLY PROTOTYPE. NOT LIVE GAME CODE; NOT ACCEPTED PRODUCTION CHECKPOINT.**
This work supplements discussion of how fighters establish and maintain combat
measure. It neither replaces Mentzer BECM/compatible RC combat procedures nor
alters the accepted Context Matrix workbook, weapon profiles, damage calculator,
combat AI, saves, phase ordering, or published combat damage.

## Sources and strict hierarchy
1. Mentzer BECM initiative, movement, fighting withdrawal, retreat, charge/set spear, Weapon Mastery: governing RAW.
2. `Arms Across Eras Canonical v3.2`, section 11: Close/Normal/Far; Press/Hold/Open; generally no more than one band change per round; **no new opposed reach die**.
3. `data/context-matrix-weapon-profiles.json`: canonical weapon Size, Power, Handling, Range Profile; Rating Guide extracted in `design/context-matrix/BECMI_Weapon_Context_Matrix.extracted.txt`. Workbook remains primary.
4. `design/context-matrix/MONSTER-ATTACK-MEASURE-CONTRACT.md`: attack-specific preferred measure does not revise natural-attack damage or manufacture spatial facts.

## Fundamental distinction
- **Attack effectiveness**: existing Context Matrix / AAE / RAW damage. Its Size, Power, and Handling numbers remain unchanged.
- **Measure control**: contested directional movement of one pair of fighters. **No new weapon ratings.**
- **Attack legality**: physical distance, reach, obstacles, reachability and already-established grapple/bind states are authoritative, independent of a convenient qualitative band.
- **Handling rating** does **not** mean generic agility. Canonically it is the signed offensive effectiveness adjustment under explicitly Restricted *space*, not Close measure. This prototype experimentally uses it **only as a control-score tie-break** when Restricted is independently established and both declared techniques are proven to be affected. It does not stack as an initiative bonus.

## Decision matrix
First take authoritative real positioning and the existing current engagement band; no fictional reset to Far each round. Each actor chooses Press, Hold, or Open. Their ordinary movement permissions must already be established.

| A \ B | Press | Hold | Open |
|---|---|---|---|
| **Press** | Both close one band when legal | Contested entry | Contested pursuit vs withdrawal |
| **Hold** | Contested denial | Maintain | Contested distance maintenance vs opening |
| **Open** | Contested withdrawal vs pursuit | Contested opening | Both open one band when legal |

The contest reuses the existing **side d6 initiative rolls** (or already-governing initiative procedure); it does not roll another die. Ties retain the current band unless the verified Restricted-space Handling tie-break applies.

### Conditional Size-derived reach denial (a hypothesis, not RAW)
Only an actor **Holding against an opponent Pressing**, while an active threatening line is actually verified, may receive a reach denial bonus:
- Current **Far**: longer Size rating by 1–2 → +1; by 3+ → +2.
- Current **Normal**: longer Size rating by 2+ → +1.
- Current **Close**: +0. Being longer does not automatically lock someone in Close.
- No positive Size difference, blocked thrust lane, off-line opponent or explicitly unestablished threat → +0.
- Unknown threat eligibility in an otherwise reach-favored matchup → defer to authoritative adjudication; do not silently assert an advantage.

This is a provisional progression, to be empirically calibrated. The Size rating is only a proxy: a real reach line and actual opponent separation still override it. Do **not** double-credit a specific set-vs-charge maneuver, established grapple, superior movement, shield AC, or existing Weapon Mastery ability. `Power` does not enter the control score; it remains a damage/protection input and can indirectly affect combatant intentions.

**Restricted-space Handling tie-break:** only on equal initiative-plus-reach scores, only when `space=Restricted` and both `handlingRelevant` flags are true from independently verified technique limitations. Compare existing numeric Handling ratings, awarding the contested transition to the higher; equality leaves measure unchanged. Its use as a movement tie-breaker is a new design hypothesis; confirm through further playtesting. A narrower implementation could omit it entirely without changing other logic.

**Do not conflate states:** Close ≠ grapple; Close ≠ Restricted space; active long weapon ≠ automatically secured threat; shield ≠ verified binding; armor ≠ movement modifier unless established by actual encumbrance. Higher skill and Weapon Mastery should ultimately matter **only through already-legitimate actions, ability and movement**, not an invented generic level-to-initiative bonus.

## Round integration
1. During normal BECMI declaration and movement phases, record the engagement pair and current band and both intents, then check actual coordinate/path legality, movement allowances, positioning, and special maneuver priority.
2. If real geometry or a published rule determines the resulting band, use that determination directly. This prototype returns `geometry-authoritative` if supplied `geometryResult`.
3. Otherwise contest only incompatible intentions using existing initiative + verified active threat reach denial, then optional restricted Handling tie-break. Fail closed with an `unresolved` result when necessary movement/eligibility facts are missing; never guess them.
4. A success changes **at most one band**; both fighters attack using established post-movement measure only if physically in reach. The winning fighter's declared movement/phase consequences are governed by BECMI, not by this prototype.
5. Persist engagement state and position through subsequent rounds. Per-pair engagement bands are derived from authoritative geometry; multiple attackers, monsters, reach-limited actions, binds, mounts, flight and magical effects need specific handling before any live integration.

## Quantitative dry-run (36 equally likely pairs of d6 initiative outcomes)
| Situation | A controls | B controls | Unchanged |
|---|---:|---:|---:|
| Spear (+2 Size) Holds Far vs sword (0) Press; active spear threat | 21 (58.3%) | 10 (27.8%) | 5 (13.9%) |
| Pike (+3) Holds Far vs dagger (-2) Press; active pike point | 26 (72.2%) | 6 (16.7%) | 4 (11.1%) |
| Spear Opens Close vs sword Holds; no Reach bonus | 15 (41.7%) | 15 (41.7%) | 6 (16.7%) |

These are **control outcomes**, not duel win rates, attack accuracy, or historical measurements. The real opponent might be able to attack during an approach under existing combat timing; never infer free hit immunity from a failed control attempt.

## Verification
Run `node validation/measure-control-prototype.mjs`. It imports the real 46-record roster (only `category=Melee` entries tested); it enumerates all 36 initiative pairs for all melee weapon pairs, 3 measures, and 9 intent pairs, tests side-swap symmetry and one-band transitions, and checks deliberate failure cases and conditional gates. It does not touch production `index.html` or alter pipeline-state.md.

## Not yet resolved / no production authorization
- Determine how side initiative and simultaneous actions interact with multi-actor engagements in native production. One shared side initiative may make a whole formation act uniformly; modeling formation advantage requires its own validated context.
- Validate actual reach and distance under 3D coordinates, blocked paths, reach legality and withdrawal/retreat contract.
- Find calibration data for size-step thresholds and restricted Handling tie-break. Test player and monster combatants, paired weapon usage, shields, mounted combat, genuine grapple and off-line threat.
- Establish exhaustive integration acceptance (save/load, commands, phase timing, existing modes, natural attacks, alternate toggles) before implementing the design in live combat.
- The pipeline's next accepted checkpoint v0.4.338 is **separate** and must not be displaced by this design experiment.
