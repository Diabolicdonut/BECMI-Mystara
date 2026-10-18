// One-time bounded v0.4.338 addition: authoritative missile measure and deeper tests.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const rd=p=>fs.readFileSync(p,'utf8'),wr=(p,s)=>fs.writeFileSync(p,s),sha=s=>createHash('sha256').update(s).digest('hex');
function once(s,a,b){assert.equal(s.split(a).length,2,'Missing or multiple bounded anchors '+a.slice(0,90));return s.replace(a,b);}
const previous='ef59da86a79ccf66046e3d37a31fea7a80223c6a1c71bf1a3bd90b244f3c7757';
let h=rd('index.html');assert.equal(sha(h),previous);
h=once(h,"  function cmAttackFacts(attacker,target,kind='melee'){",
"  function cmAttackFacts(attacker,target,kind='melee',rangeMeasure=null){");
h=once(h,
"    if(kind!=='melee'||!state.combat?.active)return {measure:null,space:null};\n    const pc=attacker?.type?target:attacker,monster=attacker?.type?attacker:target;\n    const engagement=getEngagement(pc,monster);\n    const measure=cmCanonical(engagement?.range,CM_MEASURES);",
"    if(!state.combat?.active)return {measure:null,space:null};\n    const pc=attacker?.type?target:attacker,monster=attacker?.type?attacker:target;\n    const engagement=kind==='melee'?getEngagement(pc,monster):null;\n    // Missile range band comes from the existing actual combat distance/band\n    // resolution, never from adjacency or weapon optimization. No distance or\n    // explicit range measure means no contextual missile modifier.\n    const missileDistance=kind==='missile'?combatSeparation(pc,monster):null;\n    const measure=kind==='melee'?cmCanonical(engagement?.range,CM_MEASURES):\n      kind==='missile'&&Number.isFinite(missileDistance)?cmCanonical(rangeMeasure,CM_MEASURES):null;");
h=once(h,"  function cmWeaponAdjustment(item,attacker,target,kind='melee',attackSpec=null){",
"  function cmWeaponAdjustment(item,attacker,target,kind='melee',attackSpec=null,rangeMeasure=null){");
h=once(h,"combatFacts=cmAttackFacts(attacker,target,kind),weapon=cmWeaponProfile(item)",
"combatFacts=cmAttackFacts(attacker,target,kind,rangeMeasure),weapon=cmWeaponProfile(item)");
h=once(h,"contextualWeaponDamageEligible:!!weapon&&kind==='melee'",
"contextualWeaponDamageEligible:!!weapon&&(kind==='melee'||kind==='missile')");
h=once(h,"  function applyLiveContextMatrixDamage(packet,item,attacker,target,kind='melee',attackSpec=null){",
"  function applyLiveContextMatrixDamage(packet,item,attacker,target,kind='melee',attackSpec=null,rangeMeasure=null){");
h=once(h,"const context=cmWeaponAdjustment(item,attacker,target,kind,attackSpec);",
"const context=cmWeaponAdjustment(item,attacker,target,kind,attackSpec,rangeMeasure);");
h=once(h,"const trace={mode:'CONTEXT_MATRIX',attacker:attacker?.name||null,target:target?.name||null,",
"const trace={mode:'CONTEXT_MATRIX',attackKind:kind,attacker:attacker?.name||null,target:target?.name||null,");
h=once(h,"dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind);if(",
"dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind,null,band);if(");
const latest=sha(h);wr('index.html',h);
let manifest=JSON.parse(rd('validation/manifests/v0.4.338.json'));
assert.equal(manifest.version,'0.4.338');assert.equal(manifest.productionSha256,previous);
manifest.productionSha256=latest;
wr('validation/manifests/v0.4.338.json',JSON.stringify(manifest,null,2)+'\n');
let pipeline=rd('pipeline-state.md');pipeline=once(pipeline,previous,latest);
pipeline=once(pipeline,'Graphics deferred.','Ordinary canonical missile hits may also use their actual range-band Measure if live distance is known; no range or Space means neutral. Graphics deferred.');
wr('pipeline-state.md',pipeline);
let test=rd('validation/context-matrix-live.mjs');
test=once(test,"assert.equal(manifest.acceptedVersion,'0.4.337');",
"assert(['0.4.337','0.4.338'].includes(manifest.acceptedVersion));");
test=once(test,"assert(html.includes(\"dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind)\"));",
"assert(html.includes(\"dmg=applyLiveContextMatrixDamage(dmg,item,pc,monster,kind,null,band)\"));");
test=once(test,
"    const unknownWeapon=cmWeaponAdjustment({...spear,matrixId:'Unmapped (RC)'},pc,monster,'melee');",
"    const missileBow={...SHOP_ITEMS.bow_short,itemId:'bow_short'};\n    const missileContext=cmWeaponAdjustment(missileBow,pc,monster,'missile',null,'Far');\n    check(missileContext.eligible&&Number.isInteger(missileContext.modifier),\n      'Canonical missile with actual ranged measure must use Context Matrix');\n    const missileHit=applyLiveContextMatrixDamage(packet,missileBow,pc,monster,'missile',null,'Far');\n    check(missileHit.contextMatrix.eligible&&missileHit.applied===Math.max(0,5+missileContext.modifier),\n      'Canonical missile hit damage must match the verified calculator');\n    const noMissileMeasure=cmWeaponAdjustment(missileBow,pc,monster,'missile');\n    check(!noMissileMeasure.eligible&&noMissileMeasure.modifier===0,\n      'Unknown missile Measure must fail neutral');\n    const unknownWeapon=cmWeaponAdjustment({...spear,matrixId:'Unmapped (RC)'},pc,monster,'melee');");
test=once(test,
"    state.combat.lastContextMatrixDamage=null;\n    monster.weaponId='spear';monster.naturalDamage=null;",
"    state.combat.lastContextMatrixDamage=null;\n    monster.contextMatrixTarget={size:'Small',protection:'Hard'};\n    state.combat.contextMatrixSpace='Open';\n    check(setEngagement(pc,monster,'close'),'Actual negative measure not available');\n    for(let i=0;i<8&&!state.combat.lastContextMatrixDamage;i++)\n      pcWeaponAttack(pc,monster,'melee','close');\n    const negativePcTrace=state.combat.lastContextMatrixDamage;\n    check(negativePcTrace&&negativePcTrace.modifier===-3&&\n      negativePcTrace.finalDamage===Math.max(0,negativePcTrace.rawAdjustedDamage-3),\n      'Actual PC negative hit must use exactly -3 after existing modifiers');\n    monster.contextMatrixTarget={size:'Large',protection:'Soft'};\n    state.combat.contextMatrixSpace='Restricted';\n    check(setEngagement(pc,monster,'far'),'Restore long actual fighting measure');\n    state.combat.lastContextMatrixDamage=null;\n    monster.weaponId='spear';monster.naturalDamage=null;");
test=once(test,
"    const saved=JSON.parse(JSON.stringify({rules:state.rules,combat:state.combat}));",
"    const saved=JSON.parse(JSON.stringify({rules:state.rules,combat:state.combat}));\n    updatePanels();");
test=once(test,
"    return {positive:pos.modifier,negative:neg.modifier,zero:zero.modifier,pcTrace,monsterTrace,",
"    return {positive:pos.modifier,negative:neg.modifier,zero:zero.modifier,pcTrace,negativePcTrace,monsterTrace,");
test=once(test,
"      spatialMode:saved.rules.weaponDamageMode,space:saved.combat.contextMatrixSpace,probeCount:24};",
"      spatialMode:saved.rules.weaponDamageMode,space:saved.combat.contextMatrixSpace,probeCount:29};");
test=once(test,
" assert.equal(result.pcTrace.modifier,3);assert.equal(result.monsterTrace.modifier,3);",
" assert.equal(result.pcTrace.modifier,3);assert.equal(result.negativePcTrace.modifier,-3);\n assert.equal(result.monsterTrace.modifier,3);");
test=once(test,
"  spatialMode:saved.rules.weaponDamageMode,space:saved.combat.contextMatrixSpace,probeCount:29};\n  };\n/* END_BROWSER_FIXTURE */",
"  spatialMode:saved.rules.weaponDamageMode,space:saved.combat.contextMatrixSpace,probeCount:29};\n  };\n  window.__kw338Restored=()=>({mode:state.rules?.weaponDamageMode,space:state.combat?.contextMatrixSpace||null});\n/* END_BROWSER_FIXTURE */");
test=once(test,
" assert.deepEqual(errors,[],'Page/console/network errors');",
" await page.reload({waitUntil:'load'});\n const restored=await page.evaluate(()=>window.__kw338Restored());\n assert.equal(restored.mode,'CONTEXT_MATRIX','Mode lost on real save/reload');\n assert.equal(restored.space,'Restricted','Explicit combat Space lost on real save/reload');\n assert.deepEqual(errors,[],'Page/console/network errors');");
wr('validation/context-matrix-live.mjs',test);
wr('validation/README.md',rd('validation/README.md')+
'\nCandidate v0.4.338 additional bounded verification: actual ranged weapon band (not guessed from melee), live PC negative modifier hit, real browser save/reload of explicit combat Space; missing missile band/Space remains neutral.\n');
console.log('v0.4.338 missile and deeper live test extension SHA-256 '+latest);
