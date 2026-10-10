import pickle
O=pickle.load(open('acct.pkl','rb'))
PREF={8:39061,9:42632}
for b in (8,9):
    ags=[o for o in O.values() if o['batch']==b]
    W=sum(o['W'] for o in ags)
    miss=[o for o in ags if o['cr1']==0]; hit=[o for o in ags if o['cr1']>0]
    sysmiss=sum(36400 for o in miss)
    att=6150*len(ags)
    for rate,name in((0.4206,'2.4 chars/tok'),(1/3.6,'3.6 chars/tok')):
        pref=rate*PREF[b]*len(ags)
        print('batch',b,name,'agents',len(ags),'miss',len(miss),'hit',len(hit),'| sys+tools written %.0fK | attachments %.0fK | prefix %.0fK | total shared-identical writes %.0fK = %.1f%% of %.2fM'%(sysmiss/1000,att/1000,pref/1000,(sysmiss+att+pref)/1000,100*(sysmiss+att+pref)/W,W/1e6))
        print('     if the attachments+prefix were also cached for the %d agents that already hit the system cache: saves %.0fK'%(len(hit),len(hit)*(6150+rate*PREF[b])/1000))
