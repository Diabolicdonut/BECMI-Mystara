# Known World — Contextual Weapon Damage: Optional House Rule v0.1

## Formal proposal · 9 October 2026

**Status:** Optional house-rule specification, **not** code implemented, not published RAW, and not empirically playtested. Sections I/K remain the historical/technical exploratory foundation. The table below is the new *operational* proposal; earlier scenario tables are calibration tests, not mandatory outcome tables.

### 1. Goal and rule in one paragraph

The published BECMI weapon die represents normal effectiveness in an ordinary encounter. When **established** weapon, target, positioning and environmental facts create a substantive advantage or disadvantage that the existing rules do **not** already reward, the referee selects one bounded **contextual weapon damage die** from this weapon's row. **Do not adjust the BECMI to-hit roll to simulate this same weapon-context distinction.** The attack uses normal BECMI accuracy/AC; after a hit, roll the selected die plus the actor's otherwise applicable damage bonuses. If no decisive fact exists, the ordinary printed die applies. A weapon's ordinary die is not necessarily the midpoint or its maximum. In particular, the arming sword normally peaks at 1d8, while a dagger can sometimes exceed it after obtaining dominance at grappling distance.

### 2. Five qualitative outcomes

| Rating | Required finding | Consequence |
|---|---|---|
| **Severely restricted** | Only an awkward but still materially damaging contact is physically possible | Use the severe column; no hit if the action is actually impossible |
| **Disadvantaged** | A verified obstacle, distance, angle, or binding prevents an ordinary effective technique | Use disadvantaged column |
| **Normal** | Ordinary melee, or insufficient evidence of decisive differences | Use printed BECMI base die |
| **Favored** | A substantial *established* advantage permits a special technique, attack path, reach control or target interaction | Use favored column |
| **Exceptional** | An unusually strong specialized opportunity is *established*, usually needing both weapon suitability and secured positional/target access | Use exceptional column, capped by weapon |

These are **alternative judgments**, not independently stacking distance, armor, terrain, size, and control modifiers. **Do not upgrade by a tier merely because a player uses vivid descriptive language.** Prefer Normal when relevant spatial/physical facts are unknown. The historical profiles explain what each weapon needs, not what bonus it always gets.

### 3. Provisional operating matrix

| Weapon | Severe | Disadvantaged | **Normal (published)** | Favored | Exceptional | Notes on when high-end may apply |
|---|---:|---:|---:|---:|---:|---|
| Dagger | 1d2 | 1d2 | **1d4** | **1d6–1d8** | **1d10** | 1d6 for meaningful close access; 1d8 only when controlling leverage exists; 1d10 needs dominant restraint **and** vulnerable point access |
| Short sword | 1d4 | 1d4 | **1d6** | 1d8 | 1d8 | Confined usable thrust/cut where a full-length sword is materially impeded |
| Arming sword | 1d4 | 1d6 | **1d8** | 1d8 | 1d8 | A wide normal envelope is its benefit; no automatic increase past printed die |
| Hand axe | 1d2 | 1d4 | **1d6** | 1d8 | **1d10** | Successful short chopping opening and sufficient arc; a shield in the scene alone is not enough |
| Mace | 1d4 | 1d4 | **1d6** | 1d8 | **1d10** | Independently established impact-vulnerable target, not armor AC alone |
| War hammer (1H) | 1d4 | 1d4 | **1d6** | 1d8 | **1d10** | Concentrated impact or beak geometry **only if the specific hammer has it** |
| Spear | 1d2 | 1d4 | **1d6** | 1d8 | **1d10** | Secured point control, suitable approach, clear thrust lane; printed set-vs-charge takes priority |
| Battle axe (2H) | 1d4 | 1d6 | **1d8** | 1d10 | **1d12** | Full chopping clearance and unusually favorable target/strike path |
| Two-handed sword | 1d6 | 1d8 | **1d10** | 1d10 | **1d12** | Effective full technique with exceptional leverage/access; close grip adaptations remain possible |
| Poleaxe | 1d2 | 1d6 | **1d10** | 1d12 | **2d6** | Suitable head/point technique at effective reach, ample clearance, accessible target |
| Halberd | 1d2 | 1d6 | **1d10** | 1d12 | **2d6** | Effective extended geometry for head/spike/hook and suitable exposed target |
| Pike | 1d2 | 1d6 | **1d10** | 1d10 | **1d12** | Secured, unobstructed frontal approach in useful supporting formation; usually its chief advantage is positional, not damage |

