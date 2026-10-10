import pickle,collections,os
res,detail=pickle.load(open('explore.pkl','rb'))
O=pickle.load(open('acct.pkl','rb'))
nag=collections.Counter(o['role'] for o in O.values())
W={r:sum(o['W'] for o in O.values() if o['role']==r)/nag[r] for r in nag}
cols=['1 named in the brief','2 named in the briefing it read','3 on record (FACTS or INDEX)','4 on record (maps only)','5 not on record','read (no file named)','search (no file named)']
print('| role | '+' | '.join(c.split(' ',1)[1] if c[0].isdigit() else c for c in cols)+' | beyond the brief, K and % of writes |')
for r in ['rung','skeptic','skeptic2','judge','repair','gather','gate','review','judge:review','repair:review','commit']:
    vals=[res.get((r,c),{}).get('tok',0)/nag[r]/1000 for c in cols]
    beyond=sum(vals[1:])
    print('| %s | '%r+' | '.join('%.1f'%v for v in vals)+' | %.0f (%.0f%%) |'%(beyond,100*beyond*1000/W[r]))
# distinct files
for r in ['rung','skeptic']:
    for c in cols[:5]:
        d=set(os.path.basename(f) for f,t in detail.get((r,c),[]))
        print(r,c,len(d))
