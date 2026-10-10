import pickle,re,os
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
t=byl['judge:N']
print(repr(t[:600]))
print('....')
print(t[47000:49500])
