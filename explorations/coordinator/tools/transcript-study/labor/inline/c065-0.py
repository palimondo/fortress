import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
for aid,a in A.items():
    if a['label'] in('rung:I','rung:R','skeptic:I','skeptic:R','judge:Q','skeptic2:Q'):
        t=briefs[aid][1]
        keys=re.findall(r'(?:positions|facts|ledger|plan|index|spec|map):[^\n"]{5,60}',t)
        i=t.find('Briefing'); 
        j=[m.start() for m in re.finditer(r'riefing',t)]
        print(a['batch'],a['label'],'len',len(t),'entry-like keys',len(keys),'first',keys[:2],'positions of "riefing"',j[:12])
