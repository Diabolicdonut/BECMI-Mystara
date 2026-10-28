// Browser acceptance: revision/progress visible while playing the immutable engine.
// Tests the production HTML unchanged and the same-origin read-only wrapper.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {chromium} from 'playwright';
import {saveReport} from './common.mjs';

const base=process.cwd();
const files=new Set(['play.html','index.html','status.html','site-progress.js',
  'site-progress.json','ROADMAP-COVERAGE.md','pipeline-state.md']);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
let checks=0;
const errors=[];
const assertCheck=(actual,expected,why)=>{assert.deepEqual(actual,expected,why);checks++;};
const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=new URL(req.url,'http://127.0.0.1').pathname.slice(1);}
  catch{res.writeHead(400);res.end();return;}
  if(pathname==='favicon.ico'){res.writeHead(204);res.end();return;}
  if(!files.has(pathname)){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(pathname)]||'text/plain',
    'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  fs.createReadStream(path.join(base,pathname)).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
  const origin='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  await context.route('**/*',r=>{
    if(new URL(r.request().url()).origin===origin) return r.continue();
    errors.push('external request '+r.request().url());return r.abort();
  });
  context.on('page',p=>{
    p.on('pageerror',e=>errors.push('pageerror '+e.message));
    p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text());});
  });
  const page=await context.newPage();
  await page.goto(origin+'/play.html',{waitUntil:'load'});
  await page.waitForFunction(()=>document.querySelector('[data-progress-overview]')?.textContent.includes('20%'));
  const stats=await page.locator('[data-progress-overview]').innerText();
  assertCheck(stats.includes('v0.4.347'),true,'Accepted v0.4.347 visible above game');
  assertCheck(stats.includes('20%'),true,'100-point full-product accepted progress visible');
  assertCheck(stats.includes('v0.4.348'),true,'Unaccepted next milestone shown');
  assertCheck(stats.includes('0 of 1 accepted'),true,'Next milestone not marked complete');
  const frame=page.frameLocator('iframe#game');
  await frame.locator('#command').waitFor({state:'attached',timeout:30000});
  assertCheck(await frame.locator('#command').count(),1,'Actual game command input is available');
  const inline=frame.locator('#known-world-roadmap-summary');
  assertCheck(await inline.count(),1,'Direct production game contains a single roadmap badge');
  const inlineText=await inline.innerText();
  assertCheck(inlineText.includes('Rev v0.4.348'),true,'Direct candidate game header displays candidate revision');
  assertCheck(inlineText.includes('Full roadmap 20%'),true,'Direct game header displays total-vision progress');
  assertCheck(await inline.locator('progress').getAttribute('value'),'20',
    'Offline header progress value matches approved weighted accepted count');

  assertCheck(await frame.locator('body').evaluate(()=>typeof window.KnownWorldTestHarness),
    'object','Unmodified production game boots in playable wrapper');
  assertCheck(await page.evaluate(()=>{
    const f=document.getElementById('game');return f.contentDocument?.location?.origin===location.origin;
  }),true,'Game is same-origin and can use its existing save storage');
  const bounds=await page.evaluate(()=>{
    const h=document.querySelector('header').getBoundingClientRect();
    const f=document.querySelector('iframe#game').getBoundingClientRect();
    return {headerBottom:h.bottom,iframeTop:f.top,iframeHeight:f.height,
      frameWidth:f.width,windowWidth:innerWidth};
  });
  assertCheck(bounds.iframeTop>=bounds.headerBottom-1,true,'Game begins below status header');
  assertCheck(bounds.iframeHeight>=150,true,'Desktop game has usable height');
  assertCheck(bounds.frameWidth<=bounds.windowWidth,true,'Desktop layout has no horizontal overflow');
  assertCheck(await page.locator('nav a[href="./index.html"]').count(),1,
    'Direct full-screen game escape is available');
  assertCheck(await page.locator('nav a[href="./ROADMAP-COVERAGE.md"]').count(),1,
    'Authoritative full roadmap remains linked');
  await page.setViewportSize({width:390,height:740});
  const mobile=await page.evaluate(()=>{
    const f=document.querySelector('iframe#game').getBoundingClientRect();
    const h=document.querySelector('header').getBoundingClientRect();
    return {iframeHeight:f.height,iframeTop:f.top,headerBottom:h.bottom,
      docWidth:document.documentElement.scrollWidth,screenWidth:innerWidth};
  });
  assertCheck(mobile.iframeHeight>=150,true,'Narrow-screen game remains playable');
  assertCheck(mobile.iframeTop>=mobile.headerBottom-1,true,'Narrow-screen status header not overlapping game');
  assertCheck(mobile.docWidth<=mobile.screenWidth+1,true,'Narrow-screen header has no horizontal overflow');
  assertCheck(errors,[],'No unexpected external requests or console/page errors');
  saveReport('roadmap-playable-status',{passed:true,scenarios:2,assertions:checks,errors});
  console.log(JSON.stringify({status:'PASS',scenarios:2,assertions:checks,errors}));
}catch(e){
  console.error(e.stack);process.exitCode=1;
}finally{
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
