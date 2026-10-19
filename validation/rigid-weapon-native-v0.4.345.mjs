// Exact native commands for rigid-weapon clearance, refusal and persisted facts.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
import {version,saveReport} from './common.mjs';
const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const bridge=`window.__kwRigid345={run:()=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>t.name.startsWith('v0.4.345 ')),{display:false,label:'RIGID WEAPON CLEARANCE'}),seed:mode=>{
 const {pc,mon,c}=harnessSurpriseMeasureFixture343();
 pc.equippedWeapon={itemId:'pike',name:SHOP_ITEMS.pike.name,matrixId:SHOP_ITEMS.pike.matrixId};pc.inventory=[{...memberItemRecord('pike'),qty:1}];
 if(mode==='entry'){state.combat=null;state.mode='site';state.location='temple_flame';state.torchLit=true;}
 else{c.round=1;c.initiative=null;c.surpriseRoundPending='pc';c.rigidWeaponClearance={siteId:null,confined:true};pc.equippedWeapon.rigidLengthFt=null;mon.noWeapons=false;mon.weaponId='lance';mon.rigidWeaponLengths={lance:14};mon.attacks=null;mon.naturalDamage=null;c.pcOrders[pc.name.toLowerCase()]={action:'melee',movement:'hold',rangeIntent:'hold',targetId:mon.id};}
 recordDmr2ShipRosterContract('rigid_native345',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
 return {key:STORAGE.save,state:harnessClone(state),name:pc.name};
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
 await load('/index.html');check(await page.evaluate(()=>typeof window.__kwRigid345),'undefined','exact production contains no fixture');
 await load('/fixture');const r=await page.evaluate(()=>window.__kwRigid345.run());check(r.total,8,'eight dedicated clearance definitions');check(r.failed,0,JSON.stringify(r.results.filter(x=>!x.pass)));check(r.isolationPreserved,true,'isolated campaigns');
 const seed=await page.evaluate(()=>window.__kwRigid345.seed('entry'));await page.evaluate(f=>localStorage.setItem(f.key,JSON.stringify(f.state)),seed);
 await load('/index.html');await command('save');await page.reload({waitUntil:'load'});
 const before=await snapshot();await command('enter');const refused=await snapshot();
 check(refused.location,'temple_flame','normal dungeon entry refused');check(refused.minutes,before.minutes,'refused entry clock');check(refused.seed,before.seed,'refused entry RNG');check(refused.party[0].inventory,before.party[0].inventory,'refused entry never drops gear');
 await command('dev weapon clearance temple_5 transport=30 deploy=30 attack=30 source=synthetic native physical clearance');
 const recorded=await snapshot();const expected={transportFt:30,deployFt:30,attackFt:30,sourceNote:'synthetic native physical clearance'};
 check(recorded.weaponClearanceBySite.temple_5,expected,'public referee command records actual facts');
 await command('save');await page.reload({waitUntil:'load'});const reloaded=await snapshot();
 check(reloaded.weaponClearanceBySite,recorded.weaponClearanceBySite,'native physical-fact save/reload');check(reloaded.seed,recorded.seed,'fact save RNG');check(reloaded.rules,recorded.rules,'inactive rule preferences');check(reloaded.dmr2ShipRosterContracts,recorded.dmr2ShipRosterContracts,'planning-only ship contracts');
 await command('enter');const entered=await snapshot();check(entered.location,'temple_5','verified keyed approach permitted');check(entered.minutes,reloaded.minutes+10,'ordinary successful travel cost');
 await load('/fixture');const attack=await page.evaluate(()=>window.__kwRigid345.seed('attack'));await page.evaluate(f=>localStorage.setItem(f.key,JSON.stringify(f.state)),attack);await load('/index.html');await command('save');await page.reload({waitUntil:'load'});
 const armed=await snapshot();check(armed.party[0].equippedWeapon.rigidLengthFt,null,'native literal unknown weapon length');check(armed.combat.monsters[0].weaponId,'lance','native actual armed NPC weapon');check(armed.combat.monsters[0].rigidWeaponLengths,{lance:14},'native NPC physical length map');await command('resolve round');const after=await snapshot();
 check(after.combat.monsters[0].hp,armed.combat.monsters[0].hp,'unusable pike deals no damage');check(after.party[0].hp,armed.party[0].hp,'surprised enemy gains no attack');check(after.seed,armed.seed,'unusable pike rolls no attack or damage dice');check(after.combat.initiative,null,'no invented initiative');check(after.combat.round,armed.combat.round,'no invented round');check(after.party[0].inventory,armed.party[0].inventory,'refused attack retains gear');check(after.minutes,armed.minutes,'refused surprise attack clock');check(errors,[],'zero browser or network errors');
 saveReport('rigid-weapon-native345',{passed:true,scenarios:11,assertions,errors});console.log(JSON.stringify({status:'PASS',version,scenarios:11,assertions,errors}));
}catch(e){console.error(e.stack);process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
