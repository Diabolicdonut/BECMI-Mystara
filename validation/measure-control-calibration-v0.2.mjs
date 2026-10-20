// Known World design calibration v0.2 (NOT live production).
// Run: node validation/measure-control-calibration-v0.2.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evaluateMeasureTransition as resolve} from '../lib/measure-control-prototype.mjs';

const catalog = JSON.parse(fs.readFileSync(
  new URL('../data/context-matrix-weapon-profiles.json', import.meta.url),
  'utf8')).weapons.filter(w => w.category === 'Melee');
const weapon = id => {
  const found = catalog.find(w => w.id === id);
  assert.ok(found, 'Missing roster weapon: ' + id);
  return found;
};
const spear=weapon('spear'), sword=weapon('sword-normal');
const dagger=weapon('dagger'), pike=weapon('pike');
const conditions={A:{Press:true,Open:true},B:{Press:true,Open:true}};
const base=Object.freeze({
  weaponA:spear,weaponB:sword,measure:'Far',space:'Open',
  intentA:'Hold',intentB:'Press',activeThreatA:true,activeThreatB:true,
  initiativeA:4,initiativeB:5,movement:conditions
});
let assertions=0;
function ok(value,message){assert.ok(value,message);assertions++;}
function same(actual,expected,message){assert.deepEqual(actual,expected,message);assertions++;}
function evaluate(changes={}){return resolve({...base,...changes});}
function distribution(changes={}) {
  const counts={A:0,B:0,none:0}, destinations={Close:0,Normal:0,Far:0};
  for(let initiativeA=1;initiativeA<=6;initiativeA++)
    for(let initiativeB=1;initiativeB<=6;initiativeB++){
      const hit=evaluate({...changes,initiativeA,initiativeB});
      ok(hit.status==='resolved','Unresolved: '+JSON.stringify(changes));
      counts[hit.winner]++;destinations[hit.measure]++;
    }
  return {counts,destinations};
}
// These exact counts are derived independently by enumerating 6x6 initiative
// pairs; they are modeling probabilities, NOT historical bout win rates.
const longVsSword=distribution();
same(longVsSword.counts,{A:21,B:10,none:5},'Spear entry-denial');
same(longVsSword.destinations,{Close:0,Normal:10,Far:26},'Reach denial state');
same(distribution({activeThreatA:false}).counts,{A:15,B:15,none:6},'Off-line spear gets no reach');
same(distribution({weaponA:pike,weaponB:dagger}).counts,{A:26,B:6,none:4},'Pike vs dagger Far');
same(distribution({measure:'Normal'}).counts,{A:21,B:10,none:5},'Spear holds Normal');
same(distribution({measure:'Close'}).counts,{A:15,B:15,none:6},'No spear reach advantage at Close');
same(distribution({measure:'Close',intentA:'Open',intentB:'Hold'}).counts,
  {A:15,B:15,none:6},'Equal-footing Close separation');
same(distribution({measure:'Close',intentA:'Open',intentB:'Hold',weaponB:dagger}).counts,
  {A:15,B:15,none:6},'Short dagger does not lock Close');
same(distribution({weaponA:sword,weaponB:sword}).counts,
  {A:15,B:15,none:6},'Equal weapons');
same(distribution({space:'Restricted'}).counts,
  {A:21,B:10,none:5},'Restricted space alone does not nullify verified linear point');
same(distribution({activeThreatA:false,space:'Restricted'}).counts,
  {A:15,B:15,none:6},'Verified lost point threat in restricted corridor');
same(distribution({shieldB:true,armorB:'plate'}).counts,
  longVsSword.counts,'Shield and armor must not be invented measure bonuses');
// No damage, penetration, AC, or HP model: armor/shield affect existing defense,
// and may change preferred intentions, but never change measure score on their own.
ok(evaluate({movement:{A:{Press:true,Open:true},B:{Press:false,Open:true}}}).status==='unresolved',
  'Blocked entry must not become a random contest');
ok(evaluate({intentA:'Open',intentB:'Hold',measure:'Close',
  movement:{A:{Press:true,Open:false},B:{Press:true,Open:true}}}).status==='unresolved',
  'Cannot withdraw through a wall');
same(evaluate({geometryResult:'Close',movement:undefined,initiativeA:undefined}).measure,
  'Close','Resolved geometry overrides unknown movement');
// Handling: existing number represents restricted-space offensive damage.
// On initiative ties, even a one-point difference could transfer 6/36 (=16.7%)
// probability mass; disallow this by default pending real-world validation.
const withoutHandling=distribution({measure:'Close',intentA:'Open',intentB:'Hold',
  space:'Restricted',handlingRelevantA:true,handlingRelevantB:true});
