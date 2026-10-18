# v0.4.338 monster-weapon source snippets

## Production HTML lines 18770-18830

18770:       if(isNekrozonGazeMonster(monster))resolveNekrozonGazeEvent(monster,{event,completeSurprise});
18771:       if(!livingParty().length)break;
18772:     }
18773:   }
18774:
18775:   function monsterWeaponItem(monster){
18776:     if(artifactTurnWoodWeaponTrapped(monster))return null;
18777:     if(monster?.noWeapons||(isWingedWarriorMonster(monster)&&monsterWingedWarriorRule(monster)?.combat?.neverCarriesWeapons))return null;
18778:     if(!monster.weaponId) return null; const item=SHOP_ITEMS[monster.weaponId]; return item?{...item,itemId:monster.weaponId,masteryRank:monsterWeaponMasteryRank(monster)}:null;
18779:   }
18780:
18781:   // v0.4.125 — exceptional poison / disease-like toxin / Energy Drain handlers.
18782:   // Post-death creature conversion is recorded as pending campaign state here;
18783:   // replacing a player character with a monster/NPC is intentionally left to
18784:   // the later common transformation/roster producer instead of deleting PC data.
18785:   function recordPendingMonsterTransformation(pc,{type,source,timing,dueAbsoluteMinute=null,note=''}={}){
18786:     if(!pc||!type)return null;
18787:     const existing=pc.pendingMonsterTransformation;
18788:     if(existing&&existing.type===type)return existing;
18789:     const row={type:String(type),source:String(source||type),timing:String(timing||'source-defined'),recordedAtAbsoluteMinute:absoluteCampaignMinute(),dueAbsoluteMinute:Number.isFinite(Number(dueAbsoluteMinute))?Number(dueAbsoluteMinute):null,note:String(note||'')};
18790:     pc.pendingMonsterTransformation=row;
18791:     void refereeLog(`MONSTER TRANSFORMATION PENDING — ${pc.name}: ${row.type} (${row.timing}).`,{type:'pending_monster_transformation',pc:pc.name,...row});
18792:     return row;
18793:   }
18794:
18795:   // v0.4.144 — Apparition post-death transformation lifecycle. The Companion
18796:   // source gives one exact one-week corpse conversion and one exact prevention
18797:   // sequence: Dispel Evil on the body, then Raise Dead, both within that week.
18798:   // Raising without the prior Dispel Evil starts a new one-week clock after
18799:   // which the revived character begins to fade; no duration for that fading is
18800:   // printed, so completion of the revived-character conversion is not invented.
18801:   function apparitionTransformationEligiblePc(pc){
18802:     return Boolean(pc&&['fighter','cleric','magic-user','thief','mystic','druid','dwarf','elf','halfling','fire priest'].includes(String(pc.className||'').toLowerCase()));
18803:   }
18804:   function apparitionFateRecord(pc){return pc?.apparitionFate&&typeof pc.apparitionFate==='object'?pc.apparitionFate:null;}
18805:   function apparitionFateUnresolved(pc){const row=apparitionFateRecord(pc);return Boolean(row&&!['prevented','transformed'].includes(String(row.status||'')));}
18806:   function recordApparitionSlaying(monster,pc){
18807:     if(!pc?.dead||!apparitionTransformationEligiblePc(pc)||monsterPhantomRule(monster)?.subtype!=='apparition')return null;
18808:     const existing=apparitionFateRecord(pc);if(existing&&!['prevented','transformed'].includes(String(existing.status||'')))return existing;
18809:     const slainAt=Number.isFinite(Number(pc.diedAtAbsoluteMinute))?Number(pc.diedAtAbsoluteMinute):absoluteCampaignMinute(),due=slainAt+7*1440;
18810:     const row={sourceMonsterId:monster?.id||null,sourceName:monster?.name||'Apparition',slainAtAbsoluteMinute:slainAt,corpseConversionDueAbsoluteMinute:due,status:'dead_pending',bodyDispelledEvilAtAbsoluteMinute:null,raisedAtAbsoluteMinute:null,fadeStartsAtAbsoluteMinute:null,preventedAtAbsoluteMinute:null,transformedAtAbsoluteMinute:null,source:'Mentzer Companion D&D - DM'};
18811:     pc.apparitionFate=row;delete pc.apparitionTransformationComplete;delete pc.apparitionTransformationInProgress;delete pc.transformedMonsterType;
18812:     const pending=recordPendingMonsterTransformation(pc,{type:'phantom_apparition',source:row.sourceName,timing:'1_week',dueAbsoluteMinute:due,note:'A human/demihuman slain by an Apparition becomes one in one week unless Dispel Evil is cast on the body before Raise Dead, with both spells completed inside that week.'});
18813:     if(pending){pending.status='pending_dead_body';pending.sourceMonsterId=row.sourceMonsterId;}
18814:     write(`${pc.name} was slain by ${row.sourceName}. Unless Dispel Evil is cast on the body before Raise Dead and both are completed within one week, ${pc.name} will become an Apparition.`,'warning');
18815:     return row;
18816:   }
18817:   function markApparitionBodyDispelled(pc,caster){
18818:     const row=apparitionFateRecord(pc),now=absoluteCampaignMinute();if(!row||row.status==='prevented'||row.status==='transformed')return {ok:false,reason:'no unresolved Apparition death-fate'};
18819:     if(!pc.dead)return {ok:false,reason:'the printed prevention requires Dispel Evil on the body before Raise Dead'};
18820:     if(now>Number(row.corpseConversionDueAbsoluteMinute)+1e-9){processApparitionTransformationClock(now,now);return {ok:false,reason:'the one-week Apparition conversion deadline has already passed'};}
18821:     row.bodyDispelledEvilAtAbsoluteMinute=now;row.bodyDispelledEvilBy=caster?.name||null;row.status='body_dispelled_pending_raise';
18822:     if(pc.pendingMonsterTransformation?.type==='phantom_apparition')pc.pendingMonsterTransformation.status='body_dispelled_pending_raise';
18823:     write(`${caster?.name||'The caster'} casts Dispel Evil on ${pc.name}'s body within the one-week window. The Apparition fate is not yet canceled: Raise Dead must still follow before the week expires.`,'system');return {ok:true,row};
18824:   }
18825:   function completeApparitionRaiseSequence(pc,caster){
18826:     const row=apparitionFateRecord(pc);if(!row)return null;const now=absoluteCampaignMinute(),deadline=Number(row.corpseConversionDueAbsoluteMinute),purified=row.bodyDispelledEvilAtAbsoluteMinute!=null&&Number.isFinite(Number(row.bodyDispelledEvilAtAbsoluteMinute))&&Number(row.bodyDispelledEvilAtAbsoluteMinute)<=now&&Number(row.bodyDispelledEvilAtAbsoluteMinute)<=deadline&&now<=deadline;
18827:     row.raisedAtAbsoluteMinute=now;row.raisedBy=caster?.name||null;
18828:     if(purified){row.status='prevented';row.preventedAtAbsoluteMinute=now;row.preventedBy='Dispel Evil before Raise Dead within one week';delete pc.pendingMonsterTransformation;delete pc.apparitionTransformationInProgress;delete pc.apparitionTransformationComplete;delete pc.transformedMonsterType;write(`${pc.name}'s Apparition transformation is prevented: Dispel Evil was cast on the body before this Raise Dead, and both occurred within the printed one-week limit.`,'system');return {prevented:true,row};}
18829:     row.status='revived_unpurified';row.fadeStartsAtAbsoluteMinute=now+7*1440;row.bodyDispelledBeforeRaise=false;pc.apparitionTransformationInProgress=false;delete pc.apparitionTransformationComplete;delete pc.transformedMonsterType;
18830:     const pending=recordPendingMonsterTransformation(pc,{type:'phantom_apparition',source:row.sourceName||'Apparition',timing:'one_week_after_unpurified_raise',dueAbsoluteMinute:row.fadeStartsAtAbsoluteMinute,note:'Raise Dead was cast without the required prior Dispel Evil. The source says the revived victim begins to fade one week later, turning into an Apparition; it gives no duration for the fading itself.'});

## Production HTML lines 18342-18388

18342:   function poisonDartStatus(pc,{announce=true}={}){
18343:     if(!pc)return null;const logistics=ensurePoisonLogistics(pc),counts=blowgunDartCounts(pc),result={...counts,treatments:logistics.dartTreatments,authorized:logistics.refereeAuthorized,sourceNote:logistics.sourceNote};
18344:     if(announce)write(`${pc.name} — blowgun darts: ${counts.total} total (${counts.poisoned} poisoned, ${counts.plain} plain); referee-authorized poison treatments remaining: ${logistics.dartTreatments}${logistics.sourceNote?`; source: ${logistics.sourceNote}`:''}.`,'system');
18345:     return result;
18346:   }
18347:   function consumeAmmo(pc,weaponId){
18348:     const rule=AMMO_RULES[weaponId]; if(!rule) return {ok:true,label:null,poisoned:false};
18349:     const lists=[pc.inventory||[],state.partyInventory||[]],isBlowgun=weaponId==='blowgun_short'||weaponId==='blowgun_long';
18350:     if(isBlowgun){
18351:       for(const list of lists){const rec=list.find(x=>x.itemId===rule.ammoId&&ammoRemaining(x,rule.perPack)>0&&poisonedAmmoRemaining(x,rule.perPack)>0);if(rec){const prepared=poisonedAmmoRemaining(rec,rule.perPack);rec.ammoUsed=(Number(rec.ammoUsed)||0)+1;rec.poisonedAmmo=Math.max(0,prepared-1);return{ok:true,label:rule.label,remaining:ammoRemaining(rec,rule.perPack),poisoned:true};}}
18352:     }
18353:     for(const list of lists){ const rec=list.find(x=>x.itemId===rule.ammoId && ammoRemaining(x,rule.perPack)>0); if(rec){ rec.ammoUsed=(Number(rec.ammoUsed)||0)+1; return {ok:true,label:rule.label,remaining:ammoRemaining(rec,rule.perPack),poisoned:false}; } }
18354:     return {ok:false,label:rule.label,poisoned:false};
18355:   }
18356:
18357:   function missileCapable(item){ return Boolean(item?.missile || throwableCapable(item)); }
18358:   function throwableCapable(item){ return Boolean(item && (THROWABLE_WEAPONS.has(item.itemId)||masteryRareThrowRanges(item))); }
18359:   function weaponDamageContext(pc,item,kind='melee',extra={}){const strengthBonus=(kind==='melee'||(kind==='missile'&&throwableCapable(item)))?Math.max(0,abilityAdjustment(pc?.abilities?.str??10)):0,effectiveBonus=effectiveMagicWeaponBonus(pc,item),intrinsicMagical=Boolean(!item?.magicDestroyed&&(item?.magical===true||Number(item?.magicBonus)>0||Number(pc?.equippedWeapon?.magicBonus)>0));return {kind:'weapon',weapon:true,attackKind:kind,missile:kind==='missile',handHeldWeapon:kind==='melee',handHeld:kind==='melee',attackerName:pc?.name||null,weaponId:item?.itemId||null,weaponName:item?.name||null,weaponMaterial:item?.material||pc?.equippedWeapon?.material||null,weaponIntrinsicMagical:intrinsicMagical,edged:Boolean(item?.edged),blunt:Boolean(item?.blunt),sling:item?.itemId==='sling',magical:effectiveBonus>0,magicalBonus:effectiveBonus,silver:Boolean(item?.silver||/silver/i.test(String(item?.name||''))),strengthBonus,...extra};}
18360:
18361:   function pcWeaponAttack(pc,monster,kind='melee',rangeBand='normal',phaseEligible=true,simultaneous=false){
18362:     if(!phaseEligible || (!simultaneous && (pc.dead || pc.hp<=0)) || !monster || (!simultaneous && !monsterStillPresent(monster))) return;
18363:     if(artifactDodgeActionLost(pc)){write(`${pc.name} already dodged an incoming attack this round and can take no further actions this round.`,'warning');return;}
18364:     if(artifactElasticityStretched(pc)){write(`${pc.name} cannot attack while stretched by Elasticity.`,'warning');return;}
18365:     if(masteryCannotAttack(pc)){write(`${pc.name} cannot attack while ${masteryEffectSummary(pc)||'disabled by a weapon effect'}.`,'warning');return;}
18366:     if(rawTimestopProtectsTarget(monster,pc)){write(`${monster.name} is frozen in normal time and is invulnerable to ${pc.name}'s attack until Timestop ends.`,'system');return;}
18367:     if(pc.waterWeirdTrappedBy&&pc.waterWeirdTrappedBy.monsterId!==monster.id){const captor=state.combat?.monsters?.find(m=>m.id===pc.waterWeirdTrappedBy.monsterId);write(`${pc.name} is trapped underwater by ${captor?.name||pc.waterWeirdTrappedBy.monsterName||'a Water Weird'} and can attack only that captor until rescued or released.`,'warning');return;}
18368:     if(monster.directCombatEligible===false){
18369:       write(`${monster.name} has no applicable ordinary Armor Class in its BECMI profile. The attack is held for referee resolution under its published special interaction rather than assigning an invented AC.`,'warning');
18370:       return;
18371:     }
18372:     if(monsterBurrowUntargetable(monster)){write(`${monster.name} is still below the represented surface. An ordinary weapon/touch attack cannot reach it through the intervening earth or rock; no blanket ruling is made here for area magic or other terrain-penetrating effects.`,'warning');return;}
18373:     if(pc.swallowedBy){ return resolveSwallowedPcAttack(pc,monster,kind); }
18374:     if(kind==='melee' && combatActive() && combatSeparation(pc,monster)>0){
18375:       write(`${pc.name}'s hand-to-hand attack on ${monster.name} is blocked: encounter separation is ${combatDistanceLabel(Math.round(combatSeparation(pc,monster)))}; melee requires hostile Influence Sphere contact.`,'warning');
18376:       return;
18377:     }
18378:     if(kind==='melee'&&isNekrozonGazeMonster(monster)){
18379:       const direct=resolveNekrozonDeliberateEyeContact(monster,pc);if(direct?.killed)return;
18380:     }
18381:     if(kind==='melee'&&isBasiliskGazeMonster(monster)){
18382:       const gaze=resolveBasiliskMeleeGaze(monster,pc);
18383:       if(gaze?.requiresChoice){write(`${pc.name} must choose how to face ${monster.name}'s gaze this round: avoid gaze, meet gaze, or use a lit mirror.`,'warning');return;}
18384:       if(gaze?.petrified||gaze?.monsterPetrified||monster.ceasedHostility)return;
18385:     }
18386:     const transformedProfile=artifactTransformationProfile(pc),transformedNonHumanoid=transformedProfile&&String(transformedProfile.kind||'').toLowerCase()!=='humanoid';
18387:     if(kind==='melee'&&transformedProfile&&(transformedNonHumanoid||!equippedWeaponItem(pc))){artifactTransformedNaturalAttacks(pc,monster,transformedProfile);return;}
18388:     const baseItem=equippedWeaponItem(pc);
