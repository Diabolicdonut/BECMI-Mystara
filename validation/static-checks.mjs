import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {html, version, manifest, productionSha256, saveReport} from './common.mjs';

const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match=>{
  const type=match[1].match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
  return !type || ['text/javascript','application/javascript'].includes(type);
});
assert(scripts.length > 0);
for(const [i, match] of scripts.entries()) new vm.Script(match[2], {filename:`index.inline.${i}.js`});
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'known-world-syntax-'));
try {
  for(const [i,match] of scripts.entries()){
    const file=path.join(temporary,`inline-${i}.cjs`);fs.writeFileSync(file,match[2]);
    const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
  }
} finally {fs.rmSync(temporary,{recursive:true,force:true});}
assert(!/__kw(?:Local|CI)|window\.__test|window\.__validation/.test(html), 'Temporary validation export in production');
assert.equal(new Set(manifest.core).size, manifest.core.length);
assert.deepEqual(manifest.focused, manifest.core.filter(n=>Number(n.match(/^v0\.4\.(\d+)/)?.[1])>=200));
const audit = fs.readFileSync('audit.md', 'utf8');
const pipeline = fs.readFileSync('pipeline-state.md', 'utf8');
assert.equal(audit.match(/Build: \*\*([^*]+)\*\*/)?.[1],manifest.acceptedVersion, 'Accepted audit baseline disagrees');
assert.equal(pipeline.match(/Current accepted build: \*\*v([^*]+)\*\*/)?.[1],manifest.acceptedVersion, 'Accepted pipeline baseline disagrees');
assert.equal(audit.match(/^## v(\d+\.\d+\.\d+) —/m)?.[1],manifest.acceptedVersion, 'Topmost accepted audit entry disagrees');
assert.equal(productionSha256,manifest.productionSha256,'Version manifest does not match exact game bytes');
if(version!==manifest.acceptedVersion) assert(/NOT ACCEPTED/.test(pipeline));
saveReport('syntax', {passed:true, scripts:scripts.length, core:manifest.core.length, focused:manifest.focused.length});
console.log(`Syntax, production hash, acceptance boundary and manifests pass for ${version}`);
