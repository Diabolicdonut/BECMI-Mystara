# v0.4.338 monsters-runtime source snippets

## Production HTML lines 16070-16140

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
16096:
16097:   function normalizeCombatState(){
16098:     if(!state.combat || typeof state.combat!=='object') { state.combat=null; return; }
16099:     const c=state.combat;
16100:     c.active=Boolean(c.active);
16101:     c.round=Math.max(1,Number(c.round)||1);
16102:     c.monsters=Array.isArray(c.monsters)?c.monsters:[];
16103:     for(const m of c.monsters){
16104:       if(!m.catalogAuthority){const migrated=LEGACY_ACTIVE_SAVE_TYPE_ALIASES[m.type]||monsterTypeKey(m.type);if(migrated&&COMBAT_MONSTERS[migrated])m.type=migrated;const authorityProfile=COMBAT_MONSTERS[m.type];m.catalogAuthority=authorityProfile?.supplementalSourceProfile?'supplemental-source-profile':authorityProfile?.moduleExtension?'smoking-pillar-extension':'workbook-600';}
16105:       m.moraleFirstHit=Boolean(m.moraleFirstHit); m.moraleQuarterHp=Boolean(m.moraleQuarterHp);
16106:       const profile=COMBAT_MONSTERS[m.type];
16107:       if(profile){
16108:         if(profile.supplementalSourceProfile)m.catalogAuthority='supplemental-source-profile';
16109:         else if(profile.moduleExtension)m.catalogAuthority='smoking-pillar-extension';
16110:         if(!m.armorDesc) m.armorDesc=profile.armorDesc||null;
16111:         if(!m.protection) m.protection=profile.protection||'soft';
16112:         m.noWeapons=Boolean(m.noWeapons||profile.noWeapons);if(m.noWeapons)m.weaponId=null;
16113:         m.sizeProfile=normalizedTargetSizeProfile(m);
16114:         if(!m.moveModes&&profile.moveModes)m.moveModes={...profile.moveModes};
16115:         if(!m.appearance) m.appearance=monsterAppearanceVariant(m,Number(String(m.id||'').match(/(\d+)$/)?.[1])||1);
16116:         if(!m.tacticalRole) m.tacticalRole=profile.tacticalRole||monsterDefaultTacticalRole(m);
16117:         if(!m.specialAttack&&profile.specialAttack)m.specialAttack=profile.specialAttack;
16118:         if(!Array.isArray(m.attacks)&&Array.isArray(profile.attacks))m.attacks=profile.attacks.map(a=>({...a}));
16119:         if(!m.grab&&profile.grab)m.grab={...profile.grab};
16120:         if(!m.regeneration&&profile.regeneration)m.regeneration=JSON.parse(JSON.stringify(profile.regeneration));
16121:         if(!m.hydraVariant&&profile.hydraVariant)m.hydraVariant=JSON.parse(JSON.stringify(profile.hydraVariant));
16122:         if(m.hydraVariant){m.hydraHeadCount=Math.max(1,Number(m.hydraHeadCount)||Number(m.parameterResolution?.heads)||Math.round(Number(m.hd)||Number(m.hydraVariant.headsMin)||5));syncHydraHeadAttacks(m);if(m.hydraVariant.kind==='regenerating')regeneratingHydraState(m,{create:true});}
16123:         if(!m.sporacleRegeneration&&profile.sporacleRegeneration)m.sporacleRegeneration=JSON.parse(JSON.stringify(profile.sporacleRegeneration));
16124:         if(!m.sporacleReproduction&&profile.sporacleReproduction)m.sporacleReproduction=JSON.parse(JSON.stringify(profile.sporacleReproduction));
16125:         if(!m.sporacleDefense&&profile.sporacleDefense)m.sporacleDefense=JSON.parse(JSON.stringify(profile.sporacleDefense));
16126:         m.immuneCharm=Boolean(m.immuneCharm||profile.immuneCharm);m.immuneHold=Boolean(m.immuneHold||profile.immuneHold);m.immuneColdSpell=Boolean(m.immuneColdSpell||profile.immuneColdSpell);m.immuneMind=Boolean(m.immuneMind||profile.immuneMind);m.immunePoison=Boolean(m.immunePoison||profile.immunePoison);m.immuneParalysis=Boolean(m.immuneParalysis||profile.immuneParalysis);m.immuneSound=Boolean(m.immuneSound||profile.immuneSound);
16127:         if(m.specialAttack==='sporacle_tentacles')migrateLegacySporacleDetachedTentacles(m);
16128:         if(!m.paralysis&&profile.paralysis)m.paralysis=JSON.parse(JSON.stringify(profile.paralysis));
16129:         if(!m.jellyfish&&profile.jellyfish)m.jellyfish={...profile.jellyfish};
16130:         if(!m.adhesive&&profile.adhesive)m.adhesive={...profile.adhesive};
16131:         if(!m.continuousAttack&&profile.continuousAttack)m.continuousAttack={...profile.continuousAttack};
16132:         if(!m.strangleVine&&profile.strangleVine)m.strangleVine={...profile.strangleVine};
16133:         if(!m.strangleweed&&profile.strangleweed)m.strangleweed={...profile.strangleweed};
16134:         if(!m.vampireRose&&profile.vampireRose)m.vampireRose={...profile.vampireRose};
16135:         if(!m.lavaOoze&&profile.lavaOoze)m.lavaOoze={...profile.lavaOoze};
16136:         if(!m.carryOff&&profile.carryOff)m.carryOff={...profile.carryOff};
16137:         if(!m.burrowMovement&&profile.burrowMovement)m.burrowMovement={...profile.burrowMovement};
16138:         if(!m.phantom&&profile.phantom)m.phantom={...profile.phantom};
16139:         if(!m.flitterlingSongs&&profile.flitterlingSongs)m.flitterlingSongs={...profile.flitterlingSongs};
16140:         if(!m.lesserPhantomPowers&&profile.lesserPhantomPowers)m.lesserPhantomPowers=JSON.parse(JSON.stringify(profile.lesserPhantomPowers));

## Production HTML lines 16255-16375

16255:       e.range=RANGE_ORDER.includes(e.range)?e.range:'far';
16256:     }
16257:     if(c.active) ensureDefaultPartyGroup({announce:false});
16258:   }
16259:
16260:   function shadowRngFactory(seed){
16261:     let local=(seed>>>0);
16262:     return max=>{ local=(Math.imul(1664525,local)+1013904223)>>>0; return Math.floor((local/4294967296)*max)+1; };
16263:   }
16264:
16265:   function rollDamageExpression(expression, roller=rng){
16266:     let source=String(expression??'').trim().toLowerCase();
16267:     if(!source || source==='none' || source==='nil') return {total:0,rolls:[],expression:String(expression||'None')};
16268:     if(source==='1 dmg' || source==='1 damage') return {total:1,rolls:[1],expression:String(expression)};
16269:     // Some workbook labels retain notes such as “1d10 (generic polearm)”.
16270:     // Parenthetical labels are descriptive, not part of the dice expression.
16271:     source=source.replace(/\([^)]*\)/g,'').replace(/\s+/g,'').replace(/−/g,'-');
16272:     const pieces=source.match(/[+-]?[^+-]+/g) || [];
16273:     let total=0; const rolls=[];
16274:     for(const pieceRaw of pieces){
16275:       let piece=pieceRaw, sign=1;
16276:       if(piece[0]==='+') piece=piece.slice(1); else if(piece[0]==='-'){sign=-1;piece=piece.slice(1);}
16277:       const dice=/^(\d*)d(\d+)$/.exec(piece);
16278:       if(dice){
16279:         const count=Math.max(1,Number(dice[1]||1)); const sides=Number(dice[2]);
16280:         for(let i=0;i<count;i++){ const r=roller(sides); rolls.push(sign*r); total+=sign*r; }
16281:       } else if(/^\d+$/.test(piece)) total+=sign*Number(piece);
16282:     }
16283:     return {total:Math.max(0,total),rolls,expression:String(expression)};
16284:   }
16285:
16286:   function rollMonsterHp(profile){
16287:     if(Number(profile?.fixedHp)>0)return Number(profile.fixedHp);
16288:     const source=String(profile?.hpKind||'').trim();
16289:     const fixed=source.match(/(?:^|\b)(\d+)\s*hp(?:\s*fixed)?\b/i);
16290:     if(fixed&&!/\bd\d+/i.test(source))return Math.max(1,Number(fixed[1]));
16291:     const dice=source.match(/\b\d*d\d+(?:\s*[+-]\s*\d+)?/i);
16292:     if(dice)return Math.max(1,rollDamageExpression(dice[0]).total);
16293:     return Math.max(1,rollDamageExpression(source).total);
16294:   }
16295:
16296:   function monsterTypeKey(text){
16297:     const n=normalizeMonsterLoreText(text),direct=canonicalMonsterKey(text);
16298:     if(COMBAT_MONSTERS[direct])return direct;
16299:     const alias=LEGACY_MONSTER_KEY_ALIASES[direct];if(alias&&COMBAT_MONSTERS[alias])return alias;
16300:     const singular=direct.replace(/ies$/,'y').replace(/ves$/,'f').replace(/s$/,'');if(COMBAT_MONSTERS[singular])return singular;
16301:     const requestedTokens=n.split(' ').filter(Boolean).sort().join(' ');
16302:     const named=Object.keys(COMBAT_MONSTERS).find(key=>normalizeMonsterLoreText(COMBAT_MONSTERS[key]?.name).split(' ').filter(Boolean).sort().join(' ')===requestedTokens);
16303:     if(named)return named;
16304:     if(/vapou?r ghoul/.test(n))return'vapour_ghoul';if(/bodendruker/.test(n))return'leveller';if(/hollow children|hollow child/.test(n))return'hollow_child';if(/zombie natives?/.test(n))return'zombie_native';if(/ash walker/.test(n))return'ash_walker';if(/stitcher/.test(n))return'hollow_child_stitcher';if(/captain harshaw|harshaw/.test(n))return'captain_harshaw';if(/rabid jaguar/.test(n))return'rabid_jaguar';if(/giant beetle/.test(n))return'giant_beetle';
16305:     return null;
16306:   }
16307:
16308:   function createCombatMonster(type,index,spawnOptions={}){
16309:     const requestedType=type; type=monsterTypeKey(type)||type; const base=COMBAT_MONSTERS[type]; if(!base)throw new Error(`Unknown monster type: ${requestedType}`); const p=resolveMonsterProfileForSpawn(base,spawnOptions); if(p?.spawnConfigurationError)throw new Error(p.spawnConfigurationError); const hp=rollMonsterHp(p); const lore=monsterLoreForName(p?.name||type);
16310:     const monster={id:`${type}-${index}`,name:`${p.name}${type==='captain_harshaw'?'':` ${index}`}`,type,hp,maxHp:hp,ac:p.ac,hd:p.hd,move:p.move,thac0:p.thac0,morale:p.morale,intelligence:p.intelligence,alignment:p.alignment,xp:p.xp,size:p.size,sizeProfile:normalizedTargetSizeProfile(p),rcSizeCode:p.rcSizeCode||null,influenceRadiusFt:Number(p.influenceRadiusFt)||influenceRadiusForSizeCode(p.rcSizeCode,p.size),moveModes:p.moveModes?{...p.moveModes}:null,nativeScale:p.nativeScale||'monster',protection:p.protection,armorDesc:p.armorDesc||null,saveSpells:p.saveSpells,savePoison:p.savePoison||16,kind:p.kind,noWeapons:Boolean(p.noWeapons),weaponId:p.noWeapons?null:(p.weaponId||null),naturalDamage:p.naturalDamage||null,attacks:Array.isArray(p.attacks)?p.attacks.map(a=>({...a})):null,specialAttack:p.specialAttack||null,specialRules:p.specialRules||null,tacticalRole:p.tacticalRole||null,meleeRangePreference:p.meleeRangePreference||null,damageMod:p.damageMod||0,daylightPenalty:p.daylightPenalty||0,immuneSleep:Boolean(p.immuneSleep),immuneCharm:Boolean(p.immuneCharm),immuneHold:Boolean(p.immuneHold),immuneColdSpell:Boolean(p.immuneColdSpell),immuneMind:Boolean(p.immuneMind),immunePoison:Boolean(p.immunePoison),immuneParalysis:Boolean(p.immuneParalysis),immuneSound:Boolean(p.immuneSound),immuneEnergyDrain:Boolean(p.immuneEnergyDrain),sporacleDefense:p.sporacleDefense&&typeof p.sporacleDefense==='object'?JSON.parse(JSON.stringify(p.sporacleDefense)):null,regeneration:p.regeneration&&typeof p.regeneration==='object'?JSON.parse(JSON.stringify(p.regeneration)):null,hydraVariant:p.hydraVariant&&typeof p.hydraVariant==='object'?JSON.parse(JSON.stringify(p.hydraVariant)):null,hydraHeadCount:Number(p.hydraHeadCount||p.parameterResolution?.heads)||null,sporacleRegeneration:p.sporacleRegener
16311:     monster.rawSaveAs=p.rawSaveAs??null;
16312:     if(monster.wingedWarriorTraits)ensureWingedWarriorState(monster,{create:true});
16313:     if(monster.woodImpTraits)ensureWoodImpState(monster,{create:true});
16314:     if(monster.hugeWoodSpiderTraits)ensureHugeWoodSpiderState(monster,{create:true});
16315:     if(monster.wychlampTraits)ensureWychlampState(monster,{create:true});
16316:     monster.className=p.className??null;
16317:     monster.level=p.level??null;
16318:     if(monster.araneaSpellcasting){monster.className=String(monster.araneaSpellcasting.casterClass||'Magic-User');monster.level=Math.max(1,Number(monster.araneaSpellcasting.casterLevel)||3);monster.spellbook=[];monster.preparedSpells=[];monster.pendingPreparedSpells=[];monster.araneaSpellState={spellbookDeclared:false,preparationDeclared:false,source:monster.araneaSpellcasting.source||'DMR2 Creature Catalog'};}
16319:     if(monster.huptzeenTraits)ensureHuptzeenSpellState(monster,{create:true,reset:true});
16320:     if(monster.oardTraits)ensureOardState(monster,{create:true,reset:true});
16321:     if(monster.phygoraxTraits)ensurePhygoraxState(monster,{create:true,reset:true});
16322:     monster.possessionHost=p.possessionHost&&typeof p.possessionHost==='object'?JSON.parse(JSON.stringify(p.possessionHost)):null;
16323:     if(monster.possessionTraits)ensurePossessionState(monster,{create:true,reset:true});
16324:     if(monster.reflecterTraits)ensureReflecterState(monster,{create:true,reset:true});
16325:     if(monster.sacrolTraits)ensureSacrolState(monster,{create:true,reset:true});
16326:     if(monster.stalwartTraits)ensureStalwartState(monster,{create:true,reset:true});
16327:     if(monster.brainCollectorSpells)monster.brainCollectorSpellState={sequence:0,brains:[],source:monster.brainCollectorSpells.source||'DMR2 Creature Catalog'};
16328:     if(monster.faedorneMagic){monster.className=String(monster.faedorneMagic.spellcasting?.casterClass||'Magic-User');monster.level=Math.max(1,Number(monster.faedorneMagic.spellcasting?.casterLevel)||12);monster.spellbook=[];monster.preparedSpells=[];monster.pendingPreparedSpells=[];monster.faedorneMagicState={spellbookDeclared:false,preparationDeclared:false,shiningIsleContextSpecified:false,onShiningIsle:false,clairvoyanceDay:null,clairvoyanceUses:0,summonSequence:0,summons:[],source:monster.faedorneMagic.source||'DMR2 Creature Catalog'};}
16329:     if(monster.randaraMagic){monster.className=String(monster.randaraMagic.spellcasting?.casterClass||'Cleric');monster.level=Math.max(1,Number(monster.randaraMagic.spellcasting?.casterLevel)||11);monster.spellbook=randaraClericKnownSpells();monster.preparedSpells=[];monster.pendingPreparedSpells=[];monster.randaraState={preparationDeclared:false,currentForm:'natural',formDescription:null,originalAppearance:null,charmDay:null,charmUses:0,source:monster.randaraMagic.source||'DMR2 Creature Catalog'};}
16330:     if(monster.mesmerTraits)monster.mesmerState={charmRound:null,charmUses:0,reflectionSequence:0,reflections:[],source:monster.mesmerTraits.source||'DMR2 Creature Catalog'};
16331:     if(monster.hephaestonTraits)monster.hephaestonState={secondaryRound:null,secondaryKind:null,wallDay:null,wallUses:0,sequence:0,heatedObjects:[],levitations:[],pendingThrows:[],source:monster.hephaestonTraits.source||'DMR2 Creature Catalog'};
16332:     if(monster.magenTraits)ensureMagenState(monster,{create:true});
16333:     if(monster.velyaTraits){ensureVelyaState(monster,{create:true});applyVelyaFormProfile(monster,{announce:false,normalizing:true});}
16334:     if(monster.waterWeirdTraits)ensureWaterWeirdState(monster,{create:true});
16335:     monster.saveOverrides=p.saveOverrides?{...p.saveOverrides}:null;
16336:     for(const field of ['saveDeath','saveWands','saveParalysis','saveBreath'])if(Number.isFinite(p[field]))monster[field]=p[field];
16337:     monster.attackBonus=Number(p.attackBonus)||0;
16338:     monster.recordId=p.recordId||null;
16339:     monster.catalogAuthority=p.supplementalSourceProfile?'supplemental-source-profile':p.moduleExtension?'smoking-pillar-extension':'workbook-600';
16340:     monster.parameterResolution=p.parameterResolution||null;
16341:     monster.minimumConstructionCostGp=Number.isFinite(Number(p.minimumConstructionCostGp))?Number(p.minimumConstructionCostGp):null;
16342:     monster.oardLoadout=p.oardLoadout&&typeof p.oardLoadout==='object'?JSON.parse(JSON.stringify(p.oardLoadout)):null;
16343:     monster.normalHumanNpcAdapter=p.normalHumanNpcAdapter&&typeof p.normalHumanNpcAdapter==='object'?JSON.parse(JSON.stringify(p.normalHumanNpcAdapter)):null;
16344:     if(monster.normalHumanNpcAdapter)monster.profession=monster.normalHumanNpcAdapter.profession||null;
16345:     if(monster.hydraVariant){monster.hydraHeadCount=Math.max(1,Number(monster.hydraHeadCount)||Math.round(Number(monster.hd)||Number(monster.hydraVariant.headsMin)||5));syncHydraHeadAttacks(monster);if(monster.hydraVariant.kind==='regenerating')regeneratingHydraState(monster,{create:true});}
16346:     monster.loreId=lore?.monsterId||null;
16347:     monster.rawNoAppearing=p.rawNoAppearing||null;
16348:     monster.source=p.source||null;
16349:     monster.sourcePage=p.sourcePage??null;
16350:     monster.directCombatEligible=p.directCombatEligible!==false;
16351:     monster.automationReadiness=p.automationReadiness||monsterAutomationReadiness(p);
16352:     if(monster.phantom)ensureMonsterPhantomState(monster,{create:true});
16353:     if(!monster.normalHumanNpcAdapter)applyMonsterInstanceLoadout(monster,p);
16354:     monster.appearance=monsterAppearanceVariant(monster,index);
16355:     return monster;
16356:   }
16357:
16358:   function monsterAppearanceVariant(monster,index=1){
16359:     const profile=COMBAT_MONSTERS[monster?.type]||monster||{};
16360:     const base=String(monster?.armorDesc||profile.armorDesc||'its visible body and equipment').replace(/[.;]+$/,'');
16361:     const low=String(profile.kind||'monster').toLowerCase();
16362:     const variants=low==='undead'
16363:       ? ['with a cracked helm hanging sideways','with damp rags clinging to its frame','with an old weapon gripped in discolored hands','with roots and grave soil caught about it','with one side blackened by an ancient burn','with the remnants of a corroded belt and scabbard']
16364:       : low==='humanoid'
16365:         ? ['carrying travel-stained gear','marked by old repairs and mismatched fittings','with a weathered cloak or hide mantle','bearing the scars of earlier fighting','with cord, pouches, and field tools at the belt','wearing a distinctive token of its band']
16366:         : low==='animal'
16367:           ? ['with a torn ear and old flank scars','with mud darkening its lower body','moving lean and alert','with a pale patch across the face','with burrs and leaves caught in its coat','showing a fresh scrape along one side']
16368:           : low==='construct'
16369:             ? ['with uneven repairs along its joints','with one surface darkened and cracked','bearing a maker-mark on its torso','with cord or wire binding an old fracture','with mismatched replacement pieces','with dust packed into its seams']
16370:             : ['with a distinctive scar or broken edge','showing signs of its local terrain','with an irregular patch of color','bearing evidence of an old injury','moving with a noticeably different rhythm','with debris caught against its outer surface'];
16371:     return `${base}, ${variants[(Math.max(1,Number(index)||1)-1)%variants.length]}`;
16372:   }
16373:
16374:   function encounterAutomationNotice(monsters){
16375:     const statuses=[...new Set((monsters||[]).map(m=>m.automationReadiness).filter(Boolean))];