**Dagger favored subcase:** The one interval (`1d6–1d8`) is *not* arbitrary per-hit random choice: use `1d6` for simple secured short-range access, `1d8` only for verified substantial but not dominant controlling leverage, `1d10` only for dominant control plus access. This is a deliberately limited refinement of one weapon. The referee must not equate the melee band **Close** with a grapple, or a grapple with dominant restraint.

**Dice ladder:** 1d2 (mean 1.5); 1d4 (2.5); 1d6 (3.5); 1d8 (4.5); 1d10 (5.5); 1d12 (6.5); 2d6 (7). `2d6` changes the minimum and distribution as well as the mean; it is a deliberate high-end proposal, not a universal increment after d12. The two-handed *family* has access to higher peaks where historically warranted, not because two-handed use always grants a bonus (staff is counterexample).

### 4. Decision procedure for a single attack

1. **Authority and mode:** If the attack invokes a specific published damage procedure (set spear vs. charge, lance attack, special monster damage, etc.), apply that rule rather than adding a contextual bump for the same circumstance. CWD and full Arms Across Eras matrix mode are **mutually exclusive** weapon damage modes. Existing BECMI to-hit, AC, strength, magic, and explicit special rules remain authoritative.
2. **Snapshot, before the attack roll:** Resolve the actual equipped weapon, target, declared method, engagement/actual reach, effective Close/Normal/Far melee measure (where used), keyed obstruction/clearance, existing control state, target anatomy/material, and any action/phase restrictions. Do not infer a hidden vulnerable joint, control, displaced shield, or room dimension if not established.
3. **Attack legality:** If no viable damaging technique is possible, deny that technique; never use 1d2 as a trick to permit an impossible attack. Players may propose an alternative action (shorten grip, draw dagger, move, exploit another path) if otherwise legal.
4. **Find a meaningful *unrepresented* difference:** Apply the baseline die unless known circumstances make normal physical effectiveness importantly different and the effect is not already handled by RAW AC, attack rolls, movement, positional resolution, mastery, or a monster's special rule.
5. **One rating:** Select Severe / Disadvantaged / Normal / Favored / Exceptional once from the whole established situation. Read the bounded die from the weapon row. Favor the less extreme ruling when facts are uncertain. Use the dagger subcase only if needed.
6. **Resolve:** Freeze the die **before** rolling to hit. Make the ordinary BECMI attack roll. On a hit, JavaScript rolls the selected die and adds otherwise applicable modifiers in the order prescribed by the active BECMI rule. Do not let the AI roll or alter HP. Do not replace extra effects such as poison, magical properties, damage multipliers or mastery damage with a single contextual die.
7. **Explain and preserve:** Give a brief rationale when a substitution is observable, record original die / context die / established decisive fact / active mode / exception, and end the effect when the circumstance changes. Retain short precedents for consistent future rulings. The AI's suggestion is never sufficient evidence for the condition it asserts.

### 5. Representative rulings and non-rulings

| Situation established by engine/encounter | Result | Reason |
|---|---|---|
| Fighter with sword attacks ordinary armed orc at Normal distance | **1d8** | Sword's ordinary baseline is already its effective peak |
| Dagger fighter enters Close melee but controls nothing | **1d4** (usually) | Close is not equal to grapple/control |
| Dagger fighter has a validated clinch with controlling leverage, but not full dominance | **1d8** | Specific dagger favored subcase |
| Dagger fighter secures dominant restraint **and** accessible vulnerable thrust path | **1d10** | Exceptional dagger niche; setup has already occurred |
| Hand axe hits a defender carrying an intact shield, no special opening | **1d6** | Shield's normal effect already contributes to AC |
| Hand axe has secured shield displacement and unobstructed short chop path | **1d8**, possibly **1d10** if particularly powerful opening established | Its concentrated chopping advantage is meaningful and not mere shield ownership |
| Spearman controls the extended point in a real thrust lane | **1d8** | Favored spear context |
| Spearman is *setting against a charge* under the published maneuver | **Published charge rule**, not contextual 1d8/1d10 on top | Avoid duplicate benefit |
| Sword attacking target merely described as plate armored | **1d8** | AC already affects chance of damaging hit; no extra fact established |
| Poleaxe with free head/point, suitable exposed large target and clear leverage | **2d6** if exceptional physical access truly established | Bounded heavy-weapon peak |
| Pike trapped sideways inside fully obstructed room | **No attack with the proposed point**, or viable low-damage haft move if physically available | Attack legality comes before damage |
| Player says 'I strike expertly at a weak spot,' with no mechanical or described advantage | **Printed die** | Adjectives do not establish circumstances |

