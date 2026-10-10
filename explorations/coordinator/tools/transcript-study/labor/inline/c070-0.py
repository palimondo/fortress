import pickle,collections
R=pickle.load(open('shared.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
lab=collections.defaultdict(lambda:dict(tok=0,rep=0,roles=collections.Counter(),aids=set(),chains=set(),batches=set()))
for r in R:
    if r['label'] in('BRIEFING','(search)','(git:diff-show)') or r['label'].startswith('('): continue
    x=lab[r['label']]; x['tok']+=r['tok']; x['rep']+=r['same_chain']+r['other']; x['roles'][r['role']]+=1; x['aids'].add(r['aid']); x['chains'].add(r['chain']); x['batches'].add(r['batch'])
rows=sorted(lab.items(),key=lambda x:-x[1]['tok'])[:22]
for l,x in rows:
    print('%-40s read %6.1fK in %2d agents (%d chains, batches %s) repeated %5.1fK  roles: %s'%(l[:40],x['tok']/1000,len(x['aids']),len(x['chains']),sorted(x['batches']),x['rep']/1000,dict(x['roles'])))
