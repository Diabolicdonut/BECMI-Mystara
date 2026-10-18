# v0.4.338 monster-attack source snippets

## Production HTML lines 20875-21065

20875:     return rule&&typeof rule==='object'?rule:null;
20876:   }
20877:   function applyMonsterSourceChargeDamage(monster,damage,{announce=true}={}){
20878:     const rule=monsterSourceChargeRule(monster),base=Math.max(0,Number(damage)||0);
20879:     if(!rule||!monster?.chargedThisRound||base<=0)return {damage:base,applied:false,multiplier:1,rule};
20880:     const multiplier=Math.max(1,Number(rule.damageMultiplier)||2),resolved=Math.max(0,base*multiplier);
20881:     if(announce)write(`${monster.name}'s ${Number(rule.minimumDistanceYards)||20}-yard charge multiplies the successful ${rule.appliesTo||'attack'} damage by ${multiplier} (${base} → ${resolved}).`,'system');
20882:     return {damage:resolved,applied:true,multiplier,base,rule};
20883:   }
20884:
20885:   function monsterAttack(monster,pc,phaseEligible=true,simultaneous=false){
20886:     if(!phaseEligible || (!simultaneous && !monsterCanFight(monster)) || !pc || (!simultaneous && (pc.dead || pc.hp<=0))) return;
20887:     if(isMesmerMonster(monster))clearMesmerHypnosis(pc,monster,{reason:'attacked by the Mesmer',announce:true});
20888:     if(isWingedWarriorMonster(monster)&&wingedWarriorIsAirborne(monster)){write(`${monster.name} is airborne and cannot fight until it lands; its razor-edged wings are its weapons.`,'system');return;}
20889:     if(isHugeWoodSpiderMonster(monster)){const mounted=ensureHugeWoodSpiderState(monster,{create:false})?.mountedByImpId;if(mounted){const rider=(state.combat?.monsters||[]).find(m=>m.id===mounted&&isWoodImpMonster(m)&&monsterStillPresent(m));if(rider){write(`${monster.name} is ${rider.name}'s active mount; its bite resolves with the rider's forced-melee action rather than as a second independent turn.`,'system');return;}}}
20890:     if(isVelyaMonster(monster)&&(velyaFormChangeConsumesRound(monster)||ensureVelyaState(monster,{create:false})?.form==='water current')){write(velyaFormChangeConsumesRound(monster)?`${monster.name} spends this round changing form and cannot attack.`:`${monster.name}'s water-current form cannot attack.`,'system');return;}if(isVelyaMonster(monster)&&monster.velyaAnimalMechanicsBoundary){write(monster.velyaAnimalMechanicsNote||`${monster.name}'s current Velya animal form has no source-specified automatic attack profile; referee resolution is required.`,'warning');return;}if(isVelyaMonster(monster)&&velyaHolySymbolBlocksApproach(monster,pc)){write(`${pc.name}'s strongly presented holy symbol prevents ${monster.name} from attacking from this approach inside 10 feet; it may try another direction.`,'system');return;}if(isVelyaMonster(monster)&&ensureVelyaState(monster,{create:false})?.form==='human'){const used=velyaHumanActionThisRound(monster);if(used){write(`${monster.name} has already used its ${used} action this round and cannot also make its draining touch.`,'system');return;}const claim=velyaClaimHumanAction(monster,'touch',{announce:false});if(!claim.ok){write(claim.reason,'system');return;}}
20891:     if(masteryCannotAttack(monster)){write(`${monster.name} cannot attack while ${masteryEffectSummary(monster)||'disabled by a weapon effect'}.`,'system');return;}
20892:     if(isAgaratMonster(monster)&&agaratScreamTargets(monster).length)resolveAgaratScream(monster,{announce:true});
20893:     if(isGreatWhaleMonster(monster)){const vessel=currentVessel();if(vessel?.seaworthy&&Number(vessel.hullPoints)>0&&greatWhaleShipMode(monster,vessel)==='ship'){greatWhalePendingRam(monster,vessel,{announce:true});return;}}
20894:     if(monster.specialAttack==='giant_gastropod'){const result=resolveGiantGastropodAttack(monster,pc,{announce:true});if(!result?.ok&&result?.reason)write(result.reason,result.outOfRange?'warning':'system');return;}
20895:     if(monster.specialAttack==='rock_python_constrict'){const result=resolveRockPythonAttack(monster,pc);if(!result?.ok&&result?.reason&&!result?.outOfRange)write(result.reason,'system');return;}
20896:     if(monster.specialAttack==='oard_devices'){const result=resolveOardDeviceAttack(monster,pc,{device:monster.oardAttackDevice,refereeRangeApproved:Boolean(monster.oardRayRangeApproved)});if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20897:     if(monster.specialAttack==='possession_host'){const row=ensurePossessionState(monster,{create:false});if(row?.phase!=='hosted'){write(`${monster.name} is outside a host and cannot attack.`,'system');return;}const smother=processPossessionSmother(monster,{announce:true});if(smother)return;const result=resolvePossessionHostedAttack(monster,pc,{announce:true});if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20898:     if(monster.specialAttack==='reflecter_bolt'){const result=resolveReflecterLightningBolt(monster,pc,{outdoors:String(state.mode||'').toLowerCase()==='wilderness'});if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20899:     if(monster.specialAttack==='sacrol_extensions'){const result=resolveSacrolAttackTurn(monster,pc,{announce:true});if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20900:     if(monster.directCombatEligible===false){
20901:       write(`${monster.name} has no ordinary attack/Armor Class exchange. Its published special interaction remains referee-mediated; no generic attack is invented.`,'warning');
20902:       return;
20903:     }
20904:     if(monster.specialAttack==='water_weird_seize'){const result=resolveWaterWeirdAttack(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20905:     if(monster.specialAttack==='wychglow_bolt'){const result=resolveWychglowBolt(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20906:     if(monster.specialAttack==='wychlamp_contact'){const result=resolveWychlampContact(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20907:     if(isWyrdMonster(monster)){const result=resolveWyrdSphereVolley(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20908:     if(monster.specialAttack==='xytar_combat'&&!monster.xytarResolvingBite){const result=resolveXytarCombat(monster,pc);if(!result?.ok&&result?.reason&&!result?.needsClose)write(result.reason,'system');return;}
20909:     if(monster.specialAttack==='huge_wood_spider_bite'){const result=resolveHugeWoodSpiderBite(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20910:     if(monster.specialAttack==='wood_imp_tactics'){const result=resolveWoodImpMelee(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'system');return;}
20911:     if(monsterBurrowed(monster))emergeMonsterFromBurrow(monster,{target:pc,reason:'bursts from below to attack'});
20912:     if(monster.specialAttack==='phantom_ethereal'){const opening=resolvePhantomOpeningAttack(monster,pc);if(opening?.handled&&!opening.continuePhysical)return;if(opening?.target)pc=opening.target;}
20913:     if(monster.specialAttack==='vampire_rose_drain'&&monster.continuousAttachment){processVampireRoseDrain(monster);return;}
20914:     if(monster.specialAttack==='continuous_attachment'&&monster.continuousAttachment){processMonsterContinuousAttachment(monster);return;}
20915:     if(monster.specialAttack==='strangle_vine'){write(`${monster.name} has no conventional attack roll. Its DMR2 attack is triggered when a creature moves into or through the vines; an already entangled victim takes automatic round-start strangulation instead.`,'system');return;}
20916:     if(monster.specialAttack==='strangleweed_opposed'){resolveStrangleweedOpposed(monster,pc,{reason:'monster attack opportunity'});return;}
20917:     if(monster.specialAttack==='magen_caldron_wrap'){const held=magenCaldronAttachment(monster);if(held){write(`${monster.name} keeps ${held.pc.name} wrapped; its automatic acid damage resolves at round end.`,'system');return;}const result=resolveMagenCaldronWrap(monster,pc);if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20918:     if(monster.specialAttack==='magen_hypnos_charm'){const result=resolveMagenHypnosCharm(monster,pc.name);if(!result?.ok&&result?.reason)write(result.reason,'warning');return;}
20919:     const basiliskGaze=resolveBasiliskSurpriseGaze(monster,pc);if(basiliskGaze?.petrified)return;
20920:     if(isMedusaGazeMonster(monster)&&medusaGazeOrderMode(pc,monster)){
20921:       const gaze=resolveMedusaMeleeGaze(monster,pc);
20922:       if(gaze?.petrified||gaze?.monsterPetrified||monster.ceasedHostility)return;
20923:     }
20924:     if(monster.type==='carrion_crawler'){
20925:       const feeding=carrionCrawlerFeedingTarget(monster);if(feeding){if(carrionCrawlerBeingAttackedThisRound(monster))interruptCarrionCrawlerFeeding(monster,feeding,{reason:'crawler is being attacked'});else{write(`${monster.name} continues eating the paralyzed ${feeding.name} instead of making new tentacle attacks.`,'system');return;}}
20926:       if(refreshParalyzedFlag(pc)&&!carrionCrawlerBeingAttackedThisRound(monster)){startCarrionCrawlerFeeding(monster,pc);return;}
20927:     }
20928:     if(monster.specialAttack==='phygorax_lure'){resolvePhygoraxLure(monster,pc,{announce:true});return;}
20929:     if(monster.specialAttack==='leveller_attack'){resolveLevellerAttack(monster,pc);return;}
20930:     if(monster.specialAttack==='frog_tongue_grab'){resolveGiantPoisonousFrogAttack(monster,pc);return;}
20931:     if(monster.specialAttack==='killer_tree_branches'){resolveKillerTreeAttack(monster,pc);return;}
20932:     if(monster.specialAttack==='roper_strands'){resolveRoperAttack(monster,pc);return;}
20933:     if(monster.specialAttack==='kraken_tentacles'){resolveKrakenAttack(monster,pc);return;}
20934:     if(monster.specialAttack==='giant_squid_tentacles'){resolveGiantSquidAttack(monster,pc);return;}
20935:     if(monster.specialAttack==='whipweed_stalks'){resolveWhipweedAttack(monster,pc);return;}
20936:     if(monster.specialAttack==='sporacle_tentacles'){resolveSporacleAttack(monster,pc);return;}
20937:     if(monster.specialAttack==='giant_jellyfish_tentacles'){resolveGiantJellyfishAttack(monster,pc);return;}
20938:     if(monster.specialAttack==='shroud_spider_paralysis'){resolveShroudSpiderAttack(monster,pc);return;}
20939:     if(monster.specialAttack==='scamille_adhesive'){resolveScamilleAttack(monster,pc);return;}
20940:     const specialReachFt=monsterSpecialMeleeReachFt(monster);
20941:     if(combatActive() && combatSeparation(pc,monster)>feetToCombatUnits(specialReachFt)){ write(`${monster.name}'s hand-to-hand attack on ${pc.name} is blocked: ${combatDistanceLabel(Math.round(combatSeparation(pc,monster)))} remain.`,'warning'); return; }
20942:     if(isBasiliskGazeMonster(monster)){
20943:       const gaze=resolveBasiliskMeleeGaze(monster,pc);
20944:       if(gaze?.requiresChoice){write(`${pc.name} has not chosen how to face ${monster.name}'s gaze this round; the hand-to-hand exchange is held for that required choice.`,'warning');return;}
20945:       if(gaze?.petrified||gaze?.monsterPetrified||monster.ceasedHostility)return;
20946:     }
20947:     resolveSetSpearVsCharge(pc,monster); if(!monsterCanFight(monster)) return;
20948:     if(monster.specialAttack==='dusanu_spores')resolveDusanuSporeBurst(monster);
20949:     if(pc.dead||pc.hp<=0)return;
20950:
20951:     if(monster.specialAttack==='worry' && monster.worryingTarget){
20952:       const victim=findPc(monster.worryingTarget);
20953:       if(victim && !victim.dead && victim.hp>0){ const damage=rng(4); write(`${monster.name} remains latched onto ${victim.name}, worrying the victim for ${damage} automatic damage.`,'error'); damagePc(victim,damage,`${monster.name}'s worrying attack`); return; }
20954:       monster.worryingTarget=null;
20955:     }
20956:     if(monsterMagenRule(monster)?.subtype==='galvan'){const mr=ensureMagenState(monster),round=Number(state.combat?.round)||1;if(mr?.actionRound===round){write(`${monster.name} has already used its ${mr.actionKind||'weapon-or-lightning'} action this round.`,'system');return;}if(!magenClaimRoundAction(monster,'weapon',{announce:false}))return;}
20957:     let attacks=Array.isArray(monster.attacks)&&monster.attacks.length?monster.attacks:[{name:monster.naturalDamage?'bite':(monsterWeaponItem(monster)?.name||'weapon'),damage:monster.naturalDamage||null,special:monster.specialAttack||null}];
20958:     if(isHomunculusIntrinsicMonster(monster))attacks=homunculusEffectiveAttacks(monster,attacks);
20959:     if(isHephaestonMonster(monster)){const secondary=hephaestonSecondaryStatus(monster);if(secondary&&secondary!=='fist')attacks=attacks.filter(spec=>!spec.hephaestonFist);}
20960:     if(monster.type==='purple_worm'&&!purpleWormTailAvailable(monster)){const before=attacks.length;attacks=attacks.filter(spec=>!/sting|tail/i.test(String(spec.name||'')));if(before!==attacks.length)write(`${monster.name}'s tail is still being dragged free of its tunnel and cannot sting this round.`,'system');}
20961:     if(monster.pinned&&Number(monster.wrestlingPinCount)>0){const negated=Math.min(attacks.length,Number(monster.wrestlingPinCount));attacks=attacks.slice(negated);write(`${negated} of ${monster.name}'s attacks ${negated===1?'is':'are'} negated by ${monster.wrestlingPinCount} pinning wrestler${Number(monster.wrestlingPinCount)===1?'':'s'}.`,'system');}
20962:     attacks=attacks.slice(0,masteryAttackCount(monster,attacks.length));
20963:     if(!attacks.length){write(`${monster.name}'s slowed condition prevents an attack this round.`,'system');return;}
20964:     let sourceSwoopUsed=false;
20965:     for(const spec of attacks){
20966:       if(pc.dead||pc.hp<=0){if(phantomVisionRule(monster)){const replacement=livingParty().find(candidate=>candidate!==pc&&!candidate.dead&&Number(candidate.hp)>0&&combatSeparation(candidate,monster)<=feetToCombatUnits(specialReachFt));if(replacement)pc=replacement;else break;}else break;}
20967:       let masteryDamageAudit=null;
20968:       if(spec.hephaestonFist&&!hephaestonClaimSecondaryAction(monster,'fist',{announce:false}))continue;
20969:       const weapon=spec.hephaestonFist?null:monsterWeaponItem(monster),attackName=monster.specialAttack==='centipede_poison'?'bite':(spec.name||weapon?.name||'attack'),subtypeAttackBonus=homunculusAttackBonus(monster,attackName);
20970:       const result=paralysisAwareAttackRoll(monster,pc,'melee',(pc.retreatingThisRound?2:0)+subtypeAttackBonus);
20971:       shieldWeaponBreakCheck(pc,monster,result,{foeIsAttacker:true,attackSpec:spec});
20972:       const swoopContext=!sourceSwoopUsed?monsterSwoopContext(monster,pc,attackName):null;if(swoopContext)sourceSwoopUsed=true;
20973:       void refereeLog(`ATTACK — ${monster.name} → ${pc.name} with ${attackName}: d20 ${result.d20}${result.mod?`${result.mod>0?' + ':' - '}${Math.abs(result.mod)}`:''} = ${result.total}; THAC0 ${monster.thac0||19} vs AC ${result.targetAc}, needs ${result.needed} → ${result.hit?'HIT':'MISS'}.`,{type:'monster_attack',round:state.combat?.round,monsterId:monster.id,target:pc.name,d20:result.d20,modifier:result.mod,total:result.total,thac0:monster.thac0||19,targetAc:result.targetAc,needed:result.needed,hit:result.hit,attackName});
20974:       const swallowRule=monsterSwallowRule(monster),swallowTriggered=Boolean(swallowRule&&/bite/i.test(attackName)&&swallowTargetEligible(pc,swallowRule)&&monsterSwallowTrigger(swallowRule,result));
20975:       write(`${monster.name} attacks ${pc.name} with ${attackName} — ${result.hit?'HIT':'miss'}.`);
20976:       if(!result.hit){if(swallowTriggered)applyMonsterSwallow(monster,pc,swallowRule,{naturalRoll:result.d20,reason:'source natural-roll swallow override'});if(swoopContext)break;continue;}
20977:       if(tryMasteryDeflect(pc,'melee')) continue;
20978:       rawTriggerAttackContactContingency(pc,monster,{attackKind:'melee',attackName});
20979:       let damage=0;
20980:       if(spec.damage){ damage=Math.max(0,rollDamageExpression(spec.damage).total+(monster.damageMod||0)+artifactBlightPenalty(monster)+artifactBlessBonus(monster)); }
20981:       else if(monster.specialAttack==='centipede_poison'){ damage=0; }
20982:       else if(monster.naturalDamage){ damage=Math.max(0,rollDamageExpression(monster.naturalDamage).total+(monster.damageMod||0)+artifactBlightPenalty(monster)+artifactBlessBonus(monster)); }
20983:       else { const engagement=getEngagement(pc,monster),band=engagement?.range||'normal'; const dmg=rollComparedWeaponDamage(weapon,pc,band,monster.damageMod||0); masteryDamageAudit=dmg; writeWeaponAudit(monster,pc,dmg); damage=dmg.applied; }
20984:       if(rawGrowthAnimalEffect(monster)&&damage>0){damage*=2;write(`${monster.name}'s Growth of Animal doubles its normal damage to ${damage}.`,'system');}
20985:       if(swoopContext&&damage>0){damage*=2;write(`${monster.name}'s represented surprise Swoop doubles this attack's damage to ${damage}.`,'system');}
20986:       if(damage>0){const charged=applyMonsterSourceChargeDamage(monster,damage);damage=charged.damage;}
20987:       if(damage){ write(`${monster.name} deals ${damage} damage to ${pc.name}.`); const magicalBonus=weapon?effectiveMagicWeaponBonus(monster,weapon):0,damageCtx=spec.hephaestonWeapon?{kind:'weapon',weapon:true,handHeldWeapon:true,attackKind:'melee',weaponName:'huge iron weapon',magical:false,magicalBonus:0}:(weapon?{kind:'weapon',weapon:true,handHeldWeapon:true,attackKind:'melee',magical:magicalBonus>0,magicalBonus}:{kind:'natural',attackKind:'melee'});damagePc(pc,damage,monster.name,damageCtx); if(pc.dead&&monsterPhantomRule(monster)?.subtype==='apparition')recordApparitionSlaying(monster,pc); }
20988:       else write(`${monster.name}'s hit causes no direct damage.`);
20989:       if(spec.hephaestonFist&&!pc.dead)maybeHephaestonFistGrab(monster,pc,result);
20990:       if(spec.energyDrainLevels)resolveMonsterEnergyDrainHit(monster,pc,spec);
20991:       if(isVelyaMonster(monster)&&pc.dead)recordVelyaSlaying(monster,pc);
20992:       if(spec.paralysisRule&&!pc.dead){const pr=resolveMonsterParalysisHit(monster,pc,spec);if(monster.type==='ghoul'&&pr?.applied){write(`${monster.name} turns from the paralyzed victim rather than continuing to attack ${pc.name}.`,'system');break;}if(monster.type==='carrion_crawler'&&pr?.applied&&refreshParalyzedFlag(pc)&&!carrionCrawlerBeingAttackedThisRound(monster)){startCarrionCrawlerFeeding(monster,pc);break;}}
20993:       if((spec.vapourGhoulTouch||isVapourGhoulMonster(monster))&&!pc.dead)resolveVapourGhoulTouchHit(monster,pc,{announce:true});
20994:       if(pc.dead) continue;
20995:       if(isBaldandarIntrinsicMonster(monster)&&/bite/i.test(attackName))resolveBaldandarPoisonBite(monster,pc);
20996:       if(spec.araneaPoison&&!pc.dead)resolveAraneaPoisonBite(monster,pc);
20997:       if((spec.whiteFangVenom||isWhiteFangMonster(monster)&&/bite/i.test(attackName))&&!pc.dead)applyWhiteFangVenom(monster,pc);
20998:       if(isHomunculusIntrinsicMonster(monster))resolveHomunculusAttackRider(monster,pc,attackName);
20999:       if(pc.dead) continue;
21000:       if(swallowTriggered)applyMonsterSwallow(monster,pc,swallowRule,{naturalRoll:result.d20});
21001:       if(pc.swallowedBy)continue;
21002:       if(spec.petrifies){const sv=pcSave(pc,'paralysis',0,`${monster.name} ${attackName} (Turn to Stone)`);if(!sv.success){pc.petrified=true;pc.turnedToStone=true;pc.petrifiedBy=monster.name;write(`${pc.name} fails the Turn to Stone save against ${monster.name}'s ${attackName} and is petrified with all carried equipment.`,'error');}else write(`${pc.name} resists ${monster.name}'s petrifying ${attackName}.`,'system');}
21003:       if(spec.medusaPoison&&!artifactProtectionPrevents(pc,'poison',{source:`${monster.name}'s snake venom`,announce:true})){
21004:         const sv=pcSave(pc,'poison',0,'medusa snakebite');
21005:         if(!sv.success){pc.poisonOnsetAtAbsoluteMinute=absoluteCampaignMinute();capturePoisonOnsetCombatEpisode(pc);pc.fatalPoisonDueMinute=absoluteCampaignMinute()+10;write(`${pc.name} fails the poison save against ${monster.name}'s snakebite. Without neutralization or another valid cure, the venom becomes fatal in one turn.`,'error');void refereeLog(`MEDUSA VENOM — ${pc.name} will die in one turn unless the poison is neutralized.`,{type:'delayed_poison',pc:pc.name,source:'medusa snakebite',turns:1,dueAbsoluteMinute:pc.fatalPoisonDueMinute});}
21006:         else write(`${pc.name} survives ${monster.name}'s snake venom.`,'system');
21007:       }
21008:       if(weapon){masteryAutomaticHitEffects(monster,pc,weapon,monsterWeaponMasteryRank(monster),{kind:'melee',rangeBand:getEngagement(pc,monster)?.range||'normal',naturalRoll:result.d20});maybeTriggerMasteryDespair(monster,pc,weapon,masteryDamageAudit);}
21009:       if(pc.dead) continue;
21010:       if(monster.specialAttack==='continuous_attachment'){const rule=monsterContinuousAttackRule(monster);if(rule)attachMonsterContinuousDamage(monster,pc,rule,{attackName});}
21011:       if(monster.specialAttack==='vampire_rose_drain')attachVampireRoseDrain(monster,pc,{attackName});
21012:       if(monster.specialAttack==='lava_ooze_coating')applyLavaOozeCoating(monster,pc);
21013:       const carriedOff=maybeEstablishCarryOffOnHit(monster,pc,attackName,result,{swoopContext});if(carriedOff||swoopContext)break;
21014:
21015:       if(monster.specialAttack==='worry'){ monster.worryingTarget=pc.name; write(`${monster.name} latches onto ${pc.name}; until the Hollow Child is killed or removed, it will automatically worry the victim for 1d4 damage each round.`,'error'); }
21016:       if(monster.specialAttack==='ash_extinguish'){
21017:         if(state.torchLit){ state.torchLit=false; write(`${monster.name}'s touch snuffs the party's burning torch; the partially burned torch remains.`,'error'); }
21018:         else if(state.lanternLit){ state.lanternLit=false; write(`${monster.name}'s touch extinguishes the lantern; the remaining oil stays in its reservoir.`,'error'); }
21019:         else if(state.incenseLit){ state.incenseLit=false; write(`${monster.name}'s touch quenches the visible blue flame of the incense.`,'error'); }
21020:       }
21021:       if(monster.specialAttack==='stitching'){
21022:         const previous=monster.lastStitchTarget?findPc(monster.lastStitchTarget):null;
21023:         if(previous && previous!==pc && !previous.dead){ previous.stitchedTo=pc.name; pc.stitchedTo=previous.name; write(`${monster.name} stitches ${pc.name} to ${previous.name} with dried sinew. Both are forced to remain together and suffer -2 on attack rolls until the stitching is removed.`,'error'); }
21024:         monster.lastStitchTarget=pc.name;
21025:       }
21026:       if(monster.specialAttack==='centipede_poison'){
21027:         if(!artifactProtectionPrevents(pc,'poison',{source:"the giant centipede's poison",announce:true})){const sv=pcSave(pc,'poison',0,'giant centipede bite');if(!sv.success){ pc.centipedeSickUntilAbsoluteMinute=absoluteCampaignMinute()+10*1440; write(`${pc.name} becomes violently ill from the centipede's poison: movement is halved and physical actions are impaired for ten days unless cured.`,'error'); }}
21028:       }
21029:       if(monster.specialAttack==='crab_spider_poison'){
21030:         if(!artifactProtectionPrevents(pc,'poison',{source:"the giant crab spider's venom",announce:true})){const sv=pcSave(pc,'poison',2,'giant crab spider venom');if(!sv.success){ const turns=rng(4); pc.poisonOnsetAtAbsoluteMinute=absoluteCampaignMinute();capturePoisonOnsetCombatEpisode(pc);pc.fatalPoisonDueMinute=absoluteCampaignMinute()+turns*10; write(`${pc.name} succumbs to the crab spider's venom. Without a cure, the poison will become fatal soon.`,'error'); void refereeLog(`CRAB SPIDER VENOM — ${pc.name} will die in ${turns} turn(s) unless cured.`,{type:'delayed_poison',pc:pc.name,turns,dueAbsoluteMinute:pc.fatalPoisonDueMinute}); }}
21031:       }
21032:       if(spec.rabies){
21033:         if(!artifactProtectionPrevents(pc,'disease',{source:'rabies infection',announce:true})){const sv=pcSave(pc,'poison',0,'rabid jaguar bite');if(!sv.success){ pc.rabiesInfected=true; pc.rabiesFatalMonths=rng(6); write(`${pc.name} is bitten deeply by the rabid jaguar. The wound carries a dangerous infection.`,'warning'); void refereeLog(`RABIES — ${pc.name} failed the poison save; without Cure Disease the infection is fatal in ${pc.rabiesFatalMonths} month(s).`,{type:'rabies',pc:pc.name,months:pc.rabiesFatalMonths}); }}
21034:       }
21035:     }
21036:   }
21037:
21038:   function monsterSavingThrow(monster,type='spells',modifier=0,reason=''){
21039:     const resolvedTarget=monsterSaveTarget(monster,type),needed=resolvedTarget??16; if(resolvedTarget===null)write(`${monster.name}'s ${type} save is unresolved; legacy target 16 is being used and requires referee review.`,'warning'); const openMindMod=artifactOpenMindSavePenalty(monster,reason),curseMod=artifactCurseSavePenalty(monster),rawCurseMod=rawCurseSavePenalty(monster),rawEighthSaveMod=rawMindBarrierSaveModifier(monster,reason)+rawDanceSavePenalty(monster)+rawPowerWordBlindSavePenalty(monster),oardMod=oardMindAffectingSaveBonus(monster,reason)+oardProtectionBeltSaveBonus(monster,reason),finalMod=Number(modifier||0)+masterySavePenalty(monster)+openMindMod+curseMod+rawCurseMod+rawEighthSaveMod+oardMod+krakenInkBlindSavePenalty(monster),d20=rng(20); const total=d20+finalMod; const success=d20===20 || (d20!==1 && total>=needed);
21040:     void refereeLog(`SAVING THROW — ${monster.name}: ${type}${reason?` (${reason})`:''}; d20 ${d20}${finalMod?`${finalMod>0?' + ':' - '}${Math.abs(finalMod)}`:''} = ${total}, needs ${needed} → ${success?'SUCCESS':'FAILURE'}.`,{type:'monster_save',round:state.combat?.round,monsterId:monster.id,saveType:type,reason,d20,modifier:finalMod,total,needed,success});
21041:     return {d20,total,needed,success};
21042:   }
21043:
21044:   function spellReadyName(pc){ return preparedSpellEntries(pc).find(entry=>entry.ready)?.spell||null; }
21045:   function canCastPrepared(pc,spell){
21046:     const wanted=String(spell||'').toLowerCase(),spellClass=memberSpellClass(pc);
21047:     if(wanted==='touch dispel'){
21048:       if(!state.rules?.touchDispel)return false;
21049:       if(spellClass==='Cleric')return preparedSpellEntries(pc).some(entry=>entry.ready&&entry.spell.toLowerCase()==='dispel magic');
21050:       if(spellClass!=='Magic-User')return false;
21051:     }
21052:     const reverse=rawReversedSpellInfo(wanted,spellClass);
21053:     if(reverse&&spellClass==='Cleric')return preparedSpellEntries(pc).some(entry=>entry.ready&&entry.spell.toLowerCase()===reverse.base.toLowerCase());
21054:     return Boolean(preparedSpellEntries(pc).some(entry=>entry.ready&&entry.spell.toLowerCase()===wanted));
21055:   }
21056:   function rawReadySpellCastNames(pc){
21057:     const ready=preparedSpellEntries(pc).filter(entry=>entry.ready).map(entry=>entry.spell),names=[...ready],spellClass=memberSpellClass(pc);
21058:     if(spellClass==='Cleric')for(const row of Object.values(RAW_REVERSED_SPELLS))if(row.classes.includes('Cleric')&&ready.some(name=>name.toLowerCase()===row.base.toLowerCase()))names.push(row.name);
21059:     return [...new Set(names)].sort((a,b)=>b.length-a.length);
21060:   }
21061:
21062:   function sleepPlayerOutcome(pcName,scoped,budgetTotal,affected){
21063:     const targetText=scoped?` over ${scoped}`:'';
21064:     if(affected.length) return `${pcName} casts Sleep${targetText}: 2d8 = ${budgetTotal} Hit Dice. ${affected.map(m=>m.name).join(', ')} fall asleep. No saving throw applies.`;
21065:     return `${pcName} casts Sleep${targetText}. The magic settles over the targets, but none of them are affected.`;
