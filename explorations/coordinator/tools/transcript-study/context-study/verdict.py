#!/usr/bin/env python3 -I
import json,sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, final as F
LAB={
 'W':{'H':[35,42],'Y':[26,40,41],'N':[15],'V':[3,4]},
 'N':{'V':[11,12],'D':[13,14,15,35,36,64,130],'H':[139,140],'Y':[17,48,51,52,83,110,113,114,141,142,143],'N':[20,66,67,68,122,124],'R':[58,59,60,61,84,85,93,109,138]},
 'G':{'V':[7,8],'D':[9,12,15,44],'Y':[10,11,13,35,40],'N':[32,33,36,38,39,47,48,82],'R':[28,29,30,37,49]},
 'C':{'V':[3,22],'D':[21,23],'H':[83],'Y':[25,26,59,60,61,80,81,84,85,98],'N':[12,13,37,38,39,119],'R':[62,82]},
}
def label(w,c):
    for k,v in LAB[w].items():
        if c['n'] in v: return k
    tg=F.labels(w,c)
    if 'BRIEFING' in tg: return 'B'
    if any(x in tg for x in('EDIT','RUN','SETUP')) or tg==['GIT'] or tg==['TOOLS']: return 'O'
    return 'P'
NAMES={'B':'briefing (given)','P':'primary text: code, library, spec, tests','R':'record read by grep (ledger, FACTS, INDEX)','D':'gate data under explorations/ (per-site lists, tables)','V':'check that a landed table still fits the base','H':'knowledge the record held','Y':'knowledge the record held in part','N':'knowledge not on record','O':'own runs, edits, setup'}
tot={}
for w in 'WNGC':
    d=C.load(w); upto=Z.WIN[w][1]
    calls=[e for e in d['events'] if e['k']=='call' and e['n']<=upto]
    agg=collections.defaultdict(lambda:[0,0,0.0])
    for c in calls:
        l=label(w,c); a=agg[l]; a[0]+=1;a[1]+=c['rbytes'];a[2]+=C.tok(c)
    res=sum(a[2] for a in agg.values())
    print(f'== {w}: window B {len(calls)} calls, result tokens {res/1000:.1f}K')
    for k in ['B','P','R','D','V','H','Y','N','O']:
        if k in agg:
            a=agg[k]; print(f'   {k} {NAMES[k]:48s} calls {a[0]:3d} bytes {a[1]:7d} tokens {a[2]/1000:5.1f}K {100*a[2]/res:5.1f}%')
    tot[w]=agg
# totals over four
print('== all four, window B')
agg=collections.defaultdict(lambda:[0,0,0.0])
for w in 'WNGC':
    for k,a in tot[w].items():
        for i in range(3): agg[k][i]+=a[i]
res=sum(a[2] for a in agg.values())
for k in ['B','P','R','D','V','H','Y','N','O']:
    a=agg[k]; print(f'   {k} {NAMES[k]:48s} calls {a[0]:3d} bytes {a[1]:7d} tokens {a[2]/1000:5.1f}K {100*a[2]/res:5.1f}%')
nb=res-agg['B'][2]
print('   share of non-briefing result tokens: H %.1f%%  Y %.1f%%  N %.1f%%  R %.1f%%'%tuple(100*agg[k][2]/nb for k in 'HYNR'))
K=agg['H'][2]+agg['Y'][2]+agg['N'][2]
print('   knowledge-type reads (H+Y+N): %.1fK; held %.0f%%, partly %.0f%%, not %.0f%%'%(K/1000,100*agg['H'][2]/K,100*agg['Y'][2]/K,100*agg['N'][2]/K))
