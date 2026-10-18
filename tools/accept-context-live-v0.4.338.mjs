// One-time v0.4.338 acceptance metadata only, preserving qualified production bytes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),write=(p,s)=>fs.writeFileSync(p,s),sha=s=>createHash('sha256').update(s).digest('hex');
function once(s,a,b){assert.equal(s.split(a).length,2,'Missing/duplicate v0.4.338 acceptance anchor: '+a.slice(0,100));return s.replace(a,b);}
const production='b47b9828c657e01cfbef25df3711b9da46931220e5a68a2467262bb86160af33';
const qualifiedCandidate='134c7ddf3521cb5423edda21dc4cc5a81277566b';
const greenRun='39082900442';
const html=read('index.html');
assert.equal(sha(html),production,'Qualified v0.4.338 production HTML changed');
assert(html.includes("const APP_VERSION='0.4.338';"));
const manifest=JSON.parse(read('validation/manifests/v0.4.338.json'));
assert.equal(manifest.version,'0.4.338');assert.equal(manifest.acceptedVersion,'0.4.337');
assert.equal(manifest.productionSha256,production);
assert.equal(manifest.core.length,2316);assert.equal(manifest.focused.length,1232);
manifest.acceptedVersion='0.4.338';
write('validation/manifests/v0.4.338.json',JSON.stringify(manifest,null,2)+'\n');
let audit=read('audit.md');
audit=once(audit,'Build: **0.4.337**  \n','Build: **0.4.338**\n');
const entry=[
 '## v0.4.338 — Live Context Matrix weapon damage only (visual/spatial work deferred)',
 '',
 '**Qualifying candidate:** '+qualifiedCandidate+', independently passed all ten required jobs in [Actions run '+greenRun+'](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/'+greenRun+'). Production HTML SHA-256 **'+production+'**. Core **2316/2316**, focused **1232/1232**, fresh Chromium **579/579 ×4**, native boot and supplemental contextual combat/save-reload browser tests green, Native Acceptance v2 **508/508 on the immutable v0.4.333 reference and 508/508 on the v0.4.338 candidate**, required ordered coverage and once-only isolation passed. Zero reported page/console/network errors. The acceptance-metadata commit and later merged main must each separately pass their exact-SHA CI before publication is finally verified.',
 '',
 '**Exact live damage contract:** CONTEXT_MATRIX weapon damage uses the single byte-equivalent embedded v0.4.336 verified pure deterministic calculator. On successful eligible ordinary weapon hits, actual existing BECMI weapon dice and applicable RAW bonuses, mastery, charge, backstab and other extant effects are preserved. The context signed modifier is added exactly once after the existing weapon-damage pipeline, with the existing 0 floor unchanged. No new 1-point successful-hit minimum is asserted; that rule remains explicitly unresolved. Calculator calibration retains Excel-style rounding, six weapon range profiles and the −3…+3 cap; 46 canonical weapons and 36 verified workbook reference conditions remain established.',
 '',
 '**Authoritative contextual inputs and fail-neutral:** actual target Size and physical Protection require a source-verified resolved canonical monster record or an explicit encounter/actor override; dynamic Size is honored on resolved profiles. Physical Protection is never inferred from AC, HD, supernatural immunity or saving throws. Melee Measure uses the authoritative engagement state. Ordinary canonical missile weapons use the existing resolved shot range band only when the actual physical combat distance is known. Space must be explicitly established by combat/encounter state; contact alone never implies Restricted. Missing Size, physical Protection, Measure, Space or weapon profile returns neutral, not a guess. No invented double-penalty.',
 '',
 '**Absolute natural attack isolation:** all published animal/anatomical/supernatural attack damage is left untouched. Bite/claw/fist/horn/tail/constriction/slam/engulf/breath/gaze/poison/natural projectiles, nonnumeric Special and sources with their own rules never pass through the contextual weapon path. The previously accepted 19 monster profiles and 41 per-attack preferred Measure facts remain metadata-only; 1151 unresolved attacks remain unresolved, all 628 runtime monster profiles preserved. A monster carrying and actually wielding an explicitly canonical normal weapon is eligible, via the same calculator as a PC. RAW and AAE modes retain their previous damage/RNG behavior.',
 '',
 '**Deterministic trace and persistence:** eligible/context-neutral Context Matrix weapon attacks record weapon and rolled expression, base roll, RAW-adjusted damage, physical target Size/Protection with source, true Measure, explicit Space, eligibility/reason, signed modifier, final result and active mode. Real browser tests checked positive +3 and negative −3 live PC weapon hits, ordinary missile eligibility, armed monster hit, natural attack exclusion, RAW/AAE isolation, context unknowns, AC/immunity independence and real mode/Space save-reload. No SVG, local geometry, tokens, fog, maps or Smoking Pillar content conversion was included.',
 '',
 '**Next checkpoint:** v0.4.339 — persistent authoritative local-scene coordinate/state foundation, strictly separate from presentation and player map knowledge/belief/perception. Then formal Party vs Individual Scale, formation, scene geometry, monochrome SVG, counters, viewport, continuous combat overlay, visibility/LOS/fog and interface. Only afterward The Smoking Pillar of Lan Yu / Kai Besil may test the entire vertical slice. Ordinary Cureall/parser source closure remains separate.',
 '',
 ''
].join('\n');
audit=once(audit,'## v0.4.337 — Per-attack natural-attack preferred measures, schema/data only',
entry+'## v0.4.337 — Per-attack natural-attack preferred measures, schema/data only');
write('audit.md',audit);
let pipeline=read('pipeline-state.md');
pipeline=once(pipeline,
 'Current accepted build: **v0.4.337**. Newly accepted checkpoints in this Chat continuation: **3**.',
 'Current accepted build: **v0.4.338**. Newly accepted checkpoints in this Chat continuation: **4**.');
