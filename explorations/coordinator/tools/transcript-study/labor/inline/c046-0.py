import pickle,collections,os
res,detail=pickle.load(open('explore.pkl','rb'))
for role in ['rung','skeptic','repair']:
    print('==',role)
    for k in ['2 named in the briefing it read','3 on record (FACTS or INDEX)','4 on record (maps only)','5 not on record']:
        d=collections.defaultdict(float)
        for f,t in detail.get((role,k),[]): d[os.path.basename(f)]+=t
        print('  ',k,'distinct files',len(d),'tokens %.0fK'%(sum(d.values())/1000))
        for f,t in sorted(d.items(),key=lambda x:-x[1])[:6]: print('       %-36s %5.1fK'%(f,t/1000))
