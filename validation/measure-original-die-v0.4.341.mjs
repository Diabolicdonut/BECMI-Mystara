// v0.4.341: exact production first, temporary native browser fixture second.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
const html=fs.readFileSync('index.html','utf8');
assert(html.includes("const APP_VERSION='0.4.341';"));
assert.equal(html.split('  boot();\n})();').length,2);
const fixture=`window.__kwOriginal341=function(mode){
  if(mode==='roll'){
    installHarnessFixture({distance:0,type:'goblin',count:1});
    const seed=state.seed,init=rollCombatInitiativeSides(),ids=Object.keys(init.rolls);
    return {seed,after:state.seed,raw:init.rawRolls,rolls:init.rolls,mods:init.modifiers,ids};
  }
  const suite=[
    {long:'sword_normal',short:'sword_normal',diff:0},
    {long:'pike',short:'spear',diff:1},
    {long:'spear',short:'sword_normal',diff:2},
    {long:'pike',short:'sword_normal',diff:3},
    {long:'pike',short:'dagger',diff:5}
  ];
  const results=[];
  for(const entry of suite)for(const longPc of [true,false])for(const band of ['far','normal','close']){
    installHarnessFixture({distance:0,type:'goblin',count:1});
    state.party=state.party.slice(0,1);
    const pc=state.party[0],foe=state.combat.monsters[0];
    setCombatPcVector(pc,{x:0,y:0,z:0});
    setCombatMonsterVector(foe,{x:4,y:0,z:0});
    const pcWeapon=longPc?entry.long:entry.short,foeWeapon=longPc?entry.short:entry.long;
    pc.equippedWeapon={itemId:pcWeapon,name:SHOP_ITEMS[pcWeapon].name,matrixId:SHOP_ITEMS[pcWeapon].matrixId};
    foe.noWeapons=false;foe.weaponId=foeWeapon;foe.attacks=null;
    setEngagement(pc,foe,band);
    state.combat.round=2;
    const pInt=band==='close'?(longPc?'open':'press'):(longPc?'hold':'press');
    const mInt=band==='close'?(longPc?'press':'open'):(longPc?'press':'hold');
    state.combat.pcOrders={[pc.name.toLowerCase()]:{rangeIntent:pInt,movement:'hold',action:'melee'}};
    state.combat.monsterOrders={[foe.id]:{rangeIntent:mInt,movement:'hold',action:'melee',targetName:pc.name}};
    for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){
      const pair=getEngagement(pc,foe);
      pair.range=band;
      pair.formedRound=1;
      state.combat.meleeDistanceResolvedRound=0;
      state.combat.initiative={rawRolls:{pc:a,foes:b},rolls:{pc:a+20,foes:b-20},
        modifiers:{pc:20,foes:-20},pc:a+20,monster:b-20};
      const beforeSeed=state.seed;
      resolveMeleeDistanceContests();
      results.push({diff:entry.diff,longPc,band,a,b,result:getEngagement(pc,foe)?.range,
        seeded:state.seed===beforeSeed,rawA:state.combat.initiative.rawRolls.pc,
        rawB:state.combat.initiative.rawRolls.foes,adjustedA:state.combat.initiative.rolls.pc});
    }
  }
  if(mode==='missing'){
    installHarnessFixture({distance:0,type:'goblin',count:1});
    state.party=state.party.slice(0,1);
    const pc=state.party[0],foe=state.combat.monsters[0];
    setCombatPcVector(pc,{x:0,y:0,z:0});setCombatMonsterVector(foe,{x:4,y:0,z:0});
    pc.equippedWeapon={itemId:'pike',name:SHOP_ITEMS.pike.name,matrixId:SHOP_ITEMS.pike.matrixId};
    foe.noWeapons=false;foe.weaponId='dagger';foe.attacks=null;
    setEngagement(pc,foe,'normal');state.combat.round=2;
    state.combat.initiative={rolls:{pc:6,foes:1},modifiers:{pc:1,foes:0}};
    state.combat.pcOrders={[pc.name.toLowerCase()]:{rangeIntent:'hold',action:'melee'}};
    state.combat.monsterOrders={[foe.id]:{rangeIntent:'press',action:'melee',targetName:pc.name}};
    state.combat.meleeDistanceResolvedRound=0;
    const seed=state.seed;resolveMeleeDistanceContests();
    return {band:getEngagement(pc,foe)?.range,unchanged:seed===state.seed};
  }
  return results;
};`;
const served=html.replace('  boot();\n})();',fixture+'\n  boot();\n})();');
const server=http.createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(req.url==='/index.html'?html:served);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser,assertions=0;const errors=[];
const check=(a,b,msg)=>{assert.deepEqual(a,b,msg);assertions++};
try{
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext();
 const origin='http://127.0.0.1:'+server.address().port;
 await context.route('**/*',route=>{
   if(new URL(route.request().url()).origin===origin)return route.continue();
   errors.push('external '+route.request().url());return route.abort();
 });
 context.on('page',p=>{
   p.on('pageerror',e=>errors.push('page '+e));
   p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text())});
 });
 const page=await context.newPage();
 await page.goto(origin+'/index.html',{waitUntil:'load'});
 await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
 check(await page.evaluate(()=>typeof window.__kwOriginal341),'undefined','Production contains no fixture');
 await page.goto(origin+'/__fixture',{waitUntil:'load'});
 await page.waitForFunction(()=>typeof window.__kwOriginal341==='function');
 const testRoll=await page.evaluate(()=>window.__kwOriginal341('roll'));
 check(testRoll.ids.length>=2,true,'initiative sides rolled');
 for(const id of testRoll.ids){
   check(Number.isInteger(testRoll.raw[id])&&testRoll.raw[id]>=1&&testRoll.raw[id]<=6,true,'original d6 for '+id);
   check(testRoll.rolls[id],testRoll.raw[id]+testRoll.mods[id],'modified initiative unchanged '+id);
 }
 const cases=await page.evaluate(()=>window.__kwOriginal341('matrix'));
 check(cases.length,1080,'all 36 dice x 5 Size differences x 3 bands x 2 directions');
 for(const t of cases){
   const advantage=Math.min(3,t.diff);
   let expected;
   if(t.band==='far')expected=(t.longPc?t.a+advantage>=t.b:t.b+advantage>=t.a)?'far':'normal';
   else if(t.band==='normal')expected=t.longPc?(t.a>=t.b?'normal':'close'):(t.a>t.b?'close':'normal');
   else expected=(t.longPc?t.b+advantage>=t.a:t.a+advantage>=t.b)?'close':'normal';
   const label=[t.diff,t.longPc,t.band,t.a,t.b].join('/');
   check(t.result,expected,'pair Measure '+label);
   check(t.seeded,true,'no Measure RNG '+label);
   check([t.rawA,t.rawB],[t.a,t.b],'recorded raw dice stable '+label);
   check(t.adjustedA,t.a+20,'modified total remains separate '+label);
 }
 const old=await page.evaluate(()=>window.__kwOriginal341('missing'));
 check(old.band,'normal','missing raw dice from old mid-round saves cannot infer control');
 check(old.unchanged,true,'old-save unknown no new dice');
 check(errors,[],'browser clean');
 console.log(JSON.stringify({status:'PASS',version:'0.4.341',scenarios:1082,assertions,errors}));
}catch(e){console.error(e.stack||String(e));process.exitCode=1}
finally{await browser?.close();await new Promise(done=>server.close(done))}
