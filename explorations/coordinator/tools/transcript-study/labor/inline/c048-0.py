import pickle,collections
R=pickle.load(open('shared.pkl','rb'))
def g(r):
    c=r['cls']
    if c=='read:kb:briefing': return 'briefing'
    if c.startswith('read:kb:'): return 'KB docs'
    return {'read:spec':'spec','read:source':'source','read:library':'library','read:tests':'tests','read:rung:artifacts':'rung artifacts (reports)','git:diff-show':'git diff/show','search':'search'}.get(c,c)
tab=collections.defaultdict(lambda:collections.Counter())
for r in R:
    tab[r['role']][g(r)+' read']+=r['tok']; tab[r['role']][g(r)+' repeated']+=r['same_chain']+r['other']
nag={'rung':10,'skeptic':8,'judge':4,'repair':4,'skeptic2':4,'gather':2,'gate':3,'review':2,'judge:review':2,'repair:review':2,'commit':2}
groups=['briefing','KB docs','spec','source','library','tests','rung artifacts (reports)','git diff/show','search']
print('role | group: read K/agent, repeated K/agent')
for role in nag:
    print('==',role)
    for gr in groups:
        a=tab[role][gr+' read']; b=tab[role][gr+' repeated']
        if a>0: print('   %-26s read %6.1fK  repeated %6.1fK (%2.0f%%)'%(gr,a/nag[role]/1000,b/nag[role]/1000,100*b/a))
# totals by group over all
print('== ALL')
for gr in groups:
    a=sum(tab[r][gr+' read'] for r in nag); b=sum(tab[r][gr+' repeated'] for r in nag)
    print('   %-26s read %7.0fK repeated %7.0fK (%2.0f%%)'%(gr,a/1000,b/1000,100*b/a))
# top labels by repeated tokens
lab=collections.defaultdict(lambda:[0,0,set()])
for r in R:
    x=lab[r['label']]; x[0]+=r['tok']; x[1]+=r['same_chain']+r['other']; x[2].add(r['aid'])
print('== top labels by repeated tokens')
for l,(a,b,s) in sorted(lab.items(),key=lambda x:-x[1][1])[:25]:
    print('   %-50s read %6.1fK repeated %6.1fK agents %d'%(l[:50],a/1000,b/1000,len(s)))