**Important target-protection design policy:** Armor Class remains the baseline defense model, so ordinary mail or plate alone never applies an automatic contextual die penalty/bonus. Distinct vulnerability or a *declared and achieved* specialized method might change the damage of a hit. This cautious first implementation preserves BECMI combat math. If the design later intentionally wants weapon-versus-armor modifiers on most attacks, that must be an explicitly different option and audited for the interaction with AC.

### 6. Scope boundaries

- v0.4 **covers these twelve ordinary single-die mundane melee weapons only**; exact class restrictions, weapon readiness, secondary attacks, missile combat, throwing and cross-scale combat remain as separately implemented.
- A weapon with `+1` *printed* base damage, e.g. a bastard sword's `1d8+1`, or with multiple dice such as a heavy crossbow's `2d4`, needs its own row before contextual substitution is enabled. Do not flatten its printed dice automatically.
- Strength, magic and other ordinary damage additions are applied after base die substitution as usual; the weapon's ceiling caps **the base die only**, not total combat damage.
- Weapon Mastery can already change damage and grant maneuvers. For initial integration, do not stack CWD onto a mastery-specific damage benefit from the same attack feature. Test mastery interactions separately before enabling them.
- Successful weapon-control states (grapple, bind, shield displacement, etc.) must be established through an existing or deliberately implemented procedure. **Do not silently create a new grapple check or bonus roll.**
- Contextual damage is optional. Existing BECMI RAW and Arms Across Eras profiles remain available as independent modes; this proposal does not delete any completed engine work.

### 7. AI-to-engine boundary (example proposal only)

```json
{
  "mode": "contextual_weapon_damage",
  "actor_id": "pc_1",
  "target_id": "orc_2",
  "weapon_id": "hand_axe",
  "ordinary_die": "1d6",
  "rating": "favored",
  "selected_die": "1d8",
  "established_evidence": ["shield_displacement_resolved", "short_chop_lane_clear"],
  "duplicate_published_benefit": false,
  "explanation": "The displaced shield leaves room for a committed short axe cut."
}
```

The engine checks exact ids, legality, active rules mode, permitted die, and whether all cited **evidence keys are actually established**; only then may the die be used. It is not sufficient that a language model wrote `shield_displacement_resolved`. Existing scenes that lack measured clearance, binding, or control information default to **Normal** rather than fabricate a favorable condition. This is a proposed interface, not evidence that the current Known World production build already exposes all needed state.

### 8. Implementation checkpoints and acceptance tests

**Checkpoint A — rules toggle/data only:** add `RAW`, `CONTEXTUAL`, `AAE` modes without modifying any existing mode; store 12 profiles, printed baselines, allowed results and human-readable signature strengths. Test the engine exactly preserves RAW/AAE outcomes and base damage when CONTEXTUAL has no proven difference.

**Checkpoint B — bounded adjudication:** provide the AI with a compact scene/weapon profile and allow a context rating proposal. Validate identifiers and permitted dice, check supplied evidence against real engine facts, snapshot the result before the attack roll, and send only the selected die to the deterministic damage roller. Fail closed to printed damage on missing evidence, network failure, ambiguity or invalid proposal.

**Checkpoint C — minimum usable control state:** only where an existing action has a valid procedure, persist factual controls such as confirmed successful grapple level, displaced shield, and temporary attack-path obstruction. Do **not** treat Close melee as an already-established grapple. Preserve declared weapon/movement/action economy.

**Checkpoint D — focused combat and regression tests:** establish that the ordinary sword is 1d8; a dagger remains 1d4 merely by entering Close; control can produce 1d8 and dominance 1d10; hand axe shield case has no passive bonus; spear cannot receive the same charge advantage twice; enclosed poleaxe attack with no path is denied; ordinary plate armor does not auto-penalize sword damage; context mode respects attack rolls, Strength/magic, save/load, special monster damage, and RAW/AAE mode isolation.

**Checkpoint E — playtest balance:** compare number of attacks/rounds and total delivered damage across ordinary short fights, plus costs of acquiring/maintaining favorable positions. A bounded *single-hit* die does not guarantee bounded **encounter-level** advantage if a favorable situation is granted for free every round.

**Final design principle:** *Specific BECMI rule first. Actual established context second. One bounded die substitution third. Normal damage whenever the referee lacks enough evidence.*