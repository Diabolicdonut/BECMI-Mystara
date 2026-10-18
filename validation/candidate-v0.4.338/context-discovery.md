# Context state discovery

14886:     man_pirate:[['sword_short','soldier'],['dagger','skirmisher'],['axe_hand','brute'],['spear','soldier'],['bow_short','artillery']],
14887:     goblin:[['sword_short','soldier'],['spear','soldier'],['axe_hand','brute'],['sling','skirmisher']],
14888:     kobold:[['spear','soldier'],['dagger','skirmisher'],['sling','artillery']],
14889:     orc:[['sword_normal','soldier'],['spear','soldier'],['axe_hand','brute'],['bow_short','artillery']],
14890:     lizard_man:[['spear','soldier',1],['trident','soldier',1],['club','brute',1]],
14891:     skeleton:[['sword_normal','soldier'],['spear','soldier'],['axe_hand','brute'],['club','brute']]
14892:   };
14893:
14894:   function inferredMonsterLoadout(profile){
14895:     if(!profile?.variableWeapon)return null;
14896:     const text=String(profile.equipmentGuidance||'').toLowerCase(),out=[];
14897:     const add=(id,role='soldier')=>{if(SHOP_ITEMS[id]&&!out.some(row=>row[0]===id))out.push([id,role]);};
14898:     if(/longbow|long bow/.test(text))add('bow_long','artillery');
14899:     if(/shortbow|short bow|\bbow\b/.test(text))add('bow_short','artillery');
14900:     if(/crossbow/.test(text))add('crossbow_light','artillery');
14901:     if(/sling/.test(text))add('sling','skirmisher');
14902:     if(/spear/.test(text))add('spear','soldier');
14903:     if(/javelin/.test(text))add('javelin','skirmisher');
14904:     if(/trident/.test(text))add('trident','soldier');
14905:     if(/battle.?axe/.test(text))add('axe_battle','brute');
14906:     if(/hand.?axe|\baxe\b/.test(text))add('axe_hand','brute');
14907:     if(/two.?handed sword/.test(text))add('sword_two_handed','brute');
14908:     if(/short sword/.test(text))add('sword_short','soldier');
14909:     if(/sword/.test(text))add('sword_normal','soldier');
14910:     if(/dagger/.test(text))add('dagger','skirmisher');
14911:     if(/club|mace/.test(text))add('club','brute');
14912:     return out.length?out:[['sword_normal','soldier'],['spear','soldier'],['axe_hand','brute'],['bow_short','artillery'],['sling','skirmisher']];
14913:   }
14914:   function applyMonsterInstanceLoadout(monster,profile){
14915:     const choices=MONSTER_LOADOUT_POLICIES[monster.type]||inferredMonsterLoadout(profile);
14916:     if(!choices?.length)return monster;
14917:     const [weaponId,effectiveRole,damageMod=0]=choices[rng(choices.length)-1],weapon=SHOP_ITEMS[weaponId];
14918:     if(!weapon)return monster;
14919:     monster.weaponId=weaponId;
14920:     monster.loadout={weaponId,weaponName:weapon.name,sourcePolicy:'BECMI-compatible encounter-instance variation'};
14921:     monster.baseTacticalRole=profile.tacticalRole||monster.tacticalRole||'soldier';
14922:     monster.tacticalRole=effectiveRole||monster.baseTacticalRole;
14923:     monster.damageMod=Number(damageMod)||0;
14924:     if(Array.isArray(monster.attacks)&&monster.attacks.length===1&&/weapon/i.test(String(monster.attacks[0]?.name||'')))monster.attacks=null;
14925:     monster.armorDesc=`${String(monster.armorDesc||'visible equipment').replace(/[.;]+$/,'')}; armed with ${weapon.name.toLowerCase()}`;
14926:     return monster;
14927:   }
14928:
14929:   function normalizedTargetSizeProfile(subject){
14930:     const profile=subject?.sizeProfile||COMBAT_MONSTERS[subject?.type]?.sizeProfile||null;
14931:     const legacy=String(subject?.size||COMBAT_MONSTERS[subject?.type]?.size||'medium').toLowerCase();
14932:     const valid=value=>['small','medium','large'].includes(String(value||'').toLowerCase())?String(value).toLowerCase():legacy;
14933:     return {monster:valid(profile?.monster),vessel:valid(profile?.vessel||'small'),structure:valid(profile?.structure||'small')};
14934:   }
14935:
14936:   function targetClassificationText(subject){
14937:     const sizes=normalizedTargetSizeProfile(subject),protection=String(subject?.protection||COMBAT_MONSTERS[subject?.type]?.protection||'soft').toUpperCase();
14938:     return `Size M/V/S ${sizes.monster.toUpperCase()}/${sizes.vessel.toUpperCase()}/${sizes.structure.toUpperCase()} · Protection ${protection}`;
14939:   }
14940:
14941:   const AMMO_RULES = {
14942:     bow_short:{ammoId:'arrows20',perPack:20,label:'arrow'},

14901:     if(/sling/.test(text))add('sling','skirmisher');
14902:     if(/spear/.test(text))add('spear','soldier');
14903:     if(/javelin/.test(text))add('javelin','skirmisher');
14904:     if(/trident/.test(text))add('trident','soldier');
14905:     if(/battle.?axe/.test(text))add('axe_battle','brute');
14906:     if(/hand.?axe|\baxe\b/.test(text))add('axe_hand','brute');
14907:     if(/two.?handed sword/.test(text))add('sword_two_handed','brute');
14908:     if(/short sword/.test(text))add('sword_short','soldier');
14909:     if(/sword/.test(text))add('sword_normal','soldier');
14910:     if(/dagger/.test(text))add('dagger','skirmisher');
14911:     if(/club|mace/.test(text))add('club','brute');
14912:     return out.length?out:[['sword_normal','soldier'],['spear','soldier'],['axe_hand','brute'],['bow_short','artillery'],['sling','skirmisher']];
14913:   }
14914:   function applyMonsterInstanceLoadout(monster,profile){
14915:     const choices=MONSTER_LOADOUT_POLICIES[monster.type]||inferredMonsterLoadout(profile);
14916:     if(!choices?.length)return monster;
14917:     const [weaponId,effectiveRole,damageMod=0]=choices[rng(choices.length)-1],weapon=SHOP_ITEMS[weaponId];
14918:     if(!weapon)return monster;
14919:     monster.weaponId=weaponId;
14920:     monster.loadout={weaponId,weaponName:weapon.name,sourcePolicy:'BECMI-compatible encounter-instance variation'};
14921:     monster.baseTacticalRole=profile.tacticalRole||monster.tacticalRole||'soldier';
14922:     monster.tacticalRole=effectiveRole||monster.baseTacticalRole;
14923:     monster.damageMod=Number(damageMod)||0;
14924:     if(Array.isArray(monster.attacks)&&monster.attacks.length===1&&/weapon/i.test(String(monster.attacks[0]?.name||'')))monster.attacks=null;
14925:     monster.armorDesc=`${String(monster.armorDesc||'visible equipment').replace(/[.;]+$/,'')}; armed with ${weapon.name.toLowerCase()}`;
14926:     return monster;
14927:   }
14928:
14929:   function normalizedTargetSizeProfile(subject){
14930:     const profile=subject?.sizeProfile||COMBAT_MONSTERS[subject?.type]?.sizeProfile||null;
14931:     const legacy=String(subject?.size||COMBAT_MONSTERS[subject?.type]?.size||'medium').toLowerCase();
14932:     const valid=value=>['small','medium','large'].includes(String(value||'').toLowerCase())?String(value).toLowerCase():legacy;
14933:     return {monster:valid(profile?.monster),vessel:valid(profile?.vessel||'small'),structure:valid(profile?.structure||'small')};
14934:   }
14935:
14936:   function targetClassificationText(subject){
14937:     const sizes=normalizedTargetSizeProfile(subject),protection=String(subject?.protection||COMBAT_MONSTERS[subject?.type]?.protection||'soft').toUpperCase();
14938:     return `Size M/V/S ${sizes.monster.toUpperCase()}/${sizes.vessel.toUpperCase()}/${sizes.structure.toUpperCase()} · Protection ${protection}`;
14939:   }
14940:
14941:   const AMMO_RULES = {
14942:     bow_short:{ammoId:'arrows20',perPack:20,label:'arrow'},
14943:     bow_long:{ammoId:'arrows20',perPack:20,label:'arrow'},
14944:     crossbow_light:{ammoId:'quarrels30',perPack:30,label:'quarrel'},
14945:     crossbow_heavy:{ammoId:'quarrels30',perPack:30,label:'quarrel'},
14946:     sling:{ammoId:'sling_stones30',perPack:30,label:'sling stone'},
14947:     blowgun_short:{ammoId:'darts5',perPack:5,label:'blowgun dart'},
14948:     blowgun_long:{ammoId:'darts5',perPack:5,label:'blowgun dart'}
14949:   };
14950:
14951:   const MISSILE_RANGES = {
14952:     bow_short:[50,100,150],
14953:     bow_long:[70,140,210],
14954:     crossbow_light:[60,120,180],
14955:     crossbow_heavy:[80,160,240],
14956:     sling:[40,80,160],
14957:     axe_hand:[10,20,30],

16039:   function underwaterMissileAllowed(pc,item){return !combatIsUnderwater()||Boolean(item&&['crossbow_light','crossbow_heavy'].includes(item.itemId)&&ensureAquaticRecord(pc).underseaCrossbow);}
16040:   function underwaterSpellAllowed(pc,spell){
16041:     if(!combatIsUnderwater())return {ok:true};
16042:     if(!pcCanBreatheUnderwater(pc))return {ok:false,reason:'cannot speak the spell without water breathing or create air'};
16043:     if(/\b(?:fire|flame|burning|lightning|air|cloudkill|gas)\b/i.test(String(spell||'')))return {ok:false,reason:'the spell is associated with elemental Air or Fire'};
16044:     return {ok:true};
16045:   }
16046:   function beginHoldingBreath(pc,{exerting=false}={}){
16047:     const a=ensureAquaticRecord(pc);a.submerged=true;a.holdingBreath=!pcCanBreatheUnderwater(pc);a.exerting=Boolean(exerting);a.roundsHeld=0;a.drowningChecks=0;a.drowned=false;a.deathRoundsRemaining=0;return a;
16048:   }
16049:   function aquaticBreathCapacity(pc,exerting=ensureAquaticRecord(pc).exerting){const con=Math.max(1,Number(pc?.abilities?.con)||10);return exerting?Math.max(1,Math.floor(con/2)):con;}
16050:   function resolveAquaticRound(pc,{exerting=null}={}){
16051:     if(!pc||pc.dead)return {status:'dead'};const a=ensureAquaticRecord(pc);if(exerting!=null)a.exerting=Boolean(exerting);
16052:     if(!a.submerged||pcCanBreatheUnderwater(pc))return {status:'breathing'};
16053:     if(a.drowned){a.deathRoundsRemaining=Math.max(0,a.deathRoundsRemaining-1);if(a.deathRoundsRemaining<=0){pc.dead=true;pc.hp=0;clearAllPcEngagements(pc);write(`${pc.name} dies from drowning.`,'error');return {status:'dead'};}return {status:'drowned',deathRoundsRemaining:a.deathRoundsRemaining};}
16054:     a.holdingBreath=true;a.roundsHeld++;const capacity=aquaticBreathCapacity(pc);
16055:     if(a.roundsHeld<=capacity)return {status:'holding',roundsHeld:a.roundsHeld,capacity};
16056:     pc.swimmingExhausted=true;const roll=rng(20),penalty=a.drowningChecks,target=Math.max(1,Number(pc.abilities?.con)||10);a.drowningChecks++;const failed=roll+penalty>target;
16057:     if(failed){a.drowned=true;a.holdingBreath=false;a.deathRoundsRemaining=Math.ceil(target/3);write(`${pc.name} fails the drowning check (${roll}${penalty?`+${penalty}`:''} vs Constitution ${target}) and has ${a.deathRoundsRemaining} rounds to be rescued.`,'error');return {status:'drowned',roll,penalty,deathRoundsRemaining:a.deathRoundsRemaining};}
16058:     write(`${pc.name} holds on underwater: drowning check ${roll}${penalty?`+${penalty}`:''} vs Constitution ${target}.`,'system');return {status:'checking',roll,penalty};
16059:   }
16060:   function rescueDrowningPc(pc,{healer=null,magic=false}={}){
16061:     if(!pc){write('Which submerged character is being rescued?','warning');return false;}const a=ensureAquaticRecord(pc);if(!a.drowned){write(`${pc.name} has not drowned.`,'warning');return false;}
16062:     if(!healer&&!magic){write('A drowned character requires healing magic or a rescuer with the Healing skill.','warning');return false;}
16063:     if(healer&&!magic&&!Boolean(healer.skills?.healing||healer.generalSkills?.healing||healer.healingSkill)){write(`${healer.name} does not have the recorded Healing skill.`,'warning');return false;}
16064:     a.drowned=false;a.submerged=false;a.holdingBreath=false;a.deathRoundsRemaining=0;pc.dead=false;if(pc.hp<=0)pc.hp=1;pc.swimmingExhausted=true;write(`${pc.name} is revived before drowning becomes death and remains exhausted.`,'system');return true;
16065:   }
16066:   function advanceAquaticCombatRound(){if(!combatIsUnderwater())return;for(const pc of livingParty()){const order=state.combat?.pcOrders?.[pc.name.toLowerCase()],exerting=!['hold','parry'].includes(order?.action);resolveAquaticRound(pc,{exerting});}}
16067:   function setCombatEnvironment(environment){
16068:     if(!combatActive()){write('Start an encounter before setting its combat environment.','warning');return false;}const value=String(environment||'').toLowerCase();if(!['surface','underwater'].includes(value)){write('Use surface or underwater.','warning');return false;}state.combat.environment=value;state.combat.distanceUnit=value==='underwater'?'ft':state.combat.distanceUnit;
16069:     for(const pc of livingParty()){const a=ensureAquaticRecord(pc);if(value==='underwater')beginHoldingBreath(pc,{exerting:false});else{a.submerged=false;a.holdingBreath=false;a.drowned=false;a.deathRoundsRemaining=0;}}
16070:     write(`Combat environment: ${value.toUpperCase()}${value==='underwater'?'. Surface dwellers take underwater attack penalties; breath is now tracked each round.':''}`,'system');return true;
16071:   }
16072:   function aquaticStatus(){const lines=(state.party||[]).map(pc=>{const a=ensureAquaticRecord(pc),capacity=aquaticBreathCapacity(pc);return `${pc.name}: ${a.native||a.canBreatheWater?'water-breathing':a.drowned?`DROWNED, ${a.deathRoundsRemaining} rescue rounds remain`:a.submerged?`holding ${a.roundsHeld}/${capacity}; checks ${a.drowningChecks}; ${a.exerting?'exerting':'still'}`:'at surface'}; acclimation ${a.acclimation}/4${pc.swimmingExhausted?'; exhausted':''}`;});write(`AQUATIC STATUS\n${lines.join('\n')}`,'system');return lines;}
16073:
16074:   function ensureCombatRuleState(){
16075:     ensureBecmRuleOptions();
16076:     if(!['RAW','PHASED'].includes(state.rules.initiativeMode)) state.rules.initiativeMode='RAW';
16077:   }
16078:
16079:   function setInitiativeMode(mode){
16080:     ensureCombatRuleState();
16081:     const normalized=String(mode||'').toUpperCase();
16082:     const value=(normalized==='PHASE' || normalized==='PHASES' || normalized==='PHASED' || normalized==='PHASE-BASED') ? 'PHASED' : normalized;
16083:     if(!['RAW','PHASED'].includes(value)){ write('Use “initiative mode raw” or “initiative mode phases”.','warning'); return; }
16084:     if(state.combat?.active && state.combat.initiative){ write('Finish the current combat round before changing initiative procedure.','warning'); return; }
16085:     state.rules.initiativeMode=value;
16086:     addEvent(`Initiative procedure changed to ${value}.`);
16087:     write(value==='RAW' ? 'Initiative set to Rules Cyclopedia RAW side-based turns.' : 'Initiative set to phase-based turns. The initiative winner chooses which side moves first; the winner then acts first in missile, magic, and melee phases.','system');
16088:     updatePanels();
16089:   }
16090:
16091:   function combatActive(){ return Boolean(state.combat?.active); }
16092:   function livingParty(){ return state.party.filter(m=>!m.dead && Number(m.hp)>0 && !m.carriedAway && !(combatActive()&&m.phantomFear?.fledCombat)); }
16093:   function livingHostiles(){ return combatActive() ? state.combat.monsters.filter(m=>monsterCanFight(m)) : []; }
16094:   function monsterCanFight(m){ const attackCount=Math.max(1,Array.isArray(m?.attacks)?m.attacks.length:1),pins=Math.max(0,Number(m?.wrestlingPinCount)||0),whipweedFrenzy=Boolean(m?.specialAttack==='whipweed_stalks'&&m?.whipweedFrenzyPending&&activeMonsterAppendages(m).some(p=>p.kind==='stalk'));return m && !m.dead && !m.fled && !m.charmed && !m.sleeping && !m.feebleminded && !m.ceasedHostility && (!m.pinned||attackCount>pins) && Number(m.stunnedRounds||0)<=0 && (Number(m.hp)>0||whipweedFrenzy) && waterWeirdCanAct(m); }
16095:   function monsterStillPresent(m){ return m && !m.dead && !m.fled && Number(m.hp)>0; }

16705:   }
16706:   function meleeGroupFor(pc,monster=null){
16707:     const pcName=pc?pc.name.toLowerCase():null,monsterId=monster?.id||null;
16708:     return meleeGroups().find(g=>(!pcName||g.pcNames.includes(pcName))&&(!monsterId||g.monsterIds.includes(monsterId)))||null;
16709:   }
16710:   function setMeleeGroupRange(group,range){
16711:     if(!group||!RANGE_ORDER.includes(range)||!combatActive())return;
16712:     const c=ensureCombatSpatialState(),id=group.meleeId||group.siteKey;
16713:     if(c.meleeRecords[id])c.meleeRecords[id].range=range;
16714:     group.range=range;
16715:     for(const e of group.entries||[]){e.range=range;e.meleeId=id;e.siteKey=id;}
16716:   }
16717:   function syncMeleeGroupPositions(group,anchor=null){
16718:     // v0.3.88 deliberately does NOT collapse melee participants onto one point.
16719:     // Exact x/y/z positions remain authoritative for blocking, LOS, elevation,
16720:     // ranged distance, and subsequent graph membership. Only the abstract melee
16721:     // measure is shared.
16722:     if(!group||!combatActive())return;
16723:     const id=group.meleeId||group.siteKey,record=ensureCombatSpatialState().meleeRecords[id];
16724:     if(record)record.anchor3d=meleeComponentAnchor([...(record.pcNames||[]).map(n=>`pc:${n}`),...(record.monsterIds||[]).map(x=>`m:${x}`)]);
16725:   }
16726:   function setEngagement(pc,monster,range=null){
16727:     if(!combatActive()||!pc||!monster||!atMeleeContact(pc,monster))return false;
16728:     refreshSpatialEngagements();
16729:     const group=meleeGroupFor(pc,monster);
16730:     if(group&&RANGE_ORDER.includes(range))setMeleeGroupRange(group,range);
16731:     return Boolean(group);
16732:   }
16733:   function getEngagement(pc,monster){
16734:     if(!pc||!monster||!combatActive())return null;
16735:     refreshSpatialEngagements();
16736:     return state.combat.engagements?.[engagementKey(pc.name,monster.id)]||null;
16737:   }
16738:   function clearEngagement(pc,monster){ if(combatActive())delete state.combat.engagements[engagementKey(pc.name,monster.id)]; }
16739:   function clearAllPcEngagements(pc){
16740:     if(!combatActive())return;
16741:     for(const key of Object.keys(state.combat.engagements||{}))if(key.startsWith(`${pc.name.toLowerCase()}|`))delete state.combat.engagements[key];
16742:   }
16743:   function pcCarriedEncumbrance(pc){
16744:     let total=0;
16745:     for(const rec of pc?.inventory||[]) total+=(Number(rec.enc)||Number(SHOP_ITEMS[rec.itemId]?.enc)||0)*Math.max(1,Number(rec.qty)||1);
16746:     return total;
16747:   }
16748:   function pcEncounterSpeed(pc){
16749:     const transform=artifactTransformationRow(pc);if(transform){if(transform.effect.formKind==='object')return 0;const profile=artifactTransformationProfile(pc);if(profile&&Number(profile.move)>0){let formMove=Number(profile.move);if(combatActive())formMove=Math.floor(formMove*masteryMoveMultiplier(pc));if(Number(pc?.raiseDeadRecoveryDaysRemaining)>0)formMove=Math.floor(formMove/2);if(woodSpiderSluggishActive(pc))formMove=Math.floor(formMove*0.5);if(wychlampSlowActive(pc))formMove=Math.floor(formMove*0.5);return Math.max(0,formMove);}}
16750:     const enc=pcCarriedEncumbrance(pc);let base=0;
16751:     if(enc<=400) base=40;
16752:     else if(enc<=800) base=30;
16753:     else if(enc<=1200) base=20;
16754:     else if(enc<=1600) base=10;
16755:     else if(enc<=2400) base=5;
16756:     base=Math.max(base,artifactB3CombatSpeed(pc));
16757:     if(combatActive()&&rawFlyEffect(pc))base=Math.max(base,120);const rawTravel=rawTravelSpellEffect(pc);if(combatActive()&&rawTravel)base=Math.max(base,rawTravel.gaseous?240:120);
16758:     if(combatActive())base=Math.floor(base*masteryMoveMultiplier(pc));
16759:     if(Number(pc?.raiseDeadRecoveryDaysRemaining)>0)base=Math.floor(base/2);
16760:     if(woodSpiderSluggishActive(pc))base=Math.floor(base*0.5);
16761:     if(wychlampSlowActive(pc))base=Math.floor(base*0.5);
## Current runtime item matrix mappings

SHOP ITEMS expression starts {
    backpack:{name:'Backpack',priceCp:moneyCp(5),enc:20,kind:'gear',capacityEn:400,aliases:['pack']},
    belt:{name:'Belt',priceCp:moneyCp(0,2),enc:5,kind:'gear',aliases:['belt']},
    boots_plain:{name:'Boots, Plain',priceCp:moneyCp(1),enc:10,kind:'gear',aliases:['plain boots','boots']},
    boots_riding:{name:'Boots, Riding / Swash-Topped',priceCp:moneyCp(5),enc:15,kind:'gear',aliases:['riding boots','swash topped boots','swash-topped boots']},
    cloak_short:{name:'Cloak, Short',priceCp:m
1020:     quarrels30:{name:'Quarrels (30)',priceCp:moneyCp(10),enc:10,kind:'ammo',aliases:['quarrels','bolts','crossbow bolts']},
1021:     sling_stones30:{name:'Sling Stones (30)',priceCp:moneyCp(1),enc:6,kind:'ammo',aliases:['sling stones','stones']},
1022:     darts5:{name:'Blowgun Darts (5)',priceCp:moneyCp(1),enc:1,kind:'ammo',aliases:['blowgun darts','5 blowgun darts','darts']},
1023:
1024:     axe_battle:{name:'Battle Axe',priceCp:moneyCp(7),enc:60,kind:'weapon',matrixId:'Axe, Battle (RC)',size:'large',edged:true,twoHanded:true,aliases:['battle axe']},
1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},

1021:     sling_stones30:{name:'Sling Stones (30)',priceCp:moneyCp(1),enc:6,kind:'ammo',aliases:['sling stones','stones']},
1022:     darts5:{name:'Blowgun Darts (5)',priceCp:moneyCp(1),enc:1,kind:'ammo',aliases:['blowgun darts','5 blowgun darts','darts']},
1023:
1024:     axe_battle:{name:'Battle Axe',priceCp:moneyCp(7),enc:60,kind:'weapon',matrixId:'Axe, Battle (RC)',size:'large',edged:true,twoHanded:true,aliases:['battle axe']},
1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},

1022:     darts5:{name:'Blowgun Darts (5)',priceCp:moneyCp(1),enc:1,kind:'ammo',aliases:['blowgun darts','5 blowgun darts','darts']},
1023:
1024:     axe_battle:{name:'Battle Axe',priceCp:moneyCp(7),enc:60,kind:'weapon',matrixId:'Axe, Battle (RC)',size:'large',edged:true,twoHanded:true,aliases:['battle axe']},
1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},

