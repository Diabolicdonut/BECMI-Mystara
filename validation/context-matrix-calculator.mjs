// v0.4.336 standalone pure-calculator acceptance; no game-state access.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {calculateContextMatrix as calc, DEFAULT_CONTEXT_CALIBRATION as defaults} from '../lib/context-matrix-calculator.mjs';

const catalogue = JSON.parse(fs.readFileSync('data/context-matrix-weapon-profiles.json','utf8'));
const settings = catalogue.calibration;
assert.equal(catalogue.weapons.length,46);
assert.deepEqual([settings.referenceProtection,settings.stepsPerDamagePoint,
  settings.minimumModifier,settings.maximumModifier],['Soft',2,-3,3]);
assert.deepEqual(defaults,{referenceProtection:'Soft',stepsPerDamagePoint:2,
  minimumModifier:-3,maximumModifier:3});

const lookup = name => {
  const w=catalogue.weapons.find(p=>p.name===name);
  assert(w, 'Missing canonical profile: '+name);
  return w;
};
const make=(weapon,targetSize='Medium',protection='Soft',measure='Normal',space='Open',extra={})=>
  ({weapon,targetSize,protection,measure,space,...extra});
const valid=out=>{ assert.equal(out.eligible,true);assert.equal(out.reason,'ok');assert(Number.isInteger(out.modifier)); };
let assertions=0;
const same=(actual,expected,msg)=>{assert.equal(actual,expected,msg);assertions++;};

const raw=fs.readFileSync('design/context-matrix/BECMI_Weapon_Context_Matrix.extracted.txt','utf8');
const all=raw.split('TAB NAME: All Conditions>')[1]?.split('<PARSED TEXT FOR SHEET: 4')[0];
assert(all,'Missing workbook All Conditions extraction');
const rows=all.split(/\r?\n/).filter(s=>/^(?:[3-9]|[12][0-9]|3[0-8]),/.test(s));
same(rows.length,36,'All 36 workbook reference conditions must be present');
for(const line of rows){
  const c=line.split(',');
  same(c.length,16,'Workbook reference row must preserve all columns');
  const [,space,protection,targetSize,measure,size,power,range,handling,reference,
    net,converted,uncapped,modifier,signed]=c;
  const out=calc(make(lookup('Spear'),targetSize,protection,measure,space),settings);
  valid(out);
  for(const [key,value] of Object.entries({
    sizeStep:size,powerStep:power,rangeStep:range,handlingPoints:handling,
    referencePower:reference,netSourceSteps:net,convertedPoints:converted,
    uncappedTotal:uncapped,modifier
  })) same(out[key],Number(value),'Workbook row '+c[0]+' '+key);
  same(out.modifier,Number(signed),'Workbook signed row '+c[0]);
}
const targetSizes=['Small','Medium','Large'];
const phys=['Soft','Hard'];
const distances=['Close','Normal','Far'];
const room=['Open','Restricted'];
let cases=0;
for(const w of catalogue.weapons){
  for(const size of targetSizes)for(const protection of phys)
    for(const measure of distances)for(const space of room){
      const out=calc(make(w,size,protection,measure,space),settings);
      if(w.rcDamage==='Nil'){
        same(out.eligible,false,w.name+' Nil not eligible');
        same(out.modifier,0,w.name+' Nil neutral');
        continue;
      }
      valid(out);
      const sz=size==='Small'?-w.sizeRating:size==='Large'?w.sizeRating:0;
      const pw=protection==='Soft'?-w.powerRating:w.powerRating;
      const rp=settings.rangeProfiles[w.rangeProfile];
      assert(rp,'Unsupported profile in canonical roster');
      const expectedRange=measure==='Normal'?0:
        rp[measure.toLowerCase()]==='-Size'?-w.sizeRating:
        rp[measure.toLowerCase()]==='+Size'?w.sizeRating:
        Number(rp[measure.toLowerCase()]);
      const ref=-w.powerRating;
      const net=sz+pw+expectedRange-ref;
      const converted=Math.sign(net)*Math.floor(Math.abs(net)/2+0.5);
      const handling=space==='Restricted'?w.handlingRating:0;
      const uncapped=converted+handling;
      const expected=Math.max(-3,Math.min(3,uncapped));
      same(out.modifier,expected,w.name+' '+[size,protection,measure,space].join('/'));
      same(out.netSourceSteps,net,'net steps');
      same(out.convertedPoints,converted,'conversion');
      same(out.handlingPoints,handling,'handling');
      same(out.uncappedTotal,uncapped,'unclamped');
      cases++;
    }
  const anchor=calc(make(w),settings);
  same(anchor.modifier,0,w.name+' reference anchor must be zero');
}
same(cases,(46-catalogue.weapons.filter(w=>w.rcDamage==='Nil').length)*36,
  'Every numeric canonical profile x 36 combinations was covered');

