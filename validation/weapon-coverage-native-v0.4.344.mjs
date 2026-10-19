// Dedicated coverage regressions and native persistence; no bridge in production.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const bridge=`window.__kwCoverage344={run:()=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>t.name.startsWith('v0.4.344 ')),{display:false,label:'WEAPON COVERAGE'}),seed:()=>{
 const {pc,c}=harnessSurpriseMeasureFixture343({count:2,distance:20});c.surpriseRoundPending=null;
 pc.equippedWeapon={itemId:'spear',name:SHOP_ITEMS.spear.name,matrixId:SHOP_ITEMS.spear.matrixId};
 c.pcOrders[pc.name.toLowerCase()]={action:'melee',targetId:c.monsters[0].id,rangeIntent:'hold'};
 const attacker=c.monsters[1];setCombatMonsterVector(attacker,{x:-20,y:0,z:0});c.monsterOrders[attacker.id].rangeIntent='press';moveSpatialCombatant('monster',attacker,{x:0,y:0,z:0});
 recordDmr2ShipRosterContract('coverage_native344',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
 return {key:STORAGE.save,state:harnessClone(state),pair:engagementKey(pc.name,attacker.id)};
}};`;
const errors=[];let browser,assertions=0;
const check=(a,b,label)=>{assert.deepEqual(a,b,label);assertions++;};
const server=http.createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(req.url==='/fixture'?html.replace(anchor,bridge+'\n'+anchor):html);
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
try{
 browser=await chromium.launch({headless:true});const context=await browser.newContext(),origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',r=>{if(new URL(r.request().url()).origin===origin)return r.continue();errors.push('external '+r.request().url());return r.abort();});
 context.on('page',p=>{p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
 const page=await context.newPage();const load=async path=>{await page.goto(origin+path,{waitUntil:'load'});await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));};
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwCoverage344),'undefined','exact production has no bridge');
 await load('/fixture');const r=await page.evaluate(()=>window.__kwCoverage344.run());
 check(r.total,8,'eight dedicated coverage definitions');check(r.failed,0,JSON.stringify(r.results.filter(x=>!x.pass)));check(r.isolationPreserved,true,'browser campaign isolation');
 const seed=await page.evaluate(()=>window.__kwCoverage344.seed());await page.evaluate(f=>localStorage.setItem(f.key,JSON.stringify(f.state)),seed);
 await load('/index.html');const snapshot=()=>page.evaluate(async()=>(await window.KnownWorldTestHarness.getDebugPayload()).campaign.fullState);
 const before=await snapshot();check(before.combat.engagements[seed.pair].range,'close','rear approach stored independently');check(before.combat.weaponCoverageFacings,seed.state.combat.weaponCoverageFacings,'literal facing through real boot migration');
 await page.locator('#command').fill('save');await page.locator('#command').press('Enter');await page.reload({waitUntil:'load'});
 const after=await snapshot();check(after.combat.weaponCoverageFacings,before.combat.weaponCoverageFacings,'native facing save/reload');check(after.combat.engagements[seed.pair].range,'close','native pair Measure save/reload');
 check(after.seed,before.seed,'native save RNG');check(after.minutes,before.minutes,'native save time');check(after.rules,before.rules,'rule choices preserved');check(after.dmr2ShipRosterContracts,before.dmr2ShipRosterContracts,'planning-only ship contracts preserved');check(errors,[],'browser and network clean');
 saveReport('weapon-coverage-native344',{passed:true,scenarios:9,assertions,errors});console.log(JSON.stringify({status:'PASS',version,scenarios:9,assertions,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