1023:
1024:     axe_battle:{name:'Battle Axe',priceCp:moneyCp(7),enc:60,kind:'weapon',matrixId:'Axe, Battle (RC)',size:'large',edged:true,twoHanded:true,aliases:['battle axe']},
1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},

1024:     axe_battle:{name:'Battle Axe',priceCp:moneyCp(7),enc:60,kind:'weapon',matrixId:'Axe, Battle (RC)',size:'large',edged:true,twoHanded:true,aliases:['battle axe']},
1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},

1025:     axe_hand:{name:'Hand Axe',priceCp:moneyCp(4),enc:30,kind:'weapon',matrixId:'Axe, Hand (RC)',size:'small',edged:true,oneHanded:true,aliases:['hand axe','axe']},
1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},

1026:     bow_short:{name:'Short Bow',priceCp:moneyCp(25),enc:20,kind:'weapon',matrixId:'Bow, Short (RC)',size:'medium',missile:true,twoHanded:true,aliases:['short bow']},
1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},

1027:     bow_long:{name:'Long Bow',priceCp:moneyCp(40),enc:30,kind:'weapon',matrixId:'Bow, Long (RC)',size:'large',missile:true,twoHanded:true,aliases:['long bow']},
1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},

1028:     crossbow_light:{name:'Light Crossbow',priceCp:moneyCp(30),enc:50,kind:'weapon',matrixId:'Crossbow, Light (RC)',size:'medium',missile:true,twoHanded:true,aliases:['light crossbow']},
1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},

