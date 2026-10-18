# v0.4.338 damage-pc source snippets

## Production HTML lines 18390-18495

18390:     if(!item && kind==='missile'){ write(`${pc.name} has no equipped missile weapon.`,'warning'); return; }
18391:     if(kind==='missile'){
18392:       if(!missileCapable(item)){ write(`${pc.name}'s ${item.name} is not currently being treated as a missile weapon in this core pass.`, 'warning'); return; }
18393:       if(!underwaterMissileAllowed(pc,item)){write(`${item.name} will not function underwater; only a crossbow made for undersea use can fire there.`,'warning');return;}
18394:       if(pcCurrentlyEngaged(pc) && item?.missile){ write(`${pc.name} is engaged hand-to-hand and cannot use a missile-fire device at melee distance.`,'warning'); return; }
18395:       if(item.itemId==='burning_oil'&&!hasWorkingLight()){ write(`${pc.name} needs a burning torch, lantern, or similar lit object to ignite and throw the oil in one round.`,'warning'); return; }
18396:       if(item.itemId==='crossbow_heavy' && (pc.abilities?.str??10)<18 && pc.heavyCrossbowNeedsReload){
18397:         pc.heavyCrossbowNeedsReload=false;
18398:         write(`${pc.name} spends the missile action reloading the heavy crossbow; Strength below 18 limits it to one shot every two rounds.`,'system'); return;
18399:       }
18400:       const ammo=consumeAmmo(pc,item.itemId); if(!ammo.ok){ write(`${pc.name} has no ${ammo.label}s available for ${item.name}.`,'warning'); return; }
18401:       if(item.itemId==='blowgun_short'||item.itemId==='blowgun_long')item.poisoned=Boolean(ammo.poisoned);
18402:     }
18403:     const expendableThrown=kind==='missile'&&['holy_water','burning_oil'].includes(item?.itemId);
18404:     if(expendableThrown){
18405:       const own=takeOneItem(pc.inventory||[],item.itemId); if(!own&&!consumeInventoryItem(item.itemId,1)){ write(`${pc.name} has no ${item.name} left to throw.`,'warning'); return; }
18406:       if(!(pc.inventory||[]).some(rec=>rec.itemId===item.itemId&&Number(rec.qty)>0)) pc.equippedWeapon=null;
18407:     }
18408:     let masteryThrownRecord=null;
18409:     if(kind==='missile'&&['bola','net_medium'].includes(item?.itemId)){
18410:       masteryThrownRecord=masteryDetachThrownWeapon(pc,item.itemId,monster);
18411:       if(!masteryThrownRecord){write(`${pc.name} has no owned ${item.name} available to throw.`,'warning');return;}
18412:     }
18413:     const order=state.combat?.pcOrders?.[pc.name.toLowerCase()]||{};
18414:     const forbiddenBackstabWeapons=new Set(['staff','spear','polearm','sword_twohanded','axe_battle','bow_short','bow_long','crossbow_light','crossbow_heavy']);
18415:     const backstabReady=kind==='melee' && Boolean(order.backstab) && item && !forbiddenBackstabWeapons.has(item.itemId) && (Boolean(pc.stealthState?.hidden)||state.combat?.surpriseRoundPending==='pc');
18416:     if(order.backstab && !backstabReady) write(`${pc.name} cannot make a BECMI backstab because the target is aware of the approach or the equipped weapon is not a one-handed melee weapon; this resolves as an ordinary attack.`,'warning');
18417:     const strangleVineCaughtPenalty=kind==='melee'&&monster.specialAttack==='strangle_vine'&&strangleVineEntanglement(pc)?.monster.id===monster.id?(Number(strangleVineRule(monster)?.caughtCutPenalty)||-4):0;
18418:     const optionAttackPenalty=(order.action==='smash'?(artifactSmashAttackActive(pc)?-3:-5):order.action==='haymaker'?-5:0)+strangleVineCaughtPenalty;
18419:     const rareThrow=kind==='missile'&&!THROWABLE_WEAPONS.has(item?.itemId)&&Boolean(masteryRareThrowRanges(item));
18420:     const result=paralysisAwareAttackRoll(pc,monster,kind,(kind==='missile'?(rangeBand==='short'?1:rangeBand==='long'?-1:0):0)+(backstabReady?4:0)+optionAttackPenalty,{strengthMissile:rareThrow,thrownMissile:kind==='missile'&&throwableCapable(item)});
18421:     const modText=result.mod?` ${result.mod>0?'+':'-'} ${Math.abs(result.mod)}`:'';
18422:     const attackName=item?.name||'unarmed strike';
18423:     write(`${pc.name} attacks ${monster.name} with ${attackName}: d20 ${result.d20}${modText} = ${result.total} — ${result.hit?'HIT':'miss'}.`);
18424:     if(kind==='melee')shieldWeaponBreakCheck(pc,monster,result,{foeIsAttacker:false});
18425:     if(kind==='missile' && item.itemId==='crossbow_heavy' && (pc.abilities?.str??10)<18) pc.heavyCrossbowNeedsReload=true;
18426:     if(!result.hit){ if(order.backstab) delete pc.stealthState; return; }
18427:     if(kind==='melee')rawTriggerAttackContactContingency(monster,pc,{attackKind:'melee',attackName});
18428:     if(order.action==='disarm'){ resolveDisarm(pc,monster); return; }
18429:     const masteryRank=weaponMasteryRank(pc,item),masteryKey=masteryWeaponKey(item);
18430:     if(order.action==='mastery_disarm'){resolveMasteryDisarm(pc,monster,item,masteryRank);return;}
18431:     if(order.action==='mastery_hook'){
18432:       const damageMod=abilityAdjustment(pc.abilities?.str??10)+effectiveMagicWeaponBonus(pc,item)+artifactBlessBonus(pc)+longDistanceTravelPenalty(),band=rangeBand||'normal',expr=weaponDamageExpressions(item,monster,band),rawExpr=masteryDamageExpression(item,monster)||expr.raw;
18433:       const rawBase=minimumDamageExpression(rawExpr),matrixBase=minimumDamageExpression(expr.matrix),active=state.rules.weaponDamageMode||'RAW',appliedBase=(active==='RAW'||active==='CONTEXT_MATRIX')?rawBase:matrixBase;let dmg={active,rawBase,matrixBase,appliedBase,rawExpr,matrixExpr:expr.matrix,raw:Math.max(0,rawBase+damageMod),matrix:Math.max(0,matrixBase+damageMod),applied:Math.max(0,appliedBase+damageMod)};dmg=applyArtifactWeaponDamageEffect(dmg,pc,damageMod);const strikingBonus=artifactStrikingBonusDamage(pc,item)+rawStrikingBonusDamage(pc,item);if(strikingBonus)dmg={...dmg,raw:dmg.raw+strikingBonus,matrix:dmg.matrix+strikingBonus,applied:dmg.applied+strikingBonus};
18434:       dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);writeWeaponAudit(pc,monster,dmg);write(`${pc.name}'s hook inflicts the minimum ${item.name} damage${strikingBonus?` plus ${strikingBonus} Striking damage`:''}${dmg.greaterWyrdVisionPenalty?' after the Greater Wyrd -3 damage penalty':''}: ${dmg.applied}.`,'system');damageMonster(monster,dmg.applied,`${pc.name}'s ${item.name} hook`,weaponDamageContext(pc,item,kind));if(monsterStillPresent(monster))resolveMasteryHook(pc,monster,item,masteryRank);return;
18435:     }
18436:     if(order.action==='mastery_entangle'&&masteryKey==='whip'){
18437:       masteryAutomaticHitEffects(pc,monster,item,masteryRank,{kind,rangeBand,naturalRoll:result.d20,declaredAction:order.action});
18438:       return;
18439:     }
18440:     if(item.itemId==='holy_water'){
18441:       if(monster.kind!=='undead'){ write(`The holy water splashes ${monster.name}, but BECMI holy water inflicts weapon damage only on undead.`,'warning'); return; }
18442:       const rolled=rng(8),damage=applyGreaterWyrdVisionDamagePenalty(pc,monster,rolled); write(`${pc.name}'s holy water burns the undead creature for ${damage} damage${damage!==rolled?' after the Greater Wyrd vision penalty':''}.`,'system'); damageMonster(monster,damage,`${pc.name}'s holy water`); return;
18443:     }
18444:     if(item.itemId==='burning_oil'){
18445:       const priorBurningRounds=recordedCampaignMinute(monster.burningOilRounds);monster.burningOilRounds=Math.max(2,priorBurningRounds!==null&&priorBurningRounds>0?priorBurningRounds:0);monster.burningOilMastery=Boolean(state.rules?.weaponMastery);
18446:       write(`The flask bursts and ignites across ${monster.name}. It will take 1d8 fire damage in each of two rounds.`,'system'); return;
18447:     }
18448:     if(!item){
18449:       const rolledDamage=Math.max(0,1+abilityAdjustment(pc.abilities?.str??10)+longDistanceTravelPenalty()),damage=applyGreaterWyrdVisionDamagePenalty(pc,monster,rolledDamage);
18450:       if(damage!==rolledDamage)write(`${pc.name}'s failed Greater Wyrd vision save reduces the unarmed damage roll by 3${isGreaterWyrdVisionMonster(monster)?', to a minimum of 1 on a hit':''}.`,'warning');
18451:       write(`${pc.name} deals ${damage} unarmed damage.`); damageMonster(monster,damage,`${pc.name}'s unarmed strike`,{kind:'unarmed',attackKind:'melee'}); return;
18452:     }
18453:     const damageMod=((kind==='melee'||(kind==='missile'&&throwableCapable(item)))?abilityAdjustment(pc.abilities?.str??10):0) + effectiveMagicWeaponBonus(pc,item) + artifactBlessBonus(pc) + longDistanceTravelPenalty();
18454:     const band=kind==='missile'?(rangeBand==='short'?'close':rangeBand==='long'?'far':'normal'):(rangeBand||'normal');
18455:     let dmg=rollComparedWeaponDamage(item,monster,band,backstabReady?0:damageMod,pc);
18456:     dmg=applyArtifactWeaponDamageEffect(dmg,pc,backstabReady?0:damageMod);
18457:     dmg=applyMasteryDoubleDamage(dmg,item,result.d20,backstabReady?0:damageMod,result.hit);
18458:     if(dmg.masteryDoubleDamage)write(`${item.name} mastery doubles weapon damage before Strength and magic modifiers.`,'system');
18459:     if(backstabReady){
18460:       dmg={...dmg,raw:Math.max(0,dmg.raw*2+damageMod),matrix:Math.max(0,dmg.matrix*2+damageMod),applied:Math.max(0,dmg.applied*2+damageMod)};
18461:       write(`${pc.name} strikes from an unnoticed position: +4 to hit and twice the weapon damage before modifiers.`,'system');
18462:     }
18463:     if(order.action==='smash'){ const bonus=Math.max(0,Number(pc.abilities?.str)||0); dmg={...dmg,raw:dmg.raw+bonus,matrix:dmg.matrix+bonus,applied:dmg.applied+bonus}; write(`Smash adds ${bonus} damage from ${pc.name}'s full Strength score.`,'system'); }
18464:     if(order.action==='lance_charge'&&lanceChargeEligible(pc,order,item)){let base=rollComparedWeaponDamage(item,monster,band,0,pc);base=applyArtifactWeaponDamageEffect(base,pc,0);dmg={...dmg,raw:base.raw*2+damageMod,matrix:base.matrix*2+damageMod,applied:base.applied*2+damageMod};write('Mounted Lance Attack doubles the lance roll, then applies Strength and magic modifiers once.','system');}
18465:     if(combatIsUnderwater()&&kind==='melee'&&!underwaterWeaponPierces(item)){dmg={...dmg,raw:Math.floor(dmg.raw/2),matrix:Math.floor(dmg.matrix/2),applied:Math.floor(dmg.applied/2)};write('Cutting, slashing, and smashing weapons inflict half damage underwater.','warning');}
18466:     const masteryFactor=weaponMasteryDamageFactor(pc,item); if(masteryFactor<1){ dmg={...dmg,raw:Math.floor(dmg.raw*masteryFactor),matrix:Math.floor(dmg.matrix*masteryFactor),applied:Math.floor(dmg.applied*masteryFactor)}; write('Unskilled Weapon Mastery use halves damage (round down).','warning'); }
18467:     if(rareThrow){const surprise=rng(6)<=2;let half=false;if(!surprise){const save=masteryEffectSave(monster,'death',0,`rare throw from ${item.name}`);half=Boolean(save.success);}if(half){dmg={...dmg,raw:Math.floor(dmg.raw/2),matrix:Math.floor(dmg.matrix/2),applied:Math.floor(dmg.applied/2)};write(`${monster.name} is not surprised and saves vs. Death Ray, reducing the rarely-thrown weapon damage by half.`,'system');}else write(`${item.name} is used as a rarely-thrown mastery weapon; ${surprise?`${monster.name} is surprised`:`${monster.name} fails the Death Ray save`}, so full damage applies.`,'system');}
18468:     const strikingBonus=artifactStrikingBonusDamage(pc,item)+rawStrikingBonusDamage(pc,item);if(strikingBonus){dmg={...dmg,raw:dmg.raw+strikingBonus,matrix:dmg.matrix+strikingBonus,applied:dmg.applied+strikingBonus};write(`Striking adds ${strikingBonus} magical damage from the enchanted weapon.`,'system');}
18469:     const beforeWyrdDamage=dmg.applied;dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);if(dmg.greaterWyrdVisionPenalty&&dmg.applied!==beforeWyrdDamage)write(`${pc.name}'s failed Greater Wyrd vision save imposes -3 on the damage roll${isGreaterWyrdVisionMonster(monster)?'; a successful hit on the Wyrd still inflicts at least 1 point':''}.`,'warning');
18470:     writeWeaponAudit(pc,monster,dmg); write(`${pc.name} deals ${dmg.applied} damage.`);
18471:     delete pc.stealthState;
18472:     if(monster.specialAttack==='strangle_vine'){resolveStrangleVineWeaponHit(pc,monster,item,dmg.applied);return;}
18473:     const weaponCtx=weaponDamageContext(pc,item,kind,{declaredAction:order.action||null,smashBonus:order.action==='smash'?Math.max(0,Number(pc.abilities?.str)||0):0});
18474:     if(monster.specialAttack==='strangleweed_opposed')resolveStrangleweedAllyWeaponHit(pc,monster,dmg.applied,weaponCtx);else damageMonster(monster,dmg.applied,`${pc.name}'s ${item.name}`,weaponCtx);
18475:     if(monsterStillPresent(monster)){
18476:       masteryAutomaticHitEffects(pc,monster,item,masteryRank,{kind,rangeBand,naturalRoll:result.d20,declaredAction:order.action,thrownRecord:masteryThrownRecord});
18477:       if(order.action==='mastery_skewer'&&masteryKey==='trident'&&monsterStillPresent(monster))resolveMasterySkewer(pc,monster,item,masteryRank);
18478:     }
18479:     maybeTriggerMasteryDespair(pc,monster,item,dmg);
18480:   }
18481:
18482:   function resolveSetSpearVsCharge(pc,monster){
18483:     const order=state.combat?.pcOrders?.[pc.name.toLowerCase()];
18484:     if(order?.action!=='set_spear'||order.setSpearResolved||!monster?.chargedThisRound) return false;
18485:     if(order.targetId&&order.targetId!==monster.id) return false;
18486:     const item=equippedWeaponItem(pc),allowed=new Set(['spear','pike','lance','shield_sword',...Object.entries(MASTERY_DERIVED_PROFILES).filter(([,v])=>v.set).map(([k])=>k)]);
18487:     if(!item||!allowed.has(item.itemId)){ order.setSpearResolved=true; write(`${pc.name} cannot receive the charge because the readied weapon is not a spear, pike, lance, or sword shield.`,'warning'); return true; }
18488:     order.setSpearResolved=true; const result=attackRoll(pc,monster,'melee',0),modText=result.mod?` ${result.mod>0?'+':'-'} ${Math.abs(result.mod)}`:'';
18489:     write(`${pc.name} receives ${monster.name}'s charge with ${item.name}: d20 ${result.d20}${modText} = ${result.total} — ${result.hit?'HIT':'miss'}.`,'system');
18490:     if(!result.hit) return true;
18491:     const damageMod=abilityAdjustment(pc.abilities?.str??10)+effectiveMagicWeaponBonus(pc,item)+artifactBlessBonus(pc)+longDistanceTravelPenalty(),band=getEngagement(pc,monster)?.range||'normal';
18492:     let dmg=rollComparedWeaponDamage(item,monster,band,0,pc); dmg=applyArtifactWeaponDamageEffect(dmg,pc,0); dmg={...dmg,raw:Math.max(0,dmg.raw*2+damageMod),matrix:Math.max(0,dmg.matrix*2+damageMod),applied:Math.max(0,dmg.applied*2+damageMod)};
18493:     dmg=applyGreaterWyrdVisionDamagePacket(pc,monster,dmg);writeWeaponAudit(pc,monster,dmg); write(`Set Spear vs. Charge deals ${dmg.applied} damage: weapon dice doubled, then modifiers applied${dmg.greaterWyrdVisionPenalty?', followed by the Greater Wyrd -3 damage penalty':''}.`,'system'); damageMonster(monster,dmg.applied,`${pc.name}'s set spear vs. charge`,weaponDamageContext(pc,item,'melee')); return true;
18494:   }
18495:
