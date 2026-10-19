// v0.4.338 real production in-browser Context Matrix integration acceptance.
// The fixture bridge is injected in-memory only, never shipped in index.html.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
const html=fs.readFileSync('index.html','utf8');
const library=fs.readFileSync('lib/context-matrix-calculator.mjs','utf8')
  .replace('export const DEFAULT_CONTEXT_CALIBRATION','const DEFAULT_CONTEXT_CALIBRATION')
  .replace('export function calculateContextMatrix(','function calculateContextMatrix(');
const runtime=html.split('  const CONTEXT_MATRIX_RUNTIME=(()=>{')[1]?.split('    return Object.freeze({calculateContextMatrix});')[0];
assert(runtime,'Accepted calculator must be present in production HTML');
assert.equal(runtime.split('\n').map(line=>line.replace(/^    /,'')).join('\n').trim(),library.trim(),'Embedded calculator must match accepted v0.4.336 implementation exactly');
assert(/const APP_VERSION='0\.4\.(?:338|339|340|341|342|343|344)';/.test(html));
assert(html.includes("dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind,null,band)"));
assert(html.includes('applyLiveContextMatrixDamage({applied:damage,rawExpr:masteryDamageAudit'));
const digest=createHash('sha256').update(html).digest('hex');
const manifest=JSON.parse(fs.readFileSync(`validation/manifests/v${html.match(/const APP_VERSION='([^']+)'/)[1]}.json`,'utf8'));
assert.equal(manifest.productionSha256,digest);
assert(['0.4.337','0.4.338','0.4.339','0.4.340','0.4.341','0.4.342','0.4.343','0.4.344'].includes(manifest.acceptedVersion));
const anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2);
const self=fs.readFileSync('validation/context-matrix-live.mjs','utf8');
const fixture=self.split('/* BEGIN_'+'BROWSER_FIXTURE */')[1]?.split('/* END_'+'BROWSER_FIXTURE */')[0];
assert(fixture&&fixture.includes('__kw338Probe'),'Missing test-only browser fixture');
const served=html.replace(anchor,fixture+'\n'+anchor);
const server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(served);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try {
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext(),errors=[];
 const origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',route=>{
  if(new URL(route.request().url()).origin===origin)return route.continue();
  errors.push('Network '+route.request().url());return route.abort();
 });
 context.on('page',p=>{p.on('pageerror',e=>errors.push(String(e)));
 p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
 const page=await context.newPage();
 await page.goto(origin+'/',{waitUntil:'load'});
 const result=await page.evaluate(()=>window.__kw338Probe());
 assert.equal(result.positive,3);assert.equal(result.negative,-3);assert.equal(result.zero,0);
 assert.equal(result.pcTrace.modifier,3);assert.equal(result.negativePcTrace.modifier,-3);
 assert.equal(result.monsterTrace.modifier,3);
 assert.equal(result.spatialMode,'CONTEXT_MATRIX');assert.equal(result.space,'Restricted');
 await page.reload({waitUntil:'load'});
 const restored=await page.evaluate(()=>window.__kw338Restored());
 assert.equal(restored.mode,'CONTEXT_MATRIX','Mode lost on real save/reload');
 assert.equal(restored.space,'Restricted','Explicit combat Space lost on real save/reload');
 assert.deepEqual(errors,[],'Page/console/network errors');
 console.log('v0.4.338 REAL BROWSER Context Matrix: PASS; '+result.probeCount+
  ' deterministic cases; +3/-3/0, PC and armed monster live hits, natural exclusion, RAW/AAE isolation, unknown fail-neutral, source-equal calculator, trace and serializable combat context.');
} finally {await browser?.close();await new Promise(r=>server.close(r));}

if(false){ /* BEGIN_BROWSER_FIXTURE */
  window.__kw338Probe=()=>{
    const check=(value,message)=>{if(!value)throw new Error(message);};
    installHarnessFixture({distance:0,type:'orc',count:1});
    const pc=state.party[0],monster=state.combat.monsters[0];
    check(pc&&monster,'Real combat fixture missing');
    state.rules.weaponDamageMode='CONTEXT_MATRIX';
    const spear={...SHOP_ITEMS.spear,itemId:'spear'};
    check(getEngagement(pc,monster),'Real engagement missing');
    state.combat.contextMatrixSpace='Restricted';
    check(setEngagement(pc,monster,'far'),'Far measure unavailable');
    monster.contextMatrixTarget={size:'Large',protection:'Soft'};
    const pos=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(pos.eligible&&pos.modifier===3,'Positive +3 context missing');
    const packet={applied:5,rawBase:4,rawExpr:'1d6',raw:5,matrix:5};
    const positive=applyLiveContextMatrixDamage(packet,spear,pc,monster,'melee');
    check(positive.applied===8&&positive.contextMatrix.finalDamage===8,'Positive hit failed');
    check(positive.contextMatrix.rolledDamage===4,'Published roll provenance lost');
    monster.contextMatrixTarget={size:'Small',protection:'Hard'};
    state.combat.contextMatrixSpace='Open';
    check(setEngagement(pc,monster,'close'),'Close measure not authoritative');
    const neg=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(neg.eligible&&neg.modifier===-3,'Negative clamp expected -3');
    check(applyLiveContextMatrixDamage(packet,spear,pc,monster,'melee').applied===2,'Negative signed hit failed');
    monster.contextMatrixTarget={size:'Medium',protection:'Soft'};
    check(setEngagement(pc,monster,'normal'),'Normal measure not authoritative');
    const zero=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(zero.eligible&&zero.modifier===0,'Reference modifier zero expected');
    check(applyLiveContextMatrixDamage(packet,spear,pc,monster,'melee').applied===5,'Zero altered hit');
    monster.contextMatrixTarget={size:'Medium',protection:'Soft'};
    delete monster.contextMatrixTarget.size;
    const noSize=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(!noSize.eligible&&noSize.modifier===0,'Unknown Size did not fail neutral');
    monster.contextMatrixTarget={size:'Medium',protection:'Soft'};
    delete monster.contextMatrixTarget.protection;
    const noProtection=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(!noProtection.eligible&&noProtection.modifier===0,'Unknown Protection did not fail neutral');
    monster.contextMatrixTarget={size:'Large',protection:'Soft'};
    delete state.combat.contextMatrixSpace;
    const noSpace=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(!noSpace.eligible&&noSpace.modifier===0,'Unknown Space did not fail neutral');
    state.combat.contextMatrixSpace='Open';
    // A nonexistent engagement supplies no fighting measure. Do not erase a
    // real melee group: its authoritative range is correctly reconstructed.
    const outOfContact={...monster,id:'unengaged-context-probe'};
    const noMeasure=cmWeaponAdjustment(spear,pc,outOfContact,'melee');
    check(!noMeasure.eligible&&noMeasure.modifier===0,'Unknown Measure did not fail neutral');
    monster.contextMatrixTarget={size:'Large',protection:'Hard'};
    monster.ac=0;monster.immuneMagic=true;
    const phys=cmWeaponAdjustment(spear,pc,monster,'melee');
    monster.ac=9;monster.immuneMagic=false;
    const physSame=cmWeaponAdjustment(spear,pc,monster,'melee');
    check(phys.modifier===physSame.modifier,'AC or immunity converted to physical Protection');
    const bite={name:'bite',damage:'1d4',attackContext:{delivery:'natural',contextualWeaponDamageEligible:false}};
    const natural=cmWeaponAdjustment(spear,pc,monster,'melee',bite);
    check(!natural.eligible&&natural.modifier===0,'Natural attack entered weapon calculator');
    const missileBow={...SHOP_ITEMS.bow_short,itemId:'bow_short'};
    const missileContext=cmWeaponAdjustment(missileBow,pc,monster,'missile',null,'Far');
    check(missileContext.eligible&&Number.isInteger(missileContext.modifier),
      'Canonical missile with actual ranged measure must use Context Matrix');
    const missileHit=applyLiveContextMatrixDamage(packet,missileBow,pc,monster,'missile',null,'Far');
    check(missileHit.contextMatrix.eligible&&missileHit.applied===Math.max(0,5+missileContext.modifier),
      'Canonical missile hit damage must match the verified calculator');
    const noMissileMeasure=cmWeaponAdjustment(missileBow,pc,monster,'missile');
    check(!noMissileMeasure.eligible&&noMissileMeasure.modifier===0,
      'Unknown missile Measure must fail neutral');
    const unknownWeapon=cmWeaponAdjustment({...spear,matrixId:'Unmapped (RC)'},pc,monster,'melee');
    check(!unknownWeapon.eligible&&unknownWeapon.modifier===0,'Unknown weapon became eligible');
    state.rules.weaponDamageMode='RAW';
    check(applyLiveContextMatrixDamage(packet,spear,pc,monster,'melee')===packet,'RAW mutated');
    state.rules.weaponDamageMode='AAE';
    check(applyLiveContextMatrixDamage(packet,spear,pc,monster,'melee')===packet,'AAE mutated');
    state.rules.weaponDamageMode='CONTEXT_MATRIX';
    monster.contextMatrixTarget={size:'Large',protection:'Soft'};
    state.combat.contextMatrixSpace='Restricted';
    check(setEngagement(pc,monster,'far'),'Far measure for live hit');
    pc.inventory=[{itemId:'spear',name:'Spear',qty:1,enc:30}];
    pc.equippedWeapon={itemId:'spear',name:'Spear',matrixId:'Spear (RC)'};
    pc.thac0=-50;monster.ac=9;monster.hp=monster.maxHp=4000;
    state.combat.lastContextMatrixDamage=null;
    for(let i=0;i<8&&!state.combat.lastContextMatrixDamage;i++)
      pcWeaponAttack(pc,monster,'melee','far');
    const pcTrace=state.combat.lastContextMatrixDamage;
    check(pcTrace&&pcTrace.modifier===3&&pcTrace.weapon==='Spear'&&pcTrace.mode==='CONTEXT_MATRIX',
      'Actual PC spear hit failed live calculator');
    check(pcTrace.finalDamage===pcTrace.rawAdjustedDamage+3,'PC formula double counted modifiers');
    state.combat.lastContextMatrixDamage=null;
    monster.contextMatrixTarget={size:'Small',protection:'Hard'};
    state.combat.contextMatrixSpace='Open';
    check(setEngagement(pc,monster,'close'),'Actual negative measure not available');
    for(let i=0;i<8&&!state.combat.lastContextMatrixDamage;i++)
      pcWeaponAttack(pc,monster,'melee','close');
    const negativePcTrace=state.combat.lastContextMatrixDamage;
    check(negativePcTrace&&negativePcTrace.modifier===-3&&
      negativePcTrace.finalDamage===Math.max(0,negativePcTrace.rawAdjustedDamage-3),
      'Actual PC negative hit must use exactly -3 after existing modifiers');
    monster.contextMatrixTarget={size:'Large',protection:'Soft'};
    state.combat.contextMatrixSpace='Restricted';
    check(setEngagement(pc,monster,'far'),'Restore long actual fighting measure');
    state.combat.lastContextMatrixDamage=null;
    monster.weaponId='spear';monster.naturalDamage=null;
    monster.attacks=[{name:'weapon',damage:null}];monster.damageMod=0;monster.thac0=-50;
    pc.hp=pc.maxHp=4000;pc.ac=9;pc.contextMatrixTarget={size:'Large',protection:'Soft'};
    for(let i=0;i<8&&!state.combat.lastContextMatrixDamage;i++)monsterAttack(monster,pc);
    const monsterTrace=state.combat.lastContextMatrixDamage;
    check(monsterTrace&&monsterTrace.modifier===3&&monsterTrace.weapon==='Spear',
      'Actual armed monster hit failed live calculator');
    state.combat.lastContextMatrixDamage=null;
    monster.attacks=[bite];monster.naturalDamage='1d4';
    for(let i=0;i<3;i++)monsterAttack(monster,pc);
    check(state.combat.lastContextMatrixDamage===null,'Actual bite must never use Context Matrix');
    const saved=JSON.parse(JSON.stringify({rules:state.rules,combat:state.combat}));
    updatePanels();
    check(saved.rules.weaponDamageMode==='CONTEXT_MATRIX'&&saved.combat.contextMatrixSpace==='Restricted',
      'Mode or persistent context lost in save serialization');
    check(saved.combat.lastContextMatrixDamage===null,'Natural hit misreported');
    return {positive:pos.modifier,negative:neg.modifier,zero:zero.modifier,pcTrace,negativePcTrace,monsterTrace,
      spatialMode:saved.rules.weaponDamageMode,space:saved.combat.contextMatrixSpace,probeCount:29};
  };
  window.__kw338Restored=()=>({mode:state.rules?.weaponDamageMode,space:state.combat?.contextMatrixSpace||null});
/* END_BROWSER_FIXTURE */ }
