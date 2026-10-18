# v0.4.338 damage-weapon source snippets

## Production HTML lines 17390-17545

17390:
17391:   function weaponMatrixProfile(item){ return item?.matrixId ? RC_WEAPON_MATRIX[item.matrixId]||null : null; }
17392:
17393:   function weaponHandling(item){
17394:     if(!item) return 'quick';
17395:     if(item.handling==='quick' || item.handling==='cumbersome') return item.handling;
17396:     const matrixSize=String(weaponMatrixProfile(item)?.size||item.size||'').trim().toLowerCase();
17397:     return ['medium-large','large','very large','extra large','huge'].includes(matrixSize)?'cumbersome':'quick';
17398:   }
17399:
17400:   function carriedWeaponRecord(pc,itemId){ return (pc?.inventory||[]).find(r=>r.itemId===itemId&&Number(r.qty)>0)||null; }
17401:   function carriedWeaponCount(pc){ return (pc?.inventory||[]).filter(r=>Number(r.qty)>0&&SHOP_ITEMS[r.itemId]?.kind==='weapon').length; }
17402:   function partyHasWeaponChoices(){ return livingParty().some(pc=>carriedWeaponCount(pc)>1); }
17403:
17404:   function switchPcWeaponInCombat(pc,itemId){
17405:     if(!combatActive() || !state.combat.awaitingWeaponChanges){ write('Weapon changes are only accepted in the post-movement weapon-change window.','warning'); return false; }
17406:     if(!pc || pc.dead || Number(pc.hp)<=0){ write('That adventurer cannot change weapons.','warning'); return false; }
17407:     const item=SHOP_ITEMS[itemId];
17408:     if(!item || item.kind!=='weapon'){ write('That is not a weapon.','warning'); return false; }
17409:     if(!carriedWeaponRecord(pc,itemId)){ write(`${pc.name} is not carrying ${item.name}; expedition or pooled gear is not accessible as an instant combat switch.`,'warning'); return false; }
17410:     if(!classAllowsItem(pc,{...item,itemId})){ write(`${pc.className} cannot use ${item.name} under the current BECMI restrictions.`,'warning'); return false; }
17411:     if(pc.equippedWeapon?.itemId===itemId){ write(`${pc.name} already has ${item.name} readied.`,'system'); return true; }
17412:     equipWeaponRecord(pc,itemId);
17413:     const handling=weaponHandling({...item,itemId});
17414:     if(handling==='cumbersome')pc.attackInitiativeDeferred=true;
17415:     pc.weaponSwitchedThisRound=true;
17416:     const note=handling==='cumbersome'?'CUMBERSOME: this switch defers only the character’s Missile or Hand-to-Hand attack to the end of that phase; movement and all other phases keep their normal initiative.':'QUICK: no attack-initiative penalty.';
17417:     addEvent(`${pc.name} switched weapons to ${item.name} (${handling}).`);
17418:     void refereeLog(`WEAPON SWITCH — round ${state.combat.round}: ${pc.name} → ${item.name}; handling ${handling.toUpperCase()}; ${handling==='cumbersome'?'attack phase deferred':'no initiative change'}.`,{type:'weapon_switch',round:state.combat.round,pc:pc.name,itemId,handling,deferred:handling==='cumbersome'});
17419:     write(`${pc.name} readies ${item.name}. ${note}`,'system'); updatePanels(); return true;
17420:   }
17421:
17422:   function switchPcShieldWeaponInCombat(pc,itemId){
17423:     if(!combatActive()||!state.combat.awaitingWeaponChanges){write('Shield-weapon changes are only accepted in the post-movement weapon-change window.','warning');return false;}
17424:     const item=SHOP_ITEMS[itemId];if(!item||!MASTERY_SHIELD_WEAPONS[itemId]?.offhand){write('That shield weapon cannot be readied off-hand.','warning');return false;}
17425:     if(!carriedWeaponRecord(pc,itemId)||!classAllowsItem(pc,{...item,itemId})){write(`${pc.name} cannot ready ${item.name} off-hand.`,'warning');return false;}
17426:     const primary=equippedWeaponItem(pc);if(!primary?.oneHanded||primary.twoHanded){write(`${pc.name} needs a separate one-handed primary weapon to use ${item.name} for its Master second attack.`,'warning');return false;}
17427:     ensureShieldWeaponState(pc,itemId);pc.equippedShield=false;pc.equippedShieldItem=null;pc.equippedShieldWeapon={itemId,name:item.name,matrixId:item.matrixId};pc.weaponSwitchedThisRound=true;
17428:     write(`${pc.name} readies ${item.name} off-hand. Its Mastery Second Attack is available only while Weapon Mastery is enabled and the shield weapon is at least Basic.`,'system');updatePanels();return true;
17429:   }
17430:
17431:   function pcAttackIsDeferred(pc){ return Boolean(pc?.attackInitiativeDeferred||masteryDelayedThisRound(pc)||mentzerBastardInitiativeLoss(pc)); }
17432:
17433:   function targetProtection(target){
17434:     if(target.type) return target.protection||'soft';
17435:     const form=artifactTransformationProfile(target);if(form)return form.protection||'soft';
17436:     const armorId=target.equippedArmor?.itemId; return SHOP_ITEMS[armorId]?.matrixProtection || 'soft';
17437:   }
17438:   function targetSize(target,scale='monster'){
17439:     if(target?.type) return normalizedTargetSizeProfile(target)[String(scale||'monster').toLowerCase()]||'medium';
17440:     const form=artifactTransformationProfile(target);if(form)return normalizedTargetSizeProfile(form)[String(scale||'monster').toLowerCase()]||'medium';
17441:     return target?.matrixSizeProfile?.[scale]||target?.matrixSize||'medium';
17442:   }
17443:
17444:   function weaponDamageExpressions(item,target,range='normal'){
17445:     const profile=weaponMatrixProfile(item);
17446:     const raw=profile?.rawDamage || '1d2';
17447:     if(!profile) return {raw,matrix:raw};
17448:     const attackScale=String(profile?.scale||item?.attackScale||'monster').toLowerCase();
17449:     const size=targetSize(target,attackScale); const protection=targetProtection(target); const band=RANGE_ORDER.includes(range)?range:'normal';
17450:     const matrix=profile.matrix?.[size]?.[protection]?.[band] ?? raw;
17451:     return {raw,matrix};
17452:   }
17453:
17454:   function averageDamageExpression(expression){
17455:     let source=String(expression??'').trim().toLowerCase();
17456:     if(!source || source==='none' || source==='nil') return 0;
17457:     if(source==='1 dmg' || source==='1 damage') return 1;
17458:     source=source.replace(/\([^)]*\)/g,'').replace(/\s+/g,'').replace(/−/g,'-');
17459:     const pieces=source.match(/[+-]?[^+-]+/g)||[];
17460:     let total=0;
17461:     for(const raw of pieces){
17462:       let piece=raw, sign=1;
17463:       if(piece[0]==='+') piece=piece.slice(1); else if(piece[0]==='-'){ sign=-1; piece=piece.slice(1); }
17464:       const dice=/^(\d*)d(\d+)$/.exec(piece);
17465:       if(dice){ const count=Math.max(1,Number(dice[1]||1)), sides=Number(dice[2]); total+=sign*count*(sides+1)/2; }
17466:       else if(/^\d+(?:\.\d+)?$/.test(piece)) total+=sign*Number(piece);
17467:     }
17468:     return Math.max(0,total);
17469:   }
17470:
17471:   function monsterPreferredMeleeRange(monster,target,currentRange='far'){
17472:     if(!monster) return RANGE_ORDER.includes(currentRange)?currentRange:'far';
17473:     const explicit=String(monster.meleeRangePreference||COMBAT_MONSTERS[monster.type]?.meleeRangePreference||'').toLowerCase();
17474:     if(RANGE_ORDER.includes(explicit)) return explicit;
17475:     if(monster.naturalDamage && !monster.weaponId) return 'close';
17476:     const weapon=monsterWeaponItem(monster);
17477:     const profile=weaponMatrixProfile(weapon);
17478:     if(weapon && profile && target){
17479:       const scores=Object.fromEntries(RANGE_ORDER.map(band=>[band,averageDamageExpression(weaponDamageExpressions(weapon,target,band).matrix)]));
17480:       const best=Math.max(...Object.values(scores));
17481:       const winners=RANGE_ORDER.filter(b=>Math.abs(scores[b]-best)<1e-9);
17482:       if(winners.includes(currentRange)) return currentRange;
17483:       if(winners.length){
17484:         const currentIndex=Math.max(0,RANGE_ORDER.indexOf(currentRange));
17485:         return winners.slice().sort((a,b)=>Math.abs(RANGE_ORDER.indexOf(a)-currentIndex)-Math.abs(RANGE_ORDER.indexOf(b)-currentIndex))[0];
17486:       }
17487:     }
17488:     const size=String(profile?.size||weapon?.size||'').toLowerCase();
17489:     if(/large/.test(size)) return 'far';
17490:     if(/small/.test(size)) return 'close';
17491:     return RANGE_ORDER.includes(currentRange)?currentRange:'normal';
17492:   }
17493:
17494:   function rangeIntentToward(current,preferred){
17495:     const ci=RANGE_ORDER.indexOf(current), pi=RANGE_ORDER.indexOf(preferred);
17496:     if(ci<0||pi<0||ci===pi) return 'hold';
17497:     return pi<ci?'press':'open';
17498:   }
17499:
17500:   function rollComparedWeaponDamage(item,target,range,modifier=0,rollerSubject=null){
17501:     modifier+=artifactBlightPenalty(rollerSubject);
17502:     const expr={...weaponDamageExpressions(item,target,range)}; const mastery=masteryDamageExpression(item,target); if(mastery)expr.raw=mastery; const active=state.rules.weaponDamageMode||'RAW';
17503:     const seedBefore=state.seed>>>0;
17504:     let rawRoll,matrixRoll,activeRoll;
17505:     if(active==='RAW'||active==='CONTEXT_MATRIX'){
17506:       rawRoll=rollDamageExpression(expr.raw,rollerSubject?(sides=>artifactLuckyRoll(rollerSubject,sides,'weapon damage roll')):rng); const seedAfter=state.seed>>>0;
17507:       matrixRoll=rollDamageExpression(expr.matrix,shadowRngFactory(seedBefore)); state.seed=seedAfter; activeRoll=rawRoll;
17508:     } else {
17509:       matrixRoll=rollDamageExpression(expr.matrix,rollerSubject?(sides=>artifactLuckyRoll(rollerSubject,sides,'weapon damage roll')):rng); const seedAfter=state.seed>>>0;
17510:       rawRoll=rollDamageExpression(expr.raw,shadowRngFactory(seedBefore)); state.seed=seedAfter; activeRoll=matrixRoll;
17511:     }
17512:     const adjusted=value=>Math.max(0,value+modifier);
17513:     return {active,rawBase:rawRoll.total,matrixBase:matrixRoll.total,appliedBase:activeRoll.total,rawExpr:expr.raw,matrixExpr:expr.matrix,raw:adjusted(rawRoll.total),matrix:adjusted(matrixRoll.total),applied:adjusted(activeRoll.total)};
17514:   }
17515:
17516:   function writeWeaponAudit(attacker,target,result){
17517:     if(!state.rules.weaponAudit) return;
17518:     // Keep referee-side enemy mechanics hidden. Audit is exposed for the
17519:     // party's weapon tests, not as a way to reverse-engineer monster stats.
17520:     if(attacker?.type) return;
17521:     const labelA=attacker.name||'attacker', labelT=target.name||'target';
17522:     write(`WEAPON AUDIT — ${labelA} → ${labelT}: RAW ${result.raw} [${result.rawExpr}] · MATRIX ${result.matrix} [${result.matrixExpr}] · applied ${result.active} ${result.applied}.`,'system');
17523:   }
17524:
17525:   function monsterLargerThanManSized(monster){
17526:     if(!monster?.type) return false;
17527:     if(['large','huge','giant','gargantuan','enormous'].includes(String(monster.size||'').toLowerCase())) return true;
17528:     return monster.kind!=='humanoid' && Number(monster.hd)>=4;
17529:   }
17530:
17531:   function effectivePcAc(pc,attackKind='melee',attacker=null){
17532:     const shape=artifactShapechangeCreatureProfile(pc);let ac=Number(shape?.ac??pc.ac??9)-artifactArmorClassBonus(pc)-artifactSizeModifier(pc);if(artifactStatueInForm(pc)||rawStatueInForm(pc))ac=Math.min(ac,-4);
17533:     if(artifactShieldActive(pc))ac=Math.min(ac,attackKind==='missile'?2:4);
17534:     if(pc.shieldSpellRounds>0){const tracked=(state.activeSpellEffects||[]).filter(effect=>String(effect.spell||'').toLowerCase()==='shield'&&String(effect.target||'').toLowerCase()===String(pc.name||'').toLowerCase());if(!tracked.length||tracked.some(activeSpellEffectOperational))ac=Math.min(ac,attackKind==='missile'?2:4);}
17535:     if(pc.retreatingThisRound && pc.equippedShield) ac+=1;
17536:     if(pc.className==='Halfling'&&monsterLargerThanManSized(attacker)) ac-=2;
17537:     if(artifactAnyGaseousFormActive(pc))ac=-2;
17538:     ac+=artifactA3AcPenalty(pc)+rawEighthAcPenalty(pc)+artifactAdverseArmorClassPenalty(pc);
17539:     return ac;
17540:   }
17541:
17542:   function attackRoll(attacker,target,kind='melee',extra=0,options={}){
17543:     if(artifactSubjectUnavailable(attacker)||artifactSubjectUnavailable(target)){const targetAc=target?.type?Number(target.ac||9):effectivePcAc(target,kind,attacker);return {d20:0,mod:0,total:0,needed:Infinity,targetAc,hit:false,unavailable:true};}
17544:     if(target?.type&&monsterBurrowUntargetable(target)){const targetAc=Number(target.ac||9);return {d20:0,mod:0,total:0,needed:Infinity,targetAc,hit:false,unavailable:true,burrowed:true};}
17545:     if(target?.type&&phantomPrimePlaneUntargetable(target)){const targetAc=Number(target.ac||0);return {d20:0,mod:0,total:0,needed:Infinity,targetAc,hit:false,unavailable:true,ethereal:true};}
