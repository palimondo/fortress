import pickle,collections
from tab1 import grp,ORDER
O=pickle.load(open('acct.pkl','rb'))
for b in (8,9,None):
    ags=[o for o in O.values() if b is None or o['batch']==b]
    W=sum(o['W'] for o in ags); S=collections.Counter()
    for o in ags:
        S['first']+=o['w1']; S['think']+=o['think']; S['refill']+=o['refill']
        for c in o['calls']: S[grp(c['cls'])]+=c['res']+c['inp']
    print('== batch',b,'agents',len(ags),'W=%.2fM'%(W/1e6))
    for k in ['first','think']+ORDER+['refill']:
        if S[k]>0: print('   %-45s %7.0fK %5.1f%%'%(k,S[k]/1000,100*S[k]/W))
