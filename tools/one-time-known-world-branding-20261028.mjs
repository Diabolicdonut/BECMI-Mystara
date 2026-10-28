// One-time, bounded branding patch. No rules, encounter, save, or scenario changes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const sha256 = data => createHash('sha256').update(data).digest('hex');
const originalHash = 'd20c0ca50235de3d4ab756ad612f7cb7cc05254e059f59c69c244812ce8ccb10';
const expectedNewHash = '2820c0194237568370a9e531166a5aec1cc5116096524b5c9ae0af421310044a';
const file = 'index.html';
const old = fs.readFileSync(file, 'utf8');
assert.equal(sha256(old), originalHash, 'Unexpected production main; do not rebrand stale code');

const dollarVersion = '$' + '{APP_VERSION}';
const quote = String.fromCharCode(96);
const swaps = [
  ['<title>The Smoking Pillar of Lan Yu</title>', '<title>The Known World</title>'],
  ['<h1>THE SMOKING PILLAR OF LAN YU</h1>', '<h1>THE KNOWN WORLD</h1>'],
  ['A self-contained BECMI adventure on Kai Besil · Persistent campaign referee',
    'Persistent BECMI campaigns in the Known World · The Smoking Pillar of Lan Yu adventure'],
  ['write(' + quote + 'THE SMOKING PILLAR OF LAN YU — CAMPAIGN BUILD v' + dollarVersion + quote + ",'system');",
    'write(' + quote + 'THE KNOWN WORLD — CAMPAIGN BUILD v' + dollarVersion + quote + ",'system');"]
];
let branded = old;
for (const [before, after] of swaps) {
  assert.equal(branded.split(before).length, 2, 'Expected unique original: ' + before);
  branded = branded.replace(before, after);
}
assert.equal(sha256(branded), expectedNewHash, 'Only the four approved display strings may change');
assert(branded.includes("source:'The Smoking Pillar of Lan Yu'"), 'Lan Yu source records must remain');
assert(branded.includes('THE SMOKING PILLAR OF LAN YU — EXPEDITION COMPLETE.'),
  'Lan Yu ending must remain intact');
fs.writeFileSync(file, branded);

const manifestPath='validation/manifests/v0.4.348.json';
let manifest=fs.readFileSync(manifestPath,'utf8');
const manifestJson=JSON.parse(manifest);
assert.equal(manifestJson.acceptedVersion, '0.4.348');
assert.equal(manifestJson.productionSha256, originalHash);
assert.equal(manifest.split(originalHash).length, 2);
manifest=manifest.replace(originalHash,expectedNewHash);
fs.writeFileSync(manifestPath,manifest);

const testPath='validation/roadmap-playable-status.mjs';
let test=fs.readFileSync(testPath,'utf8');
const anchor="  await frame.locator('#command').waitFor({state:'attached',timeout:30000});";
assert.equal(test.split(anchor).length,2,'Browser test anchor must be unique');
const checks=[
  "  assertCheck(await frame.locator('header h1').innerText(),'THE KNOWN WORLD',",
  "    'The main game displays the project identity');",
  "  assertCheck(await frame.locator('title').textContent(),'The Known World',",
  "    'The browser tab identifies the project');",
  "  assertCheck((await frame.locator('header .subtitle').innerText()).includes('The Smoking Pillar of Lan Yu'),",
  "    true,'The Lan Yu adventure remains featured');"
].join('\n');
test=test.replace(anchor,anchor+'\n'+checks);
fs.writeFileSync(testPath,test);
console.log(JSON.stringify({branding:'The Known World',gameplayVersion:'v0.4.348',
  originalSha256:originalHash,newSha256:expectedNewHash,changedLabels:swaps.length,
  adventurePreserved:true,mode:'presentation-only'}));
