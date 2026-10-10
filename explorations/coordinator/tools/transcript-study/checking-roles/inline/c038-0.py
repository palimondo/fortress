import pickle
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
t=byl['judge:N']
print(t[47599:48363]); print('.....'); print(t[145546:])
