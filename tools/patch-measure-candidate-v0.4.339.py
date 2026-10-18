#!/usr/bin/env python3
"""One-time bounded v0.4.339 candidate construction from accepted v0.4.338.
Does NOT merge, accept, or modify any branch except the working checkout.
Writes only the game HTML, candidate version manifest, contextual regression
version detection, and explicit NOT ACCEPTED pipeline note.
"""
from pathlib import Path
import hashlib
import json

html_path=Path('index.html')
s=html_path.read_text(encoding='utf-8')
if "const APP_VERSION='0.4.339';" in s:
    assert 'function meleeControlSizeContext(' in s
    print('Measure candidate already constructed; no repeat')
    raise SystemExit(0)
assert "const APP_VERSION='0.4.338';" in s
assert s.count("  function resolveMeleeDistanceContests(){\n")==1
assert s.count("  function meleeControlSizeContext(")==0

helper="""  // v0.4.339 — Longer at Far, neutral at Normal, shorter at Close when
  // actively pursuing. Existing initiative rolls only. This does NOT affect
  // attack damage, monster preferred attack measure, Power or Handling.
  function meleeControlActorRating(pc,monster){
    if(pc){
      if(pc.dead||Number(pc.hp)<=0)return null;
      const item=equippedWeaponItem(pc),p=cmWeaponProfile(item);
      if(item?.missile||p?.category!=='Melee'||!Number.isInteger(p.sizeRating))return null;
      return {size:p.sizeRating,verifiedWeapon:true};
    }
    if(!monster||!monsterCanFight(monster))return null;
    const item=monsterWeaponItem(monster);
    if(item){
      const p=cmWeaponProfile(item);
      if(item.missile||p?.category!=='Melee'||!Number.isInteger(p.sizeRating))return null;
      return {size:p.sizeRating,verifiedWeapon:true};
    }
    const attacks=Array.isArray(monster.attacks)?monster.attacks:[];
    // Only identified natural melee attacks get the neutral Size 0 default;
    // mixed, absent or unresolved attack deliveries confer no Size bonus.
    if(!attacks.length||attacks.some(a=>a?.attackContext?.delivery!=='natural'||
      a?.attackContext?.contextualWeaponDamageEligible!==false))return null;
    return {size:0,verifiedWeapon:false};
  }

  function meleeControlSizeContext(group,measure,intents){
    const neutral=why=>({bonus:{},why});
    if(measure==='normal')return neutral('Normal Size-neutral');
    if(measure!=='far'&&measure!=='close')return neutral('unknown measure');
    // A connected melee shares one measure. A single actor's weapon reach
    // must not propagate to a formation, surround, or multi-side encounter.
    if(group.pcNames.length!==1||group.monsterIds.length!==1)
      return neutral('multi-combatant reach unresolved');
    const pc=state.party.find(p=>p.name.toLowerCase()===group.pcNames[0]);
    const mon=state.combat.monsters.find(m=>m.id===group.monsterIds[0]);
    if(!pc||!mon||!atMeleeContact(pc,mon))return neutral('contact not verified');
    const ps=pcInitiativeSideId(pc),ms=monsterInitiativeSideId(mon);
    if(ps===ms)return neutral('same-side actors');
    const a=meleeControlActorRating(pc,null),b=meleeControlActorRating(null,mon);
    if(!a||!b)return neutral('attack Size unresolved');
    const diff=a.size-b.size,steps=n=>n>=3?2:n>=1?1:0;
    const pi=intents[ps]||'hold',mi=intents[ms]||'hold';
    if(measure==='far'){
      // A neutral natural Size 0 is not itself proof of an active Far
      // weapon point; the longer defender must hold a real melee weapon.
      if(diff>0&&pi==='hold'&&mi==='press'&&a.verifiedWeapon&&
        !masteryCannotAttack(pc)&&
        state.combat.pcOrders[pc.name.toLowerCase()]?.action!=='spell')
        return {bonus:{[ps]:steps(diff)},why:'longer weapon Holds at Far'};
      if(diff<0&&mi==='hold'&&pi==='press'&&b.verifiedWeapon&&
        !masteryCannotAttack(mon))
        return {bonus:{[ms]:steps(-diff)},why:'longer weapon Holds at Far'};
      return neutral('no verified Far threat');
    }
    // Close advantage is ONLY active Press against Open, never passive
    // grapple, a free grab, or a replacement for actual BECMI withdrawal.
    if(diff<0&&pi==='press'&&mi==='open'&&!masteryCannotMove(pc)&&
      !masteryCannotAttack(pc)&&
      state.combat.pcOrders[pc.name.toLowerCase()]?.action!=='spell')
      return {bonus:{[ps]:steps(-diff)},why:'shorter attack pursues at Close'};
    if(diff>0&&mi==='press'&&pi==='open'&&!masteryCannotMove(mon)&&
      !masteryCannotAttack(mon)&&
      state.combat.monsterOrders[mon.id]?.action==='melee')
      return {bonus:{[ms]:steps(diff)},why:'shorter attack pursues at Close'};
    return neutral('no verified Close pursuit');
  }

"""
s=s.replace("  function resolveMeleeDistanceContests(){\n",
            helper+"  function resolveMeleeDistanceContests(){\n",1)
