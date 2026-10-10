import re,pickle,os
from brief import first_msgs
A=pickle.load(open('agents.pkl','rb'))
briefs={}
for aid,a in A.items():
    m=first_msgs(a['run'],aid); briefs[aid]=(m[0],m[-1])
pickle.dump(briefs,open('briefs.pkl','wb'))
import itertools
def cp(a,b):
    n=min(len(a),len(b)); i=0
    while i<n and a[i]==b[i]: i+=1
    return i
for batch in (8,9):
    ids=[x for x,a in A.items() if a['batch']==batch]
    base=briefs[ids[0]][1]
    c=min(cp(base,briefs[x][1]) for x in ids)
    print('batch',batch,'common prefix chars across all agents',c, 'user msg1 equal across:',len(set(briefs[x][0] for x in ids)))
    # find heading at common prefix boundary
    print(repr(base[c-60:c+60]))
    for x in ids:
        t=briefs[x][1]
        i=t.find('# Your role'); 
        heads=[(mm.start(),mm.group(1)[:70]) for mm in re.finditer(r'^\s*(# [^#].*)$',t,re.M)]
        print(A[x]['label'],len(t),'prefix(till role)',i, 'common',cp(base,t), [ (p,h) for p,h in heads][:6])
