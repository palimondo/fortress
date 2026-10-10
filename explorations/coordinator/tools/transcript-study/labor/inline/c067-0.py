import pickle,collections,numpy as np
O=pickle.load(open('acct.pkl','rb'))
PREF={8:39061,9:42632}
G=collections.defaultdict(list)
for o in O.values(): G[o['role']].append(o)
print('role n | ctx1 mean | written mean | cr1 hits | brief chars mean | brief tok (ctx1-42.5K) | role+tail tok (brief - prefix) | W mean | first as %W')
tot_w1=0;tot_W=0;tot_cr=0;miss=0
for r,ags in G.items():
    n=len(ags)
    ctx=np.mean([o['ctx1'] for o in ags]); w1=np.mean([o['w1'] for o in ags]); hits=sum(1 for o in ags if o['cr1']>0)
    bc=np.mean([o['brief_chars'] for o in ags]); bt=np.mean([o['ctx1']-42550 for o in ags]); 
    pt=np.mean([0.4206*PREF[o['batch']] for o in ags]); W=np.mean([o['W'] for o in ags])
    print('%-14s %d | %6.1fK | %6.1fK | %d/%d | %6.1fK chars | %5.1fK | %5.1fK | %6.1fK | %2.0f%%'%(r,n,ctx/1000,w1/1000,hits,n,bc/1000,bt/1000,bt/1000-pt/1000,W/1000,100*w1/W))
for o in O.values():
    tot_w1+=o['w1']; tot_W+=o['W']; 
    if o['cr1']==0: miss+=1
print('total first-call writes %.0fK of %.0fK (%.1f%%); agents whose first call missed the shared system cache: %d of %d'%(tot_w1/1000,tot_W/1000,100*tot_w1/tot_W,miss,len(O)))
crs=[o['cr1'] for o in O.values() if o['cr1']>0]; print('cache-hit sizes',min(crs),max(crs),np.mean(crs))
# brief tokens total
bt=sum(o['ctx1']-42550 for o in O.values()); print('brief tokens total %.0fK (%.1f%% of W)'%(bt/1000,100*bt/tot_W))
print('system+tools+attachments total %.0fK'%(42550*43/1000))
