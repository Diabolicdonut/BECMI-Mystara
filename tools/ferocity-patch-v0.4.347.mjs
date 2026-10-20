import fs from 'node:fs';
import crypto from 'node:crypto';
const path='index.html';let s=fs.readFileSync(path,'utf8');
function replaceOnce(a,b,label){const n=s.split(a).length-1;if(n!==1)throw Error(label+' anchor count='+n);s=s.replace(a,b);}
const mechanics=String.raw\`
  // v0.4.347: bounded source-reviewed creature Ferocity, not a weapon/attack bonus.
  // Mentzer Basic pp. 26-27, 39. A source list is not a blanket monster trait.
  const MEASURE_FEROCITY_FACTS=Object.freeze({
    wolf:{recordId:'MON-0104',sourcePage:39},
    black_bear:{recordId:'MON-0007',sourcePage:26},
    grizzly_bear:{recordId:'MON-0008',sourcePage:26},
    boar:{recordId:'MON-0016',sourcePage:27},
    berserker:{recordId:'MON-0015',sourcePage:27}
  });
  function measureFerocitySourceVerified(actor){
    if(!actor||typeof actor!=='object')return false;
    const f=MEASURE_FEROCITY_FACTS[actor.type],p=COMBAT_MONSTERS[actor.type];
    return Boolean(f&&p&&actor.recordId===f.recordId&&p.recordId===f.recordId&&
      actor.source==='Mentzer Basic D&D'&&p.source==='Mentzer Basic D&D'&&
      Number(actor.sourcePage)===f.sourcePage&&Number(p.sourcePage)===f.sourcePage);
  }
  function measureCreatureFerocious(actor){
    if(!measureFerocitySourceVerified(actor))return false;
    if(Object.prototype.hasOwnProperty.call(actor,'measureTraits')){
      const traits=actor.measureTraits;
      return Boolean(traits&&typeof traits==='object'&&!Array.isArray(traits)&&traits.ferocious===true);
    }
    // Sparse older saves derive this exact source-backed fact without mutation.
    return true;
  }
  function meleeControlFerocityContext(group,band){
    const bonus={};
    if(pureBecmiRawCombat()||!RANGE_ORDER.includes(band)||
       group.pcNames.length!==1||group.monsterIds.length!==1)return {bonus};
    const pc=state.party.find(p=>p.name.toLowerCase()===group.pcNames[0]),
      mon=state.combat?.monsters.find(m=>m.id===group.monsterIds[0]);
    if(!pc||!mon||!atMeleeContact(pc,mon))return {bonus};
    const ps=pcInitiativeSideId(pc),ms=monsterInitiativeSideId(mon);
    if(ps===ms)return {bonus};
    const eligible=(actor,order,item)=>{
      return !masteryCannotAttack(actor)&&order?.action!=='spell'&&
        (!item||contextualRigidWeaponStatus(actor,item).allowed);
    };
    if(!pc.dead&&Number(pc.hp)>0&&pc.measureTraits?.ferocious===true&&
       eligible(pc,state.combat.pcOrders?.[pc.name.toLowerCase()],equippedWeaponItem(pc)))bonus[ps]=1;
    if(monsterCanFight(mon)&&measureCreatureFerocious(mon)&&
       eligible(mon,state.combat.monsterOrders?.[mon.id],monsterWeaponItem(mon)))bonus[ms]=1;
    return {bonus};
  }

\`;
replaceOnce('  // v0.4.346: current Measure determines Size advantage.',mechanics+'  // v0.4.346: current Measure determines Size advantage.','mechanics');
replaceOnce('    monster.sourcePage=p.sourcePage??null;\n    monster.directCombatEligible',
'    monster.sourcePage=p.sourcePage??null;\n    if(measureFerocitySourceVerified(monster))monster.measureTraits={ferocious:true};\n    monster.directCombatEligible','spawn');
replaceOnce('        const context=meleeControlSizeContext({pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id]},before);\n        measureBonuses=context.bonus;\n        const score=id=>rolls[id]+(measureBonuses[id]||0),high=Math.max(...sideIds.map(score));',
'        const group={pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id]};\n        const sizeContext=meleeControlSizeContext(group,before),ferocity=meleeControlFerocityContext(group,before);\n        measureBonuses={...sizeContext.bonus};\n        for(const [side,bonus] of Object.entries(ferocity.bonus))measureBonuses[side]=(measureBonuses[side]||0)+bonus;\n        const context={why:sizeContext.why+(Object.keys(ferocity.bonus).length?"; source-reviewed Ferocity":"")};\n        const score=id=>rolls[id]+(measureBonuses[id]||0),high=Math.max(...sideIds.map(score));','sum separate bonuses');
const tests=String.raw\`
      {name:'v0.4.347 source-reviewed animal and exceptional berserker trait assignment only',run:()=>{
        for(const type of ['wolf','black_bear','grizzly_bear','boar','berserker']){
          const m=createCombatMonster(type,1);
          harnessAssert(measureFerocitySourceVerified(m)&&measureCreatureFerocious(m)&&m.measureTraits.ferocious===true,'Missing reviewed '+type);
        }
        for(const type of ['goblin','orc','skeleton','zombie','kobold']){
          const m=createCombatMonster(type,1);
          harnessAssert(!measureCreatureFerocious(m)&&!Object.prototype.hasOwnProperty.call(m,'measureTraits'),'Automatic nonsourced '+type);
          m.measureTraits={ferocious:true};harnessAssert(!measureCreatureFerocious(m),'Unsourced true bypassed review');
        }
      }},
      {name:'v0.4.347 Far Normal Close and all intentions grant independent Ferocity',run:()=>{
        for(const band of RANGE_ORDER)for(const pi of ['press','hold','open'])for(const mi of ['press','hold','open']){
          const {pc,mon,c,group}=harnessMeasureSizeFixture346({weapon:'dagger',band});
          c.pcOrders[pc.name.toLowerCase()].rangeIntent=pi;c.monsterOrders[mon.id].rangeIntent=mi;
          const trait=meleeControlFerocityContext(group,band).bonus,sz=meleeControlSizeContext(group,band).bonus;
          harnessAssert(trait.foes===1&&trait.pc===undefined,'Trait conditional on intention/band');
          harnessAssert((sz.pc||0)===(band==='close'?2:0)&&(sz.foes||0)===(band==='far'?2:0),'Existing Size changed');
        }
      }},
      {name:'v0.4.347 all 36 original d6 outcomes add one for armed berserker only',run:()=>{
        for(const band of RANGE_ORDER)for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){
          const {pc,mon,c}=harnessMeasureSizeFixture346({weapon:'sword_normal',foeWeapon:'sword_normal',type:'berserker',band});
          c.pcOrders[pc.name.toLowerCase()].rangeIntent='open';c.monsterOrders[mon.id].rangeIntent='press';
          c.initiative.rawRolls={pc:a,foes:b};const initiative=harnessFingerprint(c.initiative),seed=state.seed;
          const action=a===b+1?'hold':a>b+1?'open':'press',idx=RANGE_ORDER.indexOf(band);
          const expected=RANGE_ORDER[Math.max(0,Math.min(2,idx+(action==='open'?1:action==='press'?-1:0)))];
          resolveMeleeDistanceContests();
          harnessAssert(getEngagement(pc,mon).range===expected,'Wrong Ferocity opposed result');
          harnessAssert(harnessFingerprint(c.initiative)===initiative&&state.seed===seed,'Altered actual initiative dice or RNG');
        }
      }},
      {name:'v0.4.347 missing null false zero and malformed creature overrides remain distinct',run:()=>{
        const {mon,c,group}=harnessMeasureSizeFixture346({weapon:'sword_normal',foeWeapon:'sword_normal',type:'berserker'});
        for(const value of [null,false,0,'true',{}, {ferocious:null},{ferocious:false},{ferocious:0},{ferocious:'true'}]){
          mon.measureTraits=value;
          harnessAssert(!measureCreatureFerocious(mon)&&!meleeControlFerocityContext(group,'normal').bonus.foes,'Invalid override became true');
          const loaded=migrateSave(harnessClone(state));
          harnessAssert(harnessFingerprint(loaded.combat.monsters[0].measureTraits)===harnessFingerprint(value),'Migration corrupted literal');
        }
        delete mon.measureTraits;
        const loaded=migrateSave(harnessClone(state));
        harnessAssert(measureCreatureFerocious(mon)&&!Object.prototype.hasOwnProperty.call(loaded.combat.monsters[0],'measureTraits')&&measureCreatureFerocious(loaded.combat.monsters[0]),'Sparse old-save fact mutated');
      }},
      {name:'v0.4.347 Ferocity belongs to creature not weapon attack or temperament',run:()=>{
        const {mon,c,group}=harnessMeasureSizeFixture346({weapon:'sword_normal',foeWeapon:'sword_normal',type:'berserker'});
        const baseline=harnessFingerprint({seed:state.seed,initiative:c.initiative,attacks:mon.attacks,damage:mon.naturalDamage,morale:mon.morale});
        for(const w of ['sword_normal','dagger','spear']){
          mon.weaponId=w;harnessAssert(meleeControlFerocityContext(group,'normal').bonus.foes===1,'Trait weapon-dependent');
        }
        harnessAssert(harnessFingerprint({seed:state.seed,initiative:c.initiative,attacks:mon.attacks,damage:mon.naturalDamage,morale:mon.morale})===baseline,'Trait altered combat packet or mood');
      }},
      {name:'v0.4.347 casting clearance surprise and independent six opponent control',run:()=>{
        const {pc,mon,c,group}=harnessMeasureSizeFixture346({weapon:'spear',band:'far',count:6});
        for(const m of c.monsters)harnessAssert(meleeControlFerocityContext({pcNames:[pc.name.toLowerCase()],monsterIds:[m.id]},'far').bonus.foes===1,'Pair trait missing');
        c.monsterOrders[mon.id].action='spell';harnessAssert(!meleeControlFerocityContext(group,'far').bonus.foes,'Caster gained control');
        c.monsterOrders[mon.id].action='melee';
        mon.noWeapons=false;mon.weaponId='pike';mon.attacks=null;c.rigidWeaponClearance={siteId:null,confined:true};
        harnessAssert(!meleeControlFerocityContext(group,'far').bonus.foes,'Unusable rigid weapon gained trait control');
        c.surpriseRoundActive={side:'pc'};const before=state.seed;resolveMeleeDistanceContests();
        harnessAssert(state.seed===before,'Surprise consumed Ferocity die');
      }},
      {name:'v0.4.347 pure BECMI RAW never applies Ferocity or alters damage',run:()=>{
        for(const mode of ['RAW','AAE','CONTEXT_MATRIX']){
          const {pc,mon,c,group}=harnessMeasureSizeFixture346({weapon:'dagger',band:'close'});
          state.rules.combatProcedureMode='RAW';state.rules.weaponDamageMode=mode;
          const before=harnessFingerprint({seed:state.seed,init:c.initiative,attacks:mon.attacks,damage:mon.naturalDamage,engagements:c.engagements});
          harnessAssert(Object.keys(meleeControlFerocityContext(group,'close').bonus).length===0,'RAW received trait');
          resolveMeleeDistanceContests();
          harnessAssert(harnessFingerprint({seed:state.seed,init:c.initiative,attacks:mon.attacks,damage:mon.naturalDamage,engagements:c.engagements})===before,'RAW mechanics changed');
        }
      }},
      {name:'v0.4.347 old and repeated save migration preserve trait and initiative',run:()=>{
        const {mon,c}=harnessMeasureSizeFixture346({weapon:'dagger',band:'close'});
        recordDmr2ShipRosterContract('ferocity347',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
        for(const value of [undefined,null,false,0,{ferocious:true},{ferocious:false}]){
          if(value===undefined)delete mon.measureTraits;else mon.measureTraits=value;
          const loaded=migrateSave(migrateSave(harnessClone(state))),stored=loaded.combat.monsters.find(m=>m.id===mon.id);
          harnessAssert(Object.prototype.hasOwnProperty.call(stored,'measureTraits')===(value!==undefined),'Missing vs supplied field confused');
          if(value!==undefined)harnessAssert(harnessFingerprint(stored.measureTraits)===harnessFingerprint(value),'Explicit value corrupted');
          harnessAssert(harnessFingerprint(loaded.combat.initiative)===harnessFingerprint(c.initiative)&&harnessFingerprint(loaded.dmr2ShipRosterContracts)===harnessFingerprint(state.dmr2ShipRosterContracts),'Migration altered dice/ships');
        }
      }},
\`;
replaceOnce('  function coreHarnessTestDefinitions(){\n    return [\n','  function coreHarnessTestDefinitions(){\n    return [\n'+tests,'regression suite');
fs.writeFileSync(path,s);
const names=[...tests.matchAll(/name:'(v0\.4\.347 [^']+)'/g)].map(m=>m[1]);
if(names.length!==8)throw Error('Expected eight named tests');
const prev=JSON.parse(fs.readFileSync('validation/manifests/v0.4.346.json','utf8'));
const next={...prev,version:'0.4.347',core:[...names,...prev.core],focused:[...names,...prev.focused],
  acceptedVersion:'0.4.346',
  productionSha256:crypto.createHash('sha256').update(s).digest('hex')};
fs.writeFileSync('validation/manifests/v0.4.347.json',JSON.stringify(next,null,2)+'\n');
console.log(JSON.stringify({testCount:names.length,productionSha256:next.productionSha256,bytes:s.length}));
