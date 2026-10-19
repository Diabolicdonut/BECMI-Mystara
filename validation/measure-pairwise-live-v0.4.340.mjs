// v0.4.340: six-goblin surround is a first-class native-browser regression.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import {chromium} from 'playwright';
const html=fs.readFileSync('index.html','utf8');
assert(html.includes("const APP_VERSION='0.4.341';") || (html.includes("const APP_VERSION='0.4.342';") || (html.includes("const APP_VERSION='0.4.343';") || (html.includes("const APP_VERSION='0.4.344';") || html.includes("const APP_VERSION='0.4.345';")))));
assert(!/engagementCapacity|engagementSlots|engagementPoints|engagementLimit/.test(html));
const fixture=fs.readFileSync('validation/fixture-pairwise-v0.4.340.js','utf8');
assert.equal(html.split('  boot();\n})();').length,2);
const candidate=html.replace('  boot();\n})();',fixture+'\n  boot();\n})();');
const server=http.createServer((req,res)=>{
  if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
  if(req.url!='/index.html'&&req.url!='/__pairwise-fixture.html'){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
  res.end(req.url==='/index.html'?html:candidate);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
let browser,assertions=0;const errors=[];
const check=(a,b,msg)=>{assert.deepEqual(a,b,msg);assertions++;};
try {
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext();
  await context.route('**/*',route=>{
    if(new URL(route.request().url()).origin===origin)return route.continue();
    errors.push('external network '+route.request().url());return route.abort();
  });
  context.on('page',p=>{
    p.on('pageerror',e=>errors.push('page '+e));
    p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text());});
  });
  const page=await context.newPage();
  await page.goto(origin+'/index.html',{waitUntil:'load'});
  await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
  check(await page.evaluate(()=>typeof window.__kwPairwise340),'undefined','exact production is not fixture-instrumented');
  await page.goto(origin+'/__pairwise-fixture.html',{waitUntil:'load'});
  await page.waitForFunction(()=>typeof window.__kwPairwise340==='function');
  const run=mode=>page.evaluate(mode=>window.__kwPairwise340(mode),mode);
  const surround=await run('surround');
  check(surround.initial,Array(6).fill('close'),'all six goblins at Close');
  check(surround.legal,Array(6).fill(true),'no attacker denied due to engagement saturation');
  check(surround.contacts,6,'six directed opponent relationships');
  check(surround.cap,null,'no artificial capacity');
  check(surround.group,'close','uniform pairs summarize correctly');
  const mixed=await run('mixed');
  const mixedBands=['far','normal','close','far','normal','close'];
  check(mixed.initial,mixedBands,'distinct Measures coexist');
  check(mixed.pairLookup,mixedBands,'pair-specific lookup stays authoritative');
  check(mixed.group,'mixed','group summary does not replace independent Measures');
  check(mixed.legal,Array(6).fill(true),'all physically valid attackers remain eligible at differing Measures');
  const contest=await run('contest');
  check(contest.initial,mixedBands,'pairwise contest starts from real individual bands');
  check(contest.resolved,['far','close','close','far','far','close'],'Size and initiative act independently on each pair');
  check(contest.repeat,contest.resolved,'once-only round resolution');
  check(contest.afterSeed,contest.beforeSeed,'shared side initiative never rerolled');
  check(contest.rounds,[2,2],'Measure contest does not consume round');
  check(contest.rolls,{pc:4,foes:5},'one initiative roll per side');
  check(contest.group,'mixed','group retains mixed result');
  const barrier=await run('barrier');
  check(barrier.blocked,true,'actual wall blocks relevant contact');
  check(barrier.removed,true,'blocked contact is not an engagement');
  check(barrier.remaining,5,'barrier does not erase other valid attackers');
  const save=await run('save');
  check(save.before.version,1,'pairwise state explicitly versioned before save');
  check(save.savedSeed,save.before.seed,'native serialization preserves the exact RNG seed');
  const {seed:reloadedSeed,...restoredPairs}=save.after;
  const {seed:serializedSeed,...originalPairs}=save.before;
  check(restoredPairs,originalPairs,'native save/load preserves all six Measures, coordinates and round');
  check(Number.isInteger(reloadedSeed),true,'existing native loader RNG remains a valid seed');
  check(errors,[],'zero page console or network errors');
  console.log(JSON.stringify({status:'PASS',scenarios:5,assertions,version:'0.4.340',sixGoblinSurround:'6/6',errors}));
}catch(e){console.error(e.stack||String(e));process.exitCode=1}
finally{await browser?.close();await new Promise(r=>server.close(r))}
