import fs from 'node:fs';
const src=fs.readFileSync('index.html','utf8');
const terms=[
'MONSTER_CATALOG','MONSTER_CATALOGUE','MONSTER_PROFILES','MONSTER_ROSTER','monsterCatalog','monsterCatalogue',
'monsterProfiles','CREATURE_CATALOG','monsterSize','matrixConfidence','Matrix Confidence','Armor / Protection Description',
'Monster Size','protectionDescription','attackDamage','attacksAndDamage','attacks:', 'attacks:', 'damage:', 'Attack / Damage',
'getMonster','spawnMonster','resolveMonster','monsterData','monsterDb','MONSTERS','MONSTER_DATA',
'MONSTER','monsterAttack','catalogue','catalog','profileSource','profileConfidence','attackContext','rawDamage',
'Creature Catalogue','DMR2','sourceRef','Attack / Damage'
];
const lines=src.split('\n'), seen=new Set(), out=[];
out.push('Accepted-source inspection; no production change. Lines: '+lines.length+', bytes: '+Buffer.byteLength(src));
const match=(text,term)=>{const positions=[];let start=0;while(positions.length<12){const i=text.toLowerCase().indexOf(term.toLowerCase(),start);if(i<0)break;positions.push(i);start=i+term.length;}return positions;};
for(const term of terms){
  const pos=match(src,term), all=src.toLowerCase().split(term.toLowerCase()).length-1;
  out.push('\n=== '+term+': '+all+' occurrences ===');
  for(const p of pos.slice(0,6)){
    const before=src.slice(0,p).split('\n').length;
    const frag=src.slice(Math.max(0,p-175),Math.min(src.length,p+230)).replace(/\s+/g,' ');
    out.push('line '+before+': '+frag);
  }
}
out.push('\n=== DECLARATIONS MATCHING MONSTER/CREATURE/ATTACK IN NAME ===');
let count=0;
for(let i=0;i<lines.length;i++){
  const l=lines[i];
  if(/^\s*(?:const|let|var|function)\s+[\w$]*(?:[Mm]onster|[Cc]reature|[Aa]ttack)[\w$]*\s*[=(]/.test(l)){
    const key=l.trim().slice(0,180);
    if(seen.has(key))continue;seen.add(key);
    out.push((i+1)+': '+key);
    if(++count>=180)break;
  }
}
out.push('\\n=== REPRESENTATIVE SOURCE LINES (TRUNCATED PER LINE) ===');
for(const [start,end] of [[12518,12587],[12592,12609],[12615,12660],[16282,16320],[13040,13055]]) {
  out.push('\\n--- lines '+start+'-'+end+' ---');
  for(let k=start;k<=end;k++){
    const raw=lines[k-1]||'';
    out.push(k+' '+raw.slice(0,1250)+(raw.length>1250?' [LINE LENGTH='+raw.length+', TRUNCATED]':''));
  }
}
out.push('\\n=== KEY DECLARATION WINDOWS ===');
for(const term of ['const MONSTER_LORE_RECORDS','function canonicalMonster','function canonicalProfile','const CATALOG_COMBAT_MONSTERS','const COMBAT_MONSTERS','const RUNTIME_MONSTER_CATALOG_INDEX','function monsterAutomationReadiness','attackList','attackDamage']) {
 let i=src.indexOf(term);
 out.push('\\n'+term+' INDEX='+i+': '+(i<0?'absent':src.slice(Math.max(0,i-120),i+2400).slice(0,2400).replace(/\\s+/g,' ')));
}
fs.mkdirSync('validation/candidate-v0.4.337',{recursive:true});
fs.writeFileSync('validation/candidate-v0.4.337/catalogue-inventory.txt',out.join('\n')+'\n');
console.log('Stored '+out.length+' inventory lines for catalogue inspection.');