1029:     crossbow_heavy:{name:'Heavy Crossbow',priceCp:moneyCp(50),enc:80,kind:'weapon',matrixId:'Crossbow, Heavy (RC)',size:'large',missile:true,twoHanded:true,aliases:['heavy crossbow']},
1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},

1030:     blackjack:{name:'Blackjack',priceCp:moneyCp(5),enc:5,kind:'weapon',clericAllowed:true,matrixId:'Blackjack (RC)',size:'small',oneHanded:true,aliases:['blackjack']},
1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},

1031:     club:{name:'Club',priceCp:moneyCp(3),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Club (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['club']},
1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},

1032:     hammer_throwing:{name:'Throwing Hammer',priceCp:moneyCp(4),enc:25,kind:'weapon',clericAllowed:true,matrixId:'Hammer, Throwing (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['throwing hammer']},
1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},

1033:     hammer_war:{name:'War Hammer',priceCp:moneyCp(5),enc:50,kind:'weapon',clericAllowed:true,matrixId:'Hammer, War (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['war hammer','warhammer']},
1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},

1034:     mace:{name:'Mace',priceCp:moneyCp(5),enc:30,kind:'weapon',clericAllowed:true,matrixId:'Mace (RC)',size:'medium',oneHanded:true,blunt:true,aliases:['mace']},
1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},

