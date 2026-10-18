# Known World — Symmetric Melee Measure / Monster Neutral Size Test v0.5

**Status: DESIGN-ONLY TEST.** No gameplay rule, damage modifier, accepted checkpoint, production HTML, save schema, monster catalogue record or existing combat procedure is changed. Mentzer BECM phase/action/withdrawal rules remain primary; AAE provides Close/Normal/Far and Press/Hold/Open. Main's accepted v0.4.337 and separate work/v0.4.338 remain authoritative.

## User-directed model

| Current measure | Conditional advantage | Adjudication |
|---|---|---|
| **Far** | Longer effective weapon +1 for Size advantage 1–2; +2 for 3+ | Only actively threatening **Hold vs Press**; a real unblocked attack/threat line must be independently established |
| **Normal** | **Zero for everyone** | Existing modified BECMI side initiative disparity only, no baseline-Size 0 bias |
| **Close** | Shorter effective weapon +1 for Size advantage 1–2; +2 for 3+ | Only **active Press/pursuit vs Open**, when following/pressing is physically verified; no automatic grapple, weapon grab, passive Hold lock or free pursuit |

Contest uses the **existing modified initiative side totals**, no additional rolls. Equal totals after an eligible modifier keep the current band. Changes are usually at most one measure band. Existing physical contacts, lines, obstacles, SoI, BECMI fighting withdrawals/retreats, actual attack legality and any already resolved geometry supersede a numerical contest. The same side initiative roll must be shared among participants on that side; an individual contest cannot be extrapolated to a 3-person connected melee.

**Handling, Power, AC, monster body Size, armor, and preferred attack distance do not enter the measure-control modifier.** The contextual damage calculator continues to keep actual Size/Power/Handling weapon ratings as already authorized in the workbook; monster natural attacks retain published damage exactly.

## Monster-attack effective Size policy, not an anatomical claim

Existing `data/monster-attack-context-v0.4.337.json` has **41 sourced natural attacks in 19 monster records**, all with explicitly sourced preferred Close and `contextualWeaponDamageEligible=false`. Other catalogue attacks' preferred measures must not be inferred: the accepted pipeline reports 1,151 unresolved individual attacks. The new design uses:

1. An **identified natural melee attack** lacking a separately source-verified effective control Size uses a **neutral Size 0 fallback solely for calculating size difference**. This is a default for the *attack*, not the monster's body size, reach in feet, or a new per-monster weapon statistic.
2. The fallback is **not evidence of Far point threat or Close ability to follow**. It cannot grant the monster an affirmative reach/pursuit bonus unless independent positional/action evidence exists. `resolveMonsterGroupControl` marks neutral fallback `canClaimSizeAdvantage=false`.
3. When the monster **wields a verified melee weapon**, use that weapon's existing canonical Size rating. Do not apply natural Size 0 to an actual spear, sword, or axe.
4. Breath, missile/projectile and Special deliveries are outside the melee-control Size contract. Absent, unknown-delivery or unverified **weapon** attacks fail closed rather than magically becoming Size 0.
5. If future source review establishes an individual natural attack's reach-equivalent Size, it can be represented by an explicit separately verified attack record. **No such source verification is established by preferredMeasure alone** and no existing creature record was rewritten.
6. A source-verified attack's Close preference can guide a monster's desired Press/Hold/Open *tactic* if the actual attack is legal; it does **not** supply Size, a success bonus, or a damage alteration. Unknown legality stays unknown.

Companion design-only modules:
- `lib/measure-control-symmetric-v0.5.mjs` — **strictly neutral** Normal (nonneutral policy requests rejected), Far long Hold denial, and Close short active pursuit.
- `lib/monster-measure-control-v0.5.mjs` — distinction between verified melee weapon ratings, identified unverified natural attacks with neutral fallback, explicitly source-verified natural reach, and excluded/unknown deliveries.
- `validation/measure-control-monsters-symmetric-v0.5.mjs` — exact cross-product and real sourced monster catalogue assertions.

## Quantitative scenario outcomes

Each probability assumes **two opposed equally distributed d6 initiative results**, equal general mobility, relevant action available, and actual verified attack/pursuit geometry. These are **control transition outcomes**, not duel victory, wound or historical probabilities.

