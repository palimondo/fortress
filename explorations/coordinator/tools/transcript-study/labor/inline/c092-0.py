import pickle,collections
R=pickle.load(open('shared.pkl','rb'))
def g(r):
    c=r['cls']
    if c=='read:kb:briefing': return 'briefing'
    if c.startswith('read:kb:'): return 'KB docs'
    return {'read:spec':'spec','read:source':'source','read:library':'library','read:tests':'tests','read:rung:artifacts':'rung artifacts','git:diff-show':'git diff/show','search':'search'}.get(c,c)
t=collections.defaultdict(lambda:[0,0])
for r in R: x=t[g(r)]; x[0]+=r['tok']; x[1]+=r['same_chain']+r['other']
for k,v in sorted(t.items(),key=lambda x:-x[1][0]): print('  %-16s read %6.0fK repeated %6.0fK (%2.0f%%)'%(k,v[0]/1000,v[1]/1000,100*v[1]/v[0]))
chainroles=('skeptic','judge','repair','skeptic2'); tail=('gather','gate','review','judge:review','repair:review','commit')
for name,roles in (('chain',chainroles),('tail',tail)):
    t=collections.defaultdict(lambda:[0,0]);
    for r in R:
        if r['role'] in roles: x=t[g(r)]; x[0]+=r['tok']; x[1]+=(r['same_chain'] if name=='chain' else r['same_chain']+r['other'])
    print(name,'read %.0fK repeated %.0fK'%(sum(v[0] for v in t.values())/1000,sum(v[1] for v in t.values())/1000))
    for k,v in sorted(t.items(),key=lambda x:-x[1][1])[:8]: print('     %-16s read %6.0fK repeated %6.0fK (%2.0f%%)'%(k,v[0]/1000,v[1]/1000,100*v[1]/v[0]))
