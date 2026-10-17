import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),write=(p,s)=>fs.writeFileSync(p,s);
const sha=s=>createHash('sha256').update(s).digest('hex');
const once=(s,a,b)=>{assert.equal(s.split(a).length,2,'Missing/duplicated anchor '+a.slice(0,50));return s.replace(a,b);};
let html=read('index.html');
assert.equal(sha(html),'c74c2f529566b957a0550178c4d5f51d5164ba67e4658e07d3e7dedb02daaf7d');
const lines=html.split('\n');
function parseArray(name){
 const l=lines.find(x=>x.includes('const '+name+' = ')),prefix='const '+name+' = ';
 assert(l,'Missing source array '+name);
 return JSON.parse(l.slice(l.indexOf(prefix)+prefix.length).trim().replace(/;\s*$/,''));
}
const fields=parseArray('MONSTER_LORE_FIELDS'),rows=parseArray('MONSTER_LORE_ROWS');
assert.equal(rows.length,600,'Canonical monster source count');
const allowed=new Set(['bite','bites','snakebite','claw','claws','fist','fists','punch','punches','hug','hugs','constriction','constrict']);
const badStatus=/provisional|placeholder|unresolved|alias|family|variant.required|variant.incomplete|unverified|uncertain|source.gap|review.pending/i;
const ambiguous=/\bor\b|by weapon|variable|depends|special|see text|see below|any weapon|spell|gaze|ray|breath/i;
const parsed=rows.map(row=>Object.fromEntries(fields.map((field,i)=>[field,row[i]])));
let skipped=0,ambiguousCount=0;const profiles=[];
function dice(src){
 const t=String(src||'').replace(/\b[Ii]d(?=\d)/g,'1d').trim(),m=t.match(/\d*d\d+(?: *[+-] *\d+)?/i);
 return m?m[0].replace(/ +/g,''):/^\d+$/.test(t)?t:null;
}
for(const rec of parsed){
 if(!/^MON-\d{4}$/.test(rec.monsterId)||!rec.primarySource||!rec.verbatimRulesCitation||badStatus.test(String(rec.sourceStatus||''))){skipped++;continue;}
 const as=String(rec.attacks||''),ds=String(rec.damage||'');
 if(!as||!ds||ambiguous.test(as)||ambiguous.test(ds)){ambiguousCount++;continue;}
 const tokens=as.split('/').map(x=>x.trim()).filter(Boolean),damages=ds.split('/').map(x=>x.trim());
 let offset=0;const attacks=[];
 for(let i=0;i<tokens.length;i++){
  const token=tokens[i],match=/^(\d+)\s+/.exec(token),count=match?Number(match[1]):1;
  const name=token.replace(/^\d+\s*/,'').trim(),damage=dice(damages[Math.min(i,damages.length-1)]||ds);
  const ok=Number.isSafeInteger(count)&&count>=1&&count<=9&&allowed.has(name.toLowerCase())&&damage&&damage!=='0';
  for(let j=0;j<(Number.isSafeInteger(count)&&count>0&&count<=9?count:1);j++,offset++){
   if(!ok)continue;
   attacks.push({attackIndex:offset,attackName:name,damageExact:damage,
    attackContext:{delivery:'natural',preferredMeasure:'Close',legalMeasures:null,contextualWeaponDamageEligible:false,
     preferredMeasureConfidence:'High',
     provenance:{source:rec.primarySource,page:rec.page,citation:rec.verbatimRulesCitation,
      basis:'unambiguous anatomical form; no assumed reach'}}});
  }
 }
 if(attacks.length)profiles.push({
  recordId:rec.monsterId,key:String(rec.name).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').replace(/_+/g,'_'),
  source:rec.primarySource,sourcePage:rec.page,attacks
 });
}
console.log('SOURCE CANDIDATES',profiles.length,'ATTACKS',profiles.reduce((n,p)=>n+p.attacks.length,0),'SKIPPED',skipped,'AMBIGUOUS',ambiguousCount,'FIRST',JSON.stringify(profiles.slice(0,6).map(p=>({id:p.recordId,name:p.key,n:p.attacks.length}))));
assert(profiles.length>0,'No unambiguous source records');
const data={schemaVersion:'v0.4.337',acceptedInputSha256:sha(html),
 policy:'Source-backed anatomy only, never modifies combat damage',profiles,
 sourceExcludedCount:skipped,ambiguousRecordCount:ambiguousCount};
