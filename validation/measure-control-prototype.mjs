// Standalone DESIGN evaluation only; run: node validation/measure-control-prototype.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evaluateMeasureTransition as measure} from '../lib/measure-control-prototype.mjs';
const roster = JSON.parse(fs.readFileSync(new URL('../data/context-matrix-weapon-profiles.json', import.meta.url),'utf8')).weapons;
const melee = roster.filter(w=>w.category === 'Melee');
const pick = id => { const w = melee.find(x=>x.id===id); assert.ok(w,id);return w; };
const spear=pick('spear'), sword=pick('sword-normal'), dagger=pick('dagger'), pike=pick('pike');
const movement={A:{Press:true,Open:true},B:{Press:true,Open:true}};
const base={measure:'Far',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:sword,initiativeA:4,initiativeB:5,space:'Open',movement,activeThreatA:true,activeThreatB:true};
const r=(overrides={})=>measure({...base,...overrides});
let assertions=0;
const check=(condition,message)=>{assert.ok(condition,message);assertions++};
check(r().measure==='Far','spear holds at initiative 4+1 vs 5');
check(r({initiativeB:6}).measure==='Normal','sword enters on 6 vs 4+1');
check(r({initiativeA:6,initiativeB:1}).measure==='Far','spear denies entry');
check(r({measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:5,initiativeB:4}).measure==='Normal','spear may reopen without permanent reach bonus');
check(r({measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:4,initiativeB:5}).measure==='Close','shorter fighter may hold without intrinsic length bonus');
check(r({measure:'Normal',intentA:'Hold',intentB:'Press'}).reachA===1,'normal still may deny entry');
check(r({measure:'Close',intentA:'Hold',intentB:'Press'}).reachA===0,'no reach bonus at close');
check(r({activeThreatA:false}).reachA===0,'no point threat no reach');
check(r({activeThreatA:undefined}).status==='unresolved','no invented threat');
check(r({movement:{A:{Press:true,Open:true},B:{Press:false,Open:true}}}).status==='unresolved','movement check delegated');
check(r({geometryResult:'Close',movement:undefined,initiativeA:undefined}).measure==='Close','authoritative geometry wins');
check(r({space:'Restricted',measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:4,initiativeB:4,handlingRelevantA:true,handlingRelevantB:true,enableHandlingControlExperiment:true}).handlingTieBreak===true,'verified restricted handling');
check(r({space:'Open',measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:4,initiativeB:4,handlingRelevantA:true,handlingRelevantB:true}).winner==='none','no handling in open');
check(r({space:'Restricted',measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:4,initiativeB:4,enableHandlingControlExperiment:true}).status==='unresolved','missing restricted evidence fails closed when experiment enabled');
check(r({space:'Restricted',measure:'Close',intentA:'Open',intentB:'Hold',initiativeA:4,initiativeB:4,handlingRelevantA:true,handlingRelevantB:true}).winner==='none','handling stays disabled by default');
check(r({powerRating:3}).measure==='Far','unrelated metadata ignored');
function count(input) {
  const totals={A:0,B:0,none:0};
  for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){
    const x=measure({...input,initiativeA:a,initiativeB:b});
    check(x.status==='resolved','count scenario unresolved');
    totals[x.winner]++;
  }
  return totals;
}
const spearSword=count({...base});
check(JSON.stringify(spearSword)===JSON.stringify({A:21,B:10,none:5}),'spear/sword 21/10/5');
const pikeDagger=count({...base,weaponA:pike,weaponB:dagger});
check(JSON.stringify(pikeDagger)===JSON.stringify({A:26,B:6,none:4}),'pike/dagger 26/6/4');
const closeExit=count({...base,measure:'Close',intentA:'Open',intentB:'Hold'});
check(JSON.stringify(closeExit)===JSON.stringify({A:15,B:15,none:6}),'no automatic close lock');
let transitions=0;
for(const a of melee)for(const b of melee)for(const band of ['Close','Normal','Far'])
for(const ia of ['Press','Hold','Open'])for(const ib of ['Press','Hold','Open'])
for(let d1=1;d1<=6;d1++)for(let d2=1;d2<=6;d2++){
  const x=measure({...base,weaponA:a,weaponB:b,measure:band,intentA:ia,intentB:ib,initiativeA:d1,initiativeB:d2});
  check(x.status==='resolved', 'exhaustive context unresolved');
  check(Math.abs(['Close','Normal','Far'].indexOf(x.measure)-['Close','Normal','Far'].indexOf(band))<=1,'>1 band transition');
  const y=measure({...base,weaponA:b,weaponB:a,measure:band,intentA:ib,intentB:ia,initiativeA:d2,initiativeB:d1});
  check(x.measure===y.measure,'A/B swap changed band');
  transitions++;
}
console.log(JSON.stringify({result:'PASS',meleeProfiles:melee.length,pairwiseInitiativeCases:transitions,assertions,spearSword,pikeDagger,closeExit}));
