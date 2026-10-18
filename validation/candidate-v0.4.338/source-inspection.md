# v0.4.338 preimplementation inspection

HTML lines: 41699; bytes: 11560164

## Newest audit

# Known World BECMI Engine Audit

Build: **0.4.337**
Primary authority reviewed: **Mentzer D&D - BECM.pdf**, consolidating Mentzer Basic Player, Basic Dungeon Master, Expert, Companion Player, Companion Dungeon Master, Master Player, and Master Dungeon Master.
Secondary authority: **Rules Cyclopedia.pdf** is used for consolidation/clarification where compatible; it does not replace or override Mentzer BECM when the two differ.
Audit date: 2026-10-16


## v0.4.337 — Per-attack natural-attack preferred measures, schema/data only

**Qualifying candidate:** 64bc701ea5afa1db3723d61e22d5ab8a5b9d5e5f, complete qualifying green required [Actions run 39056696281](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39056696281), ten jobs passed. **Core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 508/508 on reference v0.4.333 and this candidate**, ordered once-only coverage, exact production boot, browser/native reload and isolation, zero page/runtime/console/network errors. The historical 523-runner remains historical, not rerun. The acceptance-metadata commit and authoritative main each independently require further green CI. v0.4.337 exact production SHA-256: eba6c44757003104f32f2e2fa0a6a2c30cdd37a456a3695a36d480eddb80b48b.

**Source/data boundary:** source-verified individual natural attack metadata added to 41 attacks in 19 canonical profiles, each guarded by exact source profile record ID, individual attack index, name and unchanged printed damage. All 628 runtime monster profiles remain; 1151 other runtime attack entries retain unknown/unresolved preferred measure. New attackContext holds natural delivery, Close preference, unknown legalMeasures=null, false contextualWeaponDamageEligible, High confidence and governing BECMI citation. Provisional records, family/alias rows, ambiguous alternatives and unsupported reach have no fabricated metadata. The 600-entry authoritative catalogue is not rewritten. Runtime catalogue tests proved exactly 41 actual enriched attacks, 1151 unresolved, spawn cloning, JSON roundtrip and real browser reload.

**No live combat change:** natural attacks retain published/source damage with no Measure/Size/Protection/Space adjustments. Live monster movement, attack legality, targeting, AI, PCs/NPCs, RAW/AAE/CONTEXT_MATRIX current damage, special attacks and RNG/time/resources are unchanged. Pure v0.4.336 calculator untouched and disconnected from live combat. External test fixture is ephemeral, never in production. The 46 weapon profile calibration and existing rule toggles persist.

**Next checkpoint only by separate user authorization:** v0.4.338 live Context Matrix damage integration for explicitly eligible canonical weapon hits, never natural attacks; preserve RAW/AAE, original dice and all other source/RPG effects. Ordinary Cureall/parser source closure and cartography remain separate/deferred.

## v0.4.336 — Pure Context Matrix calculator only

**Qualifying candidate:** eb483c7399b9e3836e943512e2834925ed760c0e, successful required Actions run https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/39000565428 (ten required jobs green). Core 2316/2316, focused 1232/1232, Chromium 579/579 x four, Native Acceptance v2 33 scenarios and 508/508 assertions on baseline and candidate; ordered coverage, exact production boot and save/reload all green. The acceptance-metadata commit and authoritative main must each independently pass required CI before promotion. Exact v0.4.336 production SHA-256: c74c2f529566b957a0550178c4d5f51d5164ba67e4658e07d3e7dedb02daaf7d.

**Scope:** isolated pure deterministic lib/context-matrix-calculator.mjs with workbook Size/Power/Protection/Range response, reference Power subtraction, two source steps per damage point, Excel ROUND ties away from zero, Restricted-only whole-point Handling and -3 to +3 clamp. The new required validation/context-matrix-calculator.mjs test covers all 36 workbook Spear reference conditions, each of the 46 canonical profiles across 36 condition combinations, six range families, positive/negative rounding boundaries, clamps, Nil and unknown/malformed neutrality and natural attack exclusions. Only the APP_VERSION marker changes in production HTML: no live caller, new damage, attack-roll/AC, RNG/time/resource or save/migration changes. RAW and AAE combat are unchanged.

**Natural-attack binding rule:** each individual attack may later carry delivery, preferredMeasure, legalMeasures and contextualWeaponDamageEligible; natural, breath, projectile and special attacks never take Context Matrix weapon modifiers, despite tactical preferred measures. Published natural damage remains RAW. An armed monster using a normal weapon follows weapon rules. No Protection from AC or supernatural immunity; use actual current target Size and resolved physical Protection, never placeholder guesses; adjacency does not imply Restricted. Contract documented without catalogue rewrite.

**Next isolated checkpoint:** v0.4.337 per-attack preferred-measure schema/data enrichment only. Live Context Matrix weapon-damage integration remains separately deferred (tentatively v0.4.338). Ordinary Cureall parser/fallback, monster AI and hidden cartography are unchanged and deferred.

## v0.4.335 — Context Matrix data/mode only