1035:     staff:{name:'Staff',priceCp:moneyCp(5),enc:40,kind:'weapon',clericAllowed:true,matrixId:'Staff (RC)',size:'medium',twoHanded:true,blunt:true,aliases:['staff','quarterstaff']},
1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},

1036:     dagger:{name:'Dagger',priceCp:moneyCp(3),enc:10,kind:'weapon',matrixId:'Dagger (RC)',size:'small',oneHanded:true,edged:true,aliases:['dagger']},
1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},

1037:     dagger_silver:{name:'Silver Dagger',priceCp:moneyCp(30),enc:10,kind:'weapon',matrixId:'Dagger, Silver (RC)',size:'small',oneHanded:true,edged:true,silver:true,aliases:['silver dagger']},
1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},

1038:     halberd:{name:'Halberd',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Halberd (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['halberd']},
1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},

1039:     javelin:{name:'Javelin',priceCp:moneyCp(1),enc:20,kind:'weapon',matrixId:'Javelin (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['javelin']},
1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},

1040:     lance:{name:'Lance',priceCp:moneyCp(10),enc:180,kind:'weapon',matrixId:'Lance (RC)',size:'large',pointed:true,aliases:['lance']},
1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},

1041:     pike:{name:'Pike',priceCp:moneyCp(3),enc:80,kind:'weapon',matrixId:'Pike (RC)',size:'large',twoHanded:true,pointed:true,polearm:true,aliases:['pike']},
1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},

