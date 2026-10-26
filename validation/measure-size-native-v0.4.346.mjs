// Existing initiative dice, real movement choice, sidearm switch and save/reload.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const bridge=`window.__kwSize346={run:()=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>t.name.startsWith('v0.4.346 ')),{display:false,label:'CURRENT MEASURE SIZE'}),seed:(weapon,band,mode,dice=[4,5])=>{
 const {pc,mon,c}=harnessMeasureSizeFixture346({weapon,band});state.rules.combatProcedureMode=mode;
 c.pcOrders[pc.name.toLowerCase()]={action:'hold',movement:'hold',rangeIntent:band==='close'?'open':weapon==='spear'?'press':'hold',targetId:mon.id};
 c.monsterOrders[mon.id]={action:'hold',movement:'hold',rangeIntent:'press',targetName:pc.name};
 c.initiative={rawRolls:{pc:dice[0],foes:dice[1]},rolls:{pc:100+dice[0],foes:-100+dice[1]},modifiers:{pc:100,foes:-100},winner:'pc',winners:['pc'],order:['pc','foes'],pc:100+dice[0],monster:-100+dice[1]};
 c.awaitingMoveChoice=true;c.awaitingWeaponChanges=false;
 recordDmr2ShipRosterContract('size_native346',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
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
 const command=async text=>{await page.locator('#command').fill(text);await page.locator('#command').press('Enter');};
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwSize346),'undefined','exact production has no fixture');
 await load('/fixture');const r=await page.evaluate(()=>window.__kwSize346.run());check(r.total,8,'eight complete Size definitions');check(r.failed,0,JSON.stringify(r.results.filter(x=>!x.pass)));check(r.isolationPreserved,true,'campaign isolation');
 const cases=[['dagger','close','CONTEXTUAL','close',[4,5]],['spear','far','CONTEXTUAL','normal',[4,5]],['sword_normal','far','CONTEXTUAL','normal',[4,5]],['dagger','close','RAW','close',[4,5]],['dagger','close','CONTEXTUAL','normal',[5,5]]];
 for(const [weapon,band,mode,expected,dice] of cases){
   await load('/fixture');const seed=await page.evaluate(x=>window.__kwSize346.seed(...x),[weapon,band,mode,dice]);await page.evaluate(f=>localStorage.setItem(f.key,JSON.stringify(f.state)),seed);
   await load('/index.html');await command('save');await page.reload({waitUntil:'load'});const before=await snapshot();
   check(before.combat.engagements[seed.pairKey].range,band,'saved current pair band');check(before.combat.initiative.rawRolls,{pc:dice[0],foes:dice[1]},'original dice persist separately from adjusted totals');check(before.combat.awaitingMoveChoice,true,'actual pending movement choice');
   await command('move us first');const after=await snapshot();check(after.combat.engagements[seed.pairKey].range,expected,weapon+'/'+band+'/'+mode+' real Measure outcome');
   check(after.combat.awaitingWeaponChanges,true,'ordinary post-movement weapon window');check(after.seed,before.seed,'Measure and stationary movement reuse dice without RNG');check(after.minutes,before.minutes,'no extra round time');check(after.combat.round,before.combat.round,'same round');check(after.combat.initiative,before.combat.initiative,'original initiative and ordinary order unchanged');
   check([after.party[0].hp,after.combat.monsters[0].hp],[before.party[0].hp,before.combat.monsters[0].hp],'no invented attack or damage');check(after.combat.monsters[0].attacks,before.combat.monsters[0].attacks,'natural attack definition untouched');
   if(mode==='CONTEXTUAL'){
     await command('equip '+seed.name+' with short sword');const switched=await snapshot();check(switched.party[0].equippedWeapon.itemId,'sword_short','actual carried-sidearm public equip command');check(switched.combat.engagements[seed.pairKey].range,expected,'switch grants no free Measure');check(switched.seed,after.seed,'switch creates no extra die');
   }
   const saved=await snapshot();await command('save');await page.reload({waitUntil:'load'});const reloaded=await snapshot();check(reloaded.combat.engagements,saved.combat.engagements,'all independent pair bands survive reload');check(reloaded.combat.initiative,saved.combat.initiative,'raw dice and initiative survive reload');check(reloaded.party[0].equippedWeapon,saved.party[0].equippedWeapon,'actual readied sidearm persists');check(reloaded.rules,saved.rules,'independent choices persist');check(reloaded.dmr2ShipRosterContracts,saved.dmr2ShipRosterContracts,'planning-only ship contracts');check(reloaded.seed,saved.seed,'repeat native save/reload RNG');
 }
 check(errors,[],'zero browser console or network errors');saveReport('measure-size-native346',{passed:true,scenarios:13,assertions,errors});console.log(JSON.stringify({status:'PASS',version,scenarios:13,assertions,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