write('data/monster-attack-context-v0.4.337.json',JSON.stringify(data,null,2)+'\n');
const patch=[
 '  // v0.4.337: passive per-attack metadata, never attack legality, AI or damage.',
 '  const MONSTER_ATTACK_CONTEXT_DATA = Object.freeze('+JSON.stringify(data)+');',
 '  for(const row of MONSTER_ATTACK_CONTEXT_DATA.profiles){',
 '    const profile=COMBAT_MONSTERS[row.key];',
 "    if(!profile||profile.recordId!==row.recordId||profile.catalogAuthority!=='workbook-600'||profile.parameterized||profile.variableWeapon||profile.directCombatEligible!==true||!Array.isArray(profile.attacks))continue;",
 '    profile.attacks=profile.attacks.map((attack,i)=>{',
 '      const fact=row.attacks.find(x=>x.attackIndex===i&&x.attackName===attack?.name&&x.damageExact===attack?.damage);',
 '      return fact&&!attack.refereeMediated&&!attack.attackContext?{...attack,attackContext:{...fact.attackContext,provenance:{...fact.attackContext.provenance}}}:attack;',
 '    });',
 '  }',
 ''
].join('\n');
html=once(html,'  // Unified 628-profile runtime catalogue',patch+'  // Unified 628-profile runtime catalogue');
html=once(html,"const APP_VERSION='0.4.336';","const APP_VERSION='0.4.337';");
const hash=sha(html);write('index.html',html);
const base=JSON.parse(read('validation/manifests/v0.4.336.json'));
assert.equal(base.core.length,2316);assert.equal(base.focused.length,1232);
write('validation/manifests/v0.4.337.json',
 JSON.stringify({...base,version:'0.4.337',acceptedVersion:'0.4.336',productionSha256:hash},null,2)+'\n');
write('validation/context-matrix-mode.mjs',once(read('validation/context-matrix-mode.mjs'),
 "const APP_VERSION='0.4.336';","const APP_VERSION='0.4.337';"));
write('.github/workflows/known-world-acceptance.yml',once(read('.github/workflows/known-world-acceptance.yml'),
 '      - run: node validation/context-matrix-calculator.mjs\n',
 '      - run: node validation/context-matrix-calculator.mjs\n      - run: node validation/monster-attack-context.mjs\n'));
let pipeline=read('pipeline-state.md');
pipeline=once(pipeline,
 'Current candidate: **none**. Pure calculator accepted in isolation; no live contextual damage.',
 'Current candidate: **work/v0.4.337 — NOT ACCEPTED**. Per-attack preferred-measure metadata only; authoritative main remains v0.4.336. Await full CI.');
const potential=profiles.reduce((n,p)=>n+p.attacks.length,0);
pipeline=once(pipeline,'## Accepted game and validation\n',
 '## Accepted game and validation\n\n**v0.4.337 candidate (NOT ACCEPTED):** '+profiles.length+
 ' canonical source-verified profile candidates, '+potential+' guarded individual natural attacks (Close only). Unknown reach, alternative and provisional profiles remain unresolved. Original attack expressions, natural damage, live combat, calculator and mode rules unchanged. Candidate production SHA-256 '+hash+'.\n\n');
write('pipeline-state.md',pipeline);
write('validation/README.md',read('validation/README.md')+
 '\n## v0.4.337 candidate — per-attack metadata\n\nRequired native smoke additionally runs validation/monster-attack-context.mjs to verify source-backed attack-level metadata and preserved damage, unknowns and serialization. This checkpoint does not call the pure calculator in live combat.\n');
console.log('v0.4.337 candidate '+profiles.length+' source profiles, '+potential+
 ' potential natural attacks, '+skipped+' excluded status, '+ambiguousCount+
 ' ambiguous records; production SHA-256 '+hash);
