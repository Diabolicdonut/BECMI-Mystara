import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {manifest, saveReport} from './common.mjs';

const script = manifest.establishedNativeScript;
if(!script) {
  saveReport('native-established', {status:'blocked', passed:false,
    requiredChecks:manifest.expectedNativeChecks, executedChecks:0, reason:manifest.nativeBlocker});
  console.error(`::error title=Established native acceptance blocked::${manifest.nativeBlocker}`);
  process.exit(1);
}
// A recovered runner must emit all named checks, errors and actual reload evidence.
const result = spawnSync(process.execPath, [script, '--report=validation/results/native-established.json'], {stdio:'inherit'});
assert.equal(result.status, 0);
const report = JSON.parse(fs.readFileSync('validation/results/native-established.json'));
assert.equal(report.status, 'passed');
assert.equal(report.failed, 0);
assert(report.total >= manifest.expectedNativeChecks);
assert.equal(report.results.length, report.total);
assert.equal(new Set(report.results.map(x=>x.name)).size, report.total);
assert(report.results.every(x=>x.pass===true));
assert.equal(report.isolationPreserved, true);
assert.equal(report.saveReloadVerified, true);
assert.deepEqual(report.pageErrors, []);
assert.deepEqual(report.consoleErrors, []);
