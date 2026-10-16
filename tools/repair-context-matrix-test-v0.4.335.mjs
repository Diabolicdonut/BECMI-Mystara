// Bounded v0.4.335 correction: the preexisting default regression still
// expected old MATRIX, but this authorized checkpoint changes new default to RAW.
// Preserve all old test names/order and all other assertions and implementation.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const file='index.html';
let s=fs.readFileSync(file,'utf8');
assert(s.includes("const APP_VERSION='0.4.335';"));
const old="harnessEqual([fresh.rules.weaponDamageMode,fresh.rules.weaponAudit,fresh.rules.initiativeMode,fresh.rules.gettingLostMode,fresh.rules.developerMode],['MATRIX',true,'PHASED','RAW',true],'Default options changed');";
const updated="harnessEqual([fresh.rules.weaponDamageMode,fresh.rules.weaponAudit,fresh.rules.initiativeMode,fresh.rules.gettingLostMode,fresh.rules.developerMode],['RAW',true,'PHASED','RAW',true],'Default options changed');";
const count=s.split(old).length-1;
assert([0,1].includes(count));
if(count===1){s=s.replace(old,updated);fs.writeFileSync(file,s);}
else assert(s.includes(updated),'Neither original nor fixed default regression exists');
const mf='validation/manifests/v0.4.335.json';
const manifest=JSON.parse(fs.readFileSync(mf,'utf8'));
assert.equal(manifest.version,'0.4.335');
assert.equal(manifest.acceptedVersion,'0.4.334');
assert.equal(manifest.core.length,2316);
assert.equal(manifest.focused.length,1232);
manifest.productionSha256=createHash('sha256').update(fs.readFileSync(file)).digest('hex');
fs.writeFileSync(mf,JSON.stringify(manifest,null,2)+'\n');
console.log('Single default regression expectation synchronized with RAW; updated exact SHA',manifest.productionSha256);
