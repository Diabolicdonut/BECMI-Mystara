from pathlib import Path
import hashlib
p=Path('index.html')
s=p.read_text()
oldhash=hashlib.sha256(s.encode()).hexdigest()
assert oldhash=='d4bc231245961cc2803326bf4572dbbd71acc115b7676282d555ea1e537e9487',oldhash
def edit(before,after,title):
    global s
    n=s.count(before)
    assert n==1,(title,n)
    s=s.replace(before,after,1)
edit("const APP_VERSION='0.4.339';","const APP_VERSION='0.4.340';",'version')
edit("""    // Legacy engaged pairs were collapsed to one encounter coordinate. Preserve
    // that location during migration; the new influence-sphere graph will then
    // rebuild authoritative melee membership without discarding exact x/y/z.
    for(const e of Object.values(c.engagements)){""",
"""    // Legacy shared-Measure saves retain migration; new pairwise state keeps
    // independently authoritative x/y/z coordinates through reload.
    if(c.pairwiseMeasureVersion!==1) for(const e of Object.values(c.engagements)){""",'migration')
i=s.index('    if(c.pairwiseMeasureVersion!==1) for(const e of Object.values(c.engagements)){')
j=s.index('\n    }',i)+6
assert 100<j-i<1600
s=s[:j]+'\n    c.pairwiseMeasureVersion=1;'+s[j:]
edit('      if(record){e.meleeId=record.id;e.range=record.range;e.siteKey=record.id;}',
'      if(record){e.meleeId=record.id;e.siteKey=record.id;} // pair range is authoritative','graph')
edit('      return {entries,pcNames:record.pcNames.slice(),monsterIds:record.monsterIds.slice(),range:record.range,position:feetToCombatUnits(anchor.x),anchor3d:{...anchor},siteKey:record.id,meleeId:record.id,formedRound:record.formedRound};',
"""      const bands=[...new Set(entries.map(e=>e.range).filter(x=>RANGE_ORDER.includes(x)))];
      const summary=bands.length===1?bands[0]:bands.length?'mixed':'far';
      return {entries,pcNames:record.pcNames.slice(),monsterIds:record.monsterIds.slice(),range:summary,position:feetToCombatUnits(anchor.x),anchor3d:{...anchor},siteKey:record.id,meleeId:record.id,formedRound:record.formedRound};""",'summary')
edit('    return meleeGroups().find(g=>(!pcName||g.pcNames.includes(pcName))&&(!monsterId||g.monsterIds.includes(monsterId)))||null;',
"""    const group=meleeGroups().find(g=>(!pcName||g.pcNames.includes(pcName))&&(!monsterId||g.monsterIds.includes(monsterId)))||null;
    if(!group||!pcName||!monsterId)return group;
    const pair=group.entries.find(e=>String(e.pcName).toLowerCase()===pcName&&e.monsterId===monsterId);
    return pair?{...group,range:pair.range}:null;""",'group specific lookup')
edit("""    // v0.3.88 deliberately does NOT collapse melee participants onto one point.
    // Exact x/y/z positions remain authoritative for blocking, LOS, elevation,
    // ranged distance, and subsequent graph membership. Only the abstract melee
    // measure is shared.""",
"""    // 3D geometry determines graph membership. A display anchor never
    // merges opposing pairs' independent Measure bands.""",'anchor')
edit("""    const group=meleeGroupFor(pc,monster);
    if(group&&RANGE_ORDER.includes(range))setMeleeGroupRange(group,range);
    return Boolean(group);""",
"""    const pair=state.combat.engagements?.[engagementKey(pc.name,monster.id)];
    if(!pair)return false;
    if(RANGE_ORDER.includes(range))pair.range=range;
    refreshMeleeRecords();
    return true;""",'set engagement')
