# Attack-related function declarations

2583:   function isLikelyCombatOrderInput(input){
2605:   function looksLikeCompoundCombatInstruction(input){
5648:   function renderCombatAsciiMap(){
6105:   function returnDeployedItem(dep){
6136:   function rollSimpleDamage(expr){
7748:   function validateDmr2ShipNpcCombat(raw,className,level){
7859:   function setDmr2ShipNpcCombat(contractValue,npcValue,details){
7866:   function developerDmr2ShipNpcCombat(match){const parsed=parseDmr2ShipRosterJson(match?.[3]);if(!parsed.ok){write(parsed.reason,'warning');return parsed;}const out=setDmr2ShipNpcCombat(match?.[1],match?.[2],parsed.config);write(out.ok?dmr2ShipRosterContractSummary(out.contract.plan,out.contract.id):`DMR2 NPC COMBAT DETAILS REFUSED — ${out.reason}`,out.ok?'system':'warning');return out;}
7925:   function validateDmr2ShipTroopWeapons(raw,percentages,allocation,{specified=raw!==undefined}={}){
7967:   function setDmr2ShipTroopWeapons(contractValue,payload){
7975:   function developerDmr2ShipTroopWeapons(match){
7979:   function dmr2ShipTroopWeaponSummary(plan){
9770:   function developerDmr2GrabGrassDamage(match){const square=Number(match?.[1]),damage=Number(match?.[2]),hazardId=String(match?.[3]||'').trim()||null,result=damageDmr2GrabGrassSquare(hazardId||dmr2GrabGrassHazard(),square,damage,{source:'referee-supplied already-adjudicated damage'});if(!result.ok)write(result.reason,'warning');return result;}
9877:   function resolveDmr2GhostlySoldierStrike(pcOrName,{battlefieldId=null,announce=true}={}){
9947:   function developerDmr2GhostlyHordeDamage(match){
11195:   function demihumanAttackRank(member){
11201:   function nextDemihumanAttackRank(member){const rows=DEMIHUMAN_ATTACK_RANK_THRESHOLDS[member?.className]||[],xp=Math.max(0,Number(member?.xp)||0);return rows.find(([,threshold])=>threshold>xp)||null;}
11202:   function demihumanAttackThac0(member){
11206:   function demihumanCombatOptionProfile(member){
11213:   function demihumanDamageAfterResistance(member,rolledDamage,{kind='ordinary',saveSucceeded=false}={}){
11623:   function setWeaponMode(mode) {
11638:   function toggleWeaponAudit() {
11649:   function findMatrixWeapons(query) {
11672:   function matrixWeaponMentions(input) {
11685:   function explainWeaponMatrix(queryOrInput,{natural=false}={}) {
11723:   function matrixDamage(query,size,protection,range,magicBonus=0) {
11895:   function equipWeaponRecord(pc,itemId,{offhand=false}={}){
12466:   function classicDamageExpression(minimum,maximum){
12482:   function safeDamage(value){
12489:   function canonicalAttacks(record){
13148:   function createHuptzeenCombatant(index,config){return createCombatMonster('huptzeen',index,{huptzeen:config||{}});}
13220:   function createOardCombatant(index,config){return createCombatMonster('oard',index,{oard:config||{}});}
13299:   function createPossessionCombatant(index,config){return createCombatMonster('possession',index,{possession:config||{}});}
13425:   function createReflecterCombatant(index,hitDice){return createCombatMonster('reflecter',index,{reflecter:{hitDice}});}
13438:   function createNormalHumanNpcCombatant(index,config){return createCombatMonster('normal_human',index,{normalHuman:config||{}});}
13454:   function createGiantSnailCombatant(index,hitDice=null){return createCombatMonster('snail_giant',index,hitDice==null?{}:{giantSnail:{hitDice}});}
15069:   function masteryWeaponKey(item){
15084:   function isMasteryShieldWeaponId(id){return Boolean(MASTERY_SHIELD_WEAPONS[id]);}
15085:   function ensureShieldWeaponState(pc,itemId){
15094:   function shieldWeaponRecord(pc){
15100:   function equippedShieldWeaponItem(pc){
15105:   function shieldWeaponHasUsableBlade(pc,itemId=null){const item=itemId?{itemId}:equippedShieldWeaponItem(pc);const id=item?.itemId,stateRow=id?ensureShieldWeaponState(pc,id):null;return Boolean(stateRow&&stateRow.usableBlades>0);}
15106:   function configureShieldWeaponBlades(pc,itemId,count,{announce=true}={}){
15129:   function masteryAddFlatDamage(expression,bonus){const n=Number(bonus)||0;return n?`${expression}${n>0?'+':''}${n}`:expression;}
15130:   function masteryDamageExpression(item,target){
15268:   function masteryCannotAttack(actor){ return Boolean(rawDanceEffect(actor)||actor?.rawSymbolInsane||mesmerPatternActionLocked(actor))||masteryHardDisabled(actor)||artifactAnyGaseousFormActive(actor); }
15271:   function masteryAttackCount(actor,count=1){
15326:   function masteryThrownWeaponRecords(){
15330:   function masteryThrownWeaponRecord(id){return id?masteryThrownWeaponRecords().find(row=>row.id===id)||null:null;}
15332:   function masteryDetachThrownWeapon(pc,itemId,target=null){
15353:   function masteryRecoverThrownWeaponsAfterCombat(combat){
15493:   function masteryMaximumDamageExpression(expression){
15499:   function minimumDamageExpression(expression){
15505:   function masteryDespairAttackerKey(attacker){return attacker?.type?`monster:${attacker.id||attacker.name}`:`pc:${String(attacker?.name||'unknown').toLowerCase()}`;}
15572:   function actorHasEdgedWeaponInHand(actor){const id=actor?.type?actor.weaponId:actor?.equippedWeapon?.itemId;return Boolean(id&&SHOP_ITEMS[id]?.edged);}
15580:   function repairDamagedNet(pc,{announce=true}={}){
15627:   function monsterWeaponMasteryRank(monster){
15634:   function monsterWeaponMasteryAttackBonus(monster,target,item=monsterWeaponItem(monster)){
15642:   function shieldWeaponSecondAttackEligible(pc){
15648:   function tuskedShieldExtraAttackEligible(pc){
15651:   function shieldWeaponMaxFoeDamage(attacker,target,spec=null){
15663:   function shieldWeaponBreakCheck(pc,foe,attackResult,{foeIsAttacker=false,attackSpec=null}={}){
15676:   function withTemporaryEquippedWeapon(pc,record,callback){
15679:   function pcShieldWeaponSecondaryAttack(pc,target,rangeBand='normal',phaseEligible=true,simultaneous=false){
15761:   function masteryDoubleDamageTriggered(item,naturalRoll,hit=true){
15767:   function applyMasteryDoubleDamage(damage,item,naturalRoll,modifier=0,hit=true){
15781:   function ensureWeaponMasteryRecord(pc){
15832:   function weaponMasteryAttackBonus(pc,target,item=equippedWeaponItem(pc)){
15843:   function weaponMasteryDamageFactor(pc,item=equippedWeaponItem(pc)){ return state.rules?.weaponMastery&&item&&weaponMasteryRank(pc,item)==='unskilled'?0.5:1; }
15882:   function trainWeaponMastery(pc,weaponId,targetRank,trainerRank,trainerName=''){
15907:   function fighterCombatOptionQualified(pc){
15921:   function fighterMultipleAttackCount(pc,target,kind='melee'){
15953:   function resolveUnarmedStrike(pc,target,{haymaker=false}={}){
16032:   function underwaterWeaponPierces(item){return Boolean(item&&UNDERWATER_PIERCING_WEAPONS.has(item.itemId));}
16033:   function underwaterAttackPenalty(attacker,kind='melee',item=equippedWeaponItem(attacker)){
16066:   function advanceAquaticCombatRound(){if(!combatIsUnderwater())return;for(const pc of livingParty()){const order=state.combat?.pcOrders?.[pc.name.toLowerCase()],exerting=!['hold','parry'].includes(order?.action);resolveAquaticRound(pc,{exerting});}}
16067:   function setCombatEnvironment(environment){
16074:   function ensureCombatRuleState(){
16097:   function normalizeCombatState(){
16265:   function rollDamageExpression(expression, roller=rng){
16308:   function createCombatMonster(type,index,spawnOptions={}){
16391:   function archiveCombatEncounterRoster(combat){
16510:   function feetToCombatUnits(value){ return (Number(value)||0)/combatUnitFeetFactor(); }
16515:   function ensureCombatSpatialState(){
16547:   function setCombatPcVector(pc,value){
16554:   function setCombatMonsterVector(monster,value){
16562:   function setCombatPcPosition(pc,value){
16565:   function setCombatMonsterPosition(monster,value){
16899:   function phantomColdSpellDamageGate(monster,context={},source=''){
16931:   function schedulePhantomVisionTurnReturn(monster,{announce=true}={}){const rule=phantomVisionRule(monster),row=phantomVisionState(monster,{create:true});if(!rule||!row||monster.dead)return null;const hours=Math.max(1,Math.min(6,rollDamageExpression(rule.turnReturnHours||'1d6').total)),now=absoluteCampaignMinute();row.returnPending=true;row.turnedAwayAtAbsoluteMinute=now;row.turnedAwayHours=hours;row.turnedAwayUntilAbsoluteMinute=now+hours*60;row.fixedAreaKey=row.fixedAreaKey||phantomFearAreaKe
16932:   function processPhantomVisionReturnClock(beforeAbsolute,afterAbsolute){const returned=[];const combat=state.combat;if(!combat?.monsters)return returned;for(const monster of combat.monsters){const row=phantomVisionState(monster,{create:false});if(!row?.returnPending||monster.dead)continue;const due=Number(row.turnedAwayUntilAbsoluteMinute);if(!Number.isFinite(due)||due>afterAbsolute)continue;row.returnPending=false;row.returnedAtAbsoluteMinute=due;row.ethereal=true;row.materialized=false;row.op
16988:   function applyExistingPhantomAreaRefusalsToCombat(){
17012:   function clearTransientPhantomFearAfterCombat(pc){
17015:   function resolvePhantomTurningResistance(monster,cleric,table){
17032:   function phantomDamageGate(monster,damageContext={}){
17045:   function resolvePhantomOpeningAttack(monster,primaryPc){
17073:   function moveSpatialCombatant(kind,mover,endVector){
17214:   function meleeCapableWeapon(item){
17219:   function combatWeaponDistanceLines(pc){
17254:   function combatCarriedWeapons(pc){
17313:   function announceCombatReady(){
17378:   function equippedWeaponItem(actor){
17400:   function carriedWeaponRecord(pc,itemId){ return (pc?.inventory||[]).find(r=>r.itemId===itemId&&Number(r.qty)>0)||null; }
17401:   function carriedWeaponCount(pc){ return (pc?.inventory||[]).filter(r=>Number(r.qty)>0&&SHOP_ITEMS[r.itemId]?.kind==='weapon').length; }
17402:   function partyHasWeaponChoices(){ return livingParty().some(pc=>carriedWeaponCount(pc)>1); }
17404:   function switchPcWeaponInCombat(pc,itemId){
17422:   function switchPcShieldWeaponInCombat(pc,itemId){
17431:   function pcAttackIsDeferred(pc){ return Boolean(pc?.attackInitiativeDeferred||masteryDelayedThisRound(pc)||mentzerBastardInitiativeLoss(pc)); }
17444:   function weaponDamageExpressions(item,target,range='normal'){
17454:   function averageDamageExpression(expression){
17500:   function rollComparedWeaponDamage(item,target,range,modifier=0,rollerSubject=null){
17516:   function writeWeaponAudit(attacker,target,result){
17626:   function trollDamageMethod(source='',context={}){
17636:   function recordTrollRegenerationDamage(monster,actualDamage,source,context={}){
17643:   function trollRecoveryKeepsCombatOpen(monster){
17655:   function syncHydraHeadAttacks(monster){
17662:   function regeneratingHydraDamageMethod(source='',context={}){
17665:   function recordRegeneratingHydraDamage(monster,actualDamage,source,context={}){
17698:   function lavaOozeMindAttackSpell(spell){const name=String(spell||'').trim().toLowerCase();return /^(?:charm person|charm monster|mass charm|sleep|esp|feeblemind|confusion|cause fear|fear|hold person|hold monster|quest|geas|phantasmal force|dance)$/.test(name);}
17699:   function lavaOozeIncomingDamageAdjustment(monster,amount,source='',context={}){
17747:   function sporacleDamageSpellNameIsDamaging(spell){const lower=String(spell||'').trim().toLowerCase();if(!lower)return false;if(typeof SPELL_DAMAGE_PROFILES!=='undefined'&&SPELL_DAMAGE_PROFILES?.[lower]&&!SPELL_DAMAGE_PROFILES[lower].death&&!SPELL_DAMAGE_PROFILES[lower].status)return true;return new Set(['magic missile','fire ball','lightning bolt','ice storm','ice storm / wall of ice','wall of fire','cause light wounds','cause serious wounds','delayed blast fire ball','meteor swarm','explosive
17754:   function resolveSporacleIncomingDamage(monster,amount,source='',ctx={}){
17786:   function livingIronWeaponMaterialClass(ctx={}){
17795:   function detachLivingIronWeapon(pc,monster,ctx={}){
17807:   function releaseLivingIronStatueWeapons(monster,{announce=true}={}){
17812:   function resolveLivingIronStatueWeaponHit(monster,damageContext={},source='weapon hit'){
17846:   function oardProtectionBeltDamageAdjustment(monster,amount,context={}){
17862:   function resolveOardDeviceAttack(monster,primaryTarget,{device=null,refereeRangeApproved=false}={}){if(!isOardMonster(monster))return {ok:false,reason:'not an Oard'};const available=[...oardDeviceSet(monster)].filter(key=>['ray_glove','blaster_tube','fireball_gem'].includes(key)&&!(key==='fireball_gem'&&Number(ensureOardState(monster)?.fireballGemsRemaining)<=0)),choice=canonicalOardDeviceKey(device||monster.oardAttackDevice)||(available.length===1?available[0]:null);if(!choice)return {ok:fals
17876:   function phygoraxIncomingDamageGate(monster,amount,source='',ctx={}){
17912:   function possessionIncomingDamageGate(monster,amount,source='',ctx={}){if(!isPossessionMonster(monster))return {handled:false,amount};const row=ensurePossessionState(monster,{create:false});if(row&&row.phase!=='hosted'){write(`${monster.name} is an incorporeal shadow-cloud/dissolved spirit in its current source state and cannot be attacked.`,'system');return {handled:true,amount:0,reason:'outside-host untargetable'};}const kind=String(ctx.kind||'').toLowerCase(),weapon=Boolean(ctx.weapon||kind
17913:   function resolvePossessionHostedAttack(monster,target,{announce=true}={}){const row=ensurePossessionState(monster,{create:false});if(!row||row.phase!=='hosted'||!row.host)return {ok:false,reason:'The Possession is not in a host object and cannot attack.'};const host=row.host;if(host.kind==='weapon'&&host.weaponId){if(combatActive()&&combatSeparation(monster,target)>0)return {ok:false,reason:'The animated weapon host must reach hand-to-hand distance; AC9 supplies no separate flight/attack range
17916:   function applyPossessionTurning(monster,{announce=true}={}){const row=ensurePossessionState(monster);if(!row)return {handled:false};if(row.phase==='hosted'){forcePossessionFromHost(monster,'clerical turning',{announce});return {handled:true,destroyed:false,phase:'cloud'};}if(row.phase==='cloud'){row.phase='destroyed';row.destroyed=true;monster.dead=true;monster.hp=0;monster.ceasedHostility=true;clearMonsterEngagements(monster);if(announce)write(`${monster.name} is turned again while outside an
17940:   function resolveSacrolExtensionAttack(monster,target,{extensionIndex=null,announce=true}={}){
17948:   function resolveSacrolAttackTurn(monster,primaryTarget,{announce=true}={}){
18030:   function reflecterIncomingDamageGate(monster,amount,source='',ctx={}){
18068:   function levellerIncomingDamageGate(monster,amount,source='',ctx={}){
18084:   function vapourGhoulIncomingDamageGate(monster,amount,source='',ctx={}){
18109:   function convertVapourGhoulMindParalysisAtCombatEnd(){
18151:   function resolveGiantGastropodAttack(monster,pc,{announce=true}={}){
18157:   function giantGastropodIncomingDamageGate(monster,amount,source,damageContext={}){
18359:   function weaponDamageContext(pc,item,kind='melee',extra={}){const strengthBonus=(kind==='melee'||(kind==='missile'&&throwableCapable(item)))?Math.max(0,abilityAdjustment(pc?.abilities?.str??10)):0,effectiveBonus=effectiveMagicWeaponBonus(pc,item),intrinsicMagical=Boolean(!item?.magicDestroyed&&(item?.magical===true||Number(item?.magicBonus)>0||Number(pc?.equippedWeapon?.magicBonus)>0));return {kind:'weapon',weapon:true,attackKind:kind,missile:kind==='missile',handHeldWeapon:kind==='melee',hand
18361:   function pcWeaponAttack(pc,monster,kind='melee',rangeBand='normal',phaseEligible=true,simultaneous=false){
18536:   function rawBasiliskGazeAttackModifier(attacker,target,kind='melee'){
18611:   function rawMedusaGazeAttackModifier(attacker,target,kind='melee'){
18754:   function greaterWyrdVisionAttackPenalty(pc){return greaterWyrdVisionSourcesAffecting(pc).length?-3:0;}
18755:   function applyGreaterWyrdVisionDamagePenalty(pc,target,amount){
18760:   function applyGreaterWyrdVisionDamagePacket(pc,target,dmg){
18775:   function monsterWeaponItem(monster){
18920:   function effectivePcCombatSize(pc){
19013:   function convertRoundParalysisAtCombatEnd(){
19046:   function pcOrderAttacksMonster(order,monster){
19049:   function carrionCrawlerBeingAttackedThisRound(monster){
19097:   function paralysisAwareAttackRoll(attacker,target,kind='melee',extra=0,options={}){return attackRoll(attacker,target,kind,extra,options);}
19110:   function resolveScamilleAttack(monster,pc){
19142:   function resolveSporacleAttack(monster,pc){
19148:   function resolveGiantJellyfishAttack(monster,pc){
19154:   function resolveShroudSpiderAttack(monster,pc){
19161:   function monsterContinuousAttackRule(monster){return monster?.continuousAttack||COMBAT_MONSTERS[monster?.type]?.continuousAttack||null;}
19166:   function continuousAttachmentAttackPenalty(pc,target){
19169:   function attachMonsterContinuousDamage(monster,pc,rule,{attackName='attack'}={}){
19238:   function isEdgedWeaponForSwallow(item){
19242:   function insideWeaponPacket(pc,item,monster){
19246:   function resolveSwallowedPcAttack(pc,monster,kind='melee'){
19304:   function krakenInkBlindAttackPenalty(subject){return krakenInkCloudAffects(subject)?-6:0;}
19341:   function resolveMonsterAppendageAttack(attacker,monster,partId,{victim=null}={}){
19361:   function resolveKillerTreeAttack(monster,primaryPc){
19367:   function resolveRoperAttack(monster,primaryPc){
19376:   function resolveKrakenAttack(monster,primaryPc){
19394:   function applyGiantSquidShipAttack(monster,vessel){const rule=giantSquidRule(monster),row=ensureMonsterAppendageState(monster);if(!rule||!row||!vessel?.seaworthy||Number(vessel.hullPoints)<=0)return false;const greaters=row.parts.filter(p=>p.kind==='tentacle'&&p.grade==='greater'&&!p.severed);let tentacleLoss=0;if(greaters.length===2){tentacleLoss=rollDamageExpression(rule.shipTentacleHullDamage||'1d10').total;vessel.hullPoints=Math.max(0,Number(vessel.hullPoints||0)-tentacleLoss);write(`${mon
19396:   function resolveGiantSquidAttack(monster,primaryPc){const rule=giantSquidRule(monster),row=ensureMonsterAppendageState(monster),round=Number(state.combat?.round)||1;if(!rule||!row)return false;if(monster.giantSquidResolvedRound===round)return true;monster.giantSquidResolvedRound=round;const vessel=currentVessel(),mode=giantSquidShipMode(monster,vessel);if(mode==='ship'&&vessel?.seaworthy&&Number(vessel.hullPoints)>0){applyGiantSquidShipAttack(monster,vessel);return true;}processGiantSquidConst
19409:   function resolveWhipweedAttack(monster,primaryPc){const rule=whipweedRule(monster),row=ensureMonsterAppendageState(monster),round=Number(state.combat?.round)||1;if(!rule||!row)return false;if(monster.whipweedFrenzyPending)return resolveWhipweedFrenzy(monster,primaryPc);if(monster.whipweedResolvedRound===round)return true;monster.whipweedResolvedRound=round;if(!monsterCanFight(monster))return true;let targets=monsterAppendageTargets(monster,rule.reachFt||15);if(primaryPc&&targets.includes(prima
19437:   function applyStrangleVineSquareDamage(record,damage,squareHp=8){record.localCurrentSquareDamage=Math.max(0,Number(record.localCurrentSquareDamage)||0)+Math.max(0,Math.floor(Number(damage)||0));let cleared=0;if(record.localCurrentSquareDamage>=squareHp){record.localClearedSquareFeet=Math.max(0,Number(record.localClearedSquareFeet)||0)+1;record.localCurrentSquareDamage=0;cleared=1;}return cleared;}
19438:   function applyStrangleVineLocalCutDamage(monster,victim,damage,{attacker=null}={}){const ent=strangleVineEntanglement(victim);if(!ent||ent.monster.id!==monster.id)return {ok:false,reason:'victim not held by this vine'};const rule=strangleVineRule(monster),record=ent.victim,required=strangleVineRequiredSquareFeet(victim);if(required!=null)record.requiredSquareFeet=required;const cleared=applyStrangleVineSquareDamage(record,damage,Number(rule.squareHp)||8),need=record.requiredSquareFeet;write(`$
19440:   function applyStrangleVineWholeCutDamage(monster,damage,{attacker=null}={}){const rule=strangleVineRule(monster),row=strangleVineState(monster);if(!rule||!row)return {ok:false};row.wholeCurrentSquareDamage+=Math.max(0,Math.floor(Number(damage)||0));let cleared=0;if(row.wholeCurrentSquareDamage>=Number(rule.squareHp||8)){row.wholeClearedSquareFeet++;row.wholeCurrentSquareDamage=0;cleared=1;}write(`${attacker?.name||'The attack'} cuts ${monster.name}: ${damage} damage to the current 1-foot squar
19441:   function resolveStrangleVineWeaponHit(attacker,monster,item,damage,{victim=null}={}){const rule=strangleVineRule(monster);if(!rule)return false;if(!item?.edged&&!isEdgedWeaponForSwallow(item)){write(`${attacker.name}'s ${item?.name||'weapon'} does not use the printed cutting procedure: DMR2 specifies an edged weapon to cut Strangle Vine squares.`,'warning');return true;}const heldVictim=victim||((strangleVineEntanglement(attacker)?.monster.id===monster.id)?attacker:null);if(heldVictim)return a
19485:   function resolveStrangleweedAllyWeaponHit(attacker,monster,damage,damageContext={}){const rule=strangleweedRule(monster);if(!rule)return false;const victims=activeStrangleweedVictims(monster).filter(pc=>pc!==attacker);if(!victims.length){damageMonster(monster,damage,`${attacker.name}'s ${damageContext.weaponName||'weapon'}`,damageContext);return true;}const chance=Math.max(0,Math.min(100,Number(rule.allyVictimHitChance)||25)),roll=rng(100),collateral=roll<=chance;monster.lastStrangleweedCollat
19493:   function resolveGiantPoisonousFrogAttack(monster,pc){
19564:   function resolveLevellerAttack(monster,primaryPc,{mode=null}={}){
19663:   function lesserPhantomIncomingDamageAdjustment(monster,amount,source='',ctx={}){const rule=monsterLesserPhantomTraitRule(monster);if(!rule)return {amount,changed:false};const original=Math.max(0,Math.floor(Number(amount)||0)),kind=String(ctx.kind||'').toLowerCase(),magical=Boolean(ctx.magical===true||ctx.spell===true||ctx.spellLike===true||ctx.magicalDevice===true||ctx.magicItemProduced===true||kind==='spell'||Number(ctx.magicalBonus)>0);if(magical)return {amount:original,changed:false,magical
19753:   function resolveBaldandarIllusoryAttack(monster,target,mode,description,{announce=true}={}){
19867:   function homunculusIncomingDamageGate(monster,amount,source='',ctx={}){
19905:   function setHomunculusNaturalAttackChoice(monster,choice,{announce=true}={}){const rule=monsterHomunculusTraitRule(monster),q=String(choice||'').toLowerCase().trim(),options=rule?.naturalAttackChoices||{};if(homunculusCurrentForm(monster)!=='natural')return {ok:false,reason:`${monster.name} is not in natural form.`};if(!options[q])return {ok:false,reason:`Choose one represented natural attack: ${Object.keys(options).join(' or ')}.`};const row=homunculusIntrinsicState(monster,{create:true});row
19906:   function homunculusEffectiveAttacks(monster,attacks){const rule=monsterHomunculusTraitRule(monster);if(!rule)return attacks;if(homunculusCurrentForm(monster)!=='natural')return Array.isArray(monster.attacks)?monster.attacks:[];const options=rule.naturalAttackChoices;if(!options)return attacks;const choice=homunculusIntrinsicState(monster,{create:true})?.naturalAttackChoice||Object.keys(options)[0],spec=options[choice];return spec?[{name:choice,damage:spec.damage||null}]:attacks;}
19907:   function homunculusAttackBonus(monster,attackName){if(!isHomunculusIntrinsicMonster(monster)||homunculusCurrentForm(monster)!=='natural')return 0;const rule=monsterHomunculusTraitRule(monster),choice=String(attackName||'').toLowerCase();return Number(rule?.naturalAttackChoices?.[choice]?.attackBonus)||0;}
19915:   function resolveHomunculusAttackRider(monster,pc,attackName,{announce=true}={}){const rule=monsterHomunculusTraitRule(monster),name=String(attackName||'').toLowerCase();if(!rule||!pc||pc.dead)return null;if(rule.tailPoison&&/tail/.test(name)&&(!rule.tailPoison.naturalFormOnly||homunculusCurrentForm(monster)==='natural'))return applyHomunculusAbilityDrain(monster,pc,rule.tailPoison,{announce,attackName:'tail'});if(rule.biteAbilityDrain&&/bite/.test(name)&&(rule.biteAbilityDrain.allForms||homunc
20114:   function randaraIncomingDamageGate(monster,amount,source='',context={}){
20174:   function mesmerIncomingDamageGate(monster,amount,source='',ctx={}){const rule=monsterMesmerRule(monster);if(!rule?.magicalWeaponOnly)return {handled:false,amount};const kind=String(ctx.kind||'').toLowerCase(),weapon=Boolean(ctx.weapon||ctx.handHeldWeapon||kind==='weapon'||String(ctx.attackKind||'').includes('weapon')),magical=Boolean(ctx.magical||Number(ctx.magicalBonus)>0);if(weapon&&magical)return {handled:false,amount};write(`${monster.name} can only be harmed by magical weapons; ${source||
20195:   function hephaestonIncomingDamageGate(monster,amount,source='',ctx={}){
20323:   function velyaIncomingDamageGate(monster,amount,source='',ctx={}){
20330:   function recordVelyaRegenerationDamage(monster,actualHpDamage,source='',ctx={}){
20483:   function waterWeirdAttackRangeFt(monster){const rule=waterWeirdRule(monster),steps=waterWeirdScaleSteps(monster);return Math.max(0,Number(rule?.baseRangeFt)||10)+steps*Math.max(0,Number(rule?.larger?.rangeBonusFtPerStep)||5);}
20484:   function waterWeirdDamagePerRound(monster){const rule=waterWeirdRule(monster),steps=waterWeirdScaleSteps(monster);return Math.max(1,Number(rule?.baseDamage)||1)+steps*Math.max(0,Number(rule?.larger?.damageBonusPerStep)||1);}
20486:   function waterWeirdVictimAttackModifier(pc,target){if(!pc?.waterWeirdTrappedBy||!target||pc.waterWeirdTrappedBy.monsterId!==target.id)return 0;const rule=waterWeirdRule(target);return -4+waterWeirdScaleSteps(target)*Number(rule?.larger?.victimAttackPenaltyPerStep??-2);}
20488:   function waterWeirdPendingKeepsCombatOpen(monster){if(!isWaterWeirdMonster(monster)||monster.dead||monster.fled)return false;const row=ensureWaterWeirdState(monster,{create:false});return Boolean(row&&(!row.formed||row.disrupted));}
20489:   function waterWeirdColdAttackAvailable(monster){const row=ensureWaterWeirdState(monster,{create:false});if(!row?.coldSlowed)return true;const round=Math.max(1,Number(state.combat?.round)||1),last=Number(row.lastColdAttackRound);return !Number.isFinite(last)||round-last>=2;}
20494:   function resolveWaterWeirdAttack(monster,pc,{announce=true}={}){
20516:   function waterWeirdIncomingDamageGate(monster,amount,source='',ctx={}){
20560:   function wychglowIncomingDamageGate(monster,amount,source='',ctx={}){
20583:   function wychlampRuntimeDamageMultiplier(){const x=Number(WYCHLAMP_MAGIC_RUNTIME?.damageMultiplier??WYCHLAMP_MAGIC_RUNTIME?.intensityMultiplier??1);return Number.isFinite(x)&&x>=0?x:1;}
20589:   function wychlampReflectDamageAtCaster(monster,caster,amount,source,ctx={}){amount=Math.max(0,Math.floor(Number(amount)||0));if(amount<=0||!caster)return 0;if((state.party||[]).includes(caster))damagePc(caster,amount,`${monster.name} reflection of ${source}`,{...ctx,magical:true,_wychlampReflected:true});else damageMonster(caster,amount,`${monster.name} reflection of ${source}`,{...ctx,magical:true,_wychlampReflected:true});return amount;}
20613:   function wychlampIncomingDamageGate(monster,amount,source,ctx={}){
20626:   function wyrdIncomingDamageGate(monster,amount,source='',ctx={}){
20652:   function resolveXytarCombat(monster,target,{announce=true,choiceRoll=null}={}){
20681:   function yowlerIncomingDamageGate(monster,amount,source='',ctx={}){
20709:   function huptzeenIncomingDamageGate(monster,amount,source='',ctx={}){
20726:   function agaratIncomingDamageGate(monster,amount,source='',ctx={}){
20806:   function agaratScreamTurnKey(monster){const round=Math.max(1,Number(state.combat?.round)||1);return combatActive()?`combat:${Math.floor((round-1)/60)}`:`clock:${Math.floor(absoluteCampaignMinute()/10)}`;}
20829:   function resolveRockPythonAttack(monster,pc,{announce=true}={}){
20877:   function applyMonsterSourceChargeDamage(monster,damage,{announce=true}={}){
20885:   function monsterAttack(monster,pc,phaseEligible=true,simultaneous=false){
21074:   function rawSpellDamageDiceCount(caster,profile={}){
21311:   function effectiveMagicWeaponBonus(owner,item=null,explicitBonus=null){
21800:   function rawDispelMirrorImagesOnAreaDamage(subject,context={}){const effect=rawMirrorImageEffect(subject);if(!effect)return false;if(context.area||context.shape||context.directional){state.activeSpellEffects=state.activeSpellEffects.filter(row=>row!==effect);clearLinkedSpellEffectState(effect);write(`${subject.name}'s Mirror Images all vanish in the area attack.`,'system');return true;}return false;}
21803:   function rawResistFireAdjustedDamage(subject,amount,context={}){
21845:   function rawProtectionFromEvilAttackPenalty(attacker,target,kind='melee'){
21870:   function rawStrikingBonusDamage(subject,item=null){return rawStrikingEffect(subject,item)?artifactLuckyRoll(subject,6,'Striking bonus damage'):0;}
21872:   function rawCurseAttackPenalty(subject){let total=0;for(const effect of rawCurseEffects(subject))if(effect.curseKind==='attack')total+=Number(effect.attackPenalty)||-4;return total;}
21897:   function rawResistColdAdjustedDamage(subject,amount,context={}){
21914:   function rawBreakCharmIfCasterAttacks(attacker,target){
21919:   function rawBreakSnakeCharmIfAttacked(target){
22131:   function rawImmunityDamageAdjustment(subject,amount,source='',context={}){
22179:   function rawTriggerAttackContactContingency(subject,attacker,{attackKind='melee',attackName='attack'}={}){
22185:   function rawTriggerDamageContingency(subject,{damage=0,hpBefore=null,hpAfter=null,source='',kind='ordinary'}={}){
22189:   function rawTriggerPreDamageContingency(subject,{incomingDamage=0,hpBefore=null,source='',kind='ordinary'}={}){
22260:   function rawStatueDamageAdjustment(subject,amount,source='',context={}){if(!rawStatueInForm(subject))return {damage:amount,changed:false};const element=String(context.element||'').toLowerCase(),magical=Boolean(context.magical||context.kind==='spell'),weapon=Boolean(context.weapon||context.attackKind==='melee'||context.attackKind==='missile'||context.kind==='weapon');if(['fire','heat','cold','ice'].includes(element))return {damage:0,changed:true,reason:'Statue form is immune to fire and cold'};
22264:   function processRawSpellCombatRound(){
22285:   function capturePoisonOnsetCombatEpisode(subject){
23513:   function setPcCombatOrder(pc,order){
23555:   function parsePcCombatCommand(input){
23678:   function normalizeCombatTargetQuery(text){
23684:   function singularizeCombatQuery(text){
23725:   function strictCombatTargetsFromText(text){
23747:   function resolveCombatOrderTarget(order,actorLabel='The action'){
24039:   function groupCombatActors(actor,context={}){
24112:   function normalizeCombatMovement(value,legacyAction=''){
24132:   function normalizeCombatAction(value){
24441:   function deterministicCombatActorPattern(){
24452:   function normalizeCombatCommandFraming(input){
24459:   function deterministicCombatClauseSegments(input){
24519:   function knownCombatSpellMention(actorText,body){
24549:   function parseDeterministicCombatClause(actor,body,context={}){
24622:   function parseDeterministicCompoundCombatPlan(input){
24643:   function parseDeterministicSingleCombatPlan(input){
24662:   function isGenericCombatTargetQuery(text){
24667:   function applyCombatPlan(orders,sourceInput=''){
24814:   function parseLocalGroupCombat(input){
24999:   function freeAttackAgainstFollower(pc,monster){
25181:   function developerCombatantStateAnswer(input){
25204:   function answerDeveloperCombatantStateQuestion(input){
25305:   function undeadTurningRank(monster){
25325:   function resolveTurnUndead(cleric,order={},eligible=true,simultaneous=false){
25464:   function decrementCombatEffects(){
25503:   function openWeaponChangeWindow(pendingResolution){
25522:   function rollCombatInitiativeSides(){
25539:   function resolveOrderedAttackPhase(label,resolver,winner,loser){
25543:   function resolveOrderedAttackPhaseMany(label,resolver,order){
25584:   function continueCombatAfterWeaponChanges(auto=false){
25626:   function beginRawSideTurn(side,nextSideOrRemaining){
25686:   function finishCombatIfConcluded(){
25712:   function finishCombatRound(){
25736:   function resolveCombatRound(){
25905:   function handleCombatDirect(input,normalized){
27148:   function smDistributeDamage(parts,damage){const totals=smFortTotals(parts),allocation={walls:0,gates:0,buildings:0,towers:0,barbicans:0,keeps:0,rubble:false,unallocated:0};if(damage>=totals.hp){for(const group of ['walls','gates','buildings','towers','barbicans','keeps'])allocation[group]=totals.groups[group];allocation.rubble=true;return allocation;}let remaining=damage;const take=(group,limit)=>{const amount=Math.min(remaining,Math.max(0,totals.groups[group]-allocation[group]),limit);allocat
27149:   function smPostSiegeDamage(s){let rolled=0;const weaponRolls={},roster=s.postSiegeWeapons||(s.week>0?Object.fromEntries(Object.entries(s.attackerEquipment||{}).filter(([id])=>SIEGE_WEAPONS[id]?.kind==='artillery').map(([id,row])=>[id,row.count])):{});for(const [id,count] of Object.entries(roster)){const def=SIEGE_WEAPONS[id];if(def?.kind!=='artillery')continue;let subtotal=0;for(let i=0;i<count;i++)subtotal+=rollDamageExpression(def.damage).total;if(subtotal){weaponRolls[id]=subtotal;rolled+=s
27616:   function artifactAdverseDamagePenalty(subject){return artifactAdverseAmount(subject,'artifact_adverse_damage_penalty','amount','sum');}
27619:   function artifactAdverseIncomingDamageExtra(subject,kind='ordinary',source=''){const q=String(kind||'').toLowerCase(),label=String(source||'').toLowerCase();let total=0;for(const row of artifactActiveAdverseApplications(subject)){const app=row.app;if(app.mechanic==='artifact_adverse_extra_damage_blows'&&['ordinary','melee','missile'].includes(q)){if(!app.attackType||label.includes(app.attackType)||q.includes(app.attackType))total+=Math.max(0,Number(app.amount)||0);}if(app.mechanic==='artifact_
27621:   function artifactHandicapAttackLevelMultiplier(subject){return artifactActiveHandicapApplications(subject,'artifact_adverse_lameness').some(row=>row.app.halfAttackLevel)?.5:1;}
27730:   function processArtifactCombatRound(){
27754:   function artifactWeaponDamageBonus(subject){return artifactBestNumericEffect(subject,'weapon_damage_bonus','amount',0);}
27755:   function artifactWeaponDamageMultiplier(subject){return Math.max(1,artifactBestNumericEffect(subject,'weapon_damage_multiplier','multiplier',1));}
27756:   function artifactWeaponStrengthBonus(subject){return artifactBestNumericEffect(subject,'weapon_strength_bonus','amount',0);}
27761:   function artifactTurnUndeadBonus(subject){const rows=artifactActiveEffectsFor(subject,'artifact_turn_undead_bonus');if(!rows.length)return {rollBonus:0,extraHdDice:0};const best=rows.slice().sort((a,b)=>(Number(b.effect.rollBonus)||0)-(Number(a.effect.rollBonus)||0)||(Number(b.effect.extraHdDice)||0)-(Number(a.effect.extraHdDice)||0))[0];return {rollBonus:Math.max(0,Number(best.effect.rollBonus)||0),extraHdDice:Math.max(0,Number(best.effect.extraHdDice)||0)};}
27763:   function artifactLeapAttackBonus(subject){return Number(subject?.artifactLeapAttackBonusRound)===Number(state.combat?.round)&&Number(subject?.artifactLeapAttackBonusAmount)>0?Number(subject.artifactLeapAttackBonusAmount):0;}
27764:   function artifactSmashAttackActive(subject){return artifactActiveEffectsFor(subject,'artifact_smash_attack').length>0;}
27766:   function artifactStrikingBonusDamage(subject,item=null){const row=artifactStrikingRow(subject,item);return row?artifactLuckyRoll(subject,6,'Striking bonus damage'):0;}
27787:   function artifactB3CombatSpeed(subject){
27844:   function artifactTeleportFallDamage(subject,tens){let total=0;for(let i=0;i<tens;i++)total+=rng(6);artifactDamageSubject(subject,total,'Teleport fall',{kind:'fall'});return total;}
27878:   function artifactDisarmAttackActive(subject){return artifactActiveEffectsFor(subject,'artifact_disarm_attack').length>0;}
27982:   function artifactProcessCreationCombatRound(){for(const record of Object.values(ensureArtifactCreationState().records))if(record?.active!==false&&record.combatRoundsRemaining!=null&&Number.isFinite(Number(record.combatRoundsRemaining))){record.combatRoundsRemaining=Math.max(0,Number(record.combatRoundsRemaining)-1);if(record.combatRoundsRemaining<=0)artifactExpireCreation(record,'combat duration expired');}}
27992:   function artifactSpawnCreatedCombatMonsters(typeKey,count,record,actor,{labelPrefix='Created'}={}){const profile=COMBAT_MONSTERS[typeKey],descriptors=[];if(!profile)return descriptors;for(let i=1;i<=count;i++){if(combatActive()){const m=createCombatMonster(typeKey,(state.combat?.monsters||[]).length+i);m.id=`${record.id}-${typeKey}-${i}`;m.name=`${labelPrefix} ${profile.name||typeKey} ${i}`;m.artifactCreated=true;m.summoned=true;m.summonedByArtifact=record.artifactId;m.controllerName=actor.nam
28059:   function artifactCurseAttackPenalty(subject){return artifactCurseRows(subject).some(row=>row.effect.curseKind==='attack')?-4:0;}
28072:   function artifactTurnWoodWeaponTrapped(subject){return Boolean(subject&&subject.artifactTurnWoodStuckEffectId&&Object.values(ensureArtifactState().records).some(rec=>(rec.activePowerEffects||[]).some(effect=>effect.id===subject.artifactTurnWoodStuckEffectId&&effect.active!==false)));}
28080:   function artifactTurnUndeadLevel(subject){const rows=artifactActiveEffectsFor(subject,'artifact_turn_undead');return rows.length?Math.max(...rows.map(row=>Math.max(0,Number(row.effect.turnLevel)||0))):0;}
28112:   function artifactDamageDiceCount(expression){const m=/^(\d*)d\d+/i.exec(String(expression||'').trim().replace(/\s+/g,''));return m?(Number(m[1])||1):0;}
28113:   function artifactSizeAdjustedDamageBase(base,expression,modifier){const dice=artifactDamageDiceCount(expression);if(!dice||!modifier)return Math.max(0,Number(base)||0);return Math.max(dice,(Number(base)||0)+modifier*dice);}
28117:   function artifactElasticityDamageAdjustment(subject,amount,context={}){if(!artifactElasticityStretched(subject))return {damage:amount,changed:false};const blunt=Boolean(context.blunt||String(context.damageType||'').toLowerCase()==='blunt'||/(?:mace|hammer|club|boulder|blunt)/i.test(String(context.source||'')));if(!blunt)return {damage:amount,changed:false};return {damage:Math.floor(Math.max(0,Number(amount)||0)/2),changed:true,reason:'stretched Elasticity form halves blunt-weapon damage'};}
28133:   function artifactResolveShapechangeAttackTrait(pc,monster,profile,atk){
28139:   function artifactShapechangeDamageIsNonRegenerable(source,context,regen){const text=[source,context?.element,context?.damageType,context?.kind].filter(Boolean).join(' ').toLowerCase();return (regen?.nonRegenerable||[]).some(token=>token&&text.includes(token));}
28140:   function artifactRecordShapechangeRegenerationDamage(subject,amount,source,context={}){const n=Math.max(0,Math.floor(Number(amount)||0)),regen=artifactShapechangeRegenerationProfile(subject),row=artifactTransformationRow(subject);if(!n||!regen||!row?.effect||subject.dead||Number(subject.hp)<=0)return false;if(artifactShapechangeDamageIsNonRegenerable(source,context,regen)){row.effect.shapechangeNonRegenerableDamage=(Number(row.effect.shapechangeNonRegenerableDamage)||0)+n;return false;}row.eff
28142:   function artifactTransformedNaturalAttacks(pc,monster,profile){const attacks=(profile?.attacks||[]).filter(a=>!a.refereeMediated&&averageDamageExpression(a.damage)>0);if(!attacks.length){write(`${pc.name}'s ${profile?.name||'transformed'} form has no ordinary natural attack encoded for deterministic resolution.`,'warning');return false;}for(const atk of attacks){if(!monsterStillPresent(monster))break;const result=attackRoll(pc,monster,'melee',Number(profile.attackBonus)||0,{artifactFormAttack:
28180:   function artifactImmunityWeaponDamage(subject,damage,context={}){let amount=Math.max(0,Math.floor(Number(damage)||0));if(!artifactImmunityActive(subject))return {damage:amount,changed:false};const kind=String(context.kind||'').toLowerCase(),attackKind=String(context.attackKind||'').toLowerCase();if(kind==='missile'||attackKind==='missile')return {damage:0,changed:true,reason:'artifact Immunity blocks all normal and magical missiles'};if(kind==='weapon'||context.handHeldWeapon===true){const mag
28181:   function artifactStatueDamageAdjustment(subject,damage,source='',context={}){let amount=Math.max(0,Math.floor(Number(damage)||0));if(!artifactStatueInForm(subject))return {damage:amount,changed:false};const kind=String(context.kind||'').toLowerCase(),element=String(context.element||'').toLowerCase(),text=String(source||'').toLowerCase();if(['fire','cold'].includes(element)||/(?:fire|flame|burn|cold|ice|frost)/.test(text)&&kind!=='weapon')return {damage:0,changed:true,reason:'Statue form is imm
28196:   function artifactConsumeSpellDamageBonusProfile(subject,{consume=false}={}){
28201:   function artifactSpellDamageBonusPerDie(subject,{consume=false}={}){return artifactConsumeSpellDamageBonusProfile(subject,{consume}).amount;}
28202:   function artifactAdjustedSpellDamageTotal(subject,baseTotal,dice,{consumeBonus=false}={}){const count=Math.max(1,Math.floor(Number(dice)||1)),bonus=artifactSpellDamageBonusPerDie(subject,{consume:consumeBonus}),weak=artifactAdverseWeakMagicPenalty(subject),total=(Number(baseTotal)||0)+(bonus-weak)*count;return {total:Math.max(count,total),bonusPerDie:bonus,weakPenaltyPerDie:weak};}
28203:   function applyArtifactWeaponDamageEffect(damage,subject,modifier=0){
28328:   function artifactCombatSubjectsInCone(origin,direction,lengthFeet=30,endWidthFeet=10){if(!combatActive())return [];const o=normalizedSpatialVector(origin),d=normalizedDirectionVector(direction),length=Math.max(0,Number(lengthFeet)||0),endRadius=Math.max(0,Number(endWidthFeet)||0)/2,rows=[];const consider=(subject,kind,vector)=>{const v=normalizedSpatialVector(vector),rx=v.x-o.x,ry=v.y-o.y,rz=v.z-o.z,axial=rx*d.x+ry*d.y+rz*d.z;if(axial<-1e-9||axial>length+1e-9)return;const radial=Math.sqrt(Math
28346:   function artifactDamageSubject(subject,amount,source,context={}){const n=Math.max(0,Math.floor(Number(amount)||0));if(artifactSubjectIsPc(subject))damagePc(subject,n,source,context);else damageMonster(subject,n,source,context);return n;}
28349:   function artifactCombatSubjectRows(){if(!combatActive())return [];const rows=[];for(const pc of state.party||[])if(!pc.dead&&Number(pc.hp)>0)rows.push({subject:pc,kind:'pc',vector:combatPcVector(pc)});for(const monster of state.combat?.monsters||[])if(monsterStillPresent(monster))rows.push({subject:monster,kind:'monster',vector:combatMonsterVector(monster)});return rows;}
28350:   function artifactCombatSubjectsInCube(center,sideFeet=20){const c=normalizedSpatialVector(center),half=Math.max(0,Number(sideFeet)||0)/2;if(!combatActive()||!c)return [];return artifactCombatSubjectRows().filter(row=>{const v=normalizedSpatialVector(row.vector);return Math.abs(v.x-c.x)<=half+1e-9&&Math.abs(v.y-c.y)<=half+1e-9&&Math.abs(v.z-c.z)<=half+1e-9&&!spatialInteractionBlocked(c,v);});}
28351:   function artifactCombatSubjectsInCloud(center,radiusFeet=15,heightFeet=20){const c=normalizedSpatialVector(center),radius=Math.max(0,Number(radiusFeet)||0),halfH=Math.max(0,Number(heightFeet)||0)/2;if(!combatActive()||!c)return [];return artifactCombatSubjectRows().filter(row=>{const v=normalizedSpatialVector(row.vector),dx=v.x-c.x,dy=v.y-c.y;return Math.hypot(dx,dy)<=radius+1e-9&&Math.abs(v.z-c.z)<=halfH+1e-9&&!spatialInteractionBlocked(c,v);});}
28353:   function artifactCombatSubjectsInDirectionalBox(origin,direction,lengthFeet=20,widthFeet=20,heightFeet=20){if(!combatActive())return [];const o=normalizedSpatialVector(origin),d=normalizedDirectionVector(direction),length=Math.max(0,Number(lengthFeet)||0),halfW=Math.max(0,Number(widthFeet)||0)/2,halfH=Math.max(0,Number(heightFeet)||0)/2,seed=Math.abs(d.z)<.9?{x:0,y:0,z:1}:{x:0,y:1,z:0},ux=seed.y*d.z-seed.z*d.y,uy=seed.z*d.x-seed.x*d.z,uz=seed.x*d.y-seed.y*d.x,ulen=Math.hypot(ux,uy,uz)||1,u={x:
28391:   function artifactAreaFireDamage(actor,center,{dice=20,die=6,radiusFeet=20,label='Fire Ball'}={}){const roll=rollDice(Math.max(1,Number(dice)||20),Math.max(2,Number(die)||6),actor,`${label} damage`),rows=combatSubjectsInSphere(center,Math.max(0,Number(radiusFeet)||20)),outcomes=[];for(const row of rows){const save=artifactSubjectSave(row.subject,'spells',0,label),damage=Math.max(0,Math.floor(roll.total*(save.success?.5:1)));artifactDamageSubject(row.subject,damage,label,{kind:'spell',magical:tr
28392:   function artifactDelayedBlastAttack(rec,actor,power,choice,{combat=false}={}){if(!combat)return {ok:false,summary:'Delayed Blast Fire Ball currently requires combat positioning.'};const raw=String(choice||'').trim(),m=/^(.*?)(?:\s*@\s*|\s+delay\s+)(\d+)\s*(?:r|rounds?)?$/i.exec(raw),targetName=(m?m[1]:raw).trim(),delay=Math.max(0,Math.min(Number(power.params?.maxDelayRounds)||60,m?Number(m[2]):0)),target=findPc(targetName)||findMonster(targetName,true);if(!target)return {ok:false,summary:'Spec
28394:   function artifactLifeDrainAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const result=artifactApplyEnergyDrain(subject,power.name);artifactHistory(rec,`${power.name}: ${result.summary}`,{powerId:power.id,targetName:subject.name,result});return {ok:true,summary:result.summary};}
28395:   function artifactExplosiveCloudAttack(rec,actor,power,primary,{combat=false}={}){if(!combat)return {ok:false,summary:'Explosive Cloud currently requires combat positioning.'};const am=artifactA1AntiMagicCheck(actor,power,actor);if(am)return am;const origin=magicSubjectVector(actor),target=magicSubjectVector(primary);if(!origin||!target)return {ok:false,summary:'Explosive Cloud requires represented 3D combat positions.'};const direction=artifactHorizontalDirection(origin,target),center={x:origi
28396:   function artifactDisintegrateAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const save=artifactSubjectSave(subject,'death',0,power.name);if(save.success)return {ok:true,summary:`${subject.name} makes the Saving Throw vs. Death Ray and resists Disintegrate.`};artifactSlaySubject(subject,power.name);artifactHistory(rec,`${subject.name} fails the Death Ray save and is disintegrated.`,{powerId:power.id,targetName:subject.name,save});return {o
28397:   function artifactPowerWordKillAttack(rec,actor,power,subjects){const victims=(subjects||[]).filter(Boolean),casterLike=s=>artifactSubjectIsPc(s)?s.className==='Magic-User':Boolean(s.spellCasterClass==='Magic-User'||s.magicUserSpells||s.magicUserLevel),out=[];if(victims.length>1){if(victims.length>5)return {ok:false,summary:'Power Word Kill can affect at most five low-hp victims.'};if(victims.some(s=>Number(s.hp)>20))return {ok:false,summary:'The multiple-victim form requires every target to ha
28398:   function artifactObliterateAttack(rec,actor,power,subject){const hd=artifactSubjectHitDice(subject);if(artifactSubjectIsUndead(subject)){const result=artifactApplyCureall(subject,'wounds');return {ok:true,summary:`Obliterate reverses against undead: ${subject.name} is affected as Cureall (${result.detail}).`};}if(!artifactSubjectIsLivingCreature(subject))return {ok:true,summary:`${subject.name} is not a living creature and is unaffected.`};if(hd<=7){artifactSlaySubject(subject,power.name);retu
28399:   function artifactMeteorSwarmAttack(rec,actor,power,subjects,{combat=false}={}){if(!combat)return {ok:false,summary:'Meteor Swarm currently requires combat positioning.'};const targets=[...(subjects||[])];if(![4,8].includes(targets.length))return {ok:false,summary:'Meteor Swarm requires exactly 4 or 8 distinct represented targets (one meteor per target).'};if(new Set(targets.map(t=>artifactSubjectKey(t))).size!==targets.length)return {ok:false,summary:'Only one meteor may be aimed at any one cr
28400:   function artifactTouchFixedDamage(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const params=power.params||{};if(combat&&subject!==actor&&subject?.type){const hit=attackRoll(actor,subject,'melee',0,{artifactFormAttack:true});if(!hit.hit){artifactHistory(rec,`${actor.name} misses ${subject.name} with ${power.name}: d20 ${hit.d20}${hit.mod?` ${hit.mod>=0?'+':'-'} ${Math.abs(hit.mod)}`:''} = ${hit.total}, needs ${hit.needed}.`,{p
28402:   function artifactMagicMissileAttack(rec,actor,power,subjects,{combat=false}={}){const params=power.params||{},count=Math.max(1,Number(params.missileCount)||5),targets=Array.isArray(subjects)&&subjects.length?subjects:[actor],assignments=targets.length===1?Array(count).fill(targets[0]):targets.slice(0,count),am=artifactA1AntiMagicCheck(actor,power,assignments[0]);if(am)return am;const outcomes=[];for(let i=0;i<count;i++){const subject=assignments[i];if(!subject||subject.dead||Number(subject.hp)
28404:   function artifactCreatePoisonAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(artifactSubjectPoisonImmune(subject,{gas:false,source:`${power.name} from ${rec.name}`})){artifactHistory(rec,`${subject.name}'s poison immunity prevents ${power.name}.`,{powerId:power.id,targetName:subject.name,immune:true});return {ok:true,mechanic:power.mechanic,summary:`${subject.name} is immune to poison.`};}const save=artifactSubjectSave(subject,'poison',
28405:   function artifactBreathAttack(rec,actor,power,primary,{combat=false}={}){
28416:   function artifactBearhugAttack(rec,actor,power,subject,{combat=false}={}){if(!combat)return {ok:false,summary:'Bearhug requires an active combat encounter so the Hit roll, relative size, hold, and escape saves can be resolved.'};const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(!artifactBearhugHandsEmpty(actor))return {ok:false,summary:`${actor.name} must have both hands empty to use Bearhug.`};if(artifactSubjectSizeRank(subject)>artifactSubjectSizeRank(actor))return {o
28417:   function artifactCauseDiseaseAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(!artifactSubjectIsLivingCreature(subject))return {ok:true,mechanic:power.mechanic,summary:`${subject.name} is not a living creature and is unaffected by Cause Disease.`};if(artifactSubjectIsPc(subject)&&artifactProtectionPrevents(subject,'disease',{source:`${power.name} from ${rec.name}`,announce:true}))return {ok:true,mechanic:power.mechanic,summary:`${subject
28418:   function artifactDispelEvilAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject===actor?actor:subject);if(am)return am;if(artifactSubjectIsPc(subject)&&subject!==actor){const hasCharm=Boolean(subject.charmed||subject.charmSource||subject.charmExpiresAtAbsoluteMinute),hasCurse=Boolean(subject.cursed||Object.prototype.hasOwnProperty.call(subject,'glowingHands'));if(hasCharm&&hasCurse)return {ok:false,summary:`${subject.name} has both a represent
28420:   function artifactCloudkillAttack(rec,actor,power,primary,{combat=false}={}){if(!combat)return {ok:false,summary:'Cloudkill currently requires combat positioning; its moving 30-foot cloud cannot be placed faithfully without represented 3D positions.'};const am=artifactA1AntiMagicCheck(actor,power,actor);if(am)return am;const params=power.params||{},origin=magicSubjectVector(actor),target=magicSubjectVector(primary);if(!origin||!target)return {ok:false,summary:'Cloudkill requires represented 3D
28421:   function artifactIceStormAttack(rec,actor,power,primary,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,primary);if(am)return am;const params=power.params||{},center=magicSubjectVector(primary),side=Math.max(0,Number(params.cubeFeet)||20),base=rollDice(Math.max(1,Number(params.damageDice)||20),Math.max(2,Number(params.damageDie)||6),actor,'artifact Ice Storm damage').total,rows=combat&&center?artifactCombatSubjectsInCube(center,side):[{subject:primary,kind:artifactSubjectIsPc(
28422:   function artifactDeathSpellAttack(rec,actor,power,primary,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,primary);if(am)return am;const params=power.params||{},center=magicSubjectVector(primary),side=Math.max(0,Number(params.cubeFeet)||60),budget=Math.max(0,Number(params.hitDiceBudget)||32),maxHd=Math.max(0,Number(params.maxVictimHd)||7),rows=(combat&&center?artifactCombatSubjectsInCube(center,side):[{subject:primary,kind:artifactSubjectIsPc(primary)?'pc':'monster',vector:cen
28423:   function artifactFingerOfDeathAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(artifactSubjectIsUndead(subject)){if(artifactSubjectHitDice(subject)>=10){const healing=rollDice(3,10,actor,'Finger of Death undead healing').total,before=Number(subject.hp)||0;subject.hp=Math.min(Number(subject.maxHp)||before,before+healing);const healed=subject.hp-before;artifactHistory(rec,`${power.name} cures ${healed} hp on ${subject.name}, an undead crea
28424:   function artifactPoisonGasBreathAttack(rec,actor,power,primary,{combat=false}={}){if(!combat)return {ok:false,summary:'Poison Gas Breath currently requires combat positioning so its persistent 20-foot cloud can be represented.'};const am=artifactA1AntiMagicCheck(actor,power,actor);if(am)return am;const params=power.params||{},origin=magicSubjectVector(actor),target=magicSubjectVector(primary);if(!origin||!target)return {ok:false,summary:'Poison Gas Breath requires represented 3D combat positio
28426:   function artifactCauseFearAttack(rec,actor,power,subject,{combat=false}={}){
28430:   function artifactSleepAttack(rec,actor,power,subjects,{combat=false}={}){
28434:   function artifactCharmPersonAttack(rec,actor,power,subject){return artifactApplyCharm(rec,actor,power,subject,'person');}
28435:   function artifactCharmMonsterAttack(rec,actor,power,subjects){const list=[...new Map((subjects||[]).map(s=>[artifactSubjectKey(s),s])).values()];if(list.length>1&&list.some(s=>artifactSubjectHitDice(s)>3))return {ok:false,summary:'Charm Monster can affect up to 18 creatures only when every selected creature has 3 Hit Dice or less; otherwise it affects one creature.'};if(list.length>Math.max(1,Number(power.params?.maxTargets)||18))return {ok:false,summary:'Charm Monster exceeds its artifact rec
28436:   function artifactCalmOthersAttack(rec,actor,power,subjects){const list=[...new Map((subjects||[]).map(s=>[artifactSubjectKey(s),s])).values()];if(list.some(s=>!s.type))return {ok:false,summary:'Calm Others currently resolves the printed Monster Reaction procedure only for represented monster/NPC combatants.'};const used=list.reduce((sum,s)=>sum+artifactSubjectHitDice(s),0),cap=Math.max(0,Number(power.params?.hitDiceBudget)||40);if(used>cap)return {ok:false,summary:`Calm Others can affect at mo
28437:   function artifactFeeblemindAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(!artifactFeeblemindEligible(subject))return {ok:false,summary:`${subject.name} is not represented as a magic-user, elf, or spell-casting monster and cannot be affected by Feeblemind.`};const modifier=Number(power.params?.saveModifier??-4),save=artifactSubjectSave(subject,'spells',modifier,power.name);if(save.success)return {ok:true,mechanic:power.mechanic,summary
28440:   function artifactControlPlantsAttack(rec,actor,power,subjects,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()];if(!list.length)return {ok:false,summary:'Control Plants requires at least one represented plant or plant-like creature.'};for(const subject of list)if(!artifactSubjectIsPlantLike(subject))return {ok:false,summary:`${subject.name} is not represented as a plant or plant-like creature.`};const outcomes=[];for(const sub
28441:   function artifactCharmPlantAttack(rec,actor,power,subjects,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()];if(!list.length)return {ok:false,summary:'Charm Plant requires at least one represented plant or plant-like creature.'};for(const subject of list)if(!artifactSubjectIsPlantLike(subject))return {ok:false,summary:`${subject.name} is not represented as a plant or plant-like creature.`};const classes=[...new Set(list.map(ar
28442:   function artifactGeasAnotherAttack(rec,actor,power,subject,instruction){const command=String(instruction||'').trim();if(!command)return {ok:false,summary:'Geas Another requires a stated action to perform or avoid.'};const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const save=artifactSubjectSave(subject,'spells',0,power.name);if(save.success)return {ok:true,mechanic:power.mechanic,summary:`${subject.name} succeeds on the Saving Throw vs. Spells and resists Geas Another.`};
28446:   function artifactConfusionAttack(rec,actor,power,subjects,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()];if(!list.length)return {ok:false,summary:'Confusion requires at least one represented creature.'};if(list.length>Math.max(1,Number(power.params?.maxTargets)||18))return {ok:false,summary:'Confusion can affect at most 18 represented creatures.'};if(combat){const center=magicSubjectVector(list[0]);if(!center)return {ok:fal
28448:   function artifactMassCharmAttack(rec,actor,power,subjects){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()],cap=Math.max(0,Number(power.params?.hitDiceBudget)||30),maxHd=Math.max(0,Number(power.params?.maxVictimHd)||30),modifier=Number(power.params?.saveModifier??-2);if(!list.length)return {ok:false,summary:'Mass Charm requires at least one represented creature.'};const used=list.reduce((sum,s)=>sum+artifactSubjectHitDice(s),0);if(used>cap)retu
28449:   function artifactOpenMindAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(!artifactSubjectIsLivingCreature(subject))return {ok:false,summary:`${subject.name} is not a living creature that can receive Open Mind.`};if(combat&&subject!==actor){const hit=attackRoll(actor,subject,'melee',0,{artifactFormAttack:true});if(!hit.hit){artifactHistory(rec,`${actor.name} misses ${subject.name} with Open Mind's required touch Hit rol
28456:   function artifactControlAttack(rec,actor,power,subjects,kind,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()],cap=Math.max(0,Number(power.params?.hitDiceBudget)||0),maxTargets=Math.max(1,Number(power.params?.maxTargets)||1),maxHd=Math.max(0,Number(power.params?.maxVictimHd)||0);if(!list.length)return {ok:false,summary:`${power.name} requires at least one represented target.`};if(list.length>maxTargets)return {ok:false,summary
28462:   function artifactWebAttack(rec,actor,power,subjects,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()],out=[];for(const subject of list){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am){out.push(`${subject.name}: Anti-Magic`);continue;}const escape=artifactWebEscapeRounds(subject),effect=artifactCreateA3Effect(rec,power,subject,{combat,turns:48,amount:escape});out.push(`${subject.name}: webbed${escape>0?`, breaks f
28463:   function artifactHoldAttack(rec,actor,power,subjects,{combat=false,animal=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()],singlePenalty=animal?0:(list.length===1?-2:0),turns=Math.max(1,Number(power.params?.durationTurns)||40),out=[];for(const subject of list){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am){out.push(`${subject.name}: Anti-Magic`);continue;}if(subject.immuneHold||subject.immuneParalysis){out.push(`${subj
28464:   function artifactSlowAttack(rec,actor,power,subjects,{combat=false}={}){const list=[...new Map((subjects||[]).filter(Boolean).map(x=>[artifactSubjectKey(x),x])).values()],out=[];for(const subject of list){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am){out.push(`${subject.name}: Anti-Magic`);continue;}const save=artifactSubjectSave(subject,'spells',0,power.name);if(save.success){out.push(`${subject.name}: saves`);continue;}for(const row of artifactActiveEffectsFor(subject,'artifa
28465:   function artifactWoodenWeapon(subject){const id=subject?.type?subject.weaponId:subject?.equippedWeapon?.itemId,item=id?SHOP_ITEMS[id]:null,name=String(item?.name||id||'').toLowerCase();return Boolean(id&&/(bow|crossbow|spear|javelin|staff|wand|club)/.test(name));}
28466:   function artifactProcessTurnWoodRound(rec,effect){if(!combatActive()||effect.active===false)return;const origin=effect.centerVector,dir=effect.directionVector;if(!origin||!dir)return;const step=Math.max(1,Number(effect.movesFeetPerRound)||10),prior=Math.max(0,Number(effect.roundsElapsed)||0)*step,next=Math.min(Math.max(step,Number(effect.lengthFeet)||360),prior+step),halfW=Math.max(1,Number(effect.widthFeet)||120)/2,halfH=Math.max(1,Number(effect.heightFeet)||60)/2;for(const subject of [...sta
28467:   function artifactTurnWoodAttack(rec,actor,power,subject,{combat=false}={}){if(!combat)return {ok:false,summary:'Turn Wood requires represented 3D combat positioning.'};const origin=magicSubjectVector(actor),target=magicSubjectVector(subject);if(!origin||!target)return {ok:false,summary:'Turn Wood requires represented positions.'};const dx=target.x-origin.x,dy=target.y-origin.y,len=Math.hypot(dx,dy)||1,dir={x:dx/len,y:dy/len,z:0},effect=artifactCreateA3Effect(rec,power,actor,{combat,turns:40,ex
28468:   function artifactFleshToStoneAttack(rec,actor,power,subject){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const save=artifactSubjectSave(subject,'petrification',0,power.name);if(save.success)return {ok:true,mechanic:power.mechanic,summary:`${subject.name} saves vs. Turn to Stone.`};for(const row of artifactActiveEffectsFor(subject,'artifact_flesh_to_stone'))artifactEffectDeactivate(row.rec,row.effect,'replaced by a new petrification');const effect=artifactCreateA3Effe
28469:   function artifactPowerWordStunAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const hp=Math.max(0,Number(subject.hp)||0);if(hp>70)return {ok:true,mechanic:power.mechanic,summary:`${subject.name} has ${hp} hp and is unaffected by Power Word Stun.`};const rounds=hp<=35?12:6;artifactCreateA3Effect(rec,power,subject,{combat,rounds});return {ok:true,mechanic:power.mechanic,summary:`${subject.name} is stunned for ${rounds} roun
28470:   function artifactDanceAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;if(combat&&subject!==actor){const hit=attackRoll(actor,subject,'melee',0,{artifactFormAttack:true});if(!hit.hit)return {ok:true,mechanic:power.mechanic,summary:`${actor.name}'s required touch Hit Roll misses ${subject.name}; Dance has no effect.`};}artifactCreateA3Effect(rec,power,subject,{combat,rounds:8});return {ok:true,mechanic:power.mechanic,summar
28471:   function artifactPowerWordBlindAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const hp=Math.max(0,Number(subject.hp)||0);if(hp>80)return {ok:true,mechanic:power.mechanic,summary:`${subject.name} has ${hp} hp and is unaffected by Power Word Blind.`};const minutes=hp<=40?4*1440:(rng(4)+rng(4))*60;for(const row of artifactActiveEffectsFor(subject,'artifact_power_word_blind'))artifactEffectDeactivate(row.rec,row.effect,'repl
28472:   function artifactLifeTrappingAttack(rec,actor,power,subject){const occupied=(rec.activePowerEffects||[]).filter(effect=>effect.active!==false&&effect.mechanic==='artifact_life_trapping').length;if(occupied>=20)return {ok:false,summary:'Life Trapping already contains its 20-creature maximum.'};const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const save=artifactSubjectSave(subject,'spells',0,power.name);if(save.success)return {ok:true,mechanic:power.mechanic,summary:`${subj
28473:   function artifactMazeAttack(rec,actor,power,subject,{combat=false}={}){const am=artifactA1AntiMagicCheck(actor,power,subject);if(am)return am;const intelligence=artifactEffectiveIntelligence(subject);let rounds,minutes;if(intelligence<=8){const turns=rng(6);minutes=turns*10;rounds=turns*60;}else if(intelligence<=12){rounds=rng(20)+rng(20);minutes=rounds/6;}else if(intelligence<=17){rounds=rng(4)+rng(4);minutes=rounds/6;}else{rounds=rng(4);minutes=rounds/6;}const effect=artifactCreateA3Effect(r
28474:   function artifactLightDarknessAttack(rec,actor,power,subject,{combat=false}={}){
28484:   function artifactSilenceAttack(rec,actor,power,subject,{combat=false}={}){
28488:   function artifactBabbleAttack(rec,actor,power,subject){
28494:   function artifactBlessAttack(rec,actor,power,subjects,{combat=false}={}){
28500:   function artifactBlightAttack(rec,actor,power,subjects,{combat=false}={}){
28506:   function artifactCurseAttack(rec,actor,power,subject,choice,{combat=false}={}){
28510:   function artifactFullPolymorphAttack(rec,actor,power,subject,formKey,{combat=false}={}){
28513:   function artifactAppearAttack(rec,actor,power,subjects,{combat=false}={}){
28516:   function artifactAntiMagicRayAttack(rec,actor,power,subject,{combat=false}={}){
28519:   function artifactBlastingAttack(rec,actor,power,subject,{combat=false}={}){
28899:   function artifactDamageLossCount(rec){const pct=rec.maxHp>0?100*(rec.maxHp-rec.hp)/rec.maxHp:100;return pct<40?0:1+Math.floor((pct-40+1e-9)/10);}
28900:   function updateArtifactDamageConsequences(rec){
28906:   function minimumDamageExpression(expression){
28909:   function artifactDamagePercent(rec){return rec&&Number(rec.maxHp)>0?Math.max(0,Math.min(100,100*(Number(rec.maxHp)-Number(rec.hp))/Number(rec.maxHp))):100;}
28934:   function artifactKnownPhysicalDamageMultiplier(actor,damageContext={},source=''){
28937:   function artifactKnownOnPcDamaged(actor,amount,source='',damageContext={}){if(!actor||Number(amount)<=0)return;const text=`${source||''} ${damageContext.attackerName||''} ${damageContext.attackerType||''}`.toLowerCase(),undead=damageContext.undeadAttacker===true||/\bundead\b|skeleton|zombie|ghoul|wight|wraith|vampire|spectre|mummy|lich/.test(text);if(!undead)return;for(const rec of artifactKnownRecordsHeldBy(actor,'fiery_brand_of_masauwu')){const rt=artifactSourceRuntime(rec);if(rt.meteorDoomA
28945:   function artifactKnownMaatDoublePhysicalDamage(actor,damageContext={},source=''){if(!actor?.artifactMaatDoublePhysicalDamage)return 1;const kind=String(damageContext.kind||'ordinary').toLowerCase(),physical=damageContext.physical===true||damageContext.natural===true||['ordinary','missile','breath','falling'].includes(kind);return physical?2:1;}
28946:   function artifactKnownAttackSaveModifier(rec,subject,power){if(!rec?.sourcePublished||rec.sourceTemplateKey!=='wife_of_ilmarinen')return 0;const rt=artifactSourceRuntime(rec),row=rt.wifeRedirectActive;if(!row||String(row.actorName||'').toLowerCase()!==String(subject?.name||'').toLowerCase()||row.powerId!==power?.id)return 0;return Math.max(0,Number(row.saveBonus)||0);}
29046:   function artifactProcessVerthandiCombatRound(){if(!combatActive())return;const round=Number(state.combat?.round)||1;for(const rec of Object.values(ensureArtifactState().records)){if(rec.sourceTemplateKey!=='verthandis_invincible_hourglass'||rec.recalled)continue;const rt=artifactSourceRuntime(rec),tx=rt.hourglassConcentration;if(!tx?.active||!tx.combat||round<=Number(tx.startedRound||0))continue;const actor=findPc(tx.actorName);if(!actor||actor.dead){if(actor)artifactInterruptVerthandiConcentr
29118:   function artifactAutonomousDefenseAfterAttack(rec,{attacker=null,personalAttack=true,combat=false,preferredPower='',choice='',damagedNow=false}={}){
29242:   function developerArtifactDamage(id,body=''){
29458:   function processPlanarGateCombatRound(round){
30429:   function isCombatContinuePreviousActionInput(input){
30625:   function actionPlanToCombatOrders(plan){
30894:   async function repairCombatIntentWithAi(playerInput,previousIntent){
31644:   function harnessCombatFixture({distance=90,type='skeleton',count=4}={}){
31713:   function harnessDmr2ShipNpcCombat226(className='Fighter',level=4){
31731:   function harnessDmr2ShipWeaponConfig228({faction='pirate',casters=false}={}){
31960:   function harnessRepresentPoisonCombatOnset319(subject,round){
