// One-time, source-preserving branding update for accepted v0.4.348.
// This file is removed by its branch-specific GitHub Actions job after application.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const sha = s => createHash('sha256').update(s).digest('hex');
const beforeSha='d20c0ca50235de3d4ab756ad612f7cb7cc05254e059f59c69c244812ce8ccb10';
const afterSha='9bdef333cfb208dbcd4ca4e4eba1baa06f1f113cd6e6be9a4a0c8906764ea8a3';
function replaceOnce(s,oldValue,newValue,label){
  assert.equal(s.split(oldValue).length-1,1,'Expected unique '+label);
  return s.replace(oldValue,newValue);
}
const old=fs.readFileSync('index.html','utf8');
assert.equal(sha(old),beforeSha,'Input must be exact accepted v0.4.348 production');
let game=old;
game=replaceOnce(game,'<title>The Smoking Pillar of Lan Yu</title>','<title>The Known World</title>','document title');
game=replaceOnce(game,'<h1>THE SMOKING PILLAR OF LAN YU</h1>','<h1>THE KNOWN WORLD</h1>','visible masthead');
game=replaceOnce(game,'<div class="subtitle">A self-contained BECMI adventure on Kai Besil · Persistent campaign referee</div>','<div class="subtitle">Mentzer BECMI RPG · Current adventure: The Smoking Pillar of Lan Yu</div>','adventure subtitle');
game=replaceOnce(game,"write(`THE SMOKING PILLAR OF LAN YU — CAMPAIGN BUILD v${APP_VERSION}`,'system');","write(`THE KNOWN WORLD — CAMPAIGN BUILD v${APP_VERSION}`,'system');",'startup banner');
assert.equal(sha(game),afterSha,'Four replacements did not produce independently checked SHA');
assert.equal((old.match(/Lan Yu/gi)||[]).length,36);
assert.equal((game.match(/Lan Yu/gi)||[]).length,34,'Lan Yu adventure text must remain intact');
fs.writeFileSync('index.html',game);
let manifest=fs.readFileSync('validation/manifests/v0.4.348.json','utf8');
manifest=replaceOnce(manifest,'"productionSha256": "'+beforeSha+'"','"productionSha256": "'+afterSha+'"','exact production manifest');
fs.writeFileSync('validation/manifests/v0.4.348.json',manifest);
let play=fs.readFileSync('play.html','utf8');
play=replaceOnce(play,'<title>Known World — Play with Roadmap Status</title>','<title>The Known World — Play with Roadmap Status</title>','play document title');
play=replaceOnce(play,'<strong class="brand">Known World / BECMI</strong>','<strong class="brand">The Known World</strong>','play masthead');
play=replaceOnce(play,'title="Known World role-playing game"','title="The Known World role-playing game"','game iframe title');
fs.writeFileSync('play.html',play);
let status=fs.readFileSync('status.html','utf8');
status=replaceOnce(status,'<title>Known World — Revision and Full Roadmap</title>','<title>The Known World — Revision and Full Roadmap</title>','status title');
status=replaceOnce(status,'<h1>Known World / BECMI — Development Status</h1>','<h1>The Known World — Development Status</h1>','status masthead');
fs.writeFileSync('status.html',status);
let check=fs.readFileSync('validation/static-checks.mjs','utf8');
const anchor="const inGameStatusCheck = spawnSync(";
const assertions=[
  "assert(html.includes('<title>The Known World</title>'), 'Game document title must be The Known World');",
  "assert(html.includes('<h1>THE KNOWN WORLD</h1>'), 'Visible game masthead must be The Known World');",
  "assert(html.includes('Current adventure: The Smoking Pillar of Lan Yu'), 'Preserve Lan Yu as the named adventure');",
  "assert(html.includes('THE KNOWN WORLD — CAMPAIGN BUILD'), 'Startup banner must have the project title');",
  ""
].join('\n');
check=replaceOnce(check,anchor,assertions+anchor,'brand acceptance guards');
fs.writeFileSync('validation/static-checks.mjs',check);
const docPrefix='# Known World BECMI Engine Audit\n\n';
let audit=fs.readFileSync('audit.md','utf8');
assert(audit.startsWith(docPrefix),'Unexpected accepted audit header');
const note=[
  '## 2026-10-28 — The Known World project branding (presentation-only v0.4.348)',
  '',
  'Project masthead, browser title and startup banner now say **The Known World**. The current-adventure subtitle explicitly retains **The Smoking Pillar of Lan Yu**; all Kai Besil story, module source identities, adventure records, encounter logic, save and migration formats, combat procedures, native identifiers and accepted test names are preserved. The playable/status wrappers also use the full project title. This is not a gameplay-version bump or a completed whole-product delivery gate.',
  '',
  'The original accepted v0.4.348 production hash was `'+beforeSha+'`; the exact branding-only production HTML SHA-256 is `'+afterSha+'`. The prior v0.4.348 gameplay acceptance evidence remains unchanged. This presentation patch must pass all ten required CI jobs on its work branch and exact merged main, plus GitHub Pages; no automatic acceptance is claimed by staging alone. Continue the separately authorized next v0.4.349 source audit, without skipping any acceptance gates.',
  '',
  ''
].join('\n');
fs.writeFileSync('audit.md',docPrefix+note+audit.slice(docPrefix.length));
let pipeline=fs.readFileSync('pipeline-state.md','utf8');
const pipePrefix='# Known World / BECMI Text RPG — Pipeline State\n\n';
assert(pipeline.startsWith(pipePrefix),'Unexpected pipeline header');
const pipeNote='## 2026-10-28 — Presentation-only title correction, gameplay still v0.4.348\n\nThe game/browser masthead and startup banner identify **The Known World**, with **The Smoking Pillar of Lan Yu** retained as the current adventure. Exact production SHA-256 `'+afterSha+'` (prior accepted game `'+beforeSha+'`). No mechanics, adventure source, persisted game identifiers, or roadmap progress changed. This amendment requires branch and exact-main ten-job acceptance plus Pages; it does not authorize v0.4.349 rule changes.\n\n';
fs.writeFileSync('pipeline-state.md',pipePrefix+pipeNote+pipeline.slice(pipePrefix.length));
assert.equal(sha(fs.readFileSync('index.html')),afterSha);
console.log('Exact v0.4.348 title-only amendment prepared, with source-preserving checksum and audit metadata.');
