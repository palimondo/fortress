import sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, verdict as V
names=[('B','briefing handed to it'),('P','primary text: code, library, specification, tests'),('R','record it searched itself (ledger, FACTS, INDEX)'),('D','gate tables and per-site lists (record data)'),('V','checks that a landed table fits the base'),('H','knowledge the record held whole'),('Y','knowledge the record held in part'),('N','knowledge not on record'),('O','own runs, edits, setup')]
cols={}
for w in 'WNGC':
    d=C.load(w); calls=[e for e in d['events'] if e['k']=='call' and e['n']<=Z.WIN[w][1]]
    agg=collections.defaultdict(lambda:[0,0,0.0])
    for c in calls:
        l=V.label(w,c); a=agg[l]; a[0]+=1;a[1]+=c['rbytes'];a[2]+=C.tok(c)
    cols[w]=agg
out=['| what the call was for | W calls / KB / tokens (share) | N | G | C | all four |','|---|---|---|---|---|---|']
tot=collections.defaultdict(lambda:[0,0,0.0])
for w in 'WNGC':
    for k,a in cols[w].items():
        for i in range(3): tot[k][i]+=a[i]
cols['all']=tot
for k,nm in names:
    cells=[]
    for w in ['W','N','G','C','all']:
        a=cols[w][k] if k in cols[w] else [0,0,0.0]
        res=sum(x[2] for x in cols[w].values())
        cells.append('%d / %.0f / %.1fK (%.0f%%)'%(a[0],a[1]/1000,a[2]/1000,100*a[2]/res) if a[0] else '0')
    out.append('| %s | %s |'%(nm,' | '.join(cells)))
res=[sum(x[2] for x in cols[w].values()) for w in ['W','N','G','C','all']]
out.append('| result tokens, all calls | '+' | '.join('%.0fK'%(r/1000) for r in res)+' |')
open('table-V.md','w').write('\n'.join(out)+'\n'); print('\n'.join(out))
