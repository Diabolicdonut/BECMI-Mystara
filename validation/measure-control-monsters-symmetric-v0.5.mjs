// DESIGN-ONLY v0.5: symmetric range control plus source-protected monster
// Size=0 neutral fallback. This suite does not integrate or alter combat.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evaluateSymmetricMeasure as contest} from '../lib/measure-control-symmetric-v0.5.mjs';
import {resolveMonsterControlSize,resolveMonsterGroupControl}
  from '../lib/monster-measure-control-v0.5.mjs';
import {evaluateSizeInitiativeMeasure as farOnly}
  from '../lib/measure-control-size-initiative.mjs';

const weapons=JSON.parse(fs.readFileSync(new URL('../data/context-matrix-weapon-profiles.json',import.meta.url),'utf8')).weapons;
const monsterData=JSON.parse(fs.readFileSync(new URL('../data/monster-attack-context-v0.4.337.json',import.meta.url),'utf8'));
const melee=weapons.filter(w=>w.category==='Melee');
const weaponIndex=Object.fromEntries(weapons.map(w=>[w.id,w]));
const byId=id=>{const w=weaponIndex[id];assert.ok(w,id);return w;};
const spear=byId('spear'), sword=byId('sword-normal'), dagger=byId('dagger'), pike=byId('pike');
const monsterAttacks=monsterData.profiles.flatMap(mon=>mon.attacks.map(attack=>({
  ...attack,recordId:mon.recordId,key:mon.key,source:mon.source
})));
const natural=monsterAttacks.find(a=>a.attackName==='bite');
assert.ok(natural,'Expected source verified natural bite');
const plain={attackContext:natural.attackContext,damageExact:natural.damageExact};
const movement={A:{Press:true,Open:true},B:{Press:true,Open:true}};
const fixture={measure:'Far',intentA:'Hold',intentB:'Press',
  weaponA:spear,weaponB:sword,initiativeA:4,initiativeB:5,movement,
  activeThreatA:true,activeThreatB:true,activePursuitA:true,activePursuitB:true};
let assertions=0;
const pass=(x,m)=>{assert.ok(x,m);assertions++;};
const eq=(a,b,m)=>{assert.deepEqual(a,b,m);assertions++;};
const run=(changes={})=>contest({...fixture,...changes});
function dist(changes={}){
 const t={A:0,B:0,none:0};
 for(let initiativeA=1;initiativeA<=6;initiativeA++)
 for(let initiativeB=1;initiativeB<=6;initiativeB++){
  const r=run({...changes,initiativeA,initiativeB});
  pass(r.status==='resolved','Unresolved '+JSON.stringify(changes));
  t[r.winner]++;
 }
 return t;
}
const sameOutcome=(a,b,m)=>eq(a,b,m);
const standard={A:15,B:15,none:6};
const boostHolder={A:21,B:10,none:5};
const boostPursuer={A:10,B:21,none:5};
eq(monsterAttacks.length,41,'Approved sourced natural attack entries');
eq(melee.length,29,'Canonical melee weapon roster');
pass(monsterAttacks.every(a=>a.attackContext.delivery==='natural'),'Source records all natural');
pass(monsterAttacks.every(a=>a.attackContext.contextualWeaponDamageEligible===false),'Never add contextual damage');
pass(monsterAttacks.every(a=>a.attackContext.preferredMeasure==='Close'),'These sourced cases are Close-preferred only');
const naturalBefore=JSON.stringify(monsterData);
for(const a of monsterAttacks){
 const x=resolveMonsterControlSize(a,weaponIndex);
 eq(x.status,'neutral-fallback','Natural needs unverified neutral fallback');
 eq(x.sizeRating,0,'Natural baseline Size0');
 eq(x.verified,false,'Not an anatomical reach proof');
 const strict=resolveMonsterControlSize(a,weaponIndex,{allowNeutralUnknown:false});
 eq(strict.status,'unresolved','Strict mode must not invent reach');
 eq(strict.sizeRating,null,'Strict mode preserves unknown Size');
 const group=resolveMonsterGroupControl([a],weaponIndex,0);
 pass(group.status==='neutral-fallback'&&group.canClaimSizeAdvantage===false,
   'Neutral natural cannot claim reach/pursuit from Size0 alone');
 pass(group.leadAttackIndex===0,'Source attack index known');
}
eq(JSON.stringify(monsterData),naturalBefore,'Source attack records unchanged');
const counts={neutral:0,moderate:0,extreme:0};
for(const w of melee){
 if(w.sizeRating===0)counts.neutral++;
 else if(Math.abs(w.sizeRating)===3)counts.extreme++;
 else counts.moderate++;
}
eq(counts,{neutral:4,moderate:21,extreme:4},'Distribution vs monster Size0');
eq(dist({measure:'Far',intentA:'Hold',intentB:'Press'}),boostHolder,'Spear denies Far');
eq(dist({measure:'Normal',intentA:'Hold',intentB:'Press'}),standard,'Normal neutral');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press'}),boostPursuer,'Sword actively pursues spear');
eq(dist({measure:'Close',intentA:'Hold',intentB:'Open'}),standard,'No small passive grip lock');
eq(dist({measure:'Close',intentA:'Open',intentB:'Hold'}),standard,'No short weapon auto retreat denial from Hold');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press',activePursuitB:false}),standard,'Cannot claim pursuit bonus if pursuit unverified');
eq(run({measure:'Close',intentA:'Open',intentB:'Press',activePursuitB:undefined}).status,
 'unresolved','Missing pursuit proof fails closed');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press',closePolicy:'none'}),standard,'Close disabled sensitivity');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press',weaponA:pike,weaponB:dagger}),
 {A:6,B:26,none:4},'Pike vs dagger difference 5 caps +2');
