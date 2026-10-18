# Known World — Melee Measure Reach Policy A/B Test v0.3

**Status:** Tested mathematical-design alternatives; no live BECMI combat or playtest validation; not an accepted production checkpoint.
**Task:** Compare conditional Size-based entry denial at **Far and Normal** (variant A, the v0.2 prototype default) versus **Far only** (variant B) without using Handling or Power in measure determination. Reuse already-rolled BECMI side initiative d6, as originally proposed. The AAE Close/Normal/Far labels and the existing Size ratings remain unchanged.

Source authority: the accepted repository's `data/context-matrix-weapon-profiles.json` preserves the workbook roster's Size, Power and Handling values. The workbook's Handling rating describes restricted-space damage, *not* movement control. `Arms Across Eras Canonical v3.2` gives fighting-measure nomenclature and Press/Hold/Open behavior. Mentzer BECM combat phases, retreat/withdrawal/charge and attack eligibility always govern actual combat. This test does not claim historical bout percentages.

## Proposed experimental evaluator

`lib/measure-control-size-initiative.mjs` exports `evaluateSizeInitiativeMeasure(input)`. It accepts only existing weapon **Size** ratings and existing individual side **initiative results** plus authoritative current measure, intents, verified active threat, and verified movement feasibility. Any `handlingRating`, `powerRating`, shield, armor or Restricted-space fields supplied are deliberately ignored as direct measure-control modifiers. Unknown movement or required active-threat evidence returns `unresolved`; verified geometry can directly determine measure. At most one band changes per round. Both variants leave Close without a length-based automatic control bonus. Pairwise fights and multi-actor battlefield geometry remain separate.

**Size reach bonus if a longer weapon Holds against Press and can actively threaten the approach:**
- Far: Size difference 1–2 grants +1, 3+ grants +2 in both variants.
- Normal: Size difference 2+ grants +1 in variant A; **0 regardless of Size** in variant B.
- Close: zero for both variants.
- No active point/edge threat, a blocked angle or geometry preventing the stated action: no automatic bonus, or geometry/movement adjudication precedes the contest.
- Existing d6 initiative difference + conditional reach bonus decides; tie preserves current band. These bonus thresholds are provisional calibrations, **not** history-derived likelihoods.

## Exact one-round outcomes (independent d6 rolls from opposing BECMI sides)

| Situation | Variant A — Far + Normal | Variant B — Far only |
|---|---:|---:|
| Spear (Size +2) Holds at Far against normal sword (0) Press | Sword enters Normal on 10/36 = **27.78%** | Same **27.78%** |
| Spear Holds at Normal against sword Press (spear point active) | Sword reaches Close on 10/36 = **27.78%** | Sword reaches Close on 15/36 = **41.67%** |
| Pike (Size +3) Holds Far against dagger (-2) Press | Dagger enters Normal 6/36 = **16.67%** | Same **16.67%** |
| Pike Holds Normal against dagger Press, point active | Dagger reaches Close on 10/36 = **27.78%** | Dagger reaches Close on 15/36 = **41.67%** |
| Spearman Opens from Close, swordsman Holds | Separation succeeds 15/36 = **41.67%** | Same |
| Spearman Opens at Normal as swordsman Presses | Sword closes 15/36, spear opens to Far 15/36, tie Normal 6/36 | Same |
| Spears' active threat lost (flank, point displaced, blocked lane) | No reach bonus | No reach bonus |
| Size difference 0 or 1 at Normal | No Normal bonus | No Normal bonus |

The Normal +1 suppresses **five of 36** successful Normal-to-Close advances per hold/press contest: **13.89 percentage points**. A Size bonus at Normal therefore materially slows closing but never by itself determines damage, chance to hit, or actual attack legality.

## Repeated-round A/B experiment

