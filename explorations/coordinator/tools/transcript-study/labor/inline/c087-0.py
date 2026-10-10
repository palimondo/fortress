import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
for role in ('skeptic','skeptic2','judge','repair','rung'):
    for b in (8,9):
        ags=[o for o in O.values() if o['role']==role and o['batch']==b]
        if not ags: continue
        v=sum(c['res']+c['inp'] for o in ags for c in o['calls'] if c['cls']=='read:kb:batch-record')/len(ags)
        s=sum(c['res']+c['inp'] for o in ags for c in o['calls'] if 'SKEPTIC' in ' '.join(c['files']) and c['cls'].startswith('read'))/len(ags)
        bu=sum(c['res']+c['inp'] for o in ags for c in o['calls'] if c['cls'] in('build','run:tests-stages','wait:poll'))/len(ags)
        print(role,b,'n',len(ags),'batch-record reads %.1fK/agent'%(v/1000),'SKEPTIC.md reads %.1fK'%(s/1000),'build+stages+wait %.1fK'%(bu/1000),'W %.0fK'%(sum(o['W'] for o in ags)/len(ags)/1000))