eq(dist({measure:'Normal',intentA:'Open',intentB:'Press',weaponA:pike,weaponB:dagger}),
 standard,'Absolute extremes remain neutral at Normal');
eq(dist({measure:'Normal',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:sword}),
 standard,'Size0 sword not privileged at Normal');
eq(run({measure:'Normal',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:sword,
 normalPolicy:'size-zero-bias'}).status,'unresolved',
 'Size0 bias is REJECTED: Normal can only be neutral for all weapons');
const baselineFar=farOnly({measure:'Far',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:sword,
 initiativeA:4,initiativeB:5,movement,activeThreatA:true,normalReachPolicy:'far-only'});
eq(baselineFar.measure,run().measure,'Far remains v0.3-compatible');
eq(dist({measure:'Far',intentA:'Hold',intentB:'Press',weaponA:pike,weaponB:dagger}),
 {A:26,B:6,none:4},'pike extreme at Far');
eq(run({measure:'Normal',intentA:'Hold',intentB:'Press',activeThreatA:undefined,activePursuitA:undefined}).status,
 'resolved','Normal needs neither reach nor pursuit evidence');
eq(run({measure:'Close',intentA:'Hold',intentB:'Open',activePursuitA:undefined}).status,
 'resolved','Passive Hold no pursuit evidence required');
eq(run({measure:'Close',intentA:'Open',intentB:'Press',
  movement:{A:{Press:true,Open:false},B:{Press:true,Open:true}}}).status,
 'unresolved','Actual blocked disengagement takes priority');
eq(run({measure:'Far',intentA:'Hold',intentB:'Press',
  activeThreatA:undefined}).status,
 'unresolved','Size cannot invent line of threat');
eq(run({geometryResult:'Normal',measure:'Far',initiativeA:undefined}).measure,
 'Normal','Physical position overrides contest');
eq(run({initiativeA:7,initiativeB:0}).status,'resolved','Modified side initiative accepted');
eq(run({space:'Restricted',powerRating:100,handlingRating:100}).measure,run().measure,
 'Restricted space Power and Handling do not affect control');
const naturalTarget={sizeRating:0};
eq(dist({measure:'Far',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:naturalTarget}),
 boostHolder,'Spear +2 vs natural Size0 gets +1 at Far when threat verified');
eq(dist({measure:'Normal',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:naturalTarget}),
 standard,'Spear vs natural neutral at Normal');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press',weaponA:spear,weaponB:naturalTarget,
 activePursuitB:false}),standard,
 'Natural Size0 does not confer undocumented Close pursuit power');
eq(dist({measure:'Close',intentA:'Open',intentB:'Press',weaponA:spear,weaponB:naturalTarget,
 activePursuitB:true}),boostPursuer,
 'Conditional monster Close pursuit if independently established');
eq(dist({measure:'Close',intentA:'Press',intentB:'Open',weaponA:dagger,weaponB:naturalTarget}),
 boostHolder,'Dagger -2 can actively follow natural neutral Size0 at Close');
eq(dist({measure:'Far',intentA:'Hold',intentB:'Press',weaponA:dagger,weaponB:naturalTarget}),
 standard,'Dagger has no longer-weapon Far advantage against neutral monster');
eq(dist({measure:'Far',intentA:'Press',intentB:'Hold',weaponA:dagger,weaponB:naturalTarget,
 activeThreatB:false}),standard,'Natural Size0 cannot assert unknown Far threat');
