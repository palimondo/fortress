import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
for role in ['rung','skeptic','judge','repair','skeptic2']:
    ags=[o for o in O.values() if o['batch']==10 and o['role']==role]
    c=collections.Counter()
    for o in ags:
        for x in o['calls']:
            c[x['cls']]+=x['res']+x['inp']
    n=len(ags)
    print(role,n,{k:round(v/n/1000,1) for k,v in c.most_common(14)})