An **abstract nonlethal** sequence, not an integrated BECMI duel:
- Begin at Far; one opportunity per round to change **one band** using newly rolled opposing side d6.
- Spear Holds at Far. Sword Presses at Far and Normal; at Close the sword Holds, while spear Opens.
- At Normal, spear **Holds** some fixed fraction and **Opens** the rest; these are *declared tactical policies*. Both fighters can move as attempted. Spear's effective frontal threat remains active when holding.
- Ignore weapon hits, injury/death, armor, spells, grapple, shield interference, fatigued movement, attack opportunity cost and complex 3D geometry; keep decisions fixed for the entire run.
- Compute complete 3×3 one-round Markov matrices by enumerating all 36 pairs of actual initiative rolls for each declared action matchup and mixing the rows exactly. Report chance to be at Close after 5 or 10 rounds and expected number of rounds before the **first** arrival at Close, beginning at Far.

| Share of Normal rounds when spear Opens | Model | Close after 5 rounds | Close after 10 rounds | Mean rounds until first Close |
|---|---|---:|---:|---:|
| 0% — always Holds | A: Far + Normal | 26.97% | 37.43% | 7.20 |
| 0% — always Holds | B: Far only | 35.27% | 47.10% | 6.00 |
| 50% — Holds or Opens equally | A: Far + Normal | 25.19% | 31.25% | 8.64 |
| 50% — Holds or Opens equally | B: Far only | 28.49% | 35.20% | 7.80 |
| 100% — always Opens | A: Far + Normal | 23.60% | 27.96% | 9.60 |
| 100% — always Opens | B: Far only | 23.60% | 27.96% | 9.60 |

The 0% case does **not** allow the spear to recover Far once Normal is reached because the chosen tactic is Hold rather than Open. Under the 100% case both models agree by design; reach-denial bonuses never apply during Open-vs-Press. These results demonstrate *policy sensitivity*, not empirical fighting odds. The percentage at Close after round N is not a probability of surviving N rounds or winning a duel.

The mean rounds to Close solve simple first-arrival recurrences for Far and Normal: with `q=P(Far→Normal)`, `a=P(Normal→Close)`, `b=P(Normal→Far)`, `E_Far=1/q+(1+b/q)/a`. This expectation excludes death and all BECMI attack costs.

## Design judgment

**Choose Variant B — Far-only as the initial measure-control design recommendation, not a live rule yet.** It implements a clean first-contact reach barrier but does not automatically award the same long-weapon advantage again after an opponent has already forced their way into Normal fighting distance. The long weapon still has its published/AAE contextual attack effectiveness, physical reach and ability to Open or maneuver. It avoids making Normal an extra default endurance barrier under Hold/Press tactics and emphasizes initiative disparity and current geometry after initial entry. Variant A remains a documented, tested alternative if future integrated playtests show Normal is too easy to leave.

However, neither variant has empirical historical calibration; the *choice* is a simplicity/balance judgment under a deliberately simplified experiment. A successful Press must satisfy 3D reach/route/movement legality; ordinary BECMI fighting withdrawal, retreat, set-versus-charge, initiative phases and existing special combat rules always override the toy model. Side initiative is shared by a side and must not be independently rolled for every paired engagement. Weapon Size is not a literal length in feet.

## Reproduction and pending approval

- `node validation/measure-control-prototype.mjs`: historical v0.1 exhaustive test.
- `node validation/measure-control-calibration-v0.2.mjs`: historical v0.2 baseline.
- `node validation/measure-control-far-only-v0.3.mjs`: exhaustive pair/measure/intention/initiative **two-policy** comparison, actual roster import, swap symmetry, bounded movement, Handling independence, threat gating, shield/armor non-duplication, geometric override, exact Markov trajectories and first-arrival expectations.
- `.github/workflows/measure-control-design.yml` runs all three in an independent design workflow. Passing this workflow is not the repository's game acceptance procedure.
- Production `index.html`, `audit.md`, `pipeline-state.md`, `work/v0.4.338`, weapon profiles and other project repositories stay unchanged.

Before any live adoption: integrate established 3D positions and actual weapon reach, preserve RAW movement and phase action costs, test active defense and committed attacks, multi-enemy formations, shields/grapples, mounted charge and constraints, then run the complete production acceptance suite and explicitly accept an independent future game checkpoint.