1042:     polearm:{name:'Polearm',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Polearm (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['polearm']},
1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},

1043:     poleaxe:{name:'Poleaxe',priceCp:moneyCp(5),enc:120,kind:'weapon',matrixId:'Poleaxe (RC)',size:'large',twoHanded:true,edged:true,polearm:true,aliases:['poleaxe','pole axe']},
1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:

1044:     spear:{name:'Spear',priceCp:moneyCp(3),enc:30,kind:'weapon',matrixId:'Spear (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['spear']},
1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},

1045:     trident:{name:'Trident',priceCp:moneyCp(5),enc:25,kind:'weapon',matrixId:'Trident (RC)',size:'medium',oneHanded:true,pointed:true,aliases:['trident']},
1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},

1046:     sword_short:{name:'Short Sword',priceCp:moneyCp(7),enc:30,kind:'weapon',matrixId:'Sword, Short (RC)',size:'small',oneHanded:true,edged:true,aliases:['short sword']},
1047:     sword_normal:{name:'Normal Sword',priceCp:moneyCp(10),enc:60,kind:'weapon',matrixId:'Sword, Normal (RC)',size:'medium',oneHanded:true,edged:true,aliases:['normal sword','sword','arming sword']},
1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},

1048:     sword_bastard:{name:'Bastard Sword',priceCp:moneyCp(15),enc:80,kind:'weapon',matrixId:'Sword, Bastard (One-Handed) (RC)',matrixIdTwoHanded:'Sword, Bastard (Two-Handed) (RC)',size:'large',oneHanded:true,edged:true,aliases:['bastard sword']},
1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},

