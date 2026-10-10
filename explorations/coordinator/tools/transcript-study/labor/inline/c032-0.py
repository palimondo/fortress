import pickle,random
ex=pickle.load(open('ex.pkl','rb'))
random.seed(2)
for k in ['read:other','other:analysis','other:misc','search','read:output','read:kb:otherdocs']:
    if k not in ex: continue
    print('==',k,len(ex[k]))
    for e in random.sample(ex[k],min(14,len(ex[k]))): print('  ',e[2],e[1][:160])
