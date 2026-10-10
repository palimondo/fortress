import pickle,collections,os
res,detail=pickle.load(open('explore.pkl','rb'))
O=pickle.load(open('acct.pkl','rb'))
nag=collections.Counter(o['role'] for o in O.values())
W={r:sum(o['W'] for o in O.values() if o['role']==r)/nag[r] for r in nag}
cols=['1 named in the brief','2 named in the briefing it read','3 on record (FACTS or INDEX)','4 on record (maps only)','5 not on record','read (no file named)','search (no file named)']
for r in ['rung','skeptic','skeptic2','judge','repair','gather','gate','review','judge:review','repair:review','commit']:
    vals=[res.get((r,c),{}).get('tok',0)/nag[r]/1000 for c in cols]
    beyond=sum(vals[1:]); unnamed=sum(vals[1:6])
    onrec=vals[1]+vals[2]+vals[3]
    print('%-14s brief-named %5.1f | beyond %5.1f (%2.0f%% of writes): search %5.1f, files not named %5.1f (in briefing/record %5.1f = %2.0f%%), no-file reads %4.1f'%(r,vals[0],beyond,100*beyond*1000/W[r],vals[6],unnamed-vals[5] if False else vals[1]+vals[2]+vals[3]+vals[4],onrec,100*onrec/max(0.001,vals[1]+vals[2]+vals[3]+vals[4]),vals[5]))
