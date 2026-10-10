import pickle,collections
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
R=collections.defaultdict(lambda:[0,0,0,0,0.0,0.0])
for o in O.values():
    if o['batch']!=10: continue
    a=A[o['aid']]; T=a['turns']
    inside=0.0; long_=0.0
    for t in T:
        rs=[c['rts']-t['ts1'] for c in t['calls'] if c.get('rts')]
        if rs:
            m=max(rs); inside+=m
            if m>60: long_+=m
    tot=T[-1]['ts1']-T[0]['ts0']
    r=R[o['role']]; r[0]+=1; r[1]+=tot; r[2]+=inside; r[3]+=long_; 
for role,(n,tot,inside,long_,_,_) in R.items():
    print('%-9s n=%d  %5.1f min per agent, %4.1f min inside commands (%2.0f%%), of which commands over 60 s: %4.1f min'%(role,n,tot/n/60,inside/n/60,100*inside/tot,long_/n/60))
