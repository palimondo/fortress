import json,re
# reconstruct the briefing text of each worker from its transcript
def strip_ln(r):
    return '\n'.join(re.sub(r'^\s*\d+\t?','',l,count=1) for l in r.split('\n'))
spec={'W':[8,10,11,12,13],'N':[5,7,8,9,10],'C':[5,7,8,9,10],'G':[4,5,6]}
ids={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
for w,ns in spec.items():
    d=json.load(open(f'json/{ids[w]}.json'))
    calls={e['n']:e for e in d['events'] if e['k']=='call'}
    txt=''
    for n in ns:
        r=calls[n]['res']
        txt+=(strip_ln(r) if calls[n]['tool']=='Read' else r)+'\n'
    open(f'briefing-{w}.txt','w').write(txt)
    heads=[l for l in txt.split('\n') if l.startswith('== ')]
    print(w,len(txt),'bytes',len(heads),'entries')
    import collections
    kinds=collections.Counter()
    for h in heads:
        p=h[3:]
        if 'POSITIONS' in p: kinds['positions']+=1
        elif 'gap-ledger' in p: kinds['ledger']+=1
        elif 'FACTS.md' in p: kinds['facts']+=1
        elif 'INDEX' in p: kinds['index']+=1
        elif '/map/' in p: kinds['map']+=1
        elif p.startswith('ProjectFortress') or p.startswith('Library'): kinds['code']+=1
        elif p.startswith('Specification'): kinds['spec']+=1
        else: kinds['doc/other']+=1
    print('  ',dict(kinds))
