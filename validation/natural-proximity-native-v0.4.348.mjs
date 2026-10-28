import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const bridge="window.__kwNatural348={run:()=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>t.name.startsWith('v0.4.348 ')),{display:false,label:'NATURAL'}),seed:(band,mode,selector)=>{const {pc,mon}=harnessNaturalProximityFixture348({band,mode,selector});recordDmr2ShipRosterContract('natural348_native',harnessDmr2ShipAddedCatapultTargetRangesConfig284());return {key:STORAGE.save,state:harnessClone(state),pairKey:engagementKey(pc.name,mon.id)};}};";
const errors=[];let browser,checks=0;
const check=(actual,expected,label)=>{assert.deepEqual(actual,expected,label);checks++;};
const server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(req.url==='/fixture'?html.replace(anchor,bridge+'\n'+anchor):html);});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
try{
 browser=await chromium.launch({headless:true});const context=await browser.newContext(),origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',r=>{if(new URL(r.request().url()).origin===origin)return r.continue();errors.push('external '+r.request().url());return r.abort();});
 context.on('page',p=>{p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
 const page=await context.newPage(),load=async path=>{await page.goto(origin+path,{waitUntil:'load'});await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));};
 const snap=()=>page.evaluate(async()=>(await window.KnownWorldTestHarness.getDebugPayload()).campaign.fullState);
 const cmd=async text=>{await page.locator('#command').fill(text);await page.locator('#command').press('Enter');};
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwNatural348),'undefined','Production contains no bridge');
 await load('/fixture');const r=await page.evaluate(()=>window.__kwNatural348.run());
 check(r.total,8,'Eight embedded definitions');check(r.failed,0,JSON.stringify(r.results.filter(x=>!x.pass)));check(r.isolationPreserved,true,'Isolation');
 for(const [band,mode,selector] of [['far','CONTEXTUAL','RAW'],['close','CONTEXTUAL','CONTEXT_MATRIX'],['close','RAW','RAW']]){
   await load('/fixture');const record=await page.evaluate(x=>window.__kwNatural348.seed(...x),[band,mode,selector]);
   await page.evaluate(x=>localStorage.setItem(x.key,JSON.stringify(x.state)),record);
   await load('/index.html');await cmd('save');await page.reload({waitUntil:'load'});const before=await snap();
   check(before.combat.engagements[record.pairKey].range,band,'Live pairwise band');check(before.rules.combatProcedureMode,mode,'Combat procedure');
   check(before.rules.weaponDamageMode,selector,'Independent selector');check(before.combat.monsters[0].attacks[0].name,'bite','Original attack');
   await cmd('save');await page.reload({waitUntil:'load'});const after=await snap();
   check({engagements:after.combat.engagements,attacks:after.combat.monsters[0].attacks,rules:after.rules,seed:after.seed,minutes:after.minutes,ships:after.dmr2ShipRosterContracts},
         {engagements:before.combat.engagements,attacks:before.combat.monsters[0].attacks,rules:before.rules,seed:before.seed,minutes:before.minutes,ships:before.dmr2ShipRosterContracts},'Saved inputs preserved');
 }
 check(errors,[],'No browser, console or network errors');saveReport('natural-native348',{passed:true,scenarios:11,assertions:checks,errors});
 console.log(JSON.stringify({status:'PASS',version,scenarios:11,assertions:checks,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}finally{await browser?.close();await new Promise(done=>server.close(done));}
