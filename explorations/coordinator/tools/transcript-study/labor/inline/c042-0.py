import pickle,re
A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
want=['rung:I','skeptic:I','judge:Q','repair:Q','skeptic2:Q','gather','gate','review','judge:review','repair:review','commit']
for aid,a in A.items():
    if a['batch']!=8 or a['label'] not in want: continue
    t=briefs[aid][1]
    # segments by '##? ' headings at start of line (indented 2)
    heads=[(m.start(),m.group(1)) for m in re.finditer(r'^\s*(#{1,2} .*)$',t,re.M)]
    heads.append((len(t),'END'))
    segs=[]
    for (p,h),(q,_) in zip(heads,heads[1:]):
        if q-p>=2500 or True: segs.append((q-p,h[:60]))
    # collapse: print after prefix
    pref=t.find('# Your role')
    print('==',a['label'],len(t),'prefix',pref)
    for sz,h in segs:
        pos=0
    cur=[(p,h) for p,h in heads if p>=pref]
    for (p,h),(q,_) in zip(cur,cur[1:]+[(len(t),'END')]):
        if q-p>=3000: print('   %6d  %s'%(q-p,h))
