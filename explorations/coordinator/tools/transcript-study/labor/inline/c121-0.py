import pickle,re,collections
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
out=collections.defaultdict(list)
for aid,a in A.items():
    t=briefs[aid][1]
    keys=re.findall(r'(?:positions|facts|ledger|plan|index|spec|map):[^\n"]{5,60}',t)
    i=t.find('## Your rung')
    tail=len(t)-i if i>=0 else None
    out[a['label'].split(':')[0]].append((a['batch'],a['label'],len(keys),tail))
for r in ('rung','skeptic','judge','repair','skeptic2'):
    print(r,[(b,l,k,tl) for b,l,k,tl in out[r]])