same(withoutHandling.counts,{A:15,B:15,none:6},'Handling off by default');
const withHandling=distribution({measure:'Close',intentA:'Open',intentB:'Hold',
  space:'Restricted',handlingRelevantA:true,handlingRelevantB:true,
  enableHandlingControlExperiment:true});
same(withHandling.counts,{A:21,B:15,none:0},'Opt-in Handling swings six ties');
same(distribution({measure:'Close',intentA:'Open',intentB:'Hold',space:'Open',
  handlingRelevantA:true,handlingRelevantB:true,
  enableHandlingControlExperiment:true}).counts,{A:15,B:15,none:6},
  'Handling experimental switch cannot affect Open space');
ok(evaluate({measure:'Close',intentA:'Open',intentB:'Hold',space:'Restricted',
  initiativeA:4,initiativeB:4,
  enableHandlingControlExperiment:true}).status==='unresolved',
  'Experimental handling requires verified relevance');
ok(evaluate({measure:'Close',intentA:'Open',intentB:'Hold',space:'Restricted',
  initiativeA:4,initiativeB:4}).status==='resolved',
  'Default Handling must not require missing contextual facts');
// Repeated-round policy: spear Holds at Far, Opens at Normal/Close;
// sword Presses at Far/Normal, Holds at Close. This is an intentionally fixed,
// illustrative decision policy, with no hits, injury, grappling, fatigue,
// changed tactics, movement obstruction, weapon change, or retreat.
const measures=['Close','Normal','Far'];
const transitionRows=[];
for(const measure of measures){
  const controls=measure==='Far'?{intentA:'Hold',intentB:'Press'}:
    measure==='Normal'?{intentA:'Open',intentB:'Press'}:
    {intentA:'Open',intentB:'Hold'};
  const row=distribution({...controls,measure}).destinations;
  transitionRows.push(measures.map(m=>row[m]/36));
}
same(transitionRows,[[21/36,15/36,0],[15/36,6/36,15/36],[0,10/36,26/36]],
  'Reference Markov transition rows C,N,F');
let state=[0,0,1]; // start Far
const afterRounds={};
for(let round=1;round<=10;round++){
  const next=state.map((_,dest)=>state.reduce((sum,p,orig)=>
    sum+p*transitionRows[orig][dest],0));
  const sum=next.reduce((a,b)=>a+b,0);
  ok(Math.abs(sum-1)<1e-12,'Probability mass preserved');
  state=next;
  if([1,2,3,5,10].includes(round))afterRounds[round]=
    Object.fromEntries(measures.map((m,i)=>[m,+state[i].toFixed(8)]));
}
ok(Math.abs(afterRounds[5].Far-0.48720008)<1e-7,'Five rounds Far probability');
ok(Math.abs(afterRounds[10].Close-0.27956135)<1e-7,'Ten rounds Close probability');
// Sensitivity: for reach bonus k, exact margin-in-initiative outcome distribution.
const sensitivity=[];
for(let reach=0;reach<=4;reach++){
  const sums={deny:0,enter:0,tie:0};
  for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){
    if(a+reach>b)sums.deny++;
    else if(a+reach<b)sums.enter++;
    else sums.tie++;
  }
  sensitivity.push({reach,...sums});
}
same(sensitivity,[
  {reach:0,deny:15,enter:15,tie:6},
  {reach:1,deny:21,enter:10,tie:5},
  {reach:2,deny:26,enter:6,tie:4},
  {reach:3,deny:30,enter:3,tie:3},
  {reach:4,deny:33,enter:1,tie:2}
], 'Verified reach threshold sensitivity');
// Spot-check all 29 melee profiles: no weapon-size advantage at Close,
// reach response monotonic at Far when active Holding vs Pressing.
let pairCases=0;
for(const a of catalog)for(const b of catalog){
  const far=evaluate({weaponA:a,weaponB:b,measure:'Far',
    initiativeA:3,initiativeB:5});
  ok(far.status==='resolved','Pair far unresolved');
  ok(far.reachA>=0 && far.reachA<=2,'Out of bounds reach');
  const close=evaluate({weaponA:a,weaponB:b,measure:'Close',
    initiativeA:3,initiativeB:5});
  ok(close.reachA===0,'Reach must not persist at Close');
  pairCases++;
}
console.log(JSON.stringify({
  result:'PASS',scope:'design-only',meleeProfiles:catalog.length,
  pairCases,assertions,longVsSword,withoutHandling,withHandling,
  sensitivity,transitionRows,afterRounds
},null,2));