eq(dist({measure:'Far',intentA:'Press',intentB:'Hold',weaponA:dagger,weaponB:naturalTarget,
 activeThreatB:true}),{A:10,B:21,none:5},
 'Natural verified Far threat can be represented, not inferred from preference');
eq(resolveMonsterControlSize({attackContext:{delivery:'breath'}},weaponIndex).status,
 'ineligible','Breath is not melee Size0');
eq(resolveMonsterControlSize({attackContext:{delivery:'projectile'}},weaponIndex).status,
 'ineligible','Projectile is not melee Size0');
eq(resolveMonsterControlSize({attackContext:{delivery:'special'}},weaponIndex).status,
 'ineligible','Special is not melee Size0');
eq(resolveMonsterControlSize({delivery:'weapon',weaponId:'spear'},weaponIndex),
 {status:'verified',sizeRating:2,verified:true,source:'canonical-weapon-profile',weaponId:'spear'},
 'Monster armed with spear uses actual weapon +2 instead of neutral0');
eq(resolveMonsterControlSize({delivery:'weapon',weaponId:'unknown-id'},weaponIndex).status,
 'unresolved','Unknown armed monster weapon must not receive natural Size0');
eq(resolveMonsterControlSize(null,weaponIndex).status,'unresolved',
 'Absent attack is not silently assigned Size0');
eq(resolveMonsterControlSize({delivery:'unknown'},weaponIndex).status,'unresolved',
 'Unidentified delivery is not silently assigned Size0');
eq(resolveMonsterGroupControl([plain,plain],weaponIndex,-1).status,
 'unresolved','No fabricated attack selection');
eq(resolveMonsterGroupControl([{delivery:'breath'}],weaponIndex,0).reason,
 'lead-attack-not-melee-contact','Breath cannot lead melee control');
eq(resolveMonsterGroupControl([plain],weaponIndex,0).canClaimSizeAdvantage,
 false,'Fallback is not proof of active hold or pursuit');
const syntheticVerified={delivery:'natural',controlSizeRating:1,
 controlSizeSourceVerified:true,controlSizeSource:'synthetic-only-verified-attack-contract'};
eq(resolveMonsterControlSize(syntheticVerified,weaponIndex).sizeRating,1,
 'Explicit hypothetical verified reach override allowed without rewriting catalog');
eq(resolveMonsterControlSize({...syntheticVerified,controlSizeSourceVerified:false},weaponIndex).status,
 'unresolved','Invalid explicit natural reach cannot be silently assumed neutral');
// Every actual sourced monster natural attack must retain published damage, source
// provenance, and preference. Any movement eligibility is a separate input.
for(const mon of monsterAttacks){
 const obj=JSON.parse(JSON.stringify(mon));
 const resolved=resolveMonsterControlSize(obj,weaponIndex);
 pass(resolved.status==='neutral-fallback'&&resolved.sizeRating===0,'Sourced natural neutral');
 eq(obj.damageExact,mon.damageExact,'Published damage unchanged');
 eq(obj.attackContext.preferredMeasure,mon.attackContext.preferredMeasure,
  'Sourced preference unchanged');
 eq(obj.attackContext.contextualWeaponDamageEligible,false,'No extra contextual damage');
}
// Exhaust all weapon pairs and 41 canonical natural attack matchups, all measures,
// intents and 36 raw initiative pairs. Validate Normal neutrality, Close direction,
// one-band rule, label swap, and no Size-effect from monster preferred measure.
let weaponCases=0,monsterCases=0,closeBonusCases=0,normalBonusCases=0;
const bands=['Close','Normal','Far'],intentions=['Press','Hold','Open'];
function sweep(wa,wb,sideKind){
 for(const measure of bands)for(const intentA of intentions)for(const intentB of intentions)
 for(let initiativeA=1;initiativeA<=6;initiativeA++)for(let initiativeB=1;initiativeB<=6;initiativeB++){
  const arg={measure,intentA,intentB,weaponA:wa,weaponB:wb,
    initiativeA,initiativeB,movement,activeThreatA:true,
    activeThreatB:sideKind==='natural'?false:true,
    activePursuitA:true,activePursuitB:sideKind==='natural'?false:true};
  const r=contest(arg);
  pass(r.status==='resolved','Exhaustive unresolved '+JSON.stringify(arg));
  pass(Math.abs(bands.indexOf(r.measure)-bands.indexOf(measure))<=1,'At most one measure shift');
  if(measure==='Normal'){
   pass(r.modifierA===0&&r.modifierB===0,'Normal always neutral');
   normalBonusCases++;
  }
  if(measure==='Close'&&(r.modifierA!==0||r.modifierB!==0)){
   pass((intentA==='Press'&&intentB==='Open')||(intentA==='Open'&&intentB==='Press'),
    'Close bonus requires active Press against Open');
   closeBonusCases++;
  }
  const swapped=contest({...arg,weaponA:wb,weaponB:wa,intentA:intentB,
   intentB:intentA,initiativeA:initiativeB,initiativeB:initiativeA,
   activeThreatA:arg.activeThreatB,activeThreatB:arg.activeThreatA,
   activePursuitA:arg.activePursuitB,activePursuitB:arg.activePursuitA});
  eq(swapped.measure,r.measure,'Side-label swap changes control result');
  if(sideKind==='natural')monsterCases++;else weaponCases++;
 }
}
for(const wa of melee)for(const wb of melee)sweep(wa,wb,'weapon');
for(const wa of melee)for(const monsterAttack of monsterAttacks){
 const s=resolveMonsterControlSize(monsterAttack,weaponIndex);
 sweep(wa,{sizeRating:s.sizeRating},'natural');
}
eq(normalBonusCases,(melee.length*melee.length+melee.length*monsterAttacks.length)*9*36,
 'Every Normal cross-product case tested');
