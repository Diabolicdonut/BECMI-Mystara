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
assert(html.includes('CONTEXT_MATRIX_RUNTIME.calculateContextMatrix('),'Live damage must call the verified calculator');
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


// Exercise the real production catalogue in a temporary in-memory browser fixture.
// The fixture is NEVER written to shipped index.html, and no live attack or damage code changes.
import http from 'node:http';
import {chromium} from 'playwright';
const anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2,'Expected exactly one isolated runtime fixture anchor');
const instrument=[
 '  window.__kw337Read = (spawn=false) => {',
 '    const entries=Object.entries(COMBAT_MONSTERS).map(([key,p])=>({',
 '      key,recordId:p.recordId,parameterized:!!p.parameterized,variableWeapon:!!p.variableWeapon,',
 '      attacks:Array.isArray(p.attacks)?p.attacks.map(a=>({',
 '        name:a.name,damage:a.damage,attackContext:a.attackContext??null',
 '      })):null',
 '    }));',
 '    let spawned=null;',
 '    if(spawn){',
 "      const m=createCombatMonster('black_bear',1);",
 '      spawned={attacks:m.attacks,roundtrip:JSON.parse(JSON.stringify(m.attacks))};',
 '    }',
 '    return {entries,spawned};',
 '  };'
].join('\n');
const served=html.replace(anchor,instrument+'\n'+anchor);
const server=http.createServer((req,res)=>{
  if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(served);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try{
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext();
 const errors=[];
 await context.route('**/*',route=>{
   if(new URL(route.request().url()).origin===origin)return route.continue();
   errors.push('external network '+route.request().url());return route.abort();
 });
 context.on('page',page=>{
   page.on('pageerror',e=>errors.push(String(e)));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 });
 const page=await context.newPage();
 await page.goto(origin+'/',{waitUntil:'load'});
 await page.waitForFunction(()=>typeof window.__kw337Read==='function');
 const before=await page.evaluate(()=>window.__kw337Read(true));
 assert.equal(before.entries.length,628,'Canonical, supplemental, and module profile counts must remain 628');
 const byKey=new Map(before.entries.map(p=>[p.key,p]));
 let actual=0,unresolved=0;
 for(const p of before.entries){
  if(p.attacks===null)continue;
  for(const a of p.attacks){
    if(a.attackContext!==null){
      actual++;
      assert.equal(a.attackContext.delivery,'natural');
      assert.equal(a.attackContext.preferredMeasure,'Close');
      assert.equal(a.attackContext.contextualWeaponDamageEligible,false);
    }else unresolved++;
  }
 }
 assert(actual>0&&actual<=count,'Source-guarded runtime enrichment must be bounded');
 for(const p of data.profiles){
   const runtime=byKey.get(p.key);
   assert(runtime&&runtime.recordId===p.recordId,'Source record must exist unchanged');
   for(const attack of p.attacks){
     const live=runtime.attacks?.[attack.attackIndex];
     const matching=live&&live.name===attack.attackName&&live.damage===attack.damageExact;
     if(matching&&!runtime.parameterized&&!runtime.variableWeapon)
       assert.deepEqual(live.attackContext,attack.attackContext,
         'Verified matching natural attack metadata lost: '+p.key+' '+attack.attackIndex);
   }
 }
 const bear=byKey.get('black_bear');
 assert(bear&&bear.attacks?.length===3,'Expected multiple black bear natural attacks');
 assert(bear.attacks.every(a=>a.attackContext?.delivery==='natural'));
 assert.deepEqual(before.spawned.attacks,before.spawned.roundtrip,'Spawn actor JSON must retain attack metadata');
 assert.deepEqual(before.spawned.attacks.map(a=>a.damage),bear.attacks.map(a=>a.damage),'Spawn must not change existing attack damage');
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>typeof window.__kw337Read==='function');
 const after=await page.evaluate(()=>window.__kw337Read());
 assert.deepEqual(after.entries,before.entries,'Catalogue metadata must reconstruct identically on actual browser reload');
 assert.deepEqual(errors,[],'New catalogue must not produce page, console or network errors');
 console.log('v0.4.337 LIVE CATALOGUE METADATA CHECK: PASS; actual enriched='+actual+
   ', unresolved individual attacks='+unresolved+', source candidates='+count+
   ', profiles='+before.entries.length+', bear spawn/JSON/reload=PASS; no combat effect.');
}finally{
 await browser?.close();
 await new Promise(resolve=>server.close(resolve));
}
