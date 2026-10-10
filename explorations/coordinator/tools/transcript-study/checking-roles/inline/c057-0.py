import pickle,re
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
t=byl['rung:N']
for m in re.finditer(r'alone|its own commit|own commit|separate commit',t): 
    s=max(0,m.start()-250); print('...',t[s:m.end()+250].replace('\n',' '),'\n')
    break
i=t.index('## The order of work'); print(t[i:i+3800])
