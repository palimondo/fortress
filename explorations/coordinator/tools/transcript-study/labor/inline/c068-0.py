import pickle,collections
R=pickle.load(open('shared.pkl','rb'))
chainroles=('skeptic','judge','repair','skeptic2')
tailroles=('gather','gate','review','judge:review','repair:review','commit')
for b in (8,9):
    sc=collections.Counter(); ot=collections.Counter(); tot=collections.Counter()
    for r in R:
        if r['batch']!=b: continue
        if r['role'] in chainroles:
            sc['same_chain']+=r['same_chain']; sc['other']+=r['other']; sc['read']+=r['tok']
        elif r['role'] in tailroles:
            ot['rep']+=r['same_chain']+r['other']; ot['read']+=r['tok']
        else:
            tot['rep']+=r['same_chain']+r['other']; tot['read']+=r['tok']
    print('batch',b,'chain roles: read %.0fK, repeated from same chain %.0fK, from other chains %.0fK'%(sc['read']/1000,sc['same_chain']/1000,sc['other']/1000))
    print('        tail roles: read %.0fK, repeated %.0fK; rungs: read %.0fK repeated %.0fK'%(ot['read']/1000,ot['rep']/1000,tot['read']/1000,tot['rep']/1000))
# briefing same-chain by batch
for b in (8,9):
    x=collections.Counter()
    for r in R:
        if r['batch']==b and r['cls']=='read:kb:briefing':
            x[r['role']]+=r['same_chain']; x[r['role']+'_read']+=r['tok']
    print('briefing batch',b,{k:round(v/1000) for k,v in x.items()})
