# v0.4.338 actions source snippets

## Production HTML lines 11605-11648

11605:     write(`EXPEDITION INVENTORY\nTreasury display: ${formatMoney(state.treasuryCp)} (${state.logistics.coinEn} en of coin assigned below)\nSupplies: ${state.torches} torches; ${state.oilFlasks||0} oil flasks; ${state.rationStock.standard} standard + ${state.rationStock.iron} iron ration person-days; ${state.waterQuarts||0}/${carriedWaterskinCapacity()} utility waterskins filled.\nSlowest overland movement: ${formation.rate}' in ${formation.mode.replace(/-/g,' ')} formation. No pooled carrying capacity is used.\nUnassigned migration staging: ${pooled}\nDeployed/left-in-use gear: ${deployed}\n\n${manifests}\n\nUse “inventory optimize” for automatic load balancing, “inventory <name>” for one manifest, or “give <item> to <name>” to move an ordinary item.`, 'system'); return true;
11606:   }
11607:
11608:   function transferInventoryCommand(text){
11609:     const m=/^(?:give|transfer|move)\s+(.+?)\s+to\s+(.+)$/i.exec(String(text||'').trim()); if(!m) return false;
11610:     ensureLogisticsState(); const itemQuery=normalizedItemText(m[1]),recipientQuery=String(m[2]).trim().toLowerCase(),carriers=logisticsCarriers({includeVessel:Boolean(currentVessel())});
11611:     const recipient=carriers.find(row=>row.name.toLowerCase()===recipientQuery)||carriers.find(row=>row.name.toLowerCase().includes(recipientQuery));
11612:     if(!recipient){ write(`No available carrier matches “${m[2]}”.`,'warning'); return true; }
11613:     let source=null,record=null;
11614:     for(const carrier of carriers){ const found=(carrier.inventory||[]).find(item=>normalizedItemText(item.name)===itemQuery||normalizedItemText(item.itemId)===itemQuery||normalizedItemText(item.name).includes(itemQuery)); if(found){source=carrier;record=found;break;} }
11615:     if(!record){ write(`No physically carried item clearly matches “${m[1]}”. Abstract ration, torch, oil, water, and coin loads are moved with “inventory optimize”.`,'warning'); return true; }
11616:     if(source===recipient){ write(`${recipient.name} already carries ${record.name}.`); return true; }
11617:     const one=takeOneItem(source.inventory,record.itemId); addInventoryRecord(recipient.inventory,one,1); ensureLogisticsState({optimize:false});if(source.type==='pc')artifactSecurityCheckOwner(source.entity,{announce:true});
11618:     write(`Transferred ${one.name} from ${source.name} to ${recipient.name}. ${recipient.name} now carries ${Math.round(carrierLoadEn(recipient))}/${recipient.capacityEn} en.`,'system'); updatePanels(); return true;
11619:   }
11620:
11621:   function funds() { write(`Expedition treasury: ${formatMoney(state.treasuryCp)}.`); }
11622:
11623:   function setWeaponMode(mode) {
11624:     const value=String(mode??'').toUpperCase();
11625:     // MATRIX is the historical AAE-family damage token; legacy saves retain it.
11626:     if(!['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(value)){
11627:       write('Use weapon mode raw, weapon mode context matrix, or weapon mode aae.','warning');
11628:       return false;
11629:     }
11630:     state.rules.weaponDamageMode=value;
11631:     addEvent('Weapon damage mode changed to '+value+'.');
11632:     write(value==='RAW'?'Weapon damage set to Rules Cyclopedia RAW values.':
11633:       value==='CONTEXT_MATRIX'?'Context Matrix data mode selected; live damage remains RAW in v0.4.335.':
11634:       'AAE matrix selected; existing matrix damage behavior remains unchanged.','system');
11635:     updatePanels();
11636:     return true;
11637:   }
11638:   function toggleWeaponAudit() {
11639:     state.rules.weaponAudit=!state.rules.weaponAudit;
11640:     addEvent(`Weapon audit ${state.rules.weaponAudit?'enabled':'disabled'}.`);
11641:     write(`Weapon rules audit ${state.rules.weaponAudit?'enabled':'disabled'}. During combat, successful weapon hits calculate RAW and matrix damage side-by-side while only the selected mode changes hit points.`,'system');
11642:     updatePanels();
11643:   }
11644:
11645:   function weaponQueryTokens(value) {
11646:     return String(value||'').toLowerCase().replace(/\(rc\)/g,'').replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);
11647:   }
11648:

## Production HTML lines 15708-15758