// Each Range Profile family, including profiles absent from the current RC roster.
for(const family of Object.keys(settings.rangeProfiles)){
  const w={...lookup('Spear'),sizeRating:2,powerRating:0,handlingRating:0,rangeProfile:family};
  const spec=settings.rangeProfiles[family];
  for(const [measure,col] of [['Close','close'],['Normal','normal'],['Far','far']]){
    const out=calc(make(w,'Medium','Soft',measure,'Open'),settings);
    valid(out);
    const step=spec[col]==='-Size'?-2:spec[col]==='+Size'?2:Number(spec[col]);
    same(out.rangeStep,step,family+' '+measure);
  }
}
const spear=lookup('Spear');
const w=(size,power,handling=0,rangeProfile='Flat')=>
  ({...spear,sizeRating:size,powerRating:power,handlingRating:handling,rangeProfile});
same(calc(make(w(-1,0),'Small')).modifier,1,'Positive 0.5 tie rounds away from zero');
same(calc(make(w(1,0),'Small')).modifier,-1,'Negative -0.5 tie rounds away from zero');
same(calc(make(w(0,0))).modifier,0,'Zero unchanged');
same(calc(make(w(3,3,0,'Size-Based'),'Large','Hard','Far')).modifier,3,'Positive clamp');
same(calc(make(w(3,-3,0,'Size-Based'),'Small','Hard','Close')).modifier,-3,'Negative clamp');
same(calc(make(w(0,0,-3),'Medium','Soft','Normal','Restricted')).modifier,-3,'Handling -3');
same(calc(make(w(0,0,3),'Medium','Soft','Normal','Restricted')).modifier,3,'Handling +3');
same(calc(make(w(0,0,3))).modifier,0,'Open has zero Handling');
for(const r of [-3,-2,-1,0,1,2,3]){
  same(calc(make(w(r,0),'Small')).sizeStep,-r,'Size vs Small');
  same(calc(make(w(r,0),'Medium')).sizeStep,0,'Size vs Medium');
  same(calc(make(w(r,0),'Large')).sizeStep,r,'Size vs Large');
  same(calc(make(w(0,r),'Medium','Soft')).powerStep,-r,'Power vs Soft');
  same(calc(make(w(0,r),'Medium','Hard')).powerStep,r,'Power vs Hard');
}
const hardAnchor={...settings,referenceProtection:'Hard'};
for(const p of catalogue.weapons.filter(x=>x.rcDamage!=='Nil')){
  same(calc(make(p,'Medium','Hard','Normal','Open'),hardAnchor).modifier,0,
    'Hard reference baseline recalibration');
}
for(const property of ['targetSize','protection','measure','space']){
  for(const missing of [undefined,null,'Unknown',0,false]){
    const args=make(spear);
    args[property]=missing;
    const out=calc(args,settings);
    same(out.modifier,0,'Unknown '+property+' must be neutral');
    same(out.eligible,false,'Unknown '+property+' must not be eligible');
  }
}
for(const bad of [
  null,undefined,{}, {sizeRating:2,powerRating:-2,rangeProfile:'Flat'},
  {...spear,sizeRating:3.5},{...spear,powerRating:Infinity},
  {...spear,handlingRating:-4},{...spear,rangeProfile:'Unverified'},
  {...spear,rcDamage:'Special'}
]){
  const out=calc(make(bad),settings);
  same(out.modifier,0,'Malformed profile neutral');
  same(out.eligible,false,'Malformed profile ineligible');
}
for(const p of catalogue.weapons.filter(x=>x.rcDamage==='Nil')){
  const out=calc(make(p,'Large','Hard','Far','Restricted'),settings);
  same(out.reason,'nil-damage','Nil never generates numeric damage');
}
for(const delivery of ['natural','breath','projectile','special']){
  const attackContext={delivery,preferredMeasure:'Close',contextualWeaponDamageEligible:false};
  const out=calc(make(spear,'Large','Hard','Far','Restricted',{attackContext}),settings);
  same(out.modifier,0,delivery+' must not modify natural/special damage');
  same(out.reason,'notEligible',delivery+' explicitly bypasses');
}
for(const attackContext of [{delivery:'weapon',contextualWeaponDamageEligible:false},
  {delivery:'natural',contextualWeaponDamageEligible:true},
  {delivery:'weapon'},null]){
  const out=calc(make(spear,'Large','Hard','Far','Restricted',{attackContext}),settings);
  same(out.modifier,0,'Unknown/false attack eligibility neutral');
}
const armed=calc(make(spear,'Large','Soft','Far','Restricted',
  {attackContext:{delivery:'weapon',contextualWeaponDamageEligible:true}}),settings);
same(armed.eligible,true,'Armed monster/PC/NPC use the same weapon calculator');
for(const wrongSettings of [{...settings,stepsPerDamagePoint:0},
  {...settings,minimumModifier:4,maximumModifier:3},
  {...settings,referenceProtection:'Unknown'}]){
  const out=calc(make(spear),wrongSettings);
  same(out.modifier,0,'Malformed workbook setting neutral');
}
console.log('Context Matrix PURE v0.4.336: PASS; reference rows=36, numeric full-context cases='+cases+
  ', profiles='+catalogue.weapons.length+', assertions='+assertions+
  '; no runtime/damage/RNG/AC integration.');
