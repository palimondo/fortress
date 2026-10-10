import re,json
for w in 'WNGC':
    txt=open(f'briefing-{w}.txt').read()
    head=txt.split('\n== ')[0]
    m=re.search(r'Its (\d+) parts? print (\d+) bytes, about (\d+) tokens',head)
    print(w,m.groups() if m else head[:200])
    keys=[]
    for l in head.split('\n'):
        mm=re.match(r'^  (.*?)\s{2,}.*?\[(\d+) bytes\]\s*$',l)
        if mm: keys.append((mm.group(1).strip(),int(mm.group(2))))
        else:
            if l.startswith('  ') and 'bytes]' in l:
                mm=re.search(r'\[(\d+) bytes\]',l); keys.append((l.strip()[:90],int(mm.group(1))))
    print('  keys',len(keys),'sum',sum(k[1] for k in keys))
    import collections
    kinds=collections.defaultdict(lambda:[0,0])
    for k,b in keys:
        kk=k.split(':')[0] if re.match(r'^(positions|ledger|doc|code|map|index|section|spec|ledger-find):',k) else 'facts'
        kinds[kk][0]+=1; kinds[kk][1]+=b
    print('  ',{k:tuple(v) for k,v in kinds.items()})
    json.dump(keys,open(f'keys-{w}.json','w'))
    nf=[l for l in head.split('\n') if 'NOT FOUND' in l or 'Not found' in l]
    print('  notfound',nf[:3])
