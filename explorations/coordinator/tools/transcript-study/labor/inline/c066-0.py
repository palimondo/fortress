import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
for aid,a in A.items():
    if a['label'] in('rung:I','rung:R','rung:K'):
        t=briefs[aid][1]; i=t.find('## Your rung')
        tail=t[i:]
        print(a['batch'],a['label'],'tail chars',len(tail))
        hs=[(m.start(),m.group(0).strip()[:80]) for m in re.finditer(r'^\s*(\*\*[^*\n]{3,60}\*\*|#{3,4} .*)$',tail,re.M)]
        hs.append((len(tail),'END'))
        for (p,h),(q,_) in zip(hs,hs[1:]):
            if q-p>1200: print('   %5d %s'%(q-p,h))
