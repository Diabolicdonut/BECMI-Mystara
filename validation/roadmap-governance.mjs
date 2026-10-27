#!/usr/bin/env node
// Consistency guard for the *published* whole-product roadmap.
// This checks ledger invariants, not whether a gameplay claim is substantively true.
// Exact gameplay acceptance is established by the existing mandatory full CI and audit.
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const errors = [];
const insist = (ok, why) => { if (!ok) errors.push(why); };
let manifest;
try { manifest = JSON.parse(read('site-progress.json')); }
catch (error) { console.error('Cannot parse site-progress.json:', error.message); process.exit(1); }

const roadmap = read('ROADMAP-COVERAGE.md');
const pipeline = read('pipeline-state.md');
const agents = read('AGENTS.md');
const statusHtml = read('status.html');
const renderer = read('site-progress.js');

insist(manifest.schemaVersion === 1, 'Unsupported manifest schema');
insist(manifest.project === 'BECMI-Mystara', 'Wrong project identity');
insist(typeof manifest.roadmapRevision === 'string' &&
  roadmap.includes('Roadmap revision:** ' + manifest.roadmapRevision),
  'Human/machine roadmap revision mismatch');
insist(manifest.roadmap?.document === 'DEVELOPMENT-ROADMAP.md' &&
  manifest.roadmap?.coverageDocument === 'ROADMAP-COVERAGE.md',
  'Full roadmap and weighted coverage documents must be uniquely assigned');
insist(read('DEVELOPMENT-ROADMAP.md').includes('## 4. Whole-product implementation sequence') &&
  read('DEVELOPMENT-ROADMAP.md').includes('## 6. Required update protocol'),
  'Authoritative whole-product roadmap is missing phases or update protocol');

const pipelineRev = pipeline.match(/^Current accepted build:\s*\*\*(v\d+\.\d+\.\d+)\*\*/m)?.[1];
insist(Boolean(pipelineRev), 'Missing top accepted pipeline revision');
insist(manifest.revision === pipelineRev,
  'Published revision ' + manifest.revision + ' differs from pipeline ' + pipelineRev);
insist(manifest.revisionSource?.file === 'pipeline-state.md',
  'Published revision must be linked to accepted pipeline state');

const gates = manifest.roadmap?.gates;
insist(Array.isArray(gates) && gates.length === 10, 'Expected ten approved long-term gates');
let total = 0, earned = 0;
const ids = new Set();
if (Array.isArray(gates)) for (const gate of gates) {
  insist(typeof gate.id === 'string' && /^[a-z0-9-]+$/.test(gate.id) && !ids.has(gate.id),
    'Missing, invalid or repeated gate ID: ' + String(gate.id));
  ids.add(gate.id);
  insist(Number.isInteger(gate.weight) && gate.weight > 0,
    'Invalid gate weight: ' + String(gate.id));
  insist(['accepted', 'partial', 'planned'].includes(gate.status),
    'Invalid gate status: ' + String(gate.id));
  insist(typeof gate.label === 'string' && gate.label.trim().length > 0 &&
    typeof gate.evidence === 'string' && gate.evidence.trim().length > 0,
    'Gate requires label and evidence: ' + String(gate.id));
  if (Number.isInteger(gate.weight)) {
    total += gate.weight;
    if (gate.status === 'accepted') earned += gate.weight;
  }
}
insist(total === 100, 'Whole-product roadmap must sum to exactly 100 points, found ' + total);

const tableStart = roadmap.indexOf('| Delivery gate |');
insist(tableStart >= 0, 'Human-readable canonical gate table missing');
const rows = tableStart >= 0 ? roadmap.slice(tableStart).split('\n').filter(
  line => /^\| .+ \| \d+ \| (?:accepted|partial|planned) \|/.test(line)
).slice(0, 10).map(line => line.split('|').slice(1, 5).map(x => x.trim())) : [];
insist(rows.length === 10, 'Canonical Markdown gate table must have ten rows');
if (Array.isArray(gates) && rows.length === gates.length) gates.forEach((gate, i) => {
  const [label, weight, state, evidence] = rows[i];
  insist(gate.label === label, 'Gate label drift at row ' + (i + 1));
  insist(String(gate.weight) === weight, 'Gate weight drift for ' + gate.id);
  insist(gate.status === state, 'Gate status drift for ' + gate.id);
  insist(Boolean(evidence), 'Missing human gate authority for ' + gate.id);
});
insist(roadmap.includes('**Overall currently accepted:** ' + earned + '/100'),
  'Published weighted total must match accepted gate statuses: ' + earned + '/100');
insist(roadmap.includes('**' + earned + '%**') || roadmap.includes('**' + earned + '/100'),
  'Human roadmap missing accepted completion figure');

const phases = roadmap.split('\n').filter(line => /^\| (?:[1-9]|10|11)\. /.test(line));
insist(phases.length === 11, 'Long-term Design 21 phases 1-11 must be represented');
insist(agents.includes('DEVELOPMENT-ROADMAP.md') && agents.includes('ROADMAP-COVERAGE.md') && agents.includes('site-progress.json') &&
  agents.includes('roadmap-governance.mjs'), 'Worker contract does not require roadmap sync');
insist(statusHtml.includes('site-progress.js') && renderer.includes('site-progress.json'),
  'Published status page is disconnected from machine-readable ledger');

const next = manifest.progress?.label?.match(/v\d+\.\d+\.\d+/)?.[0];
insist(Boolean(next), 'Current bounded milestone version missing from progress label');
insist(Number.isInteger(manifest.progress?.completed) &&
  Number.isInteger(manifest.progress?.total) &&
  manifest.progress.total > 0 &&
  manifest.progress.completed >= 0 &&
  manifest.progress.completed <= manifest.progress.total,
  'Current milestone numerator/denominator invalid');
insist(next && pipeline.slice(0, 6500).includes(next),
  'Displayed next milestone ' + next + ' not found in top pipeline record');

if (errors.length) {
  for (const error of errors) console.error('ROADMAP FAILED: ' + error);
  process.exit(1);
}
console.log('Known World roadmap valid: ' + pipelineRev + '; ' + earned +
  '/100 accepted delivery points; ' + gates.length + ' gates; 11 long-term phases; next ' + next);
