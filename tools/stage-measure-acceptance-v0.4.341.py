#!/usr/bin/env python3
"""Stage v0.4.341 exact-candidate accepted metadata, not main promotion."""
from pathlib import Path
import json,hashlib
expected='14ae01ddd53fd10f67d554baa3641446e950b945f24525552920c34a4c69381d'
actual=hashlib.sha256(Path('index.html').read_bytes()).hexdigest()
assert actual==expected,(actual,expected)
manifest_path=Path('validation/manifests/v0.4.341.json')
m=json.loads(manifest_path.read_text())
assert m['version']=='0.4.341' and m['acceptedVersion']=='0.4.340' and m['productionSha256']==expected
m['acceptedVersion']='0.4.341'
manifest_path.write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n')
audit_path=Path('audit.md')
audit=audit_path.read_text()
assert audit.count('Build: **0.4.340**')==1
audit=audit.replace('Build: **0.4.340**','Build: **0.4.341**',1)
anchor='## v0.4.340 — Pairwise independent Measure'
assert audit.count(anchor)==1
entry="""## v0.4.341 — Original unmodified initiative dice and revised pairwise Size Measure (accepted metadata; main promotion pending)

**Authoritative source:** Fully green v0.4.340 main at `9b7b231f1975a6fba79fceb95351a8b24b0ed31e`. Work-branch exact accepted v0.4.341 candidate `80090b7d10bc6d5f370a25676898d60b5c397ad2`, qualified by the full ten-job [Actions run 39173183744](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39173183744) and dedicated 1,080-combination native-browser [Measure gate 39173183775](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39173183775). Production `index.html` SHA-256: `14ae01ddd53fd10f67d554baa3641446e950b945f24525552920c34a4c69381d`. Full 2316/2316 core, 1232/1232 focused, 579/579 fresh Chromium in each of four independent slices, Native Acceptance v2 508/508 accepted reference and 508/508 candidate; exact production boot, context-matrix isolation, six-goblin swarming, independent pairwise contests, barriers, save/reload and once-only state passed. Historical 523 is not a rerun.

**Bounded implementation:** Each ordinary initiative side captures its actual existing, unmodified 1d6 in `initiative.rawRolls` at the same single RNG draw; modified `initiative.rolls`, all original combat phase ordering, side modifiers and special effects stay unchanged. Independent opposing pair Measure comparisons use the original d6 plus 0, 1, 2 or 3 Size points for absolute weapon Size difference 0, 1, 2 or 3+. Advantage remains longer active Hold against Press at Far, nobody at Normal, shorter active Press against Open at Close. Ties retain Measure. No extra RNG, rounds or free attack. Source-identified monster natural attacks use neutral Measure Size 0 solely for control; published natural damage and all other special procedures remain unchanged. Unknown or absent dice from a legacy mid-round save cannot be inferred by subtracting bonuses and do not produce fabricated changes until a new actual initiative roll. Deterministic first-contact, geometry, real barriers, independent pairing, and unlimited physically legal attackers remain untouched.

**Test-only fixture correction:** Two pre-existing embedded core fixtures supplied only synthetic adjusted initiative totals and previously assumed they could be used as raw dice. Their setup now explicitly supplies corresponding unmodified `rawRolls` without deleting or renaming their original tests or changing their existing expected outcomes. Both original core checks and all fresh browser suites passed.

**Acceptance boundary:** This record is staged on the v0.4.341 work branch; an independently green exact-SHA acceptance-metadata run and a separately green merged-`main` run are still mandatory. Do not claim final promotion from the candidate run alone.

**Next independent acceptance dependency:** v0.4.342 — make genuinely authentic Mentzer BECMI RAW **combat procedures** separately selectable and mechanically isolated from optional contextual Measure, Zone of Influence and positioning, while retaining independent RAW/CONTEXT_MATRIX/AAE damage modes and existing initiative settings. The current inherited `BECM RAW PROCEDURES` preset does **not** yet suppress live Measure and must not be misreported as full RAW combat. Retain old saves, preserve defaults under the new explicit selector as governed by the user's RAW-safe requirement, and validate actual combat, movement, action economy, specials and mode-switch isolation before acceptance. Then resume deferred persistent local-scene coordinate/state foundation with no graphics.

"""
audit=audit.replace(anchor,entry+anchor,1)
audit_path.write_text(audit)
pipeline_path=Path('pipeline-state.md')
p=pipeline_path.read_text()
assert '**v0.4.341 CANDIDATE — NOT ACCEPTED:**' in p
start=p.index('**v0.4.341 CANDIDATE — NOT ACCEPTED:**')
end=p.index('\n\n',start)
p=p[:start]+"""**v0.4.341 ACCEPTANCE METADATA STAGED — NOT YET PROMOTED:** Exact candidate `80090b7d10bc6d5f370a25676898d60b5c397ad2` passed ten-job [required CI 39173183744](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39173183744) and dedicated 1,080-case [original-d6 Measure native gate 39173183775](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39173183775). Source-pinned production SHA-256 `14ae01ddd53fd10f67d554baa3641446e950b945f24525552920c34a4c69381d`. Full 2316 core, 1232 focused, four 579 Chromium slices, Native Acceptance v2 508 both immutable reference and candidate, all green. The accepted metadata commit and merged main must each pass their own exact-SHA ten-job CI before final promotion. v0.4.341 is narrowly limited to original raw initiative d6 capture and 0/1/2/3 capped relative Size Measure; existing modified initiative order, 46 source profiles, natural RAW damage, six-attacker swarming and all other game behavior preserved. **Next distinct mandatory v0.4.342:** independently selectable truly pure BECMI RAW combat **procedures** with contextual Measure, ZOI, eligibility and action restrictions fully inactive in RAW mode, preserving separate weapon damage choices and save migration. Current old `BECM RAW PROCEDURES` preset does not suppress live Measure. Then deferred local-scene persistent spatial state; no graphics."""+p[end:]
assert 'Current accepted build: **v0.4.340**' in p
p=p.replace('Current accepted build: **v0.4.340** (staged on the work branch only; until merged and main CI passes, main remains at v0.4.339).',
           'Current accepted build: **v0.4.341** (acceptance metadata staged on work branch; main remains at fully green v0.4.340 until promotion and its own required CI).',1)
assert '**Current fully accepted main:** v0.4.339 at' in p
p=p.replace('**Current fully accepted main:** v0.4.339 at `389c3d928b7a3c61dec546997fca99cd78b8684a`. This supersedes historical pending-promotion notes below. Preserve v0.4.339\'s Size rule until a separately tested and accepted replacement.',
            '**Current fully accepted main:** v0.4.340 at `9b7b231f1975a6fba79fceb95351a8b24b0ed31e`, required main CI [39161439921](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39161439921) green. Candidate v0.4.341 cannot become main until its own acceptance-metadata CI is green.',1)
assert '**Approved NEXT checkpoint after accepted v0.4.340:**' in p
p=p.replace('**Approved NEXT checkpoint after accepted v0.4.340:**',
            '**v0.4.341 implemented and qualified on branch (not yet final main):**',1)
p=p.replace('**After v0.4.341 acceptance:** resume controller\'s deferred persistent authoritative local-scene coordinate/state foundation independently; no premature map graphics.',
            '**After v0.4.341 acceptance:** v0.4.342 pure BECMI RAW combat-procedure isolation and mode selection first; then resume the deferred persistent authoritative local-scene coordinate/state foundation independently, no premature map graphics.',1)
pipeline_path.write_text(p)
print('Staged v0.4.341 acceptance metadata, source pinned',expected)
