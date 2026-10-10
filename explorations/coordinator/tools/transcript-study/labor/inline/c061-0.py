import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
for lab,batch in (('rung:I',8),('rung:R',9)):
    aid=[k for k,a in A.items() if a['label']==lab and a['batch']==batch][0]
    t=briefs[aid][1]
    pref=t.find('# Your role')
    heads=[(m.start(),m.group(1)) for m in re.finditer(r'^\s*(#{1,2} .*)$',t[:pref],re.M)]+[(pref,'END')]
    print('batch',batch,'prefix chars',pref)
    for (p,h),(q,_) in zip(heads,heads[1:]): print('  %6d %s'%(q-p,h[:90]))
