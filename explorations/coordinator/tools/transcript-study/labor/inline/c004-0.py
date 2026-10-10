import json
f="$f"
n=0
for l in open(f):
    d=json.loads(l)
    n+=1
    if n<=6:
        print(n,d.get('type'),list(d.keys()))
        m=d.get('message',{})
        print('  role',m.get('role'),'usage',m.get('usage'), 'id', m.get('id'))
        c=m.get('content')
        if isinstance(c,list):
            for b in c: print('   block',b.get('type'), str(b)[:200].replace('\n',' '))
        else: print('   content',str(c)[:200])
print(n)
