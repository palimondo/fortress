import pickle,collections
A=pickle.load(open('agents.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
by=collections.defaultdict(lambda:[0,0,0,0,0])
for aid,o in O.items():
    T=A[aid]['turns']
    for t in o['turns']:
        p=T[t['k']-1]
        narr=min(t['think'],0.4*p['textchars'])
        r=by[o['role']]; r[0]+=1; r[1]+=t['think']; r[2]+=narr; r[3]+= (p['thinking']); r[4]+=len(p['calls'])
for k,r in by.items(): print(k,'turns',r[0],'think+narr per turn',round(r[1]/r[0]),'narr share',round(100*r[2]/max(r[1],1)),'% turns with thinking',round(100*r[3]/r[0]),'calls per turn',round(r[4]/r[0],2))
