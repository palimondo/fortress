import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
for aid,a in A.items():
    if a['label'] in('judge:Q',) and a['batch']==8 or (a['label']=='judge:W' and a['batch']==9):
        t=briefs[aid][1]; i=t.find('## What is already known')
        seg=t[i:]
        print(a['batch'],a['label'],len(t),'known',len(seg))
        # find big '---' separated parts or headings
        parts=[(m.start(),m.group(0).strip()[:90]) for m in re.finditer(r'^\s*(#{1,3} .*|=== .*|---+ .*)$',seg,re.M)]
        parts.append((len(seg),'END'))
        for (p,h),(q,_) in zip(parts,parts[1:]):
            if q-p>2500: print('   %6d %s'%(q-p,h))
