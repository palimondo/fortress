import pickle,collections,os
from cls import kind_of_path
O=pickle.load(open('acct.pkl','rb'))
tot=0;multi=0;nf=0;nmulti=0;bykind=collections.Counter()
per=collections.defaultdict(lambda:[0,0.0])
for aid,o in O.items():
    d=collections.defaultdict(lambda:[0,0.0])
    for c in o['calls']:
        if not (c['cls'].startswith('read:') and c['cls'] not in('read:output','read:transcripts')) : continue
        if c['cls']=='read:kb:briefing': continue
        fs=sorted(set(os.path.basename(f) for f in c['files'] if kind_of_path(f)))
        if not fs: continue
        for f in fs:
            d[f][0]+=1; d[f][1]+=(c['res']+c['inp'])/len(fs)
    for f,(n,t) in d.items():
        nf+=1; tot+=t
        if n>=2:
            nmulti+=1; multi+=t; per[o['role']][0]+=1; per[o['role']][1]+=t
print('files read per agent (territory+record, excluding briefing/output): %d file-agent pairs, %.0fK tokens; read in 2+ calls: %d pairs, %.0fK tokens (%.0f%%)'%(nf,tot/1000,nmulti,multi/1000,100*multi/tot))
print({k:(v[0],round(v[1]/1000)) for k,v in per.items()})
