import json
f='agent-ac7f17fcef729d710.jsonl'
lines=open(f).read().split('\n')
print(len(lines))
for i,l in enumerate(lines[:8]):
    if not l: continue
    d=json.loads(l)
    print(i, d.get('type'), list(d.keys()))
    m=d.get('message')
    if m:
        print('  role',m.get('role'), 'id', m.get('id'), 'usage', m.get('usage'))
        c=m.get('content')
        if isinstance(c,str): print('  str', len(c), c[:200])
        else:
            for b in c:
                print('  block', b.get('type'), str(b)[:300])