pass(weaponCases===melee.length*melee.length*3*9*36,'Complete weapon cross product');
pass(monsterCases===melee.length*monsterAttacks.length*3*9*36,'All sourced natural cross product');
// Repeated-round model: spear at Far Holds, at Normal Opens, at Close Opens;
// Close-pref natural monster Presses at Far/Normal/Close.
// At Close, natural has NO bonus by default unless verified pursuit is injected.
function distribution(changes){
 const d={Close:0,Normal:0,Far:0};
 for(let initiativeA=1;initiativeA<=6;initiativeA++)
 for(let initiativeB=1;initiativeB<=6;initiativeB++){
  const r=run({...changes,initiativeA,initiativeB});
  pass(r.status==='resolved','Model unresolved');
  d[r.measure]++;
 }
 return bands.map(k=>d[k]/36);
}
function matrix(monsterCanPursue){
 const monster={sizeRating:0};
 return [
  distribution({measure:'Close',weaponA:spear,weaponB:monster,
   intentA:'Open',intentB:'Press',activePursuitB:monsterCanPursue}),
  distribution({measure:'Normal',weaponA:spear,weaponB:monster,
   intentA:'Open',intentB:'Press'}),
  distribution({measure:'Far',weaponA:spear,weaponB:monster,
   intentA:'Hold',intentB:'Press',activeThreatA:true})
 ];
}
function evolve(mat,N=10){
 let state=[0,0,1];
 const history=[];
 for(let n=1;n<=N;n++){
  state=bands.map((_,dest)=>state.reduce((sum,p,from)=>sum+p*mat[from][dest],0));
  pass(Math.abs(state.reduce((x,y)=>x+y,0)-1)<1e-12,'Probability total');
  if([1,2,3,5,10].includes(n))history.push({round:n,
    Close:+(100*state[0]).toFixed(6),
    Normal:+(100*state[1]).toFixed(6),
    Far:+(100*state[2]).toFixed(6)});
 }
 return history;
}
const conservative=evolve(matrix(false)),verified=evolve(matrix(true));
pass(verified[4].Close>conservative[4].Close,'Verified pursuit improves Close hold');
eq(matrix(false)[1],matrix(true)[1],'Normal row unchanged by pursuit');
eq(matrix(false)[2],matrix(true)[2],'Far row unchanged by pursuit');
console.log(JSON.stringify({result:'PASS',scope:'design-only, no game integration',weapons:melee.length,
 sourceNaturalAttacks:monsterAttacks.length,rosterVsNeutralMonster:counts,
 weaponCases,monsterCases,normalBonusCases,closeBonusCases,assertions,
 sampleDist:{
  farSpearAgainstNeutralMonster:boostHolder,
  normalSpearAgainstNeutralMonster:standard,
  closeSpearEscapeVsVerifiedMonsterFollower:boostPursuer,
  closeSpearEscapeVsUnverifiedNaturalFollower:standard
 },repeatedRound:{
  assumption:'Spear Hold at Far / Open at Normal and Close; Close-pref monster Presses',
  unverifiedMonsterClosePursuit:conservative,
  verifiedMonsterClosePursuit:verified
 }},null,2));
