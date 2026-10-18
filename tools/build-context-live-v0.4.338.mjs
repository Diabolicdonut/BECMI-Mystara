// One-time v0.4.338 source-pinned bounded live damage candidate builder.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const rd=p=>fs.readFileSync(p,'utf8'),wr=(p,s)=>fs.writeFileSync(p,s);
const sha=s=>createHash('sha256').update(s).digest('hex');
function once(s,a,b){assert.equal(s.split(a).length,2,'Missing/duplicate anchor: '+a.slice(0,80));return s.replace(a,b);}
let html=rd('index.html');
assert.equal(sha(html),'eba6c44757003104f32f2e2fa0a6a2c30cdd37a456a3695a36d480eddb80b48b');
assert(html.includes("const APP_VERSION='0.4.337';"));
const catalogue=JSON.parse(rd('data/context-matrix-weapon-profiles.json'));
assert.equal(catalogue.weapons.length,46);
const library=rd('lib/context-matrix-calculator.mjs');
assert(library.includes('export function calculateContextMatrix('));
const embeddedLibrary=library.replace('export const DEFAULT_CONTEXT_CALIBRATION','const DEFAULT_CONTEXT_CALIBRATION').replace('export function calculateContextMatrix(','function calculateContextMatrix(');
const self=rd('tools/build-context-live-v0.4.338.mjs');
const runtime=self.split('/* BEGIN_'+'EMBEDDED_RUNTIME */')[1]?.split('/* END_'+'EMBEDDED_RUNTIME */')[0];
assert(runtime,'Missing bounded live runtime source');
const integration=[
'  // v0.4.338: exact accepted v0.4.336 pure calculator, never recreated here.',
'  const CONTEXT_MATRIX_RUNTIME=(()=>{',
embeddedLibrary.split('\n').map(x=>'    '+x).join('\n'),
'    return Object.freeze({calculateContextMatrix});',
'  })();',
runtime,
''].join('\n').replace(/[ \t]+$/gm,'');
html=once(html,'  function rollComparedWeaponDamage(item,target,range,modifier=0,rollerSubject=null){',
 integration+'  function rollComparedWeaponDamage(item,target,range,modifier=0,rollerSubject=null){');
