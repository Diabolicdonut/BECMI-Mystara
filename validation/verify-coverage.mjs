import fs from 'node:fs';
import assert from 'node:assert/strict';
import {version, productionSha256, manifest, expectedNames, checkReport, saveReport} from './common.mjs';

const read = name => {
  const r = JSON.parse(fs.readFileSync(`validation/results/${name}.json`));
  assert.equal(r.appVersion, version);
  assert.equal(r.productionSha256, productionSha256);
  assert.equal(r.commit, process.env.GITHUB_SHA || null);
  return r;
};
checkReport(read('local-core'), manifest.core);
checkReport(read('local-focused'), manifest.focused);
assert.equal(read('syntax').passed, true);
const names = [];
for(let slice=1; slice<=manifest.slices; slice++) {
  const r = read(`chromium-slice-${slice}`);
  checkReport(r, expectedNames('slice',slice));
  assert.deepEqual(r.pageErrors, []);
  assert.deepEqual(r.consoleErrors, []);
  assert.deepEqual(r.blockedNetwork, []);
  assert.equal(r.exactProductionBoot, true);
  names.push(...r.results.map(x=>x.name));
}
assert.equal(new Set(names).size, names.length);
assert.deepEqual(names, manifest.core, 'Four fresh slices must cover core exactly once in order');
const smoke = read('native-smoke');
assert.equal(smoke.passed, true);
assert.equal(smoke.exactProductionBoot, true);
assert.equal(smoke.saveReloadVerified, true);
assert.deepEqual(smoke.pageErrors, []);
assert.deepEqual(smoke.consoleErrors, []);
assert.deepEqual(smoke.blockedNetwork, []);
const native=read('native-v2');
const baseline=JSON.parse(fs.readFileSync('validation/results/native-v2-v0.4.333.json'));
assert.equal(baseline.appVersion,'0.4.333');
assert.equal(baseline.productionSha256,'0ebadf15242055ae394bf921fda68ca9203a2536b4cd75f33385cc1652ede2d7');
assert.equal(baseline.commit,process.env.GITHUB_SHA||null);
for(const r of [baseline,native]){
  assert.equal(r.baseline,'Native Acceptance v2');assert.equal(r.historical523Rerun,false);
  assert.equal(r.status,'passed');assert.equal(r.failed,0);
  assert.equal(r.passed,r.total);assert.equal(r.results.length,r.total);
  assert(r.results.every(x=>x.pass===true));assert.equal(new Set(r.results.map(x=>x.name)).size,r.total);
  assert.equal(r.scenarios.length,33);assert.equal(new Set(r.scenarios).size,33);
  assert.equal(r.isolationPreserved,true);assert.equal(r.restorationVerified,true);assert.equal(r.saveReloadVerified,true);
  assert.deepEqual(r.pageErrors,[]);assert.deepEqual(r.consoleErrors,[]);assert.deepEqual(r.blockedNetwork,[]);
}
assert.deepEqual(native.scenarios,baseline.scenarios);
assert.deepEqual(native.results.map(x=>x.name),baseline.results.map(x=>x.name));
saveReport('coverage', {passed:true, core:names.length, focused:manifest.focused.length,
  orderedOnceOnly:true,campaignIsolation:true,nativeBaseline:'Native Acceptance v2',
  nativeV2:native.total,nativeV2Accepted333:baseline.total,historical523Rerun:false});
console.log('Core, focused, fresh-slice coverage, isolation, exact boot, native v2 and save/reload evidence agree.');
