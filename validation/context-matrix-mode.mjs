// v0.4.335 supplemental exact-browser, data and save-reload acceptance.
import fs from 'node:fs';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const html=fs.readFileSync('index.html','utf8');
const data=JSON.parse(fs.readFileSync('data/context-matrix-weapon-profiles.json','utf8'));
assert(html.includes("const APP_VERSION='0.4.335';"));
assert.equal(data.weapons.length,46);
assert.equal(data.calibration.referenceProtection,'Soft');
assert.equal(data.calibration.stepsPerDamagePoint,2);
assert.deepEqual([data.calibration.minimumModifier,data.calibration.maximumModifier],[-3,3]);
assert.equal(data.calibration.rangeProfiles['Size-Based'].close,'-Size');
assert.equal(data.calibration.rangeProfiles['Size-Based'].far,'+Size');
const named=n=>data.weapons.find(x=>x.name===n);
assert.deepEqual([named('Spear').rcDamage,named('Spear').sizeRating,named('Spear').powerRating,named('Spear').handlingRating],['1d6',2,-2,1]);
assert.deepEqual([named('Dagger').rcDamage,named('Dagger').sizeRating,named('Dagger').powerRating],['1d4',-2,-2]);
assert.deepEqual([named('Crossbow, Heavy').rcDamage,named('Crossbow, Heavy').sizeRating,named('Crossbow, Heavy').powerRating],['2d4',2,2]);
assert.equal(named('Net').rcDamage,'Nil');
assert.equal(named('Sling').rangeProfile,'Long-Slight');
const embedded=html.match(/const CONTEXT_MATRIX_DATA = Object\.freeze\((\{.*?\})\);\s+const RC_WEAPON_MATRIX/s);
assert(embedded,'Production embedded profile object not found');
assert.deepEqual(JSON.parse(embedded[1]),data,'Runtime profile data and canonical repository JSON differ');
assert(html.includes("rules:{weaponDamageMode:'RAW',weaponAudit:true"),'New campaign mode is not RAW');
assert(html.includes("if(active==='RAW'||active==='CONTEXT_MATRIX')"),'CONTEXT_MATRIX must use old RAW damage/RNG branch');
assert(html.includes("appliedBase=(active==='RAW'||active==='CONTEXT_MATRIX')?rawBase:matrixBase"),'Context mastery must be RAW');
assert(html.includes("['MATRIX','AAE'].includes(dmg?.active)"),'AAE mastery must use existing matrix');
assert(html.includes("['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(selectedWeaponMode)?selectedWeaponMode:'RAW'"),'Unknown/missing mode does not safely default to RAW');
const server=http.createServer((req,res)=>{
  if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try {
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext();
  const errors=[];
  await context.route('**/*',route=>{
    if(new URL(route.request().url()).origin===origin)return route.continue();
    errors.push('Network: '+route.request().url());return route.abort();
  });
  context.on('page',p=>{
    p.on('pageerror',e=>errors.push(String(e)));
    p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  });
  const page=await context.newPage();
  await page.goto(origin+'/',{waitUntil:'load'});
  await page.waitForSelector('#contextWeaponsButton');
  const display=()=>page.locator('#weaponRuleState').innerText();
  assert((await display()).includes('RAW'),'RAW must display as the default');
  await page.click('#contextWeaponsButton');
  assert((await display()).includes('CONTEXT_MATRIX'));
  await page.reload({waitUntil:'load'});
  await page.waitForSelector('#contextWeaponsButton');
  assert((await display()).includes('CONTEXT_MATRIX'),'CONTEXT_MATRIX must survive actual browser save/reload');
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('knownWorldRefereeSave')).rules.weaponDamageMode);
  assert.equal(restored,'CONTEXT_MATRIX');
  await page.click('#matrixWeaponsButton');
  assert((await display()).includes('AAE'),'AAE must be separately selectable');
  await page.reload({waitUntil:'load'});
  assert((await display()).includes('AAE'),'AAE must survive save/reload');
  await page.click('#rawWeaponsButton');
  assert((await display()).includes('RAW'));
  await page.reload({waitUntil:'load'});
  assert((await display()).includes('RAW'),'RAW must survive save/reload');
  assert.deepEqual(errors,[]);
  console.log('v0.4.335 supplemental browser/data/mode acceptance: PASS (46 profiles, canonical data match, selectors, real RAW/CONTEXT_MATRIX/AAE save/reload, safe mode gating).');
} finally {await browser?.close();await new Promise(r=>server.close(r));}
