import pickle,numpy as np
A=pickle.load(open('agents.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
n_th=0;n=0
for a in A.values():
    for t in a['turns']:
        n+=1; n_th+= t['thinking']
print('turns',n,'with thinking block',n_th)
x=[];y=[]
for aid,o in O.items():
    T=A[aid]['turns']
    for t in o['turns']:
        p=T[t['k']-1]
        if p['stop'] and p['thinking'] and p['out']>0:
            x.append(p['out']); y.append(t['think']+t['inp'])
x=np.array(x);y=np.array(y); print(len(x),'out',x.sum(),'resid',y.sum(),'median ratio',np.median(y/x))
for a,b in list(zip(x,y))[:20]: print(a,round(b))
