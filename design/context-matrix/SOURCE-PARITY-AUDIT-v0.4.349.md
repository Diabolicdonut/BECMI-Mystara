# v0.4.349 — Contextual Combat Source-Parity Closure Audit

**Status: candidate audit, NOT an accepted gameplay build.** Reviewed 2026-10-28 against accepted `main` `7e212e878575df9365907f6532c4fcda07265dd9`. The playable game remains **v0.4.348**; its accepted branding-only production SHA-256 is `9bdef333cfb208dbcd4ca4e4eba1baa06f1f113cd6e6be9a4a0c8906764ea8a3`. This document does not authorize a new combat modifier, set a new default, or increase the 20/100 whole-product score.

## Governing authority

1. Mentzer BECM RAW controls original combat, creature attacks and source-specific effects. Compatible Rules Cyclopedia is secondary when consistent; the module's own rules control its variants.
2. The 2026-10-19 user-authorized [contextual combat completion](CONTEXTUAL-COMBAT-COMPLETION-2026-10-19.md) defines the **opt-in** overlay; accepted v0.4.343–348 gates implement separate surprise, directional coverage, physical clearance, current-Measure Size, Ferocity, and physical natural proximity policies.
3. [Original workbook-derived Context Matrix](README.md) governs manufactured weapons. The workbook source is not interchangeable with speculative Atlas/v0.1 suggestions; creature natural attacks never enter its damage calculator.
4. These counts and runtime invariants come from the accepted repository's machine-readable source sidecars, checked against the exact production HTML. They **do not establish** that each printed Mentzer or module page has been reread independently during v0.4.349.

## Reproducible source inventory (baseline)

| Evidence boundary | Verified repository finding | Limits |
| --- | --- | --- |
| `data/context-matrix-weapon-profiles.json` | **46** canonical workbook weapon profiles | Manufactured-weapon matrix only; no natural-attack inference |
| `data/monster-attack-context-v0.4.337.json` | **19** source-verified Mentzer Basic profiles, **41** source-indexed anatomical attack slots | Not every BECMI creature or attack; no blanket extrapolation |
| Same sidecar's audit counters | **494** `sourceExcludedCount`, **57** `ambiguousRecordCount` | These are source-ledger category counts, not a denominator for monster-completion % |
| Additional accepted native Measure fact | `wolf_normal`, MON-0104, one `1d6` bite, Mentzer Basic p.39; compatible RC p.212 | Separate **single** source-verified exception, not a wildcard for other wolves |
| `FEROCITY-CONTRACT-v0.4.347.md` | Five individually approved identities: wolf, black bear, grizzly bear, boar, exceptional berserker | Ferocious is user-authorized contextual interpretation, not a published creature stat |
| `contextualNaturalProximityPacket` in `index.html` | Current **Far −1 / Normal 0 / Close +1** for source-matched conventional physical natural hits, independently per successful packet | Never changes poison/special damage, manufactured weapon effects, ordinary attack rolls, or pure RAW |

The 41 certified slots are index-specific rather than generic “monster natural” types. They include claws/bites for the four sourced bear entries, large cats, owl bear, gargoyle, spiders, giant beetles and other expressly annotated Basic entries. Their source/page, record ID, attack index, attack name, exact dice and original `attackContext` provenance matter; an altered attack or saved override cannot inherit eligibility merely from its name.

## Boundaries reviewed in accepted execution

- **Mode isolation:** pure BECMI RAW and unknown combat procedure fail neutral before natural proximity changes damage. Current contextual combat still requires active combat and an established pairwise melee Measure.
- **Weapon/natural separation:** the live call passes `weaponAttack:ordinaryWeapon` to the separate natural policy. Natural sidecar entries explicitly have `contextualWeaponDamageEligible:false`, and the verified wolf fallback is individually source/payload matched.
- **Source identity:** exact profile, original attack array slot, canonical source/page and attack name/dice are checked at the hit. Unknown, missing, contradictory or modified evidence fails neutral. The accepted wolf exception requires both original and live metadata to be absent, not fabricated.
- **Damage boundaries:** normal band stays original damage; positive or negative one-point adjustments are applied to the existing resolved physical packet, never by extra dice or attack rolls. Non-negative damage retains the accepted `Math.max(0, ...)` behavior. A poison rider or special effect is not itself a certified physical packet.
- **Separate positional mechanics:** current-Measure Size, Ferocity, surprise, facing/coverage and oversized weapon clearance already have independent accepted gates. This audit does not convert their rule boundaries into new natural-attack reach restrictions or an additional attack.
- **Persistence:** unchanged exact production source, native save/reload, sparse values, nonnumeric Special and existing native/Chromium regressions remain required. The audit script is a read-only source/production cross-check; it cannot substitute for dynamic gameplay tests.

The executable guard `validation/contextual-source-parity-v0.4.349.mjs` compares the two exact committed source JSON payloads with the **embedded** game payloads, verifies distinct provenance for all 41 audited attack slots, checks the individually identified wolf record, and verifies the accepted natural-policy boundaries. It records the current production SHA-256 and counts in `validation/results/contextual-source-parity-v0.4.349.json`. It intentionally does **not** certify unknown source material or simulate combat: earlier full deterministic, four fresh Chromium, native and save/migration gates remain mandatory.

## Open source-parity work — not silently completed

1. **Expand source review, not inferred eligibility.** Remaining excluded, ambiguous and not-yet-audited monster attacks require original source/page review, distinct physical damage versus special rider analysis, exact attack-index/dice matching, source precedence and regression scenarios before adding another eligible attack. No mass conversion.
2. **Address genuine source exceptions independently.** Other natural attack forms, effects, and module variants may combine physical and nonphysical components. Preserve printed special procedures rather than using visual/anatomical naming heuristics. A proposed individual exception must receive its own authorization, test fixture and acceptance.
3. **Close live parity by evidence.** Full contextual-combat workstream parity is still **partial** under the 100-point roadmap. The 46 verified weapons and existing accepted optional mechanic slices do not prove all original Master/Companion, module or monster edge cases, extended campaign integration, or broad game balance.
4. **Then return to physical scene-state work.** The roadmap next calls for a persistent authoritative local-scene physical model, separate from what each character knows or perceives. No graphics or alternate setting is part of this audit.

## v0.4.349 audit acceptance criteria

- `node validation/contextual-source-parity-v0.4.349.mjs` passes, with both source JSON payloads matching production exactly and expected non-inferred counts/provenance.
- This read-only gate is added to the **existing ten-job** GitHub acceptance workflow without removing or weakening other jobs; both branch and PR runs must pass.
- Accepted production `index.html` bytes and their pinned manifest remain unchanged; gameplay display stays v0.4.348 and the full-product percentage stays 20/100.
- Audit, pipeline and development roadmap are kept consistent about **source audit vs. gameplay implementation**, with final acceptance evidence added only after CI. Merge only after reviewed full checks, then verify exact main CI and Pages.

**Next decision after this audit:** choose *one* genuinely unverified source-specific parity case and obtain/record the necessary bounded rule/data authorization before modifying gameplay; otherwise proceed with the already-approved physical scene-state dependency. Do not describe this source audit as the completion of the Context Matrix delivery gate.
