import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
// One-time deterministic acceptance script; only APP_VERSION changes in production.
const get=p=>fs.readFileSync(p,'utf8'), save=(p,s)=>fs.writeFileSync(p,s);
const sha=s=>createHash('sha256').update(s).digest('hex');
function once(s,a,b){assert.equal(s.split(a).length,2,'Expected exactly one '+a);return s.replace(a,b);}
const original=get('index.html');
assert.equal(sha(original),'76b726460d98cf2cf49947ba2aba419a12f5d2c481e02d19c508a512778ba7a5');
const updated=once(original,"const APP_VERSION='0.4.335';","const APP_VERSION='0.4.336';");
assert.equal(updated.length,original.length);
const hash=sha(updated);
assert.equal(hash,'c74c2f529566b957a0550178c4d5f51d5164ba67e4658e07d3e7dedb02daaf7d');
const m=JSON.parse(get('validation/manifests/v0.4.335.json'));
assert.equal(m.version,'0.4.335');assert.equal(m.acceptedVersion,'0.4.335');
assert.equal(m.productionSha256,sha(original));
assert.equal(m.core.length,2316);assert.equal(m.focused.length,1232);
const next={...m,version:'0.4.336',acceptedVersion:'0.4.336',productionSha256:hash};
let mode=get('validation/context-matrix-mode.mjs');
mode=once(mode,"const APP_VERSION='0.4.335';","const APP_VERSION='0.4.336';");
let audit=get('audit.md');
audit=once(audit,'Build: **0.4.335**','Build: **0.4.336**');
const entry=[
'## v0.4.336 — Pure Context Matrix calculator only',
'',
'**Qualifying candidate:** eb483c7399b9e3836e943512e2834925ed760c0e, successful required Actions run https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39000565428 (ten required jobs green). Core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 33 scenarios and 508/508 assertions on baseline and candidate; ordered coverage, exact production boot and save/reload all green. The acceptance-metadata commit and authoritative main must each independently pass required CI before promotion. Exact v0.4.336 production SHA-256: '+hash+'.',
'',
'**Scope:** isolated pure deterministic lib/context-matrix-calculator.mjs with workbook Size/Power/Protection/Range response, reference Power subtraction, two source steps per damage point, Excel ROUND ties away from zero, Restricted-only whole-point Handling and -3 to +3 clamp. The new required validation/context-matrix-calculator.mjs test covers all 36 workbook Spear reference conditions, each of the 46 canonical profiles across 36 condition combinations, six range families, positive/negative rounding boundaries, clamps, Nil and unknown/malformed neutrality and natural attack exclusions. Only the APP_VERSION marker changes in production HTML: no live caller, new damage, attack-roll/AC, RNG/time/resource or save/migration changes. RAW and AAE combat are unchanged.',
'',
'**Natural-attack binding rule:** each individual attack may later carry delivery, preferredMeasure, legalMeasures and contextualWeaponDamageEligible; natural, breath, projectile and special attacks never take Context Matrix weapon modifiers, despite tactical preferred measures. Published natural damage remains RAW. An armed monster using a normal weapon follows weapon rules. No Protection from AC or supernatural immunity; use actual current target Size and resolved physical Protection, never placeholder guesses; adjacency does not imply Restricted. Contract documented without catalogue rewrite.',
'',
'**Next isolated checkpoint:** v0.4.337 per-attack preferred-measure schema/data enrichment only. Live Context Matrix weapon-damage integration remains separately deferred (tentatively v0.4.338). Ordinary Cureall parser/fallback, monster AI and hidden cartography are unchanged and deferred.',
'',
''
].join('\n');
audit=once(audit,'## v0.4.335 — Context Matrix data/mode only',entry+'## v0.4.335 — Context Matrix data/mode only');
let pipeline=get('pipeline-state.md');
pipeline=once(pipeline,'Current accepted build: **v0.4.335**. Newly accepted checkpoints in this Chat session: **1**.',
 'Current accepted build: **v0.4.336**. Newly accepted checkpoints in this Chat continuation: **2**.');
pipeline=once(pipeline,
 'Current candidate: **work/v0.4.336 — NOT ACCEPTED**. Pure Context Matrix calculator and natural-attack boundary only; live combat and accepted main remain unchanged. Candidate validation underway.',
 'Current candidate: **none**. Pure calculator accepted in isolation; no live contextual damage.');
pipeline=once(pipeline,'Exact next checkpoint: **v0.4.336 — Context Matrix pure deterministic calculator only**.',
 'Exact next checkpoint: **v0.4.337 — per-attack natural-attack preferred-measure schema/data enrichment only**.');
const evidence=[
'',
'**v0.4.336 acceptance:** candidate eb483c7399b9e3836e943512e2834925ed760c0e, qualifying green https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39000565428. Ten required jobs passed, core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 508/508 both baseline and candidate. Exact production SHA-256 '+hash+'. Acceptance metadata and authoritative main each require new green CI. Only APP_VERSION changes in production HTML. Pure calculator is unconnected to live combat and validates all 36 workbook references, 46 weapon profiles across all 36 contexts, six range families, rounding, clamps, Nil/unknown safety and natural exclusions.',
'',
'**Binding monster-attack rule:** preferred Measure belongs to each attack for positioning/availability/AI, NEVER published natural attack damage. Natural/breath/projectile/special attacks are ineligible for Context Matrix; armed monster weapon attacks are eligible. No inferred Protection from AC/immunity, target Size from provisional rows or restricted Space from adjacency. See design/context-matrix/MONSTER-ATTACK-MEASURE-CONTRACT.md.',
'',
'**Next:** v0.4.337 preferred-measure schema/data enrichment only; live weapon-damage integration is a separate later checkpoint (tentatively v0.4.338).',
'',
''
].join('\n');
pipeline=once(pipeline,'## Accepted game and validation\n','## Accepted game and validation\n'+evidence);
pipeline=once(pipeline,
 '2. **v0.4.336 NOT STARTED:** pure deterministic Context Matrix calculator only: exact Size/Power/Range/Handling conversions, workbook reference/rounding, −3…+3 clamp, neutral unknown facts. No live-damage integration. Begin only after the user explicitly says **continue**.',
 '2. **v0.4.336 ACCEPTED:** independently tested pure calculator with all workbook cases, no live damage, natural attacks excluded.');
pipeline=once(pipeline,
 '3. **v0.4.337 DEFERRED:** separately authorize/test live damage integration after pure-calculator acceptance.',
 '3. **v0.4.337 NEXT (not started):** per-attack preferred-measure schema/data enrichment only. Live Context Matrix weapon-damage integration is separately deferred (tentatively v0.4.338).');
const readme=get('validation/README.md')+'\n## v0.4.336 pure calculator\n\nThe required smoke job executes node validation/context-matrix-calculator.mjs for all 36 workbook Spear references, canonical profile cross-product, all Range Profiles, signed Excel rounding, clamps, Nil/unknown neutrality and natural attack exclusions. This calculator is not imported by live combat. Native Acceptance v2 provenance remains unchanged.\n';
save('index.html',updated);
save('validation/manifests/v0.4.336.json',JSON.stringify(next,null,2)+'\n');
save('validation/context-matrix-mode.mjs',mode);
save('audit.md',audit);
save('pipeline-state.md',pipeline);
save('validation/README.md',readme);
console.log('Prepared accepted v0.4.336 exact game bytes '+hash);