1049:     sword_twohanded:{name:'Two-Handed Sword',priceCp:moneyCp(15),enc:100,kind:'weapon',matrixId:'Sword, Two-Handed (RC)',size:'large',twoHanded:true,edged:true,aliases:['two handed sword','two-handed sword','greatsword','great sword']},
1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},

1050:     sling:{name:'Sling',priceCp:moneyCp(2),enc:20,kind:'weapon',clericAllowed:true,matrixId:'Sling (RC)',size:'small',missile:true,oneHanded:true,aliases:['sling']},
1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},

1051:
1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},

1052:     shield_horned:{name:'Horned Shield',priceCp:moneyCp(15),enc:20,kind:'weapon',matrixId:'Shield, Horned (RC)',size:'small',oneHanded:true,aliases:['horned shield','shield horned']},
1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},

1053:     shield_knife:{name:'Knife Shield',priceCp:moneyCp(65),enc:70,kind:'weapon',matrixId:'Shield, Knife (RC)',size:'small',oneHanded:true,aliases:['knife shield','shield knife']},
1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},

1054:     shield_sword:{name:'Sword Shield',priceCp:moneyCp(200),enc:185,kind:'weapon',matrixId:'Shield, Sword (RC)',size:'medium',oneHanded:true,aliases:['sword shield','shield sword']},
1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},

1055:     shield_tusked:{name:'Tusked Shield',priceCp:moneyCp(200),enc:275,kind:'weapon',matrixId:'Shield, Tusked (RC)',size:'large',twoHanded:true,aliases:['tusked shield','shield tusked']},
1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},

1056:     blowgun_short:{name:"Blowgun, up to 2'",priceCp:moneyCp(3),enc:6,kind:'weapon',matrixId:"Blowgun, up to 2' (RC)",size:'small',missile:true,aliases:['short blowgun','blowgun up to 2 feet','blowgun']},
1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},

1057:     blowgun_long:{name:"Blowgun, 2'+",priceCp:moneyCp(6),enc:15,kind:'weapon',matrixId:"Blowgun, 2'+ (RC)",size:'medium',missile:true,twoHanded:true,aliases:['long blowgun','blowgun over 2 feet']},
1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},

1058:     bola:{name:'Bola',priceCp:moneyCp(5),enc:5,kind:'weapon',matrixId:'Bola (RC)',size:'medium',oneHanded:true,aliases:['bola']},
1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},

1059:     cestus:{name:'Cestus',priceCp:moneyCp(5),enc:10,kind:'weapon',matrixId:'Cestus (RC)',size:'small',oneHanded:true,aliases:['cestus']},
1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},

1060:     holy_water:{name:'Holy Water',priceCp:moneyCp(25),enc:1,kind:'weapon',matrixId:'Holy Water (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['holy water']},
1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},

1061:     net_medium:{name:"Net, Medium (6'×6')",priceCp:moneyCp(3,6),enc:36,kind:'weapon',matrixId:'Net (RC)',size:'medium',oneHanded:true,aliases:['net','medium net']},
1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},

1062:     burning_oil:{name:'Burning Oil Flask',priceCp:moneyCp(2),enc:10,kind:'weapon',matrixId:'Oil, Burning (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['burning oil','oil weapon']},
1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},

1063:     thrown_rock:{name:'Thrown Rock',priceCp:moneyCp(0,0,10),enc:10,kind:'weapon',matrixId:'Rock, Thrown (RC)',size:'small',oneHanded:true,clericAllowed:true,aliases:['thrown rock','rock']},
1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},

