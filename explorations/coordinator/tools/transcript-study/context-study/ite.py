#!/usr/bin/env python3 -I
import json,sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, final as F
def run(w):
    d=C.load(w); turns=d['turns']; T=len(turns)
    # total ITE (Opus 5.5 rates: write 1.25, read 0.05, fresh 1, output 5), output estimated from growth
    total=0.0
    prev=None
    ev=[e for e in d['events'] if e['k']=='call']
    resby=collections.defaultdict(float)
    for e in ev: resby[e['turn']]+=C.tok(e)
    for k,t in enumerate(turns):
        ctx=t['input']+t['cc']+t['cr']
        total+=1.25*t['cc']+1.0*t['input']+0.05*t['cr']
        # output estimate: growth of next ctx minus results arriving
        if k+1<len(turns):
            n=turns[k+1]; nctx=n['input']+n['cc']+n['cr']
            out=max(nctx-ctx-resby.get(k,0),0)
        else: out=t['out']
        total+=5.0*out
    cls=collections.defaultdict(float)
    for c in ev:
        tg=F.labels(w,c)
        k=c['turn']+1  # tokens enter the prefix from next turn
        f=1.25+0.05*max(T-1-k,0)
        t=C.tok(c)
        for x in tg: cls[x]+=t*f/len(tg)
    brief=0.425*len(d['brief'])*(1.25+0.05*(T-1))
    return total,cls,brief,T
for w in 'WNGC':
    total,cls,brief,T=run(w)
    print(f'== {w}: {T} turns, total {total/1e6:.2f}M ITE; brief {brief/1e6:.2f}M ({100*brief/total:.0f}%)')
    for k,v in sorted(cls.items(),key=lambda kv:-kv[1]):
        print(f'   {k:9s} {v/1e6:6.2f}M  {100*v/total:5.1f}%')
