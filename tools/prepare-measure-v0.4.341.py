#!/usr/bin/env python3
"""Bounded v0.4.341 measure die/Size patch from accepted v0.4.340.
No production modification or main promotion outside the dedicated work action.
"""
from pathlib import Path
import hashlib,json
p=Path('index.html')
s=p.read_text()
assert hashlib.sha256(s.encode()).hexdigest()=='8d30711a555bb16961a9f0548fb32cac2b89ce60cfb6d4a9cfb0be91ddc66992', 'Expected accepted v0.4.340'
def edit(old,new,label):
    global s
    n=s.count(old)
    assert n==1,(label,n)
    s=s.replace(old,new,1)
edit("const APP_VERSION='0.4.340';","const APP_VERSION='0.4.341';",'version')
edit("    const rolls={},modifiers={};\n    for(const side of sides){modifiers[side.id]=homunculusInitiativeBonusForSide(side.id)+woodSpiderSluggishInitiativeModifierForSide(side.id);rolls[side.id]=rng(6)+modifiers[side.id];}",
"""    const rolls={},rawRolls={},modifiers={};
    for(const side of sides){
      modifiers[side.id]=homunculusInitiativeBonusForSide(side.id)+woodSpiderSluggishInitiativeModifierForSide(side.id);
      const die=rng(6); // exactly the previously consumed d6; no additional RNG
      rawRolls[side.id]=die;
      rolls[side.id]=die+modifiers[side.id];
    }""",'capture original dice')
edit("      rolls,modifiers,order,winners,winner,","      rolls,rawRolls,modifiers,order,winners,winner,",'store dice')
anchor="  function meleeGroupNames(group){"
helper="""  // A missing old-save die is unknown, never reconstructed by subtracting
  // modifiers or interpreting a modified initiative total as a raw d6.
  function measureUnmodifiedInitiativeDie(sideId){
    const dice=state.combat?.initiative?.rawRolls;
    if(!dice||!Object.prototype.hasOwnProperty.call(dice,sideId))return null;
    const die=dice[sideId];
    return Number.isInteger(die)&&die>=1&&die<=6?die:null;
  }

"""
edit(anchor,helper+anchor,'pure raw getter')
edit("const diff=a.size-b.size,steps=n=>n>=3?2:n>=1?1:0;",
     "const diff=a.size-b.size,steps=n=>Math.min(3,Math.abs(n));",'Size delta 0/1/2/3 cap')
edit("      const rolls=Object.fromEntries(sideIds.map(id=>[id,initiativeRollForSide(id)]));",
     "      const rolls=Object.fromEntries(sideIds.map(id=>[id,measureUnmodifiedInitiativeDie(id)]));",'contest reads raw dice')
edit("""      const uniqueIntents=[...new Set(Object.values(intents))];
      let applied='hold',reason='all sides hold',measureBonuses={};""",
"""      // Pre-v0.4.341 mid-round saves may lack original dice. Preserve the
      // existing pair band; the next actual round supplies a new rawRolls map.
      if(sideIds.some(id=>rolls[id]===null)){
        void refereeLog('MELEE DISTANCE — unmodified initiative die unavailable',
          {type:'melee_distance',round:c.round,pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id],before,after:before,missingRawDice:true});
        continue;
      }
      const uniqueIntents=[...new Set(Object.values(intents))];
      let applied='hold',reason='all sides hold',measureBonuses={};""",'fail neutral rather than guess')
p.write_text(s)
sha=hashlib.sha256(s.encode()).hexdigest()
m=json.loads(Path('validation/manifests/v0.4.340.json').read_text())
assert m['version']=='0.4.340'
m['version']='0.4.341'
m['acceptedVersion']='0.4.340'
m['productionSha256']=sha
Path('validation/manifests/v0.4.341.json').write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n')
# Preserve established native gates; only supply recorded original dice and
# update expectations that changed under approved Size/raw-die semantics.
f=Path('validation/fixture-pairwise-v0.4.340.js')
t=f.read_text()
assert "initiative={rolls:{pc:4,foes:5},pc:4,monster:5}" in t
t=t.replace("initiative={rolls:{pc:4,foes:5},pc:4,monster:5}",
            "initiative={rolls:{pc:4,foes:5},rawRolls:{pc:4,foes:5},pc:4,monster:5}")
f.write_text(t)
f=Path('validation/measure-pairwise-live-v0.4.340.mjs')
t=f.read_text().replace("const APP_VERSION='0.4.340';","const APP_VERSION='0.341';") if False else f.read_text()
assert t.count("const APP_VERSION='0.4.340';")==1
f.write_text(t.replace("const APP_VERSION='0.4.340';","const APP_VERSION='0.4.341';"))
f=Path('validation/measure-control-live-v0.4.339.mjs')
t=f.read_text()
assert "const APP_VERSION='0.4.340';" in t
t=t.replace("const APP_VERSION='0.4.340';","const APP_VERSION='0.4.341';")
t=t.replace("state.combat.initiative={rolls:{pc:t.pi,foes:t.mi},pc:t.pi,monster:t.mi};",
"""state.combat.initiative={rolls:{pc:t.pi,foes:t.mi},
  rawRolls:{pc:t.rawPi??t.pi,foes:t.rawMi??t.mi},pc:t.pi,monster:t.mi};""")
t=t.replace("far_spear_overcome:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:6,pa:'hold',ma:'press',expected:'normal'}",
            "far_spear_overcome:{weapon:'spear',type:'black_bear',range:'far',pi:4,mi:6,pa:'hold',ma:'press',expected:'far'}")
t=t.replace("close_spear_escape:{weapon:'spear',type:'black_bear',range:'close',pi:6,mi:4,pa:'open',ma:'press',expected:'normal'}",
            "close_spear_escape:{weapon:'spear',type:'black_bear',range:'close',pi:6,mi:4,pa:'open',ma:'press',expected:'close'}")
t=t.replace("pi:7,mi:0,pa:'hold',ma:'press',expected:'far'",
            "pi:7,mi:0,rawPi:1,rawMi:6,pa:'hold',ma:'press',expected:'normal'")
t=t.replace("pi:0,mi:7,pa:'hold',ma:'press',expected:'close'",
            "pi:0,mi:7,rawPi:6,rawMi:1,pa:'hold',ma:'press',expected:'normal'")
assert "rawPi:1,rawMi:6" in t
f.write_text(t)
f=Path('validation/context-matrix-live.mjs')
t=f.read_text()
assert "(?:338|339|340)" in t
t=t.replace("(?:338|339|340)","(?:338|339|340|341)")
t=t.replace("'0.4.338','0.4.339','0.4.340'","'0.4.338','0.4.339','0.4.340','0.4.341'")
f.write_text(t)
f=Path('validation/context-matrix-mode.mjs')
t=f.read_text()
needle='html.includes("const APP_VERSION=\'0.4.340\';")'
assert needle in t
t=t.replace(needle,needle+' || html.includes("const APP_VERSION=\'0.4.341\';")')
f.write_text(t)
print('v0.4.341 candidate only',sha)
