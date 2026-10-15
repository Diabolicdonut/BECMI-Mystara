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
saveReport('coverage', {passed:true, core:names.length, focused:manifest.focused.length,
  orderedOnceOnly:true, campaignIsolation:true, nativeSupplementalOnly:true});
console.log('Core, focused, fresh-slice coverage, isolation, exact boot and supplemental native/reload evidence agree.');
console.log('Established native acceptance is a separate mandatory gate.');
