import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {html, version, manifest, expectedNames, checkReport, saveReport} from './common.mjs';

const mode = process.argv[2] || 'slice';
const slice = Number(process.argv[3] || 1);
assert(['slice','native-smoke'].includes(mode));
const name = mode==='slice' ? `chromium-slice-${slice}` : 'native-smoke';
const errors = {pageErrors:[], consoleErrors:[], blockedNetwork:[]};
const report = {...errors, exactProductionBoot:false, passed:false};
// Only this ephemeral route has a bridge. index.html remains byte-exact.
const anchor = '  boot();\n})();';
assert.equal(html.split(anchor).length, 2, 'Expected one existing boot boundary');
const bridge = `window.__kwCI = {
  names:()=>coreHarnessTestDefinitions().map(t=>t.name),
  run:(names,label)=>runHarnessTests(coreHarnessTestDefinitions().filter(t=>names.includes(t.name)),{display:false,label}),
  nativeFixture:()=>{
    const {caster,subject}=harnessInstallBaldandarPoisonFixture328();
    state.combat=null; subject.hp=subject.maxHp;
    subject.diedAtAbsoluteMinute=1; subject.hpBeforePoisonDeath=2;
    caster.preparedSpells.push({spell:'Cureall',level:6,ready:true});syncLegacySpellFields(caster);
    recordDmr2ShipRosterContract('native_baldandar_discovery',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
    return {saveKey:STORAGE.save,state:harnessClone(state),caster:caster.name,subject:subject.name};
  }
};\n`;
const instrumented = html.replace(anchor, bridge+anchor);
const server = http.createServer((request,response)=>{
  if(request.url==='/favicon.ico') {response.writeHead(204);response.end();return;}
  if(!['/index.html','/__validation.html','/'].includes(request.url)) {response.writeHead(404);response.end();return;}
  response.writeHead(200, {'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store'});
  response.end(request.url==='/__validation.html' ? instrumented : html);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({headless:true});
  const context = await browser.newContext({viewport:{width:1400,height:900}});
  await context.route('**/*', route=>{
    if(new URL(route.request().url()).origin===origin) return route.continue();
    errors.blockedNetwork.push(route.request().url());return route.abort();
  });
  context.on('page', page=>{
    page.on('pageerror',error=>errors.pageErrors.push(String(error.stack||error)));
    page.on('console',message=>{if(message.type()==='error') errors.consoleErrors.push(message.text());});
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  const load = async route=>{
    await page.goto(origin+route,{waitUntil:'load'});
    await page.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
    return await page.evaluate(()=>window.KnownWorldTestHarness.getDebugPayload());
  };
  await load('/index.html');
  assert.equal(await page.evaluate(()=>Object.hasOwn(window,'__kwCI')),false);
  assert((await page.locator('#terminal').innerText()).includes(`v${version}`));
  report.exactProductionBoot=true;
  await load('/__validation.html');
  const allNames = await page.evaluate(()=>window.__kwCI.names());
  assert.deepEqual(allNames, manifest.core, 'Embedded definitions differ from ordered manifest');
  if(mode==='slice') {
    const names = expectedNames('slice',slice);
    console.log(`Chromium ${version}: fresh slice ${slice}/4, ${names.length} established core tests`);
    const result = await page.evaluate(async names=>{
      const r=await window.__kwCI.run(names,'FRESH CHROMIUM SLICE');
      await window.KnownWorldTestHarness.getDebugPayload();return r;
    },names);
    Object.assign(report,result);
    checkReport(result,names);
  } else {
    const fixture = await page.evaluate(()=>window.__kwCI.nativeFixture());
    await context.close();
    // Seed once, then let actual production boot migration and reload own storage.
    const native = await browser.newContext({viewport:{width:1400,height:900}});
    native.on('page', p=>{
      p.on('pageerror',e=>errors.pageErrors.push(String(e.stack||e)));
      p.on('console',m=>{if(m.type()==='error') errors.consoleErrors.push(m.text());});
    });
    await native.route('**/*',route=>{
      if(new URL(route.request().url()).origin===origin)return route.continue();
      errors.blockedNetwork.push(route.request().url());return route.abort();
    });
    await native.addInitScript(({saveKey,state,expectedOrigin})=>{
      if(location.origin!==expectedOrigin)return;
      if(!sessionStorage.getItem('kwNativeFixtureSeeded')){
        localStorage.setItem(saveKey,JSON.stringify(state));sessionStorage.setItem('kwNativeFixtureSeeded','yes');
      }
    },{...fixture,expectedOrigin:origin});
    const p=await native.newPage();p.setDefaultTimeout(60000);
    const snapshot=async()=> (await p.evaluate(()=>window.KnownWorldTestHarness.getDebugPayload())).campaign;
    const checks=[];
    const check=(label,condition)=>{assert(condition,label);checks.push({name:label,pass:true});};
    const subject=s=>s.party.find(x=>x.name===fixture.subject);
    const caster=s=>s.party.find(x=>x.name===fixture.caster);
    const ready=(s,spell)=>caster(s).preparedSpells.filter(x=>x.spell===spell&&x.ready).length;
    const clock=s=>(s.day-1)*1440+s.minutes;
    const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
    await p.goto(origin+'/index.html',{waitUntil:'load'});
    await p.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));
    check('Exact production has no temporary validation bridge',!await p.evaluate(()=>Object.hasOwn(window,'__kwCI')));
    let active=(await snapshot()).fullState;
    check('Actual source-only poison and explicit sleeping flag survive production boot',Boolean(subject(active).baldandarPoisonSleep)&&subject(active).sleeping===true&&!Object.hasOwn(subject(active),'poisoned'));
    check('Production boot retains literal Baldandar source record',same(subject(active).baldandarPoisonSleep,subject(fixture.state).baldandarPoisonSleep));
    check('Production boot retains unknown-independent prior history',subject(active).diedAtAbsoluteMinute===1&&subject(active).hpBeforePoisonDeath===2);
    await p.reload({waitUntil:'load'});
    let reloaded=(await snapshot()).fullState;
    check('Active poison source survives real browser reload',same(subject(reloaded).baldandarPoisonSleep,subject(active).baldandarPoisonSleep)&&subject(reloaded).sleeping===true);
    const command=async text=>{
      const count=await p.locator('#terminal').evaluate(el=>el.children.length);
      await p.locator('#command').fill(text);await p.locator('#command').press('Enter');
      await p.waitForFunction(count=>document.querySelector('#terminal').children.length>count,count);
    };
    await command('status');
    let inspected=(await snapshot()).fullState;
    check('Native status preserves source, HP, rules, planning contracts and RNG/time',same(subject(inspected),subject(reloaded))&&same(inspected.rules,reloaded.rules)&&same(inspected.dmr2ShipRosterContracts,reloaded.dmr2ShipRosterContracts)&&inspected.seed===reloaded.seed&&clock(inspected)===clock(reloaded));
    const spell=version==='0.4.334'?'Cureall':'Neutralize Poison';
    const before=(await snapshot()).fullState;
    await command(`${fixture.caster} casts ${spell} on ${fixture.subject}`);
    await p.waitForFunction(({key,name})=>{
      const s=JSON.parse(localStorage.getItem(key)||'{}');
      const pc=s.party?.find(x=>x.name===name);return pc&&!Object.hasOwn(pc,'baldandarPoisonSleep');
    },{key:fixture.saveKey,name:fixture.subject});
    const cured=(await snapshot()).fullState;
    check(`Native prepared ${spell} removes source-only poison`,!Object.hasOwn(subject(cured),'baldandarPoisonSleep'));
    check('Native poison cure records explicit waking without healing wounds/history',subject(cured).sleeping===false&&subject(cured).hp===subject(before).hp&&subject(cured).diedAtAbsoluteMinute===1&&subject(cured).hpBeforePoisonDeath===2);
    check('Native spell consumes exactly one prepared copy',ready(cured,spell)===ready(before,spell)-1);
    check('Native out-of-combat spell advances exactly the existing one minute',clock(cured)===clock(before)+1);
    check('Native poison cure preserves RNG, rules and planning-only contracts',cured.seed===before.seed&&same(cured.rules,before.rules)&&same(cured.dmr2ShipRosterContracts,before.dmr2ShipRosterContracts));
    check('Native poison cure does not fabricate a generic poison marker',!Object.hasOwn(subject(cured),'poisoned'));
    await command('save');
    const saved=await snapshot();
    check('Native save writes cured source absence and explicit sleeping false',(()=>{const s=JSON.parse(saved.persistedSaveRaw);return !Object.hasOwn(subject(s),'baldandarPoisonSleep')&&subject(s).sleeping===false;})());
    await p.reload({waitUntil:'load'});
    const final=(await snapshot()).fullState;
    check('Cured absence and false flag survive actual production reload',!Object.hasOwn(subject(final),'baldandarPoisonSleep')&&subject(final).sleeping===false);
    check('Reload retains spell expense, HP, RNG/time, rules and planning contracts',ready(final,spell)===ready(cured,spell)&&subject(final).hp===subject(cured).hp&&final.seed===cured.seed&&clock(final)===clock(cured)&&same(final.rules,cured.rules)&&same(final.dmr2ShipRosterContracts,cured.dmr2ShipRosterContracts));
    Object.assign(report,{passed:true,saveReloadVerified:true,checks,supplementalOnly:true,
      establishedNativeSuiteReplaced:false,total:checks.length});
    await native.close();
  }
  assert.deepEqual(errors.pageErrors,[],'Page/runtime errors');
  assert.deepEqual(errors.consoleErrors,[],'Console errors');
  assert.deepEqual(errors.blockedNetwork,[],'Unexpected external dependency');
  if(mode==='native-smoke') report.passed=true;
  report.success=true;
  console.log(`${name} passed for ${version}`);
} catch(error) {
  report.success=false;report.error=String(error.stack||error);
  console.error(report.error);process.exitCode=1;
} finally {
  saveReport(name,report);
  await browser?.close();await new Promise(resolve=>server.close(resolve));
}