edit("""    // A connected melee shares one measure. A single actor's weapon reach
    // must not propagate to a formation, surround, or multi-side encounter.
    if(group.pcNames.length!==1||group.monsterIds.length!==1)
      return neutral('multi-combatant reach unresolved');""",
"""    // One verified opposing pair, never connected-component reach propagation.
    if(group.pcNames.length!==1||group.monsterIds.length!==1)
      return neutral('invalid pair relationship');""",'size controller')
start=s.index('  function resolveMeleeDistanceContests(){')
stop=s.index('\n  function freeAttackAgainstFollower(',start)
assert 1000<stop-start<10000
functions="""  // v0.4.340: opponent relationships, not attacker slots or capacity.
  function resolveMeleeDistanceContests(){
    if(!combatActive())return;
    const c=state.combat;
    if(c.meleeDistanceResolvedRound===c.round)return;
    refreshMeleeRecords();
    const pairs=Object.values(c.engagements||{}).slice().sort((a,b)=>
      engagementKey(a.pcName,a.monsterId).localeCompare(engagementKey(b.pcName,b.monsterId)));
    for(const pair of pairs){
      const pc=state.party.find(p=>p.name.toLowerCase()===String(pair.pcName).toLowerCase());
      const mon=c.monsters.find(m=>m.id===pair.monsterId);
      if(!pc||!mon||!atMeleeContact(pc,mon)||!RANGE_ORDER.includes(pair.range))continue;
      const before=pair.range,ps=pcInitiativeSideId(pc),ms=monsterInitiativeSideId(mon);
      if(ps===ms)continue;
      const sideIds=[ps,ms],pcIntent=c.pcOrders[pc.name.toLowerCase()]?.rangeIntent,
        monIntent=c.monsterOrders[mon.id]?.rangeIntent;
      const intents={
        [ps]:['press','hold','open'].includes(pcIntent)?pcIntent:'hold',
        [ms]:['press','hold','open'].includes(monIntent)?monIntent:'hold'
      };
      const rolls=Object.fromEntries(sideIds.map(id=>[id,initiativeRollForSide(id)]));
      if(Number(pair.formedRound)===Number(c.round)){
        void refereeLog('MELEE DISTANCE — new contact '+pc.name+' vs '+mon.name,
          {type:'melee_distance',round:c.round,pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id],before,after:before,newMelee:true});
        continue;
      }
      const uniqueIntents=[...new Set(Object.values(intents))];
      let applied='hold',reason='all sides hold',measureBonuses={};
      if(uniqueIntents.length===1){
        applied=uniqueIntents[0];
        reason=applied==='hold'?'all sides hold':'all sides '+applied;
      }else{
        const context=meleeControlSizeContext({pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id]},before,intents);
        measureBonuses=context.bonus;
        const score=id=>rolls[id]+(measureBonuses[id]||0),high=Math.max(...sideIds.map(score));
        const leaders=sideIds.filter(id=>score(id)===high);
        const leaderIntents=[...new Set(leaders.map(id=>intents[id]))];
        if(leaderIntents.length===1){
          applied=leaderIntents[0];
          reason='pair control: '+leaders.map(sideLabel).join(' + ')+'; '+context.why;
        }else reason='tied pair control; '+context.why;
      }
      const idx=RANGE_ORDER.indexOf(before);
      const next=applied==='press'?Math.max(0,idx-1):applied==='open'?Math.min(RANGE_ORDER.length-1,idx+1):idx;
      const after=RANGE_ORDER[next];
      pair.range=after;
      const intentText=sideIds.map(id=>sideLabel(id)+' '+intents[id].toUpperCase()+
        ' (init '+rolls[id]+(measureBonuses[id]?' + Size '+measureBonuses[id]:'')+')').join('; ');
      write('MELEE DISTANCE — '+pc.name+' vs '+mon.name+': '+intentText+'. '+reason+'; '+
        before.toUpperCase()+(after!==before?' → '+after.toUpperCase():' holds')+'.','system');
      void refereeLog('MELEE DISTANCE — pair '+pc.name+' vs '+mon.name+'; '+before+' → '+after,
        {type:'melee_distance',round:c.round,pcNames:[pc.name.toLowerCase()],monsterIds:[mon.id],before,intents,rolls,measureBonuses,applied,reason,after});
    }
    refreshMeleeRecords();
    c.meleeDistanceResolvedRound=c.round;
  }

  function shiftEngagement(pc,monster,intent){
    // No pair transition can occupy a slot or move an unrelated opponent.
    const pair=getEngagement(pc,monster);
    if(!pair){
      if(combatSeparation(pc,monster)>0){write(pc.name+' is not in melee with '+monster.name,'warning');return;}
      setEngagement(pc,monster,'far');
      return;
    }
    const idx=RANGE_ORDER.indexOf(pair.range);
    let next=idx;
    if(intent==='press')next=Math.max(0,idx-1);
    else if(intent==='open')next=Math.min(RANGE_ORDER.length-1,idx+1);
    else return;
    if(next!==idx){pair.range=RANGE_ORDER[next];write(pc.name+' vs '+monster.name+' shifts to '+pair.range.toUpperCase()+' melee distance.');}
  }
"""
s=s[:start]+functions+s[stop:]
edit("""      const group=meleeGroups().find(g=>g.pcNames.includes(pc.name.toLowerCase()));
      if(group?.range && !ranges.includes(group.range)) ranges.push(group.range);""",
"""      for(const {entry} of engagementsForPc(pc))
        if(RANGE_ORDER.includes(entry.range)&&!ranges.includes(entry.range))ranges.push(entry.range);""",'actor measure')
