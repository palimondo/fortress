#!/usr/bin/env python3 -I
import json,sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z
ORDER=['BRIEFING','RCORE','RNOTES','TOOLS','CODE','LIB','SPEC','TEST','GIT','RUN','EDIT','SETUP']
import re
HIST=re.compile(r'git\s+(-C\s+\S+\s+)?(log\s+(-S|--all|--follow|--format=[^;]*-S)|log\s+[^;|]*-S|blame|show\s+[0-9a-f]{7,}|diff\s+[0-9a-f]{7,}\^)')
def labels(w,c):
    if c['n'] in Z.OVR[w]: return Z.OVR[w][c['n']]
    if c['tool']=='Bash' and HIST.search(c['input'].get('command','')) and w in('N','G','C','W') and 'EDIT' not in C.classify(c,C.ROOTS[w]):
        return ['GIT']
    tg=Z.OVR[w].get(c['n']) or C.classify(c,C.ROOTS[w])
    tg=list(dict.fromkeys(tg))
    if 'EDIT' in tg: tg=['EDIT']
    if len(tg)>1 and 'GIT' in tg and any(x in tg for x in('LIB','CODE','TEST','SPEC','RNOTES','RCORE','TOOLS')): tg=[x for x in tg if x!='GIT']
    if len(tg)>1 and 'RUN' in tg: tg=[x for x in tg if x!='RUN'] if any(x not in('RUN','TOOLS') for x in tg) else ['RUN']
    return tg
def table(w,upto):
    d=C.load(w); turns=d['turns']
    calls=[e for e in d['events'] if e['k']=='call' and e['n']<=upto]
    cls=collections.defaultdict(lambda:[0.0,0.0,0.0])
    for c in calls:
        tg=labels(w,c)
        t=C.tok(c)
        for x in tg:
            cls[x][0]+=1/len(tg); cls[x][1]+=c['rbytes']/len(tg); cls[x][2]+=t/len(tg)
    last=calls[-1]['turn']
    writes=sum(turns[i]['input']+turns[i]['cc'] for i in range(last+1))
    first=turns[0]['input']+turns[0]['cc']
    brief=0.425*len(d['brief'])
    start=max(first-brief,0)
    res=sum(v[2] for v in cls.values())
    other=writes-first-res
    return cls,writes,first,brief,start,res,other,len(calls)
def pr(w,upto,name):
    cls,writes,first,brief,start,res,other,n=table(w,upto)
    print(f'## {w} {name}: calls 1..{upto}; writes {writes/1000:.0f}K')
    rows=[('brief (first message)',1,len(C.load(w)["brief"]),brief)]
    rows.append(('harness start (rest of first turn)',0,0,start))
    for k in ORDER:
        if k in cls: rows.append((k,cls[k][0],cls[k][1],cls[k][2]))
    rows.append(('own output, reminders (remainder)',0,0,other))
    for r in rows:
        print(f'   {r[0]:36s} calls {r[1]:5.1f} chars {r[2]:8.0f} tokens {r[3]/1000:6.1f}K  {100*r[3]/writes:5.1f}%')
def runs(w,upto):
    d=C.load(w)
    calls=[e for e in d['events'] if e['k']=='call' and e['n']<=upto]
    out=[];cur=None;start=None;byt=0
    for c in calls:
        tg=labels(w,c); key='+'.join(tg)
        if key!=cur:
            if cur is not None: out.append((cur,start,prev,byt))
            cur=key;start=c['n'];byt=0
        prev=c['n'];byt+=c['rbytes']
    out.append((cur,start,prev,byt))
    return out
if __name__=='__main__':
    for w in 'WNGC':
        pr(w,Z.WIN[w][0],'window A (to first edit)')
        pr(w,Z.WIN[w][1],'window B (to first fix edit)')
    print()
    for w in 'WNGC':
        print('RUNS',w,' -> '.join(f'{k}[{a}-{b}]' if a!=b else f'{k}[{a}]' for k,a,b,_ in runs(w,Z.WIN[w][1])))
