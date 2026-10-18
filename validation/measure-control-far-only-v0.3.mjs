// Isolated exact enumeration and Markov-chain comparison for user-requested
// Far+Normal vs Far-only Size + existing BECMI initiative disparity models.
// Run: node validation/measure-control-far-only-v0.3.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evaluateSizeInitiativeMeasure as resolve} from '../lib/measure-control-size-initiative.mjs';
const all=JSON.parse(fs.readFileSync(new URL('../data/context-matrix-weapon-profiles.json',import.meta.url),'utf8')).weapons;
const melee=all.filter(w=>w.category==='Melee');
const pick=id=>{const x=melee.find(w=>w.id===id);assert.ok(x,'Missing weapon '+id);return x;};
const spear=pick('spear'),sword=pick('sword-normal'),pike=pick('pike'),dagger=pick('dagger');
const dirs={Press:-1,Hold:0,Open:1},measures=['Close','Normal','Far'];
const movement={A:{Press:true,Open:true},B:{Press:true,Open:true}};
const fixture={measure:'Far',weaponA:spear,weaponB:sword,normalReachPolicy:'far-only',
  intentA:'Hold',intentB:'Press',initiativeA:4,initiativeB:5,movement,
  activeThreatA:true,activeThreatB:true};
let assertions=0;
const check=(cond,label)=>{assert.ok(cond,label);assertions++;};
const same=(a,b,label)=>{assert.deepEqual(a,b,label);assertions++;};
const nearly=(a,b,label)=>{check(Math.abs(a-b)<1e-10,label+': '+a+' vs '+b);};
function evaluate(changes={}){return resolve({...fixture,...changes});}
function enumerate(changes={}){
 const counts={A:0,B:0,none:0},destination={Close:0,Normal:0,Far:0};
 for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){
   const o=evaluate({...changes,initiativeA:a,initiativeB:b});
   check(o.status==='resolved','Unresolved '+JSON.stringify(changes));
   counts[o.winner]++;destination[o.measure]++;
 }
 return {counts,destination};
}
same(enumerate({measure:'Far',normalReachPolicy:'far-only'}).counts,{A:21,B:10,none:5},'Far-only F');
same(enumerate({measure:'Far',normalReachPolicy:'far-and-normal'}).counts,{A:21,B:10,none:5},'Far+Normal F');
same(enumerate({measure:'Normal',normalReachPolicy:'far-only'}).counts,{A:15,B:15,none:6},'Far-only N');
same(enumerate({measure:'Normal',normalReachPolicy:'far-and-normal'}).counts,{A:21,B:10,none:5},'Far+Normal N');
same(enumerate({measure:'Close',normalReachPolicy:'far-only'}).counts,{A:15,B:15,none:6},'Neither C');
same(enumerate({measure:'Far',weaponA:pike,weaponB:dagger}).counts,{A:26,B:6,none:4},'Pike vs dagger F');
same(enumerate({measure:'Normal',weaponA:pike,weaponB:dagger}).counts,{A:15,B:15,none:6},'Pike vs dagger N Far-only');
same(enumerate({measure:'Normal',weaponA:pike,weaponB:dagger,normalReachPolicy:'far-and-normal'}).counts,
 {A:21,B:10,none:5},'Pike vs dagger N Far+Normal');
same(enumerate({measure:'Normal',weaponA:spear,weaponB:pike,normalReachPolicy:'far-and-normal'}).counts,
 {A:15,B:15,none:6},'Shorter never gets passive reach bonus');
same(enumerate({measure:'Normal',activeThreatA:false,normalReachPolicy:'far-and-normal'}).counts,
 {A:15,B:15,none:6},'Disabled point removes all bonus');
same(enumerate({measure:'Normal',intentA:'Open',intentB:'Press'}).counts,
 enumerate({measure:'Normal',intentA:'Open',intentB:'Press',normalReachPolicy:'far-and-normal'}).counts,
 'No bonus when holder Opens');
