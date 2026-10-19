// v0.4.339 CANDIDATE: native-browser combat measure control integration.
// Exact candidate HTML first boots WITHOUT fixture; only the second ephemeral
// route injects test setup. No change to production game bytes or save.
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import {chromium} from 'playwright';
const html=fs.readFileSync('index.html','utf8');
assert(html.includes("const APP_VERSION='0.4.341';") || (html.includes("const APP_VERSION='0.4.342';") || (html.includes("const APP_VERSION='0.4.343';") || html.includes("const APP_VERSION='0.4.344';"))));
assert.equal(html.split('  boot();\n})();').length,2);
const fixture=`window.__kwMeasure339 = function(test){
 const cases={
  far_spear_tie:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:5,pa:'hold',ma:'press',expected:'far'},
  far_spear_overcome:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:6,pa:'hold',ma:'press',expected:'far'},
  far_pike_tie:{weapon:'pike',type:'black_bear',range:'far',pi:4,mi:6,pa:'hold',ma:'press',expected:'far'},
  far_sword_neutral:{weapon:'sword_normal',type:'black_bear',range:'far',pi:4,mi:5,pa:'hold',ma:'press',expected:'normal'},
  far_dagger_no_natural_point:{weapon:'dagger',type:'black_bear',range:'far',pi:5,mi:4,pa:'press',ma:'hold',expected:'normal'},
  normal_pike_neutral:{weapon:'pike',type:'black_bear',range:'normal',pi:4,mi:5,pa:'hold',ma:'press',expected:'close'},
  normal_dagger_neutral:{weapon:'dagger',type:'black_bear',range:'normal',pi:4,mi:5,pa:'hold',ma:'press',expected:'close'},
  close_spear_natural_follow:{weapon:'spear',type:'black_bear',range:'close',pi:5,mi:4,pa:'open',ma:'press',expected:'close'},
  close_spear_escape:{weapon:'spear',type:'black_bear',range:'close',pi:6,mi:4,pa:'open',ma:'press',expected:'close'},
  close_pike_natural_follow_two:{weapon:'pike',type:'black_bear',range:'close',pi:6,mi:4,pa:'open',ma:'press',expected:'close'},
  close_no_passive_grapple:{weapon:'spear',type:'black_bear',range:'close',pi:5,mi:4,pa:'open',ma:'hold',expected:'normal'},
  close_monster_not_attacking:{weapon:'spear',type:'black_bear',range:'close',pi:5,mi:4,pa:'open',ma:'press',monsterAction:'hold',expected:'normal'},
  far_monster_weapon:{weapon:'dagger',type:'black_bear',monsterWeapon:'spear',range:'far',pi:5,mi:4,pa:'press',ma:'hold',expected:'far'},
  close_vs_armed_monster:{weapon:'dagger',type:'black_bear',monsterWeapon:'pike',range:'close',pi:4,mi:5,pa:'press',ma:'open',expected:'close'},
  unknown_monster_no_bonus:{weapon:'spear',type:'skeleton',unknownMonster:true,range:'far',pi:4,mi:5,pa:'hold',ma:'press',expected:'normal'},
  close_unknown_natural_no_bonus:{weapon:'spear',type:'skeleton',unknownMonster:true,range:'close',pi:5,mi:4,pa:'open',ma:'press',expected:'normal'},
  far_spell_caster_no_threat:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:5,pa:'hold',ma:'press',pcAction:'spell',expected:'normal'},
  modified_initiative:{weapon:'spear',type:'black_bear',range:'far',pi:7,mi:0,rawPi:1,rawMi:6,pa:'hold',ma:'press',expected:'normal'},
  normal_modified_initiative:{weapon:'pike',type:'black_bear',range:'normal',pi:0,mi:7,rawPi:6,rawMi:1,pa:'hold',ma:'press',expected:'normal'},
  multi_actor_fallback:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:5,pa:'hold',ma:'press',multi:true,expected:'far'}
 };
 const t=cases[test];if(!t)throw Error('unknown case '+test);
 installHarnessFixture({distance:0,type:t.type,count:1});
 state.party=state.party.slice(0,t.multi?2:1);
 const pc=state.party[0],foe=state.combat.monsters[0];
 for(const p of state.party) setCombatPcVector(p,{x:0,y:0,z:0});
 setCombatMonsterVector(foe,{x:4,y:0,z:0});
 pc.equippedWeapon={itemId:t.weapon,name:SHOP_ITEMS[t.weapon].name,matrixId:SHOP_ITEMS[t.weapon].matrixId};
 if(t.multi)state.party[1].equippedWeapon={itemId:'sword_normal',name:'Normal Sword',matrixId:'Sword, Normal (RC)'};
 if(t.monsterWeapon){foe.noWeapons=false;foe.weaponId=t.monsterWeapon;foe.attacks=null;}
 if(t.unknownMonster){foe.weaponId=null;foe.attacks=null;}
 setEngagement(pc,foe,t.range);
 if(t.multi)setEngagement(state.party[1],foe,t.range);
 state.combat.round=2;
 state.combat.meleeDistanceResolvedRound=0;
 state.combat.initiative={rolls:{pc:t.pi,foes:t.mi},
  rawRolls:{pc:t.rawPi??t.pi,foes:t.rawMi??t.mi},pc:t.pi,monster:t.mi};
 state.combat.pcOrders={[pc.name.toLowerCase()]:{rangeIntent:t.pa,movement:'hold',action:t.pcAction||'hold'}};
 if(t.multi)state.combat.pcOrders[state.party[1].name.toLowerCase()]={rangeIntent:'hold',movement:'hold',action:'hold'};
 state.combat.monsterOrders={[foe.id]:{rangeIntent:t.ma,movement:'hold',action:t.monsterAction||'melee',targetName:pc.name}};
 const first=meleeGroups()[0],before={range:first?.range,participants:first?.pcNames.length+first?.monsterIds.length,
  naturalDamage:foe.naturalDamage,attacks:JSON.stringify(foe.attacks),pcHp:pc.hp,monsterHp:foe.hp,seed:state.seed,round:state.combat.round};
 resolveMeleeDistanceContests();
 const after={range:getEngagement(pc,foe)?.range,pcHp:pc.hp,monsterHp:foe.hp,seed:state.seed,round:state.combat.round,marker:state.combat.meleeDistanceResolvedRound,
  naturalDamage:foe.naturalDamage,attacks:JSON.stringify(foe.attacks)};
 resolveMeleeDistanceContests();
 return {test,expected:t.expected,before,after,afterRepeat:getEngagement(pc,foe)?.range};
};`;
const candidate=html.replace('  boot();\n})();',fixture+'\n  boot();\n})();');
const server=http.createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 if(!['/index.html','/__measure-fixture.html'].includes(req.url)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(req.url==='/index.html'?html:candidate);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
let browser,assertions=0;
const chk=(a,b,label)=>{assert.deepEqual(a,b,label);assertions++;};
const errors=[];
try{
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext();
 await context.route('**/*',route=>{
  if(new URL(route.request().url()).origin===origin)return route.continue();
  errors.push('external network '+route.request().url());return route.abort();
 });
 context.on('page',p=>{p.on('pageerror',e=>errors.push('page '+e));p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text());});});
 const page=await context.newPage();
 await page.goto(origin+'/index.html',{waitUntil:'load'});
 await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
 chk(await page.evaluate(()=>typeof window.__kwMeasure339),'undefined','Exact candidate HTML must not expose fixture');
 await page.goto(origin+'/__measure-fixture.html',{waitUntil:'load'});
 await page.waitForFunction(()=>typeof window.__kwMeasure339==='function');
 const ids=['far_spear_tie','far_spear_overcome','far_pike_tie','far_sword_neutral',
 'far_dagger_no_natural_point','normal_pike_neutral','normal_dagger_neutral',
 'close_spear_natural_follow','close_spear_escape','close_pike_natural_follow_two',
 'close_no_passive_grapple','close_monster_not_attacking','far_monster_weapon',
 'close_vs_armed_monster','unknown_monster_no_bonus','close_unknown_natural_no_bonus',
 'far_spell_caster_no_threat','modified_initiative','normal_modified_initiative','multi_actor_fallback'];
 for(const id of ids){
  const r=await page.evaluate(id=>window.__kwMeasure339(id),id);
  chk(r.after.range,r.expected,id+' outcome');
  chk(r.afterRepeat,r.after.range,id+' no double resolution');
  chk(r.after.marker,2,id+' one per round');
  chk(r.after.pcHp,r.before.pcHp,id+' PC health untouched');
  chk(r.after.monsterHp,r.before.monsterHp,id+' monster health untouched');
  chk(r.after.seed,r.before.seed,id+' no extra die roll');
  chk(r.after.round,r.before.round,id+' no extra round');
  chk(r.after.naturalDamage,r.before.naturalDamage,id+' natural damage untouched');
  chk(r.after.attacks,r.before.attacks,id+' attack preferences/delivery untouched');
  chk(r.before.participants,id==='multi_actor_fallback'?3:2,id+' participants');
 }
 chk(errors,[],'No browser/console/network errors');
 console.log(JSON.stringify({status:'PASS',scope:'candidate live measure resolver, temporary browser-only fixtures',
  scenarios:ids.length,assertions,errors,version:'0.4.339'}));
}catch(err){console.error(String(err.stack||err));process.exitCode=1;}
finally{await browser?.close();await new Promise(r=>server.close(r));}
