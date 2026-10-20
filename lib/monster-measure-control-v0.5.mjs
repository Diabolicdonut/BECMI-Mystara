// Known World v0.5 design-only attack-specific measure control resolution.
// Source-keyed effective reach is NOT monster body Size and NOT preferredMeasure.
export function resolveMonsterControlSize(attack,weaponIndex,{allowNeutralUnknown=true}={}){
 const unresolved=(reason)=>Object.freeze({status:'unresolved',sizeRating:null,verified:false,reason});
 const unknownNatural=(reason)=>Object.freeze({status:allowNeutralUnknown?'neutral-fallback':'unresolved',
   sizeRating:allowNeutralUnknown?0:null,verified:false,reason});
 if(!attack||typeof attack!=='object')return unresolved('attack-absent');
 const delivery=attack.delivery??attack.attackContext?.delivery;
 if(['breath','projectile','special'].includes(delivery))
   return Object.freeze({status:'ineligible',sizeRating:null,verified:false,reason:'not-melee-contact'});
 if(delivery==='weapon'){
   if(attack.contextualWeaponDamageEligible===false||attack.attackContext?.contextualWeaponDamageEligible===false)
     return unresolved('weapon-ineligible-unverified');
   const id=attack.weaponId;
   if(typeof id!=='string'||!Object.hasOwn(weaponIndex,id))return unresolved('unknown-weapon-id');
   const weapon=weaponIndex[id];
   if(weapon.category!=='Melee'||!Number.isInteger(weapon.sizeRating))
     return unresolved('weapon-not-verified-melee');
   return Object.freeze({status:'verified',sizeRating:weapon.sizeRating,verified:true,
     source:'canonical-weapon-profile',weaponId:id});
 }
 if(delivery==='natural'){
   // This property is a proposed FUTURE contract only. Neither legacy
   // preferredMeasure=Close nor monster/target body size may populate it.
   if(Object.hasOwn(attack,'controlSizeRating')){
     if(!Number.isInteger(attack.controlSizeRating)||
       attack.controlSizeRating<-3||attack.controlSizeRating>3||
       attack.controlSizeSourceVerified!==true||
       typeof attack.controlSizeSource!=='string'||!attack.controlSizeSource.trim())
       return unresolved('unverified-natural-reach-size');
     return Object.freeze({status:'verified',sizeRating:attack.controlSizeRating,verified:true,
       source:attack.controlSizeSource,delivery:'natural'});
   }
   return unknownNatural('natural-reach-unknown');
 }
 return unresolved('delivery-unknown');
}
export function resolveMonsterGroupControl(attacks,weaponIndex,selection){
 if(!Array.isArray(attacks)||attacks.length===0)return {status:'unresolved',reason:'no-attack-contract'};
 if(!Number.isInteger(selection)||selection<0||selection>=attacks.length)
   return {status:'unresolved',reason:'lead-attack-not-established'};
 const out=resolveMonsterControlSize(attacks[selection],weaponIndex,{allowNeutralUnknown:true});
 if(out.status==='ineligible')return {status:'unresolved',reason:'lead-attack-not-melee-contact'};
 return Object.freeze({...out,leadAttackIndex:selection,
   // A neutral fallback participates as neutral, but never gains confirmed
   // natural point-threat/pursuit eligibility from an assumed Size 0.
   canClaimSizeAdvantage:out.status==='verified'});
}