| Scenario | Favored combatant wins | Opponent wins | Tie |
|---|---:|---:|---:|
| Size advantage +0 | 15/36 = 41.67% | 15/36 = 41.67% | 6/36 = 16.67% |
| Advantage +1 | 21/36 = 58.33% | 10/36 = 27.78% | 5/36 = 13.89% |
| Advantage +2 | 26/36 = 72.22% | 6/36 = 16.67% | 4/36 = 11.11% |

For an active **Size +2 spear vs neutral natural Size 0**: the spear holds a verified Far approach with +1, Normal gives neither a control modifier, and at Close the natural attacker cannot assume +1 active follow from its neutral fallback alone. If the monster has a verified ability to follow/pressure in the Close contest, the smaller natural Size 0 attack receives the same conditional +1 against the +2 spear. A Size −2 dagger contesting a neutral natural Size 0 opponent at Close can likewise gain +1 for **verified active pursuit**, but does not magically grapple.

### How much does neutral Size 0 favor weapons against monsters?

Across **29 distinct canonical melee entries** compared with neutral natural attack Size 0:

| Weapon Size difference from 0 | Number of melee roster entries | Potential conditional bonus |
|---|---:|---:|
| 0 | **4** | 0 |
| 1–2 | **21** | +1 |
| 3 | **4** | +2 |

The largest +2 is limited to extreme Size differences (e.g., pike +3, cestus −3); ordinary +1 differences are widespread but **not automatic**. A +1 changes a relevant contest's clean win probability from 41.67% to 58.33%, so it is meaningful rather than negligible. It does not confer attack damage, AC, accuracy, or permanent control. The monster's own neutral fallback does not itself prove a threatening Far weapon or active Close pursuit.

### Multi-round sensitivity: spearman vs source Close-preferring neutral natural attack

Artificial policy: spear Holds at Far, Opens at Normal and Close; monster Presses at all three bands. New opposed initiative each round, one band per opportunity, no damage, attacks, resource cost, changing tactics, blocked movement or other combatants. If the monster is at Close but has no verified pursuit line, its control bonus is zero. With separately verified active following, it can claim +1 against the spear's Open:

| Monster's active Close-follow evidence | Close after 5 rounds | Close after 10 rounds |
|---|---:|---:|
| Unverified — monster cannot claim Size bonus | **23.60%** | **27.96%** |
| Independently verified — +1 Close pursuit | **27.67%** | **35.57%** |

Neither model makes Close inescapable. The effect increases *occupancy after a successful entry*, not initial Far-to-Normal probability. These outcomes depend heavily on the scripted policy and exclude kills or other combat outcomes.

## Verification and integration boundary

The new suite enumerates every one of the **29 × 29 canonical melee-weapon ordered pairs** and every **29 × 41 weapon-versus-sourced-natural-attack matchup**, across **3 bands × 9 intent pairs × 36 raw initiative combinations**. Thus it checks **817,452 weapon states + 1,155,708 monster states = 1,973,160 exact states**. It checks every Normal modifier is zero, legal direction of Close bonus, one-band bound, fighter-label symmetry, sparse/unknown attack contract, preservation of all 41 published damage/preference records, modified initiative totals, and prospective repeated-round distributions. All are **test-only**; the real game has no new rule switched on.

**Unresolved integration blockers:** connected melees with more than two combatants; RAW-phase ordering before all sides move; active threat and active pursuit eligibility from authoritative geometry; effects of actual weapon mastery, multiple monster attacks, charges, mounted monsters, larger reach/anatomy, attack availability, ongoing grapple, retreat/fighting withdrawal; deterministic save/reload and entire native acceptance once a live change is actually authorized. Until then keep draft PR unmerged and v0.4.338 separate.

## Reproduction

```sh
node validation/measure-control-monsters-symmetric-v0.5.mjs
```

Run in the Known World GitHub checkout using Node 24; `.github/workflows/measure-control-design.yml` independently runs it alongside existing design and native-boundary suites. A successful pure evaluation or acceptance workflow on **unchanged production HTML** is not proof that the new rule has been integrated.
