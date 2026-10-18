// Known World design-only Size + existing-initiative measure-control comparator (v0.3).
// Does NOT import combat, mutate game state, roll dice, or alter any accepted engine.
const bands=Object.freeze(['Close','Normal','Far']);
const intents=Object.freeze({Press:-1,Hold:0,Open:1});
// Existing BECMI side initiative totals can exceed 1..6 after established modifiers.
const validD6=n=>Number.isSafeInteger(n);
const validSize=w=>w!==null&&typeof w==='object'&&Number.isInteger(w.sizeRating)&&Math.abs(w.sizeRating)<=3;
const unresolved=reason=>Object.freeze({status:'unresolved',reason});
const shifted=(m,delta)=>bands[Math.max(0,Math.min(2,bands.indexOf(m)+delta))];
const result=(measure,reason,rest={})=>Object.freeze({status:'resolved',measure,reason,...rest});

/**
 * Variant comparison without any Handling or Power input. Does not substitute
 * a movement action, initiative roll, THAC0 check, or an attacker-reach rule.
 * 
 * policy:
 *  'far-only'      Size denial bonus possible at Far; none at Normal/Close
 *  'far-and-normal' Size denial bonus possible at Far and Normal
 *
 * Input = {measure, intentA, intentB, weaponA:{sizeRating},
 * weaponB:{sizeRating}, initiativeA,initiativeB, // existing MODIFIED side totals
 * movement:{A:{Press:true|false,Open:true|false},
 *           B:{Press:true|false,Open:true|false}},
 * activeThreatA?:boolean,activeThreatB?:boolean,
 * geometryResult?:'Close'|'Normal'|'Far',
 * normalReachPolicy?:'far-only'|'far-and-normal'}
 *
 * All supplied movement permissions must be determined by actual spatial
 * positioning and existing BECMI phase/action rules. Missing != false.
 */
export function evaluateSizeInitiativeMeasure(input) {
  if(!input||typeof input!=='object')return unresolved('invalid-input');
  if(!bands.includes(input.measure))return unresolved('unknown-measure');
  if(input.geometryResult!==undefined){
    if(!bands.includes(input.geometryResult))return unresolved('invalid-geometry-result');
    return result(input.geometryResult,'geometry-authoritative');
  }
  const policy=input.normalReachPolicy??'far-only';
  if(policy!=='far-only'&&policy!=='far-and-normal')
    return unresolved('invalid-normal-reach-policy');
  if(!Object.hasOwn(intents,input.intentA)||!Object.hasOwn(intents,input.intentB))
    return unresolved('unknown-intent');
  if(!validSize(input.weaponA)||!validSize(input.weaponB))
    return unresolved('invalid-weapon-size');
  if(!validD6(input.initiativeA)||!validD6(input.initiativeB))
    return unresolved('unknown-existing-initiative');
  for(const [who,intent] of [['A',input.intentA],['B',input.intentB]]){
    if(intent!=='Hold'&&input.movement?.[who]?.[intent]!==true)
      return unresolved('movement-not-established');
  }
  const dirA=intents[input.intentA],dirB=intents[input.intentB];
  if(dirA===dirB)
    return result(shifted(input.measure,dirA),
      dirA===0?'mutual-hold':'compatible-intentions',
      {winner:'none',reachA:0,reachB:0,normalReachPolicy:policy});
  function denial(mine,theirs,weapon,opponent,verified){
    if(mine!=='Hold'||theirs!=='Press'||input.measure==='Close')return 0;
    if(input.measure==='Normal'&&policy==='far-only')return 0;
    const difference=weapon.sizeRating-opponent.sizeRating;
    if(difference<=0)return 0;
    if(input.measure==='Normal'&&difference<2)return 0;
    if(typeof verified!=='boolean')return null;
    if(verified===false)return 0;
    if(input.measure==='Normal')return 1;
    return difference>=3?2:1;
  }
  const reachA=denial(input.intentA,input.intentB,input.weaponA,input.weaponB,input.activeThreatA);
  const reachB=denial(input.intentB,input.intentA,input.weaponB,input.weaponA,input.activeThreatB);
  if(reachA===null||reachB===null)return unresolved('unknown-active-threat');
  const scoreA=input.initiativeA+reachA,scoreB=input.initiativeB+reachB;
  const winner=scoreA>scoreB?'A':scoreB>scoreA?'B':'none';
  const decidingIntent=winner==='A'?input.intentA:winner==='B'?input.intentB:'Hold';
  return result(shifted(input.measure,intents[decidingIntent]),
    winner==='none'?'control-tied':'contested-control',
    {winner,reachA,reachB,scoreA,scoreB,normalReachPolicy:policy});
}
