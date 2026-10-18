// Known World design-only v0.5, symmetrical measure control.
// Far: longer active weapon denies Press; Normal: ALWAYS neutral;
// Close: shorter weapon aids ACTIVE pursuit (Press vs Open), not passive grapple.
// Only existing weapon Size and existing modified initiative; no rolls/state.
const bands=['Close','Normal','Far'],dirs={Press:-1,Hold:0,Open:1};
const fail=reason=>Object.freeze({status:'unresolved',reason});
const finish=(measure,reason,rest={})=>Object.freeze({status:'resolved',measure,reason,...rest});
const move=(band,d)=>bands[Math.max(0,Math.min(2,bands.indexOf(band)+d))];
const sizeValid=p=>p&&Number.isInteger(p.sizeRating)&&p.sizeRating>=-3&&p.sizeRating<=3;
const checkSide=(input,side,intent)=>intent==='Hold'||input.movement?.[side]?.[intent]===true;
const cap=d=>d>=3?2:d>=1?1:0;

/** `closePolicy` = 'active-pursuit' (default) or 'none'.
 * `normalPolicy` supports ONLY 'neutral'. All weapons tie on Size at Normal.
 * `activeThreatA/B` only for Far Hold-vs-Press long-weapon denial.
 * `activePursuitA/B` only for Close Press-vs-Open shorter-weapon advantage.
 * Such facts MUST be independently verified; not inferred from preferredMeasure.
 * Existing movement and BECMI action timing stay authoritative.
 */
export function evaluateSymmetricMeasure(input) {
 if(!input||typeof input!=='object')return fail('invalid-input');
 if(!bands.includes(input.measure))return fail('unknown-measure');
 if(input.geometryResult!==undefined){
   if(!bands.includes(input.geometryResult))return fail('invalid-geometry-result');
   return finish(input.geometryResult,'geometry-authoritative');
 }
 const normalPolicy=input.normalPolicy??'neutral',closePolicy=input.closePolicy??'active-pursuit';
 if(normalPolicy!=='neutral')return fail('invalid-normal-policy');
 if(!['none','active-pursuit'].includes(closePolicy))return fail('invalid-close-policy');
 if(!Object.hasOwn(dirs,input.intentA)||!Object.hasOwn(dirs,input.intentB))return fail('invalid-intent');
 if(!sizeValid(input.weaponA)||!sizeValid(input.weaponB))return fail('unknown-size');
 if(!Number.isSafeInteger(input.initiativeA)||!Number.isSafeInteger(input.initiativeB))return fail('unknown-existing-initiative');
 if(!checkSide(input,'A',input.intentA)||!checkSide(input,'B',input.intentB))return fail('movement-not-established');
 const da=dirs[input.intentA],db=dirs[input.intentB];
 if(da===db)return finish(move(input.measure,da),
   da===0?'mutual-hold':'compatible-intentions',
   {winner:'none',modifierA:0,modifierB:0,normalPolicy,closePolicy});
 let modifierA=0,modifierB=0;
 function reach(mine,theirs,mySize,theirSize,verified){
   if(input.measure!=='Far'||mine!=='Hold'||theirs!=='Press'||mySize<=theirSize)return 0;
   if(typeof verified!=='boolean')return null;
   return verified?cap(mySize-theirSize):0;
 }
 function pursuit(mine,theirs,mySize,theirSize,verified){
   if(input.measure!=='Close'||closePolicy!=='active-pursuit'||
       mine!=='Press'||theirs!=='Open'||mySize>=theirSize)return 0;
   if(typeof verified!=='boolean')return null;
   return verified?cap(theirSize-mySize):0;
 }
 if(input.measure==='Far'){
  modifierA=reach(input.intentA,input.intentB,input.weaponA.sizeRating,input.weaponB.sizeRating,input.activeThreatA);
  modifierB=reach(input.intentB,input.intentA,input.weaponB.sizeRating,input.weaponA.sizeRating,input.activeThreatB);
  if(modifierA===null||modifierB===null)return fail('unknown-active-threat');
 } else if(input.measure==='Close'){
  modifierA=pursuit(input.intentA,input.intentB,input.weaponA.sizeRating,input.weaponB.sizeRating,input.activePursuitA);
  modifierB=pursuit(input.intentB,input.intentA,input.weaponB.sizeRating,input.weaponA.sizeRating,input.activePursuitB);
  if(modifierA===null||modifierB===null)return fail('unknown-active-pursuit');
 }
 const scoreA=input.initiativeA+modifierA,scoreB=input.initiativeB+modifierB;
 const winner=scoreA>scoreB?'A':scoreB>scoreA?'B':'none';
 return finish(move(input.measure,dirs[winner==='A'?input.intentA:winner==='B'?input.intentB:'Hold']),
   winner==='none'?'control-tied':'contested-control',
   {winner,scoreA,scoreB,modifierA,modifierB,normalPolicy,closePolicy});
}
