import pickle,numpy as np
A=pickle.load(open('agents.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
x=[];y=[]
for aid,o in O.items():
    T=A[aid]['turns']
    for t in o['turns']:
        k=t['k']
        if T[k-1]['stop'] and T[k-1]['out']>0:
            x.append(T[k-1]['out']); y.append(t['think']+t['inp'])   # out should equal think+inp (+reminders)
x=np.array(x);y=np.array(y)
print(len(x),'sum out',x.sum(),'sum think+inp',y.sum(), 'corr',np.corrcoef(x,y)[0,1])
print('ratio median',np.median(y/np.maximum(x,1)))
for a,b in list(zip(x,y))[:15]: print(a,round(b))
