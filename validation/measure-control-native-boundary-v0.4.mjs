// Test the EXISTING accepted game's live BECMI movement/contact and shared
// measure contracts against a proposed Far-only Size/initiative decision.
// No integration of the prototype into live combat is performed.
import fs from 'node:fs';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {evaluateSizeInitiativeMeasure} from '../lib/measure-control-size-initiative.mjs';
import {evaluateSharedMeleeSizeControl} from '../lib/measure-control-shared-adapter-v0.4.mjs';

const html=fs.readFileSync('index.html','utf8'),anchor='  boot();\n})();';
assert.equal(html.split(anchor).length,2,'Unique accepted production boot boundary');
const source=fs.readFileSync('validation/measure-control-native-fixture-v0.4.txt','utf8');
const served=html.replace(anchor,source+'\n'+anchor);
const server=http.createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 if(req.url!=='/index.html'&&req.url!=='/__fixture.html'){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(req.url==='/index.html'?html:served);
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin='http://127.0.0.1:'+server.address().port;
let browser,assertions=0;
const check=(value,reason)=>{assert.ok(value,reason);assertions++;};
const equal=(a,b,reason)=>{assert.deepEqual(a,b,reason);assertions++;};
try{
 browser=await chromium.launch({headless:true});
 const ctx=await browser.newContext();
 const errors=[];
 await ctx.route('**/*',route=>{
  if(new URL(route.request().url()).origin===origin)return route.continue();
  errors.push('Unexpected external network: '+route.request().url());return route.abort();
 });
 ctx.on('page',p=>{p.on('pageerror',e=>errors.push('page '+String(e)));p.on('console',m=>{
  if(m.type()==='error')errors.push('console '+m.text());
 });});
 const page=await ctx.newPage();
 await page.goto(origin+'/index.html',{waitUntil:'load'});
 await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
 check(await page.evaluate(()=>typeof window.__kwMeasureBoundary==='undefined'),
   'Exact production must not expose the temporary fixture');
 await page.goto(origin+'/__fixture.html',{waitUntil:'load'});
 await page.waitForFunction(()=>typeof window.__kwMeasureBoundary==='function');
 const run=async id=>page.evaluate(id=>window.__kwMeasureBoundary(id),id);
 const initial=await run('first_contact');
 check(initial.initial,'Actual contact should be established');
 equal(initial.before.records[0].range,'far','New melee starts at Far');
 equal(initial.after.records[0].range,'far','Actual native new-contact contest deferred');
 const far=await run('far_hold_legacy');
 equal(far.before.records[0].range,'far','Far starting state');
 equal(far.after.records[0].range,'normal','Live baseline initiative 4 vs 5 allows entry');
 equal(far.afterDuplicate.records[0].range,'normal','Only one contest per round');
 equal(far.distanceResolveMarker,2,'Round resolution memoized');
 const sword={sizeRating:0},spear={sizeRating:2};
 const movement={A:{Press:true,Open:true},B:{Press:true,Open:true}};
 const proposal=evaluateSizeInitiativeMeasure({
  measure:'Far',intentA:'Hold',intentB:'Press',
  weaponA:spear,weaponB:sword,initiativeA:4,initiativeB:5,
  movement,activeThreatA:true,normalReachPolicy:'far-only'
 });
 equal(proposal.measure,'Far','Prototype with same rolls denies initial entry');
 check(proposal.measure.toLowerCase()!==far.after.records[0].range,
  'Rule is not live in production; divergence expected until authorized integration');
 const normal=await run('normal_hold_legacy');
 equal(normal.after.records[0].range,'close','Actual Normal combat reach result');
 equal(evaluateSizeInitiativeMeasure({
  measure:'Normal',intentA:'Hold',intentB:'Press',weaponA:spear,weaponB:sword,
  initiativeA:4,initiativeB:5,movement,normalReachPolicy:'far-only'
 }).measure,'Close','Far-only matches actual Normal result');
 const geometry=await run('positions_and_barriers');
 check(geometry.contact&&geometry.firstContact&&geometry.groupsAtContact===1,'Actual 3D contact');
 check(!geometry.contactAfterMove&&geometry.groupsAfterMove===0,'Real separation breaks contact');
 check(!geometry.contactBlocked&&geometry.groupsBlocked===0,'Real barrier blocks engagement');
 check(geometry.contactRestored&&geometry.groupsRestored===1,'Contact restores');
 const independent=await run('two_independent_melees');
 check(independent.snapshot.records.length===2,'Independent contacts form separate melee groups');
 equal(new Set(independent.snapshot.records.map(x=>x.range)),
  new Set(['far','close']),'Separate melee groups retain distinct bands');
 const connected=await run('connected_multi_actor');
 check(connected.snapshot.records.length===1,'Connected actors share melee');
 check(connected.snapshot.records[0].pcNames.length===2,'Both PCs in shared melee');
 equal(connected.snapshot.records[0].sideIntents.pc,'press',
  'The actual engine prioritizes one active Press over same-side Hold');
 const multi=evaluateSharedMeleeSizeControl({
  group:connected.snapshot.records[0],
  participants:[
   {sideId:'pc',intent:'Hold',weapon:{sizeRating:2},activeThreat:true,kind:'weapon'},
   {sideId:'pc',intent:'Press',weapon:{sizeRating:-2},activeThreat:false,kind:'weapon'},
   {sideId:'foes',intent:'Press',weapon:{sizeRating:0},activeThreat:true,kind:'weapon'}
  ],sideRolls:{pc:4,foes:5},currentRound:2,allSidesMoved:true
 });
 equal(multi.reason,'multi-combatant-reach-ambiguous','Do not apply pairwise reach to multi-group');
 const retreat=await run('real_retreat');
 check(retreat.retreating===true,'Native retreat flag');
 check(retreat.separation>0&&retreat.after.records.length===0,'Native retreat removes contact');
 check(retreat.afterPosition.x<retreat.start.x,'Native retreat moved away');
 equal(evaluateSharedMeleeSizeControl({
  group:{range:'far',formedRound:1},currentRound:2,allSidesMoved:false,
  participants:[{sideId:'pc',intent:'Hold',weapon:spear,kind:'weapon',activeThreat:true},
                {sideId:'foes',intent:'Press',weapon:sword,kind:'weapon'}],
  sideRolls:{pc:4,foes:5}
 }).reason,'movement-phase-incomplete','RAW side movement incomplete cannot grant bonus');
 equal(evaluateSharedMeleeSizeControl({
  group:{range:'far',formedRound:2},currentRound:2,allSidesMoved:true,
  participants:[{sideId:'pc',intent:'Hold',weapon:spear,kind:'weapon',activeThreat:true},
                {sideId:'foes',intent:'Press',weapon:sword,kind:'weapon'}],
  sideRolls:{pc:4,foes:5}
 }).reason,'new-contact-deferred','Initial-melee deferral preserved');
 const modifier=await run('initiative_modifiers');
 equal(new Set(modifier.sideRolls.map(x=>x[0])),new Set(['pc','foes']),
  'Side IDs obtained from real engine');
 equal(evaluateSharedMeleeSizeControl({
  group:{range:'far',formedRound:1},currentRound:2,allSidesMoved:true,
  participants:[{sideId:'pc',intent:'Hold',weapon:spear,kind:'weapon',activeThreat:true},
                {sideId:'foes',intent:'Press',weapon:sword,kind:'weapon'}],
  sideRolls:Object.fromEntries(modifier.sideRolls),movement
 }).status,'resolved','Modified 7 and 0 initiative side totals are valid');
 equal(errors,[],'No page, console or network errors');
 console.log(JSON.stringify({result:'PASS',
  scope:'actual accepted production integration boundary, NOT live rule integration',
  assertions,
  actualLegacyFarContest:far.after.records[0].range,
  hypotheticalFarOnlyOutcome:proposal.measure,
  normalOutcome:normal.after.records[0].range,
  newContactDeferred:true,
  separateMelees:independent.snapshot.records.length,
  connectedPCs:connected.snapshot.records[0].pcNames.length,
  mixedSameSideIntent:connected.snapshot.records[0].sideIntents.pc,
  retreat:{flag:retreat.retreating,separation:retreat.separation},
  modifiedSideInitiative:modifier.sideRolls},null,2));
}catch(e){console.error(String(e.stack||e));process.exitCode=1;}
finally{await browser?.close();await new Promise(done=>server.close(done));}
