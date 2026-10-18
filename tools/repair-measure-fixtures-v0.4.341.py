#!/usr/bin/env python3
"""Fixture-only v0.4.341 repair: preserve inherited test identities/expectations."""
from pathlib import Path
import hashlib,json
p=Path('index.html')
s=p.read_text()
beforehash=hashlib.sha256(s.encode()).hexdigest()
assert beforehash=='7694fd42bfa53792308344c4e6c051a4ac4d7eeae30b9c48ddb86c10668b40a1',beforehash
def edit(a,b,label):
  global s
  assert s.count(a)==1,(label,s.count(a))
  s=s.replace(a,b,1)
edit("state.combat.initiative={pc:1,monster:6,winner:'monster'};",
     "state.combat.initiative={pc:1,monster:6,rawRolls:{pc:1,foes:6},winner:'monster'};",
     'inherited initial-contact fixture')
edit("state.combat.initiative={rolls:{pc:3,skeletons:5,wolves:2},order:['skeletons','pc','wolves'],winners:['skeletons'],winner:'skeletons'};",
     "state.combat.initiative={rolls:{pc:3,skeletons:5,wolves:2},rawRolls:{pc:3,skeletons:5,wolves:2},order:['skeletons','pc','wolves'],winners:['skeletons'],winner:'skeletons'};",
     'inherited three-sides fixture')
p.write_text(s)
digest=hashlib.sha256(s.encode()).hexdigest()
mp=Path('validation/manifests/v0.4.341.json')
m=json.loads(mp.read_text())
assert m['productionSha256']==beforehash
m['productionSha256']=digest
mp.write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n')
assert s.count("const APP_VERSION='0.4.341';")==1
print('Fixture-only repair; original source and test expectations preserved; SHA256',digest)
