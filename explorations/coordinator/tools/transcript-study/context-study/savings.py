#!/usr/bin/env python3 -I
import json,sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, verdict as V
TOOLG={'W':[15],'N':[20,51,52,110,113,114],'G':[10,11,13,35,36,38,39,40,82],'C':[12,13,25,26,37,38,39]}
tot_ite=0; acc=collections.defaultdict(float); tk=collections.defaultdict(float)
import ite as I
for w in 'WNGC':
    d=C.load(w); T=len(d['turns'])
    total=I.run(w)[0]; tot_ite+=total
    calls=[e for e in d['events'] if e['k']=='call' and e['n']<=Z.WIN[w][1]]
    for c in calls:
        l=V.label(w,c)
        f=1.25+0.05*max(T-1-(c['turn']+1),0)
        t=C.tok(c)
        acc[l]+=t*f; tk[l]+=t
        if c['n'] in TOOLG[w]:
            acc['T']+=t*f; tk['T']+=t
print('four workers total ITE %.2fM'%(tot_ite/1e6))
for k in 'BPRDVHYNOT':
    print(f'  {k}: tokens {tk[k]/1000:6.1f}K  ITE {acc[k]/1e6:5.2f}M  {100*acc[k]/tot_ite:4.1f}% of the four workers\' cost')
print('H+Y+N ITE %.2fM = %.1f%%'%((acc['H']+acc['Y']+acc['N'])/1e6,100*(acc['H']+acc['Y']+acc['N'])/tot_ite))
