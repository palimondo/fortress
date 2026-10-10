import pickle,re
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
def cut(t,a,b):
    i=t.index(a); j=t.index(b,i) if b else len(t)
    return j-i
TPC=0.425
tot=0
for l in sorted(byl):
    t=byl[l]; r=l.split(':')[0]
    if r=='skeptic': c=cut(t,'## What the worker reported','## You build nothing')
    elif r=='judge': c=cut(t,'## What is already known','## What to read')
    elif r=='skeptic2': c=cut(t,'## Your first judgement','## You build nothing')
    elif r=='repair':
        i=t.index('# Your role: rung worker, repair round'); c=len(t)-i
    else: continue
    pre=t.index('# Your role')
    print(f'{l:12s} brief {len(t):7d}  prefix {pre:6d}  carried-from-earlier-agents/round text {c:6d} chars = {c*TPC/1000:5.1f}K tokens ({100*c/len(t):3.0f}% of brief)')