check(evaluate({measure:'Normal',normalReachPolicy:'far-only',activeThreatA:undefined}).status==='resolved',
 'No active threat required when Size bonus inapplicable');
check(evaluate({measure:'Normal',normalReachPolicy:'far-and-normal',activeThreatA:undefined}).status==='unresolved',
 'Threat must be known before awarding Normal reach');
check(evaluate({measure:'Far',activeThreatA:undefined}).status==='unresolved',
 'Threat must be known at Far');
check(evaluate({weaponA:{sizeRating:spear.sizeRating},weaponB:{sizeRating:sword.sizeRating}}).status==='resolved',
 'No Handling or Power rating required');
same(evaluate({space:'Restricted',handlingRelevantA:true,handlingRelevantB:true,enableHandlingControlExperiment:true,
   weaponA:{sizeRating:2,handlingRating:-3,powerRating:3},weaponB:{sizeRating:0,handlingRating:3,powerRating:-3}}).measure,
 evaluate({weaponA:{sizeRating:2},weaponB:{sizeRating:0}}).measure,
 'No Handling, Power or space input influences measure');
check(evaluate({movement:{A:movement.A,B:{Press:false,Open:true}}}).status==='unresolved','Blocked Press no dice');
check(evaluate({intentA:'Open',intentB:'Hold',measure:'Close',
  movement:{A:{Press:true,Open:false},B:movement.B}}).status==='unresolved','Blocked Open no dice');