**Accepted candidate:** `d4cfd684f0ad7a7c8be23b31803ae5cd1b076020`; [required Actions run 38961050097](https://github.com/Diabolicdonut/BECMI-Mystara/actions/runs/38961050097) completed successfully with all ten required jobs green before this acceptance metadata commit. Exact production SHA-256: `76b726460d98cf2cf49947ba2aba419a12f5d2c481e02d19c508a512778ba7a5`. This metadata commit must independently pass the complete required workflow before merging to main; candidate CI alone is not acceptance-commit evidence.

**Scope:** first Context Matrix foundation checkpoint only. New campaigns select **RAW** weapon damage by default; the separate `CONTEXT_MATRIX` selector and command persist through actual browser save/reload and deliberately use the unchanged RAW roll, damage, RNG and mastery-minimum pathways. The separately selectable `AAE` mode follows the previously implemented weapon matrix damage pathways. Existing saved `MATRIX` mode tokens are retained and continue to use the same preexisting matrix behavior; the legacy command and regression fixtures are preserved. Invalid/malformed mode settings migrate safely to RAW; invalid direct mode selections refuse without changing the active mode. No Context Matrix arithmetic, signed damage modifiers, clamps, live damage, hit adjustments, tactical mechanics or AI-generated facts were implemented.

**Canonical source-backed data:** `data/context-matrix-weapon-profiles.json` contains **46 workbook-derived weapon entries** with identity/category, unchanged published RC damage expression including `Nil`, Size/Power/Handling ratings, range profile, provenance and handling rationale, with the workbook Rating Guide calibration (reference Soft and Medium/Normal/Open, two original steps per whole damage point, Excel rounding instruction, −3/+3 limits, response tables and range-profile families). Runtime includes a machine-readable static profile snapshot; it does not parse XLSX or run the future calculator. The four-sheet text extraction and the authorized Weapon Effectiveness Atlas v0.4 and exploratory Contextual Weapon Damage Rules v0.1 are preserved under `design/context-matrix/`. The original `BECMI_Weapon_Cont

## BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md min damage evidence

## design/context-matrix/Known_World_Contextual_Weapon_Damage_Rules_v0.1.md min damage evidence

## design/context-matrix/Known_World_Weapon_Effectiveness_Atlas_v0.4.md min damage evidence
155:  Published *Rules Cyclopedia* weapon dice are retained as the normal *damage on a successful hit*: dagger **1d4**, ordinary sword **1d8**, hand axe **1d6**, spear **1d6**, poleaxe **1d10**. They are *not* experimentally measured wound potentials. The proposed contextual ceilings are game-design hypotheses and deliberately conditional:  | Weapon | Worst **usable** blow | Published normal | Highest proposed situational die | Peak requires |
174:  | Die | Mean on successful hit | |---|---:| | 1d2 | 1.5 |
221:  A cautious trial question is: *When a legally successful hit is already established, is there a specific weapon–target interaction, not already represented by AC, that makes the severity of that hit different?* Consider a poleaxe hammer face, pointed pick, a wood-chopping axe head, vulnerable creature anatomy, or a target described as brittle or structurally unusual. If no distinct interaction can be described, **keep the published damage die**.  Historical caveat: real armored combat could involve wrestling and striking armor gaps, and historical poleaxes were multi-purpose with hammer, blad
276: - **Published BECMI baselines are not estimates of real-world kinetic energy.** RC Chapter 4 confirms short sword `1d6`, mace `1d6`, war hammer `1d6`, two-handed battle axe `1d8`, two-handed sword `1d10`, halberd `1d10`, and pike `1d10`, alongside the earlier five anchors. RC's battle axe explicitly takes two hands; its war hammer description is a medium-shaft broad hammer head and does **not** automatically supply a narrow pick or beak. RC's two-handed sword is also subject to a printed individual-initiative restriction; Known World's alternate initiative/handling policy must take precedence
306:  For comparability, each entry below explicitly defines its **established** situation. A `—` means the named weapon cannot make the illustrated damaging attack **at that exact moment**, not that it deals zero damage if a different maneuver becomes possible. The cases are alternatives, not a sequence of rounds, and the listed numbers are expected *damage dice on successful hits*, not overall chances of winning. Individual techniques, handedness, shield defense, movement, hit probability and skill may reverse an overall combat outcome.  | Test | Established scene | Compared contextual damage | B

## Mode and calculator (total 49)

2483: rules:{weaponDamageMode:'RAW',weaponAudit:true,fighterCombatOptions:true,unarmedCombat:true,weaponMastery:false,generalSkills:false,warMachine:true,siegeMachine:true,touchDispel:false,initiativeMode:'PHASED',gettingLostM
5846: weaponRuleState.innerHTML = `<strong>Weapon damage:</strong> ${esc(rules.weaponDamageMode)}<br><strong>Weapon audit:</strong> ${rules.weaponAudit ? 'ON — compare both systems' : 'OFF'}<br><strong>Initiative:</strong> ${r
5853: rawWeaponsButton.disabled = rules.weaponDamageMode === 'RAW';
5854: contextWeaponsButton.disabled = rules.weaponDamageMode === 'CONTEXT_MATRIX';
5855: matrixWeaponsButton.disabled = ['MATRIX','AAE'].includes(rules.weaponDamageMode);
11626: if(!['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(value)){
11630: state.rules.weaponDamageMode=value;
11633: value==='CONTEXT_MATRIX'?'Context Matrix data mode selected; live damage remains RAW in v0.4.335.':
11922: function mentzerBastardInitiativeLoss(pc){const item=equippedWeaponItem(pc);return Boolean(['RAW','CONTEXT_MATRIX'].includes(state.rules?.weaponDamageMode)&&item?.itemId==='sword_bastard'&&item?.masteryUseMode==='twohand
15720: const selectedWeaponMode=String(rules.weaponDamageMode??'').toUpperCase();
15721: rules.weaponDamageMode=['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(selectedWeaponMode)?selectedWeaponMode:'RAW';
15740: if(rules.weaponDamageMode==='RAW'&&rules.initiativeMode==='RAW'&&rules.gettingLostMode==='RAW'&&spellResolutionMode()==='RAW_STRICT')return 'BECM RAW PROCEDURES';
15741: if(['MATRIX','AAE'].includes(rules.weaponDamageMode)&&rules.initiativeMode==='PHASED'&&rules.gettingLostMode==='LOST_TIME'&&spellResolutionMode()==='RAW_STRICT')return 'HOUSE PROCEDURES';
15746: if(value==='RAW'||value==='BECM_RAW'||value==='BECM_RAW_PROCEDURES'){rules.weaponDamageMode='RAW';rules.initiativeMode='RAW';rules.gettingLostMode='RAW';rules.spellResolutionMode='RAW_STRICT';write('BECM RAW procedure pr
15747: else if(value==='HOUSE'||value==='HOUSE_PROCEDURES'){rules.weaponDamageMode='MATRIX';rules.initiativeMode='PHASED';rules.gettingLostMode='LOST_TIME';rules.spellResolutionMode='RAW_STRICT';write('House procedure profile a
17502: const expr={...weaponDamageExpressions(item,target,range)}; const mastery=masteryDamageExpression(item,target); if(mastery)expr.raw=mastery; const active=state.rules.weaponDamageMode||'RAW';
17505: if(active==='RAW'||active==='CONTEXT_MATRIX'){
18433: const rawBase=minimumDamageExpression(rawExpr),matrixBase=minimumDamageExpression(expr.matrix),active=state.rules.weaponDamageMode||'RAW',appliedBase=(active==='RAW'||active==='CONTEXT_MATRIX')?rawBase:matrixBase;let dmg
26106: Weapon damage: ${state.rules.weaponDamageMode}
26112: write(`Mode: site/dungeon exploration\nLocation: ${currentSite().name}\nTime: ${clockText()}\nExploration turns elapsed: ${state.turn}\nLight: ${lightStatusText()}\nParty size: ${state.party.length}\nTreasury: ${formatMo
30218: Weapon damage mode: ${state.rules.weaponDamageMode}`;
30227: return `Mode: keyed site or dungeon\nRegion: Kai Besil\nLocation: ${site.name}\nSettlement: ${settlement?.name||'none'}\nSettlement type and scale: ${settlement?`${settlement.type||'settlement'} / ${settlement.scale||'un
31048: `Current weapon damage mode: ${state.rules?.weaponDamageMode||'RAW'}. Weapon audit: ${state.rules?.weaponAudit?'ON':'OFF'}.`,
31131: Weapon rule: ${state.rules.weaponDamageMode}; audit ${state.rules.weaponAudit?'on':'off'}; initiative ${state.rules.initiativeMode||'RAW'}; retainer XP share 0.5 (Mentzer BECMI); developer mode ${developerMode?'ON':'OFF'
31411: if (['weapon mode context matrix','weapon mode context','weapons context matrix','context matrix mode'].includes(normalized)) return setWeaponMode('CONTEXT_MATRIX');
31661: state.rules={...state.rules,weaponDamageMode:'MATRIX',weaponAudit:true,initiativeMode:'PHASED',developerMode:true};
31671: state.rules={...state.rules,weaponDamageMode:'MATRIX',weaponAudit:true,initiativeMode:'PHASED',developerMode:true};
33569: installKaiBesilHarnessFixture();const cfg=harnessDmr2ShipAddedCatapultCurrentLoadingConfig269();for(const mode of ['RAW','MATRIX'])for(const mastery of [false,true]){state.rules.weaponDamageMode=mode;state.rules.weaponMa
33643: installKaiBesilHarnessFixture();const cfg=harnessDmr2ShipAddedCatapultLoadingConfig267();for(const mode of ['RAW','MATRIX'])for(const mastery of [false,true]){state.rules.weaponDamageMode=mode;state.rules.weaponMastery=m
34735: installHarnessFixture();for(const mastery of [false,true])for(const mode of ['RAW','Matrix']){state.rules.weaponMastery=mastery;state.rules.weaponDamageMode=mode;const before=harnessFingerprint(state);harnessAssert(class
34886: for(const mode of ['RAW','MATRIX'])for(const mastery of [false,true]){installHarnessFixture();state.rules.weaponDamageMode=mode;state.rules.weaponMastery=mastery;const before=harnessFingerprint(state),p=dmr2BuccaneerPira
35202: for(const mode of ['RAW','MATRIX'])for(const mastery of [false,true]){installHarnessFixture();state.rules.weaponDamageMode=mode;state.rules.weaponMastery=mastery;const before=harnessFingerprint(state),cfg=harnessDmr2Ship
35320: for(const mode of ['RAW','MATRIX'])for(const mastery of [false,true]){installHarnessFixture();state.rules.weaponDamageMode=mode;state.rules.weaponMastery=mastery;const before=harnessFingerprint(state);for(const sword of
35558: installKaiBesilHarnessFixture();recordDmr2ShipRosterContract('saved_plan',harnessDmr2ShipRosterConfig225('buccaneer'));const saved=harnessClone(state),before=harnessFingerprint(saved.dmr2ShipRosterContracts[0].plan);save
35559: const entry=state.dmr2ShipRosterContracts[0];harnessAssert(state.dmr2ShipRosterContracts.length===1&&entry.id==='saved_plan'&&harnessFingerprint(entry.plan)===before&&state.rules.weaponDamageMode==='RAW','Save migration
35645: installKaiBesilHarnessFixture();state.combat=null;state.rules.weaponDamageMode=mode==='UNARMED'?'RAW':mode;state.rules.weaponMastery=false;constructDmr2WildernessEncounter(rollDmr2RuinsEncounter({tableRoll:37,countRoller
36125: harnessEqual([fresh.rules.weaponDamageMode,fresh.rules.weaponAudit,fresh.rules.initiativeMode,fresh.rules.gettingLostMode,fresh.rules.developerMode],['RAW',true,'PHASED','RAW',true],'Default options changed');
36159: const legacy={...initialState(),version:'0.3.60',party:harnessPartyFixture(),campaignCreated:true,rules:{weaponDamageMode:'MATRIX',weaponAudit:true,initiativeMode:'PHASED'}}; delete legacy.domain;
36679: installHarnessFixture({distance:0,type:'squid_giant',count:1});const pc=state.party[0],monster=state.combat.monsters[0];state.party=[pc];pc.hp=pc.maxHp=300;monster.thac0=1;const row=ensureMonsterAppendageState(monster);h
36688: installHarnessFixture({distance:0,type:'whipweed',count:1});const pc=state.party[0],monster=state.combat.monsters[0];state.party=[pc];pc.inventory=[{itemId:'sword_twohanded',name:'Two-Handed Sword',qty:1,enc:150}];pc.equ
36697: installHarnessFixture({distance:0,type:'strangle_vine',count:1});const pc=state.party[0],monster=state.combat.monsters[0];state.party=[pc];pc.hp=pc.maxHp=200;pc.inventory=[{itemId:'sword_normal',name:'Normal Sword',qty:1
37815: const legacy={version:'0.3.44',campaignId:'legacy-harness',mode:'wilderness',hex:{q:0,r:0},location:null,day:1,minutes:480,party:legacyParty,campaignCreated:true,knownPlaces:['obsolete_place'],knownSettlementPlaces:{old_
38200: installKaiBesilHarnessFixture(); state.rules.weaponDamageMode='RAW'; state.rules.weaponAudit=false;
38209: installKaiBesilHarnessFixture(); state.rules.weaponDamageMode='RAW'; state.rules.weaponAudit=false;
38218: const run=set=>{ installKaiBesilHarnessFixture(); state.rules.weaponDamageMode='RAW'; state.rules.weaponAudit=false; const fighter=normalizeMember({name:'Aldric',className:'Fighter',level:1,hp:8,maxHp:8,ac:7,thac0:1,abil
39184: state=initialState();state.rules.weaponMastery=true;state.rules.weaponDamageMode='RAW';const pc=normalizeMember({name:'Aldric',className:'Fighter',level:24,hp:30,maxHp:30,abilities:{str:18,int:10,wis:10,dex:10,con:16,cha
39834: harnessAssert(state.rules.weaponDamageMode==='RAW'&&state.rules.initiativeMode==='RAW'&&state.rules.gettingLostMode==='RAW'&&spellResolutionMode()==='RAW_STRICT','BECM RAW profile did not set all implemented RAW procedur
39836: applyRulesProfile('HOUSE');harnessAssert(state.rules.weaponDamageMode==='MATRIX'&&state.rules.initiativeMode==='PHASED'&&state.rules.gettingLostMode==='LOST_TIME'&&spellResolutionMode()==='RAW_STRICT','House procedure pr
40903: contextWeaponsButton.addEventListener('click',()=>setWeaponMode('CONTEXT_MATRIX'));

## Combat/damage function declarations (total 1219)

533: const weaponRuleState = document.getElementById('weaponRuleState');
534: const rawWeaponsButton = document.getElementById('rawWeaponsButton');
535: const contextWeaponsButton = document.getElementById('contextWeaponsButton');
545: const matrixWeaponsButton = document.getElementById('matrixWeaponsButton');
546: const auditWeaponsButton = document.getElementById('auditWeaponsButton');
551: const unarmedCombatButton = document.getElementById('unarmedCombatButton');
552: const weaponMasteryButton = document.getElementById('weaponMasteryButton');
559: const combatPanel = document.getElementById('combatPanel');
598: const combatMapButton = document.getElementById('combatMapButton');
630: const autoPartySize = document.getElementById('autoPartySize');
632: const autoPartyEquippedButton = document.getElementById('autoPartyEquippedButton');
1897: const ARTIFACT_HIT_DICE=40;
2583: function isLikelyCombatOrderInput(input){
2605: function looksLikeCompoundCombatInstruction(input){
3101: const damageMultiplier=Number(vessel.hullPoints)===0?0:Math.max(0.1,Math.floor(Math.max(0,Number(vessel.hullPercent)||0)/10)/10),shippingMultiplier=vessel.shippingWater?0.5:1,crewMultiplier=crew.fraction;
3580: const target=n.lostPath[n.lostPath.length-1], direction=directionBetween(state.hex.q,state.hex.r,target.q,target.r);
3869: function avengerMonsterHirelingRows(pc,{activeOnly=true}={}){
3873: function avengerMonsterHirelingCap(pc){return charismaProfile(Number(pc?.abilities?.cha)||10).maxRetainers;}
3874: function avengerMonsterAlignment(monster){
3878: function avengerMonsterHirelingSnapshot(monster){
3890: function endAvengerMonsterHireling(pc,row,reason='The temporary Avenger monster-hireling effect ended.'){
3895: function endAllAvengerMonsterHirelings(pc,reason){for(const row of avengerMonsterHirelingRows(pc))endAvengerMonsterHireling(pc,row,reason);}
3896: function persuadeAvengerMonsterHireling(pc,monster,{method='food'}={}){
3911: function avengerMonsterHirelingDangerSave(pc,query){
3915: function loseAvengerMonsterHireling(pc,query,reason='lost from service'){
5307: function mapMonsterToken(m){
5313: function normalizeMonsterGroupKey(value){
5317: function monsterGroupRecords(){
5323: function monsterGroupMembers(group,{presentOnly=true,combatCapableOnly=false}={}){
5336: function defineMonsterGroup(name,members,{role='melee',createdBy='referee',formation=true,sideId='foes',sideName=null}={}){
5340: const monsters=(Array.isArray(members)?members:[]).filter(m=>m&&state.combat.monsters.includes(m));
5369: function monsterInitiativeSideId(monster){
5377: function monsterSideMembers(sideId,{combatCapableOnly=true}={}){
5449: const monsters=livingHostiles().slice(); pools=[monsters.filter((_,i)=>i%2===0),monsters.filter((_,i)=>i%2===1)]; defenders=livingParty();
5459: const attackerCount=pools[0].length+pools[1].length,defenderCount=Math.max(1,defenders.length);
5477: function maybeMonsterSurround(){
5487: function combatSideRecords(){
5504: function monsterDefaultTacticalRole(monster){
5508: const weapon=SHOP_ITEMS?.[monster?.weaponId]||null;
5513: function pluralMonsterName(monsters){
5521: function ensureMonsterTacticalGroups(){
5556: function combatMapFormationSlices(){
5606: function compressedMeleeMonsterLabels(monsterIds){
5617: function combatDistanceUnit(){ return combatIsUnderwater()?'ft':state.combat?.distanceUnit==='yd'?'yd':'ft'; }
5618: function combatDistanceLabel(value){
5623: function combatElevationLabel(vector){
5626: function combatTokenForPc(pc,index){
5630: function combatBattlefieldNarrative(){
5648: function renderCombatAsciiMap(){
6075: const hit=aliases.find(a=>q===a || q.includes(a)); if(!hit) continue;
6117: function resolvePhysicalDoorTarget(step={},input=''){
6136: function rollSimpleDamage(expr){
6148: function destroyDoorTarget(door){
6215: function visiblePhysicalTargetEvidence(target){
6221: if(String(effect.type||'none')!=='mark_state' || !allowed.has(stateName)) return false; const target=String(step.target||ruling.target||'feature').slice(0,100); if(!visiblePhysicalTargetEvidence(target)) return false;
6239: const target=step.target||'feature'; if(!visiblePhysicalTargetEvidence(target)){ write(`I understand the intended manipulation, but “${target}” is not a currently established visible/known physical feature here. Clarify
6247: const taken=detachPartyItemForDeployment(itemId,step.actor||null); if(taken){ const targetKey=`local:${state.location}:${improvisedNorm(target).replace(/\s+/g,'_').slice(0,60)}`; const dep={id:`dep-${Date.now()}-${rng(99
6280: function rawCancellationRodHitItem(actor,targetRow,{targetAc=null}={}){
6284: const rows=rawCancellationMagicItemRows(query).filter(row=>row.item!==rawCancellationRodInventoryRow(actor)?.item);if(!rows.length){write(`No represented magical item uniquely matches “${String(query||'').trim()||'that t
6287: const text=`${step.item||step.tool||''} ${input||''}`.toLowerCase();if(!/(?:rod[ _-]+of[ _-]+cancellation|rod_of_cancellation)/.test(text))return null;const actor=actorForImprovised(step,input);if(!actor){write('No livin
6346: const damage=rng(2);
7546: const monster=state.combat?.monsters?.[0];if(!monster||monster.type!=='strangle_vine'||!setStrangleVineFootprint(monster,footprint,{announce:false})){state.combat=null;return {handled:true,ok:false,reason:'The represente
7748: function validateDmr2ShipNpcCombat(raw,className,level){
7785: let equipmentComplete=false;
7787: const equipment=raw.equipment;if(!dmr2ShipRosterObject(equipment))return fail('equipment must explicitly select weapon, armor and shield, using null for each absent selection.');
7803: const weapon=SHOP_ITEMS[data.equipment.weapon];if(data.equipment.shield&&(weapon?.twoHanded||data.equipment.weaponGrip==='two'))return fail('A readied two-handed weapon cannot share the ordinary shield hand; carried spar
7859: function setDmr2ShipNpcCombat(contractValue,npcValue,details){
7866: function developerDmr2ShipNpcCombat(match){const parsed=parseDmr2ShipRosterJson(match?.[3]);if(!parsed.ok){write(parsed.reason,'warning');return parsed;}const out=setDmr2ShipNpcCombat(match?.[1],match?.[2],parsed.config)
7871: const combat=npc.combat,data=combat.data||{},derived=combat.derived||{},list=(rows,format)=>rows?rows.map(format).join('; ')||'none':'unresolved';
7925: function validateDmr2ShipTroopWeapons(raw,percentages,allocation,{specified=raw!==undefined}={}){
7952: let readiedWeapon=null,ordinaryReadiedHands=Object.hasOwn(data,'readied')&&data.readied===null?0:null;
7958: const equipment={weapon:readiedId,armor:armorItemId,shield:null,...(readiedId==='sword_bastard'?{weaponGrip:data.swordGrip}:{})},inventory=[...carriedWeaponIds,armorItemId].map(itemId=>({itemId,qty:1}));
7967: function setDmr2ShipTroopWeapons(contractValue,payload){
7975: function developerDmr2ShipTroopWeapons(match){
7979: function dmr2ShipTroopWeaponSummary(plan){
8001: const target=targets.get(`${row.shipIndex}:${row.groupKey}`);if(!target)return fail(`Ordinary troop ${id}: unknown, unallocated or zero-count ship/group target; no assignment is inferred.`);
8066: const targets=roster.records.filter(row=>row.groupKey.endsWith('Crossbow')).map(row=>({id:row.id,shipIndex:row.shipIndex,groupKey:row.groupKey,crossbow:weapons.choices.find(choice=>choice.shipIndex===row.shipIndex&&choic
8111: const targetByKey=new Map(targets.map(row=>[`${row.npcId}:${row.crossbow}`,row]));
8349: const hitDice=Math.min(level,9),hitDieSize=CLASS_RULES[className].hd,constitutionAdjustment=abilityAdjustment(constitution),fixedLevels=Math.max(0,level-9),fixedHpPerLevel=FIXED_HP_AFTER_NINTH[className],fixedHp=fixedLev
8475: function validateDmr2ShipOperatorEquipment(raw,membership,profiles,inventories,traits,{specified=raw!==undefined}={}){
8485: const equipment=row.equipment;if(!dmr2ShipRosterObject(equipment))return fail('equipment must explicitly select weapon, armor and shield, using null for absent selections.');const bad=dmr2ShipRosterUnknownFields(equipmen
8500: const weapon=SHOP_ITEMS[data.equipment.weapon];if(data.equipment.shield&&(weapon?.twoHanded||data.equipment.weaponGrip==='two'))return fail('A readied two-hand weapon cannot share the ordinary shield hand; carried spare
8510: function setDmr2ShipOperatorEquipment(contractValue,payload){const id=dmr2ShipRosterId(contractValue),entry=(state.dmr2ShipRosterContracts||[]).find(row=>row.id===id);if(!entry)return {ok:false,reason:'Identify an existi
8511: function dmr2ShipOperatorEquipmentSummary(plan,{individuals=false}={}){const s=plan.shipOperatorEquipment;return `New operator readied equipment: ${s.configuredOperatorCount}/${s.expectedOperatorCount??'unresolved'} decl
8512: function developerDmr2ShipOperatorEquipment(match){const parsed=parseDmr2ShipRosterJson(match?.[2]);if(!parsed.ok){write(parsed.reason,'warning');return parsed;}const out=setDmr2ShipOperatorEquipment(match?.[1],parsed.co
8513: function developerDmr2ShipOperatorEquipmentStatus(match){const id=dmr2ShipRosterId(match?.[1]),entry=(state.dmr2ShipRosterContracts||[]).find(row=>row.id===id);if(!entry){const out={ok:false,reason:'Identify an existing
8531: if(!ownershipResolved)missing.push('inventory');const complete=missing.length===0,bonus=itemId=>data.magicItems?.find(item=>item.itemId===itemId)?.magicBonus||0;let equipmentArmorClass=null,readiedWeaponMagicBonus=null,a
9413: function validateDmr2ShipAddedCatapultTargetRanges(raw,catapults,{specified=raw!==undefined}={}){
9431: function setDmr2ShipAddedCatapultTargetRanges(contractValue,payload){const id=dmr2ShipRosterId(contractValue),entry=(state.dmr2ShipRosterContracts||[]).find(row=>row.id===id);if(!entry)return {ok:false,reason:'Identify a
9432: function dmr2ShipAddedCatapultTargetRangesSummary(plan,{individuals=false}={}){
9435: function developerDmr2ShipAddedCatapultTargetRanges(match){const parsed=parseDmr2ShipRosterJson(match?.[2]);if(!parsed.ok){write(parsed.reason,'warning');return parsed;}const out=setDmr2ShipAddedCatapultTargetRanges(matc
9436: function developerDmr2ShipAddedCatapultTargetRangesStatus(match){const id=dmr2ShipRosterId(match?.[1]),entry=(state.dmr2ShipRosterContracts||[]).find(row=>row.id===id);if(!entry){const out={ok:false,reason:'Identify an e
9491: const troopWeaponChoices=validateDmr2ShipTroopWeapons(config.troopWeapons,troopPercentages,shipTroopAllocations,{specified:Object.hasOwn(config,'troopWeapons')});if(!troopWeaponChoices.ok)return fail(troopWeaponChoices.r
9499: const combat=validateDmr2ShipNpcCombat(Object.hasOwn(raw,'combat')?raw.combat:undefined,className,level);if(!combat.ok)return {error:`NPC ${id}: ${combat.reason}`};
9539: const npcCombatDetails=dmr2ShipNpcDetailStatus(leadershipRecords,specialistDecisions);
9549: const shipOperatorEquipment=validateDmr2ShipOperatorEquipment(config.operatorEquipment,shipOperatorMembership,shipOperatorProfiles,shipOperatorInventories,shipOperatorTraits,{specified:Object.hasOwn(config,'operatorEquip
9592: const shipAddedCatapultTargetRangesDetails=validateDmr2ShipAddedCatapultTargetRanges(config.shipAddedCatapultTargetRanges,shipAddedCatapultDetails,{specified:Object.hasOwn(config,'shipAddedCatapultTargetRanges')});if(!sh
9760: function damageDmr2GrabGrassSquare(hazardOrId,squareIndex,damage,{announce=true,source='already-adjudicated damage'}={}){
9770: function developerDmr2GrabGrassDamage(match){const square=Number(match?.[1]),damage=Number(match?.[2]),hazardId=String(match?.[3]||'').trim()||null,result=damageDmr2GrabGrassSquare(hazardId||dmr2GrabGrassHazard(),square,
9862: function resolveDmr2GhostlySoldierHit(pcOrName,{battlefieldId=null,recoveryTurns=null,announce=true,source='referee-adjudicated ghostly soldier hit'}={}){
9868: const hit={saveType:'wands',...save,source,atAbsoluteMinute:absoluteCampaignMinute(),hpDamage:0};
9877: function resolveDmr2GhostlySoldierStrike(pcOrName,{battlefieldId=null,announce=true}={}){
9881: const attack=attackRoll(soldier,pc,'melee');
9886: function damageDmr2GhostlySoldier(pcOrName,amount,{battlefieldId=null,announce=true,source='referee-adjudicated personal attack damage'}={}){
9890: const damage=Number(amount);if(!Number.isInteger(damage)||damage<1)return {ok:false,reason:'Apply a positive integer of already-adjudicated damage from this character to their own soldier.'};
9900: function attackDmr2GhostlySoldier(pcOrName,{battlefieldId=null,announce=true}={}){
9909: else {const attack=paralysisAwareAttackRoll(pc,soldier,'melee');if(announce)write(`${pc.name} attacks their ghostly soldier unarmed: ${attack.hit?'HIT':'miss'}.`,'system');if(attack.hit){const damage=Math.max(0,1+ability
9947: function developerDmr2GhostlyHordeDamage(match){
9986: function equippedOrdinaryShieldRecord(pc){
9991: function giantSnailShellShieldEquipped(pc){return equippedOrdinaryShieldRecord(pc)?.itemId==='giant_snail_shell_shield';}
10156: function prepareKaiMonsterEncounter(entry,count){
10211: function attackPendingEncounter(){
10568: if(expr){ const damage=rollDamageExpression(expr).total; damagePc(thief,damage,`${trap.label||'trap'} triggered during removal`); write(`${thief.name}'s failed removal triggers the ${trap.label||'trap'} for ${damage} dam
10600: const targetText=String(text||'').replace(/^.*?pick(?:s)? (?:the )?pockets? (?:of )?/i,'').trim(),npc=resolveSceneNpc(targetText);
10735: const monsters=[]; for(let i=1;i<=15;i++) monsters.push(createCombatMonster('pirate',i)); monsters.push(createCombatMonster('captain_harshaw',1));
10804: const targetLoc=SITE_LOCATIONS[siteId];
10827: const target = SITE_LOCATIONS[siteId];
11189: const DEMIHUMAN_ATTACK_RANK_THRESHOLDS=Object.freeze({
11194: const DEMIHUMAN_ATTACK_RANK_ORDER='ABCDEFGHIJKLM';
11195: function demihumanAttackRank(member){
11201: function nextDemihumanAttackRank(member){const rows=DEMIHUMAN_ATTACK_RANK_THRESHOLDS[member?.className]||[],xp=Math.max(0,Number(member?.xp)||0);return rows.find(([,threshold])=>threshold>xp)||null;}
11202: function demihumanAttackThac0(member){
11206: function demihumanCombatOptionProfile(member){
11213: function demihumanDamageAfterResistance(member,rolledDamage,{kind='ordinary',saveSucceeded=false}={}){
11548: function characterMatrixSize(className){ return className==='Halfling' ? 'small' : 'medium'; }
11567: const weapon = member.equippedWeapon?.name ? `${member.equippedWeapon.name}${member.equippedWeapon.itemId==='sword_bastard'?` (${String(member.equippedWeapon.grip||'one').startsWith('two')?'two-handed':'one-handed'})`:''
11623: function setWeaponMode(mode) {
11638: function toggleWeaponAudit() {
11645: function weaponQueryTokens(value) {
11649: function findMatrixWeapons(query) {
11658: function weaponInfo(query) {
11672: function matrixWeaponMentions(input) {
11685: function explainWeaponMatrix(queryOrInput,{natural=false}={}) {
11723: function matrixDamage(query,size,protection,range,magicBonus=0) {
11856: function giantSnailShellShieldEquipmentStatus(pc){
11895: function equipWeaponRecord(pc,itemId,{offhand=false}={}){
11924: function equipCommand(text) {
11964: const MODULE_COMBAT_MONSTERS = {
12351: const MONSTER_LORE_FIELDS = ["monsterId","name","primarySource","page","secondarySource","secondarySourcePage","armorClass","hitDice","rcSizeCode","movementGround","movementFlyingAir","movementWater","movementBurrowing",
12353: const MONSTER_LORE_RECORDS = MONSTER_LORE_ROWS.map(row=>Object.fromEntries(MONSTER_LORE_FIELDS.map((field,index)=>[field,row[index]])));
12354: const MONSTER_LORE_BY_ID = Object.fromEntries(MONSTER_LORE_RECORDS.map(record=>[record.monsterId,record]));
12356: function normalizeMonsterLoreText(value){
12360: function monsterLoreNameKeys(value){
12365: const MONSTER_LORE_BY_NAME = (()=>{
12374: function monsterLoreForName(value){
12385: function monsterLoreForSubject(subject){
12391: function monsterLoreMatches(query){
12397: function clipMonsterLore(value,max=1400){
12408: function canonicalMonsterKey(name){
12452: function monsterSaveTarget(monster,type){
12466: function classicDamageExpression(minimum,maximum){
12482: function safeDamage(value){
12489: function canonicalAttacks(record){
12490: const rawAttacks=String(record.attacks||'attack').split(/;|\bor\b/i)[0];
12491: const rawDamage=String(record.damage||'').split(/;|\bor\b/i)[0];
12501: const target=normalizeMonsterLoreText(record.name).split(' ').sort().join(' ');
12504: function monsterAutomationReadiness(profile){
12509: const attacks=Array.isArray(profile.attacks)?profile.attacks:[];
12536: const protection=/hard/i.test(String(record.protection||''))?'hard':'soft',role=String(record.flexAiRole||'soldier').toLowerCase().replace(/[^a-z-]+/g,'_');
12546: function resolveMonsterProfileForSpawn(profile,spawnOptions={}){
12566: const MONSTER_CATALOG_INDEX_ROWS = MONSTER_LORE_RECORDS.map(record=>[record.monsterId,canonicalMonsterKey(record.name),record.name,record.primarySource,record.page,'base',true,null,'Authoritative workbook record','Low',n
12567: const MONSTER_CATALOG_INDEX = Object.fromEntries(MONSTER_CATALOG_INDEX_ROWS.map(row=>{const [recordId,key,name,source,sourcePage,profileType,spawnable,parentAliasOf,verificationStatus,reviewPriority,reviewReasons,auditSt
12568: const MONSTER_CATALOG_BY_KEY = Object.fromEntries(Object.values(MONSTER_CATALOG_INDEX).map(record=>[record.key,record]));
12569: const CATALOG_COMBAT_MONSTERS = Object.fromEntries(MONSTER_LORE_RECORDS.map(record=>{const profile=canonicalProfile(record);return [profile.key,profile];}));
12579: const RC_MONSTER_XP_BY_HD=Object.freeze({
12582: function becmiMonsterXpByHdStars(hd,stars=0){const row=RC_MONSTER_XP_BY_HD[Math.max(1,Math.floor(Number(hd)||0))];return row?row[0]+Math.max(0,Math.floor(Number(stars)||0))*row[1]:0;}
13148: function createHuptzeenCombatant(index,config){return createCombatMonster('huptzeen',index,{huptzeen:config||{}});}
13220: function createOardCombatant(index,config){return createCombatMonster('oard',index,{oard:config||{}});}
13299: function createPossessionCombatant(index,config){return createCombatMonster('possession',index,{possession:config||{}});}
13425: function createReflecterCombatant(index,hitDice){return createCombatMonster('reflecter',index,{reflecter:{hitDice}});}

## Damage formula, hit application (total 198)

2158: sword_c1:{name:'Sword',type:'transform',cost:70,mechanic:'artifact_sword',rangeFeet:30,durationRounds:40,damageExpression:'1d10',attacksPerRound:2,targetMode:'self',sourceCategory:'C1'},
2941: const className=classes[rng(classes.length)-1],abilities={}; for(const key of ABILITIES) abilities[key]=rollDice(3,6).total;
4976: const victim=candidates[rng(candidates.length)-1],expr=trap.effect?.damageDice||trap.damageDice||'1d4',damage=rollDamageExpression(expr).total;
10568: if(expr){ const damage=rollDamageExpression(expr).total; damagePc(thief,damage,`${trap.label||'trap'} triggered during removal`); write(`${thief.name}'s failed removal triggers the ${trap.label||'trap'} for ${damage} dam
10590: if(roll>chance){ const climbed=Math.min(feet,(segment-1)*100+50),units=Math.max(1,Math.floor(climbed/10)),damage=climbed<=10?1:rollDice(units,6).total; damagePc(thief,damage,'fall while climbing'); write(`${thief.name} s
11392: const hpRoll=afterNinth?null:rollDice(1,hd);
12272: water_weird:{specialAttack:'water_weird_seize',attacks:[{name:'seize',damage:'1',waterWeirdSeize:true}],waterWeirdTraits:{manifestRounds:2,baseHd:3,baseAc:5,baseDamage:1,baseRangeFt:10,saveType:'paralysis',dexterityBonus
15126: voulge:{damage:'poleaxe',defense:'poleaxe',deflect:'halberd',special:'poleaxe',doubleDamage:true,damageBonus:2}
15138: return masteryAddFlatDamage(result,profile?.damageBonus||0);
15531: const maxExpr=(['MATRIX','AAE'].includes(dmg?.active)?dmg?.matrixExpr:dmg?.rawExpr)||null,maxDamage=masteryMaximumDamageExpression(maxExpr),maximum=Boolean(maxExpr&&Number(dmg?.appliedBase)===maxDamage);
15770: return {...damage,raw:doubled(damage.raw,damage.rawBase),matrix:doubled(damage.matrix,damage.matrixBase),applied:doubled(damage.applied,damage.appliedBase),masteryDoubleDamage:true};
16265: function rollDamageExpression(expression, roller=rng){
16292: if(dice)return Math.max(1,rollDamageExpression(dice[0]).total);
16293: return Math.max(1,rollDamageExpression(source).total);
16818: if(fall&&height>0&&!combatantCanChangeElevation(pc)){const dice=Math.floor(height/10);setCombatPcVector(pc,{...at,z:0});if(dice>0){const roll=rollDice(dice,6);if(announce)write(`${pc.name} is released ${Math.floor(height
16847: if(rule.tailDelay){const delay=rollDamageExpression(rule.tailDelay).total;row.tailDelayRounds=delay;row.tailAvailableRound=row.emergedRound+delay;}
16875: if(rule.subtype==='vision'&&rule.materializeDelay){const delay=rollDamageExpression(rule.materializeDelay).total;monster.phantomState.wailStartedRound=Number(state.combat?.round)||1;monster.phantomState.materializeDelayR
16909: if(!Number.isFinite(Number(row.soulCount))){row.soulCount=Math.max(2,Math.min(8,rollDamageExpression(rule.soulCount||'2d4').total));}
16912: if(!Number.isFinite(Number(row.materializeDelayRounds))&&rule.materializeDelay){row.materializeDelayRounds=Math.max(1,rollDamageExpression(rule.materializeDelay).total);row.materializeRound=row.wailStartedRound+row.mater
16923: function applyPhantomVisionSorrow(monster,pc,{announce=true}={}){const rule=phantomVisionRule(monster);if(!rule||!pc)return null;const duration=Math.max(11,Math.min(20,rollDamageExpression(rule.sorrowDuration||'1d10+10')
16931: function schedulePhantomVisionTurnReturn(monster,{announce=true}={}){const rule=phantomVisionRule(monster),row=phantomVisionState(monster,{create:true});if(!rule||!row||monster.dead)return null;const hours=Math.max(1,Mat
16932: function processPhantomVisionReturnClock(beforeAbsolute,afterAbsolute){const returned=[];const combat=state.combat;if(!combat?.monsters)return returned;for(const monster of combat.monsters){const row=phantomVisionState(m
17017: const clericSave=pcSave(cleric,rule.reflectedTurnSaveType||'spells',0,`reflected Turning from ${monster.name}`);let paralysisRounds=0;if(!clericSave.success){paralysisRounds=rollDamageExpression(rule.reflectedTurnParalys
17061: if(!Number.isFinite(Number(row.materializeRound))){const delay=rollDamageExpression(rule.materializeDelay||'1d3').total;row.wailStartedRound=round;row.materializeDelayRounds=delay;row.materializeRound=round+delay;}
17506: rawRoll=rollDamageExpression(expr.raw,rollerSubject?(sides=>artifactLuckyRoll(rollerSubject,sides,'weapon damage roll')):rng); const seedAfter=state.seed>>>0;
17507: matrixRoll=rollDamageExpression(expr.matrix,shadowRngFactory(seedBefore)); state.seed=seedAfter; activeRoll=rawRoll;
17509: matrixRoll=rollDamageExpression(expr.matrix,rollerSubject?(sides=>artifactLuckyRoll(rollerSubject,sides,'weapon damage roll')):rng); const seedAfter=state.seed>>>0;
17510: rawRoll=rollDamageExpression(expr.raw,shadowRngFactory(seedBefore)); state.seed=seedAfter; activeRoll=matrixRoll;
17513: return {active,rawBase:rawRoll.total,matrixBase:matrixRoll.total,appliedBase:activeRoll.total,rawExpr:expr.raw,matrixExpr:expr.matrix,raw:adjusted(rawRoll.total),matrix:adjusted(matrixRoll.total),applied:adjusted(activeR
17626: function trollDamageMethod(source='',context={}){
17637: const rule=monsterRegenerationRule(monster);if(!rule||!actualDamage)return null;const row=trollRegenerationState(monster),method=trollDamageMethod(source,context),round=Number(state.combat?.round)||1;
17707: const rule=lavaOozeRule(monster);if(!rule||!pc||pc.dead||pc.hp<=0)return null;const rolled=rollDamageExpression(rule.coatingDuration||'1d4'),add=Math.max(1,Number(rolled.total)||1),round=Number(state.combat?.round)||1;le
17714: if(!combatActive())return;const round=Number(state.combat?.round)||1;for(const pc of state.party||[]){const row=activeLavaOozeCoating(pc);if(!row||pc.dead||pc.hp<=0)continue;if(Number(row.lastDamageRound)===round)continu
17858: function resolveOardRayGlove(monster,target,{announce=true,refereeRangeApproved=false}={}){if(!oardHasDevice(monster,'ray_glove'))return {ok:false,reason:'This Oard has no Ray Glove.'};if(!target||target.dead||Number(tar
17860: function resolveOardBlasterTube(monster,target,{shots=2,announce=true}={}){if(!oardHasDevice(monster,'blaster_tube'))return {ok:false,reason:'This Oard has no Blaster Tube.'};if(!combatActive()||!target)return {ok:false,
17861: function resolveOardFireballGem(monster,target,{announce=true}={}){if(!oardHasDevice(monster,'fireball_gem'))return {ok:false,reason:'This Oard has no Fireball Gem.'};const row=ensureOardState(monster);if(Number(row.fire
17913: function resolvePossessionHostedAttack(monster,target,{announce=true}={}){const row=ensurePossessionState(monster,{create:false});if(!row||row.phase!=='hosted'||!row.host)return {ok:false,reason:'The Possession is not in
17936: for(const ext of row.extensions){const target=sacrolExtensionTarget(monster,ext);if(!target)continue;if(Number(ext.attachedRound)===round||Number(ext.lastChokeRound)===round)continue;const roll=rollDamageExpression(Strin
17946: ext.targetName=target.name;ext.attachedRound=round;ext.lastChokeRound=round;const chokeRoll=rollDamageExpression(String(rule.choke?.damage||'2d4')),chokeDamage=Math.max(0,Number(chokeRoll.total)||0);event.chokeDamage=cho
18020: const rule=monsterReflecterRule(monster)?.shell,row=ensureReflecterState(monster);if(!rule||!row)return null;if(row.shell)return row.shell;const roll=rollDamageExpression(String(rule.postDeathDamage||'5d10')),required=Ma
18096: const n=rounds==null?rollDice(2,4).total:Math.max(2,Math.min(8,Math.floor(Number(rounds)||2))),round=Number(state.combat?.round)||1,order=lockedOrder&&typeof lockedOrder==='object'?JSON.parse(JSON.stringify(lockedOrder))
18116: let insanity=null;if(after<=0&&!pc.vapourGhoulInsanity){const days=insanityDays==null?rollDice(2,10).total:Math.max(2,Math.min(20,Math.floor(Number(insanityDays)||2)));pc.vapourGhoulInsanity={active:true,durationDays:day
18155: const result=attackRoll(monster,pc,'melee');if(announce)write(`${monster.name} attacks ${pc.name} with its sharp tongue: ${result.automaticHit?'automatic hit':`d20 ${result.d20}${result.mod?` ${result.mod>0?'+':'-'} ${Ma
18433: const rawBase=minimumDamageExpression(rawExpr),matrixBase=minimumDamageExpression(expr.matrix),active=state.rules.weaponDamageMode||'RAW',appliedBase=(active==='RAW'||active==='CONTEXT_MATRIX')?rawBase:matrixBase;let dmg
18971: const duration=String(rule.duration||'2d4'),unit=String(rule.durationUnit||'turns').toLowerCase(),amount=Math.max(1,rollDamageExpression(duration).total),now=absoluteCampaignMinute(),round=Number(state.combat?.round)||1;
19112: const count=Math.max(1,Number(rule.pseudopodCount)||6),damageExpr=String(rule.damage||'3d6');
19115: if(!sticky.hit)return true;const damage=rollDamageExpression(damageExpr).total;damagePc(target,damage,`${monster.name}'s sticky pseudopod`,{kind:'natural',attackKind:'melee'});if(target.dead)return true;
19119: const dryCount=Math.max(0,count-1);for(let i=0;i<dryCount&&!victim.dead;i++){const hit=paralysisAwareAttackRoll(monster,victim,'melee');write(`${monster.name} strikes ${victim.name} with dry pseudopod ${i+1} — ${hit.hit?
19143: const parts=activeMonsterAppendages(monster);if(!parts.length){if(combatSeparation(pc,monster)>0){write(`${monster.name} has lost all tentacles but is not yet in biting distance of ${pc.name}.`,'warning');return true;}co
19150: const count=Math.max(1,rollDamageExpression(String(rule.tentaclesPerTarget||'1d4')).total);write(`${monster.name} brings ${count} tentacle${count===1?'':'s'} to bear on ${pc.name}.`,'system');
19151: for(let i=0;i<count&&!pc.dead;i++){const bonus=pc.paralyzed?Number(rule.attackBonusVsParalyzed)||4:0,result=attackRoll(monster,pc,'melee',bonus,{ignoreParalysisAutomaticHit:true});write(`${monster.name} tentacle ${i+1}/$
19157: if(melee){const result=paralysisAwareAttackRoll(monster,pc,'melee');write(`${monster.name} bites ${pc.name} — ${result.hit?'HIT':'miss'}.`,'system');if(result.hit){const damage=rollDamageExpression('1d10').total;damagePc
19190: const damage=Math.max(0,rollDamageExpression(String(row.ongoingDamage||rule.ongoingDamage||'0')).total);write(`${monster.name} remains attached to ${pc.name}; ${row.ongoingLabel||'continuous damage'} inflicts ${damage} a
19266: const damage=rollDamageExpression(hold.damage||'0').total;damagePc(pc,damage,`${monster.name}'s internal digestion`,{kind:'natural',attackKind:'automatic'});out.push({pc:pc.name,monster:monster.name,damage});
19285: if(typeof rule.partHp==='string'&&/^\d*d\d+(?:[+-]\d+)?$/i.test(rule.partHp.trim())){hp=maxHp=rollDamageExpression(rule.partHp).total;}else if(Number.isFinite(Number(rule.partHp))){hp=maxHp=Number(rule.partHp);}
19321: if(part.kind==='stalk'&&monster.specialAttack==='whipweed_stalks'&&!monster.whipweedBaseDestroyed){const days=rollDamageExpression(rule.regrowDays||'1d4+1').total;part.regrowDays=days;part.regrowsAtAbsoluteMinute=absolut
19330: for(const monster of state.combat?.monsters||[]){for(const part of monster?.appendageState?.parts||[]){const due=Number(part.regrowsAtAbsoluteMinute);if(part.kind==='strand'&&part.severed&&Number.isFinite(due)&&afterAbso
19363: for(const part of stateRow.parts){const victim=heldPcForAppendage(monster,part);if(!victim)continue;if(victim.dead){clearPcMonsterHold(victim,{reason:'victim no longer active'});continue;}const hold=victim.grabbedBy;if(r
19369: const mouthTarget=livingParty().find(pc=>combatSeparation(pc,monster)<=0&&(pc.grabbedBy?.monsterId===monster.id||pc===primaryPc));if(mouthTarget){const bite=attackRoll(monster,mouthTarget,'melee');write(`${monster.name}
19374: if(!vessel||!parts.length)return {hullLoss:0,crushed:false};let totalLoss=0,rolls=[];for(const part of parts){const raw=rollDamageExpression('7d6').total,loss=Math.floor(raw/2);rolls.push({part:part.index,raw,hullLoss:lo
19381: const mouthTarget=livingParty().find(pc=>pc.grabbedBy?.monsterId===monster.id&&pc.grabbedBy?.atMouth);if(mouthTarget){const bite=attackRoll(monster,mouthTarget,'melee');write(`${monster.name} bites ${mouthTarget.name} at
19382: const targets=monsterAppendageTargets(monster,rule.reachFt||750),assigned=new Set();for(const part of stateRow.parts.filter(p=>!p.severed&&!p.holdingPcName&&p.role!=='ship')){const target=targets.find(pc=>!assigned.has(p
19394: function applyGiantSquidShipAttack(monster,vessel){const rule=giantSquidRule(monster),row=ensureMonsterAppendageState(monster);if(!rule||!row||!vessel?.seaworthy||Number(vessel.hullPoints)<=0)return false;const greaters=
19395: function processGiantSquidConstriction(monster){const rule=giantSquidRule(monster),row=ensureMonsterAppendageState(monster);if(!rule||!row)return [];const out=[];for(const part of row.parts){const victim=heldPcForAppenda
19396: function resolveGiantSquidAttack(monster,primaryPc){const rule=giantSquidRule(monster),row=ensureMonsterAppendageState(monster),round=Number(state.combat?.round)||1;if(!rule||!row)return false;if(monster.giantSquidResolv
19405: function processWhipweedEntanglementsAtRoundStart(){if(!combatActive())return [];const round=Number(state.combat?.round)||1,out=[];for(const monster of state.combat.monsters||[]){const rule=whipweedRule(monster),row=mons
19408: function resolveWhipweedFrenzy(monster,primaryPc){const rule=whipweedRule(monster),row=ensureMonsterAppendageState(monster);if(!rule||!row||!monster.whipweedFrenzyPending)return false;const targets=livingParty().filter(p
19409: function resolveWhipweedAttack(monster,primaryPc){const rule=whipweedRule(monster),row=ensureMonsterAppendageState(monster),round=Number(state.combat?.round)||1;if(!rule||!row)return false;if(monster.whipweedFrenzyPendin
19435: function processStrangleVineEntanglementsAtRoundStart(){if(!combatActive())return [];const round=Number(state.combat?.round)||1,out=[];for(const monster of state.combat.monsters||[]){const rule=strangleVineRule(monster),
19473: const victimDice=rollDamageExpression(rule.opposedDice||'4d6').total,weedDice=rollDamageExpression(rule.opposedDice||'4d6').total,base=Math.max(0,Number(rule.baseAdd)||4),strMod=abilityAdjustment(Number(pc.abilities?.str
19491: if(artifactProtectionPrevents(pc,'poison',{source:`${monster.name}'s poisonous skin/bite`,announce:true}))return {immune:true};const save=pcSave(pc,'poison',0,`${monster.name} poison`);if(save.success){write(`${pc.name}
19500: const bite=attackRoll(monster,pc,'melee',2),attackName='bite';write(`${monster.name} bites the trapped ${pc.name} with +2 to hit — ${bite.hit?'HIT':'miss'}.`,'system');if(!bite.hit)return true;const damage=rollDamageExpr
19503: if(separation<=0){const bite=attackRoll(monster,pc,'melee');write(`${monster.name} bites ${pc.name} — ${bite.hit?'HIT':'miss'}.`,'system');if(!bite.hit)return true;const damage=rollDamageExpression('1d4').total;damagePc(
19542: for(const part of row.parts||[]){if(part.kind!=='trunk'||part.severed||!part.holdingPcName)continue;const pc=findPc(part.holdingPcName);if(!pc||pc.dead||pc.hp<=0)continue;if(round<=Number(part.grabbedRound||0))continue;i
19547: for(const part of free){const target=targets.find(pc=>!assigned.has(pc.name.toLowerCase()));if(!target)break;assigned.add(target.name.toLowerCase());const hit=attackRoll(monster,target,'melee'),rec={partId:part.id,partIn
19551: const rule=levellerRule(monster);if(!rule)return [];let targets=orderedLevellerTargets(monster,primaryPc),rolls=[];for(let i=1;i<=Math.max(1,Number(rule.tuskCount)||2);i++){let target=targets.find(pc=>!pc.dead&&pc.hp>0);
19562: const rule=levellerRule(monster);if(!rule)return null;const target=orderedLevellerTargets(monster,primaryPc)[0];if(!target)return {ok:false,reason:'no hand-to-hand target for the Leveller stomp'};const hit=attackRoll(mon
19914: function applyHomunculusAbilityDrain(monster,pc,rule,{announce=true,attackName='bite'}={}){if(!rule||!pc||pc.dead)return {ok:false};if(artifactProtectionPrevents(pc,'poison',{source:`${monster.name}'s ${attackName}`,anno
19971: const query=String(order?.targetQuery||order?.targetSelection||order?.target||'').trim(),target=findPc(query);if(!target||target.dead)return {ok:false,reason:'Magic Missile requires an explicit living represented PC targ
19974: if(!combatActive())return {ok:false,reason:'Sleep requires represented combat.'};const pool=araneaExplicitPcTargets(order);if(!pool.length)return {ok:false,reason:'Sleep requires an explicit represented PC target list; t
20088: const rule=monsterFaedorneMagicRule(monster),row=ensureFaedorneMagicState(monster);if(!monsterStillPresent(monster)||!rule||!row)return {ok:false,reason:'No active represented Faedorne is available.'};const orders=String
20206: if(!combatActive())return [];const resolved=[];for(const monster of state.combat?.monsters||[]){const row=ensureHephaestonState(monster,{create:false});if(!row?.pendingThrows?.length)continue;const due=row.pendingThrows.
20215: const rule=monsterHephaestonRule(monster)?.heatObject;if(!rule||!heated||Number(heated.remainingRounds)<=0)return {ok:false,reason:'No active heated iron/steel object matches.'};const names=String(targetText||'').split(/
20242: const hit=paralysisAwareAttackRoll(monster,pc,'melee');if(announce)write(`${monster.name} stretches its limbs toward ${pc.name} — ${hit.hit?'HIT':'miss'}.`);if(!hit.hit)return {ok:true,hit,attached:false};rawTriggerAttac
20244: function processMagenCaldronAcid(monster){const held=magenCaldronAttachment(monster);if(!held)return null;const round=Number(state.combat?.round)||1;if(Number(held.record.lastAcidRound)===round)return null;const damage=r
20251: const dir=normalizedDirectionVector({x:b.x-a.x,y:b.y-a.y,z:b.z-a.z}),end={x:a.x+dir.x*length,y:a.y+dir.y*length,z:a.z+dir.z*length},segments=[{start:a,end,lengthFt:length}],subjects=combatSubjectsAlongSegments(segments,N
20252: for(const rec of subjects){const save=rawSpellSubjectSave(rec.subject,rule.saveType||'dragon',0,`${monster.name} Galvan lightning`),dealt=save.success&&rule.saveHalf?Math.floor(damageRoll.total/2):damageRoll.total;outcom
20253: if(announce)write(`${monster.name} discharges a ${length}-foot × ${Number(rule.widthFt)||5}-foot lightning bolt for ${damageRoll.total} damage before saves. ${outcomes.map(x=>`${x.subject.name}: ${x.damage}${x.save.succe
20303: function resolveVelyaSummon(monster,distanceFt,{closeBy=false,announce=true}={}){const rule=velyaSummonRule(monster),row=ensureVelyaState(monster);if(!rule||!row)return {ok:false,reason:'No represented Velya summon profi
20322: function processVelyaClock(beforeAbsolute,afterAbsolute){const monsters=(state.combat?.monsters||[]).filter(isVelyaMonster);for(const monster of monsters){const rule=monsterVelyaRule(monster),row=ensureVelyaState(monster
20377: const extension=Math.max(1,rollDamageExpression(venom.successfulSave?.furtherBiteExtension||'2d6').total);existing.remainingRounds=Math.max(0,Number(existing.remainingRounds)||0)+extension;existing.lastExtendedRound=Numb
20385: const duration=Math.max(1,rollDamageExpression(venom.successfulSave?.duration||'2d6').total),oldStr=Number(pc.abilities?.str)||0,oldDex=Number(pc.abilities?.dex)||0,newStr=Math.max(0,oldStr-2),newDex=Math.max(0,oldDex-2)
20390: if(Number(row.lastDamageRound)===round)continue;row.lastDamageRound=round;const packet=Math.max(1,rollDamageExpression(row.damagePerRound||'1d8').total),before=Math.max(0,Number(pc.hp)||0);damagePc(pc,packet,'White-Fang
20432: function buildWoodImpTribeMonsters(baseCount,{lair=false}={}){baseCount=Math.max(1,Math.min(40,Math.floor(Number(baseCount)||1)));const rule=COMBAT_MONSTERS.wood_imp?.woodImpTraits||BASE_IMPLEMENTATION_HINTS.wood_imp?.wo
20458: function applyWoodSpiderSluggish(pc,{duration=null,source='Huge Wood Spider venom',announce=true}={}){const rolled=duration==null?rollDamageExpression('2d4+2').total:Math.max(1,Math.floor(Number(duration)||1)),current=wo
20459: function applyHugeWoodSpiderVenom(attacker,pc,{announce=true}={}){const rule=(isWoodImpMonster(attacker)?monsterWoodImpRule(attacker)?.venomArrow:monsterHugeWoodSpiderRule(attacker)?.venom)||{};if(artifactProtectionPreve
20463: function resolveWoodImpMissile(monster,pc,{announce=true}={}){const rule=monsterWoodImpRule(monster),row=ensureWoodImpState(monster);if(!rule||!row||!pc||pc.dead)return {ok:false};if(combatActive()&&engagementsForMonster
20464: function resolveHugeWoodSpiderBite(spider,pc,{fromMountedWoodImp=false,announce=true}={}){const rule=monsterHugeWoodSpiderRule(spider),row=ensureHugeWoodSpiderState(spider);if(!rule||!row||!pc||pc.dead)return {ok:false};
20465: function resolveWoodImpMelee(monster,pc,{announce=true}={}){const rule=monsterWoodImpRule(monster),row=ensureWoodImpState(monster);if(!rule||!row||!pc||pc.dead)return {ok:false};const round=Math.max(1,Number(state.combat
20484: function waterWeirdDamagePerRound(monster){const rule=waterWeirdRule(monster),steps=waterWeirdScaleSteps(monster);return Math.max(1,Number(rule?.baseDamage)||1)+steps*Math.max(0,Number(rule?.larger?.damageBonusPerStep)||
20526: function scaleWaterWeird(monster,steps,{announce=true}={}){const rule=waterWeirdRule(monster),row=ensureWaterWeirdState(monster);steps=Math.max(0,Math.floor(Number(steps)||0));if(!rule||!row)return {ok:false,reason:'No W
20550: const rolled=rollDamageExpression(String(bolt.damage||'1d10')),saveProfile=wychglowBoltSaveProfile(pc,monster),save=pcSave(pc,String(bolt.saveType||'wands'),saveProfile.modifier,`${monster.name} electrical bolt`),multipl
20593: const missiles=rawMagicMissileCount(Math.max(1,Number(caster?.level)||1)),damages=[];for(let i=0;i<missiles;i++){const base=rollDamageExpression('1d6+1'),dmg=base.total;damages.push(dmg);wychlampReflectDamageAtCaster(mon
20598: const dice=rawSpellDamageDiceCount(caster,profile),roll=rollDice(dice,profile.die||6),save=profile.saveHalf?((state.party||[]).includes(target)?pcSave(target,'spells',0,`${spell} reflected by Wychlamp`):monsterSavingThro
20617: function resolveWychlampContact(monster,pc,{announce=true,contactRoll=null}={}){const rule=monsterWychlampRule(monster)?.discharge;if(!rule||!monsterStillPresent(monster)||!pc||pc.dead||Number(pc.hp)<=0)return {ok:false}
20634: const count=Math.max(1,Number(sphere.countPerRound)||Number(sphere.createsPerRound)||2),elf=wyrdTargetIsElf(pc),attacks=[];for(let i=0;i<count;i++){if(pc.dead||Number(pc.hp)<=0)break;const result=paralysisAwareAttackRoll
20648: const victims=artifactCombatSubjectsInCone(aim.origin,aim.direction,length,endWidth).filter(v=>v.subject!==monster),rolled=rollDamageExpression(String(breath.damage||'3d6')),outcomes=[];for(const victimRow of victims){co
20649: row.openingBreathUsed=true;row.breathCount++;row.lastActionRound=Number(state.combat?.round)||1;row.lastAction='breath';row.lastBreath={round:row.lastActionRound,targetName:target.name,damageRoll:rolled.total,diceResults
20714: const unused=huptzeenUnusedSpellCount(monster),base=rollDice(1,6,monster,'Huptzeen death explosion').total,damage=Math.max(0,base+unused*(Number(ex.bonusDamagePerUnusedSpell)||2)),radius=Math.max(0,Number(ex.radiusFt)||1
20768: turns=Math.max(2,Math.floor(Number(turns)||rollDice(2,6).total));
20828: function applyRockPythonSqueeze(monster,target,{sameRound=false,announce=true}={}){const rule=rockPythonRule(monster);if(!rule||!target||target.dead||Number(target.hp)<=0)return {ok:false,reason:'No living Rock Python co
20832: const result=paralysisAwareAttackRoll(monster,pc,'melee',pc.retreatingThisRound?2:0);if(announce)write(`${monster.name} bites at ${pc.name} — ${result.hit?'HIT':'miss'}.`,'system');if(!result.hit)return {ok:true,action:'
20850: monster.pendingGreatWhaleRam={round,vesselId:vessel.id,vesselName:vessel.name||vessel.id,damageExpression:String(greatWhaleRule(monster)?.shipRamHullDamage||'6d6'),successProcedure:'referee-required',resolved:false};
20859: const damage=Math.max(0,rollDamageExpression(String(rule.shipRamHullDamage||'6d6')).total),before=Math.max(0,Number(vessel.hullPoints)||0);vessel.hullPoints=Math.max(0,before-damage);vessel.maxHullPoints=Math.max(Number(
20980: if(spec.damage){ damage=Math.max(0,rollDamageExpression(spec.damage).total+(monster.damageMod||0)+artifactBlightPenalty(monster)+artifactBlessBonus(monster)); }
20982: else if(monster.naturalDamage){ damage=Math.max(0,rollDamageExpression(monster.naturalDamage).total+(monster.damageMod||0)+artifactBlightPenalty(monster)+artifactBlessBonus(monster)); }
21233: const areaMult=wychlampRuntimeAreaMultiplier(),radiusFt=Math.max(0,(Number(profile?.radiusFt)||20)*Math.sqrt(areaMult)),dice=rawSpellDamageDiceCount(caster,profile),roll=rollDice(dice,profile?.die||6,caster,'Fire Ball da
21307: const dice=rawSpellDamageDiceCount(caster,profile),roll=rollDice(dice,profile?.die||6,caster,'Lightning Bolt damage roll'),artifactDamage=artifactAdjustedSpellDamageTotal(caster,roll.total,dice,{consumeBonus:true}),artif
21312: const artifactStrength=artifactWeaponStrengthBonus(owner),rawBase=Number(explicitBonus??owner?.equippedWeapon?.magicBonus??item?.magicBonus)||0,base=(owner?.equippedWeapon?.magicDestroyed||item?.magicDestroyed||magicItem
22257: else if(kind==='stunning'&&hp<=150){const turns=rollDice(2,6,null,'Symbol stunning duration').total;recordActiveSpellEffect({name:effect.caster,level:effect.casterLevel},'Symbol: Stunning',subject.name,turns*10,{category
22261: function rawDelayedBlastFireBallDetonate(effect){if(!effect||effect.detonated)return [];effect.detonated=true;const dice=Math.max(1,Math.min(20,Number(effect.damageDice)||1)),roll=rollDice(dice,6,null,'Delayed Blast Fire
22383: if(!combat){write('Meteor Swarm requires represented combat geometry for its strike targets and overlapping 20-foot-radius blasts.','warning');return false;}const count=Number(order?.meteorCount)||4;if(![4,8].includes(co
22457: const subject=combat?(findMonster(String(order?.targetQuery||order?.target||''))||findPc(String(order?.targetQuery||order?.target||''))||targetMonster):targetPc;if(!subject){write('Power Word Stun requires one represente
22460: if(!combat){write('Reverse Gravity requires represented combat geometry for its 30-foot cube and falling distances.','warning');return false;}const origin=magicSubjectVector(caster),center=order?.centerVector||(targetMon
22473: if(subject){if(combat&&rawSpellDistanceFt(caster,subject)>5+1e-9){write(`${subject.name} is beyond touch range for Teleport Any Object.`,'warning');return false;}if(subject!==caster&&order?.unwilling!==false){const save=
22480: if(!combat){write('Holy Word requires represented creatures within 40 feet so its alignment/level table can be applied.','warning');return false;}const cv=magicSubjectVector(caster),subjects=[...(state.party||[]),...(sta
22485: const undead=artifactSubjectIsUndead(subject),hd=artifactSubjectHitDice(subject);if(variant.reversed){if(undead){const result=artifactApplyCureall(subject,String(order?.cureMode||'wounds'));write(`Obliterate paradoxicall
22486: if(undead){if(hd<=7){artifactSlaySubject(subject,'Raise Dead Fully');return true;}if(hd<=12){const save=rawSpellSubjectSave(subject,'spells',-4,'Raise Dead Fully');if(!save.success)artifactSlaySubject(subject,'Raise Dead
22493: const query=String(order?.targetQuery||order?.target||'').trim(),subject=findPc(query)||(combat?findMonster(query,true):null)||targetPc;if(!subject){write(`${variant.reversed?'Life Drain':'Restore'} requires one touched
22520: const rolledBudget=rollDice(4,8,caster,'Death Spell Hit Dice').total;let budget=rolledBudget;const candidates=[...(state.combat?.monsters||[]),...(state.party||[])].filter(subject=>artifactSubjectIsLivingCreature(subject
22614: const days=rollDice(3,6,caster,'Dissolve duration').total;recordActiveSpellEffect(caster,'Dissolve',String(order?.targetQuery||'rock or soil'),days*1440,{category:'terrain',rawEffect:'dissolve_mud',areaSquareFeet:area,de
22658: if(!combat){write('Teleport needs a represented same-plane 3D destination in RAW STRICT; the engine will not invent an off-map landing point.','warning');return false;}const query=String(order?.targetQuery||order?.target
22691: const immunityBypass=rawMaybeDropImmunityForSpell(subject,'Cause Critical Wounds',caster.className,subjectOrder),roll=rollDamageExpression('3d6+3'),imm=rawImmunitySpellEffectScalar(subject,'Cause Critical Wounds',caster.
22699: const immunityBypass=rawMaybeDropImmunityForSpell(subject,'Cure Critical Wounds',caster.className,subjectOrder),roll=rollDamageExpression('3d6+3'),imm=rawImmunitySpellEffectScalar(subject,'Cure Critical Wounds',caster.cl
22758: const query=String(order?.targetQuery||order?.targetSelection||order?.target||'').trim();if(variant.reversed){const subject=(combat?(findMonster(query,true)||targetMonster):null)||findPc(query);if(!subject){write('Finger
22760: const undead=combat?(findMonster(query,true)||targetMonster):null;if(undead&&artifactSubjectIsUndead(undead)){if(rawSpellDistanceFt(caster,undead)>120+1e-9){write(`${undead.name} is beyond Raise Dead's 120-foot range.`,'
22778: const high=subjects.filter(s=>rawSubjectHitDice(s)>3);let rolledCap=null;if(high.length||subjects.length===1){if(subjects.length!==1){write('When any Charm Monster victim has more than 3 Hit Dice, the spell can affect on
22783: const rolledTargets=rollDice(3,6,caster,'Confusion victim count').total;if(subjects.length>rolledTargets){write(`Confusion rolled ${rolledTargets} affected creatures; ${subjects.length} were selected. Narrow the selectio
22818: const center=targetMonster||findMonster(query);if(!center){write('Ice Storm needs a represented target/center.','warning');return false;}if(rawSpellDistanceFt(caster,center)>120+1e-9){write(`${center.name} is beyond Ice
22866: if(variant.reversed){if(subject===caster){write('Cause Serious Wounds requires another touch target.','warning');return false;}if(combat){const attack=attackRoll(caster,subject,'melee');if(!attack.hit){write(`${caster.na
22867: if(subject.type){write('Cure Serious Wounds is bounded to living player-character recipients in this engine; healing an NPC/monster remains referee-mediated.','warning');return false;}if(artifactCauseDiseaseHealingBlocke
22900: const count=rollDice(2,8,caster,'Sticks to Snakes count').total,created=[];for(let i=0;i<count;i++){const poisonous=rng(2)===1;created.push(rawCreatedCreatureRecord({spell:'Sticks to Snakes',creator:caster.name,name:`Con
23061: const roll=rollDamageExpression('1d6+1',sides=>artifactLuckyRoll(caster,sides,'Cause Light Wounds damage roll'));damageMonster(targetMonster,roll.total,'Cause Light Wounds',{kind:'spell',spell:true,spellName:'Cause Light
23088: if(!friends.length){write('Bless affects only friendly creatures in the 20-foot square who are not yet in melee; no eligible represented recipient is selected.','warning');return false;}for(const pc of friends)recordActi
23342: const roll=rollDamageExpression('1d6+1',sides=>artifactLuckyRoll(caster,sides,'Cure Light Wounds healing roll')),before=cureTarget.hp;cureTarget.hp=Math.min(cureTarget.maxHp,cureTarget.hp+roll.total);write(`${caster.name
23370: const baseAmount=healing==='full'?Math.max(0,targetPc.maxHp-targetPc.hp):rollDamageExpression(healing,sides=>artifactLuckyRoll(caster,sides,`${spell} healing roll`)).total,amount=Math.max(0,Math.ceil(baseAmount*immunityM
23386: const dice=rawSpellDamageDiceCount(caster,damage),roll=rollDice(dice,damage.die||6),artifactDamage=artifactAdjustedSpellDamageTotal(caster,roll.total,dice,{consumeBonus:true}),artifactPerDie=artifactDamage.bonusPerDie-ar
23452: for(let i=0;i<missiles;i++){const base=rollDamageExpression('1d6+1'),artifactDamage=artifactAdjustedSpellDamageTotal(pc,base.total,1,{consumeBonus:i===0}),mult=Number(specialWychlamp?.runtime?.intensityMultiplier)||1,dmg
23455: rawBreakProtectionFromEvilBarrier(pc,'cast an attack spell');consumePreparedSpell(pc,spell); const budgetRoll=rollDice(2,8,pc,'Sleep hit-dice roll'),durationRoll=rollDice(4,4,pc,'Sleep duration'),wychlampSleepMult=Number
25351: if(sameType.length&&sameType.every(isVelyaMonster)){const artifactBonus=artifactTurnUndeadBonus(cleric),actualClericLevel=cleric.className==='Cleric'?Math.max(1,Number(cleric.level)||1):0;if(actualClericLevel<13){state.c
25353: if(typeof table==='number'){ successRoll=rollDice(2,6); success=successRoll.total+artifactBonus.rollBonus>=table; }
25361: const baseDiceCount=table==='D+'?3:table==='DN'?4:2,diceCount=baseDiceCount+artifactBonus.extraHdDice,budgetRoll=rollDice(diceCount,6); let budget=budgetRoll.total;
26155: function rollDice(count,sides,subject=null,reason='die roll'){ const rolls=[]; for(let i=0;i<count;i++) rolls.push(subject?artifactLuckyRoll(subject,sides,reason):rng(sides)); return {rolls,total:rolls.reduce((a,b)=>a+b,
26228: for(const key of ABILITIES){ const roll=rollDice(3,6); abilities[key]=roll.total; detail.push(`${key.toUpperCase()} ${roll.rolls.join('+')}=${roll.total}`); }
26305: const hpRoll=rollDice(1,rule.hd); const conAdj=abilityAdjustment(abilities.con); const hp=Math.max(1,hpRoll.total+conAdj);
26306: const moneyRoll=rollDice(3,6); const startingGp=moneyRoll.total*10; const startingMoneyCp=moneyCp(startingGp);
26383: const abilities={}; for(const key of ABILITIES) abilities[key]=rollDice(3,6).total;
27091: function developerSiegeClose(m){const s=state.siegeMachine?.sieges?.[strategicKey(m[1])];if(!s){write('SIEGE MACHINE — siege not found.','warning');return;}let raw=0;for(const [id,weeks] of Object.entries(s.weaponWeeks||
27149: function smPostSiegeDamage(s){let rolled=0;const weaponRolls={},roster=s.postSiegeWeapons||(s.week>0?Object.fromEntries(Object.entries(s.attackerEquipment||{}).filter(([id])=>SIEGE_WEAPONS[id]?.kind==='artillery').map(([
27255: const amount=(expr)=>rollDamageExpression(expr,roll).total;
27566: else if(app.mechanic==='artifact_adverse_sentience'){app.outcome=String(params.outcome||'referee selection');app.durationDays=params.outcome==='control'?rollDice(4,6,actor,'artifact Sentience control duration').total:nul
27579: else if(app.mechanic==='artifact_penalty_withdrawal'){const days=rollDice(2,10,actor,'artifact Withdrawal duration').total,effect=artifactPenaltyEffect(rec,app,actor,'artifact_penalty_withdrawal',{durationMinutes:days*14
27580: else if(app.mechanic==='artifact_penalty_wounded'){const rolled=rollDice(1,20,actor,'artifact Wounded penalty').total,result=artifactPenaltyLoseHp(actor,rolled,{permanent:params.mode==='permanent',source:`${rec.name}: Wo
27697: return addArtifactPower(rec,{id:def.key,name:def.name,type:def.type,cost:def.cost,spell:def.spell||null,spellClass:def.spellClass||null,tableKey:def.key,sourceCategory:def.sourceCategory,mechanic:def.mechanic,params:{amo
28000: function artifactProcessSwordRound(rec,effect){if(!combatActive()||effect.active===false)return;const actor=findPc(effect.targetName),target=findMonster(effect.observedCreature,true);if(!actor||actor.dead||!target||targe
28109: const effect=row.effect,oldMax=Math.max(1,Number(subject.maxHp)||1),oldHp=Math.max(0,Number(subject.hp)||0),damageTaken=Math.max(0,oldMax-oldHp),hd=Math.max(1,artifactPcHitDice(subject));if(!Number.isFinite(Number(effect
28111: function artifactRestoreSizeControl(subject,effect){if(!subject||!effect||!Number.isFinite(Number(effect.baseMaxHp)))return;const oldMax=Math.max(1,Number(subject.maxHp)||1),damageTaken=Math.max(0,oldMax-Math.max(0,Numbe
28142: function artifactTransformedNaturalAttacks(pc,monster,profile){const attacks=(profile?.attacks||[]).filter(a=>!a.refereeMediated&&averageDamageExpression(a.damage)>0);if(!attacks.length){write(`${pc.name}'s ${profile?.na
28205: const rawRolled=Math.max(0,Number(damage.rawBase??(Number(damage.raw)-modifier)))*mult,matrixRolled=Math.max(0,Number(damage.matrixBase??(Number(damage.matrix)-modifier)))*mult,activeExpr=damage.active==='RAW'?damage.raw
28206: const rawBase=artifactSizeAdjustedDamageBase(rawRolled,damage.rawExpr,sizeMod),matrixBase=artifactSizeAdjustedDamageBase(matrixRolled,damage.matrixExpr,sizeMod),appliedBase=artifactSizeAdjustedDamageBase(damage.active===

## Monster attack eligibility/target context (total 276)

3875: const source=typeof COMBAT_MONSTERS!=='undefined'?COMBAT_MONSTERS[monster?.type]:null;
3879: const source=typeof COMBAT_MONSTERS!=='undefined'?COMBAT_MONSTERS[monster?.type]:null;
4799: const choices=design.inhabitants.filter(type=>COMBAT_MONSTERS[type]); const type=choices[rng(choices.length)-1]||theme.encounter;
5515: const base=String(COMBAT_MONSTERS[first?.type]?.name||first?.type||'Foe').trim();
5585: const typeSummary=[...new Set(members.map(m=>COMBAT_MONSTERS[m.type]?.name||m.type))].join('/');
6497: const resolvedType=monsterTypeKey(type)||type, resolvedProfile=COMBAT_MONSTERS[resolvedType];
6504: const choices=(generated.record.wanderingEncounterTypes||[]).filter(type=>COMBAT_MONSTERS[type]);
6507: write(`Movement elsewhere in ${generated.record.name} draws near — ${count} ${COMBAT_MONSTERS[type].name}${count===1?'':'s'} appear ${distance} feet away.`,'warning');
6686: const profile=COMBAT_MONSTERS?.[route.key]||null;
6735: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names the monster fa
6737: const alias=DMR2_AERIAL_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6738: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6751: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]${r.adapterRequired?' — NPC adapter; source-selected hp/weapon configuration required before combat':''}`:r.status==='variant_required'?`family require
6776: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names the elemental
6778: const alias=DMR2_CAVERN_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6779: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6792: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
6822: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
6824: const alias=DMR2_COLD_ARCTIC_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6825: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6838: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
6874: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
6876: const alias=DMR2_DESERT_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6877: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6890: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
6922: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
6924: const alias=DMR2_HILLS_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6925: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6938: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
6980: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
6982: const alias=DMR2_JUNGLE_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
6983: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
6996: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7029: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
7031: const alias=DMR2_MOUNTAIN_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7032: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7045: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7087: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
7089: const alias=DMR2_OCEAN_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7090: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7103: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7138: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
7140: const alias=DMR2_OPEN_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7141: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7154: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7188: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names Water Elementa
7190: const alias=DMR2_RIVER_LAKE_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7191: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7204: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7238: const alias=DMR2_RUINS_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7239: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7288: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
7290: const alias=DMR2_SETTLED_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7291: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7304: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7340: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a source famil
7342: const alias=DMR2_SWAMP_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7343: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7356: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7401: if(family){const candidates=family.filter(key=>Boolean(COMBAT_MONSTERS[key]));return {status:candidates.length===family.length?'variant_required':'variant_incomplete',key:null,candidates,reason:'DMR2 names a dragon famil
7403: const alias=DMR2_WOODS_RUNTIME_ALIASES[entry.monster],key=(alias&&COMBAT_MONSTERS[alias])?alias:monsterTypeKey(entry.monster);
7404: if(key&&COMBAT_MONSTERS[key])return {status:'resolved',key,candidates:[key],profile:COMBAT_MONSTERS[key]};
7417: const runtimeText=r.status==='resolved'?`${r.profile.name} [${r.key}]`:r.status==='variant_required'?`family requires explicit runtime variant: ${r.candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ')}`:`${r.s
7445: return {appVersion:APP_VERSION,complete:issues.length===0&&promoted.length===expected.length&&supplementalRows.length===expected.length,tableCount:tables.length,promotedCount:promoted.length,supplementalResolvedCount:sup
7491: const candidates=[...(sourceRuntime.candidates||[])],candidateText=candidates.map(key=>`${key} (${COMBAT_MONSTERS[key]?.name||'profile unavailable'})`).join('; ');
7494: const profile=COMBAT_MONSTERS[requested];
7499: const candidates=[...(sourceRuntime.candidates||[])],candidateText=candidates.map(key=>COMBAT_MONSTERS[key]?.name||key).join('; ');
7632: const profile=runtime?.profile||COMBAT_MONSTERS?.[runtime?.key],config={};
7643: const runtimeKeys=Object.keys(COMBAT_MONSTERS||{});
7696: return {appVersion:APP_VERSION,complete,tableCount:tables.length,rowCount:rows.length,concreteRows:concreteRows.length,variantRequiredRows:variantRequiredRows.length,variantRequiredCandidateCount:candidateCount,variantIn
7988: const fail=reason=>({ok:false,reason}),profileKey=faction==='buccaneer'?'man_buccaneer':'man_pirate',profile=CATALOG_COMBAT_MONSTERS[profileKey];
9848: const profile=COMBAT_MONSTERS.ghostly_horde,hp=rollMonsterHp({hd:3,hpKind:'3d8'});
10178: write(`WILDERNESS ENCOUNTER — ${count} ${entry.label} at about ${dist.distance} yards. ${COMBAT_MONSTERS[entry.type]?.name||'The creatures'} ${reaction.text}. They have not attacked. What does the party do?`,'warning');
10196: const profile=COMBAT_MONSTERS[e.type]||{};
11964: const MODULE_COMBAT_MONSTERS = {
12387: const profile=COMBAT_MONSTERS?.[subject?.type]||subject||{};
12454: const source=typeof COMBAT_MONSTERS!=='undefined'?COMBAT_MONSTERS[monster.type]:null;
12569: const CATALOG_COMBAT_MONSTERS = Object.fromEntries(MONSTER_LORE_RECORDS.map(record=>{const profile=canonicalProfile(record);return [profile.key,profile];}));
12584: const base=CATALOG_COMBAT_MONSTERS.hydra||{};
13443: const base=CATALOG_COMBAT_MONSTERS.slug_giant||{},hd=9,saves=classSaveValues('Fighter',giantGastropodSaveLevel(hd));
13456: const SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS={
13479: const COMBAT_MONSTERS = {...CATALOG_COMBAT_MONSTERS,...SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS,...MODULE_COMBAT_MONSTERS};
13483: for(const [runtimeKey,profile] of Object.entries(COMBAT_MONSTERS)){
13492: profile.supplementalSourceProfile=Boolean(profile.supplementalSourceProfile||SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS[runtimeKey]);
13493: profile.moduleExtension=Boolean(profile.moduleExtension||MODULE_COMBAT_MONSTERS[runtimeKey]);
13500: const profile=COMBAT_MONSTERS[row.key];
13504: return fact&&!attack.refereeMediated&&!attack.attackContext?{...attack,attackContext:{...fact.attackContext,provenance:{...fact.attackContext.provenance}}}:attack;
13512: ...Object.fromEntries(Object.entries(SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS).map(([key,p])=>[p.recordId||key,{recordId:p.recordId||key,key,name:p.name,source:p.source,sourcePage:p.sourcePage,profileType:p.profileType||'supp
13513: ...Object.fromEntries(Object.entries(MODULE_COMBAT_MONSTERS).map(([key,p])=>[p.recordId||key,{recordId:p.recordId||key,key,name:p.name,source:p.source||'The Smoking Pillar of Lan Yu',sourcePage:p.sourcePage||null,profile
14817: const canonicalKeys=new Set(Object.keys(CATALOG_COMBAT_MONSTERS));
14819: for(const [key,profile] of Object.entries(CATALOG_COMBAT_MONSTERS)){const n=normalizeMonsterLoreText(profile?.name);if(!canonicalNames.has(n))canonicalNames.set(n,[]);canonicalNames.get(n).push(key);}
14820: const supplementalKeys=Object.keys(SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS),keyCollisions=supplementalKeys.filter(key=>canonicalKeys.has(key));
14821: const nameCollisions=supplementalKeys.flatMap(key=>{const profile=SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS[key],hits=canonicalNames.get(normalizeMonsterLoreText(profile?.name))||[];return hits.map(canonicalKey=>({supplemental
14823: const runtime=RUNTIME_MONSTER_CATALOG_INDEX[gap.id]||null,key=runtime?.key||null,profile=key?SUPPLEMENTAL_SOURCE_COMBAT_MONSTERS[key]:null;
14835: return {build:APP_VERSION,profiles:rows.length,rows,unresolvedRows,partialOrUnresolvedRows,keyCollisions,nameCollisions,historicalEvidenceCount:evidence.length,historicalEvidenceIssues,canonicalCatalogueCount:Object.keys
14845: return {source:'DMR2 completed index + available Rules Cyclopedia/AC9 profiles',profiles:DMR2_RC_CREATURE_GAP_LEDGER.length,indexEvidence:evidence.length,evidence,counts,bySource,unmappedEvidence,orphanMappings,duplicate
14873: const LEGACY_MONSTER_KEY_ALIASES={wolf:'wolf_normal',giant_centipede:'centipede_giant',giant_crab_spider:'spider_giant_crab',pirate:'man_pirate',...Object.fromEntries(Object.values(LEGACY_IMPLEMENTATION_PROFILES).map(pro
14930: const profile=subject?.sizeProfile||COMBAT_MONSTERS[subject?.type]?.sizeProfile||null;
14931: const legacy=String(subject?.size||COMBAT_MONSTERS[subject?.type]?.size||'medium').toLowerCase();
14937: const sizes=normalizedTargetSizeProfile(subject),protection=String(subject?.protection||COMBAT_MONSTERS[subject?.type]?.protection||'soft').toUpperCase();
16104: if(!m.catalogAuthority){const migrated=LEGACY_ACTIVE_SAVE_TYPE_ALIASES[m.type]||monsterTypeKey(m.type);if(migrated&&COMBAT_MONSTERS[migrated])m.type=migrated;const authorityProfile=COMBAT_MONSTERS[m.type];m.catalogAuthor
16106: const profile=COMBAT_MONSTERS[m.type];
16298: if(COMBAT_MONSTERS[direct])return direct;
16299: const alias=LEGACY_MONSTER_KEY_ALIASES[direct];if(alias&&COMBAT_MONSTERS[alias])return alias;
16300: const singular=direct.replace(/ies$/,'y').replace(/ves$/,'f').replace(/s$/,'');if(COMBAT_MONSTERS[singular])return singular;
16302: const named=Object.keys(COMBAT_MONSTERS).find(key=>normalizeMonsterLoreText(COMBAT_MONSTERS[key]?.name).split(' ').filter(Boolean).sort().join(' ')===requestedTokens);
16309: const requestedType=type; type=monsterTypeKey(type)||type; const base=COMBAT_MONSTERS[type]; if(!base)throw new Error(`Unknown monster type: ${requestedType}`); const p=resolveMonsterProfileForSpawn(base,spawnOptions); i
16359: const profile=COMBAT_MONSTERS[monster?.type]||monster||{};
16383: const first=monsters[0],profile=COMBAT_MONSTERS[first.type]||first;
16409: const key=monsterTypeKey(type); if(!key){ write(`No loaded creature matches “${type}”. Developer Mode can search all ${Object.keys(COMBAT_MONSTERS).length} profiles with “dev monster catalog <name>”.`,'warning'); return;
16410: if(COMBAT_MONSTERS[key]?.normalHumanAdapter){write('Normal Human uses the Rules Cyclopedia NPC adapter: the referee must select 1-7 hp and an actual weapon from the existing equipment catalogue. A generic test encounter
16411: if(COMBAT_MONSTERS[key]?.possessionTemplate){write('Possession is a hosted undead entity. Select 7-9 HD and an actual host object explicitly; a generic test encounter will not invent either value.','warning');return;}
16442: addEvent(`Combat test encounter began: ${count} ${COMBAT_MONSTERS[key].name}${count===1?'':'s'} at ${distanceUnit==='yd'?encounterDistance+' yd':encounterDistance+"'"}.`);
16443: write(`COMBAT BEGINS — ${count} ${COMBAT_MONSTERS[key].name}${count===1?'':'s'} at approximately ${distanceUnit==='yd'?encounterDistance+' yd':encounterDistance+"'"}.
16455: const key=monsterTypeKey(type)||type; const profile=COMBAT_MONSTERS[key]; if(!profile) return false;
16585: const profile=COMBAT_MONSTERS?.[combatant.type]||combatant;
16774: const modes=combatant.moveModes||COMBAT_MONSTERS?.[combatant.type]?.moveModes||{};
16787: function monsterCarryOffRule(monster){return monster?.carryOff||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.carryOff:null)||null;}
16832: function monsterBurrowRule(monster){return monster?.burrowMovement||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.burrowMovement:null)||null;}
16869: function monsterPhantomRule(monster){return monster?.phantom||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.phantom:null)||null;}
17438: function targetSize(target,scale='monster'){
17449: const size=targetSize(target,attackScale); const protection=targetProtection(target); const band=RANGE_ORDER.includes(range)?range:'normal';
17473: const explicit=String(monster.meleeRangePreference||COMBAT_MONSTERS[monster.type]?.meleeRangePreference||'').toLowerCase();
17617: const rule=monster?.regeneration||COMBAT_MONSTERS?.[monster?.type]?.regeneration;
17654: function hydraVariantRule(monster){const rule=monster?.hydraVariant||COMBAT_MONSTERS?.[monster?.type]?.hydraVariant;return rule&&rule.kind?rule:null;}
17696: function lavaOozeRule(monster){const rule=monster?.lavaOoze||COMBAT_MONSTERS?.[monster?.type]?.lavaOoze;return rule&&monster?.specialAttack==='lava_ooze_coating'?rule:null;}
17746: function sporacleDefenseRule(monster){const rule=monster?.sporacleDefense||COMBAT_MONSTERS?.[monster?.type]?.sporacleDefense;return isSporacleMonster(monster)&&rule?rule:null;}
17782: const profile=monster?.type?COMBAT_MONSTERS[monster.type]:monster;
17834: function monsterOardRule(monster){return monster?.oardTraits||COMBAT_MONSTERS?.[monster?.type]?.oardTraits||null;}
17870: function monsterPhygoraxRule(monster){return monster?.phygoraxTraits||COMBAT_MONSTERS?.[monster?.type]?.phygoraxTraits||null;}
17894: function monsterPossessionRule(monster){return monster?.possessionTraits||COMBAT_MONSTERS?.[monster?.type]?.possessionTraits||null;}
17920: function monsterSacrolRule(monster){return monster?.sacrolTraits||COMBAT_MONSTERS?.[monster?.type]?.sacrolTraits||null;}
17961: function monsterStalwartRule(monster){return monster?.stalwartTraits||COMBAT_MONSTERS?.[monster?.type]?.stalwartTraits||null;}
17997: function monsterReflecterRule(monster){return monster?.reflecterTraits||COMBAT_MONSTERS?.[monster?.type]?.reflecterTraits||null;}
18082: function monsterVapourGhoulRule(monster){return monster?.vapourGhoulTraits||COMBAT_MONSTERS?.[monster?.type]?.vapourGhoulTraits||null;}
18497: return Boolean(monster && (monster.specialAttack==='basilisk_gaze' || COMBAT_MONSTERS?.[monster.type]?.specialAttack==='basilisk_gaze'));
18589: return Boolean(monster && (monster.specialAttack==='medusa_gaze' || COMBAT_MONSTERS?.[monster.type]?.specialAttack==='medusa_gaze'));
18674: return Boolean(monster&&(monster.specialAttack==='nekrozon_gaze'||COMBAT_MONSTERS?.[monster.type]?.specialAttack==='nekrozon_gaze'));
18677: return Boolean(monster&&(monster.specialAttack==='greater_wyrd_vision'||COMBAT_MONSTERS?.[monster.type]?.specialAttack==='greater_wyrd_vision'));
18925: function monsterSwallowRule(monster){return monster?.swallow&&typeof monster.swallow==='object'?monster.swallow:(COMBAT_MONSTERS?.[monster?.type]?.swallow||null);}
18926: function monsterGrabRule(monster){return monster?.grab&&typeof monster.grab==='object'?monster.grab:(COMBAT_MONSTERS?.[monster?.type]?.grab||null);}
18927: function monsterSpecialMeleeReachFt(monster){const g=monsterGrabRule(monster),lava=monster?.lavaOoze||COMBAT_MONSTERS?.[monster?.type]?.lavaOoze;return Math.max(0,Number(g?.reachFt)||0,Number(lava?.reachFt)||0);}
19129: function sporacleRegenerationRule(monster){const rule=monster?.sporacleRegeneration||COMBAT_MONSTERS?.[monster?.type]?.sporacleRegeneration;return monster?.specialAttack==='sporacle_tentacles'&&rule?rule:null;}
19130: function sporacleReproductionRule(monster){const rule=monster?.sporacleReproduction||COMBAT_MONSTERS?.[monster?.type]?.sporacleReproduction;return monster?.specialAttack==='sporacle_tentacles'&&rule?rule:null;}
19140: function processSporacleReproductionClock(beforeAbsolute,afterAbsolute){for(const rec of ensureSporacleDetachedTentacles()){if(rec.status!=='growing')continue;const due=Number(rec.reproductionDueAbsoluteMinute);if(!Numbe
19161: function monsterContinuousAttackRule(monster){return monster?.continuousAttack||COMBAT_MONSTERS[monster?.type]?.continuousAttack||null;}
19195: function vampireRoseRule(monster){return monster?.vampireRose||COMBAT_MONSTERS[monster?.type]?.vampireRose||null;}
19417: function strangleVineRule(monster){return monster?.specialAttack==='strangle_vine'?(monster.strangleVine||COMBAT_MONSTERS?.[monster.type]?.strangleVine||null):null;}
19452: function strangleweedRule(monster){return monster?.specialAttack==='strangleweed_opposed'?(monster.strangleweed||COMBAT_MONSTERS?.[monster.type]?.strangleweed||null):null;}
19573: function monsterFlitterlingSongRule(monster){return monster?.flitterlingSongs||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.flitterlingSongs:null)||null;}
19586: const day=flitterlingSongDayKey(),living=(state.combat?.monsters||[]).filter(monsterStillPresent).filter(isFlitterlingMonster),rule=living.length?monsterFlitterlingSongRule(living[0]):COMBAT_MONSTERS.flitterling?.flitter
19591: const any=(state.combat?.monsters||[]).find(monster=>monsterStillPresent(monster)&&isFlitterlingMonster(monster)),rule=any?monsterFlitterlingSongRule(any):COMBAT_MONSTERS.flitterling?.flitterlingSongs,need=Math.max(1,Num
19611: function monsterLesserPhantomPowerRule(monster){return monster?.lesserPhantomPowers||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.lesserPhantomPowers:null)||null;}
19637: function monsterLesserPhantomTraitRule(monster){return monster?.lesserPhantomTraits||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.lesserPhantomTraits:null)||null;}
19673: function monsterBaldandarPowerRule(monster){return monster?.baldandarPowers||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.baldandarPowers:null)||null;}
19711: function monsterBaldandarTraitRule(monster){return monster?.baldandarTraits||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.baldandarTraits:null)||null;}
19774: function monsterHomunculusPowerRule(monster){return monster?.homunculusPowers||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.homunculusPowers:null)||null;}
19818: function monsterHomunculusTraitRule(monster){return monster?.homunculusTraits||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.homunculusTraits:null)||null;}
19926: function monsterAraneaSpellcastingRule(monster){return monster?.araneaSpellcasting||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.araneaSpellcasting:null)||null;}
20002: function monsterBrainCollectorSpellRule(monster){return monster?.brainCollectorSpells||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.brainCollectorSpells:null)||null;}
20023: function brainCollectorVictimEligible(victim){if(!victim)return false;if((state.party||[]).includes(victim))return true;const profile=victim.type?COMBAT_MONSTERS?.[victim.type]:null,text=`${victim.kind||''} ${victim.mons
20042: function monsterFaedorneMagicRule(monster){return monster?.faedorneMagic||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.faedorneMagic:null)||null;}
20101: function monsterRandaraMagicRule(monster){return monster?.randaraMagic||(monster?.type?COMBAT_MONSTERS?.[monster.type]?.randaraMagic:null)||null;}
20148: function monsterMesmerRule(monster){const rule=monster?.mesmerTraits||COMBAT_MONSTERS?.[monster?.type]?.mesmerTraits;return monster&&rule?rule:null;}
20178: function monsterHephaestonRule(monster){const rule=monster?.hephaestonTraits||COMBAT_MONSTERS?.[monster?.type]?.hephaestonTraits;return monster&&rule?rule:null;}
20228: function monsterMagenRule(monster){const rule=monster?.magenTraits||COMBAT_MONSTERS?.[monster?.type]?.magenTraits;return monster&&rule?rule:null;}
20270: function monsterVelyaRule(monster){const rule=monster?.velyaTraits||COMBAT_MONSTERS?.[monster?.type]?.velyaTraits;return monster&&rule?rule:null;}
20274: const profile=COMBAT_MONSTERS?.[monster.type]||{},rule=monsterVelyaRule(monster)||{},forms=Array.isArray(rule.forms)&&rule.forms.length?rule.forms:['human','great white shark','manta ray','water current'];
20279: function velyaAnimalProfile(monster,form){const spec=monsterVelyaRule(monster)?.animalForms?.[form],key=spec?.profileKey;return key?COMBAT_MONSTERS?.[key]||null:null;}
20345: function monsterWhiteFangRule(monster){return monster?.whiteFangTraits||COMBAT_MONSTERS?.[monster?.type]?.whiteFangTraits||null;}
