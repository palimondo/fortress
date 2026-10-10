import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
for aid,a in A.items():
    if a['label']=='judge:W' and a['batch']==9:
        t=briefs[aid][1]; i=t.find('## What is already known'); seg=t[i:]
        pos=[]
        for m in re.finditer(r'^\s*(\*\*[^\n*]{4,80}\*\*|[A-Z][^\n]{3,70}:)\s*$',seg,re.M): pos.append((m.start(),m.group(1)[:80]))
        pos.append((len(seg),'END'))
        for (p,h),(q,_) in zip(pos,pos[1:]):
            if q-p>3000: print('%6d %s'%(q-p,h))
        print(seg[:600].replace('\n',' | '))
