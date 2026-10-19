// Exact production commands, save/reload and surprise expiry. Fixture only seeds inputs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const fixture=`window.__kwSurprise343Seed=function(mode){
  const {pc,mon,c}=harnessSurpriseMeasureFixture343({distance:mode==='contact'?20:4});
  delete c.surpriseRoundActive;c.surpriseRoundPending='pc';c.round=1;c.initiative=null;
  for(const e of Object.values(c.engagements)){e.range='normal';e.formedRound=0;}
  c.pcOrders[pc.name.toLowerCase()]={action:'hold',movement:mode==='contact'?'approach':'hold',targetId:mon.id,rangeIntent:mode==='contact'?'press':'open'};
  c.monsterOrders[mon.id]={action:'melee',movement:'hold',targetName:pc.name,rangeIntent:'press'};
  recordDmr2ShipRosterContract('surprise_native343',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
  return {saveKey:STORAGE.save,state:harnessClone(state),name:pc.name,monsterId:mon.id,key:engagementKey(pc.name,mon.id)};
};`;
const errors=[];let browser,assertions=0;
const check=(a,b,label)=>{assert.deepEqual(a,b,label);assertions++;};
const served=html.replace(anchor,fixture+'\n'+anchor);
const server=http.createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(req.url==='/fixture'?served:html);
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
try{
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext();const origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',route=>{if(new URL(route.request().url()).origin===origin)return route.continue();errors.push('external '+route.request().url());return route.abort();});
 context.on('page',p=>{p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
 const page=await context.newPage();
 const load=async path=>{await page.goto(origin+path,{waitUntil:'load'});await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));};
 const snapshot=()=>page.evaluate(async()=>(await window.KnownWorldTestHarness.getDebugPayload()).campaign.fullState);
 const command=async text=>{await page.locator('#command').fill(text);await page.locator('#command').press('Enter');};
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwSurprise343Seed),'undefined','exact production contains no fixture');
 // Embedded surprise definitions run through the four required fresh Chromium slices.
 for(const mode of ['contact','existing']){
   await load('/fixture');const seed=await page.evaluate(mode=>window.__kwSurprise343Seed(mode),mode);
   await page.evaluate(f=>localStorage.setItem(f.saveKey,JSON.stringify(f.state)),seed);
   await load('/index.html');await command('save');await page.reload({waitUntil:'load'});
   let before=await snapshot();
   check(before.combat.surpriseRoundPending,'pc','pending surprise survives native save/reload');
   check(before.combat.initiative,null,'surprise has no initiative dice');
   check(before.combat.surprise.foesSurprised,true,'historical surprise retained separately');
   await command('resolve round');
   const after=await snapshot();
   check(after.combat.surpriseRoundPending,null,'surprise period ends through public round command');
   check(after.combat.round,1,'surprise creates no ordinary round');
   check(after.combat.initiative,null,'surprise creates no initiative roll');
   check(after.seed,before.seed,'hold and legal movement create no attack or Measure RNG');
   check(after.party[0].hp,before.party[0].hp,'surprised opponent cannot attack');
   check(after.combat.monsters[0].hp,before.combat.monsters[0].hp,'hold order grants no extra attack');
   check(after.combat.engagements[seed.key]?.range,mode==='contact'?'close':'far','native surprise establishes or changes legal Measure');
   check(after.dmr2ShipRosterContracts,before.dmr2ShipRosterContracts,'planning-only ships stay unchanged');
   check(after.rules,before.rules,'surprise never changes rule toggles');
   await command('save');await page.reload({waitUntil:'load'});
   const reloaded=await snapshot();
   check(reloaded.combat.engagements[seed.key]?.range,after.combat.engagements[seed.key]?.range,'resolved Measure survives real reload');
   check(reloaded.combat.surpriseRoundPending,null,'reload never restarts surprise from historical flags');
   check(reloaded.seed,after.seed,'save/reload preserves RNG');
 }
 check(errors,[],'zero browser errors or external network');
 saveReport('surprise-measure-native343',{passed:true,scenarios:2,assertions,errors});
 console.log(JSON.stringify({status:'PASS',version,scenarios:2,assertions,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
