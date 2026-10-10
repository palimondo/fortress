import pickle,re
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
t=byl['rung:N'][:47599]
ms=[(m.start(),m.group(1)) for m in re.finditer(r'^\s{0,6}(#{1,4} .*)$',t,re.M)]
for i,(p,h) in enumerate(ms):
    e=ms[i+1][0] if i+1<len(ms) else len(t)
    print(p,e-p,h[:100])