edit("        harnessAssert(new Set(groups[0].entries.map(e=>e.range)).size===1,'One physical melee retained contradictory pair ranges');",
"        harnessAssert(new Set(groups[0].entries.map(e=>e.range)).size===2,'Independent pairs were incorrectly forced to one Measure');",'topology regression')
edit("        harnessAssert(after.range==='close','Highest-initiative Skeleton side did not PRESS the one shared NORMAL melee to CLOSE');",
"""        harnessAssert(getEngagement(state.party[0],state.combat.monsters[0]).range==='close','Skeleton PRESS did not win its paired contest');
        harnessAssert(getEngagement(state.party[0],state.combat.monsters[2]).range==='far','Independent Hold opponent did not lose to OPEN');
        harnessAssert(after.range==='mixed','Different paired Measures were lost in a connected melee');""",'multi-side regression')
p.write_text(s)
pipeline=Path('pipeline-state.md')
ps=pipeline.read_text()
assert 'Current accepted build: **v0.4.339**' in ps
ps=ps.replace('# Known World / BECMI Text RPG — Pipeline State\n',
  '# Known World / BECMI Text RPG — Pipeline State\n\n**v0.4.340 CANDIDATE — NOT ACCEPTED:** pairwise Measure and explicit no engagement capacity. Existing main v0.4.339 remains authoritative until full exact-SHA promotion. Next after acceptance: persistent local-scene coordinates.\n',1)
pipeline.write_text(ps)
live=Path('validation/measure-control-live-v0.4.339.mjs')
t=live.read_text()
assert "const APP_VERSION='0.4.339';" in t
assert "multi:true,expected:'normal'" in t
assert "after={range:meleeGroups()[0]?.range" in t
t=t.replace("const APP_VERSION='0.4.339';","const APP_VERSION='0.4.340';")
t=t.replace("multi:true,expected:'normal'","multi:true,expected:'far'")
t=t.replace("after={range:meleeGroups()[0]?.range","after={range:getEngagement(pc,foe)?.range")
t=t.replace("afterRepeat:meleeGroups()[0]?.range","afterRepeat:getEngagement(pc,foe)?.range")
live.write_text(t)
print('pairwise patch',len(s),hashlib.sha256(s.encode()).hexdigest())
