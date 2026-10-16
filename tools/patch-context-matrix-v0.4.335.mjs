// One-time v0.4.335 bounded patch of accepted production HTML.
import fs from 'node:fs';
import assert from 'node:assert/strict';
let s=fs.readFileSync('index.html','utf8');
assert(s.includes("const APP_VERSION='0.4.334';"),'Expected accepted v0.4.334 input');
const data=JSON.parse(fs.readFileSync('data/context-matrix-weapon-profiles.json','utf8'));
assert.equal(data.weapons.length,46);
const rep=(a,b,label)=>{const n=s.split(a).length-1;assert.equal(n,1,'Expected exactly one '+label+', got '+n);s=s.replace(a,b)};
rep("const APP_VERSION='0.4.334';","const APP_VERSION='0.4.335';",'version');
rep("combat:null,\n    rules:{weaponDamageMode:'MATRIX',weaponAudit:true,","combat:null,\n    rules:{weaponDamageMode:'RAW',weaponAudit:true,",'new-game RAW default');
rep('<button type="button" id="matrixWeaponsButton">CONTEXTUAL MATRIX</button>','<button type="button" id="contextWeaponsButton">CONTEXT MATRIX (DATA ONLY)</button>\n            <button type="button" id="matrixWeaponsButton">AAE MATRIX</button>','mode UI');
rep("const rawWeaponsButton = document.getElementById('rawWeaponsButton');","const rawWeaponsButton = document.getElementById('rawWeaponsButton');\n  const contextWeaponsButton = document.getElementById('contextWeaponsButton');",'mode DOM');
rep("matrixWeaponsButton.disabled = rules.weaponDamageMode === 'MATRIX';","contextWeaponsButton.disabled = rules.weaponDamageMode === 'CONTEXT_MATRIX';\n    matrixWeaponsButton.disabled = ['MATRIX','AAE'].includes(rules.weaponDamageMode);",'mode UI state');
const a=s.indexOf('  function setWeaponMode(mode) {'), b=s.indexOf('  function toggleWeaponAudit()',a);
assert(a>=0&&b>a,'mode bounds');
const newMode=[
"  function setWeaponMode(mode) {",
"    const value=String(mode??'').toUpperCase();",
"    // MATRIX is the historical AAE-family damage token; legacy saves retain it.",
"    if(!['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(value)){",
"      write('Use weapon mode raw, weapon mode context matrix, or weapon mode aae.','warning');",
"      return false;",
"    }",
"    state.rules.weaponDamageMode=value;",
"    addEvent('Weapon damage mode changed to '+value+'.');",
"    write(value==='RAW'?'Weapon damage set to Rules Cyclopedia RAW values.':",
"      value==='CONTEXT_MATRIX'?'Context Matrix data mode selected; live damage remains RAW in v0.4.335.':",
"      'AAE matrix selected; existing matrix damage behavior remains unchanged.','system');",
"    updatePanels();",
"    return true;",
"  }",
"",
].join('\n');
s=s.slice(0,a)+newMode+s.slice(b);
rep("if(!['RAW','MATRIX'].includes(String(rules.weaponDamageMode||'').toUpperCase())) rules.weaponDamageMode='MATRIX';","const selectedWeaponMode=String(rules.weaponDamageMode??'').toUpperCase();\n    rules.weaponDamageMode=['RAW','CONTEXT_MATRIX','AAE','MATRIX'].includes(selectedWeaponMode)?selectedWeaponMode:'RAW';",'save validation');
rep("if(rules.weaponDamageMode==='MATRIX'&&rules.initiativeMode==='PHASED'","if(['MATRIX','AAE'].includes(rules.weaponDamageMode)&&rules.initiativeMode==='PHASED'",'house profile');
rep("if(active==='RAW'){\n      rawRoll=rollDamageExpression","if(active==='RAW'||active==='CONTEXT_MATRIX'){\n      rawRoll=rollDamageExpression",'combat RAW');
rep("appliedBase=active==='RAW'?rawBase:matrixBase","appliedBase=(active==='RAW'||active==='CONTEXT_MATRIX')?rawBase:matrixBase",'mastery minimum');
rep("dmg?.active==='MATRIX'?dmg?.matrixExpr:dmg?.rawExpr","['MATRIX','AAE'].includes(dmg?.active)?dmg?.matrixExpr:dmg?.rawExpr",'mastery AAE');
rep("state.rules?.weaponDamageMode==='RAW'&&item?.itemId==='sword_bastard'","['RAW','CONTEXT_MATRIX'].includes(state.rules?.weaponDamageMode)&&item?.itemId==='sword_bastard'",'bastard timing');
rep("rawWeaponsButton.addEventListener('click',()=>setWeaponMode('RAW'));\n  matrixWeaponsButton.addEventListener('click',()=>setWeaponMode('MATRIX'));","rawWeaponsButton.addEventListener('click',()=>setWeaponMode('RAW'));\n  contextWeaponsButton.addEventListener('click',()=>setWeaponMode('CONTEXT_MATRIX'));\n  matrixWeaponsButton.addEventListener('click',()=>setWeaponMode('AAE'));",'UI listeners');
rep("if (normalized === 'weapon mode matrix' || normalized === 'weapons matrix' || normalized === 'contextual weapon damage') return setWeaponMode('MATRIX');","if (normalized === 'weapon mode matrix' || normalized === 'weapons matrix' || normalized === 'contextual weapon damage') return setWeaponMode('MATRIX');\n    if (['weapon mode context matrix','weapon mode context','weapons context matrix','context matrix mode'].includes(normalized)) return setWeaponMode('CONTEXT_MATRIX');\n    if (['weapon mode aae','weapons aae','aae weapon damage'].includes(normalized)) return setWeaponMode('AAE');",'command routes');
rep("const RC_WEAPON_MATRIX = {","// v0.4.335 workbook-derived profiles only; no contextual calculator or live effect.\n  const CONTEXT_MATRIX_DATA = Object.freeze("+JSON.stringify(data)+");\n  const RC_WEAPON_MATRIX = {",'canonical data');
assert(s.includes("const APP_VERSION='0.4.335';")&&s.includes('const CONTEXT_MATRIX_DATA = Object.freeze('));
fs.writeFileSync('index.html',s);
console.log('v0.4.335 patched',Buffer.byteLength(s),'bytes with',data.weapons.length,'profiles');