html=once(html,'const beforeWyrdDamage=dmg.applied;dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);if(',
'const beforeWyrdDamage=dmg.applied;dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind);if(');
html=once(html,'dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);writeWeaponAudit(pc,monster,dmg);write(',
"dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,'melee');writeWeaponAudit(pc,monster,dmg);write(");
html=once(html,'dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);writeWeaponAudit(pc,monster,dmg); write(',
"dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,'melee');writeWeaponAudit(pc,monster,dmg); write(");
const monsterAnchor='      if(damage>0){const charged=applyMonsterSourceChargeDamage(monster,damage);damage=charged.damage;}';
const monsterPatch=[
monsterAnchor,
'      // Only an explicit normal carried weapon is eligible; anatomical attacks bypass.',
"      if(weapon&&!spec.damage&&!monster.naturalDamage&&!spec.hephaestonFist&&",
"         (!spec.name||/^weapon$/i.test(spec.name)||String(spec.name).toLowerCase()===String(weapon.name).toLowerCase())){",
"        const adjusted=applyLiveContextMatrixDamage({applied:damage,rawExpr:masteryDamageAudit?.rawExpr||null,",
"          rawBase:masteryDamageAudit?.rawBase??null},weapon,monster,pc,'melee',spec);",
"        damage=adjusted.applied;",
"      }"
].join('\n');
html=once(html,monsterAnchor,monsterPatch);
html=once(html,"value==='CONTEXT_MATRIX'?'Context Matrix data mode selected; live damage remains RAW in v0.4.335.':",
"value==='CONTEXT_MATRIX'?'Context Matrix weapon damage selected; eligible hits adjust only when physical Size, Protection, Measure and Space are established.':");
html=once(html,"const APP_VERSION='0.4.337';","const APP_VERSION='0.4.338';");
const digest=sha(html);wr('index.html',html);
const manifest=JSON.parse(rd('validation/manifests/v0.4.337.json'));
assert.equal(manifest.acceptedVersion,'0.4.337');assert.equal(manifest.core.length,2316);assert.equal(manifest.focused.length,1232);
wr('validation/manifests/v0.4.338.json',JSON.stringify({...manifest,version:'0.4.338',acceptedVersion:'0.4.337',productionSha256:digest},null,2)+'\n');
wr('validation/context-matrix-mode.mjs',once(rd('validation/context-matrix-mode.mjs'),"const APP_VERSION='0.4.337';","const APP_VERSION='0.4.338';"));
wr('validation/monster-attack-context.mjs',once(rd('validation/monster-attack-context.mjs'),
"assert(!html.includes('calculateContextMatrix('),'The pure calculator must not be called in production');",
"assert(html.includes('CONTEXT_MATRIX_RUNTIME.calculateContextMatrix('),'Live damage must call the verified calculator');"));
let pipeline=rd('pipeline-state.md');
pipeline=once(pipeline,'Current candidate: **none**. Source-verified natural attack measure enrichment accepted; no live contextual damage.',
'Current candidate: **work/v0.4.338 — NOT ACCEPTED**. Live Context Matrix weapon integration awaits required CI; authoritative main is still v0.4.337.');
pipeline=once(pipeline,'Exact next checkpoint: **v0.4.338 — live Context Matrix weapon-damage integration** (not started; requires user continuation).',
'Exact next checkpoint: **v0.4.338 — live Context Matrix weapon-damage integration** (candidate, NOT ACCEPTED).');
pipeline=once(pipeline,'## Accepted game and validation\n',
'## Accepted game and validation\n\n**v0.4.338 candidate (NOT ACCEPTED):** verified v0.4.336 pure calculator embedded in production; explicit eligible weapon hits get signed +/−3 adjustment after existing BECMI effects, natural attacks excluded, unresolved spatial/physical facts neutral; no RAW/AAE changes or invented minimum-one floor. Candidate production SHA-256 '+digest+'. Full required CI and acceptance metadata pending. Graphics deferred.\n\n');
wr('pipeline-state.md',pipeline);
wr('validation/README.md',rd('validation/README.md')+
'\n## v0.4.338 live Context Matrix candidate — NOT ACCEPTED\n\nVerified v0.4.336 calculator called only by eligible weapon hits after existing damage effects. A canonical source-verified monster physical profile or explicit encounter override supplies Size/Protection; true engagement Measure and explicitly supplied Space are required. Missing facts fail neutral. RAW, AAE, natural/special attacks and RNG unchanged. No new 1-point minimum damage floor is assumed. Required native smoke additionally runs validation/context-matrix-live.mjs; promotion requires separate candidate and ledger/main green CI.\n');
console.log('v0.4.338 candidate patched; production SHA-256 '+digest);
process.exit(0);

