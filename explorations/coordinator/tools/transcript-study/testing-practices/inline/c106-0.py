import re,collections
src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
agents=set(); allag=set(); ite=0; tok=0; n=0; byb=collections.defaultdict(set); nag=collections.defaultdict(set)
byrole=collections.defaultdict(set)
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review','judge'): continue
        nag[tag].add(aid)
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            ms=list(rxcreate.finditer(cmd))
            if ms:
                agents.add((tag,aid)); byb[tag].add(aid); byrole[role].add((tag,aid))
                ite+=call_cost(a,k); tok+=0.41*len(c['res'] or '')+110+0.28*len(cmd); n+=1
print('agents who wrote >=1 shell script into scratch:',len(agents),'of',sum(len(v) for v in nag.values()),{t:(len(byb[t]),len(nag[t])) for t in nag})
print('byrole',{r:len(s) for r,s in byrole.items()})
print('calls',n,'tok %.0fK'%(tok/1e3),'ITE %.0fK'%(ite/1e3))
