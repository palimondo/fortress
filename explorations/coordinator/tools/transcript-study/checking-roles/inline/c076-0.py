import pickle
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
b=[o for o in O.values() if o['batch']==10]
print(sum(o['W'] for o in b), len(b))
for o in sorted(b,key=lambda o:o['t0']):
    a=A[o['aid']]
    print(o['label'],o['W'],round(o['w1']),o['nturns'],'cold' if o['cr1']==0 else 'warm','%.1f min'%((o['t1']-o['t0'])/60))