1064:     whip:{name:"Whip (10')",priceCp:moneyCp(10),enc:100,kind:'weapon',matrixId:'Whip (RC)',size:'medium',oneHanded:true,aliases:['whip']},
1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},

1065:     bardiche:{name:'Bardiche',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bardiche (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bardiche']},
1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},

1066:     bill:{name:'Bill',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Bill (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['bill']},
1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},
1074:     voulge:{name:'Voulge',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Voulge (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['voulge']},

1067:     gisarme:{name:'Gisarme',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Gisarme (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['gisarme']},
1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},
1074:     voulge:{name:'Voulge',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Voulge (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['voulge']},
1075:

1068:     glaive:{name:'Glaive',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Glaive (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['glaive']},
1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},
1074:     voulge:{name:'Voulge',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Voulge (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['voulge']},
1075:
1076:     shield:{name:'Shield',priceCp:moneyCp(10),enc:100,kind:'shield',aliases:['shield']},

1069:     lochaber_axe:{name:'Lochaber Axe',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Lochaber Axe (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['lochaber axe']},
1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},
1074:     voulge:{name:'Voulge',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Voulge (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['voulge']},
1075:
1076:     shield:{name:'Shield',priceCp:moneyCp(10),enc:100,kind:'shield',aliases:['shield']},
1077:     // v0.4.221 — source-defined Giant Snail shell shield. The source gives the

1070:     partizan:{name:'Partizan',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Partizan (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['partizan','partisan']},
1071:     ranseur:{name:'Ranseur',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Ranseur (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['ranseur']},
1072:     spetum:{name:'Spetum',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spetum (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spetum']},
1073:     spontoon:{name:'Spontoon',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Spontoon (RC)',size:'large',twoHanded:true,polearm:true,pointed:true,aliases:['spontoon']},
1074:     voulge:{name:'Voulge',priceCp:moneyCp(7),enc:150,kind:'weapon',matrixId:'Voulge (RC)',size:'large',twoHanded:true,polearm:true,edged:true,aliases:['voulge']},
1075:
1076:     shield:{name:'Shield',priceCp:moneyCp(10),enc:100,kind:'shield',aliases:['shield']},
1077:     // v0.4.221 — source-defined Giant Snail shell shield. The source gives the
1078:     // +4 acid-save property (including black dragon breath) and the retained

1081:     // It is therefore never normal shop stock; the explicit referee adapter
1082:     // supplies only the otherwise-unrepresented encumbrance of the finished
1083:     // shield and confirms that source-permitted crafting has already occurred.
1084:     giant_snail_shell_shield:{name:'Giant Snail Shell Shield',priceCp:null,enc:null,kind:'shield',shopUnavailable:true,specialSourceItem:true,source:'Mentzer Master D&D / Rules Cyclopedia',sourcePage:'Master DM 38 / Rules Cyclopedia 204',acidSaveBonus:4,includesBlackDragonBreath:true,preventsAcidItemLoss:true,craftProcedureSpecified:false,priceSpecified:false,encumbranceSpecified:false,aliases:['giant snail shell shield','snail shell shield','acid resistant snail shield','acid-resistant snail shield']},
1085:     leather:{name:'Leather Armor',priceCp:moneyCp(20),enc:200,kind:'armor',baseAc:7,matrixProtection:'soft',aliases:['leather','leather armor']},
1086:     scale:{name:'Scale Mail',priceCp:moneyCp(30),enc:300,kind:'armor',baseAc:6,matrixProtection:'hard',aliases:['scale','scale mail']},
1087:     chain:{name:'Chain Mail',priceCp:moneyCp(40),enc:400,kind:'armor',baseAc:5,matrixProtection:'hard',aliases:['chain','chain mail']},
1088:     banded:{name:'Banded Mail',priceCp:moneyCp(50),enc:450,kind:'armor',baseAc:4,matrixProtection:'hard',aliases:['banded','banded mail']},
1089:     plate:{name:'Plate Mail',priceCp:moneyCp(60),enc:500,kind:'armor',baseAc:3,matrixProtection:'hard',aliases:['plate','plate mail']},

1082:     // supplies only the otherwise-unrepresented encumbrance of the finished
1083:     // shield and confirms that source-permitted crafting has already occurred.
1084:     giant_snail_shell_shield:{name:'Giant Snail Shell Shield',priceCp:null,enc:null,kind:'shield',shopUnavailable:true,specialSourceItem:true,source:'Mentzer Master D&D / Rules Cyclopedia',sourcePage:'Master DM 38 / Rules Cyclopedia 204',acidSaveBonus:4,includesBlackDragonBreath:true,preventsAcidItemLoss:true,craftProcedureSpecified:false,priceSpecified:false,encumbranceSpecified:false,aliases:['giant snail shell shield','snail shell shield','acid resistant snail shield','acid-resistant snail shield']},
1085:     leather:{name:'Leather Armor',priceCp:moneyCp(20),enc:200,kind:'armor',baseAc:7,matrixProtection:'soft',aliases:['leather','leather armor']},
1086:     scale:{name:'Scale Mail',priceCp:moneyCp(30),enc:300,kind:'armor',baseAc:6,matrixProtection:'hard',aliases:['scale','scale mail']},
1087:     chain:{name:'Chain Mail',priceCp:moneyCp(40),enc:400,kind:'armor',baseAc:5,matrixProtection:'hard',aliases:['chain','chain mail']},
1088:     banded:{name:'Banded Mail',priceCp:moneyCp(50),enc:450,kind:'armor',baseAc:4,matrixProtection:'hard',aliases:['banded','banded mail']},
1089:     plate:{name:'Plate Mail',priceCp:moneyCp(60),enc:500,kind:'armor',baseAc:3,matrixProtection:'hard',aliases:['plate','plate mail']},
1090:     suit:{name:'Suit Armor',priceCp:moneyCp(250),enc:750,kind:'armor',baseAc:0,matrixProtection:'hard',aliases:['suit armor','full plate']},

1083:     // shield and confirms that source-permitted crafting has already occurred.
1084:     giant_snail_shell_shield:{name:'Giant Snail Shell Shield',priceCp:null,enc:null,kind:'shield',shopUnavailable:true,specialSourceItem:true,source:'Mentzer Master D&D / Rules Cyclopedia',sourcePage:'Master DM 38 / Rules Cyclopedia 204',acidSaveBonus:4,includesBlackDragonBreath:true,preventsAcidItemLoss:true,craftProcedureSpecified:false,priceSpecified:false,encumbranceSpecified:false,aliases:['giant snail shell shield','snail shell shield','acid resistant snail shield','acid-resistant snail shield']},
1085:     leather:{name:'Leather Armor',priceCp:moneyCp(20),enc:200,kind:'armor',baseAc:7,matrixProtection:'soft',aliases:['leather','leather armor']},
1086:     scale:{name:'Scale Mail',priceCp:moneyCp(30),enc:300,kind:'armor',baseAc:6,matrixProtection:'hard',aliases:['scale','scale mail']},
1087:     chain:{name:'Chain Mail',priceCp:moneyCp(40),enc:400,kind:'armor',baseAc:5,matrixProtection:'hard',aliases:['chain','chain mail']},
1088:     banded:{name:'Banded Mail',priceCp:moneyCp(50),enc:450,kind:'armor',baseAc:4,matrixProtection:'hard',aliases:['banded','banded mail']},
1089:     plate:{name:'Plate Mail',priceCp:moneyCp(60),enc:500,kind:'armor',baseAc:3,matrixProtection:'hard',aliases:['plate','plate mail']},
1090:     suit:{name:'Suit Armor',priceCp:moneyCp(250),enc:750,kind:'armor',baseAc:0,matrixProtection:'hard',aliases:['suit armor','full plate']},
1091:

1084:     giant_snail_shell_shield:{name:'Giant Snail Shell Shield',priceCp:null,enc:null,kind:'shield',shopUnavailable:true,specialSourceItem:true,source:'Mentzer Master D&D / Rules Cyclopedia',sourcePage:'Master DM 38 / Rules Cyclopedia 204',acidSaveBonus:4,includesBlackDragonBreath:true,preventsAcidItemLoss:true,craftProcedureSpecified:false,priceSpecified:false,encumbranceSpecified:false,aliases:['giant snail shell shield','snail shell shield','acid resistant snail shield','acid-resistant snail shield']},
1085:     leather:{name:'Leather Armor',priceCp:moneyCp(20),enc:200,kind:'armor',baseAc:7,matrixProtection:'soft',aliases:['leather','leather armor']},
1086:     scale:{name:'Scale Mail',priceCp:moneyCp(30),enc:300,kind:'armor',baseAc:6,matrixProtection:'hard',aliases:['scale','scale mail']},
1087:     chain:{name:'Chain Mail',priceCp:moneyCp(40),enc:400,kind:'armor',baseAc:5,matrixProtection:'hard',aliases:['chain','chain mail']},
1088:     banded:{name:'Banded Mail',priceCp:moneyCp(50),enc:450,kind:'armor',baseAc:4,matrixProtection:'hard',aliases:['banded','banded mail']},
1089:     plate:{name:'Plate Mail',priceCp:moneyCp(60),enc:500,kind:'armor',baseAc:3,matrixProtection:'hard',aliases:['plate','plate mail']},
1090:     suit:{name:'Suit Armor',priceCp:moneyCp(250),enc:750,kind:'armor',baseAc:0,matrixProtection:'hard',aliases:['suit armor','full plate']},
1091:
1092:     mule:{name:'Mule',priceCp:moneyCp(30),enc:0,kind:'mount',movePerTurn:120,normalLoadCn:2000,maxLoadCn:4000,rideable:true,aliases:['mule']},

1085:     leather:{name:'Leather Armor',priceCp:moneyCp(20),enc:200,kind:'armor',baseAc:7,matrixProtection:'soft',aliases:['leather','leather armor']},
1086:     scale:{name:'Scale Mail',priceCp:moneyCp(30),enc:300,kind:'armor',baseAc:6,matrixProtection:'hard',aliases:['scale','scale mail']},
1087:     chain:{name:'Chain Mail',priceCp:moneyCp(40),enc:400,kind:'armor',baseAc:5,matrixProtection:'hard',aliases:['chain','chain mail']},
1088:     banded:{name:'Banded Mail',priceCp:moneyCp(50),enc:450,kind:'armor',baseAc:4,matrixProtection:'hard',aliases:['banded','banded mail']},
1089:     plate:{name:'Plate Mail',priceCp:moneyCp(60),enc:500,kind:'armor',baseAc:3,matrixProtection:'hard',aliases:['plate','plate mail']},
1090:     suit:{name:'Suit Armor',priceCp:moneyCp(250),enc:750,kind:'armor',baseAc:0,matrixProtection:'hard',aliases:['suit armor','full plate']},
1091:
1092:     mule:{name:'Mule',priceCp:moneyCp(30),enc:0,kind:'mount',movePerTurn:120,normalLoadCn:2000,maxLoadCn:4000,rideable:true,aliases:['mule']},
1093:     pony:{name:'Pony',priceCp:moneyCp(35),enc:0,kind:'mount',movePerTurn:210,normalLoadCn:2000,maxLoadCn:4000,rideable:true,aliases:['pony']},
