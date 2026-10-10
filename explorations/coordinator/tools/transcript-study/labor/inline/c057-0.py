import pickle,random
ex=pickle.load(open('ex.pkl','rb'))
random.seed(5)
for k in ['read:library','read:source','git:diff-show','run:tests-stages','read:tests','read:spec','git:ops']:
    print('==',k,len(ex[k]))
    for e in random.sample(ex[k],min(9,len(ex[k]))): print('  ',e[2],e[1][:150])
