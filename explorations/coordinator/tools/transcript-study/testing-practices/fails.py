import pickle,re,collections
exec(open('cost.py').read().split("res=collections.defaultdict")[0])
pats=[
 ('harness-one relative scratch dir', lambda cmd,res: 'harness-one' in cmd and 'tests does not exist' in res),
 ('sleep blocked by the tool', lambda cmd,res: 'Blocked: sleep' in res),
 ('wait moved to background at 120 s', lambda cmd,res: 'moved to the background' in res),
 ('auto-mode check refused', lambda cmd,res: 'denied by a built-in' in res),
 ('git index.lock', lambda cmd,res: 'index.lock' in res),
 ('compile: Cannot find file', lambda cmd,res: 'Cannot find file' in res and 'fortress' in cmd),
]
agg=collections.defaultdict(lambda:[0,0.0,set(),collections.Counter()])
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash' or c['res'] is None: continue
            cmd=c['input'].get('command',''); res=c['res']
            for n,f in pats:
                if f(cmd,res):
                    e=agg[n]; e[0]+=1; e[1]+=call_cost(a,k); e[2].add((tag,aid)); e[3][tag]+=1
for n,e in agg.items(): print(f'{n:40s} events={e[0]:3d} agents={len(e[2]):3d} ITE={e[1]/1e3:.0f}K per batch {dict(e[3])}')
