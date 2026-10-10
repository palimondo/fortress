import pickle,re,collections
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
for k in ['judge:N','judge:C','judge:G']:
    t=byl[k]
    i=t.index('## What is already known'); j=t.index('## What to read')
    blk=t[i:j]
    lines=blk.split('\n')
    cur='head'; sizes=collections.OrderedDict()
    for ln in lines:
        s=ln.strip()
        if s.startswith("The worker's structured report"): cur='W'; continue
        if s.startswith("The skeptic's structured verdict"): cur='S'; continue
        m=re.match(r'^"?(\w+)"?: ',s)
        key=m.group(1) if m else None
        if key and ln.startswith('    "'): 
            sizes[(cur,key)]=sizes.get((cur,key),0)+len(ln)
        else:
            sizes[(cur,'(array/other)')]=sizes.get((cur,'(array/other)'),0)+len(ln)
    print('=====',k,len(blk))
    tot=collections.Counter()
    for (c,key),n in sizes.items(): tot[c]+=n
    print(dict(tot))
    for (c,key),n in sorted(sizes.items(),key=lambda x:-x[1])[:9]: print(c,key,n)
