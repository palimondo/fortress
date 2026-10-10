import pickle,random
ex=pickle.load(open('ex.pkl','rb'))
random.seed(1)
for k in ['other:misc','other:analysis','read:other','read:output','run:tests-stages','run:probes','build','wait:poll']:
    print('==',k,len(ex[k]))
    for e in random.sample(ex[k],min(12,len(ex[k]))): print('  ',e[2],e[1][:150])
