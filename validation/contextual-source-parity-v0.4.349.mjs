// v0.4.349: non-mutating source-parity audit of the accepted contextual combat engine.
// This gate deliberately does not implement or authorize another combat rule.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const html = fs.readFileSync('index.html', 'utf8');
const monsterSource = JSON.parse(fs.readFileSync('data/monster-attack-context-v0.4.337.json', 'utf8'));
const weaponSource = JSON.parse(fs.readFileSync('data/context-matrix-weapon-profiles.json', 'utf8'));
const sha256 = crypto.createHash('sha256').update(html).digest('hex');
let assertions = 0;
function check(condition, message) { assert.ok(condition, message); assertions++; }
function equal(actual, expected, message) { assert.deepEqual(actual, expected, message); assertions++; }
function embeddedFrozenJSON(name) {
  const marker = 'const ' + name + ' = Object.freeze(';
  const offset = html.indexOf(marker);
  check(offset !== -1, 'Missing embedded source payload ' + name);
  check(html.indexOf(marker, offset + marker.length) === -1, 'Duplicate payload ' + name);
  const first = html.indexOf('{', offset + marker.length);
  const last = html.indexOf(');\n', first);
  check(first !== -1 && last > first, 'Missing JSON payload boundary ' + name);
  return JSON.parse(html.slice(first, last));
}

equal(embeddedFrozenJSON('CONTEXT_MATRIX_DATA'), weaponSource,
  'Production must embed exactly the 46 accepted canonical weapon profiles');
equal(embeddedFrozenJSON('MONSTER_ATTACK_CONTEXT_DATA'), monsterSource,
  'Production must embed the exact source-backed attack metadata sidecar');
equal(weaponSource.weapons.length, 46, 'Accepted weapon roster: 46, not a new monster weapon matrix');
equal(monsterSource.schemaVersion, 'v0.4.337', 'Source-reviewed attack sidecar version');
equal(monsterSource.profiles.length, 19, 'Source-verified anatomical profile inventory');
equal(monsterSource.sourceExcludedCount, 494, 'Recorded excluded source records');
equal(monsterSource.ambiguousRecordCount, 57, 'Recorded ambiguous source records');
const uniqueProfiles = new Set();
const uniqueAttacks = new Set();
let attacks = 0;
for (const profile of monsterSource.profiles) {
  check(/^MON-\d{4}$/.test(profile.recordId), 'Invalid record identity');
  check(typeof profile.key === 'string' && profile.key.length > 0, 'Missing runtime key');
  check(profile.source === 'Mentzer Basic D&D' && Number.isInteger(profile.sourcePage),
    'No silently inferred source/page: ' + profile.key);
  check(!uniqueProfiles.has(profile.recordId) && !uniqueProfiles.has(profile.key),
    'Duplicate source profile: ' + profile.key);
  uniqueProfiles.add(profile.recordId);
  uniqueProfiles.add(profile.key);
  for (const attack of profile.attacks) {
    attacks++;
    const key = profile.recordId + ':' + attack.attackIndex;
    check(!uniqueAttacks.has(key), 'Duplicate attack identity ' + key);
    uniqueAttacks.add(key);
    check(Number.isInteger(attack.attackIndex) && attack.attackIndex >= 0,
      'Invalid source attack position ' + key);
    check(typeof attack.attackName === 'string' && attack.attackName.length > 0,
      'Missing source attack name ' + key);
    check(typeof attack.damageExact === 'string' && /^\d+d\d+(?:\+\d+)?$/.test(attack.damageExact),
      'Unverified physical dice; specials must not be silently converted ' + key);
    const c = attack.attackContext;
    check(c && c.delivery === 'natural' && c.contextualWeaponDamageEligible === false,
      'Natural attack wrongly eligible for weapon calculator ' + key);
    check(c.provenance && c.provenance.source === profile.source &&
      c.provenance.page === profile.sourcePage &&
      typeof c.provenance.citation === 'string' && c.provenance.citation.length > 10,
      'Attack source provenance does not match profile ' + key);
    check(c.legalMeasures === null, 'Invented anatomical reach legality ' + key);
  }
}
equal(attacks, 41, 'Exactly 41 sourced anatomical attack slots');

const pos = html.indexOf('function contextualNaturalProximityPacket(');
check(pos > 0, 'Accepted separate natural-proximity policy must exist');
const end = html.indexOf('\n  function monsterAttack(', pos);
check(end > pos, 'Bound natural-proximity source-policy body');
const body = html.slice(pos, end);
for (const clause of [
  'pureBecmiRawCombat()',
  "state.rules?.combatProcedureMode!=='CONTEXTUAL'",
  'weaponAttack',
  'attacks.indexOf(spec)',
  'monster.recordId!==profile.recordId',
  'monster.source!==profile.source',
  'Number(monster.sourcePage)!==Number(profile.sourcePage)',
  'spec.name!==original.name',
  'spec.damage!==original.damage',
  "c.delivery==='natural'",
  'c.contextualWeaponDamageEligible===false',
  'c.provenance?.source===p.provenance?.source',
  'c.provenance?.page===p.provenance?.page',
  'MEASURE_NATURAL_SIZE0_SOURCE_FACTS[monster.type]',
  '!annotated&&!wolfBite',
  'getEngagement(pc,monster)?.range',
  "measure==='far'?-1:measure==='close'?1:0",
  'Math.max(0,damage+modifier)'
]) check(body.includes(clause), 'Accepted source/RAW exclusion missing: ' + clause);
check(body.includes("wolf.recordId") && body.includes("wolf.sourcePage") &&
  body.includes("!Object.prototype.hasOwnProperty.call(spec,'attackContext')"),
  'Sourced wolf fallback may not admit fabricated attack metadata');
check(html.includes("wolf_normal:{recordId:'MON-0104',attackName:'bite',damage:'1d6',source:'Mentzer Basic D&D',sourcePage:39"),
  'Independent source-reviewed wolf record must remain exact');
check(html.includes('const proximity=contextualNaturalProximityPacket(monster,pc,spec,damage,{weaponAttack:ordinaryWeapon});'),
  'Physical proximity must stay separate from weapon matrix handling');
check(html.includes('if(proximity.applied){damage=proximity.damage;'),
  'Single per-successful-packet physical adjustment only');

const report = {
  checkpoint: 'v0.4.349-source-audit',
  status: 'source-audit-only; not a gameplay revision or acceptance',
  productionSha256: sha256,
  weapons: weaponSource.weapons.length,
  sourceVerifiedNaturalProfiles: monsterSource.profiles.length,
  sourceVerifiedNaturalAttackSlots: attacks,
  additionallyReviewedWolf: 'MON-0104',
  sourceExcludedRecords: monsterSource.sourceExcludedCount,
  ambiguousRecords: monsterSource.ambiguousRecordCount,
  assertions,
  errors: []
};
fs.mkdirSync('validation/results', {recursive:true});
fs.writeFileSync('validation/results/contextual-source-parity-v0.4.349.json',
  JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({status: 'PASS', ...report}));
