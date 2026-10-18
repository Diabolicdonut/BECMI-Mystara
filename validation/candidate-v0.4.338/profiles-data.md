# v0.4.338 profiles-data source snippets

## Production HTML lines 12420-12540

12420:   }
12421:   function hdHpKind(raw,hd){
12422:     const text=String(raw||'').trim();
12423:     // A parenthetical hit-point range (for example “1/2 (1-4 hp)”) is not a
12424:     // fixed-HP creature. Only an entry beginning with an explicit hp value is.
12425:     const fixed=text.match(/^(\d+)\s*hp(?:\s*fixed)?\b/i); if(fixed)return fixed[1]+' hp fixed';
12426:     if(hd<1)return hd<=.25?'1d2':hd<=.5?'1d4':'1d6';
12427:     const modifierMatch=text.match(/^\s*(\d+)\s*([+-])\s*(\d+)/);
12428:     const modifier=modifierMatch&&(modifierMatch[2]==='+'||Number(modifierMatch[1])>=Number(modifierMatch[3]))?modifierMatch:null;
12429:     return Math.max(1,Math.round(hd))+'d8'+(modifier?modifier[2]+modifier[3]:'');
12430:   }
12431:   function becmiThac0(hd){
12432:     if(hd<2)return 19;if(hd<3)return 18;if(hd<4)return 17;if(hd<6)return 16;if(hd<7)return 15;if(hd<9)return 14;if(hd<10)return 13;if(hd<11)return 12;if(hd<13)return 11;if(hd<14)return 10;if(hd<15)return 9;if(hd<17)return 8;if(hd<18)return 7;if(hd<19)return 6;if(hd<21)return 5;return Math.max(1,5-Math.floor((hd-20)/2));
12433:   }
12434:   function becmiSaveProfile(raw,hd=null,character=null){
12435:     const text=String(raw||'').trim();
12436:     const formula=/^([FCT])\s*=\s*(half\s+)?HD$/i.exec(text);
12437:     if(formula&&Number.isFinite(hd)&&hd>0)return classSaveValues(({F:'Fighter',C:'Cleric',T:'Thief'})[formula[1].toUpperCase()],Math.max(1,Math.ceil(hd/(formula[2]?2:1))));
12438:     if(/^Fighter at twice HD$/i.test(text)&&Number.isFinite(hd)&&hd>0)return classSaveValues('Fighter',Math.ceil(hd*2));
12439:     if(/^(?:By class(?: and |\/)level|Character class and level|Former character class at equivalent level)$/i.test(text)&&character?.className&&CLASS_SAVE_BANDS[character.className]&&Number(character.level)>0)return classSaveValues(character.className,Number(character.level));
12440:     if(/^Elf of same level$/i.test(text)&&Number(character?.level)>0)return classSaveValues('Elf',Number(character.level));
12441:
12442:     if(/^(?:normal\s+(?:man|human)|NM|F(?:ighter)?\s*:?\s*0)\b/i.test(text))return {death:14,wands:15,paralysis:16,breath:17,spells:17};
12443:     const match=/^(fighter|cleric|magic[ -]?user|thief|dwarf|elf|halfling|MU|[FCMTDEH])\s*:?\s*(\d+)\b/i.exec(text);
12444:     if(!match)return null;
12445:     const code=match[1].toUpperCase().replace(/[ -]/g,''),classes={F:'Fighter',FIGHTER:'Fighter',C:'Cleric',CLERIC:'Cleric',M:'Magic-User',MU:'Magic-User',MAGICUSER:'Magic-User',T:'Thief',THIEF:'Thief',D:'Dwarf',DWARF:'Dwarf',E:'Elf',ELF:'Elf',H:'Halfling',HALFLING:'Halfling'};
12446:     const level=Number(match[2]);if(level<1||level>36)return null;
12447:     return classSaveValues(classes[code],level);
12448:   }
12449:   function becmiSaveSpells(raw,hd){
12450:     const saves=becmiSaveProfile(raw,hd);return saves?saves.spells:16;
12451:   }
12452:   function monsterSaveTarget(monster,type){
12453:     const key=({poison:'death',petrification:'paralysis',dragonBreath:'breath'})[type]||type;
12454:     const source=typeof COMBAT_MONSTERS!=='undefined'?COMBAT_MONSTERS[monster.type]:null;
12455:     const parsed=becmiSaveProfile(monster.rawSaveAs??source?.rawSaveAs,Number(monster.hd),monster);
12456:     const explicit=monster.saveOverrides?.[key];
12457:     if(Number.isFinite(explicit))return explicit;
12458:     if(parsed&&Number.isFinite(parsed[key]))return parsed[key];
12459:     const legacy={death:monster.saveDeath??monster.savePoison,wands:monster.saveWands,paralysis:monster.saveParalysis,breath:monster.saveBreath,spells:monster.saveSpells};
12460:     return Number.isFinite(legacy[key])?legacy[key]:null;
12461:   }
12462:   function encounterMove(record){
12463:     const fields=['movementGround','movementFlyingAir','movementWater','movementBurrowing','movementWeb','movementThroughRock','movementOnIce','movementInTrees','movementMounted','movementDrifting'];
12464:     for(const field of fields){const text=String(record[field]||'');const inner=text.match(/\((\d+)\s*['’]?\)/);if(inner)return Number(inner[1]);const outer=text.match(/(\d+)\s*['’]?/);if(outer)return Math.max(0,Math.round(Number(outer[1])/3));}return 0;
12465:   }
12466:   function classicDamageExpression(minimum,maximum){
12467:     const min=Number(minimum),max=Number(maximum);
12468:     if(!Number.isFinite(min)||!Number.isFinite(max)||min<0||max<min)return null;
12469:     if(min===max)return String(min);
12470:     // Find the conventional dice expression with the fewest dice, preferring
12471:     // an unmodified expression. This translates classic 1-6 / 2-8 notation
12472:     // without treating the first number as fixed damage.
12473:     const candidates=[];
12474:     for(let count=1;count<=12;count++)for(let sides=2;sides<=20;sides++){
12475:       const mod=min-count;
12476:       if(count*sides+mod===max)candidates.push({count,sides,mod,score:Math.abs(mod)*100+count*10+sides});
12477:     }
12478:     if(!candidates.length)return null;
12479:     candidates.sort((a,b)=>a.score-b.score);const c=candidates[0];
12480:     return c.count+'d'+c.sides+(c.mod>0?'+'+c.mod:c.mod<0?String(c.mod):'');
12481:   }
12482:   function safeDamage(value){
12483:     const text=String(value||'').replace(/\b[Ii]d(?=\d)/g,'1d').replace(/[×x]\s*(\d+)/g,'*$1').trim();
12484:     if(/by weapon/i.test(text))return '1d6';
12485:     const dice=text.match(/\d*d\d+(?:\s*[+-]\s*\d+)?/i);if(dice)return dice[0].replace(/\s+/g,'');
12486:     const range=text.match(/^(\d+)\s*[-–—]\s*(\d+)(?:\b|\s|\()/);if(range)return classicDamageExpression(range[1],range[2])||'0';
12487:     const fixed=text.match(/^(\d+)$/);return fixed?fixed[1]:'0';
12488:   }
12489:   function canonicalAttacks(record){
12490:     const rawAttacks=String(record.attacks||'attack').split(/;|\bor\b/i)[0];
12491:     const rawDamage=String(record.damage||'').split(/;|\bor\b/i)[0];
12492:     if(/nil|none|confusion|special/i.test(rawDamage)&&!/[0-9]d[0-9]/i.test(rawDamage))return [{name:rawAttacks||'special effect',damage:'0',refereeMediated:true}];
12493:     const names=rawAttacks.split('/').map(s=>s.trim()).filter(Boolean),damages=rawDamage.split('/').map(s=>safeDamage(s));
12494:     const out=[];
12495:     names.forEach((label,i)=>{const count=Math.min(9,Math.max(1,firstRuleNumber(label,1)));const name=label.replace(/^\s*\d+\s*/,'').trim()||'attack';for(let n=0;n<count;n++)out.push({name,damage:damages[Math.min(i,damages.length-1)]||safeDamage(rawDamage)});});
12496:     return out.length?out:[{name:'special effect',damage:safeDamage(rawDamage),refereeMediated:true}];
12497:   }
12498:   function canonicalKind(record){const t=String(record.monsterType||'monster').toLowerCase();if(/undead/.test(t))return'undead';if(/human|humanoid|demihuman/.test(t))return'humanoid';if(/animal/.test(t))return'animal';if(/construct|enchanted/.test(t))return'construct';if(/lowlife/.test(t))return'lowlife';return'monster';}
12499:   function legacyHintFor(record,key){
12500:     const exact=LEGACY_IMPLEMENTATION_PROFILES[key];if(exact)return exact;
12501:     const target=normalizeMonsterLoreText(record.name).split(' ').sort().join(' ');
12502:     return Object.values(LEGACY_IMPLEMENTATION_PROFILES).find(p=>normalizeMonsterLoreText(p.name).split(' ').sort().join(' ')===target)||null;
12503:   }
12504:   function monsterAutomationReadiness(profile){
12505:     if(profile.moduleExtension)return profile.specialAttack?'module-automated':'module-ready';
12506:     if(profile.parameterized)return 'parameterized';
12507:     if(profile.specialAttack)return 'handler-backed';
12508:     if(profile.variableWeapon)return 'loadout-ready';
12509:     const attacks=Array.isArray(profile.attacks)?profile.attacks:[];
12510:     const zeroOnly=attacks.length&&attacks.every(a=>Number(safeDamage(a.damage))===0);
12511:     const mediated=attacks.some(a=>a.refereeMediated)||zeroOnly;
12512:     return mediated?'referee-required':'automated';
12513:   }
12514:   function encounterRateFromMovementField(value){
12515:     const text=String(value||'');
12516:     const inner=text.match(/\((\d+)\s*['’]?\)/); if(inner)return Number(inner[1]);
12517:     const outer=text.match(/(\d+)\s*['’]?/); if(outer)return Math.max(0,Math.round(Number(outer[1])/3));
12518:     return 0;
12519:   }
12520:   function canonicalMovementModes(record){
12521:     return {
12522:       ground:encounterRateFromMovementField(record.movementGround),
12523:       fly:encounterRateFromMovementField(record.movementFlyingAir),
12524:       swim:encounterRateFromMovementField(record.movementWater),
12525:       burrow:encounterRateFromMovementField(record.movementBurrowing),
12526:       web:encounterRateFromMovementField(record.movementWeb),
12527:       throughRock:encounterRateFromMovementField(record.movementThroughRock),
12528:       ice:encounterRateFromMovementField(record.movementOnIce),
12529:       trees:encounterRateFromMovementField(record.movementInTrees),
12530:       mounted:encounterRateFromMovementField(record.movementMounted),
12531:       drift:encounterRateFromMovementField(record.movementDrifting)
12532:     };
12533:   }
12534:   function canonicalProfile(record){
12535:     const key=canonicalMonsterKey(record.name),parameterized=/parameterized|variable/i.test(String(record.sourceStatus||'')),hd=Math.max(.125,firstRuleNumber(record.hitDice,1)),hint=legacyHintFor(record,key)||{},extra=BASE_IMPLEMENTATION_HINTS[key]||{};
12536:     const protection=/hard/i.test(String(record.protection||''))?'hard':'soft',role=String(record.flexAiRole||'soldier').toLowerCase().replace(/[^a-z-]+/g,'_');
12537:     const profile={key,name:record.name,recordId:record.monsterId,catalogAuthority:'workbook-600',moduleExtension:false,source:record.primarySource,sourcePage:record.page,secondarySource:record.secondarySource,secondarySourcePage:record.secondarySourcePage,statQuality:'Authoritative 600-entry workbook',profileType:'base',directCombatEligible:true,parameterized,rawAc:record.armorClass,rawHd:record.hitDice,rawMorale:record.morale,rawAttacks:record.attacks,rawDamage:record.damage,rawSaveAs:record.saveAs,rawNoAppearing:record.numberAppearing,rcSizeCode:record.rcSizeCode,terrain:record.terrain,equipmentGuidance:record.equipmentWeaponAssignment,monsterType:record.monsterType||'',ac:firstRuleNumber(record.armorClass,9),hd,hpKind:hdHpKind(record.hitDice,hd),move:encounterMove(record),moveModes:{...canonicalMovementModes(record),...(extra.moveModes&&typeof extra.moveModes==='object'?extra.moveModes:{})},thac0:becmiThac0(hd),morale:firstRuleNumber(record.morale,7),intelligence:Number.isFinite(Number(extra.intelligence))?Number(extra.intelligence):(Number.isFinite(Number(hint.intelligence))?Number(hint.intelligence):3),alignment:record.alignment||'Neutral',xp:Math.max(0,firstRuleNumber(record.xp,0)),saveSpells:becmiSaveSpells(record.saveAs,hd),size:String(record.sizeMonster||'Medium').toLowerCase(),sizeProfile:{monster:String(record.sizeMonster||'Medium').toLowerCase(),vessel:String(record.sizeVessel||'Small').toLowerCase(),structure:String(record.sizeStructure||'Small').toLowerCase()},influenceRadiusFt:influenceRadiusForSizeCode(record.rcSizeCode,record.sizeMonster),influenceDiameterFt:influenceRadiusForSizeCode(record.rcSizeCode,record.sizeMonster)*2,nativeScale:'monster',protection,kind:canonicalKind(record),attacks:Array.isArray(extra.attacks)?extra.attacks.map(a=>({...a})):ca
12538:     // Some catalogue entries print separate statistics for a body/base and its
12539:     // attack appendages. A source-specific implementation hint may identify the
12540:     // body statistics without changing the authoritative raw catalogue fields.

## Production HTML lines 15065-15145

15065:     const rows=MASTERY_RARE_THROW_RANGES[masteryWeaponKey(item)];if(!rows)return null;
15066:     return rows[Math.max(0,masteryRankIndex(item.masteryRank)-1)]||null;
15067:   }
15068:
15069:   function masteryWeaponKey(item){
15070:     if(item?.itemId==='sword_bastard'&&item?.masteryUseMode==='twohanded')return 'sword_bastard_twohanded';
15071:     return ({sword:'sword_normal',dagger_silver:'dagger',torch:'club'})[item?.itemId]||item?.itemId;
15072:   }
15073:
15074:   // Mentzer Master pp.18-22. Shield weapons are weapon/shield hybrids. The
15075:   // source leaves the variable number of blades to the equipment instance; the
15076:   // engine therefore starts at the minimum guaranteed count and permits an
15077:   // explicit referee/player configuration within the printed range.
15078:   const MASTERY_SHIELD_WEAPONS=Object.freeze({
15079:     shield_horned:{minBlades:1,maxBlades:1,breakable:false,offhand:true},
15080:     shield_knife:{minBlades:1,maxBlades:2,breakable:true,offhand:true},
15081:     shield_sword:{minBlades:1,maxBlades:2,breakable:true,offhand:true},
15082:     shield_tusked:{minBlades:1,maxBlades:5,breakable:true,offhand:false,twoHanded:true}
15083:   });
15084:   function isMasteryShieldWeaponId(id){return Boolean(MASTERY_SHIELD_WEAPONS[id]);}
15085:   function ensureShieldWeaponState(pc,itemId){
15086:     const profile=MASTERY_SHIELD_WEAPONS[itemId];if(!pc||!profile)return null;
15087:     if(!pc.shieldWeaponStates||typeof pc.shieldWeaponStates!=='object'||Array.isArray(pc.shieldWeaponStates))pc.shieldWeaponStates={};
15088:     const current=pc.shieldWeaponStates[itemId]&&typeof pc.shieldWeaponStates[itemId]==='object'?pc.shieldWeaponStates[itemId]:{};
15089:     const blades=Math.max(profile.minBlades,Math.min(profile.maxBlades,Number(current.bladeCount)||profile.minBlades));
15090:     const usable=Math.max(0,Math.min(blades,current.usableBlades==null?blades:Number(current.usableBlades)||0));
15091:     pc.shieldWeaponStates[itemId]={...current,bladeCount:blades,usableBlades:profile.breakable?usable:blades};
15092:     return pc.shieldWeaponStates[itemId];
15093:   }
15094:   function shieldWeaponRecord(pc){
15095:     if(!pc)return null;
15096:     if(pc.equippedShieldWeapon?.itemId&&isMasteryShieldWeaponId(pc.equippedShieldWeapon.itemId))return pc.equippedShieldWeapon;
15097:     if(pc.equippedWeapon?.itemId&&isMasteryShieldWeaponId(pc.equippedWeapon.itemId))return pc.equippedWeapon;
15098:     return null;
15099:   }
15100:   function equippedShieldWeaponItem(pc){
15101:     const rec=shieldWeaponRecord(pc),id=rec?.itemId,item=id?SHOP_ITEMS[id]:null;if(!item)return null;
15102:     const blades=ensureShieldWeaponState(pc,id);
15103:     return {...item,...rec,itemId:id,masteryRank:weaponMasteryRank(pc,id),bladeState:blades};
15104:   }
15105:   function shieldWeaponHasUsableBlade(pc,itemId=null){const item=itemId?{itemId}:equippedShieldWeaponItem(pc);const id=item?.itemId,stateRow=id?ensureShieldWeaponState(pc,id):null;return Boolean(stateRow&&stateRow.usableBlades>0);}
15106:   function configureShieldWeaponBlades(pc,itemId,count,{announce=true}={}){
15107:     const profile=MASTERY_SHIELD_WEAPONS[itemId];if(!pc||!profile)return false;
15108:     const n=Math.floor(Number(count));if(!Number.isFinite(n)||n<profile.minBlades||n>profile.maxBlades){if(announce)write(`${SHOP_ITEMS[itemId]?.name||itemId} must have ${profile.minBlades===profile.maxBlades?profile.minBlades:`${profile.minBlades}-${profile.maxBlades}`} blade${profile.maxBlades===1?'':'s'} under the Master description.`,'warning');return false;}
15109:     const row=ensureShieldWeaponState(pc,itemId);row.bladeCount=n;row.usableBlades=Math.min(n,Math.max(0,Number(row.usableBlades)||n));if(row.usableBlades===0&&n>0)row.usableBlades=n;
15110:     if(announce)write(`${pc.name}'s ${SHOP_ITEMS[itemId].name} is recorded with ${n} blade${n===1?'':'s'}; ${row.usableBlades} currently usable.`,'system');return true;
15111:   }
15112:
15113:   // Mentzer Master p.18: optional individualized polearms inherit the listed
15114:   // parent weapon statistics while retaining their own training/proficiency ID.
15115:   // Matrix-mode damage remains the Arms Across Eras profile for the actual weapon.
15116:   const MASTERY_DERIVED_PROFILES=Object.freeze({
15117:     bardiche:{damage:'halberd',defense:'halberd',deflect:'pike',special:'halberd',set:true},
15118:     bill:{damage:'poleaxe',defense:'poleaxe',deflect:'poleaxe',special:'poleaxe',hook:true},
15119:     gisarme:{damage:'pike',defense:'pike',deflect:'pike',special:'pike',hook:true},
15120:     glaive:{damage:'poleaxe',defense:'poleaxe',deflect:'poleaxe',special:'poleaxe',doubleDamage:true,set:true},
15121:     lochaber_axe:{damage:'halberd',defense:'halberd',deflect:'halberd',special:'halberd',hook:true,disarm:'basic',stunHigh:true},
15122:     partizan:{damage:'pike',defense:'pike',deflect:'pike',special:'pike',disarm:'basic',set:true},
15123:     ranseur:{damage:'halberd',defense:'halberd',deflect:'halberd',special:'halberd',disarm:'skilled',set:true},
15124:     spetum:{damage:'pike',defense:'pike',deflect:'pike',special:'pike',disarm:'skilled',set:true},
15125:     spontoon:{damage:'spear',defense:'spear',deflect:'halberd',special:'spear',doubleDamage:true,set:true,neverThrown:true},
15126:     voulge:{damage:'poleaxe',defense:'poleaxe',deflect:'halberd',special:'poleaxe',doubleDamage:true,damageBonus:2}
15127:   });
15128:   function masteryTableKey(item,aspect='damage'){const key=masteryWeaponKey(item),profile=MASTERY_DERIVED_PROFILES[key];return profile?.[aspect]||key;}
15129:   function masteryAddFlatDamage(expression,bonus){const n=Number(bonus)||0;return n?`${expression}${n>0?'+':''}${n}`:expression;}
15130:   function masteryDamageExpression(item,target){
15131:     if(!state.rules?.weaponMastery||!item?.masteryRank)return null;
15132:     const actualKey=masteryWeaponKey(item),profile=MASTERY_DERIVED_PROFILES[actualKey],row=MASTERY_DAMAGE_ROWS[masteryTableKey(item,'damage')];if(!row)return null;
15133:     const pair=row[Math.max(1,masteryRankIndex(item.masteryRank))].split('/');
15134:     let result;
15135:     if(row[0]==='A'||pair.length===1)result=pair[0];
15136:     else if(masteryTargetIsMixed(target)){const a=pair[0],b=pair[1]||pair[0];result=averageDamageExpression(a)<=averageDamageExpression(b)?a:b;}
15137:     else result=masteryOpponentClass(target)===row[0]?pair[0]:(pair[1]||pair[0]);
15138:     return masteryAddFlatDamage(result,profile?.damageBonus||0);
15139:   }
15140:
15141:   // RC pp. 78-80. Defense entries: attacker category, AC reduction, attack limit.
15142:   const MASTERY_DEFENSE_ROWS={
15143:     axe_battle:[null,['M',2,2],['M',3,2],['M',3,3],['M',4,4]],
15144:     club:[null,['A',1,2],['A',2,2],['A',3,3],['A',4,4]],
15145:     hammer_war:[null,['M',2,2],['M',3,3],['M',4,3],['M',5,4]],

## Production HTML lines 15488-15512

15488:   function masterySkewerLimit(rank){return ({skilled:4,expert:7,master:9,'grand master':9})[rank]||0;}
15489:   function resolveMasterySkewer(attacker,target,item,rank){
15490:     const limit=masterySkewerLimit(rank);if(!limit||masteryTargetMetric(target)>limit){write(`${target.name} exceeds the ${limit||0}-Hit-Die effective Weapon Mastery skewer limit.`,'warning');return false;}
15491:     const e=masteryStatus(target);e.skewered={rounds:rng(4)+4,source:item.name,attacker:attacker.name,appliedRound:Number(state.combat?.round)||1};write(`${target.name} is skewered by ${item.name}; the weapon is stuck for ${e.skewered.rounds} rounds and inflicts 1d6 automatic damage each subsequent round.`,'error');return true;
15492:   }
15493:   function masteryMaximumDamageExpression(expression){
15494:     let source=String(expression??'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/\s+/g,'').replace(/−/g,'-');if(!source||source==='nil'||source==='none')return 0;
15495:     const pieces=source.match(/[+-]?[^+-]+/g)||[];let total=0;
15496:     for(let raw of pieces){let sign=1;if(raw[0]==='+')raw=raw.slice(1);else if(raw[0]==='-'){sign=-1;raw=raw.slice(1);}const d=/^(\d*)d(\d+)$/.exec(raw);if(d)total+=sign*Math.max(1,Number(d[1]||1))*Number(d[2]);else if(/^\d+(?:\.\d+)?$/.test(raw))total+=sign*Number(raw);}
15497:     return Math.max(0,total);
15498:   }
15499:   function minimumDamageExpression(expression){
15500:     let source=String(expression??'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/\s+/g,'').replace(/−/g,'-');if(!source||source==='nil'||source==='none')return 0;
15501:     const pieces=source.match(/[+-]?[^+-]+/g)||[];let total=0;
15502:     for(let raw of pieces){let sign=1;if(raw[0]==='+')raw=raw.slice(1);else if(raw[0]==='-'){sign=-1;raw=raw.slice(1);}const d=/^(\d*)d(\d+)$/.exec(raw);if(d)total+=sign*Math.max(1,Number(d[1]||1));else if(/^\d+(?:\.\d+)?$/.test(raw))total+=sign*Number(raw);}
15503:     return Math.max(0,total);
15504:   }
15505:   function masteryDespairAttackerKey(attacker){return attacker?.type?`monster:${attacker.id||attacker.name}`:`pc:${String(attacker?.name||'unknown').toLowerCase()}`;}
15506:   function masteryActorRank(attacker,item){return attacker?.type?monsterWeaponMasteryRank(attacker):weaponMasteryRank(attacker,item);}
15507:   function masteryDespairMoraleCheck(victim,attacker,item){
15508:     if(!victim)return {eligible:false,failed:false,rolls:[]};
15509:     const round=Math.max(1,Number(state.combat?.round)||1);
15510:     if(!victim.type){
15511:       const save=masteryEffectSave(victim,'death',0,`Weapon Mastery despair from ${attacker.name}`),failed=!save.success;
15512:       write(`${attacker.name}'s ${item.name} mastery inspires despair in ${victim.name}; ${victim.name} makes a Saving Throw vs. Death Ray.`,'system');
