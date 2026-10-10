import re,collections
src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
agg=collections.defaultdict(lambda: collections.defaultdict(lambda:[set(),0,0.0]))
nwork=collections.Counter()
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review'): continue
        nwork[(tag,'work' if role!='judge' else 'judge')]+=1
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            parts=re.split(r'&&|;',cmd)
            arts=set()
            for p_ in parts:
                if READ.match(p_):
                    for kd,r in READ_ART.items():
                        if re.search(r,p_): arts.add(kd)
            for kd in arts:
                e=agg[kd][tag]; e[0].add(aid); e[1]+=1; e[2]+=call_cost(a,k)/len(arts)
print(nwork)
for kd,d in agg.items():
    print(kd,{t:(len(e[0]),e[1],round(e[2]/1e3)) for t,e in d.items()})
