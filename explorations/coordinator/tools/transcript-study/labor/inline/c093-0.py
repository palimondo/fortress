import pickle,collections
R=pickle.load(open('shared.pkl','rb'))
def g(r):
    c=r['cls']
    if c=='read:kb:briefing': return 'briefing'
    if c.startswith('read:kb:'): return 'KB docs'
    return {'read:spec':'spec','read:source':'source','read:library':'library','read:tests':'tests','read:rung:artifacts':'rung artifacts','git:diff-show':'git diff/show','search':'search'}.get(c,c)
for role in ('review','judge:review','judge','skeptic','skeptic2'):
    t=collections.defaultdict(lambda:[0,0])
    for r in R:
        if r['role']==role: x=t[g(r)]; x[0]+=r['tok']; x[1]+=r['same_chain']+r['other']
    print(role,{k:'%.0f%%'%(100*v[1]/v[0]) for k,v in t.items() if v[0]>5000})
