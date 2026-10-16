// Native Acceptance v2 is a new, prospective suite, not the unavailable 523-runner.
import fs from 'node:fs';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';

const file=process.argv[2]||'index.html', label=process.argv[3]||'native-v2';
const html=fs.readFileSync(file,'utf8'), version=html.match(/const APP_VERSION='([^']+)'/)[1];
const report={baseline:'Native Acceptance v2',historical523Rerun:false,appVersion:version,
  commit:process.env.GITHUB_SHA||null,productionSha256:createHash('sha256').update(html).digest('hex'),
  results:[],pageErrors:[],consoleErrors:[],blockedNetwork:[],scenarios:[]};
const check=(name,condition)=>{report.results.push({name,pass:Boolean(condition)});assert(condition,name);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const anchor='  boot();\n})();';assert.equal(html.split(anchor).length,2);
// Only the fixture route exposes internals. All measured commands use exact HTML.
const fixtureSource=`window.__kwNativeFixtures=()=>{
 const cases=[];
 const add=(id,kind,option='')=>{
  let f=kind==='chronology'?harnessInstallPoisonWindowFixture296(option==='old'?110:90):kind==='wood'?harnessInstallWoodSpiderArtifactFixture327():kind==='medusa'?harnessInstallArtifactPoisonOnsetFixture324():harnessInstallBaldandarPoisonFixture328();
  const {caster,subject,rec}=f;
  state.rules.developerMode=true;
  recordDmr2ShipRosterContract('native_v2_contract',harnessDmr2ShipAddedCatapultTargetRangesConfig284());
  let expected={refused:false,revived:false,sourceCleared:true,sleeping:false,artifact:false,pp:0,clock:0,seed:state.seed};
  let spell='Neutralize Poison',query=subject.name;
  if(kind==='chronology'){
   state.combat=null;
   if(option==='unknown')subject.poisonOnsetAtAbsoluteMinute=null;
   if(option==='missing')delete subject.poisonOnsetAtAbsoluteMinute;
   if(option==='wounds')subject.deathCause='wounds';
   if(option==='zero_hp')subject.hpBeforePoisonDeath=0;
   if(option==='null_hp')subject.hpBeforePoisonDeath=null;
   expected.revived=option==='recent';
   subject.poisoned=true;subject.poison='current represented poison';
  }else{
   subject.diedAtAbsoluteMinute=1;subject.hpBeforePoisonDeath=2;
   if(kind==='ordinary'||kind==='sparse')state.combat=null;
   if(option==='full')subject.hp=subject.maxHp;
   if(option==='knockout'){subject.knockedOutRounds=3;expected.sleeping=true;}
   if(option==='artifact_sleep'){subject.artifactSleepEffectId='independent native v2 sleep';expected.sleeping=true;}
   if(option==='symbol'){recordActiveSpellEffect(caster,'Symbol: Sleep',subject.name,30,{category:'control',rawEffect:'symbol_sleep',targetId:subject.id||null,unwakable:true,linkedState:'rawSymbolSleep'});expected.sleeping=true;}
  }
  if(kind==='sparse'){
   delete subject.baldandarPoisonSleep;subject.hp=subject.maxHp;subject.sleeping=true;
   if(option!=='missing')subject.baldandarPoisonSleep=({null:null,false:false,zero:0,empty:'',truthy:{sourceMonsterId:'literal',expiresAbsoluteMinute:null}})[option];
   expected.sourceCleared=option==='truthy';expected.sleeping=option!=='truthy';
  }
  if(kind==='artifact'||kind==='wood'||kind==='medusa'){
   expected.artifact=true;
   const power=option==='neutralize'||kind==='wood'||kind==='medusa'?'neutralize_poison':'heal';
   expected.pp=power==='heal'?100:30;
   if(option==='sole')subject.hp=subject.maxHp;
   if(option==='range')setCombatPcVector(subject,{x:6,y:0,z:0});
   if(option==='dead'){subject.dead=true;subject.hp=0;subject.deathCause='wounds';}
   if(option==='pp')rec.charges=99;
   if(option==='none')rawNeutralizePoison(subject),subject.hp=subject.maxHp;
   if(option==='unknown_target')query='Unrepresented stranger';
   if(option==='explicit')query+=': poison';
   if(option==='unsupported')query+=': none';
   if(option==='blindness'){subject.blinded=true;query+=': blindness';expected.sourceCleared=false;expected.sleeping=true;}
   expected.refused=['multi','range','dead','pp','none','unknown_target','unsupported'].includes(option);
   if(expected.refused){expected.pp=0;expected.sourceCleared=false;expected.sleeping=subject.sleeping;}
   if(!expected.refused){const seed=state.seed;artifactPreparePenalty(rec,artifactPowerRecord(rec,power));expected.seed=state.seed;state.seed=seed;}
   spell=power;
  }else{
   if(option==='unprepared')caster.preparedSpells=caster.preparedSpells.filter(p=>p.spell!==spell),syncLegacySpellFields(caster),expected.refused=true,expected.sourceCleared=false,expected.sleeping=subject.sleeping;
   if(option==='immunity'){const warder=normalizeMember({name:'Wardkeeper',className:'Magic-User',level:36,hp:40,maxHp:40,abilities:{int:18},inventory:[]});state.party.push(warder);resolveBecmiSpellEffect(warder,'Immunity',{order:{target:subject.name},antiMagicChecked:true});expected.refused=true;expected.sourceCleared=false;expected.sleeping=subject.sleeping;}
   expected.clock=expected.refused?0:1;
  }
  expected.seed=expected.artifact?expected.seed:state.seed;
  const command=expected.artifact?'dev artifact use '+rec.id+' by '+caster.name+': '+spell+' at '+query:caster.name+' casts '+spell+' on '+subject.name;
  cases.push({id,kind,option,state:harnessClone(state),caster:caster.name,subject:subject.name,artifactId:rec?.id,spell,command,expected});
 };
 for(const option of ['wounded','full','knockout','artifact_sleep','symbol','unprepared','immunity'])add('ordinary_'+option,'ordinary',option);
 for(const option of ['recent','old','unknown','missing','wounds','zero_hp','null_hp'])add('chronology_'+option,'chronology',option);
 for(const option of ['missing','null','false','zero','empty','truthy'])add('sparse_'+option,'sparse',option);
 for(const option of ['neutralize','sole','explicit','blindness','multi','range','dead','pp','none','unknown_target','unsupported'])add('artifact_'+option,'artifact',option);
 add('wood_spider','wood');add('medusa_episode','medusa');
 return {saveKey:STORAGE.save,cases};
};\n`;
const instrumented=html.replace(anchor,fixtureSource+anchor);
const server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}if(!['/index.html','/__fixtures.html'].includes(req.url)){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(req.url==='/index.html'?html:instrumented);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;
try{
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext();
 await context.route('**/*',route=>{if(new URL(route.request().url()).origin===origin)return route.continue();report.blockedNetwork.push(route.request().url());return route.abort();});
 context.on('page',p=>{p.on('pageerror',e=>report.pageErrors.push(String(e.stack||e)));p.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});});
 await context.addInitScript(expectedOrigin=>{
  if(location.origin!==expectedOrigin)return;
  const raw=sessionStorage.getItem('kwNativeV2PendingStorage');
  if(raw){const values=JSON.parse(raw);localStorage.clear();for(const [k,v] of Object.entries(values))localStorage.setItem(k,v);sessionStorage.removeItem('kwNativeV2PendingStorage');}
 },origin);
 const p=await context.newPage();p.setDefaultTimeout(30000);
 const load=async route=>{await p.goto(origin+route,{waitUntil:'load'});await p.waitForFunction(()=>Boolean(window.KnownWorldTestHarness));};
 const snapshot=async()=>(await p.evaluate(()=>window.KnownWorldTestHarness.getDebugPayload())).campaign;
 const command=async text=>{const n=await p.locator('#terminal').evaluate(e=>e.children.length);await p.locator('#command').fill(text);await p.locator('#command').press('Enter');await p.waitForFunction(n=>document.querySelector('#terminal').children.length>n,n);};
 const clock=s=>(s.day-1)*1440+s.minutes;
 await load('/index.html');check('exact production has no fixture bridge',!await p.evaluate(()=>Object.hasOwn(window,'__kwNativeFixtures')));
 await command('save');const original=(await snapshot()).fullState;
 await p.evaluate(()=>localStorage.setItem('kw-native-v2-sentinel','original isolated campaign'));
 const originalStorage=await p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
 await load('/__fixtures.html');const fixtures=await p.evaluate(()=>window.__kwNativeFixtures());
 check('fixture catalogue contains all 33 documented scenarios',fixtures.cases.length===33);
 const select=s=>({party:s.party,rules:s.rules,seed:s.seed,day:s.day,minutes:s.minutes,combat:s.combat,plans:s.dmr2ShipRosterContracts,vessels:s.vessels});
 const restoreStorage=async values=>p.evaluate(values=>{localStorage.clear();for(const [k,v] of Object.entries(values))localStorage.setItem(k,v);},values);
 for(const f of fixtures.cases){
  const c=(name,ok)=>check(f.id+': '+name,ok);
  await p.evaluate(values=>sessionStorage.setItem('kwNativeV2PendingStorage',JSON.stringify(values)),{...originalStorage,[fixtures.saveKey]:JSON.stringify(f.state)});
  await load('/index.html');c('commands use exact production bytes',!await p.evaluate(()=>Object.hasOwn(window,'__kwNativeFixtures')));
  const subject=s=>s.party.find(x=>x.name===f.subject),caster=s=>s.party.find(x=>x.name===f.caster);
  const ready=s=>caster(s).preparedSpells.filter(x=>x.spell===f.spell&&x.ready).length;
  const artifact=s=>s.artifacts?.records?.find?.(x=>x.id===f.artifactId)||s.artifacts?.records?.[f.artifactId];
  const active=(await snapshot()).fullState;
  if(!same(subject(active).baldandarPoisonSleep,subject(f.state).baldandarPoisonSleep))console.log(JSON.stringify({diagnostic:f.id,actual:subject(active).baldandarPoisonSleep,expected:subject(f.state).baldandarPoisonSleep}));
  c('active source and sparse original survive boot',same(subject(active).baldandarPoisonSleep,subject(f.state).baldandarPoisonSleep)&&Object.hasOwn(subject(active),'baldandarPoisonSleep')===Object.hasOwn(subject(f.state),'baldandarPoisonSleep'));
  await command('status');const read=(await snapshot()).fullState;
  c('read-only status preserves authoritative state',same(select(read),select(active)));
  await p.reload({waitUntil:'load'});const before=(await snapshot()).fullState;
  c('active real reload preserves authoritative state',same(select(before),select(read)));
  await command(f.command);const after=(await snapshot()).fullState,a=subject(after),b=subject(before);
  if(f.expected.refused){
   c('refusal preserves complete subject',same(a,b));
   c('refusal preserves caster preparation',same(caster(after).preparedSpells,caster(before).preparedSpells));
  }else{
   if(f.kind==='sparse')c('only truthy source original is cleared',f.expected.sourceCleared?!Object.hasOwn(a,'baldandarPoisonSleep'):same(a.baldandarPoisonSleep,b.baldandarPoisonSleep)&&Object.hasOwn(a,'baldandarPoisonSleep')===Object.hasOwn(b,'baldandarPoisonSleep'));
   else if(f.kind==='wood')c('source-specific Wood Spider sluggishness is cleared',!Object.hasOwn(a,'woodSpiderSluggish'));
   else if(f.kind==='medusa')c('current onset episode is cleared',!Object.hasOwn(a,'poisonOnsetAtAbsoluteMinute')&&!Object.hasOwn(a,'poisonOnsetCombatRound')&&!Object.hasOwn(a,'poisonOnsetCombatEncounterId'));
   else if(f.kind==='chronology')c('only actual poisoning onset permits revival',a.dead===!f.expected.revived&&a.hp===(f.expected.revived?3:0));
   else c('poison-only choice preserves independent source when appropriate',f.expected.sourceCleared?!Object.hasOwn(a,'baldandarPoisonSleep'):same(a.baldandarPoisonSleep,b.baldandarPoisonSleep));
   if(f.kind!=='chronology')c('cure preserves wounded HP and max HP',a.hp===b.hp&&a.maxHp===b.maxHp);
   if(['ordinary','sparse','artifact'].includes(f.kind))c('independent sleeping cause is preserved',a.sleeping===f.expected.sleeping);
   if(!f.expected.artifact)c('one ready prepared spell is spent',ready(after)===ready(before)-1);
   if(f.option==='blindness')c('selected blindness is cured',!a.blinded);
  }
  c('exact existing RNG semantics',after.seed===f.expected.seed);
  c('exact existing minute cost',clock(after)===clock(before)+f.expected.clock);
  c('rule toggles and planning-only contracts remain isolated',same(after.rules,before.rules)&&same(after.dmr2ShipRosterContracts,before.dmr2ShipRosterContracts)&&same(after.vessels,before.vessels));
  if(f.expected.artifact){
   const findRec=s=>{const all=s.artifacts;const records=Array.isArray(all)?all:all?.records||all?.items||all;return Array.isArray(records)?records.find(r=>r.id===f.artifactId):records?.[f.artifactId];};
   const ar=findRec(after),br=findRec(before);c('printed PP cost and refused artifact history',Boolean(ar&&br)&&ar.charges===br.charges-f.expected.pp&&(!f.expected.refused||same(ar.history,br.history)));
  }
  if(!f.expected.revived)c('unrelated death and former-HP chronology retained',a.diedAtAbsoluteMinute===b.diedAtAbsoluteMinute&&a.hpBeforePoisonDeath===b.hpBeforePoisonDeath&&a.deathCause===b.deathCause);
  await command('save');const saved=await snapshot();c('native save records measured subject literally',same(subject(JSON.parse(saved.persistedSaveRaw)),a));
  await p.reload({waitUntil:'load'});const final=(await snapshot()).fullState;c('cured or refused state survives real save/reload',same(select(final),select(after)));
  await restoreStorage(originalStorage);c('original storage restored exactly',same(await p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))),originalStorage));
  await p.evaluate(values=>sessionStorage.setItem('kwNativeV2PendingStorage',JSON.stringify(values)),originalStorage);
  await p.reload({waitUntil:'load'});c('original campaign restored between cases',same(select((await snapshot()).fullState),select(original)));
  report.scenarios.push(f.id);console.log('Native v2 '+version+' '+f.id+' passed');
 }
 check('all scenario names are unique',new Set(report.scenarios).size===33);
 check('no page errors',report.pageErrors.length===0);check('no console errors',report.consoleErrors.length===0);check('no external network attempts',report.blockedNetwork.length===0);
 Object.assign(report,{status:'passed',isolationPreserved:true,saveReloadVerified:true,restorationVerified:true});
}catch(error){report.status='failed';report.error=String(error.stack||error);console.error(report.error);process.exitCode=1;}
finally{report.total=report.results.length;report.passed=report.results.filter(x=>x.pass).length;report.failed=report.results.filter(x=>!x.pass).length;fs.mkdirSync('validation/results',{recursive:true});fs.writeFileSync('validation/results/'+label+'.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({version,label,status:report.status,total:report.total,passed:report.passed,failed:report.failed}));await browser?.close();await new Promise(r=>server.close(r));}
