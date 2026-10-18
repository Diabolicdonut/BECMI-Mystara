# Known World — Melee Measure Calibration v0.2

**Design-only working evidence; NOT published BECMI RAW, historically fitted odds, live combat, or a production acceptance checkpoint.**
Companion to [MEASURE-CONTROL-PROTOTYPE-v0.1.md](MEASURE-CONTROL-PROTOTYPE-v0.1.md). The primary weapon ratings remain the project's original workbook data. Test file: \`validation/measure-control-calibration-v0.2.mjs\`. Pure evaluation module: \`lib/measure-control-prototype.mjs\`.

## Decision after calibration: default Handling control OFF

The authorized Context Matrix defines **Handling** as a damage adjustment to verified \`Restricted\` **space**; it does not quantify footwork, initiative, recovery speed, clinch, or distance-control skill. The initial v0.1 proposal used Handling to break tied initiative+reach contests when both techniques were independently restricted. This experiment converts all **six** otherwise tied outcomes in a symmetric 36-outcome d6 pair to a win for the fighter with even one more Handling point: a **16.7 percentage-point swing** for a +1 difference, irrespective of rating magnitude. This is a substantial and uncalibrated extension beyond source authority.

**v0.2 recommendation: disable Handling as a measure-control tie-break by default.** The nonproduction prototype supports \`enableHandlingControlExperiment:true\` only when an external caller deliberately requests study and supplies separately verified Restricted space and both technique-relevance flags. This permits sensitivity tests while preserving the meaning of the existing rating. A verified grapple, dominant weapon bind, or body control must use an actual published/implemented control state, not a surrogate Handling number.

In the real game, keep Handling's already-established contribution to optional contextual **weapon damage** when \`space=Restricted\`, if that weapon damage mode is active. This is not an instruction to apply any new attack-roll or movement bonus. Close fighting is **not** equivalent to Restricted space.

## Provisional reach-denial calibration

Retain v0.1 as a conservative *design baseline* for testing; no defensible historical percentage yet proves a correct modifier. Use Size difference **only** to represent a verified longer active threat line when the long-weapon combatant Holds and the other Presses:

| Current measure | Positive Size difference | Denial modifier | Rationale |
|---|---:|---:|---|
| Far | 1–2 | +1 | Some differential threat while maintaining separation |
| Far | 3+ | +2 | Marked difference in available striking distance, subject to actual reach |
| Normal | 1 | 0 | Neither automatically dominates working distance |
| Normal | 2+ | +1 | Residual distance denial if the point still directly threatens entry |
| Close | Any | 0 | Reach cannot retroactively reassert itself when point has been passed |
| Any | No verified active forward threat | 0 | Off-line, blocked, turned, bound or otherwise invalid thrust lane removes bonus |

No unconditional reach bonus in Press-vs-Open pursuit or Open-vs-Hold separation. The bonus is applied to existing side initiative, not damage or AC. \`Power\` affects damage and tactical choice, never control-score arithmetic. A shield's defense is reflected in AC, **not** in an arbitrary extra control modifier; armor likewise unless movement/position facts actually change.

### Exact 36-outcome d6 sensitivity

| Reach bonus | Holder controls | Presser enters | Unchanged |
|---|---:|---:|---:|
| 0 | 15 (41.7%) | 15 (41.7%) | 6 (16.7%) |
| +1 | 21 (58.3%) | 10 (27.8%) | 5 (13.9%) |
| +2 | 26 (72.2%) | 6 (16.7%) | 4 (11.1%) |
| +3 | 30 (83.3%) | 3 (8.3%) | 3 (8.3%) |
| +4 | 33 (91.7%) | 1 (2.8%) | 2 (5.6%) |

A +3 or +4 modifier largely extinguishes entry attempts against equal-initiative opposing sides; cap the initial hypothesis at +2 to avoid a nearly absolute barrier. The selected +1 and +2 are **game calibration hypotheses**; sensitivity is mathematical, not archaeological or an observed historical strike rate. +2 still requires field testing because even 16.7% single-round entry probability may prove too low in a lethal BECMI fight.

## Scenario-specific evaluation

| Scenario | Established facts | Expected model behavior | Design verdict |
|---|---|---|---|
| Spear vs sword, first joining | Far, spear Holds, sword Presses, active aligned point | 21 spear / 10 sword / 5 ties | Plausible directional advantage; provisional calibration |
| Sword circles off spear line | Far, no effective active threat | 15 / 15 / 6 | Pass: length alone yields no bonus |
| Spear vs sword, fighting already joined | Normal, spear Holds, sword Presses, aligned point | 21 / 10 / 5 | Pass conditional remaining reach; not initial-round-only |
| Spear vs sword, both at Close | Spear Opens, sword Holds | 15 / 15 / 6 | Pass: no permanent long-weapon advantage or short-weapon lock |
| Pike vs dagger, direct linear entry | Far, Size +3 vs -2 and point aligned | 26 / 6 / 4 | Very strong threat; needs empirical playtest and ranged legality |
| Straight corridor | Restricted, linear spear thrust still viable | Keep reach result; Handling control off | Pass: no generic shaft penalty |
| Turning, obstructed corridor | Restricted, verified point unable to threaten | 15 / 15 / 6 or deterministic no-entry | Pass: actual line/geometry precedes Size |
| Shield-bearing swordsman | Shield is worn and active, not a verified weapon bind | No extra measure bonus from shield | Pass: shield AC handles its normal defense |
| Heavy armor | No established alteration to motion | No automatic measure penalty or bonus | Pass: account for actual encumbrance separately |
| Fighter against wall | Cannot Open physically | Return unresolved; movement contract must adjudicate | Pass fail-closed; no die contest through wall |
| Grappling vs merely Close | A real grapple must be separately established | No invented immobilization or bonus | Pass RAW/special state isolation |
| Restricted-space Handling | Spear +1 vs sword -1, Close Open vs Hold | Default 15/15/6; explicit experiment 21/15/0 | Reject unrestricted adoption: +16.7% by tie-breaking |
| Withdrawal and retreat | Existing BECMI maneuver applies | Enforce action, attack, shield and timing costs outside this pure prototype | Not integrated; preserve governing RAW |

Each result is conditioned on its stated facts, movement feasibility, and identical skill. **No universal prediction of historical combat or of actual BECMI win rates is claimed.**

## Repeated rounds: transition-model, not a battle outcome

One explicitly defined symmetric-speed, nonlethal, perfectly informed policy:

- Start **Far**.
- Spear: Hold at Far; Open at Normal and Close.
- Sword: Press at Far/Normal; Hold at Close.
- Aligned spear point at Far; open flat ground; both can move a band.
- Opposing sides reroll their normal d6 initiative each round. No changes to HP, combat ability, tactics, hits, retreats, shield status, weapon readiness, positions beyond the abstract band, or opponents.
- One-band rule always applies; no move is impossible in this artificial scenario.

Exact Markov transition probabilities, row/column order **Close, Normal, Far**:

\`\`\`text
          to Close   to Normal   to Far
Close       21/36       15/36       0
Normal      15/36        6/36      15/36
Far          0          10/36      26/36
\`\`\`

| After N rounds | Close | Normal | Far |
|---|---:|---:|---:|
| 1 | 0.00% | 27.78% | 72.22% |
| 2 | 11.57% | 24.69% | 63.73% |
| 3 | 17.04% | 26.64% | 56.32% |
| 5 | 23.60% | 27.68% | 48.72% |
| 10 | 27.96% | 28.46% | 43.58% |

This shows that **retaining reach does not make it permanent**. The sword can penetrate; after a Close entry the spear may separate. Real BECMI combat rounds involve hits, death, different tactics, and line geometry, so these cannot be interpreted as real-world long-term measure occupancy or expected survival.

### Why not calibrate to a fabricated 67/33 win rate?
A user-intuitive 67/33 advantage is not a measurement. The 2018 Fight Camp 65-bout spear experiment by Lindybeige/Matt Easton is illustrative exploratory sparring with configurations and participants, not sufficient controlled evidence to fit the percentages in the game. Modern fencing reach/movement studies and historical wide/close play discussions establish the importance of distance, timing, and control; they do **not** directly specify BECMI transition modifier values. See:
- https://www.youtube.com/watch?v=uLLv8E2pWdk
- https://pubmed.ncbi.nlm.nih.gov/28290725/
- https://www.historicalfencingmalta.org/papers/wide-and-close-play-in-the-tradition-of-fiore-dei-liberi/
- https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2026.1756804/full

## Approval gates for future live implementation

1. Keep pure proposal isolated from accepted \`main\` and separately advancing v0.4.338 Context Matrix live damage.
2. Obtain actual combat integration information: verified real reaches and positions, geometry path, attack order within Mentzer initiative phases, whether a failed Press affects the attack, and costs of fighting withdrawal or retreat. Preserve fully deterministic event/replay/save boundary.
3. Do not map +2 Size directly to feet, and do not infer restricted clearance from Close, adjacency or shield ownership.
4. Resolve multi-actor formations and active threat arcs, distinct from a one-on-one symmetric test. An opposing *side* uses one common initiative d6; do not fabricate per-pair independent initiative in simultaneous engagements.
5. Add real paired combat test harness with THAC0, weapon proficiency/mastery toggles, shield AC, spell movement, armor/encumbrance, set vs charge and injury risk. Include sensitivity over +0/+1/+2 before fixing an official measure-control value.
6. Full production regression and acceptance only after a dedicated authorized integration checkpoint. Passing abstract design tests does **not** constitute integrated-game acceptance.

**Decision:** retain Size-conditioned active entry denial as provisional; default Handling movement-control OFF; do not introduce any new Size/Power/Handling stats, attack rolls, damage modes, or modifications to already-accepted combat.
