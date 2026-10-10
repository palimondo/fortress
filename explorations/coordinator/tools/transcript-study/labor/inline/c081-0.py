import pickle,collections
R=pickle.load(open('reread.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
lab={o['aid']:o['label']+' b'+str(o['batch']) for o in O.values()}
d=collections.defaultdict(lambda:[0,0])
for r in R:
    c=r['cls']
    if c.startswith('write') or c.startswith('git:commit') or c.startswith('report'): continue
    x=d[(lab[r['aid']],r['label'])]; x[0]+=r['res']; x[1]+=r['tok_rr']+r['tok_ri']
print('top (agent, label) by re-read tokens')
for k,(a,b) in sorted(d.items(),key=lambda x:-x[1][1])[:16]: print('  %-22s %-44s read %6.1fK re-read %5.1fK'%(k[0],k[1][:44],a/1000,b/1000))
# per agent total re-read fraction distribution
pa=collections.defaultdict(lambda:[0,0])
for r in R:
    c=r['cls']
    if c.startswith('write') or c.startswith('git:commit') or c.startswith('report'): continue
    pa[lab[r['aid']]][0]+=r['res']; pa[lab[r['aid']]][1]+=r['tok_rr']+r['tok_ri']
top=sorted(pa.items(),key=lambda x:-x[1][1])[:8]
print([ (k,round(v[1]/1000),round(100*v[1]/v[0])) for k,v in top])
# identical command repeats
n=sum(1 for r in R if r['samecmd']>0); t=sum(r['res'] for r in R if r['samecmd']>0)
print('identical repeated commands',n,'tokens %.0fK'%(t/1000))