old="""      const uniqueIntents=[...new Set(Object.values(intents))];
      let applied='hold', reason='all sides hold';
      if(uniqueIntents.length===1){
        applied=uniqueIntents[0];
        reason=applied==='hold'?'all sides hold':`all sides ${applied}`;
      } else {
        const high=Math.max(...sideIds.map(id=>rolls[id]||0));
        const leaders=sideIds.filter(id=>(rolls[id]||0)===high);
        const leaderIntents=[...new Set(leaders.map(id=>intents[id]||'hold'))];
        if(leaderIntents.length===1){
          applied=leaderIntents[0];
          reason=`initiative control: ${leaders.map(sideLabel).join(' + ')}`;
        } else {
          applied='hold';
          reason=`tied initiative leaders want different distances`;
        }
      }"""
new="""      const uniqueIntents=[...new Set(Object.values(intents))];
      let applied='hold', reason='all sides hold',measureBonuses={};
      if(uniqueIntents.length===1){
        applied=uniqueIntents[0];
        reason=applied==='hold'?'all sides hold':`all sides ${applied}`;
      } else {
        // RAW retains its original side-phase order; use the already
        // declared range intentions and current authoritative contact.
        const context=meleeControlSizeContext(group,before,intents);
        measureBonuses=context.bonus;
        const score=id=>(rolls[id]||0)+(measureBonuses[id]||0);
        const high=Math.max(...sideIds.map(score));
        const leaders=sideIds.filter(id=>score(id)===high);
        const leaderIntents=[...new Set(leaders.map(id=>intents[id]||'hold'))];
        if(leaderIntents.length===1){
          applied=leaderIntents[0];
          reason=`measure control: ${leaders.map(sideLabel).join(' + ')}; ${context.why}`;
        } else {
          applied='hold';
          reason=`tied measure control; ${context.why}`;
        }
      }"""
assert s.count(old)==1, 'Cannot replace legacy initiative-selection block'
s=s.replace(old,new,1)
oldlog="const intentText=sideIds.map(id=>`${sideLabel(id)} ${String(intents[id]||'hold').toUpperCase()} (init ${rolls[id]||0})`).join('; ');"
newlog="const intentText=sideIds.map(id=>`${sideLabel(id)} ${String(intents[id]||'hold').toUpperCase()} (init ${rolls[id]||0}${measureBonuses[id]?` + Size ${measureBonuses[id]}`:''})`).join('; ');"
assert s.count(oldlog)==1,'Cannot replace measure narration'
s=s.replace(oldlog,newlog,1)
oldref="{type:'melee_distance',round:c.round,pcNames:group.pcNames.slice(),monsterIds:group.monsterIds.slice(),before,intents,rolls,applied,reason,after}"
assert s.count(oldref)==1,'Cannot replace referee-measure log'
s=s.replace(oldref,"{type:'melee_distance',round:c.round,pcNames:group.pcNames.slice(),monsterIds:group.monsterIds.slice(),before,intents,rolls,measureBonuses,applied,reason,after}",1)
s=s.replace("const APP_VERSION='0.4.338';","const APP_VERSION='0.4.339';",1)
assert s.count('function meleeControlSizeContext(')==1
html_path.write_text(s,encoding='utf-8')
sha=hashlib.sha256(s.encode('utf-8')).hexdigest()
prior=Path('validation/manifests/v0.4.338.json')
m=json.loads(prior.read_text(encoding='utf-8'))
assert m['version']=='0.4.338' and m['acceptedVersion']=='0.4.338'
m['version']='0.4.339'
m['acceptedVersion']='0.4.338'
m['productionSha256']=sha
Path('validation/manifests/v0.4.339.json').write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
# The existing contextual damage regression applies to both v338 and v339.
context=Path('validation/context-matrix-live.mjs')
t=context.read_text(encoding='utf-8')
assert t.count('assert(html.includes("const APP_VERSION=\'0.4.338\';"));')==1
t=t.replace('assert(html.includes("const APP_VERSION=\'0.4.338\';"));',
            'assert(/const APP_VERSION=\'0\\.4\\.(?:338|339)\';/.test(html));',1)
assert t.count("fs.readFileSync('validation/manifests/v0.4.338.json','utf8')")==1
t=t.replace("fs.readFileSync('validation/manifests/v0.4.338.json','utf8')",
            "fs.readFileSync(`validation/manifests/v${html.match(/const APP_VERSION='([^']+)'/)[1]}.json`,'utf8')",1)
context.write_text(t,encoding='utf-8')
pipeline=Path('pipeline-state.md')
p=pipeline.read_text(encoding='utf-8')
assert 'Current accepted build: **v0.4.338**' in p
p=p.replace('Current candidate: **none**.','Current candidate: **v0.4.339 measure resolution NOT ACCEPTED** — user reprioritized measure control before the previously queued local-scene foundation.',1)
p=p.replace('Exact next checkpoint: **v0.4.339 — persistent authoritative local-scene coordinate/state foundation only** (not started).',
            'Exact next checkpoint: **v0.4.339 — user-authorized measure resolution**, candidate only. Previously queued local-scene foundation deferred to **v0.4.340** pending future authorization.',1)
pipeline.write_text(p,encoding='utf-8')
print('CANDIDATE PATCH READY v0.4.339 production SHA-256 '+sha+'; accepted v0.4.338 preserved')