/* BEGIN_EMBEDDED_RUNTIME */
  const CM_SIZES=Object.freeze(['Small','Medium','Large']);
  const CM_PROTECTIONS=Object.freeze(['Soft','Hard']);
  const CM_MEASURES=Object.freeze(['Close','Normal','Far']);
  const CM_SPACES=Object.freeze(['Open','Restricted']);
  function cmCanonical(value,options){
    if(typeof value!=='string')return null;
    return options.find(x=>x.toLowerCase()===value.trim().toLowerCase())||null;
  }
  function cmTargetFacts(target){
    const explicit=target?.contextMatrixTarget;
    if(explicit&&typeof explicit==='object'&&!Array.isArray(explicit)){
      return {targetSize:cmCanonical(explicit.size,CM_SIZES),
        protection:cmCanonical(explicit.protection,CM_PROTECTIONS),source:'explicit-encounter'};
    }
    if(!target?.type||!target?.recordId)return {targetSize:null,protection:null,source:'unknown'};
    const p=COMBAT_MONSTERS?.[target.type];
    if(!p||p.recordId!==target.recordId||p.catalogAuthority!=='workbook-600'||
       p.parameterized||p.directCombatEligible!==true)return {targetSize:null,protection:null,source:'unresolved-profile'};
    const fields=MONSTER_LORE_FIELDS,idx=x=>fields.indexOf(x);
    const id=idx('monsterId'),size=idx('sizeMonster'),protection=idx('protection'),status=idx('sourceStatus');
    if([id,size,protection,status].some(n=>n<0))return {targetSize:null,protection:null,source:'missing-source-fields'};
    const record=MONSTER_LORE_ROWS.find(row=>row[id]===target.recordId);
    if(!record||/provisional|placeholder|unresolved|alias|family|variant.required|variant.incomplete|unverified|uncertain|source.gap|review.pending/i.test(String(record[status]||'')))
      return {targetSize:null,protection:null,source:'unverified-source'};
    const sourceSize=cmCanonical(record[size],CM_SIZES),sourceProtection=cmCanonical(record[protection],CM_PROTECTIONS);
    if(!sourceSize||!sourceProtection)return {targetSize:null,protection:null,source:'unresolved-physical-source'};
    const currentSize=cmCanonical(target.contextMatrixCurrentSize,CM_SIZES)||
      cmCanonical(target.size,CM_SIZES)||cmCanonical(target.sizeProfile?.monster,CM_SIZES)||sourceSize;
    const currentProtection=cmCanonical(target.contextMatrixPhysicalProtection,CM_PROTECTIONS)||
      cmCanonical(target.protection,CM_PROTECTIONS);
    return {targetSize:currentSize,protection:currentProtection,source:'canonical-physical-source'};
  }
  function cmWeaponProfile(item){
    if(item?.kind!=='weapon'||typeof item.matrixId!=='string'||!item.matrixId.endsWith(' (RC)'))return null;
    const name=item.matrixId.slice(0,-5),profile=CONTEXT_MATRIX_DATA.weapons.find(w=>w.name===name);
    if(!profile||profile.rcDamage==='Nil'||/Special/.test(profile.category||''))return null;
    return profile;
  }
  function cmAttackFacts(attacker,target,kind='melee'){
    if(kind!=='melee'||!state.combat?.active)return {measure:null,space:null};
    const pc=attacker?.type?target:attacker,monster=attacker?.type?attacker:target;
    const engagement=getEngagement(pc,monster);
    const measure=cmCanonical(engagement?.range,CM_MEASURES);
    const space=cmCanonical(engagement?.contextMatrixSpace,CM_SPACES)||
      cmCanonical(state.combat.contextMatrixSpace,CM_SPACES);
    return {measure,space};
  }
  function cmWeaponAdjustment(item,attacker,target,kind='melee',attackSpec=null){
    const targetFacts=cmTargetFacts(target),combatFacts=cmAttackFacts(attacker,target,kind),weapon=cmWeaponProfile(item);
    const attackContext=(attackSpec?.attackContext&&typeof attackSpec.attackContext==='object')?
      attackSpec.attackContext:{delivery:'weapon',contextualWeaponDamageEligible:!!weapon&&kind==='melee'};
    const computed=CONTEXT_MATRIX_RUNTIME.calculateContextMatrix({
      weapon,targetSize:targetFacts.targetSize,protection:targetFacts.protection,
      measure:combatFacts.measure,space:combatFacts.space,attackContext
    },CONTEXT_MATRIX_DATA.calibration);
    return {...computed,weapon:weapon?.name||null,weaponId:item?.itemId||null,
      targetSize:targetFacts.targetSize,protection:targetFacts.protection,
      targetSource:targetFacts.source,measure:combatFacts.measure,space:combatFacts.space};
  }
  function applyLiveContextMatrixDamage(packet,item,attacker,target,kind='melee',attackSpec=null){
    if(state.rules?.weaponDamageMode!=='CONTEXT_MATRIX')return packet;
    const context=cmWeaponAdjustment(item,attacker,target,kind,attackSpec);
    const before=packet.applied,after=Math.max(0,before+context.modifier);
    const trace={mode:'CONTEXT_MATRIX',attacker:attacker?.name||null,target:target?.name||null,
      weapon:context.weapon,weaponId:context.weaponId,baseExpression:packet.rawExpr||null,
      rolledDamage:packet.rawBase??null,rawAdjustedDamage:before,
      targetSize:context.targetSize,protection:context.protection,
      physicalSource:context.targetSource,measure:context.measure,space:context.space,
      modifier:context.modifier,eligible:context.eligible,reason:context.reason,finalDamage:after};
    if(state.combat?.active)state.combat.lastContextMatrixDamage=trace;
    return {...packet,applied:after,contextMatrix:trace};
  }
/* END_EMBEDDED_RUNTIME */
