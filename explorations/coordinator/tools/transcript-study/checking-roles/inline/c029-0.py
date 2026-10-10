import pickle,re,os
lab,BR=pickle.load(open('briefs10.pkl','rb'))
ids=list(lab)
txts=[BR[a] for a in ids]
p=os.path.commonprefix(txts); print('common prefix chars over all 21:',len(p))
# per role pairs
byl={lab[a]:BR[a] for a in ids}
for k in ['rung:N','skeptic:N','judge:N','repair:N','skeptic2:N']:
    print(k,len(os.path.commonprefix([byl[k],byl['rung:C']])))
t=byl['judge:N']
for m in re.finditer(r'^(#{1,4} .*)$',t,re.M):
    print(m.start(),m.group(1)[:110])
