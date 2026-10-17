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