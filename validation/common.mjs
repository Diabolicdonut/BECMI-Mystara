import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

export const html = fs.readFileSync('index.html', 'utf8');
export const version = html.match(/const APP_VERSION='([^']+)'/)?.[1];
assert(version, 'Production APP_VERSION missing');
export const manifest = JSON.parse(fs.readFileSync(`validation/manifests/v${version}.json`));
assert.equal(manifest.version, version);
export const hash = value => createHash('sha256').update(value).digest('hex');
export const productionSha256 = hash(html);
export function saveReport(name, report) {
  fs.mkdirSync('validation/results', {recursive:true});
  fs.writeFileSync(path.join('validation/results', `${name}.json`), JSON.stringify({
    commit:process.env.GITHUB_SHA || null, appVersion:version, productionSha256, ...report
  }, null, 2) + '\n');
}
export function expectedNames(mode, slice) {
  if(mode === 'core') return manifest.core;
  if(mode === 'focused') return manifest.focused;
  assert.equal(mode, 'slice');
  assert(Number.isInteger(slice) && slice >= 1 && slice <= manifest.slices);
  const size = Math.ceil(manifest.core.length / manifest.slices);
  return manifest.core.slice((slice-1)*size, slice*size);
}
export function checkReport(report, names) {
  assert.equal(report.appVersion, version);
  assert.equal(report.isolationPreserved, true, 'Campaign isolation lost');
  assert.equal(report.failed, 0, JSON.stringify(report.results.filter(x=>!x.pass)));
  assert.equal(report.total, names.length);
  assert.equal(report.passed, names.length);
  assert.equal(new Set(report.results.map(x=>x.name)).size, names.length, 'Duplicate test names');
  assert.deepEqual(report.results.map(x=>x.name), names, 'Exact ordered test coverage changed');
  assert.deepEqual(report.runtimeErrors || [], []);
}
