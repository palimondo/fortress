# a few more numbers for the text
import json,sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, verdict as V
# T-group and what the skill covers now
TOOLG={'W':[15],'N':[20,51,52,110,113,114],'G':[10,11,13,35,36,38,39,40,82],'C':[12,13,25,26,37,38,39]}
for w in 'WNGC':
    d=C.load(w)
    calls={e['n']:e for e in d['events'] if e['k']=='call'}
    print(w,sum(C.tok(calls[n]) for n in TOOLG[w])/1000,'K tokens;',sum(calls[n]['rbytes'] for n in TOOLG[w]),'bytes')
