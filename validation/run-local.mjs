import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {expectedNames, checkReport, saveReport} from './common.mjs';

const mode = process.argv[2];
assert(['core','focused'].includes(mode));
fs.mkdirSync('validation/results', {recursive:true});
const output = `validation/results/local-${mode}.json`;
const result = spawnSync(process.execPath, ['validation/recovered/local-run.cjs', 'index.html', mode, output], {stdio:'inherit'});
assert.equal(result.status, 0, `Recovered ${mode} runner failed`);
const report = JSON.parse(fs.readFileSync(output));
saveReport(`local-${mode}`, report);
checkReport(report, expectedNames(mode));
