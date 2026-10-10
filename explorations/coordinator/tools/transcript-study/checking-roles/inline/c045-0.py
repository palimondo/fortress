import pickle,collections,re
A=pickle.load(open('agents.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
by=collections.defaultdict(lambda:[0,0,0.0])
errs=collections.defaultdict(list)
for aid,a in A.items():
    if a['batch']!=10: continue
    o=O[aid]; role=o['role']
    cm={c['id']:c for c in o['calls']}
    for t in a['turns']:
        for c in t['calls']:
            by[role][0]+=1
            if c['err']:
                by[role][1]+=1
                cc=cm.get(c['id'])
                by[role][2]+=(cc['res']+cc['inp']) if cc else 0
                errs[role].append((a['label'],(c['input'].get('command') or c['input'].get('file_path') or '')[:90].replace('\n',' '),c['text'][:130].replace('\n',' ')))
for r,(n,e,tok) in by.items(): print(r,'calls',n,'errors',e,'tokens charged to errored calls %.1fK'%(tok/1000))
for r in ['skeptic','judge','skeptic2']:
    print('==',r)
    for x in errs[r][:14]: print(x)
