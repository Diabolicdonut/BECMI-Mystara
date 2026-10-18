# v0.4.338 combat-extras source snippets

## Production HTML lines 17400-17455

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

## Production HTML lines 17530-17590

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
17546:     rawBreakSnakeCharmIfAttacked(target);
17547:     rawBreakCharmIfCasterAttacks(attacker,target);
17548:     if(!attacker?.type){rawBreakProtectionFromEvilBarrier(attacker,'made an attack',target);rawBreakPhantasmalForce(attacker,'caster attacked');rawBreakFifthLevelConcentration(attacker,'caster attacked',{attacking:true});}
17549:     if(artifactIsInvisible(attacker))artifactBreakInvisibility(attacker,'invisibility broken by attacking');
17550:     if(rawSpellInvisible(attacker))rawBreakSpellInvisibility(attacker,'attacking');
17551:     const protection=attacker?.type?rawProtectionFromEvilAttackPenalty(attacker,target,kind):{penalty:0,blocked:false};
17552:     if(protection.blocked){const targetAc=effectivePcAc(target,kind,attacker);return {d20:0,mod:protection.penalty,total:0,needed:Infinity,targetAc,hit:false,protectionFromEvil:true};}
17553:     if(kind==='missile'&&rawProtectionFromNormalMissilesBlocks(target,options,attacker)){const targetAc=target?.type?Number(target.ac||9):effectivePcAc(target,kind,attacker);return {d20:0,mod:0,total:0,needed:Infinity,targetAc,hit:false,protectionFromNormalMissiles:true};}
17554:     if(kind==='missile'&&combatActive()){const magical=Boolean(options.magicalMissile||options.magical||Number(options.magicBonus)>0),block=rawPrismaticTrajectoryBetweenSubjects(attacker,target,{missile:true,magical,magicalMissile:Boolean(options.magicalMissile),matter:!options.magicalMissile});if(block){const targetAc=target?.type?Number(target.ac||9):effectivePcAc(target,kind,attacker);write(`${block.color[0].toUpperCase()+block.color.slice(1)} light in the Prismatic Wall blocks ${magical?'the magical':'the'} missile before it reaches ${target.name}.`,'system');return {d20:0,mod:0,total:0,needed:Infinity,targetAc,hit:false,prismaticWall:true,prismaticColor:block.color};}}
17555:     if(kind==='melee'&&target?.paralyzed&&!options.ignoreParalysisAutomaticHit){const targetAc=target?.type?Number(target.ac||9):effectivePcAc(target,kind,attacker),thac0=attacker?.thac0||19;return {d20:null,mod:0,total:Infinity,needed:thac0-targetAc,targetAc,hit:true,automaticHit:true};}
17556:     const d20=attacker?.type?rng(20):artifactLuckyRoll(attacker,20,`${kind} attack roll`); let mod=extra+artifactBlightPenalty(attacker)+artifactBlessBonus(attacker)+artifactCurseAttackPenalty(attacker)+rawCurseAttackPenalty(attacker)+Number(protection.penalty||0)+rawBasiliskGazeAttackModifier(attacker,target,kind)+rawMedusaGazeAttackModifier(attacker,target,kind)+(!attacker?.type?greaterWyrdVisionAttackPenalty(attacker):0)+krakenInkBlindAttackPenalty(attacker),defensiveParryPenalty=0;
17557:     if(attacker.type){
17558:       const outdoors=state.mode==='wilderness' || Boolean(currentSite()?.outdoor);
17559:       mod+=attacker.daylightPenalty && daylight() && outdoors ? attacker.daylightPenalty : 0;
17560:       mod+=Number(attacker.attackBonus)||0;
17561:       if(attacker.artifactCauseDisease)mod-=2;
17562:       mod+=monsterWeaponMasteryAttackBonus(attacker,target,monsterWeaponItem(attacker));
17563:       const defendingOrder=state.combat?.pcOrders?.[String(target?.name||'').toLowerCase()];
17564:       if(kind==='melee'&&state.rules?.fighterCombatOptions&&defendingOrder?.action==='parry') defensiveParryPenalty=Math.min(defensiveParryPenalty,-4);
17565:     } else {
17566:       if(!artifactShapechangeCreatureProfile(attacker))mod+=abilityAdjustment((kind==='melee'||options.strengthMissile)?(attacker.abilities?.str??10):(attacker.abilities?.dex??10));
17567:       mod+=artifactHitRollBonus(attacker)+artifactLeapAttackBonus(attacker)+artifactSizeModifier(attacker)-artifactAdverseHitRollPenalty(attacker);
17568:       if(!options.artifactFormAttack){mod+=weaponMasteryAttackBonus(attacker,target,equippedWeaponItem(attacker));mod+=weaponMasteryMissilePenalty(attacker,equippedWeaponItem(attacker),kind);if(kind==='missile'&&attacker.className==='Halfling')mod+=1;mod+=effectiveMagicWeaponBonus(attacker,equippedWeaponItem(attacker));mod+=underwaterAttackPenalty(attacker,kind,equippedWeaponItem(attacker));}
17569:       if(attacker.stitchedTo) mod-=2;
17570:       if(attacker.artifactCauseDisease) mod-=2;
17571:       if(attacker.swimmingExhausted) mod-=2;
17572:       mod+=deprivationProfile(attacker).attackPenalty+longDistanceTravelPenalty();
17573:       if(attacker.grabbedBy)mod+=Number(attacker.grabbedBy.attackPenalty)||0;
17574:       if(attacker.adhesiveRestraint)mod+=Number(attacker.adhesiveRestraint.attackPenalty)||0;
17575:       mod+=continuousAttachmentAttackPenalty(attacker,target);mod+=waterWeirdVictimAttackModifier(attacker,target);
17576:     }
17577:     if(!target?.type&&artifactParryActive(target)&&(kind==='melee'||(kind==='missile'&&options.thrownMissile)))defensiveParryPenalty=Math.min(defensiveParryPenalty,-4);
17578:     if((artifactIsInvisible(target)||rawSpellInvisible(target)||Boolean(target?.invisible||target?.spell_invisibility))&&!artifactCanSeeInvisible(attacker,target))mod-=6;
17579:     mod+=defensiveParryPenalty;
17580:     mod+=masteryStatus(attacker).prone?-2:0;
17581:     let targetAc=Number.isFinite(Number(options.targetAcOverride))?Number(options.targetAcOverride):(target.type ? target.ac : effectivePcAc(target,kind,attacker));
17582:     if(kind==='missile'&&target?.paralyzed)targetAc=9;
17583:     if(target.type&&artifactAnyGaseousFormActive(target))targetAc=-2;
17584:     if(target.type)targetAc+=artifactA3AcPenalty(target)+rawEighthAcPenalty(target);
17585:     if(target.type&&Number(target.stunnedRounds||0)>0) targetAc+=4;
17586:     targetAc+=krakenInkBlindAcPenalty(target);
17587:     const targetMastery=masteryStatus(target);if(targetMastery.stunned)targetAc+=2;if(targetMastery.prone)targetAc+=4;
17588:     if(!target.type&&attacker.type) targetAc-=masteryDefenseBonus(target,attacker);
17589:     const thac0=(!attacker?.type&&artifactShapechangeCreatureProfile(attacker)?.thac0)||attacker.thac0||19; const needed=thac0-targetAc;
17590:     const total=d20+mod;
