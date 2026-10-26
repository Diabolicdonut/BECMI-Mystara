// v0.4.347 source-reviewed creature Ferocity; actual commands and native save/reload.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const bridge=`window.__kwFerocity347={run:()=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>t.name.startsWith('v0.4.347 ')),{display:false,label:'FEROCITY'}),seed:(type,weapon,trait,band,mode,dice)=>{
 const {pc,mon,c}=harnessMeasureSizeFixture346({weapon,foeWeapon:type==='berserker'?'sword_normal':null,type,band});
 state.rules.combatProcedureMode=mode;
 if(trait==='absent')delete mon.measureTraits;else mon.measureTraits={ferocious:trait};
 c.pcOrders[pc.name.toLowerCase()]={action:'hold',movement:'hold',rangeIntent:'open',targetId:mon.id};
 c.monsterOrders[mon.id]={action:'hold',movement:'hold',rangeIntent:'press',targetName:pc.name};
 c.initiative={rawRolls:{pc:dice[0],foes:dice[1]},rolls:{pc:100+dice[0],foes:-100+dice[1]},modifiers:{pc:100,foes:-100},winner:'pc',winners:['pc'],order:['pc','foes'],pc:100+dice[0],monster:-100+dice[1]};
 c.awaitingMoveChoice=true;c.awaitingWeaponChanges=false;
 recordDmr2ShipRosterContract('ferocity_native347',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
 return {key:STORAGE.save,state:harnessClone(state),name:pc.name,pairKey:engagementKey(pc.name,mon.id)};
}};`;
const errors=[];let browser,assertions=0;
const check=(a,b,label)=>{assert.deepEqual(a,b,label);assertions++;};
const server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(req.url==='/fixture'?html.replace(anchor,bridge+'\n'+anchor):html);});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
try{
 browser=await chromium.launch({headless:true});const context=await browser.newContext(),origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',r=>{if(new URL(r.request().url()).origin===origin)return r.continue();errors.push('external '+r.request().url());return r.abort();});
 context.on('page',p=>{p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
 const page=await context.newPage(),load=async path=>{await page.goto(origin+path,{waitUntil:'load'});await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));};
 const snapshot=()=>page.evaluate(async()=>(await window.KnownWorldTestHarness.getDebugPayload()).campaign.fullState);
 const command=async value=>{await page.locator('#command').fill(value);await page.locator('#command').press('Enter');};
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwFerocity347),'undefined','production has no fixture');
 await load('/fixture');const r=await page.evaluate(()=>window.__kwFerocity347.run());check(r.total,8,'eight embedded Ferocity definitions');check(r.failed,0,JSON.stringify(r.results.filter(x=>!x.pass)));check(r.isolationPreserved,true,'test isolation');
 const cases=[
  ['berserker','sword_normal',true,'normal','CONTEXTUAL',[4,4],'close'],
  ['berserker','sword_normal',false,'normal','CONTEXTUAL',[4,4],'normal'],
  ['wolf','dagger',true,'close','CONTEXTUAL',[2,3],'close'],
  ['wolf','dagger',false,'close','CONTEXTUAL',[2,3],'normal'],
  ['wolf','dagger',true,'close','RAW',[2,3],'close']
 ];
 for(const [type,weapon,trait,band,mode,dice,expected] of cases){
   await load('/fixture');const seed=await page.evaluate(x=>window.__kwFerocity347.seed(...x),[type,weapon,trait,band,mode,dice]);
   await page.evaluate(f=>localStorage.setItem(f.key,JSON.stringify(f.state)),seed);
   await load('/index.html');await command('save');await page.reload({waitUntil:'load'});const before=await snapshot();
   const monster=before.combat.monsters[0];
   check(monster.measureTraits.ferocious,trait,'per-creature trait persisted before contested movement');
   check(before.combat.engagements[seed.pairKey].range,band,'initial independent pair Measure');
   check(before.combat.initiative.rawRolls,{pc:dice[0],foes:dice[1]},'original initiative dice persisted');
   check(before.combat.awaitingMoveChoice,true,'native movement-choice gate');
   await command('move us first');const after=await snapshot();
   check(after.combat.engagements[seed.pairKey].range,expected,'actual Measure control '+type+'/'+weapon+'/'+mode+'/'+trait);
   check(after.combat.awaitingWeaponChanges,true,'existing weapon window preserved');
   check(after.seed,before.seed,'contest uses no extra RNG');
   check(after.minutes,before.minutes,'contest consumes no extra time');
   check(after.combat.round,before.combat.round,'contest stays same round');
   check(after.combat.initiative,before.combat.initiative,'ordinary phased initiative unchanged');
   check([after.party[0].hp,after.combat.monsters[0].hp],[before.party[0].hp,before.combat.monsters[0].hp],'no invented attack or damage');
   check(after.combat.monsters[0].attacks,before.combat.monsters[0].attacks,'attack definitions unchanged');
   const saved=await snapshot();await command('save');await page.reload({waitUntil:'load'});const again=await snapshot();
   check(again.combat.engagements,saved.combat.engagements,'independent Measures survive native reload');
   check(again.combat.monsters[0].measureTraits,saved.combat.monsters[0].measureTraits,'source trait survives reload');
   check(again.combat.initiative,saved.combat.initiative,'unmodified dice survive reload');
   check(again.rules,saved.rules,'RAW/contextual and damage selectors survive');
   check(again.dmr2ShipRosterContracts,saved.dmr2ShipRosterContracts,'planning-only ship contract survives');
   check(again.seed,saved.seed,'native reload RNG');
 }
 check(errors,[],'zero browser console or network errors');saveReport('ferocity-native347',{passed:true,scenarios:13,assertions,errors});
 console.log(JSON.stringify({status:'PASS',version,scenarios:13,assertions,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
