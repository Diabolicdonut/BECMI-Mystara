import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const ls=html.split(/\r?\n/);
const audit=fs.readFileSync('audit.md','utf8');
const designs=['BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md','design/context-matrix/Known_World_Contextual_Weapon_Damage_Rules_v0.1.md','design/context-matrix/Known_World_Weapon_Effectiveness_Atlas_v0.4.md'];
const out=['# v0.4.338 preimplementation inspection','', 'HTML lines: '+ls.length+'; bytes: '+html.length,'','## Newest audit','',audit.slice(0,7500),''];
for(const f of designs){const text=fs.readFileSync(f,'utf8');const lines=text.split('\n');const hits=[];for(let i=0;i<lines.length;i++)if(/minimum damage|minimum of 1|at least 1|floor|successful hit|cannot.*below 1|reduced.*zero/i.test(lines[i]))hits.push((i+1)+': '+lines.slice(Math.max(0,i-1),i+3).join(' ').slice(0,600));out.push('## '+f+' min damage evidence',...hits.slice(0,40),'');}
const groups=[
['Mode and calculator',/CONTEXT_MATRIX|weaponDamageMode|calculateContextMatrix|CONTEXT_MATRIX_DATA|RAW'\|\|active/],
['Combat/damage function declarations',/(?:function|const|let|async)\s+\w*(?:damage|attack|combat|weapon|hit|strike|monster|target|wield|equip|measure|space|protection|size)\w*\s*(?:\(|=)/i],
['Damage formula, hit application',/appliedBase|rawBase|matrixBase|damageRoll|rollDamage|damageAmount|damageTaken|damageTotal|damageExpr|damageExpr|applyDamage|dealDamage|rollDice|damageBonus|damageModifier/],
['Monster attack eligibility/target context',/attackContext|COMBAT_MONSTERS|physicalProtection|targetSize|combatSpace|fightMeasure|fightingMeasure|engagementDistance|measureState|spaceState/]];
for(const [group,pattern] of groups){const hits=[];for(let i=0;i<ls.length;i++)if(ls[i].length<6000&&pattern.test(ls[i]))hits.push({i:i+1,line:ls[i].trim().slice(0,220)});out.push('## '+group+' (total '+hits.length+')','',...hits.slice(0,170).map(x=>x.i+': '+x.line),'');}
fs.mkdirSync('validation/candidate-v0.4.338',{recursive:true});
fs.writeFileSync('validation/candidate-v0.4.338/source-inspection.md',out.join('\n').slice(0,120000)+'\n');
console.log('Combat inspection prepared: '+ls.length+' lines; wrote source-inspection.md');
const ranges={
  'damage-weapon':'17390-17545',
  'damage-pc':'18390-18495',
  'monsters-runtime':'16070-16140,16255-16375',
  'combat-extras':'17400-17455,17530-17590',
  'actions':'11605-11648,15708-15758'
};
for(const [name,intervals] of Object.entries(ranges)){
 const blocks=['# v0.4.338 '+name+' source snippets',''];
 for(const part of intervals.split(',')){const [start,end]=part.split('-').map(Number);
 blocks.push('## Production HTML lines '+start+'-'+end,'');
 for(let n=start;n<=end;n++){const line=ls[n-1]??'';blocks.push(n+': '+line.slice(0,1800));}
 blocks.push('');}
 fs.writeFileSync('validation/candidate-v0.4.338/'+name+'.md',blocks.join('\n').trimEnd()+'\n');
}
const targeted=[];
for(let i=0;i<ls.length;i++){
 const l=ls[i];
 if(l.length<5000&&/(?:function\s+\w+(?:Attack|Damage|Combat|Strike|Turn|Weapon)\w*\s*\(|function\s+(?:perform|resolve|execute|apply|roll)\w*(?:attack|weapon|damage|combat)\w*\s*\()/i.test(l))targeted.push((i+1)+': '+l.slice(0,500));
}
fs.writeFileSync('validation/candidate-v0.4.338/attack-function-index.md',['# Attack-related function declarations','',...targeted].join('\n').trimEnd()+'\n');