pipeline=once(pipeline,
 'Current candidate: **work/v0.4.338 — NOT ACCEPTED**. Live Context Matrix weapon integration awaits required CI; authoritative main is still v0.4.337.',
 'Current candidate: **none**. v0.4.338 source-pinned Context Matrix live weapon candidate qualified and accepted; main merge/CI verification remains required.');
pipeline=once(pipeline,
 'Exact next checkpoint: **v0.4.338 — live Context Matrix weapon-damage integration** (candidate, NOT ACCEPTED).',
 'Exact next checkpoint: **v0.4.339 — persistent authoritative local-scene coordinate/state foundation only** (not started).');
const candidateLine=pipeline.split('\n').find(x=>x.startsWith('**v0.4.338 candidate (NOT ACCEPTED):**'));
assert(candidateLine&&candidateLine.includes(production));
pipeline=once(pipeline,candidateLine,
 '**v0.4.338 ACCEPTED (pending main verification):** qualified candidate '+qualifiedCandidate+', green [required Actions '+greenRun+'](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/'+greenRun+') with all ten jobs. Production SHA-256 '+production+'. Core 2316/2316, focused 1232/1232, Chromium 579/579 x4, Native Acceptance v2 508/508 both immutable reference and candidate. Verified live PC ±3, armed monster, missile hit, RAW/AAE isolation, unchanged natural damage and source-specific attacks, unknown fail-neutral, serialized context, true browser reload. No new minimum-one floor. No graphics. Acceptance metadata and main both separately need green CI.');
pipeline=once(pipeline,
 '**Next:** v0.4.338 live Context Matrix weapon-damage integration only after user continuation. Natural attacks retain RAW damage.',
 '**Next:** v0.4.339 authoritative persistent local-scene coordinates/state, no SVG or Smoking Pillar conversion yet. Natural attacks retain RAW damage.');
pipeline=once(pipeline,
 '4. **v0.4.338 NEXT (not started):** live Context Matrix damage on eligible explicit weapon hits only, with natural attacks excluded. Requires user continuation.',
 '4. **v0.4.338 ACCEPTED:** live contextual damage on eligible canonical melee/missile weapons only. Natural attacks, RAW and AAE preserved.\n5. **v0.4.339 NEXT (not started):** persistent local-scene authoritative physical coordinates, separate from player map knowledge, belief, perception and presentation; no graphics in the preceding v0.4.338 checkpoint.');
write('pipeline-state.md',pipeline);
write('validation/README.md',read('validation/README.md')+
 '\n## v0.4.338 accepted metadata — live eligible weapon damage\n\nQualified candidate '+qualifiedCandidate+' passed all ten required checks on https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/'+greenRun+'. Core 2316/2316, focused 1232/1232, Chromium 579/579 x4, Native Acceptance v2 508/508 on reference and candidate, ordered coverage green. Exact production SHA-256 '+production+'. The unchanged accepted calculator is embedded verbatim. Mode isolation, natural exclusion, live PC positive and negative hits, armed monster, canonical missile, unknown neutrality, trace and true Space/mode save-reload were verified. Minimum-one floor unresolved, no introduced rule. Full acceptance-metadata commit and merged main CI still required; no visual/spatial content added.\n');
console.log('Prepared v0.4.338 acceptance ledger, immutable production SHA256 '+production);
