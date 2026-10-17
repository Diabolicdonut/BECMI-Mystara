// v0.4.337 source-guarded, passive per-attack monster metadata acceptance.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const html=fs.readFileSync('index.html','utf8');
const data=JSON.parse(fs.readFileSync('data/monster-attack-context-v0.4.337.json','utf8'));
const hash=v=>createHash('sha256').update(v).digest('hex');
assert.equal(data.schemaVersion,'v0.4.337');
assert.equal(data.acceptedInputSha256,'c74c2f529566b957a0550178c4d5f51d5164ba67e4658e07d3e7dedb02daaf7d');
assert(data.profiles.length>=10);
assert.equal(html.split('const MONSTER_ATTACK_CONTEXT_DATA = Object.freeze(').length,2);
const source=html.split('const MONSTER_ATTACK_CONTEXT_DATA = Object.freeze(')[1].split(');\n')[0];
assert.deepEqual(JSON.parse(source),data,'Embedded runtime roster and source sidecar must agree');
assert(!html.includes('calculateContextMatrix('),'The pure calculator must not be called in production');
const modes=['RAW','AAE','CONTEXT_MATRIX'];
assert(modes.every(m=>html.includes(m)),'Modes must remain present');
let count=0;const seen=new Set(),forms=new Set();
for(const row of data.profiles){
 assert(/^MON-\d{4}$/.test(row.recordId));
 assert(row.key&&row.source&&row.sourcePage!=null);
 for(const attack of row.attacks){
  const fact=attack.attackContext;
  assert(Number.isInteger(attack.attackIndex)&&attack.attackIndex>=0);
  assert(attack.attackName&&attack.damageExact&&attack.damageExact!=='0');
  assert.equal(fact.delivery,'natural');
  assert.equal(fact.contextualWeaponDamageEligible,false);
  assert.equal(fact.preferredMeasure,'Close');
  assert.equal(fact.legalMeasures,null,'Unknown legal measures must not be manufactured');
  assert.equal(fact.preferredMeasureConfidence,'High');
  assert.equal(fact.provenance.source,row.source);
  assert(fact.provenance.citation);
  const unique=row.recordId+':'+attack.attackIndex;
  assert(!seen.has(unique),'Attack index can only be enriched once: '+unique);seen.add(unique);
  const serialized=JSON.parse(JSON.stringify({name:attack.attackName,damage:attack.damageExact,attackContext:fact}));
  assert.equal(serialized.damage,attack.damageExact,'Damage must survive serialization byte-for-byte');
  assert.deepEqual(serialized.attackContext,fact);
  forms.add(attack.attackName);count++;
 }
}
assert(count>=30,'Unexpectedly small conservative attack enrichment');
const sample=[
 {name:'claw',damage:'1d4',attackContext:{delivery:'natural',preferredMeasure:'Close',contextualWeaponDamageEligible:false}},
 {name:'bite',damage:'1d8',attackContext:{delivery:'natural',preferredMeasure:'Close',contextualWeaponDamageEligible:false}},
 {name:'tail',damage:'1d10',attackContext:{delivery:'natural',preferredMeasure:'Normal',contextualWeaponDamageEligible:false}},
 {name:'breath',damage:'6d6',attackContext:{delivery:'breath',preferredMeasure:'Far',contextualWeaponDamageEligible:false}},
 {name:'longsword',damage:'1d8',attackContext:{delivery:'weapon',preferredMeasure:'Normal',contextualWeaponDamageEligible:true}}
];
assert.deepEqual(sample.map(x=>x.attackContext.preferredMeasure),['Close','Close','Normal','Far','Normal']);
assert.deepEqual(JSON.parse(JSON.stringify(sample)),sample);
const provisional={name:'unknown reach',damage:'Special',attackContext:{delivery:'special',preferredMeasure:null,legalMeasures:null,contextualWeaponDamageEligible:false}};
assert.equal(JSON.parse(JSON.stringify(provisional)).attackContext.preferredMeasure,null);
console.log('Monster preferred-measure schema/data PASS; source candidates='+count+
 ', profiles='+data.profiles.length+', anatomical forms='+forms.size+
 ', unknown reach and mixed-per-attack/armed synthetic contracts preserved; no live combat call.');
