// One-time acceptance ledger; candidate production bytes remain immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),write=(p,s)=>fs.writeFileSync(p,s);
const sha=s=>createHash('sha256').update(s).digest('hex');
function once(s,a,b){
 assert.equal(s.split(a).length,2,'Missing/duplicate acceptance anchor: '+a.slice(0,90));
 return s.replace(a,b);
}
const html=read('index.html');
const production='eba6c44757003104f32f2e2fa0a6a2c30cdd37a456a3695a36d480eddb80b48b';
assert.equal(sha(html),production);
assert(html.includes("const APP_VERSION='0.4.337';"));
const manifest=JSON.parse(read('validation/manifests/v0.4.337.json'));
assert.equal(manifest.version,'0.4.337');
assert.equal(manifest.acceptedVersion,'0.4.336');
assert.equal(manifest.productionSha256,production);
assert.equal(manifest.core.length,2316);
assert.equal(manifest.focused.length,1232);
manifest.acceptedVersion='0.4.337';
write('validation/manifests/v0.4.337.json',JSON.stringify(manifest,null,2)+'\n');

let audit=read('audit.md');
audit=once(audit,'Build: **0.4.336**','Build: **0.4.337**');
const entry=[
 '## v0.4.337 — Per-attack natural-attack preferred measures, schema/data only',
 '',
 '**Qualifying candidate:** 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f, complete qualifying green required [Actions run 39056696281](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39056696281), ten jobs passed. **Core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 508/508 on reference v0.4.333 and this candidate**, ordered once-only coverage, exact production boot, browser/native reload and isolation, zero page/runtime/console/network errors. The historical 523-runner remains historical, not rerun. The acceptance-metadata commit and authoritative main each independently require further green CI. v0.4.337 exact production SHA-256: '+production+'.',
 '',
 '**Source/data boundary:** source-verified individual natural attack metadata added to 41 attacks in 19 canonical profiles, each guarded by exact source profile record ID, individual attack index, name and unchanged printed damage. All 628 runtime monster profiles remain; 1151 other runtime attack entries retain unknown/unresolved preferred measure. New attackContext holds natural delivery, Close preference, unknown legalMeasures=null, false contextualWeaponDamageEligible, High confidence and governing BECMI citation. Provisional records, family/alias rows, ambiguous alternatives and unsupported reach have no fabricated metadata. The 600-entry authoritative catalogue is not rewritten. Runtime catalogue tests proved exactly 41 actual enriched attacks, 1151 unresolved, spawn cloning, JSON roundtrip and real browser reload.',
 '',
 '**No live combat change:** natural attacks retain published/source damage with no Measure/Size/Protection/Space adjustments. Live monster movement, attack legality, targeting, AI, PCs/NPCs, RAW/AAE/CONTEXT_MATRIX current damage, special attacks and RNG/time/resources are unchanged. Pure v0.4.336 calculator untouched and disconnected from live combat. External test fixture is ephemeral, never in production. The 46 weapon profile calibration and existing rule toggles persist.',
 '',
 '**Next checkpoint only by separate user authorization:** v0.4.338 live Context Matrix damage integration for explicitly eligible canonical weapon hits, never natural attacks; preserve RAW/AAE, original dice and all other source/RPG effects. Ordinary Cureall/parser source closure and cartography remain separate/deferred.',
 '',
 ''
].join('\n');
audit=once(audit,'## v0.4.336 — Pure Context Matrix calculator only',entry+'## v0.4.336 — Pure Context Matrix calculator only');
write('audit.md',audit);

let pipeline=read('pipeline-state.md');
pipeline=once(pipeline,
 'Current accepted build: **v0.4.336**. Newly accepted checkpoints in this Chat continuation: **2**.',
 'Current accepted build: **v0.4.337**. Newly accepted checkpoints in this Chat continuation: **3**.');
pipeline=once(pipeline,
 'Current candidate: **work/v0.4.337 — NOT ACCEPTED**. Per-attack preferred-measure metadata only; authoritative main remains v0.4.336. Await full CI.',
 'Current candidate: **none**. Source-verified natural attack measure enrichment accepted; no live contextual damage.');
pipeline=once(pipeline,
 'Exact next checkpoint: **v0.4.337 — per-attack natural-attack preferred-measure schema/data enrichment only**.',
 'Exact next checkpoint: **v0.4.338 — live Context Matrix weapon-damage integration** (not started; requires user continuation).');
pipeline=once(pipeline,
 '**v0.4.337 candidate (NOT ACCEPTED):** 19 canonical source-verified profile candidates, 41 guarded individual natural attacks (Close only). Unknown reach, alternative and provisional profiles remain unresolved. Original attack expressions, natural damage, live combat, calculator and mode rules unchanged. Candidate production SHA-256 '+production+'.',
 '**v0.4.337 ACCEPTED:** 19 source-verified canonical profiles; 41 actual individual natural attacks enriched with a Close preference, 1151 other attacks left unresolved; 628 total runtime profiles. All damage remains published RAW; no live Context Matrix calculation. Candidate 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f qualified by all ten required successful jobs, https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39056696281. Core 2316/2316, focused 1232/1232, Chromium 579/579 x 4, native v2 508/508 on both reference and candidate. Exact production SHA-256 '+production+'. Acceptance metadata and main each must also pass their own exact SHA CI.');
pipeline=once(pipeline,
 '**Next:** v0.4.337 preferred-measure schema/data enrichment only; live weapon-damage integration is a separate later checkpoint (tentatively v0.4.338).',
 '**Next:** v0.4.338 live Context Matrix weapon-damage integration only after user continuation. Natural attacks retain RAW damage.');
pipeline=once(pipeline,
 '3. **v0.4.337 NEXT (not started):** per-attack preferred-measure schema/data enrichment only. Live Context Matrix weapon-damage integration is separately deferred (tentatively v0.4.338).',
 '3. **v0.4.337 ACCEPTED:** 41 source-verified attacks across 19 canonical profiles; 1151 other attack measures unknown; damage/AI/legal movement unchanged.\n4. **v0.4.338 NEXT (not started):** live Context Matrix damage on eligible explicit weapon hits only, with natural attacks excluded. Requires user continuation.');
write('pipeline-state.md',pipeline);
write('validation/README.md',read('validation/README.md')+
 '\n## v0.4.337 accepted metadata-only natural attack measures\n\nCandidate 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f passed all ten required jobs on run 39056696281. Core 2316/2316, focused 1232/1232, four fresh Chromium slices 579/579 each, Native Acceptance v2 508/508 on reference and candidate, ordered coverage and native boot green. Sidecar plus runtime fixture independently prove 41 natural attacks enriched across 19 canonical profiles, 1151 unresolved attack measures across 628 profiles, unchanged damage and serialized/reloaded attack metadata. Full CI must pass on acceptance-ledger commit and merged main before promotion is final. The historic 523 test remains historical.\n');
console.log('Accepted v0.4.337 metadata staged; production unchanged SHA-256 '+production);
