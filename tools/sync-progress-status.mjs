// Generates the self-contained, offline-friendly status badge in the game header.
// Source: site-progress.json; detailed authority: DEVELOPMENT-ROADMAP.md.
// --check refuses stale UI without changing production bytes. No app state touched.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const START = '<!-- KNOWN-WORLD-ROADMAP-STATUS-START -->';
const END = '<!-- KNOWN-WORLD-ROADMAP-STATUS-END -->';
const file = 'index.html';
const html = fs.readFileSync(file, 'utf8');
const model = JSON.parse(fs.readFileSync('site-progress.json', 'utf8'));
const gameplayVersion = html.match(/const APP_VERSION='([^']+)'/)?.[1];
assert(gameplayVersion, 'Missing application version');
assert.equal(model.revision, 'v' + gameplayVersion, 'Published revision must equal accepted gameplay build');
assert.equal(model.roadmap?.document, 'DEVELOPMENT-ROADMAP.md', 'Link to authoritative roadmap missing');
assert(fs.existsSync(model.roadmap.document), 'Authoritative roadmap missing');
const gates = model.roadmap.gates;
assert(Array.isArray(gates) && gates.length > 0);
assert.equal(new Set(gates.map(x => x.id)).size, gates.length, 'Duplicate roadmap gate');
const weights = gates.map(x => {
  assert(/^[a-z0-9-]{2,64}$/.test(x.id));
  assert(['accepted', 'partial', 'planned'].includes(x.status));
  assert(Number.isInteger(x.weight) && x.weight > 0);
  assert(typeof x.evidence === 'string' && x.evidence.length > 0);
  return x.weight;
});
const total = weights.reduce((a,b) => a+b,0);
assert.equal(total,100,'The approved whole-product vision must have 100 weighted points');
const accepted = gates.reduce((sum,x) => sum+(x.status==='accepted'?x.weight:0),0);
const number = String(accepted);
const version = model.revision.replace(/[^a-zA-Z0-9.-]/g,'');
assert(/^v[0-9]+[.][0-9]+[.][0-9]+$/.test(version));
const badge = [
  START,
  '      <a class="badge" id="known-world-roadmap-summary" href="./status.html" style="color:var(--accent);text-decoration:none;display:inline-flex;align-items:center;gap:8px" title="Accepted gameplay revision and entire 100-point long-term OSR roadmap; open detailed status" aria-label="Revision '+version+', overall roadmap '+number+' percent. Open development status">',
  '        <strong>Rev '+version+'</strong><span>Full roadmap '+number+'%</span><progress value="'+number+'" max="100" style="width:70px;height:8px;accent-color:var(--accent)" aria-label="Whole-project development completion"></progress>',
  '      </a>',
  END
].join('\n');

let updated;
const begin = html.indexOf(START);
const end = html.indexOf(END);
if(begin >= 0 || end >= 0) {
  assert(begin >= 0 && end > begin, 'Status delimiters do not match');
  assert.equal(html.indexOf(START,begin+START.length),-1,'Duplicate status indicator');
  updated = html.slice(0,begin) + badge + html.slice(end+END.length);
} else {
  const anchor = '      <span class="badge status-off" id="aiBadge">AI referee: not configured</span>';
  assert.equal(html.split(anchor).length,2,'Expected unique statusbar anchor');
  updated = html.replace(anchor,anchor+'\n'+badge);
}
assert.equal(updated.includes(START),true);
assert.equal(updated.includes(END),true);
if(process.argv.includes('--check')) {
  assert.equal(html,updated,'Stale in-game roadmap badge; run node tools/sync-progress-status.mjs');
  console.log('In-game revision and whole-vision weighted progress are synchronized: '+version+', '+number+'%');
} else if(updated !== html) {
  fs.writeFileSync(file,updated);
  const manifestPath='validation/manifests/'+version+'.json';
  const manifestText=fs.readFileSync(manifestPath,'utf8');
  const hash=createHash('sha256').update(updated).digest('hex');
  const checksumPattern=/("productionSha256"\s*:\s*")[a-f0-9]{64}("?)/;
  assert(checksumPattern.test(manifestText),'Accepted-version manifest checksum missing');
  const refreshed=manifestText.replace(checksumPattern,(_match,head,tail)=>head+hash+tail);
  fs.writeFileSync(manifestPath,refreshed);
  console.log('Updated in-game accepted revision '+version+', full roadmap '+number+'% and production manifest SHA-256 '+hash);
} else {
  console.log('Game header roadmap badge already current');
}