same(evaluate({geometryResult:'Close',initiativeA:null}).measure,'Close','Real positions override margin');
check(evaluate({normalReachPolicy:'unknown'}).status==='unresolved','Fail closed invalid policy');
const scenarios=['Press','Hold','Open'];
const pairInfo={caseCount:0,changedTransitions:0,affectedOrderedPairs:new Set(),symmetryChecks:0};
for(const a of melee)for(const b of melee){
 let pairChanged=false;
 for(const band of measures)for(const aIntent of scenarios)for(const bIntent of scenarios)
 for(const ia of [1,2,3,4,5,6])for(const ib of [1,2,3,4,5,6]){
  const base={weaponA:a,weaponB:b,measure:band,intentA:aIntent,intentB:bIntent,
    initiativeA:ia,initiativeB:ib,activeThreatA:true,activeThreatB:true};
  const old=evaluate({...base,normalReachPolicy:'far-and-normal'});
  const nw=evaluate({...base,normalReachPolicy:'far-only'});
  check(old.status==='resolved'&&nw.status==='resolved','All known candidate cases resolved');
  if(old.measure!==nw.measure){
    check(band==='Normal','Changing a non-Normal result is forbidden');
    pairInfo.changedTransitions++;
    pairChanged=true;
  }
  for(const o of [old,nw]){
    check(Math.abs(measures.indexOf(o.measure)-measures.indexOf(band))<=1,
      'More than one band shifted');
  }
  const swapped=evaluate({...base,weaponA:b,weaponB:a,intentA:bIntent,intentB:aIntent,
    initiativeA:ib,initiativeB:ia,normalReachPolicy:'far-only'});
  same(swapped.measure,nw.measure,'Swapping A/B must not change resulting measure');
  pairInfo.symmetryChecks++;
  pairInfo.caseCount++;
 }
 if(pairChanged)pairInfo.affectedOrderedPairs.add(a.id+'__'+b.id);
}
const numberChanged=pairInfo.changedTransitions, affected=pairInfo.affectedOrderedPairs.size;
check(numberChanged>0&&affected>0,'Normal variant must differ for some pairs');
// Markov expected policy: spear Hold at Far; sword Press at Far/Normal.
// At Normal, spear Holds proportion (1-pOpen), Opens proportion pOpen.
// At Close spear Opens; sword Holds; no hits, injuries, movement costs or retreat.
function transitionMatrix(policy,pOpen){
 const asRow=(measure,a,b)=>{
   const out=enumerate({normalReachPolicy:policy,measure,intentA:a,intentB:b}).destination;
   return measures.map(key=>out[key]/36);
 };
 const close=asRow('Close','Open','Hold');
 const normalHold=asRow('Normal','Hold','Press');
 const normalOpen=asRow('Normal','Open','Press');
 const far=asRow('Far','Hold','Press');
 const normal=normalHold.map((x,i)=>x*(1-pOpen)+normalOpen[i]*pOpen);
 return [close,normal,far];
}
function evolve(matrix,rounds){
 let x=[0,0,1],history={};
 for(let k=1;k<=rounds;k++){
  x=measures.map((_,j)=>x.reduce((sum,p,i)=>sum+p*matrix[i][j],0));
  nearly(x.reduce((a,b)=>a+b,0),1,'Probability conserved');
  if([1,2,3,5,10].includes(k))history[k]=Object.fromEntries(measures.map((m,i)=>[m,x[i]]));
 }
 return history;
}
// Expected wait until Close from Far, by first-step recursion in N and F:
// EF = 1/q + EN ; EN = (1+b/q)/a ; q=P(F->N), a=P(N->C), b=P(N->F).
function firstClose(matrix){
 const q=matrix[2][1],a=matrix[1][0],b=matrix[1][2];
 return 1/q+(1+b/q)/a;
}
const studies=[];
for(const pOpen of [0,0.5,1]){
 const entry={normalHold:[],normalOpen:[]};
 for(const normalReachPolicy of ['far-and-normal','far-only']){
  const matrix=transitionMatrix(normalReachPolicy,pOpen);
  const history=evolve(matrix,10);
  const closeAt5=history[5].Close,closeAt10=history[10].Close;
  const expectedRounds=firstClose(matrix);
  studies.push({normalReachPolicy,pOpen,closeAt5,closeAt10,expectedRounds,
    rows:matrix,history});
 }
}
const find=(pOpen,policy)=>studies.find(x=>x.pOpen===pOpen&&x.normalReachPolicy===policy);
const pct=x=>x*100;
nearly(pct(find(0,'far-and-normal').closeAt5),26.97127729724467,'All-hold Close after 5');
nearly(pct(find(0,'far-only').closeAt5),35.26599730732105,'All-hold Far-only Close after 5');
nearly(find(0,'far-and-normal').expectedRounds,7.2,'All-hold expected first Close F+N');
nearly(find(0,'far-only').expectedRounds,6,'All-hold expected first Close F-only');
nearly(find(0.5,'far-and-normal').expectedRounds,8.64,'Mixed expected first Close F+N');
nearly(find(0.5,'far-only').expectedRounds,7.8,'Mixed expected first Close F-only');
nearly(find(1,'far-and-normal').expectedRounds,find(1,'far-only').expectedRounds,
 'If spear always Opens at Normal, policies do not differ');
for(const pOpen of [0,0.5,1]){
 const plus=find(pOpen,'far-and-normal'),only=find(pOpen,'far-only');
 check(plus.closeAt5<=only.closeAt5+1e-12,'Far+Normal should not increase 5-round Close');
 check(plus.closeAt10<=only.closeAt10+1e-12,'Far+Normal should not increase 10-round Close');
}
console.log(JSON.stringify({result:'PASS',scope:'design-only',weapons:melee.length,
  exactEnumerations:pairInfo.caseCount,variantChangedTransitions:numberChanged,
  orderedWeaponPairsAffected:affected,symmetryChecks:pairInfo.symmetryChecks,
  assertions,studies:studies.map(x=>({policy:x.normalReachPolicy,normalOpenShare:x.pOpen,
    expectedFirstCloseRounds:+x.expectedRounds.toFixed(5),
    pCloseAfter5:+(100*x.closeAt5).toFixed(5),
    pCloseAfter10:+(100*x.closeAt10).toFixed(5)}))},null,2));
