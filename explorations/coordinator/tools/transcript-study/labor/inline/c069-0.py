import pickle,collections
R=pickle.load(open('shared.pkl','rb'))
def g(r):
    c=r['cls']
    if c=='read:kb:briefing': return 'briefing'
    if c.startswith('read:kb:'): return 'KB docs'
    return {'read:spec':'spec','read:source':'source','read:library':'library','read:tests':'tests','read:rung:artifacts':'rung artifacts','git:diff-show':'git diff/show','search':'search'}.get(c,c)
chainroles=('skeptic','judge','repair','skeptic2')
t=collections.defaultdict(lambda:[0,0])
for r in R:
    if r['role'] in chainroles:
        x=t[g(r)]; x[0]+=r['tok']; x[1]+=r['same_chain']
tr=sum(v[0] for v in t.values()); ts=sum(v[1] for v in t.values())
print('chain roles over both batches (12 agents x..): read %.0fK same-chain repeated %.0fK'%(tr/1000,ts/1000))
for k,v in sorted(t.items(),key=lambda x:-x[1][1]): print('  %-16s read %6.0fK  repeated-from-earlier-agent-of-chain %6.0fK (%2.0f%%)'%(k,v[0]/1000,v[1]/1000,100*v[1]/v[0]))
# tail roles
tail=('gather','gate','review','judge:review','repair:review','commit')
t=collections.defaultdict(lambda:[0,0])
for r in R:
    if r['role'] in tail:
        x=t[g(r)]; x[0]+=r['tok']; x[1]+=r['same_chain']+r['other']
tr=sum(v[0] for v in t.values()); ts=sum(v[1] for v in t.values())
print('tail roles: read %.0fK repeated %.0fK'%(tr/1000,ts/1000))
for k,v in sorted(t.items(),key=lambda x:-x[1][1]): print('  %-16s read %6.0fK  repeated %6.0fK (%2.0f%%)'%(k,v[0]/1000,v[1]/1000,100*v[1]/v[0]))
