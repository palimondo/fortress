#!/usr/bin/env python3 -I
import sys,collections
sys.path.insert(0,'.')
import classify as C, summarize as Z, final as F
ROWS=[('BRIEF','the brief (first message)'),('START','harness start (system prompt, tools)'),('BRIEFING','the briefing (`facts-extract.sh` output)'),
('SKILL','skill (`fortress-repo`)'),
('RCORE','FACTS, POSITIONS, INDEX, ledger, read directly'),('RNOTES','reports and notes under `explorations/`'),('TOOLS','scripts and gate tables under `explorations/`'),
('CODE','original tree: code'),('LIB','original tree: library'),('SPEC','original tree: specification'),('TEST','original tree: tests'),
('GIT','git history'),('RUN','runs of programs, tests, builds'),('OWN','own edits, commits, setup'),('REST','own output and reminders (remainder)')]
def col(w,upto):
    cls,writes,first,brief,start,res,other,n=F.table(w,upto)
    d={}
    d['BRIEF']=(1,len(C.load(w)['brief']),brief)
    d['START']=(0,0,start)
    for k in ('BRIEFING','RCORE','RNOTES','TOOLS','CODE','LIB','SPEC','TEST','GIT','RUN'):
        if k in cls: d[k]=tuple(cls[k])
    d['SKILL']=(0,0,0)
    own=[0,0,0]
    for k in ('EDIT','SETUP'):
        if k in cls:
            for i in range(3): own[i]+=cls[k][i]
    d['OWN']=tuple(own)
    d['REST']=(0,0,other)
    return d,writes,n
def table(upto_idx):
    cols={}
    for w in 'WNGC':
        cols[w]=col(w,Z.WIN[w][upto_idx])
    out=[]
    out.append('| class | W: calls / KB / % | N: calls / KB / % | G: calls / KB / % | C: calls / KB / % |')
    out.append('|---|---|---|---|---|')
    for key,name in ROWS:
        cells=[]
        for w in 'WNGC':
            d,writes,n=cols[w]
            if key in d:
                c,b,t=d[key]
                if key in('START','REST'): cells.append('%.1f%%'%(100*t/writes))
                elif c==0 and b==0 and t==0: cells.append('0')
                else: cells.append('%d / %.0f / %.1f%%'%(round(c),b/1000,100*t/writes))
            else: cells.append('0')
        out.append('| %s | %s |'%(name,' | '.join(cells)))
    tot=['writes in the window']+['%dK (%d calls)'%(round(cols[w][1]/1000),cols[w][2]) for w in 'WNGC']
    out.append('| %s |'%' | '.join(tot))
    return '\n'.join(out)
open('table-A.md','w').write(table(0)+'\n')
open('table-B.md','w').write(table(1)+'\n')
print(open('table-A.md').read()); print(); print(open('table-B.md').read())
