// Temporary injected native-browser scenario adapter; never shipped in index.html.
window.__kwPairwise340 = function(mode) {
  installHarnessFixture({distance:0,type:'goblin',count:6});
  state.party=state.party.slice(0,1);
  const pc=state.party[0], foes=state.combat.monsters.slice(0,6);
  setCombatPcVector(pc,{x:0,y:0,z:0});
  pc.equippedWeapon={itemId:'spear',name:SHOP_ITEMS.spear.name,matrixId:SHOP_ITEMS.spear.matrixId};
  for(let i=0;i<foes.length;i++){
    const angle=2*Math.PI*i/6;
    foes[i].influenceRadiusFt=2.5;
    setCombatMonsterVector(foes[i],{x:5*Math.cos(angle),y:5*Math.sin(angle),z:0});
    foes[i].noWeapons=false;foes[i].weaponId='dagger';foes[i].attacks=null;
  }
  refreshSpatialEngagements();
  const bands=mode==='mixed'||mode==='save'||mode==='contest'
    ?['far','normal','close','far','normal','close']
    :['close','close','close','close','close','close'];
  for(let i=0;i<6;i++)setEngagement(pc,foes[i],bands[i]);
  state.combat.round=2;state.combat.meleeDistanceResolvedRound=0;
  state.combat.initiative={rolls:{pc:4,foes:5},pc:4,monster:5};
  state.combat.pcOrders={[pc.name.toLowerCase()]:{rangeIntent:'hold',movement:'hold',action:'hold'}};
  state.combat.monsterOrders={};
  for(let i=0;i<6;i++)state.combat.monsterOrders[foes[i].id]={
    rangeIntent:(i===3?'hold':i===4?'open':'press'),action:'melee',movement:'hold',targetName:pc.name};
  const states=()=>foes.map(m=>getEngagement(pc,m)?.range||null);
  const eligible=()=>foes.map(m=>Boolean(atMeleeContact(pc,m)&&monsterCanFight(m)&&
    monsterWeaponItem(m)&&getEngagement(pc,m)&&state.combat.monsterOrders[m.id]?.action==='melee'));
  const initial=states(),legal=eligible(),beforeSeed=state.seed,beforeRound=state.combat.round;
  if(mode==='surround')return {initial,legal,contacts:Object.keys(state.combat.engagements).length,
    group:meleeGroups()[0]?.range,cap:state.combat.engagementCapacity??null,
    seed:beforeSeed,round:beforeRound};
  if(mode==='mixed')return {initial,group:meleeGroups()[0]?.range,
    pairLookup:foes.map(m=>meleeGroupFor(pc,m)?.range||null),legal};
  if(mode==='contest'){
    resolveMeleeDistanceContests();const resolved=states(),afterSeed=state.seed;
    resolveMeleeDistanceContests();
    return {initial,resolved,repeat:states(),afterSeed,beforeSeed,
      rounds:[beforeRound,state.combat.round],group:meleeGroups()[0]?.range,rolls:state.combat.initiative.rolls};
  }
  if(mode==='barrier'){
    const t=foes[0];const center=combatMonsterVector(t);
    state.combat.spatialBarriers=[{active:true,minX:2,maxX:3,minY:-0.4,maxY:0.4,minZ:-1,maxZ:1}];
    refreshSpatialEngagements();
    return {blocked:!atMeleeContact(pc,t),removed:getEngagement(pc,t)===null,
      remaining:foes.slice(1).filter(m=>getEngagement(pc,m)).length,center};
  }
  if(mode==='save'){
    const coords=foes.map(m=>({id:m.id,...combatMonsterVector(m)}));
    const before={bands:states(),coords,pc:combatPcVector(pc),seed:state.seed,
      round:state.combat.round,version:state.combat.pairwiseMeasureVersion};
    persistStateSilently();
    const savedSeed=JSON.parse(localStorage.getItem(STORAGE.save)).seed;
    load();
    const restoredPc=state.party.find(p=>p.name===pc.name);
    const after={bands:foes.map(m=>state.combat.engagements?.[engagementKey(pc.name,m.id)]?.range??null),
      coords:foes.map(m=>({id:m.id,...combatMonsterVector(state.combat.monsters.find(x=>x.id===m.id))})),
      pc:combatPcVector(restoredPc),seed:state.seed,round:state.combat.round,
      version:state.combat.pairwiseMeasureVersion};
    return {before,after,savedSeed};
  }
  throw Error('Unknown pairwise mode '+mode);
};