15708:     budget.deflectEligibleHits++;
15709:     if(budget.deflects>=limit)return false;
15710:     budget.deflects++;
15711:     const result=pcSave(pc,'death',0,'Weapon Mastery deflection');
15712:     if(result.success){budget.deflectSuccesses++;write(`${pc.name} deflects the attack with ${item.name}.`,'system');}
15713:     return result.success;
15714:   }
15715:
15716:   function ensureBecmRuleOptions(rules=state.rules){
15717:     if(!rules || typeof rules!=='object') rules=state.rules={};
15718:     for(const [key,value] of Object.entries(BECM_OPTION_DEFAULTS)) if(typeof rules[key]!=='boolean') rules[key]=value;
15719:     if(!['RAW_STRICT','LEGACY_FALLBACK'].includes(String(rules.spellResolutionMode||'').toUpperCase())) rules.spellResolutionMode='RAW_STRICT';
15720:     const selectedWeaponMode=String(rules.weaponDamageMode??'').toUpperCase();
15721:     rules.weaponDamageMode=['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(selectedWeaponMode)?selectedWeaponMode:'RAW';
15722:     if(!['RAW','PHASED'].includes(String(rules.initiativeMode||'').toUpperCase())) rules.initiativeMode='PHASED';
15723:     if(!['RAW','LOST_TIME'].includes(String(rules.gettingLostMode||'').toUpperCase())) rules.gettingLostMode='RAW';
15724:     return rules;
15725:   }
15726:
15727:   function spellResolutionMode(){
15728:     const rules=ensureBecmRuleOptions();
15729:     return rules.spellResolutionMode==='LEGACY_FALLBACK'?'LEGACY_FALLBACK':'RAW_STRICT';
15730:   }
15731:   function setSpellResolutionMode(mode,{announce=true}={}){
15732:     const rules=ensureBecmRuleOptions(),value=String(mode||'').toUpperCase().replace(/[ -]+/g,'_');
15733:     if(!['RAW_STRICT','LEGACY_FALLBACK'].includes(value)){if(announce)write('Use RAW spell resolution or Legacy spell fallback.','warning');return false;}
15734:     rules.spellResolutionMode=value;
15735:     if(announce){addEvent(`Spell resolution mode changed to ${value}.`);write(value==='RAW_STRICT'?'Spell resolution set to RAW STRICT. A spell without a source-bounded executable handler is refused without expending the prepared spell.':'Spell resolution set to LEGACY FALLBACK. Missing spell handlers may use the earlier generic tracked-effect placeholder for compatibility.','system');updatePanels();}
15736:     return true;
15737:   }
15738:   function activeRulesProfile(){
15739:     const rules=ensureBecmRuleOptions();
15740:     if(rules.weaponDamageMode==='RAW'&&rules.initiativeMode==='RAW'&&rules.gettingLostMode==='RAW'&&spellResolutionMode()==='RAW_STRICT')return 'BECM RAW PROCEDURES';
15741:     if(['MATRIX','AAE'].includes(rules.weaponDamageMode)&&rules.initiativeMode==='PHASED'&&rules.gettingLostMode==='LOST_TIME'&&spellResolutionMode()==='RAW_STRICT')return 'HOUSE PROCEDURES';
15742:     return 'CUSTOM MIX';
15743:   }
15744:   function applyRulesProfile(profile){
15745:     const value=String(profile||'').toUpperCase().replace(/[ -]+/g,'_'),rules=ensureBecmRuleOptions();
15746:     if(value==='RAW'||value==='BECM_RAW'||value==='BECM_RAW_PROCEDURES'){rules.weaponDamageMode='RAW';rules.initiativeMode='RAW';rules.gettingLostMode='RAW';rules.spellResolutionMode='RAW_STRICT';write('BECM RAW procedure profile applied: RAW weapon damage, RAW side initiative, RAW getting-lost displacement, and strict source-bounded spell resolution. Optional BECM systems retain their current ON/OFF choices.','system');}
15747:     else if(value==='HOUSE'||value==='HOUSE_PROCEDURES'){rules.weaponDamageMode='MATRIX';rules.initiativeMode='PHASED';rules.gettingLostMode='LOST_TIME';rules.spellResolutionMode='RAW_STRICT';write('House procedure profile applied: contextual weapon matrix, phase initiative, and map-safe lost time. Strict RAW spell resolution remains active; optional BECM systems retain their current ON/OFF choices.','system');}
15748:     else {write('Unknown rules profile.','warning');return false;}
15749:     addEvent(`Rules profile changed to ${activeRulesProfile()}.`);updatePanels();return true;
15750:   }
15751:
15752:   function setBecmFeature(feature,enabled,{announce=true}={}){
15753:     const rules=ensureBecmRuleOptions();
15754:     if(!(feature in BECM_OPTION_DEFAULTS)){ if(announce) write(`Unknown BECM feature “${feature}”.`,'warning'); return false; }
15755:     rules[feature]=Boolean(enabled);
15756:     if(feature==='weaponMastery') for(const pc of state.party||[]) ensureWeaponMasteryRecord(pc);
15757:     if(announce){ const label=feature.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase()); addEvent(`${label} ${rules[feature]?'enabled':'disabled'}.`); write(`${label}: ${rules[feature]?'ON':'OFF'}. Existing character data is preserved.`,'system'); updatePanels(); }
15758:     return true;
