# Known World / BECMI — Current Approved Full Delivery Roadmap

**Reviewed 2026-10-27, GitHub main `14f9cfbe9bc96c7f6ea9795e40022caf85045762`.** The latest *accepted game rules checkpoint* remains **v0.4.347**, verified in `pipeline-state.md`, with source-defined Ferocity adjudication and the stated **v0.4.348 conventional natural attack damage** as the next narrow milestone. This review **does not upgrade the game build or alter any BECMI rule**. Large historical audit/design prose (including older builds 0.4.223 and below) is development history; latest `main` and top pipeline record supersede its old "current" headings.

**Finite approved roadmap scope:** Preserve the Mentzer BECMI RAW reference game, the real hex/wilderness/dungeon worlds, natural-language interface, full module-compatible rules, source authority and deterministic native validation, and eventually separate RULES / SETTING / ADVENTURE / AGENCY / REFEREE / UI state layers. The approved wider Design 21 also includes a generic OSR kernel, autonomous parties, AI referee, adventure compiler, procedural grammar and world generation, and hosted multiplayer service. **All are represented; none of the latter is presumed already built.**

**Measure:** 100 weighted approved delivery points. Only fully accepted source-backed gates earn weight. Partial foundations get zero until source acceptance. Roadmap weights are explicit planning judgments, not % code written. Changing scope requires a review; do not treat a new combat checkpoint as completing the future OSR service.

| Delivery gate | Weight | Status | Authority |
|---|---:|---|---|
| Mentzer BECMI RAW core with accepted source-derived adjudication | 12 | accepted | `pipeline-state.md (v0.4.347); validation/` |
| Deterministic saves, migration and extensive native/Chromium acceptance | 8 | accepted | `pipeline-state.md; validation/; .github/workflows/known-world-acceptance.yml` |
| Wilderness, dungeon mapping, true hex and travel continuity | 8 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Context Matrix attack/size/measure and full source-damage parity | 10 | partial | `pipeline-state.md; next v0.4.348` |
| Fully separated rules, setting, adventure and persistence layers | 10 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Independent AI characters with Party/Focus/Spectator control modes | 9 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Referee authority, secure interpretation and source-grounded exceptions | 10 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Validated old-school source adventure compiler and modules | 10 | partial | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Procedural old-school adventure grammar and world forge | 10 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |
| Integrated UX, persistence, multiplayer service and release QA | 13 | planned | `BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md` |

**Overall currently accepted:** 20/100 = **20%**. **Active bounded v0.4.347 Ferocity checkpoint: 1/1 accepted (100%)**, while v0.4.348 remains unimplemented.

**Required next sequence:** Complete the exact v0.4.348 natural-attack damage milestone under existing source/validation boundaries; retain the current huge self-contained HTML game and canonical source untouched during this accounting pass. Then continue source-first narrow combat completion, map architecture, rules extraction and adventure/compiler work as the latest project controller authorizes. Do not replace Mentzer RAW with another edition, fabricate mechanics, convert procedural goals into a fake 100%-complete checkbox, or weaken all ten existing CI acceptance jobs.

**Status UI:** `site-progress.json` is the published read-only scoped manifest, `site-progress.js` is shared with the five other sites. This documentation does not prove manual modern-browser interaction; production Pages/CI are independently required before claiming deployment.
